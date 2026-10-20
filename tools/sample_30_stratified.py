import json
import random
import sys

sys.stdout.reconfigure(encoding='utf-8')

random.seed(42)
with open('pumkin-math-api/tests/golden/latex_independent_stratified_cases.json', 'r', encoding='utf-8') as f:
    cases = json.load(f)

sample = random.sample(cases, 30)
print(f"| {'id':<10} | {'latex':<35} | {'kỳ vọng (expected_repr)':<45} | {'nguồn kỳ vọng':<25} |")
print("|" + "-"*12 + "|" + "-"*37 + "|" + "-"*47 + "|" + "-"*27 + "|")
for c in sample:
    cid = c.get('case_id') or c.get('id')
    lat = c['latex']
    if len(lat) > 33:
        lat = lat[:30] + "..."
    exp = str(c.get('expected_repr', ''))
    if len(exp) > 43:
        exp = exp[:40] + "..."
    src = c.get('verification_mode', 'snapshot')
    print(f"| {cid:<10} | {lat:<35} | {exp:<45} | {src:<25} |")
