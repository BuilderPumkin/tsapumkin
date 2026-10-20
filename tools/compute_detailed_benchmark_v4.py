import json
import os
import re
import sys
from collections import defaultdict, Counter

sys.path.insert(0, "pumkin-math-api")
sys.path.insert(0, ".")
sys.stdout.reconfigure(encoding="utf-8")

from tools.classify_questions import classify_question_v2
from tools.extract_latex_corpus import extract_raw_math_snippets
from app.latex import parse_latex

DATA_PATH = "pumkin3/data/questions/all.json"
if not os.path.exists(DATA_PATH):
    DATA_PATH = "data/questions/all.json"

with open(DATA_PATH, encoding="utf-8") as f:
    questions = json.load(f)

# Mutually exclusive priority order:
# 1. LATEX_ENV_BEGIN: \begin{...}
# 2. LOGICAL_CONNECTIVES: \iff, \implies, \Leftrightarrow, \Rightarrow, \lor, \land
# 3. SET_THEORETIC_SYNTAX: \in, \cap, \cup, \setminus, \subset, \mathbb
# 4. MULTI_FORMULA_SEMICOLON: ';' (subdivided)
# 5. LIST_OR_POINT_COMMA: non-decimal ',' (subdivided)
# 6. COMBINATORICS_NOTATION: C_n^k, A_n^k
# 7. PREFIXED_PHYSICAL_UNIT: \mu\text{F}, \mu\text{m}
# 8. PERCENTAGE_SIGN: '\%' or '%'
# 9. PLUS_MINUS_SIGN: '\pm' or '\mp'
# 10. UNCLOSED_PIPE: '|' without matching
# 11. ELLIPSIS_DOTS: '\dots', '\ldots'
# 12. OTHER_NON_STANDARD_SYNTAX

def classify_failure(s: str) -> tuple[str, str]:
    if r"\begin" in s:
        return "LATEX_ENV_BEGIN", "Môi trường ma trận/hệ phương trình LaTeX"
    if any(k in s for k in [r"\iff", r"\implies", r"\Leftrightarrow", r"\Rightarrow", r"\lor", r"\land"]):
        return "LOGICAL_CONNECTIVES", "Phép nối mệnh đề logic"
    if any(k in s for k in [r"\in", r"\cap", r"\cup", r"\setminus", r"\subset", r"\mathbb"]):
        return "SET_THEORETIC_SYNTAX", "Ký hiệu tập hợp (thuộc, giao, hợp, hiệu)"
    if (("C_" in s or "A_" in s) and "^" in s):
        return "COMBINATORICS_NOTATION", "Tổ hợp C_n^k / Chỉnh hợp A_n^k chưa hỗ trợ AST"
    if r"\mu\text{" in s or r"\mu " in s:
        return "PREFIXED_PHYSICAL_UNIT", "Tiền tố micro đơn vị vật lý"
    if ";" in s:
        # Subdivide semicolon
        if re.search(r"[\[\(].*?;.*?[\]\)]", s):
            if s.count(";") >= 2:
                return "SEMICOLON_COORDINATES", "Tọa độ không gian (x; y; z)"
            else:
                return "SEMICOLON_INTERVAL", "Khoảng/đoạn số học (a; b) hoặc [a; b]"
        elif "=" in s:
            return "SEMICOLON_LIST_EQUATIONS", "Liệt kê nhiều phương trình (x=a; y=b)"
        else:
            return "SEMICOLON_OTHER", "Chấm phẩy khác"
    if re.search(r",\s*[^0-9]|,\s*$", s) or re.search(r"[^0-9],", s):
        # Subdivide comma
        if re.search(r"[\[\(].*?,.*?[\]\)]", s):
            if s.count(",") >= 2:
                return "COMMA_COORDINATES", "Tọa độ không gian (x, y, z)"
            else:
                return "COMMA_INTERVAL", "Khoảng/đoạn số học (a, b)"
        elif "=" in s:
            return "COMMA_LIST_EQUATIONS", "Liệt kê nhiều đẳng thức (x=1, y=2)"
        else:
            return "COMMA_OTHER", "Dấu phẩy liệt kê tham số/biến"
    if r"\%" in s or "%" in s:
        return "PERCENTAGE_SIGN", "Ký tự phần trăm %"
    if r"\pm" in s or r"\mp" in s:
        return "PLUS_MINUS_SIGN", "Ký hiệu cộng trừ \pm"
    if s.count("|") % 2 != 0:
        return "UNCLOSED_PIPE", "Dấu gạch đứng | không đóng"
    if any(k in s for k in [r"\dots", r"\ldots", r"\cdots"]):
        return "ELLIPSIS_DOTS", "Dấu ba chấm lửng \dots"
    return "OTHER_NON_STANDARD_SYNTAX", "Cú pháp phi chuẩn khác"

# Per field stats
field_stats = {
    "stem": {"total": 0, "passed": 0},
    "options": {"total": 0, "passed": 0},
    "explanation": {"total": 0, "passed": 0},
}

all_failures = []
cause_counter = Counter()

for q in questions:
    qid = q.get("id")
    stem_text = q.get("question_text") or q.get("question") or ""
    for s in extract_raw_math_snippets(stem_text):
        sc = s.strip()
        if len(sc) >= 2:
            field_stats["stem"]["total"] += 1
            r = parse_latex(sc)
            if r.is_success:
                field_stats["stem"]["passed"] += 1
            else:
                c, desc = classify_failure(sc)
                cause_counter[c] += 1
                all_failures.append({"qid": qid, "field": "stem", "latex": sc, "cause": c, "desc": desc})

    for opt in (q.get("options") or []):
        for s in extract_raw_math_snippets(str(opt)):
            sc = s.strip()
            if len(sc) >= 2:
                field_stats["options"]["total"] += 1
                r = parse_latex(sc)
                if r.is_success:
                    field_stats["options"]["passed"] += 1
                else:
                    c, desc = classify_failure(sc)
                    cause_counter[c] += 1
                    all_failures.append({"qid": qid, "field": "options", "latex": sc, "cause": c, "desc": desc})

    expl_text = q.get("explanation") or ""
    for s in extract_raw_math_snippets(expl_text):
        sc = s.strip()
        if len(sc) >= 2:
            field_stats["explanation"]["total"] += 1
            r = parse_latex(sc)
            if r.is_success:
                field_stats["explanation"]["passed"] += 1
            else:
                c, desc = classify_failure(sc)
                cause_counter[c] += 1
                all_failures.append({"qid": qid, "field": "explanation", "latex": sc, "cause": c, "desc": desc})

print("=" * 80)
print("ĐỘ PHỦ TÁCH RIÊNG THEO TRƯỜNG DỮ LIỆU:")
print("=" * 80)
for fld, st in field_stats.items():
    rate = (st["passed"] / st["total"] * 100) if st["total"] > 0 else 0
    print(f"Trường {fld:15}: {st['passed']:4}/{st['total']:4} chuỗi ({rate:.2f}%)")

print("\n" + "=" * 80)
print(f"BẢNG NGUYÊN NHÂN THẤT BẠI LOẠI TRỪ LẪN NHAU (TỔNG = {len(all_failures)} chuỗi thất bại):")
print("=" * 80)
for c, cnt in cause_counter.most_common():
    print(f"{c:30}: {cnt:4} chuỗi ({(cnt/len(all_failures)*100):.2f}%)")
