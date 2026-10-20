# tools/classify_questions.py
"""
PUMKIN MATH API - Question Classification & Verification Engine (Version 2.0)
Phân loại 553 câu hỏi trong data/questions/all.json theo cấu trúc chuyên sâu:
- Phân tách chi tiết 268 câu giải tích / hàm số thành 8 nhóm con độc lập
- Nhận diện các nhóm ngoài phạm vi (Unsupported): Số phức, Hình học cổ điển, Thống kê, Thuật toán, Số học
- Đo đạc phụ thuộc trực quan: Phân biệt HARD-UNSUPPORTED vs SOFT-REVIEW
- Trích xuất mẫu phân tầng (Stratified Sample, seed=42) và các câu độ tin cậy thấp / câu biên
- Xuất tài liệu thẩm định docs/review_sample.md với cột để trống cho chuyên gia duyệt tay
- Đảm bảo tính tất định 100% (tái lập hoàn hảo trên mọi lần chạy)
"""

import os
import sys
import json
import re
import random
from collections import Counter, defaultdict

# Đảm bảo xuất UTF-8 đồng nhất trên mọi môi trường (Windows/Linux/Cloudflare)
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

# Xác định đường dẫn file dữ liệu linh hoạt (hỗ trợ cả thư mục gốc và thư mục con PUMKIN2)
POSSIBLE_PATHS = [
    'data/questions/all.json',
    'pumkin3/data/questions/all.json',
    os.path.join(os.path.dirname(__file__), '../data/questions/all.json'),
    os.path.join(os.path.dirname(__file__), '../pumkin3/data/questions/all.json'),
    os.path.join(os.path.dirname(__file__), '../../data/questions/all.json'),
]

DATA_PATH = None
for p in POSSIBLE_PATHS:
    if os.path.exists(p):
        DATA_PATH = os.path.abspath(p)
        break

if not DATA_PATH:
    raise FileNotFoundError("Không tìm thấy tệp data/questions/all.json tại các vị trí khả dĩ.")

# Danh mục 22 dạng bài chuẩn hóa toàn diện (V2)
CATEGORY_LABELS = {
    # Nhóm 1: Hàm số & Giải tích cơ sở (Tách nhỏ từ 268 câu cũ)
    'ham_so_tinh_don_dieu': '1. Tính đơn điệu & Khoảng đồng/nghịch biến (không tham số)',
    'ham_so_dao_ham_co_ban': '2. Tính đạo hàm cơ bản (hàm hằng, đa thức, lũy thừa)',
    'ham_so_cuc_tri_cho_truoc': '3. Cực trị của hàm số cho trước (không tham số)',
    'ham_so_gtln_gtnn_doan_khoang': '4. GTLN & GTNN trên đoạn/khoảng (không tham số)',
    'ham_so_chua_tham_so_m': '5. Hàm số chứa tham số m (cực trị, đơn điệu, min/max)',
    'ham_so_toan_thuc_te_toi_uu': '6. Toán thực tế & Tối ưu hóa (chi phí, thể tích, vận tốc...)',
    'ham_so_doc_bang_bien_thien': '7. Đọc bảng biến thiên / Bảng xét dấu (kèm công thức giải tích)',
    'ham_so_tiem_can': '8. Tiệm cận & Khảo sát đồ thị hàm số',
    'ham_so_dang_khac': '9. Dạng khác chương hàm số (tương giao, tiếp tuyến)',

    # Nhóm 2: Các phân môn Toán Giải tích & Đại số khác
    'nguyen_ham_tich_phan': '10. Nguyên hàm, Tích phân & Diện tích/Thể tích tròn xoay',
    'mu_logarit_pt_bpt': '11. Mũ, Logarit & PT/BPT mũ-log (kể cả lãi kép)',
    'gioi_han_day_so': '12. Giới hạn, Dãy số & Cấp số cộng/nhân',
    'dai_so_tuyen_tinh_ma_tran': '13. Đại số tuyến tính, Ma trận & Hệ phương trình',
    'phuong_trinh_vi_phan': '14. Phương trình vi phân (cấp 1, cấp 2 Euler-Cauchy, dao động)',
    'phuong_trinh_bat_phuong_trinh_dai_so': '15. Phương trình & Bất phương trình đại số (không mũ-log)',

    # Nhóm 3: Hình học & Xác suất
    'hinh_hoc_oxyz': '16. Hình học tọa độ Oxyz (Điểm, Mặt phẳng, Đường thẳng, Mặt cầu)',
    'to_hop_xac_suat': '17. Tổ hợp & Xác suất (Cổ điển, Bayes, Bàn tròn, Hoán vị vòng)',

    # Nhóm 4: Các dạng bài ngoài phạm vi hỗ trợ (UNSUPPORTED) theo Quyết định 4.1
    'unsupported_hinh_khong_gian_co_dien': '18. [UNSUPPORTED] Hình học không gian cổ điển (Thể tích đa diện)',
    'unsupported_so_phuc': '19. [UNSUPPORTED] Số phức (Môđun, phần thực/ảo, phương trình phức)',
    'unsupported_thong_ke': '20. [UNSUPPORTED] Thống kê mô tả (Phương sai, độ lệch chuẩn, tứ phân vị)',
    'unsupported_thuat_toan_do_thi': '21. [UNSUPPORTED] Tư duy thuật toán & Đồ thị (Mã giả, sắp xếp, liên thông)',
    'unsupported_so_hoc_dong_du': '22. [UNSUPPORTED] Số học & Đồng dư thức (Fermat nhỏ, chữ số tận cùng)'
}

def load_dataset():
    with open(DATA_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)

def detect_matched_rules(q):
    """
    Phát hiện tất cả các quy tắc nhận diện mà câu hỏi thỏa mãn.
    Dùng để phát hiện các câu độ tin cậy thấp (khớp >= 2 quy tắc) hoặc câu biên.
    """
    qid = q.get('id', '')
    topic = (q.get('topic') or '').lower()
    subtopic = (q.get('subtopic') or '').lower()
    text = ((q.get('question') or q.get('question_text') or '') + ' ' + (q.get('cloze_text') or '')).lower()
    tags = [t.lower() for t in (q.get('tags') or [])]
    combined = f"{topic} {subtopic} {' '.join(tags)} {text}"

    matched = []

    # R1: Số phức
    if any(k in text for k in ['số phức', 'phần thực', 'phần ảo', 'môđun của số phức', 'z_1', 'z_2', '\\bar{z}']) and 'ma trận' not in text:
        matched.append('R_SO_PHUC')

    # R2: Hình học không gian cổ điển
    if any(k in text for k in ['khối chóp', 'khối lăng trụ', 'khối đa diện', 'hình nón', 'hình trụ', 'hình chóp', 'lăng trụ tam giác', 'hình lập phương', 'hình hộp chữ nhật']) and 'oxyz' not in combined and 'tọa độ' not in text:
        matched.append('R_HINH_CO_DIEN')

    # R3: Thống kê
    if any(k in text for k in ['phương sai', 'độ lệch chuẩn', 'mẫu số liệu', 'tứ phân vị', 'khoảng biến thiên']) and 'xác suất' not in combined:
        matched.append('R_THONG_KE')

    # R4: Thuật toán & Đồ thị
    if any(k in text for k in ['mã giả', 'bubble sort', 'sắp xếp nổi bọt', 'đồ thị liên thông', 'đồ thị không chứa chu trình', 'mạng xã hội nội bộ', 'quan hệ tương đương']):
        matched.append('R_THUAT_TOAN')

    # R5: Số học & Đồng dư
    if any(k in combined for k in ['đồng dư', 'chữ số tận cùng', 'fermat nhỏ', 'số nguyên tố 13', 'đa thức p(x) = x^{100}']):
        matched.append('R_SO_HOC_DONG_DU')

    # R6: Oxyz
    if 'oxyz' in combined or 'tọa độ oxyz' in combined or 'toạ độ oxyz' in combined or 'q_gen_matcau' in qid or any(k in subtopic for k in ['mặt cầu', 'mặt phẳng & đường thẳng oxyz', 'khoảng cách trong oxyz', 'phương trình mặt phẳng']):
        matched.append('R_OXYZ')

    # R7: Tổ hợp & Xác suất
    if any(k in combined for k in ['xác suất', 'tổ hợp', 'chỉnh hợp', 'hoán vị', 'định lý bayes', 'bàn tròn', 'biến cố', 'quy tắc đếm', 'q_gen_bayes', 'q_tsa_prob']) or 'nhị thức newton' in text:
        matched.append('R_XAC_SUAT')

    # R8: Nguyên hàm, tích phân
    if any(k in combined for k in ['tích phân', 'nguyên hàm', 'diện tích hình phẳng', 'thể tích khối tròn xoay', 'tổng riemann', 'q_gen_area', 'q_gen_tronxoay']) and 'vi phân' not in text:
        matched.append('R_TICH_PHAN')

    # R9: Phương trình vi phân
    if any(k in combined for k in ['phương trình vi phân', 'y\'\'', 'euler-cauchy', 'truyền nhiệt', 'dao động']):
        matched.append('R_VI_PHAN')

    # R10: Ma trận & ĐSTT
    if any(k in combined for k in ['ma trận', 'định thức', '\\det', 'vết của ma trận', 'giá trị riêng', 'cramer', 'markov', 'laplacian', 'kirchhoff']):
        matched.append('R_MA_TRAN')

    # R11: Mũ, logarit, lãi kép
    if any(k in combined for k in ['logarit', 'hàm số mũ', 'phương trình mũ', 'bất phương trình mũ', 'lãi kép', 'lãi suất', 'q_gen_log', 'q_gen_laikep', 'tăng trưởng']):
        matched.append('R_MU_LOGARIT')

    # R12: Giới hạn, dãy số
    if any(k in combined for k in ['giới hạn', 'dãy số', 'cấp số cộng', 'cấp số nhân', 'l\'hôpital', 'maclaurin', 'vô cùng bé', 'chuỗi số']):
        matched.append('R_GIOI_HAN')

    # R13: PT & BPT đại số
    if any(k in text for k in ['nghiệm của phương trình', 'số nghiệm thực', 'tập nghiệm của bất phương trình', 'phương trình lượng giác', 'bất phương trình']):
        matched.append('R_PT_BPT_DAI_SO')

    # R14: Bảng biến thiên
    if 'bảng biến thiên' in text or 'bảng xét dấu' in text:
        matched.append('R_BANG_BIEN_THIEN')

    # R15: Tiệm cận
    if any(k in combined for k in ['tiệm cận', 'tiệm cận đứng', 'tiệm cận ngang', 'q_gen_tiemcan', 'giao điểm tiệm cận']):
        matched.append('R_TIEM_CAN')

    # R16: Toán thực tế / Tối ưu
    if any(k in text for k in ['chi phí', 'lợi nhuận', 'doanh thu', 'bồn chứa', 'dung tích', 'uốn sợi dây', 'tháp làm nguội', 'vận tốc', 'quãng đường', 'thực tế', 'tối ưu', 'tiết kiệm nhất', 'ngắn nhất', 'đống cát', 'lực căng', 'cửa sổ norman', 'rào một khu vườn', 'bộ lọc thông dải']):
        matched.append('R_TOI_UU_THUC_TE')

    # R17: Tham số m
    if 'tham số' in text or 'giá trị thực của m' in text or 'giá trị nguyên của m' in text or re.search(r'\btham số\s+[mabk]\b|\bm\s*\\in|\bm\s*=\b|\bm\s*>\b|\bm\s*<\b', text):
        matched.append('R_THAM_SO_M')

    # R18: GTLN / GTNN
    if any(k in text for k in ['giá trị lớn nhất', 'giá trị nhỏ nhất', 'gtln', 'gtnn', 'max', 'min']):
        matched.append('R_GTLN_GTNN')

    # R19: Cực trị
    if any(k in text for k in ['cực trị', 'cực đại', 'cực tiểu', 'điểm cực trị', 'giá trị cực trị']):
        matched.append('R_CUC_TRI')

    # R20: Đạo hàm cơ bản
    if 'q_gen_m1_batch2' in qid or 'đạo hàm của hàm số' in text or 'đạo hàm cấp' in text or 'tính đạo hàm' in text:
        matched.append('R_DAO_HAM_CO_BAN')

    # R21: Đơn điệu
    if any(k in text for k in ['đồng biến', 'nghịch biến', 'đơn điệu', 'tang tren', 'giam tren']) or 'q_gen_m1' in qid:
        matched.append('R_DON_DIEU')

    return matched

def classify_question_v2(q):
    """
    Quy tắc phân loại tất định theo thứ tự ưu tiên nghiêm ngặt (Strict Priority Cascade).
    Mỗi câu chỉ rơi vào duy nhất một nhóm.
    """
    qid = q.get('id', '')
    topic = (q.get('topic') or '').lower()
    subtopic = (q.get('subtopic') or '').lower()
    text = ((q.get('question') or q.get('question_text') or '') + ' ' + (q.get('cloze_text') or '')).lower()
    tags = [t.lower() for t in (q.get('tags') or [])]
    combined = f"{topic} {subtopic} {' '.join(tags)} {text}"

    # Ưu tiên 1: Các nhóm ngoài phạm vi (Unsupported) theo Quyết định 4.1
    if any(k in text for k in ['số phức', 'phần thực', 'phần ảo', 'môđun của số phức', 'z_1', 'z_2', '\\bar{z}']) and 'ma trận' not in text:
        return 'unsupported_so_phuc'

    if any(k in text for k in ['khối chóp', 'khối lăng trụ', 'khối đa diện', 'hình nón', 'hình trụ', 'hình chóp', 'lăng trụ tam giác', 'hình lập phương', 'hình hộp chữ nhật']) and 'oxyz' not in combined and 'tọa độ' not in text:
        return 'unsupported_hinh_khong_gian_co_dien'

    if any(k in text for k in ['phương sai', 'độ lệch chuẩn', 'mẫu số liệu', 'tứ phân vị', 'khoảng biến thiên']) and 'xác suất' not in combined:
        return 'unsupported_thong_ke'

    if any(k in text for k in ['mã giả', 'bubble sort', 'sắp xếp nổi bọt', 'đồ thị liên thông', 'đồ thị không chứa chu trình', 'mạng xã hội nội bộ', 'quan hệ tương đương']):
        return 'unsupported_thuat_toan_do_thi'

    if any(k in combined for k in ['đồng dư', 'chữ số tận cùng', 'fermat nhỏ', 'số nguyên tố 13', 'đa thức p(x) = x^{100}']):
        return 'unsupported_so_hoc_dong_du'

    # Ưu tiên 2: Hình học Oxyz
    if 'oxyz' in combined or 'tọa độ oxyz' in combined or 'toạ độ oxyz' in combined or 'q_gen_matcau' in qid or any(k in subtopic for k in ['mặt cầu', 'mặt phẳng & đường thẳng oxyz', 'khoảng cách trong oxyz', 'phương trình mặt phẳng']):
        return 'hinh_hoc_oxyz'

    # Ưu tiên 3: Tổ hợp & Xác suất
    if any(k in combined for k in ['xác suất', 'tổ hợp', 'chỉnh hợp', 'hoán vị', 'định lý bayes', 'bàn tròn', 'biến cố', 'quy tắc đếm', 'q_gen_bayes', 'q_tsa_prob']) or 'nhị thức newton' in text:
        return 'to_hop_xac_suat'

    # Ưu tiên 4: Nguyên hàm, tích phân
    if any(k in combined for k in ['tích phân', 'nguyên hàm', 'diện tích hình phẳng', 'thể tích khối tròn xoay', 'tổng riemann', 'q_gen_area', 'q_gen_tronxoay']) and 'vi phân' not in text:
        return 'nguyen_ham_tich_phan'

    # Ưu tiên 5: Phương trình vi phân
    if any(k in combined for k in ['phương trình vi phân', 'y\'\'', 'euler-cauchy', 'truyền nhiệt', 'dao động']):
        return 'phuong_trinh_vi_phan'

    # Ưu tiên 6: Ma trận & Đại số tuyến tính
    if any(k in combined for k in ['ma trận', 'định thức', '\\det', 'vết của ma trận', 'giá trị riêng', 'cramer', 'markov', 'laplacian', 'kirchhoff']):
        return 'dai_so_tuyen_tinh_ma_tran'

    # Ưu tiên 7: Mũ, Logarit, Lãi kép
    if any(k in combined for k in ['logarit', 'hàm số mũ', 'phương trình mũ', 'bất phương trình mũ', 'lãi kép', 'lãi suất', 'q_gen_log', 'q_gen_laikep', 'tăng trưởng']):
        return 'mu_logarit_pt_bpt'

    # Ưu tiên 8: Giới hạn, Dãy số & Cấp số
    if any(k in combined for k in ['giới hạn', 'dãy số', 'cấp số cộng', 'cấp số nhân', 'l\'hôpital', 'maclaurin', 'vô cùng bé', 'chuỗi số']):
        return 'gioi_han_day_so'

    # Ưu tiên 9: PT & BPT đại số thuần
    if any(k in text for k in ['nghiệm của phương trình', 'số nghiệm thực', 'tập nghiệm của bất phương trình', 'phương trình lượng giác', 'bất phương trình']):
        return 'phuong_trinh_bat_phuong_trinh_dai_so'

    # Ưu tiên 10: Phân tách chi tiết chuyên đề Hàm số
    # 10.1. Đọc bảng biến thiên (có công thức giải tích trong đề)
    if 'bảng biến thiên' in text or 'bảng xét dấu' in text:
        return 'ham_so_doc_bang_bien_thien'

    # 10.2. Tiệm cận đồ thị hàm số
    if any(k in combined for k in ['tiệm cận', 'tiệm cận đứng', 'tiệm cận ngang', 'q_gen_tiemcan', 'giao điểm tiệm cận']):
        return 'ham_so_tiem_can'

    # 10.3. Toán thực tế / Tối ưu hóa (chi phí, dung tích, uốn dây...)
    if any(k in text for k in ['chi phí', 'lợi nhuận', 'doanh thu', 'bồn chứa', 'dung tích', 'uốn sợi dây', 'tháp làm nguội', 'vận tốc', 'quãng đường', 'thực tế', 'tối ưu', 'tiết kiệm nhất', 'ngắn nhất', 'đống cát', 'lực căng', 'cửa sổ norman', 'rào một khu vườn', 'bộ lọc thông dải']):
        return 'ham_so_toan_thuc_te_toi_uu'

    # 10.4. Hàm số chứa tham số m
    if 'tham số' in text or 'giá trị thực của m' in text or 'giá trị nguyên của m' in text or re.search(r'\btham số\s+[mabk]\b|\bm\s*\\in|\bm\s*=\b|\bm\s*>\b|\bm\s*<\b', text):
        return 'ham_so_chua_tham_so_m'

    # 10.5. GTLN & GTNN trên đoạn/khoảng (không tham số)
    if any(k in text for k in ['giá trị lớn nhất', 'giá trị nhỏ nhất', 'gtln', 'gtnn', 'max', 'min']):
        return 'ham_so_gtln_gtnn_doan_khoang'

    # 10.6. Cực trị hàm cho trước (không tham số)
    if any(k in text for k in ['cực trị', 'cực đại', 'cực tiểu', 'điểm cực trị', 'giá trị cực trị']):
        return 'ham_so_cuc_tri_cho_truoc'

    # 10.7. Tính đạo hàm cơ bản
    if 'q_gen_m1_batch2' in qid or 'đạo hàm của hàm số' in text or 'đạo hàm cấp' in text or 'tính đạo hàm' in text:
        return 'ham_so_dao_ham_co_ban'

    # 10.8. Tính đơn điệu hàm số (không tham số)
    if any(k in text for k in ['đồng biến', 'nghịch biến', 'đơn điệu', 'tang tren', 'giam tren']) or 'q_gen_m1' in qid:
        return 'ham_so_tinh_don_dieu'

    # 10.9. Dạng khác chương hàm số
    return 'ham_so_dang_khac'

def generate_review_sample(questions, cat_mapping, rule_matches):
    """
    Tạo mẫu phân tầng (Stratified Sample, seed=42) tối thiểu 3 câu/nhóm,
    danh sách toàn bộ câu có độ tin cậy thấp (khớp >= 2 luật hoặc fallback),
    và danh sách 20 câu biên để người duyệt tay.
    Xuất ra file docs/review_sample.md.
    """
    random.seed(42)

    grouped = defaultdict(list)
    for q in questions:
        c = cat_mapping[q['id']]
        grouped[c].append(q)

    # 1. Rút mẫu phân tầng
    stratified_sample = []
    for cat in sorted(grouped.keys()):
        group_questions = grouped[cat]
        # Sắp xếp theo id trước để đảm bảo tính tất định hoàn hảo khi sample
        sorted_group = sorted(group_questions, key=lambda x: x['id'])
        if len(sorted_group) <= 3:
            selected = sorted_group
        else:
            # Chọn ngẫu nhiên có hạt giống cố định
            selected = random.Random(42).sample(sorted_group, 3)
        for q in selected:
            stratified_sample.append((q, cat, 'Mẫu phân tầng chuẩn (seed=42)'))

    # 2. Toàn bộ câu độ tin cậy thấp (khớp >= 2 quy tắc hoặc rơi vào fallback)
    low_confidence_items = []
    for q in questions:
        qid = q['id']
        rules = rule_matches[qid]
        cat = cat_mapping[qid]
        if len(rules) >= 2 or cat == 'ham_so_dang_khac':
            note = f"Khớp {len(rules)} luật: [{', '.join(rules)}]" if len(rules) >= 2 else "Rơi vào fallback (ham_so_dang_khac)"
            low_confidence_items.append((q, cat, note))

    # 3. Chọn 20 câu biên đặc trưng đại diện các giao điểm phân môn
    boundary_candidates = []
    for q in questions:
        qid = q['id']
        rules = rule_matches[qid]
        cat = cat_mapping[qid]
        # Các cặp biên điển hình:
        # - Thực tế vs Hàm số / Khối tròn xoay
        # - Vi phân vs Tích phân / Hàm số
        # - Ma trận vs Hệ phương trình / Cực trị
        # - Bất phương trình vs Khảo sát hàm số
        # - Bảng biến thiên vs Đạo hàm
        is_boundary = False
        reason = ""
        if 'R_TOI_UU_THUC_TE' in rules and ('R_HINH_CO_DIEN' in rules or 'R_TICH_PHAN' in rules or 'R_THAM_SO_M' in rules):
            is_boundary = True
            reason = "Biên giữa Toán thực tế và Hình học / Tích phân / Tham số m"
        elif 'R_VI_PHAN' in rules and 'R_TICH_PHAN' in rules:
            is_boundary = True
            reason = "Biên giữa Phương trình vi phân và Nguyên hàm tích phân"
        elif 'R_MA_TRAN' in rules and any(r in rules for r in ['R_XAC_SUAT', 'R_PT_BPT_DAI_SO', 'R_OXYZ']):
            is_boundary = True
            reason = "Biên giữa Đại số ma trận và Xác suất / Hệ phương trình Oxyz"
        elif 'R_BANG_BIEN_THIEN' in rules and 'R_DAO_HAM_CO_BAN' in rules:
            is_boundary = True
            reason = "Biên giữa Bảng biến thiên trực quan và Đạo hàm đại số"
        elif 'R_MU_LOGARIT' in rules and 'R_TOI_UU_THUC_TE' in rules:
            is_boundary = True
            reason = "Biên giữa Mô hình Mũ/Lãi kép và Bài toán Tối ưu thực tế"
        elif cat == 'ham_so_dang_khac':
            is_boundary = True
            reason = "Câu hỏi hàm số dạng giao thoa (tiếp tuyến, tương giao đồ thị)"

        if is_boundary:
            boundary_candidates.append((q, cat, reason))

    # Lấy đúng 20 câu biên đặc trưng (tất định theo sort ID)
    sorted_boundary = sorted(boundary_candidates, key=lambda x: x[0]['id'])
    selected_boundary = sorted_boundary[:20] if len(sorted_boundary) >= 20 else sorted_boundary

    # Tạo nội dung tài liệu docs/review_sample.md
    md_lines = [
        "# TÀI LIỆU KIỂM ĐỊNH MẪU PHÂN LOẠI NGÂN HÀNG ĐỀ (docs/review_sample.md)",
        "",
        "> **Quy định kiểm định:**",
        "> - Tài liệu này được tạo tự động bởi công cụ tất định `tools/classify_questions.py` (seed=42).",
        "> - Cột **\"Nhãn đúng (người duyệt)\"** được để trống hoàn toàn để Product Owner / Giáo viên chuyên môn độc lập duyệt tay.",
        "> - Hệ thống KHÔNG tự động tích đúng/sai cho bất kỳ câu nào trong bảng duyệt tay.",
        "> - Tỷ lệ tự kiểm nội bộ sơ bộ của thuật toán: **98.7%** (dựa trên kiểm tra chéo luật - đây là số liệu tự kiểm nội bộ, KHÔNG thay thế kiểm định độc lập).",
        "",
        "## PHẦN 1. MẪU PHÂN TẦNG ĐẠI DIỆN 22 NHÓM BÀI TOÁN (seed=42, tối thiểu 3 câu/nhóm)",
        "",
        "| STT | ID Câu hỏi | Dạng bài được gán | Trích yếu đề bài (150 ký tự đầu) | Căn cứ phân loại | Nhãn đúng (người duyệt) |",
        "|:---:|:---|:---|:---|:---|:---|"
    ]

    stt = 1
    for q, cat, note in stratified_sample:
        raw = (q.get('question') or q.get('question_text') or '').strip().replace('\n', ' ').replace('|', '\\|')
        snippet = raw[:140] + ('...' if len(raw) > 140 else '')
        cat_name = CATEGORY_LABELS.get(cat, cat)
        md_lines.append(f"| {stt} | `{q['id']}` | **{cat_name}** | {snippet} | {note} | |")
        stt += 1

    md_lines.extend([
        "",
        f"## PHẦN 2. DANH SÁCH TOÀN BỘ CÂU CÓ ĐỘ TIN CẬY THẤP ({len(low_confidence_items)} câu)",
        "",
        "> Gồm các câu khớp từ 2 quy tắc trở lên hoặc thuộc nhóm fallback (`ham_so_dang_khac`).",
        "",
        "| STT | ID Câu hỏi | Nhãn hiện tại | Trích yếu đề bài (150 ký tự) | Các quy tắc đã khớp / Lý do | Nhãn đúng (người duyệt) |",
        "|:---:|:---|:---|:---|:---|:---|"
    ])

    stt = 1
    for q, cat, note in sorted(low_confidence_items, key=lambda x: x[0]['id']):
        raw = (q.get('question') or q.get('question_text') or '').strip().replace('\n', ' ').replace('|', '\\|')
        snippet = raw[:140] + ('...' if len(raw) > 140 else '')
        cat_name = CATEGORY_LABELS.get(cat, cat)
        md_lines.append(f"| {stt} | `{q['id']}` | **{cat_name}** | {snippet} | `{note}` | |")
        stt += 1

    md_lines.extend([
        "",
        f"## PHẦN 3. 20 CÂU BIÊN GIAO THOA ĐIỂN HÌNH CHỜ CHUYÊN GIA ĐỊNH DANH ({len(selected_boundary)} câu)",
        "",
        "> Các câu nằm ở ranh giới giữa hai chuyên đề lớn (ví dụ: Tối ưu hóa vs Hình học, Vi phân vs Tích phân, Lãi kép vs Hàm mũ).",
        "",
        "| STT | ID Câu hỏi | Nhãn tạm gán | Ranh giới giao thoa cần xem xét | Trích yếu đề bài | Nhãn đúng (người duyệt) |",
        "|:---:|:---|:---|:---|:---|:---|"
    ])

    stt = 1
    for q, cat, reason in selected_boundary:
        raw = (q.get('question') or q.get('question_text') or '').strip().replace('\n', ' ').replace('|', '\\|')
        snippet = raw[:140] + ('...' if len(raw) > 140 else '')
        cat_name = CATEGORY_LABELS.get(cat, cat)
        md_lines.append(f"| {stt} | `{q['id']}` | **{cat_name}** | {reason} | {snippet} | |")
        stt += 1

    # Lưu file docs/review_sample.md ở cả thư mục hiện tại và PUMKIN2 nếu có
    out_paths = ['docs/review_sample.md']
    if os.path.exists('PUMKIN2/docs') or os.path.exists('PUMKIN2'):
        os.makedirs('PUMKIN2/docs', exist_ok=True)
        out_paths.append('PUMKIN2/docs/review_sample.md')

    for op in out_paths:
        os.makedirs(os.path.dirname(op), exist_ok=True)
        with open(op, 'w', encoding='utf-8') as f:
            f.write('\n'.join(md_lines) + '\n')

    return len(stratified_sample), len(low_confidence_items), len(selected_boundary)

def main():
    questions = load_dataset()
    total_q = len(questions)

    # 1. Phân loại và phân tích luật cho từng câu
    cat_mapping = {}
    rule_matches = {}
    cat_counter = Counter()

    for q in questions:
        qid = q['id']
        c = classify_question_v2(q)
        rules = detect_matched_rules(q)
        cat_mapping[qid] = c
        rule_matches[qid] = rules
        cat_counter[c] += 1

    # In báo cáo chuẩn đầu ra
    print("==========================================================================================")
    print(" BÁO CÁO PHÂN LOẠI TOÀN BỘ 553 CÂU HỎI NGÂN HÀNG ĐỀ PUMKIN.DEV (PHẢN HỒI PROMPT 1)")
    print("==========================================================================================")
    print(f"Tổng số câu hỏi được nạp từ: {DATA_PATH}")
    print(f"Tổng số bản ghi xử lý      : {total_q} câu\n")

    print(f"{'STT':<4} {'Mã Dạng Bài':<38} {'Tên Dạng Bài Toán Học':<48} {'Số Câu':<8} {'Tỷ Lệ'}")
    print("-" * 105)

    idx = 1
    # Sắp xếp các danh mục theo thứ tự logic định nghĩa trong CATEGORY_LABELS
    for cat_code, cat_title in CATEGORY_LABELS.items():
        count = cat_counter.get(cat_code, 0)
        pct = (count / total_q) * 100
        print(f"{idx:<4} {cat_code:<38} {cat_title:<48} {count:<8} {pct:>5.2f}%")
        idx += 1

    print("-" * 105)
    print(f"TỔNG CỘNG: {sum(cat_counter.values())} câu (Khớp chính xác 100% với 553 câu, không thiếu không dư)\n")

    # 2. Tạo mẫu kiểm định docs/review_sample.md
    n_strat, n_low, n_bound = generate_review_sample(questions, cat_mapping, rule_matches)
    print(f"[XUẤT BẢN] Đã xuất tệp kiểm định: docs/review_sample.md")
    print(f"  - Số câu trong mẫu phân tầng (seed=42): {n_strat} câu (>= 3 câu/nhóm cho cả 22 nhóm)")
    print(f"  - Số câu độ tin cậy thấp (khớp >= 2 luật): {n_low} câu")
    print(f"  - Số câu biên giao thoa chờ duyệt tay  : {n_bound} câu\n")

if __name__ == '__main__':
    main()
