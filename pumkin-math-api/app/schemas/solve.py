"""
Solve Endpoint Schemas (POST /v1/solve)
Placeholders for Socratic AI tutoring requests and responses.
"""


from pydantic import BaseModel, Field

from app.schemas.common import StatusEnum


class SolveRequest(BaseModel):
    question_text: str = Field(..., description="Văn bản đề bài hoặc biểu thức toán học")
    question_id: str | None = Field(
        default=None, description="Mã định danh câu hỏi nếu có trong ngân hàng đề"
    )
    step_index: int | None = Field(
        default=1,
        ge=1,
        le=4,
        description="Bậc gợi ý Socratic (1: Nudge, 2: Concept, 3: Sub-goal, 4: Worked Step)",
    )
    previous_steps: list[str] | None = Field(
        default=None, description="Lịch sử các bước gợi ý hoặc tương tác trước đó"
    )


class SolveResponse(BaseModel):
    status: StatusEnum = Field(
        ..., description="Trạng thái phản hồi (verified, needs_review, unsupported, error)"
    )
    confidence: float = Field(default=0.0, ge=0.0, le=1.0, description="Mức độ tin cậy")
    method: str = Field(..., description="Phương pháp suy luận và giải quyết")
    scaffolding_level: int | None = Field(
        default=None, description="Bậc thang gợi ý đang phản hồi"
    )
    content: str | None = Field(default=None, description="Nội dung sư phạm hướng dẫn học sinh")
