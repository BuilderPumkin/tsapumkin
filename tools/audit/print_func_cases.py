import json
import sys

sys.stdout.reconfigure(encoding="utf-8")
with open("tools/funcs_vs_prods_report.json", encoding="utf-8") as f:
    data = json.load(f)

targets = [
    "H(p)", "I(a)", "y(t)", "y'(t)", "N(t)", "C(x)", r"\mu(x)",
    r"\Delta(0.2)", "y(x)", "f'_x", "z(x)", "R(x)", "n(A)", r"n(\Omega)"
]

found = []
seen = set()

for d in data:
    for t in targets:
        if t in d["latex"]:
            key = (d["qid"], t, d["latex"])
            if key not in seen:
                seen.add(key)
                found.append(d)

print(f"Total matched known cases: {len(found)}")
print(f"{'QID':25} | {'Target':12} | {'LaTeX':45} | {'Expr':32} | {'Current':10} | {'Correctness'}")
print("-" * 150)
for d in found:
    lx = d["latex"][:43]
    ex = d["expr"][:30]
    print(f"{d['qid']:25} | {d['name']:12} | {lx:45} | {ex:32} | {d['current']:10} | {d['correctness']}")
