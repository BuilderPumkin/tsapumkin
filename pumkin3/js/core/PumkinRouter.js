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

        // Determine if container is empty or needs rendering
        const isAlreadyRendered = this.renderedViews.has(viewId);
        const isContainerEmpty = this.isViewContainerEmpty(viewId);

        if (!isAlreadyRendered || isContainerEmpty) {
            this.renderView(viewId);
        }

        if (callback) callback();
    },

    isViewContainerEmpty(viewId) {
        if (typeof document === 'undefined') return false;
        if (viewId === 'library') {
            const el = document.getElementById('exam-cards-grid');
            return !el || !el.querySelector('.exam-card');
        }
        if (viewId === 'formulas') {
            const el = document.getElementById('all-formulas-grid');
            return !el || !el.querySelector('.formula-card');
        }
        if (viewId === 'knowledge') {
            const el = document.getElementById('knowledge-cards-grid');
            return !el || !el.querySelector('.knowledge-card');
        }
        if (viewId === 'qbank') {
            const el = document.getElementById('qbank-list-container');
            return !el || !el.querySelector('.qbank-card');
        }
        if (viewId === 'math-solver') {
            const el = document.getElementById('view-math-solver');
            return !el || !el.querySelector('.math-solver-container');
        }
        return false;
    },

    renderView(viewId) {
        const targetEl = typeof document !== 'undefined' ? document.getElementById("view-" + viewId) : null;
        if (viewId === "knowledge" && typeof PumkinKnowledge !== "undefined") PumkinKnowledge.render();
        else if (viewId === "formulas" && typeof PumkinFormulas !== "undefined") PumkinFormulas.render();
        else if (viewId === "library" && typeof PumkinLibrary !== "undefined") PumkinLibrary.render();
        else if (viewId === "qbank" && typeof PumkinQBank !== "undefined") PumkinQBank.render();
        else if (viewId === "bookmarks" && typeof PumkinBookmarks !== "undefined") PumkinBookmarks.render();
        else if (viewId === "dashboard" && typeof PumkinDashboard !== "undefined") PumkinDashboard.render();
        else if (viewId === "smart" && typeof PumkinSmartPractice !== "undefined") PumkinSmartPractice.render();
        else if (viewId === "admin" && typeof PumkinAdmin !== "undefined") PumkinAdmin.render();
        else if (viewId === "data" && typeof PumkinDataRepo !== "undefined") PumkinDataRepo.render();
        else if (viewId === "math-solver" && typeof PumkinMathSolverUI !== "undefined") PumkinMathSolverUI.render();

        this.renderedViews.add(viewId);

        if (targetEl && window.PumkinMath && typeof window.PumkinMath.typeset === 'function') {
            window.PumkinMath.typeset(targetEl);
        }
    },

    renderCurrentView() {
        if (this.currentView) {
            this.renderView(this.currentView);
        }
    }
};

// Auto-re-render current view when data is hydrated from network or storage
if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    window.addEventListener('pumkin:data-hydrated', () => {
        PumkinRouter.invalidateView();
        if (typeof PumkinFormulas !== 'undefined' && typeof PumkinFormulas.invalidateCache === 'function') {
            PumkinFormulas.invalidateCache();
        }
        PumkinRouter.renderCurrentView();
    });
}


    // Primary Namespace
    window.Pumkin.Router = PumkinRouter;

    // // DEPRECATED: Backward compatibility shim
    window.PumkinRouter = PumkinRouter;
})(window);
