"""
Unit Tests for BaseResponseEnvelope Model Validators
Verifies status consistency rules:
- verified requires non-None result payload and confidence info.
- error requires error object and result must be None.
- unsupported requires unsupported_reason.
"""

import pytest
from pydantic import ValidationError

from app.schemas.common import (
    BaseResponseEnvelope,
    ConfidenceInfo,
    ConfidenceLevel,
    ConfidenceMethod,
    ErrorDetail,
    StatusEnum,
    UnsupportedReasonEnum,
)


@pytest.fixture
def base_confidence():
    return ConfidenceInfo(
        level=ConfidenceLevel.HIGH,
        method=ConfidenceMethod.SYMBOLIC,
        score=0.95,
    )


@pytest.mark.unit
def test_envelope_verified_valid(base_confidence):
    """Verified status with valid result and confidence must succeed."""
    env = BaseResponseEnvelope[dict](
        status=StatusEnum.VERIFIED,
        confidence=base_confidence,
        result={"answer": "x = 2"},
    )
    assert env.status == StatusEnum.VERIFIED
    assert env.result == {"answer": "x = 2"}


@pytest.mark.unit
def test_envelope_verified_missing_result_raises(base_confidence):
    """Verified status without result must fail validation."""
    with pytest.raises(ValidationError) as exc_info:
        BaseResponseEnvelope[dict](
            status=StatusEnum.VERIFIED,
            confidence=base_confidence,
            result=None,
        )
    msg = "Envelope with status 'verified' must have a non-None result payload"
    assert msg in str(exc_info.value)


@pytest.mark.unit
def test_envelope_error_valid(base_confidence):
    """Error status with error object and result=None must succeed."""
    env = BaseResponseEnvelope[dict](
        status=StatusEnum.ERROR,
        confidence=base_confidence,
        result=None,
        error=ErrorDetail(code="TIMEOUT", message_vi="Hết thời gian tính toán"),
    )
    assert env.status == StatusEnum.ERROR
    assert env.error.code == "TIMEOUT"
    assert env.result is None


@pytest.mark.unit
def test_envelope_error_missing_error_detail_raises(base_confidence):
    """Error status without error detail must fail validation."""
    with pytest.raises(ValidationError) as exc_info:
        BaseResponseEnvelope[dict](
            status=StatusEnum.ERROR,
            confidence=base_confidence,
            result=None,
            error=None,
        )
    assert "Envelope with status 'error' must provide an error object" in str(exc_info.value)


@pytest.mark.unit
def test_envelope_error_with_non_none_result_raises(base_confidence):
    """Error status with non-None result must fail validation."""
    with pytest.raises(ValidationError) as exc_info:
        BaseResponseEnvelope[dict](
            status=StatusEnum.ERROR,
            confidence=base_confidence,
            result={"leaked_data": 123},
            error=ErrorDetail(code="INTERNAL_ERROR", message_vi="Lỗi hệ thống"),
        )
    assert "Envelope with status 'error' must have result=None" in str(exc_info.value)


@pytest.mark.unit
def test_envelope_unsupported_valid(base_confidence):
    """Unsupported status with unsupported_reason must succeed."""
    env = BaseResponseEnvelope[dict](
        status=StatusEnum.UNSUPPORTED,
        confidence=base_confidence,
        unsupported_reason=UnsupportedReasonEnum.COMPLEX_NUMBERS,
        result=None,
    )
    assert env.status == StatusEnum.UNSUPPORTED
    assert env.unsupported_reason == UnsupportedReasonEnum.COMPLEX_NUMBERS


@pytest.mark.unit
def test_envelope_unsupported_missing_reason_raises(base_confidence):
    """Unsupported status without unsupported_reason must fail validation."""
    with pytest.raises(ValidationError) as exc_info:
        BaseResponseEnvelope[dict](
            status=StatusEnum.UNSUPPORTED,
            confidence=base_confidence,
            unsupported_reason=None,
            result=None,
        )
    msg = "Envelope with status 'unsupported' must provide an unsupported_reason"
    assert msg in str(exc_info.value)
