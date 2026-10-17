"""
Handwritten Ground Truth Test Suite for Pumkin Math API LaTeX Parser
Specifically addresses Prompt 4 (Vòng 3) Items 1, 2, 3, and 5d:
- Function calls vs products (H(p), I(a), y(t), y'(t), y''(t), C(x), mu(x), n(A), etc.)
- Unevaluated ChainedRelation & Relational (NO BooleanTrue/BooleanFalse)
- Vietnamese currency & physical unit extraction (triệu đồng, m)
- Strict rejection of Vietnamese text and unsupported non-math prose
- 100% hand-crafted expectations and independent reference Python functions
  (NOT generated from parser).
"""

import math

import sympy
from sympy import (
    Derivative,
    Eq,
    Function,
    Integer,
    Lt,
    Rational,
    Symbol,
    exp,
    log,
    sqrt,
)

from app.latex import ChainedRelation, parse_latex

# ==============================================================================
# 1. FUNCTION CALLS VS PRODUCTS (Item 1)
# ==============================================================================


class TestFunctionCallsVsProductsHandwritten:
    """Validates that known functions and derivatives are preserved as Function/Derivative."""

    def test_cost_function_C_x(self):
        """C(x) = \frac{x}{2} + \frac{50}{x} + 5 from q_tsa_tf_03."""
        latex_str = r"C(x) = \frac{x}{2} + \frac{50}{x} + 5"
        res = parse_latex(latex_str)
        assert res.is_success is True

        x = Symbol("x")
        expected = Eq(Function("C")(x), x / 2 + 5 + 50 / x, evaluate=False)
        assert res.expr == expected
        assert "WARN_IMPLICIT_FUNCTION_CALL" in [w.code for w in res.warnings]

        # Independent Python reference function evaluation
        def ref_C(val: float) -> float:
            return val / 2.0 + 50.0 / val + 5.0

        for pt in [1.0, 2.0, 5.0, 10.0, 20.0]:
            # Substitute x into rhs
            rhs_val = float(res.expr.rhs.subs(x, pt))
            assert math.isclose(rhs_val, ref_C(pt), rel_tol=1e-9)

    def test_population_growth_N_t(self):
        r"""N(t) = N_0 \cdot e^{kt} from q_tsa_tf_05."""
        latex_str = r"N(t) = N_0 \cdot e^{kt}"
        res = parse_latex(latex_str)
        assert res.is_success is True

        t = Symbol("t")
        N_0 = Symbol("N_0")
        k = Symbol("k")
        expected = Eq(Function("N")(t), N_0 * exp(k * t), evaluate=False)
        assert res.expr == expected
        assert "WARN_IMPLICIT_FUNCTION_CALL" in [w.code for w in res.warnings]

        def ref_N(t_val, N0_val, k_val):
            return N0_val * math.exp(k_val * t_val)

        for pt_t, pt_N0, pt_k in [(1.0, 100.0, 0.05), (2.0, 50.0, 0.1)]:
            val = float(res.expr.rhs.subs({t: pt_t, N_0: pt_N0, k: pt_k}))
            assert math.isclose(val, ref_N(pt_t, pt_N0, pt_k), rel_tol=1e-9)

    def test_entropy_H_p(self):
        r"""H(p) = -p\ln p - (1-p)\ln(1-p) from q_superhard_type1_01."""
        latex_str = r"H(p) = -p\ln p - (1-p)\ln(1-p)"
        res = parse_latex(latex_str)
        assert res.is_success is True

        p = Symbol("p")
        expected = Eq(Function("H")(p), -p * log(p) - (1 - p) * log(1 - p), evaluate=False)
        assert res.expr == expected
        assert "WARN_IMPLICIT_FUNCTION_CALL" in [w.code for w in res.warnings]

        def ref_H(p_val):
            return -p_val * math.log(p_val) - (1.0 - p_val) * math.log(1.0 - p_val)

        for pt in [0.1, 0.25, 0.5, 0.75, 0.9]:
            val = float(res.expr.rhs.subs(p, pt))
            assert math.isclose(val, ref_H(pt), rel_tol=1e-9)

    def test_parameter_integral_I_a(self):
        r"""I(a) = \ln a from q_superhard_type2_03."""
        latex_str = r"I(a) = \ln a"
        res = parse_latex(latex_str)
        assert res.is_success is True

        a = Symbol("a")
        expected = Eq(Function("I")(a), log(a), evaluate=False)
        assert res.expr == expected
        assert "WARN_IMPLICIT_FUNCTION_CALL" in [w.code for w in res.warnings]

        def ref_I(a_val):
            return math.log(a_val)

        for pt in [1.0, 2.0, math.e, 10.0]:
            val = float(res.expr.rhs.subs(a, pt))
            assert math.isclose(val, ref_I(pt), rel_tol=1e-9)

    def test_derivative_first_order_y_prime(self):
        """y'(t) = 0 from q_superhard_type4_01."""
        latex_str = r"y'(t) = 0"
        res = parse_latex(latex_str)
        assert res.is_success is True

        t = Symbol("t")
        expected = Eq(Derivative(Function("y")(t), t), 0, evaluate=False)
        assert res.expr == expected
        assert isinstance(res.expr.lhs, Derivative)

    def test_derivative_second_order_differential_equation(self):
        """y''(t) + 2y'(t) + 5y(t) = 0 from q_superhard_type4_01."""
        latex_str = r"y''(t) + 2y'(t) + 5y(t) = 0"
        res = parse_latex(latex_str)
        assert res.is_success is True

        t = Symbol("t")
        y = Function("y")
        expected = Eq(
            Derivative(y(t), (t, 2)) + 2 * Derivative(y(t), t) + 5 * y(t),
            0,
            evaluate=False,
        )
        assert res.expr == expected

    def test_cauchy_euler_solution_y_x(self):
        r"""y(x) = x^2 (2 + \ln x) from q_superhard_type4_03."""
        latex_str = r"y(x) = x^2 (2 + \ln x)"
        res = parse_latex(latex_str)
        assert res.is_success is True

        x = Symbol("x")
        expected = Eq(Function("y")(x), (x**2) * (log(x) + 2), evaluate=False)
        assert res.expr == expected

        def ref_y(x_val):
            return (x_val**2) * (2.0 + math.log(x_val))

        for pt in [1.0, 2.0, 3.0, 4.0]:
            val = float(res.expr.rhs.subs(x, pt))
            assert math.isclose(val, ref_y(pt), rel_tol=1e-9)

    def test_integrating_factor_mu_x(self):
        r"""\mu(x) = \frac{1}{x} from q_superhard_type4_04."""
        latex_str = r"\mu(x) = \frac{1}{x}"
        res = parse_latex(latex_str)
        assert res.is_success is True

        x = Symbol("x")
        expected = Eq(Function("mu")(x), 1 / x, evaluate=False)
        assert res.expr == expected

    def test_transformed_variable_z_x(self):
        r"""z(x) = -x^2 from q_superhard_type4_04."""
        latex_str = r"z(x) = -x^2"
        res = parse_latex(latex_str)
        assert res.is_success is True

        x = Symbol("x")
        expected = Eq(Function("z")(x), -(x**2), evaluate=False)
        assert res.expr == expected

    def test_revenue_function_R_x(self):
        r"""R(x) = 150x - 147 from q_tsa_num_04."""
        latex_str = r"R(x) = 150x - 147"
        res = parse_latex(latex_str)
        assert res.is_success is True

        x = Symbol("x")
        expected = Eq(Function("R")(x), 150 * x - 147, evaluate=False)
        assert res.expr == expected

    def test_counting_measure_event_nA(self):
        r"""n(A) = 1224 from q_tsa_prob_01."""
        latex_str = r"n(A) = 1224"
        res = parse_latex(latex_str)
        assert res.is_success is True

        A = Symbol("A")
        expected = Eq(Function("n")(A), 1224, evaluate=False)
        assert res.expr == expected

    def test_counting_measure_sample_space_nOmega(self):
        r"""n(\Omega) = 84 from q_tsa_prob_02."""
        latex_str = r"n(\Omega) = 84"
        res = parse_latex(latex_str)
        assert res.is_success is True

        Omega = Symbol("Omega")
        expected = Eq(Function("n")(Omega), 84, evaluate=False)
        assert res.expr == expected


# ==============================================================================
# 2. NO EVALUATED BOOLEANS & CHAINED RELATIONS (Item 2)
# ==============================================================================


class TestUnevaluatedRelationsHandwritten:
    """Validates that relations and chains NEVER collapse to boolean True or False."""

    def test_extrema_comparison_chained_relation(self):
        """y_{\text{CĐ}} = -5 < y_{\text{CT}} = 3 from q_tsa_14."""
        latex_str = r"y_{\text{CĐ}} = -5 < y_{\text{CT}} = 3"
        res = parse_latex(latex_str)
        assert res.is_success is True
        assert isinstance(res.expr, ChainedRelation)

        y_CD = Symbol("y_CD")
        y_CT = Symbol("y_CT")
        assert res.expr.expressions == [y_CD, -5, y_CT, 3]
        assert res.expr.operators == ["=", "<", "="]
        assert res.variables == ["y_CD", "y_CT"]

    def test_extrema_comparison_greater_than_chain(self):
        """y_{\text{CĐ}} = 3 > y_{\text{CT}} = -5 from q_tsa_14."""
        latex_str = r"y_{\text{CĐ}} = 3 > y_{\text{CT}} = -5"
        res = parse_latex(latex_str)
        assert res.is_success is True
        assert isinstance(res.expr, ChainedRelation)

        y_CD = Symbol("y_CD")
        y_CT = Symbol("y_CT")
        assert res.expr.expressions == [y_CD, 3, y_CT, -5]
        assert res.expr.operators == ["=", ">", "="]

    def test_arithmetic_equality_not_evaluated_to_boolean_true(self):
        """100 = 12 \times 8 + 4 from q_tsa_num_02 must be Eq(100, 100), NOT True."""
        latex_str = r"100 = 12 \times 8 + 4"
        res = parse_latex(latex_str)
        assert res.is_success is True
        assert not isinstance(res.expr, (bool, sympy.logic.boolalg.BooleanTrue))
        assert isinstance(res.expr, Eq)
        assert res.expr.lhs == Integer(100)
        assert res.expr.rhs == Integer(100)

    def test_arithmetic_equality_81(self):
        """81 = 13 \times 6 + 3 from q_tsa_num_02."""
        latex_str = r"81 = 13 \times 6 + 3"
        res = parse_latex(latex_str)
        assert res.is_success is True
        assert not isinstance(res.expr, (bool, sympy.logic.boolalg.BooleanTrue))
        assert isinstance(res.expr, Eq)
        assert res.expr.lhs == Integer(81)
        assert res.expr.rhs == Integer(81)

    def test_numeric_inequality_not_evaluated_to_boolean_true(self):
        r"""2\sqrt{11} < 15 from strat_167 must be Lt(2*sqrt(11), 15), NOT True."""
        latex_str = r"2\sqrt{11} < 15"
        res = parse_latex(latex_str)
        assert res.is_success is True
        assert not isinstance(res.expr, (bool, sympy.logic.boolalg.BooleanTrue))
        assert isinstance(res.expr, Lt)
        assert res.expr.lhs == 2 * sqrt(11)
        assert res.expr.rhs == Integer(15)

    def test_spatial_line_canonical_chained_equality(self):
        r"""\frac{x - 1}{2} = \frac{y - 2}{-1} = \frac{z + 1}{3} from q_thpt_08."""
        latex_str = r"\frac{x - 1}{2} = \frac{y - 2}{-1} = \frac{z + 1}{3}"
        res = parse_latex(latex_str)
        assert res.is_success is True
        assert isinstance(res.expr, ChainedRelation)

        x, y, z = Symbol("x"), Symbol("y"), Symbol("z")
        assert res.expr.expressions == [x / 2 - Rational(1, 2), 2 - y, z / 3 + Rational(1, 3)]
        assert res.expr.operators == ["=", "="]
        assert set(res.variables) == {"x", "y", "z"}

    def test_am_gm_inequality_chain(self):
        r"""\frac{x}{2} + \frac{50}{x} \ge 2\sqrt{\frac{x}{2}\cdot\frac{50}{x}} = 10
        from q_tsa_tf_03.
        """
        latex_str = r"\frac{x}{2} + \frac{50}{x} \ge 2\sqrt{\frac{x}{2}\cdot\frac{50}{x}} = 10"
        res = parse_latex(latex_str)
        assert res.is_success is True
        assert isinstance(res.expr, ChainedRelation)
        assert res.expr.operators == [">=", "="]


# ==============================================================================
# 3. PHYSICAL UNITS & VIETNAMESE CURRENCY (Item 3)
# ==============================================================================


class TestPhysicalUnitsHandwritten:
    """Validates that Vietnamese currency and SI units are stripped to metadata with warning."""

    def test_currency_trieu_dong(self):
        r"""119.10\text{ triệu đồng} from q_gen_laikep_1."""
        latex_str = r"119.10\text{ triệu đồng}"
        res = parse_latex(latex_str)
        assert res.is_success is True
        assert res.expr == Rational(1191, 10)
        assert res.variables == []
        assert res.metadata.get("stripped_unit") == "triệu đồng"
        assert "WARN_STRIPPED_PHYSICAL_UNIT" in [w.code for w in res.warnings]

    def test_currency_compound_laikep(self):
        r"""176.23\text{ triệu đồng} from q_gen_laikep_7."""
        latex_str = r"176.23\text{ triệu đồng}"
        res = parse_latex(latex_str)
        assert res.is_success is True
        assert res.expr == Rational(17623, 100)
        assert res.metadata.get("stripped_unit") == "triệu đồng"

    def test_length_meter(self):
        r"""40/3\text{ m} from q_tsa_06."""
        latex_str = r"40/3\text{ m}"
        res = parse_latex(latex_str)
        assert res.is_success is True
        assert res.expr == Rational(40, 3)
        assert res.metadata.get("stripped_unit") == "m"


# ==============================================================================
# 4. STRICT REJECTIONS (Item 3, 5d)
# ==============================================================================


class TestStrictRejectionsHandwritten:
    """Confirms non-math Vietnamese text and invalid syntax are safely rejected."""

    def test_reject_arbitrary_vietnamese_text(self):
        r"""\text{Hỏng cả 3} from q_ultra_tf_01 must be rejected."""
        res = parse_latex(r"\text{Hỏng cả 3}")
        assert res.is_success is False
        assert res.error_code == "UNSUPPORTED_SYNTAX"

    def test_reject_condition_text_in_formula(self):
        r"""\text{ (do } x > 0) from q_superhard_type4_04."""
        res = parse_latex(r"\text{ (do } x > 0)")
        assert res.is_success is False
        assert res.error_code == "UNSUPPORTED_SYNTAX"

    def test_reject_vietnamese_conjunction(self):
        r"""\text{ và } from q_tsa_55."""
        res = parse_latex(r"\text{ và }")
        assert res.is_success is False
        assert res.error_code == "UNSUPPORTED_SYNTAX"

    def test_reject_standalone_differential(self):
        r"""dx without \int must be rejected."""
        res = parse_latex("dx")
        assert res.is_success is False
        assert res.error_code in ("SYNTAX_ERROR", "UNSUPPORTED_SYNTAX")

    def test_reject_approximate_equality(self):
        r"""\approx is rejected to guarantee absolute mathematical precision."""
        res = parse_latex(r"\pi \approx 3.14")
        assert res.is_success is False
        assert res.error_code == "UNSUPPORTED_SYNTAX"

    def test_reject_modular_arithmetic(self):
        r"""3^{12} \equiv 1 \pmod{13} is unsupported in THPT algebra parser."""
        res = parse_latex(r"3^{12} \equiv 1 \pmod{13}")
        assert res.is_success is False
        assert res.error_code == "UNSUPPORTED_SYNTAX"
