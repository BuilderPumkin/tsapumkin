/**
 * Cloudflare Pages Function: /api/feedback
 * PUMKIN Academic Feedback & Bug Reporting Gateway (W7 Layer)
 *
 * Privacy Invariants:
 * 1. Zero PII: Strictly NO names, emails, user IDs, or IP addresses stored.
 * 2. Explicit Problem Consent: Problem content is STRICTLY NULL unless include_problem_agreed === true.
 * 3. Confident-Yet-Wrong Detection: If reported question was 'verified', automatically flags verified_when_reported = 1 (P0 priority).
 * 4. Rate Limiting: 10 feedback reports per minute per IP.
 * 5. Right to Erasure: Supports session deletion request.
 */

const RATE_LIMIT_MAX_PER_MINUTE = 10;
const RATE_LIMIT_WINDOW_MS = 60000;
const _ipFeedbackRateLimit = new Map();

// In-memory buffer for staging/testing when D1 is not bound
const _inMemoryFeedback = [];
const MAX_IN_MEMORY_FEEDBACK = 200;

const VALID_REASONS = new Set([
    "WRONG_ANSWER",
    "MISUNDERSTOOD_PROBLEM",
    "HARD_TO_UNDERSTAND",
    "FORMULA_ERROR",
    "OTHER"
]);

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
    let timestamps = _ipFeedbackRateLimit.get(clientKey) || [];
    timestamps = timestamps.filter(ts => (now - ts) < RATE_LIMIT_WINDOW_MS);
    if (timestamps.length >= RATE_LIMIT_MAX_PER_MINUTE) {
        return false;
    }
    timestamps.push(now);
    _ipFeedbackRateLimit.set(clientKey, timestamps);
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
    const url = new URL(request.url);

    // Rate Limiting
    const clientIp = request.headers.get("CF-Connecting-IP") || request.headers.get("x-forwarded-for") || "unknown_client";
    if (!checkRateLimit(clientIp)) {
        return new Response(JSON.stringify({
            success: false,
            error: {
                code: "RATE_LIMIT_EXCEEDED",
                message_vi: "Bạn gửi phản hồi quá nhanh. Vui lòng chờ 1 phút trước khi gửi tiếp."
            }
        }), { status: 429, headers: corsHeaders });
    }

    try {
        const body = await request.json();

        // 1. Right to Erasure Endpoint: /api/feedback?action=delete_session or body.action === 'delete_session'
        if (url.searchParams.get("action") === "delete_session" || body.action === "delete_session") {
            const sessionIdToDelete = String(body.session_id || "").trim();
            if (!sessionIdToDelete) {
                return new Response(JSON.stringify({
                    success: false,
                    error: { code: "MISSING_SESSION_ID", message_vi: "Thiếu mã phiên session_id cần xóa." }
                }), { status: 400, headers: corsHeaders });
            }

            const db = env?.DB || env?.FEEDBACK_DB;
            let deletedCount = 0;
            if (db && typeof db.prepare === "function") {
                try {
                    const res1 = await db.prepare("DELETE FROM feedback_reports WHERE session_id = ?").bind(sessionIdToDelete).run();
                    const res2 = await db.prepare("DELETE FROM telemetry_events WHERE session_id = ?").bind(sessionIdToDelete).run();
                    deletedCount = (res1?.meta?.changes || 0) + (res2?.meta?.changes || 0);
                } catch (e) {
                    console.warn("[FEEDBACK_GATEWAY] D1 delete session error:", e);
                }
            }

            // Also clean from memory buffer
            for (let i = _inMemoryFeedback.length - 1; i >= 0; i--) {
                if (_inMemoryFeedback[i].session_id === sessionIdToDelete) {
                    _inMemoryFeedback.splice(i, 1);
                    deletedCount++;
                }
            }

            return new Response(JSON.stringify({
                success: true,
                message_vi: "Dữ liệu chẩn đoán của phiên này đã được xóa hoàn toàn theo yêu cầu của bạn.",
                deleted_records: deletedCount
            }), { status: 200, headers: corsHeaders });
        }

        // 2. Standard Feedback Report Ingestion
        // Zero PII guarantee: strip any identifying fields
        delete body.name;
        delete body.email;
        delete body.userId;
        delete body.user_id;
        delete body.ip;

        const sessionId = String(body.session_id || "").trim() || `anon_fb_${Date.now()}`;
        const questionId = body.question_id ? String(body.question_id).slice(0, 100) : null;
        const callType = String(body.call_type || "solve").toLowerCase();

        // Validate reason category
        const rawReason = String(body.reason_category || "OTHER").toUpperCase();
        const reasonCategory = VALID_REASONS.has(rawReason) ? rawReason : "OTHER";

        // Sanitize user note (max 500 characters, no HTML tags)
        let userNote = body.user_note ? String(body.user_note).slice(0, 500) : "";
        userNote = userNote.replace(/<[^>]*>?/gm, "").trim();

        // INVARIANT (W7): Problem content is STRICTLY NULL unless explicit consent given!
        const includeProblemAgreed = Boolean(body.include_problem_agreed);
        let problemContent = null;
        if (includeProblemAgreed && body.problem_content) {
            problemContent = String(body.problem_content).slice(0, 2000); // Max 2KB
        }

        const currentStatus = String(body.current_status || "unknown").toLowerCase();
        // Candidate for "Confident yet wrong" P0 audit:
        const verifiedWhenReported = (currentStatus === "verified" && reasonCategory === "WRONG_ANSWER") ? 1 : 0;

        const record = {
            id: Date.now(),
            session_id: sessionId,
            question_id: questionId,
            call_type: callType,
            reason_category: reasonCategory,
            user_note: userNote || null,
            include_problem_agreed: includeProblemAgreed ? 1 : 0,
            problem_content: problemContent,
            current_status: currentStatus,
            verified_when_reported: verifiedWhenReported,
            triage_status: "new",
            created_at: new Date().toISOString()
        };

        // Save to D1
        const db = env?.DB || env?.FEEDBACK_DB;
        if (db && typeof db.prepare === "function") {
            try {
                await db.prepare(`
                    INSERT INTO feedback_reports 
                    (session_id, question_id, call_type, reason_category, user_note, include_problem_agreed, problem_content, current_status, verified_when_reported, triage_status)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `).bind(
                    record.session_id, record.question_id, record.call_type, record.reason_category,
                    record.user_note, record.include_problem_agreed, record.problem_content,
                    record.current_status, record.verified_when_reported, record.triage_status
                ).run();
            } catch (dbErr) {
                console.warn("[FEEDBACK_GATEWAY] D1 insert error:", dbErr);
                _inMemoryFeedback.push(record);
                if (_inMemoryFeedback.length > MAX_IN_MEMORY_FEEDBACK) _inMemoryFeedback.shift();
            }
        } else {
            _inMemoryFeedback.push(record);
            if (_inMemoryFeedback.length > MAX_IN_MEMORY_FEEDBACK) _inMemoryFeedback.shift();
        }

        return new Response(JSON.stringify({
            success: true,
            feedback_id: record.id,
            verified_candidate: verifiedWhenReported === 1,
            message_vi: "Cảm ơn bạn đã báo lỗi! Báo cáo đã được chuyển tới ban học thuật PUMKIN để đối chiếu và cải thiện."
        }), { status: 200, headers: corsHeaders });

    } catch (err) {
        return new Response(JSON.stringify({
            success: false,
            error: { code: "BAD_REQUEST", message_vi: "Payload phản hồi không hợp lệ: " + err.message }
        }), { status: 400, headers: corsHeaders });
    }
}

export async function onRequestGet({ request, env }) {
    const corsHeaders = getCorsHeaders(request);
    const db = env?.DB || env?.FEEDBACK_DB;

    if (db && typeof db.prepare === "function") {
        try {
            const countRes = await db.prepare("SELECT COUNT(*) as total FROM feedback_reports").first();
            const p0Res = await db.prepare("SELECT COUNT(*) as p0 FROM feedback_reports WHERE verified_when_reported = 1").first();
            return new Response(JSON.stringify({
                status: "operational",
                storage: "d1",
                total_reports: countRes?.total || 0,
                p0_candidates: p0Res?.p0 || 0,
                retention_policy_days: 90
            }), { status: 200, headers: corsHeaders });
        } catch (e) {
            return new Response(JSON.stringify({
                status: "operational_fallback",
                storage: "memory",
                total_reports: _inMemoryFeedback.length,
                retention_policy_days: 90
            }), { status: 200, headers: corsHeaders });
        }
    }

    return new Response(JSON.stringify({
        status: "operational_mock",
        storage: "memory",
        total_reports: _inMemoryFeedback.length,
        retention_policy_days: 90
    }), { status: 200, headers: corsHeaders });
}
