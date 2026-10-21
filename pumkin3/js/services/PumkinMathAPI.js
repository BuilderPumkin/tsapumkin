/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.MathAPI
 * Layer: Client Services & Math Gateway SDK
 * Path: pumkin3/js/services/PumkinMathAPI.js
 *
 * Description: Client-side SDK connecting Pumkin web applications with Cloudflare Pages Math Gateway.
 *
 * Security & Reliability Governance:
 * 1. Zero Secret Exposure: The browser NEVER touches or transmits MATH_API_KEY. All requests use relative /api/math endpoints.
 * 2. Standardized BaseResponseEnvelope:
 *    { success: boolean, status: "verified" | "needs_review" | "unsupported" | "error", data: object | null, error: object | null, cached: boolean }
 * 3. In-flight Request Deduplication: Merges identical concurrent calls into a single in-flight Promise.
 * 4. Dual-tier Caching: In-memory Map + sessionStorage fallback (ONLY caches status="verified"; wraps storage in try/catch).
 * 5. Circuit Breaker: 3-state (CLOSED, OPEN, HALF_OPEN) with automatic probe after cooldown.
 * 6. Idempotent Retry: Retries at most 1 time for solve/check on network/5xx; NEVER retries on 400, 429 budget_exceeded, or generate.
 * 7. Feature Flags: math.enabled, math.tutor, math.check, math.generate (default OFF).
 * 8. Status Badge Mapping: verified ("Đã kiểm chứng bằng máy đại số"), needs_review, unsupported, error. Zero "100% chính xác".
 * 9. Telemetry: CustomEvent("pumkin:math:telemetry") with ZERO student question/text leak.
 */
(function(window) {
    'use strict';

    // Global namespace initialization
    window.Pumkin = window.Pumkin || {};

    // -------------------------------------------------------------
    // Configuration & Default Constants
    // -------------------------------------------------------------
    const DEFAULT_CONFIG = {
        apiBaseUrl: '/api/math',
        defaultTimeoutMs: 15000, // 15 seconds (safely under gateway's 20s)
        maxRetries: 1,           // At most 1 retry for idempotent operations
        retryDelayMs: 300,       // 300ms backoff before retry
        cacheTtlMs: 1800000,     // 30 minutes short cache TTL
        circuitBreaker: {
            failureThreshold: 3,  // 3 consecutive failures trips the breaker
            cooldownMs: 60000     // 1 minute cooldown before probe
        }
    };

    const SESSION_CACHE_PREFIX = 'pumkin_math_solve_v1_';

    // Feature Flags (Default: all false)
    const _featureFlags = {
        'math.enabled': false,
        'math.tutor': false,
        'math.check': false,
        'math.generate': false
    };

    // Circuit Breaker State Container
    const _circuit = {
        state: 'CLOSED', // 'CLOSED' | 'OPEN' | 'HALF_OPEN'
        consecutiveFailures: 0,
        lastFailureTime: 0,
        isProbing: false
    };

    // In-memory runtime caches
    const _memoryCache = new Map();
    const _inFlightRequests = new Map();

    // -------------------------------------------------------------
    // Storage & Caching Utilities (with strict Error Boundaries)
    // -------------------------------------------------------------
    function _readSessionCache(key) {
        try {
            if (typeof sessionStorage === 'undefined') return null;
            const item = sessionStorage.getItem(SESSION_CACHE_PREFIX + key);
            if (!item) return null;
            const parsed = JSON.parse(item);
            if (parsed && parsed.expiry && Date.now() > parsed.expiry) {
                sessionStorage.removeItem(SESSION_CACHE_PREFIX + key);
                return null;
            }
            return parsed ? parsed.envelope : null;
        } catch (e) {
            // Incognito mode, disabled storage, or corrupted JSON
            return null;
        }
    }

    function _writeSessionCache(key, envelope, ttlMs) {
        try {
            if (typeof sessionStorage === 'undefined') return;
            const entry = {
                expiry: Date.now() + ttlMs,
                envelope: envelope
            };
            sessionStorage.setItem(SESSION_CACHE_PREFIX + key, JSON.stringify(entry));
        } catch (e) {
            // QuotaExceededError or security block - silently ignore
        }
    }

    function _getCache(key) {
        // 1. Check in-memory Map
        if (_memoryCache.has(key)) {
            const memEntry = _memoryCache.get(key);
            if (Date.now() <= memEntry.expiry) {
                return { ...memEntry.envelope, cached: true };
            }
            _memoryCache.delete(key);
        }

        // 2. Check sessionStorage fallback
        const sessionEnvelope = _readSessionCache(key);
        if (sessionEnvelope) {
            // Re-populate in-memory cache
            _memoryCache.set(key, {
                expiry: Date.now() + DEFAULT_CONFIG.cacheTtlMs,
                envelope: sessionEnvelope
            });
            return { ...sessionEnvelope, cached: true };
        }

        return null;
    }

    function _setCache(key, envelope, ttlMs = DEFAULT_CONFIG.cacheTtlMs) {
        // Governance rule: ONLY cache verified status!
        if (!envelope || envelope.status !== 'verified') {
            return;
        }
        _memoryCache.set(key, {
            expiry: Date.now() + ttlMs,
            envelope: envelope
        });
        _writeSessionCache(key, envelope, ttlMs);
    }

    // -------------------------------------------------------------
    // Telemetry Dispatch (Zero Student Question / PII Leakage)
    // -------------------------------------------------------------
    function _dispatchTelemetry(action, status, durationMs, errorCode = null, cached = false) {
        try {
            if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof CustomEvent === 'function') {
                const telemetryDetail = {
                    action: action,
                    status: status,
                    duration_ms: Math.round(durationMs),
                    error_code: errorCode,
                    cached: Boolean(cached),
                    circuit_state: _circuit.state,
                    timestamp: new Date().toISOString()
                };
                const event = new CustomEvent('pumkin:math:telemetry', { detail: telemetryDetail });
                window.dispatchEvent(event);
            }
        } catch (err) {
            // Telemetry must never throw or break student UX
        }
    }

    // -------------------------------------------------------------
    // Circuit Breaker State Manager
    // -------------------------------------------------------------
    function _canProceedCircuit() {
        const now = Date.now();
        if (_circuit.state === 'CLOSED') {
            return true;
        }

        if (_circuit.state === 'OPEN') {
            // Check if cooldown period has elapsed
            if (now - _circuit.lastFailureTime >= DEFAULT_CONFIG.circuitBreaker.cooldownMs) {
                _circuit.state = 'HALF_OPEN';
                _circuit.isProbing = true;
                return true; // Allow one probe request through
            }
            return false; // Circuit still open; fast-fail
        }

        if (_circuit.state === 'HALF_OPEN') {
            // If already probing, reject other concurrent requests until probe finishes
            return !_circuit.isProbing;
        }

        return true;
    }

    function _recordCircuitSuccess() {
        _circuit.consecutiveFailures = 0;
        _circuit.isProbing = false;
        _circuit.state = 'CLOSED';
    }

    function _recordCircuitFailure(isServerOrNetworkDown) {
        if (!isServerOrNetworkDown) {
            // Client errors (400, 401, 403, 404, 429 budget_exceeded) do NOT trip circuit breaker
            if (_circuit.state === 'HALF_OPEN') {
                _circuit.isProbing = false;
            }
            return;
        }

        const now = Date.now();
        _circuit.lastFailureTime = now;
        _circuit.isProbing = false;

        if (_circuit.state === 'HALF_OPEN') {
            // Probe failed; return to OPEN
            _circuit.state = 'OPEN';
        } else if (_circuit.state === 'CLOSED') {
            _circuit.consecutiveFailures++;
            if (_circuit.consecutiveFailures >= DEFAULT_CONFIG.circuitBreaker.failureThreshold) {
                _circuit.state = 'OPEN';
            }
        }
    }

    // -------------------------------------------------------------
    // BaseResponseEnvelope Builder
    // -------------------------------------------------------------
    function _createEnvelope(success, status, data = null, error = null, cached = false) {
        return {
            success: Boolean(success),
            status: status, // "verified" | "needs_review" | "unsupported" | "error"
            data: data,
            error: error ? {
                code: error.code || 'UNKNOWN_ERROR',
                message: error.message || 'Đã xảy ra lỗi không xác định.'
            } : null,
            cached: Boolean(cached)
        };
    }

    // -------------------------------------------------------------
    // Core HTTP Request Executor (AbortController, Deduplication, Retry)
    // -------------------------------------------------------------
    async function _requestWithPolicy(action, endpoint, bodyObj, options = {}) {
        const startTime = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
        const timeoutMs = options.timeoutMs || DEFAULT_CONFIG.defaultTimeoutMs;
        const isIdempotent = (action === 'solve' || action === 'check');
        const maxRetries = (isIdempotent && options.retry !== false) ? DEFAULT_CONFIG.maxRetries : 0;

        // 1. Feature Flag Pre-check
        if (!_featureFlags['math.enabled']) {
            const errEnv = _createEnvelope(false, 'error', null, {
                code: 'FEATURE_DISABLED',
                message: 'Dịch vụ tính toán CAS hiện chưa được kích hoạt.'
            });
            _dispatchTelemetry(action, 'error', 0, 'FEATURE_DISABLED', false);
            return errEnv;
        }

        if (action === 'check' && !_featureFlags['math.check']) {
            const errEnv = _createEnvelope(false, 'error', null, {
                code: 'FEATURE_DISABLED',
                message: 'Tính năng kiểm tra bài giải CAS hiện chưa được kích hoạt.'
            });
            _dispatchTelemetry(action, 'error', 0, 'FEATURE_DISABLED', false);
            return errEnv;
        }

        if (action === 'generate' && !_featureFlags['math.generate']) {
            const errEnv = _createEnvelope(false, 'error', null, {
                code: 'FEATURE_DISABLED',
                message: 'Tính năng sinh đề tương đương hiện chưa được kích hoạt.'
            });
            _dispatchTelemetry(action, 'error', 0, 'FEATURE_DISABLED', false);
            return errEnv;
        }

        // 2. Circuit Breaker Pre-check
        if (!_canProceedCircuit()) {
            const elapsed = ((typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now()) - startTime;
            const errEnv = _createEnvelope(false, 'error', null, {
                code: 'CIRCUIT_OPEN',
                message: 'Hệ thống tính toán đang bảo trì hoặc quá tải. Vui lòng thử lại sau giây lát.'
            });
            _dispatchTelemetry(action, 'error', elapsed, 'CIRCUIT_OPEN', false);
            return errEnv;
        }

        // 3. Execution loop (with max 1 retry for idempotent operations)
        let attempt = 0;
        let lastError = null;

        while (attempt <= maxRetries) {
            attempt++;
            const controller = new AbortController();
            const timerId = setTimeout(() => controller.abort(), timeoutMs);

            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyObj),
                    signal: controller.signal
                });
                clearTimeout(timerId);

                // Handle Corrupted or Non-JSON responses
                let responseJson = null;
                const rawText = await response.text();
                try {
                    responseJson = rawText ? JSON.parse(rawText) : {};
                } catch (parseErr) {
                    const elapsed = ((typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now()) - startTime;
                    _recordCircuitFailure(true);
                    const errEnv = _createEnvelope(false, 'error', null, {
                        code: 'INVALID_JSON_RESPONSE',
                        message: 'Phản hồi từ máy chủ tính toán không đúng định dạng chuẩn.'
                    });
                    _dispatchTelemetry(action, 'error', elapsed, 'INVALID_JSON_RESPONSE', false);
                    return errEnv;
                }

                // HTTP Success (200 - 299)
                if (response.ok) {
                    _recordCircuitSuccess();
                    const status = responseJson.status || 'verified';
                    const envelope = _createEnvelope(true, status, responseJson, null, false);
                    const elapsed = ((typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now()) - startTime;
                    _dispatchTelemetry(action, status, elapsed, null, false);
                    return envelope;
                }

                // HTTP 429: Budget Exceeded or Rate Limit
                if (response.status === 429) {
                    _recordCircuitFailure(false); // Does NOT trip circuit breaker
                    const errorCode = (responseJson.error && responseJson.error.code) || 'BUDGET_EXCEEDED';
                    const errorMsg = (responseJson.error && responseJson.error.message) ||
                        'Ngân sách tính toán AI hiện đã chạm ngưỡng. Vui lòng thử lại vào phiên tiếp theo.';
                    const elapsed = ((typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now()) - startTime;
                    const errEnv = _createEnvelope(false, 'error', null, { code: errorCode, message: errorMsg });
                    _dispatchTelemetry(action, 'error', elapsed, errorCode, false);
                    // NEVER retry on 429
                    return errEnv;
                }

                // HTTP 400 - 499: Client-side errors (400, 401, 403, 404, 413, 415)
                if (response.status >= 400 && response.status < 500) {
                    _recordCircuitFailure(false); // Does NOT trip circuit breaker
                    const errorCode = (responseJson.error && responseJson.error.code) || `HTTP_${response.status}`;
                    const errorMsg = (responseJson.error && responseJson.error.message) || `Yêu cầu không hợp lệ (${response.status}).`;
                    const elapsed = ((typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now()) - startTime;
                    const errEnv = _createEnvelope(false, 'error', null, { code: errorCode, message: errorMsg });
                    _dispatchTelemetry(action, 'error', elapsed, errorCode, false);
                    // NEVER retry on client 4xx
                    return errEnv;
                }

                // HTTP 5xx: Server errors (500, 502, 503, 504)
                if (response.status >= 500) {
                    _recordCircuitFailure(true);
                    lastError = {
                        code: (responseJson.error && responseJson.error.code) || `HTTP_${response.status}`,
                        message: (responseJson.error && responseJson.error.message) || 'Máy chủ tính toán đang gặp sự cố. Vui lòng thử lại.'
                    };

                    // If retry is available for idempotent calls, continue loop
                    if (attempt <= maxRetries) {
                        await new Promise(r => setTimeout(r, DEFAULT_CONFIG.retryDelayMs));
                        continue;
                    }

                    const elapsed = ((typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now()) - startTime;
                    const errEnv = _createEnvelope(false, 'error', null, lastError);
                    _dispatchTelemetry(action, 'error', elapsed, lastError.code, false);
                    return errEnv;
                }
            } catch (networkErr) {
                clearTimeout(timerId);
                const isTimeout = (networkErr && (networkErr.name === 'AbortError' || networkErr.message?.includes('aborted')));
                _recordCircuitFailure(true); // Network fail or timeout trips circuit

                lastError = {
                    code: isTimeout ? 'TIMEOUT' : 'NETWORK_ERROR',
                    message: isTimeout
                        ? 'Quá thời gian chờ phản hồi từ máy chủ tính toán.'
                        : 'Không thể kết nối đến máy chủ tính toán. Vui lòng kiểm tra kết nối mạng.'
                };

                // Retry idempotent requests on network failure if attempts remain
                if (attempt <= maxRetries) {
                    await new Promise(r => setTimeout(r, DEFAULT_CONFIG.retryDelayMs));
                    continue;
                }

                const elapsed = ((typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now()) - startTime;
                const errEnv = _createEnvelope(false, 'error', null, lastError);
                _dispatchTelemetry(action, 'error', elapsed, lastError.code, false);
                return errEnv;
            }
        }

        // Fallback catch-all
        const elapsed = ((typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now()) - startTime;
        const fallbackEnv = _createEnvelope(false, 'error', null, lastError || { code: 'EXECUTION_FAILED', message: 'Thực thi không thành công.' });
        _dispatchTelemetry(action, 'error', elapsed, fallbackEnv.error.code, false);
        return fallbackEnv;
    }

    // -------------------------------------------------------------
    // Public SDK Interface
    // -------------------------------------------------------------
    const PumkinMathAPI = {
        /**
         * Solves a mathematical problem using CAS SymPy with DSL verification.
         * Idempotent; supports in-flight deduplication and dual-tier caching (verified only).
         *
         * @param {string|object} problem - Raw Vietnamese problem text or payload { question_text, ... }
         * @param {object} [options] - Optional settings { timeoutMs, retry }
         * @returns {Promise<BaseResponseEnvelope>}
         */
        async solve(problem, options = {}) {
            const rawText = (typeof problem === 'string') ? problem.trim() : ((problem && problem.question_text) || '').trim();
            if (!rawText) {
                return _createEnvelope(false, 'error', null, {
                    code: 'EMPTY_PROBLEM_TEXT',
                    message: 'Đề bài toán học không được để trống.'
                });
            }

            const bodyPayload = (typeof problem === 'string') ? { question_text: rawText } : { ...problem, question_text: rawText };
            const cacheKey = rawText;

            // 1. Check local two-tier cache
            const cachedResult = _getCache(cacheKey);
            if (cachedResult) {
                _dispatchTelemetry('solve', cachedResult.status, 0, null, true);
                return cachedResult;
            }

            // 2. In-flight request deduplication
            const dedupKey = 'solve:' + cacheKey;
            if (_inFlightRequests.has(dedupKey)) {
                return _inFlightRequests.get(dedupKey);
            }

            const requestPromise = (async () => {
                const endpoint = `${DEFAULT_CONFIG.apiBaseUrl}/solve`;
                const envelope = await _requestWithPolicy('solve', endpoint, bodyPayload, options);

                // Cache ONLY if verified!
                if (envelope.success && envelope.status === 'verified') {
                    _setCache(cacheKey, envelope);
                }

                return envelope;
            })();

            _inFlightRequests.set(dedupKey, requestPromise);
            requestPromise.finally(() => {
                _inFlightRequests.delete(dedupKey);
            });

            return requestPromise;
        },

        /**
         * Checks student solution steps or checks equivalence of two expressions.
         * Idempotent; supports deduplication; NEVER cached.
         *
         * @param {object} payload - { dsl, answer, question_text, ... }
         * @param {object} [options]
         * @returns {Promise<BaseResponseEnvelope>}
         */
        async check(payload, options = {}) {
            if (!payload || typeof payload !== 'object') {
                return _createEnvelope(false, 'error', null, {
                    code: 'INVALID_PAYLOAD',
                    message: 'Dữ liệu kiểm tra bài giải không hợp lệ.'
                });
            }

            const dedupKey = 'check:' + JSON.stringify(payload);
            if (_inFlightRequests.has(dedupKey)) {
                return _inFlightRequests.get(dedupKey);
            }

            const requestPromise = (async () => {
                const endpoint = `${DEFAULT_CONFIG.apiBaseUrl}/check`;
                return await _requestWithPolicy('check', endpoint, payload, options);
            })();

            _inFlightRequests.set(dedupKey, requestPromise);
            requestPromise.finally(() => {
                _inFlightRequests.delete(dedupKey);
            });

            return requestPromise;
        },

        /**
         * Generates equivalent isomorphic math problems.
         * Non-idempotent; NEVER retried automatically; NEVER cached; NO deduplication.
         *
         * @param {object} spec - { topic, difficulty, template_id, ... }
         * @param {object} [options]
         * @returns {Promise<BaseResponseEnvelope>}
         */
        async generate(spec, options = {}) {
            if (!spec || typeof spec !== 'object') {
                return _createEnvelope(false, 'error', null, {
                    code: 'INVALID_SPEC',
                    message: 'Đặc tả sinh đề bài không hợp lệ.'
                });
            }

            const endpoint = `${DEFAULT_CONFIG.apiBaseUrl}/generate`;
            return await _requestWithPolicy('generate', endpoint, spec, { ...options, retry: false });
        },

        // ---------------------------------------------------------
        // Feature Flags Governance
        // ---------------------------------------------------------
        setFeatureFlags(flags = {}) {
            for (const key of Object.keys(_featureFlags)) {
                if (key in flags) {
                    _featureFlags[key] = Boolean(flags[key]);
                }
            }
        },

        getFeatureFlags() {
            return { ..._featureFlags };
        },

        // ---------------------------------------------------------
        // Status & Badge Display Mapping Helper
        // ---------------------------------------------------------
        /**
         * Returns pedagogical status badge metadata.
         * ZERO mention of "chính xác 100%".
         *
         * @param {string} status - "verified" | "needs_review" | "unsupported" | "error"
         * @returns {object} { label, badgeClass, icon, tooltip }
         */
        getBadgeInfo(status) {
            switch (status) {
                case 'verified':
                    return {
                        label: 'Đã kiểm chứng bằng máy đại số',
                        badgeClass: 'pumkin-badge-verified',
                        icon: 'check-circle',
                        tooltip: 'Được xác thực hình thức bởi công cụ giải đại số CAS SymPy'
                    };
                case 'needs_review':
                    return {
                        label: 'Cần kiểm tra lại',
                        badgeClass: 'pumkin-badge-needs-review',
                        icon: 'alert-triangle',
                        tooltip: 'Hệ thống phát hiện điểm chưa chắc chắn hoặc thiếu điều kiện biên'
                    };
                case 'unsupported':
                    return {
                        label: 'Chưa kiểm chứng',
                        badgeClass: 'pumkin-badge-unsupported',
                        icon: 'help-circle',
                        tooltip: 'Đề bài chưa nằm trong tập mẫu đại số được hỗ trợ tự động'
                    };
                case 'error':
                default:
                    return {
                        label: 'Lỗi xử lý',
                        badgeClass: 'pumkin-badge-error',
                        icon: 'x-circle',
                        tooltip: 'Không thể kết nối hoặc xảy ra lỗi trong quá trình tính toán'
                    };
            }
        },

        /**
         * Attaches retry click listener to a DOM button without inline onclick.
         *
         * @param {HTMLElement} buttonElement
         * @param {Function} retryCallback
         */
        attachRetryHandler(buttonElement, retryCallback) {
            if (!buttonElement || typeof buttonElement.addEventListener !== 'function') return;
            buttonElement.addEventListener('click', function handleRetry(evt) {
                if (evt && typeof evt.preventDefault === 'function') {
                    evt.preventDefault();
                }
                if (typeof retryCallback === 'function') {
                    retryCallback();
                }
            });
        },

        // ---------------------------------------------------------
        // Diagnostic & Testing Helpers (for Mock Test verification)
        // ---------------------------------------------------------
        _getCircuitState() {
            return { ..._circuit };
        },

        _resetCircuit() {
            _circuit.state = 'CLOSED';
            _circuit.consecutiveFailures = 0;
            _circuit.lastFailureTime = 0;
            _circuit.isProbing = false;
        },

        _setCircuitCooldownExpired(offsetMs = 70000) {
            _circuit.lastFailureTime = Date.now() - offsetMs;
        },

        _clearMemoryCache() {
            _memoryCache.clear();
        },

        _clearCaches() {
            _memoryCache.clear();
            _inFlightRequests.clear();
            try {
                if (typeof sessionStorage !== 'undefined') {
                    const keysToRemove = [];
                    for (let i = 0; i < sessionStorage.length; i++) {
                        const k = sessionStorage.key(i);
                        if (k && k.startsWith(SESSION_CACHE_PREFIX)) {
                            keysToRemove.push(k);
                        }
                    }
                    keysToRemove.forEach(k => sessionStorage.removeItem(k));
                }
            } catch (e) {
                // Ignore in storage-disabled environments
            }
        },

        _configure(customConfig = {}) {
            Object.assign(DEFAULT_CONFIG, customConfig);
        }
    };

    // Attach to namespace
    window.Pumkin.MathAPI = PumkinMathAPI;

    // Export for Node.js / ES Module testing environments
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = PumkinMathAPI;
    }
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
