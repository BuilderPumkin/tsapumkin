"""
Web Question Bank Exporter (app/generator/web_export.py)
Converts generated question items into JSON format matching data/questions/all.json schema.
"""

import json
from pathlib import Path
from typing import Any

from app.schemas.generate import GeneratedQuestionItem


def question_to_web_dict(q: GeneratedQuestionItem) -> dict[str, Any]:
    """
    Transforms a GeneratedQuestionItem into the canonical web question dictionary
    compatible with data/questions/all.json schema version 2.0.
    """
    # Map cognitive level to Vietnamese difficulty label
    diff_label = "Dễ"
    if q.difficulty.value == "M2":
        diff_label = "Trung bình"
    elif q.difficulty.value in ("M3", "M4"):
        diff_label = "Khó"

    diff_score = q.difficulty_score or (0.35 if q.difficulty.value == "M1" else 0.55)

    distractor_list = []
    misconception_traps_map = {}
    for d in q.distractors:
        m_id = (
            d.misconception_id.value
            if hasattr(d.misconception_id, "value")
            else str(d.misconception_id)
        )
        distractor_list.append(
            {
                "optionId": d.option_index,
                "misconceptionId": m_id,
                "description_vi": d.explanation_vi,
                "skillIds": q.skills or ["skill_calculation"],
                "severity": "high",
                "remediationHint": d.explanation_vi,
                "needs_teacher_review": True,
            }
        )
        misconception_traps_map[str(d.option_index)] = d.explanation_vi

    return {
        "id": q.id,
        "type": "single_choice",
        "subject": "Mathematics",
        "exam_type": "TSA",
        "grade": "Toán 12",
        "topic": q.topic or "Giải tích",
        "subtopic": q.subtopic or "Toán học",
        "skills": q.skills or ["skill_calculation"],
        "difficulty": diff_label,
        "difficulty_score": diff_score,
        "cognitive_level": q.difficulty.value,
        "estimated_time_seconds": 90 if q.difficulty.value in ("M1", "M2") else 120,
        "question": q.question_text,
        "options": q.options,
        "correct_answer": q.correct_index,
        "items": None,
        "correct_value": None,
        "explanation": q.explanation_vi,
        "common_traps": [d.explanation_vi for d in q.distractors],
        "prerequisites": [],
        "year": 2025,
        "source_type": "generated",
        "source": "Pumkin Math AI Generator (Circle Verified)",
        "license": "CC BY-NC-SA 4.0",
        "tags": [q.category, q.difficulty.value, "CircleVerified"],
        "knowledge_id": f"kb_{q.category}",
        "status": "needs_teacher_review",
        "schema_version": "2.0",
        "socratic_hints": q.socratic_hints,
        "misconception_traps": misconception_traps_map,
        "question_text": q.question_text,
        "needs_manual_review": True,
        "distractors": distractor_list,
    }


def export_questions_to_web_json(
    questions: list[GeneratedQuestionItem],
    output_path: Path | str,
) -> None:
    """
    Exports a list of GeneratedQuestionItem objects to a JSON file matching all.json schema.
    """
    web_items = [question_to_web_dict(q) for q in questions]
    path = Path(output_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(web_items, f, ensure_ascii=False, indent=2)
