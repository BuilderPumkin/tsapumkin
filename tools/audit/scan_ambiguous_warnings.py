import json
import re
import sys

sys.path.insert(0, "pumkin-math-api")
sys.stdout.reconfigure(encoding="utf-8")

from app.latex import parse_latex

with open("pumkin3/data/questions/all.json", encoding="utf-8") as f:
    questions = json.load(f)

pattern = re.compile(r"\\\((.*?)\\\)|\$(.*?)\$")
results = []

for q in questions:
    qid = q.get("id", "unknown")
    fields = [
        ("question_text", q.get("question_text") or q.get("question") or ""),
        ("explanation", q.get("explanation") or ""),
    ]
    opts = q.get("options") or []
    if isinstance(opts, list):
        for idx, opt in enumerate(opts):
            fields.append((f"options[{idx}]", str(opt)))
    elif isinstance(opts, dict):
        for k, v in opts.items():
            fields.append((f"options[{k}]", str(v)))

    for fld, text in fields:
        for m in pattern.finditer(text):
            snip = m.group(1) if m.group(1) is not None else m.group(2)
            if not snip or not snip.strip():
                continue
            res = parse_latex(snip.strip())
            if res.is_success and any(w.code == "WARN_AMBIGUOUS_FUNCTION_OR_PRODUCT" for w in res.warnings):
                results.append({
                    "qid": qid,
                    "field": fld,
                    "latex": snip.strip(),
                    "expr": repr(res.expr),
                })

print(f"Total occurrences of WARN_AMBIGUOUS_FUNCTION_OR_PRODUCT: {len(results)}")

seen = set()
unique_results = []
for r in results:
    key = (r["qid"], r["latex"])
    if key not in seen:
        seen.add(key)
        unique_results.append(r)

print(f"Unique (qid, latex) pairs: {len(unique_results)}")

for idx, r in enumerate(unique_results, 1):
    print(f"| {idx} | `{r['qid']}` | `{r['latex']}` | Tích (`{r['expr']}`) | Giữ phép nhân ngầm + phát cảnh báo |")
