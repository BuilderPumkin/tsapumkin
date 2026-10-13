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
        const query = (document.getElementById("lib-search-input")?.value || "").toLowerCase().trim();
        const year = document.getElementById("lib-year-select")?.value || "all";
        const diff = document.getElementById("lib-diff-select")?.value || "all";

        const allExams = PumkinStorage.getExams();
        const filtered = allExams.filter(exam => {
            if (this.typeFilter !== "all" && exam.type !== this.typeFilter) return false;
            if (year !== "all" && exam.year.toString() !== year) return false;
            if (diff !== "all" && exam.difficulty !== diff) return false;
            if (query) {
                const matchTitle = exam.title.toLowerCase().includes(query);
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
