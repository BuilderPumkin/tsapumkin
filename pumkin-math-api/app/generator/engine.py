"""
Question Generation Engine (app/generator/engine.py)
Orchestrates constrained template generation, solver circle verification,
cognitive distractor calculation, deduplication, and optional LLM prose smoothing.
"""

from __future__ import annotations

import hashlib
import logging
import random
from typing import TYPE_CHECKING

from app.generator.llm_rephraser import is_llm_rephrase_enabled, rephrase_question_with_llm
from app.generator.templates.registry import get_templates_for_category
from app.schemas.common import StatusEnum
from app.schemas.generate import (
    DistractorItem,
    GeneratedQuestionItem,
    GenerateRequest,
    GenerateResultPayload,
)
from app.solvers import solve_dsl

if TYPE_CHECKING:
    from app.parser.llm_client import LLMClient

logger = logging.getLogger(__name__)


async def generate_questions(
    request: GenerateRequest | None = None,
    client: LLMClient | None = None,
    *,
    category: str | None = None,
    difficulty: DifficultyEnum | None = None,
    count: int | None = None,
    seed: int | None = None,
    use_llm: bool | None = None,
) -> GenerateResultPayload:
    """
    Generates verified mathematical questions from templates according to request specifications.
    Guarantees:
    1. Circle-verified via CAS solver (solve_dsl) with full verification rate.
    2. Zero duplicates within the batch via normalized text SHA-256 hashing.
    3. All 3 distractors are mathematically calculated, distinct from correct answer and each other.
    4. Optional LLM rephrase strictly preserves all numbers and math expressions.
    """
    cat = category if category is not None else (request.category if request else "all")
    cnt = count if count is not None else (request.count if request else 1)
    s = seed if seed is not None else (request.seed if request else None)
    llm_flag = use_llm if use_llm is not None else (request.use_llm if request else False)

    templates = get_templates_for_category(cat)
    if not templates:
        logger.error("No problem templates registered for category '%s'", cat)
        raise ValueError(f"Dạng bài '{cat}' chưa có mẫu sinh đề.")

    rng = random.Random(s) if s is not None else random.Random()
    generated_questions: list[GeneratedQuestionItem] = []
    seen_hashes: set[str] = set()

    max_attempts = max(50, cnt * 25)
    attempts = 0

    while len(generated_questions) < cnt and attempts < max_attempts:
        attempts += 1
        template = rng.choice(templates)

        try:
            cand = template.generate(rng)
        except Exception as e:
            logger.warning(
                "Template %s generate() raised error: %s",
                getattr(template, "template_id", "unknown"),
                e,
            )
            continue

        # 1. Deduplication check via SHA-256 hash of normalized question text
        normalized_text = "".join(cand.question_text.lower().split())
        q_hash = hashlib.sha256(normalized_text.encode("utf-8")).hexdigest()[:16]
        if q_hash in seen_hashes:
            continue

        # 2. MANDATORY CIRCLE VERIFICATION: Solve via CAS solver
        try:
            solver_env = solve_dsl(cand.dsl)
        except Exception as e:
            logger.warning("Circle verification error on template %s: %s", cand.template_id, e)
            continue

        if solver_env.status != StatusEnum.VERIFIED:
            logger.warning(
                "Circle verification rejected problem candidate (%s): solver status is %s",
                cand.template_id,
                solver_env.status,
            )
            continue

        # 3. Calculate cognitive misconception distractors
        try:
            distractor_specs = cand.distractor_calculator(solver_env.result, cand.correct_latex)
        except Exception as e:
            logger.warning("Distractor calculation failed on %s: %s", cand.template_id, e)
            continue

        if len(distractor_specs) < 3:
            continue

        # Verify uniqueness of options: correct answer + 3 distractors
        all_option_texts = [cand.correct_latex] + [d.latex for d in distractor_specs[:3]]
        if len(set(all_option_texts)) != 4:
            logger.warning("Distractor collision detected on %s: retrying.", cand.template_id)
            continue

        # 4. Deterministic option shuffling with recorded correct index
        shuffled_options = list(all_option_texts)
        rng.shuffle(shuffled_options)
        correct_index = shuffled_options.index(cand.correct_latex)

        # Map distractors to their shuffled option indices
        distractor_items: list[DistractorItem] = []
        for d_spec in distractor_specs[:3]:
            opt_idx = shuffled_options.index(d_spec.latex)
            distractor_items.append(
                DistractorItem(
                    option_index=opt_idx,
                    latex=d_spec.latex,
                    misconception_id=d_spec.misconception_id,
                    explanation_vi=d_spec.description_vi,
                )
            )

        # Sort distractors by option_index for consistent presentation
        distractor_items.sort(key=lambda d: d.option_index)

        # 5. Optional LLM prose rephrasing with strict number preservation
        question_text = cand.question_text
        if (llm_flag or is_llm_rephrase_enabled()) and client is not None:
            rephrased, was_accepted = await rephrase_question_with_llm(client, cand.question_text)
            if was_accepted:
                question_text = rephrased

        question_item = GeneratedQuestionItem(
            id=f"q_{cand.category}_{q_hash[:8]}",
            category=cand.category,
            difficulty=cand.difficulty,
            question_text=question_text,
            options=shuffled_options,
            correct_answer=cand.correct_latex,
            correct_index=correct_index,
            distractors=distractor_items,
            explanation_vi=cand.explanation_vi,
            topic=cand.topic,
            subtopic=cand.subtopic,
            skills=cand.skills,
            difficulty_score=cand.difficulty_score,
            socratic_hints=cand.socratic_hints,
            hash=q_hash,
        )

        seen_hashes.add(q_hash)
        generated_questions.append(question_item)

    if len(generated_questions) < cnt:
        logger.warning(
            "Generator produced %d/%d requested questions after %d attempts.",
            len(generated_questions),
            cnt,
            attempts,
        )

    return GenerateResultPayload(
        count=len(generated_questions),
        questions=generated_questions,
    )
