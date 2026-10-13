# PUMKIN ACADEMIC CSS DESIGN SYSTEM

Hệ thống phong cách trực quan (Design System) của nền tảng học thuật **PUMKIN.DEV**, được cấu trúc theo mô hình phân tầng **Inverted Triangle CSS (ITCSS)** thuần khiết (Zero-build Vanilla CSS) không phụ thuộc bundler.

---

## 1. Cấu trúc Phân tầng & Mục đích từng File

Toàn bộ 5.876 dòng CSS nguyên khối trước đây đã được phân tách thành 5 tầng nạp theo thứ tự cascade nghiêm ngặt trong thẻ `<head>` của `index.html`:

```html
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/layout.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/features.css">
<link rel="stylesheet" href="css/responsive.css">
```

### Chi tiết các tầng:

| Thứ tự | Tệp tin | Dải dòng gốc | Vai trò & Trách nhiệm |
| :---: | :--- | :---: | :--- |
| **Tầng 1** | `css/base.css` | 63 – 488 | **Nền tảng & Tokens**: Khai báo toàn bộ Design Tokens tại `:root` (bảng màu Oxford Navy Slate `#0f172a`, Terracotta `#ea580c`, Emerald `#0f766e`, hệ thống bóng `--shadow-*`, biến input, kích thước thanh cuộn). Reset trình duyệt (`*`, `html`, `body`), Typography chuẩn (`h1`–`h4`), hộp thông báo `.callout`, thẻ công thức cơ bản và bảng số liệu `.table-responsive`. |
| **Tầng 2** | `css/layout.css` | 489 – 1132 | **Khung sườn App Shell**: Thanh điều hướng thương hiệu (`.pumkin-nav-container`, `.nav-links`), cơ chế phân trang view (`.app-view.active`), tiêu đề chung, thanh lọc & tìm kiếm (`.filter-panel`), lưới thẻ đề thi (`.exam-grid`), hệ thống nút bấm cơ bản (`.btn`, `.btn-primary`...) và shell phòng thi với đồng hồ nhịp đập (`.timer-box`). |
| **Tầng 3** | `css/components.css` | 1133 – 2630 | **Thành phần giao diện tái sử dụng**: Bố cục phòng thi 80/20 (`.player-main-layout`), thẻ phương án chọn (`.option-card`), ma trận ô số Navigator (`.nav-cell-btn`), thẻ xem lại kết quả (`.review-card`, `.explanation-card`), Modal cấu hình sinh đề & Modal Overlay. Bộ 5 module dạng bài HSA/TSA: Dạng 1 Chọn đơn, Dạng 2 Đúng/Sai chùm 4 ý, Dạng 3 Điền số ngắn, Dạng 4 Tự luận bước, Dạng 5 Kéo thả Cloze, cùng định dạng in ấn `@media print`. |
| **Tầng 4** | `css/features.css` | 2631 – 4952 | **Nghiệp vụ Chuyên sâu & Theme Tối**: Sổ tay học thuật (`.knowledge-card`, bài đọc `.article-layout`), Ngân hàng câu hỏi QBank, Lộ trình năng lực thích ứng. Hệ thống Giao diện tối Obsidian Slate (`body.dark-mode`), khối bẫy nhận thức, giao diện gia sư AI, bảng dữ liệu mở/API endpoint, bộ DNA câu hỏi & chẩn đoán lỗi sai (`.dna-pill`, `.error-pill`), thông báo Toast và hộp thoại xác nhận. |
| **Tầng 5** | `css/responsive.css` | 4953 – 5938 | **Tương thích Thiết bị & Trải nghiệm Cao cấp**: Breakpoint Tablet `<= 860px` (thanh điều hướng 2 tầng, touch slider), Breakpoint Smartphone `<= 480px`, trạng thái rỗng và xoay chờ. Đấu trường Live Lobby, Hệ thống Gamification cấp độ (`.user-level-profile-card`, thẻ thưởng EXP), Khóa Boss Deep Learning với dây xích đôi đan chéo (`.btn-deep-learning.is-locked`), thanh cuộn tùy biến, range slider cảm ứng và tối ưu hiệu năng kết xuất (`contain: layout style`). |

---

## 2. Quy ước Tác giả & Thêm CSS Mới (Authoring Conventions)

Để duy trì tính toàn vẹn của kiến trúc và tránh ô nhiễm mã nguồn, lập trình viên BẮT BUỘC tuân thủ:

1. **Tuyệt đối KHÔNG viết thẻ `<style>` nội dòng trong `index.html`**:
   Mọi quy tắc giao diện mới phải được đặt vào đúng file CSS phân tầng tương ứng.
2. **Quy tắc phân loại khi thêm mã CSS mới**:
   - Thêm nút bấm, badge, thẻ card, modal chung $\to$ Thêm vào `css/components.css`.
   - Thêm màn hình học tập mới, sổ tay mới, hoặc giao diện dark mode chuyên sâu $\to$ Thêm vào `css/features.css`.
   - Thêm `@media query` hoặc tinh chỉnh kích thước màn hình nhỏ $\to$ Thêm vào `css/responsive.css`.
   - Thêm biến màu hoặc biến kích thước toàn cục $\to$ Khai báo tại `:root` trong `css/base.css`.
3. **Quy tắc đặt tên (Naming Convention)**:
   - Sử dụng kebab-case có ý nghĩa ngữ nghĩa: `.pumkin-card`, `.nav-cell-btn`.
   - Trạng thái phần tử sử dụng tiền tố rõ ràng: `.is-locked`, `.is-active`, `.selected`.
   - Không tự ý tăng độ đặc hiệu bằng cách lạm dụng `!important` trừ trường hợp Dark Mode override hoặc lớp tiện ích responsive.
4. **Tương thích Toán học**:
   - Sử dụng các lớp của KaTeX (`.katex`, `.katex-display`). Không sử dụng các selector tàn dư cũ của MathJax (`mjx-container`).
