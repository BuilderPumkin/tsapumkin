import urllib.request
import json

runs = [
    ("feature/web-gateway-integration", "39410828713"),
    ("feature/math-api", "39246228941")
]

for branch, run_id in runs:
    print(f"\n==========================================")
    print(f"BRANCH: {branch} | RUN ID: {run_id}")
    print(f"==========================================")
    url = f"https://api.github.com/repos/BuilderPumkin/tsapumkin/actions/runs/{run_id}/jobs"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            for job in data.get("jobs", []):
                print(f"Job: {job['name']} | Status: {job['status']} | Conclusion: {job['conclusion']}")
                for step in job.get("steps", []):
                    print(f"  Step: {step['name']} | Status: {step['status']} | Conclusion: {step['conclusion']}")
    except Exception as e:
        print("Error fetching jobs:", e)
