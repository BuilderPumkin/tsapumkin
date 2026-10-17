"""
Check Endpoint Schemas (POST /v1/check)
Placeholders for student submission grading and intermediate step validation.
"""

from pydantic import BaseModel, Field

from app.schemas.common import StatusEnum


class CheckRequest(BaseModel):
    question_id: str = Field(..., description="Mã câu hỏi trong ngân hàng đề")
    student_answer: str = Field(..., description="Đáp án hoặc biểu thức bước giải của học sinh")
    step_index: int | None = Field(
        default=None, description="Vị trí bước giải nếu chấm từng bước"
    )


class CheckResponse(BaseModel):
    status: StatusEnum = Field(..., description="Trạng thái thẩm định")
    confidence: float = Field(
        default=0.0, ge=0.0, le=1.0, description="Mức độ tin cậy của kết luận"
    )
    method: str = Field(..., description="Phương pháp kiểm chứng chéo")
    is_correct: bool | None = Field(
        default=None, description="Kết quả đúng/sai (None nếu không thể xác định)"
    )
    feedback: str | None = Field(
        default=None, description="Nhận xét sư phạm hoặc giải thích bẫy nhận thức"
    )
    detected_trap: str | None = Field(
        default=None, description="Mã bẫy nhận thức phát hiện được nếu có"
    )
