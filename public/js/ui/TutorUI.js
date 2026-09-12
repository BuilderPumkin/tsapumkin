/**
 * PUMKIN AI TUTOR UI CONTROLLER - VS CODE STYLE
 * Manages the 1/4 docked Copilot panel on the right,
 * with 3/4 workspace on the left.
 */

const PumkinTutorUI = (function() {
    
    let isInitialized = false;
    let panelEl = null;
    let chatHistoryEl = null;
    let inputEl = null;
    let sendBtn = null;
    let contextBannerEl = null;
    let contextTitleEl = null;
    let contextTagEl = null;
    
    // Callback hooks
    let _onSendMessage = null;

    /**
     * Injects the VS Code style DOM structure
     */
    function init() {
        if (isInitialized) return;

        // 1. Inject CSS if not already present
        if (!document.getElementById('pumkin-tutor-css')) {
            const link = document.createElement('link');
            link.id = 'pumkin-tutor-css';
            link.rel = 'stylesheet';
            link.href = 'css/tutor.css';
            document.head.appendChild(link);
        }

        // 2. Inject VS Code Panel Template
        const template = `
            <aside id="pumkin-tutor-panel" aria-hidden="true" role="complementary" aria-label="PUMKIN AI Copilot">
                <!-- VS Code Title Bar -->
                <div class="vsc-titlebar">
                    <div class="vsc-title-group">
                        <span class="vsc-copilot-icon">🤖</span>
                        <span class="vsc-title">PUMKIN COPILOT</span>
                        <span class="vsc-status-badge">Socratic</span>
                    </div>
                    <div class="vsc-window-controls">
                        <button class="vsc-btn-icon" id="tutor-btn-clear" title="Xóa lịch sử trò chuyện">🗑️</button>
                        <button class="vsc-btn-icon close" id="tutor-btn-close" title="Đóng panel Copilot (Esc)">✕</button>
                    </div>
                </div>

                <!-- Secondary Tab Bar -->
                <div class="vsc-tabs-bar">
                    <div class="vsc-tab active">
                        <span>💬</span> Chat Trợ giảng
                    </div>
                    <div class="vsc-tab">
                        <span>📋</span> Socratic Guide
                    </div>
                </div>

                <!-- Active Problem Context Breadcrumb -->
                <div id="tutor-context-banner" class="vsc-context-bar" style="display: none;">
                    <span id="tutor-context-title" class="vsc-context-title">problem.ts</span>
                    <span id="tutor-context-tag" class="vsc-context-tag">TSA</span>
                </div>

                <!-- Chat Stream -->
                <div id="tutor-chat-history" class="vsc-chat-stream" aria-live="polite">
                    <div class="tutor-bubble ai">
                        <strong>Chào bạn!</strong> Tôi là <strong>PUMKIN AI Tutor</strong>. Hãy gửi bước giải hoặc câu hỏi thắc mắc, tôi sẽ hỗ trợ phân tích tư duy từng bước cùng bạn!
                    </div>
                </div>

                <!-- Quick Action Chips -->
                <div class="vsc-quick-actions">
                    <button class="vsc-chip" data-action="Gợi ý bước tiếp theo">💡 Gợi ý bước 1</button>
                    <button class="vsc-chip" data-action="Giải thích khái niệm này">🔍 Giải thích khái niệm</button>
                    <button class="vsc-chip" data-action="Kiểm tra xem em làm sai ở đâu">⚠️ Kiểm tra lỗi sai</button>
                    <button class="vsc-chip" data-action="Gợi ý công thức liên quan">📐 Công thức liên quan</button>
                </div>

                <!-- Input Footer -->
                <div class="vsc-input-box">
                    <div class="vsc-input-wrapper">
                        <input type="text" id="tutor-input" class="vsc-input" placeholder="Hỏi AI về bài toán (Enter để gửi)..." autocomplete="off" aria-label="Chat input">
                    </div>
                    <button id="tutor-send-btn" class="vsc-send-btn" title="Gửi (Enter)">
                        <span>Gửi</span> ↵
                    </button>
                </div>
            </aside>
        `;
        
        document.body.insertAdjacentHTML('beforeend', template);

        // 3. Cache Elements
        panelEl = document.getElementById('pumkin-tutor-panel');
        chatHistoryEl = document.getElementById('tutor-chat-history');
        inputEl = document.getElementById('tutor-input');
        sendBtn = document.getElementById('tutor-send-btn');
        contextBannerEl = document.getElementById('tutor-context-banner');
        contextTitleEl = document.getElementById('tutor-context-title');
        contextTagEl = document.getElementById('tutor-context-tag');

        // 4. Bind Events
        try {
            localStorage.removeItem('pumkin_gemini_api_key');
        } catch (e) {}

        const closeBtn = document.getElementById('tutor-btn-close');
        if (closeBtn) closeBtn.addEventListener('click', close);

        const clearBtn = document.getElementById('tutor-btn-clear');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                chatHistoryEl.innerHTML = `
                    <div class="tutor-bubble ai">
                        <em>Đã làm mới phiên hội thoại. Tôi sẵn sàng hỗ trợ bạn câu hỏi tiếp theo!</em>
                    </div>
                `;
            });
        }
        
        sendBtn.addEventListener('click', handleSend);
        inputEl.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });

        // Quick action chips
        const chips = panelEl.querySelectorAll('.vsc-chip');
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                const text = chip.getAttribute('data-action');
                if (text && _onSendMessage) {
                    _onSendMessage(text);
                }
            });
        });

        // Global Esc shortcut to close panel
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && panelEl && panelEl.getAttribute('aria-hidden') === 'false') {
                close();
            }
        });

        isInitialized = true;
    }

    function handleSend() {
        if (!inputEl) return;
        const text = inputEl.value.trim();
        if (!text) return;
        inputEl.value = '';
        if (_onSendMessage) _onSendMessage(text);
    }

    /**
     * Opens the VS Code Copilot panel and splits workspace into 3/4 & 1/4
     * @param {Object} displayContext - { title, tag }
     */
    function open(displayContext) {
        if (!isInitialized) init();
        
        panelEl.setAttribute('aria-hidden', 'false');
        document.body.classList.add('vsc-split-active');
        
        if (displayContext) {
            contextBannerEl.style.display = 'flex';
            if (contextTitleEl) contextTitleEl.textContent = displayContext.title || "Câu hỏi hiện tại";
            if (contextTagEl) contextTagEl.textContent = displayContext.tag || "Toán học";
        } else {
            contextBannerEl.style.display = 'none';
        }
        
        setTimeout(() => {
            if (inputEl) inputEl.focus();
        }, 300);
    }

    /**
     * Closes the panel and restores 100% full width workspace
     */
    function close() {
        if (!panelEl) return;
        panelEl.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('vsc-split-active');
    }

    /**
     * Renders a chat message bubble
     * @param {string} role - 'user' | 'ai' | 'error'
     * @param {string} text 
     */
    function addMessage(role, text) {
        if (!isInitialized) init();

        removeLoading();

        const bubble = document.createElement('div');
        bubble.className = `tutor-bubble ${role}`;
        
        if (role === 'error') {
            bubble.innerHTML = `<strong>⚠️ Thông báo AI:</strong> ${text}`;
        } else {
            bubble.innerText = text;
        }

        chatHistoryEl.appendChild(bubble);
        chatHistoryEl.scrollTop = chatHistoryEl.scrollHeight;

        if (role === 'ai' && window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([bubble]).catch(err => console.warn(err));
        }
    }

    function showLoading() {
        if (document.getElementById('tutor-loading')) return;
        const loadingStr = `
            <div id="tutor-loading" class="tutor-bubble ai tutor-typing">
                <span style="font-size: 11.5px; color: var(--vsc-text-muted); margin-right: 6px;">PUMKIN AI đang suy luận...</span>
                <div class="tutor-dot"></div>
                <div class="tutor-dot"></div>
                <div class="tutor-dot"></div>
            </div>`;
        chatHistoryEl.insertAdjacentHTML('beforeend', loadingStr);
        chatHistoryEl.scrollTop = chatHistoryEl.scrollHeight;
        if (sendBtn) sendBtn.disabled = true;
        if (inputEl) inputEl.disabled = true;
    }

    function removeLoading() {
        const loadingEl = document.getElementById('tutor-loading');
        if (loadingEl) loadingEl.remove();
        if (sendBtn) sendBtn.disabled = false;
        if (inputEl) {
            inputEl.disabled = false;
            inputEl.focus();
        }
    }

    function onSendMessage(callback) {
        _onSendMessage = callback;
    }


    return {
        init,
        open,
        close,
        addMessage,
        showLoading,
        removeLoading,
        onSendMessage
    };
})();

if (typeof window !== 'undefined') {
    window.PumkinTutorUI = PumkinTutorUI;
}
