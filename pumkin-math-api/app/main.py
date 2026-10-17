"""
Pumkin Math API - Main Application Entrypoint
FastAPI application defining health check and core math endpoints.
"""

import sys

import sympy
from fastapi import Depends, FastAPI, status
from fastapi.responses import JSONResponse

from app import __version__
from app.auth import verify_api_key
from app.schemas.check import CheckRequest
from app.schemas.common import HealthResponse, StandardErrorResponse
from app.schemas.generate import GenerateRequest
from app.schemas.solve import SolveRequest

app = FastAPI(
    title="Pumkin Math API",
    description="Microservice tính toán tất định và kiểm định toán học cho PUMKIN.DEV",
    version=__version__,
    docs_url="/docs",
    redoc_url="/redoc",
)


@app.get(
    "/health",
    response_model=HealthResponse,
    tags=["System"],
    summary="Kiểm tra trạng thái hoạt động và phiên bản hệ thống",
)
async def health_check():
    """
    Public health check endpoint returning service, SymPy, and Python runtime versions.
    """
    return HealthResponse(
        status="healthy",
        service_version=__version__,
        sympy_version=sympy.__version__,
        python_version=sys.version.split()[0],
    )


@app.post(
    "/v1/solve",
    responses={
        501: {"model": StandardErrorResponse, "description": "Chức năng chưa được cài đặt"},
        401: {"description": "Chưa xác thực hoặc khóa không hợp lệ"},
    },
    tags=["Core"],
    summary="Gia sư AI giải toán Socratic 4 bậc",
)
async def solve_endpoint(request: SolveRequest, _auth: str = Depends(verify_api_key)):
    """
    Placeholder endpoint for Socratic solver.
    Returns 501 Not Implemented during initial scaffold phase.
    """
    error_payload = {
        "status": "not_implemented",
        "confidence": 0.0,
        "method": "unimplemented",
        "error": {
            "code": "NOT_IMPLEMENTED",
            "message": (
                "Chức năng Gia sư AI (/v1/solve) chưa được cài đặt "
                "(sẽ xây dựng ở Prompt tiếp theo)."
            ),
        },
    }
    return JSONResponse(status_code=status.HTTP_501_NOT_IMPLEMENTED, content=error_payload)


@app.post(
    "/v1/check",
    responses={
        501: {"model": StandardErrorResponse, "description": "Chức năng chưa được cài đặt"},
        401: {"description": "Chưa xác thực hoặc khóa không hợp lệ"},
    },
    tags=["Core"],
    summary="Chấm bài thi & Đánh giá bước giải",
)
async def check_endpoint(request: CheckRequest, _auth: str = Depends(verify_api_key)):
    """
    Placeholder endpoint for submission checker.
    Returns 501 Not Implemented during initial scaffold phase.
    """
    error_payload = {
        "status": "not_implemented",
        "confidence": 0.0,
        "method": "unimplemented",
        "error": {
            "code": "NOT_IMPLEMENTED",
            "message": (
                "Chức năng Chấm bài (/v1/check) chưa được cài đặt "
                "(sẽ xây dựng ở Prompt tiếp theo)."
            ),
        },
    }
    return JSONResponse(status_code=status.HTTP_501_NOT_IMPLEMENTED, content=error_payload)


@app.post(
    "/v1/generate",
    responses={
        501: {"model": StandardErrorResponse, "description": "Chức năng chưa được cài đặt"},
        401: {"description": "Chưa xác thực hoặc khóa không hợp lệ"},
    },
    tags=["Core"],
    summary="Tạo đề & Sinh biến thể câu hỏi tương đương",
)
async def generate_endpoint(request: GenerateRequest, _auth: str = Depends(verify_api_key)):
    """
    Placeholder endpoint for question generator.
    Returns 501 Not Implemented during initial scaffold phase.
    """
    error_payload = {
        "status": "not_implemented",
        "confidence": 0.0,
        "method": "unimplemented",
        "error": {
            "code": "NOT_IMPLEMENTED",
            "message": (
                "Chức năng Tạo đề (/v1/generate) chưa được cài đặt "
                "(sẽ xây dựng ở Prompt tiếp theo)."
            ),
        },
    }
    return JSONResponse(status_code=status.HTTP_501_NOT_IMPLEMENTED, content=error_payload)
