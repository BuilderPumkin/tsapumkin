"""
Sandbox Exception Definitions (app/sandbox/errors.py)
Standardized exceptions for process isolation, timeout, and memory limit enforcement.
"""

from typing import Any


class SandboxError(Exception):
    """Base exception for all sandbox runtime failures."""

    code: str = "SANDBOX_ERROR"
    message_vi: str = "Lỗi thực thi trong môi trường cách ly (Sandbox)."

    def __init__(self, message_vi: str | None = None, details: dict[str, Any] | None = None):
        if message_vi:
            self.message_vi = message_vi
        self.details = details or {}
        super().__init__(self.message_vi)


class SandboxTimeoutError(SandboxError):
    """Raised when process execution exceeds the configured hard timeout limit."""

    code: str = "TIMEOUT"
    message_vi: str = "Phép tính bị quá thời gian cho phép (5.0s)."


class SandboxMemoryError(SandboxError):
    """Raised when process execution exceeds memory limits (RLIMIT_AS / memory cgroup)."""

    code: str = "MEMORY_LIMIT_EXCEEDED"
    message_vi: str = "Phép tính vượt quá giới hạn bộ nhớ cho phép (512 MB)."


class SandboxExecutionError(SandboxError):
    """Raised when process crashes or encounters an unhandled internal exception."""

    code: str = "EXECUTION_ERROR"
    message_vi: str = "Tiến trình tính toán bị gián đoạn bất thường."
