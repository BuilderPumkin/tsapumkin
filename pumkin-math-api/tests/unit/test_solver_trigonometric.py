"""
Unit Tests for Trigonometric Functions & Equations CAS Solver
Validates:
- Trigonometric equations on intervals (e.g. q_hsa_08: cos(2x) - 3cos(x) + 2 = 0 on [0, 2*pi])
- General trigonometric equations
- Max / Min values via Cauchy-Schwarz and calculus (e.g. q_hsa_06: max = sqrt(13))
- Fundamental period T calculation (e.g. sin(2x) -> pi, cos(3x) -> 2*pi/3)
- Domain analysis & singularity traps (tan requires cos != 0, cot requires sin != 0)
- Elimination of extraneous roots in rational trigonometric expressions
- Inconsistent equations (sin x = 2 -> EmptySet)
- Pedagogical step trace structures for Socratic tutoring (Prompt 8)
"""

import math

import pytest

from app.schemas.common import StatusEnum
from app.schemas.dsl import TrigonometricDSL
from app.solvers.trigonometric import solve_trigonometric


@pytest.mark.unit
def test_trig_interval_roots_count_canonical_q_hsa_08():
    """Validates q_hsa_08: cos(2x) - 3cos(x) + 2 = 0 on [0, 2*pi] -> exactly 4 roots."""
    dsl = TrigonometricDSL(
        type="ham_so_luong_giac_phuong_trinh",
        operation="count_roots_interval",
        equation=r"\cos(2x) - 3\cos(x) + 2 = 0",
        interval=r"[0, 2\pi]",
        variable="x",
    )
    env = solve_trigonometric(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.roots_count == 4
    assert env.result.value_raw == "4"
    assert env.result.interval_roots == ["0", "pi/3", "5*pi/3", "2*pi"]


@pytest.mark.unit
def test_trig_max_min_cauchy_schwarz_canonical_q_hsa_06():
    """Validates q_hsa_06: max of y = 2sin(x) + 3cos(x) is sqrt(13)."""
    dsl = TrigonometricDSL(
        type="ham_so_luong_giac_phuong_trinh",
        operation="max_min",
        expression=r"2\sin(x) + 3\cos(x)",
        variable="x",
    )
    env = solve_trigonometric(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.max_value == "sqrt(13)"
    assert env.result.min_value == "-sqrt(13)"
    assert math.isclose(env.result.max_value_numeric, math.sqrt(13), rel_tol=1e-5)
    assert math.isclose(env.result.min_value_numeric, -math.sqrt(13), rel_tol=1e-5)


@pytest.mark.unit
def test_trig_basic_sin_equation_interval():
    """sin(x) = 1/2 on [0, 2*pi] has 2 roots: pi/6 and 5*pi/6."""
    dsl = TrigonometricDSL(
        type="ham_so_luong_giac_phuong_trinh",
        operation="find_roots_interval",
        equation=r"\sin(x) = 1/2",
        interval=r"[0, 2\pi]",
        variable="x",
    )
    env = solve_trigonometric(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.roots_count == 2
    assert env.result.interval_roots == ["pi/6", "5*pi/6"]


@pytest.mark.unit
def test_trig_basic_cos_equation_interval():
    """cos(x) = 0 on [0, 2*pi] has 2 roots: pi/2 and 3*pi/2."""
    dsl = TrigonometricDSL(
        type="ham_so_luong_giac_phuong_trinh",
        operation="count_roots_interval",
        equation=r"\cos(x) = 0",
        interval=r"[0, 2\pi]",
        variable="x",
    )
    env = solve_trigonometric(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.roots_count == 2
    assert env.result.interval_roots == ["pi/2", "3*pi/2"]


@pytest.mark.unit
def test_trig_basic_tan_equation_interval():
    """tan(x) = 1 on [0, 2*pi] has 2 roots: pi/4 and 5*pi/4."""
    dsl = TrigonometricDSL(
        type="ham_so_luong_giac_phuong_trinh",
        operation="count_roots_interval",
        equation=r"\tan(x) = 1",
        interval=r"[0, 2\pi]",
        variable="x",
    )
    env = solve_trigonometric(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.roots_count == 2
    assert env.result.interval_roots == ["pi/4", "5*pi/4"]


@pytest.mark.unit
def test_trig_quadratic_sin_interval():
    """2*sin^2(x) - 3*sin(x) + 1 = 0 on [0, 2*pi] -> 3 roots: pi/6, pi/2, 5*pi/6."""
    dsl = TrigonometricDSL(
        type="ham_so_luong_giac_phuong_trinh",
        operation="count_roots_interval",
        equation=r"2\sin^2(x) - 3\sin(x) + 1 = 0",
        interval=r"[0, 2\pi]",
        variable="x",
    )
    env = solve_trigonometric(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.roots_count == 3
    assert env.result.interval_roots == ["pi/6", "pi/2", "5*pi/6"]


@pytest.mark.unit
def test_trig_inconsistent_equation_interval():
    """sin(x) = 2 has no roots on any real interval."""
    dsl = TrigonometricDSL(
        type="ham_so_luong_giac_phuong_trinh",
        operation="count_roots_interval",
        equation=r"\sin(x) = 2",
        interval=r"[0, 2\pi]",
        variable="x",
    )
    env = solve_trigonometric(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.roots_count == 0
    assert env.result.interval_roots == []
    assert env.result.value_raw == "0"


@pytest.mark.unit
def test_trig_inconsistent_equation_general():
    """cos(x) = -3 has no real solutions."""
    dsl = TrigonometricDSL(
        type="ham_so_luong_giac_phuong_trinh",
        operation="solve_equation",
        equation=r"\cos(x) = -3",
        variable="x",
    )
    env = solve_trigonometric(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.roots_count == 0
    assert env.result.general_solutions == []
    assert env.result.value_raw == "vo_nghiem"


@pytest.mark.unit
def test_trig_extraneous_roots_rational():
    """sin(2x)/cos(x) = 0 on [0, 2*pi] rejects cos(x)=0 roots (pi/2, 3pi/2), keeping 0, pi, 2pi."""
    dsl = TrigonometricDSL(
        type="ham_so_luong_giac_phuong_trinh",
        operation="count_roots_interval",
        equation=r"\frac{\sin(2x)}{\cos(x)} = 0",
        interval=r"[0, 2\pi]",
        variable="x",
    )
    env = solve_trigonometric(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.roots_count == 3
    assert env.result.interval_roots == ["0", "pi", "2*pi"]


@pytest.mark.unit
def test_trig_period_basic_sin():
    """sin(2x) has fundamental period T = pi."""
    dsl = TrigonometricDSL(
        type="ham_so_luong_giac_phuong_trinh",
        operation="period",
        expression=r"\sin(2x)",
        variable="x",
    )
    env = solve_trigonometric(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.period_value == "pi"


@pytest.mark.unit
def test_trig_period_basic_cos():
    """cos(3x) has fundamental period T = 2*pi/3."""
    dsl = TrigonometricDSL(
        type="ham_so_luong_giac_phuong_trinh",
        operation="period",
        expression=r"\cos(3x)",
        variable="x",
    )
    env = solve_trigonometric(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.period_value == "2*pi/3"


@pytest.mark.unit
def test_trig_period_sum():
    """sin(2x) + cos(4x) has fundamental period T = pi."""
    dsl = TrigonometricDSL(
        type="ham_so_luong_giac_phuong_trinh",
        operation="period",
        expression=r"\sin(2x) + \cos(4x)",
        variable="x",
    )
    env = solve_trigonometric(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.period_value == "pi"


@pytest.mark.unit
def test_trig_domain_tan():
    """tan(x) domain constraint requires cos(x) != 0 -> x != pi/2 + k*pi."""
    dsl = TrigonometricDSL(
        type="ham_so_luong_giac_phuong_trinh",
        operation="domain",
        expression=r"\tan(x)",
        variable="x",
    )
    env = solve_trigonometric(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert r"\frac{\pi}{2} + k\pi" in env.result.domain_condition


@pytest.mark.unit
def test_trig_domain_cot():
    """cot(x) domain constraint requires sin(x) != 0 -> x != k*pi."""
    dsl = TrigonometricDSL(
        type="ham_so_luong_giac_phuong_trinh",
        operation="domain",
        expression=r"\cot(x)",
        variable="x",
    )
    env = solve_trigonometric(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert r"k\pi" in env.result.domain_condition


@pytest.mark.unit
def test_trig_max_min_pure_sin():
    """y = 3*sin(x) - 4 -> max = -1, min = -7."""
    dsl = TrigonometricDSL(
        type="ham_so_luong_giac_phuong_trinh",
        operation="max_min",
        expression=r"3\sin(x) - 4",
        variable="x",
    )
    env = solve_trigonometric(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.max_value == "-1"
    assert env.result.min_value == "-7"


@pytest.mark.unit
def test_trig_max_min_linear_symmetric():
    """y = sin(x) + cos(x) -> max = sqrt(2), min = -sqrt(2)."""
    dsl = TrigonometricDSL(
        type="ham_so_luong_giac_phuong_trinh",
        operation="max_min",
        expression=r"\sin(x) + \cos(x)",
        variable="x",
    )
    env = solve_trigonometric(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.max_value == "sqrt(2)"
    assert env.result.min_value == "-sqrt(2)"


@pytest.mark.unit
def test_trig_general_solution_sin():
    """sin(x) = 0 generally has solutions k*pi."""
    dsl = TrigonometricDSL(
        type="ham_so_luong_giac_phuong_trinh",
        operation="solve_equation",
        equation=r"\sin(x) = 0",
        variable="x",
    )
    env = solve_trigonometric(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.general_solutions is not None
    assert len(env.result.general_solutions) > 0


@pytest.mark.unit
def test_trig_sum_roots_interval():
    """sin(x) = 1/2 on [0, 2*pi] -> sum of roots is pi/6 + 5*pi/6 = pi."""
    dsl = TrigonometricDSL(
        type="ham_so_luong_giac_phuong_trinh",
        operation="sum_roots_interval",
        equation=r"\sin(x) = 1/2",
        interval=r"[0, 2\pi]",
        variable="x",
    )
    env = solve_trigonometric(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.roots_sum == "pi"
    assert math.isclose(env.result.value_numeric, math.pi, rel_tol=1e-5)


@pytest.mark.unit
def test_trig_invalid_syntax_error():
    """Invalid equation string returns status ERROR."""
    dsl = TrigonometricDSL(
        type="ham_so_luong_giac_phuong_trinh",
        operation="solve_equation",
        equation=r"\sin(x+++) = 0",
        variable="x",
    )
    env = solve_trigonometric(dsl)
    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "INVALID_TRIG_SYNTAX"


@pytest.mark.unit
def test_trig_step_traces_structure():
    """Verifies that all steps produced have id, latex, note_vi, and value."""
    dsl = TrigonometricDSL(
        type="ham_so_luong_giac_phuong_trinh",
        operation="count_roots_interval",
        equation=r"\cos(2x) - 3\cos(x) + 2 = 0",
        interval=r"[0, 2\pi]",
        variable="x",
    )
    env = solve_trigonometric(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert len(env.steps) >= 3
    for step in env.steps:
        assert step.id
        assert step.latex
        assert step.note_vi
        assert step.value is not None
