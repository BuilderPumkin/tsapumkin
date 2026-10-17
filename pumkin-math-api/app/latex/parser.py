"""
Recursive Descent & Pratt LaTeX Parser for High School Mathematics (THPT)
Directly constructs SymPy AST expressions without using eval, exec, sympify, or parse_expr.
Extracts mandatory mathematical domain constraints per GEMINI.md (denominators != 0,
even roots >= 0, log arguments > 0, base > 0 and base != 1, tan/cot domains).
"""

from typing import Any

import sympy
from sympy import (
    Abs,
    Add,
    Derivative,
    E,
    Eq,
    Function,
    Ge,
    Gt,
    Integer,
    Integral,
    Le,
    Limit,
    Lt,
    Mul,
    Ne,
    Pow,
    Rational,
    Sum,
    Symbol,
    acos,
    acot,
    asin,
    atan,
    binomial,
    cos,
    cot,
    exp,
    factorial,
    ln,
    log,
    oo,
    pi,
    root,
    sin,
    tan,
)

from app.latex.result import ConstraintType, DomainConstraint, ParseResult
from app.latex.tokenizer import TokenizerError, tokenize
from app.latex.tokens import Token, TokenType

# Operator Precedence Levels (Pratt)
PREC_NONE = 0
PREC_RELATIONAL = 10  # =, !=, <, <=, >, >=
PREC_ADD = 20  # +, -
PREC_MUL = 30  # *, /
PREC_IMPLICIT_MUL = 40  # 2x, 2(x+1), xy, x\sin(x), 3\sqrt{x}
PREC_UNARY = 50  # unary +, unary -
PREC_EXP = 60  # ^, _ (power, subscript)
PREC_POSTFIX = 70  # !, ' (factorial, prime)


class ParserError(Exception):
    """Exception raised when mathematical syntax parsing fails."""

    def __init__(self, code: str, message_vi: str, pos: int = 0):
        super().__init__(message_vi)
        self.code = code
        self.message_vi = message_vi
        self.pos = pos


class LatexParser:
    """
    Deterministic Recursive Descent and Pratt parser for LaTeX mathematical expressions.
    Operates on strongly-typed tokens from the tokenizer.
    Enforces maximum nesting depth <= 30.
    """

    def __init__(self, tokens: list[Token], raw_latex: str = "", max_depth: int = 30):
        self.tokens = tokens
        self.pos = 0
        self.raw_latex = raw_latex
        self.max_depth = max_depth
        self.constraints: list[DomainConstraint] = []
        self._seen_constraint_keys: set[str] = set()
        self.abs_depth = 0

    def current(self) -> Token:
        if self.pos < len(self.tokens):
            return self.tokens[self.pos]
        return self.tokens[-1]

    def peek(self, offset: int = 1) -> Token:
        idx = self.pos + offset
        if idx < len(self.tokens):
            return self.tokens[idx]
        return self.tokens[-1]

    def advance(self) -> Token:
        tok = self.current()
        if self.pos < len(self.tokens):
            self.pos += 1
        return tok

    def match(self, *types: TokenType) -> Token | None:
        if self.current().type in types:
            return self.advance()
        return None

    def expect(self, expected_type: TokenType, error_message: str) -> Token:
        tok = self.current()
        if tok.type != expected_type:
            raise ParserError("SYNTAX_ERROR", error_message, pos=tok.pos)
        return self.advance()

    def at_end(self) -> bool:
        return self.current().type == TokenType.EOF

    # -------------------------------------------------------------------------
    # Domain Constraint Helpers
    # -------------------------------------------------------------------------

    def add_denominator_constraint(self, denom: Any) -> None:
        """Adds denominator != 0 constraint if denominator contains variables."""
        if hasattr(denom, "free_symbols") and denom.free_symbols:
            key = f"denom_{denom}"
            if key not in self._seen_constraint_keys:
                self._seen_constraint_keys.add(key)
                cond = sympy.Ne(denom, 0)
                latex_cond = f"{sympy.latex(denom)} \\ne 0"
                msg = f"Mẫu thức \\({sympy.latex(denom)}\\) phải khác 0"
                self.constraints.append(
                    DomainConstraint(
                        constraint_type=ConstraintType.DENOMINATOR_NONZERO,
                        condition=cond,
                        latex=latex_cond,
                        message_vi=msg,
                    )
                )

    def add_root_constraint(self, radicand: Any, index: Any = 2) -> None:
        """Adds radicand >= 0 constraint if root index is even and radicand has variables."""
        # Check if index is an even integer
        is_even = False
        if isinstance(index, (int, Integer)):
            is_even = int(index) % 2 == 0
        elif index == 2 or str(index) == "2":
            is_even = True

        if is_even and hasattr(radicand, "free_symbols") and radicand.free_symbols:
            key = f"root_{radicand}"
            if key not in self._seen_constraint_keys:
                self._seen_constraint_keys.add(key)
                cond = sympy.Ge(radicand, 0)
                latex_cond = f"{sympy.latex(radicand)} \\ge 0"
                msg = (
                    f"Biểu thức dưới dấu căn \\({sympy.latex(radicand)}\\) "
                    f"phải không âm (\\(\\ge 0\\))"
                )
                self.constraints.append(
                    DomainConstraint(
                        constraint_type=ConstraintType.EVEN_ROOT_NONNEGATIVE,
                        condition=cond,
                        latex=latex_cond,
                        message_vi=msg,
                    )
                )

    def add_log_constraints(self, arg: Any, base: Any = None) -> None:
        """Adds log argument > 0 and base > 0, base != 1 constraints."""
        if hasattr(arg, "free_symbols") and arg.free_symbols:
            key = f"log_arg_{arg}"
            if key not in self._seen_constraint_keys:
                self._seen_constraint_keys.add(key)
                cond = sympy.Gt(arg, 0)
                latex_cond = f"{sympy.latex(arg)} > 0"
                msg = f"Biểu thức lấy logarit \\({sympy.latex(arg)}\\) phải dương (> 0)"
                self.constraints.append(
                    DomainConstraint(
                        constraint_type=ConstraintType.LOG_ARGUMENT_POSITIVE,
                        condition=cond,
                        latex=latex_cond,
                        message_vi=msg,
                    )
                )

        if base is not None and hasattr(base, "free_symbols") and base.free_symbols:
            # Base positive
            key_pos = f"log_base_pos_{base}"
            if key_pos not in self._seen_constraint_keys:
                self._seen_constraint_keys.add(key_pos)
                self.constraints.append(
                    DomainConstraint(
                        constraint_type=ConstraintType.LOG_BASE_POSITIVE,
                        condition=sympy.Gt(base, 0),
                        latex=f"{sympy.latex(base)} > 0",
                        message_vi=f"Cơ số logarit \\({sympy.latex(base)}\\) phải dương (> 0)",
                    )
                )
            # Base != 1
            key_ne1 = f"log_base_ne1_{base}"
            if key_ne1 not in self._seen_constraint_keys:
                self._seen_constraint_keys.add(key_ne1)
                self.constraints.append(
                    DomainConstraint(
                        constraint_type=ConstraintType.LOG_BASE_NOT_ONE,
                        condition=sympy.Ne(base, 1),
                        latex=f"{sympy.latex(base)} \\ne 1",
                        message_vi=f"Cơ số logarit \\({sympy.latex(base)}\\) phải khác 1",
                    )
                )

    def add_trig_domain_constraint(self, func_type: str, arg: Any) -> None:
        """Adds tan(u) domain (cos(u) != 0) or cot(u) domain (sin(u) != 0)."""
        if hasattr(arg, "free_symbols") and arg.free_symbols:
            if func_type == "tan":
                key = f"tan_{arg}"
                if key not in self._seen_constraint_keys:
                    self._seen_constraint_keys.add(key)
                    cond = sympy.Ne(sympy.cos(arg), 0)
                    self.constraints.append(
                        DomainConstraint(
                            constraint_type=ConstraintType.TAN_DOMAIN,
                            condition=cond,
                            latex=f"\\cos({sympy.latex(arg)}) \\ne 0",
                            message_vi=(
                                f"Hàm tang xác định khi \\(\\cos({sympy.latex(arg)}) \\ne 0\\)"
                            ),
                        )
                    )
            elif func_type == "cot":
                key = f"cot_{arg}"
                if key not in self._seen_constraint_keys:
                    self._seen_constraint_keys.add(key)
                    cond = sympy.Ne(sympy.sin(arg), 0)
                    self.constraints.append(
                        DomainConstraint(
                            constraint_type=ConstraintType.COT_DOMAIN,
                            condition=cond,
                            latex=f"\\sin({sympy.latex(arg)}) \\ne 0",
                            message_vi=(
                                f"Hàm cotang xác định khi \\(\\sin({sympy.latex(arg)}) \\ne 0\\)"
                            ),
                        )
                    )

    # -------------------------------------------------------------------------
    # Precedence and Token Classification
    # -------------------------------------------------------------------------

    def get_precedence(self, tok: Token) -> int:
        """Returns the operator binding precedence."""
        if tok.type in (
            TokenType.EQUAL,
            TokenType.NEQ,
            TokenType.LT,
            TokenType.LE,
            TokenType.GT,
            TokenType.GE,
        ):
            return PREC_RELATIONAL
        if tok.type in (TokenType.PLUS, TokenType.MINUS):
            return PREC_ADD
        if tok.type in (TokenType.STAR, TokenType.SLASH):
            return PREC_MUL
        if tok.type in (TokenType.CARET, TokenType.UNDERSCORE):
            return PREC_EXP
        if tok.type == TokenType.PRIME:
            return PREC_POSTFIX
        if tok.type == TokenType.COMMAND and tok.value == "!":
            return PREC_POSTFIX
        return PREC_NONE

    def is_implicit_multiplication_start(self) -> bool:
        r"""
        Determines whether the next token starts an implicit multiplication
        (e.g. 2x, 2(x+1), xy, x\sin(x), 3\sqrt{x}, 2|x|).
        """
        tok = self.current()
        if tok.type == TokenType.EOF:
            return False

        # If current token is a closing delimiter of the current scope, it cannot start an operand
        if tok.type in (TokenType.RPAREN, TokenType.RBRACKET, TokenType.RBRACE):
            return False

        # If inside an absolute value and current token is PIPE, it is closing |
        if tok.type == TokenType.PIPE and self.abs_depth > 0:
            return False

        # Differential in integral (dx, dt) closes the integrand, does not multiply
        if tok.type == TokenType.DIFF:
            return False

        # Operators cannot start implicit multiplication
        if tok.type in (
            TokenType.PLUS,
            TokenType.MINUS,
            TokenType.STAR,
            TokenType.SLASH,
            TokenType.CARET,
            TokenType.UNDERSCORE,
            TokenType.EQUAL,
            TokenType.NEQ,
            TokenType.LT,
            TokenType.LE,
            TokenType.GT,
            TokenType.GE,
            TokenType.COMMA,
            TokenType.SEMICOLON,
            TokenType.PRIME,
            TokenType.TO,
        ):
            return False

        # Tokens that CAN start an operand in implicit multiplication:
        # NUMBER, IDENT, LPAREN, LBRACE, PIPE, or expression COMMANDs
        if tok.type in (
            TokenType.NUMBER,
            TokenType.IDENT,
            TokenType.LPAREN,
            TokenType.LBRACKET,
            TokenType.PIPE,
        ):
            return True

        if tok.type == TokenType.COMMAND:
            # Exclude commands that are not prefix operands
            if tok.value in (
                r"\frac",
                r"\sqrt",
                r"\sin",
                r"\cos",
                r"\tan",
                r"\cot",
                r"\arcsin",
                r"\arccos",
                r"\arctan",
                r"\arccot",
                r"\ln",
                r"\log",
                r"\exp",
                r"\lim",
                r"\int",
                r"\iint",
                r"\sum",
                r"\binom",
                r"\vec",
                r"\bar",
            ):
                return True

        return False

    # -------------------------------------------------------------------------
    # Core Parser Methods
    # -------------------------------------------------------------------------

    def skip_label_prefix(self) -> None:
        """Skips geometry label prefixes like d:, d_1:, (d):, (P): before an equation."""
        # Case 1: (d): or (P):
        if (
            self.pos + 3 < len(self.tokens)
            and self.tokens[self.pos].type == TokenType.LPAREN
            and self.tokens[self.pos + 1].type == TokenType.IDENT
            and self.tokens[self.pos + 2].type == TokenType.RPAREN
            and self.tokens[self.pos + 3].type == TokenType.COLON
        ):
            self.pos += 4
            return

        # Case 2: d_1: or P_2:
        if (
            self.pos + 3 < len(self.tokens)
            and self.tokens[self.pos].type == TokenType.IDENT
            and self.tokens[self.pos + 1].type == TokenType.UNDERSCORE
            and self.tokens[self.pos + 2].type == TokenType.NUMBER
            and self.tokens[self.pos + 3].type == TokenType.COLON
        ):
            self.pos += 4
            return

        # Case 3: d: or P:
        if (
            self.pos + 1 < len(self.tokens)
            and self.tokens[self.pos].type == TokenType.IDENT
            and self.tokens[self.pos + 1].type == TokenType.COLON
        ):
            self.pos += 2
            return

    def parse(self) -> Any:
        """Entry point for parsing the token stream into a SymPy expression."""
        if self.at_end():
            raise ParserError(
                "EMPTY_EXPRESSION", "Biểu thức rỗng, không có nội dung toán học.", pos=0
            )

        # Skip optional geometry label prefix (d_1:, (P):, etc.)
        self.skip_label_prefix()

        expr = self._parse_pratt_expr(PREC_NONE, depth=0)

        if not self.at_end():
            tok = self.current()
            raise ParserError(
                "UNEXPECTED_TOKEN",
                f"Ký tự thừa hoặc không hợp lệ '{tok.value}' tại vị trí {tok.pos + 1}.",
                pos=tok.pos,
            )

        return expr

    def _parse_pratt_expr(self, min_prec: int = PREC_NONE, depth: int = 0) -> Any:
        """Pratt expression parser with strict recursion limits and implicit multiplication."""
        if depth > self.max_depth:
            raise ParserError(
                "RESOURCE_LIMIT_EXCEEDED",
                (
                    f"Độ sâu lồng nhau của biểu thức ({depth}) "
                    f"vượt quá giới hạn an toàn tối đa ({self.max_depth} tầng)."
                ),
                pos=self.current().pos,
            )

        tok = self.current()

        # Prefix parsing (Unary operators)
        if tok.type == TokenType.PLUS:
            self.advance()
            left = self._parse_pratt_expr(PREC_UNARY, depth + 1)
        elif tok.type == TokenType.MINUS:
            self.advance()
            operand = self._parse_pratt_expr(PREC_UNARY, depth + 1)
            left = Mul(Integer(-1), operand)
        else:
            left = self.parse_primary(depth + 1)

        # Infix and Implicit Multiplication Loop
        while not self.at_end():
            # Check for implicit multiplication first
            if self.is_implicit_multiplication_start():
                if PREC_IMPLICIT_MUL < min_prec:
                    break
                right = self._parse_pratt_expr(PREC_IMPLICIT_MUL + 1, depth + 1)
                left = Mul(left, right)
                continue

            op = self.current()
            op_prec = self.get_precedence(op)
            if op_prec <= min_prec:
                break

            self.advance()  # consume operator

            if op.type == TokenType.PLUS:
                right = self._parse_pratt_expr(PREC_ADD, depth + 1)
                left = Add(left, right)
            elif op.type == TokenType.MINUS:
                right = self._parse_pratt_expr(PREC_ADD, depth + 1)
                left = Add(left, Mul(Integer(-1), right))
            elif op.type == TokenType.STAR:
                right = self._parse_pratt_expr(PREC_MUL, depth + 1)
                left = Mul(left, right)
            elif op.type == TokenType.SLASH:
                # Left-associative division: right operand parsed with PREC_MUL + 1
                right = self._parse_pratt_expr(PREC_MUL + 1, depth + 1)
                self.add_denominator_constraint(right)
                left = left / right
            elif op.type == TokenType.CARET:
                # Exponentiation is right-associative: op_prec - 1
                if self.current().type == TokenType.LBRACE:
                    self.advance()
                    right = self._parse_pratt_expr(PREC_NONE, depth + 1)
                    self.expect(TokenType.RBRACE, "Thiếu dấu ngoặc nhọn '}' đóng số mũ.")
                else:
                    right = self._parse_pratt_expr(PREC_EXP - 1, depth + 1)
                left = Pow(left, right)
            elif op.type == TokenType.UNDERSCORE:
                # Subscript: x_1 or x_{i+1}
                if self.current().type == TokenType.LBRACE:
                    self.advance()
                    sub_val = self._parse_pratt_expr(PREC_NONE, depth + 1)
                    self.expect(TokenType.RBRACE, "Thiếu dấu ngoặc nhọn '}' đóng chỉ số dưới.")
                    left = Symbol(f"{left}_{sub_val}")
                else:
                    sub_tok = self.advance()
                    left = Symbol(f"{left}_{sub_tok.value}")
            elif op.type in (
                TokenType.EQUAL,
                TokenType.NEQ,
                TokenType.LT,
                TokenType.LE,
                TokenType.GT,
                TokenType.GE,
            ):
                right = self._parse_pratt_expr(PREC_RELATIONAL, depth + 1)
                lhs_for_new = left.rhs if hasattr(left, "rhs") else left

                if op.type == TokenType.EQUAL:
                    new_rel = Eq(lhs_for_new, right)
                elif op.type == TokenType.NEQ:
                    new_rel = Ne(lhs_for_new, right)
                elif op.type == TokenType.LT:
                    new_rel = Lt(lhs_for_new, right)
                elif op.type == TokenType.LE:
                    new_rel = Le(lhs_for_new, right)
                elif op.type == TokenType.GT:
                    new_rel = Gt(lhs_for_new, right)
                elif op.type == TokenType.GE:
                    new_rel = Ge(lhs_for_new, right)

                if hasattr(left, "rhs"):
                    left = sympy.And(left, new_rel)
                else:
                    left = new_rel
            elif op.type == TokenType.COMMAND and op.value == "!":
                left = factorial(left)
            elif op.type == TokenType.PRIME:
                left = Symbol(f"{left}'")

        return left

    def parse_primary(self, depth: int = 0) -> Any:
        """Parses primary atoms, numbers, variables, functions, and grouped sub-expressions."""
        if depth > self.max_depth:
            raise ParserError(
                "RESOURCE_LIMIT_EXCEEDED",
                (
                    f"Độ sâu lồng nhau của biểu thức ({depth}) "
                    f"vượt quá giới hạn an toàn tối đa ({self.max_depth} tầng)."
                ),
                pos=self.current().pos,
            )

        tok = self.current()

        # 1. Numbers
        if tok.type == TokenType.NUMBER:
            self.advance()
            if "." in tok.value:
                # Exact rational for floating point / decimal representations
                return Rational(tok.value)
            return Integer(int(tok.value))

        # 2. Identifiers / Variables
        if tok.type == TokenType.IDENT:
            self.advance()
            name = tok.value

            # Mathematical constants
            if name == "pi":
                base_expr = pi
            elif name == "oo":
                base_expr = oo
            elif name == "e":
                # In calculus/powers e is Euler's number
                base_expr = E
            else:
                base_expr = Symbol(name)

            # Check for prime marks: f'(x), y'
            while self.current().type == TokenType.PRIME:
                self.advance()
                base_expr = Symbol(f"{base_expr}'")

            # Check for function call: e.g. f(x), g(x), P(x)
            if (
                name in ("f", "g", "h", "P", "Q", "u", "v")
                and self.current().type == TokenType.LPAREN
            ):
                self.advance()  # consume '('
                arg = self._parse_pratt_expr(PREC_NONE, depth + 1)
                self.expect(TokenType.RPAREN, "Thiếu dấu ngoặc đơn ')' đóng đối số hàm.")
                if "'" in str(base_expr):
                    return Derivative(Function(name)(arg), arg)
                return Function(name)(arg)

            return base_expr

        # 3. Delimiters (Parentheses, Brackets, Braces, Absolute Values)
        if tok.type == TokenType.LPAREN:
            self.advance()
            inner = self._parse_pratt_expr(PREC_NONE, depth + 1)
            self.expect(TokenType.RPAREN, "Thiếu dấu ngoặc đơn ')' đóng.")
            return inner

        if tok.type == TokenType.LBRACKET:
            self.advance()
            inner = self._parse_pratt_expr(PREC_NONE, depth + 1)
            self.expect(TokenType.RBRACKET, "Thiếu dấu ngoặc vuông ']' đóng.")
            return inner

        if tok.type == TokenType.LBRACE:
            self.advance()
            inner = self._parse_pratt_expr(PREC_NONE, depth + 1)
            self.expect(TokenType.RBRACE, "Thiếu dấu ngoặc nhọn '}' đóng.")
            return inner

        if tok.type == TokenType.PIPE:
            self.advance()
            self.abs_depth += 1
            inner = self._parse_pratt_expr(PREC_NONE, depth + 1)
            self.expect(TokenType.PIPE, "Thiếu dấu gạch đứng '|' đóng giá trị tuyệt đối.")
            self.abs_depth -= 1
            return Abs(inner)

        # 4. LaTeX Commands
        if tok.type == TokenType.COMMAND:
            cmd = tok.value
            self.advance()

            # 4.1 Fractions: \frac{u}{v} or \frac12
            if cmd == r"\frac":
                # Numerator
                if self.current().type == TokenType.LBRACE:
                    self.advance()
                    num = self._parse_pratt_expr(PREC_NONE, depth + 1)
                    self.expect(TokenType.RBRACE, "Thiếu dấu ngoặc nhọn '}' đóng tử số phân thức.")
                else:
                    num = self.parse_primary(depth + 1)

                # Denominator
                if self.current().type == TokenType.LBRACE:
                    self.advance()
                    den = self._parse_pratt_expr(PREC_NONE, depth + 1)
                    self.expect(TokenType.RBRACE, "Thiếu dấu ngoặc nhọn '}' đóng mẫu số phân thức.")
                else:
                    den = self.parse_primary(depth + 1)

                if den == 0:
                    raise ParserError(
                        "DIVISION_BY_ZERO", "Mẫu số của phân thức bằng 0.", pos=tok.pos
                    )

                self.add_denominator_constraint(den)
                if isinstance(num, (int, Integer)) and isinstance(den, (int, Integer)):
                    return Rational(int(num), int(den))
                return num / den

            # 4.2 Radicals: \sqrt{u} or \sqrt[n]{u}
            if cmd == r"\sqrt":
                # Optional index: [n]
                if self.current().type == TokenType.LBRACKET:
                    self.advance()
                    index_expr = self._parse_pratt_expr(PREC_NONE, depth + 1)
                    self.expect(TokenType.RBRACKET, "Thiếu dấu ngoặc vuông ']' đóng bậc căn thức.")
                else:
                    index_expr = Integer(2)

                # Radicand
                if self.current().type == TokenType.LBRACE:
                    self.advance()
                    radicand = self._parse_pratt_expr(PREC_NONE, depth + 1)
                    self.expect(
                        TokenType.RBRACE, "Thiếu dấu ngoặc nhọn '}' đóng biểu thức dưới dấu căn."
                    )
                elif self.current().type in (TokenType.NUMBER, TokenType.IDENT):
                    radicand = self.parse_primary(depth + 1)
                else:
                    raise ParserError(
                        "SYNTAX_ERROR",
                        "Dấu căn '\\sqrt' thiếu biểu thức dưới dấu căn.",
                        pos=tok.pos,
                    )

                self.add_root_constraint(radicand, index_expr)
                if index_expr == 2:
                    return sympy.sqrt(radicand)
                return root(radicand, index_expr)

            # 4.3 Trigonometric and Inverse Trigonometric Functions
            if cmd in (
                r"\sin",
                r"\cos",
                r"\tan",
                r"\cot",
                r"\arcsin",
                r"\arccos",
                r"\arctan",
                r"\arccot",
            ):
                func_name = cmd[1:]  # strip leading backslash

                # Check for function power: \sin^2(x)
                power_expr = None
                if self.current().type == TokenType.CARET:
                    self.advance()
                    if self.current().type == TokenType.LBRACE:
                        self.advance()
                        power_expr = self._parse_pratt_expr(PREC_NONE, depth + 1)
                        self.expect(
                            TokenType.RBRACE,
                            "Thiếu dấu ngoặc nhọn '}' đóng số mũ của hàm lượng giác.",
                        )
                    else:
                        power_expr = self.parse_primary(depth + 1)

                # Argument
                if self.current().type == TokenType.LPAREN:
                    self.advance()
                    arg = self._parse_pratt_expr(PREC_NONE, depth + 1)
                    self.expect(
                        TokenType.RPAREN, "Thiếu dấu ngoặc đơn ')' đóng đối số hàm lượng giác."
                    )
                elif self.current().type == TokenType.LBRACE:
                    self.advance()
                    arg = self._parse_pratt_expr(PREC_NONE, depth + 1)
                    self.expect(
                        TokenType.RBRACE, "Thiếu dấu ngoặc nhọn '}' đóng đối số hàm lượng giác."
                    )
                else:
                    arg = self.parse_primary(depth + 1)

                # Instantiate SymPy function
                if func_name == "sin":
                    res = sin(arg)
                elif func_name == "cos":
                    res = cos(arg)
                elif func_name == "tan":
                    self.add_trig_domain_constraint("tan", arg)
                    res = tan(arg)
                elif func_name == "cot":
                    self.add_trig_domain_constraint("cot", arg)
                    res = cot(arg)
                elif func_name == "arcsin":
                    res = asin(arg)
                elif func_name == "arccos":
                    res = acos(arg)
                elif func_name == "arctan":
                    res = atan(arg)
                elif func_name == "arccot":
                    res = acot(arg)
                else:
                    res = Symbol(f"{func_name}_{arg}")

                if power_expr is not None:
                    res = Pow(res, power_expr)
                return res

            # 4.4 Natural Logarithm: \ln
            if cmd == r"\ln":
                power_expr = None
                if self.current().type == TokenType.CARET:
                    self.advance()
                    if self.current().type == TokenType.LBRACE:
                        self.advance()
                        power_expr = self._parse_pratt_expr(PREC_NONE, depth + 1)
                        self.expect(
                            TokenType.RBRACE, "Thiếu dấu ngoặc nhọn '}' đóng số mũ hàm logarit."
                        )
                    else:
                        power_expr = self.parse_primary(depth + 1)

                if self.current().type == TokenType.LPAREN:
                    self.advance()
                    arg = self._parse_pratt_expr(PREC_NONE, depth + 1)
                    self.expect(TokenType.RPAREN, "Thiếu dấu ngoặc đơn ')' đóng đối số hàm ln.")
                elif self.current().type == TokenType.LBRACE:
                    self.advance()
                    arg = self._parse_pratt_expr(PREC_NONE, depth + 1)
                    self.expect(TokenType.RBRACE, "Thiếu dấu ngoặc nhọn '}' đóng đối số hàm ln.")
                else:
                    arg = self.parse_primary(depth + 1)

                self.add_log_constraints(arg)
                res = ln(arg)
                if power_expr is not None:
                    res = Pow(res, power_expr)
                return res

            # 4.5 General Logarithm: \log or \log_a
            if cmd == r"\log":
                base_expr = None
                if self.current().type == TokenType.UNDERSCORE:
                    self.advance()
                    if self.current().type == TokenType.LBRACE:
                        self.advance()
                        base_expr = self._parse_pratt_expr(PREC_NONE, depth + 1)
                        self.expect(
                            TokenType.RBRACE, "Thiếu dấu ngoặc nhọn '}' đóng cơ số logarit."
                        )
                    else:
                        base_expr = self.parse_primary(depth + 1)

                if self.current().type == TokenType.LPAREN:
                    self.advance()
                    arg = self._parse_pratt_expr(PREC_NONE, depth + 1)
                    self.expect(TokenType.RPAREN, "Thiếu dấu ngoặc đơn ')' đóng đối số logarit.")
                elif self.current().type == TokenType.LBRACE:
                    self.advance()
                    arg = self._parse_pratt_expr(PREC_NONE, depth + 1)
                    self.expect(TokenType.RBRACE, "Thiếu dấu ngoặc nhọn '}' đóng đối số logarit.")
                else:
                    arg = self.parse_primary(depth + 1)

                self.add_log_constraints(arg, base_expr)
                if base_expr is not None:
                    return log(arg, base_expr)
                return log(arg, 10)  # Default base 10 in high school math

            # 4.6 Exponential: \exp
            if cmd == r"\exp":
                if self.current().type == TokenType.LPAREN:
                    self.advance()
                    arg = self._parse_pratt_expr(PREC_NONE, depth + 1)
                    self.expect(TokenType.RPAREN, "Thiếu dấu ngoặc đơn ')' đóng đối số exp.")
                elif self.current().type == TokenType.LBRACE:
                    self.advance()
                    arg = self._parse_pratt_expr(PREC_NONE, depth + 1)
                    self.expect(TokenType.RBRACE, "Thiếu dấu ngoặc nhọn '}' đóng đối số exp.")
                else:
                    arg = self.parse_primary(depth + 1)
                return exp(arg)

            # 4.7 Limits: \lim_{x \to a} f(x)
            if cmd == r"\lim":
                self.expect(
                    TokenType.UNDERSCORE,
                    "Lệnh '\\lim' bắt buộc có chỉ số biến và điểm tới hạn (\\lim_{x \\to a}).",
                )
                self.expect(TokenType.LBRACE, "Thiếu dấu ngoặc nhọn '{' mở chỉ số của giới hạn.")
                var_tok = self.expect(TokenType.IDENT, "Thiếu biến số trong chỉ số giới hạn.")
                var_sym = Symbol(var_tok.value)
                self.expect(TokenType.TO, "Thiếu ký hiệu mũi tên '\\to' trong chỉ số giới hạn.")
                target = self._parse_pratt_expr(PREC_NONE, depth + 1)
                self.expect(TokenType.RBRACE, "Thiếu dấu ngoặc nhọn '}' đóng chỉ số giới hạn.")

                body = self._parse_pratt_expr(PREC_MUL, depth + 1)
                return Limit(body, var_sym, target)

            # 4.8 Integrals: \int_{a}^{b} f(x) dx or \int f(x) dx
            if cmd in (r"\int", r"\iint"):
                # Check for definite bounds
                has_bounds = False
                lower_b = None
                upper_b = None
                if self.current().type == TokenType.UNDERSCORE:
                    self.advance()
                    has_bounds = True
                    if self.current().type == TokenType.LBRACE:
                        self.advance()
                        lower_b = self._parse_pratt_expr(PREC_NONE, depth + 1)
                        self.expect(
                            TokenType.RBRACE, "Thiếu dấu ngoặc nhọn '}' đóng cận dưới tích phân."
                        )
                    else:
                        lower_b = self.parse_primary(depth + 1)

                    self.expect(TokenType.CARET, "Tích phân xác định bắt buộc có cận trên (^).")
                    if self.current().type == TokenType.LBRACE:
                        self.advance()
                        upper_b = self._parse_pratt_expr(PREC_NONE, depth + 1)
                        self.expect(
                            TokenType.RBRACE, "Thiếu dấu ngoặc nhọn '}' đóng cận trên tích phân."
                        )
                    else:
                        upper_b = self.parse_primary(depth + 1)

                body = self._parse_pratt_expr(PREC_MUL, depth + 1)

                # Look for differential dx
                diff_var = None
                if self.current().type == TokenType.DIFF:
                    diff_tok = self.advance()
                    diff_var = Symbol(diff_tok.value)
                else:
                    # Infer integration variable from body
                    free = (
                        sorted([str(s) for s in body.free_symbols])
                        if hasattr(body, "free_symbols")
                        else []
                    )
                    diff_var = Symbol(free[0]) if free else Symbol("x")

                if has_bounds:
                    return Integral(body, (diff_var, lower_b, upper_b))
                return Integral(body, diff_var)

            # 4.9 Summation: \sum_{k=a}^{b} f(k)
            if cmd == r"\sum":
                self.expect(
                    TokenType.UNDERSCORE, "Lệnh '\\sum' bắt buộc có chỉ số chạy (\\sum_{k=a}^{b})."
                )
                self.expect(TokenType.LBRACE, "Thiếu dấu ngoặc nhọn '{' mở chỉ số tổng.")
                k_tok = self.expect(TokenType.IDENT, "Thiếu biến số chạy trong chỉ số tổng.")
                k_sym = Symbol(k_tok.value)
                self.expect(TokenType.EQUAL, "Thiếu dấu bằng '=' khởi tạo biến tổng.")
                lower_b = self._parse_pratt_expr(PREC_NONE, depth + 1)
                self.expect(TokenType.RBRACE, "Thiếu dấu ngoặc nhọn '}' đóng chỉ số tổng.")

                self.expect(TokenType.CARET, "Lệnh '\\sum' bắt buộc có cận trên (^).")
                if self.current().type == TokenType.LBRACE:
                    self.advance()
                    upper_b = self._parse_pratt_expr(PREC_NONE, depth + 1)
                    self.expect(TokenType.RBRACE, "Thiếu dấu ngoặc nhọn '}' đóng cận trên tổng.")
                else:
                    upper_b = self.parse_primary(depth + 1)

                body = self._parse_pratt_expr(PREC_MUL, depth + 1)
                return Sum(body, (k_sym, lower_b, upper_b))

            # 4.10 Combinatorics: \binom{n}{k}
            if cmd == r"\binom":
                self.expect(
                    TokenType.LBRACE, "Thiếu dấu ngoặc nhọn '{' mở tham số thứ nhất của \\binom."
                )
                n_expr = self._parse_pratt_expr(PREC_NONE, depth + 1)
                self.expect(
                    TokenType.RBRACE, "Thiếu dấu ngoặc nhọn '}' đóng tham số thứ nhất của \\binom."
                )

                self.expect(
                    TokenType.LBRACE, "Thiếu dấu ngoặc nhọn '{' mở tham số thứ hai của \\binom."
                )
                k_expr = self._parse_pratt_expr(PREC_NONE, depth + 1)
                self.expect(
                    TokenType.RBRACE, "Thiếu dấu ngoặc nhọn '}' đóng tham số thứ hai của \\binom."
                )

                return binomial(n_expr, k_expr)

            # 4.11 Vector: \vec{u} or \vec u
            if cmd == r"\vec":
                if self.current().type == TokenType.LBRACE:
                    self.advance()
                    v = self._parse_pratt_expr(PREC_NONE, depth + 1)
                    self.expect(TokenType.RBRACE, "Thiếu dấu ngoặc nhọn '}' đóng vector.")
                else:
                    v = self.parse_primary(depth + 1)
                return Symbol(f"vec_{v}")

            # 4.12 Overline: \bar{z}
            if cmd == r"\bar":
                if self.current().type == TokenType.LBRACE:
                    self.advance()
                    v = self._parse_pratt_expr(PREC_NONE, depth + 1)
                    self.expect(TokenType.RBRACE, "Thiếu dấu ngoặc nhọn '}' đóng overline.")
                else:
                    v = self.parse_primary(depth + 1)
                return Symbol(f"bar_{v}")

            # 4.13 Degree circle: \circ (e.g. 90^\circ)
            if cmd == r"\circ":
                return Symbol("circ")

        # Fallback error for unhandled token
        raise ParserError(
            "SYNTAX_ERROR",
            f"Ký tự hoặc cấu trúc bất thường '{tok.value}' tại vị trí {tok.pos + 1}.",
            pos=tok.pos,
        )


def parse_latex(latex_str: str) -> ParseResult:
    """
    Safely parses a high school mathematics LaTeX string into a SymPy expression
    and its mandatory domain constraints.
    Adheres strictly to the PUMKIN Academic Standards (GEMINI.md).
    Zero eval, zero exec, zero sympify.
    """
    if not latex_str or not latex_str.strip():
        return ParseResult(
            is_success=False,
            error_code="EMPTY_INPUT",
            reason_vi="Chuỗi biểu thức LaTeX rỗng, không có dữ liệu toán học.",
        )

    try:
        tokens = tokenize(latex_str)
        parser = LatexParser(tokens, raw_latex=latex_str)
        expr = parser.parse()

        # Extract free variables sorted alphabetically
        variables: list[str] = []
        if hasattr(expr, "free_symbols"):
            variables = sorted([str(s) for s in expr.free_symbols])

        # Normalize LaTeX representation via SymPy
        try:
            norm_latex = sympy.latex(expr)
        except Exception:
            norm_latex = None

        return ParseResult(
            is_success=True,
            expr=expr,
            constraints=parser.constraints,
            variables=variables,
            latex_normalized=norm_latex,
        )

    except TokenizerError as e:
        return ParseResult(
            is_success=False, error_code=e.code, reason_vi=e.message_vi, error_position=e.pos + 1
        )
    except ParserError as e:
        return ParseResult(
            is_success=False, error_code=e.code, reason_vi=e.message_vi, error_position=e.pos + 1
        )
    except Exception as e:
        return ParseResult(
            is_success=False,
            error_code="UNEXPECTED_ERROR",
            reason_vi=f"Lỗi cú pháp toán học không xác định: {str(e)}",
            error_position=None,
        )
