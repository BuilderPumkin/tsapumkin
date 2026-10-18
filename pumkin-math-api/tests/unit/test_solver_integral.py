"""
Unit Tests for Integral Solver (Kỹ thuật tính nguyên hàm - tích phân cơ bản & nâng cao)
Verifies:
- Indefinite integrals (polynomial, trig, exp, rational)
- Definite integrals (standard, equal bounds, flipped bounds)
- Integration methods (by parts, substitution)
- Integration constant resolution via initial condition F(x0) = y0
- Domain traps: interior singularities/poles, improper integrals, divergence
- Negative cases: invalid bounds, syntax errors
- Pedagogical step tracing completeness (id, latex, note_vi, value)
"""

import pytest
from pydantic import ValidationError

from app.schemas.common import StatusEnum, WarningCode
from app.schemas.dsl import IntegralDSL, IntegralInitialCondition
from app.solvers.registry import solve_dsl


@pytest.mark.unit
def test_indefinite_polynomial():
    """Basic antiderivative: int (3x^2 - 4x + 1) dx = x^3 - 2x^2 + x + C."""
    dsl = IntegralDSL(integrand="3x^2 - 4x + 1")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.is_definite is False
    assert env.result.reverse_derivative_verified is True
    assert "x^{3} - 2 x^{2} + x" in env.result.antiderivative_latex
    assert env.result.constant_symbol == "C"


@pytest.mark.unit
def test_indefinite_trigonometric():
    """Antiderivative of trig function: int cos(3x + 1) dx = 1/3 sin(3x + 1) + C."""
    dsl = IntegralDSL(integrand=r"\cos(3x + 1)")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.reverse_derivative_verified is True
    assert r"\frac{\sin{\left(3 x + 1 \right)}}{3}" in env.result.antiderivative_latex


@pytest.mark.unit
def test_indefinite_exponential():
    """Antiderivative of exponential: int e^{2x} dx = 1/2 e^{2x} + C."""
    dsl = IntegralDSL(integrand=r"e^{2x}")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.reverse_derivative_verified is True
    assert r"\frac{e^{2 x}}{2}" in env.result.antiderivative_latex


@pytest.mark.unit
def test_indefinite_rational():
    """Antiderivative of rational: int 1/x dx = ln(x) + C."""
    dsl = IntegralDSL(integrand=r"\frac{1}{x}")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.reverse_derivative_verified is True
    assert r"\log" in env.result.antiderivative_latex


@pytest.mark.unit
def test_indefinite_by_parts_with_hint():
    """Integration by parts: int x e^x dx = (x - 1)e^x + C with by_parts hints."""
    dsl = IntegralDSL(
        integrand=r"x e^x",
        method_hint="by_parts",
        by_parts_u="x",
        by_parts_dv="e^x",
    )
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.reverse_derivative_verified is True
    assert "e^{x}" in env.result.antiderivative_latex
    # Check pedagogical step trace for by_parts
    step_ids = [s.id for s in env.steps]
    assert "step_by_parts_setup" in step_ids


@pytest.mark.unit
def test_indefinite_substitution_with_hint():
    """Integration by substitution: int ln(x)/x dx with substitution hint."""
    dsl = IntegralDSL(
        integrand=r"\frac{\ln x}{x}",
        method_hint="substitution",
        substitution=r"\ln x",
    )
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.reverse_derivative_verified is True
    step_ids = [s.id for s in env.steps]
    assert "step_substitution_setup" in step_ids


@pytest.mark.unit
def test_indefinite_initial_condition_resolves_constant():
    """Given f(x) = 2x + 1 and F(1) = 5, particular solution F(x) = x^2 + x + 3."""
    dsl = IntegralDSL(
        integrand="2x + 1",
        initial_condition=IntegralInitialCondition(point="1", value="5"),
    )
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.determined_constant == "3"
    assert env.result.particular_antiderivative_latex == "x^{2} + x + 3"


@pytest.mark.unit
def test_definite_polynomial_basic():
    """Definite integral: int_0^1 (3x^2 + 2x) dx = 2."""
    dsl = IntegralDSL(integrand="3x^2 + 2x", lower_bound="0", upper_bound="1")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.is_definite is True
    assert env.result.value_latex == "2"
    assert env.result.value_float == 2.0
    assert env.result.numerical_quad_verified is True


@pytest.mark.unit
def test_definite_equal_bounds_is_zero():
    """Trap/Identity: int_a^a f(x) dx == 0."""
    dsl = IntegralDSL(integrand=r"\sqrt{x^2 + 1}", lower_bound="2", upper_bound="2")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.value_latex == "0"
    assert env.result.value_float == 0.0


@pytest.mark.unit
def test_definite_flipped_bounds():
    """Trap: int_1^0 (3x^2 + 2x) dx == -2 with WARN_FLIPPED_BOUNDS."""
    dsl = IntegralDSL(integrand="3x^2 + 2x", lower_bound="1", upper_bound="0")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.value_latex == "-2"
    assert env.result.value_float == -2.0
    warning_codes = [w.code for w in env.warnings]
    assert WarningCode.WARN_FLIPPED_BOUNDS in warning_codes


@pytest.mark.unit
def test_definite_rational_with_log_result():
    """Definite integral: int_1^2 (2x + 1)/(x^2 + x) dx = ln(3)."""
    dsl = IntegralDSL(integrand=r"\frac{2x + 1}{x^2 + x}", lower_bound="1", upper_bound="2")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.numerical_quad_verified is True
    assert abs(env.result.value_float - 1.098612) < 1e-4


@pytest.mark.unit
def test_definite_improper_type1_convergent():
    """Improper integral type 1: int_0^{+oo} x e^{-x} dx = 1."""
    dsl = IntegralDSL(integrand=r"x e^{-x}", lower_bound="0", upper_bound=r"+\infty")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.is_improper is True
    assert env.result.value_latex == "1"
    assert env.result.value_float == 1.0


@pytest.mark.unit
def test_definite_improper_type2_convergent():
    """Improper integral type 2: int_0^1 1/sqrt(1 - x^2) dx = pi/2."""
    dsl = IntegralDSL(integrand=r"\frac{1}{\sqrt{1 - x^2}}", lower_bound="0", upper_bound="1")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert r"\frac{\pi}{2}" in env.result.value_latex
    assert abs(env.result.value_float - 1.570796) < 1e-4
    warning_codes = [w.code for w in env.warnings]
    assert WarningCode.WARN_IMPROPER_INTEGRAL in warning_codes


@pytest.mark.unit
def test_trap_interior_singularity_divergent_1_over_x():
    """Trap: int_{-1}^1 1/x dx has pole at 0 in (-1, 1). Must return needs_review."""
    dsl = IntegralDSL(integrand=r"\frac{1}{x}", lower_bound="-1", upper_bound="1")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.NEEDS_REVIEW
    warning_codes = [w.code for w in env.warnings]
    assert WarningCode.WARN_SINGULARITY_IN_INTERVAL in warning_codes


@pytest.mark.unit
def test_trap_interior_singularity_divergent_1_over_x_squared():
    """Trap: int_{-1}^1 1/x^2 dx diverges to +oo. Blind Newton-Leibniz yields -2 (absurd)."""
    dsl = IntegralDSL(integrand=r"\frac{1}{x^2}", lower_bound="-1", upper_bound="1")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.NEEDS_REVIEW
    warning_codes = [w.code for w in env.warnings]
    assert WarningCode.WARN_SINGULARITY_IN_INTERVAL in warning_codes


@pytest.mark.unit
def test_trap_singularity_outside_interval_no_false_alarm():
    """Singularity x=3 is outside [1, 2] for 1/(x-3). Must solve without false trap alarm."""
    dsl = IntegralDSL(integrand=r"\frac{1}{x - 3}", lower_bound="1", upper_bound="2")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    warning_codes = [w.code for w in env.warnings]
    assert WarningCode.WARN_SINGULARITY_IN_INTERVAL not in warning_codes


@pytest.mark.unit
def test_trap_divergent_improper_infinite_bounds():
    """Divergent improper integral: int_1^{+oo} 1/x dx = +oo. Must return needs_review."""
    dsl = IntegralDSL(integrand=r"\frac{1}{x}", lower_bound="1", upper_bound=r"+\infty")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.NEEDS_REVIEW
    warning_codes = [w.code for w in env.warnings]
    assert WarningCode.WARN_DIVERGENT_INTEGRAL in warning_codes


@pytest.mark.unit
def test_reverse_derivative_check_trig_identity():
    """Reverse derivative test handles trig form int sin^2(x) dx properly."""
    dsl = IntegralDSL(integrand=r"\sin^2 x")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.reverse_derivative_verified is True


@pytest.mark.unit
def test_invalid_dsl_single_bound_raises_validation_error():
    """Pydantic model must reject asymmetric bounds (only lower or upper provided)."""
    with pytest.raises(ValidationError) as exc_info:
        IntegralDSL(integrand="x^2", lower_bound="0", upper_bound=None)
    assert "Tích phân xác định yêu cầu cả cận dưới" in str(exc_info.value)


@pytest.mark.unit
def test_invalid_syntax_integrand_returns_error_envelope():
    """Syntax error in integrand returns error envelope with INVALID_LATEX."""
    dsl = IntegralDSL(integrand="x++")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "INVALID_LATEX"


@pytest.mark.unit
def test_pedagogical_step_trace_completeness():
    """All intermediate steps must have id, latex, note_vi, and value."""
    dsl = IntegralDSL(integrand="3x^2 + 2x", lower_bound="0", upper_bound="1")
    env = solve_dsl(dsl)

    assert len(env.steps) >= 4
    for step in env.steps:
        assert step.id.strip() != ""
        assert step.latex.strip() != ""
        assert step.note_vi.strip() != ""
        assert step.value is not None
