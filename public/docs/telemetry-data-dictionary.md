# TỪ ĐIỂN DỮ LIỆU TELEMETRY & ĐẶC TẢ SCHEMA (DATA DICTIONARY)
**Phiên bản Schema:** `v1.0.0`  
**Dự án:** PUMKIN.DEV Dynamic Cognitive Router  
**Cơ quan chịu trách nhiệm:** Data & Experimentation Lead, EdTech Privacy Reviewer  

---

## 1. CẤU TRÚC BẢN GHI TELEMETRY CHUẨN (CANONICAL EVENT SCHEMA)

Mọi sự kiện micro-telemetry truyền từ trình duyệt học sinh về máy chủ phân tích đều phải tuân thủ nghiêm ngặt định dạng JSON sau:

```json
{
  "schemaVersion": "1.0",
  "eventId": "ev_1726500000000_a1b2c3d",
  "experimentId": "cognitive-beta-2026",
  "cohortId": "cognitive-beta-2026-01",
  "group": "treatment",
  "anonymousParticipantId": "anon_9f83ab201c890ef4",
  "anonymousSessionId": "session_k9x2m4p8q",
  "timestamp": "2026-09-16T11:45:00.123Z",
  "eventType": "router_decision",
  "appVersion": "1.0.0",
  "calibrationVersion": "1.0.0",
  "questionMetadata": {
    "questionId": "q_math_log_042",
    "topic": "Hàm số mũ và logarit",
    "difficulty": "M2",
    "representationType": "symbolic",
    "expectedTimeSeconds": 60
  },
  "cognitiveStateSummary": {
    "rigor": 0.72,
    "intuition": 0.65,
    "flexibility": 0.58,
    "masteryScore": 68.5,
    "representationGap": 24.0
  },
  "routerDecision": {
    "decision": "PA1_SOCRATIC",
    "confidence": 0.85,
    "fallback": false
  },
  "payload": {
    "timeSpentMs": 48200,
    "hintTierRequested": 1,
    "misconceptionTrapTriggered": "TRAP_LOG_DOMAIN_IGNORED"
  }
}
```

---

## 2. BẢNG MÔ TẢ TRƯỜNG DỮ LIỆU (FIELD SPECIFICATIONS)

| Tên trường | Kiểu dữ liệu | Bắt buộc | Mô tả & Ràng buộc giá trị |
| :--- | :---: | :---: | :--- |
| `schemaVersion` | String | **Có** | Phiên bản lược đồ dữ liệu, hiện tại là `"1.0"`. |
| `eventId` | String | **Có** | Khóa định danh duy nhất của sự kiện, sinh tự động dạng `ev_{timestamp}_{random}` để deduplicate. |
| `experimentId` | String | **Có** | Mã chiến dịch thử nghiệm, ví dụ: `"cognitive-beta-2026"`. |
| `cohortId` | String | **Có** | Mã nhóm học sinh thử nghiệm, ví dụ: `"cognitive-beta-2026-01"`. |
| `group` | String | **Có** | Nhóm thử nghiệm được gán: `"treatment"` hoặc `"control"`. |
| `anonymousParticipantId` | String | **Có** | Mã định danh giả danh (pseudonymous ID) tạo bằng hàm băm HMAC-SHA256 có muối từ `userId`. Tuyệt đối không chứa họ tên hay email. |
| `anonymousSessionId` | String | **Có** | Khóa phiên làm bài tạm thời, tự động hủy sau khi đóng trình duyệt. |
| `timestamp` | String | **Có** | Thời gian chuẩn ISO-8601 theo múi giờ UTC. |
| `eventType` | String | **Có** | Tên loại sự kiện trong danh mục chuẩn (xem Mục 3). |
| `appVersion` | String | **Có** | Phiên bản ứng dụng PUMKIN Web Client. |
| `calibrationVersion` | String | **Có** | Phiên bản cấu hình tham số Router tại thời điểm sự kiện xảy ra (ví dụ: `"1.0.0"`). |
| `questionMetadata` | Object | Không | Siêu dữ liệu câu hỏi (mã, độ khó, chủ đề, biểu diễn). |
| `cognitiveStateSummary` | Object | Không | Bản chụp giá trị Vector Nhận thức ($S_{rigor}, S_{intuition}, S_{flexibility} \in [0, 1]$). |
| `routerDecision` | Object | Không | Quyết định điều phối của Router: `PA1_SOCRATIC`, `PA2_SANDBOX`, `PA3_REVERSE`, hoặc `STANDARD`. |
| `payload` | Object | Không | Tham số đo đạc micro-interaction (thời gian làm bài, bậc gợi ý, tham số slider đồ thị). |

---

## 3. DANH MỤC CÁC LOẠI SỰ KIỆN CHUẨN (EVENT TYPES)
1. `question_opened`: Học sinh mở câu hỏi, bắt đầu tính giờ ngập ngừng.
2. `answer_selected`: Học sinh tích chọn một phương án A, B, C, D.
3. `answer_changed`: Học sinh đổi đáp án từ phương án này sang phương án khác.
4. `answer_submitted`: Học sinh nộp đáp án của câu hỏi hoặc nộp bài thi.
5. `hint_requested`: Học sinh bấm mở bậc gợi ý trong thang Socratic (1, 2, 3 hoặc 4).
6. `sandbox_opened`: Học sinh mở khung thí nghiệm mô phỏng đồ thị trực quan.
7. `sandbox_parameter_changed`: Học sinh kéo slider thay đổi tham số (ví dụ $a, b, c$).
8. `socratic_step_viewed`: Học sinh xem nội dung gợi ý một tầng cụ thể.
9. `reverse_task_started`: Học sinh bắt đầu thử thách kỹ nghệ đảo ngược thiết kế bài toán.
10. `reverse_task_submitted`: Học sinh nộp đề bài và bẫy nhận thức tự tạo.
11. `router_decision`: Router đưa ra quyết định can thiệp sư phạm.
12. `fallback_triggered`: Hệ thống tự động chuyển về luồng cơ bản do lỗi hoặc điều kiện biên.
13. `client_error`: Bắt lỗi JavaScript runtime tại client để giám sát sức khỏe hệ thống.

---

## 4. QUY TẮC RÀ SOÁT & CHỐNG LỘ THÔNG TIN (PII SANITIZATION RULES)
- **Tự động từ chối (Drop Rule):** Server `BetaExperimentService` kiểm tra toàn bộ chuỗi JSON; nếu xuất hiện bất kỳ trường nào trong danh mục đen (`email`, `phone`, `fullName`, `username`, `studentName`, `ip`, `password`), toàn bộ request sẽ bị trả về HTTP 400 Bad Request và ghi nhận vào Audit Log.
- **Không lưu text tự do:** Mọi tương tác của học sinh được mã hóa thành mã hành vi hoặc chỉ số tham số, không lưu trữ văn bản gõ tự do chưa qua tiền xử lý.
