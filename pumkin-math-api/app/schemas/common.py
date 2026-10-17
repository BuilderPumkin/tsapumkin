"""
Common Schema Definitions for Pumkin Math API (Pydantic v2)
Defines envelope responses, confidence metrics, status enums, and strict base configurations.
"""

from enum import StrEnum
from typing import Any, Generic, TypeVar
from uuid import uuid4

from pydantic import BaseModel, ConfigDict, Field

T = TypeVar("T")


class StrictBaseModel(BaseModel):
    """
    Base class enforcing strict typing and forbidding unknown/extra fields.
    """

    model_config = ConfigDict(
        extra="forbid",
        validate_assignment=True,
    )


class StatusEnum(StrEnum):
    VERIFIED = "verified"
    NEEDS_REVIEW = "needs_review"
    UNSUPPORTED = "unsupported"
    ERROR = "error"


class ConfidenceLevel(StrEnum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


class ConfidenceMethod(StrEnum):
    SYMBOLIC = "symbolic"
    NUMERIC = "numeric"
    CONSENSUS = "consensus"


class ConfidenceInfo(StrictBaseModel):
    level: ConfidenceLevel = Field(..., description="Mức độ tin cậy định tính (high, medium, low)")
    method: ConfidenceMethod = Field(
        ..., description="Phương pháp kiểm chứng (symbolic, numeric, consensus)"
    )
    score: float | None = Field(
        default=None,
        ge=0.0,
        le=1.0,
        description="Điểm số tin cậy định lượng (0.0 đến 1.0)",
    )


class StepItem(StrictBaseModel):
    id: str = Field(..., description="Mã định danh duy nhất của bước giải (vd: step_1)")
    latex: str = Field(
        ..., description="Công thức toán chuẩn KaTeX dạng \\( ... \\) hoặc \\[ ... \\]"
    )
    note_vi: str = Field(..., description="Giải thích ý nghĩa bước biến đổi bằng tiếng Việt")


class ErrorDetail(StrictBaseModel):
    code: str = Field(..., description="Mã lỗi hệ thống chuẩn (vd: INVALID_DSL, TIMEOUT)")
    message_vi: str = Field(..., description="Mô tả lỗi bằng tiếng Việt cho học sinh/người dùng")
    details: dict[str, Any] | None = Field(
        default=None,
        description="Thông tin chẩn đoán kỹ thuật bổ sung",
    )


class BaseResponseEnvelope(StrictBaseModel, Generic[T]):
    """
    Standard top-level envelope wrapping every successful or handled API response.
    Guarantees consistent payload structure across /v1/solve, /v1/check, and /v1/generate.
    """

    schema_version: str = Field(
        default="1.0.0",
        description="Phiên bản schema hợp đồng dữ liệu",
    )
    trace_id: str = Field(
        default_factory=lambda: str(uuid4()),
        description="Mã truy vết duy nhất của request (UUIDv4)",
    )
    status: StatusEnum = Field(..., description="Trạng thái xác thực toán học của phản hồi")
    confidence: ConfidenceInfo = Field(
        ..., description="Thông tin mức độ tin cậy và phương pháp kiểm chứng"
    )
    restate_vi: str | None = Field(
        default=None,
        description="Thuật lại đề bài toán học đã chuẩn hóa bằng tiếng Việt",
    )
    result: T | None = Field(
        default=None,
        description="Dữ liệu kết quả chi tiết của từng endpoint cụ thể",
    )
    steps: list[StepItem] = Field(
        default_factory=list,
        description="Danh sách các bước biến đổi trung gian (nếu có)",
    )
    warnings: list[str] = Field(
        default_factory=list,
        description="Danh sách cảnh báo toán học (điều kiện biên, phân kỳ, nhánh nghiệm)",
    )
    error: ErrorDetail | None = Field(
        default=None,
        description="Thông tin lỗi chi tiết nếu status == 'error'",
    )


class HealthResponse(StrictBaseModel):
    status: str = Field(default="healthy", description="Trạng thái dịch vụ")
    service_version: str = Field(..., description="Phiên bản microservice")
    sympy_version: str = Field(..., description="Phiên bản SymPy CAS")
    python_version: str = Field(..., description="Phiên bản Python runtime")
