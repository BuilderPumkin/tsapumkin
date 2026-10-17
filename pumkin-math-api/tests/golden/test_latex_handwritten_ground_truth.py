"""
Handwritten Ground Truth Test Suite for Pumkin Math API LaTeX Parser
Specifically addresses Prompt 4 (Vòng 4) Items 1, 2, 3, and 5:
- Combinatorics C_n^k, A_n^k strict rejection (Item 2a)
- Physical unit prefixes (\\mu\\text{F}) rejection (Item 2b, 1d)
- Restricting KNOWN_FUNCTIONS to {f, g, h, P, n} (Item 2c)
- Standalone identifiers treated as product with WARN_AMBIGUOUS_FUNCTION_OR_PRODUCT (Item 2d)
- Explicit function definitions on LHS (X(args) = ...) preserved as functions
- Derivatives y'(t), y''(t) mapped to Derivative AST nodes
- Intermediate step preservation in relations (raw_sides & unevaluated) (Item 3a)
- Currency and SI unit metadata extraction
- Strict rejection of invalid Vietnamese prose and non-math syntax
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
# 1. COMBINATORICS NOTATION REJECTION (Item 2a)
# ==============================================================================


class TestCombinatoricsRejectionHandwritten:
    """Confirms C_n^k and A_n^k are rejected until proper AST support is added."""

    def test_reject_combination_C_5_2(self):
        """C_5^2 must be rejected with UNSUPPORTED_SYNTAX, not evaluated as C_5**2."""
        res = parse_latex(r"C_5^2")
        assert res.is_success is False
        assert res.error_code == "UNSUPPORTED_SYNTAX"

    def test_reject_combination_C_11_3(self):
        """C_{11}^3 from q_tsa_10 must be rejected with UNSUPPORTED_SYNTAX."""
        res = parse_latex(r"C_{11}^3")
        assert res.is_success is False
        assert res.error_code == "UNSUPPORTED_SYNTAX"

    def test_reject_permutation_A_9_4(self):
        """A_9^4 from q_tsa_prob_01 must be rejected with UNSUPPORTED_SYNTAX."""
        res = parse_latex(r"A_9^4")
        assert res.is_success is False
        assert res.error_code == "UNSUPPORTED_SYNTAX"

    def test_reject_permutation_A_10_3(self):
        """A_{10}^3 from q_hsa_10 must be rejected with UNSUPPORTED_SYNTAX."""
        res = parse_latex(r"A_{10}^3")
        assert res.is_success is False
        assert res.error_code == "UNSUPPORTED_SYNTAX"


# ==============================================================================
# 2. PREFIXED PHYSICAL UNITS REJECTION (Item 2b, 1d)
# ==============================================================================


class TestPrefixedPhysicalUnitsHandwritten:
    """Confirms \\mu in \\mu\\text{F} is recognized as unit prefix and not parsed as variable."""

    def test_reject_prefixed_unit_microfarad(self):
        r"""50\,\mu\text{F} must be rejected, not parsed as 50*mu."""
        res = parse_latex(r"50\,\mu\text{F}")
        assert res.is_success is False
        assert res.error_code == "UNSUPPORTED_SYNTAX"

    def test_reject_prefixed_unit_strat_088(self):
        r"""C = 50\,\mu\text{F} = 5 \times 10^{-5}\text{ F} must be rejected."""
        res = parse_latex(r"C = 50\,\mu\text{F} = 5 \times 10^{-5}\text{ F}")
        assert res.is_success is False
        assert res.error_code == "UNSUPPORTED_SYNTAX"


# ==============================================================================
# 3. STANDALONE VARIABLES WITH PARENTHESES TREATED AS PRODUCT (Item 2c, 2d)
# ==============================================================================


class TestAmbiguousProductVsFunctionCallsHandwritten:
    """
    Validates that letters outside {f, g, h, P, n} and without LHS definition X(args)=...
    are treated as MULTIPLICATION with WARN_AMBIGUOUS_FUNCTION_OR_PRODUCT.
    """

    def test_standalone_yx_is_product(self):
        """Standalone y(x) without LHS definition must be y*x with warning."""
        res = parse_latex(r"y(x)")
        assert res.is_success is True
        x, y = Symbol("x"), Symbol("y")
        assert res.expr == x * y
        assert "WARN_AMBIGUOUS_FUNCTION_OR_PRODUCT" in [w.code for w in res.warnings]

    def test_standalone_zx_is_product(self):
        """Standalone z(x) without LHS definition must be z*x with warning."""
        res = parse_latex(r"z(x)")
        assert res.is_success is True
        x, z = Symbol("x"), Symbol("z")
        assert res.expr == x * z
        assert "WARN_AMBIGUOUS_FUNCTION_OR_PRODUCT" in [w.code for w in res.warnings]

    def test_standalone_ut_is_product(self):
        """Standalone u(t) must be u*t with warning."""
        res = parse_latex(r"u(t)")
        assert res.is_success is True
        t, u = Symbol("t"), Symbol("u")
        assert res.expr == t * u
        assert "WARN_AMBIGUOUS_FUNCTION_OR_PRODUCT" in [w.code for w in res.warnings]

    def test_standalone_Ia_is_product(self):
        """Standalone I(a) must be I*a with warning."""
        res = parse_latex(r"I(a)")
        assert res.is_success is True
        a, I = Symbol("a"), Symbol("I")  # noqa: E741
        assert res.expr == a * I
        assert "WARN_AMBIGUOUS_FUNCTION_OR_PRODUCT" in [w.code for w in res.warnings]

    def test_standalone_Rx_is_product(self):
        """Standalone R(x) must be R*x with warning."""
        res = parse_latex(r"R(x)")
        assert res.is_success is True
        x, R = Symbol("x"), Symbol("R")
        assert res.expr == x * R
        assert "WARN_AMBIGUOUS_FUNCTION_OR_PRODUCT" in [w.code for w in res.warnings]

    def test_standalone_St_is_product(self):
        """Standalone S(t) must be S*t with warning."""
        res = parse_latex(r"S(t)")
        assert res.is_success is True
        t, S = Symbol("t"), Symbol("S")
        assert res.expr == t * S
        assert "WARN_AMBIGUOUS_FUNCTION_OR_PRODUCT" in [w.code for w in res.warnings]


# ==============================================================================
# 4. EXPLICIT FUNCTION DEFINITIONS ON LHS (Item 2c)
# ==============================================================================


class TestExplicitFunctionDefinitionsOnLHSHandwritten:
    """Confirms expressions defined as X(args) = ... on LHS are parsed as Functions."""

    def test_cost_function_definition_C_x(self):
        r"""C(x) = \frac{x}{2} + \frac{50}{x} + 5 from q_tsa_tf_03."""
        res = parse_latex(r"C(x) = \frac{x}{2} + \frac{50}{x} + 5")
        assert res.is_success is True
        x = Symbol("x")
        expected = Eq(Function("C")(x), x / 2 + 5 + 50 / x, evaluate=False)
        assert res.expr == expected
        assert "WARN_IMPLICIT_FUNCTION_CALL" in [w.code for w in res.warnings]

        def ref_C(v: float) -> float:
            return v / 2.0 + 50.0 / v + 5.0

        for pt in [1.0, 2.0, 5.0, 10.0]:
            assert math.isclose(float(res.expr.rhs.subs(x, pt)), ref_C(pt), rel_tol=1e-9)

    def test_population_growth_definition_N_t(self):
        r"""N(t) = N_0 \cdot e^{kt} from q_tsa_tf_05."""
        res = parse_latex(r"N(t) = N_0 \cdot e^{kt}")
        assert res.is_success is True
        t, N_0, k = Symbol("t"), Symbol("N_0"), Symbol("k")
        expected = Eq(Function("N")(t), N_0 * exp(k * t), evaluate=False)
        assert res.expr == expected

        def ref_N(t_val, N0_val, k_val):
            return N0_val * math.exp(k_val * t_val)

        for pt_t, pt_N0, pt_k in [(1.0, 100.0, 0.05), (2.0, 50.0, 0.1)]:
            val = float(res.expr.rhs.subs({t: pt_t, N_0: pt_N0, k: pt_k}))
            assert math.isclose(val, ref_N(pt_t, pt_N0, pt_k), rel_tol=1e-9)

    def test_entropy_definition_H_p(self):
        r"""H(p) = -p\ln p - (1-p)\ln(1-p) from q_superhard_type1_01."""
        res = parse_latex(r"H(p) = -p\ln p - (1-p)\ln(1-p)")
        assert res.is_success is True
        p = Symbol("p")
        expected = Eq(Function("H")(p), -p * log(p) - (1 - p) * log(1 - p), evaluate=False)
        assert res.expr == expected

        def ref_H(p_val):
            return -p_val * math.log(p_val) - (1.0 - p_val) * math.log(1.0 - p_val)

        for pt in [0.25, 0.5, 0.75]:
            assert math.isclose(float(res.expr.rhs.subs(p, pt)), ref_H(pt), rel_tol=1e-9)

    def test_parameter_integral_definition_I_a(self):
        r"""I(a) = \ln a from q_superhard_type2_03."""
        res = parse_latex(r"I(a) = \ln a")
        assert res.is_success is True
        a = Symbol("a")
        expected = Eq(Function("I")(a), log(a), evaluate=False)
        assert res.expr == expected

    def test_revenue_function_definition_R_x(self):
        r"""R(x) = 150x - 147 from q_tsa_num_04."""
        res = parse_latex(r"R(x) = 150x - 147")
        assert res.is_success is True
        x = Symbol("x")
        expected = Eq(Function("R")(x), 150 * x - 147, evaluate=False)
        assert res.expr == expected

    def test_transformed_variable_definition_z_x(self):
        r"""z(x) = -x^2 from q_superhard_type4_04."""
        res = parse_latex(r"z(x) = -x^2")
        assert res.is_success is True
        x = Symbol("x")
        expected = Eq(Function("z")(x), -(x**2), evaluate=False)
        assert res.expr == expected

    def test_cauchy_euler_solution_definition_y_x(self):
        r"""y(x) = x^2 (2 + \ln x) from q_superhard_type4_03."""
        res = parse_latex(r"y(x) = x^2 (2 + \ln x)")
        assert res.is_success is True
        x = Symbol("x")
        expected = Eq(Function("y")(x), (x**2) * (log(x) + 2), evaluate=False)
        assert res.expr == expected


# ==============================================================================
# 5. STRICT KNOWN FUNCTIONS {f, g, h, P, n} (Item 2c)
# ==============================================================================


class TestStrictKnownFunctionsHandwritten:
    """Validates that f, g, h, P, n are universally recognized as functions."""

    def test_known_function_f_x(self):
        """f(x) is always Function('f')."""
        res = parse_latex(r"f(x)")
        assert res.is_success is True
        x = Symbol("x")
        assert res.expr == Function("f")(x)

    def test_known_function_g_x(self):
        """g(x) is always Function('g')."""
        res = parse_latex(r"g(x)")
        assert res.is_success is True
        x = Symbol("x")
        assert res.expr == Function("g")(x)

    def test_known_function_h_x(self):
        """h(x) is always Function('h')."""
        res = parse_latex(r"h(x)")
        assert res.is_success is True
        x = Symbol("x")
        assert res.expr == Function("h")(x)

    def test_known_function_P_x(self):
        """P(x) is always Function('P')."""
        res = parse_latex(r"P(x)")
        assert res.is_success is True
        x = Symbol("x")
        assert res.expr == Function("P")(x)

    def test_known_function_n_A(self):
        """n(A) is always Function('n')."""
        res = parse_latex(r"n(A)")
        assert res.is_success is True
        A = Symbol("A")
        assert res.expr == Function("n")(A)

    def test_known_function_n_Omega(self):
        r"""n(\Omega) is always Function('n')."""
        res = parse_latex(r"n(\Omega)")
        assert res.is_success is True
        Omega = Symbol("Omega")
        assert res.expr == Function("n")(Omega)


# ==============================================================================
# 6. DERIVATIVE PARSING (Item 1)
# ==============================================================================


class TestDerivativesHandwritten:
    """Validates prime derivatives map to Derivative AST nodes."""

    def test_first_derivative_y_prime(self):
        """y'(t) = 0 from q_superhard_type4_01."""
        res = parse_latex(r"y'(t) = 0")
        assert res.is_success is True
        t = Symbol("t")
        expected = Eq(Derivative(Function("y")(t), t), 0, evaluate=False)
        assert res.expr == expected
        assert isinstance(res.expr.lhs, Derivative)

    def test_second_derivative_y_double_prime(self):
        """y''(t) + 2y'(t) + 5y(t) = 0 from q_superhard_type4_01."""
        res = parse_latex(r"y''(t) + 2y'(t) + 5y(t) = 0")
        assert res.is_success is True
        t = Symbol("t")
        y = Function("y")
        expected = Eq(
            Derivative(y(t), (t, 2)) + 2 * Derivative(y(t), t) + 5 * y(t),
            0,
            evaluate=False,
        )
        assert res.expr == expected


# ==============================================================================
# 7. UNEVALUATED RELATIONS & INTERMEDIATE STEPS (Item 3a)
# ==============================================================================


class TestUnevaluatedRelationsHandwritten:
    """Validates that relations and steps are preserved structurally without collapse."""

    def test_intermediate_step_preservation_10_times_4(self):
        r"""10 \times 4 = 40 must preserve raw sides and uncollapsed structure."""
        res = parse_latex(r"10 \times 4 = 40")
        assert res.is_success is True
        raw = res.metadata.get("raw_sides") or getattr(res.expr, "raw_sides", [])
        assert len(raw) == 2
        assert "10" in raw[0] and "4" in raw[0]

    def test_intermediate_step_preservation_100_eq_12_times_8(self):
        r"""100 = 12 \times 8 + 4 from q_tsa_num_02 must preserve step structure."""
        res = parse_latex(r"100 = 12 \times 8 + 4")
        assert res.is_success is True
        raw = res.metadata.get("raw_sides") or getattr(res.expr, "raw_sides", [])
        assert len(raw) == 2
        assert "12" in raw[1]

    def test_extrema_comparison_chained_relation(self):
        """y_{\text{CĐ}} = -5 < y_{\text{CT}} = 3 from q_tsa_14."""
        res = parse_latex(r"y_{\text{CĐ}} = -5 < y_{\text{CT}} = 3")
        assert res.is_success is True
        assert isinstance(res.expr, ChainedRelation)
        y_CD, y_CT = Symbol("y_CD"), Symbol("y_CT")
        assert res.expr.expressions == [y_CD, -5, y_CT, 3]
        assert res.expr.operators == ["=", "<", "="]

    def test_extrema_comparison_greater_than_chain(self):
        """y_{\text{CĐ}} = 3 > y_{\text{CT}} = -5 from q_tsa_14."""
        res = parse_latex(r"y_{\text{CĐ}} = 3 > y_{\text{CT}} = -5")
        assert res.is_success is True
        assert isinstance(res.expr, ChainedRelation)
        y_CD, y_CT = Symbol("y_CD"), Symbol("y_CT")
        assert res.expr.expressions == [y_CD, 3, y_CT, -5]
        assert res.expr.operators == ["=", ">", "="]

    def test_numeric_inequality_not_evaluated_to_boolean_true(self):
        r"""2\sqrt{11} < 15 must be Lt(2*sqrt(11), 15), NOT True."""
        res = parse_latex(r"2\sqrt{11} < 15")
        assert res.is_success is True
        assert not isinstance(res.expr, (bool, sympy.logic.boolalg.BooleanTrue))
        assert isinstance(res.expr, Lt)
        assert res.expr.lhs == 2 * sqrt(11)
        assert res.expr.rhs == Integer(15)

    def test_spatial_line_canonical_chained_equality(self):
        r"""\frac{x - 1}{2} = \frac{y - 2}{-1} = \frac{z + 1}{3} from q_thpt_08."""
        res = parse_latex(r"\frac{x - 1}{2} = \frac{y - 2}{-1} = \frac{z + 1}{3}")
        assert res.is_success is True
        assert isinstance(res.expr, ChainedRelation)
        x, y, z = Symbol("x"), Symbol("y"), Symbol("z")
        assert res.expr.expressions == [x / 2 - Rational(1, 2), 2 - y, z / 3 + Rational(1, 3)]
        assert res.expr.operators == ["=", "="]

    def test_am_gm_inequality_chain(self):
        r"""AM-GM inequality chain from q_tsa_tf_03."""
        expr_latex = r"\frac{x}{2} + \frac{50}{x} \ge 2\sqrt{\frac{x}{2}\cdot\frac{50}{x}} = 10"
        res = parse_latex(expr_latex)
        assert res.is_success is True
        assert isinstance(res.expr, ChainedRelation)
        assert res.expr.operators == [">=", "="]


# ==============================================================================
# 8. PHYSICAL UNITS & VIETNAMESE CURRENCY (Item 3)
# ==============================================================================


class TestPhysicalUnitsHandwritten:
    """Validates that Vietnamese currency and SI units are stripped to metadata with warning."""

    def test_currency_trieu_dong(self):
        r"""119.10\text{ triệu đồng} from q_gen_laikep_1."""
        res = parse_latex(r"119.10\text{ triệu đồng}")
        assert res.is_success is True
        assert res.expr == Rational(1191, 10)
        assert res.metadata.get("stripped_unit") == "triệu đồng"
        assert "WARN_STRIPPED_PHYSICAL_UNIT" in [w.code for w in res.warnings]

    def test_currency_compound_laikep(self):
        r"""176.23\text{ triệu đồng} from q_gen_laikep_7."""
        res = parse_latex(r"176.23\text{ triệu đồng}")
        assert res.is_success is True
        assert res.expr == Rational(17623, 100)
        assert res.metadata.get("stripped_unit") == "triệu đồng"

    def test_length_meter(self):
        r"""40/3\text{ m} from q_tsa_06."""
        res = parse_latex(r"40/3\text{ m}")
        assert res.is_success is True
        assert res.expr == Rational(40, 3)
        assert res.metadata.get("stripped_unit") == "m"


# ==============================================================================
# 9. STRICT REJECTIONS (Item 1, 3)
# ==============================================================================


class TestStrictRejectionsHandwritten:
    """Confirms non-math Vietnamese text and invalid syntax are safely rejected."""

    def test_reject_arbitrary_vietnamese_text(self):
        r"""\text{Hỏng cả 3} from q_ultra_tf_01 and q_tsa_17 must be rejected."""
        res = parse_latex(r"\text{Hỏng cả 3}")
        assert res.is_success is False
        assert res.error_code == "UNSUPPORTED_SYNTAX"

    def test_reject_q_tsa_17_full_latex(self):
        r"""P(\text{Hỏng cả 3}) = 0,05^3 = 0,000125 from q_tsa_17 must be safely rejected."""
        res = parse_latex(r"P(\text{Hỏng cả 3}) = 0,05^3 = 0,000125")
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
