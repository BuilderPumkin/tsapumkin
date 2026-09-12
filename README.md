# 🎃 PUMKIN TSA — NỀN TẢNG KHẢO THÍ TOÁN HỌC & LUYỆN THI ĐÁNH GIÁ TƯ DUY
> **Bản phân phối chuẩn hóa dành riêng cho Cloudflare Pages (Phương án 1)**  
> **Kiến trúc:** Static Single Page Application (SPA) + Cloudflare Pages Functions (Serverless Edge AI Gateway)

---

## 📁 CẤU TRÚC THƯ MỤC `PUMKINTSA`

```text
PUMKINTSA/
│
├── index.html                  # Giao diện chính thi thử, làm bài trắc nghiệm Toán TSA
├── TSA_do_an.html              # Hệ thống luyện thi chuyên sâu Đánh giá tư duy TSA
├── so_tay_kien_thuc.html       # Sổ tay tóm tắt lý thuyết, bẫy sai lầm Toán học
├── index_script.js             # Logic thi, tính giờ, chấm điểm, quản lý trạng thái
├── manifest.webmanifest        # Cấu hình PWA (cài đặt như App trên điện thoại/máy tính)
├── sw.js                       # Service Worker hỗ trợ Offline PWA
│
├── css/                        # Bảng kiểu giao diện (tutor.css, ...)
├── js/                         # Logic mở rộng (js/ai/, js/ui/, js/integration/)
├── data/                       # CSDL bài thi, câu hỏi trắc nghiệm Toán (bundle.json, ...)
├── datasets/                   # Bộ dữ liệu đề thi chuẩn khảo thí
├── docs/                       # Tài liệu kiến trúc và hướng dẫn
├── schemas/                    # JSON Schema xác thực dữ liệu
│
├── functions/                  # CLOUDFLARE PAGES FUNCTIONS (CHẠY SERVERLESS EDGE)
│   ├── index.js                # Health check API
│   └── api/
│       ├── ai.js               # Gateway kết nối Gemini AI bảo mật (đọc Secret từ Cloudflare)
│       ├── health.js           # Kiểm tra trạng thái hệ thống
│       ├── tutor/
│       │   └── message.js      # Alias xử lý tin nhắn Gia sư AI Socratic
│       └── auth/
│           └── [[route]].js    # API Đăng ký, Đăng nhập, khôi phục phiên đa thiết bị
│
├── _headers                    # Cấu hình bảo mật Cloudflare (CORS, CSP, Cache CDN)
├── _routes.json                # Định tuyến Cloudflare Pages (Tối ưu tốc độ tải tĩnh)
├── wrangler.jsonc              # Cấu hình triển khai Cloudflare Wrangler
├── package.json                # Khai báo scripts build và deploy
├── .gitignore                  # BẢO VỆ BÍ MẬT: Chặn .env, cache, không để lộ lên Git
└── .env.example                # Mẫu biến môi trường (KHÔNG CHỨA KEY THẬT)
```

---

## 🔒 HƯỚNG DẪN BẢO MẬT: LÀM SAO ĐỂ KHÔNG BỊ LỘ API KEY (PHƯƠNG ÁN 1)

### 1. Nguyên lý bảo vệ API Key tuyệt đối
- Trong thư mục `PUMKINTSA`, **tuyệt đối không có bất kỳ file HTML, JS hay CSS nào chứa API Key của bạn**.
- Toàn bộ lời gọi AI của học sinh từ trình duyệt chỉ gửi tới đường dẫn nội bộ: `/api/tutor/message` hoặc `/api/ai`.
- Máy chủ Edge của Cloudflare sẽ tiếp nhận yêu cầu, đọc `GEMINI_API_KEY` từ bộ nhớ bí mật của Cloudflare (`context.env.GEMINI_API_KEY`), gọi sang Google Gemini rồi trả kết quả về.
- **Người dùng hoặc đối tượng xấu bấm F12 (Inspect / Network) chỉ thấy tin nhắn học tập, hoàn toàn KHÔNG THỂ THẤY API Key!**

---

## 🚀 HƯỚNG DẪN TRIỂN KHAI LÊN CLOUDFLARE PAGES (TỪNG BƯỚC CHI TIẾT)

Bạn có thể chọn 1 trong 2 cách dưới đây:

### CÁCH A: KẾT NỐI QUA GITHUB (KHUYÊN DÙNG — TỰ ĐỘNG CẬP NHẬT)

#### Bước 1: Đẩy thư mục `PUMKINTSA` lên GitHub
1. Mở terminal tại thư mục `PUMKINTSA`:
   ```bash
   cd PUMKINTSA
   git init
   git add .
   git commit -m "Deploy PUMKIN TSA to Cloudflare Pages"
   ```
2. Tạo một Repository mới trên GitHub (ví dụ đặt tên `pumkin-tsa`).
3. Đẩy code lên GitHub:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<tai-khoan-cua-ban>/pumkin-tsa.git
   git push -u origin main
   ```
   *(File `.gitignore` sẽ tự động chặn mọi file `.env`, đảm bảo an toàn tuyệt đối).*

#### Bước 2: Tạo dự án trên Cloudflare Pages
1. Đăng nhập [dash.cloudflare.com](https://dash.cloudflare.com/).
2. Chọn menu **Workers & Pages** $\rightarrow$ **Create application** $\rightarrow$ Thẻ **Pages**.
3. Chọn **Connect to Git** $\rightarrow$ Chọn repository `pumkin-tsa` vừa tạo.
4. Tại phần thiết lập:
   - **Project name:** `pumkin-tsa` (hoặc tên tùy chọn).
   - **Framework preset:** Chọn **None** (hoặc để trống).
   - **Build command:** *Để trống* (None).
   - **Build output directory:** `.` (hoặc để trống).
5. Nhấn **Save and Deploy**.

---

### BƯỚC BẮT BUỘC ĐỂ KÍCH HOẠT AI (CÀI ĐẶT API KEY AN TOÀN TRÊN CLOUDFLARE)

Ngay sau khi dự án được tạo, bạn làm theo các bước sau để nạp API Key mà **KHÔNG BAO GIỜ BỊ LỘ**:

1. Tại trang quản trị dự án trên Cloudflare Dashboard, vào tab **Settings**.
2. Chọn mục **Variables and Secrets** (hoặc **Environment variables**).
3. Nhấp vào nút **Add** (hoặc **Add variable**):
   - **Variable name (Tên biến):** `GEMINI_API_KEY`
   - **Value (Giá trị):** Dán mã API Key của bạn (bắt đầu bằng `AQ.Ab8RN6LSJBdy...`)
   - **Type (Loại):** Chọn **Encrypt** (hoặc **Secret**) để mã hóa biến này.
4. Thêm một biến thứ hai (tùy chọn nhưng khuyến nghị):
   - **Variable name:** `GEMINI_MODEL`
   - **Value:** `gemini-3.6-flash`
5. Nhấn **Save** (Lưu lại).
6. Vào tab **Deployments** $\rightarrow$ Bấm vào nút ba chấm ở lần deploy mới nhất $\rightarrow$ Chọn **Retry deployment** (hoặc đẩy 1 commit mới) để Cloudflare nhận biến môi trường mới.

**🎉 XONG!** Website của bạn đã hoạt động đầy đủ tại địa chỉ:  
`https://pumkin-tsa.pages.dev`  
Học sinh có thể trò chuyện với Trợ lý Gia sư AI Socratic, làm bài thi, đăng ký/đăng nhập tài khoản mà API Key của bạn được bảo mật an toàn 100%!

---

### CÁCH B: TRIỂN KHAI QUA LỆNH WRANGLER CLI (DÀNH CHO LẬP TRÌNH VIÊN)

Nếu máy bạn đã cài Node.js:
1. Mở PowerShell trong thư mục `PUMKINTSA`:
   ```powershell
   npx wrangler pages deploy . --project-name=pumkin-tsa
   ```
2. Thêm Secret bảo mật trực tiếp bằng lệnh:
   ```powershell
   npx wrangler pages secret put GEMINI_API_KEY --project-name=pumkin-tsa
   ```
   *(Nhập API Key khi được hỏi, khóa sẽ được mã hóa đẩy thẳng lên Cloudflare).*

---

## 🛡️ TỔNG KẾT DANH SÁCH KIỂM TRA BẢO MẬT (SECURITY CHECKLIST)
- [x] Không có API Key trong bất kỳ file mã nguồn tĩnh nào (`.html`, `.js`, `.css`).
- [x] Đã cấu hình `.gitignore` chặn toàn bộ file `.env*`, `.wrangler/`, file log.
- [x] Gia sư AI gọi thông qua Cloudflare Serverless Function (`/api/ai` & `/api/tutor/message`).
- [x] API Key được lưu trữ độc quyền trong Cloudflare Encrypted Secrets.
- [x] Hệ thống xác thực (`/api/auth/*`) sử dụng Web Crypto API không lưu mật khẩu dạng rõ.