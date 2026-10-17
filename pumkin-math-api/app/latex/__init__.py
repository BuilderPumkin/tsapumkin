r"""
LaTeX Parsing and Formatting Layer for Pumkin Math API
Standardizes mathematical strings into KaTeX \( ... \) and \[ ... \] notations.
Provides safe handcrafted tokenization, recursive-descent parsing, SymPy AST construction,
and GEMINI.md domain constraint extraction.
"""

from app.latex.parser import LatexParser, ParserError, parse_latex
from app.latex.result import ConstraintType, DomainConstraint, ParseResult
from app.latex.tokenizer import TokenizerError, tokenize
from app.latex.tokens import Token, TokenType

__all__ = [
    "Token",
    "TokenType",
    "tokenize",
    "TokenizerError",
    "ParseResult",
    "DomainConstraint",
    "ConstraintType",
    "LatexParser",
    "ParserError",
    "parse_latex",
]
