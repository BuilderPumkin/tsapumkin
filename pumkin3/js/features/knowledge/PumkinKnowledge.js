/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.Knowledge
 * Layer: Knowledge Management
 * Description: 25 Core Mathematics Reference Articles, Topic Trees & Rich Reader
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

const PumkinKnowledge = {
    currentStream: "all",
    searchQuery: "",
    currentArticleId: null,

    render() {
        const grid = document.getElementById("knowledge-cards-grid");
        if (!grid) return;

        const articles = PumkinStorage.getKnowledgeBase();

        // 1. Loading & Error States when dataset is empty
        if (!articles || articles.length === 0) {
            if (typeof PumkinStorage !== "undefined" && typeof PumkinStorage.isHydrated === "function" && !PumkinStorage.isHydrated()) {
                grid.innerHTML = `
                    <div class="pumkin-loading-state" style="text-align: center; padding: 40px; color: var(--text-muted); grid-column: 1 / -1;">
                        <span style="font-size: 28px; display: block; margin-bottom: 8px;">⏳</span>
                        <p style="font-size: 15px; margin: 0; font-weight: 500;">Đang nạp kho chuyên đề kiến thức...</p>
                    </div>
                `;
                return;
            } else {
                const retryBtnId = "btn-retry-knowledge-" + Date.now();
                grid.innerHTML = `
                    <div class="pumkin-error-state" style="text-align: center; padding: 40px; color: var(--danger, #ef4444); grid-column: 1 / -1;">
                        <p style="font-size: 15px; margin-bottom: 14px;">⚠️ Không thể tải kho kiến thức từ máy chủ.</p>
                        <button id="${retryBtnId}" class="btn btn-primary btn-sm" style="min-height: 44px; padding: 10px 24px; border-radius: 8px; font-weight: 600;">
                            🔄 Thử lại
                        </button>
                    </div>
                `;
                const retryBtn = document.getElementById(retryBtnId);
                if (retryBtn) {
                    retryBtn.addEventListener("click", async () => {
                        grid.innerHTML = `<div class="pumkin-loading-state" style="text-align: center; padding: 40px; color: var(--text-muted); grid-column: 1 / -1;">⏳ Đang thử lại...</div>`;
                        if (typeof PumkinStorage !== 'undefined') await PumkinStorage.init();
                        PumkinKnowledge.render();
                    });
                }
                return;
            }
        }

        let filtered = articles;

        const rawStream = this.currentStream ? this.currentStream.trim() : "all";
        if (rawStream !== "" && rawStream !== "all") {
            filtered = filtered.filter(a => (a.grade === rawStream || a.stream === rawStream));
        }

        if (this.searchQuery && this.searchQuery.trim()) {
            const q = this.searchQuery.toLowerCase().trim();
            filtered = filtered.filter(a => {
                const titleMatch = a.title && a.title.toLowerCase().includes(q);
                const chapMatch = a.chapter && a.chapter.toLowerCase().includes(q);
                const overMatch = a.overview && a.overview.toLowerCase().includes(q);
                const formMatch = a.formulas && a.formulas.some(f => 
                    (f.name && f.name.toLowerCase().includes(q)) || 
                    (f.title && f.title.toLowerCase().includes(q)) || 
                    (f.latex && f.latex.toLowerCase().includes(q))
                );
                return titleMatch || chapMatch || overMatch || formMatch;
            });
        }

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--text-muted); grid-column: 1 / -1;">
                    🔍 Không tìm thấy chuyên đề phù hợp với từ khóa "${this.searchQuery || ''}". Vui lòng thử từ khóa khác!
                </div>
            `;
            return;
        }

        // Render 1 knowledge card per row (Full width)
        grid.innerHTML = filtered.map(a => {
            const stream = (a.grade || a.stream || "Toán");
            const badgeClass = stream.includes("TSA") ? "badge-tsa" : (stream.includes("HSA") ? "badge-hsa" : "badge-thpt");
            const formulaCount = (a.formulas || []).length;
            const exampleCount = (a.examples || []).length;

            return `
                <div class="knowledge-card">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
                        <span class="badge-tag ${badgeClass}">${stream}</span>
                        <span style="font-size: 12.5px; color: var(--text-muted); font-weight: 600;">${a.chapter || 'Chuyên đề'}</span>
                    </div>
                    <h3 class="knowledge-card-title">${a.title}</h3>
                    <p class="knowledge-card-desc">${a.overview}</p>
                    <div class="knowledge-card-meta">
                        <span>📐 <strong>${formulaCount}</strong> công thức cốt lõi</span>
                        <span>📝 <strong>${exampleCount}</strong> ví dụ giải từng bước</span>
                    </div>
                    <div style="display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap;">
                        <button class="btn btn-sm btn-primary" onclick="PumkinKnowledge.openArticle('${a.id}')">
                            📖 Đọc chuyên đề toàn diện
                        </button>
                        <button class="btn btn-sm btn-outline" onclick="PumkinKnowledge.startDrillForArticle('${a.id}')" title="Luyện tập trắc nghiệm chuyên đề này">
                            🎯 Luyện tập câu hỏi chuyên đề
                        </button>
                    </div>
                </div>
            `;
        }).join("");
    },

    filterStream(stream, btnElement) {
        this.currentStream = stream;
        document.querySelectorAll("#knowledge-stream-tabs .stream-tab-btn").forEach(btn => {
            btn.classList.remove("active");
        });
        if (btnElement) btnElement.classList.add("active");
        this.render();
    },

    onSearch(query) {
        this.searchQuery = query;
        this.render();
    },

    onSearchInput: PumkinPerf.debounce(function(query) {
        PumkinKnowledge.onSearch(query);
    }, 250),

    openArticle(articleId) {
        const article = PumkinStorage.getKnowledgeArticleById(articleId);
        if (!article) return;

        this.currentArticleId = articleId;
        const stream = (article.grade || article.stream || "Toán");

        const streamEl = document.getElementById("detail-breadcrumb-stream");
        const titleEl = document.getElementById("detail-breadcrumb-title");
        const badgeEl = document.getElementById("detail-chapter-badge");
        const artTitleEl = document.getElementById("detail-article-title");
        const artOverEl = document.getElementById("detail-article-overview");

        if (streamEl) streamEl.textContent = stream;
        if (titleEl) titleEl.textContent = article.title;
        if (badgeEl) badgeEl.textContent = `${stream} • ${article.chapter || 'Chuyên đề'}`;
        if (artTitleEl) artTitleEl.textContent = article.title;
        if (artOverEl) artOverEl.textContent = article.overview;

        // Prerequisites graph links
        const prereqBox = document.getElementById("detail-prerequisites-container");
        const prereqChips = document.getElementById("detail-prerequisites-chips");
        if (prereqBox && prereqChips) {
            const prereqs = article.prerequisites || [];
            if (prereqs.length > 0) {
                prereqChips.innerHTML = prereqs.map(pId => {
                    const pArt = PumkinStorage.getKnowledgeArticleById(pId);
                    const pTitle = pArt ? pArt.title : pId;
                    return `<button class="btn btn-sm btn-outline" style="font-size: 12px; padding: 4px 10px; border-radius: 20px;" onclick="PumkinKnowledge.openArticle('${pId}')">🔗 ${pTitle}</button>`;
                }).join("");
                prereqBox.style.display = "block";
            } else {
                prereqBox.style.display = "none";
            }
        }

        // Common traps & notes
        const trapsBox = document.getElementById("detail-traps-container");
        if (trapsBox) {
            const traps = article.common_traps || [];
            if (traps.length > 0) {
                trapsBox.innerHTML = `
                    <div class="common-traps-box" style="margin-top: 14px;">
                        <h4 style="color: #92400e; font-size: 14px; margin: 0 0 6px 0; display: flex; align-items: center; gap: 6px;">
                            <span>⚠️</span> Bẫy tư duy & Lưu ý trọng tâm:
                        </h4>
                        <ul style="margin: 0; padding-left: 20px; font-size: 13.5px; line-height: 1.6;">
                            ${traps.map(t => `<li>${t}</li>`).join("")}
                        </ul>
                    </div>
                `;
                trapsBox.style.display = "block";
            } else {
                trapsBox.style.display = "none";
            }
        }

        const theoryEl = document.getElementById("detail-theory-content");
        if (theoryEl) {
            const rawTheory = (article.theory_markdown || article.theory_html || article.theory_text || "");
            let formatted = rawTheory
                .replace(/^#### (.*$)/gim, '<h5 style="color: var(--text-main); font-weight: 700; margin: 12px 0 4px 0;">$1</h5>')
                .replace(/^### (.*$)/gim, '<h4 style="color: var(--primary); margin: 14px 0 6px 0;">$1</h4>')
                .replace(/^## (.*$)/gim, '<h3 style="color: var(--primary); margin: 16px 0 8px 0;">$1</h3>')
                .replace(/^---$/gim, '<hr style="border: none; border-top: 1px dashed var(--border); margin: 14px 0;">')
                .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
                .replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
                .replace(/(<\/h[345]>|<hr[^>]*>)\r?\n/g, '$1')
                .replace(/\n/g, '<br>');
            theoryEl.innerHTML = formatted;
        }

        // Formulas: 1 card per row, NO copy button, with overflow-x: auto box
        const formulasEl = document.getElementById("detail-formulas-grid");
        if (formulasEl) {
            formulasEl.innerHTML = (article.formulas || []).map(f => {
                const fTitle = f.name || f.title || "Công thức";
                const fDesc = f.desc || f.note || "";
                return `
                    <div class="formula-card">
                        <div class="formula-header">
                            <span class="formula-name">📐 ${fTitle}</span>
                            ${f.tags && f.tags.length ? `<span class="badge-tag badge-type-label" style="font-size: 11px;">${f.tags.join(' • ')}</span>` : ''}
                        </div>
                        <div class="formula-math-box">\\[${f.latex}\\]</div>
                        ${fDesc ? `<div class="formula-desc">💡 <em>${fDesc}</em></div>` : ''}
                    </div>
                `;
            }).join("");
        }

        // Examples: Accordion with step-by-step solutions
        const examplesEl = document.getElementById("detail-examples-container");
        if (examplesEl) {
            examplesEl.innerHTML = (article.examples || []).map((ex, idx) => {
                const exTitle = ex.title || `Ví dụ ${idx + 1}`;
                const exProblem = ex.question || ex.problem || "";
                let solutionContent = "";

                if (Array.isArray(ex.solution_steps)) {
                    solutionContent = ex.solution_steps.map(step => `<div style="margin-bottom: 6px;">${step}</div>`).join("");
                } else if (ex.solution_html || ex.solution) {
                    solutionContent = (ex.solution_html || ex.solution).replace(/\n/g, '<br>');
                }

                if (ex.takeaway) {
                    solutionContent += `<div class="formula-takeaway">💡 <strong>Ghi nhớ phương pháp:</strong> ${ex.takeaway}</div>`;
                }

                return `
                    <div class="example-box">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
                            <span class="example-title">${exTitle}</span>
                            ${ex.difficulty ? `<span class="badge-tag badge-thpt">${ex.difficulty}</span>` : ''}
                        </div>
                        <div style="font-size: 14.5px; margin-bottom: 12px; line-height: 1.65;">
                            ${exProblem}
                        </div>
                        <details class="example-solution-accordion">
                            <summary style="font-weight: 700; color: var(--primary-light); cursor: pointer; padding: 6px 0; user-select: none;">
                                💡 Xem các bước giải chi tiết (Step-by-Step)
                            </summary>
                            <div class="example-solution-body" style="margin-top: 10px; padding-top: 10px; border-top: 1px dashed #cbd5e1; line-height: 1.7; font-size: 14px;">
                                ${solutionContent}
                            </div>
                        </details>
                    </div>
                `;
            }).join("");
        }

        const appEl = document.getElementById("detail-applications-content");
        if (appEl) {
            appEl.innerHTML = (article.applications || article.applications_html || "Ứng dụng trong việc tối ưu hóa thực tế và các bài toán định lượng đề thi.").replace(/\n/g, '<br>');
        }

        PumkinRouter.navigate("knowledge-detail", () => {
            const targetView = document.getElementById("view-knowledge-detail");
            if (window.Pumkin && window.Pumkin.Math) {
                window.Pumkin.Math.renderElement(targetView);
            } else if (window.PumkinMath) {
                window.PumkinMath.typeset(targetView);
            }
        });
    },

    // Helper to shuffle and sample maximum count questions
    _sampleQuestions(list, maxCount = 10) {
        if (!Array.isArray(list) || list.length <= maxCount) return [...list];
        const shuffled = [...list];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, maxCount);
    },

    startDrillForArticle(articleId) {
        const article = PumkinStorage.getKnowledgeArticleById(articleId);
        if (!article) return;

        const allQuestions = PumkinStorage.getQuestions();
        const relatedIds = article.related_question_ids || [];
        let matchingQuestions = allQuestions.filter(q => q.knowledge_id === articleId || relatedIds.includes(q.id));

        if (matchingQuestions.length === 0) {
            PumkinToast.info(`Hiện chưa có câu hỏi trắc nghiệm liên kết riêng với chuyên đề "${article.title}". Bạn có thể luyện tập qua Kho đề hoặc Tạo đề!`);
            return;
        }

        // Standardize: Capped at maximum 10 questions for focused topic mastery
        const drillQuestions = this._sampleQuestions(matchingQuestions, 10);
        const stream = (article.grade || article.stream || "TOÁN");
        const customExam = {
            id: `drill_${articleId}_${Date.now()}`,
            title: `Luyện tập trọng tâm: ${article.title}`,
            description: `Bộ luyện tập chuẩn hóa gồm ${drillQuestions.length} câu hỏi trọng tâm (tối đa 10 câu) của chuyên đề ${article.title}.`,
            duration_minutes: Math.max(10, Math.min(20, Math.ceil(drillQuestions.length * 2))),
            exam_type: stream,
            questions: drillQuestions
        };

        PumkinPlayer.startExam(null, true, customExam);
    },

    startDrillForCurrentArticle() {
        if (this.currentArticleId) {
            this.startDrillForArticle(this.currentArticleId);
        }
    },

    startTieredDrill(tierLevel) {
        if (!this.currentArticleId) return;
        const article = PumkinStorage.getKnowledgeArticleById(this.currentArticleId);
        if (!article) return;

        const allQuestions = PumkinStorage.getQuestions();
        const relatedIds = article.related_question_ids || [];
        let pool = allQuestions.filter(q => q.knowledge_id === this.currentArticleId || relatedIds.includes(q.id));

        let drillQuestions = [];
        if (tierLevel === "basic") {
            const candidates = pool.filter(q => (q.cognitive_level === "Nhận biết" || q.cognitive_level === "Thông hiểu" || q.difficulty === "Dễ" || q.difficulty === "Trung bình"));
            drillQuestions = this._sampleQuestions(candidates, 10);
        } else if (tierLevel === "advanced") {
            const candidates = pool.filter(q => (q.cognitive_level === "Vận dụng" || q.cognitive_level === "Vận dụng cao" || q.difficulty === "Khó" || q.difficulty === "Vận dụng cao"));
            drillQuestions = this._sampleQuestions(candidates, 10);
        } else {
            // Balanced mix: 5 basic + 5 advanced
            const basic = pool.filter(q => (q.cognitive_level === "Nhận biết" || q.cognitive_level === "Thông hiểu" || q.difficulty === "Dễ" || q.difficulty === "Trung bình"));
            const adv = pool.filter(q => (q.cognitive_level === "Vận dụng" || q.cognitive_level === "Vận dụng cao" || q.difficulty === "Khó" || q.difficulty === "Vận dụng cao"));
            const sBasic = this._sampleQuestions(basic, 5);
            const sAdv = this._sampleQuestions(adv, 5);
            drillQuestions = sBasic.concat(sAdv);
            if (drillQuestions.length < 10) {
                const remainder = pool.filter(q => !drillQuestions.some(d => d.id === q.id));
                drillQuestions = drillQuestions.concat(this._sampleQuestions(remainder, 10 - drillQuestions.length));
            }
        }

        if (drillQuestions.length === 0) {
            PumkinToast.info(`Không tìm thấy câu hỏi mức độ này trong chuyên đề "${article.title}". Hệ thống đang mở bài luyện 10 câu chọn lọc của chuyên đề.`);
            this.startDrillForArticle(this.currentArticleId);
            return;
        }

        // Strictly cap at maximum 10 questions
        drillQuestions = this._sampleQuestions(drillQuestions, 10);

        const tierName = tierLevel === "basic" ? "Cơ bản (M1-M2)" : (tierLevel === "advanced" ? "Nâng cao (M3-M4)" : "Chọn lọc 10 câu");
        const customExam = {
            id: `drill_${this.currentArticleId}_${tierLevel}_${Date.now()}`,
            title: `Luyện tập (${tierName}): ${article.title}`,
            description: `Bộ luyện tập chuẩn hóa gồm ${drillQuestions.length} câu hỏi cấp độ ${tierName} (tối đa 10 câu) của chuyên đề ${article.title}.`,
            duration_minutes: Math.max(10, Math.min(20, Math.ceil(drillQuestions.length * 2))),
            exam_type: (article.grade || article.stream || "TOÁN"),
            questions: drillQuestions
        };

        PumkinPlayer.startExam(null, true, customExam);
    }
};

    // Primary Namespace
    window.Pumkin.Knowledge = PumkinKnowledge;

    // // DEPRECATED: Backward compatibility shim
    window.PumkinKnowledge = PumkinKnowledge;
})(window);
