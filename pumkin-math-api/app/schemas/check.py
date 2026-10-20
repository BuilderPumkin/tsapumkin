"""
Check Endpoint Schemas (POST /v1/check)
Student submission evaluation and intermediate step validation.
"""

from enum import StrEnum
from typing import Self

from pydantic import Field, model_validator

from app.schemas.common import BaseResponseEnvelope, StatusEnum, StrictBaseModel
from app.schemas.traps import MisconceptionTrapEnum


class AnswerTypeEnum(StrEnum):
    NUMBER = "number"
    EXPRESSION = "expression"
    INTERVAL = "interval"
    SET = "set"
    MATRIX = "matrix"
    BOOLEAN_GROUP = "boolean_group"
    MULTIPLE_CHOICE = "multiple_choice"
    DRAG_DROP = "drag_drop"
    STEP_SOLUTION = "step_solution"


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
        description=(
            "Kiểu dữ liệu của đáp án (number, expression, interval, set, "
            "drag_drop, step_solution...)"
        ),
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
    canonical_answer: str = Field(
        ...,
        description="Đáp án chuẩn trích xuất từ ngân hàng đề hoặc đề bài gốc",
    )
    cas_answer: str | None = Field(
        default=None,
        description="Đáp án do SymPy CAS tính toán độc lập (nếu giải được tất định)",
    )
    conflict: bool = Field(
        default=False,
        description=(
            "Cờ đánh dấu có sự mâu thuẫn giữa đáp án ngân hàng gốc và kết quả tính của CAS. "
            "Khi conflict=True, verdict bắt buộc là cannot_determine và KHÔNG trừ điểm học sinh."
        ),
    )
    feedback_vi: str = Field(
        ...,
        description="Nhận xét phản hồi sư phạm bằng tiếng Việt",
    )
    detected_misconception_id: MisconceptionTrapEnum | None = Field(
        default=None,
        description="Mã bẫy nhận thức chuẩn GEMINI.md phát hiện được nếu học sinh làm sai",
    )
    canonical_latex: str = Field(
        ...,
        description="Đáp án chuẩn định dạng KaTeX chuẩn hóa",
    )
    student_latex: str = Field(
        ...,
        description="Đáp án học sinh định dạng KaTeX chuẩn hóa",
    )

    @model_validator(mode="after")
    def validate_conflict_verdict(self) -> Self:
        """Enforce: when conflict is True, verdict must be cannot_determine."""
        if self.conflict and self.verdict != CheckVerdictEnum.CANNOT_DETERMINE:
            raise ValueError(
                "When conflict is True (CAS disagrees with canonical answer), "
                "verdict must be 'cannot_determine' and no penalty is applied."
            )
        return self


class CheckResponse(BaseResponseEnvelope[CheckResultPayload]):
    """Standardized envelope response for POST /v1/check."""

    @model_validator(mode="after")
    def validate_conflict_envelope_status(self) -> Self:
        """
        Enforce: when CheckResultPayload has conflict=True, envelope status must be needs_review.
        """
        if self.result is not None and self.result.conflict:
            if self.status != StatusEnum.NEEDS_REVIEW:
                raise ValueError(
                    "When CheckResultPayload has conflict=True, "
                    "envelope status must be 'needs_review'."
                )
        return self
