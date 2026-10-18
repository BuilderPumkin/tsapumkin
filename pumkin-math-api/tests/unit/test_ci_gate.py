"""
Unit Tests for CI Quality Gate (tests/unit/test_ci_gate.py)
Validates that the CI quality gate correctly passes when metrics are maintained,
and strictly blocks merge when any key metric regresses beyond allowed thresholds.
"""

from __future__ import annotations

import pytest

from bench.ci_gate import evaluate_quality_gate


@pytest.fixture
def baseline_sample():
    return {
        "date": "2026-10-18",
        "supported_count": 72,
        "correct_count": 69,
        "accuracy_on_supported": 0.9583,
        "confident_incorrect_count": 0,
        "needs_review_count": 0,
        "adversarial_items_total": 30,
        "adversarial_blocked_count": 30,
        "adversarial_pass_rate": 1.0,
        "latency_p95_ms": 22.65,
    }


def test_ci_gate_passes_on_healthy_run(baseline_sample):
    """Verify CI gate passes when current results match or improve on baseline."""
    current = dict(baseline_sample)
    current["accuracy_on_supported"] = 0.9650
    current["latency_p95_ms"] = 20.10

    passed, violations = evaluate_quality_gate(current, baseline_sample)
    assert passed is True
    assert len(violations) == 0


def test_ci_gate_blocks_on_confident_incorrect_increase(baseline_sample):
    """Verify CI gate strictly blocks merge if even 1 confident-incorrect appears."""
    current = dict(baseline_sample)
    current["confident_incorrect_count"] = 1  # 1 confident wrong answer!

    passed, violations = evaluate_quality_gate(current, baseline_sample)
    assert passed is False
    assert any("Confident-Incorrect" in v for v in violations)


def test_ci_gate_blocks_on_accuracy_drop(baseline_sample):
    """Verify CI gate blocks merge when accuracy on supported drops by more than 1.0%."""
    current = dict(baseline_sample)
    current["accuracy_on_supported"] = 0.9400  # 94.0% vs baseline 95.83% (> 1% drop)

    passed, violations = evaluate_quality_gate(current, baseline_sample)
    assert passed is False
    assert any("Accuracy" in v for v in violations)


def test_ci_gate_blocks_on_coverage_decrease(baseline_sample):
    """Verify CI gate blocks merge when supported question coverage decreases."""
    current = dict(baseline_sample)
    current["supported_count"] = 70  # dropped from 72 to 70

    passed, violations = evaluate_quality_gate(current, baseline_sample)
    assert passed is False
    assert any("Coverage" in v for v in violations)


def test_ci_gate_blocks_on_adversarial_security_leak(baseline_sample):
    """Verify CI gate blocks merge when an adversarial security test is unblocked."""
    current = dict(baseline_sample)
    current["adversarial_blocked_count"] = 29
    current["adversarial_pass_rate"] = 29 / 30  # 96.67% < 100%

    passed, violations = evaluate_quality_gate(current, baseline_sample)
    assert passed is False
    assert any("Adversarial" in v for v in violations)


def test_ci_gate_blocks_on_latency_regression(baseline_sample):
    """Verify CI gate blocks merge when p95 latency exceeds maximum threshold."""
    current = dict(baseline_sample)
    current["latency_p95_ms"] = 150.0  # > 100.0 ms

    passed, violations = evaluate_quality_gate(current, baseline_sample, max_latency_p95_ms=100.0)
    assert passed is False
    assert any("Latency" in v for v in violations)
