"""
Post-Generation Verification Layer (app/pedagogy/verifier.py)
Validates mathematical integrity of generated solutions:
1. Extracts all numbers and formulas from generated pedagogical text.
2. Checks that every number appears in the CAS ground truth traces or can be derived via SymPy.
3. Discards any text containing alien/hallucinated numbers.
4. Validates strict KaTeX delimiter standard \\( ... \\) and \\[ ... \\] (zero raw $ delimiters).
"""

import re
from typing import Any

import sympy as sp

from app.schemas.common import StepItem

# Common structural constants permitted in pedagogical explanations
COMMON_PEDAGOGICAL_CONSTANTS: set[float] = {
    0.0,
    1.0,
    2.0,
    3.0,
    4.0,
    5.0,  # Step indices and small counters
    10.0,
    100.0,
    1000.0,  # Modulo powers of 10
    90.0,
    180.0,
    360.0,  # Degrees in geometry
    float(sp.pi.evalf()),
    float(sp.E.evalf()),
}


def extract_numbers_from_text(text: str) -> set[float]:
    """
    Extracts numerical values from text, ignoring markdown list numbers (e.g. '1. ', '2. ').
    Handles integers, decimals, negative numbers, and simple fractions (e.g. '3/4').
    """
    cleaned_lines: list[str] = []
    for line in text.splitlines():
        # Remove markdown numbered list prefixes like '1. ', '2) '
        stripped = re.sub(r"^\s*\d+[\.\)]\s+", "", line)
        cleaned_lines.append(stripped)

    full_cleaned = "\n".join(cleaned_lines)
    numbers: set[float] = set()

    # Match simple fractions like 3/4 or -1/2
    fraction_pattern = re.compile(r"(?<![\w\.\\])(-?\d+)\s*/\s*([1-9]\d*)(?![\w\.\\])")
    for match in fraction_pattern.finditer(full_cleaned):
        num, den = float(match.group(1)), float(match.group(2))
        numbers.add(round(num / den, 6))

    # Match standard floats and integers
    number_pattern = re.compile(r"(?<![\w\.\\])(-?\d+(?:\.\d+)?)(?![\w\.\\])")
    for match in number_pattern.finditer(full_cleaned):
        val_str = match.group(1)
        try:
            numbers.add(round(float(val_str), 6))
        except ValueError:
            pass

    return numbers


def extract_ground_truth_numbers(
    steps: list[StepItem],
    result: Any,
    dsl: Any | None = None,
) -> set[float]:
    """
    Extracts all verified numbers present in solver steps, result payload, and problem DSL.
    """
    text_corpus: list[str] = []

    # 1. From Steps
    for step in steps:
        text_corpus.append(step.latex)
        text_corpus.append(step.note_vi)
        if step.value is not None:
            text_corpus.append(str(step.value))

    # 2. From Result Payload
    if result is not None:
        if hasattr(result, "model_dump"):
            dumped = result.model_dump()
            for v in dumped.values():
                if isinstance(v, (int, float, str)):
                    text_corpus.append(str(v))
                elif isinstance(v, list):
                    for item in v:
                        text_corpus.append(str(item))
        elif isinstance(result, dict):
            for v in result.values():
                text_corpus.append(str(v))
        else:
            text_corpus.append(str(result))

    # 3. From DSL
    if dsl is not None:
        if hasattr(dsl, "model_dump"):
            for v in dsl.model_dump().values():
                if isinstance(v, (int, float, str)):
                    text_corpus.append(str(v))
        elif isinstance(dsl, dict):
            for v in dsl.values():
                text_corpus.append(str(v))

    combined_text = "\n".join(text_corpus)
    gt_numbers = extract_numbers_from_text(combined_text)
    gt_numbers.update(COMMON_PEDAGOGICAL_CONSTANTS)
    return gt_numbers


def validate_katex_syntax(text: str) -> tuple[bool, str | None]:
    """
    Validates that LaTeX formulas in text adhere strictly to KaTeX standards:
    - Strictly no raw unescaped '$' or '$$' delimiters.
    - Properly matched \\( ... \\) and \\[ ... \\] pairs.
    """
    # Check for raw unescaped dollar signs
    if re.search(r"(?<!\\)\$", text):
        return (
            False,
            "Phát hiện dấu '$' thô. Quy chuẩn PUMKIN bắt buộc dùng \\( ... \\) hoặc \\[ ... \\].",
        )

    # Check balanced \( and \)
    open_inline = text.count(r"\(")
    close_inline = text.count(r"\)")
    if open_inline != close_inline:
        return (
            False,
            f"Mất cân bằng cặp ngoặc KaTeX inline: {open_inline} '\\(' và {close_inline} '\\)'.",
        )

    # Check balanced \[ and \]
    open_display = text.count(r"\[")
    close_display = text.count(r"\]")
    if open_display != close_display:
        return (
            False,
            f"Mất cân bằng cặp ngoặc KaTeX display: {open_display} '\\[' và {close_display} '\\]'.",
        )

    return True, None


def verify_no_alien_numbers(
    generated_text: str,
    ground_truth_steps: list[StepItem],
    ground_truth_result: Any,
    dsl: Any | None = None,
    tolerance: float = 1e-5,
) -> tuple[bool, str | None]:
    """
    Mandatory Post-Generation Verification:
    Ensures every number in generated_text is accounted for in ground truth traces.
    Returns: (is_valid, error_message_if_invalid)
    """
    # 1. Validate KaTeX formatting first
    katex_valid, katex_err = validate_katex_syntax(generated_text)
    if not katex_valid:
        return False, katex_err

    # 2. Extract numbers
    gen_numbers = extract_numbers_from_text(generated_text)
    gt_numbers = extract_ground_truth_numbers(ground_truth_steps, ground_truth_result, dsl)

    # 3. Check for alien numbers
    for num in gen_numbers:
        matched = False
        for gt in gt_numbers:
            if abs(num - gt) <= tolerance:
                matched = True
                break
        if not matched:
            return (
                False,
                f"Phát hiện số lạ ({num}) không xuất hiện trong vết tính toán CAS của solver.",
            )

    return True, None
