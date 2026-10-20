import subprocess
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

def get_file_at(commit, path):
    return json.loads(subprocess.check_output(['git', 'show', f'{commit}:{path}'], encoding='utf-8'))

path = 'pumkin-math-api/tests/golden/latex_human_verified_cases.json'
d_before = get_file_at('c8cd6b0~1', path)
d_after = get_file_at('c8cd6b0', path)

for group in ['valid_cases', 'rejected_cases']:
    cases_b = d_before.get(group, [])
    cases_a = d_after.get(group, [])
    map_b = {c['case_id']: c for c in cases_b}
    map_a = {c['case_id']: c for c in cases_a}
    
    print(f"\n=== Group: {group} ===")
    for cid, ca in map_a.items():
        cb = map_b.get(cid)
        if not cb:
            print(f"Added: {cid}")
            continue
        lat_diff = cb.get('latex') != ca.get('latex')
        repr_diff = cb.get('expected_repr') != ca.get('expected_repr')
        err_diff = cb.get('expected_error_code') != ca.get('expected_error_code')
        mode_diff = cb.get('verification_mode') != ca.get('verification_mode')
        if lat_diff or repr_diff or err_diff or mode_diff:
            print(f"Case {cid} (qid={ca.get('qid')}):")
            if lat_diff:
                print(f"  LATEX:   {cb.get('latex')}  ==>  {ca.get('latex')}")
            if repr_diff:
                print(f"  REPR:    {cb.get('expected_repr')}  ==>  {ca.get('expected_repr')}")
            if err_diff:
                print(f"  ERR:     {cb.get('expected_error_code')}  ==>  {ca.get('expected_error_code')}")
            if mode_diff:
                print(f"  MODE:    {cb.get('verification_mode')}  ==>  {ca.get('verification_mode')}")
