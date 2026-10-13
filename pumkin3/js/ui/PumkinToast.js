/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.Toast
 * Layer: UI Primitives & User Feedback
 * Description: Toast Notification & Confirmation Dialog Module
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

    const PumkinToast = {
        show(message, type = "info", duration = 4000) {
            const container = document.getElementById("pumkin-toast-container");
            if (!container) return;

            const icons = { success: "✅", error: "❌", warning: "⚠️", info: "ℹ️" };
            const toast = document.createElement("div");
            toast.className = "pumkin-toast toast-" + type;
            toast.innerHTML = '<span class="pumkin-toast-icon">' + (icons[type] || "ℹ️") + '</span>' +
                '<span class="pumkin-toast-body">' + message + '</span>' +
                '<button class="pumkin-toast-close" aria-label="Đóng thông báo">&times;</button>';

            toast.querySelector(".pumkin-toast-close").onclick = () => this.dismiss(toast);
            container.appendChild(toast);

            if (duration > 0) {
                setTimeout(() => this.dismiss(toast), duration);
            }
            return toast;
        },

        dismiss(toast) {
            if (!toast || toast.classList.contains("toast-exit")) return;
            toast.classList.add("toast-exit");
            setTimeout(() => {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 260);
        },

        success(msg, dur) { return this.show(msg, "success", dur); },
        error(msg, dur) { return this.show(msg, "error", dur || 6000); },
        warning(msg, dur) { return this.show(msg, "warning", dur || 5000); },
        info(msg, dur) { return this.show(msg, "info", dur); },

        confirm(message, { title = "Xác nhận", icon = "❓", confirmText = "Đồng ý", cancelText = "Hủy", danger = false } = {}) {
            return new Promise((resolve) => {
                const overlay = document.createElement("div");
                overlay.className = "pumkin-confirm-overlay";
                overlay.innerHTML =
                    '<div class="pumkin-confirm-card" role="dialog" aria-modal="true">' +
                        '<div class="pumkin-confirm-icon">' + icon + '</div>' +
                        '<div class="pumkin-confirm-title">' + title + '</div>' +
                        '<div class="pumkin-confirm-msg">' + message + '</div>' +
                        '<div class="pumkin-confirm-actions">' +
                            '<button type="button" class="pumkin-confirm-cancel">' + cancelText + '</button>' +
                            '<button type="button" class="pumkin-confirm-ok' + (danger ? ' danger' : '') + '">' + confirmText + '</button>' +
                        '</div>' +
                    '</div>';

                const close = (result) => {
                    overlay.remove();
                    resolve(result);
                };

                overlay.querySelector(".pumkin-confirm-cancel").onclick = () => close(false);
                overlay.querySelector(".pumkin-confirm-ok").onclick = () => close(true);
                overlay.addEventListener("keydown", (e) => {
                    if (e.key === "Escape") close(false);
                });
                document.body.appendChild(overlay);
                const cancelBtn = overlay.querySelector(".pumkin-confirm-cancel");
                if (cancelBtn) cancelBtn.focus();
            });
        }
    };

    window.Pumkin.Toast = PumkinToast;
    // // DEPRECATED: Backward compatibility shim
    window.PumkinToast = PumkinToast;
})(window);
