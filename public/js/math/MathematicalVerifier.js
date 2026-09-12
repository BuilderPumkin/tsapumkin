/**
 * PUMKIN MATHEMATICAL VERIFICATION LAYER
 * 
 * Abstraction layer to deterministically verify mathematical steps.
 * AI Tutors should delegate math evaluation here to prevent hallucinations.
 * Future-ready to plug in SymPy, Algebrite, or Math.js.
 */

const MathematicalVerifier = (function() {
    
    // Config
    const EPSILON = 1e-9;
    
    // Future CAS Engine reference
    let _symbolicEngine = null;

    /**
     * Integrate an external Computer Algebra System (CAS)
     * @param {Object} engine 
     */
    function registerEngine(engine) {
        _symbolicEngine = engine;
    }

    /**
     * Factory for successful results
     */
    function success(method, expr, expected, actual, confidence = 1.0) {
        return { valid: true, expression: expr, expected, actual, method, confidence, error: null };
    }

    /**
     * Factory for error results
     */
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

    /**
     * Checks domain violations (divide by zero, negative sqrt, log of <=0)
     */
    function checkDomain(expression) {
        const expr = String(expression).replace(/\s+/g, '').toLowerCase();

        // Division by zero literal check
        if (/\/0(?!\.)/.test(expr)) {
            return failure("domain_check", expression, "domain_violation", 
                "Phép chia cho 0 không xác định.", 
                "Kiểm tra lại điều kiện mẫu khác 0.");
        }

        // Basic sqrt negative check (e.g. sqrt(-5))
        if (/sqrt\(\s*-[0-9.]+/.test(expr)) {
            return failure("domain_check", expression, "domain_violation", 
                "Biểu thức dưới căn bậc hai phải lớn hơn hoặc bằng 0.", 
                "Kiểm tra lại điều kiện của căn bậc chẵn.");
        }

        // Basic log negative/zero check
        if (/log\(\s*-[0-9.]+/.test(expr) || /log\(\s*0(?!\.)/.test(expr)) {
            return failure("domain_check", expression, "domain_violation", 
                "Biểu thức trong logarit phải lớn hơn 0.", 
                "Kiểm tra lại điều kiện của logarit.");
        }

        return success("domain_check", expression, "valid", "valid");
    }

    /**
     * Evaluates a simple arithmetic expression string safely
     */
    function _safeEval(expr) {
        // Only allow numbers, basic operators, and parens
        if (!/^[0-9+\-*/().\s]+$/.test(expr)) {
            throw new Error("PARSE_ERROR");
        }
        // Avoid division by zero in eval
        if (/\/0(?!\.)/.test(expr.replace(/\s+/g, ''))) {
            throw new Error("DIV_ZERO");
        }
        return Function(`'use strict'; return (${expr})`)();
    }

    /**
     * Verifies basic arithmetic operations with floating point safety
     */
    function verifyArithmetic(expression, expectedValue) {
        const domainCheck = checkDomain(expression);
        if (!domainCheck.valid) return domainCheck;

        try {
            const actualValue = _safeEval(expression);
            
            // Floating point comparison
            if (Math.abs(actualValue - expectedValue) < EPSILON) {
                return success("arithmetic", expression, expectedValue, actualValue);
            } else {
                return failure("arithmetic", expression, "calculation_error", 
                    `Kết quả tính toán ra ${actualValue}, ngược lại với kỳ vọng là ${expectedValue}.`,
                    "Em hãy kiểm tra lại phép cộng trừ nhân chia nhé.",
                    "evaluation", expectedValue, actualValue);
            }
        } catch (e) {
            if (e.message === "DIV_ZERO") {
                return failure("arithmetic", expression, "domain_violation", "Phép chia cho 0 không xác định.", "Kiểm tra mẫu số.");
            }
            return failure("arithmetic", expression, "parse_error", "Không thể phân tích biểu thức toán học.", "Viết lại biểu thức rõ ràng hơn.");
        }
    }

    /**
     * Interface for Step Checking (Equation solving)
     * To be backed by CAS in the future.
     */
    function verifyEquationStep(prevStep, nextStep) {
        if (_symbolicEngine) {
            return _symbolicEngine.verifyStep(prevStep, nextStep);
        }

        // Fallback: unsupported without CAS, return low confidence or unverified
        return {
            valid: false,
            expression: `${prevStep} => ${nextStep}`,
            expected: null,
            actual: null,
            method: "equation_step",
            confidence: 0.0,
            error: {
                error_type: "unverified",
                location: "engine",
                explanation: "Symbolic engine (CAS) is not currently loaded to verify this algebraic step.",
                suggested_next_step: "Tutor can ask user to explain their logic."
            }
        };
    }

    return {
        registerEngine,
        checkDomain,
        verifyArithmetic,
        verifyEquationStep
    };
})();

// Export for Node.js tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MathematicalVerifier;
}
