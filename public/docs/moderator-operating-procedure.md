# QUY TRÌNH VẬN HÀNH DÀNH CHO ĐIỀU PHỐI VIÊN & GIÁO VIÊN (MODERATOR OPERATING PROCEDURE)
**Dự án:** PUMKIN.DEV Dynamic Cognitive Router  
**Đối tượng áp dụng:** Moderator, Giáo viên phụ trách phòng thi, QA Support  
**Phiên bản:** SOP-BETA-01  

---

## 1. VAI TRÒ & TRÁCH NHIỆM
Điều phối viên (Moderator) đóng vai trò người giám sát trực tiếp trải nghiệm thi và học tập của 50 học sinh Closed Beta:
- Đảm bảo học sinh không gặp sự cố gián đoạn bài làm.
- Theo dõi các chỉ số sức khỏe hệ thống qua Dashboard.
- Xử lý các yêu cầu hỗ trợ, rút lui khỏi thử nghiệm, hoặc báo cáo sai lệch toán học.
- Kích hoạt cơ chế ngắt khẩn cấp (Kill Switch) khi có dấu hiệu bất thường nghiêm trọng.

---

## 2. QUY TRÌNH CA TRỰC GIÁM SÁT (MONITORING CHECKLIST)

### Trước Giờ Bắt đầu Ca thi (T - 30 Phút)
1. Đăng nhập vào Dashboard: `http://localhost:3000/admin/cognitive-telemetry.html` bằng tài khoản Moderator.
2. Kiểm tra chỉ số **System Health**:
   - Tỷ lệ Lỗi Client (Error Rate) phải ở mức `< 0.1%`.
   - Tỷ lệ Tự động Fallback phải `< 1.0%`.
   - Trạng thái Kill Switch phải hiển thị `OFF (An toàn)`.
   - Phiên bản cấu hình: Đảm bảo hiển thị đúng `Calibration: v1.0.0`.
3. Mở tab thi thử nghiệm nội bộ để kiểm tra tải trang và MathJax typeset.

### Trong Khi Học Sinh Đang Làm Bài
1. Cứ **10 phút/lần**, bấm nút **"Làm mới"** trên Dashboard để cập nhật số phiên đang hoạt động.
2. Theo dõi phân bố can thiệp Router:
   - Nếu tỷ lệ kích hoạt PA1, PA2, PA3 có dấu hiệu đột biến bất thường trên một câu hỏi cụ thể, ghi nhận mã câu hỏi để báo cáo tổ chuyên môn Toán.
3. Kiểm tra mục **Top Fallback Reasons**:
   - Nếu xuất hiện lỗi cú pháp hoặc lỗi render đồ thị, sẵn sàng hỗ trợ học sinh qua kênh liên lạc.

---

## 3. QUY TRÌNH KÍCH HOẠT KILL SWITCH KHẨN CẤP
Nếu xảy ra một trong các trường hợp nguy cấp sau:
- Tỷ lệ Fallback vượt quá **5%** trên tổng số phiên.
- Phát hiện lỗi nghiêm trọng trong hiển thị công thức toán học hoặc sai lệch nghiệm cơ bản.
- Giao diện bị đơ/lag cản trở học sinh bấm nộp bài thi.

### Các bước thực hiện:
1. Trên Dashboard, bấm nút màu đỏ **"🚨 Kích hoạt Kill Switch"**.
2. Hộp thoại xác nhận (Modal) xuất hiện:
   - Nhập lý do bắt buộc (tối thiểu 5 ký tự), ví dụ: *"Tỷ lệ fallback tăng lên 6.2% do lỗi tải module đồ thị trên trình duyệt Safari"*.
   - Bấm **"Xác nhận Ngắt Hệ thống"**.
3. **Hiệu ứng tức thì:**
   - Hệ thống lập tức vô hiệu hóa router trên toàn bộ các phiên.
   - Các học sinh đang làm bài sẽ tự động fallback về giao diện bài tập chuẩn; **toàn bộ câu trả lời đã tích chọn được giữ nguyên vẹn 100%**.
   - Banner màu đỏ cảnh báo sẽ xuất hiện trên Dashboard của Moderator.
4. Thông báo ngay cho Technical Lead và QA Release Manager qua kênh nội bộ khẩn cấp.

---

## 4. QUY TRÌNH KHÔI PHỤC HỆ THỐNG (POST-INCIDENT RECOVERY)
1. Sau khi đội ngũ Kỹ thuật đã xác định nguyên nhân và vá lỗi thành công.
2. Được sự đồng ý bằng văn bản của Technical Lead.
3. Moderator bấm nút **"Khôi phục Hệ thống"** trên Dashboard:
   - Nhập lý do hoàn tất khắc phục sự cố.
   - Bấm xác nhận để đưa hệ thống trở lại trạng thái `OFF (An toàn)`.
