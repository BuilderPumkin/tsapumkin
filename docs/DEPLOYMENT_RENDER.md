# HƯỚNG DẪN TRIỂN KHAI PUMKIN MATH API TRÊN RENDER & CLOUDFLARE PAGES

> **Mục tiêu:** Vận hành dịch vụ tính toán toán học tất định (Pumkin Math API) kết hợp Cloudflare Pages Gateway cho nền tảng PUMKIN.DEV.  
> **Nguyên tắc an toàn bảo mật:** Tuyệt đối không lưu khóa bí mật ở máy khách (trình duyệt). Khóa được bảo vệ hoàn toàn tại tầng biên Cloudflare Functions và Render.

---

## 1. CHÍNH SÁCH HIỆN HÀNH CỦA GÓI RENDER FREE TIER (TRA CỨU CHÍNH THỨC)

Theo tài liệu chính thức từ [Render Documentation - Free Web Services](https://render.com/docs/free):

| Thuộc tính | Quy định chính thức của Render Free Tier | Tác động thực tế đối với Pumkin Math API |
| :--- | :--- | :--- |
| **Tài nguyên CPU** | **0.1 vCPU** (chia sẻ) | Đủ cho các bài toán giải tích SymPy vừa và nhỏ. Các bài toán tích phân nặng (King's Rule) có thể mất từ 1 - 3 giây. |
| **Bộ nhớ RAM** | **512 MB** | Phù hợp với container Python 3.11-slim (chiếm ~120MB khi chạy ASGI Uvicorn). |
| **Cơ chế ngủ (Spin-down)** | Tự động ngủ sau **15 phút** không có lưu lượng truy cập HTTP. | Khi học sinh không truy cập trong 15 phút, container sẽ tạm dừng hoàn toàn để tiết kiệm tài nguyên. |
| **Khởi động nguội (Cold Start)** | Mất khoảng **50 giây đến 1 phút** để khởi động lại container khi có request mới. | Request đầu tiên sau khi ngủ sẽ gặp độ trễ cao. Gateway đã được cài đặt timeout 20s và tự động phát hiện cold start để thông báo cho học sinh. |
| **Hạn mức giờ chạy** | **750 giờ/tháng** miễn phí cho mỗi workspace. | Đủ chạy liên tục 1 dịch vụ cả tháng (744 giờ) nếu được giữ thức, hoặc chia sẻ giữa các dịch vụ. |
| **Băng thông ra (Bandwidth)** | **100 GB/tháng** miễn phí. | Hoàn toàn dồi dào đối với API JSON (mỗi payload phản hồi chỉ 2 - 5 KB, tương đương >20 triệu requests). |
| **Hệ thống tệp** | **Ephemeral** (tệp cục bộ bị xóa sạch khi khởi động lại). | Hoàn toàn tương thích vì Pumkin Math API là stateless microservice (không ghi tệp lâu dài). |

---

## 2. PHÂN TÍCH COLD START & CHIẾN LƯỢC TỐI ƯU HÓA

### A. Cơ chế ứng phó tại tầng Gateway & Giao diện
- **Gateway Cloudflare Functions:** Giới hạn thời gian chờ tối đa là **20 giây**. Khi container Render đang ngủ, Gateway sẽ không để trình duyệt bị treo vô tận mà chủ động trả về mã lỗi `504` kèm cờ `is_cold_start: true`.
- **Giao diện Web:** Hiển thị thông báo thân thiện:  
  *“Máy chủ tính toán đang khởi động nguội (cold start). Quá trình đánh thức đang diễn ra (mất khoảng 30-50 giây). Vui lòng bấm nút 'Thử lại'.”*  
  Học sinh chỉ cần bấm nút **“Thử lại”** (gắn bằng `addEventListener`) là hoàn tất bài giải.

### B. Chiến lược giảm thiểu Cold Start
1. **Đánh thức trước giờ cao điểm (Pre-warming):**  
   Vào các khung giờ học sinh tập trung ôn thi nhiều nhất (ví dụ: 19:00 – 22:00 các ngày trong tuần), thiết lập một cron job (dùng UptimeRobot miễn phí hoặc GitHub Actions Scheduled Workflow) gửi một HTTP GET tới `https://pumkin-math-api.onrender.com/health` mỗi **12 phút một lần**. Container sẽ luôn ở trạng thái "nóng" (hot) và phản hồi trong $< 100\text{ ms}$.
2. **Nâng cấp gói trả phí nhỏ khi thi hoặc demo chính thức:**  
   Vào các tuần tổ chức thi thử diện rộng hoặc ngày thuyết minh sản phẩm, nâng cấp dịch vụ lên gói **Render Starter ($7/tháng)**:
   - 0.5 vCPU, 512 MB RAM.
   - **Hoạt động liên tục 24/7, KHÔNG BAO GIỜ NGỦ, 0 giây Cold Start.**
   - Sau khi kết thúc kỳ thi có thể hạ về gói Free chỉ với 1 click.

---

## 3. HƯỚNG DẪN THIẾT LẬP BẢNG ĐIỀU KHIỂN RENDER (BACKEND)

> ⚠️ **LƯU Ý:** Bạn tự điền các giá trị bí mật vào Render Dashboard. **KHÔNG** gửi hoặc dán các giá trị này vào cửa sổ chat AI.

### Bước 1: Tạo Web Service mới
1. Truy cập [Render Dashboard](https://dashboard.render.com/) $\to$ Bấm **New +** $\to$ Chọn **Web Service**.
2. Kết nối tài khoản GitHub và chọn kho lưu trữ `tsapumkin`.
3. Điền các trường cấu hình:
   - **Name:** `pumkin-math-api`
   - **Region:** `Singapore` (để tối ưu độ trễ thấp nhất về Việt Nam)
   - **Branch:** `feature/math-api` (hoặc `main`)
   - **Root Directory:** `pumkin-math-api`
   - **Runtime:** `Docker` (Render tự động phát hiện `Dockerfile`)
   - **Instance Type:** `Free`

### Bước 2: Thiết lập Biến môi trường & Bí mật trên Render
Chuyển sang tab **Environment** trên Render và thêm các khóa sau:

| Tên biến (Key) | Giá trị hướng dẫn | Ghi chú |
| :--- | :--- | :--- |
| `ENVIRONMENT` | `production` | Bật chế độ vận hành chính thức |
| `MATH_API_KEY_HASHES` | `<MÃ_BĂM_SHA256>` | Danh sách mã băm SHA-256 (phân tách bằng dấu phẩy) của khóa bí mật. *(Xem cách tự sinh bên dưới)* |
| `CORS_ORIGINS` | `https://tsapumkin.pages.dev,https://pumkin.dev,https://www.pumkin.dev` | Chỉ cho phép tên miền được cấp phép |
| `LOG_LEVEL` | `INFO` | Ghi log chuẩn, không ghi thông tin nhạy cảm |
| `MAX_CONCURRENT_REQUESTS`| `20` | Giới hạn số yêu cầu đồng thời |

#### 🔑 Cách tự sinh mã băm SHA-256 cho khóa bí mật (Chạy trên máy cục bộ của bạn):
Mở terminal máy tính (PowerShell trên Windows hoặc Terminal trên Mac/Linux), tạo một chuỗi khóa bí mật ngẫu nhiên (ví dụ `pmk_live_sec_abcdef123456`) rồi băm thành SHA-256:

- **Trên PowerShell:**
  ```powershell
  $key = "pmk_live_sec_thay_bang_khoa_cua_ban"
  $hasher = [System.Security.Cryptography.SHA256]::Create()
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($key)
  $hash = [System.BitConverter]::ToString($hasher.ComputeHash($bytes)).Replace("-","").ToLower()
  Write-Host "Mã băm cần điền vào Render: $hash"
  ```

- **Trên Bash/Linux:**
  ```bash
  echo -n "pmk_live_sec_thay_bang_khoa_cua_ban" | sha256sum | awk '{print $1}'
  ```

---

## 4. HƯỚNG DẪN THIẾT LẬP BẢNG ĐIỀU KHIỂN CLOUDFLARE PAGES (GATEWAY)

### Bước 1: Cấu hình Environment Variables trên Cloudflare
1. Truy cập [Cloudflare Dashboard](https://dash.cloudflare.com/) $\to$ **Workers & Pages** $\to$ Chọn dự án `tsapumkin`.
2. Vào **Settings** $\to$ **Environment variables** $\to$ Bấm **Add variables** (áp dụng cho cả Production và Preview):
   - `MATH_API_URL`: Điền URL dịch vụ Render của bạn (ví dụ: `https://pumkin-math-api.onrender.com`).
   - `MATH_API_KEY`: Điền chính xác **chuỗi khóa bí mật nguyên bản** (chưa băm) mà bạn đã tạo ở trên (ví dụ `pmk_live_sec_thay_bang_khoa_cua_ban`).
   - `CORS_ORIGINS`: `https://tsapumkin.pages.dev,https://pumkin.dev,https://www.pumkin.dev`

### Bước 2: Ràng buộc Cloudflare KV cho Rate Limiting & Caching
1. Trong Cloudflare Dashboard $\to$ **Workers & Pages** $\to$ **KV** $\to$ Bấm **Create a namespace** $\to$ Đặt tên `pumkin-math-kv`.
2. Quay lại dự án Pages `tsapumkin` $\to$ **Settings** $\to$ **Functions** $\to$ Kéo xuống mục **KV namespace bindings** $\to$ Bấm **Add binding**:
   - **Variable name:** `MATH_KV`
   - **KV namespace:** Chọn `pumkin-math-kv` vừa tạo.
3. Bấm **Save**.

---

## 5. KIỂM THỬ XÁC MINH TOÀN DIỆN (ACCEPTANCE CHECKLIST)

1. **Kiểm tra rò rỉ khóa bí mật:**
   - Mở cửa sổ ẩn danh (Incognito Window) $\to$ Truy cập bản Preview PR của Cloudflare Pages.
   - Mở DevTools (F12) $\to$ Tab **Network** $\to$ Lọc `/api/math/solve`.
   - Kiểm tra Headers gửi từ trình duyệt: Tuyệt đối **KHÔNG CÓ** `X-Pumkin-API-Key` hay chuỗi khóa bí mật. Khóa hoàn toàn được Cloudflare Functions tiêm ngầm khi gọi sang Render.
2. **Kiểm tra kịch bản Cold Start:**
   - Để Render ngủ 15 phút không gọi.
   - Gửi bài toán từ Web $\to$ Web hiển thị thông báo "Máy chủ đang khởi động nguội...".
   - Sau 40-50 giây, bấm "Thử lại" $\to$ Bài toán giải thành công, hiển thị đầy đủ các bước KaTeX và huy hiệu `Đã kiểm chứng bằng máy đại số`.
3. **Kiểm tra Rate Limit (30 req/phút):**
   - Dùng script hoặc bấm giải liên tục $\to$ Từ yêu cầu 31 trở đi nhận thông báo HTTP 429: "Bạn đã gửi quá nhiều yêu cầu trong thời gian ngắn".
4. **Kiểm tra Cache Hit:**
   - Giải 1 bài toán lần 1 $\to$ Nhận header `X-Pumkin-Cache: MISS`.
   - Bấm giải lại đúng bài toán đó $\to$ Nhận phản hồi tức thì ($< 20\text{ ms}$) kèm header `X-Pumkin-Cache: HIT`.
