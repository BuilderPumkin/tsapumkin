import hashlib
import os
import sys

sys.stdout.reconfigure(encoding="utf-8")

paths = [
    r"c:\Users\ADMIN\Downloads\hoctap\data\questions\all.json",
    r"c:\Users\ADMIN\Downloads\hoctap\PUMKIN2\public\data\questions\all.json",
    r"c:\Users\ADMIN\Downloads\hoctap\PUMKIN2\pumkin3\data\questions\all.json",
    r"c:\Users\ADMIN\Downloads\hoctap\PUMKINTSA\public\data\questions\all.json",
]

def sha256_raw(path):
    with open(path, "rb") as f:
        return hashlib.sha256(f.read()).hexdigest()

def sha256_crlf_normalized(path):
    with open(path, "rb") as f:
        content = f.read()
    # Normalize CRLF and LF to LF
    norm = content.replace(b"\r\n", b"\n")
    return hashlib.sha256(norm).hexdigest()

def count_questions(path):
    import json
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return len(data)

print(f"{'Đường dẫn tệp':65} | {'Số câu':8} | {'SHA256 thô':64} | {'SHA256 chuẩn hóa CRLF'}")
print("-" * 180)
for p in paths:
    if os.path.exists(p):
        cnt = count_questions(p)
        h_raw = sha256_raw(p)
        h_norm = sha256_crlf_normalized(p)
        print(f"{p:65} | {cnt:8} | {h_raw} | {h_norm}")
