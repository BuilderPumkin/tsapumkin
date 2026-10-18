"""
Unit & Adversarial Tests for Pedagogical Scaffolding & Verification Engine
Prompt 8 Acceptance Suite:
1. 30+ sample solutions across all 8 CAS domains pass zero-alien-number verification.
2. Adversarial test: simulated alien number in LLM rephrase triggers rejection and fallback.
3. Strict KaTeX syntax check (no raw $, properly balanced delimiters).
4. Socratic 4-tier graduated scaffolding verification (Nudge, Concept, Sub-goal, Worked Step).
5. Socratic safety: Sub-goal tier NEVER reveals final answer.
6. Misconception feedback verification (encouraging tone and accurate trap warnings).
7. End-to-end integration via POST /v1/solve.
"""

import pytest

from app.parser.llm_client import FakeLLMClient
from app.pedagogy.engine import generate_pedagogical_guidance
from app.pedagogy.misconceptions import get_misconception_feedback
from app.pedagogy.templates import build_socratic_hints
from app.pedagogy.verifier import (
    extract_numbers_from_text,
    validate_katex_syntax,
    verify_no_alien_numbers,
)
from app.schemas.dsl import (
    GeometryOxyzDSL,
    IntegralDSL,
    LastDigitDSL,
    MatrixAlgebraDSL,
    PlanarAreaDSL,
    SequenceProgressionDSL,
    TriangleVectorDSL,
    TrigonometricDSL,
)
from app.schemas.solve import SolveRequest
from app.solvers.registry import solve_dsl

# 32 Sample Math Problem DSLs covering all 8 completed domains (4 per domain)
SAMPLE_32_PROBLEMS = [
    # --- Domain 1: Nguyên hàm - Tích phân ---
    IntegralDSL(
        type="nguyen_ham_tich_phan",
        integrand="2*x",
        variable="x",
        lower_bound="0",
        upper_bound="1",
        restate_vi="Tính tích phân \\(\\int_0^1 2x dx\\)",
    ),
    IntegralDSL(
        type="nguyen_ham_tich_phan",
        integrand="3*x^2",
        variable="x",
        lower_bound="0",
        upper_bound="2",
        restate_vi="Tính tích phân \\(\\int_0^2 3x^2 dx\\)",
    ),
    IntegralDSL(
        type="nguyen_ham_tich_phan",
        integrand="x + 1",
        variable="x",
        lower_bound="0",
        upper_bound="2",
        restate_vi="Tính tích phân \\(\\int_0^2 (x + 1) dx\\)",
    ),
    IntegralDSL(
        type="nguyen_ham_tich_phan",
        integrand="4*x^3",
        variable="x",
        lower_bound="0",
        upper_bound="1",
        restate_vi="Tính tích phân \\(\\int_0^1 4x^3 dx\\)",
    ),
    # --- Domain 2: Chữ số tận cùng ---
    LastDigitDSL(
        type="tim_chu_so_tan_cung_luy_thua_lon",
        base="2",
        exponent="10",
        restate_vi="Tìm chữ số tận cùng của \\(2^{10}\\)",
    ),
    LastDigitDSL(
        type="tim_chu_so_tan_cung_luy_thua_lon",
        base="3",
        exponent="20",
        restate_vi="Tìm chữ số tận cùng của \\(3^{20}\\)",
    ),
    LastDigitDSL(
        type="tim_chu_so_tan_cung_luy_thua_lon",
        base="7",
        exponent="15",
        restate_vi="Tìm chữ số tận cùng của \\(7^{15}\\)",
    ),
    LastDigitDSL(
        type="tim_chu_so_tan_cung_luy_thua_lon",
        base="8",
        exponent="8",
        restate_vi="Tìm chữ số tận cùng của \\(8^8\\)",
    ),
    # --- Domain 3: Đại số ma trận ---
    MatrixAlgebraDSL(
        type="dai_so_ma_tran_dinh_thuc",
        operation="determinant",
        matrix=[[1, 2], [3, 4]],
        restate_vi="Tính định thức của ma trận 2x2",
    ),
    MatrixAlgebraDSL(
        type="dai_so_ma_tran_dinh_thuc",
        operation="determinant",
        matrix=[[2, 0], [0, 5]],
        restate_vi="Tính định thức ma trận đường chéo",
    ),
    MatrixAlgebraDSL(
        type="dai_so_ma_tran_dinh_thuc",
        operation="add",
        matrix=[[1, 2], [3, 4]],
        matrix_b=[[5, 6], [7, 8]],
        restate_vi="Tính tổng hai ma trận 2x2",
    ),
    MatrixAlgebraDSL(
        type="dai_so_ma_tran_dinh_thuc",
        operation="multiply",
        matrix=[[1, 2], [0, 1]],
        matrix_b=[[2, 0], [1, 3]],
        restate_vi="Tính tích hai ma trận 2x2",
    ),
    # --- Domain 4: Diện tích hình phẳng ---
    PlanarAreaDSL(
        type="dien_tich_hinh_phang",
        curve1="x^2",
        curve2="x",
        lower_bound="0",
        upper_bound="1",
        restate_vi="Tính diện tích hình phẳng giữa \\(y = x^2\\) và \\(y = x\\)",
    ),
    PlanarAreaDSL(
        type="dien_tich_hinh_phang",
        curve1="2*x",
        curve2="x^2",
        lower_bound="0",
        upper_bound="2",
        restate_vi="Tính diện tích hình phẳng giữa \\(y = 2x\\) và \\(y = x^2\\)",
    ),
    PlanarAreaDSL(
        type="dien_tich_hinh_phang",
        curve1="4 - x^2",
        curve2="0",
        lower_bound="-2",
        upper_bound="2",
        restate_vi="Tính diện tích hình phẳng parabol \\(y = 4 - x^2\\)",
    ),
    PlanarAreaDSL(
        type="dien_tich_hinh_phang",
        curve1="x",
        curve2="0",
        lower_bound="0",
        upper_bound="3",
        restate_vi="Tính diện tích tam giác dưới đường thẳng \\(y = x\\)",
    ),
    # --- Domain 5: Dãy số & Cấp số cộng/nhân ---
    SequenceProgressionDSL(
        type="day_so_cap_so_cong_cap_so_nhan",
        progression_type="arithmetic",
        target="nth_term",
        u1="2",
        d="3",
        n=5,
        restate_vi="Tìm số hạng thứ 5 của cấp số cộng \\(u_1 = 2, d = 3\\)",
    ),
    SequenceProgressionDSL(
        type="day_so_cap_so_cong_cap_so_nhan",
        progression_type="arithmetic",
        target="sum_n",
        u1="1",
        d="2",
        n=4,
        restate_vi="Tính tổng 4 số hạng đầu của cấp số cộng \\(u_1 = 1, d = 2\\)",
    ),
    SequenceProgressionDSL(
        type="day_so_cap_so_cong_cap_so_nhan",
        progression_type="geometric",
        target="nth_term",
        u1="3",
        q="2",
        n=4,
        restate_vi="Tìm số hạng thứ 4 của cấp số nhân \\(u_1 = 3, q = 2\\)",
    ),
    SequenceProgressionDSL(
        type="day_so_cap_so_cong_cap_so_nhan",
        progression_type="geometric",
        target="sum_n",
        u1="1",
        q="3",
        n=3,
        restate_vi="Tính tổng 3 số hạng đầu của cấp số nhân \\(u_1 = 1, q = 3\\)",
    ),
    # --- Domain 6: Hệ thức lượng tam giác & Vector ---
    TriangleVectorDSL(
        type="tam_giac_vector",
        operation="triangle_area_heron",
        a="3",
        b="4",
        c="5",
        restate_vi="Tính diện tích tam giác có ba cạnh 3, 4, 5",
    ),
    TriangleVectorDSL(
        type="tam_giac_vector",
        operation="triangle_area_heron",
        a="6",
        b="8",
        c="10",
        restate_vi="Tính diện tích tam giác có ba cạnh 6, 8, 10",
    ),
    TriangleVectorDSL(
        type="tam_giac_vector",
        operation="vector_dot_product",
        u=["1", "2"],
        v=["3", "4"],
        restate_vi="Tính tích vô hướng của hai vectơ \\((1, 2)\\) và \\((3, 4)\\)",
    ),
    TriangleVectorDSL(
        type="tam_giac_vector",
        operation="vector_magnitude",
        u=["3", "4"],
        restate_vi="Tính độ dài vectơ \\((3, 4)\\)",
    ),
    # --- Domain 7: Lượng giác ---
    TrigonometricDSL(
        type="ham_so_luong_giac_phuong_trinh",
        operation="find_roots_interval",
        equation=r"\sin(x) = 0",
        interval=r"[0, 2\pi]",
        restate_vi="Tìm nghiệm phương trình \\(\\sin(x) = 0\\) trên đoạn \\([0, 2\\pi]\\)",
    ),
    TrigonometricDSL(
        type="ham_so_luong_giac_phuong_trinh",
        operation="find_roots_interval",
        equation=r"\cos(x) = 0",
        interval=r"[0, \pi]",
        restate_vi="Tìm nghiệm phương trình \\(\\cos(x) = 0\\) trên đoạn \\([0, \\pi]\\)",
    ),
    TrigonometricDSL(
        type="ham_so_luong_giac_phuong_trinh",
        operation="find_roots_interval",
        equation=r"\sin(x) = 1",
        interval=r"[0, 2\pi]",
        restate_vi="Tìm nghiệm phương trình \\(\\sin(x) = 1\\) trên đoạn \\([0, 2\\pi]\\)",
    ),
    TrigonometricDSL(
        type="ham_so_luong_giac_phuong_trinh",
        operation="count_roots_interval",
        equation=r"\sin(x) = 0",
        interval=r"[0, 2\pi]",
        restate_vi="Đếm số nghiệm của \\(\\sin(x) = 0\\) trên \\([0, 2\\pi]\\)",
    ),
    # --- Domain 8: Hình học không gian Oxyz ---
    GeometryOxyzDSL(
        type="geometry_oxyz",
        operation="plane_from_point_and_normal",
        point_M=["1", "2", "3"],
        vector_n=["1", "-1", "2"],
        restate_vi="Viết phương trình mặt phẳng qua điểm và có VTPT",
    ),
    GeometryOxyzDSL(
        type="geometry_oxyz",
        operation="distance_point_to_plane",
        point_M=["1", "0", "0"],
        plane_coeffs=["1", "2", "-2", "2"],
        restate_vi="Tính khoảng cách từ điểm \\((1, 0, 0)\\) đến mặt phẳng",
    ),
    GeometryOxyzDSL(
        type="geometry_oxyz",
        operation="sphere_equation_from_center_and_radius",
        point_I=["1", "2", "3"],
        radius="4",
        restate_vi="Lập phương trình mặt cầu tâm \\(I(1, 2, 3)\\) bán kính \\(R = 4\\)",
    ),
    GeometryOxyzDSL(
        type="geometry_oxyz",
        operation="vector_dot_product_3d",
        vector_u=["1", "2", "3"],
        vector_v=["4", "-1", "2"],
        restate_vi="Tính tích vô hướng của hai vectơ trong không gian Oxyz",
    ),
]


@pytest.mark.unit
@pytest.mark.asyncio
@pytest.mark.parametrize("dsl_item", SAMPLE_32_PROBLEMS)
async def test_30_sample_solutions_pass_verification_and_katex(dsl_item):
    """
    Acceptance Criteria 1: At least 30 sample solutions across all completed domains
    pass automatic verification without any alien numbers and adhere to KaTeX standards.
    """
    solver_env = solve_dsl(dsl_item)
    assert solver_env.status.value in ("verified", "unsupported")

    req = SolveRequest(
        question_text=getattr(dsl_item, "restate_vi", "Đề bài mẫu"),
        step_index=1,
    )
    final_steps, payload = await generate_pedagogical_guidance(
        request=req,
        dsl=dsl_item,
        solver_envelope=solver_env,
    )

    # 1. Payload structure assertions
    assert payload.scaffolding_step == 1
    assert payload.pedagogy_mode == "template"
    assert len(payload.hints) == 4

    # 2. Strict KaTeX syntax check on guidance and all steps
    step_texts = "\n".join(s.note_vi + " " + s.latex for s in final_steps)
    full_text = payload.guidance_vi + "\n" + step_texts
    katex_valid, katex_err = validate_katex_syntax(full_text)
    assert katex_valid is True, f"KaTeX syntax error on {dsl_item.type}: {katex_err}"

    # 3. Post-generation zero-alien-number verification
    is_valid, err_msg = verify_no_alien_numbers(
        generated_text=full_text,
        ground_truth_steps=solver_env.steps,
        ground_truth_result=solver_env.result,
        dsl=dsl_item,
    )
    assert is_valid is True, f"Alien number detected on {dsl_item.type}: {err_msg}"


@pytest.mark.adversarial
@pytest.mark.asyncio
async def test_adversarial_alien_number_rejection_and_fallback(monkeypatch):
    """
    Acceptance Criteria 2: Adversarial simulation where LLM hallucinates an alien number (99999).
    The system MUST reject the LLM version and safely fallback to the template version.
    """
    monkeypatch.setenv("ENABLE_LLM_PEDAGOGY", "true")

    dsl = IntegralDSL(
        type="nguyen_ham_tich_phan",
        integrand="2*x",
        variable="x",
        lower_bound="0",
        upper_bound="1",
        restate_vi="Tính tích phân \\(\\int_0^1 2x dx\\)",
    )
    solver_env = solve_dsl(dsl)

    # FakeLLM simulates injecting an alien number 99999
    alien_response = {
        "steps": [
            {
                "id": "step_1",
                "note_vi": "Bước giải bị ảo giác chèn con số lạ 99999 vào lời giải.",
                "latex": r"\[ F(x) = x^2 + 99999 \]",
            }
        ]
    }
    client = FakeLLMClient(canned_responses=[alien_response])

    req = SolveRequest(question_text="Tính tích phân 2x từ 0 đến 1", step_index=1)
    final_steps, payload = await generate_pedagogical_guidance(
        request=req,
        dsl=dsl,
        solver_envelope=solver_env,
        client=client,
    )

    # Must reject LLM version and fallback to template!
    assert payload.pedagogy_mode == "template"
    # Ground truth steps preserved
    assert len(final_steps) == len(solver_env.steps)
    # Alien number 99999 must NOT appear in final output
    full_output = " ".join(s.note_vi + " " + s.latex for s in final_steps)
    assert 99999 not in extract_numbers_from_text(full_output)


@pytest.mark.unit
def test_socratic_hints_tier_structure_and_subgoal_safety():
    """
    Acceptance Criteria 4 & 5: Socratic hints follow 4 tiers.
    Tier 3 (Sub-goal) must guide intermediate steps and NEVER reveal final answer.
    """
    dsl = LastDigitDSL(
        type="tim_chu_so_tan_cung_luy_thua_lon",
        base="2",
        exponent="10",
        restate_vi="Tìm chữ số tận cùng của \\(2^{10}\\)",
    )
    solver_env = solve_dsl(dsl)
    hints = build_socratic_hints(dsl.type, solver_env.steps, solver_env.result, dsl)

    assert len(hints) == 4
    assert hints[0].level == 1
    assert "Nudge" in hints[0].title_vi
    assert hints[1].level == 2
    assert "Concept Reminder" in hints[1].title_vi
    assert hints[2].level == 3
    assert "Sub-goal" in hints[2].title_vi
    assert hints[3].level == 4
    assert "Worked Step" in hints[3].title_vi

    # Subgoal Safety: Tier 3 must NOT contain final answer string
    final_ans = solver_env.result.last_digits_str  # "4"
    assert f"Đáp án là {final_ans}" not in hints[2].content_vi
    assert f"= {final_ans}" not in hints[2].content_vi


@pytest.mark.unit
def test_misconception_feedback_registry():
    """
    Acceptance Criteria 6: Misconception feedback is encouraging and addresses specific traps.
    """
    # 1. Sphere radius invalid trap
    fb_sphere = get_misconception_feedback("TRAP_SPHERE_RADIUS_INVALID")
    assert fb_sphere is not None
    assert "mặt cầu" in fb_sphere
    assert "R^2" in fb_sphere
    assert "💡" in fb_sphere

    # 2. Angle line vs vector trap
    fb_angle = get_misconception_feedback("TRAP_ANGLE_LINE_VS_VECTOR")
    assert fb_angle is not None
    assert "trị tuyệt đối" in fb_angle

    # 3. None input returns None
    assert get_misconception_feedback(None) is None


@pytest.mark.unit
@pytest.mark.asyncio
async def test_pedagogical_misconception_integration():
    """Verify that passing a misconception_id into SolveRequest injects encouraging advice."""
    dsl = GeometryOxyzDSL(
        type="geometry_oxyz",
        operation="plane_from_point_and_normal",
        point_M=["1", "2", "3"],
        vector_n=["1", "-1", "2"],
        restate_vi="Lập mặt phẳng",
    )
    solver_env = solve_dsl(dsl)

    req = SolveRequest(
        question_text="Lập mặt phẳng qua điểm",
        step_index=2,
        misconception_id="TRAP_PLANE_DISTANCE_NO_ABS",
    )
    _, payload = await generate_pedagogical_guidance(
        request=req,
        dsl=dsl,
        solver_envelope=solver_env,
    )
    assert payload.misconception_feedback is not None
    assert "giá trị tuyệt đối" in payload.misconception_feedback
    assert "Nhắc nhở sư phạm" in payload.guidance_vi


@pytest.mark.unit
def test_solve_endpoint_returns_hints_and_pedagogy(auth_client):
    """
    Acceptance Criteria 7: POST /v1/solve returns steps and 4-tier hints payload.
    """
    payload = {
        "question_text": "Tính tích phân từ 0 đến 1 của 2x",
        "step_index": 3,
        "misconception_id": "TRAP_SIGN_ERROR",
    }
    resp = auth_client.post("/v1/solve", json=payload)
    assert resp.status_code == 200
    data = resp.json()

    assert data["status"] == "verified"
    result = data["result"]
    assert result["scaffolding_step"] == 3
    assert result["pedagogy_mode"] in ("template", "llm_verified")
    assert len(result["hints"]) == 4
    assert result["subgoal_completed"] is True
    assert "dấu" in result["misconception_feedback"]
    assert len(data["steps"]) > 0
