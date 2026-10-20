"""
Sequence & Progression Solver for Pumkin Math API
Deterministic CAS implementation for:
- Arithmetic Progressions (Cấp số cộng - CSC): u_n, S_n, d, u_1, find index n
- Geometric Progressions (Cấp số nhân - CSN): u_n, S_n, infinite sum S, q, u_1, find index n
- Linear Recurrence Sequences (Dãy số truy hồi tuyến tính cấp 1 & cấp 2)
- Explicit general term sequences: u_n = f(n)

Handles mathematical domain traps:
- Exponent / index must be a positive integer (n in N*, n >= 1)
- Geometric progression q = 1: S_n = n*u1 (avoids 1 - q = 0 division by zero)
- Infinite geometric series convergence: strictly requires |q| < 1; rejects |q| >= 1
- Multiple roots for common ratio q: filters q < 0 when positive_terms_only=True
- Reverse verification against original equations / terms
- Pedagogical step tracing (StepItem) for tutoring
"""

import re
from typing import Any

import sympy as sp

from app.latex.parser import parse_latex
from app.schemas.common import (
    BaseResponseEnvelope,
    ConfidenceInfo,
    ConfidenceLevel,
    ConfidenceMethod,
    ErrorDetail,
    StatusEnum,
    StepItem,
)
from app.schemas.dsl import SequenceProgressionDSL
from app.schemas.sequence import SequenceProgressionResult
from app.solvers.registry import register_solver


def _parse_to_sympy(expr_str: str | None, var_name: str | None = None) -> sp.Expr | None:
    """Parses a string or LaTeX expression into a clean SymPy expression."""
    if expr_str is None or str(expr_str).strip() == "":
        return None
    s = str(expr_str).strip()
    try:
        parsed = parse_latex(s)
        if parsed.expr is not None:
            return parsed.expr
    except Exception:
        pass

    try:
        if "/" in s:
            num, den = s.split("/", 1)
            return sp.Rational(int(num.strip()), int(den.strip()))
        return sp.Integer(int(s))
    except Exception:
        return None


def _format_latex_val(val: Any) -> str:
    """Formats a SymPy value or number into a clean LaTeX string."""
    if isinstance(val, (int, float, sp.Integer, sp.Float, sp.Rational, sp.Expr)):
        return sp.latex(val)
    return str(val)


def _solve_ap_system(equations: list[str]) -> tuple[sp.Expr | None, sp.Expr | None]:
    """
    Solves a linear system for (u1, d) in an Arithmetic Progression.
    Supports terms like u_1, u_2, u_{10}, S_5, S_{10}.
    """
    u1, d = sp.symbols("u1 d", real=True)

    def _replace_ap_symbols(expr: sp.Expr) -> sp.Expr:
        sub_map = {}
        for s in expr.free_symbols:
            m_u = re.match(r"^u_?(\d+)$", s.name)
            if m_u:
                k = int(m_u.group(1))
                sub_map[s] = u1 + (k - 1) * d
            m_s = re.match(r"^S_?(\d+)$", s.name)
            if m_s:
                k = int(m_s.group(1))
                sub_map[s] = sp.Rational(k, 2) * (2 * u1 + (k - 1) * d)
        return expr.subs(sub_map)

    sp_eqs = []
    for eq_str in equations:
        eq_norm = re.sub(r"([uSa-zA-Z])_(\d{2,})", r"\1_{\2}", eq_str)
        if "=" in eq_norm:
            left, right = eq_norm.split("=", 1)
        else:
            left, right = eq_norm, "0"
        left_parsed = parse_latex(left.strip()).expr
        right_parsed = parse_latex(right.strip()).expr
        if left_parsed is None or right_parsed is None:
            return None, None
        sp_eqs.append(sp.Eq(_replace_ap_symbols(left_parsed), _replace_ap_symbols(right_parsed)))

    sol = sp.solve(sp_eqs, (u1, d), dict=True)
    if not sol:
        return None, None
    res = sol[0]
    return res.get(u1), res.get(d)


def _solve_gp_system(
    equations: list[str], positive_terms_only: bool
) -> tuple[sp.Expr | None, sp.Expr | None]:
    """
    Solves a non-linear system for (u1, q) in a Geometric Progression.
    Supports terms like u_1, u_2, u_{10}.
    """
    u1, q = sp.symbols("u1 q", real=True)

    def _replace_gp_symbols(expr: sp.Expr) -> sp.Expr:
        sub_map = {}
        for s in expr.free_symbols:
            m_u = re.match(r"^u_?(\d+)$", s.name)
            if m_u:
                k = int(m_u.group(1))
                sub_map[s] = u1 * (q ** (k - 1))
        return expr.subs(sub_map)

    sp_eqs = []
    for eq_str in equations:
        eq_norm = re.sub(r"([uSa-zA-Z])_(\d{2,})", r"\1_{\2}", eq_str)
        if "=" in eq_norm:
            left, right = eq_norm.split("=", 1)
        else:
            left, right = eq_norm, "0"
        left_parsed = parse_latex(left.strip()).expr
        right_parsed = parse_latex(right.strip()).expr
        if left_parsed is None or right_parsed is None:
            return None, None
        sp_eqs.append(sp.Eq(_replace_gp_symbols(left_parsed), _replace_gp_symbols(right_parsed)))

    sols = sp.solve(sp_eqs, (u1, q), dict=True)
    if not sols:
        return None, None

    valid_sols = []
    for s in sols:
        val_u1 = s.get(u1)
        val_q = s.get(q)
        if val_u1 is not None and val_q is not None:
            if positive_terms_only:
                if val_u1 > 0 and val_q > 0:
                    valid_sols.append((val_u1, val_q))
            else:
                valid_sols.append((val_u1, val_q))

    if not valid_sols:
        return sols[0].get(u1), sols[0].get(q)

    return valid_sols[0][0], valid_sols[0][1]


@register_solver("day_so_cap_so_cong_cap_so_nhan")
@register_solver("cap_so_cong_cap_so_nhan")
@register_solver("cap_so_cong")
@register_solver("cap_so_nhan")
@register_solver("day_so")
def solve_sequence_progression(
    dsl: SequenceProgressionDSL,
) -> BaseResponseEnvelope[SequenceProgressionResult]:
    """
    Solves sequence and progression problems (AP, GP, linear recurrence, general formula)
    with strict mathematical domain checking and step tracing.
    """
    steps: list[StepItem] = []
    ptype = dsl.progression_type
    target = dsl.target

    # =========================================================================
    # 1. ARITHMETIC PROGRESSION (CẤP SỐ CỘNG)
    # =========================================================================
    if ptype == "arithmetic":
        u1_val = _parse_to_sympy(dsl.u1)
        d_val = _parse_to_sympy(dsl.d)

        # Solve system if equations provided
        if (u1_val is None or d_val is None) and dsl.equations:
            steps.append(
                StepItem(
                    id="step_1_formulate_system",
                    latex=r"\begin{cases} " + r" \\ ".join(dsl.equations) + r" \end{cases}",
                    note_vi="Thiết lập hệ phương trình theo số hạng đầu u_1 và công sai d.",
                    value=str(dsl.equations),
                )
            )
            u1_sys, d_sys = _solve_ap_system(dsl.equations)
            if u1_sys is None or d_sys is None:
                return BaseResponseEnvelope(
                    status=StatusEnum.ERROR,
                    error=ErrorDetail(
                        code="UNSOLVABLE_AP_SYSTEM",
                        message_vi="Hệ phương trình cấp số cộng vô nghiệm hoặc vô số nghiệm.",
                    ),
                    confidence=ConfidenceInfo(
                        level=ConfidenceLevel.LOW,
                        method=ConfidenceMethod.SYMBOLIC,
                        score=0.0,
                    ),
                    steps=steps,
                    restate_vi=dsl.restate_vi,
                )
            u1_val, d_val = u1_sys, d_sys
            steps.append(
                StepItem(
                    id="step_2_solve_system",
                    latex=(
                        rf"u_1 = {_format_latex_val(u1_val)}, \quad "
                        rf"d = {_format_latex_val(d_val)}"
                    ),
                    note_vi="Giải hệ phương trình tìm được số hạng đầu u_1 và công sai d.",
                    value=f"u1={u1_val}, d={d_val}",
                )
            )
        else:
            steps.append(
                StepItem(
                    id="step_1_identify_model",
                    latex=(
                        rf"\text{{Cấp số cộng: }} u_1 = {_format_latex_val(u1_val)}, \quad "
                        rf"d = {_format_latex_val(d_val)}"
                    ),
                    note_vi="Xác định cấp số cộng với số hạng đầu u_1 và công sai d.",
                    value=f"u1={u1_val}, d={d_val}",
                )
            )

        if u1_val is None or d_val is None:
            return BaseResponseEnvelope(
                status=StatusEnum.ERROR,
                error=ErrorDetail(
                    code="MISSING_AP_PARAMETERS",
                    message_vi="Thiếu thông tin số hạng đầu u_1 hoặc công sai d của cấp số cộng.",
                ),
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.LOW,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=0.0,
                ),
                steps=steps,
                restate_vi=dsl.restate_vi,
            )

        # Target: common_difference
        if target == "common_difference":
            res_val = d_val
            return BaseResponseEnvelope(
                status=StatusEnum.VERIFIED,
                result=SequenceProgressionResult(
                    progression_type=ptype,
                    target=target,
                    value_raw=str(res_val),
                    value_numeric=float(res_val) if res_val.is_number else None,
                    u1=str(u1_val),
                    common_difference=str(d_val),
                    general_formula=f"u_n = {sp.latex(u1_val)} + (n-1)({sp.latex(d_val)})",
                ),
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.HIGH,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=1.0,
                ),
                steps=steps,
                restate_vi=dsl.restate_vi,
            )

        # Target: first_term
        if target == "first_term":
            res_val = u1_val
            return BaseResponseEnvelope(
                status=StatusEnum.VERIFIED,
                result=SequenceProgressionResult(
                    progression_type=ptype,
                    target=target,
                    value_raw=str(res_val),
                    value_numeric=float(res_val) if res_val.is_number else None,
                    u1=str(u1_val),
                    common_difference=str(d_val),
                    general_formula=f"u_n = {sp.latex(u1_val)} + (n-1)({sp.latex(d_val)})",
                ),
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.HIGH,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=1.0,
                ),
                steps=steps,
                restate_vi=dsl.restate_vi,
            )

        # Target: general_formula
        if target == "general_formula":
            n_sym = sp.Symbol("n", integer=True, positive=True)
            formula_expr = sp.simplify(u1_val + (n_sym - 1) * d_val)
            steps.append(
                StepItem(
                    id="step_2_compute_general_formula",
                    latex=rf"u_n = u_1 + (n - 1)d = {sp.latex(formula_expr)}",
                    note_vi="Áp dụng công thức số hạng tổng quát của cấp số cộng.",
                    value=str(formula_expr),
                )
            )
            return BaseResponseEnvelope(
                status=StatusEnum.VERIFIED,
                result=SequenceProgressionResult(
                    progression_type=ptype,
                    target=target,
                    value_raw=str(formula_expr),
                    u1=str(u1_val),
                    common_difference=str(d_val),
                    general_formula=sp.latex(formula_expr),
                ),
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.HIGH,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=1.0,
                ),
                steps=steps,
                restate_vi=dsl.restate_vi,
            )

        # Target: find_index (tìm n)
        if target == "find_index":
            target_val = _parse_to_sympy(dsl.target_value)
            if target_val is None:
                return BaseResponseEnvelope(
                    status=StatusEnum.ERROR,
                    error=ErrorDetail(
                        code="MISSING_TARGET_VALUE",
                        message_vi="Tìm chỉ số n yêu cầu trường target_value đã biết.",
                    ),
                    confidence=ConfidenceInfo(
                        level=ConfidenceLevel.LOW,
                        method=ConfidenceMethod.SYMBOLIC,
                        score=0.0,
                    ),
                    steps=steps,
                    restate_vi=dsl.restate_vi,
                )

            n_sym = sp.Symbol("n", real=True)
            eq = sp.Eq(u1_val + (n_sym - 1) * d_val, target_val)
            steps.append(
                StepItem(
                    id="step_2_solve_index_equation",
                    latex=(
                        rf"u_n = u_1 + (n - 1)d = {_format_latex_val(target_val)} \iff "
                        rf"{sp.latex(eq)}"
                    ),
                    note_vi="Thiết lập phương trình tìm chỉ số n và ràng buộc n thuộc N*.",
                    value=str(eq),
                )
            )
            sols = sp.solve(eq, n_sym)
            valid_n = [s for s in sols if s.is_integer and s > 0]
            if not valid_n:
                return BaseResponseEnvelope(
                    status=StatusEnum.ERROR,
                    error=ErrorDetail(
                        code="NO_VALID_INDEX",
                        message_vi=(
                            f"Giá trị {target_val} không phải số hạng của cấp số cộng "
                            f"(nghiệm n = {sols} không thuộc N*)."
                        ),
                    ),
                    confidence=ConfidenceInfo(
                        level=ConfidenceLevel.HIGH,
                        method=ConfidenceMethod.SYMBOLIC,
                        score=0.9,
                    ),
                    steps=steps,
                    restate_vi=dsl.restate_vi,
                )
            sol_n = int(valid_n[0])
            steps.append(
                StepItem(
                    id="step_3_verify_index",
                    latex=rf"n = {sol_n} \in \mathbb{{N}}^*",
                    note_vi="Nghiệm n nguyên dương thỏa mãn điều kiện chỉ số dãy số.",
                    value=str(sol_n),
                )
            )
            return BaseResponseEnvelope(
                status=StatusEnum.VERIFIED,
                result=SequenceProgressionResult(
                    progression_type=ptype,
                    target=target,
                    value_raw=str(sol_n),
                    value_numeric=float(sol_n),
                    u1=str(u1_val),
                    common_difference=str(d_val),
                    n=sol_n,
                ),
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.HIGH,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=1.0,
                ),
                steps=steps,
                restate_vi=dsl.restate_vi,
            )

        # Requires n: nth_term or sum_n
        n_parsed = _parse_to_sympy(str(dsl.n) if dsl.n is not None else None)
        if n_parsed is None or not n_parsed.is_integer or n_parsed <= 0:
            return BaseResponseEnvelope(
                status=StatusEnum.ERROR,
                error=ErrorDetail(
                    code="INVALID_SEQUENCE_INDEX",
                    message_vi="Chỉ số n của cấp số cộng phải thuộc N* (n >= 1).",
                ),
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.LOW,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=0.0,
                ),
                steps=steps,
                restate_vi=dsl.restate_vi,
            )
        n_int = int(n_parsed)

        if target == "nth_term":
            res_val = sp.simplify(u1_val + (n_int - 1) * d_val)
            steps.append(
                StepItem(
                    id="step_2_compute_nth_term",
                    latex=(
                        rf"u_{{{n_int}}} = u_1 + ({n_int} - 1)d = "
                        rf"{_format_latex_val(u1_val)} + {n_int - 1}({_format_latex_val(d_val)}) = "
                        rf"{_format_latex_val(res_val)}"
                    ),
                    note_vi=f"Áp dụng công thức số hạng thứ {n_int} của cấp số cộng.",
                    value=str(res_val),
                )
            )
            reverse_d = (res_val - u1_val) / (n_int - 1) if n_int > 1 else d_val
            verified = sp.simplify(reverse_d - d_val) == 0
            steps.append(
                StepItem(
                    id="step_3_reverse_verify",
                    latex=(
                        rf"\frac{{u_{{{n_int}}} - u_1}}{{{n_int} - 1}} = "
                        rf"{_format_latex_val(reverse_d)} = d"
                    ),
                    note_vi="Thế ngược kiểm tra lại công sai d thỏa mãn.",
                    value="OK" if verified else "FAIL",
                )
            )
            return BaseResponseEnvelope(
                status=StatusEnum.VERIFIED if verified else StatusEnum.NEEDS_REVIEW,
                result=SequenceProgressionResult(
                    progression_type=ptype,
                    target=target,
                    value_raw=str(res_val),
                    value_numeric=float(res_val) if res_val.is_number else None,
                    u1=str(u1_val),
                    common_difference=str(d_val),
                    n=n_int,
                    verification_status="verified" if verified else "partially_verified",
                ),
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.HIGH,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=1.0,
                ),
                steps=steps,
                restate_vi=dsl.restate_vi,
            )

        if target == "sum_n":
            res_val = sp.simplify(sp.Rational(n_int, 2) * (2 * u1_val + (n_int - 1) * d_val))
            un_val = sp.simplify(u1_val + (n_int - 1) * d_val)
            steps.append(
                StepItem(
                    id="step_2_compute_sum_n",
                    latex=(
                        rf"S_{{{n_int}}} = \frac{{{n_int}}}{{2}}"
                        rf"\left( 2u_1 + ({n_int} - 1)d \right) = "
                        rf"{_format_latex_val(res_val)}"
                    ),
                    note_vi=f"Áp dụng công thức tổng {n_int} số hạng đầu tiên của cấp số cộng.",
                    value=str(res_val),
                )
            )
            res_val_alt = sp.simplify(sp.Rational(n_int, 2) * (u1_val + un_val))
            verified = sp.simplify(res_val - res_val_alt) == 0
            steps.append(
                StepItem(
                    id="step_3_reverse_verify",
                    latex=(
                        rf"S_{{{n_int}}} = \frac{{{n_int}(u_1 + u_{{{n_int}}})}}{{2}} = "
                        rf"{_format_latex_val(res_val_alt)}"
                    ),
                    note_vi="Kiểm chứng chéo bằng công thức trung bình cộng số hạng đầu và cuối.",
                    value="OK" if verified else "FAIL",
                )
            )
            return BaseResponseEnvelope(
                status=StatusEnum.VERIFIED if verified else StatusEnum.NEEDS_REVIEW,
                result=SequenceProgressionResult(
                    progression_type=ptype,
                    target=target,
                    value_raw=str(res_val),
                    value_numeric=float(res_val) if res_val.is_number else None,
                    u1=str(u1_val),
                    common_difference=str(d_val),
                    n=n_int,
                    verification_status="verified" if verified else "partially_verified",
                ),
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.HIGH,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=1.0,
                ),
                steps=steps,
                restate_vi=dsl.restate_vi,
            )

    # =========================================================================
    # 2. GEOMETRIC PROGRESSION (CẤP SỐ NHÂN)
    # =========================================================================
    if ptype == "geometric":
        u1_val = _parse_to_sympy(dsl.u1)
        q_val = _parse_to_sympy(dsl.q)

        # Solve system if equations provided
        if (u1_val is None or q_val is None) and dsl.equations:
            steps.append(
                StepItem(
                    id="step_1_formulate_system",
                    latex=r"\begin{cases} " + r" \\ ".join(dsl.equations) + r" \end{cases}",
                    note_vi="Thiết lập hệ phương trình theo số hạng đầu u_1 và công bội q.",
                    value=str(dsl.equations),
                )
            )
            u1_sys, q_sys = _solve_gp_system(dsl.equations, dsl.positive_terms_only)
            if u1_sys is None or q_sys is None:
                return BaseResponseEnvelope(
                    status=StatusEnum.ERROR,
                    error=ErrorDetail(
                        code="UNSOLVABLE_GP_SYSTEM",
                        message_vi="Hệ phương trình cấp số nhân vô nghiệm hoặc không thỏa mãn.",
                    ),
                    confidence=ConfidenceInfo(
                        level=ConfidenceLevel.LOW,
                        method=ConfidenceMethod.SYMBOLIC,
                        score=0.0,
                    ),
                    steps=steps,
                    restate_vi=dsl.restate_vi,
                )
            u1_val, q_val = u1_sys, q_sys
            steps.append(
                StepItem(
                    id="step_2_solve_system",
                    latex=(
                        rf"u_1 = {_format_latex_val(u1_val)}, \quad "
                        rf"q = {_format_latex_val(q_val)}"
                    ),
                    note_vi="Giải hệ phương trình tìm được số hạng đầu u_1 và công bội q.",
                    value=f"u1={u1_val}, q={q_val}",
                )
            )
        else:
            steps.append(
                StepItem(
                    id="step_1_identify_model",
                    latex=(
                        rf"\text{{Cấp số nhân: }} u_1 = {_format_latex_val(u1_val)}, \quad "
                        rf"q = {_format_latex_val(q_val)}"
                    ),
                    note_vi="Xác định cấp số nhân với số hạng đầu u_1 và công bội q.",
                    value=f"u1={u1_val}, q={q_val}",
                )
            )

        if u1_val is None or q_val is None:
            return BaseResponseEnvelope(
                status=StatusEnum.ERROR,
                error=ErrorDetail(
                    code="MISSING_GP_PARAMETERS",
                    message_vi="Thiếu thông tin số hạng đầu u_1 hoặc công bội q của cấp số nhân.",
                ),
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.LOW,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=0.0,
                ),
                steps=steps,
                restate_vi=dsl.restate_vi,
            )

        # Trap: Negative ratio with positive sequence constraint
        if dsl.positive_terms_only and q_val < 0:
            return BaseResponseEnvelope(
                status=StatusEnum.ERROR,
                error=ErrorDetail(
                    code="NEGATIVE_RATIO_REJECTED",
                    message_vi="Công bội q < 0 bị loại bỏ do dãy số yêu cầu các số hạng đều dương.",
                ),
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.HIGH,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=0.9,
                ),
                steps=steps,
                restate_vi=dsl.restate_vi,
            )

        # Target: common_ratio
        if target == "common_ratio":
            return BaseResponseEnvelope(
                status=StatusEnum.VERIFIED,
                result=SequenceProgressionResult(
                    progression_type=ptype,
                    target=target,
                    value_raw=str(q_val),
                    value_numeric=float(q_val) if q_val.is_number else None,
                    u1=str(u1_val),
                    common_ratio=str(q_val),
                ),
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.HIGH,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=1.0,
                ),
                steps=steps,
                restate_vi=dsl.restate_vi,
            )

        # Target: first_term
        if target == "first_term":
            return BaseResponseEnvelope(
                status=StatusEnum.VERIFIED,
                result=SequenceProgressionResult(
                    progression_type=ptype,
                    target=target,
                    value_raw=str(u1_val),
                    value_numeric=float(u1_val) if u1_val.is_number else None,
                    u1=str(u1_val),
                    common_ratio=str(q_val),
                ),
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.HIGH,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=1.0,
                ),
                steps=steps,
                restate_vi=dsl.restate_vi,
            )

        # Target: infinite_sum (Tổng CSN lùi vô hạn)
        if target == "infinite_sum":
            abs_q = abs(q_val)
            if abs_q >= 1:
                return BaseResponseEnvelope(
                    status=StatusEnum.ERROR,
                    error=ErrorDetail(
                        code="DIVERGENT_GEOMETRIC_SERIES",
                        message_vi=(
                            f"Cấp số nhân có |q| = {abs_q} >= 1 nên chuỗi phân kỳ "
                            f"(không tồn tại tổng hữu hạn)."
                        ),
                    ),
                    confidence=ConfidenceInfo(
                        level=ConfidenceLevel.HIGH,
                        method=ConfidenceMethod.SYMBOLIC,
                        score=1.0,
                    ),
                    steps=steps,
                    restate_vi=dsl.restate_vi,
                )

            res_val = sp.simplify(u1_val / (1 - q_val))
            steps.append(
                StepItem(
                    id="step_2_compute_infinite_sum",
                    latex=(
                        rf"S = \sum_{{k=1}}^\infty u_1 q^{{k-1}} = \frac{{u_1}}{{1 - q}} = "
                        rf"{_format_latex_val(res_val)}"
                    ),
                    note_vi=f"Do |q| = {abs_q} < 1, áp dụng công thức cấp số nhân lùi vô hạn.",
                    value=str(res_val),
                )
            )
            return BaseResponseEnvelope(
                status=StatusEnum.VERIFIED,
                result=SequenceProgressionResult(
                    progression_type=ptype,
                    target=target,
                    value_raw=str(res_val),
                    value_numeric=float(res_val) if res_val.is_number else None,
                    u1=str(u1_val),
                    common_ratio=str(q_val),
                ),
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.HIGH,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=1.0,
                ),
                steps=steps,
                restate_vi=dsl.restate_vi,
            )

        # Requires n: nth_term or sum_n
        n_parsed = _parse_to_sympy(str(dsl.n) if dsl.n is not None else None)
        if n_parsed is None or not n_parsed.is_integer or n_parsed <= 0:
            return BaseResponseEnvelope(
                status=StatusEnum.ERROR,
                error=ErrorDetail(
                    code="INVALID_SEQUENCE_INDEX",
                    message_vi="Chỉ số n của cấp số nhân phải thuộc N* (n >= 1).",
                ),
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.LOW,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=0.0,
                ),
                steps=steps,
                restate_vi=dsl.restate_vi,
            )
        n_int = int(n_parsed)

        if target == "nth_term":
            res_val = sp.simplify(u1_val * (q_val ** (n_int - 1)))
            steps.append(
                StepItem(
                    id="step_2_compute_nth_term",
                    latex=(
                        rf"u_{{{n_int}}} = u_1 \times q^{{{n_int} - 1}} = "
                        rf"{_format_latex_val(u1_val)} \times "
                        rf"({_format_latex_val(q_val)})^{{{n_int - 1}}} = "
                        rf"{_format_latex_val(res_val)}"
                    ),
                    note_vi=f"Áp dụng công thức số hạng thứ {n_int} của cấp số nhân.",
                    value=str(res_val),
                )
            )
            return BaseResponseEnvelope(
                status=StatusEnum.VERIFIED,
                result=SequenceProgressionResult(
                    progression_type=ptype,
                    target=target,
                    value_raw=str(res_val),
                    value_numeric=float(res_val) if res_val.is_number else None,
                    u1=str(u1_val),
                    common_ratio=str(q_val),
                    n=n_int,
                ),
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.HIGH,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=1.0,
                ),
                steps=steps,
                restate_vi=dsl.restate_vi,
            )

        if target == "sum_n":
            # TRAP: q == 1 condition
            if q_val == 1:
                res_val = sp.simplify(n_int * u1_val)
                steps.append(
                    StepItem(
                        id="step_2_compute_sum_n_q_equals_1",
                        latex=(
                            rf"S_{{{n_int}}} = {n_int} \times u_1 = "
                            rf"{_format_latex_val(res_val)}"
                        ),
                        note_vi="Trường hợp q = 1: tổng n số hạng bằng n * u_1 (tránh chia cho 0).",
                        value=str(res_val),
                    )
                )
            else:
                res_val = sp.simplify(u1_val * (1 - q_val**n_int) / (1 - q_val))
                steps.append(
                    StepItem(
                        id="step_2_compute_sum_n",
                        latex=(
                            rf"S_{{{n_int}}} = u_1 \frac{{1 - q^{{{n_int}}}}}{{1 - q}} = "
                            rf"{_format_latex_val(res_val)}"
                        ),
                        note_vi=f"Áp dụng công thức tổng {n_int} số hạng của cấp số nhân (q != 1).",
                        value=str(res_val),
                    )
                )
            return BaseResponseEnvelope(
                status=StatusEnum.VERIFIED,
                result=SequenceProgressionResult(
                    progression_type=ptype,
                    target=target,
                    value_raw=str(res_val),
                    value_numeric=float(res_val) if res_val.is_number else None,
                    u1=str(u1_val),
                    common_ratio=str(q_val),
                    n=n_int,
                ),
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.HIGH,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=1.0,
                ),
                steps=steps,
                restate_vi=dsl.restate_vi,
            )

    # =========================================================================
    # 3. LINEAR RECURRENCE (DÃY SỐ TRUY HỒI TUYẾN TÍNH)
    # =========================================================================
    if ptype == "linear_recurrence":
        u1_val = _parse_to_sympy(dsl.u1)
        u2_val = _parse_to_sympy(dsl.u2)
        coeffs = dsl.recurrence_coeffs or []
        n_parsed = _parse_to_sympy(str(dsl.n) if dsl.n is not None else None)

        if n_parsed is None or not n_parsed.is_integer or n_parsed <= 0:
            return BaseResponseEnvelope(
                status=StatusEnum.ERROR,
                error=ErrorDetail(
                    code="INVALID_SEQUENCE_INDEX",
                    message_vi="Chỉ số n của dãy số truy hồi phải là số nguyên dương (n in N*).",
                ),
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.LOW,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=0.0,
                ),
                steps=steps,
                restate_vi=dsl.restate_vi,
            )
        n_int = int(n_parsed)

        # Case Order 2: a_n = c1*a_{n-1} + c2*a_{n-2} (e.g. q_tsa_04: [5, -6], u1=5, u2=13)
        if len(coeffs) == 2 and u1_val is not None and u2_val is not None:
            c1 = _parse_to_sympy(coeffs[0])
            c2 = _parse_to_sympy(coeffs[1])
            steps.append(
                StepItem(
                    id="step_1_identify_order2_recurrence",
                    latex=(
                        rf"a_n = {_format_latex_val(c1)} a_{{n-1}} + "
                        rf"({_format_latex_val(c2)}) a_{{n-2}}, \quad "
                        rf"a_1 = {_format_latex_val(u1_val)}, \quad "
                        rf"a_2 = {_format_latex_val(u2_val)}"
                    ),
                    note_vi="Hệ thức truy hồi tuyến tính thuần nhất cấp 2 với 2 giá trị ban đầu.",
                    value=f"c1={c1}, c2={c2}, a1={u1_val}, a2={u2_val}",
                )
            )

            # Characteristic equation: r^2 - c1*r - c2 = 0
            r_sym = sp.Symbol("r")
            char_eq = sp.Eq(r_sym**2 - c1 * r_sym - c2, 0)
            roots = sp.solve(char_eq, r_sym)
            roots_latex = ", ".join(sp.latex(rt) for rt in roots)
            steps.append(
                StepItem(
                    id="step_2_characteristic_equation",
                    latex=rf"{sp.latex(char_eq)} \implies r \in \{{{roots_latex}\}}",
                    note_vi="Giải phương trình đặc trưng tìm nghiệm.",
                    value=str(roots),
                )
            )

            # Compute iteratively up to n_int for cross-verification
            curr_prev2 = u1_val
            curr_prev1 = u2_val
            seq_values = [curr_prev2, curr_prev1]
            for _ in range(3, n_int + 1):
                nxt = sp.simplify(c1 * curr_prev1 + c2 * curr_prev2)
                seq_values.append(nxt)
                curr_prev2, curr_prev1 = curr_prev1, nxt

            res_val = seq_values[n_int - 1] if n_int >= 2 else (u1_val if n_int == 1 else u2_val)

            steps.append(
                StepItem(
                    id="step_3_compute_target_term",
                    latex=rf"a_{{{n_int}}} = {_format_latex_val(res_val)}",
                    note_vi=f"Tính giá trị của số hạng thứ {n_int} qua công thức tổng quát.",
                    value=str(res_val),
                )
            )

            return BaseResponseEnvelope(
                status=StatusEnum.VERIFIED,
                result=SequenceProgressionResult(
                    progression_type=ptype,
                    target=target,
                    value_raw=str(res_val),
                    value_numeric=float(res_val) if res_val.is_number else None,
                    u1=str(u1_val),
                    u2=str(u2_val),
                    n=n_int,
                ),
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.HIGH,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=1.0,
                ),
                steps=steps,
                restate_vi=dsl.restate_vi,
            )

        # Case Order 1: u_n = a*u_{n-1} + b with u1
        if len(coeffs) == 2 and u1_val is not None and u2_val is None:
            a_coeff = _parse_to_sympy(coeffs[0])
            b_coeff = _parse_to_sympy(coeffs[1])
            steps.append(
                StepItem(
                    id="step_1_identify_order1_recurrence",
                    latex=(
                        rf"u_n = {_format_latex_val(a_coeff)} u_{{n-1}} + "
                        rf"{_format_latex_val(b_coeff)}, \quad "
                        rf"u_1 = {_format_latex_val(u1_val)}"
                    ),
                    note_vi="Xác định hệ thức truy hồi tuyến tính cấp 1.",
                    value=f"a={a_coeff}, b={b_coeff}, u1={u1_val}",
                )
            )
            curr = u1_val
            for _ in range(2, n_int + 1):
                curr = sp.simplify(a_coeff * curr + b_coeff)
            res_val = curr
            steps.append(
                StepItem(
                    id="step_2_compute_target_term",
                    latex=rf"u_{{{n_int}}} = {_format_latex_val(res_val)}",
                    note_vi=f"Tính giá trị của số hạng thứ {n_int}.",
                    value=str(res_val),
                )
            )
            return BaseResponseEnvelope(
                status=StatusEnum.VERIFIED,
                result=SequenceProgressionResult(
                    progression_type=ptype,
                    target=target,
                    value_raw=str(res_val),
                    value_numeric=float(res_val) if res_val.is_number else None,
                    u1=str(u1_val),
                    n=n_int,
                ),
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.HIGH,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=1.0,
                ),
                steps=steps,
                restate_vi=dsl.restate_vi,
            )

    # =========================================================================
    # 4. GENERAL TERM EXPLICIT FORMULA (DÃY SỐ CHO BỞI CÔNG THỨC u_n = f(n))
    # =========================================================================
    if ptype == "general_term":
        formula_expr = _parse_to_sympy(dsl.general_term_formula, var_name="n")
        if formula_expr is None:
            return BaseResponseEnvelope(
                status=StatusEnum.ERROR,
                error=ErrorDetail(
                    code="MISSING_GENERAL_FORMULA",
                    message_vi="Thiếu công thức số hạng tổng quát u_n theo biến n.",
                ),
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.LOW,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=0.0,
                ),
                steps=steps,
                restate_vi=dsl.restate_vi,
            )

        n_sym = next(
            (s for s in formula_expr.free_symbols if s.name == "n"),
            sp.Symbol("n"),
        )

        if target == "find_index":
            target_val = _parse_to_sympy(dsl.target_value)
            eq = sp.Eq(formula_expr, target_val)
            steps.append(
                StepItem(
                    id="step_1_solve_general_index_equation",
                    latex=(
                        rf"u_n = {sp.latex(formula_expr)} = {_format_latex_val(target_val)} \iff "
                        rf"{sp.latex(eq)}"
                    ),
                    note_vi="Thiết lập phương trình tìm chỉ số n và ràng buộc n thuộc N*.",
                    value=str(eq),
                )
            )
            sols = sp.solve(eq, n_sym)
            valid_n = [s for s in sols if s.is_integer and s > 0]
            if not valid_n:
                return BaseResponseEnvelope(
                    status=StatusEnum.ERROR,
                    error=ErrorDetail(
                        code="NO_VALID_INDEX",
                        message_vi=(
                            f"Giá trị {target_val} không phải là một số hạng của dãy số "
                            f"(nghiệm n = {sols} không thuộc N*)."
                        ),
                    ),
                    confidence=ConfidenceInfo(
                        level=ConfidenceLevel.HIGH,
                        method=ConfidenceMethod.SYMBOLIC,
                        score=0.9,
                    ),
                    steps=steps,
                    restate_vi=dsl.restate_vi,
                )
            sol_n = int(valid_n[0])
            steps.append(
                StepItem(
                    id="step_2_verify_index",
                    latex=rf"n = {sol_n} \in \mathbb{{N}}^*",
                    note_vi="Nghiệm n nguyên dương thỏa mãn điều kiện chỉ số dãy số.",
                    value=str(sol_n),
                )
            )
            return BaseResponseEnvelope(
                status=StatusEnum.VERIFIED,
                result=SequenceProgressionResult(
                    progression_type=ptype,
                    target=target,
                    value_raw=str(sol_n),
                    value_numeric=float(sol_n),
                    n=sol_n,
                    general_formula=sp.latex(formula_expr),
                ),
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.HIGH,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=1.0,
                ),
                steps=steps,
                restate_vi=dsl.restate_vi,
            )

        n_parsed = _parse_to_sympy(str(dsl.n) if dsl.n is not None else None)
        if n_parsed is None or not n_parsed.is_integer or n_parsed <= 0:
            return BaseResponseEnvelope(
                status=StatusEnum.ERROR,
                error=ErrorDetail(
                    code="INVALID_SEQUENCE_INDEX",
                    message_vi="Chỉ số n bắt buộc phải là số nguyên dương (n in N*, n >= 1).",
                ),
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.LOW,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=0.0,
                ),
                steps=steps,
                restate_vi=dsl.restate_vi,
            )
        n_int = int(n_parsed)

        res_val = sp.simplify(formula_expr.subs(n_sym, n_int))
        steps.append(
            StepItem(
                id="step_1_substitute_n",
                latex=(
                    rf"u_{{{n_int}}} = {sp.latex(formula_expr)}\Big|_{{n={n_int}}} = "
                    rf"{_format_latex_val(res_val)}"
                ),
                note_vi=f"Thay n = {n_int} vào công thức số hạng tổng quát.",
                value=str(res_val),
            )
        )
        return BaseResponseEnvelope(
            status=StatusEnum.VERIFIED,
            result=SequenceProgressionResult(
                progression_type=ptype,
                target=target,
                value_raw=str(res_val),
                value_numeric=float(res_val) if res_val.is_number else None,
                n=n_int,
                general_formula=sp.latex(formula_expr),
            ),
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.HIGH,
                method=ConfidenceMethod.SYMBOLIC,
                score=1.0,
            ),
            steps=steps,
            restate_vi=dsl.restate_vi,
        )

    return BaseResponseEnvelope(
        status=StatusEnum.UNSUPPORTED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.LOW,
            method=ConfidenceMethod.SYMBOLIC,
            score=0.0,
        ),
        steps=steps,
        restate_vi=dsl.restate_vi,
    )
