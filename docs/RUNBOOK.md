# SỔ TAY VẬN HÀNH HỆ THỐNG & XOAY KHÓA BẢO MẬT (RUNBOOK)
**Quy trình vận hành chuẩn (SOP) & Ứng phó sự cố — Nền tảng PUMKIN.DEV**  
*Mã tài liệu: SOP-OPS-01 — Phiên bản: 1.0 — Ngày ban hành: 21/10/2026*

---

## 1. MỤC ĐÍCH & PHẠM VI ÁP DỤNG

Tài liệu này hướng dẫn đội ngũ kỹ thuật và quản trị viên hệ thống thực hiện:
1. **Xoay khóa bảo mật định kỳ và đột xuất (Key Rotation)** mà không làm gián đoạn bất kỳ yêu cầu nào của học sinh đang làm bài thi (Zero-Downtime Dual-Key Protocol).
2. **Kích hoạt công tắc khẩn cấp (Emergency Kill-Switch)** khi máy chủ backend gặp sự cố nghiêm trọng hoặc cạn kiệt ngân sách.
3. **Xử lý sự cố rò rỉ khóa (Compromised Key Incident Response)** và cách cô lập khóa bị lộ trong vòng dưới 60 giây.

---

## 2. QUY TRÌNH XOAY KHÓA DUAL-KEY KHÔNG GIÁN ĐOẠN DỊCH VỤ

Hệ thống bảo mật PUMKIN.DEV phân tách triệt để giữa **Khóa thô (Plain Secret Key)** dùng ở Cloudflare Pages Gateway và **Mã băm an toàn (SHA-256 Hash)** lưu trên máy chủ Backend. Máy chủ Backend không bao giờ lưu trữ khóa thô.

```
[ Giai đoạn 1: Chuẩn bị ]
   Sinh khóa mới: python tools/make_api_key.py --env staging
   Nhận: RAW_KEY_NEW và HASH_NEW

[ Giai đoạn 2: Bật chấp nhận song song trên Backend ]
   Cập nhật biến môi trường Backend:
   MATH_API_KEY_HASHES = "HASH_OLD,HASH_NEW"
   -> Backend chấp nhận đồng thời cả khóa cũ lẫn khóa mới!

[ Giai đoạn 3: Chuyển đổi trên Cloudflare Gateway ]
   Cập nhật Cloudflare Pages Secret:
   MATH_API_KEY = "RAW_KEY_NEW"
   Deploy Gateway -> Mọi request mới gửi RAW_KEY_NEW
   (Tỷ lệ rớt request = 0.00% do Backend đang ở trạng thái Dual-Acceptance)

[ Giai đoạn 4: Thu hồi khóa cũ trên Backend ]
   Cập nhật biến môi trường Backend:
   MATH_API_KEY_HASHES = "HASH_NEW"
   MATH_REVOKED_KEY_HASHES = "HASH_OLD"
   -> Khóa cũ bị chặn ngay lập tức với mã lỗi REVOKED_API_KEY (HTTP 401).
```

### Các bước thực thi chi tiết:

### Bước 1: Sinh cặp khóa mới
Sử dụng công cụ đã kiểm chuẩn tại `tools/make_api_key.py`:
```powershell
# Chạy với môi trường Staging
python tools/make_api_key.py --env staging

# Hoặc môi trường Production
python tools/make_api_key.py --env production
```
Kết quả hiển thị trên màn hình console (chỉ in một lần duy nhất):
- `Plain Key`: `pumkin_stag_xxxxxxxxxxxxxxxxxxxxxxxx`
- `SHA-256 Hash`: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`

### Bước 2: Cập nhật Backend chấp nhận song song cả 2 khóa
1. Truy cập trang quản trị máy chủ Backend (Render / VPS Docker).
2. Vào mục **Environment Variables**.
3. Chỉnh sửa biến `MATH_API_KEY_HASHES`:
   ```bash
   # Nối thêm mã băm mới vào sau mã băm cũ (phân tách bằng dấu phẩy)
   MATH_API_KEY_HASHES="<HASH_OLD>,<HASH_NEW>"
   ```
4. Lưu và áp dụng. Quá trình nạp lại biến mất khoảng 10–20 giây. Lúc này máy chủ sẵn sàng xác thực cả 2 khóa.

### Bước 3: Cập nhật biến bí mật trên Cloudflare Pages Gateway
1. Mở Cloudflare Dashboard $\to$ Pages $\to$ Dự án `tsapumkin` $\to$ **Settings** $\to$ **Environment variables**.
2. Tìm biến `MATH_API_KEY`, nhấn **Encrypt / Edit** và dán giá trị `Plain Key mới` (`pumkin_stag_...`).
3. Nhấn **Save**.
4. Thực hiện lệnh deploy hoặc trigger preview để Cloudflare Pages nạp secret mới.
5. Kiểm tra log của Gateway: Các cuộc gọi `/api/math/*` chuyển sang gửi header `X-Pumkin-API-Key: <RAW_KEY_NEW>` và nhận kết quả `HTTP 200 OK`.

### Bước 4: Thu hồi và khóa vĩnh viễn khóa cũ
1. Sau khi quan sát Gateway chạy ổn định ít nhất 5 phút với khóa mới:
2. Quay lại Backend Environment Variables:
   - Đưa `<HASH_OLD>` từ `MATH_API_KEY_HASHES` sang biến `MATH_REVOKED_KEY_HASHES`:
   ```bash
   MATH_API_KEY_HASHES="<HASH_NEW>"
   MATH_REVOKED_KEY_HASHES="<HASH_OLD>"
   ```
3. Lưu lại. Giờ đây, nếu bất kỳ bên nào cố tình dùng khóa cũ `<RAW_KEY_OLD>`, backend sẽ lập tức trả về:
   ```json
   {
     "detail": {
       "code": "REVOKED_API_KEY",
       "message": "Khóa API này đã bị thu hồi trong đợt xoay khóa bảo mật."
     }
   }
   ```

---

## 3. CÔNG TẮC KHẨN CẤP (EMERGENCY KILL-SWITCH)

Khi phát hiện sự cố hệ thống (LLM quá tải, chi phí tăng vọt vượt ngân sách, backend gặp lỗi nặng):

### Cách kích hoạt:
1. Mở Cloudflare Dashboard $\to$ Pages $\to$ **Settings** $\to$ **Environment variables**.
2. Sửa biến:
   ```bash
   MATH_ENABLED = "false"
   ```
3. Nhấn **Save**.

### Hành vi của hệ thống khi Kill-Switch bật:
- Cloudflare Gateway lập tức chuyển trạng thái `HTTP 503 Service Unavailable` kèm mã `MATH_SERVICE_DISABLED`.
- Mã nguồn giao diện trình duyệt (`pumkin3`) bắt được cờ này và tự động chuyển sang **Hạ cấp tầng (d)**:
  - Ẩn nút "Giải bài bằng AI".
  - Chuyển toàn bộ bài tập và đề tự luyện sang **Ngân hàng câu hỏi đã qua thẩm định (`data/questions/all.json`)**.
  - Hiển thị thông báo nhẹ nhàng cho học sinh: *"Hệ thống trợ lý AI đang được bảo trì định kỳ. Bạn vẫn có thể luyện tập bình thường với ngân hàng 553 câu hỏi chuẩn."*
  - **Học sinh không bị gián đoạn buổi học.**

---

## 4. QUY TRÌNH ỨNG PHÓ SỰ CỐ RÒ RỈ KHÓA (COMPROMISED KEY RESPONSE)

Nếu một khóa API bị nghi ngờ lộ (ví dụ: vô tình dán vào commit công khai, hoặc máy tính dev bị xâm nhập):

1. **Khóa tức thời (< 60 giây):**
   - Lấy chuỗi khóa bị lộ, tính SHA-256 hash:
     ```powershell
     node -e "console.log(require('crypto').createHash('sha256').update('<LEAKED_KEY>').digest('hex'))"
     ```
   - Thêm ngay hash này vào `MATH_REVOKED_KEY_HASHES` trên backend. Backend sẽ lập tức từ chối mọi request mang khóa này.
2. **Sinh khóa thay thế mới:** Chạy `python tools/make_api_key.py`.
3. **Cập nhật Cloudflare Pages:** Đặt `MATH_API_KEY` mới.
4. **Kiểm tra lạm dụng ngân sách:**
   - Kiểm tra bảng quản trị LLM (Google AI Studio / OpenAI) xem có request lạ phát sinh trong khoảng thời gian lộ không.
   - Thu hồi khóa LLM upstream tương ứng nếu cần.
5. **Ghi biên bản sự cố:** Lưu vào `reports/incidents/` và cập nhật ca kiểm thử hồi quy.
