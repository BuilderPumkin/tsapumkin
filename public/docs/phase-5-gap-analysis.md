# PUMKIN.DEV — KHẢO SÁT HẠ TẦNG & PHÂN TÍCH KHOẢNG TRỐNG (GAP ANALYSIS)
**Giai đoạn:** Giai đoạn 5 — Closed Beta Rollout, Telemetry Analytics Dashboard & Cognitive Calibration  
**Vai trò:** Chief Academic AI Architect, Staff Full-stack Lead, Data/Experimentation Lead, QA Release Manager, EdTech Privacy Reviewer  
**Ngày lập:** 16/09/2026  
**Phiên bản:** 1.0.0-phase5-audit  

---

## I. MỤC ĐÍCH & PHẠM VI KHẢO SÁT

Tài liệu này đánh giá toàn diện hiện trạng kiến trúc, cơ sở mã nguồn, hệ thống lưu trữ, bảo mật và quy trình vận hành của nền tảng PUMKIN.DEV nhằm xác định rõ:
1. Các thành phần đã có từ Giai đoạn 1–4 có thể tái sử dụng ngay.
2. Các khoảng trống kiến trúc (Gaps) cần phát triển mới cho Giai đoạn 5.
3. Các giả định kỹ thuật và sư phạm.
4. Ma trận rủi ro và phương án ứng phó.
5. Danh mục các hạng mục yêu cầu phê duyệt từ cấp có thẩm quyền (Academic Council, Privacy Board, Production Admin) mà mã nguồn không thể tự quyết định.

---

## II. MA TRẬN KHẢO SÁT HỆ THỐNG HIỆN HỮU

| Thành phần | Hiện trạng trong Codebase | Đánh giá Khả năng Tái sử dụng | Khoảng trống (Gap) cần khắc phục |
| :--- | :--- | :---: | :--- |
| **Frontend Architecture** | Single Page Application tĩnh (`index.html`, `TSA_do_an.html`, `index_script.js`), tích hợp hook via `PumkinDeepLearningIntegration.js`. | **Tái sử dụng 90%** | Chưa có cơ chế nhận diện `group` ("treatment" / "control") từ server-authoritative context; đang phụ thuộc vào feature flag client-side. |
| **Backend & APIs** | Node.js Zero-dependency Native HTTP / Express (`backend/server.js` port 3001, `cognitive_router/server.js` port 3000). | **Tái sử dụng 85%** | Thiếu API quản lý Cohort Beta, phân nhóm ngẫu nhiên có kiểm soát (deterministic assignment), lưu trữ consent và server-side kill switch. |
| **Xác thực & Phân quyền (Auth & RBAC)** | `AuthController.js` với lưu trữ file JSON (`users.json`, `sessions.json`), hỗ trợ role `student`. | **Tái sử dụng 70%** | Chưa có role `admin` / `moderator` chính thức; chưa có middleware kiểm tra quyền trước khi truy cập Telemetry Dashboard. |
| **Feature Flag & Kill Switch** | `window.PUMKIN_DEEP_LEARNING_ENABLED` và hàm `safeFallbackToStandardPractice()` ở client. | **Tái sử dụng 60%** | Feature flag hiện là client-side, học sinh có thể tự bật qua DevTools; Kill Switch chưa có tính server-authoritative toàn hệ thống. |
| **Telemetry Engine** | `TelemetryCollector.js` và `PumkinCognitiveTracker.js` hỗ trợ chuẩn hoá event, deduplication, state vector ($S_{rigor}, S_{intuition}, S_{flexibility}$). | **Tái sử dụng 95%** | Chưa có pipeline lưu trữ tập trung trên server, chưa có cơ chế kiểm tra `k-anonymity >= 5` trước khi tổng hợp số liệu. |
| **Database & Retention** | Lưu trữ cục bộ bằng file JSON (`backend/data/`) và `localStorage`. | **Tái sử dụng 50%** | Thiếu cấu hình chính sách lưu trữ (retention policy) tự động hủy log sau 90 ngày; thiếu quy trình xử lý quyền rút lui (data deletion/withdrawal). |
| **Error Monitoring** | Client-side try/catch fallback; server console error logs. | **Tái sử dụng 65%** | Chưa có bộ đếm lỗi thời gian thực (real-time error rate & fallback rate metrics) đẩy lên dashboard. |
| **CI/CD & Deployment** | Script chạy kiểm thử cục bộ (`tests/`), script build & sync dữ liệu câu hỏi. | **Tái sử dụng 80%** | Chưa có pipeline staging riêng biệt cho đợt Beta; việc deploy đòi hỏi sự can thiệp thủ công có kiểm soát. |
| **Tài liệu & Tuân thủ** | 16 tài liệu trong `docs/`, bao gồm `GEMINI.md` về chuẩn học thuật và bảo mật PII. | **Tái sử dụng 90%** | Cần nâng cấp các bản nháp sơ bộ thành quy trình vận hành chính quy cho Closed Beta (50 học sinh) và thay đổi cấu hình Router. |

---

## III. BẢNG PHÂN TÍCH KHOẢNG TRỐNG (GAP ANALYSIS)

### 1. Thành phần còn thiếu (Gaps Identified)
1. **Server-Authoritative Experiment Service:**
   - Cần một service quản trị Closed Beta (`BetaExperimentService.js`) xử lý:
     - Tạo Cohort (`createBetaCohort`).
     - Gán học sinh vào nhóm `treatment` hoặc `control` dựa trên hash deterministic (không ngẫu nhiên lộn xộn, không nhảy nhóm).
     - Ghi nhận trạng thái chấp thuận (`recordConsentStatus`).
     - Thu hồi quyền truy cập (`revokeExperimentAccess`) và vô hiệu hóa tức thì (`deactivateParticipant`).
2. **Telemetry Analytics Dashboard có Phân quyền (RBAC):**
   - Cần endpoint giao diện `/admin/cognitive-telemetry.html` được bảo vệ bởi xác thực Moderator/Admin.
   - Hiển thị 5 khu vực bắt buộc: System Health, Router Activity, Cognitive Signals (chặn dưới ngưỡng $k \ge 5$), Experiment Summary, Audit Log.
3. **Server-Authoritative Kill Switch:**
   - Cơ chế ngắt khẩn cấp lưu ở cấp máy chủ; khi bật, mọi phiên đang làm việc hoặc phiên mới đều buộc phải fallback về chuẩn giải thích tĩnh mà không làm mất bài thi của học sinh.
4. **Quy trình Hiệu chuẩn Router có Versioning (Change Control):**
   - Bộ cấu hình hiệu chuẩn `calibration_v1.0.0.json` có schema rõ ràng, kiểm định điều kiện toán học (mẫu khác 0, cơ số logarit dương khác 1), kèm script replay kiểm thử trước khi activate.
5. **Bộ quy trình pháp lý và khảo sát định tính:**
   - Đặc tả quy trình xử lý dữ liệu học sinh vị thành niên, từ điển dữ liệu telemetry, và kế hoạch phân tích A/B chuẩn mực.

---

## IV. CÁC GIẢ ĐỊNH KỸ THUẬT & HỌC THUẬT

1. **Giả định về Cỡ mẫu (Sample Size Assumption):**
   - Đợt Closed Beta được giới hạn ở quy mô tối đa 50 học sinh TSA/HSA (25 Treatment, 25 Control). 
   - *Hệ quả:* Cỡ mẫu này mang tính chất **thăm dò kỹ thuật và sư phạm (Exploratory Pilot)**, không đủ công suất thống kê (Statistical Power) để khẳng định quan hệ nhân quả tuyệt đối. Mọi kết luận "tăng 15% hiệu quả" chỉ là giả thuyết làm việc.
2. **Giả định về Hạ tầng Mạng:**
   - Học sinh tham gia kết nối qua Internet công cộng. Do đó, Telemetry phải sử dụng cơ chế đệm bất đồng bộ (batching) qua `sendBeacon` để không cản trở thao tác làm bài.
3. **Giả định về Xác thực:**
   - Học sinh đăng nhập qua tài khoản PUMKIN đã được cấp quyền, thông tin định danh nội bộ (`userId`) được chuyển hóa thành mã định danh giả danh (pseudonymous `anonymousParticipantId`) trước khi ghi vào log telemetry.

---

## V. MA TRẬN RỦI RO & PHƯƠNG ÁN GIẢM THIỂU

| Mã Rủi ro | Nguy cơ | Mức độ | Khả năng | Biện pháp Giảm thiểu |
| :--- | :--- | :---: | :---: | :--- |
| **R1: PII Leakage** | Lộ tên, email hoặc địa chỉ IP học sinh vào log telemetry hoặc dashboard export. | **Nghiêm trọng** | Thấp | Bắt buộc mã hóa băm một chiều (HMAC/SHA-256) trước khi ghi log; lọc bỏ toàn bộ chuỗi text tự do; kiểm toán tự động qua `privacy-audit-checklist`. |
| **R2: Client Bypass** | Học sinh tự ý bật cờ Deep Learning qua Console hoặc URL dù không thuộc nhóm Beta Treatment. | **Trung bình** | Trung bình | Server-Authoritative Gating: Khi client yêu cầu module hoặc gửi telemetry, server kiểm tra session và trả về 403 / từ chối can thiệp nếu không có trong whitelist. |
| **R3: Exam Flow Disruption** | Lỗi runtime ở Sandbox hoặc Socratic làm treo giao diện thi, mất bài làm của học sinh. | **Nghiêm trọng** | Rất thấp | Cơ chế Fail-safe bọc trong try/catch; tự động kích hoạt `safeFallbackToStandardPractice()`; nút nộp bài thi độc lập hoàn toàn với module Deep Learning. |
| **R4: Data Overfitting** | Tinh chỉnh tham số Router theo kết quả của 50 học sinh dẫn đến mô hình bị thiên lệch (overfitted) với đề thi khác. | **Cao** | Cao | Phân tách dữ liệu hiệu chuẩn và dữ liệu kiểm định; coi đợt 50 học sinh là thăm dò; yêu cầu phê duyệt từ Hội đồng Học thuật trước khi đổi version config. |
| **R5: Mathematical Violation** | Slider trong Sandbox bị kéo về giá trị làm mẫu số $= 0$ hoặc cơ số log $\le 0$. | **Nghiêm trọng** | Rất thấp | Mathematical Verification Layer (GEMINI.md) kẹp chặt miền giá trị; chặn ngay tại controller logic trước khi render MathJax. |

---

## VI. DANH MỤC TỆP TIN DỰ KIẾN TẠO & CHỈNH SỬA

### 1. Tệp tin Kỹ thuật (Mã nguồn & Cấu hình)
- `backend/src/services/BetaExperimentService.js`: Dịch vụ server-side quản lý Cohort, Gating, Consent, Kill Switch, Telemetry Aggregator và Data Retention.
- `backend/src/controllers/BetaAdminController.js`: Controller cung cấp API cho Dashboard quản trị và client gating.
- `backend/server.js`: Đăng ký các route `/api/beta/*` và route bảo vệ Dashboard.
- `cognitive_router/ui/admin/cognitive-telemetry.html`: Dashboard giao diện giám sát Real-time với k-anonymity >= 5 và Kill Switch.
- `cognitive_router/config/calibration_v1.0.0.json`: Cấu hình Router chuẩn hóa có versioning.
- `cognitive_router/config/calibration_v1.1.0_candidate.json`: Cấu hình hiệu chuẩn thử nghiệm (Candidate).
- `cognitive_router/tools/calibrate_router.js`: Công cụ dòng lệnh thẩm định schema, kiểm tra ràng buộc toán học và replay telemetry.
- `public/js/core/PumkinDeepLearningIntegration.js`: Cập nhật đồng bộ để xác thực trạng thái từ server-side context thay vì hoàn toàn phụ thuộc biến cờ client.
- `tests/test_phase5_closed_beta.js`: Bộ kiểm thử toàn diện 15 kịch bản bắt buộc cho Giai đoạn 5.

### 2. Bộ Tài liệu Đặc tả Vận hành & Học thuật (`docs/`)
1. `docs/phase-5-gap-analysis.md` (Tài liệu hiện tại)
2. `docs/closed-beta-onboarding.md`
3. `docs/consent-and-data-handling.md`
4. `docs/moderator-operating-procedure.md`
5. `docs/telemetry-data-dictionary.md`
6. `docs/privacy-audit-checklist.md`
7. `docs/data-retention-and-withdrawal.md`
8. `docs/router-calibration-protocol.md`
9. `docs/calibration-change-log.md`
10. `docs/ab-test-analysis-plan.md`
11. `docs/beta-metrics-definition.md`
12. `docs/beta-results-template.md`
13. `docs/qualitative-interview-guide.md`
14. `docs/phase-5-delivery-report.md`

---

## VII. HẠNG MỤC CẦN PHÊ DUYỆT NGOÀI HỆ THỐNG (OFF-SYSTEM GOVERNANCE)

Các hạng mục sau **BẮT BUỘC** phải có quyết định bằng văn bản/chữ ký từ các bên hữu quan trước khi đưa vào vận hành thực tế; mã nguồn chỉ chuẩn bị sẵn sàng hạ tầng:

1. **Phê duyệt Pháp lý & Bảo vệ Trẻ em (Legal & Child Privacy Approval):**
   - Nội dung bản thỏa thuận `CONSENT_FORM.md` áp dụng cho học sinh dưới 18 tuổi cần được phụ huynh/người giám hộ xác nhận theo quy định pháp luật sở tại.
2. **Quyền Gửi Lời Mời & Tuyển chọn Học sinh (Participant Outreach):**
   - Danh sách 50 học sinh và việc gửi thư mời, đường dẫn tham gia phải do Ban Quản trị đào tạo TSA/HSA thực hiện; hệ thống AI không được tự động phát tán email/tin nhắn.
3. **Quyết định Kích hoạt Kill Switch hoặc Thay đổi Cấu hình Router:**
   - Mọi thay đổi về version cấu hình (`v1.0.0` sang `v1.1.0`) phải có biên bản họp và xác nhận của Chief Academic Architect.
4. **Quyết định Chuyển sang Phát hành Rộng rãi (GA Decision Gate):**
   - Quyền bật tính năng cho toàn bộ người dùng PUMKIN.DEV chỉ được thực thi khi có sự đồng thuận đầy đủ của cả 4 bên: Kỹ thuật, Học thuật, Quyền riêng tư và Giám đốc Sản phẩm (Product Owner).
