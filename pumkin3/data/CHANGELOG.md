# 📝 NHẬT KÝ THAY ĐỔI DỮ LIỆU (DATASET CHANGELOG)

Tất cả các thay đổi quan trọng đối với tập dữ liệu công khai của PUMKIN.DEV sẽ được ghi lại trong tài liệu này.

---

## [v1.2.0] — 2025-09-08
### Bổ sung
- Tích hợp Cổng Dữ liệu Mở (Open Data Hub) theo chuẩn GitHub Public Repository.
- Xuất bản tệp kê khai `manifest.json` chứa 22 mã băm SHA-256 độc lập.
- Hỗ trợ xuất định dạng CSV UTF-8 với BOM tương thích 100% Microsoft Excel.
- Xuất bản tài liệu Cẩm nang Toán học `knowledge_handbook.md` và Bảng tra cứu `cheatsheet.md` chuẩn KaTeX.
- Bổ sung 4 JSON Schemas Draft 2020-12 cho Question, Exam, Knowledge và Manifest.

### Cải tiến
- Chuẩn hóa cấu trúc 165 câu hỏi qua 4 dạng bài: Single Choice, True/False Group, Short Answer, Step Solution.
- Chuẩn hóa 42 đề thi kèm ma trận độ khó và thời gian thực hành.
- Bảo đảm nguyên tắc phân tách 3 tầng dữ liệu: Public Source, Public Data, Private User Data.