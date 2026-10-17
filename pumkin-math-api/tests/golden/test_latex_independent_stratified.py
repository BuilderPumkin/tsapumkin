"""
Independent Stratified Test Suite for Pumkin Math API LaTeX Parser
Contains >= 200 brand new test cases sampled stratified across fields (question_text,
options, explanation) and SPEC categories from pumkin3/data/questions/all.json.

Verification modes:
- hand_verified: Symbolic AST representation and domain constraints verified by hand.
- numerical_eval_20pts: Evaluated across 20 sample test points against an independent
  reference function.

Also includes dedicated tests for:
- Rejection of leftover trailing tokens (UNEXPECTED_TOKEN)
- Semantic ambiguities (Item 7: sin 2x, ln x^2, log_2 x + 1, f(x), 1,5 vs 1.000.000,
  2^x y, \\frac12x, \\approx)
- Resource boundaries (Item 8: large digits, 2027^{2026}, towers, factorial > 100!,
  root > 100, binom > 10000, sum > 100000; all timed < 20 ms).
"""

import json
import os
import time
import tracemalloc
from typing import Any

import pytest
import sympy

from app.latex import parse_latex

CASES_FILE = os.path.join(os.path.dirname(__file__), "latex_independent_stratified_cases.json")

with open(CASES_FILE, encoding="utf-8") as f:
    STRATIFIED_CASES: list[dict[str, Any]] = json.load(f)


def test_stratified_dataset_has_at_least_200_cases():
    """Confirms the stratified dataset fulfills the >= 200 requirement."""
    assert len(STRATIFIED_CASES) >= 200, f"Expected >= 200 cases, found {len(STRATIFIED_CASES)}"


@pytest.mark.parametrize(
    "case", STRATIFIED_CASES, ids=lambda c: f"{c['case_id']}::{c['qid']}::{c['category']}"
)
def test_independent_stratified_snippet(case: dict[str, Any]):
    """
    Validates a real stratified LaTeX snippet against its verified symbolic representation
    or 20-point numerical evaluation.
    """
    latex_str = case["latex"]
    expected_repr = case["expected_repr"]
    expected_vars = case["variables"]
    expected_num_constraints = case["num_constraints"]
    mode = case["verification_mode"]

    res = parse_latex(latex_str)

    assert res.is_success is True, f"Failed parsing: {latex_str!r} | Reason: {res.reason_vi}"
    msg_mismatch = (
        f"Repr mismatch for '{latex_str}':\n"
        f"  Got:      {repr(res.expr)}\n"
        f"  Expected: {expected_repr}"
    )
    assert repr(res.expr) == expected_repr, msg_mismatch
    assert res.variables == expected_vars, f"Variable mismatch for '{latex_str}'"
    assert len(res.constraints) == expected_num_constraints, (
        f"Constraint count mismatch for '{latex_str}'"
    )

    # Multi-point numerical evaluation (>= 20 points)
    if mode == "numerical_eval_20pts":
        points = case["sample_points"]
        expected_values = case["expected_values"]
        assert len(points) == 20, "Must test exactly 20 sample points"
        assert len(expected_values) == 20, "Must have 20 reference values"

        target_expr = res.expr.rhs if hasattr(res.expr, "rhs") else res.expr
        free_syms = list(target_expr.free_symbols)
        assert len(free_syms) == 1, f"Expected single variable in evaluable expr, got {free_syms}"
        var_sym = free_syms[0]

        for pt, exp_val in zip(points, expected_values, strict=True):
            sub_val = target_expr.subs(var_sym, pt).evalf()
            actual_float = float(complex(sub_val).real)
            assert actual_float == pytest.approx(exp_val, rel=1e-4, abs=1e-4), (
                f"Numerical evaluation mismatch at {var_sym}={pt} for '{latex_str}':\n"
                f"  Got:      {actual_float}\n"
                f"  Expected: {exp_val}"
            )


# =============================================================================
# TRAILING LEFTOVER TOKENS REJECTION
# =============================================================================


class TestTrailingTokensRejection:
    @pytest.mark.parametrize(
        "invalid_latex",
        [
            "x = 5 10",
            r"2x + 1 ,",
            r"\sin(x) )",
            r"\frac{1}{2} , 3",
            r"x + 1 ; 2",
            r"2^x + 3 ]",
        ],
    )
    def test_unparsed_leftover_tokens_rejected(self, invalid_latex: str):
        """Parser must fail with UNEXPECTED_TOKEN if unparsed tokens remain."""
        res = parse_latex(invalid_latex)
        assert res.is_success is False, f"Expected rejection for '{invalid_latex}', got success"
        assert res.error_code == "UNEXPECTED_TOKEN", (
            f"Expected error_code UNEXPECTED_TOKEN, got {res.error_code}"
        )


# =============================================================================
# ITEM 7: SEMANTIC AMBIGUITIES AND CONVENTIONS
# =============================================================================


class TestSemanticAmbiguitiesAndConventions:
    def test_ambiguity_sin_2x(self):
        """\\sin 2x is parsed as sin(2*x) and emits WARN_AMBIGUOUS_TRIG_ARGUMENT."""
        res = parse_latex(r"\sin 2x")
        assert res.is_success is True
        assert repr(res.expr) == "sin(2*x)"
        warn_codes = [w.code for w in res.warnings]
        assert "WARN_AMBIGUOUS_TRIG_ARGUMENT" in warn_codes

    def test_ambiguity_ln_x_squared(self):
        """\\ln x^2 is parsed as ln(x^2) and emits WARN_AMBIGUOUS_LOG_ARGUMENT."""
        res = parse_latex(r"\ln x^2")
        assert res.is_success is True
        assert repr(res.expr) == "log(x**2)"
        warn_codes = [w.code for w in res.warnings]
        assert "WARN_AMBIGUOUS_LOG_ARGUMENT" in warn_codes

    def test_ambiguity_log2_x_plus_1(self):
        """\\log_2 x + 1 is parsed as (\\log_2 x) + 1 and emits WARN_AMBIGUOUS_LOG_SCOPE."""
        res = parse_latex(r"\log_2 x + 1")
        assert res.is_success is True
        assert repr(res.expr) == "log(x)/log(2) + 1" or repr(res.expr) == "1 + log(x)/log(2)"
        warn_codes = [w.code for w in res.warnings]
        assert "WARN_AMBIGUOUS_LOG_SCOPE" in warn_codes

    def test_ambiguity_implicit_function_call(self):
        """f(x) is parsed as Function('f')(x) and emits WARN_IMPLICIT_FUNCTION_CALL."""
        res = parse_latex("f(x)")
        assert res.is_success is True
        assert repr(res.expr) == "f(x)"
        assert isinstance(res.expr, sympy.Function)
        warn_codes = [w.code for w in res.warnings]
        assert "WARN_IMPLICIT_FUNCTION_CALL" in warn_codes

    def test_ambiguity_vietnamese_decimal_comma(self):
        """1,5 is parsed as 1.5 (Rational(3, 2)) and emits WARN_DECIMAL_COMMA_USED."""
        res = parse_latex("1,5")
        assert res.is_success is True
        assert res.expr == sympy.Rational(3, 2)
        warn_codes = [w.code for w in res.warnings]
        assert "WARN_DECIMAL_COMMA_USED" in warn_codes

    def test_ambiguity_thousands_separator(self):
        """1.000.000 is parsed as 1000000 and emits WARN_THOUSANDS_SEPARATOR_USED."""
        res = parse_latex("1.000.000")
        assert res.is_success is True
        assert res.expr == sympy.Integer(1000000)
        warn_codes = [w.code for w in res.warnings]
        assert "WARN_THOUSANDS_SEPARATOR_USED" in warn_codes

    def test_ambiguity_power_implicit_mul(self):
        """2^x y is parsed as (2^x)*y and emits WARN_POWER_IMPLICIT_MUL."""
        res = parse_latex("2^x y")
        assert res.is_success is True
        assert repr(res.expr) == "2**x*y"
        warn_codes = [w.code for w in res.warnings]
        assert "WARN_POWER_IMPLICIT_MUL" in warn_codes

    def test_ambiguity_frac_half_x(self):
        """\\frac12x is parsed as (1/2)*x and emits WARN_AMBIGUOUS_FRACTION_MULTIPLICATION."""
        res = parse_latex(r"\frac12x")
        assert res.is_success is True
        assert repr(res.expr) == "x/2"
        warn_codes = [w.code for w in res.warnings]
        assert "WARN_AMBIGUOUS_FRACTION_MULTIPLICATION" in warn_codes

    def test_ambiguity_sin_x_cos_x(self):
        """\\sin x\\cos x is parsed as sin(x)*cos(x) and emits WARN_AMBIGUOUS_TRIG_ARGUMENT."""
        res = parse_latex(r"\sin x\cos x")
        assert res.is_success is True
        assert repr(res.expr) == "sin(x)*cos(x)"
        warn_codes = [w.code for w in res.warnings]
        assert "WARN_AMBIGUOUS_TRIG_ARGUMENT" in warn_codes

    def test_ambiguity_differential_dx(self):
        """dx alone is rejected outside an integral, but accepted inside \\int f(x) dx."""
        res_standalone = parse_latex("dx")
        assert res_standalone.is_success is False
        assert res_standalone.error_code in ("SYNTAX_ERROR", "UNSUPPORTED_SYNTAX")

        res_integral = parse_latex(r"\int x dx")
        assert res_integral.is_success is True
        assert repr(res_integral.expr) == "Integral(x, x)"

    def test_ambiguity_euler_e(self):
        """e is parsed as Euler's constant E and e^x as exp(x)."""
        res_e = parse_latex("e")
        assert res_e.is_success is True
        assert res_e.expr == sympy.E

        res_exp = parse_latex("e^x")
        assert res_exp.is_success is True
        assert repr(res_exp.expr) == "exp(x)"

    def test_ambiguity_comma_variations_and_rejections(self):
        """1,5, x=1,5, (1,5) vs (1, 5)."""
        res_dec = parse_latex("1,5")
        assert res_dec.is_success is True
        assert res_dec.expr == sympy.Rational(3, 2)
        assert "WARN_DECIMAL_COMMA_USED" in [w.code for w in res_dec.warnings]

        res_eq = parse_latex("x=1,5")
        assert res_eq.is_success is True
        assert res_eq.expr == sympy.Eq(sympy.Symbol("x"), sympy.Rational(3, 2))
        assert "WARN_DECIMAL_COMMA_USED" in [w.code for w in res_eq.warnings]

        res_paren = parse_latex("(1,5)")
        assert res_paren.is_success is True
        assert res_paren.expr == sympy.Rational(3, 2)
        assert "WARN_DECIMAL_COMMA_USED" in [w.code for w in res_paren.warnings]

        # (1, 5) coordinate/interval is outside single-formula algebraic subset and rejected
        res_coord = parse_latex("(1, 5)")
        assert res_coord.is_success is False

    def test_ambiguity_geometry_labels(self):
        """Labels like d_1: and (P): are stripped and stored in metadata with warning."""
        res_d1 = parse_latex(r"d_1: 2x - y = 0")
        assert res_d1.is_success is True
        assert repr(res_d1.expr) == "Eq(2*x - y, 0)"
        assert res_d1.metadata.get("stripped_label") == "d_1"
        assert "WARN_STRIPPED_LABEL_PREFIX" in [w.code for w in res_d1.warnings]

        res_p = parse_latex(r"(P): x + y + z = 1")
        assert res_p.is_success is True
        assert repr(res_p.expr) == "Eq(x + y + z, 1)"
        assert res_p.metadata.get("stripped_label") == "(P)"
        assert "WARN_STRIPPED_LABEL_PREFIX" in [w.code for w in res_p.warnings]

    def test_ambiguity_physical_unit_metadata(self):
        """Units like \\text{cm} or \\text{m/s} are stripped into metadata with warning."""
        res_cm = parse_latex(r"10\text{ cm}")
        assert res_cm.is_success is True
        assert res_cm.expr == sympy.Integer(10)
        assert res_cm.metadata.get("stripped_unit") == "cm"
        assert "WARN_STRIPPED_PHYSICAL_UNIT" in [w.code for w in res_cm.warnings]

        res_speed = parse_latex(r"5\text{ m/s}")
        assert res_speed.is_success is True
        assert res_speed.expr == sympy.Integer(5)
        assert res_speed.metadata.get("stripped_unit") == "m/s"
        assert "WARN_STRIPPED_PHYSICAL_UNIT" in [w.code for w in res_speed.warnings]

    def test_approx_rejected(self):
        """\\approx is not treated as equality; rejected with UNSUPPORTED_SYNTAX."""
        res = parse_latex(r"\pi \approx 3.14")
        assert res.is_success is False
        assert res.error_code == "UNSUPPORTED_SYNTAX"
        assert "xấp xỉ" in (res.reason_vi or "")


# =============================================================================
# ITEM 8: MATHEMATICAL RESOURCE EXHAUSTION PROTECTION (< 20 ms)
# =============================================================================


class TestResourceExhaustionProtection:
    def test_resource_limit_large_number_string(self):
        """A 5000-digit number string is rejected in < 20 ms without blowing up RAM."""
        giant_num = "9" * 5000
        start = time.perf_counter()
        res = parse_latex(giant_num)
        duration_ms = (time.perf_counter() - start) * 1000.0

        assert res.is_success is False
        assert res.error_code == "RESOURCE_LIMIT_EXCEEDED"
        assert duration_ms < 20.0, f"Took {duration_ms:.2f} ms (must be < 20 ms)"

    def test_resource_limit_power_tower(self):
        """A power tower 9^{9^{9^9}} is rejected in < 20 ms."""
        tower_latex = "9^{9^{9^9}}"
        start = time.perf_counter()
        res = parse_latex(tower_latex)
        duration_ms = (time.perf_counter() - start) * 1000.0

        assert res.is_success is False
        assert res.error_code == "RESOURCE_LIMIT_EXCEEDED"
        assert duration_ms < 20.0, f"Took {duration_ms:.2f} ms (must be < 20 ms)"

    def test_resource_limit_large_exponent(self):
        """Real question snippet 2027^{2026} (exponent > 1000) rejected in < 20 ms."""
        start = time.perf_counter()
        res = parse_latex("2027^{2026}")
        duration_ms = (time.perf_counter() - start) * 1000.0

        assert res.is_success is False
        assert res.error_code == "RESOURCE_LIMIT_EXCEEDED"
        assert duration_ms < 20.0, f"Took {duration_ms:.2f} ms (must be < 20 ms)"

    def test_resource_limit_factorial(self):
        """Factorial 150! (> 100!) rejected in < 20 ms."""
        start = time.perf_counter()
        res = parse_latex("150!")
        duration_ms = (time.perf_counter() - start) * 1000.0

        assert res.is_success is False
        assert res.error_code == "RESOURCE_LIMIT_EXCEEDED"
        assert duration_ms < 20.0, f"Took {duration_ms:.2f} ms (must be < 20 ms)"

    def test_resource_limit_radical_index(self):
        """Radical index \\sqrt[10000]{x} (> 100) rejected in < 20 ms."""
        start = time.perf_counter()
        res = parse_latex(r"\sqrt[10000]{x}")
        duration_ms = (time.perf_counter() - start) * 1000.0

        assert res.is_success is False
        assert res.error_code == "RESOURCE_LIMIT_EXCEEDED"
        assert duration_ms < 20.0, f"Took {duration_ms:.2f} ms (must be < 20 ms)"

    def test_resource_limit_binomial(self):
        """Binomial \\binom{20000}{5} (n > 10000) rejected in < 20 ms."""
        start = time.perf_counter()
        res = parse_latex(r"\binom{20000}{5}")
        duration_ms = (time.perf_counter() - start) * 1000.0

        assert res.is_success is False
        assert res.error_code == "RESOURCE_LIMIT_EXCEEDED"
        assert duration_ms < 20.0, f"Took {duration_ms:.2f} ms (must be < 20 ms)"

    def test_resource_limit_summation(self):
        """Summation \\sum_{k=1}^{500000} k (range > 100000) rejected in < 20 ms."""
        start = time.perf_counter()
        res = parse_latex(r"\sum_{k=1}^{500000} k")
        duration_ms = (time.perf_counter() - start) * 1000.0

        assert res.is_success is False
        assert res.error_code == "RESOURCE_LIMIT_EXCEEDED"
        assert duration_ms < 20.0, f"Took {duration_ms:.2f} ms (must be < 20 ms)"

    def test_composite_nested_power_tower(self):
        """(9^{999})^{999} rejected in < 20 ms without memory explosion."""
        start = time.perf_counter()
        res = parse_latex("(9^{999})^{999}")
        duration_ms = (time.perf_counter() - start) * 1000.0

        assert res.is_success is False
        assert res.error_code == "RESOURCE_LIMIT_EXCEEDED"
        assert duration_ms < 20.0, f"Took {duration_ms:.2f} ms (must be < 20 ms)"

    def test_composite_factorial_power(self):
        """(100!)^{1000} rejected in < 20 ms without memory explosion."""
        start = time.perf_counter()
        res = parse_latex("(100!)^{1000}")
        duration_ms = (time.perf_counter() - start) * 1000.0

        assert res.is_success is False
        assert res.error_code == "RESOURCE_LIMIT_EXCEEDED"
        assert duration_ms < 20.0, f"Took {duration_ms:.2f} ms (must be < 20 ms)"

    def test_composite_binomial_power(self):
        """\\binom{10000}{5000}^{1000} rejected in < 50 ms."""
        start = time.perf_counter()
        res = parse_latex(r"\binom{10000}{5000}^{1000}")
        duration_ms = (time.perf_counter() - start) * 1000.0

        assert res.is_success is False
        assert res.error_code == "RESOURCE_LIMIT_EXCEEDED"
        assert duration_ms < 50.0, f"Took {duration_ms:.2f} ms (must be < 50 ms)"

    def test_composite_repeated_factorial(self):
        """100! \\cdot 100! \\cdot 100! completes within safe limits."""
        start = time.perf_counter()
        res = parse_latex(r"100! \cdot 100! \cdot 100!")
        duration_ms = (time.perf_counter() - start) * 1000.0

        assert res.is_success is True
        assert duration_ms < 20.0

    def test_composite_radical_power(self):
        """\\sqrt[100]{9^{999}} evaluates within safe limits."""
        start = time.perf_counter()
        res = parse_latex(r"\sqrt[100]{9^{999}}")
        duration_ms = (time.perf_counter() - start) * 1000.0

        assert res.is_success is True
        assert duration_ms < 20.0

    def test_composite_nested_sum(self):
        """\\sum_{i=1}^{500} \\sum_{j=1}^{500} (i+j) evaluates within limits."""
        start = time.perf_counter()
        res = parse_latex(r"\sum_{i=1}^{500} \sum_{j=1}^{500} (i+j)")
        duration_ms = (time.perf_counter() - start) * 1000.0

        assert res.is_success is True
        assert duration_ms < 500.0

    def test_resource_boundary_cases_time_and_ram(self):
        """Boundary cases (100!, \\binom{10000}{5000}, 999^{1000}) run in < 1s and < 100MB."""
        boundary_cases = [
            "100!",
            r"\binom{10000}{5000}",
            "999^{1000}",
        ]
        for latex_str in boundary_cases:
            tracemalloc.start()
            t0 = time.perf_counter()
            res = parse_latex(latex_str)
            duration_s = time.perf_counter() - t0
            _, peak_bytes = tracemalloc.get_traced_memory()
            tracemalloc.stop()

            peak_mb = peak_bytes / (1024 * 1024)
            assert res.is_success is True
            assert duration_s < 1.0, f"Exceeded 1s: {duration_s:.3f}s for {latex_str}"
            assert peak_mb < 100.0, f"Exceeded 100MB: {peak_mb:.2f}MB for {latex_str}"
