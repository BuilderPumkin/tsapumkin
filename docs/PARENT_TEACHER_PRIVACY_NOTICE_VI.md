# THÔNG BÁO QUYỀN RIÊNG TƯ DÀNH CHO PHỤ HUYNH & GIÁO VIÊN
**Bảo vệ dữ liệu cá nhân học sinh vị thành niên (dưới 18 tuổi) trên nền tảng PUMKIN.DEV**  
*Mã tài liệu: PRIV-NOTICE-01 — Phiên bản: 1.0 — Ngày ban hành: 21/10/2026*

---

> [!IMPORTANT]
> **LƯU Ý MIỄN TRỪ TRÁCH NHIỆM PHÁP LÝ (LEGAL DISCLAIMER):**  
> Đội ngũ phát triển hệ thống và Trợ lý AI xây dựng tài liệu này nhằm minh bạch hóa tối đa luồng xử lý kỹ thuật và thể hiện tinh thần tôn trọng quyền riêng tư cao nhất dành cho các em học sinh. **Chúng tôi không phải là luật sư hay cơ quan tư vấn pháp luật có chứng chỉ.**
> 
> Các mục được gắn nhãn **`[CẦN XÁC NHẬN PHÁP LÝ]`** trong tài liệu này là các nội dung bắt buộc phải có sự rà soát, hiệu chỉnh và phê duyệt bằng văn bản từ luật sư hoặc chuyên viên pháp chế có thẩm quyền của đơn vị trước khi phát hành chính thức đến phụ huynh và nhà trường.

---

## 1. THƯ GỬI QUÝ PHỤ HUYNH VÀ THẦY CÔ GIÁO

Kính gửi Quý Phụ huynh và các Thầy Cô giáo,

Nền tảng học thuật **PUMKIN.DEV** được sáng lập với sứ mệnh hỗ trợ học sinh THPT phát triển tư duy toán học chuyên sâu, nhận diện các bẫy nhận thức trong đề thi đánh giá tư duy (HSA, TSA, V-SAT, Tốt nghiệp THPT).

Chúng tôi thấu hiểu sâu sắc rằng phần lớn người học là **trẻ vị thành niên (dưới 18 tuổi, phổ biến từ 15–17 tuổi)**. Vì vậy, PUMKIN.DEV áp dụng triết lý an toàn nghiêm ngặt nhất: **"Bảo vệ ngay từ kiến trúc hệ thống" (Privacy by Design)** và **"Không định danh học sinh" (Zero Personally Identifiable Information - Zero PII)**.

---

## 2. NGUYÊN TẮC "BA KHÔNG" VỀ DỮ LIỆU CÁ NHÂN

| Tiêu chí | Cam kết của PUMKIN.DEV | Giải thích kỹ thuật |
| :--- | :--- | :--- |
| **1. KHÔNG thu thập thông tin định danh** | Tuyệt đối không yêu cầu họ tên, trường lớp, số điện thoại, căn cước, email hay địa chỉ nhà. | Hệ thống cấp một mã phiên ngẫu nhiên (`sess_xxxxxxxx`) sinh tự động trên máy học sinh và tự hủy khi đóng trình duyệt. |
| **2. KHÔNG lưu địa chỉ mạng (IP)** | Không lưu trữ IP của học sinh vào bất kỳ bảng dữ liệu hay tệp nhật ký nào. | Gateway mạng chỉ kiểm tra tạm thời trong bộ nhớ RAM để chống tấn công phá hoại (tối đa 60 giây), sau đó địa chỉ IP bị xóa hoàn toàn. |
| **3. KHÔNG thương mại hóa hay bán dữ liệu** | Không chia sẻ, không bán, không phân phối dữ liệu cho bất kỳ bên thứ ba hay mạng quảng cáo nào. | Không gắn mã theo dõi (tracking pixels), không quảng cáo, không tích hợp SDK thương mại. |

---

## 3. DỮ LIỆU ĐƯỢC XỬ LÝ TRONG PHIÊN HỌC

Để đảm bảo thuật toán giải toán và chấm bài hoạt động chính xác ngoài đời thực, hệ thống chỉ ghi nhận các thông số kỹ thuật ẩn danh:

```
[ Dữ liệu kỹ thuật tối thiểu (Telemetry) ]
  ├── Mã phiên tạm thời (Session ID ngẫu nhiên, ví dụ: sess_8a9f2c)
  ├── Loại thao tác (Giải đề, Chấm bài, hoặc Luyện tập)
  ├── Kết quả chẩn đoán (Đã kiểm chứng / Cần xem lại / Chưa hỗ trợ)
  ├── Độ trễ tính toán máy chủ (tính bằng mili-giây)
  ├── Mã lỗi thuật toán (ví dụ: TIMEOUT, SYNTAX_ERROR)
  └── Tên chuyên đề lớn (ví dụ: "Khảo sát hàm số", "Tọa độ Oxyz")
```

### Quy chế đối với nội dung đề bài học sinh tự nhập:
1. **Trong quá trình làm bài và giải toán thông thường:** Nội dung câu chữ của đề bài được truyền thẳng vào bộ giải toán ký hiệu và **không bao giờ được ghi vào cơ sở dữ liệu telemetry**.
2. **Khi học sinh bấm nút "Báo lỗi" (Feedback):**
   - Học sinh chọn lý do (đáp án sai, hiểu sai đề, công thức lỗi...).
   - **Cơ chế quyền riêng tư (Explicit Opt-in):** Hệ thống có hộp chọn riêng *"Đồng ý gửi kèm nội dung đề bài"*.
   - **Mặc định là TẮT (Không gửi kèm đề bài).** Nếu học sinh không chủ động tích chọn, hệ thống chỉ nhận mã báo lỗi kỹ thuật mà không có đề bài.

---

## 4. THỜI HẠN LƯU GIỮ VÀ CƠ CHẾ TIÊU HỦY DỮ LIỆU (90 NGÀY)

- **Thời hạn lưu giữ:** Tối đa **90 ngày** kể từ thời điểm phát sinh bản ghi.
- **Tiêu hủy tự động:** Một quy trình lập lịch tự động (cron job) chạy hằng đêm trên máy chủ để tìm và xóa vĩnh viễn tất cả các bản ghi kỹ thuật quá 90 ngày.
- **Không có bản sao lưu vĩnh viễn (No Permanent Archiving):** Dữ liệu sau khi xóa khỏi cơ sở dữ liệu Cloudflare D1 sẽ biến mất hoàn toàn và không thể khôi phục.

---

## 5. QUYỀN KIỂM SOÁT CỦA PHỤ HUYNH VÀ HỌC SINH

Quý phụ huynh và các em học sinh có toàn quyền kiểm soát dữ liệu thông qua công cụ `🛡️ Quyền riêng tư` tích hợp sẵn trên giao diện web:

1. **Quyền từ chối gửi dữ liệu chẩn đoán (Opt-out 1 chạm):**
   - Học sinh hoặc phụ huynh có thể bật tính năng **"Tắt toàn bộ chẩn đoán kỹ thuật"**.
   - Khi bật, trình duyệt của học sinh sẽ không gửi bất kỳ bản ghi telemetry nào lên máy chủ. Mọi tính năng học tập, làm đề, giải bài vẫn hoạt động 100% bình thường.
2. **Quyền yêu cầu xóa dữ liệu tức thì (Right to Erasure):**
   - Bấm nút **"Xóa dữ liệu phiên hiện tại"** trong bảng điều khiển quyền riêng tư để xóa ngay lập tức mọi thông tin kỹ thuật gắn với phiên học mà không cần chờ chu kỳ 90 ngày.

---

## 6. DANH SÁCH CÁC HẠNG MỤC CẦN XÁC NHẬN PHÁP LÝ (LEGAL REVIEW CHECKLIST)

Dưới đây là danh sách các điều khoản pháp lý cụ thể cần sự thẩm định của luật sư trước khi công bố ra công chúng:

### Mục 6.1: [CẦN XÁC NHẬN PHÁP LÝ — ĐIỀU 19 & 20 NGHỊ ĐỊNH 13/2023/NĐ-CP (PDPD)]
- **Vấn đề:** Điều 19 và 20 Nghị định 13/2023/NĐ-CP quy định việc xử lý dữ liệu cá nhân của trẻ em (dưới 16 tuổi) phải có sự đồng ý của cha mẹ hoặc người giám hộ (nếu trẻ từ đủ 7 tuổi trở lên thì phải có thêm sự đồng ý của trẻ).
- **Hiện trạng PUMKIN.DEV:** Nền tảng thiết kế phi định danh (Zero PII), không thu thập danh tính, số điện thoại hay tài khoản cố định. Dữ liệu chỉ gồm mã phiên ngẫu nhiên và thông số máy tính toán.
- **Nội dung cần Luật sư thẩm định:** Xác nhận mô hình "Dữ liệu phi định danh hoàn toàn (Anonymized Data) không gắn với bất kỳ cá nhân cụ thể nào" có được miễn trừ nghĩa vụ thu thập phiếu đồng thuận có chữ ký của phụ huynh theo tinh thần Nghị định 13 hay không.

### Mục 6.2: [CẦN XÁC NHẬN PHÁP LÝ — ĐIỀU 21 LUẬT TRẺ EM 2016]
- **Vấn đề:** Điều 21 Luật Trẻ em 2016 quy định quyền bí mật đời sống riêng tư của trẻ em trên môi trường mạng internet.
- **Hiện trạng PUMKIN.DEV:** Nút "Báo lỗi" mặc định không gửi nội dung đề bài (`problem_content = null`), chỉ gửi khi học sinh chủ động tích chọn xác nhận.
- **Nội dung cần Luật sư thẩm định:** Cơ chế "Opt-in riêng biệt với giá trị mặc định là không gửi" đã đủ chặt chẽ để đáp ứng quy định về quyền bảo mật thông tin học tập của trẻ em theo Luật Trẻ em hay chưa.

### Mục 6.3: [CẦN XÁC NHẬN PHÁP LÝ — THỜI HẠN LƯU TRỮ 90 NGÀY VÀ NGHĨA VỤ AN NINH MẠNG]
- **Vấn đề:** Luật An ninh mạng 2018 và Nghị định 53/2022/NĐ-CP có quy định về thời gian lưu vết nhật ký hệ thống của các dịch vụ viễn thông/internet tại Việt Nam.
- **Hiện trạng PUMKIN.DEV:** Đề xuất tiêu hủy toàn bộ dữ liệu telemetry kỹ thuật sau 90 ngày để bảo vệ quyền riêng tư học sinh.
- **Nội dung cần Luật sư thẩm định:** Thời hạn 90 ngày đối với nhật ký lỗi thuật toán có xung đột với nghĩa vụ lưu trữ dữ liệu an ninh mạng quốc gia (thường là 12 tháng đối với nhật ký kết nối mạng) hay không; và làm rõ ranh giới giữa "nhật ký vận hành hạ tầng ISP/mạng" với "dữ liệu chẩn đoán nội bộ của ứng dụng web".

### Mục 6.4: [CẦN XÁC NHẬN PHÁP LÝ — MẪU ĐỒNG THUẬN DÀNH CHO NHÀ TRƯỜNG & LỚP HỌC]
- **Vấn đề:** Khi triển khai thử nghiệm hoặc chính thức tại các trường THPT hoặc lớp học ôn thi, nhà trường có thể yêu cầu mẫu phiếu cam kết bảo vệ dữ liệu.
- **Nội dung cần Luật sư thẩm định:** Soạn thảo hoặc phê duyệt mẫu phụ lục: *"Bản thỏa thuận xử lý dữ liệu học tập nội bộ giữa Nhà trường và PUMKIN.DEV"*.

---

## 7. MẪU XÁC NHẬN DÀNH CHO PHỤ HUYNH (THAM KHẢO)

*(Sử dụng trong trường hợp nhà trường hoặc cơ sở giáo dục yêu cầu phiếu xác nhận bằng văn bản)*

```text
CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
---

PHIẾU XÁC NHẬN THAM GIA RÈN LUYỆN TOÁN HỌC TRÊN NỀN TẢNG PUMKIN.DEV

Kính gửi: Ban Giám hiệu Nhà trường / Đơn vị tổ chức học tập

Tôi là: ................................................................. Phụ huynh / Người giám hộ của học sinh: .............................................................
Lớp: ........................... Trường: ....................................................................................................................................................................

Sau khi đã đọc kỹ Bản Thông báo Quyền riêng tư của PUMKIN.DEV, tôi xác nhận:
1. Tôi hiểu rằng PUMKIN.DEV không thu thập thông tin định danh cá nhân (không lấy họ tên, số điện thoại, vị trí GPS) của con em tôi.
2. Tôi đồng ý để con em tôi sử dụng nền tảng để luyện tập giải toán và chẩn đoán năng lực tư duy.
3. Tôi và con em tôi hiểu rõ quyền bật chế độ "Tắt gửi chẩn đoán kỹ thuật (Opt-out)" bất cứ lúc nào trong quá trình học.

Ngày ...... tháng ...... năm 202...
CHỮ KÝ CỦA PHỤ HUYNH / NGƯỜI GIÁM HỘ
(Ký và ghi rõ họ tên)
```

---

## 8. ĐẦU MỐI TIẾP NHẬN PHẢN HỒI VỀ QUYỀN RIÊNG TƯ

Nếu quý phụ huynh hoặc thầy cô có bất kỳ câu hỏi, băn khoăn hay góp ý nào liên quan đến an toàn dữ liệu của các em học sinh, xin vui lòng liên hệ ngay với chúng tôi:

- **Bộ phận phụ trách:** Ban Quản trị Học thuật & Bảo mật Dữ liệu PUMKIN.DEV
- **Kênh tiếp nhận điện tử:** `privacy@pumkin.dev`
- **Thời gian phản hồi:** Trong vòng 24 giờ làm việc.
