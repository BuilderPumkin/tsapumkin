/**
 * Comprehensive Test Suite for Cloudflare Pages Math Gateway Function
 * Path: functions/api/math/[[path]].js
 */
import { onRequest, buildCacheKeyInput, sha256Hex } from '../functions/api/math/[[path]].js';

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
    console.log('--- RUNNING ENHANCED CLOUDFLARE PAGES GATEWAY UNIT TESTS ---');

    // 1. Path traversal attacks
    {
        const req1 = new Request('https://tsapumkin.pages.dev/api/math/solve/../admin', {
            method: 'POST',
            headers: { 'CF-Connecting-IP': '10.0.1.1' },
            body: JSON.stringify({ question_text: 'x' })
        });
        const res1 = await onRequest({
            request: req1,
            env: {},
            params: { path: ['solve', '..', 'admin'] }
        });
        assert(res1.status === 404, 'Path traversal /solve/../admin blocked with HTTP 404');

        const req2 = new Request('https://tsapumkin.pages.dev/api/math/solve%2F..%2Fadmin', {
            method: 'POST',
            headers: { 'CF-Connecting-IP': '10.0.1.2' },
            body: JSON.stringify({ question_text: 'x' })
        });
        const res2 = await onRequest({
            request: req2,
            env: {},
            params: { path: ['solve%2F..%2Fadmin'] }
        });
        assert(res2.status === 404, 'Encoded traversal solve%2F..%2Fadmin blocked with HTTP 404');
    }

    // 2. Trailing slash and uppercase route
    {
        let capturedUrl = null;
        const originalFetch = globalThis.fetch;
        globalThis.fetch = async (url) => {
            capturedUrl = url;
            return new Response(JSON.stringify({ status: 'verified', computed_answer: '1' }), { status: 200 });
        };

        // Trailing slash: path array has ['solve', '']
        const reqSlash = new Request('https://tsapumkin.pages.dev/api/math/solve/', {
            method: 'POST',
            headers: { 'CF-Connecting-IP': '10.0.2.1' },
            body: JSON.stringify({ question_text: 'x' })
        });
        const resSlash = await onRequest({
            request: reqSlash,
            env: { MATH_API_URL: 'https://backend.example.com' },
            params: { path: ['solve', ''] }
        });
        assert(resSlash.status === 200, 'Trailing slash /solve/ handled cleanly');

        // Uppercase route: SOLVE
        const reqUpper = new Request('https://tsapumkin.pages.dev/api/math/SOLVE', {
            method: 'POST',
            headers: { 'CF-Connecting-IP': '10.0.2.2' },
            body: JSON.stringify({ question_text: 'x' })
        });
        const resUpper = await onRequest({
            request: reqUpper,
            env: { MATH_API_URL: 'https://backend.example.com' },
            params: { path: ['SOLVE'] }
        });
        assert(resUpper.status === 200, 'Uppercase route SOLVE normalized and accepted');

        globalThis.fetch = originalFetch;
    }

    // 3. Query string isolation
    {
        let capturedUrl = null;
        const originalFetch = globalThis.fetch;
        globalThis.fetch = async (url) => {
            capturedUrl = url;
            return new Response(JSON.stringify({ status: 'verified' }), { status: 200 });
        };

        const reqQuery = new Request('https://tsapumkin.pages.dev/api/math/solve?query_leak=evil&foo=bar', {
            method: 'POST',
            headers: { 'CF-Connecting-IP': '10.0.3.1' },
            body: JSON.stringify({ question_text: 'x' })
        });
        const resQuery = await onRequest({
            request: reqQuery,
            env: { MATH_API_URL: 'https://backend.example.com' },
            params: { path: ['solve'] }
        });
        assert(resQuery.status === 200, 'Request with query string handled cleanly');
        assert(capturedUrl === 'https://backend.example.com/v1/solve', 'Backend URL does not leak query string');

        globalThis.fetch = originalFetch;
    }

    // 4. Header shielding: client cookies, authorization, user-agent NOT forwarded
    {
        let capturedHeaders = null;
        const originalFetch = globalThis.fetch;
        globalThis.fetch = async (url, init) => {
            capturedHeaders = init.headers;
            return new Response(JSON.stringify({ status: 'verified' }), { status: 200 });
        };

        const reqShield = new Request('https://tsapumkin.pages.dev/api/math/solve', {
            method: 'POST',
            headers: {
                'CF-Connecting-IP': '10.0.4.1',
                'Cookie': 'student_session=secret_token_abc_123',
                'Authorization': 'Bearer student_private_bearer',
                'User-Agent': 'Mozilla/5.0 SecretStudentDevice',
                'X-Custom-Client-Header': 'leak_attempt'
            },
            body: JSON.stringify({ question_text: 'x' })
        });
        await onRequest({
            request: reqShield,
            env: {
                MATH_API_URL: 'https://backend.example.com',
                MATH_API_KEY: 'internal_gateway_key'
            },
            params: { path: ['solve'] }
        });

        assert(capturedHeaders['Cookie'] === undefined, 'Client Cookie header is shielded (not forwarded)');
        assert(capturedHeaders['Authorization'] === undefined, 'Client Authorization header is shielded');
        assert(capturedHeaders['User-Agent'] === undefined, 'Client User-Agent is shielded');
        assert(capturedHeaders['X-Pumkin-API-Key'] === 'internal_gateway_key', 'Gateway API key injected correctly');

        globalThis.fetch = originalFetch;
    }

    // 5. Body size boundary: exactly 64KB (65,536 bytes) vs 64KB + 1 byte (65,537 bytes)
    {
        const originalFetch = globalThis.fetch;
        globalThis.fetch = async () => new Response(JSON.stringify({ status: 'verified' }), { status: 200 });

        // Exactly 64KB payload
        const exactBase = JSON.stringify({ question_text: '' });
        const paddingNeeded64K = 65536 - exactBase.length;
        const exact64K = JSON.stringify({ question_text: 'a'.repeat(paddingNeeded64K) });
        assert(exact64K.length === 65536, 'Constructed exactly 65,536 bytes payload');

        const req64K = new Request('https://tsapumkin.pages.dev/api/math/solve', {
            method: 'POST',
            headers: {
                'CF-Connecting-IP': '10.0.5.1',
                'Content-Length': '65536'
            },
            body: exact64K
        });
        const res64K = await onRequest({
            request: req64K,
            env: { MATH_API_URL: 'https://backend.example.com' },
            params: { path: ['solve'] }
        });
        assert(res64K.status === 200, 'Body of exactly 64 KB (65,536 bytes) is ACCEPTED');

        // 64KB + 1 byte payload
        const over64K = exact64K + 'x';
        assert(over64K.length === 65537, 'Constructed 65,537 bytes payload (64KB + 1)');

        const reqOver64K = new Request('https://tsapumkin.pages.dev/api/math/solve', {
            method: 'POST',
            headers: {
                'CF-Connecting-IP': '10.0.5.2',
                'Content-Length': '65537'
            },
            body: over64K
        });
        const resOver64K = await onRequest({
            request: reqOver64K,
            env: {},
            params: { path: ['solve'] }
        });
        assert(resOver64K.status === 413, 'Body of 64 KB + 1 byte (65,537 bytes) REJECTED with HTTP 413');

        // Chunked / no Content-Length header with 65,537 bytes
        const reqChunkedOver = new Request('https://tsapumkin.pages.dev/api/math/solve', {
            method: 'POST',
            headers: { 'CF-Connecting-IP': '10.0.5.3' },
            body: over64K
        });
        const resChunkedOver = await onRequest({
            request: reqChunkedOver,
            env: {},
            params: { path: ['solve'] }
        });
        assert(resChunkedOver.status === 413, 'Chunked body without Content-Length > 64KB REJECTED with HTTP 413');

        globalThis.fetch = originalFetch;
    }

    // 6. Semantic Cache Key Distinctness (Testing Mathematical Invariance)
    {
        // Test A: \Delta(0.2) vs \delta(0.2)
        const keyDeltaUpper = await sha256Hex(buildCacheKeyInput('solve', { question_text: '\\Delta(0.2)' }));
        const keyDeltaLower = await sha256Hex(buildCacheKeyInput('solve', { question_text: '\\delta(0.2)' }));
        assert(keyDeltaUpper !== keyDeltaLower, 'Cache keys for \\Delta(0.2) and \\delta(0.2) are DISTINCT');

        // Test B: P(x) vs p(x)
        const keyPUpper = await sha256Hex(buildCacheKeyInput('solve', { question_text: 'P(x)' }));
        const keyPLower = await sha256Hex(buildCacheKeyInput('solve', { question_text: 'p(x)' }));
        assert(keyPUpper !== keyPLower, 'Cache keys for P(x) and p(x) are DISTINCT');

        // Test C: \sin x vs \sinx
        const keySinSpace = await sha256Hex(buildCacheKeyInput('solve', { question_text: '\\sin x' }));
        const keySinNoSpace = await sha256Hex(buildCacheKeyInput('solve', { question_text: '\\sinx' }));
        assert(keySinSpace !== keySinNoSpace, 'Cache keys for \\sin x and \\sinx are DISTINCT');

        // Test D: C_5^2 vs c_5^2
        const keyCombUpper = await sha256Hex(buildCacheKeyInput('solve', { question_text: 'C_5^2' }));
        const keyCombLower = await sha256Hex(buildCacheKeyInput('solve', { question_text: 'c_5^2' }));
        assert(keyCombUpper !== keyCombLower, 'Cache keys for C_5^2 and c_5^2 are DISTINCT');
    }

    // 7. Cache Policy: ONLY cache status="verified" (never needs_review, unsupported, error)
    {
        const mockKV = new Map();
        const fakeEnv = {
            MATH_API_URL: 'https://backend.example.com',
            MATH_KV: {
                get: async (k) => mockKV.get(k) || null,
                put: async (k, v) => mockKV.set(k, v)
            }
        };

        const originalFetch = globalThis.fetch;

        // Sub-case A: status = "verified" -> MUST BE CACHED
        globalThis.fetch = async () => new Response(JSON.stringify({ status: 'verified', computed_answer: '42' }), { status: 200 });
        const reqVer = new Request('https://tsapumkin.pages.dev/api/math/solve', {
            method: 'POST',
            headers: { 'CF-Connecting-IP': '10.0.7.1' },
            body: JSON.stringify({ question_text: 'verified_problem_1' })
        });
        const resVer = await onRequest({ request: reqVer, env: fakeEnv, params: { path: ['solve'] } });
        assert(resVer.status === 200, 'Sub-case A returned 200');
        const cacheKeysA = Array.from(mockKV.keys()).filter(k => k.startsWith('math_solve_cache_'));
        assert(cacheKeysA.length === 1, 'Status "verified" WAS saved to KV cache');

        // Sub-case B: status = "needs_review" -> MUST NOT BE CACHED
        mockKV.clear();
        globalThis.fetch = async () => new Response(JSON.stringify({ status: 'needs_review', computed_answer: '?' }), { status: 200 });
        const reqNR = new Request('https://tsapumkin.pages.dev/api/math/solve', {
            method: 'POST',
            headers: { 'CF-Connecting-IP': '10.0.7.2' },
            body: JSON.stringify({ question_text: 'review_problem_2' })
        });
        const resNR = await onRequest({ request: reqNR, env: fakeEnv, params: { path: ['solve'] } });
        assert(resNR.status === 200, 'Sub-case B returned 200');
        const cacheKeysB = Array.from(mockKV.keys()).filter(k => k.startsWith('math_solve_cache_'));
        assert(cacheKeysB.length === 0, 'Status "needs_review" WAS NOT saved to KV cache');

        // Sub-case C: status = "unsupported" -> MUST NOT BE CACHED
        mockKV.clear();
        globalThis.fetch = async () => new Response(JSON.stringify({ status: 'unsupported' }), { status: 200 });
        const reqUnsup = new Request('https://tsapumkin.pages.dev/api/math/solve', {
            method: 'POST',
            headers: { 'CF-Connecting-IP': '10.0.7.3' },
            body: JSON.stringify({ question_text: 'unsup_problem_3' })
        });
        const resUnsup = await onRequest({ request: reqUnsup, env: fakeEnv, params: { path: ['solve'] } });
        assert(resUnsup.status === 200, 'Sub-case C returned 200');
        const cacheKeysC = Array.from(mockKV.keys()).filter(k => k.startsWith('math_solve_cache_'));
        assert(cacheKeysC.length === 0, 'Status "unsupported" WAS NOT saved to KV cache');

        // Sub-case D: HTTP 400 error -> MUST NOT BE CACHED
        mockKV.clear();
        globalThis.fetch = async () => new Response(JSON.stringify({ error: { code: 'SYNTAX_ERROR' } }), { status: 400 });
        const reqErr = new Request('https://tsapumkin.pages.dev/api/math/solve', {
            method: 'POST',
            headers: { 'CF-Connecting-IP': '10.0.7.4' },
            body: JSON.stringify({ question_text: 'syntax_error_4' })
        });
        const resErr = await onRequest({ request: reqErr, env: fakeEnv, params: { path: ['solve'] } });
        assert(resErr.status === 400, 'Sub-case D returned 400');
        const cacheKeysD = Array.from(mockKV.keys()).filter(k => k.startsWith('math_solve_cache_'));
        assert(cacheKeysD.length === 0, 'Error responses WERE NOT saved to KV cache');

        globalThis.fetch = originalFetch;
    }

    // 8. Health Probe and Pre-warm (?wake=1)
    {
        let wakeCalled = false;
        const originalFetch = globalThis.fetch;
        globalThis.fetch = async (url) => {
            if (url.includes('/health')) wakeCalled = true;
            return new Response(JSON.stringify({ status: 'ok' }), { status: 200 });
        };

        const reqWake = new Request('https://tsapumkin.pages.dev/api/math/health?wake=1', {
            method: 'GET'
        });
        const resWake = await onRequest({
            request: reqWake,
            env: { MATH_API_URL: 'https://backend.example.com' },
            params: { path: ['health'] }
        });
        assert(resWake.status === 200, 'Health probe with ?wake=1 returns HTTP 200');
        const jsonWake = await resWake.json();
        assert(jsonWake.backend_health === 'reachable', 'Backend was pinged and marked reachable');
        assert(wakeCalled === true, 'Backend /health ping was executed for pre-warming');

        globalThis.fetch = originalFetch;
    }

    console.log(`\nALL ENHANCED TESTS FINISHED: ${passed} passed, ${failed} failed.`);
    if (failed > 0) process.exit(1);
}

runTests().catch(err => {
    console.error('Test execution error:', err);
    process.exit(1);
});
