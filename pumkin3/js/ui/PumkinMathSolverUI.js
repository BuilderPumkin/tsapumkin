/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.MathSolverUI
 * Layer: UI Presentation & Interaction
 * Description: Interactive Math Solver & Verification UI Component
 * Features:
 *  - KaTeX rendering via window.Pumkin.Math with trust: false, maxExpand: 50
 *  - XSS Protection: DOM-escaped text content and strict KaTeX sanitization
 *  - Standardized Status Badges mapped to confidence.method (symbolic, rule_based, llm_consensus, numeric)
 *  - Restate Vietnamese banner ("Hệ thống hiểu đề là: ...")
 *  - Strictly NO "chính xác 100%" text anywhere
 *  - Loading indicator with cold-start advisory ("Đang giải...")
 *  - Dynamic "Thử lại" button attached strictly via addEventListener
 *  - Graceful degradation for bank questions and free input
 *  - Accessibility: Keyboard navigable, >= 44px mobile touch targets, WCAG AA contrast (>= 4.5:1)
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

    /**
     * Sanitizes plain strings to prevent XSS injection
     */
    function escapeHtml(str) {
        if (str === null || str === undefined) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    /**
     * Standard Badge Descriptor Generator
     * Strictly conforms to API_CONTRACT.md (Section 3.2 & 3.3):
     * - symbolic: "Đã giải chính xác bằng đại số (SymPy)"
     * - numeric: "Đã kiểm tra bằng tính số"
     * - consensus: "Đồng thuận đa phương pháp kiểm tra"
     * - LLM involvement (llm_consensus, llm_assisted, llm_parsed): NEVER labeled "Đã kiểm chứng"!
     *   Uses cautious label: "Gợi ý qua mô hình ngôn ngữ (Chưa kiểm chứng)"
     * - needs_review: "Cần thầy cô kiểm tra lại"
     * - unsupported: "Dạng bài chưa hỗ trợ tự động"
     */
    function getBadgeDescriptor(status, confidence) {
        const method = (confidence && confidence.method) ? confidence.method : 'unknown';
        const isLlmAssisted = Boolean(
            (confidence && (confidence.llm_assisted || confidence.llm_parsed)) ||
            method === 'llm_consensus' ||
            method === 'llm'
        );

        // Academic Governance: Results with LLM involvement MUST NEVER be labeled "verified"
        if (isLlmAssisted) {
            return {
                className: 'badge-needs-review',
                text: 'Gợi ý qua mô hình ngôn ngữ (Chưa kiểm chứng)',
                icon: '🤖'
            };
        }

        if (status === 'verified') {
            if (method === 'symbolic') {
                return {
                    className: 'badge-verified',
                    text: 'Đã giải chính xác bằng đại số (SymPy)',
                    icon: '🛡️'
                };
            } else if (method === 'numeric') {
                return {
                    className: 'badge-verified',
                    text: 'Đã kiểm tra bằng tính số',
                    icon: '🔢'
                };
            } else if (method === 'consensus') {
                return {
                    className: 'badge-verified',
                    text: 'Đồng thuận đa phương pháp kiểm tra',
                    icon: '🤝'
                };
            }
            return {
                className: 'badge-verified',
                text: 'Đã kiểm chứng hình thức',
                icon: '🛡️'
            };
        } else if (status === 'needs_review') {
            return {
                className: 'badge-needs-review',
                text: 'Cần thầy cô kiểm tra lại',
                icon: '⚠️'
            };
        }
        return {
            className: 'badge-unsupported',
            text: 'Dạng bài chưa hỗ trợ tự động',
            icon: 'ℹ️'
        };
    }

    // Standard Preset Samples for 1-Click Verification & Testing
    const PRESET_SAMPLES = [
        {
            label: '📐 Tích phân đổi biến',
            text: '\\int_{0}^{1} (2x+3)e^x dx',
            category: 'integral'
        },
        {
            label: '🌐 Mặt cầu Oxyz',
            text: 'x^2 + y^2 + z^2 - 2x - 4y + 4 = 0',
            category: 'geometry_oxyz'
        },
        {
            label: '🔢 Chữ số tận cùng',
            text: '7^{2024}',
            category: 'last_digit'
        },
        {
            label: '📊 Định thức Cramer',
            text: '\\det \\begin{pmatrix} 3 & 4 \\\\ 2 & 5 \\end{pmatrix}',
            category: 'matrix_algebra'
        },
        {
            label: '📈 Cấp số cộng',
            text: 'u_1 = 3, d = 5. Tính u_{20}',
            category: 'sequence'
        },
        {
            label: '⚠️ Test Đề dài (Limit)',
            text: 'x + '.repeat(500) + '1',
            category: 'adversarial_length'
        },
        {
            label: '🛡️ Test Độc hại (Security)',
            text: '\\input{/etc/passwd} \\def\\malicious{curl}',
            category: 'adversarial_security'
        }
    ];

    const PumkinMathSolverUI = {
        containerEl: null,
        currentTab: 'solve', // 'solve' | 'check' | 'generate'
        lastPayload: null,

        /**
         * Renders or updates the Math Solver view
         */
        render() {
            this.containerEl = document.getElementById('view-math-solver');
            if (!this.containerEl) return;

            // Check if feature flag is active
            const isEnabled = window.Pumkin.MathAPIClient
                ? window.Pumkin.MathAPIClient.isFeatureEnabled()
                : true;

            let betaNoticeHtml = '';
            if (isEnabled) {
                betaNoticeHtml = `
                    <div class="math-beta-banner" role="status">
                        <span>🧪 <strong>Thử nghiệm tính năng:</strong> Công cụ tính toán máy đại số (Pumkin CAS Engine) đang mở cho nhóm trải nghiệm sớm.</span>
                        <span style="font-size: 11px; opacity: 0.85;">v4.2.0 • Deterministic Verification</span>
                    </div>
                `;
            }

            this.containerEl.innerHTML = `
                <div class="math-solver-container">
                    <header class="math-solver-header">
                        <h2 class="math-solver-title">
                            <span>🧮</span>
                            <span>BỘ GIẢI TOÁN CAS & KIỂM ĐỊNH TỰ ĐỘNG</span>
                        </h2>
                        <p class="math-solver-subtitle">
                            Hệ thống giải toán ký hiệu tất định, phân tích bước giải sư phạm và phát hiện bẫy nhận thức dựa trên SymPy & KaTeX.
                        </p>
                    </header>

                    ${betaNoticeHtml}

                    <div class="math-tabs-nav" role="tablist" aria-label="Chế độ tính toán">
                        <button id="tab-solve-btn" class="math-tab-btn active" role="tab" aria-selected="true" data-tab="solve">
                            <span>📝</span> Nhập đề tự do & Giải
                        </button>
                        <button id="tab-check-btn" class="math-tab-btn" role="tab" aria-selected="false" data-tab="check">
                            <span>🔍</span> Kiểm định bài làm học sinh
                        </button>
                    </div>

                    <main id="math-tab-content" role="region" aria-live="polite">
                        <!-- Dynamic Tab Content Rendered Here -->
                    </main>
                </div>
            `;

            this._bindTabEvents();
            this.renderTabContent(this.currentTab);
        },

        _bindTabEvents() {
            const solveTabBtn = document.getElementById('tab-solve-btn');
            const checkTabBtn = document.getElementById('tab-check-btn');

            if (solveTabBtn) {
                solveTabBtn.addEventListener('click', () => {
                    this.switchTab('solve');
                });
            }
            if (checkTabBtn) {
                checkTabBtn.addEventListener('click', () => {
                    this.switchTab('check');
                });
            }
        },

        switchTab(tabName) {
            this.currentTab = tabName;
            document.querySelectorAll('.math-tab-btn').forEach(btn => {
                const isActive = btn.dataset.tab === tabName;
                btn.classList.toggle('active', isActive);
                btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });
            this.renderTabContent(tabName);
        },

        renderTabContent(tabName) {
            const contentEl = document.getElementById('math-tab-content');
            if (!contentEl) return;

            if (tabName === 'solve') {
                this._renderSolveTab(contentEl);
            } else if (tabName === 'check') {
                this._renderCheckTab(contentEl);
            }
        },

        _renderSolveTab(container) {
            container.innerHTML = `
                <div class="math-card">
                    <label for="math-problem-input" class="math-textarea-label">
                        Nhập đề bài hoặc biểu thức toán học (hỗ trợ tiếng Việt tự nhiên và mã LaTeX):
                    </label>
                    <textarea 
                        id="math-problem-input" 
                        class="math-textarea" 
                        placeholder="Ví dụ: Tính tích phân \\int_0^1 (2x+3)e^x dx hoặc tìm tâm, bán kính mặt cầu x^2 + y^2 + z^2 - 2x - 4y + 4 = 0..."
                        aria-label="Đề bài hoặc biểu thức toán học"
                    ></textarea>

                    <div class="math-samples-group" role="group" aria-label="Câu hỏi mẫu kiểm thử">
                        <span class="math-samples-label">Mẫu nhanh:</span>
                        ${PRESET_SAMPLES.map((sample, idx) => `
                            <button type="button" class="math-chip-btn" data-sample-idx="${idx}">
                                ${sample.label}
                            </button>
                        `).join('')}
                    </div>

                    <div class="math-actions-bar">
                        <button type="button" id="btn-submit-solve" class="btn-math-primary">
                            <span>🚀</span>
                            <span>Giải & Kiểm chứng bằng CAS</span>
                        </button>
                        <button type="button" id="btn-clear-solve" class="btn-math-clear">
                            <span>✕ Xóa nội dung</span>
                        </button>
                    </div>
                </div>

                <div id="math-solve-output" role="region" aria-live="polite"></div>
            `;

            // Bind sample chip click handlers with addEventListener
            container.querySelectorAll('.math-chip-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = parseInt(e.currentTarget.dataset.sampleIdx, 10);
                    const sample = PRESET_SAMPLES[idx];
                    if (sample) {
                        const textarea = document.getElementById('math-problem-input');
                        if (textarea) {
                            textarea.value = sample.text;
                            textarea.focus();
                        }
                    }
                });
            });

            // Bind Submit button
            const submitBtn = document.getElementById('btn-submit-solve');
            if (submitBtn) {
                submitBtn.addEventListener('click', () => {
                    this.executeSolve();
                });
            }

            // Bind Clear button
            const clearBtn = document.getElementById('btn-clear-solve');
            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    const textarea = document.getElementById('math-problem-input');
                    if (textarea) {
                        textarea.value = '';
                        textarea.focus();
                    }
                    const output = document.getElementById('math-solve-output');
                    if (output) output.innerHTML = '';
                });
            }

            // Keyboard shortcut: Ctrl + Enter to solve
            const textarea = document.getElementById('math-problem-input');
            if (textarea) {
                textarea.addEventListener('keydown', (e) => {
                    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                        e.preventDefault();
                        this.executeSolve();
                    }
                });
            }
        },

        _renderCheckTab(container) {
            container.innerHTML = `
                <div class="math-card">
                    <label for="math-check-problem" class="math-textarea-label">1. Đề bài:</label>
                    <textarea id="math-check-problem" class="math-textarea" placeholder="Nhập đề bài toán..." style="min-height: 80px;"></textarea>

                    <label for="math-check-answer" class="math-textarea-label" style="margin-top: 14px;">2. Đáp số của học sinh:</label>
                    <input id="math-check-answer" type="text" class="math-textarea" style="min-height: 44px; height: 44px;" placeholder="Ví dụ: 3e - 1 hoặc R = 1..." />

                    <div class="math-actions-bar" style="margin-top: 18px;">
                        <button type="button" id="btn-submit-check" class="btn-math-primary">
                            <span>🔍</span>
                            <span>Kiểm định lời giải & Bẫy</span>
                        </button>
                    </div>
                </div>

                <div id="math-check-output" role="region" aria-live="polite"></div>
            `;

            const submitBtn = document.getElementById('btn-submit-check');
            if (submitBtn) {
                submitBtn.addEventListener('click', () => {
                    this.executeCheck();
                });
            }
        },

        /**
         * Executes problem solving with loading, cold-start handling, and KaTeX rendering
         */
        async executeSolve() {
            const textarea = document.getElementById('math-problem-input');
            const outputEl = document.getElementById('math-solve-output');
            const submitBtn = document.getElementById('btn-submit-solve');

            if (!textarea || !outputEl) return;
            const text = textarea.value.trim();

            if (!text) {
                if (typeof PumkinToast !== 'undefined') {
                    PumkinToast.warning('Vui lòng nhập đề bài hoặc biểu thức toán học!');
                }
                textarea.focus();
                return;
            }

            this.lastPayload = { question_text: text };

            // Render Loading State
            this.showLoading(outputEl, 'Đang giải bài toán...', 'Hệ thống máy tính toán CAS đang phân tích đề bài. Nếu máy chủ đang trong trạng thái khởi động nguội (cold start), quá trình có thể mất từ 30 đến 50 giây...');
            if (submitBtn) submitBtn.disabled = true;

            const res = await window.Pumkin.MathAPIClient.solve(this.lastPayload);
            if (submitBtn) submitBtn.disabled = false;

            if (!res.success) {
                this.showError(outputEl, res, () => this.executeSolve());
                return;
            }

            this.showSolveResult(outputEl, res);
        },

        /**
         * Executes student submission checking
         */
        async executeCheck() {
            const probInput = document.getElementById('math-check-problem');
            const ansInput = document.getElementById('math-check-answer');
            const outputEl = document.getElementById('math-check-output');
            const submitBtn = document.getElementById('btn-submit-check');

            if (!probInput || !ansInput || !outputEl) return;
            const probText = probInput.value.trim();
            const ansText = ansInput.value.trim();

            if (!probText || !ansText) {
                if (typeof PumkinToast !== 'undefined') {
                    PumkinToast.warning('Vui lòng nhập đầy đủ cả đề bài và đáp số học sinh!');
                }
                return;
            }

            const payload = {
                question_text: probText,
                student_answer: ansText
            };

            this.showLoading(outputEl, 'Đang kiểm định bài làm...', 'Máy kiểm chứng đang rà soát từng bước biến đổi và đối chiếu bẫy nhận thức...');
            if (submitBtn) submitBtn.disabled = true;

            const res = await window.Pumkin.MathAPIClient.check(payload);
            if (submitBtn) submitBtn.disabled = false;

            if (!res.success) {
                this.showError(outputEl, res, () => this.executeCheck());
                return;
            }

            this.showCheckResult(outputEl, res);
        },

        showLoading(container, title, description) {
            container.innerHTML = `
                <div class="math-loading-state" role="status">
                    <div class="math-spinner" aria-hidden="true"></div>
                    <div class="math-loading-title">${title}</div>
                    <div class="math-loading-desc">${description}</div>
                </div>
            `;
        },

        showError(container, res, retryCallback) {
            const err = res.error || {};
            const isColdStart = res.is_cold_start === true || res.status_code === 504;
            const isOffline = res.is_offline === true || res.status_code === 502;

            let titleText = 'Đã xảy ra lỗi khi kết nối máy chủ';
            let messageText = err.message || 'Không thể nhận phản hồi từ máy chủ tính toán.';

            if (isColdStart) {
                titleText = '⏳ Máy chủ đang khởi động nguội (Cold Start)';
                messageText = 'Máy chủ miễn phí tự động tạm dừng khi không có truy cập. Quá trình đánh thức đang diễn ra (mất khoảng 30-50 giây). Vui lòng bấm nút "Thử lại" bên dưới.';
            } else if (isOffline) {
                titleText = '🔌 Máy chủ tính toán tạm thời gián đoạn';
                messageText = 'Tính năng nhập đề tự do đang tạm ngưng do máy chủ tính toán đang khởi động hoặc bảo trì. Ngân hàng đề thi chuẩn vẫn hoạt động ổn định bằng dữ liệu ngoại tuyến.';
            }

            container.innerHTML = `
                <div class="math-error-state" role="alert">
                    <div class="math-error-title">
                        <span>⚠️</span>
                        <span>${escapeHtml(titleText)}</span>
                    </div>
                    <div class="math-error-msg">${escapeHtml(messageText)}</div>
                    <div id="math-retry-btn-slot"></div>
                </div>
            `;

            // Attach "Thử lại" button strictly via addEventListener (NO inline onclick)
            const slot = container.querySelector('#math-retry-btn-slot');
            if (slot && typeof retryCallback === 'function') {
                const retryBtn = document.createElement('button');
                retryBtn.type = 'button';
                retryBtn.className = 'btn-math-retry';
                retryBtn.innerHTML = '<span>🔄</span><span>Thử lại</span>';
                retryBtn.addEventListener('click', retryCallback);
                slot.appendChild(retryBtn);
            }
        },

        showSolveResult(container, res) {
            const data = res.data || {};
            const status = data.status || 'unsupported';
            const restateVi = data.restate_vi || '';
            const steps = data.steps || [];
            const answer = data.computed_answer || data.answer || data.result || 'Không có kết quả';

            // Generate Badge according to strict academic standards and confidence.method:
            const badge = getBadgeDescriptor(status, data.confidence);

            const badgeHtml = `
                <span class="pumkin-math-badge ${badge.className}" role="status">
                    <span>${badge.icon}</span>
                    <span>${escapeHtml(badge.text)}</span>
                </span>
            `;

            const restateHtml = restateVi ? `
                <div class="math-restate-banner">
                    <span class="restate-label">Hệ thống hiểu đề là:</span>
                    <span class="restate-content">${escapeHtml(restateVi)}</span>
                </div>
            ` : '';

            const stepsHtml = steps.length > 0 ? `
                <div style="font-size: 14px; font-weight: 700; color: var(--primary, #1e3a8a); margin-top: 16px;">
                    📋 CÁC BƯỚC BIẾN ĐỔI KÝ HIỆU (STEP-BY-STEP TRACES):
                </div>
                <div class="math-steps-list">
                    ${steps.map((st, i) => `
                        <div class="math-step-item">
                            <div class="math-step-title">
                                <span>Bước ${i + 1}:</span>
                                <span>${escapeHtml(st.title || st.action || 'Biến đổi giải tích')}</span>
                            </div>
                            <div class="math-step-content">
                                ${escapeHtml(st.content || st.expression || st.explanation || '')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            ` : '';

            container.innerHTML = `
                <div class="math-result-card">
                    <div class="math-result-header">
                        <div>
                            <span style="font-size: 15px; font-weight: 800; color: var(--primary, #1e3a8a);">KẾT QUẢ GIẢI TOÁN</span>
                        </div>
                        <div>${badgeHtml}</div>
                    </div>

                    ${restateHtml}

                    <div class="math-final-answer-box">
                        <span class="math-final-answer-label">Đáp số tính toán (CAS Output):</span>
                        <span class="math-final-answer-value">${escapeHtml(answer)}</span>
                    </div>

                    ${stepsHtml}

                    <div class="math-meta-telemetry">
                        <span>Độ trễ phản hồi: <strong>${Number(res.latency_ms || 0)} ms</strong></span>
                        <span>Trạng thái Cache: <strong>${escapeHtml(res.cache_status || 'MISS')}</strong></span>
                        ${res.trace_id ? `<span>Trace: <code>${escapeHtml(res.trace_id)}</code></span>` : ''}
                    </div>
                </div>
            `;

            // Trigger KaTeX rendering via Pumkin.Math with strict safety options
            this.typesetElement(container);
        },

        showCheckResult(container, res) {
            const data = res.data || {};
            const isCorrect = data.is_correct === true;
            const detectedTrap = data.detected_misconception_id || null;
            const feedbackVi = data.pedagogical_feedback_vi || data.feedback_vi || (isCorrect ? 'Lời giải và đáp số hoàn toàn chính xác!' : 'Đáp số chưa chính xác.');

            const badge = getBadgeDescriptor(isCorrect ? 'verified' : 'needs_review', data.confidence);

            container.innerHTML = `
                <div class="math-result-card">
                    <div class="math-result-header">
                        <span style="font-size: 15px; font-weight: 800; color: var(--primary, #1e3a8a);">KẾT QUẢ KIỂM ĐỊNH BÀI LÀM</span>
                        <span class="pumkin-math-badge ${badge.className}" role="status">
                            <span>${badge.icon}</span>
                            <span>${escapeHtml(badge.text)}</span>
                        </span>
                    </div>

                    <div style="margin: 16px 0; font-size: 14.5px; line-height: 1.6;">
                        <strong>Nhận xét sư phạm:</strong>
                        <div style="background: #f8fafc; border-radius: 6px; padding: 12px; margin-top: 6px;">
                            ${escapeHtml(feedbackVi)}
                        </div>
                    </div>

                    ${detectedTrap ? `
                        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 10px 14px; margin-top: 10px; font-size: 13.5px; color: #991b1b;">
                            ⚠️ <strong>Phát hiện bẫy nhận thức:</strong> Mã lỗi <code>${escapeHtml(detectedTrap)}</code>
                        </div>
                    ` : ''}

                    <div class="math-meta-telemetry">
                        <span>Độ trễ: <strong>${Number(res.latency_ms || 0)} ms</strong></span>
                        <span>Gateway: Cloudflare Pages</span>
                    </div>
                </div>
            `;

            this.typesetElement(container);
        },

        /**
         * Renders all math expressions inside el using KaTeX with strict XSS protections
         * trust: false, maxExpand: 50 prevents malicious macro expansions and JS execution
         */
        typesetElement(el) {
            if (!el) return;
            try {
                if (typeof renderMathInElement === 'function') {
                    renderMathInElement(el, {
                        delimiters: [
                            { left: '$$', right: '$$', display: true },
                            { left: '\\[', right: '\\]', display: true },
                            { left: '$', right: '$', display: false },
                            { left: '\\(', right: '\\)', display: false }
                        ],
                        throwOnError: false,
                        trust: false,
                        maxExpand: 50
                    });
                } else if (window.Pumkin && window.Pumkin.Math && typeof window.Pumkin.Math.renderElement === 'function') {
                    window.Pumkin.Math.renderElement(el);
                } else if (window.PumkinMath && typeof window.PumkinMath.typeset === 'function') {
                    window.PumkinMath.typeset(el);
                }
            } catch (err) {
                console.warn('[MathSolverUI] KaTeX typesetting error:', err);
            }
        }
    };

    // Export to global Pumkin namespace
    window.Pumkin.MathSolverUI = PumkinMathSolverUI;
    window.PumkinMathSolverUI = PumkinMathSolverUI;

})(typeof window !== 'undefined' ? window : this);
