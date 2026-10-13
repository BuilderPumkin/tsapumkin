class PumkinReverseChallenge {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        if (!this.container) throw new Error('Container not found');
        
        this.options = Object.assign({
            onEvent: () => {},
            questionId: 'default'
        }, options);
        
        this.state = { problem: '', distractors: [{ text: '', trap: '' }] };
    }
    
    mount() {
        this.container.classList.add('pumkin-deep-learning', 'pdl-reverse');
        this.render();
    }
    
    render() {
        this.container.innerHTML = `
            <h3 class="pdl-reverse-header">Kỹ thuật Đảo ngược (Reverse Engineering)</h3>
            <p class="pdl-reverse-desc">Hãy thử đóng vai người ra đề: Tự thiết kế một bài toán tương tự và tạo ra các phương án nhiễu có chủ đích để bẫy học sinh khác.</p>
            
            <div class="pdl-reverse-group">
                <label for="pdl-prob-input">Đề bài của bạn:</label>
                <textarea id="pdl-prob-input" class="pdl-input pdl-problem" rows="3" placeholder="Ví dụ: Tìm tập xác định của hàm số y = log_2(x^2 - 1)">${this.state.problem}</textarea>
            </div>
            
            <div class="pdl-distractors-container"></div>
            
            <div class="pdl-reverse-group" style="flex-direction: row; gap: 1rem;">
                <button class="pdl-btn pdl-btn-outline pdl-add-distractor">+ Thêm nhiễu</button>
            </div>
            
            <hr style="border: 0; border-top: 1px solid var(--pdl-border); margin: 1rem 0;">
            <button class="pdl-btn pdl-btn-success pdl-submit-challenge">Nộp Thử Thách</button>
            <div class="pdl-error-msg" style="color: var(--pdl-danger); font-size: 0.875rem; display: none; margin-top: 0.5rem;"></div>
        `;
        
        this.renderDistractors();
        
        this.container.querySelector('.pdl-problem').addEventListener('input', (e) => {
            this.state.problem = e.target.value;
        });
        
        this.container.querySelector('.pdl-add-distractor').addEventListener('click', () => {
            this.state.distractors.push({ text: '', trap: '' });
            this.renderDistractors();
            this.options.onEvent({ type: 'REVERSE_CHALLENGE_ADD_DISTRACTOR', timestampMs: Date.now() });
        });
        
        this.container.querySelector('.pdl-submit-challenge').addEventListener('click', () => this.submit());
    }
    
    renderDistractors() {
        const container = this.container.querySelector('.pdl-distractors-container');
        container.innerHTML = '';
        
        this.state.distractors.forEach((distractor, index) => {
            const el = document.createElement('div');
            el.className = 'pdl-distractor pdl-reverse-group';
            el.innerHTML = `
                ${this.state.distractors.length > 1 ? '<button class="pdl-distractor-remove" aria-label="Xóa">&times;</button>' : ''}
                <label>Phương án nhiễu ${index + 1}:</label>
                <input type="text" class="pdl-input pdl-d-text" value="${distractor.text}" placeholder="Vd: D = R \\ {1,-1} (Đáp án sai do...)">
                <label style="margin-top:0.5rem">Giải thích bẫy nhận thức (Tại sao học sinh sẽ chọn cái này?)</label>
                <input type="text" class="pdl-input pdl-d-trap" value="${distractor.trap}" placeholder="Vd: Quên mất biểu thức trong logarit phải lớn hơn 0, chỉ xét khác 0">
            `;
            
            el.querySelector('.pdl-d-text').addEventListener('input', (e) => distractor.text = e.target.value);
            el.querySelector('.pdl-d-trap').addEventListener('input', (e) => distractor.trap = e.target.value);
            
            const removeBtn = el.querySelector('.pdl-distractor-remove');
            if (removeBtn) {
                removeBtn.addEventListener('click', () => {
                    this.state.distractors.splice(index, 1);
                    this.renderDistractors();
                });
            }
            
            container.appendChild(el);
        });
    }
    
    showError(msg) {
        const errEl = this.container.querySelector('.pdl-error-msg');
        errEl.textContent = msg;
        errEl.style.display = 'block';
        setTimeout(() => errEl.style.display = 'none', 4000);
    }
    
    submit() {
        if (!this.state.problem.trim()) {
            this.showError('Vui lòng nhập đề bài!');
            return;
        }
        
        // Validate filled distractors
        const validDistractors = this.state.distractors.filter(d => d.text.trim() && d.trap.trim());
        if (validDistractors.length === 0) {
            this.showError('Cần ít nhất 1 phương án nhiễu kèm giải thích bẫy!');
            return;
        }
        
        // Validate uniqueness
        const texts = validDistractors.map(d => d.text.trim());
        const uniqueTexts = new Set(texts);
        if (texts.length !== uniqueTexts.size) {
            this.showError('Các phương án nhiễu không được trùng lặp!');
            return;
        }

        this.options.onEvent({
            type: 'REVERSE_CHALLENGE_SUBMITTED',
            timestampMs: Date.now(),
            questionId: this.options.questionId,
            payload: {
                problem: this.state.problem,
                distractors: validDistractors
            }
        });
        
        // Success state
        this.container.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <h3 style="color: var(--pdl-success);">🎉 Xuất sắc!</h3>
                <p>Bạn đã hoàn thành thử thách Reverse Engineering.</p>
                <button class="pdl-btn pdl-btn-outline" id="pdl-reset-btn" style="margin-top: 1rem;">Làm lại</button>
            </div>
        `;
        this.container.querySelector('#pdl-reset-btn').addEventListener('click', () => this.reset());
    }
    
    update(data) {
        if (data.problem !== undefined) this.state.problem = data.problem;
        if (data.distractors !== undefined) this.state.distractors = data.distractors;
        this.render();
    }
    
    getState() { return { ...this.state }; }
    
    reset() {
        this.state = { problem: '', distractors: [{ text: '', trap: '' }] };
        this.render();
    }
    
    destroy() {
        this.container.innerHTML = '';
        this.container.classList.remove('pumkin-deep-learning', 'pdl-reverse');
    }
}
window.PumkinReverseChallenge = PumkinReverseChallenge;
