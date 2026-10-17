"""
Unit Tests for MisconceptionTrapEnum Validation
Enforces:
1. DistractorItem rejects misconception_id values not in MisconceptionTrapEnum with 'enum'.
2. CheckResultPayload rejects invalid detected_misconception_id with 'enum'.
"""

import pytest
from pydantic import ValidationError

from app.schemas.check import CheckResultPayload, CheckVerdictEnum
from app.schemas.generate import DistractorItem


@pytest.mark.unit
def test_distractor_item_rejects_invalid_misconception_id():
    """DistractorItem must reject invalid misconception_id with exact error type 'enum'."""
    with pytest.raises(ValidationError) as exc_info:
        DistractorItem(
            option_index=1,
            latex="\\(x = 0\\)",
            misconception_id="FREEFORM_UNREGISTERED_TRAP",
            explanation_vi="Bẫy không tồn tại trong danh mục",
        )
    errors = exc_info.value.errors()
    assert any(e["type"] == "enum" and "misconception_id" in e["loc"] for e in errors), (
        f"Expected enum error on misconception_id, got: {errors}"
    )


@pytest.mark.unit
def test_check_result_rejects_invalid_detected_misconception_id():
    """CheckResultPayload must reject invalid detected_misconception_id with error type 'enum'."""
    with pytest.raises(ValidationError) as exc_info:
        CheckResultPayload(
            verdict=CheckVerdictEnum.INCORRECT,
            is_correct=False,
            canonical_answer="x = 2",
            cas_answer=None,
            conflict=False,
            feedback_vi="Sai do nhầm dấu",
            detected_misconception_id="UNKNOWN_CUSTOM_TRAP_STRING",
            canonical_latex="\\(x = 2\\)",
            student_latex="\\(x = -2\\)",
        )
    errors = exc_info.value.errors()
    assert any(e["type"] == "enum" and "detected_misconception_id" in e["loc"] for e in errors), (
        f"Expected enum error on detected_misconception_id, got: {errors}"
    )
