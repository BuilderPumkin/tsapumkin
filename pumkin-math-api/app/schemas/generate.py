"""
Generate Endpoint Schemas (POST /v1/generate)
Placeholders for deterministic mathematical question and variant generation.
"""

from typing import Any

from pydantic import BaseModel, Field

from app.schemas.common import StatusEnum


class GenerateRequest(BaseModel):
    category: str = Field(..., description="Mã dạng bài toán học cần sinh")
    difficulty: str | None = Field(
        default="M2",
        description=(
            "Mức độ nhận thức (M1: Nhận biết, M2: Thông hiểu, M3: Vận dụng, M4: Vận dụng cao)"
        ),
    )
    seed: int | None = Field(default=None, description="Hạt giống sinh ngẫu nhiên tất định")


class GeneratedQuestionPayload(BaseModel):
    question_text: str = Field(..., description="Văn bản câu hỏi sinh ra")
    options: list[str] | None = Field(default=None, description="Các phương án lựa chọn")
    correct_answer: Any = Field(..., description="Đáp án chuẩn")
    distractor_traps: dict[str, str] | None = Field(
        default=None, description="Mã bẫy cho từng phương án nhiễu"
    )


class GenerateResponse(BaseModel):
    status: StatusEnum = Field(..., description="Trạng thái sinh câu hỏi")
    confidence: float = Field(
        default=1.0, ge=0.0, le=1.0, description="Độ tin cậy của bài toán sinh ra"
    )
    method: str = Field(..., description="Phương pháp sinh")
    question: GeneratedQuestionPayload | None = Field(
        default=None, description="Dữ liệu câu hỏi được sinh"
    )
