"""
Base Problem Template Class (app/generator/templates/base.py)
Abstract base template for deterministic, constrained random mathematical problem generation.
"""

import random
from abc import ABC, abstractmethod

from app.generator.models import TemplateOutput
from app.schemas.generate import DifficultyEnum


class BaseProblemTemplate(ABC):
    """
    Abstract contract for mathematical question templates.
    Enforces deterministic reproducibility when provided with a random.Random instance.
    """

    template_id: str
    category: str
    topic: str
    subtopic: str
    difficulty: DifficultyEnum
    cognitive_level: str
    difficulty_score: float
    skills: list[str]

    @abstractmethod
    def generate(self, rng: random.Random) -> TemplateOutput:
        """
        Generate a single problem candidate using the provided RNG.
        Must enforce mathematical non-degeneracy, beautiful numbers, and valid domain constraints.
        """
        raise NotImplementedError
