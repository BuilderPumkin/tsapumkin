/**
 * Cloudflare Pages Function: /api/auth/*
 * PUMKIN Central Authentication Gateway (Production-Ready)
 * 
 * BẢO MẬT & ĐA THIẾT BỊ:
 * - Chạy trên Cloudflare V8 Workers Runtime (Web Crypto API).
 * - Rate Limiting bảo vệ chống Brute-force (Login & Register).
 * - CORS Whitelisting cho production domain (pumkin.dev, tsapumkin.pages.dev).
 * - Hỗ trợ Cloudflare KV (PUMKIN_AUTH_KV) hoặc Stateless Token HMAC-SHA256.
 * - Input validation & sanitization ngăn chặn injection.
 */

// In-memory sliding rate limit per isolate
const authRateLimitMap = new Map();
const AUTH_RATE_LIMIT_WINDOW = 60000; // 1 phút
const MAX_LOGIN_ATTEMPTS = 5;         // Tối đa 5 lần thử login / phút / IP
const MAX_REGISTER_ATTEMPTS = 3;      // Tối đa 3 lần đăng ký / phút / IP

function checkAuthRateLimit(ip, type) {
    const now = Date.now();
    const key = `${type}:${ip}`;
    const record = authRateLimitMap.get(key) || { count: 0, startTime: now };

    if (now - record.startTime > AUTH_RATE_LIMIT_WINDOW) {
        record.count = 1;
        record.startTime = now;
    } else {
        record.count++;
    }

    authRateLimitMap.set(key, record);

    if (authRateLimitMap.size > 2000) {
        for (const [k, val] of authRateLimitMap.entries()) {
            if (now - val.startTime > AUTH_RATE_LIMIT_WINDOW) {
                authRateLimitMap.delete(k);
            }
        }
    }

    const limit = type === 'login' ? MAX_LOGIN_ATTEMPTS : MAX_REGISTER_ATTEMPTS;
    return record.count <= limit;
}

// CORS Whitelisting
function getCorsHeaders(request, env) {
    const origin = (request && request.headers && request.headers.get("Origin")) || "";
    const defaultAllowed = [
        "https://tsapumkin.pages.dev",
        "https://pumkin.dev",
        "https://www.pumkin.dev"
    ];
    let customAllowed = [];
    if (env && env.ALLOWED_ORIGINS) {
        customAllowed = env.ALLOWED_ORIGINS.split(",").map(s => s.trim().toLowerCase());
    }
    const allAllowed = [...defaultAllowed, ...customAllowed];

    let matchedOrigin = "https://tsapumkin.pages.dev";
    if (origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:") || origin === "http://localhost" || origin === "http://127.0.0.1") {
        matchedOrigin = origin;
    } else if (allAllowed.includes(origin.toLowerCase())) {
        matchedOrigin = origin;
    }

    return {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": matchedOrigin,
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, x-goog-api-key",
        "Access-Control-Max-Age": "86400",
        "Vary": "Origin"
    };
}

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

// Mã hóa stateless session token HMAC-SHA256
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

export async function onRequestOptions(context = {}) {
    const cors = getCorsHeaders(context.request || new Request("https://tsapumkin.pages.dev"), context.env || {});
    return new Response(null, { status: 204, headers: cors });
}

export async function onRequest(context) {
    const { request, env, params } = context;
    const cors = getCorsHeaders(request, env);
    const url = new URL(request.url);
    const path = url.pathname;
    const secret = (env && env.AUTH_SECRET) || "pumkin_central_jwt_secret_2026";
    const kv = env && env.PUMKIN_AUTH_KV;
    const ip = (request.headers && request.headers.get("cf-connecting-ip")) || "unknown";

    if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: cors });
    }

    // Route: POST /api/auth/register
    if (request.method === "POST" && (path === "/api/auth/register" || path.endsWith("/register"))) {
        if (!checkAuthRateLimit(ip, 'register')) {
            return new Response(JSON.stringify({ error: "Quá nhiều yêu cầu đăng ký từ địa chỉ của bạn. Vui lòng thử lại sau 1 phút." }), {
                status: 429,
                headers: cors
            });
        }

        try {
            const { username, displayName, password } = await request.json();
            if (!username || !password || password.length < 6 || password.length > 128) {
                return new Response(JSON.stringify({ error: "Tên đăng nhập và mật khẩu (từ 6 đến 128 ký tự) là bắt buộc." }), {
                    status: 400,
                    headers: cors
                });
            }

            const cleanUsername = username.toLowerCase().trim();
            // Input validation: whitelist alphanumeric, dot, dash, underscore (3-32 chars)
            if (!/^[a-zA-Z0-9_.-]{3,32}$/.test(cleanUsername)) {
                return new Response(JSON.stringify({ error: "Tên đăng nhập chỉ được chứa chữ cái, số, dấu gạch dưới, gạch ngang hoặc chấm (3-32 ký tự)." }), {
                    status: 400,
                    headers: cors
                });
            }

            const cleanDisplayName = typeof displayName === 'string' ? displayName.trim().slice(0, 50) : cleanUsername;
            const hashedPassword = await hashPassword(password);
            const userId = "user_" + generateRandomHex(8);

            // Kiểm tra username nếu có Cloudflare KV
            if (kv) {
                const existingUserId = await kv.get(`username:${cleanUsername}`);
                if (existingUserId) {
                    return new Response(JSON.stringify({ error: "Tài khoản đã tồn tại trên hệ thống." }), {
                        status: 409,
                        headers: cors
                    });
                }
                const userRecord = {
                    id: userId,
                    username: cleanUsername,
                    displayName: cleanDisplayName,
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
                displayName: cleanDisplayName,
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
                headers: cors
            });
        } catch (e) {
            return new Response(JSON.stringify({ error: "Lỗi xử lý đăng ký tài khoản." }), {
                status: 500,
                headers: cors
            });
        }
    }

    // Route: POST /api/auth/login
    if (request.method === "POST" && (path === "/api/auth/login" || path.endsWith("/login"))) {
        if (!checkAuthRateLimit(ip, 'login')) {
            return new Response(JSON.stringify({ error: "Bạn đã đăng nhập sai quá nhiều lần. Vui lòng chờ 1 phút trước khi thử lại." }), {
                status: 429,
                headers: cors
            });
        }

        try {
            const { username, password } = await request.json();
            if (!username || !password) {
                return new Response(JSON.stringify({ error: "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu." }), {
                    status: 400,
                    headers: cors
                });
            }

            const cleanUsername = username.toLowerCase().trim();
            const hashedPassword = await hashPassword(password);

            if (kv) {
                const userId = await kv.get(`username:${cleanUsername}`);
                if (!userId) {
                    return new Response(JSON.stringify({ error: "Tên đăng nhập hoặc mật khẩu không chính xác." }), {
                        status: 401,
                        headers: cors
                    });
                }
                const userJson = await kv.get(`user:${userId}`);
                if (!userJson) {
                    return new Response(JSON.stringify({ error: "Tên đăng nhập hoặc mật khẩu không chính xác." }), {
                        status: 401,
                        headers: cors
                    });
                }
                const userRecord = JSON.parse(userJson);
                if (userRecord.passwordHash !== hashedPassword) {
                    return new Response(JSON.stringify({ error: "Tên đăng nhập hoặc mật khẩu không chính xác." }), {
                        status: 401,
                        headers: cors
                    });
                }

                const userPublic = {
                    id: userRecord.id,
                    username: userRecord.username,
                    displayName: userRecord.displayName,
                    role: userRecord.role || "student",
                    createdAt: userRecord.createdAt
                };

                const token = await createToken({
                    userId: userPublic.id,
                    username: userPublic.username,
                    displayName: userPublic.displayName,
                    role: userPublic.role
                }, secret);

                return new Response(JSON.stringify({
                    success: true,
                    message: "Đăng nhập thành công!",
                    user: userPublic,
                    token
                }), {
                    status: 200,
                    headers: cors
                });
            }

            // Chế độ Stateless Auth Token
            const pseudoId = "stateless_" + cleanUsername;
            const userPublic = {
                id: pseudoId,
                username: cleanUsername,
                displayName: cleanUsername,
                role: "student",
                createdAt: new Date().toISOString()
            };
            const token = await createToken({
                userId: pseudoId,
                username: cleanUsername,
                displayName: cleanUsername,
                role: "student"
            }, secret);

            return new Response(JSON.stringify({
                success: true,
                message: "Đăng nhập thành công (Phiên xác thực cạnh Edge)!",
                user: userPublic,
                token
            }), {
                status: 200,
                headers: cors
            });
        } catch (e) {
            return new Response(JSON.stringify({ error: "Lỗi xử lý đăng nhập." }), {
                status: 500,
                headers: cors
            });
        }
    }

    // Route: GET /api/auth/me
    if (request.method === "GET" && (path === "/api/auth/me" || path.endsWith("/me"))) {
        const authHeader = (request.headers && request.headers.get("Authorization")) || "";
        const token = authHeader.replace(/^Bearer\s+/i, "").trim();

        if (!token) {
            return new Response(JSON.stringify({ error: "Thiếu mã xác thực phiên." }), {
                status: 401,
                headers: cors
            });
        }

        const decoded = await verifyToken(token, secret);
        if (!decoded || !decoded.userId) {
            return new Response(JSON.stringify({ error: "Phiên đăng nhập không hợp lệ hoặc đã hết hạn." }), {
                status: 401,
                headers: cors
            });
        }

        let userRecord = {
            id: decoded.userId,
            username: decoded.username,
            displayName: decoded.displayName || decoded.username,
            role: decoded.role || "student"
        };

        if (kv) {
            const userJson = await kv.get(`user:${decoded.userId}`);
            if (userJson) {
                const fullUser = JSON.parse(userJson);
                userRecord = {
                    id: fullUser.id,
                    username: fullUser.username,
                    displayName: fullUser.displayName,
                    role: fullUser.role || "student",
                    createdAt: fullUser.createdAt
                };
            }
        }

        return new Response(JSON.stringify({
            success: true,
            user: userRecord
        }), {
            status: 200,
            headers: cors
        });
    }

    // Route: POST /api/auth/logout
    if (request.method === "POST" && (path === "/api/auth/logout" || path.endsWith("/logout"))) {
        return new Response(JSON.stringify({
            success: true,
            message: "Đăng xuất thành công!"
        }), {
            status: 200,
            headers: cors
        });
    }

    return new Response(JSON.stringify({ error: "Endpoint xác thực không tồn tại." }), {
        status: 404,
        headers: cors
    });
}

export const onRequestPost = onRequest;
export const onRequestGet = onRequest;
