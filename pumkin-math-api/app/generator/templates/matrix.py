"""
Matrix Algebra Problem Templates (app/generator/templates/matrix.py)
Category: dai_so_ma_tran_dinh_thuc
Generates determinant and basic matrix arithmetic questions.
"""

import random
from typing import Any

from app.generator.models import DistractorSpec, TemplateOutput
from app.generator.templates.base import BaseProblemTemplate
from app.schemas.dsl import MatrixAlgebraDSL
from app.schemas.generate import DifficultyEnum
from app.schemas.traps import MisconceptionTrapEnum


class MatrixDeterminant2x2Template(BaseProblemTemplate):
    """
    Template: Tính định thức của ma trận vuông cấp 2: A = [[a, b], [c, d]]
    det(A) = a*d - b*c.
    Constraints: a, b, c, d in [-4, 5] \\ {0}, det(A) != 0.
    """

    template_id = "tmpl_matrix_det_2x2"
    category = "dai_so_ma_tran_dinh_thuc"
    topic = "Đại số ma trận"
    subtopic = "Định thức ma trận"
    difficulty = DifficultyEnum.M1
    cognitive_level = "M1"
    difficulty_score = 0.35
    skills = ["skill_calculation"]

    def generate(self, rng: random.Random) -> TemplateOutput:
        while True:
            a = rng.choice([-3, -2, -1, 1, 2, 3, 4])
            b = rng.choice([-3, -2, -1, 1, 2, 3, 4])
            c = rng.choice([-3, -2, -1, 1, 2, 3, 4])
            d = rng.choice([-3, -2, -1, 1, 2, 3, 4])
            det_val = a * d - b * c
            if det_val != 0:
                break

        question_text = (
            f"Cho ma trận \\(A = \\begin{{pmatrix}} {a} & {b} \\\\ {c} & {d} \\end{{pmatrix}}\\). "
            f"Tính định thức \\(\\det(A)\\)."
        )

        dsl = MatrixAlgebraDSL(
            type="dai_so_ma_tran_dinh_thuc",
            operation="determinant",
            matrix=[[a, b], [c, d]],
            restate_vi=f"Tính định thức ma trận 2x2: det([[ {a}, {b} ], [ {c}, {d} ]])",
        )

        def calc_distractors(result: Any, correct_latex: str) -> list[DistractorSpec]:
            distractors = []
            seen = {det_val}

            # Distractor 1: Quên đổi dấu tích đường chéo phụ (lấy ad + bc)
            d1 = a * d + b * c
            if d1 in seen:
                d1 = det_val + 2
            seen.add(d1)
            distractors.append(
                DistractorSpec(
                    latex=f"\\(\\det(A) = {d1}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_SIGN_FLIP_EQUATION,
                    description_vi="Cộng tích hai đường chéo thay vì trừ đường chéo phụ: ad + bc.",
                    severity="high",
                    remediation_hint="Công thức định thức cấp 2: det(A) = a*d - b*c (đường chéo chính TRỪ đường chéo phụ).",
                )
            )

            # Distractor 2: Lấy đường chéo phụ trừ đường chéo chính (bc - ad = -det)
            d2 = b * c - a * d
            if d2 in seen:
                d2 = det_val - 2
            seen.add(d2)
            distractors.append(
                DistractorSpec(
                    latex=f"\\(\\det(A) = {d2}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_SIGN_FLIP_EQUATION,
                    description_vi="Lấy tích đường chéo phụ trừ đường chéo chính: bc - ad.",
                    severity="medium",
                    remediation_hint="Cần lấy tích đường chéo chính trừ đường chéo phụ: det(A) = a*d - b*c.",
                )
            )

            # Distractor 3: Nhầm định thức với vết ma trận (tr(A) = a + d)
            d3 = a + d
            if d3 in seen:
                d3 = a * d
            if d3 in seen:
                d3 = det_val + 4
            seen.add(d3)
            distractors.append(
                DistractorSpec(
                    latex=f"\\(\\det(A) = {d3}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_DISTRIBUTIVE_MULTIPLICATION,
                    description_vi="Nhầm lẫn giữa định thức det(A) với vết của ma trận tr(A) = a + d.",
                    severity="high",
                    remediation_hint="Vết tr(A) là tổng các phần tử trên đường chéo chính (a + d), còn định thức là a*d - b*c.",
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
            correct_latex=f"\\(\\det(A) = {det_val}\\)",
            distractor_calculator=calc_distractors,
            explanation_vi=(
                f"Bước 1: Áp dụng công thức định thức ma trận vuông cấp 2:<br>"
                f"\\(\\det(A) = a \\cdot d - b \\cdot c\\).<br>"
                f"Bước 2: Thay số: \\(\\det(A) = ({a})({d}) - ({b})({c}) = {a * d} - ({b * c}) = {det_val}\\)."
            ),
            socratic_hints=[
                "Bậc 1 (Nudge): Nhận diện ma trận vuông cấp 2 và nhớ lại công thức tính định thức.",
                "Bậc 2 (Concept Reminder): \\(\\det(A) = a_{11} a_{22} - a_{12} a_{21}\\).",
                f"Bậc 3 (Sub-goal): Tính tích đường chéo chính: ({a}) * ({d}) = {a * d}.",
                f"Bậc 4 (Worked Step): Trừ đi tích đường chéo phụ ({b}) * ({c}) = {b * c} để có đáp án.",
            ],
            common_traps=[
                "Cộng hai tích đường chéo thay vì trừ",
                "Lấy đường chéo phụ trừ đường chéo chính",
                "Nhầm định thức với vết ma trận",
            ],
        )
