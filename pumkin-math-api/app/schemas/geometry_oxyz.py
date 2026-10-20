"""
Pure 3D Cartesian Coordinate Geometry (Oxyz) Result Schema
Structured payload for solving:
- Normal vector of a plane and plane equations (from point & normal, 3 points, bisector, parallel)
- Line equations (canonical, parametric, from 2 points, perpendicular to plane)
- Sphere center, radius, and equations (from general form, standard form, tangent to plane)
- Distance calculations (point-to-plane, parallel planes, point-to-point, point-to-line, skew lines)
- Angle calculations (between planes, between lines, between line & plane, between vectors)
- 3D Vector operations (dot product, cross product)
- Projections and intersections in Oxyz space
"""

from pydantic import Field

from app.schemas.common import StrictBaseModel


class GeometryOxyzResult(StrictBaseModel):
    """Structured result payload for pure 3D Cartesian geometry (Oxyz) problems."""

    operation: str = Field(
        ...,
        description="Phép toán Oxyz: 'plane_normal_vector', 'sphere_from_equation'...",
    )

    # Points & Vectors
    point: list[str] | None = Field(
        default=None,
        description="Tọa độ điểm kết quả [x, y, z]",
    )
    vector: list[str] | None = Field(
        default=None,
        description="Tọa độ vector [x, y, z] (pháp tuyến, chỉ phương, hoặc tích có hướng)",
    )
    vector_cross: list[str] | None = Field(
        default=None,
        description="Tọa độ tích có hướng [u, v]",
    )
    dot_product: str | None = Field(
        default=None,
        description="Tích vô hướng u . v",
    )
    dot_product_numeric: float | None = Field(
        default=None,
        description="Tích vô hướng dạng số thực",
    )

    # Planes
    plane_equation: str | None = Field(
        default=None,
        description="Phương trình mặt phẳng dạng Ax + By + Cz + D = 0",
    )
    plane_coeffs: list[str] | None = Field(
        default=None,
        description="Hệ số [A, B, C, D] của mặt phẳng",
    )
    plane_normal: list[str] | None = Field(
        default=None,
        description="Vectơ pháp tuyến n = (A, B, C)",
    )

    # Lines
    line_parametric: dict[str, str] | None = Field(
        default=None,
        description="Phương trình tham số của đường thẳng {x: ..., y: ..., z: ...}",
    )
    line_canonical: str | None = Field(
        default=None,
        description="Phương trình chính tắc của đường thẳng",
    )
    line_point: list[str] | None = Field(
        default=None,
        description="Tọa độ điểm đi qua của đường thẳng [x0, y0, z0]",
    )
    line_direction: list[str] | None = Field(
        default=None,
        description="Vectơ chỉ phương của đường thẳng [a, b, c]",
    )

    # Spheres
    sphere_center: list[str] | None = Field(
        default=None,
        description="Tọa độ tâm mặt cầu I [a, b, c]",
    )
    sphere_radius: str | None = Field(
        default=None,
        description="Bán kính mặt cầu R dạng chính xác",
    )
    sphere_radius_numeric: float | None = Field(
        default=None,
        description="Bán kính R dạng số thực",
    )
    sphere_equation_standard: str | None = Field(
        default=None,
        description="Phương trình chính tắc mặt cầu (x-a)^2 + (y-b)^2 + (z-c)^2 = R^2",
    )
    sphere_equation_general: str | None = Field(
        default=None,
        description="Phương trình tổng quát x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0",
    )

    # Distances
    distance: str | None = Field(
        default=None,
        description="Khoảng cách dạng chính xác (vd: '4', '40/3', 'sqrt(3)')",
    )
    distance_numeric: float | None = Field(
        default=None,
        description="Khoảng cách dạng số thực",
    )

    # Angles
    cos_angle: str | None = Field(
        default=None,
        description="Cosin của góc giữa hai đối tượng",
    )
    sin_angle: str | None = Field(
        default=None,
        description="Sin của góc giữa đường thẳng và mặt phẳng",
    )
    angle_rad: str | None = Field(
        default=None,
        description="Số đo góc dạng radian",
    )
    angle_deg: str | None = Field(
        default=None,
        description="Số đo góc dạng độ (°)",
    )

    # Positions, Intersections & Projections
    is_parallel: bool | None = Field(
        default=None,
        description="True nếu hai đối tượng song song",
    )
    is_perpendicular: bool | None = Field(
        default=None,
        description="True nếu hai đối tượng vuông góc",
    )
    is_skew: bool | None = Field(
        default=None,
        description="True nếu hai đường thẳng chéo nhau",
    )
    intersection_point: list[str] | None = Field(
        default=None,
        description="Tọa độ giao điểm [x, y, z]",
    )
    projection_point: list[str] | None = Field(
        default=None,
        description="Tọa độ hình chiếu vuông góc [x, y, z]",
    )

    # Primary value fields
    value_raw: str = Field(
        ...,
        description="Giá trị kết quả chính xác dạng chuỗi (vd: '4', '(1, -2, 2)')",
    )
    value_numeric: float | None = Field(
        default=None,
        description="Giá trị kết quả dạng số thực nếu có",
    )
    verification_method: str = Field(
        default="symbolic_geometric_oxyz_cas",
        description="Phương pháp kiểm chứng hình học không gian Oxyz",
    )
