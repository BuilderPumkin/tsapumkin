/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.Psychometrics.RaschEstimator
 * Layer: Psychometrics & Item Response Theory (IRT)
 * Description: Rasch 1PL (One-Parameter Logistic) Engine with EAP & MLE Estimation,
 *              Adaptive Item Selection (CAT), and Shadow Scoring Integration.
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

    const RaschEstimator = {
        CONFIG: {
            SHADOW_MODE: true,           // Chế độ chạy ngầm (Shadow) song song với CTT
            DEFAULT_METHOD: 'EAP',       // Phương pháp ước lượng mặc định: 'EAP' (ổn định) hoặc 'MLE'
            PRIOR_MEAN: 0.0,             // Trung bình tiên nghiệm theta
            PRIOR_SD: 1.0,               // Độ lệch chuẩn tiên nghiệm theta
            MIN_THETA: -4.0,             // Giới hạn dưới của theta
            MAX_THETA: 4.0,              // Giới hạn trên của theta
            QUADRATURE_POINTS: 61,       // Số mốc tích phân số EAP (-4.0 đến +4.0, bước ~0.133)
            MAX_MLE_ITERATIONS: 25,      // Số vòng lặp tối đa của Newton-Raphson
            CONVERGENCE_EPSILON: 0.001,  // Ngưỡng hội tụ Newton-Raphson
            DISPLAY_LEVEL_IN_UI: false   // Cờ cấu hình hiển thị mức năng lực Rasch (Level 1-5) ở kết quả thi
        },

        // =====================================================================
        // 1. CORE 1PL MATHEMATICAL FUNCTIONS
        // =====================================================================

        /**
         * 1PL Item Response Function: P(correct | theta, b) = 1 / (1 + e^-(theta - b))
         * @param {number} theta - Person ability (năng lực thí sinh)
         * @param {number} b - Item difficulty (độ khó câu hỏi)
         * @returns {number} Probability of correct answer in (0, 1)
         */
        probability(theta, b) {
            const diff = theta - b;
            if (diff > 35) return 1.0 - 1e-15;
            if (diff < -35) return 1e-15;
            return 1.0 / (1.0 + Math.exp(-diff));
        },

        /**
         * Fisher Information for item i: I_i(theta) = P_i * (1 - P_i)
         * Cực đại hóa tại theta = b (P = 0.5, I = 0.25)
         * @param {number} theta
         * @param {number} b
         * @returns {number} Fisher information
         */
        fisherInformation(theta, b) {
            const p = this.probability(theta, b);
            return p * (1.0 - p);
        },

        /**
         * Total Test Information Function: I(theta) = sum(I_i(theta))
         * @param {number} theta
         * @param {Array<{b: number}>} items
         * @returns {number}
         */
        testInformation(theta, items) {
            if (!Array.isArray(items) || items.length === 0) return 0;
            return items.reduce((acc, it) => {
                const b = typeof it === 'number' ? it : (it.b !== undefined ? it.b : this.getItemDifficulty(it));
                return acc + this.fisherInformation(theta, b);
            }, 0);
        },

        /**
         * Standard Error of Measurement: SE(theta) = 1 / sqrt(I(theta))
         * @param {number} theta
         * @param {Array<{b: number}>} items
         * @returns {number}
         */
        standardError(theta, items) {
            const info = this.testInformation(theta, items);
            if (info <= 1e-6) return 2.0; // Fallback maximum standard error
            return 1.0 / Math.sqrt(info);
        },

        // =====================================================================
        // 2. ITEM DIFFICULTY INITIALIZATION (COLD-START STRATEGY)
        // =====================================================================

        /**
         * Retrieve or estimate item difficulty b (in logits)
         * Cold-start maps expert difficulty_score (0.1 - 0.98) or M1-M4 into logit scale [-3.5, 3.5]
         * @param {Object} question
         * @returns {number} difficulty parameter b
         */
        getItemDifficulty(question) {
            if (!question) return 0.0;
            if (typeof question.b === 'number') return question.b;
            if (typeof question.rasch_b === 'number') return question.rasch_b;
            if (question.metadata && typeof question.metadata.b === 'number') return question.metadata.b;

            // Strategy 1: Logit conversion from empirical difficulty_score (0.05 to 0.95)
            // b = ln(difficulty_score / (1 - difficulty_score))
            if (typeof question.difficulty_score === 'number') {
                const s = Math.max(0.04, Math.min(0.96, question.difficulty_score));
                return Number(Math.log(s / (1.0 - s)).toFixed(3));
            }

            // Strategy 2: Pedagogical Cognitive Level Mapping (M1 -> M4)
            const lvl = String(question.cognitive_level || "").toUpperCase();
            if (lvl.includes("M1") || lvl.includes("NHẬN")) return -1.73; // p ~ 0.85
            if (lvl.includes("M2") || lvl.includes("THÔNG")) return -0.62; // p ~ 0.65
            if (lvl.includes("M4") || lvl.includes("CAO")) return 1.39;   // p ~ 0.20
            if (lvl.includes("M3") || lvl.includes("VẬN")) return 0.41;   // p ~ 0.40

            return 0.0;
        },

        // =====================================================================
        // 3. THETA ESTIMATION: EAP (EXPECTED A POSTERIORI)
        // =====================================================================

        /**
         * EAP Estimation with Normal Prior N(0, 1)
         * Always converges, handles 100% correct and 0% correct gracefully without exploding.
         * @param {Array<{b: number, correct: boolean|number}>} responses
         * @param {Object} [options]
         * @returns {Object} { theta, se, reliability, method: "EAP" }
         */
        estimateThetaEAP(responses, options) {
            const opts = options || {};
            const priorMean = (opts.priorMean !== undefined) ? opts.priorMean : this.CONFIG.PRIOR_MEAN;
            const priorSd = (opts.priorSd !== undefined) ? opts.priorSd : this.CONFIG.PRIOR_SD;
            const minTheta = (opts.minTheta !== undefined) ? opts.minTheta : this.CONFIG.MIN_THETA;
            const maxTheta = (opts.maxTheta !== undefined) ? opts.maxTheta : this.CONFIG.MAX_THETA;
            const numPoints = (opts.points !== undefined) ? opts.points : this.CONFIG.QUADRATURE_POINTS;

            // Filter valid binary responses
            const valid = (responses || []).filter(r => r && (r.correct === true || r.correct === false || r.correct === 1 || r.correct === 0));
            if (valid.length === 0) {
                return {
                    theta: priorMean,
                    se: priorSd,
                    reliability: 0.0,
                    method: "EAP_PRIOR_DEFAULT",
                    totalItems: 0,
                    correctItems: 0
                };
            }

            const step = (maxTheta - minTheta) / (numPoints - 1);
            const nodes = [];
            const logPriors = [];

            // Precompute quadrature nodes and standard normal prior
            for (let i = 0; i < numPoints; i++) {
                const node = minTheta + i * step;
                nodes.push(node);
                const z = (node - priorMean) / priorSd;
                const logPrior = -0.5 * z * z;
                logPriors.push(logPrior);
            }

            // Compute Log-Likelihood at each node
            const logLikelihoods = new Array(numPoints).fill(0);
            for (let i = 0; i < numPoints; i++) {
                const node = nodes[i];
                let ll = 0;
                for (let j = 0; j < valid.length; j++) {
                    const r = valid[j];
                    const b = (typeof r.b === 'number') ? r.b : this.getItemDifficulty(r);
                    const p = this.probability(node, b);
                    const isCorrect = (r.correct === true || r.correct === 1);
                    ll += isCorrect ? Math.log(p) : Math.log(1.0 - p);
                }
                logLikelihoods[i] = ll + logPriors[i];
            }

            // Normalize weights using log-sum-exp trick to prevent underflow
            let maxLog = -Infinity;
            for (let i = 0; i < numPoints; i++) {
                if (logLikelihoods[i] > maxLog) maxLog = logLikelihoods[i];
            }

            let weightSum = 0;
            const weights = new Array(numPoints);
            for (let i = 0; i < numPoints; i++) {
                weights[i] = Math.exp(logLikelihoods[i] - maxLog);
                weightSum += weights[i];
            }

            // Compute EAP Mean (Theta)
            let thetaEAP = 0;
            for (let i = 0; i < numPoints; i++) {
                thetaEAP += nodes[i] * (weights[i] / weightSum);
            }

            // Compute EAP Standard Error
            let variance = 0;
            for (let i = 0; i < numPoints; i++) {
                const diff = nodes[i] - thetaEAP;
                variance += diff * diff * (weights[i] / weightSum);
            }
            const seEAP = Math.sqrt(variance);

            // Compute separation reliability: R = 1 - (SE^2 / prior_variance)
            const priorVar = priorSd * priorSd;
            const reliability = Math.max(0.0, Math.min(0.99, 1.0 - (variance / priorVar)));

            const correctCount = valid.filter(r => r.correct === true || r.correct === 1).length;

            return {
                theta: Number(thetaEAP.toFixed(3)),
                se: Number(seEAP.toFixed(3)),
                reliability: Number(reliability.toFixed(3)),
                method: "EAP",
                totalItems: valid.length,
                correctItems: correctCount,
                scorePercentage: Math.round((correctCount / valid.length) * 100)
            };
        },

        // =====================================================================
        // 4. THETA ESTIMATION: NEWTON-RAPHSON MLE
        // =====================================================================

        /**
         * Newton-Raphson Maximum Likelihood Estimation (MLE)
         * Includes boundary trimming and Wainer score correction for extreme scores (0% and 100%).
         * @param {Array<{b: number, correct: boolean|number}>} responses
         * @param {Object} [options]
         * @returns {Object} { theta, se, reliability, method: "MLE" }
         */
        estimateThetaMLE(responses, options) {
            const valid = (responses || []).filter(r => r && (r.correct === true || r.correct === false || r.correct === 1 || r.correct === 0));
            if (valid.length === 0) {
                return this.estimateThetaEAP(responses, options);
            }

            const total = valid.length;
            const correctCount = valid.filter(r => r.correct === true || r.correct === 1).length;

            // Handle Extreme Cases (All Correct or All Wrong) where standard MLE is +/- Infinity
            // We apply Wainer & Linacre extreme adjustment (+0.5 or -0.5 score correction)
            let adjustedScore = correctCount;
            if (correctCount === total) {
                adjustedScore = total - 0.5;
            } else if (correctCount === 0) {
                adjustedScore = 0.5;
            }

            // Starting value for Newton-Raphson: logit of adjusted proportion
            const p0 = Math.max(0.01, Math.min(0.99, adjustedScore / total));
            let theta = Math.log(p0 / (1.0 - p0));
            theta = Math.max(this.CONFIG.MIN_THETA, Math.min(this.CONFIG.MAX_THETA, theta));

            // Extract item difficulties
            const bList = valid.map(r => (typeof r.b === 'number') ? r.b : this.getItemDifficulty(r));

            // Newton-Raphson Iterations
            for (let iter = 0; iter < this.CONFIG.MAX_MLE_ITERATIONS; iter++) {
                let scoreFn = 0; // First derivative (Score Function)
                let info = 0;    // Fisher Information (Negative Second Derivative)

                for (let i = 0; i < total; i++) {
                    const pi = this.probability(theta, bList[i]);
                    // For extreme scores, use proportional adjustment
                    const yi = (correctCount === total || correctCount === 0)
                        ? (adjustedScore / total)
                        : (valid[i].correct === true || valid[i].correct === 1 ? 1 : 0);

                    scoreFn += (yi - pi);
                    info += (pi * (1.0 - pi));
                }

                if (info < 1e-6) break;

                const delta = scoreFn / info;
                theta += delta;

                // Boundary clamping
                if (theta > this.CONFIG.MAX_THETA) theta = this.CONFIG.MAX_THETA;
                if (theta < this.CONFIG.MIN_THETA) theta = this.CONFIG.MIN_THETA;

                if (Math.abs(delta) < this.CONFIG.CONVERGENCE_EPSILON) {
                    break;
                }
            }

            const se = this.standardError(theta, valid);
            const reliability = Math.max(0.0, Math.min(0.99, 1.0 - (se * se / 1.0)));

            return {
                theta: Number(theta.toFixed(3)),
                se: Number(se.toFixed(3)),
                reliability: Number(reliability.toFixed(3)),
                method: (correctCount === total || correctCount === 0) ? "MLE_ADJUSTED" : "MLE",
                totalItems: total,
                correctItems: correctCount,
                scorePercentage: Math.round((correctCount / total) * 100)
            };
        },

        // =====================================================================
        // 5. UNIFIED PRIMARY ESTIMATION API
        // =====================================================================

        /**
         * Main estimation method. Returns theta, SE, reliability and student-friendly Ability Level (Level 1-5).
         * @param {Array<{b: number, correct: boolean|number}>} responses
         * @param {Object} [options] - { method: "EAP" | "MLE" }
         * @returns {Object} Complete Rasch profile
         */
        estimateTheta(responses, options) {
            const opts = options || {};
            const method = opts.method || this.CONFIG.DEFAULT_METHOD;

            let result;
            if (method === 'MLE') {
                result = this.estimateThetaMLE(responses, opts);
            } else {
                result = this.estimateThetaEAP(responses, opts);
            }

            // Map continuous theta to Student-Friendly Ability Level (Level 1-5)
            const levelInfo = this.getAbilityLevel(result.theta);

            return {
                ...result,
                abilityLevel: levelInfo.level,
                levelName: levelInfo.name,
                levelBadge: levelInfo.badge,
                levelColor: levelInfo.color,
                levelDescription: levelInfo.description,
                targetLevel: levelInfo.targetLevel
            };
        },

        /**
         * Map theta logit into pedagogical 5-level scale (Mức 1 - 5)
         * Prevents student confusion from seeing raw negative/positive logits.
         * @param {number} theta
         * @returns {Object} Level metadata
         */
        getAbilityLevel(theta) {
            if (theta < -1.5) {
                return {
                    level: 1,
                    name: "Mức 1: Khởi đầu (Foundation)",
                    badge: "🌱 Khởi đầu",
                    color: "#94a3b8",
                    description: "Nắm kiến thức cơ bản mức độ Nhận biết (M1). Cần củng cố định lý và công thức nền tảng.",
                    targetLevel: "M1 → M2"
                };
            } else if (theta < -0.5) {
                return {
                    level: 2,
                    name: "Mức 2: Cơ bản (Developing)",
                    badge: "🌿 Cơ bản",
                    color: "#3b82f6",
                    description: "Đạt chuẩn Thông hiểu (M2). Giải quyết tốt các bài toán quen thuộc, cần rèn luyện tính toán chính xác.",
                    targetLevel: "M2 → M3"
                };
            } else if (theta < 0.5) {
                return {
                    level: 3,
                    name: "Mức 3: Khá (Competent)",
                    badge: "⭐ Khá",
                    color: "#10b981",
                    description: "Năng lực Vận dụng (M3) vững vàng. Xử lý thành thạo các bài toán phân hóa trung bình - khá.",
                    targetLevel: "M3 → M4"
                };
            } else if (theta < 1.5) {
                return {
                    level: 4,
                    name: "Mức 4: Giỏi (Advanced)",
                    badge: "🔥 Giỏi",
                    color: "#f59e0b",
                    description: "Năng lực Vận dụng cao (M4). Tư duy logic sắc sảo, giải quyết tốt các bài toán đa bước và tối ưu.",
                    targetLevel: "M4 vững vàng"
                };
            } else {
                return {
                    level: 5,
                    name: "Mức 5: Xuất sắc (Master)",
                    badge: "👑 Xuất sắc",
                    color: "#8b5cf6",
                    description: "Năng lực xuất sắc chuyên sâu. Tư duy trừu tượng và suy luận vượt trội, đạt chuẩn top đầu kỳ thi TSA/HSA.",
                    targetLevel: "Thủ khoa / Top 1%"
                };
            }
        },

        // =====================================================================
        // 6. ADAPTIVE ITEM SELECTION (CAT ENGINE)
        // =====================================================================

        /**
         * Computerized Adaptive Testing (CAT): Select next optimal item
         * Maximizes Fisher Information by finding item with difficulty b closest to current theta.
         * @param {number} currentTheta
         * @param {Array<Object>} questionPool
         * @param {Array<string>} [administeredItemIds=[]]
         * @returns {Object|null} { item, difficulty_b, information, probability }
         */
        selectNextItem(currentTheta, questionPool, administeredItemIds = []) {
            if (!Array.isArray(questionPool) || questionPool.length === 0) return null;

            const administeredSet = new Set(administeredItemIds);
            const candidates = questionPool.filter(q => q && !administeredSet.has(q.id));

            if (candidates.length === 0) return null;

            let bestItem = null;
            let maxInfo = -1;
            let bestB = 0;
            let bestP = 0.5;

            for (let i = 0; i < candidates.length; i++) {
                const q = candidates[i];
                const b = this.getItemDifficulty(q);
                const info = this.fisherInformation(currentTheta, b);

                if (info > maxInfo) {
                    maxInfo = info;
                    bestItem = q;
                    bestB = b;
                    bestP = this.probability(currentTheta, b);
                }
            }

            return {
                item: bestItem,
                difficulty_b: bestB,
                information: Number(maxInfo.toFixed(4)),
                probability: Number(bestP.toFixed(4)),
                distanceToTheta: Number(Math.abs(bestB - currentTheta).toFixed(3))
            };
        },

        // =====================================================================
        // 7. ONLINE ITEM DIFFICULTY UPDATING (INCREMENTAL CALIBRATION)
        // =====================================================================

        /**
         * Incremental Bayesian Item Calibration:
         * Updates item difficulty parameter b based on observed responses across a student batch.
         * @param {number} currentB - Current difficulty parameter
         * @param {Array<number>} userThetas - Array of estimated user thetas
         * @param {Array<number|boolean>} userResponses - Array of 1 (correct) or 0 (wrong)
         * @param {number} [priorWeight=15] - Weight assigned to previous calibration (shrinkage factor)
         * @returns {Object} { updatedB, sampleSize, deltaB }
         */
        updateItemDifficulty(currentB, userThetas, userResponses, priorWeight = 15) {
            if (!Array.isArray(userThetas) || !Array.isArray(userResponses) || userThetas.length === 0 || userThetas.length !== userResponses.length) {
                return { updatedB: currentB, sampleSize: 0, deltaB: 0 };
            }

            const n = userThetas.length;
            let sumObs = 0;
            let sumExp = 0;
            let sumVar = 0;

            for (let i = 0; i < n; i++) {
                const th = userThetas[i];
                const y = (userResponses[i] === true || userResponses[i] === 1) ? 1 : 0;
                const p = this.probability(th, currentB);

                sumObs += y;
                sumExp += p;
                sumVar += (p * (1.0 - p));
            }

            if (sumVar < 1e-4) {
                return { updatedB: currentB, sampleSize: n, deltaB: 0 };
            }

            // Rasch JMLE / PROX step adjustment:
            // Delta b = - (Observed Correct - Expected Correct) / Sum(Variance)
            const deltaB = -((sumObs - sumExp) / sumVar);

            // Empirical Bayesian Shrinkage:
            const rawNewB = currentB + deltaB;
            const updatedB = (priorWeight * currentB + n * rawNewB) / (priorWeight + n);
            const clampedB = Math.max(this.CONFIG.MIN_THETA, Math.min(this.CONFIG.MAX_THETA, updatedB));

            return {
                updatedB: Number(clampedB.toFixed(3)),
                sampleSize: n,
                deltaB: Number(deltaB.toFixed(3)),
                observedP: Number((sumObs / n).toFixed(3)),
                expectedP: Number((sumExp / n).toFixed(3))
            };
        },

        // =====================================================================
        // 8. SHADOW MODE CONFIGURATION & HELPERS
        // =====================================================================

        isShadowMode() {
            return !!this.CONFIG.SHADOW_MODE;
        },

        setShadowMode(enabled) {
            this.CONFIG.SHADOW_MODE = !!enabled;
        },

        isDisplayInUI() {
            return !!this.CONFIG.DISPLAY_LEVEL_IN_UI;
        },

        setDisplayInUI(enabled) {
            this.CONFIG.DISPLAY_LEVEL_IN_UI = !!enabled;
        }
    };

    // Primary Namespace
    if (typeof window !== 'undefined') {
        window.Pumkin = window.Pumkin || {};
        window.Pumkin.RaschEstimator = RaschEstimator;
        // DEPRECATED: Backward compatibility shim
        window.PumkinRaschEstimator = RaschEstimator;
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = RaschEstimator;
    }
})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
