"""
Mathematical Text and Symbol Normalization Layer for Pumkin Math API Checker
Handles KaTeX delimiter cleanup, Vietnamese decimal commas, units,
variable prefixes (x = 5), and interval/set string parsing.
Follows GEMINI.md standards: strictly no eval/exec/sympify/parse_expr.
"""

import re


def strip_latex_wrappers(text: str) -> str:
    """
    Strips KaTeX delimiters \\( ... \\), \\[ ... \\], raw $, $$,
    and formatting wrappers such as \\text{...}, \\mathrm{...}, \\displaystyle.
    """
    s = text.strip()
    if not s:
        return ""

    # Remove outer display/inline LaTeX delimiters
    if s.startswith(r"\(") and s.endswith(r"\)"):
        s = s[2:-2].strip()
    elif s.startswith(r"\[") and s.endswith(r"\]"):
        s = s[2:-2].strip()
    elif s.startswith("$$") and s.endswith("$$") and len(s) >= 4:
        s = s[2:-2].strip()
    elif s.startswith("$") and s.endswith("$") and len(s) >= 2:
        s = s[1:-1].strip()

    # Remove \displaystyle
    s = re.sub(r"\\displaystyle\s*", "", s)

    # Unwrap \text{...}, \mathrm{...}, \mathbf{...}
    s = re.sub(r"\\text\{([^{}]*)\}", r"\1", s)
    s = re.sub(r"\\mathrm\{([^{}]*)\}", r"\1", s)
    s = re.sub(r"\\mathbf\{([^{}]*)\}", r"\1", s)

    return s.strip()


def normalize_vietnamese_number(text: str) -> str:
    """
    Normalizes Vietnamese decimal representations:
    e.g. '3,5' -> '3.5', '-0,25' -> '-0.25'.
    Preserves commas inside sets {1, 2, 3} or tuples (1, 2).
    """
    s = text.strip()
    # Check if the entire string represents a single decimal number with comma
    if re.fullmatch(r"[-+]?\d+,\d+", s):
        return s.replace(",", ".")

    # Check if it has a comma between digits without whitespace around comma
    # but only if not enclosed in set braces { ... } or brackets [ ... ]
    if not (s.startswith("{") or s.startswith(r"\{") or s.startswith("[") or s.startswith("(")):
        # If there is exactly one comma flanked by digits:
        commas = [m.start() for m in re.finditer(r",", s)]
        if len(commas) == 1:
            m = re.search(r"(\d+),(\d+)", s)
            if m:
                s = s[: m.start()] + f"{m.group(1)}.{m.group(2)}" + s[m.end() :]
    return s


def strip_variable_prefix(text: str) -> tuple[str | None, str]:
    """
    Strips leading variable assignment prefixes like 'x = 5' or 'S = {1, 2}'
    or 'y = 2x + 1'.
    Returns (variable_name, rhs_expression).
    If no variable assignment is present, returns (None, text).
    """
    s = text.strip()
    # Match patterns like: x = 5, y = ..., S = ..., x_1 = ...
    m = re.match(r"^([a-zA-Z][a-zA-Z0-9_]*)\s*=\s*(.+)$", s)
    if m:
        var_name = m.group(1).strip()
        rhs = m.group(2).strip()
        return var_name, rhs
    return None, s


def strip_units(text: str) -> str:
    """
    Strips trailing measurement units, degree signs, and geometric units:
    e.g. '5 cm' -> '5', '60°' -> '60', '60^\\circ' -> '60', '10 rad' -> '10'.
    Safety: will not strip if the entire expression is just the symbol 'm'
    (as in a polynomial parameter).
    """
    s = text.strip()
    if not s:
        return ""

    # Degree signs
    s = re.sub(r"(\d+)\s*(?:°|\^\\circ|\^\{\\circ\}|\\text\{°\}|\\text\{ độ\}| độ)", r"\1", s)

    # If the string is just 'm' or 'h' or 's', do not strip (parameter variable)
    if s in ("m", "h", "s", "g", "l"):
        return s

    # Trailing unit words
    unit_pattern = (
        r"(?<=\d|\))\s*(?:cm|mm|km|dm|m|rad|radian|đvdt|đvtt|đvđd|kg|g|s|giây|phút|giờ|h)\b"
    )
    s = re.sub(unit_pattern, "", s, flags=re.IGNORECASE)

    return s.strip()


def to_katex_inline(text: str) -> str:
    """
    Ensures mathematical expression is formatted as valid KaTeX inline: \\( ... \\).
    Strictly prevents raw unescaped '$' signs in API responses per GEMINI.md.
    """
    s = text.strip()
    if not s:
        return r"\(\)"

    # If already wrapped in \( ... \), verify and return
    if s.startswith(r"\(") and s.endswith(r"\)"):
        inner = s[2:-2].strip()
        # Replace any inner unescaped dollars
        inner = re.sub(r"(?<!\\)\$", "", inner)
        return rf"\({inner}\)"

    # If wrapped in \[ ... \], convert to inline \( ... \)
    if s.startswith(r"\[") and s.endswith(r"\]"):
        inner = s[2:-2].strip()
        inner = re.sub(r"(?<!\\)\$", "", inner)
        return rf"\({inner}\)"

    # If wrapped in raw $, strip them
    if s.startswith("$") and s.endswith("$"):
        inner = s.strip("$").strip()
        inner = re.sub(r"(?<!\\)\$", "", inner)
        return rf"\({inner}\)"

    # Strip any stray unescaped dollars
    cleaned = re.sub(r"(?<!\\)\$", "", s)
    return rf"\({cleaned}\)"


def parse_set_elements(text: str) -> list[str]:
    """
    Splits set elements separated by commas or semicolons outside nested braces/parens.
    e.g. '{1, 2, \\sqrt{3}}' -> ['1', '2', '\\sqrt{3}']
    """
    s = strip_latex_wrappers(text)
    # Remove outer braces if present
    if (s.startswith("{") and s.endswith("}")) or (s.startswith(r"\{") and s.endswith(r"\}")):
        if s.startswith(r"\{"):
            s = s[2:-2].strip()
        else:
            s = s[1:-1].strip()

    if not s:
        return []

    elements: list[str] = []
    current: list[str] = []
    brace_depth = 0
    paren_depth = 0
    bracket_depth = 0

    for ch in s:
        if ch in ("{", "\\{"):
            brace_depth += 1
            current.append(ch)
        elif ch in ("}", "\\}"):
            brace_depth = max(0, brace_depth - 1)
            current.append(ch)
        elif ch == "(":
            paren_depth += 1
            current.append(ch)
        elif ch == ")":
            paren_depth = max(0, paren_depth - 1)
            current.append(ch)
        elif ch == "[":
            bracket_depth += 1
            current.append(ch)
        elif ch == "]":
            bracket_depth = max(0, bracket_depth - 1)
            current.append(ch)
        elif ch in (",", ";") and brace_depth == 0 and paren_depth == 0 and bracket_depth == 0:
            elem = "".join(current).strip()
            if elem:
                elements.append(elem)
            current = []
        else:
            current.append(ch)

    tail = "".join(current).strip()
    if tail:
        elements.append(tail)

    return elements


def parse_interval_tokens(text: str) -> list[tuple[str, str, bool, bool]]:
    """
    Parses union of intervals, e.g.:
    '(-\\infty; 0) \\cup (2; +\\infty)' ->
    [('-\\infty', '0', True, True), ('2', '+\\infty', True, True)]
    Returns list of (left_endpoint, right_endpoint, left_open, right_open).
    """
    s = strip_latex_wrappers(text)
    if not s:
        return []

    # Handle R or \mathbb{R}
    if s in (r"\mathbb{R}", "R", r"\R"):
        return [(r"-\infty", r"+\infty", True, True)]

    # Handle R \ {a} or \mathbb{R} \setminus {a}
    r_diff_m = re.match(
        r"^(?:\\mathbb\{R\}|R)\s*(?:\\setminus|\\|/)\s*(?:\\\{|\{)\s*([^}]+)\s*(?:\\\}|\})$",
        s,
    )
    if r_diff_m:
        point = r_diff_m.group(1).strip().rstrip("\\").strip()
        return [
            (r"-\infty", point, True, True),
            (point, r"+\infty", True, True),
        ]

    # Split by union operators \cup, \bigcup, or standalone U
    parts = re.split(r"\\cup\b|\\bigcup\b|\bU\b|\\vee\b", s)
    intervals: list[tuple[str, str, bool, bool]] = []

    for part in parts:
        p = part.strip()
        if not p:
            continue
        m = re.match(r"^([\(\[])\s*([^;,]+)\s*[;,]\s*([^;,]+)\s*([\)\]])$", p)
        if m:
            left_bracket, l_str, r_str, right_bracket = m.groups()
            left_open = left_bracket == "("
            right_open = right_bracket == ")"
            intervals.append((l_str.strip(), r_str.strip(), left_open, right_open))

    return intervals
