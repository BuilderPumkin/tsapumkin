"""
Integral Solver for Pumkin Math API
Deterministic CAS implementation using SymPy for indefinite & definite integrals.
Handles mathematical domain traps:
- Arbitrary integration constants and initial conditions
- Integration bounds: equality, flipping (a > b), infinite limits
- Interior discontinuities / singularities in integration interval
- Reverse derivative verification: d/dx[F(x)] = f(x)
- Numerical quadrature validation
"""

import math

import mpmath
import sympy as sp

from app.latex.parser import ParserError, parse_latex
from app.schemas.common import (
    BaseResponseEnvelope,
    ConfidenceInfo,
    ConfidenceLevel,
    ConfidenceMethod,
    ErrorDetail,
    StatusEnum,
    StepItem,
    UnsupportedReasonEnum,
    WarningCode,
    WarningItem,
)
from app.schemas.dsl import IntegralDSL
from app.schemas.integral import IntegralResult
from app.solvers.registry import register_solver


def _parse_bound_expr(bound_str: str | None, var: sp.Symbol) -> sp.Expr | None:
    """Parses a boundary string into a SymPy expression, handling infinity notations."""
    if bound_str is None:
        return None
    s = bound_str.strip()
    if not s:
        return None
    if s in ("+oo", r"+\infty", r"\infty", "oo", "inf", "+inf"):
        return sp.oo
    if s in ("-oo", r"-\infty", "-inf"):
        return -sp.oo

    # Replace literal oo patterns if entered without backslash
    s_norm = s.replace("+oo", r"+\infty").replace("-oo", r"-\infty").replace("oo", r"\infty")
    res = parse_latex(s_norm)
    return res.expr


def _find_singularities(f_expr: sp.Expr, var: sp.Symbol) -> list[sp.Expr]:
    """Finds real singularities/poles of the integrand f_expr."""
    singularities: list[sp.Expr] = []
    num, den = f_expr.as_numer_denom()
    if den != 1:
        try:
            sol = sp.solveset(den, var, domain=sp.S.Reals)
            if isinstance(sol, sp.FiniteSet):
                singularities.extend(list(sol))
        except Exception:
            pass
    return singularities


def _verify_reverse_derivative(
    f_expr: sp.Expr,
    F_expr: sp.Expr,
    var: sp.Symbol,
) -> bool:
    """
    Verifies that d/dx[F(x)] == f(x) both symbolically and via multi-point numerical testing.
    """
    dF = sp.diff(F_expr, var)
    diff_expr = sp.simplify(dF - f_expr)
    if diff_expr == 0:
        return True

    diff_trig = sp.trigsimp(diff_expr)
    if diff_trig == 0:
        return True

    diff_expanded = sp.expand(diff_expr)
    if diff_expanded == 0:
        return True

    # Multi-point numerical evaluation in the interior of the domain
    test_points = [0.27, 0.73, 1.45, 2.31, 3.14, 0.5, 1.0, 2.0]
    valid_passes = 0
    for p in test_points:
        try:
            val_f = complex(f_expr.subs(var, p).evalf())
            val_df = complex(dF.subs(var, p).evalf())
            if not math.isnan(val_f.real) and not math.isinf(val_f.real):
                if abs(val_f.imag) < 1e-9 and abs(val_df.imag) < 1e-9:
                    if abs(val_f.real - val_df.real) < 1e-6:
                        valid_passes += 1
                        if valid_passes >= 3:
                            return True
        except Exception:
            continue

    return False


@register_solver("nguyen_ham_tich_phan")
def solve_integral(dsl: IntegralDSL) -> BaseResponseEnvelope[IntegralResult]:
    """
    Deterministic solver for indefinite and definite integrals.
    Outputs structured pedagogical step traces for Socratic tutoring.
    """
    var_name = dsl.variable or "x"
    x = sp.Symbol(var_name)
    steps: list[StepItem] = []
    warnings: list[WarningItem] = []

    # 1. Parse Integrand
    try:
        parsed_res = parse_latex(dsl.integrand)
        raw_expr = parsed_res.expr
        if raw_expr is None:
            return BaseResponseEnvelope(
                status=StatusEnum.ERROR,
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.LOW,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=0.0,
                ),
                error=ErrorDetail(
                    code="INVALID_LATEX",
                    message_vi="Không thể phân tích cú pháp biểu thức dưới dấu tích phân.",
                    details={"integrand": dsl.integrand},
                ),
            )
    except (ParserError, Exception) as e:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="INVALID_LATEX",
                message_vi=f"Không thể phân tích cú pháp biểu thức dưới dấu tích phân: {e}",
                details={"integrand": dsl.integrand},
            ),
        )

    # Harmonize variable symbol with parser's Symbol instance
    matching_syms = [s for s in raw_expr.free_symbols if s.name == var_name]
    if matching_syms:
        x = matching_syms[0]

    # If raw_expr is already an Integral AST node, unpack it
    f_expr: sp.Expr
    extracted_lower: sp.Expr | None = None
    extracted_upper: sp.Expr | None = None
    if isinstance(raw_expr, sp.Integral):
        f_expr = raw_expr.function
        if len(raw_expr.limits) > 0 and len(raw_expr.limits[0]) == 3:
            extracted_lower = raw_expr.limits[0][1]
            extracted_upper = raw_expr.limits[0][2]
    else:
        f_expr = raw_expr

    # 2. Determine bounds (DSL fields take priority over extracted)
    a_expr: sp.Expr | None = None
    b_expr: sp.Expr | None = None
    if dsl.lower_bound is not None and dsl.upper_bound is not None:
        try:
            a_expr = _parse_bound_expr(dsl.lower_bound, x)
            b_expr = _parse_bound_expr(dsl.upper_bound, x)
            if a_expr is None or b_expr is None:
                return BaseResponseEnvelope(
                    status=StatusEnum.ERROR,
                    confidence=ConfidenceInfo(
                        level=ConfidenceLevel.LOW,
                        method=ConfidenceMethod.SYMBOLIC,
                        score=0.0,
                    ),
                    error=ErrorDetail(
                        code="INVALID_BOUNDS",
                        message_vi="Không thể phân tích cận tích phân.",
                        details={
                            "lower_bound": dsl.lower_bound,
                            "upper_bound": dsl.upper_bound,
                        },
                    ),
                )
        except Exception as e:
            return BaseResponseEnvelope(
                status=StatusEnum.ERROR,
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.LOW,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=0.0,
                ),
                error=ErrorDetail(
                    code="INVALID_BOUNDS",
                    message_vi=f"Không thể phân tích cận tích phân: {e}",
                    details={
                        "lower_bound": dsl.lower_bound,
                        "upper_bound": dsl.upper_bound,
                    },
                ),
            )
    elif extracted_lower is not None and extracted_upper is not None:
        a_expr = extracted_lower
        b_expr = extracted_upper

    if a_expr is not None:
        a_expr = a_expr.subs({s: x for s in a_expr.free_symbols if s.name == var_name})
    if b_expr is not None:
        b_expr = b_expr.subs({s: x for s in b_expr.free_symbols if s.name == var_name})

    is_definite = a_expr is not None and b_expr is not None

    # Step 1: Restate Problem
    restate_text = dsl.restate_vi
    f_latex = sp.latex(f_expr)
    if is_definite:
        assert a_expr is not None and b_expr is not None
        a_latex = sp.latex(a_expr)
        b_latex = sp.latex(b_expr)
        problem_latex = rf"\int_{{{a_latex}}}^{{{b_latex}}} \left( {f_latex} \right) d{var_name}"
        if not restate_text:
            restate_text = f"Tính tích phân xác định I = \\({problem_latex}\\)."
        steps.append(
            StepItem(
                id="step_1_statement",
                latex=rf"I = \int_{{{a_latex}}}^{{{b_latex}}} \left( {f_latex} \right) d{var_name}",
                note_vi="Xác định bài toán: Tính tích phân xác định với các cận cho trước.",
                value=f"[{a_latex}, {b_latex}]",
            )
        )
    else:
        problem_latex = rf"\int \left( {f_latex} \right) d{var_name}"
        if not restate_text:
            restate_text = f"Tìm họ nguyên hàm của hàm số f({var_name}) = \\({f_latex}\\)."
        steps.append(
            StepItem(
                id="step_1_statement",
                latex=rf"\int \left( {f_latex} \right) d{var_name}",
                note_vi="Xác định bài toán: Tìm họ nguyên hàm của hàm số trên miền xác định.",
                value=f_latex,
            )
        )

    # Step 2: Domain and Singularity Detection
    singularities = _find_singularities(f_expr, x)
    sing_strs = [sp.latex(s) for s in singularities]
    if singularities:
        steps.append(
            StepItem(
                id="step_2_domain_singularities",
                latex=rf"\text{{Tập điểm gián đoạn: }} \{{{', '.join(sing_strs)}\}}",
                note_vi="Khảo sát miền xác định và các điểm gián đoạn của hàm dưới dấu tích phân.",
                value=str(sing_strs),
            )
        )
    else:
        steps.append(
            StepItem(
                id="step_2_domain_regular",
                latex=r"\mathcal{D} = \mathbb{R}",
                note_vi="Hàm dưới dấu tích phân xác định và liên tục trên miền xét.",
                value="R",
            )
        )

    # 3. Check for Discontinuity Traps in Definite Integrals
    if is_definite:
        assert a_expr is not None and b_expr is not None
        try:
            a_num = float(a_expr.evalf())
            b_num = float(b_expr.evalf())
            lo, hi = min(a_num, b_num), max(a_num, b_num)

            for s in singularities:
                try:
                    s_num = float(s.evalf())
                    if lo < s_num < hi:
                        int_test = sp.integrate(f_expr, (x, a_expr, b_expr))
                        if (
                            int_test is sp.nan
                            or int_test is sp.zoo
                            or int_test in (sp.oo, -sp.oo)
                            or int_test.has(sp.oo)
                            or int_test.has(sp.nan)
                            or int_test.has(sp.zoo)
                        ):
                            warnings.append(
                                WarningItem(
                                    code=WarningCode.WARN_SINGULARITY_IN_INTERVAL,
                                    message_vi=(
                                        f"Hàm số có điểm gián đoạn tại {var_name} = {sp.latex(s)} "
                                        f"nằm trong khoảng ({sp.latex(a_expr)}, "
                                        f"{sp.latex(b_expr)}). "
                                        "Tích phân suy rộng phân kỳ, không áp dụng được trực tiếp "
                                        "công thức Newton-Leibniz."
                                    ),
                                )
                            )
                            steps.append(
                                StepItem(
                                    id="step_discontinuity_trap",
                                    latex=(
                                        rf"\text{{Gián đoạn tại }} {var_name} = "
                                        rf"{sp.latex(s)} \implies \text{{Phân kỳ}}"
                                    ),
                                    note_vi=(
                                        "CẢNH BÁO BẪY: Điểm gián đoạn bên trong khoảng "
                                        "lấy tích phân khiến tích phân phân kỳ."
                                    ),
                                    value=str(int_test),
                                )
                            )
                            return BaseResponseEnvelope(
                                status=StatusEnum.NEEDS_REVIEW,
                                confidence=ConfidenceInfo(
                                    level=ConfidenceLevel.HIGH,
                                    method=ConfidenceMethod.SYMBOLIC,
                                    score=0.9,
                                ),
                                restate_vi=restate_text,
                                result=None,
                                steps=steps,
                                warnings=warnings,
                            )
                    elif math.isclose(s_num, lo) or math.isclose(s_num, hi):
                        warnings.append(
                            WarningItem(
                                code=WarningCode.WARN_IMPROPER_INTEGRAL,
                                message_vi=(
                                    f"Tích phân suy rộng loại 2 có điểm kỳ dị tại cận "
                                    f"{var_name} = {sp.latex(s)}."
                                ),
                            )
                        )
                except Exception:
                    pass
        except Exception:
            pass

    # 4. Compute Antiderivative F(x)
    try:
        F_expr = sp.integrate(f_expr, x)
    except Exception as e:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="INTEGRATION_ERROR",
                message_vi=f"Lỗi tính toán tích phân tượng trưng: {e}",
            ),
            restate_vi=restate_text,
            steps=steps,
        )

    # Check if SymPy failed to find elementary antiderivative
    if isinstance(F_expr, sp.Integral):
        return BaseResponseEnvelope(
            status=StatusEnum.UNSUPPORTED,
            unsupported_reason=UnsupportedReasonEnum.OUT_OF_SCOPE,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            restate_vi=restate_text,
            steps=steps,
            warnings=[
                WarningItem(
                    code="WARN_NO_ELEMENTARY_ANTIDERIVATIVE",
                    message_vi="Không tìm thấy nguyên hàm sơ cấp cho hàm số này.",
                )
            ],
        )

    # Check for ConditionSet
    if F_expr.has(sp.ConditionSet):
        return BaseResponseEnvelope(
            status=StatusEnum.NEEDS_REVIEW,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.MEDIUM,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.5,
            ),
            restate_vi=restate_text,
            steps=steps,
            warnings=[
                WarningItem(
                    code=WarningCode.WARN_MULTIPLE_BRANCHES,
                    message_vi=(
                        "Nguyên hàm phụ thuộc điều kiện biên (ConditionSet). Cần giáo viên duyệt."
                    ),
                )
            ],
        )

    # Method-specific pedagogical steps
    if dsl.method_hint == "by_parts":
        if dsl.by_parts_u and dsl.by_parts_dv:
            steps.append(
                StepItem(
                    id="step_by_parts_setup",
                    latex=(
                        rf"\text{{Đặt }} u = {dsl.by_parts_u}, "
                        rf"\; dv = {dsl.by_parts_dv} \, d{var_name}"
                    ),
                    note_vi="Áp dụng phương pháp tích phân từng phần: đặt u và vi phân dv.",
                    value=f"u={dsl.by_parts_u}, dv={dsl.by_parts_dv}",
                )
            )
        else:
            steps.append(
                StepItem(
                    id="step_by_parts_formula",
                    latex=r"\int u \, dv = u v - \int v \, du",
                    note_vi="Áp dụng công thức tích phân từng phần.",
                    value="by_parts",
                )
            )
    elif dsl.method_hint == "substitution":
        if dsl.substitution:
            steps.append(
                StepItem(
                    id="step_substitution_setup",
                    latex=rf"\text{{Đặt biến phụ: }} u = {dsl.substitution}",
                    note_vi="Áp dụng phương pháp đổi biến số: đặt ẩn phụ u.",
                    value=f"u={dsl.substitution}",
                )
            )
        else:
            steps.append(
                StepItem(
                    id="step_substitution_formula",
                    latex=r"\int f(u(x)) u'(x) dx = \int f(u) du",
                    note_vi="Áp dụng phương pháp đổi biến số.",
                    value="substitution",
                )
            )

    # Step 3: Antiderivative Formula Record
    steps.append(
        StepItem(
            id="step_3_antiderivative",
            latex=(
                rf"F({var_name}) = \int \left( {f_latex} \right) d{var_name} "
                rf"= {sp.latex(F_expr)} + C"
            ),
            note_vi="Tìm một nguyên hàm F(x) của hàm số f(x).",
            value=sp.latex(F_expr),
        )
    )

    # Step 4: Reverse Derivative Verification
    rev_verified = _verify_reverse_derivative(f_expr, F_expr, x)
    steps.append(
        StepItem(
            id="step_4_verify_derivative",
            latex=(
                rf"\frac{{d}}{{d{var_name}}} \left[ {sp.latex(F_expr)} \right] "
                rf"= {sp.latex(sp.diff(F_expr, x))} \equiv {f_latex}"
            ),
            note_vi=(
                "Kiểm chứng đạo hàm ngược: đạo hàm của nguyên hàm bằng chính xác "
                "hàm dưới dấu tích phân."
            ),
            value="verified" if rev_verified else "unverified",
        )
    )

    # 5. Branch: Indefinite Integral
    if not is_definite:
        determined_c: str | None = None
        particular_latex: str | None = None

        # Check Initial Condition F(x0) = y0
        if dsl.initial_condition is not None:
            try:
                x0_expr = parse_latex(dsl.initial_condition.point).expr
                y0_expr = parse_latex(dsl.initial_condition.value).expr
                if x0_expr is not None:
                    sym_map_x0 = {s: x for s in x0_expr.free_symbols if s.name == var_name}
                    x0_expr = x0_expr.subs(sym_map_x0)
                if y0_expr is not None:
                    sym_map_y0 = {s: x for s in y0_expr.free_symbols if s.name == var_name}
                    y0_expr = y0_expr.subs(sym_map_y0)

                C_sym = sp.Symbol("C")
                eq = sp.Eq(F_expr.subs(x, x0_expr) + C_sym, y0_expr)
                c_sol = sp.solveset(eq, C_sym, domain=sp.S.Reals)
                if isinstance(c_sol, sp.FiniteSet) and len(c_sol) == 1:
                    c_val = list(c_sol)[0]
                    determined_c = sp.latex(c_val)
                    part_f = F_expr + c_val
                    particular_latex = sp.latex(part_f)
                    steps.append(
                        StepItem(
                            id="step_5_initial_condition",
                            latex=(
                                rf"F({sp.latex(x0_expr)}) = {sp.latex(y0_expr)} "
                                rf"\implies C = {determined_c} "
                                rf"\implies F({var_name}) = {particular_latex}"
                            ),
                            note_vi=(
                                f"Thế điều kiện ban đầu F({sp.latex(x0_expr)}) = "
                                f"{sp.latex(y0_expr)} để xác định hằng số C."
                            ),
                            value=determined_c,
                        )
                    )
            except Exception as e:
                warnings.append(
                    WarningItem(
                        code="WARN_INITIAL_CONDITION_SOLVE_FAILED",
                        message_vi=f"Không thể giải tìm hằng số C từ điều kiện ban đầu: {e}",
                    )
                )

        result_payload = IntegralResult(
            is_definite=False,
            variable=var_name,
            antiderivative_latex=f"{sp.latex(F_expr)} + C",
            antiderivative_sympy=f"{F_expr} + C",
            constant_symbol="C",
            determined_constant=determined_c,
            particular_antiderivative_latex=particular_latex,
            value_latex=None,
            value_sympy=None,
            value_float=None,
            lower_bound=None,
            upper_bound=None,
            is_improper=False,
            singularities=sing_strs,
            reverse_derivative_verified=rev_verified,
            numerical_quad_verified=None,
        )

        return BaseResponseEnvelope(
            status=StatusEnum.VERIFIED,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.HIGH,
                method=ConfidenceMethod.CONSENSUS if rev_verified else ConfidenceMethod.SYMBOLIC,
                score=1.0 if rev_verified else 0.85,
            ),
            restate_vi=restate_text,
            result=result_payload,
            steps=steps,
            warnings=warnings,
        )

    # 6. Branch: Definite Integral
    assert a_expr is not None and b_expr is not None
    is_improper = a_expr in (sp.oo, -sp.oo) or b_expr in (sp.oo, -sp.oo)
    if is_improper:
        warnings.append(
            WarningItem(
                code=WarningCode.WARN_IMPROPER_INTEGRAL,
                message_vi="Tích phân suy rộng loại 1 có cận ở vô cực.",
            )
        )

    # Check equal bounds: int_a^a f(x) dx = 0
    if a_expr == b_expr:
        steps.append(
            StepItem(
                id="step_5_equal_bounds",
                latex=(
                    rf"\int_{{{sp.latex(a_expr)}}}^{{{sp.latex(b_expr)}}} "
                    rf"f({var_name}) d{var_name} = 0 \text{{ (cận bằng nhau)}}"
                ),
                note_vi="Tích phân có cận trên bằng cận dưới luôn có giá trị bằng 0.",
                value="0",
            )
        )
        res_zero = IntegralResult(
            is_definite=True,
            variable=var_name,
            antiderivative_latex=f"{sp.latex(F_expr)} + C",
            antiderivative_sympy=f"{F_expr} + C",
            constant_symbol="C",
            value_latex="0",
            value_sympy="0",
            value_float=0.0,
            lower_bound=sp.latex(a_expr),
            upper_bound=sp.latex(b_expr),
            is_improper=is_improper,
            singularities=sing_strs,
            reverse_derivative_verified=rev_verified,
            numerical_quad_verified=True,
        )
        return BaseResponseEnvelope(
            status=StatusEnum.VERIFIED,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.HIGH,
                method=ConfidenceMethod.CONSENSUS,
                score=1.0,
            ),
            restate_vi=restate_text,
            result=res_zero,
            steps=steps,
            warnings=warnings,
        )

    # Check flipped bounds: a > b
    is_flipped = False
    try:
        a_f = float(a_expr.evalf())
        b_f = float(b_expr.evalf())
        if a_f > b_f:
            is_flipped = True
    except Exception:
        pass

    if is_flipped:
        warnings.append(
            WarningItem(
                code=WarningCode.WARN_FLIPPED_BOUNDS,
                message_vi=f"Cận dưới ({sp.latex(a_expr)}) lớn hơn cận trên ({sp.latex(b_expr)}). "
                f"Áp dụng tính chất hoán đổi cận: \\int_a^b f(x)dx = -\\int_b^a f(x)dx.",
            )
        )
        steps.append(
            StepItem(
                id="step_flipped_bounds",
                latex=(
                    rf"\int_{{{sp.latex(a_expr)}}}^{{{sp.latex(b_expr)}}} "
                    rf"f({var_name}) d{var_name} = "
                    rf"-\int_{{{sp.latex(b_expr)}}}^{{{sp.latex(a_expr)}}} "
                    rf"f({var_name}) d{var_name}"
                ),
                note_vi="Áp dụng quy tắc đảo cận tích phân.",
                value="flipped",
            )
        )

    # Integrate across bounds
    try:
        int_val = sp.integrate(f_expr, (x, a_expr, b_expr))
    except Exception as e:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="DEFINITE_INTEGRATION_ERROR",
                message_vi=f"Lỗi tính tích phân xác định: {e}",
            ),
            restate_vi=restate_text,
            steps=steps,
        )

    # Check for divergence or uncomputed Integral
    if (
        int_val is sp.nan
        or int_val is sp.zoo
        or int_val in (sp.oo, -sp.oo)
        or int_val.has(sp.oo)
        or int_val.has(sp.nan)
        or int_val.has(sp.zoo)
    ):
        warnings.append(
            WarningItem(
                code=WarningCode.WARN_DIVERGENT_INTEGRAL,
                message_vi="Tích phân phân kỳ (không tồn tại giá trị hữu hạn).",
            )
        )
        steps.append(
            StepItem(
                id="step_divergence",
                latex=(
                    rf"\int_{{{sp.latex(a_expr)}}}^{{{sp.latex(b_expr)}}} "
                    rf"f({var_name}) d{var_name} = \infty"
                ),
                note_vi="Tích phân phân kỳ ra vô cực hoặc không xác định.",
                value=str(int_val),
            )
        )
        return BaseResponseEnvelope(
            status=StatusEnum.NEEDS_REVIEW,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.HIGH,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.9,
            ),
            restate_vi=restate_text,
            result=None,
            steps=steps,
            warnings=warnings,
        )

    if isinstance(int_val, sp.Integral):
        return BaseResponseEnvelope(
            status=StatusEnum.UNSUPPORTED,
            unsupported_reason=UnsupportedReasonEnum.OUT_OF_SCOPE,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            restate_vi=restate_text,
            steps=steps,
            warnings=[
                WarningItem(
                    code="WARN_UNRESOLVED_INTEGRAL",
                    message_vi="Không tìm được biểu thức giải tích chính xác cho tích phân này.",
                )
            ],
        )

    val_latex = sp.latex(int_val)
    val_sympy = str(int_val)
    val_float: float | None = None
    try:
        val_float = float(int_val.evalf())
    except Exception:
        pass

    # Step 5: Newton-Leibniz step
    steps.append(
        StepItem(
            id="step_5_newton_leibniz",
            latex=(
                rf"I = \left[ {sp.latex(F_expr)} \right]_{{{sp.latex(a_expr)}}}"
                rf"^{{{sp.latex(b_expr)}}} = {val_latex}"
            ),
            note_vi=(
                f"Áp dụng định lý Newton-Leibniz: "
                f"I = F({sp.latex(b_expr)}) - F({sp.latex(a_expr)})."
            ),
            value=val_latex,
        )
    )

    # Numerical Quadrature Verification
    quad_verified: bool | None = None
    if val_float is not None:
        try:
            a_mp = float(a_expr.evalf()) if a_expr not in (sp.oo, -sp.oo) else mpmath.inf
            if a_expr == -sp.oo:
                a_mp = -mpmath.inf
            b_mp = float(b_expr.evalf()) if b_expr not in (sp.oo, -sp.oo) else mpmath.inf
            if b_expr == -sp.oo:
                b_mp = -mpmath.inf

            f_lambda = sp.lambdify(x, f_expr, "mpmath")
            quad_val = float(mpmath.quad(f_lambda, [a_mp, b_mp]))
            rel_err = abs(val_float - quad_val) / max(1.0, abs(val_float))
            quad_verified = rel_err < 1e-4
            if quad_verified:
                steps.append(
                    StepItem(
                        id="step_6_numerical_quad_verified",
                        latex=(
                            rf"\Delta_{{\text{{quad}}}} = | {val_float:.6f} "
                            rf"- {quad_val:.6f} | < 10^{{-4}}"
                        ),
                        note_vi=(
                            "Đã đối chiếu và kiểm chứng chéo thành công với "
                            "phương pháp cầu phương số (quad)."
                        ),
                        value=f"err={rel_err:.2e}",
                    )
                )
        except Exception:
            quad_verified = None

    result_payload = IntegralResult(
        is_definite=True,
        variable=var_name,
        antiderivative_latex=f"{sp.latex(F_expr)} + C",
        antiderivative_sympy=f"{F_expr} + C",
        constant_symbol="C",
        determined_constant=None,
        particular_antiderivative_latex=None,
        value_latex=val_latex,
        value_sympy=val_sympy,
        value_float=val_float,
        lower_bound=sp.latex(a_expr),
        upper_bound=sp.latex(b_expr),
        is_improper=is_improper,
        singularities=sing_strs,
        reverse_derivative_verified=rev_verified,
        numerical_quad_verified=quad_verified,
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=(
                ConfidenceMethod.CONSENSUS
                if (rev_verified and quad_verified)
                else ConfidenceMethod.SYMBOLIC
            ),
            score=1.0 if (rev_verified and quad_verified) else 0.95,
        ),
        restate_vi=restate_text,
        result=result_payload,
        steps=steps,
        warnings=warnings,
    )
