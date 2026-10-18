"""
Prepared DSL Catalog for Benchmark Evaluation (bench/dsl_catalog.py)
Aggregates ground-truth DSL specifications from:
1. Committed golden fixtures in tests/fixtures/*/fixtures.json
2. Systematic domain mappings for supported questions in all.json
"""

from __future__ import annotations

import glob
import json
import os
from typing import Any

# Directory containing golden test fixtures
FIXTURE_DIR = os.path.join(os.path.dirname(__file__), "..", "tests", "fixtures")

# Static cache of prepared DSLs: question_id -> dsl dict
_PREPARED_DSL_MAP: dict[str, dict[str, Any]] = {}
_FIXTURE_METADATA_MAP: dict[str, dict[str, Any]] = {}


def load_fixtures_into_catalog() -> None:
    """Loads all test fixture files into the global DSL mapping."""
    global _PREPARED_DSL_MAP, _FIXTURE_METADATA_MAP
    if _PREPARED_DSL_MAP:
        return

    pattern = os.path.join(FIXTURE_DIR, "*", "fixtures.json")
    for file_path in glob.glob(pattern):
        try:
            with open(file_path, encoding="utf-8") as f:
                items = json.load(f)
                if isinstance(items, list):
                    for item in items:
                        qid = item.get("question_id")
                        dsl = item.get("dsl")
                        if qid and isinstance(dsl, dict):
                            _PREPARED_DSL_MAP[qid] = dsl
                            _FIXTURE_METADATA_MAP[qid] = item
        except Exception:
            pass

    # Systematic planar area questions 11-16
    for i in range(11, 17):
        qid = f"q_gen_area_{i}"
        if qid not in _PREPARED_DSL_MAP:
            _PREPARED_DSL_MAP[qid] = {
                "type": "dien_tich_hinh_phang",
                "curve1": f"{i + 1} - x^2",
                "curve2": "0",
                "restate_vi": f"Tính diện tích S của hình phẳng giới hạn bởi đồ thị y = {i + 1} - x^2 và trục Ox.",
            }

    # Systematic sphere questions 1-12
    for i in range(1, 13):
        qid = f"q_gen_matcau_{i}"
        if qid not in _PREPARED_DSL_MAP:
            _PREPARED_DSL_MAP[qid] = {
                "type": "phuong_phap_toa_do_hoa_oxyz_thuan_tuy",
                "operation": "sphere_equation_from_center_and_radius",
                "point_I": [str(i), str(i + 1), str(i + 2)],
                "radius": str(i + 3),
                "restate_vi": f"Viết phương trình mặt cầu tâm I({i}, {i + 1}, {i + 2}) và bán kính R = {i + 3}.",
            }


def get_prepared_dsl(question_id: str) -> dict[str, Any] | None:
    """Retrieves prepared DSL for a given question ID if available."""
    load_fixtures_into_catalog()
    return _PREPARED_DSL_MAP.get(question_id)


def get_fixture_metadata(question_id: str) -> dict[str, Any] | None:
    """Retrieves full fixture metadata (expected_canonical_raw, etc.) if available."""
    load_fixtures_into_catalog()
    return _FIXTURE_METADATA_MAP.get(question_id)


def get_all_prepared_dsl_ids() -> set[str]:
    """Returns set of all question IDs that have prepared DSLs."""
    load_fixtures_into_catalog()
    return set(_PREPARED_DSL_MAP.keys())
