import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path("pumkin-math-api").resolve()))
sys.stdout.reconfigure(encoding="utf-8")
from app.latex import parse_latex

with open("pumkin3/data/questions/all.json", encoding="utf-8") as f:
    questions = json.load(f)

# Greek symbols allowed in math
GREEK_LETTERS = {
    "alpha", "beta", "gamma", "delta", "epsilon", "zeta", "eta", "theta",
    "iota", "kappa", "lambda", "mu", "nu", "xi", "pi", "rho", "sigma",
    "tau", "upsilon", "phi", "chi", "psi", "omega",
    "Delta", "Gamma", "Theta", "Lambda", "Xi", "Pi", "Sigma", "Phi", "Psi", "Omega"
}

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
            if s_clean in seen:
                continue
            seen.add(s_clean)
            res = parse_latex(s_clean)
            if res.is_success and res.expr is not None:
                # Find all symbols in res.expr
                syms = res.expr.free_symbols if hasattr(res.expr, "free_symbols") else set()
                bad_syms = []
                for sym in syms:
                    name = sym.name
                    # Check if contains non-ascii or spaces or Vietnamese words
                    is_pure_ascii = all(ord(c) < 128 for c in name)
                    if not is_pure_ascii:
                        bad_syms.append(name)
                    elif " " in name or "_" in name and any(part in ("triệu", "đồng", "Nam", "Nữ") for part in name.split("_")):
                        bad_syms.append(name)

                if bad_syms:
                    results.append({
                        "qid": qid,
                        "origin": origin,
                        "latex": s_clean,
                        "bad_symbols": bad_syms,
                        "expr": repr(res.expr),
                    })

print(f"Total snippets with non-ASCII or Vietnamese symbols: {len(results)}")
print("-" * 120)
for r in results:
    print(f"[{r['qid']}] ({r['origin']}) Bad Symbols: {r['bad_symbols']}")
    print(f"  LaTeX: {r['latex']}")
    print(f"  Expr:  {r['expr']}")
    print()
