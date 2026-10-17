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

### 3.2. Bảng ánh xạ trạng thái & phương pháp sang Huy hiệu giao diện (Status to UI Badge)
Giao diện người dùng căn cứ vào kết hợp giữa trường `status` và `confidence.method` trong phong bì phản hồi để hiển thị huy hiệu chẩn đoán tương ứng:

| Trạng thái (`status`) | Phương pháp kiểm chứng (`confidence.method`) | Tên huy hiệu giao diện (UI Badge Label) | Màu sắc | Ý nghĩa sư phạm & Hành vi giao diện |
| :--- | :--- | :--- | :---: | :--- |
| **`verified`** | `symbolic` hoặc `numeric` | **"Đã kiểm chứng bằng máy đại số"** | Xanh lá (Green) | Kết quả đã được SymPy CAS giải tích hoặc tính toán số học tất định, vượt qua thẩm định điều kiện biên. Được tính điểm bình thường. |
| **`verified`** | `consensus` | **"Đã kiểm chứng bằng đồng thuận đa phương pháp"** | Xanh dương (Blue) | Kết quả đạt được nhờ sự thống nhất giữa nhiều phương pháp kiểm chứng chéo (Multi-Agent Consensus / CAS + Numeric Dual-Verification). Được tính điểm bình thường. |
| **`needs_review`** | Bất kỳ | **"Cần kiểm tra lại"** | Vàng cam (Amber) | Phát hiện mâu thuẫn giữa CAS và đáp án gốc (`conflict == true`), hoặc bước giải mơ hồ. **TUYỆT ĐỐI KHÔNG TRỪ ĐIỂM HỌC SINH**; bảo lưu kết quả để giáo viên thẩm định tay. |
| **`unsupported`** | Bất kỳ | **"Chưa kiểm chứng"** | Xám (Gray) | Dạng bài nằm ngoài phạm vi giải tự động (phụ thuộc hình vẽ, hình học cổ điển, drag-drop...). Hệ thống giữ nguyên điểm, hướng dẫn học sinh xem bài giải chi tiết. |
| **`error`** | Bất kỳ | **Thông báo lỗi chi tiết** | Đỏ (Red) | Lỗi cú pháp DSL, timeout quá thời gian xử lý, hoặc ngoại lệ runtime. Hiển thị thông điệp từ trường `error.message_vi`. |

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
| `figure_dependent_soft` | Hình học / Đồ thị | Đề bài có hình minh họa phụ trợ nhưng có thể giải được nếu phiên âm đầy đủ tọa độ hoặc dạng hàm số. |
| `complex_numbers` | Đại số | Số phức (dạng bài không thuộc trọng tâm chương trình THPT GDPT 2018 mới / đề thi TSA ĐHQG). |
| `solid_geometry` | Hình học | Hình học không gian thuần túy cổ điển (tính góc, khoảng cách không gắn hệ tọa độ Oxyz). |
| `algorithm_or_code` | Tin học & Thuật toán | Dạng bài lập luận mã giả, thuật toán lặp, hoặc bài toán cấu trúc dữ liệu. |
| `number_theory_modular` | Số học | Phương trình nghiệm nguyên bậc cao, đồng dư thức chuyên sâu ngoài phạm vi toán phổ thông. |
| `statistics` | Thống kê | Thống kê mô tả số liệu lớn, bảng khảo sát thực nghiệm ngoài phạm vi mô hình hóa tất định. |
| `interactive_ui_type` | Tương tác UI | Dạng bài kéo thả (`drag_drop`) hoặc điền bước giải (`step_solution`) yêu cầu xử lý đồ họa tương tác. |
| `out_of_scope` | Mở rộng | Các dạng bài đọc hiểu ngữ văn dài hoặc ngoài danh mục 8 dạng ưu tiên trong `SPEC.md`. |

---

## 6. Giới Hạn Tải Trọng & Độ Dài Dữ Liệu Đầu Vào

Hệ thống áp dụng giới hạn kích thước nhiều tầng để chống tấn công từ chối dịch vụ (DoS) và tràn bộ đệm:
- **Giới hạn HTTP Body tối đa tại Gateway (Cloudflare Pages Functions / Nginx):** `1 MB` (1,048,576 bytes).
- **Bảng giới hạn trường chi tiết (Pydantic Field Constraints):**

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
  "dsl": null,
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
- `drag_drop` *(5 câu trong ngân hàng)*: Dạng bài kéo thả ô dữ liệu. Hiện tại trả về `status: "unsupported"` kèm `unsupported_reason: "interactive_ui_type"`. **Hệ thống không trừ điểm học sinh**.
- `step_solution` *(2 câu trong ngân hàng)*: Dạng bài điền từng bước giải theo sơ đồ logic. Hiện tại trả về `status: "unsupported"` kèm `unsupported_reason: "interactive_ui_type"`. **Hệ thống không trừ điểm học sinh**.

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

#### Cơ chế phát hiện mâu thuẫn CAS & Nguyên tắc không trừ điểm:
Khi SymPy CAS giải ra đáp án khác với `canonical_answer` lưu trong ngân hàng đề:
- Cờ `conflict` được đặt thành `true`.
- Trường `cas_answer` chứa kết quả tính toán độc lập của máy đại số.
- Trường `verdict` BẮT BUỘC gán giá trị `cannot_determine`.
- Trường `status` trên phong bì BẮT BUỘC là `needs_review`.
- **QUY TẮC BẤT DI BẤT DỊCH:** Tuyệt đối **KHÔNG ĐƯỢC TRỪ ĐIỂM HỌC SINH** khi xảy ra `conflict`, bảo lưu kết quả để giáo viên thẩm định thủ công.

#### Danh mục giá trị `verdict`:
1. `correct`: Đáp án trùng khớp hoàn toàn.
2. `correct_different_form`: Đúng về mặt toán học nhưng biểu diễn ở dạng khác (vd: `\(\frac{1}{\sqrt{2}}\)` và `\(\frac{\sqrt{2}}{2}\)`).
3. `incorrect`: Sai toán học hoặc rơi vào bẫy nhận thức (trả về mã bẫy tại `detected_misconception_id`).
4. `cannot_determine`: Hệ thống chưa đủ cơ sở chứng minh hoặc gặp mâu thuẫn CAS $\rightarrow$ **Không trừ điểm học sinh**.

---

### 7.4. `POST /v1/generate` — Tạo đề & Sinh biến thể câu hỏi
- **Xác thực:** Bắt buộc header `X-Pumkin-API-Key`.
- **Mục tiêu:** Sinh câu hỏi mới tương đương về mặt cấu trúc toán học với nghiệm đẹp, kiểm soát 3 phương án nhiễu theo bẫy nhận thức chuẩn GEMINI.md.

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

#### Danh mục Bẫy Nhận Thức Chuẩn (`MisconceptionTrapEnum`):
Mọi phương án nhiễu sinh ra bắt buộc phải mang mã bẫy thuộc danh mục sau:
- **Đại số & Giải tích:** `TRAP_LOG_DOMAIN_IGNORED`, `TRAP_RADICAL_DOMAIN_IGNORED`, `TRAP_EXTREMA_DELTA_CONFUSION`, `TRAP_SIGN_ERROR`, `TRAP_INVERSE_OPERATION`, `TRAP_BOUNDARY_NOT_CHECKED`.
- **Vector & Hình học phẳng:** `TRAP_ANGLE_LINE_VS_VECTOR`, `TRAP_COLLINEAR_ZERO_DIVISION`, `TRAP_CROSS_PRODUCT_IS_SCALAR`.
- **Không gian Oxyz:** `TRAP_SPHERE_RADIUS_INVALID`, `TRAP_LINE_CANONICAL_ZERO_DENOM`, `TRAP_PLANE_DISTANCE_NO_ABS`.
- **Tổ hợp & Xác suất:** `TRAP_PERM_COMB_CONFUSION`, `TRAP_PROB_SUM_NOT_DISJOINT`.
- **Hoán vị bàn tròn:** `TRAP_ROUND_TABLE_NUMBERED_SEATS`, `TRAP_ROUND_TABLE_BLOCK_FACTORIAL`, `TRAP_ROUND_TABLE_ALTERNATING_OVERCOUNT`, `TRAP_ROUND_TABLE_FLIP_SYMMETRY`.
- **Dự phòng chung:** `TRAP_OTHER`.

---

## 8. Ngữ Pháp Biểu Diễn Toán Học Trung Gian (MathProblemDSL)

Để ngăn chặn hoàn toàn việc thực thi mã động (`eval`/`exec`), LLM Semantic Parser chuyển đổi văn bản câu hỏi sang một trong các cấu trúc DSL có kiểu định danh (`type` discriminator).

> [!NOTE]
> **Độc lập và Thử nghiệm (`dsl_version: "0.1.0-alpha"`):**
> Cấu trúc DSL được tách biệt rõ ràng với Hợp đồng giao tiếp ổn định `/v1/*`. Mọi mô hình DSL đều mang trường `dsl_version = "0.1.0-alpha"`. Đây là các định nghĩa khung (placeholders), sẽ được hoàn thiện bộ phân tích AST an toàn ở Prompt 4 và Prompt 5.

### 8.1. Bảng đối chiếu 18 Lớp DSL Toán học

| STT | Lớp DSL (Pydantic Model) | Khóa phân biệt (`type`) | Các trường dữ liệu cốt lõi | Trạng thái phạm vi |
| :---: | :--- | :--- | :--- | :---: |
| 1 | `MonotonicityDSL` | `ham_so_tinh_don_dieu` | `expression`, `interval` | Trọng tâm |
| 2 | `BasicDerivativeDSL` | `ham_so_dao_ham_co_ban` | `expression`, `order` | Trọng tâm |
| 3 | `ExtremaDSL` | `ham_so_cuc_tri_cho_truoc` | `expression` | Trọng tâm |
| 4 | `MinMaxIntervalDSL` | `ham_so_gtln_gtnn_doan_khoang` | `expression`, `interval_start`, `interval_end` | Trọng tâm |
| 5 | `ParameterMDSL` | `ham_so_chua_tham_so_m` | `expression`, `parameter_name`, `condition` | Trọng tâm |
| 6 | `RealWorldOptimizationDSL` | `ham_so_toan_thuc_te_toi_uu` | `target_function`, `constraints[]`, `goal` | Trọng tâm |
| 7 | `VariationTableDSL` | `ham_so_doc_bang_bien_thien` | `derivative_expression`, `intervals_sign[]` | Trọng tâm |
| 8 | `AsymptoteDSL` | `ham_so_tiem_can` | `expression` | Trọng tâm |
| 9 | `OtherFunctionDSL` | `ham_so_dang_khac` | `expression`, `question_subtype` | Trọng tâm |
| 10 | `IntegralDSL` | `nguyen_ham_tich_phan` | `integrand`, `lower_bound`, `upper_bound` | Trọng tâm |
| 11 | `ExponentialLogDSL` | `mu_logarit_pt_bpt` | `equation`, `relation` | Trọng tâm |
| 12 | `LimitSequenceDSL` | `gioi_han_day_so` | `expression`, `approaches` | Trọng tâm |
| 13 | `LinearAlgebraDSL` | `dai_so_tuyen_tinh_ma_tran` | `matrices{}`, `operation` | Hỗ trợ mở rộng |
| 14 | `DifferentialEquationDSL` | `phuong_trinh_vi_phan` | `equation`, `initial_conditions{}` | Hỗ trợ mở rộng |
| 15 | `AlgebraicEquationDSL` | `phuong_trinh_bat_phuong_trinh_dai_so`| `equation` | Hỗ trợ mở rộng |
| 16 | `GeometryOxyzDSL` | `hinh_hoc_oxyz` | `elements{}`, `query_type` | Trọng tâm |
| 17 | `CombinatoricsProbabilityDSL`| `to_hop_xac_suat` | `subdomain`, `parameters{}` | Trọng tâm |
| 18 | `UnsupportedProblemDSL` | `unsupported` | `reason` (thuộc `UnsupportedReasonEnum`) | Ngoài phạm vi |

### 8.2. Khẳng định giới hạn phạm vi (Boundary Confirmation)
- **Tuyệt đối KHÔNG có lớp DSL cho Số phức:** Dạng bài số phức không được tạo lớp DSL, mà được phân loại trực tiếp sang `UnsupportedProblemDSL(reason="complex_numbers")`.
- **Tuyệt đối KHÔNG có lớp DSL cho Hình học không gian cổ điển:** Các bài toán hình chóp, hình lăng trụ không gắn trục Oxyz được phân loại sang `UnsupportedProblemDSL(reason="solid_geometry")`.
- **Các phân môn Đã duyệt ở Prompt 1/1b:** Phương trình vi phân (`phuong_trinh_vi_phan`), Đại số tuyến tính / Ma trận (`dai_so_tuyen_tinh_ma_tran`), Phương trình / Bất phương trình đại số (`phuong_trinh_bat_phuong_trinh_dai_so`) đã được đối chiếu chuẩn xác với ngân hàng câu hỏi.
