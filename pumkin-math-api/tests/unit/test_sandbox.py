"""
Unit Tests for Sandbox Runner Layer (run_with_timeout)
"""

import time

import pytest

from app.sandbox.runner import run_with_timeout


def sample_quick_calculation(a: int, b: int) -> int:
    return a + b


def sample_slow_calculation(duration: float) -> str:
    time.sleep(duration)
    return "done"


def sample_failing_function():
    raise ValueError("Lỗi cố ý từ hàm kiểm thử")


@pytest.mark.unit
def test_sandbox_successful_execution():
    """
    Test run_with_timeout completes fast tasks within limit.
    """
    result = run_with_timeout(sample_quick_calculation, args=(10, 25), timeout_seconds=1.0)
    assert result == 35


@pytest.mark.unit
def test_sandbox_timeout_triggers():
    """
    Test run_with_timeout raises TimeoutError when execution exceeds threshold.
    """
    with pytest.raises(TimeoutError) as exc_info:
        run_with_timeout(sample_slow_calculation, args=(0.5,), timeout_seconds=0.1)
    assert "quá thời gian" in str(exc_info.value)


@pytest.mark.unit
def test_sandbox_propagates_internal_exception():
    """
    Test run_with_timeout propagates genuine exceptions raised by the target function.
    """
    with pytest.raises(ValueError) as exc_info:
        run_with_timeout(sample_failing_function, timeout_seconds=1.0)
    assert "Lỗi cố ý" in str(exc_info.value)
