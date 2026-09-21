/**
 * Cloudflare Pages Function / Worker API: /api/ai
 * PUMKIN Socratic AI Tutor - Secure Gemini API Gateway
 * Optimized for Gemini Flash (Gemini 2.5 / 2.0 / 1.5 / 3.6 Flash)
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
        const apiKey = rawApiKey.trim();

        if (!apiKey || apiKey === "AIzaSy_YOUR_GEMINI_API_KEY_HERE" || apiKey === "your_gemini_api_key_here") {
            return new Response(JSON.stringify({
                error: "Chưa cấu hình GEMINI_API_KEY trên Cloudflare. Vui lòng cài đặt tại Cloudflare Settings > Variables and Secrets."
            }), { status: 503, headers: corsHeaders });
        }

        // Validate API Key format: Google AI Studio keys must start with AIzaSy
        if (apiKey.startsWith("AQ.") || apiKey.startsWith("ya29.")) {
            return new Response(JSON.stringify({
                error: "Mã GEMINI_API_KEY hiện tại trên Cloudflare không đúng định dạng. Mã bắt đầu bằng 'AQ.' hoặc 'ya29.' là token tạm thời của Google Cloud, không phải Google AI Studio API Key.\n\n👉 Cách khắc phục:\n1. Truy cập https://aistudio.google.com/app/apikey và đăng nhập tài khoản Google.\n2. Bấm 'Create API key' và copy mã key mới (bắt buộc bắt đầu bằng 'AIzaSy...').\n3. Vào Cloudflare Dashboard > tsapumkin > Settings > Variables and Secrets > Sửa lại biến GEMINI_API_KEY thành mã 'AIzaSy...' vừa lấy.",
                details: "Google API Error: Token type unsupported (ACCESS_TOKEN_TYPE_UNSUPPORTED). Yêu cầu mã API Key AIzaSy... từ Google AI Studio."
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
                const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
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

                const geminiRes = await fetch(endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-goog-api-key": apiKey
                    },
                    body: JSON.stringify(geminiPayload)
                });

                if (!geminiRes.ok) {
                    const errText = await geminiRes.text();
                    lastError = `Model ${model} error (${geminiRes.status}): ${errText}`;
                    
                    // If auth fails (401 or 400 with invalid key), no other model will succeed -> stop early
                    if (geminiRes.status === 401 || (geminiRes.status === 400 && (errText.includes("API_KEY_INVALID") || errText.includes("API key not valid")))) {
                        break;
                    }
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
                    userFriendlyMsg = "Mã GEMINI_API_KEY cài đặt trên Cloudflare không đúng định dạng (Google báo lỗi 401: ACCESS_TOKEN_TYPE_UNSUPPORTED).\n\n👉 Cách khắc phục:\nAPI Key chuẩn của Google AI Studio BẮT BUỘC bắt đầu bằng chữ 'AIzaSy...'.\nVui lòng truy cập https://aistudio.google.com/app/apikey để tạo khóa mới và cập nhật lại vào Cloudflare Settings > Variables and Secrets.";
                } else if (lastError.includes("API_KEY_INVALID") || lastError.includes("API key not valid")) {
                    userFriendlyMsg = "Khóa GEMINI_API_KEY không hợp lệ hoặc đã bị Google vô hiệu hóa. Vui lòng kiểm tra lại API Key trong Cloudflare Dashboard.";
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
