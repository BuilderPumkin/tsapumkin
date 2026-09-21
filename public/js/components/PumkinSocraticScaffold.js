class PumkinSocraticScaffold {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        if (!this.container) throw new Error('Container not found');
        
        this.options = Object.assign({
            onEvent: () => {},
            questionId: 'default',
            tiers: [
                { level: 1, name: "Nudge (Gợi mở)", text: "Hãy thử quan sát xem điều kiện xác định của bài toán là gì?" },
                { level: 2, name: "Concept Reminder (Nhắc nhở)", text: "Nhớ lại rằng: Hàm số logarit $\\log_a(x)$ chỉ xác định khi $x > 0$ và $a > 0, a \\ne 1$." },
                { level: 3, name: "Sub-goal (Mục tiêu phụ)", text: "Bước 1: Giải bất phương trình $x^2 - 4 > 0$ để tìm tập xác định." },
                { level: 4, name: "Worked Step (Hướng dẫn chi tiết)", text: "Ta có $x^2 - 4 > 0 \\iff (x-2)(x+2) > 0 \\iff x > 2$ hoặc $x < -2$. Vậy tập xác định là $D = (-\\infty, -2) \\cup (2, +\\infty)$." }
            ]
        }, options);
        
        this.state = { openedTiers: new Set(), currentMaxTier: 1 };
        this.handlers = new Map(); // Store handlers for cleanup
    }
    
    mount() {
        this.container.classList.add('pumkin-deep-learning', 'pdl-scaffold');
        this.render();
    }
    
    render() {
        // Cleanup old event listeners
        this.handlers.forEach((handler, el) => el.removeEventListener('click', handler));
        this.handlers.clear();
        this.container.innerHTML = '';
        
        this.options.tiers.forEach((tier) => {
            const tierEl = document.createElement('div');
            tierEl.className = 'pdl-scaffold-tier';
            if (this.state.openedTiers.has(tier.level)) {
                tierEl.classList.add('open');
            }
            
            const isLocked = tier.level > this.state.currentMaxTier;
            
            const header = document.createElement('button');
            header.className = 'pdl-scaffold-header';
            header.setAttribute('aria-expanded', this.state.openedTiers.has(tier.level));
            header.innerHTML = `<span>Bậc ${tier.level}: ${tier.name}</span> <span class="pdl-icon" aria-hidden="true">${isLocked ? '🔒' : '▼'}</span>`;
            
            if (isLocked) {
                header.setAttribute('disabled', 'true');
                header.setAttribute('aria-disabled', 'true');
            }
            
            const content = document.createElement('div');
            content.className = 'pdl-scaffold-content';
            content.innerHTML = `<p>${tier.text}</p>`;
            
            // Render Math if MathJax/KaTeX exists globally
            if (window.MathJax) {
                setTimeout(() => window.MathJax.typesetPromise && window.MathJax.typesetPromise([content]).catch(()=>{}), 0);
            }
            
            const handler = (e) => this.handleClick(tier.level, tierEl, header, e);
            header.addEventListener('click', handler);
            this.handlers.set(header, handler);
            
            tierEl.appendChild(header);
            tierEl.appendChild(content);
            this.container.appendChild(tierEl);
        });
    }
    
    handleClick(level, tierEl, headerEl, event) {
        if (level > this.state.currentMaxTier) return;
        
        const isOpen = tierEl.classList.toggle('open');
        headerEl.setAttribute('aria-expanded', isOpen);
        
        if (isOpen) {
            this.state.openedTiers.add(level);
            // Unlock next tier automatically if this is the max tier opened
            if (level === this.state.currentMaxTier && level < this.options.tiers.length) {
                this.state.currentMaxTier++;
                this.render(); // Re-render to update locks
            }
        } else {
            this.state.openedTiers.delete(level);
        }

        this.options.onEvent({
            type: isOpen ? 'SCAFFOLD_TIER_OPENED' : 'SCAFFOLD_TIER_CLOSED',
            timestampMs: Date.now(),
            questionId: this.options.questionId,
            payload: { level, name: this.options.tiers[level-1].name }
        });
    }
    
    update(data) {
        if (data.tiers) {
            this.options.tiers = data.tiers;
            this.render();
        }
    }
    
    getState() {
        return { 
            openedTiers: Array.from(this.state.openedTiers),
            currentMaxTier: this.state.currentMaxTier
        };
    }
    
    reset() {
        this.state = { openedTiers: new Set(), currentMaxTier: 1 };
        this.render();
    }
    
    destroy() {
        this.handlers.forEach((handler, el) => el.removeEventListener('click', handler));
        this.handlers.clear();
        this.container.innerHTML = '';
        this.container.classList.remove('pumkin-deep-learning', 'pdl-scaffold');
    }
}
window.PumkinSocraticScaffold = PumkinSocraticScaffold;
