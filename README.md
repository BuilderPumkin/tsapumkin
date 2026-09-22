# 🎃 PUMKIN TSA — NỀN TẢNG KHẢO THÍ TOÁN HỌC & LUYỆN THI ĐÁNH GIÁ TƯ DUY (PUMKIN2)
> **Bản phân phối chuẩn hóa dành riêng cho Cloudflare Pages**  
> **Kiến trúc:** Static Single Page Application (SPA) + Cloudflare Pages Functions (Serverless Edge AI Gateway với Gemini 3.6 Flash)

---

## 📁 CẤU TRÚC DỰ ÁN
```text
PUMKIN2/
├── public/                       # THƯ MỤC CHỨA TẤT CẢ TÀI NGUYÊN WEB TĨNH (Build output: public)
│   ├── index.html                # Giao diện chính thi thử, làm bài trắc nghiệm Toán TSA
│   ├── index_script.js           # Logic thi, hệ thống Cấp độ & EXP, tính giờ, chấm điểm
│   ├── TSA_do_an.html            # Hệ thống luyện thi chuyên sâu Đánh giá tư duy TSA
│   ├── so_tay_kien_thuc.html     # Sổ tay tóm tắt lý thuyết, bẫy sai lầm Toán học
│   ├── manifest.webmanifest      # Cấu hình PWA (cài đặt ứng dụng đa nền tảng)
│   ├── sw.js                     # Service Worker hỗ trợ Offline PWA
│   ├── _headers                  # Header bảo mật và CDN Caching của Cloudflare
│   ├── css/                      # Bảng kiểu giao diện (tutor.css, deep_learning.css)
│   ├── js/                       # Core engine, Socratic AI, Math Verifier, Deep Learning HUD
│   ├── data/                     # CSDL bài thi (44 đề thi) và 544 câu hỏi (gồm 25 câu Siêu khó)
│   ├── datasets/                 # Bộ dữ liệu đề thi chuẩn khảo thí
│   ├── docs/                     # Tài liệu kiến trúc học thuật
│   └── schemas/                  # JSON Schema xác thực dữ liệu
│
├── functions/                    # CLOUDFLARE PAGES FUNCTIONS (CHẠY SERVERLESS EDGE)
│   └── api/
│       ├── ai.js                 # Gateway kết nối Gemini 3.6 Flash bảo mật (đọc Secret từ Cloudflare)
│       ├── health.js             # API kiểm tra tình trạng máy chủ
│       ├── tutor/
│       │   └── message.js        # Endpoint gia sư AI Socratic
│       └── auth/
│           └── [[route]].js      # API Đăng ký, Đăng nhập xác thực
│
├── wrangler.toml                 # Cấu hình Cloudflare Pages (pages_build_output_dir = "public")
├── package.json                  # Scripts wrangler dev & deploy
├── .gitignore                    # Chặn lộ bí mật API keys
└── .env.example                  # File mẫu biến môi trường
```

---

## 🚀 HƯỚNG DẪN TRIỂN KHAI LÊN CLOUDFLARE PAGES

### Bước 1: Kết nối Cloudflare Pages với GitHub
1. Truy cập [dash.cloudflare.com](https://dash.cloudflare.com/) và đăng nhập.
2. Chọn **Workers & Pages** $\rightarrow$ **Create application** $\rightarrow$ Chọn thẻ **Pages**.
3. Chọn **Connect to Git** $\rightarrow$ Chọn repository `tsapumkin`.
4. Thiết lập cấu hình Build:
   - **Framework preset:** None
   - **Build command:** *Để trống* (None)
   - **Build output directory:** `public`
5. Bấm **Save and Deploy**.

---

### Bước 2: Cấu hình Gemini 3.6 Flash API Key an toàn
Để kích hoạt tính năng Gia sư AI Socratic mà **hoàn toàn không bị lộ API Key**:
1. Vào dự án của bạn trên Cloudflare Dashboard $\rightarrow$ Tab **Settings**.
2. Chọn mục **Variables and Secrets** (hoặc **Environment variables**).
3. Nhấp vào **Add** (hoặc **Add variable**):
   - **Variable name:** `GEMINI_API_KEY`
   - **Value:** Dán mã Gemini API Key của bạn (lấy miễn phí tại [Google AI Studio](https://aistudio.google.com/)).
   - **Type:** Chọn **Secret** (hoặc Encrypt).
4. *(Tùy chọn)* Thêm biến:
   - **Variable name:** `GEMINI_MODEL`
   - **Value:** `gemini-1.5-flash`
5. Bấm **Save**. Cloudflare sẽ tự động cập nhật và Gia sư AI Socratic sẽ hoạt động tức thì!

---

## 🔒 TÍNH NĂNG NỔI BẬT ĐÃ TÍCH HỢP
1. **Hệ thống Level & EXP Không Giới Hạn:**
   - Cấp 1: 2 EXP, Cấp 2: 3 EXP, mỗi cấp sau tăng 50% EXP (làm tròn lên).
   - Tỉ lệ đúng $>70\%$: +1 EXP (<25 câu), +4 EXP ($\ge 25$ câu).
   - Tỉ lệ đúng $>95\%$: Nhân đôi EXP.
   - Chế độ Khó: $+50\%$ EXP. Chế độ Siêu khó: $\times 3$ EXP khi đúng $100\%$ (cộng dồn hệ số).
   - Độc quyền cho tài khoản đăng ký (khách không hiển thị).
2. **Khóa Chế độ Học sâu (Deep Learning):**
   - Đặt tại Kho kiến thức bên cạnh Sổ tay kiến thức.
   - Nền đỏ bị khóa bởi 2 dây xích chéo và ổ khóa trọng tâm.
   - Tooltip di chuột: `🔒 Yêu cầu cấp 4 để mở khóa`.
   - Tự động mở khóa khi tài khoản vượt cấp 3 (Cấp 4 trở lên).
3. **25 Câu hỏi Siêu khó Tích hợp Đa phân môn:**
   - 5 dạng câu hỏi toán học tư duy đỉnh cao kết hợp Ma trận Markov, Tích phân suy rộng, Hình học Oxyz Cauchy-Schwarz, Phương trình vi phân Euler, và Đồ thị phổ Laplacian.
   - Đầy đủ 3 bẫy nhận thức và thang gợi ý Socratic 4 bậc theo tiêu chuẩn GEMINI.md.
