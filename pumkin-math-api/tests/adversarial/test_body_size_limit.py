import pytest

from app.schemas.common import BaseResponseEnvelope, StatusEnum


@pytest.mark.adversarial
def test_request_body_exceeding_1mb_rejected_with_413(auth_client):
    """
    Submitting an oversized payload (> 1 MB) must trigger HTTP 413 Content Too Large
    and return a standardized BaseResponseEnvelope.
    """
    oversized_bytes = b" " * (1024 * 1024 + 1024)
    response = auth_client.post(
        "/v1/solve",
        content=oversized_bytes,
        headers={"Content-Type": "application/json"},
    )
    assert response.status_code == 413
    data = response.json()

    # Verify standard envelope structure
    envelope = BaseResponseEnvelope[None].model_validate(data)
    assert envelope.status == StatusEnum.ERROR
    assert envelope.error is not None
    assert envelope.error.code == "PAYLOAD_TOO_LARGE"
    assert envelope.error.details["max_allowed_bytes"] == 1024 * 1024


@pytest.mark.adversarial
def test_request_body_within_1mb_not_rejected_with_413(auth_client):
    """
    Submitting a payload within the 1 MB limit must proceed past the middleware
    (and return 501 for uninstalled route, NOT 413).
    """
    normal_payload = {"question_text": "Tìm cực trị của hàm số \\(y = x^2\\)"}
    response = auth_client.post("/v1/solve", json=normal_payload)
    assert response.status_code == 501


@pytest.mark.adversarial
def test_post_missing_content_length_rejected_with_411(auth_client):
    """
    A POST request lacking both Content-Length and Transfer-Encoding: chunked
    must be rejected with HTTP 411 Length Required and a valid envelope.
    """
    # TestClient in httpx usually calculates Content-Length if content/json is passed.
    # We build an ASGI request with raw headers without Content-Length
    headers = {
        "X-Pumkin-API-Key": auth_client.headers["X-Pumkin-API-Key"],
        "Content-Type": "application/json",
    }
    # Passing an empty generator without Content-Length triggers chunked or missing length
    # To test explicitly missing content-length, we can use transport or client build_request
    req = auth_client.build_request("POST", "/v1/solve", headers=headers)
    req.headers.pop("content-length", None)
    response = auth_client.send(req)

    assert response.status_code == 411
    data = response.json()
    envelope = BaseResponseEnvelope[None].model_validate(data)
    assert envelope.status == StatusEnum.ERROR
    assert envelope.error is not None
    assert envelope.error.code == "LENGTH_REQUIRED"


@pytest.mark.adversarial
def test_chunked_transfer_exceeding_1mb_rejected_with_413(auth_client):
    """
    Streaming chunked payload exceeding 1 MB must be aborted with HTTP 413
    and a valid envelope.
    """
    def chunk_generator():
        # Yield 11 chunks of 100 KB = 1.1 MB > 1 MB
        for _ in range(11):
            yield b"a" * (100 * 1024)

    response = auth_client.post(
        "/v1/solve",
        content=chunk_generator(),
        headers={"Transfer-Encoding": "chunked", "Content-Type": "application/json"},
    )
    assert response.status_code == 413
    data = response.json()
    envelope = BaseResponseEnvelope[None].model_validate(data)
    assert envelope.status == StatusEnum.ERROR
    assert envelope.error is not None
    assert envelope.error.code == "PAYLOAD_TOO_LARGE"


@pytest.mark.adversarial
def test_chunked_transfer_within_1mb_succeeds(auth_client):
    """
    Streaming chunked payload within 1 MB must pass middleware and proceed downstream.
    """
    valid_bytes = b'{"question_text": "Tim cuc tri cua ham so y = x^2"}'
    mid = len(valid_bytes) // 2

    def small_chunks():
        yield valid_bytes[:mid]
        yield valid_bytes[mid:]

    response = auth_client.post(
        "/v1/solve",
        content=small_chunks(),
        headers={"Transfer-Encoding": "chunked", "Content-Type": "application/json"},
    )
    # Passed middleware, reached solve_endpoint which returns 501
    assert response.status_code == 501
