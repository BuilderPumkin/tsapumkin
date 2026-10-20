import json
import os
import re
import sys

sys.path.insert(0, "pumkin-math-api")
sys.stdout.reconfigure(encoding="utf-8")

from app.latex import parse_latex

DATA_PATH = "pumkin3/data/questions/all.json"
if not os.path.exists(DATA_PATH):
    DATA_PATH = "data/questions/all.json"

with open(DATA_PATH, encoding="utf-8") as f:
    questions = json.load(f)

pattern = re.compile(r"\\\((.*?)\\\)|\$(.*?)\$")
non_ascii_found = []
total_symbols_inspected = 0
total_snippets_inspected = 0

for q in questions:
    qid = q.get("id", "unknown")
    # Scan ALL fields: question, question_text, options, explanation, correct_answer
    fields_to_check = [
        ("question", q.get("question", "")),
        ("question_text", q.get("question_text", "")),
        ("explanation", q.get("explanation", "")),
        ("correct_answer", str(q.get("correct_answer", ""))),
    ]
    opts = q.get("options") or []
    if isinstance(opts, list):
        for idx, opt in enumerate(opts):
            fields_to_check.append((f"options[{idx}]", str(opt)))
    elif isinstance(opts, dict):
        for k, v in opts.items():
            fields_to_check.append((f"options[{k}]", str(v)))

    for fld, text in fields_to_check:
        if not isinstance(text, str):
            continue
        for match in pattern.finditer(text):
            snip = match.group(1) if match.group(1) is not None else match.group(2)
            if not snip or not snip.strip():
                continue
            total_snippets_inspected += 1
            try:
                res = parse_latex(snip.strip())
                if res.is_success and res.expr is not None:
                    # Collect free symbols
                    syms = set()
                    if hasattr(res.expr, "free_symbols"):
                        syms = res.expr.free_symbols
                    for s in syms:
                        total_symbols_inspected += 1
                        name = getattr(s, "name", str(s))
                        if not name.isascii():
                            non_ascii_found.append({
                                "qid": qid,
                                "field": fld,
                                "latex": snip.strip(),
                                "symbol": name,
                            })
            except Exception as e:
                pass

print(f"Total snippets inspected: {total_snippets_inspected}")
print(f"Total free symbols inspected: {total_symbols_inspected}")
print(f"Total symbols with non-ASCII characters: {len(non_ascii_found)}")
if non_ascii_found:
    print("Found non-ASCII symbols:")
    for item in non_ascii_found:
        print(f"  [{item['qid']}] ({item['field']}): symbol='{item['symbol']}' in LaTeX='{item['latex']}'")
else:
    print("Result: 0 non-ASCII symbols across all fields (including options).")
