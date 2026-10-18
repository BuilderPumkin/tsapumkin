"""
Primary Orchestration Layer for Pumkin Submission Checker (POST /v1/check)
Dispatches evaluation requests to domain-specific evaluators,
enforces safety invariants (cannot_determine never penalized),
and constructs standardized CheckResponse envelopes.
Strictly deterministic without LLM.
"""

from app.checker.evaluators import (
    evaluate_boolean_group,
    evaluate_expression,
    evaluate_interval,
    evaluate_matrix,
    evaluate_multiple_choice,
    evaluate_number,
    evaluate_set,
    evaluate_step_solution,
)
from app.checker.normalizer import to_katex_inline
from app.schemas.check import (
    AnswerTypeEnum,
    CheckRequest,
    CheckResponse,
    CheckResultPayload,
    CheckVerdictEnum,
)
from app.schemas.common import (
    ConfidenceInfo,
    ConfidenceLevel,
    ConfidenceMethod,
    StatusEnum,
)


def check_student_submission(request: CheckRequest) -> CheckResponse:
    """
    Main entry point for verifying student submissions or intermediate step solutions.
    """
    canonical_clean = request.canonical_answer.strip()
    student_clean = request.student_answer.strip()

    canonical_latex = to_katex_inline(canonical_clean)
    student_latex = to_katex_inline(student_clean)

    # Empty student answer edge case
    if not student_clean:
        result_payload = CheckResultPayload(
            verdict=CheckVerdictEnum.INCORRECT,
            is_correct=False,
            canonical_answer=canonical_clean,
            conflict=False,
            feedback_vi="Bạn chưa nhập câu trả lời.",
            canonical_latex=canonical_latex,
            student_latex=student_latex,
        )
        return CheckResponse(
            status=StatusEnum.VERIFIED,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.HIGH,
                method=ConfidenceMethod.SYMBOLIC,
                score=1.0,
            ),
            result=result_payload,
        )

    # Dispatch to appropriate evaluator
    ans_type = request.answer_type
    eval_res = None

    if ans_type == AnswerTypeEnum.NUMBER:
        eval_res = evaluate_number(student_clean, canonical_clean)
    elif ans_type == AnswerTypeEnum.EXPRESSION:
        eval_res = evaluate_expression(student_clean, canonical_clean)
    elif ans_type == AnswerTypeEnum.INTERVAL:
        eval_res = evaluate_interval(student_clean, canonical_clean)
    elif ans_type == AnswerTypeEnum.SET:
        eval_res = evaluate_set(student_clean, canonical_clean)
    elif ans_type == AnswerTypeEnum.MULTIPLE_CHOICE:
        eval_res = evaluate_multiple_choice(student_clean, canonical_clean)
    elif ans_type == AnswerTypeEnum.BOOLEAN_GROUP:
        eval_res = evaluate_boolean_group(student_clean, canonical_clean)
    elif ans_type == AnswerTypeEnum.MATRIX:
        eval_res = evaluate_matrix(student_clean, canonical_clean)
    elif ans_type == AnswerTypeEnum.STEP_SOLUTION:
        eval_res = evaluate_step_solution(student_clean, canonical_clean, request.step_index)
    elif ans_type == AnswerTypeEnum.DRAG_DROP:
        # Direct string or structural match for drag-drop
        if student_clean.replace(" ", "") == canonical_clean.replace(" ", ""):
            eval_res = evaluate_expression(student_clean, canonical_clean)
        else:
            eval_res = evaluate_expression(student_clean, canonical_clean)
    else:
        # Fallback
        eval_res = evaluate_expression(student_clean, canonical_clean)

    # Safety rule: cannot_determine must have is_correct=None
    if eval_res.verdict == CheckVerdictEnum.CANNOT_DETERMINE:
        is_correct_val = None
        envelope_status = StatusEnum.NEEDS_REVIEW
    elif eval_res.verdict in (CheckVerdictEnum.CORRECT, CheckVerdictEnum.CORRECT_DIFFERENT_FORM):
        is_correct_val = True
        envelope_status = StatusEnum.VERIFIED
    else:
        is_correct_val = False
        envelope_status = StatusEnum.VERIFIED

    result_payload = CheckResultPayload(
        verdict=eval_res.verdict,
        is_correct=is_correct_val,
        canonical_answer=canonical_clean,
        cas_answer=None,
        conflict=False,
        feedback_vi=eval_res.feedback_vi,
        detected_misconception_id=eval_res.detected_misconception_id,
        canonical_latex=canonical_latex,
        student_latex=student_latex,
    )

    confidence_info = ConfidenceInfo(
        level=eval_res.confidence_level,
        method=eval_res.confidence_method,
        score=eval_res.confidence_score,
    )

    return CheckResponse(
        status=envelope_status,
        confidence=confidence_info,
        result=result_payload,
    )
