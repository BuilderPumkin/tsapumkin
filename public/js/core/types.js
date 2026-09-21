/**
 * PUMKIN DYNAMIC COGNITIVE ROUTER - DOMAIN MODELS & SCHEMA VALIDATION
 * Pure JavaScript, zero-dependencies, cross-runtime (Node.js & Browser).
 */

(function(exports) {
    'use strict';

    // Canonical Event Types
    const EventTypes = Object.freeze({
        QUESTION_OPENED: 'question_opened',
        ANSWER_SELECTED: 'answer_selected',
        ANSWER_CHANGED: 'answer_changed',
        ANSWER_SUBMITTED: 'answer_submitted',
        HINT_REQUESTED: 'hint_requested',
        SANDBOX_OPENED: 'sandbox_opened',
        SANDBOX_PARAMETER_CHANGED: 'sandbox_parameter_changed',
        SOCRATIC_STEP_VIEWED: 'socratic_step_viewed',
        REVERSE_TASK_STARTED: 'reverse_task_started',
        REVERSE_TASK_SUBMITTED: 'reverse_task_submitted'
    });

    // Representation Types
    const RepresentationTypes = Object.freeze({
        SYMBOLIC: 'symbolic',
        VISUAL_GRAPH: 'visual_graph',
        TABULAR: 'tabular',
        CONTEXTUAL: 'contextual'
    });

    // Pedagogical Strategies
    const Strategies = Object.freeze({
        SOCRATIC: 'SOCRATIC',       // PA1: Socratic Scaffolding (4-tier ladder)
        DUAL_CODING: 'DUAL_CODING', // PA2: Dual-coding + Interactive Sandbox
        REVERSE: 'REVERSE',         // PA3: Reverse Engineering / Problem Posing
        DIAGNOSTIC: 'DIAGNOSTIC',   // Baseline diagnostic (under 3 questions)
        PRACTICE: 'PRACTICE'        // Standard practice flow
    });

    // Known Misconception Trap Codes
    const MisconceptionTrapCodes = Object.freeze({
        TRAP_LOG_DOMAIN_IGNORED: 'TRAP_LOG_DOMAIN_IGNORED',
        TRAP_INEQUALITY_SIGN_NOT_FLIPPED: 'TRAP_INEQUALITY_SIGN_NOT_FLIPPED',
        TRAP_BASE_ONE_IGNORED: 'TRAP_BASE_ONE_IGNORED',
        TRAP_RADICAL_DOMAIN_IGNORED: 'TRAP_RADICAL_DOMAIN_IGNORED',
        TRAP_ONE_WAY_IMPLICATION: 'TRAP_ONE_WAY_IMPLICATION'
    });

    /**
     * Validates a raw Telemetry Event
     * @param {Object} ev 
     * @returns {{ valid: boolean, errors: string[] }}
     */
    function validateTelemetryEvent(ev) {
        const errors = [];
        if (!ev || typeof ev !== 'object') {
            return { valid: false, errors: ['Event payload must be a non-null object'] };
        }
        if (!ev.event_id || typeof ev.event_id !== 'string') {
            errors.push('Missing or invalid event_id (string expected)');
        }
        if (!ev.session_id || typeof ev.session_id !== 'string') {
            errors.push('Missing or invalid session_id (string expected)');
        }
        if (!ev.student_id || typeof ev.student_id !== 'string') {
            errors.push('Missing or invalid student_id (string expected)');
        }
        if (!ev.timestamp || typeof ev.timestamp !== 'string' || isNaN(Date.parse(ev.timestamp))) {
            errors.push('Missing or invalid ISO-8601 timestamp');
        }
        if (!ev.event_type || !Object.values(EventTypes).includes(ev.event_type)) {
            errors.push(`Invalid event_type: ${ev.event_type}`);
        }
        return { valid: errors.length === 0, errors };
    }

    /**
     * Validates a Seed Question Definition (PUMKIN V2 Schema)
     * @param {Object} q 
     * @returns {{ valid: boolean, errors: string[] }}
     */
    function validateQuestion(q) {
        const errors = [];
        if (!q || typeof q !== 'object') {
            return { valid: false, errors: ['Question must be a non-null object'] };
        }
        if (!q.id || typeof q.id !== 'string') errors.push('Missing question id');
        if (!q.topic || typeof q.topic !== 'string') errors.push('Missing topic');
        if (q.schema_version && typeof q.schema_version !== 'string') errors.push('schema_version must be a string');
        if (!q.question || typeof q.question !== 'string') errors.push('Missing question text');
        if (!Array.isArray(q.options) || q.options.length < 2) {
            errors.push('Question must have at least 2 options');
        }
        if (typeof q.correct_answer !== 'number' || q.correct_answer < 0 || q.correct_answer >= (q.options ? q.options.length : 0)) {
            errors.push('Invalid correct_answer index');
        }
        if (typeof q.estimated_time_seconds !== 'number' || q.estimated_time_seconds <= 0) {
            errors.push('estimated_time_seconds must be a positive integer');
        }
        if (q.prerequisites && !Array.isArray(q.prerequisites)) {
            errors.push('prerequisites must be an array');
        }
        if (q.socratic_hints && !Array.isArray(q.socratic_hints)) {
            errors.push('socratic_hints must be an array');
        }
        if (q.misconception_traps && typeof q.misconception_traps !== 'object') {
            errors.push('misconception_traps must be an object');
        }
        return { valid: errors.length === 0, errors };
    }

    /**
     * Validates a Cognitive State Object
     * @param {Object} csv 
     * @returns {{ valid: boolean, errors: string[] }}
     */
    function validateCognitiveState(csv) {
        const errors = [];
        if (!csv || typeof csv !== 'object') {
            return { valid: false, errors: ['CognitiveState must be an object'] };
        }
        
        if (csv.schema_version !== "1.0") errors.push('schema_version must be "1.0"');
        if (typeof csv.session_id !== 'string') errors.push('session_id must be a string');
        if (typeof csv.question_id !== 'string') errors.push('question_id must be a string');
        if (typeof csv.skill_states !== 'object') errors.push('skill_states must be an object');
        
        const numBounds = [
            ['mastery_score', 0, 100],
            ['representation_gap', 0, 100],
            ['rigor_score', 0, 1],
            ['focus_deliberation_index', 0, 1],
            ['hesitation_seconds', 0, Infinity],
            ['answer_changes', 0, Infinity],
            ['evidence_count', 0, Infinity]
        ];
        numBounds.forEach(([field, min, max]) => {
            const v = csv[field];
            if (typeof v !== 'number' || isNaN(v) || v < min - 1e-6 || v > max + 1e-6) {
                errors.push(`${field} must be a number in [${min}, ${max}], got: ${v}`);
            }
        });
        
        if (!Array.isArray(csv.detected_traps)) {
            errors.push('detected_traps must be an array of strings');
        }
        
        if (!Object.values(Strategies).includes(csv.current_cognitive_strategy)) {
            errors.push(`Invalid current_cognitive_strategy: ${csv.current_cognitive_strategy}`);
        }
        
        if (typeof csv.active_scaffold_tier !== 'number' || csv.active_scaffold_tier < 0 || csv.active_scaffold_tier > 4) {
            errors.push('active_scaffold_tier must be an integer between 0 and 4');
        }
        
        if (typeof csv.updated_at !== 'string' || isNaN(Date.parse(csv.updated_at))) {
            errors.push('updated_at must be a valid ISO-8601 string');
        }

        return { valid: errors.length === 0, errors };
    }

    /**
     * Validates an Internal Cognitive State Vector Object (Engine Math)
     * @param {Object} csv 
     * @returns {{ valid: boolean, errors: string[] }}
     */
    function validateCognitiveStateVector(csv) {
        const errors = [];
        if (!csv || typeof csv !== 'object') {
            return { valid: false, errors: ['CognitiveStateVector must be an object'] };
        }
        const numBounds = [
            ['rigor', 0, 1],
            ['intuition', 0, 1],
            ['flexibility', 0, 1],
            ['mastery_score', 0, 100],
            ['representation_gap', 0, 100],
            ['prerequisite_risk', 0, 1],
            ['confidence', 0, 1]
        ];
        numBounds.forEach(([field, min, max]) => {
            const v = csv[field];
            if (typeof v !== 'number' || isNaN(v) || v < min - 1e-6 || v > max + 1e-6) {
                errors.push(`${field} must be a number in [${min}, ${max}], got: ${v}`);
            }
        });
        if (!Array.isArray(csv.detected_traps)) {
            errors.push('detected_traps must be an array of strings');
        }
        return { valid: errors.length === 0, errors };
    }

    exports.EventTypes = EventTypes;
    exports.RepresentationTypes = RepresentationTypes;
    exports.Strategies = Strategies;
    exports.MisconceptionTrapCodes = MisconceptionTrapCodes;
    exports.validateTelemetryEvent = validateTelemetryEvent;
    exports.validateQuestion = validateQuestion;
    exports.validateCognitiveState = validateCognitiveState;
    exports.validateCognitiveStateVector = validateCognitiveStateVector;

})(typeof module !== 'undefined' && module.exports ? module.exports : (window.PumkinModels = {}));
