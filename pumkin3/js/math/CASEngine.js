/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.CASEngine
 * Layer: Core Computer Algebra System
 * Description: Deterministic CAS verification engine with symbolic & numeric validation
 */
(function(root) {
    'use strict';

    // Get mathjs and LaTeXTranslator from environment
    const getMath = () => {
        if (typeof root.math !== 'undefined') return root.math;
        if (typeof math !== 'undefined') return math;
        if (typeof require !== 'undefined') {
            try { return require('../../vendor/mathjs/math.min.js'); } catch(e) {}
            try { return require('../vendor/mathjs/math.min.js'); } catch(e) {}
            try { return require('mathjs'); } catch(e) {}
        }
        return null;
    };

    const getTranslator = () => {
        if (typeof root.LaTeXTranslator !== 'undefined') return root.LaTeXTranslator;
        if (typeof LaTeXTranslator !== 'undefined') return LaTeXTranslator;
        if (typeof require !== 'undefined') {
            try { return require('./LaTeXTranslator.js'); } catch(e) {}
        }
        return null;
    };

    const EPSILON = 1e-7;

    /**
     * Deterministic Pseudo-Random Generator (Linear Congruential Generator)
     */
    function createLCG(seed = 123456789) {
        let s = seed;
        return function() {
            s = (s * 1664525 + 1013904223) % 4294967296;
            return s / 4294967296;
        };
    }

    /**
     * Standardized return helpers
     */
    function success(method, expr, expected, actual, confidence = 1.0, details = {}) {
        return {
            valid: true,
            expression: expr,
            expected,
            actual,
            method,
            confidence,
            details,
            error: null
        };
    }

    function failure(method, expr, errorType, explanation, suggestion, location = "general", expected = null, actual = null, confidence = 1.0) {
        return {
            valid: false,
            expression: expr,
            expected,
            actual,
            method,
            confidence,
            error: {
                error_type: errorType,
                location: location,
                explanation: explanation,
                suggested_next_step: suggestion
            }
        };
    }

    /**
     * Translate input if it contains LaTeX syntax
     */
    function normalizeInput(input) {
        if (!input || typeof input !== 'string') return { success: false, error: 'Biểu thức rỗng' };
        let str = input.trim();
        // If it looks like LaTeX or absolute value (contains backslashes, curly braces, pipes)
        if (str.includes('\\') || str.includes('{') || str.includes('|')) {
            const T = getTranslator();
            if (T) {
                const res = T.translate(str);
                if (!res.success) {
                    return { success: false, error: res.error, isLatex: true };
                }
                return { success: true, expression: res.expression, original: str, isLatex: true };
            }
        }
        return { success: true, expression: str, original: str, isLatex: false };
    }

    const CASEngine = {
        /**
         * Verifies if two algebraic expressions are equivalent.
         */
        verifyEquivalence(rawExpr1, rawExpr2, options = {}) {
            const math = getMath();
            if (!math) {
                return failure("equivalence", `${rawExpr1} == ${rawExpr2}`, "unverified", "MathJS CAS engine chưa được nạp.", "Kiểm tra lại kết nối thư viện MathJS.");
            }

            // 1. Translate LaTeX if present
            const trans1 = normalizeInput(rawExpr1);
            if (!trans1.success) {
                return failure("equivalence", `${rawExpr1} == ${rawExpr2}`, "unverified", `Không thể dịch biểu thức 1: ${trans1.error}`, "Kiểm tra lại cú pháp LaTeX.");
            }
            const trans2 = normalizeInput(rawExpr2);
            if (!trans2.success) {
                return failure("equivalence", `${rawExpr1} == ${rawExpr2}`, "unverified", `Không thể dịch biểu thức 2: ${trans2.error}`, "Kiểm tra lại cú pháp LaTeX.");
            }

            const expr1 = trans1.expression;
            const expr2 = trans2.expression;

            // 2. Parse into MathJS AST
            let node1, node2;
            try {
                node1 = math.parse(expr1);
            } catch(e) {
                return failure("equivalence", `${rawExpr1} == ${rawExpr2}`, "parse_error", `Lỗi cú pháp biểu thức 1: ${e.message}`, "Viết lại biểu thức chuẩn xác hơn.");
            }
            try {
                node2 = math.parse(expr2);
            } catch(e) {
                return failure("equivalence", `${rawExpr1} == ${rawExpr2}`, "parse_error", `Lỗi cú pháp biểu thức 2: ${e.message}`, "Viết lại biểu thức chuẩn xác hơn.");
            }

            // Extract variables
            const vars1 = new Set();
            node1.traverse(n => { if (n.isSymbolNode && !['pi', 'e', 'i'].includes(n.name) && typeof math[n.name] === 'undefined') vars1.add(n.name); });
            const vars2 = new Set();
            node2.traverse(n => { if (n.isSymbolNode && !['pi', 'e', 'i'].includes(n.name) && typeof math[n.name] === 'undefined') vars2.add(n.name); });

            const allVars = Array.from(new Set([...vars1, ...vars2]));

            // 3. Domain Check at Special Boundary Points
            // Detect critical points: roots of denominators, values making radicands zero, logs <= 0
            const domainMismatch = this._checkDomainMismatch(node1, node2, allVars);
            if (domainMismatch) {
                return failure("equivalence", `${rawExpr1} == ${rawExpr2}`, "domain_mismatch",
                    domainMismatch.explanation, domainMismatch.suggestion, "domain_check", "identical_domain", "mismatched_domain");
            }

            // 4. Symbolic Simplification of Difference (E1 - E2)
            try {
                const diffNode = math.parse(`(${expr1}) - (${expr2})`);
                const simplified = math.simplify(diffNode);
                const simpStr = simplified.toString();

                if (simpStr === '0' || (simplified.isConstantNode && Math.abs(simplified.value) < EPSILON)) {
                    return success("cas_symbolic", `${rawExpr1} == ${rawExpr2}`, "equivalent", "equivalent", 1.0, {
                        strategy: "symbolic",
                        simplifiedDifference: simpStr
                    });
                }
            } catch (err) {
                // If symbolic simplify throws, fall through to rigorous numeric sampling
            }

            // 5. Numerical Multi-point Sampling (At least 20 pseudo-random points with fixed seed LCG)
            const sampleCount = options.sampleCount || 24;
            const rand = createLCG(options.seed || 987654321);
            let validPoints = 0;
            let matchedPoints = 0;

            for (let i = 0; i < sampleCount; i++) {
                const scope = {};
                // Sample both positive and negative reals to test full real line and catch discrepancies like |x| != x
                const isNeg = (i >= Math.floor(sampleCount / 2));
                const sign = isNeg ? -1 : 1;
                allVars.forEach(v => {
                    scope[v] = sign * (rand() * 14 + 0.73); // Non-integer values avoiding 0
                });

                let val1 = null, val2 = null;
                let err1 = null, err2 = null;

                try {
                    val1 = node1.evaluate(scope);
                    if (typeof val1 !== 'number' || !isFinite(val1) || isNaN(val1)) err1 = 'invalid_number';
                } catch(e) { err1 = e; }

                try {
                    val2 = node2.evaluate(scope);
                    if (typeof val2 !== 'number' || !isFinite(val2) || isNaN(val2)) err2 = 'invalid_number';
                } catch(e) { err2 = e; }

                // Check for domain discrepancy at sample points
                if (err1 && !err2) {
                    return failure("equivalence", `${rawExpr1} == ${rawExpr2}`, "domain_mismatch",
                        "Tập xác định của biểu thức 1 bị thu hẹp so với biểu thức 2.", "Cần giữ nguyên điều kiện xác định.");
                }
                if (!err1 && err2) {
                    return failure("equivalence", `${rawExpr1} == ${rawExpr2}`, "domain_mismatch",
                        "Tập xác định của biểu thức 2 bị thu hẹp so với biểu thức 1.", "Cần giữ nguyên điều kiện xác định.");
                }

                if (!err1 && !err2) {
                    validPoints++;
                    if (Math.abs(val1 - val2) < 1e-6) {
                        matchedPoints++;
                    }
                }
            }

            if (validPoints < 5) {
                return failure("equivalence", `${rawExpr1} == ${rawExpr2}`, "unverified",
                    "Không thể lấy đủ điểm kiểm tra số hợp lệ trong tập xác định.", "Kiểm tra lại điều kiện biến của biểu thức.");
            }

            if (matchedPoints === validPoints) {
                return success("cas_numeric", `${rawExpr1} == ${rawExpr2}`, "equivalent", "equivalent", 0.95, {
                    strategy: "numeric",
                    validPointsEvaluated: validPoints,
                    sampleCount
                });
            } else {
                return failure("equivalence", `${rawExpr1} == ${rawExpr2}`, "algebraic_error",
                    "Hai biểu thức không tương đương (sai khác giá trị tại các điểm thử ngẫu nhiên).",
                    "Em hãy kiểm tra lại phép biến đổi đại số hoặc dấu của các hạng tử.");
            }
        },

        /**
         * Checks domain conditions between two AST nodes
         */
        _checkDomainMismatch(node1, node2, variables) {
            // Find denominators in node1 and node2
            const dens1 = [];
            node1.traverse(n => {
                if (n.isOperatorNode && n.op === '/') dens1.push(n.args[1]);
            });
            const dens2 = [];
            node2.traverse(n => {
                if (n.isOperatorNode && n.op === '/') dens2.push(n.args[1]);
            });

            // If node1 has denominators and node2 does not, test if denominator can be zero
            const testValues = [0, 1, -1, 2, -2, 3, -3, 0.5, -0.5];

            if (dens1.length > 0 && dens2.length === 0 && variables.length > 0) {
                for (const den of dens1) {
                    for (const tv of testValues) {
                        try {
                            const scope = {};
                            variables.forEach(v => { scope[v] = tv; });
                            const denVal = den.evaluate(scope);
                            if (Math.abs(denVal) < EPSILON) {
                                const val2 = node2.evaluate(scope);
                                if (typeof val2 === 'number' && isFinite(val2)) {
                                    return {
                                        explanation: `Tập xác định bị thay đổi: biểu thức đầu không xác định tại ${variables[0]} = ${tv} (mẫu số bằng 0), nhưng biểu thức sau lại xác định.`,
                                        suggestion: `Cần ghi rõ điều kiện ${variables[0]} ≠ ${tv} trước khi rút gọn.`
                                    };
                                }
                            }
                        } catch(e) {}
                    }
                }
            }

            // If node2 has denominators and node1 does not (e.g. x vs x*(x-2)/(x-2))
            if (dens2.length > 0 && dens1.length === 0 && variables.length > 0) {
                for (const den of dens2) {
                    for (const tv of testValues) {
                        try {
                            const scope = {};
                            variables.forEach(v => { scope[v] = tv; });
                            const denVal = den.evaluate(scope);
                            if (Math.abs(denVal) < EPSILON) {
                                const val1 = node1.evaluate(scope);
                                if (typeof val1 === 'number' && isFinite(val1)) {
                                    return {
                                        explanation: `Tập xác định bị thay đổi (thu hẹp): biểu thức sau không xác định tại ${variables[0]} = ${tv} (mẫu số bằng 0), trong khi biểu thức trước xác định.`,
                                        suggestion: `Phép nhân thêm nhân tử làm phát sinh điểm gián đoạn sai ${variables[0]} ≠ ${tv}.`
                                    };
                                }
                            }
                        } catch(e) {}
                    }
                }
            }

            return null;
        },

        /**
         * Verifies if a given value is a root of an equation
         */
        checkRoot(rawEquation, rawRoot, options = {}) {
            const math = getMath();
            if (!math) {
                return failure("check_root", `${rawEquation} [x=${rawRoot}]`, "unverified", "MathJS CAS chưa sẵn sàng.", "Thử lại sau.");
            }

            const transEq = normalizeInput(rawEquation);
            if (!transEq.success) {
                return failure("check_root", rawEquation, "unverified", `Không dịch được phương trình: ${transEq.error}`, "Kiểm tra cú pháp LaTeX.");
            }

            const eqStr = transEq.expression;
            const parts = eqStr.split('=');
            if (parts.length !== 2) {
                return failure("check_root", eqStr, "parse_error", "Phương trình phải có đúng một dấu '='", "Nhập phương trình dạng L = R.");
            }

            const rootVal = typeof rawRoot === 'number' ? rawRoot : parseFloat(rawRoot);
            if (isNaN(rootVal)) {
                return failure("check_root", `${eqStr} [x=${rawRoot}]`, "parse_error", "Giá trị nghiệm không hợp lệ.", "Nhập nghiệm dạng số.");
            }

            const scope = { x: rootVal };

            try {
                const nodeL = math.parse(parts[0].trim());
                const nodeR = math.parse(parts[1].trim());

                // Evaluate L and R
                const valL = nodeL.evaluate(scope);
                const valR = nodeR.evaluate(scope);

                if (!isFinite(valL) || !isFinite(valR) || isNaN(valL) || isNaN(valR)) {
                    return failure("check_root", `${eqStr} [x=${rootVal}]`, "domain_violation",
                        `Giá trị x = ${rootVal} làm phương trình không xác định.`, "Nghiệm phải thuộc tập xác định của phương trình.");
                }

                if (Math.abs(valL - valR) < EPSILON) {
                    return success("check_root", `${eqStr} [x=${rootVal}]`, 0, valL - valR, 1.0, {
                        leftValue: valL,
                        rightValue: valR
                    });
                } else {
                    return failure("check_root", `${eqStr} [x=${rootVal}]`, "calculation_error",
                        `Thay x = ${rootVal} vào hai vế: Vế trái = ${valL}, Vế phải = ${valR} (không bằng nhau).`,
                        "Kiểm tra lại nghiệm hoặc các bước biến đổi phương trình.");
                }
            } catch (err) {
                return failure("check_root", `${eqStr} [x=${rootVal}]`, "domain_violation",
                    `Nghiệm x = ${rootVal} vi phạm điều kiện xác định: ${err.message}`, "Kiểm tra lại điều kiện tập xác định.");
            }
        },

        /**
         * Verifies step transition between two equations:
         * Checks for equivalence, spurious roots (nghiệm ngoại lai), and root loss (mất nghiệm).
         */
        verifyEquationStep(rawPrev, rawNext, options = {}) {
            const math = getMath();
            if (!math) {
                return failure("equation_step", `${rawPrev} => ${rawNext}`, "unverified", "MathJS CAS engine chưa được nạp.", "Kiểm tra lại kết nối thư viện MathJS.");
            }

            // If neither has '=' sign, treat as expression equivalence
            if (!rawPrev.includes('=') && !rawNext.includes('=')) {
                return this.verifyEquivalence(rawPrev, rawNext, options);
            }

            // Both must be equations
            const transPrev = normalizeInput(rawPrev);
            const transNext = normalizeInput(rawNext);
            if (!transPrev.success || !transNext.success) {
                return failure("equation_step", `${rawPrev} => ${rawNext}`, "unverified",
                    `Không thể dịch bước giải: ${transPrev.error || transNext.error}`, "Kiểm tra lại cú pháp LaTeX.");
            }

            const pStr = transPrev.expression;
            const nStr = transNext.expression;

            const pParts = pStr.split('=');
            const nParts = nStr.split('=');
            if (pParts.length !== 2 || nParts.length !== 2) {
                return failure("equation_step", `${rawPrev} => ${rawNext}`, "parse_error",
                    "Mỗi bước phương trình phải có đúng một dấu '='", "Viết lại phương trình dạng A = B.");
            }

            // Form difference functions: F1(x) = L1 - R1, F2(x) = L2 - R2
            const f1Str = `(${pParts[0].trim()}) - (${pParts[1].trim()})`;
            const f2Str = `(${nParts[0].trim()}) - (${nParts[1].trim()})`;

            // 1. Direct algebraic equivalence of equations (e.g. 2x - 4 = 0 <=> x - 2 = 0)
            const eqCheck = this.verifyEquivalence(f1Str, f2Str, options);
            if (eqCheck.valid) {
                return success("cas_symbolic", `${rawPrev} => ${rawNext}`, "equivalent_step", "equivalent_step", 1.0, {
                    strategy: "algebraic_equivalence"
                });
            }

            // 2. Check for scalar multiple: F1 = k * F2 with k != 0
            try {
                const nodeF1 = math.parse(f1Str);
                const nodeF2 = math.parse(f2Str);
                // Sample point to determine k
                const testVal = 4.19;
                const v1 = nodeF1.evaluate({ x: testVal });
                const v2 = nodeF2.evaluate({ x: testVal });
                if (typeof v1 === 'number' && typeof v2 === 'number' && Math.abs(v2) > EPSILON) {
                    const k = v1 / v2;
                    if (Math.abs(k) > EPSILON && isFinite(k)) {
                        const scaledCheck = this.verifyEquivalence(f1Str, `(${k}) * (${f2Str})`, options);
                        if (scaledCheck.valid) {
                            return success("cas_symbolic", `${rawPrev} => ${rawNext}`, "equivalent_step", "equivalent_step", 1.0, {
                                strategy: "proportional_equations",
                                ratio: k
                            });
                        }
                    }
                }
            } catch(e) {}

            // 3. Root Analysis: Detect Spurious Roots (Nghiệm ngoại lai) & Root Loss (Mất nghiệm)
            // Extract explicit roots if next step is x = a or x = a; x = b
            const candidateRootsNext = this._extractRootsFromEquation(nParts[0].trim(), nParts[1].trim());
            const candidateRootsPrev = this._extractRootsFromEquation(pParts[0].trim(), pParts[1].trim());

            // Check if any root of Next Step fails Prev Step (Spurious Root)
            if (candidateRootsNext && candidateRootsNext.length > 0) {
                for (const r of candidateRootsNext) {
                    const check = this.checkRoot(transPrev.expression, r);
                    if (!check.valid) {
                        return failure("equation_step", `${rawPrev} => ${rawNext}`, "spurious_root",
                            `Phép biến đổi phát sinh nghiệm ngoại lai: x = ${r} thỏa mãn bước sau nhưng không thỏa mãn bước trước (${check.error.explanation}).`,
                            "Hãy đặt điều kiện trước khi biến đổi (ví dụ bình phương hai vế) hoặc thử lại nghiệm vào phương trình ban đầu.",
                            "step_transition", "valid_step", "spurious_root");
                    }
                }
            }

            // Check if any root of Prev Step is lost in Next Step (Root Loss)
            if (candidateRootsPrev && candidateRootsPrev.length > 0) {
                for (const r of candidateRootsPrev) {
                    const check = this.checkRoot(transNext.expression, r);
                    if (!check.valid) {
                        return failure("equation_step", `${rawPrev} => ${rawNext}`, "root_loss",
                            `Phép biến đổi làm mất nghiệm: x = ${r} là nghiệm của bước trước nhưng không còn thỏa mãn bước sau.`,
                            "Không được chia hai vế cho biểu thức chứa ẩn có thể bằng 0. Hãy chuyển vế và đặt nhân tử chung.",
                            "step_transition", "valid_step", "root_loss");
                    }
                }
            }

            // If candidates exist and all roots in Next satisfy Prev, and vice versa:
            if (candidateRootsNext && candidateRootsNext.length > 0 && candidateRootsPrev && candidateRootsPrev.length > 0) {
                return success("cas_root_matching", `${rawPrev} => ${rawNext}`, "equivalent_step", "equivalent_step", 1.0);
            }

            // 4. Safe fallback for unsupported advanced equations
            return failure("equation_step", `${rawPrev} => ${rawNext}`, "unverified",
                "Phép biến đổi phương trình không tương đương hoặc nằm ngoài khả năng tự động giải quyết của CAS.",
                "Hãy kiểm tra lại điều kiện biến đổi và các bước giải trung gian.");
        },

        /**
         * Helper to extract candidate roots from simple linear/factored/quadratic forms
         */
        _extractRootsFromEquation(left, right) {
            const math = getMath();
            if (!math) return null;

            // Form: x = c or c = x
            if (left === 'x' && !isNaN(parseFloat(right))) return [parseFloat(right)];
            if (right === 'x' && !isNaN(parseFloat(left))) return [parseFloat(left)];

            // Form: x^2 = c
            if ((left === 'x^2' || left === 'x ^ 2') && !isNaN(parseFloat(right))) {
                const c = parseFloat(right);
                if (c < 0) return [];
                if (c === 0) return [0];
                return [Math.sqrt(c), -Math.sqrt(c)];
            }

            // Form: x - c = 0 or x + c = 0
            if (right === '0') {
                const mMinus = left.match(/^x\s*-\s*([0-9.]+)$/);
                if (mMinus) return [parseFloat(mMinus[1])];
                const mPlus = left.match(/^x\s*\+\s*([0-9.]+)$/);
                if (mPlus) return [-parseFloat(mPlus[1])];

                // Form: x * (x - c) = 0
                const mProd = left.match(/^x\s*\*\s*\(\s*x\s*-\s*([0-9.]+)\s*\)$/);
                if (mProd) return [0, parseFloat(mProd[1])];
            }

            return null;
        },

        /**
         * Verifies if candidate is the correct derivative of an expression
         */
        verifyDerivative(rawExpr, rawDerivative, variable = 'x') {
            const math = getMath();
            if (!math) {
                return failure("derivative", `${rawExpr}' == ${rawDerivative}`, "unverified", "MathJS CAS chưa sẵn sàng.", "Thử lại sau.");
            }

            const transExpr = normalizeInput(rawExpr);
            const transDeriv = normalizeInput(rawDerivative);
            if (!transExpr.success || !transDeriv.success) {
                return failure("derivative", `${rawExpr}' == ${rawDerivative}`, "unverified",
                    `Lỗi dịch biểu thức: ${transExpr.error || transDeriv.error}`, "Kiểm tra cú pháp LaTeX.");
            }

            try {
                const computed = math.derivative(transExpr.expression, variable).toString();
                return this.verifyEquivalence(computed, transDeriv.expression);
            } catch(e) {
                return failure("derivative", `${rawExpr}' == ${rawDerivative}`, "unverified",
                    `Không thể tính đạo hàm ký hiệu: ${e.message}`, "Kiểm tra lại biểu thức đầu vào.");
            }
        },

        /**
         * Simplify expression using MathJS CAS
         */
        simplify(rawExpr) {
            const math = getMath();
            if (!math) return { success: false, error: "MathJS CAS chưa sẵn sàng." };
            const trans = normalizeInput(rawExpr);
            if (!trans.success) return { success: false, error: trans.error };

            try {
                const simplified = math.simplify(trans.expression);
                return { success: true, result: simplified.toString() };
            } catch(e) {
                return { success: false, error: e.message };
            }
        },

        // =========================================================================
        // SECTION: Geometry, Vectors, and Analytic Space Geometry (Oxyz)
        // =========================================================================

        /**
         * Verifies Triangle Inequality: a, b, c > 0 and |b - c| < a < b + c
         */
        verifyTriangleInequality(a, b, c) {
            if (a <= 0 || b <= 0 || c <= 0) {
                return failure("triangle_inequality", `a=${a}, b=${b}, c=${c}`, "invalid_triangle",
                    "Độ dài các cạnh tam giác phải là số thực dương.", "Kiểm tra lại độ dài các cạnh.");
            }
            const valid = (a + b > c) && (a + c > b) && (b + c > a);
            if (!valid) {
                return failure("triangle_inequality", `a=${a}, b=${b}, c=${c}`, "invalid_triangle",
                    "Ba cạnh không thỏa mãn bất đẳng thức tam giác.", "Tổng hai cạnh bất kỳ phải lớn hơn cạnh còn lại.");
            }
            const p = (a + b + c) / 2;
            return success("triangle_inequality", `a=${a}, b=${b}, c=${c}`, "valid_triangle", "valid_triangle", 1.0, {
                perimeter: a + b + c,
                heronArea: Math.sqrt(p * (p - a) * (p - b) * (p - c))
            });
        },

        /**
         * Verifies if two vectors are collinear (2D or 3D).
         * Cross condition: u = k * v, avoiding zero division.
         */
        verifyVectorCollinear(u, v) {
            if (!Array.isArray(u) || !Array.isArray(v) || u.length !== v.length) {
                return failure("vector_collinear", "u, v", "invalid_vector", "Vector phải là mảng cùng số chiều (2D hoặc 3D).", "Kiểm tra lại số chiều vector.");
            }
            const isZeroU = u.every(x => Math.abs(x) < EPSILON);
            const isZeroV = v.every(x => Math.abs(x) < EPSILON);
            if (isZeroU || isZeroV) {
                // Vector 0 cùng phương với mọi vector theo quy ước toán học
                return success("vector_collinear", "u, v", "collinear", "collinear", 1.0, { isZeroVector: true, ratio: 0 });
            }

            // Find non-zero pivot in v
            let ratio = null;
            let collinear = true;
            for (let i = 0; i < u.length; i++) {
                if (Math.abs(v[i]) < EPSILON) {
                    if (Math.abs(u[i]) >= EPSILON) {
                        collinear = false;
                        break;
                    }
                } else {
                    const r = u[i] / v[i];
                    if (ratio === null) {
                        ratio = r;
                    } else if (Math.abs(ratio - r) > 1e-6) {
                        collinear = false;
                        break;
                    }
                }
            }

            if (!collinear) {
                return failure("vector_collinear", "u, v", "not_collinear", "Hai vector không cùng phương (tỉ số các tọa độ không bằng nhau).", "Kiểm tra lại điều kiện u = k * v.");
            }
            return success("vector_collinear", "u, v", "collinear", "collinear", 1.0, { ratio });
        },

        /**
         * Verifies dot product of two vectors: u . v = sum(u_i * v_i)
         */
        verifyVectorDotProduct(u, v, expectedDot = null) {
            if (!Array.isArray(u) || !Array.isArray(v) || u.length !== v.length) {
                return failure("dot_product", "u . v", "invalid_vector", "Vector phải là mảng cùng số chiều.", "Kiểm tra lại tọa độ vector.");
            }
            const dot = u.reduce((sum, val, idx) => sum + val * v[idx], 0);
            if (expectedDot !== null) {
                const diff = Math.abs(dot - expectedDot);
                if (diff > 1e-6) {
                    return failure("dot_product", `u . v = ${dot}`, "calculation_error",
                        `Tích vô hướng tính được là ${dot}, khác với kết quả mong đợi ${expectedDot}.`, "Kiểm tra lại phép cộng tích các tọa độ.");
                }
            }
            return success("dot_product", `u . v = ${dot}`, "verified", "verified", 1.0, {
                dotProduct: dot,
                isPerpendicular: Math.abs(dot) < EPSILON
            });
        },

        /**
         * Verifies cross product of two 3D vectors: [u, v]
         */
        verifyVectorCrossProduct(u, v, expectedCross = null) {
            if (!Array.isArray(u) || !Array.isArray(v) || u.length !== 3 || v.length !== 3) {
                return failure("cross_product", "[u, v]", "invalid_vector", "Tích có hướng chỉ áp dụng cho vector trong không gian 3D (Oxyz).", "Nhập tọa độ dạng [x, y, z].");
            }
            // Check if student thought cross product was a scalar
            if (typeof expectedCross === 'number') {
                return failure("cross_product", "[u, v]", "TRAP_CROSS_PRODUCT_IS_SCALAR",
                    "Nhầm lẫn khái niệm: Tích có hướng [u, v] là một vector, không phải là một số vô hướng.",
                    "Tích có hướng tạo ra một vector vuông góc với cả u và v.");
            }

            const cross = [
                u[1] * v[2] - u[2] * v[1],
                u[2] * v[0] - u[0] * v[2],
                u[0] * v[1] - u[1] * v[0]
            ];

            if (Array.isArray(expectedCross)) {
                const match = cross.every((c, idx) => Math.abs(c - expectedCross[idx]) < 1e-6);
                if (!match) {
                    return failure("cross_product", `[u, v] = [${cross.join(', ')}]`, "calculation_error",
                        `Tích có hướng là [${cross.join(', ')}], khác với [${expectedCross.join(', ')}].`,
                        "Kiểm tra lại quy tắc định thức 2x2 cho từng tọa độ: y1*z2 - z1*y2, z1*x2 - x1*z2, x1*y2 - y1*x2.");
                }
            }

            return success("cross_product", `[u, v] = [${cross.join(', ')}]`, "verified", "verified", 1.0, {
                crossProduct: cross,
                magnitude: Math.hypot(...cross)
            });
        },

        /**
         * Verifies angle between two lines: cos(phi) = |u1 . u2| / (|u1| * |u2|) >= 0
         */
        verifyAngleBetweenLines(u1, u2, expectedCos = null) {
            if (!Array.isArray(u1) || !Array.isArray(u2) || u1.length !== u2.length) {
                return failure("angle_lines", "cos(d1, d2)", "invalid_vector", "Vector chỉ phương không hợp lệ.", "Kiểm tra lại VTCP.");
            }
            const dot = u1.reduce((sum, val, idx) => sum + val * u2[idx], 0);
            const mag1 = Math.hypot(...u1);
            const mag2 = Math.hypot(...u2);
            if (mag1 < EPSILON || mag2 < EPSILON) {
                return failure("angle_lines", "cos(d1, d2)", "invalid_vector", "VTCP của đường thẳng phải khác vector 0.", "Chọn VTCP khác 0.");
            }

            const cosLines = Math.abs(dot) / (mag1 * mag2);
            const cosVectors = dot / (mag1 * mag2);

            if (expectedCos !== null) {
                // Catch student confusing line angle with vector angle (negative cos)
                if (Math.abs(expectedCos - cosVectors) < 1e-6 && cosVectors < 0) {
                    return failure("angle_lines", `cos = ${cosLines}`, "TRAP_ANGLE_LINE_VS_VECTOR",
                        "Nhầm góc hai đường thẳng với góc hai vector: Góc giữa hai đường thẳng luôn nhọn hoặc vuông (cos >= 0).",
                        "Bắt buộc lấy trị tuyệt đối ở tử số: cos = |u1 . u2| / (|u1| * |u2|).");
                }
                if (Math.abs(expectedCos - cosLines) > 1e-6) {
                    return failure("angle_lines", `cos = ${cosLines}`, "calculation_error",
                        `cos góc giữa hai đường thẳng là ${cosLines.toFixed(4)}, khác với ${expectedCos}.`,
                        "Kiểm tra lại phép tính độ dài và tích vô hướng.");
                }
            }

            return success("angle_lines", `cos = ${cosLines}`, "verified", "verified", 1.0, {
                cos: cosLines,
                angleRadians: Math.acos(Math.min(1, Math.max(0, cosLines))),
                angleDegrees: Math.acos(Math.min(1, Math.max(0, cosLines))) * (180 / Math.PI)
            });
        },

        /**
         * Verifies Sphere equation condition in Oxyz:
         * x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0
         * Condition: R^2 = a^2 + b^2 + c^2 - d > 0
         */
        verifySphere(a, b, c, d) {
            const rSquared = a * a + b * b + c * c - d;
            if (rSquared <= 0) {
                return failure("sphere_check", `a=${a}, b=${b}, c=${c}, d=${d}`, "TRAP_SPHERE_RADIUS_INVALID",
                    `Không phải phương trình mặt cầu: a^2 + b^2 + c^2 - d = ${rSquared} <= 0 (bán kính không xác định hoặc là điểm/tập rỗng).`,
                    "Điều kiện cần và đủ để là mặt cầu: a^2 + b^2 + c^2 - d > 0.");
            }
            const radius = Math.sqrt(rSquared);
            return success("sphere_check", `(S): tâm I(${a}, ${b}, ${c}), R=${radius}`, "valid_sphere", "valid_sphere", 1.0, {
                center: [a, b, c],
                radius,
                rSquared
            });
        },

        /**
         * Verifies Distance from point M0(x0, y0, z0) to plane (P): Ax + By + Cz + D = 0
         */
        verifyPlaneDistance(point, planeCoeffs, expectedDist = null) {
            const [x0, y0, z0] = point;
            const [A, B, C, D] = planeCoeffs;
            const normalMag = Math.hypot(A, B, C);
            if (normalMag < EPSILON) {
                return failure("plane_distance", "d(M, P)", "invalid_plane", "VTPT của mặt phẳng (A, B, C) phải khác vector 0.", "Kiểm tra lại hệ số A, B, C.");
            }
            const numerator = A * x0 + B * y0 + C * z0 + D;
            const dist = Math.abs(numerator) / normalMag;

            if (expectedDist !== null) {
                // Catch student forgetting absolute value
                if (expectedDist < 0) {
                    return failure("plane_distance", `d = ${dist}`, "TRAP_PLANE_DISTANCE_NO_ABS",
                        "Khoảng cách không thể là số âm! Bạn đã quên dấu trị tuyệt đối ở tử số.",
                        "Dùng công thức: d(M, P) = |Ax0 + By0 + Cz0 + D| / sqrt(A^2 + B^2 + C^2).");
                }
                if (Math.abs(dist - expectedDist) > 1e-6) {
                    return failure("plane_distance", `d = ${dist}`, "calculation_error",
                        `Khoảng cách tính được là ${dist}, khác với ${expectedDist}.`, "Kiểm tra lại phép thế tọa độ và tính căn bậc hai.");
                }
            }

            return success("plane_distance", `d = ${dist}`, "verified", "verified", 1.0, { distance: dist });
        },

        // =========================================================================
        // SECTION: Combinatorics, Classical Probability & Circular Permutations
        // =========================================================================

        /**
         * Verifies Permutation / Arrangement / Combination formulas:
         * n!, A_n^k, C_n^k with domain constraints n, k in N, 0 <= k <= n.
         */
        verifyCombinatorics(n, k, type = 'combination', expectedVal = null) {
            if (!Number.isInteger(n) || n < 0) {
                return failure("combinatorics", `${type}(${n}, ${k})`, "domain_violation", "n phải là số tự nhiên không âm (n >= 0).", "Nhập n là số nguyên >= 0.");
            }
            if (type !== 'factorial' && (!Number.isInteger(k) || k < 0)) {
                return failure("combinatorics", `${type}(${n}, ${k})`, "domain_violation", "k phải là số tự nhiên không âm (k >= 0).", "Nhập k là số nguyên >= 0.");
            }

            const fact = num => {
                let r = 1;
                for (let i = 2; i <= num; i++) r *= i;
                return r;
            };

            let calculated = 0;
            if (type === 'factorial') {
                calculated = fact(n);
            } else if (type === 'arrangement') { // A_n^k
                if (k > n) {
                    return failure("combinatorics", `A_${n}^${k}`, "domain_violation", "Điều kiện chỉnh hợp: k phải thỏa 0 <= k <= n.", "Kiểm tra lại k và n.");
                }
                calculated = fact(n) / fact(n - k);
            } else if (type === 'combination') { // C_n^k
                if (k > n) {
                    return failure("combinatorics", `C_${n}^${k}`, "domain_violation", "Điều kiện tổ hợp: k phải thỏa 0 <= k <= n.", "Kiểm tra lại k và n.");
                }
                calculated = fact(n) / (fact(k) * fact(n - k));
            } else {
                return failure("combinatorics", `${type}`, "unverified", "Loại phép toán tổ hợp không hỗ trợ.", "Chọn factorial, arrangement, hoặc combination.");
            }

            if (expectedVal !== null) {
                // Catch student confusing C_n^k and A_n^k
                if (type === 'combination' && expectedVal === (fact(n) / fact(n - k)) && k > 1) {
                    return failure("combinatorics", `C_${n}^${k} = ${calculated}`, "TRAP_PERM_COMB_CONFUSION",
                        `Nhầm lẫn giữa Tổ hợp và Chỉnh hợp: Bạn đã tính A_${n}^${k} = ${expectedVal} thay vì C_${n}^${k} = ${calculated}.`,
                        "Chọn không tính thứ tự phải chia thêm cho k!.");
                }
                if (Math.abs(calculated - expectedVal) > 1e-6) {
                    return failure("combinatorics", `Giá trị = ${calculated}`, "calculation_error",
                        `Kết quả tính được là ${calculated}, khác với ${expectedVal}.`, "Kiểm tra lại công thức giai thừa.");
                }
            }

            return success("combinatorics", `Value = ${calculated}`, "verified", "verified", 1.0, { value: calculated });
        },

        /**
         * Verifies Circular Table Arrangement (Hoán vị bàn tròn) & Related Probabilities
         * Covers:
         * 1. Standard unnumbered table: (n - 1)!
         * 2. Numbered seats table: n!
         * 3. Adjacent block constraint (A & B sit together): (n - 2)! * 2!, P = 2 / (n - 1)
         * 4. Separated constraint (A & B do not sit together): (n - 3) * (n - 2)!, P = (n - 3) / (n - 1)
         * 5. Alternating boys & girls (n boys, n girls): (n - 1)! * n!
         * 6. Bead necklace / flip symmetry: (n - 1)! / 2
         */
        verifyCircularArrangement(n, options = {}, expectedCount = null, expectedProb = null) {
            if (!Number.isInteger(n) || n < 3) {
                return failure("circular_arrangement", `n=${n}`, "domain_violation",
                    "Xếp bàn tròn yêu cầu ít nhất 3 người/vị trí (n >= 3) để tạo thành chu trình tròn phân biệt.", "Chọn n >= 3.");
            }

            const fact = num => {
                let r = 1;
                for (let i = 2; i <= num; i++) r *= i;
                return r;
            };

            const sampleSpace = fact(n - 1); // Không gian mẫu bàn tròn không đánh số

            // 1. Bàn tròn có ghế đánh số
            if (options.numberedSeats) {
                const count = fact(n);
                if (expectedCount !== null) {
                    if (expectedCount === fact(n - 1)) {
                        return failure("circular_arrangement", `N = ${count}`, "TRAP_ROUND_TABLE_NUMBERED_SEATS",
                            "Nhầm bàn có ghế đánh số với bàn tròn tự do: Khi các ghế đã đánh số, tính chất bất biến phép quay bị triệt tiêu, số cách xếp là n!.",
                            "Dùng n! cho bàn tròn có ghế đánh số.");
                    }
                    if (expectedCount !== count) {
                        return failure("circular_arrangement", `N = ${count}`, "calculation_error", `Số cách là ${count}, khác ${expectedCount}.`, "Tính n!.");
                    }
                }
                return success("circular_arrangement", `N = ${count}`, "numbered_round_table", "numbered_round_table", 1.0, { count });
            }

            // 2. Chuỗi hạt / Vòng hoa có đối xứng gương (Flip symmetry)
            if (options.flipSymmetry) {
                const count = fact(n - 1) / 2;
                if (expectedCount !== null) {
                    if (expectedCount === fact(n - 1)) {
                        return failure("circular_arrangement", `N = ${count}`, "TRAP_ROUND_TABLE_FLIP_SYMMETRY",
                            "Quên chia 2 đối xứng gương: Chuỗi hạt có thể lật úp ngược (2 mặt nhìn giống nhau), số cách là (n - 1)! / 2.",
                            "Chia đôi kết quả hoán vị vòng quanh khi bài toán có tính lật mặt đối xứng.");
                    }
                    if (expectedCount !== count) {
                        return failure("circular_arrangement", `N = ${count}`, "calculation_error", `Số cách là ${count}, khác ${expectedCount}.`, "Tính (n-1)! / 2.");
                    }
                }
                return success("circular_arrangement", `N = ${count}`, "flip_symmetry", "flip_symmetry", 1.0, { count });
            }

            // 3. Buộc phần tử: 2 người A và B ngồi cạnh nhau
            if (options.adjacentTwo) {
                // Buộc (A, B) thành 1 khối có 2! cách. Còn n - 1 khối, xếp tròn có (n - 2)! cách.
                const count = fact(n - 2) * 2;
                const prob = 2 / (n - 1);

                if (expectedCount !== null) {
                    if (expectedCount === fact(n - 1) * 2) {
                        return failure("circular_arrangement", `N = ${count}`, "TRAP_ROUND_TABLE_BLOCK_FACTORIAL",
                            "Sai bậc giai thừa khi buộc phần tử: Buộc 2 người thì chỉ còn n - 1 khối, xếp tròn có ( (n - 1) - 1 )! = (n - 2)! cách, không phải (n - 1)!.",
                            "Số cách xếp là (n - 2)! * 2!.");
                    }
                    if (expectedCount === fact(n - 2)) {
                        return failure("circular_arrangement", `N = ${count}`, "calculation_error",
                            "Quên nhân 2! hoán vị nội bộ: Hai người A và B có thể đổi chỗ cho nhau (A-B hoặc B-A).",
                            "Nhân thêm 2! cho hoán vị giữa A và B.");
                    }
                    if (expectedCount !== count) {
                        return failure("circular_arrangement", `N = ${count}`, "calculation_error", `Số cách là ${count}, khác ${expectedCount}.`, "Dùng (n - 2)! * 2!.");
                    }
                }

                if (expectedProb !== null && Math.abs(expectedProb - prob) > 1e-6) {
                    return failure("circular_arrangement", `P = ${prob}`, "calculation_error",
                        `Xác suất ngồi cạnh nhau là 2 / (${n} - 1) = ${prob.toFixed(4)}, khác ${expectedProb}.`,
                        "Lấy n(A) = (n - 2)! * 2 chia cho n(Omega) = (n - 1)!.");
                }

                return success("circular_arrangement", `N = ${count}, P = ${prob}`, "adjacent_round_table", "adjacent_round_table", 1.0, {
                    count,
                    probability: prob,
                    sampleSpace
                });
            }

            // 4. Hai người A và B KHÔNG ngồi cạnh nhau
            if (options.separatedTwo) {
                const count = (n - 3) * fact(n - 2);
                const prob = (n - 3) / (n - 1);

                if (expectedCount !== null && expectedCount !== count) {
                    return failure("circular_arrangement", `N = ${count}`, "calculation_error",
                        `Số cách là (n - 3) * (n - 2)! = ${count}, khác ${expectedCount}.`,
                        "Dùng biến cố đối: (n - 1)! - 2 * (n - 2)!.");
                }
                if (expectedProb !== null && Math.abs(expectedProb - prob) > 1e-6) {
                    return failure("circular_arrangement", `P = ${prob}`, "calculation_error",
                        `Xác suất không ngồi cạnh là (${n} - 3) / (${n} - 1) = ${prob.toFixed(4)}, khác ${expectedProb}.`,
                        "Dùng biến cố đối: 1 - 2/(n - 1).");
                }

                return success("circular_arrangement", `N = ${count}, P = ${prob}`, "separated_round_table", "separated_round_table", 1.0, {
                    count,
                    probability: prob,
                    sampleSpace
                });
            }

            // 5. Xếp xen kẽ n nam và n nữ (Tổng 2n người)
            if (options.alternating) {
                // n nam xếp tròn có (n - 1)! cách. Tạo n khoảng trống. Xếp n nữ vào n khoảng trống (đã phân biệt vị trí) có n! cách.
                const count = fact(n - 1) * fact(n);
                const totalSample = fact(2 * n - 1);
                const prob = count / totalSample;

                if (expectedCount !== null) {
                    if (expectedCount === 2 * fact(n - 1) * fact(n)) {
                        return failure("circular_arrangement", `N = ${count}`, "TRAP_ROUND_TABLE_ALTERNATING_OVERCOUNT",
                            "Nhân thừa 2 trường hợp: Trên vòng tròn đóng kín, khi nam đã ngồi thì vị trí xen kẽ của nữ đã cố định tương đối, không phân chia 2 trường hợp như hàng thẳng.",
                            "Số cách xếp xen kẽ trên bàn tròn là (n - 1)! * n! (không nhân 2).");
                    }
                    if (expectedCount !== count) {
                        return failure("circular_arrangement", `N = ${count}`, "calculation_error", `Số cách là ${count}, khác ${expectedCount}.`, "Dùng (n - 1)! * n!.");
                    }
                }

                return success("circular_arrangement", `N = ${count}, P = ${prob}`, "alternating_round_table", "alternating_round_table", 1.0, {
                    count,
                    probability: prob,
                    sampleSpace: totalSample
                });
            }

            // Mặc định: Hoán vị vòng quanh tiêu chuẩn (n - 1)!
            const count = fact(n - 1);
            if (expectedCount !== null) {
                if (expectedCount === fact(n)) {
                    return failure("circular_arrangement", `N = ${count}`, "TRAP_PERM_COMB_CONFUSION",
                        "Nhầm hoán vị vòng quanh với hoán vị thẳng: Bàn tròn tự do có tính bất biến đối với phép quay, số cách xếp là (n - 1)!, không phải n!.",
                        "Cố định 1 người làm mốc, xếp n - 1 người còn lại có (n - 1)! cách.");
                }
                if (expectedCount !== count) {
                    return failure("circular_arrangement", `N = ${count}`, "calculation_error", `Số cách là (n - 1)! = ${count}, khác ${expectedCount}.`, "Tính (n - 1)!.");
                }
            }

            return success("circular_arrangement", `N = ${count}`, "standard_round_table", "standard_round_table", 1.0, { count });
        }
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = CASEngine;
    } else {
        root.CASEngine = CASEngine;
    }
})(typeof self !== 'undefined' ? self : (typeof window !== 'undefined' ? window : this));
