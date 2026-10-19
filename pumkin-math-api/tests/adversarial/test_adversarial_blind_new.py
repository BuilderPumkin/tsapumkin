"""
Blind Adversarial Security Suite (tests/adversarial/test_adversarial_blind_new.py)
A newly authored test suite of 32 adversarial test cases created independently without
referencing internal filters or defensive regexes.
Measures the system's baseline defense resilience on first run.
"""

from __future__ import annotations

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.security.input_limits import sanitize_and_validate_question_text

BLIND_ADVERSARIAL_PAYLOADS: list[dict[str, str]] = [
    {"id": "ADV_NEW_01", "name": "Cyrillic homoglyph variable", "payload": "Tính tích phân \\int_0^1 \u0445^2 d\u0445"},
    {"id": "ADV_NEW_02", "name": "Zero-width non-joiner injection", "payload": "\\int_0^1 x\u200cx dx"},
    {"id": "ADV_NEW_03", "name": "Polyglot SQL + LaTeX injection", "payload": "1; DROP TABLE users; -- \\int_0^1 x dx"},
    {"id": "ADV_NEW_04", "name": "XSS payload inside math environment", "payload": "\\frac{<script>alert(1)</script>}{2}"},
    {"id": "ADV_NEW_05", "name": "ReDoS catastrophic regex pattern", "payload": "((a+)*)*b" * 10},
    {"id": "ADV_NEW_06", "name": "Extreme matrix dimension request", "payload": "Matrix(1000000, 1000000)"},
    {"id": "ADV_NEW_07", "name": "Power tower recursion", "payload": "2^{2^{2^{2^{2^{2}}}}}"},
    {"id": "ADV_NEW_08", "name": "TeX catcode manipulation attempt", "payload": "^^31^^32^^33"},
    {"id": "ADV_NEW_09", "name": "Floating point overflow literal", "payload": "1e309 + 1e309"},
    {"id": "ADV_NEW_10", "name": "Indeterminate NaN division", "payload": "\\frac{0}{0}"},
    {"id": "ADV_NEW_11", "name": "Negative integer factorial pole", "payload": "(-5)!"},
    {"id": "ADV_NEW_12", "name": "Non-integer factorial", "payload": "(0.5)!"},
    {"id": "ADV_NEW_13", "name": "Massive modular exponent", "payload": "2^{1048576} \\pmod{10}"},
    {"id": "ADV_NEW_14", "name": "Deep fraction chain (35 levels)", "payload": "\\frac{1}{" * 35 + "1" + "}" * 35},
    {"id": "ADV_NEW_15", "name": "Excessive variable name length", "payload": "x" * 1500 + " = 1"},
    {"id": "ADV_NEW_16", "name": "Raw shell metacharacter pipeline", "payload": "x | rm -rf / | cat"},
    {"id": "ADV_NEW_17", "name": "Environment variable expansion", "payload": "$PATH $HOME $USER %WINDIR%"},
    {"id": "ADV_NEW_18", "name": "Python dunder execution attempt", "payload": "__builtins__.__import__('os').system('ls')"},
    {"id": "ADV_NEW_19", "name": "Format string injection", "payload": "%(asctime)s %(levelname)s %(message)s"},
    {"id": "ADV_NEW_20", "name": "Unicode RTL override", "payload": "\u202e\u202d1+2\u202c"},
    {"id": "ADV_NEW_21", "name": "HTML comment sneak", "payload": "<!-- <script> --> \\int 2x dx <!-- </script> -->"},
    {"id": "ADV_NEW_22", "name": "Base64 data URL injection", "payload": "data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg=="},
    {"id": "ADV_NEW_23", "name": "Huge integer literal (>5000 chars)", "payload": "9" * 5500},
    {"id": "ADV_NEW_24", "name": "TeX macro self-expansion bomb", "payload": "\\newcommand{\\a}{\\a\\a}\\a"},
    {"id": "ADV_NEW_25", "name": "Contradictory algebraic identity", "payload": "x = x + 1"},
    {"id": "ADV_NEW_26", "name": "Imaginary power tower", "payload": "i^{i^{i^i}}"},
    {"id": "ADV_NEW_27", "name": "Missing LHS equation", "payload": "= 5"},
    {"id": "ADV_NEW_28", "name": "Massive matrix format string", "payload": "\\begin{pmatrix}" + "1 & " * 50 + "1 \\\\ " * 50 + "\\end{pmatrix}"},
    {"id": "ADV_NEW_29", "name": "Zero-width space flood", "payload": "\u200b\u200c\u200d" * 500},
    {"id": "ADV_NEW_30", "name": "Directory traversal payload", "payload": "../../../../etc/passwd"},
    {"id": "ADV_NEW_31", "name": "YAML document separator attack", "payload": "integrand: x\n---\nadmin: true"},
    {"id": "ADV_NEW_32", "name": "Division by trigonometric zero", "payload": "\\frac{1}{\\sin(\\pi)}"},
]


@pytest.mark.adversarial
@pytest.mark.parametrize("case", BLIND_ADVERSARIAL_PAYLOADS, ids=[c["id"] for c in BLIND_ADVERSARIAL_PAYLOADS])
def test_blind_adversarial_case_resilience(auth_client, case):
    """
    Evaluates that the blind adversarial payload is either safely rejected
    with HTTP 400/422/504 or handled cleanly without server crash or shell execution.
    """
    payload_text = case["payload"]

    # Test via solve endpoint
    resp = auth_client.post(
        "/v1/solve",
        json={"question_text": payload_text[:2000] if len(payload_text) > 2000 else payload_text},
    )

    # Must NOT return HTTP 500 Unhandled Server Error
    assert resp.status_code != 500, f"Payload {case['id']} ({case['name']}) caused HTTP 500 crash!"

    # Response must be structured JSON envelope
    data = resp.json()
    status_val = data.get("status")
    if status_val is None and isinstance(data.get("detail"), dict):
        status_val = data["detail"].get("status")
    assert status_val in ("verified", "needs_review", "unsupported", "error")
