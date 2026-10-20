"""
Last Digit & Modular Exponentiation Solver Result Schemas
Structured payload for finding the last digit(s) of large powers and modular residues.
"""

from pydantic import Field

from app.schemas.common import StrictBaseModel


class LastDigitResult(StrictBaseModel):
    """Structured result payload for last digit and modular arithmetic."""

    base_evaluated: int = Field(
        ...,
        description="Cơ số nguyên đã chuẩn hóa",
    )
    exponent_evaluated: int | str = Field(
        ...,
        description="Số mũ nguyên hoặc biểu thức tháp số mũ đã đánh giá",
    )
    effective_modulus: int = Field(
        ...,
        description="Modulo thực tế áp dụng (vd: 10 cho 1 chữ số, 100 cho 2 chữ số, hoặc m)",
    )
    cycle_period: int | None = Field(
        default=None,
        description="Độ dài chu kỳ tuần hoàn của chữ số tận cùng",
    )
    cycle_elements: list[int] = Field(
        default_factory=list,
        description="Danh sách các phần tử trong chu kỳ tuần hoàn của cơ số",
    )
    exponent_reduced: int | None = Field(
        default=None,
        description="Số mũ sau khi rút gọn theo chu kỳ hoặc định lý Euler/Fermat",
    )
    last_digits_str: str = Field(
        ...,
        description="Chuỗi chữ số tận cùng đã được định dạng (vd: '9', '76', '01')",
    )
    last_digits_int: int = Field(
        ...,
        description="Giá trị số nguyên của phần dư hoặc chữ số tận cùng",
    )
    verification_method: str = Field(
        ...,
        description="Phương pháp kiểm chứng: 'cycle_detection', 'euler_totient', 'binary_pow_mod'",
    )
