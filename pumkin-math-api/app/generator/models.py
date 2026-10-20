"""
Internal and Export Models for Question Generation Engine (app/generator/models.py)
Defines specifications for templates, generated candidates, and Web Question Bank export schema.
"""

from collections.abc import Callable
from dataclasses import dataclass, field
from typing import Any

from app.schemas.dsl import BaseDSL
from app.schemas.generate import DifficultyEnum
from app.schemas.traps import MisconceptionTrapEnum


@dataclass
class DistractorSpec:
    """Specification for calculating a single distractor."""

    latex: str
    misconception_id: MisconceptionTrapEnum
    description_vi: str
    severity: str = "high"  # "medium", "high", "critical"
    remediation_hint: str = ""


@dataclass
class TemplateOutput:
    """Output produced by a problem template before circle verification."""

    template_id: str
    category: str
    topic: str
    subtopic: str
    difficulty: DifficultyEnum
    cognitive_level: str  # "M1", "M2", "M3", "M4"
    difficulty_score: float
    skills: list[str]
    question_text: str  # Prose with LaTeX formatted in \( ... \)
    dsl: BaseDSL
    correct_latex: str
    distractor_calculator: Callable[[Any, str], list[DistractorSpec]]
    explanation_vi: str
    socratic_hints: list[str] = field(default_factory=list)
    common_traps: list[str] = field(default_factory=list)
