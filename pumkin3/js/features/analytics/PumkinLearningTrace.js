/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.LearningTrace
 * Layer: Cognitive Telemetry
 * Description: Behavioral Logging, Learning Footprints & Audit Trails
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

const PumkinLearningTrace = {
    STORAGE_KEY: "pumkin_learning_trace_v2",

    getTraceKey() {
        if (typeof PumkinStorage !== "undefined" && PumkinStorage.getPartitionKey) {
            return PumkinStorage.getPartitionKey("learning_trace");
        }
        return this.STORAGE_KEY;
    },

    getTrace() {
        try {
            const raw = localStorage.getItem(this.getTraceKey());
            const trace = raw ? JSON.parse(raw) : [];
            if (trace.length === 0) {
                return this.seedFromHistory();
            }
            return trace;
        } catch (e) {
            console.warn("Lỗi khi đọc learning trace:", e);
            return [];
        }
    },

    saveTrace(trace) {
        try {
            // Keep last 500 attempts to avoid storage overflow
            const trimmed = trace.slice(0, 500);
            localStorage.setItem(this.getTraceKey(), JSON.stringify(trimmed));
        } catch (e) {
            console.warn("Lỗi khi lưu learning trace:", e);
        }
    },

    addAttempt(record) {
        // record: { questionId, examId, isCorrect, status, timeSpentSeconds, userAnswer, topic, cognitive_level, skills }
        const trace = this.getTrace();
        const q = (typeof PumkinStorage !== "undefined") ? PumkinStorage.getQuestionById(record.questionId) : null;
        
        // Auto classify error if wrong
        let errorType = null;
        let classification = null;
        if (!record.isCorrect && record.status !== "correct") {
            const opt = record.selectedOptionId ?? record.selectedOption ?? record.userAnswer;
            classification = (typeof PumkinErrorClassifier !== "undefined")
                ? PumkinErrorClassifier.classify(q, { ...record, selectedOptionId: opt })
                : null;
            if (classification) {
                errorType = classification.type;
            }
        }

        const newRecord = {
            id: "trace_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
            timestamp: new Date().toISOString(),
            questionId: record.questionId,
            examId: record.examId || "practice",
            isCorrect: !!record.isCorrect,
            status: record.status || (record.isCorrect ? "correct" : "wrong"),
            timeSpentSeconds: Number(record.timeSpentSeconds) || 0,
            userAnswer: record.userAnswer,
            selectedOptionId: record.selectedOptionId ?? record.selectedOption ?? record.userAnswer ?? null,
            topic: record.topic || (q ? q.topic : "Toán chung"),
            cognitive_level: record.cognitive_level || (q ? q.cognitive_level : "Thông hiểu"),
            skills: record.skills || (q ? q.skills : ["skill_reasoning"]),
            error_type: errorType,
            misconception_id: classification ? (classification.misconceptionId || null) : (record.misconception_id || null),
            classification_mode: classification ? (classification.mode || null) : null,
            is_legacy_classification: classification ? !!classification.isLegacy : false
        };

        trace.unshift(newRecord);
        this.saveTrace(trace);
        return newRecord;
    },

    seedFromHistory() {
        try {
            if (typeof PumkinStorage === "undefined") return [];
            const history = PumkinStorage.getHistory() || [];
            if (history.length === 0) return [];

            const seeded = [];
            history.forEach(attempt => {
                const questions = attempt.questions || [];
                const gradings = attempt.grading || [];
                const userAns = attempt.user_answers || [];
                const timePerQ = Math.round((attempt.time_spent_seconds || 60) / Math.max(1, questions.length));

                questions.forEach((q, idx) => {
                    const g = gradings[idx];
                    const isCorrect = g ? (g.status === "correct") : false;
                    const status = g ? g.status : (isCorrect ? "correct" : "wrong");

                    let errorType = null;
                    if (!isCorrect) {
                        const classObj = PumkinErrorClassifier.classify(q, {
                            timeSpentSeconds: timePerQ,
                            status: status
                        });
                        errorType = classObj.type;
                    }

                    seeded.push({
                        id: "seed_" + (attempt.id || Date.now()) + "_" + idx,
                        timestamp: attempt.date || new Date().toISOString(),
                        questionId: q.id,
                        examId: attempt.exam_id || "historical_exam",
                        isCorrect: isCorrect,
                        status: status,
                        timeSpentSeconds: timePerQ,
                        userAnswer: userAns[idx] !== undefined ? userAns[idx] : null,
                        topic: q.topic || "Toán chung",
                        cognitive_level: q.cognitive_level || "Thông hiểu",
                        skills: q.skills || ["skill_reasoning"],
                        error_type: errorType
                    });
                });
            });

            if (seeded.length > 0) {
                this.saveTrace(seeded);
            }
            return seeded;
        } catch (e) {
            console.warn("Lỗi khi tạo hạt giống từ lịch sử:", e);
            return [];
        }
    }
};

    // Primary Namespace
    if (typeof window !== 'undefined') {
        window.Pumkin = window.Pumkin || {};
        window.Pumkin.LearningTrace = PumkinLearningTrace;
        // // DEPRECATED: Backward compatibility shim
        window.PumkinLearningTrace = PumkinLearningTrace;
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = PumkinLearningTrace;
    }
})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
