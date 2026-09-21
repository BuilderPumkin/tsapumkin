/**
 * Cloudflare Pages Function / Worker API: /api/ai
 * PUMKIN Socratic AI Tutor - Secure Gemini API Gateway
 * Fully supports Google AI Studio Auth Keys (both AQ... and AIza... formats)
 */

const DEFAULT_MODEL = "gemini-2.5-flash";
const FALLBACK_MODELS = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-flash",
    "gemini-3.6-flash",
    "gemini-1.5-flash-latest"
];

// In-memory sliding rate limit per isolate (15 req/min for free tier safety)
const rateLimitCache = new Map();
const RATE_LIMIT_MAX = 15;
const RATE_LIMIT_WINDOW = 60000;

function checkRateLimit(ip) {
    const now = Date.now();
    const record = rateLimitCache.get(ip) || { count: 0, startTime: now };

    if (now - record.startTime > RATE_LIMIT_WINDOW) {
        record.count = 1;
        record.startTime = now;
    } else {
        record.count++;
    }

    rateLimitCache.set(ip, record);

    if (rateLimitCache.size > 1000) {
        for (const [key, val] of rateLimitCache.entries()) {
            if (now - val.startTime > RATE_LIMIT_WINDOW) {
                rateLimitCache.delete(key);
            }
        }
    }

    return record.count <= RATE_LIMIT_MAX;
}

export async function onRequestOptions() {
    return new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, x-goog-api-key",
            "Access-Control-Max-Age": "86400"
        }
    });
}

export async function onRequestPost(context) {
    const corsHeaders = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    };

    try {
        const { request, env } = context;

        const ip = request.headers.get("cf-connecting-ip") || "unknown";
        if (!checkRateLimit(ip)) {
            return new Response(JSON.stringify({
                error: "Tần suất hỏi quá nhanh. Vui lòng chờ 1 phút trước khi hỏi tiếp."
            }), { status: 429, headers: corsHeaders });
        }

        const rawApiKey = env.GEMINI_API_KEY || env.PUMKIN_AI_API_KEY || "";
        const apiKey = rawApiKey.trim().replace(/^["']|["']$/g, '');

        if (!apiKey || apiKey === "AIzaSy_YOUR_GEMINI_API_KEY_HERE" || apiKey === "your_gemini_api_key_here") {
            return new Response(JSON.stringify({
                error: "Chưa cấu hình GEMINI_API_KEY trên Cloudflare. Vui lòng cài đặt tại Cloudflare Settings > Variables and Secrets."
            }), { status: 503, headers: corsHeaders });
        }

        let body;
        try {
            body = await request.json();
        } catch {
            return new Response(JSON.stringify({ error: "Payload JSON không hợp lệ." }), {
                status: 400, headers: corsHeaders
            });
        }

        if (!body || typeof body !== 'object') {
            return new Response(JSON.stringify({ error: "Dữ liệu yêu cầu không đúng định dạng." }), {
                status: 400, headers: corsHeaders
            });
        }

        const userMessage = typeof body.message === 'string' ? body.message.trim() : "";
        const tutorContext = body.context || {};
        const q = tutorContext.question || {};
        const student = tutorContext.student || {};

        if (!userMessage && !q.text) {
            return new Response(JSON.stringify({ error: "Thiếu nội dung câu hỏi hoặc tin nhắn học sinh." }), {
                status: 400, headers: corsHeaders
            });
        }

        // Jailbreak protection
        const jailbreakRegex = /(ignore all prior instructions|give me the answer|bỏ qua luật|cho tôi đáp án|đáp án là gì|giải hộ|chọn (a|b|c|d))/i;
        if (jailbreakRegex.test(userMessage)) {
            return new Response(JSON.stringify({
                response: {
                    message: "PUMKIN AI là gia sư Socratic đồng hành, không giải hộ bài thi. Em hãy thử viết ra bước tính hoặc ý tưởng đầu tiên của mình nhé!",
                    type: "refusal",
                    hint_level: 1
                },
                metadata: { provider: "PumkinGuardrail", model: "internal" }
            }), { status: 200, headers: corsHeaders });
        }

        // Tier definition
        const tier = tutorContext.active_scaffold_tier || 1;
        const trap = tutorContext.detected_trap || "Không có";

        const systemPrompt = `Bạn là PUMKIN AI - Gia sư Socratic chuyên sâu Toán học & Đánh giá tư duy (TSA/HSA) chuẩn PUMKIN.DEV.
NGUYÊN TẮC BẮT BUỘC:
1. TUYỆT ĐỐI KHÔNG đưa ra đáp số cuối cùng hoặc bảo học sinh chọn đáp án cụ thể (A, B, C, D).
2. Thang gợi ý hiện tại: Bậc ${tier} (1: Gợi ý hướng đi; 2: Khơi gợi định lý/công thức; 3: Chia nhỏ bước con; 4: Tháo gỡ nút thắt). Không vượt quá mức trợ giúp này.
3. Nếu học sinh có nguy cơ dính bẫy nhận thức: ${trap}, hãy nhẹ nhàng cảnh báo điều kiện xác định hoặc bước biến đổi dễ nhầm.
4. Mọi công thức Toán bắt buộc viết dạng LaTeX: $...$ hoặc $$...$$.
5. Giọng điệu: Sư phạm chuẩn mực, thân thiện, khích lệ học sinh tự suy nghĩ.

BÀI TOÁN:
- Câu hỏi: ${q.text || q.question || "Câu hỏi luyện tập"}
- Chủ đề: ${q.topic || "Toán học"}
- Độ khó: ${q.difficulty || "Trung bình"}`;

        const configuredModel = (env.GEMINI_MODEL || DEFAULT_MODEL).trim();
        const modelsToTry = [
            configuredModel,
            ...FALLBACK_MODELS.filter(m => m !== configuredModel)
        ];

        let aiResultText = null;
        let usedModel = null;
        let lastError = null;

        for (const model of modelsToTry) {
            try {
                // Method 1: Header x-goog-api-key (Standard for AQ... Auth keys)
                const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
                const geminiPayload = {
                    contents: [
                        {
                            role: "user",
                            parts: [{ text: `${systemPrompt}\n\n---\n[HỌC SINH HỎI]: ${userMessage}` }]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.2,
                        maxOutputTokens: 1024
                    }
                };

                let geminiRes = await fetch(endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-goog-api-key": apiKey
                    },
                    body: JSON.stringify(geminiPayload)
                });

                // Method 2: Query param fallback if header returns auth challenge
                if (!geminiRes.ok && (geminiRes.status === 401 || geminiRes.status === 403)) {
                    const queryEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
                    const retryRes = await fetch(queryEndpoint, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(geminiPayload)
                    });
                    if (retryRes.ok) {
                        geminiRes = retryRes;
                    }
                }

                if (!geminiRes.ok) {
                    const errText = await geminiRes.text();
                    lastError = `Model ${model} error (${geminiRes.status}): ${errText}`;
                    continue;
                }

                const geminiData = await geminiRes.json();
                const textPart = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

                if (textPart && textPart.trim()) {
                    aiResultText = textPart.trim();
                    usedModel = model;
                    break;
                }
            } catch (err) {
                lastError = err.message;
            }
        }

        if (!aiResultText) {
            let userFriendlyMsg = "Dịch vụ AI phản hồi chậm hoặc mô hình đang bận.";
            if (lastError) {
                if (lastError.includes("ACCESS_TOKEN_TYPE_UNSUPPORTED") || lastError.includes("401")) {
                    userFriendlyMsg = "Khóa GEMINI_API_KEY (mã AQ...) chưa được Google xác thực (Lỗi Google 401: ACCESS_TOKEN_TYPE_UNSUPPORTED).\n\n👉 Vui lòng kiểm tra lại:\n1. Bạn đã copy ĐẦY ĐỦ toàn bộ chuỗi mã khóa trên Google AI Studio chưa (không bị thiếu ký tự ở đầu hoặc cuối)?\n2. Trong Google AI Studio, dự án của bạn đã bật quyền truy cập Gemini API chưa?";
                } else if (lastError.includes("API_KEY_INVALID") || lastError.includes("API key not valid")) {
                    userFriendlyMsg = "Khóa GEMINI_API_KEY không hợp lệ hoặc đã bị Google vô hiệu hóa. Vui lòng kiểm tra lại.";
                } else if (lastError.includes("429") || lastError.includes("RESOURCE_EXHAUSTED")) {
                    userFriendlyMsg = "Đã vượt quá hạn ngạch gọi miễn phí của Google Gemini (15 lượt gọi/phút). Em vui lòng chờ 1 phút rồi hỏi tiếp nhé!";
                } else if (lastError.includes("404")) {
                    userFriendlyMsg = `Mô hình AI (${configuredModel}) không tìm thấy trên Google API.`;
                }
            }
            return new Response(JSON.stringify({
                error: userFriendlyMsg,
                details: lastError || "Không thể kết nối đến Gemini API"
            }), { status: 503, headers: corsHeaders });
        }

        return new Response(JSON.stringify({
            response: {
                message: aiResultText,
                type: "hint",
                hint_level: tier
            },
            metadata: {
                provider: "Cloudflare",
                model: usedModel,
                timestamp: new Date().toISOString()
            }
        }), { status: 200, headers: corsHeaders });

    } catch (err) {
        return new Response(JSON.stringify({
            error: "Đã xảy ra lỗi nội bộ máy chủ.",
            message: err.message
        }), { status: 500, headers: corsHeaders });
    }
}
