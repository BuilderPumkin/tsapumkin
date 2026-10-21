# BÁO CÁO KIỂM TOÁN VÀ XÁC ĐỊNH TỆP TIN / THƯ MỤC CŨ KHÔNG DÙNG ĐẾN
**Dự án:** Nền tảng Học thuật & Khảo thí Toán học PUMKIN.DEV (MathEval)  
**Ngày lập:** 21/10/2026  
**Người thực hiện:** Antigravity Chief Academic AI Architect  
**Trạng thái kiểm tra:** Hoàn tất quét toàn bộ không gian làm việc (`c:\Users\ADMIN\Downloads\hoctap`)  
**Nguyên tắc an toàn:** Báo cáo xác định và phân loại trước; KHÔNG tự ý xóa tệp khi chưa có sự xác nhận của người dùng.

---

## 1. Tổng quan Kiến trúc Không gian Làm việc (Workspace Topology)

Sau quá trình phát triển qua các mốc từ Sprint 1 đến Milestone W12 (Math API & Nâng cấp thương hiệu MathEval), không gian làm việc hiện tại được chia thành hai phân vùng rõ rệt:

1. **Phân vùng Cốt lõi & Sản xuất (Active Production Workspace):**
   - **`PUMKIN2/`**: Đây là **Git Repository duy nhất** của dự án (kết nối với GitHub `https://github.com/BuilderPumkin/tsapumkin.git`, nhánh `main` và `release/pumkin3`). Chứa toàn bộ mã nguồn đang vận hành:
     - `PUMKIN2/pumkin3/`: Web App Client hoàn chỉnh (theo kiến trúc module hóa). Đây là thư mục đích được cấu hình trong `wrangler.toml` để triển khai lên Cloudflare Pages.
     - `PUMKIN2/pumkin-math-api/`: Backend vi dịch vụ Python FastAPI + SymPy CAS.
     - `PUMKIN2/functions/`: Cloudflare Pages Functions Gateway API.
     - `PUMKIN2/docs/`: Toàn bộ tài liệu kỹ thuật, Runbook, Operations, QA Report và Dossier chính thức.
     - `PUMKIN2/tools/`: Bộ công cụ kiểm thử E2E tự động, đo lường hiệu năng, xoay khóa bảo mật, health check.
   - **`pumkin-math-api-venv/`**: Môi trường ảo Python (Virtual Environment) chứa đầy đủ các thư viện (`fastapi`, `sympy`, `uvicorn`, `pydantic`, `httpx`, `pytest`) đang được file `START_BACKEND.bat` gọi trực tiếp để chạy máy chủ toán học.
   - **`.agents/`**: Bộ kỹ năng AI Antigravity Customization (`pumkin-academic-architect`, `question-authoring-qa`, `socratic-tutor-engine`).
   - **`START_BACKEND.bat`** & **`GEMINI.md`**: File kịch bản khởi động backend và Hiến chương quản trị AI học thuật.

2. **Phân vùng Dư thừa / Tàn tích Lịch sử (Deprecated Legacy Artifacts):**
   - Thư mục gốc `c:\Users\ADMIN\Downloads\hoctap\` thực chất là thư mục giải nén ban đầu. Sau khi dự án được tái cấu trúc và đưa vào Git Repository `PUMKIN2/`, thư mục gốc vẫn còn sót lại rất nhiều thư mục con, file sao lưu đơn khối (>800KB), file patch tạm và các script hỗ trợ di chuyển dữ liệu từ tháng 09/2026.

---

## 2. Bảng Thống kê Tổng hợp (Summary Metrics)

| Chỉ số | Số lượng / Dung lượng | Đánh giá tác động |
| :--- | :--- | :--- |
| **Thư mục cũ không dùng đến (Unused Directories)** | **23 thư mục** | Chiếm dụng dung lượng lớn, gây rối cấu trúc dự án |
| **Tệp tin cũ/rác rời rạc tại gốc (Unused Root Files)** | **38 tệp** | Gây nhầm lẫn giữa file gốc và file trong `PUMKIN2` |
| **Tổng số lượng tệp tin dư thừa cần dọn dẹp** | **658 tệp** | Giảm tải chỉ mục tìm kiếm và quét mã nguồn |
| **Tổng dung lượng đĩa có thể giải phóng** | **33.29 MB** | Giúp workspace sạch sẽ, tăng tốc độ đồng bộ và tìm kiếm |

---

## 3. Danh mục Chi tiết các Thư mục Cũ không dùng đến (Unused Directories)

*Mức độ an toàn: **SAFE** (Có thể xóa/lưu trữ ngay), **CAUTION** (Cần kiểm tra dữ liệu đặc thù trước khi xóa).*

| STT | Tên thư mục | Dung lượng | Số file | Mô tả nguồn gốc & Trạng thái | Đề xuất & Mức an toàn |
| :---: | :--- | :---: | :---: | :--- | :---: |
| 1 | **`PUMKINTSA/`** | 9.21 MB | 122 | Bản prototype từ 22/09/2026 trước khi tách `PUMKIN2`. Chứa bản copy cũ của public, functions, node packages. Toàn bộ tính năng đã có trong `PUMKIN2/pumkin3/`. | **SAFE** (Xóa / Archive) |
| 2 | **`data/`** *(ở thư mục gốc)* | 5.57 MB | 29 | Thư mục dữ liệu cũ ngoài gốc. Lưu ý: có chứa `data/overrides/answer_overrides.json` và `review/answer_mismatch.json` (tạo trong W12). Cần đồng bộ 2 file này vào `PUMKIN2/pumkin3/data/` trước khi dọn. | **CAUTION** (Sync 2 file rồi Xóa) |
| 3 | **`backups/`** | 3.09 MB | 6 | Thư mục snapshot sao lưu cục bộ ngày 22/09/2026 (`snapshot_2026-09-22T...`). Hiện tại đã có Git commit history quản lý toàn bộ phiên bản. | **SAFE** (Xóa / Archive) |
| 4 | **`js/`** *(ở thư mục gốc)* | 2.39 MB | 64 | Thư mục mã nguồn JS cũ trước ngày 14/10/2026. Web production hiện đang chạy toàn bộ mã nguồn tại `PUMKIN2/pumkin3/js/` (đã cập nhật module dịch vụ Math solver, telemetry, v.v.). | **SAFE** (Xóa) |
| 5 | **`vendor/`** *(ở thư mục gốc)* | 1.17 MB | 18 | Bản sao chép thư viện KaTeX và MathJS ở gốc. Đã được tích hợp đầy đủ và đồng bộ tại `PUMKIN2/pumkin3/vendor/`. | **SAFE** (Xóa) |
| 6 | **`reports/`** *(ở thư mục gốc)* | 0.95 MB | 18 | Báo cáo kiểm thử cũ. Báo cáo chính thức mới nhất của hệ thống đã nằm trong `PUMKIN2/reports/`. | **SAFE** (Xóa) |
| 7 | **`scratch/`** *(ở thư mục gốc)* | 0.59 MB | 138 | 138 scripts JS và Python nháp tạo ra trong quá trình sửa lỗi tự động của các subagent cũ từ tháng 9/2026 đến giữa tháng 10/2026. Không còn giá trị vận hành. | **SAFE** (Xóa) |
| 8 | **`backend/`** *(ở thư mục gốc)* | 0.34 MB | 22 | Máy chủ mẫu Express Node.js cũ (`server.js`) từ ngày 22/09/2026. Đã bị thay thế hoàn toàn bởi Backend Python FastAPI trong `PUMKIN2/pumkin-math-api/`. | **SAFE** (Xóa / Archive) |
| 9 | **`scripts/`** *(ở thư mục gốc)* | 0.26 MB | 33 | Các file script gỡ lỗi DOM, kiểm tra thẻ đóng, kiểm tra giao diện của các giai đoạn trước. Không nằm trong quy trình CI/CD. | **SAFE** (Xóa) |
| 10 | **`tests/`** & **`test/`** *(ở thư mục gốc)* | 0.25 MB | 30 | Các file kiểm thử đơn vị cũ viết bằng HTML runner và JS từ tháng 9. Bộ kiểm thử chính thức hiện tại nằm trong `PUMKIN2/pumkin-math-api/tests/` và `PUMKIN2/tools/`. | **SAFE** (Xóa) |
| 11 | **`docs/`** *(ở thư mục gốc)* | 0.24 MB | 40 | Tập hợp các file markdown tài liệu cũ (Phase 2, Sprint 1, gap analysis). Toàn bộ tài liệu kiến trúc chuẩn hiện nằm trong `PUMKIN2/docs/`. | **SAFE** (Archive / Xóa) |
| 12 | **`tools/`** *(ở thư mục gốc)* | 0.24 MB | 41 | Các script phân loại câu hỏi và bổ sung công thức từ Sprint 1 (tháng 9). Bộ công cụ vận hành thực tế hiện tại nằm tại `PUMKIN2/tools/`. | **SAFE** (Xóa) |
| 13 | **`cognitive_router/`** | 0.19 MB | 21 | Mô hình thử nghiệm định tuyến nhận thức từ 16/09/2026. Mã nguồn này đã được tái cấu trúc đưa vào `PumkinJourneyManager.js` và `PumkinLearningTrace.js`. | **SAFE** (Archive / Xóa) |
| 14 | **`css/`** *(ở thư mục gốc)* | 0.17 MB | 9 | Bộ CSS cũ ở gốc. Web app chính thức đang sử dụng CSS được tối ưu hóa trong `PUMKIN2/pumkin3/css/`. | **SAFE** (Xóa) |
| 15 | **`public/`** *(ở thư mục gốc)* | 0.10 MB | 8 | Thư mục public demo cũ từ 23/09/2026. Đã có `PUMKIN2/public/` và `PUMKIN2/pumkin3/`. | **SAFE** (Xóa) |
| 16 | **`functions/`** *(ở thư mục gốc)* | 0.04 MB | 5 | Thư mục Functions cũ ở gốc. Thư mục vận hành thực tế trên Cloudflare Pages là `PUMKIN2/functions/`. | **SAFE** (Xóa) |
| 17 | **`schemas/`** *(ở thư mục gốc)* | 0.02 MB | 9 | Bản sao JSON schemas cũ từ tháng 9. Đã có trong `PUMKIN2/public/schemas/` và `PUMKIN2/schemas/`. | **SAFE** (Xóa) |
| 18 | **`datasets/`** *(ở thư mục gốc)* | 2.6 KB | 1 | Chứa file mẫu `tutor_evaluation.json` cũ từ 09/09/2026. | **SAFE** (Xóa) |
| 19 | **`config/`** *(ở thư mục gốc)* | 0.3 KB | 1 | File cấu hình `router_thresholds.json` cũ từ 20/09/2026. | **SAFE** (Xóa) |
| 20 | **`review/`** *(ở thư mục gốc)* | 3.3 KB | 1 | Chứa `answer_mismatch.json` (kết quả so khớp benchmark W12). Cần đồng bộ vào `PUMKIN2/pumkin3/data/teacher_review/` trước khi dọn. | **CAUTION** (Sync rồi Xóa) |
| 21 | **`img2pptx/`** | 0 KB | 0 | Thư mục rỗng (0 bytes). | **SAFE** (Xóa) |
| 22 | **`.pytest_cache/`** *(ở thư mục gốc)* | 0 KB | 4 | Bộ nhớ đệm chạy test pytest cũ ở gốc. | **SAFE** (Xóa) |

---

## 4. Danh mục Chi tiết các Tệp tin Rời rạc Không dùng đến ở Thư mục Gốc

| STT | Tên tệp | Kích thước | Ngày chỉnh sửa | Mô tả & Lý do không dùng đến | Đề xuất |
| :---: | :--- | :---: | :---: | :--- | :---: |
| 1 | **`pumkin2_backup_20261013.patch`** | **5.85 MB** | 13/10/2026 | File bản vá Git tạm thời tạo ngày 13/10. Nội dung bản vá này đã được merge vĩnh viễn vào lịch sử Git của `PUMKIN2`. Không còn tác dụng. | **XÓA** |
| 2 | **`TSA_do_an.html`** *(ở gốc)* | **844.22 KB** | 21/10/2026 | File HTML đơn khối khổng lồ cũ. Web app đã chuyển hẳn sang `PUMKIN2/pumkin3/index.html` (chỉ 152 KB, tải module tách biệt). | **XÓA / ARCHIVE** |
| 3 | **`index.html.bak`** *(ở gốc)* | **843.17 KB** | 12/10/2026 | File sao lưu dự phòng của phiên bản đơn khối trước khi module hóa. Đã có Git quản lý phiên bản. | **XÓA** |
| 4 | **`index_script.js`** *(ở gốc)* | **653.78 KB** | 12/10/2026 | File JavaScript đơn khối cũ gom tất cả logic vào 1 file 650KB. Đã được phân rã thành các module trong `PUMKIN2/pumkin3/js/`. | **XÓA** |
| 5 | **`index.html`** *(ở gốc)* | **152.78 KB** | 21/10/2026 | File HTML bản sao ở thư mục gốc. Web app thực tế được Cloudflare Pages phục vụ từ thư mục `PUMKIN2/pumkin3/index.html`. | **XÓA** |
| 6 | **`so_tay_kien_thuc.html`** *(ở gốc)* | **112.03 KB** | 17/10/2026 | File HTML sổ tay cũ ở gốc. Bản đang sử dụng nằm tại `PUMKIN2/pumkin3/so_tay_kien_thuc.html`. | **XÓA** |
| 7 | **`OPENDEV.html`** | **70.47 KB** | 22/09/2026 | Trang HTML thử nghiệm giao diện nội bộ từ 22/09/2026. Không dùng trong sản phẩm. | **XÓA** |
| 8 | **`replace_auth.js`** | 11.22 KB | 12/09/2026 | Script migration thay thế logic xác thực chạy 1 lần từ tháng 9. | **XÓA** |
| 9 | **`validate_data.ps1`** | 10.32 KB | 17/09/2026 | Script PowerShell kiểm tra dữ liệu câu hỏi từ Sprint 1. | **XÓA** |
| 10 | **`prompt1_user_request_full.txt`** | 7.69 KB | 17/10/2026 | File văn bản lưu lại nội dung prompt người dùng gửi vào ngày 17/10. | **XÓA** |
| 11 | **`PROJECT_AUDIT.md`** | 7.68 KB | 07/09/2026 | Báo cáo kiểm toán từ ngày đầu dự án (07/09/2026). Đã lỗi thời. | **XÓA** |
| 12 | **`PUMKIN_AI_ARCHITECTURE_AUDIT.md`** | 7.43 KB | 09/09/2026 | Báo cáo kiến trúc AI ban đầu. Đã được thay thế bởi `SPEC.md` và `EVIDENCE_DOSSIER.md`. | **XÓA** |
| 13 | **`PUMKIN_CORE_AUDIT.md`** | 6.65 KB | 09/09/2026 | Báo cáo audit core cũ từ tháng 9. | **XÓA** |
| 14 | **`DEPLOYMENT.md`** *(ở gốc)* | 6.61 KB | 08/09/2026 | Hướng dẫn deploy cũ từ 08/09. File mới nhất nằm ở `PUMKIN2/docs/DEPLOY.md`. | **XÓA** |
| 15 | **`serve.ps1`** | 5.81 KB | 08/09/2026 | Kịch bản chạy server local cũ từ đầu tháng 9. | **XÓA** |
| 16 | **`privacy.html`**, **`terms.html`**, **`404.html`** | ~14 KB | 17/10/2026 | Các trang tĩnh phụ bản sao ở gốc. Đã có trong `PUMKIN2/pumkin3/`. | **XÓA** |
| 17 | **`refactor_storage.js`** | 2.82 KB | 16/09/2026 | Script refactor localStorage chạy 1 lần ngày 16/09. | **XÓA** |
| 18 | **`sw.js`** *(ở gốc)* | 2.77 KB | 14/10/2026 | Service Worker bản sao ở gốc. Bản hoạt động thực tế nằm trong `PUMKIN2/pumkin3/sw.js`. | **XÓA** |
| 19 | **`package.json`** & **`package-lock.json`** *(ở gốc)* | ~2.9 KB | 13/10/2026 | Cấu hình Node ở gốc. Cấu hình quản lý gói chuẩn của dự án nằm trong `PUMKIN2/package.json`. | **XÓA** |
| 20 | **`fix_ls.js`** | 1.86 KB | 23/09/2026 | Script sửa chữa localStorage một lần từ 23/09. | **XÓA** |
| 21 | **`worker.mjs`** | 1.54 KB | 22/09/2026 | Worker Cloudflare thử nghiệm độc lập cũ. | **XÓA** |
| 22 | **`perf_before.log`** | 0.79 KB | 10/09/2026 | File log đo hiệu năng tạm thời ngày 10/09. | **XÓA** |
| 23 | **`final_stats.js`** | 0.62 KB | 16/09/2026 | Script in thống kê một lần ngày 16/09. | **XÓA** |
| 24 | **`manifest.webmanifest`**, **`sitemap.xml`**, **`robots.txt`** | ~2 KB | 22/09/2026 | Các file meta web ở gốc, đã có bản chuẩn trong `PUMKIN2/pumkin3/`. | **XÓA** |
| 25 | **`start-backend.bat`** | 0.46 KB | 10/09/2026 | File bat cũ không nhận diện đúng môi trường venv. (Phân biệt với `START_BACKEND.bat` 3.1 KB đã được nâng cấp hoàn chỉnh). | **XÓA** |
| 26 | **`update_api_base.js`** | 0.45 KB | 12/09/2026 | Script cập nhật URL API một lần từ tháng 9. | **XÓA** |
| 27 | **`wrangler.toml`** *(ở gốc)* | 0.30 KB | 22/09/2026 | Cấu hình Cloudflare cũ trỏ sai đường dẫn. Cấu hình chuẩn duy nhất nằm tại `PUMKIN2/wrangler.toml`. | **XÓA** |

---

## 5. Danh mục Tài nguyên Cốt lõi BẢO VỆ TUYỆT ĐỐI (DO NOT DELETE)

Bất kể phương án dọn dẹp nào được áp dụng, các tài nguyên sau **BẮT BUỘC PHẢI GIỮ NGUYÊN VẸN 100%**:

```
c:\Users\ADMIN\Downloads\hoctap\
├── PUMKIN2/                      <== [GIT REPOSITORY TRUNG TÂM]
│   ├── .git/                     <== Lịch sử commit, liên kết remote GitHub
│   ├── pumkin3/                  <== CLIENT WEB CHÍNH THỨC (MathEval)
│   ├── pumkin-math-api/          <== BACKEND FASTAPI + CAS SYMPY
│   ├── functions/                <== CLOUDFLARE PAGES API GATEWAY
│   ├── docs/                     <== TÀI LIỆU KỸ THUẬT, RUNBOOK, OPERATIONS
│   ├── tools/                    <== CÔNG CỤ CI/CD, HEALTH CHECK, TEST E2E
│   ├── reports/                  <== BÁO CÁO TELEMETRY & KIỂM THỬ SẢN XUẤT
│   ├── schemas/                  <== SCHEMA CƠ SỞ DỮ LIỆU & TELEMETRY
│   ├── wrangler.toml             <== CẤU HÌNH DEPLOY CLOUDFLARE CHÍNH THỨC
│   ├── package.json              <== PHỤ THUỘC TOOLING & PLAYWRIGHT
│   └── START_BACKEND.bat         <== BẢN COPY KHỞI ĐỘNG TRONG PUMKIN2
├── pumkin-math-api-venv/         <== [MÔI TRƯỜNG PYTHON ẢO CHO FASTAPI]
├── .agents/                      <== [CẤU HÌNH AI SKILLS CỦA ANTIGRAVITY IDE]
├── START_BACKEND.bat             <== [KỊCH BẢN CHẠY NHANH BACKEND TẠI GỐC]
└── GEMINI.md                     <== [HIẾN CHƯƠNG QUẢN TRỊ HỌC THUẬT PUMKIN]
```

---

## 6. Đề xuất Phương án Xử lý (Action Plans)

Để đảm bảo nguyên tắc an toàn dữ liệu học thuật và phòng ngừa mọi rủi ro:

### Lựa chọn 1: Phương án An toàn tuyệt đối (Khuyến nghị hàng đầu)
- **Hành động:** 
  1. Đồng bộ 2 file review phát sinh trong W12 (`data/overrides/answer_overrides.json` và `review/answer_mismatch.json`) vào `PUMKIN2/pumkin3/data/teacher_review/`.
  2. Tạo thư mục lưu trữ `c:\Users\ADMIN\Downloads\hoctap\_archive_legacy_2026\`.
  3. Di chuyển toàn bộ 23 thư mục cũ và 38 file rác ở thư mục gốc vào `_archive_legacy_2026\`.
- **Ưu điểm:** Thư mục làm việc lập tức sạch 100%, chỉ còn lại `PUMKIN2/`, `pumkin-math-api-venv/`, `.agents/`, `START_BACKEND.bat`, `GEMINI.md`. Nếu sau này cần đối chiếu lại bất kỳ mã nguồn lịch sử nào, chỉ cần mở thư mục lưu trữ mà không sợ mất mát.

### Lựa chọn 2: Dọn dẹp sạch dứt điểm (Permanent Clean)
- **Hành động:** Xóa vĩnh viễn toàn bộ các file patch lớn (`.patch` 5.85 MB), các file monolithic cũ (`TSA_do_an.html`, `index.html.bak`, `index_script.js`), các thư mục tạm (`scratch/`, `img2pptx/`, `.pytest_cache/`, `backups/`, `PUMKINTSA/`).
- **Ưu điểm:** Giải phóng ngay tức thì 33.29 MB bộ nhớ, tối ưu hóa tốc độ tải và tìm kiếm của IDE.

---

> [!IMPORTANT]
> **Xác nhận từ người dùng:**  
> Hệ thống hiện tại **CHƯA THỰC HIỆN BẤT KỲ THAO TÁC XÓA NÀO**.  
> Bạn hãy xem bảng báo cáo trên và cho biết bạn muốn thực hiện theo:
> - **Lựa chọn 1 (Khuyến nghị):** Di chuyển toàn bộ vào thư mục an toàn `_archive_legacy_2026/`.
> - **Lựa chọn 2:** Xóa sạch vĩnh viễn các file/thư mục không dùng đến này.
> - Hoặc có tệp tin cụ thể nào bạn muốn giữ lại riêng trước khi xử lý.
