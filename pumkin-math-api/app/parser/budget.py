"""
Budget and Token Tracking for Pumkin LLM Semantic Parser
Enforces request-level, hourly, and daily budget caps to prevent unexpected API costs.
Uses SQLite WAL-mode shared persistent store so multiple worker processes and service restarts
share the exact same budget pool without doubling limits.
"""

import asyncio
import os
import sqlite3
import tempfile
import time
from pathlib import Path
from typing import Any


class BudgetExceededError(Exception):
    """Raised when token or monetary budget limit is exceeded."""

    def __init__(
        self,
        message_vi: str = "Ngân sách AI đã đạt giới hạn an toàn trong khoảng thời gian hiện tại. Hệ thống tạm ngưng để đảm bảo an toàn vận hành.",
        current_cost: float = 0.0,
        limit: float = 0.0,
        period: str = "hourly",
    ):
        super().__init__(message_vi)
        self.message_vi = message_vi
        self.current_cost = current_cost
        self.limit = limit
        self.period = period

    @property
    def internal_details(self) -> dict[str, Any]:
        """Internal server-side details for audit logs; NEVER exposed directly to client."""
        return {
            "period": self.period,
            "current_cost_usd": round(self.current_cost, 6),
            "limit_usd": round(self.limit, 6),
        }

    @property
    def details(self) -> dict[str, Any]:
        return self.internal_details


class BudgetTracker:
    """
    Tracks accumulated LLM usage and enforces strict cost caps across multiple Uvicorn workers
    using a shared SQLite file store with Write-Ahead Logging (WAL).
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
        db_path: str | Path | None = None,
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

        if db_path is None:
            configured_path = os.environ.get("PUMKIN_BUDGET_DB_PATH", "").strip()
            if configured_path:
                self.db_path = Path(configured_path)
            else:
                self.db_path = Path(tempfile.gettempdir()) / "pumkin_budget.db"
        elif str(db_path) == ":memory:":
            self.db_path = ":memory:"
        else:
            self.db_path = Path(db_path)

        self._lock = asyncio.Lock()
        self._init_db()

    def _get_connection(self) -> sqlite3.Connection:
        if self.db_path == ":memory:":
            if not hasattr(self, "_mem_conn"):
                self._mem_conn = sqlite3.connect(":memory:", check_same_thread=False)
            return self._mem_conn

        conn = sqlite3.connect(str(self.db_path), timeout=15.0)
        conn.execute("PRAGMA journal_mode=WAL;")
        conn.execute("PRAGMA busy_timeout=5000;")
        return conn

    def _init_db(self) -> None:
        conn = self._get_connection()
        try:
            with conn:
                conn.execute(
                    """
                    CREATE TABLE IF NOT EXISTS budget_windows (
                        window_name TEXT PRIMARY KEY,
                        window_start REAL NOT NULL,
                        spent_usd REAL NOT NULL,
                        tokens INTEGER NOT NULL
                    );
                    """
                )
        finally:
            if self.db_path != ":memory:":
                conn.close()

    @property
    def hourly_spent_usd(self) -> float:
        stats = self._read_window("hourly")
        return round(stats[1], 6)

    @property
    def daily_spent_usd(self) -> float:
        stats = self._read_window("daily")
        return round(stats[1], 6)

    def _read_window(self, window_name: str) -> tuple[float, float, int]:
        """Returns (window_start, spent_usd, tokens)."""
        conn = self._get_connection()
        try:
            cur = conn.cursor()
            cur.execute(
                "SELECT window_start, spent_usd, tokens FROM budget_windows WHERE window_name = ?",
                (window_name,),
            )
            row = cur.fetchone()
            if row:
                return float(row[0]), float(row[1]), int(row[2])
            now = time.time()
            with conn:
                conn.execute(
                    "INSERT OR IGNORE INTO budget_windows (window_name, window_start, spent_usd, tokens) VALUES (?, ?, 0.0, 0)",
                    (window_name, now),
                )
            return now, 0.0, 0
        finally:
            if self.db_path != ":memory:":
                conn.close()

    async def check_budget_before_request(self, estimated_cost: float = 0.001) -> None:
        """Checks if next request would breach daily, hourly, or request budget limits."""
        async with self._lock:
            if estimated_cost > self.request_budget_usd:
                raise BudgetExceededError(
                    message_vi="Chi phí ước tính của bài toán vượt ngân sách mỗi yêu cầu.",
                    current_cost=estimated_cost,
                    limit=self.request_budget_usd,
                    period="request",
                )

            now = time.time()
            conn = self._get_connection()
            try:
                with conn:
                    # 1. Hourly Window Check
                    h_row = conn.execute(
                        "SELECT window_start, spent_usd FROM budget_windows WHERE window_name = 'hourly'"
                    ).fetchone()
                    if not h_row:
                        conn.execute(
                            "INSERT INTO budget_windows (window_name, window_start, spent_usd, tokens) VALUES ('hourly', ?, 0.0, 0)",
                            (now,),
                        )
                        h_start, h_spent = now, 0.0
                    else:
                        h_start, h_spent = float(h_row[0]), float(h_row[1])

                    if now - h_start > 3600.0:
                        conn.execute(
                            "UPDATE budget_windows SET window_start = ?, spent_usd = 0.0, tokens = 0 WHERE window_name = 'hourly'",
                            (now,),
                        )
                        h_spent = 0.0

                    if h_spent + estimated_cost > self.hourly_budget_usd:
                        raise BudgetExceededError(
                            message_vi="Ngân sách xử lý AI đã chạm trần ngân sách mỗi giờ.",
                            current_cost=h_spent + estimated_cost,
                            limit=self.hourly_budget_usd,
                            period="hour",
                        )

                    # 2. Daily Window Check
                    d_row = conn.execute(
                        "SELECT window_start, spent_usd FROM budget_windows WHERE window_name = 'daily'"
                    ).fetchone()
                    if not d_row:
                        conn.execute(
                            "INSERT INTO budget_windows (window_name, window_start, spent_usd, tokens) VALUES ('daily', ?, 0.0, 0)",
                            (now,),
                        )
                        d_start, d_spent = now, 0.0
                    else:
                        d_start, d_spent = float(d_row[0]), float(d_row[1])

                    if now - d_start > 86400.0:
                        conn.execute(
                            "UPDATE budget_windows SET window_start = ?, spent_usd = 0.0, tokens = 0 WHERE window_name = 'daily'",
                            (now,),
                        )
                        d_spent = 0.0

                    if d_spent + estimated_cost > self.daily_budget_usd:
                        raise BudgetExceededError(
                            message_vi="Ngân sách xử lý AI đã chạm trần ngân sách mỗi ngày.",
                            current_cost=d_spent + estimated_cost,
                            limit=self.daily_budget_usd,
                            period="day",
                        )
            finally:
                if self.db_path != ":memory:":
                    conn.close()

    async def record_usage(
        self,
        cost_usd: float,
        prompt_tokens: int,
        completion_tokens: int,
    ) -> None:
        """Records actual tokens and cost consumed into persistent SQLite store."""
        async with self._lock:
            now = time.time()
            total_tokens = prompt_tokens + completion_tokens
            conn = self._get_connection()
            try:
                with conn:
                    # Update Hourly
                    h_row = conn.execute(
                        "SELECT window_start, spent_usd, tokens FROM budget_windows WHERE window_name = 'hourly'"
                    ).fetchone()
                    if not h_row or (now - float(h_row[0]) > 3600.0):
                        conn.execute(
                            "INSERT OR REPLACE INTO budget_windows (window_name, window_start, spent_usd, tokens) VALUES ('hourly', ?, ?, ?)",
                            (now, cost_usd, total_tokens),
                        )
                    else:
                        conn.execute(
                            "UPDATE budget_windows SET spent_usd = spent_usd + ?, tokens = tokens + ? WHERE window_name = 'hourly'",
                            (cost_usd, total_tokens),
                        )

                    # Update Daily
                    d_row = conn.execute(
                        "SELECT window_start, spent_usd, tokens FROM budget_windows WHERE window_name = 'daily'"
                    ).fetchone()
                    if not d_row or (now - float(d_row[0]) > 86400.0):
                        conn.execute(
                            "INSERT OR REPLACE INTO budget_windows (window_name, window_start, spent_usd, tokens) VALUES ('daily', ?, ?, ?)",
                            (now, cost_usd, total_tokens),
                        )
                    else:
                        conn.execute(
                            "UPDATE budget_windows SET spent_usd = spent_usd + ?, tokens = tokens + ? WHERE window_name = 'daily'",
                            (cost_usd, total_tokens),
                        )

                    # Update All-Time Total
                    conn.execute(
                        """
                        INSERT INTO budget_windows (window_name, window_start, spent_usd, tokens)
                        VALUES ('total', ?, ?, ?)
                        ON CONFLICT(window_name) DO UPDATE SET spent_usd = spent_usd + excluded.spent_usd, tokens = tokens + excluded.tokens
                        """,
                        (now, cost_usd, total_tokens),
                    )
            finally:
                if self.db_path != ":memory:":
                    conn.close()

    async def get_stats(self) -> dict[str, float | int]:
        """Returns snapshot of current spending and token metrics from persistent store."""
        async with self._lock:
            h_spent = self.hourly_spent_usd
            d_spent = self.daily_spent_usd
            total_stats = self._read_window("total")
            return {
                "hourly_spent_usd": h_spent,
                "daily_spent_usd": d_spent,
                "total_spent_usd": round(total_stats[1], 6),
                "total_tokens": total_stats[2],
                "hourly_budget_usd": self.hourly_budget_usd,
                "daily_budget_usd": self.daily_budget_usd,
                "request_budget_usd": self.request_budget_usd,
            }

    def reset(self) -> None:
        """Resets spending counters across all persistent windows (primarily for tests)."""
        now = time.time()
        conn = self._get_connection()
        try:
            with conn:
                conn.execute(
                    "UPDATE budget_windows SET spent_usd = 0.0, tokens = 0, window_start = ?",
                    (now,),
                )
        finally:
            if self.db_path != ":memory:":
                conn.close()


# Global singleton instance (persisted in /tmp/pumkin_budget.db across all uvicorn workers)
global_budget_tracker = BudgetTracker()
