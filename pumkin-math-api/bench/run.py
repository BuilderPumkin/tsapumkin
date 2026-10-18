"""
CLI Entrypoint for Pumkin Math Benchmark Suite (bench/run.py)
Usage:
    python -m bench.run --mode solver_only
    python -m bench.run --mode solver_only --save-baseline
    python -m bench.run --mode e2e [--use-real-llm]
"""

from __future__ import annotations

import argparse
import json
import logging
import sys
from pathlib import Path

from bench.reporter import export_benchmark_results
from bench.runner import execute_benchmark_suite

# Ensure package roots are in sys.path
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("pumkin.bench")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Pumkin Math API Benchmark Suite")
    parser.add_argument(
        "--mode",
        choices=["solver_only", "e2e"],
        default="solver_only",
        help="Benchmark execution mode: 'solver_only' (CAS with prepared DSL) or 'e2e' (end-to-end)",
    )
    parser.add_argument(
        "--use-real-llm",
        action="store_true",
        default=False,
        help="Allow real external LLM API calls in e2e mode (requires explicit user permission/budget)",
    )
    parser.add_argument(
        "--no-adversarial",
        action="store_true",
        default=False,
        help="Exclude adversarial security test items from benchmark run",
    )
    parser.add_argument(
        "--save-baseline",
        action="store_true",
        default=False,
        help="Save current benchmark results as reference baseline.json",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    print("=================================================================")
    print("        PUMKIN MATH API - BENCHMARK EXECUTION ENGINE             ")
    print(
        f" Mode: {args.mode} | Real LLM: {args.use_real_llm} | Adversarial: {not args.no_adversarial}"
    )
    print("=================================================================")

    summary, results = execute_benchmark_suite(
        mode=args.mode,
        use_real_llm=args.use_real_llm,
        include_adversarial=not args.no_adversarial,
    )

    json_path, report_path, suspected_path = export_benchmark_results(summary, results)

    print("\n--- BENCHMARK RESULTS SUMMARY ---")
    print(
        f"Total Evaluated:             {summary.total_items} (Bank: {summary.bank_questions_total}, Adversarial: {summary.adversarial_items_total})"
    )
    print(f"Supported Questions:         {summary.supported_count}")
    print(f"Correct Answers:             {summary.correct_count}")
    print(f"Accuracy on Supported:       {summary.accuracy_on_supported * 100:.2f}%")
    print(f"End-to-End Accuracy:         {summary.end_to_end_accuracy * 100:.2f}%")
    print(f"Confident Incorrect (SAI):   {summary.confident_incorrect_count}")
    print(f"Suspected Bank Key Errors:   {summary.suspected_ground_truth_errors_count}")
    print(f"System / Solver Errors:      {summary.system_error_count}")
    print(
        f"Adversarial Block Rate:      {summary.adversarial_pass_rate * 100:.2f}% ({summary.adversarial_blocked_count}/{summary.adversarial_items_total})"
    )
    print(
        f"Latency p50 / p95:           {summary.latency_p50_ms:.2f} ms / {summary.latency_p95_ms:.2f} ms"
    )
    print(f"Total Cost USD:              ${summary.total_cost_usd:.4f}")

    print("\n--- ARTIFACTS EXPORTED ---")
    print(f"JSON Results:                {json_path}")
    print(f"Markdown Report:             {report_path}")
    print(f"Suspected Bank Issues:       {suspected_path}")

    if args.save_baseline:
        baseline_path = Path(__file__).resolve().parent / "baseline.json"
        with open(baseline_path, "w", encoding="utf-8") as f:
            summary_dict = json.loads(json_path.read_text(encoding="utf-8"))
            json.dump(summary_dict, f, ensure_ascii=False, indent=2)
        print(f"Reference Baseline Saved:    {baseline_path}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
