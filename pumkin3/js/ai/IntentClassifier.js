/**
 * PUMKIN INTENT CLASSIFIER
 * Abstraction for detecting student intents.
 * Currently uses regex/heuristics, but designed to be replaced by a fast LLM call.
 */

const IntentClassifier = (function() {
    
    const INTENTS = {
        ASK_HINT: "ask_hint",
        ASK_EXPLANATION: "ask_explanation",
        SUBMIT_STEP: "submit_step",
        ASK_SOLUTION: "ask_solution",
        ASK_FORMULA: "ask_formula",
        ASK_CONCEPT: "ask_concept",
        ASK_EXAMPLE: "ask_example",
        ASK_CHECK: "ask_check",
        ASK_WHERE_WRONG: "ask_where_wrong",
        ASK_FOR_REVIEW: "ask_for_review",
        UNKNOWN: "unknown"
    };

    /**
     * Detects intent from user message
     * @param {string} message 
     * @returns {string} Intent constant
     */
    function detect(message) {
        const msg = message.toLowerCase();

        if (msg.includes("làm sao") || msg.includes("không biết") || msg.includes("gợi ý") || msg.includes("hint")) {
            return INTENTS.ASK_HINT;
        }
        if (msg.includes("giải full") || msg.includes("lời giải") || msg.includes("cách giải") || msg.includes("đáp án")) {
            return INTENTS.ASK_SOLUTION;
        }
        if (msg.includes("công thức") || msg.includes("lý thuyết")) {
            return INTENTS.ASK_FORMULA;
        }
        if (msg.includes("tại sao") || msg.includes("vì sao") || msg.includes("giải thích")) {
            return INTENTS.ASK_EXPLANATION;
        }
        if (msg.includes("sai ở đâu") || msg.includes("kiểm tra") || msg.includes("đúng chưa")) {
            if (msg.includes("sai")) return INTENTS.ASK_WHERE_WRONG;
            return INTENTS.ASK_CHECK;
        }
        
        // Very basic heuristic for submitting a math step: contains operators or equals sign
        if (/[=+\-*/^]/.test(msg) || /[0-9]/.test(msg)) {
            return INTENTS.SUBMIT_STEP;
        }

        return INTENTS.UNKNOWN;
    }

    return {
        INTENTS,
        detect
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = IntentClassifier;
}
