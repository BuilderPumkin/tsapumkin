# PUMKIN COGNITIVE TRACKER (PHASE 2 BROWSER-SIDE TELEMETRY ENGINE)

> **Tài liệu Kỹ thuật & Hướng dẫn Tích hợp**  
> **Vị trí file mã nguồn:** `public/js/core/PumkinCognitiveTracker.js` (và `PUMKINTSA/public/js/core/PumkinCognitiveTracker.js`)  
> **Phiên bản:** `1.0.0` | **Không phụ thuộc thư viện ngoài (Zero external dependencies)**

---

## 1. Giới thiệu & Kiến trúc 2 Lớp (Two-Tier Architecture)

`PumkinCognitiveTracker` là module thu thập vi tương tác học tập ngầm trong trình duyệt, tính toán Véc-tơ Trạng thái Tư duy (Cognitive State Vector $\vec{S}$) theo thời gian thực với độ trễ cực thấp ($p95 < 0.004\text{ ms}$), không làm gián đoạn UI và không phụ thuộc vào LLM.

Module được phân tách nội bộ thành 2 tầng logic:

```
+-------------------------------------------------------------------------+
|                       PumkinCognitiveTracker                            |
|                            (Facade API)                                 |
+------------------------------------+------------------------------------+
                                     |
                                     v
+------------------------------------+------------------------------------+
|               TẦNG A               |               TẦNG B               |
|       Pure Cognitive Engine        |        DOM Telemetry Adapter       |
| ---------------------------------- | ---------------------------------- |
| - 100% Headless (No window/doc)    | - Gắn và gỡ event delegation       |
| - Véc-tơ Trạng thái S thời gian thực| - Chuyển đổi DOM event -> Telemetry|
| - Bounded Ring Buffer O(1) storage | - Page Visibility API (tạm dừng giờ|
| - Tổng hợp dồn số liệu vi mô       |   khi chuyển tab > 3 giây)         |
| - Độc lập kiểm thử Unit Test       | - Batch/Debounce slider tương tác  |
+------------------------------------+------------------------------------+
```

---

## 2. API Công khai (Public API Reference)

### 2.1. Khởi tạo (Constructor)

```javascript
const tracker = new PumkinCognitiveTracker(options);
```

#### Bảng Tham số Cấu hình (`options`):

| Thuộc tính | Kiểu dữ liệu | Mặc định | Ý nghĩa |
| :--- | :--- | :--- | :--- |
| `maxEventBuffer` | `number` | `200` | Số lượng raw events tối đa trong Ring Buffer |
| `maxQuestionHistory`| `number` | `50` | Số lượng câu hỏi hoàn thành được lưu trong RAM |
| `minimumEvidenceQuestions` | `number` | `3` | Số câu hỏi tối thiểu để thoát chế độ chẩn đoán |
| `hesitationThresholdMs` | `number` | `5000` | Ngưỡng cảnh báo ngập ngừng ban đầu (ms) |
| `longHesitationThresholdMs` | `number` | `12000` | Ngưỡng ngập ngừng nghiêm trọng (ms) |
| `representationGapThreshold` | `number` | `30` | Ngưỡng kích hoạt cảnh báo lệch pha biểu diễn (%) |
| `masteryThreshold` | `number` | `85` | Ngưỡng công nhận thuần thục cao (%) |
| `autoStart` | `boolean` | `true` | Tự động gắn DOM listeners khi khởi tạo trên trình duyệt |
| `onStateChange` | `function` | `null` | Callback `(state, rationale) => {}` khi vector thay đổi |
| `onTelemetryEvent`| `function` | `null` | Callback `(event) => {}` khi có sự kiện vi mô mới |
| `onError` | `function` | `null` | Callback `(err) => {}` khi có ngoại lệ nội bộ |

---

### 2.2. Vòng đời Module (Lifecycle)

- **`tracker.start()`**: Kích hoạt theo dõi, gắn delegated listeners vào `document`. Phương thức là *idempotent* (gọi nhiều lần không sinh duplicate listeners).
- **`tracker.stop()`**: Tạm dừng theo dõi, tháo bỏ DOM listeners, giữ nguyên state trong RAM.
- **`tracker.destroy()`**: Hủy hoàn toàn tracker, tháo gỡ listeners, xóa toàn bộ bộ đệm sự kiện và giải phóng tham chiếu bộ nhớ.

---

### 2.3. Theo dõi Câu hỏi & Vi Tương tác (Question Telemetry)

#### `tracker.beginQuestion(metadata)`
Gọi khi câu hỏi bắt đầu hiển thị lên màn hình. Bắt đầu đo nhịp ngập ngừng (hesitation).
```javascript
tracker.beginQuestion({
    questionId: "q_exp_01",
    topic: "Hàm số mũ và logarit",
    difficulty: 2, // 1..5
    representationType: "algebraic", // 'algebraic' | 'geometric' | 'graphical' | 'tabular' | 'contextual'
    expectedTimeMs: 45000,
    prerequisiteTags: ["logarithm_domain"],
    misconceptionTrapCode: "L1", // 'L1' | 'L2' | 'L3' | null
    logicalConditionTags: ["x_gt_0"]
});
```

#### `tracker.recordAnswer(payload)`
Gọi khi học sinh bấm chọn hoặc đổi một phương án.
- Tự động ghi nhận nhịp ngập ngừng ở lần chọn đầu tiên.
- Chỉ tăng `answerChangeCount` (flips) khi học sinh chọn đáp án khác đáp án trước đó.
- Bấm lại cùng một đáp án sẽ **không** tính là đổi đáp án.
```javascript
tracker.recordAnswer({
    questionId: "q_exp_01",
    choiceId: "A",
    timestampMs: Date.now()
});
```

#### `tracker.recordHint(payload)`
Ghi nhận thao tác mở gợi ý Socratic.
```javascript
tracker.recordHint({
    questionId: "q_exp_01",
    hintLevel: 1
});
```

#### `tracker.recordSandboxInteraction(payload)`
Ghi nhận vi thao tác kéo slider tham số đồ thị.
```javascript
tracker.recordSandboxInteraction({
    parameter: "base",
    value: 2.5,
    timestampMs: Date.now()
});
```

#### `tracker.completeQuestion(resultPayload)`
Gọi khi câu hỏi đã được chấm điểm. Cập nhật running aggregates, rolling window và tính lại Cognitive State Vector.
```javascript
const result = tracker.completeQuestion({
    questionId: "q_exp_01",
    isCorrect: false,
    earnedScore: 0.0,
    selectedAnswer: "A",
    misconceptionTrapCode: "L1" // Hoặc null nếu không dính bẫy
});
// result.cognitiveState chứa state vector mới nhất
```

---

### 2.4. Đọc Trạng thái & Xuất Dữ liệu (State & Telemetry Query)

- **`tracker.getCognitiveState()`**: Trả về Cognitive State Vector $\vec{S}$ mới nhất kèm lý giải sư phạm minh bạch và các cờ cảnh báo.
- **`tracker.getQuestionMetrics(questionId)`**: Lấy toàn bộ số đo vi mô của một câu hỏi cụ thể.
- **`tracker.getSessionSummary()`**: Trả về báo cáo tổng quan toàn bộ phiên học.
- **`tracker.exportTelemetry(options)`**: Xuất gói kiểm toán đầy đủ dưới dạng JSON (bao gồm raw events trong Ring Buffer và lịch sử câu hỏi).
- **`tracker.resetSession()`**: Xóa dữ liệu cũ, sinh `sessionId` ẩn danh mới.

---

## 3. Cấu trúc Dữ liệu & Schemas

### 3.1. Telemetry Event Schema

```json
{
  "eventId": "ev_1789312345_abc12",
  "sessionId": "student_anon_1789312_xyz99",
  "questionId": "q_exp_01",
  "type": "answer_selected",
  "timestampMs": 1789312345678,
  "payload": {
    "choiceId": "A",
    "isChange": false,
    "totalFlips": 0,
    "responseTimeMs": 4200
  }
}
```

### 3.2. Cognitive State Vector Schema

```json
{
  "rigor": 0.85,
  "intuition": 0.72,
  "flexibility": 0.68,
  "representationGap": 12.5,
  "masteryScore": 88.4,
  "evidenceCount": 6,
  "confidence": 0.74,
  "detectedTraps": ["L1_BOUNDARY"],
  "lastUpdatedAt": 1789312350000,
  "rationale": [
    "Đã xác lập hồ sơ dựa trên 6 câu hỏi (Độ tin cậy: 74%).",
    "Phát hiện bẫy nhận thức trọng yếu: [L1_BOUNDARY].",
    "Độ lệch biểu diễn thấp (12.5%). Năng lực biểu diễn đại số và trực quan đồ thị cân bằng.",
    "Học sinh đạt mức độ thuần thục cao (88.4% >= 85%) với kỷ luật logic vững vàng."
  ],
  "flags": {
    "insufficientEvidence": false,
    "highHesitation": false,
    "possiblePrerequisiteRisk": true
  }
}
```

---

## 4. Công thức Tính toán Chỉ số Nhận thức

### 4.1. Kỷ luật Điều kiện biên ($S_{\text{rigor}}$)
$$S_{\text{rigor}} = 0.50 \cdot \text{Acc}_{\text{logical}} + 0.30 \cdot \text{Awareness}_{\text{condition}} + 0.20 \cdot \text{Stability}_{\text{answer}}$$
- $\text{Acc}_{\text{logical}}$: Tỉ lệ làm đúng các câu có ràng buộc điều kiện xác định.
- $\text{Awareness}_{\text{condition}} = \max(0, 1.0 - 1.5 \times \text{TrapRate})$: Trừ điểm thích đáng khi dính bẫy nhận thức $L_1$ (biên), $L_2$ (suy diễn một chiều), $L_3$ (ngộ nhận).
- $\text{Stability}_{\text{answer}} = \max(0, 1.0 - \min(1.0, \text{AvgFlips} \times 0.35))$: Phạt hành vi đổi đáp án liên tục, thiếu kiên định.

### 4.2. Trực giác Không gian & Đồ thị ($S_{\text{intuition}}$)
$$S_{\text{intuition}} = 0.55 \cdot \text{Acc}_{\text{visual}} + 0.30 \cdot \text{Transfer}_{\text{rep}} + 0.15 \cdot \text{Sandbox}_{\text{meaningful}}$$
- $\text{Acc}_{\text{visual}}$: Tỉ lệ chính xác trên các câu hỏi đồ thị (`graphical`), hình học (`geometric`), bảng số liệu (`tabular`) và bài toán thực tế (`contextual`).
- $\text{Transfer}_{\text{rep}} = 1.0 - |\text{Acc}_{\text{algebraic}} - \text{Acc}_{\text{visual}}|$: Đo lường sự đồng đều giữa ký hiệu và hình học.
- $\text{Sandbox}_{\text{meaningful}}$: Tỉ lệ phiên học sinh có tương tác kéo slider có định hướng (tối thiểu 2 lần chỉnh tham số và khoảng dừng quan sát $\ge 300\text{ ms}$).

### 4.3. Khoảng trống Biểu diễn (Representation Gap)
$$\text{Gap}_{\text{rep}} = |\text{Acc}_{\text{algebraic}} - \text{Acc}_{\text{visual}}| \times 100\%$$
- Nếu $\text{Gap}_{\text{rep}} \ge 30\%$, hệ thống tự động cảnh báo lệch pha biểu diễn và đề xuất can thiệp **PA2: Dual-Coding**.

### 4.4. Điểm Thuần thục (Mastery Score)
Tính toán trên cửa sổ trượt (rolling window) tối đa 20 câu hỏi gần nhất có tính đến trọng số độ khó bài toán và hiệu suất thời gian.
- **Ràng buộc an toàn:** Nếu số câu làm $< 3$ (chưa đủ dữ liệu), $S_{\text{mastery}}$ bị chặn trên ở mức $\le 84.9\%$ để không ngộ nhận học sinh đã master dạng bài khi mới chỉ làm 1-2 câu may mắn.

---

## 5. Hướng dẫn Tích hợp Thực tế vào Giao diện (Integration Guide)

Nhờ cơ chế **Event Delegation**, bạn không cần sửa đổi lớn giao diện cũ. Chỉ cần bổ sung các thuộc tính `data-cognitive-...` vào markup HTML tương ứng:

### 5.1. Tích hợp Trắc nghiệm (MCQ)

```html
<!-- Bọc câu hỏi bằng data-cognitive-question-id -->
<div class="question-container" data-cognitive-question-id="q_log_02">
    <div class="prompt">Tìm tập xác định của hàm số $y = \log_3(x - 2)$</div>

    <!-- Gắn data-cognitive-answer vào từng nút lựa chọn -->
    <button class="choice-btn" data-cognitive-answer="A">A. $D = (2; +\infty)$</button>
    <button class="choice-btn" data-cognitive-answer="B">B. $D = [2; +\infty)$</button>
    <button class="choice-btn" data-cognitive-answer="C">C. $D = \mathbb{R} \setminus \{2\}$</button>

    <!-- Gắn data-cognitive-action vào nút gợi ý và nộp bài -->
    <button data-cognitive-action="hint">Xem gợi ý</button>
    <button data-cognitive-action="submit">Nộp bài</button>
</div>
```

### 5.2. Tích hợp Sandbox tương tác (Slider)

```html
<div class="sandbox-panel">
    <label>Cơ số $b$:</label>
    <!-- Gắn data-cognitive-sandbox-param vào slider input -->
    <input type="range" min="0.1" max="5.0" step="0.1" value="2.0" 
           data-cognitive-sandbox-param="base">
</div>
```

### 5.3. Khởi tạo và Lắng nghe Sự kiện trong Javascript

```javascript
// Khởi tạo tracker
const tracker = new PumkinCognitiveTracker({
    minimumEvidenceQuestions: 3,
    onStateChange: (state, rationale) => {
        console.log("Vector tư duy cập nhật:", state);
        // Hiển thị thanh tiến trình trực quan
        document.getElementById('rigorBar').style.width = `${state.rigor * 100}%`;
        document.getElementById('gapBadge').textContent = `Gap: ${state.representationGap}%`;
    },
    onTelemetryEvent: (ev) => {
        // Có thể gửi ngầm vào log nội bộ nếu cần
    }
});

// Khi render câu hỏi mới
tracker.beginQuestion({
    questionId: "q_log_02",
    topic: "Hàm số mũ và logarit",
    difficulty: 2,
    representationType: "algebraic",
    expectedTimeMs: 45000,
    misconceptionTrapCode: "L1"
});

// Khi học sinh nộp bài và chấm điểm
function onUserSubmit(isCorrect) {
    tracker.completeQuestion({
        questionId: "q_log_02",
        isCorrect: isCorrect,
        earnedScore: isCorrect ? 1.0 : 0.0,
        misconceptionTrapCode: isCorrect ? null : "L1"
    });
}
```

---

## 6. Ngăn ngừa Rò rỉ Bộ nhớ (Memory Leak Prevention)

Module được thiết kế đạt tiêu chuẩn Clean Architecture:
- Không lưu mảng raw events vô hạn; mọi sự kiện đều nằm trong **Bounded Ring Buffer 200 phần tử**.
- Khi chuyển đổi trang hoặc unmount component bài thi, chỉ cần gọi:
  ```javascript
  tracker.destroy();
  ```
  Thao tác này tự động gỡ sạch toàn bộ event listeners khỏi DOM và giải phóng các biến timer nội bộ.
