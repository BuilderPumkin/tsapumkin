/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.Bookmarks
 * Layer: Assessment & Revision
 * Description: Question Bookmarking, Filtering, and Drill Generation
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

const PumkinBookmarks = {
    activeFilter: "all",

    updateBadge() {
        const bms = PumkinStorage.getBookmarks();
        const badge = document.getElementById("nav-bookmark-count");
        if (badge) {
            badge.textContent = bms.length;
            badge.style.display = bms.length > 0 ? "inline-block" : "none";
        }
        this.updateCounts();
    },

    updateCounts() {
        const details = PumkinStorage.getBookmarkDetails();
        const counts = {
            all: details.length,
            "chưa hiểu": 0,
            "hay sai": 0,
            "câu hay": 0,
            "muốn học lại": 0,
            "câu khó": 0
        };
        details.forEach(item => {
            const r = (item.reason || "chưa hiểu").toLowerCase().trim();
            if (counts[r] !== undefined) counts[r]++;
            else counts["chưa hiểu"]++;
        });

        const map = {
            "bm-count-all": counts.all,
            "bm-count-chuahieu": counts["chưa hiểu"],
            "bm-count-haysai": counts["hay sai"],
            "bm-count-cauhay": counts["câu hay"],
            "bm-count-hoclai": counts["muốn học lại"],
            "bm-count-caukho": counts["câu khó"]
        };
        for (const [elId, count] of Object.entries(map)) {
            const el = document.getElementById(elId);
            if (el) el.textContent = count;
        }
    },

    filterBookmarks(reason, btn) {
        this.activeFilter = reason;
        const buttons = document.querySelectorAll("#view-bookmarks .filter-pill");
        buttons.forEach(b => b.classList.remove("active"));
        if (btn) btn.classList.add("active");
        this.render();
    },

    render() {
        this.updateBadge();
        const container = document.getElementById("bookmarks-list-container");
        if (!container) return;

        const details = PumkinStorage.getBookmarkDetails();
        if (details.length === 0) {
            container.innerHTML = `
                <div style="background: var(--card-bg, white); border: 1px solid var(--border-color); border-radius: 12px; padding: 40px; text-align: center;">
                    <div style="font-size: 44px; margin-bottom: 12px;">🔖</div>
                    <h3 style="color: var(--primary); margin-bottom: 10px;">Chưa có câu hỏi nào được lưu</h3>
                    <p style="color: var(--text-muted); font-size: 14px;">Trong quá trình làm bài hoặc xem ngân hàng câu hỏi, hãy bấm <strong>"Lưu câu này"</strong> để đưa vào danh mục ôn tập trọng tâm.</p>
                </div>
            `;
            return;
        }

        const filtered = this.activeFilter === "all"
            ? details
            : details.filter(item => (item.reason || "chưa hiểu").toLowerCase().trim() === this.activeFilter.toLowerCase().trim());

        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="background: var(--card-bg, white); border: 1px dashed var(--border-color); border-radius: 12px; padding: 32px; text-align: center; color: var(--text-muted);">
                    <p>Không có câu hỏi nào trong danh mục <strong>"${this.activeFilter}"</strong>.</p>
                </div>
            `;
            return;
        }

        const letters = ["A", "B", "C", "D"];
        const reasonLabels = [
            { id: "chưa hiểu", label: "❓ Chưa hiểu" },
            { id: "hay sai", label: "⚠️ Hay sai" },
            { id: "câu hay", label: "⭐ Câu hay" },
            { id: "muốn học lại", label: "🔄 Muốn học lại" },
            { id: "câu khó", label: "🔥 Câu khó" }
        ];

        container.innerHTML = filtered.map((item, idx) => {
            const q = PumkinStorage.getQuestionById(item.id);
            if (!q) return "";
            const currentReason = item.reason || "chưa hiểu";

            // Question DNA badges
            const cognitiveBadge = q.cognitive_level ? `<span class="dna-pill dna-pill-cognitive">🧠 ${q.cognitive_level}</span>` : '';
            const skillBadges = (q.skills || []).map(s => `<span class="dna-pill">⚡ ${s}</span>`).join(" ");

            return `
                <div class="review-card" style="border-left: 5px solid var(--warning); margin-bottom: 18px;">
                    <div class="review-status-header" style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; flex-wrap: wrap;">
                        <div>
                            <span class="question-number-badge">CÂU ${idx + 1}</span>
                            <span style="font-size: 12.5px; color: var(--text-muted); margin-left: 8px;">${q.topic} • ${q.difficulty}</span>
                            <div style="margin-top: 6px; display: flex; gap: 6px; flex-wrap: wrap;">
                                ${cognitiveBadge}
                                ${skillBadges}
                            </div>
                        </div>
                        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                            <label style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Phân loại:</label>
                            <select class="form-control" style="font-size: 12px; padding: 4px 8px; border-radius: 6px; width: auto; display: inline-block;" onchange="PumkinStorage.setBookmarkReason('${q.id}', this.value)">
                                ${reasonLabels.map(r => `<option value="${r.id}" ${r.id === currentReason ? "selected" : ""}>${r.label}</option>`).join("")}
                            </select>
                            <button class="btn btn-sm btn-outline" style="color: var(--danger); border-color: var(--danger);" onclick="PumkinBookmarks.removeBookmark('${q.id}')">
                                🗑️ Xóa
                            </button>
                        </div>
                    </div>

                    <div style="font-size: 15px; margin: 14px 0; line-height: 1.6;">
                        ${q.question_text || q.question || q.content || ""}
                    </div>

                    ${Array.isArray(q.options) && q.options.length > 0 ? `
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 8px; margin-bottom: 14px;">
                        ${q.options.map((opt, oIdx) => `
                            <div class="review-opt-card ${oIdx === q.correct_answer ? 'review-opt-correct' : ''}" style="padding: 8px 12px; border-radius: 6px; font-size: 13.5px; border: 1px solid var(--border-color);">
                                <strong>${letters[oIdx]}.</strong> ${opt}
                                ${oIdx === q.correct_answer ? ' <span style="color: var(--success); font-weight: 700;">✓</span>' : ''}
                            </div>
                        `).join("")}
                    </div>` : ''}

                    ${q.common_traps && q.common_traps.length > 0 ? `
                    <div class="common-traps-box" style="margin-bottom: 12px; font-size: 13px;">
                        <strong>⚠️ Bẫy tư duy thường gặp:</strong>
                        <ul style="margin: 4px 0 0 16px; padding: 0;">
                            ${q.common_traps.map(t => `<li>${t}</li>`).join("")}
                        </ul>
                    </div>` : ''}

                    <details class="explanation-card" style="cursor: pointer;">
                        <summary class="explanation-title" style="margin-bottom: 0;">
                            <span>💡</span> Xem lời giải chi tiết & Phương pháp
                        </summary>
                        <div style="margin-top: 12px; line-height: 1.65;">
                            ${q.explanation || "Chưa có lời giải chi tiết."}
                        </div>
                    </details>
                </div>
            `;
        }).join("");

        if (window.Pumkin && window.Pumkin.Math) {
            window.Pumkin.Math.renderElement(container);
        } else if (window.PumkinMath) {
            window.PumkinMath.typeset(container);
        }
    },

    removeBookmark(qId) {
        PumkinStorage.toggleBookmark(qId);
        this.render();
    },

    practiceSavedQuestions() {
        const details = PumkinStorage.getBookmarkDetails();
        if (details.length === 0) {
            PumkinToast.info("Bạn chưa lưu câu hỏi nào để luyện tập!");
            return;
        }

        const filtered = this.activeFilter === "all"
            ? details
            : details.filter(item => (item.reason || "chưa hiểu").toLowerCase().trim() === this.activeFilter.toLowerCase().trim());

        const questions = filtered.map(item => PumkinStorage.getQuestionById(item.id)).filter(q => q !== null);
        if (questions.length === 0) {
            PumkinToast.info(`Không có câu hỏi nào trong danh mục '${this.activeFilter}' để luyện tập.`);
            return;
        }

        const exam = {
            id: "saved_drill_" + Date.now(),
            title: `Luyện Tập Câu Đã Lưu (${this.activeFilter === "all" ? "Tất cả" : this.activeFilter}) - ${questions.length} câu`,
            type: "Ôn tập chuyên đề",
            year: 2025,
            duration_minutes: Math.max(10, questions.length * 2),
            questions: questions,
            difficulty: "Trọng tâm",
            source: "Kho câu hỏi lưu trữ cá nhân",
            description: `Đề ôn tập tùy biến tập trung vào ${questions.length} câu hỏi theo tiêu chí '${this.activeFilter}'.`
        };

        PumkinPlayer.startExam(exam.id, true, exam);
    }
};


    // Primary Namespace
    window.Pumkin.Bookmarks = PumkinBookmarks;

    // // DEPRECATED: Backward compatibility shim
    window.PumkinBookmarks = PumkinBookmarks;
})(window);
