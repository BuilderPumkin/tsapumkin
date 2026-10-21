/**
 * Comprehensive Acceptance Test Suite for Pumkin Math API Client SDK
 * Path: tools/test_sdk_math_api.mjs
 */
import PumkinMathAPI from '../pumkin3/js/services/PumkinMathAPI.js';

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

async function runSDKTests() {
    console.log('--- RUNNING PUMKIN MATH API CLIENT SDK TESTS ---');

    const originalFetch = globalThis.fetch;
    const originalSessionStorage = globalThis.sessionStorage;
    const originalCustomEvent = globalThis.CustomEvent;
    const originalWindow = globalThis.window;

    // Mock sessionStorage
    const storageMap = new Map();
    globalThis.sessionStorage = {
        getItem: (k) => storageMap.get(k) || null,
        setItem: (k, v) => storageMap.set(k, String(v)),
        removeItem: (k) => storageMap.delete(k),
        clear: () => storageMap.clear(),
        get length() { return storageMap.size; },
        key: (i) => Array.from(storageMap.keys())[i] || null
    };

    // Mock CustomEvent & Event Dispatcher
    const telemetryEvents = [];
    globalThis.CustomEvent = class MockCustomEvent {
        constructor(name, options = {}) {
            this.name = name;
            this.detail = options.detail || {};
        }
    };
    const dispatchHandler = (event) => {
        if (event.name === 'pumkin:math:telemetry') {
            telemetryEvents.push(event.detail);
        }
        return true;
    };
    globalThis.dispatchEvent = dispatchHandler;
    globalThis.window = {
        dispatchEvent: dispatchHandler
    };

    // 1. Feature Flag Pre-check: All flags default to OFF
    {
        PumkinMathAPI.setFeatureFlags({ 'math.enabled': false });
        const res = await PumkinMathAPI.solve('x + 1 = 2');
        assert(res.success === false, 'Default feature flag: solve() rejected');
        assert(res.error.code === 'FEATURE_DISABLED', 'Error code is FEATURE_DISABLED');
    }

    // Enable Feature Flags for test suite
    PumkinMathAPI.setFeatureFlags({
        'math.enabled': true,
        'math.tutor': true,
        'math.check': true,
        'math.generate': true
    });

    // 2. BaseResponseEnvelope Structure & Successful solve()
    {
        let fetchCallCount = 0;
        let capturedHeaders = null;
        globalThis.fetch = async (url, init) => {
            fetchCallCount++;
            capturedHeaders = init.headers;
            return new Response(JSON.stringify({
                status: 'verified',
                computed_answer: '42',
                dsl: { schema_version: '1.1.0' }
            }), { status: 200 });
        };

        PumkinMathAPI._clearCaches();
        const res = await PumkinMathAPI.solve('Giải phương trình: 2x = 84');
        assert(res.success === true, 'Successful solve returns success: true');
        assert(res.status === 'verified', 'Envelope status is "verified"');
        assert(res.data.computed_answer === '42', 'Envelope contains data.computed_answer');
        assert(res.cached === false, 'Initial call is not cached');
        assert(fetchCallCount === 1, 'Fetch called exactly once');

        // Security check: Client SDK does NOT send X-Pumkin-API-Key
        assert(capturedHeaders['X-Pumkin-API-Key'] === undefined, 'ZERO API Key sent from browser SDK');
        assert(capturedHeaders['Authorization'] === undefined, 'No client authorization token leaked');
    }

    // 3. Dual-tier Caching (In-memory + sessionStorage) for status="verified"
    {
        let fetchCount = 0;
        globalThis.fetch = async () => {
            fetchCount++;
            return new Response(JSON.stringify({
                status: 'verified',
                computed_answer: '100'
            }), { status: 200 });
        };

        PumkinMathAPI._clearCaches();
        const prob = 'Tích phân 0 đến 1';

        // 1st call -> Cache miss
        const res1 = await PumkinMathAPI.solve(prob);
        assert(res1.cached === false, 'First call: cached is false');
        assert(fetchCount === 1, 'First call hit fetch');

        // 2nd call -> Cache hit from in-memory Map
        const res2 = await PumkinMathAPI.solve(prob);
        assert(res2.cached === true, 'Second call: cached is true (in-memory hit)');
        assert(res2.data.computed_answer === '100', 'Cache preserved data');
        assert(fetchCount === 1, 'Second call did NOT hit fetch');

        // Clear in-memory cache to force reading from sessionStorage
        PumkinMathAPI._clearMemoryCache();
        assert(storageMap.size > 0, 'sessionStorage contains cached entry');
        const res3 = await PumkinMathAPI.solve(prob);
        assert(res3.cached === true, 'Third call: cached is true (sessionStorage hit)');
        assert(fetchCount === 1, 'Third call did NOT hit fetch');
    }

    // 4. Non-verified responses are NEVER cached
    {
        let fetchCount = 0;
        globalThis.fetch = async () => {
            fetchCount++;
            return new Response(JSON.stringify({
                status: 'needs_review',
                computed_answer: 'uncertain'
            }), { status: 200 });
        };

        PumkinMathAPI._clearCaches();
        const prob = 'Bài toán thiếu điều kiện biên';

        const res1 = await PumkinMathAPI.solve(prob);
        assert(res1.status === 'needs_review', 'Call 1 returns status needs_review');
        assert(fetchCount === 1, 'Call 1 hits fetch');

        const res2 = await PumkinMathAPI.solve(prob);
        assert(res2.status === 'needs_review', 'Call 2 returns status needs_review');
        assert(res2.cached === false, 'needs_review was NOT cached');
        assert(fetchCount === 2, 'Call 2 hits fetch again');
    }

    // 5. In-flight Request Deduplication
    {
        let fetchCount = 0;
        globalThis.fetch = async () => {
            fetchCount++;
            await new Promise(r => setTimeout(r, 50));
            return new Response(JSON.stringify({ status: 'verified', computed_answer: '7' }), { status: 200 });
        };

        PumkinMathAPI._clearCaches();
        const p1 = PumkinMathAPI.solve('Cùng một câu hỏi đồng thời');
        const p2 = PumkinMathAPI.solve('Cùng một câu hỏi đồng thời');
        const [r1, r2] = await Promise.all([p1, p2]);

        assert(r1.success === true && r2.success === true, 'Both promises resolve successfully');
        assert(fetchCount === 1, 'In-flight duplicate requests deduplicated to 1 fetch call');
    }

    // 6. check() endpoint: idempotent, deduplicated, NEVER cached
    {
        let fetchCount = 0;
        globalThis.fetch = async () => {
            fetchCount++;
            return new Response(JSON.stringify({ status: 'verified', equivalence: true }), { status: 200 });
        };

        PumkinMathAPI._clearCaches();
        const checkPayload = { dsl: { expr: 'x^2 - 1' }, student_answer: '(x-1)(x+1)' };

        const c1 = await PumkinMathAPI.check(checkPayload);
        assert(c1.success === true, 'check() succeeded');
        assert(c1.cached === false, 'check() is not marked cached');

        const c2 = await PumkinMathAPI.check(checkPayload);
        assert(c2.cached === false, 'check() is NEVER cached');
        assert(fetchCount === 2, 'check() always executes fresh request');
    }

    // 7. generate() endpoint: non-idempotent, NEVER cached, retry disabled
    {
        let fetchCount = 0;
        globalThis.fetch = async () => {
            fetchCount++;
            return new Response(JSON.stringify({ status: 'verified', generated_problem: 'Câu hỏi mới' }), { status: 200 });
        };

        const g1 = await PumkinMathAPI.generate({ topic: 'calculus', difficulty: 'M2' });
        assert(g1.success === true, 'generate() succeeded');
        assert(g1.cached === false, 'generate() is not cached');
    }

    // 8. Error Handling: HTTP 401 Unauthorized (No retry)
    {
        let fetchCount = 0;
        globalThis.fetch = async () => {
            fetchCount++;
            return new Response(JSON.stringify({
                status: 'error',
                error: { code: 'UNAUTHORIZED', message: 'Truy cập chưa được ủy quyền.' }
            }), { status: 401 });
        };

        const res = await PumkinMathAPI.solve('Câu hỏi 401');
        assert(res.success === false, 'HTTP 401 returns success: false');
        assert(res.error.code === 'UNAUTHORIZED', 'Error code matches UNAUTHORIZED');
        assert(fetchCount === 1, 'HTTP 401 is NOT retried');
    }

    // 9. Error Handling: HTTP 429 budget_exceeded (No retry, no details leak)
    {
        let fetchCount = 0;
        globalThis.fetch = async () => {
            fetchCount++;
            return new Response(JSON.stringify({
                status: 'error',
                error: { code: 'budget_exceeded', message: 'Ngân sách AI đã chạm trần.' }
            }), { status: 429 });
        };

        const res = await PumkinMathAPI.solve('Câu hỏi 429');
        assert(res.success === false, 'HTTP 429 returns success: false');
        assert(res.error.code === 'budget_exceeded', 'Error code matches budget_exceeded');
        assert(fetchCount === 1, 'HTTP 429 is NOT retried');
    }

    // 10. Error Handling: HTTP 503 Server Error (Retried at most 1 time for solve/check)
    {
        let fetchCount = 0;
        globalThis.fetch = async () => {
            fetchCount++;
            return new Response(JSON.stringify({
                status: 'error',
                error: { code: 'SERVICE_UNAVAILABLE', message: 'Hệ thống bảo trì.' }
            }), { status: 503 });
        };

        PumkinMathAPI._clearCaches();
        PumkinMathAPI._resetCircuit();
        const res = await PumkinMathAPI.solve('Câu hỏi 503');
        assert(res.success === false, 'HTTP 503 returns success: false');
        assert(fetchCount === 2, 'HTTP 503 was retried once (total 2 attempts)');
    }

    // 11. Error Handling: Client-side Timeout via AbortController
    {
        globalThis.fetch = async (url, init) => {
            return new Promise((resolve, reject) => {
                const timer = setTimeout(() => {
                    resolve(new Response(JSON.stringify({ status: 'verified' }), { status: 200 }));
                }, 100);
                if (init.signal) {
                    init.signal.addEventListener('abort', () => {
                        clearTimeout(timer);
                        const err = new Error('The operation was aborted');
                        err.name = 'AbortError';
                        reject(err);
                    });
                }
            });
        };

        PumkinMathAPI._clearCaches();
        PumkinMathAPI._resetCircuit();
        const res = await PumkinMathAPI.solve('Câu hỏi timeout', { timeoutMs: 20 });
        assert(res.success === false, 'Timeout returns success: false');
        assert(res.error.code === 'TIMEOUT', 'Error code is TIMEOUT');
    }

    // 12. Corrupt / Non-JSON Response Handling
    {
        globalThis.fetch = async () => new Response('<html>502 Bad Gateway Nginx</html>', {
            status: 502,
            headers: { 'Content-Type': 'text/html' }
        });

        PumkinMathAPI._clearCaches();
        PumkinMathAPI._resetCircuit();
        const res = await PumkinMathAPI.solve('Câu hỏi HTML 502');
        assert(res.success === false, 'Corrupt response returns success: false');
        assert(res.error.code === 'INVALID_JSON_RESPONSE', 'Error code is INVALID_JSON_RESPONSE');
    }

    // 13. Circuit Breaker: 3 consecutive server failures trip to OPEN
    {
        PumkinMathAPI._resetCircuit();
        PumkinMathAPI._clearCaches();

        globalThis.fetch = async () => {
            throw new Error('Connection refused / Server Dead');
        };

        // Attempt 1 -> Fails with retry (total 2 calls)
        await PumkinMathAPI.solve('Fail 1');
        // Attempt 2 -> Fails with retry
        await PumkinMathAPI.solve('Fail 2');
        // Attempt 3 -> Fails with retry -> trips circuit!
        await PumkinMathAPI.solve('Fail 3');

        const stateAfter3 = PumkinMathAPI._getCircuitState();
        assert(stateAfter3.state === 'OPEN', 'Circuit Breaker tripped to OPEN after 3 failures');

        // Next call immediately fast-fails with CIRCUIT_OPEN without calling fetch
        let fetchCalledWhenOpen = false;
        globalThis.fetch = async () => {
            fetchCalledWhenOpen = true;
            return new Response(JSON.stringify({ status: 'verified' }), { status: 200 });
        };

        const resOpen = await PumkinMathAPI.solve('When Open');
        assert(resOpen.success === false, 'Fast-fail while circuit is OPEN');
        assert(resOpen.error.code === 'CIRCUIT_OPEN', 'Error code is CIRCUIT_OPEN');
        assert(fetchCalledWhenOpen === false, 'Fetch was NOT called when circuit is OPEN');

        // Simulate cooldown elapsed -> transitions to HALF_OPEN probe
        PumkinMathAPI._setCircuitCooldownExpired(70000); // 70s ago (> 60s cooldown)
        globalThis.fetch = async () => new Response(JSON.stringify({ status: 'verified', computed_answer: 'recovered' }), { status: 200 });

        const resProbe = await PumkinMathAPI.solve('Probe request');
        assert(resProbe.success === true, 'Probe request in HALF_OPEN succeeded');
        assert(PumkinMathAPI._getCircuitState().state === 'CLOSED', 'Circuit reset to CLOSED after successful probe');
    }

    // 14. Status Badge Quy chuẩn (Zero "100% chính xác")
    {
        const bVerified = PumkinMathAPI.getBadgeInfo('verified');
        assert(bVerified.label === 'Đã kiểm chứng bằng máy đại số', 'Verified badge label is correct');
        assert(!bVerified.label.includes('100%') && !bVerified.tooltip.includes('100%'), 'Verified badge has ZERO "100%" claims');

        const bReview = PumkinMathAPI.getBadgeInfo('needs_review');
        assert(bReview.label === 'Cần kiểm tra lại', 'Needs review badge label is correct');

        const bUnsup = PumkinMathAPI.getBadgeInfo('unsupported');
        assert(bUnsup.label === 'Chưa kiểm chứng', 'Unsupported badge label is correct');

        const bErr = PumkinMathAPI.getBadgeInfo('error');
        assert(bErr.label === 'Lỗi xử lý', 'Error badge label is correct');
    }

    // 15. attachRetryHandler: addEventListener without inline onclick
    {
        let retryFired = false;
        const mockButton = {
            listeners: {},
            addEventListener(type, fn) {
                this.listeners[type] = fn;
            }
        };

        PumkinMathAPI.attachRetryHandler(mockButton, () => {
            retryFired = true;
        });

        assert(typeof mockButton.listeners['click'] === 'function', 'addEventListener was attached for click');
        mockButton.listeners['click']({ preventDefault: () => {} });
        assert(retryFired === true, 'Retry callback was executed safely');
    }

    // 16. Telemetry Event Dispatch: ZERO Student Question Leak
    {
        assert(telemetryEvents.length > 0, 'Telemetry events were recorded');
        let leakFound = false;
        for (const evt of telemetryEvents) {
            if (evt.question_text || evt.problem || evt.text || evt.question) {
                leakFound = true;
            }
        }
        assert(leakFound === false, 'Zero student question / problem text leaked into telemetry events');
    }

    // Restore globals
    globalThis.fetch = originalFetch;
    globalThis.sessionStorage = originalSessionStorage;
    globalThis.CustomEvent = originalCustomEvent;
    globalThis.window = originalWindow;

    console.log(`\nALL SDK TESTS FINISHED: ${passed} passed, ${failed} failed.`);
    if (failed > 0) process.exit(1);
}

runSDKTests().catch(err => {
    console.error('SDK test execution error:', err);
    process.exit(1);
});
