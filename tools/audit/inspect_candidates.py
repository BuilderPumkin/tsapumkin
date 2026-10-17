import json
import re
import sys
import os

sys.path.insert(0, "pumkin-math-api")
sys.path.insert(0, ".")
from tools.classify_questions import classify_question_v2
from tools.extract_latex_corpus import extract_raw_math_snippets

with open("pumkin3/data/questions/all.json", encoding="utf-8") as f:
    questions = json.load(f)

CATEGORY_GROUP = {
    "ham_so_dao_ham_co_ban": "calculus_analysis",
    "ham_so_tinh_don_dieu": "calculus_analysis",
    "ham_so_cuc_tri_cho_truoc": "calculus_analysis",
    "ham_so_gtln_gtnn_doan_khoang": "calculus_analysis",
    "ham_so_tiem_can": "calculus_analysis",
    "ham_so_toan_thuc_te_toi_uu": "calculus_analysis",
    "ham_so_dang_khac": "calculus_analysis",
    "nguyen_ham_tich_phan": "calculus_analysis",
    "gioi_han_day_so": "calculus_analysis",
    "phuong_trinh_vi_phan": "calculus_analysis",
    "unsupported_hinh_khong_gian_co_dien": "geometry_spatial",
    "hinh_hoc_oxyz": "coordinate_geometry",
    "mu_logarit_pt_bpt": "algebra_equations",
    "phuong_trinh_bat_phuong_trinh_dai_so": "algebra_equations",
    "dai_so_tuyen_tinh_ma_tran": "algebra_equations",
    "to_hop_xac_suat": "probability_statistics",
    "unsupported_thong_ke": "probability_statistics",
}

groups = {
    "calculus_analysis": [],
    "geometry_spatial": [],
    "coordinate_geometry": [],
    "algebra_equations": [],
    "probability_statistics": []
}

for q in questions:
    raw_cat = classify_question_v2(q)
    grp = CATEGORY_GROUP.get(raw_cat)
    if not grp:
        continue
    
    qid = q.get("id")
    qt = q.get("question_text") or q.get("question") or ""
    opts = q.get("options") or []
    if isinstance(opts, dict):
        opts = list(opts.values())
    
    # Only question_text and options (NO explanation!)
    fields_data = [("question_text", qt)] + [("options", str(o)) for o in opts]
    for fld, text in fields_data:
        snips = extract_raw_math_snippets(text)
        for s in snips:
            s_clean = s.strip()
            if len(s_clean) >= 3 and not re.fullmatch(r"[a-zA-Z0-9]", s_clean):
                groups[grp].append((qid, fld, s_clean))

for grp, items in groups.items():
    print(f"Group {grp}: {len(items)} snippets found")
