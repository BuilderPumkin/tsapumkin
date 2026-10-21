"""
Pytest Test Suite Configuration & Shared Fixtures
"""

import hashlib

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.security.rate_limiter import global_rate_limiter

TEST_RAW_KEY = "pumkin_test_secret_key_fixed_for_unit_tests_only"
TEST_KEY_HASH = hashlib.sha256(TEST_RAW_KEY.encode("utf-8")).hexdigest().lower()


@pytest.fixture(autouse=True)
def force_fake_llm_provider(monkeypatch):
    """
    Ensure all tests run with deterministic FakeLLMClient unless explicitly overridden.
    Guarantees zero accidental external network requests during test runs.
    """
    monkeypatch.setenv("LLM_PROVIDER", "fake")


@pytest.fixture
def client(monkeypatch):
    """
    TestClient configured with mock environment variable PUMKIN_API_KEY_HASHES.
    Clears in-memory rate limiter records to ensure complete test isolation.
    """
    monkeypatch.setenv("PUMKIN_API_KEY_HASHES", TEST_KEY_HASH)
    monkeypatch.setenv("PUMKIN_RATE_LIMIT_KEY_PER_MIN", "50000")
    monkeypatch.setenv("PUMKIN_RATE_LIMIT_IP_PER_MIN", "50000")
    global_rate_limiter._key_records.clear()
    global_rate_limiter._ip_records.clear()
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture
def valid_api_key():
    return TEST_RAW_KEY


@pytest.fixture
def valid_auth_headers(valid_api_key):
    return {"X-Pumkin-API-Key": valid_api_key}


@pytest.fixture
def auth_client(client, valid_auth_headers):
    """
    TestClient pre-authenticated with valid X-Pumkin-API-Key header.
    """
    client.headers.update(valid_auth_headers)
    return client
