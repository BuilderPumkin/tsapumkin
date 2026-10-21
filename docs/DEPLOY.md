# HƯỚNG DẪN TRIỂN KHAI VẬN HÀNH PUMKIN MATH API (DEPLOY.md)
*Nền tảng hạ tầng:* **VPS Tự Quản Trị (Ubuntu 22.04 / 24.04 LTS + Docker Compose)**  
*Mô hình kiến trúc:* **Tách biệt độc lập Staging (Preview/PR) và Production**  
*Tiêu chuẩn SRE:* **Zero Secret Exposure, Zero Unscheduled Downtime, Chống OOM Liên Vùng**

---

## 1. Phân Tích Kỹ Thuật & Nguồn Tham Khảo Hạ Tầng

> [!IMPORTANT]
> **Minh bạch số liệu đo lường:**
> - Các thông số độ trễ (**3,95 giây** cold-start warm-up, **93,75 ms** core symbolic CAS, **1,25 giây** consensus) được **đo trên máy phát triển cục bộ Windows 11 x64 (Python 3.13.2, Uvicorn 0.34)**, **KHÔNG PHẢI ĐO TRÊN VPS**.
> - Các con số như *"50 - 100 request/phút"* hay *"~250MB RAM/worker"* là **ước lượng lý thuyết dựa trên tải tính toán của SymPy, CHƯA ĐO TRÊN MÔI TRƯỜNG THỰC TẾ**.
> - Số đo thực tế trên VPS sẽ được đo kiểm và cập nhật lại đầy đủ ngay sau khi bạn dựng xong môi trường Staging.

### 1.1. Bảng đối chiếu hạ tầng & Nguồn tham khảo chính thức
*Nguồn tra cứu dữ liệu ngày 21/10/2026:*
- Hetzner Cloud Pricing & Specifications: [https://www.hetzner.com/cloud](https://www.hetzner.com/cloud)
- DigitalOcean Droplets Specifications: [https://www.digitalocean.com/pricing/droplets](https://www.digitalocean.com/pricing/droplets)
- Cloudflare IP Ranges: [https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/)
- Google AI Studio Pricing: [https://ai.google.dev/pricing](https://ai.google.dev/pricing)

| Tiêu chí | VPS Khuyến nghị (Hetzner CX22 / DO 2GB) | VPS Cơ bản (DO 1GB / AWS t4g.micro) | Hiện trạng kiểm chứng |
| :--- | :---: | :---: | :--- |
| **Cơ chế ngủ đông (Sleep)** | **Không ngủ đông** (24/7) | **Không ngủ đông** (24/7) | Xác nhận theo đặc tính kỹ thuật VPS. Không bị trễ spin-down như PaaS Free Tier. |
| **CPU (vCPU)** | 2 vCPU | 1-2 vCPU (Shared) | SymPy chạy CPU-bound. Số đo năng lực tải thực tế: **Chưa đo trên VPS**. |
| **Dung lượng RAM** | 4 GB (Hetzner) / 2 GB (DO) | 1 GB | Phân bổ Docker: Prod 1024M, Staging 512M. Số đo RAM thực tế: **Chưa đo trên VPS**. |
| **Phòng vệ OOM giữa 2 môi trường** | Giới hạn cứng 1536M tổng 2 container | Cần swap 2GB bổ trợ | **Đã cấu hình trong docker-compose.yml**, đảm bảo Staging không làm OOM Production. |

---

## 2. Kiến Trúc Bảo Mật: Cloudflare Tunnel & Nginx Reverse Proxy

Để đảm bảo an toàn tuyệt đối, **KHÔNG BAO GIỜ MỞ CỔNG 8000/8001 RA INTERNET**.

### 2.1. Phương án Khuyến nghị Số 1: Cloudflare Tunnel (`cloudflared`)
- **Ưu điểm vượt trội:**
  - Không cần mở bất kỳ cổng nào (Port 80/443 đóng hoàn toàn).
  - Không cần mở IP công khai của VPS ra ngoài.
  - Tự động mã hóa TLS từ máy chủ của bạn đến mạng biên Cloudflare.
  - Ngăn chặn 100% các cuộc tấn công DDoS quét IP máy chủ gốc.
- **Cách cài đặt nhanh:**
  ```bash
  # Tải và cài đặt Cloudflare Tunnel
  curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
  sudo dpkg -i cloudflared.deb

  # Đăng nhập và tạo tunnel
  cloudflared tunnel login
  cloudflared tunnel create pumkin-math-tunnel

  # Định tuyến các subdomain về localhost nội bộ:
  # api.pumkin.dev -> http://localhost:8000
  # api-staging.pumkin.dev -> http://localhost:8001
  ```

### 2.2. Phương án Thay thế: Nginx Giới Hạn Nghiêm Ngặt & Allowlist IP Cloudflare
Nếu sử dụng Nginx truyền thống, bắt buộc cấu hình giới hạn kích thước body, rate limit và **CHỈ NHẬN KẾT NỐI TỪ CLOUDFLARE**:

Tệp cấu hình `/etc/nginx/sites-available/pumkin-api.conf`:
```nginx
# 1. Giới hạn tần suất và số kết nối đồng thời
limit_req_zone $binary_remote_addr zone=math_api_req:10m rate=30r/m;
limit_conn_zone $binary_remote_addr zone=math_api_conn:10m;

# 2. Cấu hình Production API (api.pumkin.dev)
server {
    listen 443 ssl http2;
    server_name api.pumkin.dev;

    # SSL Certs do Certbot cấp
    ssl_certificate /etc/letsencrypt/live/api.pumkin.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.pumkin.dev/privkey.pem;

    # Giới hạn kích thước body khớp với Cloudflare Gateway (64 KB)
    client_max_body_size 64k;

    # BẢO MẬT: Chỉ cho phép IP thuộc dải máy chủ Cloudflare (https://www.cloudflare.com/ips/)
    allow 173.245.48.0/20;
    allow 103.21.244.0/22;
    allow 103.22.200.0/22;
    allow 103.31.4.0/22;
    allow 141.101.64.0/18;
    allow 108.162.192.0/18;
    allow 190.93.240.0/20;
    allow 188.114.96.0/20;
    allow 197.234.240.0/22;
    allow 198.41.128.0/17;
    allow 162.158.0.0/15;
    allow 104.16.0.0/13;
    allow 104.24.0.0/14;
    allow 172.64.0.0/13;
    allow 131.0.72.0/22;
    deny all;

    location / {
        limit_req zone=math_api_req burst=10 nodelay;
        limit_conn math_api_conn 5;

        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_read_timeout 25s;
    }
}

# 3. Cấu hình Staging API (api-staging.pumkin.dev)
server {
    listen 443 ssl http2;
    server_name api-staging.pumkin.dev;

    ssl_certificate /etc/letsencrypt/live/api-staging.pumkin.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api-staging.pumkin.dev/privkey.pem;

    client_max_body_size 64k;

    # Chỉ cho phép IP Cloudflare
    allow 173.245.48.0/20;
    allow 103.21.244.0/22;
    allow 103.22.200.0/22;
    allow 103.31.4.0/22;
    allow 141.101.64.0/18;
    allow 108.162.192.0/18;
    allow 190.93.240.0/20;
    allow 188.114.96.0/20;
    allow 197.234.240.0/22;
    allow 198.41.128.0/17;
    allow 162.158.0.0/15;
    allow 104.16.0.0/13;
    allow 104.24.0.0/14;
    allow 172.64.0.0/13;
    allow 131.0.72.0/22;
    deny all;

    location / {
        limit_req zone=math_api_req burst=5 nodelay;
        limit_conn math_api_conn 3;

        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_read_timeout 25s;
    }
}
```

---

## 3. Cấu Hình Docker Compose Chống OOM Giữa Hai Môi Trường

Tệp `/opt/pumkin-math-api/docker-compose.yml`:
```yaml
version: '3.8'

services:
  # --- PRODUCTION CONTAINER ---
  math-api-prod:
    build:
      context: ./repo/pumkin-math-api
      dockerfile: Dockerfile
    image: pumkin-math-api:prod
    container_name: pumkin-math-api-prod
    restart: unless-stopped
    env_file:
      - .env.prod
    # Chỉ mở cổng nội bộ 127.0.0.1, KHÔNG mở ra 0.0.0.0
    ports:
      - "127.0.0.1:8000:8000"
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1024M
        reservations:
          cpus: '0.2'
          memory: 512M
    healthcheck:
      test: ["CMD", "python", "-c", "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')"]
      interval: 20s
      timeout: 5s
      retries: 3

  # --- STAGING CONTAINER ---
  math-api-staging:
    build:
      context: ./repo/pumkin-math-api
      dockerfile: Dockerfile
    image: pumkin-math-api:staging
    container_name: pumkin-math-api-staging
    restart: unless-stopped
    env_file:
      - .env.staging
    ports:
      - "127.0.0.1:8001:8001"
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.1'
          memory: 256M
    healthcheck:
      test: ["CMD", "python", "-c", "import urllib.request; urllib.request.urlopen('http://localhost:8001/health')"]
      interval: 20s
      timeout: 5s
      retries: 3
```
> [!NOTE]
> **Quy hoạch RAM:** `Production (1024M) + Staging (512M) = 1536M`. Trên máy chủ VPS 2GB RAM, còn lại `~512M` cho hệ điều hành Ubuntu, Nginx/Cloudflared và Docker daemon. Hai môi trường hoàn toàn độc lập và không thể làm tràn bộ nhớ (OOM) lẫn nhau.

---

## 4. Danh Mục Biến Môi Trường (Chỉ Liệt Kê TÊN Biến & Nơi Đặt)

> [!CAUTION]
> **Tuyệt đối KHÔNG dán giá trị khóa thật vào chat hay commit vào Git.** Hãy chạy `python tools/make_api_key.py` trên máy của bạn để sinh khóa mới.

### Bảng 1: Cloudflare Pages Dashboard (Settings -> Environment variables)
- **Mục `Production`:**
  - `MATH_API_URL`: URL backend production (`https://api.pumkin.dev`).
  - `MATH_API_KEY`: *(Encrypt / Secret)* Khóa thô sinh từ `python tools/make_api_key.py --env production`.
  - `FEATURE_MATH_API_ENABLED`: Đặt `false` khi chưa mở công khai (dùng tester token) hoặc `true` khi mở chính thức.
  - `MATH_TESTER_TOKENS`: *(Encrypt / Secret)* Danh sách token thử nghiệm nội bộ.
- **Mục `Preview`:**
  - `MATH_API_URL`: URL backend staging (`https://api-staging.pumkin.dev`).
  - `MATH_API_KEY`: *(Encrypt / Secret)* Khóa thô sinh từ `python tools/make_api_key.py --env staging`.
  - `FEATURE_MATH_API_ENABLED`: Đặt `false` hoặc `true` kèm theo Cloudflare Access để bảo vệ link preview.

### Bảng 2: VPS Backend (`/opt/pumkin-math-api/.env.prod` và `.env.staging`)
- `MATH_API_KEY_HASHES`: Chuỗi mã băm SHA-256 (64 ký tự hex).
- `CORS_ORIGINS`:
  - Staging: `https://*.tsapumkin.pages.dev`
  - Production: `https://tsapumkin.pages.dev,https://pumkin.dev`
- `LLM_PROVIDER`: `gemini` (hoặc `fake` nếu kiểm thử offline).
- `GEMINI_API_KEY`: Khóa Google AI Studio riêng biệt cho từng bên.
- `GEMINI_MODEL`: `gemini-2.5-flash-lite` cho Staging; `gemini-2.5-flash` cho Production.
- `LLM_BUDGET_HOURLY_USD`: Ngân sách giờ (ví dụ Staging: `0.50`, Production: `2.00`).
- `LLM_BUDGET_DAILY_USD`: Ngân sách ngày (ví dụ Staging: `2.00`, Production: `10.00`).
- `PORT`: `8001` cho Staging; `8000` cho Production.

---

## 5. Kịch Bản Warm-up Tự Động & Rollback Nhanh

### 5.1. Kịch bản Deploy & Warm-up (`deploy.sh`)
```bash
#!/usr/bin/env bash
set -e

cd /opt/pumkin-math-api/repo
git pull origin <BRANCH_NAME>

cd /opt/pumkin-math-api
docker compose build
docker compose up -d

echo ">>> Chờ healthcheck..."
sleep 5

echo ">>> Gửi request mồi (Warm-up probe) để nạp SymPy vào RAM..."
curl -s -o /dev/null -w "Prod Warm-up: %{http_code}\n" http://127.0.0.1:8000/health
curl -s -o /dev/null -w "Staging Warm-up: %{http_code}\n" http://127.0.0.1:8001/health
echo ">>> Hoàn tất! Không còn cold-start cho người dùng."
```

### 5.2. Rollback Khi Có Sự Cố (5 giây)
```bash
cd /opt/pumkin-math-api
# Rollback container Production về tag image ổn định trước đó
docker tag pumkin-math-api:prod-backup pumkin-math-api:prod
docker compose up -d math-api-prod
```
