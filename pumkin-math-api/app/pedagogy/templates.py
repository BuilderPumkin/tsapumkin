"""
Pedagogical Template Scaffolding Layer (app/pedagogy/templates.py)
Constructs rigorous, formatted step-by-step solutions and 4-tier Socratic hints
strictly derived from solver CAS execution traces (StepItem list) without hallucinations.
All formulas strictly formatted with KaTeX \\( ... \\) and \\[ ... \\].
"""

from typing import Any

from app.schemas.common import StepItem
from app.schemas.solve import HintItem


def _format_step_note(step: StepItem) -> str:
    """Standardizes step explanation formatting in Vietnamese."""
    note = step.note_vi.strip()
    if not note.endswith((".", ":")):
        note += ":"
    return f"{note}\n\\[\n{step.latex}\n\\]"


def build_socratic_hints(
    dsl_type: str,
    steps: list[StepItem],
    result: Any,
    dsl: Any | None = None,
) -> list[HintItem]:
    """
    Constructs the 4 graduated Socratic scaffolding hint tiers:
    Tier 1 (Nudge): Strategic observation question
    Tier 2 (Concept Reminder): Mathematical theorem/formula reminder without numbers
    Tier 3 (Sub-goal): Intermediate milestone (never reveals final answer)
    Tier 4 (Worked Step): Solves the bottleneck, leaving final conclusion to the student
    """
    hints: list[HintItem] = []

    # Fallback intermediate hints if trace has steps
    first_step_latex = steps[0].latex if len(steps) > 0 else "\\dots"
    second_step_latex = steps[1].latex if len(steps) > 1 else first_step_latex
    first_step_note = steps[0].note_vi if len(steps) > 0 else "Thiết lập bài toán ban đầu"

    # --- Domain 1: Nguyên hàm - Tích phân ---
    if dsl_type in ("nguyen_ham_tich_phan", "integral"):
        hints.append(
            HintItem(
                level=1,
                title_vi="Gợi mở chiến lược (Nudge)",
                content_vi=(
                    "Quan sát hàm dưới dấu tích phân: hãy nhận diện xem đây là dạng nguyên hàm "
                    "cơ bản trong bảng, hay cần sử dụng phương pháp đổi biến số/từng phần?"
                ),
                latex_hint=None,
            )
        )
        hints.append(
            HintItem(
                level=2,
                title_vi="Nhắc nhớ kiến thức cốt lõi (Concept Reminder)",
                content_vi=(
                    "Nhớ lại công thức Newton-Leibniz: tích phân xác định bằng hiệu giá trị "
                    "của một nguyên hàm tại hai cận:"
                ),
                latex_hint=r"\int_a^b f(x)\,dx = F(b) - F(a) \quad \text{với } F'(x) = f(x)",
            )
        )
        hints.append(
            HintItem(
                level=3,
                title_vi="Mục tiêu con trung gian (Sub-goal)",
                content_vi=(
                    f"Bước đầu tiên, em hãy tìm biểu thức họ nguyên hàm của hàm số. "
                    f"Ta có: {first_step_note}."
                ),
                latex_hint=first_step_latex,
            )
        )
        hints.append(
            HintItem(
                level=4,
                title_vi="Thực hiện bước mẫu (Worked Step)",
                content_vi=("Sau khi có nguyên hàm, ta thay hai cận vào biểu thức:"),
                latex_hint=second_step_latex,
            )
        )

    # --- Domain 2: Chữ số tận cùng & Số học đồng dư ---
    elif dsl_type in ("chu_so_tan_cung_luy_thua", "so_hoc_dong_du", "last_digit"):
        hints.append(
            HintItem(
                level=1,
                title_vi="Gợi mở chiến lược (Nudge)",
                content_vi=(
                    "Chữ số tận cùng của một lũy thừa luôn có tính tuần hoàn lặp lại. "
                    "Em hãy thử nâng cơ số lên các lũy thừa liên tiếp để tìm chu kỳ."
                ),
                latex_hint=None,
            )
        )
        hints.append(
            HintItem(
                level=2,
                title_vi="Nhắc nhớ kiến thức cốt lõi (Concept Reminder)",
                content_vi=(
                    "Để tìm chữ số tận cùng của \\(a^b\\), ta xét \\(a^b \\pmod{10}\\). "
                    "Nếu chu kỳ lặp là \\(T\\), ta lấy số mũ \\(b\\) chia cho \\(T\\) "
                    "để tìm phần dư tương ứng."
                ),
                latex_hint=r"a^b \equiv a^{b \bmod T} \pmod{10} \quad (b \bmod T \ne 0)",
            )
        )
        hints.append(
            HintItem(
                level=3,
                title_vi="Mục tiêu con trung gian (Sub-goal)",
                content_vi=(
                    f"Hãy xác định chu kỳ lặp lại của các chữ số tận cùng. "
                    f"Theo bước tính: {first_step_note}."
                ),
                latex_hint=first_step_latex,
            )
        )
        hints.append(
            HintItem(
                level=4,
                title_vi="Thực hiện bước mẫu (Worked Step)",
                content_vi=("Rút gọn số mũ theo chu kỳ tuần hoàn để tìm số dư tương đương:"),
                latex_hint=second_step_latex,
            )
        )

    # --- Domain 3: Đại số ma trận ---
    elif dsl_type in ("dai_so_tuyen_tinh_ma_tran", "matrix_algebra", "dinh_thuc_ma_tran"):
        hints.append(
            HintItem(
                level=1,
                title_vi="Gợi mở chiến lược (Nudge)",
                content_vi=(
                    "Hãy kiểm tra kích thước các ma trận và xác định phép toán được yêu cầu "
                    "(nhân ma trận, chuyển vị, hay tính định thức)."
                ),
                latex_hint=None,
            )
        )
        hints.append(
            HintItem(
                level=2,
                title_vi="Nhắc nhớ kiến thức cốt lõi (Concept Reminder)",
                content_vi=(
                    "Phần tử ở hàng \\(i\\) cột \\(j\\) của ma trận tích \\(C = A \\cdot B\\) "
                    "bằng tích vô hướng của hàng \\(i\\) ma trận \\(A\\) "
                    "với cột \\(j\\) ma trận \\(B\\)."
                ),
                latex_hint=r"c_{ij} = \sum_{k=1}^m a_{ik} b_{kj}",
            )
        )
        hints.append(
            HintItem(
                level=3,
                title_vi="Mục tiêu con trung gian (Sub-goal)",
                content_vi=f"Bắt đầu với phép biến đổi đầu tiên: {first_step_note}.",
                latex_hint=first_step_latex,
            )
        )
        hints.append(
            HintItem(
                level=4,
                title_vi="Thực hiện bước mẫu (Worked Step)",
                content_vi="Tính toán từng phần tử tương ứng của ma trận:",
                latex_hint=second_step_latex,
            )
        )

    # --- Domain 4: Diện tích hình phẳng ---
    elif dsl_type in ("dien_tich_hinh_phang", "planar_area", "tich_phan_dien_tich"):
        hints.append(
            HintItem(
                level=1,
                title_vi="Gợi mở chiến lược (Nudge)",
                content_vi=(
                    "Để tính diện tích hình phẳng giữa hai đồ thị, trước hết ta cần biết "
                    "các hoành độ giao điểm của chúng để xác định cận tích phân."
                ),
                latex_hint=None,
            )
        )
        hints.append(
            HintItem(
                level=2,
                title_vi="Nhắc nhớ kiến thức cốt lõi (Concept Reminder)",
                content_vi=(
                    "Diện tích hình phẳng giới hạn bởi hai đường cong \\(y = f(x)\\) "
                    "và \\(y = g(x)\\) từ \\(x = a\\) đến \\(x = b\\) được tính bằng:"
                ),
                latex_hint=r"S = \int_a^b |f(x) - g(x)|\,dx",
            )
        )
        hints.append(
            HintItem(
                level=3,
                title_vi="Mục tiêu con trung gian (Sub-goal)",
                content_vi=f"Giải phương trình hoành độ giao điểm: {first_step_note}.",
                latex_hint=first_step_latex,
            )
        )
        hints.append(
            HintItem(
                level=4,
                title_vi="Thực hiện bước mẫu (Worked Step)",
                content_vi="Thiết lập biểu thức tích phân diện tích với cận giao điểm:",
                latex_hint=second_step_latex,
            )
        )

    # --- Domain 5: Dãy số & Cấp số cộng / Cấp số nhân ---
    elif dsl_type in ("day_so", "cap_so_cong", "cap_so_nhan", "sequence_progression"):
        hints.append(
            HintItem(
                level=1,
                title_vi="Gợi mở chiến lược (Nudge)",
                content_vi=(
                    "Hãy xác định rõ đây là cấp số cộng (có công sai d) "
                    "hay cấp số nhân (có công bội q), và liệt kê các số hạng đã biết."
                ),
                latex_hint=None,
            )
        )
        hints.append(
            HintItem(
                level=2,
                title_vi="Nhắc nhớ kiến thức cốt lõi (Concept Reminder)",
                content_vi=(
                    "Số hạng tổng quát và tổng \\(n\\) số hạng đầu:\n"
                    "Cấp số cộng: \\(u_n = u_1 + (n-1)d\\), \\(S_n = \\frac{n(u_1 + u_n)}{2}\\).\n"
                    "Cấp số nhân: \\(u_n = u_1 \\cdot q^{n-1}\\), "
                    "\\(S_n = \\frac{u_1(1-q^n)}{1-q}\\) (với \\(q \\ne 1\\))."
                ),
                latex_hint=r"u_n = u_1 + (n-1)d \quad \text{hoặc} \quad u_n = u_1 \cdot q^{n-1}",
            )
        )
        hints.append(
            HintItem(
                level=3,
                title_vi="Mục tiêu con trung gian (Sub-goal)",
                content_vi=f"Thiết lập công thức từ các dữ kiện bài toán: {first_step_note}.",
                latex_hint=first_step_latex,
            )
        )
        hints.append(
            HintItem(
                level=4,
                title_vi="Thực hiện bước mẫu (Worked Step)",
                content_vi="Thay các giá trị số hạng đã biết để tìm công sai / công bội:",
                latex_hint=second_step_latex,
            )
        )

    # --- Domain 6: Hệ thức lượng tam giác & Vector ---
    elif dsl_type in ("tam_giac_vector", "he_thuc_luong_tam_giac", "triangle_vector"):
        hints.append(
            HintItem(
                level=1,
                title_vi="Gợi mở chiến lược (Nudge)",
                content_vi=(
                    "Xem xét các yếu tố hình học đã cho: cạnh, góc, hoặc tọa độ vectơ. "
                    "Cần tính diện tích, bán kính, hay tích vô hướng?"
                ),
                latex_hint=None,
            )
        )
        hints.append(
            HintItem(
                level=2,
                title_vi="Nhắc nhớ kiến thức cốt lõi (Concept Reminder)",
                content_vi=(
                    "Định lý côsin: \\(a^2 = b^2 + c^2 - 2bc\\cos(A)\\).\n"
                    "Tích vô hướng: \\(\\vec{u} \\cdot \\vec{v} = "
                    "|\\vec{u}| |\\vec{v}| \\cos(\\vec{u}, \\vec{v}) = x_1 x_2 + y_1 y_2\\)."
                ),
                latex_hint=r"a^2 = b^2 + c^2 - 2bc\cos(A)",
            )
        )
        hints.append(
            HintItem(
                level=3,
                title_vi="Mục tiêu con trung gian (Sub-goal)",
                content_vi=f"Áp dụng định lý cho yếu tố đầu tiên: {first_step_note}.",
                latex_hint=first_step_latex,
            )
        )
        hints.append(
            HintItem(
                level=4,
                title_vi="Thực hiện bước mẫu (Worked Step)",
                content_vi="Thế các số đo cạnh và góc đã biết:",
                latex_hint=second_step_latex,
            )
        )

    # --- Domain 7: Lượng giác ---
    elif dsl_type in ("luong_giac", "phuong_trinh_luong_giac", "trigonometric"):
        hints.append(
            HintItem(
                level=1,
                title_vi="Gợi mở chiến lược (Nudge)",
                content_vi=(
                    "Trước hết, hãy đặt điều kiện xác định (nếu có tan, cot hoặc phân thức). "
                    "Sau đó đưa phương trình về dạng lượng giác cơ bản."
                ),
                latex_hint=None,
            )
        )
        hints.append(
            HintItem(
                level=2,
                title_vi="Nhắc nhớ kiến thức cốt lõi (Concept Reminder)",
                content_vi=(
                    "Nghiệm cơ bản của hàm số lượng giác:\n"
                    "\\(\\sin(x) = \\sin(\\alpha) \\iff x = \\alpha + k2\\pi\\) "
                    "hoặc \\(x = \\pi - \\alpha + k2\\pi\\).\n"
                    "\\(\\cos(x) = \\cos(\\alpha) \\iff x = \\pm \\alpha + k2\\pi\\) "
                    "(\\(k \\in \\mathbb{Z}\\))."
                ),
                latex_hint=r"\sin(x) = \sin(\alpha) \iff x = \alpha + k2\pi",
            )
        )
        hints.append(
            HintItem(
                level=3,
                title_vi="Mục tiêu con trung gian (Sub-goal)",
                content_vi=f"Tìm họ nghiệm tổng quát: {first_step_note}.",
                latex_hint=first_step_latex,
            )
        )
        hints.append(
            HintItem(
                level=4,
                title_vi="Thực hiện bước mẫu (Worked Step)",
                content_vi="Thu hẹp họ nghiệm trên đoạn hoặc khoảng xét nghiệm đã cho:",
                latex_hint=second_step_latex,
            )
        )

    # --- Domain 8: Hình học không gian Oxyz ---
    elif dsl_type in (
        "geometry_oxyz",
        "oxyz",
        "hinh_hoc_oxyz",
        "phuong_phap_toa_do_hoa_oxyz_thuan_tuy",
    ):
        hints.append(
            HintItem(
                level=1,
                title_vi="Gợi mở chiến lược (Nudge)",
                content_vi=(
                    "Xác định rõ đối tượng hình học cần lập phương trình hoặc tính toán "
                    "(mặt phẳng, đường thẳng, mặt cầu, góc hoặc khoảng cách)."
                ),
                latex_hint=None,
            )
        )
        hints.append(
            HintItem(
                level=2,
                title_vi="Nhắc nhớ kiến thức cốt lõi (Concept Reminder)",
                content_vi=(
                    "Mặt phẳng qua \\(M_0(x_0, y_0, z_0)\\) có VTPT \\(\\vec{n} = (A, B, C)\\):\n"
                    "\\(A(x - x_0) + B(y - y_0) + C(z - z_0) = 0\\).\n"
                    "Khoảng cách: "
                    "\\(d(M_0, (P)) = \\frac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}\\)."
                ),
                latex_hint=r"A(x-x_0) + B(y-y_0) + C(z-z_0) = 0",
            )
        )
        hints.append(
            HintItem(
                level=3,
                title_vi="Mục tiêu con trung gian (Sub-goal)",
                content_vi=f"Xác định tọa độ vectơ đặc trưng: {first_step_note}.",
                latex_hint=first_step_latex,
            )
        )
        hints.append(
            HintItem(
                level=4,
                title_vi="Thực hiện bước mẫu (Worked Step)",
                content_vi="Thay tọa độ điểm và vectơ vào công thức:",
                latex_hint=second_step_latex,
            )
        )

    # --- Fallback Chung cho mọi dạng toán ---
    else:
        hints.append(
            HintItem(
                level=1,
                title_vi="Gợi mở chiến lược (Nudge)",
                content_vi=(
                    "Quan sát kỹ đề bài: xác định biến số chính, tập xác định "
                    "và mối liên hệ toán học cốt lõi giữa các đại lượng."
                ),
                latex_hint=None,
            )
        )
        hints.append(
            HintItem(
                level=2,
                title_vi="Nhắc nhớ kiến thức cốt lõi (Concept Reminder)",
                content_vi=(
                    "Áp dụng các định lý và công thức biến đổi tương đương chuẩn xác "
                    "cho dạng bài này."
                ),
                latex_hint=None,
            )
        )
        hints.append(
            HintItem(
                level=3,
                title_vi="Mục tiêu con trung gian (Sub-goal)",
                content_vi=f"Bước 1: {first_step_note}.",
                latex_hint=first_step_latex,
            )
        )
        hints.append(
            HintItem(
                level=4,
                title_vi="Thực hiện bước mẫu (Worked Step)",
                content_vi="Tiếp tục thực hiện phép tính bước tiếp theo:",
                latex_hint=second_step_latex,
            )
        )

    return hints


def build_template_guidance_for_step(
    hints: list[HintItem],
    step_index: int,
) -> tuple[str, str | None, bool, bool]:
    """
    Selects appropriate guidance text, formula hint, subgoal status, and is_final_step flag
    for the requested step_index (1 to 4).
    """
    idx = max(1, min(step_index, 4)) - 1
    target_hint = hints[idx]

    guidance_vi = f"{target_hint.title_vi}: {target_hint.content_vi}"
    latex_hint = target_hint.latex_hint
    subgoal_completed = idx >= 2  # At Sub-goal (level 3) or Worked Step (level 4)
    is_final_step = idx == 3  # Level 4 is final step before student concludes

    return guidance_vi, latex_hint, subgoal_completed, is_final_step
