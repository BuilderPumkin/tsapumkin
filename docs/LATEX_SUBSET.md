# QUY CHUẨN TẬP CON LATEX TOÁN THPT (LATEX_SUBSET.md)

Tài liệu này định nghĩa tập con ngữ pháp LaTeX toán học THPT được hỗ trợ bởi bộ phân tích cú pháp tự viết (**Handcrafted Tokenizer & Pratt/Recursive Descent Parser**) của dịch vụ `pumkin-math-api`.
Hệ thống tuân thủ nghiêm ngặt **Quy chuẩn Học thuật PUMKIN (GEMINI.md)**: **TUYỆT ĐỐI KHÔNG SỬ DỤNG** `eval()`, `exec()`, `sympify()`, `parse_expr()`. Toàn bộ cây cú pháp SymPy AST được kiến tạo trực tiếp bằng các lớp khởi tạo của SymPy.

---

## 1. Giới hạn tài nguyên & An toàn bảo mật

Mọi biểu thức LaTeX đầu vào đều phải đi qua 3 tầng phòng thủ nghiêm ngặt trước khi phân tích cú pháp:

| Tiêu chí | Giới hạn tối đa | Mã lỗi khi vi phạm | Hành vi xử lý |
| :--- | :---: | :---: | :--- |
| **Độ dài chuỗi đầu vào** | 2000 ký tự | `RESOURCE_LIMIT_EXCEEDED` | Từ chối ngay tại Lexer, không cấp phát bộ nhớ |
| **Số lượng Token** | 500 tokens | `RESOURCE_LIMIT_EXCEEDED` | Ngắt vòng lặp Lexer khi chạm ngưỡng |
| **Độ sâu đệ quy lồng nhau** | 30 tầng | `RESOURCE_LIMIT_EXCEEDED` | Ngắt đệ quy Pratt, chống tràn ngăn xếp (Stack Overflow) |
| **Ký tự cấm / Null byte** | Null `\0`, ASCII < 32 | `INVALID_CHARACTER` | Chặn đứng tấn công byte độc |
| **Mã độc & Hàm thực thi** | Blacklist regex | `SECURITY_VIOLATION` | Chặn `__import__`, `eval`, `exec`, `os.`, `sys.`, `open(`, v.v. |

---

## 2. Ngữ pháp EBNF của tập con THPT v1

```ebnf
Expression         ::= ChainedRelation | ArithmeticExpr
ChainedRelation    ::= ArithmeticExpr ( RelationalOp ArithmeticExpr )+
RelationalOp       ::= "=" | "!=" | "<" | "<=" | ">" | ">=" | "\\le" | "\\leq" | "\\ge" | "\\geq" | "\\ne" | "\\neq"

ArithmeticExpr     ::= AdditiveExpr
AdditiveExpr       ::= MultiplicativeExpr ( ( "+" | "-" ) MultiplicativeExpr )*
MultiplicativeExpr ::= ImplicitMulExpr ( ( "*" | "/" | "\\cdot" | "\\times" ) ImplicitMulExpr )*
ImplicitMulExpr    ::= PrefixUnaryExpr ( PrefixUnaryExpr )*
PrefixUnaryExpr    ::= ( "+" | "-" )? PowerExpr

PowerExpr          ::= SubscriptExpr ( "^" ( "{" Expression "}" | Primary ) )?
SubscriptExpr      ::= PostfixExpr ( "_" ( "{" Expression "}" | Primary ) )?
PostfixExpr        ::= Primary ( "!" | "'" | "\\prime" )*

Primary            ::= Number
                     | Identifier
                     | ParenthesizedExpr
                     | AbsoluteValueExpr
                     | FractionExpr
                     | RadicalExpr
                     | MathFunctionExpr
                     | CalculusExpr
                     | CombinatoricsExpr
                     | VectorExpr

Number             ::= Integer | Decimal | VietnameseDecimal
VietnameseDecimal  ::= Digit+ ( "," | "{,}" ) Digit+
FractionExpr       ::= ( "\\frac" | "\\dfrac" | "\\tfrac" ) ( "{" Expression "}" "{" Expression "}" | Primary Primary )
RadicalExpr        ::= "\\sqrt" ( "[" Expression "]" )? ( "{" Expression "}" | Primary )
AbsoluteValueExpr  ::= "|" Expression "|" | "\\left|" Expression "\\right|"
CalculusExpr       ::= LimitExpr | IntegralExpr | SumExpr
LimitExpr          ::= "\\lim_" "{" Identifier ( "\\to" | "\\rightarrow" ) Expression "}" Expression
IntegralExpr       ::= "\\int" ( "_" ( "{" Expression "}" | Primary ) "^" ( "{" Expression "}" | Primary ) )? Expression ( "dx" | "dt" | "du" )?
SumExpr            ::= "\\sum_" "{" Identifier "=" Expression "}" "^" ( "{" Expression "}" | Primary ) Expression
```

---

## 3. Quy tắc giải quyết các trường hợp nhập nhằng ngữ nghĩa (Ambiguity Resolutions)

Theo chỉ đạo của Prompt 4, bộ phân tích cú pháp áp dụng các quy tắc tất định sau:

### 3.1. Phân thức không dùng ngoặc nhọn: `\frac12`
- **Quy tắc:** Khi sau `\frac`, `\dfrac`, `\tfrac` không có dấu ngoặc nhọn `{`, parser tự động lấy ký tự/token đơn đầu tiên làm tử số, và ký tự/token đơn kế tiếp làm mẫu số.
- **Ví dụ:**
  - `\frac12` $\implies \frac{1}{2}$ (`Rational(1, 2)`).
  - `\frac1{x}` $\implies \frac{1}{x}$.
  - `\frac{2x + 1}{x - 3}` $\implies \frac{2x + 1}{x - 3}$.

### 3.2. Ưu tiên lũy thừa so với nhân ngầm: `2x^2`
- **Quy tắc:** Lũy thừa (`^`) có độ ưu tiên cao hơn phép nhân ngầm (`PREC_EXP = 60` > `PREC_IMPLICIT_MUL = 40`).
- **Ví dụ:**
  - `2x^2` được dịch thành $2 \cdot (x^2)$ (`2 * x**2`).
  - Phân biệt với `(2x)^2` có dấu ngoặc $\implies (2x)^2 = 4x^2$.

### 3.3. Dấu trừ đơn ngôi và lũy thừa: `-x^2` so với `(-x)^2`
- **Quy tắc:** Dấu trừ đơn ngôi (`PREC_UNARY = 50`) có độ ưu tiên thấp hơn lũy thừa (`PREC_EXP = 60`), nhưng cao hơn phép cộng trừ nhị phân (`PREC_ADD = 20`).
- **Ví dụ:**
  - `-x^2` được dịch thành $-(x^2)$ (`-x**2`).
  - `(-x)^2` có dấu ngoặc đơn $\implies (-x)^2 = x^2$.

### 3.4. Phép chia liên tiếp kết hợp trái: `a/b/c`
- **Quy tắc:** Phép chia (`/`) là toán tử kết hợp trái (`left-associative`). Vế phải của phép chia được phân tích với mức ưu tiên `PREC_MUL + 1`.
- **Ví dụ:**
  - `a/b/c` $\implies ((a / b) / c) = \frac{a}{b \cdot c}$ (`a / (b * c)`).
  - Tự động sinh điều kiện xác định cho cả 2 mẫu số: $b \ne 0$ và $c \ne 0$.

### 3.5. Bóc tách đơn vị đo lường và số mũ đơn vị: `V = 2\pi\text{ m}^3`
- **Quy tắc:** Hậu tố đơn vị vật lý thường gặp trong đề thi THPT (`\text{ m}`, `\text{cm}`, `\text{ m}^3`, v.v.) được nhận diện và bóc tách tự động, lưu vào `metadata["stripped_unit"]` kèm cảnh báo `WARN_STRIPPED_PHYSICAL_UNIT`. Biểu thức toán học bên trong được bảo toàn nguyên vẹn.
- **Ví dụ:**
  - `V = 2\pi\text{ m}^3` $\implies$ biểu thức giải tích thuần túy là $V = 2\pi$.

### 3.6. Bất đẳng thức chuỗi và phương trình chuỗi: `0 < \alpha < \frac{\pi}{2}`
- **Quy tắc:** Khi gặp quan hệ liên tiếp, parser tự động kết hợp bằng phép hội logic SymPy `And(lhs < mid, mid < rhs)`.
- **Ví dụ:**
  - `0 < \alpha < \frac{\pi}{2}` $\implies (0 < \alpha) \land (\alpha < \frac{\pi}{2})$.
  - $\frac{x-1}{2} = \frac{y-2}{1} = \frac{z-3}{2} \implies \left(\frac{x-1}{2} = \frac{y-2}{1}\right) \land \left(\frac{y-2}{1} = \frac{z-3}{2}\right)$.

### 3.7. Nhãn hình học đầu dòng: `d_1: ...`, `(P): ...`
- **Quy tắc:** Các định danh hình học đặt trước dấu hai chấm (`d_1:`, `d:`, `(P):`, `(S):`) được nhận diện là nhãn đối tượng, bóc tách lưu vào `metadata["stripped_label"]` kèm cảnh báo `WARN_STRIPPED_LABEL_PREFIX`, để tập trung giải phương trình cốt lõi.

### 3.8. Các trường hợp nhập nhằng ngữ nghĩa mở rộng (Prompt 4 - Item 7):
- `\sin 2x`: Được hiểu là $\sin(2x)$ thay vì $\sin(2) \cdot x$. Phát cảnh báo `WARN_AMBIGUOUS_TRIG_ARGUMENT`.
- `\ln x^2`: Được hiểu là $\ln(x^2)$ thay vì $(\ln x)^2$. Phát cảnh báo `WARN_AMBIGUOUS_LOG_ARGUMENT`.
- `\log_2 x + 1`: Được hiểu là $(\log_2 x) + 1$ thay vì $\log_2(x + 1)$. Phát cảnh báo `WARN_AMBIGUOUS_LOG_SCOPE`.
- `\sin x\cos x`: Được hiểu là $\sin(x) \cdot \cos(x)$ qua cơ chế nhân ngầm.
- `f(x)`: Ký hiệu chữ cái $f, g, h, P, Q, u, v$ theo sau bởi ngoặc đơn được khởi tạo thành `sympy.Function(name)(arg)` thay vì phép nhân ngầm $f \cdot (x)$, kèm cảnh báo `WARN_IMPLICIT_FUNCTION_CALL`.
- `dx` trong tích phân: Được nhận diện là vi phân tích phân $\int f(x)dx$ và bóc tách tự động, biến tích phân được suy ra từ $dx$.
- Hằng số $e$: Được nhận diện là cơ số tự nhiên Euler `sympy.E`.
- Dấu phẩy thập phân kiểu Việt: `1,5` hoặc `1{,}5` được chuyển đổi chuẩn xác sang `1.5` (`Rational(3, 2)`), phát cảnh báo `WARN_DECIMAL_COMMA_USED`. Phân biệt rõ với danh sách tọa độ `(1, 5)` hoặc `(1; 5)` (từ chối an toàn ở v1).
- Dấu chấm phân cách hàng nghìn kiểu Việt: `1.000.000` được chuyển đổi thành `1000000`, phát cảnh báo `WARN_THOUSANDS_SEPARATOR_USED`.
- `2^x y`: Được hiểu là $(2^x) \cdot y$ chứ không phải $2^{xy}$, phát cảnh báo `WARN_POWER_IMPLICIT_MUL`.
- `\frac12x`: Phân số không ngoặc theo sau bởi biến được hiểu là $(\frac{1}{2}) \cdot x$ thay vì $\frac{1}{2x}$, phát cảnh báo `WARN_AMBIGUOUS_FRACTION_MULTIPLICATION`.
- Ký hiệu xấp xỉ `\approx`: **BẮT BUỘC TỪ CHỐI** với mã lỗi `UNSUPPORTED_SYNTAX`, lý do: "Ký hiệu xấp xỉ '\\approx' không phải là đẳng thức chính xác trong toán học hình thức THPT."

---

## 4. Bảng ánh xạ Điều kiện xác định toán học bắt buộc (GEMINI.md)

Mỗi khi dịch một cấu trúc toán học, bộ parser tự động kiểm tra và trích xuất danh sách điều kiện xác định toán học (`constraints`):

| Cấu trúc toán học | Điều kiện xác định | Phân loại (`ConstraintType`) | Thông điệp sư phạm tiếng Việt |
| :--- | :--- | :--- | :--- |
| **Phân thức** $\frac{u(x)}{v(x)}$ | $v(x) \ne 0$ | `DENOMINATOR_NONZERO` | Mẫu thức \(v(x)\) phải khác 0 |
| **Căn thức chẵn** $\sqrt{f(x)}$ hoặc $\sqrt[2n]{f(x)}$ | $f(x) \ge 0$ | `EVEN_ROOT_NONNEGATIVE` | Biểu thức dưới dấu căn \(f(x)\) phải không âm (\(\ge 0\)) |
| **Căn thức lẻ** $\sqrt[3]{f(x)}$ | *Không có* | *Không áp dụng* | Xác định trên toàn miền $\mathbb{R}$ |
| **Logarit tự nhiên** $\ln(f(x))$ | $f(x) > 0$ | `LOG_ARGUMENT_POSITIVE` | Biểu thức lấy logarit \(f(x)\) phải dương (> 0) |
| **Logarit cơ số biến** $\log_{a(x)}(b(x))$ | $b(x) > 0$<br>$a(x) > 0$<br>$a(x) \ne 1$ | `LOG_ARGUMENT_POSITIVE`<br>`LOG_BASE_POSITIVE`<br>`LOG_BASE_NOT_ONE` | Biểu thức lấy logarit phải dương<br>Cơ số logarit phải dương và khác 1 |
| **Hàm tang** $\tan(u(x))$ | $\cos(u(x)) \ne 0$ | `TAN_DOMAIN` | Hàm tang xác định khi \(\cos(u(x)) \ne 0\) |
| **Hàm cotang** $\cot(u(x))$ | $\sin(u(x)) \ne 0$ | `COT_DOMAIN` | Hàm cotang xác định khi \(\sin(u(x)) \ne 0\) |

---

## 5. Danh mục các cấu trúc KHÔNG hỗ trợ ở phiên bản v1 & Số chuỗi thật trong kho

Tuân thủ nguyên tắc **"TUYỆT ĐỐI không đoán khi gặp cấu trúc không hiểu"**, các cấu trúc sau được khảo sát chính xác từ kho câu hỏi chuẩn (`pumkin3/data/questions/all.json` gồm 553 câu, băm SHA256 `ced7e7ffe5038be54f8e4867a881962aa24dd843d9f1713a51d9ca4dab01d560`):

| Cấu trúc LaTeX | Số chuỗi thật trong kho | Mã lỗi trả về | Lý do chưa hỗ trợ ở v1 |
| :--- | :---: | :---: | :--- |
| **Tọa độ chấm phẩy / Khoảng** `(;)` | 161 | `SYNTAX_ERROR` | Tọa độ điểm $(x;y;z)$ hoặc khoảng nghiệm $[a;b)$ (không phải biểu thức vô hướng) |
| **Vô cực trong khoảng** `\infty` | 119 | `UNSUPPORTED_SYNTAX` | Ký hiệu vô cực trong khoảng nghiệm $(-\infty; +\infty)$ |
| **Cộng trừ** `\pm` | 58 | `UNSUPPORTED_SYNTAX` | Toán tử phân nhánh 2 nghiệm $x = \pm a$ |
| **Ma trận** `\begin{pmatrix}` / `\begin` | 57 | `UNSUPPORTED_SYNTAX` | Môi trường ma trận 2 chiều đại số tuyến tính |
| **Vector đoạn thẳng** `\vec{AB}` | 51 | `UNSUPPORTED_SYNTAX` | Vector xác định bởi hai điểm trong không gian Oxyz |
| **Xấp xỉ** `\approx` | 41 | `UNSUPPORTED_SYNTAX` | Giá trị làm tròn số thực, không phải đẳng thức chính xác |
| **Tổ hợp / Chỉnh hợp** $C_n^k, A_n^k$ | 29 | `UNSUPPORTED_SYNTAX` | Ký hiệu tổ hợp THPT Việt Nam (cần bộ phân tích ngữ cảnh) |
| **Hệ phương trình** `\begin{cases}` | 9 | `UNSUPPORTED_SYNTAX` | Hệ đa phương trình đồng thời |

### 5.1. Đề xuất kiến trúc xử lý cho v2 (KHÔNG triển khai ở v1):
1. **Vectơ (`\vec{u}`, `\vec{AB}`):** Xây dựng module `app/geometry/vector.py` với kiểu dữ liệu `Vector3D(x, y, z)` kế thừa `sympy.Matrix` (dạng cột $3 \times 1$), hỗ trợ tích có hướng $[\vec{u}, \vec{v}]$ và tích vô hướng $\vec{u} \cdot \vec{v}$.
2. **Ma trận (`\begin{pmatrix}`):** Xây dựng tokenizer nhận diện các dòng phân cách bởi `\\` và cột phân cách bởi `&`, chuyển đổi trực tiếp thành `sympy.Matrix([[...], [...]])`.
3. **Khoảng đoạn ($[a; b]$, $(a; b]$):** Sử dụng các lớp tập hợp SymPy `sympy.Interval(a, b, left_open=..., right_open=...)` để biểu diễn tập nghiệm và tập xác định.
4. **Tọa độ điểm ($(x; y; z)$ hoặc $(x, y, z)$):** Bổ sung parser cho `Point3D` và `Point2D`, phân biệt với biểu thức số học qua dấu mở ngoặc theo sau bởi tên điểm viết hoa $M(x; y; z)$.
5. **Tập hợp ($\{x_1, x_2, \dots\}$):** Parse thành `sympy.FiniteSet`.
6. **Tổ hợp $C_n^k, A_n^k$:** Nhận diện ký hiệu $C_n^k$ và $A_n^k$ của SGK Việt Nam, chuyển đổi thành `sympy.binomial(n, k)` và `sympy.factorial(n) / sympy.factorial(n - k)`.
7. **Hệ phương trình (`\begin{cases}`):** Parse từng dòng phương trình độc lập, lưu thành danh sách các quan hệ `list[sympy.Relational]` và giải bằng `sympy.solve()`.
8. **Dấu cộng trừ ($\pm$):** Phân nhánh cây cú pháp thành bộ đôi biểu thức `(expr_plus, expr_minus)`.
9. **Vô cực ($\infty$):** Ánh xạ sang `sympy.oo` (dương vô cực) và `-sympy.oo` (âm vô cực).

---

## 6. Kết quả đo lường thực tế trên Toàn bộ Ngân hàng câu hỏi PUMKIN

Báo cáo đo kiểm từ script chuẩn hóa `tools/extract_latex_corpus.py` chạy trên toàn bộ 553 câu hỏi của `pumkin3/data/questions/all.json`:

- **Tổng số lượt xuất hiện chuỗi LaTeX:** 3.206 lượt.
- **Tổng số chuỗi LaTeX duy nhất:** 2.259 chuỗi.
- **Tỷ lệ dịch thành công sang SymPy AST:** **72,33% trên chuỗi duy nhất (1.634 / 2.259)**; **76,67% trên tổng số lượt (2.458 / 3.206)**.
- **Tỷ lệ CÂU HỎI có toàn bộ chuỗi trong đề bài dịch được (Stem Parse Rate):** **75,77% (419 / 553 câu)**.

### Tỷ lệ dịch theo trường dữ liệu:
- `question_text` (Đề bài): **78,52%** (724 / 922 lượt)
- `options` (Phương án trắc nghiệm): **87,41%** (979 / 1.120 lượt)
- `explanation` (Lời giải chi tiết): **64,82%** (755 / 1.164 lượt - tập trung nhiều văn bản, bước giải logic `\iff`)

### Bảng Top 20 Nguyên nhân gốc gây từ chối (True Root Causes):

| Hạng | Nguyên nhân gốc (Root Cause) | Số lượt xuất hiện | Tỷ lệ lỗi (%) | Phân tích bản chất |
| :---: | :--- | :---: | :---: | :--- |
| 1 | `semicolon_coordinate_or_interval` | 168 | 22.46% | Tọa độ điểm hoặc khoảng nghiệm dùng dấu chấm phẩy `(x;y)` |
| 2 | `comma_list_or_coordinate_tuple` | 152 | 20.32% | Danh sách phương trình hoặc tọa độ `(x, y, z)` |
| 3 | `\iff` (Tương đương logic) | 78 | 10.43% | Bước biến đổi suy luận logic trong lời giải |
| 4 | `\implies` (Kéo theo logic) | 49 | 6.55% | Bước suy luận logic |
| 5 | `\cap` (Giao tập hợp) | 39 | 5.21% | Phép toán tập hợp nghiệm |
| 6 | `\begin` (Môi trường ma trận/hệ) | 36 | 4.81% | Bảng hoặc ma trận đại số tuyến tính |
| 7 | `\in` (Thuộc tập hợp) | 23 | 3.07% | Khẳng định phần tử thuộc tập hợp nghiệm |
| 8 | `\mathbb` (Tập số $\mathbb{R}$) | 19 | 2.54% | Tên tập hợp số thực / phức |
| 9 | `percentage_symbol_in_math` | 19 | 2.54% | Ký hiệu phần trăm trong bài toán kinh tế |
| 10 | `unclosed_pipe_delimiter` | 18 | 2.41% | Lỗi gõ thiếu dấu đóng giá trị tuyệt đối trong dữ liệu đề gốc |
| 11 | `\pm` (Cộng trừ $\pm$) | 17 | 2.27% | Dấu phân nhánh hai nghiệm $x = \pm a$ |
| 12 | `syntax_error: unexpected comma` | 11 | 1.47% | Dấu phẩy phân cách không phải phẩy số thập phân |
| 13 | `\det` (Định thức ma trận) | 10 | 1.34% | Định thức ma trận vuông (v2) |
| 14 | `\Rightarrow` | 9 | 1.20% | Mũi tên suy ra logic |
| 15 | `\Leftrightarrow` | 9 | 1.20% | Mũi tên tương đương logic |
| 16 | `\equiv` | 9 | 1.20% | Ký hiệu đồng dư thức hoặc đồng nhất thức |
| 17 | `\dots` | 7 | 0.94% | Dấu ba chấm quy luật vô hạn |
| 18 | `\cup` (Hợp tập hợp) | 5 | 0.67% | Phép hợp tập nghiệm |
| 19 | `\sim` | 5 | 0.67% | Ký hiệu phân phối xác suất |
| 20 | `syntax_error: unhandled token` | 4 | 0.53% | Ký tự cú pháp không hợp lệ |

