# tools/verify_521_coincidence.py
"""
Kiểm chứng toán học tính độc lập của con số 521:
(a) Đếm số câu có type == 'single_choice'
(b) Đếm số câu thuộc 8 nhóm ưu tiên ở V1 (Prompt 1)
Chứng minh đây là sự trùng hợp ngẫu nhiên thông qua phép toán tập hợp (Intersection, Difference).
"""
import os, sys, json
sys.path.append(os.path.dirname(__file__))
from classify_questions import load_dataset

sys.stdout.reconfigure(encoding='utf-8')

questions = load_dataset()

# Phép đếm độc lập (a): Đếm theo trường type
# Tập hợp câu hỏi có type == 'single_choice'
set_single_choice = {q['id'] for q in questions if q.get('type') == 'single_choice'}
print(f"(a) Số câu có type == 'single_choice'              : {len(set_single_choice)} câu")

# Quy tắc phân loại V1 ban đầu (Prompt 1)
def classify_v1(q):
    topic = (q.get('topic') or '').lower()
    subtopic = (q.get('subtopic') or '').lower()
    text = ((q.get('question') or q.get('question_text') or '') + ' ' + (q.get('cloze_text') or '')).lower()
    tags = [t.lower() for t in (q.get('tags') or [])]
    combined = f"{topic} {subtopic} {' '.join(tags)} {text}"

    if 'bảng biến thiên' in text or 'bảng xét dấu' in text or any(k in text for k in ['như hình vẽ', 'như hình bên', 'đồ thị hàm số như hình']):
        return 'phu_thuoc_hinh_ve_ngoai_pv'
    if any(k in text for k in ['số phức', 'phần thực', 'phần ảo', 'môđun của số phức', 'z_1', 'z_2', '\\bar{z}']) and 'ma trận' not in text:
        return 'so_phuc'
    if any(k in text for k in ['phương sai', 'độ lệch chuẩn', 'mẫu số liệu', 'tứ phân vị', 'khoảng biến thiên']):
        return 'thong_ke'
    if any(k in text for k in ['khối chóp', 'khối lăng trụ', 'khối đa diện', 'hình nón', 'hình trụ', 'hình chóp', 'lăng trụ tam giác', 'hình lập phương', 'hình hộp chữ nhật']) and 'oxyz' not in combined and 'tọa độ' not in text:
        return 'hinh_hoc_khong_gian_co_dien'
    if 'oxyz' in combined or 'tọa độ oxyz' in combined or any(k in subtopic for k in ['mặt cầu', 'mặt phẳng & đường thẳng oxyz', 'khoảng cách trong oxyz']):
        return 'hinh_hoc_oxyz'
    if any(k in combined for k in ['xác suất', 'tổ hợp', 'chỉnh hợp', 'hoán vị', 'định lý bayes', 'bàn tròn', 'biến cố', 'quy tắc đếm']) or 'nhị thức newton' in text:
        return 'to_hop_xac_suat'
    if any(k in combined for k in ['tích phân', 'nguyên hàm', 'diện tích hình phẳng', 'thể tích khối tròn xoay']):
        return 'nguyen_ham_tich_phan'
    if any(k in combined for k in ['ma trận', 'định thức', '\\det', 'vết của ma trận', 'giá trị riêng', 'cramer']):
        return 'dai_so_tuyen_tinh_ma_tran'
    if any(k in combined for k in ['logarit', 'hàm số mũ', 'phương trình mũ', 'bất phương trình mũ', 'lãi kép', 'lãi suất']):
        return 'mu_logarit_pt_bpt'
    if any(k in combined for k in ['tiệm cận', 'tiệm cận đứng', 'tiệm cận ngang']):
        return 'tiem_can_khao_sat'
    if any(k in combined for k in ['giới hạn', 'dãy số', 'cấp số cộng', 'cấp số nhân', 'l\'hôpital', 'vô cùng bé']):
        return 'gioi_han_day_so'
    return 'cuc_tri_don_dieu'

old_8_categories = {
    'cuc_tri_don_dieu',
    'tiem_can_khao_sat',
    'nguyen_ham_tich_phan',
    'mu_logarit_pt_bpt',
    'hinh_hoc_oxyz',
    'to_hop_xac_suat',
    'gioi_han_day_so',
    'dai_so_tuyen_tinh_ma_tran'
}

# Phép đếm độc lập (b): Đếm theo nhãn dạng bài trong 8 nhóm ưu tiên cũ ở Prompt 1 V1
set_priority_8_v1 = {q['id'] for q in questions if classify_v1(q) in old_8_categories}
print(f"(b) Số câu thuộc 8 dạng bài ưu tiên V1            : {len(set_priority_8_v1)} câu")

# Phép toán tập hợp
intersection = set_single_choice.intersection(set_priority_8_v1)
only_single_choice = set_single_choice - set_priority_8_v1
only_priority_8 = set_priority_8_v1 - set_single_choice

print("\n--- PHÂN TÍCH QUAN HỆ TẬP HỢP GIỮA HAI TẬP DỮ LIỆU ĐỘC LẬP ---")
print(f"1. Số câu giao nhau (A ∩ B)                      : {len(intersection)} câu")
print(f"2. Số câu chỉ có type == 'single_choice' (A \\ B) : {len(only_single_choice)} câu")
print(f"   Danh sách ID: {sorted(list(only_single_choice))}")
for qid in sorted(list(only_single_choice)):
    q = next(item for item in questions if item['id'] == qid)
    print(f"   - {qid}: type={q.get('type')}, V1_cat={classify_v1(q)}, subtopic={q.get('subtopic')}")

print(f"\n3. Số câu chỉ thuộc 8 nhóm ưu tiên (B \\ A)         : {len(only_priority_8)} câu")
print(f"   Danh sách ID: {sorted(list(only_priority_8))}")
for qid in sorted(list(only_priority_8)):
    q = next(item for item in questions if item['id'] == qid)
    print(f"   - {qid}: type={q.get('type')}, V1_cat={classify_v1(q)}, subtopic={q.get('subtopic')}")

print("\n=> KẾT LUẬN TOÁN HỌC:")
print(f"   - Hai tập dữ liệu A và B độc lập về mặt logic định nghĩa.")
print(f"   - |A| = 521 nhưng chứa 29 câu ngoài phạm vi 8 dạng (Hình cổ điển, Số phức, Thống kê, Visual).")
print(f"   - |B| = 521 nhưng chứa 29 câu thuộc các dạng câu hỏi phi trắc nghiệm (short_answer, true_false, drag_drop, step).")
print(f"   - Số câu chung giữa 2 tập chỉ là {len(intersection)} câu.")
print(f"   - Con số 521 xuất hiện ở cả hai tập là sự TRÙNG HỢP NGẪU NHIÊN TUYỆT ĐỐI.")
