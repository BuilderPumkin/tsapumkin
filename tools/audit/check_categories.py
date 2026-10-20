import json
from collections import Counter

with open("pumkin3/data/questions/all.json", encoding="utf-8") as f:
    questions = json.load(f)

print(f"Total questions: {len(questions)}")
cat_counts = Counter(q.get("category", "UNKNOWN") for q in questions)
for cat, count in sorted(cat_counts.items()):
    print(f"{cat:40} : {count}")
print(f"Total summed questions: {sum(cat_counts.values())}")
