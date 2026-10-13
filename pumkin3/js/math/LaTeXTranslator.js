/**
 * PUMKIN.DEV Academic Architecture
 * Module: LaTeX to MathJS Translator
 * Description: Deterministic converter for High School Math LaTeX subset
 */
(function(root) {
    'use strict';

    const LaTeXTranslator = {
        /**
         * Converts a LaTeX string to a valid MathJS expression string.
         * @param {string} latex
         * @returns {{ success: boolean, expression?: string, error?: string }}
         */
        translate(latex) {
            if (!latex || typeof latex !== 'string') {
                return { success: false, error: 'Biểu thức rỗng' };
            }

            let str = latex.trim();

            // 1. Check for unsupported advanced environments
            const unsupportedPatterns = [
                { regex: /\\int/, desc: 'Tích phân (\\int)' },
                { regex: /\\sum/, desc: 'Tổng sigma (\\sum)' },
                { regex: /\\lim/, desc: 'Giới hạn (\\lim)' },
                { regex: /\\begin/, desc: 'Môi trường ma trận/hệ (\\begin)' },
                { regex: /\\vec/, desc: 'Vectơ (\\vec)' },
                { regex: /\\partial/, desc: 'Đạo hàm riêng (\\partial)' }
            ];

            for (const item of unsupportedPatterns) {
                if (item.regex.test(str)) {
                    return { success: false, error: `Cấu trúc chưa được hỗ trợ: ${item.desc}` };
                }
            }

            // 2. Strip standard layout spacing and annotations
            str = str
                .replace(/\\text\s*\{[^}]*\}/g, '')
                .replace(/\\quad/g, ' ')
                .replace(/\\qquad/g, ' ')
                .replace(/\\[,;!]/g, '')
                .replace(/\\left/g, '')
                .replace(/\\right/g, '')
                .trim();

            // 3. Normalize multiplication symbols
            str = str.replace(/\\cdot/g, '*').replace(/\\times/g, '*');

            // 4. Translate \frac{a}{b} recursively to handle nested fractions
            function replaceFractions(s) {
                let fracIdx = s.indexOf('\\frac');
                if (fracIdx === -1) return s;

                let i = fracIdx + 5;
                while (i < s.length && /\s/.test(s[i])) i++;
                if (s[i] !== '{') return null; // malformed

                // Extract numerator
                let depth = 1;
                let startNum = i + 1;
                i++;
                while (i < s.length && depth > 0) {
                    if (s[i] === '{') depth++;
                    else if (s[i] === '}') depth--;
                    i++;
                }
                if (depth !== 0) return null;
                let num = s.substring(startNum, i - 1);

                while (i < s.length && /\s/.test(s[i])) i++;
                if (s[i] !== '{') return null;

                // Extract denominator
                depth = 1;
                let startDen = i + 1;
                i++;
                while (i < s.length && depth > 0) {
                    if (s[i] === '{') depth++;
                    else if (s[i] === '}') depth--;
                    i++;
                }
                if (depth !== 0) return null;
                let den = s.substring(startDen, i - 1);

                const before = s.substring(0, fracIdx);
                const after = s.substring(i);
                const parsedNum = replaceFractions(num);
                const parsedDen = replaceFractions(den);
                if (parsedNum === null || parsedDen === null) return null;

                return replaceFractions(`${before}((${parsedNum})/(${parsedDen}))${after}`);
            }

            const fracResult = replaceFractions(str);
            if (fracResult === null) {
                return { success: false, error: 'Lỗi cú pháp phân thức \\frac' };
            }
            str = fracResult;

            // 5. Translate \sqrt[n]{x} and \sqrt{x} recursively
            function replaceSqrts(s) {
                let sqrtIdx = s.indexOf('\\sqrt');
                if (sqrtIdx === -1) return s;

                let i = sqrtIdx + 5;
                while (i < s.length && /\s/.test(s[i])) i++;

                let degree = null;
                if (s[i] === '[') {
                    let endBracket = s.indexOf(']', i);
                    if (endBracket === -1) return null;
                    degree = s.substring(i + 1, endBracket).trim();
                    i = endBracket + 1;
                    while (i < s.length && /\s/.test(s[i])) i++;
                }

                if (s[i] !== '{') return null;
                let depth = 1;
                let startArg = i + 1;
                i++;
                while (i < s.length && depth > 0) {
                    if (s[i] === '{') depth++;
                    else if (s[i] === '}') depth--;
                    i++;
                }
                if (depth !== 0) return null;
                let arg = s.substring(startArg, i - 1);

                const before = s.substring(0, sqrtIdx);
                const after = s.substring(i);
                const parsedArg = replaceSqrts(arg);
                if (parsedArg === null) return null;

                if (degree) {
                    return replaceSqrts(`${before}((${parsedArg})^(1/(${degree})))${after}`);
                } else {
                    return replaceSqrts(`${before}sqrt(${parsedArg})${after}`);
                }
            }

            const sqrtResult = replaceSqrts(str);
            if (sqrtResult === null) {
                return { success: false, error: 'Lỗi cú pháp căn thức \\sqrt' };
            }
            str = sqrtResult;

            // 6. Translate logs: \log_{a}{b} -> (log(b)/log(a)), \ln{x} -> log(x)
            // Replace \ln{x}, \ln(x) or \ln x
            str = str.replace(/\\ln\s*\{([^}]+)\}/g, 'log($1)');
            str = str.replace(/\\ln\s*\(([^)]+)\)/g, 'log($1)');
            str = str.replace(/\\ln\s+([a-zA-Z0-9]+)/g, 'log($1)');

            // Replace \log_{base}{arg}
            str = str.replace(/\\log_\{([^}]+)\}\s*\{([^}]+)\}/g, '(log($2)/log($1))');
            str = str.replace(/\\log_\{([^}]+)\}\s*\(([^)]+)\)/g, '(log($2)/log($1))');
            str = str.replace(/\\log\s*\{([^}]+)\}/g, 'log10($1)');
            str = str.replace(/\\log\s*\(([^)]+)\)/g, 'log10($1)');

            // 7. Translate trigonometric functions
            str = str.replace(/\\sin\s*\{([^}]+)\}/g, 'sin($1)');
            str = str.replace(/\\cos\s*\{([^}]+)\}/g, 'cos($1)');
            str = str.replace(/\\tan\s*\{([^}]+)\}/g, 'tan($1)');
            str = str.replace(/\\cot\s*\{([^}]+)\}/g, 'cot($1)');

            str = str.replace(/\\sin\s*\(([^)]+)\)/g, 'sin($1)');
            str = str.replace(/\\cos\s*\(([^)]+)\)/g, 'cos($1)');
            str = str.replace(/\\tan\s*\(([^)]+)\)/g, 'tan($1)');
            str = str.replace(/\\cot\s*\(([^)]+)\)/g, 'cot($1)');

            // Shorthands like \sin x -> sin(x)
            str = str.replace(/\\sin\s+([a-zA-Z0-9]+)/g, 'sin($1)');
            str = str.replace(/\\cos\s+([a-zA-Z0-9]+)/g, 'cos($1)');
            str = str.replace(/\\tan\s+([a-zA-Z0-9]+)/g, 'tan($1)');
            str = str.replace(/\\cot\s+([a-zA-Z0-9]+)/g, 'cot($1)');

            // 8. Absolute value: |x| -> abs(x)
            // Use careful replacement to match paired pipes
            let pipeCount = (str.match(/\|/g) || []).length;
            if (pipeCount > 0 && pipeCount % 2 === 0) {
                // Replace pairs
                str = str.replace(/\|([^|]+)\|/g, 'abs($1)');
            } else if (pipeCount > 0) {
                return { success: false, error: 'Dấu giá trị tuyệt đối |...| không đóng cặp hợp lệ' };
            }

            // 9. Constants and cleanups
            str = str.replace(/\\pi/g, 'pi');

            // 10. Clean remaining curly brackets {x} -> (x)
            str = str.replace(/\{([^{}]+)\}/g, '($1)');

            // 11. Check if any unexpected backslashes remain
            const leftoverBackslash = str.match(/\\[a-zA-Z]+/);
            if (leftoverBackslash) {
                return { success: false, error: `Ký hiệu LaTeX chưa hỗ trợ: ${leftoverBackslash[0]}` };
            }

            // 12. Insert explicit multiplication for implicit patterns
            // number followed by variable: 2x -> 2*x
            str = str.replace(/([0-9]+)\s*([a-zA-Z])/g, '$1*$2');
            // variable followed by number in non-subscript: (x)2 -> (x)*2
            str = str.replace(/\)\s*([0-9a-zA-Z])/g, ')*$1');
            // number or variable followed by open paren: 2(x) -> 2*(x), x(x) -> x*(x)
            str = str.replace(/([0-9a-zA-Z])\s*\(/g, (match, p1) => {
                // If p1 is part of function name (sin, cos, tan, cot, log, sqrt, abs), don't insert *
                const funcs = ['sin', 'cos', 'tan', 'cot', 'log', 'log10', 'sqrt', 'abs'];
                for (const fn of funcs) {
                    if (str.includes(fn + '(')) {
                        // handled naturally
                    }
                }
                return match;
            });

            // Better regex for implicit multiplication before parentheses
            // Look for non-word chars or word boundaries
            str = str.replace(/(\d+)\s*\(/g, '$1*(');
            // x(x+1) -> x*(x+1) but NOT sqrt(x)
            str = str.replace(/\b([a-zA-Z])\s*\(/g, (m, v) => {
                return `${v}*(`;
            });
            // Fix any accidentally broken known functions
            const knownFuncs = ['sin', 'cos', 'tan', 'cot', 'log', 'log10', 'sqrt', 'abs'];
            for (const fn of knownFuncs) {
                str = str.replace(new RegExp(`\\b${fn}\\*\\(`, 'g'), `${fn}(`);
            }

            // Paren followed by paren: (x+1)(x-1) -> (x+1)*(x-1)
            str = str.replace(/\)\s*\(/g, ')*(');

            return { success: true, expression: str.trim() };
        }
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = LaTeXTranslator;
    } else {
        root.LaTeXTranslator = LaTeXTranslator;
    }
})(typeof self !== 'undefined' ? self : (typeof window !== 'undefined' ? window : this));
