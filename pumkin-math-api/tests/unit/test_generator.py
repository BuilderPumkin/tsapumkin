"""
Unit & Acceptance Tests for Deterministic Problem Generator Engine (Prompt 9)
Validates:
1. Generation of 100 questions with 100% circle-verification, 0 duplicates, and distinct distractors.
2. Deterministic reproducibility with random seeds.
3. All 3 distractors correspond to valid student misconception traps.
4. Adversarial LLM rephrase rejection on altered numbers or invalid KaTeX.
5. Exact compatibility with web question bank schema (data/questions/all.json).
6. FastAPI endpoint /v1/generate integration.
"""

from __future__ import annotations

import json
from pathlib import Path

import pytest

from app.generator.engine import generate_questions
from app.generator.llm_rephraser import rephrase_question_with_llm
from app.generator.templates.registry import ALL_TEMPLATES, get_all_supported_categories
from app.generator.web_export import export_questions_to_web_json, question_to_web_dict
from app.parser.llm_client import FakeLLMClient
from app.schemas.generate import DifficultyEnum, GenerateRequest
from app.schemas.traps import MisconceptionTrapEnum


@pytest.mark.unit
@pytest.mark.asyncio
async def test_generate_100_questions_circle_verified_zero_duplicates():
    """
    Acceptance Criteria 1: Generate 100 questions across all domains:
    - 100% pass circle verification.
    - 0 duplicate questions (unique hashes).
    - All options distinct (len(set(options)) == 4).
    - Every distractor is mathematically distinct from the correct answer.
    """
    payload = await generate_questions(
        category="all",
        difficulty=DifficultyEnum.M2,
        count=100,
        seed=2026,
    )

    assert payload.count == 100, f"Expected 100 generated questions, got {payload.count}"
    assert len(payload.questions) == 100

    seen_hashes = set()
    for q in payload.questions:
        # 1. Deduplication: Hash must be unique
        assert q.hash is not None
        assert q.hash not in seen_hashes, f"Duplicate question hash detected: {q.hash}"
        seen_hashes.add(q.hash)

        # 2. Options integrity
        assert len(q.options) == 4, f"Question {q.id} must have exactly 4 options"
        assert len(set(q.options)) == 4, f"Question {q.id} has colliding options: {q.options}"

        # 3. Correct answer matching
        assert 0 <= q.correct_index <= 3
        assert q.options[q.correct_index] == q.correct_answer

        # 4. Distractors validation
        assert len(q.distractors) == 3, f"Question {q.id} must have 3 distractors"
        for d in q.distractors:
            assert d.latex != q.correct_answer, (
                f"Distractor {d.latex} matches correct answer {q.correct_answer}"
            )
            assert d.option_index != q.correct_index
            assert q.options[d.option_index] == d.latex
            # Check valid misconception ID
            assert isinstance(d.misconception_id, MisconceptionTrapEnum)
            assert str(d.misconception_id).startswith(("MIS_", "TRAP_"))

        # 5. Metadata completeness
        assert q.difficulty_score is not None
        assert q.topic is not None
        assert q.subtopic is not None
        assert len(q.skills) > 0


@pytest.mark.unit
@pytest.mark.asyncio
async def test_deterministic_seed_reproducibility():
    """Generating with the exact same seed must produce identical questions."""
    req1 = GenerateRequest(category="nguyen_ham_tich_phan", count=5, seed=12345)
    req2 = GenerateRequest(category="nguyen_ham_tich_phan", count=5, seed=12345)

    res1 = await generate_questions(req1)
    res2 = await generate_questions(req2)

    assert res1.count == res2.count == 5
    for q1, q2 in zip(res1.questions, res2.questions, strict=True):
        assert q1.id == q2.id
        assert q1.question_text == q2.question_text
        assert q1.options == q2.options
        assert q1.correct_index == q2.correct_index
        assert q1.correct_answer == q2.correct_answer


@pytest.mark.unit
@pytest.mark.asyncio
async def test_templates_coverage_across_all_domains():
    """Verify that every single registered template generates valid circle-verified questions."""
    assert len(ALL_TEMPLATES) >= 12
    categories = get_all_supported_categories()
    assert len(categories) >= 7

    for cat in categories:
        req = GenerateRequest(category=cat, count=2, seed=999)
        payload = await generate_questions(req)
        assert payload.count == 2, f"Failed generating 2 questions for category {cat}"


@pytest.mark.adversarial
@pytest.mark.asyncio
async def test_llm_rephrase_preserves_numbers_and_rejects_hallucinations():
    """
    Acceptance Criteria 6 & Adversarial:
    1. Faithful LLM rephrase with identical numbers is accepted.
    2. Hallucinated number (altered value) is REJECTED and falls back to template.
    3. Added extra number is REJECTED and falls back to template.
    4. Invalid KaTeX is REJECTED and falls back to template.
    """
    orig_text = "Tính tích phân xác định \\(I = \\int_{0}^{2} (2x + 1) \\, dx\\)."

    # Case 1: Faithful LLM rephrase
    client_faithful = FakeLLMClient(
        canned_responses=[
            {
                "rephrased_question": "Em hãy tính giá trị tích phân xác định \\(I = \\int_{0}^{2} (2x + 1) \\, dx\\)."
            }
        ]
    )
    text1, accepted1 = await rephrase_question_with_llm(client_faithful, orig_text)
    assert accepted1 is True
    assert "Em hãy tính" in text1

    # Case 2: Hallucinated number (altered 2 into 99)
    client_alien_number = FakeLLMClient(
        canned_responses=[
            {
                "rephrased_question": "Tính tích phân xác định \\(I = \\int_{0}^{99} (2x + 1) \\, dx\\)."
            }
        ]
    )
    text2, accepted2 = await rephrase_question_with_llm(client_alien_number, orig_text)
    assert accepted2 is False
    assert text2 == orig_text  # Safe fallback

    # Case 3: Added alien number
    client_extra_number = FakeLLMClient(
        canned_responses=[
            {
                "rephrased_question": "Trong 5 phút, hãy tính tích phân \\(I = \\int_{0}^{2} (2x + 1) \\, dx\\)."
            }
        ]
    )
    text3, accepted3 = await rephrase_question_with_llm(client_extra_number, orig_text)
    assert accepted3 is False
    assert text3 == orig_text

    # Case 4: Raw dollar sign KaTeX violation
    client_raw_dollar = FakeLLMClient(
        canned_responses=[{"rephrased_question": "Tính tích phân $I = \\int_{0}^{2} (2x + 1) dx$."}]
    )
    text4, accepted4 = await rephrase_question_with_llm(client_raw_dollar, orig_text)
    assert accepted4 is False
    assert text4 == orig_text


@pytest.mark.unit
@pytest.mark.asyncio
async def test_web_question_bank_export_schema_compatibility(tmp_path: Path):
    """
    Acceptance Criteria 7: Generated output must be exportable to JSON matching
    all.json schema (data/questions/all.json).
    """
    req = GenerateRequest(category="all", count=10, seed=777)
    payload = await generate_questions(req)
    assert payload.count == 10

    # 1. Test question_to_web_dict fields
    for q in payload.questions:
        w_dict = question_to_web_dict(q)
        assert w_dict["type"] == "single_choice"
        assert w_dict["exam_type"] == "TSA"
        assert w_dict["schema_version"] == "2.0"
        assert len(w_dict["options"]) == 4
        assert w_dict["correct_answer"] == q.correct_index
        assert len(w_dict["distractors"]) == 3
        for d in w_dict["distractors"]:
            assert "optionId" in d
            assert "misconceptionId" in d
            assert "description_vi" in d
            assert "severity" in d
            assert "remediationHint" in d
            assert d["misconceptionId"].startswith(("MIS_", "TRAP_"))

    # 2. Test export to JSON file
    out_file = tmp_path / "test_generated_questions.json"
    export_questions_to_web_json(payload.questions, out_file)
    assert out_file.exists()

    with open(out_file, encoding="utf-8") as f:
        loaded = json.load(f)
    assert isinstance(loaded, list)
    assert len(loaded) == 10
    assert loaded[0]["id"] == payload.questions[0].id


@pytest.mark.unit
def test_generate_endpoint_http_integration(auth_client):
    """Verify POST /v1/generate endpoint returns HTTP 200 with verified payload."""
    resp = auth_client.post(
        "/v1/generate",
        json={"category": "dai_so_ma_tran_dinh_thuc", "count": 2, "seed": 42},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "verified"
    assert data["result"]["count"] == 2
    assert len(data["result"]["questions"]) == 2
    q0 = data["result"]["questions"][0]
    assert q0["category"] == "dai_so_ma_tran_dinh_thuc"
    assert len(q0["options"]) == 4
    assert q0["options"][q0["correct_index"]] == q0["correct_answer"]
