"""
Unit Tests for Pure 3D Cartesian Coordinate Geometry (Oxyz) CAS Solver
Verifies:
- Plane equations & normal vectors
- Line equations & direction vectors (canonical & parametric)
- Sphere center, radius, equations & validity traps (R^2 > 0)
- Distances (point-to-plane, parallel planes, point-to-point, skew lines)
- Angles (between planes, between lines, between vectors)
- 3D Vector operations (dot product, cross product)
- Projections and intersections
- Pedagogical step traces and cognitive traps (GEMINI.md)
"""

from app.schemas.common import StatusEnum
from app.schemas.dsl import GeometryOxyzDSL
from app.schemas.traps import MisconceptionTrapEnum
from app.solvers.geometry_oxyz import solve_geometry_oxyz
from app.solvers.registry import solve_dsl


def test_plane_normal_vector_canonical_q_thpt_13():
    """In (P): x - 2y + 2z - 6 = 0, normal vector is n = (1, -2, 2) (q_thpt_13)."""
    dsl = GeometryOxyzDSL(
        operation="plane_normal_vector",
        plane_P="x - 2y + 2z - 6 = 0",
        restate_vi="Tìm vectơ pháp tuyến của mặt phẳng (P): x - 2y + 2z - 6 = 0.",
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert res.result is not None
    assert res.result.vector == ["1", "-2", "2"]
    assert res.result.plane_normal == ["1", "-2", "2"]


def test_plane_normal_vector_boost_q_boost_plane_01():
    """In (P): 2x - 3y + 4z - 5 = 0, normal vector is n = (2, -3, 4) (q_boost_plane_01)."""
    dsl = GeometryOxyzDSL(
        operation="plane_normal_vector",
        plane_P="2x - 3y + 4z - 5 = 0",
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert res.result is not None
    assert res.result.vector == ["2", "-3", "4"]


def test_plane_from_point_and_normal():
    """Plane passing through M0(1, 2, -1) with normal n(2, -1, 3): 2x - y + 3z - 5 = 0."""
    dsl = GeometryOxyzDSL(
        operation="plane_from_point_and_normal",
        point_M=["1", "2", "-1"],
        vector_n=["2", "-1", "3"],
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert res.result is not None
    assert res.result.plane_coeffs == ["2", "-1", "3", "3"]


def test_plane_from_3_points():
    """Plane passing through A(1, 0, 0), B(0, 1, 0), C(0, 0, 1): x + y + z - 1 = 0."""
    dsl = GeometryOxyzDSL(
        operation="plane_from_3_points",
        point_A=["1", "0", "0"],
        point_B=["0", "1", "0"],
        point_C=["0", "0", "1"],
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert res.result is not None
    assert res.result.plane_coeffs == ["1", "1", "1", "-1"]


def test_plane_from_3_points_collinear_trap():
    """Collinear points A(1, 1, 1), B(2, 2, 2), C(3, 3, 3)
    must trigger TRAP_COLLINEAR_ZERO_DIVISION."""
    dsl = GeometryOxyzDSL(
        operation="plane_from_3_points",
        point_A=["1", "1", "1"],
        point_B=["2", "2", "2"],
        point_C=["3", "3", "3"],
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.ERROR
    assert res.error is not None
    assert res.error.code == MisconceptionTrapEnum.TRAP_COLLINEAR_ZERO_DIVISION


def test_plane_perpendicular_bisector_q_hsa_35():
    """Perpendicular bisector plane of AB with A(1, 1, 2) and B(3, 5, 4)
    is x + 2y + z - 11 = 0 (q_hsa_35)."""
    dsl = GeometryOxyzDSL(
        operation="plane_perpendicular_bisector",
        point_A=["1", "1", "2"],
        point_B=["3", "5", "4"],
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert res.result is not None
    assert res.result.plane_coeffs == ["1", "2", "1", "-11"]


def test_plane_parallel_through_point_q_tsa_53():
    """Plane through O(0, 0, 0) parallel to 2x - 3y + 4z - 12 = 0 is 2x - 3y + 4z = 0 (q_tsa_53)."""
    dsl = GeometryOxyzDSL(
        operation="plane_parallel_through_point",
        point_M=["0", "0", "0"],
        plane_P="2x - 3y + 4z - 12 = 0",
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert res.result is not None
    assert res.result.plane_coeffs == ["2", "-3", "4", "0"]


def test_line_direction_vector_q_thpt_39():
    """In d: (x - 3)/1 = (y + 1)/(-2) = z/4, direction vector is u = (1, -2, 4) (q_thpt_39)."""
    dsl = GeometryOxyzDSL(
        operation="line_direction_vector",
        line_d=r"\frac{x - 3}{1} = \frac{y + 1}{-2} = \frac{z}{4}",
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert res.result is not None
    assert res.result.vector == ["1", "-2", "4"]


def test_line_canonical_equation_q_boost_plane_02():
    """Line through M(1, -2, 3) with u = (2, 1, -4)
    is (x - 1)/2 = (y + 2)/1 = (z - 3)/(-4) (q_boost_plane_02)."""
    dsl = GeometryOxyzDSL(
        operation="line_canonical_equation",
        line_point=["1", "-2", "3"],
        line_direction=["2", "1", "-4"],
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert res.result is not None
    assert res.result.line_canonical == "(x - 1)/2 = (y + 2)/1 = (z - 3)/-4"


def test_line_canonical_zero_denominator_trap():
    """When direction vector has component 0,
    canonical form must trigger TRAP_LINE_CANONICAL_ZERO_DENOM."""
    dsl = GeometryOxyzDSL(
        operation="line_canonical_equation",
        line_point=["1", "2", "3"],
        line_direction=["2", "0", "1"],
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.ERROR
    assert res.error is not None
    assert res.error.code == MisconceptionTrapEnum.TRAP_LINE_CANONICAL_ZERO_DENOM


def test_line_parametric_equation():
    """Parametric form of line through (1, 2, 3) with direction (2, 0, -1)."""
    dsl = GeometryOxyzDSL(
        operation="line_parametric_equation",
        line_point=["1", "2", "3"],
        line_direction=["2", "0", "-1"],
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert res.result is not None
    assert res.result.line_parametric == {
        "x": "2*t + 1",
        "y": "2",
        "z": "3 - t",
    }


def test_line_from_2_points():
    """Line passing through A(1, 2, -1) and B(3, 4, 1)."""
    dsl = GeometryOxyzDSL(
        operation="line_from_2_points",
        point_A=["1", "2", "-1"],
        point_B=["3", "4", "1"],
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert res.result is not None
    assert res.result.line_direction == ["2", "2", "2"]


def test_sphere_from_equation_standard_q_thpt_03():
    """(S): (x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 25 -> I(1, -2, 3), R = 5 (q_thpt_03)."""
    dsl = GeometryOxyzDSL(
        operation="sphere_from_equation",
        sphere_equation="(x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 25",
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert res.result is not None
    assert res.result.sphere_center == ["1", "-2", "3"]
    assert res.result.sphere_radius == "5"
    assert res.result.sphere_radius_numeric == 5.0


def test_sphere_from_equation_general_q_superhard_type3_01():
    """(S): x^2 + y^2 + z^2 - 2x - 4y + 4 = 0 -> I(1, 2, 0), R = 1 (q_superhard_type3_01)."""
    dsl = GeometryOxyzDSL(
        operation="sphere_from_equation",
        sphere_equation="x^2 + y^2 + z^2 - 2x - 4y + 4 = 0",
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert res.result is not None
    assert res.result.sphere_center == ["1", "2", "0"]
    assert res.result.sphere_radius == "1"


def test_sphere_invalid_radius_trap():
    """x^2 + y^2 + z^2 - 2x - 4y - 6z + 100 = 0 has R^2 < 0 -> TRAP_SPHERE_RADIUS_INVALID."""
    dsl = GeometryOxyzDSL(
        operation="sphere_from_equation",
        sphere_equation="x^2 + y^2 + z^2 - 2x - 4y - 6z + 100 = 0",
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.ERROR
    assert res.error is not None
    assert res.error.code == MisconceptionTrapEnum.TRAP_SPHERE_RADIUS_INVALID


def test_sphere_equation_from_center_and_radius():
    """Sphere with center I(1, 2, 3) and radius R = 4."""
    dsl = GeometryOxyzDSL(
        operation="sphere_equation_from_center_and_radius",
        point_I=["1", "2", "3"],
        radius="4",
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert res.result is not None
    assert res.result.sphere_equation_standard == "(x - 1)^2 + (y - 2)^2 + (z - 3)^2 = 16"


def test_sphere_tangent_to_plane_q_hsa_19():
    """Sphere with center I(2, -1, 3) tangent to (Oxy): R = 3
    -> (x-2)^2 + (y+1)^2 + (z-3)^2 = 9 (q_hsa_19)."""
    dsl = GeometryOxyzDSL(
        operation="sphere_tangent_to_plane",
        point_I=["2", "-1", "3"],
        plane_P="(Oxy)",
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert res.result is not None
    assert res.result.sphere_radius == "3"
    assert res.result.sphere_equation_standard == "(x - 2)^2 + (y + 1)^2 + (z - 3)^2 = 9"


def test_distance_point_to_plane_q_hsa_12():
    """Distance from M(1, 2, -3) to 2x - 2y + z + 11 = 0 is 2 (q_hsa_12)."""
    dsl = GeometryOxyzDSL(
        operation="distance_point_to_plane",
        point_M=["1", "2", "-3"],
        plane_P="2x - 2y + z + 11 = 0",
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert res.result is not None
    assert res.result.distance == "2"
    assert res.result.distance_numeric == 2.0


def test_distance_parallel_planes_q_tsa_sa_04():
    """Distance between 2x - y + 2z - 5 = 0 and 2x - y + 2z + 7 = 0 is 4 (q_tsa_sa_04)."""
    dsl = GeometryOxyzDSL(
        operation="distance_parallel_planes",
        plane_P="2x - y + 2z - 5 = 0",
        plane_Q="2x - y + 2z + 7 = 0",
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert res.result is not None
    assert res.result.distance == "4"
    assert res.result.distance_numeric == 4.0


def test_distance_point_to_point_q_thpt_24():
    """Distance between A(1, 2, 3) and B(4, 2, -1) is 5 (q_thpt_24)."""
    dsl = GeometryOxyzDSL(
        operation="distance_point_to_point",
        point_A=["1", "2", "3"],
        point_B=["4", "2", "-1"],
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert res.result is not None
    assert res.result.distance == "5"
    assert res.result.distance_numeric == 5.0


def test_distance_skew_lines_q_tsa_06():
    """Shortest distance between cables d1 and d2 is 40/3 (q_tsa_06)."""
    dsl = GeometryOxyzDSL(
        operation="distance_skew_lines",
        line_d1=r"\frac{x - 10}{2} = \frac{y - 20}{1} = \frac{z - 30}{2}",
        line_d2=r"\frac{x + 10}{1} = \frac{y + 10}{2} = \frac{z - 10}{-2}",
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert res.result is not None
    assert res.result.distance == "40/3"
    assert res.result.is_skew is True


def test_distance_point_to_line():
    """Distance from M(1, 1, 1) to line through O(0, 0, 0) along (0, 0, 1) is sqrt(2)."""
    dsl = GeometryOxyzDSL(
        operation="distance_point_to_line",
        point_M=["1", "1", "1"],
        line_point=["0", "0", "0"],
        line_direction=["0", "0", "1"],
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert res.result is not None
    assert res.result.distance == "sqrt(2)"


def test_angle_between_planes_q_hsa_25():
    """Angle between (P): x + y - 2 = 0 and (Q): y + z + 1 = 0 is 60 deg (q_hsa_25)."""
    dsl = GeometryOxyzDSL(
        operation="angle_between_planes",
        plane_P="x + y - 2 = 0",
        plane_Q="y + z + 1 = 0",
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert res.result is not None
    assert res.result.cos_angle == "1/2"
    assert res.result.angle_deg == "60°"


def test_angle_between_vectors_q_tsa_18():
    """Angle between cable vectors u1=(1, 2, 2) and u2=(2, -1, 2)
    has cos(theta) = 4/9 (q_tsa_18)."""
    dsl = GeometryOxyzDSL(
        operation="angle_between_vectors_3d",
        vector_u=["1", "2", "2"],
        vector_v=["2", "-1", "2"],
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert res.result is not None
    assert res.result.cos_angle == "4/9"


def test_vector_cross_product_is_vector():
    """Cross product [u, v] for u=(1, 2, 3), v=(4, 5, 6)
    is (-3, 6, -3) (GEMINI.md TRAP_CROSS_PRODUCT_IS_SCALAR)."""
    dsl = GeometryOxyzDSL(
        operation="vector_cross_product_3d",
        vector_u=["1", "2", "3"],
        vector_v=["4", "5", "6"],
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert res.result is not None
    assert res.result.vector == ["-3", "6", "-3"]
    assert res.result.vector_cross == ["-3", "6", "-3"]


def test_point_projection_on_plane_q_thpt_18():
    """Orthogonal projection of M(2, -3, 5) onto (Oxy) is (2, -3, 0) (q_thpt_18)."""
    dsl = GeometryOxyzDSL(
        operation="point_projection_on_plane",
        point_M=["2", "-3", "5"],
        plane_P="(Oxy)",
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert res.result is not None
    assert res.result.point == ["2", "-3", "0"]
    assert res.result.projection_point == ["2", "-3", "0"]


def test_intersection_line_and_plane():
    """Line through (0, 0, 0) along (1, 1, 1) intersects x + y + z - 3 = 0 at (1, 1, 1)."""
    dsl = GeometryOxyzDSL(
        operation="intersection_line_plane",
        line_point=["0", "0", "0"],
        line_direction=["1", "1", "1"],
        plane_P="x + y + z - 3 = 0",
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert res.result is not None
    assert res.result.point == ["1", "1", "1"]
    assert res.result.intersection_point == ["1", "1", "1"]


def test_pedagogical_step_trace_completeness():
    """Verify that every step trace item conforms to Prompt 8 pedagogical requirements."""
    dsl = GeometryOxyzDSL(
        operation="distance_point_to_plane",
        point_M=["1", "2", "-3"],
        plane_P="2x - 2y + z + 11 = 0",
    )
    res = solve_geometry_oxyz(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert len(res.steps) >= 1
    for step in res.steps:
        assert step.id
        assert step.latex
        assert step.note_vi
        assert step.value is not None


def test_backward_compatible_dispatch_via_solve_dsl():
    """Verify dispatching via solve_dsl(dsl) works for type 'hinh_hoc_oxyz'."""
    dsl = GeometryOxyzDSL(
        type="hinh_hoc_oxyz",
        operation="plane_normal_vector",
        plane_P="x - 2y + 2z - 6 = 0",
    )
    res = solve_dsl(dsl)
    assert res.status == StatusEnum.VERIFIED
    assert res.result.vector == ["1", "-2", "2"]
