"""
Unit Tests for Authentication Layer and Endpoint Authorization
Verifies 401 on missing/invalid keys and 501 Not Implemented on valid keys.
"""

import pytest


@pytest.mark.unit
def test_solve_missing_api_key_returns_401(client):
    """
    Calling /v1/solve without X-Pumkin-API-Key must return 401 Unauthorized.
    """
    payload = {"question_text": "Tìm cực trị của hàm số y = x^3 - 3x"}
    response = client.post("/v1/solve", json=payload)
    assert response.status_code == 401
    data = response.json()
    assert data["detail"]["code"] == "MISSING_API_KEY"


@pytest.mark.unit
def test_solve_empty_api_key_returns_401(client):
    """
    Calling /v1/solve with whitespace/empty key must return 401 Unauthorized.
    """
    payload = {"question_text": "Tìm cực trị của hàm số y = x^3 - 3x"}
    response = client.post("/v1/solve", json=payload, headers={"X-Pumkin-API-Key": "   "})
    assert response.status_code == 401
    data = response.json()
    assert data["detail"]["code"] == "MISSING_API_KEY"


@pytest.mark.unit
def test_solve_invalid_api_key_returns_401(client):
    """
    Calling /v1/solve with an invalid key must return 401 Unauthorized.
    """
    payload = {"question_text": "Tìm cực trị của hàm số y = x^3 - 3x"}
    response = client.post(
        "/v1/solve", json=payload, headers={"X-Pumkin-API-Key": "invalid_unregistered_key"}
    )
    assert response.status_code == 401
    data = response.json()
    assert data["detail"]["code"] == "INVALID_API_KEY"


@pytest.mark.unit
def test_unconfigured_server_hashes_returns_401(client, monkeypatch):
    """
    When server environment has no PUMKIN_API_KEY_HASHES or MATH_API_KEY_HASHES configured, deny all requests safely.
    """
    monkeypatch.setenv("PUMKIN_API_KEY_HASHES", "")
    monkeypatch.setenv("MATH_API_KEY_HASHES", "")
    payload = {"question_text": "Tìm cực trị của hàm số y = x^3 - 3x"}
    response = client.post("/v1/solve", json=payload, headers={"X-Pumkin-API-Key": "any_key"})
    assert response.status_code == 401
    data = response.json()
    assert data["detail"]["code"] == "AUTH_MISCONFIGURED"


@pytest.mark.unit
def test_math_api_key_hashes_alias_supported(client, monkeypatch):
    """
    Verify that MATH_API_KEY_HASHES environment variable is accepted as valid auth alias.
    """
    import hashlib

    custom_key = "pumkin_staging_secret_key_12345"
    custom_hash = hashlib.sha256(custom_key.encode("utf-8")).hexdigest()

    monkeypatch.delenv("PUMKIN_API_KEY_HASHES", raising=False)
    monkeypatch.setenv("MATH_API_KEY_HASHES", custom_hash)

    payload = {"question_text": "Tìm cực trị của hàm số y = x^3 - 3x"}
    response = client.post("/v1/solve", json=payload, headers={"X-Pumkin-API-Key": custom_key})
    assert response.status_code == 200
    assert response.json()["status"] in ["verified", "needs_review"]


@pytest.mark.unit
def test_solve_valid_api_key_returns_200_verified(client, valid_auth_headers):
    """
    Calling /v1/solve with a valid key returns 200 OK with standard envelope.
    """
    payload = {"question_text": "Tìm cực trị của hàm số y = x^3 - 3x"}
    response = client.post("/v1/solve", json=payload, headers=valid_auth_headers)
    assert response.status_code == 200

    data = response.json()
    assert data["schema_version"] == "1.1.0"
    assert "trace_id" in data
    assert data["status"] in ["verified", "needs_review"]
    assert data["confidence"]["method"] == "consensus"
    assert data["result"] is not None


@pytest.mark.unit
def test_check_valid_api_key_returns_200_verified(client, valid_auth_headers):
    """
    Calling /v1/check with a valid key returns 200 OK with standard envelope.
    """
    payload = {
        "canonical_answer": "x = 1",
        "student_answer": "x = 1",
        "answer_type": "expression",
    }
    response = client.post("/v1/check", json=payload, headers=valid_auth_headers)
    assert response.status_code == 200

    data = response.json()
    assert data["schema_version"] == "1.1.0"
    assert "trace_id" in data
    assert data["status"] == "verified"
    assert data["result"]["is_correct"] is True
    assert data["result"]["verdict"] == "correct"


@pytest.mark.unit
def test_generate_valid_api_key_returns_200_verified(client, valid_auth_headers):
    """
    Calling /v1/generate with a valid key returns 200 OK with standard verified schema.
    """
    payload = {"category": "dai_so_ma_tran_dinh_thuc", "count": 1, "difficulty": "M2"}
    response = client.post("/v1/generate", json=payload, headers=valid_auth_headers)
    assert response.status_code == 200

    data = response.json()
    assert data["schema_version"] == "1.1.0"
    assert "trace_id" in data
    assert data["status"] == "verified"
    assert data["result"]["count"] == 1
    assert len(data["result"]["questions"]) == 1
