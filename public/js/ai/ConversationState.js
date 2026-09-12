/**
 * PUMKIN CONVERSATION STATE
 * Manages Short-Term Memory for the Tutor Engine.
 */

const ConversationState = (function() {
    
    // In-memory store (could be persisted to sessionStorage later)
    let _states = {};

    function getOrCreateState(sessionId, questionId) {
        const key = `${sessionId}_${questionId}`;
        if (!_states[key]) {
            _states[key] = {
                history: [],       // Array of { role: 'user'|'tutor', content: string }
                hintLevel: 0,      // 0 to 6
                lastStep: null     // Last math step submitted
            };
        }
        return _states[key];
    }

    function addMessage(sessionId, questionId, role, content) {
        const state = getOrCreateState(sessionId, questionId);
        state.history.push({ role, content });
        
        // Keep only last 10 messages to prevent context window bloat
        if (state.history.length > 10) {
            state.history = state.history.slice(state.history.length - 10);
        }
    }

    function setHintLevel(sessionId, questionId, level) {
        const state = getOrCreateState(sessionId, questionId);
        // Ensure hint level is between 0 and 6
        state.hintLevel = Math.max(0, Math.min(6, level));
    }

    function setLastStep(sessionId, questionId, stepStr) {
        const state = getOrCreateState(sessionId, questionId);
        state.lastStep = stepStr;
    }

    function resetState(sessionId, questionId) {
        const key = `${sessionId}_${questionId}`;
        delete _states[key];
    }

    return {
        getOrCreateState,
        addMessage,
        setHintLevel,
        setLastStep,
        resetState
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ConversationState;
}
