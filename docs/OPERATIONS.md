# QUY CHUẨN VẬN HÀNH DÀI HẠN & TIẾN HÓA HỆ THỐNG (OPERATIONS.md)

> **Dự án:** Nền tảng Học thuật & Luyện đề Chuẩn hóa PUMKIN.DEV (PUMKINTSA)  
> **Cơ quan ban hành:** Chief Academic AI Architect & Production Operations Lead  
> **Mã văn bản:** SOP-OPS-02 — Phiên bản: 2.0-PRO — Cập nhật: 21/10/2026  
> **Mục tiêu:** Thiết lập chu kỳ bảo trì định kỳ, giám sát thời gian thực, quản lý phiên bản mô hình/prompt, vòng phản hồi sư phạm với giáo viên và lộ trình tiến hóa dựa trên dữ liệu thật.

---

## 1. GIÁM SÁT THỜI GIAN THỰC & CẢNH BÁO TỰ ĐỘNG (MONITORING & ALERTING)

### 1.1. Công cụ Giám sát Đề xuất (Miễn phí & Sẵn có)
Để đảm bảo tối ưu chi phí vận hành mà vẫn đạt độ tin cậy $99.9\%$, hệ thống đề xuất các giải pháp giám sát miễn phí sau:
1. **UptimeRobot (Khuyến nghị 1 - Miễn phí hoàn toàn):**
   - Cung cấp 50 monitor giám sát HTTP/HTTPS định kỳ 5 phút/lần.
   - Cấu hình ping endpoint: `https://tsapumkin.pages.dev/api/math/healthz` (hoặc domain Production).
   - Tự động gửi thông báo qua Email, Webhook Discord, hoặc Telegram khi backend down.
2. **GitHub Actions Scheduled Cron (Khuyến nghị 2 - Sẵn có trong repo):**
   - Chạy workflow tự động mỗi 10 phút sử dụng script [`tools/health_monitor.mjs`](file:///c:/Users/ADMIN/Downloads/hoctap/PUMKIN2/tools/health_monitor.mjs).
   - Kiểm tra cả độ trễ phản hồi, tỷ lệ lỗi và tình trạng quota.
3. **Cloudflare Free Analytics & Edge Alerts:**
   - Theo dõi số lượng request, băng thông, tỷ lệ HTTP 4xx/5xx theo thời gian thực tại tab **Workers & Pages Analytics**.

### 1.2. Kênh phát Cảnh báo (Alerting Channels)
Bạn có thể lựa chọn 1 trong các kênh nhận cảnh báo sau để tích hợp vào biến môi trường `ALERT_WEBHOOK_URL`:
- **Kênh A: Discord Webhook (Tiện lợi nhất):** Tạo một kênh riêng `#pumkin-alerts` trong Discord server, copy Webhook URL dán vào biến môi trường.
- **Kênh B: Telegram Bot:** Dùng bot Telegram miễn phí gửi tin nhắn trực tiếp vào nhóm quản trị.
- **Kênh C: Email Thông báo:** Nhận email trực tiếp từ UptimeRobot khi hệ thống gặp sự cố.

### 1.3. Bảng Ngưỡng Cảnh báo Kỹ thuật

| Điều kiện kích hoạt cảnh báo | Ngưỡng vi phạm | Mức độ cảnh báo | Hành động tự động của hệ thống |
| :--- | :---: | :---: | :--- |
| **API Chết / Mất kết nối** | HTTP status 502 / 503 / 504 hoặc Timeout $> 4\text{s}$ | **CRITICAL** | Gửi cảnh báo tức thì; Web tự chuyển fallback về kho 553 câu chuẩn. |
| **Tỷ lệ lỗi tăng cao** | Error Rate $> 3.0\%$ trong 5 phút | **CRITICAL** | Gửi cảnh báo; đề xuất kích hoạt Kill Switch nếu kéo dài. |
| **Độ trễ p95 vượt trần** | p95 $> 1,000\text{ms}$ (CAS) hoặc $> 6,000\text{ms}$ (LLM) | **WARNING** | Gửi cảnh báo nghẽn hàng đợi; chuẩn bị bật hàng đợi có trần (Tier b). |
| **Ngân sách LLM chạm 70%** | Chi tiêu ngày đạt $70\%$ hạn mức | **WARNING** | Gửi cảnh báo mức dùng cho Người phụ trách để theo dõi. |
| **Ngân sách LLM chạm 90%** | Chi tiêu ngày đạt $90\%$ hạn mức | **CRITICAL** | Tự động tắt tính năng sinh đề `math.generate` để bảo toàn ngân sách. |
| **Báo lỗi câu Verified** | $\ge 2$ báo lỗi trên cùng 1 câu `verified` | **CRITICAL** | Gửi ID câu hỏi cho Trưởng ban Học thuật; tạm hạ nhãn về `needs_review`. |

---

## 2. QUẢN LÝ PHIÊN BẢN MÔ HÌNH & PROMPT (MODEL & PROMPT VERSION GOVERNANCE)

Mọi thay đổi liên quan đến mô hình AI hoặc bộ giải toán học đều phải tuân thủ nguyên tắc **Phát hành có kiểm soát (Canary & Gate)**:

```
[ Thay đổi Prompt / Model / Solver ]
     │
     ▼
[ Tái chạy Benchmark toàn diện (bench/run.py) ]
     │
     ├── Nếu confident_incorrect > 0 ──► TỪ CHỐI PHÁT HÀNH NGAY LẬP TỨC (ABORT)
     └── Nếu độ chính xác giữ vững / tăng và 0 sai-mà-tự-tin
              │
              ▼
[ Gắn thẻ Phiên bản (Version Metadata) ]
(api_version, prompt_hash, model_id, checked_at)
              │
              ▼
[ Triển khai Canary (5% ──► 25% ──► 100%) ]
```

### Các nguyên tắc quản trị bắt buộc:
1. **Truy vết 100% (Full Traceability):** Mọi kết quả giải toán, gợi ý Socratic hoặc chấm bài trả về cho học sinh đều bắt buộc chứa metadata:
   ```json
   {
     "api_version": "1.1.0",
     "solver_method": "symbolic_cas",
     "prompt_hash": "a1f8c09e",
     "model_id": "gemini-2.0-flash",
     "checked_at": "2026-10-21T19:00:00Z"
   }
   ```
2. **Cổng kiểm soát nghiêm ngặt (Quality Gate):** Không chấp nhận bất kỳ cải tiến nào về độ phong phú của câu chữ nếu làm tăng dù chỉ 1 câu "sai mà tự tin" (`confident_incorrect > 0`).

---

## 3. CHU KỲ VẬN HÀNH ĐỊNH KỲ (ROUTINE OPERATIONAL CADENCE)

Bảng phân công trách nhiệm và chu kỳ bảo trì dài hạn của nền tảng:

| Hoạt động định kỳ | Chu kỳ thực hiện | Thao tác kỹ thuật chuẩn | Chủ sở hữu (Owner) | Bằng chứng đầu ra |
| :--- | :---: | :--- | :---: | :--- |
| **Báo cáo Viễn thám Tuần** | Thứ Hai hàng tuần | Chạy script: `python tools/generate_weekly_telemetry_report.py`. Phân tích tỷ lệ status, p95, top câu báo lỗi và ngân sách. | Lead QA / On-call | `reports/weekly/telemetry_YYYY-WW.md` |
| **Benchmark Hằng Tháng** | Ngày 01 hàng tháng | Tái chạy toàn bộ bộ thử nghiệm: `python bench/run.py`. Đánh giá 553 câu ngân hàng + 32 ca đối kháng. | Chief Academic Architect | `bench/results/YYYY-MM.json` & `per_case.csv` |
| **Xoay Khóa Định Kỳ** | Mỗi 90 ngày | Thực hiện giao thức xoay khóa Dual-Key theo hướng dẫn tại [`docs/RUNBOOK.md`](file:///c:/Users/ADMIN/Downloads/hoctap/PUMKIN2/docs/RUNBOOK.md) mục 2. | Release Lead & Owner | Khóa cũ được thu hồi, 0 downtime. |
| **Quét Lỗ Hổng Phụ Thuộc** | Hàng tuần (qua CI) | Chạy kiểm tra bảo mật: `npm audit` và `pip-audit`. Nâng cấp các thư viện có bản vá. | Security Engineer | Báo cáo quét 0 lỗ hổng nghiêm trọng. |
| **Rà soát Gói Host Miễn Phí** | Ngày 25 hàng tháng | Kiểm tra số giờ sử dụng Render (trên 750 giờ/tháng) và dung lượng Cloudflare Pages / KV để tránh chạm trần. | Lead Ops | Báo cáo tài nguyên hosting. |
| **Sao Lưu Dữ Liệu Overrides** | Hàng ngày (Tự động) | Commit và push thư mục `data/overrides/`, `pumkin3/data/teacher_review/` và log báo lỗi lên Git repo nội bộ. | Lead Ops | Git commit hash sao lưu an toàn. |

---

## 4. VÒNG PHẢN HỒI SƯ PHẠM VỚI GIÁO VIÊN (CONTENT LOOP WITH TEACHERS)

Quy trình chuẩn để đưa chuyên môn của thầy cô giáo vào hệ thống một cách khoa học:

1. **Thu thập danh sách chờ duyệt:**
   - Các câu hỏi nghi lệch đáp án: lưu tại `review/answer_mismatch.json`.
   - Các đề bài sinh tương đương mẫu: lưu tại `pumkin3/data/teacher_review/sample_generated_20.json`.
   - Các câu hỏi bị học sinh báo lỗi nhiều lần: trích xuất từ báo cáo tuần.
2. **Nhịp duyệt chuyên môn (Review Rhythm):**
   - Định kỳ **2 tuần / lần**, Trưởng ban Học thuật họp cùng hội đồng giáo viên để thẩm định các câu hỏi trong hàng đợi.
3. **Quy trình áp dụng quyết định của Giáo viên (Zero-Touch Raw Data):**
   - Tuyệt đối không sửa trực tiếp vào file gốc `data/questions/all.json`.
   - Mọi chỉnh sửa được ghi nhận vào `data/overrides/answer_overrides.json` với cấu trúc chuẩn:
     ```json
     {
       "question_id": "q_hsa_15",
       "override_correct_answer": "B",
       "reviewed_by": "Thầy Nguyễn Văn A (Tổ trưởng Toán)",
       "reviewed_at": "2026-10-21",
       "academic_reason": "Tích phân từng phần cho kết quả 3e - 1, đồng nhất hệ số a=3, b=-1 suy ra a+b=2."
     }
     ```
   - Chạy lệnh build: `python tools/build_release.py` $\to$ Hệ thống tự động hợp nhất dữ liệu overrides vào bản phát hành mới và sinh lại bundle an toàn.

---

## 5. TIẾN HÓA DỰA TRÊN SỐ LIỆU & LỘ TRÌNH DÀI HẠN (DATA-DRIVEN EVOLUTION)

### 5.1. Mở rộng Bộ giải toán CAS (Solver Backlog)
- Báo cáo tuần sẽ tổng hợp danh sách **Top dạng bài chưa hỗ trợ (Unsupported Topics)** do học sinh tự do nhập vào.
- Khi một dạng bài có nhu cầu vượt quá $15\%$ tổng số lượt hỏi tự do $\to$ Đưa vào Sprint phát triển bộ giải đại số máy tính CAS mới (Lặp lại quy trình Prompt 5 của chuỗi Math API):
  1. Xây dựng bộ ngữ pháp DSL chuẩn hóa cho dạng bài.
  2. Viết solver tất định bằng SymPy.
  3. Bổ sung bộ test đối kháng $\ge 30$ ca kiểm thử biên.

### 5.2. Cổng Điều kiện xem xét Tinh chỉnh Mô hình nhỏ (SLM Gate Decision)
- Theo đúng Quyết định Cổng SLM tại [`docs/SLM_GATE_DECISION.md`](file:///c:/Users/ADMIN/Downloads/hoctap/PUMKIN2/docs/SLM_GATE_DECISION.md):
  - **Hiện tại: TUYỆT ĐỐI KHÔNG FINE-TUNE SLM.**
  - **Điều kiện mở lại xem xét:** Chỉ khi hệ thống tích lũy đủ $\ge 1,000$ cặp đề bài $\to$ DSL hoàn toàn độc lập do giáo viên biên soạn và thẩm định 100%, đồng thời chứng minh được Semantic Parser LLM có độ chính xác độc lập $\ge 90\%$ trên tập Holdout.

---

## 6. KẾ HOẠCH GỠ BỎ DẦN MÃ NGUỒN CŨ (`functions/api/ai.js`)

Hiện tại, file cũ `functions/api/ai.js` vẫn được giữ nguyên để đảm bảo tương thích ngược tuyệt đối. Đề xuất lộ trình gỡ bỏ an toàn 3 giai đoạn để Người phụ trách xem xét:

- **Giai đoạn 1 (Hiện tại - Chuyển tiếp êm):**
  - Mọi giao diện web mới (`pumkin3`) đều gọi qua Gateway chuẩn hóa `/api/math/*`.
  - Giữ nguyên `functions/api/ai.js` như một fallback cho các phiên bản web cũ nếu người dùng còn lưu cache Service Worker.
- **Giai đoạn 2 (Sau 30 ngày Production ổn định):**
  - Đặt cờ theo dõi traffic truy cập vào `functions/api/ai.js`.
  - Cấu hình rewrite ngầm (Internal Rewrite) để `functions/api/ai.js` chuyển tiếp request về `functions/api/math/solve`.
- **Giai đoạn 3 (Gỡ bỏ chính thức):**
  - Khi lưu lượng truy cập vào endpoint cũ bằng 0 trong 14 ngày liên tiếp:
  - Tạo bản sao lưu lưu trữ: `backups/deprecated_functions_api_ai_2026.js.bak`.
  - Trình Người phụ trách phê duyệt xóa file khỏi production repo.
