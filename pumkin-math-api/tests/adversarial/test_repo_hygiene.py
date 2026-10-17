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
        # Ensure no raw unescaped dollar sign in response text
        assert not re.search(r"(?<!\\)\$", text), f"Raw dollar found in response from {path}"
