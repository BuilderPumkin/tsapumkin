# BẢNG KIỂM THỬ THỦ CÔNG TRÊN TRÌNH DUYỆT (MANUAL QA CHECKLIST)
> **Dự án:** PUMKIN.DEV (TSA Academy)  
> **Phiên bản:** Web Gateway & UI Integration (v4.4.0)  
> **Mục đích:** Dành cho Trưởng dự án / QA tự thực hiện kiểm chứng trực quan trên trình duyệt (Agent AI không được tự đánh dấu hoàn thành).  
> **Quy ước:** Toàn bộ ô kiểm đều để trống `[ ]` kèm ghi chú **"chưa kiểm"**. Sau khi bạn tự thao tác và kiểm tra đạt thì tự đánh dấu `[x]`.

---

## 1. MÔI TRƯỜNG THỰC HIỆN KIỂM THỬ
- [ ] **Môi trường Cục bộ (Local Dev):** Chạy `python -m http.server 8080` tại thư mục `pumkin3/` hoặc qua Cloudflare Pages CLI (`npx wrangler pages dev pumkin3`). *(chưa kiểm)*
- [ ] **Môi trường Xem trước (Cloudflare Pages Preview):** Truy cập URL triển khai Preview của Pull Request nhánh `feature/web-gateway-integration`. *(chưa kiểm)*
- [ ] **Môi trường Sản xuất (Production):** Truy cập `https://tsapumkin.pages.dev` hoặc `https://pumkin.dev`. *(chưa kiểm)*

---

## 2. KỊCH BẢN 1: QUẢN TRỊ CỜ TÍNH NĂNG (FEATURE FLAG GOVERNANCE)
*Mục tiêu: Đảm bảo tính năng mới mặc định TẮT ở production và học sinh không thể tự bật lén.*

- [ ] **1.1. Mặc định ẩn trên Production:** Truy cập `https://tsapumkin.pages.dev` bằng trình duyệt ẩn danh (chưa đăng nhập). Xác nhận trên thanh điều hướng chính **KHÔNG** xuất hiện tab "🧮 Giải toán CAS". *(chưa kiểm)*
- [ ] **1.2. Chống lách bằng URL Query:** Trên production, gõ URL kèm tham số `https://tsapumkin.pages.dev/?math_api=1`. Xác nhận tab "🧮 Giải toán CAS" vẫn hoàn toàn **BỊ ẨN**. *(chưa kiểm)*
- [ ] **1.3. Chống lách bằng LocalStorage:** Mở DevTools Console (F12) trên production, gõ `localStorage.setItem('PUMKIN_FEATURE_MATH_API', 'true')` rồi F5 làm mới. Xác nhận tab vẫn **BỊ ẨN**. *(chưa kiểm)*
- [ ] **1.4. Chống lách bằng Router Navigate:** Trong console gõ `PumkinRouter.navigate('math-solver')`. Xác nhận hệ thống chặn chuyển trang và bật Toast cảnh báo: *"Tính năng Giải toán CAS đang trong giai đoạn thử nghiệm kín."* *(chưa kiểm)*
- [ ] **1.5. Kích hoạt cho tài khoản Quản trị/Thử nghiệm:** Đăng nhập tài khoản `@pumkin`. Xác nhận tab "🧮 Giải toán CAS" tự động xuất hiện. *(chưa kiểm)*
- [ ] **1.6. Cho phép bật trên Preview/Local:** Trên môi trường Preview hoặc Localhost, kiểm tra thấy tính năng mặc định hiển thị hoặc bật được bằng `?math_api=1`. *(chưa kiểm)*

---

## 3. KỊCH BẢN 2: GIẢI ĐỀ TỰ DO & ỨNG PHÓ KHỞI ĐỘNG NGUỘI (COLD START)
*Mục tiêu: Trải nghiệm người dùng mượt mà, thông báo trạng thái rõ ràng, không treo giao diện.*

- [ ] **2.1. Nạp mẫu nhanh:** Nhấp vào nút mẫu nhanh *"📐 Tích phân đổi biến"*. Xác nhận ô văn bản điền đúng `\int_{0}^{1} (2x+3)e^x dx`. *(chưa kiểm)*
- [ ] **2.2. Trạng thái chờ giải (Loading):** Nhấp nút *"🚀 Giải & Kiểm chứng bằng CAS"*. Xác nhận xuất hiện vòng xoay spinner, nút bấm chuyển sang trạng thái disabled chống bấm đúp, và dòng chữ: *"Đang giải bài toán... Hệ thống máy tính toán CAS đang phân tích đề bài."* *(chưa kiểm)*
- [ ] **2.3. Xử lý khởi động nguội (Cold Start):** Nếu container Render đang ngủ và thời gian chờ vượt 20 giây: xác nhận giao diện chuyển sang hộp thoại màu hổ phách: *"⏳ Máy chủ đang khởi động nguội (Cold Start)... Quá trình đánh thức đang diễn ra (mất khoảng 30-50 giây)."* *(chưa kiểm)*
- [ ] **2.4. Nút Thử lại hoạt động:** Nhấp nút *"🔄 Thử lại"*. Xác nhận ứng dụng tự động gửi lại yêu cầu tính toán mà không cần học sinh gõ lại đề. *(chưa kiểm)*
- [ ] **2.5. Hiển thị kết quả thành công:** Khi backend trả về kết quả:
  - Xuất hiện Banner *"Hệ thống hiểu đề là: ..."* với công thức KaTeX render sắc nét. *(chưa kiểm)*
  - Huy hiệu hiển thị đúng phương pháp: *"🛡️ Đã kiểm chứng bằng máy đại số (SymPy)"* (tuyệt đối không hiển thị "chính xác 100%"). *(chưa kiểm)*
  - Các bước giải biến đổi ký hiệu hiển thị rõ ràng từng bước. *(chưa kiểm)*
  - Đoạn telemetry cuối thẻ hiển thị độ trễ (ms) và trạng thái cache (HIT/MISS). *(chưa kiểm)*

---

## 4. KỊCH BẢN 3: AN TOÀN BẢO MẬT & CHỐNG TẤN CÔNG XSS (XSS ATTACK DEFENSE)
*Mục tiêu: Đảm bảo dữ liệu nhập tự do và phản hồi từ API không thể thực thi mã JavaScript độc hại.*

- [ ] **3.1. Thử chèn thẻ HTML Script:** Nhập vào ô đề bài: `<script>alert('PUMKIN_XSS')</script>` rồi bấm Giải. Xác nhận không có popup alert nào bật lên; chuỗi được hiển thị an toàn dưới dạng text. *(chưa kiểm)*
- [ ] **3.2. Thử chèn thẻ Hình ảnh có Error Handler:** Nhập `<img src=x onerror=alert('IMG_XSS')>`. Xác nhận không thực thi mã độc. *(chưa kiểm)*
- [ ] **3.3. Thử chèn Macro LaTeX độc hại:** Nhập `\href{javascript:alert(1)}{Bấm vào đây}` hoặc `\url{javascript:void(0)}`. Xác nhận KaTeX từ chối thực thi liên kết theo cấu hình `trust: false`. *(chưa kiểm)*
- [ ] **3.4. Thử tràn bộ nhớ Macro (KaTeX DoS):** Nhập `\def\foo{\foo\foo}\foo`. Xác nhận KaTeX chặn lại theo giới hạn `maxExpand: 50`. *(chưa kiểm)*

---

## 5. KỊCH BẢN 4: HẠ CẤP ÊM NGOẠI TUYẾN (OFFLINE GRACEFUL DEGRADATION)
*Mục tiêu: Khi mất kết nối hoặc Backend ngừng hoạt động, ứng dụng vẫn vận hành ổn định.*

- [ ] **4.1. Ngắt kết nối mạng:** Mở DevTools (F12) $\to$ Tab Network $\to$ Đổi từ *No throttling* sang **Offline**. *(chưa kiểm)*
- [ ] **4.2. Hoạt động của Ngân hàng đề & Thi thử:** Chuyển sang tab "Kho đề thi" hoặc "Ngân hàng câu hỏi", mở một đề thi và làm bài. Xác nhận đề thi, hình vẽ JSXGraph và tính năng chấm điểm vẫn hoạt động bình thường nhờ Service Worker cache. *(chưa kiểm)*
- [ ] **4.3. Thông báo hạ cấp tại tab CAS:** Chuyển sang tab "Giải toán CAS", bấm thử giải. Xác nhận hiển thị thông báo hạ cấp êm: *"Tính năng nhập đề tự do đang tạm ngưng do máy chủ tính toán đang khởi động hoặc bảo trì. Ngân hàng đề thi chuẩn vẫn hoạt động ổn định bằng dữ liệu ngoại tuyến."* *(chưa kiểm)*

---

## 6. KỊCH BẢN 5: KIỂM CHỨNG CAS TRONG TRANG XEM LẠI BÀI THI (REVIEW CARDS)
*Mục tiêu: Đảm bảo tính nhất quán giữa khảo thí chuẩn hóa và công cụ kiểm chứng CAS.*

- [ ] **5.1. Nộp một bài thi mẫu:** Hoàn thành bài thi và bấm "Nộp bài". Chuyển sang trang "Xem lại kết quả". *(chưa kiểm)*
- [ ] **5.2. Đối với câu thuộc 72 câu Supported:** Tìm một câu trong danh sách 72 câu chuẩn hóa (ví dụ câu tính tích phân hoặc mặt cầu Oxyz). Xác nhận nút **"🔬 Kiểm chứng CAS"** hiển thị màu xanh/nổi bật. Bấm vào nút: xuất hiện khung kết quả CAS chi tiết phía dưới lời giải. *(chưa kiểm)*
- [ ] **5.3. Đối với câu ngoài 72 câu (Unsupported):** Tìm một câu hình học không gian thuần túy hoặc dạng bài chưa hỗ trợ CAS. Xác nhận nút hiển thị trạng thái mờ vô hiệu hóa: **"🔬 Chưa hỗ trợ CAS"** và không bấm được; rê chuột vào hiện tooltip: *"Chưa hỗ trợ dạng này bằng CAS"*. *(chưa kiểm)*
- [ ] **5.4. Bất biến điểm số thi:** Xác nhận điểm số tổng, số câu đúng/sai của học sinh trên đầu trang không hề bị thay đổi sau khi bấm kiểm chứng CAS. *(chưa kiểm)*
