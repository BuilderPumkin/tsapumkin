import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(".").resolve()))
sys.stdout.reconfigure(encoding="utf-8")

from tools.classify_questions import classify_question_v2

with open("pumkin3/data/questions/all.json", encoding="utf-8") as f:
    questions = json.load(f)

don_dieu_qs = [q for q in questions if classify_question_v2(q) == "ham_so_tinh_don_dieu"]
print(f"Total questions in ham_so_tinh_don_dieu: {len(don_dieu_qs)}")

# Check question_text of these questions
with_delims = 0
without_delims = 0
has_math_outside = 0

for q in don_dieu_qs:
    qtext = q.get("question_text", "")
    snips = (
        re.findall(r"\\\((.*?)\\\)", qtext)
        + re.findall(r"\$\$(.*?)\$\$", qtext)
        + re.findall(r"(?<!\\)\$(.*?)(?<!\\)\$", qtext)
    )
    if snips:
        with_delims += 1
    else:
        without_delims += 1
        # Check if there is math outside delimiters (e.g. y = x^3 - 3x, f(x), y', >=, etc.)
        if re.search(r"[yfx]\s*=|x\^|\/|\[\s*-?\d", qtext):
            has_math_outside += 1

print(f"Stems WITH math delimiters: {with_delims}")
print(f"Stems WITHOUT math delimiters: {without_delims}")
print(f"Stems without delimiters that contain raw math characters: {has_math_outside}")

print("\n--- SAMPLE 5 STEMS WITHOUT DELIMITERS ---")
for q in don_dieu_qs[:5]:
    print(f"[{q['id']}] {q.get('question_text')}")
    print(f"  options: {q.get('options')}")
    print(f"  explanation: {repr(q.get('explanation'))[:80]}")
    print()
