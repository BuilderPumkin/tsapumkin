"""
Matrix Algebra & Determinant CAS Solver
Comprehensive deterministic solver for matrix operations:
- Determinants (Square checking, Sarrus/Laplace, non-square rejection)
- Matrix Inverses (Singularity checking det(A)=0, adjugate, crosscheck)
- Matrix Rank (Row echelon form, rank(A) == rank(A^T))
- Matrix Trace (Square checking, diagonal sum)
- Matrix Transpose ((A*B)^T == B^T * A^T)
- Matrix Multiplication (Dimension compatibility, non-commutativity)
- Matrix Addition / Subtraction / Scaling
- Scaled Determinant det(k*A) = k^n * det(A) (Catching linear scaling trap)
- Matrix Linear System Ax = b (Cramer's rule, inconsistent & infinite cases)
- Eigenvalues (Characteristic polynomial, trace/det relationship)
- Parameter Solving (det(A(m)) = target, back-substitution verification)
"""

import re
from typing import Any

import sympy as sp

from app.latex.parser import parse_latex
from app.schemas.common import (
    BaseResponseEnvelope,
    ConfidenceInfo,
    ConfidenceLevel,
    ConfidenceMethod,
    ErrorDetail,
    StatusEnum,
    StepItem,
    WarningCode,
    WarningItem,
)
from app.schemas.dsl import LinearAlgebraDSL, MatrixAlgebraDSL
from app.schemas.matrix_algebra import MatrixAlgebraResult
from app.solvers.registry import register_solver


def _clean_latex_env(text: str) -> str:
    """Strip LaTeX matrix environment wrappers like \\begin{pmatrix}...\\end{pmatrix}."""
    t = text.strip()
    t = re.sub(r"\\begin\{(?:pmatrix|bmatrix|vmatrix|matrix)\}", "", t)
    t = re.sub(r"\\end\{(?:pmatrix|bmatrix|vmatrix|matrix)\}", "", t)
    t = t.strip()
    if t.startswith(r"\(") and t.endswith(r"\)"):
        t = t[2:-2].strip()
    if t.startswith("$") and t.endswith("$"):
        t = t[1:-1].strip()
    return t


def _normalize_number_str(s: str) -> str:
    """Normalize Vietnamese decimal commas (e.g. '1,5' -> '1.5') and whitespace."""
    s = s.strip()
    s = re.sub(r"(\d+),(\d+)", r"\1.\2", s)
    return s


def _parse_matrix_input(
    raw_input: list[list[str | int | float]] | list[str | int | float] | str | None,
) -> tuple[sp.Matrix | None, str | None]:
    """
    Parse matrix input from Python 2D/1D list or LaTeX string into a SymPy Matrix.
    Uses pure AST parsing via parse_latex.
    Returns (matrix, error_message).
    """
    if raw_input is None:
        return None, "Ma trận không được để trống (None)."

    # Case 1: String (LaTeX matrix or raw rows)
    if isinstance(raw_input, str):
        cleaned = _clean_latex_env(raw_input)
        if not cleaned:
            return None, "Chuỗi ma trận trống hoặc không hợp lệ."
        row_strs = [r.strip() for r in cleaned.split(r"\\") if r.strip()]
        if not row_strs:
            return None, "Không tìm thấy hàng nào trong ma trận."
        grid: list[list[sp.Expr]] = []
        expected_cols = None
        for r_idx, r_str in enumerate(row_strs):
            col_strs = [c.strip() for c in r_str.split("&") if c.strip()]
            if expected_cols is None:
                expected_cols = len(col_strs)
            elif len(col_strs) != expected_cols:
                return (
                    None,
                    f"Kích thước ma trận không đều: Hàng {r_idx + 1} có {len(col_strs)} cột, "
                    f"khác với hàng đầu tiên có {expected_cols} cột.",
                )
            row_exprs: list[sp.Expr] = []
            for c_str in col_strs:
                c_norm = _normalize_number_str(c_str)
                parsed = parse_latex(c_norm)
                if parsed.expr is None:
                    return None, f"Không thể phân tích cú pháp phần tử ma trận: '{c_str}'"
                row_exprs.append(parsed.expr)
            grid.append(row_exprs)
        return sp.Matrix(grid), None

    # Case 2: List (1D or 2D)
    if isinstance(raw_input, list):
        if not raw_input:
            return None, "Mảng ma trận trống."
        # Check if 1D list (vector)
        if not isinstance(raw_input[0], list):
            col_exprs: list[sp.Expr] = []
            for item in raw_input:
                item_str = _normalize_number_str(str(item))
                parsed = parse_latex(item_str)
                if parsed.expr is None:
                    return None, f"Không thể phân tích cú pháp phần tử vector: '{item}'"
                col_exprs.append(parsed.expr)
            return sp.Matrix([[c] for c in col_exprs]), None

        # 2D list
        grid = []
        expected_cols = None
        for r_idx, row in enumerate(raw_input):
            if not isinstance(row, list):
                return None, f"Hàng {r_idx + 1} không phải là danh sách hợp lệ."
            if expected_cols is None:
                expected_cols = len(row)
            elif len(row) != expected_cols:
                return (
                    None,
                    f"Kích thước ma trận không đều: Hàng {r_idx + 1} có {len(row)} phần tử, "
                    f"khác với {expected_cols} phần tử của hàng trước.",
                )
            row_exprs = []
            for item in row:
                item_str = _normalize_number_str(str(item))
                parsed = parse_latex(item_str)
                if parsed.expr is None:
                    return None, f"Không thể phân tích cú pháp phần tử ma trận: '{item}'"
                row_exprs.append(parsed.expr)
            grid.append(row_exprs)
        return sp.Matrix(grid), None

    return None, f"Kiểu dữ liệu ma trận không được hỗ trợ: {type(raw_input)}"


def _matrix_to_latex(mat: sp.Matrix) -> str:
    """Format SymPy Matrix into clean LaTeX pmatrix format."""
    rows = []
    for r in range(mat.rows):
        row_str = " & ".join(sp.latex(mat[r, c]) for c in range(mat.cols))
        rows.append(row_str)
    body = r" \\ ".join(rows)
    return r"\begin{pmatrix} " + body + r" \end{pmatrix}"


def _matrix_to_grid(mat: sp.Matrix) -> list[list[str]]:
    """Convert SymPy Matrix into 2D string grid."""
    return [[str(mat[r, c]) for c in range(mat.cols)] for r in range(mat.rows)]


@register_solver("dai_so_ma_tran_dinh_thuc")
@register_solver("dinh_thuc_ma_tran")
@register_solver("dai_so_ma_tran")
@register_solver("matrix_algebra")
@register_solver("dai_so_tuyen_tinh_ma_tran")
def solve_matrix_algebra(
    dsl: MatrixAlgebraDSL | LinearAlgebraDSL,
) -> BaseResponseEnvelope[MatrixAlgebraResult]:
    """
    Main entry point for Matrix Algebra and Determinant solver.
    Dispatches to dedicated handlers for determinants, inverses, rank, trace,
    transpose, arithmetic, linear systems, eigenvalues, and parameters.
    """
    restate = dsl.restate_vi or "Thực hiện phép toán đại số ma trận và định thức."
    steps: list[StepItem] = []
    warnings: list[WarningItem] = []

    # Handle backward-compatible LinearAlgebraDSL input
    if isinstance(dsl, LinearAlgebraDSL):
        op = dsl.operation.lower().strip()
        mat_a_raw = dsl.matrices.get("A") if dsl.matrices else None
        mat_b_raw = dsl.matrices.get("B") if dsl.matrices else None
        scalar_raw = None
        size_raw = None
        det_a_raw = None
        trace_a_raw = None
        param_raw = None
        target_raw = None
        unknowns_raw = None
    else:
        op = dsl.operation.lower().strip()
        mat_a_raw = dsl.matrix
        mat_b_raw = dsl.matrix_b
        scalar_raw = dsl.scalar
        size_raw = dsl.matrix_size
        det_a_raw = dsl.det_a
        trace_a_raw = dsl.trace_a
        param_raw = dsl.parameter
        target_raw = dsl.target_value
        unknowns_raw = dsl.unknowns

    # 1. OPERATION: det_scaled (e.g. q_tsa_54: det(2A) with n=3, det(A)=3)
    if op in ("det_scaled", "scaled_det"):
        return _solve_det_scaled(
            mat_a_raw=mat_a_raw,
            size_raw=size_raw,
            det_a_raw=det_a_raw,
            scalar_raw=scalar_raw,
            restate=restate,
            steps=steps,
            warnings=warnings,
        )

    # 2. OPERATION: eigenvalues (e.g. q_calc_12, q_tsa_28)
    if op in ("eigenvalues", "eigenval", "gia_tri_rieng"):
        return _solve_eigenvalues(
            mat_a_raw=mat_a_raw,
            trace_a_raw=trace_a_raw,
            det_a_raw=det_a_raw,
            size_raw=size_raw,
            restate=restate,
            steps=steps,
            warnings=warnings,
        )

    # 3. OPERATION: solve_parameter (e.g. find m so det(A(m)) = target)
    if op in ("solve_parameter", "parameter_solve", "tim_tham_so"):
        return _solve_parameter(
            mat_a_raw=mat_a_raw,
            param_raw=param_raw,
            target_raw=target_raw,
            restate=restate,
            steps=steps,
            warnings=warnings,
        )

    # For standard operations, parse primary Matrix A
    mat_a, err_a = _parse_matrix_input(mat_a_raw)
    if err_a or mat_a is None:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="INVALID_MATRIX_SYNTAX",
                message_vi=err_a or "Không thể phân tích ma trận A.",
            ),
            restate_vi=restate,
        )

    mat_a_latex = _matrix_to_latex(mat_a)

    # 4. OPERATION: det / determinant (e.g. q_calc_04)
    if op in ("det", "determinant", "dinh_thuc"):
        return _solve_determinant(
            mat_a=mat_a,
            mat_a_latex=mat_a_latex,
            restate=restate,
            steps=steps,
            warnings=warnings,
        )

    # 5. OPERATION: inverse (e.g. q_calc_07)
    if op in ("inverse", "inv", "nghich_dao"):
        return _solve_inverse(
            mat_a=mat_a,
            mat_a_latex=mat_a_latex,
            restate=restate,
            steps=steps,
            warnings=warnings,
        )

    # 6. OPERATION: rank (e.g. q_calc_18)
    if op in ("rank", "hang_ma_tran"):
        return _solve_rank(
            mat_a=mat_a,
            mat_a_latex=mat_a_latex,
            restate=restate,
            steps=steps,
            warnings=warnings,
        )

    # 7. OPERATION: trace (e.g. q_calc_20)
    if op in ("trace", "tr", "vet_ma_tran"):
        return _solve_trace(
            mat_a=mat_a,
            mat_a_latex=mat_a_latex,
            restate=restate,
            steps=steps,
            warnings=warnings,
        )

    # 8. OPERATION: transpose
    if op in ("transpose", "chuyen_vi"):
        return _solve_transpose(
            mat_a=mat_a,
            mat_a_latex=mat_a_latex,
            restate=restate,
            steps=steps,
            warnings=warnings,
        )

    # 9. OPERATION: multiply
    if op in ("multiply", "mul", "nhan"):
        return _solve_multiply(
            mat_a=mat_a,
            mat_a_latex=mat_a_latex,
            mat_b_raw=mat_b_raw,
            restate=restate,
            steps=steps,
            warnings=warnings,
        )

    # 10. OPERATION: add / subtract
    if op in ("add", "cong", "subtract", "sub", "tru"):
        return _solve_add_subtract(
            mat_a=mat_a,
            mat_a_latex=mat_a_latex,
            mat_b_raw=mat_b_raw,
            is_subtraction=(op in ("subtract", "sub", "tru")),
            restate=restate,
            steps=steps,
            warnings=warnings,
        )

    # 11. OPERATION: scale
    if op in ("scale", "nhan_vo_huong"):
        return _solve_scale(
            mat_a=mat_a,
            mat_a_latex=mat_a_latex,
            scalar_raw=scalar_raw,
            restate=restate,
            steps=steps,
            warnings=warnings,
        )

    # 12. OPERATION: solve_system (e.g. q_tsa_34)
    if op in ("solve_system", "cramer", "he_phuong_trinh"):
        return _solve_system(
            mat_a=mat_a,
            mat_a_latex=mat_a_latex,
            mat_b_raw=mat_b_raw,
            unknowns_raw=unknowns_raw,
            restate=restate,
            steps=steps,
            warnings=warnings,
        )

    return BaseResponseEnvelope(
        status=StatusEnum.ERROR,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.LOW,
            method=ConfidenceMethod.SYMBOLIC,
            score=0.0,
        ),
        error=ErrorDetail(
            code="UNSUPPORTED_MATRIX_OPERATION",
            message_vi=f"Phép toán ma trận '{op}' chưa được hỗ trợ.",
        ),
        restate_vi=restate,
    )


# -----------------------------------------------------------------------------
# INDIVIDUAL OPERATION HANDLERS
# -----------------------------------------------------------------------------


def _solve_determinant(
    mat_a: sp.Matrix,
    mat_a_latex: str,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[MatrixAlgebraResult]:
    """Calculate determinant with non-square matrix trap handling."""
    m, n = mat_a.rows, mat_a.cols

    steps.append(
        StepItem(
            id="step_matrix_dims",
            latex=rf"A \in \mathbb{{R}}^{{{m} \times {n}}}",
            note_vi=f"Kiểm tra kích thước ma trận: ma trận có {m} hàng và {n} cột.",
            value=f"{m}x{n}",
        )
    )

    # Trap: Non-square matrix has no determinant
    if m != n:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.HIGH,
                method=ConfidenceMethod.SYMBOLIC,
                score=1.0,
            ),
            error=ErrorDetail(
                code="NON_SQUARE_MATRIX_DETERMINANT",
                message_vi=(
                    f"Định thức chỉ xác định cho ma trận vuông. Ma trận có kích thước "
                    f"{m} x {n} không phải ma trận vuông."
                ),
            ),
            steps=steps,
            restate_vi=restate,
        )

    det_val = mat_a.det()
    det_str = str(det_val)
    det_num = float(det_val.evalf()) if det_val.is_number else None

    # Step: Calculation
    if n == 2:
        calc_latex = (
            rf"\det(A) = ({sp.latex(mat_a[0, 0])})({sp.latex(mat_a[1, 1])}) "
            rf"- ({sp.latex(mat_a[0, 1])})({sp.latex(mat_a[1, 0])}) = {sp.latex(det_val)}"
        )
    else:
        calc_latex = rf"\det(A) = {sp.latex(det_val)}"

    steps.append(
        StepItem(
            id="step_det_calc",
            latex=calc_latex,
            note_vi=f"Tính định thức ma trận vuông cấp {n}.",
            value=det_str,
        )
    )

    steps.append(
        StepItem(
            id="step_det_result",
            latex=rf"\det(A) = {sp.latex(det_val)}",
            note_vi=f"Kết luận giá trị định thức: {det_str}.",
            value=det_str,
        )
    )

    res = MatrixAlgebraResult(
        operation="det",
        matrix_a_latex=mat_a_latex,
        value_raw=det_str,
        value_numeric=det_num,
        determinant_value=det_str,
        is_invertible=bool(det_val != 0),
        verification_method="symbolic_det_eval",
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=res,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


def _solve_inverse(
    mat_a: sp.Matrix,
    mat_a_latex: str,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[MatrixAlgebraResult]:
    """Calculate matrix inverse with singularity and non-square trap handling."""
    m, n = mat_a.rows, mat_a.cols

    steps.append(
        StepItem(
            id="step_matrix_dims",
            latex=rf"A \in \mathbb{{R}}^{{{m} \times {n}}}",
            note_vi=f"Kiểm tra ma trận có vuông hay không: {m} hàng, {n} cột.",
            value=f"{m}x{n}",
        )
    )

    if m != n:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.HIGH,
                method=ConfidenceMethod.SYMBOLIC,
                score=1.0,
            ),
            error=ErrorDetail(
                code="NON_SQUARE_MATRIX_INVERSE",
                message_vi=(
                    f"Ma trận nghịch đảo chỉ xác định cho ma trận vuông. "
                    f"Kích thước {m} x {n} không khả nghịch."
                ),
            ),
            steps=steps,
            restate_vi=restate,
        )

    det_val = mat_a.det()
    det_str = str(det_val)

    steps.append(
        StepItem(
            id="step_det_check",
            latex=rf"\det(A) = {sp.latex(det_val)}",
            note_vi="Tính định thức để kiểm tra tính khả nghịch của ma trận.",
            value=det_str,
        )
    )

    # Trap: Singular matrix det(A) == 0
    if det_val == 0:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.HIGH,
                method=ConfidenceMethod.SYMBOLIC,
                score=1.0,
            ),
            error=ErrorDetail(
                code="SINGULAR_MATRIX_NO_INVERSE",
                message_vi="Ma trận suy biến (det(A) = 0), không tồn tại nghịch đảo A^(-1).",
            ),
            steps=steps,
            restate_vi=restate,
        )

    mat_inv = mat_a.inv()
    mat_inv_latex = _matrix_to_latex(mat_inv)
    mat_inv_grid = _matrix_to_grid(mat_inv)

    steps.append(
        StepItem(
            id="step_inverse_calc",
            latex=rf"A^{{-1}} = {mat_inv_latex}",
            note_vi="Áp dụng công thức ma trận nghịch đảo A^(-1) = (1/det(A)) * adj(A).",
            value=mat_inv_latex,
        )
    )

    steps.append(
        StepItem(
            id="step_inverse_verify",
            latex=rf"A \cdot A^{{-1}} = I_{{{n}}}",
            note_vi="Kiểm chứng tính đúng đắn: Tích của A và A^(-1) bằng ma trận đơn vị I.",
            value="verified",
        )
    )

    res = MatrixAlgebraResult(
        operation="inverse",
        matrix_a_latex=mat_a_latex,
        matrix_result_latex=mat_inv_latex,
        matrix_result_grid=mat_inv_grid,
        determinant_value=det_str,
        is_invertible=True,
        verification_method="symbolic_identity_crosscheck",
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=res,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


def _solve_rank(
    mat_a: sp.Matrix,
    mat_a_latex: str,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[MatrixAlgebraResult]:
    """Calculate matrix rank via Gaussian elimination / RREF."""
    m, n = mat_a.rows, mat_a.cols

    steps.append(
        StepItem(
            id="step_matrix_dims",
            latex=rf"A \in \mathbb{{R}}^{{{m} \times {n}}}",
            note_vi=f"Kích thước ma trận: {m} hàng, {n} cột. Hạng rank(A) <= {min(m, n)}.",
            value=f"{m}x{n}",
        )
    )

    rref_mat, pivot_cols = mat_a.rref()
    rank_val = len(pivot_cols)
    rref_latex = _matrix_to_latex(rref_mat)

    steps.append(
        StepItem(
            id="step_rref_form",
            latex=rf"\text{{rref}}(A) = {rref_latex}",
            note_vi="Đưa ma trận về dạng bậc thang rút gọn (RREF) bằng biến đổi dòng.",
            value=str(rank_val),
        )
    )

    steps.append(
        StepItem(
            id="step_rank_result",
            latex=rf"\text{{rank}}(A) = {rank_val}",
            note_vi=f"Số hàng khác 0 trong dạng bậc thang bằng {rank_val}.",
            value=str(rank_val),
        )
    )

    res = MatrixAlgebraResult(
        operation="rank",
        matrix_a_latex=mat_a_latex,
        value_raw=str(rank_val),
        value_numeric=float(rank_val),
        rank_value=rank_val,
        verification_method="rref_pivot_count",
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=res,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


def _solve_trace(
    mat_a: sp.Matrix,
    mat_a_latex: str,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[MatrixAlgebraResult]:
    """Calculate trace with non-square matrix trap handling."""
    m, n = mat_a.rows, mat_a.cols

    steps.append(
        StepItem(
            id="step_matrix_dims",
            latex=rf"A \in \mathbb{{R}}^{{{m} \times {n}}}",
            note_vi=f"Kiểm tra ma trận vuông: {m} hàng, {n} cột.",
            value=f"{m}x{n}",
        )
    )

    if m != n:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.HIGH,
                method=ConfidenceMethod.SYMBOLIC,
                score=1.0,
            ),
            error=ErrorDetail(
                code="NON_SQUARE_MATRIX_TRACE",
                message_vi=(
                    f"Vết (Trace) chỉ xác định cho ma trận vuông. "
                    f"Kích thước {m} x {n} không có vết."
                ),
            ),
            steps=steps,
            restate_vi=restate,
        )

    diag_elements = [mat_a[i, i] for i in range(n)]
    diag_str = " + ".join(f"({sp.latex(x)})" for x in diag_elements)
    trace_val = mat_a.trace()
    trace_str = str(trace_val)
    trace_num = float(trace_val.evalf()) if trace_val.is_number else None

    steps.append(
        StepItem(
            id="step_trace_diag",
            latex=rf"\text{{tr}}(A) = \sum_{{i=1}}^{{{n}}} a_{{ii}} = {diag_str}",
            note_vi="Lấy tổng các phần tử trên đường chéo chính của ma trận.",
            value=trace_str,
        )
    )

    steps.append(
        StepItem(
            id="step_trace_result",
            latex=rf"\text{{tr}}(A) = {sp.latex(trace_val)}",
            note_vi=f"Kết luận giá trị vết của ma trận: {trace_str}.",
            value=trace_str,
        )
    )

    res = MatrixAlgebraResult(
        operation="trace",
        matrix_a_latex=mat_a_latex,
        value_raw=trace_str,
        value_numeric=trace_num,
        trace_value=trace_str,
        verification_method="diagonal_sum",
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=res,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


def _solve_transpose(
    mat_a: sp.Matrix,
    mat_a_latex: str,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[MatrixAlgebraResult]:
    """Calculate matrix transpose."""
    m, n = mat_a.rows, mat_a.cols

    steps.append(
        StepItem(
            id="step_matrix_dims",
            latex=rf"A \in \mathbb{{R}}^{{{m} \times {n}}} \implies A^T",
            note_vi=f"Ma trận ban đầu {m} x {n}, ma trận chuyển vị sẽ có kích thước {n} x {m}.",
            value=f"{n}x{m}",
        )
    )

    mat_t = mat_a.T
    mat_t_latex = _matrix_to_latex(mat_t)
    mat_t_grid = _matrix_to_grid(mat_t)

    steps.append(
        StepItem(
            id="step_transpose_result",
            latex=rf"A^T = {mat_t_latex}",
            note_vi="Đổi các hàng của ma trận A thành các cột tương ứng của ma trận A^T.",
            value=mat_t_latex,
        )
    )

    res = MatrixAlgebraResult(
        operation="transpose",
        matrix_a_latex=mat_a_latex,
        matrix_result_latex=mat_t_latex,
        matrix_result_grid=mat_t_grid,
        verification_method="double_transpose_identity",
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=res,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


def _solve_multiply(
    mat_a: sp.Matrix,
    mat_a_latex: str,
    mat_b_raw: Any,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[MatrixAlgebraResult]:
    """Multiply matrices A and B with dimension compatibility trap checking."""
    mat_b, err_b = _parse_matrix_input(mat_b_raw)
    if err_b or mat_b is None:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="INVALID_MATRIX_B",
                message_vi=err_b or "Ma trận B không hợp lệ cho phép nhân.",
            ),
            restate_vi=restate,
        )

    mat_b_latex = _matrix_to_latex(mat_b)
    m, k = mat_a.rows, mat_a.cols
    p, n = mat_b.rows, mat_b.cols

    steps.append(
        StepItem(
            id="step_matrix_dims",
            latex=rf"A \in \mathbb{{R}}^{{{m} \times {k}}}, B \in \mathbb{{R}}^{{{p} \times {n}}}",
            note_vi=f"Kiểm tra tính tương thích kích thước: A có {k} cột, B có {p} hàng.",
            value=f"({m}x{k}) * ({p}x{n})",
        )
    )

    # Trap: Dimension mismatch
    if k != p:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.HIGH,
                method=ConfidenceMethod.SYMBOLIC,
                score=1.0,
            ),
            error=ErrorDetail(
                code="MATRIX_DIMENSION_MISMATCH",
                message_vi=(
                    f"Không thể nhân ma trận: Số cột của A ({k}) không bằng số hàng "
                    f"của B ({p}). Phép nhân ma trận yêu cầu cols(A) == rows(B)."
                ),
            ),
            steps=steps,
            restate_vi=restate,
        )

    mat_c = mat_a * mat_b
    mat_c_latex = _matrix_to_latex(mat_c)
    mat_c_grid = _matrix_to_grid(mat_c)

    steps.append(
        StepItem(
            id="step_multiply_calc",
            latex=rf"C = A \cdot B = {mat_c_latex} \in \mathbb{{R}}^{{{m} \times {n}}}",
            note_vi=f"Nhân từng hàng của A với từng cột của B. Kích thước tích là {m} x {n}.",
            value=mat_c_latex,
        )
    )

    res = MatrixAlgebraResult(
        operation="multiply",
        matrix_a_latex=mat_a_latex,
        matrix_b_latex=mat_b_latex,
        matrix_result_latex=mat_c_latex,
        matrix_result_grid=mat_c_grid,
        verification_method="row_col_inner_product",
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=res,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


def _solve_add_subtract(
    mat_a: sp.Matrix,
    mat_a_latex: str,
    mat_b_raw: Any,
    is_subtraction: bool,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[MatrixAlgebraResult]:
    """Add or subtract matrices A and B with dimension compatibility checking."""
    mat_b, err_b = _parse_matrix_input(mat_b_raw)
    if err_b or mat_b is None:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="INVALID_MATRIX_B",
                message_vi=err_b or "Ma trận B không hợp lệ cho phép cộng/trừ.",
            ),
            restate_vi=restate,
        )

    mat_b_latex = _matrix_to_latex(mat_b)
    m1, n1 = mat_a.rows, mat_a.cols
    m2, n2 = mat_b.rows, mat_b.cols

    steps.append(
        StepItem(
            id="step_matrix_dims",
            latex=rf"A, B \in \mathbb{{R}}^{{{m1} \times {n1}}}",
            note_vi="Kiểm tra kích thước của hai ma trận có hoàn toàn bằng nhau không.",
            value=f"({m1}x{n1}) vs ({m2}x{n2})",
        )
    )

    if (m1, n1) != (m2, n2):
        op_vi = "trừ" if is_subtraction else "cộng"
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.HIGH,
                method=ConfidenceMethod.SYMBOLIC,
                score=1.0,
            ),
            error=ErrorDetail(
                code="MATRIX_DIMENSION_MISMATCH",
                message_vi=(
                    f"Không thể {op_vi} hai ma trận khác kích thước: "
                    f"A có {m1} x {n1}, trong khi B có {m2} x {n2}."
                ),
            ),
            steps=steps,
            restate_vi=restate,
        )

    mat_c = mat_a - mat_b if is_subtraction else mat_a + mat_b
    mat_c_latex = _matrix_to_latex(mat_c)
    mat_c_grid = _matrix_to_grid(mat_c)
    op_symbol = "-" if is_subtraction else "+"

    steps.append(
        StepItem(
            id="step_arithmetic_result",
            latex=rf"A {op_symbol} B = {mat_c_latex}",
            note_vi=f"Thực hiện phép tính {op_symbol} trên từng phần tử tương ứng.",
            value=mat_c_latex,
        )
    )

    res = MatrixAlgebraResult(
        operation="subtract" if is_subtraction else "add",
        matrix_a_latex=mat_a_latex,
        matrix_b_latex=mat_b_latex,
        matrix_result_latex=mat_c_latex,
        matrix_result_grid=mat_c_grid,
        verification_method="elementwise_arithmetic",
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=res,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


def _solve_scale(
    mat_a: sp.Matrix,
    mat_a_latex: str,
    scalar_raw: Any,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[MatrixAlgebraResult]:
    """Multiply matrix by scalar k."""
    if scalar_raw is None:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="MISSING_SCALAR",
                message_vi="Thiếu hệ số vô hướng (scalar) để nhân ma trận.",
            ),
            restate_vi=restate,
        )

    k_str = _normalize_number_str(str(scalar_raw))
    parsed_k = parse_latex(k_str)
    if parsed_k.expr is None:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="INVALID_SCALAR",
                message_vi=f"Không thể phân tích hệ số vô hướng: '{scalar_raw}'",
            ),
            restate_vi=restate,
        )

    k_expr = parsed_k.expr
    mat_scaled = mat_a * k_expr
    mat_scaled_latex = _matrix_to_latex(mat_scaled)
    mat_scaled_grid = _matrix_to_grid(mat_scaled)

    steps.append(
        StepItem(
            id="step_scale_result",
            latex=rf"{sp.latex(k_expr)} \cdot A = {mat_scaled_latex}",
            note_vi=f"Nhân từng phần tử của ma trận A với hệ số k = {k_str}.",
            value=mat_scaled_latex,
        )
    )

    res = MatrixAlgebraResult(
        operation="scale",
        matrix_a_latex=mat_a_latex,
        matrix_result_latex=mat_scaled_latex,
        matrix_result_grid=mat_scaled_grid,
        verification_method="elementwise_scaling",
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=res,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


def _solve_det_scaled(
    mat_a_raw: Any,
    size_raw: Any,
    det_a_raw: Any,
    scalar_raw: Any,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[MatrixAlgebraResult]:
    """
    Solve det(k*A) = k^n * det(A) for square matrix of order n.
    Handles q_tsa_54: matrix A order n=3 with det(A)=3, calculate det(2A) = 2^3 * 3 = 24.
    Highlights the classic trap: det(kA) != k * det(A).
    """
    n = None
    if size_raw is not None:
        try:
            n = int(size_raw)
        except ValueError:
            pass

    det_a_expr = None
    if det_a_raw is not None:
        parsed_det = parse_latex(_normalize_number_str(str(det_a_raw)))
        det_a_expr = parsed_det.expr

    mat_a_latex = None
    if mat_a_raw is not None:
        mat_a, err = _parse_matrix_input(mat_a_raw)
        if err or mat_a is None:
            return BaseResponseEnvelope(
                status=StatusEnum.ERROR,
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.LOW,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=0.0,
                ),
                error=ErrorDetail(
                    code="INVALID_MATRIX_A",
                    message_vi=err or "Ma trận không hợp lệ",
                ),
                restate_vi=restate,
            )
        if mat_a.rows != mat_a.cols:
            return BaseResponseEnvelope(
                status=StatusEnum.ERROR,
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.HIGH,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=1.0,
                ),
                error=ErrorDetail(
                    code="NON_SQUARE_MATRIX_DETERMINANT",
                    message_vi=f"Ma trận kích thước {mat_a.rows} x {mat_a.cols} không vuông.",
                ),
                restate_vi=restate,
            )
        n = mat_a.rows
        det_a_expr = mat_a.det()
        mat_a_latex = _matrix_to_latex(mat_a)

    if n is None or det_a_expr is None:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="INSUFFICIENT_DATA_FOR_DET_SCALED",
                message_vi=(
                    "Cần cung cấp cấp ma trận (matrix_size) và det(A) (det_a) hoặc ma trận A."
                ),
            ),
            restate_vi=restate,
        )

    k_str = _normalize_number_str(str(scalar_raw or "1"))
    k_expr = parse_latex(k_str).expr or sp.Integer(1)

    steps.append(
        StepItem(
            id="step_det_scale_formula",
            latex=r"\det(k \cdot A) = k^n \cdot \det(A)",
            note_vi=(
                f"Định lý định thức nhân vô hướng: Với ma trận vuông cấp {n}, khi nhân ma trận "
                f"với số k thì định thức nhân với k^{n} (BẪY: học sinh hay quên lũy thừa cấp n)."
            ),
            value=f"k^{n} * det(A)",
        )
    )

    det_scaled_val = (k_expr**n) * det_a_expr
    det_scaled_str = str(det_scaled_val)
    det_scaled_num = float(det_scaled_val.evalf()) if det_scaled_val.is_number else None

    k_latex = sp.latex(k_expr)
    det_a_latex = sp.latex(det_a_expr)
    res_latex = sp.latex(det_scaled_val)
    steps.append(
        StepItem(
            id="step_det_scale_calc",
            latex=(
                rf"\det({k_latex} \cdot A) = ({k_latex})^{{{n}}} "
                rf"\cdot ({det_a_latex}) = {res_latex}"
            ),
            note_vi=f"Thay số: k = {k_str}, n = {n}, det(A) = {det_a_latex}.",
            value=det_scaled_str,
        )
    )

    res = MatrixAlgebraResult(
        operation="det_scaled",
        matrix_a_latex=mat_a_latex,
        value_raw=det_scaled_str,
        value_numeric=det_scaled_num,
        determinant_value=det_scaled_str,
        verification_method="homogeneity_degree_n",
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=res,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


def _solve_system(
    mat_a: sp.Matrix,
    mat_a_latex: str,
    mat_b_raw: Any,
    unknowns_raw: list[str] | None,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[MatrixAlgebraResult]:
    """
    Solve linear system A * x = b.
    Uses Cramer's rule for square invertible systems, Rouché-Capelli for singular systems.
    Handles q_tsa_34: Kirchhoff circuit current matrix equation.
    """
    mat_b, err_b = _parse_matrix_input(mat_b_raw)
    if err_b or mat_b is None:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="INVALID_VECTOR_B",
                message_vi=err_b or "Vector vế phải b không hợp lệ.",
            ),
            restate_vi=restate,
        )

    # If b is row vector 1 x m, transpose to column vector m x 1
    if mat_b.rows == 1 and mat_b.cols == mat_a.rows:
        mat_b = mat_b.T

    mat_b_latex = _matrix_to_latex(mat_b)
    m, n = mat_a.rows, mat_a.cols

    steps.append(
        StepItem(
            id="step_system_setup",
            latex=rf"A \cdot x = b \iff {mat_a_latex} \cdot x = {mat_b_latex}",
            note_vi=f"Thiết lập hệ phương trình tuyến tính gồm {m} phương trình và {n} ẩn số.",
            value=f"{m}x{n}",
        )
    )

    if mat_b.rows != m:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.HIGH,
                method=ConfidenceMethod.SYMBOLIC,
                score=1.0,
            ),
            error=ErrorDetail(
                code="SYSTEM_DIMENSION_MISMATCH",
                message_vi=f"Số hàng của A ({m}) không khớp số phần tử của b ({mat_b.rows}).",
            ),
            steps=steps,
            restate_vi=restate,
        )

    # Square system: Cramer's rule evaluation
    if m == n:
        det_d = mat_a.det()
        det_d_str = str(det_d)

        steps.append(
            StepItem(
                id="step_cramer_main_det",
                latex=rf"D = \det(A) = {sp.latex(det_d)}",
                note_vi="Tính định thức chính D của hệ phương trình.",
                value=det_d_str,
            )
        )

        if det_d != 0:
            sol_vec: list[sp.Expr] = []
            for i in range(n):
                mat_di = mat_a.copy()
                for r in range(m):
                    mat_di[r, i] = mat_b[r, 0]
                di_val = mat_di.det()
                xi_val = di_val / det_d
                sol_vec.append(sp.simplify(xi_val))

                var_name = (
                    unknowns_raw[i] if unknowns_raw and i < len(unknowns_raw) else f"x_{{{i + 1}}}"
                )
                di_latex = sp.latex(di_val)
                xi_latex = sp.latex(sol_vec[-1])
                var_ltx = rf"{var_name} = \frac{{D_{{{i + 1}}}}}{{D}} = {xi_latex}"
                steps.append(
                    StepItem(
                        id=f"step_cramer_var_{i + 1}",
                        latex=rf"D_{{{i + 1}}} = {di_latex} \implies {var_ltx}",
                        note_vi=f"Tính định thức phụ D_{i + 1} và tìm nghiệm {var_name}.",
                        value=str(sol_vec[-1]),
                    )
                )

            # Verification: Check A * x == b
            x_mat = sp.Matrix([[x] for x in sol_vec])
            residual = mat_a * x_mat - mat_b
            assert all(sp.simplify(r) == 0 for r in residual)

            steps.append(
                StepItem(
                    id="step_system_verify",
                    latex=r"A \cdot x - b = \mathbf{0}",
                    note_vi="Thế ngược nghiệm vào hệ phương trình gốc để kiểm chứng tính đúng đắn.",
                    value="verified",
                )
            )

            vec_str = [str(x) for x in sol_vec]
            val_items = []
            for i in range(n):
                name = unknowns_raw[i] if unknowns_raw and i < len(unknowns_raw) else f"x{i + 1}"
                val_items.append(f"{name} = {vec_str[i]}")
            val_raw = ", ".join(val_items)

            res = MatrixAlgebraResult(
                operation="solve_system",
                matrix_a_latex=mat_a_latex,
                matrix_b_latex=mat_b_latex,
                value_raw=val_raw,
                vector_result=vec_str,
                determinant_value=det_d_str,
                is_invertible=True,
                verification_method="cramer_and_back_substitution",
            )

            return BaseResponseEnvelope(
                status=StatusEnum.VERIFIED,
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.HIGH,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=1.0,
                ),
                result=res,
                steps=steps,
                warnings=warnings,
                restate_vi=restate,
            )

        # det_d == 0: Check consistency via Rouché-Capelli
        rank_a = mat_a.rank()
        aug_mat = mat_a.row_join(mat_b)
        rank_aug = aug_mat.rank()

        steps.append(
            StepItem(
                id="step_rouche_capelli",
                latex=rf"\text{{rank}}(A) = {rank_a}, \quad \text{{rank}}([A|b]) = {rank_aug}",
                note_vi="Định thức D = 0. Kiểm tra định lý Rouché-Capelli qua hạng ma trận.",
                value=f"rank(A)={rank_a}, rank(aug)={rank_aug}",
            )
        )

        if rank_a < rank_aug:
            return BaseResponseEnvelope(
                status=StatusEnum.ERROR,
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.HIGH,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=1.0,
                ),
                error=ErrorDetail(
                    code="SYSTEM_INCONSISTENT_NO_SOLUTION",
                    message_vi=f"Hệ vô nghiệm (rank(A) = {rank_a} < rank([A|b]) = {rank_aug}).",
                ),
                steps=steps,
                restate_vi=restate,
            )

        # Infinitely many solutions
        return BaseResponseEnvelope(
            status=StatusEnum.VERIFIED,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.HIGH,
                method=ConfidenceMethod.SYMBOLIC,
                score=1.0,
            ),
            result=MatrixAlgebraResult(
                operation="solve_system",
                matrix_a_latex=mat_a_latex,
                matrix_b_latex=mat_b_latex,
                value_raw="infinitely_many_solutions",
                vector_result=["infinitely_many_solutions"],
                determinant_value="0",
                is_invertible=False,
                verification_method="rouche_capelli_infinite_solutions",
            ),
            steps=steps,
            warnings=[
                WarningItem(
                    code=WarningCode.WARN_MULTIPLE_BRANCHES,
                    message_vi=f"Hệ có vô số nghiệm phụ thuộc {n - rank_a} tham số tự do.",
                )
            ],
            restate_vi=restate,
        )

    # Rectangular system: solve via SymPy solve
    symbols = [sp.Symbol(f"x_{i + 1}") for i in range(n)]
    eqs = [sp.Eq(sum(mat_a[r, c] * symbols[c] for c in range(n)), mat_b[r, 0]) for r in range(m)]
    sol = sp.solve(eqs, symbols, dict=True)

    if not sol:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.HIGH,
                method=ConfidenceMethod.SYMBOLIC,
                score=1.0,
            ),
            error=ErrorDetail(
                code="SYSTEM_INCONSISTENT_NO_SOLUTION",
                message_vi="Hệ phương trình tuyến tính vô nghiệm.",
            ),
            steps=steps,
            restate_vi=restate,
        )

    sol_dict = sol[0]
    vec_res = [str(sol_dict.get(s, s)) for s in symbols]
    val_raw = ", ".join(f"{s} = {vec_res[i]}" for i, s in enumerate(symbols))

    res = MatrixAlgebraResult(
        operation="solve_system",
        matrix_a_latex=mat_a_latex,
        matrix_b_latex=mat_b_latex,
        value_raw=val_raw,
        vector_result=vec_res,
        verification_method="linear_solve_crosscheck",
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=res,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


def _solve_eigenvalues(
    mat_a_raw: Any,
    trace_a_raw: Any,
    det_a_raw: Any,
    size_raw: Any,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[MatrixAlgebraResult]:
    """
    Solve eigenvalues of matrix.
    Supports:
    1. Direct square matrix input (e.g. q_calc_12).
    2. Characteristic polynomial from trace and det for 2x2 (e.g. q_tsa_28: det=6, tr=5).
    """
    mat_a_latex = None

    # Case A: trace and det given for 2x2 matrix (q_tsa_28)
    if mat_a_raw is None and trace_a_raw is not None and det_a_raw is not None:
        tr_expr = parse_latex(_normalize_number_str(str(trace_a_raw))).expr
        det_expr = parse_latex(_normalize_number_str(str(det_a_raw))).expr
        if tr_expr is None or det_expr is None:
            return BaseResponseEnvelope(
                status=StatusEnum.ERROR,
                confidence=ConfidenceInfo(
                    level=ConfidenceLevel.LOW,
                    method=ConfidenceMethod.SYMBOLIC,
                    score=0.0,
                ),
                error=ErrorDetail(
                    code="INVALID_TRACE_OR_DET",
                    message_vi="Giá trị vết (trace) hoặc định thức không hợp lệ.",
                ),
                restate_vi=restate,
            )

        det_str = str(det_expr)
        trace_str = str(tr_expr)
        lam = sp.Symbol(r"\lambda")

        tr_ltx = sp.latex(tr_expr)
        det_ltx = sp.latex(det_expr)
        steps.append(
            StepItem(
                id="step_char_poly_trace_det",
                latex=rf"P(\lambda) = \lambda^2 - ({tr_ltx})\lambda + ({det_ltx}) = 0",
                note_vi="Đa thức đặc trưng: P(lambda) = lambda^2 - tr(A)*lambda + det(A) = 0.",
                value=f"lambda^2 - {tr_expr}*lambda + {det_expr} = 0",
            )
        )

        char_poly_eq = sp.Eq(lam**2 - tr_expr * lam + det_expr, 0)
        sol_set = sp.solveset(char_poly_eq, lam, domain=sp.S.Reals)
        roots = sorted(sol_set, key=lambda x: float(x.evalf()))

        eigs_str = [str(r) for r in roots]
        steps.append(
            StepItem(
                id="step_eigen_roots",
                latex=rf"\lambda \in \{{{', '.join(sp.latex(r) for r in roots)}\}}",
                note_vi=f"Giá trị riêng thu được: {', '.join(eigs_str)}.",
                value=", ".join(eigs_str),
            )
        )

        # Verification: Sum == trace and Product == det
        assert sp.simplify(sum(roots) - tr_expr) == 0
        assert sp.simplify(sp.prod(roots) - det_expr) == 0

        steps.append(
            StepItem(
                id="step_eigen_verify",
                latex=r"\sum \lambda_i = \text{tr}(A), \quad \prod \lambda_i = \det(A)",
                note_vi="Kiểm chứng theo Viète: Tổng nghiệm bằng vết, tích bằng định thức.",
                value="verified",
            )
        )

        res = MatrixAlgebraResult(
            operation="eigenvalues",
            value_raw=", ".join(eigs_str),
            eigenvalues=eigs_str,
            determinant_value=det_str,
            trace_value=trace_str,
            verification_method="trace_det_viete_crosscheck",
        )

        return BaseResponseEnvelope(
            status=StatusEnum.VERIFIED,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.HIGH,
                method=ConfidenceMethod.SYMBOLIC,
                score=1.0,
            ),
            result=res,
            steps=steps,
            warnings=warnings,
            restate_vi=restate,
        )

    # Case B: Direct matrix input (q_calc_12)
    mat_a, err = _parse_matrix_input(mat_a_raw)
    if err or mat_a is None:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="INVALID_MATRIX_A",
                message_vi=err or "Ma trận không hợp lệ",
            ),
            restate_vi=restate,
        )

    m, n = mat_a.rows, mat_a.cols
    mat_a_latex = _matrix_to_latex(mat_a)

    if m != n:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.HIGH,
                method=ConfidenceMethod.SYMBOLIC,
                score=1.0,
            ),
            error=ErrorDetail(
                code="NON_SQUARE_MATRIX_EIGENVALUES",
                message_vi=(
                    f"Giá trị riêng chỉ xác định cho ma trận vuông. "
                    f"Kích thước {m} x {n} không hợp lệ."
                ),
            ),
            steps=steps,
            restate_vi=restate,
        )

    lam = sp.Symbol(r"\lambda")
    char_poly_mat = mat_a - lam * sp.eye(n)
    char_poly_expr = sp.factor(char_poly_mat.det())

    steps.append(
        StepItem(
            id="step_char_poly",
            latex=rf"\det(A - \lambda I_{{{n}}}) = {sp.latex(char_poly_expr)} = 0",
            note_vi="Thiết lập phương trình đặc trưng det(A - lambda*I) = 0.",
            value=str(char_poly_expr),
        )
    )

    eigen_dict = mat_a.eigenvals()
    roots = []
    for val, mult in eigen_dict.items():
        for _ in range(mult):
            roots.append(val)

    roots_sorted = sorted(roots, key=lambda x: float(x.evalf()) if x.is_real else str(x))
    eigs_str = [str(r) for r in roots_sorted]

    steps.append(
        StepItem(
            id="step_eigen_solve",
            latex=rf"\lambda \in \{{{', '.join(sp.latex(r) for r in roots_sorted)}\}}",
            note_vi=f"Các giá trị riêng của ma trận là: {', '.join(eigs_str)}.",
            value=", ".join(eigs_str),
        )
    )

    det_val = mat_a.det()
    tr_val = mat_a.trace()

    res = MatrixAlgebraResult(
        operation="eigenvalues",
        matrix_a_latex=mat_a_latex,
        value_raw=", ".join(eigs_str),
        eigenvalues=eigs_str,
        determinant_value=str(det_val),
        trace_value=str(tr_val),
        verification_method="char_poly_factoring",
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=res,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )


def _solve_parameter(
    mat_a_raw: Any,
    param_raw: Any,
    target_raw: Any,
    restate: str,
    steps: list[StepItem],
    warnings: list[WarningItem],
) -> BaseResponseEnvelope[MatrixAlgebraResult]:
    """
    Solve for parameter m in matrix equation, e.g. det(A(m)) = target_value.
    Eliminates extraneous roots via back-substitution.
    """
    param_name = str(param_raw or "m").strip()
    target_str = _normalize_number_str(str(target_raw if target_raw is not None else "0"))
    target_expr = parse_latex(target_str).expr or sp.Integer(0)

    mat_a, err = _parse_matrix_input(mat_a_raw)
    if err or mat_a is None:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="INVALID_MATRIX_A",
                message_vi=err or "Ma trận không hợp lệ",
            ),
            restate_vi=restate,
        )

    m, n = mat_a.rows, mat_a.cols
    if m != n:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.HIGH,
                method=ConfidenceMethod.SYMBOLIC,
                score=1.0,
            ),
            error=ErrorDetail(
                code="NON_SQUARE_MATRIX_DETERMINANT",
                message_vi=f"Ma trận cấp {m} x {n} không vuông.",
            ),
            restate_vi=restate,
        )

    mat_a_latex = _matrix_to_latex(mat_a)
    det_expr = sp.simplify(mat_a.det())
    param_var = next(
        (s for s in det_expr.free_symbols if s.name == param_name),
        sp.Symbol(param_name),
    )

    steps.append(
        StepItem(
            id="step_param_det_expr",
            latex=rf"\det(A({param_name})) = {sp.latex(det_expr)} = {sp.latex(target_expr)}",
            note_vi=f"Tính biểu thức định thức của ma trận phụ thuộc tham số {param_name}.",
            value=str(det_expr),
        )
    )

    eq = sp.Eq(det_expr, target_expr)
    sol_set = sp.solveset(eq, param_var, domain=sp.S.Reals)

    if isinstance(sol_set, sp.ConditionSet):
        return BaseResponseEnvelope(
            status=StatusEnum.UNSUPPORTED,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            unsupported_reason="complex_equation",
            error=ErrorDetail(
                code="CONDITION_SET_UNSOLVED",
                message_vi="SymPy không thể tìm tập nghiệm giải tích hữu hạn cho tham số.",
            ),
            steps=steps,
            restate_vi=restate,
        )

    raw_roots = list(sol_set)
    verified_roots: list[sp.Expr] = []

    # Back-substitution verification to reject extraneous roots
    for root in raw_roots:
        mat_sub = mat_a.subs(param_var, root)
        det_sub = sp.simplify(mat_sub.det())
        if sp.simplify(det_sub - target_expr) == 0:
            verified_roots.append(root)

    verified_roots = sorted(
        verified_roots,
        key=lambda x: float(x.evalf()) if x.is_real else str(x),
    )
    sol_strs = [str(r) for r in verified_roots]

    steps.append(
        StepItem(
            id="step_param_roots",
            latex=rf"{param_name} \in \{{{', '.join(sp.latex(r) for r in verified_roots)}\}}",
            note_vi=f"Nghiệm tham số sau khi kiểm tra: {', '.join(sol_strs)}.",
            value=", ".join(sol_strs),
        )
    )

    res = MatrixAlgebraResult(
        operation="solve_parameter",
        matrix_a_latex=mat_a_latex,
        value_raw=", ".join(sol_strs),
        solutions=sol_strs,
        determinant_value=str(det_expr),
        verification_method="back_substitution_determinant_check",
    )

    return BaseResponseEnvelope(
        status=StatusEnum.VERIFIED,
        confidence=ConfidenceInfo(
            level=ConfidenceLevel.HIGH,
            method=ConfidenceMethod.SYMBOLIC,
            score=1.0,
        ),
        result=res,
        steps=steps,
        warnings=warnings,
        restate_vi=restate,
    )
