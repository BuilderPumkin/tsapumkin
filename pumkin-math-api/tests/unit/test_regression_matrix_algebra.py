"""
Regression Test Suite on Question Bank Fixtures (dai_so_ma_tran_dinh_thuc)
Tests handwritten DSL specifications for real questions against canonical answers.
Categorizes discrepancies into:
- (a) Solver bug
- (b) Suspected question bank error (for teacher review)
- (c) Out of scope
"""

import json
from pathlib import Path

import pytest
import sympy as sp
from pydantic import TypeAdapter

from app.schemas.common import StatusEnum
from app.schemas.dsl import MathProblemDSL, MatrixAlgebraDSL
from app.solvers.registry import solve_dsl

FIXTURES_PATH = (
    Path(__file__).resolve().parent.parent / "fixtures" / "dai_so_ma_tran" / "fixtures.json"
)

math_problem_adapter = TypeAdapter(MathProblemDSL)


def load_fixtures():
    with open(FIXTURES_PATH, encoding="utf-8") as f:
        return json.load(f)


@pytest.mark.unit
@pytest.mark.parametrize("item", load_fixtures(), ids=lambda it: it["question_id"])
def test_regression_matrix_item(item):
    qid = item["question_id"]
    classification = item["classification"]
    eval_type = item["evaluation_type"]

    if classification == "out_of_scope":
        dsl_obj = math_problem_adapter.validate_python(item["dsl"])
        assert dsl_obj.type == "unsupported"
        env = solve_dsl(dsl_obj)
        assert env.status == StatusEnum.UNSUPPORTED, (
            f"Expected out-of-scope question {qid} to return status unsupported"
        )
        assert env.unsupported_reason is not None
        return

    dsl = MatrixAlgebraDSL.model_validate(item["dsl"])
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED, f"Solver failed on {qid}: {env.error or env.warnings}"
    assert env.result is not None, f"Result is None for {qid}"

    expected = item["expected_canonical_raw"]

    if eval_type == "scalar_exact":
        actual_str = env.result.value_raw.strip()
        expected_str = str(expected).strip()
        assert actual_str == expected_str, (
            f"Scalar mismatch on {qid}: actual='{actual_str}', expected='{expected_str}'"
        )

    elif eval_type == "matrix_grid":
        actual_grid = env.result.matrix_result_grid
        assert actual_grid is not None, f"Matrix grid is None for {qid}"
        # Check dimensions
        assert len(actual_grid) == len(expected)
        for r_idx in range(len(expected)):
            assert len(actual_grid[r_idx]) == len(expected[r_idx])
            for c_idx in range(len(expected[r_idx])):
                act_val = actual_grid[r_idx][c_idx]
                exp_val = expected[r_idx][c_idx]
                # Compare via SymPy equality
                diff = sp.simplify(sp.Rational(act_val) - sp.Rational(exp_val))
                assert diff == 0, (
                    f"Grid element mismatch at ({r_idx}, {c_idx}) on {qid}: "
                    f"actual='{act_val}', expected='{exp_val}'"
                )

    elif eval_type == "system_variable_i2":
        # Question asks specifically for branch current I_2
        # Variable order: [I_1, I_2, I_3]
        vec = env.result.vector_result
        assert vec is not None and len(vec) >= 2, f"Vector result invalid for {qid}"
        i2_val = sp.Rational(vec[1])
        expected_val = sp.Rational(str(expected))
        assert i2_val == expected_val, (
            f"Current I_2 mismatch on {qid}: actual={i2_val}, expected={expected_val}"
        )

    elif eval_type == "eigenvalue_set":
        actual_eigs = env.result.eigenvalues
        assert actual_eigs is not None
        act_set = {sp.Rational(e) for e in actual_eigs}
        exp_set = {sp.Rational(e) for e in expected}
        assert act_set == exp_set, (
            f"Eigenvalue set mismatch on {qid}: actual={act_set}, expected={exp_set}"
        )

    elif eval_type == "solution_set":
        actual_sols = env.result.solutions
        assert actual_sols is not None
        act_set = {sp.Rational(s) for s in actual_sols}
        exp_set = {sp.Rational(s) for s in expected}
        assert act_set == exp_set, (
            f"Solution set mismatch on {qid}: actual={act_set}, expected={exp_set}"
        )
