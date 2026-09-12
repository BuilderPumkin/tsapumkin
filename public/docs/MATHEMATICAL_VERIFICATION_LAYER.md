# PUMKIN MATHEMATICAL VERIFICATION LAYER

## Overview
The **Mathematical Verification Layer** is a deterministic engine designed to validate mathematical logic and steps. Large Language Models (LLMs) are notoriously unreliable at performing exact arithmetic or verifying complex algebraic steps. This layer ensures that the AI Tutor delegates absolute mathematical truth back to deterministic systems (Core), avoiding hallucinations and providing structured, reliable feedback.

## Core Philosophy
- **AI Models** are used for: Explaining, guiding (Hint Ladder), interpreting natural language, and engaging the student.
- **Verification Layer** is used for: Checking equations, confirming arithmetic, verifying domain restrictions, and matching expected answers.

## Architecture & Integration Interface
The `MathematicalVerifier` is implemented in `js/math/MathematicalVerifier.js`. It returns a standardized `VerificationResult` (defined in `schemas/verification_result.schema.json`).

### 1. `VerificationResult` Schema
All verification methods return a standard payload:
```json
{
  "valid": false,
  "expression": "3 * 5",
  "expected": 14,
  "actual": 15,
  "method": "arithmetic",
  "confidence": 1.0,
  "error": {
    "error_type": "calculation_error",
    "location": "evaluation",
    "explanation": "Kết quả tính toán ra 15, ngược lại với kỳ vọng là 14.",
    "suggested_next_step": "Em hãy kiểm tra lại phép cộng trừ nhân chia nhé."
  }
}
```

### 2. Available Verification Methods
- **`checkDomain(expression)`**: Scans for common domain violations such as division by zero (`/0`), negative square roots (`sqrt(-x)`), or negative/zero logarithms (`log(0)`).
- **`verifyArithmetic(expression, expectedValue)`**: Safely evaluates basic arithmetic while handling floating-point inaccuracies (e.g., `0.1 + 0.2 === 0.3`). Blocks arbitrary code execution using regex validation.
- **`verifyEquationStep(prevStep, nextStep)`**: Determines if `nextStep` logically and mathematically follows `prevStep`. 
  - *Current implementation*: Returns an `unverified` status.
  - *Future-ready*: Built to delegate to an integrated Computer Algebra System (CAS).

### 3. Future CAS Integration
The verifier includes an interface to register an external engine (e.g., SymPy via Pyodide, Algebrite, or Math.js):
```javascript
// Example Future Integration
MathematicalVerifier.registerEngine({
    verifyStep: function(prev, next) {
        // Wrapper calling Algebrite or Math.js
        return CAS.simplify(prev + " - (" + next + ")") === 0;
    }
});
```

## Error Handling & Tutoring
When a step is incorrect, the verifier does NOT just return `false`. It returns a structured `StructuredError` object. 
The AI Tutor uses `error_type` (e.g., `domain_violation`, `calculation_error`) and `explanation` to format a Socratic response, guiding the user to the correct mathematical logic without giving away the final answer.
