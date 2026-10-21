#!/usr/bin/env python3
"""
Batch Offline Verification Tool (tools/batch_verify_questions.py)
Executes deterministic CAS batch verification on data/questions/all.json using Pumkin Math API.
Features:
- Purely ADDITIVE metadata: verified {status, method, api_version, checked_at}
- Adds structured steps[] for verified questions with teacher_approved=False
- Increments schema_version to '2.1.0'
- Preserves raw source answers intact (NEVER mutates raw correct answers)
- Generates review/answer_mismatch.json for teacher queue
- Sets up data/overrides/answer_overrides.json infrastructure
"""

from __future__ import annotations

import json
import os
import sys
from datetime import datetime, timezone
from typing import Any

# Ensure UTF-8 output on Windows
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PUMKIN_API_DIR = os.path.join(ROOT_DIR, "PUMKIN2", "pumkin-math-api")
if PUMKIN_API_DIR not in sys.path:
    sys.path.insert(0, PUMKIN_API_DIR)

from pydantic import TypeAdapter
from app.main import app as math_api_app
from app.schemas.dsl import MathProblemDSL
from app.solvers.registry import solve_dsl
from bench.runner import execute_benchmark_suite, SOLVER_DISCREPANCY_EXPLANATIONS


def run_batch_verification() -> dict[str, Any]:
    print("=" * 70)
    print("PUMKIN MATH API - OFFLINE BATCH VERIFICATION ENGINE")
    print(f"API Version: {math_api_app.version}")
    print("=" * 70)

    # 1. Execute benchmark suite in solver_only mode across 553 bank questions
    print("[1/5] Executing deterministic CAS solver suite across bank items...")
    summary, results = execute_benchmark_suite(mode="solver_only", include_adversarial=False)
    
    bank_results_map = {r.id: r for r in results if not r.is_adversarial}
    print(f"      Evaluated {len(bank_results_map)} items from question bank.")

    # 2. Load original questions data/questions/all.json
    questions_path = os.path.join(ROOT_DIR, "data", "questions", "all.json")
    with open(questions_path, "r", encoding="utf-8") as f:
        raw_questions: list[dict[str, Any]] = json.load(f)

    now_iso = datetime.now(timezone.utc).isoformat()
    api_version = math_api_app.version or "0.1.0"
    adapter = TypeAdapter(MathProblemDSL)

    verified_count = 0
    needs_review_count = 0
    unsupported_count = 0
    mismatch_items: list[dict[str, Any]] = []

    # 3. Enrich each question additively
    print("[2/5] Enriching questions with additive 'verified' metadata and structured 'steps[]'...")
    enriched_questions: list[dict[str, Any]] = []

    for q in raw_questions:
        qid = q.get("id", "")
        item_res = bank_results_map.get(qid)
        
        # Incremented schema_version
        q["schema_version"] = "2.1.0"

        if item_res is None or item_res.status == "unsupported":
            unsupported_count += 1
            q["verified"] = {
                "status": "unsupported",
                "method": "none",
                "api_version": api_version,
                "checked_at": now_iso
            }
            if "steps" not in q or q["steps"] is None:
                q["steps"] = []
            q["steps_teacher_approved"] = False

        elif item_res.status == "verified":
            verified_count += 1
            q["verified"] = {
                "status": "verified",
                "method": item_res.confidence_method if item_res.confidence_method != "none" else "symbolic",
                "api_version": api_version,
                "checked_at": now_iso
            }

            # Retrieve structured solver steps
            from bench.dsl_catalog import get_prepared_dsl
            prepared_dsl = get_prepared_dsl(qid)
            solver_steps: list[dict[str, Any]] = []
            if prepared_dsl:
                try:
                    typed_dsl = adapter.validate_python(prepared_dsl)
                    env = solve_dsl(typed_dsl)
                    for step in env.steps:
                        solver_steps.append({
                            "id": step.id,
                            "latex": step.latex,
                            "note_vi": step.note_vi,
                            "value": step.value,
                            "teacher_approved": False
                        })
                except Exception as exc:
                    print(f"      [WARN] Failed to serialize steps for {qid}: {exc}")

            q["steps"] = solver_steps
            q["steps_teacher_approved"] = False

        elif item_res.status == "needs_review":
            needs_review_count += 1
            q["verified"] = {
                "status": "needs_review",
                "method": item_res.confidence_method if item_res.confidence_method != "none" else "symbolic",
                "api_version": api_version,
                "checked_at": now_iso
            }
            if "steps" not in q or q["steps"] is None:
                q["steps"] = []
            q["steps_teacher_approved"] = False

            # Add to mismatch list
            explanation_data = SOLVER_DISCREPANCY_EXPLANATIONS.get(qid, {})
            mismatch_items.append({
                "id": qid,
                "category": item_res.category,
                "question": q.get("question") or q.get("question_text"),
                "options": q.get("options"),
                "raw_correct_answer": q.get("correct_answer"),
                "raw_correct_value": q.get("correct_value"),
                "expected_answer_str": item_res.expected_answer,
                "computed_answer": item_res.computed_answer,
                "discrepancy_type": item_res.discrepancy_type,
                "solver_note": item_res.notes or explanation_data.get("reason"),
                "detected_at": now_iso,
                "review_status": "pending_teacher_review"
            })
        else:
            # Fallback for unexpected status
            unsupported_count += 1
            q["verified"] = {
                "status": "unsupported",
                "method": "none",
                "api_version": api_version,
                "checked_at": now_iso
            }
            if "steps" not in q:
                q["steps"] = []
            q["steps_teacher_approved"] = False

        enriched_questions.append(q)

    # 4. Save updated data/questions/all.json
    print(f"[3/5] Writing {len(enriched_questions)} enriched questions to {questions_path}...")
    with open(questions_path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(enriched_questions, f, ensure_ascii=False, indent=2)
        f.write("\n")

    # Also update PUMKIN2/pumkin-math-api/bench/data/all.json to stay in sync
    bench_data_path = os.path.join(PUMKIN_API_DIR, "bench", "data", "all.json")
    if os.path.exists(os.path.dirname(bench_data_path)):
        with open(bench_data_path, "w", encoding="utf-8", newline="\n") as f:
            json.dump(enriched_questions, f, ensure_ascii=False, indent=2)
            f.write("\n")

    # 5. Write review/answer_mismatch.json
    print(f"[4/5] Exporting {len(mismatch_items)} mismatch cases to review/answer_mismatch.json...")
    review_dir = os.path.join(ROOT_DIR, "review")
    os.makedirs(review_dir, exist_ok=True)
    mismatch_path = os.path.join(review_dir, "answer_mismatch.json")
    
    mismatch_payload = {
        "generated_at": now_iso,
        "total_mismatches": len(mismatch_items),
        "description": "Danh sách các câu hỏi có đáp án solver CAS khác biệt với đáp án gốc trong ngân hàng đề. Cần giáo viên đối chiếu thẩm định trước khi ghi đè qua data/overrides/answer_overrides.json.",
        "mismatches": mismatch_items
    }
    with open(mismatch_path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(mismatch_payload, f, ensure_ascii=False, indent=2)
        f.write("\n")

    # 6. Ensure data/overrides/answer_overrides.json exists
    overrides_dir = os.path.join(ROOT_DIR, "data", "overrides")
    os.makedirs(overrides_dir, exist_ok=True)
    overrides_path = os.path.join(overrides_dir, "answer_overrides.json")
    if not os.path.exists(overrides_path):
        print(f"[5/5] Initializing overrides template at {overrides_path}...")
        overrides_payload = {
            "schema_version": "1.0.0",
            "updated_at": now_iso,
            "description": "Các quyết định ghi đè đáp án/lời giải đã được giáo viên thẩm định. Build release sẽ tự động áp dụng các quyết định này mà không làm biến dạng dữ liệu thô.",
            "overrides": []
        }
        with open(overrides_path, "w", encoding="utf-8", newline="\n") as f:
            json.dump(overrides_payload, f, ensure_ascii=False, indent=2)
            f.write("\n")
    else:
        print(f"[5/5] Found existing overrides at {overrides_path}.")

    stats = {
        "total": len(enriched_questions),
        "verified": verified_count,
        "needs_review": needs_review_count,
        "mismatch": len(mismatch_items),
        "unsupported": unsupported_count,
        "api_version": api_version,
    }

    print("\n" + "=" * 70)
    print("VERIFICATION SUMMARY REPORT:")
    print(f"  - Total Questions     : {stats['total']}")
    print(f"  - Verified (symbolic) : {stats['verified']}")
    print(f"  - Needs Review        : {stats['needs_review']}")
    print(f"  - Mismatches in Queue : {stats['mismatch']}")
    print(f"  - Unsupported         : {stats['unsupported']}")
    print("=" * 70 + "\n")
    return stats


if __name__ == "__main__":
    run_batch_verification()
