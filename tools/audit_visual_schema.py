# tools/audit_visual_schema.py
import json, sys

sys.stdout.reconfigure(encoding='utf-8')

with open('data/questions/all.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

all_keys = set()
for q in questions:
    all_keys.update(q.keys())

image_patterns = ['img', 'image', 'pic', 'figure', 'fig', 'url', 'diagram', 'svg', 'attach', 'draw', 'photo', 'asset']
matching_keys = [k for k in all_keys if any(p in k.lower() for p in image_patterns)]
print('Matching image-related top-level keys in schema:', matching_keys)

for k in matching_keys:
    count = sum(1 for q in questions if q.get(k))
    print(f'  Key "{k}": {count} non-empty entries')

nested_image_keys = set()
for q in questions:
    for k, v in q.items():
        if isinstance(v, dict):
            for sub_k in v.keys():
                if any(p in sub_k.lower() for p in image_patterns):
                    nested_image_keys.add(f'{k}.{sub_k}')
print('Nested image-related keys:', nested_image_keys)

# Also inspect all top-level keys in schema for completeness
print('\nAll top-level keys present in data/questions/all.json:')
for k in sorted(all_keys):
    non_null = sum(1 for q in questions if q.get(k) is not None and q.get(k) != '')
    print(f'  {k:<20}: {non_null:>3} non-empty')
