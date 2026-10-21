# ĐỒNG BỘ HỆ THỐNG TIMEOUT & CHỐNG NGHẼN YÊU CẦU (TIMEOUT HIERARCHY)
**Tài liệu kỹ thuật hạ tầng — Nền tảng PUMKIN.DEV**  
*Mã tài liệu: INFRA-TIMEOUT-01 — Phiên bản: 1.0 — Ngày ban hành: 21/10/2026*

---

## 1. NGUYÊN TẮC BẤT BIẾN: BẤT ĐẲNG THỨC THỜI GIAN CHỜ (TIMEOUT MONOTONICITY)

Để đảm bảo **không có bất kỳ yêu cầu nào bị treo vô hạn (zero hanging requests)** và mọi tài nguyên máy tính (CPU, RAM, Subprocess) luôn được thu hồi sạch sẽ, hệ thống áp dụng bất đẳng thức thời gian chờ nghiêm ngặt theo 4 tầng từ lõi ra ngoài:

$$\mathbf{T_{\text{Sandbox}}} < \mathbf{T_{\text{Backend}}} < \mathbf{T_{\text{Gateway}}} < \mathbf{T_{\text{Client UI}}}$$

$$(5.0\text{s}) < (12.0\text{s}) < (15.0\text{s}) < (18.0\text{s})$$

### Ý nghĩa kỹ thuật:
- **Tầng trong cùng (Sandbox)** luôn hết hạn và bị ngắt trước tầng cha. Khi phép tính toán biểu thức SymPy bị lặp vô hạn, Sandbox tự hủy sau 5.0 giây, giải phóng RAM.
- **Backend FastAPI** nhận tín hiệu `SandboxTimeoutError` và đóng gói mã lỗi trả về trước khi Gateway đứt kết nối.
- **Gateway Cloudflare** (15.0s) phát hiện trạng thái khởi động nguội (Cold Start) của Render hoặc treo mạng trước khi trình duyệt học sinh tự hủy.
- **Client Web Browser** (18.0s) là chốt chặn cuối cùng. Nếu sau 18 giây không có phản hồi, client tự động kích hoạt luồng hạ cấp về ngân hàng đề chuẩn, thông báo thân thiện cho học sinh và **tuyệt đối không để spinner quay vô hạn**.

---

## 2. BẢNG ĐỒNG BỘ CHI TIẾT CÁC TẦNG TIMEOUT

| Cấp độ | Tầng kiến trúc | Thời gian | Cơ chế kiểm soát | Hành vi khi quá thời gian | Mã lỗi trả về |
| :---: | :--- | :---: | :--- | :--- | :---: |
| **Cấp 1 (Lõi)** | **Python CAS Sandbox Subprocess** (`app/sandbox/runner.py`) | **5.0s** *(Hard limit)* | `process.join(timeout=5.0)` kết hợp `os.killpg` hủy toàn bộ cây tiến trình | Buộc dừng phép tính vi phân/tích phân quá nặng, giải phóng ngay 512MB RAM | `SANDBOX_TIMEOUT` |
| **Cấp 2** | **Backend FastAPI Handler** (`app/parser/consensus.py`) | **12.0s** | `asyncio.wait_for(timeout=12.0)` | Hủy bỏ tác vụ asyncio, ghi nhận lỗi phân tích, giải phóng worker | `COMPUTATION_TIMEOUT` |
| **Cấp 3** | **Cloudflare Pages Gateway** (`functions/api/math/[[path]].js`) | **15.0s** | `AbortController(signal)` với timeout 15,000 ms | Phát hiện cold start Render, trả mã 504 kèm gợi ý bấm "Thử lại" | `GATEWAY_TIMEOUT` (HTTP 504) |
| **Cấp 4** | **Client Web Browser** (`pumkin3/js/math/PumkinMathAPIClient.js`) | **18.0s** | `AbortController` trong trình duyệt của học sinh | Tự động hạ cấp sang ngân hàng đề thi chuẩn trong kho (0ms) | `CLIENT_TIMEOUT` |

---

## 3. CƠ CHẾ BẢO ĐẢM KHÔNG TREO VÔ HẠN (HANGING REQUEST PREVENTION)

1. **Client-side AbortController:**
   - Mọi lệnh gọi mạng qua `PumkinMathAPIClient._postWithTimeout` đều khởi tạo một `AbortController` với thời hạn tối đa 18 giây (`TIMEOUT_MS = 18000`).
   - Sau 18 giây, sự kiện `abort()` được phát ra, hủy kết nối socket và kích hoạt khối `catch (err)` hiển thị giao diện hạ cấp.
2. **Process-Tree Termination trong Sandbox:**
   - Khi tiến trình con SymPy CAS vượt quá 5.0 giây, hàm `runner.py` gửi tín hiệu `SIGTERM` (trên Windows dùng `taskkill /F /T /PID`). Nếu sau 1 giây tiến trình chưa tắt, gửi tiếp `SIGKILL`.
   - Đảm bảo 100% không phát sinh tiến trình mồ côi (Zombie processes) làm cạn kiệt CPU máy chủ.
3. **Gateway Auto-Drain:**
   - Cloudflare Pages Function bọc toàn bộ luồng xử lý bằng khối `try ... finally` để giải phóng biến đếm `_activeInFlightRequests`, ngăn ngừa hiện tượng nghẽn hàng đợi ảo.
