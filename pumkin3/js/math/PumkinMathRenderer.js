/**
 * PUMKIN MATH RENDERER (KaTeX Engine)
 * High-performance, zero-latency mathematical typesetting system for PUMKIN.DEV.
 * Fully replaces legacy engines with synchronous KaTeX rendering, RAF batching,
 * streaming-safe parsing for AI Tutor chat, and multi-tier caching.
 *
 * Namespace: window.Pumkin.Math
 * Backward compatibility: window.PumkinMath
 */

(function(root) {
    'use strict';

    // Ensure namespace existence
    root.Pumkin = root.Pumkin || {};

    const _renderCache = new Map();
    const MAX_CACHE_SIZE = 2000;

    // RAF batch queue for DOM rendering
    const _batchQueue = new Set();
    let _rafScheduled = false;

    /**
     * Escape special HTML characters to prevent XSS
     */
    function escapeHtml(str) {
        if (typeof str !== 'string') return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    /**
     * Normalizes LaTeX delimiters to \(...\) for inline and \[...\] for display.
     * Prevents false-matching currency symbols like "50$" or "$50".
     */
    function normalizeDelimiters(text) {
        if (typeof text !== 'string' || !text) return '';

        // 1. Normalize block display delimiters: $$...$$ to \[...\]
        let normalized = text.replace(/\$\$([\s\S]+?)\$\$/g, function(match, math) {
            return '\n\\[' + math.trim() + '\\]\n';
        });

        // 2. Normalize inline delimiters: $...$ to \(...\)
        // Must avoid currency:
        // - Do NOT match if preceded by a word character or digit (e.g. 50$)
        // - Do NOT match if content is purely numeric/currency without math operators/symbols
        normalized = normalized.replace(/(^|[^\\$\w])\$([^\$\n]+?)\$(?!\w)/g, function(match, prefix, math) {
            const trimmed = math.trim();
            // If it's a plain number or currency like '50' or '100.00', keep literal
            if (/^\d+([.,]\d+)?(\s*(USD|VND|đ|triệu|k))?$/i.test(trimmed)) {
                return match;
            }
            return prefix + '\\(' + trimmed + '\\)';
        });

        return normalized;
    }

    /**
     * Checks if KaTeX library is loaded in runtime
     */
    function isKatexAvailable() {
        return typeof root.katex !== 'undefined' && typeof root.katex.renderToString === 'function';
    }

    /**
     * Renders a raw LaTeX string into HTML string.
     * @param {string} tex - Raw LaTeX expression
     * @param {Object} options - { displayMode: boolean, context: string }
     * @returns {string} HTML string
     */
    function renderString(tex, options) {
        options = options || {};
        if (typeof tex !== 'string' || !tex.trim()) return '';

        let cleanTex = tex.trim();
        let displayMode = Boolean(options.displayMode);

        // Strip surrounding delimiters if present
        if (cleanTex.startsWith('\\[') && cleanTex.endsWith('\\]')) {
            cleanTex = cleanTex.slice(2, -2).trim();
            displayMode = true;
        } else if (cleanTex.startsWith('$$') && cleanTex.endsWith('$$')) {
            cleanTex = cleanTex.slice(2, -2).trim();
            displayMode = true;
        } else if (cleanTex.startsWith('\\(') && cleanTex.endsWith('\\)')) {
            cleanTex = cleanTex.slice(2, -2).trim();
        } else if (cleanTex.startsWith('$') && cleanTex.endsWith('$') && cleanTex.length > 2) {
            cleanTex = cleanTex.slice(1, -1).trim();
        }

        const cacheKey = (displayMode ? 'D:' : 'I:') + cleanTex;
        if (_renderCache.has(cacheKey)) {
            return _renderCache.get(cacheKey);
        }

        if (!isKatexAvailable()) {
            return '<span class="pumkin-math-raw">' + escapeHtml(tex) + '</span>';
        }

        try {
            const html = root.katex.renderToString(cleanTex, {
                displayMode: displayMode,
                throwOnError: false,
                errorColor: '#ef4444',
                strict: false,
                trust: false
            });

            if (_renderCache.size >= MAX_CACHE_SIZE) {
                // Evict oldest entries
                const firstKey = _renderCache.keys().next().value;
                _renderCache.delete(firstKey);
            }
            _renderCache.set(cacheKey, html);
            return html;
        } catch (err) {
            console.warn('[PumkinMath] renderString warning:', err.message, { tex: cleanTex, context: options.context });
            const fallback = '<code class="pumkin-math-error" style="color:#ef4444;background:rgba(239,68,68,0.1);padding:2px 4px;border-radius:4px;font-size:0.9em;">' +
                escapeHtml(cleanTex) + '</code>';
            return fallback;
        }
    }

    /**
     * Executes auto-rendering on a single DOM node synchronously
     */
    function _renderNodeInternal(node) {
        if (!node || node.nodeType !== 1) return;

        if (typeof root.renderMathInElement === 'function') {
            root.renderMathInElement(node, {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '\\[', right: '\\]', display: true },
                    { left: '\\(', right: '\\)', display: false },
                    { left: '$', right: '$', display: false }
                ],
                ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'svg'],
                throwOnError: false,
                errorColor: '#ef4444',
                strict: false,
                trust: false
            });
        } else if (isKatexAvailable()) {
            // Fallback manual tree-walker if auto-render contrib script is not present
            const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
            const textNodes = [];
            while (walker.nextNode()) {
                const tn = walker.currentNode;
                if (tn.parentNode && ['SCRIPT', 'NOSCRIPT', 'STYLE', 'TEXTAREA', 'PRE', 'CODE'].includes(tn.parentNode.tagName)) {
                    continue;
                }
                if (tn.nodeValue && (/\\\(|\\\[|\$|\$\$/.test(tn.nodeValue))) {
                    textNodes.push(tn);
                }
            }

            textNodes.forEach(function(tn) {
                const parent = tn.parentNode;
                if (!parent) return;
                const normalized = normalizeDelimiters(tn.nodeValue);
                // Parse tokens
                const parts = [];
                let lastIdx = 0;
                const regex = /(\\\[[\s\S]*?\\\]|\\\(.*?\\\))/g;
                let match;
                while ((match = regex.exec(normalized)) !== null) {
                    if (match.index > lastIdx) {
                        parts.push(document.createTextNode(normalized.slice(lastIdx, match.index)));
                    }
                    const mathSpan = document.createElement('span');
                    mathSpan.innerHTML = renderString(match[0]);
                    parts.push(mathSpan);
                    lastIdx = regex.lastIndex;
                }
                if (lastIdx < normalized.length) {
                    parts.push(document.createTextNode(normalized.slice(lastIdx)));
                }

                if (parts.length > 0) {
                    const frag = document.createDocumentFragment();
                    parts.forEach(function(p) { frag.appendChild(p); });
                    parent.replaceChild(frag, tn);
                }
            });
        }
    }

    /**
     * Flushes RAF batch queue
     */
    function _processBatchQueue() {
        _rafScheduled = false;
        const targets = Array.from(_batchQueue);
        _batchQueue.clear();

        targets.forEach(function(el) {
            try {
                _renderNodeInternal(el);
            } catch (err) {
                console.warn('[PumkinMath] renderElement batch error:', err);
            }
        });
    }

    /**
     * Renders mathematical expressions within a DOM element or array of elements.
     * Uses requestAnimationFrame batching to avoid layout thrashing.
     * @param {Element|Element[]|string} target - DOM Element, array of Elements, or selector
     * @param {Object} options - { immediate: boolean }
     */
    function renderElement(target, options) {
        options = options || {};
        let nodes = [];

        if (typeof target === 'string') {
            nodes = Array.from(document.querySelectorAll(target));
        } else if (Array.isArray(target)) {
            nodes = target.filter(Boolean);
        } else if (target && target.nodeType === 1) {
            nodes = [target];
        } else if (!target) {
            const activeView = document.querySelector('.app-view.active') || document.body;
            if (activeView) nodes = [activeView];
        }

        if (nodes.length === 0) return;

        if (options.immediate) {
            nodes.forEach(function(node) {
                _renderNodeInternal(node);
            });
            return;
        }

        // Batch render with requestAnimationFrame
        nodes.forEach(function(node) {
            _batchQueue.add(node);
        });

        if (!_rafScheduled) {
            _rafScheduled = true;
            if (typeof root.requestAnimationFrame === 'function') {
                root.requestAnimationFrame(_processBatchQueue);
            } else {
                setTimeout(_processBatchQueue, 0);
            }
        }
    }

    /**
     * Streaming-safe renderer for real-time AI Tutor responses.
     * Extracts only fully completed delimiter pairs.
     * Unclosed tail tokens remain plain text without throwing errors or flickering.
     *
     * @param {HTMLElement} el - Container element to update
     * @param {string} partialText - Incomplete streaming markdown/text
     */
    function renderStreaming(el, partialText) {
        if (!el || typeof partialText !== 'string') return;

        // Pattern matching closed delimiters
        // Block: \[ ... \] or $$ ... $$
        // Inline: \( ... \) or $ ... $
        let htmlResult = '';
        let lastIndex = 0;

        // Check if there are any delimiter openers
        const regex = /(\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)|\$(?:[^\$\n]+?)\$)/g;
        let match;

        while ((match = regex.exec(partialText)) !== null) {
            // Append plain text before match
            if (match.index > lastIndex) {
                htmlResult += escapeHtml(partialText.slice(lastIndex, match.index)).replace(/\n/g, '<br>');
            }

            const token = match[0];
            const renderedMath = renderString(token, { context: 'streaming' });
            htmlResult += renderedMath;
            lastIndex = regex.lastIndex;
        }

        // Append remaining text (which might contain unclosed '$' or '\(') as safe raw text
        if (lastIndex < partialText.length) {
            const remaining = partialText.slice(lastIndex);
            htmlResult += escapeHtml(remaining).replace(/\n/g, '<br>');
        }

        el.innerHTML = htmlResult;
    }

    /**
     * Clear render cache
     */
    function clearCache() {
        _renderCache.clear();
    }

    // Public API Interface
    const PumkinMathAPI = {
        renderElement: renderElement,
        renderString: renderString,
        renderStreaming: renderStreaming,
        normalizeDelimiters: normalizeDelimiters,
        clearCache: clearCache,
        // Backward-compatibility aliases
        typeset: function(target) {
            return renderElement(target, { immediate: false });
        },
        typesetImmediate: function(target) {
            return renderElement(target, { immediate: true });
        },
        isReady: function() {
            return isKatexAvailable();
        }
    };

    // Mount on window.Pumkin.Math and backward-compatible window.PumkinMath
    root.Pumkin.Math = PumkinMathAPI;
    root.PumkinMath = PumkinMathAPI;

    // Node.js module export support for automated unit testing
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = PumkinMathAPI;
    }

})(typeof window !== 'undefined' ? window : global);
