#!/usr/bin/env python3
"""
LaTeX Corpus Extractor & Comprehensive Benchmark Engine for Pumkin Math API
Extracts all real LaTeX mathematical expressions from pumkin3/data/questions/all.json,
runs the handcrafted parser on the entire corpus, and produces:
- Parse success rate (% and counts) overall, by field, and by SPEC category
- Breakdown by error_code
- Top 20 ROOT CAUSE unsupported constructs table
- Detailed root cause analysis of other_non_standard_syntax (with 10 question_id samples)
- Question-level parse rate (% of questions where all question_text snippets parse successfully)
- 10 Suspicious / subtle interpretation cases sampled from successful parses (seed=42)
- Deterministic output saved to docs/latex_corpus_benchmark.json
"""

import hashlib
import json
import os
import random
import re
import sys
from collections import Counter, defaultdict
from typing import Any

# Ensure UTF-8 output on Windows console
if sys.platform == "win32" and sys.stdout and hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

# Add pumkin-math-api and workspace root to Python path
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, ".."))
sys.path.insert(0, os.path.join(PROJECT_ROOT, "pumkin-math-api"))
sys.path.insert(0, PROJECT_ROOT)

from app.latex import ParseResult, parse_latex
from tools.classify_questions import classify_question_v2

# Canonical dataset path pinned to pumkin3/data/questions/all.json
CANONICAL_QUESTIONS_PATH = os.path.join(PROJECT_ROOT, "pumkin3", "data", "questions", "all.json")
EXPECTED_NORMALIZED_SHA256 = "ced7e7ffe5038be54f8e4867a881962aa24dd843d9f1713a51d9ca4dab01d560"
EXPECTED_QUESTION_COUNT = 553


def verify_canonical_data_source() -> tuple[str, str, int]:
    """Verifies that the canonical questions file exists and matches the verified hash and count."""
    if not os.path.exists(CANONICAL_QUESTIONS_PATH):
        raise FileNotFoundError(f"Canonical questions file not found at: {CANONICAL_QUESTIONS_PATH}")

    with open(CANONICAL_QUESTIONS_PATH, "rb") as f:
        raw_bytes = f.read()

    norm_bytes = raw_bytes.replace(b"\r\n", b"\n")
    sha256_hash = hashlib.sha256(norm_bytes).hexdigest()

    data = json.loads(norm_bytes.decode("utf-8"))
    count = len(data)

    if count != EXPECTED_QUESTION_COUNT:
        raise ValueError(
            f"Question count mismatch: expected {EXPECTED_QUESTION_COUNT}, got {count}"
        )
    if sha256_hash != EXPECTED_NORMALIZED_SHA256:
        raise ValueError(
            f"Normalized SHA-256 mismatch:\n  Expected: {EXPECTED_NORMALIZED_SHA256}\n  Got:      {sha256_hash}"
        )

    return CANONICAL_QUESTIONS_PATH, sha256_hash, count


def extract_raw_math_snippets(text: str) -> list[str]:
    """
    Extracts LaTeX snippets from a raw text string respecting delimiter precedence:
    $$...$$ > \\[...\\] > \\(...\\) > $...$.
    """
    if not text:
        return []

    snippets: list[str] = []
    p_dollar2 = re.compile(r"\$\$(.*?)\$\$", re.DOTALL)
    p_bracket = re.compile(r"\\\[(.*?)\\\]", re.DOTALL)
    p_paren = re.compile(r"\\\((.*?)\\\)", re.DOTALL)
    p_dollar1 = re.compile(r"(?<!\\)\$(?!\$)(.*?)(?<!\\)\$", re.DOTALL)

    for m in p_dollar2.finditer(text):
        s = m.group(1).strip()
        if s:
            snippets.append(s)
    cleaned = p_dollar2.sub("", text)

    for m in p_bracket.finditer(cleaned):
        s = m.group(1).strip()
        if s:
            snippets.append(s)
    cleaned = p_bracket.sub("", cleaned)

    for m in p_paren.finditer(cleaned):
        s = m.group(1).strip()
        if s:
            snippets.append(s)
    cleaned = p_paren.sub("", cleaned)

    for m in p_dollar1.finditer(cleaned):
        s = m.group(1).strip()
        if s:
            snippets.append(s)

    return snippets


def determine_root_cause(snippet: str, res: ParseResult) -> str:
    r"""
    Identifies the EXACT root cause of a parse failure.
    Ensures supported commands (\frac, \pi, \sqrt, \cdot, etc.) are never falsely blamed.
    """
    msg = res.reason_vi or ""
    code = res.error_code or "UNKNOWN"

    # 1. Check for specific unsupported LaTeX commands in the error reason
    m_unsupp = re.search(r"Lệnh LaTeX '(\\[a-zA-Z]+)'", msg)
    if m_unsupp:
        return m_unsupp.group(1)

    # 2. Check for environments (\begin{...})
    m_env = re.search(r"\\begin\{([a-zA-Z]+)\}", snippet)
    if m_env:
        return f"\\begin{{{m_env.group(1)}}}"

    # 3. Check for coordinates or intervals containing semicolons: (1; 2; 3) or [a; b)
    if ";" in snippet:
        return "semicolon_coordinate_or_interval"

    # 4. Check for comma-separated lists, vectors, or point coordinates: O(0, 0), a_1 = 5, a_2 = 13
    if "," in snippet and ("(" in snippet or "=" in snippet):
        return "comma_list_or_coordinate_tuple"

    # 5. Check for Vietnamese text mistakenly placed inside math delimiters
    if re.search(r"[\u00C0-\u1EF9]", snippet):
        return "vietnamese_text_in_math"

    # 6. Check for unclosed / unbalanced delimiters in the source question
    if snippet.count("(") != snippet.count(")"):
        return "unclosed_parentheses_in_source"
    if snippet.count("{") != snippet.count("}"):
        return "unclosed_braces_in_source"
    if snippet.count("[") != snippet.count("]"):
        return "unclosed_brackets_in_source"
    if snippet.count("|") % 2 != 0:
        return "unclosed_pipe_delimiter"

    # 7. Check for percentage symbol inside math delimiter
    if r"\%" in snippet or "%" in snippet:
        return "percentage_symbol_in_math"

    # 8. Known mathematical symbols not supported in v1
    for sym in [
        r"\iff",
        r"\implies",
        r"\Rightarrow",
        r"\Leftrightarrow",
        r"\in",
        r"\notin",
        r"\cap",
        r"\cup",
        r"\subset",
        r"\mathbb",
        r"\approx",
        r"\pm",
        r"\mp",
        r"\dots",
        r"\ldots",
        r"\cdots",
        r"\parallel",
        r"\perp",
        r"\equiv",
        r"\sim",
        r"\det",
        r"\forall",
        r"\exists",
    ]:
        if sym in snippet:
            return sym

    # 9. Resource limits exceeded
    if code == "RESOURCE_LIMIT_EXCEEDED":
        return "resource_limit_exceeded"

    # 10. Fallback: structured syntax error message
    if code == "EMPTY_INPUT" or code == "EMPTY_EXPRESSION":
        return "empty_expression"

    return f"syntax_error: {msg[:50]}"


def run_benchmark() -> dict[str, Any]:
    q_file, sha256_hash, q_count = verify_canonical_data_source()
    print("=" * 70)
    print("PUMKIN MATH API - LATEX CORPUS BENCHMARK (PROMPT 4)")
    print(f"Canonical Data Source: {q_file}")
    print(f"Normalized SHA-256:    {sha256_hash}")
    print(f"Total Questions:       {q_count}")
    print("=" * 70)

    with open(q_file, "r", encoding="utf-8") as f:
        questions = json.load(f)

    # 1. Extraction: collect all snippets with metadata
    all_snippets: list[dict[str, Any]] = []
    question_stem_snippets: dict[str, list[str]] = defaultdict(list)
    question_categories: dict[str, str] = {}

    for q in questions:
        qid = q.get("id", "unknown")
        cat = classify_question_v2(q)
        question_categories[qid] = cat

        # Field: question_text
        qt = q.get("question_text") or q.get("question") or ""
        for s in extract_raw_math_snippets(qt):
            all_snippets.append({"qid": qid, "field": "question_text", "category": cat, "snippet": s})
            question_stem_snippets[qid].append(s)

        # Field: options
        for opt in (q.get("options") or []):
            if isinstance(opt, str):
                for s in extract_raw_math_snippets(opt):
                    all_snippets.append({"qid": qid, "field": "options", "category": cat, "snippet": s})

        # Field: explanation
        exp = q.get("explanation") or q.get("explanation_vi") or ""
        for s in extract_raw_math_snippets(exp):
            all_snippets.append({"qid": qid, "field": "explanation", "category": cat, "snippet": s})

    total_occurrences = len(all_snippets)

    # Group by unique snippet string
    unique_snippets_map: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for item in all_snippets:
        unique_snippets_map[item["snippet"]].append(item)

    total_unique = len(unique_snippets_map)

    # 2. Parsing and Evaluation
    parsed_cache: dict[str, ParseResult] = {}
    for snippet in unique_snippets_map:
        parsed_cache[snippet] = parse_latex(snippet)

    # Overall Success Metrics
    unique_success_count = sum(1 for res in parsed_cache.values() if res.is_success)
    unique_failed_count = total_unique - unique_success_count
    unique_success_rate = (unique_success_count / total_unique) * 100.0

    occurrence_success_count = sum(
        1 for item in all_snippets if parsed_cache[item["snippet"]].is_success
    )
    occurrence_success_rate = (occurrence_success_count / total_occurrences) * 100.0

    # 3. Breakdown by Field
    field_stats: dict[str, dict[str, Any]] = {}
    for fld in ("question_text", "options", "explanation"):
        fld_items = [it for it in all_snippets if it["field"] == fld]
        fld_total = len(fld_items)
        fld_succ = sum(1 for it in fld_items if parsed_cache[it["snippet"]].is_success)
        fld_rate = (fld_succ / fld_total * 100.0) if fld_total > 0 else 0.0
        field_stats[fld] = {
            "total_occurrences": fld_total,
            "success_occurrences": fld_succ,
            "failed_occurrences": fld_total - fld_succ,
            "success_rate_percent": round(fld_rate, 2),
        }

    # 4. Breakdown by SPEC Category
    cat_stats: dict[str, dict[str, Any]] = {}
    all_cats = sorted(set(question_categories.values()))
    for cat in all_cats:
        cat_items = [it for it in all_snippets if it["category"] == cat]
        cat_total = len(cat_items)
        cat_succ = sum(1 for it in cat_items if parsed_cache[it["snippet"]].is_success)
        cat_rate = (cat_succ / cat_total * 100.0) if cat_total > 0 else 0.0
        cat_stats[cat] = {
            "total_occurrences": cat_total,
            "success_occurrences": cat_succ,
            "failed_occurrences": cat_total - cat_succ,
            "success_rate_percent": round(cat_rate, 2),
        }

    # 5. Breakdown by Error Code
    error_code_counter: Counter = Counter()
    for item in all_snippets:
        res = parsed_cache[item["snippet"]]
        if not res.is_success:
            error_code_counter[res.error_code or "UNKNOWN"] += 1

    error_code_stats = dict(error_code_counter.most_common())

    # 6. Top 20 Root Cause Unsupported Constructs
    root_cause_counter: Counter = Counter()
    for item in all_snippets:
        snippet = item["snippet"]
        res = parsed_cache[snippet]
        if not res.is_success:
            rc = determine_root_cause(snippet, res)
            root_cause_counter[rc] += 1

    top_20_root_causes = []
    total_failures = total_occurrences - occurrence_success_count
    for rank, (cause, cnt) in enumerate(root_cause_counter.most_common(20), start=1):
        top_20_root_causes.append({
            "rank": rank,
            "root_cause": cause,
            "occurrence_count": cnt,
            "percent_of_failures": round((cnt / total_failures * 100.0), 2) if total_failures > 0 else 0.0,
        })

    # 7. Detailed Analysis of "other_non_standard_syntax"
    # Extract 10 concrete samples from comma lists, point coordinates, percentages
    other_syntax_samples: list[dict[str, Any]] = []
    seen_other_snippets = set()
    for item in all_snippets:
        s = item["snippet"]
        res = parsed_cache[s]
        if not res.is_success:
            rc = determine_root_cause(s, res)
            if rc in ("comma_list_or_coordinate_tuple", "percentage_symbol_in_math") and s not in seen_other_snippets:
                seen_other_snippets.add(s)
                other_syntax_samples.append({
                    "question_id": item["qid"],
                    "category": item["category"],
                    "latex": s,
                    "error_code": res.error_code,
                    "reason_vi": res.reason_vi,
                    "syntax_pattern": "Point coordinate tuple O(x,y,z) or comma-separated equation list",
                })
                if len(other_syntax_samples) >= 10:
                    break

    # 8. Question-Level Parse Rate (all question_text snippets parsable)
    question_level_parsable: dict[str, bool] = {}
    cat_question_totals: Counter = Counter()
    cat_question_parsable: Counter = Counter()

    for qid, cat in question_categories.items():
        stems = question_stem_snippets.get(qid, [])
        cat_question_totals[cat] += 1
        if not stems:
            # Questions without math delimiters in stem
            question_level_parsable[qid] = True
            cat_question_parsable[cat] += 1
        else:
            all_ok = all(parsed_cache[s].is_success for s in stems)
            question_level_parsable[qid] = all_ok
            if all_ok:
                cat_question_parsable[cat] += 1

    total_stem_parsable = sum(1 for ok in question_level_parsable.values() if ok)
    question_stem_success_rate = (total_stem_parsable / q_count) * 100.0

    question_rate_by_cat: dict[str, dict[str, Any]] = {}
    for cat in all_cats:
        tot = cat_question_totals[cat]
        par = cat_question_parsable[cat]
        rate = (par / tot * 100.0) if tot > 0 else 0.0
        question_rate_by_cat[cat] = {
            "total_questions": tot,
            "fully_parsable_stem_questions": par,
            "stem_parse_rate_percent": round(rate, 2),
        }

    # 9. Ten Suspicious / Subtle Interpretations Sampled with seed=42
    random.seed(42)
    successful_unique_snippets = [s for s, res in parsed_cache.items() if res.is_success]
    sampled_120 = random.sample(successful_unique_snippets, min(120, len(successful_unique_snippets)))

    suspicious_candidates: list[dict[str, Any]] = []
    for s in sampled_120:
        res = parsed_cache[s]
        items = unique_snippets_map[s]
        qid = items[0]["qid"]
        expr_str = str(res.expr)
        warn_codes = [w.code for w in res.warnings]

        # Case 1: Trig argument without parens
        if "WARN_AMBIGUOUS_TRIG_ARGUMENT" in warn_codes and len(suspicious_candidates) < 10:
            suspicious_candidates.append({
                "question_id": qid,
                "latex": s,
                "parsed_expr": expr_str,
                "intended_meaning": "Hàm lượng giác với đối số đơn thức (ví dụ sin(2x) thay vì sin(2)*x)",
                "rationale": "Parser tự động gộp đơn thức làm góc lượng giác; đã phát cảnh báo WARN_AMBIGUOUS_TRIG_ARGUMENT.",
            })

        # Case 2: Unknown function call
        if "WARN_IMPLICIT_FUNCTION_CALL" in warn_codes and len(suspicious_candidates) < 10:
            suspicious_candidates.append({
                "question_id": qid,
                "latex": s,
                "parsed_expr": expr_str,
                "intended_meaning": "Hàm toán học trừu tượng f(x) hoặc g(x)",
                "rationale": "Parser tạo SymPy Function thay vì phép nhân ngầm; đã phát cảnh báo WARN_IMPLICIT_FUNCTION_CALL.",
            })

        # Case 3: Stripped geometry label
        if "WARN_STRIPPED_LABEL_PREFIX" in warn_codes and len(suspicious_candidates) < 10:
            lbl = res.metadata.get("stripped_label")
            suspicious_candidates.append({
                "question_id": qid,
                "latex": s,
                "parsed_expr": expr_str,
                "intended_meaning": f"Phương trình hình học của đường thẳng/mặt phẳng có tiền tố nhãn {lbl}:",
                "rationale": "Tiền tố hình học bị bóc tách khỏi phương trình; lưu trong metadata và cảnh báo WARN_STRIPPED_LABEL_PREFIX.",
            })

        # Case 4: Stripped physical unit
        if "WARN_STRIPPED_PHYSICAL_UNIT" in warn_codes and len(suspicious_candidates) < 10:
            unit = res.metadata.get("stripped_unit")
            suspicious_candidates.append({
                "question_id": qid,
                "latex": s,
                "parsed_expr": expr_str,
                "intended_meaning": f"Biểu thức mang đơn vị đo lường vật lý ({unit})",
                "rationale": "Đơn vị được bóc tách an toàn để phục vụ giải toán đại số thuần túy; lưu trong metadata['stripped_unit'].",
            })

        # Case 5: Decimal comma converted
        if "WARN_DECIMAL_COMMA_USED" in warn_codes and len(suspicious_candidates) < 10:
            suspicious_candidates.append({
                "question_id": qid,
                "latex": s,
                "parsed_expr": expr_str,
                "intended_meaning": "Số thập phân viết theo quy ước Việt Nam bằng dấu phẩy",
                "rationale": "Đã chuẩn hóa sang Rational hoặc float dấu chấm; cảnh báo WARN_DECIMAL_COMMA_USED.",
            })

        # Case 6: Power implicit multiplication
        if "WARN_POWER_IMPLICIT_MUL" in warn_codes and len(suspicious_candidates) < 10:
            suspicious_candidates.append({
                "question_id": qid,
                "latex": s,
                "parsed_expr": expr_str,
                "intended_meaning": "Lũy thừa nhân ngầm với biến tiếp theo: (2^x)*y",
                "rationale": "Không nhầm lẫn với số mũ tích 2^{xy}; cảnh báo WARN_POWER_IMPLICIT_MUL.",
            })

        # Case 7: Logarithm scope addition
        if "WARN_AMBIGUOUS_LOG_SCOPE" in warn_codes and len(suspicious_candidates) < 10:
            suspicious_candidates.append({
                "question_id": qid,
                "latex": s,
                "parsed_expr": expr_str,
                "intended_meaning": "Phép cộng sau biểu thức logarit: (log_a x) + b",
                "rationale": "Quy tắc độ ưu tiên kết thúc đối số log trước dấu cộng; cảnh báo WARN_AMBIGUOUS_LOG_SCOPE.",
            })

        # Case 8: Logarithm power argument
        if "WARN_AMBIGUOUS_LOG_ARGUMENT" in warn_codes and len(suspicious_candidates) < 10:
            suspicious_candidates.append({
                "question_id": qid,
                "latex": s,
                "parsed_expr": expr_str,
                "intended_meaning": "Đối số logarit là một lũy thừa: ln(x^2)",
                "rationale": "Lũy thừa gắn với biến x trước hàm ln; cảnh báo WARN_AMBIGUOUS_LOG_ARGUMENT.",
            })

        # Case 9: Unbraced fraction multiplication
        if "WARN_AMBIGUOUS_FRACTION_MULTIPLICATION" in warn_codes and len(suspicious_candidates) < 10:
            suspicious_candidates.append({
                "question_id": qid,
                "latex": s,
                "parsed_expr": expr_str,
                "intended_meaning": "Phân số không ngoặc nhân với biến: (1/2)*x",
                "rationale": "Phân số đơn ký tự \\frac12 được đóng gói trước khi nhân x; cảnh báo WARN_AMBIGUOUS_FRACTION_MULTIPLICATION.",
            })

    # Fill remaining slots up to 10 if needed from other interesting expressions
    if len(suspicious_candidates) < 10:
        for s in sampled_120:
            res = parsed_cache[s]
            items = unique_snippets_map[s]
            qid = items[0]["qid"]
            expr_str = str(res.expr)
            if any(cand["latex"] == s for cand in suspicious_candidates):
                continue
            if len(res.constraints) > 0 and len(suspicious_candidates) < 10:
                suspicious_candidates.append({
                    "question_id": qid,
                    "latex": s,
                    "parsed_expr": expr_str,
                    "intended_meaning": "Biểu thức có điều kiện xác định biên bắt buộc (mẫu != 0, log > 0, căn >= 0)",
                    "rationale": f"Parser trích xuất thành công {len(res.constraints)} điều kiện xác định toán học.",
                })

    report = {
        "metadata": {
            "canonical_data_source": q_file,
            "normalized_sha256": sha256_hash,
            "total_questions": q_count,
            "total_occurrences": total_occurrences,
            "total_unique_snippets": total_unique,
            "random_seed": 42,
        },
        "overall_metrics": {
            "unique_snippets": {
                "total": total_unique,
                "success": unique_success_count,
                "failed": unique_failed_count,
                "success_rate_percent": round(unique_success_rate, 2),
            },
            "occurrences": {
                "total": total_occurrences,
                "success": occurrence_success_count,
                "failed": total_occurrences - occurrence_success_count,
                "success_rate_percent": round(occurrence_success_rate, 2),
            },
            "question_stem_success": {
                "total_questions": q_count,
                "fully_parsable_stem_questions": total_stem_parsable,
                "success_rate_percent": round(question_stem_success_rate, 2),
            },
        },
        "breakdown_by_field": field_stats,
        "breakdown_by_category": cat_stats,
        "breakdown_by_error_code": error_code_stats,
        "top_20_root_causes": top_20_root_causes,
        "other_non_standard_syntax_samples": other_syntax_samples,
        "question_stem_rate_by_category": question_rate_by_cat,
        "ten_suspicious_interpretation_cases": suspicious_candidates[:10],
    }

    # Write out deterministic JSON benchmark report
    benchmark_output_path = os.path.join(PROJECT_ROOT, "docs", "latex_corpus_benchmark.json")
    with open(benchmark_output_path, "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2, sort_keys=True)

    with open(benchmark_output_path, "rb") as f:
        bench_sha256 = hashlib.sha256(f.read()).hexdigest()

    print("\nBenchmark completed successfully!")
    print(f"Report written to: {benchmark_output_path}")
    print(f"Report SHA-256:    {bench_sha256}")
    print(f"Unique Parse Rate: {unique_success_rate:.2f}% ({unique_success_count}/{total_unique})")
    print(f"Stem Parse Rate:   {question_stem_success_rate:.2f}% ({total_stem_parsable}/{q_count})")
    print("=" * 70)

    return report


if __name__ == "__main__":
    run_benchmark()
