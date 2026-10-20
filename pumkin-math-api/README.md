# PUMKIN MATH API

> **Microservice tính toán tất định & kiểm định toán học độc lập cho nền tảng PUMKIN.DEV (`tsapumkin.pages.dev`).**

---

## 1. Giới Thiệu & Kiến Trúc Cốt Lõi

Pumkin Math API đóng vai trò là "Bộ não tính toán tất định" bảo đảm độ chính xác học thuật tuyệt đối cho website luyện thi Toán THPT, TSA và HSA.

### Ba Nguyên Tắc Cố Định
1. **LLM không bao giờ tạo đáp án và KHÔNG sinh code Python:** LLM chỉ đóng vai trò bộ dịch ngữ nghĩa (Semantic Parser) chuyển văn bản đề bài tiếng Việt sang DSL JSON; toàn bộ các phép tính do SymPy CAS thực thi.
2. **Không tuyên bố "chính xác 100%":** Mọi kết quả mang nhãn `status: verified | needs_review | unsupported | error` kèm mức độ tin cậy. Khi chấm bài, nếu hệ thống không chắc chắn thì **không được trừ điểm học sinh**.
3. **Cấm dùng `eval()`, `exec()`, `sympify()`, `parse_expr()`:** Mọi chuỗi toán học từ người dùng hoặc LLM phải đi qua bộ phân tích cú pháp AST có danh sách cho phép (Allowlist Grammar Parser).

---

## 2. Cài Đặt & Chạy Cục Bộ (Local Development)

### 2.1. Yêu cầu môi trường
- Python 3.11+ (Khuyến nghị 3.11 hoặc 3.12)
- Trình quản lý gói `pip`

### 2.2. Khởi tạo môi trường ảo & cài đặt gói
```bash
# Di chuyển vào thư mục dịch vụ
cd pumkin-math-api

# Tạo môi trường ảo
python -m venv venv

# Kích hoạt môi trường ảo:
# Trên Linux/macOS:
source venv/bin/activate
# Trên Windows (PowerShell):
.\venv\Scripts\Activate.ps1

# Cài đặt toàn bộ các phụ thuộc đã ghim phiên bản
pip install -r requirements.txt
```

### 2.3. Cấu hình biến môi trường
1. Tạo khóa truy cập API và mã băm SHA-256 bằng công cụ an toàn:
   ```bash
   python ../tools/make_api_key.py
   ```
2. Tạo tệp `.env` từ `.env.example`:
   ```bash
   cp .env.example .env
   ```
3. Mở tệp `.env` và dán mã băm SHA-256 vào `PUMKIN_API_KEY_HASHES`:
   ```env
   PORT=8000
   HOST=0.0.0.0
   PUMKIN_API_KEY_HASHES=c9a8b1...d4f6
   ```

### 2.4. Khởi chạy máy chủ phát triển
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
- Swagger UI tài liệu tương tác: [http://localhost:8000/docs](http://localhost:8000/docs)
- Health check: [http://localhost:8000/health](http://localhost:8000/health)

---

## 3. Chạy Kiểm Thử Tự Động (Test Suite)

Dự án áp dụng quy trình kiểm thử bắt buộc với `pytest`:

```bash
# Chạy toàn bộ test suite
pytest -v

# Chạy riêng nhóm kiểm thử đơn vị
pytest -m unit -v

# Chạy riêng nhóm kiểm thử bảo mật & tấn công đối kháng
pytest -m adversarial -v

# Kiểm tra định dạng mã nguồn với Ruff
ruff check app/ tests/
```

---

## 4. Đóng Gói & Chạy Bằng Docker

Dockerfile được thiết kế theo tiêu chuẩn an toàn công nghiệp: ảnh gọn (`python:3.11-slim`), chạy dưới quyền user không phải root (`appuser:10001`), tích hợp healthcheck tự động, và không sao chép tệp nhạy cảm `.env`.

### 4.1. Build Docker Image
```bash
docker build -t pumkin-math-api:0.1.0 .
```

### 4.2. Chạy Docker Container
```bash
docker run -d \
  --name pumkin-math-api \
  -p 8000:8000 \
  -e PUMKIN_API_KEY_HASHES="your_sha256_hash_here" \
  pumkin-math-api:0.1.0
```

### 4.3. Kiểm tra container
```bash
# Kiểm tra log
docker logs -f pumkin-math-api

# Kiểm tra trạng thái healthcheck
docker inspect --format='{{json .State.Health}}' pumkin-math-api
```

---

## 5. Cấu Trúc Thư Mục Dự Án

```
pumkin-math-api/
├─ app/
│  ├─ main.py            # Khởi tạo FastAPI app, định tuyến /health và /v1/*
│  ├─ auth.py            # Xác thực X-Pumkin-API-Key bằng SHA-256 & hmac.compare_digest
│  ├─ schemas/           # Pydantic v2 schemas (common, solve, check, generate)
│  ├─ latex/             # Bộ chuẩn hóa KaTeX
│  ├─ parser/            # Semantic parser & Allowlist AST
│  ├─ solvers/           # Bộ giải toán tất định SymPy
│  ├─ checker/           # Chấm bài thi & nhận diện bẫy nhận thức
│  ├─ generator/         # Sinh đề bài biến thể
│  ├─ pedagogy/          # Định dạng sư phạm Socratic 4 bậc
│  └─ sandbox/           # Cô lập tiến trình tính toán (run_with_timeout)
├─ tests/
│  ├─ conftest.py        # Fixtures & TestClient
│  ├─ unit/              # Test kiểm thử chức năng
│  ├─ golden/            # Dataset kiểm chuẩn (Prompt 11)
│  └─ adversarial/       # Test an toàn bảo mật, chống injection
├─ bench/                # Đo lường benchmark & latency P95 (Prompt 11)
├─ Dockerfile            # Container image gọn, user non-root
├─ requirements.txt      # Phiên bản ghim thật 100%
├─ .env.example          # Mẫu cấu hình môi trường an toàn
├─ .gitignore            # Chặn rò rỉ mã bí mật và tệp tạm
└─ README.md             # Hướng dẫn chi tiết
```
