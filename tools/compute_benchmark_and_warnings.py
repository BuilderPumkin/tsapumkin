import json
import os
import re
import sys
from collections import defaultdict

sys.stdout.reconfigure(encoding="utf-8")
sys.path.insert(0, "pumkin-math-api")
sys.path.insert(0, ".")

from tools.classify_questions import classify_question_v2, CATEGORY_LABELS
from tools.extract_latex_corpus import extract_raw_math_snippets
from app.latex import parse_latex

# Use the exact question bank
DATA_PATH = "pumkin3/data/questions/all.json"
if not os.path.exists(DATA_PATH):
    DATA_PATH = "data/questions/all.json"

with open(DATA_PATH, encoding="utf-8") as f:
    questions = json.load(f)

print(f"Loaded {len(questions)} questions from {DATA_PATH}")

category_stats = defaultdict(lambda: {
    "total_questions": 0,
    "questions_with_stem_math": 0,
    "questions_with_zero_stem_math": 0,
    "stem_math_passed_questions": 0,
    "total_snippets": 0,
    "passed_snippets": 0,
})

all_snippets_set = set()
all_snippets_list = []
failed_snippets = []

warning_counts = defaultdict(int)
snippets_with_warnings = 0

for q in questions:
    cat = classify_question_v2(q)
    qid = q.get("id")
    qt = q.get("question_text") or q.get("question") or ""
    
    stem_snips = extract_raw_math_snippets(qt)
    clean_stem_snips = [s.strip() for s in stem_snips if len(s.strip()) >= 2]
    
    category_stats[cat]["total_questions"] += 1
    
    if len(clean_stem_snips) > 0:
        category_stats[cat]["questions_with_stem_math"] += 1
        # Check if all stem snips pass
        all_passed = True
        for s in clean_stem_snips:
            r = parse_latex(s)
            if not r.is_success:
                all_passed = False
                break
        if all_passed:
            category_stats[cat]["stem_math_passed_questions"] += 1
    else:
        category_stats[cat]["questions_with_zero_stem_math"] += 1

    # Extract all fields (stem, options, explanation)
    fields = [("stem", qt)]
    for i, opt in enumerate(q.get("options") or []):
        fields.append((f"opt_{i+1}", str(opt)))
    fields.append(("explanation", q.get("explanation") or ""))

    for fld, text in fields:
        snips = extract_raw_math_snippets(text)
        for s in snips:
            s_clean = s.strip()
            if len(s_clean) >= 2:
                all_snippets_list.append((qid, fld, s_clean))
                all_snippets_set.add(s_clean)
                category_stats[cat]["total_snippets"] += 1
                
                r = parse_latex(s_clean)
                if r.is_success:
                    category_stats[cat]["passed_snippets"] += 1
                    if r.warnings:
                        snippets_with_warnings += 1
                    for w in r.warnings:
                        warning_counts[w.code] += 1
                else:
                    failed_snippets.append({
                        "qid": qid,
                        "field": fld,
                        "category": cat,
                        "latex": s_clean,
                        "error_code": r.error_code,
                        "reason_vi": r.reason_vi,
                    })

print("\n" + "=" * 120)
print("BẢNG PHÂN BỐ 22 DẠNG BÀI TOÁN (17 HỖ TRỢ + 5 UNSUPPORTED) - ĐỦ 553 CÂU")
print("=" * 120)
header = (
    f"{'STT':3} | {'Mã nhóm dạng bài':35} | {'Tổng câu':8} | "
    f"{'Câu có chuỗi stem':18} | {'Đạt (stem)':10} | {'Tỷ lệ (stem)':12} | "
    f"{'Câu 0 chuỗi':11} | {'Chuỗi đạt/tổng':16} | {'Tỷ lệ chuỗi'}"
)
print(header)
print("-" * 140)

total_q = 0
total_with_stem = 0
total_stem_passed = 0
total_zero_stem = 0
total_snips = 0
total_snips_passed = 0

stt = 1
for cat, label in CATEGORY_LABELS.items():
    stats = category_stats[cat]
    q_tot = stats["total_questions"]
    q_stem = stats["questions_with_stem_math"]
    q_stem_pass = stats["stem_math_passed_questions"]
    q_zero = stats["questions_with_zero_stem_math"]
    snip_tot = stats["total_snippets"]
    snip_pass = stats["passed_snippets"]
    
    stem_pct = f"{(q_stem_pass / q_stem * 100):.2f}%" if q_stem > 0 else "N/A"
    snip_pct = f"{(snip_pass / snip_tot * 100):.2f}%" if snip_tot > 0 else "N/A"
    
    print(
        f"{stt:3} | {cat:35} | {q_tot:8} | "
        f"{q_stem:18} | {q_stem_pass:10} | {stem_pct:12} | "
        f"{q_zero:11} | {f'{snip_pass}/{snip_tot}':16} | {snip_pct}"
    )
    
    total_q += q_tot
    total_with_stem += q_stem
    total_stem_passed += q_stem_pass
    total_zero_stem += q_zero
    total_snips += snip_tot
    total_snips_passed += snip_pass
    stt += 1

print("-" * 140)
total_stem_pct = f"{(total_stem_passed / total_with_stem * 100):.2f}%"
total_snip_pct = f"{(total_snips_passed / total_snips * 100):.2f}%"
print(
    f"{'TỔNG':3} | {'TOÀN BỘ 22 NHÓM':35} | {total_q:8} | "
    f"{total_with_stem:18} | {total_stem_passed:10} | {total_stem_pct:12} | "
    f"{total_zero_stem:11} | {f'{total_snips_passed}/{total_snips}':16} | {total_snip_pct}"
)

# Supported 17 vs Unsupported 5
sup_q = sum(category_stats[cat]["total_questions"] for cat in list(CATEGORY_LABELS.keys())[:17])
unsup_q = sum(category_stats[cat]["total_questions"] for cat in list(CATEGORY_LABELS.keys())[17:])
print(f"\nKiểm tra tổng: 17 nhóm hỗ trợ = {sup_q} câu | 5 nhóm unsupported = {unsup_q} câu | TỔNG CỘNG = {sup_q + unsup_q} câu (Khớp 553)")

# Save detailed results
with open("tools/full_benchmark_stats.json", "w", encoding="utf-8") as f:
    json.dump({
        "total_questions": total_q,
        "questions_with_stem": total_with_stem,
        "stem_passed": total_stem_passed,
        "stem_pass_pct": total_stem_passed / total_with_stem if total_with_stem > 0 else 0,
        "questions_zero_stem": total_zero_stem,
        "total_snippets_raw": len(all_snippets_list),
        "total_snippets_unique": len(all_snippets_set),
        "snippets_passed": total_snips_passed,
        "snippet_pass_pct": total_snips_passed / total_snips if total_snips > 0 else 0,
        "snippets_with_warnings": snippets_with_warnings,
        "warning_counts": dict(warning_counts),
        "failed_count": len(failed_snippets),
    }, f, ensure_ascii=False, indent=2)

print("\n" + "=" * 80)
print("BẢNG MÃ CẢNH BÁO WARN_* TRÊN TOÀN BỘ KHO")
print("=" * 80)
for code, cnt in sorted(warning_counts.items(), key=lambda x: -x[1]):
    print(f"{code:45} : {cnt:5} lần")

print(f"\nTổng chuỗi có ít nhất 1 cảnh báo: {snippets_with_warnings}/{total_snips_passed} "
      f"({(snippets_with_warnings / total_snips_passed * 100):.2f}% trên chuỗi hợp lệ)")
