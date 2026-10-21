/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.JourneyManager
 * Layer: Cognitive Progression & 3-Step Journey Orchestrator
 * Description: State Machine (NEW -> DIAGNOSING -> DAILY_FOCUS -> FREE_EXPLORE)
 *              with 1-CTA Dashboard Guarantee, Non-punitive Socratic Scaffolding,
 *              and Automated Daily Focus Selection Engine.
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

    const STATE = {
        NEW: 'NEW',                   // Chưa làm bài test chẩn đoán
        DIAGNOSING: 'DIAGNOSING',     // Đang trong quá trình chẩn đoán 10 câu
        DAILY_FOCUS: 'DAILY_FOCUS',   // Đã chẩn đoán, có 1 nhiệm vụ trọng tâm hôm nay (6 câu)
        FREE_EXPLORE: 'FREE_EXPLORE'  // Đã xong nhiệm vụ ngày, mở rộng tự do (Kho đề, Sổ tay, Boss)
    };

    const PumkinJourneyManager = {
        STATE,

        /**
         * Get current journey state from PumkinStore or fallback localStorage
         * @returns {string} One of STATE values
         */
        getState() {
            if (typeof PumkinStore !== "undefined" && PumkinStore.getJourney) {
                const j = PumkinStore.getJourney();
                if (j && j.state) return j.state;
            }
            try {
                const raw = localStorage.getItem("pumkin_journey_state_v1");
                if (raw) {
                    const parsed = JSON.parse(raw);
                    if (parsed && parsed.state) return parsed.state;
                }
            } catch (e) {}
            return STATE.NEW;
        },

        /**
         * Get full journey data container
         * @returns {Object}
         */
        getJourneyData() {
            if (typeof PumkinStore !== "undefined" && PumkinStore.getJourney) {
                return PumkinStore.getJourney();
            }
            try {
                const raw = localStorage.getItem("pumkin_journey_state_v1");
                if (raw) return JSON.parse(raw);
            } catch (e) {}
            return {
                state: STATE.NEW,
                diagnosticCompletedAt: null,
                diagnosticResult: null,
                dailyFocus: null,
                completedDates: []
            };
        },

        /**
         * Transition state and persist
         * @param {string} nextState
         * @param {Object} [payload]
         */
        transitionTo(nextState, payload = {}) {
            const current = this.getJourneyData();
            const updated = {
                ...current,
                state: nextState,
                ...payload,
                updatedAt: new Date().toISOString()
            };

            if (typeof PumkinStore !== "undefined" && PumkinStore.setJourney) {
                PumkinStore.setJourney(updated);
            } else {
                try {
                    localStorage.setItem("pumkin_journey_state_v1", JSON.stringify(updated));
                } catch (e) {}
            }

            // Re-render hero if on dashboard
            this.renderDashboardHero();
            return updated;
        },

        /**
         * Reset diagnostic to allow retaking test
         */
        resetDiagnostic() {
            this.transitionTo(STATE.NEW, {
                diagnosticCompletedAt: null,
                diagnosticResult: null,
                dailyFocus: null
            });
            if (typeof PumkinToast !== "undefined") {
                PumkinToast.info("Đã đặt lại trạng thái. Bạn có thể làm bài chẩn đoán mới bất kỳ lúc nào.");
            }
        },

        /**
         * Skip diagnostic test and jump straight to Free Exploration
         */
        skipDiagnostic() {
            this.transitionTo(STATE.FREE_EXPLORE, {
                skippedDiagnostic: true
            });
            if (typeof PumkinToast !== "undefined") {
                PumkinToast.info("Đã mở khóa chế độ tự do. Bạn có thể truy cập kho đề thi và sổ tay ngay!");
            }
        },

        /**
         * Switch from Daily Focus to Free Exploration (non-punitive postpone)
         */
        switchToFreeExplore() {
            this.transitionTo(STATE.FREE_EXPLORE);
            if (typeof PumkinToast !== "undefined") {
                PumkinToast.info("Đã chuyển sang khám phá tự do. Bạn có thể quay lại làm bài tập bất kỳ lúc nào.");
            }
        },

        /**
         * Generate or retrieve today's Daily Focus pack (6 questions)
         * Priority logic:
         * 1. Systemic Error (recurring misconception >= 2 times)
         * 2. Weakest skill in profile (< 60% accuracy)
         * 3. Weakest topic in profile
         * 4. Fallback Calculus/Optimization
         * @returns {Object} Daily focus data
         */
        getOrGenerateDailyFocus(forceRefresh = false) {
            const todayStr = new Date().toISOString().slice(0, 10);
            const journey = this.getJourneyData();

            if (!forceRefresh && journey.dailyFocus && journey.dailyFocus.date === todayStr) {
                return journey.dailyFocus;
            }

            const allQuestions = (typeof PumkinStorage !== "undefined") ? PumkinStorage.getQuestions() : [];
            const profile = (typeof PumkinSkillProfile !== "undefined") ? PumkinSkillProfile.computeProfile() : null;

            let chosenTopic = "Giải tích";
            let chosenMisconception = null;
            let chosenSkill = "skill_reasoning";
            let reason = "Hôm nay mình khởi động với 6 câu trọng tâm chuyên đề Giải tích & Tối ưu hóa.";
            let goalTitle = "Tối ưu hóa & Ứng dụng thực tế";

            if (profile) {
                // Priority 1: Systemic Repeated Misconception
                if (profile.hasSystemicErrors && Array.isArray(profile.systemicErrors) && profile.systemicErrors.length > 0) {
                    const topError = profile.systemicErrors[0];
                    chosenMisconception = topError.misconceptionId;
                    goalTitle = `Khắc phục bẫy: ${topError.name}`;
                    reason = `Hôm nay mình cùng luyện dạng bài này vì hệ thống phát hiện bạn hay nhầm: "${topError.name}".`;
                    if (topError.skillIds && topError.skillIds.length > 0) {
                        chosenSkill = topError.skillIds[0];
                    }
                }
                // Priority 2: Weakest Skill (< 65% accuracy)
                else {
                    const skillKeys = Object.keys(profile.skills || {});
                    let lowestAcc = 100;
                    let lowestKey = null;

                    skillKeys.forEach(k => {
                        const s = profile.skills[k];
                        if (s && (s.total === undefined || s.total >= 2) && typeof s.accuracy === 'number' && s.accuracy < lowestAcc) {
                            lowestAcc = s.accuracy;
                            lowestKey = k;
                        }
                    });

                    if (lowestKey && lowestAcc < 65) {
                        chosenSkill = lowestKey;
                        const skillDef = PumkinSkillProfile.SKILL_DEFS[lowestKey] || { name: lowestKey };
                        goalTitle = `Rèn luyện: ${skillDef.name}`;
                        reason = `Hôm nay mình củng cố "${skillDef.name}" để kéo tỉ lệ chính xác từ ${lowestAcc}% lên mốc 70%.`;
                    }
                    // Priority 3: Weakest Topic
                    else if (profile.weaknesses && profile.weaknesses.length > 0) {
                        const topWeak = profile.weaknesses[0];
                        chosenTopic = topWeak.topic;
                        goalTitle = `Ôn luyện: ${chosenTopic}`;
                        reason = `Hôm nay mình rèn thêm chuyên đề "${chosenTopic}" (tỉ lệ làm đúng hiện tại ${topWeak.accuracy}%).`;
                    }
                }
            }

            // Check Isomorphic Generator Prefetch Queue (W6 Engine)
            let finalQuestions = [];
            let isGenerated = false;
            let sourceBadge = null;

            const prefetchQueue = (typeof window !== 'undefined' && window.Pumkin && window.Pumkin.PrefetchQueue)
                ? window.Pumkin.PrefetchQueue
                : (typeof window !== 'undefined' && window.PumkinPrefetchQueue ? window.PumkinPrefetchQueue : null);

            if (prefetchQueue && prefetchQueue.isGenerateEnabled()) {
                const packRes = prefetchQueue.getDailyFocusPack({
                    skillId: chosenSkill,
                    misconceptionId: chosenMisconception,
                    topic: chosenTopic,
                    count: 6
                });

                if (packRes.success && Array.isArray(packRes.questions) && packRes.questions.length >= 5) {
                    finalQuestions = packRes.questions;
                    isGenerated = true;
                    sourceBadge = 'Đề tự sinh (Đã duyệt mẫu)';
                } else {
                    // Graceful fallback to bank questions
                    reason += ` (Hệ thống đang dùng đề tuyển chọn từ ngân hàng đề do ${packRes.reason || 'đề tự sinh đang chờ giáo viên duyệt mẫu'}).`;
                }

                // Trigger background prefetch for future sessions
                setTimeout(() => {
                    const cat = (chosenTopic && chosenTopic.toLowerCase().includes('hình')) ? 'geometry_oxyz' : 'nguyen_ham_tich_phan';
                    prefetchQueue.prefetchInBackground({ category: cat, count: 6 });
                }, 1000);
            }

            // Fallback / standard selection from verified question bank
            if (finalQuestions.length === 0) {
            // Filter question pool
            let candidates = allQuestions.filter(q => {
                if (chosenMisconception && q.distractors) {
                    const hasTrap = q.distractors.some(d => d.misconceptionId === chosenMisconception);
                    if (hasTrap) return true;
                }
                if (chosenTopic && q.topic && q.topic.toLowerCase().includes(chosenTopic.toLowerCase())) {
                    return true;
                }
                if (chosenSkill && Array.isArray(q.skills) && q.skills.includes(chosenSkill)) {
                    return true;
                }
                return false;
            });

            if (candidates.length < 6) {
                candidates = allQuestions;
            }

            // Assemble 6 items: 2 M2 (foundation), 3 M3 (focus), 1 M4 (challenge)
            const m2List = candidates.filter(q => String(q.cognitive_level || "").toUpperCase().includes("M2"));
            const m3List = candidates.filter(q => String(q.cognitive_level || "").toUpperCase().includes("M3"));
            const m4List = candidates.filter(q => String(q.cognitive_level || "").toUpperCase().includes("M4"));

            const pickRandom = (arr, count) => {
                const shuffled = [...arr].sort(() => 0.5 - Math.random());
                return shuffled.slice(0, count);
            };

            const pickedM2 = pickRandom(m2List.length >= 2 ? m2List : candidates, 2);
            const pickedM3 = pickRandom(m3List.length >= 3 ? m3List : candidates, 3);
            const pickedM4 = pickRandom(m4List.length >= 1 ? m4List : candidates, 1);

            const combinedSet = new Set([...pickedM2, ...pickedM3, ...pickedM4]);
            while (combinedSet.size < 6 && candidates.length > combinedSet.size) {
                const extra = candidates[Math.floor(Math.random() * candidates.length)];
                combinedSet.add(extra);
            }

            finalQuestions = Array.from(combinedSet).slice(0, 6);
            } // End bank fallback selection

            const dailyFocus = {
                id: `daily_${todayStr}`,
                date: todayStr,
                title: goalTitle,
                reason: reason,
                topic: chosenTopic,
                misconceptionId: chosenMisconception,
                targetSkill: chosenSkill,
                total: finalQuestions.length,
                completed: 0,
                questionIds: finalQuestions.map(q => q.id),
                questions: finalQuestions,
                is_generated: isGenerated,
                source_badge: sourceBadge
            };

            this.transitionTo(this.getState(), { dailyFocus });
            return dailyFocus;
        },

        /**
         * Start 10-question adaptive diagnostic exam
         */
        startDiagnostic() {
            const allQuestions = (typeof PumkinStorage !== "undefined") ? PumkinStorage.getQuestions() : [];
            if (!allQuestions || allQuestions.length === 0) {
                if (typeof PumkinToast !== "undefined") PumkinToast.error("Không tìm thấy ngân hàng câu hỏi.");
                return;
            }

            // INVARIANT (W6): Diagnostic test STRICTLY uses verified bank questions, NEVER generated questions!
            const verifiedBank = allQuestions.filter(q => q.is_generated !== true && q.source_type !== "generated" && !String(q.id || "").startsWith("gen_"));
            const bankPool = verifiedBank.length >= 10 ? verifiedBank : verifiedBank;

            if (bankPool.length === 0) {
                if (typeof PumkinToast !== "undefined") PumkinToast.error("Không tìm thấy câu hỏi chuẩn từ ngân hàng đề.");
                return;
            }

            // Balanced 10 questions: 3 M1/M2 + 4 M2/M3 + 3 M3/M4
            const pickTier = (pattern, count) => {
                const matched = bankPool.filter(q => {
                    const lvl = String(q.cognitive_level || "").toUpperCase();
                    return pattern.some(p => lvl.includes(p));
                });
                return matched.sort(() => 0.5 - Math.random()).slice(0, count);
            };

            const tier1 = pickTier(["M1", "NHẬN"], 3);
            const tier2 = pickTier(["M2", "THÔNG"], 4);
            const tier3 = pickTier(["M3", "M4", "VẬN"], 3);

            const diagQuestions = [...tier1, ...tier2, ...tier3];
            const remainingPool = bankPool.filter(q => !diagQuestions.some(d => d.id === q.id));
            while (diagQuestions.length < 10 && remainingPool.length > 0) {
                diagQuestions.push(remainingPool.pop());
            }
            while (diagQuestions.length < 10 && bankPool.length > 0) {
                diagQuestions.push(bankPool[Math.floor(Math.random() * bankPool.length)]);
            }

            const diagExam = {
                id: `diag_${Date.now()}`,
                title: "Bài Test Chẩn Đoán Khởi Đầu (10 câu chuẩn hoá)",
                type: "TSA",
                duration_minutes: 15,
                is_diagnostic: true,
                questions: diagQuestions.slice(0, 10)
            };

            this.transitionTo(STATE.DIAGNOSING);

            if (typeof PumkinPlayer !== "undefined" && PumkinPlayer.startExam) {
                PumkinPlayer.startExam(diagExam.id, true, diagExam);
            }
        },

        /**
         * Hook called by PumkinScoring when diagnostic exam finishes
         */
        onDiagnosticCompleted(resultRecord) {
            const todayStr = new Date().toISOString().slice(0, 10);
            const shadowRasch = resultRecord.shadow_rasch || null;

            this.transitionTo(STATE.DAILY_FOCUS, {
                diagnosticCompletedAt: new Date().toISOString(),
                diagnosticResult: {
                    score: resultRecord.score,
                    accuracy: resultRecord.accuracy,
                    shadowRasch: shadowRasch
                }
            });

            // Generate first daily focus goal right away
            this.getOrGenerateDailyFocus(true);

            if (typeof PumkinToast !== "undefined") {
                PumkinToast.success("Hoàn thành bài Test Chẩn Đoán! Hệ thống đã thiết lập mục tiêu trọng tâm hôm nay cho bạn.");
            }
        },

        /**
         * Start today's Daily Focus session (6 questions)
         */
        startDailyFocus() {
            const focus = this.getOrGenerateDailyFocus();
            if (!focus || !focus.questions || focus.questions.length === 0) {
                if (typeof PumkinToast !== "undefined") PumkinToast.error("Không tìm thấy bộ câu hỏi cho nhiệm vụ hôm nay.");
                return;
            }

            const focusExam = {
                id: focus.id,
                title: `Nhiệm vụ Trọng tâm: ${focus.title}`,
                type: "TSA",
                duration_minutes: 12,
                is_daily_focus: true,
                questions: focus.questions
            };

            if (typeof PumkinPlayer !== "undefined" && PumkinPlayer.startExam) {
                PumkinPlayer.startExam(focusExam.id, true, focusExam);
            }
        },

        /**
         * Hook called by PumkinScoring when daily focus exam finishes
         */
        onDailyFocusCompleted(resultRecord) {
            const todayStr = new Date().toISOString().slice(0, 10);
            const journey = this.getJourneyData();
            const completedDates = Array.isArray(journey.completedDates) ? [...journey.completedDates] : [];

            if (!completedDates.includes(todayStr)) {
                completedDates.push(todayStr);
            }

            const updatedFocus = journey.dailyFocus ? {
                ...journey.dailyFocus,
                completed: journey.dailyFocus.total || 6
            } : null;

            this.transitionTo(STATE.FREE_EXPLORE, {
                dailyFocus: updatedFocus,
                completedDates: completedDates,
                lastCompletedAt: new Date().toISOString()
            });

            if (typeof PumkinToast !== "undefined") {
                PumkinToast.success("🎉 Xuất sắc! Bạn đã hoàn thành trọn vẹn mục tiêu trọng tâm hôm nay (+50 EXP).");
            }
        },

        /**
         * Render the Focused 1-CTA Hero Card on Dashboard
         */
        renderDashboardHero() {
            if (typeof document === "undefined") return;
            const heroContainer = document.getElementById("dashboard-hero-journey-card");
            if (!heroContainer) return;

            const state = this.getState();
            const journey = this.getJourneyData();

            let heroHtml = "";

            if (state === STATE.NEW) {
                // ==========================================
                // STATE 1: NEW (Chưa chẩn đoán)
                // ==========================================
                heroHtml = `
                    <div class="journey-hero-card state-new" role="region" aria-label="Khởi đầu lộ trình học tập">
                        <div class="journey-badge-pill">BƯỚC 1: XÁC ĐỊNH NĂNG LỰC KHỞI ĐẦU</div>
                        <h2 class="journey-title">Chào bạn! Hãy định vị trình độ trước khi bắt đầu</h2>
                        <p class="journey-desc">
                            Bài test chẩn đoán thích ứng <strong>10 câu (12–15 phút)</strong> sẽ giúp đo mức năng lực xuất phát theo chuẩn Rasch, nhận diện ngay bẫy tư duy bạn hay gặp, và cá nhân hóa nhiệm vụ mỗi ngày.
                        </p>
                        <div class="journey-benefits-grid">
                            <div class="benefit-item">✓ Đo mức năng lực (Mức 1 đến 5)</div>
                            <div class="benefit-item">✓ Bắt trúng bẫy nhận thức học sinh hay sai</div>
                            <div class="benefit-item">✓ Nhận 1 mục tiêu vừa vặn mỗi ngày</div>
                        </div>
                        <div class="journey-cta-wrapper">
                            <button class="btn btn-cta-primary" id="btn-journey-main-cta" onclick="PumkinJourneyManager.startDiagnostic()" aria-label="Bắt đầu bài kiểm tra chẩn đoán 10 câu">
                                🚀 BẮT ĐẦU TEST CHẨN ĐOÁN (10 CÂU - 15 PHÚT)
                            </button>
                        </div>
                        <div class="journey-escape-row">
                            <button class="btn-text-link" onclick="PumkinJourneyManager.skipDiagnostic()" title="Chuyển thẳng sang xem kho tài nguyên">
                                Bỏ qua chẩn đoán, tôi muốn tự do khám phá kho tài nguyên →
                            </button>
                        </div>
                    </div>
                `;
            } else if (state === STATE.DAILY_FOCUS) {
                // ==========================================
                // STATE 2: DAILY_FOCUS (Nhiệm vụ trọng tâm hôm nay)
                // ==========================================
                const focus = this.getOrGenerateDailyFocus();
                const total = focus.total || 6;
                const completed = focus.completed || 0;
                const remaining = total - completed;
                const pct = Math.round((completed / total) * 100);

                heroHtml = `
                    <div class="journey-hero-card state-daily-focus" role="region" aria-label="Nhiệm vụ trọng tâm trong ngày">
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                            <div class="journey-badge-pill active">⚡ NHIỆM VỤ TRỌNG TÂM HÔM NAY (1 MỤC TIÊU)</div>
                            <span class="journey-est-time">⏱️ Ước tính: ~8–10 phút</span>
                        </div>
                        <h2 class="journey-title">${focus.title}</h2>
                        <div class="journey-reason-box">
                            <span class="reason-icon">💡</span>
                            <div class="reason-text">${focus.reason}</div>
                        </div>

                        <div class="journey-progress-container">
                            <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 6px;">
                                <span>Tiến độ mục tiêu:</span>
                                <span>${completed} / ${total} câu (${pct}%)</span>
                            </div>
                            <div class="progress-track" style="height: 10px; border-radius: 5px; background: var(--border-color, #e2e8f0); overflow: hidden;">
                                <div class="progress-bar-fill high" style="width: ${pct}%; height: 100%; transition: width 0.4s ease;"></div>
                            </div>
                        </div>

                        <div class="journey-cta-wrapper">
                            <button class="btn btn-cta-primary" id="btn-journey-main-cta" onclick="PumkinJourneyManager.startDailyFocus()" aria-label="Bắt đầu làm bài nhiệm vụ hôm nay">
                                ▶ ${completed > 0 ? `TIẾP TỤC NHIỆM VỤ (${remaining} CÂU CÒN LẠI)` : `BẮT ĐẦU NHIỆM VỤ HÔM NAY (${total} CÂU)`}
                            </button>
                        </div>
                        <div class="journey-escape-row">
                            <button class="btn-text-link" onclick="PumkinJourneyManager.getOrGenerateDailyFocus(true); PumkinJourneyManager.renderDashboardHero();" title="Đổi sang chuyên đề khác">
                                🔄 Đổi dạng bài khác
                            </button>
                            <span style="color: var(--text-muted);">•</span>
                            <button class="btn-text-link" onclick="PumkinJourneyManager.switchToFreeExplore()" title="Tạm gác lại nhiệm vụ để tự do học">
                                Làm sau, chuyển sang tự do
                            </button>
                        </div>
                    </div>
                `;
            } else {
                // ==========================================
                // STATE 3: FREE_EXPLORE (Mở rộng tự do)
                // ==========================================
                heroHtml = `
                    <div class="journey-hero-card state-free-explore" role="region" aria-label="Mục tiêu ngày đã hoàn thành - Khám phá tự do">
                        <div class="journey-badge-pill completed">✓ MỤC TIÊU HÔM NAY ĐÃ HOÀN THÀNH</div>
                        <h2 class="journey-title">🎉 Xuất sắc! Bạn đã hoàn thành 100% mục tiêu hôm nay (+50 EXP)</h2>
                        <p class="journey-desc">
                            Bạn đã giải quyết dứt điểm các câu hỏi trọng tâm. Toàn bộ kho tài nguyên, đề thi chính thức và sổ tay công thức đã sẵn sàng để bạn tự do khám phá theo nhịp độ riêng.
                        </p>

                        <div class="journey-cta-wrapper">
                            <button class="btn btn-cta-primary" id="btn-journey-main-cta" onclick="PumkinRouter.navigate('library')" aria-label="Khám phá kho đề thi TSA">
                                🏆 THỬ THÁCH ĐỀ THI TSA TOÀN DIỆN (KHO ĐỀ THI)
                            </button>
                        </div>

                        <div class="quick-doors-grid">
                            <button class="quick-door-card" onclick="PumkinRouter.navigate('library')">
                                <span class="door-icon">📚</span>
                                <span class="door-title">Kho 20 đề thi TSA</span>
                                <span class="door-sub">Luyện đề bấm giờ thực chiến</span>
                            </button>
                            <button class="quick-door-card" onclick="PumkinRouter.navigate('formulas')">
                                <span class="door-icon">📖</span>
                                <span class="door-title">Sổ tay công thức</span>
                                <span class="door-sub">Tra cứu định lý & giải nhanh</span>
                            </button>
                            <button class="quick-door-card" onclick="PumkinRouter.navigate('live-lobby')">
                                <span class="door-icon">⚔️</span>
                                <span class="door-title">Live Challenge</span>
                                <span class="door-sub">Đấu Boss & Thách đấu bạn bè</span>
                            </button>
                            <button class="quick-door-card" onclick="PumkinJourneyManager.openResourceHub()">
                                <span class="door-icon">📊</span>
                                <span class="door-title">Hồ sơ năng lực</span>
                                <span class="door-sub">Xem 6 thanh kỹ năng & Rasch</span>
                            </button>
                        </div>

                        <div class="journey-escape-row" style="margin-top: 14px;">
                            <button class="btn-text-link" onclick="PumkinJourneyManager.resetDiagnostic()" title="Làm lại bài kiểm tra định vị trình độ">
                                🔄 Làm lại bài test chẩn đoán (Cập nhật lại trình độ)
                            </button>
                        </div>
                    </div>
                `;
            }

            heroContainer.innerHTML = heroHtml + this.renderQuickShortcuts();
        },

        /**
         * Get live record counts for quick shortcuts (or '...' while loading)
         */
        getShortcutCounts() {
            let exams = "...";
            let formulas = "...";
            let knowledge = "...";

            if (typeof PumkinStorage !== "undefined") {
                if (typeof PumkinStorage.getExams === "function") {
                    const exList = PumkinStorage.getExams();
                    if (exList && exList.length > 0) exams = exList.length;
                }

                if (typeof PumkinFormulas !== "undefined" && typeof PumkinFormulas.getFlatFormulas === "function") {
                    const formList = PumkinFormulas.getFlatFormulas();
                    if (formList && formList.length > 0) formulas = formList.length;
                } else if (typeof PumkinStorage.getFormulas === "function") {
                    const formList = PumkinStorage.getFormulas();
                    if (formList && formList.length > 0) formulas = formList.length;
                }

                if (typeof PumkinStorage.getKnowledgeBase === "function") {
                    const kbList = PumkinStorage.getKnowledgeBase();
                    if (kbList && kbList.length > 0) knowledge = kbList.length;
                }
            }
            return { exams, formulas, knowledge };
        },

        /**
         * Render Quick Utility Strip (Option 1)
         */
        renderQuickShortcuts() {
            const counts = this.getShortcutCounts();
            return `
                <div class="dashboard-quick-shortcuts" role="region" aria-label="Lối tắt tiện ích học tập" style="margin: 18px 0 20px 0;">
                    <div style="font-size: 12.5px; font-weight: 700; color: var(--text-muted, #64748b); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;">
                        ⚡ Lối tắt tiện ích tra cứu & luyện thi:
                    </div>
                    <div class="quick-shortcuts-grid">
                        <button class="quick-shortcut-btn" onclick="PumkinRouter.navigate('library')" aria-label="Mở kho đề thi chuẩn hóa">
                            <span class="shortcut-icon" aria-hidden="true">📚</span>
                            <div class="shortcut-text">
                                <span class="shortcut-title">Kho <strong id="shortcut-exam-count">${counts.exams}</strong> đề thi</span>
                                <span class="shortcut-desc">TSA, HSA, THPT có bấm giờ & lời giải</span>
                            </div>
                        </button>
                        <button class="quick-shortcut-btn" onclick="PumkinRouter.navigate('formulas')" aria-label="Mở sổ tay tra cứu công thức">
                            <span class="shortcut-icon" aria-hidden="true">📐</span>
                            <div class="shortcut-text">
                                <span class="shortcut-title">Sổ tay <strong id="shortcut-formula-count">${counts.formulas}</strong> công thức</span>
                                <span class="shortcut-desc">Tra cứu nhanh lý thuyết & giải toán</span>
                            </div>
                        </button>
                        <button class="quick-shortcut-btn" onclick="PumkinRouter.navigate('knowledge')" aria-label="Mở kho 27 chuyên đề kiến thức">
                            <span class="shortcut-icon" aria-hidden="true">🧠</span>
                            <div class="shortcut-text">
                                <span class="shortcut-title">Kho <strong id="shortcut-knowledge-count">${counts.knowledge}</strong> chuyên đề</span>
                                <span class="shortcut-desc">Lý thuyết cốt lõi & ví dụ từng bước</span>
                            </div>
                        </button>
                    </div>
                </div>
            `;
        },

        /**
         * Dynamically update counts on shortcut cards when data is hydrated
         */
        updateShortcutCounts() {
            const counts = this.getShortcutCounts();
            const exEl = document.getElementById("shortcut-exam-count");
            const foEl = document.getElementById("shortcut-formula-count");
            const knEl = document.getElementById("shortcut-knowledge-count");
            if (exEl) exEl.textContent = counts.exams;
            if (foEl) foEl.textContent = counts.formulas;
            if (knEl) knEl.textContent = counts.knowledge;
        },

        /**
         * Toggle the "Khám phá thêm" Resource Hub drawer / section
         */
        toggleResourceHub() {
            const hub = document.getElementById("dashboard-resource-hub");
            const btn = document.getElementById("btn-toggle-resource-hub");
            if (!hub) return;

            const isHidden = hub.style.display === "none" || !hub.style.display;
            if (isHidden) {
                hub.style.display = "block";
                if (btn) btn.innerHTML = "📂 Thu gọn kho tài nguyên chi tiết ▲";
                hub.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                hub.style.display = "none";
                if (btn) btn.innerHTML = "📂 Khám phá thêm (Kho đề, Sổ tay, Báo cáo kỹ năng chi tiết) ▼";
            }
        },

        openResourceHub() {
            const hub = document.getElementById("dashboard-resource-hub");
            const btn = document.getElementById("btn-toggle-resource-hub");
            if (!hub) return;
            hub.style.display = "block";
            if (btn) btn.innerHTML = "📂 Thu gọn kho tài nguyên chi tiết ▲";
            hub.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    // Primary Namespace
    if (typeof window !== 'undefined') {
        window.Pumkin = window.Pumkin || {};
        window.Pumkin.JourneyManager = PumkinJourneyManager;
        // DEPRECATED: Backward compatibility shim
        window.PumkinJourneyManager = PumkinJourneyManager;
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = PumkinJourneyManager;
    }
})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
