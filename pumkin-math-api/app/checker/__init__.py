"""
Submission Checker & Cross-Verification Layer (app/checker)
Evaluates correctness and diagnoses cognitive misconception traps.
Follows GEMINI.md standards: strictly no eval/exec/sympify/parse_expr.
"""

from app.checker.checker import check_student_submission
from app.checker.evaluators import (
    evaluate_boolean_group,
    evaluate_expression,
    evaluate_interval,
    evaluate_matrix,
    evaluate_multiple_choice,
    evaluate_number,
    evaluate_set,
    evaluate_step_solution,
)
from app.checker.normalizer import (
    normalize_vietnamese_number,
    parse_interval_tokens,
    parse_set_elements,
    strip_latex_wrappers,
    strip_units,
    strip_variable_prefix,
    to_katex_inline,
)

__all__ = [
    "check_student_submission",
    "evaluate_boolean_group",
    "evaluate_expression",
    "evaluate_interval",
    "evaluate_matrix",
    "evaluate_multiple_choice",
    "evaluate_number",
    "evaluate_set",
    "evaluate_step_solution",
    "normalize_vietnamese_number",
    "parse_interval_tokens",
    "parse_set_elements",
    "strip_latex_wrappers",
    "strip_units",
    "strip_variable_prefix",
    "to_katex_inline",
]
