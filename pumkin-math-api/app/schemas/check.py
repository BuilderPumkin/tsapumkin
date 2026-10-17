"""
Check Endpoint Schemas (POST /v1/check)
Student submission evaluation and intermediate step validation.
"""

from enum import StrEnum

from pydantic import Field

from app.schemas.common import BaseResponseEnvelope, StrictBaseModel
from app.schemas.dsl import MathProblemDSL


class AnswerTypeEnum(StrEnum):
    NUMBER = "number"
    EXPRESSION = "expression"
    INTERVAL = "interval"
    SET = "set"
    MATRIX = "matrix"
    BOOLEAN_GROUP = "boolean_group"
    MULTIPLE_CHOICE = "multiple_choice"


class CheckVerdictEnum(StrEnum):
    CORRECT = "correct"
    CORRECT_DIFFERENT_FORM = "correct_different_form"
    INCORRECT = "incorrect"
    CANNOT_DETERMINE = "cannot_determine"


class CheckRequest(StrictBaseModel):
    """
    Input payload for student answer or intermediate step checking.
    Requires question text or DSL, canonical answer, student answer, and answer type.
    """

    question_text: str | None = Field(
        default=None,
        max_length=2000,
        description="Đề bài bằng chữ nếu có",
    )
    dsl: MathProblemDSL | None = Field(
        default=None,
        description="Cấu trúc DSL trung gian nếu có",
    )
    question_id: str | None = Field(
        default=None,
        max_length=100,
        description="Mã câu hỏi trong ngân hàng đề",
    )
    canonical_answer: str = Field(
        ...,
        min_length=1,
        max_length=500,
        description="Đáp án chuẩn của ngân hàng đề hoặc giáo viên",
    )
    student_answer: str = Field(
        ...,
        min_length=1,
        max_length=500,
        description="Đáp án hoặc biểu thức bước biến đổi của học sinh",
    )
    answer_type: AnswerTypeEnum = Field(
        ...,
        description="Kiểu dữ liệu của đáp án (number, expression, interval, set...)",
    )
    step_index: int | None = Field(
        default=None,
        ge=1,
        le=20,
        description="Số thứ tự bước giải nếu kiểm tra theo từng bước",
    )


class CheckResultPayload(StrictBaseModel):
    """Specific result payload for submission checking."""

    verdict: CheckVerdictEnum = Field(
        ...,
        description=(
            "Kết luận kiểm định: correct, correct_different_form, incorrect, cannot_determine"
        ),
    )
    is_correct: bool | None = Field(
        default=None,
        description=(
            "Cờ logic boolean (True nếu đúng/khác dạng, False nếu sai, None nếu không xác định)"
        ),
    )
    feedback_vi: str = Field(
        ...,
        description="Nhận xét phản hồi sư phạm bằng tiếng Việt",
    )
    detected_misconception_id: str | None = Field(
        default=None,
        description="Mã bẫy nhận thức phát hiện được (vd: TRAP_EXTREMA_DELTA_CONFUSION)",
    )
    canonical_latex: str = Field(
        ...,
        description="Đáp án chuẩn định dạng KaTeX chuẩn hóa",
    )
    student_latex: str = Field(
        ...,
        description="Đáp án học sinh định dạng KaTeX chuẩn hóa",
    )


class CheckResponse(BaseResponseEnvelope[CheckResultPayload]):
    """Standardized envelope response for POST /v1/check."""

    pass
