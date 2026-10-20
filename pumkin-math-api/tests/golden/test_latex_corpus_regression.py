"""
Golden Corpus Tests for LaTeX Parser
Tests 250 real-world LaTeX mathematical snippets extracted directly from
the PUMKIN question bank (data/questions/all.json).
Verifies deterministic SymPy AST construction, variable extractions,
and mathematical domain constraint consistency.
"""

import json
import os

import pytest

from app.latex import parse_latex

CASES_FILE = os.path.join(os.path.dirname(__file__), "latex_corpus_cases.json")


def load_corpus_cases():
    with open(CASES_FILE, encoding="utf-8") as f:
        return json.load(f)


CORPUS_CASES = load_corpus_cases()


def test_corpus_size():
    """Verify that the golden test suite contains at least 200 real corpus cases."""
    assert len(CORPUS_CASES) >= 200, f"Expected >= 200 cases, found {len(CORPUS_CASES)}"


@pytest.mark.parametrize("case", CORPUS_CASES, ids=lambda c: f"{c['qid']}::{c['latex'][:30]}")
def test_real_latex_snippet(case):
    """
    Validates each real LaTeX snippet against its verified symbolic representation.
    """
    latex_str = case["latex"]
    expected_repr = case["expected_repr"]
    expected_vars = case["variables"]
    expected_num_constraints = case["num_constraints"]

    res = parse_latex(latex_str)

    if case.get("expected_rejection"):
        assert res.is_success is False, f"Expected rejection for '{latex_str}', but got success"
        if "expected_error_code" in case:
            assert res.error_code == case["expected_error_code"]
        return

    assert res.is_success is True, f"Failed parsing: {latex_str} | Reason: {res.reason_vi}"
    assert repr(res.expr) == expected_repr, (
        f"Mismatch for '{latex_str}':\n  Got:      {repr(res.expr)}\n  Expected: {expected_repr}"
    )
    assert res.variables == expected_vars
    assert len(res.constraints) == expected_num_constraints
