"""
Matrix Algebra & Determinant Solver Result Schemas
Structured payload for linear algebra operations: determinants, inverses, rank,
trace, transpose, matrix arithmetic, systems of equations, eigenvalues, and parameter solving.
"""

from pydantic import Field

from app.schemas.common import StrictBaseModel


class MatrixAlgebraResult(StrictBaseModel):
    """Structured result payload for matrix algebra and determinant operations."""

    operation: str = Field(
        ...,
        description="Phép toán ma trận: 'det', 'inverse', 'rank', 'trace'...",
    )
    matrix_a_latex: str | None = Field(
        default=None,
        description="Biểu diễn LaTeX của ma trận A",
    )
    matrix_b_latex: str | None = Field(
        default=None,
        description="Biểu diễn LaTeX của ma trận B hoặc vector b (nếu có)",
    )
    value_raw: str | None = Field(
        default=None,
        description="Giá trị vô hướng chính xác dạng chuỗi (vd: '24', '9', '1')",
    )
    value_numeric: float | None = Field(
        default=None,
        description="Giá trị xấp xỉ số thực (nếu kết quả là vô hướng)",
    )
    matrix_result_latex: str | None = Field(
        default=None,
        description="Biểu diễn LaTeX của ma trận kết quả (vd: ma trận nghịch đảo, tích ma trận)",
    )
    matrix_result_grid: list[list[str]] | None = Field(
        default=None,
        description="Mảng 2 chiều chứa các phần tử của ma trận kết quả",
    )
    vector_result: list[str] | None = Field(
        default=None,
        description="Vector nghiệm của hệ phương trình tuyến tính dạng ma trận [x1, x2, ...]",
    )
    eigenvalues: list[str] | None = Field(
        default=None,
        description="Danh sách các giá trị riêng tìm được",
    )
    solutions: list[str] | None = Field(
        default=None,
        description="Danh sách các giá trị tham số tìm được (vd: tham số m)",
    )
    determinant_value: str | None = Field(
        default=None,
        description="Định thức của ma trận chính (nếu có tính toán)",
    )
    trace_value: str | None = Field(
        default=None,
        description="Vết (trace) của ma trận chính (nếu có tính toán)",
    )
    rank_value: int | None = Field(
        default=None,
        description="Hạng (rank) của ma trận chính (nếu có tính toán)",
    )
    is_invertible: bool | None = Field(
        default=None,
        description="Khẳng định ma trận có khả nghịch hay không",
    )
    verification_method: str = Field(
        default="symbolic_crosscheck",
        description="Phương pháp kiểm chứng chéo kết quả",
    )
