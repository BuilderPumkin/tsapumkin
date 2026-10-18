"""
Dependency Security & Vulnerability Audit Tests (tests/adversarial/test_dependencies_audit.py)
Uses pip-audit to ensure zero known high/critical vulnerabilities in installed dependencies.
"""

from __future__ import annotations

import subprocess
import sys

import pytest


@pytest.mark.adversarial
def test_pip_audit_dependencies_have_no_known_vulnerabilities():
    """
    Executes pip-audit across the current virtual environment.
    Asserts zero unhandled critical or high security vulnerabilities.
    """
    cmd = [sys.executable, "-m", "pip_audit", "--desc"]
    result = subprocess.run(cmd, capture_output=True, text=True)

    # Exit code 0 means no known vulnerabilities found
    assert result.returncode == 0, (
        f"pip-audit found dependency vulnerabilities!\n"
        f"STDOUT:\n{result.stdout}\n"
        f"STDERR:\n{result.stderr}"
    )
    combined_output = result.stdout + result.stderr
    assert "No known vulnerabilities found" in combined_output
