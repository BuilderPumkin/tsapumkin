"""
Pumkin Math API - Main Application Entrypoint
FastAPI application defining health check and core math endpoints with Pydantic v2 schemas.
"""

import os
import sys
from uuid import uuid4

import sympy
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.datastructures import Headers
from starlette.types import ASGIApp, Message, Receive, Scope, Send

from app import __version__
from app.auth import verify_api_key
from app.checker import check_student_submission
from app.generator import generate_questions
from app.parser import parse_and_solve_with_consensus
from app.parser.budget import BudgetExceededError
from app.parser.consensus import PROMPT_VERSION
from app.sandbox import (
    SandboxMemoryError,
    SandboxTimeoutError,
    run_in_sandbox_async,
)
from app.schemas.check import CheckRequest, CheckResponse
from app.schemas.common import (
    ConfidenceInfo,
    ConfidenceLevel,
    ConfidenceMethod,
    HealthResponse,
    StatusEnum,
    VersionResponse,
)
from app.schemas.generate import GenerateRequest, GenerateResponse
from app.schemas.solve import SolveRequest, SolveResponse
from app.security import (
    SecurityHeadersMiddleware,
    global_concurrency_limiter,
    sanitize_and_validate_question_text,
)

load_dotenv()

# 1 MB body size threshold enforced at application layer
MAX_BODY_SIZE_BYTES = 1024 * 1024

app = FastAPI(
    title="Pumkin Math API",
    description="Microservice tính toán tất định và kiểm định toán học cho PUMKIN.DEV",
    version=__version__,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)


def make_envelope_error_response(
    status_code: int,
    code: str,
    message_vi: str,
    details: dict | None = None,
) -> JSONResponse:
    """Helper creating standardized BaseResponseEnvelope for error status codes."""
    payload = {
        "schema_version": "1.1.0",
        "trace_id": str(uuid4()),
        "status": StatusEnum.ERROR,
        "confidence": {
            "level": ConfidenceLevel.LOW,
            "method": ConfidenceMethod.SYMBOLIC,
            "score": 0.0,
        },
        "unsupported_reason": None,
        "restate_vi": None,
        "result": None,
        "steps": [],
        "warnings": [],
        "error": {
            "code": code,
            "message_vi": message_vi,
            "details": details,
        },
    }
    return JSONResponse(status_code=status_code, content=payload)


def make_501_not_implemented_response(message_vi: str) -> JSONResponse:
    """Helper creating standardized BaseResponseEnvelope for 501 Not Implemented."""
    return make_envelope_error_response(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        code="NOT_IMPLEMENTED",
        message_vi=message_vi,
    )


class BodySizeLimitMiddleware:
    """
    Pure ASGI middleware enforcing maximum HTTP request body size (1 MB).
    - If Content-Length header is present and > 1 MB: rejects with HTTP 413.
    - If method in (POST, PUT, PATCH):
      - If Content-Length missing and Transfer-Encoding != chunked:
        rejects with HTTP 411 Length Required.
      - If chunked: streams chunks through receive(), accumulates up to 1 MB limit.
        Rejects with HTTP 413 if exceeded; replays buffer to downstream if within limit.
    """

    def __init__(self, app: ASGIApp) -> None:
        self.app = app

    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        if scope["type"] != "http":
            await self.app(scope, receive, send)
            return

        method = scope.get("method", "")
        if method in ("POST", "PUT", "PATCH"):
            headers = Headers(raw=scope.get("headers", []))
            content_length = headers.get("content-length")
            transfer_encoding = headers.get("transfer-encoding", "").lower()

            # Case 1: Neither Content-Length nor chunked transfer encoding is provided
            if content_length is None and "chunked" not in transfer_encoding:
                response = make_envelope_error_response(
                    status_code=status.HTTP_411_LENGTH_REQUIRED,
                    code="LENGTH_REQUIRED",
                    message_vi=(
                        "Yêu cầu bắt buộc phải có tiêu đề Content-Length "
                        "hoặc Transfer-Encoding: chunked."
                    ),
                    details={"method": method},
                )
                await response(scope, receive, send)
                return

            # Case 2: Content-Length header is provided
            if content_length is not None:
                try:
                    length = int(content_length)
                    if length > MAX_BODY_SIZE_BYTES:
                        response = make_envelope_error_response(
                            status_code=status.HTTP_413_CONTENT_TOO_LARGE,
                            code="PAYLOAD_TOO_LARGE",
                            message_vi=(
                                "Kích thước yêu cầu vượt quá giới hạn tối đa cho phép (1 MB)."
                            ),
                            details={
                                "max_allowed_bytes": MAX_BODY_SIZE_BYTES,
                                "received_bytes": length,
                            },
                        )
                        await response(scope, receive, send)
                        return
                except ValueError:
                    response = make_envelope_error_response(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        code="INVALID_CONTENT_LENGTH",
                        message_vi="Tiêu đề Content-Length không hợp lệ.",
                    )
                    await response(scope, receive, send)
                    return

            # Case 3: Chunked transfer encoding streaming threshold
            if "chunked" in transfer_encoding:
                received_bytes = 0
                chunks: list[bytes] = []
                more_body = True
                while more_body:
                    message = await receive()
                    chunk = message.get("body", b"")
                    received_bytes += len(chunk)
                    if received_bytes > MAX_BODY_SIZE_BYTES:
                        response = make_envelope_error_response(
                            status_code=status.HTTP_413_CONTENT_TOO_LARGE,
                            code="PAYLOAD_TOO_LARGE",
                            message_vi=("Dung lượng dữ liệu chunked vượt quá giới hạn (1 MB)."),
                            details={"max_allowed_bytes": MAX_BODY_SIZE_BYTES},
                        )
                        await response(scope, receive, send)
                        return
                    chunks.append(chunk)
                    more_body = message.get("more_body", False)

                full_body = b"".join(chunks)
                has_sent = False

                async def replay_receive() -> Message:
                    nonlocal has_sent
                    if not has_sent:
                        has_sent = True
                        return {"type": "http.request", "body": full_body, "more_body": False}
                    return {"type": "http.request", "body": b"", "more_body": False}

                await self.app(scope, replay_receive, send)
                return

        await self.app(scope, receive, send)


DEFAULT_CORS_ORIGINS = [
    "https://pumkin.dev",
    "https://app.pumkin.dev",
    "https://tsapumkin.pages.dev",
    "http://localhost:3000",
    "http://localhost:5173",
]


def get_cors_allowed_origins() -> list[str]:
    raw = os.getenv("CORS_ORIGINS", os.getenv("PUMKIN_CORS_ALLOWED_ORIGINS", ""))
    if raw.strip():
        return [origin.strip() for origin in raw.split(",") if origin.strip()]
    return DEFAULT_CORS_ORIGINS


def get_git_commit_hash() -> str:
    """Returns current git commit hash from env or git CLI."""
    for var_name in ("GIT_COMMIT", "COMMIT_SHA", "RENDER_GIT_COMMIT", "CF_PAGES_COMMIT_SHA"):
        val = os.getenv(var_name, "").strip()
        if val:
            return val[:8]
    try:
        import subprocess

        res = subprocess.run(
            ["git", "rev-parse", "--short", "HEAD"],
            capture_output=True,
            text=True,
            timeout=1,
            check=False,
        )
        if res.returncode == 0 and res.stdout.strip():
            return res.stdout.strip()
    except Exception:
        pass
    return "unknown"


app.add_middleware(
    CORSMiddleware,
    allow_origins=get_cors_allowed_origins(),
    allow_origin_regex=r"https://.*\.tsapumkin\.pages\.dev",
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(BodySizeLimitMiddleware)


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


@app.get(
    "/version",
    response_model=VersionResponse,
    tags=["System"],
    summary="Lấy chi tiết phiên bản dịch vụ, prompt parser, bộ giải CAS và git commit",
)
async def version_check() -> VersionResponse:
    """Public version endpoint returning microservice, prompt parser, CAS solver, and commit hash."""
    return VersionResponse(
        service_version=__version__,
        prompt_parser_version=PROMPT_VERSION,
        solver_version="1.1.0",
        commit_hash=get_git_commit_hash(),
        sympy_version=sympy.__version__,
        python_version=sys.version.split()[0],
    )


@app.post(
    "/v1/solve",
    response_model=SolveResponse,
    responses={
        200: {
            "model": SolveResponse,
            "description": "Kết quả giải toán và gợi ý sư phạm Socratic",
        },
        401: {"description": "Chưa xác thực hoặc khóa không hợp lệ"},
    },
    tags=["Core"],
    summary="Gia sư AI giải toán Socratic 4 bậc",
)
async def solve_endpoint(
    request: SolveRequest,
    _auth: str = Depends(verify_api_key),
) -> SolveResponse:
    """
    Socratic solver endpoint.
    Translates Vietnamese natural-language problem to DSL using consensus mechanism
    and evaluates via deterministic CAS solvers.
    """
    sanitize_and_validate_question_text(request.question_text)
    async with global_concurrency_limiter.limit_concurrency():
        try:
            return await parse_and_solve_with_consensus(request)
        except BudgetExceededError as exc:
            return make_envelope_error_response(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                code="budget_exceeded",
                message_vi=exc.message_vi,
                details=exc.details,
            )
        except SandboxTimeoutError as exc:
            return make_envelope_error_response(
                status_code=status.HTTP_504_GATEWAY_TIMEOUT,
                code="TIMEOUT",
                message_vi=exc.message_vi,
                details=exc.details,
            )
        except SandboxMemoryError as exc:
            return make_envelope_error_response(
                status_code=status.HTTP_507_INSUFFICIENT_STORAGE,
                code="MEMORY_LIMIT_EXCEEDED",
                message_vi=exc.message_vi,
                details=exc.details,
            )


@app.post(
    "/v1/check",
    response_model=CheckResponse,
    responses={
        200: {"model": CheckResponse, "description": "Kết quả chấm bài và đánh giá bước giải"},
        401: {"description": "Chưa xác thực hoặc khóa không hợp lệ"},
    },
    tags=["Core"],
    summary="Chấm bài thi & Đánh giá bước giải",
)
async def check_endpoint(
    request: CheckRequest,
    _auth: str = Depends(verify_api_key),
) -> CheckResponse:
    """
    Submission checker endpoint.
    Evaluates student answer or intermediate step transformation with sequential
    symbolic and numeric pipeline.
    """
    if request.student_answer:
        sanitize_and_validate_question_text(request.student_answer)
    if request.canonical_answer:
        sanitize_and_validate_question_text(request.canonical_answer)

    async with global_concurrency_limiter.limit_concurrency():
        try:
            return await run_in_sandbox_async(check_student_submission, args=(request,))
        except SandboxTimeoutError as exc:
            return make_envelope_error_response(
                status_code=status.HTTP_504_GATEWAY_TIMEOUT,
                code="TIMEOUT",
                message_vi=exc.message_vi,
                details=exc.details,
            )
        except SandboxMemoryError as exc:
            return make_envelope_error_response(
                status_code=status.HTTP_507_INSUFFICIENT_STORAGE,
                code="MEMORY_LIMIT_EXCEEDED",
                message_vi=exc.message_vi,
                details=exc.details,
            )


@app.post(
    "/v1/generate",
    response_model=GenerateResponse,
    responses={
        401: {"description": "Chưa xác thực hoặc khóa không hợp lệ"},
    },
    tags=["Core"],
    summary="Tạo đề & Sinh biến thể câu hỏi tương đương",
)
async def generate_endpoint(
    request: GenerateRequest,
    _auth: str = Depends(verify_api_key),
) -> GenerateResponse:
    """
    Deterministic question generator endpoint with circle verification
    and misconception-driven distractors.
    """
    async with global_concurrency_limiter.limit_concurrency():
        try:
            payload = await generate_questions(request)
        except ValueError as exc:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(exc),
            ) from exc
        except SandboxTimeoutError as exc:
            return make_envelope_error_response(
                status_code=status.HTTP_504_GATEWAY_TIMEOUT,
                code="TIMEOUT",
                message_vi=exc.message_vi,
                details=exc.details,
            )
        return GenerateResponse(
            status=StatusEnum.VERIFIED if payload.count > 0 else StatusEnum.UNSUPPORTED,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.HIGH if payload.count > 0 else ConfidenceLevel.LOW,
                method=ConfidenceMethod.SYMBOLIC,
                score=1.0 if payload.count > 0 else 0.0,
            ),
            restate_vi=f"Sinh {payload.count} câu hỏi toán học dạng '{request.category}'",
            result=payload,
        )
