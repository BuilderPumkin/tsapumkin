"""
Budget and Token Tracking for Pumkin LLM Semantic Parser
Enforces request-level, hourly, and daily budget caps to prevent unexpected API costs.
"""

import asyncio
import os
import time
from typing import Any


class BudgetExceededError(Exception):
    """Raised when token or monetary budget limit is exceeded."""

    def __init__(
        self,
        message_vi: str,
        current_cost: float,
        limit: float,
        period: str = "hourly",
    ):
        super().__init__(message_vi)
        self.message_vi = message_vi
        self.current_cost = current_cost
        self.limit = limit
        self.period = period

    @property
    def details(self) -> dict[str, Any]:
        return {
            "period": self.period,
            "current_cost_usd": round(self.current_cost, 6),
            "limit_usd": round(self.limit, 6),
        }


class BudgetTracker:
    """
    Tracks accumulated LLM usage and enforces strict cost caps.
    Default:
    - Max $0.05 per individual request
    - Max $1.00 per rolling hour
    - Max $5.00 per rolling day
    """

    def __init__(
        self,
        request_budget_usd: float | None = None,
        hourly_budget_usd: float | None = None,
        daily_budget_usd: float | None = None,
        max_cost_per_request_usd: float | None = None,
        max_cost_per_hour_usd: float | None = None,
        max_cost_per_day_usd: float | None = None,
    ):
        self.request_budget_usd = (
            request_budget_usd
            or max_cost_per_request_usd
            or float(
                os.environ.get(
                    "LLM_BUDGET_REQUEST_USD",
                    os.environ.get("MAX_REQUEST_COST_USD", "0.05"),
                )
            )
        )
        self.hourly_budget_usd = (
            hourly_budget_usd
            or max_cost_per_hour_usd
            or float(
                os.environ.get(
                    "LLM_BUDGET_HOURLY_USD",
                    os.environ.get("MAX_HOURLY_COST_USD", "1.00"),
                )
            )
        )
        self.daily_budget_usd = (
            daily_budget_usd
            or max_cost_per_day_usd
            or float(
                os.environ.get(
                    "LLM_BUDGET_DAILY_USD",
                    os.environ.get("MAX_DAILY_COST_USD", "5.00"),
                )
            )
        )
        now = time.time()
        self._window_start = now
        self._day_start = now
        self._hourly_spent = 0.0
        self._daily_spent = 0.0
        self._total_spent = 0.0
        self._total_tokens = 0
        self._lock = asyncio.Lock()

    @property
    def hourly_spent_usd(self) -> float:
        return round(self._hourly_spent, 6)

    @property
    def daily_spent_usd(self) -> float:
        return round(self._daily_spent, 6)

    async def check_budget_before_request(self, estimated_cost: float = 0.001) -> None:
        """Checks if next request would breach daily, hourly, or request budget limits."""
        async with self._lock:
            now = time.time()
            # Reset rolling hour if 3600 seconds elapsed
            if now - self._window_start > 3600.0:
                self._window_start = now
                self._hourly_spent = 0.0

            # Reset rolling day if 86400 seconds elapsed
            if now - self._day_start > 86400.0:
                self._day_start = now
                self._daily_spent = 0.0

            if estimated_cost > self.request_budget_usd:
                raise BudgetExceededError(
                    f"Chi phí ước tính ({estimated_cost:.4f} USD) vượt ngân sách mỗi yêu cầu "
                    f"({self.request_budget_usd:.4f} USD).",
                    current_cost=estimated_cost,
                    limit=self.request_budget_usd,
                    period="request",
                )

            if self._hourly_spent + estimated_cost > self.hourly_budget_usd:
                raise BudgetExceededError(
                    f"Tổng chi phí trong giờ ({self._hourly_spent:.4f} USD) đã chạm trần "
                    f"ngân sách mỗi giờ ({self.hourly_budget_usd:.4f} USD).",
                    current_cost=self._hourly_spent + estimated_cost,
                    limit=self.hourly_budget_usd,
                    period="hour",
                )

            if self._daily_spent + estimated_cost > self.daily_budget_usd:
                raise BudgetExceededError(
                    f"Tổng chi phí trong ngày ({self._daily_spent:.4f} USD) đã chạm trần "
                    f"ngân sách mỗi ngày ({self.daily_budget_usd:.4f} USD).",
                    current_cost=self._daily_spent + estimated_cost,
                    limit=self.daily_budget_usd,
                    period="day",
                )

    async def record_usage(
        self,
        cost_usd: float,
        prompt_tokens: int,
        completion_tokens: int,
    ) -> None:
        """Records actual tokens and cost consumed."""
        async with self._lock:
            now = time.time()
            if now - self._window_start > 3600.0:
                self._window_start = now
                self._hourly_spent = 0.0

            if now - self._day_start > 86400.0:
                self._day_start = now
                self._daily_spent = 0.0

            self._hourly_spent += cost_usd
            self._daily_spent += cost_usd
            self._total_spent += cost_usd
            self._total_tokens += prompt_tokens + completion_tokens

    async def get_stats(self) -> dict[str, float | int]:
        """Returns snapshot of current spending and token metrics."""
        async with self._lock:
            return {
                "hourly_spent_usd": round(self._hourly_spent, 6),
                "daily_spent_usd": round(self._daily_spent, 6),
                "total_spent_usd": round(self._total_spent, 6),
                "total_tokens": self._total_tokens,
                "hourly_budget_usd": self.hourly_budget_usd,
                "daily_budget_usd": self.daily_budget_usd,
                "request_budget_usd": self.request_budget_usd,
            }

    def reset(self) -> None:
        """Resets spending counters (primarily for unit tests)."""
        now = time.time()
        self._window_start = now
        self._day_start = now
        self._hourly_spent = 0.0
        self._daily_spent = 0.0
        self._total_spent = 0.0
        self._total_tokens = 0


# Global singleton instance
global_budget_tracker = BudgetTracker()
