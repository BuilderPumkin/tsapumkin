"""
Authentication Layer for Pumkin Math API
Verifies X-Pumkin-API-Key header using constant-time HMAC comparison
against a list of pre-configured SHA-256 hashes from environment variables.
"""

import hashlib
import hmac
import os

from fastapi import Header, HTTPException, status


def get_configured_key_hashes() -> set[str]:
    """
    Retrieves the set of valid SHA-256 hashes configured in the environment.
    Variable format: PUMKIN_API_KEY_HASHES=hash1,hash2,...
    """
    raw_hashes = os.environ.get("PUMKIN_API_KEY_HASHES", "")
    if not raw_hashes:
        return set()
    return {h.strip().lower() for h in raw_hashes.split(",") if h.strip()}


async def verify_api_key(
    x_pumkin_api_key: str | None = Header(None, alias="X-Pumkin-API-Key"),
) -> str:
    """
    FastAPI security dependency for protecting API endpoints.

    Raises:
        HTTPException(401): When the header is missing, empty, or fails hash verification.
    """
    if not x_pumkin_api_key or not x_pumkin_api_key.strip():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "status": "error",
                "code": "MISSING_API_KEY",
                "message": "Yêu cầu cung cấp khóa API trong header 'X-Pumkin-API-Key'.",
            },
        )

    configured_hashes = get_configured_key_hashes()
    if not configured_hashes:
        # If no keys are configured on the server, deny access safely
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "status": "error",
                "code": "AUTH_MISCONFIGURED",
                "message": "Máy chủ chưa cấu hình danh sách khóa truy cập hợp lệ.",
            },
        )

    # Compute SHA-256 of the provided key
    provided_hash = hashlib.sha256(x_pumkin_api_key.strip().encode("utf-8")).hexdigest().lower()

    # Constant-time comparison against each configured hash to prevent timing attacks
    is_valid = any(
        hmac.compare_digest(provided_hash, target_hash) for target_hash in configured_hashes
    )

    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "status": "error",
                "code": "INVALID_API_KEY",
                "message": "Khóa API không hợp lệ hoặc đã bị thu hồi.",
            },
        )

    return x_pumkin_api_key
