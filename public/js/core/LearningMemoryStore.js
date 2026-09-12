/**
 * PUMKIN LEARNING MEMORY STORE
 * Manages raw educational signals securely in the browser.
 */

const LearningMemoryStore = (function() {
    const STORAGE_KEY = 'pumkin_learning_memory_v1';
    let _signals = [];

    // Load from LocalStorage
    function load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                _signals = JSON.parse(raw);
            }
        } catch (e) {
            console.error("Failed to load Learning Memory", e);
            _signals = [];
        }
    }

    // Save to LocalStorage
    function save() {
        try {
            // Basic size protection: Keep only last 10,000 signals to avoid 5MB quota hit
            if (_signals.length > 10000) {
                _signals = _signals.slice(-10000);
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(_signals));
        } catch (e) {
            console.error("Storage Quota Exceeded for Learning Memory", e);
        }
    }

    /**
     * Generate pseudo-UUID
     */
    function _uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Adds a structured pedagogical signal
     * @param {Object} params - { skill_id, signal_type, value, confidence, source }
     */
    function addSignal(params) {
        if (!params.skill_id || !params.signal_type || params.value === undefined) {
            console.warn("Invalid memory signal ignored", params);
            return;
        }

        const signal = {
            id: _uuid(),
            skill_id: params.skill_id,
            signal_type: params.signal_type,
            value: params.value,
            confidence: params.confidence ?? 1.0,
            source: params.source || "unknown",
            timestamp: new Date().toISOString()
        };

        _signals.push(signal);
        save();
        return signal;
    }

    /**
     * Gets all signals
     */
    function getSignals() {
        return [..._signals];
    }

    /**
     * PRIVACY CONTROL: Clear all memory data
     */
    function clearData() {
        _signals = [];
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {}
    }

    /**
     * PRIVACY CONTROL: Export data as JSON
     */
    function exportData() {
        return JSON.stringify(_signals, null, 2);
    }

    /**
     * Initialize on load
     */
    load();

    return {
        addSignal,
        getSignals,
        clearData,
        exportData
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = LearningMemoryStore;
}
