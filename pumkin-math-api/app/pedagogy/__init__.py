"""
Pedagogy Layer
Formats responses according to 4-tier Socratic Scaffolding guidelines.
"""

from app.pedagogy.engine import generate_pedagogical_guidance
from app.pedagogy.llm_enhancer import enhance_steps_with_llm, is_llm_pedagogy_enabled
from app.pedagogy.misconceptions import get_misconception_feedback
from app.pedagogy.templates import build_socratic_hints, build_template_guidance_for_step
from app.pedagogy.verifier import (
    extract_ground_truth_numbers,
    extract_numbers_from_text,
    validate_katex_syntax,
    verify_no_alien_numbers,
)

__all__ = [
    "generate_pedagogical_guidance",
    "build_socratic_hints",
    "build_template_guidance_for_step",
    "get_misconception_feedback",
    "extract_numbers_from_text",
    "extract_ground_truth_numbers",
    "validate_katex_syntax",
    "verify_no_alien_numbers",
    "enhance_steps_with_llm",
    "is_llm_pedagogy_enabled",
]
