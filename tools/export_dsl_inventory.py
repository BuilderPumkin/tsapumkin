import csv
import hashlib
import json
import random
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

# Repository root path
repo_dir = Path(__file__).resolve().parent.parent
pumkin_api_dir = repo_dir / "pumkin-math-api"
sys.path.insert(0, str(pumkin_api_dir))

from app.generator.templates.registry import ALL_TEMPLATES
from app.schemas.common import StatusEnum
from app.solvers import solve_dsl
from bench.dsl_catalog import (
    _FIXTURE_METADATA_MAP,
    _PREPARED_DSL_MAP,
    load_fixtures_into_catalog,
)

load_fixtures_into_catalog()
with open(pumkin_api_dir / "bench/data/all.json", encoding="utf-8") as f:
    bank = {q["id"]: q for q in json.load(f)}

all_records = []
seen_ids = set()
seen_texts = set()

# 1. Bank pairs (82) - Real human-authored exam questions from TSA/HSA/THPT
for qid in sorted(_PREPARED_DSL_MAP.keys()):
    if qid in bank:
        dsl = _PREPARED_DSL_MAP[qid]
        meta = _FIXTURE_METADATA_MAP.get(qid, {})
        text = (
            bank[qid].get("question")
            or bank[qid].get("question_text")
            or meta.get("question_text")
            or dsl.get("restate_vi")
            or ""
        )
        norm_t = "".join(text.lower().split())

        dsl_json = json.dumps(dsl, sort_keys=True, ensure_ascii=False)
        dsl_hash = hashlib.sha256(dsl_json.encode("utf-8")).hexdigest()

        all_records.append(
            {
                "id": qid,
                "nguồn": "bank",
                "đề tiếng Việt": text.strip().replace("\r\n", " ").replace("\n", " "),
                "hash DSL": dsl_hash,
                "do ai/cái gì tạo DSL": "soạn cùng solver",
                "đã được giáo viên duyệt": "không",
                "tính độc lập": "độc lập (con người soạn)",
            }
        )
        seen_ids.add(qid)
        seen_texts.add(norm_t)

# 2. Fixture pairs (37) - Check whether question text comes from dsl["restate_vi"]
for qid in sorted(_PREPARED_DSL_MAP.keys()):
    if qid not in bank and qid not in seen_ids:
        dsl = _PREPARED_DSL_MAP[qid]
        meta = _FIXTURE_METADATA_MAP.get(qid, {})

        # Inspect if original question text exists or if it was synthesized from dsl["restate_vi"]
        has_orig_meta_text = bool(meta.get("question_text"))
        text = meta.get("question_text") or dsl.get("restate_vi") or ""
        norm_t = "".join(text.lower().split())
        if norm_t in seen_texts:
            continue

        dsl_json = json.dumps(dsl, sort_keys=True, ensure_ascii=False)
        dsl_hash = hashlib.sha256(dsl_json.encode("utf-8")).hexdigest()

        # If question text came from dsl["restate_vi"], it is a circular test problem ("đề vòng tròn")
        is_circular = not has_orig_meta_text
        independence_label = "đề vòng tròn" if is_circular else "độc lập (con người soạn)"

        all_records.append(
            {
                "id": qid,
                "nguồn": "fixture",
                "đề tiếng Việt": text.strip().replace("\r\n", " ").replace("\n", " "),
                "hash DSL": dsl_hash,
                "do ai/cái gì tạo DSL": "soạn cùng solver",
                "đã được giáo viên duyệt": "không",
                "tính độc lập": independence_label,
            }
        )
        seen_ids.add(qid)
        seen_texts.add(norm_t)

# 3. Generator pairs (20 deterministic template instances - NOT independent)
rng = random.Random(20261018)
gen_added = 0
gen_attempts = 0
while gen_added < 20 and gen_attempts < 100:
    gen_attempts += 1
    for t in ALL_TEMPLATES:
        if gen_added >= 20:
            break
        cand = t.generate(rng)
        norm_t = "".join(cand.question_text.lower().split())
        if norm_t in seen_texts:
            continue
        env = solve_dsl(cand.dsl)
        if env.status == StatusEnum.VERIFIED:
            dsl_dict = (
                cand.dsl.model_dump()
                if hasattr(cand.dsl, "model_dump")
                else cand.dsl.dict()
            )
            dsl_json = json.dumps(dsl_dict, sort_keys=True, ensure_ascii=False)
            dsl_hash = hashlib.sha256(dsl_json.encode("utf-8")).hexdigest()
            qid = f"gen_{t.template_id}_{gen_added + 1:02d}"
            all_records.append(
                {
                    "id": qid,
                    "nguồn": "generator",
                    "đề tiếng Việt": (
                        cand.question_text.strip()
                        .replace("\r\n", " ")
                        .replace("\n", " ")
                    ),
                    "hash DSL": dsl_hash,
                    "do ai/cái gì tạo DSL": "soạn cùng solver",
                    "đã được giáo viên duyệt": "không",
                    "tính độc lập": "không độc lập (sinh từ template)",
                }
            )
            seen_ids.add(qid)
            seen_texts.add(norm_t)
            gen_added += 1

fieldnames = [
    "id",
    "nguồn",
    "đề tiếng Việt",
    "hash DSL",
    "do ai/cái gì tạo DSL",
    "đã được giáo viên duyệt",
    "tính độc lập",
]

# Write to the single canonical docs directory in the repository
out_path = repo_dir / "docs/dsl_pairs_inventory.csv"
out_path.parent.mkdir(parents=True, exist_ok=True)
with open(out_path, "w", encoding="utf-8-sig", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(all_records)

print(f"Wrote {len(all_records)} records to {out_path}")

# Calculate counts
human_independent_records = [
    r for r in all_records if r["tính độc lập"] == "độc lập (con người soạn)"
]
template_records = [
    r for r in all_records if r["tính độc lập"] == "không độc lập (sinh từ template)"
]
circular_records = [
    r for r in all_records if r["tính độc lập"] == "đề vòng tròn"
]

print("\n--- SUMMARY OF DEDUPED DSL PAIRS ---")
by_source = {}
for r in all_records:
    s = r["nguồn"]
    by_source[s] = by_source.get(s, 0) + 1

for s, count in sorted(by_source.items()):
    print(f"  • Nguồn '{s}': {count} cặp")

print(f"  • Tổng số cặp ghi nhận trong kho          : {len(all_records)} cặp")
print(f"  • SỐ CẶP ĐỘC LẬP CHÍNH (CON NGƯỜI SOẠN)  : {len(human_independent_records)} cặp (82 bank + 8 fixture)")
print(f"  • Số cặp template (KHÔNG ĐỘC LẬP)         : {len(template_records)} cặp (sinh từ template generator)")
print(f"  • Số cặp 'đề vòng tròn' bị loại           : {len(circular_records)} cặp (đề lấy từ dsl[restate_vi])")

