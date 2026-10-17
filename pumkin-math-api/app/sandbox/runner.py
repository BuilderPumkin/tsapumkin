"""
Minimal Process Sandbox Execution Layer
Placeholder for isolated computation with configurable timeouts.
Full OS-level hardening (seccomp, rlimit, cgroups) will be implemented in Prompt 10.
"""

from collections.abc import Callable
from concurrent.futures import ThreadPoolExecutor
from concurrent.futures import TimeoutError as FuturesTimeoutError
from typing import Any


def run_with_timeout(
    func: Callable[..., Any],
    args: tuple[Any, ...] = (),
    kwargs: dict[str, Any] | None = None,
    timeout_seconds: float = 5.0,
) -> Any:
    """
    Executes a callable with a strict timeout limit.

    Args:
        func: The target mathematical or parsing function to execute.
        args: Positional arguments for the function.
        kwargs: Keyword arguments for the function.
        timeout_seconds: Maximum allowed runtime in seconds before raising TimeoutError.

    Returns:
        The return value of func(*args, **kwargs).

    Raises:
        TimeoutError: If execution exceeds timeout_seconds.
        Exception: Any exception raised by func is propagated directly.
    """
    if kwargs is None:
        kwargs = {}

    with ThreadPoolExecutor(max_workers=1) as executor:
        future = executor.submit(func, *args, **kwargs)
        try:
            return future.result(timeout=timeout_seconds)
        except FuturesTimeoutError:
            msg = f"Phép tính bị quá thời gian cho phép ({timeout_seconds}s)"
            raise TimeoutError(msg) from None
