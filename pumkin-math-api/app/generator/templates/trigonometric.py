"""
Trigonometric Problem Templates (app/generator/templates/trigonometric.py)
Category: ham_so_luong_giac_phuong_trinh
Generates root counting and max/min problems for trigonometric functions.
"""

import random
from typing import Any

from app.generator.models import DistractorSpec, TemplateOutput
from app.generator.templates.base import BaseProblemTemplate
from app.schemas.dsl import TrigonometricDSL
from app.schemas.generate import DifficultyEnum
from app.schemas.traps import MisconceptionTrapEnum


class TrigSineRootCountTemplate(BaseProblemTemplate):
    """
    Template: Đếm số nghiệm của phương trình sin(x) = c trên đoạn [0, 2*pi].
    c in {0, 1}.
    - sin(x) = 0 có 3 nghiệm: 0, pi, 2*pi.
    - sin(x) = 1 có 1 nghiệm: pi/2.
    """

    template_id = "tmpl_trig_sine_roots"
    category = "ham_so_luong_giac_phuong_trinh"
    topic = "Giải tích"
    subtopic = "Phương trình lượng giác"
    difficulty = DifficultyEnum.M2
    cognitive_level = "M2"
    difficulty_score = 0.55
    skills = ["skill_reasoning", "skill_calculation"]

    def generate(self, rng: random.Random) -> TemplateOutput:
        c = rng.choice([0, 1])
        if c == 0:
            correct_count = 3
            roots_str = "0, \\pi, 2\\pi"
            eq_text = r"\sin(x) = 0"
        else:
            correct_count = 1
            roots_str = "\\frac{\\pi}{2}"
            eq_text = r"\sin(x) = 1"

        question_text = (
            f"Tìm số nghiệm của phương trình \\({eq_text}\\) trên đoạn \\([0, 2\\pi]\\)."
        )

        dsl = TrigonometricDSL(
            type="ham_so_luong_giac_phuong_trinh",
            operation="count_roots_interval",
            equation=eq_text,
            interval=r"[0, 2\pi]",
            restate_vi=f"Đếm số nghiệm của phương trình {eq_text} trên đoạn [0, 2pi]",
        )

        def calc_distractors(result: Any, correct_latex: str) -> list[DistractorSpec]:
            distractors = []
            seen = {correct_count}

            if c == 0:
                # Distractor 1: Bỏ sót nghiệm biên (chỉ tính khoảng mở (0, 2pi) -> 1 nghiệm: pi)
                d1 = 1
                seen.add(d1)
                distractors.append(
                    DistractorSpec(
                        latex=f"\\({d1}\\)",
                        misconception_id=MisconceptionTrapEnum.MIS_ROOT_LOSS_DIVISION,
                        description_vi="Bỏ sót hai nghiệm tại hai đầu mút biên x = 0 và x = 2*pi do nhầm đoạn với khoảng mở.",
                        severity="high",
                        remediation_hint="Đoạn [0, 2*pi] lấy cả hai điểm mút 0 và 2*pi. Phương trình sin(x) = 0 có nghiệm tại cả 0, pi và 2*pi.",
                    )
                )

                # Distractor 2: Bỏ sót 1 điểm mút (tính được 2 nghiệm)
                d2 = 2
                seen.add(d2)
                distractors.append(
                    DistractorSpec(
                        latex=f"\\({d2}\\)",
                        misconception_id=MisconceptionTrapEnum.MIS_LOG_DOMAIN_IGNORED,
                        description_vi="Chỉ tính nghiệm trên nửa khoảng [0, 2*pi) dẫn đến thiếu nghiệm 2*pi.",
                        severity="medium",
                        remediation_hint="Cần kiểm tra kỹ cả hai đầu mút của đoạn [0, 2*pi].",
                    )
                )

                # Distractor 3: Đếm thừa chu kỳ (4 nghiệm)
                d3 = 4
                seen.add(d3)
                distractors.append(
                    DistractorSpec(
                        latex=f"\\({d3}\\)",
                        misconception_id=MisconceptionTrapEnum.MIS_DISTRIBUTIVE_MULTIPLICATION,
                        description_vi="Đếm thừa nghiệm ngoài đoạn hoặc lặp lại chu kỳ.",
                        severity="medium",
                        remediation_hint="Trên một vòng tròn lượng giác [0, 2*pi], trục sin triệt tiêu tại 3 vị trí: 0, pi và 2*pi.",
                    )
                )
            else:
                # c == 1: Correct is 1 (pi/2)
                d1 = 2
                seen.add(d1)
                distractors.append(
                    DistractorSpec(
                        latex=f"\\({d1}\\)",
                        misconception_id=MisconceptionTrapEnum.MIS_DISTRIBUTIVE_MULTIPLICATION,
                        description_vi="Nhầm sin(x) = 1 có hai nghiệm đối xứng như phương trình sin(x) = a với 0 < a < 1.",
                        severity="high",
                        remediation_hint="Giá trị sin(x) = 1 là điểm cực đại cao nhất của đường tròn lượng giác, chỉ có đúng 1 điểm ngọn pi/2.",
                    )
                )

                d2 = 0
                seen.add(d2)
                distractors.append(
                    DistractorSpec(
                        latex=f"\\({d2}\\)",
                        misconception_id=MisconceptionTrapEnum.MIS_SIGN_FLIP_EQUATION,
                        description_vi="Kết luận phương trình vô nghiệm do nhầm điều kiện nghiệm.",
                        severity="critical",
                        remediation_hint="sin(x) thuộc [-1, 1], do đó sin(x) = 1 luôn có nghiệm thực x = pi/2 + k*2*pi.",
                    )
                )

                d3 = 3
                seen.add(d3)
                distractors.append(
                    DistractorSpec(
                        latex=f"\\({d3}\\)",
                        misconception_id=MisconceptionTrapEnum.MIS_DISTRIBUTIVE_MULTIPLICATION,
                        description_vi="Nhầm số nghiệm của sin(x) = 1 với số nghiệm của sin(x) = 0.",
                        severity="medium",
                        remediation_hint="sin(x) = 1 chỉ có 1 nghiệm trong [0, 2*pi] là pi/2.",
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
            correct_latex=f"\\({correct_count}\\)",
            distractor_calculator=calc_distractors,
            explanation_vi=(
                f"Bước 1: Giải phương trình lượng giác cơ bản: \\({eq_text}\\).<br>"
                f"Bước 2: Tìm các nghiệm thuộc đoạn \\([0, 2\\pi]\\): \\(x \\in \\{{{roots_str}\\}}\\).<br>"
                f"Bước 3: Kết luận số nghiệm là \\({correct_count}\\)."
            ),
            socratic_hints=[
                f"Bậc 1 (Nudge): Quan sát đường tròn lượng giác để tìm các điểm ngọn thỏa mãn {eq_text}.",
                "Bậc 2 (Concept Reminder): Nghiệm tổng quát của \\(\\sin(x) = 0\\) là \\(x = k\\pi\\), của \\(\\sin(x) = 1\\) là \\(x = \\frac{\\pi}{2} + k2\\pi\\).",
                "Bậc 3 (Sub-goal): Cho số nguyên k chạy để tìm các giá trị x nằm trong đoạn [0, 2*pi].",
                f"Bậc 4 (Worked Step): Đếm tổng số nghiệm phân biệt thuộc đoạn: {correct_count}.",
            ],
            common_traps=[
                "Bỏ sót các điểm mút biên x = 0 hoặc x = 2*pi",
                "Nhầm số nghiệm của sin(x) = 1 với sin(x) = 0",
            ],
        )
