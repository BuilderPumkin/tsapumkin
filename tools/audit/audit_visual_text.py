# tools/audit_visual_text.py
import json, sys, re

sys.stdout.reconfigure(encoding='utf-8')

with open('data/questions/all.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

keywords = [
    'hình vẽ', 'hình bên', 'đồ thị bên', 'đồ thị như hình', 'bảng biến thiên',
    'bảng sau', 'như hình', 'cho hàm số có đồ thị', 'hình dưới', 'biểu đồ',
    'sơ đồ', 'cho hình', '(h)', 'tam giác', 'hình chóp', 'hình nón', 'hình trụ',
    'khối đa diện', 'lăng trụ', 'hình phẳng', 'đồ thị'
]

matched_questions = []

for q in questions:
    text = ((q.get('question') or q.get('question_text') or '') + ' ' + (q.get('cloze_text') or '')).lower()
    found = [k for k in keywords if k in text]
    if found:
        matched_questions.append((q, found, text))

print(f"Tổng số câu phát hiện có chứa từ khóa liên quan đến hình/bảng/đồ thị: {len(matched_questions)} / {len(questions)}")

# Phân loại HARD-UNSUPPORTED vs SOFT-REVIEW
hard_unsupported = []
soft_review = []

for q, found, text in matched_questions:
    qid = q.get('id')
    raw_question = q.get('question') or q.get('question_text') or ''
    first_150 = raw_question.strip().replace('\n', ' ')[:150]
    
    # HARD-UNSUPPORTED: Đòi hỏi nhìn trực quan hình vẽ / bảng mà văn bản KHÔNG cung cấp đủ dữ kiện toán học
    # Tiêu chí nhận diện HARD:
    # Có "hình bên", "hình dưới", "như hình vẽ", "đồ thị bên", "bảng sau" mà KHÔNG có phương trình/hàm số tường minh hoặc toạ độ/giả thiết đại số đầy đủ
    is_hard = False
    hard_reason = ""

    # Kiểm tra các câu có "hình bên", "hình dưới", "như hình"
    if any(k in text for k in ['hình bên', 'hình dưới', 'như hình vẽ', 'đồ thị bên', 'đồ thị như hình', 'ở hình bên', 'ở hình vẽ bên']):
        # Nếu có công thức hàm số tường minh y =, f(x) =, f'(x) = thì dữ kiện có thể giải được bằng CAS -> SOFT
        has_formula = bool(re.search(r'y\s*=|f\(x\)\s*=|f\'\(x\)\s*=|g\(x\)\s*=', text))
        # Nếu là hình phẳng giới hạn bởi các đường đã cho công thức tường minh -> SOFT
        has_curve_bounds = ('giới hạn bởi' in text and ('y =' in text or 'y=' in text or 'x =' in text))
        
        if not has_formula and not has_curve_bounds and not ('tam giác' in text and 'cạnh' in text):
            is_hard = True
            hard_reason = "Đề bài tham chiếu hình vẽ/đồ thị bên ngoài mà không có công thức đại số tường minh"

    # Kiểm tra bảng biến thiên mà không có công thức f(x) hoặc f'(x)
    if 'bảng biến thiên' in text or 'bảng xét dấu' in text:
        has_formula = bool(re.search(r'y\s*=|f\(x\)\s*=|f\'\(x\)\s*=', text))
        if not has_formula:
            is_hard = True
            hard_reason = "Đề bài dựa vào bảng biến thiên thuần túy, không có công thức hàm số"

    if is_hard:
        hard_unsupported.append((qid, hard_reason, first_150, found))
    else:
        # Giải thích vì sao là SOFT-REVIEW
        reason = "Có nhắc đến hình học/đồ thị/bảng nhưng toàn bộ giả thiết, tham số, công thức hàm số hoặc toạ độ đã được mô tả đầy đủ bằng văn bản/LaTeX"
        soft_review.append((qid, reason, first_150, found))

print(f"\n=======================================================")
print(f"KẾT QUẢ PHÂN LOẠI PHỤ THUỘC HÌNH VẼ / TRỰC QUAN")
print(f"=======================================================")
print(f"1. HARD-UNSUPPORTED : {len(hard_unsupported)} câu")
for item in hard_unsupported:
    print(f"  - [{item[0]}]: {item[1]}")
    print(f"    Trích đề: {item[2]}...")
    print(f"    Từ khóa khớp: {item[3]}")

print(f"\n2. SOFT-REVIEW      : {len(soft_review)} câu")
print(f"  (Đã trích xuất {len(soft_review)} câu, ví dụ 10 câu đầu):")
for item in soft_review[:10]:
    print(f"  - [{item[0]}]: {item[1]}")
    print(f"    Trích đề: {item[2]}...")
    print(f"    Từ khóa khớp: {item[3]}")
