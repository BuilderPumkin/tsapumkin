/**
 * PUMKIN JSXGRAPH COMPONENT
 * Safely renders JSXGraph widgets based on declarative JSON configs.
 * Features: Lazy loading, strict allowlist, debounced slider events.
 */

window.PumkinJSXGraph = (function() {
    'use strict';

    let isLoaded = false;
    let isLoading = false;
    let loadPromise = null;
    let currentBoard = null;
    let currentSliders = {};

    const CDN_JS = "https://cdn.jsdelivr.net/npm/jsxgraph@1.6.2/distrib/jsxgraphcore.js";
    const CDN_CSS = "https://cdn.jsdelivr.net/npm/jsxgraph@1.6.2/distrib/jsxgraph.css";

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function loadDependencies() {
        if (isLoaded) return Promise.resolve();
        if (isLoading) return loadPromise;

        isLoading = true;
        loadPromise = new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = CDN_CSS;
            document.head.appendChild(link);

            const script = document.createElement('script');
            script.src = CDN_JS;
            script.async = true;
            script.onload = () => {
                isLoaded = true;
                isLoading = false;
                if (window.JXG && window.JXG.Options) {
                    JXG.Options.text.useMathJax = true;
                }
                resolve();
            };
            script.onerror = () => {
                isLoading = false;
                reject(new Error("Failed to load JSXGraph"));
            };
            document.head.appendChild(script);
        });
        return loadPromise;
    }

    function freeCurrentBoard() {
        if (currentBoard && window.JXG) {
            try {
                JXG.JSXGraph.freeBoard(currentBoard);
            } catch (e) {
                console.warn("Error freeing JSXGraph board:", e);
            }
        }
        currentBoard = null;
        currentSliders = {};
    }

    async function render(containerId, config, onParamChange) {
        await loadDependencies();
        freeCurrentBoard();

        const container = document.getElementById(containerId);
        if (!container) return;
        
        if (!container.style.width) container.style.width = '100%';
        if (!container.style.height) container.style.height = '300px';

        const boundingBox = config.boundingBox || [-10, 10, 10, -10];
        currentBoard = JXG.JSXGraph.initBoard(containerId, {
            boundingbox: boundingBox,
            axis: true,
            showCopyright: false,
            showNavigation: false,
            keepaspectratio: true
        });

        if (config.sliders && Array.isArray(config.sliders)) {
            config.sliders.forEach(sliderDef => {
                const id = sliderDef.id; 
                const x = sliderDef.x || 1;
                const y = sliderDef.y || 8;
                const min = sliderDef.min || -5;
                const max = sliderDef.max || 5;
                const initVal = sliderDef.init || 0;
                const step = sliderDef.step || 1;
                const name = sliderDef.name || id;

                const slider = currentBoard.create('slider', [
                    [x, y], [x + 5, y], [min, initVal, max]
                ], {
                    name: name,
                    snapWidth: step,
                    highline: {strokeColor: '#1e3a8a'},
                    fillColor: '#1e3a8a'
                });
                
                currentSliders[id] = slider;

                if (onParamChange) {
                    const debouncedChange = debounce(() => {
                        onParamChange(id, slider.Value());
                    }, 100);
                    slider.on('drag', debouncedChange);
                }
            });
        }

        if (config.functions && Array.isArray(config.functions)) {
            config.functions.forEach(funcDef => {
                try {
                    const rawFunc = funcDef.expression;
                    const color = funcDef.color || '#0284c7';
                    
                    const varsStr = 'x' + (Object.keys(currentSliders).length > 0 ? ',' + Object.keys(currentSliders).join(',') : '');
                    const jxgFunc = currentBoard.jc.snippet(rawFunc, true, varsStr);
                    
                    const dynamicFunc = function(x) {
                        const args = [x];
                        Object.keys(currentSliders).forEach(sliderId => {
                            args.push(currentSliders[sliderId].Value());
                        });
                        return jxgFunc.apply(null, args);
                    };

                    currentBoard.create('functiongraph', [dynamicFunc], {
                        strokeColor: color,
                        strokeWidth: 2
                    });
                } catch (e) {
                    console.error("Error creating functiongraph:", e);
                }
            });
        }
        
        return currentBoard;
    }

    return {
        render,
        freeCurrentBoard
    };
})();
