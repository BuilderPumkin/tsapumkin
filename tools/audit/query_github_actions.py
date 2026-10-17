import json
import sys
import urllib.request

sys.stdout.reconfigure(encoding="utf-8")
url = "https://api.github.com/repos/BuilderPumkin/tsapumkin/actions/runs"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})

try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        runs = data.get("workflow_runs", [])
        print(f"Total workflow runs found: {len(runs)}")
        for r in runs[:5]:
            print(f"ID: {r['id']} | SHA: {r['head_sha']} | Branch: {r['head_branch']} | Status: {r['status']} | Conclusion: {r['conclusion']}")
            if r['head_sha'].startswith('50df54f'):
                print("--- Full JSON for commit 50df54f ---")
                filtered = {
                    "id": r["id"],
                    "name": r.get("name"),
                    "head_branch": r.get("head_branch"),
                    "head_sha": r.get("head_sha"),
                    "status": r.get("status"),
                    "conclusion": r.get("conclusion"),
                    "workflow_id": r.get("workflow_id"),
                    "url": r.get("html_url"),
                    "created_at": r.get("created_at"),
                    "updated_at": r.get("updated_at"),
                    "run_attempt": r.get("run_attempt"),
                }
                print(json.dumps(filtered, indent=2))
except Exception as e:
    print("Error querying GitHub API:", e)
