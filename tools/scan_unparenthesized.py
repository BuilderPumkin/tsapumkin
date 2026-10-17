import json
import re
import sys

sys.path.insert(0, "pumkin-math-api")
sys.stdout.reconfigure(encoding="utf-8")
from app.latex import parse_latex

with open("pumkin3/data/questions/all.json", encoding="utf-8") as f:
    questions = json.load(f)

# Matches \sin, \cos, \tan, \cot, \ln, \log followed by number and variable without parens or braces
# or trig followed directly by a variable like \sin x, \cos x, \sin 2x, \ln 2x, \log 2x
pattern = re.compile(r"\\(sin|cos|tan|cot|ln|log)\s*([0-9]+[a-zA-Z]|[0-9]+)")

found = []
for q in questions:
    qid = q.get("id", "")
    text_blobs = [q.get("question_text", "")]
    opts = q.get("options", [])
    if isinstance(opts, dict):
        text_blobs.extend(opts.values())
    elif isinstance(opts, list):
        text_blobs.extend(opts)
    text_blobs.append(q.get("explanation", ""))

    for text in text_blobs:
        snippets = re.findall(r"\$([^\$]+)\$", text) + re.findall(r"\\\(([^\)]+)\\\)", text)
        for s in snippets:
            s_clean = s.strip()
            # check if there's \func without immediate paren/brace
            m = re.search(r"\\(sin|cos|tan|cot|ln|log)(?:\s+|(?=[0-9a-zA-Z]))(?![{(\^_\\])([0-9a-zA-Z]+)", s_clean)
            if m:
                found.append((qid, s_clean, m.group(0)))

print(f"Total occurrences found: {len(found)}")
unique_found = []
seen = set()
for qid, s, matched in found:
    if (qid, s) not in seen:
        seen.add((qid, s))
        unique_found.append((qid, s, matched))

print(f"Unique (qid, latex) pairs: {len(unique_found)}")
for qid, s, matched in unique_found:
    res = parse_latex(s)
    expr_str = repr(res.expr) if res.is_success else f"FAILED: {res.error_code} ({res.reason_vi})"
    warns = [w.code for w in res.warnings] if res.is_success else []
    print(f"QID: {qid} | MATCH: {matched} | LATEX: {s} | EXPR: {expr_str} | WARNS: {warns}")
