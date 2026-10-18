"""
Solver Registry Layer
Maintains mapping of DSL domain types to their deterministic CAS solver implementations.
"""

from collections.abc import Callable
from typing import Any

from app.schemas.common import (
    BaseResponseEnvelope,
    ConfidenceInfo,
    ConfidenceLevel,
    ConfidenceMethod,
    ErrorDetail,
    StatusEnum,
)
from app.schemas.dsl import BaseDSL

SolverFunc = Callable[[Any], BaseResponseEnvelope[Any]]

SOLVER_REGISTRY: dict[str, SolverFunc] = {}


def register_solver(dsl_type: str) -> Callable[[SolverFunc], SolverFunc]:
    """Decorator to register a solver function for a specific problem type."""

    def decorator(func: SolverFunc) -> SolverFunc:
        SOLVER_REGISTRY[dsl_type] = func
        return func

    return decorator


def get_solver(dsl_type: str) -> SolverFunc | None:
    """Retrieve solver function by DSL type string."""
    return SOLVER_REGISTRY.get(dsl_type)


def solve_dsl(dsl: BaseDSL) -> BaseResponseEnvelope[Any]:
    """
    Central dispatch function to solve any typed DSL problem using registered solvers.
    """
    solver = get_solver(dsl.type)
    if solver is None:
        return BaseResponseEnvelope(
            status=StatusEnum.ERROR,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=0.0,
            ),
            error=ErrorDetail(
                code="SOLVER_NOT_FOUND",
                message_vi=f"Chưa có bộ giải chuyên biệt cho dạng bài '{dsl.type}'.",
                details={"dsl_type": dsl.type},
            ),
        )
    return solver(dsl)
