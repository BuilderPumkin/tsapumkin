"""
Central Template Registry (app/generator/templates/registry.py)
Stores and organizes all mathematical problem templates by category.
"""

from typing import Final

from app.generator.templates.base import BaseProblemTemplate
from app.generator.templates.geometry_oxyz import (
    DistancePointToPlaneTemplate,
    PlanePointNormalTemplate,
    SphereEquationTemplate,
)
from app.generator.templates.integral import (
    LinearPolynomialIntegralTemplate,
    QuadraticMonomialIntegralTemplate,
)
from app.generator.templates.last_digit import LastDigitPeriod4Template
from app.generator.templates.matrix import MatrixDeterminant2x2Template
from app.generator.templates.planar_area import ParabolaLineAreaTemplate
from app.generator.templates.sequence import (
    ArithmeticNthTermTemplate,
    GeometricNthTermTemplate,
)
from app.generator.templates.triangle_vector import (
    TriangleHeronAreaTemplate,
    VectorDotProductTemplate,
)
from app.generator.templates.trigonometric import TrigSineRootCountTemplate

ALL_TEMPLATES: Final[list[BaseProblemTemplate]] = [
    LinearPolynomialIntegralTemplate(),
    QuadraticMonomialIntegralTemplate(),
    LastDigitPeriod4Template(),
    MatrixDeterminant2x2Template(),
    ParabolaLineAreaTemplate(),
    ArithmeticNthTermTemplate(),
    GeometricNthTermTemplate(),
    TriangleHeronAreaTemplate(),
    VectorDotProductTemplate(),
    TrigSineRootCountTemplate(),
    PlanePointNormalTemplate(),
    DistancePointToPlaneTemplate(),
    SphereEquationTemplate(),
]

TEMPLATE_REGISTRY: Final[dict[str, list[BaseProblemTemplate]]] = {}

for tmpl in ALL_TEMPLATES:
    cat = tmpl.category
    if cat not in TEMPLATE_REGISTRY:
        TEMPLATE_REGISTRY[cat] = []
    TEMPLATE_REGISTRY[cat].append(tmpl)

# Aliases for flexible category matching
CATEGORY_ALIASES: Final[dict[str, str]] = {
    "integral": "nguyen_ham_tich_phan",
    "tich_phan": "nguyen_ham_tich_phan",
    "last_digit": "tim_chu_so_tan_cung_luy_thua_lon",
    "chu_so_tan_cung": "tim_chu_so_tan_cung_luy_thua_lon",
    "matrix": "dai_so_ma_tran_dinh_thuc",
    "matrix_algebra": "dai_so_ma_tran_dinh_thuc",
    "planar_area": "dien_tich_hinh_phang",
    "ung_dung_tich_phan_dien_tich_hinh_phang": "dien_tich_hinh_phang",
    "sequence": "day_so_cap_so_cong_cap_so_nhan",
    "cap_so_cong": "day_so_cap_so_cong_cap_so_nhan",
    "cap_so_nhan": "day_so_cap_so_cong_cap_so_nhan",
    "triangle": "tam_giac_vector",
    "vector": "tam_giac_vector",
    "he_thuc_luong_tam_giac_vector": "tam_giac_vector",
    "trigonometric": "ham_so_luong_giac_phuong_trinh",
    "phuong_trinh_luong_giac": "ham_so_luong_giac_phuong_trinh",
    "oxyz": "geometry_oxyz",
    "hinh_hoc_oxyz": "geometry_oxyz",
}


def get_templates_for_category(category: str) -> list[BaseProblemTemplate]:
    """
    Look up templates for a category string, handling canonical keys and aliases.
    If category is 'all' or empty, returns all registered templates.
    """
    clean_cat = category.strip().lower()
    if clean_cat in ("all", "*", ""):
        return ALL_TEMPLATES

    canonical_key = CATEGORY_ALIASES.get(clean_cat, clean_cat)
    return TEMPLATE_REGISTRY.get(canonical_key, [])


def get_all_supported_categories() -> list[str]:
    """Return all canonical categories registered in the template engine."""
    return list(TEMPLATE_REGISTRY.keys())
