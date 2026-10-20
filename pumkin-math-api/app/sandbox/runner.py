"""
Isolated Subprocess Sandbox Execution Layer (app/sandbox/runner.py)
Executes CAS solvers and student checking in an isolated child process with:
1. Configurable hard timeout (PUMKIN_SANDBOX_TIMEOUT_SECONDS, default: 5.0s).
2. RAM and CPU resource limits (PUMKIN_SANDBOX_MAX_MEMORY_MB, default: 512MB).
3. Process-tree termination on timeout or memory exhaustion.
4. Isolated per-run temporary directories.
5. Network environment stripping.
"""

from __future__ import annotations

import asyncio
import logging
import multiprocessing
import os
import shutil
import subprocess
import sys
import tempfile
from collections.abc import Callable
from typing import Any

from app.sandbox.errors import (
    SandboxExecutionError,
    SandboxMemoryError,
    SandboxTimeoutError,
)
from app.sandbox.worker import execute_in_child

logger = logging.getLogger(__name__)

DEFAULT_TIMEOUT_SECONDS = 5.0
DEFAULT_MAX_MEMORY_MB = 512


def get_sandbox_timeout() -> float:
    """Retrieve sandbox timeout from environment variable."""
    try:
        return float(os.getenv("PUMKIN_SANDBOX_TIMEOUT_SECONDS", str(DEFAULT_TIMEOUT_SECONDS)))
    except ValueError:
        return DEFAULT_TIMEOUT_SECONDS


def get_sandbox_max_memory_mb() -> int:
    """Retrieve sandbox RAM limit in megabytes from environment variable."""
    try:
        return int(os.getenv("PUMKIN_SANDBOX_MAX_MEMORY_MB", str(DEFAULT_MAX_MEMORY_MB)))
    except ValueError:
        return DEFAULT_MAX_MEMORY_MB


def is_sandbox_enabled() -> bool:
    """Check if child process isolation is enabled."""
    return os.getenv("PUMKIN_SANDBOX_ENABLED", "true").strip().lower() in (
        "1",
        "true",
        "yes",
        "on",
    )


def _terminate_process_tree(pid: int) -> None:
    """
    Kills the entire process tree for a given PID cleanly across Windows and POSIX.
    """
    if sys.platform == "win32":
        try:
            # /F = forcefully terminate, /T = terminate process tree, /PID = process id
            subprocess.run(
                ["taskkill", "/F", "/T", "/PID", str(pid)],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                check=False,
            )
        except Exception as e:
            logger.debug("taskkill error for pid %s: %s", pid, e)
    else:
        try:
            import signal

            my_pgrp = os.getpgrp()
            pgid = os.getpgid(pid)
            # CRITICAL: Only killpg if the child is in its OWN detached process group!
            # If pgid matches our own process group, killpg would terminate pytest and the CI runner!
            if pgid != my_pgrp and pgid > 0:
                os.killpg(pgid, signal.SIGKILL)
            else:
                os.kill(pid, signal.SIGKILL)
        except Exception:
            try:
                import signal

                os.kill(pid, signal.SIGKILL)
            except Exception as e:
                logger.debug("kill error for pid %s: %s", pid, e)


def run_in_sandbox(
    func_or_qualname: Callable[..., Any] | str,
    args: tuple[Any, ...] = (),
    kwargs: dict[str, Any] | None = None,
    timeout_seconds: float | None = None,
    max_memory_mb: int | None = None,
) -> Any:
    """
    Synchronously executes a callable in an isolated child process with strict resource limits.
    """
    if kwargs is None:
        kwargs = {}

    timeout = timeout_seconds if timeout_seconds is not None else get_sandbox_timeout()
    mem_limit = max_memory_mb if max_memory_mb is not None else get_sandbox_max_memory_mb()

    # Determine function qualified name
    if callable(func_or_qualname):
        func_qualname = f"{func_or_qualname.__module__}.{func_or_qualname.__qualname__}"
    else:
        func_qualname = str(func_or_qualname)

    if not is_sandbox_enabled():
        # Fallback to direct in-process execution when disabled
        if callable(func_or_qualname):
            return func_or_qualname(*args, **kwargs)
        mod_name, f_name = func_qualname.rsplit(".", 1)
        mod = __import__(mod_name, fromlist=[f_name])
        fn = getattr(mod, f_name)
        return fn(*args, **kwargs)

    temp_dir = tempfile.mkdtemp(prefix="pumkin_sandbox_")
    ctx = multiprocessing.get_context("spawn")
    queue: multiprocessing.Queue = ctx.Queue()

    process = ctx.Process(
        target=execute_in_child,
        args=(func_qualname, args, kwargs, queue, temp_dir, mem_limit),
    )

    try:
        process.start()
        process.join(timeout=timeout)

        if process.is_alive():
            logger.warning(
                "Sandbox process (PID %s) exceeded timeout of %ss. Terminating process tree.",
                process.pid,
                timeout,
            )
            if process.pid:
                _terminate_process_tree(process.pid)
            process.join(timeout=1.0)
            raise SandboxTimeoutError(
                f"Phép tính bị quá thời gian cho phép ({timeout:.1f}s).",
                details={"timeout_seconds": timeout, "func": func_qualname},
            )

        # Check exit code
        if process.exitcode != 0 and queue.empty():
            logger.error(
                "Sandbox process (PID %s) exited abnormally with exit code %s",
                process.pid,
                process.exitcode,
            )
            # Negative signals on Unix or memory violation codes on Windows
            if process.exitcode in (
                -9,
                -11,
                3221225477,
            ):  # 3221225477 is 0xC0000005 (Access Violation/OOM)
                raise SandboxMemoryError(
                    f"Tiến trình bị hủy do vượt quá giới hạn bộ nhớ ({mem_limit} MB).",
                    details={"exit_code": process.exitcode, "max_memory_mb": mem_limit},
                )
            raise SandboxExecutionError(
                f"Tiến trình tính toán bị gián đoạn bất thường (exit code: {process.exitcode}).",
                details={"exit_code": process.exitcode},
            )

        if not queue.empty():
            payload = queue.get_nowait()
            if payload.get("success"):
                return payload.get("result")

            error_type = payload.get("error_type")
            msg = payload.get("message", "Lỗi tính toán trong sandbox")
            if error_type == "MemoryError":
                raise SandboxMemoryError(msg, details={"max_memory_mb": mem_limit})
            raise SandboxExecutionError(msg, details={"error_type": error_type})

        raise SandboxExecutionError("Tiến trình kết thúc không trả về dữ liệu.")

    finally:
        # Clean up temporary directory and queue
        try:
            queue.close()
            queue.join_thread()
        except Exception:
            pass

        shutil.rmtree(temp_dir, ignore_errors=True)


async def run_in_sandbox_async(
    func_or_qualname: Callable[..., Any] | str,
    args: tuple[Any, ...] = (),
    kwargs: dict[str, Any] | None = None,
    timeout_seconds: float | None = None,
    max_memory_mb: int | None = None,
) -> Any:
    """
    Asynchronously executes a callable in the sandbox without blocking the FastAPI event loop.
    """
    return await asyncio.to_thread(
        run_in_sandbox,
        func_or_qualname,
        args,
        kwargs,
        timeout_seconds,
        max_memory_mb,
    )


# Backwards compatibility alias
run_with_timeout = run_in_sandbox
