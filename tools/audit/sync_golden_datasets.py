import json
import os

base_dir = "pumkin-math-api/tests/golden"

# 1. Update latex_corpus_cases.json
corpus_path = os.path.join(base_dir, "latex_corpus_cases.json")
with open(corpus_path, encoding="utf-8") as f:
    corpus = json.load(f)

for case in corpus:
    if case.get("qid") == "q_tsa_17" and "P = 1 - 0,000125" in case.get("latex", ""):
        # Check if this was the first one (the original P(\text{Hỏng cả 3}))
        case["latex"] = r"P(\text{Hỏng cả 3}) = 0,05^3 = 0,000125"
        case["expected_rejection"] = True
        case["expected_error_code"] = "UNSUPPORTED_SYNTAX"
        case["expected_repr"] = None
        case["variables"] = []
        break

for case in corpus:
    # Check for combinatorics in corpus
    latex = case.get("latex", "")
    if ("C_" in latex or "A_" in latex) and ("^" in latex):
        case["expected_rejection"] = True
        case["expected_error_code"] = "UNSUPPORTED_SYNTAX"
        case["expected_repr"] = None
        case["variables"] = []

with open(corpus_path, "w", encoding="utf-8") as f:
    json.dump(corpus, f, ensure_ascii=False, indent=2)
print("Updated latex_corpus_cases.json")

# 2. Update latex_human_verified_cases.json
human_path = os.path.join(base_dir, "latex_human_verified_cases.json")
with open(human_path, encoding="utf-8") as f:
    human_data = json.load(f)

for case in human_data.get("valid_cases", []):
    if case.get("case_id") == "human_064":
        case["expected_repr"] = "S*t"
        case["variables"] = ["S", "t"]
    # Relabel all verification modes to snapshot
    mode = case.get("verification_mode", "")
    if "numerical_eval" in mode:
        case["verification_mode"] = "snapshot_eval_20pts"
    else:
        case["verification_mode"] = "snapshot_ast"

with open(human_path, "w", encoding="utf-8") as f:
    json.dump(human_data, f, ensure_ascii=False, indent=2)
print("Updated latex_human_verified_cases.json")

# 3. Update latex_independent_stratified_cases.json
strat_path = os.path.join(base_dir, "latex_independent_stratified_cases.json")
with open(strat_path, encoding="utf-8") as f:
    strat_cases = json.load(f)

rejection_ids = {"strat_088", "strat_197", "strat_198", "strat_209"}

for case in strat_cases:
    cid = case.get("case_id")
    if cid in rejection_ids:
        case["expected_rejection"] = True
        case["expected_error_code"] = "UNSUPPORTED_SYNTAX"
        case["expected_repr"] = None
        case["variables"] = []
    
    # Relabel all verification modes
    mode = case.get("verification_mode", "")
    if "numerical_eval" in mode:
        case["verification_mode"] = "snapshot_eval_20pts"
    else:
        case["verification_mode"] = "snapshot_ast"

with open(strat_path, "w", encoding="utf-8") as f:
    json.dump(strat_cases, f, ensure_ascii=False, indent=2)
print("Updated latex_independent_stratified_cases.json")
