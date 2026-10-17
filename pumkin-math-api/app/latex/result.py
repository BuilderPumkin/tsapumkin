"""
LaTeX Parsing Result, Domain Constraints, and Heuristic Tracking
Defines structured result envelopes, domain constraints
(denominators != 0, roots >= 0, logs > 0), and explicit warnings
for semantic ambiguities and applied heuristics.
"""

from enum import StrEnum
from typing import Any

from pydantic import BaseModel, ConfigDict, Field


class ConstraintType(StrEnum):
    """Types of mandatory mathematical domain constraints per GEMINI.md."""

    DENOMINATOR_NONZERO = "denominator_nonzero"
    EVEN_ROOT_NONNEGATIVE = "even_root_nonnegative"
    LOG_ARGUMENT_POSITIVE = "log_argument_positive"
    LOG_BASE_POSITIVE = "log_base_positive"
    LOG_BASE_NOT_ONE = "log_base_not_one"
    TAN_DOMAIN = "tan_domain"
    COT_DOMAIN = "cot_domain"


class DomainConstraint(BaseModel):
    """
    Individual mathematical domain constraint extracted from the expression.
    Every formula must explicitly declare its applicability conditions.
    """

    model_config = ConfigDict(arbitrary_types_allowed=True, extra="forbid")

    constraint_type: ConstraintType = Field(..., description="Mã phân loại điều kiện xác định")
    condition: Any = Field(..., description="Biểu thức quan hệ SymPy (Relational/Boolean)")
    latex: str = Field(..., description="Công thức điều kiện định dạng KaTeX chuẩn")
    message_vi: str = Field(..., description="Giải thích ý nghĩa điều kiện bằng tiếng Việt")


class ParseWarning(BaseModel):
    """
    Structured warning emitted when semantic ambiguity or heuristic resolution is applied.
    Enforces the NO GUESSING policy: the caller is explicitly notified of any interpretation.
    """

    model_config = ConfigDict(arbitrary_types_allowed=True, extra="forbid")

    code: str = Field(..., description="Mã cảnh báo chuẩn hóa (ví dụ WARN_AMBIGUOUS_TRIG_ARGUMENT)")
    message_vi: str = Field(
        ..., description="Mô tả nguyên nhân nhập nhằng hoặc heuristic bằng tiếng Việt"
    )


class ChainedRelation(BaseModel):
    """
    Represents an un-evaluated chain of relations: expressions[0] op[0] expressions[1] op[1] ...
    Guarantees that chained equalities or inequalities (e.g. A = B = C or -5 < y < 3)
    are preserved structurally and NEVER evaluated into boolean True/False.
    """

    model_config = ConfigDict(arbitrary_types_allowed=True, extra="forbid")

    expressions: list[Any] = Field(
        ..., description="Danh sách các vế biểu thức trong chuỗi quan hệ"
    )
    operators: list[str] = Field(
        ...,
        description="Danh sách các toán tử so sánh ('=', '<', '<=', '>', '>=', '!=')",
    )

    @property
    def free_symbols(self) -> set[Any]:
        syms: set[Any] = set()
        for expr in self.expressions:
            if hasattr(expr, "free_symbols"):
                syms.update(expr.free_symbols)
        return syms

    def __repr__(self) -> str:
        parts = []
        for i, expr in enumerate(self.expressions):
            parts.append(repr(expr))
            if i < len(self.operators):
                parts.append(self.operators[i])
        return "ChainedRelation(" + " ".join(parts) + ")"


class ParseResult(BaseModel):
    """
    Deterministic result of parsing a LaTeX mathematical string.
    Contains either a valid SymPy expression with extracted domain constraints and warnings,
    or a descriptive unsupported / syntax error.
    """

    model_config = ConfigDict(arbitrary_types_allowed=True, extra="forbid")

    is_success: bool = Field(..., description="True nếu dịch cú pháp thành công sang SymPy")
    expr: Any | None = Field(default=None, description="Biểu thức hoặc quan hệ SymPy được kiến tạo")
    constraints: list[DomainConstraint] = Field(
        default_factory=list,
        description="Danh sách các điều kiện xác định toán học bắt buộc (GEMINI.md)",
    )
    variables: list[str] = Field(
        default_factory=list,
        description="Danh sách các biến số xuất hiện trong biểu thức (sắp xếp tăng dần)",
    )
    warnings: list[ParseWarning] = Field(
        default_factory=list,
        description="Danh sách các cảnh báo nhập nhằng ngữ nghĩa hoặc heuristic đã áp dụng",
    )
    metadata: dict[str, Any] = Field(
        default_factory=dict,
        description=(
            "Metadata lưu vết thông tin phụ (đơn vị đo lường đã bóc tách, nhãn hình học, v.v.)"
        ),
    )
    error_code: str | None = Field(default=None, description="Mã định danh lỗi nếu không dịch được")
    reason_vi: str | None = Field(
        default=None, description="Mô tả nguyên nhân không hỗ trợ hoặc lỗi bằng tiếng Việt"
    )
    error_position: int | None = Field(
        default=None, description="Vị trí ký tự xảy ra lỗi (1-indexed)"
    )
    latex_normalized: str | None = Field(
        default=None, description="Chuỗi LaTeX chuẩn hóa tương ứng"
    )
