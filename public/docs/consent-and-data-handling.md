# THỎA THUẬN CHẤP THUẬN & CHÍNH SÁCH XỬ LÝ DỮ LIỆU HỌC TẬP (CONSENT & DATA HANDLING)
**Dự án:** PUMKIN.DEV Closed Beta — Dynamic Cognitive Router  
**Cấp độ Bảo mật:** Nghiêm ngặt (Strict EdTech Privacy)  
**Tiêu chuẩn áp dụng:** Nguyên tắc An toàn PUMKIN.DEV, Quy định Bảo vệ Dữ liệu Cá nhân  

---

> [!IMPORTANT]
> **THÔNG BÁO PHÁP LÝ BẮT BUỘC:**  
> Văn bản này là biểu mẫu kỹ thuật chuẩn hóa phục vụ Closed Beta. Trước khi áp dụng thực tế trên người học thật, toàn bộ nội dung dưới đây **BẮT BUỘC PHẢI ĐƯỢC BỘ PHẬN PHÁP LÝ VÀ BAN GIÁM ĐỐC PUMKIN.DEV PHÊ DUYỆT BẰNG VĂN BẢN CHÍNH THỨC**.

---

## 1. DỮ LIỆU ĐƯỢC THU THẬP & MỤC ĐÍCH
Hệ thống chỉ thu thập các vi tương tác học tập (Micro-interactions) ở dạng ẩn danh nhằm mục đích duy nhất là nghiên cứu và tối ưu hóa hệ thống điều phối sư phạm cá nhân hóa:
1. **Thời gian dừng suy nghĩ (Hesitation Time):** Số mili-giây học sinh dừng lại trước khi chọn đáp án ở từng câu hỏi độ khó M1–M4.
2. **Hành vi tương tác gợi ý (Scaffolding Clicks):** Số lần yêu cầu gợi ý qua 4 bậc Socratic (Nudge $\rightarrow$ Concept $\rightarrow$ Sub-goal $\rightarrow$ Worked Step).
3. **Thao tác mô phỏng (Sandbox Telemetry):** Các thay đổi tham số trên đồ thị hàm số (ví dụ: thay đổi cơ số $a$, số mũ $x$) để đo lường mức độ tương tác trực quan.
4. **Trạng thái vector tư duy suy diễn ($S_{rigor}, S_{intuition}, S_{flexibility}$):** Điểm số ước lượng mức độ logic, trực giác và độ thích ứng nhận thức.

---

## 2. DỮ LIỆU TUYỆT ĐỐI KHÔNG THU THẬP (PROHIBITED DATA)
Nhằm bảo vệ tối đa quyền riêng tư của học sinh, hệ thống được thiết lập kiểm toán tự động để **CHẶN VÀ TỪ CHỐI LƯU TRỮ**:
- ❌ **Không thu thập thông tin định danh cá nhân (PII):** Họ tên thật, ngày sinh, số điện thoại, địa chỉ trường lớp, email cá nhân.
- ❌ **Không thu thập địa chỉ mạng trực tiếp:** Địa chỉ IP thô (raw IP), vị trí địa lý chính xác (GPS/Geo-location).
- ❌ **Không thu thập văn bản tự do chưa kiểm duyệt:** Nghiêm cấm lưu trữ các đoạn chat hoặc phản hồi tự do có nguy cơ chứa thông tin cá nhân.
- ❌ **Không ghi nhận âm thanh, hình ảnh:** Không sử dụng webcam, micro hoặc chụp ảnh màn hình ngoài ý muốn.

---

## 3. CHÍNH SÁCH DÀNH CHO HỌC SINH DƯỚI 18 TUỔI
- Mọi học sinh tham gia thử nghiệm chưa đủ 18 tuổi tại thời điểm bắt đầu phải có **chữ ký hoặc xác nhận điện tử của cha, mẹ hoặc người giám hộ hợp pháp**.
- Người giám hộ có quyền yêu cầu xem lại bất kỳ bản ghi telemetry ẩn danh nào liên quan đến phiên học của học sinh, hoặc yêu cầu xóa bỏ hoàn toàn dữ liệu.

---

## 4. QUYỀN RÚT LUI KHỎI THỬ NGHIỆM (RIGHT TO WITHDRAW)
- **Rút lui bất kỳ lúc nào:** Học sinh và người giám hộ có toàn quyền ngừng tham gia đợt Closed Beta bất kỳ lúc nào mà không cần nêu lý do và **hoàn toàn không ảnh hưởng đến quyền lợi ôn thi hoặc kết quả học tập** tại PUMKIN.DEV.
- **Quy trình hủy dữ liệu:**
  - Liên hệ Điều phối viên (Moderator) hoặc gửi yêu cầu thu hồi quyền.
  - Hệ thống sẽ kích hoạt lệnh `deleteParticipantData()` để xóa sạch toàn bộ các bản ghi telemetry mang mã định danh giả danh (`anonymousParticipantId`) khỏi cơ sở dữ liệu nghiên cứu trong vòng **24 giờ**.

---

## 5. THỜI HẠN LƯU TRỮ & AI ĐƯỢC PHÉP TRUY CẬP
- **Thời hạn lưu trữ (Retention Period):** Dữ liệu telemetry thô phục vụ phân tích A/B được lưu trữ tối đa **90 ngày** kể từ khi kết thúc đợt thử nghiệm. Sau thời hạn này, dữ liệu thô sẽ tự động bị xóa hủy vĩnh viễn; chỉ lưu lại báo cáo thống kê tổng hợp ở cấp độ nhóm (Aggregated Metrics).
- **Phân quyền truy cập (Access Control):**
  - Chỉ có các chuyên gia nghiên cứu học thuật và Trưởng nhóm Kỹ thuật (Technical Lead) được cấp quyền Admin mới có thể xem số liệu tổng hợp trên Dashboard.
  - Mọi thao tác xem hoặc xuất báo cáo đều tuân thủ ngưỡng bảo vệ quyền riêng tư **k-anonymity ($k \ge 5$)**.
