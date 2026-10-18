"""
Pedagogical Misconception Feedback Registry (app/pedagogy/misconceptions.py)
Maps student cognitive misconception codes to encouraging, mathematically rigorous,
and concise Vietnamese pedagogical guidance in accordance with GEMINI.md standards.
"""

from typing import Final

MISCONCEPTION_FEEDBACK_MAP: Final[dict[str, str]] = {
    "TRAP_LOG_DOMAIN_IGNORED": (
        "💡 Nhắc nhở sư phạm: Em lưu ý điều kiện xác định của logarit \\(\\log_a(b)\\) "
        "là cơ số \\(a > 0, a \\ne 1\\) và biểu thức lấy logarit \\(b > 0\\). "
        "Đừng quên đặt điều kiện này trước khi giải phương trình nhé!"
    ),
    "TRAP_RADICAL_DOMAIN_IGNORED": (
        "💡 Nhắc nhở sư phạm: Căn bậc hai \\(\\sqrt{f(x)}\\) chỉ xác định khi \\(f(x) \\ge 0\\). "
        "Hãy kiểm tra lại tập xác định để tránh nhận nghiệm ngoại lai "
        "sau khi bình phương nhé!"
    ),
    "TRAP_EXTREMA_DELTA_CONFUSION": (
        "💡 Nhắc nhở sư phạm: Hàm bậc ba \\(y = ax^3 + bx^2 + cx + d\\) có 2 điểm cực trị "
        "khi \\(a \\ne 0\\) và \\(\\Delta_{y'} = b^2 - 3ac > 0\\). "
        "Em hãy phân biệt với biệt thức \\(\\Delta = b^2 - 4ac\\) "
        "của phương trình bậc 2 nhé!"
    ),
    "TRAP_ANGLE_LINE_VS_VECTOR": (
        "💡 Nhắc nhở sư phạm: Góc giữa hai đường thẳng luôn thuộc "
        "\\(\\varphi \\in [0^\\circ, 90^\\circ]\\), với "
        "\\(\\cos \\varphi = \\frac{|\\vec{u_1} \\cdot \\vec{u_2}|}"
        "{|\\vec{u_1}| |\\vec{u_2}|} \\ge 0\\) "
        "(bắt buộc có trị tuyệt đối). Phân biệt với góc giữa hai vectơ có thể tù nhé!"
    ),
    "TRAP_COLLINEAR_ZERO_DIVISION": (
        "💡 Nhắc nhở sư phạm: Khi xét hai vectơ cùng phương, tuyệt đối không lập tỉ số phân thức "
        "nếu tọa độ có thể bằng 0. Hãy dùng định nghĩa \\(\\vec{u} = k\\vec{v}\\) "
        "hoặc điều kiện nhân chéo \\(x_1 y_2 - x_2 y_1 = 0\\) nhé!"
    ),
    "TRAP_CROSS_PRODUCT_IS_SCALAR": (
        "💡 Nhắc nhở sư phạm: Tích có hướng \\([\\vec{u}, \\vec{v}]\\) là một vectơ vuông góc "
        "với cả \\(\\vec{u}\\) và \\(\\vec{v}\\), không phải số vô hướng như tích vô hướng "
        "\\(\\vec{u} \\cdot \\vec{v}\\) nhé!"
    ),
    "TRAP_SPHERE_RADIUS_INVALID": (
        "💡 Nhắc nhở sư phạm: Phương trình \\(x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0\\) "
        "chỉ là mặt cầu khi \\(R^2 = a^2 + b^2 + c^2 - d > 0\\). "
        "Nếu \\(a^2 + b^2 + c^2 - d \\le 0\\), phương trình không biểu diễn mặt cầu nào cả!"
    ),
    "TRAP_LINE_CANONICAL_ZERO_DENOM": (
        "💡 Nhắc nhở sư phạm: Phương trình chính tắc của đường thẳng "
        "\\(\\frac{x-x_0}{a} = \\frac{y-y_0}{b} = \\frac{z-z_0}{c}\\) chỉ viết được "
        "khi cả 3 thành phần VTCP \\(a, b, c \\ne 0\\). Nếu có thành phần bằng 0, "
        "em hãy chuyển sang dạng tham số nhé!"
    ),
    "TRAP_PLANE_DISTANCE_NO_ABS": (
        "💡 Nhắc nhở sư phạm: Khoảng cách từ một điểm đến mặt phẳng luôn không âm: "
        "\\(d(M_0, (P)) = \\frac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}\\). "
        "Nhớ lấy dấu giá trị tuyệt đối trên tử số nhé!"
    ),
    "TRAP_PERM_COMB_CONFUSION": (
        "💡 Nhắc nhở sư phạm: Chọn nhóm không phân biệt thứ tự dùng tổ hợp \\(C_n^k\\); "
        "chọn và sắp xếp thứ tự các phần tử dùng chỉnh hợp \\(A_n^k\\). "
        "Em chú ý xem bài toán có tính đến thứ tự sắp đặt không nhé!"
    ),
    "TRAP_PROB_SUM_NOT_DISJOINT": (
        "💡 Nhắc nhở sư phạm: Công thức cộng xác suất cho hai biến cố bất kỳ là "
        "\\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\). "
        "Chỉ khi \\(A\\) và \\(B\\) xung khắc (\\(A \\cap B = \\emptyset\\)) "
        "thì mới có \\(P(A \\cup B) = P(A) + P(B)\\) nhé!"
    ),
    "TRAP_ROUND_TABLE_NUMBERED_SEATS": (
        "💡 Nhắc nhở sư phạm: Bàn tròn không đánh số có \\((n-1)!\\) cách xếp do bất biến "
        "phép quay. Khi ghế đã đánh số thứ tự cố định, số cách xếp trở thành "
        "hoán vị thẳng thông thường là \\(n!\\) cách nhé!"
    ),
    "TRAP_ROUND_TABLE_BLOCK_FACTORIAL": (
        "💡 Nhắc nhở sư phạm: Khi xếp \\(n\\) người vào bàn tròn sao cho 2 người A, B "
        "ngồi cạnh nhau: ta coi (A, B) là 1 khối có \\(2!\\) cách xếp nội bộ; "
        "xếp \\(n-1\\) khối vào bàn tròn có \\(((n-1)-1)! = (n-2)!\\) cách. "
        "Tổng số cách là \\((n-2)! \\times 2!\\), chứ không phải \\((n-1)! \\times 2\\) nhé!"
    ),
    "TRAP_ROUND_TABLE_ALTERNATING_OVERCOUNT": (
        "💡 Nhắc nhở sư phạm: Khi xếp xen kẽ \\(n\\) nam và \\(n\\) nữ vào bàn tròn "
        "\\(2n\\) ghế, số cách là \\((n-1)! \\times n!\\). "
        "Em chú ý không nhân thừa hệ số 2 như khi xếp trên hàng thẳng nhé!"
    ),
    "TRAP_ROUND_TABLE_FLIP_SYMMETRY": (
        "💡 Nhắc nhở sư phạm: Với bài toán chuỗi hạt hoặc vòng hoa có thể lật úp ngược, "
        "số cách sắp xếp là \\(\\frac{(n-1)!}{2}\\) với \\(n \\ge 3\\). "
        "Đừng quên chia 2 cho đối xứng gương nhé!"
    ),
    "TRAP_CYCLE_REMAINDER_ZERO": (
        "💡 Nhắc nhở sư phạm: Khi số mũ chia hết cho chu kỳ lặp T (phần dư bằng 0), "
        "chữ số tận cùng tương ứng với vị trí cuối cùng của chu kỳ (tức mũ T), "
        "chứ không phải mũ 0 nhé!"
    ),
    "TRAP_GEOMETRIC_SUM_Q_ONE": (
        "💡 Nhắc nhở sư phạm: Đối với cấp số nhân có công bội \\(q = 1\\), mọi số hạng "
        "đều bằng nhau và \\(S_n = n \\cdot u_1\\). Công thức "
        "\\(S_n = \\frac{u_1(1-q^n)}{1-q}\\) chỉ áp dụng khi \\(q \\ne 1\\) nhé!"
    ),
    "TRAP_INFINITE_SUM_DIVERGENT": (
        "💡 Nhắc nhở sư phạm: Công thức tổng cấp số nhân lùi vô hạn "
        "\\(S = \\frac{u_1}{1-q}\\) chỉ hội tụ khi \\(|q| < 1\\). "
        "Khi \\(|q| \\ge 1\\), cấp số nhân phân kỳ và không có tổng hữu hạn nhé!"
    ),
    "TRAP_FRACTIONAL_INDEX": (
        "💡 Nhắc nhở sư phạm: Số thứ tự \\(n\\) của một số hạng trong dãy số bắt buộc "
        "phải là số nguyên dương \\(n \\in \\mathbb{N}^*\\). "
        "Nếu giải ra \\(n\\) là phân số hoặc số âm thì giá trị đó không thuộc dãy nhé!"
    ),
    "TRAP_TRIANGLE_INEQUALITY": (
        "💡 Nhắc nhở sư phạm: Ba đoạn thẳng có độ dài \\(a, b, c > 0\\) chỉ tạo thành "
        "tam giác khi thỏa mãn bất đẳng thức tam giác: \\(|b - c| < a < b + c\\). "
        "Em hãy kiểm tra điều kiện này trước khi tính diện tích nhé!"
    ),
    "TRAP_TRIG_EXTRANEOUS_ROOTS": (
        "💡 Nhắc nhở sư phạm: Khi giải phương trình lượng giác chứa \\(\\tan(x)\\) hoặc "
        "\\(\\cot(x)\\), em nhớ đặt điều kiện xác định \\(\\cos(x) \\ne 0\\) hay "
        "\\(\\sin(x) \\ne 0\\) để loại bỏ các nghiệm ngoại lai nhé!"
    ),
    "TRAP_SIGN_ERROR": (
        "💡 Nhắc nhở sư phạm: Em hãy kiểm tra lại dấu của các phép biến đổi, "
        "đặc biệt là dấu trừ trước ngoặc hoặc khi chuyển vế đổi dấu nhé!"
    ),
    "TRAP_BOUNDARY_NOT_CHECKED": (
        "💡 Nhắc nhở sư phạm: Đừng quên kiểm tra các giá trị tại điểm biên của đoạn "
        "hoặc tập xác định khi tìm giá trị lớn nhất, giá trị nhỏ nhất nhé!"
    ),
    "TRAP_OTHER": (
        "💡 Nhắc nhở sư phạm: Em hãy xem kỹ lại các bước biến đổi và điều kiện xác định "
        "của bài toán để đảm bảo kết quả chính xác nhé!"
    ),
}


def get_misconception_feedback(misconception_id: str | None) -> str | None:
    """
    Returns encouraging pedagogical guidance for the detected misconception ID.
    Returns None if no misconception_id is given or if empty.
    """
    if not misconception_id:
        return None
    clean_id = misconception_id.strip()
    return MISCONCEPTION_FEEDBACK_MAP.get(clean_id, MISCONCEPTION_FEEDBACK_MAP["TRAP_OTHER"])
