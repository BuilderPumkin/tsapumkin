import json
import os
import re
import sys
from collections import defaultdict, Counter

sys.stdout.reconfigure(encoding="utf-8")
sys.path.insert(0, "pumkin-math-api")
sys.path.insert(0, ".")

from tools.extract_latex_corpus import extract_raw_math_snippets
from app.latex import parse_latex

DATA_PATH = "pumkin3/data/questions/all.json"
if not os.path.exists(DATA_PATH):
    DATA_PATH = "data/questions/all.json"

with open(DATA_PATH, encoding="utf-8") as f:
    questions = json.load(f)

# Priority order for root causes (Mutually Exclusive):
# 1. LATEX_ENV_BEGIN: \begin{...}
# 2. LOGICAL_CONNECTIVES: \iff, \implies, \Leftrightarrow, \Rightarrow, \lor, \land
# 3. SET_THEORETIC_SYNTAX: \in, \cap, \cup, \setminus, \subset, \mathbb
# 4. MULTI_FORMULA_SEMICOLON: ';'
# 5. LIST_OR_POINT_COMMA: ',' (isolated coordinate/list, NOT decimal comma)
# 6. PERCENTAGE_SIGN: '\%' or '%'
# 7. PLUS_MINUS_SIGN: '\pm' or '\mp'
# 8. UNCLOSED_PIPE: '|' without matching closing
# 9. ELLIPSIS_DOTS: '\dots', '\ldots', '\cdots'
# 10. OTHER_NON_STANDARD_SYNTAX: other syntax errors

def classify_failure(s: str) -> str:
    if r"\begin" in s:
        return "LATEX_ENV_BEGIN"
    if any(k in s for k in [r"\iff", r"\implies", r"\Leftrightarrow", r"\Rightarrow", r"\lor", r"\land"]):
        return "LOGICAL_CONNECTIVES"
    if any(k in s for k in [r"\in", r"\cap", r"\cup", r"\setminus", r"\subset", r"\mathbb"]):
        return "SET_THEORETIC_SYNTAX"
    if ";" in s:
        return "MULTI_FORMULA_SEMICOLON"
    # Check for non-decimal comma
    if re.search(r",\s*[^0-9]|,\s*$", s) or re.search(r"[^0-9],", s):
        return "LIST_OR_POINT_COMMA"
    if r"\%" in s or "%" in s:
        return "PERCENTAGE_SIGN"
    if r"\pm" in s or r"\mp" in s:
        return "PLUS_MINUS_SIGN"
    if s.count("|") % 2 != 0:
        return "UNCLOSED_PIPE"
    if any(k in s for k in [r"\dots", r"\ldots", r"\cdots"]):
        return "ELLIPSIS_DOTS"
    return "OTHER_NON_STANDARD_SYNTAX"

all_failures = []
cause_counter = Counter()

for q in questions:
    qid = q.get("id")
    fields = [("stem", q.get("question_text") or q.get("question") or "")]
    for i, opt in enumerate(q.get("options") or []):
        fields.append((f"opt_{i+1}", str(opt)))
    fields.append(("explanation", q.get("explanation") or ""))
    
    for fld, text in fields:
        snips = extract_raw_math_snippets(text)
        for s in snips:
            s_clean = s.strip()
            if len(s_clean) >= 2:
                res = parse_latex(s_clean)
                if not res.is_success:
                    cause = classify_failure(s_clean)
                    cause_counter[cause] += 1
                    all_failures.append({
                        "qid": qid,
                        "field": fld,
                        "latex": s_clean,
                        "cause": cause,
                        "error_code": res.error_code,
                    })

print("=" * 80)
print(f"BẢNG PHÂN LOẠI NGUYÊN NHÂN THẤT BẠI LOẠI TRỪ LẪN NHAU (TỔNG = {len(all_failures)})")
print("=" * 80)
for cause, cnt in cause_counter.most_common():
    print(f"{cause:30} : {cnt:5} chuỗi ({(cnt/len(all_failures)*100):.2f}%)")

# Extract 12 samples for SEMICOLON (max 2 per qid)
semicolon_samples = []
seen_qid_semi = Counter()
for f in all_failures:
    if f["cause"] == "MULTI_FORMULA_SEMICOLON" and seen_qid_semi[f["qid"]] < 2:
        seen_qid_semi[f["qid"]] += 1
        semicolon_samples.append(f)
        if len(semicolon_samples) == 12:
            break

# Extract 12 samples for COMMA (max 2 per qid)
comma_samples = []
seen_qid_comma = Counter()
for f in all_failures:
    if f["cause"] == "LIST_OR_POINT_COMMA" and seen_qid_comma[f["qid"]] < 2:
        seen_qid_comma[f["qid"]] += 1
        comma_samples.append(f)
        if len(comma_samples) == 12:
            break

# Extract 10 samples for OTHER_NON_STANDARD_SYNTAX (not in comma)
other_samples = []
seen_qid_other = Counter()
for f in all_failures:
    if f["cause"] == "OTHER_NON_STANDARD_SYNTAX" and seen_qid_other[f["qid"]] < 2:
        seen_qid_other[f["qid"]] += 1
        other_samples.append(f)
        if len(other_samples) == 10:
            break

print("\n" + "=" * 80)
print("12 MẪU NGUYÊN NHÂN CHẤM PHẨY (;) - MAX 2 MẪU/QID")
print("=" * 80)
for i, s in enumerate(semicolon_samples, 1):
    print(f"{i:2}. [{s['qid']}] ({s['field']}): {s['latex']}")

print("\n" + "=" * 80)
print("12 MẪU NGUYÊN NHÂN DẤU PHẨY LIỆT KÊ/TỌA ĐỘ (,) - MAX 2 MẪU/QID")
print("=" * 80)
for i, s in enumerate(comma_samples, 1):
    print(f"{i:2}. [{s['qid']}] ({s['field']}): {s['latex']}")

print("\n" + "=" * 80)
print("10 MẪU OTHER_NON_STANDARD_SYNTAX (KHÔNG TRÙNG DẤU PHẨY)")
print("=" * 80)
for i, s in enumerate(other_samples, 1):
    print(f"{i:2}. [{s['qid']}] ({s['field']}): {s['latex']}")
