#!/usr/bin/env python3
"""
LaTeX Corpus Extractor & Benchmark Tool for Pumkin Math API
Extracts all real LaTeX mathematical expressions from data/questions/all.json,
runs the handcrafted parser on the entire corpus, and produces:
- Parse success rate (% and counts)
- Top 20 most frequent unsupported LaTeX constructs (with counts)
- 10 suspicious / misparsed / edge-case samples from the bank
"""

import json
import os
import re
import sys
from collections import Counter
from dataclasses import dataclass
from typing import Any

# Add pumkin-math-api to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "pumkin-math-api"))
from app.latex import parse_latex, ParseResult

# Ensure UTF-8 output on Windows console
if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

POSSIBLE_PATHS = [
    "data/questions/all.json",
    "public/data/questions/all.json",
    "../data/questions/all.json",
    "pumkin3/data/questions/all.json",
    os.path.join(os.path.dirname(__file__), "..", "public", "data", "questions", "all.json"),
    os.path.join(os.path.dirname(__file__), "..", "..", "data", "questions", "all.json"),
]


def find_questions_file() -> str:
    for p in POSSIBLE_PATHS:
        if os.path.exists(p):
            return os.path.abspath(p)
    raise FileNotFoundError(
        "Could not locate data/questions/all.json in any expected workspace path."
    )


def extract_latex_snippets(data: list[dict[str, Any]]) -> list[tuple[str, str]]:
    """
    Extracts (question_id, snippet) pairs from all text fields in questions.
    Respects delimiter priorities ($$ before $, \\[ before \\( ).
    """
    snippets: list[tuple[str, str]] = []

    double_dollar_pattern = re.compile(r"\$\$(.*?)\$\$", re.DOTALL)
    display_pattern = re.compile(r"\\\[(.*?)\\\]", re.DOTALL)
    inline_pattern = re.compile(r"\\\((.*?)\\\)", re.DOTALL)
    dollar_pattern = re.compile(r"(?<!\\)\$(?!\$)(.*?)(?<!\\)\$", re.DOTALL)

    for q in data:
        qid = q.get("id", "unknown")
        texts: list[str] = []

        for field in ("question", "question_text", "cloze_text", "explanation", "explanation_vi", "correct_answer"):
            v = q.get(field)
            if isinstance(v, str):
                texts.append(v)

        for opt in (q.get("options") or []):
            if isinstance(opt, str):
                texts.append(opt)

        for it in (q.get("items") or []):
            if isinstance(it, dict):
                for val in it.values():
                    if isinstance(val, str):
                        texts.append(val)
            elif isinstance(it, str):
                texts.append(it)

        for text in texts:
            if not text:
                continue

            # 1. Double dollar $$ ... $$
            for m in double_dollar_pattern.finditer(text):
                s = m.group(1).strip()
                if s:
                    snippets.append((qid, s))
            cleaned = double_dollar_pattern.sub("", text)

            # 2. Display LaTeX \[ ... \]
            for m in display_pattern.finditer(cleaned):
                s = m.group(1).strip()
                if s:
                    snippets.append((qid, s))
            cleaned = display_pattern.sub("", cleaned)

            # 3. Inline LaTeX \( ... \)
            for m in inline_pattern.finditer(cleaned):
                s = m.group(1).strip()
                if s:
                    snippets.append((qid, s))
            cleaned = inline_pattern.sub("", cleaned)

            # 4. Single dollar $ ... $
            for m in dollar_pattern.finditer(cleaned):
                s = m.group(1).strip()
                if s:
                    snippets.append((qid, s))

    return snippets


def run_benchmark() -> dict[str, Any]:
    q_file = find_questions_file()
    print(f"Loading questions from: {q_file}")
    with open(q_file, "r", encoding="utf-8") as f:
        questions = json.load(f)

    all_snippets = extract_latex_snippets(questions)
    total_raw = len(all_snippets)

    # Group by unique snippet
    unique_snippets: dict[str, list[str]] = {}
    for qid, s in all_snippets:
        if s not in unique_snippets:
            unique_snippets[s] = []
        unique_snippets[s].append(qid)

    total_unique = len(unique_snippets)
    print(f"Total extracted snippets: {total_raw}")
    print(f"Total unique snippets: {total_unique}")

    success_snippets: list[tuple[str, ParseResult]] = []
    failed_snippets: list[tuple[str, ParseResult]] = []

    unsupported_constructs_counter: Counter = Counter()
    unsupported_reasons_counter: Counter = Counter()

    cmd_regex = re.compile(r"\\[a-zA-Z]+")

    for snippet, qids in unique_snippets.items():
        res = parse_latex(snippet)
        if res.is_success:
            success_snippets.append((snippet, res))
        else:
            failed_snippets.append((snippet, res))
            unsupported_reasons_counter[res.error_code or "UNKNOWN"] += len(qids)

            # Identify unsupported commands
            cmds = cmd_regex.findall(snippet)
            if cmds:
                for c in set(cmds):
                    unsupported_constructs_counter[c] += len(qids)
            else:
                # Syntax error or non-command structure
                if "{" in snippet or "}" in snippet:
                    unsupported_constructs_counter["unmatched_braces"] += len(qids)
                elif re.search(r"[\u00C0-\u1EF9]", snippet):
                    unsupported_constructs_counter["vietnamese_words_in_math"] += len(qids)
                elif "&" in snippet:
                    unsupported_constructs_counter["tabular_alignment_&"] += len(qids)
                else:
                    unsupported_constructs_counter["other_non_standard_syntax"] += len(qids)

    success_rate = (len(success_snippets) / total_unique) * 100.0

    # Top 20 unsupported constructs
    top_20_unsupported = unsupported_constructs_counter.most_common(20)

    # Detect 10 suspicious / edge cases
    suspicious_cases: list[dict[str, Any]] = []

    for snippet, res in failed_snippets:
        qids = unique_snippets[snippet]
        # 1. Vietnamese words inside math delimiters
        if re.search(r"[\u00C0-\u1EF9]", snippet) and len(suspicious_cases) < 3:
            suspicious_cases.append({
                "type": "VIETNAMESE_WORDS_IN_MATH_DELIMITER",
                "snippet": snippet,
                "qids": qids,
                "error_code": res.error_code,
                "reason_vi": res.reason_vi,
                "note": "Tác giả đề đặt cả từ tiếng Việt hoặc câu văn vào trong dấu math $...$ hoặc \\(...\\)."
            })

        # 2. Typos in LaTeX commands
        if re.search(r"\\(farc|frca|sqtr|lamda|infin|dotts)", snippet) and len(suspicious_cases) < 5:
            suspicious_cases.append({
                "type": "LATEX_COMMAND_TYPO",
                "snippet": snippet,
                "qids": qids,
                "error_code": res.error_code,
                "reason_vi": res.reason_vi,
                "note": "Lỗi chính tả lệnh LaTeX trong dữ liệu gốc của ngân hàng đề."
            })

        # 3. Unmatched or broken delimiters
        if (snippet.count("{") != snippet.count("}") or snippet.count("(") != snippet.count(")")) and len(suspicious_cases) < 7:
            suspicious_cases.append({
                "type": "UNBALANCED_DELIMITERS",
                "snippet": snippet,
                "qids": qids,
                "error_code": res.error_code,
                "reason_vi": res.reason_vi,
                "note": "Ngoặc nhọn hoặc ngoặc đơn không đóng mở cân xứng trong ngân hàng câu hỏi."
            })

        # 4. Multi-letter vectors e.g. \vec{AB}
        if re.search(r"\\vec\{[A-Z]{2,}\}", snippet) and len(suspicious_cases) < 9:
            suspicious_cases.append({
                "type": "SEGMENT_VECTOR_NOTATION",
                "snippet": snippet,
                "qids": qids,
                "error_code": res.error_code,
                "reason_vi": res.reason_vi,
                "note": "Vector đoạn thẳng hai điểm hoa như \\vec{AB}, \\vec{MN} (thuộc phạm vi hình học Oxyz v2)."
            })

        # 5. Logic / set operators
        if any(tok in snippet for tok in (r"\iff", r"\implies", r"\in", r"\forall")) and len(suspicious_cases) < 10:
            suspicious_cases.append({
                "type": "LOGICAL_STATEMENT_IN_SNIPPET",
                "snippet": snippet,
                "qids": qids,
                "error_code": res.error_code,
                "reason_vi": res.reason_vi,
                "note": "Mệnh đề logic / quan hệ tập hợp (không phải biểu thức giải tích đơn trị)."
            })

    report = {
        "summary": {
            "total_extracted_raw": total_raw,
            "total_unique": total_unique,
            "success_count": len(success_snippets),
            "success_rate_percent": round(success_rate, 2),
            "failed_count": len(failed_snippets),
            "failed_rate_percent": round(100.0 - success_rate, 2),
        },
        "top_20_unsupported_constructs": [
            {"construct": c, "occurrences_in_bank": count}
            for c, count in top_20_unsupported
        ],
        "unsupported_reasons_breakdown": dict(unsupported_reasons_counter.most_common(10)),
        "ten_suspicious_or_edge_cases": suspicious_cases[:10]
    }

    # Save to docs/latex_corpus_benchmark.json
    out_dir = os.path.join(os.path.dirname(__file__), "..", "docs")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "latex_corpus_benchmark.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)

    print("\n" + "=" * 60)
    print("           PUMKIN MATH API - LATEX CORPUS BENCHMARK")
    print("=" * 60)
    print(f"Tổng số chuỗi LaTeX trích xuất:       {total_raw}")
    print(f"Tổng số chuỗi duy nhất:                 {total_unique}")
    print(f"Dịch thành công sang SymPy AST:         {len(success_snippets)} ({success_rate:.2f}%)")
    print(f"Cấu trúc không hỗ trợ / Lỗi cú pháp:   {len(failed_snippets)} ({100.0 - success_rate:.2f}%)")
    print("\n--- TOP 20 CẤU TRÚC KHÔNG HỖ TRỢ PHỔ BIẾN NHẤT ---")
    for idx, (c, count) in enumerate(top_20_unsupported, 1):
        print(f" {idx:2d}. {c:<25} : {count:4d} lượt xuất hiện")
    print(f"\nBáo cáo chi tiết đã lưu vào: {os.path.abspath(out_path)}")

    return report


if __name__ == "__main__":
    run_benchmark()
