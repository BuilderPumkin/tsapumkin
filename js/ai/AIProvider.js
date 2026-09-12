/**
 * PUMKIN AI PROVIDER ABSTRACTION
 * Handles the communication with LLMs and ensures responses adhere to the TutorBehaviorSpec.
 */

const AIProvider = (function() {
    
    // Abstract base function
    async function generateResponse(message, strategy, tutorContext, conversationState) {
        throw new Error("generateResponse not implemented. Use a concrete provider.");
    }

    /**
     * Validates if the returned object matches the TutorResponse schema
     */
    function validateResponse(responseObj) {
        if (!responseObj || typeof responseObj !== 'object') return false;
        if (!responseObj.message || typeof responseObj.message !== 'string') return false;
        if (!responseObj.response_type || typeof responseObj.response_type !== 'string') return false;
        if (responseObj.hint_level === undefined || typeof responseObj.hint_level !== 'number') return false;
        if (responseObj.confidence === undefined || typeof responseObj.confidence !== 'number') return false;
        
        const validTypes = ["question", "hint", "correction", "confirmation", "explanation", "solution", "clarification", "refusal"];
        if (!validTypes.includes(responseObj.response_type)) return false;

        return true;
    }

    /**
     * Fallback response if validation fails or model crashes
     */
    function getFallbackResponse(originalStrategy) {
        return {
            message: "Hệ thống đang gặp chút khó khăn khi xử lý yêu cầu. Em có thể diễn đạt lại câu hỏi hoặc bước giải của mình rõ hơn được không?",
            response_type: "clarification",
            hint_level: originalStrategy.targetHintLevel || 0,
            detected_issue: null,
            confidence: 1.0,
            next_action: null,
            references: []
        };
    }

    return {
        generateResponse,
        validateResponse,
        getFallbackResponse
    };
})();

/**
 * Mock Provider for local testing and architectural validation without API keys
 */
const MockAIProvider = Object.create(AIProvider);
MockAIProvider.generateResponse = async function(message, strategy, tutorContext, conversationState) {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 500));

    let msg = "";
    if (strategy.responseType === "hint") {
        msg = `(Mock Hint Level ${strategy.targetHintLevel}): Dựa trên kiến thức ${tutorContext.question.topic}, em thử xem xét lại công thức liên quan nhé.`;
    } else if (strategy.responseType === "refusal") {
        msg = "Hiện tại em đang trong chế độ làm bài thi. Thầy không thể gợi ý quá sâu được.";
    } else if (strategy.responseType === "correction") {
        msg = `(Mock Correction): ${strategy.instruction}`;
    } else {
        msg = `(Mock Response): Thầy đã nhận được câu hỏi "${message}". Em hãy thử áp dụng định lý xem sao.`;
    }

    return {
        message: msg,
        response_type: strategy.responseType,
        hint_level: strategy.targetHintLevel,
        detected_issue: null,
        confidence: 0.95,
        next_action: null,
        references: []
    };
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AIProvider, MockAIProvider };
}
