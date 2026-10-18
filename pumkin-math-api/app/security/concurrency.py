"""
Bounded Queue & Concurrency Limiter (app/security/concurrency.py)
Prevents server starvation and memory exhaustion by capping concurrent active calculations
and rejecting excess traffic when the pending queue is saturated.
"""

from __future__ import annotations

import asyncio
import logging
import os
from contextlib import asynccontextmanager

from fastapi import HTTPException, status

logger = logging.getLogger(__name__)

DEFAULT_MAX_CONCURRENT_REQUESTS = 10
DEFAULT_MAX_QUEUE_SIZE = 20


class BoundedConcurrencyLimiter:
    """
    Limits the number of concurrent heavy computation requests and rejects
    requests immediately with HTTP 503 if the waiting queue exceeds its capacity.
    """

    def __init__(self) -> None:
        self._semaphore: asyncio.Semaphore | None = None
        self._waiting_count: int = 0
        self._lock: asyncio.Lock | None = None

    @property
    def max_concurrent(self) -> int:
        try:
            return int(
                os.getenv("PUMKIN_MAX_CONCURRENT_REQUESTS", str(DEFAULT_MAX_CONCURRENT_REQUESTS))
            )
        except ValueError:
            return DEFAULT_MAX_CONCURRENT_REQUESTS

    @property
    def max_queue_size(self) -> int:
        try:
            return int(os.getenv("PUMKIN_MAX_QUEUE_SIZE", str(DEFAULT_MAX_QUEUE_SIZE)))
        except ValueError:
            return DEFAULT_MAX_QUEUE_SIZE

    @property
    def is_enabled(self) -> bool:
        return os.getenv("PUMKIN_CONCURRENCY_LIMIT_ENABLED", "true").strip().lower() in (
            "1",
            "true",
            "yes",
            "on",
        )

    def _ensure_init(self) -> None:
        if self._semaphore is None:
            self._semaphore = asyncio.Semaphore(self.max_concurrent)
        if self._lock is None:
            self._lock = asyncio.Lock()

    @asynccontextmanager
    async def limit_concurrency(self):
        """
        Async context manager guarding critical computation endpoints.
        Raises HTTPException(503) if the queue depth exceeds max_queue_size.
        """
        if not self.is_enabled:
            yield
            return

        self._ensure_init()
        assert self._lock is not None
        assert self._semaphore is not None

        # Check queue depth before waiting
        async with self._lock:
            if self._waiting_count >= self.max_queue_size:
                logger.warning(
                    "Concurrency queue full (%d pending). Rejecting request with 503.",
                    self._waiting_count,
                )
                raise HTTPException(
                    status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                    detail={
                        "status": "error",
                        "code": "SERVICE_OVERLOADED",
                        "message": "Hệ thống đang quá tải, hàng đợi yêu cầu đã đầy. Vui lòng thử lại sau.",
                        "details": {
                            "max_concurrent": self.max_concurrent,
                            "max_queue_size": self.max_queue_size,
                            "retry_after_seconds": 5,
                        },
                    },
                    headers={"Retry-After": "5"},
                )
            self._waiting_count += 1

        try:
            async with self._semaphore:
                async with self._lock:
                    self._waiting_count = max(0, self._waiting_count - 1)
                yield
        finally:
            pass


# Global singleton instance
global_concurrency_limiter = BoundedConcurrencyLimiter()
