/**
 * Pumkin Knowledge Graph & BKT Sequencer
 * Version: 1.0.0
 * Handles BKT-based mastery updates and Next-Best-Item sequencing.
 */

(function(exports) {
    'use strict';

    class PumkinKnowledgeGraph {
        constructor(config = {}) {
            this.nodes = {}; // skill_id -> node
            this.questionMap = {}; // question_id -> { skills, type, difficulty }
            this.schema_version = "1.0.0";
        }

        load(graphData, questions) {
            this.nodes = graphData.nodes || {};
            this.validateNodes();
            this.detectCycles();

            if (questions) {
                questions.forEach(q => {
                    this.questionMap[q.id] = {
                        id: q.id,
                        skills: q.skills || [],
                        difficulty: q.difficulty || "Medium",
                        cognitive_level: q.cognitive_level || "M2",
                        topic: q.topic || "Unknown",
                        remedial_for: q.remedial_for || null,
                        isomorphic_to: q.isomorphic_to || null
                    };
                    
                    // Validate mapping
                    if (!q.skills || q.skills.length === 0) {
                        console.warn(`[KG Validator] Question ${q.id} has no mapped skills.`);
                    } else {
                        q.skills.forEach(s => {
                            if (!this.nodes[s]) console.warn(`[KG Validator] Question ${q.id} references undefined skill: ${s}`);
                        });
                    }
                });
            }
        }

        validateNodes() {
            Object.keys(this.nodes).forEach(id => {
                const node = this.nodes[id];
                if (node.prerequisites) {
                    node.prerequisites.forEach(pre => {
                        if (!this.nodes[pre]) throw new Error(`[KG Error] Node ${id} has undefined prerequisite: ${pre}`);
                    });
                }
            });
        }

        detectCycles() {
            const visited = new Set();
            const recursionStack = new Set();
            
            const dfs = (nodeId) => {
                if (recursionStack.has(nodeId)) throw new Error(`[KG Error] Prerequisite cycle detected involving node: ${nodeId}`);
                if (visited.has(nodeId)) return false;
                
                visited.add(nodeId);
                recursionStack.add(nodeId);
                
                const node = this.nodes[nodeId];
                if (node && node.prerequisites) {
                    node.prerequisites.forEach(pre => dfs(pre));
                }
                recursionStack.delete(nodeId);
                return false;
            };

            Object.keys(this.nodes).forEach(id => {
                if (!visited.has(id)) dfs(id);
            });
        }

        getAvailableQuestions(completedIds) {
            const completed = new Set(completedIds);
            return Object.values(this.questionMap).filter(q => !completed.has(q.id));
        }
    }

    class BayesianKnowledgeTracing {
        constructor() {
            // Default params
            this.defaultPInit = 0.5;
            this.defaultPTrans = 0.1;
            this.defaultPGuess = 0.2;
            this.defaultPSlip = 0.1;
            this.state = {}; // skill_id -> p(L)
        }

        initSkill(skillId, params = {}) {
            if (this.state[skillId] === undefined) {
                this.state[skillId] = {
                    pL: params.pInit !== undefined ? params.pInit : this.defaultPInit,
                    pT: params.pTrans !== undefined ? params.pTrans : this.defaultPTrans,
                    pG: params.pGuess !== undefined ? params.pGuess : this.defaultPGuess,
                    pS: params.pSlip !== undefined ? params.pSlip : this.defaultPSlip
                };
            }
        }

        update(skillId, isCorrect) {
            this.initSkill(skillId);
            const s = this.state[skillId];
            
            // Validate bounds
            if (s.pG < 0 || s.pG > 1 || s.pS < 0 || s.pS > 1) throw new Error("Invalid BKT bounds for Guess/Slip.");
            
            let pL_given_obs;
            if (isCorrect) {
                const num = s.pL * (1 - s.pS);
                const den = num + (1 - s.pL) * s.pG;
                pL_given_obs = den === 0 ? 0 : (num / den);
            } else {
                const num = s.pL * s.pS;
                const den = num + (1 - s.pL) * (1 - s.pG);
                pL_given_obs = den === 0 ? 0 : (num / den);
            }
            
            // Apply Transition
            s.pL = pL_given_obs + (1 - pL_given_obs) * s.pT;
            
            // Clamp strictly [0, 1]
            s.pL = Math.max(0, Math.min(1, s.pL));
            return s.pL;
        }

        getState() {
            return JSON.parse(JSON.stringify(this.state));
        }

        restoreState(stateObj) {
            this.state = JSON.parse(JSON.stringify(stateObj));
        }
    }

    class KnowledgeGraphSequencer {
        constructor(kg, bkt) {
            this.kg = kg;
            this.bkt = bkt;
        }

        /**
         * Next-Best-Item Algorithm
         * Priority:
         * 1. Trap detected -> isomorphic/remedial
         * 2. High prerequisite risk -> remedial at parent skill
         * 3. High mastery -> M4 transfer item
         * 4. Low evidence -> Diagnostic
         * 5. Fallback -> standard medium/hard avoiding repeat
         */
        getNextItem(cognitiveState, completedIds) {
            const available = this.kg.getAvailableQuestions(completedIds);
            if (available.length === 0) return null;

            // 1. Trap response
            if (cognitiveState.detected_traps && cognitiveState.detected_traps.length > 0) {
                // Find isomorphic question or one that specifically addresses the trap
                // Heuristic: matching topic, slightly easier or similar difficulty
                const trapRemedials = available.filter(q => q.isomorphic_to && completedIds.includes(q.isomorphic_to));
                if (trapRemedials.length > 0) return trapRemedials[0];
            }

            // 2. High prerequisite risk (Approximated if representation gap is huge or rigor is extremely low)
            if (cognitiveState.rigor_score < 0.3 && cognitiveState.evidence_count >= 2) {
                const remedial = available.find(q => q.remedial_for !== null || q.cognitive_level === "M1");
                if (remedial) return remedial;
            }

            // 3. High mastery -> M4 transfer
            if (cognitiveState.mastery_score >= 85) {
                const transfer = available.find(q => q.cognitive_level === "M4" || q.difficulty === "Khó");
                if (transfer) return transfer;
            }

            // 4. Low evidence -> Diagnostic (Broad skills)
            if (cognitiveState.evidence_count < 3) {
                const diagnostic = available.find(q => q.skills && q.skills.length > 1);
                if (diagnostic) return diagnostic;
            }

            // 5. Fallback -> Balance difficulty
            const targetDifficulty = cognitiveState.mastery_score > 60 ? "Medium" : "Easy"; // simplistic fallback
            let fallback = available.find(q => q.difficulty === targetDifficulty);
            if (!fallback) fallback = available[0]; // absolute fallback

            return fallback;
        }
    }

    exports.PumkinKnowledgeGraph = PumkinKnowledgeGraph;
    exports.BayesianKnowledgeTracing = BayesianKnowledgeTracing;
    exports.KnowledgeGraphSequencer = KnowledgeGraphSequencer;

})(typeof module !== 'undefined' && module.exports ? module.exports : (window.PumkinSequencer = {}));
