import json
import re
import sys
from pathlib import Path

# Add pumkin-math-api to path
sys.path.insert(0, str(Path("pumkin-math-api").resolve()))
sys.stdout.reconfigure(encoding="utf-8")

from app.latex import parse_latex

with open("pumkin3/data/questions/all.json", encoding="utf-8") as f:
    questions = json.load(f)

semi_samples = []
comma_samples = []
other_samples = []

with open("docs/latex_corpus_benchmark.json", encoding="utf-8") as f:
    bench = json.load(f)

other_samples = bench.get("other_non_standard_syntax_samples", [])

for q in questions:
    qid = q["id"]
    texts = [q.get("question_text", "")]
    texts.extend(q.get("options") or [])
    texts.append(q.get("explanation", ""))

    math_snips = []
    for t in texts:
        math_snips.extend(re.findall(r"\\\((.*?)\\\)", t))
        math_snips.extend(re.findall(r"\$\$(.*?)\$\$", t))
        math_snips.extend(re.findall(r"(?<!\\)\$(.*?)(?<!\\)\$", t))

    for s in math_snips:
        res = parse_latex(s)
        if not res.is_success:
            if ";" in s and len(semi_samples) < 12 and not any(x[0] == qid and x[1] == s for x in semi_samples):
                semi_samples.append((qid, s, res.reason_vi))
            if "," in s and ";" not in s and len(comma_samples) < 12 and not any(x[0] == qid and x[1] == s for x in comma_samples):
                comma_samples.append((qid, s, res.reason_vi))

print("=== 12 SAMPLES FOR SEMICOLON (;) ===")
for i, (qid, s, r) in enumerate(semi_samples, 1):
    print(f"{i:2}. [{qid}] {s} -> {r}")

print("\n=== 12 SAMPLES FOR COMMA (,) ===")
for i, (qid, s, r) in enumerate(comma_samples, 1):
    print(f"{i:2}. [{qid}] {s} -> {r}")

print("\n=== 10 SAMPLES FOR OTHER NON-STANDARD SYNTAX ===")
for i, item in enumerate(other_samples, 1):
    print(f"{i:2}. [{item.get('question_id', '')}] {item.get('latex', '')} -> {item.get('reason_vi', '')}")
