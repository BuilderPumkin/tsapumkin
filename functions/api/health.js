export async function onRequest(context) {
    return new Response(JSON.stringify({
        status: "ok",
        service: "pumkin-ai-gateway",
        timestamp: new Date().toISOString()
    }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    });
}