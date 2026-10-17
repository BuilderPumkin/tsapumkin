"""
Adversarial Tests for HTTP Request Body Size Limit
Verifies that the application middleware enforces a maximum payload limit of 1 MB (1,048,576 bytes).
Any request exceeding this threshold must be rejected immediately with HTTP 413.
"""

import pytest


@pytest.mark.adversarial
def test_request_body_exceeding_1mb_rejected_with_413(auth_client):
    """
    Submitting an oversized payload (> 1 MB) must trigger HTTP 413 Payload Too Large.
    """
    # 1 MB + 1024 bytes payload
    oversized_bytes = b" " * (1024 * 1024 + 1024)
    response = auth_client.post(
        "/v1/solve",
        content=oversized_bytes,
        headers={"Content-Type": "application/json"},
    )
    assert response.status_code == 413
    data = response.json()
    assert data["code"] == "PAYLOAD_TOO_LARGE"
    assert data["max_allowed_bytes"] == 1024 * 1024


@pytest.mark.adversarial
def test_request_body_within_1mb_not_rejected_with_413(auth_client):
    """
    Submitting a payload within the 1 MB limit must proceed past the middleware
    (and return 501 for uninstalled route, NOT 413).
    """
    normal_payload = {"question_text": "Tìm cực trị của hàm số \\(y = x^2\\)"}
    response = auth_client.post("/v1/solve", json=normal_payload)
    assert response.status_code == 501
