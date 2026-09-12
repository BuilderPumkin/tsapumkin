export async function onRequestGet() {
    return new Response(JSON.stringify({
        status: "OK",
        service: "PUMKIN Cloudflare Pages Functions Gateway",
        timestamp: new Date().toISOString()
    }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    });
}