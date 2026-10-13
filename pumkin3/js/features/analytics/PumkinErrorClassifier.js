/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.ErrorClassifier
 * Layer: Cognitive & Diagnostic Analytics
 * Description: Deterministic Error Classifier Engine (Distractor-Driven Misconception Mapping)
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

    // 25 Canonical Misconceptions Taxonomy (Embedded fallback for Zero-Build browser & offline use)
    const EMBEDDED_TAXONOMY = [
        {
            "id": "MIS_SIGN_FLIP_EQUATION",
            "name": "Quên đổi dấu khi chuyển vế",
            "category": "algebra_calculus",
            "description_vi": "Quên đổi dấu của hạng tử khi chuyển từ vế này sang vế kia của phương trình/bất phương trình.",
            "skillIds": ["skill_calculation"],
            "severity": "medium",
            "remediationHint": "Khi chuyển một hạng tử qua dấu '=', em bắt buộc phải đổi dấu của hạng tử đó: '+' thành '-' và ngược lại."
        },
        {
            "id": "MIS_DISTRIBUTIVE_MULTIPLICATION",
            "name": "Quên nhân hệ số phân phối",
            "category": "algebra_calculus",
            "description_vi": "Quên nhân hệ số ngoài ngoặc với tất cả các hạng tử bên trong ngoặc (ví dụ: 2*(x + 3) = 2x + 3).",
            "skillIds": ["skill_calculation"],
            "severity": "medium",
            "remediationHint": "Quy tắc phân phối: a*(b + c) = a*b + a*c. Em hãy nhân hệ số ngoài ngoặc với từng số hạng bên trong."
        },
        {
            "id": "MIS_SQUARE_BINOMIAL_MISSING_2AB",
            "name": "Bỏ quên số hạng kép hằng đẳng thức",
            "category": "algebra_calculus",
            "description_vi": "Khai triển bình phương của một tổng/hiệu bị thiếu số hạng 2ab: tính nhầm (a + b)^2 = a^2 + b^2.",
            "skillIds": ["skill_calculation"],
            "severity": "high",
            "remediationHint": "Hằng đẳng thức đáng nhớ: (a + b)^2 = a^2 + 2ab + b^2 và (a - b)^2 = a^2 - 2ab + b^2."
        },
        {
            "id": "MIS_RADICAL_SUM_CONFUSION",
            "name": "Nhầm căn của tổng thành tổng hai căn",
            "category": "algebra_calculus",
            "description_vi": "Áp dụng sai tính chất căn thức: nhầm sqrt(a + b) = sqrt(a) + sqrt(b).",
            "skillIds": ["skill_calculation"],
            "severity": "high",
            "remediationHint": "Căn bậc hai chỉ có tính chất phân phối với phép nhân và phép chia (với số dương), không phân phối với phép cộng: sqrt(a + b) != sqrt(a) + sqrt(b)."
        },
        {
            "id": "MIS_RADICAL_DOMAIN_IGNORED",
            "name": "Quên điều kiện căn bậc hai f(x) >= 0",
            "category": "algebra_calculus",
            "description_vi": "Bỏ qua điều kiện xác định của biểu thức dưới dấu căn bậc chẵn, dẫn đến nhận nghiệm ngoại lai.",
            "skillIds": ["skill_reasoning", "skill_calculation"],
            "severity": "critical",
            "remediationHint": "Biểu thức dưới dấu căn bậc hai sqrt(f(x)) chỉ xác định khi và chỉ khi f(x) >= 0. Em cần đặt điều kiện trước khi biến đổi."
        },
        {
            "id": "MIS_LOG_DOMAIN_IGNORED",
            "name": "Quên điều kiện xác định logarit",
            "category": "algebra_calculus",
            "description_vi": "Bỏ qua điều kiện xác định của biểu thức lấy logarit (b > 0) hoặc cơ số (a > 0, a != 1), nhận nghiệm ngoại lai.",
            "skillIds": ["skill_reasoning", "skill_calculation"],
            "severity": "critical",
            "remediationHint": "Biểu thức log_a(b) chỉ có nghĩa khi cơ số a > 0, a != 1 và biểu thức dưới dấu logarit b > 0."
        },
        {
            "id": "MIS_LOG_SUM_PRODUCT_CONFUSION",
            "name": "Nhầm logarit của tổng thành tích logarit",
            "category": "algebra_calculus",
            "description_vi": "Áp dụng sai công thức logarit: nhầm ln(a + b) = ln(a)*ln(b) hoặc ln(a + b) = ln(a) + ln(b).",
            "skillIds": ["skill_calculation"],
            "severity": "high",
            "remediationHint": "Công thức logarit đúng: ln(a * b) = ln(a) + ln(b). Không có công thức tách cho logarit của một tổng ln(a + b)."
        },
        {
            "id": "MIS_DERIVATIVE_PRODUCT_RULE",
            "name": "Sai quy tắc đạo hàm của tích",
            "category": "algebra_calculus",
            "description_vi": "Tính đạo hàm tích bằng tích các đạo hàm: (u*v)' = u'*v' thay vì u'*v + u*v'.",
            "skillIds": ["skill_calculation"],
            "severity": "high",
            "remediationHint": "Quy tắc Leibniz: Đạo hàm của một tích là (u*v)' = u'*v + u*v', không được đạo hàm rời rạc rồi nhân lại."
        },
        {
            "id": "MIS_DERIVATIVE_QUOTIENT_SIGN",
            "name": "Sai dấu công thức đạo hàm thương",
            "category": "algebra_calculus",
            "description_vi": "Nhầm dấu trừ thành dấu cộng ở tử số đạo hàm thương: lấy u'*v + u*v' thay vì u'*v - u*v'.",
            "skillIds": ["skill_calculation"],
            "severity": "high",
            "remediationHint": "Công thức đạo hàm thương: (u/v)' = (u'*v - u*v') / (v^2) với v != 0 (dấu trừ ở tử số)."
        },
        {
            "id": "MIS_DELTA_DISCRIMINANT_CONFUSION",
            "name": "Nhầm lẫn giữa Delta, Delta' và Delta y'",
            "category": "algebra_calculus",
            "description_vi": "Nhầm công thức Delta = b^2 - 4ac của phương trình bậc 2 với Delta_y' = b^2 - 3ac khi xét cực trị hàm bậc 3.",
            "skillIds": ["skill_calculation"],
            "severity": "high",
            "remediationHint": "Hàm bậc 3 y = ax^3 + bx^2 + cx + d có đạo hàm y' = 3ax^2 + 2bx + c. Điều kiện có 2 cực trị là a != 0 và Delta_y' = b^2 - 3ac > 0."
        },
        {
            "id": "MIS_EXTREMA_POINT_VS_VALUE",
            "name": "Nhầm điểm cực trị với giá trị cực trị",
            "category": "algebra_calculus",
            "description_vi": "Nhầm lẫn giữa điểm cực trị của hàm số (hoành độ x0) với giá trị cực trị / cực trị (tung độ y0 = f(x0)).",
            "skillIds": ["skill_reasoning"],
            "severity": "high",
            "remediationHint": "'Điểm cực trị của hàm số' là giá trị x; 'Cực trị' hoặc 'Giá trị cực trị' là giá trị y = f(x); 'Điểm cực trị của đồ thị' là tọa độ M(x, y)."
        },
        {
            "id": "MIS_ROOT_LOSS_DIVISION",
            "name": "Chia hai vế cho biểu thức chứa biến làm mất nghiệm",
            "category": "algebra_calculus",
            "description_vi": "Chia hai vế phương trình cho biểu thức chứa biến x khi chưa xét trường hợp biểu thức đó bằng 0, làm mất nghiệm.",
            "skillIds": ["skill_reasoning", "skill_calculation"],
            "severity": "critical",
            "remediationHint": "Không được tự ý chia hai vế cho biểu thức chứa x. Hãy chuyển vế và đặt nhân tử chung để không làm mất nghiệm."
        },
        {
            "id": "MIS_SPURIOUS_ROOT_SQUARING",
            "name": "Bình phương hai vế sinh nghiệm ngoại lai",
            "category": "algebra_calculus",
            "description_vi": "Bình phương hai vế phương trình vô tỉ mà không đặt điều kiện vế còn lại không âm, làm sinh nghiệm ngoại lai.",
            "skillIds": ["skill_reasoning", "skill_calculation"],
            "severity": "critical",
            "remediationHint": "Phương trình sqrt(f(x)) = g(x) tương đương với hệ: g(x) >= 0 và f(x) = [g(x)]^2."
        },
        {
            "id": "MIS_ANGLE_LINE_VS_VECTOR",
            "name": "Quên trị tuyệt đối cos góc hai đường thẳng",
            "category": "geometry_oxyz",
            "description_vi": "Tính góc giữa hai đường thẳng mà quên trị tuyệt đối ở tử số, dẫn đến cos âm và góc bị tù (> 90 độ).",
            "skillIds": ["skill_spatial"],
            "severity": "high",
            "remediationHint": "Góc giữa hai đường thẳng phi luôn thuộc [0, 90 độ], do đó cos(phi) = |u1 . u2| / (|u1| * |u2|) >= 0 (bắt buộc có trị tuyệt đối)."
        },
        {
            "id": "MIS_SPHERE_RADIUS_INVALID",
            "name": "Quên điều kiện bán kính mặt cầu R^2 > 0",
            "category": "geometry_oxyz",
            "description_vi": "Nhận diện mặt cầu x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0 mà quên kiểm tra điều kiện a^2 + b^2 + c^2 - d > 0.",
            "skillIds": ["skill_spatial"],
            "severity": "critical",
            "remediationHint": "Điều kiện cần và đủ để phương trình là mặt cầu: R^2 = a^2 + b^2 + c^2 - d > 0. Nếu <= 0 thì là điểm hoặc tập rỗng."
        },
        {
            "id": "MIS_PLANE_DISTANCE_NO_ABS",
            "name": "Quên trị tuyệt đối khoảng cách đến mặt phẳng",
            "category": "geometry_oxyz",
            "description_vi": "Tính khoảng cách từ điểm đến mặt phẳng mà bỏ quên dấu giá trị tuyệt đối ở tử số, dẫn đến khoảng cách âm.",
            "skillIds": ["skill_spatial", "skill_calculation"],
            "severity": "high",
            "remediationHint": "Khoảng cách là một đại lượng không âm: d(M0, P) = |A*x0 + B*y0 + C*z0 + D| / sqrt(A^2 + B^2 + C^2)."
        },
        {
            "id": "MIS_LINE_CANONICAL_ZERO_DENOM",
            "name": "Mẫu số bằng 0 trong phương trình chính tắc",
            "category": "geometry_oxyz",
            "description_vi": "Viết phương trình chính tắc đường thẳng với mẫu số bằng 0 khi VTCP có thành phần tọa độ triệt tiêu.",
            "skillIds": ["skill_spatial"],
            "severity": "high",
            "remediationHint": "Phương trình chính tắc (x - x0)/a = (y - y0)/b = (z - z0)/c chỉ viết được khi a*b*c != 0. Nếu có thành phần bằng 0, bắt buộc dùng phương trình tham số."
        },
        {
            "id": "MIS_CROSS_PRODUCT_IS_SCALAR",
            "name": "Nhầm tích có hướng là số vô hướng",
            "category": "geometry_oxyz",
            "description_vi": "Nhầm lẫn bản chất hình học: coi tích có hướng [u, v] là một số thực thay vì là một vector trực giao.",
            "skillIds": ["skill_spatial"],
            "severity": "high",
            "remediationHint": "Tích có hướng [u, v] của hai vector trong Oxyz là một vector vuông góc với cả u và v; tích vô hướng u . v mới là một số thực."
        },
        {
            "id": "MIS_COLLINEAR_ZERO_DIVISION",
            "name": "Chia cho 0 khi xét điều kiện cùng phương",
            "category": "geometry_oxyz",
            "description_vi": "Lập tỉ số x1/x2 = y1/y2 khi x2 hoặc y2 bằng 0. Cần sử dụng tích chéo x1*y2 - x2*y1 = 0.",
            "skillIds": ["skill_spatial", "skill_calculation"],
            "severity": "medium",
            "remediationHint": "Hai vector (x1, y1) và (x2, y2) cùng phương tương đương với hệ thức tích chéo: x1*y2 - x2*y1 = 0 (tránh chia cho 0)."
        },
        {
            "id": "MIS_PERM_COMB_CONFUSION",
            "name": "Nhầm lẫn giữa Tổ hợp và Chỉnh hợp",
            "category": "combinatorics_probability",
            "description_vi": "Dùng C_n^k thay vì A_n^k hoặc ngược lại: không phân biệt được bài toán có thứ tự (xếp thứ tự, chức vụ) hay không thứ tự (chọn nhóm).",
            "skillIds": ["skill_probability"],
            "severity": "high",
            "remediationHint": "Nếu hoán đổi vị trí các phần tử tạo ra kết quả mới thì dùng Chỉnh hợp A_n^k (hoặc n!); nếu không phân biệt thứ tự thì dùng Tổ hợp C_n^k."
        },
        {
            "id": "MIS_ROUND_TABLE_NUMBERED_SEATS",
            "name": "Nhầm bàn có ghế đánh số với bàn tròn tự do",
            "category": "combinatorics_probability",
            "description_vi": "Tính (n - 1)! cho bàn tròn có ghế đã đánh số thay vì hoán vị thẳng n!.",
            "skillIds": ["skill_probability"],
            "severity": "high",
            "remediationHint": "Khi các ghế trên bàn tròn đã đánh số (1, 2, ..., n) hoặc cố định vị trí phòng, tính chất bất biến phép quay bị triệt tiêu: số cách xếp là n!."
        },
        {
            "id": "MIS_ROUND_TABLE_BLOCK_FACTORIAL",
            "name": "Sai bậc giai thừa khi buộc phần tử bàn tròn",
            "category": "combinatorics_probability",
            "description_vi": "Buộc 2 người thành 1 khối thì còn n - 1 khối, xếp tròn có (n - 2)! cách. Tính nhầm (n - 1)! * 2 là quên trừ 1 bậc tự do quay.",
            "skillIds": ["skill_probability"],
            "severity": "high",
            "remediationHint": "Xếp k khối vào bàn tròn có (k - 1)! cách. Buộc 2 người thì có (n - 1) khối, xếp tròn có ((n - 1) - 1)! = (n - 2)! cách, nhân thêm 2! hoán vị nội bộ: (n - 2)! * 2!."
        },
        {
            "id": "MIS_ROUND_TABLE_ALTERNATING_OVERCOUNT",
            "name": "Nhân thừa 2 khi xếp xen kẽ bàn tròn",
            "category": "combinatorics_probability",
            "description_vi": "Xếp n nam và n nữ xen kẽ bàn tròn: đúng là (n - 1)! * n!. Bị nhầm nhân thêm 2 như hàng thẳng.",
            "skillIds": ["skill_probability"],
            "severity": "medium",
            "remediationHint": "Trên vòng tròn đóng kín, khi n nam đã ngồi (có (n - 1)! cách), các vị trí của nữ đã phân biệt tương đối, chỉ có n! cách xếp nữ, không nhân thêm 2."
        },
        {
            "id": "MIS_ROUND_TABLE_FLIP_SYMMETRY",
            "name": "Quên chia 2 đối xứng gương (chuỗi hạt / vòng hoa)",
            "category": "combinatorics_probability",
            "description_vi": "Xếp chuỗi hạt hoặc vòng hoa có thể lật úp ngược (2 mặt giống nhau) mà quên chia 2: số cách đúng là (n - 1)! / 2.",
            "skillIds": ["skill_probability"],
            "severity": "medium",
            "remediationHint": "Chuỗi hạt có thể lật ngược trong không gian 3 chiều nên mỗi cách xếp bị tính lặp 2 lần do đối xứng gương: số cách là (n - 1)! / 2."
        },
        {
            "id": "MIS_PROB_SUM_NOT_DISJOINT",
            "name": "Cộng xác suất quên trừ giao biến cố",
            "category": "combinatorics_probability",
            "description_vi": "Áp dụng công thức cộng P(A + B) = P(A) + P(B) mà quên trừ P(A giao B) khi hai biến cố không xung khắc.",
            "skillIds": ["skill_probability"],
            "severity": "high",
            "remediationHint": "Công thức cộng xác suất tổng quát: P(A hợp B) = P(A) + P(B) - P(A giao B). Chỉ khi A và B xung khắc thì P(A giao B) mới bằng 0."
        }
    ];

    // Taxonomy Map indexed by ID
    const MISCONCEPTIONS_MAP = {};
    EMBEDDED_TAXONOMY.forEach(item => {
        MISCONCEPTIONS_MAP[item.id] = item;
    });

    // In Node.js, attempt to load extended definitions from file if available
    if (typeof module !== 'undefined' && module.exports) {
        try {
            const fs = require('fs');
            const path = require('path');
            const taxPath = path.resolve(__dirname, '../../../data/taxonomy/misconceptions.json');
            if (fs.existsSync(taxPath)) {
                const loaded = JSON.parse(fs.readFileSync(taxPath, 'utf8'));
                if (Array.isArray(loaded)) {
                    loaded.forEach(item => {
                        MISCONCEPTIONS_MAP[item.id] = item;
                    });
                }
            }
        } catch (e) {
            // Fall back to embedded taxonomy silently
        }
    }

    const PumkinErrorClassifier = {
        ERROR_TYPES: {
            careless_mistake: {
                name: "Lỗi ẩu (Làm quá nhanh)",
                icon: "⚡",
                color: "#eab308",
                description: "Thao tác quá vội vàng (< 40% thời gian ước lượng) ở các câu hỏi quen thuộc dẫn đến sai sót đáng tiếc.",
                recommendation: "Đọc kỹ từ khóa 'không đúng', 'nghịch biến' và kiểm tra lại phép tính bước cuối trước khi chọn."
            },
            time_management: {
                name: "Quản lý thời gian kém",
                icon: "⏱️",
                color: "#f97316",
                description: "Mất quá nhiều thời gian (> 2.5 lần thời gian chuẩn) hoặc bị quá giờ dẫn tới bỏ sót hoặc chọn vội.",
                recommendation: "Áp dụng chiến thuật 2 lượt: làm nhanh câu quen dưới 1 phút, đánh dấu câu khó để quay lại sau."
            },
            knowledge_gap: {
                name: "Hổng kiến thức nền tảng",
                icon: "📖",
                color: "#ef4444",
                description: "Chưa nắm vững định nghĩa, điều kiện xác định hoặc định lý then chốt của chuyên đề.",
                recommendation: "Xem lại sổ tay kiến thức, ghi nhớ điều kiện biên và luyện 5 câu cơ bản (M1/M2) trước."
            },
            reasoning_error: {
                name: "Sai lầm suy luận / Logic",
                icon: "🧩",
                color: "#8b5cf6",
                description: "Lập luận thiếu trường hợp, ngộ nhận điều kiện đủ thành điều kiện cần ở câu vận dụng cao.",
                recommendation: "Vẽ sơ đồ tư duy, biện luận đầy đủ các khả năng và thử các giá trị đặc biệt để loại trừ."
            },
            calculation_error: {
                name: "Sai sót tính toán số học",
                icon: "🔢",
                color: "#06b6d4",
                description: "Sai dấu (+/-), nhầm công thức nguyên hàm hoặc nhân chia số lớn khi biến đổi đại số.",
                recommendation: "Rèn luyện bấm máy tính cầm tay chuẩn xác và nhẩm nghiệm nguyên để kiểm chứng."
            },
            concept_confusion: {
                name: "Nhầm lẫn khái niệm",
                icon: "❓",
                color: "#ec4899",
                description: "Nhầm lẫn giữa điểm cực trị với giá trị cực trị, xác suất có điều kiện với xác suất giao.",
                recommendation: "Phân biệt rạch ròi thuật ngữ toán học thông qua các bảng so sánh trong cẩm nang."
            }
        },

        // Legacy traps definition for backward compatibility
        TRAP_DEFINITIONS: {
            TRAP_ANGLE_LINE_VS_VECTOR: {
                name: "Nhầm góc 2 đường thẳng với góc 2 vector",
                category: "geometry_vector",
                description: "Góc giữa 2 đường thẳng luôn nhọn hoặc vuông (cos >= 0). Quên lấy trị tuyệt đối ở tử số dẫn đến góc tù > 90°.",
                recommendation: "Luôn dùng công thức cos(d1, d2) = |u1 . u2| / (|u1| * |u2|)."
            },
            TRAP_COLLINEAR_ZERO_DIVISION: {
                name: "Chia cho 0 khi xét điều kiện cùng phương",
                category: "geometry_vector",
                description: "Lập tỉ số x1/x2 = y1/y2 khi x2 hoặc y2 bằng 0. Cần dùng hệ thức chéo x1*y2 - x2*y1 = 0.",
                recommendation: "Dùng điều kiện u = k*v hoặc tích chéo x1*y2 - x2*y1 = 0."
            },
            TRAP_CROSS_PRODUCT_IS_SCALAR: {
                name: "Nhầm tích có hướng là số vô hướng",
                category: "oxyz",
                description: "Tích có hướng [u, v] là một vector vuông góc với cả u và v, không phải là một số thực.",
                recommendation: "Phân biệt rạch ròi tích vô hướng (ra số) và tích có hướng (ra vector)."
            },
            TRAP_SPHERE_RADIUS_INVALID: {
                name: "Quên điều kiện bán kính mặt cầu",
                category: "oxyz",
                description: "Phương trình x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0 chỉ là mặt cầu khi a^2 + b^2 + c^2 - d > 0.",
                recommendation: "Luôn tính R^2 = a^2 + b^2 + c^2 - d trước khi kết luận tâm và bán kính."
            },
            TRAP_LINE_CANONICAL_ZERO_DENOM: {
                name: "Mẫu số bằng 0 trong phương trình chính tắc",
                category: "oxyz",
                description: "Phương trình chính tắc đường thẳng không được phép có mẫu số bằng 0. Nếu VTCP có tọa độ 0 thì phải viết dạng tham số.",
                recommendation: "Khi VTCP có thành phần bằng 0, bắt buộc dùng phương trình tham số."
            },
            TRAP_PLANE_DISTANCE_NO_ABS: {
                name: "Quên trị tuyệt đối khoảng cách đến mặt phẳng",
                category: "oxyz",
                description: "Khoảng cách từ điểm đến mặt phẳng luôn không âm. Quên trị tuyệt đối dẫn đến khoảng cách âm vô lý.",
                recommendation: "Áp dụng công thức d(M, P) = |Ax0 + By0 + Cz0 + D| / sqrt(A^2 + B^2 + C^2)."
            },
            TRAP_PERM_COMB_CONFUSION: {
                name: "Nhầm lẫn giữa Tổ hợp và Chỉnh hợp",
                category: "probability",
                description: "Nhầm giữa chọn không thứ tự (C_n^k) và chọn có thứ tự (A_n^k).",
                recommendation: "Xác định rõ việc hoán đổi vị trí các phần tử có tạo ra kết quả mới hay không."
            },
            TRAP_ROUND_TABLE_NUMBERED_SEATS: {
                name: "Nhầm bàn có ghế đánh số với bàn tròn tự do",
                category: "circular_permutation",
                description: "Khi các ghế trên bàn tròn đã đánh số hoặc cố định hướng, số cách xếp là n! chứ không phải (n-1)!.",
                recommendation: "Kiểm tra kỹ đề bài: ghế có số thứ tự hay chỉ xét vị trí tương đối giữa người với người."
            },
            TRAP_ROUND_TABLE_BLOCK_FACTORIAL: {
                name: "Sai bậc giai thừa khi buộc phần tử trên bàn tròn",
                category: "circular_permutation",
                description: "Buộc 2 người thành 1 khối thì còn n-1 khối, xếp tròn có (n-2)! cách. Tính nhầm (n-1)!*2 là quên trừ 1 bậc tự do quay.",
                recommendation: "Xếp k khối vào bàn tròn có (k-1)! cách; nhân thêm hoán vị nội bộ của khối."
            },
            TRAP_ROUND_TABLE_ALTERNATING_OVERCOUNT: {
                name: "Nhân thừa trường hợp khi xếp xen kẽ bàn tròn",
                category: "circular_permutation",
                description: "Xếp n nam và n nữ xen kẽ: (n-1)! * n!. Nhầm lẫn nhân thêm 2 như hàng thẳng.",
                recommendation: "Vòng tròn đóng kín: sau khi cố định nam, các vị trí nữ đã xác định độc lập, không nhân 2."
            },
            TRAP_ROUND_TABLE_FLIP_SYMMETRY: {
                name: "Quên chia 2 đối xứng gương (vòng hoa / chuỗi hạt)",
                category: "circular_permutation",
                description: "Chuỗi hạt hoặc vòng hoa có thể lật úp ngược (2 mặt giống nhau) nên số cách là (n-1)! / 2.",
                recommendation: "Nếu vật thể có thể lật ngược trong không gian 3 chiều, chia đôi số hoán vị vòng quanh."
            }
        },

        MISCONCEPTIONS: MISCONCEPTIONS_MAP,

        /**
         * Register or update misconceptions taxonomy catalog at runtime
         * @param {Array<Object>} items
         */
        registerMisconceptions(items) {
            if (Array.isArray(items)) {
                items.forEach(it => {
                    if (it && it.id) {
                        MISCONCEPTIONS_MAP[it.id] = it;
                    }
                });
            }
        },

        /**
         * Retrieve a canonical misconception by ID
         * @param {string} id
         * @returns {Object|null}
         */
        getMisconception(id) {
            if (!id) return null;
            return MISCONCEPTIONS_MAP[id] || null;
        },

        /**
         * Get all registered misconceptions
         * @returns {Array<Object>}
         */
        getAllMisconceptions() {
            return Object.values(MISCONCEPTIONS_MAP);
        },

        /**
         * Check if question has distractor metadata configured
         * @param {Object} question
         * @returns {boolean}
         */
        hasDistractorMetadata(question) {
            return !!(question && Array.isArray(question.distractors) && question.distractors.length > 0);
        },

        /**
         * Match distractor by option index, letter, or text
         * @private
         */
        _findDistractor(question, selectedOption) {
            if (!question || !Array.isArray(question.distractors) || question.distractors.length === 0) {
                return null;
            }
            if (selectedOption === null || selectedOption === undefined) {
                return null;
            }

            const letters = ["A", "B", "C", "D", "E", "F"];
            let targetIdx = -1;
            let targetLetter = "";
            const targetStr = String(selectedOption).trim();

            if (typeof selectedOption === "number") {
                targetIdx = selectedOption;
                targetLetter = letters[targetIdx] || "";
            } else if (/^[0-9]+$/.test(targetStr)) {
                targetIdx = parseInt(targetStr, 10);
                targetLetter = letters[targetIdx] || "";
            } else if (/^[A-Z]$/i.test(targetStr)) {
                targetLetter = targetStr.toUpperCase();
                targetIdx = letters.indexOf(targetLetter);
            } else if (Array.isArray(question.options)) {
                const textIdx = question.options.findIndex(opt => opt === targetStr || opt.trim() === targetStr);
                if (textIdx !== -1) {
                    targetIdx = textIdx;
                    targetLetter = letters[textIdx] || "";
                }
            }

            return question.distractors.find(d => {
                const dId = d.optionId !== undefined ? d.optionId : d.option_id;
                if (dId === undefined || dId === null) return false;

                // Exact equality
                if (dId === selectedOption || String(dId) === targetStr) return true;

                // Index match
                if (targetIdx !== -1 && (dId === targetIdx || String(dId) === String(targetIdx))) return true;

                // Letter match
                if (targetLetter && String(dId).toUpperCase() === targetLetter) return true;

                return false;
            }) || null;
        },

        /**
         * Infer high-level error type key from misconception taxonomy
         * @private
         */
        _inferErrorType(misconceptionId, category, explicitType) {
            if (explicitType && this.ERROR_TYPES[explicitType]) {
                return explicitType;
            }
            if (!misconceptionId) return "knowledge_gap";

            if (misconceptionId.includes("CALCULATION") || misconceptionId.includes("SIGN") || misconceptionId.includes("MULTIPLICATION") || misconceptionId.includes("DELTA") || misconceptionId.includes("QUOTIENT")) {
                return "calculation_error";
            }
            if (misconceptionId.includes("DOMAIN") || misconceptionId.includes("ROOT_LOSS") || misconceptionId.includes("SPURIOUS") || misconceptionId.includes("REASONING")) {
                return "reasoning_error";
            }
            if (category === "combinatorics_probability" || category === "circular_permutation" || misconceptionId.includes("CONFUSION") || misconceptionId.includes("EXTREMA_POINT_VS_VALUE")) {
                return "concept_confusion";
            }
            if (category === "geometry_oxyz" || category === "geometry_vector") {
                return "concept_confusion";
            }
            return "concept_confusion";
        },

        /**
         * Legacy heuristic classifier (M1-M4 heuristics and time spent)
         * @private
         */
        _legacyClassify(question, attempt) {
            const att = attempt || {};

            // Check if attempt triggered a specific legacy trap
            const trapCode = att.misconception_trap || att.trap || (question && question.metadata && question.metadata.misconception_traps && question.metadata.misconception_traps[att.selectedOption]);
            if (trapCode && this.TRAP_DEFINITIONS[trapCode]) {
                const trapDef = this.TRAP_DEFINITIONS[trapCode];
                return {
                    type: "concept_confusion",
                    trap_code: trapCode,
                    name: trapDef.name,
                    icon: "🎯",
                    color: "#f43f5e",
                    description: trapDef.description,
                    recommendation: trapDef.recommendation,
                    remediationHint: trapDef.recommendation,
                    specific: `Bẫy nhận thức phát hiện: ${trapDef.name}`
                };
            }

            const estTime = (question && question.estimated_time_seconds) || 90;
            const timeSpent = att.timeSpentSeconds || 0;
            const level = (question && question.cognitive_level) || "Thông hiểu";
            const isSkipped = (att.status === "skipped");

            // Rule 1: Skipped question
            if (isSkipped) {
                return {
                    type: "knowledge_gap",
                    ...this.ERROR_TYPES.knowledge_gap,
                    specific: "Câu hỏi bị bỏ qua, phản ánh vùng kiến thức chưa tự tin."
                };
            }

            const lvlStr = String(level || "").toLowerCase().trim();
            const isM1M2 = (level === "M1" || level === "M2" || level === "Nhận biết" || level === "Thông hiểu" || lvlStr.includes("m1") || lvlStr.includes("m2") || lvlStr.includes("nhận") || lvlStr.includes("thông") || lvlStr.includes("nh?n") || lvlStr.includes("th?ng"));
            const isM3M4 = (level === "M3" || level === "M4" || level === "Vận dụng" || level === "Vận dụng cao" || lvlStr.includes("m3") || lvlStr.includes("m4") || lvlStr.includes("vận") || lvlStr.includes("v?n"));

            // Rule 2: Careless mistake (Spent < 40% of estimated time on M1/M2)
            if (timeSpent > 0 && timeSpent < estTime * 0.4 && isM1M2) {
                return {
                    type: "careless_mistake",
                    ...this.ERROR_TYPES.careless_mistake,
                    specific: `Thời gian làm bài (${timeSpent}s) quá ngắn so với ước lượng (${estTime}s).`
                };
            }

            // Rule 3: Time management issue (Spent > 2.5x estimated time)
            if (timeSpent > estTime * 2.5 && timeSpent > 180) {
                return {
                    type: "time_management",
                    ...this.ERROR_TYPES.time_management,
                    specific: `Mất quá nhiều thời gian (${timeSpent}s / chuẩn ${estTime}s), gây áp lực cho các câu sau.`
                };
            }

            // Rule 4: True/False conceptual confusion
            if (question && question.type === "true_false_group") {
                return {
                    type: "concept_confusion",
                    ...this.ERROR_TYPES.concept_confusion,
                    specific: "Sai sót trong việc phân định mệnh đề đúng/sai của bài toán định tính."
                };
            }

            // Rule 5: Calculation error in computation-heavy questions
            if (question && (question.skills || []).includes("skill_calculation") && isM1M2) {
                return {
                    type: "calculation_error",
                    ...this.ERROR_TYPES.calculation_error,
                    specific: "Lỗi phát sinh trong quá trình biến đổi đại số hoặc tính toán số học."
                };
            }

            // Rule 6: Reasoning error on advanced questions (M3/M4)
            if (isM3M4) {
                return {
                    type: "reasoning_error",
                    ...this.ERROR_TYPES.reasoning_error,
                    specific: "Lập luận hoặc định hướng giải chưa chạm tới điểm thắt của bài toán mức độ 3, 4."
                };
            }

            // Fallback default
            return {
                type: "knowledge_gap",
                ...this.ERROR_TYPES.knowledge_gap,
                specific: "Cần củng cố lại phương pháp giải cơ bản."
            };
        },

        /**
         * Primary Classification Method
         * Supports both:
         *   classify(question, selectedOptionId)
         *   classify(question, attemptObject)
         *
         * @param {Object} question
         * @param {Object|string|number} attemptOrOptionId
         * @returns {Object} Comprehensive error classification
         */
        classify(question, attemptOrOptionId) {
            if (!question) {
                return {
                    mode: "legacy",
                    isLegacy: true,
                    confidence: 0.1,
                    misconceptionId: null,
                    skillIds: ["skill_reasoning"],
                    remediationHint: this.ERROR_TYPES.knowledge_gap.recommendation,
                    type: "knowledge_gap",
                    ...this.ERROR_TYPES.knowledge_gap,
                    specific: "Không có dữ liệu câu hỏi."
                };
            }

            // Normalize attempt structure
            let attemptObj = {};
            let selectedOption = null;

            if (attemptOrOptionId !== null && typeof attemptOrOptionId === "object") {
                attemptObj = attemptOrOptionId;
                selectedOption = (attemptObj.selectedOptionId !== undefined) ? attemptObj.selectedOptionId
                                : (attemptObj.selectedOption !== undefined) ? attemptObj.selectedOption
                                : attemptObj.userAnswer;
            } else if (attemptOrOptionId !== undefined) {
                selectedOption = attemptOrOptionId;
                attemptObj = { selectedOptionId: selectedOption, userAnswer: selectedOption };
            }

            // 1. Distractor-Driven Misconception Mapping (Takes absolute precedence)
            if (this.hasDistractorMetadata(question)) {
                // If attempt was skipped, return skipped diagnosis
                if (attemptObj.status === "skipped" || selectedOption === null || selectedOption === undefined) {
                    const legacyRes = this._legacyClassify(question, attemptObj);
                    return {
                        mode: "legacy",
                        isLegacy: true,
                        confidence: 0.5,
                        misconceptionId: null,
                        skillIds: question.skills || ["skill_reasoning"],
                        remediationHint: legacyRes.recommendation || legacyRes.specific,
                        ...legacyRes
                    };
                }

                const distractor = this._findDistractor(question, selectedOption);
                if (distractor) {
                    const mId = distractor.misconceptionId;
                    const taxItem = this.getMisconception(mId);

                    const finalName = distractor.name || (taxItem ? taxItem.name : distractor.description_vi) || mId;
                    const finalDesc = distractor.description_vi || (taxItem ? taxItem.description_vi : "");
                    const finalHint = distractor.remediationHint || (taxItem ? taxItem.remediationHint : "") || (taxItem ? taxItem.description_vi : "");
                    const finalSkills = (distractor.skillIds && distractor.skillIds.length > 0) ? distractor.skillIds : (taxItem ? taxItem.skillIds : (question.skills || ["skill_reasoning"]));
                    const finalSeverity = distractor.severity || (taxItem ? taxItem.severity : "medium");

                    const errorType = this._inferErrorType(mId, taxItem ? taxItem.category : null, distractor.type);
                    const errorTypeDef = this.ERROR_TYPES[errorType] || this.ERROR_TYPES.concept_confusion;

                    return {
                        mode: "distractor_driven",
                        isLegacy: false,
                        confidence: 1.0,
                        misconceptionId: mId,
                        name: finalName,
                        description: finalDesc,
                        remediationHint: finalHint,
                        recommendation: finalHint,
                        skillIds: finalSkills,
                        severity: finalSeverity,
                        needs_teacher_review: !!distractor.needs_teacher_review,
                        optionId: (distractor.optionId !== undefined) ? distractor.optionId : distractor.option_id,
                        type: errorType,
                        icon: errorTypeDef.icon || "🎯",
                        color: errorTypeDef.color || "#f43f5e",
                        specific: `Bẫy nhận thức phát hiện: ${finalName}`
                    };
                }

                // Distractor metadata existed on question, but user option was not found in distractors
                const legacyFallback = this._legacyClassify(question, attemptObj);
                return {
                    mode: "legacy_unmatched",
                    isLegacy: true,
                    confidence: 0.3,
                    misconceptionId: null,
                    skillIds: question.skills || ["skill_reasoning"],
                    remediationHint: legacyFallback.recommendation || legacyFallback.specific,
                    ...legacyFallback
                };
            }

            // 2. Legacy Fallback (For questions not yet labeled with distractors)
            const legacyResult = this._legacyClassify(question, attemptObj);
            return {
                mode: "legacy",
                isLegacy: true,
                confidence: 0.5,
                misconceptionId: null,
                skillIds: question.skills || ["skill_reasoning"],
                remediationHint: legacyResult.recommendation || legacyResult.specific,
                ...legacyResult
            };
        }
    };

    // Primary Namespace
    if (typeof window !== 'undefined') {
        window.Pumkin = window.Pumkin || {};
        window.Pumkin.ErrorClassifier = PumkinErrorClassifier;
        // DEPRECATED: Backward compatibility shim
        window.PumkinErrorClassifier = PumkinErrorClassifier;
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = PumkinErrorClassifier;
    }
})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
