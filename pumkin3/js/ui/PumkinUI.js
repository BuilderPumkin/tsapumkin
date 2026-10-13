/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.UI
 * Layer: UI Primitives & Navigation
 * Description: UI Navigation controls & Responsive Table auto-wrappers
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

    const PumkinUI = {
        init() {
            const navLinks = document.getElementById("main-nav-links");
            if (navLinks) {
                // Enable mouse wheel horizontal scrolling on desktop PC
                navLinks.addEventListener("wheel", (e) => {
                    if (e.deltaY !== 0) {
                        e.preventDefault();
                        navLinks.scrollLeft += e.deltaY;
                    }
                }, { passive: false });
            }
            // Tự động kiểm tra và bọc toàn bộ các bảng vào khung responsive
            this.makeTablesResponsive();
        },

        makeTablesResponsive(root) {
            const container = root || document;
            container.querySelectorAll("table").forEach(tbl => {
                if (!tbl.parentElement.classList.contains("table-responsive") && 
                    !tbl.parentElement.classList.contains("endpoint-table-container")) {
                    const wrap = document.createElement("div");
                    wrap.className = "table-responsive";
                    tbl.parentNode.insertBefore(wrap, tbl);
                    wrap.appendChild(tbl);
                }
            });
        },

        scrollNav(amount) {
            const navLinks = document.getElementById("main-nav-links");
            if (navLinks) {
                navLinks.scrollBy({ left: amount, behavior: "smooth" });
            }
        }
    };

    window.Pumkin.UI = PumkinUI;
    // // DEPRECATED: Backward compatibility shim
    window.PumkinUI = PumkinUI;
})(window);
