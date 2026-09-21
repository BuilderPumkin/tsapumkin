/**
 * PUMKIN Data Repository
 * Fetches JSON files asynchronously with caching, BOM stripping, flexible schema detection,
 * and zero-latency local fallback support (guaranteeing data never disappears).
 */
const DataRepository = (function() {
    
    // In-memory cache
    const cache = {
        questions: null,
        knowledge: null,
        exams: null
    };

    /**
     * Helper to get fallback data from memory/window
     */
    function getFallback(resourceName) {
        if (typeof window !== 'undefined' && window.PUMKIN_FALLBACK_DATA && window.PUMKIN_FALLBACK_DATA[resourceName]) {
            return window.PUMKIN_FALLBACK_DATA[resourceName];
        }
        if (resourceName === 'knowledge') {
            if (typeof PUMKIN_DEFAULT_KNOWLEDGE !== 'undefined' && Array.isArray(PUMKIN_DEFAULT_KNOWLEDGE) && PUMKIN_DEFAULT_KNOWLEDGE.length > 0) {
                return PUMKIN_DEFAULT_KNOWLEDGE;
            }
            if (typeof PUMKIN_KNOWLEDGE_BASE !== 'undefined' && Array.isArray(PUMKIN_KNOWLEDGE_BASE) && PUMKIN_KNOWLEDGE_BASE.length > 0) {
                return PUMKIN_KNOWLEDGE_BASE;
            }
        }
        if (resourceName === 'exams') {
            if (typeof PUMKIN_DEFAULT_EXAMS !== 'undefined' && Array.isArray(PUMKIN_DEFAULT_EXAMS) && PUMKIN_DEFAULT_EXAMS.length > 0) {
                return PUMKIN_DEFAULT_EXAMS;
            }
            if (typeof PUMKIN_EXAMS_DATABASE !== 'undefined' && Array.isArray(PUMKIN_EXAMS_DATABASE) && PUMKIN_EXAMS_DATABASE.length > 0) {
                return PUMKIN_EXAMS_DATABASE;
            }
        }
        if (resourceName === 'questions') {
            if (typeof PUMKIN_DEFAULT_QUESTIONS !== 'undefined' && Array.isArray(PUMKIN_DEFAULT_QUESTIONS) && PUMKIN_DEFAULT_QUESTIONS.length > 0) {
                return PUMKIN_DEFAULT_QUESTIONS;
            }
            if (typeof PUMKIN_QUESTIONS_DATABASE !== 'undefined' && Array.isArray(PUMKIN_QUESTIONS_DATABASE) && PUMKIN_QUESTIONS_DATABASE.length > 0) {
                return PUMKIN_QUESTIONS_DATABASE;
            }
        }
        return [];
    }

    /**
     * Fetch with fallback/retry and caching.
     */
    async function fetchResource(url, resourceName) {
        if (cache[resourceName] && Array.isArray(cache[resourceName]) && cache[resourceName].length > 0) {
            return cache[resourceName];
        }

        try {
            console.log(`[DataRepository] Fetching ${resourceName} from ${url}...`);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const rawText = await response.text();
            // Robustly strip UTF-8 BOM if present
            const cleanText = rawText.replace(/^\uFEFF/, '');
            const data = JSON.parse(cleanText);
            
            // Allow arrays or wrapped objects ({ value: [...] }, { data: [...] }, { exams: [...] })
            let resultData = [];
            if (Array.isArray(data)) {
                resultData = data;
            } else if (data && typeof data === 'object') {
                if (Array.isArray(data.value)) resultData = data.value;
                else if (Array.isArray(data.data)) resultData = data.data;
                else if (Array.isArray(data[resourceName])) resultData = data[resourceName];
            }
            
            if (resultData.length === 0) {
                const fb = getFallback(resourceName);
                if (fb.length > 0) resultData = fb;
            }

            cache[resourceName] = resultData;
            return resultData;
        } catch (error) {
            console.warn(`[DataRepository] Network fetch failed for ${resourceName} (${error.message}). Activating local fallback...`);
            const fallbackData = getFallback(resourceName);
            cache[resourceName] = fallbackData;
            return fallbackData;
        }
    }

    async function loadAllData() {
        try {
            const loadingOverlay = document.getElementById('global-loading-overlay');
            if (loadingOverlay) loadingOverlay.style.display = 'flex';

            const [questions, knowledge, exams] = await Promise.all([
                fetchResource('data/questions/all.json', 'questions'),
                fetchResource('data/knowledge/all.json', 'knowledge'),
                fetchResource('data/exams/all.json', 'exams')
            ]);
            
            if (loadingOverlay) loadingOverlay.style.display = 'none';

            return { questions, knowledge, exams };
        } catch (error) {
            console.error("[DataRepository] Unexpected error in loadAllData:", error);
            const loadingOverlay = document.getElementById('global-loading-overlay');
            if (loadingOverlay) loadingOverlay.style.display = 'none';
            return {
                questions: getFallback('questions'),
                knowledge: getFallback('knowledge'),
                exams: getFallback('exams')
            };
        }
    }

    return {
        loadAllData,
        getQuestions: () => cache.questions || getFallback('questions'),
        getKnowledge: () => cache.knowledge || getFallback('knowledge'),
        getExams: () => cache.exams || getFallback('exams')
    };
})();

if (typeof window !== 'undefined') {
    window.DataRepository = DataRepository;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataRepository;
}
