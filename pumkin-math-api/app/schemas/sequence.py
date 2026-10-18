"""
Sequence & Progression Solver Result Schemas
Structured payload for Arithmetic Progressions (CSC), Geometric Progressions (CSN),
and Linear Recurrence Sequences.
"""

from pydantic import Field

from app.schemas.common import StrictBaseModel


class SequenceProgressionResult(StrictBaseModel):
    """Structured result payload for sequence and progression problems."""

    progression_type: str = Field(
        ...,
        description="Phân loại: 'arithmetic', 'geometric', 'linear_recurrence', 'general_term'",
    )
    target: str = Field(
        ...,
        description="Mục tiêu: 'nth_term', 'sum_n', 'infinite_sum', 'find_index'...",
    )
    value_raw: str = Field(
        ...,
        description="Giá trị kết quả dạng chuỗi số nguyên/phân số/căn thức chính xác",
    )
    value_numeric: float | None = Field(
        default=None,
        description="Giá trị xấp xỉ số thực nếu có",
    )
    u1: str | None = Field(
        default=None,
        description="Số hạng đầu u_1 tìm được hoặc đề cho",
    )
    u2: str | None = Field(
        default=None,
        description="Số hạng u_2 nếu có",
    )
    common_difference: str | None = Field(
        default=None,
        description="Công sai d (cấp số cộng)",
    )
    common_ratio: str | None = Field(
        default=None,
        description="Công bội q (cấp số nhân)",
    )
    n: int | None = Field(
        default=None,
        description="Chỉ số n tương ứng",
    )
    general_formula: str | None = Field(
        default=None,
        description="Công thức số hạng tổng quát u_n dạng LaTeX",
    )
    verification_status: str = Field(
        default="verified",
        description="Trạng thái kiểm tra thế ngược: 'verified', 'partially_verified'",
    )
