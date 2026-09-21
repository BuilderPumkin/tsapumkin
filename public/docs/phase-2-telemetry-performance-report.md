# BÁO CÁO HIỆU NĂNG & ĐO LƯỜNG BỘ THEO DÕI NHẬN THỨC (PHASE 2 TELEMETRY PERFORMANCE REPORT)

> **Dự án:** Dynamic Cognitive Router — Giai đoạn 2  
> **Module:** `public/js/core/PumkinCognitiveTracker.js`  
> **Chịu trách nhiệm:** Principal Frontend Engineer, Learning Analytics Engineer & QA Performance Engineer  
> **Ngày kiểm nghiệm:** 16/09/2026

---

## 1. Mục tiêu & Tiêu chuẩn Nghiệm thu Hiệu năng

Mục tiêu cốt lõi của Giai đoạn 2 là xây dựng động cơ telemetry chạy ngầm với độ trễ vi mô, tuyệt đối **không làm giật/lag giao diện (zero frame drops)**, không block main thread và kiểm soát chặt chẽ dung lượng bộ nhớ.

| Chỉ số Hiệu năng | Mục tiêu Đặt ra | Kết quả Thực đo | Đánh giá |
| :--- | :---: | :---: | :---: |
| **Median Latency (p50)** | $< 5.0\text{ ms}$ | **$0.0016\text{ ms}$** | **ĐẠT (Nhanh gấp ~3000 lần)** |
| **95th Percentile (p95)** | $< 5.0\text{ ms}$ | **$0.0031\text{ ms}$** | **ĐẠT (Nhanh gấp ~1600 lần)** |
| **Mean Latency** | $< 5.0\text{ ms}$ | **$0.0024\text{ ms}$** | **ĐẠT** |
| **Max Latency** | Không gây đóng băng UI | **$1.0889\text{ ms}$** | **ĐẠT ($< 16.6\text{ ms}$ budget 60fps)** |
| **Throughput (Thông lượng)** | $> 10,000\text{ ops/sec}$ | **$306,116\text{ ops/sec}$** | **ĐẠT** |
| **Memory Footprint (Session)** | $< 2.0\text{ MB}$ | **$0.06\text{ MB}$ (State: $0.43\text{ KB}$, Export: $61.7\text{ KB}$)** | **ĐẠT (Tiết kiệm ~97%)** |
| **Heap Delta (10.000 events)** | $< 2048\text{ KB}$ | **$1675.13\text{ KB}$** | **ĐẠT** |

---

## 2. Môi trường & Thiết bị Đo kiểm

Các thông số phần cứng và môi trường chạy kiểm thử thực tế:
- **Hệ điều hành:** Microsoft Windows 11 Pro (x64)
- **Runtime Environment:** Node.js v24.21.0 (V8 Engine v13.x)
- **Kiến trúc CPU:** x86_64, Đa nhân hiệu năng cao
- **Độ phân giải thời gian:** High-Resolution Timer `performance.now()` (độ chính xác microsecond $\mu\text{s}$)
- **Bộ benchmark:** `tests/benchmark_cognitive_tracker.js` (Chạy độc lập, không mock dữ liệu ảo, có thể tái lập 100% bằng lệnh `npm.cmd run benchmark:tracker`).

---

## 3. Phương pháp Đo lường (Methodology)

### 3.1. Quy trình đo latency độc lập
1. **Pha khởi động (Warm-up Phase):**  
   Chạy trước $1.000$ sự kiện qua toàn bộ chu trình `recordAnswer()`, `completeQuestion()` và `computeCognitiveState()` để V8 JIT biên dịch mã nguồn sang dạng mã máy tối ưu hóa (TurboFan optimization), loại bỏ độ lệch do JIT compilation.
2. **Pha đo lường chính (Benchmark Phase):**  
   Thực hiện liên tục $10.000$ chu kỳ vi tương tác:
   - Gửi payload đáp án qua `recordAnswer()`.
   - Tính toán nhịp ngập ngừng, kiểm tra thay đổi lựa chọn (flips), ghi nhận vào bộ đệm vòng.
   - Định kỳ mỗi $250$ sự kiện, thực hiện `completeQuestion()` để kích hoạt tính toán ma trận nhận thức đa chiều (Rigor, Intuition, Flexibility, Gap, Rolling Mastery).
3. **Phân tích Thống kê (Statistical Percentiles):**  
   Mảng đo $10.000$ điểm thời gian dạng `Float64Array` được sắp xếp thứ tự để trích xuất chính xác phân vị: Min, Mean, Median (p50), p90, p95, p99, Max.

### 3.2. Phương pháp đo bộ nhớ (Memory Footprint)
- **Ring Buffer Cố định:** Bounded Event Buffer giới hạn tối đa $200$ raw events (cấu hình mặc định).
- **Bộ nhớ Trạng thái (Serialized State):** Đo bằng `Buffer.byteLength(JSON.stringify(state), 'utf8')`.
- **Bộ nhớ Gói Telemetry (Export Package):** Đo dung lượng toàn bộ gói xuất dữ liệu gồm summary, 50 câu hỏi lịch sử và 200 raw events.
- **Biến thiên Heap tiến trình:** Sử dụng `process.memoryUsage().heapUsed` trước và sau khi xử lý $10.000$ sự kiện.

---

## 4. Bảng Kết quả Chi tiết

### 4.1. Phân bố Độ trễ (Latency Distribution)

```
========================================================================
 BENCHMARK RESULTS (10,000 ANSWER & SCORING EVENTS)
========================================================================
Tổng số sự kiện xử lý:   10,000 events
Tổng thời gian chạy:     32.67 ms
Tốc độ xử lý (Throughput): 306,116 ops/sec

Độ trễ xử lý từng sự kiện (Latency per event):
  - Min:                  0.0010 ms   (  1.0 µs)
  - Mean:                 0.0024 ms   (  2.4 µs)
  - Median (p50):         0.0016 ms   (  1.6 µs)  [Mục tiêu: < 5.0 ms]
  - 90th Percentile:      0.0024 ms   (  2.4 µs)
  - 95th Percentile:      0.0031 ms   (  3.1 µs)  [Mục tiêu: < 5.0 ms]
  - 99th Percentile:      0.0067 ms   (  6.7 µs)
  - Max:                  1.0889 ms   (1088.9 µs) [Budget 60fps: 16.6 ms]
========================================================================
```

### 4.2. Dấu chân Bộ nhớ (Memory Footprint)

```
========================================================================
 DẤU CHÂN BỘ NHỚ THEO DÕI (MEMORY FOOTPRINT)
========================================================================
  - Dung lượng Véc-tơ Trạng thái (State JSON):      0.43 KB
  - Dung lượng Gói Telemetry đầy đủ (Export JSON): 61.72 KB
  - Kích thước Ring Buffer sự kiện:                200 / 200 slots
  - Chênh lệch Heap tiến trình sau 10.000 sự kiện: 1675.13 KB (< 2.0 MB)
========================================================================
```

---

## 5. Phân tích Nguyên nhân Đạt Hiệu năng Vượt bậc

1. **Cơ chế Bounded Ring Buffer:**  
   Sử dụng cấu trúc mảng tuần hoàn với con trỏ `head`/`tail`. Việc thêm một sự kiện mới (`push`) có độ phức tạp thời gian $O(1)$ và tuyệt đối không cấp phát thêm mảng mới trong quá trình chạy.
2. **Tổng hợp dồn tích lũy (Cumulative Running Aggregates):**  
   Bộ đếm và thống kê theo từng dạng biểu diễn (algebraic, geometric, graphical...) được cập nhật dồn trực tiếp khi sự kiện hoàn thành, không duyệt lại toàn bộ lịch sử thô (tránh độ phức tạp $O(N^2)$).
3. **Phân tách Rõ rệt Layer Pure Engine & DOM Adapter:**  
   Engine tính toán hoàn toàn độc lập với DOM, không truy xuất layout, không gây re-flow hay re-paint.
4. **Debounce & Batching cho Slider Sandbox:**  
   Đối với các input range / slider trong Sandbox tương tác, các thao tác kéo liên tục được debounce $120\text{ ms}$, triệt tiêu nguy cơ phát sinh hàng nghìn event gây nghẽn luồng xử lý.
5. **Ủy quyền Sự kiện (Event Delegation):**  
   Chỉ sử dụng 1 listener cấp root (`document`), sử dụng `.closest('[data-cognitive-...]')`, loại bỏ việc gắn hàng trăm listeners vào từng button/lựa chọn.

---

## 6. Giới hạn Đo lường & Khuyến nghị Môi trường Thực tế

Mặc dù kết quả đo kiểm trên runtime V8 đạt thông số xuất sắc ($p95 \approx 0.0031\text{ ms}$), trong môi trường trình duyệt thực tế cần lưu ý các yếu tố ngoại cảnh sau:
1. **Tải của Main Thread trên thiết bị di động cấu hình thấp:**  
   Nếu trang web chính đang thực thi các tác vụ render nặng (như KaTeX/MathJax re-render toàn trang), event callback có thể bị xếp hàng trong Event Loop. Tracker đã chủ động sử dụng `queueMicrotask` cho các thông báo cập nhật trạng thái không khẩn cấp để nhường main thread cho việc phản hồi tương tác chạm của người dùng.
2. **Hạn chế đo Heap trong Browser Sandbox:**  
   Thuộc tính `performance.memory` không phải là chuẩn W3C và chỉ khả dụng trên trình duyệt Chromium với flag cụ thể. Do đó, kiểm chứng bộ nhớ chuẩn xác nhất được đảm bảo qua kích thước byte của dữ liệu serialized và cấu trúc Ring Buffer cố định.
3. **Chính sách Tiết kiệm Pin (Background Tab Throttling):**  
   Khi người dùng chuyển tab quá 3 giây, Page Visibility API sẽ ghi nhận trạng thái tạm dừng tính giờ để tránh phạt học sinh do thời gian ngập ngừng ảo.
