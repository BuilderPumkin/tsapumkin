"""
Integral Solver Result Schemas
Structured payload for indefinite and definite integration outcomes.
"""

from pydantic import Field

from app.schemas.common import StrictBaseModel


class IntegralResult(StrictBaseModel):
    """Structured result payload for integral solving."""

    is_definite: bool = Field(
        ...,
        description="True nếu là tích phân xác định (có cận), False nếu là nguyên hàm bất định",
    )
    variable: str = Field(
        default="x",
        description="Biến số lấy tích phân",
    )
    antiderivative_latex: str = Field(
        ...,
        description="Biểu thức họ nguyên hàm F(x) định dạng KaTeX chuẩn",
    )
    antiderivative_sympy: str = Field(
        ...,
        description="Biểu thức họ nguyên hàm F(x) định dạng SymPy string",
    )
    constant_symbol: str | None = Field(
        default="C",
        description="Ký hiệu hằng số tích phân tự do (ví dụ 'C')",
    )
    determined_constant: str | None = Field(
        default=None,
        description="Giá trị cụ thể của hằng số C nếu bài toán có điều kiện ban đầu F(x0) = y0",
    )
    particular_antiderivative_latex: str | None = Field(
        default=None,
        description="Biểu thức nguyên hàm cụ thể khi đã xác định được hằng số C",
    )
    value_latex: str | None = Field(
        default=None,
        description="Giá trị giải tích chính xác của tích phân xác định định dạng KaTeX",
    )
    value_sympy: str | None = Field(
        default=None,
        description="Giá trị giải tích chính xác của tích phân xác định định dạng SymPy string",
    )
    value_float: float | None = Field(
        default=None,
        description="Giá trị số thực xấp xỉ của tích phân xác định",
    )
    lower_bound: str | None = Field(
        default=None,
        description="Cận dưới a của tích phân xác định",
    )
    upper_bound: str | None = Field(
        default=None,
        description="Cận trên b của tích phân xác định",
    )
    is_improper: bool = Field(
        default=False,
        description="Đánh dấu tích phân suy rộng (cận vô cùng hoặc điểm kỳ dị)",
    )
    singularities: list[str] = Field(
        default_factory=list,
        description="Danh sách các điểm kỳ dị/gián đoạn của hàm dưới dấu tích phân phát hiện được",
    )
    reverse_derivative_verified: bool = Field(
        default=False,
        description="Đã kiểm chứng đạo hàm ngược F'(x) = f(x) trên miền xác định",
    )
    numerical_quad_verified: bool | None = Field(
        default=None,
        description="Đã kiểm chứng số học tích phân xác định bằng phương pháp cầu phương số (quad)",
    )
