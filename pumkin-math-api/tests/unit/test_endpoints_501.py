"""
Unit Tests for 501 Not Implemented Envelopes
Proves that the remaining scaffolded endpoint (/v1/generate) returns 501 status code
with a fully compliant BaseResponseEnvelope structure.
"""

import pytest

from app.schemas.common import BaseResponseEnvelope, StatusEnum


@pytest.mark.unit
def test_generate_returns_501_valid_envelope(auth_client):
    """POST /v1/generate must return HTTP 501 with a valid BaseResponseEnvelope."""
    payload = {
        "category": "ham_so_cuc_tri_cho_truoc",
        "count": 1,
        "difficulty": "M2",
    }
    response = auth_client.post("/v1/generate", json=payload)
    assert response.status_code == 501
    data = response.json()

    envelope = BaseResponseEnvelope.model_validate(data)
    assert envelope.status == StatusEnum.ERROR
    assert envelope.error is not None
    assert envelope.error.code == "NOT_IMPLEMENTED"
    assert envelope.result is None
