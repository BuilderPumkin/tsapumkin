/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.CASClient
 * Layer: Mathematics Client-Side Architecture
 * Description: Promise-based CAS Client with Web Worker isolation, 3s timeout & auto-recovery
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

    let _workerScriptUrl = (function() {
        if (typeof document !== 'undefined' && document.currentScript && document.currentScript.src) {
            try {
                return new URL('cas.worker.js', document.currentScript.src).href;
            } catch(e) {}
        }
        return 'js/math/cas.worker.js';
    })();
    const DEFAULT_TIMEOUT_MS = 3000;

    let _worker = null;
    let _workerSupported = typeof window.Worker !== 'undefined';
    let _reqCounter = 0;
    const _pendingRequests = new Map();

    /**
     * Fallback to in-process CASEngine if Worker is unavailable or fails
     */
    function _getInProcessEngine() {
        if (typeof window.CASEngine !== 'undefined') return window.CASEngine;
        if (typeof require !== 'undefined') {
            try { return require('./CASEngine.js'); } catch(e) {}
        }
        return null;
    }

    /**
     * Initialize or restart the Web Worker
     */
    function _initWorker() {
        if (!_workerSupported) return null;

        try {
            if (_worker) {
                _worker.terminate();
            }
            _worker = new Worker(_workerScriptUrl);

            _worker.onmessage = function(event) {
                const data = event.data;
                if (!data || !data.id) return;

                const pending = _pendingRequests.get(data.id);
                if (!pending) return;

                clearTimeout(pending.timer);
                _pendingRequests.delete(data.id);

                if (data.success) {
                    pending.resolve(data.result);
                } else {
                    pending.resolve({
                        valid: false,
                        confidence: 1.0,
                        method: data.type,
                        error: {
                            error_type: 'unverified',
                            location: 'worker_execution',
                            explanation: data.error || 'Lỗi khi thực thi phép tính CAS',
                            suggested_next_step: 'Kiểm tra lại biểu thức đầu vào.'
                        }
                    });
                }
            };

            _worker.onerror = function(err) {
                console.warn('[CASClient] Worker error detected, activating graceful recovery:', err);
                _rejectAllPending('Lỗi tiến trình Worker');
                _restartWorker();
            };

            return _worker;
        } catch (e) {
            console.warn('[CASClient] Failed to instantiate Web Worker. Falling back to in-process execution:', e);
            _workerSupported = false;
            _worker = null;
            return null;
        }
    }

    function _restartWorker() {
        if (_worker) {
            try { _worker.terminate(); } catch(e) {}
            _worker = null;
        }
        _initWorker();
    }

    function _rejectAllPending(reason) {
        _pendingRequests.forEach((req, id) => {
            clearTimeout(req.timer);
            req.resolve({
                valid: false,
                confidence: 1.0,
                method: req.type,
                error: {
                    error_type: 'unverified',
                    location: 'worker_timeout',
                    explanation: reason || 'Worker bị hủy hoặc timeout.',
                    suggested_next_step: 'Thử lại với biểu thức đơn giản hơn.'
                }
            });
        });
        _pendingRequests.clear();
    }

    /**
     * Dispatches a request to Web Worker with 3s timeout
     */
    function _sendRequest(type, payload, timeoutMs = DEFAULT_TIMEOUT_MS) {
        return new Promise((resolve, reject) => {
            const id = 'cas_' + Date.now() + '_' + (++_reqCounter);

            // If Web Worker is not supported or failed to start, use in-process fallback
            if (!_workerSupported || !_worker) {
                const engine = _getInProcessEngine();
                if (engine) {
                    try {
                        let res = null;
                        switch (type) {
                            case 'verify_equivalence':
                                res = engine.verifyEquivalence(payload.expr1, payload.expr2, payload.options);
                                break;
                            case 'check_root':
                                res = engine.checkRoot(payload.equation, payload.root, payload.options);
                                break;
                            case 'verify_equation_step':
                                res = engine.verifyEquationStep(payload.prevStep, payload.nextStep, payload.options);
                                break;
                            case 'verify_derivative':
                                res = engine.verifyDerivative(payload.expr, payload.derivative, payload.variable);
                                break;
                            case 'verify_triangle_inequality':
                                res = engine.verifyTriangleInequality(payload.a, payload.b, payload.c);
                                break;
                            case 'verify_vector_collinear':
                                res = engine.verifyVectorCollinear(payload.u, payload.v);
                                break;
                            case 'verify_vector_dot':
                                res = engine.verifyVectorDotProduct(payload.u, payload.v, payload.expectedDot);
                                break;
                            case 'verify_vector_cross':
                                res = engine.verifyVectorCrossProduct(payload.u, payload.v, payload.expectedCross);
                                break;
                            case 'verify_angle_lines':
                                res = engine.verifyAngleBetweenLines(payload.u1, payload.u2, payload.expectedCos);
                                break;
                            case 'verify_sphere':
                                res = engine.verifySphere(payload.a, payload.b, payload.c, payload.d);
                                break;
                            case 'verify_plane_distance':
                                res = engine.verifyPlaneDistance(payload.point, payload.planeCoeffs, payload.expectedDist);
                                break;
                            case 'verify_combinatorics':
                                res = engine.verifyCombinatorics(payload.n, payload.k, payload.type, payload.expectedVal);
                                break;
                            case 'verify_circular_arrangement':
                                res = engine.verifyCircularArrangement(payload.n, payload.options, payload.expectedCount, payload.expectedProb);
                                break;
                            case 'simplify':
                                res = engine.simplify(payload.expr);
                                break;
                            default:
                                res = { valid: false, error: { error_type: 'unverified', explanation: 'Loại yêu cầu không hỗ trợ' } };
                        }
                        return resolve(res);
                    } catch(err) {
                        return resolve({
                            valid: false,
                            error: { error_type: 'unverified', explanation: err.message }
                        });
                    }
                } else {
                    return resolve({
                        valid: false,
                        error: { error_type: 'unverified', explanation: 'Không tìm thấy CAS Engine' }
                    });
                }
            }

            // Set auto-abort timer (3 seconds)
            const timer = setTimeout(() => {
                console.warn(`[CASClient] Request ${id} timed out after ${timeoutMs}ms. Terminating hanging worker.`);
                _pendingRequests.delete(id);
                // Terminate hanging worker and spawn a fresh one
                _restartWorker();
                resolve({
                    valid: false,
                    confidence: 1.0,
                    method: type,
                    error: {
                        error_type: 'unverified',
                        location: 'cas_timeout',
                        explanation: `Thời gian tính toán CAS vượt quá giới hạn an toàn (${timeoutMs / 1000}s).`,
                        suggested_next_step: 'Biểu thức quá phức tạp hoặc gây vòng lặp, cần kiểm tra thủ công.'
                    }
                });
            }, timeoutMs);

            _pendingRequests.set(id, { resolve, reject, timer, type });

            try {
                _worker.postMessage({ id, type, payload });
            } catch(sendErr) {
                clearTimeout(timer);
                _pendingRequests.delete(id);
                resolve({
                    valid: false,
                    error: { error_type: 'unverified', explanation: `Lỗi truyền dữ liệu worker: ${sendErr.message}` }
                });
            }
        });
    }

    // Auto-init worker on file load if in browser
    if (typeof window !== 'undefined' && typeof window.Worker !== 'undefined') {
        _initWorker();
    }

    const CASClient = {
        /**
         * Verifies if two expressions are mathematically equivalent.
         */
        verifyEquivalent(expr1, expr2, options = {}) {
            return _sendRequest('verify_equivalence', { expr1, expr2, options });
        },

        /**
         * Checks if a given root satisfies an equation.
         */
        checkRoot(equation, root, options = {}) {
            return _sendRequest('check_root', { equation, root, options });
        },

        /**
         * Verifies an equation solving step (preserves solutions, catches spurious roots/root loss).
         */
        verifyEquationStep(prevStep, nextStep, options = {}) {
            return _sendRequest('verify_equation_step', { prevStep, nextStep, options });
        },

        /**
         * Verifies if derivative is correct.
         */
        verifyDerivative(expr, derivative, variable = 'x') {
            return _sendRequest('verify_derivative', { expr, derivative, variable });
        },

        /**
         * Verifies Triangle Inequality: a, b, c > 0 and |b - c| < a < b + c
         */
        verifyTriangleInequality(a, b, c) {
            return _sendRequest('verify_triangle_inequality', { a, b, c });
        },

        /**
         * Verifies if two vectors are collinear
         */
        verifyVectorCollinear(u, v) {
            return _sendRequest('verify_vector_collinear', { u, v });
        },

        /**
         * Verifies dot product of two vectors
         */
        verifyVectorDotProduct(u, v, expectedDot = null) {
            return _sendRequest('verify_vector_dot', { u, v, expectedDot });
        },

        /**
         * Verifies cross product of two 3D vectors
         */
        verifyVectorCrossProduct(u, v, expectedCross = null) {
            return _sendRequest('verify_vector_cross', { u, v, expectedCross });
        },

        /**
         * Verifies angle between two lines
         */
        verifyAngleBetweenLines(u1, u2, expectedCos = null) {
            return _sendRequest('verify_angle_lines', { u1, u2, expectedCos });
        },

        /**
         * Verifies sphere equation condition
         */
        verifySphere(a, b, c, d) {
            return _sendRequest('verify_sphere', { a, b, c, d });
        },

        /**
         * Verifies distance from point to plane
         */
        verifyPlaneDistance(point, planeCoeffs, expectedDist = null) {
            return _sendRequest('verify_plane_distance', { point, planeCoeffs, expectedDist });
        },

        /**
         * Verifies combinatorics calculation
         */
        verifyCombinatorics(n, k, type = 'combination', expectedVal = null) {
            return _sendRequest('verify_combinatorics', { n, k, type, expectedVal });
        },

        /**
         * Verifies circular permutation / round table arrangement
         */
        verifyCircularArrangement(n, options = {}, expectedCount = null, expectedProb = null) {
            return _sendRequest('verify_circular_arrangement', { n, options, expectedCount, expectedProb });
        },

        /**
         * Simplifies an expression.
         */
        simplify(expr) {
            return _sendRequest('simplify', { expr });
        },

        /**
         * Sets custom worker script URL if needed
         */
        setWorkerUrl(url) {
            _workerScriptUrl = url;
            _restartWorker();
        },

        /**
         * Checks if Worker or in-process engine is ready.
         */
        isReady() {
            return _workerSupported || !!_getInProcessEngine();
        }
    };

    window.Pumkin.CAS = CASClient;
    // // DEPRECATED: Backward compatibility shim
    window.CASClient = CASClient;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = CASClient;
    }
})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
