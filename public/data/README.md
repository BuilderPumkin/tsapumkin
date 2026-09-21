# 🌐 PUMKIN.DEV — CỔNG DỮ LIỆU MỞ & PUBLIC DATA REPOSITORY

Chào mừng bạn đến với **Kho dữ liệu mở phục vụ học tập và ôn luyện Toán học** của nền tảng **PUMKIN.DEV**.

Toàn bộ dữ liệu tại đây được thiết kế theo tư duy **GitHub Public Repository**, cho phép học sinh, giáo viên, sinh viên và lập trình viên tải về nguyên bản 1-click hoặc gọi API trực tiếp.

---

## 🛡️ NGUYÊN TẮC BẢO MẬT: PHÂN TÁCH 3 LOẠI DỮ LIỆU

1. **A. Public Source Code**: Frontend HTML, CSS, JavaScript công khai mã nguồn trên GitHub.
2. **B. Public Raw Educational Data**: 165 câu hỏi, 42 đề thi, 25 chuyên đề lý thuyết lưu trữ mở dạng JSON, CSV, Markdown trong thư mục `data/`.
3. **C. Private User Data**: Tài khoản học sinh, mật khẩu đã băm (SHA-256), kết quả làm bài chỉ lưu trữ cục bộ tại trình duyệt (Local Storage), bảo mật 100% không gửi lên máy chủ.

---

## 📊 DANH MỤC DỮ LIỆU NGUYÊN BẢN (PUBLIC RAW DATA)

| Tệp dữ liệu | Định dạng | Số lượng | Mô tả |
|-------------|-----------|----------|-------|
| `bundle.json` | JSON | 236 mục | Toàn bộ ngân hàng câu hỏi, đề thi, lý thuyết trong 1 file duy nhất |
| `manifest.json` | JSON | 22 tệp | Siêu dữ liệu, phiên bản v1.2.0 và toàn bộ mã băm SHA-256 |
| `questions/all.json` | JSON | 165 câu | Ngân hàng câu hỏi chuẩn hóa kèm lời giải chi tiết |
| `questions/questions.csv` | CSV | 165 dòng | Bảng tính UTF-8 mở trực tiếp bằng Microsoft Excel |
| `questions/tsa.json` | JSON | 62 câu | Câu hỏi Toán tư duy ĐHBK Hà Nội |
| `questions/hsa.json` | JSON | 47 câu | Câu hỏi Tư duy định lượng ĐHQGHN |
| `questions/thpt.json` | JSON | 32 câu | Câu hỏi thi Tốt nghiệp THPT Quốc Gia |
| `questions/calculus1.json` | JSON | 24 câu | Câu hỏi Toán Giải tích 1 & Đại số tuyến tính Đại học |
| `exams/all.json` | JSON | 42 đề | Kho đề thi chuẩn quy chế kèm ma trận phân bổ |
| `exams/tsa.json` | JSON | 12 đề | Đề thi TSA Bách Khoa có bấm giờ làm bài |
| `exams/hsa.json` | JSON | 12 đề | Đề thi HSA ĐHQGHN |
| `exams/thpt.json` | JSON | 14 đề | Đề thi THPT Quốc Gia |
| `exams/calculus1.json` | JSON | 4 đề | Đề thi kết thúc học phần Giải tích 1 |
| `knowledge/all.json` | JSON | 25 bài | Sổ tay 25 chuyên đề bài giảng từ Toán 10 đến Giải tích 1 |
| `knowledge/knowledge_handbook.md` | Markdown | 25 bài | Cẩm nang Toán học toàn tập định dạng Markdown KaTeX |
| `formulas/cheatsheet.json` | JSON | 44 công thức | Bảng công thức KaTeX toán học cốt lõi |
| `formulas/cheatsheet.md` | Markdown | 44 công thức | Bảng tra cứu công thức Markdown dễ đọc |
| `taxonomy/topics.json` | JSON | 5 khối | Cây phân loại khối lớp, chương và dạng câu hỏi |

---

## ⚡ HƯỚNG DẪN TRUY XUẤT RAW ENDPOINT & DEVELOPER API

### 1. JavaScript (fetch API)
```javascript
// Tải toàn bộ ngân hàng 165 câu hỏi
fetch("https://raw.githubusercontent.com/pumkindev/math-exam-platform/main/data/questions/all.json")
  .then(res => res.json())
  .then(questions => {
    console.log("Tổng số câu hỏi:", questions.length);
  });
```

### 2. Python (requests)
```python
import requests
manifest = requests.get("https://raw.githubusercontent.com/pumkindev/math-exam-platform/main/data/manifest.json").json()
print("Phiên bản dataset:", manifest["version"])
```

### 3. PowerShell
```powershell
$bundle = Invoke-RestMethod "https://raw.githubusercontent.com/pumkindev/math-exam-platform/main/data/bundle.json"
Write-Host "Tổng số câu hỏi: $($bundle.questions.Count)"
```

---

## ⚖️ GIẤY PHÉP MỞ (OPEN DATA LICENSE)

Dữ liệu giáo dục được phát hành theo giấy phép **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)**.