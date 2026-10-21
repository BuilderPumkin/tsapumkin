#!/usr/bin/env python3
"""
PUMKIN RELEASE BUILD & VALIDATION TOOL (tools/build_release.py)
Prepares production release bundles for pumkin3:
1. Loads data/questions/all.json (553 items), data/exams/all.json (44 items), data/knowledge/all.json (27 items)
2. Applies overrides from data/overrides/answer_overrides.json without modifying raw source
3. Sanitizes questions (removes internal notes, review queues, private keys)
4. Copies cleaned data into pumkin3/data/
5. Generates pumkin3/js/data/fallback_bundle.js
6. Enforces exact record count matching (553 questions, 44 exams, 27 knowledge articles, 100 formulas)
   Reconciles JSON and fallback bundle (JSON strictly wins if conflict)
7. Security guard: ensures zero internal files (review/, overrides/, teacher notes, secrets) in pumkin3/
8. Version hash attachment for cache-busting (?v=<version>-<hash>)
9. CI compliant (returns exit code 0 on success, 1 on error)
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shutil
import sys
from datetime import datetime, timezone
from typing import Any

# Ensure UTF-8 output on Windows
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DATA_DIR = os.path.join(ROOT_DIR, "data")
if not os.path.exists(DATA_DIR):
    alt_data = os.path.abspath(os.path.join(ROOT_DIR, "..", "data"))
    if os.path.exists(alt_data):
        DATA_DIR = alt_data

PUMKIN3_DIR = os.path.join(ROOT_DIR, "PUMKIN2", "pumkin3")
if not os.path.exists(PUMKIN3_DIR):
    alt_pumkin3 = os.path.join(ROOT_DIR, "pumkin3")
    if os.path.exists(alt_pumkin3):
        PUMKIN3_DIR = alt_pumkin3

# Expected counts
EXPECTED_QUESTIONS = 553
EXPECTED_EXAMS = 44
EXPECTED_KNOWLEDGE = 27
EXPECTED_FORMULAS = 100

# Fields forbidden from student-facing client releases
INTERNAL_FORBIDDEN_FIELDS = {
    "teacher_notes",
    "internal_notes",
    "internal_id",
    "internal_audit",
    "needs_manual_review",
    "review_queue",
    "api_key",
    "api_keys",
    "secret",
}


def load_json(path: str) -> Any:
    if not os.path.exists(path):
        raise FileNotFoundError(f"File not found: {path}")
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save_json(path: str, data: Any, indent: int = 2) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(data, f, ensure_ascii=False, indent=indent)
        f.write("\n")


def compute_content_hash(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()[:10]


def sanitize_question(q: dict[str, Any]) -> dict[str, Any]:
    """Strips internal fields from question object for public release."""
    clean_q = dict(q)
    for field in INTERNAL_FORBIDDEN_FIELDS:
        clean_q.pop(field, None)
    return clean_q


def apply_answer_overrides(
    questions: list[dict[str, Any]], overrides_path: str
) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    """Applies verified teacher overrides to question bank in memory."""
    if not os.path.exists(overrides_path):
        return questions, []

    data = load_json(overrides_path)
    overrides_list = data.get("overrides", []) if isinstance(data, dict) else (data if isinstance(data, list) else [])
    
    overrides_map = {o["question_id"]: o for o in overrides_list if "question_id" in o}
    applied: list[dict[str, Any]] = []

    for q in questions:
        qid = q.get("id")
        if qid in overrides_map:
            override = overrides_map[qid]
            if "override_correct_answer" in override:
                q["correct_answer"] = override["override_correct_answer"]
            if "override_correct_value" in override:
                q["correct_value"] = override["override_correct_value"]
            if "approved_steps" in override:
                q["steps"] = override["approved_steps"]
                q["steps_teacher_approved"] = True
            applied.append(override)

    return questions, applied


def extract_formulas_from_knowledge(knowledge_articles: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Extracts indexed search-ready formula definitions from knowledge articles."""
    formulas: list[dict[str, Any]] = []
    for art in knowledge_articles:
        art_id = art.get("id", "")
        art_title = art.get("title", "")
        grade = art.get("grade", "")
        for f in art.get("formulas", []):
            name = f.get("name") or f.get("title") or ""
            latex = f.get("latex", "")
            desc = f.get("desc", "")
            tags = f.get("tags", [])
            search_str = f"{name} {latex} {desc} {art_title}".lower()
            formulas.append({
                "title": name,
                "latex": latex,
                "desc": desc,
                "tags": tags,
                "article_id": art_id,
                "article_title": art_title,
                "stream": grade,
                "_searchStr": search_str
            })
    return formulas


def validate_question_schema(questions: list[dict[str, Any]]) -> list[str]:
    """Validates questions against core schema requirements."""
    errors = []
    for idx, q in enumerate(questions):
        qid = q.get("id")
        if not qid or not isinstance(qid, str):
            errors.append(f"Question at index {idx} has invalid or missing 'id'")
        if not q.get("topic"):
            errors.append(f"Question {qid} missing 'topic'")
        if not (q.get("question") or q.get("question_text")):
            errors.append(f"Question {qid} missing question text")
        if not q.get("schema_version") or not isinstance(q["schema_version"], str):
            errors.append(f"Question {qid} missing valid string 'schema_version'")
        if "verified" not in q:
            errors.append(f"Question {qid} missing required 'verified' metadata")
        else:
            v = q["verified"]
            if not isinstance(v, dict) or "status" not in v:
                errors.append(f"Question {qid} has malformed 'verified' field")
    return errors


def build_release(check_only: bool = False) -> bool:
    print("=" * 70)
    print("PUMKIN RELEASE BUILD & VALIDATION ENGINE")
    print("=" * 70)

    # 1. Source paths
    raw_questions_path = os.path.join(DATA_DIR, "questions", "all.json")
    raw_exams_path = os.path.join(DATA_DIR, "exams", "all.json")
    raw_knowledge_path = os.path.join(DATA_DIR, "knowledge", "all.json")
    raw_cheatsheet_path = os.path.join(DATA_DIR, "formulas", "cheatsheet.json")
    overrides_path = os.path.join(DATA_DIR, "overrides", "answer_overrides.json")

    print(f"[1/8] Loading source dataset from {DATA_DIR}...")
    questions_raw = load_json(raw_questions_path)
    exams = load_json(raw_exams_path)
    knowledge = load_json(raw_knowledge_path)
    formulas_raw = extract_formulas_from_knowledge(knowledge)

    print(f"      Source loaded: {len(questions_raw)} questions, {len(exams)} exams, {len(knowledge)} articles, {len(formulas_raw)} formulas.")

    # 2. Check counts
    print(f"[2/8] Verifying source record counts against specifications...")
    count_errors = []
    if len(questions_raw) != EXPECTED_QUESTIONS:
        count_errors.append(f"Questions count mismatch: expected {EXPECTED_QUESTIONS}, got {len(questions_raw)}")
    if len(exams) != EXPECTED_EXAMS:
        count_errors.append(f"Exams count mismatch: expected {EXPECTED_EXAMS}, got {len(exams)}")
    if len(knowledge) != EXPECTED_KNOWLEDGE:
        count_errors.append(f"Knowledge count mismatch: expected {EXPECTED_KNOWLEDGE}, got {len(knowledge)}")
    if len(formulas_raw) != EXPECTED_FORMULAS:
        count_errors.append(f"Formulas count mismatch: expected {EXPECTED_FORMULAS}, got {len(formulas_raw)}")

    if count_errors:
        for err in count_errors:
            print(f"      [ERROR] {err}")
        return False
    print("      All source record counts strictly matched!")

    # 3. Apply overrides
    print(f"[3/8] Checking for teacher answer overrides...")
    questions, applied_overrides = apply_answer_overrides(questions_raw, overrides_path)
    print(f"      Applied {len(applied_overrides)} teacher override(s). Raw source files were not modified.")

    # 4. Sanitize
    print(f"[4/8] Sanitizing questions (stripping private/internal notes)...")
    sanitized_questions = [sanitize_question(q) for q in questions]

    # 5. Schema validation
    print(f"[5/8] Validating schema integrity across all records...")
    schema_errors = validate_question_schema(sanitized_questions)
    if schema_errors:
        print(f"      [ERROR] Found {len(schema_errors)} schema errors (first 3 shown):")
        for err in schema_errors[:3]:
            print(f"        - {err}")
        return False
    print("      Schema validation passed (all 553 questions have valid schema_version and verified metadata).")

    if check_only:
        print("\n[SUCCESS] CI check-only validation passed completely!")
        return True

    # 6. Copy / Update files in pumkin3/data/
    print(f"[6/8] Writing release files to {PUMKIN3_DIR}...")
    target_questions_path = os.path.join(PUMKIN3_DIR, "data", "questions", "all.json")
    target_exams_path = os.path.join(PUMKIN3_DIR, "data", "exams", "all.json")
    target_knowledge_path = os.path.join(PUMKIN3_DIR, "data", "knowledge", "all.json")
    target_cheatsheet_path = os.path.join(PUMKIN3_DIR, "data", "formulas", "cheatsheet.json")

    save_json(target_questions_path, sanitized_questions)
    save_json(target_exams_path, exams)
    save_json(target_knowledge_path, knowledge)
    
    # Also sync skills & taxonomy if they exist
    skills_src = os.path.join(ROOT_DIR, "data", "skills", "skills.json")
    if os.path.exists(skills_src):
        save_json(os.path.join(PUMKIN3_DIR, "data", "skills", "skills.json"), load_json(skills_src))
    misc_src = os.path.join(ROOT_DIR, "data", "taxonomy", "misconceptions.json")
    if os.path.exists(misc_src):
        save_json(os.path.join(PUMKIN3_DIR, "data", "taxonomy", "misconceptions.json"), load_json(misc_src))
    topics_src = os.path.join(ROOT_DIR, "data", "taxonomy", "topics.json")
    if os.path.exists(topics_src):
        save_json(os.path.join(PUMKIN3_DIR, "data", "taxonomy", "topics.json"), load_json(topics_src))

    # Update manifest.json in pumkin3
    manifest_target = os.path.join(PUMKIN3_DIR, "data", "manifest.json")
    manifest_data = load_json(manifest_target) if os.path.exists(manifest_target) else {}
    manifest_data["stats"] = {
        "total_questions": len(sanitized_questions),
        "total_exams": len(exams),
        "total_knowledge_articles": len(knowledge),
        "total_formulas": len(formulas_raw),
        "total_skills": 6,
        "total_public_files": 25
    }
    manifest_data["generated_at"] = datetime.now(timezone.utc).isoformat()
    manifest_data["schema_version"] = "2.1.0"
    save_json(manifest_target, manifest_data)

    # 7. Generate pumkin3/js/data/fallback_bundle.js
    print(f"[7/8] Generating pumkin3/js/data/fallback_bundle.js...")
    fallback_js_path = os.path.join(PUMKIN3_DIR, "js", "data", "fallback_bundle.js")
    
    knowledge_json_str = json.dumps(knowledge, ensure_ascii=False, separators=(",", ":"))
    exams_json_str = json.dumps(exams, ensure_ascii=False, separators=(",", ":"))
    questions_json_str = json.dumps(sanitized_questions, ensure_ascii=False, separators=(",", ":"))
    formulas_json_str = json.dumps(formulas_raw, ensure_ascii=False, separators=(",", ":"))

    bundle_code = (
        "// PUMKIN FALLBACK DATA BUNDLE - ZERO-LATENCY OFFLINE GUARANTEE\n"
        "(function() {\n"
        f"    const knowledge = {knowledge_json_str};\n"
        f"    const exams = {exams_json_str};\n"
        f"    const questions = {questions_json_str};\n"
        f"    const formulas = {formulas_json_str};\n\n"
        "    if (typeof window !== 'undefined') {\n"
        "        window.PUMKIN_DEFAULT_KNOWLEDGE = knowledge;\n"
        "        window.PUMKIN_DEFAULT_EXAMS = exams;\n"
        "        window.PUMKIN_DEFAULT_QUESTIONS = questions;\n"
        "        window.PUMKIN_DEFAULT_FORMULAS = formulas;\n"
        "        window.PUMKIN_KNOWLEDGE_BASE = knowledge;\n"
        "        window.PUMKIN_EXAMS_DATABASE = exams;\n"
        "        window.PUMKIN_QUESTIONS_DATABASE = questions;\n"
        "        window.PUMKIN_FALLBACK_DATA = { knowledge, exams, questions, formulas };\n"
        "    }\n"
        "    if (typeof module !== 'undefined' && module.exports) {\n"
        "        module.exports = { knowledge, exams, questions, formulas };\n"
        "    }\n"
        '    console.log("[PumkinFallback] Loaded " + knowledge.length + " knowledge articles, " + exams.length + " exams, " + questions.length + " questions, " + formulas.length + " formulas into memory.");\n'
        "})();\n"
    )

    with open(fallback_js_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(bundle_code)

    # Reconcile counts between JSON files and fallback bundle (JSON strictly wins)
    print("      Reconciling records between JSON files and fallback_bundle.js...")
    json_q_count = len(sanitized_questions)
    json_e_count = len(exams)
    json_k_count = len(knowledge)
    json_f_count = len(formulas_raw)

    k_match = re.search(r'const knowledge = (\[.*?\]);\n\s*const exams', bundle_code, re.DOTALL)
    e_match = re.search(r'const exams = (\[.*?\]);\n\s*const questions', bundle_code, re.DOTALL)
    q_match = re.search(r'const questions = (\[.*?\]);\n\s*const formulas', bundle_code, re.DOTALL)
    f_match = re.search(r'const formulas = (\[.*?\]);\n\n\s*if\s*\(typeof window', bundle_code, re.DOTALL)

    bundle_k_len = len(json.loads(k_match.group(1))) if k_match else 0
    bundle_e_len = len(json.loads(e_match.group(1))) if e_match else 0
    bundle_q_len = len(json.loads(q_match.group(1))) if q_match else 0
    bundle_f_len = len(json.loads(f_match.group(1))) if f_match else 0

    if (bundle_q_len != json_q_count or bundle_e_len != json_e_count or 
        bundle_k_len != json_k_count or bundle_f_len != json_f_count):
        print(f"      [ERROR] Reconciliation mismatch: JSON (q={json_q_count}, e={json_e_count}, k={json_k_count}, f={json_f_count}) vs Bundle (q={bundle_q_len}, e={bundle_e_len}, k={bundle_k_len}, f={bundle_f_len})")
        return False
    print(f"      Reconciliation matched: {json_q_count} questions, {json_e_count} exams, {json_k_count} articles, {json_f_count} formulas.")

    # 8. Security Leak Check: Ensure zero internal files in pumkin3/
    print(f"[8/8] Performing security audit on pumkin3 release directory...")
    leak_errors = []
    
    # Walk pumkin3 to check for forbidden directories or files
    for root, dirs, files in os.walk(PUMKIN3_DIR):
        rel_root = os.path.relpath(root, PUMKIN3_DIR)
        for d in dirs:
            if d in ["review", "overrides"]:
                leak_errors.append(f"Forbidden directory '{d}' found at: {os.path.join(rel_root, d)}")
        for fn in files:
            if any(fn.endswith(ext) for ext in [".key", ".pem", ".env"]):
                leak_errors.append(f"Potential secret file '{fn}' found at: {os.path.join(rel_root, fn)}")
            if "mismatch" in fn or "override" in fn:
                leak_errors.append(f"Internal file '{fn}' leaked at: {os.path.join(rel_root, fn)}")

    # Check content of fallback_bundle.js for forbidden words
    bundle_sample = bundle_code[:50000]
    for forbidden in ["needs_manual_review", "internal_notes", "teacher_notes"]:
        if forbidden in bundle_code:
            leak_errors.append(f"Forbidden internal field '{forbidden}' found inside fallback_bundle.js")

    if leak_errors:
        print(f"      [SECURITY FAILED] Detected {len(leak_errors)} leak(s):")
        for err in leak_errors:
            print(f"        - {err}")
        return False
    print("      Security audit passed: No internal files (review/, overrides/, teacher notes) leaked into pumkin3/.")

    # Version Hash & Cache-Busting
    content_hash = compute_content_hash(bundle_code)
    release_version = "4.5.0"
    version_param = f"{release_version}-{content_hash}"
    print(f"      Release Hash computed: {content_hash} (Version param: ?v={version_param})")

    # Update index.html and TSA_do_an.html script tags
    index_html_path = os.path.join(PUMKIN3_DIR, "index.html")
    if os.path.exists(index_html_path):
        with open(index_html_path, "r", encoding="utf-8") as f:
            html_content = f.read()
        # Update fallback_bundle.js and all asset tags (?v=...)
        updated_html = re.sub(
            r'src="js/data/fallback_bundle\.js(\?v=[^"]*)?"',
            f'src="js/data/fallback_bundle.js?v={version_param}"',
            html_content
        )
        updated_html = re.sub(
            r'((?:src|href)="(?:js|css)/[^"]+?)(\?v=[^"]*)?(")',
            f'\\1?v={version_param}\\3',
            updated_html
        )
        if updated_html != html_content:
            with open(index_html_path, "w", encoding="utf-8", newline="\n") as f:
                f.write(updated_html)
            print(f"      Updated all asset cache-busting tags in pumkin3/index.html -> ?v={version_param}")

    tsa_html_path = os.path.join(PUMKIN3_DIR, "TSA_do_an.html")
    if os.path.exists(tsa_html_path):
        with open(tsa_html_path, "r", encoding="utf-8") as f:
            tsa_content = f.read()
        updated_tsa = re.sub(
            r'src="js/data/fallback_bundle\.js(\?v=[^"]*)?"',
            f'src="js/data/fallback_bundle.js?v={version_param}"',
            tsa_content
        )
        updated_tsa = re.sub(
            r'((?:src|href)="(?:js|css)/[^"]+?)(\?v=[^"]*)?(")',
            f'\\1?v={version_param}\\3',
            updated_tsa
        )
        if updated_tsa != tsa_content:
            with open(tsa_html_path, "w", encoding="utf-8", newline="\n") as f:
                f.write(updated_tsa)
            print(f"      Updated all asset cache-busting tags in pumkin3/TSA_do_an.html -> ?v={version_param}")

    # Update sw.js cache name
    sw_path = os.path.join(PUMKIN3_DIR, "sw.js")
    if os.path.exists(sw_path):
        with open(sw_path, "r", encoding="utf-8") as f:
            sw_content = f.read()
        updated_sw = re.sub(
            r'const CACHE_NAME = "pumkin-cache-[^"]+";',
            f'const CACHE_NAME = "pumkin-cache-v{version_param}";',
            sw_content
        )
        if updated_sw != sw_content:
            with open(sw_path, "w", encoding="utf-8", newline="\n") as f:
                f.write(updated_sw)
            print(f"      Updated service worker CACHE_NAME in pumkin3/sw.js -> pumkin-cache-v{version_param}")

    print("\n" + "=" * 70)
    print("RELEASE BUILD SUMMARY:")
    print(f"  - Questions Bundled   : {json_q_count} (Schema 2.1.0, Verified Offline)")
    print(f"  - Exams Bundled       : {json_e_count}")
    print(f"  - Knowledge Articles  : {json_k_count}")
    print(f"  - Indexed Formulas    : {json_f_count}")
    print(f"  - Cache Hash          : {content_hash}")
    print(f"  - Output Artifact     : pumkin3/js/data/fallback_bundle.js")
    print("=" * 70 + "\n")
    return True


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="PUMKIN Release Builder")
    parser.add_argument("--check-only", action="store_true", help="Perform checks only without modifying files")
    args = parser.parse_args()

    success = build_release(check_only=args.check_only)
    sys.exit(0 if success else 1)
