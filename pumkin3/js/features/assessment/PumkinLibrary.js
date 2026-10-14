/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.Library
 * Layer: Assessment & Content Discovery
 * Description: Exam Catalog, Type Filters, and Exam Detail Modal
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

const PumkinLibrary = {
    typeFilter: "all",
    activeExamForModal: null,
    onSearchInput: PumkinPerf.debounce(function() {
        PumkinLibrary.applyFilters();
    }, 250),

    init() {
        this.render();
    },

    setTypeFilter(type, pillEl) {
        this.typeFilter = type;
        if (pillEl) {
            document.querySelectorAll("#lib-type-pills .filter-pill").forEach(p => p.classList.remove("active"));
            pillEl.classList.add("active");
        }
        this.applyFilters();
    },

    applyFilters() {
        const container = document.getElementById("exam-cards-grid");
        if (!container) return;

        const allExams = PumkinStorage.getExams();

        // 1. Loading & Error States when dataset is empty
        if (!allExams || allExams.length === 0) {
            if (typeof PumkinStorage !== "undefined" && typeof PumkinStorage.isHydrated === "function" && !PumkinStorage.isHydrated()) {
                container.innerHTML = `
                    <div class="pumkin-loading-state" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
                        <span style="font-size: 28px; display: block; margin-bottom: 8px;">⏳</span>
                        <p style="font-size: 15px; margin: 0; font-weight: 500;">Đang nạp danh mục đề thi...</p>
                    </div>
                `;
                return;
            } else {
                const retryBtnId = "btn-retry-library-" + Date.now();
                container.innerHTML = `
                    <div class="pumkin-error-state" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--danger, #ef4444);">
                        <p style="font-size: 15px; margin-bottom: 14px;">⚠️ Không thể tải danh sách đề thi từ máy chủ.</p>
                        <button id="${retryBtnId}" class="btn btn-primary btn-sm" style="min-height: 44px; padding: 10px 24px; border-radius: 8px; font-weight: 600;">
                            🔄 Thử lại
                        </button>
                    </div>
                `;
                const retryBtn = document.getElementById(retryBtnId);
                if (retryBtn) {
                    retryBtn.addEventListener("click", async () => {
                        container.innerHTML = `<div class="pumkin-loading-state" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">⏳ Đang thử lại...</div>`;
                        if (typeof PumkinStorage !== 'undefined') await PumkinStorage.init();
                        PumkinLibrary.applyFilters();
                    });
                }
                return;
            }
        }

        const query = (document.getElementById("lib-search-input")?.value || "").toLowerCase().trim();
        const yearEl = document.getElementById("lib-year-select");
        const diffEl = document.getElementById("lib-diff-select");
        const rawYear = yearEl && yearEl.value ? yearEl.value.trim() : "all";
        const year = (rawYear === "" || rawYear === "all") ? "all" : rawYear;
        const rawDiff = diffEl && diffEl.value ? diffEl.value.trim() : "all";
        const diff = (rawDiff === "" || rawDiff === "all") ? "all" : rawDiff;

        const filtered = allExams.filter(exam => {
            if (this.typeFilter !== "all" && exam.type !== this.typeFilter) return false;
            if (year !== "all" && String(exam.year || '') !== year) return false;
            if (diff !== "all" && exam.difficulty !== diff) return false;
            if (query) {
                const matchTitle = exam.title && exam.title.toLowerCase().includes(query);
                const matchSource = (exam.source || "").toLowerCase().includes(query);
                const matchDesc = (exam.description || "").toLowerCase().includes(query);
                if (!matchTitle && !matchSource && !matchDesc) return false;
            }
            return true;
        });

        this.renderCards(filtered);
    },

    render() {
        this.applyFilters();
    },

    renderCards(exams) {
        const container = document.getElementById("exam-cards-grid");
        if (!container) return;

        if (exams.length === 0) {
            container.innerHTML = `
                <div class="qbank-empty-state" style="grid-column: 1 / -1; text-align: center; padding: 40px; border-radius: 8px;">
                    <p style="font-size: 16px; margin-bottom: 10px;">Không tìm thấy đề thi phù hợp với bộ lọc hiện tại.</p>
                    <button class="btn btn-primary btn-sm" onclick="PumkinLibrary.resetFilters()">Xóa bộ lọc</button>
                </div>
            `;
            return;
        }

        container.innerHTML = exams.map(exam => {
            let typeBadgeClass = "badge-tsa";
            if (exam.type === "HSA") typeBadgeClass = "badge-hsa";
            if (exam.type === "THPT") typeBadgeClass = "badge-thpt";
            if (exam.type === "Giải tích 1") typeBadgeClass = "badge-calc";

            let diffClass = "diff-medium";
            if (exam.difficulty === "Dễ") diffClass = "diff-easy";
            if (exam.difficulty === "Khó") diffClass = "diff-hard";

            const qCount = exam.question_ids ? exam.question_ids.length : (exam.questions ? exam.questions.length : 0);

            return `
                <div class="exam-card">
                    <div>
                        <div class="exam-card-badge-row">
                            <span class="badge-tag ${typeBadgeClass}">${exam.type}</span>
                            <span class="badge-difficulty ${diffClass}">${exam.difficulty}</span>
                        </div>
                        <h4 class="exam-card-title">${exam.title}</h4>
                        <p class="exam-card-desc">${exam.description || "Đề thi chuẩn hóa có bấm giờ và giải chi tiết."}</p>
                    </div>

                    <div>
                        <div class="exam-card-meta">
                            <div class="exam-meta-item">📝 <span>${qCount} câu hỏi</span></div>
                            <div class="exam-meta-item">⏱️ <span>${exam.duration_minutes} phút</span></div>
                            <div class="exam-meta-item">📅 <span>Năm ${exam.year}</span></div>
                            <div class="exam-meta-item">👥 <span>${exam.attempts_count || 120} lượt thi</span></div>
                        </div>

                        <div class="exam-card-footer">
                            <span class="exam-source-tag" title="${exam.source || ''}">🏫 ${exam.source || 'PUMKIN.DEV'}</span>
                            <button class="btn btn-primary btn-sm" onclick="PumkinLibrary.openExamModal('${exam.id}')">
                                Làm đề
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join("");
    },

    resetFilters() {
        this.typeFilter = "all";
        document.querySelectorAll("#lib-type-pills .filter-pill").forEach((p, idx) => {
            if (idx === 0) p.classList.add("active");
            else p.classList.remove("active");
        });
        const sInput = document.getElementById("lib-search-input");
        if (sInput) sInput.value = "";
        const ySelect = document.getElementById("lib-year-select");
        if (ySelect) ySelect.value = "all";
        const dSelect = document.getElementById("lib-diff-select");
        if (dSelect) dSelect.value = "all";
        this.applyFilters();
    },

    openExamModal(examId) {
        const exam = PumkinStorage.getExamById(examId);
        if (!exam) return;

        this.activeExamForModal = exam;

        document.getElementById("modal-exam-title").textContent = exam.title;
        document.getElementById("modal-exam-desc").textContent = exam.description || "Đề thi đánh giá tư duy & năng lực chuẩn mực.";
        document.getElementById("modal-exam-type-badge").textContent = exam.type;
        document.getElementById("modal-exam-type-badge").className = `badge-tag badge-${exam.type === 'HSA' ? 'hsa' : exam.type === 'THPT' ? 'thpt' : exam.type === 'Giải tích 1' ? 'calc' : 'tsa'}`;
        
        const qCount = exam.question_ids ? exam.question_ids.length : (exam.questions ? exam.questions.length : 0);
        document.getElementById("modal-exam-qcount").textContent = `${qCount} câu hỏi`;
        document.getElementById("modal-exam-duration").textContent = `${exam.duration_minutes} phút`;
        document.getElementById("modal-exam-difficulty").textContent = exam.difficulty;
        document.getElementById("modal-exam-source").textContent = exam.source || "PUMKIN.DEV";

        const startBtn = document.getElementById("modal-start-exam-btn");
        startBtn.onclick = () => {
            this.closeModal();
            PumkinPlayer.startExam(exam.id);
        };

        const modal = document.getElementById("exam-detail-modal");
        if (modal) modal.classList.add("active");
    },

    closeModal() {
        const modal = document.getElementById("exam-detail-modal");
        if (modal) modal.classList.remove("active");
    }
};


    // Primary Namespace
    window.Pumkin.Library = PumkinLibrary;

    // // DEPRECATED: Backward compatibility shim
    window.PumkinLibrary = PumkinLibrary;
})(window);
