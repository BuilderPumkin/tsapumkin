import urllib.request
import json
import subprocess

proc = subprocess.Popen(['git', 'credential', 'fill'], stdin=subprocess.PIPE, stdout=subprocess.PIPE, text=True)
out, _ = proc.communicate('protocol=https\nhost=github.com\n')
token = ''
for line in out.splitlines():
    if line.startswith('password='):
        token = line.split('=', 1)[1]

url = 'https://api.github.com/repos/BuilderPumkin/tsapumkin/pulls/2'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0', 'Authorization': f'Bearer {token}'})
try:
    with urllib.request.urlopen(req) as resp:
        pr = json.loads(resp.read().decode('utf-8'))
        print("Number:", pr['number'])
        print("Title:", pr['title'])
        print("Base:", pr['base']['ref'])
        print("Head:", pr['head']['ref'])
        print("Commits:", pr.get('commits'))
        print("Changed files:", pr.get('changed_files'))
        print("State:", pr['state'])
        print("Merged:", pr.get('merged'))
        print("Created at:", pr.get('created_at'))
        print("Closed at:", pr.get('closed_at'))
        print("HTML URL:", pr['html_url'])
except Exception as e:
    print('Error:', e)
