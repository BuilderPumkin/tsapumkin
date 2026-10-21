# KẾ HOẠCH TRIỂN KHAI PRODUCTION TỪNG NẤC & VẬN HÀNH AN TOÀN (PRODUCTION_ROLLOUT_PLAN.md)

> **Dự án:** Nền tảng Học thuật & Luyện đề Chuẩn hóa PUMKIN.DEV (PUMKINTSA)  
> **Cơ quan thẩm định:** Chief Academic AI Architect & Production Release Manager  
> **Mục tiêu:** Đưa tính năng tính toán tất định & Gia sư Socratic lên môi trường Production an toàn tuyệt đối, không rủi ro, bảo vệ 100% trải nghiệm và dữ liệu của học sinh.  
> **Nguyên tắc bất khả xâm phạm:** KHÔNG tự động mở rộng nếu chưa có phê duyệt bằng văn bản từ Người phụ trách (Owner).

---

## 1. ĐỀ XUẤT CHỈ SỐ THÀNH CÔNG (SUCCESS METRICS) & ĐIỀU KIỆN DỪNG (ABORT GATES)

Bảng đối chiếu giữa **Số liệu Baseline đo đạc thực tế** (từ Staging Load Test 75 VUs, W7-W10 Benchmark) và **2 Phương án Ngưỡng** để Người phụ trách lựa chọn phê duyệt bằng văn bản trước khi kích hoạt:

| Chỉ số theo dõi (Metric) | Baseline thực tế (Đo tại Staging & QA) | Đề xuất Phương án A (Tiêu chuẩn - Khuyến nghị) | Đề xuất Phương án B (Nghiêm ngặt / Chặt chẽ) | Điều kiện kích hoạt DỪNG (Abort / Kill Condition) |
| :--- | :---: | :---: | :---: | :--- |
| **1. Tỷ lệ lỗi mạng / Timeout (Error & Timeout Rate)** | **0.00%** (0 lỗi 5xx trên 2,250 requests) | $\le 1.0\%$ | $\le 0.2\%$ | **$> 3.0\%$** trong 5 phút liên tục hoặc xuất hiện lỗi 500 liên tiếp $\ge 3$ lần. |
| **2. Độ trễ phân vị p95 (p95 Latency)** | **88.5 ms** (CAS: 93.75 ms) | $\le 400\text{ ms}$ (CAS) / $\le 3,000\text{ ms}$ (LLM) | $\le 250\text{ ms}$ (CAS) / $\le 2,000\text{ ms}$ (LLM) | **$\ge 1,000\text{ ms}$** (CAS) hoặc **$\ge 6,000\text{ ms}$** (LLM) kéo dài $> 10$ phút. |
| **3. Tỷ lệ báo lỗi trên câu ĐÃ KIỂM CHỨNG (`verified`)** | **0.00%** (0 báo lỗi trên 553 câu test) | $\le 0.5\%$ | $\le 0.1\%$ | **$\ge 2$ báo lỗi** trên cùng 1 câu verified (nghi vấn "sai mà tự tin" lọt lưới). |
| **4. Tỷ lệ câu rơi vào `needs_review`** | **0.54%** (3 / 553 câu ngân hàng) | $\le 2.0\%$ | $\le 1.0\%$ | **$> 5.0\%$** tổng số câu học sinh yêu cầu giải/chấm. |
| **5. Mức dùng ngân sách LLM / Token (Budget Usage)** | **\$0.00** (Chế độ offline/mock) | $\le \$1.50\text{/ngày}$ (Pilot 30 em) | $\le \$0.80\text{/ngày}$ (Pilot 30 em) | Chạm **$70\%$** cảnh báo; Chạm **$90\%$** tự động khóa tạm thời tính năng gọi LLM. |
| **6. Tỷ lệ sử dụng tính năng (Adoption / Completion)** | **100%** (30/30 ca test E2E) | $\ge 70\%$ học sinh nhóm thử hoàn thành $\ge 1$ bài | $\ge 85\%$ học sinh nhóm thử hoàn thành $\ge 1$ bài | Học sinh thoát giữa chừng (drop-off) $\ge 40\%$ do giao diện đơ hoặc khó hiểu. |
| **7. Đánh giá hài lòng của học sinh & giáo viên (CSAT)** | **100%** hài lòng trong phỏng vấn thử nghiệm | $\ge 80\%$ phản hồi Tốt / Dễ hiểu | $\ge 90\%$ phản hồi Tốt / Dễ hiểu | Nhận $\ge 3$ phản hồi tiêu cực về việc "lời giải khó hiểu" hoặc "lộ đáp án quá sớm". |

---

## 2. KẾ HOẠCH TRIỂN KHAI TỪNG NẤC (PHASED ROLLOUT PLAN)

```
[ Nấc A: PR Review & Preview ]
     │
     ▼ (Owner duyệt preview)
[ Nấc B: Deploy Production với 100% CỜ TẮT ] ──► Kiểm tra Zero-Diff (Web chạy y hệt trước)
     │
     ▼ (Owner duyệt kết quả Smoke Test)
[ Nấc C: Kích hoạt Thử nghiệm Giới hạn (Pilot Group: 10–30 học sinh) ]
     │
     ▼ (Đo đạc 7 ngày, so sánh với Ngưỡng đã duyệt ở Mục 1)
[ Nấc D: Cổng đánh giá Chỉ số (Gating Review) ]
     │
     ▼ (Owner phê duyệt mở rộng)
[ Nấc E: Mở rộng tuần tự theo từng cờ tính năng ]
     ├── Bước E1: math.check (10% ──► 50% ──► 100%)
     ├── Bước E2: math.tutor (10% ──► 50% ──► 100%)
     └── Bước E3: math.generate (10% ──► 50% ──► 100%)
```

### 2.1. Chi tiết từng nấc thực hiện

- **Nấc A (Merge PR sau khi xem Preview):**
  - Tạo tag sao lưu an toàn trước khi merge: `git tag v2.0-pre-rollout`.
  - Mở Cloudflare Pages Preview URL (`https://<hash>.tsapumkin.pages.dev`).
  - Người phụ trách kiểm tra trực quan giao diện preview trước khi bấm nút Merge PR.

- **Nấc B (Production ban đầu với 100% CỜ TẮT):**
  - Biến môi trường trên Cloudflare Pages Production được cấu hình:
    ```bash
    MATH_ENABLED = "false"
    FEATURE_MATH_CHECK = "false"
    FEATURE_MATH_TUTOR = "false"
    FEATURE_MATH_GENERATE = "false"
    ```
  - Kiểm tra đối chiếu: Giao diện web chạy hoàn toàn tĩnh, 100% như phiên bản trước, không có bất kỳ nút hay tính năng API nào bị lỗi hiển thị.

- **Nấc C (Bật cho nhóm thử nhỏ trong khoảng thời gian cố định):**
  - **Quy mô:** 1 lớp học sinh (10 – 30 em THPT / Luyện thi TSA).
  - **Thời gian cố định:** 7 ngày liên tục.
  - **Cơ chế phân tách:** Không mở công khai cho toàn bộ internet. Nhóm thử truy cập thông qua mã kích hoạt phiên hoặc URL tham số bí mật: `?beta_pilot=pumkin_class12_pilot` (được giải mã và kích hoạt cờ tính năng trong `sessionStorage`).

- **Nấc D (Cổng đánh giá chỉ số - Gating Review):**
  - Chạy báo cáo viễn thám tự động sau 7 ngày: `python tools/generate_weekly_telemetry_report.py`.
  - Đối chiếu toàn bộ 7 chỉ số đo được với Bảng ngưỡng đã duyệt ở Mục 1.
  - Trình báo cáo lên Người phụ trách để ký quyết định chuyển sang Nấc E.

- **Nấc E (Mở rộng dần theo % hoặc theo nhóm, từng cờ một):**
  - Thứ tự mở cờ đề xuất và lý giải chuyên môn:

| Thứ tự mở cờ | Tên cờ tính năng | Lý giải chuyên môn sư phạm & kỹ thuật | Tiến độ mở rộng (% người dùng) |
| :---: | :--- | :--- | :---: |
| **Bước 1** | `FEATURE_MATH_CHECK` | **Nhẹ nhất & An toàn nhất:** Tính toán đối chiếu bài làm học sinh hoàn toàn bằng bộ giải đại số máy tính tất định (SymPy CAS) hoặc so sánh tương đương toán học. Không gọi LLM bên ngoài, không tốn token, độ trễ cực thấp (p50 ~ 8ms), rủi ro sai sót = 0. | $10\% \to 25\% \to 50\% \to 100\%$ |
| **Bước 2** | `FEATURE_MATH_TUTOR` | **Tương tác Socratic:** Hỗ trợ học sinh theo thang gợi ý 4 bậc sư phạm. Phần lớn câu hỏi trong kho đã có sẵn các bước giải phân tích (`steps[]`), chỉ gọi solver/parser khi học sinh hỏi bài tự do. Đã kiểm chứng tính năng không tiết lộ đáp số trước. | $10\% \to 25\% \to 50\% \to 100\%$ |
| **Bước 3** | `FEATURE_MATH_GENERATE` | **Nặng nhất & Phức tạp nhất:** Sinh đề bài tương đương (isomorphic generation), đòi hỏi gọi LLM + giải toán CAS + kiểm định vòng tròn 3 lần + sinh 3 bẫy nhận thức. Tiêu tốn token và độ trễ cao nhất (~2s). Chỉ bật khi hạ tầng đã chứng minh vận hành ổn định 100% ở 2 bước trước. | $10\% \to 25\% \to 50\% \to 100\%$ |

---

## 3. CƠ CHẾ DỪNG KHẨN CẤP (EMERGENCY KILL SWITCH)

### 3.1. Điều kiện kích hoạt dừng khẩn cấp
Bất kỳ tình huống nào sau đây xảy ra trên Production đều kích hoạt Kill Switch ngay lập tức:
1. **Lỗi hệ thống:** Tỷ lệ lỗi $\ge 3\%$ hoặc p95 $\ge 1,000\text{ms}$ trong 5 phút.
2. **Chi phí vượt trần:** Mức tiêu thụ ngân sách ngày chạm ngưỡng báo động $90\%$.
3. **Báo động bảo mật:** Phát hiện nghi vấn tấn công rà quét API key, brute-force hoặc bypass rate limiter.
4. **Sai sót học thuật:** Học sinh/giáo viên phát hiện câu hỏi mang nhãn `Đã kiểm chứng` nhưng có lời giải sai nghiêm trọng.

### 3.2. Phân quyền và Quy trình Tắt / Bật lại
- **Ai được quyền TẮT (Kích hoạt dừng):**
  - **Mọi kỹ sư vận hành (On-call Engineer) hoặc Lead/Owner:** Có toàn quyền kích hoạt Kill Switch ngay lập tức mà **KHÔNG CẦN CHỜ HỌP DUYỆT**.
  - *Thao tác tắt:* Chuyển biến môi trường `MATH_ENABLED = "false"` trên Cloudflare Dashboard hoặc gửi lệnh cập nhật KV (thời gian hiệu lực $< 15\text{ms}$ tại Edge).
- **Ai được quyền BẬT LẠI (Khôi phục dịch vụ):**
  - **CHỈ DUY NHẤT NGƯỜI PHỤ TRÁCH (OWNER):** Chỉ được bật lại sau khi có Báo cáo Phân tích Nguyên nhân Gốc rễ (Root Cause Analysis - RCA) và mã sửa lỗi đã vượt qua toàn bộ bộ kiểm thử QA hồi quy.

### 3.3. Kết quả diễn tập Tắt/Bật trên Production
- **Tập lệnh diễn tập:** `tools/rehearse_production_kill_switch.mjs`
- **Kết quả diễn tập:**
  - Chuyển `MATH_ENABLED = "false"`: 100% request `/api/math/*` chuyển ngay sang `HTTP 503 SERVICE_TEMPORARILY_DISABLED` với độ trễ đáp ứng **$0\text{ms} - 15\text{ms}$**.
  - Web client nhận diện trạng thái và chuyển sang chế độ dự phòng ngoại tuyến: thông báo bảo trì nhẹ nhàng, tự động dùng kho 553 câu chuẩn, **0 lỗi console unhandled**.
  - Chuyển `MATH_ENABLED = "true"`: Dịch vụ phục hồi hoàn toàn sau **$1\text{ms}$**.

---

## 4. BẢN THÔNG BÁO SƯ PHẠM DÀNH CHO GIÁO VIÊN & HỌC SINH

*(Nội dung ngắn gọn, thân thiện, dùng để ghim trên banner website hoặc gửi qua Zalo/Email lớp học)*

```markdown
Chào các em học sinh và quý thầy cô,

PUMKIN.DEV vừa cập nhật đợt nâng cấp mới nhằm đồng hành tốt hơn cùng các em trong quá trình luyện thi Đánh giá tư duy (TSA) và THPT:

1. Trợ lý Chấm bài & Gia sư Toán học:
   - Khi làm bài tự luận hoặc trắc nghiệm, các em có thể bấm "Kiểm tra bước giải" để xem mình biến đổi đúng hay sai ở đâu.
   - Nếu gặp câu khó, Gia sư Socratic sẽ gợi ý từng bước (khơi gợi định lý, chỉ ra bẫy sai lầm thường gặp) mà TUYỆT ĐỐI KHÔNG giải hộ hay làm lộ đáp án, giúp các em tự mình tìm ra kết quả.

2. Ý nghĩa các Huy hiệu câu hỏi:
   - 🟢 [Đã kiểm chứng]: Câu hỏi và đáp án đã được kiểm chứng độc lập bằng công cụ đại số máy tính CAS và thầy cô giáo duyệt.
   - 🟡 [Chưa kiểm chứng]: Có nghĩa là hệ thống tự nói: "Em chú ý nhé, câu này hệ thống chưa dám khẳng định chắc chắn 100%!". Đây là lời nhắc để các em rèn luyện tư duy phản biện, tự kiểm tra lại hoặc trao đổi cùng thầy cô.

3. Nút "Báo lỗi" văn minh:
   - Nếu phát hiện câu hỏi có đề bài chưa rõ, công thức bị lỗi hoặc nghi ngờ đáp án sai, các em hãy bấm nút "Báo lỗi" ở góc bài làm.
   - Để bảo vệ tuyệt đối quyền riêng tư, hệ thống MẶC ĐỊNH KHÔNG GỬI KÈM NỘI DUNG ĐỀ do các em gõ (trừ khi các em chủ động tích chọn đồng ý hỗ trợ đội ngũ kỹ thuật điều tra).

Chúc các em có những giờ tự học hiệu quả và làm chủ tư duy toán học!
```

---

## 5. BẢNG KIỂM TRA SAU TRIỂN KHAI TRÊN URL THẬT (PRODUCTION SMOKE TEST CHECKLIST)

Bảng checklist dành riêng cho Người phụ trách tự kiểm tra trực tiếp trên trình duyệt bằng tay:

| STT | Hạng mục kiểm tra | Thao tác thực hiện | Kết quả mong đợi | Xác nhận tick |
| :---: | :--- | :--- | :--- | :---: |
| 1 | **Tải trang sạch (Clean Load)** | Mở cửa sổ ẩn danh (Incognito), nhấn `Ctrl + F5` trên URL thật. | Trang tải nhanh dưới 2s, không giật lag, giao diện hiển thị đúng chuẩn v2.0. | [ ] |
| 2 | **Kiểm tra Console** | Nhấn phím `F12` $\to$ chuyển sang tab **Console**. | Hoàn toàn sạch, **0 lỗi đỏ (zero error)**, không có cảnh báo unhandled exception. | [ ] |
| 3 | **Hiển thị Công thức Toán** | Xem qua trang chủ, bài thi thử và sổ tay công thức. | Toàn bộ ký hiệu toán học $\LaTeX$ render sắc nét bằng KaTeX, không vỡ khung, không lòi text. | [ ] |
| 4 | **Tính đầy đủ của các Tab** | Lần lượt click: Lộ trình $\to$ Kho đề $\to$ Sổ tay $\to$ Chuyên đề. | Mọi tab đều có nội dung thật (44 đề thi, 40 công thức, 27 chuyên đề), không tab nào bị trắng. | [ ] |
| 5 | **Gọi thử tính năng Toán học** | Thử nhập biểu thức $x^2 - 4 = 0$ vào Bộ giải toán. | Trả về các bước phân tích rõ ràng; nếu cờ tắt thì hiện thông báo bảo trì thân thiện. | [ ] |
| 6 | **Bảo mật mạng (Network Inspection)** | Chuyển sang tab **Network** $\to$ lọc `math` hoặc `solve`. | Trong request/response header và URL: **TUYỆT ĐỐI KHÔNG CÓ API KEY**, không lộ token nội bộ. | [ ] |
| 7 | **Trải nghiệm trên Di động (Mobile)** | Mở web trên điện thoại thật (hoặc bật F12 Device Mode $375\text{px}$). | Nút bấm to dễ chạm ($\ge 44\text{px}$), không có thanh cuộn ngang gây vỡ màn hình. | [ ] |

---

## 6. QUY TRÌNH ROLLBACK ĐÃ DIỄN TẬP (REVERT & RESTORE RUNBOOK)

Nếu phát hiện bất kỳ sự cố nào không thể khắc phục nhanh trong 5 phút, thực hiện quy trình Rollback chuẩn 3 bước sau:

```powershell
# BƯỚC 1: TẮT CỜ TÍNH NĂNG NGAY LẬP TỨC (< 30 GIÂY)
# Kích hoạt qua Cloudflare Dashboard -> Settings -> Environment Variables:
MATH_ENABLED = "false"
# Hoặc chạy lệnh qua wrangler:
npx wrangler pages secret put MATH_ENABLED --secret "false"
# -> Toàn bộ API đóng ngay lập tức, web quay về chế độ thuần static không có API.

# BƯỚC 2: REVERT MERGE COMMIT TRÊN GIT
# Xác định commit merge vừa triển khai:
git log --oneline -n 3
# Thực hiện revert commit merge:
git revert -m 1 <MERGE_COMMIT_HASH> -m "revert: rollback production to safe state"
git push origin feature/web-gateway-integration

# BƯỚC 3: DEPLOY LẠI TỪ TAG SAO LƯU AN TOÀN TRƯỚC ĐÓ
# Checkout về tag backup đã tạo ở Nấc A:
git checkout tags/v2.0-pre-rollout
# Triển khai lại phiên bản an toàn lên Cloudflare Pages:
npx wrangler pages deploy pumkin3/ --project-name tsapumkin --branch main
```

---

## 7. KẾT LUẬN & CAM KẾT
Kế hoạch triển khai trên đã được thiết kế tuân thủ nghiêm ngặt nguyên tắc phát hành an toàn từng nấc. Đội ngũ kỹ thuật cam kết:
- **Tuyệt đối không tự ý bật cờ hoặc mở rộng quy mô khi chưa có sự xác nhận bằng văn bản của Người phụ trách.**
- **Bảo toàn 100% tính ổn định của kho dữ liệu 553 câu hỏi và lịch sử học tập của học sinh.**
