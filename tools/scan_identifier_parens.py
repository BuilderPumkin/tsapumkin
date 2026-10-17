import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path("pumkin-math-api").resolve()))
sys.stdout.reconfigure(encoding="utf-8")

from app.latex import parse_latex

with open("pumkin3/data/questions/all.json", encoding="utf-8") as f:
    questions = json.load(f)

# Pattern: Single letter or greek command, optionally with subscript (_...) or prime ('), directly before (
# e.g., f(x), y(t), y'(t), f'(x), H(p), I(a), N(t), C(x), \mu(x), \Delta(0.2), u(x), v(x), P(x), Q(x), C_1(x)
pattern = re.compile(r"(\\?[a-zA-Z][a-zA-Z0-9_']{0,10})\s*\(")

results = []
seen = set()

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
            matches = pattern.findall(s_clean)
            if matches:
                # Exclude known math functions like \sin, \cos, \tan, \ln, \log, \exp, \min, \max, \det, \lim
                filtered = [
                    m for m in matches
                    if m not in (
                        r"\sin", r"\cos", r"\tan", r"\cot", r"\ln", r"\log", r"\lg",
                        r"\exp", r"\min", r"\max", r"\det", r"\lim", r"\arcsin",
                        r"\arccos", r"\arctan", r"\arccot", "sin", "cos", "tan", "cot",
                        "ln", "log", "exp", "min", "max", "det", "lim"
                    )
                ]
                if filtered:
                    pair_key = (qid, s_clean)
                    if pair_key not in seen:
                        seen.add(pair_key)
                        res = parse_latex(s_clean)
                        results.append({
                            "qid": qid,
                            "origin": origin,
                            "latex": s_clean,
                            "matches": filtered,
                            "success": res.is_success,
                            "expr": repr(res.expr) if res.is_success else f"FAIL: {res.error_code}",
                            "warnings": [w.code for w in res.warnings],
                        })

print(f"Total occurrences found across corpus: {len(results)}")
print("-" * 100)
for r in results:
    print(f"[{r['qid']}] ({r['origin']}) Matches: {r['matches']}")
    print(f"  LaTeX: {r['latex']}")
    print(f"  Expr:  {r['expr']}")
    print(f"  Warns: {r['warnings']}")
    print()
