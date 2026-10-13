/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.Theme
 * Layer: Core Foundation
 * Description: Theme Manager (Obsidian Dark Mode & Light Mode Synchronization)
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

    const PumkinTheme = {
        THEME_KEY: "pumkin_theme_v3",

        init() {
            const saved = localStorage.getItem(this.THEME_KEY);
            if (saved) {
                this.applyTheme(saved);
            } else {
                const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                this.applyTheme(prefersDark ? "dark" : "light");
            }

            // Listen for OS system theme changes
            if (window.matchMedia) {
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                    if (!localStorage.getItem(this.THEME_KEY)) {
                        this.applyTheme(e.matches ? "dark" : "light");
                    }
                });
            }
        },

        toggleTheme() {
            const isDark = document.body.classList.contains("dark-mode") || document.documentElement.getAttribute("data-theme") === "dark";
            const nextTheme = isDark ? "light" : "dark";
            this.applyTheme(nextTheme);
            localStorage.setItem(this.THEME_KEY, nextTheme);
        },

        applyTheme(theme) {
            const btn = document.getElementById("btn-theme-toggle");
            if (theme === "dark") {
                document.body.classList.add("dark-mode");
                document.documentElement.setAttribute("data-theme", "dark");
                if (btn) btn.textContent = "☀️";
            } else {
                document.body.classList.remove("dark-mode");
                document.documentElement.setAttribute("data-theme", "light");
                if (btn) btn.textContent = "🌙";
            }

            // Update mobile browser chrome color
            const metaTheme = document.querySelector('meta[name="theme-color"]');
            if (metaTheme) {
                metaTheme.setAttribute('content', theme === 'dark' ? '#0b0f19' : '#1e3a8a');
            }
        }
    };

    window.Pumkin.Theme = PumkinTheme;
    // // DEPRECATED: Backward compatibility shim
    window.PumkinTheme = PumkinTheme;
})(window);
