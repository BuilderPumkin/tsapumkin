import json
import random
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path("pumkin-math-api").resolve()))
sys.stdout.reconfigure(encoding="utf-8")

from app.latex import parse_latex

with open("pumkin3/data/questions/all.json", encoding="utf-8") as f:
    questions = json.load(f)

# Collect all (qid, origin, latex) snippets
all_snippets = []
for q in questions:
    qid = q["id"]
    texts = [("stem", q.get("question_text", ""))]
    for opt in (q.get("options") or []):
        texts.append(("option", opt))
    texts.append(("explanation", q.get("explanation", "")))

    for origin, t in texts:
        for s in (
            re.findall(r"\\\((.*?)\\\)", t)
            + re.findall(r"\$\$(.*?)\$\$", t)
            + re.findall(r"(?<!\\)\$(.*?)(?<!\\)\$", t)
        ):
            s_clean = s.strip()
            if s_clean:
                all_snippets.append((qid, origin, s_clean))

# Deduplicate snippets by latex string while keeping qid
unique_snippets = {}
for qid, origin, latex in all_snippets:
    if latex not in unique_snippets:
        unique_snippets[latex] = (qid, origin)

# Filter all that parse successfully
success_list = []
for latex, (qid, origin) in unique_snippets.items():
    res = parse_latex(latex)
    if res.is_success:
        success_list.append((qid, origin, latex, res))

print(f"Total unique successful snippets in corpus: {len(success_list)}")

# Sample >= 100 with seed=42
random.seed(42)
sampled_120 = random.sample(success_list, 120)
print(f"Sampled {len(sampled_120)} cases with seed=42.")

# Look for suspicious semantic distortions
suspicious = []
for qid, origin, latex, res in sampled_120:
    expr_str = repr(res.expr)

    # Category A: Boolean False or True produced
    if expr_str in ("False", "True"):
        suspicious.append({
            "question_id": qid,
            "origin": origin,
            "latex": latex,
            "parser_expr": expr_str,
            "intended_meaning": "Chuỗi biến đổi tương đương hoặc chuỗi đẳng thức liên hoàn",
            "verdict": "sai",
            "reason": (
                f"Parser trả về giá trị logic '{expr_str}' do SymPy tự động rút gọn đẳng thức "
                "không thỏa mãn (vế trái khác vế phải dạng hình thức) thay vì giữ nguyên quan hệ."
            ),
        })

    # Category B: Functions y(t), H(p), P(x), u(x, t) parsed as variable multiplication
    elif re.search(r"\b[yHPIuv]\([a-z]\)", latex) and not any(w.code == "WARN_IMPLICIT_FUNCTION_CALL" for w in res.warnings):
        suspicious.append({
            "question_id": qid,
            "origin": origin,
            "latex": latex,
            "parser_expr": expr_str,
            "intended_meaning": "Ký hiệu hàm số phụ thuộc biến (ví dụ y(t), H(p), P(x))",
            "verdict": "đáng ngờ",
            "reason": (
                "Ký hiệu hàm như y(x), H(p) bị phân tích thành tích đại số hai biến (y*x, H*p) "
                "thay vì đối tượng Function trong SymPy do chỉ hàm f, g mới được gắn Function."
            ),
        })

    # Category C: Derivative notation y'(t) or y'(x) parsed as t*y'
    elif "'" in latex and ("*" in expr_str or "/" in expr_str):
        suspicious.append({
            "question_id": qid,
            "origin": origin,
            "latex": latex,
            "parser_expr": expr_str,
            "intended_meaning": "Đạo hàm theo biến phụ thuộc y'(t) hoặc f'(x)",
            "verdict": "đáng ngờ",
            "reason": (
                "Ký hiệu đạo hàm y'(t) bị Pratt parser hiểu là nhân ngầm y' với t "
                "thay vì Derivative(y(t), t)."
            ),
        })

    # Category D: Chained equality evaluated to Eq(a, b) & Eq(b, c) without system wrapper
    elif " = " in latex and latex.count(" = ") >= 2:
        suspicious.append({
            "question_id": qid,
            "origin": origin,
            "latex": latex,
            "parser_expr": expr_str,
            "intended_meaning": "Dãy đẳng thức liên tiếp A = B = C",
            "verdict": "đáng ngờ",
            "reason": (
                "Chuyển đổi thành biểu thức logic dạng Eq(A, B) & Eq(B, C); "
                "trong SymPy đây là Boolean/And chứ không phải quan hệ số học có thể thế số hay lấy nghiệm trực tiếp."
            ),
        })

    # Category E: Unit stripped but changes semantic meaning
    elif "stripped_unit" in res.metadata and origin == "option":
        suspicious.append({
            "question_id": qid,
            "origin": origin,
            "latex": latex,
            "parser_expr": expr_str,
            "intended_meaning": f"Phương án trả lời kèm đơn vị ({res.metadata['stripped_unit']})",
            "verdict": "đáng ngờ",
            "reason": (
                f"Đơn vị '{res.metadata['stripped_unit']}' bị bóc tách vào metadata. "
                "Nếu so khớp đáp án chỉ dựa trên expr mà bỏ qua đơn vị có thể nhầm lẫn giữa cm và m."
            ),
        })

print(f"\nTotal suspicious cases found in sample: {len(suspicious)}")
for i, c in enumerate(suspicious[:12], 1):
    print(f"\n--- Case {i} ---")
    print(f"question_id:      {c['question_id']}")
    print(f"origin:           {c['origin']}")
    print(f"latex:            {c['latex']}")
    print(f"parser_expr:      {c['parser_expr']}")
    print(f"intended_meaning: {c['intended_meaning']}")
    print(f"verdict:          {c['verdict']}")
    print(f"reason:           {c['reason']}")
