"""
Adversarial Security Tests for Authentication
Ensures API key parsing is hardened against injection, malformed inputs, and buffer overruns.
"""

import pytest


@pytest.mark.adversarial
@pytest.mark.parametrize(
    "malformed_key",
    [
        "' OR '1'='1",
        "'; DROP TABLE users; --",
        "<script>alert('xss')</script>",
        "Bearer ../../../../etc/passwd",
        "pumkin\x00key_with_null_byte",
        "\n\r\t",
        "A" * 10000,  # Oversized buffer stress test
    ],
)
def test_auth_rejects_adversarial_header_payloads(client, malformed_key):
    """
    Every malformed or adversarial key must return 401 without crashing or leaking server details.
    """
    payload = {"question_text": "Tìm cực trị của hàm số"}
    response = client.post("/v1/solve", json=payload, headers={"X-Pumkin-API-Key": malformed_key})
    assert response.status_code == 401
    data = response.json()
    assert "detail" in data
    assert data["detail"]["code"] in ("INVALID_API_KEY", "MISSING_API_KEY")
