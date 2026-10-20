"""
Sliding-Window In-Memory Rate Limiter (app/security/rate_limiter.py)
Limits call frequency per API key and per Client IP address.
"""

from __future__ import annotations

import logging
import os
import time
from collections import defaultdict

from fastapi import HTTPException, Request, status

logger = logging.getLogger(__name__)

DEFAULT_RATE_LIMIT_KEY_PER_MIN = 60
DEFAULT_RATE_LIMIT_IP_PER_MIN = 120


class SlidingWindowRateLimiter:
    """
    Thread-safe, sliding-window rate limiter tracking requests within a rolling 60-second window.
    """

    def __init__(self) -> None:
        self._key_records: dict[str, list[float]] = defaultdict(list)
        self._ip_records: dict[str, list[float]] = defaultdict(list)

    @property
    def key_limit_per_minute(self) -> int:
        try:
            return int(
                os.getenv("PUMKIN_RATE_LIMIT_KEY_PER_MIN", str(DEFAULT_RATE_LIMIT_KEY_PER_MIN))
            )
        except ValueError:
            return DEFAULT_RATE_LIMIT_KEY_PER_MIN

    @property
    def ip_limit_per_minute(self) -> int:
        try:
            return int(
                os.getenv("PUMKIN_RATE_LIMIT_IP_PER_MIN", str(DEFAULT_RATE_LIMIT_IP_PER_MIN))
            )
        except ValueError:
            return DEFAULT_RATE_LIMIT_IP_PER_MIN

    @property
    def is_enabled(self) -> bool:
        return os.getenv("PUMKIN_RATE_LIMIT_ENABLED", "true").strip().lower() in (
            "1",
            "true",
            "yes",
            "on",
        )

    def is_allowed(
        self, identifier: str, limit: int, records: dict[str, list[float]]
    ) -> tuple[bool, int]:
        """
        Checks if the request is permitted under the rate limit.
        Returns: (is_allowed, retry_after_seconds)
        """
        if not self.is_enabled:
            return True, 0

        now = time.time()
        window_start = now - 60.0

        # Filter out timestamps older than rolling window
        timestamps = [ts for ts in records[identifier] if ts > window_start]
        records[identifier] = timestamps

        if len(timestamps) >= limit:
            oldest_in_window = timestamps[0]
            retry_after = max(1, int(oldest_in_window + 60.0 - now))
            return False, retry_after

        records[identifier].append(now)
        return True, 0

    def check_request(self, request: Request, key_hash: str | None = None) -> None:
        """
        Enforces both IP-based and Key-based rate limits on the incoming FastAPI request.
        Raises HTTPException(429) if limits are exceeded.
        """
        if not self.is_enabled:
            return

        # 1. Resolve Client IP
        forwarded_for = request.headers.get("x-forwarded-for")
        if forwarded_for:
            client_ip = forwarded_for.split(",")[0].strip()
        elif request.client:
            client_ip = request.client.host
        else:
            client_ip = "unknown_ip"

        # Check IP rate limit
        allowed_ip, retry_after_ip = self.is_allowed(
            client_ip, self.ip_limit_per_minute, self._ip_records
        )
        if not allowed_ip:
            logger.warning(
                "Rate limit exceeded for IP %s (Retry-After: %ss)", client_ip, retry_after_ip
            )
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail={
                    "status": "error",
                    "code": "RATE_LIMIT_EXCEEDED",
                    "message": "Quá giới hạn số lượng yêu cầu theo địa chỉ IP. Vui lòng thử lại sau.",
                    "details": {"retry_after_seconds": retry_after_ip, "limit_type": "ip"},
                },
                headers={"Retry-After": str(retry_after_ip)},
            )

        # 2. Check API Key rate limit (if authenticated)
        if key_hash:
            allowed_key, retry_after_key = self.is_allowed(
                key_hash, self.key_limit_per_minute, self._key_records
            )
            if not allowed_key:
                logger.warning(
                    "Rate limit exceeded for key hash %s... (Retry-After: %ss)",
                    key_hash[:8],
                    retry_after_key,
                )
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail={
                        "status": "error",
                        "code": "RATE_LIMIT_EXCEEDED",
                        "message": "Quá giới hạn số lượng yêu cầu của khóa API. Vui lòng thử lại sau.",
                        "details": {"retry_after_seconds": retry_after_key, "limit_type": "key"},
                    },
                    headers={"Retry-After": str(retry_after_key)},
                )


# Global singleton instance
global_rate_limiter = SlidingWindowRateLimiter()
