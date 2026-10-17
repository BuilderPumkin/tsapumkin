"""
Domain Specific Language (DSL) Schema Placeholders (Pydantic v2)
Discriminated union based on the 'type' field covering all mathematical domains in SPEC.md.
Full AST and validation logic will be implemented in Prompt 5.
"""

from typing import Annotated, Literal

from pydantic import Field

from app.schemas.common import StrictBaseModel


class BaseDSL(StrictBaseModel):
    """Base class for all typed mathematical problem representations."""

    variable: str = Field(default="x", description="Tên biến số chính (mặc định là 'x')")
    domain: str = Field(default="R", description="Tập xác định của bài toán (vd: 'R', '(0; +inf)')")


class MonotonicityDSL(BaseDSL):
    type: Literal["ham_so_tinh_don_dieu"] = "ham_so_tinh_don_dieu"
    expression: str = Field(..., description="Biểu thức giải tích của hàm số f(x)")
    interval: str | None = Field(
        default=None, description="Khoảng cần xét tính đồng biến/nghịch biến"
    )


class BasicDerivativeDSL(BaseDSL):
    type: Literal["ham_so_dao_ham_co_ban"] = "ham_so_dao_ham_co_ban"
    expression: str = Field(..., description="Hàm số cần tính đạo hàm f(x)")
    order: int = Field(default=1, ge=1, le=5, description="Cấp của đạo hàm cần tính")


class ExtremaDSL(BaseDSL):
    type: Literal["ham_so_cuc_tri_cho_truoc"] = "ham_so_cuc_tri_cho_truoc"
    expression: str = Field(..., description="Biểu thức hàm số f(x)")


class MinMaxIntervalDSL(BaseDSL):
    type: Literal["ham_so_gtln_gtnn_doan_khoang"] = "ham_so_gtln_gtnn_doan_khoang"
    expression: str = Field(..., description="Biểu thức hàm số f(x)")
    interval_start: str = Field(..., description="Điểm đầu đoạn [a; b]")
    interval_end: str = Field(..., description="Điểm cuối đoạn [a; b]")


class ParameterMDSL(BaseDSL):
    type: Literal["ham_so_chua_tham_so_m"] = "ham_so_chua_tham_so_m"
    expression: str = Field(..., description="Biểu thức hàm số chứa tham số f(x, m)")
    parameter_name: str = Field(default="m", description="Tên ký hiệu của tham số")
    condition: str = Field(
        ..., description="Điều kiện của bài toán (vd: '2_cuc_tri', 'dong_bien_tren_R')"
    )


class RealWorldOptimizationDSL(BaseDSL):
    type: Literal["ham_so_toan_thuc_te_toi_uu"] = "ham_so_toan_thuc_te_toi_uu"
    target_function: str = Field(
        ..., description="Hàm mục tiêu cần tối ưu hóa (chi phí, diện tích...)"
    )
    constraints: list[str] = Field(
        default_factory=list, description="Danh sách các ràng buộc thực tế"
    )
    goal: Literal["maximize", "minimize"] = Field(
        ..., description="Mục tiêu tối đa hay tối thiểu hóa"
    )


class VariationTableDSL(BaseDSL):
    type: Literal["ham_so_doc_bang_bien_thien"] = "ham_so_doc_bang_bien_thien"
    derivative_expression: str | None = Field(default=None, description="Công thức f'(x) nếu có")
    intervals_sign: list[dict[str, str]] = Field(
        default_factory=list, description="Dấu của đạo hàm trên các khoảng"
    )


class AsymptoteDSL(BaseDSL):
    type: Literal["ham_so_tiem_can"] = "ham_so_tiem_can"
    expression: str = Field(..., description="Biểu thức hàm phân thức f(x)")


class OtherFunctionDSL(BaseDSL):
    type: Literal["ham_so_dang_khac"] = "ham_so_dang_khac"
    expression: str = Field(..., description="Biểu thức hàm số f(x)")
    question_subtype: str = Field(..., description="Phân loại phụ: 'tiep_tuyen', 'tuong_giao'...")


class IntegralDSL(BaseDSL):
    type: Literal["nguyen_ham_tich_phan"] = "nguyen_ham_tich_phan"
    integrand: str = Field(..., description="Hàm dưới dấu tích phân f(x)")
    lower_bound: str | None = Field(default=None, description="Cận dưới (None nếu là nguyên hàm)")
    upper_bound: str | None = Field(default=None, description="Cận trên (None nếu là nguyên hàm)")


class ExponentialLogDSL(BaseDSL):
    type: Literal["mu_logarit_pt_bpt"] = "mu_logarit_pt_bpt"
    equation: str = Field(..., description="Phương trình hoặc bất phương trình mũ/logarit")
    relation: Literal["=", "<", "<=", ">", ">="] = Field(default="=", description="Toán tử quan hệ")


class LimitSequenceDSL(BaseDSL):
    type: Literal["gioi_han_day_so"] = "gioi_han_day_so"
    expression: str = Field(..., description="Biểu thức dãy số hoặc hàm số cần tính giới hạn")
    approaches: str = Field(default="+oo", description="Điểm tới hạn (vd: '0', '+oo', '-oo')")


class LinearAlgebraDSL(BaseDSL):
    type: Literal["dai_so_tuyen_tinh_ma_tran"] = "dai_so_tuyen_tinh_ma_tran"
    matrices: dict[str, list[list[float]]] = Field(
        ..., description="Từ điển ma trận và mảng 2 chiều các phần tử"
    )
    operation: str = Field(
        ..., description="Phép toán ma trận: 'det', 'inverse', 'rank', 'multiply'..."
    )


class DifferentialEquationDSL(BaseDSL):
    type: Literal["phuong_trinh_vi_phan"] = "phuong_trinh_vi_phan"
    equation: str = Field(..., description="Phương trình vi phân (vd: y' + P(x)y = Q(x))")
    initial_conditions: dict[str, str] = Field(
        default_factory=dict, description="Điều kiện ban đầu (vd: {'y(0)': '1'})"
    )


class AlgebraicEquationDSL(BaseDSL):
    type: Literal["phuong_trinh_bat_phuong_trinh_dai_so"] = "phuong_trinh_bat_phuong_trinh_dai_so"
    equation: str = Field(..., description="Phương trình hoặc bất phương trình đại số")


class GeometryOxyzDSL(BaseDSL):
    type: Literal["hinh_hoc_oxyz"] = "hinh_hoc_oxyz"
    elements: dict[str, dict[str, str]] = Field(
        ..., description="Các đối tượng Oxyz: điểm, mặt phẳng, đường thẳng, mặt cầu"
    )
    query_type: str = Field(
        ..., description="Yêu cầu: 'khoang_cach', 'goc', 'phuong_trinh_mat_cau'..."
    )


class CombinatoricsProbabilityDSL(BaseDSL):
    type: Literal["to_hop_xac_suat"] = "to_hop_xac_suat"
    subdomain: Literal[
        "classical_probability", "bayes", "circular_permutation", "combinatorics"
    ] = Field(...)
    parameters: dict[str, int | float | str] = Field(
        ..., description="Tham số bài toán: n, k, P(A), P(B)..."
    )


class UnsupportedProblemDSL(BaseDSL):
    type: Literal["unsupported"] = "unsupported"
    reason: str = Field(..., description="Lý do bài toán ngoài phạm vi hỗ trợ tự động")


# Discriminated Union across all mathematical problem representations
MathProblemDSL = Annotated[
    MonotonicityDSL
    | BasicDerivativeDSL
    | ExtremaDSL
    | MinMaxIntervalDSL
    | ParameterMDSL
    | RealWorldOptimizationDSL
    | VariationTableDSL
    | AsymptoteDSL
    | OtherFunctionDSL
    | IntegralDSL
    | ExponentialLogDSL
    | LimitSequenceDSL
    | LinearAlgebraDSL
    | DifferentialEquationDSL
    | AlgebraicEquationDSL
    | GeometryOxyzDSL
    | CombinatoricsProbabilityDSL
    | UnsupportedProblemDSL,
    Field(discriminator="type"),
]
