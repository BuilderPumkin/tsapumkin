"""
Pedagogical Engine Orchestrator (app/pedagogy/engine.py)
Orchestrates Socratic 4-tier scaffolding, misconception diagnostics,
step-by-step formatting, and optional LLM rephrasing with strict verification.
"""

from __future__ import annotations

from typing import TYPE_CHECKING, Any

from app.pedagogy.llm_enhancer import enhance_steps_with_llm, is_llm_pedagogy_enabled
from app.pedagogy.misconceptions import get_misconception_feedback
from app.pedagogy.templates import build_socratic_hints, build_template_guidance_for_step
from app.schemas.common import BaseResponseEnvelope, StepItem
from app.schemas.solve import SolveRequest, SolveResultPayload

if TYPE_CHECKING:
    from app.parser.llm_client import LLMClient


async def generate_pedagogical_guidance(
    request: SolveRequest,
    dsl: Any,
    solver_envelope: BaseResponseEnvelope[Any],
    client: LLMClient | None = None,
) -> tuple[list[StepItem], SolveResultPayload]:
    """
    Orchestrates the pedagogical layer for a solved math problem:
    1. Derives 4-tier Socratic hints directly from CAS solver step traces.
    2. Builds the requested guidance level (1: Nudge, 2: Concept, 3: Sub-goal, 4: Worked Step).
    3. Diagnoses and injects encouraging feedback if a misconception ID is present.
    4. Optionally rephrases steps with LLM if enabled,
       falling back to templates on any alien number.
    Returns: (final_steps, solve_result_payload)
    """
    dsl_type = getattr(dsl, "type", "generic")
    ground_truth_steps = solver_envelope.steps or []
    ground_truth_result = solver_envelope.result

    # 1. Build Socratic 4-tier hints from CAS trace
    hints = build_socratic_hints(
        dsl_type=dsl_type,
        steps=ground_truth_steps,
        result=ground_truth_result,
        dsl=dsl,
    )

    # 2. Select guidance and formula hint for the requested step_index
    guidance_vi, latex_hint, subgoal_completed, is_final_step = build_template_guidance_for_step(
        hints, request.step_index
    )

    # 3. Check for student misconception
    misconception_fb = get_misconception_feedback(request.misconception_id)
    if misconception_fb:
        guidance_vi = f"{misconception_fb}\n\n{guidance_vi}"

    # 4. Step generation: Template vs LLM-enhanced with verification
    final_steps = list(ground_truth_steps)
    pedagogy_mode = "template"

    if is_llm_pedagogy_enabled() and ground_truth_steps:
        from app.parser.llm_client import get_llm_client

        llm = client or get_llm_client()
        enhanced, mode, _ = await enhance_steps_with_llm(
            client=llm,
            question_text=request.question_text,
            ground_truth_steps=ground_truth_steps,
            ground_truth_result=ground_truth_result,
            dsl=dsl,
        )
        if enhanced and mode == "llm_verified":
            final_steps = enhanced
            pedagogy_mode = "llm_verified"
        else:
            final_steps = list(ground_truth_steps)
            pedagogy_mode = "template"

    payload = SolveResultPayload(
        scaffolding_step=request.step_index,
        guidance_vi=guidance_vi,
        latex_hint=latex_hint,
        subgoal_completed=subgoal_completed,
        is_final_step=is_final_step,
        hints=hints,
        pedagogy_mode=pedagogy_mode,
        misconception_feedback=misconception_fb,
    )

    return final_steps, payload
