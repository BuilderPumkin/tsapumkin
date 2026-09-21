/**
 * PUMKIN.DEV LEVEL & EXPERIENCE (EXP) PROGRESSION SYSTEM
 * Rule-based RPG progression tied to exam mastery, accuracy, and difficulty.
 * Features unbounded level progression, dynamic EXP requirements (+50% per level),
 * and stacking bonuses for high accuracy and extreme difficulties.
 */

(function(exports) {
    'use strict';

    const STORAGE_PREFIX = "pumkin_level_user_";

    /**
     * Computes the required EXP to advance from `level` to `level + 1`.
     * Level 1 -> 2: 2 EXP
     * Level 2 -> 3: 3 EXP
     * Level L -> L+1: ceil(prev * 1.5)
     * No maximum level cap.
     */
    function getRequiredExpForLevel(level) {
        const lvl = Math.max(1, Math.floor(level || 1));
        if (lvl === 1) return 2;
        let req = 2;
        for (let l = 2; l <= lvl; l++) {
            req = Math.ceil(req * 1.5);
        }
        return req;
    }

    /**
     * Academic Title based on Level
     */
    function getTitleForLevel(level) {
        if (level < 3) return "Tập sự Toán học";
        if (level < 6) return "Chiến binh Tư duy";
        if (level < 10) return "Hiệp sĩ Logic TSA";
        if (level < 15) return "Cao thủ HSA & Bách Khoa";
        if (level < 22) return "Bậc thầy Tối ưu hóa";
        return "Đại kiện tướng Toán học PUMKIN";
    }

    /**
     * Retrieves or initializes a user's level profile.
     */
    function getUserProfile(userId) {
        if (!userId) return null;
        const key = STORAGE_PREFIX + userId;
        try {
            const raw = localStorage.getItem(key);
            if (raw) {
                const profile = JSON.parse(raw);
                profile.level = profile.level || 1;
                profile.currentExp = profile.currentExp || 0;
                profile.totalExp = profile.totalExp || 0;
                profile.nextLevelExp = getRequiredExpForLevel(profile.level);
                return profile;
            }
        } catch (e) {
            console.warn("[PumkinLevelSystem] Error reading profile:", e);
        }

        // Default initial profile for new registered account
        const initial = {
            userId: userId,
            level: 1,
            currentExp: 0,
            nextLevelExp: 2,
            totalExp: 0,
            examsCompleted: 0,
            createdAt: new Date().toISOString()
        };
        saveUserProfile(userId, initial);
        return initial;
    }

    /**
     * Saves user level profile to localStorage
     */
    function saveUserProfile(userId, profile) {
        if (!userId || !profile) return;
        const key = STORAGE_PREFIX + userId;
        try {
            localStorage.setItem(key, JSON.stringify(profile));
        } catch (e) {
            console.error("[PumkinLevelSystem] Failed to save profile:", e);
        }
    }

    /**
     * Calculates EXP earned from an exam attempt.
     * Rules:
     * - Only registered accounts earn EXP.
     * - Accuracy > 70% required to qualify.
     * - Base: < 25 questions -> +1 EXP, >= 25 questions -> +4 EXP.
     * - Accuracy > 95% -> x2 EXP.
     * - Hard mode ("Khó") -> +50% EXP (x1.5).
     * - Super Hard mode ("Siêu khó") -> x3 EXP (only if 100% correct).
     * - All bonuses stack.
     */
    function calculateExamReward(examResult, examData) {
        const user = (typeof PumkinAuth !== 'undefined') ? PumkinAuth.getCurrentUser() : null;
        if (!user) {
            return {
                eligible: false,
                reason: "GUEST_USER",
                message: "Tạo tài khoản để mở khóa Hệ thống Cấp độ (Level) & EXP!",
                expEarned: 0
            };
        }

        const accuracy = parseFloat(examResult.accuracy || 0);
        if (accuracy <= 70) {
            return {
                eligible: false,
                reason: "LOW_ACCURACY",
                message: `Cần đạt trên 70% độ chính xác để nhận EXP (Hiện tại: ${accuracy}%).`,
                accuracy: accuracy,
                expEarned: 0
            };
        }

        const qCount = examResult.total_questions || (examResult.questions ? examResult.questions.length : 0);
        const baseExp = (qCount < 25) ? 1 : 4;

        // Accuracy Multiplier (> 95% -> x2)
        const isHighAccuracy = accuracy > 95;
        let exp = isHighAccuracy ? (baseExp * 2) : baseExp;

        // Difficulty Multiplier
        const diffRaw = ((examData && examData.difficulty) || (examResult && examResult.difficulty) || "").toLowerCase();
        const isHard = (diffRaw.includes("khó") || diffRaw.includes("hard")) && !diffRaw.includes("siêu") && !diffRaw.includes("super") && !diffRaw.includes("hell");
        const isSuperHard = diffRaw.includes("siêu") || diffRaw.includes("super") || diffRaw.includes("hell");
        const isPerfect = accuracy >= 100;

        let diffMultiplierText = "1x";
        if (isHard) {
            exp = Math.ceil(exp * 1.5);
            diffMultiplierText = "+50% (Chế độ Khó)";
        } else if (isSuperHard) {
            if (isPerfect) {
                exp = Math.ceil(exp * 3);
                diffMultiplierText = "x3 (Siêu khó 100%)";
            } else {
                diffMultiplierText = "1x (Cần 100% để x3)";
            }
        }

        return {
            eligible: true,
            expEarned: exp,
            baseExp: baseExp,
            qCount: qCount,
            accuracy: accuracy,
            isHighAccuracy: isHighAccuracy,
            isHard: isHard,
            isSuperHard: isSuperHard,
            isPerfect: isPerfect,
            diffMultiplierText: diffMultiplierText,
            difficultyLabel: examData?.difficulty || (isHard ? "Khó" : (isSuperHard ? "Siêu khó" : "Tiêu chuẩn"))
        };
    }

    /**
     * Awards EXP to the current logged-in user and handles level ups.
     */
    function awardExp(examResult, examData) {
        const reward = calculateExamReward(examResult, examData);
        if (!reward.eligible || reward.expEarned <= 0) {
            return { reward, levelUpResult: null };
        }

        const user = PumkinAuth.getCurrentUser();
        const profile = getUserProfile(user.id);
        const oldLevel = profile.level;

        profile.currentExp += reward.expEarned;
        profile.totalExp += reward.expEarned;
        profile.examsCompleted = (profile.examsCompleted || 0) + 1;

        let leveledUp = false;
        let levelsGained = 0;

        while (true) {
            const required = getRequiredExpForLevel(profile.level);
            if (profile.currentExp >= required) {
                profile.currentExp -= required;
                profile.level++;
                leveledUp = true;
                levelsGained++;
            } else {
                break;
            }
        }

        profile.nextLevelExp = getRequiredExpForLevel(profile.level);
        saveUserProfile(user.id, profile);

        // Update UI components
        updateNavBadge();
        updateDeepLearningLock();

        return {
            reward,
            levelUpResult: {
                oldLevel,
                newLevel: profile.level,
                leveledUp,
                levelsGained,
                currentExp: profile.currentExp,
                nextLevelExp: profile.nextLevelExp,
                totalExp: profile.totalExp,
                title: getTitleForLevel(profile.level)
            }
        };
    }

    /**
     * Updates the Level Badge in the top navigation bar.
     * Only displays for logged-in accounts.
     */
    function updateNavBadge() {
        if (typeof document === 'undefined') return;
        const badgeEl = document.getElementById("nav-user-level-badge");
        if (!badgeEl) return;

        const user = (typeof PumkinAuth !== 'undefined') ? PumkinAuth.getCurrentUser() : null;
        if (!user) {
            badgeEl.style.display = "none";
            return;
        }

        const profile = getUserProfile(user.id);
        const pct = Math.min(100, Math.round((profile.currentExp / profile.nextLevelExp) * 100));

        badgeEl.style.display = "inline-flex";
        badgeEl.innerHTML = `
            <div class="level-pill" title="Cấp ${profile.level} - ${profile.currentExp}/${profile.nextLevelExp} EXP (${pct}%)">
                <span class="level-icon">⭐</span>
                <span class="level-num">Lv.${profile.level}</span>
                <div class="level-mini-bar">
                    <div class="level-mini-fill" style="width: ${pct}%;"></div>
                </div>
            </div>
        `;
    }

    /**
     * Renders the Level & EXP Progress Card in the User Profile Modal.
     */
    function renderProfileCard(containerId = "profile-level-card-container") {
        if (typeof document === 'undefined') return;
        const container = document.getElementById(containerId);
        if (!container) return;

        const user = (typeof PumkinAuth !== 'undefined') ? PumkinAuth.getCurrentUser() : null;
        if (!user) {
            container.innerHTML = "";
            return;
        }

        const profile = getUserProfile(user.id);
        const req = profile.nextLevelExp;
        const pct = Math.min(100, Math.round((profile.currentExp / req) * 100));
        const title = getTitleForLevel(profile.level);

        container.innerHTML = `
            <div class="user-level-profile-card">
                <div class="level-card-header">
                    <div>
                        <div class="level-badge-large">⭐ CẤP ĐỘ ${profile.level}</div>
                        <div class="level-title-text">${title}</div>
                    </div>
                    <div class="level-total-exp">
                        <small>Tổng tích lũy</small>
                        <strong>${profile.totalExp} EXP</strong>
                    </div>
                </div>
                <div class="level-progress-wrapper">
                    <div class="level-progress-info">
                        <span>Tiến trình thăng cấp:</span>
                        <strong>${profile.currentExp} / ${req} EXP (${pct}%)</strong>
                    </div>
                    <div class="level-progress-track">
                        <div class="level-progress-fill" style="width: ${pct}%;"></div>
                    </div>
                    <div class="level-next-hint">Còn ${req - profile.currentExp} EXP nữa để lên Cấp ${profile.level + 1}</div>
                </div>
            </div>
        `;
    }

    /**
     * Generates HTML for the EXP Reward Card shown in the Result Screen.
     */
    function generateResultCardHtml(awardData) {
        if (!awardData) return "";

        const { reward, levelUpResult } = awardData;

        // Guest user notice
        if (!reward.eligible && reward.reason === "GUEST_USER") {
            return `
                <div class="exp-reward-card exp-guest-promo">
                    <div class="exp-promo-icon">🎁</div>
                    <div class="exp-promo-text">
                        <h4>Mở khóa Hệ thống Cấp độ & Điểm EXP</h4>
                        <p>Đăng ký tài khoản miễn phí để nhận điểm kinh nghiệm sau mỗi bài thi đạt trên 70%!</p>
                    </div>
                    <button class="btn btn-sm btn-primary" onclick="PumkinAuth.showModal('register')">Tạo tài khoản ngay →</button>
                </div>
            `;
        }

        // Low accuracy notice
        if (!reward.eligible && reward.reason === "LOW_ACCURACY") {
            return `
                <div class="exp-reward-card exp-low-acc">
                    <div class="exp-promo-icon">🎯</div>
                    <div class="exp-promo-text">
                        <h4>Chưa đủ điều kiện nhận EXP</h4>
                        <p>${reward.message} Hãy ôn lại lý thuyết và thử sức ở đề tiếp theo!</p>
                    </div>
                </div>
            `;
        }

        // Successfully awarded EXP
        const user = (typeof PumkinAuth !== 'undefined') ? PumkinAuth.getCurrentUser() : null;
        if (!user) return "";
        const profile = getUserProfile(user.id);
        const req = profile.nextLevelExp;
        const pct = Math.min(100, Math.round((profile.currentExp / req) * 100));

        let bonusBadges = [];
        bonusBadges.push(`<span>📝 Đề ${reward.qCount} câu: <strong>+${reward.baseExp} EXP</strong></span>`);
        if (reward.isHighAccuracy) {
            bonusBadges.push(`<span class="bonus-tag tag-acc">🎯 Đúng >95%: <strong>x2</strong></span>`);
        }
        if (reward.isHard) {
            bonusBadges.push(`<span class="bonus-tag tag-hard">🔥 Khó: <strong>+50%</strong></span>`);
        }
        if (reward.isSuperHard) {
            if (reward.isPerfect) {
                bonusBadges.push(`<span class="bonus-tag tag-hell">⚡ Siêu khó 100%: <strong>x3</strong></span>`);
            } else {
                bonusBadges.push(`<span class="bonus-tag tag-missed">⚡ Siêu khó: (Cần 100% để x3)</span>`);
            }
        }

        let levelUpBanner = "";
        if (levelUpResult && levelUpResult.leveledUp) {
            levelUpBanner = `
                <div class="level-up-banner animate-pop">
                    🎉 <strong>CHÚC MỪNG BẠN ĐÃ THĂNG CẤP LÊN LEVEL ${levelUpResult.newLevel}!</strong>
                    <div style="font-size: 13px; font-weight: normal; opacity: 0.95; margin-top: 3px;">
                        Danh hiệu mới: <strong>${levelUpResult.title}</strong>
                    </div>
                </div>
            `;
        }

        return `
            <div class="exp-reward-card exp-awarded">
                ${levelUpBanner}
                <div class="exp-card-body">
                    <div class="exp-gain-badge">
                        <span class="exp-plus">+${reward.expEarned}</span>
                        <span class="exp-unit">EXP</span>
                    </div>
                    <div class="exp-details">
                        <div class="exp-breakdown-tags">
                            ${bonusBadges.join(" ")}
                        </div>
                        <div class="exp-bar-container">
                            <div class="exp-bar-header">
                                <span>⭐ Cấp độ <strong>${profile.level}</strong> (${getTitleForLevel(profile.level)})</span>
                                <span><strong>${profile.currentExp} / ${req} EXP</strong></span>
                            </div>
                            <div class="level-progress-track">
                                <div class="level-progress-fill" style="width: ${pct}%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Set user level directly (useful for testing and admin overrides).
     */
    function setUserLevel(userId, targetLevel) {
        if (!userId) return;
        const profile = getUserProfile(userId);
        profile.level = Math.max(1, parseInt(targetLevel, 10) || 1);
        profile.currentExp = 0;
        profile.nextLevelExp = getRequiredExpForLevel(profile.level);
        saveUserProfile(userId, profile);
        updateNavBadge();
        updateDeepLearningLock();
        renderProfileCard();
        return profile;
    }

    /**
     * Handles clicking on the Deep Learning button.
     * Evaluates level condition and shows alert or unlocks access.
     */
    function handleDeepLearningAccess() {
        const user = (typeof PumkinAuth !== 'undefined') ? PumkinAuth.getCurrentUser() : null;
        if (!user) {
            alert("🔒 Chế độ Học sâu đang bị khóa bởi 2 dây xích!\n\nBạn cần đăng nhập tài khoản và đạt Cấp độ trên 3 (Cấp 4 trở lên) để mở khóa tính năng này.");
            if (typeof PumkinAuth !== 'undefined') PumkinAuth.showModal('login');
            return;
        }

        const profile = getUserProfile(user.id);
        if (profile.level <= 3) {
            alert(`🔒 CHẾ ĐỘ HỌC SÂU ĐANG BỊ KHÓA BỞI 2 DÂY XÍCH!\n\n• Yêu cầu: Đạt Cấp độ 4 trở lên (Level > 3).\n• Hiện tại: Tài khoản của bạn đang ở Cấp ${profile.level} (${profile.currentExp}/${profile.nextLevelExp} EXP).\n\nHãy hoàn thành các bài thi trong Kho đề thi với độ chính xác > 70% để nhận EXP thăng cấp và phá khóa nhé!`);
            return;
        }

        // Unlocked state (Level > 3)
        if (window.PumkinDeepLearningIntegration && typeof window.PumkinDeepLearningIntegration.bootstrapDeepLearning === 'function') {
            window.PumkinDeepLearningIntegration.bootstrapDeepLearning({
                userId: user.id,
                config: { rolloutMode: 'beta', telemetryEnabled: true }
            });
        }
        alert(`🚀 CHÚC MỪNG BẠN ĐÃ MỞ KHÓA THÀNH CÔNG CHẾ ĐỘ HỌC SÂU!\n\n• Cấp độ hiện tại: Level ${profile.level} (${getTitleForLevel(profile.level)})\n• Trạng thái: Đã phá vỡ 2 dây xích phong ấn.\n• Hệ thống nhận thức AI Socratic & Dynamic Router đã kích hoạt sẵn sàng.`);
    }

    /**
     * Initializes dynamic speech bubble tooltip that tracks mouse cursor directly.
     */
    function initDeepLearningTooltip() {
        if (typeof document === 'undefined') return;
        const btn = document.getElementById("deep-learning-btn");
        const bubble = document.getElementById("dl-speech-bubble");
        if (!btn || !bubble) return;

        if (btn._hasDlTooltip) return;
        btn._hasDlTooltip = true;

        btn.addEventListener("mouseenter", (e) => {
            if (btn.classList.contains("is-locked")) {
                bubble.style.display = "block";
                requestAnimationFrame(() => {
                    bubble.style.opacity = "1";
                });
                bubble.style.left = e.clientX + "px";
                bubble.style.top = (e.clientY - 14) + "px";
            }
        });

        btn.addEventListener("mousemove", (e) => {
            if (btn.classList.contains("is-locked")) {
                bubble.style.left = e.clientX + "px";
                bubble.style.top = (e.clientY - 14) + "px";
            }
        });

        btn.addEventListener("mouseleave", () => {
            bubble.style.opacity = "0";
            setTimeout(() => {
                if (bubble.style.opacity === "0") {
                    bubble.style.display = "none";
                }
            }, 150);
        });
    }

    /**
     * Updates the visual lock overlay and styling of the Deep Learning button based on user level.
     */
    function updateDeepLearningLock() {
        if (typeof document === 'undefined') return;
        initDeepLearningTooltip();

        const btn = document.getElementById("deep-learning-btn");
        if (!btn) return;

        const user = (typeof PumkinAuth !== 'undefined') ? PumkinAuth.getCurrentUser() : null;
        let isLocked = true;

        if (user) {
            const profile = getUserProfile(user.id);
            if (profile && profile.level > 3) {
                isLocked = false;
            }
        }

        const chainsOverlay = document.getElementById("deep-learning-chains-overlay");
        const btnLabel = document.getElementById("deep-learning-label");
        const bubble = document.getElementById("dl-speech-bubble");

        if (isLocked) {
            btn.classList.remove("is-unlocked");
            btn.classList.add("is-locked");
            btn.removeAttribute("title"); // Custom speech bubble handles hover!
            if (chainsOverlay) chainsOverlay.style.display = "flex";
            if (btnLabel) {
                btnLabel.innerHTML = `Học sâu`;
            }
        } else {
            btn.classList.remove("is-locked");
            btn.classList.add("is-unlocked");
            btn.title = `Chế độ Học sâu đã mở khóa! Bấm để bắt đầu trải nghiệm AI Socratic.`;
            if (chainsOverlay) chainsOverlay.style.display = "none";
            if (btnLabel) {
                btnLabel.innerHTML = `🧠 Chế độ Học sâu 🚀`;
            }
            if (bubble) {
                bubble.style.display = "none";
                bubble.style.opacity = "0";
            }
        }
    }

    // Export module API
    exports.getRequiredExpForLevel = getRequiredExpForLevel;
    exports.getTitleForLevel = getTitleForLevel;
    exports.getUserProfile = getUserProfile;
    exports.calculateExamReward = calculateExamReward;
    exports.awardExp = awardExp;
    exports.updateNavBadge = updateNavBadge;
    exports.renderProfileCard = renderProfileCard;
    exports.generateResultCardHtml = generateResultCardHtml;
    exports.handleDeepLearningAccess = handleDeepLearningAccess;
    exports.updateDeepLearningLock = updateDeepLearningLock;
    exports.setUserLevel = setUserLevel;

})(typeof module !== 'undefined' && module.exports ? module.exports : (window.PumkinLevelSystem = {}));
