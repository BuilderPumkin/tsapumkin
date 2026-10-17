import urllib.request
import json
import sys

sys.stdout.reconfigure(encoding="utf-8")

url = "https://api.github.com/repos/BuilderPumkin/tsapumkin/actions/runs"
req = urllib.request.Request(url, headers={"User-Agent": "Python/3.13"})

try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        print(f"Total runs: {data.get('total_count')}")
        runs = data.get("workflow_runs", [])
        for r in runs[:6]:
            print(f"ID: {r['id']}")
            print(f"  head_sha: {r['head_sha']}")
            print(f"  head_branch: {r['head_branch']}")
            print(f"  status: {r['status']}")
            print(f"  conclusion: {r['conclusion']}")
            print(f"  html_url: {r['html_url']}")
            
            # Fetch jobs for this run
            jobs_url = r["jobs_url"]
            jreq = urllib.request.Request(jobs_url, headers={"User-Agent": "Python/3.13"})
            try:
                with urllib.request.urlopen(jreq) as jresp:
                    jdata = json.loads(jresp.read().decode("utf-8"))
                    for j in jdata.get("jobs", []):
                        print(f"    Job: {j['name']}")
                        print(f"      runner_name: {j.get('runner_name')}")
                        print(f"      status: {j['status']}, conclusion: {j['conclusion']}")
            except Exception as je:
                print(f"    Job fetch error: {je}")
            print("-" * 50)
except Exception as e:
    print("Error fetching runs:", e)
