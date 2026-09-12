/**
 * PUMKIN MEMORY AGGREGATOR
 * Processes raw signals from LearningMemoryStore into a Long-Term Profile.
 * Implements Time-Decay so older signals hold less weight.
 */

const MemoryAggregator = (function() {
    
    // Configurable decay rate: Default half-life of ~30 days
    // Weight = baseWeight * (DECAY_FACTOR ^ daysOld)
    const DECAY_FACTOR = 0.977; 

    /**
     * Calculates how many days ago a timestamp occurred
     */
    function _getDaysOld(isoString) {
        const past = new Date(isoString).getTime();
        const now = new Date().getTime();
        const diffMs = Math.max(0, now - past);
        return diffMs / (1000 * 60 * 60 * 24);
    }

    /**
     * Compute the current Long-Term Learning Profile
     * @param {Array} rawSignals 
     */
    function computeProfile(rawSignals) {
        const profile = {
            weak_skills: {},
            strong_skills: {},
            recurring_mistakes: {},
            preferred_hint_level: 0
        };

        let totalHintScore = 0;
        let hintCount = 0;

        rawSignals.forEach(signal => {
            const daysOld = _getDaysOld(signal.timestamp);
            const decayWeight = Math.pow(DECAY_FACTOR, daysOld);
            const finalWeight = signal.confidence * decayWeight;

            // Discard completely obsolete data (< 5% weight, approx 130 days)
            if (finalWeight < 0.05) return;

            const skill = signal.skill_id;

            if (signal.signal_type === "error" || signal.signal_type === "struggle") {
                profile.weak_skills[skill] = (profile.weak_skills[skill] || 0) + finalWeight;
                
                // Track specific mistakes
                if (signal.signal_type === "error" && typeof signal.value === 'string') {
                    const mistakeKey = `${skill}::${signal.value}`;
                    profile.recurring_mistakes[mistakeKey] = (profile.recurring_mistakes[mistakeKey] || 0) + finalWeight;
                }
            }

            if (signal.signal_type === "mastery") {
                profile.strong_skills[skill] = (profile.strong_skills[skill] || 0) + finalWeight;
            }

            if (signal.signal_type === "hint_request" && typeof signal.value === 'number') {
                totalHintScore += (signal.value * finalWeight);
                hintCount += finalWeight;
            }
        });

        // Resolve Weak vs Strong conflicts (Net Score)
        Object.keys(profile.strong_skills).forEach(skill => {
            if (profile.weak_skills[skill]) {
                const net = profile.strong_skills[skill] - profile.weak_skills[skill];
                if (net > 0) {
                    profile.strong_skills[skill] = net;
                    delete profile.weak_skills[skill];
                } else {
                    profile.weak_skills[skill] = Math.abs(net);
                    delete profile.strong_skills[skill];
                }
            }
        });

        // Compute preferred hint level
        if (hintCount > 0) {
            profile.preferred_hint_level = Math.round(totalHintScore / hintCount);
        }

        return profile;
    }

    return {
        computeProfile
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MemoryAggregator;
}
