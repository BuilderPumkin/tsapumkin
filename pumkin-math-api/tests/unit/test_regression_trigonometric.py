"""
Regression Test Suite on Question Bank Fixtures (ham_so_luong_giac_phuong_trinh)
Tests handwritten DSL specifications for real questions against canonical answers.
Categorizes discrepancies into:
- (a) Solver bug
- (b) Suspected question bank error (for teacher review)
- (c) Out of scope
"""

import json
import math
from pathlib import Path

import pytest
import sympy as sp
from pydantic import TypeAdapter

from app.schemas.common import StatusEnum
from app.schemas.dsl import MathProblemDSL, TrigonometricDSL
from app.solvers.registry import solve_dsl

FIXTURES_PATH = Path(__file__).resolve().parent.parent / "fixtures" / "luong_giac" / "fixtures.json"

math_problem_adapter = TypeAdapter(MathProblemDSL)


def load_fixtures():
    with open(FIXTURES_PATH, encoding="utf-8") as f:
        return json.load(f)


@pytest.mark.unit
@pytest.mark.parametrize("item", load_fixtures(), ids=lambda it: it["question_id"])
def test_regression_trigonometric_item(item):
    qid = item["question_id"]
    classification = item["classification"]

    if classification == "out_of_scope":
        dsl_obj = math_problem_adapter.validate_python(item["dsl"])
        assert dsl_obj.type == "unsupported"
        env = solve_dsl(dsl_obj)
        assert env.status == StatusEnum.UNSUPPORTED, (
            f"Expected out-of-scope question {qid} to return status unsupported"
        )
        assert env.unsupported_reason is not None
        return

    dsl = TrigonometricDSL.model_validate(item["dsl"])
    env = solve_dsl(dsl)

    assert env.status == StatusEnum.VERIFIED, f"Solver failed on {qid}: {env.error or env.warnings}"
    assert env.result is not None, f"Result is None for {qid}"

    expected_str = str(item["expected_canonical_raw"]).strip()
    actual_str = str(env.result.value_raw).strip()

    # Exact string match or symbolic equivalence
    if actual_str != expected_str:
        exp_sym = sp.sympify(expected_str)
        act_sym = sp.sympify(actual_str)
        diff = sp.simplify(exp_sym - act_sym)
        assert diff == 0, f"Mismatch on {qid}: actual='{actual_str}', expected='{expected_str}'"

    # Numeric check if applicable
    if env.result.value_numeric is not None:
        expected_num = float(sp.sympify(expected_str).evalf())
        assert math.isclose(env.result.value_numeric, expected_num, rel_tol=1e-5), (
            f"Numeric mismatch on {qid}: actual={env.result.value_numeric}, expected={expected_num}"
        )
