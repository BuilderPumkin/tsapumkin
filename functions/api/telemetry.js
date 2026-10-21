/**
 * Cloudflare Pages Function: /api/telemetry
 * PUMKIN Academic Telemetry Gateway (W7 Layer)
 *
 * Privacy Invariants:
 * 1. Zero PII: Strictly NO names, emails, user IDs, or IP addresses stored.
 * 2. Payload Validation: Enforces minimal schema (session_id, call_type, status, latency_ms, error_code, problem_topic).
 * 3. Rate Limiting: 60 telemetry requests per minute.
 * 4. D1 Storage with Graceful Fallback: Writes to env.DB or env.FEEDBACK_DB, falls back to memory buffer if unbound.
 * 5. 90-Day Retention: Enforced via scheduled D1 queries.
 */

const RATE_LIMIT_MAX_PER_MINUTE = 60;
const RATE_LIMIT_WINDOW_MS = 60000;
const _ipRateLimit = new Map();

// In-memory buffer for staging/testing when D1 is not bound
const _inMemoryTelemetry = [];
const MAX_IN_MEMORY_ITEMS = 500;

function getCorsHeaders(request) {
    const origin = (request && request.headers && request.headers.get("Origin")) || "";
    let matchedOrigin = null;
    if (
        origin.startsWith("http://localhost:") ||
        origin.startsWith("http://127.0.0.1:") ||
        origin === "http://localhost" ||
        origin === "http://127.0.0.1" ||
        origin === "https://tsapumkin.pages.dev" ||
        origin === "https://pumkin.dev" ||
        origin === "https://www.pumkin.dev" ||
        (/^https:\/\/[a-z0-9-]+\.tsapumkin\.pages\.dev$/i.test(origin)) ||
        (/^https:\/\/[a-z0-9-]+\.pumkin\.dev$/i.test(origin))
    ) {
        matchedOrigin = origin;
    }

    const headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Pumkin-Session-Id",
        "Access-Control-Max-Age": "86400",
        "Vary": "Origin"
    };
    if (matchedOrigin) {
        headers["Access-Control-Allow-Origin"] = matchedOrigin;
    }
    return headers;
}

function checkRateLimit(clientKey) {
    const now = Date.now();
    let timestamps = _ipRateLimit.get(clientKey) || [];
    timestamps = timestamps.filter(ts => (now - ts) < RATE_LIMIT_WINDOW_MS);
    if (timestamps.length >= RATE_LIMIT_MAX_PER_MINUTE) {
        return false;
    }
    timestamps.push(now);
    _ipRateLimit.set(clientKey, timestamps);
    return true;
}

export async function onRequestOptions({ request }) {
    return new Response(null, {
        status: 204,
        headers: getCorsHeaders(request)
    });
}

export async function onRequestPost({ request, env }) {
    const corsHeaders = getCorsHeaders(request);

    // Rate Limiting
    const clientIp = request.headers.get("CF-Connecting-IP") || request.headers.get("x-forwarded-for") || "unknown_client";
    if (!checkRateLimit(clientIp)) {
        return new Response(JSON.stringify({
            success: false,
            error: {
                code: "RATE_LIMIT_EXCEEDED",
                message_vi: "Bạn đang gửi quá nhiều sự kiện telemetry. Vui lòng thử lại sau 1 phút."
            }
        }), { status: 429, headers: corsHeaders });
    }

    try {
        const body = await request.json();
        const events = Array.isArray(body) ? body : [body];

        if (events.length === 0 || events.length > 20) {
            return new Response(JSON.stringify({
                success: false,
                error: { code: "INVALID_BATCH_SIZE", message_vi: "Số lượng sự kiện mỗi lần gửi phải từ 1 đến 20." }
            }), { status: 400, headers: corsHeaders });
        }

        const validEvents = [];
        for (const evt of events) {
            if (!evt || typeof evt !== "object") continue;

            // Strip any accidental PII (Zero PII guarantee)
            delete evt.name;
            delete evt.email;
            delete evt.userId;
            delete evt.user_id;
            delete evt.ip;
            delete evt.student_input;
            delete evt.problem_text;

            const sessionId = String(evt.session_id || "").trim() || `anon_${Date.now()}`;
            const callType = String(evt.call_type || "solve").toLowerCase();
            const status = String(evt.status || "unknown").toLowerCase();
            const latencyMs = Number.isInteger(evt.latency_ms) ? evt.latency_ms : Math.round(Number(evt.latency_ms) || 0);
            const errorCode = evt.error_code ? String(evt.error_code).slice(0, 50) : null;
            const apiVersion = String(evt.api_version || "v1").slice(0, 10);
            const promptVersion = evt.prompt_version ? String(evt.prompt_version).slice(0, 50) : null;
            const problemTopic = evt.problem_topic ? String(evt.problem_topic).slice(0, 100) : "General";
            const clientVersion = String(evt.client_version || "4.5.0").slice(0, 20);

            validEvents.push({
                session_id: sessionId,
                call_type: callType,
                status: status,
                latency_ms: latencyMs,
                error_code: errorCode,
                api_version: apiVersion,
                prompt_version: promptVersion,
                problem_topic: problemTopic,
                client_version: clientVersion,
                created_at: new Date().toISOString()
            });
        }

        // Storage in Cloudflare D1
        const db = env?.DB || env?.FEEDBACK_DB;
        if (db && typeof db.prepare === "function") {
            try {
                const insertStmt = db.prepare(`
                    INSERT INTO telemetry_events (session_id, call_type, status, latency_ms, error_code, api_version, prompt_version, problem_topic, client_version)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                `);
                const batchStatements = validEvents.map(e => insertStmt.bind(
                    e.session_id, e.call_type, e.status, e.latency_ms, e.error_code,
                    e.api_version, e.prompt_version, e.problem_topic, e.client_version
                ));
                await db.batch(batchStatements);
            } catch (dbErr) {
                console.warn("[TELEMETRY_GATEWAY] D1 batch insert error:", dbErr);
                // Fallback to in-memory buffer
                _inMemoryTelemetry.push(...validEvents);
                if (_inMemoryTelemetry.length > MAX_IN_MEMORY_ITEMS) _inMemoryTelemetry.splice(0, _inMemoryTelemetry.length - MAX_IN_MEMORY_ITEMS);
            }
        } else {
            // In-memory fallback
            _inMemoryTelemetry.push(...validEvents);
            if (_inMemoryTelemetry.length > MAX_IN_MEMORY_ITEMS) _inMemoryTelemetry.splice(0, _inMemoryTelemetry.length - MAX_IN_MEMORY_ITEMS);
        }

        return new Response(JSON.stringify({
            success: true,
            accepted_count: validEvents.length
        }), { status: 200, headers: corsHeaders });

    } catch (err) {
        return new Response(JSON.stringify({
            success: false,
            error: { code: "BAD_REQUEST", message_vi: "Payload telemetry không hợp lệ: " + err.message }
        }), { status: 400, headers: corsHeaders });
    }
}

export async function onRequestGet({ request, env }) {
    const corsHeaders = getCorsHeaders(request);
    const db = env?.DB || env?.FEEDBACK_DB;

    // Health check & aggregate summary
    if (db && typeof db.prepare === "function") {
        try {
            const countRes = await db.prepare("SELECT COUNT(*) as total FROM telemetry_events").first();
            return new Response(JSON.stringify({
                status: "operational",
                storage: "d1",
                total_events: countRes?.total || 0,
                retention_policy_days: 90
            }), { status: 200, headers: corsHeaders });
        } catch (e) {
            return new Response(JSON.stringify({
                status: "operational_fallback",
                storage: "memory",
                total_events: _inMemoryTelemetry.length,
                retention_policy_days: 90
            }), { status: 200, headers: corsHeaders });
        }
    }

    return new Response(JSON.stringify({
        status: "operational_mock",
        storage: "memory",
        total_events: _inMemoryTelemetry.length,
        retention_policy_days: 90
    }), { status: 200, headers: corsHeaders });
}
