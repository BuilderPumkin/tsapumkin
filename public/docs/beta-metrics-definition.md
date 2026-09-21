# ĐỊNH NGHĨA & CÔNG THỨC CÁC CHỈ SỐ ĐO LƯỜNG CLOSED BETA (METRICS DEFINITION)
**Dự án:** PUMKIN.DEV Dynamic Cognitive Router  
**Tập trung:** Công thức toán học, ngưỡng đo lường và cách thu thập chỉ số  

---

## 1. NHÓM CHỈ SỐ KẾT QUẢ SƯ PHẠM (PEDAGOGICAL METRICS)

### 1.1. Tỷ lệ Vượt Bẫy Nhận thức (Misconception Trap Accuracy - $R_{\text{trap}}$)
- **Ý nghĩa:** Đo lường khả năng tránh các sai lầm phổ biến khi giải toán sau khi được can thiệp sư phạm.
- **Công thức:**
  $$R_{\text{trap}} = \frac{\sum_{i \in \text{TrapQuestions}} \mathbb{I}(\text{Answer}_i = \text{Correct})}{| \text{TrapQuestions} |} \times 100\%$$
- **Ngưỡng mục tiêu:** Nhóm Treatment đạt $R_{\text{trap}} \ge 75\%$.

### 1.2. Thời gian Tư duy Tích cực (Active-Thinking Time Proxy - $T_{\text{active}}$)
- **Ý nghĩa:** Đo lường thời lượng học sinh thực sự tư duy trên bài toán, loại bỏ nhiễu do rời màn hình hoặc treo máy.
- **Công thức:**
  $$T_{\text{active}} = \sum_{q=1}^{N} \min\left( t_{\text{dwell}}(q), \, 2.5 \times t_{\text{expected}}(q) \right) \times \mathbb{I}(\text{TabActive})$$
  - Trong đó: $t_{\text{expected}}(q)$ là thời gian chuẩn hóa của câu hỏi độ khó M1–M4; $t_{\text{dwell}}$ là thời gian từ khi mở câu đến khi chọn đáp án cuối cùng.

### 1.3. Chỉ số Đoán mò Ngẫu nhiên (Random-Guessing Proxy - $G_{\text{random}}$)
- **Ý nghĩa:** Phát hiện hành vi trả lời đối phó hoặc bấm loạn xạ khi bế tắc.
- **Tiêu chí kích hoạt:** Một câu hỏi bị gắn cờ $G_{\text{random}}$ nếu:
  $$t_{\text{dwell}} < 3.0\text{ giây} \quad \text{HOẶC} \quad \text{Số lần đổi đáp án liên tục} \ge 4 \text{ trong vòng } 5\text{ giây}$$
- **Ngưỡng mục tiêu:** $G_{\text{random}} \le 5\%$ trên toàn bộ bài thi.

---

## 2. NHÓM CHỈ SỐ TRẢI NGHIỆM & SỨC KHỎE HỆ THỐNG (EXPERIENCE & HEALTH)

### 2.1. Tỷ lệ Lỗi Client Runtime (Client Error Rate - $E_{\text{client}}$)
- **Công thức:**
  $$E_{\text{client}} = \frac{\text{Tổng số lỗi JS bắt được trong try/catch}}{\text{Tổng số lượt tải câu hỏi}} \times 100\%$$
- **Ngưỡng kiểm soát (Quality Gate):** Phải $< 0.1\%$.

### 2.2. Tỷ lệ Tự động Fallback (Automatic Fallback Rate - $F_{\text{fallback}}$)
- **Công thức:**
  $$F_{\text{fallback}} = \frac{\text{Số lượt kích hoạt } \text{safeFallbackToStandardPractice()}}{\text{Tổng số lượt Router ra quyết định}} \times 100\%$$
- **Ngưỡng kiểm soát (Quality Gate):** Phải $< 1.0\%$.

### 2.3. Điểm Hài lòng Người học (Learner Satisfaction Score - CSAT)
- **Thu thập:** Khảo sát ngắn 3 câu hỏi vào cuối phiên thi theo thang điểm Likert 5 mức (1 = Rất không đồng ý, 5 = Hoàn toàn đồng ý).
- **Công thức:**
  $$\text{CSAT} = \frac{1}{N} \sum_{k=1}^{N} \text{Score}_k$$
- **Ngưỡng mục tiêu:** $\text{CSAT} \ge 4.2 / 5.0$.
