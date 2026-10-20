import subprocess
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

def get_file_at(commit, path):
    return json.loads(subprocess.check_output(['git', 'show', f'{commit}:{path}'], encoding='utf-8'))

for path in [
    'pumkin-math-api/tests/golden/latex_corpus_cases.json',
    'pumkin-math-api/tests/golden/latex_human_verified_cases.json',
    'pumkin-math-api/tests/golden/latex_independent_stratified_cases.json'
]:
    print(f"\n=======================================================")
    print(f"FILE: {path}")
    print(f"=======================================================")
    d_before = get_file_at('c8cd6b0~1', path)
    d_after = get_file_at('c8cd6b0', path)
    
    cases_before = d_before if isinstance(d_before, list) else d_before.get('valid_cases', [])
    cases_after = d_after if isinstance(d_after, list) else d_after.get('valid_cases', [])
    
    map_before = {c.get('case_id') or c.get('id'): c for c in cases_before}
    map_after = {c.get('case_id') or c.get('id'): c for c in cases_after}
    
    diff_cases = []
    for cid, c_after in map_after.items():
        c_before = map_before.get(cid)
        if not c_before:
            diff_cases.append((cid, c_after.get('latex'), 'ADDED', c_after.get('expected_repr'), 'New case'))
        else:
            lat_changed = (c_before.get('latex') != c_after.get('latex'))
            repr_changed = (c_before.get('expected_repr') != c_after.get('expected_repr'))
            mode_changed = (c_before.get('verification_mode') != c_after.get('verification_mode'))
            if lat_changed or repr_changed:
                diff_cases.append((
                    cid,
                    c_after.get('latex'),
                    c_before.get('expected_repr'),
                    c_after.get('expected_repr'),
                    'latex changed' if lat_changed else 'expected_repr changed'
                ))
    print(f"Total changed cases: {len(diff_cases)}")
    print(f"| {'id':<12} | {'latex':<35} | {'trước (before)':<40} | {'sau (after)':<40} | {'lý do':<25} |")
    print("|" + "-"*14 + "|" + "-"*37 + "|" + "-"*42 + "|" + "-"*42 + "|" + "-"*27 + "|")
    for cid, lat, bef, aft, reason in diff_cases:
        lat_disp = (lat[:32] + '...') if len(lat) > 35 else lat
        bef_disp = (str(bef)[:37] + '...') if len(str(bef)) > 40 else str(bef)
        aft_disp = (str(aft)[:37] + '...') if len(str(aft)) > 40 else str(aft)
        print(f"| {cid:<12} | {lat_disp:<35} | {bef_disp:<40} | {aft_disp:<40} | {reason:<25} |")
