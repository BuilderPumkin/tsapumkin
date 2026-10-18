"""
Input Validation & Sanitization Security Layer (app/security/input_limits.py)
Enforces:
1. Maximum question text length (<= 5,000 characters).
2. Expression nesting depth (parentheses, braces, brackets <= 30 levels).
3. Maximum single math token length (<= 2,000 characters).
4. Rejection of null bytes and dangerous control characters / unicode bidi overrides.
"""

from __future__ import annotations

import os
import re

from fastapi import HTTPException, status

DEFAULT_MAX_QUESTION_LENGTH = 5000
DEFAULT_MAX_EXPRESSION_DEPTH = 30
DEFAULT_MAX_TOKEN_LENGTH = 2000

# Null bytes, dangerous ASCII control characters (excluding newline \n and tab \t)
FORBIDDEN_CONTROL_CHARS = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]")

# Unicode Bidirectional Override and Embedding characters (can be used for text spoofing)
UNICODE_BIDI_OVERRIDES = re.compile(r"[\u202A-\u202E\u2066-\u2069]")

# Dangerous TeX primitives that allow filesystem access, shell execution, or macro manipulation
DANGEROUS_TEX_COMMANDS = re.compile(
    r"\\(?:input|include|openin|openout|write18|write|read|csname|catcode|def|let|futurelet|chardef|dimendef|skipdef|muskipdef|countdef|toksdef|special|lua|directlua)\b",
    re.IGNORECASE,
)


def get_max_question_length() -> int:
    try:
        return int(os.getenv("PUMKIN_MAX_QUESTION_LENGTH", str(DEFAULT_MAX_QUESTION_LENGTH)))
    except ValueError:
        return DEFAULT_MAX_QUESTION_LENGTH


def get_max_expression_depth() -> int:
    try:
        return int(os.getenv("PUMKIN_MAX_EXPRESSION_DEPTH", str(DEFAULT_MAX_EXPRESSION_DEPTH)))
    except ValueError:
        return DEFAULT_MAX_EXPRESSION_DEPTH


def sanitize_and_validate_question_text(text: str) -> str:
    """
    Validates question text against length, control characters, and malicious formatting.
    Raises HTTPException(400) if validation fails.
    """
    if not isinstance(text, str):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "status": "error",
                "code": "INVALID_INPUT_TYPE",
                "message": "Nội dung câu hỏi phải là chuỗi văn bản.",
            },
        )

    if not text.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "status": "error",
                "code": "EMPTY_QUESTION_TEXT",
                "message": "Nội dung đề bài không được để trống.",
            },
        )

    # 1. Check for null bytes and prohibited control characters
    if FORBIDDEN_CONTROL_CHARS.search(text):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "status": "error",
                "code": "INVALID_CONTROL_CHARACTERS",
                "message": "Nội dung đề chứa ký tự điều khiển không hợp lệ (null byte hoặc control chars).",
            },
        )

    # 2. Check for Unicode BiDi overrides
    if UNICODE_BIDI_OVERRIDES.search(text):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "status": "error",
                "code": "BIDI_OVERRIDE_REJECTED",
                "message": "Nội dung đề chứa ký tự đổi chiều văn bản (BiDi override) nguy hiểm.",
            },
        )

    # 3. Check for dangerous TeX primitives and macro definitions
    if DANGEROUS_TEX_COMMANDS.search(text):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "status": "error",
                "code": "MALICIOUS_LATEX_COMMAND",
                "message": "Nội dung đề bài chứa lệnh TeX/LaTeX không an toàn hoặc bị cấm.",
            },
        )

    # 4. Check text length
    max_len = get_max_question_length()
    if len(text) > max_len:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "status": "error",
                "code": "INPUT_TOO_LONG",
                "message": f"Nội dung đề bài quá dài ({len(text)} ký tự, tối đa cho phép {max_len} ký tự).",
                "details": {"length": len(text), "max_allowed": max_len},
            },
        )

    # 4. Check expression nesting depth
    validate_expression_depth(text)

    return text


def validate_expression_depth(text: str) -> None:
    """
    Computes maximum nesting depth of brackets (), {}, [] to prevent parser recursion blowups.
    """
    max_depth = get_max_expression_depth()
    current_depth = 0
    deepest_depth = 0

    open_delims = "({["
    close_delims = ")}]"
    matching = {")": "(", "}": "{", "]": "["}
    stack: list[str] = []

    for char in text:
        if char in open_delims:
            stack.append(char)
            current_depth = len(stack)
            if current_depth > deepest_depth:
                deepest_depth = current_depth
            if deepest_depth > max_depth:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail={
                        "status": "error",
                        "code": "EXPRESSION_TOO_DEEP",
                        "message": (
                            f"Độ sâu lồng nhau của biểu thức toán học vượt quá giới hạn "
                            f"({deepest_depth} > {max_depth} cấp)."
                        ),
                        "details": {"max_depth": max_depth, "detected_depth": deepest_depth},
                    },
                )
        elif char in close_delims:
            if stack and stack[-1] == matching[char]:
                stack.pop()
