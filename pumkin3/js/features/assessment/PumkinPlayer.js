/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.Player
 * Layer: Assessment Engine (Exam Hall)
 * Description: Focused Exam Hall, Question Navigation, Timing, and State Management
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};


function toggleExamFullscreen() {
    if (!document.fullscreenElement) {
        const el = document.documentElement;
        if (el.requestFullscreen) {
            el.requestFullscreen().catch(() => {});
        } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
        } else if (el.msRequestFullscreen) {
            el.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}
window.toggleExamFullscreen = toggleExamFullscreen;

const PumkinPlayer = {
    examData: null,
    questions: [],
    currentIndex: 0,
    userAnswers: [], // Array of option index (0, 1, 2, 3) or null
    flagged: [],     // Array of booleans
    timeRemaining: 0,
    durationSeconds: 0,
    timerInterval: null,

    startExam(examId, isCustom = false, customExamObj = null) {
        let exam = customExamObj;
        if (!isCustom) {
            exam = PumkinStorage.getExamById(examId);
        }
        if (!exam) return;

        this.examData = exam;

        // Load Questions
        if (exam.questions && exam.questions.length > 0) {
            this.questions = exam.questions;
        } else if (exam.question_ids && exam.question_ids.length > 0) {
            this.questions = exam.question_ids
                .map(id => PumkinStorage.getQuestionById(id))
                .filter(q => q !== null);
        } else {
            PumkinToast.error("Đề thi chưa có câu hỏi khả dụng!");
            return;
        }

        // Initialize state
        this.currentIndex = 0;
        this.userAnswers = new Array(this.questions.length).fill(null);
        this.flagged = new Array(this.questions.length).fill(false);
        this.questionTimeSpent = new Array(this.questions.length).fill(0);
        this._lastSwitchTime = Date.now();
        this.durationSeconds = (exam.duration_minutes || 60) * 60;
        this.timeRemaining = this.durationSeconds;

        // Switch to Player View
        PumkinRouter.navigate("exam-player", () => {
            document.getElementById("player-exam-title").textContent = exam.title;
            this.initKeyboardListeners();
            this.renderQuestion(0);
            this.renderNavigator();
            this.startTimer();
            this.saveSession();
        });
    },

    initKeyboardListeners() {
        if (this._hasKeyListeners) return;
        this._hasKeyListeners = true;
        window.addEventListener("keydown", (e) => {
            if (PumkinRouter.currentView !== "exam-player") return;
            if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;

            const key = e.key.toUpperCase();
            const currentQ = this.questions[this.currentIndex];

            if (!currentQ.type || currentQ.type === "single_choice") {
                if (key === "1" || key === "A") this.selectOption(0);
                else if (key === "2" || key === "B") this.selectOption(1);
                else if (key === "3" || key === "C") this.selectOption(2);
                else if (key === "4" || key === "D") this.selectOption(3);
            }

            if (e.key === "ArrowLeft") {
                this.prevQuestion();
            } else if (e.key === "ArrowRight") {
                this.nextQuestion();
            } else if (key === "F") {
                this.toggleFlagCurrent();
            } else if (e.key === "Escape") {
                this.closeSubmitConfirm();
            }
        });
    },

    renderQuestion(index) {
        if (index < 0 || index >= this.questions.length) return;

        // Record time spent on previous question
        const now = Date.now();
        if (this._lastSwitchTime && this.currentIndex !== undefined && this.questionTimeSpent) {
            const elapsed = Math.max(1, Math.round((now - this._lastSwitchTime) / 1000));
            this.questionTimeSpent[this.currentIndex] = (this.questionTimeSpent[this.currentIndex] || 0) + elapsed;
        }
        this._lastSwitchTime = now;

        this.currentIndex = index;

        const q = this.questions[index];
        const total = this.questions.length;

        // Update progress text & badge
        document.getElementById("player-progress-text").textContent = `Đang làm: Câu ${index + 1} / ${total}`;
        document.getElementById("player-q-badge").textContent = `CÂU ${index + 1} / ${total}`;

        // Question Type Tag & DNA Badges
        let typeBadgeHtml = `<span class="q-type-badge q-type-single">Trắc nghiệm</span>`;
        if (q.type === "true_false_group") typeBadgeHtml = `<span class="q-type-badge q-type-tf">Đúng / Sai chùm</span>`;
        else if (q.type === "short_answer") typeBadgeHtml = `<span class="q-type-badge q-type-short">Điền đáp số</span>`;
        else if (q.type === "drag_drop") typeBadgeHtml = `<span class="q-type-badge q-type-drag">Kéo thả ô trống</span>`;
        else if (q.type === "step_solution") typeBadgeHtml = `<span class="q-type-badge q-type-step">Tự luận theo bước</span>`;

        const typeSlotEl = document.getElementById("player-q-type-container");
        if (typeSlotEl) {
            typeSlotEl.innerHTML = typeBadgeHtml;
        }

        const topicTagEl = document.getElementById("player-q-topic-tag");
        if (topicTagEl) {
            const sub = q.subtopic ? ` • ${q.subtopic}` : '';
            const diff = q.difficulty ? ` (${q.difficulty})` : '';
            topicTagEl.textContent = `${q.topic || 'Toán học'}${sub}${diff}`;
        }

        const dnaRowEl = document.getElementById("player-q-dna-row");
        if (dnaRowEl) {
            const cognitiveBadge = q.cognitive_level ? `<span class="dna-pill dna-pill-cognitive">🧠 ${q.cognitive_level}</span>` : '';
            const estTimeBadge = q.estimated_time_seconds ? `<span class="dna-pill">⏱️ ${q.estimated_time_seconds}s</span>` : '';
            const skillBadges = (q.skills || []).map(s => `<span class="dna-pill">⚡ ${s}</span>`).join(" ");
            dnaRowEl.innerHTML = `${cognitiveBadge} ${estTimeBadge} ${skillBadges}`.trim();
        }

        // Flag button state
        const flagBtn = document.getElementById("player-flag-btn");
        if (this.flagged[index]) {
            flagBtn.classList.add("flagged");
            flagBtn.innerHTML = `<span>⚑</span> <span>Đã đánh dấu</span>`;
        } else {
            flagBtn.classList.remove("flagged");
            flagBtn.innerHTML = `<span>⚑</span> <span>Đánh dấu</span>`;
        }

        // Question text
        const qText = q.question_text || q.question || q.content || "";
        document.getElementById("player-question-text").innerHTML = qText;

        const jsxContainer = document.getElementById("player-jsxgraph-container");
        if (jsxContainer && q.jsxgraph_config) {
            if (window.PumkinJSXGraph) {
                window.PumkinJSXGraph.render(q.jsxgraph_config, jsxContainer);
            } else {
                console.warn("PumkinJSXGraph module is not loaded yet.");
            }
        } else if (jsxContainer) {
            jsxContainer.innerHTML = "";
        }

        const optContainer = document.getElementById("player-options-container");

        // RENDER ACCORDING TO QUESTION TYPE
        if (q.type === "true_false_group") {
            const currentAns = (this.userAnswers[index] && typeof this.userAnswers[index] === "object") ? this.userAnswers[index] : {};
            optContainer.innerHTML = `
                <div class="tf-group-container">
                    <div style="font-size: 13.5px; font-weight: 700; color: var(--primary); margin-bottom: 6px;">
                        📌 Hãy xác định tính Đúng / Sai cho từng nhận định sau:
                    </div>
                    ${(q.items || []).map(item => {
                        const val = currentAns[item.label];
                        const hasAnswered = (val === true || val === false);
                        const statusPill = val === true 
                            ? `<span class="tf-item-status-pill status-true">✓ Đã chọn: Đúng</span>` 
                            : (val === false 
                                ? `<span class="tf-item-status-pill status-false">✗ Đã chọn: Sai</span>` 
                                : `<span class="tf-item-status-pill status-empty">○ Chưa chọn</span>`);
                        return `
                            <div class="tf-item-card ${hasAnswered ? 'tf-item-answered' : ''}" data-tf-label="${item.label}">
                                <div class="tf-item-content">
                                    <span class="tf-item-label">${item.label})</span>
                                    <div style="display: flex; flex-direction: column; gap: 4px; flex: 1;">
                                        <div class="tf-item-text">${item.text}</div>
                                        <div style="margin-top: 4px;">${statusPill}</div>
                                    </div>
                                </div>
                                <div class="tf-buttons-group">
                                    <button type="button" class="tf-btn tf-btn-true ${val === true ? 'active-true' : ''}" onclick="PumkinPlayer.selectTF('${item.label}', true)" title="Chọn nhận định này là Đúng">✓ Đúng</button>
                                    <button type="button" class="tf-btn tf-btn-false ${val === false ? 'active-false' : ''}" onclick="PumkinPlayer.selectTF('${item.label}', false)" title="Chọn nhận định này là Sai">✗ Sai</button>
                                </div>
                            </div>
                        `;
                    }).join("")}
                </div>
            `;
        } else if (q.type === "short_answer") {
            const currentVal = (typeof this.userAnswers[index] === "string") ? this.userAnswers[index] : "";
            optContainer.innerHTML = `
                <div class="short-answer-wrapper">
                    <label style="font-size: 14px; font-weight: 700; color: var(--primary);">
                        ✍️ Nhập kết quả số, phân số hoặc biểu thức của bạn:
                    </label>
                    <div class="short-answer-input-group">
                        <input type="text" id="short-answer-field" class="short-answer-input" 
                               placeholder="Ví dụ: 3,14 hoặc 3/4 hoặc x = 5..." 
                               value="${currentVal}" 
                               oninput="PumkinPlayer.inputShortAnswer(this.value)">
                        <button class="btn btn-primary" onclick="PumkinPlayer.nextQuestion()">Xác nhận →</button>
                    </div>
                    <div id="short-answer-preview" class="short-answer-preview" style="min-height: 28px; margin-top: 6px; display: none;"></div>
                    <div class="short-answer-helper" style="font-size: 12.5px; color: #64748b; margin-top: 6px;">
                        <span>💡 <em>Hệ thống tự động hiểu dấu phẩy thập phân (vd: 3,14), phân số (a/b), phương trình (x = 5), khoảng/tập nghiệm (vd: (1; 3)).</em></span>
                    </div>
                    <div class="math-pad-row" style="margin-top: 8px;">
                        <span style="font-size: 12px; color: #64748b; font-weight: 600;">Bàn phím phụ trợ:</span>
                        <button class="math-pad-btn" onclick="PumkinPlayer.insertMathPad('.')">.</button>
                        <button class="math-pad-btn" onclick="PumkinPlayer.insertMathPad(',')">,</button>
                        <button class="math-pad-btn" onclick="PumkinPlayer.insertMathPad('/')">/</button>
                        <button class="math-pad-btn" onclick="PumkinPlayer.insertMathPad('-')">-</button>
                        <button class="math-pad-btn" onclick="PumkinPlayer.insertMathPad('π')">π</button>
                        <button class="math-pad-btn" onclick="PumkinPlayer.insertMathPad('√')">√</button>
                        <button class="math-pad-btn" style="color: #dc2626;" onclick="PumkinPlayer.clearShortAnswer()">Xóa</button>
                    </div>
                </div>
            `;
            setTimeout(() => this.updateShortAnswerPreview(currentVal), 10);
        } else if (q.type === "drag_drop") {
            const currentAns = (this.userAnswers[index] && typeof this.userAnswers[index] === "object") ? this.userAnswers[index] : {};
            const blanks = q.blanks || [];
            const items = q.drag_items || [];
            const itemMap = new Map(items.map(it => [it.id, it]));

            let clozeHtml = q.cloze_text || q.question_text || q.question || "";
            blanks.forEach((b, bIdx) => {
                const placedItemId = currentAns[b.id];
                const placedItem = placedItemId ? itemMap.get(placedItemId) : null;
                const isFilled = !!placedItem;
                const slotNumber = b.label || `(${bIdx + 1})`;
                
                let slotContent = `<span class="drop-slot-placeholder">${slotNumber} <em>Kéo thả vào đây</em></span>`;
                if (isFilled) {
                    slotContent = `
                        <span class="drop-slot-filled-content">
                            <strong>${slotNumber}:</strong> ${placedItem.text || placedItem.content}
                            <span class="drop-slot-remove-btn" title="Tháo đáp án này" onclick="PumkinPlayer.removePlacedItem('${b.id}', event)">✕</span>
                        </span>
                    `;
                }

                const slotHtml = `
                    <span class="pumkin-drop-zone ${isFilled ? 'filled' : ''}" 
                          data-blank-id="${b.id}"
                          ondragover="PumkinPlayer.handleDragOver(event)"
                          ondragleave="PumkinPlayer.handleDragLeave(event)"
                          ondrop="PumkinPlayer.handleDrop(event, '${b.id}')"
                          onclick="PumkinPlayer.handleBlankSlotClick('${b.id}')">
                        ${slotContent}
                    </span>
                `;

                const placeholderRegex = new RegExp(`\\[${b.id}\\]|\\[blank_${bIdx + 1}\\]`, "g");
                if (placeholderRegex.test(clozeHtml)) {
                    clozeHtml = clozeHtml.replace(placeholderRegex, slotHtml);
                } else {
                    clozeHtml += `<div style="margin-top: 10px;"><strong>${slotNumber}:</strong> ${slotHtml}</div>`;
                }
            });

            const placedItemIds = new Set(Object.values(currentAns).filter(Boolean));

            optContainer.innerHTML = `
                <div class="drag-drop-container">
                    <div class="drag-text-board" id="drag-text-board">
                        ${clozeHtml}
                    </div>

                    <div class="drag-pool-wrapper">
                        <div class="drag-pool-title">
                            <span>📦 Kho thẻ đáp án lựa chọn:</span>
                            <span style="font-size: 12px; font-weight: normal; color: var(--text-muted);">
                                💡 Kéo thả vào ô trống, hoặc bấm chọn thẻ rồi bấm ô cần điền
                            </span>
                        </div>
                        <div class="drag-pool-grid" id="drag-pool-grid">
                            ${items.map(it => {
                                const isPlaced = placedItemIds.has(it.id);
                                const isSelected = (this._selectedPoolItemId === it.id);
                                return `
                                    <div class="drag-item-card ${isPlaced ? 'is-placed' : ''} ${isSelected ? 'selected-to-place' : ''}"
                                         draggable="${!isPlaced}"
                                         data-item-id="${it.id}"
                                         ondragstart="PumkinPlayer.handleDragStart(event, '${it.id}')"
                                         onclick="PumkinPlayer.handlePoolItemClick('${it.id}')">
                                        <span>${it.text || it.content}</span>
                                    </div>
                                `;
                            }).join("")}
                        </div>
                    </div>
                </div>
            `;
        } else if (q.type === "step_solution") {
            const currentNote = (typeof this.userAnswers[index] === "string") ? this.userAnswers[index] : "";
            optContainer.innerHTML = `
                <div class="step-solution-wrapper">
                    <label style="font-size: 14px; font-weight: 700; color: var(--primary);">
                        📝 Tóm tắt các bước giải / kết quả của bạn:
                    </label>
                    <textarea id="step-answer-field" class="short-answer-input" style="font-size: 14px; height: 120px; resize: vertical;"
                              placeholder="Ghi chú bước giải (Bước 1: ..., Bước 2: ..., Đáp số: ...)"
                              oninput="PumkinPlayer.inputShortAnswer(this.value)">${currentNote}</textarea>
                    <div class="step-solution-helper" style="font-size: 12.5px; padding: 10px 14px; border-radius: 6px;">
                        📌 Bài toán dạng tự luận nhiều bước. Khi nộp bài, hệ thống sẽ mở đối chiếu chi tiết từng bước theo barem chấm điểm chính thức.
                    </div>
                </div>
            `;
        } else {
            // Default: single_choice
            const letters = ["A", "B", "C", "D", "E"];
            const selected = this.userAnswers[index];

            optContainer.innerHTML = (q.options || []).map((opt, oIdx) => {
                const isSelected = selected === oIdx;
                return `
                    <div class="option-card ${isSelected ? 'selected' : ''}" onclick="PumkinPlayer.selectOption(${oIdx})">
                        <div class="option-circle">${letters[oIdx]}</div>
                        <div class="option-text">${opt}</div>
                    </div>
                `;
            }).join("");
        }

        // Prev/Next buttons
        document.getElementById("player-prev-btn").disabled = (index === 0);
        document.getElementById("player-next-btn").textContent = (index === total - 1) ? "Xem lại câu đầu →" : "Câu tiếp theo →";

        // Update navigator current status
        this.updateNavigatorHighlight();

        // Render math via Pumkin.Math (KaTeX)
        if (window.Pumkin && window.Pumkin.Math) {
            window.Pumkin.Math.renderElement([document.getElementById("player-question-text"), optContainer]);
        } else if (window.PumkinMath) {
            window.PumkinMath.typeset([document.getElementById("player-question-text"), optContainer]);
        }
    },

    // Debounced autosave to prevent blocking the click event loop
    debouncedSaveSession: PumkinPerf.debounce(function() {
        if (typeof PumkinPlayer !== "undefined") {
            PumkinPlayer.saveSession();
        }
    }, 300),

    updateNavCell(idx) {
        const btn = document.getElementById("nav-cell-btn-" + idx);
        if (!btn) return;
        const isAnswered = this.isQuestionAnswered(idx);
        const isFlagged = this.flagged[idx];
        const isCurrent = (idx === this.currentIndex);

        let statusClass = "nav-cell-btn";
        if (isFlagged) statusClass += " status-flagged";
        else if (isAnswered) statusClass += " status-answered";
        else statusClass += " status-unanswered";

        if (isCurrent) statusClass += " status-current";

        const icon = isFlagged ? "⚑" : (isAnswered ? "✓" : "○");
        btn.className = statusClass;
        const iconSpan = btn.querySelector("span:last-child");
        if (iconSpan) iconSpan.textContent = icon;

        this.updateAnsweredCounter();
    },

    updateAnsweredCounter() {
        let answered = 0;
        if (Array.isArray(this.questions)) {
            for (let i = 0; i < this.questions.length; i++) {
                if (this.isQuestionAnswered(i)) answered++;
            }
            const label = document.getElementById("player-answered-count");
            if (label) label.textContent = answered + "/" + this.questions.length + " câu";
        }
    },

    selectOption(optionIndex) {
        this.userAnswers[this.currentIndex] = optionIndex;

        // TARGETED DOM UPDATE: Instant visual response without re-rendering or math re-parsing
        const optContainer = document.getElementById("player-options-container");
        if (optContainer) {
            const cards = optContainer.querySelectorAll(".option-card");
            cards.forEach((card, idx) => {
                card.classList.toggle("selected", idx === optionIndex);
            });
        }

        this.updateNavCell(this.currentIndex);
        this.debouncedSaveSession();
    },

    selectTF(label, boolVal) {
        if (!this.userAnswers[this.currentIndex] || typeof this.userAnswers[this.currentIndex] !== "object") {
            this.userAnswers[this.currentIndex] = {};
        }
        if (this.userAnswers[this.currentIndex][label] === boolVal) {
            this.userAnswers[this.currentIndex][label] = null;
        } else {
            this.userAnswers[this.currentIndex][label] = boolVal;
        }

        // Targeted update for True/False card
        const row = document.querySelector('[data-tf-label="' + label + '"]');
        if (row) {
            const val = this.userAnswers[this.currentIndex][label];
            const btnTrue = row.querySelector(".tf-btn-true");
            const btnFalse = row.querySelector(".tf-btn-false");
            const statusPill = row.querySelector(".tf-item-status-pill");

            if (btnTrue) btnTrue.classList.toggle("active-true", val === true);
            if (btnFalse) btnFalse.classList.toggle("active-false", val === false);
            row.classList.toggle("tf-item-answered", val === true || val === false);

            if (statusPill) {
                if (val === true) {
                    statusPill.className = "tf-item-status-pill status-true";
                    statusPill.textContent = "✓ Đã chọn: Đúng";
                } else if (val === false) {
                    statusPill.className = "tf-item-status-pill status-false";
                    statusPill.textContent = "✗ Đã chọn: Sai";
                } else {
                    statusPill.className = "tf-item-status-pill status-empty";
                    statusPill.textContent = "○ Chưa chọn";
                }
            }
        }

        this.updateNavCell(this.currentIndex);
        this.debouncedSaveSession();
    },

    inputShortAnswer(val) {
        this.userAnswers[this.currentIndex] = val;
        this.updateNavCell(this.currentIndex);
        this.debouncedSaveSession();
        this.updateShortAnswerPreview(val);
    },

    updateShortAnswerPreview(val) {
        const previewEl = document.getElementById("short-answer-preview");
        if (!previewEl) return;
        const checker = (typeof window !== 'undefined' && window.Pumkin && window.Pumkin.AnswerChecker)
            ? window.Pumkin.AnswerChecker
            : (typeof window !== 'undefined' && window.PumkinAnswerChecker ? window.PumkinAnswerChecker : null);
        if (checker && typeof checker.renderPreview === 'function') {
            checker.renderPreview(val, previewEl);
        } else if (val && val.trim()) {
            previewEl.textContent = "Xem trước: " + val;
            previewEl.style.display = "block";
        } else {
            previewEl.innerHTML = "";
            previewEl.style.display = "none";
        }
    },

    insertMathPad(char) {
        const field = document.getElementById("short-answer-field");
        if (field) {
            field.value = (field.value || "") + char;
            this.inputShortAnswer(field.value);
            field.focus();
        }
    },

    clearShortAnswer() {
        const field = document.getElementById("short-answer-field");
        if (field) {
            field.value = "";
            this.inputShortAnswer("");
            field.focus();
        }
    },

    toggleFlagCurrent() {
        this.flagged[this.currentIndex] = !this.flagged[this.currentIndex];
        const flagBtn = document.getElementById("player-flag-btn");
        if (flagBtn) {
            if (this.flagged[this.currentIndex]) {
                flagBtn.classList.add("flagged");
                flagBtn.innerHTML = '<span>⚑</span> <span>Đã đánh dấu</span>';
            } else {
                flagBtn.classList.remove("flagged");
                flagBtn.innerHTML = '<span>⚑</span> <span>Đánh dấu</span>';
            }
        }
        this.updateNavCell(this.currentIndex);
        this.debouncedSaveSession();
    },

    // Drag & Drop / Click-to-Place Cloze Interaction Engine
    _selectedPoolItemId: null,

    handleDragStart(e, itemId) {
        if (e && e.dataTransfer) {
            e.dataTransfer.setData("text/plain", itemId);
            e.dataTransfer.effectAllowed = "move";
        }
    },

    handleDragOver(e) {
        if (e) {
            e.preventDefault();
            if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
            const dropZone = e.currentTarget;
            if (dropZone && !dropZone.classList.contains("drag-over")) {
                dropZone.classList.add("drag-over");
            }
        }
    },

    handleDragLeave(e) {
        if (e) {
            const dropZone = e.currentTarget;
            if (dropZone) dropZone.classList.remove("drag-over");
        }
    },

    handleDrop(e, blankId) {
        if (e) {
            e.preventDefault();
            const dropZone = e.currentTarget;
            if (dropZone) dropZone.classList.remove("drag-over");
            const itemId = e.dataTransfer ? e.dataTransfer.getData("text/plain") : null;
            if (itemId) {
                this.placeItemInBlank(blankId, itemId);
            }
        }
    },

    handlePoolItemClick(itemId) {
        const q = this.questions[this.currentIndex];
        if (!q || q.type !== "drag_drop") return;

        const currentAns = (this.userAnswers[this.currentIndex] && typeof this.userAnswers[this.currentIndex] === "object") ? this.userAnswers[this.currentIndex] : {};
        if (Object.values(currentAns).includes(itemId)) {
            return;
        }

        if (this._selectedPoolItemId === itemId) {
            this._selectedPoolItemId = null;
        } else {
            this._selectedPoolItemId = itemId;
        }

        const poolEl = document.getElementById("drag-pool-grid");
        if (poolEl) {
            poolEl.querySelectorAll(".drag-item-card").forEach(card => {
                const cId = card.getAttribute("data-item-id");
                card.classList.toggle("selected-to-place", cId === this._selectedPoolItemId);
            });
        }
    },

    handleBlankSlotClick(blankId) {
        if (this._selectedPoolItemId) {
            this.placeItemInBlank(blankId, this._selectedPoolItemId);
            this._selectedPoolItemId = null;
        } else {
            const currentAns = (this.userAnswers[this.currentIndex] && typeof this.userAnswers[this.currentIndex] === "object") ? this.userAnswers[this.currentIndex] : {};
            if (currentAns[blankId]) {
                this.removePlacedItem(blankId);
            }
        }
    },

    removePlacedItem(blankId, e) {
        if (e) e.stopPropagation();
        if (!this.userAnswers[this.currentIndex] || typeof this.userAnswers[this.currentIndex] !== "object") {
            this.userAnswers[this.currentIndex] = {};
        }
        delete this.userAnswers[this.currentIndex][blankId];
        this.renderQuestion(this.currentIndex);
        this.updateNavCell(this.currentIndex);
        this.debouncedSaveSession();
    },

    placeItemInBlank(blankId, itemId) {
        if (!this.userAnswers[this.currentIndex] || typeof this.userAnswers[this.currentIndex] !== "object") {
            this.userAnswers[this.currentIndex] = {};
        }

        for (const [bKey, itVal] of Object.entries(this.userAnswers[this.currentIndex])) {
            if (itVal === itemId) {
                delete this.userAnswers[this.currentIndex][bKey];
            }
        }

        this.userAnswers[this.currentIndex][blankId] = itemId;
        this.renderQuestion(this.currentIndex);
        this.updateNavCell(this.currentIndex);
        this.debouncedSaveSession();
    },

    prevQuestion() {
        if (this.currentIndex > 0) {
            this.renderQuestion(this.currentIndex - 1);
        }
    },

    nextQuestion() {
        if (this.currentIndex < this.questions.length - 1) {
            this.renderQuestion(this.currentIndex + 1);
        } else {
            this.renderQuestion(0);
        }
    },

    jumpToQuestion(index) {
        this.renderQuestion(index);
    },

    isQuestionAnswered(idx) {
        const ans = this.userAnswers[idx];
        if (ans === null || ans === undefined) return false;
        const q = this.questions[idx];
        if (q.type === "true_false_group") {
            if (typeof ans !== "object") return false;
            return Object.values(ans).some(v => v === true || v === false);
        }
        if (q.type === "drag_drop") {
            if (typeof ans !== "object") return false;
            return Object.values(ans).some(v => v !== null && v !== undefined && v !== "");
        }
        if (q.type === "short_answer" || q.type === "step_solution") {
            return typeof ans === "string" && ans.trim().length > 0;
        }
        return ans !== null;
    },

    renderNavigator() {
        const grid = document.getElementById("player-nav-grid");
        if (!grid) return;

        let answeredCount = 0;

        grid.innerHTML = this.questions.map((q, idx) => {
            const isAnswered = this.isQuestionAnswered(idx);
            const isFlagged = this.flagged[idx];
            const isCurrent = (idx === this.currentIndex);

            if (isAnswered) answeredCount++;

            let statusClass = "status-unanswered";
            if (isAnswered) statusClass = "status-answered";
            if (isFlagged) statusClass = "status-flagged";
            if (isCurrent) statusClass += " status-current";

            let icon = isAnswered ? "✓" : "○";
            if (isFlagged) icon = "⚑";

            return `
                <button id="nav-cell-btn-${idx}" class="nav-cell-btn ${statusClass}" onclick="PumkinPlayer.jumpToQuestion(${idx})" title="Câu ${idx + 1}">
                    <span>${idx + 1}</span>
                    <span style="font-size: 10px; margin-top: -2px;">${icon}</span>
                </button>
            `;
        }).join("");

        document.getElementById("player-answered-count").textContent = `${answeredCount}/${this.questions.length} câu`;
    },

    updateNavigatorHighlight() {
        document.querySelectorAll("#player-nav-grid .nav-cell-btn").forEach((btn, idx) => {
            if (idx === this.currentIndex) {
                btn.classList.add("status-current");
            } else {
                btn.classList.remove("status-current");
            }
        });
    },

    startTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);

        this.updateTimerDisplay();

        this.timerInterval = setInterval(() => {
            this.timeRemaining--;
            this.updateTimerDisplay();

            if (this.timeRemaining % 5 === 0) {
                this.saveSession();
            }

            if (this.timeRemaining <= 0) {
                clearInterval(this.timerInterval);
                this.timeRemaining = 0;
                this.updateTimerDisplay();
                PumkinToast.warning("⏰ HẾT GIỜ LÀM BÀI! Hệ thống đang tự động nộp bài thi của bạn.", 8000);
                this.submitExam(true);
            }
        }, 1000);
    },

    updateTimerDisplay() {
        const badge = document.getElementById("player-timer-badge");
        const textEl = document.getElementById("player-timer-text");
        if (!textEl || !badge) return;

        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        textEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        badge.className = "timer-box";
        if (this.timeRemaining > 15 * 60) {
            badge.classList.add("timer-normal");
        } else if (this.timeRemaining > 5 * 60) {
            badge.classList.add("timer-warning");
        } else {
            badge.classList.add("timer-critical");
        }
    },

    saveSession() {
        PumkinStorage.saveActiveSession({
            examData: this.examData,
            questions: this.questions,
            currentIndex: this.currentIndex,
            userAnswers: this.userAnswers,
            flagged: this.flagged,
            questionTimeSpent: this.questionTimeSpent || [],
            timeRemaining: this.timeRemaining,
            durationSeconds: this.durationSeconds,
            timestamp: Date.now()
        });
    },

    restoreSessionIfAvailable() {
        const session = PumkinStorage.getActiveSession();
        if (!session) return false;

        // Check if session expired
        const elapsed = Math.floor((Date.now() - session.timestamp) / 1000);
        const remaining = session.timeRemaining - elapsed;

        if (remaining <= 0) {
            PumkinStorage.clearActiveSession();
            return false;
        }

        this.examData = session.examData;
        this.questions = session.questions;
        this.currentIndex = session.currentIndex || 0;
        this.userAnswers = session.userAnswers;
        this.flagged = session.flagged;
        this.questionTimeSpent = session.questionTimeSpent || new Array(this.questions.length).fill(0);
        this._lastSwitchTime = Date.now();
        this.durationSeconds = session.durationSeconds;
        this.timeRemaining = remaining;

        PumkinRouter.navigate("exam-player", () => {
            document.getElementById("player-exam-title").textContent = this.examData.title;
            this.renderQuestion(this.currentIndex);
            this.renderNavigator();
            this.startTimer();
        });

        return true;
    },

    openSubmitConfirm() {
        const answered = this.questions.filter((q, idx) => this.isQuestionAnswered(idx)).length;
        const total = this.questions.length;
        const unanswered = total - answered;

        const previewEl = document.getElementById("submit-stat-preview");
        if (previewEl) {
            previewEl.innerHTML = `
                <div>✅ <strong>Đã trả lời:</strong> ${answered} / ${total} câu</div>
                <div style="color: ${unanswered > 0 ? 'var(--danger)' : 'var(--success)'}; margin-top: 6px;">
                    ⚠️ <strong>Chưa làm:</strong> ${unanswered} câu
                </div>
            `;
        }

        const modal = document.getElementById("submit-confirm-modal");
        if (modal) modal.classList.add("active");
    },

    closeSubmitConfirm() {
        const modal = document.getElementById("submit-confirm-modal");
        if (modal) modal.classList.remove("active");
    },

    submitExam(isAuto = false) {
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.closeSubmitConfirm();
        PumkinStorage.clearActiveSession();

        const now = Date.now();
        if (this._lastSwitchTime && this.currentIndex !== undefined && this.questionTimeSpent) {
            const elapsed = Math.max(1, Math.round((now - this._lastSwitchTime) / 1000));
            this.questionTimeSpent[this.currentIndex] = (this.questionTimeSpent[this.currentIndex] || 0) + elapsed;
        }
        this._lastSwitchTime = null;

        const timeSpentSeconds = this.durationSeconds - this.timeRemaining;

        PumkinScoring.gradeExam({
            exam: this.examData,
            questions: this.questions,
            userAnswers: this.userAnswers,
            flagged: this.flagged,
            timeSpentSeconds: timeSpentSeconds,
            questionTimeSpent: this.questionTimeSpent || []
        });
    },

    exitExam() {
        if (confirm("Bạn có chắc chắn muốn tạm dừng bài thi và thoát? Tiến độ của bạn đã được tự động lưu lại.")) {
            if (this.timerInterval) clearInterval(this.timerInterval);
            this.saveSession();
            PumkinRouter.navigate("library");
        }
    }
};


    // Primary Namespace
    window.Pumkin.Player = PumkinPlayer;

    // // DEPRECATED: Backward compatibility shim
    window.PumkinPlayer = PumkinPlayer;
})(window);
