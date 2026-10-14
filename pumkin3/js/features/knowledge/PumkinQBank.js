/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.QBank
 * Layer: Content Repository
 * Description: Centralized Question Bank Browser, Search, Filter & Drill Dispatch
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

const PumkinQBank = {
    currentPage: 1,
    pageSize: 20,
    _currentFiltered: [],

    onSearchInput: PumkinPerf.debounce(function() {
        PumkinQBank.applyFilters();
    }, 250),

    render() {
        this.currentPage = 1;
        this.applyFilters();
    },

    applyFilters() {
        const container = document.getElementById("qbank-list-container");
        const countLabel = document.getElementById("qbank-count-label");
        if (!container) return;

        const allQuestions = PumkinStorage.getQuestions();

        // 1. Loading & Error States when dataset is empty
        if (!allQuestions || allQuestions.length === 0) {
            if (typeof PumkinStorage !== "undefined" && typeof PumkinStorage.isHydrated === "function" && !PumkinStorage.isHydrated()) {
                container.innerHTML = `
                    <div class="pumkin-loading-state" style="text-align: center; padding: 40px; color: var(--text-muted);">
                        <span style="font-size: 28px; display: block; margin-bottom: 8px;">⏳</span>
                        <p style="font-size: 15px; margin: 0; font-weight: 500;">Đang nạp ngân hàng câu hỏi...</p>
                    </div>
                `;
                if (countLabel) countLabel.textContent = "0";
                return;
            } else {
                const retryBtnId = "btn-retry-qbank-" + Date.now();
                container.innerHTML = `
                    <div class="pumkin-error-state" style="text-align: center; padding: 40px; color: var(--danger, #ef4444);">
                        <p style="font-size: 15px; margin-bottom: 14px;">⚠️ Không thể nạp ngân hàng câu hỏi từ máy chủ.</p>
                        <button id="${retryBtnId}" class="btn btn-primary btn-sm" style="min-height: 44px; padding: 10px 24px; border-radius: 8px; font-weight: 600;">
                            🔄 Thử lại
                        </button>
                    </div>
                `;
                const retryBtn = document.getElementById(retryBtnId);
                if (retryBtn) {
                    retryBtn.addEventListener("click", async () => {
                        container.innerHTML = `<div class="pumkin-loading-state" style="text-align: center; padding: 40px; color: var(--text-muted);">⏳ Đang thử lại...</div>`;
                        if (typeof PumkinStorage !== 'undefined') await PumkinStorage.init();
                        PumkinQBank.applyFilters();
                    });
                }
                if (countLabel) countLabel.textContent = "0";
                return;
            }
        }

        const rawExam = document.getElementById("qbank-exam-filter")?.value ? document.getElementById("qbank-exam-filter").value.trim() : "all";
        const examFilter = (rawExam === "" || rawExam === "all") ? "all" : rawExam;
        const rawType = document.getElementById("qbank-type-filter")?.value ? document.getElementById("qbank-type-filter").value.trim() : "all";
        const typeFilter = (rawType === "" || rawType === "all") ? "all" : rawType;
        const rawDiff = document.getElementById("qbank-diff-filter")?.value ? document.getElementById("qbank-diff-filter").value.trim() : "all";
        const diffFilter = (rawDiff === "" || rawDiff === "all") ? "all" : rawDiff;
        const query = document.getElementById("qbank-search-input")?.value ? document.getElementById("qbank-search-input").value.toLowerCase().trim() : "";

        this._currentFiltered = allQuestions.filter(q => {
            if (examFilter !== "all" && q.exam_type !== examFilter) return false;
            if (typeFilter !== "all") {
                const qType = q.type || "single_choice";
                if (qType !== typeFilter) return false;
            }
            if (diffFilter !== "all" && q.difficulty !== diffFilter) return false;
            if (query) {
                const textMatch = q.question_text && q.question_text.toLowerCase().includes(query);
                const topicMatch = q.topic && q.topic.toLowerCase().includes(query);
                const subtopicMatch = q.subtopic && q.subtopic.toLowerCase().includes(query);
                if (!textMatch && !topicMatch && !subtopicMatch) return false;
            }
            return true;
        });

        if (countLabel) countLabel.textContent = this._currentFiltered.length;
        this.currentPage = 1;
        this.renderPage();
    },

    goToPage(page) {
        const totalPages = Math.ceil(this._currentFiltered.length / this.pageSize) || 1;
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        this.currentPage = page;
        this.renderPage();
        const container = document.getElementById("qbank-list-container");
        if (container) {
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    renderPage() {
        const container = document.getElementById("qbank-list-container");
        if (!container) return;

        const filtered = this._currentFiltered;
        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="qbank-empty-state" style="text-align: center; padding: 40px; border-radius: 8px;">
                    🔍 Không tìm thấy câu hỏi nào phù hợp với bộ lọc hiện tại. Vui lòng chọn tiêu chí khác!
                </div>
            `;
            return;
        }

        const totalPages = Math.ceil(filtered.length / this.pageSize) || 1;
        const startIdx = (this.currentPage - 1) * this.pageSize;
        const toShow = filtered.slice(startIdx, startIdx + this.pageSize);

        let cardsHtml = toShow.map((q, idx) => {
            const actualNumber = startIdx + idx + 1;
            const isBookmarked = PumkinStorage.isBookmarked(q.id);
            const qType = q.type || "single_choice";
            const examBadge = q.exam_type === "TSA" ? "badge-tsa" : (q.exam_type === "HSA" ? "badge-hsa" : "badge-thpt");

            let typeLabel = "Trắc nghiệm";
            if (qType === "true_false_group") typeLabel = "Đúng/Sai chùm";
            else if (qType === "short_answer") typeLabel = "Điền số";
            else if (qType === "drag_drop") typeLabel = "Kéo thả ô trống";
            else if (qType === "step_solution") typeLabel = "Tự luận barem";

            return `
                <div class="qbank-card" id="qbank-card-${q.id}">
                    <div class="qbank-card-header">
                        <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
                            <span class="badge-tag ${examBadge}">${q.exam_type || 'TOÁN'}</span>
                            <span class="badge-tag badge-type-label">${typeLabel}</span>
                            <span class="badge-tag badge-thpt">${q.difficulty || 'Trung bình'}</span>
                            <span style="font-size: 12.5px; color: var(--text-muted); margin-left: 4px;">ID: <code>${q.id}</code></span>
                        </div>
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <button class="btn btn-sm ${isBookmarked ? 'btn-danger' : 'btn-outline'}" onclick="PumkinQBank.toggleBookmark('${q.id}', this)">
                                ${isBookmarked ? '★ Đã lưu' : '☆ Lưu câu'}
                            </button>
                            <button class="btn btn-sm btn-primary" onclick="PumkinQBank.practiceSingleQuestion('${q.id}')">
                                🎯 Luyện ngay
                            </button>
                        </div>
                    </div>

                    <div class="qbank-prompt">
                        <strong>Câu ${actualNumber}:</strong> ${q.question_text || q.question}
                    </div>

                    ${q.options && q.options.length > 0 ? `
                        <div class="qbank-options-preview">
                            ${q.options.map((opt, oIdx) => `
                                <div class="qbank-option-pill">
                                    <strong>${['A','B','C','D','E'][oIdx]}.</strong> ${opt}
                                </div>
                            `).join("")}
                        </div>
                    ` : ''}

                    ${q.items && q.items.length > 0 ? `
                        <div class="qbank-options-preview">
                            ${q.items.map(it => `
                                <div class="qbank-option-pill" style="width: 100%;">
                                    <strong>${it.label})</strong> ${it.text}
                                </div>
                            `).join("")}
                        </div>
                    ` : ''}

                    ${q.drag_items && q.drag_items.length > 0 ? `
                        <div class="qbank-options-preview" style="gap: 6px; flex-wrap: wrap;">
                            <span style="font-size: 12px; color: var(--text-muted); width: 100%; font-weight: 600;">Thẻ kéo thả:</span>
                            ${q.drag_items.map(it => `
                                <div class="qbank-option-pill qbank-drag-pill">
                                    ${it.text}
                                </div>
                            `).join("")}
                        </div>
                    ` : ''}

                    <details class="qbank-solution-accordion">
                        <summary>💡 Xem đáp án & Lời giải chi tiết</summary>
                        <div class="qbank-solution-body">
                            ${q.type === 'true_false_group' ? `
                                <div style="margin-bottom: 8px;">
                                    <strong>Đáp án:</strong>
                                    ${(q.items || []).map(it => `<code>${it.label}: ${it.correct ? 'ĐÚNG' : 'SAI'}</code>`).join(' | ')}
                                </div>
                            ` : (q.type === 'short_answer' ? `
                                <div style="margin-bottom: 8px;">
                                    <strong>Đáp số:</strong> <code>${q.correct_value}</code>
                                </div>
                            ` : (q.type === 'drag_drop' ? `
                                <div style="margin-bottom: 8px;">
                                    <strong>Đáp án ghép nối ô trống:</strong>
                                    ${(q.blanks || []).map((b, bIdx) => {
                                        const expectedItem = (q.drag_items || []).find(it => it.id === b.expected_item_id);
                                        return `<code>${b.label || `(${bIdx + 1})`}: ${expectedItem ? expectedItem.text : b.expected_item_id}</code>`;
                                    }).join(' | ')}
                                </div>
                            ` : `
                                <div style="margin-bottom: 8px;">
                                    <strong>Đáp án đúng:</strong> <code>${['A','B','C','D','E'][q.correct_answer] || 'Xem lời giải'}</code>
                                </div>
                            `))}
                            <div style="line-height: 1.65; color: inherit;">
                                ${q.explanation ? q.explanation.replace(/\n/g, '<br>') : 'Chưa có lời giải chi tiết.'}
                            </div>
                            ${q.knowledge_id ? `
                                <div style="margin-top: 10px; font-size: 12.5px;">
                                    <a href="javascript:void(0)" onclick="PumkinKnowledge.openArticle('${q.knowledge_id}')" style="color: var(--primary); font-weight: 700; text-decoration: none;">
                                        🧠 Xem chuyên đề lý thuyết liên quan →
                                    </a>
                                </div>
                            ` : ''}
                        </div>
                    </details>
                </div>
            `;
        }).join("");

        // Pagination bar
        let paginationHtml = "";
        if (totalPages > 1) {
            paginationHtml = `
                <div class="qbank-pagination-bar" style="display: flex; justify-content: center; align-items: center; gap: 8px; margin-top: 24px; padding: 12px; border-radius: 8px;">
                    <button class="btn btn-sm btn-outline" ${this.currentPage === 1 ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''} onclick="PumkinQBank.goToPage(${this.currentPage - 1})">
                        ◀ Trước
                    </button>
                    <span style="font-size: 14px; font-weight: 600; margin: 0 10px;">
                        Trang ${this.currentPage} / ${totalPages} (${filtered.length} câu)
                    </span>
                    <button class="btn btn-sm btn-outline" ${this.currentPage === totalPages ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''} onclick="PumkinQBank.goToPage(${this.currentPage + 1})">
                        Sau ▶
                    </button>
                </div>
            `;
        }

        container.innerHTML = cardsHtml + paginationHtml;

        if (window.Pumkin && window.Pumkin.Math) {
            window.Pumkin.Math.renderElement(container);
        } else if (window.PumkinMath) {
            window.PumkinMath.typeset(container);
        }
    },

    toggleBookmark(qId, btnElement) {
        const isNowBookmarked = PumkinStorage.toggleBookmark(qId);
        if (btnElement) {
            btnElement.textContent = isNowBookmarked ? "★ Đã lưu" : "☆ Lưu câu";
            btnElement.className = `btn btn-sm ${isNowBookmarked ? 'btn-danger' : 'btn-outline'}`;
        }
    },

    practiceSingleQuestion(qId) {
        const q = PumkinStorage.getQuestionById(qId);
        if (!q) return;

        const customExam = {
            id: `practice_${q.id}_${Date.now()}`,
            title: `Luyện tập độc lập: Câu ${q.id}`,
            description: `Thực hành đơn lẻ câu hỏi thuộc ${q.exam_type || 'kỳ thi'} (${q.topic || 'Toán học'}).`,
            duration_minutes: 5,
            exam_type: q.exam_type || "TOÁN",
            questions: [q]
        };

        PumkinPlayer.startExam(null, true, customExam);
    }
};

    // Primary Namespace
    window.Pumkin.QBank = PumkinQBank;

    // // DEPRECATED: Backward compatibility shim
    window.PumkinQBank = PumkinQBank;
})(window);
