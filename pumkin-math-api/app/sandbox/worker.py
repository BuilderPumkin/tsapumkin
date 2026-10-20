"""
Sandbox Child Process Worker (app/sandbox/worker.py)
Executed in a fresh isolated child process (multiprocessing spawn).
Enforces:
1. Isolated temporary directory (TMPDIR/TEMP/TMP).
2. Network environment stripping (disables external proxy env vars).
3. OS resource limits (RLIMIT_AS for memory on POSIX/Linux).
4. Safe exception serialization back to the parent process.
"""

from __future__ import annotations

import importlib
import logging
import os
import sys
from typing import Any

logger = logging.getLogger(__name__)


def execute_in_child(
    func_qualname: str,
    args: tuple[Any, ...],
    kwargs: dict[str, Any],
    result_queue: Any,
    temp_dir: str,
    max_memory_mb: int,
) -> None:
    """
    Entrypoint executed inside the spawned child process.
    """
    # 0. On POSIX, detach child process into its own process group to isolate signals
    if sys.platform != "win32":
        try:
            os.setpgrp()
        except Exception:
            pass

    # 1. Enforce isolated temporary directory
    os.environ["TMPDIR"] = temp_dir
    os.environ["TEMP"] = temp_dir
    os.environ["TMP"] = temp_dir

    # 2. Strip network access environment variables
    for env_var in (
        "HTTP_PROXY",
        "HTTPS_PROXY",
        "ALL_PROXY",
        "http_proxy",
        "https_proxy",
        "all_proxy",
        "OPENAI_API_KEY",
        "GEMINI_API_KEY",
    ):
        os.environ.pop(env_var, None)

    # Point proxy to non-existent loopback to prevent rogue network connections
    os.environ["HTTP_PROXY"] = "http://127.0.0.1:0"
    os.environ["HTTPS_PROXY"] = "http://127.0.0.1:0"

    # 3. Enforce memory limit via resource module (on Linux/Docker)
    if sys.platform != "win32" and max_memory_mb > 0:
        try:
            import resource

            bytes_limit = max_memory_mb * 1024 * 1024
            # Set virtual address space limit
            resource.setrlimit(resource.RLIMIT_AS, (bytes_limit, bytes_limit))
        except Exception as e:
            logger.debug("Failed to set RLIMIT_AS: %s", e)

    # 4. Dynamically import and execute target function
    try:
        module_name, func_name = func_qualname.rsplit(".", 1)
        mod = importlib.import_module(module_name)
        target_fn = getattr(mod, func_name)

        result = target_fn(*args, **kwargs)
        result_queue.put({"success": True, "result": result})
    except MemoryError:
        result_queue.put(
            {
                "success": False,
                "error_type": "MemoryError",
                "message": f"Phép tính vượt quá giới hạn bộ nhớ cho phép ({max_memory_mb} MB).",
            }
        )
    except Exception as exc:
        result_queue.put(
            {
                "success": False,
                "error_type": type(exc).__name__,
                "message": str(exc),
            }
        )
