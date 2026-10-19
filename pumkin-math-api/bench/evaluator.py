"""
Mathematical Equivalence Evaluator and Discrepancy Classifier for Benchmarking
Provides robust, deterministic normalization and equivalence comparison between
computed solver results and question bank answer keys.
"""

from __future__ import annotations

import math
import re
from typing import Any

import sympy as sp

from app.latex.parser import parse_latex


def clean_math_text(s: Any) -> str:
    """Strips LaTeX delimiters, formatting wrappers, units, and variable prefixes."""
    if s is None:
        return ""
    text = str(s).strip()

    # 1. Remove outer LaTeX inline/display delimiters
    text = (
        text.replace(r"\(", "")
        .replace(r"\)", "")
        .replace(r"\[", "")
        .replace(r"\]", "")
        .replace("$", "")
    )

    # 2. Remove LaTeX text formatting environments
    text = re.sub(r"\\(?:text|mathrm|mathbf|mathit)\{([^}]*)\}", r"\1", text)

    # 3. Strip variable equality prefixes FIRST before unit stripping
    # e.g. \vec{n} = , \vec{n}_1 = , S = , r = , M = , \alpha = , \lambda_1 =
    text = re.sub(
        r"^(?:\\vec\{[a-zA-Z0-9_]+\}(?:_[0-9a-zA-Z]+)?|[a-zA-Z0-9_]+|\\[a-zA-Z]+(?:_[0-9a-zA-Z]+)?)\s*=\s*",
        "",
        text,
    ).strip()

    # 4. Remove physical units at the end of the text or following a number/parenthesis/brace
    text = re.sub(
        r"(?<=\d|\)|\}|\])\s*(?:m\^3|m\^2|m|cm|cm\^2|cm\^3|dm|mm|kg|g|A|mA|V|s|giây|phút|giờ|lộ trình|triệu đồng|nghìn đồng|đơn vị)\s*$",
        "",
        text,
        flags=re.IGNORECASE,
    ).strip()

    # 5. Replace semicolons in coordinate tuples with commas
    text = text.replace(";", ",")

    # 6. Convert decimal commas to decimal points between digits: 1,5 -> 1.5
    text = re.sub(r"(\d),(\d)", r"\1.\2", text)

    # 7. Remove \left and \right delimiters
    text = text.replace(r"\left", "").replace(r"\right", "")

    # 8. Convert common multiplication operators
    text = text.replace(r"\cdot", "*").replace(r"\times", "*")

    return text.strip()


def normalize_to_sympy_string(text: str) -> str:
    """Transforms common LaTeX constructs into SymPy-parseable syntax."""
    s = clean_math_text(text)
    if not s:
        return ""

    # Convert LaTeX fractions \frac{a}{b} -> ((a)/(b))
    fraction_pattern = re.compile(r"\\frac\{([^{}]+)\}\{([^{}]+)\}")
    while fraction_pattern.search(s):
        s = fraction_pattern.sub(r"((\1)/(\2))", s)

    # Convert LaTeX sqrt \sqrt{a} -> sqrt(a)
    s = re.sub(r"\\sqrt\{([^{}]+)\}", r"sqrt(\1)", s)
    s = re.sub(r"\\sqrt\[(\d+)\]\{([^{}]+)\}", r"root(\2, \1)", s)

    # Convert constants
    s = re.sub(r"\\pi\b", "pi", s)
    s = re.sub(r"\\infty\b", "oo", s)

    # Remove redundant braces
    s = s.replace("{", "(").replace("}", ")")

    return s.strip()


def parse_to_sympy_expr(text: str) -> sp.Basic | None:
    """
    Smart parser:
    If string contains backslash, attempts LaTeX parser first.
    If pure ASCII / SymPy string, attempts sp.sympify first to avoid LaTeX token misinterpretations.
    """
    if not text:
        return None

    cleaned = clean_math_text(text)
    if not cleaned:
        return None

    # If pure ASCII string without backslash, use sympify first
    if "\\" not in cleaned:
        try:
            return sp.sympify(cleaned)
        except Exception:
            pass

    # If LaTeX backslash present, try formal LaTeX parser
    try:
        res = parse_latex(cleaned)
        if res.is_success and res.expr is not None:
            return res.expr
    except Exception:
        pass

    # Fallback to normalized string sympify
    try:
        norm = normalize_to_sympy_string(text)
        return sp.sympify(norm)
    except Exception:
        pass

    return None


def _parse_tuple_elements(text: str) -> list[str] | None:
    """Parses parenthesized coordinate tuple e.g. (1, -2, 2) into element list."""
    cleaned = clean_math_text(text).strip()
    match = re.match(r"^\(\s*(.*?)\s*\)$", cleaned)
    if not match:
        return None
    inner = match.group(1)
    parts = [p.strip() for p in inner.split(",") if p.strip()]
    return parts if parts else None


def _parse_set_or_list_elements(text: str) -> set[str] | None:
    """Parses comma-separated elements e.g. '1, 3, -2' into a set."""
    cleaned = clean_math_text(text).strip()
    cleaned = re.sub(r"^\{|\}$", "", cleaned).strip()
    parts = [p.strip() for p in cleaned.split(",") if p.strip()]
    return set(parts) if len(parts) > 1 else None


def _parse_variable_assignments(text: str) -> dict[str, str]:
    """Parses variable assignment list e.g. 'I_1 = 3/2, I_2 = 2, I_3 = 5/2' into dict."""
    cleaned = clean_math_text(text).strip()
    assignments: dict[str, str] = {}
    for part in cleaned.split(","):
        if "=" in part:
            k, v = part.split("=", 1)
            assignments[k.strip()] = v.strip()
    return assignments


def _are_equations_equivalent(comp_str: str, exp_str: str) -> bool:
    """Checks equivalence of equations e.g. 2*x - 3*y + 4*z = 0 and 2x - 3y + 4z = 0."""
    if "=" not in comp_str or "=" not in exp_str:
        return False

    c_norm = comp_str.replace(" ", "")
    e_norm = exp_str.replace(" ", "")
    # Remove multiplication * between digit and variable: 2*x -> 2x
    c_norm = re.sub(r"(\d)\*([a-zA-Z])", r"\1\2", c_norm)
    e_norm = re.sub(r"(\d)\*([a-zA-Z])", r"\1\2", e_norm)
    if c_norm == e_norm:
        return True

    # Handle 3-part canonical line equations e.g. (x - 1)/2 = (y + 2)/1 = (z - 3)/-4
    if comp_str.count("=") == 2 and exp_str.count("=") == 2:
        parts_c = [p.strip() for p in comp_str.split("=")]
        parts_e = [p.strip() for p in exp_str.split("=")]
        if len(parts_c) == 3 and len(parts_e) == 3:
            if all(
                are_answers_equivalent(pc, pe) for pc, pe in zip(parts_c, parts_e, strict=False)
            ):
                return True

    # Check algebraic difference of LHS - RHS
    try:
        lhs_c, rhs_c = comp_str.split("=", 1)
        lhs_e, rhs_e = exp_str.split("=", 1)
        c_expr = sp.sympify(normalize_to_sympy_string(lhs_c)) - sp.sympify(
            normalize_to_sympy_string(rhs_c)
        )
        e_expr = sp.sympify(normalize_to_sympy_string(lhs_e)) - sp.sympify(
            normalize_to_sympy_string(rhs_e)
        )
        if sp.simplify(c_expr - e_expr) == 0 or sp.simplify(c_expr + e_expr) == 0:
            return True
    except Exception:
        pass

    return False


def _parse_matrix_cells(s: str) -> list[list[str]] | None:
    """Parses LaTeX matrix into rows and columns."""
    m = re.search(r"\\begin\{[pb]matrix\}(.*?)\\end\{[pb]matrix\}", s, re.DOTALL)
    if not m:
        return None
    rows = [r.strip() for r in m.group(1).split(r"\\") if r.strip()]
    grid = [[c.strip() for c in r.split("&")] for r in rows]
    return grid if grid else None


def are_answers_equivalent(computed: Any, expected: Any, tolerance: float = 1e-5) -> bool:
    """
    Determines mathematical equivalence between a computed solver answer and expected key.
    Checks:
    1. Exact string match after cleaning.
    2. Equation equivalence: (x-2)^2 + (y+1)^2 + (z-3)^2 = 9 vs (x-2)^2+(y+1)^2+(z-3)^2=9.
    3. Variable assignment matching: 'I_1 = 3/2, I_2 = 2' vs '2'.
    4. Coordinate tuple equivalence: (1, -2, 2) == (1; -2; 2).
    5. Order-invariant set/roots equivalence: '1, 3, -2' == '-2, 1, 3'.
    6. Exact SymPy symbolic equivalence: simplify(expr1 - expr2) == 0.
    7. Numeric float equivalence within tolerance.
    """
    if computed is None or expected is None:
        return False

    comp_str = clean_math_text(str(computed))
    exp_str = clean_math_text(str(expected))

    if not comp_str or not exp_str:
        return False

    # 1. Exact string match
    if comp_str == exp_str:
        return True

    # 2. Equation equivalence
    if _are_equations_equivalent(comp_str, exp_str):
        return True

    # 3. Variable assignment list matching
    assignments = _parse_variable_assignments(comp_str)
    if assignments:
        for _var_name, var_val in assignments.items():
            if are_answers_equivalent(var_val, exp_str, tolerance):
                return True

    # 4. Matrix cell grid comparison
    comp_matrix = _parse_matrix_cells(comp_str)
    exp_matrix = _parse_matrix_cells(exp_str)
    if comp_matrix is not None and exp_matrix is not None:
        if len(comp_matrix) == len(exp_matrix):
            all_match = True
            for r_c, r_e in zip(comp_matrix, exp_matrix, strict=False):
                if len(r_c) != len(r_e):
                    all_match = False
                    break
                for c_c, c_e in zip(r_c, r_e, strict=False):
                    if not are_answers_equivalent(c_c, c_e, tolerance):
                        all_match = False
                        break
            if all_match:
                return True

    # 5. Coordinate tuple equivalence
    comp_tuple = _parse_tuple_elements(comp_str)
    exp_tuple = _parse_tuple_elements(exp_str)
    if comp_tuple is not None and exp_tuple is not None:
        if len(comp_tuple) == len(exp_tuple):
            all_coords_match = True
            for c_coord, e_coord in zip(comp_tuple, exp_tuple, strict=False):
                if not are_answers_equivalent(c_coord, e_coord, tolerance):
                    all_coords_match = False
                    break
            if all_coords_match:
                return True

    # 5. Order-invariant set / roots equivalence
    comp_set = _parse_set_or_list_elements(comp_str)
    exp_set = _parse_set_or_list_elements(exp_str)
    if comp_set is not None and exp_set is not None:
        if len(comp_set) == len(exp_set):
            matched_indices = set()
            exp_list = list(exp_set)
            all_matched = True
            for c_item in comp_set:
                found = False
                for idx, e_item in enumerate(exp_list):
                    if idx not in matched_indices and are_answers_equivalent(
                        c_item, e_item, tolerance
                    ):
                        matched_indices.add(idx)
                        found = True
                        break
                if not found:
                    all_matched = False
                    break
            if all_matched:
                return True

    # 6. Symbolic equivalence via SymPy
    comp_expr = parse_to_sympy_expr(comp_str)
    exp_expr = parse_to_sympy_expr(exp_str)

    if comp_expr is not None and exp_expr is not None:
        try:
            diff = sp.simplify(comp_expr - exp_expr)
            if diff == 0:
                return True
        except Exception:
            pass

        # 7. Numerical evaluation equivalence
        try:
            val_comp = float(comp_expr.evalf())
            val_exp = float(exp_expr.evalf())
            if not (
                math.isnan(val_comp)
                or math.isnan(val_exp)
                or math.isinf(val_comp)
                or math.isinf(val_exp)
            ):
                if abs(val_comp - val_exp) < tolerance:
                    return True
        except Exception:
            pass

    # Direct float comparison fallback
    try:
        f_comp = float(comp_str)
        f_exp = float(exp_str)
        if abs(f_comp - f_exp) < tolerance:
            return True
    except (ValueError, TypeError):
        pass

    return False


def classify_discrepancy(
    status: str,
    is_correct: bool,
    is_supported: bool,
    is_suspected_bank_error: bool = False,
) -> str:
    """
    Classifies benchmark outcome into standard discrepancy categories:
    - 'none': correct answer or clean handling
    - 'system_error': solver crash, timeout, or uncaught exception
    - 'needs_review': CAS output conflicts with question key (recorded for teacher review)
    - 'out_of_scope': question belongs to unsupported domain
    """
    if not is_supported or status == "unsupported":
        return "out_of_scope"

    if status in ("error", "failed"):
        return "system_error"

    if not is_correct or status == "needs_review":
        return "needs_review"

    return "none"
