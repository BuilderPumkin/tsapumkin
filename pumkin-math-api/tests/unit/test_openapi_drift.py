"""
Unit Test: OpenAPI Drift Detection
Ensures the committed docs/openapi.json matches the fresh in-memory schema
from app.main:app exactly.
"""

import json
from pathlib import Path

import pytest

from app.main import app

DOCS_OPENAPI_PATH = Path(__file__).resolve().parent.parent.parent.parent / "docs" / "openapi.json"


@pytest.mark.unit
def test_openapi_schema_matches_committed_docs():
    """
    Compares app.openapi() with the persisted docs/openapi.json file.
    Any difference means the developer forgot to run tools/export_openapi.py.
    """
    assert DOCS_OPENAPI_PATH.exists(), f"docs/openapi.json does not exist at {DOCS_OPENAPI_PATH}"

    fresh_schema = app.openapi()
    with open(DOCS_OPENAPI_PATH, encoding="utf-8") as f:
        committed_schema = json.load(f)

    # Compare python dicts directly
    assert fresh_schema == committed_schema, (
        "OpenAPI schema in memory differs from docs/openapi.json! "
        "Please re-run `python tools/export_openapi.py` to sync."
    )
