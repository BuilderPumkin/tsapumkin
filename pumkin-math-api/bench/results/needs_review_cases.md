# DANH SÁCH CÁC CA CẦN GIÁO VIÊN DUYỆT (NEEDS REVIEW - CAS MÂU THUẪN KEY)

> **Tài liệu chuyển giao:** Giáo viên bộ môn Toán thẩm định và hiệu chỉnh.
> **Tình trạng:** CHƯA ĐƯỢC GIÁO VIÊN DUYỆT (Chờ xác nhận chính thức).
> **Tổng số trường hợp ghi nhận:** 3 câu.

> [!IMPORTANT]
> **Nguyên tắc học thuật (GEMINI.md):**
> Khi kết quả tính toán CAS solver mâu thuẫn với khóa đáp án trong ngân hàng đề,
> hệ thống hạ trạng thái xuống `needs_review` và lưu cả hai đáp án.
> Tuyệt đối không tự ý gán nhãn 'key ngân hàng sai' khi chưa có kết luận của giáo viên.

| STT | Mã câu hỏi | Dạng bài | Đáp án CAS tính | Khóa đáp án ngân hàng | Nguyên nhân kỹ thuật & Phân tích sư phạm |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 1 | `q_hsa_15` | nguyen_ham_tich_phan | `-1 + 3 e` | `2` | Lỗi solver/evaluator: Đề bài yêu cầu tính a + b từ tích phân (2x+3)e^x = a e + b. Solver tính ra I = 3e - 1, nhưng chưa suy ra a=3, b=-1 để tính a+b=2. |
| 2 | `q_thpt_sa_01` | nguyen_ham_tich_phan | `- \log{\left(2 \right)} + \log{\left(6 \right)}` | `2` | Lỗi định dạng dữ liệu (câu hỏi ngắn options=null) & solver chưa trích xuất hệ số: Đề yêu cầu a+2b từ tích phân = a ln 2 + b ln 3. Solver tính ra ln 3, chưa suy ra a=0, b=1. |
| 3 | `q_superhard_type3_01` | hinh_hoc_oxyz | `I(1, 2, 0), R = 1` | `$M\left( \frac{1}{3}, \frac{7}{3}, -\frac{2}{3} \right)$` | Solver chưa hoàn tất: Đề bài yêu cầu tìm tọa độ điểm M trên mặt cầu gần (P) nhất. Solver mới tìm tâm I(1,2,0) và bán kính R=1, chưa thực hiện bước tối ưu hình học. |

---
### Hướng dẫn dành cho Giáo viên duyệt:
1. **`q_hsa_15`:** Tích phân cho ra \(3e - 1\). Key ngân hàng là `2` (ứng với \(a=3, b=-1 \implies a+b=2\)). Đây là bài toán trích xuất hệ số; solver hiện chỉ tính giá trị tích phân.
2. **`q_thpt_sa_01`:** Câu hỏi tự luận ngắn thiếu options (`options: null`), yêu cầu tính \(P = a + 2b\) từ \(a\ln 2 + b\ln 3\). Solver tính ra \(\ln 3\), chưa có bước đồng nhất hệ số.
3. **`q_superhard_type3_01`:** Đề bài yêu cầu tìm điểm \(M \in (S)\) gần mặt phẳng \((P)\) nhất. Solver mới tìm tâm \(I(1,2,0)\) và bán kính \(R=1\), chưa hoàn tất bước tìm hình chiếu và cực trị khoảng cách.