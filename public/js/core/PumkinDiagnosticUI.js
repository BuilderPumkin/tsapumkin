window.PumkinDiagnosticUI = (function() {
    let deepLearningEnabled = true;

    function toggleDeepLearning(enabled) {
        deepLearningEnabled = enabled;
        window.PUMKIN_DEEP_LEARNING_ENABLED = enabled;
        
        const cockpit = document.getElementById('pdl-cockpit-bar');
        if (cockpit) {
            cockpit.style.opacity = enabled ? '1' : '0.5';
        }

        // Add toast or notification
        const msg = enabled ? "Đã BẬT chế độ Học Sâu. Hệ thống sẽ cá nhân hóa trải nghiệm." : "Đã TẮT chế độ Học Sâu. Quay về luyện tập tiêu chuẩn.";
        if (window.PumkinUI && typeof window.PumkinUI.showToast === 'function') {
            window.PumkinUI.showToast(msg, enabled ? 'success' : 'warning');
        }
    }

    function updateCockpitHUD(state) {
        if (!state) return;
        
        const cockpit = document.getElementById('pdl-cockpit-bar');
        if (cockpit) cockpit.style.display = 'block';

        const mBar = document.getElementById('pdl-mastery-bar');
        const mVal = document.getElementById('pdl-mastery-val');
        if (mBar) mBar.style.width = state.mastery_score + '%';
        if (mVal) mVal.textContent = state.mastery_score.toFixed(1) + '%';

        const rMarker = document.getElementById('pdl-rep-marker');
        const rVal = document.getElementById('pdl-rep-val');
        if (rMarker) rMarker.style.left = state.representation_gap + '%';
        if (rVal) rVal.textContent = state.representation_gap.toFixed(1) + '%';

        const fBar = document.getElementById('pdl-focus-bar');
        const fVal = document.getElementById('pdl-focus-val');
        if (fBar) fBar.style.width = (state.focus_deliberation_index * 100) + '%';
        if (fVal) fVal.textContent = (state.focus_deliberation_index * 100).toFixed(1) + '%';
    }

    function drawRadarChart(canvasId, stats) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        const cx = w / 2;
        const cy = h / 2;
        const rMax = Math.min(cx, cy) - 40;

        ctx.clearRect(0, 0, w, h);

        const labels = ['Symbolic Rigor', 'Visual Rep', 'Trap Resistance', 'Transfer Cap.', 'Deliberation'];
        // stats is array of 5 values [0, 1]
        const data = stats || [0.5, 0.5, 0.5, 0.5, 0.5];
        const numAxes = 5;
        const angleStep = (Math.PI * 2) / numAxes;

        // Draw web
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '12px Arial';
        
        const levels = 5;
        for (let level = 1; level <= levels; level++) {
            const r = (rMax / levels) * level;
            ctx.beginPath();
            for (let i = 0; i < numAxes; i++) {
                const angle = i * angleStep - Math.PI / 2;
                const px = cx + Math.cos(angle) * r;
                const py = cy + Math.sin(angle) * r;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.stroke();
        }

        // Draw axes and labels
        for (let i = 0; i < numAxes; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const px = cx + Math.cos(angle) * rMax;
            const py = cy + Math.sin(angle) * rMax;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(px, py);
            ctx.stroke();
            
            ctx.fillStyle = '#64748b';
            const lx = cx + Math.cos(angle) * (rMax + 20);
            const ly = cy + Math.sin(angle) * (rMax + 20);
            ctx.fillText(labels[i], lx, ly);
        }

        // Draw data area
        ctx.beginPath();
        for (let i = 0; i < numAxes; i++) {
            const val = Math.max(0, Math.min(1, data[i]));
            const r = rMax * val;
            const angle = i * angleStep - Math.PI / 2;
            const px = cx + Math.cos(angle) * r;
            const py = cy + Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(139, 92, 246, 0.4)';
        ctx.fill();
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw points
        for (let i = 0; i < numAxes; i++) {
            const val = Math.max(0, Math.min(1, data[i]));
            const r = rMax * val;
            const angle = i * angleStep - Math.PI / 2;
            const px = cx + Math.cos(angle) * r;
            const py = cy + Math.sin(angle) * r;
            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#7c3aed';
            ctx.fill();
            ctx.stroke();
        }
    }

    function renderDiagnosticModal(state) {
        if (!state) return;
        const modal = document.getElementById('pdl-diagnostic-modal');
        if (!modal) return;

        // Radar chart
        const r1 = state.rigor_score || 0;
        const r2 = 1 - (state.representation_gap / 100);
        const r3 = Math.max(0, 1 - (state.detected_traps ? state.detected_traps.length * 0.2 : 0));
        const r4 = state.mastery_score / 100;
        const r5 = state.focus_deliberation_index || 0;
        drawRadarChart('pdl-radar-chart', [r1, r2, r3, r4, r5]);

        const conf = document.getElementById('pdl-radar-confidence');
        if (conf) {
            const ev = state.evidence_count || 0;
            if (ev < 3) conf.innerHTML = '⚠️ Độ tin cậy thấp (Thiếu dữ liệu)';
            else if (ev < 10) conf.innerHTML = '✅ Độ tin cậy trung bình';
            else conf.innerHTML = '🌟 Độ tin cậy cao';
        }

        const trapList = document.getElementById('pdl-trap-list');
        if (trapList) {
            trapList.innerHTML = '';
            if (state.detected_traps && state.detected_traps.length > 0) {
                state.detected_traps.forEach(trap => {
                    const li = document.createElement('li');
                    li.textContent = trap;
                    trapList.appendChild(li);
                });
            } else {
                trapList.innerHTML = '<li>Không phát hiện bẫy. Tuyệt vời!</li>';
            }
        }

        const rec = document.getElementById('pdl-recommendation-text');
        if (rec) {
            if (state.mastery_score > 80 && state.representation_gap < 20) {
                rec.innerHTML = "Hệ thống nhận thấy bạn có năng lực toàn diện vững chắc. Khuyến nghị làm các câu hỏi Vận dụng cao (M4) dạng Reverse Challenge để bứt phá.";
            } else if (state.representation_gap > 30) {
                rec.innerHTML = "Bạn đang bị mất cân bằng giữa tư duy Đại số và Hình học trực quan. Khuyến nghị kích hoạt Sandbox tương tác nhiều hơn.";
            } else if (state.detected_traps && state.detected_traps.length > 0) {
                rec.innerHTML = "Bạn hay mắc các bẫy nhận thức định kỳ. Hãy chậm lại (tăng Deliberation) và cẩn thận xem xét điều kiện xác định.";
            } else {
                rec.innerHTML = "Hãy làm thêm bài tập để hệ thống có đủ dữ liệu khuyến nghị cho bạn.";
            }
        }

        modal.classList.add('active');
    }

    let hudInterval = null;

    function startHUDPolling() {
        if (hudInterval) clearInterval(hudInterval);
        hudInterval = setInterval(() => {
            if (deepLearningEnabled && window.PumkinCognitiveTracker && typeof window.PumkinCognitiveTracker.getStandardizedState === 'function') {
                const state = window.PumkinCognitiveTracker.getStandardizedState();
                if (state) updateCockpitHUD(state);
            }
        }, 2000);
    }

    // Auto-start polling on load
    startHUDPolling();

    return {
        toggleDeepLearning,
        updateCockpitHUD,
        renderDiagnosticModal,
        startHUDPolling
    };
})();

window.toggleDeepLearning = window.PumkinDiagnosticUI.toggleDeepLearning;
