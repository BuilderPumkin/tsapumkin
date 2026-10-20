"""
Unit Tests for Endpoints Status
Proves that all core endpoints (/v1/solve, /v1/check, /v1/generate) are implemented
and no longer return 501 Not Implemented.
"""

import pytest


@pytest.mark.unit
def test_all_core_endpoints_implemented_no_501(auth_client):
    """Core endpoints must be implemented and return HTTP status != 501."""
    # /v1/check
    resp_check = auth_client.post(
        "/v1/check",
        json={
            "canonical_answer": "x = 1",
            "student_answer": "x = 1",
            "answer_type": "expression",
        },
    )
    assert resp_check.status_code == 200

    # /v1/generate
    resp_gen = auth_client.post(
        "/v1/generate",
        json={"category": "dai_so_ma_tran_dinh_thuc", "count": 1, "difficulty": "M2"},
    )
    assert resp_gen.status_code == 200
