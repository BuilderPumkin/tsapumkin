/**
 * PUMKIN DYNAMIC COGNITIVE ROUTER - ROUTER ENGINE
 * Pure JavaScript, deterministic, rule-based, explainable.
 * Zero LLM dependency. Full anti-flapping cooldown & priority override logic.
 */

(function(exports) {
    'use strict';

    let Strategies;
    if (typeof require !== 'undefined') {
        const types = require('../models/types.js');
        Strategies = types.Strategies;
    } else if (typeof window !== 'undefined' && window.PumkinModels) {
        Strategies = window.PumkinModels.Strategies;
    } else {
        Strategies = {
            SOCRATIC: 'SOCRATIC',
            DUAL_CODING: 'DUAL_CODING',
            REVERSE: 'REVERSE',
            DIAGNOSTIC: 'DIAGNOSTIC',
            PRACTICE: 'PRACTICE'
        };
    }

    class DynamicCognitiveRouter {
        constructor(config = {}) {
            this.config = config;
            this.thresholds = config.thresholds || {
                MIN_EVIDENCE_QUESTIONS: 3,
                REPRESENTATION_GAP_THRESHOLD: 30.0,
                MASTERY_THRESHOLD: 85.0,
                RIGOR_THRESHOLD: 0.85,
                HIGH_PREREQUISITE_RISK: 0.60,
                COOLDOWN_QUESTIONS: 2,
                MAX_EXPECTED_TIME_RATIO: 1.20
            };

            this.currentStrategy = Strategies.DIAGNOSTIC;
            this.lastStrategyChangeQuestion = 0;
            this.history = [];
        }

        /**
         * Determine pedagogical routing based on Cognitive State Vector & Session Metrics
         * @param {Object} stateVector 
         * @param {Object} metrics 
         * @returns {{ strategy: string, rationale: string, trigger_rule: string, cooldown_status: Object, timestamp: string }}
         */
        evaluateRoute(stateVector, metrics = {}) {
            const answered = metrics.answered_count || 0;
            const cooldownQuestions = this.thresholds.COOLDOWN_QUESTIONS || 2;
            const questionsSinceChange = answered - this.lastStrategyChangeQuestion;
            const isCooldownActive = this.currentStrategy !== Strategies.DIAGNOSTIC && 
                                     questionsSinceChange < cooldownQuestions;
            const remainingCooldown = Math.max(0, cooldownQuestions - questionsSinceChange);

            let selectedStrategy = this.currentStrategy;
            let rationale = '';
            let triggerRule = '';

            const recentTrap = metrics.latest_trap || null;
            const hasTraps = (stateVector.detected_traps && stateVector.detected_traps.length > 0) || !!recentTrap;
            const hasHighRisk = stateVector.prerequisite_risk >= this.thresholds.HIGH_PREREQUISITE_RISK;

            // PRIORITY 1: Insufficient Evidence (< MIN_EVIDENCE_QUESTIONS or confidence < 0.5)
            if (answered < this.thresholds.MIN_EVIDENCE_QUESTIONS || stateVector.confidence < 0.50) {
                selectedStrategy = Strategies.DIAGNOSTIC;
                triggerRule = 'INSUFFICIENT_EVIDENCE';
                rationale = `Chưa đủ dữ liệu tối thiểu (đã làm ${answered}/${this.thresholds.MIN_EVIDENCE_QUESTIONS} câu, độ tin cậy ${(stateVector.confidence * 100).toFixed(0)}%). Hệ thống duy trì chế độ chẩn đoán ban đầu (DIAGNOSTIC).`;
            }
            // PRIORITY 2: Critical Misconception Trap OR High Prerequisite Risk (IMMEDIATE OVERRIDE)
            else if (hasTraps || hasHighRisk) {
                selectedStrategy = Strategies.SOCRATIC;
                triggerRule = 'CRITICAL_MISCONCEPTION_OVERRIDE';
                const trapName = recentTrap ? (recentTrap.trap || recentTrap) : (stateVector.detected_traps.join(', '));
                const reason = hasTraps 
                    ? `Phát hiện bẫy nhận thức trọng yếu [${trapName}]` 
                    : `Rủi ro kiến thức tiên quyết cao (${(stateVector.prerequisite_risk * 100).toFixed(1)}% >= ${(this.thresholds.HIGH_PREREQUISITE_RISK * 100).toFixed(0)}%)`;
                
                rationale = `${reason}. Hệ thống NGAY LẬP TỨC kích hoạt Giàn giáo Socratic (PA1), bỏ qua cooldown để truy vết và chỉnh sửa nhận thức tại gốc.`;
            }
            // PRIORITY 3: Cooldown Hold (Stabilization Window)
            else if (isCooldownActive) {
                selectedStrategy = this.currentStrategy;
                triggerRule = 'COOLDOWN_ACTIVE';
                rationale = `Hệ thống đang giữ ổn định sư phạm (Cooldown còn ${remainingCooldown} câu). Duy trì chiến lược hiện tại [${this.currentStrategy}] để học sinh hoàn thành trọn vẹn chu trình can thiệp.`;
            }
            // PRIORITY 4: Representation Gap (Symbolic vs Visual/Tabular/Contextual)
            else if (stateVector.representation_gap > this.thresholds.REPRESENTATION_GAP_THRESHOLD) {
                selectedStrategy = Strategies.DUAL_CODING;
                triggerRule = 'REPRESENTATION_GAP_DETECTED';
                rationale = `Phát hiện khoảng trống biểu diễn lớn (${stateVector.representation_gap.toFixed(1)}% > ngưỡng ${this.thresholds.REPRESENTATION_GAP_THRESHOLD}%). Kích hoạt Mã hóa kép & Sandbox tương tác (PA2) để đồng bộ đồ thị trực quan và ký hiệu đại số.`;
            }
            // PRIORITY 5: High Mastery & Rigor (Deep Transfer via Reverse Engineering)
            else if (
                stateVector.mastery_score >= this.thresholds.MASTERY_THRESHOLD &&
                stateVector.rigor >= this.thresholds.RIGOR_THRESHOLD &&
                (metrics.avg_time_ratio || 1.0) <= this.thresholds.MAX_EXPECTED_TIME_RATIO
            ) {
                selectedStrategy = Strategies.REVERSE;
                triggerRule = 'HIGH_MASTERY_REVERSE';
                rationale = `Học sinh đạt trình độ thuần thục cao (Mastery ${stateVector.mastery_score}% >= ${this.thresholds.MASTERY_THRESHOLD}%, Rigor ${stateVector.rigor} >= ${this.thresholds.RIGOR_THRESHOLD}, Tốc độ xử lý tốt ${(metrics.avg_time_ratio || 1.0).toFixed(2)}x <= ${this.thresholds.MAX_EXPECTED_TIME_RATIO}x). Kích hoạt Kỹ nghệ đảo ngược (PA3) để thiết kế bài toán mới.`;
            }
            // PRIORITY 6: Default Practice Flow
            else {
                selectedStrategy = Strategies.PRACTICE;
                triggerRule = 'STANDARD_PRACTICE';
                rationale = `Các chỉ số tư duy ổn định không vi phạm ngưỡng cảnh báo. Tiếp tục lộ trình luyện tập phân hóa tiêu chuẩn (PRACTICE).`;
            }

            // Detect strategy switch to update cooldown tracker
            const strategyChanged = (selectedStrategy !== this.currentStrategy);
            if (strategyChanged) {
                this.lastStrategyChangeQuestion = answered;
                this.currentStrategy = selectedStrategy;
            }

            // Sync with state vector recommended strategy
            stateVector.recommended_strategy = selectedStrategy;

            const decision = {
                strategy: selectedStrategy,
                previous_strategy: strategyChanged ? this.history[this.history.length - 1]?.strategy || Strategies.DIAGNOSTIC : selectedStrategy,
                strategy_changed: strategyChanged,
                trigger_rule: triggerRule,
                rationale: rationale,
                cooldown_status: {
                    active: isCooldownActive && !strategyChanged,
                    remaining_questions: remainingCooldown,
                    last_change_question: this.lastStrategyChangeQuestion
                },
                state_vector: { ...stateVector },
                timestamp: new Date().toISOString()
            };

            this.history.push(decision);
            return decision;
        }

        /**
         * Get full history of routing decisions
         */
        getHistory() {
            return this.history;
        }

        /**
         * Reset router state
         */
        reset() {
            this.currentStrategy = Strategies.DIAGNOSTIC;
            this.lastStrategyChangeQuestion = 0;
            this.history = [];
        }
    }

    exports.DynamicCognitiveRouter = DynamicCognitiveRouter;

})(typeof module !== 'undefined' && module.exports ? module.exports : (window.PumkinRouter = window.PumkinRouter || {}));
