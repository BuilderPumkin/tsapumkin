"""
Token Definitions for LaTeX Lexer
Defines tokens, token types, and token positions for the mathematical subset tokenizer.
"""

from dataclasses import dataclass
from enum import StrEnum


class TokenType(StrEnum):
    # Literals & Symbols
    NUMBER = "NUMBER"
    IDENT = "IDENT"
    COMMAND = "COMMAND"

    # Arithmetic Operators
    PLUS = "PLUS"
    MINUS = "MINUS"
    STAR = "STAR"  # \cdot, \times, *
    SLASH = "SLASH"  # /
    CARET = "CARET"  # ^
    UNDERSCORE = "UNDERSCORE"  # _

    # Delimiters
    LPAREN = "LPAREN"  # (
    RPAREN = "RPAREN"  # )
    LBRACKET = "LBRACKET"  # [
    RBRACKET = "RBRACKET"  # ]
    LBRACE = "LBRACE"  # {
    RBRACE = "RBRACE"  # }
    PIPE = "PIPE"  # |

    # Punctuation
    COMMA = "COMMA"  # ,
    SEMICOLON = "SEMICOLON"  # ;
    COLON = "COLON"  # :

    # Relational Operators
    EQUAL = "EQUAL"  # =
    NEQ = "NEQ"  # \ne, \neq, !=
    LT = "LT"  # <
    LE = "LE"  # \le, \leq, <=
    GT = "GT"  # >
    GE = "GE"  # \ge, \geq, >=

    # Calculus / Specialty
    PRIME = "PRIME"  # ', '
    TO = "TO"  # \to, \rightarrow
    DIFF = "DIFF"  # dx, dt, du, dr, etc.

    EOF = "EOF"


@dataclass(frozen=True)
class Token:
    type: TokenType
    value: str
    pos: int  # 0-indexed character offset
    line: int  # 1-indexed line
    col: int  # 1-indexed column

    def __repr__(self) -> str:
        return f"Token({self.type.value}, {self.value!r}, pos={self.pos})"
