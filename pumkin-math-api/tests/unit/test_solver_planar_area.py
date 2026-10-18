"""
Unit Tests for Planar Area Definite Integral Solver
Validates Area Between Curves, Mathematical Traps (Multiple Intersections,
Sign Alternation, Reversed Bounds, Unbounded Regions, Domain Violations).
"""

import math

import pytest

from app.schemas.common import StatusEnum
from app.schemas.dsl import PlanarAreaDSL
from app.solvers.planar_area import solve_planar_area


@pytest.mark.unit
def test_area_parabola_and_line_canonical():
    """Validates q_thpt_06: y = x^2 and y = 2x -> S = 4/3."""
    dsl = PlanarAreaDSL(
        curve1="x^2",
        curve2="2x",
    )
    env = solve_planar_area(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.area_raw == "4/3"
    assert math.isclose(env.result.area_numeric, 4 / 3, rel_tol=1e-5)
    assert env.result.intersection_points == ["0", "2"]
    assert env.result.lower_bound_evaluated == "0"
    assert env.result.upper_bound_evaluated == "2"


@pytest.mark.unit
def test_area_parabola_and_x_axis_canonical_sqrt2():
    """Validates q_gen_area_1: y = 2 - x^2 and Ox -> S = 8*sqrt(2)/3."""
    dsl = PlanarAreaDSL(
        curve1="2 - x^2",
        curve2="0",
    )
    env = solve_planar_area(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert "8*sqrt(2)/3" in env.result.area_raw or "8*2**(1/2)/3" in env.result.area_raw
    assert math.isclose(env.result.area_numeric, 8 * math.sqrt(2) / 3, rel_tol=1e-5)


@pytest.mark.unit
def test_area_parabola_and_x_axis_canonical_int():
    """Validates q_gen_area_3: y = 4 - x^2 and Ox -> S = 32/3."""
    dsl = PlanarAreaDSL(
        curve1="4 - x^2",
        curve2="0",
    )
    env = solve_planar_area(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.area_raw == "32/3"
    assert math.isclose(env.result.area_numeric, 32 / 3, rel_tol=1e-5)


@pytest.mark.unit
def test_area_parabola_and_x_axis_9():
    """Validates q_gen_area_8: y = 9 - x^2 and Ox -> S = 36."""
    dsl = PlanarAreaDSL(
        curve1="9 - x^2",
        curve2="0",
    )
    env = solve_planar_area(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.area_raw == "36"
    assert math.isclose(env.result.area_numeric, 36.0, rel_tol=1e-5)


@pytest.mark.unit
def test_area_two_intersecting_parabolas():
    """Validates region between y = x^2 and y = 2 - x^2 -> S = 8/3."""
    dsl = PlanarAreaDSL(
        curve1="x^2",
        curve2="2 - x^2",
    )
    env = solve_planar_area(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.area_raw == "8/3"
    assert math.isclose(env.result.area_numeric, 8 / 3, rel_tol=1e-5)


@pytest.mark.unit
def test_area_trap_multiple_intersections_cubic():
    """Validates trap: y = x^3 and y = x has 3 intersections {-1, 0, 1} -> S = 1/2."""
    dsl = PlanarAreaDSL(
        curve1="x^3",
        curve2="x",
    )
    env = solve_planar_area(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.area_raw == "1/2"
    assert math.isclose(env.result.area_numeric, 0.5, rel_tol=1e-5)
    assert env.result.sub_intervals_count == 2


@pytest.mark.unit
def test_area_trap_function_crosses_zero_on_interval():
    """Validates trap: y = x^3 on [-1, 1] without cancelling out to 0 -> S = 1/2."""
    dsl = PlanarAreaDSL(
        curve1="x^3",
        curve2="0",
        lower_bound="-1",
        upper_bound="1",
    )
    env = solve_planar_area(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.area_raw == "1/2"
    assert math.isclose(env.result.area_numeric, 0.5, rel_tol=1e-5)
    assert env.result.sub_intervals_count == 2


@pytest.mark.unit
def test_area_trig_sine_full_period():
    """Validates trap: y = sin(x) on [0, 2pi] partitions at pi -> S = 4 (not 0!)."""
    dsl = PlanarAreaDSL(
        curve1=r"\sin(x)",
        curve2="0",
        lower_bound="0",
        upper_bound=r"2\pi",
    )
    env = solve_planar_area(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.area_raw == "4"
    assert math.isclose(env.result.area_numeric, 4.0, rel_tol=1e-5)
    assert env.result.sub_intervals_count == 2


@pytest.mark.unit
def test_area_trig_cosine_half_period():
    """Validates trap: y = cos(x) on [0, pi] partitions at pi/2 -> S = 2."""
    dsl = PlanarAreaDSL(
        curve1=r"\cos(x)",
        curve2="0",
        lower_bound="0",
        upper_bound=r"\pi",
    )
    env = solve_planar_area(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.area_raw == "2"
    assert math.isclose(env.result.area_numeric, 2.0, rel_tol=1e-5)


@pytest.mark.unit
def test_area_trap_reversed_bounds_normalized():
    """Validates normalization when a = 2 > b = 0 -> S = 2."""
    dsl = PlanarAreaDSL(
        curve1="x",
        curve2="0",
        lower_bound="2",
        upper_bound="0",
    )
    env = solve_planar_area(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.area_raw == "2"
    assert math.isclose(env.result.area_numeric, 2.0, rel_tol=1e-5)


@pytest.mark.unit
def test_area_trap_unbounded_no_intersection_rejected():
    """Validates rejection when curves do not intersect and bounds are omitted."""
    dsl = PlanarAreaDSL(
        curve1="x^2 + 1",
        curve2="0",
    )
    env = solve_planar_area(dsl)
    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "UNBOUNDED_REGION_NO_INTERSECTION"


@pytest.mark.unit
def test_area_trap_single_point_intersection_rejected():
    """Validates rejection when curves intersect at only 1 point (unbounded)."""
    dsl = PlanarAreaDSL(
        curve1="x^3",
        curve2="0",
    )
    env = solve_planar_area(dsl)
    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "UNBOUNDED_REGION_NO_INTERSECTION"


@pytest.mark.unit
def test_area_trap_parallel_lines_rejected():
    """Validates rejection of parallel lines without bounds."""
    dsl = PlanarAreaDSL(
        curve1="2x + 1",
        curve2="2x - 1",
    )
    env = solve_planar_area(dsl)
    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "UNBOUNDED_REGION_NO_INTERSECTION"


@pytest.mark.unit
def test_area_trap_domain_violation_sqrt_negative():
    """Validates domain error when integrating sqrt(x) over negative interval [-2, 1]."""
    dsl = PlanarAreaDSL(
        curve1=r"\sqrt{x}",
        curve2="0",
        lower_bound="-2",
        upper_bound="1",
    )
    env = solve_planar_area(dsl)
    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "DOMAIN_VIOLATION"


@pytest.mark.unit
def test_area_exponential_function():
    """Validates y = e^x, y = 1 on [0, 1] -> S = e - 2."""
    dsl = PlanarAreaDSL(
        curve1="e^x",
        curve2="1",
        lower_bound="0",
        upper_bound="1",
    )
    env = solve_planar_area(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert "-2 + E" in env.result.area_raw or "E - 2" in env.result.area_raw
    assert math.isclose(env.result.area_numeric, math.e - 2, rel_tol=1e-5)


@pytest.mark.unit
def test_area_rational_hyperbola():
    """Validates y = 1/x, y = 0 on [1, e] -> S = 1."""
    dsl = PlanarAreaDSL(
        curve1=r"\frac{1}{x}",
        curve2="0",
        lower_bound="1",
        upper_bound="e",
    )
    env = solve_planar_area(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.area_raw == "1"
    assert math.isclose(env.result.area_numeric, 1.0, rel_tol=1e-5)


@pytest.mark.unit
def test_area_cubic_and_parabola():
    """Validates y = x^3 - 3x and y = x^2 - 3x -> roots 0 and 1 -> S = 1/12."""
    dsl = PlanarAreaDSL(
        curve1="x^3 - 3x",
        curve2="x^2 - 3x",
    )
    env = solve_planar_area(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.area_raw == "1/12"
    assert math.isclose(env.result.area_numeric, 1 / 12, rel_tol=1e-5)


@pytest.mark.unit
def test_area_variable_y_supported():
    """Validates integrating along y: x = y^2 and x = 2 - y^2 -> S = 8/3."""
    dsl = PlanarAreaDSL(
        curve1="y^2",
        curve2="2 - y^2",
        variable="y",
    )
    env = solve_planar_area(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.area_raw == "8/3"
    assert math.isclose(env.result.area_numeric, 8 / 3, rel_tol=1e-5)


@pytest.mark.unit
def test_area_invalid_curve_syntax_rejected():
    """Validates error response on malformed input syntax."""
    dsl = PlanarAreaDSL(
        curve1=r"x^{\sqrt{}}",
        curve2="0",
    )
    env = solve_planar_area(dsl)
    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "PARSE_ERROR_CURVE1"


@pytest.mark.unit
def test_pedagogical_step_trace_completeness():
    """Validates presence and non-emptiness of 5 structured steps."""
    dsl = PlanarAreaDSL(
        curve1="x^2",
        curve2="2x",
    )
    env = solve_planar_area(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert len(env.steps) >= 4
    for step in env.steps:
        assert step.id != ""
        assert step.latex != ""
        assert step.note_vi != ""
        assert step.value is not None
