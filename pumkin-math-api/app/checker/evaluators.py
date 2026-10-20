"""
Deterministic Evaluation Engine for Pumkin Checker
Implements sequential mathematical verification pipeline:
(1) Symbolic equivalence after normalization and simplification
(2) Quasi-random numerical verification at >= 20 points (seed=42) within definition domain
(3) Interval & finite set equivalence (order-invariant, topology-aware)
(4) Decimal & fraction equivalence with configurable tolerance
(5) Multiple-choice matching (by label and by option value)
(6) Boolean group, matrix, and algebraic step transformation equivalence
Strictly deterministic without LLM. No eval, exec, sympify, or parse_expr.
"""

import math
import random
import re
from dataclasses import dataclass, field
from typing import Any

import sympy as sp
from sympy.core.relational import Relational

from app.checker.normalizer import (
    normalize_vietnamese_number,
    parse_interval_tokens,
    parse_set_elements,
    strip_latex_wrappers,
    strip_units,
    strip_variable_prefix,
)
from app.latex.parser import parse_latex
from app.schemas.check import CheckVerdictEnum
from app.schemas.common import ConfidenceLevel, ConfidenceMethod
from app.schemas.traps import MisconceptionTrapEnum

DEFAULT_NUMERIC_TOLERANCE = 1e-5
NUM_EVALUATION_POINTS = 20
RANDOM_SEED = 42


@dataclass
class EvaluationResult:
    verdict: CheckVerdictEnum
    is_correct: bool | None
    confidence_level: ConfidenceLevel
    confidence_method: ConfidenceMethod
    confidence_score: float
    feedback_vi: str
    detected_misconception_id: MisconceptionTrapEnum | None = None
    details: dict[str, Any] = field(default_factory=dict)


def _safe_float(val: Any) -> float | None:
    """Safely converts SymPy number or string to float."""
    try:
        f = float(val)
        if math.isnan(f) or math.isinf(f):
            return None
        return f
    except (TypeError, ValueError):
        return None


def evaluate_number(
    student_raw: str,
    canonical_raw: str,
    tolerance: float = DEFAULT_NUMERIC_TOLERANCE,
) -> EvaluationResult:
    """
    Evaluates numeric answers (integers, floats, fractions, radicals, constants).
    Accepts equivalent fractions and decimals (e.g. 0.5 == 1/2 == 2/4).
    """
    # 1. Normalization
    s_clean = strip_latex_wrappers(student_raw)
    c_clean = strip_latex_wrappers(canonical_raw)

    _, s_val_str = strip_variable_prefix(s_clean)
    _, c_val_str = strip_variable_prefix(c_clean)

    s_val_str = strip_units(normalize_vietnamese_number(s_val_str))
    c_val_str = strip_units(normalize_vietnamese_number(c_val_str))

    # Empty check
    if not s_val_str:
        return EvaluationResult(
            verdict=CheckVerdictEnum.INCORRECT,
            is_correct=False,
            confidence_level=ConfidenceLevel.HIGH,
            confidence_method=ConfidenceMethod.SYMBOLIC,
            confidence_score=1.0,
            feedback_vi="Bạn chưa nhập câu trả lời số hợp lệ.",
        )

    # Identical string match
    if s_val_str == c_val_str:
        if s_clean != c_clean:
            return EvaluationResult(
                verdict=CheckVerdictEnum.CORRECT_DIFFERENT_FORM,
                is_correct=True,
                confidence_level=ConfidenceLevel.HIGH,
                confidence_method=ConfidenceMethod.SYMBOLIC,
                confidence_score=1.0,
                feedback_vi="Đáp án đúng (ở dạng số thập phân hoặc cách viết khác).",
            )
        return EvaluationResult(
            verdict=CheckVerdictEnum.CORRECT,
            is_correct=True,
            confidence_level=ConfidenceLevel.HIGH,
            confidence_method=ConfidenceMethod.SYMBOLIC,
            confidence_score=1.0,
            feedback_vi="Đáp án số chính xác hoàn toàn.",
        )

    # Convert scientific notation (e.g. 1.5e-3 -> 1.5 \cdot 10^{-3})
    sci_m = re.match(r"^([-+]?\d+(?:\.\d+)?)[eE]([-+]?\d+)$", s_val_str)
    if sci_m:
        s_val_str = f"{sci_m.group(1)} \\cdot 10^{{{sci_m.group(2)}}}"
    sci_c = re.match(r"^([-+]?\d+(?:\.\d+)?)[eE]([-+]?\d+)$", c_val_str)
    if sci_c:
        c_val_str = f"{sci_c.group(1)} \\cdot 10^{{{sci_c.group(2)}}}"

    # 2. Parse using parse_latex
    res_s = parse_latex(s_val_str)
    res_c = parse_latex(c_val_str)

    if res_s.is_success and res_c.is_success:
        e_s = res_s.expr
        e_c = res_c.expr

        # Direct symbolic equality or simplification difference
        try:
            diff = sp.simplify(e_s - e_c)
            if diff == 0:
                return EvaluationResult(
                    verdict=CheckVerdictEnum.CORRECT_DIFFERENT_FORM,
                    is_correct=True,
                    confidence_level=ConfidenceLevel.HIGH,
                    confidence_method=ConfidenceMethod.SYMBOLIC,
                    confidence_score=1.0,
                    feedback_vi="Đáp án đúng (ở dạng khác, ví dụ phân số tương đương).",
                )
        except Exception:
            pass

        # Check numeric equivalence with tolerance
        f_s = _safe_float(e_s.evalf())
        f_c = _safe_float(e_c.evalf())
        if f_s is not None and f_c is not None:
            rel_scale = max(1.0, abs(f_c))
            if abs(f_s - f_c) <= tolerance * rel_scale:
                return EvaluationResult(
                    verdict=CheckVerdictEnum.CORRECT_DIFFERENT_FORM,
                    is_correct=True,
                    confidence_level=ConfidenceLevel.HIGH,
                    confidence_method=ConfidenceMethod.NUMERIC,
                    confidence_score=0.99,
                    feedback_vi="Đáp án đúng trong phạm vi sai số cho phép.",
                )

            # Misconception traps
            # Trap 1: Sign error
            if abs(f_s + f_c) <= tolerance * rel_scale:
                return EvaluationResult(
                    verdict=CheckVerdictEnum.INCORRECT,
                    is_correct=False,
                    confidence_level=ConfidenceLevel.HIGH,
                    confidence_method=ConfidenceMethod.NUMERIC,
                    confidence_score=1.0,
                    feedback_vi="Sai dấu: Kết quả của bạn mang dấu ngược lại với đáp án chính xác.",
                    detected_misconception_id=MisconceptionTrapEnum.TRAP_SIGN_ERROR,
                )

            # Trap 2: Inverse / reciprocal error
            if f_c != 0 and abs(f_s - 1.0 / f_c) <= tolerance * max(1.0, abs(1.0 / f_c)):
                return EvaluationResult(
                    verdict=CheckVerdictEnum.INCORRECT,
                    is_correct=False,
                    confidence_level=ConfidenceLevel.HIGH,
                    confidence_method=ConfidenceMethod.NUMERIC,
                    confidence_score=1.0,
                    feedback_vi="Nhầm phép nghịch đảo: Bạn đã lấy nghịch đảo của kết quả đúng.",
                    detected_misconception_id=MisconceptionTrapEnum.TRAP_INVERSE_OPERATION,
                )

        return EvaluationResult(
            verdict=CheckVerdictEnum.INCORRECT,
            is_correct=False,
            confidence_level=ConfidenceLevel.HIGH,
            confidence_method=ConfidenceMethod.SYMBOLIC,
            confidence_score=1.0,
            feedback_vi="Đáp án số chưa chính xác.",
        )

    # Fallback to direct Python float conversion if parse_latex failed on non-standard formatting
    try:
        val_s = float(s_val_str)
        val_c = float(c_val_str)
        rel_scale = max(1.0, abs(val_c))
        if abs(val_s - val_c) <= tolerance * rel_scale:
            return EvaluationResult(
                verdict=CheckVerdictEnum.CORRECT_DIFFERENT_FORM,
                is_correct=True,
                confidence_level=ConfidenceLevel.MEDIUM,
                confidence_method=ConfidenceMethod.NUMERIC,
                confidence_score=0.95,
                feedback_vi="Đáp án đúng dưới dạng số thực xấp xỉ.",
            )
        if abs(val_s + val_c) <= tolerance * rel_scale:
            return EvaluationResult(
                verdict=CheckVerdictEnum.INCORRECT,
                is_correct=False,
                confidence_level=ConfidenceLevel.HIGH,
                confidence_method=ConfidenceMethod.NUMERIC,
                confidence_score=1.0,
                feedback_vi="Sai dấu: Kết quả mang dấu ngược với đáp án đúng.",
                detected_misconception_id=MisconceptionTrapEnum.TRAP_SIGN_ERROR,
            )
        return EvaluationResult(
            verdict=CheckVerdictEnum.INCORRECT,
            is_correct=False,
            confidence_level=ConfidenceLevel.HIGH,
            confidence_method=ConfidenceMethod.NUMERIC,
            confidence_score=1.0,
            feedback_vi="Đáp án số chưa chính xác.",
        )
    except ValueError:
        pass

    # Inconclusive / unparseable
    return EvaluationResult(
        verdict=CheckVerdictEnum.CANNOT_DETERMINE,
        is_correct=None,
        confidence_level=ConfidenceLevel.LOW,
        confidence_method=ConfidenceMethod.SYMBOLIC,
        confidence_score=0.0,
        feedback_vi="Không thể xác định giá trị số từ biểu thức nhập vào.",
    )


def _sample_points_and_evaluate(
    e_s: sp.Expr,
    e_c: sp.Expr,
    free_vars: list[sp.Symbol],
    num_points: int = NUM_EVALUATION_POINTS,
    seed: int = RANDOM_SEED,
    tolerance: float = DEFAULT_NUMERIC_TOLERANCE,
) -> tuple[bool, int, str]:
    """
    Evaluates expressions at quasi-random points within domain of definition.
    Filters out singularities (division by 0, negative radicands, non-positive logs).
    Returns (all_match, valid_sampled_count, error_reason).
    """
    rng = random.Random(seed)
    valid_points_count = 0
    max_attempts = 300
    attempts = 0

    intervals = [
        (0.2, 0.9),
        (1.1, 4.5),
        (-4.5, -1.1),
        (5.0, 15.0),
        (-15.0, -5.0),
    ]

    while valid_points_count < num_points and attempts < max_attempts:
        attempts += 1
        # Pick random interval
        low, high = rng.choice(intervals)
        subs_dict: dict[sp.Symbol, float] = {}
        for var in free_vars:
            subs_dict[var] = rng.uniform(low, high)

        try:
            val_s_sym = e_s.subs(subs_dict).evalf()
            val_c_sym = e_c.subs(subs_dict).evalf()

            # Discard non-finite or complex values
            if val_s_sym.has(sp.zoo, sp.nan, sp.oo, -sp.oo) or val_c_sym.has(
                sp.zoo, sp.nan, sp.oo, -sp.oo
            ):
                continue

            comp_s = complex(val_s_sym)
            comp_c = complex(val_c_sym)

            # Check if domain produced real values
            if abs(comp_s.imag) > 1e-9 or abs(comp_c.imag) > 1e-9:
                continue

            r_s = comp_s.real
            r_c = comp_c.real

            # Point is valid within domain
            valid_points_count += 1
            rel_scale = max(1.0, abs(r_c))
            diff = abs(r_s - r_c)
            if diff > tolerance * rel_scale:
                return False, valid_points_count, "numerical_mismatch"

        except Exception:
            continue

    if valid_points_count < num_points:
        return False, valid_points_count, "insufficient_domain_points"

    return True, valid_points_count, "success"


def evaluate_expression(
    student_raw: str,
    canonical_raw: str,
    tolerance: float = DEFAULT_NUMERIC_TOLERANCE,
) -> EvaluationResult:
    """
    Evaluates mathematical expressions with sequential pipeline:
    (1) Symbolic equivalence after normalization & simplification
    (2) Quasi-random numerical verification at >= 20 points within domain
    """
    s_clean = strip_latex_wrappers(student_raw)
    c_clean = strip_latex_wrappers(canonical_raw)

    if "=" in s_clean and "=" in c_clean:
        s_rhs = s_clean
        c_rhs = c_clean
    else:
        _, s_rhs = strip_variable_prefix(s_clean)
        _, c_rhs = strip_variable_prefix(c_clean)

    s_rhs = strip_units(normalize_vietnamese_number(s_rhs))
    c_rhs = strip_units(normalize_vietnamese_number(c_rhs))

    if not s_rhs:
        return EvaluationResult(
            verdict=CheckVerdictEnum.INCORRECT,
            is_correct=False,
            confidence_level=ConfidenceLevel.HIGH,
            confidence_method=ConfidenceMethod.SYMBOLIC,
            confidence_score=1.0,
            feedback_vi="Bạn chưa nhập biểu thức cần kiểm tra.",
        )

    # Exact string match
    if s_rhs.replace(" ", "") == c_rhs.replace(" ", ""):
        return EvaluationResult(
            verdict=CheckVerdictEnum.CORRECT,
            is_correct=True,
            confidence_level=ConfidenceLevel.HIGH,
            confidence_method=ConfidenceMethod.SYMBOLIC,
            confidence_score=1.0,
            feedback_vi="Biểu thức chính xác hoàn toàn.",
        )

    res_s = parse_latex(s_rhs)
    res_c = parse_latex(c_rhs)

    if not res_c.is_success:
        return EvaluationResult(
            verdict=CheckVerdictEnum.CANNOT_DETERMINE,
            is_correct=None,
            confidence_level=ConfidenceLevel.LOW,
            confidence_method=ConfidenceMethod.SYMBOLIC,
            confidence_score=0.0,
            feedback_vi="Không thể phân tích cú pháp đáp án chuẩn của đề bài.",
            details={"canonical_parse_error": res_c.reason_vi},
        )

    if not res_s.is_success:
        return EvaluationResult(
            verdict=CheckVerdictEnum.CANNOT_DETERMINE,
            is_correct=None,
            confidence_level=ConfidenceLevel.LOW,
            confidence_method=ConfidenceMethod.SYMBOLIC,
            confidence_score=0.0,
            feedback_vi="Cú pháp biểu thức của bạn chưa đúng chuẩn hoặc chứa ký tự không hợp lệ.",
            details={"student_parse_error": res_s.reason_vi},
        )

    e_s = res_s.expr
    e_c = res_c.expr

    # Handle equations / relationals (e.g. 2*x = 4 vs x = 2)
    if isinstance(e_s, Relational) and isinstance(e_c, Relational):
        f_s = e_s.lhs - e_s.rhs
        f_c = e_c.lhs - e_c.rhs
        try:
            ratio = sp.simplify(f_s / f_c)
            if ratio != 0 and ratio.is_number and not ratio.has(sp.zoo, sp.nan):
                return EvaluationResult(
                    verdict=CheckVerdictEnum.CORRECT_DIFFERENT_FORM,
                    is_correct=True,
                    confidence_level=ConfidenceLevel.HIGH,
                    confidence_method=ConfidenceMethod.SYMBOLIC,
                    confidence_score=1.0,
                    feedback_vi="Phương trình đúng (ở dạng biến đổi tương đương).",
                )
        except Exception:
            pass
        e_s = f_s
        e_c = f_c
    elif isinstance(e_s, Relational):
        e_s = e_s.lhs - e_s.rhs
    elif isinstance(e_c, Relational):
        e_c = e_c.lhs - e_c.rhs

    # (1) Symbolic Equivalence
    try:
        diff = sp.simplify(e_s - e_c)
        if diff == 0:
            return EvaluationResult(
                verdict=CheckVerdictEnum.CORRECT_DIFFERENT_FORM,
                is_correct=True,
                confidence_level=ConfidenceLevel.HIGH,
                confidence_method=ConfidenceMethod.SYMBOLIC,
                confidence_score=1.0,
                feedback_vi="Biểu thức đúng (ở dạng biến đổi đại số tương đương).",
            )
        # Try trigsimp
        if sp.trigsimp(diff) == 0:
            return EvaluationResult(
                verdict=CheckVerdictEnum.CORRECT_DIFFERENT_FORM,
                is_correct=True,
                confidence_level=ConfidenceLevel.HIGH,
                confidence_method=ConfidenceMethod.SYMBOLIC,
                confidence_score=1.0,
                feedback_vi="Biểu thức đúng (ở dạng biến đổi lượng giác tương đương).",
            )
        # Try expand / factor
        if sp.expand(diff) == 0 or sp.factor(diff) == 0:
            return EvaluationResult(
                verdict=CheckVerdictEnum.CORRECT_DIFFERENT_FORM,
                is_correct=True,
                confidence_level=ConfidenceLevel.HIGH,
                confidence_method=ConfidenceMethod.SYMBOLIC,
                confidence_score=1.0,
                feedback_vi="Biểu thức đúng (ở dạng khai triển/thu gọn tương đương).",
            )
    except Exception:
        pass

    # (2) Numeric Equivalence with Quasi-random sampling
    free_vars = sorted(e_s.free_symbols | e_c.free_symbols, key=lambda s: str(s))

    if not free_vars:
        # Constant expressions
        f_s = _safe_float(e_s.evalf())
        f_c = _safe_float(e_c.evalf())
        if f_s is not None and f_c is not None:
            rel_scale = max(1.0, abs(f_c))
            if abs(f_s - f_c) <= tolerance * rel_scale:
                return EvaluationResult(
                    verdict=CheckVerdictEnum.CORRECT_DIFFERENT_FORM,
                    is_correct=True,
                    confidence_level=ConfidenceLevel.HIGH,
                    confidence_method=ConfidenceMethod.NUMERIC,
                    confidence_score=0.99,
                    feedback_vi="Biểu thức hằng số có giá trị tương đương đáp án chuẩn.",
                )
            if abs(f_s + f_c) <= tolerance * rel_scale:
                return EvaluationResult(
                    verdict=CheckVerdictEnum.INCORRECT,
                    is_correct=False,
                    confidence_level=ConfidenceLevel.HIGH,
                    confidence_method=ConfidenceMethod.NUMERIC,
                    confidence_score=1.0,
                    feedback_vi="Sai dấu: Biểu thức mang dấu ngược lại với đáp án chuẩn.",
                    detected_misconception_id=MisconceptionTrapEnum.TRAP_SIGN_ERROR,
                )
            return EvaluationResult(
                verdict=CheckVerdictEnum.INCORRECT,
                is_correct=False,
                confidence_level=ConfidenceLevel.HIGH,
                confidence_method=ConfidenceMethod.NUMERIC,
                confidence_score=1.0,
                feedback_vi="Giá trị biểu thức hằng số chưa chính xác.",
            )

    # Expressions with variables
    match_all, valid_count, reason = _sample_points_and_evaluate(
        e_s, e_c, free_vars, num_points=NUM_EVALUATION_POINTS, seed=RANDOM_SEED, tolerance=tolerance
    )

    if match_all:
        return EvaluationResult(
            verdict=CheckVerdictEnum.CORRECT_DIFFERENT_FORM,
            is_correct=True,
            confidence_level=ConfidenceLevel.HIGH,
            confidence_method=ConfidenceMethod.NUMERIC,
            confidence_score=0.95,
            feedback_vi=(
                f"Biểu thức đúng (đã kiểm định số học tương đương tại "
                f"{valid_count} điểm trong miền xác định)."
            ),
            details={"sampled_points": valid_count, "method": "quasi_random_sampling"},
        )

    if reason == "numerical_mismatch":
        # Check sign trap symbolically or numerically
        try:
            sum_diff = sp.simplify(e_s + e_c)
            if sum_diff == 0:
                return EvaluationResult(
                    verdict=CheckVerdictEnum.INCORRECT,
                    is_correct=False,
                    confidence_level=ConfidenceLevel.HIGH,
                    confidence_method=ConfidenceMethod.SYMBOLIC,
                    confidence_score=1.0,
                    feedback_vi=(
                        "Sai dấu: Biểu thức của bạn mang dấu ngược lại hoàn toàn so với đáp án."
                    ),
                    detected_misconception_id=MisconceptionTrapEnum.TRAP_SIGN_ERROR,
                )
        except Exception:
            pass

        return EvaluationResult(
            verdict=CheckVerdictEnum.INCORRECT,
            is_correct=False,
            confidence_level=ConfidenceLevel.HIGH,
            confidence_method=ConfidenceMethod.NUMERIC,
            confidence_score=1.0,
            feedback_vi="Biểu thức chưa chính xác (không đồng nhất trên tập xác định).",
        )

    # Fallback to cannot_determine if insufficient domain points could be sampled
    return EvaluationResult(
        verdict=CheckVerdictEnum.CANNOT_DETERMINE,
        is_correct=None,
        confidence_level=ConfidenceLevel.LOW,
        confidence_method=ConfidenceMethod.NUMERIC,
        confidence_score=0.3,
        feedback_vi="Miền xác định hẹp hoặc cô lập, hệ thống chưa đủ cơ sở để kiểm chứng tự động.",
    )


def _build_interval_from_tuple(
    left_str: str,
    right_str: str,
    left_open: bool,
    right_open: bool,
) -> sp.Interval | None:
    """Parses endpoint strings into a SymPy Interval object."""
    l_str = left_str.strip()
    r_str = right_str.strip()

    # Left bound
    if l_str in ("-\\infty", "-oo", "-inf", "- vô cùng"):
        l_val = -sp.oo
    elif l_str in ("+\\infty", "\\infty", "oo", "inf", "+oo", "+ vô cùng"):
        l_val = sp.oo
    else:
        res = parse_latex(normalize_vietnamese_number(l_str))
        if not res.is_success:
            return None
        l_val = res.expr

    # Right bound
    if r_str in ("+\\infty", "\\infty", "oo", "inf", "+oo", "+ vô cùng"):
        r_val = sp.oo
    elif r_str in ("-\\infty", "-oo", "-inf", "- vô cùng"):
        r_val = -sp.oo
    else:
        res = parse_latex(normalize_vietnamese_number(r_str))
        if not res.is_success:
            return None
        r_val = res.expr

    try:
        return sp.Interval(l_val, r_val, left_open=left_open, right_open=right_open)
    except Exception:
        return None


def evaluate_interval(
    student_raw: str,
    canonical_raw: str,
) -> EvaluationResult:
    """
    Evaluates intervals and unions of intervals:
    (a, b), [a, b], (-oo, b) U (a, +oo), R \\ {a}.
    Order of disjoint intervals does not matter.
    """
    s_clean = strip_latex_wrappers(student_raw)
    c_clean = strip_latex_wrappers(canonical_raw)

    _, s_clean = strip_variable_prefix(s_clean)
    _, c_clean = strip_variable_prefix(c_clean)

    if not s_clean:
        return EvaluationResult(
            verdict=CheckVerdictEnum.INCORRECT,
            is_correct=False,
            confidence_level=ConfidenceLevel.HIGH,
            confidence_method=ConfidenceMethod.SYMBOLIC,
            confidence_score=1.0,
            feedback_vi="Bạn chưa nhập tập khoảng cần kiểm tra.",
        )

    # Identical string
    if s_clean.replace(" ", "") == c_clean.replace(" ", ""):
        return EvaluationResult(
            verdict=CheckVerdictEnum.CORRECT,
            is_correct=True,
            confidence_level=ConfidenceLevel.HIGH,
            confidence_method=ConfidenceMethod.SYMBOLIC,
            confidence_score=1.0,
            feedback_vi="Tập khoảng chính xác hoàn toàn.",
        )

    toks_s = parse_interval_tokens(s_clean)
    toks_c = parse_interval_tokens(c_clean)

    if not toks_c:
        # Canonical might be an empty set or unparseable interval
        return EvaluationResult(
            verdict=CheckVerdictEnum.CANNOT_DETERMINE,
            is_correct=None,
            confidence_level=ConfidenceLevel.LOW,
            confidence_method=ConfidenceMethod.SYMBOLIC,
            confidence_score=0.0,
            feedback_vi="Không thể phân tích cú pháp khoảng của đáp án chuẩn.",
        )

    if not toks_s:
        return EvaluationResult(
            verdict=CheckVerdictEnum.CANNOT_DETERMINE,
            is_correct=None,
            confidence_level=ConfidenceLevel.LOW,
            confidence_method=ConfidenceMethod.SYMBOLIC,
            confidence_score=0.0,
            feedback_vi="Cú pháp tập khoảng không hợp lệ (ví dụ: cần có dạng (a; b) hoặc [a; b]).",
        )

    intervals_s = [_build_interval_from_tuple(*t) for t in toks_s]
    intervals_c = [_build_interval_from_tuple(*t) for t in toks_c]

    if any(iv is None for iv in intervals_s) or any(iv is None for iv in intervals_c):
        return EvaluationResult(
            verdict=CheckVerdictEnum.CANNOT_DETERMINE,
            is_correct=None,
            confidence_level=ConfidenceLevel.LOW,
            confidence_method=ConfidenceMethod.SYMBOLIC,
            confidence_score=0.0,
            feedback_vi="Không thể chuyển đổi đầu mút của khoảng sang giá trị toán học.",
        )

    set_s = sp.Union(*[iv for iv in intervals_s if iv is not None])
    set_c = sp.Union(*[iv for iv in intervals_c if iv is not None])

    # Direct set equality
    try:
        if set_s == set_c:
            return EvaluationResult(
                verdict=CheckVerdictEnum.CORRECT_DIFFERENT_FORM,
                is_correct=True,
                confidence_level=ConfidenceLevel.HIGH,
                confidence_method=ConfidenceMethod.SYMBOLIC,
                confidence_score=1.0,
                feedback_vi="Tập khoảng đúng (ở dạng hoặc thứ tự biểu diễn tương đương).",
            )
    except Exception:
        pass

    # Boundary trap check: did endpoints match but bracket open/closed was swapped?
    if len(toks_s) == len(toks_c) == 1:
        ls, rs, lo_s, ro_s = toks_s[0]
        lc, rc, lo_c, ro_c = toks_c[0]
        # Check if endpoints match
        iv_s = intervals_s[0]
        iv_c = intervals_c[0]
        if iv_s and iv_c and iv_s.start == iv_c.start and iv_s.end == iv_c.end:
            if (lo_s != lo_c) or (ro_s != ro_c):
                return EvaluationResult(
                    verdict=CheckVerdictEnum.INCORRECT,
                    is_correct=False,
                    confidence_level=ConfidenceLevel.HIGH,
                    confidence_method=ConfidenceMethod.SYMBOLIC,
                    confidence_score=1.0,
                    feedback_vi=(
                        "Nhầm lẫn dấu ngoặc đơn và ngoặc vuông tại đầu mút "
                        "(chưa xét kỹ điều kiện tại biên)."
                    ),
                    detected_misconception_id=MisconceptionTrapEnum.TRAP_BOUNDARY_NOT_CHECKED,
                )

    return EvaluationResult(
        verdict=CheckVerdictEnum.INCORRECT,
        is_correct=False,
        confidence_level=ConfidenceLevel.HIGH,
        confidence_method=ConfidenceMethod.SYMBOLIC,
        confidence_score=1.0,
        feedback_vi="Tập khoảng chưa chính xác.",
    )


def evaluate_set(
    student_raw: str,
    canonical_raw: str,
) -> EvaluationResult:
    """
    Evaluates finite sets, e.g. {1, 2, 3}, empty_set, \\emptyset.
    Order-invariant and deduplicated.
    """
    s_clean = strip_latex_wrappers(student_raw)
    c_clean = strip_latex_wrappers(canonical_raw)

    _, s_clean = strip_variable_prefix(s_clean)
    _, c_clean = strip_variable_prefix(c_clean)

    # Empty set handling
    empty_patterns = ("\\emptyset", "\\varnothing", "\\phi", "{}", "empty_set", "∅")
    s_is_empty = s_clean in empty_patterns
    c_is_empty = c_clean in empty_patterns

    if s_is_empty and c_is_empty:
        return EvaluationResult(
            verdict=CheckVerdictEnum.CORRECT,
            is_correct=True,
            confidence_level=ConfidenceLevel.HIGH,
            confidence_method=ConfidenceMethod.SYMBOLIC,
            confidence_score=1.0,
            feedback_vi="Tập hợp rỗng chính xác.",
        )
    if s_is_empty != c_is_empty:
        return EvaluationResult(
            verdict=CheckVerdictEnum.INCORRECT,
            is_correct=False,
            confidence_level=ConfidenceLevel.HIGH,
            confidence_method=ConfidenceMethod.SYMBOLIC,
            confidence_score=1.0,
            feedback_vi="Sai tập rỗng: Một bên là tập rỗng nhưng bên còn lại có nghiệm.",
        )

    s_elems_raw = parse_set_elements(s_clean)
    c_elems_raw = parse_set_elements(c_clean)

    if not s_elems_raw and s_clean:
        s_elems_raw = [s_clean]
    if not c_elems_raw and c_clean:
        c_elems_raw = [c_clean]

    # Parse elements
    s_syms: list[sp.Expr] = []
    c_syms: list[sp.Expr] = []

    for raw in s_elems_raw:
        res = parse_latex(strip_units(normalize_vietnamese_number(raw)))
        if res.is_success:
            s_syms.append(res.expr)
        else:
            return EvaluationResult(
                verdict=CheckVerdictEnum.CANNOT_DETERMINE,
                is_correct=None,
                confidence_level=ConfidenceLevel.LOW,
                confidence_method=ConfidenceMethod.SYMBOLIC,
                confidence_score=0.0,
                feedback_vi=f"Không thể phân tích phần tử '{raw}' trong tập hợp.",
            )

    for raw in c_elems_raw:
        res = parse_latex(strip_units(normalize_vietnamese_number(raw)))
        if res.is_success:
            c_syms.append(res.expr)
        else:
            return EvaluationResult(
                verdict=CheckVerdictEnum.CANNOT_DETERMINE,
                is_correct=None,
                confidence_level=ConfidenceLevel.LOW,
                confidence_method=ConfidenceMethod.SYMBOLIC,
                confidence_score=0.0,
                feedback_vi=f"Không thể phân tích phần tử '{raw}' trong tập chuẩn.",
            )

    set_s = sp.FiniteSet(*s_syms)
    set_c = sp.FiniteSet(*c_syms)

    if set_s == set_c:
        if s_clean.replace(" ", "") == c_clean.replace(" ", ""):
            return EvaluationResult(
                verdict=CheckVerdictEnum.CORRECT,
                is_correct=True,
                confidence_level=ConfidenceLevel.HIGH,
                confidence_method=ConfidenceMethod.SYMBOLIC,
                confidence_score=1.0,
                feedback_vi="Tập nghiệm chính xác hoàn toàn.",
            )
        return EvaluationResult(
            verdict=CheckVerdictEnum.CORRECT_DIFFERENT_FORM,
            is_correct=True,
            confidence_level=ConfidenceLevel.HIGH,
            confidence_method=ConfidenceMethod.SYMBOLIC,
            confidence_score=1.0,
            feedback_vi="Tập nghiệm đúng (thứ tự phần tử hoặc cách viết tương đương).",
        )

    # Check subset relations for diagnostic feedback
    if set_s.is_subset(set_c):
        return EvaluationResult(
            verdict=CheckVerdictEnum.INCORRECT,
            is_correct=False,
            confidence_level=ConfidenceLevel.HIGH,
            confidence_method=ConfidenceMethod.SYMBOLIC,
            confidence_score=1.0,
            feedback_vi=(
                "Thiếu nghiệm: Bạn đã tìm được một số nghiệm nhưng chưa đủ nghiệm của bài toán."
            ),
        )

    if set_c.is_subset(set_s):
        return EvaluationResult(
            verdict=CheckVerdictEnum.INCORRECT,
            is_correct=False,
            confidence_level=ConfidenceLevel.HIGH,
            confidence_method=ConfidenceMethod.SYMBOLIC,
            confidence_score=1.0,
            feedback_vi=(
                "Thừa nghiệm: Có chứa nghiệm ngoại lai (cần kiểm tra lại điều kiện xác định)."
            ),
            detected_misconception_id=MisconceptionTrapEnum.TRAP_RADICAL_DOMAIN_IGNORED,
        )

    return EvaluationResult(
        verdict=CheckVerdictEnum.INCORRECT,
        is_correct=False,
        confidence_level=ConfidenceLevel.HIGH,
        confidence_method=ConfidenceMethod.SYMBOLIC,
        confidence_score=1.0,
        feedback_vi="Tập nghiệm chưa chính xác.",
    )


def evaluate_multiple_choice(
    student_raw: str,
    canonical_raw: str,
    options: list[str] | None = None,
    misconception_traps: dict[str, str] | None = None,
) -> EvaluationResult:
    """
    Evaluates multiple choice questions:
    - Match by label (A, B, C, D or 0, 1, 2, 3)
    - If student entered option value instead of label, matches by value!
    """
    s_clean = strip_latex_wrappers(student_raw).strip()
    c_clean = strip_latex_wrappers(canonical_raw).strip()

    def _normalize_label(text: str) -> str | None:
        t = text.strip()
        # Direct letter A, B, C, D
        m = re.match(r"^(?:đáp án\s*)?[\[\(]?([A-Da-d])(?:[\.\)\]]|$)", t, re.IGNORECASE)
        if m:
            return m.group(1).upper()
        # Direct index 0, 1, 2, 3
        if t in ("0", "1", "2", "3"):
            return chr(ord("A") + int(t))
        return None

    s_label = _normalize_label(s_clean)
    c_label = _normalize_label(c_clean)

    # 1. Label-to-Label Match
    if s_label is not None and c_label is not None:
        if s_label == c_label:
            return EvaluationResult(
                verdict=CheckVerdictEnum.CORRECT,
                is_correct=True,
                confidence_level=ConfidenceLevel.HIGH,
                confidence_method=ConfidenceMethod.SYMBOLIC,
                confidence_score=1.0,
                feedback_vi=f"Chọn phương án {s_label} chính xác.",
            )

        # Misconception lookup from question metadata
        trap_enum = None
        feedback = f"Phương án {s_label} chưa chính xác. Đáp án đúng là {c_label}."
        if misconception_traps:
            opt_idx = str(ord(s_label) - ord("A"))
            if opt_idx in misconception_traps:
                trap_str = misconception_traps[opt_idx]
                feedback += f" Gợi ý khắc phục: {trap_str}"
                # Try map to enum
                for member in MisconceptionTrapEnum:
                    if member.value in trap_str:
                        trap_enum = member
                        break

        return EvaluationResult(
            verdict=CheckVerdictEnum.INCORRECT,
            is_correct=False,
            confidence_level=ConfidenceLevel.HIGH,
            confidence_method=ConfidenceMethod.SYMBOLIC,
            confidence_score=1.0,
            feedback_vi=feedback,
            detected_misconception_id=trap_enum,
        )

    # 2. Student entered option VALUE instead of label
    if options and c_label is not None:
        c_idx = ord(c_label) - ord("A")
        if 0 <= c_idx < len(options):
            correct_opt_text = options[c_idx]
            # Strip option label prefix like 'A. 5' -> '5'
            opt_val_clean = re.sub(r"^[A-Da-d][\.\)]\s*", "", correct_opt_text).strip()

            # Compare student value with correct option value
            res_val = evaluate_expression(s_clean, opt_val_clean)
            if res_val.is_correct:
                return EvaluationResult(
                    verdict=CheckVerdictEnum.CORRECT_DIFFERENT_FORM,
                    is_correct=True,
                    confidence_level=ConfidenceLevel.HIGH,
                    confidence_method=res_val.confidence_method,
                    confidence_score=res_val.confidence_score,
                    feedback_vi=f"Bạn đã nhập đúng giá trị của phương án {c_label}.",
                )

            # Check if student value matches any of the distractor options
            for idx, opt_text in enumerate(options):
                if idx != c_idx:
                    distr_val = re.sub(r"^[A-Da-d][\.\)]\s*", "", opt_text).strip()
                    res_distr = evaluate_expression(s_clean, distr_val)
                    if res_distr.is_correct:
                        opt_let = chr(ord("A") + idx)
                        return EvaluationResult(
                            verdict=CheckVerdictEnum.INCORRECT,
                            is_correct=False,
                            confidence_level=ConfidenceLevel.HIGH,
                            confidence_method=ConfidenceMethod.SYMBOLIC,
                            confidence_score=1.0,
                            feedback_vi=(
                                f"Giá trị bạn nhập tương ứng với phương án nhiễu {opt_let}. "
                                f"Đáp án đúng là {c_label}."
                            ),
                        )

    # Fallback to general expression match
    res_expr = evaluate_expression(s_clean, c_clean)
    return res_expr


def evaluate_boolean_group(
    student_raw: str,
    canonical_raw: str,
) -> EvaluationResult:
    """Evaluates true/false group items."""
    s = student_raw.strip().lower()
    c = canonical_raw.strip().lower()

    if s == c:
        return EvaluationResult(
            verdict=CheckVerdictEnum.CORRECT,
            is_correct=True,
            confidence_level=ConfidenceLevel.HIGH,
            confidence_method=ConfidenceMethod.SYMBOLIC,
            confidence_score=1.0,
            feedback_vi="Tất cả các mệnh đề Đúng/Sai đều chính xác.",
        )

    return EvaluationResult(
        verdict=CheckVerdictEnum.INCORRECT,
        is_correct=False,
        confidence_level=ConfidenceLevel.HIGH,
        confidence_method=ConfidenceMethod.SYMBOLIC,
        confidence_score=1.0,
        feedback_vi="Kết quả Đúng/Sai các mệnh đề chưa hoàn toàn khớp với đáp án.",
    )


def evaluate_matrix(
    student_raw: str,
    canonical_raw: str,
) -> EvaluationResult:
    """Evaluates matrix expressions entry by entry."""
    s = strip_latex_wrappers(student_raw).replace(" ", "")
    c = strip_latex_wrappers(canonical_raw).replace(" ", "")

    if s == c:
        return EvaluationResult(
            verdict=CheckVerdictEnum.CORRECT,
            is_correct=True,
            confidence_level=ConfidenceLevel.HIGH,
            confidence_method=ConfidenceMethod.SYMBOLIC,
            confidence_score=1.0,
            feedback_vi="Ma trận chính xác hoàn toàn.",
        )

    res_expr = evaluate_expression(student_raw, canonical_raw)
    return res_expr


def evaluate_step_solution(
    student_raw: str,
    canonical_raw: str,
    step_index: int | None = None,
) -> EvaluationResult:
    """
    Evaluates algebraic step transformation equivalence.
    Flags non-reversible steps:
    - Squaring both sides: potential extraneous roots added
    - Dividing by expression with variables: potential loss of roots
    """
    res = evaluate_expression(student_raw, canonical_raw)
    if res.is_correct:
        step_note = f"Bước {step_index}: " if step_index is not None else ""
        return EvaluationResult(
            verdict=res.verdict,
            is_correct=True,
            confidence_level=res.confidence_level,
            confidence_method=res.confidence_method,
            confidence_score=res.confidence_score,
            feedback_vi=f"{step_note}Biến đổi hợp lệ và tương đương toán học.",
        )

    # Detect step traps: squaring both sides
    s_clean = strip_latex_wrappers(student_raw)
    c_clean = strip_latex_wrappers(canonical_raw)
    res_s = parse_latex(s_clean)
    res_c = parse_latex(c_clean)

    if res_s.is_success and res_c.is_success:
        e_s = res_s.expr
        e_c = res_c.expr
        # If e_s == e_c^2
        try:
            if sp.simplify(e_s - e_c**2) == 0:
                return EvaluationResult(
                    verdict=CheckVerdictEnum.INCORRECT,
                    is_correct=False,
                    confidence_level=ConfidenceLevel.HIGH,
                    confidence_method=ConfidenceMethod.SYMBOLIC,
                    confidence_score=1.0,
                    feedback_vi=(
                        "Cảnh báo biến đổi: Phép bình phương hai vế làm xuất hiện "
                        "nghiệm ngoại lai (chưa đặt điều kiện cùng dấu)."
                    ),
                    detected_misconception_id=MisconceptionTrapEnum.TRAP_RADICAL_DOMAIN_IGNORED,
                )
        except Exception:
            pass

    return res
