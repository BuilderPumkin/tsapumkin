"""
Planar Area Problem Templates (app/generator/templates/planar_area.py)
Category: dien_tich_hinh_phang / ung_dung_tich_phan_dien_tich_hinh_phang
Generates planar area bounded by curves using definite integrals.
"""

import random
from fractions import Fraction
from typing import Any

from app.generator.models import DistractorSpec, TemplateOutput
from app.generator.templates.base import BaseProblemTemplate
from app.schemas.dsl import PlanarAreaDSL
from app.schemas.generate import DifficultyEnum
from app.schemas.traps import MisconceptionTrapEnum


class ParabolaLineAreaTemplate(BaseProblemTemplate):
    """
    Template: Diện tích hình phẳng giới hạn bởi parabol y = x^2 và đường thẳng y = m*x (m > 0).
    Hoành độ giao điểm: x = 0 và x = m.
    Diện tích S = \\int_0^m (mx - x^2) dx = m^3 / 6.
    m in {1, 2, 3}.
    """

    template_id = "tmpl_area_parabola_line"
    category = "dien_tich_hinh_phang"
    topic = "Giải tích"
    subtopic = "Ứng dụng tích phân tính diện tích"
    difficulty = DifficultyEnum.M2
    cognitive_level = "M2"
    difficulty_score = 0.58
    skills = ["skill_calculation", "skill_reasoning"]

    def generate(self, rng: random.Random) -> TemplateOutput:
        m = rng.choice([1, 2, 3])
        # S = m^3 / 6
        area_frac = Fraction(m**3, 6)
        if area_frac.denominator == 1:
            correct_str = str(area_frac.numerator)
            correct_latex = f"\\(S = {correct_str}\\)"
        else:
            correct_str = f"{area_frac.numerator}/{area_frac.denominator}"
            correct_latex = f"\\(S = \\frac{{{area_frac.numerator}}}{{{area_frac.denominator}}}\\)"

        question_text = (
            f"Tính diện tích \\(S\\) của hình phẳng giới hạn bởi parabol \\((P): y = x^2\\) "
            f"và đường thẳng \\((d): y = {m}x\\)."
        )

        dsl = PlanarAreaDSL(
            type="ung_dung_tich_phan_dien_tich_hinh_phang",
            curve1="x^2",
            curve2=f"{m}*x",
            lower_bound="0",
            upper_bound=str(m),
            restate_vi=f"Tính diện tích hình phẳng giữa y = x^2 và y = {m}x",
        )

        def calc_distractors(result: Any, correct_latex: str) -> list[DistractorSpec]:
            distractors = []
            seen = {correct_str}

            # Distractor 1: Cộng hai phần tích phân thay vì trừ: m^3/2 + m^3/3 = 5*m^3/6
            d1_frac = Fraction(5 * (m**3), 6)
            d1_str = (
                str(d1_frac.numerator)
                if d1_frac.denominator == 1
                else f"{d1_frac.numerator}/{d1_frac.denominator}"
            )
            d1_latex = (
                f"\\(S = {d1_str}\\)"
                if d1_frac.denominator == 1
                else f"\\(S = \\frac{{{d1_frac.numerator}}}{{{d1_frac.denominator}}}\\)"
            )
            seen.add(d1_str)
            distractors.append(
                DistractorSpec(
                    latex=d1_latex,
                    misconception_id=MisconceptionTrapEnum.MIS_SIGN_FLIP_EQUATION,
                    description_vi="Cộng hai hàm số thay vì lấy hiệu f(x) - g(x) khi thiết lập tích phân diện tích.",
                    severity="high",
                    remediation_hint="Công thức diện tích giữa hai đường: S = \\int_a^b |f(x) - g(x)| dx (phải là phép trừ hiệu hai hàm).",
                )
            )

            # Distractor 2: Quên chia cho các lũy thừa: m^3
            d2_frac = Fraction(m**3, 1)
            d2_str = str(d2_frac.numerator)
            if d2_str in seen:
                d2_frac = Fraction(m**3, 3)
                d2_str = (
                    str(d2_frac.numerator)
                    if d2_frac.denominator == 1
                    else f"{d2_frac.numerator}/{d2_frac.denominator}"
                )
            seen.add(d2_str)
            d2_latex = (
                f"\\(S = {d2_str}\\)"
                if d2_frac.denominator == 1
                else f"\\(S = \\frac{{{d2_frac.numerator}}}{{{d2_frac.denominator}}}\\)"
            )
            distractors.append(
                DistractorSpec(
                    latex=d2_latex,
                    misconception_id=MisconceptionTrapEnum.MIS_DERIVATIVE_PRODUCT_RULE,
                    description_vi="Quên chia cho các hệ số lũy thừa khi tính nguyên hàm.",
                    severity="high",
                    remediation_hint="Nguyên hàm của x là x^2/2 và của x^2 là x^3/3.",
                )
            )

            # Distractor 3: Chỉ tính tích phân của parabol từ 0 đến m (m^3/3)
            d3_frac = Fraction(m**3, 3)
            d3_str = (
                str(d3_frac.numerator)
                if d3_frac.denominator == 1
                else f"{d3_frac.numerator}/{d3_frac.denominator}"
            )
            if d3_str in seen:
                d3_frac = Fraction(m**3, 2)
                d3_str = (
                    str(d3_frac.numerator)
                    if d3_frac.denominator == 1
                    else f"{d3_frac.numerator}/{d3_frac.denominator}"
                )
            seen.add(d3_str)
            d3_latex = (
                f"\\(S = {d3_str}\\)"
                if d3_frac.denominator == 1
                else f"\\(S = \\frac{{{d3_frac.numerator}}}{{{d3_frac.denominator}}}\\)"
            )
            distractors.append(
                DistractorSpec(
                    latex=d3_latex,
                    misconception_id=MisconceptionTrapEnum.MIS_DISTRIBUTIVE_MULTIPLICATION,
                    description_vi="Chỉ tính diện tích dưới một đường cong mà quên trừ đi đường cong còn lại.",
                    severity="medium",
                    remediation_hint="Cần tính tích phân của hàm hiệu (mx - x^2) trên đoạn giao điểm [0, m].",
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
            correct_latex=correct_latex,
            distractor_calculator=calc_distractors,
            explanation_vi=(
                f"Bước 1: Phương trình hoành độ giao điểm: \\(x^2 = {m}x \\iff x(x - {m}) = 0 \\iff x = 0\\) hoặc \\(x = {m}\\).<br>"
                f"Bước 2: Trên đoạn \\([0, {m}]\\), ta có \\({m}x \\ge x^2\\).<br>"
                f"Bước 3: Diện tích hình phẳng: \\(S = \\int_0^{{{m}}} ({m}x - x^2) dx = \\left[ \\frac{{{m}x^2}}{{2}} - \\frac{{x^3}}{{3}} \\right]_0^{{{m}}} = {correct_latex}\\)."
            ),
            socratic_hints=[
                "Bậc 1 (Nudge): Hãy tìm hoành độ giao điểm của hai đồ thị để xác định hai cận của tích phân.",
                "Bậc 2 (Concept Reminder): Diện tích giữa hai đường cong: \\(S = \\int_a^b |f(x) - g(x)| dx\\).",
                f"Bậc 3 (Sub-goal): Giải phương trình \\(x^2 = {m}x\\) tìm hai nghiệm x = 0 và x = {m}.",
                f"Bậc 4 (Worked Step): Tính \\(\\int_0^{{{m}}} ({m}x - x^2) dx\\) để suy ra kết quả.",
            ],
            common_traps=[
                "Cộng hai hàm thay vì trừ hiệu hai hàm",
                "Quên chia hệ số lũy thừa khi tính nguyên hàm",
                "Quên trừ đường thẳng, chỉ tính diện tích dưới parabol",
            ],
        )
