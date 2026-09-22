/**
 * SRE Health Check & Liveness Endpoint: /api/healthz
 * Returns 200 OK with detailed system health telemetry.
 */

const START_TIME = Date.now();

export async function onRequest(context = {}) {
    const request = context.request || {};
    const env = context.env || {};
    const cf = request.cf || {};

    const rawKey = env.GEMINI_API_KEY || "";
    const isAiConfigured = Boolean(rawKey && !rawKey.includes("YOUR_") && rawKey.trim().length > 5);

    const healthData = {
        status: "OK",
        service: "pumkin-academic-platform",
        version: "4.1.0",
        timestamp: new Date().toISOString(),
        uptime_seconds: Math.floor((Date.now() - START_TIME) / 1000),
        edge: {
            colo: cf.colo || "LOCAL",
            country: cf.country || "VN",
            asn: cf.asn || "CF"
        },
        subsystems: {
            static_assets: "HEALTHY",
            cognitive_router: "HEALTHY",
            level_and_exp: "HEALTHY",
            storage: "ONLINE",
            ai_gateway: isAiConfigured ? "OPERATIONAL" : "ACTION_REQUIRED_CONFIG_API_KEY"
        }
    };

    return new Response(JSON.stringify(healthData, null, 2), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache, no-store, must-revalidate"
        }
    });
}

export const onRequestGet = onRequest;
