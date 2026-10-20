"""
Triangle and 2D Vector Problem Templates (app/generator/templates/triangle_vector.py)
Category: tam_giac_vector
Generates triangle geometry and vector dot product problems.
"""

import math
import random
from typing import Any

from app.generator.models import DistractorSpec, TemplateOutput
from app.generator.templates.base import BaseProblemTemplate
from app.schemas.dsl import TriangleVectorDSL
from app.schemas.generate import DifficultyEnum
from app.schemas.traps import MisconceptionTrapEnum


class TriangleHeronAreaTemplate(BaseProblemTemplate):
    """
    Template: Tính diện tích tam giác biết độ dài 3 cạnh a, b, c theo công thức Heron.
    Cho các bộ số nguyên đẹp (Pythagorean triples scaled).
    Triples: (3, 4, 5) -> S=6; (6, 8, 10) -> S=24; (5, 12, 13) -> S=30.
    """

    template_id = "tmpl_triangle_heron_area"
    category = "tam_giac_vector"
    topic = "Hình học"
    subtopic = "Hệ thức lượng trong tam giác"
    difficulty = DifficultyEnum.M2
    cognitive_level = "M2"
    difficulty_score = 0.50
    skills = ["skill_calculation", "skill_reasoning"]

    TRIPLES = [
        (3, 4, 5, 6),
        (6, 8, 10, 24),
        (5, 12, 13, 30),
        (9, 12, 15, 54),
        (8, 15, 17, 60),
    ]

    def generate(self, rng: random.Random) -> TemplateOutput:
        a, b, c, correct_area = rng.choice(self.TRIPLES)

        question_text = (
            f"Tính diện tích \\(S\\) của tam giác \\(ABC\\) có độ dài ba cạnh là "
            f"\\(a = {a}\\), \\(b = {b}\\), \\(c = {c}\\)."
        )

        dsl = TriangleVectorDSL(
            type="tam_giac_vector",
            operation="triangle_area_heron",
            a=str(a),
            b=str(b),
            c=str(c),
            restate_vi=f"Tính diện tích tam giác có ba cạnh a = {a}, b = {b}, c = {c}",
        )

        def calc_distractors(result: Any, correct_latex: str) -> list[DistractorSpec]:
            distractors = []
            seen = {correct_area}
            p = (a + b + c) // 2

            # Distractor 1: Dùng tích hai cạnh (a * b)
            d1 = a * b
            if d1 in seen:
                d1 = correct_area * 2
            seen.add(d1)
            distractors.append(
                DistractorSpec(
                    latex=f"\\(S = {d1}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_DISTRIBUTIVE_MULTIPLICATION,
                    description_vi="Nhầm diện tích tam giác bằng tích hai cạnh a * b mà quên nhân 1/2 hoặc nhầm sang diện tích hình chữ nhật.",
                    severity="high",
                    remediation_hint="Diện tích tam giác vuông là (1/2)*a*b, hoặc tổng quát dùng công thức Heron S = sqrt(p(p-a)(p-b)(p-c)).",
                )
            )

            # Distractor 2: Nhầm diện tích thành nửa chu vi p
            d2 = p
            if d2 in seen:
                d2 = p * 2
            seen.add(d2)
            distractors.append(
                DistractorSpec(
                    latex=f"\\(S = {d2}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_DISTRIBUTIVE_MULTIPLICATION,
                    description_vi="Nhầm lẫn giữa diện tích tam giác với nửa chu vi p.",
                    severity="medium",
                    remediation_hint=f"Nửa chu vi p = (a + b + c)/2 = {p} mới chỉ là bước trung gian, chưa phải diện tích S.",
                )
            )

            # Distractor 3: Thiếu thừa số p trong căn: sqrt((p-a)(p-b)(p-c))
            d3 = int(round(math.sqrt((p - a) * (p - b) * (p - c))))
            if d3 in seen or d3 <= 0:
                d3 = correct_area // 2 if correct_area // 2 not in seen else correct_area + 6
            seen.add(d3)
            distractors.append(
                DistractorSpec(
                    latex=f"\\(S = {d3}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_DISTRIBUTIVE_MULTIPLICATION,
                    description_vi="Bỏ quên thừa số p bên trong căn thức của công thức Heron.",
                    severity="high",
                    remediation_hint="Công thức Heron đầy đủ: S = sqrt(p * (p - a) * (p - b) * (p - c)).",
                )
            )
            return distractors

        p_val = (a + b + c) // 2
        return TemplateOutput(
            template_id=self.template_id,
            category=self.category,
            topic=self.topic,
            subtopic=self.subtopic,
            difficulty=self.difficulty,
            cognitive_level=self.cognitive_level,
            difficulty_score=self.difficulty_score,
            skills=self.skills,
            question_text=question_text,
            dsl=dsl,
            correct_latex=f"\\(S = {correct_area}\\)",
            distractor_calculator=calc_distractors,
            explanation_vi=(
                f"Bước 1: Tính nửa chu vi: \\(p = \\frac{{{a} + {b} + {c}}}{{2}} = {p_val}\\).<br>"
                f"Bước 2: Áp dụng công thức Heron tính diện tích:<br>"
                f"\\(S = \\sqrt{{p(p - a)(p - b)(p - c)}} = \\sqrt{{{p_val}({p_val} - {a})({p_val} - {b})({p_val} - {c})}} = {correct_area}\\)."
            ),
            socratic_hints=[
                "Bậc 1 (Nudge): Khi biết độ dài cả ba cạnh của tam giác, hãy nhớ đến công thức Heron.",
                "Bậc 2 (Concept Reminder): \\(S = \\sqrt{p(p-a)(p-b)(p-c)}\\) với \\(p = \\frac{a+b+c}{2}\\).",
                f"Bậc 3 (Sub-goal): Tính nửa chu vi p = ({a} + {b} + {c})/2.",
                f"Bậc 4 (Worked Step): Thế p = {p_val} và ba cạnh vào căn thức để ra diện tích.",
            ],
            common_traps=[
                "Nhầm diện tích với tích a * b",
                "Nhầm diện tích với nửa chu vi p",
                "Quên nhân thừa số p trong căn thức Heron",
            ],
        )


class VectorDotProductTemplate(BaseProblemTemplate):
    """
    Template: Tính tích vô hướng của hai vectơ trong mặt phẳng Oxy: u . v = x1*x2 + y1*y2.
    x_i, y_i in [-4, 5] \\ {0}.
    """

    template_id = "tmpl_vector_dot_product_2d"
    category = "tam_giac_vector"
    topic = "Hình học"
    subtopic = "Vector Oxy"
    difficulty = DifficultyEnum.M1
    cognitive_level = "M1"
    difficulty_score = 0.35
    skills = ["skill_calculation"]

    def generate(self, rng: random.Random) -> TemplateOutput:
        while True:
            x1 = rng.choice([-3, -2, -1, 1, 2, 3, 4])
            y1 = rng.choice([-3, -2, -1, 1, 2, 3, 4])
            x2 = rng.choice([-3, -2, -1, 1, 2, 3, 4])
            y2 = rng.choice([-3, -2, -1, 1, 2, 3, 4])
            dot_val = x1 * x2 + y1 * y2
            if dot_val != 0:
                break

        question_text = (
            f"Trong mặt phẳng tọa độ \\(Oxy\\), cho hai vectơ \\(\\vec{{u}} = ({x1}, {y1})\\) "
            f"và \\(\\vec{{v}} = ({x2}, {y2})\\). Tính tích vô hướng \\(\\vec{{u}} \\cdot \\vec{{v}}\\)."
        )

        dsl = TriangleVectorDSL(
            type="tam_giac_vector",
            operation="vector_dot_product",
            u=[str(x1), str(y1)],
            v=[str(x2), str(y2)],
            restate_vi=f"Tính tích vô hướng của u = ({x1}, {y1}) và v = ({x2}, {y2})",
        )

        def calc_distractors(result: Any, correct_latex: str) -> list[DistractorSpec]:
            distractors = []
            seen = {dot_val}

            # Distractor 1: Nhầm dấu trừ: x1*x2 - y1*y2
            d1 = x1 * x2 - y1 * y2
            if d1 in seen:
                d1 = -dot_val
            seen.add(d1)
            distractors.append(
                DistractorSpec(
                    latex=f"\\(\\vec{{u}} \\cdot \\vec{{v}} = {d1}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_SIGN_FLIP_EQUATION,
                    description_vi="Nhầm dấu phép cộng thành dấu trừ giữa hai tích tọa độ: x1*x2 - y1*y2.",
                    severity="high",
                    remediation_hint="Công thức tích vô hướng trong tọa độ: u . v = x1*x2 + y1*y2 (dấu cộng ở giữa).",
                )
            )

            # Distractor 2: Nhầm định thức tích chéo: x1*y2 - x2*y1
            d2 = x1 * y2 - x2 * y1
            if d2 in seen:
                d2 = dot_val + 3
            seen.add(d2)
            distractors.append(
                DistractorSpec(
                    latex=f"\\(\\vec{{u}} \\cdot \\vec{{v}} = {d2}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_CROSS_PRODUCT_IS_SCALAR,
                    description_vi="Nhầm sang công thức nhân chéo định thức kiểm tra cùng phương: x1*y2 - x2*y1.",
                    severity="high",
                    remediation_hint="Tích vô hướng là tổng tích các tọa độ tương ứng (x1*x2 + y1*y2), không phải nhân chéo.",
                )
            )

            # Distractor 3: Tổng các thành phần: (x1 + x2) + (y1 + y2)
            d3 = (x1 + x2) + (y1 + y2)
            if d3 in seen:
                d3 = dot_val - 4
            seen.add(d3)
            distractors.append(
                DistractorSpec(
                    latex=f"\\(\\vec{{u}} \\cdot \\vec{{v}} = {d3}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_DISTRIBUTIVE_MULTIPLICATION,
                    description_vi="Cộng trực tiếp các thành phần tọa độ thay vì nhân tích.",
                    severity="medium",
                    remediation_hint="Cần nhân từng cặp tọa độ x1*x2 và y1*y2 rồi mới cộng lại.",
                )
            )
            return distractors

        return TemplateOutput(
            template_id=self.template_id,
            category=self.category,
            topic=self.topic,
            subtopic=self.subtopic,
            difficulty=self.difficulty,
            cognitive_level=self.cognitive_level,
            difficulty_score=self.difficulty_score,
            skills=self.skills,
            question_text=question_text,
            dsl=dsl,
            correct_latex=f"\\(\\vec{{u}} \\cdot \\vec{{v}} = {dot_val}\\)",
            distractor_calculator=calc_distractors,
            explanation_vi=(
                f"Bước 1: Áp dụng biểu thức tọa độ của tích vô hướng:<br>"
                f"\\(\\vec{{u}} \\cdot \\vec{{v}} = x_1 x_2 + y_1 y_2\\).<br>"
                f"Bước 2: Thay tọa độ: \\(\\vec{{u}} \\cdot \\vec{{v}} = ({x1})({x2}) + ({y1})({y2}) = {x1 * x2} + ({y1 * y2}) = {dot_val}\\)."
            ),
            socratic_hints=[
                "Bậc 1 (Nudge): Nhớ lại biểu thức tọa độ của tích vô hướng hai vectơ trong mặt phẳng Oxy.",
                "Bậc 2 (Concept Reminder): \\(\\vec{u} \\cdot \\vec{v} = x_1 x_2 + y_1 y_2\\).",
                f"Bậc 3 (Sub-goal): Nhân hoành độ với hoành độ ({x1} * {x2}) và tung độ với tung độ ({y1} * {y2}).",
                f"Bậc 4 (Worked Step): Cộng hai kết quả lại để thu được tích vô hướng: {dot_val}.",
            ],
            common_traps=[
                "Nhầm dấu cộng thành dấu trừ ở giữa",
                "Nhầm sang công thức nhân chéo định thức",
                "Cộng tọa độ thay vì nhân",
            ],
        )
