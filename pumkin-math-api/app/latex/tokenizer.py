"""
LaTeX Tokenizer (Lexer) for High School Mathematics Subset
Performs lexical analysis on mathematical LaTeX strings, enforcing strict security
and resource boundaries (max length, max tokens, zero eval, zero code execution).
"""

import re

from app.latex.tokens import Token, TokenType

# Security blacklist: patterns indicating code injection or unsafe operations
FORBIDDEN_PATTERNS = [
    r"__import__",
    r"\beval\b",
    r"\bexec\b",
    r"\bsubprocess\b",
    r"\bos\.",
    r"\bsys\.",
    r"\bglobals\b",
    r"\blocals\b",
    r"\bbuiltins\b",
    r"__builtins__",
    r"\bcompile\b",
    r"\bopen\s*\(",
    r"\bgetattr\b",
    r"\bsetattr\b",
    r"\bdelattr\b",
    r"(?<!\\)\bimport\b",
    r"(?<!\\)\bdef\b",
    r"(?<!\\)\bclass\b",
    r"(?<!\\)\blambda\b",
]

# Physical units commonly appended in Vietnamese THPT math (e.g. \text{ m}^3, \text{cm})
PHYSICAL_UNITS = {
    "m",
    "cm",
    "mm",
    "km",
    "dm",
    "m^2",
    "cm^2",
    "m^3",
    "cm^3",
    "l",
    "ml",
    "kg",
    "g",
    "s",
    "h",
    "phút",
    "giây",
    "giờ",
    "đ",
    "đồng",
    "rad",
}

# Supported LaTeX function commands
MATH_FUNCTIONS = {
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
}

# Greek letters mapped to standard variable names
GREEK_LETTERS = {
    r"\alpha": "alpha",
    r"\beta": "beta",
    r"\gamma": "gamma",
    r"\theta": "theta",
    r"\lambda": "lambda",
    r"\mu": "mu",
    r"\pi": "pi",
    r"\sigma": "sigma",
    r"\omega": "omega",
    r"\Delta": "Delta",
    r"\Omega": "Omega",
    r"\Sigma": "Sigma",
    r"\phi": "phi",
    r"\varphi": "varphi",
    r"\tau": "tau",
    r"\kappa": "kappa",
    r"\epsilon": "epsilon",
}


class TokenizerError(Exception):
    """Exception raised when tokenization fails due to syntax or security."""

    def __init__(self, code: str, message_vi: str, pos: int = 0):
        super().__init__(message_vi)
        self.code = code
        self.message_vi = message_vi
        self.pos = pos


def clean_latex_wrapper(s: str) -> str:
    """Strips outer delimiters like \\( ... \\), \\[ ... \\], $$ ... $$, or $ ... $."""
    s = s.strip()
    if s.startswith(r"\(") and s.endswith(r"\)"):
        s = s[2:-2].strip()
    elif s.startswith(r"\[") and s.endswith(r"\]"):
        s = s[2:-2].strip()
    elif s.startswith("$$") and s.endswith("$$"):
        s = s[2:-2].strip()
    elif s.startswith("$") and s.endswith("$") and len(s) >= 2:
        s = s[1:-1].strip()
    return s


def tokenize(latex_str: str, max_length: int = 2000, max_tokens: int = 500) -> list[Token]:
    """
    Tokenizes a LaTeX math string into a list of strongly typed Token objects.
    Enforces resource boundaries and security rules.
    """
    if len(latex_str) > max_length:
        raise TokenizerError(
            "RESOURCE_LIMIT_EXCEEDED",
            (
                f"Độ dài chuỗi LaTeX ({len(latex_str)}) vượt quá giới hạn "
                f"tối đa cho phép ({max_length} ký tự)."
            ),
            pos=0,
        )

    # Security scan for forbidden code injection terms
    for pattern in FORBIDDEN_PATTERNS:
        if re.search(pattern, latex_str, re.IGNORECASE):
            raise TokenizerError(
                "SECURITY_VIOLATION",
                "Phát hiện chuỗi độc hại bị cấm trong biểu thức toán học.",
                pos=0,
            )

    # Check for unprintable control characters and null bytes
    for idx, ch in enumerate(latex_str):
        code = ord(ch)
        if code == 0:
            raise TokenizerError(
                "INVALID_CHARACTER", "Phát hiện ký tự null byte không hợp lệ.", pos=idx
            )
        if code < 32 and ch not in ("\t", "\n", "\r"):
            raise TokenizerError(
                "INVALID_CHARACTER",
                f"Phát hiện ký tự điều khiển ASCII {code} không hợp lệ.",
                pos=idx,
            )

    # Clean outer wrappers
    s = clean_latex_wrapper(latex_str)

    # Remove LaTeX comments (% until newline)
    s = re.sub(r"%.*?$", "", s, flags=re.MULTILINE)

    tokens: list[Token] = []
    i = 0
    n = len(s)
    unbraced_frac_args = 0
    unbraced_sub_exp = 0

    while i < n:
        # Check token count limit
        if len(tokens) >= max_tokens:
            raise TokenizerError(
                "RESOURCE_LIMIT_EXCEEDED",
                f"Số lượng token vượt quá giới hạn an toàn tối đa ({max_tokens} tokens).",
                pos=i,
            )

        ch = s[i]

        # 1. Whitespace
        if ch.isspace():
            i += 1
            continue

        # 2. LaTeX Spacing Commands: \, \: \; \! \quad \qquad \ (backslash space)
        if ch == "\\" and i + 1 < n and s[i + 1] in (",", ":", ";", "!", " "):
            i += 2
            continue
        if s.startswith(r"\quad", i):
            i += 5
            continue
        if s.startswith(r"\qquad", i):
            i += 6
            continue

        # 3. Delimiter modifiers: \left, \right
        if s.startswith(r"\left.", i):
            i += 6
            continue
        if s.startswith(r"\right.", i):
            i += 7
            continue
        if s.startswith(r"\left", i) and (i + 5 >= n or not s[i + 5].isalpha()):
            i += 5
            continue
        if s.startswith(r"\right", i) and (i + 6 >= n or not s[i + 6].isalpha()):
            i += 6
            continue

        # 4. Text and units: \text{...} or \mathrm{...}
        m_text = re.match(r"\\(text|mathrm)\{([^}]*)\}", s[i:])
        if m_text:
            unbraced_frac_args = 0
            unbraced_sub_exp = 0
            text_val = m_text.group(2).strip()
            cleaned_unit = text_val.lstrip()
            # If it's a recognized unit (or trailing unit), skip it and any
            # attached unit power (^2, ^3)
            if (
                cleaned_unit in PHYSICAL_UNITS
                or cleaned_unit.startswith("m^")
                or cleaned_unit.startswith("cm^")
            ):
                i += m_text.end()
                m_unit_exp = re.match(r"^\^(\d+|\{\d+\})", s[i:])
                if m_unit_exp:
                    i += m_unit_exp.end()
                continue
            # If text is an identifier (e.g. CĐ, CT, max, min, const), emit as IDENT
            if text_val:
                tokens.append(Token(TokenType.IDENT, text_val, i, 1, i + 1))
                i += m_text.end()
                continue

        # 5. Numbers: unbraced single digit for \frac or ^ / _
        if ch.isdigit() and (unbraced_frac_args > 0 or unbraced_sub_exp > 0):
            tokens.append(Token(TokenType.NUMBER, ch, i, 1, i + 1))
            if unbraced_frac_args > 0:
                unbraced_frac_args -= 1
            if unbraced_sub_exp > 0:
                unbraced_sub_exp -= 1
            i += 1
            continue

        # 5.1 Vietnamese decimal comma with braces: \d+\{,\}\d+
        m_vn_brace = re.match(r"^(\d+)\{,\}(\d+)", s[i:])
        if m_vn_brace:
            unbraced_frac_args = 0
            unbraced_sub_exp = 0
            val = f"{m_vn_brace.group(1)}.{m_vn_brace.group(2)}"
            tokens.append(Token(TokenType.NUMBER, val, i, 1, i + 1))
            i += m_vn_brace.end()
            continue

        # 5.2 Vietnamese decimal comma direct: \d+,\d+
        # Note: Must ensure not followed by another comma or list-like pattern
        m_vn_comma = re.match(r"^(\d+),(\d+)(?!\d*,)", s[i:])
        # Verify decimal number: e.g. 1,5 or 0,25. (In coordinate (1, 2) there is space)
        if m_vn_comma:
            unbraced_frac_args = 0
            unbraced_sub_exp = 0
            val = f"{m_vn_comma.group(1)}.{m_vn_comma.group(2)}"
            tokens.append(Token(TokenType.NUMBER, val, i, 1, i + 1))
            i += m_vn_comma.end()
            continue

        # 5.3 Standard floating point or integer: \d+(\.\d+)?
        m_num = re.match(r"^(\d+(\.\d+)?)", s[i:])
        if m_num:
            unbraced_frac_args = 0
            unbraced_sub_exp = 0
            tokens.append(Token(TokenType.NUMBER, m_num.group(1), i, 1, i + 1))
            i += m_num.end()
            continue

        # 6. Differential notation in integrals: dx, dt, du, dr, dy, dz, d\alpha, etc.
        # Matches 'd' followed by single letter when preceded by math tokens
        if (
            ch == "d"
            and i + 1 < n
            and s[i + 1].isalpha()
            and (i + 2 == n or not s[i + 2].isalnum())
        ):
            unbraced_frac_args = 0
            unbraced_sub_exp = 0
            diff_var = s[i + 1]
            tokens.append(Token(TokenType.DIFF, diff_var, i, 1, i + 1))
            i += 2
            continue

        # 7. LaTeX Commands
        if ch == "\\":
            # Escaped delimiters: \{ and \}
            if i + 1 < n and s[i + 1] == "{":
                unbraced_frac_args = 0
                unbraced_sub_exp = 0
                tokens.append(Token(TokenType.LBRACE, "{", i, 1, i + 1))
                i += 2
                continue
            if i + 1 < n and s[i + 1] == "}":
                unbraced_frac_args = 0
                unbraced_sub_exp = 0
                tokens.append(Token(TokenType.RBRACE, "}", i, 1, i + 1))
                i += 2
                continue

            m_cmd = re.match(r"^\\[a-zA-Z]+", s[i:])
            if not m_cmd:
                raise TokenizerError(
                    "SYNTAX_ERROR", f"Lệnh LaTeX không hợp lệ tại vị trí {i + 1}.", pos=i
                )

            cmd = m_cmd.group(0)

            # Fractions
            if cmd in (r"\frac", r"\dfrac", r"\tfrac"):
                tokens.append(Token(TokenType.COMMAND, r"\frac", i, 1, i + 1))
                unbraced_frac_args = 2
                unbraced_sub_exp = 0
                i += m_cmd.end()
                continue

            # Square/nth root
            if cmd == r"\sqrt":
                tokens.append(Token(TokenType.COMMAND, r"\sqrt", i, 1, i + 1))
                i += m_cmd.end()
                continue

            # Functions (sin, cos, tan, cot, ln, log, exp...)
            if cmd in MATH_FUNCTIONS:
                tokens.append(Token(TokenType.COMMAND, cmd, i, 1, i + 1))
                i += m_cmd.end()
                continue

            # Calculus: lim, int, iint, sum
            if cmd in (r"\lim", r"\int", r"\iint", r"\sum"):
                tokens.append(Token(TokenType.COMMAND, cmd, i, 1, i + 1))
                i += m_cmd.end()
                continue

            # Operators: \cdot, \times
            if cmd in (r"\cdot", r"\times"):
                tokens.append(Token(TokenType.STAR, "*", i, 1, i + 1))
                i += m_cmd.end()
                continue

            # Relations: \le, \leq, \ge, \geq, \ne, \neq
            if cmd in (r"\le", r"\leq"):
                tokens.append(Token(TokenType.LE, "<=", i, 1, i + 1))
                i += m_cmd.end()
                continue
            if cmd in (r"\ge", r"\geq"):
                tokens.append(Token(TokenType.GE, ">=", i, 1, i + 1))
                i += m_cmd.end()
                continue
            if cmd in (r"\ne", r"\neq"):
                tokens.append(Token(TokenType.NEQ, "!=", i, 1, i + 1))
                i += m_cmd.end()
                continue

            # Arrow: \to, \rightarrow
            if cmd in (r"\to", r"\rightarrow"):
                tokens.append(Token(TokenType.TO, r"\to", i, 1, i + 1))
                i += m_cmd.end()
                continue

            # Infinity: \infty
            if cmd == r"\infty":
                tokens.append(Token(TokenType.IDENT, "oo", i, 1, i + 1))
                i += m_cmd.end()
                continue

            # Greek Letters: \alpha, \pi, \theta...
            if cmd in GREEK_LETTERS:
                var_name = GREEK_LETTERS[cmd]
                tokens.append(Token(TokenType.IDENT, var_name, i, 1, i + 1))
                i += m_cmd.end()
                continue

            # Prime: \prime
            if cmd == r"\prime":
                tokens.append(Token(TokenType.PRIME, "'", i, 1, i + 1))
                i += m_cmd.end()
                continue

            # Combinatorics: \binom
            if cmd == r"\binom":
                tokens.append(Token(TokenType.COMMAND, r"\binom", i, 1, i + 1))
                i += m_cmd.end()
                continue

            # Vector & Overline notations
            if cmd == r"\vec":
                tokens.append(Token(TokenType.COMMAND, r"\vec", i, 1, i + 1))
                i += m_cmd.end()
                continue
            if cmd in (r"\bar", r"\overline"):
                tokens.append(Token(TokenType.COMMAND, r"\bar", i, 1, i + 1))
                i += m_cmd.end()
                continue

            # Degree circle: \circ
            if cmd == r"\circ":
                tokens.append(Token(TokenType.COMMAND, r"\circ", i, 1, i + 1))
                i += m_cmd.end()
                continue

            # Extremum tokens: \max, \min
            if cmd in (r"\max", r"\min"):
                tokens.append(Token(TokenType.IDENT, cmd[1:], i, 1, i + 1))
                i += m_cmd.end()
                continue

            # Any other unknown command -> raise descriptive unsupported error
            raise TokenizerError(
                "UNSUPPORTED_SYNTAX",
                f"Lệnh LaTeX '{cmd}' chưa nằm trong danh mục hỗ trợ của THPT v1.",
                pos=i,
            )

        # 8. Single-character operators and delimiters
        if ch == "+":
            unbraced_frac_args = 0
            unbraced_sub_exp = 0
            tokens.append(Token(TokenType.PLUS, "+", i, 1, i + 1))
            i += 1
            continue
        if ch == "-":
            unbraced_frac_args = 0
            unbraced_sub_exp = 0
            tokens.append(Token(TokenType.MINUS, "-", i, 1, i + 1))
            i += 1
            continue
        if ch == "*":
            unbraced_frac_args = 0
            unbraced_sub_exp = 0
            tokens.append(Token(TokenType.STAR, "*", i, 1, i + 1))
            i += 1
            continue
        if ch == "/":
            unbraced_frac_args = 0
            unbraced_sub_exp = 0
            tokens.append(Token(TokenType.SLASH, "/", i, 1, i + 1))
            i += 1
            continue
        if ch == "^":
            unbraced_frac_args = 0
            unbraced_sub_exp = 1
            tokens.append(Token(TokenType.CARET, "^", i, 1, i + 1))
            i += 1
            continue
        if ch == "_":
            unbraced_frac_args = 0
            unbraced_sub_exp = 1
            tokens.append(Token(TokenType.UNDERSCORE, "_", i, 1, i + 1))
            i += 1
            continue
        if ch == "(":
            unbraced_frac_args = 0
            unbraced_sub_exp = 0
            tokens.append(Token(TokenType.LPAREN, "(", i, 1, i + 1))
            i += 1
            continue
        if ch == ")":
            unbraced_frac_args = 0
            unbraced_sub_exp = 0
            tokens.append(Token(TokenType.RPAREN, ")", i, 1, i + 1))
            i += 1
            continue
        if ch == "[":
            unbraced_frac_args = 0
            unbraced_sub_exp = 0
            tokens.append(Token(TokenType.LBRACKET, "[", i, 1, i + 1))
            i += 1
            continue
        if ch == "]":
            unbraced_frac_args = 0
            unbraced_sub_exp = 0
            tokens.append(Token(TokenType.RBRACKET, "]", i, 1, i + 1))
            i += 1
            continue
        if ch == "{":
            unbraced_frac_args = 0
            unbraced_sub_exp = 0
            tokens.append(Token(TokenType.LBRACE, "{", i, 1, i + 1))
            i += 1
            continue
        if ch == "}":
            unbraced_frac_args = 0
            unbraced_sub_exp = 0
            tokens.append(Token(TokenType.RBRACE, "}", i, 1, i + 1))
            i += 1
            continue
        if ch == "|":
            unbraced_frac_args = 0
            unbraced_sub_exp = 0
            tokens.append(Token(TokenType.PIPE, "|", i, 1, i + 1))
            i += 1
            continue
        if ch == ",":
            unbraced_frac_args = 0
            unbraced_sub_exp = 0
            tokens.append(Token(TokenType.COMMA, ",", i, 1, i + 1))
            i += 1
            continue
        if ch == ";":
            unbraced_frac_args = 0
            unbraced_sub_exp = 0
            tokens.append(Token(TokenType.SEMICOLON, ";", i, 1, i + 1))
            i += 1
            continue
        if ch == ":":
            unbraced_frac_args = 0
            unbraced_sub_exp = 0
            tokens.append(Token(TokenType.COLON, ":", i, 1, i + 1))
            i += 1
            continue
        if ch == "=":
            unbraced_frac_args = 0
            unbraced_sub_exp = 0
            tokens.append(Token(TokenType.EQUAL, "=", i, 1, i + 1))
            i += 1
            continue
        if ch == "<":
            unbraced_frac_args = 0
            unbraced_sub_exp = 0
            if i + 1 < n and s[i + 1] == "=":
                tokens.append(Token(TokenType.LE, "<=", i, 1, i + 1))
                i += 2
            else:
                tokens.append(Token(TokenType.LT, "<", i, 1, i + 1))
                i += 1
            continue
        if ch == ">":
            unbraced_frac_args = 0
            unbraced_sub_exp = 0
            if i + 1 < n and s[i + 1] == "=":
                tokens.append(Token(TokenType.GE, ">=", i, 1, i + 1))
                i += 2
            else:
                tokens.append(Token(TokenType.GT, ">", i, 1, i + 1))
                i += 1
            continue
        if ch == "!":
            unbraced_frac_args = 0
            unbraced_sub_exp = 0
            if i + 1 < n and s[i + 1] == "=":
                tokens.append(Token(TokenType.NEQ, "!=", i, 1, i + 1))
                i += 2
                continue
            # Factorial operator
            tokens.append(Token(TokenType.COMMAND, "!", i, 1, i + 1))
            i += 1
            continue
        if ch == "'":
            unbraced_frac_args = 0
            unbraced_sub_exp = 0
            tokens.append(Token(TokenType.PRIME, "'", i, 1, i + 1))
            i += 1
            continue

        # 9. Single Latin letters as variables: x, y, z, t, m, a, b, c, k, etc.
        if ch.isalpha():
            if unbraced_frac_args > 0:
                unbraced_frac_args -= 1
            unbraced_sub_exp = 0
            tokens.append(Token(TokenType.IDENT, ch, i, 1, i + 1))
            i += 1
            continue

        # If character is not recognized, raise syntax error
        raise TokenizerError(
            "SYNTAX_ERROR", f"Ký tự không hợp lệ '{ch}' tại vị trí {i + 1}.", pos=i
        )

    tokens.append(Token(TokenType.EOF, "", n, 1, n + 1))
    return tokens
