"""
Pure 3D Cartesian Coordinate Geometry (Oxyz) CAS Solver
Deterministic solver for:
- Plane equations (from point & normal, 3 points, perpendicular bisector, parallel plane)
- Normal vector of a plane
- Line equations (canonical, parametric, from 2 points, perpendicular to plane)
- Direction vector of a line
- Sphere center, radius, and equations (from general form, standard form, tangent to plane)
- Distance calculations (point-to-plane, parallel planes, point-to-point, point-to-line, skew lines)
- Angle calculations (between planes, between lines, between line & plane, between vectors)
- 3D Vector operations (dot product, cross product)
- Projections and intersections in Oxyz space
Strict mathematical rigor adhering to GEMINI.md standards and cognitive trap prevention.
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
    WarningItem,
)
from app.schemas.dsl import GeometryOxyzDSL
from app.schemas.geometry_oxyz import GeometryOxyzResult
from app.schemas.traps import MisconceptionTrapEnum
from app.solvers.registry import register_solver


def _clean_str(s: str) -> str:
    """Clean math delimiters and whitespace."""
    s = s.strip()
    if s.startswith(r"\(") and s.endswith(r"\)"):
        s = s[2:-2].strip()
    if s.startswith("$") and s.endswith("$"):
        s = s[1:-1].strip()
    return s


def _parse_val(s: Any, default: Any = None) -> sp.Expr | None:
    """Safely parse mathematical value using parse_latex."""
    if s is None:
        return default
    if isinstance(s, int):
        return sp.Integer(s)
    if isinstance(s, float):
        return sp.Float(s)
    cleaned = _clean_str(str(s))
    if not cleaned:
        return default
    parsed = parse_latex(cleaned)
    if parsed.is_success and parsed.expr is not None:
        return parsed.expr
    if "/" in cleaned:
        parts = cleaned.split("/")
        if len(parts) == 2:
            p1, p2 = parts[0].strip(), parts[1].strip()
            if p1.lstrip("-").isdigit() and p2.isdigit():
                return sp.Rational(int(p1), int(p2))
    if cleaned.lstrip("-").isdigit():
        return sp.Integer(int(cleaned))
    return default


def _parse_coord_3d(
    coord: list[str] | tuple[Any, ...] | None,
) -> tuple[sp.Expr, sp.Expr, sp.Expr] | None:
    """Parse 3D coordinates [x, y, z]."""
    if not coord or len(coord) != 3:
        return None
    x = _parse_val(coord[0])
    y = _parse_val(coord[1])
    z = _parse_val(coord[2])
    if x is None or y is None or z is None:
        return None
    return x, y, z


def _parse_plane_eq(
    plane_str: str | None,
    coeffs: list[str] | None = None,
) -> tuple[sp.Expr, sp.Expr, sp.Expr, sp.Expr] | None:
    """
    Parse plane equation into coefficients (A, B, C, D) for Ax + By + Cz + D = 0.
    Supports special coordinate planes: (Oxy) -> z=0, (Oyz) -> x=0, (Oxz) -> y=0.
    """
    if coeffs and len(coeffs) == 4:
        A = _parse_val(coeffs[0])
        B = _parse_val(coeffs[1])
        C = _parse_val(coeffs[2])
        D = _parse_val(coeffs[3])
        if all(c is not None for c in (A, B, C, D)):
            return A, B, C, D

    if not plane_str:
        return None

    s = _clean_str(plane_str)
    # Check special coordinate planes
    s_lower = s.lower().replace(" ", "")
    if "(oxy)" in s_lower or "oxy" == s_lower:
        return sp.Integer(0), sp.Integer(0), sp.Integer(1), sp.Integer(0)
    if "(oyz)" in s_lower or "oyz" == s_lower:
        return sp.Integer(1), sp.Integer(0), sp.Integer(0), sp.Integer(0)
    if "(oxz)" in s_lower or "oxz" == s_lower:
        return sp.Integer(0), sp.Integer(1), sp.Integer(0), sp.Integer(0)

    # Strip label prefix e.g. (P): or (Q):
    if ":" in s:
        s = s.split(":", 1)[1].strip()

    if "=" in s:
        lhs, rhs = s.split("=", 1)
        lhs_expr = _parse_val(lhs)
        rhs_expr = _parse_val(rhs)
        if lhs_expr is None or rhs_expr is None:
            return None
        expr = sp.expand(lhs_expr - rhs_expr)
    else:
        expr_raw = _parse_val(s)
        if expr_raw is None:
            return None
        expr = sp.expand(expr_raw)

    sym_map = {sym.name: sym for sym in expr.free_symbols}
    sx = sym_map.get("x", sp.Symbol("x"))
    sy = sym_map.get("y", sp.Symbol("y"))
    sz = sym_map.get("z", sp.Symbol("z"))

    A = sp.diff(expr, sx)
    B = sp.diff(expr, sy)
    C = sp.diff(expr, sz)
    D = expr.subs({sx: 0, sy: 0, sz: 0})

    if A == 0 and B == 0 and C == 0:
        return None
    return A, B, C, D


def _parse_line_eq(
    line_str: str | None,
    pt: list[str] | None = None,
    dir_vec: list[str] | None = None,
) -> tuple[tuple[sp.Expr, sp.Expr, sp.Expr], tuple[sp.Expr, sp.Expr, sp.Expr]] | None:
    """
    Parse line into (M0, u) where M0 = (x0, y0, z0) is a pass-through point
    and u = (a, b, c) is a direction vector.
    """
    if pt and dir_vec:
        p = _parse_coord_3d(pt)
        d = _parse_coord_3d(dir_vec)
        if p and d:
            return p, d

    if not line_str:
        return None

    s = _clean_str(line_str)
    if ":" in s:
        s = s.split(":", 1)[1].strip()

    parts = s.split("=")
    if len(parts) != 3:
        return None

    res_pt: dict[str, sp.Expr] = {}
    res_dir: dict[str, sp.Expr] = {}

    for part in parts:
        part = part.strip()
        expr = _parse_val(part)
        if expr is None:
            return None

        num, den = expr.as_numer_denom()
        syms = [sym for sym in num.free_symbols if sym.name in ("x", "y", "z")]
        if not syms:
            # Check if variable is in denominator or elsewhere
            syms = [sym for sym in expr.free_symbols if sym.name in ("x", "y", "z")]
            if not syms:
                continue
        var = syms[0]
        x0_sols = sp.solve(num, var)
        x0 = x0_sols[0] if x0_sols else sp.Integer(0)
        coeff = sp.diff(num, var)
        a = den / coeff if coeff != 0 else den
        res_pt[var.name] = sp.simplify(x0)
        res_dir[var.name] = sp.simplify(a)

    if not all(k in res_pt for k in ("x", "y", "z")):
        return None

    pt_3d = (res_pt["x"], res_pt["y"], res_pt["z"])
    dir_3d = (res_dir["x"], res_dir["y"], res_dir["z"])
    return pt_3d, dir_3d


def _parse_sphere_eq(
    sphere_str: str | None,
) -> tuple[tuple[sp.Expr, sp.Expr, sp.Expr], sp.Expr] | None:
    """
    Parse sphere equation (general or standard) into (center(a, b, c), R^2).
    """
    if not sphere_str:
        return None

    s = _clean_str(sphere_str)
    if ":" in s:
        s = s.split(":", 1)[1].strip()

    if "=" in s:
        lhs, rhs = s.split("=", 1)
        lhs_expr = _parse_val(lhs)
        rhs_expr = _parse_val(rhs)
        if lhs_expr is None or rhs_expr is None:
            return None
        expr = sp.expand(lhs_expr - rhs_expr)
    else:
        expr_raw = _parse_val(s)
        if expr_raw is None:
            return None
        expr = sp.expand(expr_raw)

    sym_map = {sym.name: sym for sym in expr.free_symbols}
    sx = sym_map.get("x", sp.Symbol("x"))
    sy = sym_map.get("y", sp.Symbol("y"))
    sz = sym_map.get("z", sp.Symbol("z"))

    k = expr.coeff(sx, 2)
    if k == 0:
        return None
    expr = sp.expand(expr / k)

    lin_x = expr.coeff(sx, 1).subs({sy: 0, sz: 0})
    lin_y = expr.coeff(sy, 1).subs({sx: 0, sz: 0})
    lin_z = expr.coeff(sz, 1).subs({sx: 0, sz: 0})
    d = expr.subs({sx: 0, sy: 0, sz: 0})

    a = sp.simplify(-lin_x / 2)
    b = sp.simplify(-lin_y / 2)
    c = sp.simplify(-lin_z / 2)
    r_sq = sp.simplify(a**2 + b**2 + c**2 - d)

    return (a, b, c), r_sq


def _format_plane_equation(A: sp.Expr, B: sp.Expr, C: sp.Expr, D: sp.Expr) -> tuple[str, list[str]]:
    """Format plane equation Ax + By + Cz + D = 0 with normalized integer coefficients."""
    A_val, B_val, C_val, D_val = A, B, C, D
    # Clear denominators if rational
    dens = [c.as_numer_denom()[1] for c in (A_val, B_val, C_val, D_val)]
    try:
        int_dens = [int(d) for d in dens if d.is_integer]
        lcm_den = sp.ilcm(*int_dens) if int_dens else 1
    except Exception:
        lcm_den = 1

    A_sc = sp.simplify(A_val * lcm_den)
    B_sc = sp.simplify(B_val * lcm_den)
    C_sc = sp.simplify(C_val * lcm_den)
    D_sc = sp.simplify(D_val * lcm_den)

    if all(c.is_integer for c in (A_sc, B_sc, C_sc, D_sc)):
        non_zeros = [abs(int(c)) for c in (A_sc, B_sc, C_sc, D_sc) if c != 0]
        if non_zeros:
            g = sp.igcd(*non_zeros)
            if g > 1:
                A_sc = A_sc / g
                B_sc = B_sc / g
                C_sc = C_sc / g
                D_sc = D_sc / g

    # Normalize sign so first non-zero normal component is positive
    for c in (A_sc, B_sc, C_sc):
        if c != 0:
            if c < 0:
                A_sc, B_sc, C_sc, D_sc = -A_sc, -B_sc, -C_sc, -D_sc
            break

    x, y, z = sp.symbols("x y z")
    poly = A_sc * x + B_sc * y + C_sc * z + D_sc
    return f"{poly} = 0", [str(A_sc), str(B_sc), str(C_sc), str(D_sc)]


def _format_canonical_line(
    M0: tuple[sp.Expr, sp.Expr, sp.Expr],
    u: tuple[sp.Expr, sp.Expr, sp.Expr],
) -> str:
    """Format canonical line equation (x - x0)/a = (y - y0)/b = (z - z0)/c."""

    def _term(var_name: str, val: sp.Expr, den: sp.Expr) -> str:
        if val == 0:
            num = var_name
        elif val > 0:
            num = f"({var_name} - {val})"
        else:
            num = f"({var_name} + {-val})"
        return f"{num}/{den}"

    return f"{_term('x', M0[0], u[0])} = {_term('y', M0[1], u[1])} = {_term('z', M0[2], u[2])}"


def _format_vector(u: tuple[sp.Expr, sp.Expr, sp.Expr]) -> tuple[str, list[str]]:
    """Format 3D vector as (x, y, z) string and [x, y, z] list."""
    coords = [str(sp.simplify(c)) for c in u]
    return f"({coords[0]}, {coords[1]}, {coords[2]})", coords


@register_solver("phuong_phap_toa_do_hoa_oxyz_thuan_tuy")
@register_solver("hinh_hoc_oxyz")
@register_solver("oxyz")
@register_solver("geometry_oxyz")
def solve_geometry_oxyz(
    dsl: GeometryOxyzDSL,
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """
    Main entry point for Pure 3D Cartesian Coordinate Geometry (Oxyz) CAS Solver.
    Dispatches to planes, lines, spheres, distances, angles, vectors, or projections.
    """
    restate = dsl.restate_vi or "Giải bài toán phương pháp tọa độ hóa Oxyz thuần túy."
    steps: list[StepItem] = []
    warnings: list[WarningItem] = []
    op = dsl.operation.lower().strip()

    # 1. Plane normal vector
    if op == "plane_normal_vector":
        return _solve_plane_normal_vector(dsl, restate, steps, warnings)

    # 2. Plane from point and normal
    if op == "plane_from_point_and_normal":
        return _solve_plane_from_point_and_normal(dsl, restate, steps, warnings)

    # 3. Plane from 3 points
    if op == "plane_from_3_points":
        return _solve_plane_from_3_points(dsl, restate, steps, warnings)

    # 4. Plane perpendicular bisector
    if op == "plane_perpendicular_bisector":
        return _solve_plane_perpendicular_bisector(dsl, restate, steps, warnings)

    # 5. Plane parallel through point
    if op == "plane_parallel_through_point":
        return _solve_plane_parallel_through_point(dsl, restate, steps, warnings)

    # 6. Line direction vector
    if op == "line_direction_vector":
        return _solve_line_direction_vector(dsl, restate, steps, warnings)

    # 7. Line canonical equation
    if op == "line_canonical_equation":
        return _solve_line_canonical_equation(dsl, restate, steps, warnings)

    # 8. Line parametric equation
    if op == "line_parametric_equation":
        return _solve_line_parametric_equation(dsl, restate, steps, warnings)

    # 9. Line from 2 points
    if op == "line_from_2_points":
        return _solve_line_from_2_points(dsl, restate, steps, warnings)

    # 10. Sphere from equation (center and radius)
    if op == "sphere_from_equation":
        return _solve_sphere_from_equation(dsl, restate, steps, warnings)

    # 11. Sphere equation from center and radius
    if op == "sphere_equation_from_center_and_radius":
        return _solve_sphere_equation_from_center_and_radius(dsl, restate, steps, warnings)

    # 12. Sphere tangent to plane
    if op == "sphere_tangent_to_plane":
        return _solve_sphere_tangent_to_plane(dsl, restate, steps, warnings)

    # 13. Distance point to plane
    if op == "distance_point_to_plane":
        return _solve_distance_point_to_plane(dsl, restate, steps, warnings)

    # 14. Distance parallel planes
    if op == "distance_parallel_planes":
        return _solve_distance_parallel_planes(dsl, restate, steps, warnings)

    # 15. Distance point to point
    if op == "distance_point_to_point":
        return _solve_distance_point_to_point(dsl, restate, steps, warnings)

    # 16. Distance point to line
    if op == "distance_point_to_line":
        return _solve_distance_point_to_line(dsl, restate, steps, warnings)

    # 17. Distance skew lines
    if op == "distance_skew_lines":
        return _solve_distance_skew_lines(dsl, restate, steps, warnings)

    # 18. Angle between planes
    if op == "angle_between_planes":
        return _solve_angle_between_planes(dsl, restate, steps, warnings)

    # 19. Angle between lines
    if op == "angle_between_lines":
        return _solve_angle_between_lines(dsl, restate, steps, warnings)

    # 20. Angle between line and plane
    if op == "angle_between_line_and_plane":
        return _solve_angle_between_line_and_plane(dsl, restate, steps, warnings)

    # 21. Angle between vectors 3D
    if op == "angle_between_vectors_3d":
        return _solve_angle_between_vectors_3d(dsl, restate, steps, warnings)

    # 22. Vector cross product 3D
    if op == "vector_cross_product_3d":
        return _solve_vector_cross_product_3d(dsl, restate, steps, warnings)

    # 23. Vector dot product 3D
    if op == "vector_dot_product_3d":
        return _solve_vector_dot_product_3d(dsl, restate, steps, warnings)

    # 24. Point projection on plane
    if op == "point_projection_on_plane":
        return _solve_point_projection_on_plane(dsl, restate, steps, warnings)

    # 25. Intersection line and plane
    if op == "intersection_line_plane":
        return _solve_intersection_line_plane(dsl, restate, steps, warnings)

    return BaseResponseEnvelope(
        status=StatusEnum.ERROR,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.LOW,
            method=ConfidenceMethod.SYMBOLIC,
            score=0.0,
        ),
        error=ErrorDetail(
            code="UNSUPPORTED_OPERATION",
            message_vi=f"Phép toán Oxyz '{dsl.operation}' chưa được hỗ trợ.",
        ),
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# 1. PLANE NORMAL VECTOR
# -----------------------------------------------------------------------------


def _solve_plane_normal_vector(
    dsl: GeometryOxyzDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """Find normal vector of a given plane (P): Ax + By + Cz + D = 0."""
    parsed_plane = _parse_plane_eq(dsl.plane_P, dsl.plane_coeffs)
    if not parsed_plane:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="INVALID_PLANE",
                message_vi="Không thể trích xuất phương trình mặt phẳng hợp lệ.",
            ),
            restate_vi=restate,
        )

    A, B, C, D = parsed_plane
    normal_vec = (A, B, C)
    vec_str, vec_list = _format_vector(normal_vec)

    steps.append(
        StepItem(
            id="step_normal_vector",
            latex=rf"\vec{{n}} = ({sp.latex(A)}, {sp.latex(B)}, {sp.latex(C)})",
            note_vi=f"Từ phương trình mặt phẳng, vectơ pháp tuyến là n = {vec_str}.",
            value=vec_str,
        )
    )

    result = GeometryOxyzResult(
        operation="plane_normal_vector",
        vector=vec_list,
        plane_normal=vec_list,
        plane_coeffs=[str(A), str(B), str(C), str(D)],
        value_raw=vec_str,
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=result,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# 2. PLANE FROM POINT AND NORMAL
# -----------------------------------------------------------------------------


def _solve_plane_from_point_and_normal(
    dsl: GeometryOxyzDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """Construct plane equation from point M0(x0, y0, z0) and normal n(A, B, C)."""
    pt = _parse_coord_3d(dsl.point_M or dsl.point_A)
    norm = _parse_coord_3d(dsl.vector_n or dsl.vector_u)
    if not pt or not norm:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_INPUTS",
                message_vi="Cần cung cấp điểm đi qua và vectơ pháp tuyến của mặt phẳng.",
            ),
            restate_vi=restate,
        )

    x0, y0, z0 = pt
    A, B, C = norm
    if A == 0 and B == 0 and C == 0:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="ZERO_NORMAL_VECTOR",
                message_vi="Vectơ pháp tuyến không thể là vectơ không (0, 0, 0).",
            ),
            restate_vi=restate,
        )

    D = -(A * x0 + B * y0 + C * z0)
    eq_str, coeffs = _format_plane_equation(A, B, C, D)

    steps.append(
        StepItem(
            id="step_plane_form",
            latex=(
                rf"{sp.latex(A)}(x - {sp.latex(x0)}) + "
                rf"{sp.latex(B)}(y - {sp.latex(y0)}) + "
                rf"{sp.latex(C)}(z - {sp.latex(z0)}) = 0"
            ),
            note_vi="Áp dụng công thức mặt phẳng qua M0: A(x - x0) + B(y - y0) + C(z - z0) = 0.",
            value=f"D = {D}",
        )
    )
    steps.append(
        StepItem(
            id="step_plane_simplified",
            latex=eq_str,
            note_vi=f"Khai triển và rút gọn phương trình mặt phẳng: {eq_str}.",
            value=eq_str,
        )
    )

    result = GeometryOxyzResult(
        operation="plane_from_point_and_normal",
        plane_equation=eq_str,
        plane_coeffs=coeffs,
        plane_normal=[str(A), str(B), str(C)],
        point=[str(x0), str(y0), str(z0)],
        value_raw=eq_str,
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=result,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# 3. PLANE FROM 3 POINTS
# -----------------------------------------------------------------------------


def _solve_plane_from_3_points(
    dsl: GeometryOxyzDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """Construct plane equation passing through three non-collinear points A, B, C."""
    pt_A = _parse_coord_3d(dsl.point_A)
    pt_B = _parse_coord_3d(dsl.point_B)
    pt_C = _parse_coord_3d(dsl.point_C)

    if not pt_A or not pt_B or not pt_C:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_POINTS",
                message_vi="Cần cung cấp đủ tọa độ 3 điểm A, B, C.",
            ),
            restate_vi=restate,
        )

    # Vector AB and AC
    u = (pt_B[0] - pt_A[0], pt_B[1] - pt_A[1], pt_B[2] - pt_A[2])
    v = (pt_C[0] - pt_A[0], pt_C[1] - pt_A[1], pt_C[2] - pt_A[2])

    # Normal n = [u, v]
    nx = u[1] * v[2] - u[2] * v[1]
    ny = u[2] * v[0] - u[0] * v[2]
    nz = u[0] * v[1] - u[1] * v[0]

    if nx == 0 and ny == 0 and nz == 0:
        warnings.append(
            WarningItem(
                code=MisconceptionTrapEnum.TRAP_COLLINEAR_ZERO_DIVISION,
                message_vi=(
                    "Ba điểm A, B, C thẳng hàng, không xác định được duy nhất một mặt phẳng "
                    f"({MisconceptionTrapEnum.TRAP_COLLINEAR_ZERO_DIVISION})."
                ),
            )
        )
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code=MisconceptionTrapEnum.TRAP_COLLINEAR_ZERO_DIVISION,
                message_vi="Ba điểm thẳng hàng không tạo thành một mặt phẳng duy nhất.",
            ),
            restate_vi=restate,
        )

    D = -(nx * pt_A[0] + ny * pt_A[1] + nz * pt_A[2])
    eq_str, coeffs = _format_plane_equation(nx, ny, nz, D)

    steps.append(
        StepItem(
            id="step_direction_vectors",
            latex=(
                rf"\vec{{AB}} = ({sp.latex(u[0])}, {sp.latex(u[1])}, {sp.latex(u[2])}),\ "
                rf"\vec{{AC}} = ({sp.latex(v[0])}, {sp.latex(v[1])}, {sp.latex(v[2])})"
            ),
            note_vi="Xác định hai vectơ chỉ phương của mặt phẳng AB và AC.",
            value=f"AB={u}, AC={v}",
        )
    )
    steps.append(
        StepItem(
            id="step_cross_product_normal",
            latex=(
                rf"\vec{{n}} = [\vec{{AB}}, \vec{{AC}}] = "
                rf"({sp.latex(nx)}, {sp.latex(ny)}, {sp.latex(nz)})"
            ),
            note_vi="Tính tích có hướng n = [AB, AC] để làm vectơ pháp tuyến.",
            value=f"n=({nx}, {ny}, {nz})",
        )
    )
    steps.append(
        StepItem(
            id="step_plane_equation",
            latex=eq_str,
            note_vi=f"Phương trình mặt phẳng qua A với pháp tuyến n: {eq_str}.",
            value=eq_str,
        )
    )

    result = GeometryOxyzResult(
        operation="plane_from_3_points",
        plane_equation=eq_str,
        plane_coeffs=coeffs,
        plane_normal=[str(nx), str(ny), str(nz)],
        value_raw=eq_str,
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=result,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# 4. PLANE PERPENDICULAR BISECTOR
# -----------------------------------------------------------------------------


def _solve_plane_perpendicular_bisector(
    dsl: GeometryOxyzDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """Construct perpendicular bisector plane of line segment AB."""
    pt_A = _parse_coord_3d(dsl.point_A)
    pt_B = _parse_coord_3d(dsl.point_B)

    if not pt_A or not pt_B:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_POINTS",
                message_vi="Cần cung cấp tọa độ hai điểm A và B.",
            ),
            restate_vi=restate,
        )

    # Midpoint M of AB
    mx = sp.simplify((pt_A[0] + pt_B[0]) / 2)
    my = sp.simplify((pt_A[1] + pt_B[1]) / 2)
    mz = sp.simplify((pt_A[2] + pt_B[2]) / 2)

    # Normal vector is AB = B - A
    nx = pt_B[0] - pt_A[0]
    ny = pt_B[1] - pt_A[1]
    nz = pt_B[2] - pt_A[2]

    if nx == 0 and ny == 0 and nz == 0:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="COINCIDENT_POINTS",
                message_vi="Hai điểm A và B trùng nhau, không xác định được mặt phẳng trung trực.",
            ),
            restate_vi=restate,
        )

    D = -(nx * mx + ny * my + nz * mz)
    eq_str, coeffs = _format_plane_equation(nx, ny, nz, D)

    steps.append(
        StepItem(
            id="step_midpoint",
            latex=rf"M\left({sp.latex(mx)}, {sp.latex(my)}, {sp.latex(mz)}\right)",
            note_vi="Tọa độ trung điểm M của đoạn thẳng AB: M = (A + B) / 2.",
            value=f"M=({mx}, {my}, {mz})",
        )
    )
    steps.append(
        StepItem(
            id="step_normal_ab",
            latex=rf"\vec{{n}} = \vec{{AB}} = ({sp.latex(nx)}, {sp.latex(ny)}, {sp.latex(nz)})",
            note_vi="Mặt phẳng trung trực nhận vectơ AB làm vectơ pháp tuyến.",
            value=f"n=({nx}, {ny}, {nz})",
        )
    )
    steps.append(
        StepItem(
            id="step_plane_eq",
            latex=eq_str,
            note_vi=f"Phương trình mặt phẳng trung trực: {eq_str}.",
            value=eq_str,
        )
    )

    result = GeometryOxyzResult(
        operation="plane_perpendicular_bisector",
        plane_equation=eq_str,
        plane_coeffs=coeffs,
        plane_normal=[str(nx), str(ny), str(nz)],
        point=[str(mx), str(my), str(mz)],
        value_raw=eq_str,
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=result,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# 5. PLANE PARALLEL THROUGH POINT
# -----------------------------------------------------------------------------


def _solve_plane_parallel_through_point(
    dsl: GeometryOxyzDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """Construct plane passing through point M and parallel to plane (P)."""
    pt = _parse_coord_3d(dsl.point_M or dsl.point_A)
    plane = _parse_plane_eq(dsl.plane_P, dsl.plane_coeffs)

    if not pt or not plane:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_INPUTS",
                message_vi="Cần cung cấp điểm đi qua và mặt phẳng song song.",
            ),
            restate_vi=restate,
        )

    x0, y0, z0 = pt
    A, B, C, _ = plane

    # Parallel plane has identical normal vector n = (A, B, C)
    D_new = -(A * x0 + B * y0 + C * z0)
    eq_str, coeffs = _format_plane_equation(A, B, C, D_new)

    steps.append(
        StepItem(
            id="step_parallel_normal",
            latex=(
                rf"\vec{{n}}_{{new}} = \vec{{n}}_P = "
                rf"({sp.latex(A)}, {sp.latex(B)}, {sp.latex(C)})"
            ),
            note_vi="Mặt phẳng song song với (P) nên nhận cùng vectơ pháp tuyến.",
            value=f"n=({A}, {B}, {C})",
        )
    )
    steps.append(
        StepItem(
            id="step_parallel_plane_eq",
            latex=eq_str,
            note_vi=f"Phương trình mặt phẳng đi qua điểm đã cho và song song với (P): {eq_str}.",
            value=eq_str,
        )
    )

    result = GeometryOxyzResult(
        operation="plane_parallel_through_point",
        plane_equation=eq_str,
        plane_coeffs=coeffs,
        plane_normal=[str(A), str(B), str(C)],
        point=[str(x0), str(y0), str(z0)],
        value_raw=eq_str,
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=result,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# 6. LINE DIRECTION VECTOR
# -----------------------------------------------------------------------------


def _solve_line_direction_vector(
    dsl: GeometryOxyzDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """Extract direction vector from line equation."""
    parsed_line = _parse_line_eq(dsl.line_d, dsl.line_point, dsl.line_direction)
    if not parsed_line:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="INVALID_LINE",
                message_vi="Không thể trích xuất phương trình đường thẳng hợp lệ.",
            ),
            restate_vi=restate,
        )

    M0, u = parsed_line
    u_str, u_list = _format_vector(u)

    steps.append(
        StepItem(
            id="step_direction_vector",
            latex=rf"\vec{{u}} = ({sp.latex(u[0])}, {sp.latex(u[1])}, {sp.latex(u[2])})",
            note_vi=f"Từ phương trình đường thẳng, vectơ chỉ phương là u = {u_str}.",
            value=u_str,
        )
    )

    result = GeometryOxyzResult(
        operation="line_direction_vector",
        vector=u_list,
        line_direction=u_list,
        line_point=[str(M0[0]), str(M0[1]), str(M0[2])],
        value_raw=u_str,
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=result,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# 7. LINE CANONICAL EQUATION
# -----------------------------------------------------------------------------


def _solve_line_canonical_equation(
    dsl: GeometryOxyzDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """
    Construct canonical line equation (x - x0)/a = (y - y0)/b = (z - z0)/c.
    Enforces GEMINI.md constraint: a * b * c != 0 (TRAP_LINE_CANONICAL_ZERO_DENOM).
    """
    pt = _parse_coord_3d(dsl.line_point or dsl.point_M or dsl.point_A)
    u = _parse_coord_3d(dsl.line_direction or dsl.vector_u)

    # If line is perpendicular to plane P
    if not u and dsl.plane_P:
        plane = _parse_plane_eq(dsl.plane_P, dsl.plane_coeffs)
        if plane:
            u = (plane[0], plane[1], plane[2])

    if not pt or not u:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_INPUTS",
                message_vi="Cần cung cấp điểm đi qua và vectơ chỉ phương của đường thẳng.",
            ),
            restate_vi=restate,
        )

    # Check zero denominator trap per GEMINI.md
    if u[0] == 0 or u[1] == 0 or u[2] == 0:
        warnings.append(
            WarningItem(
                code=MisconceptionTrapEnum.TRAP_LINE_CANONICAL_ZERO_DENOM,
                message_vi=(
                    "Dạng chính tắc yêu cầu a * b * c != 0. Vectơ chỉ phương có thành phần bằng 0 "
                    f"({MisconceptionTrapEnum.TRAP_LINE_CANONICAL_ZERO_DENOM}); "
                    "bắt buộc dùng dạng tham số."
                ),
            )
        )
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code=MisconceptionTrapEnum.TRAP_LINE_CANONICAL_ZERO_DENOM,
                message_vi=(
                    "Không thể viết dạng chính tắc khi vectơ chỉ phương có thành phần bằng 0."
                ),
            ),
            restate_vi=restate,
        )

    canon_str = _format_canonical_line(pt, u)
    t = sp.Symbol("t")
    param_dict = {
        "x": str(sp.simplify(pt[0] + u[0] * t)),
        "y": str(sp.simplify(pt[1] + u[1] * t)),
        "z": str(sp.simplify(pt[2] + u[2] * t)),
    }

    steps.append(
        StepItem(
            id="step_canonical_line",
            latex=canon_str,
            note_vi=(
                f"Phương trình chính tắc của đường thẳng qua M0({pt[0]}, {pt[1]}, {pt[2]}) "
                f"với VTCP u({u[0]}, {u[1]}, {u[2]}): {canon_str}."
            ),
            value=canon_str,
        )
    )

    result = GeometryOxyzResult(
        operation="line_canonical_equation",
        line_canonical=canon_str,
        line_parametric=param_dict,
        line_point=[str(pt[0]), str(pt[1]), str(pt[2])],
        line_direction=[str(u[0]), str(u[1]), str(u[2])],
        value_raw=canon_str,
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=result,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# 8. LINE PARAMETRIC EQUATION
# -----------------------------------------------------------------------------


def _solve_line_parametric_equation(
    dsl: GeometryOxyzDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """Construct parametric line equation x = x0 + at, y = y0 + bt, z = z0 + ct."""
    pt = _parse_coord_3d(dsl.line_point or dsl.point_M or dsl.point_A)
    u = _parse_coord_3d(dsl.line_direction or dsl.vector_u)

    if not u and dsl.plane_P:
        plane = _parse_plane_eq(dsl.plane_P, dsl.plane_coeffs)
        if plane:
            u = (plane[0], plane[1], plane[2])

    if not pt or not u:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_INPUTS",
                message_vi="Cần cung cấp điểm đi qua và vectơ chỉ phương của đường thẳng.",
            ),
            restate_vi=restate,
        )

    t = sp.Symbol("t")
    param_dict = {
        "x": str(sp.simplify(pt[0] + u[0] * t)),
        "y": str(sp.simplify(pt[1] + u[1] * t)),
        "z": str(sp.simplify(pt[2] + u[2] * t)),
    }
    raw_str = f"x = {param_dict['x']}, y = {param_dict['y']}, z = {param_dict['z']}"

    steps.append(
        StepItem(
            id="step_parametric_line",
            latex=(
                r"\begin{cases} "
                rf"x = {sp.latex(sp.simplify(pt[0] + u[0] * t))} \\ "
                rf"y = {sp.latex(sp.simplify(pt[1] + u[1] * t))} \\ "
                rf"z = {sp.latex(sp.simplify(pt[2] + u[2] * t))} "
                r"\end{cases}"
            ),
            note_vi="Phương trình tham số của đường thẳng đi qua M0 với VTCP u.",
            value=raw_str,
        )
    )

    result = GeometryOxyzResult(
        operation="line_parametric_equation",
        line_parametric=param_dict,
        line_point=[str(pt[0]), str(pt[1]), str(pt[2])],
        line_direction=[str(u[0]), str(u[1]), str(u[2])],
        value_raw=raw_str,
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=result,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# 9. LINE FROM 2 POINTS
# -----------------------------------------------------------------------------


def _solve_line_from_2_points(
    dsl: GeometryOxyzDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """Construct line equation passing through two points A and B."""
    pt_A = _parse_coord_3d(dsl.point_A)
    pt_B = _parse_coord_3d(dsl.point_B)

    if not pt_A or not pt_B:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_POINTS",
                message_vi="Cần cung cấp đủ tọa độ 2 điểm A và B.",
            ),
            restate_vi=restate,
        )

    u = (pt_B[0] - pt_A[0], pt_B[1] - pt_A[1], pt_B[2] - pt_A[2])
    if u[0] == 0 and u[1] == 0 and u[2] == 0:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="COINCIDENT_POINTS",
                message_vi="Hai điểm A và B trùng nhau, không xác định được đường thẳng.",
            ),
            restate_vi=restate,
        )

    t = sp.Symbol("t")
    param_dict = {
        "x": str(sp.simplify(pt_A[0] + u[0] * t)),
        "y": str(sp.simplify(pt_A[1] + u[1] * t)),
        "z": str(sp.simplify(pt_A[2] + u[2] * t)),
    }

    canon_str = None
    if u[0] != 0 and u[1] != 0 and u[2] != 0:
        canon_str = _format_canonical_line(pt_A, u)

    steps.append(
        StepItem(
            id="step_direction_vector_ab",
            latex=(
                rf"\vec{{u}} = \vec{{AB}} = "
                rf"({sp.latex(u[0])}, {sp.latex(u[1])}, {sp.latex(u[2])})"
            ),
            note_vi="Vectơ chỉ phương của đường thẳng là u = AB = B - A.",
            value=f"u=({u[0]}, {u[1]}, {u[2]})",
        )
    )

    raw_val = canon_str or f"x = {param_dict['x']}, y = {param_dict['y']}, z = {param_dict['z']}"
    result = GeometryOxyzResult(
        operation="line_from_2_points",
        line_canonical=canon_str,
        line_parametric=param_dict,
        line_point=[str(pt_A[0]), str(pt_A[1]), str(pt_A[2])],
        line_direction=[str(u[0]), str(u[1]), str(u[2])],
        value_raw=raw_val,
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=result,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# 10. SPHERE FROM EQUATION (CENTER AND RADIUS)
# -----------------------------------------------------------------------------


def _solve_sphere_from_equation(
    dsl: GeometryOxyzDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """
    Extract center I(a, b, c) and radius R = sqrt(a^2 + b^2 + c^2 - d).
    Enforces GEMINI.md constraint: a^2 + b^2 + c^2 - d > 0 (TRAP_SPHERE_RADIUS_INVALID).
    """
    parsed = _parse_sphere_eq(dsl.sphere_equation)
    if not parsed:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="INVALID_SPHERE_EQUATION",
                message_vi="Không thể phân tích phương trình mặt cầu.",
            ),
            restate_vi=restate,
        )

    (a, b, c), r_sq = parsed

    steps.append(
        StepItem(
            id="step_sphere_center_and_d",
            latex=(
                rf"a = {sp.latex(a)},\ b = {sp.latex(b)},\ c = {sp.latex(c)} "
                rf"\implies I({sp.latex(a)}, {sp.latex(b)}, {sp.latex(c)})"
            ),
            note_vi=f"Xác định tâm I({a}, {b}, {c}) từ các hệ số của phương trình mặt cầu.",
            value=f"I=({a}, {b}, {c})",
        )
    )

    steps.append(
        StepItem(
            id="step_sphere_r_squared",
            latex=rf"R^2 = a^2 + b^2 + c^2 - d = {sp.latex(r_sq)}",
            note_vi=f"Tính giá trị bán kính bình phương: R^2 = a^2 + b^2 + c^2 - d = {r_sq}.",
            value=str(r_sq),
        )
    )

    # Check validity condition per GEMINI.md
    if r_sq <= 0:
        warnings.append(
            WarningItem(
                code=MisconceptionTrapEnum.TRAP_SPHERE_RADIUS_INVALID,
                message_vi=(
                    f"Phương trình không phải là mặt cầu vì R^2 = a^2 + b^2 + c^2 - d <= 0 "
                    f"({MisconceptionTrapEnum.TRAP_SPHERE_RADIUS_INVALID})."
                ),
            )
        )
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code=MisconceptionTrapEnum.TRAP_SPHERE_RADIUS_INVALID,
                message_vi=(
                    f"Phương trình không phải là mặt cầu vì a^2 + b^2 + c^2 - d = {r_sq} <= 0."
                ),
            ),
            steps=steps,
            warnings=warnings,
            restate_vi=restate,
        )

    R = sp.simplify(sp.sqrt(r_sq))
    R_numeric = float(R.evalf()) if R.is_real else None

    steps.append(
        StepItem(
            id="step_sphere_radius",
            latex=rf"R = \sqrt{{{sp.latex(r_sq)}}} = {sp.latex(R)}",
            note_vi=f"Bán kính mặt cầu là R = {R}.",
            value=str(R),
        )
    )

    std_eq = f"(x - {a})^2 + (y - {b})^2 + (z - {c})^2 = {r_sq}"
    raw_val = f"I({a}, {b}, {c}), R = {R}"

    result = GeometryOxyzResult(
        operation="sphere_from_equation",
        sphere_center=[str(a), str(b), str(c)],
        sphere_radius=str(R),
        sphere_radius_numeric=R_numeric,
        sphere_equation_standard=std_eq,
        value_raw=raw_val,
        value_numeric=R_numeric,
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=result,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# 11. SPHERE EQUATION FROM CENTER AND RADIUS
# -----------------------------------------------------------------------------


def _solve_sphere_equation_from_center_and_radius(
    dsl: GeometryOxyzDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """Construct sphere equation from center I(a, b, c) and radius R."""
    pt = _parse_coord_3d(dsl.point_I or dsl.point_M or dsl.point_A)
    R = _parse_val(dsl.radius)

    if not pt or R is None:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_INPUTS",
                message_vi="Cần cung cấp tâm I và bán kính R của mặt cầu.",
            ),
            restate_vi=restate,
        )

    if R <= 0:
        warnings.append(
            WarningItem(
                code=MisconceptionTrapEnum.TRAP_SPHERE_RADIUS_INVALID,
                message_vi=(
                    f"Bán kính mặt cầu bắt buộc phải dương: R > 0 "
                    f"({MisconceptionTrapEnum.TRAP_SPHERE_RADIUS_INVALID})."
                ),
            )
        )
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code=MisconceptionTrapEnum.TRAP_SPHERE_RADIUS_INVALID,
                message_vi=f"Bán kính mặt cầu không hợp lệ R = {R} <= 0.",
            ),
            restate_vi=restate,
        )

    a, b, c = pt
    r_sq = sp.simplify(R**2)
    d = sp.simplify(a**2 + b**2 + c**2 - r_sq)

    def _term(var: str, val: sp.Expr) -> str:
        if val == 0:
            return f"{var}^2"
        if val > 0:
            return f"({var} - {val})^2"
        return f"({var} + {-val})^2"

    std_eq = f"{_term('x', a)} + {_term('y', b)} + {_term('z', c)} = {r_sq}"
    x, y, z = sp.symbols("x y z")
    gen_poly = sp.expand(x**2 + y**2 + z**2 - 2 * a * x - 2 * b * y - 2 * c * z + d)
    gen_eq = f"{gen_poly} = 0"

    steps.append(
        StepItem(
            id="step_sphere_std_eq",
            latex=std_eq,
            note_vi=f"Phương trình chính tắc của mặt cầu: {std_eq}.",
            value=std_eq,
        )
    )

    result = GeometryOxyzResult(
        operation="sphere_equation_from_center_and_radius",
        sphere_center=[str(a), str(b), str(c)],
        sphere_radius=str(R),
        sphere_radius_numeric=float(R.evalf()) if R.is_real else None,
        sphere_equation_standard=std_eq,
        sphere_equation_general=gen_eq,
        value_raw=std_eq,
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=result,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# 12. SPHERE TANGENT TO PLANE
# -----------------------------------------------------------------------------


def _solve_sphere_tangent_to_plane(
    dsl: GeometryOxyzDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """Construct sphere equation with center I tangent to plane (P): R = d(I, P)."""
    pt = _parse_coord_3d(dsl.point_I or dsl.point_M or dsl.point_A)
    plane = _parse_plane_eq(dsl.plane_P, dsl.plane_coeffs)

    if not pt or not plane:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_INPUTS",
                message_vi="Cần cung cấp tâm I và mặt phẳng tiếp xúc.",
            ),
            restate_vi=restate,
        )

    x0, y0, z0 = pt
    A, B, C, D = plane

    # Distance d(I, P) = |A x0 + B y0 + C z0 + D| / sqrt(A^2 + B^2 + C^2)
    num = sp.Abs(A * x0 + B * y0 + C * z0 + D)
    den = sp.sqrt(A**2 + B**2 + C**2)
    R = sp.simplify(num / den)
    r_sq = sp.simplify(R**2)

    def _term(var: str, val: sp.Expr) -> str:
        if val == 0:
            return f"{var}^2"
        if val > 0:
            return f"({var} - {val})^2"
        return f"({var} + {-val})^2"

    std_eq = f"{_term('x', x0)} + {_term('y', y0)} + {_term('z', z0)} = {r_sq}"

    steps.append(
        StepItem(
            id="step_tangent_radius",
            latex=(
                rf"R = d(I, (P)) = "
                rf"\frac{{|{sp.latex(A)}({sp.latex(x0)}) + {sp.latex(B)}({sp.latex(y0)}) + "
                rf"{sp.latex(C)}({sp.latex(z0)}) + ({sp.latex(D)})|}}"
                rf"{{\sqrt{{{sp.latex(A)}^2 + {sp.latex(B)}^2 + {sp.latex(C)}^2}}}} = {sp.latex(R)}"
            ),
            note_vi=f"Mặt cầu tiếp xúc với mặt phẳng nên bán kính R = d(I, (P)) = {R}.",
            value=str(R),
        )
    )
    steps.append(
        StepItem(
            id="step_tangent_sphere_eq",
            latex=std_eq,
            note_vi=f"Phương trình mặt cầu: {std_eq}.",
            value=std_eq,
        )
    )

    result = GeometryOxyzResult(
        operation="sphere_tangent_to_plane",
        sphere_center=[str(x0), str(y0), str(z0)],
        sphere_radius=str(R),
        sphere_radius_numeric=float(R.evalf()) if R.is_real else None,
        sphere_equation_standard=std_eq,
        value_raw=std_eq,
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=result,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# 13. DISTANCE POINT TO PLANE
# -----------------------------------------------------------------------------


def _solve_distance_point_to_plane(
    dsl: GeometryOxyzDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """
    Calculate distance from point M0(x0, y0, z0) to plane (P): Ax + By + Cz + D = 0.
    Enforces GEMINI.md constraint: numerator must take absolute value (TRAP_PLANE_DISTANCE_NO_ABS).
    """
    pt = _parse_coord_3d(dsl.point_M or dsl.point_A)
    plane = _parse_plane_eq(dsl.plane_P, dsl.plane_coeffs)

    if not pt or not plane:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_INPUTS",
                message_vi="Cần cung cấp điểm M và mặt phẳng (P).",
            ),
            restate_vi=restate,
        )

    x0, y0, z0 = pt
    A, B, C, D = plane

    val_inside = A * x0 + B * y0 + C * z0 + D
    num = sp.Abs(val_inside)
    den = sp.sqrt(A**2 + B**2 + C**2)
    dist = sp.simplify(num / den)
    dist_numeric = float(dist.evalf()) if dist.is_real else None

    steps.append(
        StepItem(
            id="step_distance_formula",
            latex=(
                rf"d(M, (P)) = \frac{{|Ax_0 + By_0 + Cz_0 + D|}}{{\sqrt{{A^2 + B^2 + C^2}}}} = "
                rf"\frac{{|{sp.latex(val_inside)}|}}{{\sqrt{{{sp.latex(A**2 + B**2 + C**2)}}}}} = "
                rf"\frac{{{sp.latex(num)}}}{{{sp.latex(den)}}} = {sp.latex(dist)}"
            ),
            note_vi=f"Khoảng cách từ M({x0}, {y0}, {z0}) đến (P) bằng {dist}.",
            value=str(dist),
        )
    )

    result = GeometryOxyzResult(
        operation="distance_point_to_plane",
        distance=str(dist),
        distance_numeric=dist_numeric,
        point=[str(x0), str(y0), str(z0)],
        plane_coeffs=[str(A), str(B), str(C), str(D)],
        value_raw=str(dist),
        value_numeric=dist_numeric,
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=result,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# 14. DISTANCE PARALLEL PLANES
# -----------------------------------------------------------------------------


def _solve_distance_parallel_planes(
    dsl: GeometryOxyzDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """Calculate distance between two parallel planes (P) and (Q)."""
    p1 = _parse_plane_eq(dsl.plane_P, dsl.plane_coeffs)
    p2 = _parse_plane_eq(dsl.plane_Q, dsl.plane_coeffs_Q)

    if not p1 or not p2:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_PLANES",
                message_vi="Cần cung cấp phương trình của hai mặt phẳng.",
            ),
            restate_vi=restate,
        )

    A1, B1, C1, D1 = p1
    A2, B2, C2, D2 = p2

    # Check collinearity of normal vectors: n2 = k * n1
    # Find scaling factor k
    k = None
    for c2, c1 in ((A2, A1), (B2, B1), (C2, C1)):
        if c1 != 0:
            k = c2 / c1
            break

    if (
        k is None
        or k == 0
        or not (
            sp.simplify(A2 - k * A1) == 0
            and sp.simplify(B2 - k * B1) == 0
            and sp.simplify(C2 - k * C1) == 0
        )
    ):
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="PLANES_NOT_PARALLEL",
                message_vi="Hai mặt phẳng không song song với nhau.",
            ),
            restate_vi=restate,
        )

    # Normalize plane (Q) by factor k so it shares normal (A1, B1, C1)
    D2_norm = D2 / k
    num = sp.Abs(D1 - D2_norm)
    den = sp.sqrt(A1**2 + B1**2 + C1**2)
    dist = sp.simplify(num / den)
    dist_numeric = float(dist.evalf()) if dist.is_real else None

    steps.append(
        StepItem(
            id="step_parallel_check",
            latex=rf"\vec{{n}}_2 = {sp.latex(k)} \cdot \vec{{n}}_1 \implies (P) \parallel (Q)",
            note_vi="Hai mặt phẳng có vectơ pháp tuyến cùng phương nên song song.",
            value=f"k={k}",
        )
    )
    steps.append(
        StepItem(
            id="step_parallel_distance",
            latex=(
                rf"d((P), (Q)) = \frac{{|D_1 - D_2'|}}{{\sqrt{{A^2 + B^2 + C^2}}}} = "
                rf"\frac{{|{sp.latex(D1)} - ({sp.latex(D2_norm)})|}}"
                rf"{{\sqrt{{{sp.latex(A1**2 + B1**2 + C1**2)}}}}} = "
                rf"{sp.latex(dist)}"
            ),
            note_vi=f"Khoảng cách giữa hai mặt phẳng song song là {dist}.",
            value=str(dist),
        )
    )

    result = GeometryOxyzResult(
        operation="distance_parallel_planes",
        distance=str(dist),
        distance_numeric=dist_numeric,
        is_parallel=True,
        value_raw=str(dist),
        value_numeric=dist_numeric,
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=result,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# 15. DISTANCE POINT TO POINT
# -----------------------------------------------------------------------------


def _solve_distance_point_to_point(
    dsl: GeometryOxyzDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """Calculate Euclidean distance between two points A and B in 3D space."""
    pt_A = _parse_coord_3d(dsl.point_A)
    pt_B = _parse_coord_3d(dsl.point_B)

    if not pt_A or not pt_B:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_POINTS",
                message_vi="Cần cung cấp đủ tọa độ hai điểm A và B.",
            ),
            restate_vi=restate,
        )

    dx = pt_B[0] - pt_A[0]
    dy = pt_B[1] - pt_A[1]
    dz = pt_B[2] - pt_A[2]
    dist = sp.simplify(sp.sqrt(dx**2 + dy**2 + dz**2))
    dist_numeric = float(dist.evalf()) if dist.is_real else None

    steps.append(
        StepItem(
            id="step_distance_point_to_point",
            latex=(
                rf"AB = \sqrt{{(x_B - x_A)^2 + (y_B - y_A)^2 + (z_B - z_A)^2}} = "
                rf"\sqrt{{{sp.latex(dx)}^2 + {sp.latex(dy)}^2 + {sp.latex(dz)}^2}} = "
                rf"{sp.latex(dist)}"
            ),
            note_vi=f"Khoảng cách giữa hai điểm A và B là {dist}.",
            value=str(dist),
        )
    )

    result = GeometryOxyzResult(
        operation="distance_point_to_point",
        distance=str(dist),
        distance_numeric=dist_numeric,
        value_raw=str(dist),
        value_numeric=dist_numeric,
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=result,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# 16. DISTANCE POINT TO LINE
# -----------------------------------------------------------------------------


def _solve_distance_point_to_line(
    dsl: GeometryOxyzDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """Calculate distance from point M to line d(M0, u): d = |[M0M, u]| / |u|."""
    pt_M = _parse_coord_3d(dsl.point_M or dsl.point_A)
    parsed_line = _parse_line_eq(dsl.line_d, dsl.line_point, dsl.line_direction)

    if not pt_M or not parsed_line:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_INPUTS",
                message_vi="Cần cung cấp điểm M và đường thẳng d.",
            ),
            restate_vi=restate,
        )

    M0, u = parsed_line
    v = (pt_M[0] - M0[0], pt_M[1] - M0[1], pt_M[2] - M0[2])

    # Cross product [v, u]
    wx = v[1] * u[2] - v[2] * u[1]
    wy = v[2] * u[0] - v[0] * u[2]
    wz = v[0] * u[1] - v[1] * u[0]

    mag_w = sp.sqrt(wx**2 + wy**2 + wz**2)
    mag_u = sp.sqrt(u[0] ** 2 + u[1] ** 2 + u[2] ** 2)
    dist = sp.simplify(mag_w / mag_u)
    dist_numeric = float(dist.evalf()) if dist.is_real else None

    steps.append(
        StepItem(
            id="step_point_to_line_cross",
            latex=(
                rf"\vec{{M_0 M}} \times \vec{{u}} = "
                rf"({sp.latex(wx)}, {sp.latex(wy)}, {sp.latex(wz)})"
            ),
            note_vi="Tính tích có hướng của vectơ M0M và vectơ chỉ phương u.",
            value=f"w=({wx}, {wy}, {wz})",
        )
    )
    steps.append(
        StepItem(
            id="step_distance_point_to_line",
            latex=(
                rf"d(M, d) = \frac{{|[\vec{{M_0 M}}, \vec{{u}}]|}}{{|\vec{{u}}|}} = "
                rf"{sp.latex(dist)}"
            ),
            note_vi=f"Khoảng cách từ điểm M đến đường thẳng d là {dist}.",
            value=str(dist),
        )
    )

    result = GeometryOxyzResult(
        operation="distance_point_to_line",
        distance=str(dist),
        distance_numeric=dist_numeric,
        value_raw=str(dist),
        value_numeric=dist_numeric,
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=result,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# 17. DISTANCE SKEW LINES
# -----------------------------------------------------------------------------


def _solve_distance_skew_lines(
    dsl: GeometryOxyzDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """
    Calculate shortest distance between two lines d1(M1, u1) and d2(M2, u2).
    Evaluates skew condition: [u1, u2] . M1M2 != 0 per GEMINI.md.
    """
    line1 = _parse_line_eq(dsl.line_d1 or dsl.line_d, dsl.line_point, dsl.line_direction)
    line2 = _parse_line_eq(dsl.line_d2, dsl.line_point_2, dsl.line_direction_2)

    if not line1 or not line2:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_LINES",
                message_vi="Cần cung cấp đủ hai đường thẳng d1 và d2.",
            ),
            restate_vi=restate,
        )

    M1, u1 = line1
    M2, u2 = line2

    # Cross product w = [u1, u2]
    wx = u1[1] * u2[2] - u1[2] * u2[1]
    wy = u1[2] * u2[0] - u1[0] * u2[2]
    wz = u1[0] * u2[1] - u1[1] * u2[0]

    mag_w = sp.sqrt(wx**2 + wy**2 + wz**2)
    M1M2 = (M2[0] - M1[0], M2[1] - M1[1], M2[2] - M1[2])

    # If parallel or coincident
    if mag_w == 0:
        # Distance from M1 to d2
        v = (M1[0] - M2[0], M1[1] - M2[1], M1[2] - M2[2])
        w_par_x = v[1] * u2[2] - v[2] * u2[1]
        w_par_y = v[2] * u2[0] - v[0] * u2[2]
        w_par_z = v[0] * u2[1] - v[1] * u2[0]
        dist = sp.simplify(
            sp.sqrt(w_par_x**2 + w_par_y**2 + w_par_z**2)
            / sp.sqrt(u2[0] ** 2 + u2[1] ** 2 + u2[2] ** 2)
        )
        is_skew = False
        is_parallel = True
    else:
        # Scalar triple product: w . M1M2
        triple_prod = wx * M1M2[0] + wy * M1M2[1] + wz * M1M2[2]
        dist = sp.simplify(sp.Abs(triple_prod) / mag_w)
        is_skew = bool(triple_prod != 0)
        is_parallel = False

    dist_numeric = float(dist.evalf()) if dist.is_real else None

    steps.append(
        StepItem(
            id="step_cross_product_skew",
            latex=(
                rf"\vec{{w}} = [\vec{{u}}_1, \vec{{u}}_2] = "
                rf"({sp.latex(wx)}, {sp.latex(wy)}, {sp.latex(wz)})"
            ),
            note_vi="Tính tích có hướng của hai vectơ chỉ phương w = [u1, u2].",
            value=f"w=({wx}, {wy}, {wz})",
        )
    )
    steps.append(
        StepItem(
            id="step_distance_skew_lines",
            latex=(
                rf"d(d_1, d_2) = \frac{{|[\vec{{u}}_1, \vec{{u}}_2] \cdot \vec{{M_1 M_2}}|}}"
                rf"{{|[\vec{{u}}_1, \vec{{u}}_2]|}} = {sp.latex(dist)}"
            ),
            note_vi=f"Khoảng cách giữa hai đường thẳng là {dist}.",
            value=str(dist),
        )
    )

    result = GeometryOxyzResult(
        operation="distance_skew_lines",
        distance=str(dist),
        distance_numeric=dist_numeric,
        is_skew=is_skew,
        is_parallel=is_parallel,
        value_raw=str(dist),
        value_numeric=dist_numeric,
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=result,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# 18. ANGLE BETWEEN PLANES
# -----------------------------------------------------------------------------


def _solve_angle_between_planes(
    dsl: GeometryOxyzDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """
    Calculate angle between two planes (P) and (Q).
    Enforces GEMINI.md constraint: cos(phi) >= 0 (TRAP_ANGLE_LINE_VS_VECTOR).
    """
    p1 = _parse_plane_eq(dsl.plane_P, dsl.plane_coeffs)
    p2 = _parse_plane_eq(dsl.plane_Q, dsl.plane_coeffs_Q)

    if not p1 or not p2:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_PLANES",
                message_vi="Cần cung cấp đủ hai mặt phẳng để tính góc.",
            ),
            restate_vi=restate,
        )

    A1, B1, C1, _ = p1
    A2, B2, C2, _ = p2

    dot = A1 * A2 + B1 * B2 + C1 * C2
    mag1 = sp.sqrt(A1**2 + B1**2 + C1**2)
    mag2 = sp.sqrt(A2**2 + B2**2 + C2**2)

    cos_phi = sp.simplify(sp.Abs(dot) / (mag1 * mag2))
    rad = sp.acos(cos_phi)
    deg = sp.simplify(rad * 180 / sp.pi)
    deg_str = f"{deg}°" if deg.is_integer or deg.is_Rational else f"{float(deg.evalf()):.2f}°"

    steps.append(
        StepItem(
            id="step_angle_planes_cos",
            latex=(
                rf"\cos \varphi = \frac{{|\vec{{n}}_1 \cdot \vec{{n}}_2|}}"
                rf"{{|\vec{{n}}_1| |\vec{{n}}_2|}} = "
                rf"\frac{{|{sp.latex(dot)}|}}{{{sp.latex(mag1)} \cdot {sp.latex(mag2)}}} = "
                rf"{sp.latex(cos_phi)}"
            ),
            note_vi=f"Cosin của góc giữa hai mặt phẳng: cos(phi) = {cos_phi} >= 0.",
            value=str(cos_phi),
        )
    )
    steps.append(
        StepItem(
            id="step_angle_planes_deg",
            latex=rf"\varphi = {sp.latex(deg)}^\circ",
            note_vi=f"Góc giữa hai mặt phẳng bằng {deg_str}.",
            value=deg_str,
        )
    )

    result = GeometryOxyzResult(
        operation="angle_between_planes",
        cos_angle=str(cos_phi),
        angle_rad=str(rad),
        angle_deg=deg_str,
        value_raw=deg_str,
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=result,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# 19. ANGLE BETWEEN LINES
# -----------------------------------------------------------------------------


def _solve_angle_between_lines(
    dsl: GeometryOxyzDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """Calculate angle between two lines: cos(phi) = |u1 . u2| / (|u1| * |u2|) >= 0."""
    line1 = _parse_line_eq(dsl.line_d1 or dsl.line_d, dsl.line_point, dsl.line_direction)
    line2 = _parse_line_eq(dsl.line_d2, dsl.line_point_2, dsl.line_direction_2)

    if not line1 or not line2:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_LINES",
                message_vi="Cần cung cấp đủ hai đường thẳng để tính góc.",
            ),
            restate_vi=restate,
        )

    _, u1 = line1
    _, u2 = line2

    dot = u1[0] * u2[0] + u1[1] * u2[1] + u1[2] * u2[2]
    mag1 = sp.sqrt(u1[0] ** 2 + u1[1] ** 2 + u1[2] ** 2)
    mag2 = sp.sqrt(u2[0] ** 2 + u2[1] ** 2 + u2[2] ** 2)

    cos_phi = sp.simplify(sp.Abs(dot) / (mag1 * mag2))
    rad = sp.acos(cos_phi)
    deg = sp.simplify(rad * 180 / sp.pi)
    deg_str = f"{deg}°" if deg.is_integer or deg.is_Rational else f"{float(deg.evalf()):.2f}°"

    steps.append(
        StepItem(
            id="step_angle_lines_cos",
            latex=(
                rf"\cos \varphi = \frac{{|\vec{{u}}_1 \cdot \vec{{u}}_2|}}"
                rf"{{|\vec{{u}}_1| |\vec{{u}}_2|}} = {sp.latex(cos_phi)}"
            ),
            note_vi=f"Cosin của góc giữa hai đường thẳng: cos(phi) = {cos_phi} >= 0.",
            value=str(cos_phi),
        )
    )

    result = GeometryOxyzResult(
        operation="angle_between_lines",
        cos_angle=str(cos_phi),
        angle_rad=str(rad),
        angle_deg=deg_str,
        value_raw=deg_str,
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=result,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# 20. ANGLE BETWEEN LINE AND PLANE
# -----------------------------------------------------------------------------


def _solve_angle_between_line_and_plane(
    dsl: GeometryOxyzDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """Calculate angle between line d(M0, u) and plane (P): sin(phi) = |u . n| / (|u| * |n|)."""
    line = _parse_line_eq(dsl.line_d, dsl.line_point, dsl.line_direction)
    plane = _parse_plane_eq(dsl.plane_P, dsl.plane_coeffs)

    if not line or not plane:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_INPUTS",
                message_vi="Cần cung cấp đường thẳng và mặt phẳng.",
            ),
            restate_vi=restate,
        )

    _, u = line
    A, B, C, _ = plane

    dot = u[0] * A + u[1] * B + u[2] * C
    mag_u = sp.sqrt(u[0] ** 2 + u[1] ** 2 + u[2] ** 2)
    mag_n = sp.sqrt(A**2 + B**2 + C**2)

    sin_phi = sp.simplify(sp.Abs(dot) / (mag_u * mag_n))
    rad = sp.asin(sin_phi)
    deg = sp.simplify(rad * 180 / sp.pi)
    deg_str = f"{deg}°" if deg.is_integer or deg.is_Rational else f"{float(deg.evalf()):.2f}°"

    steps.append(
        StepItem(
            id="step_angle_line_plane_sin",
            latex=(
                rf"\sin \varphi = \frac{{|\vec{{u}} \cdot \vec{{n}}|}}"
                rf"{{|\vec{{u}}| |\vec{{n}}|}} = {sp.latex(sin_phi)}"
            ),
            note_vi=f"Sin của góc giữa đường thẳng và mặt phẳng: sin(phi) = {sin_phi}.",
            value=str(sin_phi),
        )
    )

    result = GeometryOxyzResult(
        operation="angle_between_line_and_plane",
        sin_angle=str(sin_phi),
        angle_rad=str(rad),
        angle_deg=deg_str,
        value_raw=deg_str,
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=result,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# 21. ANGLE BETWEEN VECTORS 3D
# -----------------------------------------------------------------------------


def _solve_angle_between_vectors_3d(
    dsl: GeometryOxyzDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """
    Calculate angle between two 3D vectors: cos(theta) = (u1 . u2) / (|u1| * |u2|).
    Unlike line angles, vector angles can be obtuse (theta in [0, 180 deg]).
    """
    u1 = _parse_coord_3d(dsl.vector_u)
    u2 = _parse_coord_3d(dsl.vector_v)

    if not u1 or not u2:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_VECTORS",
                message_vi="Cần cung cấp đủ hai vectơ u và v.",
            ),
            restate_vi=restate,
        )

    dot = u1[0] * u2[0] + u1[1] * u2[1] + u1[2] * u2[2]
    mag1 = sp.sqrt(u1[0] ** 2 + u1[1] ** 2 + u1[2] ** 2)
    mag2 = sp.sqrt(u2[0] ** 2 + u2[1] ** 2 + u2[2] ** 2)

    if mag1 == 0 or mag2 == 0:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="ZERO_VECTOR",
                message_vi="Không thể xác định góc với vectơ không.",
            ),
            restate_vi=restate,
        )

    cos_theta = sp.simplify(dot / (mag1 * mag2))
    rad = sp.acos(cos_theta)
    deg = sp.simplify(rad * 180 / sp.pi)
    deg_str = f"{deg}°" if deg.is_integer or deg.is_Rational else f"{float(deg.evalf()):.2f}°"

    steps.append(
        StepItem(
            id="step_angle_vectors_cos",
            latex=(
                rf"\cos \theta = \frac{{\vec{{u}}_1 \cdot \vec{{u}}_2}}"
                rf"{{|\vec{{u}}_1| |\vec{{u}}_2|}} = "
                rf"\frac{{{sp.latex(dot)}}}{{{sp.latex(mag1)} \cdot {sp.latex(mag2)}}} = "
                rf"{sp.latex(cos_theta)}"
            ),
            note_vi=f"Cosin của góc giữa hai vectơ: cos(theta) = {cos_theta}.",
            value=str(cos_theta),
        )
    )

    result = GeometryOxyzResult(
        operation="angle_between_vectors_3d",
        cos_angle=str(cos_theta),
        angle_rad=str(rad),
        angle_deg=deg_str,
        value_raw=str(cos_theta),
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=result,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# 22. VECTOR CROSS PRODUCT 3D
# -----------------------------------------------------------------------------


def _solve_vector_cross_product_3d(
    dsl: GeometryOxyzDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """
    Calculate cross product [u, v] = (uy vz - uz vy, uz vx - ux vz, ux vy - uy vx).
    Adheres strictly to GEMINI.md: result is a VECTOR, not scalar (TRAP_CROSS_PRODUCT_IS_SCALAR).
    """
    u = _parse_coord_3d(dsl.vector_u)
    v = _parse_coord_3d(dsl.vector_v)

    if not u or not v:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_VECTORS",
                message_vi="Cần cung cấp đủ hai vectơ u và v.",
            ),
            restate_vi=restate,
        )

    wx = sp.simplify(u[1] * v[2] - u[2] * v[1])
    wy = sp.simplify(u[2] * v[0] - u[0] * v[2])
    wz = sp.simplify(u[0] * v[1] - u[1] * v[0])

    w_str, w_list = _format_vector((wx, wy, wz))

    steps.append(
        StepItem(
            id="step_cross_product",
            latex=rf"[\vec{{u}}, \vec{{v}}] = ({sp.latex(wx)}, {sp.latex(wy)}, {sp.latex(wz)})",
            note_vi=f"Tích có hướng [u, v] là một vectơ vuông góc với cả u và v: {w_str}.",
            value=w_str,
        )
    )

    result = GeometryOxyzResult(
        operation="vector_cross_product_3d",
        vector=w_list,
        vector_cross=w_list,
        value_raw=w_str,
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=result,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# 23. VECTOR DOT PRODUCT 3D
# -----------------------------------------------------------------------------


def _solve_vector_dot_product_3d(
    dsl: GeometryOxyzDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """Calculate scalar dot product u . v = ux vx + uy vy + uz vz."""
    u = _parse_coord_3d(dsl.vector_u)
    v = _parse_coord_3d(dsl.vector_v)

    if not u or not v:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_VECTORS",
                message_vi="Cần cung cấp đủ hai vectơ u và v.",
            ),
            restate_vi=restate,
        )

    dot = sp.simplify(u[0] * v[0] + u[1] * v[1] + u[2] * v[2])
    dot_numeric = float(dot.evalf()) if dot.is_real else None

    steps.append(
        StepItem(
            id="step_dot_product",
            latex=(
                rf"\vec{{u}} \cdot \vec{{v}} = {sp.latex(u[0])} \cdot {sp.latex(v[0])} + "
                rf"{sp.latex(u[1])} \cdot {sp.latex(v[1])} + "
                rf"{sp.latex(u[2])} \cdot {sp.latex(v[2])} = "
                rf"{sp.latex(dot)}"
            ),
            note_vi=f"Tích vô hướng của hai vectơ là một đại lượng vô hướng bằng {dot}.",
            value=str(dot),
        )
    )

    result = GeometryOxyzResult(
        operation="vector_dot_product_3d",
        dot_product=str(dot),
        dot_product_numeric=dot_numeric,
        value_raw=str(dot),
        value_numeric=dot_numeric,
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=result,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# 24. POINT PROJECTION ON PLANE
# -----------------------------------------------------------------------------


def _solve_point_projection_on_plane(
    dsl: GeometryOxyzDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """Calculate orthogonal projection of point M0 onto plane (P): Ax + By + Cz + D = 0."""
    pt = _parse_coord_3d(dsl.point_M or dsl.point_A)
    plane = _parse_plane_eq(dsl.plane_P, dsl.plane_coeffs)

    if not pt or not plane:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_INPUTS",
                message_vi="Cần cung cấp điểm M và mặt phẳng (P).",
            ),
            restate_vi=restate,
        )

    x0, y0, z0 = pt
    A, B, C, D = plane

    # t = - (A x0 + B y0 + C z0 + D) / (A^2 + B^2 + C^2)
    num = -(A * x0 + B * y0 + C * z0 + D)
    den = A**2 + B**2 + C**2
    t = num / den

    hx = sp.simplify(x0 + A * t)
    hy = sp.simplify(y0 + B * t)
    hz = sp.simplify(z0 + C * t)
    h_str, h_list = _format_vector((hx, hy, hz))

    steps.append(
        StepItem(
            id="step_projection_point",
            latex=rf"H = \left({sp.latex(hx)}, {sp.latex(hy)}, {sp.latex(hz)}\right)",
            note_vi=f"Hình chiếu vuông góc của M({x0}, {y0}, {z0}) lên mặt phẳng là H = {h_str}.",
            value=h_str,
        )
    )

    result = GeometryOxyzResult(
        operation="point_projection_on_plane",
        projection_point=h_list,
        point=h_list,
        value_raw=h_str,
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=result,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# 25. INTERSECTION LINE AND PLANE
# -----------------------------------------------------------------------------


def _solve_intersection_line_plane(
    dsl: GeometryOxyzDSL,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[GeometryOxyzResult]:
    """Find intersection point between line d(M0, u) and plane (P): Ax + By + Cz + D = 0."""
    line = _parse_line_eq(dsl.line_d, dsl.line_point, dsl.line_direction)
    plane = _parse_plane_eq(dsl.plane_P, dsl.plane_coeffs)

    if not line or not plane:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_INPUTS",
                message_vi="Cần cung cấp đường thẳng d và mặt phẳng (P).",
            ),
            restate_vi=restate,
        )

    M0, u = line
    A, B, C, D = plane

    den = A * u[0] + B * u[1] + C * u[2]
    num = -(A * M0[0] + B * M0[1] + C * M0[2] + D)

    if den == 0:
        if num == 0:
            return BaseResponseEnvelope(
                status=StatusEnum.UNSUPPORTED,
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.MEDIUM,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=0.5,
                ),
                error=ErrorDetail(
                    code="LINE_IN_PLANE",
                    message_vi="Đường thẳng nằm hoàn toàn trong mặt phẳng (vô số giao điểm).",
                ),
                restate_vi=restate,
            )
        else:
            return BaseResponseEnvelope(
                status=StatusEnum.VERIFIED,
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.HIGH,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=1.0,
                ),
                result=GeometryOxyzResult(
                    operation="intersection_line_plane",
                    is_parallel=True,
                    value_raw="empty_set",
                ),
                steps=[
                    StepItem(
                        id="step_parallel_no_intersection",
                        latex=r"d \parallel (P) \implies d \cap (P) = \emptyset",
                        note_vi="Đường thẳng song song với mặt phẳng nên không có giao điểm.",
                        value="empty_set",
                    )
                ],
                warnings=warnings,
                restate_vi=restate,
            )

    t_sol = sp.simplify(num / den)
    px = sp.simplify(M0[0] + u[0] * t_sol)
    py = sp.simplify(M0[1] + u[1] * t_sol)
    pz = sp.simplify(M0[2] + u[2] * t_sol)
    p_str, p_list = _format_vector((px, py, pz))

    steps.append(
        StepItem(
            id="step_intersection_parameter",
            latex=rf"t = \frac{{{sp.latex(num)}}}{{{sp.latex(den)}}} = {sp.latex(t_sol)}",
            note_vi=f"Giá trị tham số tại giao điểm là t = {t_sol}.",
            value=str(t_sol),
        )
    )
    steps.append(
        StepItem(
            id="step_intersection_point",
            latex=rf"P_{{int}} = ({sp.latex(px)}, {sp.latex(py)}, {sp.latex(pz)})",
            note_vi=f"Tọa độ giao điểm của đường thẳng và mặt phẳng là {p_str}.",
            value=p_str,
        )
    )

    result = GeometryOxyzResult(
        operation="intersection_line_plane",
        intersection_point=p_list,
        point=p_list,
        value_raw=p_str,
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=result,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )
