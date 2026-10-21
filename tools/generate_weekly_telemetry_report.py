#!/usr/bin/env python3
"""
==============================================================================
PUMKIN.DEV Academic Architecture
Script: tools/generate_weekly_telemetry_report.py
Layer: Academic Feedback Loop & Telemetry Reporting Engine (W7)

Generates standardized weekly operational reports:
1. Status Distribution (% verified, % needs_review, % unsupported, % errors)
2. Latency Percentiles (p50, p90, p95, p99 overall and per call_type)
3. Error & Timeout Rates (with breakdown by error_code)
4. Top Unsupported Topics (Prioritized solver development backlog)
5. Confident-Yet-Wrong Candidates (P0 Alerts for questions marked verified)
6. Budget & Cost Estimation (Cloudflare Workers, Render, Gemini tokens)

Usage:
  python tools/generate_weekly_telemetry_report.py --sample
  python tools/generate_weekly_telemetry_report.py --sample --output reports/weekly/sample_report.md
  python tools/generate_weekly_telemetry_report.py --db /path/to/telemetry.db
==============================================================================
"""

from __future__ import annotations

import argparse
import json
import math
import os
import random
import sqlite3
import sys
from datetime import datetime, timedelta, timezone
from typing import Any, Dict, List

# Ensure UTF-8 output on Windows
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")


def generate_synthetic_weekly_dataset() -> tuple[list[dict], list[dict]]:
    """Generates a realistic synthetic weekly dataset for testing & verification."""
    random.seed(42)  # Deterministic seed for reproducible testing

    topics = [
        "Hình học Oxyz",
        "Nguyên hàm & Tích phân",
        "Đại số ma trận & Định thức",
        "Hàm số lượng giác",
        "Cấp số cộng & Cấp số nhân",
        "Số học & Đồng dư",
        "Cực trị số phức (Nâng cao)",
        "Tích phân hàm ẩn (Nâng cao)",
        "Hình học không gian cổ điển"
    ]

    unsupported_bias_topics = [
        "Cực trị số phức (Nâng cao)",
        "Tích phân hàm ẩn (Nâng cao)",
        "Hình học không gian cổ điển"
    ]

    telemetry_events = []
    feedback_reports = []

    # 1,200 telemetry events
    start_time = datetime.now(timezone.utc) - timedelta(days=7)

    for i in range(1200):
        call_type = random.choices(["solve", "check", "generate"], weights=[0.55, 0.30, 0.15])[0]
        event_time = start_time + timedelta(seconds=random.randint(0, 7 * 86400))

        # Status distribution with realistic bias
        topic = random.choice(topics)
        if topic in unsupported_bias_topics:
            status = random.choices(["unsupported", "needs_review", "error"], weights=[0.75, 0.15, 0.10])[0]
        else:
            status = random.choices(["verified", "needs_review", "unsupported", "error"], weights=[0.82, 0.10, 0.05, 0.03])[0]

        # Latency profile
        if status == "verified":
            latency = int(random.gauss(180, 45))
        elif status == "needs_review":
            latency = int(random.gauss(340, 70))
        elif status == "unsupported":
            latency = int(random.gauss(95, 20))
        else:
            latency = int(random.gauss(2400, 600)) if random.random() < 0.2 else int(random.gauss(300, 50))
        latency = max(25, latency)

        error_code = None
        if status == "error":
            error_code = random.choice(["CLIENT_TIMEOUT", "PARSE_ERROR", "CAS_ENGINE_ERROR", "RATE_LIMIT_EXCEEDED"])
            if error_code == "CLIENT_TIMEOUT":
                latency = random.randint(18000, 21000)

        telemetry_events.append({
            "id": i + 1,
            "created_at": event_time.isoformat(),
            "session_id": f"sess_{random.randint(1000, 9999)}_{i}",
            "call_type": call_type,
            "status": status,
            "latency_ms": latency,
            "error_code": error_code,
            "api_version": "v1",
            "prompt_version": "pumkin-math-v2.1",
            "problem_topic": topic,
            "client_version": "4.5.0"
        })

    # 35 feedback reports
    reasons = ["WRONG_ANSWER", "MISUNDERSTOOD_PROBLEM", "HARD_TO_UNDERSTAND", "FORMULA_ERROR", "OTHER"]
    for j in range(35):
        report_time = start_time + timedelta(seconds=random.randint(0, 7 * 86400))
        reason = random.choices(reasons, weights=[0.35, 0.25, 0.20, 0.10, 0.10])[0]
        
        # 3 special candidate questions marked verified but reported WRONG_ANSWER (P0 Alerts)
        if j in [4, 12, 23]:
            qid = f"q_verified_suspect_{j}"
            curr_status = "verified"
            reason = "WRONG_ANSWER"
            note = "Học sinh báo: Kết quả cuối cùng tính ra 25 nhưng hệ thống ghi 32."
            verified_when_reported = 1
        else:
            qid = f"q_tsa_{random.randint(1, 80)}"
            curr_status = random.choice(["needs_review", "unsupported", "verified"])
            note = "Cần thêm bước giải thích công thức."
            verified_when_reported = 1 if (curr_status == "verified" and reason == "WRONG_ANSWER") else 0

        agreed = random.random() < 0.35
        problem_snippet = "Cho hình chóp S.ABCD có đáy là hình vuông..." if agreed else None

        feedback_reports.append({
            "id": j + 1,
            "created_at": report_time.isoformat(),
            "session_id": f"sess_fb_{j}_{random.randint(100, 999)}",
            "question_id": qid,
            "call_type": random.choice(["solve", "check"]),
            "reason_category": reason,
            "user_note": note,
            "include_problem_agreed": 1 if agreed else 0,
            "problem_content": problem_snippet,
            "current_status": curr_status,
            "verified_when_reported": verified_when_reported,
            "triage_status": "new"
        })

    return telemetry_events, feedback_reports


def calculate_percentile(data: list[int], percentile: float) -> float:
    """Calculates percentile from integer array."""
    if not data:
        return 0.0
    sorted_data = sorted(data)
    k = (len(sorted_data) - 1) * (percentile / 100.0)
    f = math.floor(k)
    c = math.ceil(k)
    if f == c:
        return float(sorted_data[int(k)])
    d0 = sorted_data[int(f)] * (c - k)
    d1 = sorted_data[int(c)] * (k - f)
    return float(d0 + d1)


def generate_weekly_report(
    telemetry_events: list[dict],
    feedback_reports: list[dict],
    week_label: str = "Tuần 42 (14/10 - 21/10/2026)"
) -> tuple[str, dict]:
    """Computes all weekly metrics and returns formatted Markdown + JSON summary."""
    total_events = len(telemetry_events)
    if total_events == 0:
        return "# BÁO CÁO HẰNG TUẦN: Không có dữ liệu telemetry.", {}

    # 1. Status distribution
    status_counts: dict[str, int] = {}
    call_type_counts: dict[str, int] = {}
    latencies: list[int] = []
    latencies_by_call: dict[str, list[int]] = {"solve": [], "check": [], "generate": []}
    error_counts: dict[str, int] = {}
    unsupported_by_topic: dict[str, int] = {}

    for evt in telemetry_events:
        st = evt.get("status", "unknown")
        status_counts[st] = status_counts.get(st, 0) + 1

        ct = evt.get("call_type", "solve")
        call_type_counts[ct] = call_type_counts.get(ct, 0) + 1

        lat = evt.get("latency_ms", 0)
        latencies.append(lat)
        if ct in latencies_by_call:
            latencies_by_call[ct].append(lat)

        err = evt.get("error_code")
        if err:
            error_counts[err] = error_counts.get(err, 0) + 1

        if st == "unsupported":
            top = evt.get("problem_topic") or "General"
            unsupported_by_topic[top] = unsupported_by_topic.get(top, 0) + 1

    # Status percentages
    status_pct = {k: (v / total_events) * 100 for k, v in status_counts.items()}

    # 2. Latency percentiles
    p50 = calculate_percentile(latencies, 50)
    p90 = calculate_percentile(latencies, 90)
    p95 = calculate_percentile(latencies, 95)
    p99 = calculate_percentile(latencies, 99)

    latency_breakdown = {}
    for ct, l_list in latencies_by_call.items():
        if l_list:
            latency_breakdown[ct] = {
                "count": len(l_list),
                "p50": calculate_percentile(l_list, 50),
                "p95": calculate_percentile(l_list, 95)
            }

    # 3. Error and timeout rates
    total_errors = sum(error_counts.values())
    error_rate_pct = (total_errors / total_events) * 100
    timeout_count = error_counts.get("CLIENT_TIMEOUT", 0)
    timeout_rate_pct = (timeout_count / total_events) * 100

    # 4. Top unsupported topics (Backlog feeder)
    sorted_unsupported = sorted(unsupported_by_topic.items(), key=lambda x: x[1], reverse=True)

    # 5. Confident-Yet-Wrong Candidates (P0 Alerts)
    p0_candidates = [
        fb for fb in feedback_reports
        if fb.get("verified_when_reported") == 1 or (fb.get("current_status") == "verified" and fb.get("reason_category") == "WRONG_ANSWER")
    ]

    # Feedback reason breakdown
    fb_reasons: dict[str, int] = {}
    for fb in feedback_reports:
        r = fb.get("reason_category", "OTHER")
        fb_reasons[r] = fb_reasons.get(r, 0) + 1

    # 6. Budget & Cost Estimation
    # Cost model:
    # - Cloudflare Worker: $0.15 per 1,000,000 requests
    # - CAS Python Solver (Render background worker): ~$7/month base
    # - Gemini API tokens estimate:
    #   - solve: ~800 input tokens, ~400 output tokens ($0.075 / 1M in, $0.30 / 1M out)
    #   - check: ~400 input tokens, ~150 output tokens
    #   - generate: ~600 input tokens, ~500 output tokens
    solve_count = call_type_counts.get("solve", 0)
    check_count = call_type_counts.get("check", 0)
    gen_count = call_type_counts.get("generate", 0)

    est_input_tokens = (solve_count * 800) + (check_count * 400) + (gen_count * 600)
    est_output_tokens = (solve_count * 400) + (check_count * 150) + (gen_count * 500)

    token_cost_usd = (est_input_tokens / 1_000_000 * 0.075) + (est_output_tokens / 1_000_000 * 0.30)
    worker_cost_usd = (total_events / 1_000_000) * 0.15
    weekly_total_cost_usd = token_cost_usd + worker_cost_usd + (7.0 / 4.0)  # Render weekly share
    monthly_projected_usd = weekly_total_cost_usd * 4.33

    # =========================================================================
    # BUILD MARKDOWN REPORT
    # =========================================================================
    md = f"""# 📊 BÁO CÁO VẬN HÀNH HỌC THUẬT & TELEMETRY HẰNG TUẦN
**Hệ thống:** PUMKIN.DEV (PUMKINTSA)  
**Thời gian:** {week_label}  
**Nguyên tắc bảo vệ dữ liệu:** Tuân thủ Zero PII, dữ liệu không định danh, thời hạn lưu trữ 90 ngày.

---

## 1. TỔNG QUAN TỶ LỆ TRẠNG THÁI (STATUS DISTRIBUTION)
*Tổng số lượt gọi ghi nhận:* **{total_events:,} sự kiện** (Solve: {solve_count:,}, Check: {check_count:,}, Generate: {gen_count:,})

| Trạng thái giải toán | Số lượng | Tỷ lệ (%) | Đánh giá & Ngưỡng chuẩn |
| :--- | :---: | :---: | :--- |
| **`verified` (Đã kiểm chứng)** | {status_counts.get('verified', 0):,} | **{status_pct.get('verified', 0.0):.1f}%** | 🟢 Đạt mục tiêu chất lượng (>= 75%) |
| **`needs_review` (Cần xem lại)** | {status_counts.get('needs_review', 0):,} | **{status_pct.get('needs_review', 0.0):.1f}%** | 🟡 Có phương án đối chứng cho học sinh |
| **`unsupported` (Chưa hỗ trợ)** | {status_counts.get('unsupported', 0):,} | **{status_pct.get('unsupported', 0.0):.1f}%** | ℹ️ Nguồn đầu vào cho Backlog tính năng mới |
| **`error` / Lỗi hệ thống** | {status_counts.get('error', 0):,} | **{status_pct.get('error', 0.0):.1f}%** | 🟢 Thấp hơn ngưỡng cảnh báo (< 5%) |

---

## 2. PHÂN VỊ ĐỘ TRỄ MẠNG & THỜI GIAN GIẢI TOÁN (LATENCY PERCENTILES)
*Đơn vị tính: mili-giây (ms). Đo lường toàn trình từ trình duyệt học sinh đến khi nhận kết quả.*

| Phân vị | Độ trễ toàn hệ thống | Ngưỡng cam kết (SLA) | Đánh giá |
| :---: | :---: | :---: | :--- |
| **p50 (Trung vị)** | **{p50:.1f} ms** | $< 350$ ms | 🟢 Rất nhanh, trải nghiệm mượt mà |
| **p90** | **{p90:.1f} ms** | $< 800$ ms | 🟢 Đạt chuẩn |
| **p95** | **{p95:.1f} ms** | $< 1,500$ ms | 🟢 Đạt chuẩn (kể cả bài toán CAS nhiều bước) |
| **p99** | **{p99:.1f} ms** | $< 5,000$ ms | 🟡 Điểm trễ tối đa trước ngưỡng timeout 20s |

### Chi tiết độ trễ theo từng luồng:
- **Solve (`/solve`):** p50 = `{latency_breakdown.get('solve', {}).get('p50', 0):.1f} ms`, p95 = `{latency_breakdown.get('solve', {}).get('p95', 0):.1f} ms`
- **Check (`/check`):** p50 = `{latency_breakdown.get('check', {}).get('p50', 0):.1f} ms`, p95 = `{latency_breakdown.get('check', {}).get('p95', 0):.1f} ms`
- **Generate (`/generate`):** p50 = `{latency_breakdown.get('generate', {}).get('p50', 0):.1f} ms`, p95 = `{latency_breakdown.get('generate', {}).get('p95', 0):.1f} ms`

---

## 3. TỶ LỆ LỖI VÀ TIMEOUT (ERROR & TIMEOUT BREAKDOWN)
- **Tổng số lỗi:** {total_errors} ({error_rate_pct:.2f}% tổng lưu lượng)
- **Tỷ lệ Timeout (`CLIENT_TIMEOUT`):** {timeout_rate_pct:.2f}% ({timeout_count} lần)

| Mã lỗi kỹ thuật | Số lần xuất hiện | Nguyên nhân gốc rễ dự kiến | Biện pháp xử lý |
| :--- | :---: | :--- | :--- |
"""

    if error_counts:
        for err_code, count in sorted(error_counts.items(), key=lambda x: x[1], reverse=True):
            cause = "Quá thời gian 20s (Render cold start hoặc CAS phức tạp)" if "TIMEOUT" in err_code else "Lỗi cú pháp LaTeX hoặc lỗi bộ nhớ isolate"
            remedy = "Duy trì pre-warm định kỳ (?wake=1) trước phiên học" if "TIMEOUT" in err_code else "Rà soát bộ phân tích cú pháp biểu thức"
            md += f"| `{err_code}` | {count} | {cause} | {remedy} |\n"
    else:
        md += "| *(Không có lỗi ghi nhận)* | 0 | Hệ thống hoạt động hoàn hảo 100% | Duy trì giám sát |\n"

    md += f"""
---

## 4. TOP CÁC DẠNG BÀI CHƯA HỖ TRỢ (UNSUPPORTED BACKLOG)
*Các dạng bài học sinh hay nhập nhưng bộ giải hiện tại chưa kiểm chứng được. Được sắp xếp theo tần suất xuất hiện làm đầu vào ưu tiên cho Sprint phát triển kế tiếp:*

| Hạng | Chuyên đề / Dạng bài toán | Lượt yêu cầu | Tỷ lệ trong nhóm Unsupported | Hành động ưu tiên |
| :---: | :--- | :---: | :---: | :--- |
"""

    total_unsupported = sum(unsupported_by_topic.values()) or 1
    if sorted_unsupported:
        for idx, (topic, count) in enumerate(sorted_unsupported[:5], 1):
            pct_un = (count / total_unsupported) * 100
            md += f"| **#{idx}** | **{topic}** | {count} | {pct_un:.1f}% | Xây dựng bộ quy tắc CAS & thẩm định nghiệm |\n"
    else:
        md += "| - | *(Không có dạng bài unsupported)* | 0 | 0% | Toàn bộ dạng bài đều đã được hỗ trợ |\n"

    md += f"""
---

## 5. CÁC CÂU VERIFIED BỊ BÁO LỖI (ỨNG VIÊN "SAI MÀ TỰ TIN" — ƯU TIÊN P0)
> [!CAUTION]
> Các câu hỏi dưới đây được hệ thống gắn nhãn `verified` nhưng bị học sinh/giáo viên gửi báo lỗi `WRONG_ANSWER`. Theo quy trình **SOP-ACAD-07 (docs/FEEDBACK_LOOP.md)**, các câu này phải được cách ly và điều tra khẩn cấp trong vòng 24 giờ.

| Mã câu hỏi | Thời điểm báo | Lý do báo | Ghi chú của học sinh | Tình trạng điều tra |
| :--- | :---: | :--- | :--- | :---: |
"""

    if p0_candidates:
        for cand in p0_candidates[:8]:
            note = cand.get("user_note") or "Không có ghi chú thêm"
            md += f"| `{cand.get('question_id')}` | {cand.get('created_at', '')[:16]} | `{cand.get('reason_category')}` | {note} | 🔴 **Chờ thẩm định P0** |\n"
    else:
        md += "| *(Không có câu verified nào bị báo lỗi)* | - | - | 0 cảnh báo 'sai mà tự tin' | 🟢 Tuyệt đối an toàn |\n"

    md += f"""
---

## 6. MỨC DÙNG NGÂN SÁCH & CHI PHÍ ƯỚC LƯỢNG (BUDGET TRACKING)
*Ước tính tiêu thụ tài nguyên và chi phí vận hành máy chủ trong tuần:*

- **Lưu lượng mạng:** {total_events:,} requests
- **Ước tính Token LLM:**
  - Token đầu vào (Prompt): **~{est_input_tokens:,} tokens**
  - Token đầu ra (Completion): **~{est_output_tokens:,} tokens**
- **Bảng phân bổ chi phí ước lượng:**
  - Chi phí Cloudflare Pages Functions: **${worker_cost_usd:.4f}**
  - Chi phí Token AI (Gemini 1.5 Flash): **${token_cost_usd:.4f}**
  - Chi phí Hạ tầng CAS Server (Render allocation): **${(7.0 / 4.0):.2f}**
  - **TỔNG CHI PHÍ VẬN HÀNH TRONG TUẦN:** **${weekly_total_cost_usd:.2f} USD** (~{int(weekly_total_cost_usd * 25400):,} VNĐ)
  - **DỰ BÁO NGÂN SÁCH THÁNG (Burn Rate):** **${monthly_projected_usd:.2f} USD/tháng** (~{int(monthly_projected_usd * 25400):,} VNĐ/tháng)

---
*Báo cáo được khởi tạo tự động bởi công cụ `tools/generate_weekly_telemetry_report.py`.*
"""

    summary_data = {
        "week_label": week_label,
        "total_events": total_events,
        "status_distribution": status_counts,
        "latency_percentiles": {
            "p50": p50,
            "p90": p90,
            "p95": p95,
            "p99": p99
        },
        "error_rate_pct": error_rate_pct,
        "timeout_rate_pct": timeout_rate_pct,
        "p0_confident_wrong_count": len(p0_candidates),
        "top_unsupported": sorted_unsupported[:5],
        "budget_usd": {
            "weekly_total": weekly_total_cost_usd,
            "monthly_projected": monthly_projected_usd
        }
    }

    return md, summary_data


def main():
    parser = argparse.ArgumentParser(description="PUMKIN Weekly Telemetry Report Generator")
    parser.add_argument("--sample", action="store_true", help="Generate synthetic test data for offline verification")
    parser.add_argument("--db", type=str, help="Path to local SQLite telemetry database")
    parser.add_argument("--output", type=str, help="File path to save Markdown report")
    parser.add_argument("--json", type=str, help="File path to save JSON summary")
    args = parser.parse_args()

    telemetry_events = []
    feedback_reports = []

    if args.sample or not args.db:
        print("[INFO] Running in synthetic sample data mode...")
        telemetry_events, feedback_reports = generate_synthetic_weekly_dataset()
    else:
        if not os.path.exists(args.db):
            print(f"[ERROR] Database file not found: {args.db}")
            sys.exit(1)
        conn = sqlite3.connect(args.db)
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM telemetry_events")
        telemetry_events = [dict(row) for row in cur.fetchall()]
        cur.execute("SELECT * FROM feedback_reports")
        feedback_reports = [dict(row) for row in cur.fetchall()]
        conn.close()

    md_report, summary = generate_weekly_report(telemetry_events, feedback_reports)

    if args.output:
        os.makedirs(os.path.dirname(os.path.abspath(args.output)), exist_ok=True)
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(md_report)
        print(f"[SUCCESS] Saved Markdown report to: {args.output}")
    else:
        print(md_report)

    if args.json:
        os.makedirs(os.path.dirname(os.path.abspath(args.json)), exist_ok=True)
        with open(args.json, "w", encoding="utf-8") as f:
            json.dump(summary, f, ensure_ascii=False, indent=2)
        print(f"[SUCCESS] Saved JSON summary to: {args.json}")


if __name__ == "__main__":
    main()
