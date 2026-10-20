"""
Golden Contract Tests
Verifies that all valid golden JSON examples pass Pydantic schema validation,
and all invalid golden JSON examples are rejected with descriptive error messages
and exact Pydantic error types.
"""

import json
from pathlib import Path

import pytest
from pydantic import ValidationError

from app.schemas.check import CheckRequest
from app.schemas.generate import GenerateRequest
from app.schemas.solve import SolveRequest

GOLDEN_DIR = Path(__file__).parent


@pytest.mark.golden
def test_solve_valid_golden():
    """Verify solve_valid.json passes schema validation."""
    path = GOLDEN_DIR / "solve_valid.json"
    with open(path, encoding="utf-8") as f:
        data = json.load(f)

    req = SolveRequest.model_validate(data)
    assert req.question_text.startswith("Tìm các khoảng đồng biến")
    assert req.question_id == "q_test_monotonicity_01"
    assert req.step_index == 1


@pytest.mark.golden
def test_solve_invalid_golden():
    """Verify solve_invalid.json entries are rejected with expected error and type."""
    path = GOLDEN_DIR / "solve_invalid.json"
    with open(path, encoding="utf-8") as f:
        cases = json.load(f)

    for case in cases:
        payload = case["payload"]
        expected_error = case["expected_error"]
        expected_type = case["expected_error_type"]
        with pytest.raises(ValidationError) as exc_info:
            SolveRequest.model_validate(payload)
        assert expected_error in str(exc_info.value), f"Failed on case: {case['description']}"
        error_types = [e["type"] for e in exc_info.value.errors()]
        msg = f"Expected error '{expected_type}' not in {error_types} for: {case['description']}"
        assert expected_type in error_types, msg


@pytest.mark.golden
def test_check_valid_golden():
    """Verify check_valid.json passes schema validation."""
    path = GOLDEN_DIR / "check_valid.json"
    with open(path, encoding="utf-8") as f:
        data = json.load(f)

    req = CheckRequest.model_validate(data)
    assert req.canonical_answer == "x = 2"
    assert req.student_answer == "2"
    assert req.answer_type == "number"


@pytest.mark.golden
def test_check_invalid_golden():
    """Verify check_invalid.json entries are rejected with expected error and type."""
    path = GOLDEN_DIR / "check_invalid.json"
    with open(path, encoding="utf-8") as f:
        cases = json.load(f)

    for case in cases:
        payload = case["payload"]
        expected_error = case["expected_error"]
        expected_type = case["expected_error_type"]
        with pytest.raises(ValidationError) as exc_info:
            CheckRequest.model_validate(payload)
        assert expected_error in str(exc_info.value), f"Failed on case: {case['description']}"
        error_types = [e["type"] for e in exc_info.value.errors()]
        msg = f"Expected error '{expected_type}' not in {error_types} for: {case['description']}"
        assert expected_type in error_types, msg


@pytest.mark.golden
def test_generate_valid_golden():
    """Verify generate_valid.json passes schema validation."""
    path = GOLDEN_DIR / "generate_valid.json"
    with open(path, encoding="utf-8") as f:
        data = json.load(f)

    req = GenerateRequest.model_validate(data)
    assert req.category == "ham_so_cuc_tri_cho_truoc"
    assert req.count == 5
    assert req.difficulty == "M2"


@pytest.mark.golden
def test_generate_invalid_golden():
    """Verify generate_invalid.json entries are rejected with expected error and type."""
    path = GOLDEN_DIR / "generate_invalid.json"
    with open(path, encoding="utf-8") as f:
        cases = json.load(f)

    for case in cases:
        payload = case["payload"]
        expected_error = case["expected_error"]
        expected_type = case["expected_error_type"]
        with pytest.raises(ValidationError) as exc_info:
            GenerateRequest.model_validate(payload)
        assert expected_error in str(exc_info.value), f"Failed on case: {case['description']}"
        error_types = [e["type"] for e in exc_info.value.errors()]
        msg = f"Expected error '{expected_type}' not in {error_types} for: {case['description']}"
        assert expected_type in error_types, msg
