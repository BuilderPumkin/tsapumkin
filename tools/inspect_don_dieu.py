import json
import re
import sys
from pathlib import Path
sys.path.insert(0, str(Path(".").resolve()))
sys.stdout.reconfigure(encoding="utf-8")

with open("pumkin3/data/questions/all.json", encoding="utf-8") as f:
    questions = json.load(f)

from tools.classify_questions import classify_question_v2

don_dieu_qs = [q for q in questions if classify_question_v2(q)[0] == "ham_so_tinh_don_dieu"]
print(f"Total questions classified as ham_so_tinh_don_dieu: {len(don_dieu_qs)}")

for q in don_dieu_qs[:5]:
    print(f"ID: {q['id']}")
    print(f"  Question: {repr(q.get('question_text', ''))[:120]}")
    print(f"  Options:  {q.get('options')}")
    print()
