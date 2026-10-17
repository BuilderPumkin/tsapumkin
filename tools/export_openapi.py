#!/usr/bin/env python3
"""
PUMKIN MATH API - OpenAPI Schema Exporter Tool
Exports the OpenAPI 3.1 specification to docs/openapi.json in a deterministic, reproducible manner.
"""

import os
import sys
import json

# Ensure parent directory is on sys.path
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

# Also check for pumkin-math-api subfolder
PUMKIN_API_DIR = os.path.join(BASE_DIR, "pumkin-math-api")
if os.path.exists(PUMKIN_API_DIR) and PUMKIN_API_DIR not in sys.path:
    sys.path.insert(0, PUMKIN_API_DIR)

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

from app.main import app


def export_openapi():
    openapi_schema = app.openapi()

    target_paths = [
        os.path.join(BASE_DIR, "docs", "openapi.json"),
    ]
    # If in root repo, also write to PUMKIN2/docs if it exists
    pumkin2_docs = os.path.join(BASE_DIR, "PUMKIN2", "docs", "openapi.json")
    if os.path.exists(os.path.dirname(pumkin2_docs)):
        target_paths.append(pumkin2_docs)

    # Sort keys for deterministic JSON output
    serialized = json.dumps(openapi_schema, indent=2, ensure_ascii=False, sort_keys=True) + "\n"

    for target in target_paths:
        os.makedirs(os.path.dirname(target), exist_ok=True)
        with open(target, "w", encoding="utf-8") as f:
            f.write(serialized)
        print(f"[SUCCESS] Đã xuất OpenAPI schema thành công sang: {target}")


if __name__ == "__main__":
    export_openapi()
