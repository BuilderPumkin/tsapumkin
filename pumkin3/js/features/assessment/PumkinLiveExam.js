/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.LiveExam
 * Layer: Collaborative Assessment
 * Description: Multiplayer Realtime Exam Rooms & WebSockets/HTTP Polling
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

const PumkinLiveExam = {
    client: null,
    pin: "",
    isHost: false,
    
    async createRoom() {
        const hostname = window.location.hostname;
        if (window.location.protocol === 'file:' || hostname === 'localhost' || hostname === '127.0.0.1') {
            this.pin = Math.floor(100000 + Math.random() * 900000).toString();
            this.isHost = true;
            const pinDisplay = document.getElementById("live-host-pin-display");
            if (pinDisplay) pinDisplay.textContent = this.pin;
            const hostControls = document.getElementById("live-host-controls");
            if (hostControls) hostControls.style.display = "block";
            
            PumkinToast.info("Chế độ Offline: Đã tạo phòng giả lập (Mock Room)");
            this.connect(this.pin, true);
            return;
        }

        try {
            const res = await fetch("/api/live/create", { method: "POST" });
            const data = await res.json();
            this.pin = data.pin;
            this.isHost = true;
            const pinDisplay = document.getElementById("live-host-pin-display");
            if (pinDisplay) pinDisplay.textContent = this.pin;
            const hostControls = document.getElementById("live-host-controls");
            if (hostControls) hostControls.style.display = "block";
            
            this.connect(this.pin, true);
        } catch (e) {
            this.showError("Không thể tạo phòng trực tiếp");
        }
    },
    
    joinRoom() {
        const input = document.getElementById("live-pin-input");
        const pin = input ? input.value.trim() : "";
        if (pin.length !== 6) {
            this.showError("Mã PIN phải gồm đúng 6 chữ số!");
            return;
        }
        this.pin = pin;
        this.isHost = false;
        this.connect(this.pin, false);
    },
    
    connect(pin, isHost) {
        this.showError("");
        if (this.client) this.client.disconnect();
        
        const userId = (typeof PumkinAuth !== "undefined" && PumkinAuth.getCurrentUserId())
            ? PumkinAuth.getCurrentUserId()
            : "user_" + Math.random().toString(36).substring(2, 10);
        this.client = new LiveExamClient(pin, userId, isHost);
        
        this.client.onStateChange = (state) => {
            const stateEl = document.getElementById("live-host-room-state");
            if (stateEl) stateEl.textContent = state;
            if (state === "running" && !this.isHost) {
                this.showError("Phòng thi đã bắt đầu!");
            }
        };
        
        this.client.onParticipantsUpdate = (participants) => {
            const ul = document.getElementById("live-participants-ul");
            if (!ul) return;
            ul.innerHTML = participants.map(p => `
                <li style="padding: 10px; border-bottom: 1px solid var(--border-color, #e2e8f0); display: flex; justify-content: space-between; font-size: 13.5px;">
                    <span>Thí sinh: ${p.userId}</span>
                    <span style="color: ${p.status === 'connected' ? '#16a34a' : '#94a3b8'}; font-weight: 600;">
                        ${p.status} - Tiến độ: ${p.progress || 0}%
                    </span>
                </li>
            `).join("");
        };
        
        this.client.connect();
    },
    
    hostStartExam() {
        if (this.client && this.isHost) {
            this.client.sendHostAction("running");
        }
    },
    
    hostLockRoom() {
        if (this.client && this.isHost) {
            this.client.sendHostAction("locked");
        }
    },
    
    showError(msg) {
        const el = document.getElementById("live-lobby-status");
        if (!el) return;
        el.textContent = msg;
        el.style.display = msg ? "block" : "none";
    }
};


    // Primary Namespace
    window.Pumkin.LiveExam = PumkinLiveExam;

    // // DEPRECATED: Backward compatibility shim
    window.PumkinLiveExam = PumkinLiveExam;
})(window);
