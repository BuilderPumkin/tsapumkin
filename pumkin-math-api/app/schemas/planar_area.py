"""
Planar Area Solver Result Schemas
Structured payload for definite integral applications calculating planar area between curves.
"""

from pydantic import Field

from app.schemas.common import StrictBaseModel


class PlanarAreaResult(StrictBaseModel):
    """Structured result payload for planar area between curves."""

    curve1_latex: str = Field(
        ...,
        description="Đường cong thứ nhất f(x) dạng LaTeX",
    )
    curve2_latex: str = Field(
        ...,
        description="Đường cong thứ hai g(x) dạng LaTeX",
    )
    intersection_points: list[str] = Field(
        default_factory=list,
        description="Danh sách các hoành độ giao điểm tìm được",
    )
    lower_bound_evaluated: str = Field(
        ...,
        description="Cận dưới a thực tế áp dụng",
    )
    upper_bound_evaluated: str = Field(
        ...,
        description="Cận trên b thực tế áp dụng",
    )
    integral_setup_latex: str = Field(
        ...,
        description="Công thức tích phân diện tích đã thiết lập dạng LaTeX",
    )
    area_raw: str = Field(
        ...,
        description="Giá trị diện tích chính xác (phân số/căn thức/SymPy expr)",
    )
    area_numeric: float | None = Field(
        default=None,
        description="Giá trị diện tích xấp xỉ dạng số thực",
    )
    is_closed_region: bool = Field(
        default=True,
        description="Khẳng định hình phẳng giới hạn kín hữu hạn",
    )
    sub_intervals_count: int = Field(
        default=1,
        description="Số lượng khoảng phân chia do hàm đổi dấu",
    )
    verification_method: str = Field(
        default="symbolic_and_numeric_quad",
        description="Phương pháp kiểm chứng chéo",
    )
