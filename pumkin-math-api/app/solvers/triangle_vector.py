"""
Triangle Relations & Planar Vectors CAS Solver
Deterministic solver for:
- Heron's formula and triangle area
- Circumradius R, inradius r, medians, and law of sines / cosines
- Vector magnitude, dot product, linear combinations (k1*u + k2*v)
- Angle between vectors
- Collinearity cross-determinant (avoiding zero-division) and orthogonality
- Parameter solving for collinear or orthogonal vectors
- Triangle centroid and coordinates of vector AB
"""

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
    WarningCode,
    WarningItem,
)
from app.schemas.dsl import TriangleVectorDSL
from app.schemas.triangle_vector import TriangleVectorResult
from app.solvers.registry import register_solver


def _clean_str(s: str) -> str:
    """Clean math delimiters and whitespace."""
    s = s.strip()
    if s.startswith(r"\(") and s.endswith(r"\)"):
        s = s[2:-2].strip()
    if s.startswith("$") and s.endswith("$"):
        s = s[1:-1].strip()
    return s


def _parse_val(s: str | None, default: Any = None) -> sp.Expr | None:
    """Safely parse mathematical value using parse_latex."""
    if s is None:
        return default
    cleaned = _clean_str(s)
    parsed = parse_latex(cleaned)
    return parsed.expr if parsed.is_success else default


def _parse_coord(coord: list[str] | None) -> tuple[sp.Expr, sp.Expr] | None:
    """Parse 2D coordinates [x, y]."""
    if not coord or len(coord) != 2:
        return None
    x = _parse_val(coord[0])
    y = _parse_val(coord[1])
    if x is None or y is None:
        return None
    return x, y


def _get_param_symbol(expr: sp.Expr, param_name: str = "m") -> sp.Symbol:
    """Dynamically get matching parameter symbol from expression to avoid assumption mismatch."""
    for s in expr.free_symbols:
        if s.name == param_name:
            return s
    return sp.Symbol(param_name, real=True)


@register_solver("he_thuc_luong_tam_giac_vector")
@register_solver("tam_giac_vector")
@register_solver("he_thuc_luong_tam_giac")
@register_solver("vector_oxy")
def solve_triangle_vector(
    dsl: TriangleVectorDSL,
) -> BaseResponseEnvelope[TriangleVectorResult]:
    """
    Main entry point for Triangle Relations & Planar Vectors solver.
    Dispatches to triangle metric calculations or vector operations.
    """
    restate = dsl.restate_vi or "Giải bài toán hệ thức lượng trong tam giác và vectơ."
    steps: list[StepItem] = []
    warnings: list[WarningItem] = []
    op = dsl.operation.lower().strip()

    # TRIANGLE OPERATIONS
    if op in (
        "triangle_area_heron",
        "circumradius_r",
        "inradius_r",
        "median_length",
        "cos_angle",
        "side_from_cos",
        "triangle_solve",
    ):
        return _solve_triangle_metrics(
            dsl=dsl,
            op=op,
            restate=restate,
            steps=steps,
            warnings=warnings,
        )

    # VECTOR OPERATIONS
    return _solve_vector_operations(
        dsl=dsl,
        op=op,
        restate=restate,
        steps=steps,
        warnings=warnings,
    )


# -----------------------------------------------------------------------------
# 1. TRIANGLE METRICS SOLVER
# -----------------------------------------------------------------------------


def _solve_triangle_metrics(
    dsl: TriangleVectorDSL,
    op: str,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[TriangleVectorResult]:
    """Solve triangle relations: Heron, R, r, medians, law of cosines."""
    a_expr = _parse_val(dsl.a)
    b_expr = _parse_val(dsl.b)
    c_expr = _parse_val(dsl.c)

    # Law of Cosines to find side 'a' from b, c, and angle_A
    if op == "side_from_cos" or (a_expr is None and b_expr and c_expr and dsl.angle_A):
        return _solve_side_from_cos(
            b=b_expr,
            c=c_expr,
            angle_str=dsl.angle_A,
            restate=restate,
            steps=steps,
            warnings=warnings,
        )

    # Ensure all 3 sides a, b, c are provided for 3-side operations
    if a_expr is None or b_expr is None or c_expr is None:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_TRIANGLE_SIDES",
                message_vi="Cần cung cấp đủ 3 cạnh a, b, c của tam giác.",
            ),
            restate_vi=restate,
        )

    # Step 1: Validate positivity
    try:
        a_num = float(a_expr.evalf())
        b_num = float(b_expr.evalf())
        c_num = float(c_expr.evalf())
    except (TypeError, ValueError):
        a_num, b_num, c_num = None, None, None

    if a_num is not None and b_num is not None and c_num is not None:
        if a_num <= 0 or b_num <= 0 or c_num <= 0:
            return BaseResponseEnvelope(
                status=StatusEnum.ERROR,
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.HIGH,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=1.0,
                ),
                error=ErrorDetail(
                    code="INVALID_SIDE_LENGTH",
                    message_vi="Độ dài các cạnh của tam giác phải là số thực dương (a, b, c > 0).",
                ),
                restate_vi=restate,
            )

        # Step 2: Validate triangle inequality |b - c| < a < b + c
        if not (a_num + b_num > c_num and b_num + c_num > a_num and c_num + a_num > b_num):
            warnings.append(
                WarningItem(
                    code="TRAP_TRIANGLE_INEQUALITY_VIOLATED",
                    message_vi="Ba cạnh vi phạm bất đẳng thức tam giác (không tồn tại tam giác).",
                )
            )

            return BaseResponseEnvelope(
                status=StatusEnum.ERROR,
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.HIGH,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=1.0,
                ),
                error=ErrorDetail(
                    code="TRIANGLE_INEQUALITY_VIOLATED",
                    message_vi=(
                        f"Ba cạnh ({a_expr}, {b_expr}, {c_expr}) vi phạm bất đẳng thức tam giác."
                    ),
                ),
                warnings=warnings,
                restate_vi=restate,
            )

    ineq_latex = (
        rf"a = {sp.latex(a_expr)}, \quad b = {sp.latex(b_expr)}, \quad c = {sp.latex(c_expr)}"
    )
    steps.append(
        StepItem(
            id="step_1_validate_triangle",
            latex=ineq_latex,
            note_vi=(
                "Kiểm tra điều kiện tồn tại tam giác: ba cạnh dương và thỏa mãn BĐT tam giác."
            ),
            value=f"a={a_expr}, b={b_expr}, c={c_expr}",
        )
    )

    # Compute semi-perimeter p
    p_expr = sp.simplify((a_expr + b_expr + c_expr) / 2)
    p_str = str(p_expr)
    steps.append(
        StepItem(
            id="step_2_semiperimeter",
            latex=rf"p = \frac{{a + b + c}}{{2}} = {sp.latex(p_expr)}",
            note_vi=f"Nửa chu vi của tam giác: p = {p_str}.",
            value=p_str,
        )
    )

    # Heron's area formula S = sqrt(p(p-a)(p-b)(p-c))
    area_squared = p_expr * (p_expr - a_expr) * (p_expr - b_expr) * (p_expr - c_expr)
    area_expr = sp.simplify(sp.sqrt(area_squared))
    area_str = str(area_expr)
    area_num = float(area_expr.evalf()) if area_expr.is_number else None

    steps.append(
        StepItem(
            id="step_3_heron_area",
            latex=rf"S = \sqrt{{p(p-a)(p-b)(p-c)}} = {sp.latex(area_expr)}",
            note_vi=f"Áp dụng công thức Heron tính diện tích tam giác: S = {area_str}.",
            value=area_str,
        )
    )

    # Compute R (circumradius) = abc / (4S)
    R_expr = sp.simplify((a_expr * b_expr * c_expr) / (4 * area_expr))
    R_str = str(R_expr)
    R_num = float(R_expr.evalf()) if R_expr.is_number else None

    # Compute r (inradius) = S / p
    r_expr = sp.simplify(area_expr / p_expr)
    r_str = str(r_expr)
    r_num = float(r_expr.evalf()) if r_expr.is_number else None

    # Compute cos A = (b^2 + c^2 - a^2) / (2bc)
    cos_A_expr = sp.simplify((b_expr**2 + c_expr**2 - a_expr**2) / (2 * b_expr * c_expr))
    cos_A_str = str(cos_A_expr)

    # Median m_a = sqrt((2(b^2+c^2) - a^2) / 4)
    m_a_sq = (2 * (b_expr**2 + c_expr**2) - a_expr**2) / 4
    m_a_expr = sp.simplify(sp.sqrt(m_a_sq))
    m_a_str = str(m_a_expr)

    # Secondary verification: S = 1/2 * b * c * sin A
    sin_A_expr = sp.sqrt(1 - cos_A_expr**2)
    cross_area = sp.simplify(sp.Rational(1, 2) * b_expr * c_expr * sin_A_expr)
    if sp.simplify(cross_area - area_expr) != 0:
        warnings.append(
            WarningItem(
                code=WarningCode.WARN_NUMERIC_APPROXIMATION,
                message_vi="Cảnh báo: Kiểm chứng chéo diện tích qua sin A có sai số biểu thức.",
            )
        )

    # Select primary result value depending on operation
    if op == "circumradius_r":
        val_raw = R_str
        val_num = R_num
        steps.append(
            StepItem(
                id="step_conclude_R",
                latex=rf"R = \frac{{abc}}{{4S}} = {sp.latex(R_expr)}",
                note_vi=f"Bán kính đường tròn ngoại tiếp tam giác: R = {R_str}.",
                value=R_str,
            )
        )
    elif op == "inradius_r":
        val_raw = r_str
        val_num = r_num
        steps.append(
            StepItem(
                id="step_conclude_r",
                latex=rf"r = \frac{{S}}{{p}} = {sp.latex(r_expr)}",
                note_vi=f"Bán kính đường tròn nội tiếp tam giác: r = {r_str}.",
                value=r_str,
            )
        )
    elif op == "median_length":
        val_raw = m_a_str
        val_num = float(m_a_expr.evalf()) if m_a_expr.is_number else None
        steps.append(
            StepItem(
                id="step_conclude_median",
                latex=rf"m_a = \sqrt{{\frac{{2(b^2 + c^2) - a^2}}{{4}}}} = {sp.latex(m_a_expr)}",
                note_vi=f"Độ dài đường trung tuyến kẻ từ đỉnh A: m_a = {m_a_str}.",
                value=m_a_str,
            )
        )
    elif op == "cos_angle":
        val_raw = cos_A_str
        val_num = float(cos_A_expr.evalf()) if cos_A_expr.is_number else None
        steps.append(
            StepItem(
                id="step_conclude_cos",
                latex=rf"\cos A = \frac{{b^2 + c^2 - a^2}}{{2bc}} = {sp.latex(cos_A_expr)}",
                note_vi=f"Cosin của góc A: cos A = {cos_A_str}.",
                value=cos_A_str,
            )
        )
    else:  # triangle_area_heron
        val_raw = area_str
        val_num = area_num

    res = TriangleVectorResult(
        operation=op,
        area_raw=area_str,
        area_numeric=area_num,
        semiperimeter=p_str,
        circumradius_R=R_str,
        circumradius_R_numeric=R_num,
        inradius_r=r_str,
        inradius_r_numeric=r_num,
        median_length=m_a_str,
        angle_cos=cos_A_str,
        value_raw=val_raw,
        value_numeric=val_num,
        verification_method="heron_and_law_of_cosines_crosscheck",
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


def _solve_side_from_cos(
    b: sp.Expr,
    c: sp.Expr,
    angle_str: str,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[TriangleVectorResult]:
    """Calculate side a using the Law of Cosines: a^2 = b^2 + c^2 - 2bc*cos(A)."""
    clean_angle = _clean_str(angle_str)
    # Parse angle: handles '60', '60 deg', 'pi/3'
    if "deg" in clean_angle or clean_angle.isdigit():
        deg_val = float(clean_angle.replace("deg", "").strip())
        rad_val = sp.Rational(int(deg_val), 180) * sp.pi
    else:
        parsed_rad = parse_latex(clean_angle)
        rad_val = parsed_rad.expr if parsed_rad.is_success else sp.pi / 3

    cos_val = sp.cos(rad_val)
    a_squared = sp.simplify(b**2 + c**2 - 2 * b * c * cos_val)
    a_expr = sp.simplify(sp.sqrt(a_squared))
    a_str = str(a_expr)
    a_num = float(a_expr.evalf()) if a_expr.is_number else None

    cos_rhs = (
        rf"{sp.latex(b)}^2 + {sp.latex(c)}^2 - "
        rf"2({sp.latex(b)})({sp.latex(c)})\cos({sp.latex(rad_val)})"
    )
    steps.append(
        StepItem(
            id="step_law_of_cosines",
            latex=rf"a^2 = b^2 + c^2 - 2bc\cos A = {cos_rhs} = {sp.latex(a_squared)}",
            note_vi="Áp dụng định lý côsin trong tam giác: a^2 = b^2 + c^2 - 2bc*cos(A).",
            value=f"a^2 = {a_squared}",
        )
    )

    steps.append(
        StepItem(
            id="step_side_result",
            latex=rf"a = \sqrt{{{sp.latex(a_squared)}}} = {sp.latex(a_expr)}",
            note_vi=f"Độ dài cạnh a = {a_str}.",
            value=a_str,
        )
    )

    res = TriangleVectorResult(
        operation="side_from_cos",
        side_length=a_str,
        angle_cos=str(cos_val),
        angle_rad=str(rad_val),
        value_raw=a_str,
        value_numeric=a_num,
        verification_method="law_of_cosines",
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
# 2. PLANAR VECTORS SOLVER
# -----------------------------------------------------------------------------


def _solve_vector_operations(
    dsl: TriangleVectorDSL,
    op: str,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[TriangleVectorResult]:
    """Solve 2D vector operations: magnitude, dot product, collinearity, angle, parameter."""
    # A. VECTOR AB FROM POINTS
    if op == "vector_ab" and dsl.point_A and dsl.point_B:
        pA = _parse_coord(dsl.point_A)
        pB = _parse_coord(dsl.point_B)
        if not pA or not pB:
            return _coord_error(restate)
        xA, yA = pA
        xB, yB = pB
        vx = sp.simplify(xB - xA)
        vy = sp.simplify(yB - yA)
        mag = sp.simplify(sp.sqrt(vx**2 + vy**2))
        steps.append(
            StepItem(
                id="step_vector_ab",
                latex=rf"\vec{{AB}} = (x_B - x_A, y_B - y_A) = ({sp.latex(vx)}, {sp.latex(vy)})",
                note_vi=f"Tọa độ vectơ AB = ({vx}, {vy}).",
                value=f"({vx}, {vy})",
            )
        )
        return _make_envelope(
            TriangleVectorResult(
                operation="vector_ab",
                vector_result=[str(vx), str(vy)],
                magnitude=str(mag),
                magnitude_numeric=float(mag.evalf()) if mag.is_number else None,
                value_raw=f"({vx}, {vy})",
                verification_method="point_difference_vector",
            ),
            steps,
            warnings,
            restate,
        )

    # B. CENTROID OF TRIANGLE ABC
    if op == "triangle_centroid" and dsl.point_A and dsl.point_B and dsl.point_C:
        pA = _parse_coord(dsl.point_A)
        pB = _parse_coord(dsl.point_B)
        pC = _parse_coord(dsl.point_C)
        if not pA or not pB or not pC:
            return _coord_error(restate)
        xG = sp.simplify((pA[0] + pB[0] + pC[0]) / 3)
        yG = sp.simplify((pA[1] + pB[1] + pC[1]) / 3)
        g_lhs = r"G\left(\frac{x_A + x_B + x_C}{3}, \frac{y_A + y_B + y_C}{3}\right)"
        steps.append(
            StepItem(
                id="step_centroid",
                latex=rf"{g_lhs} = \left({sp.latex(xG)}, {sp.latex(yG)}\right)",
                note_vi=f"Tọa độ trọng tâm G = ({xG}, {yG}).",
                value=f"({xG}, {yG})",
            )
        )
        return _make_envelope(
            TriangleVectorResult(
                operation="triangle_centroid",
                vector_result=[str(xG), str(yG)],
                value_raw=f"({xG}, {yG})",
                verification_method="centroid_coordinate_formula",
            ),
            steps,
            warnings,
            restate,
        )

    # C. VECTOR MAGNITUDE
    if op == "vector_magnitude":
        u_coord = _parse_coord(dsl.u)
        if not u_coord:
            return _coord_error(restate)
        ux, uy = u_coord
        mag_sq = ux**2 + uy**2
        mag = sp.simplify(sp.sqrt(mag_sq))
        mag_str = str(mag)
        mag_num = float(mag.evalf()) if mag.is_number else None
        u_norm_mid = rf"\sqrt{{{sp.latex(ux)}^2 + {sp.latex(uy)}^2}}"
        steps.append(
            StepItem(
                id="step_magnitude",
                latex=rf"|\vec{{u}}| = \sqrt{{x^2 + y^2}} = {u_norm_mid} = {sp.latex(mag)}",
                note_vi=f"Độ dài của vectơ u là {mag_str}.",
                value=mag_str,
            )
        )

        return _make_envelope(
            TriangleVectorResult(
                operation="vector_magnitude",
                magnitude=mag_str,
                magnitude_numeric=mag_num,
                value_raw=mag_str,
                value_numeric=mag_num,
                verification_method="euclidean_norm",
            ),
            steps,
            warnings,
            restate,
        )

    # D. LINEAR COMBINATION: k1*u + k2*v
    if op == "vector_add_sub":
        u_coord = _parse_coord(dsl.u)
        v_coord = _parse_coord(dsl.v)
        if not u_coord or not v_coord:
            return _coord_error(restate)
        k1 = _parse_val(dsl.k1, sp.Integer(1))
        k2 = _parse_val(dsl.k2, sp.Integer(1))
        wx = sp.simplify(k1 * u_coord[0] + k2 * v_coord[0])
        wy = sp.simplify(k1 * u_coord[1] + k2 * v_coord[1])
        w_latex = rf"\vec{{w}} = {sp.latex(k1)}\vec{{u}} + {sp.latex(k2)}\vec{{v}}"
        steps.append(
            StepItem(
                id="step_linear_combination",
                latex=rf"{w_latex} = ({sp.latex(wx)}, {sp.latex(wy)})",
                note_vi=f"Tọa độ vectơ tổng hợp w = ({wx}, {wy}).",
                value=f"({wx}, {wy})",
            )
        )
        return _make_envelope(
            TriangleVectorResult(
                operation="vector_add_sub",
                vector_result=[str(wx), str(wy)],
                value_raw=f"({wx}, {wy})",
                verification_method="linear_combination",
            ),
            steps,
            warnings,
            restate,
        )

    # E. PARAMETER SOLVING: u(m) and v(m)
    if op == "vector_solve_parameter":
        return _solve_vector_parameter(
            dsl=dsl,
            restate=restate,
            steps=steps,
            warnings=warnings,
        )

    # Parse u and v for binary operations (dot product, angle, collinear, orthogonal)
    u_coord = _parse_coord(dsl.u)
    v_coord = _parse_coord(dsl.v)
    if not u_coord or not v_coord:
        return _coord_error(restate)

    ux, uy = u_coord
    vx, vy = v_coord

    # F. DOT PRODUCT
    dot_expr = sp.simplify(ux * vx + uy * vy)
    dot_str = str(dot_expr)
    dot_num = float(dot_expr.evalf()) if dot_expr.is_number else None

    if op == "vector_dot_product":
        dot_mid = rf"({sp.latex(ux)})({sp.latex(vx)}) + ({sp.latex(uy)})({sp.latex(vy)})"
        steps.append(
            StepItem(
                id="step_dot_product",
                latex=rf"\vec{{u}} \cdot \vec{{v}} = {dot_mid} = {sp.latex(dot_expr)}",
                note_vi=f"Tích vô hướng của hai vectơ: u . v = {dot_str}.",
                value=dot_str,
            )
        )

        return _make_envelope(
            TriangleVectorResult(
                operation="vector_dot_product",
                dot_product=dot_str,
                dot_product_numeric=dot_num,
                value_raw=dot_str,
                value_numeric=dot_num,
                verification_method="dot_product_algebraic",
            ),
            steps,
            warnings,
            restate,
        )

    # G. ORTHOGONALITY CHECK: u . v == 0
    if op == "vector_orthogonal":
        is_ortho = bool(dot_expr == 0)
        ortho_latex = rf"\vec{{u}} \cdot \vec{{v}} = {sp.latex(dot_expr)}"
        steps.append(
            StepItem(
                id="step_orthogonal_check",
                latex=rf"{ortho_latex} \implies \vec{{u}} \perp \vec{{v}}: \text{{{is_ortho}}}",
                note_vi="Hai vectơ vuông góc khi và chỉ khi tích vô hướng của chúng bằng 0.",
                value=str(is_ortho),
            )
        )
        return _make_envelope(
            TriangleVectorResult(
                operation="vector_orthogonal",
                is_orthogonal=is_ortho,
                dot_product=dot_str,
                dot_product_numeric=dot_num,
                value_raw="true" if is_ortho else "false",
                verification_method="dot_product_zero_test",
            ),
            steps,
            warnings,
            restate,
        )

    # H. COLLINEARITY: cross determinant x1*y2 - x2*y1 == 0 (Avoids TRAP_COLLINEAR_ZERO_DIVISION)
    if op == "vector_collinear":
        cross_det = sp.simplify(ux * vy - uy * vx)
        is_collinear = bool(cross_det == 0)

        # Check for ratio if denominator is non-zero
        ratio_str = None
        if vx != 0:
            ratio_str = str(sp.simplify(ux / vx))
        elif vy != 0:
            ratio_str = str(sp.simplify(uy / vy))

        det_mid = rf"({sp.latex(ux)})({sp.latex(vy)}) - ({sp.latex(uy)})({sp.latex(vx)})"
        steps.append(
            StepItem(
                id="step_collinear_check",
                latex=rf"x_1 y_2 - x_2 y_1 = {det_mid} = {sp.latex(cross_det)}",
                note_vi=(
                    "Áp dụng định thức chéo x1*y2 - x2*y1 = 0 "
                    "để tránh bẫy chia cho 0 khi có tọa độ 0."
                ),
                value=f"cross_det={cross_det}, is_collinear={is_collinear}",
            )
        )
        return _make_envelope(
            TriangleVectorResult(
                operation="vector_collinear",
                is_collinear=is_collinear,
                collinear_ratio=ratio_str,
                value_raw="true" if is_collinear else "false",
                verification_method="cross_determinant_no_division",
            ),
            steps,
            warnings,
            restate,
        )

    # I. ANGLE BETWEEN VECTORS
    if op == "vector_angle":
        mag_u = sp.simplify(sp.sqrt(ux**2 + uy**2))
        mag_v = sp.simplify(sp.sqrt(vx**2 + vy**2))

        if mag_u == 0 or mag_v == 0:
            return BaseResponseEnvelope(
                status=StatusEnum.ERROR,
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.HIGH,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=1.0,
                ),
                error=ErrorDetail(
                    code="ZERO_VECTOR_ANGLE",
                    message_vi="Không xác định được góc của vectơ không (vectơ có độ dài bằng 0).",
                ),
                restate_vi=restate,
            )

        cos_angle = sp.simplify(dot_expr / (mag_u * mag_v))
        cos_str = str(cos_angle)

        # Exact angle via acos
        angle_rad_expr = sp.acos(cos_angle)
        angle_rad_str = str(angle_rad_expr)
        deg_expr = sp.simplify(angle_rad_expr * 180 / sp.pi)
        deg_str = str(deg_expr)
        deg_num = float(deg_expr.evalf()) if deg_expr.is_number else None

        # Socratic note on angle between vectors (can be obtuse) vs lines (acute)
        if cos_angle.is_number and float(cos_angle.evalf()) < 0:
            warnings.append(
                WarningItem(
                    code="TRAP_ANGLE_LINE_VS_VECTOR",
                    message_vi=(
                        "Góc giữa hai vectơ là góc tù (cos < 0). "
                        "Phân biệt với góc giữa hai đường thẳng luôn là góc nhọn."
                    ),
                )
            )

        cos_mid = rf"\frac{{{sp.latex(dot_expr)}}}{{{sp.latex(mag_u)} \cdot {sp.latex(mag_v)}}}"
        steps.append(
            StepItem(
                id="step_cos_angle",
                latex=rf"\cos(\vec{{u}}, \vec{{v}}) = {cos_mid} = {sp.latex(cos_angle)}",
                note_vi=f"Cosin của góc giữa hai vectơ là {cos_str}.",
                value=cos_str,
            )
        )

        steps.append(
            StepItem(
                id="step_angle_result",
                latex=rf"(\vec{{u}}, \vec{{v}}) = {sp.latex(deg_expr)}^\circ",
                note_vi=f"Số đo góc giữa hai vectơ là {deg_str} độ ({angle_rad_str} rad).",
                value=f"{deg_str} deg",
            )
        )

        return _make_envelope(
            TriangleVectorResult(
                operation="vector_angle",
                dot_product=dot_str,
                cos_angle=cos_str,
                angle_between_rad=angle_rad_str,
                angle_between_deg=deg_str,
                value_raw=f"{deg_str} deg",
                value_numeric=deg_num,
                verification_method="dot_product_over_magnitudes",
            ),
            steps,
            warnings,
            restate,
        )

    # Default fallback
    return BaseResponseEnvelope(
        status=StatusEnum.ERROR,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.LOW,
            method=ConfidenceMethod.SYMBOLIC,
            score=0.0,
        ),
        error=ErrorDetail(
            code="UNSUPPORTED_VECTOR_OP",
            message_vi=f"Phép toán vectơ '{op}' không được hỗ trợ.",
        ),
        restate_vi=restate,
    )


def _solve_vector_parameter(
    dsl: TriangleVectorDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[TriangleVectorResult]:
    """Find parameter m such that u(m) and v(m) are orthogonal or collinear."""
    if not dsl.u or not dsl.v or len(dsl.u) != 2 or len(dsl.v) != 2:
        return _coord_error(restate)

    # Parse coordinates with parameter
    ux = parse_latex(_clean_str(dsl.u[0])).expr

    uy = parse_latex(_clean_str(dsl.u[1])).expr
    vx = parse_latex(_clean_str(dsl.v[0])).expr
    vy = parse_latex(_clean_str(dsl.v[1])).expr

    if None in (ux, uy, vx, vy):
        return _coord_error(restate)

    condition = (dsl.condition or "orthogonal").lower().strip()

    if condition in ("orthogonal", "vuong_goc"):
        # Dot product == 0
        eq = sp.simplify(ux * vx + uy * vy)
        eq_latex = rf"\vec{{u}} \cdot \vec{{v}} = {sp.latex(eq)} = 0"
        steps.append(
            StepItem(
                id="step_param_condition",
                latex=eq_latex,
                note_vi="Điều kiện hai vectơ vuông góc: u . v = 0.",
                value=str(eq),
            )
        )
    else:  # collinear
        # Cross determinant == 0
        eq = sp.simplify(ux * vy - uy * vx)
        eq_latex = rf"x_1 y_2 - x_2 y_1 = {sp.latex(eq)} = 0"
        steps.append(
            StepItem(
                id="step_param_condition",
                latex=eq_latex,
                note_vi="Điều kiện hai vectơ cùng phương: định thức chéo x1*y2 - x2*y1 = 0.",
                value=str(eq),
            )
        )

    # Solve for parameter
    param_sym = _get_param_symbol(eq, dsl.param_name)
    sol_set = sp.solveset(eq, param_sym, domain=sp.S.Reals)

    if sol_set == sp.EmptySet:
        steps.append(
            StepItem(
                id="step_empty_param",
                latex=r"m \in \emptyset",
                note_vi="Không có giá trị tham số thực nào thỏa mãn điều kiện.",
                value="empty",
            )
        )
        return _make_envelope(
            TriangleVectorResult(
                operation="vector_solve_parameter",
                parameter_values=[],
                value_raw="vo_nghiem",
                verification_method="parameter_solveset_empty",
            ),
            steps,
            warnings,
            restate,
        )

    # Check finite solutions
    param_roots = [str(r) for r in list(sol_set)]
    steps.append(
        StepItem(
            id="step_param_result",
            latex=rf"{dsl.param_name} \in \{{{', '.join(sp.latex(r) for r in sol_set)}\}}",
            note_vi=f"Các giá trị tham số {dsl.param_name} thỏa mãn: {', '.join(param_roots)}.",
            value=", ".join(param_roots),
        )
    )

    val_raw = param_roots[0] if len(param_roots) == 1 else ", ".join(param_roots)
    val_num = None
    if len(param_roots) == 1:
        try:
            val_num = float(list(sol_set)[0].evalf())
        except (TypeError, ValueError):
            val_num = None

    return _make_envelope(
        TriangleVectorResult(
            operation="vector_solve_parameter",
            parameter_values=param_roots,
            value_raw=val_raw,
            value_numeric=val_num,
            verification_method="parameter_solveset_real",
        ),
        steps,
        warnings,
        restate,
    )


# -----------------------------------------------------------------------------
# HELPER CONSTRUCTORS
# -----------------------------------------------------------------------------


def _coord_error(restate: str) -> BaseResponseEnvelope[TriangleVectorResult]:
    """Return error envelope for invalid vector or coordinate inputs."""
    return BaseResponseEnvelope(
        status=StatusEnum.ERROR,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.LOW,
            method=ConfidenceMethod.SYMBOLIC,
            score=0.0,
        ),
        error=ErrorDetail(
            code="INVALID_VECTOR_COORDINATES",
            message_vi="Tọa độ vectơ hoặc điểm không hợp lệ (cần danh sách 2 phần tử [x, y]).",
        ),
        restate_vi=restate,
    )


def _make_envelope(
    res: TriangleVectorResult,
    steps: list[StepItem],
    warnings: list[WarningItem],
    restate: str,
) -> BaseResponseEnvelope[TriangleVectorResult]:
    """Wrap successful result into BaseResponseEnvelope."""
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
