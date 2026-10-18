# PUMKIN MATH API - BENCHMARK & CI QUALITY GATE (`bench/`)

Tài liệu hướng dẫn vận hành bộ đo lường chuẩn hóa (Benchmark Suite) và Cổng chất lượng kiểm thử liên tục (CI Quality Gate) của nền tảng **Pumkin Math API**.

---

## 1. TỔNG QUAN KIẾN TRÚC

Bộ benchmark được thiết kế nhằm mục đích:
1. **Đo lường độ chính xác và độ ổn định thực tế** của các bộ giải tất định CAS (SymPy) trên tập 553 câu hỏi từ ngân hàng đề chuẩn kèm 30 ca kiểm thử đối kháng (Adversarial Suite).
2. **Ngăn chặn triệt để hiện tượng suy thoái chất lượng (Regression):** Thiết lập cổng chất lượng CI chặn đứng mọi Pull Request làm xuất hiện lỗi "Sai mà tự tin" hoặc làm giảm độ chính xác / độ phủ.
3. **Phân lập lỗi dữ liệu gốc:** Tách bạch 3 loại lệch: (a) Lỗi hệ thống, (b) Nghi đáp án chuẩn sai (chờ giáo viên duyệt), và (c) Dạng bài ngoài phạm vi hỗ trợ (Out-of-scope).

```text
pumkin-math-api/bench/
├── data/
│   └── all.json                    # 553 câu hỏi ngân hàng đề gốc
├── results/
│   ├── <YYYY-MM-DD>.json           # Kết quả đo lường có cấu trúc
│   ├── <YYYY-MM-DD>_report.md      # Báo cáo chi tiết định dạng Markdown
│   ├── suspected_ground_truth_errors.json # Dữ liệu câu hỏi nghi đáp án sai
│   └── suspected_ground_truth_errors.md   # Danh sách cho giáo viên duyệt
├── baseline.json                   # Mẫu đối sánh chuẩn (Reference Baseline)
├── ci_gate.py                      # Bộ thẩm định cổng chất lượng CI
├── dataset.py                      # Bộ nạp 553 câu ngân hàng + 30 ca đối kháng
├── dsl_catalog.py                  # Từ điển DSL chuẩn bị cho các câu hỏi
├── evaluator.py                    # Bộ chuẩn hóa toán học và so khớp đáp án
├── reporter.py                     # Bộ tạo báo cáo JSON & Markdown
├── runner.py                       # Động cơ thực thi benchmark và đo độ trễ
├── run.py                          # CLI entrypoint chạy benchmark
└── README.md                       # Tài liệu hướng dẫn này
```

---

## 2. HƯỚNG DẪN CHẠY BENCHMARK

### 2.1. Chạy chế độ Solver-Only (Mặc định - Khuyến nghị)
Chạy bộ giải tất định CAS trên toàn bộ 553 câu hỏi và 30 ca kiểm thử đối kháng:
```bash
python -m bench.run --mode solver_only
```

### 2.2. Chạy và lưu Baseline chuẩn
Khi cập nhật ngân hàng kiến thức hoặc nâng cấp bộ giải và muốn thiết lập baseline mới:
```bash
python -m bench.run --mode solver_only --save-baseline
```

### 2.3. Chạy kiểm tra Cổng chất lượng CI (CI Quality Gate)
Sử dụng trong quy trình CI/CD GitHub Actions:
```bash
# So khớp kết quả vừa chạy với baseline.json
python -m bench.ci_gate --current bench/results/2026-10-18.json
```
Nếu bất kỳ chỉ số nào bị suy thoái, lệnh sẽ trả về mã thoát `exit 1` và in chi tiết vi phạm để chặn merge PR.

### 2.4. Chế độ Đầu-cuối (End-to-End) với LLM
> **CẢNH BÁO CHI PHÍ:** Chế độ này CHỈ được chạy khi có sự phê duyệt ngân sách rõ ràng.
```bash
python -m bench.run --mode e2e --use-real-llm
```

---

## 3. CÁCH ĐỌC VÀ DIỄN GIẢI KẾT QUẢ

Mỗi lần chạy sẽ sinh ra 3 tệp đầu ra tại `bench/results/`:
1. **`<YYYY-MM-DD>.json`:** Tệp dữ liệu JSON toàn diện chứa số liệu tổng quan, phân rã theo chuyên đề, danh sách từng ca sai và số đo độ trễ chi tiết.
2. **`<YYYY-MM-DD>_report.md`:** Báo cáo khoa học trực quan với bảng số liệu, ma trận so sánh các cấu hình và phân tích chuyên môn.
3. **`suspected_ground_truth_errors.md`:** Danh sách chuyển giao cho giáo viên duyệt, liệt kê các câu hỏi phát hiện bất cập trong đề gốc (phương án trùng nhau, đáp án khóa lệch lời giải chuẩn).

### Các chỉ số then chốt:
- **Độ chính xác trên dạng bài hỗ trợ (`accuracy_on_supported`):** Tỷ lệ câu trả lời đúng trên tổng số câu mà CAS có bộ giải chuyên biệt. (Baseline: **`95.83%`**).
- **SAI-MÀ-TỰ-TIN (`confident_incorrect_count`):** Số câu mà hệ thống gắn nhãn `verified` nhưng kết quả sai khác đáp án chuẩn. **Mục tiêu bắt buộc: `0 ca`**.
- **Độ phủ (`coverage_rate`):** Tỷ lệ câu hỏi trong ngân hàng được hệ thống hỗ trợ giải tự động.
- **Tỷ lệ chặn ca đối kháng (`adversarial_pass_rate`):** Bắt buộc đạt **`100% (30/30)`**.
- **Độ trễ p95 (`latency_p95_ms`):** Thời gian xử lý ở phân vị 95%. (Baseline: **`~20-25 ms`**).
- **Chi phí / yêu cầu (`cost_per_request_usd`):** Đạt **`$0.0000`** ở chế độ solver tất định.

---

## 4. MA TRẬN SO SÁNH CÁC CẤU HÌNH NGHIÊN CỨU

Hệ thống hỗ trợ 4 cấu hình đối sánh phục vụ báo cáo khoa học:
- **(a) LLM tự giải (Chain-of-Thought, không công cụ):** *chưa đo* (Chờ cấp phép ngân sách).
- **(b) LLM sinh biểu thức + SymPy (không đồng thuận):** *chưa đo* (Chờ cấp phép ngân sách).
- **(c) LLM + SymPy + Đồng thuận 3 mẫu:** *chưa đo* (Chờ cấp phép ngân sách).
- **(d) Hệ thống đầy đủ (Pumkin CAS + Sandbox + Verification):** **ĐÃ ĐO THỰC TẾ**.

> **Nguyên tắc liêm chính học thuật:** Tuyệt đối không suy đoán hoặc bịa số liệu cho các cấu hình (a), (b), (c) khi chưa chạy thực nghiệm có kiểm soát ngân sách.

---

## 5. QUY TẮC CỔNG CHẤT LƯỢNG CI (CI QUALITY GATE RULES)

Quy trình CI tự động chặn merge PR khi phát hiện bất kỳ điều kiện nào sau đây:
1. **`confident_incorrect_count > 0`:** Xuất hiện dù chỉ 1 ca sai-mà-tự-tin trên các dạng bài được hỗ trợ.
2. **`accuracy_on_supported < baseline - 1.0%`:** Độ chính xác trên dạng bài hỗ trợ suy giảm quá 1%.
3. **`supported_count < baseline`:** Số lượng câu hỏi được hỗ trợ bị giảm sút.
4. **`adversarial_pass_rate < 100%`:** Có bất kỳ ca kiểm thử đối kháng / tấn công bảo mật nào bị lọt lưới.
5. **`latency_p95_ms > 100.0 ms`:** Hiệu năng tính toán bị suy giảm nghiêm trọng.

---

## 6. GIỚI HẠN PHƯƠNG PHÁP LUẬN (METHODOLOGICAL LIMITATIONS)

1. **Kích thước mẫu:** Tập dữ liệu chuẩn hiện tại gồm 553 câu hỏi trắc nghiệm và tự luận. Dù đủ lớn để đánh giá các phân vị độ trễ và độ chính xác cơ sở, quy mô này cần tiếp tục được mở rộng khi tích hợp thêm các đề thi thử toàn quốc.
2. **Thiên lệch phân bố dạng bài (Sampling Bias):** Trong 553 câu hỏi, phân môn Giải tích và Hàm số chiếm tỷ trọng lớn (> 300 câu), trong khi một số phân môn chuyên biệt (Ma trận, Đồng dư số học, Vector 2D) có số lượng ít hơn. Cần lưu ý khi diễn giải độ phủ toàn cục.
3. **Rủi ro đáp án chuẩn trong ngân hàng gốc (Ground Truth Flaws):**
   - Khoảng 3 câu hỏi trong ngân hàng gốc có phương án lựa chọn bị trùng lặp (ví dụ `q_gen_bayes_1` có 2 phương án cùng là `0.30`).
   - Một số câu hỏi tự luận ngắn thiếu trường options chuẩn.
   - Một số câu hỏi giải tích yêu cầu tìm giá trị biểu thức thứ cấp $a + b$ thay vì giá trị tích phân trực tiếp.
   Hệ thống xử lý vấn đề này bằng cách phân lập các ca nghi ngờ vào tệp [bench/results/suspected_ground_truth_errors.md](file:///c:/Users/ADMIN/Downloads/hoctap/PUMKIN2/pumkin-math-api/bench/results/suspected_ground_truth_errors.md) để giáo viên thẩm định, thay vì tính oan vào lỗi của solver.
