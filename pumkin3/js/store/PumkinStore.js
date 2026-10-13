/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.Store
 * Layer: State Management & Store
 * Description: Unified Reactive State Store with schema versioning, try/catch persistence, and pub/sub
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

    const SCHEMA_VERSION = "3.1.0";
    const STORE_STORAGE_KEY_PREFIX = "pumkin_store_state_v3_";

    /**
     * Internal state container
     */
    let _state = {
        _schemaVersion: SCHEMA_VERSION,
        theme: "light",
        route: "guide",
        user: null,
        activeSession: null,
        bookmarks: [],
        history: [],
        learningTrace: [],
        skillProfile: null,
        journey: {
            state: "NEW",
            diagnosticCompletedAt: null,
            diagnosticResult: null,
            dailyFocus: null,
            completedDates: []
        }
    };

    /**
     * Subscribers map: key -> Set of callbacks; '*' -> Set of global callbacks
     */
    const _subscribers = new Map();
    _subscribers.set('*', new Set());

    function _getStorageKey() {
        const uid = (typeof window.PumkinAuth !== "undefined" && window.PumkinAuth.getCurrentUserId && window.PumkinAuth.getCurrentUserId())
            ? 'user_' + window.PumkinAuth.getCurrentUserId()
            : "guest";
        return STORE_STORAGE_KEY_PREFIX + uid;
    }

    /**
     * Safe localStorage read with error boundary
     */
    function _safeReadStorage(key) {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) return null;
            return JSON.parse(raw);
        } catch (err) {
            console.warn('[PumkinStore] Error reading localStorage key:', key, err);
            return null;
        }
    }

    /**
     * Safe localStorage write with quota boundary
     */
    function _safeWriteStorage(key, val) {
        try {
            localStorage.setItem(key, JSON.stringify(val));
        } catch (err) {
            console.warn('[PumkinStore] Error writing localStorage key:', key, err);
        }
    }

    const PumkinStore = {
        SCHEMA_VERSION,

        /**
         * Initialize store state, hydrating from storage and existing module partitions
         */
        init() {
            try {
                // 1. Theme
                const savedTheme = localStorage.getItem("pumkin_theme_v3");
                if (savedTheme) _state.theme = savedTheme;

                // 2. User info from Auth
                if (typeof window.PumkinAuth !== "undefined" && window.PumkinAuth.getCurrentUser) {
                    _state.user = window.PumkinAuth.getCurrentUser();
                }

                // 3. Storage partitions (bookmarks, history, active_session)
                if (typeof window.PumkinStorage !== "undefined") {
                    _state.bookmarks = window.PumkinStorage.getBookmarks() || [];
                    _state.history = window.PumkinStorage.getHistory() || [];
                    _state.activeSession = window.PumkinStorage.getActiveSession() || null;
                }

                // 4. Learning trace
                if (typeof window.PumkinLearningTrace !== "undefined") {
                    _state.learningTrace = window.PumkinLearningTrace.getTrace() || [];
                }

                // 5. Skill profile
                if (typeof window.PumkinSkillProfile !== "undefined") {
                    _state.skillProfile = window.PumkinSkillProfile.computeProfile();
                }

                // 6. Check for legacy snapshot first so _state.history & bookmarks are hydrated
                const snapshotKey = _getStorageKey();
                const snapshot = _safeReadStorage(snapshotKey);
                if (snapshot) {
                    this._migrateSchema(snapshot);
                }

                // 7. Journey slice & Migration
                const journeyRaw = _safeReadStorage("pumkin_journey_state_v1");
                let journeyData = (_state.journey && _state.journey.state) ? _state.journey : (journeyRaw || {
                    state: "NEW",
                    diagnosticCompletedAt: null,
                    diagnosticResult: null,
                    dailyFocus: null,
                    completedDates: []
                });

                // Migration: Existing active users with history or learning trace are NEVER pushed back to NEW!
                const hasPriorHistory = (_state.history && _state.history.length > 0) || (_state.learningTrace && _state.learningTrace.length >= 3);
                if (journeyData.state === "NEW" && hasPriorHistory) {
                    const todayStr = new Date().toISOString().slice(0, 10);
                    const completedToday = Array.isArray(journeyData.completedDates) && journeyData.completedDates.includes(todayStr);
                    journeyData.state = completedToday ? "FREE_EXPLORE" : "DAILY_FOCUS";
                    journeyData.diagnosticCompletedAt = journeyData.diagnosticCompletedAt || "migrated_from_history";
                    journeyData.isMigratedUser = true;
                    journeyData.migrated = true;
                }
                _state.journey = journeyData;

                this.persist();
            } catch (err) {
                console.warn('[PumkinStore] init fallback gracefully handled:', err);
            }
            return this;
        },

        /**
         * Backward-compatible schema migration
         */
        _migrateSchema(snapshot) {
            if (!snapshot) return;
            const currentVer = snapshot._schemaVersion || "1.0.0";
            if (currentVer !== SCHEMA_VERSION) {
                console.info(`[PumkinStore] Migrating state schema from ${currentVer} to ${SCHEMA_VERSION}`);
            }
            // Safely merge preserved keys without overwriting active data
            if (snapshot.bookmarks && Array.isArray(snapshot.bookmarks) && _state.bookmarks.length === 0) {
                _state.bookmarks = snapshot.bookmarks;
            }
            if (snapshot.history && Array.isArray(snapshot.history) && _state.history.length === 0) {
                _state.history = snapshot.history;
            }
            if (snapshot.journey && typeof snapshot.journey === 'object') {
                _state.journey = Object.assign({}, _state.journey, snapshot.journey);
            }
            _state._schemaVersion = SCHEMA_VERSION;
        },

        /**
         * Persist current state snapshot to storage
         */
        persist() {
            try {
                const snapshotKey = _getStorageKey();
                const snapshot = {
                    _schemaVersion: SCHEMA_VERSION,
                    updatedAt: new Date().toISOString(),
                    theme: _state.theme,
                    route: _state.route,
                    bookmarks: _state.bookmarks,
                    activeSession: _state.activeSession,
                    journey: _state.journey
                };
                _safeWriteStorage(snapshotKey, snapshot);
                _safeWriteStorage("pumkin_journey_state_v1", _state.journey);
            } catch (err) {
                console.warn('[PumkinStore] persist error:', err);
            }
        },

        /**
         * Get journey state slice
         */
        getJourney() {
            return Object.assign({}, _state.journey);
        },

        /**
         * Update journey state slice
         */
        setJourney(updates) {
            if (!updates || typeof updates !== 'object') return;
            const updated = Object.assign({}, _state.journey, updates);
            this.setState({ journey: updated });
            _safeWriteStorage("pumkin_journey_state_v1", updated);
            return updated;
        },

        /**
         * Get full state or specific slice
         * @param {string} [slice] e.g. 'bookmarks', 'history', 'user', 'theme'
         */
        getState(slice) {
            if (!slice) {
                return Object.assign({}, _state);
            }
            return _state[slice];
        },

        /**
         * Set state with partial updates and notify subscribers
         * @param {Object} updates Key-value updates
         * @param {Object} [options] { persist?: boolean, silent?: boolean }
         */
        setState(updates, options = {}) {
            if (!updates || typeof updates !== 'object') return;

            const changedKeys = [];
            for (const key of Object.keys(updates)) {
                if (_state[key] !== updates[key]) {
                    _state[key] = updates[key];
                    changedKeys.push(key);
                }
            }

            if (changedKeys.length === 0) return;

            if (options.persist !== false) {
                this.persist();
            }

            if (!options.silent) {
                this._notify(changedKeys);
            }
        },

        /**
         * Set a single key directly
         */
        set(key, value, options) {
            this.setState({ [key]: value }, options);
        },

        /**
         * Subscribe to state changes
         * @param {string|Function} sliceOrListener Slice key or callback
         * @param {Function} [maybeListener] Callback if slice key was provided
         * @returns {Function} Unsubscribe function
         */
        subscribe(sliceOrListener, maybeListener) {
            let key = '*';
            let listener = sliceOrListener;

            if (typeof sliceOrListener === 'string' && typeof maybeListener === 'function') {
                key = sliceOrListener;
                listener = maybeListener;
            }

            if (typeof listener !== 'function') {
                return () => {};
            }

            if (!_subscribers.has(key)) {
                _subscribers.set(key, new Set());
            }

            _subscribers.get(key).add(listener);

            return () => {
                if (_subscribers.has(key)) {
                    _subscribers.get(key).delete(listener);
                }
            };
        },

        /**
         * Internal notification dispatch
         */
        _notify(changedKeys) {
            // Notify global subscribers
            const globals = _subscribers.get('*');
            if (globals && globals.size > 0) {
                globals.forEach(fn => {
                    try {
                        fn(_state, changedKeys);
                    } catch (err) {
                        console.error('[PumkinStore] Subscriber error:', err);
                    }
                });
            }

            // Notify slice subscribers
            changedKeys.forEach(k => {
                const listeners = _subscribers.get(k);
                if (listeners && listeners.size > 0) {
                    listeners.forEach(fn => {
                        try {
                            fn(_state[k], _state);
                        } catch (err) {
                            console.error(`[PumkinStore] Slice subscriber error for "${k}":`, err);
                        }
                    });
                }
            });
        }
    };

    // Primary Namespace
    window.Pumkin.Store = PumkinStore;

    // // DEPRECATED: Backward compatibility shim
    window.PumkinStore = PumkinStore;
})(window);
