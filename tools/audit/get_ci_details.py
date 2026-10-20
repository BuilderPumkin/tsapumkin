import urllib.request
import json
import sys

url = "https://api.github.com/repos/BuilderPumkin/tsapumkin/actions/runs?per_page=15"
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        for run in data.get("workflow_runs", []):
            print(f"ID: {run['id']} | SHA: {run['head_sha']} | Branch: {run['head_branch']} | Status: {run['status']} | Conclusion: {run['conclusion']} | URL: {run['html_url']}")
except Exception as e:
    print("Error:", e)
