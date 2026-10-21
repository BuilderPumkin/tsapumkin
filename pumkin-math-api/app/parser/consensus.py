"""
Consensus Engine for Pumkin Semantic Parser
Translates Vietnamese math questions into typed MathProblemDSL using N independent LLM samples.
Executes deterministic CAS solvers on each sample and determines consensus:
- Majority agreement (>= 2/3) -> StatusEnum.VERIFIED
- Disagreement / divergence -> StatusEnum.NEEDS_REVIEW
- Multiple choice check: verifies computed answer matches EXACTLY ONE option
- Restate Vietnamese extraction for UI transparency
- Caching and token budget enforcement
"""

import asyncio
import json
import os
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from pydantic import TypeAdapter, ValidationError

from app.checker.evaluators import evaluate_expression, evaluate_number
from app.checker.normalizer import strip_latex_wrappers
from app.parser.budget import BudgetExceededError, global_budget_tracker
from app.parser.cache import compute_problem_hash, global_problem_cache
from app.parser.llm_client import LLMClient, LLMResponse, get_llm_client
from app.pedagogy.engine import generate_pedagogical_guidance
from app.sandbox import SandboxMemoryError, SandboxTimeoutError, run_in_sandbox
from app.schemas.common import (
    BaseResponseEnvelope,
    ConfidenceInfo,
    ConfidenceLevel,
    ConfidenceMethod,
    StatusEnum,
    WarningItem,
)
from app.schemas.dsl import MathProblemDSL
from app.schemas.solve import SolveRequest, SolveResponse, SolveResultPayload
from app.solvers.registry import solve_dsl

PROMPT_FILE = Path(__file__).resolve().parent / "prompts" / "semantic_parser_v1.md"
PROMPT_VERSION = "semantic_parser_v1"
DEFAULT_CONSENSUS_SAMPLES = int(os.environ.get("LLM_CONSENSUS_SAMPLES", "3"))

math_problem_adapter = TypeAdapter(MathProblemDSL)


def load_system_prompt() -> str:
    """Loads versioned semantic parser prompt."""
    if PROMPT_FILE.exists():
        return PROMPT_FILE.read_text(encoding="utf-8")
    return (
        "Translate the math problem into a valid MathProblemDSL JSON object. "
        "Return valid JSON only."
    )


@dataclass
class SampleOutcome:
    sample_index: int
    dsl: Any | None
    dsl_dict: dict[str, Any] | None
    solver_envelope: BaseResponseEnvelope[Any] | None
    computed_value_str: str | None
    error_message: str | None = None
    llm_response: LLMResponse | None = None


def extract_computed_value_string(res: Any) -> str | None:
    """Extracts a scalar or string representation of a CAS solver result for clustering."""
    if res is None:
        return None
    for attr in [
        "value_raw",
        "value_latex",
        "value_sympy",
        "area_raw",
        "area_latex",
        "last_digits_str",
        "last_digits_int",
        "roots_count",
        "general_solutions",
        "result_matrix",
        "distance_latex",
        "angle_degrees",
        "dot_product",
        "sphere_radius",
        "nth_term_value",
        "sum_n_terms_value",
        "antiderivative_latex",
    ]:
        if hasattr(res, attr):
            v = getattr(res, attr)
            if v is not None:
                return str(v)
    if isinstance(res, dict):
        for k in ["value", "value_raw", "value_latex", "area_raw", "last_digits_str", "result"]:
            if k in res and res[k] is not None:
                return str(res[k])
        return json.dumps(res, sort_keys=True, ensure_ascii=False)
    if hasattr(res, "model_dump"):
        d = res.model_dump(exclude_none=True)
        for k in ["value", "value_raw", "value_latex", "area_raw", "last_digits_str", "result"]:
            if k in d and d[k] is not None:
                return str(d[k])
        return json.dumps(d, sort_keys=True, ensure_ascii=False)
    return str(res)


async def _translate_single_sample_with_retry(
    client: LLMClient,
    problem_text: str,
    system_prompt: str,
    sample_idx: int,
) -> SampleOutcome:
    """
    Translates a single sample into DSL with up to 1 retry upon schema validation failure.
    """
    prompt = f"<problem>\n{problem_text}\n</problem>"

    try:
        # Pre-check budget
        await global_budget_tracker.check_budget_before_request(0.001)

        resp = await client.complete_structured(
            prompt=prompt,
            system_prompt=system_prompt,
            temperature=0.0,
        )
        await global_budget_tracker.record_usage(
            cost_usd=resp.estimated_cost_usd,
            prompt_tokens=resp.prompt_tokens,
            completion_tokens=resp.completion_tokens,
        )
    except BudgetExceededError:
        raise
    except Exception as e:
        return SampleOutcome(
            sample_index=sample_idx,
            dsl=None,
            dsl_dict=None,
            solver_envelope=None,
            computed_value_str=None,
            error_message=f"LLM_CALL_FAILED: {str(e)}",
        )

    # First attempt schema validation
    content = resp.content
    try:
        dsl_obj = math_problem_adapter.validate_python(content)
    except (ValidationError, Exception) as val_err:
        # Retry at most 1 time with error feedback
        retry_prompt = (
            f"<problem>\n{problem_text}\n</problem>\n\n"
            f"LƯU Ý: Lần xuất trước bị lỗi schema: {str(val_err)}. "
            f"Vui lòng sửa và chỉ trả về JSON đúng cấu trúc MathProblemDSL."
        )
        try:
            resp_retry = await client.complete_structured(
                prompt=retry_prompt,
                system_prompt=system_prompt,
                temperature=0.0,
            )
            await global_budget_tracker.record_usage(
                cost_usd=resp_retry.estimated_cost_usd,
                prompt_tokens=resp_retry.prompt_tokens,
                completion_tokens=resp_retry.completion_tokens,
            )
            content = resp_retry.content
            dsl_obj = math_problem_adapter.validate_python(content)
            resp = resp_retry
        except BudgetExceededError:
            raise
        except Exception as retry_err:
            return SampleOutcome(
                sample_index=sample_idx,
                dsl=None,
                dsl_dict=content if isinstance(content, dict) else None,
                solver_envelope=None,
                computed_value_str=None,
                error_message=f"SCHEMA_VALIDATION_FAILED: {str(retry_err)}",
                llm_response=resp,
            )

    # Run CAS Solver on validated DSL via process sandbox
    try:
        solver_env = run_in_sandbox(solve_dsl, args=(dsl_obj,))
        val_str = None
        if solver_env.result is not None:
            val_str = extract_computed_value_string(solver_env.result)
        elif solver_env.status == StatusEnum.UNSUPPORTED:
            val_str = f"unsupported:{solver_env.unsupported_reason}"

        err_msg = None
        if val_str is None:
            err_msg = (
                solver_env.error.message_vi if solver_env.error else "SOLVER_PRODUCED_NO_RESULT"
            )

        return SampleOutcome(
            sample_index=sample_idx,
            dsl=dsl_obj,
            dsl_dict=content,
            solver_envelope=solver_env,
            computed_value_str=val_str,
            error_message=err_msg,
            llm_response=resp,
        )
    except SandboxTimeoutError as time_err:
        return SampleOutcome(
            sample_index=sample_idx,
            dsl=dsl_obj,
            dsl_dict=content,
            solver_envelope=None,
            computed_value_str=None,
            error_message=f"TIMEOUT: {time_err.message_vi}",
            llm_response=resp,
        )
    except SandboxMemoryError as mem_err:
        return SampleOutcome(
            sample_index=sample_idx,
            dsl=dsl_obj,
            dsl_dict=content,
            solver_envelope=None,
            computed_value_str=None,
            error_message=f"MEMORY_LIMIT_EXCEEDED: {mem_err.message_vi}",
            llm_response=resp,
        )
    except Exception as solve_err:
        return SampleOutcome(
            sample_index=sample_idx,
            dsl=dsl_obj,
            dsl_dict=content,
            solver_envelope=None,
            computed_value_str=None,
            error_message=f"SOLVER_EXECUTION_ERROR: {str(solve_err)}",
            llm_response=resp,
        )


def _are_answers_equivalent(ans1: str | None, ans2: str | None) -> bool:
    """Checks if two solver computed answers are mathematically equivalent."""
    if ans1 is None or ans2 is None:
        return ans1 == ans2

    s1 = ans1.strip()
    s2 = ans2.strip()
    if s1 == s2:
        return True

    # Check numeric equivalence
    res_num = evaluate_number(s1, s2)
    if res_num.is_correct is True:
        return True

    # Check expression equivalence
    res_expr = evaluate_expression(s1, s2)
    return res_expr.is_correct is True


def verify_multiple_choice_options(
    computed_value: str,
    options: list[str],
) -> tuple[bool, str | None, int]:
    """
    Checks if computed answer matches EXACTLY ONE option in the list.
    Returns (is_valid, matching_option_label, match_count).
    """
    cleaned_val = strip_latex_wrappers(computed_value).strip()
    matched_indices: list[int] = []

    for idx, opt in enumerate(options):
        # Strip option prefixes like 'A. 5' -> '5'
        opt_body = re.sub(r"^[A-Da-d][\.\)]\s*", "", opt).strip()
        opt_body = strip_latex_wrappers(opt_body).strip()

        # Compare using expression or number evaluators
        if opt_body == cleaned_val:
            matched_indices.append(idx)
            continue

        res_expr = evaluate_expression(cleaned_val, opt_body)
        if res_expr.is_correct is True:
            matched_indices.append(idx)
            continue

        res_num = evaluate_number(cleaned_val, opt_body)
        if res_num.is_correct is True:
            matched_indices.append(idx)

    match_count = len(matched_indices)
    if match_count == 1:
        label = chr(ord("A") + matched_indices[0])
        return True, label, 1
    elif match_count == 0:
        return False, None, 0
    else:
        labels = [chr(ord("A") + i) for i in matched_indices]
        return False, ",".join(labels), match_count


async def parse_and_solve_with_consensus(
    request: SolveRequest,
    client: LLMClient | None = None,
    num_samples: int = DEFAULT_CONSENSUS_SAMPLES,
    options: list[str] | None = None,
) -> SolveResponse:
    """
    Primary orchestrator translating natural-language math problem to DSL
    via multi-sample consensus, running CAS solvers, and returning SolveResponse envelope.
    """
    llm = client or get_llm_client()
    system_prompt = load_system_prompt()
    prob_text = request.question_text.strip()
    prob_hash = compute_problem_hash(prob_text)

    # 1. Check problem cache
    cached_dsl_dict = global_problem_cache.get(prob_hash)
    if cached_dsl_dict is not None:
        try:
            cached_dsl = math_problem_adapter.validate_python(cached_dsl_dict)
            cached_env = run_in_sandbox(solve_dsl, args=(cached_dsl,))
            restate_str = getattr(cached_dsl, "restate_vi", None) or prob_text
            steps = cached_env.steps if cached_env else []
            computed_val_str = (
                extract_computed_value_string(cached_env.result)
                if cached_env and cached_env.result is not None
                else None
            )

            final_status = cached_env.status
            warnings: list[WarningItem] = []
            if options and computed_val_str:
                mc_valid, mc_label, count = verify_multiple_choice_options(
                    computed_val_str, options
                )
                if not mc_valid:
                    final_status = StatusEnum.NEEDS_REVIEW
                    if count == 0:
                        warnings.append(
                            WarningItem(
                                code="MC_OPTION_NO_MATCH",
                                message_vi=(
                                    f"Kết quả tính toán ({computed_val_str}) không khớp "
                                    f"với bất kỳ phương án trắc nghiệm nào trong đề."
                                ),
                            )
                        )
                    else:
                        warnings.append(
                            WarningItem(
                                code="MC_OPTION_AMBIGUOUS_MATCH",
                                message_vi=(
                                    f"Kết quả tính toán khớp với nhiều phương án ({mc_label}). "
                                    f"Đề bài có thể bị trùng phương án."
                                ),
                            )
                        )

            final_steps, result_payload = await generate_pedagogical_guidance(
                request=request,
                dsl=cached_dsl,
                solver_envelope=cached_env,
                client=llm,
            )

            conf_lvl = (
                ConfidenceLevel.HIGH if final_status == StatusEnum.VERIFIED else ConfidenceLevel.LOW
            )
            return SolveResponse(
                status=final_status,
                confidence=ConfidenceInfo(
                    level=conf_lvl,
                    method=ConfidenceMethod.CONSENSUS,
                    score=1.0,
                ),
                restate_vi=restate_str,
                steps=final_steps,
                result=result_payload,
                warnings=warnings,
            )
        except Exception:
            pass

    # 2. Run N independent translations concurrently
    tasks = [
        _translate_single_sample_with_retry(
            client=llm,
            problem_text=prob_text,
            system_prompt=system_prompt,
            sample_idx=i,
        )
        for i in range(num_samples)
    ]
    outcomes: list[SampleOutcome] = await asyncio.gather(*tasks)

    # 3. Filter valid outcomes
    valid_outcomes = [o for o in outcomes if o.computed_value_str is not None]

    if not valid_outcomes:
        # All samples failed translation or solver execution
        err_reasons = [o.error_message or "Unknown error" for o in outcomes]
        timeout_errs = [e for e in err_reasons if "TIMEOUT" in e]
        mem_errs = [e for e in err_reasons if "MEMORY_LIMIT_EXCEEDED" in e]

        if timeout_errs:
            warn_code = "TIMEOUT"
            warn_msg = f"Quá trình tính toán bị quá thời gian cho phép: {timeout_errs[0]}"
            guidance = "Bài toán có biểu thức quá phức tạp khiến bộ giải bị quá thời gian cho phép."
        elif mem_errs:
            warn_code = "MEMORY_LIMIT_EXCEEDED"
            warn_msg = f"Quá trình tính toán vượt quá giới hạn bộ nhớ: {mem_errs[0]}"
            guidance = "Bài toán vượt quá giới hạn bộ nhớ tính toán cho phép."
        else:
            warn_code = "TRANSLATION_SCHEMA_FAILED"
            warn_msg = f"Toàn bộ {num_samples} lượt dịch đề thất bại: {err_reasons[0]}"
            guidance = "Hệ thống không thể chuyển đổi đề bài sang dạng toán hỗ trợ hợp lệ."

        result_payload = SolveResultPayload(
            scaffolding_step=request.step_index,
            guidance_vi=guidance,
            latex_hint=None,
            subgoal_completed=False,
            is_final_step=False,
        )
        return SolveResponse(
            status=StatusEnum.ERROR if (timeout_errs or mem_errs) else StatusEnum.NEEDS_REVIEW,
            confidence=ConfidenceInfo(
                level=ConfidenceLevel.LOW,
                method=ConfidenceMethod.CONSENSUS,
                score=0.0,
            ),
            restate_vi=prob_text,
            steps=[],
            result=result_payload,
            warnings=[
                WarningItem(
                    code=warn_code,
                    message_vi=warn_msg,
                )
            ],
        )

    # 4. Cluster answers by mathematical equivalence
    clusters: list[list[SampleOutcome]] = []
    for outcome in valid_outcomes:
        placed = False
        for cluster in clusters:
            rep = cluster[0]
            if _are_answers_equivalent(outcome.computed_value_str, rep.computed_value_str):
                cluster.append(outcome)
                placed = True
                break
        if not placed:
            clusters.append([outcome])

    # Sort clusters by size descending
    clusters.sort(key=len, reverse=True)
    largest_cluster = clusters[0]
    majority_count = len(largest_cluster)
    winning_sample = largest_cluster[0]

    restate_str = (
        getattr(winning_sample.dsl, "restate_vi", None) or f"Hệ thống hiểu đề bài: {prob_text}"
    )
    solver_env = winning_sample.solver_envelope
    steps = solver_env.steps if solver_env else []

    # 5. Consensus Threshold Evaluation
    has_majority = majority_count > (num_samples / 2)
    score = round(majority_count / float(num_samples), 2)

    final_status = solver_env.status if solver_env else StatusEnum.VERIFIED
    warnings: list[WarningItem] = []

    if not has_majority:
        final_status = StatusEnum.NEEDS_REVIEW
        conf_level = ConfidenceLevel.LOW
        differing_answers = [c[0].computed_value_str for c in clusters]
        warnings.append(
            WarningItem(
                code="CONSENSUS_DIVERGENCE",
                message_vi=(
                    f"Bất đồng kết quả giữa các lượt dịch đề độc lập: {differing_answers}. "
                    f"Cần giáo viên kiểm duyệt."
                ),
            )
        )
    else:
        conf_level = ConfidenceLevel.HIGH

    # 6. Multiple Choice Consistency Check
    if options and winning_sample.computed_value_str:
        mc_valid, mc_label, count = verify_multiple_choice_options(
            winning_sample.computed_value_str, options
        )
        if not mc_valid:
            final_status = StatusEnum.NEEDS_REVIEW
            if count == 0:
                warnings.append(
                    WarningItem(
                        code="MC_OPTION_NO_MATCH",
                        message_vi=(
                            f"Kết quả tính toán ({winning_sample.computed_value_str}) không khớp "
                            f"với bất kỳ phương án trắc nghiệm nào trong đề."
                        ),
                    )
                )
            else:
                warnings.append(
                    WarningItem(
                        code="MC_OPTION_AMBIGUOUS_MATCH",
                        message_vi=(
                            f"Kết quả tính toán khớp với nhiều hơn một phương án ({mc_label}). "
                            f"Đề bài có thể bị trùng phương án."
                        ),
                    )
                )

    # 7. Cache Store if Verified
    if final_status == StatusEnum.VERIFIED and winning_sample.dsl_dict:
        global_problem_cache.set(prob_hash, winning_sample.dsl_dict)

    # 8. Socratic Pedagogical Scaffolding & Verification
    if winning_sample.solver_envelope:
        final_steps, result_payload = await generate_pedagogical_guidance(
            request=request,
            dsl=winning_sample.dsl,
            solver_envelope=winning_sample.solver_envelope,
            client=llm,
        )
    else:
        final_steps = steps
        result_payload = SolveResultPayload(
            scaffolding_step=request.step_index,
            guidance_vi=(
                "Đã dịch đề và giải tất định thành công bằng CAS."
                if final_status == StatusEnum.VERIFIED
                else "Bài toán cần xem xét lại do có sự bất đồng hoặc chưa khớp phương án."
            ),
            latex_hint=steps[0].latex if steps else None,
            subgoal_completed=final_status == StatusEnum.VERIFIED,
            is_final_step=True,
        )

    return SolveResponse(
        status=final_status,
        confidence=ConfidenceInfo(
            level=conf_level,
            method=ConfidenceMethod.CONSENSUS,
            score=score,
        ),
        restate_vi=restate_str,
        steps=final_steps,
        result=result_payload,
        warnings=warnings,
    )
