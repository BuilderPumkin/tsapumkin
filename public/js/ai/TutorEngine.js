/**
 * PUMKIN TUTOR ENGINE
 * Orchestrates the AI Socratic Pipeline:
 * Message -> Intent -> Math Verification -> Strategy -> Provider -> State Update
 */

const PumkinTutorEngine = (function() {
    
    // Dependencies
    let _classifier = (typeof IntentClassifier !== 'undefined') ? IntentClassifier : null;
    let _strategy = (typeof StrategyEngine !== 'undefined') ? StrategyEngine : null;
    let _state = (typeof ConversationState !== 'undefined') ? ConversationState : null;
    let _mathVerifier = (typeof MathematicalVerifier !== 'undefined') ? MathematicalVerifier : null;
    let _provider = (typeof MockAIProvider !== 'undefined') ? MockAIProvider : null;
    let _guardrails = (typeof PumkinGuardrails !== 'undefined' && PumkinGuardrails.SocraticGuardrails) ? new PumkinGuardrails.SocraticGuardrails() : null;

    function setDependencies(deps) {
        if (deps.classifier) _classifier = deps.classifier;
        if (deps.strategy) _strategy = deps.strategy;
        if (deps.state) _state = deps.state;
        if (deps.mathVerifier) _mathVerifier = deps.mathVerifier;
        if (deps.provider) _provider = deps.provider;
        if (deps.guardrails) _guardrails = deps.guardrails;
    }

    /**
     * Handle incoming student message
     * @param {string} message 
     * @param {Object} tutorContext - Generated from TutorContextBuilder
     */
    async function handleMessage(message, tutorContext) {
        if (!_provider) throw new Error("TutorEngine: AI Provider not configured.");
        if (!_guardrails && typeof require === 'function') {
            const { SocraticGuardrails } = require('./TutorGuardrails.js');
            _guardrails = new SocraticGuardrails();
        }

        // --- PHASE 3: GUARDRAILS INPUT CHECK ---
        if (_guardrails) {
            const inputCheck = _guardrails.checkStudentInput(message);
            if (inputCheck.blocked) {
                return {
                    response_type: "refusal",
                    hint_level: 1,
                    message: inputCheck.fallbackMessage
                };
            }
            
            // Validate context integrity
            const serverState = { active_scaffold_tier: tutorContext.active_scaffold_tier || 1 };
            tutorContext = _guardrails.verifyContextIntegrity(serverState, tutorContext);
        }

        const sessionId = tutorContext.session ? tutorContext.session.session_id : "sess_default";
        const questionId = tutorContext.question ? tutorContext.question.id : "q_default";

        // Load short-term state
        const conversationState = _state.getOrCreateState(sessionId, questionId);
        _state.addMessage(sessionId, questionId, "user", message);

        // 1. Intent Detection
        const intent = _classifier.detect(message);

        // 2. Context Analysis & Math Verification
        let mathVerification = null;
        if ((intent === _classifier.INTENTS.SUBMIT_STEP || intent === _classifier.INTENTS.ASK_CHECK) && _mathVerifier) {
            // Very naive extraction: assuming message contains the exact expression.
            // In a real scenario, an LLM would extract the expression first.
            // For now, we simulate checking against the correct_value or prev step.
            if (tutorContext.question && tutorContext.question.correct_value) {
                mathVerification = _mathVerifier.verifyArithmetic(message, parseFloat(tutorContext.question.correct_value));
                if (mathVerification.error && mathVerification.error.error_type === "parse_error") {
                    // Fallback to equation step stub
                    mathVerification = _mathVerifier.verifyEquationStep(conversationState.lastStep || "start", message);
                }
            }
        }

        // 3. Response Strategy
        const strategy = _strategy.determineStrategy(intent, mathVerification, tutorContext, conversationState);

        // 4. Tutor Response (Call Provider)
        let responsePayload = null;
        try {
            responsePayload = await _provider.generateResponse(message, strategy, tutorContext, conversationState);
            
            // 5. Error Recovery & Validation
            if (!_provider.validateResponse(responsePayload)) {
                console.warn("TutorEngine: Provider returned malformed output. Triggering fallback.");
                responsePayload = _provider.getFallbackResponse(strategy);
            }

            // --- PHASE 3: GUARDRAILS OUTPUT CHECK ---
            if (_guardrails) {
                const outputCheck = _guardrails.checkTutorResponse(
                    responsePayload.message, 
                    tutorContext.question, 
                    tutorContext.active_scaffold_tier || 1
                );
                if (outputCheck.blocked) {
                    responsePayload.message = outputCheck.fallbackMessage;
                    responsePayload.response_type = "refusal";
                }
            }
        } catch (e) {
            console.error("TutorEngine: Provider threw error:", e);
            responsePayload = _provider.getFallbackResponse(strategy);
        }

        // 6. State Update
        _state.addMessage(sessionId, questionId, "tutor", responsePayload.message);
        _state.setHintLevel(sessionId, questionId, responsePayload.hint_level);
        
        // Update last step if a valid math step was submitted
        if (mathVerification && mathVerification.valid) {
            _state.setLastStep(sessionId, questionId, message);
        }

        return responsePayload;
    }

    return {
        handleMessage,
        setDependencies
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PumkinTutorEngine;
}
