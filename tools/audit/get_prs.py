import urllib.request
import json
import subprocess

proc = subprocess.Popen(['git', 'credential', 'fill'], stdin=subprocess.PIPE, stdout=subprocess.PIPE, text=True)
out, _ = proc.communicate('protocol=https\nhost=github.com\n')
token = ''
for line in out.splitlines():
    if line.startswith('password='):
        token = line.split('=', 1)[1]

url = 'https://api.github.com/repos/BuilderPumkin/tsapumkin/pulls?state=all'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0', 'Authorization': f'Bearer {token}'})
try:
    with urllib.request.urlopen(req) as resp:
        prs = json.loads(resp.read().decode('utf-8'))
        for pr in prs:
            print(f"PR #{pr['number']}: {pr['title']}")
            print(f"  Base: {pr['base']['ref']} | Head: {pr['head']['ref']}")
            print(f"  Commits: {pr.get('commits')} | Changed files: {pr.get('changed_files')}")
            print(f"  State: {pr['state']} | Merged: {pr.get('merged')}")
            print(f"  HTML URL: {pr['html_url']}")
except Exception as e:
    print('Error:', e)
