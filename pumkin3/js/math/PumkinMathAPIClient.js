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
        GATEWAY_BASE_URL: '/api/math',
        TIMEOUT_MS: 20000, // 20s gateway match

        /**
         * Checks if the Math API feature flag is enabled.
         * Default: enabled for beta testing cohort.
         * Can be toggled via ?math_api=0/1 or localStorage 'PUMKIN_FEATURE_MATH_API'.
         */
        isFeatureEnabled() {
            try {
                if (typeof window !== 'undefined' && window.location) {
                    const params = new URLSearchParams(window.location.search);
                    if (params.get('math_api') === '0') return false;
                    if (params.get('math_api') === '1' || params.get('beta') === '1') return true;
                }
                if (typeof localStorage !== 'undefined') {
                    const stored = localStorage.getItem('PUMKIN_FEATURE_MATH_API');
                    if (stored !== null) return stored === 'true' || stored === '1';
                }
                if (window.PUMKIN_CONFIG && typeof window.PUMKIN_CONFIG.FEATURE_MATH_API === 'boolean') {
                    return window.PUMKIN_CONFIG.FEATURE_MATH_API;
                }
            } catch (e) {
                console.warn('[MathAPIClient] Error reading feature flag:', e);
            }
            // Default to true for testing cohort
            return true;
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

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: typeof payload === 'string' ? payload : JSON.stringify(payload),
                    signal: options.signal || controller.signal
                });

                clearTimeout(timeoutId);
                const latencyMs = Math.round(performance.now() - startTime);

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
    window.Pumkin.MathAPIClient = PumkinMathAPIClient;
    window.PumkinMathAPIClient = PumkinMathAPIClient;

})(typeof window !== 'undefined' ? window : this);
