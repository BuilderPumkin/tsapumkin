# PUMKIN MATH API — ĐẶC TẢ KỸ THUẬT & KIẾN TRÚC HỆ THỐNG (SPEC.md)

- **Dự án:** Pumkin Math API (Microservice tính toán tất định & kiểm định toán học độc lập)
- **Nền tảng phục vụ:** PUMKIN.DEV (`tsapumkin.pages.dev`) — Luyện thi Toán THPT, TSA (Đánh giá tư duy ĐHBK Hà Nội), HSA (Đánh giá năng lực ĐHQG Hà Nội).
- **Trạng thái tài liệu:** Đã hoàn thiện khảo sát & phân tách chi tiết (Prompt 1 Revision 2) — Chờ Product Owner duyệt danh mục dạng bài ưu tiên.
- **Tác giả:** Senior Backend/AI Engineer kiêm Release Engineer.

---

## 1. Mục Tiêu Hệ Thống

Pumkin Math API là microservice độc lập (Python 3.11+, FastAPI, Pydantic v2, SymPy, chạy không root trong container Docker), đóng vai trò là "Bộ não tính toán tất định và thẩm định toán học độc lập" cho nền tảng PUMKIN.DEV. Microservice cung cấp 3 endpoint RESTful dùng chung:

1. **`POST /v1/solve` (Gia sư Socratic AI):**
   - Hỗ trợ học sinh giải bài toán theo thang gợi ý phân bậc sư phạm 4 tầng (Socratic Scaffolding):
     - **Bậc 1 (Nudge):** Đặt câu hỏi gợi mở hướng nhìn trực quan.
     - **Bậc 2 (Concept Reminder):** Khơi gợi lại định lý, công thức hoặc điều kiện xác định.
     - **Bậc 3 (Sub-goal):** Hướng dẫn học sinh giải quyết bước con đầu tiên.
     - **Bậc 4 (Worked Step):** Hướng dẫn vượt qua nút thắt để học sinh tự hoàn thành.
   - Tuyệt đối không đưa đáp số cuối cùng ở các bậc gợi ý đầu.

2. **`POST /v1/check` (Chấm bài thi & Đánh giá bước giải):**
   - Đánh giá tính đúng/sai của từng bước biến đổi trung gian hoặc kết quả cuối cùng do học sinh nhập vào.
   - Nhận diện các bẫy nhận thức điển hình (`misconception_traps`) để đưa ra phản hồi chẩn đoán sư phạm chính xác.

3. **`POST /v1/generate` (Tạo đề & Biến thể câu hỏi tương đương):**
   - Sinh câu hỏi tương đương hoặc câu hỏi biến thể dựa trên tham số hóa toán học tất định, đảm bảo nghiệm số đẹp và kiểm soát chặt chẽ 3 phương án nhiễu theo bẫy nhận thức chuẩn.

### Kiến Trúc Tầng (Layered Architecture)
```
[Học sinh / Trình duyệt Web (Pumkin Web Client)]
                       │
                       ▼
[Cloudflare Pages Function (Gateway)] ── (Nằm ở functions/, giữ API Secret, Rate Limiting, Auth)
                       │ (RESTful HTTPS / Internal Secret Key)
                       ▼
[FastAPI Microservice (Pumkin Math API)]
   ├─► [1. Semantic Parser (LLM)] ──────── (Chỉ dịch đề TV sang DSL JSON; TUYỆT ĐỐI KHÔNG TÍNH TOÁN)
   ├─► [2. DSL Allowlist Grammar Parser] ─ (Pydantic v2 schema validation, cấm injection, không eval)
   ├─► [3. Deterministic Solver (SymPy)] ─ (Thực thi tính toán đại số/giải tích tất định 100%)
   ├─► [4. Cross-Verification Engine] ──── (Kiểm chứng chéo nghiệm, điều kiện xác định, kiểm tra bẫy)
   ├─► [5. Conflict & Ambiguity Router] ── (Xử lý mâu thuẫn CAS vs Đáp án gốc; ghi log audit)
   └─► [6. Socratic Pedagogical Formatter]  (Định dạng công thức KaTeX \( ... \), sư phạm 4 bậc)
```

---

## 2. Ba Nguyên Tắc Cố Định (Bất Khả Xâm Phạm)

1. **LLM không bao giờ tạo đáp án và KHÔNG sinh code Python để chạy:**
   - LLM chỉ đóng vai trò bộ dịch ngữ nghĩa (Semantic Parser) chuyển văn bản đề bài tiếng Việt sang cấu trúc dữ liệu JSON trung gian (Domain Specific Language - DSL) theo schema Pydantic định nghĩa sẵn.
   - Toàn bộ các phép biến đổi, giải phương trình, tính đạo hàm, tích phân, tính ma trận đều do bộ giải tất định (SymPy) thực hiện.
2. **Không tuyên bố "chính xác 100%":**
   - Mọi kết quả trả về bắt buộc mang nhãn trạng thái minh bạch: `status: verified | needs_review | unsupported | error`, kèm mức độ tin cậy (`confidence`: $0.0 \rightarrow 1.0$) và phương pháp kiểm chứng (`method`).
   - Tuân thủ nguyên tắc: *Không chắc thì từ chối, không đoán mò.* Khi chấm bài (`/v1/check`), nếu hệ thống không chắc chắn thì KHÔNG được trừ điểm học sinh.
3. **Không bao giờ dùng `eval()`, `exec()`, `sympify()`, `parse_expr()` trên chuỗi đầu vào tự do:**
   - Cấm triệt để việc parse chuỗi do người dùng hoặc LLM cung cấp bằng các hàm thực thi động của Python hoặc SymPy.
   - Mọi biểu thức toán học phải đi qua bộ phân tích cú pháp AST có danh sách cho phép (Allowlist Grammar Parser), chỉ chấp nhận các toán tử và hàm số toán học hợp lệ đã khai báo trong ngữ pháp.

---

## 3. Khảo Sát Thực Tế Dữ Liệu `data/questions/all.json`

Dựa trên kết quả đo lường và phân loại tự động bằng công cụ tất định `tools/classify_questions.py` trên toàn bộ **553 câu hỏi**:

### 3.1. Phân bố theo hình thức câu hỏi (`type`)
| Hình thức (`type`) | Số lượng câu | Tỷ lệ (%) | Đặc điểm lưu trữ đáp án |
| :--- | :---: | :---: | :--- |
| **`single_choice`** | 521 | 94.21% | `options` (4 chuỗi KaTeX), `correct_answer` (chỉ số nguyên `0, 1, 2, 3`). |
| **`true_false_group`** | 14 | 2.53% | `items` (4 mệnh đề `a, b, c, d`, mỗi ý có `correct: boolean`). |
| **`short_answer`** | 11 | 1.99% | `correct_value` hoặc `correct_answer` (số nguyên, phân số dạng chuỗi). |
| **`drag_drop`** | 5 | 0.90% | `cloze_text`, `blanks` (`id, correct`), `drag_items` (`id, content`). |
| **`step_solution`** | 2 | 0.36% | `correct_answer` là biểu thức đại số dạng chuỗi (ví dụ `"150x - 147"`). |
| **TỔNG CỘNG** | **553** | **100.00%** | **Khớp chính xác 100%, không thiếu không dư.** |

### 3.2. Phân bố theo cấu trúc định dạng đáp án
| Định dạng đáp án | Số câu | Tỷ lệ (%) | Ví dụ thực tế trong dữ liệu |
| :--- | :---: | :---: | :--- |
| **Biểu thức chứa biến / tham số** | 390 | 70.52% | `\(r = \sqrt[3]{2/3}\text{ m}\)`, `\(y = 4x + 1\)`, `150x - 147` |
| **Số thuần túy (nguyên, phân số, căn)** | 113 | 20.43% | `\(1\)`, `\(32\)`, `\(\frac{68}{69}\)`, `\(\sqrt{2}\)` |
| **Khoảng / Đoạn nghiệm** | 28 | 5.06% | `\((0; 2)\)`, `\((-\infty; 1]\)`, `\([1; 5)\)` |
| **Chùm Đúng / Sai 4 ý** | 14 | 2.53% | `a: Đúng, b: Sai, c: Đúng, d: Đúng` |
| **Kéo thả điền khuyết** | 5 | 0.90% | Điền giá trị tiệm cận vào ô trống |
| **Tập nghiệm liệt kê** | 3 | 0.54% | `S = \{-1; 2\}` |
| **TỔNG CỘNG** | **553** | **100.00%** | **Khớp 100%.** |

### 3.3. Xác nhận tính độc lập của con số 521 (Chứng minh toán học)
Con số **521 câu `single_choice`** và con số **521 câu thuộc 8 dạng ưu tiên cũ ở Prompt 1 (V1)** hoàn toàn là **trùng hợp ngẫu nhiên**, không phải lỗi tái dùng biến hay nhầm số:
- Tập hợp $A$ (các câu `single_choice`): 521 câu. Trong đó có **29 câu** nằm ngoài 8 dạng ưu tiên (thuộc hình học không gian cổ điển, số phức, thống kê).
- Tập hợp $B$ (các câu thuộc 8 dạng ưu tiên V1): 521 câu. Trong đó có **29 câu** thuộc các dạng bài phi trắc nghiệm đơn (`short_answer`, `true_false_group`, `drag_drop`, `step_solution`).
- Tập giao nhau $A \cap B$: **492 câu**.
- Số phần tử chỉ thuộc $A$ ($A \setminus B$): 29 câu. Số phần tử chỉ thuộc $B$ ($B \setminus A$): 29 câu.
- Hệ thức: $|A| = |A \cap B| + |A \setminus B| = 492 + 29 = 521$; $|B| = |A \cap B| + |B \setminus A| = 492 + 29 = 521$.

---

## 4. Phân Tách Chi Tiết Nhóm Hàm Số & Danh Mục Phân Loại Toàn Diện (22 Nhóm)

Thực hiện yêu cầu tại **Phần 2 của Phản hồi Prompt 1**, nhóm cũ "Cực trị & Đơn điệu" (268 câu) được phân tách triệt để thành các nhóm con toán học độc lập, kèm thứ tự ưu tiên phân giải nghiêm ngặt.

### 4.1. Quy tắc phân giải ưu tiên khi gán nhãn (Strict Priority Cascade)
Mỗi câu hỏi chỉ thuộc đúng **MỘT** nhóm duy nhất theo thứ tự ưu tiên từ trên xuống dưới:
1. **Ưu tiên 1 (Ngoại vi - Unsupported):** Nếu thuộc phạm vi ngoài (Số phức, Hình học cổ điển, Thống kê, Thuật toán, Số học đồng dư) $\rightarrow$ Gán nhóm Unsupported tương ứng.
2. **Ưu tiên 2 (Hình học Oxyz):** Chứa dữ kiện tọa độ không gian $Oxyz$ $\rightarrow$ `hinh_hoc_oxyz`.
3. **Ưu tiên 3 (Tổ hợp & Xác suất):** Chứa quy tắc đếm, xác suất, Bayes, hoán vị bàn tròn $\rightarrow$ `to_hop_xac_suat`.
4. **Ưu tiên 4 (Tích phân & Vi phân):** Chứa tích phân, nguyên hàm, diện tích, thể tích tròn xoay, phương trình vi phân $\rightarrow$ `nguyen_ham_tich_phan` hoặc `phuong_trinh_vi_phan`.
5. **Ưu tiên 5 (Đại số tuyến tính & Ma trận):** Chứa ma trận, định thức, hệ Cramer $\rightarrow$ `dai_so_tuyen_tinh_ma_tran`.
6. **Ưu tiên 6 (Mũ & Logarit):** Chứa phương trình/bất phương trình mũ, logarit, lãi kép $\rightarrow$ `mu_logarit_pt_bpt`.
7. **Ưu tiên 7 (Giới hạn & Dãy số):** Chứa giới hạn, dãy số, cấp số $\rightarrow$ `gioi_han_day_so`.
8. **Ưu tiên 8 (Toán thực tế / Tối ưu hóa):** Bài toán có bối cảnh thực tiễn (chi phí, lợi nhuận, thể tích, vận tốc, uốn sợi dây...) $\rightarrow$ `ham_so_toan_thuc_te_toi_uu` (Ưu tiên hơn hàm số thuần túy).
9. **Ưu tiên 9 (Hàm số chứa tham số m):** Có chứa tham số $m$ cần tìm điều kiện đơn điệu, cực trị, GTLN/GTNN $\rightarrow$ `ham_so_chua_tham_so_m`.
10. **Ưu tiên 10 (GTLN/GTNN trên đoạn/khoảng không tham số):** $\rightarrow$ `ham_so_gtln_gtnn_doan_khoang`.
11. **Ưu tiên 11 (Cực trị hàm cho trước không tham số):** $\rightarrow$ `ham_so_cuc_tri_cho_truoc`.
12. **Ưu tiên 12 (Tính đạo hàm cơ bản):** Đạo hàm hàm hằng, đa thức, lũy thừa $\rightarrow$ `ham_so_dao_ham_co_ban`.
13. **Ưu tiên 13 (Tính đơn điệu không tham số):** $\rightarrow$ `ham_so_tinh_don_dieu`.
14. **Ưu tiên 14 (Đọc bảng biến thiên có công thức giải tích):** $\rightarrow$ `ham_so_doc_bang_bien_thien`.
15. **Ưu tiên 15 (Tiệm cận & Khảo sát đồ thị):** $\rightarrow$ `ham_so_tiem_can`.
16. **Ưu tiên 16 (Dạng khác chương hàm số):** Tương giao đồ thị, tiếp tuyến $\rightarrow$ `ham_so_dang_khac`.

### 4.2. Bảng thống kê toàn diện 553 câu hỏi ngân hàng đề (Đo lường thực tế)
| STT | Mã nhóm dạng bài | Tên gọi chuẩn hóa | Số câu thật | Tỷ lệ (%) | Phạm vi xử lý |
| :---: | :---|:---|:---:|:---:|:---:|
| 1 | `ham_so_tinh_don_dieu` | Xét tính đơn điệu, đồng biến/nghịch biến (không tham số) | 116 | 20.98% | **Ưu tiên Đợt 1** |
| 2 | `ham_so_dao_ham_co_ban` | Tính đạo hàm cơ bản (hàm hằng, đa thức, lũy thừa) | 91 | 16.46% | **Ưu tiên Đợt 1** |
| 3 | `hinh_hoc_oxyz` | Hình học tọa độ Oxyz (Điểm, Mặt phẳng, Đường thẳng, Mặt cầu) | 62 | 11.21% | **Ưu tiên Đợt 1** |
| 4 | `nguyen_ham_tich_phan` | Nguyên hàm, Tích phân & Diện tích/Thể tích tròn xoay | 54 | 9.76% | **Ưu tiên Đợt 1** |
| 5 | `to_hop_xac_suat` | Tổ hợp & Xác suất (Cổ điển, Bayes, Hoán vị vòng/Bàn tròn) | 52 | 9.40% | **Ưu tiên Đợt 1** |
| 6 | `mu_logarit_pt_bpt` | Mũ, Logarit & PT/BPT mũ-log (kể cả bài toán lãi kép) | 39 | 7.05% | **Ưu tiên Đợt 1** |
| 7 | `ham_so_tiem_can` | Tiệm cận & Khảo sát đồ thị hàm số | 19 | 3.44% | **Ưu tiên Đợt 1** |
| 8 | `gioi_han_day_so` | Giới hạn, Dãy số & Cấp số cộng/nhân | 13 | 2.35% | **Ưu tiên Đợt 1** |
| 9 | `ham_so_dang_khac` | Dạng khác chương hàm số (tương giao, tiếp tuyến) | 12 | 2.17% | **Ưu tiên Đợt 1** |
| 10 | `dai_so_tuyen_tinh_ma_tran` | Đại số tuyến tính, Ma trận & Hệ phương trình | 12 | 2.17% | **Ưu tiên Đợt 1** |
| 11 | `ham_so_toan_thuc_te_toi_uu` | Toán thực tế & Tối ưu hóa (chi phí, thể tích, vận tốc...) | 11 | 1.99% | **Ưu tiên Đợt 1** |
| 12 | `phuong_trinh_vi_phan` | Phương trình vi phân (cấp 1, Euler-Cauchy, dao động) | 10 | 1.81% | **Ưu tiên Đợt 1** |
| 13 | `ham_so_gtln_gtnn_doan_khoang` | GTLN & GTNN trên đoạn/khoảng (không tham số) | 8 | 1.45% | **Ưu tiên Đợt 1** |
| 14 | `ham_so_cuc_tri_cho_truoc` | Cực trị của hàm số cho trước (không tham số) | 8 | 1.45% | **Ưu tiên Đợt 1** |
| 15 | `phuong_trinh_bat_phuong_trinh_dai_so` | Phương trình & Bất phương trình đại số (không mũ-log) | 4 | 0.72% | **Ưu tiên Đợt 1** |
| 16 | `ham_so_doc_bang_bien_thien` | Đọc bảng biến thiên / Bảng xét dấu (có công thức giải tích) | 2 | 0.36% | **Ưu tiên Đợt 1** |
| 17 | `ham_so_chua_tham_so_m` | Hàm số chứa tham số m (cực trị, đơn điệu, min/max) | 2 | 0.36% | **Ưu tiên Đợt 1** |
| 18 | `unsupported_hinh_khong_gian_co_dien` | [UNSUPPORTED] Hình học không gian cổ điển (Thể tích đa diện) | 21 | 3.80% | **Ngoài phạm vi** |
| 19 | `unsupported_so_phuc` | [UNSUPPORTED] Số phức (Môđun, phần thực/ảo, nghiệm phức) | 5 | 0.90% | **Ngoài phạm vi** |
| 20 | `unsupported_thong_ke` | [UNSUPPORTED] Thống kê mô tả (Phương sai, độ lệch chuẩn) | 3 | 0.54% | **Ngoài phạm vi** |
| 21 | `unsupported_thuat_toan_do_thi` | [UNSUPPORTED] Tư duy thuật toán & Đồ thị (Mã giả, sắp xếp) | 6 | 1.08% | **Ngoài phạm vi** |
| 22 | `unsupported_so_hoc_dong_du` | [UNSUPPORTED] Số học & Đồng dư thức (Fermat nhỏ, chữ số tận cùng) | 3 | 0.54% | **Ngoài phạm vi** |
| **TỔNG** | **TOÀN BỘ NGÂN HÀNG ĐỀ** | **22 NHÓM PHÂN BIỆT** | **553** | **100.00%** | **Khớp 100%** |

### 4.3. Đề xuất Danh mục dạng bài Ưu tiên Đợt 1 (Core Scope)
Sau khi phân tách và loại trừ các dạng ngoài phạm vi (38 câu Unsupported), danh mục đề xuất triển khai Đợt 1 gồm **17 nhóm bài toán In-Scope**, chiếm **515 / 553 câu (93.13% độ phủ toàn hệ thống)**:
- Nhóm Giải tích Hàm số (9 tiểu mục): 269 câu (48.64%)
- Nhóm Hình học tọa độ Oxyz: 62 câu (11.21%)
- Nhóm Nguyên hàm & Tích phân: 54 câu (9.76%)
- Nhóm Tổ hợp & Xác suất: 52 câu (9.40%)
- Nhóm Mũ, Logarit & Lãi kép: 39 câu (7.05%)
- Nhóm Giới hạn, Dãy số: 13 câu (2.35%)
- Nhóm Đại số tuyến tính, Ma trận: 12 câu (2.17%)
- Nhóm Phương trình vi phân: 10 câu (1.81%)
- Nhóm PT/BPT đại số thuần: 4 câu (0.72%)

*(Danh mục này chờ Product Owner phê duyệt trước khi bắt đầu Prompt 2).*

---

## 5. Chính Sách Nhận Diện Câu Phụ Thuộc Trực Quan & Hình Vẽ

### 5.1. Khảo sát Schema thực tế
- Quét toàn bộ schema 553 câu hỏi đối với các trường liên quan đến hình ảnh (`image`, `figure`, `img`, `url`, `diagram`, `svg`, `attachment`, `photo`, `draw`, `asset`):
  - **Kết quả: 0 trường hình ảnh.** Ngân hàng câu hỏi PUMKIN.DEV hiện tại lưu trữ 100% dữ liệu dưới dạng văn bản và KaTeX, không có tệp đính kèm nhị phân.
  - Trường `sandbox_config` (114 câu): Lưu cấu hình tọa độ cho khung tương tác JSXGraph phía client, không phải tệp ảnh.

### 5.2. Quét văn bản đề bài và phân loại 2 mức độ
Quét toàn bộ văn bản đề bài bằng bộ từ khóa trực quan: *"hình vẽ", "hình bên", "đồ thị bên", "đồ thị như hình", "bảng biến thiên", "bảng sau", "như hình", "cho hàm số có đồ thị", "hình dưới", "biểu đồ", "sơ đồ", "cho hình", "(H)", "tam giác", "hình chóp", "hình nón", "hình trụ", "khối đa diện", "lăng trụ", "hình phẳng", "đồ thị"*.
- **Phát hiện:** 71 câu có xuất hiện các từ khóa trên.
- **Phân loại 2 mức độ:**
  1. **`HARD-UNSUPPORTED` (0 câu):** Các câu đòi hỏi học sinh/hệ thống phải nhìn trực tiếp vào hình vẽ bên ngoài mà văn bản KHÔNG cung cấp đủ dữ kiện số học hoặc công thức đại số. Do ngân hàng đề được biên soạn khép kín cho web text, không có câu nào bị thiếu dữ kiện đến mức không thể đọc bằng văn bản.
  2. **`SOFT-REVIEW` (71 câu):** Các câu có nhắc đến hình học/bảng biểu/đồ thị nhưng toàn bộ giả thiết, tham số, công thức hàm số (ví dụ $y = f(x)$, $f'(x) = (x-1)^2(x+2)(x-3)^3$), hoặc kích thước hình học (hình trụ dung tích $V = 2\pi$, hình chóp cạnh đáy 4 chiều cao 6) đều đã được mô tả đầy đủ bằng văn bản và LaTeX.

### 5.3. Quy tắc xử lý đầu vào trong SPEC
- **Đối với câu HARD-UNSUPPORTED:** Hệ thống tự động trả về `status: "unsupported"`, `confidence: 0.0`, `method: "visual_dependency_filter"`, từ chối giải quyết tất định.
- **Đối với câu SOFT-REVIEW:** Hệ thống xử lý qua bộ giải SymPy bình thường, nhưng gán cờ `visual_context: true`. Nếu quá trình giải gặp bất kỳ độ lệch hoặc mơ hồ nào về mặt quy ước chiều không gian/nhánh đồ thị, hệ thống lập tức hạ trạng thái về `status: "needs_review"` và không được kết luận võ đoán.

---

## 6. Chính Sách Phạm Vi Ngoài (Out-of-Scope Policy)

Theo quyết định đã chốt tại **Phần 4 của Phản hồi Prompt 1**:

1. **Loại Số phức khỏi phạm vi hỗ trợ (`unsupported_so_phuc` - 5 câu):**
   - **Lý do:** Số phức trong đề thi TSA/HSA thường liên quan đến tập hợp điểm biểu diễn hình học trên mặt phẳng phức Gauss hoặc quỹ tích cực trị môđun $|z - z_0| = R$. Đợt 1 tập trung tối ưu bộ giải giải tích số thực $\mathbb{R}$ và hình học không gian $Oxyz$.
   - **Điều kiện xem xét lại:** Sẽ được mở rộng ở phiên bản sau khi bổ sung mô-đun đại số phức chuyên dụng trong SymPy (`sympy.I`, phân tích dạng lượng giác $r(\cos\varphi + i\sin\varphi)$ và tập hợp điểm phẳng).
2. **Hình học không gian cổ điển (`unsupported_hinh_khong_gian_co_dien` - 21 câu):**
   - **Lý do:** Đòi hỏi dựng đường cao phụ, chứng minh quan hệ vuông góc/song song thuần túy bằng tiên đề Euclid, không có hệ tọa độ $Oxyz$ để đại số hóa tất định.
3. **Thống kê mô tả (`unsupported_thong_ke` - 3 câu):**
   - **Lý do:** Dữ liệu dạng bảng số liệu ghép nhóm và tính các số đặc trưng (phương sai, độ lệch chuẩn, tứ phân vị). Được tách khỏi phạm vi giải tích toán học cốt lõi của microservice.
4. **Tư duy thuật toán & Đồ thị (`unsupported_thuat_toan_do_thi` - 6 câu):**
   - **Lý do:** Đọc hiểu mã giả, mô phỏng thuật toán Bubble Sort, đường đi liên thông đồ thị.
5. **Số học & Đồng dư thức (`unsupported_so_hoc_dong_du` - 3 câu):**
   - **Lý do:** Định lý Fermat nhỏ, tìm chữ số tận cùng của lũy thừa lớn, phân tích modulo.

---

## 7. Chuẩn Hóa Dữ Liệu Đầu Vào (Input Normalization Layer)

Nhằm đảm bảo nguyên tắc **KHÔNG SỬA DỮ LIỆU GỐC** `data/questions/all.json`, tầng nạp dữ liệu (Question Loader Layer) của microservice chịu trách nhiệm chuẩn hóa:

1. **Ánh xạ trường đáp án không chuẩn:**
   - Dữ liệu gốc có 2 câu hỏi ngắn (`q_tsa_num_02`, `q_tsa_prob_03`) lưu đáp số trong trường `correct_answer` thay vì `correct_value` như các câu `short_answer` khác.
   - Loader tự động phát hiện kiểu câu hỏi `type == 'short_answer'` và ánh xạ thống nhất về trường nội bộ:
     ```python
     standard_answer = q.get('correct_value') or q.get('correct_answer')
     ```
2. **Cơ chế phát hiện và cảnh báo Schema bất thường (Anomaly Logging):**
   - Khi phát hiện câu hỏi thiếu trường bắt buộc (`question`, `type`, `options`/`correct_answer`) hoặc có trường lạ nằm ngoài schema chuẩn, loader ghi log cảnh báo:
     `WARNING: Non-standard answer schema detected for question {qid}: type={qtype}, keys={keys}`
   - Bản ghi vẫn được tải an toàn mà không làm sập ứng dụng (Graceful Degradation).

---

## 8. Xử Lý Mâu Thuẫn Giữa Bộ Giải CAS và Đáp Án Gốc (CAS Conflict Resolution)

Khi kết quả tính toán tất định của SymPy mâu thuẫn với đáp án được lưu trong ngân hàng đề gốc:

1. **Nguyên tắc xử lý trạng thái:**
   - Hệ thống **TUYỆT ĐỐI KHÔNG TỰ Ý KẾT LUẬN AI ĐÚNG AI SAI**.
   - Trả về payload với `status: "needs_review"`.
   - Payload bắt buộc đính kèm song song cả hai kết quả để chuyên gia đối chiếu:
     ```json
     {
       "status": "needs_review",
       "confidence": 0.50,
       "method": "sympy_cas_solver",
       "conflict": {
         "cas_result": "x = 2",
         "original_answer": "x = -2",
         "discrepancy_type": "VALUE_MISMATCH"
       },
       "message": "Phát hiện mâu thuẫn giữa tính toán đại số tất định và đáp án lưu trữ. Chuyển sang hàng đợi thẩm định chuyên gia."
     }
     ```
2. **Chính sách bảo vệ quyền lợi học sinh khi chấm bài (`/v1/check`):**
   - Khi xảy ra mâu thuẫn CAS vs Đáp án gốc, hoặc khi trạng thái là `needs_review`/`unsupported`:
   - **TUYỆT ĐỐI KHÔNG ĐƯỢC TRỪ ĐIỂM HỌC SINH.**
   - Điểm số của câu hỏi được bảo lưu (`score_status: "deferred_review"`), không bị ghi nhận là trả lời sai.
3. **Cơ chế ghi nhận và báo cáo tự động (Audit Logging):**
   - Mọi mâu thuẫn được ghi ngay lập tức vào tệp nhật ký `reports/cas_conflicts.jsonl` theo cấu trúc:
     `{"timestamp": "...", "question_id": "...", "prompt": "...", "cas_output": "...", "bank_output": "...", "reviewed": false}`
   - Tệp này phục vụ ban biên tập học thuật rà soát và sửa lỗi ngân hàng đề định kỳ.

---

## 9. Định Nghĩa 4 Trạng Thái Đầu Ra & Chính Sách Sư Phạm

Mọi phản hồi từ Pumkin Math API bắt buộc phải chứa trường `status` thuộc 1 trong 4 giá trị:

1. **`verified` (Đã kiểm chứng chuẩn xác):**
   - Đã được SymPy giải thành công và đối chiếu chéo (Cross-verification) vượt qua 100% các điều kiện biên.
   - `confidence`: $\ge 0.95$.
2. **`needs_review` (Cần con người xem xét):**
   - Kết quả giải được nhưng còn mâu thuẫn với đáp án gốc, hoặc thuộc nhóm câu hỏi trực quan `SOFT-REVIEW` có nguy cơ hiểu nhầm ngữ cảnh.
   - `confidence`: $0.50 \le \text{confidence} < 0.95$.
3. **`unsupported` (Ngoài phạm vi hỗ trợ):**
   - Câu hỏi thuộc 5 nhóm Unsupported hoặc thuộc diện `HARD-UNSUPPORTED`.
   - `confidence`: $0.0$.
4. **`error` (Lỗi xử lý):**
   - Lỗi cú pháp DSL, timeout quá 10 giây, hoặc lỗi ngoại lệ runtime không xác định.
   - `confidence`: $0.0$.

---

## 10. Các Chỉ Số Thành Công (KPIs Đo Lường Hệ Thống)

Hệ thống đặt ra **5 chỉ số đo lường chất lượng cốt lõi** (**CHƯA ĐẶT NGƯỠNG CỐ ĐỊNH** vì cần chạy benchmark đo baseline thực tế ở các Prompt tiếp theo):

1. **Độ chính xác toán học (Mathematical Accuracy):** Tỷ lệ các bài toán có status `verified` cho kết quả trùng khớp hoàn toàn với đáp án chuẩn của ngân hàng đề.
2. **Độ phủ giải quyết (Coverage Rate):** Tỷ lệ các câu hỏi trong ngân hàng đề được giải quyết thành công (`verified` + `needs_review`) trên tổng số câu trong phạm vi (In-Scope).
3. **Tỷ lệ Sai-mà-Tự-tin (False Confidence Rate - Chỉ số rủi ro nguy hiểm nhất):** Tỷ lệ câu hỏi bị giải sai toán học nhưng hệ thống vẫn tự tin gán nhãn `verified`. Mục tiêu phải tiệm cận $0.0\%$.
4. **Độ trễ xử lý (Latency P95):** Thời gian phản hồi từ lúc nhận request đến khi hoàn tất giải quyết (đo tại endpoint FastAPI, không tính độ trễ mạng Internet).
5. **Tỷ lệ mâu thuẫn CAS và đáp án gốc (CAS-Original Conflict Rate):** Tỷ lệ các câu hỏi mà bộ giải SymPy tính ra kết quả khác với trường đáp án lưu sẵn trong ngân hàng đề. Chỉ số này phản ánh độ sạch của ngân hàng dữ liệu đề thi.
