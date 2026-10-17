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
- **Quy tắc:** Hậu tố đơn vị vật lý thường gặp trong đề thi THPT (`\text{ m}`, `\text{cm}`, `\text{ m}^3`, v.v.) được nhận diện và bóc tách tự động, tránh làm sai lệch số mũ của biểu thức đại số đứng trước.
- **Ví dụ:**
  - `V = 2\pi\text{ m}^3` $\implies$ biểu thức giải tích thuần túy là $V = 2\pi$.

### 3.6. Bất đẳng thức chuỗi và phương trình chuỗi: `0 < \alpha < \frac{\pi}{2}`
- **Quy tắc:** Khi gặp quan hệ liên tiếp, parser tự động kết hợp bằng phép hội logic SymPy `And(lhs < mid, mid < rhs)`.
- **Ví dụ:**
  - `0 < \alpha < \frac{\pi}{2}` $\implies (0 < \alpha) \land (\alpha < \frac{\pi}{2})$.
  - $\frac{x-1}{2} = \frac{y-2}{1} = \frac{z-3}{2} \implies \left(\frac{x-1}{2} = \frac{y-2}{1}\right) \land \left(\frac{y-2}{1} = \frac{z-3}{2}\right)$.

### 3.7. Nhãn hình học đầu dòng: `d_1: ...`, `(P): ...`
- **Quy tắc:** Các định danh hình học đặt trước dấu hai chấm (`d_1:`, `d:`, `(P):`, `(S):`) được nhận diện là nhãn đối tượng và tự động bỏ qua để tập trung giải phương trình cốt lõi.

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

## 5. Danh mục các cấu trúc KHÔNG hỗ trợ ở phiên bản v1 & Lý do

Tuân thủ nguyên tắc **"TUYỆT ĐỐI không đoán khi gặp cấu trúc không hiểu"**, các cú pháp sau lập tức trả về `is_success = False` kèm mã lỗi và giải thích chi tiết:

1. **Ma trận & Môi trường bảng (`\begin{pmatrix}`, `\begin{matrix}`, `\begin{aligned}`):**
   - *Lý do:* Chuyên đề ma trận / hệ phương trình đại số tuyến tính chưa cam kết giải ở v1 (đã thống nhất trong SPEC.md chuyển sang v2).
2. **Quan hệ và phép toán tập hợp (`\cap`, `\cup`, `\setminus`, `\in`, `\subset`):**
   - *Lý do:* Là biểu thức logic tập hợp, không phải bài toán tìm giá trị đại số / giải tích đơn trị.
3. **Mệnh đề suy luận logic (`\iff`, `\implies`, `\forall`, `\exists`):**
   - *Lý do:* Nối giữa hai mệnh đề hoặc các bước biến đổi của lời giải, không phải là một biểu thức đại số đầu vào để giải nghiệm.
4. **Ký hiệu tập hợp số (`\mathbb{R}`, `\mathbb{Z}`, `\mathbb{N}`, `\mathbb{C}`):**
   - *Lý do:* Thuộc văn cảnh định nghĩa miền nghiệm trong câu hỏi trắc nghiệm lý thuyết.
5. **Dấu ba chấm (`\dots`, `\ldots`, `\cdots`):**
   - *Lý do:* Biểu diễn quy luật vô hạn, cần suy luận dãy số tổng quát chứ không thể parse trực tiếp thành biểu thức đóng nếu thiếu quy luật rõ ràng.
6. **Vector đoạn thẳng hai chữ cái hoa (`\vec{AB}`, `\vec{MN}`):**
   - *Lý do:* Hình học giải tích không gian Oxyz v1 hỗ trợ vector đơn ký tự (`\vec{u}`, `\vec{a}`); vector tạo từ hai điểm được xử lý ở v2.

---

## 6. Kết quả đo lường thực tế trên Ngân hàng câu hỏi PUMKIN

Báo cáo tổng hợp từ script đo kiểm `tools/extract_latex_corpus.py` trên toàn bộ 553 câu hỏi (`public/data/questions/all.json`):

- **Tổng số chuỗi LaTeX trích xuất:** 4.183 chuỗi.
- **Tổng số chuỗi duy nhất:** 2.272 chuỗi.
- **Tỷ lệ dịch thành công sang SymPy AST:** **1.649 chuỗi (72,58%)**.
- **Tỷ lệ từ chối an toàn (cấu trúc không hỗ trợ / câu hỏi lý thuyết):** **623 chuỗi (27,42%)**.

### Bảng Top 20 cấu trúc không hỗ trợ phổ biến nhất:

| Hạng | Cấu trúc LaTeX | Số lượt xuất hiện trong ngân hàng | Lý do chưa hỗ trợ |
| :---: | :--- | :---: | :--- |
| 1 | Cú pháp phi chuẩn / Văn bản trong dấu toán | 366 | Tác giả đề đặt cả từ tiếng Việt hoặc cú pháp bảng vào `$ ... $` |
| 2 | `\frac` kết hợp với mệnh đề logic | 145 | Công thức phân thức nằm trong câu có `\iff`, `\implies` hoặc văn bản |
| 3 | `\iff` (Tương đương logic) | 79 | Bước giải suy luận logic trong lời giải mẫu |
| 4 | `\end` (Kết thúc môi trường) | 58 | Ma trận / mảng 2 chiều (chuyển sang v2) |
| 5 | `\begin` (Bắt đầu môi trường) | 58 | Ma trận / mảng 2 chiều (chuyển sang v2) |
| 6 | `\cap` (Giao tập hợp) | 56 | Phép toán tập hợp nghiệm |
| 7 | `\infty` trong khoảng nghiệm `(0; +\infty)` | 55 | Khoảng nghiệm / tập xác định dạng khoảng |
| 8 | `\implies` (Kéo theo logic) | 48 | Bước suy luận logic |
| 9 | `\pi` trong biểu thức hỗn hợp | 45 | Nằm trong các chuỗi văn bản hoặc lựa chọn trắc nghiệm hỗn hợp |
| 10 | `\pm` (Cộng trừ $\pm$) | 41 | Cú pháp viết tắt hai nghiệm $x = \pm a$ |
| 11 | `\vec` (Vector đoạn thẳng hai điểm) | 38 | Vector $\vec{AB}, \vec{CD}$ hình học không gian |
| 12 | `\mathbb` (Tập số $\mathbb{R}$) | 38 | Định danh tập số |
| 13 | `\approx` (Xấp xỉ $\approx$) | 36 | Kết quả làm tròn số thực trong bài toán thực tế |
| 14 | `\sqrt` trong biểu thức hỗn hợp | 35 | Nằm trong chuỗi có ký tự lạ hoặc mệnh đề |
| 15 | `\in` (Thuộc tập hợp) | 32 | Khẳng định phần tử thuộc tập hợp |
| 16 | `\text` chứa câu tiếng Việt | 28 | Câu văn giải thích đặt trong `\text{...}` |
| 17 | `\left` không đóng | 24 | Lỗi cú pháp LaTeX gốc từ dữ liệu ngân hàng đề |
| 18 | `\right` không mở | 24 | Lỗi cú pháp LaTeX gốc từ dữ liệu ngân hàng đề |
| 19 | `\to` trong ánh xạ hàm số | 21 | Ký hiệu ánh xạ $f: A \to B$ |
| 20 | `\cdot` trong chuỗi hỗn hợp | 20 | Dấu nhân trong mệnh đề suy luận |

### 10 Ca biên / Dữ liệu bất thường phát hiện từ ngân hàng câu hỏi:

1. **Từ tiếng Việt bị đặt nhầm vào dấu toán học:**
   - Chuỗi: `\((x-1)^2(x+2)(x-3)^3\). Số điểm cực trị của hàm số \(f(x)\)`
   - Nguyên nhân: Tác giả câu hỏi vô tình viết liền văn bản câu hỏi vào trong một cặp thẻ toán học.
2. **Ký tự lạ trong định nghĩa đường thẳng:**
   - Chuỗi: `d_1: \frac{x - 10}{2} = \frac{y - 20}{1} = \frac{z - 30}{2}`
   - Xử lý: Đã thêm bộ lọc `skip_label_prefix()` để tách nhãn `d_1:` và giải thành công hệ phương trình chính tắc.
3. **Quan hệ chuỗi hai chiều:**
   - Chuỗi: `0 < \alpha < \frac{\pi}{2}`
   - Xử lý: Đã thêm thuật toán xâu chuỗi quan hệ `sympy.And(0 < alpha, alpha < pi/2)`.
4. **Dấu xấp xỉ kết quả làm tròn:**
   - Chuỗi: `x = \frac{1 + \sqrt{5}}{2} \approx 1,618`
   - Nguyên nhân: Bài toán thực tế kết hợp cả giá trị giải tích chính xác và số thập phân làm tròn.
5. **Ngoặc nhọn không cân bằng trong dữ liệu đề:**
   - Chuỗi: `y_{\text{CĐ}` (thiếu dấu `}`)
   - Xử lý: Parser từ chối an toàn và báo lỗi vị trí ký tự thiếu ngoặc.
6. **Mệnh đề tương đương nhiều bước trong lời giải:**
   - Chuỗi: `f'(x) = \frac{x^2 - 2x - 3}{(x-1)^2} = 0 \iff x = -1 \text{ hoặc } x = 3`
   - Nguyên nhân: Đây là cả một đoạn lập luận giải toán, không phải là một phương trình đầu vào duy nhất.
7. **Lũy thừa đơn vị đo thể tích:**
   - Chuỗi: `V = 2\pi\text{ m}^3`
   - Xử lý: Parser đã tự động bóc tách `\text{ m}^3` để giữ lại giá trị đại số thuần túy $V = 2\pi$.
8. **Vector đoạn thẳng hai chữ cái:**
   - Chuỗi: `\vec{AB} = (2; 1; -1)`
   - Nguyên nhân: Vector đoạn thẳng trong không gian Oxyz (thuộc phạm vi v2).
9. **Ký hiệu giới hạn không có chỉ số biến:**
   - Chuỗi: `x = \lim \frac{F_{n+1}}{F_n}`
   - Nguyên nhân: Giới hạn viết tắt trong dãy số Fibonacci (thiếu `n \to \infty`).
10. **Tổng hình thức không có chỉ số chạy:**
    - Chuỗi: `S = \frac{1}{2} |\sum (x_i y_{i+1} - x_{i+1} y_i)|`
    - Nguyên nhân: Công thức diện tích đa giác viết dạng rút gọn không ghi cận chạy $i=1 \dots n$.
