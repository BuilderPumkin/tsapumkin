"""
Golden Tests for all 18 Domain Specific Language (DSL) Classes
Ensures every DSL model correctly validates compliant structures,
and rejects malformed payloads with exact Pydantic error types.
"""

import pytest
from pydantic import TypeAdapter, ValidationError

from app.schemas.dsl import MathProblemDSL

dsl_adapter = TypeAdapter(MathProblemDSL)

DSL_TEST_CASES = [
    # 1. MonotonicityDSL
    {
        "name": "MonotonicityDSL",
        "valid": {"type": "ham_so_tinh_don_dieu", "expression": "x**3 - 3*x", "interval": "(0; 2)"},
        "invalid": {"type": "ham_so_tinh_don_dieu", "interval": "(0; 2)"},
        "expected_error_type": "missing",
    },
    # 2. BasicDerivativeDSL
    {
        "name": "BasicDerivativeDSL",
        "valid": {"type": "ham_so_dao_ham_co_ban", "expression": "sin(x)", "order": 2},
        "invalid": {"type": "ham_so_dao_ham_co_ban", "expression": "sin(x)", "order": 0},
        "expected_error_type": "greater_than_equal",
    },
    # 3. ExtremaDSL
    {
        "name": "ExtremaDSL",
        "valid": {"type": "ham_so_cuc_tri_cho_truoc", "expression": "x**2 - 4*x + 3"},
        "invalid": {"type": "ham_so_cuc_tri_cho_truoc", "unknown_key": "bad"},
        "expected_error_type": "missing",
    },
    # 4. MinMaxIntervalDSL
    {
        "name": "MinMaxIntervalDSL",
        "valid": {
            "type": "ham_so_gtln_gtnn_doan_khoang",
            "expression": "x**3 - 3*x",
            "interval_start": "0",
            "interval_end": "2",
        },
        "invalid": {
            "type": "ham_so_gtln_gtnn_doan_khoang",
            "expression": "x**3 - 3*x",
            "interval_start": "0",
        },
        "expected_error_type": "missing",
    },
    # 5. ParameterMDSL
    {
        "name": "ParameterMDSL",
        "valid": {
            "type": "ham_so_chua_tham_so_m",
            "expression": "x**3 - 3*m*x",
            "condition": "2_cuc_tri",
        },
        "invalid": {"type": "ham_so_chua_tham_so_m", "expression": "x**3 - 3*m*x"},
        "expected_error_type": "missing",
    },
    # 6. RealWorldOptimizationDSL
    {
        "name": "RealWorldOptimizationDSL",
        "valid": {
            "type": "ham_so_toan_thuc_te_toi_uu",
            "target_function": "2*x + 50/x",
            "goal": "minimize",
        },
        "invalid": {
            "type": "ham_so_toan_thuc_te_toi_uu",
            "target_function": "2*x + 50/x",
            "goal": "invalid_goal_type",
        },
        "expected_error_type": "literal_error",
    },
    # 7. VariationTableDSL
    {
        "name": "VariationTableDSL",
        "valid": {
            "type": "ham_so_doc_bang_bien_thien",
            "derivative_expression": "(x-1)*(x-2)",
            "intervals_sign": [{"interval": "(-inf; 1)", "sign": "+"}],
        },
        "invalid": {
            "type": "ham_so_doc_bang_bien_thien",
            "forbidden_extra": "not_allowed",
        },
        "expected_error_type": "extra_forbidden",
    },
    # 8. AsymptoteDSL
    {
        "name": "AsymptoteDSL",
        "valid": {"type": "ham_so_tiem_can", "expression": "(2*x+1)/(x-1)"},
        "invalid": {"type": "ham_so_tiem_can"},
        "expected_error_type": "missing",
    },
    # 9. OtherFunctionDSL
    {
        "name": "OtherFunctionDSL",
        "valid": {
            "type": "ham_so_dang_khac",
            "expression": "x**3 - 3*x",
            "question_subtype": "tiep_tuyen",
        },
        "invalid": {"type": "ham_so_dang_khac", "expression": "x**3 - 3*x"},
        "expected_error_type": "missing",
    },
    # 10. IntegralDSL
    {
        "name": "IntegralDSL",
        "valid": {
            "type": "nguyen_ham_tich_phan",
            "integrand": "x**2",
            "lower_bound": "0",
            "upper_bound": "1",
        },
        "invalid": {"type": "nguyen_ham_tich_phan", "lower_bound": "0"},
        "expected_error_type": "missing",
    },
    # 11. ExponentialLogDSL
    {
        "name": "ExponentialLogDSL",
        "valid": {"type": "mu_logarit_pt_bpt", "equation": "2**x = 4", "relation": "="},
        "invalid": {"type": "mu_logarit_pt_bpt", "equation": "2**x = 4", "relation": "approx"},
        "expected_error_type": "literal_error",
    },
    # 12. LimitSequenceDSL
    {
        "name": "LimitSequenceDSL",
        "valid": {
            "type": "gioi_han_day_so",
            "expression": "(n+1)/(2*n+3)",
            "approaches": "+oo",
        },
        "invalid": {"type": "gioi_han_day_so", "approaches": "+oo"},
        "expected_error_type": "missing",
    },
    # 13. LinearAlgebraDSL
    {
        "name": "LinearAlgebraDSL",
        "valid": {
            "type": "dai_so_tuyen_tinh_ma_tran",
            "matrices": {"A": [[1.0, 2.0], [3.0, 4.0]]},
            "operation": "det",
        },
        "invalid": {"type": "dai_so_tuyen_tinh_ma_tran", "operation": "det"},
        "expected_error_type": "missing",
    },
    # 14. DifferentialEquationDSL
    {
        "name": "DifferentialEquationDSL",
        "valid": {
            "type": "phuong_trinh_vi_phan",
            "equation": "y' + y = x",
            "initial_conditions": {"y(0)": "1"},
        },
        "invalid": {"type": "phuong_trinh_vi_phan", "initial_conditions": {"y(0)": "1"}},
        "expected_error_type": "missing",
    },
    # 15. AlgebraicEquationDSL
    {
        "name": "AlgebraicEquationDSL",
        "valid": {
            "type": "phuong_trinh_bat_phuong_trinh_dai_so",
            "equation": "x**2 - 5*x + 6 = 0",
        },
        "invalid": {"type": "phuong_trinh_bat_phuong_trinh_dai_so"},
        "expected_error_type": "missing",
    },
    # 16. GeometryOxyzDSL
    {
        "name": "GeometryOxyzDSL",
        "valid": {
            "type": "hinh_hoc_oxyz",
            "elements": {"A": {"type": "point", "coords": "1,2,3"}},
            "query_type": "khoang_cach",
        },
        "invalid": {
            "type": "hinh_hoc_oxyz",
            "elements": {"A": {"type": "point", "coords": "1,2,3"}},
        },
        "expected_error_type": "missing",
    },
    # 17. CombinatoricsProbabilityDSL
    {
        "name": "CombinatoricsProbabilityDSL",
        "valid": {
            "type": "to_hop_xac_suat",
            "subdomain": "classical_probability",
            "parameters": {"n": 10, "k": 3},
        },
        "invalid": {
            "type": "to_hop_xac_suat",
            "subdomain": "unsupported_magic_subdomain",
            "parameters": {"n": 10},
        },
        "expected_error_type": "literal_error",
    },
    # 18. UnsupportedProblemDSL
    {
        "name": "UnsupportedProblemDSL",
        "valid": {
            "type": "unsupported",
            "reason": "complex_numbers",
        },
        "invalid": {
            "type": "unsupported",
            "reason": "invalid_reason_string_not_in_enum",
        },
        "expected_error_type": "enum",
    },
]


@pytest.mark.golden
@pytest.mark.parametrize("case", DSL_TEST_CASES, ids=lambda c: c["name"])
def test_dsl_class_valid(case):
    """Verify each DSL class parses and validates its valid schema successfully."""
    instance = dsl_adapter.validate_python(case["valid"])
    assert instance.type == case["valid"]["type"]
    assert instance.dsl_version == "0.1.0-alpha"


@pytest.mark.golden
@pytest.mark.parametrize("case", DSL_TEST_CASES, ids=lambda c: c["name"])
def test_dsl_class_invalid_rejected_with_exact_type(case):
    """Verify each DSL class rejects invalid inputs with exact expected Pydantic error type."""
    with pytest.raises(ValidationError) as exc_info:
        dsl_adapter.validate_python(case["invalid"])

    error_types = [err["type"] for err in exc_info.value.errors()]
    assert case["expected_error_type"] in error_types, (
        f"For {case['name']}, expected error type '{case['expected_error_type']}' "
        f"not found in reported error types: {error_types}"
    )
