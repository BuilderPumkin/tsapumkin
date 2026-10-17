import json
import sys

sys.stdout.reconfigure(encoding="utf-8")
with open("tools/boolean_audit_results.json", encoding="utf-8") as f:
    data = json.load(f)

# Find key user cases
targets = ["q_tsa_14", "q_tsa_tf_03", "q_gen_laikep_7", "q_tsa_num_02", "q_superhard_type4_04"]

target_cases = [d for d in data if d["qid"] in targets]
print(f"Target cases found: {len(target_cases)}")
for d in target_cases:
    print(f"[{d['qid']}] ({d['field']}) {d['latex']}")
    print(f"  -> Now: {d['current_expr']} (Type: {d.get('type')})")
