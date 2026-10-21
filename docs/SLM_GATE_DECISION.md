# BÁO CÁO CỔNG ĐIỀU KIỆN SLM & QUYẾT ĐỊNH DỪNG (SLM_GATE_DECISION.md)

> [!IMPORTANT]
> **QUYẾT ĐỊNH CHÍNH THỨC:** ĐỒNG Ý DỪNG, TUYỆT ĐỐI KHÔNG TIẾN HÀNH FINE-TUNE SLM (Không thực hiện Bước 2).
> Báo cáo này lưu trữ toàn bộ số liệu kiểm kê thực tế, giải thích phân định dữ liệu, đánh giá rủi ro rò rỉ (data leakage), và kế hoạch đo lường tầng Semantic Parser độc lập.

---

## 1. KIỂM KÊ KHO DỮ LIỆU CẶP (ĐỀ BÀI $\to$ DSL)

Đã xuất bản tệp kiểm kê chi tiết từng cặp tại:  
👉 **[`docs/dsl_pairs_inventory.csv`](file:///c:/Users/ADMIN/Downloads/hoctap/PUMKIN2/docs/dsl_pairs_inventory.csv)**

### Bảng tổng hợp số lượng cặp duy nhất (sau khi kiểm tra và phân loại tính độc lập):

| Nguồn dữ liệu | Tổng số cặp | Số cặp "đề vòng tròn" (loại bỏ) | Số cặp độc lập thực tế | Tác giả tạo DSL | Đã được GV duyệt |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **`bank`** (Đề thi chuẩn hóa `bench/data/all.json`) | 82 cặp | 0 | **82 cặp** | Soạn cùng solver | **Không** (chờ duyệt) |
| **`fixture`** (Bộ test `tests/fixtures/*/fixtures.json`) | 37 cặp | 29 cặp (lấy từ `dsl[restate_vi]`) | **8 cặp** | Soạn cùng solver | **Không** (chờ duyệt) |
| **`generator`** (Khuôn mẫu sinh tự động `app/generator`) | 20 cặp | 0 | **20 cặp** | Soạn cùng solver | **Không** (chờ duyệt) |
| **TỔNG CỘNG TRONG KHO** | **139 cặp** | **29 cặp** | **110 cặp duy nhất** | - | - |

> [!NOTE]
> Nếu chỉ xét riêng tập đề bài do con người biên soạn hoàn toàn (`bank` + `fixture` độc lập): $82 + 8 = \mathbf{90\text{ cặp}}$ (chính là con số 90 đã được kiểm chứng ở bước trước).

### Giải thích minh bạch 4 con số dữ liệu (82 vs 72 vs 90 vs 119):
1. **Con số 119:** Là tổng số mục đăng ký trong catalog tĩnh `_PREPARED_DSL_MAP` ([`bench/dsl_catalog.py`](file:///c:/Users/ADMIN/Downloads/hoctap/PUMKIN2/pumkin-math-api/bench/dsl_catalog.py#L19)), bao gồm:
   - 101 fixtures nạp từ 8 thư mục `tests/fixtures/*/fixtures.json`.
   - 6 câu hình phẳng tự sinh `q_gen_area_11` .. `16`.
   - 12 câu mặt cầu tự sinh `q_gen_matcau_1` .. `12`.
   - Tổng: $101 + 6 + 12 = 119$ mục.
2. **Con số 82:** Trong số 553 câu hỏi của ngân hàng đề `bench/data/all.json`, có đúng **82 câu** có mã định danh khớp với `_PREPARED_DSL_MAP`.
3. **Con số 72 (Prompt 11):** Trong số 82 câu ngân hàng có DSL, có đúng **72 câu** thuộc về 8 chuyên đề CAS mũi nhọn được kích hoạt chạy đánh giá trong bộ benchmark `bench.run --mode solver_only` ở Prompt 11. 10 câu còn lại là các câu nằm ngoài phạm vi 8 solver (ví dụ: `q_hsa_15`, `q_thpt_sa_01`, `q_superhard_type3_01`, v.v.).
4. **Con số 90:** Là số lượng mục trong 119 mục của catalog có văn bản đề bài thật từ con người (ngân hàng hoặc metadata fixture). 29 mục còn lại là "đề vòng tròn" (synthesized từ `dsl["restate_vi"]`).

---

## 2. PHÂN TÍCH TÍNH ĐỘC LẬP & NGUY CƠ RÒ RỈ DỮ LIỆU (DATA LEAKAGE)

* **Hiện trạng dữ liệu:** Toàn bộ các cặp DSL trong catalog hiện nay đều được tạo ra trong quá trình phát triển, căn chỉnh và kiểm thử các bộ giải SymPy CAS (`solve_dsl()`).
* **Hậu quả khoa học:** **TUYỆT ĐỐI KHÔNG ĐƯỢC DÙNG CÁC CẶP NÀY LÀM TẬP KIỂM ĐỊNH ĐỘC LẬP (HOLDOUT TEST SET)** cho bất kỳ mô hình Machine Learning hoặc SLM nào. Nếu dùng, hệ thống sẽ rơi vào cái bẫy "học vẹt trên tập test" (Data Leakage & Evaluation Overfitting), tạo ra số liệu ảo tưởng không phản ánh năng lực giải toán thực tế.
* **Đề xuất chiến lược phân tách Holdout (khi thu thập đủ dữ liệu trong tương lai):**
  1. **Phân cụm phân tầng (Cluster-stratified split):** Phải phân chia theo đề gốc / template cha. Toàn bộ các biến thể sinh ra từ cùng một mẫu bắt buộc phải nằm trọn vẹn trong một tập duy nhất (Train HOẶC Validation HOẶC Test).
  2. **Tỷ lệ phân chia:** 60% Train, 20% Validation, 20% Holdout Test.
  3. **Khóa cứng tập Test (Frozen Holdout):** Tập kiểm định 20% phải được trích xuất từ các đề thi độc lập bên ngoài (ví dụ các đề TSA/HSA 2025-2026 mới) và được niêm phong, không bao giờ được đưa vào mã nguồn solver hoặc prompt của LLM.

---

## 3. KẾ HOẠCH ĐO LƯỜNG TẦNG SEMANTIC PARSER (TEXT $\to$ DSL)

> [!NOTE]
> Kế hoạch này được lập sẵn trên giấy tờ để chuẩn bị phương pháp luận. **HỆ THỐNG CHƯA CHẠY BẤT KỲ LỆNH NÀO VÀ TIẾP TỤC CHỜ NGƯỜI DÙNG PHÊ DUYỆT NGÂN SÁCH.**

### a) Quy mô & Cơ cấu tập mẫu đo lường:
* **Quy mô:** $100 - 150$ đề bài độc lập.
* **Cơ cấu mẫu đại diện thực tế:**
  - Không chỉ gồm đề bài sách giáo khoa chỉn chu, mà bắt buộc có **đề gõ tự do của học sinh (unstructured input):** thiếu dấu tiếng Việt, viết tắt (`pt`, `hpt`, `tich phan`, `dx`, `ctg`, `R2`), ký hiệu toán học phi chuẩn.
* **Tiêu chuẩn nhãn Ground-Truth:**
  - Nhãn DSL bắt buộc do **Hội đồng Giáo viên Toán thẩm định độc lập** (Teacher-verified ground truth).
  - **TUYỆT ĐỐI KHÔNG DÙNG** các đề đã dùng để xây dựng hoặc căn chỉnh solver (loại bỏ hoàn toàn 119 câu trong `fixtures.json`).
* **Khoảng tin cậy thống kê (Wilson score 95% Confidence Interval):**
  - Công thức: $\hat{p} \pm 1.96 \sqrt{\frac{\hat{p}(1-\hat{p})}{N}}$
  - Với $N = 100$: Biên sai số (Margin of Error) là $\pm 4.9\% - 9.8\%$ tùy theo tỷ lệ chính xác quan sát.
  - Với $N = 150$: Biên sai số thu hẹp còn $\pm 4.0\% - 8.0\%$.

### b) Giả định kỹ thuật & Chi phí ước tính:
* **Mô hình thực tế đang cấu hình:** Google Gemini 2.0 Flash-Lite (`gemini-2.0-flash-lite`, nhiệt độ $T=0.0$).
* **Số lần chạy:** 3 lần chạy độc lập / đề (đo tính đồng thuận 3-sample consensus).
  - Với 50 đề: 150 calls.
  - Với 100 đề: 300 calls.
  - Với 150 đề: 450 calls.
* **Giả định chi phí 675 VNĐ trước đây:**
  - Đơn giá công bố: \$0.075 / 1M prompt tokens, \$0.30 / 1M completion tokens.
  - Giả định token: 1.200 prompt tokens (instructions + Pydantic schema + few-shot) + 300 completion tokens per call.
  - Chi phí 1 call: $\frac{1.200 \times 0.075 + 300 \times 0.30}{1.000.000} = \$0.00018$.
  - 150 calls: $150 \times \$0.00018 = \$0.027 \times 25.000\text{ VNĐ} = 675\text{ VNĐ}$ (hoặc 0 VNĐ nếu dùng Free Tier 15 RPM).
* **Chi phí ước tính cập nhật (nếu chạy 100 - 150 đề):**
  - 300 calls (100 đề): $\$0.054$ ($\approx 1.350\text{ VNĐ}$).
  - 450 calls (150 đề): $\$0.081$ ($\approx 2.025\text{ VNĐ}$).
  - (Hoặc **0 VNĐ** nếu tận dụng gói miễn phí Google AI Studio Free Tier).

### c) Chỉ số đo lường độc lập ở tầng Parse:
1. *Tỷ lệ Parse đúng cú pháp (Schema Validity Rate):* % phản hồi trả về đúng cấu trúc JSON Pydantic.
2. *Tỷ lệ Khớp ngữ nghĩa hình thức (AST/Semantic Match Rate):* % DSL sinh ra tương đương toán học với Ground-Truth DSL.
3. *Tỷ lệ SAI-MÀ-TỰ-TIN ở tầng Parse (Confident Misparse Rate):* Tỷ lệ parser sinh ra một DSL hợp lệ về cú pháp nhưng làm biến dạng sai hoàn toàn ý nghĩa đề bài gốc mà không tự kích hoạt cờ cảnh báo hay hạ độ tin cậy.
4. *Độ trễ phản hồi ước tính (p50, p95)* qua kết nối mạng thực tế.

---

## 4. HIỆU ĐÍNH NGUYÊN LÝ KHOA HỌC & GIỚI HẠN BẢN CHẤT CỦA CAS

1. **Gắn nhãn Ước tính:** Toàn bộ các con số về chi phí API và độ trễ đều là **ƯỚC TÍNH (ESTIMATED)** dựa trên bảng giá công bố của nhà cung cấp và đo lường giả lập mạng nội bộ.
2. **Loại bỏ tuyên bố tuyệt đối hóa:** Đã gỡ bỏ hoàn toàn các nhận định chủ quan như "vận hành cực kỳ ổn định" hoặc "triệt tiêu hoàn toàn ảo giác".
3. **Giới hạn bản chất của CAS Solver (SymPy):**
   - CAS Solver là công cụ tính toán hình thức đại số, nó chỉ bảo đảm rằng: *"Nếu đầu vào là biểu thức DSL này, thì kết quả toán học hình thức chính xác là đáp án kia"*.
   - **CAS HOÀN TOÀN KHÔNG CÓ KHẢ NĂNG KIỂM TRA DSL CÓ ĐÚNG Ý ĐỒ CỦA ĐỀ BÀI GỐC HAY KHÔNG.** Ví dụ: Nếu đề bài yêu cầu tìm *"nguyên hàm của $2x$"*, nhưng LLM parse nhầm thành *"đạo hàm của $2x$"*, CAS sẽ tính ra $2$ cực kỳ chính xác cho bài toán đạo hàm, nhưng kết quả đó hoàn toàn sai so với đề thi của học sinh!
4. **Vai trò sư phạm sống còn của `restate_vi`:**
   - Để ngăn chặn rủi ro parse sai nêu trên, sau khi sinh DSL, engine bắt buộc phải dịch ngược DSL thành văn bản đề bài toán học tiếng Việt chuẩn hóa (`restate_vi`).
   - Văn bản `restate_vi` được hiển thị công khai trên giao diện web cho học sinh và giáo viên thấy rõ *"Hệ thống đang hiểu đề bài là gì"*. Đây là cơ chế giám sát người-trong-vòng-lặp (Human-in-the-loop) minh bạch để phát hiện ngay các ca sai lệch ý đồ ở tầng parse.
5. **Bản chất quy tắc kinh nghiệm của ngưỡng 2.000 – 5.000:**
   - Ngưỡng 2.000 – 5.000 cặp dữ liệu là **quy tắc kinh nghiệm thực hành (heuristic rule of thumb)** thường thấy trong cộng đồng huấn luyện SLM/LLM cho tác vụ dịch văn bản sang ngôn ngữ miền hẹp (DSL), không phải là một định lý hay bảo chứng toán học.

---

## 5. ĐÃ XÁC NHẬN, CHỜ DUYỆT NGÂN SÁCH

* **Tên mô hình LLM thực tế đang cấu hình:** `gemini-2.0-flash-lite` (Google Gemini 2.0 Flash-Lite).
* **Nơi cấu hình trong hệ thống:**
  - Tệp cục bộ: [`pumkin-math-api/.env`](file:///c:/Users/ADMIN/Downloads/hoctap/PUMKIN2/pumkin-math-api/.env#L17) (`GEMINI_MODEL=gemini-2.0-flash-lite`, `LLM_PROVIDER=gemini`).
  - Tệp mẫu: [`pumkin-math-api/.env.example`](file:///c:/Users/ADMIN/Downloads/hoctap/PUMKIN2/pumkin-math-api/.env.example).
  - Tệp mã nguồn: [`app/parser/llm_client.py`](file:///c:/Users/ADMIN/Downloads/hoctap/PUMKIN2/pumkin-math-api/app/parser/llm_client.py#L128).
* **Tình trạng ngân sách:** **CHƯA ĐƯỢC DUYỆT (0 VNĐ / $0.00)**.
  - Giá trị khóa trong `.env` hiện tại là chuỗi mẫu: `AIzaSy_YOUR_GEMINI_API_KEY_HERE`.
  - Hệ thống đang được cô lập và chạy hoàn toàn bằng bộ giải ngoại tuyến FakeLLM + CAS Solver cục bộ, không gửi bất kỳ dữ liệu nào ra ngoài và không phát sinh bất kỳ khoản phí nào.
