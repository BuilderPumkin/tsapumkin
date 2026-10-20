import json
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")
sys.path.insert(0, "pumkin-math-api")
from app.latex import parse_latex

qids = [
    "q_tsa_14",
    "q_tsa_tf_03",
    "q_gen_laikep_7",
    "q_tsa_num_02",
    "q_superhard_type4_04",
]

with open("public/data/questions/all.json", encoding="utf-8") as f:
    data = json.load(f)

for q in data:
    if q["id"] in qids:
        print(f"=== {q['id']} ===")
        fields = [("question_text", q.get("question_text", ""))]
        for i, opt in enumerate(q.get("options") or []):
            fields.append((f"opt_{i}", opt))
        fields.append(("explanation", q.get("explanation", "")))
        for fld_name, fld in fields:
            if not fld:
                continue
            for m in re.finditer(r"\$(.*?)\$|\\\((.*?)\\\)|\\\[(.*?)\\\]", fld):
                snip = m.group(1) or m.group(2) or m.group(3)
                if snip:
                    res = parse_latex(snip)
                    # print if it looks like a relation or boolean
                    if any(c in snip for c in ["=", "<", ">"]) or not res.is_success or "Boolean" in str(type(res.expr)):
                        print(f"  [{fld_name}] LaTeX: {snip}")
                        print(f"    Success: {res.is_success}")
                        print(f"    Expr: {repr(res.expr)}")
                        print(f"    Type: {type(res.expr).__name__}")
