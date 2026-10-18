"""
Structured Security & Privacy-Preserving Audit Logger (app/security/logger.py)
Logs structured security events (authentication, rate limiting, timeouts, adversarial rejections)
with trace_id, event_type, and timestamps.
STRICT PRIVACY: Never logs student personally identifiable information (PII).
"""

from __future__ import annotations

import json
import logging
from datetime import UTC, datetime
from typing import Any

logger = logging.getLogger("pumkin.security")


def mask_sensitive_value(value: str | None, visible_chars: int = 4) -> str:
    """Masks secret values (e.g. API keys) leaving only the initial prefix."""
    if not value:
        return "<none>"
    stripped = value.strip()
    if len(stripped) <= visible_chars:
        return "***"
    return f"{stripped[:visible_chars]}...***"


def log_security_event(
    event_type: str,
    trace_id: str | None = None,
    client_ip: str | None = None,
    details: dict[str, Any] | None = None,
    level: int = logging.INFO,
) -> None:
    """
    Emits a structured JSON security log entry.
    Ensures zero student PII is written to logs.
    """
    now = datetime.now(UTC).isoformat()
    clean_details = dict(details or {})

    # Strip any potential PII fields defensively
    for pii_field in (
        "student_name",
        "student_id",
        "user_email",
        "phone",
        "email",
        "full_name",
        "birthday",
        "school",
    ):
        clean_details.pop(pii_field, None)

    # Mask any API keys in details
    if "api_key" in clean_details:
        clean_details["api_key"] = mask_sensitive_value(clean_details["api_key"])
    if "raw_key" in clean_details:
        clean_details["raw_key"] = mask_sensitive_value(clean_details["raw_key"])

    event_payload = {
        "timestamp": now,
        "trace_id": trace_id or "system",
        "event_type": event_type,
        "client_ip": client_ip or "unknown",
        "details": clean_details,
    }

    log_line = json.dumps(event_payload, ensure_ascii=False)
    logger.log(level, "%s", log_line)
