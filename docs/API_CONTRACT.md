# PUMKIN MATH API — HỢP ĐỒNG DỮ LIỆU & ĐẶC TẢ GIAO DIỆN (API_CONTRACT.md)

- **Phiên bản hợp đồng:** `v1.0.0`
- **Mã dịch vụ:** `Pumkin Math API` (Microservice tính toán tất định & kiểm định toán học)
- **Nền tảng tích hợp:** Cloudflare Pages Gateway (`functions/api/math/*`) $\rightarrow$ FastAPI Backend.
- **Tác giả:** Senior Backend/AI Engineer kiêm Release Engineer.

---

## 1. Nguyên Tắc Thiết Kế Hợp Đồng (Contract Design Principles)

Hợp đồng dữ liệu này quy định cấu trúc giao tiếp giữa **Cloudflare Pages Gateway** (Client-side proxy giữ secret) và **FastAPI Microservice**, tuân thủ 3 nguyên tắc bất khả xâm phạm:
1. **Toàn vẹn kiểu dữ liệu (Strict Typing):** Mọi schema đều được kiểm tra chặt chẽ bằng Pydantic v2. Mọi trường lạ (extra fields) đều bị **từ chối ngay lập tức** (`extra="forbid"`).
2. **Phiên bản hóa tường minh (Explicit Versioning):** Mọi endpoint nghiệp vụ đều mang tiền tố `/v1/`. Mọi phản hồi đều chứa trường `schema_version: "1.0.0"` và `trace_id` (UUIDv4) để phục vụ giám sát và truy vết sự cố.
3. **Cấu trúc bao đóng thống nhất (Standardized Response Envelope):** Mọi kết quả trả về từ `/v1/solve`, `/v1/check`, `/v1/generate` đều được bọc trong cấu trúc phong bì `BaseResponseEnvelope`.

### 1.1. Quy tắc quản lý phiên bản SemVer cho `schema_version`
Trường `schema_version` tuân thủ nguyên tắc Semantic Versioning (`MAJOR.MINOR.PATCH`):
- **MAJOR bump (vd: `1.0.0` $\rightarrow$ `2.0.0`):** Khi có thay đổi phá vỡ tương thích (breaking changes) với client cũ:
  - Xóa bỏ hoặc đổi tên một trường trong Request hoặc Response.
  - Thay đổi kiểu dữ liệu của một trường (vd: chuyển từ chuỗi sang đối tượng).
  - Bổ sung trường bắt buộc mới trong Request payload.
- **MINOR bump (vd: `1.0.0` $\rightarrow$ `1.1.0`):** Khi bổ sung tính năng nhưng bảo toàn tương thích ngược (backwards-compatible):
  - Bổ sung trường tùy chọn (`optional` / có giá trị mặc định) trong Request hoặc Response.
  - Bổ sung giá trị mới vào Enum mà client có thể xử lý an toàn bằng fallback.
- **PATCH bump (vd: `1.0.0` $\rightarrow$ `1.0.1`):** Khi có chỉnh sửa tài liệu, sửa lỗi nhỏ về định dạng hoặc cập nhật mô tả sư phạm mà không thay đổi bất kỳ trường hay kiểu dữ liệu nào.

---

## 2. Quy Ước Cú Pháp Toán Học KaTeX (Mathematical Notation Standard)

Để tương thích tuyệt đối với bộ dựng KaTeX trên trình duyệt của website PUMKIN.DEV:
- **Công thức cùng dòng (Inline Math):** BẮT BUỘC sử dụng dấu ngoặc đơn có escape: `\( ... \)`.
  - *Ví dụ hợp lệ:* `"Cho hàm số \(y = x^3 - 3x\) có tập xác định \(D = \mathbb{R}\)."`
- **Công thức khối / hiển thị riêng (Block/Display Math):** BẮT BUỘC sử dụng dấu ngoặc vuông có escape: `\[ ... \]`.
  - *Ví dụ hợp lệ:* `"\[ \lim_{x \to 0} \frac{\sin x}{x} = 1 \]"`
- **QUY TẮC CẤM:**
  - Tuyệt đối KHÔNG dùng ký tự `$` hoặc `$$` trần trong chuỗi JSON để tránh xung đột với cú pháp biến môi trường, định dạng tiền tệ hoặc lỗi parser markdown.

---

## 3. Quy Tắc Giao Diện Người Dùng & Bảng Ánh Xạ Huy Hiệu (UI Badge Mapping)

### 3.1. Quy tắc hiển thị bất biến trên giao diện (Frontend Invariant Rule)
> [!IMPORTANT]
> **NGHIÊM CẤM HIỂN THỊ CỤM TỪ "CHÍNH XÁC 100%" TRÊN GIAO DIỆN:**
> Nền tảng học thuật PUMKIN.DEV coi việc tuyên bố "chính xác 100%" là phi khoa học và phản sư phạm. Mọi kết luận toán học hiển thị cho học sinh đều phải minh bạch về phương pháp kiểm chứng (`method: symbolic | numeric | consensus`) và mức độ tin cậy (`confidence.level`).

### 3.2. Định nghĩa chính xác phương pháp kiểm chứng (`confidence.method`)
Hệ thống xác định tường minh vai trò của các phương pháp:
- **`symbolic`:** Tính toán thuần túy đại số giải tích bằng bộ giải tất định SymPy CAS. **TUYỆT ĐỐI KHÔNG CÓ SỰ THAM GIA CỦA LLM** trong vòng lặp tính toán.
- **`numeric`:** Xác minh bằng xấp xỉ số học, lấy mẫu nghiệm và số học khoảng (Interval Arithmetic). **TUYỆT ĐỐI KHÔNG CÓ LLM**. Phương pháp này kiểm chứng tính hợp lý của nghiệm nhưng **KHÔNG NGỤ Ý ĐÃ CHỨNG MINH HÌNH THỨC TOÁN HỌC**.
- **`consensus`:** Sự đồng thuận giữa nhiều phương pháp kiểm chứng tất định độc lập (vd: kết hợp tính toán giải tích SymPy với quét mẫu số học nhiều điểm biên). **TUYỆT ĐỐI KHÔNG DÙNG LLM ĐỂ BỎ PHIẾU ĐỒNG THUẬN**. Nếu có LLM tham gia thì kết quả KHÔNG được mang nhãn verified.

### 3.3. Bảng ánh xạ trạng thái & phương pháp sang Huy hiệu giao diện
Giao diện người dùng căn cứ vào trường `status` và `confidence.method` trong phong bì phản hồi để hiển thị huy hiệu chẩn đoán tương ứng:

| Trạng thái (`status`) | Phương pháp kiểm chứng (`confidence.method`) | Tên huy hiệu giao diện (UI Badge Label) | Màu sắc | Ý nghĩa sư phạm & Hành vi giao diện |
| :--- | :--- | :--- | :---: | :--- |
| **`verified`** | `symbolic` | **"Đã giải chính xác bằng đại số"** | Xanh lá (Green) | Kết quả được giải tích toán học tất định qua SymPy, thỏa mãn mọi điều kiện biên và tập xác định. Được tính điểm bình thường. |
| **`verified`** | `numeric` | **"Đã kiểm tra bằng tính số"** | Xanh lục nhạt (Teal) | Kết quả vượt qua kiểm tra mẫu số học tất định. Câu chữ thận trọng, không ngụ ý là chứng minh hình thức. Được tính điểm bình thường. |
| **`verified`** | `consensus` | **"Đồng thuận đa phương pháp kiểm tra"** | Xanh dương (Blue) | Kết quả đạt được nhờ sự thống nhất giữa bộ giải giải tích và bộ quét số học độc lập. Được tính điểm bình thường. |
| **`needs_review`** | Bất kỳ | **"Cần thầy cô kiểm tra lại"** | Vàng cam (Amber) | Phát hiện mâu thuẫn CAS (`conflict == true`), hoặc câu phụ thuộc trực quan nhẹ (SOFT), hoặc bước giải mơ hồ. **TUYỆT ĐỐI KHÔNG TRỪ ĐIỂM HỌC SINH**; bảo lưu kết quả để giáo viên thẩm định tay. |
| **`unsupported`** | Bất kỳ | **"Dạng bài chưa hỗ trợ tự động"** | Xám (Gray) | Dạng bài nằm ngoài phạm vi giải tự động (phụ thuộc hình vẽ cứng, hình học cổ điển, kéo thả v1...). Hệ thống giữ nguyên điểm, hướng dẫn học sinh xem bài giải chi tiết. |
| **`error`** | Bất kỳ | **"Có lỗi xử lý hệ thống"** | Đỏ (Red) | Lỗi cú pháp đầu vào, timeout quá thời gian xử lý, hoặc ngoại lệ runtime. Hiển thị thông điệp từ trường `error.message_vi`. |

---

## 4. Cấu Trúc Phong Bì Phản Hồi Chuẩn (Base Response Envelope)

Tất cả phản hồi từ các endpoint `/v1/*` đều tuân thủ cấu trúc JSON sau:

```json
{
  "schema_version": "1.0.0",
  "trace_id": "c4b93198-8e31-4890-9512-1f481c0cb123",
  "status": "verified",
  "confidence": {
    "level": "high",
    "method": "symbolic",
    "score": 0.98
  },
  "unsupported_reason": null,
  "restate_vi": "Tìm các điểm cực trị của hàm số bậc ba \\(y = x^3 - 3x\\)",
  "result": { ... },
  "steps": [
    {
      "id": "step_1",
      "latex": "\\(y' = 3x^2 - 3\\)",
      "note_vi": "Tính đạo hàm bậc nhất của hàm đa thức"
    },
    {
      "id": "step_2",
      "latex": "\\(y' = 0 \\iff x = \\pm 1\\)",
      "note_vi": "Tìm các nghiệm làm cho đạo hàm triệt tiêu"
    }
  ],
  "warnings": [],
  "error": null
}
```

### 4.1. Quy tắc bất biến bắt buộc (Envelope Model Validators)
Lớp `BaseResponseEnvelope` được bảo vệ bằng Pydantic `model_validator(mode="after")` nhằm ngăn chặn tuyệt đối tình trạng dữ liệu mâu thuẫn:
1. **Khi `status == "verified"`:**
   - Trường `result` BẮT BUỘC khác `null`.
   - Trường `confidence` BẮT BUỘC hiện diện đầy đủ.
2. **Khi `status == "error"`:**
   - Trường `error` BẮT BUỘC khác `null` và chứa `code`, `message_vi`.
   - Trường `result` BẮT BUỘC phải là `null` (không rò rỉ dữ liệu khi lỗi).
3. **Khi `status == "unsupported"`:**
   - Trường `unsupported_reason` BẮT BUỘC hiện diện với mã chuẩn thuộc `UnsupportedReasonEnum`.

---

## 5. Danh Mục Lý Do Ngoài Phạm Vi (`unsupported_reason`)

Khi hệ thống trả về `status: "unsupported"`, trường `unsupported_reason` mang một trong các giá trị định danh chuẩn:

| Mã định danh lý do | Phân loại | Ý nghĩa học thuật & Hành vi hệ thống |
| :--- | :---: | :--- |
| `figure_dependent_hard` | Hình học / Đồ thị | Đề bài bắt buộc học sinh phải quan sát đồ thị, bảng biến thiên vẽ tay hoặc hình chụp không có tọa độ số hóa. Không thể tái lập bằng văn bản. |
| `complex_numbers` | Đại số | Số phức (dạng bài không thuộc trọng tâm chương trình THPT GDPT 2018 mới / đề thi TSA ĐHQG). |
| `solid_geometry` | Hình học | Hình học không gian thuần túy cổ điển (tính góc, khoảng cách không gắn hệ tọa độ Oxyz). |
| `algorithm_or_code` | Tin học & Thuật toán | Dạng bài lập luận mã giả, thuật toán lặp, hoặc bài toán cấu trúc dữ liệu. |
| `number_theory_modular` | Số học | Phương trình nghiệm nguyên bậc cao, đồng dư thức chuyên sâu ngoài phạm vi toán phổ thông. |
| `statistics` | Thống kê | Thống kê mô tả số liệu lớn, bảng khảo sát thực nghiệm ngoài phạm vi mô hình hóa tất định. |
| `interactive_ui_type` | Tương tác UI | Dạng bài kéo thả (`drag_drop`) hoặc điền bước giải (`step_solution`) yêu cầu xử lý đồ họa tương tác. |
| `out_of_scope` | Mở rộng | Các dạng bài đọc hiểu ngữ văn dài hoặc ngoài danh mục 8 dạng ưu tiên trong `SPEC.md`. |

> [!NOTE]
> **Quy định về câu hỏi có hình vẽ phụ trợ (SOFT Visual Dependency):**
> Các câu hỏi có hình minh họa nhưng dữ kiện văn bản và công thức giải tích đã cung cấp đầy đủ (SOFT) **KHÔNG ĐƯA VÀO unsupported_reason**. Hệ thống tiến hành giải bình thường và trả về `status: "needs_review"` kèm cảnh báo chuyên biệt `warnings: ["WARN_SOFT_VISUAL_DEPENDENCY: Đề bài có hình minh họa phụ trợ, cần đối chiếu với đồ thị gốc"]`.

---

## 6. Giới Hạn Tải Trọng & Phân Định Trách Nhiệm Thực Thi

### 6.1. Phân định trách nhiệm thực thi (Enforcement Responsibility)
- **Tầng Cổng Gateway (Cloudflare Pages Functions / Nginx):** Chịu trách nhiệm thực thi vòng ngoài tại biên mạng (Edge Network) trong môi trường Production. Gateway kiểm tra header `Content-Length` và ngắt kết nối ngay nếu payload vượt quá `1 MB` trước khi forward về backend FastAPI.
- **Tầng Ứng Dụng (FastAPI Middleware `limit_request_body_size`):** Đã được cài đặt trực tiếp trong `app/main.py` để đóng vai trò phòng thủ chiều sâu (Defense-in-Depth) trong môi trường phát triển cục bộ và bảo vệ trực tiếp microservice nếu request vượt qua gateway. Bất kỳ request nào có `Content-Length > 1,048,576 bytes` đều bị từ chối ngay với mã lỗi `HTTP 413 Payload Too Large`.

### 6.2. Bảng giới hạn trường chi tiết (Pydantic Field Constraints)

| Endpoint / Model | Trường dữ liệu | Ràng buộc kỹ thuật | Ghi chú an toàn |
| :--- | :--- | :---: | :--- |
| **SolveRequest** | `question_text` | `3` $\le$ len $\le$ `2000` | Ngăn đề bài rỗng hoặc quá dài làm nghẽn LLM Parser |
| **SolveRequest** | `question_id` | max len `100` | Mã định danh câu hỏi từ ngân hàng |
| **SolveRequest** | `step_index` | `1` $\le$ val $\le$ `4` | 4 bậc Scaffolding chuẩn sư phạm |
| **SolveRequest** | `previous_steps` | max `20` phần tử | Giới hạn số lượt tương tác trong một phiên |
| **SolveRequest** | `previous_steps[i]` | max len `500` | Ngăn học sinh chèn văn bản quá dài vào từng bước |
| **CheckRequest** | `canonical_answer` | `1` $\le$ len $\le$ `500` | Chuỗi đáp án chuẩn |
| **CheckRequest** | `student_answer` | `1` $\le$ len $\le$ `500` | Chuỗi đáp án học sinh nhập |
| **CheckRequest** | `answer_type` | Enum (9 kiểu) | Kiểm tra nghiêm ngặt `AnswerTypeEnum` |
| **CheckRequest** | `step_index` | `1` $\le$ val $\le$ `20` | Giới hạn số bước giải trong bài tự luận |
| **GenerateRequest**| `category` | `2` $\le$ len $\le$ `100` | Tên danh mục dạng bài toán học |
| **GenerateRequest**| `difficulty` | Enum (`M1`..`M4`) | 4 bậc độ khó chuẩn hóa |
| **GenerateRequest**| `count` | `1` $\le$ val $\le$ `20` | Khống chế số lượng câu sinh trong một lượt |
| **GenerateRequest**| `seed` | `0` $\le$ val $\le$ `2^31 - 1` | Hạt giống giả ngẫu nhiên cố định |

---

## 7. Chi Tiết Từng Endpoint Nghiệp Vụ

### 7.1. `GET /health` — Kiểm tra trạng thái hệ thống
- **Xác thực:** Công khai (Không yêu cầu header `X-Pumkin-API-Key`).
- **Phản hồi 200 OK:**
  ```json
  {
    "status": "healthy",
    "service_version": "0.1.0",
    "sympy_version": "1.14.0",
    "python_version": "3.13.2"
  }
  ```

---

### 7.2. `POST /v1/solve` — Gia sư AI Socratic 4 bậc
- **Xác thực:** Bắt buộc header `X-Pumkin-API-Key`.
- **Mục tiêu:** Dẫn dắt tư duy học sinh theo 4 bậc Scaffolding (1: Nudge, 2: Concept, 3: Sub-goal, 4: Worked Step). Tuyệt đối không làm lộ đáp số cuối cùng ở các bậc đầu.

#### Request Schema (`SolveRequest`):
```json
{
  "question_text": "Tìm các khoảng đồng biến của hàm số \\(y = x^3 - 3x\\)",
  "question_id": "q_tsa_01",
  "step_index": 1,
  "previous_steps": [
    "Học sinh đã xác định tập xác định D = R"
  ]
}
```

#### Response Schema Payload (`SolveResultPayload` trong `result`):
```json
{
  "schema_version": "1.0.0",
  "trace_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "verified",
  "confidence": {
    "level": "high",
    "method": "symbolic",
    "score": 0.95
  },
  "unsupported_reason": null,
  "restate_vi": "Xét tính đơn điệu của hàm số \\(y = x^3 - 3x\\)",
  "result": {
    "scaffolding_step": 1,
    "guidance_vi": "Để tìm khoảng đồng biến của một hàm số đa thức khả vi, em hãy nhớ lại mối liên hệ giữa dấu của đạo hàm bậc nhất \\(y'\\) và chiều biến thiên của đồ thị nhé. Bước đầu tiên chúng ta cần làm là gì nào?",
    "latex_hint": "\\(y' \\ge 0\\)",
    "subgoal_completed": false,
    "is_final_step": false
  },
  "steps": [],
  "warnings": [],
  "error": null
}
```

---

### 7.3. `POST /v1/check` — Chấm bài thi & Đánh giá bước giải
- **Xác thực:** Bắt buộc header `X-Pumkin-API-Key`.
- **Mục tiêu:** Kiểm chứng tính đúng đắn của đáp án hoặc bước giải trung gian; đối chiếu tương đương đại số; phát hiện bẫy nhận thức.

#### Kiểu đáp án (`answer_type`):
Bao gồm 9 kiểu:
- `number`: Số thực, phân số, số vô tỉ dạng số.
- `expression`: Biểu thức đại số chứa biến.
- `interval`: Khoảng, đoạn, nửa khoảng (vd: `[1; 5)`).
- `set`: Tập hợp rời rạc các phần tử (vd: `{1, 2, 3}`).
- `matrix`: Ma trận số học 2 chiều.
- `boolean_group`: Nhóm câu hỏi Đúng/Sai (True/False).
- `multiple_choice`: Câu hỏi trắc nghiệm 4 phương án đơn.
- `drag_drop` *(5 câu trong ngân hàng)*: Dạng bài kéo thả ô dữ liệu. Quyết định phạm vi v1: trả về `status: "unsupported"` kèm `unsupported_reason: "interactive_ui_type"`. Sẽ xem xét lại ở v2 khi có module kéo thả tương tác. **Hệ thống không trừ điểm học sinh**.
- `step_solution` *(2 câu trong ngân hàng)*: Dạng bài điền từng bước giải theo sơ đồ logic. Quyết định phạm vi v1: trả về `status: "unsupported"` kèm `unsupported_reason: "interactive_ui_type"`. Sẽ xem xét lại ở v2 khi có bộ so khớp cây AST bước giải. **Hệ thống không trừ điểm học sinh**.

#### Request Schema (`CheckRequest`):
```json
{
  "question_id": "q_check_ex_01",
  "question_text": "Tìm giá trị cực tiểu của hàm số \\(y = x^3 - 3x\\)",
  "canonical_answer": "-2",
  "student_answer": "-2",
  "answer_type": "number",
  "step_index": null
}
```

#### Response Schema Payload (`CheckResultPayload` trong `result`):
```json
{
  "schema_version": "1.0.0",
  "trace_id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  "status": "verified",
  "confidence": {
    "level": "high",
    "method": "symbolic",
    "score": 1.0
  },
  "unsupported_reason": null,
  "restate_vi": "Kiểm tra đáp án câu hỏi cực tiểu hàm số",
  "result": {
    "verdict": "correct",
    "is_correct": true,
    "canonical_answer": "-2",
    "cas_answer": "-2",
    "conflict": false,
    "feedback_vi": "Chính xác! Điểm cực tiểu là \\(x = 1\\) và giá trị cực tiểu tương ứng là \\(y(1) = -2\\).",
    "detected_misconception_id": null,
    "canonical_latex": "\\(-2\\)",
    "student_latex": "\\(-2\\)"
  },
  "steps": [],
  "warnings": [],
  "error": null
}
```

#### Cơ chế phát hiện mâu thuẫn CAS & Ràng buộc Validator:
Khi SymPy CAS giải ra đáp án khác với `canonical_answer` lưu trong ngân hàng đề:
- Cờ `conflict` được đặt thành `true`.
- Trường `cas_answer` chứa kết quả tính toán độc lập của máy đại số.
- **Ràng buộc Pydantic Validator:** Khi `conflict == true`, trường `verdict` BẮT BUỘC phải là `cannot_determine` và `status` phong bì BẮT BUỘC là `needs_review` (nếu không sẽ bị validator từ chối ngay lập tức).
- **QUY TẮC BẤT DI BẤT DỊCH:** Tuyệt đối **KHÔNG ĐƯỢC TRỪ ĐIỂM HỌC SINH** khi xảy ra `conflict`, bảo lưu kết quả để giáo viên thẩm định thủ công.

---

### 7.4. `POST /v1/generate` — Tạo đề & Sinh biến thể câu hỏi
- **Xác thực:** Bắt buộc header `X-Pumkin-API-Key`.
- **Mục tiêu:** Sinh câu hỏi mới tương đương về mặt cấu trúc toán học với nghiệm đẹp, kiểm soát 3 phương án nhiễu theo bẫy nhận thức chuẩn `GEMINI.md`.

#### Request Schema (`GenerateRequest`):
```json
{
  "category": "ham_so_cuc_tri_cho_truoc",
  "difficulty": "M2",
  "count": 1,
  "seed": 42
}
```

#### Response Schema Payload (`GenerateResultPayload` trong `result`):
```json
{
  "schema_version": "1.0.0",
  "trace_id": "8f3b2169-c081-4e4b-9e23-7fa52349a202",
  "status": "verified",
  "confidence": {
    "level": "high",
    "method": "symbolic",
    "score": 1.0
  },
  "unsupported_reason": null,
  "restate_vi": "Sinh đề bài mới dạng Cực trị hàm số cho trước",
  "result": {
    "count": 1,
    "questions": [
      {
        "id": "gen_cuc_tri_m2_42_01",
        "category": "ham_so_cuc_tri_cho_truoc",
        "difficulty": "M2",
        "question_text": "Tìm giá trị cực đại của hàm số \\(y = x^3 - 3x + 2\\).",
        "options": [
          "\\(4\\)",
          "\\(0\\)",
          "\\(-1\\)",
          "\\(1\\)"
        ],
        "correct_answer": "\\(4\\)",
        "correct_index": 0,
        "distractors": [
          {
            "option_index": 1,
            "latex": "\\(0\\)",
            "misconception_id": "TRAP_EXTREMA_DELTA_CONFUSION",
            "explanation_vi": "Học sinh tính nhầm giá trị cực tiểu thay vì giá trị cực đại."
          },
          {
            "option_index": 2,
            "latex": "\\(-1\\)",
            "misconception_id": "TRAP_BOUNDARY_NOT_CHECKED",
            "explanation_vi": "Học sinh nhầm hoành độ điểm cực đại x = -1 với giá trị cực đại y."
          },
          {
            "option_index": 3,
            "latex": "\\(1\\)",
            "misconception_id": "TRAP_SIGN_ERROR",
            "explanation_vi": "Học sinh nhầm điểm cực tiểu x = 1 với giá trị cực đại."
          }
        ],
        "explanation_vi": "Ta có \\(y' = 3x^2 - 3 = 0 \\iff x = \\pm 1\\). Tại \\(x = -1\\), \\(y''(-1) = -6 < 0\\) nên hàm số đạt cực đại tại \\(x = -1\\), giá trị cực đại tương ứng là \\(y(-1) = (-1)^3 - 3(-1) + 2 = 4\\)."
      }
    ]
  },
  "steps": [],
  "warnings": [],
  "error": null
}
```

---

## 8. Ngữ Pháp Biểu Diễn Toán Học Trung Gian (MathProblemDSL)

Để ngăn chặn hoàn toàn việc thực thi mã động (`eval`/`exec`), LLM Semantic Parser chuyển đổi văn bản câu hỏi sang một trong các cấu trúc DSL có kiểu định danh (`type` discriminator).

> [!IMPORTANT]
> **Quy định hợp đồng công khai v1 đối với DSL:**
> Trường `dsl` **KHÔNG XUẤT HIỆN** trong Request công khai của `SolveRequest` và `CheckRequest` tại `docs/openapi.json`. Client chỉ gửi văn bản đề bài (`question_text`) hoặc `question_id`.
> Cấu trúc `MathProblemDSL` hoàn toàn là **mô hình dữ liệu nội bộ (internal pipeline)** giữa Semantic Parser và Deterministic Solver trong kiến trúc microservice, giúp bảo mật và trừu tượng hóa toàn bộ biểu diễn toán học trung gian.

### 8.1. Bảng đối chiếu 18 Lớp DSL với 553 câu hỏi ngân hàng thực tế

| Lớp DSL | Nhóm trong SPEC | Số câu | % | Có solver ở v1 (Có/Không, Dự kiến) |
| :--- | :--- | :---: | :---: | :--- |
| `MonotonicityDSL` | Nhóm 1 (`ham_so_tinh_don_dieu`) | 116 | 20.98% | **Có** (Cam kết đợt 1) |
| `BasicDerivativeDSL` | Nhóm 2 (`ham_so_dao_ham_co_ban`) | 91 | 16.46% | **Có** (Cam kết đợt 1) |
| `ExtremaDSL` | Nhóm 3 (`ham_so_cuc_tri_cho_truoc`) | 8 | 1.45% | **Có** (Cam kết đợt 1) |
| `MinMaxIntervalDSL` | Nhóm 4 (`ham_so_gtln_gtnn_doan_khoang`) | 8 | 1.45% | **Có** (Cam kết đợt 1) |
| `ParameterMDSL` | Nhóm 5 (`ham_so_chua_tham_so_m`) | 2 | 0.36% | **Có** (Cam kết đợt 1) |
| `RealWorldOptimizationDSL` | Nhóm 6 (`ham_so_toan_thuc_te_toi_uu`) | 11 | 1.99% | **Có** (Cam kết đợt 1) |
| `VariationTableDSL` | Nhóm 7 (`ham_so_doc_bang_bien_thien`) | 2 | 0.36% | **Không** (Dự kiến v1.1 - chỉ giải câu có công thức kèm theo) |
| `AsymptoteDSL` | Nhóm 8 (`ham_so_tiem_can`) | 19 | 3.44% | **Có** (Cam kết đợt 1) |
| `OtherFunctionDSL` | Nhóm 9 (`ham_so_dang_khac`) | 12 | 2.17% | **Không** (Dự kiến v2.0 - tương giao, tiếp tuyến) |
| `IntegralDSL` | Nhóm 10 (`nguyen_ham_tich_phan`) | 54 | 9.76% | **Có** (Cam kết đợt 1) |
| `ExponentialLogDSL` | Nhóm 11 (`mu_logarit_pt_bpt`) | 39 | 7.05% | **Có** (Cam kết đợt 1) |
| `LimitSequenceDSL` | Nhóm 12 (`gioi_han_day_so`) | 13 | 2.35% | **Có** (Cam kết đợt 1) |
| `LinearAlgebraDSL` | Nhóm 13 (`dai_so_tuyen_tinh_ma_tran`) | 12 | 2.17% | **Không** (Dự kiến v1.2 - ma trận, định thức, Cramer) |
| `DifferentialEquationDSL` | Nhóm 14 (`phuong_trinh_vi_phan`) | 10 | 1.81% | **Không** (Dự kiến v2.0 - vi phân cấp 1, dao động) |
| `AlgebraicEquationDSL` | Nhóm 15 (`phuong_trinh_bat_phuong_trinh_dai_so`) | 4 | 0.72% | **Không** (Dự kiến v1.2 - phương trình vô tỉ) |
| `GeometryOxyzDSL` | Nhóm 16 (`hinh_hoc_oxyz`) | 62 | 11.21% | **Có** (Cam kết đợt 1) |
| `CombinatoricsProbabilityDSL` | Nhóm 17 (`to_hop_xac_suat`) | 52 | 9.40% | **Có** (Cam kết đợt 1) |
| `UnsupportedProblemDSL` | Nhóm 18..22 (`unsupported_*`) | 38 | 6.87% | **Không** (Ngoài phạm vi - unsupported) |
| **TỔNG CỘNG** | **TOÀN BỘ 22 NHÓM** | **553** | **100.00%** | **Khớp chính xác 553 câu (10 Có, 8 Không)** |

### 8.2. Phân định rõ ràng giữa "Có trong Schema" và "Cam kết giải ở v1"
- **"Có trong Schema" (18 Lớp):** Toàn bộ 18 lớp DSL được định nghĩa đầy đủ trong `app/schemas/dsl.py` để đảm bảo hệ thống có khả năng nhận diện, xác thực cú pháp và lưu vết dữ liệu toàn diện mà không bao giờ bị sập (crash) hay trả mã lỗi `422 Unprocessable Entity` khi gặp bất kỳ câu hỏi nào trong ngân hàng đề 553 câu.
- **"Cam kết giải ở v1" (10 Dạng bài ưu tiên):** Đợt 1 tập trung nguồn lực xây dựng Bộ giải tất định SymPy (`Deterministic Solver`) cho 10 nhóm trọng tâm phổ thông và thi đánh giá tư duy có tần suất xuất hiện cao nhất (chiếm 468 / 553 câu = 84.63%). Các nhóm còn lại (`VariationTableDSL`, `OtherFunctionDSL`, `LinearAlgebraDSL`, `DifferentialEquationDSL`, `AlgebraicEquationDSL`, và `UnsupportedProblemDSL`) tạm thời trả `status: "unsupported"` hoặc `status: "needs_review"` theo đúng hợp đồng.

### 8.3. Giải trình chi tiết chênh lệch số liệu Đại số tuyến tính / Ma trận (19 câu $\rightarrow$ 12 câu)
Ở Prompt 1 sơ bộ, bộ quét từ khóa thô gom toàn bộ câu có từ khóa `ma trận` vào nhóm ĐSTT (19 câu). Trong quá trình phân tích chuyên sâu tại Prompt 1b và thiết lập quy tắc thác đổ ưu tiên (`Strict Priority Cascade`), đúng 7 câu đã được phân bổ lại chính xác về đúng bản chất học thuật:
1. **6 câu chuyển sang `to_hop_xac_suat` (Tổ hợp & Xác suất):**
   - `q_tsa_03`: Thị phần taxi cạnh tranh qua mô hình ma trận xác suất chuyển trạng thái.
   - `q_tsa_13`: Dự báo chuỗi thời tiết 3 trạng thái bằng ma trận xác suất chuyển Markov.
   - `q_tsa_tf_02`: Chuỗi Markov 2 trạng thái thời tiết tại khu nghỉ dưỡng.
   - `q_ultra_tf_01`: Hệ thống máy chủ xử lý dữ liệu hoạt động theo chu kỳ xác suất Markov.
   - `q_superhard_type1_01`: Cực trị tham số ma trận chuyển xác suất $P(t)$ của xích Markov 2 trạng thái.
   - `q_superhard_type5_05`: Bước đi ngẫu nhiên trên đồ thị chu trình 3 đỉnh có ma trận chuyển xác suất.
   *(Bản chất các bài này là bài toán Mô hình ngẫu nhiên & Xác suất TSA, không phải đại số ma trận số học thuần túy).*
2. **1 câu chuyển sang `unsupported_thong_ke` (Thống kê mô tả):**
   - `q_superhard_type1_04`: Tối ưu hóa danh mục đầu tư 2 tài sản rủi ro dựa trên ma trận hiệp phương sai sai số $\Sigma$. Bài toán thuộc phân môn Thống kê mô tả / Lý thuyết tài chính thực nghiệm ngoài phạm vi v1.
3. **12 câu còn lại giữ nguyên tại `LinearAlgebraDSL`:**
   - Gồm các câu thuần túy về đại số ma trận: định thức $\det(A)$, vết $\text{tr}(A)$, hạng ma trận, ma trận nghịch đảo, hệ phương trình mạng dòng điện Kirchhoff / quy tắc Cramer (`q_tsa_28`, `q_calc_04`, `q_calc_07`, `q_tsa_34`, `q_calc_12`, `q_tsa_54`, `q_calc_18`, `q_calc_20`, `q_tsa_tf_07`, `q_superhard_type1_02`, `q_superhard_type1_03`, `q_superhard_type1_05`).

### 8.4. Thống kê phụ thuộc trực quan (Hình vẽ & Bảng biến thiên)
- **HARD-UNSUPPORTED (0 câu):** Không có câu nào phụ thuộc hoàn toàn vào ảnh nhị phân bên ngoài mà không có công thức đại số/giải tích. Ngân hàng 553 câu lưu trữ toàn bộ dữ liệu dưới dạng văn bản và KaTeX.
- **SOFT-REVIEW (71 câu):** Đề bài có nhắc đến hình vẽ, đồ thị hoặc bảng biến thiên nhưng toàn bộ giả thiết, tham số, công thức hàm số hoặc toạ độ đã được mô tả tường minh bằng văn bản/LaTeX. Hệ thống xử lý bình thường và trả kèm cảnh báo có cấu trúc `WarningCode.WARN_SOFT_VISUAL_DEPENDENCY`.
- **Lệnh kiểm chứng tính tái lập:**
  ```powershell
  python -c "import json, re; q = json.load(open('pumkin3/data/questions/all.json', encoding='utf-8')); kw = ['hình vẽ', 'hình bên', 'đồ thị bên', 'đồ thị như hình', 'bảng biến thiên', 'bảng sau', 'như hình', 'cho hàm số có đồ thị', 'hình dưới', 'biểu đồ', 'sơ đồ', 'cho hình', '(h)', 'tam giác', 'hình chóp', 'hình nón', 'hình trụ', 'khối đa diện', 'lăng trụ', 'hình phẳng', 'đồ thị']; m = [x for x in q if any(k in ((x.get('question') or x.get('question_text') or '') + ' ' + (x.get('cloze_text') or '')).lower() for k in kw)]; print(f'Matched: {len(m)} (HARD: 0, SOFT: {len(m)})')"
  ```
