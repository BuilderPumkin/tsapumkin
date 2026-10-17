"""
Common Schema Definitions for Pumkin Math API
Pydantic v2 data models for status, errors, and health checks.
"""

from enum import StrEnum
from typing import Any

from pydantic import BaseModel, Field


class StatusEnum(StrEnum):
    VERIFIED = "verified"
    NEEDS_REVIEW = "needs_review"
    UNSUPPORTED = "unsupported"
    ERROR = "error"
    NOT_IMPLEMENTED = "not_implemented"


class ErrorDetail(BaseModel):
    code: str = Field(..., description="Machine-readable error code")
    message: str = Field(..., description="Human-readable explanation in Vietnamese")
    details: dict[str, Any] | None = Field(
        default=None, description="Optional diagnostic details"
    )


class StandardErrorResponse(BaseModel):
    status: StatusEnum = Field(..., description="Response status")
    confidence: float = Field(
        default=0.0, ge=0.0, le=1.0, description="Confidence level (0.0 - 1.0)"
    )
    method: str = Field(..., description="Verification/Execution method")
    error: ErrorDetail = Field(..., description="Detailed error information")


class HealthResponse(BaseModel):
    status: str = Field(default="healthy", description="Service health state")
    service_version: str = Field(..., description="Current semantic version of Pumkin Math API")
    sympy_version: str = Field(..., description="Installed SymPy CAS engine version")
    python_version: str = Field(..., description="Runtime Python version")
