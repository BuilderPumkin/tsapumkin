"""
Geometry Oxyz Problem Templates (app/generator/templates/geometry_oxyz.py)
Category: geometry_oxyz
Generates 3D planes, spheres, and distances with strict mathematical rigor.
"""

import random
from typing import Any

from app.generator.models import DistractorSpec, TemplateOutput
from app.generator.templates.base import BaseProblemTemplate
from app.schemas.dsl import GeometryOxyzDSL
from app.schemas.generate import DifficultyEnum
from app.schemas.traps import MisconceptionTrapEnum


class PlanePointNormalTemplate(BaseProblemTemplate):
    """
    Template: Lập phương trình mặt phẳng đi qua M(x0, y0, z0) có VTPT n = (A, B, C).
    Phương trình: A(x - x0) + B(y - y0) + C(z - z0) = 0
    Khai triển: Ax + By + Cz + D = 0 với D = -(A*x0 + B*y0 + C*z0).
    """

    template_id = "tmpl_oxyz_plane_point_normal"
    category = "geometry_oxyz"
    topic = "Hình học Oxyz"
    subtopic = "Phương trình mặt phẳng"
    difficulty = DifficultyEnum.M1
    cognitive_level = "M1"
    difficulty_score = 0.38
    skills = ["skill_spatial", "skill_calculation"]

    def generate(self, rng: random.Random) -> TemplateOutput:
        x0 = rng.choice([-3, -2, -1, 1, 2, 3])
        y0 = rng.choice([-3, -2, -1, 1, 2, 3])
        z0 = rng.choice([-3, -2, -1, 1, 2, 3])

        A = rng.choice([1, 2, 3])
        B = rng.choice([-3, -2, -1, 1, 2])
        C = rng.choice([-2, -1, 1, 2, 3])

        # D = -(A*x0 + B*y0 + C*z0)
        D = -(A * x0 + B * y0 + C * z0)

        def _format_plane(a_c: int, b_c: int, c_c: int, d_c: int) -> str:
            # Term x
            s_x = f"{a_c}x" if a_c != 1 else "x"
            # Term y
            s_y = f"+ {b_c}y" if b_c > 0 else f"- {abs(b_c)}y"
            if abs(b_c) == 1:
                s_y = "+ y" if b_c == 1 else "- y"
            # Term z
            s_z = f"+ {c_c}z" if c_c > 0 else f"- {abs(c_c)}z"
            if abs(c_c) == 1:
                s_z = "+ z" if c_c == 1 else "- z"
            # Term D
            s_d = f"+ {d_c}" if d_c > 0 else (f"- {abs(d_c)}" if d_c < 0 else "")
            return f"{s_x} {s_y} {s_z} {s_d} = 0".replace("  ", " ").strip()

        correct_eq = _format_plane(A, B, C, D)
        question_text = (
            f"Trong không gian \\(Oxyz\\), viết phương trình mặt phẳng \\((P)\\) đi qua điểm "
            f"\\(M({x0}, {y0}, {z0})\\) và nhận vectơ \\(\\vec{{n}} = ({A}, {B}, {C})\\) làm vectơ pháp tuyến."
        )

        dsl = GeometryOxyzDSL(
            type="geometry_oxyz",
            operation="plane_from_point_and_normal",
            point_M=[str(x0), str(y0), str(z0)],
            vector_n=[str(A), str(B), str(C)],
            restate_vi=f"Lập phương trình mặt phẳng qua M({x0}, {y0}, {z0}) có VTPT n = ({A}, {B}, {C})",
        )

        def calc_distractors(result: Any, correct_latex: str) -> list[DistractorSpec]:
            distractors = []
            seen = {correct_eq}

            # Distractor 1: Sai dấu hệ số tự do D (cộng thay vì trừ tích: D' = +(A*x0 + B*y0 + C*z0))
            d1_eq = _format_plane(A, B, C, -D if D != 0 else D + 2)
            if d1_eq in seen:
                d1_eq = _format_plane(A, B, C, D + 4)
            seen.add(d1_eq)
            distractors.append(
                DistractorSpec(
                    latex=f"\\({d1_eq}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_SIGN_FLIP_EQUATION,
                    description_vi="Sai dấu hệ số tự do: lấy D = A*x0 + B*y0 + C*z0 thay vì -(A*x0 + B*y0 + C*z0).",
                    severity="high",
                    remediation_hint="Phương trình là A(x - x0) + B(y - y0) + C(z - z0) = 0 nên khi chuyển vế D = -(Ax0 + By0 + Cz0).",
                )
            )

            # Distractor 2: Nhầm dấu tọa độ điểm: A(x + x0) + B(y + y0) + C(z + z0) = 0
            d_wrong_pts = -(A * (-x0) + B * (-y0) + C * (-z0))
            d2_eq = _format_plane(A, B, C, d_wrong_pts)
            if d2_eq in seen:
                d2_eq = _format_plane(A, B, C, D - 3)
            seen.add(d2_eq)
            distractors.append(
                DistractorSpec(
                    latex=f"\\({d2_eq}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_SIGN_FLIP_EQUATION,
                    description_vi="Nhầm dấu tọa độ điểm: dùng (x + x0) thay vì (x - x0).",
                    severity="medium",
                    remediation_hint="Công thức mặt phẳng đi qua M(x0, y0, z0) luôn có dạng A(x - x0), mang dấu trừ trước tọa độ điểm.",
                )
            )

            # Distractor 3: Đổi chỗ VTPT với điểm M
            d3_eq = _format_plane(abs(x0) or 1, y0 or 2, z0 or 3, D + 1)
            if d3_eq in seen:
                d3_eq = _format_plane(A, B, C, D + 6)
            seen.add(d3_eq)
            distractors.append(
                DistractorSpec(
                    latex=f"\\({d3_eq}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_DISTRIBUTIVE_MULTIPLICATION,
                    description_vi="Nhầm lẫn vị trí của tọa độ điểm M và các thành phần VTPT n.",
                    severity="high",
                    remediation_hint="Các hệ số trước x, y, z bắt buộc phải là tọa độ của VTPT n = (A, B, C).",
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
            correct_latex=f"\\({correct_eq}\\)",
            distractor_calculator=calc_distractors,
            explanation_vi=(
                f"Bước 1: Mặt phẳng \\((P)\\) đi qua \\(M({x0}, {y0}, {z0})\\) có VTPT \\(\\vec{{n}} = ({A}, {B}, {C})\\) có phương trình:<br>"
                f"\\({A}(x - {x0}) + {B}(y - {y0}) + {C}(z - {z0}) = 0\\).<br>"
                f"Bước 2: Khai triển và rút gọn: \\({correct_eq}\\)."
            ),
            socratic_hints=[
                "Bậc 1 (Nudge): Nhớ lại dạng tổng quát của phương trình mặt phẳng khi biết một điểm đi qua và vectơ pháp tuyến.",
                "Bậc 2 (Concept Reminder): \\(A(x - x_0) + B(y - y_0) + C(z - z_0) = 0\\).",
                f"Bậc 3 (Sub-goal): Thế tọa độ điểm M({x0}, {y0}, {z0}) và VTPT n({A}, {B}, {C}) vào công thức.",
                f"Bậc 4 (Worked Step): Nhân phân phối và rút gọn hệ số tự do để thu được {correct_eq}.",
            ],
            common_traps=[
                "Sai dấu hệ số tự do D",
                "Dùng dấu cộng (x + x0) thay vì (x - x0)",
                "Nhầm lẫn giữa VTPT và tọa độ điểm",
            ],
        )


class DistancePointToPlaneTemplate(BaseProblemTemplate):
    """
    Template: Khoảng cách từ M(x0, y0, z0) đến mặt phẳng Ax + By + Cz + D = 0.
    Chọn (A, B, C) có độ dài đẹp: (1, 2, -2) -> len = 3; (2, -1, 2) -> len = 3.
    Chọn M và D sao cho d nguyên: d = |Ax0 + By0 + Cz0 + D| / 3.
    """

    template_id = "tmpl_oxyz_distance_point_plane"
    category = "geometry_oxyz"
    topic = "Hình học Oxyz"
    subtopic = "Khoảng cách trong Oxyz"
    difficulty = DifficultyEnum.M2
    cognitive_level = "M2"
    difficulty_score = 0.52
    skills = ["skill_spatial", "skill_calculation"]

    def generate(self, rng: random.Random) -> TemplateOutput:
        # A, B, C with norm 3
        A, B, C = rng.choice([(1, 2, -2), (2, -1, 2), (2, 2, 1), (-2, 1, 2)])
        x0, y0, z0 = rng.randint(0, 2), rng.randint(0, 2), rng.randint(0, 2)

        # We want target distance d in {1, 2, 3, 4}
        target_d = rng.randint(1, 4)
        # |A*x0 + B*y0 + C*z0 + D| = 3 * target_d
        val = A * x0 + B * y0 + C * z0
        # Choose D so numerator is negative before absolute value to test MIS_PLANE_DISTANCE_NO_ABS
        D = -val - 3 * target_d

        plane_str = f"{A}x + {B}y + {C}z + {D} = 0".replace("+ -", "- ")
        question_text = (
            f"Trong không gian \\(Oxyz\\), tính khoảng cách \\(d\\) từ điểm "
            f"\\(M({x0}, {y0}, {z0})\\) đến mặt phẳng \\((P): {plane_str}\\)."
        )

        dsl = GeometryOxyzDSL(
            type="geometry_oxyz",
            operation="distance_point_to_plane",
            point_M=[str(x0), str(y0), str(z0)],
            plane_coeffs=[str(A), str(B), str(C), str(D)],
            restate_vi=f"Tính khoảng cách từ M({x0}, {y0}, {z0}) đến mặt phẳng {plane_str}",
        )

        def calc_distractors(result: Any, correct_latex: str) -> list[DistractorSpec]:
            distractors = []
            seen = {target_d}

            # Distractor 1: Quên trị tuyệt đối dẫn đến khoảng cách âm hoặc sai: -target_d
            d1 = -target_d
            seen.add(d1)
            distractors.append(
                DistractorSpec(
                    latex=f"\\(d = {d1}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_PLANE_DISTANCE_NO_ABS,
                    description_vi="Quên lấy dấu giá trị tuyệt đối ở tử số trong công thức khoảng cách.",
                    severity="critical",
                    remediation_hint="Khoảng cách là một độ dài hình học luôn không âm: d = |Ax0 + By0 + Cz0 + D| / sqrt(A^2 + B^2 + C^2) >= 0.",
                )
            )

            # Distractor 2: Quên căn ở mẫu số: (3 * target_d) / 9 = target_d / 3
            d2 = round(target_d / 3, 2) if round(target_d / 3, 2) not in seen else target_d + 1
            seen.add(d2)
            distractors.append(
                DistractorSpec(
                    latex=f"\\(d = {d2}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_RADICAL_SUM_CONFUSION,
                    description_vi="Quên lấy căn bậc hai của tổng bình phương các hệ số ở mẫu số.",
                    severity="high",
                    remediation_hint="Mẫu số của công thức khoảng cách là độ dài VTPT: sqrt(A^2 + B^2 + C^2).",
                )
            )

            # Distractor 3: Quên hệ số tự do D
            num_no_d = abs(A * x0 + B * y0 + C * z0)
            d3 = round(num_no_d / 3, 2)
            if d3 in seen:
                d3 = target_d + 2
            seen.add(d3)
            distractors.append(
                DistractorSpec(
                    latex=f"\\(d = {d3}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_DISTRIBUTIVE_MULTIPLICATION,
                    description_vi="Quên cộng hệ số tự do D trong biểu thức tử số.",
                    severity="medium",
                    remediation_hint="Cần thay đầy đủ tọa độ điểm M vào toàn bộ vế trái Ax + By + Cz + D của phương trình mặt phẳng.",
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
            correct_latex=f"\\(d = {target_d}\\)",
            distractor_calculator=calc_distractors,
            explanation_vi=(
                f"Bước 1: Áp dụng công thức khoảng cách từ điểm \\(M(x_0, y_0, z_0)\\) đến mặt phẳng \\((P)\\):<br>"
                f"\\(d(M, (P)) = \\frac{{|A x_0 + B y_0 + C z_0 + D|}}{{\\sqrt{{A^2 + B^2 + C^2}}}}\\).<br>"
                f"Bước 2: Thay số: \\(d = \\frac{{|{A}({x0}) + {B}({y0}) + {C}({z0}) + ({D})|}}{{\\sqrt{{{A}^2 + ({B})^2 + ({C})^2}}}} = \\frac{{{abs(3 * target_d)}}}{{3}} = {target_d}\\)."
            ),
            socratic_hints=[
                "Bậc 1 (Nudge): Nhớ lại công thức tính khoảng cách từ một điểm đến một mặt phẳng trong Oxyz.",
                "Bậc 2 (Concept Reminder): \\(d = \\frac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}\\).",
                "Bậc 3 (Sub-goal): Tính giá trị biểu thức trong dấu giá trị tuyệt đối ở tử số và độ dài vectơ pháp tuyến ở mẫu số.",
                f"Bậc 4 (Worked Step): Chia tử số cho mẫu số để thu được khoảng cách d = {target_d}.",
            ],
            common_traps=[
                "Quên lấy trị tuyệt đối ở tử số dẫn đến khoảng cách âm",
                "Quên lấy căn bậc hai ở mẫu số",
                "Quên cộng hệ số tự do D",
            ],
        )


class SphereEquationTemplate(BaseProblemTemplate):
    """
    Template: Lập phương trình mặt cầu tâm I(a, b, c) và bán kính R.
    Phương trình: (x - a)^2 + (y - b)^2 + (z - c)^2 = R^2.
    a, b, c in [-3, 3], R in [2, 5].
    """

    template_id = "tmpl_oxyz_sphere_center_radius"
    category = "geometry_oxyz"
    topic = "Hình học Oxyz"
    subtopic = "Phương trình mặt cầu"
    difficulty = DifficultyEnum.M1
    cognitive_level = "M1"
    difficulty_score = 0.35
    skills = ["skill_spatial", "skill_calculation"]

    def generate(self, rng: random.Random) -> TemplateOutput:
        a = rng.choice([-3, -2, -1, 1, 2, 3])
        b = rng.choice([-3, -2, -1, 1, 2, 3])
        c = rng.choice([-3, -2, -1, 1, 2, 3])
        R = rng.randint(2, 5)
        r_sq = R * R

        def _format_sphere(ca: int, cb: int, cc: int, r_val: int) -> str:
            ta = f"(x - {ca})^2" if ca > 0 else f"(x + {abs(ca)})^2"
            tb = f"(y - {cb})^2" if cb > 0 else f"(y + {abs(cb)})^2"
            tc = f"(z - {cc})^2" if cc > 0 else f"(z + {abs(cc)})^2"
            return f"{ta} + {tb} + {tc} = {r_val}"

        correct_eq = _format_sphere(a, b, c, r_sq)
        question_text = (
            f"Trong không gian \\(Oxyz\\), lập phương trình mặt cầu \\((S)\\) có tâm "
            f"\\(I({a}, {b}, {c})\\) và bán kính \\(R = {R}\\)."
        )

        dsl = GeometryOxyzDSL(
            type="geometry_oxyz",
            operation="sphere_equation_from_center_and_radius",
            point_I=[str(a), str(b), str(c)],
            radius=str(R),
            restate_vi=f"Lập phương trình mặt cầu tâm I({a}, {b}, {c}) bán kính R = {R}",
        )

        def calc_distractors(result: Any, correct_latex: str) -> list[DistractorSpec]:
            distractors = []
            seen = {correct_eq}

            # Distractor 1: Quên bình phương bán kính R (để vế phải là R thay vì R^2)
            d1_eq = _format_sphere(a, b, c, R)
            seen.add(d1_eq)
            distractors.append(
                DistractorSpec(
                    latex=f"\\({d1_eq}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_SQUARE_BINOMIAL_MISSING_2AB,
                    description_vi="Quên bình phương bán kính R ở vế phải của phương trình mặt cầu.",
                    severity="high",
                    remediation_hint="Vế phải của phương trình chính tắc mặt cầu là R^2, không phải R.",
                )
            )

            # Distractor 2: Nhầm dấu tọa độ tâm I: dùng (x + a)^2 thay vì (x - a)^2
            d2_eq = _format_sphere(-a, -b, -c, r_sq)
            seen.add(d2_eq)
            distractors.append(
                DistractorSpec(
                    latex=f"\\({d2_eq}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_SIGN_FLIP_EQUATION,
                    description_vi="Nhầm dấu tọa độ tâm: dùng (x + a) thay vì (x - a).",
                    severity="medium",
                    remediation_hint="Tâm I(a, b, c) tương ứng với các biểu thức (x - a), (y - b), (z - c).",
                )
            )

            # Distractor 3: Vế phải âm (quên điều kiện R^2 > 0)
            d3_eq = _format_sphere(a, b, c, -r_sq)
            seen.add(d3_eq)
            distractors.append(
                DistractorSpec(
                    latex=f"\\({d3_eq}\\)",
                    misconception_id=MisconceptionTrapEnum.MIS_SPHERE_RADIUS_INVALID,
                    description_vi="Vế phải mang giá trị âm, vi phạm điều kiện R^2 > 0 của mặt cầu.",
                    severity="critical",
                    remediation_hint="Bán kính bình phương R^2 luôn phải là một số dương nghiêm ngặt.",
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
            correct_latex=f"\\({correct_eq}\\)",
            distractor_calculator=calc_distractors,
            explanation_vi=(
                f"Bước 1: Phương trình chính tắc mặt cầu tâm \\(I(a, b, c)\\) bán kính \\(R\\) là:<br>"
                f"\\((x - a)^2 + (y - b)^2 + (z - c)^2 = R^2\\).<br>"
                f"Bước 2: Thay tọa độ tâm \\(I({a}, {b}, {c})\\) và bán kính \\(R = {R} \\implies R^2 = {r_sq}\\):<br>"
                f"\\({correct_eq}\\)."
            ),
            socratic_hints=[
                "Bậc 1 (Nudge): Nhớ lại dạng phương trình chính tắc của mặt cầu khi biết tâm và bán kính.",
                "Bậc 2 (Concept Reminder): \\((x - a)^2 + (y - b)^2 + (z - c)^2 = R^2\\).",
                f"Bậc 3 (Sub-goal): Đổi dấu tọa độ tâm I({a}, {b}, {c}) khi đưa vào trong ngoặc (x - a), (y - b), (z - c).",
                f"Bậc 4 (Worked Step): Bình phương bán kính R = {R} để được {r_sq} ở vế phải.",
            ],
            common_traps=[
                "Quên bình phương bán kính R",
                "Nhầm dấu tọa độ tâm",
                "Vi phạm điều kiện R^2 > 0",
            ],
        )
