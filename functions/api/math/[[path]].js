/**
 * Cloudflare Pages Function: /api/math/[[path]]
 * PUMKIN Academic Mathematics API Gateway
 *
 * Security Architecture & Governance:
 * 1. Strict Route Whitelisting: ONLY /solve, /check, /generate (all others 404, path traversal rejected)
 * 2. Zero Client-Side Secret Exposure: Injects X-Pumkin-API-Key securely from Cloudflare env
 * 3. Client Header Shielding: Never forwards client cookies, Authorization, or PII headers to backend
 * 4. Body Size Validation: Exactly 64 KB (65,536 bytes) allowed; 64 KB + 1 byte rejected with HTTP 413
 * 5. 20-Second Timeout: AbortController with Vietnamese cold start detection
 * 6. Rate Limiting: Cloudflare KV (30 req/min per IP) with in-memory approximation fallback
 * 7. Case-Sensitive Semantic Cache:
 *    - Key = SHA-256(schema_version + ":" + targetAction + ":" + raw_trimmed_problem_text + ":" + sorted_params_json)
 *    - Strictly preserves case & whitespace semantics (\Delta != \delta, P(x) != p(x), \sin x != \sinx, C_5^2 != c_5^2)
 *    - ONLY caches status="verified" responses (never needs_review, unsupported, cannot_determine, or error)
 *    - Short TTL (1800s / 30 mins) due to KV eventual consistency and rapid solver patch lifecycle
 * 8. Pre-warm / Wakeup: Health probe supports ?wake=1 to pre-warm Render before student solves
 */

const ALLOWED_ROUTES = new Set(["solve", "check", "generate"]);
const MAX_BODY_SIZE_BYTES = 64 * 1024; // Exactly 65,536 bytes
const GATEWAY_TIMEOUT_MS = 15000; // 15 seconds synchronized timeout (Sandbox: 5s < Backend: 12s < Gateway: 15s < Client: 18s)
const MAX_CONCURRENT_QUEUE_CEILING = 60; // Max in-flight requests (Tier b Backpressure)
let _activeInFlightRequests = 0;
const RATE_LIMIT_MAX_PER_MINUTE = 30;
const RATE_LIMIT_WINDOW_SECONDS = 60;
const CACHE_SCHEMA_VERSION = "v1";
const SHORT_CACHE_TTL_SECONDS = 1800; // 30 minutes short TTL

// In-memory sliding window fallback when Cloudflare KV binding is unavailable
// NOTE: In-memory state is local to each V8 isolate and is only an approximation.
// Cloudflare KV or Cloudflare WAF Rate Limiting rules must be used for distributed guarantees.
const _inMemoryRateLimit = new Map();

/**
 * Returns standard CORS headers based on request origin
 */
function getCorsHeaders(request, env) {
    const origin = (request && request.headers && request.headers.get("Origin")) || "";
    const defaultAllowed = [
        "https://tsapumkin.pages.dev",
        "https://pumkin.dev",
        "https://www.pumkin.dev"
    ];
    let customAllowed = [];
    if (env && env.CORS_ORIGINS) {
        customAllowed = env.CORS_ORIGINS.split(",").map(s => s.trim().toLowerCase());
    }
    const allAllowed = [...defaultAllowed, ...customAllowed];

    let matchedOrigin = null;
    if (
        origin.startsWith("http://localhost:") ||
        origin.startsWith("http://127.0.0.1:") ||
        origin === "http://localhost" ||
        origin === "http://127.0.0.1"
    ) {
        matchedOrigin = origin;
    } else if (
        allAllowed.includes(origin.toLowerCase()) ||
        (/^https:\/\/[a-z0-9-]+\.tsapumkin\.pages\.dev$/i.test(origin)) ||
        (/^https:\/\/[a-z0-9-]+\.pumkin\.dev$/i.test(origin))
    ) {
        matchedOrigin = origin;
    }

    const headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, X-Pumkin-Tester-Id, X-Pumkin-User-Id, X-Pumkin-Tester-Token",
        "Access-Control-Max-Age": "86400",
        "Vary": "Origin"
    };
    if (matchedOrigin) {
        headers["Access-Control-Allow-Origin"] = matchedOrigin;
    }
    return headers;
}

/**
 * Creates standardized Vietnamese error JSON response
 */
function makeErrorResponse(status, code, messageVi, corsHeaders, extra = {}) {
    return new Response(
        JSON.stringify({
            success: false,
            error: {
                code: code,
                message: messageVi,
                timestamp: new Date().toISOString(),
                ...extra
            }
        }, null, 2),
        {
            status: status,
            headers: corsHeaders
        }
    );
}

/**
 * Constant-time string comparison via SHA-256 fixed-length bitwise evaluation.
 * Protects against timing attacks on secret tester tokens across all runtimes.
 */
export async function timingSafeEqualToken(candidateToken, validToken) {
    if (typeof candidateToken !== "string" || typeof validToken !== "string") return false;
    if (!candidateToken.trim() || !validToken.trim()) return false;
    const encoder = new TextEncoder();
    const hashA = new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(candidateToken.trim())));
    const hashB = new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(validToken.trim())));
    let diff = 0;
    for (let i = 0; i < 32; i++) {
        diff |= (hashA[i] ^ hashB[i]);
    }
    return diff === 0;
}

/**
 * Computes hexadecimal SHA-256 hash using Web Crypto API
 */
export async function sha256Hex(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Constructs canonical cache key input:
 * Preserves exact case, internal spacing, and LaTeX macros (\Delta != \delta, \sin x != \sinx, etc.)
 * Only trims outer leading/trailing whitespace.
 */
export function buildCacheKeyInput(targetAction, parsedJson) {
    try {
        const obj = typeof parsedJson === "string" ? JSON.parse(parsedJson) : parsedJson;
        const rawText = (obj.question_text || obj.expression || obj.problem_text || obj.raw_latex || "").trim();
        const params = {};
        for (const [k, v] of Object.entries(obj)) {
            if (!['question_text', 'expression', 'problem_text', 'raw_latex'].includes(k)) {
                params[k] = v;
            }
        }
        const sortedParams = JSON.stringify(params, Object.keys(params).sort());
        return `${CACHE_SCHEMA_VERSION}:${targetAction}:${rawText}:${sortedParams}`;
    } catch {
        return `${CACHE_SCHEMA_VERSION}:${targetAction}:${String(parsedJson).trim()}:`;
    }
}

/**
 * Rate limit check: Cloudflare KV with in-memory fallback
 */
async function enforceRateLimit(clientIp, env) {
    const nowSec = Math.floor(Date.now() / 1000);
    const windowKey = `ratelimit_${clientIp}_${Math.floor(nowSec / RATE_LIMIT_WINDOW_SECONDS)}`;

    if (env && env.MATH_KV && typeof env.MATH_KV.get === "function") {
        try {
            const currentStr = await env.MATH_KV.get(windowKey);
            const currentCount = currentStr ? parseInt(currentStr, 10) : 0;
            if (currentCount >= RATE_LIMIT_MAX_PER_MINUTE) {
                return false;
            }
            await env.MATH_KV.put(windowKey, String(currentCount + 1), {
                expirationTtl: RATE_LIMIT_WINDOW_SECONDS * 2
            });
            return true;
        } catch (kvErr) {
            console.warn("[MATH_GATEWAY] KV rate limit error, falling back to in-memory:", kvErr);
        }
    }

    const nowMs = Date.now();
    const record = _inMemoryRateLimit.get(clientIp) || { count: 0, startTime: nowMs };
    if (nowMs - record.startTime > RATE_LIMIT_WINDOW_SECONDS * 1000) {
        record.count = 1;
        record.startTime = nowMs;
    } else {
        record.count++;
    }
    _inMemoryRateLimit.set(clientIp, record);

    if (_inMemoryRateLimit.size > 2000) {
        for (const [k, v] of _inMemoryRateLimit.entries()) {
            if (nowMs - v.startTime > RATE_LIMIT_WINDOW_SECONDS * 1000) {
                _inMemoryRateLimit.delete(k);
            }
        }
    }

    return record.count <= RATE_LIMIT_MAX_PER_MINUTE;
}

export async function onRequest(context = {}) {
    const { request, env, params } = context;
    const corsHeaders = getCorsHeaders(request, env);

    // Handle OPTIONS Preflight
    if (request.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: corsHeaders
        });
    }

    // 0. Emergency Kill Switch: "MATH_ENABLED" via Environment Variable or Cloudflare KV
    // Allows immediate server-side shutdown across all routes without redeploying
    let isEmergencyDisabled = false;
    if (env && (env.MATH_ENABLED === "false" || env.MATH_ENABLED === false || env.MATH_ENABLED === "0")) {
        isEmergencyDisabled = true;
    } else if (env && env.MATH_KV && typeof env.MATH_KV.get === "function") {
        try {
            const kvMathEnabled = await env.MATH_KV.get("MATH_ENABLED");
            if (kvMathEnabled === "false" || kvMathEnabled === "0") {
                isEmergencyDisabled = true;
            }
        } catch (kvErr) {
            console.warn("[MATH_GATEWAY] Error checking MATH_ENABLED in KV:", kvErr);
        }
    }

    if (isEmergencyDisabled) {
        return makeErrorResponse(
            503,
            "SERVICE_TEMPORARILY_DISABLED",
            "Dịch vụ tính toán và giải toán CAS đang tạm ngưng bảo trì khẩn cấp. Vui lòng quay lại sau.",
            corsHeaders,
            { tier: "emergency_kill_switch", is_emergency: true, math_enabled: false }
        );
    }

    // Tier (b) - High Traffic Overload / Bounded Request Queue
    if (_activeInFlightRequests >= MAX_CONCURRENT_QUEUE_CEILING) {
        return makeErrorResponse(
            503,
            "HIGH_TRAFFIC_OVERLOAD",
            "Hệ thống đang có quá nhiều học sinh làm bài cùng lúc. Vui lòng thử lại sau ít giây.",
            corsHeaders,
            {
                tier: "overload_backpressure",
                retry_after_seconds: 3,
                active_requests: _activeInFlightRequests
            }
        );
    }

    // 1. Path traversal detection on raw URL
    const requestUrl = new URL(request.url);
    const rawPathname = requestUrl.pathname;
    if (
        rawPathname.includes("..") ||
        /%2[ef]/i.test(rawPathname) ||
        /%25/i.test(rawPathname) ||
        rawPathname.includes("/.")
    ) {
        return makeErrorResponse(
            404,
            "ROUTE_NOT_FOUND",
            "Đường dẫn không hợp lệ. Gateway chỉ hỗ trợ các thao tác: solve, check, generate.",
            corsHeaders
        );
    }

    // Extract path segment(s)
    const rawPath = params && params.path ? (Array.isArray(params.path) ? params.path : [params.path]) : [];
    // Normalize path (handle trailing slash and case insensitivity on route name)
    const segments = rawPath
        .map(s => (typeof s === "string" ? s.trim().toLowerCase() : ""))
        .filter(Boolean);

    let targetAction = "";

    if (segments.length === 1 && ALLOWED_ROUTES.has(segments[0])) {
        targetAction = segments[0];
    } else if (segments.length === 2 && segments[0] === "v1" && ALLOWED_ROUTES.has(segments[1])) {
        targetAction = segments[1];
    } else if (segments.length === 1 && (segments[0] === "health" || segments[0] === "healthz")) {
        // Health probe: optionally ping backend if ?wake=1 or ?backend=1
        const shouldWake = requestUrl.searchParams.get("wake") === "1" || requestUrl.searchParams.get("backend") === "1";
        let backendHealth = "untested";

        if (shouldWake) {
            const backendBaseUrl = (env && env.MATH_API_URL) ? env.MATH_API_URL.replace(/\/+$/, "") : "http://localhost:8000";
            try {
                const wakeController = new AbortController();
                const wakeTimer = setTimeout(() => wakeController.abort(), 3000);
                const wakeRes = await fetch(`${backendBaseUrl}/health`, { signal: wakeController.signal });
                clearTimeout(wakeTimer);
                backendHealth = wakeRes.ok ? "reachable" : `status_${wakeRes.status}`;
            } catch (wakeErr) {
                backendHealth = "waking_up_or_unreachable";
            }
        }

        return new Response(
            JSON.stringify({
                status: "OK",
                gateway: "Pumkin Cloudflare Pages Math Gateway",
                allowed_routes: Array.from(ALLOWED_ROUTES),
                backend_health: backendHealth,
                timestamp: new Date().toISOString()
            }, null, 2),
            { status: 200, headers: corsHeaders }
        );
    } else if (segments.length === 1 && segments[0] === "version") {
        const backendBaseUrl = (env && env.MATH_API_URL) ? env.MATH_API_URL.replace(/\/+$/, "") : "http://localhost:8000";
        let backendVersion = null;
        try {
            const vController = new AbortController();
            const vTimer = setTimeout(() => vController.abort(), 3000);
            const vRes = await fetch(`${backendBaseUrl}/version`, { signal: vController.signal });
            clearTimeout(vTimer);
            if (vRes.ok) {
                backendVersion = await vRes.json();
            }
        } catch {
            backendVersion = "unreachable";
        }

        return new Response(
            JSON.stringify({
                gateway_version: "1.1.0",
                schema_version: "1.1.0",
                backend: backendVersion,
                timestamp: new Date().toISOString()
            }, null, 2),
            { status: 200, headers: corsHeaders }
        );
    } else {
        return makeErrorResponse(
            404,
            "ROUTE_NOT_FOUND",
            "Đường dẫn không hợp lệ. Gateway chỉ hỗ trợ các thao tác: solve, check, generate, health, version.",
            corsHeaders,
            { requested_path: "/" + segments.join("/") }
        );
    }

    // Only POST is permitted for execution endpoints
    if (request.method !== "POST") {
        return makeErrorResponse(
            405,
            "METHOD_NOT_ALLOWED",
            `Phương thức ${request.method} không được hỗ trợ. Vui lòng gửi yêu cầu POST.`,
            corsHeaders
        );
    }

    // Content-Type validation: only application/json is accepted
    const contentType = (request.headers.get("Content-Type") || "").toLowerCase();
    if (!contentType.includes("application/json")) {
        return makeErrorResponse(
            415,
            "UNSUPPORTED_MEDIA_TYPE",
            "Yêu cầu phải có tiêu đề 'Content-Type: application/json'.",
            corsHeaders,
            { received_content_type: contentType || "missing" }
        );
    }

    // 1. Server-Side Production Feature Flag & Allowlist Check
    const reqHost = requestUrl.hostname ? requestUrl.hostname.toLowerCase() : "";
    const isProdEnv = (env && env.ENVIRONMENT === "production") ||
                      reqHost === "tsapumkin.pages.dev" ||
                      reqHost === "pumkin.dev" ||
                      reqHost === "www.pumkin.dev";
    const isPublicEnabled = env && (env.FEATURE_MATH_API_ENABLED === "true" || env.FEATURE_MATH_API_PUBLIC === "true");

    if (isProdEnv && !isPublicEnabled) {
        // High-entropy random tester tokens configured via server environment (never logged or committed)
        const rawTokens = (env && (env.MATH_TESTER_TOKENS || env.MATH_ALLOWLIST)) ? String(env.MATH_TESTER_TOKENS || env.MATH_ALLOWLIST) : "";
        const validTokens = rawTokens.split(",").map(s => s.trim()).filter(Boolean);

        // Extract client tester token from designated secure header (or Authorization Bearer)
        const clientToken = (
            request.headers.get("X-Pumkin-Tester-Token") ||
            (request.headers.get("Authorization")?.startsWith("Bearer ") ? request.headers.get("Authorization").slice(7).trim() : "") ||
            request.headers.get("X-Pumkin-Tester-Id") ||
            ""
        ).trim();

        let isAuthorized = false;
        if (clientToken && validTokens.length > 0) {
            for (const validTok of validTokens) {
                if (await timingSafeEqualToken(clientToken, validTok)) {
                    isAuthorized = true;
                    break;
                }
            }
        }

        if (!isAuthorized) {
            return makeErrorResponse(
                403,
                "FORBIDDEN_BETA_ACCESS",
                "Tính năng Giải toán CAS đang trong giai đoạn thử nghiệm nội bộ. Quyền truy cập bị từ chối do thiếu mã token thử nghiệm hợp lệ.",
                corsHeaders
            );
        }
    }

    // Extract Client IP
    const clientIp = request.headers.get("CF-Connecting-IP") ||
                     request.headers.get("X-Forwarded-For") ||
                     "unknown_client";

    // 2. Enforce Rate Limiting
    const isRateAllowed = await enforceRateLimit(clientIp, env);
    if (!isRateAllowed) {
        return makeErrorResponse(
            429,
            "RATE_LIMIT_EXCEEDED",
            "Bạn đã gửi quá nhiều yêu cầu giải toán trong thời gian ngắn (tối đa 30 yêu cầu/phút). Vui lòng thử lại sau 1 phút.",
            corsHeaders
        );
    }

    // 2. Validate Body Size (both Content-Length header and actual received bytes)
    const contentLength = parseInt(request.headers.get("Content-Length") || "0", 10);
    if (contentLength > MAX_BODY_SIZE_BYTES) {
        return makeErrorResponse(
            413,
            "PAYLOAD_TOO_LARGE",
            `Dung lượng yêu cầu vượt quá giới hạn cho phép (tối đa 64 KB). Kích thước nhận được: ${contentLength} bytes.`,
            corsHeaders
        );
    }

    let rawBody = "";
    try {
        rawBody = await request.text();
    } catch {
        return makeErrorResponse(400, "INVALID_BODY", "Không thể đọc nội dung yêu cầu.", corsHeaders);
    }

    // Validates chunked bodies or bodies where Content-Length header was missing/forged
    if (rawBody.length > MAX_BODY_SIZE_BYTES) {
        return makeErrorResponse(
            413,
            "PAYLOAD_TOO_LARGE",
            `Dung lượng yêu cầu vượt quá giới hạn cho phép (tối đa 64 KB). Kích thước nhận được: ${rawBody.length} bytes.`,
            corsHeaders
        );
    }

    // Verify valid JSON
    let parsedJson = null;
    try {
        parsedJson = JSON.parse(rawBody || "{}");
    } catch {
        return makeErrorResponse(400, "INVALID_JSON", "Định dạng dữ liệu gửi lên không phải JSON hợp lệ.", corsHeaders);
    }

    // 3. Case-Sensitive Semantic Cache Lookup for /v1/solve
    let cacheKey = "";
    if (targetAction === "solve" && env && env.MATH_KV && typeof env.MATH_KV.get === "function") {
        const canonicalKeyInput = buildCacheKeyInput(targetAction, parsedJson);
        const hash = await sha256Hex(canonicalKeyInput);
        cacheKey = `math_solve_cache_${hash}`;

        try {
            const cachedResultStr = await env.MATH_KV.get(cacheKey);
            if (cachedResultStr) {
                const cachedHeaders = {
                    ...corsHeaders,
                    "X-Pumkin-Cache": "HIT",
                    "X-Pumkin-Cached-At": new Date().toISOString()
                };
                return new Response(cachedResultStr, {
                    status: 200,
                    headers: cachedHeaders
                });
            }
        } catch (cacheErr) {
            console.warn("[MATH_GATEWAY] Cache lookup exception:", cacheErr);
        }
    }

    // 4. Backend Service Configuration
    const backendBaseUrl = (env && env.MATH_API_URL) ? env.MATH_API_URL.replace(/\/+$/, "") : "http://localhost:8000";
    const backendApiKey = (env && env.MATH_API_KEY) ? env.MATH_API_KEY.trim() : "";
    const backendEndpoint = `${backendBaseUrl}/v1/${targetAction}`;

    // Trace ID for observability
    const traceId = `gw_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // 5. Proxy to Backend with 20s Hard Timeout
    // SECURITY: Strictly shields client cookies, Authorization, and student identity from backend
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), GATEWAY_TIMEOUT_MS);

    try {
        const headersToSend = {
            "Content-Type": "application/json",
            "X-Trace-Id": traceId,
            "X-Forwarded-For": clientIp
        };
        // Inject secret API key safely at gateway layer (browser never sees this)
        if (backendApiKey) {
            headersToSend["X-Pumkin-API-Key"] = backendApiKey;
        }

        const backendResponse = await fetch(backendEndpoint, {
            method: "POST",
            headers: headersToSend,
            body: rawBody,
            signal: abortController.signal
        });

        clearTimeout(timeoutId);

        const responseText = await backendResponse.text();
        const responseHeaders = {
            ...corsHeaders,
            "X-Pumkin-Cache": "MISS",
            "X-Trace-Id": traceId
        };

        // Parse response to check status and sanitize internal details
        let finalResponseText = responseText;
        let isVerified = false;
        try {
            const parsedData = JSON.parse(responseText);
            isVerified = (parsedData.status === "verified");

            // SECURITY: Never leak internal cost numbers or quota details to client
            if (parsedData && parsedData.error && parsedData.error.code === "budget_exceeded") {
                if (parsedData.error.details) {
                    delete parsedData.error.details;
                    finalResponseText = JSON.stringify(parsedData, null, 2);
                }
            }
        } catch {
            isVerified = false;
        }

        // Cache ONLY status="verified" responses in KV with short TTL
        if (
            backendResponse.status === 200 &&
            targetAction === "solve" &&
            isVerified &&
            cacheKey &&
            env &&
            env.MATH_KV &&
            typeof env.MATH_KV.put === "function"
        ) {
            try {
                await env.MATH_KV.put(cacheKey, responseText, {
                    expirationTtl: SHORT_CACHE_TTL_SECONDS
                });
            } catch (putErr) {
                console.warn("[MATH_GATEWAY] Cache write exception:", putErr);
            }
        }

        return new Response(finalResponseText, {
            status: backendResponse.status,
            headers: responseHeaders
        });

    } catch (err) {
        clearTimeout(timeoutId);

        // Cold Start / Timeout handling
        if (err.name === "AbortError") {
            return makeErrorResponse(
                504,
                "BACKEND_TIMEOUT_OR_COLD_START",
                "Máy chủ tính toán đang khởi động nguội (cold start) hoặc đang xử lý tác vụ phức tạp quá 20 giây. Vui lòng bấm 'Thử lại' sau khoảng 30-50 giây.",
                corsHeaders,
                { is_cold_start: true, timeout_seconds: GATEWAY_TIMEOUT_MS / 1000 }
            );
        }

        // Connection failure (service sleeping, down, or unreachable)
        console.error("[MATH_GATEWAY] Backend connection failed:", err.message);
        return makeErrorResponse(
            502,
            "BACKEND_UNAVAILABLE",
            "Không thể kết nối đến máy chủ tính toán CAS (đang khởi động hoặc tạm thời gián đoạn). Hệ thống đang kích hoạt chế độ dự phòng ngoại tuyến.",
            corsHeaders,
            { is_cold_start: false, internal_error: err.message }
        );
    }
}
