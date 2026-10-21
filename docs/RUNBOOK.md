# SỔ TAY VẬN HÀNH HỆ THỐNG & ỨNG PHÓ SỰ CỐ TOÀN DIỆN (RUNBOOK.md)
**Quy trình chuẩn (SOP) & Ứng phó sự cố sản xuất — Nền tảng PUMKIN.DEV**  
*Mã tài liệu: SOP-OPS-01 — Phiên bản: 2.0-PRO — Cập nhật: 21/10/2026*

---

## 1. PHÂN CẤP MỨC ĐỘ NGHIÊM TRỌNG (INCIDENT SEVERITY MATRIX)

| Mức độ | Định nghĩa sự cố | Thời gian phản hồi (SLA) | Thẩm quyền quyết định |
| :---: | :--- | :---: | :--- |
| **P1 (Critical)** | - Toàn bộ dịch vụ Math API sập hoặc trả về mã lỗi 5xx trên diện rộng.<br>- Rò rỉ khóa bí mật API Key ra công khai.<br>- Chạm ngưỡng 90% hoặc cạn kiệt ngân sách LLM.<br>- Phát hiện $\ge 2$ báo lỗi trên cùng 1 câu hỏi mang nhãn `Đã kiểm chứng` ("sai mà tự tin"). | **$< 15\text{ phút}$** | Kỹ sư trực ca có quyền kích hoạt **Kill Switch ngay lập tức**. |
| **P2 (Major)** | - Độ trễ p95 vượt quá $1,000\text{ms}$ (CAS) hoặc $6,000\text{ms}$ (LLM) kéo dài $> 10$ phút.<br>- Thời gian khởi động nguội (Cold Start) vượt quá 45 giây liên tục.<br>- Tỷ lệ học sinh bị chặn HTTP 429 vượt quá $5\%$.<br>- 1 tính năng độc lập bị lỗi (ví dụ: `math.check` hỏng trong khi `math.tutor` vẫn chạy). | **$< 60\text{ phút}$** | Kỹ sư trực ca tạm tắt cờ tính năng bị lỗi, báo cáo Lead. |
| **P3 (Moderate)** | - Lỗi hiển thị công thức KaTeX trên 1 câu hỏi cụ thể.<br>- Tỷ lệ câu rơi vào `needs_review` tăng nhẹ ($2\% - 5\%$).<br>- Báo lỗi đơn lẻ của học sinh về cách diễn đạt lời giải. | **$< 24\text{ giờ}$** | Chuyển hàng đợi duyệt cho Giáo viên thẩm định. |
| **P4 (Minor)** | - Lỗi chính tả nhỏ trong văn bản giải thích.<br>- Vấn đề thẩm mỹ giao diện desktop padding không ảnh hưởng bài thi. | **Chu kỳ kế tiếp** | Đưa vào backlog bảo trì thông thường. |

---

## 2. MA TRẬN PHÂN NHIỆM TRÁCH NHIỆM (RACI MATRIX)

| Hoạt động ứng phó sự cố | Kỹ sư trực ca (On-call) | Trưởng ban Học thuật (Academic Lead) | Quản lý phát hành (Release Lead) | Chủ dự án / Phụ trách (Owner) |
| :--- | :---: | :---: | :---: | :---: |
| Phát hiện & Xác thực cảnh báo sự cố | **A / R** | I | C | I |
| Kích hoạt Kill Switch (`MATH_ENABLED=false`) | **R** | I | A | I |
| Điều tra lỗi sai toán học trên câu Verified | C | **A / R** | I | I |
| Xoay khóa khẩn cấp khi nghi vấn lộ | **R** | I | **A** | I |
| Phê duyệt khôi phục dịch vụ sau sự cố P1 | C | C | R | **A** |
| Soạn thảo Báo cáo sau sự cố (Post-Mortem) | **R** | C | **A** | I |

*(R: Responsible - Người thực hiện; A: Accountable - Người chịu trách nhiệm chính; C: Consulted - Người tham vấn; I: Informed - Người được thông báo).*

---

## 3. QUY TRÌNH XỬ LÝ 7 SỰ CỐ ĐIỂN HÌNH (STEP-BY-STEP PROCEDURES)

### Sự cố 1: API Chết / Máy chủ Backend không phản hồi (502/503/504)
- **Dấu hiệu:** Alert P1 từ `tools/health_monitor.mjs`, Gateway trả về 502 Bad Gateway.
- **Bước xử lý:**
  1. *Ngay lập tức ($< 30\text{s}$):* Bật cờ dự phòng: vào Cloudflare Pages $\to$ Environment Variables $\to$ `MATH_ENABLED = "false"`. Web tự động chuyển sang chế độ thuần static với 553 câu chuẩn, học sinh không bị vỡ giao diện.
  2. *Kiểm tra Backend:* Đăng nhập máy chủ hosting (Render / VPS) $\to$ Kiểm tra trạng thái container:
     ```bash
     docker ps -a
     docker logs --tail 100 pumkin-math-api
     ```
  3. *Khởi động lại:* Nếu tiến trình bị chết do OOM hoặc treo cổng:
     ```bash
     docker restart pumkin-math-api
     ```
  4. *Kiểm thử lại:* Chạy probe kiểm tra sức khỏe độc lập:
     ```bash
     curl -i http://localhost:8000/healthz
     ```
  5. *Mở lại dịch vụ:* Khi probe trả về 200 OK $\to$ Đặt lại `MATH_ENABLED = "true"`.

---

### Sự cố 2: Khởi động nguội kéo dài (Cold Start > 45 giây)
- **Dấu hiệu:** Alert P2, học sinh thấy icon xoay tròn kèm thông báo máy chủ đang thức dậy.
- **Bước xử lý:**
  1. Kiểm tra gói dịch vụ host backend: Gói miễn phí (Render Free Tier) tự động sleep sau 15 phút không có request.
  2. *Giải pháp tức thời:* Kích hoạt script keep-alive định kỳ 10 phút một lần (qua cron GitHub Actions hoặc UptimeRobot ping endpoint `/healthz`).
  3. *Thông báo giao diện:* Trình duyệt đã có sẵn card thông báo Cold Start thân thiện và nút "Thử lại", hướng dẫn học sinh đợi 30s hoặc chuyển sang làm đề chuẩn trong kho.

---

### Sự cố 3: Hết ngân sách LLM / Chạm trần chi phí (Budget Cap Breached)
- **Dấu hiệu:** Alert P1, `budgetUsagePercent >= 90%` hoặc nhà cung cấp LLM trả về HTTP 429 Quota Exceeded.
- **Bước xử lý:**
  1. *Khóa tự vệ tầng LLM:* Tắt cờ `FEATURE_MATH_GENERATE = "false"` và `FEATURE_MATH_TUTOR = "false"`. Giữ lại cờ `FEATURE_MATH_CHECK = "true"` (vì tính năng check chỉ dùng CAS nội bộ, 0 tốn token LLM).
  2. *Kiểm tra bảng quản trị LLM:* Đăng nhập Google AI Studio / OpenAI Dashboard $\to$ kiểm tra đột biến token bất thường.
  3. *Điều chỉnh hạn mức:* Nếu là lượng dùng thật từ học sinh ôn thi đột biến $\to$ Người phụ trách phê duyệt nâng trần ngân sách ngày trong `docs/BUDGET_AND_QUOTAS.md`.

---

### Sự cố 4: Tấn công lạm dụng / HTTP 429 hàng loạt (Rate Limit Flooding)
- **Dấu hiệu:** Alert P2, số lượng phản hồi HTTP 429 tăng đột biến từ một dải IP.
- **Bước xử lý:**
  1. Cloudflare Pages WAF tự động kích hoạt bảo vệ tầng biên (Edge Security).
  2. Xác định IP bất thường qua Cloudflare Analytics $\to$ đưa vào danh sách chặn IP (IP Access Rules / Block).
  3. Nếu học sinh trong cùng mạng trường học (cùng NAT IP) bị chặn nhầm: Hướng dẫn nâng trần `MAX_REQUESTS_PER_MINUTE` từ 60 lên 120 trong `functions/api/math/[[path]].js`.

---

### Sự cố 5: Lộ khóa bí mật API (Compromised Key Response)
- **Dấu hiệu:** Alert P1, khóa xuất hiện trên mã nguồn công khai hoặc log bên thứ ba.
- **Bước xử lý (Dưới 60 giây):**
  1. *Vô hiệu hóa tức thì:* Lấy SHA-256 hash của khóa lộ, thêm ngay vào biến môi trường Backend:
     ```bash
     MATH_REVOKED_KEY_HASHES="<HASH_LEAKED_KEY>"
     ```
     Backend sẽ lập tức từ chối mọi yêu cầu mang khóa này với mã `REVOKED_API_KEY`.
  2. *Sinh khóa mới:* Chạy `python tools/make_api_key.py --env production`.
  3. *Cập nhật Cloudflare Pages:* Cập nhật secret `MATH_API_KEY` mới.

---

### Sự cố 6: Đáp án sai được báo hàng loạt trên câu Verified ("Sai mà tự tin")
- **Dấu hiệu:** Alert P1, nhận $\ge 2$ báo lỗi từ học sinh trên cùng 1 câu hỏi `verified`.
- **Bước xử lý:**
  1. Trích xuất câu hỏi từ bảng `feedback`:
     ```bash
     python tools/generate_weekly_telemetry_report.py
     ```
  2. *Cách ly tạm thời:* Thêm câu hỏi vào danh sách ghi đè `data/overrides/answer_overrides.json` với trạng thái `status: "needs_review"`.
  3. Chạy `python tools/build_release.py` $\to$ Câu hỏi sẽ ngay lập tức chuyển huy hiệu sang `[Chưa kiểm chứng]`, loại bỏ rủi ro học sinh học sai kiến thức.
  4. Trưởng ban Học thuật vào thẩm định, đối chiếu lời giải và sửa khóa đáp án nếu ngân hàng cũ bị nhầm.

---

### Sự cố 7: Lỗi hiển thị công thức KaTeX
- **Dấu hiệu:** Alert P3, công thức bị hiển thị dạng mã nguồn thô hoặc vỡ khung.
- **Bước xử lý:**
  1. Kiểm tra chuỗi $\LaTeX$ của câu hỏi qua bộ kiểm tra: `node tools/test_katex_audit.mjs`.
  2. Nếu do lỗi cú pháp thiếu dấu ngoặc hoặc dùng lệnh $\LaTeX$ ngoài tập con cho phép $\to$ sửa trong file ghi đè `data/overrides/` và build lại.
  3. Lưu ý: Client luôn bật `throwOnError: false` trong chế độ hiển thị người dùng để không bao giờ làm sập ứng dụng nếu gặp công thức lạ.

---

## 4. QUY TRÌNH THỰC HIỆN CÔNG TẮC KHẨN CẤP (KILL-SWITCH SOP)

### Thao tác TẮT nhanh (< 30 giây):
```powershell
# Cách 1: Qua giao diện Cloudflare Pages Dashboard
# Settings -> Environment Variables -> Sửa MATH_ENABLED = "false" -> Bấm Save.

# Cách 2: Qua Cloudflare Wrangler CLI
npx wrangler pages secret put MATH_ENABLED --secret "false"
```

### Thao tác BẬT LẠI (Chỉ khi Người phụ trách đã phê duyệt):
```powershell
# 1. Chạy bài test kiểm tra sức khỏe
node tools/health_monitor.mjs

# 2. Đặt lại biến môi trường
npx wrangler pages secret put MATH_ENABLED --secret "true"
```

---

## 5. MẪU THÔNG BÁO CHO NGƯỜI DÙNG (USER ANNOUNCEMENT TEMPLATES)

### Mẫu 1: Banner bảo trì định kỳ / Sự cố máy chủ tính toán
> **🛠️ Thông báo bảo trì dịch vụ:**  
> Tính năng Gia sư Toán AI và Chấm bài tự do đang được tạm dừng để nâng cấp hạ tầng. Các em học sinh vẫn có thể luyện tập bình thường với toàn bộ 44 đề thi chuẩn hóa và 553 câu hỏi trong kho đề. Mọi tiến trình làm bài vẫn được lưu trữ đầy đủ. Xin cảm ơn sự kiên nhẫn của các em!

### Mẫu 2: Cảnh báo sau khi sửa một câu hỏi bị phát hiện sai đáp án
> **📢 Cập nhật học thuật:**  
> Ban chuyên môn PUMKIN.DEV vừa rà soát và hiệu chỉnh đáp án chính xác cho câu hỏi mã số `[MÃ_CÂU]` thuộc đề thi `[TÊN_ĐỀ]`. Điểm số và phân tích kỹ năng của các em đã được hệ thống tự động cập nhật lại chính xác. Cảm ơn các bạn học sinh đã tích cực gửi báo lỗi giúp hoàn thiện nền tảng!

---

## 6. MẪU BÁO CÁO SAU SỰ CỐ KHÔNG ĐỔ LỖI (BLAMELESS POST-MORTEM TEMPLATE)

```markdown
# BÁO CÁO SAU SỰ CỐ (BLAMELESS POST-MORTEM)
**Mã sự cố:** INC-YYYYMMDD-XX
**Mức độ nghiêm trọng:** [P1 / P2 / P3]
**Thời gian bắt đầu:** YYYY-MM-DD HH:MM UTC+7
**Thời gian khôi phục:** YYYY-MM-DD HH:MM UTC+7
**Thời gian gián đoạn (MTTR):** XX phút / giây
**Người tham gia xử lý:** [Tên kíp trực]

### 1. Tóm tắt sự việc
Mô tả ngắn gọn điều gì đã xảy ra, hệ thống phản ứng thế nào, và cách sự cố được giải quyết.

### 2. Tác động người dùng
- Số lượng học sinh bị ảnh hưởng:
- Số lượt yêu cầu tính toán bị lỗi:
- Trải nghiệm bài thi có bị mất mát dữ liệu không: [Có / Không]

### 3. Dòng thời gian chi tiết (Timeline)
- HH:MM: Cảnh báo kích hoạt.
- HH:MM: Kíp trực xác thực sự cố và kích hoạt Kill Switch.
- HH:MM: Xác định nguyên nhân gốc rễ.
- HH:MM: Triển khai bản vá / khởi động lại dịch vụ.
- HH:MM: Health probe xác nhận bình thường, mở lại dịch vụ.

### 4. Phân tích nguyên nhân gốc rễ (5 Whys)
(Phương pháp 5 câu hỏi Tại sao, tập trung vào lỗ hổng quy trình/công nghệ, TUYỆT ĐỐI KHÔNG đổ lỗi cho cá nhân).

### 5. Hành động phòng ngừa & Cải tiến
| STT | Hành động | Loại (Phòng ngừa / Giám sát / Quy trình) | Người chịu trách nhiệm | Hạn chót |
|---|---|---|---|---|
| 1 | | | | |
```
