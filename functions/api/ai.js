/**
 * Cloudflare Pages Function: /api/ai
 * PUMKIN Socratic AI Tutor - Secure Gemini API Gateway
 *
 * BẢO MẬT:
 * - API Key chỉ được đọc từ Cloudflare Environment Secrets (context.env.GEMINI_API_KEY).
 * - Không bao giờ trả API key về client hoặc in ra log.
 */

const DEFAULT_MODEL = "gemini-3.6-flash";
const CANDIDATE_MODELS = [
    "gemini-3.6-flash",
    "gemini-3.5-flash",
    "gemini-2.5-flash"
];

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

        // 1. Kiểm tra API Key từ Cloudflare Secrets
        const apiKey = env.GEMINI_API_KEY || env.PUMKIN_AI_API_KEY;
        if (!apiKey || apiKey.trim() === "" || apiKey === "your_gemini_api_key_here") {
            return new Response(JSON.stringify({
                error: "⚠️ GEMINI_API_KEY chưa được thiết lập trên Cloudflare Pages.\n\n" +
                       "👉 Vui lòng vào Cloudflare Dashboard > Workers & Pages > Settings > Variables and Secrets để thêm biến bí mật GEMINI_API_KEY."
            }), {
                status: 503,
                headers: corsHeaders
            });
        }

        // 2. Phân tích nội dung payload
        let body = {};
        try {
            body = await request.json();
        } catch (e) {
            return new Response(JSON.stringify({ error: "Payload JSON không hợp lệ." }), {
                status: 400,
                headers: corsHeaders
            });
        }

        const userMessage = body.message || body.prompt || "";
        const tutorContext = body.context || {};
        const q = tutorContext.question || {};
        const student = tutorContext.student || {};

        if (!userMessage && !q.text) {
            return new Response(JSON.stringify({ error: "Thiếu nội dung câu hỏi hoặc tin nhắn của học sinh." }), {
                status: 400,
                headers: corsHeaders
            });
        }

        // 3. Xây dựng Socratic Prompt chuẩn Sư phạm Toán TSA
        const systemPrompt = `Bạn là Trợ lý Gia sư Socratic AI chuyên sâu luyện thi Đánh giá tư duy (TSA) và Toán học Việt Nam cho nền tảng PUMKIN.DEV.
NGUYÊN TẮC BẮT BUỘC:
1. KHÔNG trực tiếp đưa ra đáp án cuối cùng ngay lập tức.
2. Hãy đặt câu hỏi gợi mở, hướng dẫn tư duy từng bước (Socratic Method).
3. Sử dụng công thức Toán học định dạng LaTeX dạng $...$ hoặc $$...$$.
4. Ngôn ngữ: Tiếng Việt sư phạm, thân thiện, khích lệ và truyền cảm hứng.

THÔNG TIN BÀI TOÁN HIỆN TẠI:
- Mã câu hỏi: ${q.id || "Chưa xác định"}
- Nội dung câu hỏi: ${q.text || "Học sinh đang đặt câu hỏi chung"}
- Chủ đề: ${q.topic || "Toán tư duy TSA"}
${q.choices ? "- Các phương án: " + JSON.stringify(q.choices) : ""}
${student.recurring_errors ? "- Lỗi sai thường gặp của học sinh: " + JSON.stringify(student.recurring_errors) : ""}
`;

        const targetModel = env.GEMINI_MODEL || DEFAULT_MODEL;
        const modelsToTry = [targetModel, ...CANDIDATE_MODELS.filter(m => m !== targetModel)];

        let lastError = null;
        let aiResultText = null;
        let usedModel = null;

        for (const model of modelsToTry) {
            try {
                const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
                const geminiPayload = {
                    contents: [
                        {
                            role: "user",
                            parts: [
                                { text: `${systemPrompt}\n\n[HỌC SINH HỎI]: ${userMessage}` }
                            ]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.3,
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
                    const errData = await geminiRes.json().catch(() => ({}));
                    throw new Error(`Model ${model} failed (${geminiRes.status}): ${JSON.stringify(errData)}`);
                }

                const geminiData = await geminiRes.json();
                const candidate = geminiData.candidates?.[0];
                const textPart = candidate?.content?.parts?.[0]?.text;

                if (textPart) {
                    aiResultText = textPart;
                    usedModel = model;
                    break;
                }
            } catch (err) {
                lastError = err;
            }
        }

        if (!aiResultText) {
            throw lastError || new Error("Không nhận được phản hồi từ mô hình AI.");
        }

        // 4. Trả về đúng schema mà TutorIntegration.js mong đợi
        return new Response(JSON.stringify({
            response: {
                message: aiResultText,
                type: "hint",
                signals: {
                    confidence: 0.95,
                    suggested_action: "encourage_step"
                }
            },
            metadata: {
                provider: "CloudflarePagesGeminiGateway",
                model: usedModel
            }
        }), {
            status: 200,
            headers: corsHeaders
        });

    } catch (err) {
        return new Response(JSON.stringify({
            error: "Lỗi kết nối hoặc xử lý AI trên Cloudflare Pages: " + err.message
        }), {
            status: 500,
            headers: corsHeaders
        });
    }
}