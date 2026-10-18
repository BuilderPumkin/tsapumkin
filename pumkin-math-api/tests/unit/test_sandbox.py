"""
Unit Tests for Isolated Process Sandbox (app/sandbox/)
Validates:
1. Normal function execution and result retrieval.
2. Hard timeout enforcement: process tree killed when function hangs.
3. Memory limit exception propagation.
4. Async non-blocking execution via run_in_sandbox_async.
"""

from __future__ import annotations

import time

import pytest

from app.sandbox import (
    SandboxMemoryError,
    SandboxTimeoutError,
    run_in_sandbox,
    run_in_sandbox_async,
)


def sample_square(x: int) -> int:
    """Helper for testing normal execution."""
    return x * x


def sample_hang_forever() -> None:
    """Helper for testing infinite loop timeout."""
    while True:
        time.sleep(0.05)


def sample_raise_memory_error() -> None:
    """Helper for testing memory error."""
    raise MemoryError("Simulated allocation failure")


@pytest.mark.unit
def test_sandbox_normal_execution():
    """Verify normal function executes and returns expected value."""
    res = run_in_sandbox(sample_square, args=(7,))
    assert res == 49


@pytest.mark.unit
def test_sandbox_hard_timeout_kills_process():
    """Verify a hanging function is forcefully terminated at timeout limit."""
    start = time.perf_counter()
    with pytest.raises(SandboxTimeoutError) as exc_info:
        run_in_sandbox(sample_hang_forever, timeout_seconds=1.0)
    elapsed = time.perf_counter() - start

    assert 0.9 <= elapsed <= 2.5
    assert exc_info.value.code == "TIMEOUT"
    assert "quá thời gian" in exc_info.value.message_vi


@pytest.mark.unit
def test_sandbox_memory_error_propagation():
    """Verify memory error in child process is translated to SandboxMemoryError."""
    with pytest.raises(SandboxMemoryError) as exc_info:
        run_in_sandbox(sample_raise_memory_error)
    assert exc_info.value.code == "MEMORY_LIMIT_EXCEEDED"


@pytest.mark.unit
@pytest.mark.asyncio
async def test_sandbox_async_execution():
    """Verify run_in_sandbox_async returns correct result without blocking loop."""
    res = await run_in_sandbox_async(sample_square, args=(12,))
    assert res == 144
