"""
Adversarial Security Tests for LaTeX Tokenizer & Parser
Tests code injection attacks, forbidden functions, arbitrary command execution attempts,
and resource boundary violations.
Strictly ensures zero code execution and deterministic rejection.
"""

import pytest

from app.latex import parse_latex

ATTACK_PAYLOADS = [
    r"__import__('os').system('echo hacked')",
    r"__import__('subprocess').call(['calc.exe'])",
    r"eval('2 + 2')",
    r"exec('import sys; sys.exit(1)')",
    r"subprocess.Popen('whoami')",
    r"os.system('id')",
    r"sys.exit(0)",
    r"globals()['__builtins__']",
    r"locals()['os']",
    r"__builtins__.__import__('os')",
    r"compile('print(1)', '', 'exec')",
    r"open('/etc/passwd').read()",
    r"open('C:\\Windows\\System32\\calc.exe')",
    r"getattr(__builtins__, 'eval')('1+1')",
    r"setattr(x, 'val', 10)",
    r"delattr(x, 'val')",
    r"\frac{__import__('os')}{2}",
    r"\sqrt{eval('16')}",
    r"x + exec('pass')",
    r"2^{\\__import__('sys')}",
    r"\\text{__import__('os')}",
    r"\\text{eval(1)}",
    r"\\text{exec(1)}",
]


@pytest.mark.parametrize("payload", ATTACK_PAYLOADS)
def test_code_injection_payloads_strictly_rejected(payload):
    """
    Every malicious code injection string must be intercepted by the security blacklist
    and rejected with error code SECURITY_VIOLATION. Zero code execution allowed.
    """
    res = parse_latex(payload)
    assert res.is_success is False
    assert res.error_code == "SECURITY_VIOLATION", (
        f"Payload '{payload}' was not rejected as SECURITY_VIOLATION. Got: {res.error_code}"
    )


def test_no_side_effects_on_file_system(tmp_path):
    """
    Verify that an injection attempting to write a file fails completely
    and touches nothing on disk.
    """
    canary_file = tmp_path / "hacked.txt"
    payload = f"__import__('builtins').open(r'{canary_file}', 'w').write('pwned')"

    res = parse_latex(payload)
    assert res.is_success is False
    assert not canary_file.exists(), "Canary file was created! Code execution occurred!"


def test_arbitrary_python_syntax_rejected():
    """
    Python-specific constructs like lambda, def, class, return, import
    must not parse as mathematical formulas.
    """
    python_snippets = [
        "lambda x: x + 1",
        "def f(x): return x",
        "class A: pass",
        "import os",
        "for i in range(10): pass",
    ]
    for s in python_snippets:
        res = parse_latex(s)
        assert res.is_success is False


def test_null_byte_and_control_characters_rejected():
    """
    Null bytes and unprintable ASCII control characters must trigger INVALID_CHARACTER.
    """
    assert parse_latex("x\x00+y").error_code == "INVALID_CHARACTER"
    assert parse_latex("x\x01+y").error_code == "INVALID_CHARACTER"
    assert parse_latex("x\x1f+y").error_code == "INVALID_CHARACTER"
