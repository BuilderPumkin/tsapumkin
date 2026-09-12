/**
 * PUMKIN STRATEGY ENGINE
 * Determines the pedagogical action based on Intent, Math Verification, Context, and State.
 */

const StrategyEngine = (function() {

    // Dependency injection if running in a different environment
    let _classifier = (typeof IntentClassifier !== 'undefined') ? IntentClassifier : null;

    function setDependencies(deps) {
        if (deps.classifier) _classifier = deps.classifier;
    }

    /**
     * Determine the pedagogical strategy.
     * @param {string} intent - Intent constant (e.g. "ask_hint")
     * @param {Object|null} mathVerification - Result from MathematicalVerifier
     * @param {Object} tutorContext - The Canonical Context
     * @param {Object} conversationState - Short term memory state
     * @returns {Object} Strategy instructions for the AI Provider
     */
    function determineStrategy(intent, mathVerification, tutorContext, conversationState) {
        
        let targetHintLevel = conversationState.hintLevel;
        let responseType = "explanation";
        let instruction = "";

        const isExamMode = tutorContext.session && tutorContext.session.exam_id && !tutorContext.session.exam_id.includes("practice");

        switch(intent) {
            case "ask_hint":
                targetHintLevel = Math.min(6, targetHintLevel + 1);
                
                // Block full solution in Exam Mode
                if (isExamMode && targetHintLevel > 1) {
                    targetHintLevel = 1;
                    responseType = "refusal";
                    instruction = "This is an exam. Refuse to give any hint beyond a simple concept reminder (Level 1). Do not provide formulas or steps.";
                } else {
                    responseType = "hint";
                    instruction = `Provide a hint at Level ${targetHintLevel}. Level 1: Guiding Question. Level 2: Concept. Level 3: Formula. Level 4: Next Step. Level 5: Detailed Step. Level 6: Full Solution.`;
                }
                break;
                
            case "ask_solution":
                if (isExamMode) {
                    responseType = "refusal";
                    instruction = "Refuse to give the solution as the student is in an exam focus mode.";
                } else {
                    targetHintLevel = 6;
                    responseType = "solution";
                    instruction = "Provide the complete, step-by-step solution. Break it down logically.";
                }
                break;
                
            case "submit_step":
            case "ask_check":
                if (mathVerification) {
                    if (mathVerification.valid) {
                        responseType = "confirmation";
                        instruction = "Confirm the step is correct and ask the student what the next step should be.";
                    } else if (mathVerification.error && mathVerification.error.error_type !== "unverified") {
                        responseType = "correction";
                        instruction = `Point out the error: ${mathVerification.error.explanation}. Suggest: ${mathVerification.error.suggested_next_step}. Do not solve it for them.`;
                    } else {
                        // Unverified
                        responseType = "clarification";
                        instruction = "Acknowledge the step but ask the student to explain their reasoning, as the verification engine could not automatically confirm it.";
                    }
                } else {
                    responseType = "clarification";
                    instruction = "Ask the student to clarify their math expression.";
                }
                break;

            case "ask_explanation":
                responseType = "explanation";
                instruction = "Explain the specific concept or step the user is asking about. Do not give the final answer unless explicitly asked.";
                break;

            case "ask_formula":
                targetHintLevel = Math.max(targetHintLevel, 3);
                responseType = "hint";
                instruction = "Provide the formula needed for this problem. Do not substitute the values for the student.";
                break;

            default:
                responseType = "explanation";
                instruction = "Engage conversationally. Determine if the student needs a hint or explanation based on context.";
                break;
        }

        return {
            targetHintLevel,
            responseType,
            instruction
        };
    }

    return {
        determineStrategy,
        setDependencies
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = StrategyEngine;
}
