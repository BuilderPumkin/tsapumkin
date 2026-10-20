"""
Triangle Relations & Planar Vectors Result Schema
Structured payload for solving:
- Heron's formula and triangle area
- Circumradius R, inradius r, medians, and law of sines / cosines
- Vector magnitude, dot product, addition/subtraction
- Angle between vectors vs angle between lines
- Collinearity cross-determinant (avoiding zero-division) and orthogonality
- Parameter solving for collinear / orthogonal vectors
"""

from pydantic import Field

from app.schemas.common import StrictBaseModel


class TriangleVectorResult(StrictBaseModel):
    """Structured result payload for triangle relations and planar vector problems."""

    operation: str = Field(
        ...,
        description="Phép toán: 'triangle_area_heron', 'circumradius_R', 'vector_dot_product'...",
    )

    # Triangle metrics
    area_raw: str | None = Field(
        default=None,
        description="Diện tích tam giác dạng chính xác (vd: '6*sqrt(6)')",
    )
    area_numeric: float | None = Field(
        default=None,
        description="Diện tích tam giác dạng số thực",
    )
    semiperimeter: str | None = Field(
        default=None,
        description="Nửa chu vi p của tam giác",
    )
    circumradius_R: str | None = Field(
        default=None,
        description="Bán kính đường tròn ngoại tiếp R",
    )
    circumradius_R_numeric: float | None = Field(
        default=None,
        description="Bán kính R dạng số thực",
    )
    inradius_r: str | None = Field(
        default=None,
        description="Bán kính đường tròn nội tiếp r",
    )
    inradius_r_numeric: float | None = Field(
        default=None,
        description="Bán kính r dạng số thực",
    )
    median_length: str | None = Field(
        default=None,
        description="Độ dài đường trung tuyến (vd: 'm_a')",
    )
    angle_cos: str | None = Field(
        default=None,
        description="Giá trị cosin của góc tam giác",
    )
    angle_rad: str | None = Field(
        default=None,
        description="Số đo góc dạng radian",
    )
    angle_deg: str | None = Field(
        default=None,
        description="Số đo góc dạng độ (degrees)",
    )
    side_length: str | None = Field(
        default=None,
        description="Độ dài cạnh tam giác tính được",
    )

    # Vector metrics
    vector_result: list[str] | None = Field(
        default=None,
        description="Tọa độ vector kết quả [x, y]",
    )
    magnitude: str | None = Field(
        default=None,
        description="Độ dài của vector dạng chính xác (vd: '5', 'sqrt(13)')",
    )
    magnitude_numeric: float | None = Field(
        default=None,
        description="Độ dài vector dạng số thực",
    )
    dot_product: str | None = Field(
        default=None,
        description="Tích vô hướng u . v",
    )
    dot_product_numeric: float | None = Field(
        default=None,
        description="Tích vô hướng dạng số thực",
    )
    cos_angle: str | None = Field(
        default=None,
        description="Cosin của góc giữa hai vector",
    )
    angle_between_rad: str | None = Field(
        default=None,
        description="Góc giữa hai vector (radian)",
    )
    angle_between_deg: str | None = Field(
        default=None,
        description="Góc giữa hai vector (độ)",
    )
    is_collinear: bool | None = Field(
        default=None,
        description="True nếu hai vector cùng phương",
    )
    is_orthogonal: bool | None = Field(
        default=None,
        description="True nếu hai vector vuông góc",
    )
    collinear_ratio: str | None = Field(
        default=None,
        description="Hệ số k nếu u = k * v",
    )
    parameter_values: list[str] | None = Field(
        default=None,
        description="Danh sách các giá trị tham số m thỏa mãn điều kiện",
    )

    # Primary value fields
    value_raw: str = Field(
        ...,
        description="Giá trị kết quả chính xác dạng chuỗi (vd: '6*sqrt(6)', '5', '2/3')",
    )
    value_numeric: float | None = Field(
        default=None,
        description="Giá trị kết quả dạng số thực",
    )
    verification_method: str = Field(
        default="symbolic_geometric_cas",
        description="Phương pháp kiểm chứng hình học giải tích",
    )
