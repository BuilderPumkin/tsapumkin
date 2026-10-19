/**
 * Test Suite for Cloudflare Pages Math Gateway Function
 * Path: functions/api/math/[[path]].js
 */
import { onRequest } from '../functions/api/math/[[path]].js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`  ✅ PASS: ${message}`);
        passed++;
    } else {
        console.error(`  ❌ FAIL: ${message}`);
        failed++;
    }
}

async function runTests() {
    console.log('--- RUNNING CLOUDFLARE PAGES GATEWAY UNIT TESTS ---');

    // 1. Test invalid route -> 404
    {
        const req = new Request('https://tsapumkin.pages.dev/api/math/unsupported_action', {
            method: 'POST',
            body: JSON.stringify({ test: 1 })
        });
        const res = await onRequest({
            request: req,
            env: {},
            params: { path: ['unsupported_action'] }
        });
        assert(res.status === 404, 'Invalid route returns HTTP 404');
        const json = await res.json();
        assert(json.error.code === 'ROUTE_NOT_FOUND', 'Returns ROUTE_NOT_FOUND code');
    }

    // 2. Test health probe -> 200
    {
        const req = new Request('https://tsapumkin.pages.dev/api/math/health', {
            method: 'GET'
        });
        const res = await onRequest({
            request: req,
            env: {},
            params: { path: ['health'] }
        });
        assert(res.status === 200, 'Health probe returns HTTP 200');
        const json = await res.json();
        assert(json.status === 'OK', 'Health probe body has status OK');
    }

    // 3. Test invalid method for execution route (e.g. GET /solve) -> 405
    {
        const req = new Request('https://tsapumkin.pages.dev/api/math/solve', {
            method: 'GET'
        });
        const res = await onRequest({
            request: req,
            env: {},
            params: { path: ['solve'] }
        });
        assert(res.status === 405, 'GET on /solve returns HTTP 405 Method Not Allowed');
    }

    // 4. Test OPTIONS preflight -> 204
    {
        const req = new Request('https://tsapumkin.pages.dev/api/math/solve', {
            method: 'OPTIONS',
            headers: { 'Origin': 'https://tsapumkin.pages.dev' }
        });
        const res = await onRequest({
            request: req,
            env: {},
            params: { path: ['solve'] }
        });
        assert(res.status === 204, 'OPTIONS preflight returns HTTP 204');
        assert(res.headers.get('Access-Control-Allow-Origin') === 'https://tsapumkin.pages.dev', 'CORS origin matched');
    }

    // 5. Test payload too large (> 64 KB) -> 413
    {
        const hugeString = 'x'.repeat(70000);
        const req = new Request('https://tsapumkin.pages.dev/api/math/solve', {
            method: 'POST',
            headers: { 'Content-Length': '70000' },
            body: hugeString
        });
        const res = await onRequest({
            request: req,
            env: {},
            params: { path: ['solve'] }
        });
        assert(res.status === 413, 'Payload > 64KB returns HTTP 413');
        const json = await res.json();
        assert(json.error.code === 'PAYLOAD_TOO_LARGE', 'Returns PAYLOAD_TOO_LARGE code');
    }

    // 6. Test invalid JSON -> 400
    {
        const req = new Request('https://tsapumkin.pages.dev/api/math/solve', {
            method: 'POST',
            body: 'not a valid json {{{'
        });
        const res = await onRequest({
            request: req,
            env: {},
            params: { path: ['solve'] }
        });
        assert(res.status === 400, 'Invalid JSON body returns HTTP 400');
        const json = await res.json();
        assert(json.error.code === 'INVALID_JSON', 'Returns INVALID_JSON code');
    }

    // 7. Test rate limiting (exceeding 30 requests/minute) -> 429
    {
        let hitRateLimit = false;
        for (let i = 0; i < 35; i++) {
            const req = new Request('https://tsapumkin.pages.dev/api/math/solve', {
                method: 'POST',
                headers: { 'CF-Connecting-IP': '198.51.100.42' },
                body: JSON.stringify({ question_text: 'x+1' })
            });
            const res = await onRequest({
                request: req,
                env: {},
                params: { path: ['solve'] }
            });
            if (res.status === 429) {
                hitRateLimit = true;
                const json = await res.json();
                assert(json.error.code === 'RATE_LIMIT_EXCEEDED', 'Rate limit returns RATE_LIMIT_EXCEEDED code');
                break;
            }
        }
        assert(hitRateLimit === true, 'Rate limit triggered after 30 requests');
    }

    // 8. Test mock backend forwarding & header injection
    {
        const originalFetch = globalThis.fetch;
        let capturedHeaders = null;
        let capturedUrl = null;

        globalThis.fetch = async (url, init) => {
            capturedUrl = url;
            capturedHeaders = init.headers;
            return new Response(JSON.stringify({
                status: 'verified',
                computed_answer: '2',
                restate_vi: 'Tích phân xác định'
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        };

        const req = new Request('https://tsapumkin.pages.dev/api/math/solve', {
            method: 'POST',
            headers: { 'CF-Connecting-IP': '203.0.113.1' },
            body: JSON.stringify({ question_text: 'int 0 to 1' })
        });

        const res = await onRequest({
            request: req,
            env: {
                MATH_API_URL: 'https://backend.example.com',
                MATH_API_KEY: 'secret_token_12345'
            },
            params: { path: ['solve'] }
        });

        assert(res.status === 200, 'Mock backend returns HTTP 200');
        assert(capturedUrl === 'https://backend.example.com/v1/solve', 'Target URL correctly transformed to /v1/solve');
        assert(capturedHeaders['X-Pumkin-API-Key'] === 'secret_token_12345', 'Secret API key injected into backend request');
        assert(res.headers.get('X-Pumkin-Cache') === 'MISS', 'First request has Cache MISS');

        globalThis.fetch = originalFetch;
    }

    // 9. Test timeout & cold start handling (AbortError) -> 504
    {
        const originalFetch = globalThis.fetch;
        globalThis.fetch = async () => {
            const err = new Error('The operation was aborted');
            err.name = 'AbortError';
            throw err;
        };

        const req = new Request('https://tsapumkin.pages.dev/api/math/solve', {
            method: 'POST',
            headers: { 'CF-Connecting-IP': '203.0.113.2' },
            body: JSON.stringify({ question_text: 'slow problem' })
        });

        const res = await onRequest({
            request: req,
            env: {},
            params: { path: ['solve'] }
        });

        assert(res.status === 504, 'Backend timeout returns HTTP 504');
        const json = await res.json();
        assert(json.error.is_cold_start === true, 'Error has is_cold_start flag true');
        assert(json.error.code === 'BACKEND_TIMEOUT_OR_COLD_START', 'Error has cold start code');

        globalThis.fetch = originalFetch;
    }

    console.log(`\nRESULTS: ${passed} passed, ${failed} failed.`);
    if (failed > 0) process.exit(1);
}

runTests().catch(err => {
    console.error('Test execution error:', err);
    process.exit(1);
});
