# CAM NANG TOAN HOC TOAN DIEN - PUMKIN.DEV
*(He thong 25 Chuyen de Ly thuyet, Bay tu duy, Cong thuc chuan & Bai tap mau)*

---

## [kb_toan10_01] Mệnh đề, Tập hợp và Các phép toán trên tập hợp
- **Phan loai**: Toán 10 * Chương 1: Mệnh đề & Tập hợp
- **Tong quan**: Nền tảng của tư duy logic toán học, cấu trúc dữ liệu và bài toán đếm bù trừ.

### Ly thuyet cot loi
### 1. Mệnh đề toán học và Mệnh đề phủ định
Một mệnh đề là một khẳng định đúng hoặc sai, không thể vừa đúng vừa sai.
- Mệnh đề kéo theo: \(P \implies Q\) chỉ sai khi \(P\) đúng và \(Q\) sai.
- Mệnh đề đảo của \(P \implies Q\) là \(Q \implies P\).
- Mệnh đề phản đảo: \(\overline{Q} \implies \overline{P}\) (có cùng giá trị chân lý với \(P \implies Q\)).

### 2. Các phép toán trên tập hợp
- **Giao**: \(A \cap B = \{x \mid x \in A \text{ và } x \in B\}\).
- **Hợp**: \(A \cup B = \{x \mid x \in A \text{ hoặc } x \in B\}\).
- **Hiệu**: \(A \setminus B = \{x \mid x \in A \text{ và } x \notin B\}\).
- **Phần bù**: \(C_E A = E \setminus A\) (với \(A \subset E\)).

### He thong cong thuc trong tam
#### Nguyên lý bù trừ 2 tập
`\[|A \cup B| = |A| + |B| - |A \cap B|\]`
*Tính số phần tử của hợp hai tập hữu hạn*

#### Nguyên lý bù trừ 3 tập
`\[|A \cup B \cup C| = |A|+|B|+|C| - (|A \cap B| + |B \cap C| + |C \cap A|) + |A \cap B \cap C|\]`
*Tính số phần tử khi có 3 tập giao nhau*

#### Điều kiện hai khoảng giao khác rỗng
`\[(a; b) \cap (c; d) \ne \emptyset \iff a < d \text{ và } c < b\]`
*Điều kiện để hai khoảng số thực giao nhau khác rỗng*

### Bay sai lam & Luu y dac biet
- Nhầm giữa quan hệ phần tử thuộc tập (thuộc) và tập con (chứa trong)
- Quên xét trường hợp mút vuông hay tròn khi kiểm tra giao khác rỗng

### Bai tap mau
#### Ví dụ 1: Tìm m để giao hai tập hợp khác rỗng
**De bai**: Cho \(A = [m; m+3]\) và \(B = (2; 6)\). Tìm tất cả giá trị thực của tham số \(m\) để \(A \cap B \ne \emptyset\).

**Loi giai chi tiet**:
- Bước 1: Xác định điều kiện hai khoảng/đoạn giao khác rỗng: đầu mút trái của tập này phải nhỏ hơn đầu mút phải của tập kia.
- Bước 2: Ta có hệ bất phương trình: \(m < 6\) và \(m + 3 > 2\).
- Bước 3: Suy ra \(-1 < m < 6\). Do \(A\) là đoạn nên tại các mút: nếu \(m=6\) thì \(A=[6;9]\), giao với \(B\) bằng rỗng. Vậy \(m \in (-1; 6)\).

> **Ghi nho**: Sử dụng trục số để biểu diễn mút: [a, b] và (c, d) giao nhau khi max(a, c) < min(b, d).

---

## [kb_toan10_02] Bất phương trình, Quy hoạch tuyến tính & Bất đẳng thức AM-GM, Cauchy-Schwarz
- **Phan loai**: Toán 10 * Chương 2: Bất phương trình & Bất đẳng thức
- **Tong quan**: Phương pháp biểu diễn miền nghiệm đa giác, tìm cực trị hàm mục tiêu tuyến tính và kỹ thuật chứng minh bất đẳng thức thực chiến.

### Ly thuyet cot loi
### 1. Bất phương trình bậc nhất hai ẩn & Quy hoạch tuyến tính
Dạng tổng quát: \(ax + by + c \le 0\) (với \(a^2 + b^2 > 0\)).
- Miền nghiệm là một nửa mặt phẳng kể cả bờ là đường thẳng \(d: ax + by + c = 0\).
- **Định lý tối ưu trên miền đa giác**: Cho hàm mục tiêu \(F(x, y) = ax + by\). Nếu miền nghiệm của hệ bất phương trình là một đa giác lồi \(A_1A_2\dots A_n\), thì giá trị lớn nhất và giá trị nhỏ nhất của \(F(x, y)\) luôn đạt tại một trong các đỉnh của đa giác.

### 2. Bất đẳng thức AM-GM (Cauchy)
Cho các số thực không âm \(a_1, a_2, \dots, a_n \ge 0\):
\[\frac{a_1 + a_2 + \dots + a_n}{n} \ge \sqrt[n]{a_1 a_2 \dots a_n}\]
Dấu bằng xảy ra khi và chỉ khi \(a_1 = a_2 = \dots = a_n\).

### 3. Bất đẳng thức Cauchy-Schwarz (Bunhiacopxki) & Kỹ thuật Engel
Cho hai dãy số thực \((a_1, \dots, a_n)\) và \((b_1, \dots, b_n)\):
\[(a_1 b_1 + \dots + a_n b_n)^2 \le (a_1^2 + \dots + a_n^2)(b_1^2 + \dots + b_n^2)\]
- **Dạng phân thức Engel (Svac-xơ)** với \(x_i > 0\):
\[\frac{a_1^2}{x_1} + \frac{a_2^2}{x_2} + \dots + \frac{a_n^2}{x_n} \ge \frac{(a_1 + a_2 + \dots + a_n)^2}{x_1 + x_2 + \dots + x_n}\]

### He thong cong thuc trong tam
#### Hàm mục tiêu tuyến tính
`\[F(x, y) = ax + by + c \implies \max F = \max_{i=1}^n \{F(A_i)\}\]`
*Cực trị tuyến tính trên miền đa giác luôn đạt tại một trong các đỉnh*

#### Bất đẳng thức AM-GM (Cauchy) 2 số & 3 số
`\[a + b \ge 2\sqrt{ab} \; (a, b \ge 0), \quad a + b + c \ge 3\sqrt[3]{abc} \; (a, b, c \ge 0) \quad (\text{Dấu '=' } \iff a = b = c)\]`
*Bất đẳng thức giữa trung bình cộng và trung bình nhân cho các số thực không âm*

#### Bất đẳng thức Cauchy-Schwarz (Bunhiacopxki) & Dạng Engel
`\[(ax + by)^2 \le (a^2 + b^2)(x^2 + y^2), \quad \frac{a^2}{x} + \frac{b^2}{y} \ge \frac{(a+b)^2}{x+y} \; (x, y > 0)\]`
*Bất đẳng thức tích vô hướng và kỹ thuật cộng mẫu số Engel (Svac-xơ)*

### Bay sai lam & Luu y dac biet
- Áp dụng bất đẳng thức AM-GM khi các biến chưa được chứng minh là số không âm
- Quên kiểm tra điều kiện dấu bằng xảy ra trong bài toán tìm cực trị
- Chọn sai đỉnh khi giải quy hoạch tuyến tính trên miền không bị chặn

### Bai tap mau
#### Ví dụ 1: Tối ưu hóa chi phí sản xuất
**De bai**: Một phân xưởng sản xuất 2 loại sản phẩm A và B. Lợi nhuận mỗi tấn A là 4 triệu, mỗi tấn B là 3 triệu. Miền ràng buộc nguyên liệu tạo thành tứ giác có tọa độ 4 đỉnh \(O(0,0), P(0,4), Q(3,2), R(4,0)\). Tìm lợi nhuận tối đa.

**Loi giai chi tiet**:
- Bước 1: Hàm mục tiêu: \(L(x, y) = 4x + 3y\).
- Bước 2: Tính giá trị tại 4 đỉnh: \(L(O) = 0\), \(L(P) = 4(0) + 3(4) = 12\), \(L(Q) = 4(3) + 3(2) = 18\), \(L(R) = 4(4) + 3(0) = 16\).
- Bước 3: So sánh: \(\max L = 18\) triệu đồng, đạt tại \(Q(3, 2)\).

> **Ghi nho**: Chỉ cần tính giá trị hàm mục tiêu tại các đỉnh, không cần xét các điểm trong.

---

## [kb_toan10_03] Hàm số bậc hai, Định lý dấu Tam thức & Ứng dụng Parabol
- **Phan loai**: Toán 10 * Chương 3: Hàm số bậc hai & Tam thức bậc hai
- **Tong quan**: Khảo sát đồ thị parabol, tọa độ đỉnh, định lý dấu tam thức bậc hai, định lý Viète và mô hình quỹ đạo parabol.

### Ly thuyet cot loi
### 1. Hàm số bậc hai & Đồ thị Parabol
Dạng tổng quát: \(y = ax^2 + bx + c\) (\(a \ne 0\)).
- Đỉnh \(I\left(-\frac{b}{2a}; -\frac{\Delta}{4a}\right)\).
- Trục đối xứng: \(x = -\frac{b}{2a}\).
- Nếu \(a > 0\): bề lõm hướng lên trên, hàm số đạt GTNN tại \(x = -\frac{b}{2a}\).
- Nếu \(a < 0\): bề lõm hướng xuống dưới, hàm số đạt GTLN tại \(x = -\frac{b}{2a}\).

### 2. Định lý dấu Tam thức bậc hai
Cho \(f(x) = ax^2 + bx + c\) (\(a \ne 0\)), biệt thức \(\Delta = b^2 - 4ac\):
- Nếu \(\Delta < 0\): \(f(x)\) cùng dấu với hệ số \(a\) với mọi \(x \in \mathbb{R}\).
- Nếu \(\Delta = 0\): \(f(x)\) cùng dấu với \(a\) với mọi \(x \ne -\frac{b}{2a}\).
- Nếu \(\Delta > 0\): \(f(x)\) có hai nghiệm phân biệt \(x_1 < x_2\). Trong khoảng hai nghiệm \((x_1; x_2)\) thì \(f(x)\) trái dấu với \(a\); ngoài khoảng hai nghiệm thì \(f(x)\) cùng dấu với \(a\) *(Trong trái - Ngoài cùng)*.

### He thong cong thuc trong tam
#### Tọa độ đỉnh Parabol
`\[x_I = -\frac{b}{2a}, \quad y_I = f(x_I) = -\frac{\Delta}{4a}\]`
*Điểm cực trị tuyệt đối của tam thức bậc hai*

#### Định lý Viète bậc hai
`\[x_1 + x_2 = -\frac{b}{a}, \quad x_1 x_2 = \frac{c}{a}\]`
*Mối liên hệ giữa nghiệm và hệ số của phương trình bậc hai*

#### Định lý dấu tam thức bậc hai & Điều kiện không đổi dấu
`\[f(x) = ax^2 + bx + c > 0, \forall x \in \mathbb{R} \iff \begin{cases} a > 0 \\ \Delta < 0 \end{cases}; \quad f(x) \ge 0, \forall x \in \mathbb{R} \iff \begin{cases} a > 0 \\ \Delta \le 0 \end{cases}\]`
*Điều kiện cần và đủ để tam thức bậc hai giữ nguyên dấu dương trên toàn trục số*

### Bay sai lam & Luu y dac biet
- Quên xét trường hợp hệ số a = 0 khi đề bài cho tham số ở hệ số bậc 2
- Nhầm lẫn giữa Delta < 0 và Delta <= 0 khi bất phương trình có dấu bằng

### Bai tap mau
#### Ví dụ 1: Quỹ đạo bắn cổng parabol
**De bai**: Cổng vòm trường đại học có dạng Parabol \(y = -0,5x^2 + 4x\) (đơn vị mét). Tìm chiều cao lớn nhất của cổng vòm và khoảng cách giữa hai chân cổng.

**Loi giai chi tiet**:
- Bước 1: Chân cổng là giao điểm với mặt đất \(y = 0\): \(-0,5x^2 + 4x = 0 \iff x(-0,5x + 4) = 0 \implies x_1 = 0, x_2 = 8\). Chiều rộng 2 chân là 8 mét.
- Bước 2: Trục đối xứng nằm ở trung điểm: \(x = 4\).
- Bước 3: Chiều cao cực đại: \(y(4) = -0,5(16) + 4(4) = -8 + 16 = 8\text{ m}\).

> **Ghi nho**: Tận dụng tính chất đối xứng của Parabol để tìm nhanh trung điểm và đỉnh.

---

## [kb_toan10_04] Hệ thức lượng trong tam giác, Vectơ và Công thức Shoelace
- **Phan loai**: Toán 10 * Chương 4: Hệ thức lượng & Vectơ
- **Tong quan**: Bộ công cụ định lý Cosin, Sin, 5 công thức tính diện tích tam giác, công thức trung tuyến, phân giác và tích vô hướng vectơ.

### Ly thuyet cot loi
### 1. Các định lý cốt lõi trong tam giác
- **Định lý Cosin**: \(a^2 = b^2 + c^2 - 2bc\cos A \implies \cos A = \frac{b^2 + c^2 - a^2}{2bc}\).
- **Định lý Sin**: \(\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R\).
- **Đường trung tuyến**: \(m_a^2 = \frac{2(b^2 + c^2) - a^2}{4}\).
- **Đường phân giác trong**: \(l_a = \frac{2bc\cos(A/2)}{b + c}\).

### 2. Bộ 5 Công thức tính Diện tích tam giác toàn diện
- \(S = \frac{1}{2} a h_a\) (chiều cao)
- \(S = \frac{1}{2} ab \sin C\) (hai cạnh và góc xen giữa)
- \(S = \frac{abc}{4R}\) (bán kính đường tròn ngoại tiếp R)
- \(S = pr\) (nửa chu vi \(p = \frac{a+b+c}{2}\) và bán kính nội tiếp r)
- \(S = \sqrt{p(p-a)(p-b)(p-c)}\) (Công thức Heron)

### 3. Tích vô hướng của hai vectơ
- Định nghĩa: \(\vec{u} \cdot \vec{v} = |\vec{u}| |\vec{v}| \cos(\vec{u}, \vec{v})\).
- Biểu thức tọa độ: \(\vec{u} = (x_1, y_1), \vec{v} = (x_2, y_2) \implies \vec{u} \cdot \vec{v} = x_1x_2 + y_1y_2\).
- Điều kiện vuông góc: \(\vec{u} \perp \vec{v} \iff \vec{u} \cdot \vec{v} = 0 \iff x_1x_2 + y_1y_2 = 0\).

### He thong cong thuc trong tam
#### Công thức Shoelace (Dây giày)
`\[S = \frac{1}{2} |(x_A y_B + x_B y_C + x_C y_A) - (y_A x_B + y_B x_C + y_C x_A)|\]`
*Tính diện tích đa giác khi biết tọa độ các đỉnh trong mặt phẳng*

#### Độ dài đường trung tuyến
`\[m_a^2 = \frac{2(b^2 + c^2) - a^2}{4}\]`
*Tính độ dài trung tuyến ứng với cạnh a của tam giác ABC*

#### Định lý hàm số Cosin & Hệ quả góc
`\[a^2 = b^2 + c^2 - 2bc\cos A, \quad \cos A = \frac{b^2 + c^2 - a^2}{2bc}\]`
*Tính cạnh và góc trong tam giác tổng quát khi biết hai cạnh và góc xen giữa*

#### Định lý hàm số Sin & Bán kính đường tròn ngoại tiếp
`\[\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C} = 2R\]`
*Mối liên hệ giữa cạnh, góc đối diện và bán kính đường tròn ngoại tiếp R*

#### 5 Công thức tính diện tích tam giác toàn diện
`\[S = \frac{1}{2}a h_a = \frac{1}{2}ab\sin C = \frac{abc}{4R} = pr = \sqrt{p(p-a)(p-b)(p-c)} \quad \left(p = \frac{a+b+c}{2}\right)\]`
*Bộ 5 công thức diện tích tam giác chuẩn: chiều cao, góc xen giữa, bán kính R, bán kính r và Heron*

#### Tích vô hướng hai vectơ & Công thức góc
`\[\vec{u} \cdot \vec{v} = |\vec{u}| |\vec{v}| \cos(\vec{u}, \vec{v}) = x_1 x_2 + y_1 y_2, \quad \vec{u} \perp \vec{v} \iff x_1 x_2 + y_1 y_2 = 0\]`
*Định nghĩa hình học và tọa độ của tích vô hướng, điều kiện hai vectơ vuông góc*

### Bay sai lam & Luu y dac biet
- Nhầm lẫn dấu trừ trong định lý Cosin thành dấu cộng (a^2 = b^2 + c^2 - 2bc cos A)
- Quên chia 2 trong công thức tính bán kính đường tròn ngoại tiếp R (a / sin A = 2R chứ không phải R)

### Bai tap mau
#### Ví dụ 1: Tính diện tích tam giác qua Shoelace
**De bai**: Trong mặt phẳng tọa độ Oxy, cho tam giác ABC với \(A(1, 2), B(4, 6), C(7, 1)\). Tính diện tích tam giác ABC.

**Loi giai chi tiet**:
- Bước 1: Áp dụng định thức Dây giày Shoelace:
- Bước 2: Cột x: (1, 4, 7, 1), Cột y: (2, 6, 1, 2).
- Bước 3: Tổng tích xuôi: \(1(6) + 4(1) + 7(2) = 6 + 4 + 14 = 24\).
- Bước 4: Tổng tích ngược: \(2(4) + 6(7) + 1(1) = 8 + 42 + 1 = 51\).
- Bước 5: \(S = \frac{1}{2} |24 - 51| = \frac{27}{2} = 13,5\).

> **Ghi nho**: Công thức Shoelace giúp giải bài toán diện tích siêu tốc trong đề thi TSA/HSA mà không cần lập phương trình cạnh hay đường cao.

---

## [kb_toan10_05] Thống kê mô tả & Xác suất cổ điển
- **Phan loai**: Toán 10 * Chương 5: Thống kê & Xác suất cổ điển
- **Tong quan**: Đại lượng đo xu thế trung tâm, đo độ phân tán, tiêu chuẩn nhận diện giá trị ngoại lệ và quy tắc xác suất Laplace.

### Ly thuyet cot loi
### 1. Số đặc trưng đo xu thế trung tâm
- **Số trung bình**: \(\bar{x} = \frac{1}{n}\sum_{i=1}^k n_i x_i\).
- **Trung vị (Median)**: Giá trị chia mẫu số liệu đã sắp xếp thành hai phần bằng nhau.
- **Tứ phân vị**: \(Q_1, Q_2 (=M_e), Q_3\). Khoảng tứ phân vị: \(\Delta_Q = Q_3 - Q_1\).
- **Nhận diện giá trị ngoại lệ**: Giá trị \(x\) là ngoại lệ nếu \(x < Q_1 - 1,5\Delta_Q\) hoặc \(x > Q_3 + 1,5\Delta_Q\).

### 2. Số đặc trưng đo mức độ phân tán
- **Phương sai**: \(s^2 = \frac{1}{n}\sum (x_i - \bar{x})^2 = \frac{1}{n}\sum x_i^2 - (\bar{x})^2\).
- **Độ lệch chuẩn**: \(s = \sqrt{s^2}\). Độ lệch chuẩn càng nhỏ thì dữ liệu càng đồng đều và ổn định.

### He thong cong thuc trong tam
#### Công thức tính nhanh phương sai
`\[s^2 = \overline{x^2} - (\bar{x})^2\]`
*Phương sai bằng trung bình bình phương trừ bình phương trung bình*

#### Xác suất cổ điển Laplace
`\[P(A) = \frac{n(A)}{n(\Omega)} = \frac{|A|}{|\Omega|}\]`
*Xác suất biến cố trong không gian mẫu đồng khả năng*

#### Khoảng biến thiên & Khoảng tứ phân vị (IQR)
`\[R = x_{\max} - x_{\min}, \quad \Delta_Q = Q_3 - Q_1 \quad (\text{Ngoại lệ: } x < Q_1 - 1,5\Delta_Q \lor x > Q_3 + 1,5\Delta_Q)\]`
*Đo độ phân tán của mẫu số liệu và tiêu chuẩn nhận diện giá trị ngoại lệ*

### Bay sai lam & Luu y dac biet
- Quên sắp xếp mẫu số liệu theo thứ tự không giảm trước khi tìm trung vị và các tứ phân vị
- Nhầm lẫn khoảng biến thiên R với khoảng tứ phân vị IQR

### Bai tap mau
#### Ví dụ 1: So sánh độ ổn định của hai dây chuyền
**De bai**: Dây chuyền 1 có độ lệch chuẩn khối lượng sản phẩm \(s_1 = 0,15\text{ g}\), dây chuyền 2 có \(s_2 = 0,42\text{ g}\). Dây chuyền nào hoạt động ổn định và kiểm soát chất lượng tốt hơn?

**Loi giai chi tiet**:
- Bước 1: Hiểu ý nghĩa độ lệch chuẩn: phản ánh mức độ biến động/phân tán xung quanh khối lượng chuẩn.
- Bước 2: Vì \(s_1 < s_2\) (\(0,15 < 0,42\)), sai số của dây chuyền 1 tập trung chặt chẽ hơn quanh giá trị trung bình.
- Bước 3: Kết luận: Dây chuyền 1 ổn định hơn dây chuyền 2.

> **Ghi nho**: Đề thi TSA/HSA thường kiểm tra năng lực hiểu bản chất số đo phân tán chứ không bắt bấm máy số phức tạp.

---

## [kb_toan11_01] Lượng giác toàn diện & Kỹ thuật chuyển đổi góc
- **Phan loai**: Toán 11 * Chương 1: Hàm số & Phương trình lượng giác
- **Tong quan**: Hệ thống công thức biến đổi lượng giác toàn tập, chu kỳ hàm số, cung liên kết, kỹ thuật góc chia đôi và phương pháp giải phương trình lượng giác thực chiến.

### Ly thuyet cot loi
### 1. Bảng giá trị đặc biệt và chu kỳ tuần hoàn
- \(y = \sin x, y = \cos x\) có tập xác định \(\mathbb{R}\), tập giá trị \([-1; 1]\), chu kỳ tuần hoàn \(T = 2\pi\).
- \(y = \tan x\) xác định khi \(x \ne \frac{\pi}{2} + k\pi\), tập giá trị \(\mathbb{R}\), chu kỳ tuần hoàn \(T = \pi\).
- \(y = \cot x\) xác định khi \(x \ne k\pi\), tập giá trị \(\mathbb{R}\), chu kỳ tuần hoàn \(T = \pi\).

### 2. Hệ thức lượng giác cơ bản & Cung liên kết
- **Hệ thức cơ bản**:
  - \(\sin^2 x + \cos^2 x = 1\)
  - \(1 + \tan^2 x = \frac{1}{\cos^2 x}\) \(\left(x \ne \frac{\pi}{2} + k\pi\right)\)
  - \(1 + \cot^2 x = \frac{1}{\sin^2 x}\) \((x \ne k\pi)\)
  - \(\tan x \cdot \cot x = 1\)
- **Cung liên kết** (Cos đối - Sin bù - Phụ chéo - Hơn kém \(\pi\)):
  - Cos đối: \(\cos(-x) = \cos x\); \(\sin(-x) = -\sin x\); \(\tan(-x) = -\tan x\).
  - Sin bù: \(\sin(\pi - x) = \sin x\); \(\cos(\pi - x) = -\cos x\); \(\tan(\pi - x) = -\tan x\).
  - Phụ chéo: \(\sin\left(\frac{\pi}{2} - x\right) = \cos x\); \(\cos\left(\frac{\pi}{2} - x\right) = \sin x\); \(\tan\left(\frac{\pi}{2} - x\right) = \cot x\).
  - Hơn kém \(\pi\): \(\tan(x + \pi) = \tan x\); \(\sin(x + \pi) = -\sin x\); \(\cos(x + \pi) = -\cos x\).

### 3. Công thức cộng lượng giác (Addition Formulas)
- \(\sin(a \pm b) = \sin a \cos b \pm \cos a \sin b\).
- \(\cos(a \pm b) = \cos a \cos b \mp \sin a \sin b\) *(lưu ý dấu nghịch chiều)*.
- \(\tan(a \pm b) = \frac{\tan a \pm \tan b}{1 \mp \tan a \tan b}\).

### 4. Công thức nhân đôi, nhân ba & Hạ bậc
- **Nhân đôi**:
  - \(\sin 2a = 2\sin a \cos a\).
  - \(\cos 2a = \cos^2 a - \sin^2 a = 2\cos^2 a - 1 = 1 - 2\sin^2 a\).
  - \(\tan 2a = \frac{2\tan a}{1 - \tan^2 a}\).
- **Hạ bậc bậc hai**:
  - \(\cos^2 a = \frac{1 + \cos 2a}{2}\); \(\sin^2 a = \frac{1 - \cos 2a}{2}\); \(\tan^2 a = \frac{1 - \cos 2a}{1 + \cos 2a}\).
- **Nhân ba & Hạ bậc ba**:
  - \(\sin 3a = 3\sin a - 4\sin^3 a \implies \sin^3 a = \frac{3\sin a - \sin 3a}{4}\).
  - \(\cos 3a = 4\cos^3 a - 3\cos a \implies \cos^3 a = \frac{3\cos a + \cos 3a}{4}\).

### 5. Biến đổi Tích thành Tổng & Tổng thành Tích
- **Tích thành tổng**:
  - \(\cos a \cos b = \frac{1}{2}[\cos(a - b) + \cos(a + b)]\).
  - \(\sin a \sin b = \frac{1}{2}[\cos(a - b) - \cos(a + b)]\).
  - \(\sin a \cos b = \frac{1}{2}[\sin(a + b) + \sin(a - b)]\).
- **Tổng thành tích**:
  - \(\cos u + \cos v = 2\cos\frac{u + v}{2}\cos\frac{u - v}{2}\).
  - \(\cos u - \cos v = -2\sin\frac{u + v}{2}\sin\frac{u - v}{2}\).
  - \(\sin u \pm \sin v = 2\sin\frac{u \pm v}{2}\cos\frac{u \mp v}{2}\).

### 6. Kỹ thuật góc chia đôi (Weierstrass Substitution)
Đặt \(t = \tan\frac{x}{2}\) (với \(x \ne \pi + k2\pi\)):
\[\sin x = \frac{2t}{1 + t^2}, \quad \cos x = \frac{1 - t^2}{1 + t^2}, \quad \tan x = \frac{2t}{1 - t^2}\]

### 7. Phương trình lượng giác cơ bản & Dạng cổ điển
- \(\sin x = \sin\alpha \iff x = \alpha + k2\pi \lor x = \pi - \alpha + k2\pi\).
- \(\cos x = \cos\alpha \iff x = \pm\alpha + k2\pi\).
- \(\tan x = \tan\alpha \iff x = \alpha + k\pi\).
- \(a\sin x + b\cos x = c\): có nghiệm \(\iff a^2 + b^2 \ge c^2\).

### He thong cong thuc trong tam
#### Công thức Hạ bậc bậc hai
`\[\cos^2 x = \frac{1 + \cos 2x}{2}, \quad \sin^2 x = \frac{1 - \cos 2x}{2}\]`
*Biến đổi giảm bậc từ bậc 2 về bậc 1 phục vụ tính tích phân và giải phương trình*

#### Điều kiện có nghiệm pt thuần nhất bậc nhất
`\[a\sin x + b\cos x = c \iff a^2 + b^2 \ge c^2\]`
*Điều kiện cần và đủ để phương trình lượng giác tuyến tính có nghiệm*

#### Hệ thức lượng giác cơ bản & Tập xác định
`\[\sin^2 x + \cos^2 x = 1, \quad 1 + \tan^2 x = \frac{1}{\cos^2 x}, \quad 1 + \cot^2 x = \frac{1}{\sin^2 x}, \quad \tan x \cdot \cot x = 1\]`
*Mối liên hệ giữa các giá trị lượng giác của cùng một cung góc*

#### Công thức cộng lượng giác toàn diện
`\[\sin(a \pm b) = \sin a \cos b \pm \cos a \sin b, \quad \cos(a \pm b) = \cos a \cos b \mp \sin a \sin b, \quad \tan(a \pm b) = \frac{\tan a \pm \tan b}{1 \mp \tan a \tan b}\]`
*Biến đổi lượng giác của tổng và hiệu hai cung góc*

#### Công thức nhân đôi toàn diện (Double Angle)
`\[\sin 2a = 2\sin a \cos a, \quad \cos 2a = \cos^2 a - \sin^2 a = 2\cos^2 a - 1 = 1 - 2\sin^2 a, \quad \tan 2a = \frac{2\tan a}{1 - \tan^2 a}\]`
*Biểu diễn hàm lượng giác cung 2a theo cung a với 3 dạng biến đổi của cos(2a)*

#### Công thức nhân ba và hạ bậc bậc ba
`\[\sin 3a = 3\sin a - 4\sin^3 a, \quad \cos 3a = 4\cos^3 a - 3\cos a, \quad \sin^3 a = \frac{3\sin a - \sin 3a}{4}, \quad \cos^3 a = \frac{3\cos a + \cos 3a}{4}\]`
*Biến đổi nhân ba và hạ bậc ba phục vụ giải phương trình lượng giác nâng cao*

#### Công thức biến đổi tích thành tổng (Product-to-Sum)
`\[\cos a \cos b = \frac{1}{2}[\cos(a-b) + \cos(a+b)], \quad \sin a \sin b = \frac{1}{2}[\cos(a-b) - \cos(a+b)], \quad \sin a \cos b = \frac{1}{2}[\sin(a+b) + \sin(a-b)]\]`
*Biến đổi tích của hai hàm lượng giác thành tổng các hàm lượng giác đơn giản*

#### Công thức biến đổi tổng thành tích (Sum-to-Product)
`\[\cos u + \cos v = 2\cos\frac{u+v}{2}\cos\frac{u-v}{2}, \quad \cos u - \cos v = -2\sin\frac{u+v}{2}\sin\frac{u-v}{2}, \quad \sin u \pm \sin v = 2\sin\frac{u \pm v}{2}\cos\frac{u \mp v}{2}\]`
*Biến đổi tổng hiệu hai hàm lượng giác thành tích phục vụ giải phương trình tích*

#### Công thức góc chia đôi (Weierstrass Substitution)
`\[t = \tan\frac{x}{2} \implies \sin x = \frac{2t}{1 + t^2}, \quad \cos x = \frac{1 - t^2}{1 + t^2}, \quad \tan x = \frac{2t}{1 - t^2} \quad (x \ne \pi + k2\pi)\]`
*Hữu tỉ hóa toàn bộ hàm lượng giác theo biến t phục vụ phương trình và nguyên hàm*

#### Công thức tính nhanh đối xứng & Bậc cao
`\[\sin x \pm \cos x = \sqrt{2}\sin\left(x \pm \frac{\pi}{4}\right), \quad \sin^4 x + \cos^4 x = 1 - \frac{1}{2}\sin^2 2x, \quad \sin^6 x + \cos^6 x = 1 - \frac{3}{4}\sin^2 2x\]`
*Công thức rút gọn nhanh các biểu thức đối xứng sin và cos thường gặp trong đề thi*

#### Phương trình lượng giác cơ bản & Họ nghiệm
`\[\sin x = \sin\alpha \iff \left[\begin{aligned} x &= \alpha + k2\pi \\ x &= \pi - \alpha + k2\pi \end{aligned}\right., \quad \cos x = \cos\alpha \iff x = \pm\alpha + k2\pi, \quad \tan x = \tan\alpha \iff x = \alpha + k\pi\]`
*Công thức nghiệm chuẩn xác của các phương trình lượng giác cơ bản với k thuộc Z*

### Bay sai lam & Luu y dac biet
- Quên đặt điều kiện xác định cho tan(x) (x khác pi/2 + k*pi) và cot(x) (x khác k*pi)
- Sai lầm đổi dấu ở công thức cộng cos: cos(a+b) = cos(a)cos(b) - sin(a)sin(b) (phải là dấu trừ)
- Bình phương hai vế làm phát sinh nghiệm ngoại lai mà không kiểm tra lại hoặc đối chiếu điều kiện
- Nhầm lẫn chu kỳ họ nghiệm: sin và cos có chu kỳ k*2*pi, trong khi tan và cot có chu kỳ k*pi
- Lỗi trùng lặp hoặc sót điểm biểu diễn khi gộp các họ nghiệm trên đường tròn lượng giác

### Bai tap mau
#### Ví dụ 1: Tìm tham số m để phương trình có nghiệm
**De bai**: Tìm tất cả giá trị thực của tham số \(m\) để phương trình \(3\sin 2x + 4\cos 2x = 2m - 1\) có nghiệm.

**Loi giai chi tiet**:
- Bước 1: Nhận diện dạng phương trình: \(a\sin 2x + b\cos 2x = c\) với \(a = 3, b = 4, c = 2m - 1\).
- Bước 2: Điều kiện có nghiệm: \(a^2 + b^2 \ge c^2 \iff 3^2 + 4^2 \ge (2m - 1)^2\).
- Bước 3: Ta có \(25 \ge (2m - 1)^2 \iff -5 \le 2m - 1 \le 5 \iff -4 \le 2m \le 6 \iff -2 \le m \le 3\).

> **Ghi nho**: Áp dụng ngay điều kiện Cauchy-Schwarz/Buniacovsky cho biểu thức tuyến tính lượng giác.

---

## [kb_toan11_02] Dãy số, Cấp số & Mô hình Lãi kép Tài chính
- **Phan loai**: Toán 11 * Chương 2: Dãy số, Cấp số cộng & Cấp số nhân
- **Tong quan**: Công thức tổng quát, sai phân tuyến tính và ứng dụng bài toán gửi góp tiết kiệm, vay trả góp ngân hàng.

### Ly thuyet cot loi
### 1. Cấp số cộng (CSC)
- Định nghĩa: \(u_{n+1} = u_n + d\) (với \(d\) là công sai).
- Số hạng tổng quát: \(u_n = u_1 + (n - 1)d\).
- Tổng \(n\) số hạng đầu: \(S_n = \frac{n(u_1 + u_n)}{2} = \frac{n[2u_1 + (n - 1)d]}{2}\).
- Tính chất trung bình cộng: \(u_k = \frac{u_{k-1} + u_{k+1}}{2}\) \((k \ge 2)\).

### 2. Cấp số nhân (CSN)
- Định nghĩa: \(u_{n+1} = u_n \cdot q\) (với \(q\) là công bội).
- Số hạng tổng quát: \(u_n = u_1 \cdot q^{n - 1}\).
- Tổng \(n\) số hạng đầu (với \(q \ne 1\)): \(S_n = u_1 \frac{1 - q^n}{1 - q}\).
- Tổng CSN lùi vô hạn (\(|q| < 1\)): \(S = \frac{u_1}{1 - q}\).
- Tính chất trung bình nhân: \(u_k^2 = u_{k-1} \cdot u_{k+1}\) \((k \ge 2)\).

### He thong cong thuc trong tam
#### Công thức Vay trả góp định kỳ (Amortization)
`\[M = A \frac{r(1 + r)^n}{(1 + r)^n - 1}\]`
*Số tiền trả đều đặn M mỗi tháng khi vay A triệu đồng lãi suất r trong n tháng*

#### Tổng cấp số nhân lùi vô hạn
`\[S = \sum_{k=1}^\infty u_1 q^{k-1} = \frac{u_1}{1 - q} \quad (|q| < 1)\]`
*Hội tụ tổng vô hạn của cấp số nhân khi công bội trị tuyệt đối nhỏ hơn 1*

#### Cấp số cộng toàn diện (Arithmetic Progression)
`\[u_n = u_1 + (n-1)d, \quad S_n = \frac{n(u_1 + u_n)}{2} = \frac{n[2u_1 + (n-1)d]}{2}, \quad u_k = \frac{u_{k-1} + u_{k+1}}{2}\]`
*Số hạng tổng quát, tổng n số hạng đầu và tính chất trung bình cộng của cấp số cộng*

#### Cấp số nhân toàn diện (Geometric Progression)
`\[u_n = u_1 \cdot q^{n-1}, \quad S_n = u_1 \frac{1 - q^n}{1 - q} \; (q \ne 1), \quad u_k^2 = u_{k-1} \cdot u_{k+1}\]`
*Số hạng tổng quát, tổng n số hạng đầu và tính chất trung bình nhân của cấp số nhân*

### Bay sai lam & Luu y dac biet
- Nhầm lẫn công thức số hạng tổng quát của CSC (dùng n thay vì n-1)
- Áp dụng công thức tổng CSN lùi vô hạn khi |q| >= 1

### Bai tap mau
#### Ví dụ 1: Tính tiền vay mua nhà trả góp
**De bai**: Anh Nam vay ngân hàng 1 tỷ đồng với lãi suất 0,8%/tháng. Anh trả góp đều đặn hàng tháng trong 5 năm (60 tháng). Tính số tiền anh Nam phải trả mỗi tháng.

**Loi giai chi tiet**:
- Bước 1: Áp dụng công thức Amortization với \(A = 10^9\), \(r = 0,008\), \(n = 60\).
- Bước 2: Mẫu số: \((1 + 0,008)^{60} - 1 \approx 1,6122 - 1 = 0,6122\).
- Bước 3: Tử số: \(10^9 \times 0,008 \times 1,6122 = 12.897.600\).
- Bước 4: \(M = \frac{12.897.600}{0,6122} \approx 21.067.000\text{ VNĐ}\).

> **Ghi nho**: Nắm vững công thức trả góp đều đặn M = A * r(1+r)^n / ((1+r)^n - 1).

---

## [kb_toan11_03] Giới hạn dãy số, Giới hạn hàm số & Định lý Bolzano-Cauchy
- **Phan loai**: Toán 11 * Chương 3: Giới hạn & Hàm số liên tục
- **Tong quan**: Phương pháp nhân liên hợp khử dạng vô định 0/0, vô cùng trừ vô cùng và định lý giá trị trung gian Bolzano-Cauchy.

### Ly thuyet cot loi
### 1. Giới hạn cơ bản & Vô định
- Các dạng vô định kinh điển: \(\frac{0}{0}, \frac{\infty}{\infty}, \infty - \infty, 0 \cdot \infty\).
- Kỹ thuật nhân lượng liên hợp:
  - Bậc hai: \(a - b = \frac{a^2 - b^2}{a + b}\).
  - Bậc ba: \(a - b = \frac{a^3 - b^3}{a^2 + ab + b^2}\).
- Giới hạn then chốt:
  - \(\lim_{x \to 0} \frac{\sin x}{x} = 1\).
  - \(\lim_{x \to 0} \frac{e^x - 1}{x} = 1, \quad \lim_{x \to 0} \frac{\ln(1 + x)}{x} = 1\).

### 2. Định lý Bolzano-Cauchy (Giá trị trung gian)
Nếu hàm số \(y = f(x)\) liên tục trên đoạn \([a; b]\) và \(f(a) \cdot f(b) < 0\), thì tồn tại ít nhất một điểm \(c \in (a; b)\) sao cho \(f(c) = 0\).

### He thong cong thuc trong tam
#### Giới hạn lượng giác cơ bản
`\[\lim_{x \to 0} \frac{\sin x}{x} = 1, \quad \lim_{x \to 0} \frac{1 - \cos x}{x^2} = \frac{1}{2}\]`
*Giới hạn then chốt giải quyết các dạng vô định lượng giác 0/0*

#### Giới hạn số Euler e
`\[\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n = e, \quad \lim_{x \to 0} (1 + x)^{1/x} = e\]`
*Hằng số Euler e và giới hạn định nghĩa hàm số mũ tự nhiên*

#### Giới hạn hàm số mũ và logarit cơ bản
`\[\lim_{x \to 0} \frac{e^x - 1}{x} = 1, \quad \lim_{x \to 0} \frac{\ln(1 + x)}{x} = 1, \quad \lim_{x \to 0} \frac{(1+x)^\alpha - 1}{x} = \alpha\]`
*Hệ thống giới hạn hữu hạn cơ bản phục vụ giải nhanh dạng vô định 0/0*

### Bay sai lam & Luu y dac biet
- Áp dụng lim(sin x / x) = 1 khi x tiến ra vô cùng (kết quả đúng phải là 0)
- Quên nhân liên hợp bậc 3 đúng dạng hằng đẳng thức

### Bai tap mau
#### Ví dụ 1: Chứng minh phương trình có nghiệm
**De bai**: Chứng minh phương trình \(x^5 - 3x - 1 = 0\) có ít nhất 3 nghiệm thực phân biệt trên đoạn \([-2; 2]\).

**Loi giai chi tiet**:
- Bước 1: Đặt \(f(x) = x^5 - 3x - 1\), liên tục trên \(\mathbb{R}\).
- Bước 2: Tính các giá trị mốc: \(f(-2) = -27 < 0\), \(f(-1) = 1 > 0\), \(f(0) = -1 < 0\), \(f(2) = 25 > 0\).
- Bước 3: Tích dấu đổi chiều liên tiếp: \(f(-2)f(-1) < 0\), \(f(-1)f(0) < 0\), \(f(0)f(2) < 0\).
- Bước 4: Theo định lý Bolzano-Cauchy, tồn tại ít nhất 3 nghiệm thuộc \((-2; -1), (-1; 0), (0; 2)\).

> **Ghi nho**: Tìm các giá trị mốc sao cho tích giá trị hàm số trái dấu để khẳng định nghiệm.

---

## [kb_toan11_04] Đạo hàm, Tiếp tuyến & Mô hình Vận tốc - Gia tốc tức thời
- **Phan loai**: Toán 11 * Chương 4: Đạo hàm & Tiếp tuyến
- **Tong quan**: Định nghĩa đạo hàm qua giới hạn vi phân, quy tắc tính đạo hàm hàm hợp và ứng dụng tiếp tuyến trong đồ thị học.

### Ly thuyet cot loi
### 1. Ý nghĩa hình học & Phương trình tiếp tuyến
- Đạo hàm \(f'(x_0)\) là hệ số góc của tiếp tuyến tại điểm \(M(x_0; y_0)\).
- Phương trình tiếp tuyến: \(y = f'(x_0)(x - x_0) + y_0\).

### 2. Ý nghĩa vật lý
- Vận tốc tức thời: \(v(t) = s'(t)\).
- Gia tốc tức thời: \(a(t) = v'(t) = s''(t)\).

### 3. Đạo hàm hàm hợp (Chain Rule)
Nếu \(y = f(u)\) và \(u = u(x)\) thì \(y'_x = y'_u \cdot u'_x\).

### He thong cong thuc trong tam
#### Phương trình tiếp tuyến tại điểm
`\[y = f'(x_0)(x - x_0) + y_0\]`
*Phương trình tiếp tuyến của đồ thị hàm số y = f(x) tại tiếp điểm M(x0, y0)*

#### Đạo hàm hàm hợp (Chain Rule)
`\[y = f(u(x)) \implies y' = f'(u) \cdot u'(x)\]`
*Quy tắc dây chuyền tính đạo hàm của hàm hợp*

#### Bảng đạo hàm các hàm sơ cấp cơ bản
`\[(x^\alpha)' = \alpha x^{\alpha-1}, \quad (\sqrt{x})' = \frac{1}{2\sqrt{x}}, \quad (\sin x)' = \cos x, \quad (\cos x)' = -\sin x, \quad (\tan x)' = \frac{1}{\cos^2 x}\]`
*Quy tắc đạo hàm chuẩn của hàm lũy thừa, căn bậc hai và hàm lượng giác*

#### Công thức tính nhanh đạo hàm phân thức hữu tỉ
`\[\left(\frac{ax+b}{cx+d}\right)' = \frac{ad - bc}{(cx+d)^2}, \quad \left(\frac{ax^2+bx+c}{dx+e}\right)' = \frac{ad x^2 + 2ae x + (be - cd)}{(dx+e)^2}\]`
*Công thức định thức tính nhanh đạo hàm phân thức bậc 1/1 và bậc 2/1*

### Bay sai lam & Luu y dac biet
- Quên nhân thêm u'(x) khi tính đạo hàm hàm hợp
- Nhầm lẫn giữa tiếp tuyến 'tại điểm' và tiếp tuyến 'đi qua điểm'

### Bai tap mau
#### Ví dụ 1: Tìm gia tốc tức thời của vật thể
**De bai**: Một vật chuyển động theo phương trình \(s(t) = 2t^3 - 6t^2 + 15t\) (m, giây). Tìm gia tốc của vật tại thời điểm vận tốc triệt tiêu.

**Loi giai chi tiet**:
- Bước 1: Vận tốc tức thời: \(v(t) = s'(t) = 6t^2 - 12t + 15\).
- Bước 2: Tìm thời điểm vận tốc cực tiểu: \(a(t) = v'(t) = 12t - 12\).
- Bước 3: Vận tốc triệt tiêu khi \(6t^2 - 12t + 15 = 0\), phương trình vô nghiệm thực (luôn dương).
- Bước 4: Xét thời điểm vận tốc nhỏ nhất: \(t = 1\text{ s}\), khi đó gia tốc \(a(1) = 0\text{ m/s}^2\).

> **Ghi nho**: Vận tốc là đạo hàm bậc nhất của quãng đường, gia tốc là đạo hàm bậc hai.

---

## [kb_toan11_05] Xác suất có điều kiện, Biến cố độc lập, Bayes & Đại số tổ hợp
- **Phan loai**: Toán 11 * Chương 5: Xác suất & Đại số tổ hợp
- **Tong quan**: Công thức xác suất có điều kiện, định lý Bayes, hệ biến cố đầy đủ, công thức nhân xác suất và đại số tổ hợp nhị thức Newton.

### Ly thuyet cot loi
### 1. Đại số tổ hợp nền tảng
- Hoán vị: \(P_n = n!\).
- Chỉnh hợp (chọn và xếp thứ tự): \(A_n^k = \frac{n!}{(n-k)!}\).
- Tổ hợp (chọn không thứ tự): \(C_n^k = \frac{n!}{k!(n-k)!}\).
- Nhị thức Newton: \((a+b)^n = \sum_{k=0}^n C_n^k a^{n-k} b^k\).

### 2. Xác suất có điều kiện & Công thức nhân
- Xác suất có điều kiện của A khi biết B đã xảy ra: \(P(A|B) = \frac{P(A \cap B)}{P(B)}\).
- Công thức nhân: \(P(A \cap B) = P(B) \cdot P(A|B) = P(A) \cdot P(B|A)\).
- Nếu A và B độc lập: \(P(A \cap B) = P(A) \cdot P(B)\).

### 3. Công thức xác suất toàn phần & Định lý Bayes
Cho \(\{A_1, A_2, \dots, A_n\}\) là hệ biến cố đầy đủ:
- Xác suất toàn phần: \(P(B) = \sum_{i=1}^n P(A_i) \cdot P(B|A_i)\).
- Định lý Bayes: \(P(A_k|B) = \frac{P(A_k) \cdot P(B|A_k)}{P(B)}\).

### He thong cong thuc trong tam
#### Định lý Bayes
`\[P(A_i|B) = \frac{P(A_i)P(B|A_i)}{\sum_{j=1}^n P(A_j)P(B|A_j)}\]`
*Tính xác suất hậu nghiệm dựa trên thông tin quan sát mới*

#### Công thức nhân xác suất
`\[P(A \cap B) = P(A)P(B|A) = P(B)P(A|B)\]`
*Xác suất của giao hai biến cố có điều kiện*

#### Hoán vị, Chỉnh hợp, Tổ hợp & Nhị thức Newton
`\[P_n = n!, \quad A_n^k = \frac{n!}{(n-k)!}, \quad C_n^k = \frac{n!}{k!(n-k)!}, \quad (a+b)^n = \sum_{k=0}^n C_n^k a^{n-k} b^k\]`
*Các công thức đếm đại số tổ hợp nền tảng và khai triển nhị thức*

#### Công thức xác suất toàn phần (Total Probability)
`\[P(B) = \sum_{i=1}^n P(A_i) \cdot P(B|A_i) \quad (\{A_1, \dots, A_n\} \text{ là hệ đầy đủ})\]`
*Tính xác suất biên của biến cố thông qua phân rã điều kiện theo hệ đầy đủ*

### Bay sai lam & Luu y dac biet
- Nhầm lẫn giữa P(A|B) và P(B|A)
- Không nhận diện được hệ biến cố đầy đủ khi áp dụng công thức xác suất toàn phần

### Bai tap mau
#### Ví dụ 1: Bài toán chẩn đoán y khoa qua Bayes
**De bai**: Một căn bệnh hiếm có tỷ lệ nhiễm là 0,1% dân số. Xét nghiệm phát hiện bệnh có độ nhạy 99% (người bệnh xét nghiệm dương tính 99%) và độ đặc hiệu 95% (người không bệnh xét nghiệm âm tính 95%). Một người đi xét nghiệm nhận kết quả dương tính. Xác suất người này thực sự mắc bệnh là bao nhiêu?

**Loi giai chi tiet**:
- Bước 1: Gọi D là biến cố mắc bệnh: \(P(D) = 0,001\), \(P(\bar{D}) = 0,999\).
- Bước 2: Gọi T+ là kết quả dương tính: \(P(T+|D) = 0,99\), \(P(T+|\bar{D}) = 1 - 0,95 = 0,05\).
- Bước 3: Xác suất toàn phần ra dương tính: \(P(T+) = 0,001(0,99) + 0,999(0,05) = 0,00099 + 0,04995 = 0,05094\).
- Bước 4: Áp dụng định lý Bayes: \(P(D|T+) = \frac{0,00099}{0,05094} \approx 1,94\%\).

> **Ghi nho**: Mặc dù xét nghiệm có độ chính xác 99%, xác suất người dương tính thực sự mắc bệnh chỉ ~2% do bệnh quá hiếm (nghịch lý tỷ lệ nền - Base Rate Fallacy).

---

## [kb_toan12_01] Khảo sát hàm số, Cực trị & Tối ưu hóa Thực tế
- **Phan loai**: Toán 12 * Chương 1: Ứng dụng đạo hàm để khảo sát hàm số
- **Tong quan**: Khảo sát tính đơn điệu, cực trị hàm đa thức bậc 3, bậc 4 trùng phương, tiệm cận đồ thị và giải quyết bài toán tối ưu hóa ứng dụng thực tế.

### Ly thuyet cot loi
### 1. Tính đơn điệu & Cực trị hàm số
- Hàm số \(y = f(x)\) đồng biến trên \(K \iff f'(x) \ge 0, \forall x \in K\) (dấu '=' chỉ xảy ra tại hữu hạn điểm).
- **Quy tắc cực trị 1**: Đổi dấu từ dương sang âm qua \(x_0\) là điểm cực đại; từ âm sang dương là điểm cực tiểu.
- **Quy tắc cực trị 2**: \(f'(x_0) = 0\) và \(f''(x_0) < 0 \implies x_0\) là cực đại; \(f''(x_0) > 0 \implies x_0\) là cực tiểu.

### 2. Công thức tính nhanh cực trị hàm bậc ba \(y = ax^3 + bx^2 + cx + d\)
- Đạo hàm: \(y' = 3ax^2 + 2bx + c\). Hàm số có 2 cực trị khi và chỉ khi \(b^2 - 3ac > 0\).
- Đường thẳng đi qua 2 điểm cực trị: \(y = \left(\frac{2c}{3} - \frac{2b^2}{9a}\right)x + \left(d - \frac{bc}{9a}\right)\).

### 3. Công thức tính nhanh cực trị hàm trùng phương \(y = ax^4 + bx^2 + c\)
- Có 3 cực trị \(\iff ab < 0\); Có 1 cực trị \(\iff ab \ge 0\).
- Tọa độ 3 cực trị khi \(ab < 0\): \(A(0; c), B\left(-\sqrt{-\frac{b}{2a}}; -\frac{\Delta}{4a}\right), C\left(\sqrt{-\frac{b}{2a}}; -\frac{\Delta}{4a}\right)\).
- Diện tích tam giác cực trị: \(S_{\triangle ABC} = \sqrt{-\frac{b^5}{32a^3}}\).

### He thong cong thuc trong tam
#### Bất đẳng thức AM-GM 3 số
`\[a + b + c \ge 3\sqrt[3]{abc} \quad (a, b, c \ge 0)\]`
*Áp dụng tìm giá trị nhỏ nhất của tổng hoặc giá trị lớn nhất của tích*

#### Điều kiện cực trị cấp 2
`\[f'(x_0) = 0, \; f''(x_0) > 0 \implies \text{Cực tiểu}; \quad f'(x_0) = 0, \; f''(x_0) < 0 \implies \text{Cực đại}\]`
*Tiêu chuẩn đạo hàm cấp 2 xác định nhanh điểm cực đại, cực tiểu*

#### Công thức tính nhanh cực trị hàm bậc 3
`\[y = ax^3 + bx^2 + cx + d \implies \text{Có 2 cực trị } \iff b^2 - 3ac > 0; \quad \text{Đường thẳng qua 2 cực trị: } y = \left(\frac{2c}{3} - \frac{2b^2}{9a}\right)x + \left(d - \frac{bc}{9a}\right)\]`
*Điều kiện có 2 cực trị và phương trình đường thẳng đi qua 2 điểm cực trị của hàm bậc 3*

#### Công thức tính nhanh cực trị hàm trùng phương
`\[y = ax^4 + bx^2 + c \implies \text{3 cực trị } \iff ab < 0; \quad \text{1 cực trị } \iff ab \ge 0; \quad S_{\triangle ABC} = \sqrt{-\frac{b^5}{32a^3}}\]`
*Điều kiện số lượng điểm cực trị và diện tích tam giác tạo bởi 3 điểm cực trị hàm trùng phương*

### Bay sai lam & Luu y dac biet
- Nhầm lẫn giữa 'Điểm cực trị của hàm số' (x) và 'Cực trị của hàm số' (y)
- Quên kiểm tra đạo hàm đổi dấu khi f'(x) = 0 có nghiệm bội chẵn

### Bai tap mau
#### Ví dụ 1: Tối ưu dung tích hộp không nắp
**De bai**: Từ một tấm tôn hình vuông cạnh 60 cm, người ta cắt bỏ 4 hình vuông bằng nhau ở 4 góc rồi gập mép lên để hàn thành một cái hộp chữ nhật không nắp. Tìm cạnh hình vuông bị cắt để thể tích hộp lớn nhất.

**Loi giai chi tiet**:
- Bước 1: Gọi cạnh hình vuông bị cắt là \(x\) (cm, \(0 < x < 30\)).
- Bước 2: Kích thước đáy: \(60 - 2x\), chiều cao: \(x\). Thể tích: \(V(x) = x(60 - 2x)^2 = 4x(30 - x)^2\).
- Bước 3: Dùng AM-GM: \(4x(30 - x)^2 = 2 \cdot (2x)(30 - x)(30 - x) \le 2 \cdot \left(\frac{2x + 30 - x + 30 - x}{3}\right)^3 = 2 \cdot 20^3 = 16.000\text{ cm}^3\).
- Bước 4: Dấu bằng khi \(2x = 30 - x \iff x = 10\text{ cm}\).

> **Ghi nho**: Kỹ thuật cân bằng hệ số trong AM-GM giúp tìm cực trị hình học nhanh chóng mà không cần đạo hàm.

---

## [kb_toan12_02] Hàm số Lũy thừa, Mũ & Logarit Thực chiến
- **Phan loai**: Toán 12 * Chương 2: Hàm số Lũy thừa, Mũ & Logarit
- **Tong quan**: Hệ thống quy tắc logarit toàn tập, phương trình mũ - logarit, đạo hàm, điều kiện xác định và mô hình tăng trưởng lũy thừa thực tế.

### Ly thuyet cot loi
### 1. Hệ thống quy tắc Logarit toàn diện
Điều kiện: \(a, b > 0, a \ne 1\), \(x, y > 0\):
- \(\log_a(xy) = \log_a x + \log_a y\)
- \(\log_a\left(\frac{x}{y}\right) = \log_a x - \log_a y\)
- \(\log_a(x^\alpha) = \alpha\log_a x\)
- \(\log_{a^\beta} x = \frac{1}{\beta}\log_a x\)
- **Đổi cơ số**: \(\log_a b = \frac{\log_c b}{\log_c a}\) \((c > 0, c \ne 1)\)
- **Đẳng thức mũ - logarit**: \(a^{\log_b c} = c^{\log_b a}\)

### 2. Đạo hàm hàm số Mũ và Logarit
- \((a^x)' = a^x \ln a\); \((e^x)' = e^x\); \((a^u)' = u' \cdot a^u \ln a\).
- \((\log_a |x|)' = \frac{1}{x \ln a}\); \((\ln |x|)' = \frac{1}{x}\); \((\ln |u|)' = \frac{u'}{u}\).

### 3. Phương trình & Bất phương trình Mũ - Logarit cơ bản
- \(a^x = b \iff x = \log_a b\) (với \(b > 0\)).
- \(\log_a x = b \iff x = a^b\).
- Bất phương trình \(\log_a f(x) > \log_a g(x)\):
  - Nếu \(a > 1\): \(f(x) > g(x) > 0\) (cùng chiều).
  - Nếu \(0 < a < 1\): \(0 < f(x) < g(x)\) (đổi chiều).

### He thong cong thuc trong tam
#### Chu kỳ bán rã phóng xạ
`\[N(t) = N_0 \cdot e^{-\lambda t} = N_0 \cdot 2^{-t/T}\]`
*Mô hình suy giảm mũ trong vật lý hạt nhân với chu kỳ bán rã T*

#### Đổi cơ số Logarit toàn diện
`\[\log_a b = \frac{\log_c b}{\log_c a}, \quad \log_{a^\alpha} b = \frac{1}{\alpha}\log_a b, \quad \log_a(b^\beta) = \beta\log_a b\]`
*Biến đổi cơ số logarit sang cơ số mới phục vụ giải phương trình*

#### Hệ thống hằng đẳng thức Logarit cốt lõi
`\[\log_a(xy) = \log_a x + \log_a y, \quad \log_a\left(\frac{x}{y}\right) = \log_a x - \log_a y, \quad a^{\log_b c} = c^{\log_b a} \; (a, b \ne 1; x, y, c > 0)\]`
*Các quy tắc biến đổi logarit của tích, thương, lũy thừa và hoán vị cơ số lũy thừa*

#### Đạo hàm hàm số Mũ và Logarit
`\[(a^x)' = a^x \ln a, \quad (e^x)' = e^x, \quad (\log_a |x|)' = \frac{1}{x \ln a}, \quad (\ln |x|)' = \frac{1}{x}\]`
*Quy tắc đạo hàm chuẩn xác của hàm mũ và hàm logarit với cơ số bất kỳ*

### Bay sai lam & Luu y dac biet
- Quên đặt điều kiện xác định cho biểu thức trong logarit (biểu thức phải thực sự > 0)
- Quên đổi chiều bất phương trình khi cơ số 0 < a < 1

### Bai tap mau
#### Ví dụ 1: Mô hình tăng trưởng vi khuẩn
**De bai**: Số lượng vi khuẩn sau \(t\) giờ tuân theo \(N(t) = 500 \cdot e^{0,4t}\). Sau bao lâu số lượng vi khuẩn đạt 10.000 con?

**Loi giai chi tiet**:
- Bước 1: Thiết lập phương trình: \(500 \cdot e^{0,4t} = 10.000\).
- Bước 2: Rút gọn: \(e^{0,4t} = 20\).
- Bước 3: Lấy logarit tự nhiên hai vế: \(0,4t = \ln 20 \implies t = \frac{\ln 20}{0,4} \approx \frac{2,9957}{0,4} \approx 7,49\text{ giờ}\).

> **Ghi nho**: Lấy logarit tự nhiên hai vế để hạ số mũ xuống tuyến tính.

---

## [kb_toan12_03] Tích phân toàn diện & Kỹ thuật Múa cột DI Method
- **Phan loai**: Toán 12 * Chương 3: Nguyên hàm, Tích phân & Ứng dụng
- **Tong quan**: Bảng nguyên hàm chuẩn 10 hàm cơ bản, tích phân từng phần (phương pháp sơ đồ múa cột DI), tính diện tích hình phẳng và thể tích khối tròn xoay.

### Ly thuyet cot loi
### 1. Bảng nguyên hàm cơ bản trọng tâm
- \(\int x^\alpha dx = \frac{x^{\alpha+1}}{\alpha+1} + C\) \((\alpha \ne -1)\)
- \(\int \frac{1}{x} dx = \ln|x| + C\)
- \(\int e^x dx = e^x + C\); \(\int a^x dx = \frac{a^x}{\ln a} + C\)
- \(\int \cos x dx = \sin x + C\); \(\int \sin x dx = -\cos x + C\)
- \(\int \frac{1}{\cos^2 x} dx = \tan x + C\); \(\int \frac{1}{\sin^2 x} dx = -\cot x + C\)

### 2. Tích phân từng phần & Phương pháp múa cột DI
- Công thức chuẩn: \(\int u dv = uv - \int v du\).
- **Phương pháp múa cột (D-I Method)**:
  - Cột D (Đạo hàm): Chọn hàm theo thứ tự 'Nhất lô, nhì đa, tam lượng, tứ mũ'. Đạo hàm đến 0 (nếu là đa thức) hoặc đến dòng lặp lại.
  - Cột I (Nguyên hàm): Lấy nguyên hàm liên tiếp.
  - Ghép tích đường chéo với dấu đan xen: \(+ - + - \dots\)

### 3. Ứng dụng hình học của Tích phân
- **Diện tích hình phẳng**: \(S = \int_a^b |f(x) - g(x)| dx\).
- **Thể tích khối tròn xoay quay quanh Ox**: \(V = \pi \int_a^b [f(x)]^2 dx\).

### He thong cong thuc trong tam
#### Công thức tích phân từng phần (Integration by Parts)
`\[\int_a^b u\,dv = uv\Big|_a^b - \int_a^b v\,du\]`
*Thứ tự ưu tiên đặt u: 'Nhất lô (logarit), nhì đa (đa thức), tam lượng (lượng giác), tứ mũ (hàm mũ)'*

#### Thể tích khối tròn xoay quanh Ox
`\[V = \pi \int_a^b [f(x)]^2\,dx\]`
*Thể tích vật thể tròn xoay khi quay hình phẳng giới hạn bởi y = f(x) quanh trục hoành*

#### Bảng nguyên hàm chuẩn 10 hàm cơ bản
`\[\int x^\alpha dx = \frac{x^{\alpha+1}}{\alpha+1} + C \; (\alpha \ne -1), \quad \int \frac{1}{x} dx = \ln|x| + C, \quad \int e^x dx = e^x + C, \quad \int \cos x dx = \sin x + C, \quad \int \sin x dx = -\cos x + C\]`
*Bảng các nguyên hàm sơ cấp nền tảng không thể thiếu trong mọi bài toán giải tích*

#### Diện tích hình phẳng giới hạn bởi đồ thị
`\[S = \int_a^b |f(x) - g(x)| dx\]`
*Ứng dụng hình học của tích phân xác định tính diện tích giữa hai đường cong cong*

### Bay sai lam & Luu y dac biet
- Quên nhân số pi trong công thức tính thể tích khối tròn xoay V = pi * tích phân (f(x))^2 dx
- Quên đóng dấu trị tuyệt đối khi tính diện tích hình phẳng có phần nằm dưới trục hoành

### Bai tap mau
#### Ví dụ 1: Tính tích phân từng phần bằng sơ đồ cột
**De bai**: Tính tích phân \(I = \int_0^1 (2x + 1)e^x\,dx\).

**Loi giai chi tiet**:
- Bước 1: Lập sơ đồ múa cột DI:
- Cột D: \(2x + 1 \to 2 \to 0\).
- Cột I: \(e^x \to e^x \to e^x\).
- Bước 2: Ghép đường chéo đan dấu:
- \(I = \left[(2x + 1)e^x - 2e^x\right]_0^1 = \left[(2x - 1)e^x\right]_0^1\).
- Bước 3: Thay cận: \((2 - 1)e^1 - (-1)e^0 = e + 1\).

> **Ghi nho**: Kỹ thuật múa cột giải quyết tích phân đa thức nhân mũ/lượng giác chỉ trong 10 giây.

---

## [kb_toan12_04] Phương pháp Tọa độ Không gian Oxyz Toàn diện
- **Phan loai**: Toán 12 * Chương 4: Phương pháp Tọa độ Không gian Oxyz
- **Tong quan**: Tích có hướng của 2 vectơ, phương trình mặt phẳng, phương trình đường thẳng, mặt cầu, khoảng cách 2 đường thẳng chéo nhau và bộ công thức khối tròn xoay.

### Ly thuyet cot loi
### 1. Tọa độ Vectơ & Tích có hướng
Cho \(\vec{u} = (x_1, y_1, z_1)\) và \(\vec{v} = (x_2, y_2, z_2)\):
- Tích vô hướng: \(\vec{u} \cdot \vec{v} = x_1x_2 + y_1y_2 + z_1z_2\).
- Tích có hướng: \([\vec{u}, \vec{v}] = (y_1z_2 - z_1y_2; z_1x_2 - x_1z_2; x_1y_2 - y_1x_2)\).
- Ứng dụng tích có hướng:
  - Diện tích tam giác: \(S_{\triangle ABC} = \frac{1}{2}|[\vec{AB}, \vec{AC}]|\).
  - Thể tích tứ diện: \(V_{ABCD} = \frac{1}{6}|[\vec{AB}, \vec{AC}] \cdot \vec{AD}|\).

### 2. Khoảng cách trong không gian Oxyz
- Khoảng cách từ điểm \(M_0(x_0, y_0, z_0)\) đến mặt phẳng \((P): Ax + By + Cz + D = 0\):
  \[d(M_0, (P)) = \frac{|Ax_0 + By_0 + Cz_0 + D|}{\sqrt{A^2 + B^2 + C^2}}\]
- Khoảng cách giữa 2 đường thẳng chéo nhau \(\Delta_1\) (qua \(M_1\), VTCP \(\vec{u}_1\)) và \(\Delta_2\) (qua \(M_2\), VTCP \(\vec{u}_2\)):
  \[d(\Delta_1, \Delta_2) = \frac{|[\vec{u}_1, \vec{u}_2] \cdot \vec{M_1 M_2}|}{|[\vec{u}_1, \vec{u}_2]|}\]

### 3. Mặt cầu & Khối tròn xoay
- Phương trình mặt cầu tâm \(I(a, b, c)\) bán kính \(R\):
  \((x - a)^2 + (y - b)^2 + (z - c)^2 = R^2\).
- Thể tích và diện tích các khối tròn xoay:
  - Nón: \(V = \frac{1}{3}\pi r^2 h\), \(S_{xq} = \pi r l\) (với \(l = \sqrt{r^2 + h^2}\)).
  - Trụ: \(V = \pi r^2 h\), \(S_{xq} = 2\pi r h\).
  - Cầu: \(V = \frac{4}{3}\pi R^3\), \(S = 4\pi R^2\).

### He thong cong thuc trong tam
#### Khoảng cách từ điểm đến mặt phẳng
`\[d(M_0, (P)) = \frac{|Ax_0 + By_0 + Cz_0 + D|}{\sqrt{A^2 + B^2 + C^2}}\]`
*Tính khoảng cách từ điểm M0(x0, y0, z0) đến mặt phẳng (P): Ax + By + Cz + D = 0*

#### Thể tích khối tứ diện (Oxyz)
`\[V_{ABCD} = \frac{1}{6}|[\vec{AB}, \vec{AC}] \cdot \vec{AD}|\]`
*Tính thể tích khối tứ diện thông qua tích có hướng và tích vô hướng hỗn tạp*

#### Tích có hướng của 2 vectơ & Ứng dụng Oxyz
`\[[\vec{u}, \vec{v}] = \left(y_1 z_2 - z_1 y_2; \; z_1 x_2 - x_1 z_2; \; x_1 y_2 - y_1 x_2\right), \quad S_{\triangle ABC} = \frac{1}{2}\left|[\vec{AB}, \vec{AC}]\right|\]`
*Công thức tọa độ tích có hướng hai vectơ và ứng dụng tính diện tích tam giác không gian*

#### Khoảng cách giữa hai đường thẳng chéo nhau
`\[d(\Delta_1, \Delta_2) = \frac{\left|[\vec{u}_1, \vec{u}_2] \cdot \vec{M_1 M_2}\right|}{\left|[\vec{u}_1, \vec{u}_2]\right|}\]`
*Tính khoảng cách ngắn nhất giữa hai đường thẳng chéo nhau trong không gian Oxyz*

#### Phương trình mặt cầu trong không gian Oxyz
`\[(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2 \iff x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0 \quad (R = \sqrt{a^2 + b^2 + c^2 - d} > 0)\]`
*Phương trình chính tắc và dạng tổng quát của mặt cầu tâm I(a,b,c) bán kính R*

#### Bộ công thức Thể tích & Diện tích các khối tròn xoay
`\[\text{Nón: } V = \frac{1}{3}\pi r^2 h, \; S_{xq} = \pi r l; \quad \text{Trụ: } V = \pi r^2 h, \; S_{xq} = 2\pi r h; \quad \text{Cầu: } V = \frac{4}{3}\pi R^3, \; S = 4\pi R^2\]`
*Toàn bộ công thức diện tích xung quanh, toàn phần và thể tích khối nón, khối trụ và mặt cầu*

### Bay sai lam & Luu y dac biet
- Quên đổi dấu tọa độ tâm mặt cầu khi đọc từ dạng tổng quát (chia hệ số cho -2)
- Nhầm lẫn giữa đường sinh l và chiều cao h của hình nón (l^2 = h^2 + r^2)

### Bai tap mau
#### Ví dụ 1: Tính khoảng cách từ điểm đến mặt phẳng
**De bai**: Trong không gian Oxyz, tính khoảng cách từ \(A(1, -2, 3)\) đến mặt phẳng \((P): 2x - 2y + z - 6 = 0\).

**Loi giai chi tiet**:
- Bước 1: Thay tọa độ điểm A vào vế trái phương trình mặt phẳng: \(2(1) - 2(-2) + 3 - 6 = 2 + 4 + 3 - 6 = 3\).
- Bước 2: Độ dài vectơ pháp tuyến: \(|\vec{n}| = \sqrt{2^2 + (-2)^2 + 1^2} = \sqrt{4 + 4 + 1} = 3\).
- Bước 3: Khoảng cách: \(d = \frac{|3|}{3} = 1\).

> **Ghi nho**: Ghi nhớ công thức khoảng cách chuẩn: thay tọa độ vào tử số lấy trị tuyệt đối, chia cho độ dài VTPT.

---

## [kb_toan12_05] Thống kê Mẫu Số liệu Ghép nhóm & Biến ngẫu nhiên
- **Phan loai**: Toán 12 * Chương 5: Xác suất & Thống kê nâng cao
- **Tong quan**: Bảng tần số ghép nhóm, số trung bình, trung vị, tứ phân vị ghép nhóm và phân phối xác suất của biến ngẫu nhiên rời rạc.

### Ly thuyet cot loi
### 1. Số đặc trưng mẫu số liệu ghép nhóm
- **Số trung bình**: \(\bar{x} = \frac{1}{n}\sum_{i=1}^k m_i c_i\) (với \(c_i\) là giá trị đại diện nửa tổng hai mút nhóm).
- **Tứ phân vị thứ nhất \(Q_1\)**: Thuộc nhóm \([u_m; u_{m+1})\) có tần số tích lũy đầu tiên \(\ge \frac{n}{4}\):
  \[Q_1 = u_m + \frac{\frac{n}{4} - C}{m_m} \cdot (u_{m+1} - u_m)\]
- **Trung vị (Tứ phân vị \(Q_2\))**: Thuộc nhóm có tần số tích lũy \(\ge \frac{n}{2}\).

### 2. Biến ngẫu nhiên rời rạc & Các tham số đặc trưng
Cho biến ngẫu nhiên rời rạc \(X\) nhận các giá trị \(x_1, x_2, \dots, x_k\) với xác suất tương ứng \(p_1, p_2, \dots, p_k\) (\(\sum p_i = 1\)):
- **Kỳ vọng (Giá trị trung bình)**: \(E(X) = \sum_{i=1}^k x_i p_i\).
- **Phương sai**: \(V(X) = E(X^2) - [E(X)]^2 = \sum_{i=1}^k (x_i - E(X))^2 p_i\).
- **Độ lệch chuẩn**: \(\sigma(X) = \sqrt{V(X)}\).

### He thong cong thuc trong tam
#### Công thức tứ phân vị ghép nhóm
`\[Q_p = u_m + \frac{p \cdot n - C}{m_m} \cdot h\]`
*Xác định tứ phân vị mẫu số liệu ghép nhóm bằng phép nội suy tuyến tính*

#### Kỳ vọng biến ngẫu nhiên
`\[E(X) = \sum_{i=1}^n x_i P(X = x_i)\]`
*Giá trị trung bình kỳ vọng lý thuyết của biến ngẫu nhiên rời rạc*

#### Phương sai & Độ lệch chuẩn của biến ngẫu nhiên rời rạc
`\[V(X) = E(X^2) - [E(X)]^2 = \sum_{i=1}^n (x_i - \mu)^2 p_i, \quad \sigma(X) = \sqrt{V(X)}\]`
*Đo lường mức độ phân tán rủi ro xung quanh giá trị trung bình kỳ vọng*

### Bay sai lam & Luu y dac biet
- Nhầm lẫn tần số tích lũy C của nhóm đứng trước với tần số m_m của nhóm đang xét
- Quên bình phương E(X) trong công thức tính phương sai V(X) = E(X^2) - [E(X)]^2

### Bai tap mau
#### Ví dụ 1: Tính kỳ vọng lợi nhuận dự án đầu tư
**De bai**: Một dự án đầu tư có xác suất thành công lớn là 40% (lợi nhuận 500 triệu), thành công vừa là 40% (lợi nhuận 200 triệu), thất bại là 20% (lỗ 100 triệu, ghi -100). Tính kỳ vọng lợi nhuận của dự án.

**Loi giai chi tiet**:
- Bước 1: Bảng phân bố xác suất: \(x_1 = 500, p_1 = 0,4\); \(x_2 = 200, p_2 = 0,4\); \(x_3 = -100, p_3 = 0,2\).
- Bước 2: Áp dụng công thức kỳ vọng: \(E(X) = 500(0,4) + 200(0,4) + (-100)(0,2)\).
- Bước 3: \(E(X) = 200 + 80 - 20 = 260\text{ triệu đồng}\).

> **Ghi nho**: Kỳ vọng lợi nhuận phản ánh giá trị bình quân của khoản đầu tư nếu lặp lại nhiều lần.

---

## [kb_dstt_01] Ma trận, Phép nhân & Ma trận Nghịch đảo
- **Phan loai**: Toán cao cấp * Chương 1: Ma trận & Các phép toán Ma trận
- **Tong quan**: Phép nhân ma trận không giao hoán, ma trận phụ hợp, thuật toán tìm ma trận nghịch đảo qua định thức và khử Gauss-Jordan.

### Ly thuyet cot loi
### 1. Phép nhân ma trận
Nếu ma trận \(A\) có kích thước \(m \times k\) và \(B\) có kích thước \(k \times n\), thì tích \(C = AB\) có kích thước \(m \times n\):
\(c_{ij} = \sum_{r=1}^k a_{ir} b_{rj}\).
Lưu ý quan trọng: Phép nhân ma trận **không có tính giao hoán** (\(AB \ne BA\) nói chung).

### 2. Ma trận nghịch đảo
Ma trận vuông \(A\) khả nghịch khi và chỉ khi \(\det(A) \ne 0\).
- **Công thức ma trận phụ hợp tổng quát**:
  \[A^{-1} = \frac{1}{\det(A)} C^T, \quad \text{trong đó } C_{ij} = (-1)^{i+j} M_{ij}\]
- **Trường hợp ma trận cấp 2**:
  \[\begin{pmatrix} a & b \\ c & d \end{pmatrix}^{-1} = \frac{1}{ad - bc} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}\]

### He thong cong thuc trong tam
#### Ma trận nghịch đảo cấp 2
`\[\begin{pmatrix} a & b \\ c & d \end{pmatrix}^{-1} = \frac{1}{ad - bc} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}\]`
*Công thức tính nghịch đảo siêu tốc cho ma trận 2x2*

#### Công thức ma trận phụ hợp và nghịch đảo tổng quát
`\[A^{-1} = \frac{1}{\det(A)} C^T \quad (\det(A) \ne 0, \; C_{ij} = (-1)^{i+j} M_{ij})\]`
*Nghịch đảo ma trận vuông cấp n thông qua ma trận phần bù đại số*

### Bay sai lam & Luu y dac biet
- Quên chuyển vị ma trận phần bù đại số C^T (ma trận phụ hợp adj(A) = C^T chứ không phải C)
- Nhầm lẫn thứ tự nhân ma trận: AB != BA

### Bai tap mau
#### Ví dụ 1: Tìm ma trận nghịch đảo cấp 2
**De bai**: Cho \(A = \begin{pmatrix} 2 & 1 \\ 5 & 3 \end{pmatrix}\). Tìm \(A^{-1}\).

**Loi giai chi tiet**:
- Bước 1: Tính định thức: \(\det(A) = 2(3) - 1(5) = 6 - 5 = 1 \ne 0\). Khả nghịch.
- Bước 2: Đổi chỗ đường chéo chính, đổi dấu đường chéo phụ: \(d = 3, a = 2\), \(b = -1, c = -5\).
- Bước 3: \(A^{-1} = \frac{1}{1} \begin{pmatrix} 3 & -1 \\ -5 & 2 \end{pmatrix} = \begin{pmatrix} 3 & -1 \\ -5 & 2 \end{pmatrix}\).

> **Ghi nho**: Ghi nhớ thần chú: Đổi vị trí chéo chính, đổi dấu chéo phụ, chia định thức.

---

## [kb_dstt_02] Định thức Ma trận & Định lý Cramer Giải Hệ Tuyến Tính
- **Phan loai**: Toán cao cấp * Chương 2: Định thức & Quy tắc Cramer
- **Tong quan**: Quy tắc Sarrus định thức cấp 3, tính chất biến đổi hàng sơ cấp, định thức tích và công thức nghiệm Cramer.

### Ly thuyet cot loi
### 1. Tính chất then chốt của định thức
- Đổi chỗ hai hàng (hoặc cột) thì định thức đổi dấu.
- Nhân một hàng với số thực \(k\) thì định thức nhân với \(k\).
- Cộng bội số của hàng này vào hàng khác thì định thức **không đổi**.
- Ma trận có hai hàng tỉ lệ thì \(\det = 0\).
- \(\det(AB) = \det(A) \cdot \det(B)\).
- \(\det(A^T) = \det(A)\); \(\det(kA) = k^n \det(A)\) (với \(A\) là ma trận vuông cấp \(n\)).

### 2. Định lý Cramer
Hệ gồm \(n\) phương trình, \(n\) ẩn \(AX = B\) có nghiệm duy nhất khi và chỉ khi \(D = \det(A) \ne 0\):
\(x_i = \frac{D_i}{D}\), trong đó \(D_i\) là định thức nhận được bằng cách thay cột thứ \(i\) bằng cột hệ số tự do \(B\).

### He thong cong thuc trong tam
#### Công thức nghiệm Cramer
`\[x_i = \frac{\det(A_i)}{\det(A)} = \frac{D_i}{D} \quad (D \ne 0)\]`
*Nghiệm tường minh của hệ phương trình vuông Cramer*

#### Tính chất của định thức ma trận vuông
`\[\det(AB) = \det(A)\det(B), \quad \det(A^T) = \det(A), \quad \det(kA) = k^n \det(A) \; (A \in \mathcal{M}_n), \quad \det(A^{-1}) = \frac{1}{\det(A)}\]`
*Các tính chất định lượng then chốt của định thức phục vụ rút gọn và tính toán*

### Bay sai lam & Luu y dac biet
- Nhầm det(kA) = k * det(A) thay vì k^n * det(A)
- Áp dụng Cramer khi số phương trình khác số ẩn hoặc khi định thức chính D = 0

### Bai tap mau
#### Ví dụ 1: Giải hệ Cramer trong mạch điện
**De bai**: Giải hệ dòng điện Kirchhoff: \(\begin{cases} 3I_1 + 2I_2 = 12 \\ 4I_1 - I_2 = 5 \end{cases}\) bằng định lý Cramer.

**Loi giai chi tiet**:
- Bước 1: Tính \(D = \begin{vmatrix} 3 & 2 \\ 4 & -1 \end{vmatrix} = 3(-1) - 2(4) = -3 - 8 = -11\).
- Bước 2: Thay cột 1 bằng hệ số tự do: \(D_1 = \begin{vmatrix} 12 & 2 \\ 5 & -1 \end{vmatrix} = 12(-1) - 2(5) = -22\).
- Bước 3: Thay cột 2 bằng hệ số tự do: \(D_2 = \begin{vmatrix} 3 & 12 \\ 4 & 5 \end{vmatrix} = 3(5) - 12(4) = 15 - 48 = -33\).
- Bước 4: Nghiệm: \(I_1 = \frac{D_1}{D} = \frac{-22}{-11} = 2\text{ A}\), \(I_2 = \frac{D_2}{D} = \frac{-33}{-11} = 3\text{ A}\).

> **Ghi nho**: Cramer cực kỳ tiện lợi cho hệ 2 hoặc 3 phương trình có chứa tham số.

---

## [kb_dstt_03] Thuật toán Khử Gauss & Mô hình Cân bằng Leontief
- **Phan loai**: Toán cao cấp * Chương 3: Hệ Phương trình Tuyến tính & Khử Gauss
- **Tong quan**: Đưa ma trận mở rộng về dạng bậc thang, định lý Kronecker-Capelli và mô hình phân tích Input-Output Leontief.

### Ly thuyet cot loi
### 1. Thuật toán Khử Gauss
- Lập ma trận bổ sung \(\tilde{A} = (A \mid B)\).
- Dùng 3 phép biến đổi hàng sơ cấp đưa \(\tilde{A}\) về ma trận bậc thang:
  1. Đổi chỗ 2 hàng.
  2. Nhân một hàng với số khác 0.
  3. Cộng vào một hàng một bội số của hàng khác.

### 2. Định lý Kronecker-Capelli
- Hệ có nghiệm khi và chỉ khi \(\text{rank}(A) = \text{rank}(\tilde{A})\).
- Nếu \(\text{rank} = n\) (số ẩn): Hệ có nghiệm duy nhất.
- Nếu \(\text{rank} < n\): Hệ có vô số nghiệm phụ thuộc \(n - \text{rank}\) ẩn tự do.

### He thong cong thuc trong tam
#### Mô hình Cân bằng Kinh tế Leontief
`\[X = (I - A)^{-1} D\]`
*Vector tổng sản lượng X cần sản xuất để đáp ứng nhu cầu cuối cùng D với ma trận chi phí đầu vào A*

### Bay sai lam & Luu y dac biet
- Nhầm lẫn giữa ma trận hệ số A và ma trận mở rộng A-ngã khi đếm rank
- Quên ma trận đơn vị I khi giải phương trình Leontief (I - A)X = D

### Bai tap mau
#### Ví dụ 1: Tìm hạng ma trận bậc thang
**De bai**: Cho ma trận \(A = \begin{pmatrix} 1 & 2 & 3 \\ 0 & 1 & 4 \\ 0 & 0 & m - 2 \end{pmatrix}\). Tìm \(m\) để ma trận có hạng bằng 2.

**Loi giai chi tiet**:
- Bước 1: Ma trận đã có dạng bậc thang.
- Bước 2: Hạng của ma trận bậc thang bằng số hàng khác 0.
- Bước 3: Để \(\text{rank}(A) = 2\), hàng thứ 3 phải là hàng toàn số 0: \(m - 2 = 0 \iff m = 2\).

> **Ghi nho**: Biến đổi Gauss là công cụ mạnh nhất và ổn định số học nhất để tính hạng ma trận.

---

## [kb_dstt_04] Không gian Vectơ, Trị riêng & Vectơ riêng (Eigenvalues)
- **Phan loai**: Toán cao cấp * Chương 4: Không gian Vectơ, Cơ sở & Trị riêng
- **Tong quan**: Độc lập tuyến tính, chiều không gian, đa thức đặc trưng và ý nghĩa của giá trị riêng trong ma trận ổn định.

### Ly thuyet cot loi
### 1. Độc lập và Phụ thuộc tuyến tính
Hệ vectơ \(\{v_1, v_2, \dots, v_k\}\) độc lập tuyến tính khi và chỉ khi:
\(c_1 v_1 + c_2 v_2 + \dots + c_k v_k = 0 \implies c_1 = c_2 = \dots = c_k = 0\).

### 2. Trị riêng và Vectơ riêng
Số vô hướng \(\lambda\) là giá trị riêng của ma trận vuông \(A\) nếu tồn tại vectơ \(v \ne 0\) sao cho:
\(Av = \lambda v \iff (A - \lambda I)v = 0\).
Phương trình đặc trưng: \(\det(A - \lambda I) = 0\).

### He thong cong thuc trong tam
#### Phương trình đặc trưng Trị riêng
`\[\det(A - \lambda I) = 0\]`
*Phương trình đa thức xác định các giá trị riêng của ma trận A*

#### Vết và Định thức qua Trị riêng
`\[\text{tr}(A) = \sum_{i=1}^n \lambda_i, \quad \det(A) = \prod_{i=1}^n \lambda_i\]`
*Tổng và tích các giá trị riêng*

### Bay sai lam & Luu y dac biet
- Quên đổi dấu khi trừ lamda trên đường chéo chính det(A - lambda I)
- Tính sai nghiệm của đa thức đặc trưng bậc 3

### Bai tap mau
#### Ví dụ 1: Tìm trị riêng của ma trận cấp 2
**De bai**: Tìm các giá trị riêng của ma trận \(A = \begin{pmatrix} 4 & 2 \\ 1 & 3 \end{pmatrix}\).

**Loi giai chi tiet**:
- Bước 1: Phương trình đặc trưng: \(\det(A - \lambda I) = \begin{vmatrix} 4 - \lambda & 2 \\ 1 & 3 - \lambda \end{vmatrix} = 0\).
- Bước 2: Khai triển: \((4 - \lambda)(3 - \lambda) - 2 = \lambda^2 - 7\lambda + 12 - 2 = \lambda^2 - 7\lambda + 10 = 0\).
- Bước 3: Giải phương trình bậc hai: \(\lambda_1 = 5, \lambda_2 = 2\).
- Bước 4: Kiểm tra nhanh: Tổng \(5 + 2 = 7 = 4 + 3 = \text{tr}(A)\), Tích \(5 \times 2 = 10 = 4(3) - 2(1) = \det(A)\).

> **Ghi nho**: Luôn dùng vết (trace) và định thức (det) để kiểm tra nhanh kết quả trị riêng.

---

## [kb_dstt_05] Xích Markov Rời rạc & Bài toán Cân bằng Thị phần
- **Phan loai**: Toán cao cấp * Chương 5: Xích Markov & Phân phối Dừng
- **Tong quan**: Ma trận chuyển trạng thái ngẫu nhiên và giải hệ phương trình tìm vectơ phân phối dừng cân bằng dài hạn.

### Ly thuyet cot loi
### 1. Ma trận chuyển trạng thái Markov
Một ma trận ngẫu nhiên theo cột \(P\) thỏa mãn:
- Các phần tử \(p_{ij} \ge 0\) (xác suất chuyển từ trạng thái \(j\) sang trạng thái \(i\)).
- Tổng các phần tử trên mỗi cột luôn bằng 1: \(\sum_i p_{ij} = 1\).

### 2. Trạng thái dừng cân bằng dài hạn
Vectơ xác suất \(\pi = (\pi_1, \pi_2, \dots, \pi_n)^T\) thỏa:
\(P\pi = \pi \iff (P - I)\pi = 0\) và \(\sum_{i=1}^n \pi_i = 1\).

### He thong cong thuc trong tam
#### Phương trình trạng thái dừng Markov
`\[(P - I)\pi = 0 \quad \text{kèm } \sum \pi_i = 1\]`
*Hệ phương trình xác định thị phần cân bằng ổn định dài hạn*

### Bay sai lam & Luu y dac biet
- Quên phương trình tổng các xác suất pi_1 + pi_2 + ... + pi_n = 1
- Xác định nhầm chiều chuyển trạng thái (theo hàng hay theo cột)

### Bai tap mau
#### Ví dụ 1: Thị phần taxi công nghệ
**De bai**: Hai hãng A và B có ma trận chuyển trạng thái khách hàng theo năm: \(P = \begin{pmatrix} 0,8 & 0,4 \\ 0,2 & 0,6 \end{pmatrix}\). Tìm thị phần ổn định của hãng A.

**Loi giai chi tiet**:
- Bước 1: Hệ dừng: \((0,8 - 1)\pi_A + 0,4\pi_B = 0 \iff -0,2\pi_A + 0,4\pi_B = 0 \iff \pi_A = 2\pi_B\).
- Bước 2: Ràng buộc tổng xác suất: \(\pi_A + \pi_B = 1\).
- Bước 3: Thay \(\pi_A = 2\pi_B\) vào: \(3\pi_B = 1 \implies \pi_B = 1/3 \approx 33,33\%\), \(\pi_A = 2/3 \approx 66,67\%\).

> **Ghi nho**: Đây là dạng câu hỏi xuất hiện liên tục trong các đề thi TSA ĐHBK Hà Nội những năm gần đây.

---

## [kb_gt1_01] Dãy số thực, Định lý Kẹp & Vô cùng bé Tương đương
- **Phan loai**: Giải tích 1 * Chương 1: Dãy số thực & Giới hạn
- **Tong quan**: Định nghĩa giới hạn dãy số, tiêu chuẩn Weierstrass đơn điệu bị chặn, định lý kẹp ba chàng ngự lâm và bảng thay thế vô cùng bé tương đương.

### Ly thuyet cot loi
### 1. Dãy số thực & Tiêu chuẩn Weierstrass
- Dãy số \((x_n)\) tăng và bị chặn trên thì có giới hạn hữu hạn: \(\lim x_n = \sup \{x_n\}\).
- Dãy số \((x_n)\) giảm và bị chặn dưới thì có giới hạn hữu hạn: \(\lim x_n = \inf \{x_n\}\).
- Định lý kẹp: Nếu \(y_n \le x_n \le z_n\) với mọi \(n\) và \(\lim y_n = \lim z_n = L\) thì \(\lim x_n = L\).

### 2. Bảng Vô cùng bé Tương đương chuẩn (khi \(x \to 0\))
- \(\sin x \sim x\); \(\tan x \sim x\); \(\arcsin x \sim x\); \(\arctan x \sim x\)
- \(\ln(1 + x) \sim x\); \(e^x - 1 \sim x\); \(a^x - 1 \sim x \ln a\)
- \(1 - \cos x \sim \frac{x^2}{2}\)
- \((1 + x)^\alpha - 1 \sim \alpha x\) (Đặc biệt: \(\sqrt{1 + x} - 1 \sim \frac{x}{2}\))

### He thong cong thuc trong tam
#### Vô cùng bé tương đương lượng giác
`\[\sin x \sim x, \quad \tan x \sim x, \quad \arcsin x \sim x, \quad \arctan x \sim x \quad (x \to 0)\]`
*Thay thế tương đương khi tính giới hạn các biểu thức lượng giác*

#### Bảng vô cùng bé tương đương chuẩn khi x dần về 0
`\[\sin x \sim x, \quad \tan x \sim x, \quad \ln(1+x) \sim x, \quad e^x - 1 \sim x, \quad 1 - \cos x \sim \frac{x^2}{2}, \quad (1+x)^\alpha - 1 \sim \alpha x\]`
*Bảng quy tắc thay thế vô cùng bé tương đương giải quyết nhanh giới hạn dạng 0/0*

### Bay sai lam & Luu y dac biet
- Thay thế vô cùng bé tương đương vào một hiệu (f(x) - g(x)) khi hai số hạng triệt tiêu nhau
- Áp dụng quy tắc tương đương khi x không dần về 0

### Bai tap mau
#### Ví dụ 1: Tính giới hạn bằng vô cùng bé tương đương
**De bai**: Tính giới hạn \(L = \lim_{x \to 0} \frac{\ln(1 + 3x) \cdot (e^{2x} - 1)}{1 - \cos 4x}\).

**Loi giai chi tiet**:
- Bước 1: Khi \(x \to 0\), ta có các vô cùng bé tương đương:
- Tử số: \(\ln(1 + 3x) \sim 3x\) và \(e^{2x} - 1 \sim 2x\). Do đó Tử số \(\sim 3x \cdot 2x = 6x^2\).
- Mẫu số: \(1 - \cos 4x \sim \frac{(4x)^2}{2} = 8x^2\).
- Bước 2: Thay vào biểu thức giới hạn: \(L = \lim_{x \to 0} \frac{6x^2}{8x^2} = \frac{6}{8} = \frac{3}{4}\).

> **Ghi nho**: Chỉ được thay vô cùng bé tương đương vào một tích hoặc một thương.

---

## [kb_gt1_02] Khai triển Taylor-Maclaurin, Đạo hàm Leibniz & Quy tắc L'Hôpital
- **Phan loai**: Giải tích 1 * Chương 2: Phép tính vi phân hàm một biến
- **Tong quan**: Đạo hàm cấp cao của tích bằng công thức Leibniz, khử dạng vô định bằng quy tắc L'Hôpital và xấp xỉ hàm số bằng đa thức Taylor-Maclaurin.

### Ly thuyet cot loi
### 1. Đạo hàm cấp cao & Công thức Leibniz
Cho hai hàm số \(u(x), v(x)\) có đạo hàm đến cấp \(n\):
\[(u \cdot v)^{(n)} = \sum_{k=0}^n C_n^k u^{(k)} v^{(n-k)}\]

### 2. Quy tắc L'Hôpital
Nếu \(\lim_{x \to x_0} f(x) = \lim_{x \to x_0} g(x) = 0\) (hoặc \(\pm\infty\)) và \(g'(x) \ne 0\) trong lân cận \(x_0\), thì:
\[\lim_{x \to x_0} \frac{f(x)}{g(x)} = \lim_{x \to x_0} \frac{f'(x)}{g'(x)}\]

### 3. Khai triển Maclaurin của các hàm sơ cấp cơ bản
- \(e^x = 1 + x + \frac{x^2}{2!} + \dots + \frac{x^n}{n!} + o(x^n)\)
- \(\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \dots + (-1)^n \frac{x^{2n+1}}{(2n+1)!} + o(x^{2n+2})\)
- \(\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \dots + (-1)^n \frac{x^{2n}}{(2n)!} + o(x^{2n+1})\)
- \(\ln(1 + x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \dots + (-1)^{n-1}\frac{x^n}{n} + o(x^n)\)

### He thong cong thuc trong tam
#### Công thức Leibniz đạo hàm cấp n của tích
`\[(uv)^{(n)} = \sum_{k=0}^n C_n^k u^{(k)} v^{(n-k)}\]`
*Tính đạo hàm cấp cao của tích hai hàm số khả vi n lần*

#### Khai triển Maclaurin của e^x
`\[e^x = \sum_{k=0}^n \frac{x^k}{k!} + o(x^n) = 1 + x + \frac{x^2}{2!} + \dots + \frac{x^n}{n!} + o(x^n)\]`
*Xấp xỉ đa thức của hàm mũ tại lân cận x = 0*

#### Quy tắc L'Hôpital khử dạng vô định 0/0 và vô cùng / vô cùng
`\[\lim_{x \to x_0} \frac{f(x)}{g(x)} = \lim_{x \to x_0} \frac{f'(x)}{g'(x)} \quad \left(\text{khi } \lim f(x) = \lim g(x) = 0 \text{ hoặc } \pm\infty\right)\]`
*Quy tắc lấy đạo hàm tử và mẫu khử dạng vô định của Bernoulli và L'Hôpital*

#### Bảng khai triển Maclaurin các hàm sơ cấp
`\[\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} + o(x^5), \quad \cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} + o(x^4), \quad \ln(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} + o(x^3)\]`
*Xấp xỉ đa thức Taylor tại lân cận x = 0 của các hàm lượng giác và logarit*

### Bay sai lam & Luu y dac biet
- Lạm dụng L'Hopital khi phân thức chưa phải là dạng vô định 0/0 hoặc vô cùng / vô cùng
- Quên số dư Peano o(x^n) khi khai triển Taylor bậc n

### Bai tap mau
#### Ví dụ 1: Tính đạo hàm cấp 10 bằng Leibniz
**De bai**: Tính đạo hàm cấp 10 của hàm số \(y = x^2 e^{2x}\).

**Loi giai chi tiet**:
- Bước 1: Chọn \(u = e^{2x}\) (đạo hàm cấp k là \(2^k e^{2x}\)) và \(v = x^2\) (đạo hàm cấp 1: 2x, cấp 2: 2, cấp >= 3: 0).
- Bước 2: Áp dụng công thức Leibniz, chỉ giữ lại k = 0, 1, 2:
- \(y^{(10)} = C_{10}^0 u^{(10)} v + C_{10}^1 u^{(9)} v' + C_{10}^2 u^{(8)} v''\).
- Bước 3: Thay số:
- \(y^{(10)} = 1(2^{10} e^{2x})(x^2) + 10(2^9 e^{2x})(2x) + 45(2^8 e^{2x})(2)\).
- Bước 4: Rút gọn: \(y^{(10)} = 2^8 e^{2x} (4x^2 + 20x + 90) = 2^9 e^{2x} (2x^2 + 10x + 45)\).

> **Ghi nho**: Chọn v là hàm đa thức để đạo hàm triệt tiêu nhanh chỉ sau vài bước.

---

## [kb_gt1_03] Tích phân Suy rộng Loại 1 & Loại 2 Toàn diện
- **Phan loai**: Giải tích 1 * Chương 3: Tích phân Suy rộng
- **Tong quan**: Tích phân với cận vô hạn (loại 1) và tích phân của hàm không bị chặn (loại 2), tiêu chuẩn so sánh hội tụ.

### Ly thuyet cot loi
### 1. Tích phân suy rộng loại 1 (Cận vô hạn)
\(\int_a^{+\infty} f(x)\,dx = \lim_{t \to +\infty} \int_a^t f(x)\,dx\).
Tích phân chuẩn Riemann:
\(\int_1^{+\infty} \frac{1}{x^\alpha}\,dx\) **hội tụ khi và chỉ khi \(\alpha > 1\)** (phân kỳ khi \(\alpha \le 1\)).

### 2. Tích phân suy rộng loại 2 (Hàm không bị chặn tại điểm kỳ dị)
Nếu \(f(x)\) gián đoạn vô cực tại \(x = b\):
\(\int_a^b f(x)\,dx = \lim_{\epsilon \to 0^+} \int_a^{b - \epsilon} f(x)\,dx\).
Tích phân chuẩn:
\(\int_0^1 \frac{1}{x^\alpha}\,dx\) **hội tụ khi và chỉ khi \(\alpha < 1\)**.

### He thong cong thuc trong tam
#### Tiêu chuẩn hội tụ Tích phân Riemann
`\[\int_1^{+\infty} \frac{dx}{x^\alpha} \text{ hội tụ } \iff \alpha > 1\]`
*Chuẩn mực so sánh kiểm tra hội tụ tích phân loại 1*

### Bay sai lam & Luu y dac biet
- Nhầm lẫn điều kiện hội tụ giữa loại 1 (alpha > 1) và loại 2 (alpha < 1)

### Bai tap mau
#### Ví dụ 1: Khảo sát sự hội tụ của tích phân
**De bai**: Khảo sát sự hội tụ của \(I = \int_1^{+\infty} \frac{x + 2}{\sqrt{x^5 + 3x}}\,dx\).

**Loi giai chi tiet**:
- Bước 1: Xét hàm dưới dấu tích phân khi \(x \to +\infty\):
- Tử số: \(x + 2 \sim x\). Mẫu số: \(\sqrt{x^5 + 3x} \sim x^{5/2}\).
- Bước 2: Vô cùng lớn tương đương: \(f(x) \sim \frac{x}{x^{5/2}} = \frac{1}{x^{3/2}}\).
- Bước 3: Vì \(\int_1^{+\infty} \frac{1}{x^{3/2}}\,dx\) hội tụ (do \(\alpha = 3/2 > 1\)), theo tiêu chuẩn so sánh giới hạn, tích phân \(I\) hội tụ.

> **Ghi nho**: Chỉ giữ lại bậc cao nhất ở cả tử và mẫu khi x tiến ra dương vô cùng.

---

## [kb_gt1_04] Chuỗi số Thực, Tiêu chuẩn D'Alembert & Bán kính Hội tụ
- **Phan loai**: Giải tích 1 * Chương 4: Chuỗi số & Chuỗi hàm
- **Tong quan**: Tiêu chuẩn hội tụ chuỗi số dương D'Alembert, Cauchy, chuỗi đan dấu Leibniz và bán kính hội tụ chuỗi lũy thừa.

### Ly thuyet cot loi
### 1. Chuỗi số dương & Tiêu chuẩn so sánh
- Điều kiện cần để chuỗi \(\sum u_n\) hội tụ: \(\lim_{n \to \infty} u_n = 0\).
- **Chuỗi điều hòa p-series**: \(\sum_{n=1}^\infty \frac{1}{n^p}\) hội tụ khi \(p > 1\), phân kỳ khi \(p \le 1\).

### 2. Tiêu chuẩn D'Alembert (Tỉ số)
Xét \(D = \lim_{n \to \infty} \frac{u_{n+1}}{u_n}\):
- Nếu \(D < 1\): Chuỗi hội tụ.
- Nếu \(D > 1\): Chuỗi phân kỳ.
- Nếu \(D = 1\): Chưa kết luận được (cần dùng tiêu chuẩn khác).

### 3. Bán kính hội tụ chuỗi lũy thừa
Chuỗi \(\sum_{n=0}^\infty a_n x^n\) có bán kính hội tụ \(R = \lim_{n \to \infty} \left|\frac{a_n}{a_{n+1}}\right|\).

### He thong cong thuc trong tam
#### Công thức Bán kính hội tụ D'Alembert
`\[R = \lim_{n \to \infty} \left|\frac{a_n}{a_{n+1}}\right|\]`
*Xác định khoảng hội tụ (-R, R) của chuỗi lũy thừa*

#### Chuỗi điều hòa p-series
`\[\sum_{n=1}^\infty \frac{1}{n^p} \text{ hội tụ } \iff p > 1\]`
*Chuẩn mực so sánh kiểm tra hội tụ chuỗi số*

### Bay sai lam & Luu y dac biet
- Quên kiểm tra sự hội tụ tại hai mút x = -R và x = R của khoảng hội tụ chuỗi lũy thừa
- Nhầm lẫn D = 1 là hội tụ (thực tế chưa kết luận được)

### Bai tap mau
#### Ví dụ 1: Tìm bán kính hội tụ của chuỗi lũy thừa
**De bai**: Tìm miền hội tụ của chuỗi lũy thừa \(\sum_{n=1}^\infty \frac{x^n}{n \cdot 3^n}\).

**Loi giai chi tiet**:
- Bước 1: Hệ số \(a_n = \frac{1}{n \cdot 3^n}\).
- Bước 2: Bán kính hội tụ: \(R = \lim_{n \to \infty} \frac{a_n}{a_{n+1}} = \lim_{n \to \infty} \frac{(n+1)3^{n+1}}{n 3^n} = 3 \lim \frac{n+1}{n} = 3\).
- Bước 3: Khoảng hội tụ: \((-3; 3)\).
- Bước 4: Xét hai đầu mút:
- - Tại \(x = 3\): Chuỗi trở thành \(\sum \frac{1}{n}\) (chuỗi điều hòa p = 1 phân kỳ).
- - Tại \(x = -3\): Chuỗi trở thành \(\sum \frac{(-1)^n}{n}\) (chuỗi đan dấu hội tụ theo Leibniz).
- Bước 5: Miền hội tụ: \([-3; 3)\).

> **Ghi nho**: Luôn luôn phải kiểm tra độc lập tại 2 đầu mút sau khi tìm được bán kính R.

---

## [kb_gt1_05] Phương trình Vi phân Tuyến tính & Phương trình Đặc trưng
- **Phan loai**: Giải tích 1 * Chương 5: Phương trình Vi phân
- **Tong quan**: Phương trình vi phân cấp 1 tách biến, tuyến tính và phương trình vi phân tuyến tính cấp 2 hệ số hằng qua phương trình đặc trưng.

### Ly thuyet cot loi
### 1. Phương trình vi phân tuyến tính cấp 1
Dạng: \(y' + p(x)y = q(x)\).
- Thừa số tích phân: \(I(x) = e^{\int p(x)dx}\).
- Nghiệm tổng quát: \(y = e^{-\int p(x)dx} \left[\int q(x)e^{\int p(x)dx}dx + C\right]\).

### 2. Phương trình vi phân tuyến tính cấp 2 hệ số hằng thuần nhất
Dạng: \(y'' + ay' + by = 0\).
- Phương trình đặc trưng: \(k^2 + ak + b = 0\).
  - \(\Delta > 0\) (2 nghiệm thực phân biệt \(k_1, k_2\)): \(y = C_1 e^{k_1 x} + C_2 e^{k_2 x}\).
  - \(\Delta = 0\) (nghiệm kép \(k\)): \(y = (C_1 + C_2 x)e^{kx}\).
  - \(\Delta < 0\) (nghiệm phức \(\alpha \pm i\beta\)): \(y = e^{\alpha x}(C_1 \cos\beta x + C_2 \sin\beta x)\).

### He thong cong thuc trong tam
#### Nghiệm phương trình vi phân tuyến tính cấp 1
`\[y = e^{-\int p(x)dx} \left(\int q(x)e^{\int p(x)dx}dx + C\right)\]`
*Công thức tích phân thừa số giải phương trình vi phân tuyến tính bậc nhất*

#### Phương trình đặc trưng cấp 2
`\[k^2 + ak + b = 0\]`
*Giải nghiệm đại số tìm nghiệm cơ bản của phương trình vi phân cấp 2*

### Bay sai lam & Luu y dac biet
- Quên dấu trừ trong mũ e^{-\int p(x)dx} khi viết công thức nghiệm tổng quát
- Nhầm lẫn giữa nghiệm kép (nhân thêm x) và hai nghiệm phân biệt

### Bai tap mau
#### Ví dụ 1: Giải phương trình vi phân cấp 2 dao động
**De bai**: Tìm nghiệm tổng quát của phương trình \(y'' - 4y' + 13y = 0\).

**Loi giai chi tiet**:
- Bước 1: Phương trình đặc trưng: \(k^2 - 4k + 13 = 0\).
- Bước 2: Biệt thức: \(\Delta' = 4 - 13 = -9 = (3i)^2\).
- Bước 3: Nghiệm phức: \(k_{1, 2} = 2 \pm 3i \implies \alpha = 2, \beta = 3\).
- Bước 4: Nghiệm tổng quát: \(y = e^{2x}(C_1 \cos 3x + C_2 \sin 3x)\) với \(C_1, C_2 \in \mathbb{R}\).

> **Ghi nho**: Nghiệm phức liên hợp mô tả dao động điều hòa suy giảm hoặc tăng dần.

