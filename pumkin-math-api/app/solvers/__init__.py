"""
Deterministic Solvers Layer (SymPy CAS)
Calculates exact mathematical solutions without LLM hallucination.
"""

from app.solvers.integral import solve_integral
from app.solvers.last_digit import solve_last_digit
from app.solvers.matrix_algebra import solve_matrix_algebra
from app.solvers.planar_area import solve_planar_area
from app.solvers.registry import SOLVER_REGISTRY, get_solver, register_solver, solve_dsl
from app.solvers.sequence import solve_sequence_progression
from app.solvers.trigonometric import solve_trigonometric

__all__ = [
    "SOLVER_REGISTRY",
    "register_solver",
    "get_solver",
    "solve_dsl",
    "solve_integral",
    "solve_last_digit",
    "solve_matrix_algebra",
    "solve_planar_area",
    "solve_sequence_progression",
    "solve_trigonometric",
]
