"""
Adversarial Hygiene & Academic Governance Tests
Verifies adherence to GEMINI.md and system rules:
1. Zero occurrences of forbidden claim 'chính xác 100%' in codebase and API responses.
2. Zero unescaped raw '$' or '$$' in LaTeX formulas (must use \\( ... \\) or \\[ ... \\]).
"""

import json
import re
from pathlib import Path

import pytest

APP_DIR = Path(__file__).resolve().parent.parent.parent / "app"
TESTS_DIR = Path(__file__).resolve().parent.parent


@pytest.mark.adversarial
def test_no_forbidden_accuracy_claims_in_app():
    """Ensure 'chính xác 100%' never appears in app code, docstrings, or schemas."""
    pattern = re.compile(r"chính\s+xác\s+100\s*%", re.IGNORECASE)
    violations = []

    for py_file in APP_DIR.rglob("*.py"):
        content = py_file.read_text(encoding="utf-8")
        if pattern.search(content):
            violations.append(str(py_file.relative_to(APP_DIR)))

    assert not violations, f"Found forbidden 'chính xác 100%' claim in: {violations}"


@pytest.mark.adversarial
def test_no_forbidden_accuracy_claims_in_test_fixtures():
    """Ensure 'chính xác 100%' never appears in golden JSON fixtures or test files."""
    pattern = re.compile(r"chính\s+xác\s+100\s*%", re.IGNORECASE)
    violations = []

    for json_file in TESTS_DIR.rglob("*.json"):
        content = json_file.read_text(encoding="utf-8")
        if pattern.search(content):
            violations.append(str(json_file.relative_to(TESTS_DIR)))

    assert not violations, f"Found forbidden 'chính xác 100%' claim in test fixtures: {violations}"


@pytest.mark.adversarial
def test_no_raw_dollar_katex_delimiters():
    """
    Ensure all LaTeX formulas adhere to KaTeX \\( ... \\) and \\[ ... \\] standard.
    Raw unescaped '$' or '$$' delimiters are forbidden in API JSON fixtures and schemas.
    """
    # Regex matching unescaped dollar sign not preceded by backslash
    dollar_pattern = re.compile(r"(?<!\\)\$")
    violations = []

    # Check all test JSON fixtures
    for json_file in TESTS_DIR.rglob("*.json"):
        with open(json_file, encoding="utf-8") as f:
            data = json.load(f)

        def walk_json(obj, file_path):
            if isinstance(obj, str):
                if dollar_pattern.search(obj):
                    violations.append((str(file_path), obj))
            elif isinstance(obj, dict):
                for v in obj.values():
                    walk_json(v, file_path)
            elif isinstance(obj, list):
                for item in obj:
                    walk_json(item, file_path)

        walk_json(data, json_file.relative_to(TESTS_DIR))

    assert not violations, f"Found forbidden raw '$' KaTeX delimiters in: {violations}"


@pytest.mark.adversarial
def test_endpoint_responses_contain_no_prohibited_terms(auth_client):
    """
    Verify actual endpoint responses at runtime do not contain forbidden claims or raw dollars.
    """
    routes = [
        ("/v1/solve", {"question_text": "Tìm cực trị của \\(y = x^2\\)"}),
        (
            "/v1/check",
            {
                "canonical_answer": "x = 1",
                "student_answer": "1",
                "answer_type": "number",
            },
        ),
        (
            "/v1/generate",
            {"category": "ham_so_cuc_tri_cho_truoc", "count": 1, "difficulty": "M2"},
        ),
    ]

    for path, payload in routes:
        resp = auth_client.post(path, json=payload)
        text = resp.text
        assert "chính xác 100%" not in text.lower()
        assert "100% tất định" not in text.lower()
        assert "tất định 100%" not in text.lower()
        assert "100%" not in text
        # Ensure no raw unescaped dollar sign in response text
        assert not re.search(r"(?<!\\)\$", text), f"Raw dollar found in response from {path}"


@pytest.mark.adversarial
def test_no_100_percent_in_display_strings():
    """
    Ensure '100%' and '100% tất định' do not appear in user-facing display strings,
    descriptions, or error messages in app code.
    Allowed only in verified mathematical benchmark statistics or KPI tables.
    """
    pattern = re.compile(r"100\s*%", re.IGNORECASE)
    violations = []

    # Whitelist for permitted statistical files (e.g., benchmark tools outside app)
    # Inside app/, all strings must avoid claiming 100%
    for py_file in APP_DIR.rglob("*.py"):
        content = py_file.read_text(encoding="utf-8")
        for line_no, line in enumerate(content.splitlines(), start=1):
            if pattern.search(line):
                # Allow comments that explicitly forbid 100%
                lower_line = line.lower()
                if (
                    "cấm" in lower_line
                    or "không tuyên bố" in lower_line
                    or "nghiêm cấm" in lower_line
                ):
                    continue
                violations.append(f"{py_file.name}:{line_no}: {line.strip()}")

    assert not violations, f"Found unallowed '100%' in app display strings: {violations}"


@pytest.mark.adversarial
def test_no_forbidden_code_execution_functions_in_app():
    """
    Ensure eval(), exec(), sympify(), and parse_expr() are strictly absent
    from the production parsing and execution layer (app/).
    Only direct SymPy AST instantiation is permitted.
    """
    forbidden_calls = [
        re.compile(r"\beval\s*\("),
        re.compile(r"\bexec\s*\("),
        re.compile(r"\bsympify\s*\("),
        re.compile(r"\bparse_expr\s*\("),
    ]
    violations = []

    for py_file in APP_DIR.rglob("*.py"):
        content = py_file.read_text(encoding="utf-8")
        for line_no, line in enumerate(content.splitlines(), start=1):
            # Skip comments and docstrings
            stripped = line.strip()
            if stripped.startswith("#") or stripped.startswith("*"):
                continue
            for pattern in forbidden_calls:
                if pattern.search(line):
                    # Check if line is not within a string literal blacklist or comment
                    if "FORBIDDEN_PATTERNS" in line or "SECURITY_VIOLATION" in line:
                        continue
                    violations.append(f"{py_file.name}:{line_no}: {line.strip()}")

    assert not violations, f"Found forbidden execution function calls in app/: {violations}"
