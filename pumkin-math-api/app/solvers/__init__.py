"""
Deterministic Solvers Layer (SymPy CAS)
Calculates exact mathematical solutions without LLM hallucination.
"""

from app.solvers.integral import solve_integral
from app.solvers.registry import SOLVER_REGISTRY, get_solver, register_solver, solve_dsl

__all__ = [
    "SOLVER_REGISTRY",
    "register_solver",
    "get_solver",
    "solve_dsl",
    "solve_integral",
]
