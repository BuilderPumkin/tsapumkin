/**
 * PUMKIN DYNAMIC COGNITIVE TRACKER (Core Telemetry & Cognitive State Engine)
 * Phase 2 Production Module
 * 
 * Features:
 * - 100% Deterministic & Zero-LLM dependency
 * - Pure Cognitive Engine (zero DOM access, headless-ready)
 * - DOM Telemetry Adapter with Event Delegation & Page Visibility API
 * - Bounded Ring Buffer for O(1) event storage (zero memory leaks)
 * - Real-time Cognitive State Vector calculation: Rigor, Intuition, Flexibility,
 *   Representation Gap, and Mastery Score with explainable rationales
 * - Fail-safe design: all public APIs return structured results without throwing
 * - Cross-runtime: Node.js (CommonJS) and Browser (window.PumkinCognitiveTracker)
 * 
 * @author PUMKIN.DEV Academic AI & Learning Analytics Engineering
 * @version 1.0.0
 */

(function(global, factory) {
    'use strict';
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        const root = typeof window !== 'undefined' ? window : global;
        root.PumkinCognitiveTracker = factory();
    }
})(typeof globalThis !== 'undefined' ? globalThis : this, function() {
    'use strict';

    // =========================================================================
    // 1. DEFAULT CONFIGURATION & SCHEMAS
    // =========================================================================

    const DEFAULT_CONFIG = Object.freeze({
        version: "1.0.0",
        maxEventBuffer: 200,
        maxQuestionHistory: 50,
        minimumEvidenceQuestions: 3,

        hesitationThresholdMs: 5000,
        longHesitationThresholdMs: 12000,
        expectedTimeTolerance: 1.2,

        representationGapThreshold: 30,
        masteryThreshold: 85,

        weights: Object.freeze({
            rigor: Object.freeze({
                logicalCorrectness: 0.50,
                conditionAwareness: 0.30,
                answerStability: 0.20
            }),
            intuition: Object.freeze({
                visualContextAccuracy: 0.55,
                representationTransfer: 0.30,
                meaningfulSandboxInteraction: 0.15
            }),
            flexibility: Object.freeze({
                multiRepresentationSuccess: 0.60,
                alternateApproachSuccess: 0.40
            })
        }),

        debug: false,
        anonymousPrefix: "student_anon_",
        batchDebounceMs: 120
    });

    const RepresentationTypes = Object.freeze({
        ALGEBRAIC: 'algebraic',
        GEOMETRIC: 'geometric',
        GRAPHICAL: 'graphical',
        TABULAR: 'tabular',
        CONTEXTUAL: 'contextual'
    });

    const EventTypes = Object.freeze({
        QUESTION_OPENED: 'question_opened',
        ANSWER_SELECTED: 'answer_selected',
        ANSWER_CHANGED: 'answer_changed',
        ANSWER_SUBMITTED: 'answer_submitted',
        HINT_REQUESTED: 'hint_requested',
        SANDBOX_OPENED: 'sandbox_opened',
        SANDBOX_PARAMETER_CHANGED: 'sandbox_parameter_changed',
        QUESTION_COMPLETED: 'question_completed'
    });

    /**
     * Deep merge and validate user configuration
     */
    function mergeAndValidateConfig(userConfig = {}) {
        if (!userConfig || typeof userConfig !== 'object') {
            return Object.assign({}, DEFAULT_CONFIG);
        }

        const merged = {
            version: userConfig.version || DEFAULT_CONFIG.version,
            maxEventBuffer: Math.max(20, Math.min(2000, Number(userConfig.maxEventBuffer) || DEFAULT_CONFIG.maxEventBuffer)),
            maxQuestionHistory: Math.max(10, Math.min(500, Number(userConfig.maxQuestionHistory) || DEFAULT_CONFIG.maxQuestionHistory)),
            minimumEvidenceQuestions: Math.max(1, Math.min(20, Number(userConfig.minimumEvidenceQuestions) || DEFAULT_CONFIG.minimumEvidenceQuestions)),
            hesitationThresholdMs: Math.max(500, Number(userConfig.hesitationThresholdMs) || DEFAULT_CONFIG.hesitationThresholdMs),
            longHesitationThresholdMs: Math.max(1000, Number(userConfig.longHesitationThresholdMs) || DEFAULT_CONFIG.longHesitationThresholdMs),
            expectedTimeTolerance: Math.max(1.0, Math.min(3.0, Number(userConfig.expectedTimeTolerance) || DEFAULT_CONFIG.expectedTimeTolerance)),
            representationGapThreshold: Math.max(5, Math.min(80, Number(userConfig.representationGapThreshold) || DEFAULT_CONFIG.representationGapThreshold)),
            masteryThreshold: Math.max(50, Math.min(100, Number(userConfig.masteryThreshold) || DEFAULT_CONFIG.masteryThreshold)),
            debug: Boolean(userConfig.debug),
            anonymousPrefix: String(userConfig.anonymousPrefix || DEFAULT_CONFIG.anonymousPrefix),
            batchDebounceMs: Math.max(20, Math.min(1000, Number(userConfig.batchDebounceMs) || DEFAULT_CONFIG.batchDebounceMs)),
            weights: {
                rigor: Object.assign({}, DEFAULT_CONFIG.weights.rigor, (userConfig.weights && userConfig.weights.rigor) || {}),
                intuition: Object.assign({}, DEFAULT_CONFIG.weights.intuition, (userConfig.weights && userConfig.weights.intuition) || {}),
                flexibility: Object.assign({}, DEFAULT_CONFIG.weights.flexibility, (userConfig.weights && userConfig.weights.flexibility) || {})
            }
        };

        return merged;
    }

    // =========================================================================
    // 2. BOUNDED RING BUFFER (O(1) Memory-bounded event storage)
    // =========================================================================

    class BoundedEventBuffer {
        constructor(capacity) {
            this.capacity = capacity;
            this.buffer = new Array(capacity);
            this.head = 0;
            this.tail = 0;
            this.size = 0;
            this.totalPushed = 0;
        }

        push(item) {
            this.buffer[this.tail] = item;
            this.tail = (this.tail + 1) % this.capacity;
            if (this.size < this.capacity) {
                this.size++;
            } else {
                this.head = (this.head + 1) % this.capacity; // Evict oldest
            }
            this.totalPushed++;
        }

        toArray() {
            const result = new Array(this.size);
            for (let i = 0; i < this.size; i++) {
                result[i] = this.buffer[(this.head + i) % this.capacity];
            }
            return result;
        }

        clear() {
            this.buffer = new Array(this.capacity);
            this.head = 0;
            this.tail = 0;
            this.size = 0;
            this.totalPushed = 0;
        }

        get length() {
            return this.size;
        }
    }

    // =========================================================================
    // 3. PURE COGNITIVE ENGINE (Layer A - Zero DOM, Headless-Ready)
    // =========================================================================

    class PureCognitiveEngine {
        constructor(config) {
            this.config = config;
            this.sessionId = this._generateSessionId();
            this.eventBuffer = new BoundedEventBuffer(this.config.maxEventBuffer);
            this.questionHistory = []; // Bounded array of completed question metrics
            this.currentQuestion = null; // Active question tracking state

            // Cumulative Running Aggregates (independent of raw event eviction)
            this.runningAggregates = {
                totalQuestionsAttempted: 0,
                totalQuestionsCompleted: 0,
                totalCorrect: 0,
                totalFlips: 0,
                totalHesitationMs: 0,
                meaningfulSandboxCount: 0,
                representationStats: {
                    algebraic: { count: 0, correct: 0 },
                    geometric: { count: 0, correct: 0 },
                    graphical: { count: 0, correct: 0 },
                    tabular: { count: 0, correct: 0 },
                    contextual: { count: 0, correct: 0 }
                },
                conditionStats: { count: 0, correct: 0 },
                trapCounts: { L1: 0, L2: 0, L3: 0, other: 0 },
                rollingWindow: [] // Last 20 questions for weighted mastery
            };

            this.lastCalculatedState = this._createInitialState();
        }

        _generateSessionId() {
            return this.config.anonymousPrefix + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
        }

        _generateEventId() {
            return 'ev_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
        }

        _createInitialState() {
            return {
                rigor: 0.70,
                intuition: 0.70,
                flexibility: 0.65,
                representationGap: 0.0,
                masteryScore: 0.0,
                evidenceCount: 0,
                confidence: 0.0,
                detectedTraps: [],
                lastUpdatedAt: Date.now(),
                rationale: [
                    "Chưa đủ dữ liệu tối thiểu để xác lập hồ sơ nhận thức (cần ít nhất " + this.config.minimumEvidenceQuestions + " câu hỏi)."
                ],
                flags: {
                    insufficientEvidence: true,
                    highHesitation: false,
                    possiblePrerequisiteRisk: false
                }
            };
        }

        /**
         * Safely logs and emits an event into the ring buffer
         */
        _emitEvent(type, questionId, payload = {}) {
            const event = {
                eventId: this._generateEventId(),
                sessionId: this.sessionId,
                questionId: questionId || (this.currentQuestion ? this.currentQuestion.questionId : null),
                type: type,
                timestampMs: Date.now(),
                payload: payload
            };
            this.eventBuffer.push(event);
            return event;
        }

        /**
         * Begin tracking a question
         */
        beginQuestion(metadata) {
            if (!metadata || typeof metadata !== 'object') {
                return { success: false, error: 'Invalid question metadata' };
            }

            const qId = String(metadata.questionId || 'q_' + Date.now());
            const now = Date.now();

            this.currentQuestion = {
                questionId: qId,
                topic: String(metadata.topic || 'General Math'),
                difficulty: Math.max(1, Math.min(5, Number(metadata.difficulty) || 2)),
                representationType: this._normalizeRepType(metadata.representationType),
                expectedTimeMs: Math.max(5000, Number(metadata.expectedTimeMs) || 60000),
                prerequisiteTags: Array.isArray(metadata.prerequisiteTags) ? metadata.prerequisiteTags : [],
                misconceptionTrapCode: metadata.misconceptionTrapCode || null,
                logicalConditionTags: Array.isArray(metadata.logicalConditionTags) ? metadata.logicalConditionTags : [],
                
                // Telemetry tracking state
                openedAtMs: now,
                pausedDurationMs: 0,
                pauseStartTimeMs: null,
                firstMeaningfulActionMs: null,
                firstResponseTimeMs: null,
                lastAnswerSelected: null,
                flips: [],
                answerChangeCount: 0,
                hintsUsed: 0,
                sandboxInteractions: [],
                isSubmitted: false
            };

            this.runningAggregates.totalQuestionsAttempted++;

            const ev = this._emitEvent(EventTypes.QUESTION_OPENED, qId, {
                representationType: this.currentQuestion.representationType,
                difficulty: this.currentQuestion.difficulty,
                expectedTimeMs: this.currentQuestion.expectedTimeMs
            });

            return { success: true, questionId: qId, event: ev };
        }

        _normalizeRepType(rep) {
            if (!rep) return RepresentationTypes.ALGEBRAIC;
            const str = String(rep).toLowerCase();
            if (str.includes('geom')) return RepresentationTypes.GEOMETRIC;
            if (str.includes('graph')) return RepresentationTypes.GRAPHICAL;
            if (str.includes('tab')) return RepresentationTypes.TABULAR;
            if (str.includes('cont')) return RepresentationTypes.CONTEXTUAL;
            return RepresentationTypes.ALGEBRAIC;
        }

        /**
         * Handle timing pause from page visibility or blur
         */
        setPageVisibility(isVisible, timestampMs = Date.now()) {
            if (!this.currentQuestion) return;

            if (!isVisible) {
                // Tab hidden / blurred: start pause timer
                if (!this.currentQuestion.pauseStartTimeMs) {
                    this.currentQuestion.pauseStartTimeMs = timestampMs;
                }
            } else {
                // Tab became visible again
                if (this.currentQuestion.pauseStartTimeMs) {
                    const pausedMs = timestampMs - this.currentQuestion.pauseStartTimeMs;
                    // Only discount if pause > 3 seconds
                    if (pausedMs >= 3000) {
                        this.currentQuestion.pausedDurationMs += pausedMs;
                    }
                    this.currentQuestion.pauseStartTimeMs = null;
                }
            }
        }

        /**
         * Record choice selection or change
         */
        recordAnswer(payload) {
            if (!payload || typeof payload !== 'object') {
                return { success: false, error: 'Invalid answer payload' };
            }

            const now = Number(payload.timestampMs) || Date.now();
            const choiceId = payload.choiceId !== undefined ? String(payload.choiceId) : null;
            if (choiceId === null) {
                return { success: false, error: 'Missing choiceId in payload' };
            }

            if (!this.currentQuestion) {
                // Auto-init fallback question to remain fail-safe
                this.beginQuestion({ questionId: payload.questionId || 'auto_q' });
            }

            const q = this.currentQuestion;
            const effectiveTimeMs = Math.max(0, now - q.openedAtMs - q.pausedDurationMs);

            // Record first meaningful action & first response time
            if (q.firstMeaningfulActionMs === null) {
                q.firstMeaningfulActionMs = effectiveTimeMs;
            }
            if (q.firstResponseTimeMs === null) {
                q.firstResponseTimeMs = effectiveTimeMs;
            }

            // Detect whether choice actually changed
            let isChange = false;
            let evType = EventTypes.ANSWER_SELECTED;

            if (q.lastAnswerSelected !== null) {
                if (q.lastAnswerSelected !== choiceId) {
                    isChange = true;
                    q.answerChangeCount++;
                    this.runningAggregates.totalFlips++;
                    q.flips.push({
                        from: q.lastAnswerSelected,
                        to: choiceId,
                        atMs: effectiveTimeMs
                    });
                    evType = EventTypes.ANSWER_CHANGED;
                }
                // If same choice clicked again, do NOT increment answer_change_count
            }

            q.lastAnswerSelected = choiceId;

            const ev = this._emitEvent(evType, q.questionId, {
                choiceId: choiceId,
                isChange: isChange,
                totalFlips: q.answerChangeCount,
                responseTimeMs: effectiveTimeMs
            });

            return {
                success: true,
                questionId: q.questionId,
                choiceId: choiceId,
                isChange: isChange,
                answerChangeCount: q.answerChangeCount,
                hesitationMs: q.firstMeaningfulActionMs,
                event: ev
            };
        }

        /**
         * Record hint unlock / request
         */
        recordHint(payload = {}) {
            if (!this.currentQuestion) {
                this.beginQuestion({ questionId: payload.questionId || 'auto_q' });
            }
            const q = this.currentQuestion;
            const now = Number(payload.timestampMs) || Date.now();
            const effectiveTimeMs = Math.max(0, now - q.openedAtMs - q.pausedDurationMs);

            if (q.firstMeaningfulActionMs === null) {
                q.firstMeaningfulActionMs = effectiveTimeMs;
            }
            q.hintsUsed++;

            const ev = this._emitEvent(EventTypes.HINT_REQUESTED, q.questionId, {
                hintLevel: payload.hintLevel || q.hintsUsed,
                responseTimeMs: effectiveTimeMs
            });

            return { success: true, hintsUsed: q.hintsUsed, event: ev };
        }

        /**
         * Record interactive sandbox parameter adjustment
         */
        recordSandboxInteraction(payload = {}) {
            if (!this.currentQuestion) {
                this.beginQuestion({ questionId: payload.questionId || 'auto_q' });
            }
            const q = this.currentQuestion;
            const now = Number(payload.timestampMs) || Date.now();
            const effectiveTimeMs = Math.max(0, now - q.openedAtMs - q.pausedDurationMs);

            if (q.firstMeaningfulActionMs === null) {
                q.firstMeaningfulActionMs = effectiveTimeMs;
            }

            const paramName = String(payload.parameter || 'param');
            const paramValue = typeof payload.value === 'number' ? Number(payload.value.toFixed(3)) : payload.value;

            q.sandboxInteractions.push({
                parameter: paramName,
                value: paramValue,
                atMs: effectiveTimeMs
            });

            // Evaluate purposeful exploration: >= 2 adjustments with pause >= 300ms
            let isMeaningful = false;
            if (q.sandboxInteractions.length >= 2) {
                const uniqueParams = new Set(q.sandboxInteractions.map(s => s.parameter));
                const timeDiff = q.sandboxInteractions[q.sandboxInteractions.length - 1].atMs - q.sandboxInteractions[0].atMs;
                if (uniqueParams.size >= 1 && timeDiff >= 300) {
                    isMeaningful = true;
                }
            }

            const ev = this._emitEvent(EventTypes.SANDBOX_PARAMETER_CHANGED, q.questionId, {
                parameter: paramName,
                value: paramValue,
                isMeaningful: isMeaningful,
                interactionCount: q.sandboxInteractions.length
            });

            return { success: true, interactionCount: q.sandboxInteractions.length, isMeaningful, event: ev };
        }

        /**
         * Complete question grading and update cognitive state
         */
        completeQuestion(resultPayload = {}) {
            if (!this.currentQuestion) {
                return { success: false, error: 'No active question to complete' };
            }

            const q = this.currentQuestion;
            const now = Number(resultPayload.timestampMs) || Date.now();
            const isCorrect = Boolean(resultPayload.isCorrect);
            const earnedScore = typeof resultPayload.earnedScore === 'number' ? Math.max(0, Math.min(1, resultPayload.earnedScore)) : (isCorrect ? 1.0 : 0.0);
            
            const totalDurationMs = Math.max(100, now - q.openedAtMs - q.pausedDurationMs);
            const hesitationMs = q.firstMeaningfulActionMs !== null ? q.firstMeaningfulActionMs : totalDurationMs;

            q.isSubmitted = true;

            // Check if student hit a misconception trap
            let trapTriggered = null;
            if (!isCorrect) {
                if (resultPayload.misconceptionTrapCode) {
                    trapTriggered = resultPayload.misconceptionTrapCode;
                } else if (q.misconceptionTrapCode) {
                    trapTriggered = q.misconceptionTrapCode;
                }
            }

            if (trapTriggered) {
                if (trapTriggered === 'L1' || String(trapTriggered).includes('L1')) {
                    this.runningAggregates.trapCounts.L1++;
                } else if (trapTriggered === 'L2' || String(trapTriggered).includes('L2')) {
                    this.runningAggregates.trapCounts.L2++;
                } else if (trapTriggered === 'L3' || String(trapTriggered).includes('L3')) {
                    this.runningAggregates.trapCounts.L3++;
                } else {
                    this.runningAggregates.trapCounts.other++;
                }
            }

            // Check if sandbox interaction was meaningful
            const hasMeaningfulSandbox = q.sandboxInteractions.length >= 2;
            if (hasMeaningfulSandbox) {
                this.runningAggregates.meaningfulSandboxCount++;
            }

            // Update running aggregates
            this.runningAggregates.totalQuestionsCompleted++;
            if (isCorrect) this.runningAggregates.totalCorrect++;
            this.runningAggregates.totalHesitationMs += hesitationMs;

            const repType = q.representationType;
            if (this.runningAggregates.representationStats[repType]) {
                this.runningAggregates.representationStats[repType].count++;
                if (isCorrect) this.runningAggregates.representationStats[repType].correct++;
            }

            if (q.logicalConditionTags.length > 0) {
                this.runningAggregates.conditionStats.count++;
                if (isCorrect) this.runningAggregates.conditionStats.correct++;
            }

            // Add to rolling window for mastery (max 20 questions)
            const timeRatio = totalDurationMs / q.expectedTimeMs;
            this.runningAggregates.rollingWindow.push({
                isCorrect: isCorrect,
                score: earnedScore,
                difficulty: q.difficulty,
                timeRatio: timeRatio,
                flips: q.answerChangeCount,
                hasTrap: !!trapTriggered
            });
            if (this.runningAggregates.rollingWindow.length > 20) {
                this.runningAggregates.rollingWindow.shift();
            }

            // Save question metrics into bounded question history
            const questionSummary = {
                questionId: q.questionId,
                topic: q.topic,
                difficulty: q.difficulty,
                representationType: repType,
                isCorrect: isCorrect,
                earnedScore: earnedScore,
                durationMs: totalDurationMs,
                hesitationMs: hesitationMs,
                firstResponseTimeMs: q.firstResponseTimeMs || totalDurationMs,
                answerChangeCount: q.answerChangeCount,
                hintsUsed: q.hintsUsed,
                meaningfulSandbox: hasMeaningfulSandbox,
                trapTriggered: trapTriggered,
                completedAt: now
            };

            this.questionHistory.push(questionSummary);
            if (this.questionHistory.length > this.config.maxQuestionHistory) {
                this.questionHistory.shift();
            }

            // Emit completion event
            const ev = this._emitEvent(EventTypes.QUESTION_COMPLETED, q.questionId, {
                isCorrect: isCorrect,
                earnedScore: earnedScore,
                durationMs: totalDurationMs,
                hesitationMs: hesitationMs,
                flips: q.answerChangeCount,
                trapTriggered: trapTriggered
            });

            // Recompute Cognitive State Vector
            const state = this.computeCognitiveState();

            // Clear current question
            this.currentQuestion = null;

            return {
                success: true,
                questionSummary: questionSummary,
                cognitiveState: state,
                event: ev
            };
        }

        /**
         * Compute the real-time Cognitive State Vector S
         */
        computeCognitiveState() {
            const agg = this.runningAggregates;
            const completedCount = agg.totalQuestionsCompleted;
            const minEvidence = this.config.minimumEvidenceQuestions;

            // 1. Evidence Count & Confidence
            let confidence = 0.0;
            const insufficientEvidence = completedCount < minEvidence;

            if (completedCount === 0) {
                confidence = 0.0;
            } else if (completedCount < minEvidence) {
                confidence = Number(((completedCount / minEvidence) * 0.45).toFixed(2));
            } else {
                // Base confidence + variety bonus
                const repCounts = Object.values(agg.representationStats).filter(s => s.count > 0).length;
                const varietyBonus = Math.min(0.20, (repCounts - 1) * 0.05);
                const volumeBonus = Math.min(0.30, (completedCount - minEvidence) * 0.04);
                confidence = Math.min(1.0, Number((0.50 + varietyBonus + volumeBonus).toFixed(2)));
            }

            // 2. Rigor Score (0.0 .. 1.0)
            // Rigor = logicalCorrectness * 0.50 + conditionAwareness * 0.30 + answerStability * 0.20
            const wRigor = this.config.weights.rigor;
            let logicalCorrectness = completedCount > 0 ? (agg.totalCorrect / completedCount) : 0.70;
            if (agg.conditionStats.count > 0) {
                logicalCorrectness = agg.conditionStats.correct / agg.conditionStats.count;
            }

            const totalTraps = agg.trapCounts.L1 + agg.trapCounts.L2 + agg.trapCounts.L3 + agg.trapCounts.other;
            const trapPenaltyRate = completedCount > 0 ? (totalTraps / completedCount) : 0.0;
            const conditionAwareness = Math.max(0.0, 1.0 - trapPenaltyRate * 1.5);

            const avgFlips = completedCount > 0 ? (agg.totalFlips / completedCount) : 0.0;
            const answerStability = Math.max(0.0, 1.0 - Math.min(1.0, avgFlips * 0.35));

            let rawRigor = (logicalCorrectness * wRigor.logicalCorrectness) +
                           (conditionAwareness * wRigor.conditionAwareness) +
                           (answerStability * wRigor.answerStability);
            const rigor = Math.max(0.0, Math.min(1.0, Number(rawRigor.toFixed(3))));

            // 3. Intuition Score (0.0 .. 1.0)
            // Intuition = visualContextAccuracy * 0.55 + representationTransfer * 0.30 + meaningfulSandbox * 0.15
            const wIntuition = this.config.weights.intuition;
            const visualStats = agg.representationStats;
            const visualCount = visualStats.geometric.count + visualStats.graphical.count + visualStats.tabular.count + visualStats.contextual.count;
            const visualCorrect = visualStats.geometric.correct + visualStats.graphical.correct + visualStats.tabular.correct + visualStats.contextual.correct;
            
            const visualContextAccuracy = visualCount > 0 ? (visualCorrect / visualCount) : (completedCount > 0 ? (agg.totalCorrect / completedCount) : 0.70);
            
            // Transfer: consistency between algebraic and visual representations
            const algCount = visualStats.algebraic.count;
            const algAcc = algCount > 0 ? (visualStats.algebraic.correct / algCount) : visualContextAccuracy;
            const repDiff = Math.abs(algAcc - visualContextAccuracy);
            const representationTransfer = Math.max(0.0, 1.0 - repDiff);

            const sandboxRate = completedCount > 0 ? Math.min(1.0, agg.meaningfulSandboxCount / completedCount) : 0.5;
            
            let rawIntuition = (visualContextAccuracy * wIntuition.visualContextAccuracy) +
                               (representationTransfer * wIntuition.representationTransfer) +
                               (sandboxRate * wIntuition.meaningfulSandboxInteraction);
            const intuition = Math.max(0.0, Math.min(1.0, Number(rawIntuition.toFixed(3))));

            // 4. Flexibility Score (0.0 .. 1.0)
            // Flexibility = multiRepresentationSuccess * 0.60 + alternateApproachSuccess * 0.40
            const wFlex = this.config.weights.flexibility;
            const distinctRepsSolved = Object.values(visualStats).filter(s => s.correct > 0).length;
            const multiRepSuccess = Math.min(1.0, distinctRepsSolved / 3.0);
            const altApproachSuccess = Math.max(0.0, 1.0 - Math.min(1.0, avgFlips * 0.20));

            let rawFlex = (multiRepSuccess * wFlex.multiRepresentationSuccess) +
                          (altApproachSuccess * wFlex.alternateApproachSuccess);
            if (completedCount < 2) rawFlex = 0.65; // neutral baseline prior
            const flexibility = Math.max(0.0, Math.min(1.0, Number(rawFlex.toFixed(3))));

            // 5. Representation Gap (0.0 .. 100.0)
            let representationGap = 0.0;
            let gapRationale = '';
            if (algCount >= 1 && visualCount >= 1) {
                const visualAcc = visualCount > 0 ? (visualCorrect / visualCount) : 0.0;
                representationGap = Number((Math.abs(algAcc - visualAcc) * 100).toFixed(1));
                if (algAcc > visualAcc) {
                    gapRationale = `Độ chính xác đại số (${(algAcc * 100).toFixed(0)}%) cao hơn năng lực trực quan/đồ thị (${(visualAcc * 100).toFixed(0)}%).`;
                } else if (visualAcc > algAcc) {
                    gapRationale = `Độ chính xác trực quan/đồ thị (${(visualAcc * 100).toFixed(0)}%) cao hơn đại số (${(algAcc * 100).toFixed(0)}%).`;
                } else {
                    gapRationale = "Năng lực biểu diễn đại số và trực quan đồ thị cân bằng.";
                }
            } else {
                gapRationale = "Chưa đủ dữ liệu cả hai nhóm biểu diễn (đại số và đồ thị/ngữ cảnh) để tính độ lệch pha.";
            }

            // 6. Mastery Score (0.0 .. 100.0)
            let masteryScore = 0.0;
            if (agg.rollingWindow.length > 0) {
                let weightedScoreSum = 0;
                let weightTotal = 0;
                agg.rollingWindow.forEach(item => {
                    const diffWeight = 0.8 + (item.difficulty * 0.2); // 1.0 to 1.8
                    weightTotal += diffWeight;
                    // Time efficiency factor (clamp in [0.5, 1.2])
                    const timeScore = item.timeRatio <= 1.0 ? 1.0 : Math.max(0.5, 1.2 - (item.timeRatio * 0.3));
                    weightedScoreSum += (item.score * 0.6 + timeScore * 0.4) * diffWeight;
                });
                const rollingMastery = (weightedScoreSum / (weightTotal || 1)) * 100;
                
                // Composite with rigor
                const combinedMastery = rollingMastery * 0.70 + (rigor * 100) * 0.30;
                masteryScore = Math.max(0.0, Math.min(100.0, Number(combinedMastery.toFixed(1))));
            }

            // Cap mastery if evidence count < minimumEvidenceQuestions
            if (completedCount < minEvidence) {
                masteryScore = Math.min(84.9, masteryScore);
            }

            // 7. Detected Traps list
            const detectedTraps = [];
            if (agg.trapCounts.L1 > 0) detectedTraps.push('L1_BOUNDARY');
            if (agg.trapCounts.L2 > 0) detectedTraps.push('L2_LOGIC_SUFFICIENCY');
            if (agg.trapCounts.L3 > 0) detectedTraps.push('L3_CONCEPT_CONFUSION');
            if (agg.trapCounts.other > 0) detectedTraps.push('OTHER_MISCONCEPTION');

            // 8. Behavioral Flags
            const avgHesitation = completedCount > 0 ? (agg.totalHesitationMs / completedCount) : 0;
            const highHesitation = avgHesitation > this.config.longHesitationThresholdMs;
            const possiblePrerequisiteRisk = agg.trapCounts.L1 > 0 || (completedCount >= 3 && (agg.totalCorrect / completedCount) < 0.40);

            // 9. Explainable Rationale construction
            const rationale = [];
            if (insufficientEvidence) {
                rationale.push(`Hệ thống đang trong giai đoạn chẩn đoán ban đầu (${completedCount}/${minEvidence} câu hoàn thành).`);
            } else {
                rationale.push(`Đã xác lập hồ sơ dựa trên ${completedCount} câu hỏi (Độ tin cậy: ${(confidence * 100).toFixed(0)}%).`);
            }

            if (detectedTraps.length > 0) {
                rationale.push(`Phát hiện bẫy nhận thức trọng yếu: [${detectedTraps.join(', ')}].`);
            }

            if (representationGap >= this.config.representationGapThreshold) {
                rationale.push(`Khoảng trống biểu diễn vượt ngưỡng cảnh báo: ${representationGap}% >= ${this.config.representationGapThreshold}%. ${gapRationale}`);
            } else if (algCount >= 1 && visualCount >= 1) {
                rationale.push(`Độ lệch biểu diễn thấp (${representationGap}%). ${gapRationale}`);
            }

            if (masteryScore >= this.config.masteryThreshold && rigor >= 0.85) {
                rationale.push(`Học sinh đạt mức độ thuần thục cao (${masteryScore}% >= ${this.config.masteryThreshold}%) với kỷ luật logic vững vàng.`);
            }

            const state = {
                rigor,
                intuition,
                flexibility,
                representationGap,
                masteryScore,
                evidenceCount: completedCount,
                confidence,
                detectedTraps,
                lastUpdatedAt: Date.now(),
                rationale,
                flags: {
                    insufficientEvidence,
                    highHesitation,
                    possiblePrerequisiteRisk
                }
            };

            this.lastCalculatedState = state;
            return state;
        }

        getQuestionMetrics(questionId) {
            if (this.currentQuestion && (!questionId || this.currentQuestion.questionId === questionId)) {
                return { ...this.currentQuestion };
            }
            return this.questionHistory.find(q => q.questionId === questionId) || null;
        }

        getSessionSummary() {
            const agg = this.runningAggregates;
            const state = this.lastCalculatedState;
            return {
                sessionId: this.sessionId,
                totalAttempted: agg.totalQuestionsAttempted,
                totalCompleted: agg.totalQuestionsCompleted,
                totalCorrect: agg.totalCorrect,
                accuracy: agg.totalCompleted > 0 ? Number((agg.totalCorrect / agg.totalCompleted).toFixed(3)) : 0.0,
                totalFlips: agg.totalFlips,
                avgHesitationMs: agg.totalCompleted > 0 ? Math.round(agg.totalHesitationMs / agg.totalCompleted) : 0,
                meaningfulSandboxCount: agg.meaningfulSandboxCount,
                representationBreakdown: { ...agg.representationStats },
                trapCounts: { ...agg.trapCounts },
                stateVector: { ...state }
            };
        }

        exportTelemetry(options = {}) {
            return {
                version: this.config.version,
                sessionId: this.sessionId,
                exportedAt: new Date().toISOString(),
                summary: this.getSessionSummary(),
                rawEvents: options.includeRawEvents !== false ? this.eventBuffer.toArray() : [],
                questionHistory: this.questionHistory
            };
        }

        resetSession() {
            this.sessionId = this._generateSessionId();
            this.eventBuffer.clear();
            this.questionHistory = [];
            this.currentQuestion = null;
            this.runningAggregates = {
                totalQuestionsAttempted: 0,
                totalQuestionsCompleted: 0,
                totalCorrect: 0,
                totalFlips: 0,
                totalHesitationMs: 0,
                meaningfulSandboxCount: 0,
                representationStats: {
                    algebraic: { count: 0, correct: 0 },
                    geometric: { count: 0, correct: 0 },
                    graphical: { count: 0, correct: 0 },
                    tabular: { count: 0, correct: 0 },
                    contextual: { count: 0, correct: 0 }
                },
                conditionStats: { count: 0, correct: 0 },
                trapCounts: { L1: 0, L2: 0, L3: 0, other: 0 },
                rollingWindow: []
            };
            this.lastCalculatedState = this._createInitialState();
            return { success: true, sessionId: this.sessionId };
        }
    }

    // =========================================================================
    // 4. DOM TELEMETRY ADAPTER (Layer B - Event Delegation & Page Visibility)
    // =========================================================================

    class DOMTelemetryAdapter {
        constructor(engine, trackerFacade, options = {}) {
            this.engine = engine;
            this.facade = trackerFacade;
            this.options = options;
            this.rootElement = options.rootElement || (typeof document !== 'undefined' ? document : null);

            this.isRunning = false;
            this.listeners = [];
            this.sliderDebounceTimers = new Map();
            this.hasPageVisibility = typeof document !== 'undefined' && typeof document.hidden !== 'undefined';

            // Bound handlers
            this._handleClick = this._handleClick.bind(this);
            this._handleInput = this._handleInput.bind(this);
            this._handleVisibilityChange = this._handleVisibilityChange.bind(this);
            this._handleBlur = this._handleBlur.bind(this);
            this._handleFocus = this._handleFocus.bind(this);
        }

        attach() {
            if (this.isRunning || !this.rootElement) return;
            this.isRunning = true;

            const opts = { passive: true, capture: false };

            // 1. Delegated Click Listener for Answers and Action buttons
            this.rootElement.addEventListener('click', this._handleClick, opts);
            this.listeners.push({ target: this.rootElement, event: 'click', fn: this._handleClick, opts });

            // 2. Delegated Input/Change Listener for Sandbox controls
            this.rootElement.addEventListener('input', this._handleInput, opts);
            this.listeners.push({ target: this.rootElement, event: 'input', fn: this._handleInput, opts });

            // 3. Page Visibility API
            if (typeof document !== 'undefined') {
                document.addEventListener('visibilitychange', this._handleVisibilityChange, opts);
                this.listeners.push({ target: document, event: 'visibilitychange', fn: this._handleVisibilityChange, opts });
            }

            // 4. Window Blur / Focus fallback
            if (typeof window !== 'undefined') {
                window.addEventListener('blur', this._handleBlur, opts);
                this.listeners.push({ target: window, event: 'blur', fn: this._handleBlur, opts });

                window.addEventListener('focus', this._handleFocus, opts);
                this.listeners.push({ target: window, event: 'focus', fn: this._handleFocus, opts });
            }
        }

        detach() {
            if (!this.isRunning) return;
            this.isRunning = false;

            // Remove all registered DOM event listeners
            this.listeners.forEach(l => {
                try {
                    l.target.removeEventListener(l.event, l.fn, l.opts);
                } catch (e) {
                    // Ignore detachment error on unmounted elements
                }
            });
            this.listeners = [];

            // Clear any pending debounced timers
            this.sliderDebounceTimers.forEach(timer => clearTimeout(timer));
            this.sliderDebounceTimers.clear();
        }

        _handleClick(e) {
            try {
                const target = e.target;
                if (!target || typeof target.closest !== 'function') return;

                // Answer choice selection
                const answerEl = target.closest('[data-cognitive-answer]');
                if (answerEl) {
                    const choiceId = answerEl.getAttribute('data-cognitive-answer');
                    const qContainer = answerEl.closest('[data-cognitive-question-id]');
                    const qId = qContainer ? qContainer.getAttribute('data-cognitive-question-id') : null;

                    this.facade.recordAnswer({
                        questionId: qId,
                        choiceId: choiceId,
                        timestampMs: Date.now()
                    });
                    return;
                }

                // Action buttons: submit, hint
                const actionEl = target.closest('[data-cognitive-action]');
                if (actionEl) {
                    const action = actionEl.getAttribute('data-cognitive-action');
                    const qContainer = actionEl.closest('[data-cognitive-question-id]');
                    const qId = qContainer ? qContainer.getAttribute('data-cognitive-question-id') : null;

                    if (action === 'submit') {
                        // Notify submit
                        this.facade._notifyAction('submit', { questionId: qId });
                    } else if (action === 'hint') {
                        this.facade.recordHint({ questionId: qId });
                    }
                }
            } catch (err) {
                this.facade._handleError(err, 'DOM:click');
            }
        }

        _handleInput(e) {
            try {
                const target = e.target;
                if (!target || typeof target.closest !== 'function') return;

                const sandboxEl = target.closest('[data-cognitive-sandbox-param]');
                if (sandboxEl) {
                    const paramName = sandboxEl.getAttribute('data-cognitive-sandbox-param');
                    const rawVal = parseFloat(target.value);
                    const val = isNaN(rawVal) ? target.value : rawVal;

                    // Batch and debounce slider events
                    if (this.sliderDebounceTimers.has(paramName)) {
                        clearTimeout(this.sliderDebounceTimers.get(paramName));
                    }

                    const timer = setTimeout(() => {
                        this.sliderDebounceTimers.delete(paramName);
                        this.facade.recordSandboxInteraction({
                            parameter: paramName,
                            value: val,
                            timestampMs: Date.now()
                        });
                    }, this.options.batchDebounceMs || 120);

                    this.sliderDebounceTimers.set(paramName, timer);
                }
            } catch (err) {
                this.facade._handleError(err, 'DOM:input');
            }
        }

        _handleVisibilityChange() {
            try {
                if (typeof document === 'undefined') return;
                const isVisible = !document.hidden;
                this.engine.setPageVisibility(isVisible, Date.now());
            } catch (err) {
                this.facade._handleError(err, 'DOM:visibilitychange');
            }
        }

        _handleBlur() {
            try {
                this.engine.setPageVisibility(false, Date.now());
            } catch (err) {
                this.facade._handleError(err, 'DOM:blur');
            }
        }

        _handleFocus() {
            try {
                this.engine.setPageVisibility(true, Date.now());
            } catch (err) {
                this.facade._handleError(err, 'DOM:focus');
            }
        }
    }

    // =========================================================================
    // 5. PUBLIC FACADE CLASS: PumkinCognitiveTracker
    // =========================================================================

    class PumkinCognitiveTracker {
        /**
         * @param {Object} [options]
         */
        constructor(options = {}) {
            this.config = mergeAndValidateConfig(options);
            this.engine = new PureCognitiveEngine(this.config);

            // Callbacks
            this.onStateChange = typeof options.onStateChange === 'function' ? options.onStateChange : null;
            this.onTelemetryEvent = typeof options.onTelemetryEvent === 'function' ? options.onTelemetryEvent : null;
            this.onError = typeof options.onError === 'function' ? options.onError : null;

            // DOM Telemetry Adapter
            this.adapter = new DOMTelemetryAdapter(this.engine, this, options);
            this.isStarted = false;

            if (options.autoStart !== false && typeof window !== 'undefined') {
                this.start();
            }
        }

        _handleError(error, context = '') {
            const errObj = {
                message: error ? error.message || String(error) : 'Unknown tracker error',
                context: context,
                timestamp: Date.now()
            };
            if (this.config.debug) {
                console.warn(`[PumkinCognitiveTracker Error][${context}]`, error);
            }
            if (this.onError) {
                try {
                    this.onError(errObj);
                } catch (e) {
                    // Prevent callback exception from crashing tracker
                }
            }
            return errObj;
        }

        _notifyStateChange(state) {
            if (this.onStateChange) {
                // Schedule in microtask to prevent blocking current execution thread
                if (typeof queueMicrotask === 'function') {
                    queueMicrotask(() => {
                        try { this.onStateChange(state, state.rationale); } catch (e) { this._handleError(e, 'onStateChange'); }
                    });
                } else {
                    setTimeout(() => {
                        try { this.onStateChange(state, state.rationale); } catch (e) { this._handleError(e, 'onStateChange'); }
                    }, 0);
                }
            }
        }

        _notifyTelemetryEvent(event) {
            if (this.onTelemetryEvent) {
                try {
                    this.onTelemetryEvent(event);
                } catch (e) {
                    this._handleError(e, 'onTelemetryEvent');
                }
            }
        }

        _notifyAction(actionName, payload) {
            // Internal dispatch
        }

        /**
         * Start tracking & attach DOM event delegation (idempotent)
         */
        start() {
            try {
                if (this.isStarted) return { success: true, message: 'Already started' };
                this.adapter.attach();
                this.isStarted = true;
                return { success: true };
            } catch (err) {
                return { success: false, error: this._handleError(err, 'start').message };
            }
        }

        /**
         * Temporarily pause tracking & detach DOM listeners (idempotent)
         */
        stop() {
            try {
                if (!this.isStarted) return { success: true, message: 'Already stopped' };
                this.adapter.detach();
                this.isStarted = false;
                return { success: true };
            } catch (err) {
                return { success: false, error: this._handleError(err, 'stop').message };
            }
        }

        /**
         * Permanently destroy tracker, remove listeners, and clean memory references
         */
        destroy() {
            try {
                this.stop();
                this.onStateChange = null;
                this.onTelemetryEvent = null;
                this.onError = null;
                this.engine.resetSession();
                return { success: true };
            } catch (err) {
                return { success: false, error: this._handleError(err, 'destroy').message };
            }
        }

        /**
         * Initialize question tracking
         * @param {Object} questionMetadata 
         */
        beginQuestion(questionMetadata) {
            try {
                const res = this.engine.beginQuestion(questionMetadata);
                if (res.success && res.event) {
                    this._notifyTelemetryEvent(res.event);
                }
                return res;
            } catch (err) {
                return { success: false, error: this._handleError(err, 'beginQuestion').message };
            }
        }

        /**
         * Record student selection of an answer choice
         * @param {Object} answerPayload 
         */
        recordAnswer(answerPayload) {
            try {
                const res = this.engine.recordAnswer(answerPayload);
                if (res.success && res.event) {
                    this._notifyTelemetryEvent(res.event);
                }
                return res;
            } catch (err) {
                return { success: false, error: this._handleError(err, 'recordAnswer').message };
            }
        }

        /**
         * Record hint unlock or interaction
         * @param {Object} [hintPayload] 
         */
        recordHint(hintPayload = {}) {
            try {
                const res = this.engine.recordHint(hintPayload);
                if (res.success && res.event) {
                    this._notifyTelemetryEvent(res.event);
                }
                return res;
            } catch (err) {
                return { success: false, error: this._handleError(err, 'recordHint').message };
            }
        }

        /**
         * Record sandbox manipulation
         * @param {Object} interactionPayload 
         */
        recordSandboxInteraction(interactionPayload) {
            try {
                const res = this.engine.recordSandboxInteraction(interactionPayload);
                if (res.success && res.event) {
                    this._notifyTelemetryEvent(res.event);
                }
                return res;
            } catch (err) {
                return { success: false, error: this._handleError(err, 'recordSandboxInteraction').message };
            }
        }

        /**
         * Complete question scoring & compute Cognitive State Vector
         * @param {Object} resultPayload 
         */
        completeQuestion(resultPayload) {
            try {
                const res = this.engine.completeQuestion(resultPayload);
                if (res.success) {
                    if (res.event) this._notifyTelemetryEvent(res.event);
                    if (res.cognitiveState) this._notifyStateChange(res.cognitiveState);
                }
                return res;
            } catch (err) {
                return { success: false, error: this._handleError(err, 'completeQuestion').message };
            }
        }

        /**
         * Get latest Cognitive State Vector
         */
        getCognitiveState() {
            try {
                return this.engine.computeCognitiveState();
            } catch (err) {
                this._handleError(err, 'getCognitiveState');
                return this.engine.lastCalculatedState;
            }
        }

        /**
         * Get metrics for a specific question ID
         */
        getQuestionMetrics(questionId) {
            try {
                return this.engine.getQuestionMetrics(questionId);
            } catch (err) {
                this._handleError(err, 'getQuestionMetrics');
                return null;
            }
        }

        /**
         * Get overall session telemetry summary
         */
        getSessionSummary() {
            try {
                return this.engine.getSessionSummary();
            } catch (err) {
                this._handleError(err, 'getSessionSummary');
                return null;
            }
        }

        /**
         * Export telemetry package
         */
        exportTelemetry(options = {}) {
            try {
                return this.engine.exportTelemetry(options);
            } catch (err) {
                this._handleError(err, 'exportTelemetry');
                return null;
            }
        }

        /**
         * Reset current session
         */
        resetSession() {
            try {
                const res = this.engine.resetSession();
                const state = this.engine.lastCalculatedState;
                this._notifyStateChange(state);
                return res;
            } catch (err) {
                return { success: false, error: this._handleError(err, 'resetSession').message };
            }
        }
    }

    // Expose Pure Engine and Helper constants for testability
    PumkinCognitiveTracker.DEFAULT_CONFIG = DEFAULT_CONFIG;
    PumkinCognitiveTracker.RepresentationTypes = RepresentationTypes;
    PumkinCognitiveTracker.EventTypes = EventTypes;
    PumkinCognitiveTracker.BoundedEventBuffer = BoundedEventBuffer;
    PumkinCognitiveTracker.PureCognitiveEngine = PureCognitiveEngine;

    return PumkinCognitiveTracker;
});
