"""
Unit Tests for Last Digit & Modular Exponentiation Solver
Verifies:
- Standard single last digit mod 10 for all digit periods (1, 2, 4)
- Traps: Exponent modulo 0 trap (e.g. 2^4 mod 10 == 6, not 1)
- Tower of powers a^{b^c} (e.g. 7^{9^9} mod 10 == 7)
- Two last digits mod 100 with zero padding (e.g. 7^4 mod 100 == '01', 2^100 mod 100 == '76')
- Boundary conditions: 0^0 indeterminate, a^0 == 1, 0^b == 0
- Rejection of invalid inputs: negative exponents, fractional bases, invalid syntax
- General modular arithmetic (e.g. 3^{100} mod 13 == 3)
- Pedagogical step tracing completeness (id, latex, note_vi, value)
"""

import pytest

from app.schemas.common import StatusEnum
from app.schemas.dsl import LastDigitDSL
from app.solvers.registry import solve_dsl


@pytest.mark.unit
def test_last_digit_base_7_canonical():
    """Canonical question q_tsa_num_01: last digit of 2027^{2026} mod 10 is 9."""
    dsl = LastDigitDSL(base="2027", exponent="2026")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.last_digits_str == "9"
    assert env.result.last_digits_int == 9
    assert env.result.cycle_period == 4
    assert env.result.exponent_reduced == 2


@pytest.mark.unit
def test_trap_exponent_zero_mod_period_base_2():
    """Trap: 2^4 = 16 mod 10 is 6. Blind remainder 4 % 4 = 0 would erroneously give 2^0 = 1."""
    dsl = LastDigitDSL(base="2", exponent="4")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.last_digits_str == "6"
    assert env.result.exponent_reduced == 4


@pytest.mark.unit
def test_last_digit_base_ending_in_0():
    """Numbers ending in 0 always have last digit 0 for positive powers."""
    dsl = LastDigitDSL(base="120", exponent="2025")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.last_digits_str == "0"


@pytest.mark.unit
def test_last_digit_base_ending_in_1():
    """Numbers ending in 1 always have last digit 1."""
    dsl = LastDigitDSL(base="341", exponent="999")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.last_digits_str == "1"


@pytest.mark.unit
def test_last_digit_base_ending_in_5():
    """Numbers ending in 5 always have last digit 5 for positive powers."""
    dsl = LastDigitDSL(base="55", exponent="1234")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.last_digits_str == "5"


@pytest.mark.unit
def test_last_digit_base_ending_in_6():
    """Numbers ending in 6 always have last digit 6 for positive powers."""
    dsl = LastDigitDSL(base="76", exponent="4321")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.last_digits_str == "6"


@pytest.mark.unit
def test_last_digit_base_period_2_base_4():
    """Base 4 has period 2: 4^1 = 4, 4^2 = 6."""
    dsl_odd = LastDigitDSL(base="4", exponent="2025")
    assert solve_dsl(dsl_odd).result.last_digits_str == "4"

    dsl_even = LastDigitDSL(base="4", exponent="2026")
    assert solve_dsl(dsl_even).result.last_digits_str == "6"


@pytest.mark.unit
def test_last_digit_base_period_2_base_9():
    """Base 9 has period 2: 9^odd = 9, 9^even = 1."""
    dsl_odd = LastDigitDSL(base="9", exponent="2027")
    assert solve_dsl(dsl_odd).result.last_digits_str == "9"

    dsl_even = LastDigitDSL(base="9", exponent="2028")
    assert solve_dsl(dsl_even).result.last_digits_str == "1"


@pytest.mark.unit
def test_last_digit_base_3_period_4():
    """Base 3: 3^1=3, 3^2=9, 3^3=7, 3^4=1. 3^{100} has 100 % 4 == 0 -> last digit 1."""
    dsl = LastDigitDSL(base="3", exponent="100")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.last_digits_str == "1"


@pytest.mark.unit
def test_last_digit_base_8_period_4():
    """Base 8: 8^1=8, 8^2=4, 8^3=2, 8^4=6. 8^{2023} has 2023 % 4 = 3 -> last digit 2."""
    dsl = LastDigitDSL(base="8", exponent="2023")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.last_digits_str == "2"


@pytest.mark.unit
def test_two_last_digits_mod_100():
    """Two last digits: 2^{100} mod 100 == 76."""
    dsl = LastDigitDSL(base="2", exponent="100", modulus_digits=2)
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.last_digits_str == "76"
    assert env.result.effective_modulus == 100


@pytest.mark.unit
def test_two_last_digits_zero_padding():
    """Two last digits: 7^4 = 2401 mod 100 == '01' (must preserve leading zero)."""
    dsl = LastDigitDSL(base="7", exponent="4", modulus_digits=2)
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.last_digits_str == "01"


@pytest.mark.unit
def test_tower_of_powers_7_9_9():
    """Tower of powers: 7^(9^9) mod 10. Period of 7 mod 10 is 4. 9^9 mod 4 = 1 -> 7^1 = 7."""
    dsl = LastDigitDSL(base="7", exponent="9", tower_exponent="9")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.last_digits_str == "7"


@pytest.mark.unit
def test_tower_of_powers_caret_syntax():
    """Tower of powers using '3^4' string in exponent: 2^(3^4) = 2^81 mod 10 == 2."""
    dsl = LastDigitDSL(base="2", exponent="3^4")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.last_digits_str == "2"


@pytest.mark.unit
def test_zero_exponent_equals_one():
    """Boundary: 2027^0 == 1."""
    dsl = LastDigitDSL(base="2027", exponent="0")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.last_digits_str == "1"


@pytest.mark.unit
def test_zero_base_positive_exponent():
    """Boundary: 0^{2026} == 0."""
    dsl = LastDigitDSL(base="0", exponent="2026")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.last_digits_str == "0"


@pytest.mark.unit
def test_trap_indeterminate_form_zero_power_zero():
    """Trap: 0^0 is indeterminate and must return error."""
    dsl = LastDigitDSL(base="0", exponent="0")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "INDETERMINATE_FORM_ZERO_POWER_ZERO"


@pytest.mark.unit
def test_trap_negative_exponent_rejected():
    """Trap: negative exponent does not produce an integer."""
    dsl = LastDigitDSL(base="2", exponent="-3")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "NEGATIVE_EXPONENT"


@pytest.mark.unit
def test_trap_non_integer_base_rejected():
    """Trap: non-integer base is rejected."""
    dsl = LastDigitDSL(base="2.5", exponent="3")
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "INVALID_BASE"


@pytest.mark.unit
def test_arbitrary_prime_modulo_canonical():
    """Canonical question q_tsa_num_02: 3^{100} mod 13 == 3."""
    dsl = LastDigitDSL(base="3", exponent="100", modulo=13)
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.last_digits_str == "3"
    assert env.result.effective_modulus == 13


@pytest.mark.unit
def test_pedagogical_step_trace_completeness():
    """All intermediate steps must have non-empty id, latex, note_vi, and value."""
    dsl = LastDigitDSL(base="2027", exponent="2026")
    env = solve_dsl(dsl)

    assert len(env.steps) >= 4
    for step in env.steps:
        assert step.id.strip() != ""
        assert step.latex.strip() != ""
        assert step.note_vi.strip() != ""
        assert step.value is not None
