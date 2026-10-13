/**
 * PUMKIN.DEV AI USAGE QUOTA MANAGER
 * Manages daily AI usage limits per user to protect Gemini Free Tier quota.
 * 
 * Policy:
 * - Guest (Unregistered): 5 requests / day
 * - Registered Student (Level 1-3): 20 requests / day
 * - Advanced Student (Level 4+ / Deep Learning Unlocked): 30 requests / day
 * - Automatic Daily Reset at 00:00 local time
 */

const PumkinAiQuota = (function() {
    'use strict';

    const STORAGE_KEY_PREFIX = 'pumkin_ai_quota_v1_';

    const LIMITS = {
        GUEST: 5,
        STUDENT: 20,
        ADVANCED: 30
    };

    /**
     * Returns today's date string in YYYY-MM-DD format (local timezone)
     */
    function getTodayKey() {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    /**
     * Determines user tier based on authentication and RPG level
     */
    function getUserTier() {
        const isAuth = typeof PumkinAuth !== 'undefined' && PumkinAuth.currentUser && PumkinAuth.currentUser.id && PumkinAuth.currentUser.id !== 'guest_student';
        if (!isAuth) {
            return { tier: 'GUEST', limit: LIMITS.GUEST, label: 'Khách' };
        }

        // Check RPG Level
        let level = 1;
        try {
            if (typeof PumkinStorage !== 'undefined' && PumkinStorage.getProfile) {
                const profile = PumkinStorage.getProfile();
                if (profile && profile.level) level = Number(profile.level);
            } else if (typeof PumkinAuth !== 'undefined' && PumkinAuth.currentUser && PumkinAuth.currentUser.profile) {
                level = Number(PumkinAuth.currentUser.profile.level || 1);
            }
        } catch (e) {
            level = 1;
        }

        if (level >= 4) {
            return { tier: 'ADVANCED', limit: LIMITS.ADVANCED, label: 'Học sinh Cấp ' + level, level };
        }

        return { tier: 'STUDENT', limit: LIMITS.STUDENT, label: 'Học sinh Cấp ' + level, level };
    }

    /**
     * Returns current user ID for storage key separation
     */
    function getUserId() {
        if (typeof PumkinAuth !== 'undefined' && PumkinAuth.currentUser && PumkinAuth.currentUser.id) {
            return PumkinAuth.currentUser.id;
        }
        return 'guest_student';
    }

    /**
     * Gets storage key for current user and today
     */
    function getStorageKey() {
        const userId = getUserId();
        const today = getTodayKey();
        return `${STORAGE_KEY_PREFIX}${userId}_${today}`;
    }

    /**
     * Reads current usage from localStorage
     */
    function getUsedCount() {
        try {
            if (typeof localStorage === 'undefined') return 0;
            const key = getStorageKey();
            const val = localStorage.getItem(key);
            return val ? Math.max(0, parseInt(val, 10) || 0) : 0;
        } catch (e) {
            return 0;
        }
    }

    /**
     * Returns comprehensive quota status object
     */
    function getQuotaStatus() {
        const userTier = getUserTier();
        const used = getUsedCount();
        const limit = userTier.limit;
        const remaining = Math.max(0, limit - used);
        const isExhausted = remaining <= 0;

        // Calculate time to next reset (midnight)
        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const resetInMs = tomorrow.getTime() - now.getTime();
        const resetHours = Math.floor(resetInMs / (1000 * 60 * 60));
        const resetMins = Math.floor((resetInMs % (1000 * 60 * 60)) / (1000 * 60));

        return {
            used,
            limit,
            remaining,
            isExhausted,
            tier: userTier.tier,
            tierLabel: userTier.label,
            today: getTodayKey(),
            resetInHours: resetHours,
            resetInMins: resetMins,
            resetNotice: `Làm mới sau ${resetHours} giờ ${resetMins} phút`
        };
    }

    /**
     * Consumes 1 quota usage after a successful AI response
     * Returns updated quota status
     */
    function consumeQuota() {
        try {
            if (typeof localStorage === 'undefined') return getQuotaStatus();
            const key = getStorageKey();
            const current = getUsedCount();
            localStorage.setItem(key, String(current + 1));
        } catch (e) {
            console.warn('[PumkinAiQuota] Could not save quota to localStorage:', e);
        }
        return getQuotaStatus();
    }

    /**
     * Helper for tests or manual reset
     */
    function resetQuotaForTesting() {
        try {
            if (typeof localStorage !== 'undefined') {
                const key = getStorageKey();
                localStorage.removeItem(key);
            }
        } catch (e) {}
    }

    return {
        LIMITS,
        getTodayKey,
        getUserTier,
        getQuotaStatus,
        consumeQuota,
        resetQuotaForTesting
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PumkinAiQuota;
}
if (typeof window !== 'undefined') {
    window.PumkinAiQuota = PumkinAiQuota;
}
