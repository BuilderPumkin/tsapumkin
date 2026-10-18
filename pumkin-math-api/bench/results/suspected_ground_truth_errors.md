# DANH SÁCH CÂU HỎI NGHI ĐÁP ÁN CHUẨN SAI HOẶC BẤT CẬP (DÀNH CHO GIÁO VIÊN DUYỆT)

> **Tài liệu chuyển giao:** Giáo viên bộ môn Toán thẩm định và hiệu chỉnh.
> **Tình trạng:** CHƯA ĐƯỢC GIÁO VIÊN DUYỆT (Chờ xác nhận chính thức).
> **Tổng số trường hợp ghi nhận:** 3 câu.

Dưới đây là các câu hỏi trong ngân hàng 553 câu mà hệ thống CAS đã giải và kiểm chứng toán học độc lập, nhưng phát hiện đáp án khóa, phương án lựa chọn hoặc cách đặt câu hỏi trong đề gốc có sự bất cập/sai lệch:

| STT | Mã câu hỏi | Dạng bài | Đáp án CAS tính | Đáp án khóa ngân hàng | Lý do nghi ngờ / Phân tích sư phạm |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 1 | `q_hsa_15` | nguyen_ham_tich_phan | `-1 + 3 e` | `2` | Đề bài yêu cầu tính a + b từ tích phân (2x+3)e^x = a e + b. Solver tính ra I = 3e - 1, nhưng ngân hàng gán đáp án là 2. |
| 2 | `q_thpt_sa_01` | nguyen_ham_tich_phan | `- \log{\left(2 \right)} + \log{\left(6 \right)}` | `2` | Đề bài dạng câu hỏi tự luận ngắn tách phân thức a ln 2 + b ln 3, bank thiếu trường options chuẩn. |
| 3 | `q_superhard_type3_01` | hinh_hoc_oxyz | `I(1, 2, 0), R = 1` | `$M\left( \frac{1}{3}, \frac{7}{3}, -\frac{2}{3} \right)$` | Đề bài yêu cầu tìm điểm M trên mặt cầu gần (P) nhất, solver Oxyz tính tâm I và bán kính R. |

---
### Hướng dẫn dành cho Giáo viên duyệt:
1. **Phương án trùng lặp:** Nếu câu hỏi có 2 lựa chọn giống hệt nhau, cần sửa lại phương án nhiễu theo bẫy nhận thức.
2. **Đề hỏi biểu thức thứ cấp (meta-variable):** Với các bài toán hỏi giá trị $a + b$ từ tích phân $a e + b$, đề xuất bổ sung bước trích xuất hệ số hoặc chuyển về câu hỏi tính trực tiếp giá trị tích phân.
3. **Câu hỏi tự luận không có options:** Đề xuất chuẩn hóa ngân hàng để trường options không bị rỗng.