"""
Deterministic Question Generator Package (app/generator)
Generates mathematically verified multiple choice questions with cognitive distractors.
"""

from app.generator.engine import generate_questions
from app.generator.models import DistractorSpec, TemplateOutput
from app.generator.templates.base import BaseProblemTemplate
from app.generator.templates.registry import (
    ALL_TEMPLATES,
    TEMPLATE_REGISTRY,
    get_all_supported_categories,
    get_templates_for_category,
)
from app.generator.web_export import export_questions_to_web_json, question_to_web_dict

__all__ = [
    "ALL_TEMPLATES",
    "BaseProblemTemplate",
    "DistractorSpec",
    "TEMPLATE_REGISTRY",
    "TemplateOutput",
    "export_questions_to_web_json",
    "generate_questions",
    "get_all_supported_categories",
    "get_templates_for_category",
    "question_to_web_dict",
]
