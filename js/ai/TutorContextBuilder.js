/**
 * PUMKIN TUTOR CONTEXT ENGINE
 * 
 * TutorContextBuilder
 * Responsibilities: 
 * - Extract necessary data from PUMKIN Core
 * - Normalize and validate the data against tutor_context.schema.json
 * - Provide a privacy-safe, canonical context for the future AI Layer.
 */

const TutorContextBuilder = (function() {
    
    // Fallbacks for testing/modular usage
    let _deps = {
        getQuestionById: (id) => (typeof PumkinStorage !== 'undefined' ? PumkinStorage.getQuestionById(id) : null),
        getKnowledgeBase: () => (typeof PumkinStorage !== 'undefined' ? PumkinStorage.getKnowledgeBase() : []),
        getLearningTrace: () => (typeof PumkinLearningTrace !== 'undefined' ? PumkinLearningTrace.getTrace() : []),
        getSkillProfile: () => (typeof PumkinSkillProfile !== 'undefined' ? (typeof PumkinSkillProfile.getProfile === 'function' ? PumkinSkillProfile.getProfile() : (typeof PumkinSkillProfile.computeProfile === 'function' ? PumkinSkillProfile.computeProfile() : null)) : null),
        classifyError: (q, attempt) => (typeof PumkinErrorClassifier !== 'undefined' ? PumkinErrorClassifier.classify(q, attempt) : { type: "unknown" })
    };

    /**
     * Inject dependencies (useful for unit testing without globals)
     * @param {Object} deps 
     */
    function setDependencies(deps) {
        _deps = { ..._deps, ...deps };
    }

    /**
     * Build the Canonical Tutor Context
     * @param {Object} params
     * @param {string} params.userId
     * @param {string} params.sessionId
     * @param {string} params.examId
     * @param {string} params.questionId
     * @param {string|null} params.userAnswer
     * @param {number} params.timeSpentSeconds
     * @param {boolean} params.isCorrect
     * @returns {Object} Canonical TutorContext object
     */
    function buildContext(params) {
        if (!params || !params.questionId) {
            throw new Error("TutorContextBuilder: questionId is required");
        }

        const question = _deps.getQuestionById(params.questionId);
        
        // Handle gracefully if question not found or old schema
        const qData = question || {
            id: params.questionId,
            text: "[Question data missing or malformed]",
            topic: "Unknown",
            skills: []
        };

        // 1. Build Question Context
        const questionCtx = {
            id: qData.id,
            text: qData.text || qData.content || "", // handle schema variations
            options: qData.options || [],
            correct_value: qData.correct_value || qData.answer || "",
            explanation: qData.explanation || "",
            topic: qData.topic || "Unknown",
            skills: Array.isArray(qData.skills) ? qData.skills : [],
            difficulty: qData.difficulty || "Trung bAnh",
            cognitive_level: qData.cognitive_level || "ThA'ng hiu",
            common_traps: Array.isArray(qData.common_traps) ? qData.common_traps : []
        };

        // 2. Build Attempt Context
        let errorType = null;
        if (params.userAnswer !== undefined && !params.isCorrect) {
            const classification = _deps.classifyError(qData, { 
                userAnswer: params.userAnswer, 
                timeSpentSeconds: params.timeSpentSeconds || 0 
            });
            errorType = classification ? classification.type : "unknown";
        }

        const attemptCtx = {
            user_answer: params.userAnswer !== undefined ? String(params.userAnswer) : null,
            time_spent_seconds: params.timeSpentSeconds || 0,
            is_correct: !!params.isCorrect,
            error_type: errorType
        };

        // 3. Build Student State
        const profile = _deps.getSkillProfile() || { masteryByTopic: {}, masteryBySkill: {}, weaknesses: [] };
        const trace = _deps.getLearningTrace() || [];

        // Extract recurring errors from trace
        const recentErrors = trace
            .filter(t => !t.isCorrect && t.error_type)
            .slice(0, 50)
            .map(t => t.error_type);
        
        const errorCounts = {};
        recentErrors.forEach(e => { errorCounts[e] = (errorCounts[e] || 0) + 1; });
        const recurring = Object.keys(errorCounts).filter(e => errorCounts[e] >= 3);

        const studentCtx = {
            user_id: params.userId || "anonymous",
            topic_mastery: profile.masteryByTopic || {},
            skill_mastery: profile.masteryBySkill || {},
            recurring_errors: recurring,
            average_time_seconds: profile.averageTime || 0
        };

        // 4. Build Related Knowledge Context
        const knowledgeBase = _deps.getKnowledgeBase() || [];
        // Match by exact topic string or if question specifies prerequisites
        const relatedKnowledge = knowledgeBase
            .filter(k => 
                (k.topic && k.topic === qData.topic) || 
                (k.chapter && k.chapter.includes(qData.topic)) ||
                (qData.prerequisites && qData.prerequisites.includes(k.id))
            )
            .map(k => ({
                id: k.id,
                title: k.title || k.chapter || "Knowledge Ref",
                theory_markdown: k.theory_markdown || k.content || "",
                formulas: k.formulas || []
            }))
            .slice(0, 3); // Limit to top 3 to save context window

        // 5. Build History (Last 5 attempts in this topic)
        const historyCtx = trace
            .filter(t => t.topic === qData.topic && t.questionId !== params.questionId)
            .slice(0, 5)
            .map(t => ({
                question_id: t.questionId,
                is_correct: !!t.isCorrect,
                error_type: t.error_type || null,
                timestamp: t.timestamp || new Date().toISOString()
            }));

        // Final Assembly
        const context = {
            context_schema_version: "1.0.0",
            timestamp: new Date().toISOString(),
            student: studentCtx,
            session: {
                session_id: params.sessionId || "none",
                exam_id: params.examId || "practice",
                time_elapsed_seconds: params.timeSpentSeconds || 0
            },
            question: questionCtx,
            attempt: attemptCtx,
            knowledge: relatedKnowledge,
            history: historyCtx
        };

        return context;
    }

    return {
        buildContext,
        setDependencies
    };
})();

// For CommonJS (Node.js tests) support
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TutorContextBuilder;
}

if (typeof window !== 'undefined') window.TutorContextBuilder = TutorContextBuilder;
