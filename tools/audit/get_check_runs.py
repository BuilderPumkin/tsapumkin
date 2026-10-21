import urllib.request
import json
import subprocess

proc = subprocess.Popen(['git', 'credential', 'fill'], stdin=subprocess.PIPE, stdout=subprocess.PIPE, text=True)
out, _ = proc.communicate('protocol=https\nhost=github.com\n')
token = ''
for line in out.splitlines():
    if line.startswith('password='):
        token = line.split('=', 1)[1]

commits = [
    ("feature/web-gateway-integration", "a5c3e18f3dd432dac534531edff88da1f189902c"),
    ("feature/math-api", "6e45c3b4f01f09e495b3f7e68d77adbebd8a2e0e")
]

for branch, sha in commits:
    print(f"\n==========================================")
    print(f"BRANCH: {branch} | COMMIT: {sha}")
    print(f"==========================================")
    url = f"https://api.github.com/repos/BuilderPumkin/tsapumkin/commits/{sha}/check-runs"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0', 'Authorization': f'Bearer {token}'})
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print("Total check runs:", data.get('total_count'))
            for cr in data.get('check_runs', []):
                print(f"Check: {cr['name']} | Status: {cr['status']} | Conclusion: {cr['conclusion']}")
                print(f"  App: {cr.get('app', {}).get('name')}")
                print(f"  Details URL: {cr.get('details_url')}")
    except Exception as e:
        print('Error:', e)
