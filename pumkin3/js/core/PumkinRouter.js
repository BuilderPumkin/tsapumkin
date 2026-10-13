/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.Router
 * Layer: Core Navigation Controller
 * Description: Client-side View Routing & Lazy Rendering Orchestrator
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

const PumkinRouter = {
    currentView: "guide",
    renderedViews: new Set(),

    invalidateView(viewId) {
        if (viewId) {
            this.renderedViews.delete(viewId);
        } else {
            this.renderedViews.clear();
        }
    },

    navigate(viewId, callback) {
        if (viewId === 'admin' || viewId === 'data') {
            const u = (typeof PumkinAuth !== 'undefined') ? PumkinAuth.currentUser : null;
            const isAdmin = !!(u && u.username && (u.username.toLowerCase().trim() === '@pumkin' || u.username.toLowerCase().trim() === 'pumkin'));
            if (!isAdmin) {
                if (typeof PumkinAuth !== 'undefined') {
                    PumkinAuth.showAlert('Tính năng này chỉ dành riêng cho tài khoản quản trị @pumkin!', 'error');
                    PumkinAuth.showModal('login');
                } else {
                    PumkinToast.warning('Tính năng này chỉ dành riêng cho tài khoản quản trị @pumkin!');
                }
                return;
            }
        }
        this.currentView = viewId;

        // Update nav tabs active state
        document.querySelectorAll(".nav-tab").forEach(tab => {
            if (tab.dataset.target === viewId) {
                tab.classList.add("active");
            } else {
                tab.classList.remove("active");
            }
        });

        // Toggle Views
        document.querySelectorAll(".app-view").forEach(v => {
            v.classList.remove("active");
        });

        const targetEl = document.getElementById("view-" + viewId);
        if (targetEl) {
            targetEl.classList.add("active");
        }

        if (viewId === "exam-player") {
            document.body.classList.add("exam-mode-active");
        } else {
            document.body.classList.remove("exam-mode-active");
        }

        window.scrollTo({ top: 0, behavior: "instant" });

        // Lazy View Caching: only render if not rendered yet or invalidated
        const isAlreadyRendered = this.renderedViews.has(viewId);
        if (!isAlreadyRendered) {
            if (viewId === "knowledge") PumkinKnowledge.render();
            else if (viewId === "formulas") PumkinFormulas.render();
            else if (viewId === "library") PumkinLibrary.render();
            else if (viewId === "qbank") PumkinQBank.render();
            else if (viewId === "bookmarks") PumkinBookmarks.render();
            else if (viewId === "dashboard") PumkinDashboard.render();
            else if (viewId === "smart") PumkinSmartPractice.render();
            else if (viewId === "admin") PumkinAdmin.render();
            else if (viewId === "data" && typeof PumkinDataRepo !== "undefined") PumkinDataRepo.render();

            this.renderedViews.add(viewId);

            if (targetEl && window.PumkinMath) {
                window.PumkinMath.typeset(targetEl);
            }
        }

        if (callback) callback();
    }
};


    // Primary Namespace
    window.Pumkin.Router = PumkinRouter;

    // // DEPRECATED: Backward compatibility shim
    window.PumkinRouter = PumkinRouter;
})(window);
