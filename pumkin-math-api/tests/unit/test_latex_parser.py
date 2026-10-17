"""
Unit Tests for LaTeX Tokenizer, Recursive Descent Parser, and Domain Constraint Extraction
Validates high school mathematics (THPT) subset parsing, operator precedence,
semantic ambiguity resolutions, and edge/abnormal cases.
Zero eval, zero exec, zero sympify.
"""

from sympy import Abs, Eq, Integral, Limit, Rational, Sum, Symbol, cos, exp, pi, sin

from app.latex import ChainedRelation, ConstraintType, parse_latex


class TestSemanticAmbiguities:
    """Validates the explicit semantic ambiguity resolution rules required by Prompt 4."""

    def test_frac_unbraced(self):
        """\\frac12 must resolve to 1/2 without braces."""
        res = parse_latex(r"\frac12")
        assert res.is_success is True
        assert res.expr == Rational(1, 2)
        assert res.constraints == []

    def test_frac_braced_vs_unbraced(self):
        """\\frac{1}{2} and \\frac12 must yield identical expressions."""
        res_braced = parse_latex(r"\frac{1}{2}")
        res_unbraced = parse_latex(r"\frac12")
        assert res_braced.is_success is True
        assert res_unbraced.is_success is True
        assert res_braced.expr == res_unbraced.expr

    def test_precedence_2x_squared(self):
        """2x^2 must parse as 2 * (x^2), NOT (2x)^2."""
        res = parse_latex(r"2x^2")
        x = Symbol("x")
        assert res.is_success is True
        assert res.expr == 2 * (x**2)
        assert res.expr != (2 * x) ** 2

    def test_unary_minus_vs_parentheses_squared(self):
        """-x^2 must parse as -(x^2), while (-x)^2 must parse as (-x)^2 = x^2."""
        res_neg = parse_latex(r"-x^2")
        res_paren = parse_latex(r"(-x)^2")
        x = Symbol("x")

        assert res_neg.is_success is True
        assert res_paren.is_success is True
        assert res_neg.expr == -(x**2)
        assert res_paren.expr == x**2
        assert res_neg.expr != res_paren.expr

    def test_left_associative_division(self):
        """a/b/c must be left-associative: (a/b)/c = a / (b * c)."""
        res = parse_latex(r"a/b/c")
        a, b, c = Symbol("a"), Symbol("b"), Symbol("c")
        assert res.is_success is True
        assert res.expr == a / (b * c)

        # Must record constraints b != 0 and c != 0
        cond_types = [c.constraint_type for c in res.constraints]
        assert cond_types.count(ConstraintType.DENOMINATOR_NONZERO) == 2


class TestBasicArithmeticAndImplicitMultiplication:
    """Tests arithmetic operations, Greek letters, and implicit multiplication."""

    def test_implicit_multiplication_number_ident(self):
        res = parse_latex(r"3x + 5y")
        x, y = Symbol("x"), Symbol("y")
        assert res.is_success is True
        assert res.expr == 3 * x + 5 * y

    def test_implicit_multiplication_ident_ident(self):
        res = parse_latex(r"xy")
        x, y = Symbol("x"), Symbol("y")
        assert res.is_success is True
        assert res.expr == x * y

    def test_implicit_multiplication_parentheses(self):
        res = parse_latex(r"2(x + 1)(x - 1)")
        x = Symbol("x")
        assert res.is_success is True
        assert res.expr == 2 * (x + 1) * (x - 1)

    def test_vietnamese_decimal_comma(self):
        res1 = parse_latex(r"1,5 + 2{,}5")
        assert res1.is_success is True
        assert res1.expr == 4

        res2 = parse_latex(r"0,75x")
        x = Symbol("x")
        assert res2.is_success is True
        assert res2.expr == Rational(3, 4) * x

    def test_constants_pi_and_e(self):
        res = parse_latex(r"3\pi r^2 + e^x")
        r, x = Symbol("r"), Symbol("x")
        assert res.is_success is True
        assert res.expr == 3 * pi * (r**2) + exp(x)


class TestDelimitersAndAbsoluteValues:
    """Tests parentheses, brackets, braces, and single/nested absolute values."""

    def test_absolute_value_simple(self):
        res = parse_latex(r"|x - 3|")
        x = Symbol("x")
        assert res.is_success is True
        assert res.expr == Abs(x - 3)

    def test_nested_absolute_values(self):
        res = parse_latex(r"||x| - 2|")
        x = Symbol("x")
        assert res.is_success is True
        assert res.expr == Abs(Abs(x) - 2)

    def test_delimiters_left_right(self):
        res = parse_latex(r"\left| 2x + 1 \right| = 5")
        x = Symbol("x")
        assert res.is_success is True
        assert res.expr == Eq(Abs(2 * x + 1), 5)


class TestTrigonometricAndLogarithmicFunctions:
    """Tests trig powers, logarithms, and domain constraint extractions."""

    def test_trig_function_powers(self):
        res = parse_latex(r"\sin^2(x) + \cos^2(x) = 1")
        x = Symbol("x")
        assert res.is_success is True
        assert res.expr == Eq(sin(x) ** 2 + cos(x) ** 2, 1)

    def test_tan_cot_domain_constraints(self):
        res_tan = parse_latex(r"\tan(2x)")
        assert res_tan.is_success is True
        assert any(c.constraint_type == ConstraintType.TAN_DOMAIN for c in res_tan.constraints)

        res_cot = parse_latex(r"\cot(x)")
        assert res_cot.is_success is True
        assert any(c.constraint_type == ConstraintType.COT_DOMAIN for c in res_cot.constraints)

    def test_logarithms_and_domain_constraints(self):
        res_ln = parse_latex(r"\ln(x^2 - 1)")
        assert res_ln.is_success is True
        assert any(
            c.constraint_type == ConstraintType.LOG_ARGUMENT_POSITIVE for c in res_ln.constraints
        )

        res_log = parse_latex(r"\log_x(y)")
        cond_types = [c.constraint_type for c in res_log.constraints]
        assert ConstraintType.LOG_ARGUMENT_POSITIVE in cond_types
        assert ConstraintType.LOG_BASE_POSITIVE in cond_types
        assert ConstraintType.LOG_BASE_NOT_ONE in cond_types


class TestRadicalsAndCalculus:
    """Tests radicals, limits, integrals, and summations."""

    def test_square_root_constraint(self):
        res_even = parse_latex(r"\sqrt{x - 4}")
        assert res_even.is_success is True
        assert any(
            c.constraint_type == ConstraintType.EVEN_ROOT_NONNEGATIVE for c in res_even.constraints
        )

    def test_odd_root_no_constraint(self):
        res_odd = parse_latex(r"\sqrt[3]{x - 4}")
        assert res_odd.is_success is True
        assert not any(
            c.constraint_type == ConstraintType.EVEN_ROOT_NONNEGATIVE for c in res_odd.constraints
        )

    def test_limit(self):
        res = parse_latex(r"\lim_{x \to 0} \frac{\sin(x)}{x}")
        assert res.is_success is True
        assert isinstance(res.expr, Limit)

    def test_definite_integral(self):
        res = parse_latex(r"\int_0^1 x^2 dx")
        assert res.is_success is True
        assert isinstance(res.expr, Integral)

    def test_summation(self):
        res = parse_latex(r"\sum_{k=1}^n k")
        assert res.is_success is True
        assert isinstance(res.expr, Sum)


class TestChainedRelationsAndGeometryLabels:
    """Tests double inequalities and geometric prefixes."""

    def test_chained_inequalities(self):
        res = parse_latex(r"0 < x < 5")
        x = Symbol("x")
        assert res.is_success is True
        assert isinstance(res.expr, ChainedRelation)
        assert res.expr.expressions == [0, x, 5]
        assert res.expr.operators == ["<", "<"]

    def test_geometry_line_prefix(self):
        res = parse_latex(r"d_1: 2x - y + 3 = 0")
        x, y = Symbol("x"), Symbol("y")
        assert res.is_success is True
        assert res.expr == Eq(2 * x - y + 3, 0)


class TestEdgeAndAbnormalCases:
    """Validates robustness against malformed, excessive, or empty inputs."""

    def test_empty_string(self):
        res = parse_latex("")
        assert res.is_success is False
        assert res.error_code == "EMPTY_INPUT"

    def test_whitespace_only(self):
        res = parse_latex("   \t\n  ")
        assert res.is_success is False
        assert res.error_code == "EMPTY_INPUT"

    def test_unmatched_parenthesis(self):
        res = parse_latex(r"(x + 1")
        assert res.is_success is False
        assert res.error_code == "SYNTAX_ERROR"

    def test_unmatched_absolute_value(self):
        res = parse_latex(r"|x + 1")
        assert res.is_success is False
        assert res.error_code == "SYNTAX_ERROR"

    def test_sqrt_missing_argument(self):
        res = parse_latex(r"\sqrt")
        assert res.is_success is False
        assert res.error_code == "SYNTAX_ERROR"

    def test_recursion_depth_limit_exceeded(self):
        """Nesting deeper than 30 levels must be rejected."""
        deep_expr = "(" * 35 + "x" + ")" * 35
        res = parse_latex(deep_expr)
        assert res.is_success is False
        assert res.error_code == "RESOURCE_LIMIT_EXCEEDED"

    def test_string_length_limit_exceeded(self):
        """Input exceeding 2000 characters must be rejected."""
        long_expr = "x + " * 600 + "1"
        assert len(long_expr) > 2000
        res = parse_latex(long_expr)
        assert res.is_success is False
        assert res.error_code == "RESOURCE_LIMIT_EXCEEDED"

    def test_token_count_limit_exceeded(self):
        """Token count exceeding 500 must be rejected."""
        many_tokens = " + ".join(["x"] * 260)
        res = parse_latex(many_tokens)
        assert res.is_success is False
        assert res.error_code == "RESOURCE_LIMIT_EXCEEDED"

    def test_null_byte_rejected(self):
        res = parse_latex("x + \x00 y")
        assert res.is_success is False
        assert res.error_code == "INVALID_CHARACTER"

    def test_control_character_rejected(self):
        res = parse_latex("x + \x07 y")  # Bell char
        assert res.is_success is False
        assert res.error_code == "INVALID_CHARACTER"
