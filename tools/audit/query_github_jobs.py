import json
import sys
import urllib.request

sys.stdout.reconfigure(encoding="utf-8")
url = "https://api.github.com/repos/BuilderPumkin/tsapumkin/actions/runs/39042725590/jobs"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})

try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        jobs = data.get("jobs", [])
        for j in jobs:
            print(f"Job ID: {j['id']} | Name: {j['name']} | Status: {j['status']} | Conclusion: {j['conclusion']}")
            print(f"Runner: {j.get('runner_name')} | Labels: {j.get('labels')}")
            for s in j.get("steps", []):
                print(f"  Step: {s['name']} | Status: {s['status']} | Conclusion: {s['conclusion']}")
except Exception as e:
    print("Error querying GitHub API jobs:", e)
