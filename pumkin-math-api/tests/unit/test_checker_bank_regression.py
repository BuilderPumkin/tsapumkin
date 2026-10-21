"""
Regression Test Suite: Question Bank Canonical Self-Verification
Loads all items from data/questions/all.json and verifies that when the canonical answer
is submitted as the student answer, the checker returns is_correct=True and verdict=correct.
Strictly enforces Criterion #1: Zero False Negatives.
"""

import json
import os
from pathlib import Path

import pytest

from app.checker.checker import check_student_submission
from app.schemas.check import AnswerTypeEnum, CheckRequest, CheckVerdictEnum

env_path = os.environ.get("QUESTION_BANK_PATH")
CANDIDATE_PATHS = ([Path(env_path)] if env_path else []) + [
    Path(__file__).resolve().parent.parent.parent / "bench" / "data" / "all.json",
    Path(__file__).resolve().parent.parent.parent.parent
    / "public"
    / "data"
    / "questions"
    / "all.json",
    Path(__file__).resolve().parent.parent.parent.parent
    / "pumkin3"
    / "data"
    / "questions"
    / "all.json",
    Path(__file__).resolve().parent.parent.parent.parent / "data" / "questions" / "all.json",
    Path(__file__).resolve().parent.parent.parent.parent.parent / "data" / "questions" / "all.json",
]
ALL_QUESTIONS_PATH = next((p for p in CANDIDATE_PATHS if p.exists()), CANDIDATE_PATHS[0])


def load_canonical_test_items():
    if not ALL_QUESTIONS_PATH.exists():
        pytest.skip(f"Question bank not found at {ALL_QUESTIONS_PATH}")

    with open(ALL_QUESTIONS_PATH, encoding="utf-8") as f:
        data = json.load(f)

    items = []
    for q in data:
        qid = q.get("id")
        qtype = q.get("type")
        ca = q.get("correct_answer")
        cv = q.get("correct_value")

        if qtype == "single_choice":
            # correct_answer is int 0..3 or str A..D
            items.append(
                {
                    "id": qid,
                    "type": AnswerTypeEnum.MULTIPLE_CHOICE,
                    "canonical": str(ca),
                }
            )
        elif qtype == "short_answer":
            ans_str = str(ca if ca is not None else cv)
            items.append(
                {
                    "id": qid,
                    "type": AnswerTypeEnum.NUMBER,
                    "canonical": ans_str,
                }
            )
        elif qtype == "step_solution":
            ans_str = str(ca if ca is not None else cv)
            items.append(
                {
                    "id": qid,
                    "type": AnswerTypeEnum.STEP_SOLUTION,
                    "canonical": ans_str,
                }
            )
        elif qtype == "true_false_group":
            if isinstance(ca, dict):
                items.append(
                    {
                        "id": qid,
                        "type": AnswerTypeEnum.BOOLEAN_GROUP,
                        "canonical": json.dumps(ca, sort_keys=True),
                    }
                )
    return items


@pytest.mark.unit
def test_all_bank_canonical_answers_self_verify():
    """
    Criterion #1 Check: Submitting canonical answer as student answer
    must ALWAYS yield is_correct=True and verdict=correct.
    """
    items = load_canonical_test_items()
    assert len(items) >= 500, f"Expected at least 500 testable questions, found {len(items)}"

    failures = []
    for item in items:
        req = CheckRequest(
            question_id=item["id"],
            canonical_answer=item["canonical"],
            student_answer=item["canonical"],
            answer_type=item["type"],
        )
        res = check_student_submission(req)
        if not (res.result.is_correct is True and res.result.verdict == CheckVerdictEnum.CORRECT):
            failures.append(
                (item["id"], item["canonical"], res.result.verdict, res.result.is_correct)
            )

    assert not failures, (
        f"Found {len(failures)} canonical answers failing self-verification: {failures[:10]}"
    )
