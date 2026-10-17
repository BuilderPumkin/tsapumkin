# DANH MỤC BẪY NHẬN THỨC TOÁN HỌC (MISCONCEPTION TRAP REGISTRY)
## Tài liệu thẩm định học thuật dành cho Hội đồng Chuyên môn & Giáo viên PUMKIN.DEV

- **Mã enum kỹ thuật:** `app.schemas.traps.MisconceptionTrapEnum`
- **Phiên bản:** `1.0.0`
- **Tiêu chuẩn học thuật tham chiếu:** `GEMINI.md` (PUMKIN Academic Standards & AI Governance).

---

### Bảng Danh Mục Bẫy Nhận Thức Chuẩn Hóa

| STT | Mã bẫy (`misconception_id`) | Phân môn | Mô tả sai lầm nhận thức của học sinh (1 dòng) | Nguồn gốc |
| :---: | :--- | :---: | :--- | :---: |
| 1 | `TRAP_LOG_DOMAIN_IGNORED` | Giải tích | Quên đặt điều kiện xác định cơ số và biểu thức dưới dấu logarit (\(a > 0, a \ne 1, b > 0\)). | `GEMINI.md` |
| 2 | `TRAP_RADICAL_DOMAIN_IGNORED` | Đại số | Quên đặt điều kiện biểu thức dưới dấu căn bậc hai không âm (\(f(x) \ge 0\)). | `GEMINI.md` |
| 3 | `TRAP_EXTREMA_DELTA_CONFUSION` | Giải tích | Nhầm điều kiện cực trị hàm bậc 3 (\(\Delta_{y'} = b^2 - 3ac > 0\)) với biệt thức phương trình bậc 2 (\(\Delta = b^2 - 4ac\)). | `GEMINI.md` |
| 4 | `TRAP_ANGLE_LINE_VS_VECTOR` | Vector | Quên trị tuyệt đối khi tính \(\cos\) góc giữa 2 đường thẳng dẫn đến góc tù, nhầm với góc giữa 2 vector. | `GEMINI.md` |
| 5 | `TRAP_COLLINEAR_ZERO_DIVISION` | Vector | Chia cho 0 khi lập tỉ số tọa độ để xét 2 vector cùng phương mà chưa loại trừ mẫu bằng 0. | `GEMINI.md` |
| 6 | `TRAP_CROSS_PRODUCT_IS_SCALAR` | Oxyz | Nhầm tích có hướng \([\vec{u}, \vec{v}]\) sinh ra một số vô hướng thay vì một vector vuông góc. | `GEMINI.md` |
| 7 | `TRAP_SPHERE_RADIUS_INVALID` | Oxyz | Quên kiểm tra điều kiện bán kính thực \(R^2 = a^2 + b^2 + c^2 - d > 0\) khi viết phương trình mặt cầu. | `GEMINI.md` |
| 8 | `TRAP_LINE_CANONICAL_ZERO_DENOM` | Oxyz | Viết phương trình chính tắc đường thẳng có mẫu số bằng 0 thay vì phải chuyển sang dạng tham số. | `GEMINI.md` |
| 9 | `TRAP_PLANE_DISTANCE_NO_ABS` | Oxyz | Quên lấy giá trị tuyệt đối ở tử số trong công thức tính khoảng cách từ điểm đến mặt phẳng. | `GEMINI.md` |
| 10 | `TRAP_PERM_COMB_CONFUSION` | Xác suất | Nhầm lẫn giữa tổ hợp \(C_n^k\) (không phân biệt thứ tự) và chỉnh hợp \(A_n^k\) (có phân biệt thứ tự). | `GEMINI.md` |
| 11 | `TRAP_PROB_SUM_NOT_DISJOINT` | Xác suất | Áp dụng công thức cộng \(P(A \cup B) = P(A) + P(B)\) mà quên trừ giao \(P(A \cap B)\) khi hai biến cố không xung khắc. | `GEMINI.md` |
| 12 | `TRAP_ROUND_TABLE_NUMBERED_SEATS` | Bàn tròn | Áp dụng công thức \((n-1)!\) khi bàn tròn đã đánh số ghế hoặc có mốc phòng cố định (đúng phải là \(n!\)). | `GEMINI.md` |
| 13 | `TRAP_ROUND_TABLE_BLOCK_FACTORIAL` | Bàn tròn | Tính \((n-1)! \times 2!\) thay vì \((n-2)! \times 2!\) khi xếp buộc 2 người ngồi cạnh nhau vào bàn tròn \(n\) ghế. | `GEMINI.md` |
| 14 | `TRAP_ROUND_TABLE_ALTERNATING_OVERCOUNT` | Bàn tròn | Nhân thừa 2 trường hợp như xếp hàng thẳng khi xếp xen kẽ \(n\) nam và \(n\) nữ vào bàn tròn \(2n\) ghế. | `GEMINI.md` |
| 15 | `TRAP_ROUND_TABLE_FLIP_SYMMETRY` | Bàn tròn | Quên chia 2 đối xứng gương không gian khi xếp chuỗi hạt hoặc vòng hoa có thể lật úp ngược (\(\frac{(n-1)!}{2}\)). | `GEMINI.md` |
| 16 | `TRAP_SIGN_ERROR` | Đại số | Nhầm dấu khi chuyển vế hoặc nhân/chia hai vế của bất phương trình với biểu thức mang dấu âm. | Chuẩn mở rộng |
| 17 | `TRAP_INVERSE_OPERATION` | Đại số | Nhầm lẫn phép toán ngược (nhầm lũy thừa với logarit, nhầm đạo hàm với nguyên hàm). | Chuẩn mở rộng |
| 18 | `TRAP_BOUNDARY_NOT_CHECKED` | Đại số | Quên kiểm tra điều kiện biên hoặc không loại nghiệm ngoại lai nằm ngoài tập xác định ban đầu. | Chuẩn mở rộng |
| 19 | `TRAP_OTHER` | Dự phòng | Các sai lầm nhận thức đặc thù khác chưa có mã chuyên biệt trong danh mục chuẩn. | Dự phòng |
