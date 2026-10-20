"""
Unit Tests for Sequence & Progression Solver
Validates Arithmetic Progressions, Geometric Progressions, Linear Recurrence,
General Formula, and Mathematical Traps.
"""

import pytest

from app.schemas.common import StatusEnum
from app.schemas.dsl import SequenceProgressionDSL
from app.solvers.sequence import solve_sequence_progression


@pytest.mark.unit
def test_ap_nth_term_basic():
    """Validates q_hsa_05: u1 = -2, d = 5, n = 20 -> u_20 = 93."""
    dsl = SequenceProgressionDSL(
        progression_type="arithmetic",
        target="nth_term",
        u1="-2",
        d="5",
        n=20,
    )
    env = solve_sequence_progression(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.value_raw == "93"
    assert env.result.value_numeric == 93.0
    assert env.result.u1 == "-2"
    assert env.result.common_difference == "5"
    assert env.result.n == 20


@pytest.mark.unit
def test_ap_sum_n_basic():
    """Validates q_hsa_23: u1 = 4, d = 3, n = 10 -> S_10 = 175."""
    dsl = SequenceProgressionDSL(
        progression_type="arithmetic",
        target="sum_n",
        u1="4",
        d="3",
        n=10,
    )
    env = solve_sequence_progression(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.value_raw == "175"
    assert env.result.value_numeric == 175.0


@pytest.mark.unit
def test_ap_common_difference():
    """Validates finding common difference d."""
    dsl = SequenceProgressionDSL(
        progression_type="arithmetic",
        target="common_difference",
        u1="1",
        d="4",
    )
    env = solve_sequence_progression(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.value_raw == "4"


@pytest.mark.unit
def test_ap_first_term():
    """Validates finding first term u1."""
    dsl = SequenceProgressionDSL(
        progression_type="arithmetic",
        target="first_term",
        u1="7",
        d="3",
    )
    env = solve_sequence_progression(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.value_raw == "7"


@pytest.mark.unit
def test_ap_general_formula():
    """Validates general formula for AP: u_n = u1 + (n-1)d."""
    dsl = SequenceProgressionDSL(
        progression_type="arithmetic",
        target="general_formula",
        u1="3",
        d="2",
    )
    env = solve_sequence_progression(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert "2*n + 1" in env.result.value_raw or "2 n + 1" in env.result.value_raw


@pytest.mark.unit
def test_ap_find_index_valid():
    """Validates solving for index n when given u_n."""
    dsl = SequenceProgressionDSL(
        progression_type="arithmetic",
        target="find_index",
        u1="4",
        d="3",
        target_value="31",
    )
    env = solve_sequence_progression(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.n == 10
    assert env.result.value_raw == "10"


@pytest.mark.unit
def test_ap_trap_find_index_fractional_rejected():
    """Validates rejection when target_value does not correspond to an integer index in N*."""
    dsl = SequenceProgressionDSL(
        progression_type="arithmetic",
        target="find_index",
        u1="4",
        d="3",
        target_value="32",
    )
    env = solve_sequence_progression(dsl)
    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "NO_VALID_INDEX"


@pytest.mark.unit
def test_ap_trap_negative_index_rejected():
    """Validates rejection of negative index n <= 0."""
    dsl = SequenceProgressionDSL(
        progression_type="arithmetic",
        target="nth_term",
        u1="1",
        d="2",
        n=-3,
    )
    env = solve_sequence_progression(dsl)
    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "INVALID_SEQUENCE_INDEX"


@pytest.mark.unit
def test_ap_trap_zero_index_rejected():
    """Validates rejection of index n = 0."""
    dsl = SequenceProgressionDSL(
        progression_type="arithmetic",
        target="nth_term",
        u1="1",
        d="2",
        n=0,
    )
    env = solve_sequence_progression(dsl)
    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "INVALID_SEQUENCE_INDEX"


@pytest.mark.unit
def test_ap_system_of_equations():
    """Validates solving a system of equations for (u1, d): u_2 + u_5 = 10, u_3 + u_7 = 19."""
    dsl = SequenceProgressionDSL(
        progression_type="arithmetic",
        target="common_difference",
        equations=["u_2 + u_5 = 10", "u_3 + u_7 = 19"],
    )
    env = solve_sequence_progression(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.common_difference == "3"
    assert env.result.u1 == "-5/2"


@pytest.mark.unit
def test_gp_nth_term_basic():
    """Validates q_hsa_01: u1 = 3, q = 2, n = 8 -> u_8 = 384."""
    dsl = SequenceProgressionDSL(
        progression_type="geometric",
        target="nth_term",
        u1="3",
        q="2",
        n=8,
    )
    env = solve_sequence_progression(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.value_raw == "384"
    assert env.result.value_numeric == 384.0
    assert env.result.u1 == "3"
    assert env.result.common_ratio == "2"


@pytest.mark.unit
def test_gp_sum_n_basic():
    """Validates GP sum: u1 = 2, q = 3, n = 4 -> S_4 = 2*(1-81)/(1-3) = 80."""
    dsl = SequenceProgressionDSL(
        progression_type="geometric",
        target="sum_n",
        u1="2",
        q="3",
        n=4,
    )
    env = solve_sequence_progression(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.value_raw == "80"
    assert env.result.value_numeric == 80.0


@pytest.mark.unit
def test_gp_trap_q_equals_1_sum_n():
    """Validates trap q = 1 in GP: S_n = n*u1, avoids 1-q=0 division."""
    dsl = SequenceProgressionDSL(
        progression_type="geometric",
        target="sum_n",
        u1="5",
        q="1",
        n=10,
    )
    env = solve_sequence_progression(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.value_raw == "50"
    assert env.result.value_numeric == 50.0


@pytest.mark.unit
def test_gp_infinite_sum_convergent():
    """Validates infinite geometric series sum S = u1 / (1-q) when |q| < 1."""
    dsl = SequenceProgressionDSL(
        progression_type="geometric",
        target="infinite_sum",
        u1="3",
        q="1/2",
    )
    env = solve_sequence_progression(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.value_raw == "6"
    assert env.result.value_numeric == 6.0


@pytest.mark.unit
def test_gp_trap_infinite_sum_divergent_ge_1():
    """Validates rejection of divergent infinite geometric series (|q| >= 1)."""
    dsl = SequenceProgressionDSL(
        progression_type="geometric",
        target="infinite_sum",
        u1="3",
        q="2",
    )
    env = solve_sequence_progression(dsl)
    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "DIVERGENT_GEOMETRIC_SERIES"


@pytest.mark.unit
def test_gp_trap_infinite_sum_divergent_negative_one():
    """Validates rejection when q = -1 in infinite series."""
    dsl = SequenceProgressionDSL(
        progression_type="geometric",
        target="infinite_sum",
        u1="5",
        q="-1",
    )
    env = solve_sequence_progression(dsl)
    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "DIVERGENT_GEOMETRIC_SERIES"


@pytest.mark.unit
def test_gp_system_of_equations_positive_constraint():
    """Validates GP system: u_4 - u_2 = 72, u_5 - u_3 = 144 -> u1=12, q=2."""
    dsl = SequenceProgressionDSL(
        progression_type="geometric",
        target="common_ratio",
        equations=["u_4 - u_2 = 72", "u_5 - u_3 = 144"],
        positive_terms_only=True,
    )
    env = solve_sequence_progression(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.common_ratio == "2"
    assert env.result.u1 == "12"


@pytest.mark.unit
def test_linear_recurrence_order2_canonical():
    """Validates q_tsa_04: a_n = 5a_{n-1} - 6a_{n-2}, a_1 = 5, a_2 = 13, n = 10 -> a_10 = 60073."""
    dsl = SequenceProgressionDSL(
        progression_type="linear_recurrence",
        target="nth_term",
        u1="5",
        u2="13",
        recurrence_coeffs=["5", "-6"],
        n=10,
    )
    env = solve_sequence_progression(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.value_raw == "60073"
    assert env.result.value_numeric == 60073.0


@pytest.mark.unit
def test_linear_recurrence_order1():
    """Validates linear recurrence order 1: u_n = 2u_{n-1} + 3, u_1 = 1, n = 4 -> u_4 = 29."""
    dsl = SequenceProgressionDSL(
        progression_type="linear_recurrence",
        target="nth_term",
        u1="1",
        recurrence_coeffs=["2", "3"],
        n=4,
    )
    env = solve_sequence_progression(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.value_raw == "29"
    assert env.result.value_numeric == 29.0


@pytest.mark.unit
def test_general_term_formula():
    """Validates explicit formula u_n = (2n - 1)/(n + 1) for n = 3 -> u_3 = 5/4."""
    dsl = SequenceProgressionDSL(
        progression_type="general_term",
        target="nth_term",
        general_term_formula="(2*n - 1)/(n + 1)",
        n=3,
    )
    env = solve_sequence_progression(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.value_raw == "5/4"
    assert env.result.value_numeric == 1.25


@pytest.mark.unit
def test_general_term_find_index_valid():
    """Validates finding index n from formula u_n = (2n - 1)/(n + 1) = 5/4 -> n = 3."""
    dsl = SequenceProgressionDSL(
        progression_type="general_term",
        target="find_index",
        general_term_formula="(2*n - 1)/(n + 1)",
        target_value="5/4",
    )
    env = solve_sequence_progression(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.n == 3
    assert env.result.value_raw == "3"


@pytest.mark.unit
def test_general_term_find_index_invalid():
    """Validates finding index n when target_value is not in sequence -> NO_VALID_INDEX."""
    dsl = SequenceProgressionDSL(
        progression_type="general_term",
        target="find_index",
        general_term_formula="(2*n - 1)/(n + 1)",
        target_value="2",
    )
    env = solve_sequence_progression(dsl)
    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "NO_VALID_INDEX"


@pytest.mark.unit
def test_pedagogical_step_trace_completeness():
    """Validates completeness of pedagogical step tracing for Prompt 8 tutoring."""
    dsl = SequenceProgressionDSL(
        progression_type="arithmetic",
        target="nth_term",
        u1="-2",
        d="5",
        n=20,
    )
    env = solve_sequence_progression(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert len(env.steps) >= 3
    for step in env.steps:
        assert step.id != ""
        assert step.latex != ""
        assert step.note_vi != ""
        assert step.value is not None
