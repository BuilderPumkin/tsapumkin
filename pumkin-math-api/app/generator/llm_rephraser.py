"""
Optional LLM Question Rephraser Layer (app/generator/llm_rephraser.py)
Rephrases Vietnamese question wording smoothly while strictly preserving all numbers and math expressions.
Any change in numbers or formulas results in immediate rejection and fallback to template wording.
"""

from __future__ import annotations

import logging
import os
from typing import TYPE_CHECKING

from app.pedagogy.verifier import extract_numbers_from_text, validate_katex_syntax

if TYPE_CHECKING:
    from app.parser.llm_client import LLMClient

logger = logging.getLogger(__name__)

REPHRASE_SYSTEM_PROMPT = """
Bạn là Trợ lý Biên tập Đề thi Toán học PUMKIN.DEV. Nhiệm vụ của bạn là diễn đạt lại LỜI VĂN
của đề bài toán học sau đây thành câu văn tự nhiên, mượt mà và chuẩn sư phạm hơn.

QUY TẮC BẤT BIẾN:
1. TUYỆT ĐỐI GIỮ NGUYÊN mọi con số, biểu thức, biến số và ký hiệu toán học trong đề bài gốc.
   Không được thay đổi, thêm bớt hay làm tròn bất kỳ giá trị số nào.
2. Toàn bộ công thức toán học bắt buộc đặt trong \\( ... \\) hoặc \\[ ... \\].
   Nghiêm cấm dùng ký tự $ thô.
3. Trả về đúng định dạng JSON:
{
  "rephrased_question": "Nội dung câu hỏi đã diễn đạt lại mượt mà..."
}
"""


def is_llm_rephrase_enabled() -> bool:
    """Check if LLM question rephrasing is enabled via environment variable."""
    return os.getenv("ENABLE_LLM_QUESTION_REPHRASE", "").strip().lower() in (
        "1",
        "true",
        "yes",
        "on",
    )


async def rephrase_question_with_llm(
    client: LLMClient,
    original_question_text: str,
) -> tuple[str, bool]:
    """
    Rephrases question wording using LLM and verifies number preservation.
    Returns: (final_question_text, was_llm_accepted)
    """
    if not original_question_text.strip():
        return original_question_text, False

    prompt = f"<original_question>\n{original_question_text}\n</original_question>"

    try:
        response = await client.complete_structured(
            prompt=prompt,
            system_prompt=REPHRASE_SYSTEM_PROMPT,
        )

        if not response.content:
            logger.warning("LLM rephrase failed or returned empty: fallback to template.")
            return original_question_text, False

        candidate_text = response.content.get("rephrased_question", "").strip()
        if not candidate_text:
            return original_question_text, False

        # 1. KaTeX Syntax check
        is_katex_valid, katex_err = validate_katex_syntax(candidate_text)
        if not is_katex_valid:
            logger.warning("LLM rephrase failed KaTeX validation (%s): fallback.", katex_err)
            return original_question_text, False

        # 2. Strict Number Preservation check
        orig_nums = sorted(extract_numbers_from_text(original_question_text))
        cand_nums = sorted(extract_numbers_from_text(candidate_text))

        # Check if number counts match and values are within tight tolerance
        if len(orig_nums) != len(cand_nums):
            logger.warning(
                "LLM rephrase altered number count (orig: %s, cand: %s): fallback to template.",
                orig_nums,
                cand_nums,
            )
            return original_question_text, False

        for n_orig, n_cand in zip(orig_nums, cand_nums, strict=True):
            if abs(n_orig - n_cand) > 1e-5:
                logger.warning(
                    "LLM rephrase altered number value (%s != %s): fallback to template.",
                    n_orig,
                    n_cand,
                )
                return original_question_text, False

        logger.info("LLM question rephrase passed all fidelity checks successfully.")
        return candidate_text, True

    except Exception as e:
        logger.exception("Error during LLM question rephrase: %s", e)
        return original_question_text, False
