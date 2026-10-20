"""
Sequence and Progression Problem Templates (app/generator/templates/sequence.py)
Category: day_so_cap_so_cong_cap_so_nhan
Generates arithmetic and geometric progression questions with exact term and sum calculations.
"""

import random
from typing import Any

from app.generator.models import DistractorSpec, TemplateOutput
from app.generator.templates.base import BaseProblemTemplate
from app.schemas.dsl import SequenceProgressionDSL
from app.schemas.generate import DifficultyEnum
from app.schemas.traps import MisconceptionTrapEnum


class ArithmeticNthTermTemplate(BaseProblemTemplate):
    """
    Template: Tìm số hạng thứ n của cấp số cộng: u_n = u_1 + (n - 1)*d.
    u_1 in [1, 9], d in [2, 5], n in [5, 15].
    """

    template_id = "tmpl_ap_nth_term"
    category = "day_so_cap_so_cong_cap_so_nhan"
    topic = "Đại số"
    subtopic = "Cấp số cộng - Cấp số nhân"
    difficulty = DifficultyEnum.M1
    cognitive_level = "M1"
    difficulty_score = 0.35
    skills = ["skill_calculation"]

    def generate(self, rng: random.Random) -> TemplateOutput:
        u1 = rng.randint(1, 8)
        d = rng.randint(2, 5)
        n = rng.randint(5, 12)
        correct_val = u1 + (n - 1) * d

        question_text = (
            f"Cho cấp số cộng \\((u_n)\\) có số hạng đầu \\(u_1 = {u1}\\) và công sai \\(d = {d}\\). "
            f"Tìm số hạng \\(u_{{{n}}}\\)."
        )

        dsl = SequenceProgressionDSL(
            type="day_so_cap_so_cong_cap_so_nhan",
            progression_type="arithmetic",
            target="nth_term",
            u1=str(u1),
            d=str(d),
            n=n,
            restate_vi=f"Tìm số hạng thứ {n} của cấp số cộng u_1 = {u1}, d = {d}",
        )

        def calc_distractors(result: Any, correct_latex: str) -> list[DistractorSpec]:
            distractors = []
            seen = {correct_val}

            # Distractor 1: Dùng n thay vì n - 1 (u_n = u_1 + n*d)
            d1 = u1 + n * d
            seen.add(d1)
            distractors.append(
                DistractorSpec(
                    latex=f"\\(u_{{{n}}} = {d1}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_DISTRIBUTIVE_MULTIPLICATION,
                    description_vi="Nhầm lẫn chỉ số: dùng n thay vì (n - 1) trong công thức u_n = u_1 + (n - 1)d.",
                    severity="high",
                    remediation_hint=f"Công thức đúng là u_n = u_1 + (n - 1)*d. Với n = {n}, số lần cộng công sai d là {n - 1}.",
                )
            )

            # Distractor 2: Nhầm dấu công sai: u_1 - (n - 1)*d
            d2 = u1 - (n - 1) * d
            if d2 in seen:
                d2 = correct_val - 2 * d
            seen.add(d2)
            distractors.append(
                DistractorSpec(
                    latex=f"\\(u_{{{n}}} = {d2}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_SIGN_FLIP_EQUATION,
                    description_vi="Nhầm dấu phép toán cộng công sai thành trừ công sai.",
                    severity="medium",
                    remediation_hint="Công thức tổng quát của CSC là u_n = u_1 + (n - 1)*d (dấu cộng).",
                )
            )

            # Distractor 3: Nhầm chỉ số n - 2
            d3 = u1 + (n - 2) * d
            if d3 in seen:
                d3 = u1 + (n + 1) * d
            seen.add(d3)
            distractors.append(
                DistractorSpec(
                    latex=f"\\(u_{{{n}}} = {d3}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_DISTRIBUTIVE_MULTIPLICATION,
                    description_vi="Trừ sai chỉ số bước nhảy trong cấp số cộng.",
                    severity="medium",
                    remediation_hint="Số bước công sai cộng vào số hạng đầu luôn chính xác là (n - 1).",
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
            correct_latex=f"\\(u_{{{n}}} = {correct_val}\\)",
            distractor_calculator=calc_distractors,
            explanation_vi=(
                f"Bước 1: Áp dụng công thức số hạng tổng quát của cấp số cộng:<br>"
                f"\\(u_n = u_1 + (n - 1)d\\).<br>"
                f"Bước 2: Thay số: \\(u_{{{n}}} = {u1} + ({n} - 1) \\times {d} = {u1} + {n - 1} \\times {d} = {correct_val}\\)."
            ),
            socratic_hints=[
                "Bậc 1 (Nudge): Nhớ lại công thức tìm số hạng tổng quát \\(u_n\\) qua \\(u_1\\) và công sai \\(d\\).",
                "Bậc 2 (Concept Reminder): \\(u_n = u_1 + (n - 1)d\\).",
                f"Bậc 3 (Sub-goal): Tính số khoảng cách công sai: {n} - 1 = {n - 1}.",
                f"Bậc 4 (Worked Step): Nhân {n - 1} với {d} rồi cộng với {u1} để được kết quả.",
            ],
            common_traps=[
                "Dùng n thay vì (n - 1)",
                "Nhầm dấu cộng công sai thành dấu trừ",
            ],
        )


class GeometricNthTermTemplate(BaseProblemTemplate):
    """
    Template: Tìm số hạng thứ n của cấp số nhân: u_n = u_1 * q^(n - 1).
    u_1 in [1, 4], q in [2, 3], n in [3, 5].
    """

    template_id = "tmpl_gp_nth_term"
    category = "day_so_cap_so_cong_cap_so_nhan"
    topic = "Đại số"
    subtopic = "Cấp số cộng - Cấp số nhân"
    difficulty = DifficultyEnum.M1
    cognitive_level = "M1"
    difficulty_score = 0.38
    skills = ["skill_calculation"]

    def generate(self, rng: random.Random) -> TemplateOutput:
        u1 = rng.randint(1, 4)
        q = rng.randint(2, 3)
        n = rng.randint(3, 5)
        correct_val = u1 * (q ** (n - 1))

        question_text = (
            f"Cho cấp số nhân \\((u_n)\\) có số hạng đầu \\(u_1 = {u1}\\) và công bội \\(q = {q}\\). "
            f"Tìm số hạng \\(u_{{{n}}}\\)."
        )

        dsl = SequenceProgressionDSL(
            type="day_so_cap_so_cong_cap_so_nhan",
            progression_type="geometric",
            target="nth_term",
            u1=str(u1),
            q=str(q),
            n=n,
            restate_vi=f"Tìm số hạng thứ {n} của cấp số nhân u_1 = {u1}, q = {q}",
        )

        def calc_distractors(result: Any, correct_latex: str) -> list[DistractorSpec]:
            distractors = []
            seen = {correct_val}

            # Distractor 1: Dùng số mũ n thay vì n - 1 (u_1 * q^n)
            d1 = u1 * (q**n)
            seen.add(d1)
            distractors.append(
                DistractorSpec(
                    latex=f"\\(u_{{{n}}} = {d1}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_DISTRIBUTIVE_MULTIPLICATION,
                    description_vi="Nhầm số mũ của công bội: lấy q^n thay vì q^(n - 1).",
                    severity="high",
                    remediation_hint=f"Công thức đúng là u_n = u_1 * q^(n - 1). Với n = {n}, số mũ của q là {n - 1}.",
                )
            )

            # Distractor 2: Nhầm sang công thức cấp số cộng: u_1 + (n - 1)*q
            d2 = u1 + (n - 1) * q
            if d2 in seen:
                d2 = correct_val + 2
            seen.add(d2)
            distractors.append(
                DistractorSpec(
                    latex=f"\\(u_{{{n}}} = {d2}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_DISTRIBUTIVE_MULTIPLICATION,
                    description_vi="Áp dụng nhầm công thức cấp số cộng cho cấp số nhân.",
                    severity="critical",
                    remediation_hint="Cấp số nhân nhân với lũy thừa công bội u_1 * q^(n - 1), không phải phép cộng u_1 + (n - 1)d.",
                )
            )

            # Distractor 3: Dùng số mũ n - 2
            d3 = u1 * (q ** max(1, n - 2))
            if d3 in seen:
                d3 = correct_val + 4
            seen.add(d3)
            distractors.append(
                DistractorSpec(
                    latex=f"\\(u_{{{n}}} = {d3}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_DISTRIBUTIVE_MULTIPLICATION,
                    description_vi="Tính nhầm bậc lũy thừa của công bội q.",
                    severity="medium",
                    remediation_hint=f"Số mũ của công bội q là {n} - 1 = {n - 1}.",
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
            correct_latex=f"\\(u_{{{n}}} = {correct_val}\\)",
            distractor_calculator=calc_distractors,
            explanation_vi=(
                f"Bước 1: Áp dụng công thức số hạng tổng quát của cấp số nhân:<br>"
                f"\\(u_n = u_1 \\times q^{{n - 1}}\\).<br>"
                f"Bước 2: Thay số: \\(u_{{{n}}} = {u1} \\times ({q})^{{{n} - 1}} = {u1} \\times {q ** (n - 1)} = {correct_val}\\)."
            ),
            socratic_hints=[
                "Bậc 1 (Nudge): Nhớ lại công thức số hạng tổng quát \\(u_n\\) của cấp số nhân.",
                "Bậc 2 (Concept Reminder): \\(u_n = u_1 \\cdot q^{n - 1}\\).",
                f"Bậc 3 (Sub-goal): Tính số mũ của q: {n} - 1 = {n - 1}.",
                f"Bậc 4 (Worked Step): Tính {q}^{n - 1} = {q ** (n - 1)} rồi nhân với {u1} để ra đáp án.",
            ],
            common_traps=[
                "Dùng số mũ n thay vì n - 1",
                "Áp dụng nhầm công thức cấp số cộng cho cấp số nhân",
            ],
        )
