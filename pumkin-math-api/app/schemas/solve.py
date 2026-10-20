"""
Solve Endpoint Schemas (POST /v1/solve)
Socratic AI Tutoring requests and structured envelope responses.
"""

from typing import Annotated

from pydantic import Field

from app.schemas.common import BaseResponseEnvelope, StrictBaseModel


class SolveRequest(StrictBaseModel):
    """
    Input payload for Socratic AI problem solving.
    Strict limits enforced to prevent denial-of-service and injection.
    """

    question_text: str = Field(
        ...,
        min_length=3,
        max_length=2000,
        description="Văn bản đề bài hoặc biểu thức toán học tiếng Việt (tối đa 2000 ký tự)",
    )
    question_id: str | None = Field(
        default=None,
        max_length=100,
        description="Mã định danh câu hỏi nếu thuộc ngân hàng đề",
    )
    step_index: int = Field(
        default=1,
        ge=1,
        le=4,
        description="Bậc gợi ý Socratic (1: Nudge, 2: Concept, 3: Sub-goal, 4: Worked Step)",
    )
    previous_steps: list[Annotated[str, Field(max_length=500)]] = Field(
        default_factory=list,
        max_length=20,
        description=(
            "Lịch sử các bước gợi ý hoặc tương tác trước đó "
            "(tối đa 20 mục, mỗi mục tối đa 500 ký tự)"
        ),
    )
    misconception_id: str | None = Field(
        default=None,
        max_length=100,
        description="Mã bẫy nhận thức nếu phát hiện được từ bước chấm của học sinh",
    )


class HintItem(StrictBaseModel):
    """Socratic scaffolding hint item."""

    level: int = Field(
        ...,
        ge=1,
        le=4,
        description="Bậc gợi ý Socratic (1: Nudge, 2: Concept, 3: Sub-goal, 4: Worked Step)",
    )
    title_vi: str = Field(..., description="Tiêu đề phân bậc sư phạm")
    content_vi: str = Field(..., description="Nội dung sư phạm hướng dẫn")
    latex_hint: str | None = Field(
        default=None,
        description="Công thức gợi ý toán học định dạng KaTeX \\( ... \\) hoặc \\[ ... \\]",
    )


class SolveResultPayload(StrictBaseModel):
    """Specific result payload for Socratic tutoring."""

    scaffolding_step: int = Field(..., ge=1, le=4, description="Bậc gợi ý hiện tại")
    guidance_vi: str = Field(..., description="Lời dẫn dắt sư phạm bằng tiếng Việt")
    latex_hint: str | None = Field(
        default=None,
        description="Gợi ý công thức toán học định dạng KaTeX \\( ... \\) hoặc \\[ ... \\]",
    )
    subgoal_completed: bool | None = Field(
        default=None,
        description="Đánh dấu học sinh đã hoàn thành mục tiêu con của bước này chưa",
    )
    is_final_step: bool = Field(
        default=False,
        description="Đánh dấu đây có phải bước cuối cùng trước khi học sinh tự kết luận",
    )
    hints: list[HintItem] = Field(
        default_factory=list,
        description="Danh sách các bậc gợi ý Socratic (Nudge, Concept, Sub-goal, Worked Step)",
    )
    pedagogy_mode: str = Field(
        default="template",
        description="Phương thức sinh lời giải: 'template' hoặc 'llm_verified'",
    )
    misconception_feedback: str | None = Field(
        default=None,
        description="Lời nhắc sư phạm khích lệ khi phát hiện bẫy nhận thức của học sinh",
    )


class SolveResponse(BaseResponseEnvelope[SolveResultPayload]):
    """Standardized envelope response for POST /v1/solve."""

    pass
