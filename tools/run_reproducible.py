# tools/run_reproducible.py
import subprocess, sys, hashlib

sys.stdout.reconfigure(encoding='utf-8')

def run_once(output_file):
    cmd = [r"C:\Users\ADMIN\AppData\Local\Programs\Python\Python313\python.exe", "tools/classify_questions.py"]
    res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8')
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(res.stdout)
    return res.stdout

out1 = run_once("C:/tmp/run1.txt")
out2 = run_once("C:/tmp/run2.txt")

with open("C:/tmp/run1.txt", "rb") as f1, open("C:/tmp/run2.txt", "rb") as f2:
    b1 = f1.read()
    b2 = f2.read()
    h1 = hashlib.sha256(b1).hexdigest()
    h2 = hashlib.sha256(b2).hexdigest()

print(f"Diff output: {'TẬP TIN GIỐNG NHAU 100% (KHÔNG CÓ KHÁC BIỆT)' if b1 == b2 else 'CÓ KHÁC BIỆT'}")
print(f"SHA256 (run1.txt): {h1}")
print(f"SHA256 (run2.txt): {h2}")
