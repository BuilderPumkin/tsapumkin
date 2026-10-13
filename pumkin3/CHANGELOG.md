# PUMKIN.DEV — CHANGELOG BẢN PHÁT HÀNH PUMKIN3

**Phiên bản:** 4.2.0-pumkin3  
**Ngày phát hành:** 13/10/2026  
**Kiến trúc:** Cloudflare Pages (Static SPA + Edge Worker API)  
**Thư mục phục vụ:** `pumkin3/` (Được cấu hình trong `wrangler.toml`)

---

## 🚀 CÁC NÂNG CẤP CHÍNH TRONG PUMKIN3

### 1. Phân rã mã nguồn nguyên khối (Monolith Splitting)
- Chuyển đổi thành công từ file mã nguồn duy nhất `index_script.js` (670 KB) sang kiến trúc modular thuần vanilla ES6 (`js/core/`, `js/features/`, `js/math/`, `js/ui/`, `js/store/`).
- Giảm dung lượng `index.html` từ 872 KB xuống ~154 KB, thời gian tải trang ban đầu cải thiện hơn 80%.

### 2. Mô hình Đo lường Khảo thí Rasch 1PL (Psychometrics Engine)
- Tích hợp `RaschEstimator.js` theo mô hình Rasch 1PL kết hợp thuật toán Newton-Raphson và ước lượng hậu nghiệm EAP.
- Khởi tạo độ khó câu hỏi thích ứng (Item Information Function) cho bài test chẩn đoán.
- Chế độ vận hành song song (Shadow Mode) chạy ngầm để thu thập dữ liệu độ tin cậy trước khi thay thế hoàn toàn CTT.

### 3. Phân loại Sai lầm theo Phương án Nhiễu (Distractor-Driven Misconceptions)
- Nâng cấp `PumkinErrorClassifier.js` kết hợp danh mục chuẩn `schemas/misconceptions.json`.
- Mỗi phương án nhiễu trắc nghiệm được gán mã nhận thức chuẩn (`TRAP_LOG_DOMAIN_IGNORED`, `TRAP_ROUND_TABLE_BLOCK_FACTORIAL`, v.v.).
- Cơ chế phát hiện lỗi lặp lại (≥ 2 lần trong 10 câu gần nhất) để cảnh báo hệ thống ôn tập.

### 4. Luồng Trải nghiệm 3 Bước (3-Step Guided Journey)
- Tái cấu trúc Dashboard thành giao diện tập trung:
  1. **Bước 1:** Test chẩn đoán nhanh (10 câu thích ứng).
  2. **Bước 2:** Nhiệm vụ trọng tâm trong ngày (5-8 câu dựa trên kỹ năng yếu nhất).
  3. **Bước 3:** Mở rộng tự do (Kho đề, Sổ tay, Thách đấu Boss).
- Loại bỏ hoàn toàn dark pattern gây áp lực, hỗ trợ phím tắt và bàn phím (WCAG 2.1 AA).

### 5. Gia sư AI Socratic với Ground-Truth CAS Verification
- Serverless API `functions/api/ai.js` hỗ trợ kiểm chứng công thức toán học thời gian thực bằng CAS (Computer Algebra System).
- Ràng buộc chặt chẽ theo cấu trúc dữ liệu XML (`<ground_truth>`, `<student_state>`, `<rules>`), ngăn chặn hoàn toàn hiện tượng AI bịa bước hoặc sai lệch số liệu.
- Thang gợi ý sư phạm 4 bậc (Nudge -> Concept Reminder -> Sub-goal -> Worked Step).

### 6. Động cơ Hiển thị Toán học Offline-First KaTeX
- Tích hợp KaTeX nội bộ (`vendor/katex/`) kết hợp CDN tự động dự phòng.
- Định dạng chuẩn KaTeX inline `\( ... \)` và display `\[ ... \]`.

---

## 🔒 AN TOÀN TRIỂN KHAI (ZERO-DOWNTIME STRATEGY)
- Giữ nguyên thư mục `public/` hiện hành trong repo để đảm bảo an toàn tuyệt đối và khả năng quay lui tức thì nếu cần.
- Cấu hình `pages_build_output_dir = "pumkin3"` trong `wrangler.toml` để chuyển đổi môi trường deploy.
