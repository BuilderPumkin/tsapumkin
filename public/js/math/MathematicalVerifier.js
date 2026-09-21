/**
 * PUMKIN MATHEMATICAL VERIFICATION LAYER
 * 
 * Abstraction layer to deterministically verify mathematical steps.
 * Uses a custom Shunting-Yard AST parser with randomized numerical sampling.
 * No eval() or Function() used.
 */

const MathematicalVerifier = (function() {
    const EPSILON = 1e-7;
    
    // --- Safe AST Math Parser ---
    class MathError extends Error {
        constructor(message, type = 'math_error') {
            super(message);
            this.type = type;
        }
    }

    function tokenize(expr) {
        const tokens = [];
        let i = 0;
        const len = expr.length;
        
        while (i < len) {
            const c = expr[i];
            if (/\s/.test(c)) {
                i++;
                continue;
            }
            if (/[0-9.]/.test(c)) {
                let num = '';
                while (i < len && /[0-9.]/.test(expr[i])) {
                    num += expr[i];
                    i++;
                }
                tokens.push({ type: 'number', value: parseFloat(num) });
                continue;
            }
            if (/[a-zA-Z]/.test(c)) {
                let name = '';
                while (i < len && /[a-zA-Z]/.test(expr[i])) {
                    name += expr[i];
                    i++;
                }
                if (name === 'x') {
                    tokens.push({ type: 'variable', value: 'x' });
                } else {
                    tokens.push({ type: 'function', value: name });
                }
                continue;
            }
            if (/[+\-*/^()]/.test(c)) {
                tokens.push({ type: 'operator', value: c });
                i++;
                continue;
            }
            throw new MathError(`Kí tự không hợp lệ: ${c}`, 'parse_error');
        }
        return tokens;
    }

    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
    const rightAssociative = { '^': true };

    function toRPN(tokens) {
        const output = [];
        const operators = [];
        
        // Handle unary minus by keeping track of previous token
        let prev = null;

        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            
            if (token.type === 'operator' && token.value === '-') {
                if (!prev || (prev.type === 'operator' && prev.value !== ')') || (prev.type === 'operator' && prev.value === '(')) {
                    // Unary minus
                    token = { type: 'function', value: 'neg' };
                }
            }

            if (token.type === 'number' || token.type === 'variable') {
                output.push(token);
            } else if (token.type === 'function') {
                operators.push(token);
            } else if (token.type === 'operator' && token.value === '(') {
                operators.push(token);
            } else if (token.type === 'operator' && token.value === ')') {
                while (operators.length && operators[operators.length - 1].value !== '(') {
                    output.push(operators.pop());
                }
                if (operators.length === 0) throw new MathError('Thiếu dấu mở ngoặc.', 'parse_error');
                operators.pop(); // pop '('
                if (operators.length && operators[operators.length - 1].type === 'function') {
                    output.push(operators.pop());
                }
            } else if (token.type === 'operator') {
                while (operators.length > 0) {
                    const top = operators[operators.length - 1];
                    if (top.type === 'operator' && top.value !== '(') {
                        const p1 = precedence[token.value] || 0;
                        const p2 = precedence[top.value] || 0;
                        if ((!rightAssociative[token.value] && p1 <= p2) || (rightAssociative[token.value] && p1 < p2)) {
                            output.push(operators.pop());
                            continue;
                        }
                    }
                    break;
                }
                operators.push(token);
            }
            prev = token;
        }

        while (operators.length > 0) {
            const top = operators.pop();
            if (top.value === '(') throw new MathError('Thiếu dấu đóng ngoặc.', 'parse_error');
            output.push(top);
        }

        return output;
    }

    function evaluateRPN(rpn, xValue = 0) {
        const stack = [];
        for (const token of rpn) {
            if (token.type === 'number') {
                stack.push(token.value);
            } else if (token.type === 'variable') {
                stack.push(xValue);
            } else if (token.type === 'operator') {
                if (stack.length < 2) throw new MathError('Biểu thức thiếu toán hạng.', 'parse_error');
                const b = stack.pop();
                const a = stack.pop();
                switch (token.value) {
                    case '+': stack.push(a + b); break;
                    case '-': stack.push(a - b); break;
                    case '*': stack.push(a * b); break;
                    case '/': 
                        if (Math.abs(b) < EPSILON) throw new MathError('Phép chia cho 0 không xác định.', 'domain_violation');
                        stack.push(a / b); 
                        break;
                    case '^': stack.push(Math.pow(a, b)); break;
                    default: throw new MathError(`Toán tử không hỗ trợ: ${token.value}`, 'parse_error');
                }
            } else if (token.type === 'function') {
                if (stack.length < 1) throw new MathError('Hàm thiếu tham số.', 'parse_error');
                const a = stack.pop();
                switch (token.value) {
                    case 'neg': stack.push(-a); break;
                    case 'sqrt': 
                        if (a < -EPSILON) throw new MathError('Biểu thức dưới căn bậc hai phải lớn hơn hoặc bằng 0.', 'domain_violation');
                        stack.push(Math.sqrt(Math.max(0, a))); 
                        break;
                    case 'log': 
                    case 'ln':
                        if (a <= EPSILON) throw new MathError('Biểu thức trong logarit phải lớn hơn 0.', 'domain_violation');
                        stack.push(Math.log(a)); 
                        break;
                    case 'sin': stack.push(Math.sin(a)); break;
                    case 'cos': stack.push(Math.cos(a)); break;
                    default: throw new MathError(`Hàm không hỗ trợ: ${token.value}`, 'parse_error');
                }
            }
        }
        if (stack.length !== 1) throw new MathError('Lỗi cú pháp biểu thức.', 'parse_error');
        return stack[0];
    }

    function _safeEval(expr, xValue = 0) {
        const tokens = tokenize(expr);
        const rpn = toRPN(tokens);
        return evaluateRPN(rpn, xValue);
    }

    // --- End of Parser ---

    function success(method, expr, expected, actual, confidence = 1.0) {
        return { valid: true, expression: expr, expected, actual, method, confidence, error: null };
    }

    function failure(method, expr, errorType, explanation, suggestion, location = "general", expected = null, actual = null) {
        return {
            valid: false,
            expression: expr,
            expected,
            actual,
            method,
            confidence: 1.0,
            error: {
                error_type: errorType,
                location: location,
                explanation: explanation,
                suggested_next_step: suggestion
            }
        };
    }

    function checkDomain(expression, xValue = 0) {
        try {
            _safeEval(expression, xValue);
            return success("domain_check", expression, "valid", "valid");
        } catch (e) {
            if (e.type === 'domain_violation') {
                return failure("domain_check", expression, "domain_violation", e.message, "Kiểm tra lại điều kiện tập xác định.");
            }
            return failure("domain_check", expression, "parse_error", e.message, "Kiểm tra cú pháp biểu thức.");
        }
    }

    function verifyArithmetic(expression, expectedValue) {
        try {
            const actualValue = _safeEval(expression, 0);
            if (Math.abs(actualValue - expectedValue) < EPSILON) {
                return success("arithmetic", expression, expectedValue, actualValue);
            } else {
                return failure("arithmetic", expression, "calculation_error", 
                    `Kết quả tính toán ra ${actualValue}, ngược lại với kỳ vọng là ${expectedValue}.`,
                    "Em hãy kiểm tra lại phép cộng trừ nhân chia nhé.",
                    "evaluation", expectedValue, actualValue);
            }
        } catch (e) {
            if (e.type === "domain_violation") {
                return failure("arithmetic", expression, "domain_violation", e.message, "Kiểm tra mẫu số/căn/log.");
            }
            return failure("arithmetic", expression, "parse_error", e.message, "Viết lại biểu thức rõ ràng hơn.");
        }
    }

    /**
     * Verifies if two algebraic expressions are equivalent using 5-point randomized numerical sampling.
     */
    function verifyEquivalence(expr1, expr2) {
        // Generate 5 random points avoiding exact integers to avoid trivial zeros
        const points = [];
        for (let i = 0; i < 5; i++) {
            points.push(Math.random() * 10 + 1.1); // Range ~1.1 to 11.1
        }
        
        let validPoints = 0;
        let matchPoints = 0;

        for (const x of points) {
            let val1, val2;
            let err1 = null, err2 = null;
            try { val1 = _safeEval(expr1, x); } catch (e) { err1 = e; }
            try { val2 = _safeEval(expr2, x); } catch (e) { err2 = e; }

            if (err1 && err1.type === 'domain_violation' && !err2) {
                return failure("equivalence", `${expr1} == ${expr2}`, "domain_mismatch", "Tập xác định bị thay đổi (nới lỏng).", "Không được làm mất điều kiện xác định.");
            }
            if (!err1 && err2 && err2.type === 'domain_violation') {
                return failure("equivalence", `${expr1} == ${expr2}`, "domain_mismatch", "Tập xác định bị thay đổi (thu hẹp).", "Phép biến đổi phát sinh thêm điều kiện sai.");
            }

            if (!err1 && !err2) {
                validPoints++;
                if (Math.abs(val1 - val2) < EPSILON) matchPoints++;
            }
        }

        if (validPoints === 0) {
            return failure("equivalence", `${expr1} == ${expr2}`, "domain_violation", "Cả 5 điểm thử đều vi phạm điều kiện xác định.", "Hãy chắc chắn biểu thức có tập xác định hợp lệ.");
        }

        if (matchPoints === validPoints) {
            return success("equivalence", `${expr1} == ${expr2}`, "equivalent", "equivalent", matchPoints / 5);
        } else {
            return failure("equivalence", `${expr1} == ${expr2}`, "algebraic_error", "Hai biểu thức không tương đương.", "Kiểm tra lại phép biến đổi đại số.");
        }
    }

    function verifyEquationStep(prevStep, nextStep) {
        if (prevStep.includes('=') || nextStep.includes('=')) {
            return failure("equation_step", `${prevStep} => ${nextStep}`, "unverified", "Chưa tích hợp CAS Engine để xác thực bước giải phương trình.", "Cần kiểm tra thủ công.");
        }
        return verifyEquivalence(prevStep, nextStep);
    }

    return {
        checkDomain,
        verifyArithmetic,
        verifyEquationStep,
        verifyEquivalence,
        _safeEval // Exposing for tests
    };
})();

// Export for Node.js tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MathematicalVerifier;
}
