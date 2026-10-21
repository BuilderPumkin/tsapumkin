/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.PrefetchQueue
 * Layer: Cognitive Progression & Adaptive Generation Service
 * Description: Background prefetch queue for isomorphic math questions,
 *              deduplication against student history, teacher review governance,
 *              and graceful fallback to verified bank questions.
 *
 * GOVERNANCE RULES (W6):
 * 1. Feature flag math.generate: Default is strictly OFF (false).
 * 2. Teacher Approval Gate: Unapproved generated questions are held in review queue;
 *    students ONLY receive questions where teacher_approved === true.
 * 3. Diagnostic Test: STRICTLY uses verified bank questions, NEVER generated questions.
 * 4. Difficulty Labeling: Strictly labeled as "Ước lượng" (estimated), NEVER called Rasch-calibrated.
 * 5. Storage Error Boundary: Bounded queue size, try/catch for localStorage, schema versioning.
 */
(function(window) {
    'use strict';

    if (typeof window !== 'undefined') {
        window.Pumkin = window.Pumkin || {};
    }

    const STORAGE_KEY = 'pumkin_generated_queue_v1';
    const SCHEMA_VERSION = '2.1.0';
    const MAX_QUEUE_ITEMS = 25; // Max 25 questions in storage (~30KB, safe under 5MB quota)

    const PumkinPrefetchQueue = {
        name: 'PumkinPrefetchQueue',
        version: '1.0.0',
        schema_version: SCHEMA_VERSION,

        // ---------------------------------------------------------------------
        // 1. STORAGE & QUEUE HYDRATION (WITH STRICT ERROR BOUNDARIES)
        // ---------------------------------------------------------------------

        /**
         * Safely reads the queue from localStorage
         * @returns {Array<Object>}
         */
        getQueue() {
            try {
                if (typeof localStorage === 'undefined') return [];
                const raw = localStorage.getItem(STORAGE_KEY);
                if (!raw) return [];
                const parsed = JSON.parse(raw);
                if (!parsed || parsed.schema_version !== SCHEMA_VERSION || !Array.isArray(parsed.items)) {
                    return [];
                }
                return parsed.items;
            } catch (e) {
                console.warn('[PumkinPrefetchQueue] Failed to read queue:', e);
                return [];
            }
        },

        /**
         * Safely saves the queue to localStorage
         * @param {Array<Object>} items
         */
        saveQueue(items) {
            try {
                if (typeof localStorage === 'undefined') return;
                // Bound size to MAX_QUEUE_ITEMS
                const bounded = Array.isArray(items) ? items.slice(-MAX_QUEUE_ITEMS) : [];
                const payload = {
                    schema_version: SCHEMA_VERSION,
                    updated_at: new Date().toISOString(),
                    items: bounded
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
            } catch (e) {
                console.warn('[PumkinPrefetchQueue] Storage quota exceeded or disabled:', e);
            }
        },

        /**
         * Clears all items in queue
         */
        clearQueue() {
            try {
                if (typeof localStorage !== 'undefined') {
                    localStorage.removeItem(STORAGE_KEY);
                }
            } catch (e) {}
        },

        // ---------------------------------------------------------------------
        // 2. FEATURE FLAG GOVERNANCE
        // ---------------------------------------------------------------------

        /**
         * Checks if math.generate is enabled
         * GOVERNANCE: DEFAULT IS FALSE (TẮT)
         * @returns {boolean}
         */
        isGenerateEnabled() {
            try {
                // 1. Check window.Pumkin.MathAPI feature flags
                if (typeof window !== 'undefined' && window.Pumkin && window.Pumkin.MathAPI && typeof window.Pumkin.MathAPI.getFeatureFlags === 'function') {
                    const flags = window.Pumkin.MathAPI.getFeatureFlags();
                    if (flags['math.generate'] === true) return true;
                }

                // 2. Check URL query params
                if (typeof window !== 'undefined' && window.location) {
                    const params = new URLSearchParams(window.location.search);
                    if (params.get('math_generate') === '1' || params.get('generate') === '1') return true;
                    if (params.get('math_generate') === '0' || params.get('generate') === '0') return false;
                }

                // 3. Check localStorage override
                if (typeof localStorage !== 'undefined') {
                    const stored = localStorage.getItem('PUMKIN_FEATURE_MATH_GENERATE');
                    if (stored === 'true' || stored === '1') return true;
                    if (stored === 'false' || stored === '0') return false;
                }

                // 4. Global config
                if (typeof window !== 'undefined' && window.PUMKIN_CONFIG && window.PUMKIN_CONFIG.FEATURE_MATH_GENERATE === true) {
                    return true;
                }

                return false;
            } catch (e) {
                return false;
            }
        },

        /**
         * Toggles math.generate feature flag
         * @param {boolean} enabled
         */
        setGenerateEnabled(enabled) {
            try {
                if (typeof window !== 'undefined' && window.Pumkin && window.Pumkin.MathAPI && typeof window.Pumkin.MathAPI.setFeatureFlags === 'function') {
                    window.Pumkin.MathAPI.setFeatureFlags({ 'math.generate': Boolean(enabled) });
                }
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('PUMKIN_FEATURE_MATH_GENERATE', enabled ? 'true' : 'false');
                }
            } catch (e) {}
        },

        // ---------------------------------------------------------------------
        // 3. DEDUPLICATION AGAINST RECENT ATTEMPTS
        // ---------------------------------------------------------------------

        /**
         * Collects set of recently answered question IDs and question hashes
         * @returns {Set<string>}
         */
        getSolvedSignatures() {
            const signatures = new Set();
            try {
                // 1. Check Learning Trace
                if (typeof window !== 'undefined' && window.PumkinLearningTrace && typeof window.PumkinLearningTrace.getTrace === 'function') {
                    const trace = window.PumkinLearningTrace.getTrace();
                    if (Array.isArray(trace)) {
                        trace.forEach(item => {
                            if (item.questionId) signatures.add(item.questionId);
                        });
                    }
                }
                // 2. Check localStorage history
                if (typeof localStorage !== 'undefined') {
                    const rawHist = localStorage.getItem('pumkin_history');
                    if (rawHist) {
                        const history = JSON.parse(rawHist);
                        if (Array.isArray(history)) {
                            history.forEach(attempt => {
                                if (Array.isArray(attempt.questions)) {
                                    attempt.questions.forEach(q => {
                                        if (q.id) signatures.add(q.id);
                                        if (q.hash) signatures.add(q.hash);
                                    });
                                }
                            });
                        }
                    }
                }
            } catch (e) {}
            return signatures;
        },

        // ---------------------------------------------------------------------
        // 4. TEACHER APPROVAL & REVIEW MANAGEMENT
        // ---------------------------------------------------------------------

        /**
         * Retrieves questions awaiting teacher review
         * @returns {Array<Object>}
         */
        getPendingReviewQuestions() {
            const queue = this.getQueue();
            return queue.filter(q => q.teacher_approved !== true);
        },

        /**
         * Teacher approves a generated question
         * @param {string} questionId
         * @param {string} [teacherId='teacher_admin']
         * @returns {boolean}
         */
        approveQuestion(questionId, teacherId = 'teacher_admin') {
            const queue = this.getQueue();
            const target = queue.find(q => q.id === questionId);
            if (!target) return false;

            target.teacher_approved = true;
            target.needs_teacher_review = false;
            target.approved_by = teacherId;
            target.approved_at = new Date().toISOString();
            target.badge_label = 'Đề tự sinh (Đã duyệt)';

            this.saveQueue(queue);
            return true;
        },

        /**
         * Seeds a batch of pre-approved sample generated questions
         * (Used to provide high-quality teacher-reviewed items on initial deploy)
         * @param {Array<Object>} sampleQuestions
         */
        seedApprovedSamples(sampleQuestions) {
            if (!Array.isArray(sampleQuestions) || sampleQuestions.length === 0) return;
            const currentQueue = this.getQueue();
            const existingIds = new Set(currentQueue.map(q => q.id));

            sampleQuestions.forEach(q => {
                if (!existingIds.has(q.id)) {
                    currentQueue.push({
                        ...q,
                        teacher_approved: true,
                        needs_teacher_review: false,
                        approved_by: 'pedagogical_board',
                        approved_at: new Date().toISOString(),
                        badge_label: 'Đề tự sinh (Đã duyệt)',
                        difficulty_label: 'Ước lượng',
                        difficulty_mode: 'estimated',
                        schema_version: SCHEMA_VERSION
                    });
                }
            });

            this.saveQueue(currentQueue);
        },

        // ---------------------------------------------------------------------
        // 5. DAILY FOCUS QUESTION RETRIEVAL (STUDENT-FACING)
        // ---------------------------------------------------------------------

        /**
         * Retrieves approved isomorphic questions for Daily Focus matching student needs.
         * GOVERNANCE: If no teacher-approved questions are available, flags fallback_needed = true!
         *
         * @param {Object} params
         * @param {string} [params.skillId] - Target skill (e.g. 'skill_calculation')
         * @param {string} [params.misconceptionId] - Recurring misconception (e.g. 'MIS_SIGN_FLIP_EQUATION')
         * @param {string} [params.topic] - Mathematical topic
         * @param {number} [params.count=6] - Number of questions required (5 to 8)
         * @returns {{ success: boolean, questions: Array<Object>, source: string, fallback_needed: boolean, reason?: string }}
         */
        getDailyFocusPack(params = {}) {
            const { skillId, misconceptionId, topic, count = 6 } = params;
            const isEnabled = this.isGenerateEnabled();

            // If feature flag is OFF, immediately signal fallback to bank questions
            if (!isEnabled) {
                return {
                    success: false,
                    questions: [],
                    source: 'bank_fallback',
                    fallback_needed: true,
                    reason: 'Cờ math.generate đang tắt (sử dụng đề chuẩn từ ngân hàng).'
                };
            }

            const queue = this.getQueue();
            const solvedSignatures = this.getSolvedSignatures();

            // Strict Filter: ONLY teacher-approved questions, not yet solved by student
            let matched = queue.filter(q => {
                if (q.teacher_approved !== true) return false; // Mandatory approval policy
                if (solvedSignatures.has(q.id) || (q.hash && solvedSignatures.has(q.hash))) return false; // Deduplication

                // Match by misconception trap
                if (misconceptionId && Array.isArray(q.distractors)) {
                    if (q.distractors.some(d => d.misconceptionId === misconceptionId)) return true;
                }

                // Match by skill
                if (skillId && Array.isArray(q.skills) && q.skills.includes(skillId)) {
                    return true;
                }

                // Match by topic
                if (topic && q.topic && q.topic.toLowerCase().includes(topic.toLowerCase())) {
                    return true;
                }

                return false;
            });

            // If not enough targeted approved questions, check general approved questions
            if (matched.length < count) {
                const otherApproved = queue.filter(q =>
                    q.teacher_approved === true &&
                    !matched.some(m => m.id === q.id) &&
                    !solvedSignatures.has(q.id)
                );
                matched = [...matched, ...otherApproved];
            }

            if (matched.length >= count) {
                const selected = matched.slice(0, count).map(q => ({
                    ...q,
                    is_generated: true,
                    source_type: 'generated',
                    badge_label: 'Đề tự sinh (Đã duyệt mẫu)',
                    difficulty_label: 'Ước lượng',
                    difficulty_mode: 'estimated'
                }));

                return {
                    success: true,
                    questions: selected,
                    source: 'generated_approved',
                    fallback_needed: false
                };
            }

            // Not enough approved generated questions -> signal graceful fallback
            return {
                success: false,
                questions: [],
                source: 'bank_fallback',
                fallback_needed: true,
                reason: 'Chưa có đủ câu hỏi tự sinh đã qua giáo viên duyệt mẫu.'
            };
        },

        // ---------------------------------------------------------------------
        // 6. BACKGROUND PREFETCH WORKER
        // ---------------------------------------------------------------------

        /**
         * Asynchronously prefetches a new batch of questions from /v1/generate
         * when the student is idle or on app launch.
         *
         * @param {Object} params
         * @param {string} [params.category='all']
         * @param {string} [params.difficulty='M2']
         * @param {number} [params.count=6]
         * @returns {Promise<{ success: boolean, count: number, error?: string }>}
         */
        async prefetchInBackground(params = {}) {
            if (!this.isGenerateEnabled()) {
                return { success: false, count: 0, error: 'FLAG_DISABLED' };
            }

            const { category = 'all', difficulty = 'M2', count = 6 } = params;

            const apiClient = (typeof window !== 'undefined' && window.Pumkin && window.Pumkin.MathAPIClient)
                ? window.Pumkin.MathAPIClient
                : (typeof window !== 'undefined' && window.PumkinMathAPIClient ? window.PumkinMathAPIClient : null);

            if (!apiClient || typeof apiClient.generate !== 'function') {
                return { success: false, count: 0, error: 'CLIENT_UNAVAILABLE' };
            }

            try {
                const payload = {
                    category: category,
                    difficulty: difficulty,
                    count: count,
                    seed: Math.floor(Math.random() * 1000000)
                };

                const res = await apiClient.generate(payload, { timeoutMs: 15000 });
                if (!res || !res.success) {
                    return { success: false, count: 0, error: res?.error?.message || 'API_ERROR' };
                }

                const data = res.data || {};
                const generatedList = data.questions || [];

                if (!Array.isArray(generatedList) || generatedList.length === 0) {
                    return { success: false, count: 0, error: 'EMPTY_RESULT' };
                }

                const queue = this.getQueue();
                const existingIds = new Set(queue.map(q => q.id));

                let addedCount = 0;
                generatedList.forEach(q => {
                    const webQ = this.normalizeGeneratedToWebSchema(q);
                    if (!existingIds.has(webQ.id)) {
                        queue.push(webQ);
                        existingIds.add(webQ.id);
                        addedCount++;
                    }
                });

                this.saveQueue(queue);
                return { success: true, count: addedCount };

            } catch (err) {
                console.warn('[PumkinPrefetchQueue] Background prefetch failed gracefully:', err);
                return { success: false, count: 0, error: err.message };
            }
        },

        /**
         * Normalizes a generated question payload from Math API into the web schema (all.json)
         * @param {Object} q
         * @returns {Object} Web question dictionary
         */
        normalizeGeneratedToWebSchema(q) {
            const rawCognitive = q.cognitive_level || q.difficulty || 'M2';
            const cogLevel = typeof rawCognitive === 'string' ? rawCognitive : (rawCognitive.value || 'M2');

            let diffLabel = 'Trung bình';
            if (cogLevel === 'M1') diffLabel = 'Dễ';
            else if (cogLevel === 'M3' || cogLevel === 'M4') diffLabel = 'Khó';

            const diffScore = q.difficulty_score || (cogLevel === 'M1' ? 0.35 : (cogLevel === 'M2' ? 0.55 : 0.75));

            const distractors = [];
            if (Array.isArray(q.distractors)) {
                q.distractors.forEach((d, idx) => {
                    const optId = d.option_index ?? d.optionId ?? idx;
                    const mId = d.misconception_id ?? d.misconceptionId ?? 'MIS_CONCEPT_CONFUSION';
                    distractors.push({
                        optionId: optId,
                        misconceptionId: typeof mId === 'string' ? mId : (mId.value || String(mId)),
                        description_vi: d.explanation_vi || d.description_vi || 'Phương án nhiễu theo bẫy nhận thức.',
                        skillIds: q.skills || ['skill_calculation'],
                        severity: 'medium',
                        remediationHint: d.explanation_vi || d.remediationHint || 'Kiểm tra lại phép tính và công thức.',
                        needs_teacher_review: true
                    });
                });
            }

            return {
                id: q.id || `gen_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
                type: 'single_choice',
                subject: 'Mathematics',
                exam_type: 'TSA',
                grade: 'Toán 12',
                topic: q.topic || 'Giải tích',
                subtopic: q.subtopic || 'Toán học tự sinh',
                skills: q.skills || ['skill_calculation'],
                difficulty: diffLabel,
                difficulty_score: diffScore,
                difficulty_label: 'Ước lượng',
                difficulty_mode: 'estimated', // Explicitly NOT Rasch calibrated
                cognitive_level: cogLevel,
                estimated_time_seconds: (cogLevel === 'M1' || cogLevel === 'M2') ? 90 : 120,
                question: q.question_text || q.question || '',
                options: q.options || [],
                correct_answer: q.correct_index ?? q.correct_answer ?? 0,
                items: null,
                correct_value: null,
                explanation: q.explanation_vi || q.explanation || 'Lời giải chi tiết được tạo từ mô hình CAS.',
                common_traps: distractors.map(d => d.description_vi),
                prerequisites: [],
                year: 2026,
                source_type: 'generated',
                is_generated: true,
                badge_label: 'Đề tự sinh',
                teacher_approved: false, // Default is false per user policy
                needs_teacher_review: true,
                schema_version: SCHEMA_VERSION,
                socratic_hints: q.socratic_hints || [
                    'Bậc 1 (Định hướng): Quan sát kỹ các dữ kiện đề bài.',
                    'Bậc 2 (Lý thuyết): Áp dụng công thức và tính chất chuẩn.',
                    'Bậc 3 (Chia nhỏ bước): Biến đổi vế trái hoặc lập phương trình.',
                    'Bậc 4 (Nút thắt): Thử lại điều kiện xác định trước khi chọn.'
                ],
                distractors: distractors,
                hash: q.hash || null
            };
        }
    };

    // Export to global Pumkin namespace
    if (typeof window !== 'undefined') {
        window.Pumkin = window.Pumkin || {};
        window.Pumkin.PrefetchQueue = PumkinPrefetchQueue;
        window.PumkinPrefetchQueue = PumkinPrefetchQueue;
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = PumkinPrefetchQueue;
    }

})(typeof window !== 'undefined' ? window : this);
