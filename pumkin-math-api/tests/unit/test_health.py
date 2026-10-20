"""
Unit Tests for /health Endpoint
"""

import pytest


@pytest.mark.unit
def test_health_check_success(client):
    """
    Test GET /health returns 200 and accurate runtime version metadata.
    """
    response = client.get("/health")
    assert response.status_code == 200

    data = response.json()
    assert data["status"] == "healthy"
    assert data["service_version"] == "0.1.0"
    assert isinstance(data["sympy_version"], str) and len(data["sympy_version"]) > 0
    assert isinstance(data["python_version"], str) and len(data["python_version"]) > 0


@pytest.mark.unit
def test_health_check_no_auth_required(client):
    """
    Test GET /health does not require X-Pumkin-API-Key header.
    """
    response = client.get("/health", headers={})
    assert response.status_code == 200
