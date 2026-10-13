/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.Formulas
 * Layer: Knowledge Management
 * Description: Formula Cheatsheet, Category Filtering & LaTeX Quick Reference
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

const PumkinFormulas = {
    _cachedAllFormulas: null,
    _displayedCount: 40,
    _currentFiltered: [],

    onSearchInput: PumkinPerf.debounce(function() {
        PumkinFormulas.applyFilter();
    }, 250),

    getFlatFormulas() {
        if (this._cachedAllFormulas && this._cachedAllFormulas.length > 0) return this._cachedAllFormulas;
        const articles = (typeof PumkinStorage !== "undefined") ? PumkinStorage.getKnowledgeBase() : [];
        const allFormulas = [];
        const seen = new Set();

        const addFormula = (item) => {
            if (!item) return;
            const key = ((item.title || "") + "|" + (item.latex || "")).trim();
            if (!key || seen.has(key)) return;
            seen.add(key);
            allFormulas.push(item);
        };

        // 1. First add from fallback/preloaded bundle (84 normalized cheatsheet formulas)
        if (typeof window !== 'undefined' && Array.isArray(window.PUMKIN_DEFAULT_FORMULAS) && window.PUMKIN_DEFAULT_FORMULAS.length > 0) {
            window.PUMKIN_DEFAULT_FORMULAS.forEach(f => {
                addFormula({
                    title: f.title || f.name || "Công thức",
                    latex: f.latex || "",
                    desc: f.desc || f.note || "",
                    tags: f.tags || [],
                    article_id: f.article_id || "",
                    article_title: f.article_title || "",
                    stream: f.stream || f.grade || "Toán",
                    _searchStr: ((f.title || f.name || "") + " " + (f.latex || "") + " " + (f.desc || f.note || "") + " " + (f.article_title || "")).toLowerCase()
                });
            });
        }

        // 2. Then add any additional formulas from knowledge base articles
        (articles || []).forEach(art => {
            const stream = (art.grade || art.stream || "Toán");
            (art.formulas || []).forEach(f => {
                const title = f.name || f.title || "Công thức";
                const latex = f.latex || "";
                const desc = f.desc || f.note || "";
                addFormula({
                    title: title,
                    latex: latex,
                    desc: desc,
                    tags: f.tags || [],
                    article_id: art.id,
                    article_title: art.title,
                    stream: stream,
                    _searchStr: (title + " " + latex + " " + desc + " " + (art.title || "")).toLowerCase()
                });
            });
        });

        if (allFormulas.length > 0) {
            this._cachedAllFormulas = allFormulas;
        }
        return allFormulas;
    },

    render() {
        this._displayedCount = 40;
        this.applyFilter();
    },

    applyFilter() {
        const grid = document.getElementById("all-formulas-grid");
        if (!grid) return;

        const gradeSelect = document.getElementById("formula-grade-select");
        const searchInput = document.getElementById("formula-search-input");
        const streamFilter = gradeSelect ? gradeSelect.value : "all";
        const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

        const allFormulas = this.getFlatFormulas();

        this._currentFiltered = allFormulas.filter(f => {
            if (streamFilter !== "all" && f.stream !== streamFilter) return false;
            if (query && !f._searchStr.includes(query)) return false;
            return true;
        });

        this._displayedCount = 40;
        this.renderGrid(false);
    },

    renderGrid(appendOnly = false) {
        const grid = document.getElementById("all-formulas-grid");
        if (!grid) return;

        const filtered = this._currentFiltered;
        if (filtered.length === 0) {
            grid.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--text-muted); grid-column: 1 / -1;">
                    🔍 Không tìm thấy công thức nào phù hợp. Vui lòng thử tìm kiếm khác!
                </div>
            `;
            return;
        }

        const toShow = filtered.slice(0, this._displayedCount);
        const startIndex = appendOnly ? Math.max(0, this._displayedCount - 40) : 0;
        const itemsToRender = appendOnly ? filtered.slice(startIndex, this._displayedCount) : toShow;

        const html = itemsToRender.map(f => {
            const badgeClass = f.stream.includes("TSA") ? "badge-tsa" : (f.stream.includes("HSA") ? "badge-hsa" : "badge-thpt");
            return `
                <div class="formula-card">
                    <div class="formula-header">
                        <div>
                            <span class="badge-tag ${badgeClass}" style="margin-bottom: 4px; display: inline-block;">${f.stream}</span>
                            <div class="formula-name">📐 ${f.title}</div>
                        </div>
                        ${f.tags && f.tags.length ? `<span class="badge-tag badge-type-label" style="font-size: 11px;">${f.tags.join(' • ')}</span>` : ''}
                    </div>
                    <div class="formula-math-box">\\[${f.latex}\\]</div>
                    ${f.desc ? `<div class="formula-desc">💡 <em>${f.desc}</em></div>` : ''}
                    <div style="margin-top: 10px; font-size: 12.5px; text-align: right;">
                        <a href="javascript:void(0)" onclick="PumkinKnowledge.openArticle('${f.article_id}')" style="color: var(--primary-light); text-decoration: none; font-weight: 600;">
                            📖 Xem bài viết chuyên đề: ${f.article_title} →
                        </a>
                    </div>
                </div>
            `;
        }).join("");

        const oldBtn = document.getElementById("formula-load-more-container");
        if (oldBtn) oldBtn.remove();

        if (appendOnly) {
            const temp = document.createElement("div");
            temp.innerHTML = html;
            const nodes = Array.from(temp.children);
            nodes.forEach(node => grid.appendChild(node));
            if (window.Pumkin && window.Pumkin.Math) {
                nodes.forEach(node => window.Pumkin.Math.renderElement(node));
            } else if (window.PumkinMath) {
                nodes.forEach(node => window.PumkinMath.typeset(node));
            }
        } else {
            grid.innerHTML = html;
            if (window.Pumkin && window.Pumkin.Math) {
                window.Pumkin.Math.renderElement(grid);
            } else if (window.PumkinMath) {
                window.PumkinMath.typeset(grid);
            }
        }

        if (filtered.length > this._displayedCount) {
            const remaining = filtered.length - this._displayedCount;
            const loadMoreDiv = document.createElement("div");
            loadMoreDiv.id = "formula-load-more-container";
            loadMoreDiv.style.gridColumn = "1 / -1";
            loadMoreDiv.style.textAlign = "center";
            loadMoreDiv.style.padding = "20px";
            loadMoreDiv.innerHTML = `
                <button class="btn btn-outline" style="min-width: 220px;" onclick="PumkinFormulas.loadMore()">
                    📥 Xem thêm ${Math.min(40, remaining)} công thức tiếp theo (còn ${remaining})
                </button>
            `;
            grid.appendChild(loadMoreDiv);
        }
    },

    loadMore() {
        this._displayedCount += 40;
        this.renderGrid(true);
    }
};

    // Primary Namespace
    window.Pumkin.Formulas = PumkinFormulas;

    // // DEPRECATED: Backward compatibility shim
    window.PumkinFormulas = PumkinFormulas;
})(window);
