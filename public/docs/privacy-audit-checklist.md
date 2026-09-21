# DANH MỤC KIỂM TOÁN QUYỀN RIÊNG TƯ & AN TOÀN DỮ LIỆU (PRIVACY AUDIT CHECKLIST)
**Phạm vi Kiểm toán:** Mã nguồn Giai đoạn 1–5, Telemetry Pipeline, Web Storage, Network Payloads và Dashboard  
**Vai trò Thực hiện:** EdTech Privacy Reviewer & QA Release Manager  
**Ngày kiểm toán:** 16/09/2026  
**Phiên bản:** AUDIT-PHASE5-VERIFIED  

---

## 1. PHẠM VI & PHƯƠNG PHÁP KIỂM TOÁN (AUDIT SCOPE & METHODOLOGY)

> [!NOTE]
> **Cam kết Đạo đức & Minh bạch:**  
> Báo cáo này không tự tiện đánh dấu "100% PII-free" một cách cảm tính. Mọi đánh giá đều dựa trên kết quả rà soát tĩnh (Static Code Analysis), bắt gói tin mạng mô phỏng (Simulated Network Payloads), kiểm tra bộ nhớ trình duyệt (`localStorage`, `sessionStorage`) và rà soát các tệp nhật ký hệ thống.

---

## 2. KẾT QUẢ KIỂM TOÁN CHI TIẾT (EVIDENCE-BASED AUDIT)

| Mã | Hạng mục Kiểm tra | Tiêu chí Đánh giá | Kết quả | Bằng chứng Kỹ thuật (Evidence) |
| :---: | :--- | :--- | :---: | :--- |
| **SEC-01** | **Không lưu PII trong Telemetry** | Payload gửi qua `/api/beta/telemetry` không chứa họ tên, email, SĐT, trường lớp. | **PASS** | `BetaExperimentService.js` chứa bộ lọc tự động kiểm tra từ khóa cấm: `['email', 'phone', 'fullName', 'username', 'studentName', 'ip', 'password']`. Vi phạm bị từ chối với HTTP 400. |
| **SEC-02** | **Pseudonymous ID Generation** | Khóa định danh người học trong nghiên cứu phải là mã băm một chiều, không thể dịch ngược. | **PASS** | `anonymousParticipantId` được tạo bằng `crypto.createHmac('sha256', cohortId).update(userId).digest('hex').substring(0, 16)`. |
| **SEC-03** | **Không rò rỉ Token qua URL** | URL truy cập bài thi không chứa session token hoặc JWT nhạy cảm trên query string. | **PASS** | Xác thực qua Header HTTP `Authorization: Bearer <token>` hoặc lưu tạm trong biến bộ nhớ; không gắn token trên thanh địa chỉ trình duyệt. |
| **SEC-04** | **Không rò rỉ IP Raw** | Không lưu trữ địa chỉ IP thực của học sinh vào bất kỳ tệp dữ liệu telemetry hay audit log nào. | **PASS** | Payload telemetry chỉ lưu `anonymousSessionId`, `timestamp`, `questionMetadata`, và `payload` vi tương tác; không có trường `clientIp`. |
| **SEC-05** | **Bảo vệ k-Anonymity trên Dashboard** | Số liệu tổng hợp tư duy chỉ được hiển thị khi nhóm có từ $k \ge 5$ học sinh trở lên. | **PASS** | `getAggregatedMetrics(kThreshold = 5)` trả về trạng thái `kAnonymityPassed: false` kèm thông điệp *"Không đủ dữ liệu để hiển thị an toàn"* nếu mẫu $< 5$. |
| **SEC-06** | **Chặn rò rỉ qua Console Logs** | Không in thông tin nhạy cảm hoặc đối tượng tài khoản học sinh ra Console trình duyệt. | **PASS** | Toàn bộ các câu lệnh `console.log` trong `PumkinDeepLearningIntegration.js` chỉ in trạng thái khởi tạo kỹ thuật (`[DeepLearning] Bootstrapped successfully`), không in thông tin user. |
| **SEC-07** | **Quyền Hủy bỏ Dữ liệu (Right to Erasure)** | Có cơ chế xóa sạch bản ghi telemetry khi học sinh yêu cầu rút lui khỏi nghiên cứu. | **PASS** | Hàm `BetaExperimentService.deleteParticipantData(anonymousParticipantId)` xóa sạch toàn bộ event của học sinh đó và ghi nhận Audit log. |
| **SEC-08** | **RBAC cho Telemetry Dashboard** | Người dùng thông thường hoặc học sinh không được phép xem giao diện quản trị hay dữ liệu nhóm. | **PASS** | Endpoint `/api/beta/dashboard-data` và các lệnh quản trị yêu cầu xác thực role `admin` hoặc `moderator`; vi phạm trả về HTTP 403 Forbidden. |
| **SEC-09** | **Bảo mật File Audit Log** | Nhật ký thao tác quản trị không ghi lại mật khẩu hoặc thông tin cá nhân. | **PASS** | `logAudit()` chỉ lưu `action`, `actorId`, `timestamp` và các siêu dữ liệu không nhạy cảm (`cohortId`, `maxParticipants`, `reason`). |

---

## 3. KẾT LUẬN KIỂM TOÁN
- **Đạt chuẩn 9/9 hạng mục:** Hệ thống đã thiết lập đầy đủ các tầng rào chắn kỹ thuật cần thiết để tiến hành thử nghiệm Closed Beta trong phạm vi kiểm soát.
- **Khuyến nghị tiếp theo:** Khi kết nối với hệ thống Backend Production thực tế bên ngoài môi trường phát triển cục bộ, cần thiết lập thêm chính sách Content Security Policy (CSP) và mã hóa kết nối bắt buộc qua giao thức HTTPS/TLS 1.3.
