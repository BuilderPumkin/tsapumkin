"""
Optional LLM Pedagogical Rephrasing Layer (app/pedagogy/llm_enhancer.py)
Smooths step-by-step explanations using an LLM while enforcing strict fidelity
to CAS solver ground truth traces.
Any output with alien numbers or malformed KaTeX is automatically rejected.
"""

from __future__ import annotations

import os
from typing import TYPE_CHECKING, Any

from app.pedagogy.verifier import verify_no_alien_numbers
from app.schemas.common import StepItem

if TYPE_CHECKING:
    from app.parser.llm_client import LLMClient

PEDAGOGY_SYSTEM_PROMPT = """
Bạn là Trợ lý Sư phạm Toán học PUMKIN.DEV. Nhiệm vụ của bạn là diễn đạt lại các bước giải
trong <ground_truth> thành các bước giải sư phạm tự nhiên, mạch lạc, dễ hiểu bằng tiếng Việt.

QUY TẮC BẤT BIẾN:
1. TUYỆT ĐỐI KHÔNG sáng tạo hay thêm bất kỳ con số, giá trị hoặc bước giải mới ngoài <ground_truth>.
2. Chỉ sử dụng đúng các dữ kiện số học, công thức và biến số đã có trong <ground_truth>.
3. Toàn bộ công thức toán học bắt buộc phải đặt trong \\( ... \\) hoặc \\[ ... \\].
   Nghiêm cấm dùng dấu $ thô.
4. Trả về đúng định dạng JSON:
{
  "steps": [
    {
      "id": "step_1",
      "note_vi": "Giải thích bước 1 mạch lạc...",
      "latex": "\\(...\\)"
    }
  ]
}
"""


def is_llm_pedagogy_enabled() -> bool:
    """Checks whether LLM-based pedagogical rephrasing is enabled via config."""
    return os.environ.get("ENABLE_LLM_PEDAGOGY", "false").strip().lower() in (
        "true",
        "1",
        "yes",
    )


async def enhance_steps_with_llm(
    client: LLMClient,
    question_text: str,
    ground_truth_steps: list[StepItem],
    ground_truth_result: Any,
    dsl: Any | None = None,
) -> tuple[list[StepItem] | None, str, str | None]:
    """
    Attempts to rephrase solver steps via LLM.
    Returns: (enhanced_steps_or_none, pedagogy_mode, rejection_reason)
    Where pedagogy_mode is either 'llm_verified' or 'template'.
    """
    if not is_llm_pedagogy_enabled() or not ground_truth_steps:
        return None, "template", None

    # Construct strict <ground_truth> block
    trace_lines: list[str] = []
    for s in ground_truth_steps:
        val_str = f" | Giá trị: {s.value}" if s.value is not None else ""
        trace_lines.append(f"- ID: {s.id}\n  Ghi chú: {s.note_vi}\n  Công thức: {s.latex}{val_str}")

    ground_truth_block = (
        f"<ground_truth>\n"
        f"Đề bài: {question_text}\n\n"
        f"Vết tính toán CAS tất định:\n"
        + "\n".join(trace_lines)
        + f"\n\nKết quả giải tích cuối cùng: {str(ground_truth_result)}\n"
        f"</ground_truth>"
    )

    user_prompt = (
        f"{ground_truth_block}\n\n"
        f"Hãy diễn đạt lại các bước giải trên cho mạch lạc và sư phạm. "
        f"Tuân thủ tuyệt đối quy tắc không thêm số mới và dùng KaTeX \\( ... \\)."
    )

    try:
        resp = await client.complete_structured(
            prompt=user_prompt,
            system_prompt=PEDAGOGY_SYSTEM_PROMPT,
            temperature=0.0,
        )

        content = resp.content
        if not isinstance(content, dict) or "steps" not in content:
            return None, "template", "LLM trả về JSON không chứa trường 'steps'"

        raw_steps = content.get("steps", [])
        if not isinstance(raw_steps, list) or len(raw_steps) == 0:
            return None, "template", "LLM trả về danh sách 'steps' rỗng"

        candidate_steps: list[StepItem] = []
        full_text_to_verify: list[str] = []

        for idx, item in enumerate(raw_steps):
            if not isinstance(item, dict):
                continue
            step_id = item.get("id") or (
                ground_truth_steps[idx].id if idx < len(ground_truth_steps) else f"step_{idx + 1}"
            )
            note_vi = item.get("note_vi", "").strip()
            latex = item.get("latex", "").strip()

            if not note_vi or not latex:
                continue

            candidate_steps.append(StepItem(id=step_id, note_vi=note_vi, latex=latex))
            full_text_to_verify.append(f"{note_vi} {latex}")

        combined_text = "\n".join(full_text_to_verify)

        # POST-GENERATION VERIFICATION: check for alien numbers or KaTeX syntax errors
        is_valid, err_msg = verify_no_alien_numbers(
            generated_text=combined_text,
            ground_truth_steps=ground_truth_steps,
            ground_truth_result=ground_truth_result,
            dsl=dsl,
        )

        if not is_valid:
            # DISCARD LLM version immediately and fallback to template!
            return (
                None,
                "template",
                f"REJECTED_BY_VERIFIER: {err_msg} (Bỏ bản LLM, dùng bản khuôn mẫu)",
            )

        return candidate_steps, "llm_verified", None

    except Exception as e:
        return None, "template", f"LLM_CALL_EXCEPTION: {str(e)}"
