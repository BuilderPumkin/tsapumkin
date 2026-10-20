"""
Unit Tests for Triangle Relations & Planar Vectors CAS Solver
Validates:
- Heron's formula and triangle area (q_hsa_46: a=5, b=6, c=7 -> S = 6*sqrt(6))
- Circumradius R, inradius r, medians, and law of cosines
- Triangle inequality violation trap (|b-c| < a < b+c)
- Vector magnitude, dot product, linear combinations (k1*u + k2*v)
- Collinearity cross-determinant avoiding zero-division trap (TRAP_COLLINEAR_ZERO_DIVISION)
- Angle between vectors with obtuse angle warning (TRAP_ANGLE_LINE_VS_VECTOR)
- Parameter solving for orthogonal and collinear vectors
- Triangle centroid and coordinates of vector AB
- Structured pedagogical step traces for Socratic tutoring (Prompt 8)
"""

import math

import pytest

from app.schemas.common import StatusEnum
from app.schemas.dsl import TriangleVectorDSL
from app.solvers.triangle_vector import solve_triangle_vector


@pytest.mark.unit
def test_heron_area_canonical_q_hsa_46():
    """Validates q_hsa_46: a=5, b=6, c=7 -> S = 6*sqrt(6)."""
    dsl = TriangleVectorDSL(
        type="he_thuc_luong_tam_giac_vector",
        operation="triangle_area_heron",
        a="5",
        b="6",
        c="7",
    )
    env = solve_triangle_vector(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.area_raw == "6*sqrt(6)"
    assert env.result.semiperimeter == "9"
    assert math.isclose(env.result.area_numeric, 6 * math.sqrt(6), rel_tol=1e-5)


@pytest.mark.unit
def test_heron_area_right_triangle_345():
    """a=3, b=4, c=5 right triangle -> S = 6."""
    dsl = TriangleVectorDSL(
        type="he_thuc_luong_tam_giac_vector",
        operation="triangle_area_heron",
        a="3",
        b="4",
        c="5",
    )
    env = solve_triangle_vector(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.area_raw == "6"
    assert env.result.area_numeric == 6.0


@pytest.mark.unit
def test_trap_triangle_inequality_violated():
    """a=1, b=2, c=5 violates triangle inequality (1 + 2 < 5) -> ERROR."""
    dsl = TriangleVectorDSL(
        type="he_thuc_luong_tam_giac_vector",
        operation="triangle_area_heron",
        a="1",
        b="2",
        c="5",
    )
    env = solve_triangle_vector(dsl)
    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "TRIANGLE_INEQUALITY_VIOLATED"
    assert any(w.code == "TRAP_TRIANGLE_INEQUALITY_VIOLATED" for w in env.warnings)


@pytest.mark.unit
def test_trap_triangle_negative_side_rejected():
    """Negative side length rejected immediately."""
    dsl = TriangleVectorDSL(
        type="he_thuc_luong_tam_giac_vector",
        operation="triangle_area_heron",
        a="-3",
        b="4",
        c="5",
    )
    env = solve_triangle_vector(dsl)
    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "INVALID_SIDE_LENGTH"


@pytest.mark.unit
def test_circumradius_R_canonical():
    """a=3, b=4, c=5 -> R = abc / 4S = 60 / 24 = 5/2."""
    dsl = TriangleVectorDSL(
        type="he_thuc_luong_tam_giac_vector",
        operation="circumradius_R",
        a="3",
        b="4",
        c="5",
    )
    env = solve_triangle_vector(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.circumradius_R == "5/2"
    assert env.result.circumradius_R_numeric == 2.5


@pytest.mark.unit
def test_inradius_r_canonical():
    """a=3, b=4, c=5 -> r = S / p = 6 / 6 = 1."""
    dsl = TriangleVectorDSL(
        type="he_thuc_luong_tam_giac_vector",
        operation="inradius_r",
        a="3",
        b="4",
        c="5",
    )
    env = solve_triangle_vector(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.inradius_r == "1"
    assert env.result.inradius_r_numeric == 1.0


@pytest.mark.unit
def test_median_length_canonical():
    """a=3, b=4, c=5 -> m_a = sqrt(73)/2."""
    dsl = TriangleVectorDSL(
        type="he_thuc_luong_tam_giac_vector",
        operation="median_length",
        a="3",
        b="4",
        c="5",
    )
    env = solve_triangle_vector(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert "sqrt(73)/2" in env.result.median_length


@pytest.mark.unit
def test_cos_angle_canonical():
    """a=3, b=4, c=5 -> cos A = (16 + 25 - 9) / 40 = 32 / 40 = 4/5."""
    dsl = TriangleVectorDSL(
        type="he_thuc_luong_tam_giac_vector",
        operation="cos_angle",
        a="3",
        b="4",
        c="5",
    )
    env = solve_triangle_vector(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.angle_cos == "4/5"


@pytest.mark.unit
def test_side_from_law_of_cosines_60deg():
    """b=5, c=8, A=60 deg -> a^2 = 25 + 64 - 2(5)(8)(1/2) = 49 -> a = 7."""
    dsl = TriangleVectorDSL(
        type="he_thuc_luong_tam_giac_vector",
        operation="side_from_cos",
        b="5",
        c="8",
        angle_A="60 deg",
    )
    env = solve_triangle_vector(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.side_length == "7"
    assert env.result.value_raw == "7"


@pytest.mark.unit
def test_vector_magnitude_canonical():
    """u = (3, 4) -> |u| = 5."""
    dsl = TriangleVectorDSL(
        type="vector_oxy",
        operation="vector_magnitude",
        u=["3", "4"],
    )
    env = solve_triangle_vector(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.magnitude == "5"
    assert env.result.magnitude_numeric == 5.0


@pytest.mark.unit
def test_vector_magnitude_sqrt():
    """u = (1, 1) -> |u| = sqrt(2)."""
    dsl = TriangleVectorDSL(
        type="vector_oxy",
        operation="vector_magnitude",
        u=["1", "1"],
    )
    env = solve_triangle_vector(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.magnitude == "sqrt(2)"


@pytest.mark.unit
def test_vector_linear_combination():
    """2*u - v for u=(1, 2), v=(3, -1) -> (2*1 - 3, 2*2 - (-1)) = (-1, 5)."""
    dsl = TriangleVectorDSL(
        type="vector_oxy",
        operation="vector_add_sub",
        u=["1", "2"],
        v=["3", "-1"],
        k1="2",
        k2="-1",
    )
    env = solve_triangle_vector(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.vector_result == ["-1", "5"]
    assert env.result.value_raw == "(-1, 5)"


@pytest.mark.unit
def test_vector_dot_product_canonical():
    """u=(1, 2), v=(3, -1) -> 1*3 + 2*(-1) = 1."""
    dsl = TriangleVectorDSL(
        type="vector_oxy",
        operation="vector_dot_product",
        u=["1", "2"],
        v=["3", "-1"],
    )
    env = solve_triangle_vector(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.dot_product == "1"
    assert env.result.dot_product_numeric == 1.0


@pytest.mark.unit
def test_vector_orthogonal_true():
    """u=(2, 3), v=(-3, 2) -> dot product = 2*(-3) + 3*2 = 0 -> True."""
    dsl = TriangleVectorDSL(
        type="vector_oxy",
        operation="vector_orthogonal",
        u=["2", "3"],
        v=["-3", "2"],
    )
    env = solve_triangle_vector(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.is_orthogonal is True
    assert env.result.value_raw == "true"


@pytest.mark.unit
def test_vector_orthogonal_false():
    """u=(1, 1), v=(1, 2) -> dot product = 3 != 0 -> False."""
    dsl = TriangleVectorDSL(
        type="vector_oxy",
        operation="vector_orthogonal",
        u=["1", "1"],
        v=["1", "2"],
    )
    env = solve_triangle_vector(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.is_orthogonal is False
    assert env.result.value_raw == "false"


@pytest.mark.unit
def test_vector_collinear_zero_division_trap():
    """u=(0, 2), v=(0, 4) -> collinear via cross determinant (avoids 0/0)."""
    dsl = TriangleVectorDSL(
        type="vector_oxy",
        operation="vector_collinear",
        u=["0", "2"],
        v=["0", "4"],
    )
    env = solve_triangle_vector(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.is_collinear is True
    assert env.result.value_raw == "true"


@pytest.mark.unit
def test_vector_collinear_false():
    """u=(1, 2), v=(2, 3) -> 1*3 - 2*2 = -1 != 0 -> False."""
    dsl = TriangleVectorDSL(
        type="vector_oxy",
        operation="vector_collinear",
        u=["1", "2"],
        v=["2", "3"],
    )
    env = solve_triangle_vector(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.is_collinear is False


@pytest.mark.unit
def test_vector_angle_obtuse_warning():
    """u=(1, 0), v=(-1, 1) -> cos = -1/sqrt(2), angle = 135 deg with warning."""
    dsl = TriangleVectorDSL(
        type="vector_oxy",
        operation="vector_angle",
        u=["1", "0"],
        v=["-1", "1"],
    )
    env = solve_triangle_vector(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert "135" in env.result.angle_between_deg
    assert any(w.code == "TRAP_ANGLE_LINE_VS_VECTOR" for w in env.warnings)


@pytest.mark.unit
def test_vector_angle_zero_vector_rejected():
    """Angle with zero vector is undefined -> ERROR."""
    dsl = TriangleVectorDSL(
        type="vector_oxy",
        operation="vector_angle",
        u=["0", "0"],
        v=["1", "2"],
    )
    env = solve_triangle_vector(dsl)
    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "ZERO_VECTOR_ANGLE"


@pytest.mark.unit
def test_vector_solve_parameter_orthogonal():
    """u=(m, 2), v=(3, -1), u perp v -> 3m - 2 = 0 -> m = 2/3."""
    dsl = TriangleVectorDSL(
        type="vector_oxy",
        operation="vector_solve_parameter",
        u=["m", "2"],
        v=["3", "-1"],
        condition="orthogonal",
        param_name="m",
    )
    env = solve_triangle_vector(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.parameter_values == ["2/3"]
    assert env.result.value_raw == "2/3"
    assert math.isclose(env.result.value_numeric, 2 / 3, rel_tol=1e-5)


@pytest.mark.unit
def test_vector_solve_parameter_collinear():
    """u=(m, 2), v=(6, 4), u || v -> 4m - 12 = 0 -> m = 3."""
    dsl = TriangleVectorDSL(
        type="vector_oxy",
        operation="vector_solve_parameter",
        u=["m", "2"],
        v=["6", "4"],
        condition="collinear",
        param_name="m",
    )
    env = solve_triangle_vector(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.parameter_values == ["3"]
    assert env.result.value_raw == "3"


@pytest.mark.unit
def test_triangle_centroid_canonical():
    """A(1, 2), B(3, 4), C(5, 6) -> G(3, 4)."""
    dsl = TriangleVectorDSL(
        type="vector_oxy",
        operation="triangle_centroid",
        point_A=["1", "2"],
        point_B=["3", "4"],
        point_C=["5", "6"],
    )
    env = solve_triangle_vector(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.vector_result == ["3", "4"]
    assert env.result.value_raw == "(3, 4)"


@pytest.mark.unit
def test_vector_ab_canonical():
    """A(1, 2), B(4, 6) -> AB = (3, 4), |AB| = 5."""
    dsl = TriangleVectorDSL(
        type="vector_oxy",
        operation="vector_ab",
        point_A=["1", "2"],
        point_B=["4", "6"],
    )
    env = solve_triangle_vector(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.vector_result == ["3", "4"]
    assert env.result.magnitude == "5"


@pytest.mark.unit
def test_pedagogical_step_trace_completeness():
    """Validates that all steps have id, latex, note_vi, and value."""
    dsl = TriangleVectorDSL(
        type="he_thuc_luong_tam_giac_vector",
        operation="triangle_area_heron",
        a="5",
        b="6",
        c="7",
    )
    env = solve_triangle_vector(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert len(env.steps) >= 3
    for step in env.steps:
        assert step.id
        assert step.latex
        assert step.note_vi
        assert step.value is not None
