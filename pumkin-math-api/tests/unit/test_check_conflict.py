"""
Unit Tests for CAS Conflict Invariants on CheckResultPayload and CheckResponse
Enforces:
1. When conflict=True, verdict must be CheckVerdictEnum.CANNOT_DETERMINE.
2. When CheckResultPayload has conflict=True,
   CheckResponse envelope status must be StatusEnum.NEEDS_REVIEW.
"""

import pytest
from pydantic import ValidationError

from app.schemas.check import CheckResponse, CheckResultPayload, CheckVerdictEnum
from app.schemas.common import (
    ConfidenceInfo,
    ConfidenceLevel,
    ConfidenceMethod,
    StatusEnum,
)


@pytest.fixture
def base_confidence():
    return ConfidenceInfo(
        level=ConfidenceLevel.MEDIUM,
        method=ConfidenceMethod.SYMBOLIC,
        score=0.8,
    )


@pytest.mark.unit
def test_conflict_true_with_invalid_verdict_raises():
    """When conflict=True, any verdict other than cannot_determine must raise ValidationError."""
    with pytest.raises(ValidationError) as exc_info:
        CheckResultPayload(
            verdict=CheckVerdictEnum.CORRECT,
            is_correct=True,
            canonical_answer="x = 2",
            cas_answer="x = -2",
            conflict=True,
            feedback_vi="Mâu thuẫn nghiệm CAS",
            canonical_latex="\\(x = 2\\)",
            student_latex="\\(x = 2\\)",
        )
    msg = (
        "When conflict is True (CAS disagrees with canonical answer), "
        "verdict must be 'cannot_determine'"
    )
    assert msg in str(exc_info.value)


@pytest.mark.unit
def test_conflict_true_with_cannot_determine_succeeds():
    """When conflict=True and verdict=cannot_determine, validation must succeed."""
    payload = CheckResultPayload(
        verdict=CheckVerdictEnum.CANNOT_DETERMINE,
        is_correct=None,
        canonical_answer="x = 2",
        cas_answer="x = -2",
        conflict=True,
        feedback_vi="Phát hiện mâu thuẫn CAS với đáp án ngân hàng, không trừ điểm",
        canonical_latex="\\(x = 2\\)",
        student_latex="\\(x = 2\\)",
    )
    assert payload.conflict is True
    assert payload.verdict == CheckVerdictEnum.CANNOT_DETERMINE


@pytest.mark.unit
def test_conflict_true_with_non_needs_review_status_raises(base_confidence):
    """When conflict=True, CheckResponse status must be needs_review."""
    result_payload = CheckResultPayload(
        verdict=CheckVerdictEnum.CANNOT_DETERMINE,
        is_correct=None,
        canonical_answer="x = 2",
        cas_answer="x = -2",
        conflict=True,
        feedback_vi="Phát hiện mâu thuẫn CAS với đáp án ngân hàng",
        canonical_latex="\\(x = 2\\)",
        student_latex="\\(x = 2\\)",
    )
    with pytest.raises(ValidationError) as exc_info:
        CheckResponse(
            status=StatusEnum.VERIFIED,  # Invalid status for conflict=True
            confidence=base_confidence,
            result=result_payload,
        )
    msg = "When CheckResultPayload has conflict=True, envelope status must be 'needs_review'"
    assert msg in str(exc_info.value)


@pytest.mark.unit
def test_conflict_true_with_needs_review_status_succeeds(base_confidence):
    """When conflict=True and status=needs_review, CheckResponse validation must succeed."""
    result_payload = CheckResultPayload(
        verdict=CheckVerdictEnum.CANNOT_DETERMINE,
        is_correct=None,
        canonical_answer="x = 2",
        cas_answer="x = -2",
        conflict=True,
        feedback_vi="Phát hiện mâu thuẫn CAS, giữ nguyên điểm",
        canonical_latex="\\(x = 2\\)",
        student_latex="\\(x = 2\\)",
    )
    response = CheckResponse(
        status=StatusEnum.NEEDS_REVIEW,
        confidence=base_confidence,
        result=result_payload,
    )
    assert response.status == StatusEnum.NEEDS_REVIEW
    assert response.result.conflict is True
