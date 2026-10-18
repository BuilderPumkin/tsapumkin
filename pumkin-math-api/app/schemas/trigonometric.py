"""
Trigonometric Functions & Equations Result Schema
Structured payload for trigonometric equation solving, interval root counting,
domain analysis, extremum / min-max values, and periodicity calculations.
"""

from pydantic import Field

from app.schemas.common import StrictBaseModel


class TrigonometricResult(StrictBaseModel):
    """Structured result payload for trigonometric functions and equations."""

    operation: str = Field(
        ...,
        description="Phép toán: 'solve_equation', 'count_roots_interval', 'max_min', 'period'...",
    )
    equation_latex: str | None = Field(
        default=None,
        description="Biểu diễn LaTeX của phương trình lượng giác",
    )
    expression_latex: str | None = Field(
        default=None,
        description="Biểu diễn LaTeX của biểu thức lượng giác f(x)",
    )
    interval_latex: str | None = Field(
        default=None,
        description="Đoạn/khoảng xét nghiệm [a, b] dạng LaTeX",
    )
    domain_condition: str | None = Field(
        default=None,
        description="Điều kiện xác định của hàm số/phương trình (vd: cos(x) != 0)",
    )
    general_solutions: list[str] | None = Field(
        default=None,
        description="Danh sách các họ nghiệm tổng quát (vd: ['pi/3 + 2*k*pi', '5*pi/3 + 2*k*pi'])",
    )
    interval_roots: list[str] | None = Field(
        default=None,
        description="Danh sách các nghiệm cụ thể thuộc đoạn [a, b]",
    )
    roots_count: int | None = Field(
        default=None,
        description="Số lượng nghiệm phân biệt thuộc đoạn [a, b]",
    )
    roots_sum: str | None = Field(
        default=None,
        description="Tổng các nghiệm thuộc đoạn [a, b]",
    )
    max_value: str | None = Field(
        default=None,
        description="Giá trị lớn nhất của hàm số lượng giác",
    )
    max_value_numeric: float | None = Field(
        default=None,
        description="Giá trị lớn nhất dạng số thực",
    )
    min_value: str | None = Field(
        default=None,
        description="Giá trị nhỏ nhất của hàm số lượng giác",
    )
    min_value_numeric: float | None = Field(
        default=None,
        description="Giá trị nhỏ nhất dạng số thực",
    )
    period_value: str | None = Field(
        default=None,
        description="Chu kỳ tuần hoàn cơ sở T của hàm số",
    )
    value_raw: str | None = Field(
        default=None,
        description="Giá trị kết quả chính xác dạng chuỗi (vd: '4', 'sqrt(13)')",
    )
    value_numeric: float | None = Field(
        default=None,
        description="Giá trị kết quả dạng số thực",
    )
    verification_method: str = Field(
        default="back_substitution_and_evalf",
        description="Phương pháp kiểm chứng chéo nghiệm lượng giác",
    )
