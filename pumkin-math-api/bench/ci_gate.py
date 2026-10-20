"""
CI Quality Gate Evaluator (bench/ci_gate.py)
Compares current benchmark execution results against committed baseline.json.
Enforces strict quality thresholds to prevent regressions:
1. Confident-incorrect count MUST NOT exceed baseline (Strict target: 0).
2. Accuracy on supported questions MUST NOT degrade by more than 1.0% (0.01).
3. Question coverage MUST NOT decrease.
4. Adversarial security pass rate MUST remain 100% (30/30).
5. p95 latency MUST NOT exceed 100.0 ms.
Exits with 0 on pass, 1 on failure.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

BASELINE_PATH = Path(__file__).resolve().parent / "baseline.json"


def evaluate_quality_gate(
    current_results: dict[str, Any],
    baseline: dict[str, Any],
    max_accuracy_drop: float = 0.01,
    max_latency_p95_ms: float = 100.0,
) -> tuple[bool, list[str]]:
    """
    Evaluates current results against baseline reference metrics.
    Returns (passed, list_of_violations).
    """
    violations: list[str] = []

    # 1. Confident Incorrect (SAI-MÀ-TỰ-TIN)
    base_ci = baseline.get("confident_incorrect_count", 0)
    curr_ci = current_results.get("confident_incorrect_count", 0)
    if curr_ci > base_ci:
        violations.append(
            f"REGRESSION [Confident-Incorrect]: Số ca sai-mà-tự-tin tăng từ {base_ci} lên {curr_ci} ca (Mục tiêu bắt buộc: <= {base_ci})."
        )

    # 2. Count-based Regression on Solved Questions (Item 8)
    base_correct = baseline.get("correct_count", 69)
    curr_correct = current_results.get("correct_count", 0)
    if curr_correct < base_correct:
        violations.append(
            f"REGRESSION [Solved Count]: Số câu giải đúng bị giảm từ {base_correct} xuống {curr_correct} câu "
            f"({base_correct - curr_correct} câu bị hồi quy!)."
        )

    # 3. Accuracy on Supported Questions
    base_acc = baseline.get("accuracy_on_supported", 0.0)
    curr_acc = current_results.get("accuracy_on_supported", 0.0)
    if curr_acc < (base_acc - max_accuracy_drop):
        violations.append(
            f"REGRESSION [Accuracy]: Độ chính xác trên dạng bài hỗ trợ giảm từ {base_acc * 100:.2f}% xuống {curr_acc * 100:.2f}% "
            f"(vượt quá biên độ suy giảm cho phép {max_accuracy_drop * 100:.1f}%)."
        )

    # 4. Question Coverage
    base_sup = baseline.get("supported_count", 0)
    curr_sup = current_results.get("supported_count", 0)
    if curr_sup < base_sup:
        violations.append(
            f"REGRESSION [Coverage]: Số câu hỏi được hỗ trợ giảm từ {base_sup} xuống {curr_sup} câu."
        )

    # 5. Adversarial Security Pass Rate (Hard Gate)
    curr_adv_rate = current_results.get("adversarial_pass_rate", 1.0)
    curr_adv_blocked = current_results.get("adversarial_blocked_count", 0)
    total_adv = current_results.get("adversarial_items_total", 0)
    if curr_adv_rate < 1.0:
        violations.append(
            f"SECURITY REGRESSION [Adversarial]: Tỷ lệ chặn tấn công đối kháng giảm còn {curr_adv_rate * 100:.2f}% "
            f"({total_adv - curr_adv_blocked} ca tấn công bị lọt lưới!)."
        )

    # 6. System Errors (Hard Gate)
    curr_sys_err = current_results.get("system_error_count", 0)
    if curr_sys_err > 0:
        violations.append(
            f"SYSTEM REGRESSION [System Errors]: Ghi nhận {curr_sys_err} lỗi hệ thống (crash/timeout unhandled)."
        )

    # 7. Latency p95
    curr_p95 = current_results.get("latency_p95_ms", 0.0)
    if curr_p95 > max_latency_p95_ms:
        violations.append(
            f"PERFORMANCE REGRESSION [Latency]: Độ trễ p95 ({curr_p95:.2f} ms) vượt trần cho phép ({max_latency_p95_ms:.2f} ms)."
        )

    passed = len(violations) == 0
    return passed, violations


def main() -> int:
    parser = argparse.ArgumentParser(description="Pumkin CI Quality Gate Comparator")
    parser.add_argument(
        "--current",
        type=str,
        default=None,
        help="Path to current benchmark JSON result file (if omitted, executes benchmark runner)",
    )
    parser.add_argument(
        "--baseline",
        type=str,
        default=str(BASELINE_PATH),
        help="Path to committed reference baseline.json",
    )
    args = parser.parse_args()

    baseline_file = Path(args.baseline)
    if not baseline_file.exists():
        print(f"ERROR: Baseline file not found at {baseline_file}")
        return 1

    with open(baseline_file, encoding="utf-8") as f:
        baseline_data = json.load(f)

    if args.current:
        current_file = Path(args.current)
        if not current_file.exists():
            print(f"ERROR: Current results file not found at {current_file}")
            return 1
        with open(current_file, encoding="utf-8") as f:
            current_data = json.load(f)
    else:
        from bench.runner import execute_benchmark_suite

        summary, _ = execute_benchmark_suite(mode="solver_only")
        from dataclasses import asdict

        current_data = asdict(summary)

    passed, violations = evaluate_quality_gate(current_data, baseline_data)

    print("=================================================================")
    print("               PUMKIN CI QUALITY GATE EVALUATION                 ")
    print("=================================================================")
    print(f"Baseline Date:         {baseline_data.get('date')}")
    print(f"Current Date:          {current_data.get('date')}")
    print(
        f"Accuracy Supported:    {current_data.get('accuracy_on_supported', 0) * 100:.2f}% (Baseline: {baseline_data.get('accuracy_on_supported', 0) * 100:.2f}%)"
    )
    print(
        f"Confident Incorrect:   {current_data.get('confident_incorrect_count', 0)} (Baseline: {baseline_data.get('confident_incorrect_count', 0)})"
    )
    print(
        f"Supported Coverage:    {current_data.get('supported_count', 0)} (Baseline: {baseline_data.get('supported_count', 0)})"
    )
    print(
        f"Adversarial Pass Rate: {current_data.get('adversarial_pass_rate', 0) * 100:.2f}% (Baseline: {baseline_data.get('adversarial_pass_rate', 0) * 100:.2f}%)"
    )
    print(
        f"Latency p95:           {current_data.get('latency_p95_ms', 0):.2f} ms (Baseline: {baseline_data.get('latency_p95_ms', 0):.2f} ms)"
    )
    print("-----------------------------------------------------------------")

    if passed:
        print(">>> RESULT: [PASSED] Tất cả các chỉ số đáp ứng chuẩn chất lượng CI.")
        return 0
    else:
        print(">>> RESULT: [FAILED] CỔNG CHẤT LƯỢNG CI TỪ CHỐI MERGE!")
        print("Chi tiết các vi phạm chỉ số:")
        for v in violations:
            print(f"  ❌ {v}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
