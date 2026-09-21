/**
 * Cloudflare Pages Function: /api/auth/*
 * PUMKIN Central Authentication Gateway
 * 
 * BẢO MẬT & ĐA THIẾT BỊ:
 * - Chạy trên Cloudflare V8 Workers Runtime (Web Crypto API).
 * - Hỗ trợ Cloudflare KV (nếu được liên kết biến PUMKIN_AUTH_KV) hoặc Stateless Token HMAC-SHA256.
 * - KHÔNG lưu mật khẩu plaintext ở bất kỳ đâu.
 */

const CORS_HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-goog-api-key",
    "Access-Control-Max-Age": "86400"
};

// Helper Web Crypto SHA-256
async function hashPassword(password, salt = "pumkin_salt_2026") {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + salt);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
}

// Helper sinh token an toàn
function generateRandomHex(length = 32) {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}

// Mã hóa stateless session token
async function createToken(payload, secret = "pumkin_secure_jwt_secret_key_2026") {
    const encoder = new TextEncoder();
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" })).replace(/=/g, "");
    const body = btoa(unescape(encodeURIComponent(JSON.stringify(payload)))).replace(/=/g, "");
    const unsignedToken = `${header}.${body}`;
    
    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(unsignedToken));
    const sigStr = btoa(String.fromCharCode(...new Uint8Array(signature))).replace(/=/g, "");
    return `${unsignedToken}.${sigStr}`;
}

// Giải mã & xác thực stateless session token
async function verifyToken(token, secret = "pumkin_secure_jwt_secret_key_2026") {
    try {
        const parts = token.split(".");
        if (parts.length !== 3) return null;
        const [header, body, sigStr] = parts;
        const unsignedToken = `${header}.${body}`;
        
        const encoder = new TextEncoder();
        const key = await crypto.subtle.importKey(
            "raw",
            encoder.encode(secret),
            { name: "HMAC", hash: "SHA-256" },
            false,
            ["verify"]
        );
        
        const sigBytes = Uint8Array.from(atob(sigStr), c => c.charCodeAt(0));
        const isValid = await crypto.subtle.verify("HMAC", key, sigBytes, encoder.encode(unsignedToken));
        if (!isValid) return null;
        
        const payloadStr = decodeURIComponent(escape(atob(body)));
        return JSON.parse(payloadStr);
    } catch (e) {
        return null;
    }
}

export async function onRequestOptions() {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequest(context) {
    const { request, env, params } = context;
    const url = new URL(request.url);
    const path = url.pathname;
    const secret = env.AUTH_SECRET || "pumkin_central_jwt_secret_2026";
    const kv = env.PUMKIN_AUTH_KV;

    if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // Route: POST /api/auth/register
    if (request.method === "POST" && (path === "/api/auth/register" || path.endsWith("/register"))) {
        try {
            const { username, displayName, password } = await request.json();
            if (!username || !password || password.length < 6) {
                return new Response(JSON.stringify({ error: "Tên đăng nhập và mật khẩu (tối thiểu 6 ký tự) là bắt buộc." }), {
                    status: 400,
                    headers: CORS_HEADERS
                });
            }

            const cleanUsername = username.toLowerCase().trim();
            const hashedPassword = await hashPassword(password);
            const userId = "user_" + generateRandomHex(8);

            // Kiểm tra username nếu có Cloudflare KV
            if (kv) {
                const existingUserId = await kv.get(`username:${cleanUsername}`);
                if (existingUserId) {
                    return new Response(JSON.stringify({ error: "Tài khoản đã tồn tại trên hệ thống." }), {
                        status: 409,
                        headers: CORS_HEADERS
                    });
                }
                const userRecord = {
                    id: userId,
                    username: cleanUsername,
                    displayName: displayName ? displayName.trim() : username.trim(),
                    passwordHash: hashedPassword,
                    role: "student",
                    createdAt: new Date().toISOString()
                };
                await kv.put(`user:${userId}`, JSON.stringify(userRecord));
                await kv.put(`username:${cleanUsername}`, userId);
            }

            const userPublic = {
                id: userId,
                username: cleanUsername,
                displayName: displayName ? displayName.trim() : username.trim(),
                role: "student",
                createdAt: new Date().toISOString()
            };

            const token = await createToken({ userId, username: cleanUsername, displayName: userPublic.displayName, role: "student" }, secret);

            return new Response(JSON.stringify({
                success: true,
                message: "Đăng ký tài khoản thành công!",
                user: userPublic,
                token
            }), {
                status: 201,
                headers: CORS_HEADERS
            });
        } catch (e) {
            return new Response(JSON.stringify({ error: "Lỗi xử lý đăng ký: " + e.message }), {
                status: 500,
                headers: CORS_HEADERS
            });
        }
    }

    // Route: POST /api/auth/login
    if (request.method === "POST" && (path === "/api/auth/login" || path.endsWith("/login"))) {
        try {
            const { username, password } = await request.json();
            if (!username || !password) {
                return new Response(JSON.stringify({ error: "Vui lòng nhập tên đăng nhập và mật khẩu." }), {
                    status: 400,
                    headers: CORS_HEADERS
                });
            }

            const cleanUsername = username.toLowerCase().trim();
            const hashedPassword = await hashPassword(password);

            let userPublic = null;
            let userId = null;

            if (kv) {
                userId = await kv.get(`username:${cleanUsername}`);
                if (!userId) {
                    return new Response(JSON.stringify({ error: "Tài khoản hoặc mật khẩu không chính xác." }), {
                        status: 401,
                        headers: CORS_HEADERS
                    });
                }
                const userStr = await kv.get(`user:${userId}`);
                const userRecord = userStr ? JSON.parse(userStr) : null;
                if (!userRecord || userRecord.passwordHash !== hashedPassword) {
                    return new Response(JSON.stringify({ error: "Tài khoản hoặc mật khẩu không chính xác." }), {
                        status: 401,
                        headers: CORS_HEADERS
                    });
                }
                userPublic = {
                    id: userRecord.id,
                    username: userRecord.username,
                    displayName: userRecord.displayName,
                    role: userRecord.role || "student",
                    createdAt: userRecord.createdAt
                };
            } else {
                // Fallback deterministic user ID khi KV chưa được liên kết
                userId = "user_" + (await hashPassword(cleanUsername)).substring(0, 16);
                userPublic = {
                    id: userId,
                    username: cleanUsername,
                    displayName: cleanUsername,
                    role: "student",
                    createdAt: new Date().toISOString()
                };
            }

            const token = await createToken({ userId, username: cleanUsername, displayName: userPublic.displayName, role: userPublic.role }, secret);

            return new Response(JSON.stringify({
                success: true,
                message: "Đăng nhập thành công!",
                user: userPublic,
                token
            }), {
                status: 200,
                headers: CORS_HEADERS
            });
        } catch (e) {
            return new Response(JSON.stringify({ error: "Lỗi xử lý đăng nhập: " + e.message }), {
                status: 500,
                headers: CORS_HEADERS
            });
        }
    }

    // Route: GET /api/auth/me
    if (request.method === "GET" && (path === "/api/auth/me" || path.endsWith("/me"))) {
        try {
            const authHeader = request.headers.get("Authorization") || "";
            const token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : null;
            if (!token) {
                return new Response(JSON.stringify({ error: "Thiếu session token xác thực." }), {
                    status: 401,
                    headers: CORS_HEADERS
                });
            }

            const decoded = await verifyToken(token, secret);
            if (!decoded) {
                return new Response(JSON.stringify({ error: "Phiên đăng nhập không hợp lệ hoặc đã hết hạn." }), {
                    status: 401,
                    headers: CORS_HEADERS
                });
            }

            let userPublic = {
                id: decoded.userId,
                username: decoded.username,
                displayName: decoded.displayName || decoded.username,
                role: decoded.role || "student"
            };

            if (kv) {
                const userStr = await kv.get(`user:${decoded.userId}`);
                if (userStr) {
                    const record = JSON.parse(userStr);
                    userPublic = {
                        id: record.id,
                        username: record.username,
                        displayName: record.displayName,
                        role: record.role || "student",
                        createdAt: record.createdAt
                    };
                }
            }

            return new Response(JSON.stringify({
                success: true,
                user: userPublic
            }), {
                status: 200,
                headers: CORS_HEADERS
            });
        } catch (e) {
            return new Response(JSON.stringify({ error: "Lỗi xác thực phiên: " + e.message }), {
                status: 500,
                headers: CORS_HEADERS
            });
        }
    }

    // Route: POST /api/auth/logout
    if (request.method === "POST" && (path === "/api/auth/logout" || path.endsWith("/logout"))) {
        return new Response(JSON.stringify({ success: true, message: "Đã đăng xuất thành công." }), {
            status: 200,
            headers: CORS_HEADERS
        });
    }

    return new Response(JSON.stringify({ error: "Auth Endpoint Not Found", path }), {
        status: 404,
        headers: CORS_HEADERS
    });
}