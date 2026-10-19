/**
 * Cloudflare Pages Function: /api/math/[[path]]
 * PUMKIN Academic Mathematics API Gateway
 *
 * Security Architecture & Governance:
 * 1. Strict Route Whitelisting: ONLY /solve, /check, /generate (all others 404)
 * 2. Zero Client-Side Secret Exposure: Injects X-Pumkin-API-Key securely from Cloudflare env
 * 3. Body Size Validation: Rejects payloads > 64 KB with HTTP 413
 * 4. 20-Second Timeout: AbortController with Vietnamese cold start detection
 * 5. Rate Limiting: Cloudflare KV (30 req/min per IP) with in-memory fallback
 * 6. Deterministic Caching: SHA-256 normalized hash caching for /v1/solve
 */

const ALLOWED_ROUTES = new Set(["solve", "check", "generate"]);
const MAX_BODY_SIZE_BYTES = 64 * 1024; // 64 KB
const GATEWAY_TIMEOUT_MS = 20000; // 20 seconds hard timeout
const RATE_LIMIT_MAX_PER_MINUTE = 30;
const RATE_LIMIT_WINDOW_SECONDS = 60;
const CACHE_TTL_SECONDS = 86400; // 24 hours cache for deterministic solutions

// In-memory sliding window fallback when Cloudflare KV binding is unavailable
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

    let matchedOrigin = "https://tsapumkin.pages.dev";
    if (
        origin.startsWith("http://localhost:") ||
        origin.startsWith("http://127.0.0.1:") ||
        origin === "http://localhost" ||
        origin === "http://127.0.0.1"
    ) {
        matchedOrigin = origin;
    } else if (allAllowed.includes(origin.toLowerCase())) {
        matchedOrigin = origin;
    } else if (!origin) {
        matchedOrigin = "*";
    }

    return {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": matchedOrigin,
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
        "Access-Control-Max-Age": "86400",
        "Vary": "Origin"
    };
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
 * Computes hexadecimal SHA-256 hash using Web Crypto API
 */
async function sha256Hex(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Normalizes question text / expression for deterministic cache keys
 */
function normalizeProblemInput(rawPayload) {
    try {
        const obj = typeof rawPayload === "string" ? JSON.parse(rawPayload) : rawPayload;
        const text = obj.question_text || obj.problem_text || obj.raw_latex || obj.expression || JSON.stringify(obj);
        return text.trim().toLowerCase().replace(/\s+/g, " ");
    } catch {
        return String(rawPayload).trim().toLowerCase().replace(/\s+/g, " ");
    }
}

/**
 * Rate limit check: Cloudflare KV with in-memory fallback
 */
async function enforceRateLimit(clientIp, env) {
    const nowSec = Math.floor(Date.now() / 1000);
    const windowKey = `ratelimit_${clientIp}_${Math.floor(nowSec / RATE_LIMIT_WINDOW_SECONDS)}`;

    // 1. Try Cloudflare KV if configured
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

    // 2. In-memory sliding window fallback
    const nowMs = Date.now();
    const record = _inMemoryRateLimit.get(clientIp) || { count: 0, startTime: nowMs };
    if (nowMs - record.startTime > RATE_LIMIT_WINDOW_SECONDS * 1000) {
        record.count = 1;
        record.startTime = nowMs;
    } else {
        record.count++;
    }
    _inMemoryRateLimit.set(clientIp, record);

    // Evict old entries periodically
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

    // Extract path segment(s)
    const rawPath = params && params.path ? (Array.isArray(params.path) ? params.path : [params.path]) : [];
    // Normalize path (handle optional "v1" prefix)
    const segments = rawPath.map(s => s.toLowerCase().trim()).filter(Boolean);
    let targetAction = "";

    if (segments.length === 1 && ALLOWED_ROUTES.has(segments[0])) {
        targetAction = segments[0];
    } else if (segments.length === 2 && segments[0] === "v1" && ALLOWED_ROUTES.has(segments[1])) {
        targetAction = segments[1];
    } else if (segments.length === 1 && (segments[0] === "health" || segments[0] === "healthz")) {
        // Gateway health probe
        return new Response(
            JSON.stringify({
                status: "OK",
                gateway: "Pumkin Cloudflare Pages Math Gateway",
                allowed_routes: Array.from(ALLOWED_ROUTES),
                timestamp: new Date().toISOString()
            }, null, 2),
            { status: 200, headers: corsHeaders }
        );
    } else {
        return makeErrorResponse(
            404,
            "ROUTE_NOT_FOUND",
            "Đường dẫn không hợp lệ. Gateway chỉ hỗ trợ các thao tác: solve, check, generate.",
            corsHeaders,
            { requested_path: "/" + segments.join("/") }
        );
    }

    // Only POST is permitted for mathematical execution endpoints
    if (request.method !== "POST") {
        return makeErrorResponse(
            405,
            "METHOD_NOT_ALLOWED",
            `Phương thức ${request.method} không được hỗ trợ. Vui lòng gửi yêu cầu POST.`,
            corsHeaders
        );
    }

    // Extract Client IP
    const clientIp = request.headers.get("CF-Connecting-IP") ||
                     request.headers.get("X-Forwarded-For") ||
                     "unknown_client";

    // 1. Enforce Rate Limiting
    const isRateAllowed = await enforceRateLimit(clientIp, env);
    if (!isRateAllowed) {
        return makeErrorResponse(
            429,
            "RATE_LIMIT_EXCEEDED",
            "Bạn đã gửi quá nhiều yêu cầu giải toán trong thời gian ngắn (tối đa 30 yêu cầu/phút). Vui lòng thử lại sau 1 phút.",
            corsHeaders
        );
    }

    // 2. Validate Body Size
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

    if (rawBody.length > MAX_BODY_SIZE_BYTES) {
        return makeErrorResponse(
            413,
            "PAYLOAD_TOO_LARGE",
            `Dung lượng yêu cầu vượt quá giới hạn cho phép (tối đa 64 KB).`,
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

    // 3. Cache Lookup for /v1/solve
    let cacheKey = "";
    if (targetAction === "solve" && env && env.MATH_KV && typeof env.MATH_KV.get === "function") {
        const normProblem = normalizeProblemInput(parsedJson);
        const hash = await sha256Hex(normProblem);
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

        // Cache successful solve responses in KV
        if (
            backendResponse.status === 200 &&
            targetAction === "solve" &&
            cacheKey &&
            env &&
            env.MATH_KV &&
            typeof env.MATH_KV.put === "function"
        ) {
            try {
                await env.MATH_KV.put(cacheKey, responseText, {
                    expirationTtl: CACHE_TTL_SECONDS
                });
            } catch (putErr) {
                console.warn("[MATH_GATEWAY] Cache write exception:", putErr);
            }
        }

        return new Response(responseText, {
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
