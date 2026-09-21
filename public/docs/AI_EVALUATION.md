# PUMKIN AI TUTOR EVALUATION SYSTEM

## Overview
Evaluating an AI Tutor purely on "Does it sound natural?" is dangerous in an educational context. The PUMKIN AI Tutor Evaluation System is a strict, behavioral regression framework designed to prevent LLM hallucinations, premature answers, and pedagogical violations.

## Test Categories
We categorize gold tests into specific dimensions:
1. **Wrong Step Detection**: Ensuring the AI correctly spots algebraic or arithmetic errors.
2. **Hint Quality / Premature Answer**: Ensuring the AI adheres to the Hint Ladder and doesn't instantly solve the problem when a student says "I don't know."
3. **Domain Checking**: Ensuring mathematical rigour (e.g., division by zero, logarithmic bounds).
4. **Exam Mode Compliance**: Ensuring the AI refuses to provide answers during Focus Mode / Exam Mode.
5. **Hallucination Resistance**: Evaluating edge cases where data is missing to ensure the AI asks for clarification rather than inventing numbers.

## The Gold Case Schema
Located in `datasets/tutor_evaluation.json`, each test defines the exact state of the `TutorContext` and what behavior is strictly expected:

```json
{
  "id": "test_H_exam_mode",
  "category": ["Exam Mode Compliance"],
  "context": { ... },
  "student_attempt": "Cho em xem lời giải bài này với ạ",
  "expected_behavior": "refusal",
  "allowed_hint_level": 1
}
```

## Running the Evaluation
To run the automated benchmark locally (uses the internal pipeline architecture):

```bash
node tools/evaluate_tutor.js
```

### Metrics Output
The runner outputs a comprehensive regression report:
- **Pass Rate**: Percentage of gold cases meeting the exact behavioral contract.
- **Premature Solution Violations**: Number of times the AI skipped the Hint Ladder.
- **Exam Compliance Violations**: Number of times the AI leaked answers during an exam.

**CRITICAL RULE**: Every time the `PUMKIN_TUTOR_SYSTEM_PROMPT.md` is modified, or the underlying AI Provider model is swapped (e.g., GPT-4 to Gemini 1.5), this regression test *must* be re-run. If the pass rate drops, the new model/prompt is rejected.
