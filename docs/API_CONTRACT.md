# PUMKIN MATH API — HỢP ĐỒNG DỮ LIỆU & ĐẶC TẢ GIAO DIỆN (API_CONTRACT.md)

- **Phiên bản hợp đồng:** `v1.0.0`
- **Mã dịch vụ:** `Pumkin Math API` (Microservice tính toán tất định & kiểm định toán học)
- **Nền tảng tích hợp:** Cloudflare Pages Gateway (`functions/api/math/*`) $\rightarrow$ FastAPI Backend.
- **Tác giả:** Senior Backend/AI Engineer kiêm Release Engineer.

---

## 1. Nguyên Tắc Thiết Kế Hợp Đồng (Contract Design Principles)

Hợp đồng dữ liệu này quy định cấu trúc giao tiếp giữa **Cloudflare Pages Gateway** (Client-side proxy) và **FastAPI Microservice**, tuân thủ 3 nguyên tắc bất khả xâm phạm:
1. **Toàn vẹn kiểu dữ liệu (Strict Typing):** Mọi schema đều được kiểm tra chặt chẽ bằng Pydantic v2. Mọi trường lạ (extra fields) đều bị **từ chối ngay lập tức** (`extra="forbid"`).
2. **Phiên bản hóa tường minh (Explicit Versioning):** Mọi endpoint nghiệp vụ đều mang tiền tố `/v1/`. Mọi phản hồi đều chứa trường `schema_version: "1.0.0"` và `trace_id` (UUIDv4) để phục vụ giám sát và truy vết sự cố.
3. **Cấu trúc bao đóng thống nhất (Standardized Response Envelope):** Mọi kết quả trả về từ `/v1/solve`, `/v1/check`, `/v1/generate` đều được bọc trong cấu trúc phong bì `BaseResponseEnvelope`.

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

### 3.2. Bảng ánh xạ trạng thái sang Huy hiệu giao diện (Status to UI Badge)
Giao diện người dùng căn cứ vào trường `status` trong phong bì phản hồi để hiển thị huy hiệu chẩn đoán tương ứng:

| Trạng thái (`status`) | Tên huy hiệu giao diện (UI Badge Label) | Màu sắc hiển thị | Ý nghĩa sư phạm & Hành vi giao diện |
| :--- | :--- | :---: | :--- |
| **`verified`** | **"Đã kiểm chứng bằng máy đại số"** | Xanh lá (Green) | Kết quả đã được bộ giải tất định SymPy tính toán, vượt qua kiểm chứng chéo điều kiện biên và tập xác định. Được tính điểm bình thường. |
| **`needs_review`** | **"Cần kiểm tra lại"** | Vàng cam (Amber) | Phát hiện mâu thuẫn giữa CAS và đáp án lưu trữ, hoặc bước giải chứa yếu tố mơ hồ. **TUYỆT ĐỐI KHÔNG TRỪ ĐIỂM HỌC SINH**; bảo lưu trạng thái để giáo viên thẩm định tay. |
| **`unsupported`** | **"Chưa kiểm chứng"** | Xám (Gray) | Dạng bài nằm ngoài phạm vi giải đại số tất định (hình học không gian cổ điển, phụ thuộc hình vẽ, tư duy mã giả). Hướng dẫn học sinh xem lời giải chi tiết. |
| **`error`** | **Thông báo lỗi chi tiết** | Đỏ (Red) | Lỗi cú pháp DSL, timeout quá thời gian xử lý, hoặc ngoại lệ runtime. Hiển thị thông điệp từ trường `error.message_vi`. |

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

### Các trường trong phong bì:
- `schema_version` *(string, bắt buộc)*: Cố định `"1.0.0"`.
- `trace_id` *(string UUIDv4, bắt buộc)*: Mã truy vết phiên làm việc.
- `status` *(enum, bắt buộc)*: `verified` | `needs_review` | `unsupported` | `error`.
- `confidence` *(object, bắt buộc)*:
  - `level` *(string)*: `high` | `medium` | `low`.
  - `method` *(string)*: `symbolic` (tính toán giải tích SymPy) | `numeric` (xấp xỉ số học) | `consensus` (đồng thuận đa phương pháp).
  - `score` *(float 0.0 - 1.0, tùy chọn)*: Điểm số tin cậy định lượng.
- `restate_vi` *(string, tùy chọn)*: Đề bài đã chuẩn hóa bằng tiếng Việt.
- `result` *(object, tùy chọn)*: Payload nghiệp vụ của từng endpoint (chi tiết bên dưới).
- `steps` *(array object, mặc định `[]`)*: Danh sách các bước giải trung gian kèm KaTeX và giải thích tiếng Việt.
- `warnings` *(array string, mặc định `[]`)*: Cảnh báo toán học (phân kỳ, chia cho 0, thu hẹp miền xác định).
- `error` *(object hoặc null)*: Chứa `code` và `message_vi` khi `status == "error"`.

---

## 5. Chi Tiết Từng Endpoint Nghiệp Vụ

### 5.1. `GET /health` — Kiểm tra trạng thái hệ thống
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

### 5.2. `POST /v1/solve` — Gia sư AI Socratic 4 bậc
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
- **Ràng buộc đầu vào:**
  - `question_text`: Bắt buộc, độ dài từ 3 đến 2000 ký tự.
  - `question_id`: Tùy chọn, tối đa 100 ký tự.
  - `step_index`: Số nguyên từ 1 đến 4 (mặc định 1).
  - `previous_steps`: Mảng tối đa 20 phần tử chuỗi.
  - Cấm trường lạ (`extra="forbid"`).

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

### 5.3. `POST /v1/check` — Chấm bài thi & Đánh giá bước giải
- **Xác thực:** Bắt buộc header `X-Pumkin-API-Key`.
- **Mục tiêu:** Kiểm chứng tính đúng đắn của đáp án hoặc bước giải trung gian; đối chiếu tương đương đại số; phát hiện bẫy nhận thức.

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
- **Ràng buộc đầu vào:**
  - `canonical_answer`: Bắt buộc, chuỗi từ 1 đến 500 ký tự.
  - `student_answer`: Bắt buộc, chuỗi từ 1 đến 500 ký tự.
  - `answer_type`: Bắt buộc, thuộc 1 trong các giá trị: `number` | `expression` | `interval` | `set` | `matrix` | `boolean_group` | `multiple_choice`.
  - `step_index`: Tùy chọn, số nguyên từ 1 đến 20.
  - Cấm trường lạ (`extra="forbid"`).

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
  "restate_vi": "Kiểm tra đáp án câu hỏi cực tiểu hàm số",
  "result": {
    "verdict": "correct",
    "is_correct": true,
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

#### Giá trị của `verdict`:
1. `correct`: Đáp án trùng khớp hoàn toàn.
2. `correct_different_form`: Đúng về mặt toán học nhưng biểu diễn ở dạng khác (vd: `\(\frac{1}{\sqrt{2}}\)` và `\(\frac{\sqrt{2}}{2}\)`).
3. `incorrect`: Sai toán học hoặc rơi vào bẫy nhận thức (trả về mã bẫy tại `detected_misconception_id`).
4. `cannot_determine`: Hệ thống chưa đủ cơ sở chứng minh hoặc gặp mâu thuẫn CAS $\rightarrow$ **Không được trừ điểm học sinh**.

---

### 5.4. `POST /v1/generate` — Tạo đề & Sinh biến thể câu hỏi
- **Xác thực:** Bắt buộc header `X-Pumkin-API-Key`.
- **Mục tiêu:** Sinh câu hỏi mới tương đương về mặt cấu trúc toán học với nghiệm đẹp, kiểm soát 3 phương án nhiễu theo bẫy nhận thức chuẩn.

#### Request Schema (`GenerateRequest`):
```json
{
  "category": "ham_so_cuc_tri_cho_truoc",
  "difficulty": "M2",
  "count": 1,
  "seed": 42
}
```
- **Ràng buộc đầu vào:**
  - `category`: Bắt buộc, chuỗi từ 2 đến 100 ký tự (thuộc 17 nhóm ưu tiên trong `SPEC.md`).
  - `difficulty`: Thuộc 1 trong 4 bậc: `M1` (Nhận biết), `M2` (Thông hiểu), `M3` (Vận dụng), `M4` (Vận dụng cao). Mặc định là `M2`.
  - `count`: Số nguyên từ 1 đến 20 (mặc định 1).
  - `seed`: Số nguyên không âm ($0 \le \text{seed} < 2^{31}$) phục vụ tái lập tất định.
  - Cấm trường lạ (`extra="forbid"`).

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
            "misconceptionId": "TRAP_EXTREMA_VALUE_CONFUSION",
            "explanation_vi": "Học sinh tính nhầm giá trị cực tiểu thay vì giá trị cực đại."
          },
          {
            "option_index": 2,
            "latex": "\\(-1\\)",
            "misconceptionId": "TRAP_EXTREMA_POINT_VS_VALUE",
            "explanation_vi": "Học sinh nhầm điểm cực đại x = -1 với giá trị cực đại y."
          },
          {
            "option_index": 3,
            "latex": "\\(1\\)",
            "misconceptionId": "TRAP_EXTREMA_POINT_MIN_VS_MAX",
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

## 6. Ngữ Pháp Biểu Diễn Toán Học Trung Gian (MathProblemDSL)

Để ngăn chặn hoàn toàn việc thực thi mã động (`eval`/`exec`), LLM Semantic Parser chuyển đổi văn bản câu hỏi sang một trong các cấu trúc DSL có kiểu định danh (`type` discriminator):

| Phân môn | Giá trị `type` | Các trường cốt lõi của DSL |
| :--- | :--- | :--- |
| **Tính đơn điệu** | `ham_so_tinh_don_dieu` | `expression`, `interval` |
| **Đạo hàm cơ bản** | `ham_so_dao_ham_co_ban` | `expression`, `order` |
| **Cực trị** | `ham_so_cuc_tri_cho_truoc` | `expression` |
| **GTLN/GTNN** | `ham_so_gtln_gtnn_doan_khoang` | `expression`, `interval_start`, `interval_end` |
| **Tham số m** | `ham_so_chua_tham_so_m` | `expression`, `parameter_name`, `condition` |
| **Tối ưu thực tế** | `ham_so_toan_thuc_te_toi_uu` | `target_function`, `constraints[]`, `goal` |
| **Bảng biến thiên** | `ham_so_doc_bang_bien_thien` | `derivative_expression`, `intervals_sign[]` |
| **Tiệm cận** | `ham_so_tiem_can` | `expression` |
| **Nguyên hàm / Tích phân** | `nguyen_ham_tich_phan` | `integrand`, `lower_bound`, `upper_bound` |
| **Mũ & Logarit** | `mu_logarit_pt_bpt` | `equation`, `relation` |
| **Giới hạn & Dãy số** | `gioi_han_day_so` | `expression`, `approaches` |
| **Đại số tuyến tính** | `dai_so_tuyen_tinh_ma_tran` | `matrices{}`, `operation` |
| **Phương trình vi phân** | `phuong_trinh_vi_phan` | `equation`, `initial_conditions{}` |
| **Phương trình đại số** | `phuong_trinh_bat_phuong_trinh_dai_so` | `equation` |
| **Hình học Oxyz** | `hinh_hoc_oxyz` | `elements{}`, `query_type` |
| **Tổ hợp & Xác suất** | `to_hop_xac_suat` | `subdomain`, `parameters{}` |
| **Ngoài phạm vi** | `unsupported` | `reason` |

*(Chi tiết định nghĩa ngữ pháp AST và Allowlist Parser sẽ được cài đặt hoàn chỉnh ở Prompt 4 và Prompt 5).*
