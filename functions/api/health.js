/**
 * Health Check Endpoint: /api/health
 */

export async function onRequest(context = {}) {
    const request = context.request || {};
    const env = context.env || {};

    const rawKey = env.GEMINI_API_KEY || "";
    const isAiConfigured = Boolean(rawKey && !rawKey.includes("YOUR_") && rawKey.trim().length > 5);

    return new Response(JSON.stringify({
        status: "OK",
        service: "pumkin-academic-platform",
        version: "4.1.0",
        timestamp: new Date().toISOString(),
        ai_configured: isAiConfigured
    }, null, 2), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache, no-store, must-revalidate"
        }
    });
}

export const onRequestGet = onRequest;
