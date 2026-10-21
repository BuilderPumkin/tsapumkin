"""
Authentication & Key Management Layer (app/auth.py)
Verifies X-Pumkin-API-Key header using constant-time HMAC comparison
against configured SHA-256 hashes with dynamic rotation, revocation,
rejection audit logging, and rate limiting integration.
"""

from __future__ import annotations

import hashlib
import hmac
import json
import logging
import os
from pathlib import Path

from fastapi import Header, HTTPException, Request, status

from app.security.logger import log_security_event, mask_sensitive_value
from app.security.rate_limiter import global_rate_limiter

logger = logging.getLogger(__name__)


def _load_key_file_hashes() -> tuple[set[str], set[str]]:
    """
    Loads active and revoked hashes dynamically from a key file if PUMKIN_KEY_FILE is configured.
    Format can be JSON: {"active": ["..."], "revoked": ["..."]}
    or plain text (one hash per line; lines starting with # are comments, lines starting with ! are revoked).
    """
    key_file_path = os.environ.get("PUMKIN_KEY_FILE", "").strip()
    if not key_file_path:
        return set(), set()

    path = Path(key_file_path)
    if not path.is_file():
        logger.warning("Configured PUMKIN_KEY_FILE does not exist: %s", key_file_path)
        return set(), set()

    active: set[str] = set()
    revoked: set[str] = set()

    try:
        content = path.read_text(encoding="utf-8").strip()
        if content.startswith("{"):
            data = json.loads(content)
            for h in data.get("active", data.get("active_hashes", [])):
                if isinstance(h, str) and h.strip():
                    active.add(h.strip().lower())
            for h in data.get("revoked", data.get("revoked_hashes", [])):
                if isinstance(h, str) and h.strip():
                    revoked.add(h.strip().lower())
        else:
            for line in content.splitlines():
                line = line.strip()
                if not line or line.startswith("#"):
                    continue
                if line.startswith("!"):
                    revoked.add(line[1:].strip().lower())
                else:
                    active.add(line.lower())
    except Exception as e:
        logger.error("Failed to parse PUMKIN_KEY_FILE (%s): %s", key_file_path, e)

    return active, revoked


def get_configured_key_hashes() -> set[str]:
    """
    Retrieves the set of valid SHA-256 hashes configured in environment variables or key file.
    Variable format: MATH_API_KEY_HASHES=hash1,hash2,... or PUMKIN_API_KEY_HASHES=hash1,hash2,...
    """
    hashes: set[str] = set()
    raw_hashes = os.environ.get("MATH_API_KEY_HASHES") or os.environ.get(
        "PUMKIN_API_KEY_HASHES", ""
    )
    if raw_hashes:
        hashes.update(h.strip().lower() for h in raw_hashes.split(",") if h.strip())

    file_active, _ = _load_key_file_hashes()
    hashes.update(file_active)
    return hashes


def get_revoked_key_hashes() -> set[str]:
    """
    Retrieves the set of explicitly revoked SHA-256 hashes.
    Variable format: MATH_REVOKED_KEY_HASHES=hash1,hash2,... or PUMKIN_REVOKED_KEY_HASHES=hash1,hash2,...
    """
    revoked: set[str] = set()
    raw_revoked = os.environ.get("MATH_REVOKED_KEY_HASHES") or os.environ.get(
        "PUMKIN_REVOKED_KEY_HASHES", ""
    )
    if raw_revoked:
        revoked.update(h.strip().lower() for h in raw_revoked.split(",") if h.strip())

    _, file_revoked = _load_key_file_hashes()
    revoked.update(file_revoked)
    return revoked


async def verify_api_key(
    request: Request,
    x_pumkin_api_key: str | None = Header(None, alias="X-Pumkin-API-Key"),
) -> str:
    """
    FastAPI security dependency for protecting API endpoints with rate limiting and audit logging.

    Raises:
        HTTPException(401): When header is missing, empty, revoked, or fails hash verification.
        HTTPException(429): When call rate exceeds configured threshold.
    """
    client_ip = request.headers.get("x-forwarded-for") or (
        request.client.host if request.client else "unknown"
    )

    if not x_pumkin_api_key or not x_pumkin_api_key.strip():
        log_security_event(
            event_type="AUTH_REJECTED",
            client_ip=client_ip,
            details={"reason": "MISSING_API_KEY", "path": str(request.url.path)},
            level=logging.WARNING,
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "status": "error",
                "code": "MISSING_API_KEY",
                "message": "Yêu cầu cung cấp khóa API trong header 'X-Pumkin-API-Key'.",
            },
        )

    provided_raw = x_pumkin_api_key.strip()
    provided_hash = hashlib.sha256(provided_raw.encode("utf-8")).hexdigest().lower()

    # 1. Check if key is explicitly revoked
    revoked_hashes = get_revoked_key_hashes()
    is_revoked = any(hmac.compare_digest(provided_hash, rev_hash) for rev_hash in revoked_hashes)
    if is_revoked:
        log_security_event(
            event_type="AUTH_REJECTED",
            client_ip=client_ip,
            details={
                "reason": "REVOKED_API_KEY",
                "key_preview": mask_sensitive_value(provided_raw),
                "path": str(request.url.path),
            },
            level=logging.WARNING,
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "status": "error",
                "code": "REVOKED_API_KEY",
                "message": "Khóa API đã bị thu hồi bởi quản trị viên.",
            },
        )

    # 2. Check active configured keys
    configured_hashes = get_configured_key_hashes()
    if not configured_hashes:
        log_security_event(
            event_type="AUTH_REJECTED",
            client_ip=client_ip,
            details={"reason": "AUTH_MISCONFIGURED", "path": str(request.url.path)},
            level=logging.ERROR,
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "status": "error",
                "code": "AUTH_MISCONFIGURED",
                "message": "Máy chủ chưa cấu hình danh sách khóa truy cập hợp lệ.",
            },
        )

    # Constant-time comparison against each configured hash to prevent timing attacks
    is_valid = any(
        hmac.compare_digest(provided_hash, target_hash) for target_hash in configured_hashes
    )

    if not is_valid:
        log_security_event(
            event_type="AUTH_REJECTED",
            client_ip=client_ip,
            details={
                "reason": "INVALID_API_KEY",
                "key_preview": mask_sensitive_value(provided_raw),
                "path": str(request.url.path),
            },
            level=logging.WARNING,
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "status": "error",
                "code": "INVALID_API_KEY",
                "message": "Khóa API không hợp lệ hoặc đã bị thu hồi.",
            },
        )

    # 3. Enforce Rate Limiting per IP and per Key
    global_rate_limiter.check_request(request, key_hash=provided_hash)

    return provided_raw
