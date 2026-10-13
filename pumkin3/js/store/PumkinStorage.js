/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.Storage
 * Layer: Storage & State Persistence
 * Description: Client-side Storage Manager with Schema Versioning & Data Repository Fallbacks
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

const PumkinStorage = {
    CURRENT_VERSION: "3.0.0",
    _questionsCache: null,
    _examsCache: null,
    _knowledgeCache: null,
    _knowledgeMap: new Map(),
    _questionsMap: new Map(),
    _examsMap: new Map(),

    safeSetItem(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                console.warn('[PumkinStorage] Quota exceeded. Evicting old history...');
                try {
                    const histKey = this.getPartitionKey('history');
                    let hist = JSON.parse(localStorage.getItem(histKey)) || [];
                    if (hist.length > 50) {
                        hist = hist.slice(0, Math.floor(hist.length / 2));
                        localStorage.setItem(histKey, JSON.stringify(hist));
                        this._historyCache = hist;
                        localStorage.setItem(key, value);
                    }
                } catch (retryErr) {
                    console.warn('[PumkinStorage] Could not recover from quota error', retryErr);
                }
            }
        }
    },

    getPartitionKey(baseKey) {
        const uid = (typeof PumkinAuth !== "undefined" && PumkinAuth.getCurrentUserId()) ? 'user_' + PumkinAuth.getCurrentUserId() : "guest";
        return 'pumkin_' + baseKey + '_v3_' + uid;
    },

    async init() {
        // 1. Immediately load fallback data so memory is NEVER empty
        if (typeof window !== 'undefined' && window.PUMKIN_FALLBACK_DATA) {
            this._questionsCache = window.PUMKIN_FALLBACK_DATA.questions || [];
            this._examsCache = window.PUMKIN_FALLBACK_DATA.exams || [];
            this._knowledgeCache = window.PUMKIN_FALLBACK_DATA.knowledge || [];
        } else {
            this._questionsCache = (typeof PUMKIN_DEFAULT_QUESTIONS !== 'undefined') ? PUMKIN_DEFAULT_QUESTIONS : [];
            this._examsCache = (typeof PUMKIN_DEFAULT_EXAMS !== 'undefined') ? PUMKIN_DEFAULT_EXAMS : [];
            this._knowledgeCache = (typeof PUMKIN_DEFAULT_KNOWLEDGE !== 'undefined') ? PUMKIN_DEFAULT_KNOWLEDGE : [];
        }

        // 2. Fetch latest data via DataRepository if available
        try {
            if (typeof window !== 'undefined' && window.DataRepository) {
                const data = await window.DataRepository.loadAllData();
                if (data && data.questions && data.questions.length > 0) this._questionsCache = data.questions;
                if (data && data.exams && data.exams.length > 0) this._examsCache = data.exams;
                if (data && data.knowledge && data.knowledge.length > 0) this._knowledgeCache = data.knowledge;
            }
        } catch(e) {
            console.warn("[PumkinStorage] Repository fetch failed, retaining robust fallback data", e);
        }

        // 3. Fallback check: never allow empty caches
        if (!this._questionsCache || this._questionsCache.length === 0) {
            this._questionsCache = (typeof PUMKIN_DEFAULT_QUESTIONS !== 'undefined') ? PUMKIN_DEFAULT_QUESTIONS : [];
        }
        if (!this._examsCache || this._examsCache.length === 0) {
            this._examsCache = (typeof PUMKIN_DEFAULT_EXAMS !== 'undefined') ? PUMKIN_DEFAULT_EXAMS : [];
        }
        if (!this._knowledgeCache || this._knowledgeCache.length === 0) {
            this._knowledgeCache = (typeof PUMKIN_DEFAULT_KNOWLEDGE !== 'undefined') ? PUMKIN_DEFAULT_KNOWLEDGE : [];
        }

        try {
            localStorage.setItem("pumkin_questions_v3", JSON.stringify(this._questionsCache));
            localStorage.setItem("pumkin_exams_v3", JSON.stringify(this._examsCache));
            localStorage.setItem("pumkin_data_ver", this.CURRENT_VERSION);
        } catch(e) {}

        this._rebuildMaps();
    },

    _rebuildMaps() {
        this._knowledgeMap.clear();
        (this.getKnowledgeBase() || []).forEach(a => { if (a && a.id) this._knowledgeMap.set(a.id, a); });
        this._questionsMap.clear();
        (this.getQuestions() || []).forEach(q => {
            if (q && q.id) {
                const text = q.question_text || q.question || q.content || "";
                q.question_text = text;
                q.question = text;
                this._questionsMap.set(q.id, q);
            }
        });
        this._examsMap.clear();
        (this.getExams() || []).forEach(e => { if (e && e.id) this._examsMap.set(e.id, e); });
    },

    getQuestions() {
        if (this._questionsCache && Array.isArray(this._questionsCache) && this._questionsCache.length > 0) {
            return this._questionsCache;
        }
        if (typeof window !== 'undefined' && window.DataRepository && window.DataRepository.getQuestions()) {
            const repoQ = window.DataRepository.getQuestions();
            if (Array.isArray(repoQ) && repoQ.length > 0) {
                this._questionsCache = repoQ;
                return this._questionsCache;
            }
        }
        try {
            const stored = JSON.parse(localStorage.getItem("pumkin_questions_v3"));
            if (Array.isArray(stored) && stored.length > 0) {
                this._questionsCache = stored;
                return this._questionsCache;
            }
        } catch(e) {}
        if (typeof PUMKIN_DEFAULT_QUESTIONS !== "undefined" && Array.isArray(PUMKIN_DEFAULT_QUESTIONS) && PUMKIN_DEFAULT_QUESTIONS.length > 0) {
            this._questionsCache = PUMKIN_DEFAULT_QUESTIONS;
            return this._questionsCache;
        }
        return [];
    },

    saveQuestions(arr) {
        this._questionsCache = arr;
        this._rebuildMaps();
        try {
            localStorage.setItem("pumkin_questions_v3", JSON.stringify(arr));
        } catch(e) {}
    },

    getQuestionById(id) {
        if (this._questionsMap.size === 0) this._rebuildMaps();
        if (this._questionsMap.has(id)) return this._questionsMap.get(id);
        const list = this.getQuestions();
        return list.find(q => q.id === id) || null;
    },

    getExams() {
        if (this._examsCache && Array.isArray(this._examsCache) && this._examsCache.length > 0) {
            return this._examsCache;
        }
        if (typeof window !== 'undefined' && window.DataRepository && window.DataRepository.getExams()) {
            const repoE = window.DataRepository.getExams();
            if (Array.isArray(repoE) && repoE.length > 0) {
                this._examsCache = repoE;
                return this._examsCache;
            }
        }
        try {
            const stored = JSON.parse(localStorage.getItem("pumkin_exams_v3"));
            if (Array.isArray(stored) && stored.length > 0) {
                this._examsCache = stored;
                return this._examsCache;
            }
        } catch(e) {}
        if (typeof PUMKIN_DEFAULT_EXAMS !== "undefined" && Array.isArray(PUMKIN_DEFAULT_EXAMS) && PUMKIN_DEFAULT_EXAMS.length > 0) {
            this._examsCache = PUMKIN_DEFAULT_EXAMS;
            return this._examsCache;
        }
        return [];
    },

    saveExams(arr) {
        this._examsCache = arr;
        this._rebuildMaps();
        try {
            localStorage.setItem("pumkin_exams_v3", JSON.stringify(arr));
        } catch(e) {}
    },

    getExamById(id) {
        if (this._examsMap.size === 0) this._rebuildMaps();
        if (this._examsMap.has(id)) return this._examsMap.get(id);
        const list = this.getExams();
        return list.find(e => e.id === id) || null;
    },

    getKnowledgeBase() {
        if (this._knowledgeCache && Array.isArray(this._knowledgeCache) && this._knowledgeCache.length > 0) {
            return this._knowledgeCache;
        }
        if (typeof window !== 'undefined' && window.DataRepository && window.DataRepository.getKnowledge()) {
            const repoK = window.DataRepository.getKnowledge();
            if (Array.isArray(repoK) && repoK.length > 0) {
                this._knowledgeCache = repoK;
                return this._knowledgeCache;
            }
        }
        if (typeof PUMKIN_DEFAULT_KNOWLEDGE !== "undefined" && Array.isArray(PUMKIN_DEFAULT_KNOWLEDGE) && PUMKIN_DEFAULT_KNOWLEDGE.length > 0) {
            this._knowledgeCache = PUMKIN_DEFAULT_KNOWLEDGE;
            return this._knowledgeCache;
        }
        if (typeof PUMKIN_KNOWLEDGE_BASE !== "undefined" && Array.isArray(PUMKIN_KNOWLEDGE_BASE) && PUMKIN_KNOWLEDGE_BASE.length > 0) {
            this._knowledgeCache = PUMKIN_KNOWLEDGE_BASE;
            return this._knowledgeCache;
        }
        return [];
    },

    getKnowledgeArticleById(id) {
        if (this._knowledgeMap.size === 0) this._rebuildMaps();
        if (this._knowledgeMap.has(id)) return this._knowledgeMap.get(id);
        return this.getKnowledgeBase().find(a => a.id === id) || null;
    },

    getBookmarks() {
        try {
            const key = this.getPartitionKey("bookmarks");
            const raw = JSON.parse(localStorage.getItem(key)) || [];
            return raw.map(item => (typeof item === "string" ? item : item.id));
        } catch(e) {
            return [];
        }
    },

    getBookmarkDetails() {
        try {
            const key = this.getPartitionKey("bookmarks");
            const raw = JSON.parse(localStorage.getItem(key)) || [];
            return raw.map(item => {
                if (typeof item === "string") {
                    return { id: item, reason: "chưa hiểu", createdAt: Date.now() };
                }
                return {
                    id: item.id,
                    reason: item.reason || "chưa hiểu",
                    createdAt: item.createdAt || Date.now()
                };
            });
        } catch(e) {
            return [];
        }
    },

    toggleBookmark(qId, reason = "chua hieu") {
        let raw = [];
        try {
            const key = this.getPartitionKey("bookmarks");
            raw = JSON.parse(localStorage.getItem(key)) || [];
        } catch(e) { raw = []; }

        const idx = raw.findIndex(item => (typeof item === "string" ? item : item.id) === qId);
        if (idx >= 0) {
            raw.splice(idx, 1);
        } else {
            raw.push({ id: qId, reason: reason, createdAt: Date.now() });
        }
        const key = this.getPartitionKey("bookmarks");
        this.safeSetItem(key, JSON.stringify(raw));
        this._bookmarksCache = null;
        if (typeof PumkinBookmarks !== "undefined") {
            PumkinBookmarks.updateBadge();
        }
        if (typeof PumkinRouter !== "undefined") PumkinRouter.invalidateView("bookmarks");
        return idx < 0;
    },

    setBookmarkReason(qId, reason) {
        let raw = [];
        try {
            const key = this.getPartitionKey("bookmarks");
            raw = JSON.parse(localStorage.getItem(key)) || [];
        } catch(e) { raw = []; }

        let found = false;
        raw = raw.map(item => {
            const id = typeof item === "string" ? item : item.id;
            if (id === qId) {
                found = true;
                return { id, reason: reason, createdAt: item.createdAt || Date.now() };
            }
            return item;
        });
        if (!found) {
            raw.push({ id: qId, reason: reason, createdAt: Date.now() });
        }
        const key = this.getPartitionKey("bookmarks");
        this.safeSetItem(key, JSON.stringify(raw));
        this._bookmarksCache = null;
        if (typeof PumkinBookmarks !== "undefined") {
            PumkinBookmarks.updateBadge();
            PumkinBookmarks.render();
        }
    },

    isBookmarked(qId) {
        return this.getBookmarks().includes(qId);
    },

    getHistory() {
        if (this._historyCache) return this._historyCache;
        try {
            const key = this.getPartitionKey("history");
            this._historyCache = JSON.parse(localStorage.getItem(key)) || [];
            return this._historyCache;
        } catch(e) {
            return [];
        }
    },

    addHistory(record) {
        const hist = this.getHistory();
        hist.unshift(record);
        this._historyCache = hist;
        const key = this.getPartitionKey("history");
        this.safeSetItem(key, JSON.stringify(hist));
        if (typeof PumkinRouter !== "undefined") {
            PumkinRouter.invalidateView("dashboard");
            PumkinRouter.invalidateView("smart");
        }
    },

    getActiveSession() {
        try {
            const key = this.getPartitionKey("active_session");
            return JSON.parse(localStorage.getItem(key));
        } catch(e) {
            return null;
        }
    },

    saveActiveSession(session) {
        const key = this.getPartitionKey("active_session");
        this.safeSetItem(key, JSON.stringify(session));
    },

    clearActiveSession() {
        const key = this.getPartitionKey("active_session");
        localStorage.removeItem(key);
    }
};


    // Primary Namespace
    window.Pumkin.Storage = PumkinStorage;

    // // DEPRECATED: Backward compatibility shim
    window.PumkinStorage = PumkinStorage;
})(window);
