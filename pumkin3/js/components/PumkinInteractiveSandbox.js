class PumkinInteractiveSandbox {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        if (!this.container) throw new Error('Container not found');
        
        this.options = Object.assign({
            onEvent: () => {},
            questionId: 'default',
            type: 'exponential', // exponential, logarithmic, oxyz_3d, markov
            initialParams: null
        }, options);
        
        // Default params based on type
        if (!this.options.initialParams) {
            if (this.options.type === 'exponential' || this.options.type === 'logarithmic') {
                this.options.initialParams = { a: 2, b: 0 };
            } else if (this.options.type === 'oxyz_3d') {
                this.options.initialParams = { rx: 30, rz: 45 }; // Rotation angles
            } else if (this.options.type === 'markov') {
                this.options.initialParams = { p1: 0.7, p2: 0.4 }; // Transition probabilities
            } else if (this.options.type === 'integral_area') {
                this.options.initialParams = { a: 0, b: 2 }; // Integral bounds
            } else if (this.options.type === 'cubic_function') {
                this.options.initialParams = { a: 1, b: -3, c: 0, d: 2 }; // Cubic coefficients
            }
        }
        
        this.state = { params: { ...this.options.initialParams } };
        this.elements = {};
        this.animationFrameId = null;
        this.lastEmitTime = 0;
        
        this.boundResize = this.handleResize.bind(this);
    }
    
    mount() {
        this.container.classList.add('pumkin-deep-learning', 'pdl-sandbox');
        this.renderUI();
        this.initCanvas();
        
        if (window.ResizeObserver) {
            this.resizeObserver = new ResizeObserver(this.boundResize);
            this.resizeObserver.observe(this.elements.canvasContainer);
        } else {
            window.addEventListener('resize', this.boundResize);
        }
        
        this.draw();
    }
    
    renderUI() {
        let controlsHTML = '';
        if (this.options.type === 'exponential' || this.options.type === 'logarithmic') {
            controlsHTML = `
                <div class="pdl-sandbox-slider-group">
                    <label for="pdl-slider-a">Cơ số (a): <span class="pdl-val-a">${this.state.params.a.toFixed(2)}</span></label>
                    <input type="range" id="pdl-slider-a" class="pdl-slider" data-param="a" min="0.1" max="5" step="0.1" value="${this.state.params.a}">
                </div>
                <div class="pdl-sandbox-slider-group">
                    <label for="pdl-slider-b">Dịch chuyển (b): <span class="pdl-val-b">${this.state.params.b.toFixed(1)}</span></label>
                    <input type="range" id="pdl-slider-b" class="pdl-slider" data-param="b" min="-5" max="5" step="0.5" value="${this.state.params.b}">
                </div>
            `;
        } else if (this.options.type === 'oxyz_3d') {
            controlsHTML = `
                <div class="pdl-sandbox-slider-group">
                    <label for="pdl-slider-rx">Góc X: <span class="pdl-val-rx">${this.state.params.rx}&deg;</span></label>
                    <input type="range" id="pdl-slider-rx" class="pdl-slider" data-param="rx" min="0" max="90" step="1" value="${this.state.params.rx}">
                </div>
                <div class="pdl-sandbox-slider-group">
                    <label for="pdl-slider-rz">Góc Z: <span class="pdl-val-rz">${this.state.params.rz}&deg;</span></label>
                    <input type="range" id="pdl-slider-rz" class="pdl-slider" data-param="rz" min="0" max="360" step="1" value="${this.state.params.rz}">
                </div>
            `;
        } else if (this.options.type === 'markov') {
            controlsHTML = `
                <div class="pdl-sandbox-slider-group">
                    <label for="pdl-slider-p1">P(A&rarr;A): <span class="pdl-val-p1">${this.state.params.p1.toFixed(2)}</span></label>
                    <input type="range" id="pdl-slider-p1" class="pdl-slider" data-param="p1" min="0" max="1" step="0.05" value="${this.state.params.p1}">
                </div>
                <div class="pdl-sandbox-slider-group">
                    <label for="pdl-slider-p2">P(B&rarr;B): <span class="pdl-val-p2">${this.state.params.p2.toFixed(2)}</span></label>
                    <input type="range" id="pdl-slider-p2" class="pdl-slider" data-param="p2" min="0" max="1" step="0.05" value="${this.state.params.p2}">
                </div>
            `;
        } else if (this.options.type === 'integral_area') {
            controlsHTML = `
                <div class="pdl-sandbox-slider-group">
                    <label for="pdl-slider-a">Cận dưới (a): <span class="pdl-val-a">${this.state.params.a.toFixed(1)}</span></label>
                    <input type="range" id="pdl-slider-a" class="pdl-slider" data-param="a" min="-3" max="3" step="0.5" value="${this.state.params.a}">
                </div>
                <div class="pdl-sandbox-slider-group">
                    <label for="pdl-slider-b">Cận trên (b): <span class="pdl-val-b">${this.state.params.b.toFixed(1)}</span></label>
                    <input type="range" id="pdl-slider-b" class="pdl-slider" data-param="b" min="-3" max="3" step="0.5" value="${this.state.params.b}">
                </div>
            `;
        } else if (this.options.type === 'cubic_function') {
            controlsHTML = `
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <div class="pdl-sandbox-slider-group">
                        <label for="pdl-slider-a">Hệ số a: <span class="pdl-val-a">${this.state.params.a.toFixed(1)}</span></label>
                        <input type="range" id="pdl-slider-a" class="pdl-slider" data-param="a" min="-3" max="3" step="0.1" value="${this.state.params.a}">
                    </div>
                    <div class="pdl-sandbox-slider-group">
                        <label for="pdl-slider-b">Hệ số b: <span class="pdl-val-b">${this.state.params.b.toFixed(1)}</span></label>
                        <input type="range" id="pdl-slider-b" class="pdl-slider" data-param="b" min="-5" max="5" step="0.5" value="${this.state.params.b}">
                    </div>
                    <div class="pdl-sandbox-slider-group">
                        <label for="pdl-slider-c">Hệ số c: <span class="pdl-val-c">${this.state.params.c.toFixed(1)}</span></label>
                        <input type="range" id="pdl-slider-c" class="pdl-slider" data-param="c" min="-5" max="5" step="0.5" value="${this.state.params.c}">
                    </div>
                    <div class="pdl-sandbox-slider-group">
                        <label for="pdl-slider-d">Hệ số d: <span class="pdl-val-d">${this.state.params.d.toFixed(1)}</span></label>
                        <input type="range" id="pdl-slider-d" class="pdl-slider" data-param="d" min="-5" max="5" step="0.5" value="${this.state.params.d}">
                    </div>
                </div>
            `;
        }

        this.container.innerHTML = `
            <div class="pdl-sandbox-canvas-container" aria-label="Interactive Math Graph">
                <canvas class="pdl-sandbox-canvas"></canvas>
            </div>
            <div class="pdl-sandbox-controls">
                ${controlsHTML}
            </div>
        `;
        
        this.elements.canvasContainer = this.container.querySelector('.pdl-sandbox-canvas-container');
        this.elements.canvas = this.container.querySelector('.pdl-sandbox-canvas');
        
        const sliders = this.container.querySelectorAll('.pdl-slider');
        sliders.forEach(slider => {
            const param = slider.getAttribute('data-param');
            const valEl = this.container.querySelector(`.pdl-val-${param}`);
            this.bindSlider(slider, valEl, param);
        });
    }
    
    bindSlider(sliderEl, valEl, paramName) {
        const handler = (e) => {
            const val = parseFloat(e.target.value);
            this.state.params[paramName] = val;
            
            if (paramName === 'rx' || paramName === 'rz') {
                valEl.innerHTML = `${val}&deg;`;
            } else {
                valEl.textContent = val.toFixed(paramName === 'b' ? 1 : 2);
            }
            
            this.requestDraw();
            
            const now = Date.now();
            if (now - this.lastEmitTime > 200) {
                this.emitTelemetry(paramName, val, 'drag');
                this.lastEmitTime = now;
            }
        };
        
        const changeHandler = (e) => {
            this.emitTelemetry(paramName, parseFloat(e.target.value), 'drop');
        };
        
        sliderEl.addEventListener('input', handler);
        sliderEl.addEventListener('change', changeHandler);
    }
    
    emitTelemetry(param, value, action) {
        this.options.onEvent({
            type: 'SANDBOX_INTERACTION',
            timestampMs: Date.now(),
            questionId: this.options.questionId,
            payload: { action, param, value, type: this.options.type }
        });
    }
    
    initCanvas() {
        this.ctx = this.elements.canvas.getContext('2d', { alpha: false });
        this.handleResize();
    }
    
    handleResize() {
        const rect = this.elements.canvasContainer.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        this.elements.canvas.width = rect.width * dpr;
        this.elements.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        
        this.canvasWidth = rect.width;
        this.canvasHeight = rect.height;
        this.requestDraw();
    }
    
    requestDraw() {
        if (!this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(() => {
                this.draw();
                this.animationFrameId = null;
            });
        }
    }
    
    draw() {
        if (!this.ctx) return;
        const w = this.canvasWidth;
        const h = this.canvasHeight;
        const ctx = this.ctx;
        
        // Background
        ctx.fillStyle = '#fafafa';
        ctx.fillRect(0, 0, w, h);
        
        if (this.options.type === 'oxyz_3d') {
            this.drawOxyz(ctx, w, h);
        } else if (this.options.type === 'markov') {
            this.drawMarkov(ctx, w, h);
        } else if (this.options.type === 'integral_area') {
            this.drawIntegralArea(ctx, w, h);
        } else if (this.options.type === 'cubic_function') {
            this.drawCubic(ctx, w, h);
        } else {
            this.drawFunction(ctx, w, h);
        }
    }

    drawOxyz(ctx, w, h) {
        const originX = w / 2;
        const originY = h / 2 + 30;
        const scale = 50;

        const { rx, rz } = this.state.params;
        const radX = rx * Math.PI / 180;
        const radZ = rz * Math.PI / 180;

        // Simple Isometric 3D Projection
        const project = (x, y, z) => {
            // Rotate Z
            let x1 = x * Math.cos(radZ) - y * Math.sin(radZ);
            let y1 = x * Math.sin(radZ) + y * Math.cos(radZ);
            let z1 = z;
            
            // Rotate X
            let x2 = x1;
            let y2 = y1 * Math.cos(radX) - z1 * Math.sin(radX);
            let z2 = y1 * Math.sin(radX) + z1 * Math.cos(radX);

            return {
                px: originX + x2 * scale,
                py: originY - y2 * scale
            };
        };

        const drawAxis = (x, y, z, color, label) => {
            const p0 = project(0, 0, 0);
            const p1 = project(x, y, z);
            
            ctx.beginPath();
            ctx.moveTo(p0.px, p0.py);
            ctx.lineTo(p1.px, p1.py);
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.fillStyle = color;
            ctx.font = '14px Arial';
            ctx.fillText(label, p1.px + 5, p1.py - 5);
        };

        // Draw basic plane (Z=0)
        ctx.beginPath();
        const p1 = project(-2, -2, 0);
        const p2 = project(2, -2, 0);
        const p3 = project(2, 2, 0);
        const p4 = project(-2, 2, 0);
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.lineTo(p3.px, p3.py);
        ctx.lineTo(p4.px, p4.py);
        ctx.closePath();
        ctx.fillStyle = 'rgba(200, 220, 240, 0.3)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(150, 180, 210, 0.5)';
        ctx.stroke();

        // Axes
        drawAxis(3, 0, 0, '#ef4444', 'X'); // Red
        drawAxis(0, 3, 0, '#22c55e', 'Y'); // Green
        drawAxis(0, 0, 3, '#3b82f6', 'Z'); // Blue

        // Draw a point M(1, 1.5, 2)
        const pm = project(1, 1.5, 2);
        const pmxy = project(1, 1.5, 0);
        
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(project(1, 0, 0).px, project(1, 0, 0).py);
        ctx.lineTo(pmxy.px, pmxy.py);
        ctx.lineTo(project(0, 1.5, 0).px, project(0, 1.5, 0).py);
        ctx.moveTo(pmxy.px, pmxy.py);
        ctx.lineTo(pm.px, pm.py);
        ctx.strokeStyle = '#64748b';
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.arc(pm.px, pm.py, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#ea580c';
        ctx.fill();
        ctx.fillText('M(1, 1.5, 2)', pm.px + 10, pm.py);
    }

    drawMarkov(ctx, w, h) {
        const { p1, p2 } = this.state.params;
        const p12 = 1 - p1;
        const p21 = 1 - p2;

        const cA = { x: w / 3, y: h / 2 };
        const cB = { x: 2 * w / 3, y: h / 2 };
        const r = 40;

        ctx.font = '16px Inter, Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Draw edges
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#64748b';
        
        // A -> B
        ctx.beginPath();
        ctx.moveTo(cA.x, cA.y - 15);
        ctx.quadraticCurveTo(w / 2, h / 2 - 50, cB.x, cB.y - 15);
        ctx.stroke();
        this.drawArrow(ctx, cB.x - 15, cB.y - 20, 0.3);
        ctx.fillStyle = '#333';
        ctx.fillText(p12.toFixed(2), w / 2, h / 2 - 60);

        // B -> A
        ctx.beginPath();
        ctx.moveTo(cB.x, cB.y + 15);
        ctx.quadraticCurveTo(w / 2, h / 2 + 50, cA.x, cA.y + 15);
        ctx.stroke();
        this.drawArrow(ctx, cA.x + 15, cA.y + 20, Math.PI + 0.3);
        ctx.fillText(p21.toFixed(2), w / 2, h / 2 + 60);

        // A -> A
        ctx.beginPath();
        ctx.arc(cA.x - 30, cA.y - 30, 20, 0, Math.PI * 1.5, true);
        ctx.stroke();
        ctx.fillText(p1.toFixed(2), cA.x - 40, cA.y - 60);

        // B -> B
        ctx.beginPath();
        ctx.arc(cB.x + 30, cB.y - 30, 20, Math.PI, Math.PI * 2.5, false);
        ctx.stroke();
        ctx.fillText(p2.toFixed(2), cB.x + 40, cB.y - 60);

        // Nodes
        ctx.beginPath();
        ctx.arc(cA.x, cA.y, r, 0, Math.PI * 2);
        ctx.fillStyle = '#eff6ff';
        ctx.fill();
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fillStyle = '#1e3a8a';
        ctx.fillText('Trạng thái A', cA.x, cA.y);

        ctx.beginPath();
        ctx.arc(cB.x, cB.y, r, 0, Math.PI * 2);
        ctx.fillStyle = '#fefce8';
        ctx.fill();
        ctx.strokeStyle = '#eab308';
        ctx.stroke();
        ctx.fillStyle = '#854d0e';
        ctx.fillText('Trạng thái B', cB.x, cB.y);
    }

    drawArrow(ctx, x, y, angle) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-10, -5);
        ctx.lineTo(-10, 5);
        ctx.fillStyle = '#64748b';
        ctx.fill();
        ctx.restore();
    }

    drawIntegralArea(ctx, w, h) {
        const scale = 40;
        const originX = w / 2;
        const originY = h / 2 + 50;

        // Grid
        ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; ctx.beginPath();
        for(let x = originX % scale; x < w; x += scale) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
        for(let y = originY % scale; y < h; y += scale) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
        ctx.stroke();

        // Axes
        ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.beginPath();
        ctx.moveTo(0, originY); ctx.lineTo(w, originY);
        ctx.moveTo(originX, 0); ctx.lineTo(originX, h);
        ctx.stroke();
        
        ctx.fillStyle = '#64748b'; ctx.font = '12px Arial';
        ctx.fillText('O', originX - 15, originY + 15);
        ctx.fillText('x', w - 15, originY - 10);
        ctx.fillText('y', originX + 10, 15);

        const { a, b } = this.state.params;
        const minX = Math.min(a, b);
        const maxX = Math.max(a, b);

        // f(x) = x^2 / 2 - 2
        const f = (x) => (x * x) / 2 - 2;

        // Shade area
        ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
        ctx.beginPath();
        ctx.moveTo(originX + minX * scale, originY);
        for(let px = originX + minX * scale; px <= originX + maxX * scale; px++) {
            const x = (px - originX) / scale;
            ctx.lineTo(px, originY - f(x) * scale);
        }
        ctx.lineTo(originX + maxX * scale, originY);
        ctx.closePath();
        ctx.fill();

        // Draw function line
        ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 2.5; ctx.beginPath();
        let first = true;
        for(let px = 0; px <= w; px += 2) {
            const x = (px - originX) / scale;
            const py = originY - f(x) * scale;
            if(first) { ctx.moveTo(px, py); first = false; } else { ctx.lineTo(px, py); }
        }
        ctx.stroke();

        // Boundaries
        ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(originX + a * scale, originY); ctx.lineTo(originX + a * scale, originY - f(a) * scale);
        ctx.moveTo(originX + b * scale, originY); ctx.lineTo(originX + b * scale, originY - f(b) * scale);
        ctx.stroke();
        ctx.setLineDash([]);
        
        ctx.fillStyle = '#ef4444'; ctx.font = '14px Arial';
        ctx.fillText('a', originX + a * scale - 5, originY + 20);
        ctx.fillText('b', originX + b * scale - 5, originY + 20);
    }

    drawCubic(ctx, w, h) {
        const scale = 40;
        const originX = w / 2;
        const originY = h / 2;

        // Grid & Axes
        ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; ctx.beginPath();
        for(let x = originX % scale; x < w; x += scale) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
        for(let y = originY % scale; y < h; y += scale) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
        ctx.stroke();
        ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.beginPath();
        ctx.moveTo(0, originY); ctx.lineTo(w, originY);
        ctx.moveTo(originX, 0); ctx.lineTo(originX, h);
        ctx.stroke();
        ctx.fillStyle = '#64748b'; ctx.font = '12px Arial';
        ctx.fillText('O', originX - 15, originY + 15);

        const { a, b, c, d } = this.state.params;
        const f = (x) => a*x*x*x + b*x*x + c*x + d;
        const df = (x) => 3*a*x*x + 2*b*x + c;

        ctx.strokeStyle = '#10b981'; ctx.lineWidth = 2.5; ctx.beginPath();
        let first = true;
        for(let px = 0; px <= w; px += 2) {
            const x = (px - originX) / scale;
            const py = originY - f(x) * scale;
            if(py > -1000 && py < h + 1000) {
                if(first) { ctx.moveTo(px, py); first = false; } else { ctx.lineTo(px, py); }
            } else { first = true; }
        }
        ctx.stroke();

        // Extrema points (f'(x) = 0)
        const delta = 4*b*b - 12*a*c;
        if (a !== 0 && delta > 0) {
            const x1 = (-2*b - Math.sqrt(delta)) / (6*a);
            const x2 = (-2*b + Math.sqrt(delta)) / (6*a);
            
            [x1, x2].forEach(ex => {
                const px = originX + ex * scale;
                const py = originY - f(ex) * scale;
                ctx.beginPath();
                ctx.arc(px, py, 5, 0, Math.PI * 2);
                ctx.fillStyle = '#ef4444'; ctx.fill();
                ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.stroke();
            });
            ctx.fillStyle = '#333'; ctx.font = '14px Arial';
            ctx.fillText(`Δ' = ${delta.toFixed(1)} > 0 (Có 2 cực trị)`, 10, 25);
        } else if (a !== 0 && delta === 0) {
            ctx.fillStyle = '#333'; ctx.font = '14px Arial';
            ctx.fillText(`Δ' = 0 (Không có cực trị)`, 10, 25);
        } else if (a !== 0 && delta < 0) {
            ctx.fillStyle = '#333'; ctx.font = '14px Arial';
            ctx.fillText(`Δ' < 0 (Không có cực trị)`, 10, 25);
        }
    }

    drawFunction(ctx, w, h) {
        const scale = 40;
        const originX = w / 2;
        const originY = h / 2;
        
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for(let x = originX % scale; x < w; x += scale) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
        for(let y = originY % scale; y < h; y += scale) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
        ctx.stroke();
        
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, originY); ctx.lineTo(w, originY);
        ctx.moveTo(originX, 0); ctx.lineTo(originX, h);
        ctx.stroke();
        
        const { a, b } = this.state.params;
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        
        let firstPoint = true;
        
        for(let px = 0; px <= w; px += 2) {
            const x = (px - originX) / scale;
            let y;
            
            if (this.options.type === 'exponential') {
                y = Math.pow(a, x) + b;
            } else if (this.options.type === 'logarithmic') {
                if (x <= 0 || a <= 0 || a === 1) continue;
                y = (Math.log(x) / Math.log(a)) + b;
            }
            
            const py = originY - y * scale;
            
            if (py > -1000 && py < h + 1000) {
                if (firstPoint) { ctx.moveTo(px, py); firstPoint = false; }
                else { ctx.lineTo(px, py); }
            } else {
                firstPoint = true;
            }
        }
        ctx.stroke();
    }
    
    update(data) {
        if (data.params) {
            this.state.params = { ...this.state.params, ...data.params };
            Object.keys(this.state.params).forEach(k => {
                const slider = this.container.querySelector(`.pdl-slider[data-param="${k}"]`);
                const valEl = this.container.querySelector(`.pdl-val-${k}`);
                if (slider) slider.value = this.state.params[k];
                if (valEl) {
                    if (k === 'rx' || k === 'rz') valEl.innerHTML = `${this.state.params[k]}&deg;`;
                    else valEl.textContent = this.state.params[k].toFixed(k === 'b' ? 1 : 2);
                }
            });
            this.requestDraw();
        }
    }
    
    getState() { return { ...this.state }; }
    
    reset() { this.update({ params: this.options.initialParams }); }
    
    destroy() {
        if (this.resizeObserver) this.resizeObserver.disconnect();
        else window.removeEventListener('resize', this.boundResize);
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
        this.container.innerHTML = '';
        this.container.classList.remove('pumkin-deep-learning', 'pdl-sandbox');
    }
}
window.PumkinInteractiveSandbox = PumkinInteractiveSandbox;
