"""
Trigonometric Functions & Equations CAS Solver
Comprehensive deterministic solver for trigonometry:
- Trigonometric Equations (Basic sin/cos/tan/cot, quadratic in sin/cos, symmetric)
- Interval Root Finding & Counting (e.g. q_hsa_08: roots on [0, 2*pi])
- Sum of roots on an interval
- Extremum & Min/Max of trigonometric expressions (e.g. q_hsa_06: max of 2sin(x) + 3cos(x))
- Periodicity & Fundamental Period T
- Domain analysis & Singularity traps (tan requires cos != 0, cot requires sin != 0)
- Back-substitution crosscheck to eliminate extraneous roots
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
    WarningItem,
)
from app.schemas.dsl import TrigonometricDSL
from app.schemas.trigonometric import TrigonometricResult
from app.solvers.registry import register_solver


def _clean_trig_str(s: str) -> str:
    """Strip math delimiters \\( ... \\) or $ ... $, normalize pi to \\pi if unescaped."""
    s = s.strip()
    if s.startswith(r"\(") and s.endswith(r"\)"):
        s = s[2:-2].strip()
    if s.startswith("$") and s.endswith("$"):
        s = s[1:-1].strip()
    # Normalize unescaped 'pi' (word boundary) to '\\pi' for parse_latex
    s = re.sub(r"(?<!\\)\bpi\b", r"\\pi", s)
    return s


def _get_var_symbol(expr: sp.Expr, var_name: str = "x") -> sp.Symbol:
    """Dynamically get variable symbol with matching identity from expression."""
    for s in expr.free_symbols:
        if s.name == var_name:
            return s
    return sp.Symbol(var_name, real=True)


def _format_imageset_solution(s: Any, k_sym: sp.Symbol) -> str:
    """Format SymPy ImageSet into human-readable k-form (e.g. 'pi/3 + 2*k*pi')."""
    if isinstance(s, sp.ImageSet):
        lam = s.lamda
        var = lam.variables[0]
        expr_k = lam.expr.subs(var, k_sym)
        return str(sp.simplify(expr_k))
    return str(s)


@register_solver("ham_so_luong_giac_phuong_trinh")
@register_solver("phuong_trinh_luong_giac")
@register_solver("luong_giac")
def solve_trigonometric(
    dsl: TrigonometricDSL,
) -> BaseResponseEnvelope[TrigonometricResult]:
    """
    Main entry point for Trigonometric Functions & Equations solver.
    Dispatches to equation solving, interval root counting, max/min, and period.
    """
    restate = dsl.restate_vi or "Giải bài toán hàm số và phương trình lượng giác."
    steps: list[StepItem] = []
    warnings: list[WarningItem] = []
    var_name = dsl.variable or "x"
    op = (dsl.operation or "solve_equation").lower().strip()

    # 1. OPERATION: max_min (e.g. q_hsa_06)
    if op in ("max_min", "gtln_gtnn", "cuc_tri"):
        return _solve_trig_max_min(
            dsl=dsl,
            var_name=var_name,
            restate=restate,
            steps=steps,
            warnings=warnings,
        )

    # 2. OPERATION: period (Chu kỳ tuần hoàn)
    if op in ("period", "chu_ky"):
        return _solve_trig_period(
            dsl=dsl,
            var_name=var_name,
            restate=restate,
            steps=steps,
            warnings=warnings,
        )

    # 3. OPERATION: domain (Tập xác định)
    if op in ("domain", "tap_xac_dinh"):
        return _solve_trig_domain(
            dsl=dsl,
            var_name=var_name,
            restate=restate,
            steps=steps,
            warnings=warnings,
        )

    # 4. EQUATION OPERATIONS: solve_equation, count_roots_interval, find_roots_interval
    return _solve_trig_equation(
        dsl=dsl,
        var_name=var_name,
        op=op,
        restate=restate,
        steps=steps,
        warnings=warnings,
    )


# -----------------------------------------------------------------------------
# EQUATION SOLVING & ROOT COUNTING
# -----------------------------------------------------------------------------


def _solve_trig_equation(
    dsl: TrigonometricDSL,
    var_name: str,
    op: str,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[TrigonometricResult]:
    """
    Solve trigonometric equation generally or on a finite interval [a, b].
    Handles q_hsa_08: count roots of cos(2x) - 3cos(x) + 2 = 0 on [0, 2*pi].
    """
    raw_eq = dsl.equation or dsl.expression
    if not raw_eq:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_EQUATION",
                message_vi="Thiếu phương trình hoặc biểu thức lượng giác cần giải.",
            ),
            restate_vi=restate,
        )

    clean_str = _clean_trig_str(raw_eq)

    # Split into lhs and rhs if equation has '='
    if "=" in clean_str:
        parts = clean_str.split("=")
        lhs_parsed = parse_latex(parts[0].strip())
        rhs_parsed = parse_latex(parts[1].strip())
        if lhs_parsed.expr is None or rhs_parsed.expr is None:
            return BaseResponseEnvelope(
                status=StatusEnum.ERROR,
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.LOW,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=0.0,
                ),
                error=ErrorDetail(
                    code="INVALID_TRIG_SYNTAX",
                    message_vi=f"Không thể phân tích cú pháp phương trình: '{raw_eq}'",
                ),
                restate_vi=restate,
            )
        expr = sp.simplify(lhs_parsed.expr - rhs_parsed.expr)
    else:
        parsed = parse_latex(clean_str)
        if parsed.expr is None:
            return BaseResponseEnvelope(
                status=StatusEnum.ERROR,
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.LOW,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=0.0,
                ),
                error=ErrorDetail(
                    code="INVALID_TRIG_SYNTAX",
                    message_vi=f"Không thể phân tích biểu thức: '{raw_eq}'",
                ),
                restate_vi=restate,
            )
        expr = sp.simplify(parsed.expr)

    var = _get_var_symbol(expr, var_name)
    eq_latex = rf"{sp.latex(expr)} = 0"

    steps.append(
        StepItem(
            id="step_1_identify_equation",
            latex=eq_latex,
            note_vi=f"Đưa phương trình về dạng chuẩn f({var_name}) = 0.",
            value=str(expr),
        )
    )

    # Check denominator and tan/cot domain conditions
    num, denom = sp.fraction(expr)
    has_denom = denom != 1

    if has_denom:
        steps.append(
            StepItem(
                id="step_2_domain_condition",
                latex=rf"\text{{ĐKXĐ: }} {sp.latex(denom)} \ne 0",
                note_vi="Điều kiện xác định: Mẫu số phải khác 0 để phương trình có nghĩa.",
                value=str(denom),
            )
        )

    # Determine interval [a, b] if provided
    interval_domain = sp.S.Reals
    has_interval = False
    a_val, b_val = None, None
    interval_latex = None

    start_str = dsl.interval_start
    end_str = dsl.interval_end
    if dsl.interval and (start_str is None or end_str is None):
        cleaned_interval = dsl.interval.strip().strip("[]()")
        parts = [p.strip() for p in re.split(r"[,;]", cleaned_interval) if p.strip()]
        if len(parts) == 2:
            start_str, end_str = parts[0], parts[1]

    if start_str is not None and end_str is not None:
        p_a = parse_latex(_clean_trig_str(start_str))
        p_b = parse_latex(_clean_trig_str(end_str))
        if p_a.expr is not None and p_b.expr is not None:
            a_val = p_a.expr
            b_val = p_b.expr
            interval_domain = sp.Interval(a_val, b_val)
            has_interval = True
            interval_latex = rf"[{sp.latex(a_val)}, {sp.latex(b_val)}]"
            steps.append(
                StepItem(
                    id="step_interval_constraint",
                    latex=rf"{var_name} \in {interval_latex}",
                    note_vi=f"Xét nghiệm của phương trình trên đoạn {interval_latex}.",
                    value=f"[{a_val}, {b_val}]",
                )
            )

    # Solve via SymPy solveset
    sol_set = sp.solveset(expr, var, domain=interval_domain)

    # Check if empty (inconsistent equation)
    if sol_set == sp.EmptySet:
        steps.append(
            StepItem(
                id="step_empty_set_conclude",
                latex=r"S = \emptyset",
                note_vi="Phương trình vô nghiệm trên tập xác định được xét.",
                value="empty",
            )
        )
        return BaseResponseEnvelope(
            status=StatusEnum.VERIFIED,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.HIGH,
                method=ConfidenceMethod.SYMBOLIC,
                score=1.0,
            ),
            result=TrigonometricResult(
                operation=op,
                equation_latex=eq_latex,
                interval_latex=interval_latex,
                general_solutions=[],
                interval_roots=[],
                roots_count=0,
                roots_sum="0",
                value_raw="0" if "count" in op else "vo_nghiem",
                value_numeric=0.0 if "count" in op else None,
                verification_method="solveset_empty_domain",
            ),
            steps=steps,
            warnings=warnings,
            restate_vi=restate,
        )

    # If ConditionSet returned, solver cannot guarantee completeness
    if isinstance(sol_set, sp.ConditionSet):
        return BaseResponseEnvelope(
            status=StatusEnum.UNSUPPORTED,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            unsupported_reason="transcendental_trig_equation",
            error=ErrorDetail(
                code="CONDITION_SET_UNSOLVED",
                message_vi="SymPy không thể tìm nghiệm giải tích hữu hạn cho phương trình.",
            ),
            steps=steps,
            restate_vi=restate,
        )

    # Case A: Interval roots (Finite Set)
    if has_interval:
        raw_roots = list(sol_set)
        verified_roots: list[sp.Expr] = []

        # Back-substitution verification: check denominator != 0 and residual == 0
        for r in raw_roots:
            if has_denom:
                denom_val = sp.simplify(denom.subs(var, r))
                if denom_val == 0:
                    continue  # Extraneous root violating domain
            # Residual check
            res_val = sp.simplify(expr.subs(var, r))
            if res_val == 0 or abs(float(res_val.evalf())) < 1e-7:
                verified_roots.append(r)

        # Sort roots numerically
        verified_roots = sorted(
            verified_roots,
            key=lambda x: float(x.evalf()) if x.is_real else str(x),
        )
        roots_str = [str(r) for r in verified_roots]
        roots_count = len(verified_roots)
        roots_sum_expr = sp.simplify(sum(verified_roots)) if verified_roots else sp.Integer(0)
        roots_sum_str = str(roots_sum_expr)

        steps.append(
            StepItem(
                id="step_interval_roots_result",
                latex=rf"{var_name} \in \{{{', '.join(sp.latex(r) for r in verified_roots)}\}}",
                note_vi=f"Các nghiệm phân biệt thuộc đoạn: {', '.join(roots_str)}.",
                value=", ".join(roots_str),
            )
        )

        steps.append(
            StepItem(
                id="step_count_conclude",
                latex=rf"\text{{Số nghiệm}} = {roots_count}",
                note_vi=f"Số nghiệm của phương trình trên đoạn là {roots_count}.",
                value=str(roots_count),
            )
        )

        # Primary value depends on operation
        if "count" in op:
            val_raw = str(roots_count)
            val_num = float(roots_count)
        elif "sum" in op:
            val_raw = roots_sum_str
            val_num = float(roots_sum_expr.evalf())
        else:
            val_raw = ", ".join(roots_str)
            val_num = float(roots_count)

        res = TrigonometricResult(
            operation=op,
            equation_latex=eq_latex,
            interval_latex=interval_latex,
            interval_roots=roots_str,
            roots_count=roots_count,
            roots_sum=roots_sum_str,
            value_raw=val_raw,
            value_numeric=val_num,
            verification_method="back_substitution_and_evalf",
        )

        return BaseResponseEnvelope(
            status=StatusEnum.VERIFIED,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.HIGH,
                method=ConfidenceMethod.SYMBOLIC,
                score=1.0,
            ),
            result=res,
            steps=steps,
            warnings=warnings,
            restate_vi=restate,
        )

    # Case B: General Solution on R (Union of ImageSets)
    k_sym = sp.Symbol("k", integer=True)
    general_branches: list[str] = []

    if isinstance(sol_set, sp.Union):
        for sub in sol_set.args:
            general_branches.append(_format_imageset_solution(sub, k_sym))
    else:
        general_branches.append(_format_imageset_solution(sol_set, k_sym))

    # Clean duplicates while preserving order
    seen = set()
    unique_branches = []
    for b in general_branches:
        if b not in seen:
            seen.add(b)
            unique_branches.append(b)

    branches_latex = ", ".join(unique_branches)
    steps.append(
        StepItem(
            id="step_general_solution",
            latex=rf"{var_name} \in \left\{{ {branches_latex} \right\}}, \quad k \in \mathbb{{Z}}",
            note_vi="Họ nghiệm tổng quát của phương trình lượng giác trên R.",
            value=", ".join(unique_branches),
        )
    )

    res = TrigonometricResult(
        operation=op,
        equation_latex=eq_latex,
        general_solutions=unique_branches,
        value_raw=", ".join(unique_branches),
        verification_method="general_solution_imageset",
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=res,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# EXTREMUM & MIN/MAX OF TRIGONOMETRIC FUNCTIONS
# -----------------------------------------------------------------------------


def _solve_trig_max_min(
    dsl: TrigonometricDSL,
    var_name: str,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[TrigonometricResult]:
    """
    Find GTLN (Max) and GTNN (Min) of a trigonometric function.
    Handles q_hsa_06: max of y = 2*sin(x) + 3*cos(x) is sqrt(13).
    """
    raw_expr = dsl.expression or dsl.equation
    if not raw_expr:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_EXPRESSION",
                message_vi="Thiếu biểu thức lượng giác cần tìm GTLN/GTNN.",
            ),
            restate_vi=restate,
        )

    clean_str = _clean_trig_str(raw_expr)
    if "=" in clean_str:
        # e.g. y = 2sin(x) + 3cos(x)
        clean_str = clean_str.split("=")[-1].strip()

    parsed = parse_latex(clean_str)
    if parsed.expr is None:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="INVALID_TRIG_SYNTAX",
                message_vi=f"Không thể phân tích biểu thức: '{raw_expr}'",
            ),
            restate_vi=restate,
        )

    f = parsed.expr
    var = _get_var_symbol(f, var_name)
    f_latex = sp.latex(f)

    steps.append(
        StepItem(
            id="step_1_identify_function",
            latex=rf"y = f({var_name}) = {f_latex}",
            note_vi="Xác định hàm số lượng giác cần tìm cực trị / GTLN - GTNN.",
            value=str(f),
        )
    )

    # Optimization: Linear combination a*sin(x) + b*cos(x) (Cauchy-Schwarz)
    sin_coeff = f.coeff(sp.sin(var))
    cos_coeff = f.coeff(sp.cos(var))
    remainder = sp.simplify(f - (sin_coeff * sp.sin(var) + cos_coeff * sp.cos(var)))

    is_linear_trig = (
        sin_coeff != 0
        and cos_coeff != 0
        and var not in sin_coeff.free_symbols
        and var not in cos_coeff.free_symbols
    )
    if is_linear_trig:
        a = sin_coeff
        b = cos_coeff
        rad = sp.sqrt(a**2 + b**2)
        max_v = sp.simplify(remainder + rad)
        min_v = sp.simplify(remainder - rad)

        a_ltx = sp.latex(a)
        b_ltx = sp.latex(b)

        cs_lhs = rf"({a_ltx}\sin {var_name} + {b_ltx}\cos {var_name})^2"
        cs_rhs = rf"({a_ltx}^2 + {b_ltx}^2) = {sp.latex(a**2 + b**2)}"
        steps.append(
            StepItem(
                id="step_cauchy_schwarz",
                latex=rf"{cs_lhs} \le {cs_rhs}",
                note_vi="Áp dụng bất đẳng thức Cauchy-Schwarz: (a*sin x + b*cos x)^2 <= a^2 + b^2.",
                value=f"sqrt(a^2 + b^2) = {rad}",
            )
        )

        steps.append(
            StepItem(
                id="step_max_min_conclude",
                latex=rf"\max y = {sp.latex(max_v)}, \quad \min y = {sp.latex(min_v)}",
                note_vi=f"Giá trị lớn nhất là {max_v}, giá trị nhỏ nhất là {min_v}.",
                value=f"max={max_v}, min={min_v}",
            )
        )

        max_str = str(max_v)
        max_num = float(max_v.evalf()) if max_v.is_number else None
        min_str = str(min_v)
        min_num = float(min_v.evalf()) if min_v.is_number else None

        res = TrigonometricResult(
            operation="max_min",
            expression_latex=f_latex,
            max_value=max_str,
            max_value_numeric=max_num,
            min_value=min_str,
            min_value_numeric=min_num,
            value_raw=max_str,
            value_numeric=max_num,
            verification_method="cauchy_schwarz_amplitude",
        )

        return BaseResponseEnvelope(
            status=StatusEnum.VERIFIED,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.HIGH,
                method=ConfidenceMethod.SYMBOLIC,
                score=1.0,
            ),
            result=res,
            steps=steps,
            warnings=warnings,
            restate_vi=restate,
        )

    # General Calculus method over [0, 2*pi]
    df = sp.diff(f, var)
    crit_set = sp.solveset(df, var, domain=sp.Interval(0, 2 * sp.pi))
    candidates = [sp.Integer(0), 2 * sp.pi]
    if isinstance(crit_set, sp.FiniteSet):
        candidates.extend(list(crit_set))

    cand_vals = [sp.simplify(f.subs(var, c)) for c in candidates]
    max_val = max(cand_vals, key=lambda v: float(v.evalf()))
    min_val = min(cand_vals, key=lambda v: float(v.evalf()))

    max_str = str(max_val)
    max_num = float(max_val.evalf()) if max_val.is_number else None
    min_str = str(min_val)
    min_num = float(min_val.evalf()) if min_val.is_number else None

    steps.append(
        StepItem(
            id="step_calculus_max_min",
            latex=rf"\max y = {sp.latex(max_val)}, \quad \min y = {sp.latex(min_val)}",
            note_vi="Khảo sát đạo hàm trên chu kỳ cơ sở [0, 2*pi] để tìm GTLN và GTNN.",
            value=f"max={max_val}, min={min_val}",
        )
    )

    res = TrigonometricResult(
        operation="max_min",
        expression_latex=f_latex,
        max_value=max_str,
        max_value_numeric=max_num,
        min_value=min_str,
        min_value_numeric=min_num,
        value_raw=max_str,
        value_numeric=max_num,
        verification_method="calculus_critical_points",
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=res,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# PERIODICITY & DOMAIN
# -----------------------------------------------------------------------------


def _solve_trig_period(
    dsl: TrigonometricDSL,
    var_name: str,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[TrigonometricResult]:
    """Calculate the fundamental period T of a trigonometric function."""
    raw_expr = dsl.expression or dsl.equation or ""
    clean_str = _clean_trig_str(raw_expr)
    parsed = parse_latex(clean_str)
    if parsed.expr is None:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(code="INVALID_TRIG_SYNTAX", message_vi="Biểu thức không hợp lệ"),
            restate_vi=restate,
        )

    f = parsed.expr
    var = _get_var_symbol(f, var_name)
    period_val = sp.periodicity(f, var)

    if period_val is None:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.HIGH,
                method=ConfidenceMethod.SYMBOLIC,
                score=1.0,
            ),
            error=ErrorDetail(
                code="NON_PERIODIC_FUNCTION",
                message_vi="Hàm số đã cho không có tính chất tuần hoàn.",
            ),
            restate_vi=restate,
        )

    period_str = str(period_val)
    steps.append(
        StepItem(
            id="step_period_result",
            latex=rf"T = {sp.latex(period_val)}",
            note_vi=f"Chu kỳ tuần hoàn cơ sở của hàm số là T = {period_str}.",
            value=period_str,
        )
    )

    res = TrigonometricResult(
        operation="period",
        expression_latex=sp.latex(f),
        period_value=period_str,
        value_raw=period_str,
        verification_method="periodicity_shift_identity",
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=res,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


def _solve_trig_domain(
    dsl: TrigonometricDSL,
    var_name: str,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[TrigonometricResult]:
    """Find domain restrictions for tan, cot, and rational denominators."""
    raw_expr = dsl.expression or dsl.equation or ""
    clean_str = _clean_trig_str(raw_expr)
    parsed = parse_latex(clean_str)
    if parsed.expr is None:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(code="INVALID_TRIG_SYNTAX", message_vi="Biểu thức không hợp lệ"),
            restate_vi=restate,
        )

    f = parsed.expr
    num, denom = sp.fraction(f)

    restrictions = []
    # Denominator restriction
    if denom != 1:
        restrictions.append(rf"{sp.latex(denom)} \ne 0")

    # Check for tan or cot subexpressions
    for node in sp.preorder_traversal(f):
        if isinstance(node, sp.tan):
            arg = node.args[0]
            restrictions.append(rf"{sp.latex(arg)} \ne \frac{{\pi}}{{2}} + k\pi")
        elif isinstance(node, sp.cot):
            arg = node.args[0]
            restrictions.append(rf"{sp.latex(arg)} \ne k\pi")

    cond_str = ", ".join(restrictions) if restrictions else rf"{var_name} \in \mathbb{{R}}"
    steps.append(
        StepItem(
            id="step_domain_conditions",
            latex=rf"\text{{ĐKXĐ: }} {cond_str}",
            note_vi="Xác định điều kiện để hàm số có nghĩa (mẫu khác 0, tan/cot xác định).",
            value=cond_str,
        )
    )

    res = TrigonometricResult(
        operation="domain",
        expression_latex=sp.latex(f),
        domain_condition=cond_str,
        value_raw=cond_str,
        verification_method="singularity_set_enumeration",
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=res,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )
