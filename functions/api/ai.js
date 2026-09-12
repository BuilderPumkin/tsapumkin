/**
 * Cloudflare Pages Function: /api/ai
 * PUMKIN Socratic AI Tutor - Secure Gemini API Gateway
 *
 * BẢO MẬT & TƯƠNG THÍCH MÔ HÌNH:
 * - API Key chỉ được đọc từ Cloudflare Environment Secrets (context.env.GEMINI_API_KEY).
 * - Sử dụng các mô hình thế hệ mới nhất: gemini-3.6-flash, gemini-3.7-flash, gemini-3.8-flash.
 * - Tự động loại bỏ các mô hình cũ đã bị Google ngừng hỗ trợ (gemini-2.5-flash, gemini-1.5-flash).
 */

const DEFAULT_MODEL = "gemini-3.6-flash";
const CANDIDATE_MODELS = [
    "gemini-3.6-flash",
    "gemini-3.7-flash",
    "gemini-3.8-flash",
    "gemini-flash-latest"
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

        // 1. Kiểm tra và làm sạch API Key từ Cloudflare Secrets
        const rawApiKey = env.GEMINI_API_KEY || env.PUMKIN_AI_API_KEY || "";
        const apiKey = rawApiKey.trim();

        if (!apiKey || apiKey === "your_gemini_api_key_here") {
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

        // 4. Lựa chọn mô hình thông minh (Tự động chuyển đổi nếu người dùng điền model cũ)
        let targetModel = (env.GEMINI_MODEL || DEFAULT_MODEL).trim();
        if (targetModel.includes("2.5") || targetModel.includes("1.5") || targetModel.includes("2.0") || targetModel.includes("pro-exp")) {
            targetModel = DEFAULT_MODEL; // Tự động ép về gemini-3.6-flash để không bị lỗi 404
        }

        const modelsToTry = [targetModel, ...CANDIDATE_MODELS.filter(m => m !== targetModel)];

        let attemptErrors = [];
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
                    throw new Error(`Model ${model} (${geminiRes.status}): ${errData.error?.message || JSON.stringify(errData)}`);
                }

                const geminiData = await geminiRes.json();
                const candidate = geminiData.candidates?.[0];
                const textPart = candidate?.content?.parts?.[0]?.text;

                if (textPart && textPart.trim()) {
                    aiResultText = textPart.trim();
                    usedModel = model;
                    break;
                } else {
                    throw new Error(`Model ${model}: Phản hồi rỗng`);
                }
            } catch (err) {
                attemptErrors.push(err.message);
            }
        }

        if (!aiResultText) {
            throw new Error("Không thể tạo nội dung từ các mô hình AI khả dụng: " + attemptErrors.join(" | "));
        }

        // 5. Trả về đúng schema cho TutorIntegration.js
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
