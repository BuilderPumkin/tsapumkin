/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.Perf
 * Layer: Core Foundation & Diagnostics
 * Description: High-precision performance timing & throttle/debounce utilities
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

    const PumkinPerf = {
        debounce(fn, delay = 250) {
            let timer = null;
            return function(...args) {
                const context = this;
                clearTimeout(timer);
                timer = setTimeout(() => fn.apply(context, args), delay);
            };
        },
        throttle(fn, limit = 250) {
            let lastRan = 0;
            let timer = null;
            return function(...args) {
                const context = this;
                const now = Date.now();
                if (now - lastRan >= limit) {
                    lastRan = now;
                    fn.apply(context, args);
                } else {
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        lastRan = Date.now();
                        fn.apply(context, args);
                    }, limit - (now - lastRan));
                }
            };
        }
    };

    window.Pumkin.Perf = PumkinPerf;
    // // DEPRECATED: Backward compatibility shim
    window.PumkinPerf = PumkinPerf;
})(window);
