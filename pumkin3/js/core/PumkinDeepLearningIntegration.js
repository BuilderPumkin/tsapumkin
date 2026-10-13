/**
 * PUMKIN.DEV Deep Learning Integration & Feature Flag System
 * Phase 4: Safe rollout, telemetry control, and dynamic module loading.
 */

window.PUMKIN_DEEP_LEARNING_ENABLED = window.PUMKIN_DEEP_LEARNING_ENABLED || false;

window.PumkinDeepLearningIntegration = (function() {
    let currentConfig = {
        enabled: window.PUMKIN_DEEP_LEARNING_ENABLED,
        rolloutMode: "off", // "off" | "internal" | "beta" | "production"
        allowedUserIds: [],
        allowedCohortIds: [],
        allowedCourseIds: [],
        telemetryEnabled: false,
        debugMode: false,
        version: "1.0.0"
    };

    let _isInitialized = false;
    let _trackerInstance = null;
    let _activeComponent = null;
    let _hudElement = null;
    let _currentSessionId = null;

    const HealthStatus = {
        state: "uninitialized",
        lastError: null,
        fallbackReason: null
    };

    function validateConfig(config) {
        if (!config || typeof config !== 'object') return false;
        return true;
    }

    function isUserAllowed(context = {}) {
        if (currentConfig.rolloutMode === "production") return true;
        if (currentConfig.rolloutMode === "off") return false;
        
        const userId = context.userId || null;
        const cohortId = context.cohortId || null;
        
        if (currentConfig.allowedUserIds && currentConfig.allowedUserIds.includes(userId)) return true;
        if (currentConfig.allowedCohortIds && currentConfig.allowedCohortIds.includes(cohortId)) return true;
        
        if (currentConfig.rolloutMode === "internal" && window.PUMKIN_DEEP_LEARNING_ENABLED) {
            return true;
        }

        return false;
    }

    function isDeepLearningEnabled(context = {}) {
        if (!currentConfig.enabled && !window.PUMKIN_DEEP_LEARNING_ENABLED) return false;
        return isUserAllowed(context);
    }

    async function loadDependency(type, src) {
        return new Promise((resolve, reject) => {
            if (type === 'css') {
                if (document.querySelector(`link[href$="${src}"]`)) return resolve();
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = src;
                link.onload = resolve;
                link.onerror = reject;
                document.head.appendChild(link);
            } else if (type === 'js') {
                if (document.querySelector(`script[src$="${src}"]`)) return resolve();
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            }
        });
    }

    async function bootstrapDeepLearning(context = {}) {
        if (_isInitialized) return true;
        
        if (context.config && validateConfig(context.config)) {
            currentConfig = { ...currentConfig, ...context.config };
        }
        
        // Server-Authoritative Gating check for Closed Beta
        if (context.userId && context.cohortId) {
            try {
                const res = await fetch('/api/beta/context', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: context.userId, cohortId: context.cohortId })
                });
                if (res.ok) {
                    const serverCtx = await res.json();
                    if (!serverCtx.allowed || serverCtx.group !== 'treatment' || serverCtx.killSwitchActive) {
                        HealthStatus.state = "disabled";
                        HealthStatus.fallbackReason = serverCtx.reason || "Server gating denied treatment access";
                        return false;
                    }
                    currentConfig.anonymousParticipantId = serverCtx.anonymousParticipantId;
                    currentConfig.calibrationVersion = serverCtx.calibrationVersion;
                    currentConfig.cohortId = context.cohortId;
                    currentConfig.group = serverCtx.group;
                }
            } catch (e) {
                // Network failure or offline: fail-safe fallback to standard practice
                HealthStatus.state = "disabled";
                HealthStatus.fallbackReason = "Server unreachable, fail-safe activated";
                return false;
            }
        } else if (!isDeepLearningEnabled(context)) {
            HealthStatus.state = "disabled";
            return false;
        }

        try {
            await Promise.all([
                loadDependency('css', './css/deep_learning.css'),
                loadDependency('js', './js/core/types.js'),
                loadDependency('js', './js/core/DynamicCognitiveRouter.js'),
                loadDependency('js', './js/core/PumkinCognitiveTracker.js'),
                loadDependency('js', './js/components/PumkinSocraticScaffold.js'),
                loadDependency('js', './js/components/PumkinInteractiveSandbox.js'),
                loadDependency('js', './js/components/PumkinReverseChallenge.js')
            ]);
            
            if (typeof window.PumkinCognitiveTracker === 'undefined') {
                throw new Error("Tracker failed to load.");
            }

            _currentSessionId = "session_" + Math.random().toString(36).substr(2, 9);

            _trackerInstance = new window.PumkinCognitiveTracker({
                version: currentConfig.version,
                debug: currentConfig.debugMode
            });
            
            if (_trackerInstance.adapter && _trackerInstance.adapter.attach) {
                _trackerInstance.adapter.attach(document.body);
            }

            // Create HUD element if not exists
            if (!document.getElementById('pumkin-cognitive-hud-container')) {
                _hudElement = document.createElement('div');
                _hudElement.id = 'pumkin-cognitive-hud-container';
                _hudElement.className = 'pumkin-deep-learning';
                document.body.appendChild(_hudElement);
            }

            _isInitialized = true;
            HealthStatus.state = "active";
            HealthStatus.lastError = null;
            
            if (currentConfig.debugMode) {
                console.log("[DeepLearning] Bootstrapped successfully.");
            }
            return true;
        } catch (err) {
            safeFallbackToStandardPractice("Initialization Error: " + err.message);
            return false;
        }
    }

    function teardownDeepLearning() {
        if (!_isInitialized) return;
        
        try {
            if (_activeComponent && typeof _activeComponent.destroy === 'function') {
                _activeComponent.destroy();
                _activeComponent = null;
            }
            
            const hud = document.getElementById('pumkin-cognitive-hud-container');
            if (hud) {
                hud.remove();
            }
            _hudElement = null;

            if (_trackerInstance) {
                if (_trackerInstance.adapter && _trackerInstance.adapter.detach) {
                    _trackerInstance.adapter.detach();
                }
                if (typeof _trackerInstance.destroy === 'function') {
                    _trackerInstance.destroy();
                }
                _trackerInstance = null;
            }
            
            _currentSessionId = null;
            _isInitialized = false;
            HealthStatus.state = "uninitialized";
        } catch (err) {
            console.error("[DeepLearning] Teardown error:", err);
        }
    }

    function safeFallbackToStandardPractice(reason) {
        HealthStatus.state = "fallback";
        HealthStatus.fallbackReason = reason;
        HealthStatus.lastError = reason;
        
        teardownDeepLearning();
        
        if (currentConfig.telemetryEnabled) {
            sendTelemetryEvent({
                eventType: "fallback_triggered",
                reason: reason
            });
        }
    }

    function getDeepLearningHealthStatus() {
        return { ...HealthStatus };
    }

    function sendTelemetryEvent(payload) {
        if (!currentConfig.telemetryEnabled || !_isInitialized) return;
        
        const finalPayload = {
            schemaVersion: "1.0",
            experimentId: currentConfig.cohortId || "cognitive-beta-2026",
            cohortId: currentConfig.cohortId || "cognitive-beta-2026-01",
            group: currentConfig.group || "treatment",
            anonymousParticipantId: currentConfig.anonymousParticipantId || ("anon_" + _currentSessionId),
            anonymousSessionId: _currentSessionId,
            timestamp: new Date().toISOString(),
            appVersion: currentConfig.version,
            calibrationVersion: currentConfig.calibrationVersion || "1.0.0",
            ...payload
        };

        try {
            if (window.navigator && window.navigator.sendBeacon) {
                const blob = new Blob([JSON.stringify(finalPayload)], { type: 'application/json' });
                window.navigator.sendBeacon('/api/beta/telemetry', blob);
            } else {
                fetch('/api/beta/telemetry', {
                    method: 'POST',
                    body: JSON.stringify(finalPayload),
                    headers: { 'Content-Type': 'application/json' },
                    keepalive: true
                }).catch(() => {});
            }
        } catch (e) {
            // Ignore telemetry failure
        }
    }

    // A simple mock router logic since we don't have the backend Dynamic Cognitive Router yet
    function mockRouterDecision(cognitiveState) {
        if (window.DynamicCognitiveRouter) {
            if (!this._routerInstance) {
                this._routerInstance = new window.DynamicCognitiveRouter();
            }
            // Map keys (tracker emits camelCase, router expects snake_case for vector)
            const stateVector = {
                confidence: cognitiveState.confidence || 1.0,
                mastery_score: cognitiveState.masteryScore || 0,
                representation_gap: cognitiveState.representationGap || 0,
                rigor: cognitiveState.rigor || 0,
                prerequisite_risk: cognitiveState.prerequisiteRisk || 0,
                detected_traps: cognitiveState.detectedTraps || []
            };
            const metrics = {
                answered_count: 5 // mock metrics for now since we don't track full session metrics here
            };
            const result = this._routerInstance.evaluateRoute(stateVector, metrics);
            return result.strategy;
        }

        const score = cognitiveState.masteryScore;
        if (score < 40) return 'SOCRATIC';
        if (cognitiveState.representationGap > 40) return 'DUAL_CODING';
        if (score > 85) return 'REVERSE';
        return 'STANDARD';
    }

    function updateHUD(state) {
        const hud = document.getElementById('pumkin-cognitive-hud-container');
        if (!hud) return;
        
        if (state.confidence < 0.4) {
            hud.innerHTML = `<div class="pumkin-hud-panel"><div class="hud-title">Đang thu thập dữ liệu...</div></div>`;
            return;
        }

        hud.innerHTML = `
            <div class="pumkin-hud-panel">
                <div class="hud-title">Trạng thái nhận thức</div>
                <div class="hud-stat">
                    <span class="hud-label">Mastery Score</span>
                    <span class="hud-value">${state.masteryScore}</span>
                </div>
                <div class="hud-stat">
                    <span class="hud-label">Rep. Gap</span>
                    <span class="hud-value">${state.representationGap}</span>
                </div>
            </div>
        `;
    }

    function orchestrateUI(container, questionData) {
        if (!_isInitialized || !container || !_trackerInstance) return;

        try {
            if (_activeComponent && typeof _activeComponent.destroy === 'function') {
                _activeComponent.destroy();
                _activeComponent = null;
            }

            // Clear container
            container.innerHTML = '';

            const currentState = _trackerInstance.getCognitiveState();
            updateHUD(currentState);
            
            const strategy = mockRouterDecision(currentState);
            
            sendTelemetryEvent({
                eventType: "router_decision",
                decision: strategy,
                questionId: questionData.id || "unknown"
            });

            switch(strategy) {
                case 'SOCRATIC':
                    if (window.PumkinSocraticScaffold) {
                        _activeComponent = new window.PumkinSocraticScaffold(container, {
                            onEvent: (evt) => sendTelemetryEvent({ eventType: "socratic_event", data: evt })
                        });
                        _activeComponent.mount();
                        _activeComponent.update({ ...questionData, scaffolding: questionData.socratic_hints || [] });
                    }
                    break;
                case 'DUAL_CODING':
                    if (window.PumkinInteractiveSandbox) {
                        _activeComponent = new window.PumkinInteractiveSandbox(container, {
                            onEvent: (evt) => sendTelemetryEvent({ eventType: "sandbox_event", data: evt })
                        });
                        _activeComponent.mount();
                        _activeComponent.update({ ...questionData, sandboxConfig: { functionType: 'exponential' } }); // Mock config
                    }
                    break;
                case 'REVERSE':
                    if (window.PumkinReverseChallenge) {
                        _activeComponent = new window.PumkinReverseChallenge(container, {
                            onComplete: (res) => sendTelemetryEvent({ eventType: "reverse_challenge_submitted", data: res }),
                            onEvent: (evt) => sendTelemetryEvent({ eventType: "reverse_challenge_event", data: evt })
                        });
                        _activeComponent.mount();
                        _activeComponent.update(questionData);
                    }
                    break;
                default:
                    // STANDARD PRACTICE - DO NOTHING
                    break;
            }
        } catch (e) {
            safeFallbackToStandardPractice("UI Orchestration Error: " + e.message);
        }
    }

    return {
        isDeepLearningEnabled,
        bootstrapDeepLearning,
        teardownDeepLearning,
        safeFallbackToStandardPractice,
        getDeepLearningHealthStatus,
        orchestrateUI,
        sendTelemetryEvent,
        getConfig: () => ({ ...currentConfig }),
        getTracker: () => _trackerInstance
    };
})();

(function attachDeepLearningHooks() {
    setTimeout(() => {
        if (typeof PumkinPlayer !== 'undefined' && typeof PumkinRouter !== 'undefined') {
            const originalStartExam = PumkinPlayer.startExam;
            PumkinPlayer.startExam = function() {
                window.PumkinDeepLearningIntegration.bootstrapDeepLearning({
                    userId: (typeof PumkinAuth !== 'undefined' && PumkinAuth.getCurrentUserId) ? PumkinAuth.getCurrentUserId() : null,
                    config: { rolloutMode: 'beta', telemetryEnabled: true }
                });
                return originalStartExam.apply(this, arguments);
            };

            const originalRenderQuestion = PumkinPlayer.renderQuestion;
            PumkinPlayer.renderQuestion = function(index) {
                const ret = originalRenderQuestion.apply(this, arguments);
                const status = window.PumkinDeepLearningIntegration.getDeepLearningHealthStatus();
                if (status.state === 'active') {
                    const questionData = this.questions[index];
                    let dlContainer = document.getElementById('deep-learning-module-container');
                    if (!dlContainer) {
                        dlContainer = document.createElement('div');
                        dlContainer.id = 'deep-learning-module-container';
                        dlContainer.style.marginTop = '20px';
                        const optionsContainer = document.getElementById('player-options-container');
                        if (optionsContainer) {
                            optionsContainer.parentNode.insertBefore(dlContainer, optionsContainer.nextSibling);
                        }
                    }
                    window.PumkinDeepLearningIntegration.orchestrateUI(dlContainer, questionData);
                }
                return ret;
            };

            const originalNavigate = PumkinRouter.navigate;
            PumkinRouter.navigate = function(viewId) {
                if (viewId !== 'exam-player') {
                    window.PumkinDeepLearningIntegration.teardownDeepLearning();
                }
                return originalNavigate.apply(this, arguments);
            };
            console.log('[DeepLearning] Hooks attached.');
        }
    }, 1000);
})();