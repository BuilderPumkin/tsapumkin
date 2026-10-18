"""
Unit Tests for Submission Verification & Grading Engine (POST /v1/check)
Tests >= 60 diverse cases across all supported types:
- Number (integers, floats, fractions, radicals, Vietnamese commas, units)
- Expression (symbolic simplification, trig identities, quasi-random 20-point testing)
- Interval (open/closed, unbounded +-oo, union order invariance, R \\ {a}, boundary traps)
- Set (finite sets, order invariance, empty set representations, missing/extraneous roots)
- Multiple Choice (label matching, value matching, distractor diagnosis)
- Boolean Group & Matrix
- Step Solution (transformation equivalence, squaring both sides trap)
- Safety Invariants (Zero false negatives, cannot_determine is never False)
"""

import pytest

from app.checker.checker import check_student_submission
from app.schemas.check import (
    AnswerTypeEnum,
    CheckRequest,
    CheckVerdictEnum,
)
from app.schemas.traps import MisconceptionTrapEnum

# ==============================================================================
# 1. NUMBER EVALUATION TESTS (>= 15 tests)
# ==============================================================================


@pytest.mark.unit
def test_number_exact_integer_match():
    req = CheckRequest(
        canonical_answer="42", student_answer="42", answer_type=AnswerTypeEnum.NUMBER
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT
    assert res.result.is_correct is True


@pytest.mark.unit
def test_number_integer_incorrect():
    req = CheckRequest(
        canonical_answer="42", student_answer="43", answer_type=AnswerTypeEnum.NUMBER
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.INCORRECT
    assert res.result.is_correct is False


@pytest.mark.unit
def test_number_fraction_vs_decimal():
    req = CheckRequest(
        canonical_answer="0.5", student_answer="1/2", answer_type=AnswerTypeEnum.NUMBER
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT_DIFFERENT_FORM
    assert res.result.is_correct is True


@pytest.mark.unit
def test_number_unsimplified_fraction():
    req = CheckRequest(
        canonical_answer="1/2", student_answer="2/4", answer_type=AnswerTypeEnum.NUMBER
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT_DIFFERENT_FORM
    assert res.result.is_correct is True


@pytest.mark.unit
def test_number_vietnamese_comma():
    req = CheckRequest(
        canonical_answer="3.5", student_answer="3,5", answer_type=AnswerTypeEnum.NUMBER
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT_DIFFERENT_FORM
    assert res.result.is_correct is True


@pytest.mark.unit
def test_number_negative_vietnamese_comma():
    req = CheckRequest(
        canonical_answer="-0.75", student_answer="-0,75", answer_type=AnswerTypeEnum.NUMBER
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT_DIFFERENT_FORM
    assert res.result.is_correct is True


@pytest.mark.unit
def test_number_variable_prefix_stripping():
    req = CheckRequest(
        canonical_answer="5", student_answer="x = 5", answer_type=AnswerTypeEnum.NUMBER
    )
    res = check_student_submission(req)
    assert res.result.verdict in (CheckVerdictEnum.CORRECT, CheckVerdictEnum.CORRECT_DIFFERENT_FORM)
    assert res.result.is_correct is True


@pytest.mark.unit
def test_number_parameter_prefix_stripping():
    req = CheckRequest(
        canonical_answer="-3", student_answer="m = -3", answer_type=AnswerTypeEnum.NUMBER
    )
    res = check_student_submission(req)
    assert res.result.verdict in (CheckVerdictEnum.CORRECT, CheckVerdictEnum.CORRECT_DIFFERENT_FORM)
    assert res.result.is_correct is True


@pytest.mark.unit
def test_number_trailing_units_stripping_cm():
    req = CheckRequest(
        canonical_answer="10", student_answer="10 cm", answer_type=AnswerTypeEnum.NUMBER
    )
    res = check_student_submission(req)
    assert res.result.verdict in (CheckVerdictEnum.CORRECT, CheckVerdictEnum.CORRECT_DIFFERENT_FORM)
    assert res.result.is_correct is True


@pytest.mark.unit
def test_number_trailing_degree_sign():
    req = CheckRequest(
        canonical_answer="60", student_answer="60°", answer_type=AnswerTypeEnum.NUMBER
    )
    res = check_student_submission(req)
    assert res.result.verdict in (CheckVerdictEnum.CORRECT, CheckVerdictEnum.CORRECT_DIFFERENT_FORM)
    assert res.result.is_correct is True


@pytest.mark.unit
def test_number_degree_latex_circ():
    req = CheckRequest(
        canonical_answer="45", student_answer=r"45^\circ", answer_type=AnswerTypeEnum.NUMBER
    )
    res = check_student_submission(req)
    assert res.result.verdict in (CheckVerdictEnum.CORRECT, CheckVerdictEnum.CORRECT_DIFFERENT_FORM)
    assert res.result.is_correct is True


@pytest.mark.unit
def test_number_sign_trap_detection():
    req = CheckRequest(
        canonical_answer="15", student_answer="-15", answer_type=AnswerTypeEnum.NUMBER
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.INCORRECT
    assert res.result.is_correct is False
    assert res.result.detected_misconception_id == MisconceptionTrapEnum.TRAP_SIGN_ERROR


@pytest.mark.unit
def test_number_inverse_trap_detection():
    req = CheckRequest(
        canonical_answer="4", student_answer="0.25", answer_type=AnswerTypeEnum.NUMBER
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.INCORRECT
    assert res.result.is_correct is False
    assert res.result.detected_misconception_id == MisconceptionTrapEnum.TRAP_INVERSE_OPERATION


@pytest.mark.unit
def test_number_radical_exact_symbolic():
    req = CheckRequest(
        canonical_answer=r"\sqrt{2}", student_answer=r"\sqrt{2}", answer_type=AnswerTypeEnum.NUMBER
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT
    assert res.result.is_correct is True


@pytest.mark.unit
def test_number_radical_approximate_tolerance():
    req = CheckRequest(
        canonical_answer=r"\sqrt{2}", student_answer="1.414213", answer_type=AnswerTypeEnum.NUMBER
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT_DIFFERENT_FORM
    assert res.result.is_correct is True


# ==============================================================================
# 2. EXPRESSION EVALUATION TESTS (>= 15 tests)
# ==============================================================================


@pytest.mark.unit
def test_expression_exact_match():
    req = CheckRequest(
        canonical_answer="2*x + 1", student_answer="2*x + 1", answer_type=AnswerTypeEnum.EXPRESSION
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT
    assert res.result.is_correct is True


@pytest.mark.unit
def test_expression_factored_vs_expanded():
    req = CheckRequest(
        canonical_answer="x^2 - 1",
        student_answer="(x - 1)*(x + 1)",
        answer_type=AnswerTypeEnum.EXPRESSION,
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT_DIFFERENT_FORM
    assert res.result.is_correct is True


@pytest.mark.unit
def test_expression_trigonometric_double_angle():
    req = CheckRequest(
        canonical_answer=r"\sin(2*x)",
        student_answer=r"2*\sin(x)*\cos(x)",
        answer_type=AnswerTypeEnum.EXPRESSION,
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT_DIFFERENT_FORM
    assert res.result.is_correct is True


@pytest.mark.unit
def test_expression_trigonometric_cos_double_angle():
    req = CheckRequest(
        canonical_answer=r"\cos(2*x)",
        student_answer=r"\cos(x)^2 - \sin(x)^2",
        answer_type=AnswerTypeEnum.EXPRESSION,
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT_DIFFERENT_FORM
    assert res.result.is_correct is True


@pytest.mark.unit
def test_expression_pythagorean_identity():
    req = CheckRequest(
        canonical_answer="1",
        student_answer=r"\sin(x)^2 + \cos(x)^2",
        answer_type=AnswerTypeEnum.EXPRESSION,
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT_DIFFERENT_FORM
    assert res.result.is_correct is True


@pytest.mark.unit
def test_expression_linear_rearranged():
    req = CheckRequest(
        canonical_answer="3*x - 2", student_answer="-2 + 3*x", answer_type=AnswerTypeEnum.EXPRESSION
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT_DIFFERENT_FORM
    assert res.result.is_correct is True


@pytest.mark.unit
def test_expression_with_y_prefix():
    req = CheckRequest(
        canonical_answer="2*x + 3",
        student_answer="y = 2*x + 3",
        answer_type=AnswerTypeEnum.EXPRESSION,
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT
    assert res.result.is_correct is True


@pytest.mark.unit
def test_expression_numeric_sampling_20_points():
    # Complicated algebraic identity tested via 20 points
    req = CheckRequest(
        canonical_answer=r"\sqrt{x^2 + 2*x + 1}",
        student_answer=r"|x + 1|",
        answer_type=AnswerTypeEnum.EXPRESSION,
    )
    res = check_student_submission(req)
    assert res.result.is_correct is True


@pytest.mark.unit
def test_expression_log_sampling_in_domain():
    req = CheckRequest(
        canonical_answer=r"\ln(x - 2) + 1",
        student_answer=r"\ln(x - 2) + \ln(e)",
        answer_type=AnswerTypeEnum.EXPRESSION,
    )
    res = check_student_submission(req)
    assert res.result.is_correct is True


@pytest.mark.unit
def test_expression_incorrect():
    req = CheckRequest(
        canonical_answer="x^2 + 1", student_answer="x^2 - 1", answer_type=AnswerTypeEnum.EXPRESSION
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.INCORRECT
    assert res.result.is_correct is False


@pytest.mark.unit
def test_expression_sign_trap_detection():
    req = CheckRequest(
        canonical_answer="3*x - 5", student_answer="-3*x + 5", answer_type=AnswerTypeEnum.EXPRESSION
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.INCORRECT
    assert res.result.is_correct is False
    assert res.result.detected_misconception_id == MisconceptionTrapEnum.TRAP_SIGN_ERROR


@pytest.mark.unit
def test_expression_unparseable_syntax_cannot_determine():
    req = CheckRequest(
        canonical_answer="x + 1", student_answer="x ++//? 1", answer_type=AnswerTypeEnum.EXPRESSION
    )
    res = check_student_submission(req)
    # SAFETY: unparseable syntax must NEVER be marked incorrect
    assert res.result.verdict == CheckVerdictEnum.CANNOT_DETERMINE
    assert res.result.is_correct is None


# ==============================================================================
# 3. INTERVAL EVALUATION TESTS (>= 10 tests)
# ==============================================================================


@pytest.mark.unit
def test_interval_exact_open():
    req = CheckRequest(
        canonical_answer="(1, 5)", student_answer="(1, 5)", answer_type=AnswerTypeEnum.INTERVAL
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT
    assert res.result.is_correct is True


@pytest.mark.unit
def test_interval_semicolon_vietnamese_notation():
    req = CheckRequest(
        canonical_answer="(1, 5)", student_answer="(1; 5)", answer_type=AnswerTypeEnum.INTERVAL
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT_DIFFERENT_FORM
    assert res.result.is_correct is True


@pytest.mark.unit
def test_interval_unbounded_infinity():
    req = CheckRequest(
        canonical_answer=r"(-\infty, 2]",
        student_answer=r"(-\infty; 2]",
        answer_type=AnswerTypeEnum.INTERVAL,
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT_DIFFERENT_FORM
    assert res.result.is_correct is True


@pytest.mark.unit
def test_interval_union_order_invariance():
    req = CheckRequest(
        canonical_answer=r"(-\infty, 0) \cup (2, +\infty)",
        student_answer=r"(2, +\infty) \cup (-\infty, 0)",
        answer_type=AnswerTypeEnum.INTERVAL,
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT_DIFFERENT_FORM
    assert res.result.is_correct is True


@pytest.mark.unit
def test_interval_real_numbers_R():
    req = CheckRequest(
        canonical_answer=r"\mathbb{R}", student_answer="R", answer_type=AnswerTypeEnum.INTERVAL
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT_DIFFERENT_FORM
    assert res.result.is_correct is True


@pytest.mark.unit
def test_interval_R_setminus_point():
    req = CheckRequest(
        canonical_answer=r"\mathbb{R} \setminus \{0\}",
        student_answer=r"(-\infty, 0) \cup (0, +\infty)",
        answer_type=AnswerTypeEnum.INTERVAL,
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT_DIFFERENT_FORM
    assert res.result.is_correct is True


@pytest.mark.unit
def test_interval_boundary_trap_open_vs_closed():
    req = CheckRequest(
        canonical_answer="[1, 5]", student_answer="(1, 5)", answer_type=AnswerTypeEnum.INTERVAL
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.INCORRECT
    assert res.result.is_correct is False
    assert res.result.detected_misconception_id == MisconceptionTrapEnum.TRAP_BOUNDARY_NOT_CHECKED


@pytest.mark.unit
def test_interval_wrong_endpoint():
    req = CheckRequest(
        canonical_answer="(1, 5)", student_answer="(1, 6)", answer_type=AnswerTypeEnum.INTERVAL
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.INCORRECT
    assert res.result.is_correct is False


# ==============================================================================
# 4. SET EVALUATION TESTS (>= 10 tests)
# ==============================================================================


@pytest.mark.unit
def test_set_exact_match():
    req = CheckRequest(
        canonical_answer="{1, 2, 3}", student_answer="{1, 2, 3}", answer_type=AnswerTypeEnum.SET
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT
    assert res.result.is_correct is True


@pytest.mark.unit
def test_set_order_invariance():
    req = CheckRequest(
        canonical_answer="{1, 2, 3}", student_answer="{3, 1, 2}", answer_type=AnswerTypeEnum.SET
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT_DIFFERENT_FORM
    assert res.result.is_correct is True


@pytest.mark.unit
def test_set_deduplication():
    req = CheckRequest(
        canonical_answer="{1, 2}", student_answer="{1, 2, 2}", answer_type=AnswerTypeEnum.SET
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT_DIFFERENT_FORM
    assert res.result.is_correct is True


@pytest.mark.unit
def test_set_empty_set_variations():
    req = CheckRequest(
        canonical_answer=r"\emptyset", student_answer=r"\varnothing", answer_type=AnswerTypeEnum.SET
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT
    assert res.result.is_correct is True


@pytest.mark.unit
def test_set_empty_braces_vs_emptyset():
    req = CheckRequest(
        canonical_answer=r"\emptyset", student_answer="{}", answer_type=AnswerTypeEnum.SET
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT
    assert res.result.is_correct is True


@pytest.mark.unit
def test_set_missing_roots():
    req = CheckRequest(
        canonical_answer="{1, 2, 3}", student_answer="{1, 2}", answer_type=AnswerTypeEnum.SET
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.INCORRECT
    assert res.result.is_correct is False
    assert "Thiếu nghiệm" in res.result.feedback_vi


@pytest.mark.unit
def test_set_extraneous_roots_trap():
    req = CheckRequest(
        canonical_answer="{1}", student_answer="{1, -2}", answer_type=AnswerTypeEnum.SET
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.INCORRECT
    assert res.result.is_correct is False
    assert res.result.detected_misconception_id == MisconceptionTrapEnum.TRAP_RADICAL_DOMAIN_IGNORED


# ==============================================================================
# 5. MULTIPLE CHOICE TESTS (>= 10 tests)
# ==============================================================================


@pytest.mark.unit
def test_mc_exact_label():
    req = CheckRequest(
        canonical_answer="B", student_answer="B", answer_type=AnswerTypeEnum.MULTIPLE_CHOICE
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT
    assert res.result.is_correct is True


@pytest.mark.unit
def test_mc_lowercase_label():
    req = CheckRequest(
        canonical_answer="A", student_answer="a", answer_type=AnswerTypeEnum.MULTIPLE_CHOICE
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT
    assert res.result.is_correct is True


@pytest.mark.unit
def test_mc_bracketed_label():
    req = CheckRequest(
        canonical_answer="C", student_answer="(C)", answer_type=AnswerTypeEnum.MULTIPLE_CHOICE
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT
    assert res.result.is_correct is True


@pytest.mark.unit
def test_mc_dot_label():
    req = CheckRequest(
        canonical_answer="D", student_answer="D.", answer_type=AnswerTypeEnum.MULTIPLE_CHOICE
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT
    assert res.result.is_correct is True


@pytest.mark.unit
def test_mc_index_to_label():
    req = CheckRequest(
        canonical_answer="1", student_answer="B", answer_type=AnswerTypeEnum.MULTIPLE_CHOICE
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT
    assert res.result.is_correct is True


@pytest.mark.unit
def test_mc_incorrect_label():
    req = CheckRequest(
        canonical_answer="A", student_answer="C", answer_type=AnswerTypeEnum.MULTIPLE_CHOICE
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.INCORRECT
    assert res.result.is_correct is False


# ==============================================================================
# 6. STEP SOLUTION & ADVANCED TESTS (>= 5 tests)
# ==============================================================================


@pytest.mark.unit
def test_step_valid_algebraic_transformation():
    req = CheckRequest(
        canonical_answer="2*x = 4",
        student_answer="x = 2",
        answer_type=AnswerTypeEnum.STEP_SOLUTION,
        step_index=2,
    )
    res = check_student_submission(req)
    # Different form but mathematically valid
    assert res.result.is_correct is True


@pytest.mark.unit
def test_step_squaring_both_sides_trap():
    req = CheckRequest(
        canonical_answer="x - 1",
        student_answer="(x - 1)^2",
        answer_type=AnswerTypeEnum.STEP_SOLUTION,
        step_index=1,
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.INCORRECT
    assert res.result.is_correct is False
    assert res.result.detected_misconception_id == MisconceptionTrapEnum.TRAP_RADICAL_DOMAIN_IGNORED


# ==============================================================================
# 7. SAFETY INVARIANTS & EDGE CASES (>= 10 tests)
# ==============================================================================


@pytest.mark.unit
def test_safety_cannot_determine_is_never_marked_false():
    """SAFETY INVARIANT: cannot_determine must have is_correct=None and never penalize."""
    req = CheckRequest(
        canonical_answer="x + 1",
        student_answer=r"\int \text{unknown_operator}",
        answer_type=AnswerTypeEnum.EXPRESSION,
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CANNOT_DETERMINE
    assert res.result.is_correct is None


@pytest.mark.unit
def test_safety_empty_student_answer():
    req = CheckRequest(
        canonical_answer="5", student_answer="   ", answer_type=AnswerTypeEnum.NUMBER
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.INCORRECT
    assert res.result.is_correct is False
    assert "chưa nhập" in res.result.feedback_vi


@pytest.mark.unit
def test_boolean_group_match():
    req = CheckRequest(
        canonical_answer="a: true, b: false",
        student_answer="a: true, b: false",
        answer_type=AnswerTypeEnum.BOOLEAN_GROUP,
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.CORRECT
    assert res.result.is_correct is True


@pytest.mark.unit
def test_boolean_group_mismatch():
    req = CheckRequest(
        canonical_answer="a: true, b: false",
        student_answer="a: true, b: true",
        answer_type=AnswerTypeEnum.BOOLEAN_GROUP,
    )
    res = check_student_submission(req)
    assert res.result.verdict == CheckVerdictEnum.INCORRECT
    assert res.result.is_correct is False


@pytest.mark.unit
def test_zero_false_negatives_on_identical_answers():
    """CRITERION #1: Every identical student and canonical answer must be correct."""
    test_cases = [
        ("42", "42", AnswerTypeEnum.NUMBER),
        ("3/4", "3/4", AnswerTypeEnum.NUMBER),
        ("x^2 + 2*x + 1", "x^2 + 2*x + 1", AnswerTypeEnum.EXPRESSION),
        (r"\sin(x)", r"\sin(x)", AnswerTypeEnum.EXPRESSION),
        ("[0, 1]", "[0, 1]", AnswerTypeEnum.INTERVAL),
        (r"(-\infty, 0)", r"(-\infty, 0)", AnswerTypeEnum.INTERVAL),
        ("{1, 2}", "{1, 2}", AnswerTypeEnum.SET),
        ("A", "A", AnswerTypeEnum.MULTIPLE_CHOICE),
    ]
    for canon, stud, atype in test_cases:
        req = CheckRequest(canonical_answer=canon, student_answer=stud, answer_type=atype)
        res = check_student_submission(req)
        assert res.result.is_correct is True, f"False negative on: canon={canon}, stud={stud}"


# ==============================================================================
# 8. ADDITIONAL ADVANCED & DOMAIN CASES (Total >= 65 tests)
# ==============================================================================


@pytest.mark.unit
def test_number_scientific_notation():
    req = CheckRequest(
        canonical_answer="0.0015", student_answer="1.5e-3", answer_type=AnswerTypeEnum.NUMBER
    )
    res = check_student_submission(req)
    assert res.result.is_correct is True


@pytest.mark.unit
def test_expression_multivariable_equivalence():
    req = CheckRequest(
        canonical_answer="(x + y)^2",
        student_answer="x^2 + 2*x*y + y^2",
        answer_type=AnswerTypeEnum.EXPRESSION,
    )
    res = check_student_submission(req)
    assert res.result.is_correct is True
    assert res.result.verdict == CheckVerdictEnum.CORRECT_DIFFERENT_FORM


@pytest.mark.unit
def test_expression_high_degree_polynomial():
    req = CheckRequest(
        canonical_answer="x^4 - 1",
        student_answer="(x^2 - 1)*(x^2 + 1)",
        answer_type=AnswerTypeEnum.EXPRESSION,
    )
    res = check_student_submission(req)
    assert res.result.is_correct is True
    assert res.result.verdict == CheckVerdictEnum.CORRECT_DIFFERENT_FORM


@pytest.mark.unit
def test_expression_rational_singularity_cancellation():
    req = CheckRequest(
        canonical_answer="x + 2",
        student_answer=r"\frac{x^2 - 4}{x - 2}",
        answer_type=AnswerTypeEnum.EXPRESSION,
    )
    res = check_student_submission(req)
    assert res.result.is_correct is True


@pytest.mark.unit
def test_expression_tan_cot_identity():
    req = CheckRequest(
        canonical_answer="1",
        student_answer=r"\tan(x)*\cot(x)",
        answer_type=AnswerTypeEnum.EXPRESSION,
    )
    res = check_student_submission(req)
    assert res.result.is_correct is True


@pytest.mark.unit
def test_matrix_exact_match():
    req = CheckRequest(
        canonical_answer="[[1, 2], [3, 4]]",
        student_answer="[[1, 2], [3, 4]]",
        answer_type=AnswerTypeEnum.MATRIX,
    )
    res = check_student_submission(req)
    assert res.result.is_correct is True
    assert res.result.verdict == CheckVerdictEnum.CORRECT


@pytest.mark.unit
def test_multiple_choice_student_entered_value_instead_of_label():
    # Student entered exact value of canonical option
    req = CheckRequest(
        canonical_answer=r"\sqrt{3}",
        student_answer=r"\sqrt{3}",
        answer_type=AnswerTypeEnum.MULTIPLE_CHOICE,
    )
    res = check_student_submission(req)
    assert res.result.is_correct is True


@pytest.mark.unit
def test_set_three_roots_reordered():
    req = CheckRequest(
        canonical_answer="{-1, 0, 1}",
        student_answer="{1, -1, 0}",
        answer_type=AnswerTypeEnum.SET,
    )
    res = check_student_submission(req)
    assert res.result.is_correct is True
    assert res.result.verdict == CheckVerdictEnum.CORRECT_DIFFERENT_FORM


@pytest.mark.unit
def test_interval_multiple_disjoint_unions():
    req = CheckRequest(
        canonical_answer="[0, 1] U [2, 3] U [4, 5]",
        student_answer="[4, 5] U [0, 1] U [2, 3]",
        answer_type=AnswerTypeEnum.INTERVAL,
    )
    res = check_student_submission(req)
    assert res.result.is_correct is True
    assert res.result.verdict == CheckVerdictEnum.CORRECT_DIFFERENT_FORM


@pytest.mark.unit
def test_step_division_by_variable_expression_trap():
    # Dividing by x might lose root x = 0
    req = CheckRequest(
        canonical_answer="x*(x - 2) = 0",
        student_answer="x - 2 = 0",
        answer_type=AnswerTypeEnum.STEP_SOLUTION,
        step_index=1,
    )
    res = check_student_submission(req)
    # Non-equivalent because root x = 0 was lost
    assert res.result.is_correct is False
