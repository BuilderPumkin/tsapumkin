# NHẬT KÝ THAY ĐỔI CẤU HÌNH HIỆU CHUẨN (CALIBRATION CHANGE LOG)
**Hệ thống:** PUMKIN.DEV Dynamic Cognitive Router  
**Tập trung:** Nhật ký phiên bản tham số nhận thức và điều kiện biên toán học  

---

## BẢNG TỔNG HỢP CÁC PHIÊN BẢN CẤU HÌNH

| Phiên bản | Trạng thái | Ngày hiệu lực | Người phê duyệt | Target Rollback | Tóm tắt Thay đổi |
| :---: | :---: | :---: | :---: | :---: | :--- |
| **v1.0.0** | **ACTIVE (Hiện hành)** | 16/09/2026 | Hội đồng Học thuật PUMKIN | `null` | Cấu hình cơ sở ban đầu cho Closed Beta (Hesitation: M1=30s, M2=45s, M3=60s, M4=90s; Representation Gap Threshold=30.0; Bảo vệ toán học hàm số mũ và logarit). |
| **v1.1.0** | **CANDIDATE (Ứng viên)** | *Chưa kích hoạt* | Chờ Hội đồng đánh giá sau Wave 1 | `1.0.0` | Đề xuất tăng ngưỡng ngập ngừng M2 lên 50s và M3 lên 65s sau phân tích replay giả lập nhằm giảm 2% tỷ lệ can thiệp không cần thiết. |

---

## CHI TIẾT TỪNG PHIÊN BẢN

### Phiên bản: `v1.0.0` (Baseline)
- **Tệp lưu trữ:** `cognitive_router/config/calibration_v1.0.0.json`
- **Thời điểm kích hoạt:** 2026-09-16T18:00:00.000Z
- **Người thực hiện:** `AcademicCouncil_PumkinDev`
- **Lý do áp dụng (Rationale):** Thiết lập chuẩn tham số mặc định cho đợt thử nghiệm Closed Beta 50 học sinh, đảm bảo bám sát các ràng buộc của GEMINI.md về tính chặt chẽ toán học và thang gợi ý 4 bậc Socratic.
- **Ràng buộc toán học:**
  - $a_{exp} \in [0.01, 10.0], a_{exp} \ne 1.0$
  - $a_{log} \in [0.01, 10.0], a_{log} \ne 1.0$, $x_{arg} \ge 0.001$
  - Thang điểm bảo tồn khi mở gợi ý: `[1.0, 0.9, 0.8, 0.7]`

---

### Phiên bản: `v1.1.0` (Candidate)
- **Tệp lưu trữ:** `cognitive_router/config/calibration_v1.1.0.json`
- **Trạng thái:** Sẵn sàng kiểm định (Staged for review sau Tuần 2)
- **Lý do xây dựng (Rationale):** Thử nghiệm replay trên 100 học sinh ảo cho thấy ngưỡng M2=45s có thể kích hoạt gợi ý Socratic quá sớm ở các bài toán chứa bẫy nhận thức phức tạp (Học sinh cần ít nhất 50s để nháp điều kiện xác định).
- **Target Rollback khi có sự cố:** `1.0.0`
