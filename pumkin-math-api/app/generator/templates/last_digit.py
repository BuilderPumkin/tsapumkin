"""
Last Digit Problem Templates (app/generator/templates/last_digit.py)
Category: tim_chu_so_tan_cung_luy_thua_lon
Generates last digit of large powers using modular arithmetic cycles.
"""

import random
from typing import Any

from app.generator.models import DistractorSpec, TemplateOutput
from app.generator.templates.base import BaseProblemTemplate
from app.schemas.dsl import LastDigitDSL
from app.schemas.generate import DifficultyEnum
from app.schemas.traps import MisconceptionTrapEnum


class LastDigitPeriod4Template(BaseProblemTemplate):
    """
    Template: Tìm chữ số tận cùng của a^b với a in {2, 3, 7, 8} (chu kỳ 4).
    b in [15, 99].
    """

    template_id = "tmpl_last_digit_period_4"
    category = "tim_chu_so_tan_cung_luy_thua_lon"
    topic = "Số học & Đồng dư"
    subtopic = "Chữ số tận cùng lũy thừa"
    difficulty = DifficultyEnum.M2
    cognitive_level = "M2"
    difficulty_score = 0.52
    skills = ["skill_calculation", "skill_reasoning"]

    CYCLES = {
        2: [2, 4, 8, 6],
        3: [3, 9, 7, 1],
        7: [7, 9, 3, 1],
        8: [8, 4, 2, 6],
    }

    def generate(self, rng: random.Random) -> TemplateOutput:
        base = rng.choice([2, 3, 7, 8])
        cycle = self.CYCLES[base]
        # Generate power b in [15, 99]
        k = rng.randint(4, 24)
        rem = rng.randint(1, 4)  # 1, 2, 3, 4
        exp = 4 * k + rem

        # Correct answer is cycle[rem - 1]
        correct_digit = cycle[rem - 1]

        question_text = f"Tìm chữ số tận cùng của lũy thừa \\({base}^{{{exp}}}\\)."

        dsl = LastDigitDSL(
            type="tim_chu_so_tan_cung_luy_thua_lon",
            base=str(base),
            exponent=str(exp),
            restate_vi=f"Tìm chữ số tận cùng của \\({base}^{{{exp}}}\\)",
        )

        def calc_distractors(result: Any, correct_latex: str) -> list[DistractorSpec]:
            distractors = []
            seen = {correct_digit}

            # Distractor 1: Nhầm phần dư 0 / số dư thành lũy thừa 0 (ra 1 khi base != 1)
            d1 = (
                1
                if base != 1 and 1 not in seen
                else (
                    cycle[(rem % 4)] if cycle[(rem % 4)] not in seen else (correct_digit + 2) % 10
                )
            )
            seen.add(d1)
            distractors.append(
                DistractorSpec(
                    latex=f"\\({d1}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_DISTRIBUTIVE_MULTIPLICATION,
                    description_vi="Nhầm lẫn số mũ chia hết cho chu kỳ với lũy thừa 0 dẫn đến kết luận tận cùng là 1.",
                    severity="high",
                    remediation_hint="Khi số mũ chia hết cho 4, chữ số tận cùng tương ứng với vị trí thứ 4 của chu kỳ, không phải số dư 0.",
                )
            )

            # Distractor 2: Tính nhầm sang cơ số nhân số mũ: (base * exp) % 10
            d2 = (base * exp) % 10
            if d2 in seen:
                # Pick another item from cycle
                for c in cycle:
                    if c not in seen:
                        d2 = c
                        break
            if d2 in seen:
                d2 = (correct_digit + 4) % 10
            seen.add(d2)
            distractors.append(
                DistractorSpec(
                    latex=f"\\({d2}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_DISTRIBUTIVE_MULTIPLICATION,
                    description_vi="Nhầm lẫn giữa phép nâng lên lũy thừa a^b với phép nhân a * b.",
                    severity="critical",
                    remediation_hint="Lũy thừa a^b là tích của b thừa số a, không phải là phép nhân a * b.",
                )
            )

            # Distractor 3: Vị trí kế tiếp trong chu kỳ
            d3 = cycle[(rem) % 4]
            if d3 in seen:
                for cand in [
                    cycle[(rem - 2) % 4],
                    (correct_digit + 1) % 10,
                    (correct_digit + 3) % 10,
                ]:
                    if cand not in seen:
                        d3 = cand
                        break
            seen.add(d3)
            distractors.append(
                DistractorSpec(
                    latex=f"\\({d3}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_DISTRIBUTIVE_MULTIPLICATION,
                    description_vi="Xác định sai số dư khi chia số mũ cho độ dài chu kỳ 4.",
                    severity="medium",
                    remediation_hint=f"Chia số mũ {exp} cho 4 ta được số dư {rem % 4}, đối chiếu đúng vị trí trong chu kỳ {cycle}.",
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
            correct_latex=f"\\({correct_digit}\\)",
            distractor_calculator=calc_distractors,
            explanation_vi=(
                f"Bước 1: Ta xét chu kỳ chữ số tận cùng của \\({base}^k\\): {cycle}. Chu kỳ lặp lại sau mỗi 4 lũy thừa (T = 4).<br>"
                f"Bước 2: Phân tích số mũ theo modulo 4: \\({exp} = 4 \\times {k} + {rem % 4}\\).<br>"
                f"Bước 3: Suy ra chữ số tận cùng của \\({base}^{{{exp}}}\\) chính là chữ số tận cùng của \\({base}^{{{rem}}}\\) là \\({correct_digit}\\)."
            ),
            socratic_hints=[
                f"Bậc 1 (Nudge): Hãy liệt kê chữ số tận cùng của các lũy thừa đầu tiên của {base} để tìm quy luật lặp lại.",
                f"Bậc 2 (Concept Reminder): Dãy chữ số tận cùng của cơ số {base} tuần hoàn theo chu kỳ T = 4: {cycle}.",
                f"Bậc 3 (Sub-goal): Chia số mũ {exp} cho 4 để tìm phần dư.",
                "Bậc 4 (Worked Step): Đối chiếu phần dư với vị trí tương ứng trong chu kỳ để suy ra kết quả.",
            ],
            common_traps=[
                "Nhầm số dư 0 với lũy thừa 0",
                "Tính nhầm a^b thành a * b",
                "Xác định sai vị trí trong chu kỳ lặp",
            ],
        )
