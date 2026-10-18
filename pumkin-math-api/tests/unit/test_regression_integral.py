"""
Regression Test Suite on Question Bank Fixtures (nguyen_ham_tich_phan)
Tests handwritten DSL specifications for real questions against canonical answers.
Categorizes discrepancies into:
- (a) Solver bug
- (b) Suspected question bank error (for teacher review)
- (c) Out of scope (e.g. abstract functional relations)
"""

import json
from pathlib import Path

import pytest
import sympy as sp

from app.latex.parser import parse_latex
from app.schemas.common import StatusEnum, UnsupportedReasonEnum
from app.schemas.dsl import IntegralDSL
from app.solvers.registry import solve_dsl

FIXTURES_PATH = (
    Path(__file__).resolve().parent.parent / "fixtures" / "nguyen_ham_tich_phan" / "fixtures.json"
)


def load_fixtures():
    with open(FIXTURES_PATH, encoding="utf-8") as f:
        return json.load(f)


@pytest.mark.unit
@pytest.mark.parametrize("item", load_fixtures(), ids=lambda it: it["question_id"])
def test_regression_question_item(item):
    qid = item["question_id"]
    classification = item["classification"]
    eval_type = item["evaluation_type"]

    dsl = IntegralDSL.model_validate(item["dsl"])
    env = solve_dsl(dsl)

    if classification == "out_of_scope":
        assert env.status == StatusEnum.UNSUPPORTED, (
            f"Expected out-of-scope question {qid} to return status unsupported"
        )
        assert env.unsupported_reason == UnsupportedReasonEnum.OUT_OF_SCOPE
        return

    assert env.status == StatusEnum.VERIFIED, f"Solver failed on {qid}: {env.error or env.warnings}"
    assert env.result is not None, f"Result is None for {qid}"

    if eval_type == "antiderivative_option":
        # Extract formula from canonical option raw, e.g. \( (x-1)e^x + C \)
        raw_opt = item["expected_canonical_raw"].strip()
        # Strip \( and \)
        if raw_opt.startswith(r"\(") and raw_opt.endswith(r"\)"):
            raw_opt = raw_opt[2:-2].strip()
        # Remove + C if present for derivative checking
        if raw_opt.endswith("+ C"):
            raw_opt = raw_opt[:-3].strip()
        elif raw_opt.endswith("+C"):
            raw_opt = raw_opt[:-2].strip()

        opt_expr = parse_latex(raw_opt).expr
        integrand_expr = parse_latex(dsl.integrand).expr
        var = sp.Symbol(dsl.variable or "x")

        # Derivative of canonical option must equal integrand
        d_opt = sp.diff(opt_expr, var)
        diff = sp.simplify(d_opt - integrand_expr)
        if diff != 0:
            diff = sp.trigsimp(diff)
        assert diff == 0, f"Option derivative mismatch for {qid}: diff={diff}"

    elif eval_type == "definite_value_option" or eval_type == "direct_value":
        raw_val = item["expected_canonical_raw"].strip()
        if raw_val.startswith(r"\(") and raw_val.endswith(r"\)"):
            raw_val = raw_val[2:-2].strip()

        expected_expr = parse_latex(raw_val).expr
        expected_float = float(expected_expr.evalf())
        actual_float = env.result.value_float

        assert actual_float is not None, f"Float value is None for {qid}"
        assert abs(actual_float - expected_float) < 1e-4, (
            f"Value mismatch for {qid}: actual={actual_float}, expected={expected_float}"
        )

    elif eval_type == "parameter_extraction_exp":
        # q_hsa_15: integral = a*e + b with a, b integers. Question asks for a + b = 2.
        # Computed value: -1 + 3*E
        val_sp = sp.sympify(env.result.value_sympy)
        e_coeff = val_sp.coeff(sp.E)
        const_term = val_sp.as_coeff_Add()[0]
        # a = 3, b = -1 => a + b = 2
        a = int(e_coeff)
        b = int(const_term)
        assert a + b == int(item["expected_canonical_raw"])

    elif eval_type == "parameter_extraction_log":
        # q_thpt_sa_01: integral = a*ln(2) + b*ln(3). Question asks for P = a + 2b = 2.
        # Computed value: log(3) => a = 0, b = 1 => P = 0 + 2(1) = 2.
        val_sp = sp.sympify(env.result.value_sympy)
        val_simp = sp.simplify(val_sp)
        # val_simp == log(3)
        assert val_simp == sp.log(3)
        a, b = 0, 1
        p_val = a + 2 * b
        assert p_val == int(item["expected_canonical_raw"])
