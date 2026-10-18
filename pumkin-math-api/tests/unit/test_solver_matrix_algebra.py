"""
Unit Tests for Matrix Algebra & Determinant Solver
Validates:
- Determinants (Triangular, 2x2, 3x3, non-square rejection)
- Matrix Inverses (2x2, 3x3, singular rejection, non-square rejection)
- Matrix Rank (Rank deficient, full rank, rectangular)
- Matrix Trace (Diagonal sum, non-square rejection)
- Matrix Transpose (Dimension inversion, double transpose)
- Matrix Multiplication (Compatible dimensions, mismatch rejection)
- Scaled Determinant det(kA) = k^n * det(A) (Catching linear scaling trap)
- Linear Systems Ax = b (Cramer unique solution, inconsistent system, infinite solutions)
- Eigenvalues (Direct matrix, indirect trace/det relationship)
- Parameter Solving (det(A(m)) = target, back-substitution verification)
- Pedagogical Step Traces completeness
"""

import pytest

from app.schemas.common import StatusEnum
from app.schemas.dsl import LinearAlgebraDSL, MatrixAlgebraDSL
from app.solvers.matrix_algebra import solve_matrix_algebra


@pytest.mark.unit
def test_det_triangular_canonical():
    """Validates q_calc_04: Upper triangular 3x3 matrix det = 1*4*6 = 24."""
    dsl = MatrixAlgebraDSL(
        operation="det",
        matrix=[
            ["1", "2", "3"],
            ["0", "4", "5"],
            ["0", "0", "6"],
        ],
        restate_vi="Tính định thức của ma trận tam giác trên A.",
    )
    env = solve_matrix_algebra(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    assert env.result.value_raw == "24"
    assert env.result.value_numeric == 24.0
    assert env.result.is_invertible is True


@pytest.mark.unit
def test_det_2x2_basic():
    """Validates 2x2 matrix determinant ad - bc: 1*4 - 2*3 = -2."""
    dsl = MatrixAlgebraDSL(
        operation="det",
        matrix=[["1", "2"], ["3", "4"]],
    )
    env = solve_matrix_algebra(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result.value_raw == "-2"
    assert env.result.value_numeric == -2.0


@pytest.mark.unit
def test_trap_det_non_square_rejected():
    """Trap: Non-square 2x3 matrix has no determinant."""
    dsl = MatrixAlgebraDSL(
        operation="det",
        matrix=[["1", "2", "3"], ["4", "5", "6"]],
    )
    env = solve_matrix_algebra(dsl)
    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "NON_SQUARE_MATRIX_DETERMINANT"


@pytest.mark.unit
def test_inverse_2x2_canonical():
    """Validates q_calc_07: [[1, 2], [3, 4]] -> inverse [[-2, 1], [3/2, -1/2]]."""
    dsl = MatrixAlgebraDSL(
        operation="inverse",
        matrix=[["1", "2"], ["3", "4"]],
    )
    env = solve_matrix_algebra(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    grid = env.result.matrix_result_grid
    assert grid is not None
    assert grid[0][0] == "-2"
    assert grid[0][1] == "1"
    assert grid[1][0] in ("3/2", "1.5")
    assert grid[1][1] in ("-1/2", "-0.5")


@pytest.mark.unit
def test_trap_inverse_singular_det_zero_rejected():
    """Trap: Singular matrix det(A) = 0 has no inverse."""
    dsl = MatrixAlgebraDSL(
        operation="inverse",
        matrix=[["1", "2"], ["2", "4"]],
    )
    env = solve_matrix_algebra(dsl)
    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "SINGULAR_MATRIX_NO_INVERSE"


@pytest.mark.unit
def test_trap_inverse_non_square_rejected():
    """Trap: Rectangular matrix cannot be inverted."""
    dsl = MatrixAlgebraDSL(
        operation="inverse",
        matrix=[["1", "2"], ["3", "4"], ["5", "6"]],
    )
    env = solve_matrix_algebra(dsl)
    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "NON_SQUARE_MATRIX_INVERSE"


@pytest.mark.unit
def test_rank_canonical():
    """Validates q_calc_18: rank of 3x3 matrix with collinear rows is 1."""
    dsl = MatrixAlgebraDSL(
        operation="rank",
        matrix=[
            ["1", "2", "3"],
            ["2", "4", "6"],
            ["-1", "-2", "-3"],
        ],
    )
    env = solve_matrix_algebra(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result.value_raw == "1"
    assert env.result.rank_value == 1


@pytest.mark.unit
def test_rank_full_rank():
    """Rank of 3x3 identity matrix is 3."""
    dsl = MatrixAlgebraDSL(
        operation="rank",
        matrix=[
            ["1", "0", "0"],
            ["0", "1", "0"],
            ["0", "0", "1"],
        ],
    )
    env = solve_matrix_algebra(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result.rank_value == 3


@pytest.mark.unit
def test_trace_canonical():
    """Validates q_calc_20: Trace of 3x3 matrix = 5 + (-3) + 7 = 9."""
    dsl = MatrixAlgebraDSL(
        operation="trace",
        matrix=[
            ["5", "2", "1"],
            ["0", "-3", "4"],
            ["1", "1", "7"],
        ],
    )
    env = solve_matrix_algebra(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result.value_raw == "9"
    assert env.result.trace_value == "9"


@pytest.mark.unit
def test_trap_trace_non_square_rejected():
    """Trap: Trace is undefined for non-square matrix."""
    dsl = MatrixAlgebraDSL(
        operation="trace",
        matrix=[["1", "2", "3"], ["4", "5", "6"]],
    )
    env = solve_matrix_algebra(dsl)
    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "NON_SQUARE_MATRIX_TRACE"


@pytest.mark.unit
def test_transpose_rectangular():
    """Transpose turns 2x3 into 3x2."""
    dsl = MatrixAlgebraDSL(
        operation="transpose",
        matrix=[["1", "2", "3"], ["4", "5", "6"]],
    )
    env = solve_matrix_algebra(dsl)
    assert env.status == StatusEnum.VERIFIED
    grid = env.result.matrix_result_grid
    assert len(grid) == 3
    assert len(grid[0]) == 2
    assert grid[0] == ["1", "4"]
    assert grid[1] == ["2", "5"]
    assert grid[2] == ["3", "6"]


@pytest.mark.unit
def test_multiply_canonical():
    """Multiply 2x2 by 2x2."""
    dsl = MatrixAlgebraDSL(
        operation="multiply",
        matrix=[["1", "2"], ["3", "4"]],
        matrix_b=[["2", "0"], ["1", "2"]],
    )
    env = solve_matrix_algebra(dsl)
    assert env.status == StatusEnum.VERIFIED
    grid = env.result.matrix_result_grid
    # row 0: 1*2 + 2*1 = 4; 1*0 + 2*2 = 4
    # row 1: 3*2 + 4*1 = 10; 3*0 + 4*2 = 8
    assert grid == [["4", "4"], ["10", "8"]]


@pytest.mark.unit
def test_trap_multiply_dimension_mismatch_rejected():
    """Trap: 2x3 times 2x3 is incompatible (cols A != rows B)."""
    dsl = MatrixAlgebraDSL(
        operation="multiply",
        matrix=[["1", "2", "3"], ["4", "5", "6"]],
        matrix_b=[["1", "2", "3"], ["4", "5", "6"]],
    )
    env = solve_matrix_algebra(dsl)
    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "MATRIX_DIMENSION_MISMATCH"


@pytest.mark.unit
def test_det_scaled_homogeneity_canonical():
    """
    Validates q_tsa_54: matrix A order n=3 with det(A)=3, calculate det(2A).
    det(2A) = 2^3 * 3 = 24.
    Catches the student trap det(2A) = 2*det(A) = 6.
    """
    dsl = MatrixAlgebraDSL(
        operation="det_scaled",
        matrix_size=3,
        det_a="3",
        scalar="2",
        restate_vi="Ma trận vuông cấp 3 có det(A)=3. Tính det(2A).",
    )
    env = solve_matrix_algebra(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result.value_raw == "24"
    assert env.result.value_numeric == 24.0


@pytest.mark.unit
def test_solve_system_cramer_canonical():
    """
    Validates q_tsa_34: Kirchhoff 3x3 current system:
    2*I_1 + I_2 = 5
    I_1 + 3*I_2 + I_3 = 10
    I_2 + 2*I_3 = 7
    -> I_1 = 1.5, I_2 = 2.0, I_3 = 2.5.
    """
    dsl = MatrixAlgebraDSL(
        operation="solve_system",
        matrix=[
            ["2", "1", "0"],
            ["1", "3", "1"],
            ["0", "1", "2"],
        ],
        matrix_b=["5", "10", "7"],
        unknowns=["I_1", "I_2", "I_3"],
        restate_vi="Giải hệ 3 phương trình mạng dòng điện Kirchhoff.",
    )
    env = solve_matrix_algebra(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result is not None
    vec = env.result.vector_result
    assert vec is not None
    assert len(vec) == 3
    # I_1 = 3/2 or 1.5, I_2 = 2, I_3 = 5/2 or 2.5
    assert vec[0] in ("3/2", "1.5")
    assert vec[1] == "2"
    assert vec[2] in ("5/2", "2.5")


@pytest.mark.unit
def test_trap_solve_system_inconsistent_no_solution():
    """Trap: Parallel inconsistent equations x+y=1 and x+y=2 -> no solution."""
    dsl = MatrixAlgebraDSL(
        operation="solve_system",
        matrix=[["1", "1"], ["1", "1"]],
        matrix_b=["1", "2"],
    )
    env = solve_matrix_algebra(dsl)
    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "SYSTEM_INCONSISTENT_NO_SOLUTION"


@pytest.mark.unit
def test_solve_system_infinitely_many_solutions():
    """Dependent equations x+y=1 and 2x+2y=2 -> infinitely many solutions."""
    dsl = MatrixAlgebraDSL(
        operation="solve_system",
        matrix=[["1", "1"], ["2", "2"]],
        matrix_b=["1", "2"],
    )
    env = solve_matrix_algebra(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result.value_raw == "infinitely_many_solutions"
    assert len(env.warnings) > 0


@pytest.mark.unit
def test_eigenvalues_canonical_matrix():
    """
    Validates q_calc_12: Triangular matrix [[1, 0, 2], [0, 3, 1], [0, 0, -2]].
    Eigenvalues on diagonal: -2, 1, 3.
    """
    dsl = MatrixAlgebraDSL(
        operation="eigenvalues",
        matrix=[
            ["1", "0", "2"],
            ["0", "3", "1"],
            ["0", "0", "-2"],
        ],
    )
    env = solve_matrix_algebra(dsl)
    assert env.status == StatusEnum.VERIFIED
    eigs = env.result.eigenvalues
    assert eigs is not None
    assert "-2" in eigs
    assert "1" in eigs
    assert "3" in eigs


@pytest.mark.unit
def test_eigenvalues_from_trace_and_det():
    """
    Validates q_tsa_28: 2x2 matrix with det(A)=6 and tr(A)=5.
    lambda^2 - 5*lambda + 6 = 0 -> lambda_1 = 2, lambda_2 = 3.
    """
    dsl = MatrixAlgebraDSL(
        operation="eigenvalues",
        matrix_size=2,
        det_a="6",
        trace_a="5",
        restate_vi="Ma trận vuông cấp 2 có det(A)=6 và tr(A)=5. Tìm hai giá trị riêng.",
    )
    env = solve_matrix_algebra(dsl)
    assert env.status == StatusEnum.VERIFIED
    eigs = env.result.eigenvalues
    assert eigs is not None
    assert "2" in eigs
    assert "3" in eigs


@pytest.mark.unit
def test_solve_parameter_det_zero():
    """
    Solve for parameter m so det([[m, 1], [4, m]]) = 0.
    m^2 - 4 = 0 -> m = -2 or m = 2.
    """
    dsl = MatrixAlgebraDSL(
        operation="solve_parameter",
        matrix=[["m", "1"], ["4", "m"]],
        parameter="m",
        target_value="0",
        restate_vi="Tìm tham số m để định thức ma trận bằng 0.",
    )
    env = solve_matrix_algebra(dsl)
    assert env.status == StatusEnum.VERIFIED
    sols = env.result.solutions
    assert sols is not None
    assert "-2" in sols
    assert "2" in sols


@pytest.mark.unit
def test_matrix_parsing_unequal_row_length_rejected():
    """Trap: Matrix with jagged rows (row 1 has 3 elements, row 2 has 2) is rejected."""
    dsl = MatrixAlgebraDSL(
        operation="det",
        matrix=[["1", "2", "3"], ["4", "5"]],
    )
    env = solve_matrix_algebra(dsl)
    assert env.status == StatusEnum.ERROR
    assert env.error is not None
    assert env.error.code == "INVALID_MATRIX_SYNTAX"


@pytest.mark.unit
def test_latex_string_matrix_input():
    """Matrix given as LaTeX \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}."""
    dsl = MatrixAlgebraDSL(
        operation="det",
        matrix=r"\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}",
    )
    env = solve_matrix_algebra(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result.value_raw == "-2"


@pytest.mark.unit
def test_backward_compatible_linear_algebra_dsl():
    """Verify legacy LinearAlgebraDSL routes seamlessly to solver."""
    legacy_dsl = LinearAlgebraDSL(
        type="dai_so_tuyen_tinh_ma_tran",
        matrices={"A": [[1.0, 2.0], [3.0, 4.0]]},
        operation="det",
    )
    env = solve_matrix_algebra(legacy_dsl)
    assert env.status == StatusEnum.VERIFIED
    assert env.result.value_raw == "-2"


@pytest.mark.unit
def test_pedagogical_step_trace_completeness():
    """Verifies that generated step traces contain valid KaTeX formulas and explanatory notes."""
    dsl = MatrixAlgebraDSL(
        operation="det",
        matrix=[["2", "3"], ["1", "4"]],
    )
    env = solve_matrix_algebra(dsl)
    assert env.status == StatusEnum.VERIFIED
    assert len(env.steps) >= 2
    for step in env.steps:
        assert step.id.startswith("step_")
        assert len(step.note_vi) > 5
        assert len(step.latex) > 0
