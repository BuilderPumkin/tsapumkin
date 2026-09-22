# Cấu Hình DNS & Tên Miền Chuẩn Production (PUMKIN.DEV)

Tài liệu này hướng dẫn chi tiết quy chuẩn cấu hình DNS, chứng chỉ SSL/TLS và bản ghi bảo vệ tên miền (Anti-spoofing) cho nền tảng **PUMKIN.DEV** được triển khai trên **Cloudflare Pages**.

---

## 1. Thông Tin Triển Khai Hiện Tại

- **Cloudflare Pages Project Name:** `tsapumkin`
- **Default Subdomain:** `https://tsapumkin.pages.dev`
- **Tên miền sản xuất mục tiêu:** `pumkin.dev` và `www.pumkin.dev`

---

## 2. Bảng Cấu Hình Bản Ghi DNS (DNS Records)

Nếu tên miền `pumkin.dev` được quản lý bởi Cloudflare DNS (khuyến nghị để tận dụng CNAME flattening và Proxy):

| Loại (Type) | Tên (Name) | Đích trỏ đến (Target / Content) | Proxy Status | TTL | Mục đích |
|:---:|:---:|:---:|:---:|:---:|:---|
| **CNAME** | `@` (apex) | `tsapumkin.pages.dev` | **Proxied** (Orange Cloud) | Auto | Trỏ tên miền gốc `pumkin.dev` về Cloudflare Pages |
| **CNAME** | `www` | `tsapumkin.pages.dev` | **Proxied** (Orange Cloud) | Auto | Trỏ `www.pumkin.dev` về Cloudflare Pages |
| **TXT** | `_cf-custom-hostname` | *(Giá trị do Cloudflare Pages cấp)* | DNS only | Auto | Xác minh sở hữu tên miền nếu dùng DNS bên thứ ba |

> **Lưu ý:** Trên Cloudflare DNS, bản ghi `CNAME` tại `@` được tự động chuyển đổi thành CNAME Flattening (tương thích hoàn toàn với chuẩn RFC 1034).

---

## 3. Cấu Hình SSL / TLS Trên Cloudflare Dashboard

Truy cập **Cloudflare Dashboard > SSL/TLS**:

1. **Encryption Mode:** Chọn **Full (Strict)**  
   Đảm bảo toàn bộ lưu lượng giữa Client -> Edge Cloudflare -> Origin đều được mã hóa bằng chứng chỉ số hợp lệ.
2. **Edge Certificates:**
   - **Always Use HTTPS:** Bật (`ON`) — tự động chuyển hướng HTTP (port 80) sang HTTPS (port 443) với mã 301.
   - **HSTS (HTTP Strict Transport Security):** Bật (`ON`).
     - Max Age: `12 months (31536000 seconds)`
     - Include Subdomains: `ON`
     - Preload: `ON`
   - **Minimum TLS Version:** Chọn `TLS 1.2` hoặc `TLS 1.3` (nghiêm cấm TLS 1.0 và 1.1 đã lỗi thời).
   - **Automatic HTTPS Rewrites:** Bật (`ON`).

---

## 4. Bảo Vệ Email & Chống Giả Mạo Thương Hiệu (SPF, DKIM, DMARC)

Nếu tên miền `pumkin.dev` không gửi email trực tiếp, bắt buộc phải cấu hình các bản ghi chặn giả mạo (Null MX / Strict SPF) để tránh bị tin tặc sử dụng tên miền gửi email lừa đảo học sinh:

### 4.1 Bản ghi SPF (Sender Policy Framework)
- **Type:** `TXT`
- **Name:** `@`
- **Content:** `v=spf1 ~all` (hoặc `-all` nếu không có dịch vụ gửi mail nào)

### 4.2 Bản ghi DMARC
- **Type:** `TXT`
- **Name:** `_dmarc`
- **Content:** `v=DMARC1; p=reject; sp=reject; pct=100; rua=mailto:security@pumkin.dev`
- *Ý nghĩa:* Yêu cầu tất cả các máy chủ mail trên toàn cầu từ chối (`reject`) mọi email giả mạo gửi từ `@pumkin.dev`.

### 4.3 Bản ghi Null MX (Nếu không có máy chủ nhận mail)
- **Type:** `MX`
- **Name:** `@`
- **Content:** `.` (Dấu chấm đại diện Null MX theo RFC 7505)
- **Priority:** `0`

---

## 5. Quy Trình Thêm Tên Miền Custom Vào Cloudflare Pages

1. Đăng nhập vào [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Chọn **Workers & Pages** > Chọn dự án **`tsapumkin`**.
3. Chuyển sang tab **Custom domains**.
4. Nhấn **Set up a custom domain**.
5. Nhập `pumkin.dev` và nhấn **Continue** > Cloudflare sẽ tự động tạo bản ghi DNS và cấp phát chứng chỉ SSL Universal trong vòng 1-5 phút.
6. Lặp lại bước 4 và 5 cho tên miền `www.pumkin.dev`.
