/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.SkillProfile
 * Layer: Cognitive & Diagnostic Analytics
 * Description: Mathematics Skill Profile & Mastery Engine (BKT & Radar Profile)
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

const PumkinSkillProfile = {
    SKILL_DEFS: {
        "skill_reasoning": { name: "Tư duy & Suy luận toán học", icon: "🧠", color: "#3b82f6" },
        "skill_calculation": { name: "Tính toán & Đại số chuẩn xác", icon: "🔢", color: "#10b981" },
        "skill_modeling": { name: "Mô hình hóa thực tế", icon: "🌐", color: "#f59e0b" },
        "skill_spatial": { name: "Trực giác hình học & Oxyz", icon: "📐", color: "#8b5cf6" },
        "skill_probability": { name: "Xác suất & Thống kê", icon: "🎲", color: "#ec4899" },
        "skill_data_analysis": { name: "Phân tích số liệu & Biểu đồ", icon: "📊", color: "#06b6d4" }
    },

    getProfile() {
        return this.computeProfile();
    },

    computeProfile() {
        const trace = PumkinLearningTrace.getTrace();
        const profile = {
            totalAttempts: trace.length,
            totalCorrect: 0,
            overallAccuracy: 0,
            avgTimeSeconds: 0,
            skills: {},
            topics: {},
            errorStats: {
                careless_mistake: 0,
                knowledge_gap: 0,
                reasoning_error: 0,
                calculation_error: 0,
                time_management: 0,
                concept_confusion: 0
            },
            strengths: [],
            weaknesses: [],
            misconceptions: {},
            systemicErrors: [],
            hasSystemicErrors: false,
            trend: "Ổn định →"
        };

        // Initialize 6 skills
        Object.keys(this.SKILL_DEFS).forEach(k => {
            profile.skills[k] = { total: 0, correct: 0, accuracy: 0, totalTime: 0 };
        });

        if (trace.length === 0) {
            return profile;
        }

        let sumTime = 0;
        trace.forEach(item => {
            if (item.isCorrect) profile.totalCorrect++;
            sumTime += (item.timeSpentSeconds || 0);

            // Skill aggregation
            const sList = Array.isArray(item.skills) && item.skills.length > 0 ? item.skills : ["skill_reasoning"];
            sList.forEach(sId => {
                if (!profile.skills[sId]) {
                    profile.skills[sId] = { total: 0, correct: 0, accuracy: 0, totalTime: 0 };
                }
                profile.skills[sId].total++;
                if (item.isCorrect) profile.skills[sId].correct++;
                profile.skills[sId].totalTime += (item.timeSpentSeconds || 0);
            });

            // Topic aggregation
            const top = item.topic || "Khác";
            if (!profile.topics[top]) {
                profile.topics[top] = { total: 0, correct: 0, accuracy: 0 };
            }
            profile.topics[top].total++;
            if (item.isCorrect) profile.topics[top].correct++;

            // Error stats
            if (!item.isCorrect && item.error_type && profile.errorStats[item.error_type] !== undefined) {
                profile.errorStats[item.error_type]++;
            }

            // Distractor-driven misconception aggregation
            if (!item.isCorrect) {
                const mId = item.misconception_id || (item.classification && item.classification.misconceptionId);
                if (mId) {
                    if (!profile.misconceptions[mId]) {
                        const mDef = (typeof PumkinErrorClassifier !== 'undefined' && PumkinErrorClassifier.getMisconception)
                            ? PumkinErrorClassifier.getMisconception(mId)
                            : null;
                        profile.misconceptions[mId] = {
                            id: mId,
                            name: mDef ? mDef.name : mId,
                            count: 0,
                            severity: mDef ? mDef.severity : "medium",
                            skillIds: mDef ? mDef.skillIds : ["skill_reasoning"],
                            remediationHint: mDef ? mDef.remediationHint : ""
                        };
                    }
                    profile.misconceptions[mId].count++;
                }
            }
        });

        profile.overallAccuracy = Math.round((profile.totalCorrect / profile.totalAttempts) * 100);
        profile.avgTimeSeconds = Math.round(sumTime / profile.totalAttempts);

        // Calculate skill accuracies
        Object.keys(profile.skills).forEach(k => {
            const s = profile.skills[k];
            s.accuracy = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
        });

        // Calculate topic accuracies
        Object.keys(profile.topics).forEach(t => {
            const top = profile.topics[t];
            top.accuracy = top.total > 0 ? Math.round((top.correct / top.total) * 100) : 0;
            if (top.total >= 3) {
                if (top.accuracy >= 70) {
                    profile.strengths.push({ topic: t, accuracy: top.accuracy, total: top.total });
                } else if (top.accuracy < 60) {
                    profile.weaknesses.push({ topic: t, accuracy: top.accuracy, total: top.total });
                }
            }
        });

        profile.strengths.sort((a, b) => b.accuracy - a.accuracy);
        profile.weaknesses.sort((a, b) => a.accuracy - b.accuracy);

        // Trend calculation (recent 20 vs previous 20)
        if (trace.length >= 10) {
            const half = Math.floor(trace.length / 2);
            const recent = trace.slice(0, half);
            const older = trace.slice(half);

            const recentAcc = recent.filter(t => t.isCorrect).length / recent.length;
            const olderAcc = older.filter(t => t.isCorrect).length / older.length;
            const diff = recentAcc - olderAcc;

            if (diff >= 0.08) profile.trend = "Cải thiện rõ rệt ↗";
            else if (diff <= -0.08) profile.trend = "Cần tăng tốc ↘";
            else profile.trend = "Ổn định →";
        }

        // Systemic Repeated Error Detection:
        // Window of recent 10 attempts: same misconception >= 2 times => flag is_systemic_error: true
        const recentWindow = trace.slice(0, 10);
        const recentMisconceptionCounts = {};
        recentWindow.forEach(item => {
            if (item.isCorrect) return;
            const mId = item.misconception_id || (item.classification && item.classification.misconceptionId);
            if (mId) {
                recentMisconceptionCounts[mId] = (recentMisconceptionCounts[mId] || 0) + 1;
            }
        });

        Object.keys(recentMisconceptionCounts).forEach(mId => {
            const count = recentMisconceptionCounts[mId];
            if (count >= 2) {
                const mDef = (typeof PumkinErrorClassifier !== 'undefined' && PumkinErrorClassifier.getMisconception)
                    ? PumkinErrorClassifier.getMisconception(mId)
                    : null;
                profile.systemicErrors.push({
                    misconceptionId: mId,
                    name: mDef ? mDef.name : mId,
                    count: count,
                    windowSize: recentWindow.length,
                    severity: mDef ? mDef.severity : "high",
                    skillIds: mDef ? mDef.skillIds : ["skill_reasoning"],
                    is_systemic_error: true,
                    priority: "CRITICAL_REVIEW",
                    remediationHint: mDef ? mDef.remediationHint : "Cần ôn tập và luyện tập chuyên sâu dạng bài này để khắc phục lỗi hệ thống."
                });
            }
        });
        profile.hasSystemicErrors = profile.systemicErrors.length > 0;

        return profile;
    },

    renderSkillProfile() {
        const profile = this.computeProfile();

        // 1. Render Skill Bars Grid
        const grid = document.getElementById("dashboard-skill-bars-grid");
        if (grid) {
            grid.innerHTML = Object.keys(this.SKILL_DEFS).map(k => {
                const def = this.SKILL_DEFS[k];
                const data = profile.skills[k] || { total: 0, correct: 0, accuracy: 0 };
                return `
                    <div class="skill-card">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <span style="font-weight: 700; font-size: 13.5px; display: flex; align-items: center; gap: 6px;">
                                <span>${def.icon}</span> <span>${def.name}</span>
                            </span>
                            <span style="font-weight: 800; font-size: 14px; color: ${def.color};">${data.accuracy}%</span>
                        </div>
                        <div style="background: var(--border-color, #e2e8f0); height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 6px;">
                            <div style="background: ${def.color}; width: ${data.accuracy}%; height: 100%; border-radius: 4px; transition: width 0.6s ease;"></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 11.5px; color: var(--text-muted);">
                            <span>Số câu làm: ${data.total}</span>
                            <span>Đúng: ${data.correct}/${data.total}</span>
                        </div>
                    </div>
                `;
            }).join("");
        }

        // 2. Trend Badge
        const trendBadge = document.getElementById("skill-trend-badge");
        if (trendBadge) {
            trendBadge.textContent = `Xu hướng: ${profile.trend}`;
            const isDark = document.body.classList.contains("dark-mode");
            if (profile.trend.includes("↗")) {
                trendBadge.style.color = isDark ? "#34d399" : "#059669";
                trendBadge.style.borderColor = isDark ? "rgba(16, 185, 129, 0.4)" : "#a7f3d0";
                trendBadge.style.background = isDark ? "rgba(16, 185, 129, 0.15)" : "#ecfdf5";
            } else if (profile.trend.includes("↘")) {
                trendBadge.style.color = isDark ? "#f87171" : "#dc2626";
                trendBadge.style.borderColor = isDark ? "rgba(239, 68, 68, 0.4)" : "#fecaca";
                trendBadge.style.background = isDark ? "rgba(239, 68, 68, 0.15)" : "#fef2f2";
            } else {
                trendBadge.style.color = isDark ? "#93c5fd" : "var(--primary)";
                trendBadge.style.borderColor = isDark ? "#334155" : "#bfdbfe";
                trendBadge.style.background = isDark ? "#1e293b" : "#eff6ff";
            }
        }

        // 3. Strengths List
        const strengthsList = document.getElementById("skill-strengths-list");
        if (strengthsList) {
            if (profile.strengths.length === 0) {
                strengthsList.innerHTML = `<p style="color: var(--text-muted); font-size: 13px; margin: 0;">Làm thêm ít nhất 1 đề để hệ thống ghi nhận điểm mạnh cốt lõi của bạn.</p>`;
            } else {
                strengthsList.innerHTML = profile.strengths.slice(0, 4).map(s => `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px dashed var(--border-color, #e2e8f0);">
                        <span style="font-weight: 600;">✓ ${s.topic}</span>
                        <span style="color: var(--success, #059669); font-weight: 700;">${s.accuracy}% (${s.total} câu)</span>
                    </div>
                `).join("");
            }
        }

        // 4. Weaknesses List
        const weaknessesList = document.getElementById("skill-weaknesses-list");
        if (weaknessesList) {
            if (profile.weaknesses.length === 0) {
                weaknessesList.innerHTML = `<p style="color: var(--success, #059669); font-size: 13px; margin: 0;">Chưa ghi nhận lỗ hổng đáng kể. Hãy thử sức các đề thi mức độ Vận dụng cao!</p>`;
            } else {
                weaknessesList.innerHTML = profile.weaknesses.slice(0, 4).map(w => `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px dashed var(--border-color, #e2e8f0);">
                        <span style="font-weight: 600;">⚠️ ${w.topic}</span>
                        <span style="color: var(--danger, #dc2626); font-weight: 700;">${w.accuracy}% (${w.total} câu)</span>
                    </div>
                `).join("");
            }
        }

        // 5. Error Distribution Breakdown
        const errContainer = document.getElementById("skill-error-distribution");
        if (errContainer) {
            errContainer.innerHTML = Object.keys(profile.errorStats).map(typeKey => {
                const count = profile.errorStats[typeKey];
                const def = PumkinErrorClassifier.ERROR_TYPES[typeKey] || { name: typeKey, icon: "⚠️", color: "#64748b" };
                return `
                    <div class="error-pill" style="display: flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 20px; font-size: 12.5px;">
                        <span>${def.icon}</span>
                        <span style="font-weight: 600; color: var(--text-color);">${def.name}:</span>
                        <span style="font-weight: 800; color: ${def.color};">${count}</span>
                    </div>
                `;
            }).join("");
        }

        // 6. Systemic Errors Banner (if container exists)
        const systemicContainer = document.getElementById("skill-systemic-errors");
        if (systemicContainer) {
            if (profile.hasSystemicErrors) {
                systemicContainer.style.display = "block";
                systemicContainer.innerHTML = `
                    <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; border-radius: 8px; padding: 12px; margin-bottom: 12px;">
                        <div style="font-weight: 700; color: #dc2626; display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
                            <span>⚠️</span> <span>Cảnh báo Lỗi Hệ Thống (Lặp lại ≥ 2 lần gần đây)</span>
                        </div>
                        ${profile.systemicErrors.map(e => `
                            <div style="font-size: 13px; margin-top: 4px; color: var(--text-color);">
                                <strong>${e.name}</strong> (${e.count} lần): ${e.remediationHint}
                            </div>
                        `).join("")}
                    </div>
                `;
            } else {
                systemicContainer.style.display = "none";
                systemicContainer.innerHTML = "";
            }
        }

        // 7. Update Recommendations via RecommendationEngine
        if (typeof PumkinRecommendationEngine !== "undefined" && PumkinRecommendationEngine.generateRecommendations) {
            PumkinRecommendationEngine.generateRecommendations(profile);
        }
    }
};

    // Primary Namespace
    if (typeof window !== 'undefined') {
        window.Pumkin = window.Pumkin || {};
        window.Pumkin.SkillProfile = PumkinSkillProfile;
        // // DEPRECATED: Backward compatibility shim
        window.PumkinSkillProfile = PumkinSkillProfile;
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = PumkinSkillProfile;
    }
})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
