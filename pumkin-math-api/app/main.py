"""
Pumkin Math API - Main Application Entrypoint
FastAPI application defining health check and core math endpoints with Pydantic v2 schemas.
"""

import sys
from uuid import uuid4

import sympy
from fastapi import Depends, FastAPI, status
from fastapi.responses import JSONResponse

from app import __version__
from app.auth import verify_api_key
from app.schemas.check import CheckRequest, CheckResponse
from app.schemas.common import (
    ConfidenceLevel,
    ConfidenceMethod,
    HealthResponse,
    StatusEnum,
)
from app.schemas.generate import GenerateRequest, GenerateResponse
from app.schemas.solve import SolveRequest, SolveResponse

app = FastAPI(
    title="Pumkin Math API",
    description="Microservice tính toán tất định và kiểm định toán học cho PUMKIN.DEV",
    version=__version__,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)


def make_501_not_implemented_response(message_vi: str) -> JSONResponse:
    """Helper creating standardized BaseResponseEnvelope for 501 Not Implemented."""
    payload = {
        "schema_version": "1.0.0",
        "trace_id": str(uuid4()),
        "status": StatusEnum.ERROR,
        "confidence": {
            "level": ConfidenceLevel.LOW,
            "method": ConfidenceMethod.SYMBOLIC,
            "score": 0.0,
        },
        "restate_vi": None,
        "result": None,
        "steps": [],
        "warnings": [],
        "error": {
            "code": "NOT_IMPLEMENTED",
            "message_vi": message_vi,
            "details": None,
        },
    }
    return JSONResponse(status_code=status.HTTP_501_NOT_IMPLEMENTED, content=payload)


@app.get(
    "/health",
    response_model=HealthResponse,
    tags=["System"],
    summary="Kiểm tra trạng thái hoạt động và phiên bản hệ thống",
)
async def health_check():
    """Public health check endpoint returning service, SymPy, and Python runtime versions."""
    return HealthResponse(
        status="healthy",
        service_version=__version__,
        sympy_version=sympy.__version__,
        python_version=sys.version.split()[0],
    )


@app.post(
    "/v1/solve",
    response_model=SolveResponse,
    responses={
        501: {"model": SolveResponse, "description": "Chức năng chưa được cài đặt"},
        401: {"description": "Chưa xác thực hoặc khóa không hợp lệ"},
    },
    tags=["Core"],
    summary="Gia sư AI giải toán Socratic 4 bậc",
)
async def solve_endpoint(
    request: SolveRequest,
    _auth: str = Depends(verify_api_key),
):
    """
    Socratic solver endpoint.
    Returns 501 Not Implemented during initial scaffold phase.
    """
    return make_501_not_implemented_response(
        "Chức năng Gia sư AI (/v1/solve) chưa được cài đặt (sẽ xây dựng ở Prompt tiếp theo)."
    )


@app.post(
    "/v1/check",
    response_model=CheckResponse,
    responses={
        501: {"model": CheckResponse, "description": "Chức năng chưa được cài đặt"},
        401: {"description": "Chưa xác thực hoặc khóa không hợp lệ"},
    },
    tags=["Core"],
    summary="Chấm bài thi & Đánh giá bước giải",
)
async def check_endpoint(
    request: CheckRequest,
    _auth: str = Depends(verify_api_key),
):
    """
    Submission checker endpoint.
    Returns 501 Not Implemented during initial scaffold phase.
    """
    return make_501_not_implemented_response(
        "Chức năng Chấm bài (/v1/check) chưa được cài đặt (sẽ xây dựng ở Prompt tiếp theo)."
    )


@app.post(
    "/v1/generate",
    response_model=GenerateResponse,
    responses={
        501: {"model": GenerateResponse, "description": "Chức năng chưa được cài đặt"},
        401: {"description": "Chưa xác thực hoặc khóa không hợp lệ"},
    },
    tags=["Core"],
    summary="Tạo đề & Sinh biến thể câu hỏi tương đương",
)
async def generate_endpoint(
    request: GenerateRequest,
    _auth: str = Depends(verify_api_key),
):
    """
    Question generator endpoint.
    Returns 501 Not Implemented during initial scaffold phase.
    """
    return make_501_not_implemented_response(
        "Chức năng Tạo đề (/v1/generate) chưa được cài đặt (sẽ xây dựng ở Prompt tiếp theo)."
    )
