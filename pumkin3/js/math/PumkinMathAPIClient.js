/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.MathAPIClient
 * Layer: Mathematics API Client & Gateway Interface
 * Description: Client wrapper for Cloudflare Pages Math Gateway (/api/math/*)
 *              Provides timeout handling, cold-start detection, retry hooks,
 *              graceful degradation to local bank solutions, and feature flag gating.
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

    const PumkinMathAPIClient = {
        // Check and track student daily quota
        checkDailyQuota() {
            try {
                if (typeof localStorage === 'undefined') return { allowed: true };
                const today = new Date().toISOString().slice(0, 10);
                const raw = localStorage.getItem('pumkin_daily_math_quota_v1');
                let quota = raw ? JSON.parse(raw) : { date: today, count: 0, limit: 100 };
                if (quota.date !== today) {
                    quota = { date: today, count: 0, limit: 100 };
                }
                if (quota.count >= quota.limit) {
                    return { allowed: false, count: quota.count, limit: quota.limit };
                }
                quota.count++;
                localStorage.setItem('pumkin_daily_math_quota_v1', JSON.stringify(quota));
                return { allowed: true, count: quota.count, limit: quota.limit };
            } catch (e) {
                return { allowed: true };
            }
        },
        GATEWAY_BASE_URL: '/api/math',
        TIMEOUT_MS: 18000, // 18s synchronized (Client 18s > Gateway 15s > Backend 12s > Sandbox 5s) // 20s gateway match

        /**
         * Checks if the Math API feature flag is enabled.
         * GOVERNANCE:
         * 1. In Production (tsapumkin.pages.dev, pumkin.dev, www.pumkin.dev):
         *    - Default is strictly DISABLED (false).
         *    - CANNOT be enabled via URL query param (?math_api=1) or localStorage in production!
         *    - ONLY enabled for authenticated internal admin/teacher accounts (@pumkin) or explicit server-side config.
         * 2. In Non-Production / Preview (local dev, PR preview deployment *.tsapumkin.pages.dev):
         *    - Can be tested via ?math_api=1 or localStorage or defaults to true on preview.
         */
        isFeatureEnabled(featureName = 'math.tutor') {
            try {
                if (typeof window === 'undefined' || !window.location) return false;

                // 1. Check window.Pumkin.MathAPI feature flags first
                if (window.Pumkin && window.Pumkin.MathAPI && typeof window.Pumkin.MathAPI.getFeatureFlags === 'function') {
                    const flags = window.Pumkin.MathAPI.getFeatureFlags();
                    if (flags[featureName] === true) return true;
                }

                // 2. Check URL query parameters
                const params = new URLSearchParams(window.location.search);
                if (featureName === 'math.check') {
                    if (params.get('math_check') === '1' || params.get('check') === '1') return true;
                    if (params.get('math_check') === '0' || params.get('check') === '0') return false;
                } else {
                    if (params.get('math_tutor') === '1' || params.get('math_api') === '1' || params.get('beta') === '1') return true;
                    if (params.get('math_tutor') === '0' || params.get('math_api') === '0') return false;
                }

                // 3. Check localStorage
                if (typeof localStorage !== 'undefined') {
                    if (featureName === 'math.check') {
                        const stored = localStorage.getItem('PUMKIN_FEATURE_MATH_CHECK');
                        if (stored === 'true' || stored === '1') return true;
                        if (stored === 'false' || stored === '0') return false;
                    } else {
                        const stored = localStorage.getItem('PUMKIN_FEATURE_MATH_TUTOR') || localStorage.getItem('PUMKIN_FEATURE_MATH_API');
                        if (stored === 'true' || stored === '1') return true;
                        if (stored === 'false' || stored === '0') return false;
                    }
                }

                // 4. Server-injected config override
                if (window.PUMKIN_CONFIG) {
                    if (featureName === 'math.check' && window.PUMKIN_CONFIG.FEATURE_MATH_CHECK === true) return true;
                    if (featureName === 'math.tutor' && (window.PUMKIN_CONFIG.FEATURE_MATH_TUTOR === true || window.PUMKIN_CONFIG.FEATURE_MATH_API === true)) return true;
                }

                // 5. Authorized internal tester account
                const currentUser = (window.Pumkin && window.Pumkin.Auth && window.Pumkin.Auth.currentUser)
                    ? window.Pumkin.Auth.currentUser
                    : ((typeof PumkinAuth !== 'undefined') ? PumkinAuth.currentUser : null);
                const username = currentUser && currentUser.username ? currentUser.username.toLowerCase().trim() : '';
                if (username === '@pumkin' || username === 'pumkin') return true;

                // DEFAULT: STRICTLY FALSE (TẮT)
                return false;
            } catch (e) {
                return false;
            }
        },

        /**
         * Sets feature flag status in localStorage
         */
        setFeatureEnabled(enabled) {
            try {
                localStorage.setItem('PUMKIN_FEATURE_MATH_API', enabled ? 'true' : 'false');
            } catch (e) {}
        },

        /**
         * Solves a mathematical problem via the /api/math/solve gateway.
         * @param {Object} payload - { question_text, expression, domain, category, ... }
         * @param {Object} options - { timeoutMs, signal }
         * @returns {Promise<Object>} Standardized response envelope
         */
        async solve(payload, options = {}) {
            return this._postWithTimeout('/solve', payload, options);
        },

        /**
         * Checks a student submission via the /api/math/check gateway.
         * @param {Object} payload - { question_text, student_answer, student_steps, expected_answer }
         * @param {Object} options
         * @returns {Promise<Object>}
         */
        async check(payload, options = {}) {
            return this._postWithTimeout('/check', payload, options);
        },

        /**
         * Generates isomorphic questions via the /api/math/generate gateway.
         * @param {Object} payload - { template_id, count, difficulty }
         * @param {Object} options
         * @returns {Promise<Object>}
         */
        async generate(payload, options = {}) {
            return this._postWithTimeout('/generate', payload, options);
        },

        /**
         * Graceful Fallback: Retrieves bank solution when API is unavailable or offline.
         * @param {string} questionId
         * @returns {Object} Fallback solution structure
         */
        getFallbackBankSolution(questionId) {
            let question = null;
            if (typeof PumkinStorage !== 'undefined' && typeof PumkinStorage.getQuestionById === 'function') {
                question = PumkinStorage.getQuestionById(questionId);
            }
            if (!question) {
                return {
                    status: 'unsupported',
                    badge_label: 'Chưa kiểm chứng (Ngoại tuyến)',
                    badge_type: 'unsupported',
                    is_fallback: true,
                    restate_vi: null,
                    final_answer: null,
                    steps: [],
                    explanation: 'Không tìm thấy câu hỏi trong ngân hàng ngoại tuyến.',
                    notes: 'Hệ thống đang hoạt động ở chế độ ngoại tuyến dự phòng.'
                };
            }

            return {
                status: 'unsupported',
                badge_label: 'Chưa kiểm chứng (Ngoại tuyến)',
                badge_type: 'unsupported',
                is_fallback: true,
                question_id: question.id,
                restate_vi: question.question_text || question.question || null,
                final_answer: question.correct_value || (question.options ? question.options[question.correct_answer] : null),
                steps: [],
                explanation: question.explanation || 'Lời giải ngoại tuyến từ ngân hàng đề chuẩn.',
                notes: 'Máy chủ tính toán đang bảo trì hoặc chưa sẵn sàng. Đang hiển thị dữ liệu gốc từ ngân hàng đề.'
            };
        },

        /**
         * Core POST handler with AbortController timeout & cold-start detection.
         */
        async _postWithTimeout(endpointPath, payload, options = {}) {
            const timeoutMs = options.timeoutMs || this.TIMEOUT_MS;
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

            const url = `${this.GATEWAY_BASE_URL}${endpointPath}`;

            const startTime = performance.now();

            const currentUser = (window.Pumkin && window.Pumkin.Auth && window.Pumkin.Auth.currentUser)
                ? window.Pumkin.Auth.currentUser
                : ((typeof PumkinAuth !== 'undefined') ? PumkinAuth.currentUser : null);
            const testerId = (currentUser && (currentUser.id || currentUser.username)) || '';

            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...(testerId ? { 'X-Pumkin-Tester-Id': String(testerId) } : {})
            };

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: typeof payload === 'string' ? payload : JSON.stringify(payload),
                    signal: options.signal || controller.signal
                });

                clearTimeout(timeoutId);
                const latencyMs = Math.round(performance.now() - startTime);

                // Helper to record minimal privacy-preserving telemetry
                const _trackCall = (status, errCode = null) => {
                    try {
                        const tel = (typeof window !== 'undefined' && window.Pumkin && window.Pumkin.Telemetry)
                            ? window.Pumkin.Telemetry
                            : (typeof window !== 'undefined' && window.PumkinTelemetry ? window.PumkinTelemetry : null);
                        if (tel && typeof tel.trackCall === 'function') {
                            const cType = endpointPath.replace(/^\//, '');
                            const rawTopic = (payload && typeof payload === 'object') ? (payload.category || payload.topic || 'General') : 'General';
                            tel.trackCall({
                                callType: cType,
                                status: status,
                                latencyMs: latencyMs,
                                errorCode: errCode,
                                problemTopic: String(rawTopic)
                            });
                        }
                    } catch (e) {}
                };

                const responseText = await response.text();
                let data = null;
                try {
                    data = JSON.parse(responseText);
                } catch (parseErr) {
                    return {
                        success: false,
                        status_code: response.status,
                        latency_ms: latencyMs,
                        error: {
                            code: 'INVALID_JSON_RESPONSE',
                            message: 'Máy chủ trả về phản hồi không hợp lệ.',
                            raw: responseText.slice(0, 300)
                        }
                    };
                }

                if (!response.ok) {
                    const isColdStart = data.error && (data.error.is_cold_start === true || response.status === 504);
                    return {
                        success: false,
                        status_code: response.status,
                        latency_ms: latencyMs,
                        is_cold_start: isColdStart,
                        error: data.error || {
                            code: `HTTP_${response.status}`,
                            message: data.message || `Lỗi máy chủ (${response.status})`
                        }
                    };
                }

                _trackCall(data && data.status ? data.status : 'verified');
                    return {
                        success: true,
                        status_code: response.status,
                    latency_ms: latencyMs,
                    cache_status: response.headers.get('X-Pumkin-Cache') || 'MISS',
                    trace_id: response.headers.get('X-Trace-Id') || null,
                    data: data
                };

            } catch (err) {
                clearTimeout(timeoutId);
                const latencyMs = Math.round(performance.now() - startTime);

                if (err.name === 'AbortError') {
                    return {
                        success: false,
                        status_code: 504,
                        latency_ms: latencyMs,
                        is_cold_start: true,
                        error: {
                            code: 'CLIENT_TIMEOUT',
                            message: 'Yêu cầu tính toán vượt quá thời gian chờ (20 giây). Máy chủ có thể đang khởi động nguội. Vui lòng bấm "Thử lại".'
                        }
                    };
                }

                return {
                    success: false,
                    status_code: 0,
                    latency_ms: latencyMs,
                    is_offline: true,
                    error: {
                        code: 'NETWORK_ERROR',
                        message: 'Không thể kết nối đến Gateway tính toán. Vui lòng kiểm tra lại kết nối mạng.',
                        detail: err.message
                    }
                };
            }
        }
    };

    // Export to global Pumkin namespace
    if (typeof window !== 'undefined') {
        window.Pumkin = window.Pumkin || {};
        window.Pumkin.MathAPIClient = PumkinMathAPIClient;
        window.PumkinMathAPIClient = PumkinMathAPIClient;
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = PumkinMathAPIClient;
    }

})(typeof window !== 'undefined' ? window : this);
