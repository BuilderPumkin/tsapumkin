import re
import random
import sys

sys.stdout.reconfigure(encoding="utf-8")

file_path = "pumkin-math-api/tests/golden/test_latex_handwritten_ground_truth.py"
with open(file_path, encoding="utf-8") as f:
    content = f.read()

# Pattern for test methods
pattern = re.compile(
    r"def (test_[a-zA-Z0-9_]+)\(self\):\s+"
    r"(?:r?\"\"\"(.*?)\"\"\"\s+)?"
    r".*?parse_latex\((r?\".*?\"|r?'.*?'|[a-zA-Z0-9_]+)\)",
    re.DOTALL
)

matches = pattern.findall(content)
cases = []
for test_name, doc, raw_arg in matches:
    arg_clean = raw_arg.strip()
    if arg_clean.startswith(('r"', 'r\'', '"', '\'')):
        # string literal
        latex = arg_clean.strip("r\"'")
    else:
        # variable like expr_latex
        # search backward for definition
        m_var = re.search(rf"{arg_clean}\s*=\s*(r?\".*?\"|r?'.*?')", content)
        if m_var:
            latex = m_var.group(1).strip("r\"'")
        else:
            latex = arg_clean

    cases.append({
        "id": test_name,
        "latex": latex,
        "doc": doc.strip() if doc else "",
    })

print(f"Total handwritten cases extracted: {len(cases)}")

random.seed(42)
sampled = random.sample(cases, min(30, len(cases)))

print("\n| STT | Test ID | LaTeX | Kỳ vọng | Nguồn kỳ vọng |")
print("|---|---|---|---|---|")
for idx, c in enumerate(sampled, 1):
    print(f"| {idx} | `{c['id']}` | `{c['latex']}` | {c['doc']} | Người viết tay (Ground Truth) |")
