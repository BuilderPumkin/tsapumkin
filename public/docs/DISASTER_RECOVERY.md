# PUMKIN.DEV — SRE DISASTER RECOVERY & ROLLBACK RUNBOOK

Tài liệu hướng dẫn khôi phục thảm họa (Disaster Recovery) và hoàn tác triển khai (Rollback Procedure) dành cho Quản trị viên Vận hành và SRE của nền tảng PUMKIN.DEV.

---

## 1. Cơ Chế Hoàn Tác 1-Click Trên Cloudflare Pages

Cloudflare Pages lưu trữ lịch sử bản dựng bất biến (immutable deployments). Khi phát hiện sự cố nghiêm trọng trên Production:

1. Truy cập **[Cloudflare Dashboard](https://dash.cloudflare.com/)** $\rightarrow$ **Workers & Pages**.
2. Chọn dự án **`tsapumkin`**.
3. Chọn thẻ **Deployments** (Bản dựng).
4. Tìm bản dựng thành công gần nhất trước đó (có nhãn `Success` màu xanh).
5. Nhấp vào biểu tượng **`...`** ở góc phải bản dựng đó $\rightarrow$ Chọn **Rollback to this deployment** (Hoàn tác về bản dựng này).
6. Xác nhận hoàn tác. Cloudflare Edge sẽ lập tức định tuyến 100% lưu lượng truy cập toàn cầu về bản dựng cũ trong vòng **30 giây**.

---

## 2. Quy Trình Hoàn Tác Bằng Git

Nếu cần hoàn tác nhánh `main` trên GitHub:

```bash
# 1. Xem lịch sử commit gần nhất
git log --oneline -n 5

# 2. Hoàn tác commit lỗi (tạo commit đảo ngược an toàn)
git revert HEAD --no-edit

# 3. Đẩy commit hoàn tác lên GitHub (kích hoạt Cloudflare Pages tự động build lại)
git push origin main
```

---

## 3. Khôi Phục Dữ Liệu Ngân Hàng Câu Hỏi & Đề Thi

Khi dữ liệu ngân hàng đề thi hoặc lý thuyết bị hỏng:

1. Thư mục sao lưu định kỳ nằm tại `backups/snapshot_YYYY-MM-DD...`.
2. Kiểm tra tệp `manifest.json` trong thư mục sao lưu để đối chiếu mã băm SHA-256.
3. Khôi phục các tệp vào `data/`:
   ```bash
   node scripts/export_backup.js
   ```
4. Kiểm tra toàn vẹn hệ thống bằng bộ test:
   ```bash
   npm test
   ```

---

## 4. Kích Hoạt Chế Độ Fallback Khẩn Cấp (Emergency Kill-Switch)

Trong trường hợp dịch vụ AI của Google gặp sự cố gián đoạn diện rộng:
1. Nền tảng PUMKIN.DEV có cơ chế tự ngắt (Circuit Breaker) và chuyển sang chế độ gợi ý offline tĩnh từ sổ tay kiến thức (`so_tay_kien_thuc.html`).
2. Học sinh vẫn hoàn toàn làm bài luyện thi trắc nghiệm và xem lời giải phân tích bình thường mà không bị ảnh hưởng.
