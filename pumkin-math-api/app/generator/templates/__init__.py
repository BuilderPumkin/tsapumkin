"""
Templates Package (app/generator/templates)
Contains mathematical question generation templates.
"""

from app.generator.templates.base import BaseProblemTemplate
from app.generator.templates.registry import (
    ALL_TEMPLATES,
    TEMPLATE_REGISTRY,
    get_all_supported_categories,
    get_templates_for_category,
)

__all__ = [
    "ALL_TEMPLATES",
    "BaseProblemTemplate",
    "TEMPLATE_REGISTRY",
    "get_all_supported_categories",
    "get_templates_for_category",
]
