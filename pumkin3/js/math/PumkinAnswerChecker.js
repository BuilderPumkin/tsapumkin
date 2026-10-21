/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.AnswerChecker
 * Layer: Mathematics Answer Checking & Grading Engine (W5 Engine)
 * Description: Client-side mathematical answer verification, normalization,
 *              distractor-driven misconception classification, Rasch compatibility,
 *              and anti-abuse rate limiting.
 *
 * UNBREAKABLE INVARIANTS:
 * 1. Multiple-choice label selection: Instant local comparison, strictly NO API calls.
 * 2. Free-form math input (short answer/typed text): Dispatches to /v1/check via Pumkin.MathAPIClient when flag is enabled.
 * 3. cannot_determine is NEVER marked incorrect: Preserves score, preserves streak, excludes from error profiling and Rasch.
 */
(function(window) {
    'use strict';

    // Global namespace initialization
    if (typeof window !== 'undefined') {
        window.Pumkin = window.Pumkin || {};
    }

    // Rate limiting & anti-abuse container
    const _submissionHistory = new Map(); // questionId -> Array<timestamps>
    const MAX_SUBMISSIONS_PER_MINUTE = 5;
    const SUBMISSION_WINDOW_MS = 60000;
    const DEBOUNCE_WAIT_MS = 500;
    const _debounceTimers = new Map();

    const PumkinAnswerChecker = {
        name: 'PumkinAnswerChecker',
        version: '1.1.0',

        // ---------------------------------------------------------------------
        // 1. MATHEMATICAL NORMALIZATION UTILITIES
        // ---------------------------------------------------------------------

        /**
         * Strips LaTeX wrappers \( ... \), \[ ... \], $, $$, \text{...}, \mathrm{...}
         * @param {string} text
         * @returns {string}
         */
        stripLatexWrappers(text) {
            if (typeof text !== 'string') return String(text ?? '').trim();
            let s = text.trim();
            if (!s) return '';

            // Strip \( ... \)
            if (s.startsWith('\\(') && s.endsWith('\\)')) {
                s = s.slice(2, -2).trim();
            } else if (s.startsWith('\\[') && s.endsWith('\\]')) {
                s = s.slice(2, -2).trim();
            } else if (s.startsWith('$$') && s.endsWith('$$') && s.length >= 4) {
                s = s.slice(2, -2).trim();
            } else if (s.startsWith('$') && s.endsWith('$') && s.length >= 2) {
                s = s.slice(1, -1).trim();
            }

            // Remove \displaystyle
            s = s.replace(/\\displaystyle\s*/g, '');

            // Unwrap \text{...}, \mathrm{...}, \mathbf{...}
            s = s.replace(/\\(?:text|mathrm|mathbf)\{([^{}]*)\}/g, '$1');

            return s.trim();
        },

        /**
         * Normalizes Vietnamese decimal numbers: e.g. '3,14' -> '3.14', '-0,75' -> '-0.75'
         * Preserves commas in coordinate tuples (1, 2) or sets {1, 2}.
         * @param {string} text
         * @returns {string}
         */
        normalizeVietnameseNumber(text) {
            if (typeof text !== 'string') return String(text ?? '').trim();
            let s = text.trim();
            if (!s) return '';

            // Entire string is a single decimal number with comma: e.g. 3,14 or -0,5
            if (/^[-+]?\d+,\d+$/.test(s)) {
                return s.replace(',', '.');
            }

            // If string is not a set or interval
            if (!s.startsWith('{') && !s.startsWith('\\{') && !s.startsWith('(') && !s.startsWith('[')) {
                const commas = (s.match(/,/g) || []).length;
                if (commas === 1) {
                    s = s.replace(/(\d+),(\d+)/g, '$1.$2');
                }
            }

            return s;
        },

        /**
         * Strips variable prefixes like 'x = 5' -> { varName: 'x', rhs: '5' }
         * @param {string} text
         * @returns {{ varName: string|null, rhs: string }}
         */
        stripVariablePrefix(text) {
            if (typeof text !== 'string') return { varName: null, rhs: String(text ?? '').trim() };
            const s = text.trim();
            const match = s.match(/^([a-zA-Z][a-zA-Z0-9_]*)\s*=\s*(.+)$/);
            if (match) {
                return { varName: match[1].trim(), rhs: match[2].trim() };
            }
            return { varName: null, rhs: s };
        },

        /**
         * Strips trailing measurement units and degree symbols
         * @param {string} text
         * @returns {string}
         */
        stripUnits(text) {
            if (typeof text !== 'string') return String(text ?? '').trim();
            let s = text.trim();
            if (!s) return '';

            // Degree notations
            s = s.replace(/(\d+)\s*(?:°|\^\\circ|\^\{\\circ\}|\\text\{°\}|\\text\{\s*độ\}|\s*độ)/g, '$1');

            // Do not strip single variable parameters like 'm'
            if (['m', 'h', 's', 'g', 'l'].includes(s)) {
                return s;
            }

            // Trailing units
            s = s.replace(/(?<=\d|\))\s*(?:cm|mm|km|dm|m|rad|radian|đvdt|đvtt|đvđd|kg|g|s|giây|phút|giờ|h)\b/gi, '');
            return s.trim();
        },

        /**
         * Comprehensive mathematical normalization pipeline
         * @param {string} text
         * @returns {string}
         */
        normalizeMathString(text) {
            if (typeof text !== 'string') return String(text ?? '').trim();
            let s = text.trim();
            if (!s) return '';

            // 1. Strip LaTeX wrappers
            s = this.stripLatexWrappers(s);

            // 2. Strip units
            s = this.stripUnits(s);

            // 3. Normalize Vietnamese decimal
            s = this.normalizeVietnameseNumber(s);

            // 4. Strip variable assignment prefix (e.g. 'x = 5' -> '5')
            const prefixRes = this.stripVariablePrefix(s);
            s = prefixRes.rhs;

            // 5. Standardize whitespace & common mathematical operators
            s = s.replace(/\\cdot/g, '*').replace(/\\times/g, '*');
            s = s.replace(/\s+/g, ' ').trim();

            return s;
        },

        /**
         * Parses a numeric fraction or decimal string to a JavaScript number
         * @param {string} text
         * @returns {number} NaN if not a valid number/fraction
         */
        parseFractionOrDecimal(text) {
            const s = this.normalizeMathString(text).replace(/\s+/g, '');
            if (!s) return NaN;

            if (s.includes('/')) {
                const parts = s.split('/');
                if (parts.length === 2) {
                    const num = parseFloat(parts[0]);
                    const den = parseFloat(parts[1]);
                    if (!isNaN(num) && !isNaN(den) && den !== 0) {
                        return num / den;
                    }
                }
            }

            return parseFloat(s);
        },

        /**
         * Parses interval tokens like '(1; 2)' or '[0, 5)'
         * @param {string} text
         * @returns {{ leftOpen: boolean, rightOpen: boolean, leftVal: string, rightVal: string }|null}
         */
        parseInterval(text) {
            const s = this.stripLatexWrappers(text).trim();
            const match = s.match(/^([(\[])\s*([^;,]+)\s*[;,]\s*([^;)\]]+)\s*([)\]])$/);
            if (!match) return null;

            return {
                leftOpen: match[1] === '(',
                rightOpen: match[4] === ')',
                leftVal: this.normalizeMathString(match[2]),
                rightVal: this.normalizeMathString(match[3])
            };
        },

        /**
         * Parses set elements: e.g. '{1, 2, 3}' or '{2; 1}'
         * @param {string} text
         * @returns {Array<string>|null}
         */
        parseSet(text) {
            let s = this.stripLatexWrappers(text).trim();
            if ((s.startsWith('{') && s.endsWith('}')) || (s.startsWith('\\{') && s.endsWith('\\}'))) {
                s = s.replace(/^\\?\{/, '').replace(/\\?\}$/, '').trim();
                if (!s) return [];
                const parts = s.split(/[;,]/).map(p => this.normalizeMathString(p)).filter(Boolean);
                // Deduplicate and sort
                return Array.from(new Set(parts)).sort();
            }
            return null;
        },

        /**
         * Extracts the canonical answer object/string from a question record
         * @param {Object} q
         * @returns {any}
         */
        extractCanonicalAnswer(q) {
            if (!q) return '';
            if (q.type === 'single_choice' || q.type === 'multiple_choice') {
                return q.correct_answer;
            }
            if (q.type === 'true_false_group') {
                if (q.correct_answer && typeof q.correct_answer === 'object') {
                    return q.correct_answer;
                }
                if (Array.isArray(q.items)) {
                    const res = {};
                    q.items.forEach(it => {
                        res[it.label] = it.correct;
                    });
                    return res;
                }
            }
            if (q.type === 'drag_drop') {
                if (q.correct_answer && typeof q.correct_answer === 'object') {
                    return q.correct_answer;
                }
                if (Array.isArray(q.blanks)) {
                    const res = {};
                    q.blanks.forEach(b => {
                        res[b.id] = b.correct;
                    });
                    return res;
                }
            }
            return q.correct_value ?? q.correct_answer ?? '';
        },

        // ---------------------------------------------------------------------
        // 2. DETERMINISTIC LOCAL EQUIVALENCE CHECK (OFFLINE / 0MS)
        // ---------------------------------------------------------------------

        /**
         * Checks equivalence between student answer and canonical answer locally
         * @param {string} studentAns
         * @param {string} canonicalAns
         * @param {Array<string>} [acceptedAnswers]
         * @returns {{ isMatch: boolean, isDifferentForm: boolean, canonical: string }}
         */
        isEquivalentLocal(studentAns, canonicalAns, acceptedAnswers = []) {
            if (studentAns === null || studentAns === undefined) {
                return { isMatch: false, isDifferentForm: false, canonical: String(canonicalAns ?? '') };
            }

            const rawStudent = String(studentAns).trim();
            const rawCanonical = String(canonicalAns ?? '').trim();
            if (!rawStudent && !rawCanonical) {
                return { isMatch: true, isDifferentForm: false, canonical: rawCanonical };
            }
            if (!rawStudent) {
                return { isMatch: false, isDifferentForm: false, canonical: rawCanonical };
            }

            // 1. Raw exact match
            if (rawStudent === rawCanonical) {
                return { isMatch: true, isDifferentForm: false, canonical: rawCanonical };
            }

            // 2. Check accepted answers list directly
            if (Array.isArray(acceptedAnswers)) {
                for (const acc of acceptedAnswers) {
                    if (String(acc).trim() === rawStudent) {
                        return { isMatch: true, isDifferentForm: true, canonical: rawCanonical };
                    }
                }
            }

            // 3. Normalized string match
            const normStudent = this.normalizeMathString(rawStudent);
            const normCanonical = this.normalizeMathString(rawCanonical);

            if (normStudent === normCanonical) {
                const isDifferentForm = (rawStudent !== rawCanonical);
                return { isMatch: true, isDifferentForm, canonical: rawCanonical };
            }

            // Check normalized against accepted answers
            if (Array.isArray(acceptedAnswers)) {
                for (const acc of acceptedAnswers) {
                    if (this.normalizeMathString(acc) === normStudent) {
                        return { isMatch: true, isDifferentForm: true, canonical: rawCanonical };
                    }
                }
            }

            // 4. Numeric float equivalence (fractions vs decimals vs scientific notation)
            const numStudent = this.parseFractionOrDecimal(rawStudent);
            const numCanonical = this.parseFractionOrDecimal(rawCanonical);

            if (!isNaN(numStudent) && !isNaN(numCanonical)) {
                if (Math.abs(numStudent - numCanonical) < 1e-4) {
                    const isDiff = (rawStudent.replace(/\s+/g, '') !== rawCanonical.replace(/\s+/g, ''));
                    return { isMatch: true, isDifferentForm: isDiff, canonical: rawCanonical };
                }
            }

            // Check numeric against accepted answers
            if (!isNaN(numStudent) && Array.isArray(acceptedAnswers)) {
                for (const acc of acceptedAnswers) {
                    const numAcc = this.parseFractionOrDecimal(acc);
                    if (!isNaN(numAcc) && Math.abs(numStudent - numAcc) < 1e-4) {
                        return { isMatch: true, isDifferentForm: true, canonical: rawCanonical };
                    }
                }
            }

            // 5. Interval Equivalence: e.g. '(1; 2)' vs '(1, 2)'
            const intStudent = this.parseInterval(rawStudent);
            const intCanonical = this.parseInterval(rawCanonical);
            if (intStudent && intCanonical) {
                if (intStudent.leftOpen === intCanonical.leftOpen &&
                    intStudent.rightOpen === intCanonical.rightOpen &&
                    intStudent.leftVal === intCanonical.leftVal &&
                    intStudent.rightVal === intCanonical.rightVal) {
                    return { isMatch: true, isDifferentForm: true, canonical: rawCanonical };
                }
            }

            // 6. Set Equivalence (order-invariant): e.g. '{1, 2}' vs '{2, 1}'
            const setStudent = this.parseSet(rawStudent);
            const setCanonical = this.parseSet(rawCanonical);
            if (setStudent && setCanonical && setStudent.length === setCanonical.length) {
                const allElementsMatch = setStudent.every((elem, idx) => elem === setCanonical[idx]);
                if (allElementsMatch) {
                    return { isMatch: true, isDifferentForm: true, canonical: rawCanonical };
                }
            }

            // 7. Variable prefix equivalence: 'x = 5' vs '5'
            const varStudent = this.stripVariablePrefix(normStudent).rhs;
            const varCanonical = this.stripVariablePrefix(normCanonical).rhs;
            if (varStudent && varCanonical && varStudent === varCanonical) {
                return { isMatch: true, isDifferentForm: true, canonical: rawCanonical };
            }

            return { isMatch: false, isDifferentForm: false, canonical: rawCanonical };
        },

        // ---------------------------------------------------------------------
        // 3. ANTI-ABUSE & RATE LIMITING
        // ---------------------------------------------------------------------

        /**
         * Checks if a question submission exceeds the rate limit
         * @param {string} questionId
         * @returns {boolean} true if submission is allowed; false if rate-limited
         */
        checkRateLimit(questionId) {
            const qid = questionId || 'generic_submission';
            const now = Date.now();
            let timestamps = _submissionHistory.get(qid) || [];

            // Remove timestamps older than window
            timestamps = timestamps.filter(ts => (now - ts) < SUBMISSION_WINDOW_MS);
            if (timestamps.length >= MAX_SUBMISSIONS_PER_MINUTE) {
                return false; // Rate limit exceeded
            }

            timestamps.push(now);
            _submissionHistory.set(qid, timestamps);
            return true;
        },

        /**
         * Clears rate limit history (useful for testing)
         */
        resetRateLimits() {
            _submissionHistory.clear();
        },

        // ---------------------------------------------------------------------
        // 4. CORE SUBMISSION CHECKER & DISPATCHER
        // ---------------------------------------------------------------------

        /**
         * Dispatches and evaluates a question submission following the 3 strict invariants.
         *
         * @param {Object} params
         * @param {Object} params.question - Question bank record
         * @param {string|number|Object} params.studentAnswer - Answer submitted by student
         * @param {Object} [params.options] - Optional flags & overrides
         * @returns {Promise<Object>} Standardized grading result envelope
         */
        async checkSubmission(params) {
            const { question, studentAnswer, options = {} } = params;
            if (!question) {
                return {
                    verdict: 'cannot_determine',
                    is_correct: null,
                    earnedScore: null,
                    feedback: 'Dữ liệu câu hỏi không tồn tại.',
                    badge: { text: 'Không xác định', className: 'badge-warning' }
                };
            }

            const qType = question.type || 'single_choice';
            const canonical = this.extractCanonicalAnswer(question);
            const accepted = question.accepted_answers || [];

            // =================================================================
            // INVARIANT 1: Multiple Choice / True-False Label Selection
            // STRICTLY LOCAL INSTANTANEOUS COMPARISON - NO API CALLS!
            // =================================================================
            if (qType === 'single_choice' || qType === 'multiple_choice') {
                const letters = ['A', 'B', 'C', 'D', 'E'];
                let userLetter = '';
                if (typeof studentAnswer === 'number') {
                    userLetter = letters[studentAnswer] || '';
                } else if (typeof studentAnswer === 'string') {
                    const clean = studentAnswer.trim().toUpperCase();
                    if (letters.includes(clean)) {
                        userLetter = clean;
                    } else if (/^[0-9]+$/.test(clean)) {
                        userLetter = letters[parseInt(clean, 10)] || '';
                    } else if (Array.isArray(question.options)) {
                        // Check if student typed the literal option text
                        const idx = question.options.findIndex(opt =>
                            this.normalizeMathString(opt) === this.normalizeMathString(studentAnswer)
                        );
                        if (idx !== -1) userLetter = letters[idx] || '';
                    }
                }

                let targetLetter = '';
                if (typeof canonical === 'number') {
                    targetLetter = letters[canonical] || '';
                } else if (typeof canonical === 'string') {
                    targetLetter = canonical.trim().toUpperCase();
                }

                const isCorrect = (userLetter !== '' && targetLetter !== '' && userLetter === targetLetter);

                if (isCorrect) {
                    const isDifferentForm = (studentAnswer !== targetLetter && typeof studentAnswer === 'string' && !letters.includes(studentAnswer.trim().toUpperCase()));
                    return {
                        verdict: isDifferentForm ? 'correct_different_form' : 'correct',
                        is_correct: true,
                        earnedScore: 1.0,
                        feedback: isDifferentForm
                            ? `Đáp án của bạn tương đương, phương án đúng là: ${targetLetter}`
                            : 'Chính xác! Lựa chọn của bạn hoàn toàn đúng.',
                        canonical: targetLetter,
                        badge: { text: 'Đúng', className: 'badge-verified' }
                    };
                } else {
                    // Classify misconception locally via PumkinErrorClassifier
                    let classification = null;
                    if (typeof window !== 'undefined' && window.PumkinErrorClassifier && typeof window.PumkinErrorClassifier.classify === 'function') {
                        classification = window.PumkinErrorClassifier.classify(question, userLetter || studentAnswer);
                    }

                    return {
                        verdict: 'incorrect',
                        is_correct: false,
                        earnedScore: 0.0,
                        feedback: 'Phương án bạn chọn chưa chính xác.',
                        canonical: targetLetter,
                        classification: classification,
                        badge: { text: 'Chưa đúng', className: 'badge-needs-review' }
                    };
                }
            }

            if (qType === 'true_false_group') {
                // Group boolean comparison locally
                const targetObj = (typeof canonical === 'object' && canonical !== null) ? canonical : {};
                const userObj = (typeof studentAnswer === 'object' && studentAnswer !== null) ? studentAnswer : {};

                const keys = Object.keys(targetObj);
                let correctCount = 0;
                keys.forEach(k => {
                    if (userObj[k] === targetObj[k]) correctCount++;
                });

                const isAllCorrect = (keys.length > 0 && correctCount === keys.length);
                return {
                    verdict: isAllCorrect ? 'correct' : 'incorrect',
                    is_correct: isAllCorrect,
                    earnedScore: keys.length > 0 ? Number((correctCount / keys.length).toFixed(2)) : 0,
                    feedback: isAllCorrect ? 'Chính xác toàn bộ ý đúng/sai!' : `Bạn đã trả lời đúng ${correctCount}/${keys.length} ý.`,
                    canonical: targetObj,
                    badge: { text: isAllCorrect ? 'Đúng' : 'Chưa đúng', className: isAllCorrect ? 'badge-verified' : 'badge-needs-review' }
                };
            }

            if (qType === 'drag_drop') {
                const targetObj = (typeof canonical === 'object' && canonical !== null) ? canonical : {};
                const userObj = (typeof studentAnswer === 'object' && studentAnswer !== null) ? studentAnswer : {};

                const keys = Object.keys(targetObj);
                let correctCount = 0;
                keys.forEach(k => {
                    const expectedVal = targetObj[k];
                    const userVal = userObj[k];
                    if (userVal === expectedVal) {
                        correctCount++;
                    } else if (this.isEquivalentLocal(userVal, expectedVal).isMatch) {
                        correctCount++;
                    }
                });

                const isAllCorrect = (keys.length > 0 && correctCount === keys.length);
                return {
                    verdict: isAllCorrect ? 'correct' : 'incorrect',
                    is_correct: isAllCorrect,
                    earnedScore: keys.length > 0 ? Number((correctCount / keys.length).toFixed(2)) : 0,
                    feedback: isAllCorrect ? 'Kéo thả chính xác toàn bộ ô trống!' : `Bạn đã điền đúng ${correctCount}/${keys.length} ô.`,
                    canonical: targetObj,
                    badge: { text: isAllCorrect ? 'Đúng' : 'Chưa đúng', className: isAllCorrect ? 'badge-verified' : 'badge-needs-review' }
                };
            }

            // =================================================================
            // INVARIANT 2: Hand-typed Math Input (short_answer, step_solution)
            // Dispatches to /v1/check via Pumkin.MathAPIClient if flag is ENABLED;
            // Otherwise evaluates locally via isEquivalentLocal.
            // =================================================================
            const isFlagEnabled = this.isMathCheckEnabled();

            // Local fallback / default evaluation function
            const runLocalCheck = (isDowntimeFallback = false) => {
                const evalRes = this.isEquivalentLocal(studentAnswer, canonical, accepted);
                if (evalRes.isMatch) {
                    const verdict = evalRes.isDifferentForm ? 'correct_different_form' : 'correct';
                    const feedback = evalRes.isDifferentForm
                        ? `Đáp án của bạn tương đương, dạng chuẩn là: ${canonical}`
                        : 'Đáp số hoàn toàn chính xác!';
                    return {
                        verdict: verdict,
                        is_correct: true,
                        earnedScore: 1.0,
                        feedback: feedback,
                        canonical: canonical,
                        is_different_form: evalRes.isDifferentForm,
                        is_temporary_fallback: isDowntimeFallback,
                        badge: {
                            text: isDowntimeFallback ? 'Đúng (Chấm tạm)' : 'Đúng',
                            className: isDowntimeFallback ? 'badge-fallback' : 'badge-verified'
                        }
                    };
                } else {
                    return {
                        verdict: 'incorrect',
                        is_correct: false,
                        earnedScore: 0.0,
                        feedback: 'Đáp số chưa chính xác.',
                        canonical: canonical,
                        is_temporary_fallback: isDowntimeFallback,
                        badge: {
                            text: isDowntimeFallback ? 'Chưa đúng (Chấm tạm)' : 'Chưa đúng',
                            className: isDowntimeFallback ? 'badge-fallback' : 'badge-needs-review'
                        }
                    };
                }
            };

            // If feature flag is OFF, evaluate deterministically locally
            if (!isFlagEnabled && !options.forceApi) {
                return runLocalCheck(false);
            }

            // Anti-abuse: Check rate limit
            if (!this.checkRateLimit(question.id)) {
                return {
                    verdict: 'cannot_determine',
                    is_correct: null,
                    earnedScore: null,
                    feedback: 'Bạn đang gửi câu trả lời quá nhanh. Vui lòng đợi một lát trước khi thử lại.',
                    is_rate_limited: true,
                    badge: { text: 'Tạm ngưng', className: 'badge-warning' }
                };
            }

            // Call API /v1/check
            const apiClient = (typeof window !== 'undefined' && window.Pumkin && window.Pumkin.MathAPIClient)
                ? window.Pumkin.MathAPIClient
                : (typeof window !== 'undefined' && window.PumkinMathAPIClient ? window.PumkinMathAPIClient : null);

            if (!apiClient || typeof apiClient.check !== 'function') {
                // Graceful fallback to local normalized comparison
                return runLocalCheck(true);
            }

            try {
                const payload = {
                    question_id: question.id,
                    question_text: question.question || question.question_text || '',
                    student_answer: String(studentAnswer).trim(),
                    canonical_answer: String(canonical).trim(),
                    answer_type: qType === 'step_solution' ? 'step_solution' : 'number'
                };

                const res = await apiClient.check(payload, { timeoutMs: 15000 });

                if (!res || !res.success) {
                    // API downtime or network error -> Graceful degradation
                    return runLocalCheck(true);
                }

                const data = res.data || {};
                const result = data.result || {};
                const apiVerdict = result.verdict || (result.is_correct ? 'correct' : 'incorrect');

                // =============================================================
                // INVARIANT 3: cannot_determine IS NEVER MARKED INCORRECT
                // =============================================================
                if (apiVerdict === 'cannot_determine' || data.status === 'cannot_determine') {
                    return {
                        verdict: 'cannot_determine',
                        is_correct: null,
                        earnedScore: null, // Zero deduction
                        is_streak_preserved: true, // Streak is NOT broken
                        skip_profile_error: true, // NOT recorded into error profile
                        feedback: 'Mình chưa chấm chắc được, bạn thử viết lại dạng khác hoặc xem đáp án.',
                        canonical: canonical,
                        badge: { text: 'Chưa chấm chắc được', className: 'badge-unsupported' }
                    };
                }

                if (apiVerdict === 'correct_different_form') {
                    return {
                        verdict: 'correct_different_form',
                        is_correct: true,
                        earnedScore: 1.0,
                        feedback: `Đáp án của bạn tương đương, dạng chuẩn là: ${canonical}`,
                        canonical: canonical,
                        is_different_form: true,
                        badge: { text: 'Đúng (Khác dạng)', className: 'badge-verified' }
                    };
                }

                if (apiVerdict === 'correct' || result.is_correct === true) {
                    return {
                        verdict: 'correct',
                        is_correct: true,
                        earnedScore: 1.0,
                        feedback: result.feedback_vi || 'Đáp số hoàn toàn chính xác!',
                        canonical: canonical,
                        badge: { text: 'Đúng', className: 'badge-verified' }
                    };
                }

                // Incorrect verdict
                const detectedTrap = result.detected_misconception_id || null;
                return {
                    verdict: 'incorrect',
                    is_correct: false,
                    earnedScore: 0.0,
                    feedback: result.feedback_vi || 'Đáp số chưa chính xác.',
                    canonical: canonical,
                    detected_misconception_id: detectedTrap,
                    badge: { text: 'Chưa đúng', className: 'badge-needs-review' }
                };

            } catch (networkErr) {
                // Graceful fallback during server outage / network failure
                return runLocalCheck(true);
            }
        },

        /**
         * Checks an algebraic step transformation (Chấm theo bước)
         * Detects step traps like squaring both sides (extraneous roots) or variable division (root loss)
         *
         * @param {Object} params
         * @param {string} params.studentStep
         * @param {string} params.canonicalStep
         * @param {number} [params.stepIndex]
         * @returns {Promise<Object>}
         */
        async checkStep(params) {
            const { studentStep, canonicalStep, stepIndex = 1 } = params;
            const apiClient = (typeof window !== 'undefined' && window.Pumkin && window.Pumkin.MathAPIClient)
                ? window.Pumkin.MathAPIClient
                : (typeof window !== 'undefined' && window.PumkinMathAPIClient ? window.PumkinMathAPIClient : null);

            if (!apiClient || !this.isMathCheckEnabled()) {
                // Local heuristic step check
                const isEq = this.isEquivalentLocal(studentStep, canonicalStep);
                return {
                    verdict: isEq.isMatch ? 'correct' : 'incorrect',
                    is_correct: isEq.isMatch,
                    feedback: isEq.isMatch ? `Bước ${stepIndex}: Biến đổi hợp lệ.` : `Bước ${stepIndex}: Biến đổi chưa chính xác.`,
                    note: 'Chấm theo bước cơ bản (chế độ cục bộ).'
                };
            }

            try {
                const payload = {
                    student_answer: String(studentStep).trim(),
                    canonical_answer: String(canonicalStep).trim(),
                    answer_type: 'step_solution',
                    step_index: stepIndex
                };
                const res = await apiClient.check(payload, { timeoutMs: 15000 });
                if (!res.success) {
                    return {
                        verdict: 'cannot_determine',
                        is_correct: null,
                        feedback: 'Chưa thể kiểm định bước này do mất kết nối máy chủ.'
                    };
                }

                const result = (res.data && res.data.result) || {};
                return {
                    verdict: result.verdict || (result.is_correct ? 'correct' : 'incorrect'),
                    is_correct: result.is_correct,
                    feedback: result.feedback_vi || `Bước ${stepIndex}: Hoàn thành.`,
                    detected_misconception_id: result.detected_misconception_id || null
                };
            } catch (err) {
                return {
                    verdict: 'cannot_determine',
                    is_correct: null,
                    feedback: 'Không thể kiểm tra bước do lỗi mạng.'
                };
            }
        },

        // ---------------------------------------------------------------------
        // 5. FEATURE FLAG & ENVIRONMENT DETECTION
        // ---------------------------------------------------------------------

        /**
         * Checks if math.check feature flag is enabled
         * Governance: DEFAULT IS FALSE (TẮT)
         * @returns {boolean}
         */
        isMathCheckEnabled() {
            try {
                // 1. MathAPI SDK feature flags
                if (typeof window !== 'undefined' && window.Pumkin && window.Pumkin.MathAPI && typeof window.Pumkin.MathAPI.getFeatureFlags === 'function') {
                    const flags = window.Pumkin.MathAPI.getFeatureFlags();
                    if (flags['math.check'] === true) return true;
                }

                // 2. Client wrapper
                if (typeof window !== 'undefined' && window.Pumkin && window.Pumkin.MathAPIClient && typeof window.Pumkin.MathAPIClient.isFeatureEnabled === 'function') {
                    if (window.Pumkin.MathAPIClient.isFeatureEnabled('math.check')) return true;
                }

                // 3. URL query parameter
                if (typeof window !== 'undefined' && window.location) {
                    const params = new URLSearchParams(window.location.search);
                    if (params.get('math_check') === '1') return true;
                    if (params.get('math_check') === '0') return false;
                }

                // 4. localStorage override
                if (typeof localStorage !== 'undefined') {
                    const stored = localStorage.getItem('PUMKIN_FEATURE_MATH_CHECK');
                    if (stored === 'true' || stored === '1') return true;
                    if (stored === 'false' || stored === '0') return false;
                }

                // 5. Global config
                if (typeof window !== 'undefined' && window.PUMKIN_CONFIG && window.PUMKIN_CONFIG.FEATURE_MATH_CHECK === true) {
                    return true;
                }

                return false;
            } catch (e) {
                return false;
            }
        },

        /**
         * Sets math.check feature flag
         * @param {boolean} enabled
         */
        setMathCheckEnabled(enabled) {
            try {
                if (typeof window !== 'undefined' && window.Pumkin && window.Pumkin.MathAPI && typeof window.Pumkin.MathAPI.setFeatureFlags === 'function') {
                    window.Pumkin.MathAPI.setFeatureFlags({ 'math.check': Boolean(enabled) });
                }
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('PUMKIN_FEATURE_MATH_CHECK', enabled ? 'true' : 'false');
                }
            } catch (e) {}
        },

        // ---------------------------------------------------------------------
        // 6. LIVE KATEX PREVIEW RENDERER
        // ---------------------------------------------------------------------

        /**
         * Renders KaTeX preview safely into a container element
         * @param {string} rawInput
         * @param {HTMLElement} previewContainer
         */
        renderPreview(rawInput, previewContainer) {
            if (!previewContainer) return;
            const text = (rawInput ?? '').trim();
            if (!text) {
                previewContainer.innerHTML = '';
                previewContainer.style.display = 'none';
                return;
            }

            previewContainer.style.display = 'block';

            // Normalize Vietnamese decimal commas for live math typesetting
            let formatted = this.normalizeVietnameseNumber(text);
            formatted = this.stripUnits(formatted);

            // Format fractions into \frac{a}{b} for preview if simple
            if (/^[-+]?\d+\/\d+$/.test(formatted)) {
                const parts = formatted.split('/');
                formatted = `\\frac{${parts[0]}}{${parts[1]}}`;
            }

            const mathHtml = (typeof window !== 'undefined' && window.Pumkin && window.Pumkin.Math && typeof window.Pumkin.Math.renderToString === 'function')
                ? window.Pumkin.Math.renderToString(formatted, { displayMode: false })
                : ((typeof katex !== 'undefined' && typeof katex.renderToString === 'function')
                    ? katex.renderToString(formatted, { throwOnError: false, displayMode: false, trust: false })
                    : `<code>${this.escapeHtml(formatted)}</code>`);

            previewContainer.innerHTML = `
                <div class="math-preview-bubble" style="display: flex; align-items: center; gap: 8px; font-size: 14.5px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 6px 12px; margin-top: 6px;">
                    <span style="font-size: 12px; font-weight: 700; color: #15803d; text-transform: uppercase; letter-spacing: 0.5px;">Xem trước:</span>
                    <span class="math-preview-render" style="color: #166534; font-size: 15px;">${mathHtml}</span>
                </div>
            `;
        },

        escapeHtml(str) {
            if (str === null || str === undefined) return '';
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        }
    };

    // Export module
    if (typeof window !== 'undefined') {
        window.Pumkin = window.Pumkin || {};
        window.Pumkin.AnswerChecker = PumkinAnswerChecker;
        window.PumkinAnswerChecker = PumkinAnswerChecker;
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = PumkinAnswerChecker;
    }

})(typeof window !== 'undefined' ? window : this);
