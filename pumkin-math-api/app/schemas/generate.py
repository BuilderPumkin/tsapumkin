"""
Generate Endpoint Schemas (POST /v1/generate)
Deterministic mathematical problem generation with controlled distractor traps.
"""

from enum import StrEnum

from pydantic import Field

from app.schemas.common import BaseResponseEnvelope, StrictBaseModel
from app.schemas.traps import MisconceptionTrapEnum


class DifficultyEnum(StrEnum):
    M1 = "M1"  # Nhận biết
    M2 = "M2"  # Thông hiểu
    M3 = "M3"  # Vận dụng
    M4 = "M4"  # Vận dụng cao


class GenerateRequest(StrictBaseModel):
    """
    Input payload for deterministic problem generation.
    Enforces bounds on count, seed, and valid difficulty levels.
    """

    category: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Mã dạng bài toán học chuẩn (vd: ham_so_cuc_tri_cho_truoc, hinh_hoc_oxyz)",
    )
    difficulty: DifficultyEnum = Field(
        default=DifficultyEnum.M2,
        description=(
            "Độ khó chuẩn hóa: M1 (Nhận biết), M2 (Thông hiểu), M3 (Vận dụng), M4 (Vận dụng cao)"
        ),
    )
    count: int = Field(
        default=1,
        ge=1,
        le=20,
        description="Số lượng câu hỏi cần sinh (1 đến 20)",
    )
    seed: int | None = Field(
        default=None,
        ge=0,
        le=2**31 - 1,
        description="Hạt giống giả ngẫu nhiên cố định để tái lập kết quả sinh tất định",
    )


class DistractorItem(StrictBaseModel):
    """
    Represents a scientifically designed distractor option based on student misconception traps.
    """

    option_index: int = Field(..., ge=0, le=5, description="Chỉ số vị trí phương án (0..5)")
    latex: str = Field(..., description="Nội dung phương án sai định dạng KaTeX")
    misconception_id: MisconceptionTrapEnum = Field(
        ...,
        description=(
            "Mã định danh bẫy nhận thức chuẩn GEMINI.md "
            "(vd: TRAP_EXTREMA_DELTA_CONFUSION, TRAP_LOG_DOMAIN_IGNORED)"
        ),
    )
    explanation_vi: str = Field(
        ...,
        description="Giải thích nguyên nhân học sinh mắc phải sai lầm này",
    )


class GeneratedQuestionItem(StrictBaseModel):
    """Complete generated question representation."""

    id: str = Field(..., description="Mã định danh duy nhất của câu hỏi được sinh")
    category: str = Field(..., description="Dạng bài toán học")
    difficulty: DifficultyEnum = Field(..., description="Độ khó câu hỏi")
    question_text: str = Field(..., description="Văn bản đề bài kèm công thức KaTeX")
    options: list[str] = Field(
        ..., min_length=2, max_length=6, description="Danh sách các phương án lựa chọn"
    )
    correct_answer: str = Field(..., description="Nội dung đáp án đúng")
    correct_index: int = Field(
        ..., ge=0, le=5, description="Chỉ số vị trí của đáp án đúng trong mảng options"
    )
    distractors: list[DistractorItem] = Field(
        default_factory=list,
        description="Danh sách các phương án nhiễu kèm mã bẫy nhận thức",
    )
    explanation_vi: str = Field(..., description="Lời giải chi tiết bằng tiếng Việt")


class GenerateResultPayload(StrictBaseModel):
    """Specific result payload for question generation."""

    count: int = Field(..., ge=1, description="Số lượng câu hỏi đã sinh thành công")
    questions: list[GeneratedQuestionItem] = Field(
        ...,
        description="Danh sách các câu hỏi toán học hoàn chỉnh",
    )


class GenerateResponse(BaseResponseEnvelope[GenerateResultPayload]):
    """Standardized envelope response for POST /v1/generate."""

    pass
