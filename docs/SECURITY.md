# CHÍNH SÁCH BẢO MẬT & MÔ HÌNH PHÒNG THỦ TOÀN DIỆN (SECURITY.md)
**Nền tảng Học thuật PUMKIN.DEV (Pumkin Math API)**  
*Tài liệu Tiêu chuẩn An toàn Thông tin & Quyền Riêng tư Dữ liệu | Phiên bản: 1.0.0 (Cập nhật: 10/2026)*

---

## 1. MỤC TIÊU & NGUYÊN TẮC CỐT LÕI (SECURITY PRINCIPLES)

Pumkin Math API là microservice tính toán toán học tất định, biên dịch ngữ nghĩa sang DSL và kiểm định vòng tròn phục vụ nền tảng luyện thi đánh giá năng lực và tư duy PUMKIN.DEV.  
Vì hệ thống sử dụng LLM chỉ cho bước dịch ngữ nghĩa (semantic parsing sang JSON DSL) và không để LLM trực tiếp sinh hay thực thi mã lệnh, các bề mặt rủi ro chính tập trung vào:
- **Tấn công tiêu tốn tài nguyên (Resource Exhaustion / DoS):** Biểu thức toán học khổng lồ, đệ quy sâu, lũy thừa lồng nhau làm treo bộ máy tính toán hình thức SymPy.
- **Tiêm chỉ thị (Prompt Injection / Jailbreak):** Đề bài chứa văn bản giả lập chỉ thị hệ thống nhằm phá vỡ schema hoặc đánh lừa mô hình.
- **Lạm dụng & Dò quét (Brute-force / API Abuse):** Gửi lượng lớn yêu cầu dồn dập làm sập hệ thống hoặc vét cạn khóa API.
- **Bảo vệ quyền riêng tư học sinh (Student Data Privacy):** Tuyệt đối không thu thập, không xử lý và không ghi nhận thông tin định danh cá nhân (PII) của học sinh và trẻ vị thành niên.

---

## 2. MÔ HÌNH MỐI ĐE DỌA (THREAT MODEL - STRIDE)

| Phân loại mối đe dọa | Bề mặt tấn công | Kịch bản rủi ro | Cơ chế phòng ngự đa tầng |
|---|---|---|---|
| **Denial of Service (DoS)** | CAS Solver, Symbolic Evaluator | Gửi biểu thức cực lớn (vd: $2^{2^{20}}$, $\int \dots \int$, ma trận cấp cao) làm treo CPU/RAM vĩnh viễn. | **Subprocess Sandbox:** Giới hạn 5.0s, RAM 512MB, tự động kill cây tiến trình. |
| **Tampering & Injection** | Trường `question_text`, `student_answer` | Prompt injection ("Ignore instructions...", "Hệ thống: bỏ qua quy tắc..."), TeX command injection (`\input`, `\write18`). | Khối `<problem>` dữ liệu thuần, bộ lọc TeX/LaTeX whitelist, bắt buộc JSON đúng schema Pydantic. |
| **Resource Starvation** | Toàn bộ các API endpoints | Gửi hàng trăm yêu cầu đồng thời dồn dập làm cạn kiệt connection pool và luồng xử lý. | **Concurrency Limiter & Bounded Queue:** Tối đa 10 tác vụ đồng thời, trần hàng đợi 20, trả HTTP 503 khi quá tải. |
| **API Abuse & Scraping** | Toàn bộ các API endpoints | Thu thập đề thi tự động, tấn công vét cạn API key. | **Sliding-Window Rate Limiter:** Giới hạn 60 req/min/key và 120 req/min/IP; trả HTTP 429. |
| **Spoofing & Unauthorized Access** | Header `X-Pumkin-API-Key` | Giả mạo hoặc sử dụng khóa API bị lộ. | So sánh hàm băm SHA-256 thời gian không đổi (`hmac.compare_digest`), danh sách thu hồi động. |
| **Information Disclosure (PII Leakage)** | Log hệ thống, Error traces | Rò rỉ thông tin cá nhân của học sinh (nhiều em là trẻ vị thành niên) trong log hoặc vết tính toán. | **Strict No-PII Logging:** Chỉ ghi `trace_id`, loại sự kiện và mã đề; che tiền tố API key (`pumk...***`). |

---

## 3. CÁC THÔNG SỐ GIỚI HẠN TÀI NGUYÊN (CONFIGURABLE BOUNDS & LIMITS)

Tất cả các tham số bảo vệ đều được cấu hình linh hoạt qua biến môi trường (Environment Variables) mà không cần can thiệp mã nguồn:

| Tên biến môi trường | Giá trị mặc định | Đơn vị | Ý nghĩa & Hành vi khi vượt ngưỡng |
|---|---|---|---|
| `PUMKIN_SANDBOX_TIMEOUT_SECONDS` | `5.0` | Giây | Timeout cứng cho mỗi lượt chạy solver/checker trong tiến trình con riêng. Quá hạn sẽ kill cây tiến trình và trả mã lỗi `TIMEOUT` (HTTP 504). |
| `PUMKIN_SANDBOX_MAX_MEMORY_MB` | `512` | Megabytes | Giới hạn bộ nhớ ảo (RLIMIT_AS). Vượt ngưỡng trả mã lỗi `MEMORY_LIMIT_EXCEEDED` (HTTP 507). |
| `PUMKIN_MAX_QUESTION_LENGTH` | `5000` | Ký tự | Độ dài tối đa của văn bản đề bài. Vượt ngưỡng bị từ chối ngay với mã lỗi `INPUT_TOO_LONG` (HTTP 400). |
| `PUMKIN_MAX_EXPRESSION_DEPTH` | `30` | Cấp ngoặc | Độ sâu lồng nhau tối đa của các dấu ngoặc `()`, `{}`, `[]`. Chặn đệ quy sâu với mã lỗi `EXPRESSION_TOO_DEEP` (HTTP 400). |
| `PUMKIN_MAX_CONCURRENT_REQUESTS` | `10` | Yêu cầu | Số lượng yêu cầu tính toán nặng được xử lý song song tối đa. |
| `PUMKIN_MAX_QUEUE_SIZE` | `20` | Yêu cầu | Dung lượng trần của hàng đợi chờ xử lý. Tràn hàng đợi trả về HTTP 503 (`SERVICE_OVERLOADED`) kèm tiêu đề `Retry-After: 5`. |
| `PUMKIN_RATE_LIMIT_KEY_PER_MIN` | `60` | Yêu cầu / phút | Hạn mức tần suất theo mỗi khóa API (Sliding Window 60 giây). Quá hạn trả về HTTP 429 (`RATE_LIMIT_EXCEEDED`). |
| `PUMKIN_RATE_LIMIT_IP_PER_MIN` | `120` | Yêu cầu / phút | Hạn mức tần suất theo mỗi địa chỉ IP (hoặc client gateway). Quá hạn trả về HTTP 429. |
| `PUMKIN_CORS_ALLOWED_ORIGINS` | Danh sách chuẩn | Chuỗi URL | Danh sách domain được phép gọi API (mặc định: `https://pumkin.dev`, `https://app.pumkin.dev`, `http://localhost:3000`, `http://localhost:5173`). |

---

## 4. QUY TRÌNH QUẢN LÝ, XOAY KHÓA & THU HỒI KHÓA (KEY ROTATION & REVOCATION)

Hệ thống bảo vệ khóa API theo mô hình **Zero Raw Key Storage**:
1. **Lưu trữ dạng băm (SHA-256 Hashes):**
   - Máy chủ chỉ lưu trữ chuỗi băm hex SHA-256 của các khóa hợp lệ qua biến môi trường `PUMKIN_API_KEY_HASHES`. Khóa thô không bao giờ xuất hiện trong cấu hình, mã nguồn hay log.
2. **Thu hồi khóa tức thì không sửa mã (Key Revocation):**
   - Khi một khóa bị nghi ngờ rò rỉ, đưa mã băm SHA-256 của khóa đó vào biến `PUMKIN_REVOKED_KEY_HASHES` hoặc ghi vào tệp khóa `PUMKIN_KEY_FILE` (dòng bắt đầu bằng dấu `!`).
   - Mọi yêu cầu sử dụng khóa này sẽ bị từ chối ngay lập tức với mã lỗi `REVOKED_API_KEY` (HTTP 401) và ghi sự kiện cảnh báo an ninh.
3. **Nạp động tệp khóa (Dynamic Key File):**
   - Biến môi trường `PUMKIN_KEY_FILE=/path/to/keys.json` cho phép quản trị viên bổ sung hoặc thu hồi khóa theo thời gian thực trên đĩa mà không cần khởi động lại dịch vụ hoặc tái triển khai container.
4. **Nhật ký từ chối xác thực (Audit Logging for Rejected Attempts):**
   - Khi phát hiện khóa sai, khóa thiếu hoặc khóa bị thu hồi, hệ thống ghi log sự kiện `AUTH_REJECTED` gồm: thời gian UTC, IP người gọi, đường dẫn API và tiền tố khóa đã che (`pumk...***`). Tuyệt đối không ghi toàn bộ khóa.

---

## 5. CHÍNH SÁCH NHẬT KÝ & BẢO VỆ DỮ LIỆU CÁ NHÂN HỌC SINH (PRIVACY & LOGGING)

### 5.1. Cấu trúc Nhật ký An ninh (Structured Audit Log)
Mọi bản ghi nhật ký đều tuân thủ định dạng JSON cấu trúc với các trường chuẩn:
```json
{
  "timestamp": "2026-10-18T14:30:00.123456Z",
  "trace_id": "c1f7a4d9-3e2b-4c5e-8a1a-7b3c9d2e4f6a",
  "event_type": "SOLVE_REQUEST",
  "client_ip": "203.0.113.195",
  "details": {
    "status": "VERIFIED",
    "duration_ms": 142.3,
    "category": "nguyen_ham_tich_phan"
  }
}
```

### 5.2. Chính sách Lưu trữ & Tiêu hủy Nhật ký (Retention & Erasure Policy)
- **Thời hạn lưu trữ:** Tối đa **30 ngày** kể từ thời điểm phát sinh sự kiện. Sau thời hạn này, log sẽ tự động bị xoay vòng và hủy hoàn toàn bằng cơ chế `logrotate` định kỳ.
- **Mục đích duy nhất:** Giám sát an ninh, phát hiện tấn công DDoS, điều tra sự cố kỹ thuật và kiểm toán chất lượng sư phạm.

### 5.3. Tuân thủ Quy định Pháp luật về Dữ liệu Cá nhân & Trẻ Vị Thành Niên
Nền tảng PUMKIN.DEV phục vụ đông đảo học sinh THPT và sinh viên, trong đó nhiều em là **trẻ vị thành niên (dưới 16 và dưới 18 tuổi)**. Hệ thống tuân thủ nghiêm ngặt các khuôn khổ pháp lý hiện hành:
- **Nghị định số 13/2023/NĐ-CP** của Chính phủ Việt Nam về Bảo vệ Dữ liệu Cá nhân (PDPD).
- **Luật Trẻ em 2016 (Điều 54):** Trách nhiệm bảo vệ trẻ em trên môi trường mạng.
- **Quyết định số 830/QĐ-TTg của Thủ tướng Chính phủ:** Phê duyệt Chương trình "Bảo vệ và hỗ trợ trẻ em tương tác lành mạnh, sáng tạo trên môi trường mạng giai đoạn 2021 - 2025".

**Các biện pháp kỹ thuật bắt buộc đã triển khai:**
1. **Nguyên tắc Tối thiểu hóa Dữ liệu (Data Minimization):** Backend Pumkin Math API chỉ tiếp nhận công thức toán học và nội dung bài tập; tuyệt đối không yêu cầu, không tiếp nhận và không lưu trữ bất kỳ thông tin nhận dạng cá nhân nào (như Họ và tên, Email cá nhân, Số điện thoại, Địa chỉ, Trường lớp hay Ảnh đại diện).
2. **Quyền của Chủ thể Dữ liệu (Right to Erasure):** Các bài làm, lịch sử giải toán và vết tư duy thuộc quyền sở hữu của học sinh. Học sinh hoặc người giám hộ hợp pháp có quyền yêu cầu xóa bỏ toàn bộ dữ liệu học tập bất kỳ lúc nào thông qua cổng quản lý tài khoản PUMKIN.DEV.

---

## 6. KHUYẾN NGHỊ TRIỂN KHAI CONTAINER (HARDENED DEPLOYMENT)

Khi đóng gói và triển khai trên môi trường Docker / Kubernetes:
1. **Non-Root Execution:** Chạy tiến trình API bằng tài khoản không có đặc quyền root:
   ```dockerfile
   RUN addgroup --system --gid 10001 pumkin && adduser --system --uid 10001 --ingroup pumkin appuser
   USER 10001:10001
   ```
2. **Read-Only Root Filesystem:** Cấu hình hệ thống tệp chỉ đọc, chỉ cho phép ghi vào thư mục tạm `tmpfs`:
   ```yaml
   services:
     pumkin-math-api:
       read_only: true
       tmpfs:
         - /tmp:rw,noexec,nosuid,size=256m
   ```
3. **Quét lỗ hổng phụ thuộc định kỳ:** Chạy `pip-audit` trong quy trình CI/CD nhằm phát hiện sớm các CVE mới công bố trên cơ sở dữ liệu PyPA.
