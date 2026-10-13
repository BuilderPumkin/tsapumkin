/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.Auth
 * Layer: Core Identity & Access Management
 * Description: User Authentication, Session Persistence & Level System Integration
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

const PumkinAuth = {
    STORAGE_KEYS: {
        SESSION_TOKEN: "pumkin_session_token",
        LOCAL_ACCOUNTS: "pumkin_local_accounts",
        ACTIVE_USER: "pumkin_active_user"
    },
    currentUser: null,
    
    get API_BASE() {
        return (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:3001/api/auth' : '/api/auth';
    },

    isOfflineEnvironment() {
        return window.location.protocol === 'file:' || !window.navigator.onLine;
    },

    getLocalAccounts() {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEYS.LOCAL_ACCOUNTS);
            if (raw) {
                const accounts = JSON.parse(raw);
                // Purge any temporary test accounts
                const cleaned = accounts.filter(a => a.id !== "offline_admin" && a.id !== "offline_student" && a.username !== "admin" && a.username !== "hocsinh");
                if (cleaned.length !== accounts.length) {
                    this.saveLocalAccounts(cleaned);
                }
                return cleaned;
            }
        } catch (e) {}
        return [];
    },

    saveLocalAccounts(accounts) {
        try {
            localStorage.setItem(this.STORAGE_KEYS.LOCAL_ACCOUNTS, JSON.stringify(accounts));
        } catch (e) {
            console.error("[PumkinAuth] Failed to save local accounts:", e);
        }
    },

    async init() {
        // 1. Instant offline restore from persistent active user
        try {
            const cachedUser = localStorage.getItem(this.STORAGE_KEYS.ACTIVE_USER);
            if (cachedUser) {
                this.currentUser = JSON.parse(cachedUser);
            }
        } catch (e) {
            this.currentUser = null;
        }

        // 2. If online and token exists, try server sync
        const token = localStorage.getItem(this.STORAGE_KEYS.SESSION_TOKEN);
        if (token && !this.isOfflineEnvironment()) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 2000);
                const res = await fetch(`${this.API_BASE}/me`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                    signal: controller.signal
                });
                clearTimeout(timeoutId);
                if (res.ok) {
                    const data = await res.json();
                    this.currentUser = data.user;
                    localStorage.setItem(this.STORAGE_KEYS.ACTIVE_USER, JSON.stringify(this.currentUser));
                } else if (res.status === 401 || res.status === 403) {
                    this.currentUser = null;
                    localStorage.removeItem(this.STORAGE_KEYS.SESSION_TOKEN);
                    localStorage.removeItem(this.STORAGE_KEYS.ACTIVE_USER);
                }
            } catch (e) {
                console.log("[PumkinAuth] Server offline, retaining local session.");
            }
        }

        this.updateNavUser();
    },

    getCurrentUser() { return this.currentUser; },
    getCurrentUserId() { return this.currentUser ? this.currentUser.id : null; },

    togglePassword(inputId) {
        const el = document.getElementById(inputId);
        if (el) el.type = (el.type === "password") ? "text" : "password";
    },

    showModal(tab = 'login') {
        const modal = document.getElementById("modal-auth");
        if (!modal) return;
        this.clearAlert();
        if (this.currentUser) this.switchTab('profile');
        else this.switchTab(tab);
        modal.classList.add("active");
    },

    closeModal() {
        const modal = document.getElementById("modal-auth");
        if (modal) modal.classList.remove("active");
    },

    switchTab(tab) {
        this.clearAlert();
        const btnLogin = document.getElementById("tab-btn-login");
        const btnReg = document.getElementById("tab-btn-register");
        const btnProfile = document.getElementById("tab-btn-profile");
        const formLogin = document.getElementById("form-login");
        const formReg = document.getElementById("form-register");
        const panelProfile = document.getElementById("panel-profile");

        if (btnLogin) btnLogin.classList.toggle("active", tab === "login");
        if (btnReg) btnReg.classList.toggle("active", tab === "register");
        if (btnProfile) btnProfile.classList.toggle("active", tab === "profile");

        if (formLogin) formLogin.style.display = (tab === "login") ? "block" : "none";
        if (formReg) formReg.style.display = (tab === "register") ? "block" : "none";
        if (panelProfile) panelProfile.style.display = (tab === "profile") ? "block" : "none";

        if (tab === "profile" && this.currentUser) {
            const fnDisplay = document.getElementById("profile-fullname-display");
            const uDisplay = document.getElementById("profile-username-display");
            const eDisplay = document.getElementById("profile-email-display");
            const gBadge = document.getElementById("profile-goal-badge");
            const jDisplay = document.getElementById("profile-joined-date");
            const sDisplay = document.getElementById("profile-storage-tag");

            if (fnDisplay) fnDisplay.textContent = this.currentUser.displayName || this.currentUser.username;
            if (uDisplay) uDisplay.textContent = "@" + this.currentUser.username;
            if (eDisplay) eDisplay.textContent = this.currentUser.email || "";
            if (gBadge) gBadge.textContent = this.currentUser.goal ? `Mục tiêu: ${this.currentUser.goal}` : "Mục tiêu: Đỗ đại học";
            if (jDisplay) jDisplay.textContent = this.currentUser.createdAt || "Gần đây";
            if (sDisplay) sDisplay.textContent = "pumkin_v4_user_" + this.currentUser.id;

            // Render Level & EXP Progress Card
            if (window.PumkinLevelSystem && typeof window.PumkinLevelSystem.renderProfileCard === 'function') {
                window.PumkinLevelSystem.renderProfileCard('profile-level-card-container');
            }
        }
    },

    showAlert(msg, type = "success") {
        const alertBox = document.getElementById("auth-alert");
        if (!alertBox) return;
        alertBox.textContent = msg;
        alertBox.className = "auth-alert " + type;
        alertBox.style.display = "block";
    },
    clearAlert() {
        const alertBox = document.getElementById("auth-alert");
        if (alertBox) {
            alertBox.style.display = "none";
            alertBox.className = "auth-alert";
            alertBox.textContent = "";
        }
    },

    updateNavUser() {
        const btn = document.getElementById("btn-open-auth-modal");
        const btnProfile = document.getElementById("tab-btn-profile");
        const btnLogin = document.getElementById("tab-btn-login");
        const btnReg = document.getElementById("tab-btn-register");
        if (this.currentUser) {
            if (btn) btn.innerHTML = `<div class="user-avatar" style="width:28px;height:28px;border-radius:50%;background:var(--primary);color:white;display:flex;align-items:center;justify-content:center;font-weight:bold;">${this.currentUser.username.charAt(0).toUpperCase()}</div>`;
            if (btnProfile) btnProfile.style.display = "inline-block";
            if (btnLogin) btnLogin.style.display = "none";
            if (btnReg) btnReg.style.display = "none";
        } else {
            if (btn) btn.innerHTML = `👤 <span style="margin-left:5px">Đăng nhập</span>`;
            if (btnProfile) btnProfile.style.display = "none";
            if (btnLogin) btnLogin.style.display = "inline-block";
            if (btnReg) btnReg.style.display = "inline-block";
        }

        // Update Level Badge in navbar
        if (window.PumkinLevelSystem && typeof window.PumkinLevelSystem.updateNavBadge === 'function') {
            window.PumkinLevelSystem.updateNavBadge();
        }
        
        // Update Deep Learning Lock visually
        if (window.PumkinLevelSystem && typeof window.PumkinLevelSystem.updateDeepLearningLock === 'function') {
            window.PumkinLevelSystem.updateDeepLearningLock();
        }
    },

    async handleLogin(e) {
        e.preventDefault();
        const btn = e.target.querySelector("button[type='submit']");
        if(btn) { btn.disabled = true; btn.textContent = "Đang đăng nhập..."; }
        
        const u = document.getElementById("login-username").value.trim();
        const p = document.getElementById("login-password").value;
        if (!u || !p) {
            this.showAlert("Vui lòng điền đủ thông tin", "error");
            if(btn) { btn.disabled = false; btn.textContent = "Đăng nhập"; }
            return;
        }

        // Offline mode or file: protocol fallback
        if (this.isOfflineEnvironment()) {
            this.loginOffline(u, p, btn);
            return;
        }

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2500);
            const res = await fetch(`${this.API_BASE}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: u, password: p }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem(this.STORAGE_KEYS.SESSION_TOKEN, data.token);
                this.currentUser = data.user;
                localStorage.setItem(this.STORAGE_KEYS.ACTIVE_USER, JSON.stringify(this.currentUser));
                this.showAlert("Đăng nhập thành công!", "success");
                this.updateNavUser();
                setTimeout(() => {
                    this.closeModal();
                    if(typeof loadUserData === 'function') loadUserData();
                }, 800);
                if(btn) { btn.disabled = false; btn.textContent = "Đăng nhập"; }
                return;
            } else {
                this.showAlert(data.error || "Lỗi đăng nhập", "error");
                if(btn) { btn.disabled = false; btn.textContent = "Đăng nhập"; }
                return;
            }
        } catch(err) {
            console.warn("[PumkinAuth] Server offline, attempting local offline authentication...", err);
            this.loginOffline(u, p, btn);
        }
    },

    loginOffline(u, p, btn) {
        const accounts = this.getLocalAccounts();
        const match = accounts.find(a => a.username.toLowerCase() === u.toLowerCase());
        if (!match) {
            this.showAlert("Tài khoản chưa tồn tại trên máy. Bạn hãy chuyển sang tab 'Đăng ký' để tạo ngay!", "error");
            if(btn) { btn.disabled = false; btn.textContent = "Đăng nhập"; }
            return;
        }
        if (match.password !== p) {
            this.showAlert("Mật khẩu không chính xác.", "error");
            if(btn) { btn.disabled = false; btn.textContent = "Đăng nhập"; }
            return;
        }

        const userObj = {
            id: match.id,
            username: match.username,
            displayName: match.displayName || match.username,
            role: match.role || "student",
            createdAt: match.createdAt || new Date().toLocaleDateString('vi-VN')
        };
        const localToken = "pumkin_offline_token_" + match.id;
        localStorage.setItem(this.STORAGE_KEYS.SESSION_TOKEN, localToken);
        localStorage.setItem(this.STORAGE_KEYS.ACTIVE_USER, JSON.stringify(userObj));
        this.currentUser = userObj;

        this.showAlert("Đăng nhập thành công (Chế độ Offline)! 🎉", "success");
        this.updateNavUser();
        setTimeout(() => {
            this.closeModal();
            if(typeof loadUserData === 'function') loadUserData();
        }, 800);
        if(btn) { btn.disabled = false; btn.textContent = "Đăng nhập"; }
    },

    async handleRegister(e) {
        e.preventDefault();
        const btn = e.target.querySelector("button[type='submit']");
        if(btn) { btn.disabled = true; btn.textContent = "Đang đăng ký..."; }
        
        const fullname = document.getElementById("reg-fullname").value.trim();
        const u = document.getElementById("reg-username").value.trim();
        const p = document.getElementById("reg-password").value;
        if (!u || !p || p.length < 6) {
            this.showAlert("Tên đăng nhập và mật khẩu (tối thiểu 6 ký tự) là bắt buộc.", "error");
            if(btn) { btn.disabled = false; btn.textContent = "Đăng ký"; }
            return;
        }

        if (this.isOfflineEnvironment()) {
            this.registerOffline(fullname, u, p, btn);
            return;
        }

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2500);
            const res = await fetch(`${this.API_BASE}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: u, displayName: fullname, password: p }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem(this.STORAGE_KEYS.SESSION_TOKEN, data.token);
                this.currentUser = data.user;
                localStorage.setItem(this.STORAGE_KEYS.ACTIVE_USER, JSON.stringify(this.currentUser));
                this.showAlert("Đăng ký thành công!", "success");
                this.updateNavUser();
                setTimeout(() => {
                    this.closeModal();
                }, 800);
                if(btn) { btn.disabled = false; btn.textContent = "Đăng ký"; }
                return;
            } else {
                this.showAlert(data.error || "Lỗi đăng ký", "error");
                if(btn) { btn.disabled = false; btn.textContent = "Đăng ký"; }
                return;
            }
        } catch(err) {
            console.warn("[PumkinAuth] Server offline, attempting local offline registration...", err);
            this.registerOffline(fullname, u, p, btn);
        }
    },

    registerOffline(fullname, u, p, btn) {
        const accounts = this.getLocalAccounts();
        const exists = accounts.some(a => a.username.toLowerCase() === u.toLowerCase());
        if (exists) {
            this.showAlert("Tên đăng nhập này đã được sử dụng trên máy.", "error");
            if(btn) { btn.disabled = false; btn.textContent = "Đăng ký"; }
            return;
        }

        const newId = "local_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4);
        const newAccount = {
            id: newId,
            username: u,
            displayName: fullname || u,
            password: p,
            role: "student",
            createdAt: new Date().toLocaleDateString('vi-VN')
        };
        accounts.push(newAccount);
        this.saveLocalAccounts(accounts);

        const userObj = {
            id: newAccount.id,
            username: newAccount.username,
            displayName: newAccount.displayName,
            role: newAccount.role,
            createdAt: newAccount.createdAt
        };
        const localToken = "pumkin_offline_token_" + newAccount.id;
        localStorage.setItem(this.STORAGE_KEYS.SESSION_TOKEN, localToken);
        localStorage.setItem(this.STORAGE_KEYS.ACTIVE_USER, JSON.stringify(userObj));
        this.currentUser = userObj;

        if (window.PumkinLevelSystem && typeof window.PumkinLevelSystem.getUserProfile === 'function') {
            window.PumkinLevelSystem.getUserProfile(userObj.id);
        }

        this.showAlert("Đăng ký tài khoản thành công (Lưu trên máy)! 🎉", "success");
        this.updateNavUser();
        setTimeout(() => {
            this.closeModal();
        }, 800);
        if(btn) { btn.disabled = false; btn.textContent = "Đăng ký"; }
    },

    async handleLogout() {
        const token = localStorage.getItem(this.STORAGE_KEYS.SESSION_TOKEN);
        if (token && !this.isOfflineEnvironment()) {
            try {
                await fetch(`${this.API_BASE}/logout`, {
                    method: "POST",
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            } catch(e) {}
        }
        this.currentUser = null;
        localStorage.removeItem(this.STORAGE_KEYS.SESSION_TOKEN);
        localStorage.removeItem(this.STORAGE_KEYS.ACTIVE_USER);
        this.updateNavUser();
        this.closeModal();
        if(typeof clearUserData === 'function') clearUserData();
        PumkinToast.success("Đã đăng xuất thành công!");
        window.location.reload();
    }
};

if (typeof window !== "undefined") {
}


    // Primary Namespace
    window.Pumkin.Auth = PumkinAuth;

    // // DEPRECATED: Backward compatibility shim
    window.PumkinAuth = PumkinAuth;
})(window);
