# CHÍNH SÁCH BẢO VỆ DỮ LIỆU CÁ NHÂN & QUYỀN RIÊNG TƯ (PUMKIN.DEV)
*Bản dịch và giải thích ngôn ngữ dễ hiểu dành cho học sinh, phụ huynh và giáo viên.*  
*Phiên bản: 1.0 — Ngày ban hành: 21/10/2026*

---

## 1. LỜI CAM KẾT TỪ ĐỘI NGŨ PUMKIN.DEV
Nền tảng học thuật **PUMKIN.DEV** được xây dựng với mục tiêu duy nhất: hỗ trợ các bạn học sinh rèn luyện tư duy toán học, nhận diện bẫy nhận thức và chuẩn bị cho các kỳ thi đánh giá năng lực (HSA, TSA, V-SAT).

Chúng mình hiểu rằng rất nhiều bạn học sinh sử dụng nền tảng là **người chưa thành niên (dưới 18 tuổi, đặc biệt là các bạn từ 15–17 tuổi)**. Do đó, hệ thống được thiết kế theo nguyên tắc **Bảo vệ Quyền riêng tư Ngay từ Thiết kế (Privacy by Design)** và **Thu thập Tối thiểu (Data Minimization)**:
- **KHÔNG** yêu cầu cung cấp họ tên thật, số điện thoại hay địa chỉ nhà.
- **KHÔNG** theo dõi vị trí GPS hay thông tin nhạy cảm.
- **KHÔNG** bán hoặc chia sẻ bất kỳ thông tin nào cho bên thứ ba vì mục đích quảng cáo.

---

## 2. CHÚNG MÌNH THU THẬP NHỮNG GÌ VÀ KHÔNG THU THẬP GÌ?

### 2.1. Những thông tin hệ thống TUYỆT ĐỐI KHÔNG thu thập:
1. **Thông tin định danh cá nhân (PII):** Họ và tên, trường lớp, số điện thoại, căn cước công dân, địa chỉ cư trú.
2. **Địa chỉ mạng (IP Address):** Máy chủ gateway tự động hủy địa chỉ IP ngay sau khi kiểm tra tần suất gọi (rate limit); tuyệt đối **không ghi IP vào bất kỳ bảng cơ sở dữ liệu nào**.
3. **Nội dung đề bài tự nhập:** Khi bạn dùng tính năng giải toán, nội dung đề bạn gõ **không** bị lưu vào lịch sử chẩn đoán chung (trừ trường hợp duy nhất bạn chủ động bấm gửi kèm khi báo lỗi theo Mục 2.3).

### 2.2. Những dữ liệu kỹ thuật tối thiểu được ghi nhận (Telemetry):
Để biết hệ thống đang giải đúng hay sai ngoài đời thật và cải thiện chất lượng toán học, hệ thống chỉ ghi lại các thông số kỹ thuật ẩn danh:
- **Mã phiên ngẫu nhiên (Session ID):** Một chuỗi ký tự ngẫu nhiên (ví dụ: `sess_8f2a1b_k9z`), chỉ tồn tại tạm thời trong tab trình duyệt và tự hủy khi đóng tab.
- **Loại thao tác:** Giải đề (`solve`), Chấm bài (`check`), hoặc Sinh đề luyện tập (`generate`).
- **Trạng thái toán học:** Đã kiểm chứng (`verified`), Cần xem lại (`needs_review`), hoặc Chưa hỗ trợ (`unsupported`).
- **Thời gian phản hồi (Độ trễ):** Thời gian máy chủ tính toán (tính bằng mili-giây).
- **Mã lỗi kỹ thuật (nếu có):** Ví dụ: `TIMEOUT` (quá thời gian), `PARSE_ERROR` (lỗi cú pháp LaTeX).
- **Tên chuyên đề khái quát:** Ví dụ: "Hình học Oxyz", "Nguyên hàm & Tích phân" (chỉ là nhãn chủ đề lớn, **không** chứa câu chữ của đề bài).

### 2.3. Dữ liệu khi bạn chủ động bấm "Báo lỗi":
Khi phát hiện bài giải bị sai hoặc khó hiểu, bạn có thể bấm nút **"Báo lỗi"**:
- Bạn chọn 1 trong 5 lý do: *Đáp án sai*, *Hiểu sai đề*, *Lời giải khó hiểu*, *Công thức lỗi*, *Lý do khác*.
- Bạn có thể viết thêm lời nhắn góp ý.
- **QUYỀN TỰ QUYẾT NỘI DUNG ĐỀ:** Hệ thống có ô chọn riêng: *"Đồng ý gửi kèm nội dung đề bài này"*.
  - **Mặc định là KHÔNG CHỌN (Không gửi đề).**
  - Nếu bạn không tích chọn, hệ thống chỉ gửi mã lỗi kỹ thuật mà không đính kèm nội dung đề bài.
  - Chỉ khi bạn chủ động tích chọn, nội dung đề bài mới được gửi kèm để các thầy cô đối chiếu.

---

## 3. THỜI HẠN LƯU TRỮ VÀ TỰ ĐỘNG TIÊU HỦY (90 NGÀY)
Mọi dữ liệu telemetry và báo lỗi kỹ thuật được lưu trữ tối đa trong vòng **90 ngày**.
- Hệ thống có lệnh tự động xóa (cron job) chạy hằng ngày để quét và hủy vĩnh viễn mọi bản ghi có tuổi đời quá 90 ngày.
- Sau 90 ngày, dữ liệu bị xóa sạch hoàn toàn khỏi cơ sở dữ liệu Cloudflare D1 và không thể phục hồi.

---

## 4. QUYỀN CỦA HỌC SINH VÀ PHỤ HUYNH

### 4.1. Quyền từ chối thu thập chẩn đoán (Quyền Opt-out):
- Bạn có toàn quyền tắt hoàn toàn việc gửi dữ liệu chẩn đoán kỹ thuật.
- **Cách thực hiện:** Bấm vào biểu tượng khiên bảo vệ `🛡️ Quyền riêng tư` ở chân trang hoặc trong hộp thoại báo lỗi, sau đó bật công tắc **"Tắt gửi dữ liệu chẩn đoán (Opt-out)"**.
- Khi đã bật Opt-out, thiết bị của bạn sẽ không gửi bất kỳ gói tin telemetry nào về máy chủ (tỷ lệ gửi = 0). Bạn vẫn sử dụng toàn bộ tính năng học tập và giải toán bình thường.

### 4.2. Quyền yêu cầu xóa dữ liệu ngay lập tức (Right to Erasure):
- Bạn không cần phải chờ hết 90 ngày. Bất kỳ lúc nào trong phiên học, bạn có thể mở hộp thoại `🛡️ Quyền riêng tư` và bấm nút **"Xóa dữ liệu phiên này"**.
- Máy chủ sẽ lập tức tìm và xóa mọi bản ghi mang mã phiên của bạn trong cơ sở dữ liệu.

---

## 5. CÁC ĐIỂM RÀ SOÁT CẦN Ý KIẾN CHUYÊN GIA PHÁP LÝ & NGƯỜI GIÁM HỘ
> [!IMPORTANT]
> *Lưu ý miễn trừ trách nhiệm:* Đội ngũ kỹ thuật PUMKIN.DEV thiết lập các quy chuẩn trên dựa trên tinh thần tôn trọng quyền riêng tư cao nhất. Chúng tôi không phải luật sư chuyên nghiệp. Dưới đây là các hạng mục được đánh dấu để **người có thẩm quyền của dự án hoặc chuyên gia pháp lý xác nhận**:

1. **[CẦN XÁC NHẬN PHÁP LÝ — ĐIỀU 19 & 20 NGHỊ ĐỊNH 13/2023/NĐ-CP (PDPD)]**:
   - *Nội dung:* Quy định về xử lý dữ liệu cá nhân của trẻ em (dưới 16 tuổi). Nghị định yêu cầu phải có sự đồng ý của cha mẹ hoặc người giám hộ đối với dữ liệu cá nhân của trẻ từ đủ 7 tuổi đến dưới 16 tuổi.
   - *Biện pháp hiện tại của PUMKIN.DEV:* Nền tảng triệt để **không thu thập dữ liệu cá nhân nhận dạng** (Zero PII), phiên làm việc là ẩn danh (ephemeral random token). 
   - *Điểm cần chuyên gia pháp lý duyệt:* Xác nhận xem mô hình dữ liệu ẩn danh hoàn toàn (anonymized data) này có nằm ngoài phạm vi phải lấy văn bản đồng ý của phụ huynh theo Điều 19 PDPD hay không.

2. **[CẦN XÁC NHẬN PHÁP LÝ — ĐIỀU 21 LUẬT TRẺ EM 2016]**:
   - *Nội dung:* Quyền bí mật đời sống riêng tư của trẻ em trên môi trường mạng.
   - *Biện pháp hiện tại của PUMKIN.DEV:* Tính năng gửi kèm đề bài ở nút Báo lỗi mặc định **TẮT (`include_problem_agreed = false`)**. Học sinh phải tự tay bấm chọn mới gửi.
   - *Điểm cần chuyên gia pháp lý duyệt:* Xác nhận cơ chế "Opt-in rõ ràng với mặc định không gửi đề bài" đã thỏa mãn tiêu chuẩn bảo vệ quyền riêng tư của Luật Trẻ em 2016 chưa.

3. **[CẦN XÁC NHẬN PHÁP LÝ — CHÍNH SÁCH LƯU TRỮ 90 NGÀY]**:
   - *Nội dung:* Thời gian 90 ngày cho dữ liệu telemetry kỹ thuật không định danh có đáp ứng các tiêu chuẩn lưu trữ tối thiểu của nền tảng giáo dục trực tuyến tại Việt Nam hay không.

---

## 6. THÔNG TIN LIÊN HỆ ĐỐI VỚI VẤN ĐỀ QUYỀN RIÊNG TƯ
Mọi câu hỏi, khiếu nại hoặc yêu cầu giải đáp về quyền riêng tư, quý phụ huynh và các bạn học sinh có thể liên hệ trực tiếp:
- **Kênh tiếp nhận:** Ban Quản trị Học thuật & Bảo mật PUMKIN.DEV
- **Email:** `privacy@pumkin.dev`
- **Địa chỉ tiếp nhận:** Dự án Nền tảng Học thuật PUMKIN.DEV
