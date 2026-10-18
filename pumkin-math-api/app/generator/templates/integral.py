"""
Definite Integral Problem Templates (app/generator/templates/integral.py)
Category: nguyen_ham_tich_phan
Generates mathematically rigorous definite integrals with beautiful integer/fraction results.
"""

import random
from typing import Any

from app.generator.models import DistractorSpec, TemplateOutput
from app.generator.templates.base import BaseProblemTemplate
from app.schemas.dsl import IntegralDSL
from app.schemas.generate import DifficultyEnum
from app.schemas.traps import MisconceptionTrapEnum


class LinearPolynomialIntegralTemplate(BaseProblemTemplate):
    """
    Template: \\int_a^b (m*x + c) dx
    Constraints: m in {2, 4, 6} (even, so m/2 is integer), c in [-4, 4] \\ {0}, 0 <= a < b <= 4.
    """

    template_id = "tmpl_integral_linear"
    category = "nguyen_ham_tich_phan"
    topic = "Giải tích"
    subtopic = "Nguyên hàm - Tích phân"
    difficulty = DifficultyEnum.M1
    cognitive_level = "M1"
    difficulty_score = 0.35
    skills = ["skill_calculation"]

    def generate(self, rng: random.Random) -> TemplateOutput:
        m = rng.choice([2, 4, 6])
        c = rng.choice([-4, -3, -2, -1, 1, 2, 3, 4])
        a = rng.randint(0, 2)
        b = a + rng.randint(1, 2)

        # F(x) = (m // 2)*x^2 + c*x
        k = m // 2
        f_b = k * (b**2) + c * b
        f_a = k * (a**2) + c * a
        exact_val = f_b - f_a

        integrand_str = f"{m}*x + {c}" if c > 0 else f"{m}*x - {abs(c)}"
        integrand_latex = f"{m}x + {c}" if c > 0 else f"{m}x - {abs(c)}"
        question_text = (
            f"Tính tích phân xác định \\(I = \\int_{{{a}}}^{{{b}}} ({integrand_latex}) \\, dx\\)."
        )

        dsl = IntegralDSL(
            type="nguyen_ham_tich_phan",
            integrand=integrand_str,
            variable="x",
            lower_bound=str(a),
            upper_bound=str(b),
            restate_vi=f"Tính tích phân \\(\\int_{{{a}}}^{{{b}}} ({integrand_latex}) dx\\)",
        )

        def calc_distractors(result: Any, correct_latex: str) -> list[DistractorSpec]:
            distractors: list[DistractorSpec] = []

            # Distractor 1: Quên chia cho 2 khi lấy nguyên hàm của x (mx^2 thay vì (m/2)x^2)
            d1_val = (m * (b**2) + c * b) - (m * (a**2) + c * a)
            if d1_val == exact_val:
                d1_val = exact_val + 2
            distractors.append(
                DistractorSpec(
                    latex=f"\\(I = {d1_val}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_DERIVATIVE_PRODUCT_RULE,
                    description_vi="Quên chia cho 2 khi tính nguyên hàm của mx: lấy mx^2 thay vì (m/2)x^2.",
                    severity="high",
                    remediation_hint="Nguyên hàm của x là x^2/2, do đó nguyên hàm của m*x là (m/2)*x^2.",
                )
            )

            # Distractor 2: Sai dấu cận (lấy F(a) - F(b) thay vì F(b) - F(a))
            d2_val = -exact_val
            if d2_val in (exact_val, d1_val):
                d2_val = exact_val + (1 if exact_val > 0 else -1)
            distractors.append(
                DistractorSpec(
                    latex=f"\\(I = {d2_val}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_SIGN_FLIP_EQUATION,
                    description_vi="Áp dụng nhầm công thức Newton-Leibniz: lấy F(a) - F(b) thay vì F(b) - F(a).",
                    severity="medium",
                    remediation_hint="Định lý Newton-Leibniz: Tích phân từ a đến b là F(b) - F(a) (cận trên trừ cận dưới).",
                )
            )

            # Distractor 3: Quên trừ cận dưới (chỉ tính F(b))
            d3_val = f_b
            used_vals = {exact_val, d1_val, d2_val}
            if d3_val in used_vals:
                d3_val = exact_val + 3
            distractors.append(
                DistractorSpec(
                    latex=f"\\(I = {d3_val}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_DISTRIBUTIVE_MULTIPLICATION,
                    description_vi="Chỉ thay cận trên F(b) vào nguyên hàm mà quên trừ đi giá trị tại cận dưới F(a).",
                    severity="medium",
                    remediation_hint="Sau khi tìm nguyên hàm F(x), bắt buộc phải tính hiệu số F(b) - F(a).",
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
            correct_latex=f"\\(I = {exact_val}\\)",
            distractor_calculator=calc_distractors,
            explanation_vi=(
                f"Bước 1: Tìm một nguyên hàm: \\(F(x) = \\int ({integrand_latex}) dx = {k}x^2 + {c}x\\).<br>"
                f"Bước 2: Áp dụng công thức Newton-Leibniz:<br>"
                f"\\(I = F({b}) - F({a}) = [{k}({b})^2 + ({c})({b})] - [{k}({a})^2 + ({c})({a})] = {f_b} - ({f_a}) = {exact_val}\\)."
            ),
            socratic_hints=[
                "Bậc 1 (Nudge): Quan sát hàm dưới dấu tích phân và xác định bảng nguyên hàm cơ bản.",
                "Bậc 2 (Concept Reminder): Sử dụng công thức Newton-Leibniz: \\(\\int_a^b f(x)dx = F(b) - F(a)\\).",
                "Bậc 3 (Sub-goal): Hãy tìm nguyên hàm F(x) của biểu thức đa thức đã cho.",
                f"Bậc 4 (Worked Step): Thế cận b = {b} và a = {a} vào F(x) rồi lấy hiệu hai giá trị.",
            ],
            common_traps=[
                "Quên chia hệ số khi lấy nguyên hàm của x",
                "Nhầm thứ tự cận trên và cận dưới trong công thức Newton-Leibniz",
                "Quên trừ giá trị hàm tại cận dưới",
            ],
        )


class QuadraticMonomialIntegralTemplate(BaseProblemTemplate):
    """
    Template: \\int_0^b 3k x^2 dx = k b^3
    Constraints: k in [1, 3], b in [1, 3].
    """

    template_id = "tmpl_integral_quadratic"
    category = "nguyen_ham_tich_phan"
    topic = "Giải tích"
    subtopic = "Nguyên hàm - Tích phân"
    difficulty = DifficultyEnum.M1
    cognitive_level = "M1"
    difficulty_score = 0.38
    skills = ["skill_calculation"]

    def generate(self, rng: random.Random) -> TemplateOutput:
        k = rng.randint(1, 3)
        coeff = 3 * k
        b = rng.randint(1, 3)
        exact_val = k * (b**3)

        question_text = f"Tính tích phân \\(I = \\int_{{0}}^{{{b}}} {coeff}x^2 \\, dx\\)."

        dsl = IntegralDSL(
            type="nguyen_ham_tich_phan",
            integrand=f"{coeff}*x^2",
            variable="x",
            lower_bound="0",
            upper_bound=str(b),
            restate_vi=f"Tính tích phân \\(\\int_{{0}}^{{{b}}} {coeff}x^2 dx\\)",
        )

        def calc_distractors(result: Any, correct_latex: str) -> list[DistractorSpec]:
            d1_val = coeff * (b**2)  # Quên chia bậc 3 (nhầm sang đạo hàm)
            d2_val = coeff * (b**3)  # Quên chia 3 khi lấy nguyên hàm
            d3_val = k * (b**2)  # Nhầm bậc lũy thừa
            vals = [d1_val, d2_val, d3_val]
            # Đảm bảo đôi một khác nhau và khác exact_val
            seen = {exact_val}
            final_vals = []
            for v in vals:
                curr = v
                while curr in seen:
                    curr += 1
                seen.add(curr)
                final_vals.append(curr)

            return [
                DistractorSpec(
                    latex=f"\\(I = {final_vals[0]}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_DERIVATIVE_PRODUCT_RULE,
                    description_vi="Nhầm phép tính nguyên hàm sang đạo hàm.",
                    severity="high",
                    remediation_hint="Nguyên hàm của x^2 là x^3/3, không phải đạo hàm 2x.",
                ),
                DistractorSpec(
                    latex=f"\\(I = {final_vals[1]}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_DISTRIBUTIVE_MULTIPLICATION,
                    description_vi="Quên chia cho 3 khi tính nguyên hàm của x^2.",
                    severity="high",
                    remediation_hint="Khi lấy nguyên hàm của x^n cần chia cho (n + 1): \\int x^2 dx = x^3/3.",
                ),
                DistractorSpec(
                    latex=f"\\(I = {final_vals[2]}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_DISTRIBUTIVE_MULTIPLICATION,
                    description_vi="Tính nhầm số mũ của biến sau khi thế cận.",
                    severity="medium",
                    remediation_hint="Thế cận vào x^3 thu được b^3, không phải b^2.",
                ),
            ]

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
            correct_latex=f"\\(I = {exact_val}\\)",
            distractor_calculator=calc_distractors,
            explanation_vi=(
                f"Bước 1: Tìm nguyên hàm: \\(F(x) = \\int {coeff}x^2 dx = {k}x^3\\).<br>"
                f"Bước 2: Áp dụng công thức Newton-Leibniz: \\(I = {k}({b})^3 - {k}(0)^3 = {exact_val}\\)."
            ),
            socratic_hints=[
                "Bậc 1 (Nudge): Nhớ lại nguyên hàm của hàm lũy thừa \\(\\int x^n dx\\).",
                "Bậc 2 (Concept Reminder): \\(\\int x^2 dx = \\frac{x^3}{3}\\).",
                "Bậc 3 (Sub-goal): Rút gọn hệ số \\(\\frac{3k}{3} = k\\) để tìm F(x).",
                f"Bậc 4 (Worked Step): Thế b = {b} vào \\({k}x^3\\) để có kết quả cuối cùng.",
            ],
            common_traps=[
                "Nhầm nguyên hàm sang đạo hàm",
                "Quên chia mẫu số trong công thức lũy thừa",
            ],
        )
