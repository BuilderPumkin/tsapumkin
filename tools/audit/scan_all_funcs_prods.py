import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path("pumkin-math-api").resolve()))
sys.stdout.reconfigure(encoding="utf-8")
from app.latex import parse_latex

with open("pumkin3/data/questions/all.json", encoding="utf-8") as f:
    questions = json.load(f)

# Pattern: Identifier or Command directly followed by '('
pattern = re.compile(r"(\\?[a-zA-Z][a-zA-Z0-9_\'\^]*)\s*\(")

ignored_keywords = {
    r"\sin", r"\cos", r"\tan", r"\cot", r"\ln", r"\log", r"\lg",
    r"\exp", r"\min", r"\max", r"\det", r"\lim", r"\arcsin",
    r"\arccos", r"\arctan", r"\arccot", r"\left", r"\right",
    r"\sqrt", r"\frac", r"\binom", r"\cdot", r"\times",
    "sin", "cos", "tan", "cot", "ln", "log", "exp", "min", "max", "det", "lim",
}

seen = set()
records = []

for q in questions:
    qid = q["id"]
    texts = [("stem", q.get("question_text", ""))]
    for opt in (q.get("options") or []):
        texts.append(("option", opt))
    texts.append(("explanation", q.get("explanation", "")))

    for origin, t in texts:
        math_snips = (
            re.findall(r"\\\((.*?)\\\)", t)
            + re.findall(r"\$\$(.*?)\$\$", t)
            + re.findall(r"(?<!\\)\$(.*?)(?<!\\)\$", t)
        )
        for s in math_snips:
            s_clean = s.strip()
            for m in pattern.finditer(s_clean):
                name = m.group(1)
                if name in ignored_keywords:
                    continue
                pair = (qid, s_clean, name)
                if pair not in seen:
                    seen.add(pair)
                    res = parse_latex(s_clean)
                    records.append({
                        "qid": qid,
                        "origin": origin,
                        "name": name,
                        "latex": s_clean,
                        "success": res.is_success,
                        "expr": repr(res.expr) if res.is_success else f"ERR: {res.error_code}",
                        "warns": [w.code for w in res.warnings],
                    })

print(f"Total unique (qid, snippet, token) matches: {len(records)}")

# Classify each record:
# Is it currently a Function or a Product?
# And is it intended as Function, Product, or Coordinate/Other?
table = []
for r in records:
    name = r["name"]
    expr = r["expr"]
    latex = r["latex"]
    
    # Current behavior in parser:
    is_func = False
    if r["success"] and f"{name}(" in expr or f"Function('{name}')" in expr or f"Derivative(Function('{name}')" in expr:
        is_func = True
    elif "WARN_IMPLICIT_FUNCTION_CALL" in r["warns"]:
        is_func = True
    
    current_status = "Hàm (Function)" if is_func else "Tích (Product/Symbol)"
    
    # Ground truth intent:
    # 1. Coordinate: e.g. O(0,0,0), M(1,2,3), M_1(...)
    if name in ("O", "M", "M_1", "M_2", "A", "B", "C", "D", "I", "K", "H") and re.search(r"[A-Z]\s*\(\s*[-0-9a-zA-Z\+\-\*\/]+\s*,\s*[-0-9a-zA-Z\+\-\*\/]+", latex):
        intended = "Toạ độ điểm (Coordinate)"
        correctness = "Sai (Bị hiểu thành phép nhân hoặc lỗi cú pháp)"
    # 2. Probability/measure: P(A), P(B), n(A), n(\Omega)
    elif name in ("P", "n", "p") and ("A" in latex or "B" in latex or "Omega" in latex or "cap" in latex or "mid" in latex):
        intended = "Xác suất / Độ đo (Probability / Measure)"
        correctness = "Đúng" if is_func else "Sai (Bị hiểu thành phép nhân)"
    # 3. Known functions: f(x), g(x), h(x), u(x), v(x), y(x), y(t), z(x), H(p), I(a), N(t), C(x), P(x), R(x), \mu(x), \Delta(0.2)
    elif name in ("f", "g", "h", "u", "v", "y", "z", "H", "I", "N", "C", "P", "R", r"\mu", r"\Delta", "u_n") and any(var in latex for var in ("x", "t", "p", "a", "0.2", "1", "2")):
        intended = "Hàm số (Function)"
        correctness = "Đúng" if is_func else "Sai (Bị hiểu thành phép nhân)"
    # 4. Derivative: f'(x), y'(t), y'(x), f'_x
    elif "'" in name:
        intended = "Đạo hàm hàm số (Derivative)"
        correctness = "Sai (Bị hiểu thành Symbol nhân biến)"
    # 5. Pure product: e.g. 2(x+1), x(x-1), -3(x-3), C_2(2\cos...)
    elif name in ("x", "t", "m", "C_2", "k", "a", "b", "c", "A", "B"):
        intended = "Tích đại số (Product)"
        correctness = "Đúng" if not is_func else "Sai (Bị hiểu thành hàm)"
    else:
        intended = "Không chắc chắn (Ambiguous)"
        correctness = "Cần cảnh báo / Chưa rõ"

    table.append({
        "qid": r["qid"],
        "name": name,
        "latex": latex,
        "expr": expr,
        "current": current_status,
        "intended": intended,
        "correctness": correctness,
        "success": r["success"]
    })

with open("tools/funcs_vs_prods_report.json", "w", encoding="utf-8") as f:
    json.dump(table, f, indent=2, ensure_ascii=False)

print(f"Report written with {len(table)} entries.")
