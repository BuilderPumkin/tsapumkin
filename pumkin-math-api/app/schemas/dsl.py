"""
Domain Specific Language (DSL) Schema Placeholders (Pydantic v2)
Discriminated union based on the 'type' field covering all mathematical domains in SPEC.md.
Full AST and validation logic will be implemented in Prompt 5.
DSL schema is explicitly decoupled from stable API contract via dsl_version = '0.1.0-alpha'.
"""

from typing import Annotated, Literal, Self

from pydantic import Field, model_validator

from app.schemas.common import StrictBaseModel, UnsupportedReasonEnum


class BaseDSL(StrictBaseModel):
    """Base class for all typed mathematical problem representations."""

    dsl_version: str = Field(
        default="0.1.0-alpha",
        description=(
            "Phiên bản schema thử nghiệm của DSL (Prompt 3: experimental, cố định ở Prompt 5)"
        ),
    )
    variable: str = Field(default="x", description="Tên biến số chính (mặc định là 'x')")
    domain: str = Field(default="R", description="Tập xác định của bài toán (vd: 'R', '(0; +inf)')")
    restate_vi: str | None = Field(
        default=None,
        description="Thuật lại đề bài toán học đã chuẩn hóa bằng tiếng Việt",
    )


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


class IntegralInitialCondition(StrictBaseModel):
    point: str = Field(..., description="Điểm x0 của điều kiện F(x0) = y0")
    value: str = Field(..., description="Giá trị y0 của F(x0)")


class IntegralDSL(BaseDSL):
    type: Literal["nguyen_ham_tich_phan"] = "nguyen_ham_tich_phan"
    integrand: str = Field(
        ...,
        description="Biểu thức giải tích dưới dấu tích phân f(x) dạng LaTeX",
    )
    lower_bound: str | None = Field(
        default=None,
        description="Cận dưới a dạng LaTeX (None nếu là nguyên hàm bất định)",
    )
    upper_bound: str | None = Field(
        default=None,
        description="Cận trên b dạng LaTeX (None nếu là nguyên hàm bất định)",
    )
    initial_condition: IntegralInitialCondition | None = Field(
        default=None,
        description="Điều kiện ban đầu F(x0) = y0 để tìm hằng số tích phân C",
    )
    method_hint: Literal["direct", "substitution", "by_parts"] | None = Field(
        default=None,
        description="Gợi ý phương pháp tính: 'direct', 'substitution', 'by_parts'",
    )
    substitution: str | None = Field(
        default=None,
        description="Biểu thức đổi biến u = u(x) nếu có",
    )
    by_parts_u: str | None = Field(
        default=None,
        description="Thành phần u(x) khi tích phân từng phần nếu có",
    )
    by_parts_dv: str | None = Field(
        default=None,
        description="Thành phần dv(x) khi tích phân từng phần nếu có",
    )

    @model_validator(mode="after")
    def validate_bounds_pair(self) -> Self:
        has_lower = self.lower_bound is not None and self.lower_bound.strip() != ""
        has_upper = self.upper_bound is not None and self.upper_bound.strip() != ""
        if has_lower != has_upper:
            raise ValueError(
                "Tích phân xác định yêu cầu cả cận dưới (lower_bound) và cận trên (upper_bound). "
                "Đối với nguyên hàm, vui lòng để trống cả hai cận."
            )
        return self


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


class MatrixAlgebraDSL(BaseDSL):
    type: Literal[
        "dai_so_ma_tran_dinh_thuc",
        "dinh_thuc_ma_tran",
        "dai_so_ma_tran",
        "matrix_algebra",
    ] = "dai_so_ma_tran_dinh_thuc"
    operation: Literal[
        "det",
        "determinant",
        "inverse",
        "rank",
        "trace",
        "transpose",
        "multiply",
        "add",
        "subtract",
        "scale",
        "det_scaled",
        "solve_system",
        "eigenvalues",
        "solve_parameter",
    ] = Field(
        ...,
        description="Phép toán ma trận: 'det', 'inverse', 'rank', 'trace', 'solve_system'...",
    )
    matrix: list[list[str | int | float]] | str | None = Field(
        default=None,
        description="Ma trận chính A dạng mảng 2 chiều hoặc chuỗi LaTeX",
    )
    matrix_b: list[list[str | int | float]] | list[str | int | float] | str | None = Field(
        default=None,
        description="Ma trận B hoặc vector b cho phép toán 2 ngôi / hệ phương trình",
    )
    scalar: str | int | float | None = Field(
        default=None,
        description="Hệ số vô hướng k (vd: '2', 2)",
    )
    matrix_size: int | None = Field(
        default=None,
        description="Cấp n của ma trận vuông khi không cho ma trận tường minh (vd: 3)",
    )
    det_a: str | int | float | None = Field(
        default=None,
        description="Giá trị định thức det(A) cho trước",
    )
    trace_a: str | int | float | None = Field(
        default=None,
        description="Giá trị vết tr(A) cho trước",
    )
    parameter: str | None = Field(
        default=None,
        description="Tham số thực cần tìm trong ma trận (vd: 'm')",
    )
    target_value: str | None = Field(
        default=None,
        description="Giá trị mục tiêu của phương trình (vd: '0' khi det(A)=0)",
    )
    unknowns: list[str] | None = Field(
        default=None,
        description="Danh sách ký hiệu ẩn số của hệ phương trình (vd: ['I_1', 'I_2', 'I_3'])",
    )


class TrigonometricDSL(BaseDSL):
    type: Literal[
        "ham_so_luong_giac_phuong_trinh",
        "phuong_trinh_luong_giac",
        "luong_giac",
    ] = "ham_so_luong_giac_phuong_trinh"
    operation: Literal[
        "solve_equation",
        "count_roots_interval",
        "find_roots_interval",
        "sum_roots_interval",
        "max_min",
        "period",
        "domain",
        "general_solution",
    ] = Field(
        default="solve_equation",
        description="Phép toán: 'solve_equation', 'count_roots_interval', 'max_min', 'period'...",
    )
    equation: str | None = Field(
        default=None,
        description="Phương trình lượng giác (vd: 'cos(2x) - 3cos(x) + 2 = 0')",
    )
    expression: str | None = Field(
        default=None,
        description="Biểu thức lượng giác f(x) (vd: '2*sin(x) + 3*cos(x)')",
    )
    interval: str | None = Field(
        default=None,
        description="Đoạn xét nghiệm [a, b] (vd: '[0, 2*pi]')",
    )
    interval_start: str | None = Field(
        default=None,
        description="Cận đầu của đoạn xét nghiệm [a, b] (vd: '0', '-pi')",
    )
    interval_end: str | None = Field(
        default=None,
        description="Cận cuối của đoạn xét nghiệm [a, b] (vd: '2*pi', 'pi')",
    )
    variable: str = Field(
        default="x",
        description="Biến số chính ('x', 't')",
    )


class TriangleVectorDSL(BaseDSL):
    type: Literal[
        "he_thuc_luong_tam_giac_vector",
        "tam_giac_vector",
        "he_thuc_luong_tam_giac",
        "vector_oxy",
    ] = "he_thuc_luong_tam_giac_vector"
    operation: Literal[
        # Triangle operations
        "triangle_area_heron",
        "triangle_solve",
        "circumradius_R",
        "inradius_r",
        "median_length",
        "cos_angle",
        "side_from_cos",
        # Vector operations
        "vector_magnitude",
        "vector_add_sub",
        "vector_dot_product",
        "vector_angle",
        "vector_collinear",
        "vector_orthogonal",
        "vector_solve_parameter",
        "triangle_centroid",
        "vector_ab",
    ] = Field(
        ...,
        description="Phép toán: 'triangle_area_heron', 'circumradius_R', 'vector_dot_product'...",
    )
    # Triangle parameters
    a: str | None = Field(default=None, description="Cạnh a (BC) (vd: '5', 'sqrt(3)')")
    b: str | None = Field(default=None, description="Cạnh b (CA) (vd: '6', '4')")
    c: str | None = Field(default=None, description="Cạnh c (AB) (vd: '7', '5')")
    angle_A: str | None = Field(default=None, description="Góc A (vd: 'pi/3', '60')")
    angle_B: str | None = Field(default=None, description="Góc B (vd: 'pi/4', '45')")
    angle_C: str | None = Field(default=None, description="Góc C (vd: 'pi/2', '90')")

    # Vector parameters (2D coordinates [x, y])
    u: list[str] | None = Field(default=None, description="Tọa độ vector u [x, y]")
    v: list[str] | None = Field(default=None, description="Tọa độ vector v [x, y]")
    k1: str | None = Field(default="1", description="Hệ số nhân k1 cho vector u")
    k2: str | None = Field(default="1", description="Hệ số nhân k2 cho vector v")

    # Points A, B, C coordinates
    point_A: list[str] | None = Field(default=None, description="Tọa độ điểm A [x, y]")
    point_B: list[str] | None = Field(default=None, description="Tọa độ điểm B [x, y]")
    point_C: list[str] | None = Field(default=None, description="Tọa độ điểm C [x, y]")

    # Parameter for solving
    param_name: str = Field(default="m", description="Tên tham số cần tìm ('m', 'k')")
    condition: str | None = Field(default=None, description="Điều kiện ('orthogonal', 'collinear')")


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


class LastDigitDSL(BaseDSL):
    type: Literal[
        "tim_chu_so_tan_cung_luy_thua_lon",
        "chu_so_tan_cung_luy_thua",
    ] = "tim_chu_so_tan_cung_luy_thua_lon"
    base: str = Field(
        ...,
        description="Cơ số của lũy thừa dạng số nguyên hoặc biểu thức (vd: '2027', '7')",
    )
    exponent: str = Field(
        ...,
        description="Số mũ của lũy thừa (vd: '2026', '9^9', '100')",
    )
    tower_exponent: str | None = Field(
        default=None,
        description="Số mũ cấp 2 nếu là tháp lũy thừa a^{b^c} (None nếu là lũy thừa đơn)",
    )
    modulus_digits: int = Field(
        default=1,
        ge=1,
        le=5,
        description="Số lượng chữ số tận cùng cần tìm (1: mod 10; 2: mod 100...)",
    )
    modulo: int | None = Field(
        default=None,
        ge=2,
        description="Modulo tùy chọn nếu là bài toán đồng dư tổng quát a^b mod m",
    )


class SequenceProgressionDSL(BaseDSL):
    type: Literal[
        "day_so_cap_so_cong_cap_so_nhan",
        "cap_so_cong_cap_so_nhan",
        "cap_so_cong",
        "cap_so_nhan",
        "day_so",
    ] = "day_so_cap_so_cong_cap_so_nhan"
    progression_type: Literal[
        "arithmetic",
        "geometric",
        "linear_recurrence",
        "general_term",
    ] = Field(
        ...,
        description="Phân loại dãy: 'arithmetic', 'geometric', 'linear_recurrence', 'general_term'",
    )
    target: Literal[
        "nth_term",
        "sum_n",
        "infinite_sum",
        "find_index",
        "common_difference",
        "common_ratio",
        "first_term",
        "general_formula",
    ] = Field(
        ...,
        description="Đại lượng cần tìm: 'nth_term', 'sum_n', 'infinite_sum', 'find_index'...",
    )
    u1: str | None = Field(
        default=None,
        description="Số hạng đầu u_1 (vd: '3', '-2', '4')",
    )
    u2: str | None = Field(
        default=None,
        description="Số hạng thứ hai u_2 nếu có (dùng cho truy hồi cấp 2)",
    )
    d: str | None = Field(
        default=None,
        description="Công sai d của cấp số cộng (vd: '5', '3')",
    )
    q: str | None = Field(
        default=None,
        description="Công bội q của cấp số nhân (vd: '2', '1/2')",
    )
    n: int | str | None = Field(
        default=None,
        description="Chỉ số n cần tính (vd: 8, 20, 10)",
    )
    target_value: str | None = Field(
        default=None,
        description="Giá trị đã biết của u_n hoặc S_n khi tìm chỉ số n",
    )
    recurrence_coeffs: list[str] | None = Field(
        default=None,
        description="Hệ số của hệ thức truy hồi tuyến tính [a, b]",
    )
    recurrence_order: int | None = Field(
        default=None,
        ge=1,
        le=2,
        description="Cấp của hệ thức truy hồi (1 hoặc 2)",
    )
    general_term_formula: str | None = Field(
        default=None,
        description="Công thức tường minh u_n theo biến n (vd: '(2*n - 1)/(n + 1)')",
    )
    equations: list[str] | None = Field(
        default=None,
        description="Hệ phương trình liên hệ giữa các số hạng",
    )
    positive_terms_only: bool = Field(
        default=False,
        description="Ràng buộc tất cả các số hạng là số dương",
    )


class PlanarAreaDSL(BaseDSL):
    type: Literal[
        "ung_dung_tich_phan_dien_tich_hinh_phang",
        "dien_tich_hinh_phang",
        "tich_phan_dien_tich",
    ] = "ung_dung_tich_phan_dien_tich_hinh_phang"
    curve1: str = Field(
        ...,
        description="Đường cong thứ nhất f(x) dạng LaTeX (vd: 'x^2', '2 - x^2')",
    )
    curve2: str = Field(
        default="0",
        description="Đường cong thứ hai g(x) dạng LaTeX (mặc định '0' cho trục Ox)",
    )
    lower_bound: str | None = Field(
        default=None,
        description="Cận dưới x = a (None nếu tự tìm qua hoành độ giao điểm)",
    )
    upper_bound: str | None = Field(
        default=None,
        description="Cận trên x = b (None nếu tự tìm qua hoành độ giao điểm)",
    )
    variable: str = Field(
        default="x",
        description="Biến số tích phân ('x' hoặc 'y')",
    )


class UnsupportedProblemDSL(BaseDSL):
    type: Literal["unsupported"] = "unsupported"
    reason: UnsupportedReasonEnum = Field(
        ..., description="Lý do chuẩn hóa bài toán ngoài phạm vi hỗ trợ tự động"
    )


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
    | MatrixAlgebraDSL
    | DifferentialEquationDSL
    | AlgebraicEquationDSL
    | GeometryOxyzDSL
    | CombinatoricsProbabilityDSL
    | LastDigitDSL
    | SequenceProgressionDSL
    | PlanarAreaDSL
    | TrigonometricDSL
    | TriangleVectorDSL
    | UnsupportedProblemDSL,
    Field(discriminator="type"),
]
