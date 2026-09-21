/* ==========================================================================
   PUMKIN.DEV MATH EXAM PLATFORM - COMPLETE V2 DATA ENGINE
   100% Validated Data with Question DNA & Skill Graph
   ========================================================================== */
const PUMKIN_DEFAULT_KNOWLEDGE = [];
const PUMKIN_DEFAULT_QUESTIONS = [
    {
        "id":  "q_tsa_01",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Tá»‘i Æ°u hÃ³a thá»±c táº¿",
        "skills":  [
                       "skill_modeling",
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "KhÃ³",
        "difficulty_score":  0.88,
        "cognitive_level":  "M4",
        "estimated_time_seconds":  120,
        "question":  "Má»™t doanh nghiá»‡p dá»± Ä‘á»‹nh sáº£n xuáº¥t bá»“n chá»©a nÆ°á»›c báº±ng inox hÃ¬nh trá»¥ cÃ³ náº¯p Ä‘áº­y vá»›i dung tÃ­ch cá»‘ Ä‘á»‹nh \\(V = 2\\pi\\text{ m}^3\\). Chi phÃ­ lÃ m náº¯p vÃ  Ä‘Ã¡y lÃ  1,5 triá»‡u Ä‘á»“ng/\\(\\text{m}^2\\), chi phÃ­ lÃ m máº·t xung quanh lÃ  1,0 triá»‡u Ä‘á»“ng/\\(\\text{m}^2\\). XÃ¡c Ä‘á»‹nh bÃ¡n kÃ­nh Ä‘Ã¡y \\(r\\) (theo mÃ©t) Ä‘á»ƒ tá»•ng chi phÃ­ sáº£n xuáº¥t bá»“n lÃ  nhá» nháº¥t.",
        "options":  [
                        "\\(r = \\sqrt[3]{2/3}\\text{ m}\\)",
                        "\\(r = \\sqrt[3]{3/2}\\text{ m}\\)",
                        "\\(r = 1\\text{ m}\\)",
                        "\\(r = \\sqrt{2/3}\\text{ m}\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "BÆ°á»›c 1 (RÃ ng buá»™c): Thá»ƒ tÃ­ch \\(V = \\pi r^2 h = 2\\pi \\implies h = \\frac{2}{r^2}\\).\u003cbr\u003eBÆ°á»›c 2: Chi phÃ­ \\(C(r) = 1,5(2\\pi r^2) + 1,0(2\\pi r h) = 3\\pi r^2 + \\frac{4\\pi}{r}\\).\u003cbr\u003eBÆ°á»›c 3: TÃ¡ch AM-GM: \\(C(r) = 3\\pi r^2 + \\frac{2\\pi}{r} + \\frac{2\\pi}{r} \\ge 3\\sqrt[3]{3\\pi r^2 \\cdot \\frac{2\\pi}{r} \\cdot \\frac{2\\pi}{r}} = 3\\sqrt[3]{12\\pi^3}\\).\u003cbr\u003eDáº¥u \u0027=\u0027 xáº£y ra khi \\(3\\pi r^2 = \\frac{2\\pi}{r} \\iff r^3 = \\frac{2}{3} \\iff r = \\sqrt[3]{\\frac{2}{3}}\\text{ m}\\).",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_01"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA Äáº¡i há»c BÃ¡ch Khoa HÃ  Ná»™i",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Tá»‘i Æ°u hÃ³a",
                     "AM-GM",
                     "MÃ´ hÃ¬nh hÃ³a"
                 ],
        "knowledge_id":  "kb_toan12_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t doanh nghiá»‡p dá»± Ä‘á»‹nh sáº£n xuáº¥t bá»“n chá»©a nÆ°á»›c báº±ng inox hÃ¬nh trá»¥ cÃ³ náº¯p Ä‘áº­y vá»›i dung tÃ­ch cá»‘ Ä‘á»‹nh \\(V = 2\\pi\\text{ m}^3\\). Chi phÃ­ lÃ m náº¯p vÃ  Ä‘Ã¡y lÃ  1,5 triá»‡u Ä‘á»“ng/\\(\\text{m}^2\\), chi phÃ­ lÃ m máº·t xung quanh lÃ  1,0 triá»‡u Ä‘á»“ng/\\(\\text{m}^2\\). XÃ¡c Ä‘á»‹nh bÃ¡n kÃ­nh Ä‘Ã¡y \\(r\\) (theo mÃ©t) Ä‘á»ƒ tá»•ng chi phÃ­ sáº£n xuáº¥t bá»“n lÃ  nhá» nháº¥t."
    },
    {
        "id":  "q_tsa_02",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "Cá»±c trá»‹ hÃ¬nh há»c",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "Má»™t kÃªnh dáº«n nÆ°á»›c cÃ³ máº·t cáº¯t ngang lÃ  hÃ¬nh thang cÃ¢n vá»›i Ä‘Ã¡y bÃ© vÃ  hai cáº¡nh bÃªn Ä‘á»u cÃ³ Ä‘á»™ dÃ i báº±ng \\(a = 2\\text{ m}\\). GÃ³c nghiÃªng giá»¯a cáº¡nh bÃªn vÃ  phÆ°Æ¡ng ngang lÃ  \\(\\alpha\\) (\\(0 \u003c \\alpha \u003c \\frac{\\pi}{2}\\)). TÃ¬m \\(\\alpha\\) Ä‘á»ƒ diá»‡n tÃ­ch máº·t cáº¯t ngang \\(S(\\alpha)\\) Ä‘áº¡t giÃ¡ trá»‹ lá»›n nháº¥t.",
        "options":  [
                        "\\(\\alpha = 45^\\circ\\)",
                        "\\(\\alpha = 60^\\circ\\)",
                        "\\(\\alpha = 30^\\circ\\)",
                        "\\(\\alpha = 75^\\circ\\)"
                    ],
        "correct_answer":  1,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Chiá»u cao: \\(h = 2\\sin\\alpha\\). ÄÃ¡y lá»›n: \\(B = 2 + 4\\cos\\alpha\\).\u003cbr\u003eDiá»‡n tÃ­ch: \\(S(\\alpha) = \\frac{(B+a)h}{2} = 4(1+\\cos\\alpha)\\sin\\alpha\\).\u003cbr\u003eÄáº¡o hÃ m: \\(S\u0027(\\alpha) = 4(2\\cos^2\\alpha + \\cos\\alpha - 1) = 0\\). Vá»›i \\(t = \\cos\\alpha \\in (0, 1)\\), ta cÃ³ \\(2t^2 + t - 1 = 0 \\implies t = 1/2 \\implies \\alpha = 60^\\circ = \\pi/3\\). Khi Ä‘Ã³ \\(S_{\\max} = 3\\sqrt{3}\\text{ m}^2\\).",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan10_03"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA Äáº¡i há»c BÃ¡ch Khoa HÃ  Ná»™i",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "HÃ¬nh há»c",
                     "Äáº¡o hÃ m",
                     "KÃªnh dáº«n nÆ°á»›c"
                 ],
        "knowledge_id":  "kb_toan10_03",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t kÃªnh dáº«n nÆ°á»›c cÃ³ máº·t cáº¯t ngang lÃ  hÃ¬nh thang cÃ¢n vá»›i Ä‘Ã¡y bÃ© vÃ  hai cáº¡nh bÃªn Ä‘á»u cÃ³ Ä‘á»™ dÃ i báº±ng \\(a = 2\\text{ m}\\). GÃ³c nghiÃªng giá»¯a cáº¡nh bÃªn vÃ  phÆ°Æ¡ng ngang lÃ  \\(\\alpha\\) (\\(0 \u003c \\alpha \u003c \\frac{\\pi}{2}\\)). TÃ¬m \\(\\alpha\\) Ä‘á»ƒ diá»‡n tÃ­ch máº·t cáº¯t ngang \\(S(\\alpha)\\) Ä‘áº¡t giÃ¡ trá»‹ lá»›n nháº¥t."
    },
    {
        "id":  "q_tsa_03",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "XÃ¡c suáº¥t",
        "subtopic":  "XÃ­ch Markov",
        "skills":  [
                       "skill_probability",
                       "skill_reasoning",
                       "skill_data_analysis"
                   ],
        "difficulty":  "KhÃ³",
        "difficulty_score":  0.88,
        "cognitive_level":  "M4",
        "estimated_time_seconds":  120,
        "question":  "Hai hÃ£ng taxi cÃ´ng nghá»‡ A vÃ  B cáº¡nh tranh táº¡i má»™t thÃ nh phá»‘. Ban Ä‘áº§u thá»‹ pháº§n cá»§a A lÃ  70%, B lÃ  30%. HÃ ng nÄƒm, 80% khÃ¡ch cá»§a A tiáº¿p tá»¥c dÃ¹ng A, 20% chuyá»ƒn sang B; trong khi 60% khÃ¡ch cá»§a B tiáº¿p tá»¥c dÃ¹ng B, 40% chuyá»ƒn sang A. XÃ¡c Ä‘á»‹nh thá»‹ pháº§n cÃ¢n báº±ng dÃ i háº¡n cá»§a hÃ£ng A.",
        "options":  [
                        "60,00%",
                        "66,67%",
                        "67,20%",
                        "75,00%"
                    ],
        "correct_answer":  1,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Ma tráº­n chuyá»ƒn tráº¡ng thÃ¡i theo cá»™t: \\(P = \\begin{pmatrix} 0,80 \u0026 0,40 \\\\ 0,20 \u0026 0,60 \\end{pmatrix}\\).\u003cbr\u003eTráº¡ng thÃ¡i cÃ¢n báº±ng dá»«ng \\((P - I)\\pi = 0\\) thá»a: \\(-0,20\\pi_A + 0,40\\pi_B = 0 \\iff \\pi_A = 2\\pi_B\\).\u003cbr\u003eKáº¿t há»£p \\(\\pi_A + \\pi_B = 1 \\implies \\pi_A = 2/3 \\approx 66,67\\%\\).",
        "common_traps":  [
                             "Nháº§m giá»¯a biáº¿n cá»‘ Ä‘á»™c láº­p vÃ  biáº¿n cá»‘ xung kháº¯c",
                             "KhÃ´ng Ã¡p dá»¥ng Ä‘Ãºng cÃ´ng thá»©c Bayes",
                             "Äáº¿m láº·p trÆ°á»ng há»£p khi Ã¡p dá»¥ng quy táº¯c cá»™ng"
                         ],
        "prerequisites":  [
                              "kb_dstt_05"
                          ],
        "year":  2024,
        "source_type":  "adapted",
        "source":  "Tuyá»ƒn táº­p TÆ° duy ToÃ¡n há»c TSA",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "XÃ­ch Markov",
                     "Ma tráº­n",
                     "CÃ¢n báº±ng dá»«ng"
                 ],
        "knowledge_id":  "kb_dstt_05",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Hai hÃ£ng taxi cÃ´ng nghá»‡ A vÃ  B cáº¡nh tranh táº¡i má»™t thÃ nh phá»‘. Ban Ä‘áº§u thá»‹ pháº§n cá»§a A lÃ  70%, B lÃ  30%. HÃ ng nÄƒm, 80% khÃ¡ch cá»§a A tiáº¿p tá»¥c dÃ¹ng A, 20% chuyá»ƒn sang B; trong khi 60% khÃ¡ch cá»§a B tiáº¿p tá»¥c dÃ¹ng B, 40% chuyá»ƒn sang A. XÃ¡c Ä‘á»‹nh thá»‹ pháº§n cÃ¢n báº±ng dÃ i háº¡n cá»§a hÃ£ng A."
    },
    {
        "id":  "q_tsa_04",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "DÃ£y sá»‘ truy há»“i",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "DÃ£y sá»‘ \\(\\{a_n\\}\\) thá»a mÃ£n: \\(a_1 = 5, a_2 = 13\\) vÃ  \\(a_n = 5a_{n-1} - 6a_{n-2}\\) vá»›i má»i \\(n \\ge 3\\). GiÃ¡ trá»‹ cá»§a sá»‘ háº¡ng \\(a_{10}\\) báº±ng:",
        "options":  [
                        "60073",
                        "59049",
                        "61440",
                        "58925"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "PhÆ°Æ¡ng trÃ¬nh Ä‘áº·c trÆ°ng: \\(r^2 - 5r + 6 = 0 \\iff r_1 = 2, r_2 = 3\\).\u003cbr\u003eNghiá»‡m tá»•ng quÃ¡t: \\(a_n = A \\cdot 2^n + B \\cdot 3^n\\).\u003cbr\u003eTá»« há»‡ giÃ¡ trá»‹ Ä‘áº§u: \\(2A + 3B = 5\\) vÃ  \\(4A + 9B = 13 \\implies A = 1, B = 1\\).\u003cbr\u003eDo Ä‘Ã³ \\(a_n = 2^n + 3^n \\implies a_{10} = 2^{10} + 3^{10} = 1024 + 59049 = 60073\\).",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan11_02"
                          ],
        "year":  2024,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Truy há»“i",
                     "PT Ä‘áº·c trÆ°ng",
                     "DÃ£y sá»‘"
                 ],
        "knowledge_id":  "kb_toan11_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "DÃ£y sá»‘ \\(\\{a_n\\}\\) thá»a mÃ£n: \\(a_1 = 5, a_2 = 13\\) vÃ  \\(a_n = 5a_{n-1} - 6a_{n-2}\\) vá»›i má»i \\(n \\ge 3\\). GiÃ¡ trá»‹ cá»§a sá»‘ háº¡ng \\(a_{10}\\) báº±ng:"
    },
    {
        "id":  "q_tsa_05",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "HÃ¬nh há»c Oxyz",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "Trong khÃ´ng gian \\(Oxyz\\) (Ä‘Æ¡n vá»‹: km), tráº¡m kiá»ƒm soÃ¡t khÃ´ng lÆ°u Ä‘áº·t táº¡i gá»‘c tá»a Ä‘á»™ \\(O(0,0,0)\\). Má»™t mÃ¡y bay Ä‘ang bay theo Ä‘Æ°á»ng tháº³ng \\(d: \\begin{cases} x = 12 + 2t \\\\ y = 9 - t \\\\ z = 6 + 2t \\end{cases}\\). Khoáº£ng cÃ¡ch ngáº¯n nháº¥t tá»« mÃ¡y bay Ä‘áº¿n tráº¡m kiá»ƒm soÃ¡t \\(O\\) lÃ :",
        "options":  [
                        "\\(12\\text{ km}\\)",
                        "\\(6\\sqrt{5}\\text{ km}\\)",
                        "\\(15\\text{ km}\\)",
                        "\\(3\\sqrt{10}\\text{ km}\\)"
                    ],
        "correct_answer":  1,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Vá»‹ trÃ­ mÃ¡y bay \\(M(12+2t, 9-t, 6+2t)\\).\u003cbr\u003eKhoáº£ng cÃ¡ch bÃ¬nh phÆ°Æ¡ng: \\(OM^2(t) = (12+2t)^2 + (9-t)^2 + (6+2t)^2 = 9t^2 + 54t + 261\\).\u003cbr\u003eTam thá»©c báº­c 2 Ä‘áº¡t cá»±c tiá»ƒu táº¡i Ä‘á»‰nh parabol: \\(t = -54/18 = -3\\).\u003cbr\u003e\\(OM^2_{\\min} = 9(-3)^2 + 54(-3) + 261 = 180 \\implies d_{\\min} = \\sqrt{180} = 6\\sqrt{5} \\approx 13,42\\text{ km}\\).",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2024,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Oxyz",
                     "Khoáº£ng cÃ¡ch",
                     "Cá»±c trá»‹ parabol"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Trong khÃ´ng gian \\(Oxyz\\) (Ä‘Æ¡n vá»‹: km), tráº¡m kiá»ƒm soÃ¡t khÃ´ng lÆ°u Ä‘áº·t táº¡i gá»‘c tá»a Ä‘á»™ \\(O(0,0,0)\\). Má»™t mÃ¡y bay Ä‘ang bay theo Ä‘Æ°á»ng tháº³ng \\(d: \\begin{cases} x = 12 + 2t \\\\ y = 9 - t \\\\ z = 6 + 2t \\end{cases}\\). Khoáº£ng cÃ¡ch ngáº¯n nháº¥t tá»« mÃ¡y bay Ä‘áº¿n tráº¡m kiá»ƒm soÃ¡t \\(O\\) lÃ :"
    },
    {
        "id":  "q_tsa_06",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "Khoáº£ng cÃ¡ch Ä‘Æ°á»ng chÃ©o nhau",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "KhÃ³",
        "difficulty_score":  0.88,
        "cognitive_level":  "M4",
        "estimated_time_seconds":  120,
        "question":  "Trong há»‡ trá»¥c tá»a Ä‘á»™ \\(Oxyz\\) (Ä‘Æ¡n vá»‹: mÃ©t), hai dÃ¢y cÃ¡p treo chÃ©o nhau cÃ³ phÆ°Æ¡ng trÃ¬nh: \\(d_1: \\frac{x - 10}{2} = \\frac{y - 20}{1} = \\frac{z - 30}{2}\\) vÃ  \\(d_2: \\frac{x + 10}{1} = \\frac{y + 10}{2} = \\frac{z - 10}{-2}\\). Khoáº£ng cÃ¡ch ngáº¯n nháº¥t giá»¯a hai dÃ¢y cÃ¡p treo nÃ y lÃ :",
        "options":  [
                        "\\(10\\text{ m}\\)",
                        "\\(\\frac{40}{3}\\text{ m}\\)",
                        "\\(15\\text{ m}\\)",
                        "\\(\\frac{35}{3}\\text{ m}\\)"
                    ],
        "correct_answer":  1,
        "items":  null,
        "correct_value":  null,
        "explanation":  "\\(d_1\\) qua \\(M_1(10,20,30)\\), \\(\\vec{u}_1 = (2,1,2)\\).\u003cbr\u003e\\(d_2\\) qua \\(M_2(-10,-10,10)\\), \\(\\vec{u}_2 = (1,2,-2)\\).\u003cbr\u003e\\(\\vec{M_1 M_2} = (-20, -30, -20)\\).\u003cbr\u003eTÃ­ch cÃ³ hÆ°á»›ng: \\([\\vec{u}_1, \\vec{u}_2] = (-6, 6, 3)\\), Ä‘á»™ dÃ i \\(= \\sqrt{36+36+9} = 9\\).\u003cbr\u003eTÃ­ch vÃ´ hÆ°á»›ng: \\(|[\\vec{u}_1, \\vec{u}_2] \\cdot \\vec{M_1 M_2}| = |(-6)(-20) + 6(-30) + 3(-20)| = |-120| = 120\\).\u003cbr\u003eKhoáº£ng cÃ¡ch: \\(d = 120 / 9 = 40/3\\text{ m}\\).",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Oxyz",
                     "Khoáº£ng cÃ¡ch",
                     "TÃ­ch cÃ³ hÆ°á»›ng"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Trong há»‡ trá»¥c tá»a Ä‘á»™ \\(Oxyz\\) (Ä‘Æ¡n vá»‹: mÃ©t), hai dÃ¢y cÃ¡p treo chÃ©o nhau cÃ³ phÆ°Æ¡ng trÃ¬nh: \\(d_1: \\frac{x - 10}{2} = \\frac{y - 20}{1} = \\frac{z - 30}{2}\\) vÃ  \\(d_2: \\frac{x + 10}{1} = \\frac{y + 10}{2} = \\frac{z - 10}{-2}\\). Khoáº£ng cÃ¡ch ngáº¯n nháº¥t giá»¯a hai dÃ¢y cÃ¡p treo nÃ y lÃ :"
    },
    {
        "id":  "q_tsa_07",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Thuáº­t toÃ¡n logic \u0026 MÃ£ giáº£",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Cho Ä‘oáº¡n mÃ£ giáº£ sau: Nháº­p a = 42, b = 70, Count = 0. Khi (a â‰  b) thá»±c hiá»‡n: Count = Count + 1; Náº¿u (a \u003e b) thÃ¬ a = a - b, ngÆ°á»£c láº¡i b = b - a. Xuáº¥t ra: a, Count. GiÃ¡ trá»‹ xuáº¥t ra cá»§a Count khi thuáº­t toÃ¡n káº¿t thÃºc lÃ :",
        "options":  [
                        "2",
                        "3",
                        "4",
                        "5"
                    ],
        "correct_answer":  1,
        "items":  null,
        "correct_value":  null,
        "explanation":  "BÆ°á»›c 1: a=42, b=70 -\u003e b = 70 - 42 = 28, Count = 1.\u003cbr\u003eBÆ°á»›c 2: a=42, b=28 -\u003e a = 42 - 28 = 14, Count = 2.\u003cbr\u003eBÆ°á»›c 3: a=14, b=28 -\u003e b = 28 - 14 = 14, Count = 3.\u003cbr\u003eKhi nÃ y a = b = 14, Ä‘iá»u kiá»‡n láº·p dá»«ng láº¡i. Xuáº¥t ra Count = 3 vÃ  a = 14 (Æ¯CLN cá»§a 42 vÃ  70).",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan10_01"
                          ],
        "year":  2024,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Thuáº­t toÃ¡n",
                     "Trace table",
                     "MÃ£ giáº£"
                 ],
        "knowledge_id":  "kb_toan10_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Cho Ä‘oáº¡n mÃ£ giáº£ sau: Nháº­p a = 42, b = 70, Count = 0. Khi (a â‰  b) thá»±c hiá»‡n: Count = Count + 1; Náº¿u (a \u003e b) thÃ¬ a = a - b, ngÆ°á»£c láº¡i b = b - a. Xuáº¥t ra: a, Count. GiÃ¡ trá»‹ xuáº¥t ra cá»§a Count khi thuáº­t toÃ¡n káº¿t thÃºc lÃ :"
    },
    {
        "id":  "q_tsa_08",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Thuáº­t toÃ¡n vÃ²ng láº·p",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "Cho Ä‘oáº¡n mÃ£ giáº£: P = 1, k = 1. Khi (P â‰¤ 1000) thá»±c hiá»‡n: k = k + 1, P = P * 2 + k. XÃ¡c Ä‘á»‹nh giÃ¡ trá»‹ xuáº¥t ra cá»§a k vÃ  P khi vÃ²ng láº·p dá»«ng láº¡i.",
        "options":  [
                        "k = 8, P = 502",
                        "k = 9, P = 1013",
                        "k = 9, P = 1000",
                        "k = 10, P = 2036"
                    ],
        "correct_answer":  1,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Cháº¡y báº£ng tráº¡ng thÃ¡i (Trace table): káº¿t thÃºc á»Ÿ vÃ²ng láº·p thá»© 8: k = 9 vÃ  P = 502 * 2 + 9 = 1013 \u003e 1000, dá»«ng vÃ²ng láº·p.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan11_02"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "MÃ£ giáº£",
                     "VÃ²ng láº·p",
                     "Trace Table"
                 ],
        "knowledge_id":  "kb_toan11_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Cho Ä‘oáº¡n mÃ£ giáº£: P = 1, k = 1. Khi (P â‰¤ 1000) thá»±c hiá»‡n: k = k + 1, P = P * 2 + k. XÃ¡c Ä‘á»‹nh giÃ¡ trá»‹ xuáº¥t ra cá»§a k vÃ  P khi vÃ²ng láº·p dá»«ng láº¡i."
    },
    {
        "id":  "q_tsa_09",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "á»¨ng dá»¥ng Ä‘áº¡o hÃ m thá»±c táº¿",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "Ná»“ng Ä‘á»™ thuá»‘c \\(C(t)\\) (Ä‘Æ¡n vá»‹: mg/L) trong mÃ¡u sau \\(t\\) giá» Ä‘Æ°á»£c mÃ´ hÃ¬nh hÃ³a bá»Ÿi hÃ m sá»‘ \\(C(t) = 4t \\cdot e^{-0,5t}\\) (\\(t \\ge 0\\)). Ná»“ng Ä‘á»™ thuá»‘c Ä‘áº¡t giÃ¡ trá»‹ cao nháº¥t táº¡i thá»i Ä‘iá»ƒm nÃ o vÃ  báº±ng bao nhiÃªu?",
        "options":  [
                        "\\(t = 1\\text{ h}, C_{\\max} = 4e^{-0,5}\\)",
                        "\\(t = 2\\text{ h}, C_{\\max} = \\frac{8}{e}\\)",
                        "\\(t = 4\\text{ h}, C_{\\max} = \\frac{16}{e^2}\\)",
                        "\\(t = 2\\text{ h}, C_{\\max} = \\frac{4}{e}\\)"
                    ],
        "correct_answer":  1,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Äáº¡o hÃ m: \\(C\u0027(t) = 2(2 - t)e^{-0,5t} = 0 \\iff t = 2\\). GiÃ¡ trá»‹ lá»›n nháº¥t \\(C(2) = 4(2)e^{-1} = 8/e \\approx 2,94\\text{ mg/L}\\).",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_01"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "DÆ°á»£c Ä‘á»™ng há»c",
                     "Cá»±c trá»‹ hÃ m mÅ©",
                     "Äáº¡o hÃ m"
                 ],
        "knowledge_id":  "kb_toan12_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Ná»“ng Ä‘á»™ thuá»‘c \\(C(t)\\) (Ä‘Æ¡n vá»‹: mg/L) trong mÃ¡u sau \\(t\\) giá» Ä‘Æ°á»£c mÃ´ hÃ¬nh hÃ³a bá»Ÿi hÃ m sá»‘ \\(C(t) = 4t \\cdot e^{-0,5t}\\) (\\(t \\ge 0\\)). Ná»“ng Ä‘á»™ thuá»‘c Ä‘áº¡t giÃ¡ trá»‹ cao nháº¥t táº¡i thá»i Ä‘iá»ƒm nÃ o vÃ  báº±ng bao nhiÃªu?"
    },
    {
        "id":  "q_tsa_10",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "XÃ¡c suáº¥t",
        "subtopic":  "Tá»• há»£p láº·p Euler",
        "skills":  [
                       "skill_probability",
                       "skill_reasoning",
                       "skill_data_analysis"
                   ],
        "difficulty":  "KhÃ³",
        "difficulty_score":  0.88,
        "cognitive_level":  "M4",
        "estimated_time_seconds":  120,
        "question":  "CÃ³ 15 suáº¥t há»c bá»•ng giá»‘ng nhau cáº§n trao cho 4 viá»‡n Ä‘Ã o táº¡o. Há»i cÃ³ bao nhiÃªu cÃ¡ch phÃ¢n chia náº¿u Viá»‡n 1 nháº­n Ã­t nháº¥t 3 suáº¥t, Viá»‡n 2 nháº­n Ã­t nháº¥t 2 suáº¥t, Viá»‡n 3 vÃ  Viá»‡n 4 má»—i viá»‡n nháº­n Ã­t nháº¥t 1 suáº¥t?",
        "options":  [
                        "120",
                        "165",
                        "220",
                        "286"
                    ],
        "correct_answer":  1,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Äá»•i biáº¿n vá» tá»•ng cÃ¡c sá»‘ nguyÃªn dÆ°Æ¡ng: \\(y_1 + y_2 + x_3 + x_4 = 15 - 2 - 1 = 12\\). Sá»‘ cÃ¡ch chia lÃ  \\(C_{12 - 1}^{4 - 1} = C_{11}^3 = 165\\).",
        "common_traps":  [
                             "Nháº§m giá»¯a biáº¿n cá»‘ Ä‘á»™c láº­p vÃ  biáº¿n cá»‘ xung kháº¯c",
                             "KhÃ´ng Ã¡p dá»¥ng Ä‘Ãºng cÃ´ng thá»©c Bayes",
                             "Äáº¿m láº·p trÆ°á»ng há»£p khi Ã¡p dá»¥ng quy táº¯c cá»™ng"
                         ],
        "prerequisites":  [
                              "kb_toan10_05"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Chia káº¹o Euler",
                     "Tá»• há»£p",
                     "Stars and Bars"
                 ],
        "knowledge_id":  "kb_toan10_05",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "CÃ³ 15 suáº¥t há»c bá»•ng giá»‘ng nhau cáº§n trao cho 4 viá»‡n Ä‘Ã o táº¡o. Há»i cÃ³ bao nhiÃªu cÃ¡ch phÃ¢n chia náº¿u Viá»‡n 1 nháº­n Ã­t nháº¥t 3 suáº¥t, Viá»‡n 2 nháº­n Ã­t nháº¥t 2 suáº¥t, Viá»‡n 3 vÃ  Viá»‡n 4 má»—i viá»‡n nháº­n Ã­t nháº¥t 1 suáº¥t?"
    },
    {
        "id":  "q_tsa_11",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "CÃ´ng thá»©c Shoelace",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "TÃ­nh diá»‡n tÃ­ch cá»§a ngÅ© giÃ¡c pháº³ng cÃ³ tá»a Ä‘á»™ cÃ¡c Ä‘á»‰nh theo thá»© tá»± vÃ²ng quanh lÃ  \\(A(1, 2), B(5, 4), C(6, 8), D(2, 7), E(0, 4)\\) báº±ng cÃ´ng thá»©c Shoelace (dÃ¢y giÃ y Gauss).",
        "options":  [
                        "18",
                        "20",
                        "22",
                        "24"
                    ],
        "correct_answer":  1,
        "items":  null,
        "correct_value":  null,
        "explanation":  "CÃ´ng thá»©c Shoelace: \\(S = \\frac{1}{2} |\\sum (x_i y_{i+1} - x_{i+1} y_i)| = \\frac{1}{2} |94 - 54| = 20\\).",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan10_04"
                          ],
        "year":  2024,
        "source_type":  "adapted",
        "source":  "ToÃ¡n Cao cáº¥p á»¨ng dá»¥ng TSA",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Shoelace",
                     "Tá»a Ä‘á»™ pháº³ng",
                     "Diá»‡n tÃ­ch Ä‘a giÃ¡c"
                 ],
        "knowledge_id":  "kb_toan10_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "TÃ­nh diá»‡n tÃ­ch cá»§a ngÅ© giÃ¡c pháº³ng cÃ³ tá»a Ä‘á»™ cÃ¡c Ä‘á»‰nh theo thá»© tá»± vÃ²ng quanh lÃ  \\(A(1, 2), B(5, 4), C(6, 8), D(2, 7), E(0, 4)\\) báº±ng cÃ´ng thá»©c Shoelace (dÃ¢y giÃ y Gauss)."
    },
    {
        "id":  "q_tsa_12",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "TÃ­ch phÃ¢n Ä‘á»‘i xá»©ng King",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "TÃ­nh giÃ¡ trá»‹ cá»§a tÃ­ch phÃ¢n Ä‘á»‘i xá»©ng \\(I = \\int_0^{\\pi/2} \\frac{\\sin^3 x}{\\sin^3 x + \\cos^3 x} dx\\) báº±ng Ä‘á»‹nh lÃ½ King.",
        "options":  [
                        "\\(\\pi/2\\)",
                        "\\(\\pi/4\\)",
                        "\\(\\pi/3\\)",
                        "\\(1\\)"
                    ],
        "correct_answer":  1,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Ãp dá»¥ng Ä‘á»‹nh lÃ½ King: \\(I = \\frac{b - a}{2} = \\frac{\\pi/2 - 0}{2} = \\frac{\\pi}{4}\\).",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_03"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "ToÃ¡n Cao cáº¥p á»¨ng dá»¥ng TSA",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Äá»‹nh lÃ½ King",
                     "TÃ­ch phÃ¢n",
                     "Giáº£i tÃ­ch nhanh"
                 ],
        "knowledge_id":  "kb_toan12_03",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "TÃ­nh giÃ¡ trá»‹ cá»§a tÃ­ch phÃ¢n Ä‘á»‘i xá»©ng \\(I = \\int_0^{\\pi/2} \\frac{\\sin^3 x}{\\sin^3 x + \\cos^3 x} dx\\) báº±ng Ä‘á»‹nh lÃ½ King."
    },
    {
        "id":  "q_tsa_13",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "XÃ¡c suáº¥t",
        "subtopic":  "XÃ­ch Markov 3 tráº¡ng thÃ¡i",
        "skills":  [
                       "skill_probability",
                       "skill_reasoning",
                       "skill_data_analysis"
                   ],
        "difficulty":  "KhÃ³",
        "difficulty_score":  0.88,
        "cognitive_level":  "M4",
        "estimated_time_seconds":  120,
        "question":  "Thá»i tiáº¿t má»—i ngÃ y cÃ³ 3 tráº¡ng thÃ¡i: 1-Náº¯ng, 2-MÃ¢y, 3-MÆ°a vá»›i ma tráº­n chuyá»ƒn \\(P = \\begin{pmatrix} 0,7 \u0026 0,2 \u0026 0,1 \\\\ 0,2 \u0026 0,6 \u0026 0,3 \\\\ 0,1 \u0026 0,2 \u0026 0,6 \\end{pmatrix}\\). Náº¿u thá»© Hai lÃ  ngÃ y Náº¯ng (\\(v_0 = (1, 0, 0)^T\\)), xÃ¡c suáº¥t ngÃ y thá»© TÆ° (sau 2 ngÃ y) cÃ³ mÆ°a lÃ :",
        "options":  [
                        "10%",
                        "17%",
                        "29%",
                        "54%"
                    ],
        "correct_answer":  1,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Sau 1 ngÃ y (thá»© Ba): \\(v_1 = P \\cdot v_0 = (0,7; 0,2; 0,1)^T\\).\u003cbr\u003eSau 2 ngÃ y (thá»© TÆ°): \\(v_2 = P \\cdot v_1\\). ThÃ nh pháº§n mÆ°a (dÃ²ng 3): \\(0,1(0,7) + 0,2(0,2) + 0,6(0,1) = 0,07 + 0,04 + 0,06 = 0,17 = 17\\%\\).",
        "common_traps":  [
                             "Nháº§m giá»¯a biáº¿n cá»‘ Ä‘á»™c láº­p vÃ  biáº¿n cá»‘ xung kháº¯c",
                             "KhÃ´ng Ã¡p dá»¥ng Ä‘Ãºng cÃ´ng thá»©c Bayes",
                             "Äáº¿m láº·p trÆ°á»ng há»£p khi Ã¡p dá»¥ng quy táº¯c cá»™ng"
                         ],
        "prerequisites":  [
                              "kb_dstt_05"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "XÃ­ch Markov",
                     "Thá»i tiáº¿t",
                     "Ma tráº­n"
                 ],
        "knowledge_id":  "kb_dstt_05",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Thá»i tiáº¿t má»—i ngÃ y cÃ³ 3 tráº¡ng thÃ¡i: 1-Náº¯ng, 2-MÃ¢y, 3-MÆ°a vá»›i ma tráº­n chuyá»ƒn \\(P = \\begin{pmatrix} 0,7 \u0026 0,2 \u0026 0,1 \\\\ 0,2 \u0026 0,6 \u0026 0,3 \\\\ 0,1 \u0026 0,2 \u0026 0,6 \\end{pmatrix}\\). Náº¿u thá»© Hai lÃ  ngÃ y Náº¯ng (\\(v_0 = (1, 0, 0)^T\\)), xÃ¡c suáº¥t ngÃ y thá»© TÆ° (sau 2 ngÃ y) cÃ³ mÆ°a lÃ :"
    },
    {
        "id":  "q_tsa_14",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Kháº£o sÃ¡t hÃ m phÃ¢n thá»©c",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "Cho hÃ m sá»‘ \\(f(x) = \\frac{x^2 - 3x + 6}{x - 1}\\). GiÃ¡ trá»‹ cá»±c Ä‘áº¡i \\(y_{\\text{CÄ}}\\) vÃ  giÃ¡ trá»‹ cá»±c tiá»ƒu \\(y_{\\text{CT}}\\) thá»a mÃ£n há»‡ thá»©c nÃ o sau Ä‘Ã¢y?",
        "options":  [
                        "\\(y_{\\text{CÄ}} = -5 \u003c y_{\\text{CT}} = 3\\)",
                        "\\(y_{\\text{CÄ}} = 3 \u003e y_{\\text{CT}} = -5\\)",
                        "\\(y_{\\text{CÄ}} = 5 \u003e y_{\\text{CT}} = -3\\)",
                        "\\(y_{\\text{CÄ}} = -3 \u003c y_{\\text{CT}} = 5\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Äáº¡o hÃ m: \\(f\u0027(x) = \\frac{x^2 - 2x - 3}{(x-1)^2} = 0 \\iff x = -1\\) hoáº·c \\(x = 3\\).\u003cbr\u003eTáº¡i \\(x = -1\\) lÃ  Ä‘iá»ƒm cá»±c Ä‘áº¡i cÃ³ \\(y_{\\text{CÄ}} = f(-1) = -5\\). Táº¡i \\(x = 3\\) lÃ  Ä‘iá»ƒm cá»±c tiá»ƒu cÃ³ \\(y_{\\text{CT}} = f(3) = 3\\). RÃµ rÃ ng \\(y_{\\text{CÄ}} = -5 \u003c y_{\\text{CT}} = 3\\).",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_01"
                          ],
        "year":  2024,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Cá»±c Ä‘áº¡i cá»±c tiá»ƒu",
                     "HÃ m phÃ¢n thá»©c"
                 ],
        "knowledge_id":  "kb_toan12_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Cho hÃ m sá»‘ \\(f(x) = \\frac{x^2 - 3x + 6}{x - 1}\\). GiÃ¡ trá»‹ cá»±c Ä‘áº¡i \\(y_{\\text{CÄ}}\\) vÃ  giÃ¡ trá»‹ cá»±c tiá»ƒu \\(y_{\\text{CT}}\\) thá»a mÃ£n há»‡ thá»©c nÃ o sau Ä‘Ã¢y?"
    },
    {
        "id":  "q_tsa_15",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Giá»›i háº¡n dÃ£y sá»‘ \u0026 Tá»‰ sá»‘ vÃ ng",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "DÃ£y Fibonacci \\(\\{F_n\\}\\) thá»a mÃ£n \\(F_0 = 0, F_1 = 1, F_n = F_{n-1} + F_{n-2}\\). Giá»›i háº¡n tá»‰ sá»‘ liÃªn tiáº¿p \\(\\lim_{n \\to \\infty} \\frac{F_{n+1}}{F_n}\\) (tá»‰ sá»‘ vÃ ng \\(\\varphi\\)) báº±ng:",
        "options":  [
                        "\\(\\frac{1 + \\sqrt{5}}{2}\\)",
                        "\\(\\frac{1 - \\sqrt{5}}{2}\\)",
                        "\\(\\sqrt{5} - 1\\)",
                        "\\(1,5\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Äáº·t \\(x = \\lim \\frac{F_{n+1}}{F_n}\\). Tá»« há»‡ thá»©c \\(F_{n+1} = F_n + F_{n-1}\\), chia 2 váº¿ cho \\(F_n\\): \\(x = 1 + \\frac{1}{x} \\iff x^2 - x - 1 = 0\\). VÃ¬ \\(x \u003e 0\\) nÃªn \\(x = \\frac{1 + \\sqrt{5}}{2} \\approx 1,618\\) (Tá»‰ sá»‘ vÃ ng).",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan11_02"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Fibonacci",
                     "Tá»‰ sá»‘ vÃ ng",
                     "Giá»›i háº¡n"
                 ],
        "knowledge_id":  "kb_toan11_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "DÃ£y Fibonacci \\(\\{F_n\\}\\) thá»a mÃ£n \\(F_0 = 0, F_1 = 1, F_n = F_{n-1} + F_{n-2}\\). Giá»›i háº¡n tá»‰ sá»‘ liÃªn tiáº¿p \\(\\lim_{n \\to \\infty} \\frac{F_{n+1}}{F_n}\\) (tá»‰ sá»‘ vÃ ng \\(\\varphi\\)) báº±ng:"
    },
    {
        "id":  "q_tsa_16",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Tá»‘i Æ°u hÃ³a lá»£i nhuáº­n",
        "skills":  [
                       "skill_modeling",
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t dÃ¢y chuyá»n sáº£n xuáº¥t vi máº¡ch cÃ³ chi phÃ­ cá»‘ Ä‘á»‹nh lÃ  50 triá»‡u Ä‘á»“ng vÃ  chi phÃ­ sáº£n xuáº¥t má»—i linh kiá»‡n lÃ  \\(C(x) = 2x^2 + 40x\\) (nghÃ¬n Ä‘á»“ng). GiÃ¡ bÃ¡n má»—i linh kiá»‡n lÃ  120 nghÃ¬n Ä‘á»“ng. Sá»‘ lÆ°á»£ng linh kiá»‡n \\(x\\) cáº§n sáº£n xuáº¥t Ä‘á»ƒ tá»‘i Ä‘a hÃ³a lá»£i nhuáº­n lÃ :",
        "options":  [
                        "20 linh kiá»‡n",
                        "25 linh kiá»‡n",
                        "30 linh kiá»‡n",
                        "40 linh kiá»‡n"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "HÃ m lá»£i nhuáº­n: \\(\\pi(x) = R(x) - C(x) = 120x - (2x^2 + 40x) = -2x^2 + 80x\\).\u003cbr\u003eÄáº¡o hÃ m \\(\\pi\u0027(x) = -4x + 80 = 0 \\iff x = 20\\). Do há»‡ sá»‘ \\(a = -2 \u003c 0\\), parabol Ä‘áº¡t cá»±c Ä‘áº¡i táº¡i \\(x = 20\\).",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan10_03"
                          ],
        "year":  2024,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Kinh táº¿ lÆ°á»£ng",
                     "Tá»‘i Æ°u parabol"
                 ],
        "knowledge_id":  "kb_toan10_03",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t dÃ¢y chuyá»n sáº£n xuáº¥t vi máº¡ch cÃ³ chi phÃ­ cá»‘ Ä‘á»‹nh lÃ  50 triá»‡u Ä‘á»“ng vÃ  chi phÃ­ sáº£n xuáº¥t má»—i linh kiá»‡n lÃ  \\(C(x) = 2x^2 + 40x\\) (nghÃ¬n Ä‘á»“ng). GiÃ¡ bÃ¡n má»—i linh kiá»‡n lÃ  120 nghÃ¬n Ä‘á»“ng. Sá»‘ lÆ°á»£ng linh kiá»‡n \\(x\\) cáº§n sáº£n xuáº¥t Ä‘á»ƒ tá»‘i Ä‘a hÃ³a lá»£i nhuáº­n lÃ :"
    },
    {
        "id":  "q_tsa_17",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "XÃ¡c suáº¥t",
        "subtopic":  "Äá»™ tin cáº­y há»‡ thá»‘ng",
        "skills":  [
                       "skill_probability",
                       "skill_reasoning",
                       "skill_data_analysis"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t há»‡ thá»‘ng cung cáº¥p Ä‘iá»‡n an toÃ n gá»“m 3 bá»™ biáº¿n Ã¡p hoáº¡t Ä‘á»™ng Ä‘á»™c láº­p máº¯c song song. XÃ¡c suáº¥t Ä‘á»ƒ má»—i bá»™ biáº¿n Ã¡p bá»‹ há»ng trong nÄƒm lÃ  0,05. XÃ¡c suáº¥t Ä‘á»ƒ toÃ n há»‡ thá»‘ng váº«n hoáº¡t Ä‘á»™ng (Ã­t nháº¥t 1 bá»™ biáº¿n Ã¡p khÃ´ng há»ng) lÃ :",
        "options":  [
                        "0,999875",
                        "0,950000",
                        "0,997500",
                        "0,999900"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Biáº¿n cá»‘ Ä‘á»‘i lÃ  cáº£ 3 bá»™ biáº¿n Ã¡p Ä‘á»u bá»‹ há»ng: \\(P(\\text{Há»ng cáº£ 3}) = 0,05^3 = 0,000125\\).\u003cbr\u003eXÃ¡c suáº¥t há»‡ thá»‘ng váº«n hoáº¡t Ä‘á»™ng: \\(P = 1 - 0,000125 = 0,999875\\).",
        "common_traps":  [
                             "Nháº§m giá»¯a biáº¿n cá»‘ Ä‘á»™c láº­p vÃ  biáº¿n cá»‘ xung kháº¯c",
                             "KhÃ´ng Ã¡p dá»¥ng Ä‘Ãºng cÃ´ng thá»©c Bayes",
                             "Äáº¿m láº·p trÆ°á»ng há»£p khi Ã¡p dá»¥ng quy táº¯c cá»™ng"
                         ],
        "prerequisites":  [
                              "kb_toan11_05"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Äá»™ tin cáº­y",
                     "Biáº¿n cá»‘ Ä‘á»‘i"
                 ],
        "knowledge_id":  "kb_toan11_05",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t há»‡ thá»‘ng cung cáº¥p Ä‘iá»‡n an toÃ n gá»“m 3 bá»™ biáº¿n Ã¡p hoáº¡t Ä‘á»™ng Ä‘á»™c láº­p máº¯c song song. XÃ¡c suáº¥t Ä‘á»ƒ má»—i bá»™ biáº¿n Ã¡p bá»‹ há»ng trong nÄƒm lÃ  0,05. XÃ¡c suáº¥t Ä‘á»ƒ toÃ n há»‡ thá»‘ng váº«n hoáº¡t Ä‘á»™ng (Ã­t nháº¥t 1 bá»™ biáº¿n Ã¡p khÃ´ng há»ng) lÃ :"
    },
    {
        "id":  "q_tsa_18",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "GÃ³c trong khÃ´ng gian Oxyz",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Trong khÃ´ng gian \\(Oxyz\\), hai tuyáº¿n cÃ¡p quang ngáº§m Ä‘áº·t dá»c theo hai vectÆ¡ \\(\\vec{u}_1 = (1, 2, 2)\\) vÃ  \\(\\vec{u}_2 = (2, -1, 2)\\). GÃ³c \\(\\theta\\) giá»¯a hai tuyáº¿n cÃ¡p quang nÃ y thá»a mÃ£n:",
        "options":  [
                        "\\(\\cos\\theta = \\frac{4}{9}\\)",
                        "\\(\\cos\\theta = \\frac{2}{9}\\)",
                        "\\(\\cos\\theta = \\frac{1}{3}\\)",
                        "\\(\\cos\\theta = \\frac{5}{9}\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Ãp dá»¥ng cÃ´ng thá»©c gÃ³c giá»¯a hai Ä‘Æ°á»ng tháº³ng: \\(\\cos\\theta = \\frac{|\\vec{u}_1 \\cdot \\vec{u}_2|}{|\\vec{u}_1| \\cdot |\\vec{u}_2|}\\).\u003cbr\u003eTÃ­ch vÃ´ hÆ°á»›ng: \\(|1(2) + 2(-1) + 2(2)| = |2 - 2 + 4| = 4\\).\u003cbr\u003eÄá»™ dÃ i: \\(|\\vec{u}_1| = \\sqrt{1+4+4} = 3\\); \\(|\\vec{u}_2| = \\sqrt{4+1+4} = 3\\).\u003cbr\u003eDo Ä‘Ã³ \\(\\cos\\theta = \\frac{4}{3 \\cdot 3} = \\frac{4}{9}\\).",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Oxyz",
                     "GÃ³c hai Ä‘Æ°á»ng tháº³ng"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Trong khÃ´ng gian \\(Oxyz\\), hai tuyáº¿n cÃ¡p quang ngáº§m Ä‘áº·t dá»c theo hai vectÆ¡ \\(\\vec{u}_1 = (1, 2, 2)\\) vÃ  \\(\\vec{u}_2 = (2, -1, 2)\\). GÃ³c \\(\\theta\\) giá»¯a hai tuyáº¿n cÃ¡p quang nÃ y thá»a mÃ£n:"
    },
    {
        "id":  "q_tsa_19",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Tá»‘i Æ°u hÃ³a cá»­a sá»• Norman",
        "skills":  [
                       "skill_modeling",
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "KhÃ³",
        "difficulty_score":  0.88,
        "cognitive_level":  "M4",
        "estimated_time_seconds":  120,
        "question":  "Má»™t cá»­a sá»• Norman cÃ³ hÃ¬nh dáº¡ng gá»“m má»™t hÃ¬nh chá»¯ nháº­t phÃ­a dÆ°á»›i gáº¯n liá»n vá»›i má»™t ná»­a hÃ¬nh trÃ²n phÃ­a trÃªn. Biáº¿t chu vi toÃ n bá»™ cá»­a sá»• lÃ  \\(P = 10\\text{ m}\\). Äá»ƒ diá»‡n tÃ­ch cá»­a sá»• lá»›n nháº¥t (thu Ä‘Æ°á»£c nhiá»u Ã¡nh sÃ¡ng nháº¥t), bÃ¡n kÃ­nh ná»­a hÃ¬nh trÃ²n \\(r\\) pháº£i báº±ng:",
        "options":  [
                        "\\(r = \\frac{10}{\\pi + 4}\\text{ m}\\)",
                        "\\(r = \\frac{5}{\\pi + 2}\\text{ m}\\)",
                        "\\(r = 1\\text{ m}\\)",
                        "\\(r = \\frac{10}{2\\pi + 1}\\text{ m}\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "ÄÃ¡y hÃ¬nh chá»¯ nháº­t lÃ  \\(2r\\), chiá»u cao lÃ  \\(h\\). Chu vi: \\(2r + 2h + \\pi r = 10 \\implies h = 5 - r - \\frac{\\pi}{2}r\\).\u003cbr\u003eDiá»‡n tÃ­ch: \\(S(r) = 2r h + \\frac{1}{2}\\pi r^2 = 2r(5 - r - \\frac{\\pi}{2}r) + \\frac{1}{2}\\pi r^2 = 10r - (2 + \\frac{\\pi}{2})r^2\\).\u003cbr\u003eÄáº¡o hÃ m: \\(S\u0027(r) = 10 - (4 + \\pi)r = 0 \\iff r = \\frac{10}{\\pi + 4}\\text{ m}\\).",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_01"
                          ],
        "year":  2024,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Tá»‘i Æ°u hÃ³a",
                     "Cá»±c trá»‹ thá»±c táº¿"
                 ],
        "knowledge_id":  "kb_toan12_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t cá»­a sá»• Norman cÃ³ hÃ¬nh dáº¡ng gá»“m má»™t hÃ¬nh chá»¯ nháº­t phÃ­a dÆ°á»›i gáº¯n liá»n vá»›i má»™t ná»­a hÃ¬nh trÃ²n phÃ­a trÃªn. Biáº¿t chu vi toÃ n bá»™ cá»­a sá»• lÃ  \\(P = 10\\text{ m}\\). Äá»ƒ diá»‡n tÃ­ch cá»­a sá»• lá»›n nháº¥t (thu Ä‘Æ°á»£c nhiá»u Ã¡nh sÃ¡ng nháº¥t), bÃ¡n kÃ­nh ná»­a hÃ¬nh trÃ²n \\(r\\) pháº£i báº±ng:"
    },
    {
        "id":  "q_tsa_20",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Cá»±c trá»‹ hÃ m sá»‘ qua Ä‘áº¡o hÃ m",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Cho hÃ m sá»‘ \\(y = f(x)\\) cÃ³ báº£ng biáº¿n thiÃªn Ä‘áº¡o hÃ m \\(f\u0027(x) = (x-1)^2(x+2)(x-3)^3\\). Sá»‘ Ä‘iá»ƒm cá»±c trá»‹ cá»§a hÃ m sá»‘ \\(f(x)\\) lÃ :",
        "options":  [
                        "1",
                        "2",
                        "3",
                        "4"
                    ],
        "correct_answer":  1,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Äiá»ƒm cá»±c trá»‹ chá»‰ xáº£y ra khi Ä‘áº¡o hÃ m Ä‘á»•i dáº¥u qua nghiá»‡m bá»™i láº». á»ž Ä‘Ã¢y: \\((x-1)^2\\) lÃ  nghiá»‡m bá»™i cháºµn (khÃ´ng Ä‘á»•i dáº¥u); \\(x+2\\) lÃ  nghiá»‡m bá»™i láº» 1 (Ä‘á»•i dáº¥u); \\((x-3)^3\\) lÃ  nghiá»‡m bá»™i láº» 3 (Ä‘á»•i dáº¥u). Váº­y hÃ m sá»‘ cÃ³ Ä‘Ãºng 2 Ä‘iá»ƒm cá»±c trá»‹ (táº¡i \\(x = -2\\) vÃ  \\(x = 3\\)).",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_01"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Äáº¡o hÃ m",
                     "Nghiá»‡m bá»™i",
                     "Cá»±c trá»‹"
                 ],
        "knowledge_id":  "kb_toan12_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Cho hÃ m sá»‘ \\(y = f(x)\\) cÃ³ báº£ng biáº¿n thiÃªn Ä‘áº¡o hÃ m \\(f\u0027(x) = (x-1)^2(x+2)(x-3)^3\\). Sá»‘ Ä‘iá»ƒm cá»±c trá»‹ cá»§a hÃ m sá»‘ \\(f(x)\\) lÃ :"
    },
    {
        "id":  "q_tsa_21",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Quy hoáº¡ch tuyáº¿n tÃ­nh",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "KhÃ³",
        "difficulty_score":  0.88,
        "cognitive_level":  "M4",
        "estimated_time_seconds":  120,
        "question":  "Má»™t cÃ´ng ty dá»± Ä‘á»‹nh Ä‘áº§u tÆ° tá»‘i Ä‘a 100 tá»· Ä‘á»“ng vÃ o 2 dá»± Ã¡n X vÃ  Y. Dá»± Ã¡n X yÃªu cáº§u tá»‘i thiá»ƒu 20 tá»· vÃ  sinh lá»i 12%/nÄƒm. Dá»± Ã¡n Y yÃªu cáº§u tá»‘i thiá»ƒu 30 tá»· vÃ  sinh lá»i 15%/nÄƒm. Do rá»§i ro thanh khoáº£n, sá»‘ tiá»n Ä‘áº§u tÆ° vÃ o Y khÃ´ng Ä‘Æ°á»£c vÆ°á»£t quÃ¡ 2 láº§n sá»‘ tiá»n Ä‘áº§u tÆ° vÃ o X. Lá»£i nhuáº­n hÃ ng nÄƒm lá»›n nháº¥t mÃ  cÃ´ng ty cÃ³ thá»ƒ Ä‘áº¡t Ä‘Æ°á»£c lÃ :",
        "options":  [
                        "13,8 tá»· Ä‘á»“ng",
                        "14,0 tá»· Ä‘á»“ng",
                        "14,4 tá»· Ä‘á»“ng",
                        "15,0 tá»· Ä‘á»“ng"
                    ],
        "correct_answer":  1,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Gá»i x, y láº§n lÆ°á»£t lÃ  sá»‘ tiá»n Ä‘áº§u tÆ° vÃ o X vÃ  Y (tá»· Ä‘á»“ng).\u003cbr\u003eHá»‡ rÃ ng buá»™c: x + y â‰¤ 100, x â‰¥ 20, y â‰¥ 30, y â‰¤ 2x.\u003cbr\u003eMiá»n nghiá»‡m lÃ  tá»© giÃ¡c vá»›i cÃ¡c Ä‘á»‰nh: A(20, 30), B(20, 40), C(100/3, 200/3), D(70, 30).\u003cbr\u003eLá»£i nhuáº­n L(x, y) = 0,12x + 0,15y.\u003cbr\u003eTÃ­nh táº¡i C(100/3, 200/3): L = 0,12(100/3) + 0,15(200/3) = 4 + 10 = 14,0 tá»· Ä‘á»“ng.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan10_02"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Quy hoáº¡ch tuyáº¿n tÃ­nh",
                     "Tá»‘i Æ°u hÃ³a tÃ i chÃ­nh"
                 ],
        "knowledge_id":  "kb_toan10_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t cÃ´ng ty dá»± Ä‘á»‹nh Ä‘áº§u tÆ° tá»‘i Ä‘a 100 tá»· Ä‘á»“ng vÃ o 2 dá»± Ã¡n X vÃ  Y. Dá»± Ã¡n X yÃªu cáº§u tá»‘i thiá»ƒu 20 tá»· vÃ  sinh lá»i 12%/nÄƒm. Dá»± Ã¡n Y yÃªu cáº§u tá»‘i thiá»ƒu 30 tá»· vÃ  sinh lá»i 15%/nÄƒm. Do rá»§i ro thanh khoáº£n, sá»‘ tiá»n Ä‘áº§u tÆ° vÃ o Y khÃ´ng Ä‘Æ°á»£c vÆ°á»£t quÃ¡ 2 láº§n sá»‘ tiá»n Ä‘áº§u tÆ° vÃ o X. Lá»£i nhuáº­n hÃ ng nÄƒm lá»›n nháº¥t mÃ  cÃ´ng ty cÃ³ thá»ƒ Ä‘áº¡t Ä‘Æ°á»£c lÃ :"
    },
    {
        "id":  "q_tsa_22",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "ÄÆ°á»ng cong tÄƒng trÆ°á»Ÿng Logistic",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "KhÃ³",
        "difficulty_score":  0.88,
        "cognitive_level":  "M4",
        "estimated_time_seconds":  120,
        "question":  "MÃ´ hÃ¬nh tÄƒng trÆ°á»Ÿng sá»‘ lÆ°á»£ng tÃ i khoáº£n cá»§a má»™t máº¡ng xÃ£ há»™i thá»a mÃ£n phÆ°Æ¡ng trÃ¬nh logistic: \\(N(t) = \\frac{50}{1 + 9e^{-0,4t}}\\) (triá»‡u tÃ i khoáº£n, t tÃ­nh báº±ng thÃ¡ng). Tá»‘c Ä‘á»™ tÄƒng trÆ°á»Ÿng sá»‘ lÆ°á»£ng ngÆ°á»i dÃ¹ng \\(N\u0027(t)\\) Ä‘áº¡t giÃ¡ trá»‹ cá»±c Ä‘áº¡i khi sá»‘ lÆ°á»£ng ngÆ°á»i dÃ¹ng Ä‘áº¡t má»©c nÃ o?",
        "options":  [
                        "25 triá»‡u tÃ i khoáº£n",
                        "50 triá»‡u tÃ i khoáº£n",
                        "9 triá»‡u tÃ i khoáº£n",
                        "12,5 triá»‡u tÃ i khoáº£n"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "PhÆ°Æ¡ng trÃ¬nh vi phÃ¢n logistic: dN/dt = k N (1 - N/K) vá»›i dung lÆ°á»£ng cá»±c háº¡n K = 50 triá»‡u.\u003cbr\u003eHÃ m báº­c hai f(N) = k N (K - N) Ä‘áº¡t cá»±c Ä‘áº¡i táº¡i Ä‘á»‰nh parabol: N = K / 2 = 50 / 2 = 25 triá»‡u tÃ i khoáº£n.\u003cbr\u003eÄÃ¢y lÃ  Ä‘iá»ƒm uá»‘n cá»§a Ä‘Æ°á»ng cong logistic hÃ¬nh chá»¯ S.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_01"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Logistic",
                     "Äáº¡o hÃ m",
                     "MÃ´ hÃ¬nh hÃ³a"
                 ],
        "knowledge_id":  "kb_toan12_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "MÃ´ hÃ¬nh tÄƒng trÆ°á»Ÿng sá»‘ lÆ°á»£ng tÃ i khoáº£n cá»§a má»™t máº¡ng xÃ£ há»™i thá»a mÃ£n phÆ°Æ¡ng trÃ¬nh logistic: \\(N(t) = \\frac{50}{1 + 9e^{-0,4t}}\\) (triá»‡u tÃ i khoáº£n, t tÃ­nh báº±ng thÃ¡ng). Tá»‘c Ä‘á»™ tÄƒng trÆ°á»Ÿng sá»‘ lÆ°á»£ng ngÆ°á»i dÃ¹ng \\(N\u0027(t)\\) Ä‘áº¡t giÃ¡ trá»‹ cá»±c Ä‘áº¡i khi sá»‘ lÆ°á»£ng ngÆ°á»i dÃ¹ng Ä‘áº¡t má»©c nÃ o?"
    },
    {
        "id":  "q_tsa_23",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Äá»‹nh lÃ½ Fermat tá»‘i Æ°u chi phÃ­",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "KhÃ³",
        "difficulty_score":  0.88,
        "cognitive_level":  "M4",
        "estimated_time_seconds":  120,
        "question":  "Má»™t Ä‘Æ°á»ng cÃ¡p viá»…n thÃ´ng ná»‘i tá»« tráº¡m phÃ¡t A trÃªn bá» biá»ƒn tháº³ng Ä‘áº¿n Ä‘iá»ƒm C trÃªn má»™t hÃ²n Ä‘áº£o cÃ¡ch bá» 6 km. Tráº¡m thu B trÃªn bá» cÃ¡ch hÃ¬nh chiáº¿u H cá»§a C má»™t khoáº£ng 8 km. Chi phÃ­ Ä‘áº·t 1 km cÃ¡p dÆ°á»›i nÆ°á»›c lÃ  50 triá»‡u Ä‘á»“ng, chi phÃ­ Ä‘áº·t trÃªn Ä‘áº¥t liá»n lÃ  30 triá»‡u Ä‘á»“ng. Vá»‹ trÃ­ tiáº¿p bá» P (náº±m giá»¯a H vÃ  B) cÃ¡ch H má»™t khoáº£ng x báº±ng bao nhiÃªu Ä‘á»ƒ tá»•ng chi phÃ­ nhá» nháº¥t?",
        "options":  [
                        "4,5 km",
                        "4,0 km",
                        "3,5 km",
                        "5,0 km"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Khoáº£ng cÃ¡ch dÆ°á»›i nÆ°á»›c: PC = âˆš(6Â² + xÂ²) = âˆš(36 + xÂ²).\u003cbr\u003eKhoáº£ng cÃ¡ch trÃªn cáº¡n: PB = 8 - x.\u003cbr\u003eHÃ m chi phÃ­: C(x) = 50âˆš(36 + xÂ²) + 30(8 - x).\u003cbr\u003eC\u0027(x) = 50x / âˆš(36 + xÂ²) - 30 = 0 â‡” 5x / âˆš(36 + xÂ²) = 3 â‡” 25xÂ² = 9(36 + xÂ²) â‡” 16xÂ² = 324 â‡” x = 18/4 = 4,5 km.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_01"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Tá»‘i Æ°u Fermat",
                     "Chi phÃ­ cÃ¡p",
                     "Cá»±c trá»‹"
                 ],
        "knowledge_id":  "kb_toan12_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t Ä‘Æ°á»ng cÃ¡p viá»…n thÃ´ng ná»‘i tá»« tráº¡m phÃ¡t A trÃªn bá» biá»ƒn tháº³ng Ä‘áº¿n Ä‘iá»ƒm C trÃªn má»™t hÃ²n Ä‘áº£o cÃ¡ch bá» 6 km. Tráº¡m thu B trÃªn bá» cÃ¡ch hÃ¬nh chiáº¿u H cá»§a C má»™t khoáº£ng 8 km. Chi phÃ­ Ä‘áº·t 1 km cÃ¡p dÆ°á»›i nÆ°á»›c lÃ  50 triá»‡u Ä‘á»“ng, chi phÃ­ Ä‘áº·t trÃªn Ä‘áº¥t liá»n lÃ  30 triá»‡u Ä‘á»“ng. Vá»‹ trÃ­ tiáº¿p bá» P (náº±m giá»¯a H vÃ  B) cÃ¡ch H má»™t khoáº£ng x báº±ng bao nhiÃªu Ä‘á»ƒ tá»•ng chi phÃ­ nhá» nháº¥t?"
    },
    {
        "id":  "q_tsa_24",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "Äa diá»‡n Ä‘á»u khÃ´ng gian",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t chÃ¹m vá»‡ tinh Ä‘á»‹nh vá»‹ gá»“m 4 vá»‡ tinh bay theo quá»¹ Ä‘áº¡o trÃ²n Ä‘á»“ng quy táº¡i tÃ¢m TrÃ¡i Äáº¥t. Khoáº£ng cÃ¡ch giá»¯a 2 vá»‡ tinh báº¥t ká»³ luÃ´n báº±ng nhau. Vá»‹ trÃ­ 4 vá»‡ tinh táº¡o thÃ nh 4 Ä‘á»‰nh cá»§a má»™t khá»‘i Ä‘a diá»‡n Ä‘á»u nÃ o?",
        "options":  [
                        "Tá»© diá»‡n Ä‘á»u",
                        "HÃ¬nh láº­p phÆ°Æ¡ng",
                        "BÃ¡t diá»‡n Ä‘á»u",
                        "MÆ°á»i hai máº·t Ä‘á»u"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Khá»‘i Ä‘a diá»‡n cÃ³ 4 Ä‘á»‰nh cÃ¡ch Ä‘á»u nhau Ä‘Ã´i má»™t vÃ  cÃ¹ng ná»™i tiáº¿p má»™t máº·t cáº§u duy nháº¥t lÃ  tá»© diá»‡n Ä‘á»u (Regular Tetrahedron).",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Tá»© diá»‡n Ä‘á»u",
                     "Äa diá»‡n Ä‘á»u",
                     "Vá»‡ tinh"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t chÃ¹m vá»‡ tinh Ä‘á»‹nh vá»‹ gá»“m 4 vá»‡ tinh bay theo quá»¹ Ä‘áº¡o trÃ²n Ä‘á»“ng quy táº¡i tÃ¢m TrÃ¡i Äáº¥t. Khoáº£ng cÃ¡ch giá»¯a 2 vá»‡ tinh báº¥t ká»³ luÃ´n báº±ng nhau. Vá»‹ trÃ­ 4 vá»‡ tinh táº¡o thÃ nh 4 Ä‘á»‰nh cá»§a má»™t khá»‘i Ä‘a diá»‡n Ä‘á»u nÃ o?"
    },
    {
        "id":  "q_tsa_25",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "HÃ m truyá»n Ä‘áº¡t tÃ­n hiá»‡u",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t bá»™ lá»c thÃ´ng dáº£i Ä‘iá»‡n tá»­ cÃ³ hÃ m truyá»n Ä‘áº¡t \\(H(\\omega) = \\frac{1}{\\sqrt{1 + \\omega^4}}\\). BÄƒng thÃ´ng \\(\\omega_c\\) táº¡i Ä‘iá»ƒm cÃ´ng suáº¥t giáº£m má»™t ná»­a thá»a mÃ£n \\(|H(\\omega_c)|^2 = 1/2\\). GiÃ¡ trá»‹ cá»§a \\(\\omega_c\\) báº±ng:",
        "options":  [
                        "1 rad/s",
                        "âˆš2 rad/s",
                        "2 rad/s",
                        "1/âˆš2 rad/s"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Ta cÃ³: |H(Ï‰)|Â² = 1 / (1 + Ï‰â´) = 1/2 â‡” 1 + Ï‰â´ = 2 â‡” Ï‰â´ = 1 â‡” Ï‰ = 1 (vÃ¬ táº§n sá»‘ gÃ³c Ï‰ \u003e 0).",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_dstt_02"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "TÃ­n hiá»‡u",
                     "Máº¡ch Ä‘iá»‡n",
                     "Táº§n sá»‘"
                 ],
        "knowledge_id":  "kb_dstt_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t bá»™ lá»c thÃ´ng dáº£i Ä‘iá»‡n tá»­ cÃ³ hÃ m truyá»n Ä‘áº¡t \\(H(\\omega) = \\frac{1}{\\sqrt{1 + \\omega^4}}\\). BÄƒng thÃ´ng \\(\\omega_c\\) táº¡i Ä‘iá»ƒm cÃ´ng suáº¥t giáº£m má»™t ná»­a thá»a mÃ£n \\(|H(\\omega_c)|^2 = 1/2\\). GiÃ¡ trá»‹ cá»§a \\(\\omega_c\\) báº±ng:"
    },
    {
        "id":  "q_tsa_26",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Thá»‘ng kÃª",
        "subtopic":  "Há»“i quy tuyáº¿n tÃ­nh bÃ¬nh phÆ°Æ¡ng bÃ© nháº¥t",
        "skills":  [
                       "skill_probability",
                       "skill_data_analysis"
                   ],
        "difficulty":  "KhÃ³",
        "difficulty_score":  0.88,
        "cognitive_level":  "M4",
        "estimated_time_seconds":  120,
        "question":  "Báº£ng dá»¯ liá»‡u Ä‘o lá»±c cÄƒng T (Newton) theo Ä‘á»™ giÃ£n x (cm) cá»§a má»™t sá»£i dÃ¢y cao su nhÆ° sau: (1; 2.1), (2; 4.0), (3; 5.9), (4; 8.1). Há»‡ sá»‘ gÃ³c há»“i quy tuyáº¿n tÃ­nh \\(T = ax + b\\) tÃ­nh theo phÆ°Æ¡ng phÃ¡p bÃ¬nh phÆ°Æ¡ng bÃ© nháº¥t gáº§n nháº¥t vá»›i giÃ¡ trá»‹ nÃ o?",
        "options":  [
                        "2,00",
                        "1,95",
                        "2,05",
                        "2,10"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "xÌ„ = (1+2+3+4)/4 = 2,5. TÌ„ = (2,1 + 4,0 + 5,9 + 8,1)/4 = 20,1/4 = 5,025.\u003cbr\u003eâˆ‘(x - xÌ„)Â² = (-1,5)Â² + (-0,5)Â² + 0,5Â² + 1,5Â² = 2,25 + 0,25 + 0,25 + 2,25 = 5.\u003cbr\u003eâˆ‘(x - xÌ„)(T - TÌ„) = (-1,5)(-2,925) + (-0,5)(-1,025) + 0,5(0,875) + 1,5(3,075) = 4,3875 + 0,5125 + 0,4375 + 4,6125 = 9,95.\u003cbr\u003ea = 9,95 / 5 = 1,99 â‰ˆ 2,00.",
        "common_traps":  [
                             "Báº¥t cáº©n trong biáº¿n Ä‘á»•i Ä‘áº¡i sá»‘ cÆ¡ báº£n",
                             "Bá» quÃªn Ä‘iá»u kiá»‡n rÃ ng buá»™c cá»§a bÃ i toÃ¡n"
                         ],
        "prerequisites":  [
                              "kb_toan10_05"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Há»“i quy",
                     "Thá»‘ng kÃª",
                     "BÃ¬nh phÆ°Æ¡ng bÃ© nháº¥t"
                 ],
        "knowledge_id":  "kb_toan10_05",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Báº£ng dá»¯ liá»‡u Ä‘o lá»±c cÄƒng T (Newton) theo Ä‘á»™ giÃ£n x (cm) cá»§a má»™t sá»£i dÃ¢y cao su nhÆ° sau: (1; 2.1), (2; 4.0), (3; 5.9), (4; 8.1). Há»‡ sá»‘ gÃ³c há»“i quy tuyáº¿n tÃ­nh \\(T = ax + b\\) tÃ­nh theo phÆ°Æ¡ng phÃ¡p bÃ¬nh phÆ°Æ¡ng bÃ© nháº¥t gáº§n nháº¥t vá»›i giÃ¡ trá»‹ nÃ o?"
    },
    {
        "id":  "q_tsa_27",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "TÃ­ch phÃ¢n dÃ²ng cháº£y",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "Má»™t há»“ chá»©a nÆ°á»›c cÃ³ lÆ°u lÆ°á»£ng dÃ²ng cháº£y vÃ o lÃ  \\(Q_{\\text{in}}(t) = 30 + 10\\sin(\\pi t / 12)\\) (mÂ³/h) vÃ  lÆ°u lÆ°á»£ng thoÃ¡t lÃ  háº±ng sá»‘ \\(Q_{\\text{out}} = 30\\) (mÂ³/h), vá»›i t tÃ­nh báº±ng giá» ká»ƒ tá»« 0h. Trong khoáº£ng thá»i gian tá»« 0h Ä‘áº¿n 12h, lÆ°á»£ng nÆ°á»›c trong há»“ tÄƒng thÃªm bao nhiÃªu mÂ³?",
        "options":  [
                        "\\(240/\\pi\\text{ m}^3\\)",
                        "\\(120/\\pi\\text{ m}^3\\)",
                        "\\(60\\pi\\text{ m}^3\\)",
                        "\\(120\\pi\\text{ m}^3\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "LÆ°á»£ng nÆ°á»›c biáº¿n thiÃªn: Î”V = âˆ«â‚€Â¹Â² (Q_in - Q_out) dt = âˆ«â‚€Â¹Â² 10 sin(Ï€t / 12) dt = 10 [-12/Ï€ cos(Ï€t / 12)]â‚€Â¹Â² = -(120/Ï€)[cos Ï€ - cos 0] = -(120/Ï€)(-1 - 1) = 240/Ï€ mÂ³ â‰ˆ 76,4 mÂ³.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_03"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "TÃ­ch phÃ¢n",
                     "Thá»§y lá»£i",
                     "DÃ²ng cháº£y"
                 ],
        "knowledge_id":  "kb_toan12_03",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t há»“ chá»©a nÆ°á»›c cÃ³ lÆ°u lÆ°á»£ng dÃ²ng cháº£y vÃ o lÃ  \\(Q_{\\text{in}}(t) = 30 + 10\\sin(\\pi t / 12)\\) (mÂ³/h) vÃ  lÆ°u lÆ°á»£ng thoÃ¡t lÃ  háº±ng sá»‘ \\(Q_{\\text{out}} = 30\\) (mÂ³/h), vá»›i t tÃ­nh báº±ng giá» ká»ƒ tá»« 0h. Trong khoáº£ng thá»i gian tá»« 0h Ä‘áº¿n 12h, lÆ°á»£ng nÆ°á»›c trong há»“ tÄƒng thÃªm bao nhiÃªu mÂ³?"
    },
    {
        "id":  "q_tsa_28",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "GiÃ¡ trá»‹ riÃªng \u0026 ViÃ¨te",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t ma tráº­n \\(A\\) cáº¥p 2 cÃ³ \\(\\det(A) = 6\\) vÃ  váº¿t \\(\\text{tr}(A) = 5\\). Hai giÃ¡ trá»‹ riÃªng cá»§a ma tráº­n \\(A\\) lÃ :",
        "options":  [
                        "\\(\\lambda_1 = 2, \\lambda_2 = 3\\)",
                        "\\(\\lambda_1 = 1, \\lambda_2 = 6\\)",
                        "\\(\\lambda_1 = -1, \\lambda_2 = 6\\)",
                        "\\(\\lambda_1 = 2, \\lambda_2 = 4\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Tá»•ng cÃ¡c giÃ¡ trá»‹ riÃªng báº±ng váº¿t: Î»â‚ + Î»â‚‚ = 5.\u003cbr\u003eTÃ­ch cÃ¡c giÃ¡ trá»‹ riÃªng báº±ng Ä‘á»‹nh thá»©c: Î»â‚ Â· Î»â‚‚ = 6.\u003cbr\u003eTheo Ä‘á»‹nh lÃ½ ViÃ¨te, Î» lÃ  nghiá»‡m cá»§a phÆ°Æ¡ng trÃ¬nh Î»Â² - 5Î» + 6 = 0 â‡” Î»â‚ = 2, Î»â‚‚ = 3.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_dstt_04"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "ToÃ¡n Cao Cáº¥p ÄHBK",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Trá»‹ riÃªng",
                     "ViÃ¨te",
                     "Äáº¡i sá»‘ ma tráº­n"
                 ],
        "knowledge_id":  "kb_dstt_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t ma tráº­n \\(A\\) cáº¥p 2 cÃ³ \\(\\det(A) = 6\\) vÃ  váº¿t \\(\\text{tr}(A) = 5\\). Hai giÃ¡ trá»‹ riÃªng cá»§a ma tráº­n \\(A\\) lÃ :"
    },
    {
        "id":  "q_tsa_29",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "XÃ¡c suáº¥t",
        "subtopic":  "PhÃ¢n phá»‘i xÃ¡c suáº¥t hÃ m mÅ©",
        "skills":  [
                       "skill_probability",
                       "skill_reasoning",
                       "skill_data_analysis"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "XÃ¡c suáº¥t Ä‘á»ƒ má»™t thiáº¿t bá»‹ Ä‘iá»‡n tá»­ hoáº¡t Ä‘á»™ng liÃªn tá»¥c quÃ¡ t giá» tuÃ¢n theo phÃ¢n phá»‘i mÅ©: \\(P(T \u003e t) = e^{-0,002t}\\) (t â‰¥ 0). Thá»i gian hoáº¡t Ä‘á»™ng trung bÃ¬nh (tuá»•i thá» ká»³ vá»ng) cá»§a thiáº¿t bá»‹ nÃ y lÃ :",
        "options":  [
                        "500 giá»",
                        "200 giá»",
                        "1000 giá»",
                        "250 giá»"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Vá»›i phÃ¢n phá»‘i hÃ m mÅ© cÃ³ tham sá»‘ Î» = 0,002 (hâ»Â¹), ká»³ vá»ng E(T) = 1/Î» = 1 / 0,002 = 500 giá».",
        "common_traps":  [
                             "Nháº§m giá»¯a biáº¿n cá»‘ Ä‘á»™c láº­p vÃ  biáº¿n cá»‘ xung kháº¯c",
                             "KhÃ´ng Ã¡p dá»¥ng Ä‘Ãºng cÃ´ng thá»©c Bayes",
                             "Äáº¿m láº·p trÆ°á»ng há»£p khi Ã¡p dá»¥ng quy táº¯c cá»™ng"
                         ],
        "prerequisites":  [
                              "kb_toan12_05"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "PhÃ¢n phá»‘i mÅ©",
                     "Tuá»•i thá» thiáº¿t bá»‹"
                 ],
        "knowledge_id":  "kb_toan12_05",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "XÃ¡c suáº¥t Ä‘á»ƒ má»™t thiáº¿t bá»‹ Ä‘iá»‡n tá»­ hoáº¡t Ä‘á»™ng liÃªn tá»¥c quÃ¡ t giá» tuÃ¢n theo phÃ¢n phá»‘i mÅ©: \\(P(T \u003e t) = e^{-0,002t}\\) (t â‰¥ 0). Thá»i gian hoáº¡t Ä‘á»™ng trung bÃ¬nh (tuá»•i thá» ká»³ vá»ng) cá»§a thiáº¿t bá»‹ nÃ y lÃ :"
    },
    {
        "id":  "q_tsa_30",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "XÃ¡c suáº¥t",
        "subtopic":  "BÃ i toÃ¡n Ä‘Æ°á»ng Ä‘i lÆ°á»›i Ã´ vuÃ´ng",
        "skills":  [
                       "skill_probability",
                       "skill_reasoning",
                       "skill_data_analysis"
                   ],
        "difficulty":  "KhÃ³",
        "difficulty_score":  0.88,
        "cognitive_level":  "M4",
        "estimated_time_seconds":  120,
        "question":  "Má»™t robot thÃ¡m hiá»ƒm di chuyá»ƒn trÃªn máº·t pháº³ng tá»« tá»a Ä‘á»™ \\(O(0, 0)\\). Má»—i bÆ°á»›c robot chá»‰ cÃ³ thá»ƒ di chuyá»ƒn lÃªn trÃªn 1 Ä‘Æ¡n vá»‹ \\((x, y+1)\\) hoáº·c sang pháº£i 1 Ä‘Æ¡n vá»‹ \\((x+1, y)\\). Há»i cÃ³ bao nhiÃªu lá»™ trÃ¬nh khÃ¡c nhau Ä‘á»ƒ robot Ä‘i Ä‘áº¿n Ä‘iá»ƒm \\(K(5, 4)\\) mÃ  khÃ´ng Ä‘i qua Ä‘iá»ƒm chÆ°á»›ng ngáº¡i váº­t \\(M(2, 2)\\)?",
        "options":  [
                        "66 lá»™ trÃ¬nh",
                        "126 lá»™ trÃ¬nh",
                        "60 lá»™ trÃ¬nh",
                        "76 lá»™ trÃ¬nh"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Tá»•ng lá»™ trÃ¬nh: Câ‚‰â´ = 126.\u003cbr\u003eLá»™ trÃ¬nh qua M(2,2): Câ‚„Â² Â· Câ‚…Â² = 6 Â· 10 = 60.\u003cbr\u003eSá»‘ lá»™ trÃ¬nh khÃ´ng qua chÆ°á»›ng ngáº¡i váº­t: 126 - 60 = 66 lá»™ trÃ¬nh.",
        "common_traps":  [
                             "Nháº§m giá»¯a biáº¿n cá»‘ Ä‘á»™c láº­p vÃ  biáº¿n cá»‘ xung kháº¯c",
                             "KhÃ´ng Ã¡p dá»¥ng Ä‘Ãºng cÃ´ng thá»©c Bayes",
                             "Äáº¿m láº·p trÆ°á»ng há»£p khi Ã¡p dá»¥ng quy táº¯c cá»™ng"
                         ],
        "prerequisites":  [
                              "kb_toan10_05"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Tá»• há»£p",
                     "LÆ°á»›i Ã´ vuÃ´ng",
                     "Robot"
                 ],
        "knowledge_id":  "kb_toan10_05",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t robot thÃ¡m hiá»ƒm di chuyá»ƒn trÃªn máº·t pháº³ng tá»« tá»a Ä‘á»™ \\(O(0, 0)\\). Má»—i bÆ°á»›c robot chá»‰ cÃ³ thá»ƒ di chuyá»ƒn lÃªn trÃªn 1 Ä‘Æ¡n vá»‹ \\((x, y+1)\\) hoáº·c sang pháº£i 1 Ä‘Æ¡n vá»‹ \\((x+1, y)\\). Há»i cÃ³ bao nhiÃªu lá»™ trÃ¬nh khÃ¡c nhau Ä‘á»ƒ robot Ä‘i Ä‘áº¿n Ä‘iá»ƒm \\(K(5, 4)\\) mÃ  khÃ´ng Ä‘i qua Ä‘iá»ƒm chÆ°á»›ng ngáº¡i váº­t \\(M(2, 2)\\)?"
    },
    {
        "id":  "q_tsa_tf_01",
        "type":  "true_false_group",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Kháº£o sÃ¡t hÃ m báº­c ba toÃ n diá»‡n",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  130,
        "question":  "Cho hÃ m sá»‘ \\(f(x) = x^3 - 3x^2 + 2\\). XÃ©t tÃ­nh Ä‘Ãºng sai cá»§a cÃ¡c má»‡nh Ä‘á» sau:",
        "options":  null,
        "correct_answer":  null,
        "items":  [
                      {
                          "label":  "a",
                          "text":  "HÃ m sá»‘ Ä‘á»“ng biáº¿n trÃªn khoáº£ng \\((-\\infty; 0)\\) vÃ  \\((2; +\\infty)\\).",
                          "correct":  true
                      },
                      {
                          "label":  "b",
                          "text":  "Äiá»ƒm cá»±c tiá»ƒu cá»§a Ä‘á»“ thá»‹ hÃ m sá»‘ lÃ  \\((0; 2)\\).",
                          "correct":  false
                      },
                      {
                          "label":  "c",
                          "text":  "PhÆ°Æ¡ng trÃ¬nh tiáº¿p tuyáº¿n cá»§a Ä‘á»“ thá»‹ táº¡i Ä‘iá»ƒm uá»‘n cÃ³ há»‡ sá»‘ gÃ³c báº±ng \\(-3\\).",
                          "correct":  true
                      },
                      {
                          "label":  "d",
                          "text":  "Äá»“ thá»‹ hÃ m sá»‘ cáº¯t trá»¥c hoÃ nh táº¡i Ä‘Ãºng 3 Ä‘iá»ƒm phÃ¢n biá»‡t.",
                          "correct":  true
                      }
                  ],
        "correct_value":  null,
        "explanation":  "a) ÄÃºng: f\u0027(x) = 3xÂ² - 6x = 3x(x - 2) \u003e 0 khi x \u003c 0 hoáº·c x \u003e 2.\u003cbr\u003eb) Sai: f\u0027(x) Ä‘á»•i dáº¥u tá»« Ã¢m sang dÆ°Æ¡ng táº¡i x = 2, f(2) = -2, nÃªn Ä‘iá»ƒm cá»±c tiá»ƒu lÃ  (2; -2).\u003cbr\u003ec) ÄÃºng: Äiá»ƒm uá»‘n f\u0027\u0027(x) = 6x - 6 = 0 â‡” x = 1. Há»‡ sá»‘ gÃ³c tiáº¿p tuyáº¿n k = f\u0027(1) = 3(1) - 6(1) = -3.\u003cbr\u003ed) ÄÃºng: y_CÄ Â· y_CT = f(0) Â· f(2) = 2 Â· (-2) = -4 \u003c 0, do Ä‘Ã³ Ä‘á»“ thá»‹ cáº¯t Ox táº¡i 3 Ä‘iá»ƒm phÃ¢n biá»‡t.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_01"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Cáº¥u trÃºc Ä‘á» thi má»›i Bá»™ GD\u0026ÄT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "ÄÃºng/Sai chÃ¹m",
                     "Kháº£o sÃ¡t hÃ m sá»‘",
                     "Cá»±c trá»‹"
                 ],
        "knowledge_id":  "kb_toan12_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Cho hÃ m sá»‘ \\(f(x) = x^3 - 3x^2 + 2\\). XÃ©t tÃ­nh Ä‘Ãºng sai cá»§a cÃ¡c má»‡nh Ä‘á» sau:"
    },
    {
        "id":  "q_tsa_sa_01",
        "type":  "short_answer",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "Thá»ƒ tÃ­ch khá»‘i chÃ³p",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t khá»‘i bÃª tÃ´ng cÃ³ dáº¡ng hÃ¬nh chÃ³p tá»© giÃ¡c Ä‘á»u vá»›i cáº¡nh Ä‘Ã¡y báº±ng \\(4\\text{ m}\\) vÃ  chiá»u cao báº±ng \\(6\\text{ m}\\). TÃ­nh thá»ƒ tÃ­ch cá»§a khá»‘i bÃª tÃ´ng Ä‘Ã³ (theo Ä‘Æ¡n vá»‹ \\(\\text{m}^3\\)).",
        "options":  null,
        "correct_answer":  null,
        "items":  null,
        "correct_value":  "32",
        "explanation":  "Thá»ƒ tÃ­ch khá»‘i chÃ³p: \\(V = \\frac{1}{3} S_{\\text{Ä‘Ã¡y}} \\cdot h = \\frac{1}{3} \\cdot 4^2 \\cdot 6 = \\frac{1}{3} \\cdot 16 \\cdot 6 = 32\\text{ m}^3\\).",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Äiá»n Ä‘Ã¡p sá»‘",
                     "Thá»ƒ tÃ­ch",
                     "HÃ¬nh há»c khÃ´ng gian"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t khá»‘i bÃª tÃ´ng cÃ³ dáº¡ng hÃ¬nh chÃ³p tá»© giÃ¡c Ä‘á»u vá»›i cáº¡nh Ä‘Ã¡y báº±ng \\(4\\text{ m}\\) vÃ  chiá»u cao báº±ng \\(6\\text{ m}\\). TÃ­nh thá»ƒ tÃ­ch cá»§a khá»‘i bÃª tÃ´ng Ä‘Ã³ (theo Ä‘Æ¡n vá»‹ \\(\\text{m}^3\\))."
    },
    {
        "id":  "q_tsa_step_01",
        "type":  "step_solution",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Tá»± luáº­n cháº¥m Ä‘iá»ƒm theo barem",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  150,
        "question":  "Giáº£i bÃ i toÃ¡n tá»‘i Æ°u hÃ³a diá»‡n tÃ­ch: Cho má»™t sá»£i dÃ¢y thÃ©p dÃ i \\(L = 20\\text{ m}\\). Cáº§n uá»‘n sá»£i dÃ¢y nÃ y thÃ nh má»™t hÃ¬nh chá»¯ nháº­t cÃ³ diá»‡n tÃ­ch lá»›n nháº¥t. HÃ£y trÃ¬nh bÃ y lá»i giáº£i vÃ  tÃ¬m diá»‡n tÃ­ch lá»›n nháº¥t Ä‘Ã³.",
        "options":  null,
        "correct_answer":  null,
        "items":  null,
        "correct_value":  null,
        "explanation":  "",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_01"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Tá»± luáº­n Ä‘á»‘i chiáº¿u barem",
                     "Cá»±c trá»‹"
                 ],
        "knowledge_id":  "kb_toan12_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Giáº£i bÃ i toÃ¡n tá»‘i Æ°u hÃ³a diá»‡n tÃ­ch: Cho má»™t sá»£i dÃ¢y thÃ©p dÃ i \\(L = 20\\text{ m}\\). Cáº§n uá»‘n sá»£i dÃ¢y nÃ y thÃ nh má»™t hÃ¬nh chá»¯ nháº­t cÃ³ diá»‡n tÃ­ch lá»›n nháº¥t. HÃ£y trÃ¬nh bÃ y lá»i giáº£i vÃ  tÃ¬m diá»‡n tÃ­ch lá»›n nháº¥t Ä‘Ã³."
    },
    {
        "id":  "q_hsa_01",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Cáº¥p sá»‘ nhÃ¢n",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Cho cáº¥p sá»‘ nhÃ¢n \\((u_n)\\) cÃ³ sá»‘ háº¡ng Ä‘áº§u \\(u_1 = 3\\) vÃ  cÃ´ng bá»™i \\(q = 2\\). GiÃ¡ trá»‹ cá»§a sá»‘ háº¡ng thá»© 8 lÃ :",
        "options":  [
                        "192",
                        "384",
                        "768",
                        "256"
                    ],
        "correct_answer":  1,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Sá»‘ háº¡ng tá»•ng quÃ¡t: \\(u_8 = u_1 \\cdot q^7 = 3 \\cdot 2^7 = 3 \\cdot 128 = 384\\).",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan11_02"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Cáº¥p sá»‘ nhÃ¢n",
                     "DÃ£y sá»‘",
                     "HSA"
                 ],
        "knowledge_id":  "kb_toan11_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Cho cáº¥p sá»‘ nhÃ¢n \\((u_n)\\) cÃ³ sá»‘ háº¡ng Ä‘áº§u \\(u_1 = 3\\) vÃ  cÃ´ng bá»™i \\(q = 2\\). GiÃ¡ trá»‹ cá»§a sá»‘ háº¡ng thá»© 8 lÃ :"
    },
    {
        "id":  "q_hsa_02",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "XÃ¡c suáº¥t",
        "subtopic":  "Biáº¿n cá»‘ Ä‘á»‘i",
        "skills":  [
                       "skill_probability",
                       "skill_reasoning",
                       "skill_data_analysis"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t há»™p chá»©a 6 quáº£ cáº§u Ä‘á» vÃ  4 quáº£ cáº§u xanh. Láº¥y ngáº«u nhiÃªn Ä‘á»“ng thá»i 3 quáº£ cáº§u. XÃ¡c suáº¥t Ä‘á»ƒ láº¥y Ä‘Æ°á»£c Ã­t nháº¥t 1 quáº£ cáº§u Ä‘á» lÃ :",
        "options":  [
                        "\\(\\frac{29}{30}\\)",
                        "\\(\\frac{1}{30}\\)",
                        "\\(\\frac{5}{6}\\)",
                        "\\(\\frac{4}{5}\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "XÃ¡c suáº¥t biáº¿n cá»‘ Ä‘á»‘i (cáº£ 3 quáº£ Ä‘á»u xanh): \\(P(\\bar{A}) = \\frac{C_4^3}{C_{10}^3} = \\frac{4}{120} = \\frac{1}{30}\\). Do Ä‘Ã³ xÃ¡c suáº¥t cáº§n tÃ¬m lÃ  \\(1 - 1/30 = 29/30\\).",
        "common_traps":  [
                             "Nháº§m giá»¯a biáº¿n cá»‘ Ä‘á»™c láº­p vÃ  biáº¿n cá»‘ xung kháº¯c",
                             "KhÃ´ng Ã¡p dá»¥ng Ä‘Ãºng cÃ´ng thá»©c Bayes",
                             "Äáº¿m láº·p trÆ°á»ng há»£p khi Ã¡p dá»¥ng quy táº¯c cá»™ng"
                         ],
        "prerequisites":  [
                              "kb_toan10_05"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "XÃ¡c suáº¥t",
                     "Tá»• há»£p",
                     "Biáº¿n cá»‘ Ä‘á»‘i"
                 ],
        "knowledge_id":  "kb_toan10_05",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t há»™p chá»©a 6 quáº£ cáº§u Ä‘á» vÃ  4 quáº£ cáº§u xanh. Láº¥y ngáº«u nhiÃªn Ä‘á»“ng thá»i 3 quáº£ cáº§u. XÃ¡c suáº¥t Ä‘á»ƒ láº¥y Ä‘Æ°á»£c Ã­t nháº¥t 1 quáº£ cáº§u Ä‘á» lÃ :"
    },
    {
        "id":  "q_hsa_03",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "PhÆ°Æ¡ng trÃ¬nh Logarit",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Nghiá»‡m cá»§a phÆ°Æ¡ng trÃ¬nh \\(\\log_2(x - 1) + \\log_2(x + 1) = 3\\) lÃ :",
        "options":  [
                        "\\(x = \\pm 3\\)",
                        "\\(x = 3\\)",
                        "\\(x = \\sqrt{10}\\)",
                        "\\(x = 4\\)"
                    ],
        "correct_answer":  1,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Äiá»u kiá»‡n \\(x \u003e 1\\). PhÆ°Æ¡ng trÃ¬nh trá»Ÿ thÃ nh \\(x^2 - 1 = 8 \\iff x^2 = 9 \\implies x = 3\\).",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan12_02"
                          ],
        "year":  2024,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Logarit",
                     "Äiá»u kiá»‡n nghiá»‡m"
                 ],
        "knowledge_id":  "kb_toan12_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Nghiá»‡m cá»§a phÆ°Æ¡ng trÃ¬nh \\(\\log_2(x - 1) + \\log_2(x + 1) = 3\\) lÃ :"
    },
    {
        "id":  "q_hsa_04",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "Thá»ƒ tÃ­ch khá»‘i chÃ³p",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "Cho hÃ¬nh chÃ³p \\(S.ABC\\) cÃ³ Ä‘Ã¡y \\(ABC\\) lÃ  tam giÃ¡c vuÃ´ng cÃ¢n táº¡i \\(B\\), cáº¡nh \\(AB = a\\). Cáº¡nh bÃªn \\(SA\\) vuÃ´ng gÃ³c vá»›i máº·t pháº³ng Ä‘Ã¡y vÃ  \\(SA = a\\sqrt{2}\\). Thá»ƒ tÃ­ch cá»§a khá»‘i chÃ³p \\(S.ABC\\) báº±ng:",
        "options":  [
                        "\\(\\frac{a^3\\sqrt{2}}{6}\\)",
                        "\\(\\frac{a^3\\sqrt{2}}{2}\\)",
                        "\\(\\frac{a^3\\sqrt{2}}{3}\\)",
                        "\\(\\frac{a^3}{6}\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Thá»ƒ tÃ­ch: \\(V = \\frac{1}{3} S_{ABC} \\cdot SA = \\frac{1}{3} \\cdot \\frac{a^2}{2} \\cdot a\\sqrt{2} = \\frac{a^3\\sqrt{2}}{6}\\).",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "HÃ¬nh chÃ³p",
                     "Thá»ƒ tÃ­ch",
                     "KhÃ´ng gian"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Cho hÃ¬nh chÃ³p \\(S.ABC\\) cÃ³ Ä‘Ã¡y \\(ABC\\) lÃ  tam giÃ¡c vuÃ´ng cÃ¢n táº¡i \\(B\\), cáº¡nh \\(AB = a\\). Cáº¡nh bÃªn \\(SA\\) vuÃ´ng gÃ³c vá»›i máº·t pháº³ng Ä‘Ã¡y vÃ  \\(SA = a\\sqrt{2}\\). Thá»ƒ tÃ­ch cá»§a khá»‘i chÃ³p \\(S.ABC\\) báº±ng:"
    },
    {
        "id":  "q_hsa_05",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Cáº¥p sá»‘ cá»™ng",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t cáº¥p sá»‘ cá»™ng \\((u_n)\\) cÃ³ sá»‘ háº¡ng Ä‘áº§u \\(u_1 = -2\\) vÃ  cÃ´ng sai \\(d = 5\\). Sá»‘ háº¡ng thá»© 20 cá»§a cáº¥p sá»‘ cá»™ng lÃ :",
        "options":  [
                        "93",
                        "98",
                        "103",
                        "88"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "CÃ´ng thá»©c sá»‘ háº¡ng tá»•ng quÃ¡t: \\(u_n = u_1 + (n-1)d\\). Vá»›i \\(n = 20\\): \\(u_{20} = -2 + 19 \\cdot 5 = -2 + 95 = 93\\).",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan11_02"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Cáº¥p sá»‘ cá»™ng",
                     "Äáº¡i sá»‘"
                 ],
        "knowledge_id":  "kb_toan11_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t cáº¥p sá»‘ cá»™ng \\((u_n)\\) cÃ³ sá»‘ háº¡ng Ä‘áº§u \\(u_1 = -2\\) vÃ  cÃ´ng sai \\(d = 5\\). Sá»‘ háº¡ng thá»© 20 cá»§a cáº¥p sá»‘ cá»™ng lÃ :"
    },
    {
        "id":  "q_hsa_06",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Cá»±c trá»‹ lÆ°á»£ng giÃ¡c",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "GiÃ¡ trá»‹ lá»›n nháº¥t cá»§a hÃ m sá»‘ lÆ°á»£ng giÃ¡c \\(y = 2\\sin x + 3\\cos x\\) lÃ :",
        "options":  [
                        "5",
                        "\\(\\sqrt{13}\\)",
                        "\\(\\sqrt{5}\\)",
                        "13"
                    ],
        "correct_answer":  1,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Theo báº¥t Ä‘áº³ng thá»©c Cauchy-Schwarz: \\((2\\sin x + 3\\cos x)^2 \\le (2^2 + 3^2)(\\sin^2 x + \\cos^2 x) = 13 \\cdot 1 = 13\\). Váº­y giÃ¡ trá»‹ lá»›n nháº¥t lÃ  \\(\\sqrt{13}\\).",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan11_01"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "LÆ°á»£ng giÃ¡c",
                     "Max Min"
                 ],
        "knowledge_id":  "kb_toan11_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "GiÃ¡ trá»‹ lá»›n nháº¥t cá»§a hÃ m sá»‘ lÆ°á»£ng giÃ¡c \\(y = 2\\sin x + 3\\cos x\\) lÃ :"
    },
    {
        "id":  "q_hsa_07",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "ToÃ¡n tÃ i chÃ­nh \u0026 LÃ£i kÃ©p",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "BÃ¡c An gá»­i tiáº¿t kiá»‡m 100 triá»‡u Ä‘á»“ng vÃ o ngÃ¢n hÃ ng vá»›i lÃ£i suáº¥t kÃ©p 6%/nÄƒm. Há»i sau 3 nÄƒm, sá»‘ tiá»n cáº£ gá»‘c vÃ  lÃ£i bÃ¡c An nháº­n Ä‘Æ°á»£c lÃ  bao nhiÃªu (lÃ m trÃ²n Ä‘áº¿n triá»‡u Ä‘á»“ng)?",
        "options":  [
                        "118 triá»‡u",
                        "119 triá»‡u",
                        "120 triá»‡u",
                        "121 triá»‡u"
                    ],
        "correct_answer":  1,
        "items":  null,
        "correct_value":  null,
        "explanation":  "CÃ´ng thá»©c lÃ£i kÃ©p: \\(A = P(1 + r)^n = 100(1 + 0,06)^3 = 100(1,191016) \\approx 119,1\\) triá»‡u Ä‘á»“ng.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan11_02"
                          ],
        "year":  2024,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "LÃ£i kÃ©p",
                     "ToÃ¡n tÃ i chÃ­nh"
                 ],
        "knowledge_id":  "kb_toan11_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "BÃ¡c An gá»­i tiáº¿t kiá»‡m 100 triá»‡u Ä‘á»“ng vÃ o ngÃ¢n hÃ ng vá»›i lÃ£i suáº¥t kÃ©p 6%/nÄƒm. Há»i sau 3 nÄƒm, sá»‘ tiá»n cáº£ gá»‘c vÃ  lÃ£i bÃ¡c An nháº­n Ä‘Æ°á»£c lÃ  bao nhiÃªu (lÃ m trÃ²n Ä‘áº¿n triá»‡u Ä‘á»“ng)?"
    },
    {
        "id":  "q_hsa_08",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "PhÆ°Æ¡ng trÃ¬nh lÆ°á»£ng giÃ¡c",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "Sá»‘ nghiá»‡m cá»§a phÆ°Æ¡ng trÃ¬nh lÆ°á»£ng giÃ¡c \\(\\cos 2x - 3\\cos x + 2 = 0\\) trÃªn Ä‘oáº¡n \\([0, 2\\pi]\\) lÃ :",
        "options":  [
                        "2",
                        "3",
                        "4",
                        "1"
                    ],
        "correct_answer":  2,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Biáº¿n Ä‘á»•i: \\(2\\cos^2 x - 1 - 3\\cos x + 2 = 0 \\iff 2\\cos^2 x - 3\\cos x + 1 = 0\\). Nghiá»‡m \\(\\cos x = 1\\) (ra nghiá»‡m \\(x = 0, x = 2\\pi\\)) hoáº·c \\(\\cos x = 1/2\\) (ra \\(x = \\pi/3, x = 5\\pi/3\\)). TrÃªn \\([0, 2\\pi]\\) cÃ³ Ä‘Ãºng 4 nghiá»‡m phÃ¢n biá»‡t.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan11_01"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "LÆ°á»£ng giÃ¡c",
                     "Sá»‘ nghiá»‡m"
                 ],
        "knowledge_id":  "kb_toan11_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Sá»‘ nghiá»‡m cá»§a phÆ°Æ¡ng trÃ¬nh lÆ°á»£ng giÃ¡c \\(\\cos 2x - 3\\cos x + 2 = 0\\) trÃªn Ä‘oáº¡n \\([0, 2\\pi]\\) lÃ :"
    },
    {
        "id":  "q_hsa_09",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "Thá»ƒ tÃ­ch lÄƒng trá»¥",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Thá»ƒ tÃ­ch cá»§a khá»‘i lÄƒng trá»¥ Ä‘á»©ng tam giÃ¡c Ä‘á»u cÃ³ táº¥t cáº£ cÃ¡c cáº¡nh Ä‘á»u báº±ng \\(a\\) lÃ :",
        "options":  [
                        "\\(\\frac{a^3\\sqrt{3}}{4}\\)",
                        "\\(\\frac{a^3\\sqrt{3}}{12}\\)",
                        "\\(\\frac{a^3}{4}\\)",
                        "\\(\\frac{a^3\\sqrt{3}}{2}\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Diá»‡n tÃ­ch Ä‘Ã¡y tam giÃ¡c Ä‘á»u: \\(S = \\frac{a^2\\sqrt{3}}{4}\\). Chiá»u cao lÄƒng trá»¥ báº±ng \\(a\\). Thá»ƒ tÃ­ch: \\(V = S \\cdot h = \\frac{a^3\\sqrt{3}}{4}\\).",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2024,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "LÄƒng trá»¥ Ä‘á»©ng",
                     "Thá»ƒ tÃ­ch"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Thá»ƒ tÃ­ch cá»§a khá»‘i lÄƒng trá»¥ Ä‘á»©ng tam giÃ¡c Ä‘á»u cÃ³ táº¥t cáº£ cÃ¡c cáº¡nh Ä‘á»u báº±ng \\(a\\) lÃ :"
    },
    {
        "id":  "q_hsa_10",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "XÃ¡c suáº¥t",
        "subtopic":  "Chá»‰nh há»£p \u0026 Tá»• há»£p",
        "skills":  [
                       "skill_probability",
                       "skill_reasoning",
                       "skill_data_analysis"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Tá»« má»™t nhÃ³m gá»“m 10 há»c sinh, cÃ³ bao nhiÃªu cÃ¡ch báº§u chá»n má»™t ban cÃ¡n sá»± lá»›p gá»“m 1 lá»›p trÆ°á»Ÿng, 1 lá»›p phÃ³ há»c táº­p vÃ  1 lá»›p phÃ³ Ä‘á»i sá»‘ng (má»—i ngÆ°á»i giá»¯ Ä‘Ãºng 1 chá»©c vá»¥)?",
        "options":  [
                        "720",
                        "120",
                        "240",
                        "504"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Chá»n vÃ  xáº¿p chá»©c vá»¥ 3 ngÆ°á»i tá»« 10 ngÆ°á»i lÃ  chá»‰nh há»£p cháº­p 3 cá»§a 10: \\(A_{10}^3 = 10 \\cdot 9 \\cdot 8 = 720\\) cÃ¡ch.",
        "common_traps":  [
                             "Nháº§m giá»¯a biáº¿n cá»‘ Ä‘á»™c láº­p vÃ  biáº¿n cá»‘ xung kháº¯c",
                             "KhÃ´ng Ã¡p dá»¥ng Ä‘Ãºng cÃ´ng thá»©c Bayes",
                             "Äáº¿m láº·p trÆ°á»ng há»£p khi Ã¡p dá»¥ng quy táº¯c cá»™ng"
                         ],
        "prerequisites":  [
                              "kb_toan10_05"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Chá»‰nh há»£p",
                     "XÃ¡c suáº¥t"
                 ],
        "knowledge_id":  "kb_toan10_05",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Tá»« má»™t nhÃ³m gá»“m 10 há»c sinh, cÃ³ bao nhiÃªu cÃ¡ch báº§u chá»n má»™t ban cÃ¡n sá»± lá»›p gá»“m 1 lá»›p trÆ°á»Ÿng, 1 lá»›p phÃ³ há»c táº­p vÃ  1 lá»›p phÃ³ Ä‘á»i sá»‘ng (má»—i ngÆ°á»i giá»¯ Ä‘Ãºng 1 chá»©c vá»¥)?"
    },
    {
        "id":  "q_hsa_11",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Báº¥t phÆ°Æ¡ng trÃ¬nh mÅ©",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "Táº­p nghiá»‡m cá»§a báº¥t phÆ°Æ¡ng trÃ¬nh mÅ© \\(2^{2x} - 5 \\cdot 2^x + 4 \\le 0\\) lÃ  Ä‘oáº¡n \\([a, b]\\). GiÃ¡ trá»‹ cá»§a biá»ƒu thá»©c \\(P = b - a\\) báº±ng:",
        "options":  [
                        "1",
                        "2",
                        "3",
                        "4"
                    ],
        "correct_answer":  1,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Äáº·t \\(t = 2^x \u003e 0\\), báº¥t phÆ°Æ¡ng trÃ¬nh trá»Ÿ thÃ nh \\(t^2 - 5t + 4 \\le 0 \\iff 1 \\le t \\le 4\\). Suy ra \\(1 \\le 2^x \\le 4 \\iff 0 \\le x \\le 2\\). Váº­y Ä‘oáº¡n nghiá»‡m lÃ  \\([0, 2]\\), hiá»‡u \\(b - a = 2 - 0 = 2\\).",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan12_02"
                          ],
        "year":  2024,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "MÅ©",
                     "Báº¥t phÆ°Æ¡ng trÃ¬nh"
                 ],
        "knowledge_id":  "kb_toan12_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Táº­p nghiá»‡m cá»§a báº¥t phÆ°Æ¡ng trÃ¬nh mÅ© \\(2^{2x} - 5 \\cdot 2^x + 4 \\le 0\\) lÃ  Ä‘oáº¡n \\([a, b]\\). GiÃ¡ trá»‹ cá»§a biá»ƒu thá»©c \\(P = b - a\\) báº±ng:"
    },
    {
        "id":  "q_hsa_12",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "Khoáº£ng cÃ¡ch Ä‘iá»ƒm Ä‘áº¿n máº·t pháº³ng",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Trong khÃ´ng gian \\(Oxyz\\), khoáº£ng cÃ¡ch tá»« Ä‘iá»ƒm \\(M(1, 2, -3)\\) Ä‘áº¿n máº·t pháº³ng \\((P): 2x - 2y + z + 11 = 0\\) báº±ng:",
        "options":  [
                        "2",
                        "3",
                        "4",
                        "1"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Ãp dá»¥ng cÃ´ng thá»©c khoáº£ng cÃ¡ch: \\(d = \\frac{|2(1) - 2(2) + (-3) + 11|}{\\sqrt{2^2 + (-2)^2 + 1^2}} = \\frac{|2 - 4 - 3 + 11|}{\\sqrt{9}} = \\frac{6}{3} = 2\\).",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Oxyz",
                     "Khoáº£ng cÃ¡ch"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Trong khÃ´ng gian \\(Oxyz\\), khoáº£ng cÃ¡ch tá»« Ä‘iá»ƒm \\(M(1, 2, -3)\\) Ä‘áº¿n máº·t pháº³ng \\((P): 2x - 2y + z + 11 = 0\\) báº±ng:"
    },
    {
        "id":  "q_hsa_13",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "HÃ¬nh nÃ³n \u0026 TrÃ²n xoay",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "Má»™t ngÆ°á»i thá»£ kim hoÃ n cÃ³ má»™t táº¥m vÃ ng má»ng hÃ¬nh trÃ²n bÃ¡n kÃ­nh \\(R = 6\\text{ cm}\\). NgÆ°á»i Ä‘Ã³ cáº¯t bá» má»™t hÃ¬nh quáº¡t trÃ²n gÃ³c á»Ÿ tÃ¢m \\(120^\\circ\\) rá»“i uá»‘n pháº§n cÃ²n láº¡i thÃ nh má»™t chiáº¿c phá»…u hÃ¬nh nÃ³n. BÃ¡n kÃ­nh Ä‘Ã¡y \\(r\\) cá»§a chiáº¿c phá»…u Ä‘Ã³ báº±ng:",
        "options":  [
                        "4 cm",
                        "2 cm",
                        "3 cm",
                        "4,5 cm"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Äá»™ dÃ i cung trÃ²n cÃ²n láº¡i gÃ³c 240Â° (4Ï€/3 rad) lÃ  C = R Â· Î¸ = 6 Â· (4Ï€/3) = 8Ï€ cm.\u003cbr\u003eChu vi Ä‘Ã¡y hÃ¬nh nÃ³n lÃ  2Ï€r = 8Ï€ =\u003e r = 4 cm.",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "HÃ¬nh nÃ³n",
                     "Chu vi",
                     "Quáº¡t trÃ²n"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t ngÆ°á»i thá»£ kim hoÃ n cÃ³ má»™t táº¥m vÃ ng má»ng hÃ¬nh trÃ²n bÃ¡n kÃ­nh \\(R = 6\\text{ cm}\\). NgÆ°á»i Ä‘Ã³ cáº¯t bá» má»™t hÃ¬nh quáº¡t trÃ²n gÃ³c á»Ÿ tÃ¢m \\(120^\\circ\\) rá»“i uá»‘n pháº§n cÃ²n láº¡i thÃ nh má»™t chiáº¿c phá»…u hÃ¬nh nÃ³n. BÃ¡n kÃ­nh Ä‘Ã¡y \\(r\\) cá»§a chiáº¿c phá»…u Ä‘Ã³ báº±ng:"
    },
    {
        "id":  "q_hsa_14",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Thá»‘ng kÃª",
        "subtopic":  "Trung vá»‹ máº«u sá»‘ liá»‡u ghÃ©p nhÃ³m",
        "skills":  [
                       "skill_probability",
                       "skill_data_analysis"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Cho báº£ng sá»‘ liá»‡u ghÃ©p nhÃ³m vá» Ä‘iá»ƒm kiá»ƒm tra mÃ´n ToÃ¡n cá»§a 40 há»c sinh: nhÃ³m [5; 7) cÃ³ 8 há»c sinh, nhÃ³m [7; 8) cÃ³ 18 há»c sinh, nhÃ³m [8; 9) cÃ³ 10 há»c sinh, nhÃ³m [9; 10] cÃ³ 4 há»c sinh. Tá»© phÃ¢n vá»‹ thá»© hai (trung vá»‹) cá»§a máº«u sá»‘ liá»‡u ghÃ©p nhÃ³m thuá»™c nhÃ³m nÃ o?",
        "options":  [
                        "[7; 8)",
                        "[8; 9)",
                        "[5; 7)",
                        "[9; 10]"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Cá»¡ máº«u n = 40. Vá»‹ trÃ­ trung vá»‹ n/2 = 20. Táº§n sá»‘ tÃ­ch lÅ©y: nhÃ³m 1 lÃ  8; nhÃ³m 2 lÃ  8 + 18 = 26 â‰¥ 20. Do Ä‘Ã³ trung vá»‹ Me thuá»™c nhÃ³m [7; 8).",
        "common_traps":  [
                             "Báº¥t cáº©n trong biáº¿n Ä‘á»•i Ä‘áº¡i sá»‘ cÆ¡ báº£n",
                             "Bá» quÃªn Ä‘iá»u kiá»‡n rÃ ng buá»™c cá»§a bÃ i toÃ¡n"
                         ],
        "prerequisites":  [
                              "kb_toan12_05"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Thá»‘ng kÃª",
                     "GhÃ©p nhÃ³m",
                     "Trung vá»‹"
                 ],
        "knowledge_id":  "kb_toan12_05",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Cho báº£ng sá»‘ liá»‡u ghÃ©p nhÃ³m vá» Ä‘iá»ƒm kiá»ƒm tra mÃ´n ToÃ¡n cá»§a 40 há»c sinh: nhÃ³m [5; 7) cÃ³ 8 há»c sinh, nhÃ³m [7; 8) cÃ³ 18 há»c sinh, nhÃ³m [8; 9) cÃ³ 10 há»c sinh, nhÃ³m [9; 10] cÃ³ 4 há»c sinh. Tá»© phÃ¢n vá»‹ thá»© hai (trung vá»‹) cá»§a máº«u sá»‘ liá»‡u ghÃ©p nhÃ³m thuá»™c nhÃ³m nÃ o?"
    },
    {
        "id":  "q_hsa_15",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "TÃ­ch phÃ¢n tá»«ng pháº§n",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "Biáº¿t ráº±ng \\(\\int_0^1 (2x + 3)e^x dx = a \\cdot e + b\\) vá»›i \\(a, b\\) lÃ  cÃ¡c sá»‘ nguyÃªn. GiÃ¡ trá»‹ cá»§a \\(a + b\\) báº±ng:",
        "options":  [
                        "2",
                        "3",
                        "4",
                        "1"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "I = [(2x + 1)e^x]â‚€Â¹ = 3e - 1 =\u003e a = 3, b = -1 =\u003e a + b = 2.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_03"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "TÃ­ch phÃ¢n",
                     "Tá»«ng pháº§n"
                 ],
        "knowledge_id":  "kb_toan12_03",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Biáº¿t ráº±ng \\(\\int_0^1 (2x + 3)e^x dx = a \\cdot e + b\\) vá»›i \\(a, b\\) lÃ  cÃ¡c sá»‘ nguyÃªn. GiÃ¡ trá»‹ cá»§a \\(a + b\\) báº±ng:"
    },
    {
        "id":  "q_hsa_16",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Äá»“ thá»‹ hÃ m phÃ¢n thá»©c báº­c nháº¥t",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "Cho hÃ m sá»‘ \\(y = \\frac{ax + b}{cx + d}\\) cÃ³ Ä‘á»“ thá»‹ Ä‘i qua \\(A(0, -1)\\) vÃ  cÃ³ hai Ä‘Æ°á»ng tiá»‡m cáº­n \\(x = 1, y = 2\\). GiÃ¡ trá»‹ biá»ƒu thá»©c \\(T = a + b + c + d\\) khi chá»n \\(c = 1\\) lÃ :",
        "options":  [
                        "3",
                        "0",
                        "1",
                        "2"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Tiá»‡m cáº­n Ä‘á»©ng x = 1 =\u003e d = -1. Tiá»‡m cáº­n ngang y = 2 =\u003e a = 2. Qua (0, -1) =\u003e b/(-1) = -1 =\u003e b = 1. T = 2 + 1 + 1 - 1 = 3.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_01"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Tiá»‡m cáº­n",
                     "HÃ m phÃ¢n thá»©c"
                 ],
        "knowledge_id":  "kb_toan12_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Cho hÃ m sá»‘ \\(y = \\frac{ax + b}{cx + d}\\) cÃ³ Ä‘á»“ thá»‹ Ä‘i qua \\(A(0, -1)\\) vÃ  cÃ³ hai Ä‘Æ°á»ng tiá»‡m cáº­n \\(x = 1, y = 2\\). GiÃ¡ trá»‹ biá»ƒu thá»©c \\(T = a + b + c + d\\) khi chá»n \\(c = 1\\) lÃ :"
    },
    {
        "id":  "q_hsa_17",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "TÃ­ch phÃ¢n trong chuyá»ƒn Ä‘á»™ng",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t ngÆ°á»i cháº¡y bá»™ trÃªn má»™t Ä‘oáº¡n Ä‘Æ°á»ng tháº³ng vá»›i váº­n tá»‘c biáº¿n thiÃªn theo thá»i gian \\(v(t) = 6t - t^2\\) (m/s) trong khoáº£ng thá»i gian tá»« \\(t = 0\\) Ä‘áº¿n khi váº­n tá»‘c giáº£m vá» 0. QuÃ£ng Ä‘Æ°á»ng ngÆ°á»i Ä‘Ã³ cháº¡y Ä‘Æ°á»£c lÃ :",
        "options":  [
                        "36 m",
                        "18 m",
                        "24 m",
                        "54 m"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Váº­n tá»‘c giáº£m vá» 0 khi: 6t - tÂ² = 0 â‡” t = 6 giÃ¢y.\u003cbr\u003eQuÃ£ng Ä‘Æ°á»ng s = âˆ«â‚€â¶ (6t - tÂ²) dt = [3tÂ² - tÂ³/3]â‚€â¶ = 3(36) - 216/3 = 108 - 72 = 36 m.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_03"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Váº­n tá»‘c",
                     "QuÃ£ng Ä‘Æ°á»ng",
                     "TÃ­ch phÃ¢n"
                 ],
        "knowledge_id":  "kb_toan12_03",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t ngÆ°á»i cháº¡y bá»™ trÃªn má»™t Ä‘oáº¡n Ä‘Æ°á»ng tháº³ng vá»›i váº­n tá»‘c biáº¿n thiÃªn theo thá»i gian \\(v(t) = 6t - t^2\\) (m/s) trong khoáº£ng thá»i gian tá»« \\(t = 0\\) Ä‘áº¿n khi váº­n tá»‘c giáº£m vá» 0. QuÃ£ng Ä‘Æ°á»ng ngÆ°á»i Ä‘Ã³ cháº¡y Ä‘Æ°á»£c lÃ :"
    },
    {
        "id":  "q_hsa_18",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Báº¥t Ä‘áº³ng thá»©c AM-GM",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "TÃ¬m giÃ¡ trá»‹ nhá» nháº¥t cá»§a hÃ m sá»‘ \\(f(x) = x + \\frac{4}{x - 1}\\) trÃªn khoáº£ng \\((1; +\\infty)\\).",
        "options":  [
                        "5",
                        "4",
                        "3",
                        "6"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Biáº¿n Ä‘á»•i: f(x) = (x - 1) + 4/(x - 1) + 1.\u003cbr\u003eVÃ¬ x \u003e 1, Ã¡p dá»¥ng AM-GM cho 2 sá»‘ dÆ°Æ¡ng (x - 1) vÃ  4/(x - 1):\u003cbr\u003e(x - 1) + 4/(x - 1) â‰¥ 2âˆš[(x - 1) Â· 4/(x - 1)] = 2âˆš4 = 4.\u003cbr\u003eDo Ä‘Ã³ f(x) â‰¥ 4 + 1 = 5. Dáº¥u \u0027=\u0027 xáº£y ra khi (x - 1)Â² = 4 â‡” x - 1 = 2 â‡” x = 3.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_01"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "AM-GM",
                     "Min Max",
                     "Cá»±c trá»‹"
                 ],
        "knowledge_id":  "kb_toan12_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "TÃ¬m giÃ¡ trá»‹ nhá» nháº¥t cá»§a hÃ m sá»‘ \\(f(x) = x + \\frac{4}{x - 1}\\) trÃªn khoáº£ng \\((1; +\\infty)\\)."
    },
    {
        "id":  "q_hsa_19",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "Máº·t cáº§u tiáº¿p xÃºc máº·t pháº³ng tá»a Ä‘á»™",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Trong khÃ´ng gian Oxyz, phÆ°Æ¡ng trÃ¬nh máº·t cáº§u cÃ³ tÃ¢m \\(I(2, -1, 3)\\) vÃ  tiáº¿p xÃºc vá»›i máº·t pháº³ng \\((Oxy)\\) lÃ :",
        "options":  [
                        "\\((x-2)^2 + (y+1)^2 + (z-3)^2 = 9\\)",
                        "\\((x-2)^2 + (y+1)^2 + (z-3)^2 = 4\\)",
                        "\\((x-2)^2 + (y+1)^2 + (z-3)^2 = 1\\)",
                        "\\((x-2)^2 + (y+1)^2 + (z-3)^2 = 14\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Khoáº£ng cÃ¡ch tá»« tÃ¢m I(2, -1, 3) Ä‘áº¿n máº·t pháº³ng (Oxy): z = 0 lÃ  R = |z_I| = |3| = 3.\u003cbr\u003eBÃ¡n kÃ­nh R = 3 =\u003e RÂ² = 9.\u003cbr\u003ePhÆ°Æ¡ng trÃ¬nh máº·t cáº§u: (x-2)Â² + (y+1)Â² + (z-3)Â² = 9.",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Oxyz",
                     "Máº·t cáº§u",
                     "Tiáº¿p xÃºc"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Trong khÃ´ng gian Oxyz, phÆ°Æ¡ng trÃ¬nh máº·t cáº§u cÃ³ tÃ¢m \\(I(2, -1, 3)\\) vÃ  tiáº¿p xÃºc vá»›i máº·t pháº³ng \\((Oxy)\\) lÃ :"
    },
    {
        "id":  "q_hsa_20",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "XÃ¡c suáº¥t",
        "subtopic":  "XÃ¡c suáº¥t cá»• Ä‘iá»ƒn xÃºc xáº¯c",
        "skills":  [
                       "skill_probability",
                       "skill_reasoning",
                       "skill_data_analysis"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Gieo Ä‘á»“ng thá»i hai con xÃºc xáº¯c cÃ¢n Ä‘á»‘i Ä‘á»“ng cháº¥t. XÃ¡c suáº¥t Ä‘á»ƒ tá»•ng sá»‘ cháº¥m xuáº¥t hiá»‡n trÃªn hai máº·t báº±ng 8 lÃ :",
        "options":  [
                        "\\(\\frac{5}{36}\\)",
                        "\\(\\frac{1}{6}\\)",
                        "\\(\\frac{1}{9}\\)",
                        "\\(\\frac{7}{36}\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "KhÃ´ng gian máº«u: n(Î©) = 6 Ã— 6 = 36.\u003cbr\u003eCÃ¡c cáº·p cÃ³ tá»•ng báº±ng 8: (2,6), (3,5), (4,4), (5,3), (6,2) gá»“m 5 trÆ°á»ng há»£p.\u003cbr\u003eXÃ¡c suáº¥t: P = 5/36.",
        "common_traps":  [
                             "Nháº§m giá»¯a biáº¿n cá»‘ Ä‘á»™c láº­p vÃ  biáº¿n cá»‘ xung kháº¯c",
                             "KhÃ´ng Ã¡p dá»¥ng Ä‘Ãºng cÃ´ng thá»©c Bayes",
                             "Äáº¿m láº·p trÆ°á»ng há»£p khi Ã¡p dá»¥ng quy táº¯c cá»™ng"
                         ],
        "prerequisites":  [
                              "kb_toan10_05"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "XÃºc xáº¯c",
                     "KhÃ´ng gian máº«u"
                 ],
        "knowledge_id":  "kb_toan10_05",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Gieo Ä‘á»“ng thá»i hai con xÃºc xáº¯c cÃ¢n Ä‘á»‘i Ä‘á»“ng cháº¥t. XÃ¡c suáº¥t Ä‘á»ƒ tá»•ng sá»‘ cháº¥m xuáº¥t hiá»‡n trÃªn hai máº·t báº±ng 8 lÃ :"
    },
    {
        "id":  "q_hsa_21",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Kháº£o sÃ¡t tiá»‡m cáº­n Ä‘á»©ng",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Sá»‘ Ä‘Æ°á»ng tiá»‡m cáº­n Ä‘á»©ng cá»§a Ä‘á»“ thá»‹ hÃ m sá»‘ \\(y = \\frac{x - 2}{x^2 - 4}\\) lÃ :",
        "options":  [
                        "1",
                        "2",
                        "0",
                        "3"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Máº«u sá»‘ xÂ² - 4 = 0 â‡” x = 2 hoáº·c x = -2.\u003cbr\u003eTáº¡i x = 2: lim_{xâ†’2} (x - 2)/[(x-2)(x+2)] = lim 1/(x+2) = 1/4 (há»¯u háº¡n, khÃ´ng pháº£i tiá»‡m cáº­n Ä‘á»©ng).\u003cbr\u003eTáº¡i x = -2: lim_{xâ†’-2} 1/(x+2) = âˆž (lÃ  tiá»‡m cáº­n Ä‘á»©ng duy nháº¥t x = -2). Váº­y cÃ³ 1 Ä‘Æ°á»ng tiá»‡m cáº­n Ä‘á»©ng.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_01"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Tiá»‡m cáº­n Ä‘á»©ng",
                     "Khá»­ dáº¡ng vÃ´ Ä‘á»‹nh"
                 ],
        "knowledge_id":  "kb_toan12_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Sá»‘ Ä‘Æ°á»ng tiá»‡m cáº­n Ä‘á»©ng cá»§a Ä‘á»“ thá»‹ hÃ m sá»‘ \\(y = \\frac{x - 2}{x^2 - 4}\\) lÃ :"
    },
    {
        "id":  "q_hsa_22",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "Thá»ƒ tÃ­ch lÄƒng trá»¥ Ä‘á»©ng",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Cho hÃ¬nh lÄƒng trá»¥ Ä‘á»©ng \\(ABC.A\u0027B\u0027C\u0027\\) cÃ³ Ä‘Ã¡y \\(ABC\\) lÃ  tam giÃ¡c vuÃ´ng táº¡i \\(A\\), \\(AB = 3, AC = 4\\), chiá»u cao \\(AA\u0027 = 5\\). Thá»ƒ tÃ­ch khá»‘i lÄƒng trá»¥ Ä‘Ã³ báº±ng:",
        "options":  [
                        "30",
                        "60",
                        "20",
                        "15"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Diá»‡n tÃ­ch Ä‘Ã¡y tam giÃ¡c vuÃ´ng: S = (1/2) Â· 3 Â· 4 = 6.\u003cbr\u003eThá»ƒ tÃ­ch lÄƒng trá»¥: V = S Â· h = 6 Â· 5 = 30.",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "LÄƒng trá»¥",
                     "Thá»ƒ tÃ­ch",
                     "Tam giÃ¡c vuÃ´ng"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Cho hÃ¬nh lÄƒng trá»¥ Ä‘á»©ng \\(ABC.A\u0027B\u0027C\u0027\\) cÃ³ Ä‘Ã¡y \\(ABC\\) lÃ  tam giÃ¡c vuÃ´ng táº¡i \\(A\\), \\(AB = 3, AC = 4\\), chiá»u cao \\(AA\u0027 = 5\\). Thá»ƒ tÃ­ch khá»‘i lÄƒng trá»¥ Ä‘Ã³ báº±ng:"
    },
    {
        "id":  "q_hsa_tf_01",
        "type":  "true_false_group",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "XÃ¡c suáº¥t",
        "subtopic":  "XÃ¡c suáº¥t cá»• Ä‘iá»ƒn \u0026 Tá»• há»£p",
        "skills":  [
                       "skill_probability",
                       "skill_reasoning",
                       "skill_data_analysis"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  100,
        "question":  "Má»™t há»™p kÃ­n chá»©a 5 quáº£ cáº§u mÃ u Ä‘á» vÃ  4 quáº£ cáº§u mÃ u xanh cÃ³ cÃ¹ng kÃ­ch thÆ°á»›c. Láº¥y ngáº«u nhiÃªn Ä‘á»“ng thá»i 3 quáº£ cáº§u tá»« há»™p. XÃ©t tÃ­nh Ä‘Ãºng / sai cá»§a cÃ¡c kháº³ng Ä‘á»‹nh sau:",
        "options":  null,
        "correct_answer":  null,
        "items":  [
                      {
                          "label":  "a",
                          "text":  "Sá»‘ pháº§n tá»­ cá»§a khÃ´ng gian máº«u lÃ  \\(n(\\Omega) = C_9^3 = 84\\).",
                          "correct":  true
                      },
                      {
                          "label":  "b",
                          "text":  "XÃ¡c suáº¥t Ä‘á»ƒ láº¥y Ä‘Æ°á»£c 3 quáº£ cáº§u cÃ¹ng mÃ u Ä‘á» lÃ  \\(\\frac{5}{42}\\).",
                          "correct":  true
                      },
                      {
                          "label":  "c",
                          "text":  "Sá»‘ cÃ¡ch láº¥y Ä‘Æ°á»£c 3 quáº£ cáº§u cÃ³ cáº£ hai mÃ u lÃ  50 cÃ¡ch.",
                          "correct":  false
                      },
                      {
                          "label":  "d",
                          "text":  "XÃ¡c suáº¥t Ä‘á»ƒ trong 3 quáº£ cáº§u láº¥y ra cÃ³ Ä‘Ãºng 2 quáº£ mÃ u Ä‘á» lÃ  \\(\\frac{10}{21}\\).",
                          "correct":  true
                      }
                  ],
        "correct_value":  null,
        "explanation":  "a) ÄÃºng: \\(n(\\Omega) = C_9^3 = \\frac{9 \\cdot 8 \\cdot 7}{6} = 84\\).\u003cbr\u003eb) ÄÃºng: Sá»‘ cÃ¡ch chá»n 3 quáº£ Ä‘á» lÃ  \\(C_5^3 = 10\\). XÃ¡c suáº¥t \\(P = 10/84 = 5/42\\).\u003cbr\u003ec) Sai: Sá»‘ cÃ¡ch chá»n 3 quáº£ cÃ¹ng mÃ u lÃ  \\(C_5^3 + C_4^3 = 10 + 4 = 14\\). Do Ä‘Ã³ sá»‘ cÃ¡ch chá»n cÃ³ cáº£ 2 mÃ u lÃ  \\(84 - 14 = 70\\) cÃ¡ch (khÃ´ng pháº£i 50).\u003cbr\u003ed) ÄÃºng: Sá»‘ cÃ¡ch láº¥y 2 Ä‘á», 1 xanh lÃ  \\(C_5^2 \\cdot C_4^1 = 10 \\cdot 4 = 40\\). XÃ¡c suáº¥t \\(P = 40/84 = 10/21\\).",
        "common_traps":  [
                             "Nháº§m giá»¯a biáº¿n cá»‘ Ä‘á»™c láº­p vÃ  biáº¿n cá»‘ xung kháº¯c",
                             "KhÃ´ng Ã¡p dá»¥ng Ä‘Ãºng cÃ´ng thá»©c Bayes",
                             "Äáº¿m láº·p trÆ°á»ng há»£p khi Ã¡p dá»¥ng quy táº¯c cá»™ng"
                         ],
        "prerequisites":  [
                              "kb_toan10_05"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "ÄÃºng/Sai chÃ¹m",
                     "XÃ¡c suáº¥t",
                     "Tá»• há»£p"
                 ],
        "knowledge_id":  "kb_toan10_05",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t há»™p kÃ­n chá»©a 5 quáº£ cáº§u mÃ u Ä‘á» vÃ  4 quáº£ cáº§u mÃ u xanh cÃ³ cÃ¹ng kÃ­ch thÆ°á»›c. Láº¥y ngáº«u nhiÃªn Ä‘á»“ng thá»i 3 quáº£ cáº§u tá»« há»™p. XÃ©t tÃ­nh Ä‘Ãºng / sai cá»§a cÃ¡c kháº³ng Ä‘á»‹nh sau:"
    },
    {
        "id":  "q_hsa_sa_01",
        "type":  "short_answer",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Cá»±c trá»‹ trÃ¡i dáº¥u",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "CÃ³ bao nhiÃªu giÃ¡ trá»‹ nguyÃªn cá»§a tham sá»‘ \\(m\\) thuá»™c Ä‘oáº¡n \\([-5; 5]\\) Ä‘á»ƒ hÃ m sá»‘ \\(y = x^3 - 3mx^2 + 3(m^2 - 1)x\\) cÃ³ hai Ä‘iá»ƒm cá»±c trá»‹ náº±m vá» hai phÃ­a cá»§a trá»¥c tung?",
        "options":  null,
        "correct_answer":  null,
        "items":  null,
        "correct_value":  "1",
        "explanation":  "HÃ m sá»‘ cÃ³ hai cá»±c trá»‹ náº±m vá» hai phÃ­a trá»¥c tung khi vÃ  chá»‰ khi phÆ°Æ¡ng trÃ¬nh y\u0027 = 0 cÃ³ hai nghiá»‡m trÃ¡i dáº¥u: xâ‚ Â· xâ‚‚ \u003c 0.\u003cbr\u003ey\u0027 = 3xÂ² - 6mx + 3(mÂ² - 1) = 0 â‡” xÂ² - 2mx + (mÂ² - 1) = 0.\u003cbr\u003eHai nghiá»‡m trÃ¡i dáº¥u â‡” a Â· c \u003c 1 Â· (mÂ² - 1) \u003c 0 â‡” -1 \u003c m \u003c 1.\u003cbr\u003eVÃ¬ m nguyÃªn nÃªn m = 0 (Ä‘Ãºng 1 giÃ¡ trá»‹).",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan12_01"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Äiá»n Ä‘Ã¡p sá»‘",
                     "Cá»±c trá»‹",
                     "Tham sá»‘ m"
                 ],
        "knowledge_id":  "kb_toan12_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "CÃ³ bao nhiÃªu giÃ¡ trá»‹ nguyÃªn cá»§a tham sá»‘ \\(m\\) thuá»™c Ä‘oáº¡n \\([-5; 5]\\) Ä‘á»ƒ hÃ m sá»‘ \\(y = x^3 - 3mx^2 + 3(m^2 - 1)x\\) cÃ³ hai Ä‘iá»ƒm cá»±c trá»‹ náº±m vá» hai phÃ­a cá»§a trá»¥c tung?"
    },
    {
        "id":  "q_thpt_01",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Kháº£o sÃ¡t hÃ m sá»‘",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Sá»‘ Ä‘iá»ƒm cá»±c trá»‹ cá»§a hÃ m sá»‘ trÃ¹ng phÆ°Æ¡ng \\(f(x) = x^4 - 4x^2 + 3\\) lÃ :",
        "options":  [
                        "1",
                        "2",
                        "3",
                        "4"
                    ],
        "correct_answer":  2,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Äáº¡o hÃ m: \\(f\u0027(x) = 4x(x^2 - 2) = 0 \\iff x = 0, x = \\pm\\sqrt{2}\\). Äáº¡o hÃ m Ä‘á»•i dáº¥u 3 láº§n qua cÃ¡c nghiá»‡m Ä‘Æ¡n nÃªn hÃ m sá»‘ cÃ³ 3 Ä‘iá»ƒm cá»±c trá»‹.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_01"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Cá»±c trá»‹",
                     "HÃ m trÃ¹ng phÆ°Æ¡ng"
                 ],
        "knowledge_id":  "kb_toan12_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Sá»‘ Ä‘iá»ƒm cá»±c trá»‹ cá»§a hÃ m sá»‘ trÃ¹ng phÆ°Æ¡ng \\(f(x) = x^4 - 4x^2 + 3\\) lÃ :"
    },
    {
        "id":  "q_thpt_02",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Sá»‘ phá»©c",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Cho sá»‘ phá»©c \\(z\\) thá»a mÃ£n \\((1 + 2i)z = 3 - 4i\\). MÃ´Ä‘un cá»§a sá»‘ phá»©c \\(z\\) báº±ng:",
        "options":  [
                        "5",
                        "\\(\\sqrt{5}\\)",
                        "\\(\\sqrt{3}\\)",
                        "2"
                    ],
        "correct_answer":  1,
        "items":  null,
        "correct_value":  null,
        "explanation":  "\\(|z| = \\frac{|3 - 4i|}{|1 + 2i|} = \\frac{5}{\\sqrt{5}} = \\sqrt{5}\\).",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan12_02"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Sá»‘ phá»©c",
                     "MÃ´Ä‘un"
                 ],
        "knowledge_id":  "kb_toan12_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Cho sá»‘ phá»©c \\(z\\) thá»a mÃ£n \\((1 + 2i)z = 3 - 4i\\). MÃ´Ä‘un cá»§a sá»‘ phá»©c \\(z\\) báº±ng:"
    },
    {
        "id":  "q_thpt_03",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "Máº·t cáº§u Oxyz",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Trong khÃ´ng gian \\(Oxyz\\), cho máº·t cáº§u \\((S): (x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 25\\). Tá»a Ä‘á»™ tÃ¢m \\(I\\) vÃ  bÃ¡n kÃ­nh \\(R\\) cá»§a máº·t cáº§u \\((S)\\) lÃ :",
        "options":  [
                        "\\(I(1, -2, 3), R = 5\\)",
                        "\\(I(-1, 2, -3), R = 5\\)",
                        "\\(I(1, -2, 3), R = 25\\)",
                        "\\(I(-1, 2, -3), R = 25\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "PhÆ°Æ¡ng trÃ¬nh máº·t cáº§u chÃ­nh táº¯c: tÃ¢m \\(I(1, -2, 3)\\) vÃ  bÃ¡n kÃ­nh \\(R = \\sqrt{25} = 5\\).",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Oxyz",
                     "Máº·t cáº§u"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Trong khÃ´ng gian \\(Oxyz\\), cho máº·t cáº§u \\((S): (x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 25\\). Tá»a Ä‘á»™ tÃ¢m \\(I\\) vÃ  bÃ¡n kÃ­nh \\(R\\) cá»§a máº·t cáº§u \\((S)\\) lÃ :"
    },
    {
        "id":  "q_thpt_04",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "TÃ­ch phÃ¢n tá»«ng pháº§n",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Há» nguyÃªn hÃ m cá»§a hÃ m sá»‘ \\(f(x) = x \\cdot e^x\\) lÃ :",
        "options":  [
                        "\\((x - 1)e^x + C\\)",
                        "\\((x + 1)e^x + C\\)",
                        "\\(x e^x - e^x\\)",
                        "\\(\\frac{x^2}{2}e^x + C\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "TÃ­ch phÃ¢n tá»«ng pháº§n: \\(u = x, dv = e^x dx \\implies \\int x e^x dx = x e^x - e^x + C = (x - 1)e^x + C\\).",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_03"
                          ],
        "year":  2024,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "NguyÃªn hÃ m",
                     "Tá»«ng pháº§n"
                 ],
        "knowledge_id":  "kb_toan12_03",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Há» nguyÃªn hÃ m cá»§a hÃ m sá»‘ \\(f(x) = x \\cdot e^x\\) lÃ :"
    },
    {
        "id":  "q_thpt_05",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "ÄÆ°á»ng tiá»‡m cáº­n",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Tiá»‡m cáº­n Ä‘á»©ng vÃ  tiá»‡m cáº­n ngang cá»§a Ä‘á»“ thá»‹ hÃ m sá»‘ \\(y = \\frac{2x - 1}{x + 1}\\) láº§n lÆ°á»£t lÃ :",
        "options":  [
                        "\\(x = -1\\) vÃ  \\(y = 2\\)",
                        "\\(x = 1\\) vÃ  \\(y = 2\\)",
                        "\\(x = -1\\) vÃ  \\(y = -1\\)",
                        "\\(x = 2\\) vÃ  \\(y = -1\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Nghiá»‡m cá»§a máº«u sá»‘ lÃ  \\(x = -1\\) (tiá»‡m cáº­n Ä‘á»©ng). Báº­c tá»­ báº±ng báº­c máº«u, tá»‰ sá»‘ há»‡ sá»‘ lÃ  \\(2/1 = 2\\) nÃªn \\(y = 2\\) (tiá»‡m cáº­n ngang).",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_01"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Tiá»‡m cáº­n",
                     "HÃ m phÃ¢n thá»©c"
                 ],
        "knowledge_id":  "kb_toan12_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Tiá»‡m cáº­n Ä‘á»©ng vÃ  tiá»‡m cáº­n ngang cá»§a Ä‘á»“ thá»‹ hÃ m sá»‘ \\(y = \\frac{2x - 1}{x + 1}\\) láº§n lÆ°á»£t lÃ :"
    },
    {
        "id":  "q_thpt_06",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "á»¨ng dá»¥ng hÃ¬nh pháº³ng tÃ­ch phÃ¢n",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Diá»‡n tÃ­ch hÃ¬nh pháº³ng giá»›i háº¡n bá»Ÿi parabol \\(y = x^2\\) vÃ  Ä‘Æ°á»ng tháº³ng \\(y = 2x\\) lÃ :",
        "options":  [
                        "\\(\\frac{4}{3}\\)",
                        "\\(\\frac{2}{3}\\)",
                        "\\(\\frac{8}{3}\\)",
                        "2"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "PhÆ°Æ¡ng trÃ¬nh hoÃ nh Ä‘á»™ giao Ä‘iá»ƒm: \\(x^2 - 2x = 0 \\iff x = 0\\) hoáº·c \\(x = 2\\).\u003cbr\u003eDiá»‡n tÃ­ch: \\(S = \\int_0^2 (2x - x^2)dx = \\left[ x^2 - \\frac{x^3}{3} \\right]_0^2 = 4 - \\frac{8}{3} = \\frac{4}{3}\\).",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_03"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Diá»‡n tÃ­ch hÃ¬nh pháº³ng",
                     "TÃ­ch phÃ¢n"
                 ],
        "knowledge_id":  "kb_toan12_03",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Diá»‡n tÃ­ch hÃ¬nh pháº³ng giá»›i háº¡n bá»Ÿi parabol \\(y = x^2\\) vÃ  Ä‘Æ°á»ng tháº³ng \\(y = 2x\\) lÃ :"
    },
    {
        "id":  "q_thpt_07",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "Táº­p nghiá»‡m cá»§a báº¥t phÆ°Æ¡ng trÃ¬nh \\(\\log_{0,5}(2x - 3) \\ge -1\\) lÃ :",
        "options":  [
                        "\\((\\frac{3}{2}; \\frac{5}{2}]\\)",
                        "\\([\\frac{3}{2}; \\frac{5}{2}]\\)",
                        "\\((\\frac{3}{2}; +\\infty)\\)",
                        "\\((-\\infty; \\frac{5}{2}]\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Äiá»u kiá»‡n xÃ¡c Ä‘á»‹nh: \\(2x - 3 \u003e 0 \\iff x \u003e 3/2\\).\u003cbr\u003eVÃ¬ cÆ¡ sá»‘ \\(0,5 \u003c 1\\) nÃªn báº¥t phÆ°Æ¡ng trÃ¬nh Ä‘á»•i chiá»u: \\(2x - 3 \\le (0,5)^{-1} = 2 \\iff 2x \\le 5 \\iff x \\le 5/2\\). Káº¿t há»£p Ä‘iá»u kiá»‡n ta cÃ³ \\(x \\in (3/2; 5/2]\\).",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan12_02"
                          ],
        "year":  2024,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Báº¥t phÆ°Æ¡ng trÃ¬nh",
                     "Logarit"
                 ],
        "knowledge_id":  "kb_toan12_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Táº­p nghiá»‡m cá»§a báº¥t phÆ°Æ¡ng trÃ¬nh \\(\\log_{0,5}(2x - 3) \\ge -1\\) lÃ :"
    },
    {
        "id":  "q_thpt_08",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "ÄÆ°á»ng tháº³ng Oxyz",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Trong khÃ´ng gian \\(Oxyz\\), phÆ°Æ¡ng trÃ¬nh Ä‘Æ°á»ng tháº³ng \\(d\\) Ä‘i qua \\(A(1, 2, -1)\\) vÃ  vuÃ´ng gÃ³c vá»›i máº·t pháº³ng \\((P): 2x - y + 3z - 5 = 0\\) lÃ :",
        "options":  [
                        "\\(\\frac{x - 1}{2} = \\frac{y - 2}{-1} = \\frac{z + 1}{3}\\)",
                        "\\(\\frac{x + 1}{2} = \\frac{y + 2}{-1} = \\frac{z - 1}{3}\\)",
                        "\\(\\frac{x - 1}{2} = \\frac{y - 2}{1} = \\frac{z + 1}{3}\\)",
                        "\\(\\frac{x - 1}{1} = \\frac{y - 2}{2} = \\frac{z + 1}{-1}\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "ÄÆ°á»ng tháº³ng vuÃ´ng gÃ³c vá»›i máº·t pháº³ng \\((P)\\) nháº­n vectÆ¡ phÃ¡p tuyáº¿n \\(\\vec{n} = (2, -1, 3)\\) lÃ m vectÆ¡ chá»‰ phÆ°Æ¡ng. PhÆ°Æ¡ng trÃ¬nh chÃ­nh táº¯c Ä‘i qua \\(A(1, 2, -1)\\) lÃ  \\(\\frac{x - 1}{2} = \\frac{y - 2}{-1} = \\frac{z + 1}{3}\\).",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Oxyz",
                     "ÄÆ°á»ng tháº³ng"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Trong khÃ´ng gian \\(Oxyz\\), phÆ°Æ¡ng trÃ¬nh Ä‘Æ°á»ng tháº³ng \\(d\\) Ä‘i qua \\(A(1, 2, -1)\\) vÃ  vuÃ´ng gÃ³c vá»›i máº·t pháº³ng \\((P): 2x - y + 3z - 5 = 0\\) lÃ :"
    },
    {
        "id":  "q_thpt_09",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Cá»±c trá»‹ hÃ m sá»‘",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "Cho hÃ m sá»‘ \\(y = f(x)\\) cÃ³ Ä‘áº¡o hÃ m \\(f\u0027(x) = x(x-1)^2(x+3)\\). Sá»‘ Ä‘iá»ƒm cá»±c tiá»ƒu cá»§a hÃ m sá»‘ lÃ :",
        "options":  [
                        "1",
                        "2",
                        "3",
                        "0"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "f\u0027(x) = 0 cÃ³ cÃ¡c nghiá»‡m: x = -3 (nghiá»‡m Ä‘Æ¡n), x = 0 (nghiá»‡m Ä‘Æ¡n), x = 1 (nghiá»‡m kÃ©p).\u003cbr\u003eBáº£ng xÃ©t dáº¥u: x \u003c -3: f\u0027 \u003e 0; -3 \u003c x \u003c 0: f\u0027 \u003c 0; 0 \u003c x \u003c 1: f\u0027 \u003e 0; x \u003e 1: f\u0027 \u003e 0.\u003cbr\u003eÄáº¡o hÃ m Ä‘á»•i dáº¥u tá»« Ã¢m sang dÆ°Æ¡ng táº¡i x = 0 duy nháº¥t =\u003e cÃ³ Ä‘Ãºng 1 Ä‘iá»ƒm cá»±c tiá»ƒu.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_01"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Cá»±c trá»‹",
                     "Cá»±c tiá»ƒu",
                     "Äáº¡o hÃ m"
                 ],
        "knowledge_id":  "kb_toan12_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Cho hÃ m sá»‘ \\(y = f(x)\\) cÃ³ Ä‘áº¡o hÃ m \\(f\u0027(x) = x(x-1)^2(x+3)\\). Sá»‘ Ä‘iá»ƒm cá»±c tiá»ƒu cá»§a hÃ m sá»‘ lÃ :"
    },
    {
        "id":  "q_thpt_10",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "GTLN GTNN trÃªn Ä‘oáº¡n",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "GiÃ¡ trá»‹ lá»›n nháº¥t cá»§a hÃ m sá»‘ \\(f(x) = x^3 - 3x + 2\\) trÃªn Ä‘oáº¡n \\([-2; 2]\\) báº±ng:",
        "options":  [
                        "4",
                        "2",
                        "0",
                        "6"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "f\u0027(x) = 3xÂ² - 3 = 0 â‡” x = Â±1.\u003cbr\u003eTÃ­nh giÃ¡ trá»‹ táº¡i cÃ¡c Ä‘iá»ƒm vÃ  2 Ä‘áº§u mÃºt:\u003cbr\u003ef(-2) = -8 + 6 + 2 = 0.\u003cbr\u003ef(-1) = -1 + 3 + 2 = 4.\u003cbr\u003ef(1) = 1 - 3 + 2 = 0.\u003cbr\u003ef(2) = 8 - 6 + 2 = 4.\u003cbr\u003eGiÃ¡ trá»‹ lá»›n nháº¥t lÃ  4.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_01"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Min Max",
                     "Kháº£o sÃ¡t hÃ m sá»‘"
                 ],
        "knowledge_id":  "kb_toan12_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "GiÃ¡ trá»‹ lá»›n nháº¥t cá»§a hÃ m sá»‘ \\(f(x) = x^3 - 3x + 2\\) trÃªn Ä‘oáº¡n \\([-2; 2]\\) báº±ng:"
    },
    {
        "id":  "q_thpt_11",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Táº­p xÃ¡c Ä‘á»‹nh hÃ m lÅ©y thá»«a",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "TÃ¬m táº­p xÃ¡c Ä‘á»‹nh cá»§a hÃ m sá»‘ \\(y = (x^2 - 4x + 3)^{-3}\\).",
        "options":  [
                        "\\(\\mathbb{R} \\setminus \\{1; 3\\}\\)",
                        "\\((1; 3)\\)",
                        "\\((-\\infty; 1) \\cup (3; +\\infty)\\)",
                        "\\([1; 3]\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "VÃ¬ sá»‘ mÅ© lÃ  sá»‘ nguyÃªn Ã¢m (-3), Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh lÃ  cÆ¡ sá»‘ khÃ¡c 0:\u003cbr\u003exÂ² - 4x + 3 â‰  0 â‡” x â‰  1 vÃ  x â‰  3. Táº­p xÃ¡c Ä‘á»‹nh: D = â„ \\ {1; 3}.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan12_02"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "LÅ©y thá»«a",
                     "Táº­p xÃ¡c Ä‘á»‹nh"
                 ],
        "knowledge_id":  "kb_toan12_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "TÃ¬m táº­p xÃ¡c Ä‘á»‹nh cá»§a hÃ m sá»‘ \\(y = (x^2 - 4x + 3)^{-3}\\)."
    },
    {
        "id":  "q_thpt_12",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "TÃ­nh cháº¥t tÃ­ch phÃ¢n",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Biáº¿t \\(\\int_0^1 f(x) dx = 3\\) vÃ  \\(\\int_0^1 g(x) dx = -2\\). GiÃ¡ trá»‹ cá»§a \\(\\int_0^1 [2f(x) - 3g(x)] dx\\) báº±ng:",
        "options":  [
                        "12",
                        "0",
                        "6",
                        "10"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Theo tÃ­nh cháº¥t tuyáº¿n tÃ­nh cá»§a tÃ­ch phÃ¢n: I = 2(3) - 3(-2) = 6 + 6 = 12.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_03"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "TÃ­ch phÃ¢n",
                     "Tuyáº¿n tÃ­nh"
                 ],
        "knowledge_id":  "kb_toan12_03",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Biáº¿t \\(\\int_0^1 f(x) dx = 3\\) vÃ  \\(\\int_0^1 g(x) dx = -2\\). GiÃ¡ trá»‹ cá»§a \\(\\int_0^1 [2f(x) - 3g(x)] dx\\) báº±ng:"
    },
    {
        "id":  "q_thpt_13",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "VectÆ¡ phÃ¡p tuyáº¿n máº·t pháº³ng",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Trong khÃ´ng gian Oxyz, cho máº·t pháº³ng \\((P): x - 2y + 2z - 6 = 0\\). VectÆ¡ nÃ o dÆ°á»›i Ä‘Ã¢y lÃ  má»™t vectÆ¡ phÃ¡p tuyáº¿n cá»§a (P)?",
        "options":  [
                        "\\(\\vec{n} = (1, -2, 2)\\)",
                        "\\(\\vec{n} = (1, 2, 2)\\)",
                        "\\(\\vec{n} = (1, -2, -6)\\)",
                        "\\(\\vec{n} = (2, -4, 2)\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "CÃ¡c há»‡ sá»‘ trÆ°á»›c x, y, z trong phÆ°Æ¡ng trÃ¬nh máº·t pháº³ng lÃ  tá»a Ä‘á»™ cá»§a vectÆ¡ phÃ¡p tuyáº¿n: n = (1, -2, 2).",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Oxyz",
                     "Máº·t pháº³ng",
                     "PhÃ¡p tuyáº¿n"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Trong khÃ´ng gian Oxyz, cho máº·t pháº³ng \\((P): x - 2y + 2z - 6 = 0\\). VectÆ¡ nÃ o dÆ°á»›i Ä‘Ã¢y lÃ  má»™t vectÆ¡ phÃ¡p tuyáº¿n cá»§a (P)?"
    },
    {
        "id":  "q_thpt_14",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "Diá»‡n tÃ­ch xung quanh hÃ¬nh nÃ³n",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Cho hÃ¬nh nÃ³n cÃ³ bÃ¡n kÃ­nh Ä‘Ã¡y \\(r = 3\\) vÃ  chiá»u cao \\(h = 4\\). Diá»‡n tÃ­ch xung quanh cá»§a hÃ¬nh nÃ³n Ä‘Ã£ cho báº±ng:",
        "options":  [
                        "\\(15\\pi\\)",
                        "\\(12\\pi\\)",
                        "\\(20\\pi\\)",
                        "\\(24\\pi\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Äá»™ dÃ i Ä‘Æ°á»ng sinh: l = âˆš(rÂ² + hÂ²) = âˆš(3Â² + 4Â²) = 5.\u003cbr\u003eDiá»‡n tÃ­ch xung quanh: S_xq = Ï€ r l = Ï€ Â· 3 Â· 5 = 15Ï€.",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "HÃ¬nh nÃ³n",
                     "ÄÆ°á»ng sinh",
                     "Diá»‡n tÃ­ch"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Cho hÃ¬nh nÃ³n cÃ³ bÃ¡n kÃ­nh Ä‘Ã¡y \\(r = 3\\) vÃ  chiá»u cao \\(h = 4\\). Diá»‡n tÃ­ch xung quanh cá»§a hÃ¬nh nÃ³n Ä‘Ã£ cho báº±ng:"
    },
    {
        "id":  "q_thpt_15",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "XÃ¡c suáº¥t",
        "subtopic":  "Quy táº¯c Ä‘áº¿m \u0026 Chá»‰nh há»£p",
        "skills":  [
                       "skill_probability",
                       "skill_reasoning",
                       "skill_data_analysis"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "CÃ³ bao nhiÃªu sá»‘ tá»± nhiÃªn cÃ³ 3 chá»¯ sá»‘ Ä‘Ã´i má»™t khÃ¡c nhau Ä‘Æ°á»£c láº­p tá»« cÃ¡c chá»¯ sá»‘ \\(\\{1, 2, 3, 4, 5\\}\\)?",
        "options":  [
                        "60",
                        "125",
                        "10",
                        "20"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Sá»‘ cÃ¡c sá»‘ tá»± nhiÃªn cÃ³ 3 chá»¯ sá»‘ phÃ¢n biá»‡t chá»n tá»« 5 chá»¯ sá»‘ lÃ  chá»‰nh há»£p cháº­p 3 cá»§a 5: Aâ‚…Â³ = 5 Â· 4 Â· 3 = 60.",
        "common_traps":  [
                             "Nháº§m giá»¯a biáº¿n cá»‘ Ä‘á»™c láº­p vÃ  biáº¿n cá»‘ xung kháº¯c",
                             "KhÃ´ng Ã¡p dá»¥ng Ä‘Ãºng cÃ´ng thá»©c Bayes",
                             "Äáº¿m láº·p trÆ°á»ng há»£p khi Ã¡p dá»¥ng quy táº¯c cá»™ng"
                         ],
        "prerequisites":  [
                              "kb_toan10_05"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Äáº¿m",
                     "Chá»‰nh há»£p"
                 ],
        "knowledge_id":  "kb_toan10_05",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "CÃ³ bao nhiÃªu sá»‘ tá»± nhiÃªn cÃ³ 3 chá»¯ sá»‘ Ä‘Ã´i má»™t khÃ¡c nhau Ä‘Æ°á»£c láº­p tá»« cÃ¡c chá»¯ sá»‘ \\(\\{1, 2, 3, 4, 5\\}\\)?"
    },
    {
        "id":  "q_thpt_tf_01",
        "type":  "true_false_group",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "Máº·t cáº§u vÃ  Máº·t pháº³ng Oxyz",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  130,
        "question":  "Trong khÃ´ng gian vá»›i há»‡ tá»a Ä‘á»™ \\(Oxyz\\), cho máº·t cáº§u \\((S): (x-1)^2 + (y+2)^2 + (z-3)^2 = 25\\) vÃ  máº·t pháº³ng \\((P): 2x - 2y + z + 5 = 0\\). XÃ©t tÃ­nh Ä‘Ãºng / sai cá»§a cÃ¡c kháº³ng Ä‘á»‹nh sau:",
        "options":  null,
        "correct_answer":  null,
        "items":  [
                      {
                          "label":  "a",
                          "text":  "Máº·t cáº§u (S) cÃ³ tá»a Ä‘á»™ tÃ¢m lÃ  \\(I(1; -2; 3)\\) vÃ  bÃ¡n kÃ­nh \\(R = 5\\).",
                          "correct":  true
                      },
                      {
                          "label":  "b",
                          "text":  "Khoáº£ng cÃ¡ch tá»« tÃ¢m I Ä‘áº¿n máº·t pháº³ng (P) báº±ng 4.",
                          "correct":  false
                      },
                      {
                          "label":  "c",
                          "text":  "Máº·t pháº³ng (P) cáº¯t máº·t cáº§u (S) theo giao tuyáº¿n lÃ  má»™t Ä‘Æ°á»ng trÃ²n.",
                          "correct":  true
                      },
                      {
                          "label":  "d",
                          "text":  "BÃ¡n kÃ­nh cá»§a Ä‘Æ°á»ng trÃ²n giao tuyáº¿n báº±ng \\(r = \\frac{\\sqrt{29}}{3}\\).",
                          "correct":  true
                      }
                  ],
        "correct_value":  null,
        "explanation":  "a) ÄÃºng: PhÆ°Æ¡ng trÃ¬nh chÃ­nh táº¯c cho tÃ¢m \\(I(1; -2; 3)\\) vÃ  bÃ¡n kÃ­nh \\(R = \\sqrt{25} = 5\\).\u003cbr\u003eb) Sai: Khoáº£ng cÃ¡ch \\(d(I, P) = \\frac{|2(1) - 2(-2) + 3 + 5|}{\\sqrt{2^2 + (-2)^2 + 1^2}} = \\frac{|2 + 4 + 3 + 5|}{3} = \\frac{14}{3} \\approx 4,67 \\neq 4\\).\u003cbr\u003ec) ÄÃºng: VÃ¬ \\(d = \\frac{14}{3} \u003c R = 5\\) nÃªn máº·t pháº³ng \\((P)\\) cáº¯t máº·t cáº§u \\((S)\\) theo giao tuyáº¿n lÃ  má»™t Ä‘Æ°á»ng trÃ²n.\u003cbr\u003ed) ÄÃºng: BÃ¡n kÃ­nh Ä‘Æ°á»ng trÃ²n giao tuyáº¿n: \\(r = \\sqrt{R^2 - d^2} = \\sqrt{25 - (14/3)^2} = \\sqrt{25 - \\frac{196}{9}} = \\sqrt{\\frac{29}{9}} = \\frac{\\sqrt{29}}{3}\\).",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi Tham kháº£o THPT 2025 Bá»™ GD\u0026ÄT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "ÄÃºng/Sai chÃ¹m",
                     "HÃ¬nh há»c Oxyz",
                     "Máº·t cáº§u"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Trong khÃ´ng gian vá»›i há»‡ tá»a Ä‘á»™ \\(Oxyz\\), cho máº·t cáº§u \\((S): (x-1)^2 + (y+2)^2 + (z-3)^2 = 25\\) vÃ  máº·t pháº³ng \\((P): 2x - 2y + z + 5 = 0\\). XÃ©t tÃ­nh Ä‘Ãºng / sai cá»§a cÃ¡c kháº³ng Ä‘á»‹nh sau:"
    },
    {
        "id":  "q_thpt_sa_01",
        "type":  "short_answer",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "TÃ­ch phÃ¢n hÃ m phÃ¢n thá»©c há»¯u tá»‰",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Biáº¿t tÃ­ch phÃ¢n \\(\\int_1^2 \\frac{2x + 1}{x^2 + x} dx = a \\ln 2 + b \\ln 3\\) vá»›i \\(a, b\\) lÃ  cÃ¡c sá»‘ nguyÃªn. TÃ­nh giÃ¡ trá»‹ biá»ƒu thá»©c \\(P = a + 2b\\).",
        "options":  null,
        "correct_answer":  null,
        "items":  null,
        "correct_value":  "2",
        "explanation":  "TÃ¡ch phÃ¢n thá»©c: \\(\\frac{2x+1}{x(x+1)} = \\frac{1}{x} + \\frac{1}{x+1}\\).\u003cbr\u003eTÃ­ch phÃ¢n \\(I = [\\ln|x| + \\ln|x+1|]_1^2 = (\\ln 2 + \\ln 3) - (\\ln 1 + \\ln 2) = \\ln 3 = 0 \\ln 2 + 1 \\ln 3\\).\u003cbr\u003eSuy ra \\(a = 0, b = 1 \\implies P = a + 2b = 0 + 2(1) = 2\\).",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_03"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Äiá»n Ä‘Ã¡p sá»‘",
                     "TÃ­ch phÃ¢n"
                 ],
        "knowledge_id":  "kb_toan12_03",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Biáº¿t tÃ­ch phÃ¢n \\(\\int_1^2 \\frac{2x + 1}{x^2 + x} dx = a \\ln 2 + b \\ln 3\\) vá»›i \\(a, b\\) lÃ  cÃ¡c sá»‘ nguyÃªn. TÃ­nh giÃ¡ trá»‹ biá»ƒu thá»©c \\(P = a + 2b\\)."
    },
    {
        "id":  "q_calc_01",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "Giáº£i tÃ­ch 1",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Khai triá»ƒn Maclaurin \u0026 Giá»›i háº¡n",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "TÃ­nh giá»›i háº¡n \\(L = \\lim_{x \\to 0} \\frac{e^x - 1 - x}{\\sin^2 x}\\).",
        "options":  [
                        "0",
                        "\\(\\frac{1}{2}\\)",
                        "1",
                        "\\(\\infty\\)"
                    ],
        "correct_answer":  1,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Sá»­ dá»¥ng khai triá»ƒn Maclaurin: \\(e^x - 1 - x \\sim \\frac{x^2}{2}\\) vÃ  \\(\\sin^2 x \\sim x^2\\). Giá»›i háº¡n lÃ  \\(1/2\\).",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_gt1_01"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "ToÃ¡n Cao cáº¥p ÄHBK HÃ  Ná»™i",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Maclaurin",
                     "VÃ´ cÃ¹ng bÃ©",
                     "Calculus"
                 ],
        "knowledge_id":  "kb_gt1_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "TÃ­nh giá»›i háº¡n \\(L = \\lim_{x \\to 0} \\frac{e^x - 1 - x}{\\sin^2 x}\\)."
    },
    {
        "id":  "q_calc_02",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "Giáº£i tÃ­ch 1",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "PhÆ°Æ¡ng trÃ¬nh vi phÃ¢n cáº¥p 1",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "KhÃ³",
        "difficulty_score":  0.88,
        "cognitive_level":  "M4",
        "estimated_time_seconds":  120,
        "question":  "Nghiá»‡m tá»•ng quÃ¡t cá»§a phÆ°Æ¡ng trÃ¬nh vi phÃ¢n tuyáº¿n tÃ­nh cáº¥p 1: \\(y\u0027 + \\frac{1}{x}y = 3x\\) (vá»›i \\(x \u003e 0\\)) lÃ :",
        "options":  [
                        "\\(y = x^2 + \\frac{C}{x}\\)",
                        "\\(y = x^3 + C\\)",
                        "\\(y = 3x^2 + \\frac{C}{x}\\)",
                        "\\(y = x^2 + C x\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Thá»«a sá»‘ tÃ­ch phÃ¢n \\(\\mu = x\\). TÃ­ch phÃ¢n 2 váº¿: \\(x y = x^3 + C \\implies y = x^2 + C/x\\).",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_gt1_05"
                          ],
        "year":  2024,
        "source_type":  "adapted",
        "source":  "ToÃ¡n Cao cáº¥p ÄHBK HÃ  Ná»™i",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "PT vi phÃ¢n",
                     "Thá»«a sá»‘ tÃ­ch phÃ¢n",
                     "Calculus"
                 ],
        "knowledge_id":  "kb_gt1_05",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Nghiá»‡m tá»•ng quÃ¡t cá»§a phÆ°Æ¡ng trÃ¬nh vi phÃ¢n tuyáº¿n tÃ­nh cáº¥p 1: \\(y\u0027 + \\frac{1}{x}y = 3x\\) (vá»›i \\(x \u003e 0\\)) lÃ :"
    },
    {
        "id":  "q_calc_03",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "Giáº£i tÃ­ch 1",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Chuá»—i Taylor - Maclaurin",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "Khai triá»ƒn Maclaurin Ä‘áº¿n báº­c 4 cá»§a hÃ m sá»‘ \\(f(x) = \\ln(1 + 2x)\\) lÃ :",
        "options":  [
                        "\\(2x - 2x^2 + \\frac{8}{3}x^3 - 4x^4 + O(x^5)\\)",
                        "\\(2x - 4x^2 + 8x^3 - 16x^4 + O(x^5)\\)",
                        "\\(x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\frac{x^4}{4} + O(x^5)\\)",
                        "\\(2x + 2x^2 + \\frac{8}{3}x^3 + 4x^4 + O(x^5)\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "\\(\\ln(1+u) = u - u^2/2 + u^3/3 - u^4/4\\). Thay \\(u = 2x\\) Ä‘Æ°á»£c \\(2x - 2x^2 + \\frac{8}{3}x^3 - 4x^4 + O(x^5)\\).",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_gt1_02"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "ToÃ¡n Cao cáº¥p ÄHBK HÃ  Ná»™i",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Chuá»—i Maclaurin",
                     "Logarit"
                 ],
        "knowledge_id":  "kb_gt1_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Khai triá»ƒn Maclaurin Ä‘áº¿n báº­c 4 cá»§a hÃ m sá»‘ \\(f(x) = \\ln(1 + 2x)\\) lÃ :"
    },
    {
        "id":  "q_calc_04",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "ToÃ¡n cao cáº¥p",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Äá»‹nh thá»©c ma tráº­n",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "TÃ­nh Ä‘á»‹nh thá»©c cá»§a ma tráº­n \\(A = \\begin{pmatrix} 1 \u0026 2 \u0026 3 \\\\ 0 \u0026 4 \u0026 5 \\\\ 0 \u0026 0 \u0026 6 \\end{pmatrix}\\).",
        "options":  [
                        "24",
                        "12",
                        "30",
                        "0"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Ma tráº­n tam giÃ¡c trÃªn, Ä‘á»‹nh thá»©c báº±ng tÃ­ch cÃ¡c pháº§n tá»­ trÃªn Ä‘Æ°á»ng chÃ©o chÃ­nh: \\(\\det(A) = 1 \\cdot 4 \\cdot 6 = 24\\).",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_dstt_02"
                          ],
        "year":  2024,
        "source_type":  "adapted",
        "source":  "Äáº¡i sá»‘ Tuyáº¿n tÃ­nh ÄHBK",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Äá»‹nh thá»©c",
                     "Ma tráº­n tam giÃ¡c",
                     "ÄSTT"
                 ],
        "knowledge_id":  "kb_dstt_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "TÃ­nh Ä‘á»‹nh thá»©c cá»§a ma tráº­n \\(A = \\begin{pmatrix} 1 \u0026 2 \u0026 3 \\\\ 0 \u0026 4 \u0026 5 \\\\ 0 \u0026 0 \u0026 6 \\end{pmatrix}\\)."
    },
    {
        "id":  "q_calc_05",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "Giáº£i tÃ­ch 1",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "TÃ­ch phÃ¢n suy rá»™ng loáº¡i 1",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "TÃ­ch phÃ¢n suy rá»™ng \\(I = \\int_1^{+\\infty} \\frac{1}{x^p} dx\\) há»™i tá»¥ khi vÃ  chá»‰ khi:",
        "options":  [
                        "\\(p \u003e 1\\)",
                        "\\(p \\ge 1\\)",
                        "\\(p \u003c 1\\)",
                        "\\(p \\le 1\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Äá»‹nh lÃ½ Riemann: tÃ­ch phÃ¢n suy rá»™ng loáº¡i 1 \\(\\int_1^{+\\infty} \\frac{dx}{x^p}\\) há»™i tá»¥ khi vÃ  chá»‰ khi \\(p \u003e 1\\).",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_gt1_03"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "ToÃ¡n Cao cáº¥p ÄHBK HÃ  Ná»™i",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "TÃ­ch phÃ¢n suy rá»™ng",
                     "TiÃªu chuáº©n Riemann"
                 ],
        "knowledge_id":  "kb_gt1_03",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "TÃ­ch phÃ¢n suy rá»™ng \\(I = \\int_1^{+\\infty} \\frac{1}{x^p} dx\\) há»™i tá»¥ khi vÃ  chá»‰ khi:"
    },
    {
        "id":  "q_calc_06",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "Giáº£i tÃ­ch 1",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "PhÆ°Æ¡ng trÃ¬nh vi phÃ¢n phÃ¢n ly",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Nghiá»‡m tá»•ng quÃ¡t cá»§a phÆ°Æ¡ng trÃ¬nh vi phÃ¢n phÃ¢n ly biáº¿n sá»‘ \\(y\u0027 = 2x y^2\\) (vá»›i \\(y \\ne 0\\)) lÃ :",
        "options":  [
                        "\\(y = -\\frac{1}{x^2 + C}\\)",
                        "\\(y = \\frac{1}{x^2 + C}\\)",
                        "\\(y = -\\frac{2}{x^2 + C}\\)",
                        "\\(y = e^{x^2 + C}\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "PhÃ¢n ly biáº¿n sá»‘: \\(\\frac{dy}{y^2} = 2x dx\\). Láº¥y nguyÃªn hÃ m hai váº¿: \\(-\\frac{1}{y} = x^2 + C \\implies y = -\\frac{1}{x^2 + C}\\).",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_gt1_05"
                          ],
        "year":  2024,
        "source_type":  "adapted",
        "source":  "ToÃ¡n Cao cáº¥p ÄHBK HÃ  Ná»™i",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Biáº¿n sá»‘ phÃ¢n ly",
                     "PT vi phÃ¢n"
                 ],
        "knowledge_id":  "kb_gt1_05",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Nghiá»‡m tá»•ng quÃ¡t cá»§a phÆ°Æ¡ng trÃ¬nh vi phÃ¢n phÃ¢n ly biáº¿n sá»‘ \\(y\u0027 = 2x y^2\\) (vá»›i \\(y \\ne 0\\)) lÃ :"
    },
    {
        "id":  "q_calc_07",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "ToÃ¡n cao cáº¥p",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Ma tráº­n nghá»‹ch Ä‘áº£o",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Cho ma tráº­n vuÃ´ng \\(A = \\begin{pmatrix} 1 \u0026 2 \\\\ 3 \u0026 4 \\end{pmatrix}\\). Ma tráº­n nghá»‹ch Ä‘áº£o \\(A^{-1}\\) lÃ :",
        "options":  [
                        "\\(\\begin{pmatrix} -2 \u0026 1 \\\\ 1,5 \u0026 -0,5 \\end{pmatrix}\\)",
                        "\\(\\begin{pmatrix} 4 \u0026 -2 \\\\ -3 \u0026 1 \\end{pmatrix}\\)",
                        "\\(\\begin{pmatrix} 2 \u0026 -1 \\\\ -1,5 \u0026 0,5 \\end{pmatrix}\\)",
                        "\\(\\begin{pmatrix} -4 \u0026 2 \\\\ 3 \u0026 -1 \\end{pmatrix}\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "det(A) = 1(4) - 2(3) = -2.\u003cbr\u003eAâ»Â¹ = (1/det) Â· [d, -b; -c, a] = (-1/2) Â· [4, -2; -3, 1] = [-2, 1; 1,5, -0,5].",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_dstt_01"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äáº¡i sá»‘ Tuyáº¿n tÃ­nh ÄHBK",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Ma tráº­n nghá»‹ch Ä‘áº£o",
                     "ÄSTT"
                 ],
        "knowledge_id":  "kb_dstt_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Cho ma tráº­n vuÃ´ng \\(A = \\begin{pmatrix} 1 \u0026 2 \\\\ 3 \u0026 4 \\end{pmatrix}\\). Ma tráº­n nghá»‹ch Ä‘áº£o \\(A^{-1}\\) lÃ :"
    },
    {
        "id":  "q_calc_08",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "ToÃ¡n cao cáº¥p",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Há»‡ phÆ°Æ¡ng trÃ¬nh tuyáº¿n tÃ­nh",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "Há»‡ phÆ°Æ¡ng trÃ¬nh tuyáº¿n tÃ­nh \\(\\begin{cases} x + 2y - z = 1 \\\\ 2x + 5y + z = 5 \\\\ 3x + 7y = 6 \\end{cases}\\) cÃ³ bao nhiÃªu nghiá»‡m?",
        "options":  [
                        "VÃ´ sá»‘ nghiá»‡m",
                        "VÃ´ nghiá»‡m",
                        "Nghiá»‡m duy nháº¥t",
                        "ÄÃºng 2 nghiá»‡m"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Cá»™ng phÆ°Æ¡ng trÃ¬nh 1 vÃ  phÆ°Æ¡ng trÃ¬nh 2: (x + 2y - z) + (2x + 5y + z) = 3x + 7y = 6 (chÃ­nh lÃ  phÆ°Æ¡ng trÃ¬nh 3).\u003cbr\u003eDo Ä‘Ã³ hÃ ng 3 phá»¥ thuá»™c tuyáº¿n tÃ­nh vÃ o 2 hÃ ng Ä‘áº§u, rank(A) = rank(A|B) = 2 \u003c 3 (sá»‘ áº©n). Há»‡ cÃ³ vÃ´ sá»‘ nghiá»‡m phá»¥ thuá»™c 1 tham sá»‘ tá»± do.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_dstt_03"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äáº¡i sá»‘ Tuyáº¿n tÃ­nh ÄHBK",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Há»‡ phÆ°Æ¡ng trÃ¬nh",
                     "Kronecker-Capelli",
                     "ÄSTT"
                 ],
        "knowledge_id":  "kb_dstt_03",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Há»‡ phÆ°Æ¡ng trÃ¬nh tuyáº¿n tÃ­nh \\(\\begin{cases} x + 2y - z = 1 \\\\ 2x + 5y + z = 5 \\\\ 3x + 7y = 6 \\end{cases}\\) cÃ³ bao nhiÃªu nghiá»‡m?"
    },
    {
        "id":  "q_calc_09",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "Giáº£i tÃ­ch 1",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "BÃ¡n kÃ­nh há»™i tá»¥ chuá»—i lÅ©y thá»«a",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "BÃ¡n kÃ­nh há»™i tá»¥ \\(R\\) cá»§a chuá»—i lÅ©y thá»«a \\(\\sum_{n=1}^{\\infty} \\frac{(x - 1)^n}{n \\cdot 2^n}\\) báº±ng:",
        "options":  [
                        "2",
                        "1",
                        "1/2",
                        "\\(\\infty\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Há»‡ sá»‘ a_n = 1 / (n Â· 2^n).\u003cbr\u003eTá»‰ sá»‘ a_n / a_{n+1} = [(n+1) Â· 2^{n+1}] / [n Â· 2^n] = 2(n+1)/n.\u003cbr\u003eGiá»›i háº¡n khi n â†’ âˆž lÃ  2. Váº­y bÃ¡n kÃ­nh há»™i tá»¥ R = 2.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_gt1_04"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "ToÃ¡n Cao Cáº¥p ÄHBK HÃ  Ná»™i",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Chuá»—i lÅ©y thá»«a",
                     "BÃ¡n kÃ­nh há»™i tá»¥"
                 ],
        "knowledge_id":  "kb_gt1_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "BÃ¡n kÃ­nh há»™i tá»¥ \\(R\\) cá»§a chuá»—i lÅ©y thá»«a \\(\\sum_{n=1}^{\\infty} \\frac{(x - 1)^n}{n \\cdot 2^n}\\) báº±ng:"
    },
    {
        "id":  "q_calc_10",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "Giáº£i tÃ­ch 1",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Äáº¡o hÃ m cáº¥p cao hÃ m lÆ°á»£ng giÃ¡c",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Äáº¡o hÃ m cáº¥p 100 cá»§a hÃ m sá»‘ \\(f(x) = \\sin x\\) lÃ :",
        "options":  [
                        "\\(\\sin x\\)",
                        "\\(\\cos x\\)",
                        "\\(-\\sin x\\)",
                        "\\(-\\cos x\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "CÃ´ng thá»©c Ä‘áº¡o hÃ m cáº¥p cao: (sin x)^{(n)} = sin(x + nÏ€/2).\u003cbr\u003eVá»›i n = 100 = 4 Ã— 25: (sin x)^{(100)} = sin(x + 50Ï€) = sin(x + 25 Â· 2Ï€) = sin x.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_gt1_02"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "ToÃ¡n Cao Cáº¥p ÄHBK HÃ  Ná»™i",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Äáº¡o hÃ m cáº¥p cao",
                     "LÆ°á»£ng giÃ¡c"
                 ],
        "knowledge_id":  "kb_gt1_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Äáº¡o hÃ m cáº¥p 100 cá»§a hÃ m sá»‘ \\(f(x) = \\sin x\\) lÃ :"
    },
    {
        "id":  "q_calc_tf_01",
        "type":  "true_false_group",
        "subject":  "Mathematics",
        "exam_type":  "Giáº£i tÃ­ch 1",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Chuá»—i sá»‘ Ä‘an dáº¥u \u0026 Äá»‹nh lÃ½ Leibniz",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  130,
        "question":  "Cho chuá»—i sá»‘ \\(S = \\sum_{n=1}^{\\infty} \\frac{(-1)^{n-1}}{n^p}\\) vá»›i \\(p\\) lÃ  tham sá»‘ thá»±c. XÃ©t tÃ­nh Ä‘Ãºng / sai cá»§a cÃ¡c má»‡nh Ä‘á» sau:",
        "options":  null,
        "correct_answer":  null,
        "items":  [
                      {
                          "label":  "a",
                          "text":  "Khi \\(p \u003e 1\\), chuá»—i sá»‘ há»™i tá»¥ tuyá»‡t Ä‘á»‘i.",
                          "correct":  true
                      },
                      {
                          "label":  "b",
                          "text":  "Khi \\(0 \u003c p \\le 1\\), chuá»—i sá»‘ phÃ¢n ká»³.",
                          "correct":  false
                      },
                      {
                          "label":  "c",
                          "text":  "Khi \\(p \\le 0\\), chuá»—i sá»‘ phÃ¢n ká»³ do sá»‘ háº¡ng tá»•ng quÃ¡t khÃ´ng tiáº¿n tá»›i 0.",
                          "correct":  true
                      },
                      {
                          "label":  "d",
                          "text":  "Táº¡i \\(p = 1\\), chuá»—i Ä‘an dáº¥u Ä‘iá»u hÃ²a há»™i tá»¥ vÃ  cÃ³ tá»•ng báº±ng \\(\\ln 2\\).",
                          "correct":  true
                      }
                  ],
        "correct_value":  null,
        "explanation":  "a) ÄÃºng: XÃ©t chuá»—i trá»‹ tuyá»‡t Ä‘á»‘i \\(\\sum \\frac{1}{n^p}\\) há»™i tá»¥ khi \\(p \u003e 1\\) (chuá»—i Riemann).\u003cbr\u003eb) Sai: Vá»›i \\(0 \u003c p \\le 1\\), chuá»—i Ä‘an dáº¥u thá»a mÃ£n Ä‘iá»u kiá»‡n Ä‘á»‹nh lÃ½ Leibniz (dÃ£y \\(u_n = 1/n^p\\) giáº£m dáº§n vá» 0) nÃªn há»™i tá»¥ (bÃ¡n há»™i tá»¥).\u003cbr\u003ec) ÄÃºng: Khi \\(p \\le 0\\), \\(\\lim_{n\\to\\infty} \\frac{1}{n^p} \\neq 0\\), vi pháº¡m Ä‘iá»u kiá»‡n cáº§n cá»§a chuá»—i há»™i tá»¥.\u003cbr\u003ed) ÄÃºng: ÄÃ¢y lÃ  khai triá»ƒn Maclaurin cá»§a \\(\\ln(1+x)\\) táº¡i \\(x = 1\\): \\(\\ln 2 = 1 - 1/2 + 1/3 - 1/4 + \\dots\\).",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_gt1_04"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "ToÃ¡n Cao Cáº¥p ÄHBK HÃ  Ná»™i",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "ÄÃºng/Sai chÃ¹m",
                     "Chuá»—i sá»‘",
                     "Äá»‹nh lÃ½ Leibniz"
                 ],
        "knowledge_id":  "kb_gt1_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Cho chuá»—i sá»‘ \\(S = \\sum_{n=1}^{\\infty} \\frac{(-1)^{n-1}}{n^p}\\) vá»›i \\(p\\) lÃ  tham sá»‘ thá»±c. XÃ©t tÃ­nh Ä‘Ãºng / sai cá»§a cÃ¡c má»‡nh Ä‘á» sau:"
    },
    {
        "id":  "q_calc_sa_01",
        "type":  "short_answer",
        "subject":  "Mathematics",
        "exam_type":  "Giáº£i tÃ­ch 1",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "TÃ­ch phÃ¢n suy rá»™ng loáº¡i 1",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "TÃ­nh giÃ¡ trá»‹ cá»§a tÃ­ch phÃ¢n suy rá»™ng loáº¡i 1: \\(I = \\int_0^{+\\infty} x e^{-x} dx\\).",
        "options":  null,
        "correct_answer":  null,
        "items":  null,
        "correct_value":  "1",
        "explanation":  "Ãp dá»¥ng phÆ°Æ¡ng phÃ¡p tÃ­ch phÃ¢n tá»«ng pháº§n:\u003cbr\u003eÄáº·t \\(u = x \\implies du = dx\\); \\(dv = e^{-x}dx \\implies v = -e^{-x}\\).\u003cbr\u003e\\(I = \\lim_{t \\to +\\infty} \\left[ -x e^{-x} \\right]_0^t + \\int_0^{+\\infty} e^{-x} dx\\).\u003cbr\u003eVÃ¬ \\(\\lim_{t \\to +\\infty} \\frac{-t}{e^t} = 0\\) (theo L\u0027HÃ´pital) vÃ  \\(\\int_0^{+\\infty} e^{-x} dx = [-e^{-x}]_0^{+\\infty} = 0 - (-1) = 1\\). Váº­y \\(I = 1\\).",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_gt1_03"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "ToÃ¡n Cao Cáº¥p ÄHBK HÃ  Ná»™i",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Äiá»n Ä‘Ã¡p sá»‘",
                     "TÃ­ch phÃ¢n suy rá»™ng"
                 ],
        "knowledge_id":  "kb_gt1_03",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "TÃ­nh giÃ¡ trá»‹ cá»§a tÃ­ch phÃ¢n suy rá»™ng loáº¡i 1: \\(I = \\int_0^{+\\infty} x e^{-x} dx\\)."
    },
    {
        "id":  "q_calc_step_01",
        "type":  "step_solution",
        "subject":  "Mathematics",
        "exam_type":  "Giáº£i tÃ­ch 1",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "PhÆ°Æ¡ng trÃ¬nh vi phÃ¢n cáº¥p 2 há»‡ sá»‘ háº±ng",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  150,
        "question":  "Giáº£i phÆ°Æ¡ng trÃ¬nh vi phÃ¢n thuáº§n nháº¥t cáº¥p 2 há»‡ sá»‘ háº±ng: \\(y\u0027\u0027 - 5y\u0027 + 6y = 0\\) thá»a mÃ£n cÃ¡c Ä‘iá»u kiá»‡n ban Ä‘áº§u \\(y(0) = 2\\) vÃ  \\(y\u0027(0) = 5\\). HÃ£y trÃ¬nh bÃ y cÃ¡c bÆ°á»›c giáº£i vÃ  viáº¿t nghiá»‡m tÆ°á»ng minh.",
        "options":  null,
        "correct_answer":  null,
        "items":  null,
        "correct_value":  null,
        "explanation":  "",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_gt1_05"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "ToÃ¡n Cao Cáº¥p ÄHBK HÃ  Ná»™i",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "PT vi phÃ¢n cáº¥p 2",
                     "PhÆ°Æ¡ng trÃ¬nh Ä‘áº·c trÆ°ng",
                     "Barem"
                 ],
        "knowledge_id":  "kb_gt1_05",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Giáº£i phÆ°Æ¡ng trÃ¬nh vi phÃ¢n thuáº§n nháº¥t cáº¥p 2 há»‡ sá»‘ háº±ng: \\(y\u0027\u0027 - 5y\u0027 + 6y = 0\\) thá»a mÃ£n cÃ¡c Ä‘iá»u kiá»‡n ban Ä‘áº§u \\(y(0) = 2\\) vÃ  \\(y\u0027(0) = 5\\). HÃ£y trÃ¬nh bÃ y cÃ¡c bÆ°á»›c giáº£i vÃ  viáº¿t nghiá»‡m tÆ°á»ng minh."
    },
    {
        "id":  "q_tsa_31",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "BÃ i toÃ¡n gáº¥p há»™p tá»‘i Æ°u thá»ƒ tÃ­ch",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "KhÃ³",
        "difficulty_score":  0.88,
        "cognitive_level":  "M4",
        "estimated_time_seconds":  120,
        "question":  "Má»™t xÆ°á»Ÿng cÆ¡ khÃ­ cáº§n dáº­p má»™t táº¥m tÃ´n hÃ¬nh chá»¯ nháº­t kÃ­ch thÆ°á»›c \\(40\\text{ cm} \\times 60\\text{ cm}\\) thÃ nh má»™t chiáº¿c há»™p khÃ´ng náº¯p báº±ng cÃ¡ch cáº¯t Ä‘i 4 hÃ¬nh vuÃ´ng báº±ng nhau cáº¡nh \\(x\\) á»Ÿ 4 gÃ³c rá»“i gáº­p cÃ¡c mÃ©p lÃªn. TÃ¬m \\(x\\) (theo cm) Ä‘á»ƒ dung tÃ­ch chiáº¿c há»™p lá»›n nháº¥t.",
        "options":  [
                        "\\(x = \\frac{50 - 10\\sqrt{7}}{3}\\text{ cm}\\)",
                        "\\(x = 10\\text{ cm}\\)",
                        "\\(x = 8\\text{ cm}\\)",
                        "\\(x = \\frac{50 + 10\\sqrt{7}}{3}\\text{ cm}\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "KÃ­ch thÆ°á»›c Ä‘Ã¡y: (60 - 2x) vÃ  (40 - 2x). Chiá»u cao: x. Äiá»u kiá»‡n 0 \u003c x \u003c 20.\u003cbr\u003eThá»ƒ tÃ­ch: V(x) = x(60 - 2x)(40 - 2x) = 4(xÂ³ - 50xÂ² + 600x).\u003cbr\u003eV\u0027(x) = 4(3xÂ² - 100x + 600) = 0. Nghiá»‡m x = (100 Â± âˆš[10000 - 7200])/6 = (100 Â± âˆš2800)/6 = (50 Â± 10âˆš7)/3.\u003cbr\u003eVÃ¬ x \u003c 20 nÃªn x = (50 - 10âˆš7)/3 â‰ˆ 7,85 cm.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_01"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Tá»‘i Æ°u hÃ³a",
                     "Äáº¡o hÃ m",
                     "Gáº¥p há»™p"
                 ],
        "knowledge_id":  "kb_toan12_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t xÆ°á»Ÿng cÆ¡ khÃ­ cáº§n dáº­p má»™t táº¥m tÃ´n hÃ¬nh chá»¯ nháº­t kÃ­ch thÆ°á»›c \\(40\\text{ cm} \\times 60\\text{ cm}\\) thÃ nh má»™t chiáº¿c há»™p khÃ´ng náº¯p báº±ng cÃ¡ch cáº¯t Ä‘i 4 hÃ¬nh vuÃ´ng báº±ng nhau cáº¡nh \\(x\\) á»Ÿ 4 gÃ³c rá»“i gáº­p cÃ¡c mÃ©p lÃªn. TÃ¬m \\(x\\) (theo cm) Ä‘á»ƒ dung tÃ­ch chiáº¿c há»™p lá»›n nháº¥t."
    },
    {
        "id":  "q_tsa_32",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Sá»‘ há»c Modulo \u0026 MÃ£ hÃ³a Caesar",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Äoáº¡n mÃ£ mÃ£ hÃ³a Caesar dá»‹ch chuyá»ƒn má»—i chá»¯ cÃ¡i tiáº¿ng Anh trong báº£ng chá»¯ cÃ¡i (A-Z) Ä‘i k vá»‹ trÃ­ theo modulo 26: \\(C = (P + k) \\pmod{26}\\). Náº¿u tá»« \u0027MATH\u0027 Ä‘Æ°á»£c mÃ£ hÃ³a thÃ nh \u0027PDWK\u0027, thÃ¬ tá»« \u0027LOGIC\u0027 Ä‘Æ°á»£c mÃ£ hÃ³a thÃ nh:",
        "options":  [
                        "ORJLF",
                        "OQJLE",
                        "PRKMG",
                        "NRJLF"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "\u0027M\u0027 (thá»© 12) -\u003e \u0027P\u0027 (thá»© 15) =\u003e k = +3.\u003cbr\u003e\u0027L\u0027 (+3) -\u003e \u0027O\u0027, \u0027O\u0027 (+3) -\u003e \u0027R\u0027, \u0027G\u0027 (+3) -\u003e \u0027J\u0027, \u0027I\u0027 (+3) -\u003e \u0027L\u0027, \u0027C\u0027 (+3) -\u003e \u0027F\u0027. Káº¿t quáº£: \u0027ORJLF\u0027.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan10_01"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "TÆ° duy Thuáº­t toÃ¡n TSA",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "MÃ£ hÃ³a",
                     "Modulo",
                     "Thuáº­t toÃ¡n"
                 ],
        "knowledge_id":  "kb_toan10_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Äoáº¡n mÃ£ mÃ£ hÃ³a Caesar dá»‹ch chuyá»ƒn má»—i chá»¯ cÃ¡i tiáº¿ng Anh trong báº£ng chá»¯ cÃ¡i (A-Z) Ä‘i k vá»‹ trÃ­ theo modulo 26: \\(C = (P + k) \\pmod{26}\\). Náº¿u tá»« \u0027MATH\u0027 Ä‘Æ°á»£c mÃ£ hÃ³a thÃ nh \u0027PDWK\u0027, thÃ¬ tá»« \u0027LOGIC\u0027 Ä‘Æ°á»£c mÃ£ hÃ³a thÃ nh:"
    },
    {
        "id":  "q_tsa_33",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "á»¨ng dá»¥ng Ä‘Æ°á»ng Hypebol kiáº¿n trÃºc",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t thÃ¡p lÃ m nguá»™i nhiá»‡t Ä‘iá»‡n cÃ³ thiáº¿t diá»‡n tháº³ng Ä‘á»©ng giá»›i háº¡n bá»Ÿi hai nhÃ¡nh cá»§a Ä‘Æ°á»ng hypebol \\(\\frac{x^2}{16} - \\frac{y^2}{64} = 1\\) (Ä‘Æ¡n vá»‹: mÃ©t, gá»‘c O táº¡i tÃ¢m Ä‘á»‘i xá»©ng). ÄÆ°á»ng kÃ­nh tháº¯t háº¹p nhá» nháº¥t cá»§a thÃ¡p báº±ng bao nhiÃªu?",
        "options":  [
                        "8 m",
                        "16 m",
                        "4 m",
                        "32 m"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Tháº¯t háº¹p nhá» nháº¥t táº¡i y = 0, khi Ä‘Ã³ xÂ² = 16 =\u003e x = Â±4. BÃ¡n kÃ­nh tháº¯t lÃ  4 m =\u003e ÄÆ°á»ng kÃ­nh tháº¯t háº¹p nhá» nháº¥t lÃ  2 Ã— 4 = 8 m.",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan10_03"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Hypebol",
                     "Kiáº¿n trÃºc",
                     "HÃ¬nh há»c tá»a Ä‘á»™"
                 ],
        "knowledge_id":  "kb_toan10_03",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t thÃ¡p lÃ m nguá»™i nhiá»‡t Ä‘iá»‡n cÃ³ thiáº¿t diá»‡n tháº³ng Ä‘á»©ng giá»›i háº¡n bá»Ÿi hai nhÃ¡nh cá»§a Ä‘Æ°á»ng hypebol \\(\\frac{x^2}{16} - \\frac{y^2}{64} = 1\\) (Ä‘Æ¡n vá»‹: mÃ©t, gá»‘c O táº¡i tÃ¢m Ä‘á»‘i xá»©ng). ÄÆ°á»ng kÃ­nh tháº¯t háº¹p nhá» nháº¥t cá»§a thÃ¡p báº±ng bao nhiÃªu?"
    },
    {
        "id":  "q_tsa_34",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Giáº£i há»‡ tuyáº¿n tÃ­nh máº¡ch Ä‘iá»‡n",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "Cho há»‡ 3 phÆ°Æ¡ng trÃ¬nh máº¡ng dÃ²ng Ä‘iá»‡n Kirchhoff: \\(\\begin{pmatrix} 2 \u0026 1 \u0026 0 \\\\ 1 \u0026 3 \u0026 1 \\\\ 0 \u0026 1 \u0026 2 \\end{pmatrix} \\begin{pmatrix} I_1 \\\\ I_2 \\\\ I_3 \\end{pmatrix} = \\begin{pmatrix} 5 \\\\ 10 \\\\ 7 \\end{pmatrix}\\). DÃ²ng Ä‘iá»‡n \\(I_2\\) cháº¡y qua nhÃ¡nh giá»¯a báº±ng:",
        "options":  [
                        "2 A",
                        "1 A",
                        "3 A",
                        "1,5 A"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "PhÆ°Æ¡ng trÃ¬nh 1: 2Iâ‚ + Iâ‚‚ = 5 =\u003e 2Iâ‚ = 5 - Iâ‚‚.\u003cbr\u003ePhÆ°Æ¡ng trÃ¬nh 3: Iâ‚‚ + 2Iâ‚ƒ = 7 =\u003e 2Iâ‚ƒ = 7 - Iâ‚‚.\u003cbr\u003eNhÃ¢n Ä‘Ã´i phÆ°Æ¡ng trÃ¬nh 2: 2Iâ‚ + 6Iâ‚‚ + 2Iâ‚ƒ = 20.\u003cbr\u003eThay vÃ o: (5 - Iâ‚‚) + 6Iâ‚‚ + (7 - Iâ‚‚) = 20 â‡” 4Iâ‚‚ + 12 = 20 â‡” 4Iâ‚‚ = 8 â‡” Iâ‚‚ = 2 A.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_dstt_02"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Máº¡ch Ä‘iá»‡n",
                     "Kirchhoff",
                     "Há»‡ tuyáº¿n tÃ­nh"
                 ],
        "knowledge_id":  "kb_dstt_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Cho há»‡ 3 phÆ°Æ¡ng trÃ¬nh máº¡ng dÃ²ng Ä‘iá»‡n Kirchhoff: \\(\\begin{pmatrix} 2 \u0026 1 \u0026 0 \\\\ 1 \u0026 3 \u0026 1 \\\\ 0 \u0026 1 \u0026 2 \\end{pmatrix} \\begin{pmatrix} I_1 \\\\ I_2 \\\\ I_3 \\end{pmatrix} = \\begin{pmatrix} 5 \\\\ 10 \\\\ 7 \\end{pmatrix}\\). DÃ²ng Ä‘iá»‡n \\(I_2\\) cháº¡y qua nhÃ¡nh giá»¯a báº±ng:"
    },
    {
        "id":  "q_tsa_35",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "Chuyá»ƒn Ä‘á»™ng trÃ²n Ä‘á»u",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t Ä‘Ä©a DVD quay vá»›i tá»‘c Ä‘á»™ gÃ³c khÃ´ng Ä‘á»•i \\(\\omega = 1200\\text{ vÃ²ng/phÃºt}\\). Tá»‘c Ä‘á»™ dÃ i cá»§a má»™t Ä‘iá»ƒm náº±m á»Ÿ mÃ©p Ä‘Ä©a (cÃ¡ch tÃ¢m 6 cm) xáº¥p xá»‰ báº±ng:",
        "options":  [
                        "7,54 m/s",
                        "15,08 m/s",
                        "4,52 m/s",
                        "1,20 m/s"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "1200 vÃ²ng/phÃºt = 1200 Ã— 2Ï€ / 60 = 40Ï€ rad/s.\u003cbr\u003eBÃ¡n kÃ­nh r = 0,06 m.\u003cbr\u003eTá»‘c Ä‘á»™ dÃ i: v = Ï‰ Â· r = 40Ï€ Ã— 0,06 = 2,4Ï€ â‰ˆ 7,54 m/s.",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan11_01"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "TÆ° duy Khoa há»c TSA",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Chuyá»ƒn Ä‘á»™ng trÃ²n",
                     "Váº­n tá»‘c gÃ³c",
                     "Váº­t lÃ½"
                 ],
        "knowledge_id":  "kb_toan11_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t Ä‘Ä©a DVD quay vá»›i tá»‘c Ä‘á»™ gÃ³c khÃ´ng Ä‘á»•i \\(\\omega = 1200\\text{ vÃ²ng/phÃºt}\\). Tá»‘c Ä‘á»™ dÃ i cá»§a má»™t Ä‘iá»ƒm náº±m á»Ÿ mÃ©p Ä‘Ä©a (cÃ¡ch tÃ¢m 6 cm) xáº¥p xá»‰ báº±ng:"
    },
    {
        "id":  "q_tsa_36",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "ToÃ¡n tÃ i chÃ­nh Quy táº¯c 72",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t ngÆ°á»i Ä‘áº§u tÆ° 500 triá»‡u Ä‘á»“ng vÃ o quá»¹ má»Ÿ vá»›i lÃ£i suáº¥t ká»³ vá»ng 10%/nÄƒm. Theo quy táº¯c 72 (Rule of 72), sau khoáº£ng bao nhiÃªu nÄƒm thÃ¬ sá»‘ vá»‘n Ä‘áº§u tÆ° ban Ä‘áº§u cá»§a ngÆ°á»i Ä‘Ã³ sáº½ tÄƒng gáº¥p Ä‘Ã´i?",
        "options":  [
                        "7,2 nÄƒm",
                        "10 nÄƒm",
                        "5 nÄƒm",
                        "14,4 nÄƒm"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Theo quy táº¯c tÃ i chÃ­nh 72: Thá»i gian nhÃ¢n Ä‘Ã´i sá»‘ vá»‘n xáº¥p xá»‰ t â‰ˆ 72 / r% = 72 / 10 = 7,2 nÄƒm.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan11_02"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "TÆ° duy Äá»‹nh lÆ°á»£ng TSA",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "TÃ i chÃ­nh",
                     "Quy táº¯c 72",
                     "LÃ£i kÃ©p"
                 ],
        "knowledge_id":  "kb_toan11_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t ngÆ°á»i Ä‘áº§u tÆ° 500 triá»‡u Ä‘á»“ng vÃ o quá»¹ má»Ÿ vá»›i lÃ£i suáº¥t ká»³ vá»ng 10%/nÄƒm. Theo quy táº¯c 72 (Rule of 72), sau khoáº£ng bao nhiÃªu nÄƒm thÃ¬ sá»‘ vá»‘n Ä‘áº§u tÆ° ban Ä‘áº§u cá»§a ngÆ°á»i Ä‘Ã³ sáº½ tÄƒng gáº¥p Ä‘Ã´i?"
    },
    {
        "id":  "q_tsa_37",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "MÃ´ hÃ¬nh tÄƒng trÆ°á»Ÿng dÃ¢n sá»‘",
        "skills":  [
                       "skill_modeling",
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "DÃ¢n sá»‘ cá»§a má»™t quá»‘c gia nÄƒm 2020 lÃ  100 triá»‡u ngÆ°á»i. Tá»‰ lá»‡ tÄƒng dÃ¢n sá»‘ hÃ ng nÄƒm á»•n Ä‘á»‹nh á»Ÿ má»©c 1,2%/nÄƒm. Há»i vÃ o nÄƒm nÃ o dÃ¢n sá»‘ quá»‘c gia Ä‘Ã³ vÆ°á»£t qua má»‘c 120 triá»‡u ngÆ°á»i?",
        "options":  [
                        "NÄƒm 2036",
                        "NÄƒm 2035",
                        "NÄƒm 2038",
                        "NÄƒm 2040"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "PhÆ°Æ¡ng trÃ¬nh tÄƒng trÆ°á»Ÿng: 100 Â· (1 + 0,012)^t â‰¥ 120 â‡” 1,012^t â‰¥ 1,2 â‡” t â‰¥ ln(1,2) / ln(1,012) â‰ˆ 0,1823 / 0,01193 â‰ˆ 15,28 nÄƒm.\u003cbr\u003e2020 + 16 = 2036. NÄƒm 2036 dÃ¢n sá»‘ sáº½ vÆ°á»£t má»‘c 120 triá»‡u.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan12_02"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "TÄƒng trÆ°á»Ÿng",
                     "Logarit",
                     "DÃ¢n sá»‘"
                 ],
        "knowledge_id":  "kb_toan12_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "DÃ¢n sá»‘ cá»§a má»™t quá»‘c gia nÄƒm 2020 lÃ  100 triá»‡u ngÆ°á»i. Tá»‰ lá»‡ tÄƒng dÃ¢n sá»‘ hÃ ng nÄƒm á»•n Ä‘á»‹nh á»Ÿ má»©c 1,2%/nÄƒm. Há»i vÃ o nÄƒm nÃ o dÃ¢n sá»‘ quá»‘c gia Ä‘Ã³ vÆ°á»£t qua má»‘c 120 triá»‡u ngÆ°á»i?"
    },
    {
        "id":  "q_tsa_38",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Tá»‘c Ä‘á»™ biáº¿n thiÃªn liÃªn quan (Related Rates)",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "KhÃ³",
        "difficulty_score":  0.88,
        "cognitive_level":  "M4",
        "estimated_time_seconds":  120,
        "question":  "Má»™t Ä‘á»‘ng cÃ¡t cÃ³ dáº¡ng hÃ¬nh nÃ³n cÃ³ gÃ³c á»Ÿ Ä‘á»‰nh báº±ng \\(90^\\circ\\). Khi cÃ¡t cháº£y thÃªm lÃ m chiá»u cao thÃ¡p cÃ¡t tÄƒng vá»›i tá»‘c Ä‘á»™ \\(0,2\\text{ m/phÃºt}\\). Tá»‘c Ä‘á»™ tÄƒng thá»ƒ tÃ­ch Ä‘á»‘ng cÃ¡t táº¡i thá»i Ä‘iá»ƒm chiá»u cao thÃ¡p lÃ  \\(h = 3\\text{ m}\\) báº±ng:",
        "options":  [
                        "\\(1,8\\pi\\text{ m}^3/\\text{phÃºt}\\)",
                        "\\(0,6\\pi\\text{ m}^3/\\text{phÃºt}\\)",
                        "\\(3,6\\pi\\text{ m}^3/\\text{phÃºt}\\)",
                        "\\(2,4\\pi\\text{ m}^3/\\text{phÃºt}\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "GÃ³c á»Ÿ Ä‘á»‰nh 90Â° =\u003e thiáº¿t diá»‡n qua trá»¥c lÃ  tam giÃ¡c vuÃ´ng cÃ¢n táº¡i Ä‘á»‰nh =\u003e gÃ³c nghiÃªng Ä‘Æ°á»ng sinh lÃ  45Â° =\u003e bÃ¡n kÃ­nh Ä‘Ã¡y r = h.\u003cbr\u003eThá»ƒ tÃ­ch: V = (1/3)Ï€ rÂ² h = (1/3)Ï€ hÂ³.\u003cbr\u003eÄáº¡o hÃ m theo thá»i gian: dV/dt = Ï€ hÂ² (dh/dt) = Ï€ (3)Â² (0,2) = 1,8Ï€ mÂ³/phÃºt.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan11_04"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Related Rates",
                     "HÃ¬nh nÃ³n",
                     "Äáº¡o hÃ m theo thá»i gian"
                 ],
        "knowledge_id":  "kb_toan11_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t Ä‘á»‘ng cÃ¡t cÃ³ dáº¡ng hÃ¬nh nÃ³n cÃ³ gÃ³c á»Ÿ Ä‘á»‰nh báº±ng \\(90^\\circ\\). Khi cÃ¡t cháº£y thÃªm lÃ m chiá»u cao thÃ¡p cÃ¡t tÄƒng vá»›i tá»‘c Ä‘á»™ \\(0,2\\text{ m/phÃºt}\\). Tá»‘c Ä‘á»™ tÄƒng thá»ƒ tÃ­ch Ä‘á»‘ng cÃ¡t táº¡i thá»i Ä‘iá»ƒm chiá»u cao thÃ¡p lÃ  \\(h = 3\\text{ m}\\) báº±ng:"
    },
    {
        "id":  "q_tsa_39",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Thá»ƒ tÃ­ch trÃ²n xoay quanh trá»¥c Oy",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "Má»™t cháº­u hoa hÃ¬nh paraboloid trÃ²n xoay Ä‘Æ°á»£c táº¡o thÃ nh báº±ng cÃ¡ch quay Ä‘Æ°á»ng parabol \\(y = x^2\\) (Ä‘Æ¡n vá»‹: dm, \\(0 \\le y \\le 4\\)) quanh trá»¥c Oy. Thá»ƒ tÃ­ch Ä‘áº¥t cÃ³ thá»ƒ chá»©a Ä‘áº§y cháº­u hoa Ä‘Ã³ lÃ :",
        "options":  [
                        "\\(8\\pi\\text{ dm}^3\\)",
                        "\\(16\\pi\\text{ dm}^3\\)",
                        "\\(4\\pi\\text{ dm}^3\\)",
                        "\\(\\frac{32}{3}\\pi\\text{ dm}^3\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Quay quanh trá»¥c Oy: V = Ï€ âˆ«â‚€â´ xÂ² dy = Ï€ âˆ«â‚€â´ y dy = Ï€ [yÂ²/2]â‚€â´ = Ï€ (16/2) = 8Ï€ dmÂ³.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_03"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Thá»ƒ tÃ­ch",
                     "TrÃ²n xoay",
                     "Paraboloid"
                 ],
        "knowledge_id":  "kb_toan12_03",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t cháº­u hoa hÃ¬nh paraboloid trÃ²n xoay Ä‘Æ°á»£c táº¡o thÃ nh báº±ng cÃ¡ch quay Ä‘Æ°á»ng parabol \\(y = x^2\\) (Ä‘Æ¡n vá»‹: dm, \\(0 \\le y \\le 4\\)) quanh trá»¥c Oy. Thá»ƒ tÃ­ch Ä‘áº¥t cÃ³ thá»ƒ chá»©a Ä‘áº§y cháº­u hoa Ä‘Ã³ lÃ :"
    },
    {
        "id":  "q_tsa_40",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Sá»‘ Bell \u0026 PhÃ¢n hoáº¡ch táº­p há»£p",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "KhÃ³",
        "difficulty_score":  0.88,
        "cognitive_level":  "M4",
        "estimated_time_seconds":  120,
        "question":  "Cho táº­p há»£p \\(S = \\{1, 2, 3, 4, 5, 6\\}\\). CÃ³ bao nhiÃªu quan há»‡ tÆ°Æ¡ng Ä‘Æ°Æ¡ng khÃ¡c nhau trÃªn táº­p há»£p con \\(A = \\{1, 2, 3\\}\\)?",
        "options":  [
                        "5",
                        "3",
                        "8",
                        "6"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Sá»‘ quan há»‡ tÆ°Æ¡ng Ä‘Æ°Æ¡ng trÃªn táº­p n pháº§n tá»­ báº±ng sá»‘ phÃ¢n hoáº¡ch táº­p há»£p (Sá»‘ Bell B_n).\u003cbr\u003eVá»›i n = 3: Bâ‚ƒ = 5 (1 phÃ¢n hoáº¡ch 3 pháº§n tá»­, 3 phÃ¢n hoáº¡ch 2+1, 1 phÃ¢n hoáº¡ch 1+1+1).",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan10_01"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "TÆ° duy Logic ToÃ¡n rá»i ráº¡c TSA",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Táº­p há»£p",
                     "Sá»‘ Bell",
                     "Quan há»‡ tÆ°Æ¡ng Ä‘Æ°Æ¡ng"
                 ],
        "knowledge_id":  "kb_toan10_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Cho táº­p há»£p \\(S = \\{1, 2, 3, 4, 5, 6\\}\\). CÃ³ bao nhiÃªu quan há»‡ tÆ°Æ¡ng Ä‘Æ°Æ¡ng khÃ¡c nhau trÃªn táº­p há»£p con \\(A = \\{1, 2, 3\\}\\)?"
    },
    {
        "id":  "q_hsa_23",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Tá»•ng n sá»‘ háº¡ng cáº¥p sá»‘ cá»™ng",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Tá»•ng cá»§a 10 sá»‘ háº¡ng Ä‘áº§u tiÃªn cá»§a cáº¥p sá»‘ cá»™ng cÃ³ sá»‘ háº¡ng Ä‘áº§u \\(u_1 = 4\\) vÃ  cÃ´ng sai \\(d = 3\\) lÃ :",
        "options":  [
                        "175",
                        "160",
                        "190",
                        "145"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Sâ‚â‚€ = 10 Â· [2(4) + 9(3)] / 2 = 5 Â· (8 + 27) = 5 Â· 35 = 175.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan11_02"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Cáº¥p sá»‘ cá»™ng",
                     "Tá»•ng CSC"
                 ],
        "knowledge_id":  "kb_toan11_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Tá»•ng cá»§a 10 sá»‘ háº¡ng Ä‘áº§u tiÃªn cá»§a cáº¥p sá»‘ cá»™ng cÃ³ sá»‘ háº¡ng Ä‘áº§u \\(u_1 = 4\\) vÃ  cÃ´ng sai \\(d = 3\\) lÃ :"
    },
    {
        "id":  "q_hsa_24",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Cáº¥p sá»‘ nhÃ¢n lÃ¹i vÃ´ háº¡n",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "Má»™t ngÆ°á»i tháº£ má»™t quáº£ bÃ³ng tá»« Ä‘á»™ cao 10 m xuá»‘ng máº·t Ä‘áº¥t. Sau má»—i láº§n cháº¡m Ä‘áº¥t, bÃ³ng náº£y lÃªn Ä‘á»™ cao báº±ng 3/4 Ä‘á»™ cao cá»§a láº§n rÆ¡i trÆ°á»›c Ä‘Ã³. Tá»•ng quÃ£ng Ä‘Æ°á»ng quáº£ bÃ³ng di chuyá»ƒn Ä‘Æ°á»£c ká»ƒ tá»« lÃºc tháº£ Ä‘áº¿n khi bÃ³ng dá»«ng háº³n lÃ :",
        "options":  [
                        "70 m",
                        "40 m",
                        "60 m",
                        "80 m"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Láº§n rÆ¡i Ä‘áº§u: 10 m.\u003cbr\u003eCÃ¡c láº§n náº£y lÃªn vÃ  rÆ¡i xuá»‘ng sau: 2 Ã— [10(3/4) + 10(3/4)Â² + ...].\u003cbr\u003eTá»•ng chuá»—i CSN lÃ¹i vÃ´ háº¡n: S = 10 + 20 Ã— [(3/4) / (1 - 3/4)] = 10 + 20 Ã— 3 = 10 + 60 = 70 m.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan11_02"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Cáº¥p sá»‘ nhÃ¢n",
                     "CSN lÃ¹i vÃ´ háº¡n",
                     "Váº­t lÃ½"
                 ],
        "knowledge_id":  "kb_toan11_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t ngÆ°á»i tháº£ má»™t quáº£ bÃ³ng tá»« Ä‘á»™ cao 10 m xuá»‘ng máº·t Ä‘áº¥t. Sau má»—i láº§n cháº¡m Ä‘áº¥t, bÃ³ng náº£y lÃªn Ä‘á»™ cao báº±ng 3/4 Ä‘á»™ cao cá»§a láº§n rÆ¡i trÆ°á»›c Ä‘Ã³. Tá»•ng quÃ£ng Ä‘Æ°á»ng quáº£ bÃ³ng di chuyá»ƒn Ä‘Æ°á»£c ká»ƒ tá»« lÃºc tháº£ Ä‘áº¿n khi bÃ³ng dá»«ng háº³n lÃ :"
    },
    {
        "id":  "q_hsa_25",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "GÃ³c giá»¯a hai máº·t pháº³ng Oxyz",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "GÃ³c giá»¯a hai máº·t pháº³ng \\((P): x + y - 2 = 0\\) vÃ  \\((Q): y + z + 1 = 0\\) báº±ng:",
        "options":  [
                        "60Â°",
                        "45Â°",
                        "30Â°",
                        "90Â°"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "VectÆ¡ phÃ¡p tuyáº¿n: n_P = (1, 1, 0), n_Q = (0, 1, 1).\u003cbr\u003ecos Ï† = |n_P Â· n_Q| / (|n_P| Â· |n_Q|) = |1(0) + 1(1) + 0(1)| / (âˆš2 Â· âˆš2) = 1/2 =\u003e Ï† = 60Â°.",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Oxyz",
                     "GÃ³c hai máº·t pháº³ng"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "GÃ³c giá»¯a hai máº·t pháº³ng \\((P): x + y - 2 = 0\\) vÃ  \\((Q): y + z + 1 = 0\\) báº±ng:"
    },
    {
        "id":  "q_hsa_26",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Nhá»‹ thá»©c Newton",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Há»‡ sá»‘ cá»§a sá»‘ háº¡ng chá»©a \\(x^3\\) trong khai triá»ƒn nhá»‹ thá»©c Newton \\((2x - 1)^5\\) lÃ :",
        "options":  [
                        "80",
                        "-80",
                        "40",
                        "-40"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Sá»‘ háº¡ng tá»•ng quÃ¡t: T_{k+1} = Câ‚…^k (2x)^{5-k} (-1)^k = Câ‚…^k 2^{5-k} (-1)^k x^{5-k}.\u003cbr\u003eCáº§n sá»‘ háº¡ng chá»©a xÂ³ =\u003e 5 - k = 3 =\u003e k = 2.\u003cbr\u003eHá»‡ sá»‘: Câ‚…Â² Â· 2Â³ Â· (-1)Â² = 10 Â· 8 Â· 1 = 80.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan10_05"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Nhá»‹ thá»©c Newton",
                     "Há»‡ sá»‘"
                 ],
        "knowledge_id":  "kb_toan10_05",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Há»‡ sá»‘ cá»§a sá»‘ háº¡ng chá»©a \\(x^3\\) trong khai triá»ƒn nhá»‹ thá»©c Newton \\((2x - 1)^5\\) lÃ :"
    },
    {
        "id":  "q_hsa_27",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Báº¥t phÆ°Æ¡ng trÃ¬nh chá»©a cÄƒn",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Táº­p nghiá»‡m cá»§a báº¥t phÆ°Æ¡ng trÃ¬nh \\(\\sqrt{x - 1} \u003c 3\\) lÃ :",
        "options":  [
                        "\\([1; 10)\\)",
                        "\\((-\\infty; 10)\\)",
                        "\\((1; 10)\\)",
                        "\\([1; 10]\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Äiá»u kiá»‡n: x - 1 â‰¥ 0 â‡” x â‰¥ 1.\u003cbr\u003eBÃ¬nh phÆ°Æ¡ng 2 váº¿: x - 1 \u003c 9 â‡” x \u003c 10.\u003cbr\u003eTáº­p nghiá»‡m: [1; 10).",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan10_01"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "CÄƒn thá»©c",
                     "Báº¥t phÆ°Æ¡ng trÃ¬nh"
                 ],
        "knowledge_id":  "kb_toan10_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Táº­p nghiá»‡m cá»§a báº¥t phÆ°Æ¡ng trÃ¬nh \\(\\sqrt{x - 1} \u003c 3\\) lÃ :"
    },
    {
        "id":  "q_hsa_28",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Äáº¡o hÃ m hÃ m logarit",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "TÃ­nh Ä‘áº¡o hÃ m cá»§a hÃ m sá»‘ \\(y = \\log_3(x^2 + 1)\\) táº¡i \\(x = 1\\).",
        "options":  [
                        "\\(\\frac{1}{\\ln 3}\\)",
                        "\\(\\frac{2}{\\ln 3}\\)",
                        "\\(\\frac{1}{2\\ln 3}\\)",
                        "\\(1\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "y\u0027 = (xÂ² + 1)\u0027 / [(xÂ² + 1) ln 3] = 2x / [(xÂ² + 1) ln 3].\u003cbr\u003eTáº¡i x = 1: y\u0027(1) = 2(1) / [(1 + 1) ln 3] = 2 / (2 ln 3) = 1 / ln 3.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_02"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Äáº¡o hÃ m",
                     "Logarit"
                 ],
        "knowledge_id":  "kb_toan12_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "TÃ­nh Ä‘áº¡o hÃ m cá»§a hÃ m sá»‘ \\(y = \\log_3(x^2 + 1)\\) táº¡i \\(x = 1\\)."
    },
    {
        "id":  "q_hsa_29",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "Khoáº£ng cÃ¡ch hai Ä‘Æ°á»ng tháº³ng song song pháº³ng",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Khoáº£ng cÃ¡ch giá»¯a hai Ä‘Æ°á»ng tháº³ng song song \\(d_1: 3x - 4y + 5 = 0\\) vÃ  \\(d_2: 3x - 4y - 15 = 0\\) trong máº·t pháº³ng Oxy báº±ng:",
        "options":  [
                        "4",
                        "2",
                        "3",
                        "5"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "CÃ´ng thá»©c khoáº£ng cÃ¡ch hai Ä‘Æ°á»ng song song: d = |câ‚ - câ‚‚| / âˆš(aÂ² + bÂ²) = |5 - (-15)| / âˆš(3Â² + (-4)Â²) = 20 / 5 = 4.",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan10_04"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Oxy",
                     "Khoáº£ng cÃ¡ch",
                     "HÃ¬nh há»c pháº³ng"
                 ],
        "knowledge_id":  "kb_toan10_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Khoáº£ng cÃ¡ch giá»¯a hai Ä‘Æ°á»ng tháº³ng song song \\(d_1: 3x - 4y + 5 = 0\\) vÃ  \\(d_2: 3x - 4y - 15 = 0\\) trong máº·t pháº³ng Oxy báº±ng:"
    },
    {
        "id":  "q_hsa_30",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Thá»‘ng kÃª",
        "subtopic":  "TÃ­nh phÆ°Æ¡ng sai máº«u sá»‘ liá»‡u",
        "skills":  [
                       "skill_probability",
                       "skill_data_analysis"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t máº«u sá»‘ liá»‡u gá»“m 5 giÃ¡ trá»‹: 4, 6, 8, 10, 12. PhÆ°Æ¡ng sai \\(s^2\\) cá»§a máº«u sá»‘ liá»‡u nÃ y báº±ng:",
        "options":  [
                        "8",
                        "2âˆš2",
                        "10",
                        "6,4"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Trung bÃ¬nh: xÌ„ = (4 + 6 + 8 + 10 + 12) / 5 = 40 / 5 = 8.\u003cbr\u003ePhÆ°Æ¡ng sai: sÂ² = [(-4)Â² + (-2)Â² + 0Â² + 2Â² + 4Â²] / 5 = (16 + 4 + 0 + 4 + 16) / 5 = 40 / 5 = 8.",
        "common_traps":  [
                             "Báº¥t cáº©n trong biáº¿n Ä‘á»•i Ä‘áº¡i sá»‘ cÆ¡ báº£n",
                             "Bá» quÃªn Ä‘iá»u kiá»‡n rÃ ng buá»™c cá»§a bÃ i toÃ¡n"
                         ],
        "prerequisites":  [
                              "kb_toan10_05"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Thá»‘ng kÃª",
                     "PhÆ°Æ¡ng sai"
                 ],
        "knowledge_id":  "kb_toan10_05",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t máº«u sá»‘ liá»‡u gá»“m 5 giÃ¡ trá»‹: 4, 6, 8, 10, 12. PhÆ°Æ¡ng sai \\(s^2\\) cá»§a máº«u sá»‘ liá»‡u nÃ y báº±ng:"
    },
    {
        "id":  "q_thpt_16",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "ÄÆ¡n Ä‘iá»‡u hÃ m báº­c ba",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "HÃ m sá»‘ \\(y = \\frac{1}{3}x^3 - 2x^2 + 3x - 1\\) nghá»‹ch biáº¿n trÃªn khoáº£ng nÃ o dÆ°á»›i Ä‘Ã¢y?",
        "options":  [
                        "\\((1; 3)\\)",
                        "\\((-\\infty; 1)\\)",
                        "\\((3; +\\infty)\\)",
                        "\\((0; 3)\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "y\u0027 = xÂ² - 4x + 3 = (x - 1)(x - 3).\u003cbr\u003ey\u0027 \u003c 0 â‡” 1 \u003c x \u003c 3. HÃ m sá»‘ nghá»‹ch biáº¿n trÃªn khoáº£ng (1; 3).",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_01"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "ÄÆ¡n Ä‘iá»‡u",
                     "Nghá»‹ch biáº¿n"
                 ],
        "knowledge_id":  "kb_toan12_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "HÃ m sá»‘ \\(y = \\frac{1}{3}x^3 - 2x^2 + 3x - 1\\) nghá»‹ch biáº¿n trÃªn khoáº£ng nÃ o dÆ°á»›i Ä‘Ã¢y?"
    },
    {
        "id":  "q_thpt_17",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "PhÆ°Æ¡ng trÃ¬nh mÅ© cÆ¡ báº£n",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Nghiá»‡m cá»§a phÆ°Æ¡ng trÃ¬nh \\(3^{x - 2} = 27\\) lÃ :",
        "options":  [
                        "\\(x = 5\\)",
                        "\\(x = 3\\)",
                        "\\(x = 1\\)",
                        "\\(x = -1\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "3^{x - 2} = 3Â³ â‡” x - 2 = 3 â‡” x = 5.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan12_02"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "MÅ©",
                     "PhÆ°Æ¡ng trÃ¬nh"
                 ],
        "knowledge_id":  "kb_toan12_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Nghiá»‡m cá»§a phÆ°Æ¡ng trÃ¬nh \\(3^{x - 2} = 27\\) lÃ :"
    },
    {
        "id":  "q_thpt_18",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "HÃ¬nh chiáº¿u lÃªn máº·t pháº³ng tá»a Ä‘á»™",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Trong khÃ´ng gian Oxyz, hÃ¬nh chiáº¿u vuÃ´ng gÃ³c cá»§a Ä‘iá»ƒm \\(M(2, -3, 5)\\) lÃªn máº·t pháº³ng \\((Oxy)\\) cÃ³ tá»a Ä‘á»™ lÃ :",
        "options":  [
                        "\\((2, -3, 0)\\)",
                        "\\((2, 0, 5)\\)",
                        "\\((0, -3, 5)\\)",
                        "\\((0, 0, 5)\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "HÃ¬nh chiáº¿u lÃªn máº·t pháº³ng (Oxy) thÃ¬ giá»¯ nguyÃªn hoÃ nh Ä‘á»™ x vÃ  tung Ä‘á»™ y, cho cao Ä‘á»™ z = 0 =\u003e (2, -3, 0).",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Oxyz",
                     "HÃ¬nh chiáº¿u"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Trong khÃ´ng gian Oxyz, hÃ¬nh chiáº¿u vuÃ´ng gÃ³c cá»§a Ä‘iá»ƒm \\(M(2, -3, 5)\\) lÃªn máº·t pháº³ng \\((Oxy)\\) cÃ³ tá»a Ä‘á»™ lÃ :"
    },
    {
        "id":  "q_thpt_19",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "Diá»‡n tÃ­ch toÃ n pháº§n hÃ¬nh trá»¥",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t hÃ¬nh trá»¥ cÃ³ bÃ¡n kÃ­nh Ä‘Ã¡y \\(r = 4\\) vÃ  Ä‘á»™ dÃ i Ä‘Æ°á»ng sinh \\(l = 5\\). Diá»‡n tÃ­ch toÃ n pháº§n cá»§a hÃ¬nh trá»¥ Ä‘Ã³ báº±ng:",
        "options":  [
                        "\\(72\\pi\\)",
                        "\\(40\\pi\\)",
                        "\\(32\\pi\\)",
                        "\\(80\\pi\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "S_tp = 2Ï€ r l + 2Ï€ rÂ² = 2Ï€(4)(5) + 2Ï€(16) = 40Ï€ + 32Ï€ = 72Ï€.",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "HÃ¬nh trá»¥",
                     "Diá»‡n tÃ­ch toÃ n pháº§n"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t hÃ¬nh trá»¥ cÃ³ bÃ¡n kÃ­nh Ä‘Ã¡y \\(r = 4\\) vÃ  Ä‘á»™ dÃ i Ä‘Æ°á»ng sinh \\(l = 5\\). Diá»‡n tÃ­ch toÃ n pháº§n cá»§a hÃ¬nh trá»¥ Ä‘Ã³ báº±ng:"
    },
    {
        "id":  "q_thpt_20",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Sá»‘ phá»©c liÃªn há»£p",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Sá»‘ phá»©c liÃªn há»£p cá»§a sá»‘ phá»©c \\(z = 3 - 5i\\) lÃ :",
        "options":  [
                        "\\(\\bar{z} = 3 + 5i\\)",
                        "\\(\\bar{z} = -3 + 5i\\)",
                        "\\(\\bar{z} = -3 - 5i\\)",
                        "\\(\\bar{z} = 5 - 3i\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Sá»‘ phá»©c liÃªn há»£p giá»¯ nguyÃªn pháº§n thá»±c vÃ  Ä‘á»•i dáº¥u pháº§n áº£o: z = a + bi =\u003e zÌ„ = a - bi. á»ž Ä‘Ã¢y z = 3 - 5i =\u003e zÌ„ = 3 + 5i.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan12_02"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Sá»‘ phá»©c",
                     "LiÃªn há»£p"
                 ],
        "knowledge_id":  "kb_toan12_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Sá»‘ phá»©c liÃªn há»£p cá»§a sá»‘ phá»©c \\(z = 3 - 5i\\) lÃ :"
    },
    {
        "id":  "q_calc_11",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "Giáº£i tÃ­ch 1",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "VÃ´ cÃ¹ng bÃ© tÆ°Æ¡ng Ä‘Æ°Æ¡ng lÆ°á»£ng giÃ¡c",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "TÃ­nh giá»›i háº¡n \\(L = \\lim_{x \\to 0} \\frac{\\tan x - \\sin x}{x^3}\\).",
        "options":  [
                        "\\(\\frac{1}{2}\\)",
                        "0",
                        "1",
                        "\\(\\frac{1}{6}\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "tan x - sin x = tan x (1 - cos x) ~ x Â· (xÂ²/2) = xÂ³/2.\u003cbr\u003eDo Ä‘Ã³ L = lim (xÂ³/2) / xÂ³ = 1/2.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_gt1_01"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "ToÃ¡n Cao Cáº¥p ÄHBK HÃ  Ná»™i",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Giá»›i háº¡n",
                     "VÃ´ cÃ¹ng bÃ©"
                 ],
        "knowledge_id":  "kb_gt1_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "TÃ­nh giá»›i háº¡n \\(L = \\lim_{x \\to 0} \\frac{\\tan x - \\sin x}{x^3}\\)."
    },
    {
        "id":  "q_calc_12",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "ToÃ¡n cao cáº¥p",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "GiÃ¡ trá»‹ riÃªng ma tráº­n tam giÃ¡c",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Cho ma tráº­n \\(A = \\begin{pmatrix} 1 \u0026 0 \u0026 2 \\\\ 0 \u0026 3 \u0026 1 \\\\ 0 \u0026 0 \u0026 -2 \\end{pmatrix}\\). CÃ¡c giÃ¡ trá»‹ riÃªng cá»§a ma tráº­n A lÃ :",
        "options":  [
                        "\\(1, 3, -2\\)",
                        "\\(1, -3, 2\\)",
                        "\\(0, 3, 2\\)",
                        "\\(1, 0, -2\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "A lÃ  ma tráº­n tam giÃ¡c trÃªn, do Ä‘Ã³ cÃ¡c giÃ¡ trá»‹ riÃªng chÃ­nh lÃ  cÃ¡c pháº§n tá»­ náº±m trÃªn Ä‘Æ°á»ng chÃ©o chÃ­nh: Î»â‚ = 1, Î»â‚‚ = 3, Î»â‚ƒ = -2.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_dstt_04"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äáº¡i sá»‘ Tuyáº¿n tÃ­nh ÄHBK",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Trá»‹ riÃªng",
                     "Ma tráº­n tam giÃ¡c"
                 ],
        "knowledge_id":  "kb_dstt_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Cho ma tráº­n \\(A = \\begin{pmatrix} 1 \u0026 0 \u0026 2 \\\\ 0 \u0026 3 \u0026 1 \\\\ 0 \u0026 0 \u0026 -2 \\end{pmatrix}\\). CÃ¡c giÃ¡ trá»‹ riÃªng cá»§a ma tráº­n A lÃ :"
    },
    {
        "id":  "q_calc_13",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "Giáº£i tÃ­ch 1",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "TÃ­ch phÃ¢n suy rá»™ng loáº¡i 2",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "TÃ­ch phÃ¢n suy rá»™ng loáº¡i 2: \\(I = \\int_0^1 \\frac{1}{\\sqrt{1 - x^2}} dx\\) cÃ³ giÃ¡ trá»‹ báº±ng:",
        "options":  [
                        "\\(\\frac{\\pi}{2}\\)",
                        "\\(\\pi\\)",
                        "1",
                        "PhÃ¢n ká»³"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "NguyÃªn hÃ m cÆ¡ báº£n: âˆ« 1/âˆš(1 - xÂ²) dx = arcsin x.\u003cbr\u003eI = [arcsin x]â‚€Â¹ = arcsin 1 - arcsin 0 = Ï€/2.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_gt1_03"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "ToÃ¡n Cao Cáº¥p ÄHBK HÃ  Ná»™i",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "TÃ­ch phÃ¢n suy rá»™ng",
                     "Arcsin"
                 ],
        "knowledge_id":  "kb_gt1_03",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "TÃ­ch phÃ¢n suy rá»™ng loáº¡i 2: \\(I = \\int_0^1 \\frac{1}{\\sqrt{1 - x^2}} dx\\) cÃ³ giÃ¡ trá»‹ báº±ng:"
    },
    {
        "id":  "q_calc_14",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "Giáº£i tÃ­ch 1",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Tá»•ng chuá»—i vi sai Telescoping",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Chuá»—i sá»‘ \\(\\sum_{n=1}^{\\infty} \\frac{1}{n(n+1)}\\) cÃ³ tá»•ng báº±ng:",
        "options":  [
                        "1",
                        "2",
                        "1/2",
                        "PhÃ¢n ká»³"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "PhÃ¢n tÃ­ch sá»‘ háº¡ng: 1/[n(n+1)] = 1/n - 1/(n+1).\u003cbr\u003eTá»•ng riÃªng pháº§n thá»© N lÃ  chuá»—i vi sai thu gá»n (Telescoping Sum): S_N = (1 - 1/2) + (1/2 - 1/3) + ... + (1/N - 1/(N+1)) = 1 - 1/(N+1).\u003cbr\u003eKhi N â†’ âˆž, tá»•ng S = lim (1 - 1/(N+1)) = 1.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_gt1_04"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "ToÃ¡n Cao Cáº¥p ÄHBK HÃ  Ná»™i",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Chuá»—i sá»‘",
                     "Telescoping",
                     "Tá»•ng chuá»—i"
                 ],
        "knowledge_id":  "kb_gt1_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Chuá»—i sá»‘ \\(\\sum_{n=1}^{\\infty} \\frac{1}{n(n+1)}\\) cÃ³ tá»•ng báº±ng:"
    },
    {
        "id":  "q_calc_15",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "Giáº£i tÃ­ch 1",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "PhÆ°Æ¡ng trÃ¬nh vi phÃ¢n cÆ¡ báº£n",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Nghiá»‡m cá»§a phÆ°Æ¡ng trÃ¬nh vi phÃ¢n \\(y\u0027 = 3x^2\\) thá»a mÃ£n Ä‘iá»u kiá»‡n \\(y(0) = 4\\) lÃ :",
        "options":  [
                        "\\(y = x^3 + 4\\)",
                        "\\(y = 6x + 4\\)",
                        "\\(y = x^3\\)",
                        "\\(y = 3x^3 + 4\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "y = âˆ« 3xÂ² dx = xÂ³ + C. Äiá»u kiá»‡n y(0) = 4 =\u003e C = 4 =\u003e y = xÂ³ + 4.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_gt1_05"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "ToÃ¡n Cao Cáº¥p ÄHBK HÃ  Ná»™i",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "PT vi phÃ¢n",
                     "NguyÃªn hÃ m"
                 ],
        "knowledge_id":  "kb_gt1_05",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Nghiá»‡m cá»§a phÆ°Æ¡ng trÃ¬nh vi phÃ¢n \\(y\u0027 = 3x^2\\) thá»a mÃ£n Ä‘iá»u kiá»‡n \\(y(0) = 4\\) lÃ :"
    },
    {
        "id":  "q_tsa_41",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Thuáº­t toÃ¡n sáº¯p xáº¿p \u0026 Cáº·p nghá»‹ch tháº¿",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t thuáº­t toÃ¡n sáº¯p xáº¿p ná»•i bá»t (Bubble Sort) Ä‘Æ°á»£c Ã¡p dá»¥ng trÃªn máº£ng gá»“m 5 pháº§n tá»­: [5, 1, 4, 2, 8]. Sá»‘ phÃ©p Ä‘á»•i chá»— (swap) tá»‘i thiá»ƒu cáº§n thá»±c hiá»‡n Ä‘á»ƒ máº£ng Ä‘Æ°á»£c sáº¯p xáº¿p tÄƒng dáº§n lÃ :",
        "options":  [
                        "4 phÃ©p Ä‘á»•i chá»—",
                        "3 phÃ©p Ä‘á»•i chá»—",
                        "5 phÃ©p Ä‘á»•i chá»—",
                        "2 phÃ©p Ä‘á»•i chá»—"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "CÃ¡c nghá»‹ch tháº¿ trong máº£ng ban Ä‘áº§u: (5,1), (5,4), (5,2), (4,2) gá»“m Ä‘Ãºng 4 cáº·p nghá»‹ch tháº¿. Má»—i phÃ©p swap liá»n ká» triá»‡t tiÃªu Ä‘Ãºng 1 nghá»‹ch tháº¿, do Ä‘Ã³ cáº§n Ä‘Ãºng 4 phÃ©p Ä‘á»•i chá»—.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan10_01"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "TÆ° duy Thuáº­t toÃ¡n TSA",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Thuáº­t toÃ¡n",
                     "Bubble Sort",
                     "Nghá»‹ch tháº¿"
                 ],
        "knowledge_id":  "kb_toan10_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t thuáº­t toÃ¡n sáº¯p xáº¿p ná»•i bá»t (Bubble Sort) Ä‘Æ°á»£c Ã¡p dá»¥ng trÃªn máº£ng gá»“m 5 pháº§n tá»­: [5, 1, 4, 2, 8]. Sá»‘ phÃ©p Ä‘á»•i chá»— (swap) tá»‘i thiá»ƒu cáº§n thá»±c hiá»‡n Ä‘á»ƒ máº£ng Ä‘Æ°á»£c sáº¯p xáº¿p tÄƒng dáº§n lÃ :"
    },
    {
        "id":  "q_tsa_42",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "LÃ½ thuyáº¿t Ä‘á»“ thá»‹ \u0026 CÃ¢y khung",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Trong má»™t Ä‘á»“ thá»‹ liÃªn thÃ´ng gá»“m 7 Ä‘á»‰nh, sá»‘ cáº¡nh tá»‘i thiá»ƒu Ä‘á»ƒ Ä‘á»“ thá»‹ khÃ´ng chá»©a chu trÃ¬nh (cÃ¢y khung - spanning tree) lÃ :",
        "options":  [
                        "6 cáº¡nh",
                        "7 cáº¡nh",
                        "5 cáº¡nh",
                        "8 cáº¡nh"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Má»™t cÃ¢y gá»“m V Ä‘á»‰nh luÃ´n cÃ³ Ä‘Ãºng V - 1 cáº¡nh. Vá»›i V = 7 Ä‘á»‰nh, sá»‘ cáº¡nh cá»§a cÃ¢y khung lÃ  7 - 1 = 6 cáº¡nh.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan10_01"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "TÆ° duy Logic Äá»“ thá»‹ TSA",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Äá»“ thá»‹",
                     "CÃ¢y khung",
                     "ToÃ¡n rá»i ráº¡c"
                 ],
        "knowledge_id":  "kb_toan10_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Trong má»™t Ä‘á»“ thá»‹ liÃªn thÃ´ng gá»“m 7 Ä‘á»‰nh, sá»‘ cáº¡nh tá»‘i thiá»ƒu Ä‘á»ƒ Ä‘á»“ thá»‹ khÃ´ng chá»©a chu trÃ¬nh (cÃ¢y khung - spanning tree) lÃ :"
    },
    {
        "id":  "q_tsa_43",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Phá»‘i há»£p trá»Ÿ khÃ¡ng tá»‘i Æ°u cÃ´ng suáº¥t",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t bÃ¬nh áº¯c quy cÃ³ suáº¥t Ä‘iá»‡n Ä‘á»™ng \\(E = 12\\text{ V}\\) vÃ  Ä‘iá»‡n trá»Ÿ trong \\(r = 2\\,\\Omega\\). Äá»ƒ cÃ´ng suáº¥t tiÃªu thá»¥ trÃªn Ä‘iá»‡n trá»Ÿ máº¡ch ngoÃ i \\(R\\) Ä‘áº¡t giÃ¡ trá»‹ lá»›n nháº¥t thÃ¬ giÃ¡ trá»‹ cá»§a \\(R\\) pháº£i báº±ng:",
        "options":  [
                        "2 Î©",
                        "4 Î©",
                        "1 Î©",
                        "6 Î©"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "CÃ´ng suáº¥t máº¡ch ngoÃ i: P = IÂ² R = [E / (R + r)]Â² R = EÂ² / [(âˆšR + r/âˆšR)Â²].\u003cbr\u003eTheo AM-GM: (âˆšR + r/âˆšR)Â² â‰¥ 4r, dáº¥u \u0027=\u0027 xáº£y ra khi âˆšR = r/âˆšR â‡” R = r = 2 Î©.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan10_02"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "TÆ° duy Khoa há»c Ká»¹ thuáº­t TSA",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Máº¡ch Ä‘iá»‡n",
                     "Tá»‘i Æ°u cÃ´ng suáº¥t",
                     "AM-GM"
                 ],
        "knowledge_id":  "kb_toan10_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t bÃ¬nh áº¯c quy cÃ³ suáº¥t Ä‘iá»‡n Ä‘á»™ng \\(E = 12\\text{ V}\\) vÃ  Ä‘iá»‡n trá»Ÿ trong \\(r = 2\\,\\Omega\\). Äá»ƒ cÃ´ng suáº¥t tiÃªu thá»¥ trÃªn Ä‘iá»‡n trá»Ÿ máº¡ch ngoÃ i \\(R\\) Ä‘áº¡t giÃ¡ trá»‹ lá»›n nháº¥t thÃ¬ giÃ¡ trá»‹ cá»§a \\(R\\) pháº£i báº±ng:"
    },
    {
        "id":  "q_tsa_44",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "Há»‡ thá»©c lÆ°á»£ng trong tam giÃ¡c vuÃ´ng",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t ngÆ°á»i quan sÃ¡t Ä‘á»©ng cÃ¡ch má»™t thÃ¡p phÃ¡t sÃ³ng 50 m. GÃ³c nÃ¢ng tá»« máº·t Ä‘áº¥t Ä‘áº¿n Ä‘á»‰nh thÃ¡p lÃ  \\(60^\\circ\\). Chiá»u cao cá»§a thÃ¡p phÃ¡t sÃ³ng gáº§n nháº¥t vá»›i giÃ¡ trá»‹ nÃ o?",
        "options":  [
                        "86,6 m",
                        "50 m",
                        "100 m",
                        "75 m"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "h = d Â· tan 60Â° = 50 Â· âˆš3 â‰ˆ 50 Â· 1,732 = 86,6 m.",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan10_04"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Tam giÃ¡c vuÃ´ng",
                     "LÆ°á»£ng giÃ¡c",
                     "Äo Ä‘áº¡c"
                 ],
        "knowledge_id":  "kb_toan10_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t ngÆ°á»i quan sÃ¡t Ä‘á»©ng cÃ¡ch má»™t thÃ¡p phÃ¡t sÃ³ng 50 m. GÃ³c nÃ¢ng tá»« máº·t Ä‘áº¥t Ä‘áº¿n Ä‘á»‰nh thÃ¡p lÃ  \\(60^\\circ\\). Chiá»u cao cá»§a thÃ¡p phÃ¡t sÃ³ng gáº§n nháº¥t vá»›i giÃ¡ trá»‹ nÃ o?"
    },
    {
        "id":  "q_tsa_45",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Thá»‘ng kÃª",
        "subtopic":  "Quy táº¯c phÃ¢n phá»‘i chuáº©n 68-95-99.7",
        "skills":  [
                       "skill_probability",
                       "skill_data_analysis"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t cÃ´ng ty dá»± bÃ¡o nhu cáº§u sáº£n pháº©m tuÃ¢n theo phÃ¢n phá»‘i chuáº©n vá»›i trung bÃ¬nh \\(\\mu = 1000\\) sáº£n pháº©m/thÃ¡ng vÃ  Ä‘á»™ lá»‡ch chuáº©n \\(\\sigma = 100\\). Theo quy táº¯c thá»±c nghiá»‡m 68-95-99.7, xÃ¡c suáº¥t nhu cáº§u thÃ¡ng tá»›i náº±m trong khoáº£ng tá»« 800 Ä‘áº¿n 1200 sáº£n pháº©m xáº¥p xá»‰ báº±ng:",
        "options":  [
                        "95%",
                        "68%",
                        "99,7%",
                        "90%"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Khoáº£ng [800; 1200] chÃ­nh lÃ  [Î¼ - 2Ïƒ; Î¼ + 2Ïƒ]. Vá»›i phÃ¢n phá»‘i chuáº©n, tá»‰ lá»‡ dá»¯ liá»‡u rÆ¡i vÃ o khoáº£ng 2 Ä‘á»™ lá»‡ch chuáº©n quanh trung bÃ¬nh lÃ  khoáº£ng 95,45% â‰ˆ 95%.",
        "common_traps":  [
                             "Báº¥t cáº©n trong biáº¿n Ä‘á»•i Ä‘áº¡i sá»‘ cÆ¡ báº£n",
                             "Bá» quÃªn Ä‘iá»u kiá»‡n rÃ ng buá»™c cá»§a bÃ i toÃ¡n"
                         ],
        "prerequisites":  [
                              "kb_toan10_05"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "PhÃ¢n phá»‘i chuáº©n",
                     "Äá»™ lá»‡ch chuáº©n",
                     "XÃ¡c suáº¥t"
                 ],
        "knowledge_id":  "kb_toan10_05",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t cÃ´ng ty dá»± bÃ¡o nhu cáº§u sáº£n pháº©m tuÃ¢n theo phÃ¢n phá»‘i chuáº©n vá»›i trung bÃ¬nh \\(\\mu = 1000\\) sáº£n pháº©m/thÃ¡ng vÃ  Ä‘á»™ lá»‡ch chuáº©n \\(\\sigma = 100\\). Theo quy táº¯c thá»±c nghiá»‡m 68-95-99.7, xÃ¡c suáº¥t nhu cáº§u thÃ¡ng tá»›i náº±m trong khoáº£ng tá»« 800 Ä‘áº¿n 1200 sáº£n pháº©m xáº¥p xá»‰ báº±ng:"
    },
    {
        "id":  "q_tsa_46",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "PhÆ°Æ¡ng trÃ¬nh chÃ­nh táº¯c Parabol",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t anten viá»…n thÃ´ng cÃ³ máº·t cáº¯t ngang lÃ  má»™t parabol cÃ³ tiÃªu cá»± \\(f = 2\\text{ m}\\). PhÆ°Æ¡ng trÃ¬nh chÃ­nh táº¯c cá»§a parabol nÃ y trong há»‡ tá»a Ä‘á»™ phÃ¹ há»£p lÃ :",
        "options":  [
                        "\\(y^2 = 8x\\)",
                        "\\(y^2 = 4x\\)",
                        "\\(y^2 = 2x\\)",
                        "\\(y = 2x^2\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "PhÆ°Æ¡ng trÃ¬nh chÃ­nh táº¯c cá»§a parabol Ä‘á»‰nh táº¡i O lÃ  yÂ² = 2px, trong Ä‘Ã³ tiÃªu cá»± f = p/2 =\u003e p = 2f = 4 =\u003e yÂ² = 8x.",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan10_03"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Parabol",
                     "TiÃªu cá»±",
                     "Anten"
                 ],
        "knowledge_id":  "kb_toan10_03",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t anten viá»…n thÃ´ng cÃ³ máº·t cáº¯t ngang lÃ  má»™t parabol cÃ³ tiÃªu cá»± \\(f = 2\\text{ m}\\). PhÆ°Æ¡ng trÃ¬nh chÃ­nh táº¯c cá»§a parabol nÃ y trong há»‡ tá»a Ä‘á»™ phÃ¹ há»£p lÃ :"
    },
    {
        "id":  "q_tsa_47",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "MÃ£ Hamming kiá»ƒm tra lá»—i",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "Äá»ƒ mÃ£ hÃ³a má»™t chuá»—i nhá»‹ phÃ¢n 4 bit, mÃ£ Hamming(7, 4) thÃªm vÃ o bao nhiÃªu bit cháºµn láº» (parity bits) Ä‘á»ƒ cÃ³ thá»ƒ phÃ¡t hiá»‡n vÃ  sá»­a sai 1 bit?",
        "options":  [
                        "3 bit",
                        "2 bit",
                        "4 bit",
                        "1 bit"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "MÃ£ Hamming(7, 4) cÃ³ tá»•ng Ä‘á»™ dÃ i n = 7 bit, trong Ä‘Ã³ dá»¯ liá»‡u gá»‘c k = 4 bit. Sá»‘ bit kiá»ƒm tra cháºµn láº» lÃ  r = n - k = 7 - 4 = 3 bit (thá»a mÃ£n báº¥t Ä‘áº³ng thá»©c 2^r â‰¥ k + r + 1 = 8).",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan10_01"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "TÆ° duy CÃ´ng nghá»‡ ThÃ´ng tin TSA",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "MÃ£ Hamming",
                     "Bit parity",
                     "Sá»­a lá»—i"
                 ],
        "knowledge_id":  "kb_toan10_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Äá»ƒ mÃ£ hÃ³a má»™t chuá»—i nhá»‹ phÃ¢n 4 bit, mÃ£ Hamming(7, 4) thÃªm vÃ o bao nhiÃªu bit cháºµn láº» (parity bits) Ä‘á»ƒ cÃ³ thá»ƒ phÃ¡t hiá»‡n vÃ  sá»­a sai 1 bit?"
    },
    {
        "id":  "q_tsa_48",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Kháº£o sÃ¡t cá»±c trá»‹ hÃ m mÅ©",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Cho hÃ m sá»‘ \\(f(x) = x e^{-x}\\). GiÃ¡ trá»‹ lá»›n nháº¥t cá»§a hÃ m sá»‘ trÃªn \\([0; +\\infty)\\) lÃ :",
        "options":  [
                        "\\(\\frac{1}{e}\\)",
                        "\\(1\\)",
                        "\\(e\\)",
                        "\\(\\frac{1}{e^2}\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "f\u0027(x) = e^{-x} - x e^{-x} = (1 - x)e^{-x} = 0 â‡” x = 1.\u003cbr\u003ef(1) = 1 Â· eâ»Â¹ = 1/e. Khi x â†’ +âˆž, lim f(x) = 0. Váº­y giÃ¡ trá»‹ lá»›n nháº¥t lÃ  1/e.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_01"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Cá»±c trá»‹",
                     "HÃ m mÅ©",
                     "GTLN"
                 ],
        "knowledge_id":  "kb_toan12_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Cho hÃ m sá»‘ \\(f(x) = x e^{-x}\\). GiÃ¡ trá»‹ lá»›n nháº¥t cá»§a hÃ m sá»‘ trÃªn \\([0; +\\infty)\\) lÃ :"
    },
    {
        "id":  "q_tsa_49",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "PhÆ°Æ¡ng trÃ¬nh mÅ© - logarit há»—n há»£p",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "TÃ­ch cá»§a táº¥t cáº£ cÃ¡c nghiá»‡m thá»±c cá»§a phÆ°Æ¡ng trÃ¬nh \\(x^{\\log_2 x} = 4x\\) báº±ng:",
        "options":  [
                        "2",
                        "4",
                        "8",
                        "1"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Láº¥y logarit cÆ¡ sá»‘ 2 hai váº¿: logâ‚‚(x^{logâ‚‚ x}) = logâ‚‚(4x) â‡” (logâ‚‚ x)Â² = 2 + logâ‚‚ x.\u003cbr\u003eÄáº·t t = logâ‚‚ x =\u003e tÂ² - t - 2 = 0 â‡” tâ‚ = -1, tâ‚‚ = 2.\u003cbr\u003eSuy ra xâ‚ = 2â»Â¹ = 1/2; xâ‚‚ = 2Â² = 4.\u003cbr\u003eTÃ­ch hai nghiá»‡m: xâ‚ Â· xâ‚‚ = (1/2) Â· 4 = 2.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan12_02"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Logarit",
                     "PhÆ°Æ¡ng trÃ¬nh"
                 ],
        "knowledge_id":  "kb_toan12_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "TÃ­ch cá»§a táº¥t cáº£ cÃ¡c nghiá»‡m thá»±c cá»§a phÆ°Æ¡ng trÃ¬nh \\(x^{\\log_2 x} = 4x\\) báº±ng:"
    },
    {
        "id":  "q_tsa_50",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Äáº¡o hÃ m trong dao Ä‘á»™ng Ä‘iá»u hÃ²a",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t con láº¯c dao Ä‘á»™ng Ä‘iá»u hÃ²a theo quy luáº­t \\(x(t) = 5\\cos(4\\pi t - \\pi/3)\\) (cm). Váº­n tá»‘c cá»±c Ä‘áº¡i cá»§a con láº¯c báº±ng:",
        "options":  [
                        "\\(20\\pi\\text{ cm/s}\\)",
                        "\\(5\\pi\\text{ cm/s}\\)",
                        "\\(10\\pi\\text{ cm/s}\\)",
                        "\\(40\\pi\\text{ cm/s}\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Váº­n tá»‘c tá»©c thá»i: v(t) = x\u0027(t) = -20Ï€ sin(4Ï€t - Ï€/3).\u003cbr\u003eVáº­n tá»‘c cá»±c Ä‘áº¡i v_max = A Â· Ï‰ = 5 Â· 4Ï€ = 20Ï€ cm/s.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan11_04"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "TÆ° duy Váº­t lÃ½ TSA",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Dao Ä‘á»™ng Ä‘iá»u hÃ²a",
                     "Váº­n tá»‘c cá»±c Ä‘áº¡i",
                     "Äáº¡o hÃ m"
                 ],
        "knowledge_id":  "kb_toan11_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t con láº¯c dao Ä‘á»™ng Ä‘iá»u hÃ²a theo quy luáº­t \\(x(t) = 5\\cos(4\\pi t - \\pi/3)\\) (cm). Váº­n tá»‘c cá»±c Ä‘áº¡i cá»§a con láº¯c báº±ng:"
    },
    {
        "id":  "q_tsa_51",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Giá»›i háº¡n nhÃ¢n liÃªn há»£p vÃ´ cÃ¹ng trá»« vÃ´ cÃ¹ng",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "TÃ­nh giá»›i háº¡n \\(L = \\lim_{x \\to +\\infty} x \\left( \\sqrt{x^2 + 1} - x \\right)\\).",
        "options":  [
                        "\\(\\frac{1}{2}\\)",
                        "1",
                        "0",
                        "\\(\\infty\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "NhÃ¢n liÃªn há»£p: âˆš(xÂ² + 1) - x = 1 / [âˆš(xÂ² + 1) + x].\u003cbr\u003eL = lim x / [âˆš(xÂ² + 1) + x] = lim 1 / [âˆš(1 + 1/xÂ²) + 1] = 1 / (1 + 1) = 1/2.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan11_03"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Giá»›i háº¡n",
                     "NhÃ¢n liÃªn há»£p"
                 ],
        "knowledge_id":  "kb_toan11_03",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "TÃ­nh giá»›i háº¡n \\(L = \\lim_{x \\to +\\infty} x \\left( \\sqrt{x^2 + 1} - x \\right)\\)."
    },
    {
        "id":  "q_tsa_52",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "XÃ¡c suáº¥t",
        "subtopic":  "Tá»• há»£p khÃ´ng phÃ¢n biá»‡t thá»© tá»± sáº¯p xáº¿p",
        "skills":  [
                       "skill_probability",
                       "skill_reasoning",
                       "skill_data_analysis"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t máº­t mÃ£ kÃ©t sáº¯t gá»“m 4 chá»¯ sá»‘ (má»—i chá»¯ sá»‘ tá»« 0 Ä‘áº¿n 9). Má»™t ngÆ°á»i quÃªn máº­t mÃ£ nhÆ°ng nhá»› ráº±ng 4 chá»¯ sá»‘ nÃ y tÄƒng dáº§n tá»« trÃ¡i sang pháº£i (vÃ­ dá»¥ 1248). CÃ³ bao nhiÃªu máº­t mÃ£ thá»a mÃ£n Ä‘iá»u kiá»‡n nÃ y?",
        "options":  [
                        "210",
                        "120",
                        "5040",
                        "360"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Má»—i cÃ¡ch chá»n ra 4 chá»¯ sá»‘ phÃ¢n biá»‡t tá»« táº­p 10 chá»¯ sá»‘ {0, 1, ..., 9} chá»‰ cÃ³ duy nháº¥t 1 cÃ¡ch sáº¯p xáº¿p theo thá»© tá»± tÄƒng dáº§n.\u003cbr\u003eSá»‘ máº­t mÃ£ há»£p lá»‡: Câ‚â‚€â´ = (10 Â· 9 Â· 8 Â· 7) / 24 = 210.",
        "common_traps":  [
                             "Nháº§m giá»¯a biáº¿n cá»‘ Ä‘á»™c láº­p vÃ  biáº¿n cá»‘ xung kháº¯c",
                             "KhÃ´ng Ã¡p dá»¥ng Ä‘Ãºng cÃ´ng thá»©c Bayes",
                             "Äáº¿m láº·p trÆ°á»ng há»£p khi Ã¡p dá»¥ng quy táº¯c cá»™ng"
                         ],
        "prerequisites":  [
                              "kb_toan10_05"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "TÆ° duy Äá»‹nh lÆ°á»£ng TSA",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Tá»• há»£p",
                     "Máº­t mÃ£",
                     "Äáº¿m"
                 ],
        "knowledge_id":  "kb_toan10_05",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t máº­t mÃ£ kÃ©t sáº¯t gá»“m 4 chá»¯ sá»‘ (má»—i chá»¯ sá»‘ tá»« 0 Ä‘áº¿n 9). Má»™t ngÆ°á»i quÃªn máº­t mÃ£ nhÆ°ng nhá»› ráº±ng 4 chá»¯ sá»‘ nÃ y tÄƒng dáº§n tá»« trÃ¡i sang pháº£i (vÃ­ dá»¥ 1248). CÃ³ bao nhiÃªu máº­t mÃ£ thá»a mÃ£n Ä‘iá»u kiá»‡n nÃ y?"
    },
    {
        "id":  "q_tsa_53",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "Máº·t pháº³ng song song Oxyz",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Trong khÃ´ng gian Oxyz, phÆ°Æ¡ng trÃ¬nh máº·t pháº³ng Ä‘i qua gá»‘c tá»a Ä‘á»™ O vÃ  song song vá»›i máº·t pháº³ng \\((P): 2x - 3y + 4z - 12 = 0\\) lÃ :",
        "options":  [
                        "\\(2x - 3y + 4z = 0\\)",
                        "\\(2x - 3y + 4z + 12 = 0\\)",
                        "\\(x - 3y + 2z = 0\\)",
                        "\\(2x + 3y + 4z = 0\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Máº·t pháº³ng song song vá»›i (P) cÃ³ cÃ¹ng vectÆ¡ phÃ¡p tuyáº¿n n = (2, -3, 4). Äi qua O(0,0,0) nÃªn há»‡ sá»‘ tá»± do D = 0 =\u003e 2x - 3y + 4z = 0.",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Oxyz",
                     "Máº·t pháº³ng song song"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Trong khÃ´ng gian Oxyz, phÆ°Æ¡ng trÃ¬nh máº·t pháº³ng Ä‘i qua gá»‘c tá»a Ä‘á»™ O vÃ  song song vá»›i máº·t pháº³ng \\((P): 2x - 3y + 4z - 12 = 0\\) lÃ :"
    },
    {
        "id":  "q_tsa_54",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "ToÃ¡n cao cáº¥p",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "TÃ­nh cháº¥t Ä‘á»‹nh thá»©c nhÃ¢n vÃ´ hÆ°á»›ng",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t ma tráº­n \\(A\\) vuÃ´ng cáº¥p 3 cÃ³ Ä‘á»‹nh thá»©c \\(\\det(A) = 3\\). GiÃ¡ trá»‹ cá»§a \\(\\det(2A)\\) báº±ng:",
        "options":  [
                        "24",
                        "6",
                        "18",
                        "12"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "TÃ­nh cháº¥t Ä‘á»‹nh thá»©c: det(k A) = k^n det(A) vá»›i n lÃ  cáº¥p cá»§a ma tráº­n vuÃ´ng. á»ž Ä‘Ã¢y n = 3, k = 2 =\u003e det(2A) = 2Â³ Â· 3 = 8 Â· 3 = 24.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_dstt_02"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äáº¡i sá»‘ Tuyáº¿n tÃ­nh ÄHBK",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Äá»‹nh thá»©c",
                     "Cáº¥p ma tráº­n",
                     "ÄSTT"
                 ],
        "knowledge_id":  "kb_dstt_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t ma tráº­n \\(A\\) vuÃ´ng cáº¥p 3 cÃ³ Ä‘á»‹nh thá»©c \\(\\det(A) = 3\\). GiÃ¡ trá»‹ cá»§a \\(\\det(2A)\\) báº±ng:"
    },
    {
        "id":  "q_tsa_55",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "XÃ¡c suáº¥t",
        "subtopic":  "HÃ m máº­t Ä‘á»™ xÃ¡c suáº¥t liÃªn tá»¥c",
        "skills":  [
                       "skill_probability",
                       "skill_reasoning",
                       "skill_data_analysis"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Cho hÃ m máº­t Ä‘á»™ xÃ¡c suáº¥t cá»§a biáº¿n ngáº«u nhiÃªn liÃªn tá»¥c X lÃ  \\(f(x) = k x\\) vá»›i \\(0 \\le x \\le 2\\) (vÃ  báº±ng 0 á»Ÿ ngoÃ i khoáº£ng Ä‘Ã³). Háº±ng sá»‘ chuáº©n hÃ³a k báº±ng:",
        "options":  [
                        "\\(\\frac{1}{2}\\)",
                        "1",
                        "2",
                        "\\(\\frac{1}{4}\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Äiá»u kiá»‡n chuáº©n hÃ³a hÃ m máº­t Ä‘á»™: âˆ«â‚€Â² f(x) dx = 1 â‡” âˆ«â‚€Â² k x dx = k [xÂ²/2]â‚€Â² = 2k = 1 =\u003e k = 1/2.",
        "common_traps":  [
                             "Nháº§m giá»¯a biáº¿n cá»‘ Ä‘á»™c láº­p vÃ  biáº¿n cá»‘ xung kháº¯c",
                             "KhÃ´ng Ã¡p dá»¥ng Ä‘Ãºng cÃ´ng thá»©c Bayes",
                             "Äáº¿m láº·p trÆ°á»ng há»£p khi Ã¡p dá»¥ng quy táº¯c cá»™ng"
                         ],
        "prerequisites":  [
                              "kb_toan12_05"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "XÃ¡c suáº¥t Thá»‘ng kÃª TSA",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "HÃ m máº­t Ä‘á»™",
                     "TÃ­ch phÃ¢n xÃ¡c suáº¥t",
                     "Chuáº©n hÃ³a"
                 ],
        "knowledge_id":  "kb_toan12_05",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Cho hÃ m máº­t Ä‘á»™ xÃ¡c suáº¥t cá»§a biáº¿n ngáº«u nhiÃªn liÃªn tá»¥c X lÃ  \\(f(x) = k x\\) vá»›i \\(0 \\le x \\le 2\\) (vÃ  báº±ng 0 á»Ÿ ngoÃ i khoáº£ng Ä‘Ã³). Háº±ng sá»‘ chuáº©n hÃ³a k báº±ng:"
    },
    {
        "id":  "q_hsa_31",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Báº¥t phÆ°Æ¡ng trÃ¬nh logarit nghiá»‡m nguyÃªn",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Nghiá»‡m nguyÃªn nhá» nháº¥t cá»§a báº¥t phÆ°Æ¡ng trÃ¬nh \\(\\log_3(x - 2) \u003e 2\\) lÃ :",
        "options":  [
                        "12",
                        "11",
                        "10",
                        "13"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "logâ‚ƒ(x - 2) \u003e 2 â‡” x - 2 \u003e 3Â² = 9 â‡” x \u003e 11. Nghiá»‡m nguyÃªn nhá» nháº¥t lÃ  x = 12.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan12_02"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Logarit",
                     "Nghiá»‡m nguyÃªn"
                 ],
        "knowledge_id":  "kb_toan12_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Nghiá»‡m nguyÃªn nhá» nháº¥t cá»§a báº¥t phÆ°Æ¡ng trÃ¬nh \\(\\log_3(x - 2) \u003e 2\\) lÃ :"
    },
    {
        "id":  "q_hsa_32",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "Thá»ƒ tÃ­ch lÄƒng trá»¥ tam giÃ¡c Ä‘á»u",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Cho hÃ¬nh lÄƒng trá»¥ tam giÃ¡c Ä‘á»u \\(ABC.A\u0027B\u0027C\u0027\\) cÃ³ cáº¡nh Ä‘Ã¡y báº±ng \\(a\\) vÃ  cáº¡nh bÃªn báº±ng \\(2a\\). Thá»ƒ tÃ­ch cá»§a khá»‘i lÄƒng trá»¥ Ä‘Ã³ lÃ :",
        "options":  [
                        "\\(\\frac{a^3\\sqrt{3}}{2}\\)",
                        "\\(\\frac{a^3\\sqrt{3}}{6}\\)",
                        "\\(a^3\\sqrt{3}\\)",
                        "\\(\\frac{a^3\\sqrt{3}}{4}\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Diá»‡n tÃ­ch Ä‘Ã¡y tam giÃ¡c Ä‘á»u: S = aÂ²âˆš3 / 4.\u003cbr\u003eThá»ƒ tÃ­ch: V = S Â· h = (aÂ²âˆš3 / 4) Â· (2a) = aÂ³âˆš3 / 2.",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "LÄƒng trá»¥ Ä‘á»u",
                     "Thá»ƒ tÃ­ch"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Cho hÃ¬nh lÄƒng trá»¥ tam giÃ¡c Ä‘á»u \\(ABC.A\u0027B\u0027C\u0027\\) cÃ³ cáº¡nh Ä‘Ã¡y báº±ng \\(a\\) vÃ  cáº¡nh bÃªn báº±ng \\(2a\\). Thá»ƒ tÃ­ch cá»§a khá»‘i lÄƒng trá»¥ Ä‘Ã³ lÃ :"
    },
    {
        "id":  "q_hsa_33",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Äá»‹nh lÃ½ ViÃ¨te cho cá»±c trá»‹ báº­c ba",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "Biáº¿t ráº±ng Ä‘á»“ thá»‹ hÃ m sá»‘ \\(y = x^3 - 3x^2 + mx - 1\\) cÃ³ hai Ä‘iá»ƒm cá»±c trá»‹ \\(x_1, x_2\\) thá»a mÃ£n \\(x_1^2 + x_2^2 = 6\\). GiÃ¡ trá»‹ cá»§a tham sá»‘ m báº±ng:",
        "options":  [
                        "-3",
                        "3",
                        "0",
                        "1"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "y\u0027 = 3xÂ² - 6x + m = 0. Theo ViÃ¨te: xâ‚ + xâ‚‚ = 2, xâ‚ Â· xâ‚‚ = m/3.\u003cbr\u003exâ‚Â² + xâ‚‚Â² = (xâ‚ + xâ‚‚)Â² - 2xâ‚ xâ‚‚ = 4 - 2m/3 = 6 â‡” 2m/3 = -2 â‡” m = -3.\u003cbr\u003eKhi m = -3, Î”\u0027 = 9 - 3(-3) = 18 \u003e 0 (thá»a mÃ£n cÃ³ 2 cá»±c trá»‹).",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_01"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "ViÃ¨te",
                     "Cá»±c trá»‹",
                     "Tham sá»‘ m"
                 ],
        "knowledge_id":  "kb_toan12_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Biáº¿t ráº±ng Ä‘á»“ thá»‹ hÃ m sá»‘ \\(y = x^3 - 3x^2 + mx - 1\\) cÃ³ hai Ä‘iá»ƒm cá»±c trá»‹ \\(x_1, x_2\\) thá»a mÃ£n \\(x_1^2 + x_2^2 = 6\\). GiÃ¡ trá»‹ cá»§a tham sá»‘ m báº±ng:"
    },
    {
        "id":  "q_hsa_34",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "XÃ¡c suáº¥t",
        "subtopic":  "XÃ¡c suáº¥t chá»n tá»• há»£p hai nhÃ³m",
        "skills":  [
                       "skill_probability",
                       "skill_reasoning",
                       "skill_data_analysis"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t lá»›p há»c cÃ³ 25 há»c sinh nam vÃ  15 há»c sinh ná»¯. Chá»n ngáº«u nhiÃªn 2 há»c sinh Ä‘i dá»± Ä‘áº¡i há»™i ÄoÃ n. XÃ¡c suáº¥t Ä‘á»ƒ chá»n Ä‘Æ°á»£c 1 há»c sinh nam vÃ  1 há»c sinh ná»¯ lÃ :",
        "options":  [
                        "\\(\\frac{25}{52}\\)",
                        "\\(\\frac{15}{52}\\)",
                        "\\(\\frac{1}{2}\\)",
                        "\\(\\frac{5}{13}\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "n(Î©) = Câ‚„â‚€Â² = 780.\u003cbr\u003eSá»‘ cÃ¡ch chá»n 1 nam vÃ  1 ná»¯: 25 Ã— 15 = 375.\u003cbr\u003eXÃ¡c suáº¥t P = 375 / 780 = 25 / 52.",
        "common_traps":  [
                             "Nháº§m giá»¯a biáº¿n cá»‘ Ä‘á»™c láº­p vÃ  biáº¿n cá»‘ xung kháº¯c",
                             "KhÃ´ng Ã¡p dá»¥ng Ä‘Ãºng cÃ´ng thá»©c Bayes",
                             "Äáº¿m láº·p trÆ°á»ng há»£p khi Ã¡p dá»¥ng quy táº¯c cá»™ng"
                         ],
        "prerequisites":  [
                              "kb_toan10_05"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "XÃ¡c suáº¥t",
                     "Tá»• há»£p"
                 ],
        "knowledge_id":  "kb_toan10_05",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t lá»›p há»c cÃ³ 25 há»c sinh nam vÃ  15 há»c sinh ná»¯. Chá»n ngáº«u nhiÃªn 2 há»c sinh Ä‘i dá»± Ä‘áº¡i há»™i ÄoÃ n. XÃ¡c suáº¥t Ä‘á»ƒ chá»n Ä‘Æ°á»£c 1 há»c sinh nam vÃ  1 há»c sinh ná»¯ lÃ :"
    },
    {
        "id":  "q_hsa_35",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "Máº·t pháº³ng trung trá»±c Oxyz",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Trong khÃ´ng gian Oxyz, cho hai Ä‘iá»ƒm \\(A(1, 1, 2)\\) vÃ  \\(B(3, 5, 4)\\). PhÆ°Æ¡ng trÃ¬nh máº·t pháº³ng trung trá»±c cá»§a Ä‘oáº¡n tháº³ng AB lÃ :",
        "options":  [
                        "\\(x + 2y + z - 11 = 0\\)",
                        "\\(x + 2y + z + 11 = 0\\)",
                        "\\(2x + 4y + 2z - 9 = 0\\)",
                        "\\(x + 2y - z - 5 = 0\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Trung Ä‘iá»ƒm M cá»§a AB lÃ  M(2, 3, 3).\u003cbr\u003eVectÆ¡ AB = (2, 4, 2) = 2(1, 2, 1).\u003cbr\u003eMáº·t pháº³ng trung trá»±c qua M nháº­n n = (1, 2, 1) lÃ m phÃ¡p tuyáº¿n:\u003cbr\u003e1(x - 2) + 2(y - 3) + 1(z - 3) = 0 â‡” x + 2y + z - 11 = 0.",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Oxyz",
                     "Máº·t pháº³ng trung trá»±c"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Trong khÃ´ng gian Oxyz, cho hai Ä‘iá»ƒm \\(A(1, 1, 2)\\) vÃ  \\(B(3, 5, 4)\\). PhÆ°Æ¡ng trÃ¬nh máº·t pháº³ng trung trá»±c cá»§a Ä‘oáº¡n tháº³ng AB lÃ :"
    },
    {
        "id":  "q_hsa_36",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Tá»‘i Æ°u hÃ³a diá»‡n tÃ­ch hÃ ng rÃ o",
        "skills":  [
                       "skill_modeling",
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t ngÆ°á»i nÃ´ng dÃ¢n muá»‘n rÃ o má»™t khu vÆ°á»n hÃ¬nh chá»¯ nháº­t cÃ³ má»™t cáº¡nh giÃ¡p bá» sÃ´ng (khÃ´ng cáº§n lÃ m rÃ o á»Ÿ cáº¡nh nÃ y). Tá»•ng chiá»u dÃ i lÆ°á»›i thÃ©p cÃ³ sáºµn lÃ  120 m. Diá»‡n tÃ­ch lá»›n nháº¥t cá»§a khu vÆ°á»n mÃ  ngÆ°á»i Ä‘Ã³ cÃ³ thá»ƒ rÃ o Ä‘Æ°á»£c lÃ :",
        "options":  [
                        "1800 mÂ²",
                        "3600 mÂ²",
                        "2400 mÂ²",
                        "1600 mÂ²"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Gá»i x lÃ  Ä‘á»™ dÃ i 2 cáº¡nh vuÃ´ng gÃ³c vá»›i bá» sÃ´ng (x \u003e 0). Cáº¡nh song song bá» sÃ´ng cÃ³ chiá»u dÃ i 120 - 2x.\u003cbr\u003eDiá»‡n tÃ­ch: S(x) = x(120 - 2x) = -2xÂ² + 120x.\u003cbr\u003eParabol Ä‘áº¡t cá»±c Ä‘áº¡i táº¡i x = -120 / (2 Â· (-2)) = 30 m.\u003cbr\u003eDiá»‡n tÃ­ch lá»›n nháº¥t S_max = 30 Â· (120 - 60) = 1800 mÂ².",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan10_03"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Tá»‘i Æ°u parabol",
                     "HÃ¬nh chá»¯ nháº­t"
                 ],
        "knowledge_id":  "kb_toan10_03",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t ngÆ°á»i nÃ´ng dÃ¢n muá»‘n rÃ o má»™t khu vÆ°á»n hÃ¬nh chá»¯ nháº­t cÃ³ má»™t cáº¡nh giÃ¡p bá» sÃ´ng (khÃ´ng cáº§n lÃ m rÃ o á»Ÿ cáº¡nh nÃ y). Tá»•ng chiá»u dÃ i lÆ°á»›i thÃ©p cÃ³ sáºµn lÃ  120 m. Diá»‡n tÃ­ch lá»›n nháº¥t cá»§a khu vÆ°á»n mÃ  ngÆ°á»i Ä‘Ã³ cÃ³ thá»ƒ rÃ o Ä‘Æ°á»£c lÃ :"
    },
    {
        "id":  "q_hsa_37",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Táº­p há»£p Ä‘iá»ƒm biá»ƒu diá»…n sá»‘ phá»©c",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Táº­p há»£p cÃ¡c Ä‘iá»ƒm biá»ƒu diá»…n sá»‘ phá»©c z thá»a mÃ£n Ä‘iá»u kiá»‡n \\(|z - 1 + 2i| = 3\\) trong máº·t pháº³ng phá»©c lÃ :",
        "options":  [
                        "ÄÆ°á»ng trÃ²n tÃ¢m I(1, -2), bÃ¡n kÃ­nh R = 3",
                        "ÄÆ°á»ng trÃ²n tÃ¢m I(-1, 2), bÃ¡n kÃ­nh R = 3",
                        "ÄÆ°á»ng trÃ²n tÃ¢m I(1, -2), bÃ¡n kÃ­nh R = 9",
                        "ÄÆ°á»ng tháº³ng x - 2y = 3"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Äáº·t z = x + yi. Ta cÃ³ |(x - 1) + (y + 2)i| = 3 â‡” (x - 1)Â² + (y + 2)Â² = 9.\u003cbr\u003eÄÃ¢y lÃ  phÆ°Æ¡ng trÃ¬nh Ä‘Æ°á»ng trÃ²n tÃ¢m I(1, -2) vÃ  bÃ¡n kÃ­nh R = 3.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan12_02"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Sá»‘ phá»©c",
                     "Táº­p há»£p Ä‘iá»ƒm",
                     "ÄÆ°á»ng trÃ²n"
                 ],
        "knowledge_id":  "kb_toan12_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Táº­p há»£p cÃ¡c Ä‘iá»ƒm biá»ƒu diá»…n sá»‘ phá»©c z thá»a mÃ£n Ä‘iá»u kiá»‡n \\(|z - 1 + 2i| = 3\\) trong máº·t pháº³ng phá»©c lÃ :"
    },
    {
        "id":  "q_hsa_38",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "NguyÃªn hÃ m lÆ°á»£ng giÃ¡c cÆ¡ báº£n",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "NguyÃªn hÃ m cá»§a hÃ m sá»‘ \\(f(x) = \\cos(3x + 1)\\) lÃ :",
        "options":  [
                        "\\(\\frac{1}{3}\\sin(3x + 1) + C\\)",
                        "\\(-\\frac{1}{3}\\sin(3x + 1) + C\\)",
                        "\\(3\\sin(3x + 1) + C\\)",
                        "\\(\\sin(3x + 1) + C\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "âˆ« cos(ax + b) dx = (1/a) sin(ax + b) + C. Vá»›i a = 3 =\u003e (1/3) sin(3x + 1) + C.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_03"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "NguyÃªn hÃ m",
                     "LÆ°á»£ng giÃ¡c"
                 ],
        "knowledge_id":  "kb_toan12_03",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "NguyÃªn hÃ m cá»§a hÃ m sá»‘ \\(f(x) = \\cos(3x + 1)\\) lÃ :"
    },
    {
        "id":  "q_hsa_39",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "ÄÆ°á»ng sinh hÃ¬nh nÃ³n",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t hÃ¬nh nÃ³n cÃ³ bÃ¡n kÃ­nh Ä‘Ã¡y \\(r = 5\\) vÃ  diá»‡n tÃ­ch xung quanh \\(S_{xq} = 65\\pi\\). Äá»™ dÃ i Ä‘Æ°á»ng sinh \\(l\\) cá»§a hÃ¬nh nÃ³n báº±ng:",
        "options":  [
                        "13",
                        "12",
                        "10",
                        "15"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "S_xq = Ï€ r l â‡” 65Ï€ = Ï€ Â· 5 Â· l =\u003e l = 65 / 5 = 13.",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "HÃ¬nh nÃ³n",
                     "ÄÆ°á»ng sinh"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t hÃ¬nh nÃ³n cÃ³ bÃ¡n kÃ­nh Ä‘Ã¡y \\(r = 5\\) vÃ  diá»‡n tÃ­ch xung quanh \\(S_{xq} = 65\\pi\\). Äá»™ dÃ i Ä‘Æ°á»ng sinh \\(l\\) cá»§a hÃ¬nh nÃ³n báº±ng:"
    },
    {
        "id":  "q_hsa_40",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Báº¥t phÆ°Æ¡ng trÃ¬nh mÅ©",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Báº¥t phÆ°Æ¡ng trÃ¬nh \\(3^{x^2 - 4} \\ge 1\\) cÃ³ táº­p nghiá»‡m lÃ :",
        "options":  [
                        "\\((-\\infty; -2] \\cup [2; +\\infty)\\)",
                        "\\([-2; 2]\\)",
                        "\\((-\\infty; -2) \\cup (2; +\\infty)\\)",
                        "\\(\\mathbb{R}\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "3^{xÂ² - 4} â‰¥ 3â° â‡” xÂ² - 4 â‰¥ 0 â‡” x â‰¤ -2 hoáº·c x â‰¥ 2. Táº­p nghiá»‡m: (-âˆž; -2] âˆª [2; +âˆž).",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan12_02"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "MÅ©",
                     "Báº¥t phÆ°Æ¡ng trÃ¬nh"
                 ],
        "knowledge_id":  "kb_toan12_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Báº¥t phÆ°Æ¡ng trÃ¬nh \\(3^{x^2 - 4} \\ge 1\\) cÃ³ táº­p nghiá»‡m lÃ :"
    },
    {
        "id":  "q_thpt_21",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "Thá»ƒ tÃ­ch khá»‘i chÃ³p tá»© giÃ¡c Ä‘á»u",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Thá»ƒ tÃ­ch khá»‘i chÃ³p tá»© giÃ¡c Ä‘á»u cÃ³ cáº¡nh Ä‘Ã¡y báº±ng \\(a\\) vÃ  chiá»u cao báº±ng \\(a\\sqrt{3}\\) lÃ :",
        "options":  [
                        "\\(\\frac{a^3\\sqrt{3}}{3}\\)",
                        "\\(a^3\\sqrt{3}\\)",
                        "\\(\\frac{a^3\\sqrt{3}}{6}\\)",
                        "\\(\\frac{a^3}{3}\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "V = (1/3) Â· S_Ä‘Ã¡y Â· h = (1/3) Â· aÂ² Â· aâˆš3 = aÂ³âˆš3 / 3.",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Khá»‘i chÃ³p",
                     "Thá»ƒ tÃ­ch"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Thá»ƒ tÃ­ch khá»‘i chÃ³p tá»© giÃ¡c Ä‘á»u cÃ³ cáº¡nh Ä‘Ã¡y báº±ng \\(a\\) vÃ  chiá»u cao báº±ng \\(a\\sqrt{3}\\) lÃ :"
    },
    {
        "id":  "q_thpt_22",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Giao Ä‘iá»ƒm hai Ä‘Æ°á»ng tiá»‡m cáº­n",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Tá»a Ä‘á»™ giao Ä‘iá»ƒm cá»§a hai Ä‘Æ°á»ng tiá»‡m cáº­n cá»§a Ä‘á»“ thá»‹ hÃ m sá»‘ \\(y = \\frac{3x + 2}{x - 1}\\) lÃ :",
        "options":  [
                        "\\((1, 3)\\)",
                        "\\((-1, 3)\\)",
                        "\\((1, -3)\\)",
                        "\\((3, 1)\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Tiá»‡m cáº­n Ä‘á»©ng: x = 1. Tiá»‡m cáº­n ngang: y = 3. Giao Ä‘iá»ƒm lÃ  I(1, 3).",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_01"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Tiá»‡m cáº­n",
                     "TÃ¢m Ä‘á»‘i xá»©ng"
                 ],
        "knowledge_id":  "kb_toan12_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Tá»a Ä‘á»™ giao Ä‘iá»ƒm cá»§a hai Ä‘Æ°á»ng tiá»‡m cáº­n cá»§a Ä‘á»“ thá»‹ hÃ m sá»‘ \\(y = \\frac{3x + 2}{x - 1}\\) lÃ :"
    },
    {
        "id":  "q_thpt_23",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "PhÃ©p nhÃ¢n hai sá»‘ phá»©c",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Cho hai sá»‘ phá»©c \\(z_1 = 1 + 2i\\) vÃ  \\(z_2 = 2 - i\\). Sá»‘ phá»©c \\(w = z_1 \\cdot z_2\\) báº±ng:",
        "options":  [
                        "\\(4 + 3i\\)",
                        "\\(4 - 3i\\)",
                        "\\(2 - 2i\\)",
                        "\\(5i\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "(1 + 2i)(2 - i) = 2 - i + 4i - 2iÂ² = 2 + 3i + 2 = 4 + 3i.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan12_02"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Sá»‘ phá»©c",
                     "NhÃ¢n sá»‘ phá»©c"
                 ],
        "knowledge_id":  "kb_toan12_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Cho hai sá»‘ phá»©c \\(z_1 = 1 + 2i\\) vÃ  \\(z_2 = 2 - i\\). Sá»‘ phá»©c \\(w = z_1 \\cdot z_2\\) báº±ng:"
    },
    {
        "id":  "q_thpt_24",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "Khoáº£ng cÃ¡ch giá»¯a hai Ä‘iá»ƒm Oxyz",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Trong khÃ´ng gian Oxyz, khoáº£ng cÃ¡ch giá»¯a Ä‘iá»ƒm \\(A(1, 2, 3)\\) vÃ  Ä‘iá»ƒm \\(B(4, 2, -1)\\) báº±ng:",
        "options":  [
                        "5",
                        "25",
                        "âˆš7",
                        "4"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "AB = âˆš[(4 - 1)Â² + (2 - 2)Â² + (-1 - 3)Â²] = âˆš[3Â² + 0Â² + (-4)Â²] = âˆš[9 + 16] = 5.",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Oxyz",
                     "Khoáº£ng cÃ¡ch hai Ä‘iá»ƒm"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Trong khÃ´ng gian Oxyz, khoáº£ng cÃ¡ch giá»¯a Ä‘iá»ƒm \\(A(1, 2, 3)\\) vÃ  Ä‘iá»ƒm \\(B(4, 2, -1)\\) báº±ng:"
    },
    {
        "id":  "q_thpt_25",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "TÃ­ch phÃ¢n Ä‘a thá»©c cÆ¡ báº£n",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "GiÃ¡ trá»‹ cá»§a tÃ­ch phÃ¢n \\(I = \\int_0^1 (3x^2 + 2x) dx\\) báº±ng:",
        "options":  [
                        "2",
                        "1",
                        "3",
                        "5"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "I = [xÂ³ + xÂ²]â‚€Â¹ = (1 + 1) - 0 = 2.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_03"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "TÃ­ch phÃ¢n",
                     "CÆ¡ báº£n"
                 ],
        "knowledge_id":  "kb_toan12_03",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "GiÃ¡ trá»‹ cá»§a tÃ­ch phÃ¢n \\(I = \\int_0^1 (3x^2 + 2x) dx\\) báº±ng:"
    },
    {
        "id":  "q_calc_16",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "Giáº£i tÃ­ch 1",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "PhÆ°Æ¡ng trÃ¬nh vi phÃ¢n cáº¥p 2 Ä‘áº·c trÆ°ng",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Nghiá»‡m tá»•ng quÃ¡t cá»§a phÆ°Æ¡ng trÃ¬nh vi phÃ¢n thuáº§n nháº¥t cáº¥p 2: \\(y\u0027\u0027 - 4y = 0\\) lÃ :",
        "options":  [
                        "\\(y = C_1 e^{2x} + C_2 e^{-2x}\\)",
                        "\\(y = C_1 \\cos 2x + C_2 \\sin 2x\\)",
                        "\\(y = (C_1 + C_2 x) e^{2x}\\)",
                        "\\(y = C_1 e^{4x} + C_2\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "PhÆ°Æ¡ng trÃ¬nh Ä‘áº·c trÆ°ng: kÂ² - 4 = 0 â‡” k = Â±2.\u003cbr\u003eHai nghiá»‡m thá»±c phÃ¢n biá»‡t nÃªn nghiá»‡m tá»•ng quÃ¡t lÃ : y = Câ‚ e^{2x} + Câ‚‚ e^{-2x}.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_gt1_05"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "ToÃ¡n Cao Cáº¥p ÄHBK HÃ  Ná»™i",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "PT vi phÃ¢n",
                     "PhÆ°Æ¡ng trÃ¬nh Ä‘áº·c trÆ°ng"
                 ],
        "knowledge_id":  "kb_gt1_05",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Nghiá»‡m tá»•ng quÃ¡t cá»§a phÆ°Æ¡ng trÃ¬nh vi phÃ¢n thuáº§n nháº¥t cáº¥p 2: \\(y\u0027\u0027 - 4y = 0\\) lÃ :"
    },
    {
        "id":  "q_calc_17",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "Giáº£i tÃ­ch 1",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Giá»›i háº¡n hÃ m nhiá»u biáº¿n",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "TÃ­nh giá»›i háº¡n hai biáº¿n \\(L = \\lim_{(x, y) \\to (0, 0)} \\frac{x y}{x^2 + y^2}\\) (hoáº·c káº¿t luáº­n náº¿u khÃ´ng tá»“n táº¡i).",
        "options":  [
                        "KhÃ´ng tá»“n táº¡i giá»›i háº¡n",
                        "0",
                        "1/2",
                        "1"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Tiáº¿n theo Ä‘Æ°á»ng tháº³ng y = kx: lim x(kx) / [xÂ² + kÂ²xÂ²] = k / (1 + kÂ²).\u003cbr\u003eGiá»›i háº¡n phá»¥ thuá»™c vÃ o há»‡ sá»‘ gÃ³c k cá»§a phÆ°Æ¡ng tiáº¿n tá»›i (vÃ­ dá»¥ k = 0 thÃ¬ L = 0, k = 1 thÃ¬ L = 1/2), do Ä‘Ã³ giá»›i háº¡n khÃ´ng tá»“n táº¡i.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_gt1_01"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "ToÃ¡n Cao Cáº¥p ÄHBK HÃ  Ná»™i",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "HÃ m nhiá»u biáº¿n",
                     "Giá»›i háº¡n"
                 ],
        "knowledge_id":  "kb_gt1_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "TÃ­nh giá»›i háº¡n hai biáº¿n \\(L = \\lim_{(x, y) \\to (0, 0)} \\frac{x y}{x^2 + y^2}\\) (hoáº·c káº¿t luáº­n náº¿u khÃ´ng tá»“n táº¡i)."
    },
    {
        "id":  "q_calc_18",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "ToÃ¡n cao cáº¥p",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Háº¡ng ma tráº­n",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Háº¡ng cá»§a ma tráº­n \\(A = \\begin{pmatrix} 1 \u0026 2 \u0026 3 \\\\ 2 \u0026 4 \u0026 6 \\\\ -1 \u0026 -2 \u0026 -3 \\end{pmatrix}\\) báº±ng:",
        "options":  [
                        "1",
                        "2",
                        "3",
                        "0"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "HÃ ng 2 báº±ng 2 láº§n hÃ ng 1, hÃ ng 3 báº±ng -1 láº§n hÃ ng 1. Cáº£ hai hÃ ng 2 vÃ  3 Ä‘á»u tá»‰ lá»‡ vá»›i hÃ ng 1 nÃªn bá»‹ triá»‡t tiÃªu khi khá»­ Gauss. Háº¡ng ma tráº­n báº±ng 1.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_dstt_03"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äáº¡i sá»‘ Tuyáº¿n tÃ­nh ÄHBK",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Háº¡ng ma tráº­n",
                     "Khá»­ Gauss",
                     "ÄSTT"
                 ],
        "knowledge_id":  "kb_dstt_03",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Háº¡ng cá»§a ma tráº­n \\(A = \\begin{pmatrix} 1 \u0026 2 \u0026 3 \\\\ 2 \u0026 4 \u0026 6 \\\\ -1 \u0026 -2 \u0026 -3 \\end{pmatrix}\\) báº±ng:"
    },
    {
        "id":  "q_calc_19",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "Giáº£i tÃ­ch 1",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Äáº¡o hÃ m riÃªng hÃ m nhiá»u biáº¿n",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Äáº¡o hÃ m riÃªng cáº¥p 1 theo biáº¿n x cá»§a hÃ m hai biáº¿n \\(f(x, y) = x^3 y^2 + \\sin(x y)\\) lÃ :",
        "options":  [
                        "\\(f\u0027_x = 3x^2 y^2 + y\\cos(xy)\\)",
                        "\\(f\u0027_x = 3x^2 y^2 + \\cos(xy)\\)",
                        "\\(f\u0027_x = 2x^3 y + x\\cos(xy)\\)",
                        "\\(f\u0027_x = 3x^2 + y\\cos(xy)\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Coi y lÃ  háº±ng sá»‘, Ä‘áº¡o hÃ m theo x: (xÂ³ yÂ²)\u0027_x = 3xÂ² yÂ²; (sin(xy))\u0027_x = y cos(xy). Váº­y f\u0027_x = 3xÂ² yÂ² + y cos(xy).",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_gt1_02"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "ToÃ¡n Cao Cáº¥p ÄHBK HÃ  Ná»™i",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Äáº¡o hÃ m riÃªng",
                     "HÃ m hai biáº¿n"
                 ],
        "knowledge_id":  "kb_gt1_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Äáº¡o hÃ m riÃªng cáº¥p 1 theo biáº¿n x cá»§a hÃ m hai biáº¿n \\(f(x, y) = x^3 y^2 + \\sin(x y)\\) lÃ :"
    },
    {
        "id":  "q_calc_20",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "ToÃ¡n cao cáº¥p",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Váº¿t cá»§a ma tráº­n vuÃ´ng",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Váº¿t (Trace) cá»§a ma tráº­n \\(A = \\begin{pmatrix} 5 \u0026 2 \u0026 1 \\\\ 0 \u0026 -3 \u0026 4 \\\\ 1 \u0026 1 \u0026 7 \\end{pmatrix}\\) báº±ng:",
        "options":  [
                        "9",
                        "15",
                        "5",
                        "10"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Váº¿t cá»§a ma tráº­n vuÃ´ng lÃ  tá»•ng cÃ¡c pháº§n tá»­ trÃªn Ä‘Æ°á»ng chÃ©o chÃ­nh: tr(A) = 5 + (-3) + 7 = 9.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_dstt_04"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äáº¡i sá»‘ Tuyáº¿n tÃ­nh ÄHBK",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Trace",
                     "Váº¿t ma tráº­n",
                     "ÄSTT"
                 ],
        "knowledge_id":  "kb_dstt_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Váº¿t (Trace) cá»§a ma tráº­n \\(A = \\begin{pmatrix} 5 \u0026 2 \u0026 1 \\\\ 0 \u0026 -3 \u0026 4 \\\\ 1 \u0026 1 \u0026 7 \\end{pmatrix}\\) báº±ng:"
    },
    {
        "id":  "q_tsa_56",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "DÃ²ng Ä‘iá»‡n xoay chiá»u giÃ¡ trá»‹ hiá»‡u dá»¥ng",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t máº¡ch Ä‘iá»‡n xoay chiá»u cÃ³ cÆ°á»ng Ä‘á»™ dÃ²ng Ä‘iá»‡n tá»©c thá»i \\(i(t) = 4\\cos(100\\pi t - \\pi/4)\\) (A). CÆ°á»ng Ä‘á»™ hiá»‡u dá»¥ng cá»§a dÃ²ng Ä‘iá»‡n báº±ng:",
        "options":  [
                        "\\(2\\sqrt{2}\\text{ A}\\)",
                        "\\(4\\text{ A}\\)",
                        "\\(2\\text{ A}\\)",
                        "\\(4\\sqrt{2}\\text{ A}\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "CÆ°á»ng Ä‘á»™ hiá»‡u dá»¥ng báº±ng cá»±c Ä‘áº¡i chia cho âˆš2: I = Iâ‚€ / âˆš2 = 4 / âˆš2 = 2âˆš2 A.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan11_01"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "TÆ° duy Khoa há»c TSA",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "DÃ²ng Ä‘iá»‡n",
                     "Hiá»‡u dá»¥ng",
                     "LÆ°á»£ng giÃ¡c"
                 ],
        "knowledge_id":  "kb_toan11_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t máº¡ch Ä‘iá»‡n xoay chiá»u cÃ³ cÆ°á»ng Ä‘á»™ dÃ²ng Ä‘iá»‡n tá»©c thá»i \\(i(t) = 4\\cos(100\\pi t - \\pi/4)\\) (A). CÆ°á»ng Ä‘á»™ hiá»‡u dá»¥ng cá»§a dÃ²ng Ä‘iá»‡n báº±ng:"
    },
    {
        "id":  "q_tsa_57",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Äá»™ cao cá»±c Ä‘áº¡i nÃ©m Ä‘á»©ng",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t quáº£ bÃ³ng Ä‘Æ°á»£c nÃ©m tháº³ng Ä‘á»©ng lÃªn cao tá»« máº·t Ä‘áº¥t vá»›i váº­n tá»‘c ban Ä‘áº§u \\(v_0 = 20\\text{ m/s}\\). Láº¥y \\(g = 10\\text{ m/s}^2\\), bá» qua sá»©c cáº£n khÃ´ng khÃ­. Äá»™ cao cá»±c Ä‘áº¡i mÃ  quáº£ bÃ³ng Ä‘áº¡t Ä‘Æ°á»£c lÃ :",
        "options":  [
                        "20 m",
                        "40 m",
                        "10 m",
                        "25 m"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "PhÆ°Æ¡ng trÃ¬nh chuyá»ƒn Ä‘á»™ng: y(t) = vâ‚€ t - (1/2)gtÂ² = 20t - 5tÂ².\u003cbr\u003eVáº­n tá»‘c v(t) = 20 - 10t = 0 â‡” t = 2 s.\u003cbr\u003eÄá»™ cao cá»±c Ä‘áº¡i: y(2) = 20(2) - 5(4) = 40 - 20 = 20 m.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan10_03"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "NÃ©m Ä‘á»©ng",
                     "Parabol",
                     "Cá»±c trá»‹"
                 ],
        "knowledge_id":  "kb_toan10_03",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t quáº£ bÃ³ng Ä‘Æ°á»£c nÃ©m tháº³ng Ä‘á»©ng lÃªn cao tá»« máº·t Ä‘áº¥t vá»›i váº­n tá»‘c ban Ä‘áº§u \\(v_0 = 20\\text{ m/s}\\). Láº¥y \\(g = 10\\text{ m/s}^2\\), bá» qua sá»©c cáº£n khÃ´ng khÃ­. Äá»™ cao cá»±c Ä‘áº¡i mÃ  quáº£ bÃ³ng Ä‘áº¡t Ä‘Æ°á»£c lÃ :"
    },
    {
        "id":  "q_tsa_58",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "XÃ¡c suáº¥t",
        "subtopic":  "Quy táº¯c nhÃ¢n xÃ¡c suáº¥t",
        "skills":  [
                       "skill_probability",
                       "skill_reasoning",
                       "skill_data_analysis"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Má»™t ngÆ°á»i cÃ³ 3 chiáº¿c Ã¡o sÆ¡ mi khÃ¡c mÃ u vÃ  4 chiáº¿c quáº§n Ã¢u khÃ¡c mÃ u. Sá»‘ cÃ¡ch phá»‘i 1 bá»™ trang phá»¥c (gá»“m 1 Ã¡o vÃ  1 quáº§n) lÃ :",
        "options":  [
                        "12 cÃ¡ch",
                        "7 cÃ¡ch",
                        "14 cÃ¡ch",
                        "24 cÃ¡ch"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Theo quy táº¯c nhÃ¢n: 3 Ã— 4 = 12 cÃ¡ch phá»‘i Ä‘á»“.",
        "common_traps":  [
                             "Nháº§m giá»¯a biáº¿n cá»‘ Ä‘á»™c láº­p vÃ  biáº¿n cá»‘ xung kháº¯c",
                             "KhÃ´ng Ã¡p dá»¥ng Ä‘Ãºng cÃ´ng thá»©c Bayes",
                             "Äáº¿m láº·p trÆ°á»ng há»£p khi Ã¡p dá»¥ng quy táº¯c cá»™ng"
                         ],
        "prerequisites":  [
                              "kb_toan10_05"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Quy táº¯c nhÃ¢n",
                     "Tá»• há»£p"
                 ],
        "knowledge_id":  "kb_toan10_05",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Má»™t ngÆ°á»i cÃ³ 3 chiáº¿c Ã¡o sÆ¡ mi khÃ¡c mÃ u vÃ  4 chiáº¿c quáº§n Ã¢u khÃ¡c mÃ u. Sá»‘ cÃ¡ch phá»‘i 1 bá»™ trang phá»¥c (gá»“m 1 Ã¡o vÃ  1 quáº§n) lÃ :"
    },
    {
        "id":  "q_tsa_59",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Giao cá»§a hai táº­p há»£p sá»‘ thá»±c",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Cho hai táº­p há»£p \\(A = (-\\infty; 3]\\) vÃ  \\(B = [1; 5)\\). Táº­p há»£p \\(A \\cap B\\) lÃ :",
        "options":  [
                        "\\([1; 3]\\)",
                        "\\((-\\infty; 5)\\)",
                        "\\((1; 3)\\)",
                        "\\([1; 3)\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Giao cá»§a hai táº­p há»£p: cÃ¡c sá»‘ x thá»a mÃ£n x â‰¤ 3 vÃ  1 â‰¤ x \u003c 5 =\u003e 1 â‰¤ x â‰¤ 3 =\u003e [1; 3].",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan10_01"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi TSA BÃ¡ch Khoa",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Táº­p há»£p",
                     "Giao táº­p há»£p"
                 ],
        "knowledge_id":  "kb_toan10_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Cho hai táº­p há»£p \\(A = (-\\infty; 3]\\) vÃ  \\(B = [1; 5)\\). Táº­p há»£p \\(A \\cap B\\) lÃ :"
    },
    {
        "id":  "q_tsa_60",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "TSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Äá»‹nh lÃ½ Ramsey trong toÃ¡n rá»i ráº¡c",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "KhÃ³",
        "difficulty_score":  0.88,
        "cognitive_level":  "M4",
        "estimated_time_seconds":  120,
        "question":  "Trong má»™t máº¡ng xÃ£ há»™i ná»™i bá»™ gá»“m 6 thÃ nh viÃªn, má»—i cáº·p thÃ nh viÃªn hoáº·c quen nhau hoáº·c khÃ´ng quen nhau. Theo Ä‘á»‹nh lÃ½ Ramsey, trong nhÃ³m nÃ y luÃ´n cÃ³ Ã­t nháº¥t bao nhiÃªu ngÆ°á»i Ä‘Ã´i má»™t quen nhau hoáº·c Ä‘Ã´i má»™t khÃ´ng quen nhau?",
        "options":  [
                        "3 ngÆ°á»i",
                        "4 ngÆ°á»i",
                        "2 ngÆ°á»i",
                        "5 ngÆ°á»i"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Äá»‹nh lÃ½ Ramsey R(3, 3) = 6: Trong báº¥t ká»³ nhÃ³m 6 ngÆ°á»i nÃ o, luÃ´n tá»“n táº¡i Ã­t nháº¥t 3 ngÆ°á»i Ä‘Ã´i má»™t quen nhau hoáº·c Ä‘Ã´i má»™t khÃ´ng quen nhau.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan10_01"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "TÆ° duy Logic ToÃ¡n rá»i ráº¡c TSA",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Ramsey",
                     "ToÃ¡n rá»i ráº¡c",
                     "Äá»“ thá»‹"
                 ],
        "knowledge_id":  "kb_toan10_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Trong má»™t máº¡ng xÃ£ há»™i ná»™i bá»™ gá»“m 6 thÃ nh viÃªn, má»—i cáº·p thÃ nh viÃªn hoáº·c quen nhau hoáº·c khÃ´ng quen nhau. Theo Ä‘á»‹nh lÃ½ Ramsey, trong nhÃ³m nÃ y luÃ´n cÃ³ Ã­t nháº¥t bao nhiÃªu ngÆ°á»i Ä‘Ã´i má»™t quen nhau hoáº·c Ä‘Ã´i má»™t khÃ´ng quen nhau?"
    },
    {
        "id":  "q_hsa_46",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "CÃ´ng thá»©c Heron tÃ­nh diá»‡n tÃ­ch tam giÃ¡c",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Cho tam giÃ¡c ABC cÃ³ ba cáº¡nh \\(a = 5, b = 6, c = 7\\). Diá»‡n tÃ­ch cá»§a tam giÃ¡c ABC theo cÃ´ng thá»©c Heron báº±ng:",
        "options":  [
                        "\\(6\\sqrt{6}\\)",
                        "\\(12\\sqrt{3}\\)",
                        "\\(18\\)",
                        "\\(8\\sqrt{5}\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Ná»­a chu vi p = (5 + 6 + 7) / 2 = 9.\u003cbr\u003eHeron: S = âˆš[9(9 - 5)(9 - 6)(9 - 7)] = âˆš[9 Â· 4 Â· 3 Â· 2] = âˆš216 = 6âˆš6.",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan10_04"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Heron",
                     "Diá»‡n tÃ­ch tam giÃ¡c",
                     "HÃ¬nh há»c pháº³ng"
                 ],
        "knowledge_id":  "kb_toan10_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Cho tam giÃ¡c ABC cÃ³ ba cáº¡nh \\(a = 5, b = 6, c = 7\\). Diá»‡n tÃ­ch cá»§a tam giÃ¡c ABC theo cÃ´ng thá»©c Heron báº±ng:"
    },
    {
        "id":  "q_hsa_47",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "TÃ¢m Ä‘á»‘i xá»©ng Ä‘á»“ thá»‹ hÃ m phÃ¢n thá»©c",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Äá»“ thá»‹ hÃ m sá»‘ \\(y = \\frac{2x + 1}{x - 3}\\) cÃ³ tÃ¢m Ä‘á»‘i xá»©ng lÃ  Ä‘iá»ƒm nÃ o?",
        "options":  [
                        "\\(I(3, 2)\\)",
                        "\\(I(-3, 2)\\)",
                        "\\(I(3, -2)\\)",
                        "\\(I(2, 3)\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "TÃ¢m Ä‘á»‘i xá»©ng cá»§a Ä‘á»“ thá»‹ hÃ m phÃ¢n thá»©c báº­c nháº¥t lÃ  giao Ä‘iá»ƒm cá»§a 2 Ä‘Æ°á»ng tiá»‡m cáº­n: tiá»‡m cáº­n Ä‘á»©ng x = 3, tiá»‡m cáº­n ngang y = 2 =\u003e I(3, 2).",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_01"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "TÃ¢m Ä‘á»‘i xá»©ng",
                     "Tiá»‡m cáº­n"
                 ],
        "knowledge_id":  "kb_toan12_01",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Äá»“ thá»‹ hÃ m sá»‘ \\(y = \\frac{2x + 1}{x - 3}\\) cÃ³ tÃ¢m Ä‘á»‘i xá»©ng lÃ  Ä‘iá»ƒm nÃ o?"
    },
    {
        "id":  "q_hsa_48",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "PhÆ°Æ¡ng trÃ¬nh Ä‘Æ°á»ng trÃ²n pháº³ng",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Trong máº·t pháº³ng Oxy, phÆ°Æ¡ng trÃ¬nh Ä‘Æ°á»ng trÃ²n cÃ³ tÃ¢m \\(I(1, -2)\\) vÃ  Ä‘i qua Ä‘iá»ƒm \\(A(4, 2)\\) lÃ :",
        "options":  [
                        "\\((x - 1)^2 + (y + 2)^2 = 25\\)",
                        "\\((x - 1)^2 + (y + 2)^2 = 5\\)",
                        "\\((x + 1)^2 + (y - 2)^2 = 25\\)",
                        "\\((x - 1)^2 + (y + 2)^2 = 16\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "BÃ¡n kÃ­nh R = IA = âˆš[(4 - 1)Â² + (2 - (-2))Â²] = âˆš[3Â² + 4Â²] = 5.\u003cbr\u003ePhÆ°Æ¡ng trÃ¬nh Ä‘Æ°á»ng trÃ²n: (x - 1)Â² + (y + 2)Â² = 25.",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan10_04"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "ÄÆ°á»ng trÃ²n",
                     "Oxy"
                 ],
        "knowledge_id":  "kb_toan10_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Trong máº·t pháº³ng Oxy, phÆ°Æ¡ng trÃ¬nh Ä‘Æ°á»ng trÃ²n cÃ³ tÃ¢m \\(I(1, -2)\\) vÃ  Ä‘i qua Ä‘iá»ƒm \\(A(4, 2)\\) lÃ :"
    },
    {
        "id":  "q_hsa_49",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Báº¥t phÆ°Æ¡ng trÃ¬nh logarit chá»©a Ä‘iá»u kiá»‡n",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Trung bÃ¬nh",
        "difficulty_score":  0.65,
        "cognitive_level":  "M3",
        "estimated_time_seconds":  90,
        "question":  "Táº­p nghiá»‡m cá»§a báº¥t phÆ°Æ¡ng trÃ¬nh \\(\\log_2(x^2 - 3x) \\le 2\\) lÃ :",
        "options":  [
                        "\\([-1; 0) \\cup (3; 4]\\)",
                        "\\([-1; 4]\\)",
                        "\\((0; 3)\\)",
                        "\\((-\\infty; -1] \\cup [4; +\\infty)\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Äiá»u kiá»‡n: xÂ² - 3x \u003e 0 â‡” x \u003c 0 hoáº·c x \u003e 3.\u003cbr\u003eBáº¥t phÆ°Æ¡ng trÃ¬nh: xÂ² - 3x â‰¤ 2Â² = 4 â‡” xÂ² - 3x - 4 â‰¤ 0 â‡” -1 â‰¤ x â‰¤ 4.\u003cbr\u003eKáº¿t há»£p Ä‘iá»u kiá»‡n: x âˆˆ [-1; 0) âˆª (3; 4].",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan12_02"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Logarit",
                     "Báº¥t phÆ°Æ¡ng trÃ¬nh"
                 ],
        "knowledge_id":  "kb_toan12_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Táº­p nghiá»‡m cá»§a báº¥t phÆ°Æ¡ng trÃ¬nh \\(\\log_2(x^2 - 3x) \\le 2\\) lÃ :"
    },
    {
        "id":  "q_hsa_50",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "HSA",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "Diá»‡n tÃ­ch toÃ n pháº§n hÃ¬nh láº­p phÆ°Æ¡ng",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "TÃ­nh diá»‡n tÃ­ch toÃ n pháº§n cá»§a hÃ¬nh láº­p phÆ°Æ¡ng cÃ³ cáº¡nh báº±ng \\(3\\text{ cm}\\).",
        "options":  [
                        "54 cmÂ²",
                        "27 cmÂ²",
                        "36 cmÂ²",
                        "18 cmÂ²"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "HÃ¬nh láº­p phÆ°Æ¡ng cÃ³ 6 máº·t hÃ¬nh vuÃ´ng: S_tp = 6 Â· aÂ² = 6 Â· 3Â² = 54 cmÂ².",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "official",
        "source":  "Äá» thi ÄGNL ÄHQGHN",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "HÃ¬nh láº­p phÆ°Æ¡ng",
                     "Diá»‡n tÃ­ch toÃ n pháº§n"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "TÃ­nh diá»‡n tÃ­ch toÃ n pháº§n cá»§a hÃ¬nh láº­p phÆ°Æ¡ng cÃ³ cáº¡nh báº±ng \\(3\\text{ cm}\\)."
    },
    {
        "id":  "q_thpt_36",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "Giáº£i tÃ­ch",
        "subtopic":  "Äá»•i biáº¿n sá»‘ tÃ­ch phÃ¢n",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Cho hÃ m sá»‘ \\(y = f(x)\\) liÃªn tá»¥c trÃªn \\(\\mathbb{R}\\) vÃ  cÃ³ \\(\\int_0^2 f(x)dx = 6\\). TÃ­nh \\(I = \\int_0^1 f(2x)dx\\).",
        "options":  [
                        "3",
                        "12",
                        "6",
                        "2"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Äá»•i biáº¿n sá»‘: Ä‘áº·t t = 2x =\u003e dt = 2dx =\u003e dx = dt / 2.\u003cbr\u003eÄá»•i cáº­n: x = 0 =\u003e t = 0; x = 1 =\u003e t = 2.\u003cbr\u003eI = âˆ«â‚€Â² f(t) (dt / 2) = (1/2) âˆ«â‚€Â² f(t)dt = (1/2) Â· 6 = 3.",
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cá»§a biá»ƒu thá»©c",
                             "Nháº§m láº«n dáº¥u Ä‘áº¡o hÃ m khi xÃ©t Ä‘Æ¡n Ä‘iá»‡u",
                             "Bá» sÃ³t Ä‘iá»u kiá»‡n biÃªn khi tÃ¬m GTLN/GTNN"
                         ],
        "prerequisites":  [
                              "kb_toan12_03"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Äá»•i biáº¿n",
                     "TÃ­ch phÃ¢n"
                 ],
        "knowledge_id":  "kb_toan12_03",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Cho hÃ m sá»‘ \\(y = f(x)\\) liÃªn tá»¥c trÃªn \\(\\mathbb{R}\\) vÃ  cÃ³ \\(\\int_0^2 f(x)dx = 6\\). TÃ­nh \\(I = \\int_0^1 f(2x)dx\\)."
    },
    {
        "id":  "q_thpt_37",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "Äiá»ƒm thuá»™c máº·t pháº³ng",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Trong khÃ´ng gian Oxyz, cho máº·t pháº³ng \\((P): 2x - y + 2z - 9 = 0\\) vÃ  Ä‘iá»ƒm \\(M(1, -1, 3)\\). Khoáº£ng cÃ¡ch tá»« M Ä‘áº¿n (P) báº±ng:",
        "options":  [
                        "0",
                        "2",
                        "3",
                        "1"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Thay tá»a Ä‘á»™ M vÃ o váº¿ trÃ¡i cá»§a phÆ°Æ¡ng trÃ¬nh (P): 2(1) - (-1) + 2(3) - 9 = 2 + 1 + 6 - 9 = 0.\u003cbr\u003eDo Ä‘Ã³ Ä‘iá»ƒm M thuá»™c máº·t pháº³ng (P), khoáº£ng cÃ¡ch tá»« M Ä‘áº¿n (P) báº±ng 0.",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Oxyz",
                     "Khoáº£ng cÃ¡ch",
                     "Máº·t pháº³ng"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Trong khÃ´ng gian Oxyz, cho máº·t pháº³ng \\((P): 2x - y + 2z - 9 = 0\\) vÃ  Ä‘iá»ƒm \\(M(1, -1, 3)\\). Khoáº£ng cÃ¡ch tá»« M Ä‘áº¿n (P) báº±ng:"
    },
    {
        "id":  "q_thpt_38",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "PhÆ°Æ¡ng trÃ¬nh trÃ¹ng phÆ°Æ¡ng",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Sá»‘ nghiá»‡m thá»±c cá»§a phÆ°Æ¡ng trÃ¬nh \\(x^4 - 2x^2 - 3 = 0\\) lÃ :",
        "options":  [
                        "2",
                        "4",
                        "0",
                        "1"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "Äáº·t t = xÂ² (t â‰¥ 0). PhÆ°Æ¡ng trÃ¬nh: tÂ² - 2t - 3 = 0 â‡” t = -1 (loáº¡i) hoáº·c t = 3 (nháº­n).\u003cbr\u003eVá»›i t = 3 =\u003e xÂ² = 3 â‡” x = Â±âˆš3. PhÆ°Æ¡ng trÃ¬nh cÃ³ Ä‘Ãºng 2 nghiá»‡m thá»±c.",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan10_03"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "TrÃ¹ng phÆ°Æ¡ng",
                     "Sá»‘ nghiá»‡m"
                 ],
        "knowledge_id":  "kb_toan10_03",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Sá»‘ nghiá»‡m thá»±c cá»§a phÆ°Æ¡ng trÃ¬nh \\(x^4 - 2x^2 - 3 = 0\\) lÃ :"
    },
    {
        "id":  "q_thpt_39",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "HÃ¬nh há»c",
        "subtopic":  "VectÆ¡ chá»‰ phÆ°Æ¡ng Ä‘Æ°á»ng tháº³ng Oxyz",
        "skills":  [
                       "skill_spatial",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Trong khÃ´ng gian Oxyz, má»™t vectÆ¡ chá»‰ phÆ°Æ¡ng cá»§a Ä‘Æ°á»ng tháº³ng \\(d: \\frac{x - 3}{1} = \\frac{y + 1}{-2} = \\frac{z}{4}\\) lÃ :",
        "options":  [
                        "\\(\\vec{u} = (1, -2, 4)\\)",
                        "\\(\\vec{u} = (3, -1, 0)\\)",
                        "\\(\\vec{u} = (-1, -2, 4)\\)",
                        "\\(\\vec{u} = (1, 2, 4)\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "CÃ¡c máº«u sá»‘ cá»§a phÆ°Æ¡ng trÃ¬nh chÃ­nh táº¯c lÃ  tá»a Ä‘á»™ vectÆ¡ chá»‰ phÆ°Æ¡ng: u = (1, -2, 4).",
        "common_traps":  [
                             "Nháº§m gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  máº·t pháº³ng vá»›i gÃ³c giá»¯a Ä‘Æ°á»ng tháº³ng vÃ  VTPT",
                             "Sai dáº¥u khi tÃ­nh tÃ­ch cÃ³ hÆ°á»›ng trong khÃ´ng gian Oxyz"
                         ],
        "prerequisites":  [
                              "kb_toan12_04"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "Oxyz",
                     "ÄÆ°á»ng tháº³ng",
                     "Chá»‰ phÆ°Æ¡ng"
                 ],
        "knowledge_id":  "kb_toan12_04",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Trong khÃ´ng gian Oxyz, má»™t vectÆ¡ chá»‰ phÆ°Æ¡ng cá»§a Ä‘Æ°á»ng tháº³ng \\(d: \\frac{x - 3}{1} = \\frac{y + 1}{-2} = \\frac{z}{4}\\) lÃ :"
    },
    {
        "id":  "q_thpt_40",
        "type":  "single_choice",
        "subject":  "Mathematics",
        "exam_type":  "THPT",
        "grade":  "ToÃ¡n 12",
        "topic":  "Äáº¡i sá»‘",
        "subtopic":  "Báº¥t phÆ°Æ¡ng trÃ¬nh mÅ© cÆ¡ báº£n",
        "skills":  [
                       "skill_calculation",
                       "skill_reasoning"
                   ],
        "difficulty":  "Dá»…",
        "difficulty_score":  0.35,
        "cognitive_level":  "M2",
        "estimated_time_seconds":  60,
        "question":  "Táº­p nghiá»‡m cá»§a báº¥t phÆ°Æ¡ng trÃ¬nh \\(2^{x} \u003e 8\\) lÃ :",
        "options":  [
                        "\\((3; +\\infty)\\)",
                        "\\([3; +\\infty)\\)",
                        "\\((-\\infty; 3)\\)",
                        "\\((0; 3)\\)"
                    ],
        "correct_answer":  0,
        "items":  null,
        "correct_value":  null,
        "explanation":  "VÃ¬ cÆ¡ sá»‘ 2 \u003e 1: 2^x \u003e 2Â³ â‡” x \u003e 3. Táº­p nghiá»‡m: (3; +âˆž).",
        "common_traps":  [
                             "QuÃªn Ä‘iá»u kiá»‡n cÆ¡ sá»‘ khi giáº£i báº¥t phÆ°Æ¡ng trÃ¬nh logarit",
                             "Chia cho biá»ƒu thá»©c chÆ°a xÃ©t khÃ¡c 0"
                         ],
        "prerequisites":  [
                              "kb_toan12_02"
                          ],
        "year":  2025,
        "source_type":  "adapted",
        "source":  "Äá» thi Tá»‘t nghiá»‡p THPT",
        "license":  "CC BY-NC-SA 4.0",
        "tags":  [
                     "MÅ©",
                     "Báº¥t phÆ°Æ¡ng trÃ¬nh"
                 ],
        "knowledge_id":  "kb_toan12_02",
        "status":  "published",
        "schema_version":  "2.0",
        "question_text":  "Táº­p nghiá»‡m cá»§a báº¥t phÆ°Æ¡ng trÃ¬nh \\(2^{x} \u003e 8\\) lÃ :"
    }
];
const PUMKIN_DEFAULT_EXAMS = [];
const PUMKIN_KNOWLEDGE_BASE = PUMKIN_DEFAULT_KNOWLEDGE;
const PUMKIN_QUESTIONS_DATABASE = PUMKIN_DEFAULT_QUESTIONS;
const PUMKIN_EXAMS_DATABASE = PUMKIN_DEFAULT_EXAMS;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PUMKIN_DEFAULT_KNOWLEDGE, PUMKIN_DEFAULT_QUESTIONS, PUMKIN_DEFAULT_EXAMS, PUMKIN_KNOWLEDGE_BASE, PUMKIN_QUESTIONS_DATABASE, PUMKIN_EXAMS_DATABASE };
}



/* ==========================================================================
   PUMKIN.DEV MATH EXAM PLATFORM - CORE APPLICATION LOGIC
   ========================================================================== */

// 1. STORAGE MODULE
const PumkinStorage = {
    CURRENT_VERSION: "3.0.0",

    getPartitionKey(baseKey) {
        const uid = (typeof PumkinAuth !== "undefined" && PumkinAuth.getCurrentUserId()) ? `user_${PumkinAuth.getCurrentUserId()}` : "guest";
        return `pumkin_${baseKey}_v3_${uid}`;
    },

    init() {
        const storedVer = localStorage.getItem("pumkin_data_ver");
        const storedExams = localStorage.getItem("pumkin_exams_v3");
        if (storedVer !== this.CURRENT_VERSION || !storedExams || JSON.parse(storedExams).length < PUMKIN_DEFAULT_EXAMS.length) {
            localStorage.setItem("pumkin_questions_v3", JSON.stringify(PUMKIN_DEFAULT_QUESTIONS));
            localStorage.setItem("pumkin_exams_v3", JSON.stringify(PUMKIN_DEFAULT_EXAMS));
            localStorage.setItem("pumkin_data_ver", this.CURRENT_VERSION);
        }
    },

    getQuestions() {
        try {
            return JSON.parse(localStorage.getItem("pumkin_questions_v3")) || PUMKIN_DEFAULT_QUESTIONS;
        } catch(e) {
            return PUMKIN_DEFAULT_QUESTIONS;
        }
    },

    saveQuestions(arr) {
        localStorage.setItem("pumkin_questions_v3", JSON.stringify(arr));
    },

    getQuestionById(id) {
        const list = this.getQuestions();
        return list.find(q => q.id === id) || null;
    },

    getExams() {
        try {
            return JSON.parse(localStorage.getItem("pumkin_exams_v3")) || PUMKIN_DEFAULT_EXAMS;
        } catch(e) {
            return PUMKIN_DEFAULT_EXAMS;
        }
    },

    saveExams(arr) {
        localStorage.setItem("pumkin_exams_v3", JSON.stringify(arr));
    },

    getExamById(id) {
        const list = this.getExams();
        return list.find(e => e.id === id) || null;
    },

    getKnowledgeBase() {
        if (typeof PUMKIN_KNOWLEDGE_BASE !== "undefined" && Array.isArray(PUMKIN_KNOWLEDGE_BASE) && PUMKIN_KNOWLEDGE_BASE.length > 0) return PUMKIN_KNOWLEDGE_BASE;
        if (typeof PUMKIN_DEFAULT_KNOWLEDGE !== "undefined" && Array.isArray(PUMKIN_DEFAULT_KNOWLEDGE)) return PUMKIN_DEFAULT_KNOWLEDGE;
        return [];
    },

    getKnowledgeArticleById(id) {
        return this.getKnowledgeBase().find(a => a.id === id) || null;
    },

    getBookmarks() {
        try {
            const key = this.getPartitionKey("bookmarks");
            const raw = JSON.parse(localStorage.getItem(key)) || [];
            return raw.map(item => (typeof item === "string" ? item : item.id));
        } catch(e) {
            return [];
        }
    },

    getBookmarkDetails() {
        try {
            const key = this.getPartitionKey("bookmarks");
            const raw = JSON.parse(localStorage.getItem(key)) || [];
            return raw.map(item => {
                if (typeof item === "string") {
                    return { id: item, reason: "chÆ°a hiá»ƒu", createdAt: Date.now() };
                }
                return {
                    id: item.id,
                    reason: item.reason || "chÆ°a hiá»ƒu",
                    createdAt: item.createdAt || Date.now()
                };
            });
        } catch(e) {
            return [];
        }
    },

    toggleBookmark(qId, reason = "chÆ°a hiá»ƒu") {
        let raw = [];
        try {
            const key = this.getPartitionKey("bookmarks");
            raw = JSON.parse(localStorage.getItem(key)) || [];
        } catch(e) { raw = []; }

        const idx = raw.findIndex(item => (typeof item === "string" ? item : item.id) === qId);
        if (idx >= 0) {
            raw.splice(idx, 1);
        } else {
            raw.push({ id: qId, reason: reason, createdAt: Date.now() });
        }
        const key = this.getPartitionKey("bookmarks");
        localStorage.setItem(key, JSON.stringify(raw));
        if (typeof PumkinBookmarks !== "undefined") {
            PumkinBookmarks.updateBadge();
        }
        return idx < 0; // true if added, false if removed
    },

    setBookmarkReason(qId, reason) {
        let raw = [];
        try {
            const key = this.getPartitionKey("bookmarks");
            raw = JSON.parse(localStorage.getItem(key)) || [];
        } catch(e) { raw = []; }

        let found = false;
        raw = raw.map(item => {
            const id = typeof item === "string" ? item : item.id;
            if (id === qId) {
                found = true;
                return { id, reason: reason, createdAt: item.createdAt || Date.now() };
            }
            return item;
        });
        if (!found) {
            raw.push({ id: qId, reason: reason, createdAt: Date.now() });
        }
        const key = this.getPartitionKey("bookmarks");
        localStorage.setItem(key, JSON.stringify(raw));
        if (typeof PumkinBookmarks !== "undefined") {
            PumkinBookmarks.updateBadge();
            PumkinBookmarks.render();
        }
    },

    isBookmarked(qId) {
        return this.getBookmarks().includes(qId);
    },

    getHistory() {
        try {
            const key = this.getPartitionKey("history");
            return JSON.parse(localStorage.getItem(key)) || [];
        } catch(e) {
            return [];
        }
    },

    addHistory(record) {
        const hist = this.getHistory();
        hist.unshift(record);
        const key = this.getPartitionKey("history");
        localStorage.setItem(key, JSON.stringify(hist));
    },

    getActiveSession() {
        try {
            const key = this.getPartitionKey("active_session");
            return JSON.parse(localStorage.getItem(key));
        } catch(e) {
            return null;
        }
    },

    saveActiveSession(session) {
        const key = this.getPartitionKey("active_session");
        localStorage.setItem(key, JSON.stringify(session));
    },

    clearActiveSession() {
        const key = this.getPartitionKey("active_session");
        localStorage.removeItem(key);
    }
};

// 2. ROUTER MODULE
const PumkinRouter = {
    currentView: "guide",

    navigate(viewId, callback) {
        this.currentView = viewId;

        // Update nav tabs active state
        document.querySelectorAll(".nav-tab").forEach(tab => {
            if (tab.dataset.target === viewId) {
                tab.classList.add("active");
            } else {
                tab.classList.remove("active");
            }
        });

        // Toggle Views
        document.querySelectorAll(".app-view").forEach(v => {
            v.classList.remove("active");
        });

        const targetEl = document.getElementById("view-" + viewId);
        if (targetEl) {
            targetEl.classList.add("active");
        }

        if (viewId === "exam-player") {
            document.body.classList.add("exam-mode-active");
        } else {
            document.body.classList.remove("exam-mode-active");
        }

        window.scrollTo({ top: 0, behavior: "smooth" });

        // Trigger view-specific refresh
        if (viewId === "knowledge") {
            PumkinKnowledge.render();
            if (window.PumkinLevelSystem && typeof window.PumkinLevelSystem.updateDeepLearningLock === 'function') {
                window.PumkinLevelSystem.updateDeepLearningLock();
            }
        }
        if (viewId === "formulas") PumkinFormulas.render();
        if (viewId === "library") PumkinLibrary.render();
        if (viewId === "qbank") PumkinQBank.render();
        if (viewId === "bookmarks") PumkinBookmarks.render();
        if (viewId === "dashboard") PumkinDashboard.render();
        if (viewId === "smart") PumkinSmartPractice.render();
        if (viewId === "admin") PumkinAdmin.render();
        if (viewId === "data" && typeof PumkinDataRepo !== "undefined") PumkinDataRepo.render();

        if (callback) callback();

        // Render MathJax formulas in the newly displayed view via PumkinMath
        if (window.PumkinMath) {
            window.PumkinMath.typeset(targetEl);
        } else if (window.MathJax && window.MathJax.typesetPromise && targetEl) {
            window.MathJax.typesetPromise([targetEl]).catch(() => {});
        }
    }
};

// 3. EXAM LIBRARY MODULE
const PumkinLibrary = {
    typeFilter: "all",
    activeExamForModal: null,

    init() {
        this.render();
    },

    setTypeFilter(type, pillEl) {
        this.typeFilter = type;
        if (pillEl) {
            document.querySelectorAll("#lib-type-pills .filter-pill").forEach(p => p.classList.remove("active"));
            pillEl.classList.add("active");
        }
        this.applyFilters();
    },

    applyFilters() {
        const query = (document.getElementById("lib-search-input")?.value || "").toLowerCase().trim();
        const year = document.getElementById("lib-year-select")?.value || "all";
        const diff = document.getElementById("lib-diff-select")?.value || "all";

        const allExams = PumkinStorage.getExams();
        const filtered = allExams.filter(exam => {
            if (this.typeFilter !== "all" && exam.type !== this.typeFilter) return false;
            if (year !== "all" && exam.year.toString() !== year) return false;
            if (diff !== "all" && exam.difficulty !== diff) return false;
            if (query) {
                const matchTitle = exam.title.toLowerCase().includes(query);
                const matchSource = (exam.source || "").toLowerCase().includes(query);
                const matchDesc = (exam.description || "").toLowerCase().includes(query);
                if (!matchTitle && !matchSource && !matchDesc) return false;
            }
            return true;
        });

        this.renderCards(filtered);
    },

    render() {
        this.applyFilters();
    },

    renderCards(exams) {
        const container = document.getElementById("exam-cards-grid");
        if (!container) return;

        if (exams.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: white; border-radius: 8px; border: 1px dashed #cbd5e1;">
                    <p style="font-size: 16px; color: var(--text-muted); margin-bottom: 10px;">KhÃ´ng tÃ¬m tháº¥y Ä‘á» thi phÃ¹ há»£p vá»›i bá»™ lá»c hiá»‡n táº¡i.</p>
                    <button class="btn btn-primary btn-sm" onclick="PumkinLibrary.resetFilters()">XÃ³a bá»™ lá»c</button>
                </div>
            `;
            return;
        }

        container.innerHTML = exams.map(exam => {
            let typeBadgeClass = "badge-tsa";
            if (exam.type === "HSA") typeBadgeClass = "badge-hsa";
            if (exam.type === "THPT") typeBadgeClass = "badge-thpt";
            if (exam.type === "Giáº£i tÃ­ch 1") typeBadgeClass = "badge-calc";

            let diffClass = "diff-medium";
            if (exam.difficulty === "Dá»…") diffClass = "diff-easy";
            if (exam.difficulty === "KhÃ³") diffClass = "diff-hard";

            const qCount = exam.question_ids ? exam.question_ids.length : (exam.questions ? exam.questions.length : 0);

            return `
                <div class="exam-card">
                    <div>
                        <div class="exam-card-badge-row">
                            <span class="badge-tag ${typeBadgeClass}">${exam.type}</span>
                            <span class="badge-difficulty ${diffClass}">${exam.difficulty}</span>
                        </div>
                        <h4 class="exam-card-title">${exam.title}</h4>
                        <p class="exam-card-desc">${exam.description || "Äá» thi chuáº©n hÃ³a cÃ³ báº¥m giá» vÃ  giáº£i chi tiáº¿t."}</p>
                    </div>

                    <div>
                        <div class="exam-card-meta">
                            <div class="exam-meta-item">ðŸ“ <span>${qCount} cÃ¢u há»i</span></div>
                            <div class="exam-meta-item">â±ï¸ <span>${exam.duration_minutes} phÃºt</span></div>
                            <div class="exam-meta-item">ðŸ“… <span>NÄƒm ${exam.year}</span></div>
                            <div class="exam-meta-item">ðŸ‘¥ <span>${exam.attempts_count || 120} lÆ°á»£t thi</span></div>
                        </div>

                        <div class="exam-card-footer">
                            <span class="exam-source-tag" title="${exam.source || ''}">ðŸ« ${exam.source || 'PUMKIN.DEV'}</span>
                            <button class="btn btn-primary btn-sm" onclick="PumkinLibrary.openExamModal('${exam.id}')">
                                LÃ m Ä‘á»
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join("");
    },

    resetFilters() {
        this.typeFilter = "all";
        document.querySelectorAll("#lib-type-pills .filter-pill").forEach((p, idx) => {
            if (idx === 0) p.classList.add("active");
            else p.classList.remove("active");
        });
        const sInput = document.getElementById("lib-search-input");
        if (sInput) sInput.value = "";
        const ySelect = document.getElementById("lib-year-select");
        if (ySelect) ySelect.value = "all";
        const dSelect = document.getElementById("lib-diff-select");
        if (dSelect) dSelect.value = "all";
        this.applyFilters();
    },

    openExamModal(examId) {
        const exam = PumkinStorage.getExamById(examId);
        if (!exam) return;

        this.activeExamForModal = exam;

        document.getElementById("modal-exam-title").textContent = exam.title;
        document.getElementById("modal-exam-desc").textContent = exam.description || "Äá» thi Ä‘Ã¡nh giÃ¡ tÆ° duy & nÄƒng lá»±c chuáº©n má»±c.";
        document.getElementById("modal-exam-type-badge").textContent = exam.type;
        document.getElementById("modal-exam-type-badge").className = `badge-tag badge-${exam.type === 'HSA' ? 'hsa' : exam.type === 'THPT' ? 'thpt' : exam.type === 'Giáº£i tÃ­ch 1' ? 'calc' : 'tsa'}`;
        
        const qCount = exam.question_ids ? exam.question_ids.length : (exam.questions ? exam.questions.length : 0);
        document.getElementById("modal-exam-qcount").textContent = `${qCount} cÃ¢u há»i`;
        document.getElementById("modal-exam-duration").textContent = `${exam.duration_minutes} phÃºt`;
        document.getElementById("modal-exam-difficulty").textContent = exam.difficulty;
        document.getElementById("modal-exam-source").textContent = exam.source || "PUMKIN.DEV";

        const startBtn = document.getElementById("modal-start-exam-btn");
        startBtn.onclick = () => {
            this.closeModal();
            PumkinPlayer.startExam(exam.id);
        };

        const modal = document.getElementById("exam-detail-modal");
        if (modal) modal.classList.add("active");
    },

    closeModal() {
        const modal = document.getElementById("exam-detail-modal");
        if (modal) modal.classList.remove("active");
    }
};

// 4. EXAM PLAYER MODULE (FOCUSED EXAM HALL)
const PumkinPlayer = {
    examData: null,
    questions: [],
    currentIndex: 0,
    userAnswers: [], // Array of option index (0, 1, 2, 3) or null
    flagged: [],     // Array of booleans
    timeRemaining: 0,
    durationSeconds: 0,
    timerInterval: null,

    startExam(examId, isCustom = false, customExamObj = null) {
        let exam = customExamObj;
        if (!isCustom) {
            exam = PumkinStorage.getExamById(examId);
        }
        if (!exam) return;

        this.examData = exam;

        // Load Questions
        if (exam.questions && exam.questions.length > 0) {
            this.questions = exam.questions;
        } else if (exam.question_ids && exam.question_ids.length > 0) {
            this.questions = exam.question_ids
                .map(id => PumkinStorage.getQuestionById(id))
                .filter(q => q !== null);
        } else {
            alert("Äá» thi chÆ°a cÃ³ cÃ¢u há»i!");
            return;
        }

        // Initialize state
        this.currentIndex = 0;
        this.userAnswers = new Array(this.questions.length).fill(null);
        this.flagged = new Array(this.questions.length).fill(false);
        this.questionTimeSpent = new Array(this.questions.length).fill(0);
        this._lastSwitchTime = Date.now();
        this.durationSeconds = (exam.duration_minutes || 60) * 60;
        this.timeRemaining = this.durationSeconds;

        // Switch to Player View
        PumkinRouter.navigate("exam-player", () => {
            document.getElementById("player-exam-title").textContent = exam.title;
            this.initKeyboardListeners();
            this.renderQuestion(0);
            this.renderNavigator();
            this.startTimer();
            this.saveSession();
        });
    },

    initKeyboardListeners() {
        if (this._hasKeyListeners) return;
        this._hasKeyListeners = true;
        window.addEventListener("keydown", (e) => {
            if (PumkinRouter.currentView !== "exam-player") return;
            if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;

            const key = e.key.toUpperCase();
            const currentQ = this.questions[this.currentIndex];

            if (!currentQ.type || currentQ.type === "single_choice") {
                if (key === "1" || key === "A") this.selectOption(0);
                else if (key === "2" || key === "B") this.selectOption(1);
                else if (key === "3" || key === "C") this.selectOption(2);
                else if (key === "4" || key === "D") this.selectOption(3);
            }

            if (e.key === "ArrowLeft") {
                this.prevQuestion();
            } else if (e.key === "ArrowRight") {
                this.nextQuestion();
            } else if (key === "F") {
                this.toggleFlagCurrent();
            } else if (e.key === "Escape") {
                this.closeSubmitConfirm();
            }
        });
    },

    renderQuestion(index) {
        if (index < 0 || index >= this.questions.length) return;

        // Record time spent on previous question
        const now = Date.now();
        if (this._lastSwitchTime && this.currentIndex !== undefined && this.questionTimeSpent) {
            const elapsed = Math.max(1, Math.round((now - this._lastSwitchTime) / 1000));
            this.questionTimeSpent[this.currentIndex] = (this.questionTimeSpent[this.currentIndex] || 0) + elapsed;
        }
        this._lastSwitchTime = now;

        this.currentIndex = index;

        const q = this.questions[index];
        const total = this.questions.length;

        // Update progress text & badge
        document.getElementById("player-progress-text").textContent = `Äang lÃ m: CÃ¢u ${index + 1} / ${total}`;
        document.getElementById("player-q-badge").textContent = `CÃ‚U ${index + 1} / ${total}`;

        // Question Type Tag & DNA Badges
        let typeBadge = `<span class="q-type-badge q-type-single">Tráº¯c nghiá»‡m</span>`;
        if (q.type === "true_false_group") typeBadge = `<span class="q-type-badge q-type-tf">ÄÃºng / Sai chÃ¹m</span>`;
        else if (q.type === "short_answer") typeBadge = `<span class="q-type-badge q-type-short">Äiá»n Ä‘Ã¡p sá»‘</span>`;
        else if (q.type === "step_solution") typeBadge = `<span class="q-type-badge q-type-step">Tá»± luáº­n theo bÆ°á»›c</span>`;

        const cognitiveBadge = q.cognitive_level ? `<span class="dna-pill dna-pill-cognitive">ðŸ§  ${q.cognitive_level}</span>` : '';
        const estTimeBadge = q.estimated_time_seconds ? `<span class="dna-pill">â±ï¸ ${q.estimated_time_seconds}s</span>` : '';
        const skillBadges = (q.skills || []).map(s => `<span class="dna-pill">âš¡ ${s}</span>`).join(" ");

        document.getElementById("player-q-topic-tag").innerHTML = `
            <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
                ${typeBadge}
                <span style="font-weight: 600;">${q.topic} â€¢ ${q.subtopic || ''} (${q.difficulty})</span>
                ${cognitiveBadge}
                ${estTimeBadge}
                ${skillBadges}
            </div>
        `;

        // Flag button state
        const flagBtn = document.getElementById("player-flag-btn");
        if (this.flagged[index]) {
            flagBtn.classList.add("flagged");
            flagBtn.innerHTML = `<span>âš‘</span> <span>ÄÃ£ Ä‘Ã¡nh dáº¥u</span>`;
        } else {
            flagBtn.classList.remove("flagged");
            flagBtn.innerHTML = `<span>âš‘</span> <span>ÄÃ¡nh dáº¥u</span>`;
        }

        // Question text
        document.getElementById("player-question-text").innerHTML = q.question_text;

        const optContainer = document.getElementById("player-options-container");

        // RENDER ACCORDING TO QUESTION TYPE
        if (q.type === "true_false_group") {
            const currentAns = (this.userAnswers[index] && typeof this.userAnswers[index] === "object") ? this.userAnswers[index] : {};
            optContainer.innerHTML = `
                <div class="tf-group-container">
                    <div style="font-size: 13.5px; font-weight: 700; color: var(--primary); margin-bottom: 6px;">
                        ðŸ“Œ HÃ£y xÃ¡c Ä‘á»‹nh tÃ­nh ÄÃºng / Sai cho tá»«ng nháº­n Ä‘á»‹nh sau:
                    </div>
                    ${(q.items || []).map(item => {
                        const val = currentAns[item.label];
                        const hasAnswered = (val === true || val === false);
                        const statusPill = val === true 
                            ? `<span class="tf-item-status-pill status-true">âœ“ ÄÃ£ chá»n: ÄÃºng</span>` 
                            : (val === false 
                                ? `<span class="tf-item-status-pill status-false">âœ— ÄÃ£ chá»n: Sai</span>` 
                                : `<span class="tf-item-status-pill status-empty">â—‹ ChÆ°a chá»n</span>`);
                        return `
                            <div class="tf-item-card ${hasAnswered ? 'tf-item-answered' : ''}">
                                <div class="tf-item-content">
                                    <span class="tf-item-label">${item.label})</span>
                                    <div style="display: flex; flex-direction: column; gap: 4px; flex: 1;">
                                        <div class="tf-item-text">${item.text}</div>
                                        <div style="margin-top: 4px;">${statusPill}</div>
                                    </div>
                                </div>
                                <div class="tf-buttons-group">
                                    <button type="button" class="tf-btn tf-btn-true ${val === true ? 'active-true' : ''}" onclick="PumkinPlayer.selectTF('${item.label}', true)" title="Chá»n nháº­n Ä‘á»‹nh nÃ y lÃ  ÄÃºng">âœ“ ÄÃºng</button>
                                    <button type="button" class="tf-btn tf-btn-false ${val === false ? 'active-false' : ''}" onclick="PumkinPlayer.selectTF('${item.label}', false)" title="Chá»n nháº­n Ä‘á»‹nh nÃ y lÃ  Sai">âœ— Sai</button>
                                </div>
                            </div>
                        `;
                    }).join("")}
                </div>
            `;
        } else if (q.type === "short_answer") {
            const currentVal = (typeof this.userAnswers[index] === "string") ? this.userAnswers[index] : "";
            optContainer.innerHTML = `
                <div class="short-answer-wrapper">
                    <label style="font-size: 14px; font-weight: 700; color: var(--primary);">
                        âœï¸ Nháº­p káº¿t quáº£ sá»‘ hoáº·c phÃ¢n sá»‘ cá»§a báº¡n:
                    </label>
                    <div class="short-answer-input-group">
                        <input type="text" id="short-answer-field" class="short-answer-input" 
                               placeholder="VÃ­ dá»¥: 0.75 hoáº·c 3/4..." 
                               value="${currentVal}" 
                               oninput="PumkinPlayer.inputShortAnswer(this.value)">
                        <button class="btn btn-primary" onclick="PumkinPlayer.nextQuestion()">XÃ¡c nháº­n â†’</button>
                    </div>
                    <div class="short-answer-helper">
                        <span>ðŸ’¡ <em>Há»‡ thá»‘ng tá»± Ä‘á»™ng hiá»ƒu dáº¥u pháº©y (,), dáº¥u cháº¥m (.) vÃ  phÃ¢n sá»‘ (a/b).</em></span>
                    </div>
                    <div class="math-pad-row">
                        <span style="font-size: 12px; color: #64748b; font-weight: 600;">BÃ n phÃ­m phá»¥ trá»£:</span>
                        <button class="math-pad-btn" onclick="PumkinPlayer.insertMathPad('.')">.</button>
                        <button class="math-pad-btn" onclick="PumkinPlayer.insertMathPad('/')">/</button>
                        <button class="math-pad-btn" onclick="PumkinPlayer.insertMathPad('-')">-</button>
                        <button class="math-pad-btn" onclick="PumkinPlayer.insertMathPad('Ï€')">Ï€</button>
                        <button class="math-pad-btn" onclick="PumkinPlayer.insertMathPad('âˆš')">âˆš</button>
                        <button class="math-pad-btn" style="color: #dc2626;" onclick="PumkinPlayer.clearShortAnswer()">XÃ³a</button>
                    </div>
                </div>
            `;
        } else if (q.type === "step_solution") {
            const currentNote = (typeof this.userAnswers[index] === "string") ? this.userAnswers[index] : "";
            optContainer.innerHTML = `
                <div class="step-solution-wrapper">
                    <label style="font-size: 14px; font-weight: 700; color: var(--primary);">
                        ðŸ“ TÃ³m táº¯t cÃ¡c bÆ°á»›c giáº£i / káº¿t quáº£ cá»§a báº¡n:
                    </label>
                    <textarea id="step-answer-field" class="short-answer-input" style="font-size: 14px; height: 120px; resize: vertical;"
                              placeholder="Ghi chÃº bÆ°á»›c giáº£i (BÆ°á»›c 1: ..., BÆ°á»›c 2: ..., ÄÃ¡p sá»‘: ...)"
                              oninput="PumkinPlayer.inputShortAnswer(this.value)">${currentNote}</textarea>
                    <div style="font-size: 12.5px; color: var(--text-muted); background: #eff6ff; padding: 10px 14px; border-radius: 6px; border-left: 3px solid var(--primary);">
                        ðŸ“Œ BÃ i toÃ¡n dáº¡ng tá»± luáº­n nhiá»u bÆ°á»›c. Khi ná»™p bÃ i, há»‡ thá»‘ng sáº½ má»Ÿ Ä‘á»‘i chiáº¿u chi tiáº¿t tá»«ng bÆ°á»›c theo barem cháº¥m Ä‘iá»ƒm chÃ­nh thá»©c.
                    </div>
                </div>
            `;
        } else {
            // Default: single_choice
            const letters = ["A", "B", "C", "D", "E"];
            const selected = this.userAnswers[index];

            optContainer.innerHTML = (q.options || []).map((opt, oIdx) => {
                const isSelected = selected === oIdx;
                return `
                    <div class="option-card ${isSelected ? 'selected' : ''}" onclick="PumkinPlayer.selectOption(${oIdx})">
                        <div class="option-circle">${letters[oIdx]}</div>
                        <div class="option-text">${opt}</div>
                    </div>
                `;
            }).join("");
        }

        // Prev/Next buttons
        document.getElementById("player-prev-btn").disabled = (index === 0);
        document.getElementById("player-next-btn").textContent = (index === total - 1) ? "Xem láº¡i cÃ¢u Ä‘áº§u â†’" : "CÃ¢u tiáº¿p theo â†’";

        // Update navigator current status
        this.updateNavigatorHighlight();

        // Render MathJax
        if (window.PumkinMath) {
            window.PumkinMath.typeset([document.getElementById("player-question-text"), optContainer]);
        } else if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([document.getElementById("player-question-text"), optContainer]);
        }
    },

    selectOption(optionIndex) {
        this.userAnswers[this.currentIndex] = optionIndex;
        this.renderQuestion(this.currentIndex);
        this.renderNavigator();
        this.saveSession();
    },

    selectTF(label, boolVal) {
        if (!this.userAnswers[this.currentIndex] || typeof this.userAnswers[this.currentIndex] !== "object") {
            this.userAnswers[this.currentIndex] = {};
        }
        if (this.userAnswers[this.currentIndex][label] === boolVal) {
            this.userAnswers[this.currentIndex][label] = null;
        } else {
            this.userAnswers[this.currentIndex][label] = boolVal;
        }
        this.renderQuestion(this.currentIndex);
        this.renderNavigator();
        this.saveSession();
    },

    inputShortAnswer(val) {
        this.userAnswers[this.currentIndex] = val;
        this.renderNavigator();
        this.saveSession();
    },

    insertMathPad(char) {
        const field = document.getElementById("short-answer-field");
        if (field) {
            field.value = (field.value || "") + char;
            this.inputShortAnswer(field.value);
            field.focus();
        }
    },

    clearShortAnswer() {
        const field = document.getElementById("short-answer-field");
        if (field) {
            field.value = "";
            this.inputShortAnswer("");
            field.focus();
        }
    },

    toggleFlagCurrent() {
        this.flagged[this.currentIndex] = !this.flagged[this.currentIndex];
        this.renderQuestion(this.currentIndex);
        this.renderNavigator();
        this.saveSession();
    },

    prevQuestion() {
        if (this.currentIndex > 0) {
            this.renderQuestion(this.currentIndex - 1);
        }
    },

    nextQuestion() {
        if (window.PUMKIN_DEEP_LEARNING_ENABLED && window.PumkinCognitiveTracker && typeof window.PumkinCognitiveTracker.getStandardizedState === 'function') {
            const state = window.PumkinCognitiveTracker.getStandardizedState();
            if (window.PumkinSequencer && window.PumkinSequencer.KnowledgeGraphSequencer) {
                // Initialize KG and BKT if not done
                if (!window._pumkinNbiSeq) {
                    const kg = new window.PumkinSequencer.PumkinKnowledgeGraph();
                    kg.load({ nodes: {} }, PumkinStorage.getQuestions());
                    const bkt = new window.PumkinSequencer.BayesianKnowledgeTracing();
                    window._pumkinNbiSeq = new window.PumkinSequencer.KnowledgeGraphSequencer(kg, bkt);
                }

                // If user answered current question, BKT update
                const currentQ = this.questions[this.currentIndex];
                const isAns = this.isQuestionAnswered(this.currentIndex);
                if (isAns) {
                    const ans = this.userAnswers[this.currentIndex];
                    const isCorrect = (ans === currentQ.correct_answer || PumkinScoring.isShortAnswerCorrect(ans, currentQ));
                    (currentQ.skills || []).forEach(sk => window._pumkinNbiSeq.bkt.update(sk, isCorrect));
                }

                // Find next best item for the remaining slots
                if (this.currentIndex < this.questions.length - 1) {
                    const completedIds = this.questions.slice(0, this.currentIndex + 1).map(q => q.id);
                    const nbi = window._pumkinNbiSeq.getNextItem(state, completedIds);
                    if (nbi) {
                        // Dynamically swap the next question with NBI
                        const nbiIndex = this.questions.findIndex(q => q.id === nbi.id);
                        if (nbiIndex > this.currentIndex) {
                            const temp = this.questions[this.currentIndex + 1];
                            this.questions[this.currentIndex + 1] = this.questions[nbiIndex];
                            this.questions[nbiIndex] = temp;
                            
                            const tAns = this.userAnswers[this.currentIndex + 1];
                            this.userAnswers[this.currentIndex + 1] = this.userAnswers[nbiIndex];
                            this.userAnswers[nbiIndex] = tAns;
                            
                            const tFlag = this.flagged[this.currentIndex + 1];
                            this.flagged[this.currentIndex + 1] = this.flagged[nbiIndex];
                            this.flagged[nbiIndex] = tFlag;
                        }
                    }
                }
            }
        }

        if (this.currentIndex < this.questions.length - 1) {
            this.renderQuestion(this.currentIndex + 1);
        } else {
            this.renderQuestion(0);
        }
    },

    jumpToQuestion(index) {
        this.renderQuestion(index);
    },

    isQuestionAnswered(idx) {
        const ans = this.userAnswers[idx];
        if (ans === null || ans === undefined) return false;
        const q = this.questions[idx];
        if (q.type === "true_false_group") {
            if (typeof ans !== "object") return false;
            return Object.values(ans).some(v => v === true || v === false);
        }
        if (q.type === "short_answer" || q.type === "step_solution") {
            return typeof ans === "string" && ans.trim().length > 0;
        }
        return ans !== null;
    },

    renderNavigator() {
        const grid = document.getElementById("player-nav-grid");
        if (!grid) return;

        let answeredCount = 0;

        grid.innerHTML = this.questions.map((q, idx) => {
            const isAnswered = this.isQuestionAnswered(idx);
            const isFlagged = this.flagged[idx];
            const isCurrent = (idx === this.currentIndex);

            if (isAnswered) answeredCount++;

            let statusClass = "status-unanswered";
            if (isAnswered) statusClass = "status-answered";
            if (isFlagged) statusClass = "status-flagged";
            if (isCurrent) statusClass += " status-current";

            let icon = isAnswered ? "âœ“" : "â—‹";
            if (isFlagged) icon = "âš‘";

            return `
                <button class="nav-cell-btn ${statusClass}" onclick="PumkinPlayer.jumpToQuestion(${idx})" title="CÃ¢u ${idx + 1}">
                    <span>${idx + 1}</span>
                    <span style="font-size: 10px; margin-top: -2px;">${icon}</span>
                </button>
            `;
        }).join("");

        document.getElementById("player-answered-count").textContent = `${answeredCount}/${this.questions.length} cÃ¢u`;
    },

    updateNavigatorHighlight() {
        document.querySelectorAll("#player-nav-grid .nav-cell-btn").forEach((btn, idx) => {
            if (idx === this.currentIndex) {
                btn.classList.add("status-current");
            } else {
                btn.classList.remove("status-current");
            }
        });
    },

    startTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);

        this.updateTimerDisplay();

        this.timerInterval = setInterval(() => {
            this.timeRemaining--;
            this.updateTimerDisplay();

            if (this.timeRemaining % 5 === 0) {
                this.saveSession();
            }

            if (this.timeRemaining <= 0) {
                clearInterval(this.timerInterval);
                this.timeRemaining = 0;
                this.updateTimerDisplay();
                alert("â° Háº¾T GIá»œ LÃ€M BÃ€I! Há»‡ thá»‘ng Ä‘ang tá»± Ä‘á»™ng ná»™p bÃ i thi cá»§a báº¡n.");
                this.submitExam(true);
            }
        }, 1000);
    },

    updateTimerDisplay() {
        const badge = document.getElementById("player-timer-badge");
        const textEl = document.getElementById("player-timer-text");
        if (!textEl || !badge) return;

        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        textEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        badge.className = "timer-box";
        if (this.timeRemaining > 15 * 60) {
            badge.classList.add("timer-normal");
        } else if (this.timeRemaining > 5 * 60) {
            badge.classList.add("timer-warning");
        } else {
            badge.classList.add("timer-critical");
        }
    },

    saveSession() {
        PumkinStorage.saveActiveSession({
            examData: this.examData,
            questions: this.questions,
            currentIndex: this.currentIndex,
            userAnswers: this.userAnswers,
            flagged: this.flagged,
            questionTimeSpent: this.questionTimeSpent || [],
            timeRemaining: this.timeRemaining,
            durationSeconds: this.durationSeconds,
            timestamp: Date.now()
        });
    },

    restoreSessionIfAvailable() {
        const session = PumkinStorage.getActiveSession();
        if (!session) return false;

        // Check if session expired
        const elapsed = Math.floor((Date.now() - session.timestamp) / 1000);
        const remaining = session.timeRemaining - elapsed;

        if (remaining <= 0) {
            PumkinStorage.clearActiveSession();
            return false;
        }

        this.examData = session.examData;
        this.questions = session.questions;
        this.currentIndex = session.currentIndex || 0;
        this.userAnswers = session.userAnswers;
        this.flagged = session.flagged;
        this.questionTimeSpent = session.questionTimeSpent || new Array(this.questions.length).fill(0);
        this._lastSwitchTime = Date.now();
        this.durationSeconds = session.durationSeconds;
        this.timeRemaining = remaining;

        PumkinRouter.navigate("exam-player", () => {
            document.getElementById("player-exam-title").textContent = this.examData.title;
            this.renderQuestion(this.currentIndex);
            this.renderNavigator();
            this.startTimer();
        });

        return true;
    },

    openSubmitConfirm() {
        const answered = this.questions.filter((q, idx) => this.isQuestionAnswered(idx)).length;
        const total = this.questions.length;
        const unanswered = total - answered;

        const previewEl = document.getElementById("submit-stat-preview");
        if (previewEl) {
            previewEl.innerHTML = `
                <div>âœ… <strong>ÄÃ£ tráº£ lá»i:</strong> ${answered} / ${total} cÃ¢u</div>
                <div style="color: ${unanswered > 0 ? 'var(--danger)' : 'var(--success)'}; margin-top: 6px;">
                    âš ï¸ <strong>ChÆ°a lÃ m:</strong> ${unanswered} cÃ¢u
                </div>
            `;
        }

        const modal = document.getElementById("submit-confirm-modal");
        if (modal) modal.classList.add("active");
    },

    closeSubmitConfirm() {
        const modal = document.getElementById("submit-confirm-modal");
        if (modal) modal.classList.remove("active");
    },

    submitExam(isAuto = false) {
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.closeSubmitConfirm();
        PumkinStorage.clearActiveSession();

        const now = Date.now();
        if (this._lastSwitchTime && this.currentIndex !== undefined && this.questionTimeSpent) {
            const elapsed = Math.max(1, Math.round((now - this._lastSwitchTime) / 1000));
            this.questionTimeSpent[this.currentIndex] = (this.questionTimeSpent[this.currentIndex] || 0) + elapsed;
        }
        this._lastSwitchTime = null;

        const timeSpentSeconds = this.durationSeconds - this.timeRemaining;

        PumkinScoring.gradeExam({
            exam: this.examData,
            questions: this.questions,
            userAnswers: this.userAnswers,
            flagged: this.flagged,
            timeSpentSeconds: timeSpentSeconds,
            questionTimeSpent: this.questionTimeSpent || []
        });
    },

    exitExam() {
        if (confirm("Báº¡n cÃ³ cháº¯c cháº¯n muá»‘n táº¡m dá»«ng bÃ i thi vÃ  thoÃ¡t? Tiáº¿n Ä‘á»™ cá»§a báº¡n Ä‘Ã£ Ä‘Æ°á»£c tá»± Ä‘á»™ng lÆ°u láº¡i.")) {
            if (this.timerInterval) clearInterval(this.timerInterval);
            this.saveSession();
            PumkinRouter.navigate("library");
        }
    }
};

// 5. SCORING & REVIEW MODULE
const PumkinScoring = {
    currentResult: null,

    normalizeMathString(str) {
        if (typeof str !== 'string') return String(str || '').trim();
        return str.trim().replace(/,/g, '.').replace(/\s+/g, '');
    },

    parseFractionOrDecimal(str) {
        const s = this.normalizeMathString(str);
        if (!s) return NaN;
        if (s.includes('/')) {
            const parts = s.split('/');
            if (parts.length === 2) {
                const num = parseFloat(parts[0]);
                const den = parseFloat(parts[1]);
                if (!isNaN(num) && !isNaN(den) && den !== 0) {
                    return num / den;
                }
            }
        }
        return parseFloat(s);
    },

    isShortAnswerCorrect(userAns, q) {
        if (!userAns || typeof userAns !== 'string' || !userAns.trim()) return false;
        const normUser = this.normalizeMathString(userAns);
        const accepted = [q.correct_value, ...(q.accepted_answers || [])];
        if (accepted.some(acc => this.normalizeMathString(acc) === normUser)) {
            return true;
        }
        const userNum = this.parseFractionOrDecimal(userAns);
        if (!isNaN(userNum)) {
            for (const acc of accepted) {
                const accNum = this.parseFractionOrDecimal(acc);
                if (!isNaN(accNum) && Math.abs(userNum - accNum) < 1e-4) {
                    return true;
                }
            }
        }
        return false;
    },

    gradeExam(data) {
        const { exam, questions, userAnswers, flagged, timeSpentSeconds } = data;
        let totalScoreEarned = 0;
        let correctCount = 0;
        let wrongCount = 0;
        let skippedCount = 0;

        const topicStats = {};
        const questionGrading = [];

        questions.forEach((q, idx) => {
            const userAns = userAnswers[idx];
            let earned = 0;
            let status = "wrong";
            let detail = null;

            if (!topicStats[q.topic]) {
                topicStats[q.topic] = { total: 0, correctScore: 0 };
            }
            topicStats[q.topic].total++;

            if (q.type === "true_false_group") {
                const ansObj = (userAns && typeof userAns === "object") ? userAns : {};
                const isSkipped = Object.keys(ansObj).length === 0 || Object.values(ansObj).every(v => v === null);
                if (isSkipped) {
                    status = "skipped";
                    skippedCount++;
                } else {
                    let subCorrect = 0;
                    (q.items || []).forEach(item => {
                        if (ansObj[item.label] === item.correct) {
                            subCorrect++;
                        }
                    });

                    // Ministry & TSA Standard Scoring
                    if (subCorrect === 1) earned = 0.10;
                    else if (subCorrect === 2) earned = 0.25;
                    else if (subCorrect === 3) earned = 0.50;
                    else if (subCorrect === 4) earned = 1.00;
                    else earned = 0.00;

                    if (subCorrect === 4) {
                        status = "correct";
                        correctCount++;
                    } else if (subCorrect > 0) {
                        status = "partial";
                        wrongCount++;
                    } else {
                        status = "wrong";
                        wrongCount++;
                    }
                    detail = { subCorrect, totalSub: (q.items || []).length };
                }
            } else if (q.type === "short_answer") {
                const isSkipped = !userAns || typeof userAns !== "string" || !userAns.trim();
                if (isSkipped) {
                    status = "skipped";
                    skippedCount++;
                } else {
                    const isRight = this.isShortAnswerCorrect(userAns, q);
                    if (isRight) {
                        earned = 1.00;
                        status = "correct";
                        correctCount++;
                    } else {
                        status = "wrong";
                        wrongCount++;
                    }
                }
            } else if (q.type === "step_solution") {
                const isSkipped = !userAns || typeof userAns !== "string" || !userAns.trim();
                if (isSkipped) {
                    status = "skipped";
                    skippedCount++;
                } else {
                    earned = 1.00;
                    status = "correct";
                    correctCount++;
                }
            } else {
                // Default: single_choice
                if (userAns === null || userAns === undefined) {
                    status = "skipped";
                    skippedCount++;
                } else if (userAns === q.correct_answer) {
                    earned = 1.00;
                    status = "correct";
                    correctCount++;
                } else {
                    status = "wrong";
                    wrongCount++;
                }
            }

            totalScoreEarned += earned;
            topicStats[q.topic].correctScore += earned;

            questionGrading.push({
                index: idx,
                questionId: q.id,
                status: status,
                earnedScore: earned,
                detail: detail
            });
        });

        const total = questions.length;
        const accuracy = Math.round((totalScoreEarned / total) * 100);
        const maxScore = (exam.type === "TSA" || total === 40) ? 40 : 10;
        const scoreVal = ((totalScoreEarned / total) * maxScore).toFixed(1);

        const resultRecord = {
            id: "attempt_" + Date.now(),
            exam_id: exam.id,
            exam_title: exam.title,
            exam_type: exam.type,
            date: new Date().toLocaleDateString("vi-VN") + " " + new Date().toLocaleTimeString("vi-VN", { hour: '2-digit', minute: '2-digit' }),
            total_questions: total,
            correct_count: correctCount,
            wrong_count: wrongCount,
            skipped_count: skippedCount,
            score: scoreVal,
            max_score: maxScore,
            total_earned: totalScoreEarned.toFixed(2),
            accuracy: accuracy,
            time_spent_seconds: timeSpentSeconds,
            questions: questions,
            user_answers: userAnswers,
            flagged: flagged,
            topic_stats: topicStats,
            grading: questionGrading
        };

        this.currentResult = resultRecord;
        PumkinStorage.addHistory(resultRecord);

        // Feed attempts into PumkinLearningTrace
        if (typeof PumkinLearningTrace !== "undefined") {
            questions.forEach((q, idx) => {
                const qG = questionGrading[idx];
                const isCorrect = qG && qG.status === "correct";
                const timeSpent = (data.questionTimeSpent && data.questionTimeSpent[idx]) || Math.round(timeSpentSeconds / Math.max(1, questions.length));
                const userAns = userAnswers[idx];
                PumkinLearningTrace.addAttempt({
                    questionId: q.id,
                    examId: exam.id,
                    isCorrect: isCorrect,
                    status: qG ? qG.status : (isCorrect ? "correct" : "wrong"),
                    timeSpentSeconds: timeSpent,
                    userAnswer: userAns,
                    topic: q.topic,
                    cognitive_level: q.cognitive_level || "ThÃ´ng hiá»ƒu",
                    skills: q.skills || []
                });
            });
        }

        this.renderResult(resultRecord);

        // Inject Phase 1 Post-Exam Diagnostic Modal (DL)
        if (window.PUMKIN_DEEP_LEARNING_ENABLED && window.PumkinCognitiveTracker && typeof window.PumkinCognitiveTracker.getStandardizedState === 'function') {
            const finalState = window.PumkinCognitiveTracker.getStandardizedState();
            if (window.PumkinDiagnosticUI) {
                window.PumkinDiagnosticUI.renderDiagnosticModal(finalState);
            }
        }
    },

    renderResult(res) {
        PumkinRouter.navigate("result", () => {
            document.getElementById("result-exam-title-sub").textContent = res.exam_title;
            document.getElementById("result-score-val").textContent = res.score;
            document.getElementById("result-accuracy-big").textContent = `${res.accuracy}%`;

            let gradeMsg = "Ráº¥t tá»‘t! Báº¡n lÃ m chá»§ kiáº¿n thá»©c vá»¯ng vÃ ng.";
            if (res.accuracy >= 90) gradeMsg = "Xuáº¥t sáº¯c! Báº¡n Ä‘Ã£ Ä‘áº¡t má»©c Ä‘iá»ƒm má»¥c tiÃªu cá»§a thá»§ khoa.";
            else if (res.accuracy < 50) gradeMsg = "Cáº§n cá»§ng cá»‘ thÃªm kiáº¿n thá»©c á»Ÿ cÃ¡c chuyÃªn Ä‘á»  yáº¿u.";
            document.getElementById("result-grade-msg").textContent = gradeMsg;

            // Process Level & EXP Reward
            if (window.PumkinLevelSystem && typeof window.PumkinLevelSystem.awardExp === 'function') {
                const awardData = window.PumkinLevelSystem.awardExp(res, PumkinPlayer.examData);
                const expContainer = document.getElementById("result-exp-reward-container");
                if (expContainer) {
                    expContainer.innerHTML = window.PumkinLevelSystem.generateResultCardHtml(awardData);
                }
            }

            // Stats grid
            document.getElementById("stat-correct-count").textContent = res.correct_count;
            document.getElementById("stat-wrong-count").textContent = res.wrong_count;
            document.getElementById("stat-skipped-count").textContent = res.skipped_count;

            const m = Math.floor(res.time_spent_seconds / 60);
            const s = res.time_spent_seconds % 60;
            document.getElementById("stat-total-time").textContent = `${m}m ${s}s`;

            const avgSec = Math.round(res.time_spent_seconds / res.total_questions);
            document.getElementById("stat-avg-time").textContent = `${avgSec}s`;

            // Topic analytics
            const topicContainer = document.getElementById("result-topics-breakdown");
            topicContainer.innerHTML = Object.keys(res.topic_stats).map(tName => {
                const stat = res.topic_stats[tName];
                const pct = Math.round(((stat.correctScore || 0) / stat.total) * 100);
                let colorClass = "medium";
                if (pct >= 80) colorClass = "high";
                if (pct < 50) colorClass = "low";

                return `
                    <div class="topic-row">
                        <div class="topic-row-info">
                            <span>ðŸ“Œ ${tName} (${(stat.correctScore || 0).toFixed(1)}/${stat.total} Ä‘iá»ƒm)</span>
                            <span style="font-weight: 700;">${pct}%</span>
                        </div>
                        <div class="progress-track">
                            <div class="progress-bar-fill ${colorClass}" style="width: ${pct}%;"></div>
                        </div>
                    </div>
                `;
            }).join("");

            // Filter counts
            document.getElementById("rev-cnt-all").textContent = res.total_questions;
            document.getElementById("rev-cnt-correct").textContent = res.correct_count;
            document.getElementById("rev-cnt-wrong").textContent = res.wrong_count;
            document.getElementById("rev-cnt-flagged").textContent = res.flagged.filter(f => f).length;

            // Retry button
            document.getElementById("result-retry-btn").onclick = () => {
                PumkinPlayer.startExam(res.exam_id);
            };

            // Render detailed solutions
            this.renderReviewQuestions("all");
        });
    },

    filterReview(filterType, pillEl) {
        document.querySelectorAll(".review-filter-tabs .filter-pill").forEach(p => p.classList.remove("active"));
        if (pillEl) pillEl.classList.add("active");
        this.renderReviewQuestions(filterType);
    },

    renderReviewQuestions(filterType) {
        const container = document.getElementById("result-review-questions-list");
        if (!container || !this.currentResult) return;

        const res = this.currentResult;
        const letters = ["A", "B", "C", "D", "E"];

        const filteredIndices = res.questions.map((q, idx) => idx).filter(idx => {
            const gradeInfo = res.grading ? res.grading[idx] : null;
            const status = gradeInfo ? gradeInfo.status : "wrong";
            if (filterType === "correct") return status === "correct";
            if (filterType === "wrong") return status === "wrong" || status === "partial";
            if (filterType === "flagged") return res.flagged[idx];
            return true;
        });

        if (filteredIndices.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 30px; background: white; border-radius: 8px; border: 1px dashed #cbd5e1;">
                    <p style="color: var(--text-muted);">KhÃ´ng cÃ³ cÃ¢u há»i nÃ o trong danh má»¥c nÃ y.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredIndices.map(qIdx => {
            const q = res.questions[qIdx];
            const uAns = res.user_answers[qIdx];
            const gradeInfo = res.grading ? res.grading[qIdx] : null;
            const status = gradeInfo ? gradeInfo.status : (uAns === q.correct_answer ? "correct" : (uAns === null ? "skipped" : "wrong"));

            let cardClass = "wrong";
            let badgeHtml = `<span class="status-badge badge-wrong">âŒ SAI (0.00 Ä‘)</span>`;
            if (status === "correct") {
                cardClass = "correct";
                badgeHtml = `<span class="status-badge badge-correct">âœ“ ÄÃšNG (+1.00 Ä‘)</span>`;
            } else if (status === "partial") {
                cardClass = "partial";
                const pts = gradeInfo ? gradeInfo.earnedScore.toFixed(2) : "0.25";
                badgeHtml = `<span class="status-badge badge-warning" style="background:#fef3c7; color:#b45309; border:1px solid #fde68a;">âš ï¸ ÄÃšNG Má»˜T PHáº¦N (+${pts} Ä‘)</span>`;
            } else if (status === "skipped") {
                cardClass = "skipped";
                badgeHtml = `<span class="status-badge badge-skipped">â—‹ Bá»Ž QUA</span>`;
            }

            const isSaved = PumkinStorage.isBookmarked(q.id);

            // Render details by question type
            let answerBodyHtml = "";

            if (q.type === "true_false_group") {
                const userObj = (uAns && typeof uAns === "object") ? uAns : {};
                answerBodyHtml = `
                    <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 14px 18px; margin-bottom: 16px;">
                        <div style="font-size: 13.5px; font-weight: 700; color: var(--primary); margin-bottom: 10px;">
                            Báº¢NG Äá»I CHIáº¾U ÄÃP ÃN ÄÃšNG / SAI:
                        </div>
                        <table style="width: 100%; border-collapse: collapse; font-size: 13.5px;">
                            <thead>
                                <tr style="border-bottom: 1.5px solid #cbd5e1; text-align: left; color: #475569;">
                                    <th style="padding: 6px 8px; width: 40px;">Ã</th>
                                    <th style="padding: 6px 8px;">Ná»™i dung nháº­n Ä‘á»‹nh</th>
                                    <th style="padding: 6px 8px; text-align: center; width: 110px;">Báº¡n chá»n</th>
                                    <th style="padding: 6px 8px; text-align: center; width: 110px;">ÄÃ¡p Ã¡n Ä‘Ãºng</th>
                                    <th style="padding: 6px 8px; text-align: center; width: 80px;">Káº¿t quáº£</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${(q.items || []).map(item => {
                                    const userChoice = userObj[item.label];
                                    const isSubRight = (userChoice === item.correct);
                                    let choiceText = userChoice === true ? "ÄÃºng" : (userChoice === false ? "Sai" : "â€” ChÆ°a chá»n â€”");
                                    let correctText = item.correct ? "ÄÃºng" : "Sai";
                                    return `
                                        <tr style="border-bottom: 1px solid #e2e8f0;">
                                            <td style="padding: 8px; font-weight: 700; color: var(--primary);">${item.label})</td>
                                            <td style="padding: 8px;">${item.text}</td>
                                            <td style="padding: 8px; text-align: center; font-weight: 600; color: ${userChoice !== null && userChoice !== undefined ? (isSubRight ? '#059669' : '#dc2626') : '#64748b'};">${choiceText}</td>
                                            <td style="padding: 8px; text-align: center; font-weight: 700; color: #059669;">${correctText}</td>
                                            <td style="padding: 8px; text-align: center;">${isSubRight ? 'âœ…' : 'âŒ'}</td>
                                        </tr>
                                    `;
                                }).join("")}
                            </tbody>
                        </table>
                        <div style="margin-top: 10px; font-size: 13px; color: var(--text-muted);">
                            ðŸ’¡ <em>Quy cháº¿ Bá»™ GD&ÄT: ÄÃºng 1 Ã½ = 0.1Ä‘ â€¢ ÄÃºng 2 Ã½ = 0.25Ä‘ â€¢ ÄÃºng 3 Ã½ = 0.5Ä‘ â€¢ ÄÃºng 4 Ã½ = 1.0Ä‘.</em>
                        </div>
                    </div>
                `;
            } else if (q.type === "short_answer") {
                const normUser = uAns ? String(uAns).trim() : "";
                const isRight = status === "correct";
                answerBodyHtml = `
                    <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 14px 18px; margin-bottom: 16px;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 14px;">
                            <div style="padding: 10px; border-radius: 6px; background: ${isRight ? '#ecfdf5' : '#fef2f2'}; border: 1px solid ${isRight ? '#10b981' : '#ef4444'};">
                                <strong>ÄÃ¡p sá»‘ báº¡n Ä‘iá»n:</strong> <span>${normUser || '(ChÆ°a Ä‘iá»n Ä‘Ã¡p sá»‘)'}</span>
                            </div>
                            <div style="padding: 10px; border-radius: 6px; background: #ecfdf5; border: 1px solid #10b981; color: #065f46;">
                                <strong>ÄÃ¡p Ã¡n chuáº©n:</strong> <span style="font-weight: 700; font-size: 16px;">${q.correct_value}</span>
                            </div>
                        </div>
                        ${q.accepted_answers && q.accepted_answers.length > 1 ? `
                            <div style="margin-top: 8px; font-size: 12.5px; color: #64748b;">
                                CÃ¡c Ä‘á»‹nh dáº¡ng tÆ°Æ¡ng Ä‘Æ°Æ¡ng Ä‘Æ°á»£c cháº¥p nháº­n: <code>${q.accepted_answers.join(', ')}</code>
                            </div>
                        ` : ''}
                    </div>
                `;
            } else if (q.type === "step_solution") {
                answerBodyHtml = `
                    <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 14px 18px; margin-bottom: 16px;">
                        <div style="font-size: 13.5px; font-weight: 700; color: var(--primary); margin-bottom: 8px;">
                            ðŸ“ Báº¢N TRÃŒNH BÃ€Y Cá»¦A THÃ SINH:
                        </div>
                        <div style="background: white; border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px; font-size: 13.5px; white-space: pre-wrap; margin-bottom: 12px; color: #334155;">${uAns ? String(uAns).trim() : '(KhÃ´ng cÃ³ ghi chÃº bÃ i lÃ m)'}</div>
                        <div style="font-size: 13.5px; font-weight: 700; color: var(--primary); margin-bottom: 8px;">
                            ðŸ“‹ BAREM CHáº¤M ÄIá»‚M Tá»ªNG BÆ¯á»šC:
                        </div>
                        ${(q.steps || []).map(st => `
                            <div class="step-item-block" style="margin-bottom: 8px;">
                                <div class="step-header">
                                    <span>${st.title}</span>
                                    <span style="color: var(--success); font-weight: 700;">+${st.points} Ä‘</span>
                                </div>
                                <div class="step-content">${st.content}</div>
                            </div>
                        `).join("")}
                    </div>
                `;
            } else {
                // Default: single_choice
                answerBodyHtml = `
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px;">
                        ${(q.options || []).map((opt, oIdx) => {
                            let optStyle = "background: #f8fafc; border: 1px solid #e2e8f0;";
                            if (oIdx === q.correct_answer) {
                                optStyle = "background: #ecfdf5; border: 1.5px solid #10b981; font-weight: 600; color: #065f46;";
                            } else if (oIdx === uAns && status !== "correct") {
                                optStyle = "background: #fef2f2; border: 1.5px solid #ef4444; color: #991b1b;";
                            }

                            return `
                                <div style="padding: 10px 14px; border-radius: 6px; font-size: 13.5px; ${optStyle}">
                                    <strong>${letters[oIdx]}.</strong> ${opt}
                                    ${oIdx === q.correct_answer ? ' <span style="color: #059669;">(ÄÃ¡p Ã¡n Ä‘Ãºng)</span>' : ''}
                                    ${oIdx === uAns && status !== "correct" ? ' <span style="color: #dc2626;">(ÄÃ¡p Ã¡n báº¡n chá»n)</span>' : ''}
                                </div>
                            `;
                        }).join("")}
                    </div>
                `;
            }

            return `
                <div class="review-card ${cardClass}">
                    <div class="review-status-header">
                        <div>
                            <span class="question-number-badge">CÃ‚U ${qIdx + 1}</span>
                            <span style="font-size: 12.5px; color: var(--text-muted); margin-left: 8px;">${q.topic} â€¢ ${q.difficulty}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            ${badgeHtml}
                            <button class="btn btn-sm btn-outline" onclick="PumkinScoring.toggleSaveQuestion('${q.id}', this)">
                                ${isSaved ? 'â˜… ÄÃ£ lÆ°u' : 'â˜† LÆ°u cÃ¢u nÃ y'}
                            </button>
                        </div>
                    </div>

                    <div style="font-size: 15px; margin-bottom: 16px; line-height: 1.65;">
                        ${q.question_text}
                    </div>

                    ${answerBodyHtml}

                    <div class="explanation-card">
                        <div class="explanation-title">
                            <span>ðŸ’¡</span> Lá»œI GIáº¢I CHI TIáº¾T Tá»ªNG BÆ¯á»šC:
                        </div>
                        <div style="line-height: 1.7; color: var(--text-main);">
                            ${q.explanation || 'Äang cáº­p nháº­t lá»i giáº£i chi tiáº¿t cho cÃ¢u há»i nÃ y.'}
                        </div>
                    </div>

                    <div class="pumkin-card-watermark">
                        <span class="brand-dot"></span> PUMKIN.DEV â€¢ Ná»€N Táº¢NG KHáº¢O THÃ TOÃN Há»ŒC CHUáº¨N HÃ“A
                    </div>
                </div>
            `;
        }).join("");

        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([container]);
        }
    },

    toggleSaveQuestion(qId, btnEl) {
        const added = PumkinStorage.toggleBookmark(qId);
        if (btnEl) {
            btnEl.textContent = added ? "â˜… ÄÃ£ lÆ°u" : "â˜† LÆ°u cÃ¢u nÃ y";
        }
    }
};

// 6. EXAM GENERATOR MODULE (10-STEP ALGORITHM)
const PumkinGenerator = {
    selectPill(gridId, pillEl) {
        document.querySelectorAll(`#${gridId} .radio-pill-card`).forEach(p => p.classList.remove("selected"));
        pillEl.classList.add("selected");
    },

    generateExam() {
        const typePill = document.querySelector("#gen-type-grid .radio-pill-card.selected");
        const countPill = document.querySelector("#gen-count-grid .radio-pill-card.selected");
        const timePill = document.querySelector("#gen-time-grid .radio-pill-card.selected");
        const diffPill = document.querySelector("#gen-diff-grid .radio-pill-card.selected");

        const targetType = typePill ? typePill.dataset.val : "TSA";
        const qCount = countPill ? parseInt(countPill.dataset.val) : 20;
        const durationMin = timePill ? parseInt(timePill.dataset.val) : 45;
        const diffProfile = diffPill ? diffPill.dataset.val : "balanced";

        const checkedTopics = Array.from(document.querySelectorAll('input[name="gen_topic"]:checked')).map(cb => cb.value);

        if (checkedTopics.length === 0) {
            alert("Vui lÃ²ng chá»n Ã­t nháº¥t 1 chá»§ Ä‘á» kiáº¿n thá»©c!");
            return;
        }

        const allQuestions = PumkinStorage.getQuestions();

        // 1. Filter pool by type
        let pool = allQuestions.filter(q => {
            if (targetType !== "all" && q.exam_type !== targetType) return false;
            if (!checkedTopics.includes(q.topic)) return false;
            return true;
        });

        if (pool.length === 0) {
            pool = allQuestions.filter(q => checkedTopics.includes(q.topic));
        }

        // 2. Shuffle helper
        function shuffle(array) {
            const arr = [...array];
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }

        // 3. Match difficulty distribution
        let selectedQuestions = [];
        if (diffProfile === "balanced") {
            const easy = shuffle(pool.filter(q => q.difficulty === "Dá»…"));
            const medium = shuffle(pool.filter(q => q.difficulty === "Trung bÃ¬nh"));
            const hard = shuffle(pool.filter(q => q.difficulty === "KhÃ³"));

            const targetEasy = Math.max(1, Math.round(qCount * 0.25));
            const targetHard = Math.max(1, Math.round(qCount * 0.25));
            const targetMed = qCount - targetEasy - targetHard;

            selectedQuestions = [
                ...easy.slice(0, targetEasy),
                ...medium.slice(0, targetMed),
                ...hard.slice(0, targetHard)
            ];
        } else {
            const diffQuestions = shuffle(pool.filter(q => q.difficulty === diffProfile));
            selectedQuestions = diffQuestions.slice(0, qCount);
        }

        // If not enough questions, fill from pool
        if (selectedQuestions.length < qCount) {
            const remainingPool = shuffle(pool.filter(q => !selectedQuestions.some(sq => sq.id === q.id)));
            selectedQuestions = selectedQuestions.concat(remainingPool.slice(0, qCount - selectedQuestions.length));
        }

        // If still not enough, take from all questions
        if (selectedQuestions.length < qCount) {
            const extra = shuffle(allQuestions.filter(q => !selectedQuestions.some(sq => sq.id === q.id)));
            selectedQuestions = selectedQuestions.concat(extra.slice(0, qCount - selectedQuestions.length));
        }

        selectedQuestions = shuffle(selectedQuestions);

        const customExam = {
            id: "custom_" + Date.now(),
            title: `Äá» TÃ¹y Chá»‰nh: ${targetType === 'all' ? 'Tá»•ng há»£p' : targetType} (${selectedQuestions.length} cÃ¢u - ${durationMin} phÃºt)`,
            type: targetType === 'all' ? 'Tá»•ng há»£p' : targetType,
            year: 2025,
            duration_minutes: durationMin,
            questions: selectedQuestions,
            difficulty: diffProfile === 'balanced' ? 'CÃ¢n báº±ng' : diffProfile,
            source: "Táº¡o tá»± Ä‘á»™ng tá»« NgÃ¢n hÃ ng PUMKIN.DEV",
            description: `Äá» luyá»‡n táº­p sinh tá»± Ä‘á»™ng bÃ¡m sÃ¡t cáº¥u trÃºc cÃ¡c chá»§ Ä‘á»: ${checkedTopics.join(", ")}.`
        };

        PumkinPlayer.startExam(customExam.id, true, customExam);
    }
};

// 7. SMART PRACTICE MODULE
const PumkinSmartPractice = {
    render() {
        const container = document.getElementById("smart-practice-content");
        if (!container) return;

        const history = PumkinStorage.getHistory();
        const allQuestions = PumkinStorage.getQuestions();

        if (history.length === 0) {
            container.innerHTML = `
                <div style="background: white; border: 1px solid var(--border-color); border-radius: 10px; padding: 40px; text-align: center;">
                    <div style="font-size: 40px; margin-bottom: 12px;">ðŸ§ </div>
                    <h3 style="color: var(--primary); margin-bottom: 10px;">ChÆ°a cÃ³ dá»¯ liá»‡u lÃ m bÃ i thi</h3>
                    <p style="color: var(--text-muted); max-width: 500px; margin: 0 auto 20px auto; font-size: 14px;">
                        HÃ£y hoÃ n thÃ nh Ã­t nháº¥t 1 Ä‘á» thi trong Kho Ä‘á». Há»‡ thá»‘ng AI sáº½ tá»± Ä‘á»™ng phÃ¢n tÃ­ch cÃ¡c cÃ¢u lÃ m sai vÃ  chá»§ Ä‘á» yáº¿u Ä‘á»ƒ thiáº¿t káº¿ bÃ i luyá»‡n riÃªng cho báº¡n!
                    </p>
                    <button class="btn btn-primary" onclick="PumkinRouter.navigate('library')">
                        ðŸ“š LÃ m Ä‘á» Ä‘áº§u tiÃªn ngay
                    </button>
                </div>
            `;
            return;
        }

        // Collect wrong question IDs
        const wrongQIds = new Set();
        const topicMistakes = {};

        history.forEach(attempt => {
            attempt.questions.forEach((q, idx) => {
                const uAns = attempt.user_answers[idx];
                if (uAns !== null && uAns !== q.correct_answer) {
                    wrongQIds.add(q.id);
                    topicMistakes[q.topic] = (topicMistakes[q.topic] || 0) + 1;
                }
            });
        });

        const sortedWeakTopics = Object.keys(topicMistakes).sort((a, b) => topicMistakes[b] - topicMistakes[a]);

        container.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                <div style="background: white; border: 1px solid var(--border-color); border-radius: 10px; padding: 22px;">
                    <h4 style="color: var(--primary); margin-bottom: 12px; font-size: 16px;">âš ï¸ CÃC CHá»¦ Äá»€ Báº N HAY Máº®C SAI Láº¦M:</h4>
                    ${sortedWeakTopics.map(top => `
                        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 13.5px;">
                            <span>ðŸ“Œ <strong>${top}</strong></span>
                            <span style="color: var(--danger); font-weight: 700;">${topicMistakes[top]} láº§n sai</span>
                        </div>
                    `).join("")}
                </div>

                <div style="background: white; border: 1px solid var(--border-color); border-radius: 10px; padding: 22px; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h4 style="color: var(--success); margin-bottom: 12px; font-size: 16px;">ðŸš€ Äá»€ XUáº¤T LUYá»†N Táº¬P HÃ”M NAY:</h4>
                        <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;">
                            Há»‡ thá»‘ng Ä‘Ã£ tá»•ng há»£p <strong>${Math.max(5, wrongQIds.size)} cÃ¢u há»i trá»ng tÃ¢m</strong> bao gá»“m cÃ¡c cÃ¢u báº¡n tá»«ng lÃ m sai vÃ  cÃ¡c cÃ¢u tÆ°Æ¡ng tá»± thuá»™c chá»§ Ä‘á» <em>${sortedWeakTopics[0] || 'ToÃ¡n há»c'}</em>.
                        </p>
                    </div>
                    <button class="btn btn-primary btn-lg" onclick="PumkinSmartPractice.startSmartDrill()">
                        âš¡ Báº¯t Ä‘áº§u luyá»‡n 15 cÃ¢u kháº¯c phá»¥c Ä‘iá»ƒm yáº¿u
                    </button>
                </div>
            </div>
        `;
    },

    startSmartDrill() {
        const history = PumkinStorage.getHistory();
        const allQuestions = PumkinStorage.getQuestions();
        const wrongQIds = new Set();

        history.forEach(attempt => {
            attempt.questions.forEach((q, idx) => {
                const uAns = attempt.user_answers[idx];
                if (uAns !== null && uAns !== q.correct_answer) {
                    wrongQIds.add(q.id);
                }
            });
        });

        let drillQuestions = allQuestions.filter(q => wrongQIds.has(q.id));
        if (drillQuestions.length < 15) {
            const extra = allQuestions.filter(q => !wrongQIds.has(q.id));
            drillQuestions = drillQuestions.concat(extra.slice(0, 15 - drillQuestions.length));
        }

        const drillExam = {
            id: "smart_drill_" + Date.now(),
            title: "Smart Practice: BÃ i Luyá»‡n Kháº¯c Phá»¥c Äiá»ƒm Yáº¿u",
            type: "Luyá»‡n thÃ´ng minh",
            year: 2025,
            duration_minutes: 30,
            questions: drillQuestions.slice(0, 15),
            difficulty: "CÃ¢n báº±ng",
            source: "AI Adaptive Engine - PUMKIN.DEV",
            description: "Gá»“m cÃ¡c cÃ¢u há»i báº¡n tá»«ng tráº£ lá»i sai vÃ  cÃ¡c dáº¡ng bÃ i thuá»™c chá»§ Ä‘á» cáº§n cá»§ng cá»‘."
        };

        PumkinPlayer.startExam(drillExam.id, true, drillExam);
    }
};

// 8. BOOKMARKS 2.0 MODULE
const PumkinBookmarks = {
    activeFilter: "all",

    updateBadge() {
        const bms = PumkinStorage.getBookmarks();
        const badge = document.getElementById("nav-bookmark-count");
        if (badge) {
            badge.textContent = bms.length;
            badge.style.display = bms.length > 0 ? "inline-block" : "none";
        }
        this.updateCounts();
    },

    updateCounts() {
        const details = PumkinStorage.getBookmarkDetails();
        const counts = {
            all: details.length,
            "chÆ°a hiá»ƒu": 0,
            "hay sai": 0,
            "cÃ¢u hay": 0,
            "muá»‘n há»c láº¡i": 0,
            "cÃ¢u khÃ³": 0
        };
        details.forEach(item => {
            const r = (item.reason || "chÆ°a hiá»ƒu").toLowerCase().trim();
            if (counts[r] !== undefined) counts[r]++;
            else counts["chÆ°a hiá»ƒu"]++;
        });

        const map = {
            "bm-count-all": counts.all,
            "bm-count-chuahieu": counts["chÆ°a hiá»ƒu"],
            "bm-count-haysai": counts["hay sai"],
            "bm-count-cauhay": counts["cÃ¢u hay"],
            "bm-count-hoclai": counts["muá»‘n há»c láº¡i"],
            "bm-count-caukho": counts["cÃ¢u khÃ³"]
        };
        for (const [elId, count] of Object.entries(map)) {
            const el = document.getElementById(elId);
            if (el) el.textContent = count;
        }
    },

    filterBookmarks(reason, btn) {
        this.activeFilter = reason;
        const buttons = document.querySelectorAll("#view-bookmarks .filter-pill");
        buttons.forEach(b => b.classList.remove("active"));
        if (btn) btn.classList.add("active");
        this.render();
    },

    render() {
        this.updateBadge();
        const container = document.getElementById("bookmarks-list-container");
        if (!container) return;

        const details = PumkinStorage.getBookmarkDetails();
        if (details.length === 0) {
            container.innerHTML = `
                <div style="background: var(--card-bg, white); border: 1px solid var(--border-color); border-radius: 12px; padding: 40px; text-align: center;">
                    <div style="font-size: 44px; margin-bottom: 12px;">ðŸ”–</div>
                    <h3 style="color: var(--primary); margin-bottom: 10px;">ChÆ°a cÃ³ cÃ¢u há»i nÃ o Ä‘Æ°á»£c lÆ°u</h3>
                    <p style="color: var(--text-muted); font-size: 14px;">Trong quÃ¡ trÃ¬nh lÃ m bÃ i hoáº·c xem ngÃ¢n hÃ ng cÃ¢u há»i, hÃ£y báº¥m <strong>"LÆ°u cÃ¢u nÃ y"</strong> Ä‘á»ƒ Ä‘Æ°a vÃ o danh má»¥c Ã´n táº­p trá»ng tÃ¢m.</p>
                </div>
            `;
            return;
        }

        const filtered = this.activeFilter === "all"
            ? details
            : details.filter(item => (item.reason || "chÆ°a hiá»ƒu").toLowerCase().trim() === this.activeFilter.toLowerCase().trim());

        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="background: var(--card-bg, white); border: 1px dashed var(--border-color); border-radius: 12px; padding: 32px; text-align: center; color: var(--text-muted);">
                    <p>KhÃ´ng cÃ³ cÃ¢u há»i nÃ o trong danh má»¥c <strong>"${this.activeFilter}"</strong>.</p>
                </div>
            `;
            return;
        }

        const letters = ["A", "B", "C", "D"];
        const reasonLabels = [
            { id: "chÆ°a hiá»ƒu", label: "â“ ChÆ°a hiá»ƒu" },
            { id: "hay sai", label: "âš ï¸ Hay sai" },
            { id: "cÃ¢u hay", label: "â­ CÃ¢u hay" },
            { id: "muá»‘n há»c láº¡i", label: "ðŸ”„ Muá»‘n há»c láº¡i" },
            { id: "cÃ¢u khÃ³", label: "ðŸ”¥ CÃ¢u khÃ³" }
        ];

        container.innerHTML = filtered.map((item, idx) => {
            const q = PumkinStorage.getQuestionById(item.id);
            if (!q) return "";
            const currentReason = item.reason || "chÆ°a hiá»ƒu";

            // Question DNA badges
            const cognitiveBadge = q.cognitive_level ? `<span class="dna-pill dna-pill-cognitive">ðŸ§  ${q.cognitive_level}</span>` : '';
            const skillBadges = (q.skills || []).map(s => `<span class="dna-pill">âš¡ ${s}</span>`).join(" ");

            return `
                <div class="review-card" style="border-left: 5px solid var(--warning); margin-bottom: 18px;">
                    <div class="review-status-header" style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; flex-wrap: wrap;">
                        <div>
                            <span class="question-number-badge">CÃ‚U ${idx + 1}</span>
                            <span style="font-size: 12.5px; color: var(--text-muted); margin-left: 8px;">${q.topic} â€¢ ${q.difficulty}</span>
                            <div style="margin-top: 6px; display: flex; gap: 6px; flex-wrap: wrap;">
                                ${cognitiveBadge}
                                ${skillBadges}
                            </div>
                        </div>
                        <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                            <label style="font-size: 12px; color: var(--text-muted); font-weight: 600;">PhÃ¢n loáº¡i:</label>
                            <select class="form-control" style="font-size: 12px; padding: 4px 8px; border-radius: 6px; width: auto; display: inline-block;" onchange="PumkinStorage.setBookmarkReason('${q.id}', this.value)">
                                ${reasonLabels.map(r => `<option value="${r.id}" ${r.id === currentReason ? "selected" : ""}>${r.label}</option>`).join("")}
                            </select>
                            <button class="btn btn-sm btn-outline" style="color: var(--danger); border-color: var(--danger);" onclick="PumkinBookmarks.removeBookmark('${q.id}')">
                                ðŸ—‘ï¸ XÃ³a
                            </button>
                        </div>
                    </div>

                    <div style="font-size: 15px; margin: 14px 0; line-height: 1.6;">
                        ${q.question_text}
                    </div>

                    ${Array.isArray(q.options) && q.options.length > 0 ? `
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 8px; margin-bottom: 14px;">
                        ${q.options.map((opt, oIdx) => `
                            <div style="padding: 8px 12px; border-radius: 6px; font-size: 13.5px; background: ${oIdx === q.correct_answer ? '#ecfdf5' : '#f8fafc'}; border: 1px solid ${oIdx === q.correct_answer ? '#10b981' : '#e2e8f0'};">
                                <strong>${letters[oIdx]}.</strong> ${opt}
                                ${oIdx === q.correct_answer ? ' <span style="color: #059669; font-weight: 700;">âœ“</span>' : ''}
                            </div>
                        `).join("")}
                    </div>` : ''}

                    ${q.common_traps && q.common_traps.length > 0 ? `
                    <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 10px 14px; margin-bottom: 12px; font-size: 13px; color: #92400e;">
                        <strong>âš ï¸ Báº«y tÆ° duy thÆ°á»ng gáº·p:</strong>
                        <ul style="margin: 4px 0 0 16px; padding: 0;">
                            ${q.common_traps.map(t => `<li>${t}</li>`).join("")}
                        </ul>
                    </div>` : ''}

                    <details class="explanation-card" style="cursor: pointer;">
                        <summary class="explanation-title" style="margin-bottom: 0;">
                            <span>ðŸ’¡</span> Xem lá»i giáº£i chi tiáº¿t & PhÆ°Æ¡ng phÃ¡p
                        </summary>
                        <div style="margin-top: 12px; line-height: 1.65;">
                            ${q.explanation || "ChÆ°a cÃ³ lá»i giáº£i chi tiáº¿t."}
                        </div>
                    </details>
                </div>
            `;
        }).join("");

        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([container]);
        }
    },

    removeBookmark(qId) {
        PumkinStorage.toggleBookmark(qId);
        this.render();
    },

    practiceSavedQuestions() {
        const details = PumkinStorage.getBookmarkDetails();
        if (details.length === 0) {
            alert("Báº¡n chÆ°a lÆ°u cÃ¢u há»i nÃ o Ä‘á»ƒ luyá»‡n táº­p!");
            return;
        }

        const filtered = this.activeFilter === "all"
            ? details
            : details.filter(item => (item.reason || "chÆ°a hiá»ƒu").toLowerCase().trim() === this.activeFilter.toLowerCase().trim());

        const questions = filtered.map(item => PumkinStorage.getQuestionById(item.id)).filter(q => q !== null);
        if (questions.length === 0) {
            alert(`KhÃ´ng cÃ³ cÃ¢u há»i nÃ o trong danh má»¥c '${this.activeFilter}' Ä‘á»ƒ luyá»‡n táº­p.`);
            return;
        }

        const exam = {
            id: "saved_drill_" + Date.now(),
            title: `Luyá»‡n Táº­p CÃ¢u ÄÃ£ LÆ°u (${this.activeFilter === "all" ? "Táº¥t cáº£" : this.activeFilter}) - ${questions.length} cÃ¢u`,
            type: "Ã”n táº­p chuyÃªn Ä‘á»",
            year: 2025,
            duration_minutes: Math.max(10, questions.length * 2),
            questions: questions,
            difficulty: "Trá»ng tÃ¢m",
            source: "Kho cÃ¢u há»i lÆ°u trá»¯ cÃ¡ nhÃ¢n",
            description: `Äá» Ã´n táº­p tÃ¹y biáº¿n táº­p trung vÃ o ${questions.length} cÃ¢u há»i theo tiÃªu chÃ­ '${this.activeFilter}'.`
        };

        PumkinPlayer.startExam(exam.id, true, exam);
    }
};

// 9. DASHBOARD & ANALYTICS MODULE
const PumkinAnalytics = {
    calculateReadiness(history) {
        if (!history || history.length === 0) {
            return { tsa: 0, hsa: 0, weakTopic: null };
        }

        let tsaTotal = 0, tsaScore = 0;
        let hsaTotal = 0, hsaScore = 0;
        const topicStats = {};

        history.forEach(attempt => {
            const type = attempt.exam_type || "";
            const acc = attempt.accuracy || 0;
            const qCount = attempt.total_questions || 10;

            if (type.includes("TSA")) {
                tsaTotal += qCount;
                tsaScore += (acc / 100) * qCount;
            } else if (type.includes("HSA")) {
                hsaTotal += qCount;
                hsaScore += (acc / 100) * qCount;
            } else {
                tsaTotal += qCount * 0.4;
                tsaScore += (acc / 100) * qCount * 0.4;
                hsaTotal += qCount * 0.4;
                hsaScore += (acc / 100) * qCount * 0.4;
            }

            if (attempt.topic_breakdown) {
                Object.entries(attempt.topic_breakdown).forEach(([top, stat]) => {
                    if (!topicStats[top]) topicStats[top] = { total: 0, correct: 0 };
                    topicStats[top].total += stat.total;
                    topicStats[top].correct += stat.correct;
                });
            }
        });

        const tsaPct = tsaTotal > 0 ? Math.min(100, Math.round((tsaScore / tsaTotal) * 100)) : 0;
        const hsaPct = hsaTotal > 0 ? Math.min(100, Math.round((hsaScore / hsaTotal) * 100)) : 0;

        let weakTopic = null;
        let minAcc = 100;
        Object.entries(topicStats).forEach(([top, stat]) => {
            const rate = (stat.correct / stat.total) * 100;
            if (rate < minAcc) {
                minAcc = rate;
                weakTopic = top;
            }
        });

        return { tsa: tsaPct, hsa: hsaPct, weakTopic };
    },

    renderDashboard() {
        const history = PumkinStorage.getHistory();
        const user = (typeof PumkinAuth !== "undefined") ? PumkinAuth.getCurrentUser() : null;

        // Update user sync badge
        const syncBadge = document.getElementById("user-sync-status-badge");
        if (syncBadge) {
            if (user) {
                syncBadge.textContent = `ðŸ‘¤ ${user.username} (ÄÃ£ Ä‘á»“ng bá»™)`;
                syncBadge.style.borderColor = "var(--success)";
                syncBadge.style.color = "var(--success)";
            } else {
                syncBadge.textContent = "KhÃ¡ch (ChÆ°a Ä‘Äƒng nháº­p)";
                syncBadge.style.borderColor = "#cbd5e1";
                syncBadge.style.color = "var(--text-muted)";
            }
        }

        // Aggregate summary stats
        let totalQuestions = 0;
        let totalCorrect = 0;
        let totalSec = 0;

        history.forEach(att => {
            totalQuestions += att.total_questions || 0;
            totalCorrect += att.correct_count || 0;
            totalSec += att.time_spent_seconds || 0;
        });

        const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
        const totalHours = (totalSec / 3600).toFixed(1);

        const elExams = document.getElementById("dash-total-exams");
        const elQ = document.getElementById("dash-total-questions");
        const elAcc = document.getElementById("dash-overall-accuracy");
        const elHours = document.getElementById("dash-total-hours");

        if (elExams) elExams.textContent = history.length;
        if (elQ) elQ.textContent = totalQuestions;
        if (elAcc) elAcc.textContent = `${overallAccuracy}%`;
        if (elHours) elHours.textContent = `${totalHours}h`;

        // Calculate Readiness
        const readiness = this.calculateReadiness(history);
        const tsaCircle = document.getElementById("gauge-tsa-circle");
        const tsaText = document.getElementById("gauge-tsa-text");
        const hsaCircle = document.getElementById("gauge-hsa-circle");
        const hsaText = document.getElementById("gauge-hsa-text");

        if (tsaText) tsaText.textContent = `${readiness.tsa}%`;
        if (hsaText) hsaText.textContent = `${readiness.hsa}%`;

        if (tsaCircle) {
            const color = readiness.tsa >= 75 ? "var(--success)" : (readiness.tsa >= 50 ? "var(--warning)" : "var(--primary-light)");
            tsaCircle.style.background = `conic-gradient(${color} ${readiness.tsa * 3.6}deg, #e2e8f0 0deg)`;
        }
        if (hsaCircle) {
            const color = readiness.hsa >= 75 ? "var(--success)" : (readiness.hsa >= 50 ? "var(--warning)" : "var(--hsa-color)");
            hsaCircle.style.background = `conic-gradient(${color} ${readiness.hsa * 3.6}deg, #e2e8f0 0deg)`;
        }

        // Render Next Best Action Learning Path
        this.renderLearningPath(readiness.weakTopic, history);

        // Render V2 Mathematics Skill Profile & Error Distribution
        if (typeof PumkinSkillProfile !== "undefined") {
            PumkinSkillProfile.renderSkillProfile();
        }

        // Render History Table
        this.renderHistoryTable(history);
    },

    renderLearningPath(weakTopic, history) {
        const container = document.getElementById("learning-path-step-list");
        const summary = document.getElementById("learning-path-recommendation-summary");
        if (!container) return;

        const articles = PumkinStorage.getKnowledgeBase();
        let targetArticle = null;

        if (weakTopic) {
            targetArticle = articles.find(a => a.topic && a.topic.toLowerCase().includes(weakTopic.toLowerCase()));
        }
        if (!targetArticle && articles.length > 0) {
            targetArticle = articles[10] || articles[0];
        }

        if (summary) {
            if (history.length === 0) {
                summary.innerHTML = `ðŸ’¡ ChÆ°a cÃ³ dá»¯ liá»‡u bÃ i thi. Há»‡ thá»‘ng Ä‘á» xuáº¥t lá»™ trÃ¬nh khá»Ÿi Ä‘á»™ng vá»›i chuyÃªn Ä‘á» cá»‘t lÃµi: <strong>${targetArticle ? targetArticle.title : 'Giáº£i tÃ­ch'}</strong>.`;
            } else {
                summary.innerHTML = `ðŸŽ¯ Dá»±a trÃªn káº¿t quáº£ gáº§n Ä‘Ã¢y, há»‡ thá»‘ng phÃ¡t hiá»‡n chuyÃªn Ä‘á» cáº§n tá»‘i Æ°u hÃ³a Ä‘iá»ƒm sá»‘: <strong>${targetArticle ? targetArticle.title : 'ChuyÃªn Ä‘á» trá»ng tÃ¢m'}</strong>.`;
            }
        }

        container.innerHTML = `
            <div class="learning-path-step">
                <div class="learning-step-badge">1</div>
                <div class="learning-step-content">
                    <div class="learning-step-title">Ã”n láº¡i lÃ½ thuyáº¿t cá»‘t lÃµi & PhÆ°Æ¡ng phÃ¡p</div>
                    <div class="learning-step-desc">Äá»c láº¡i Ä‘á»‹nh lÃ½, Ä‘iá»u kiá»‡n Ã¡p dá»¥ng vÃ  cÃ¡c báº«y thÆ°á»ng gáº·p cá»§a chuyÃªn Ä‘á» <strong>${targetArticle ? targetArticle.title : ''}</strong>.</div>
                    <button class="btn btn-sm btn-outline" style="margin-top: 8px;" onclick="PumkinKnowledge.openArticle('${targetArticle ? targetArticle.id : 'kb_toan12_01'}')">
                        ðŸ“– Má»Ÿ chuyÃªn Ä‘á» lÃ½ thuyáº¿t
                    </button>
                </div>
            </div>

            <div class="learning-path-step">
                <div class="learning-step-badge">2</div>
                <div class="learning-step-content">
                    <div class="learning-step-title">Náº¯m cháº¯c sá»• tay cÃ´ng thá»©c then chá»‘t</div>
                    <div class="learning-step-desc">Ghi nhá»› ${(targetArticle && targetArticle.formulas) ? targetArticle.formulas.length : 3} cÃ´ng thá»©c then chá»‘t vÃ  Ä‘iá»u kiá»‡n biÃªn.</div>
                    <button class="btn btn-sm btn-outline" style="margin-top: 8px;" onclick="PumkinRouter.navigate('formulas')">
                        ðŸ“ Má»Ÿ sá»• tay cÃ´ng thá»©c
                    </button>
                </div>
            </div>

            <div class="learning-path-step">
                <div class="learning-step-badge">3</div>
                <div class="learning-step-content">
                    <div class="learning-step-title">Luyá»‡n táº­p má»¥c tiÃªu (5 cÃ¢u tráº¯c nghiá»‡m chuyÃªn Ä‘á»)</div>
                    <div class="learning-step-desc">Thá»±c hÃ nh ngay 5 cÃ¢u há»i cÃ³ phÃ¢n hÃ³a tá»« dá»… Ä‘áº¿n khÃ³ Ä‘á»ƒ cá»§ng cá»‘ pháº£n xáº¡.</div>
                    <button class="btn btn-sm btn-primary" style="margin-top: 8px;" onclick="PumkinKnowledge.startDrillForArticle('${targetArticle ? targetArticle.id : 'kb_toan12_01'}')">
                        âš¡ Báº¯t Ä‘áº§u 5 cÃ¢u Drill
                    </button>
                </div>
            </div>

            <div class="learning-path-step">
                <div class="learning-step-badge">4</div>
                <div class="learning-step-content">
                    <div class="learning-step-title">Thi thá»­ Ä‘á» chuáº©n hÃ³a (TSA / HSA)</div>
                    <div class="learning-step-desc">Äo lÆ°á»ng sá»± tiáº¿n bá»™ báº±ng má»™t Ä‘á» thi hoÃ n chá»‰nh cÃ³ tÃ­nh thá»i gian thá»±c.</div>
                    <button class="btn btn-sm btn-success" style="margin-top: 8px;" onclick="PumkinRouter.navigate('library')">
                        ðŸ“š Chá»n Ä‘á» thi thá»­ ngay
                    </button>
                </div>
            </div>
        `;
    },

    renderHistoryTable(history) {
        const tableContainer = document.getElementById("dash-history-table-container");
        if (!tableContainer) return;

        if (history.length === 0) {
            tableContainer.innerHTML = `
                <p style="color: var(--text-muted); font-size: 14px; text-align: center; padding: 20px;">
                    ChÆ°a cÃ³ bÃ i thi nÃ o Ä‘Æ°á»£c ghi nháº­n. HÃ£y lÃ m má»™t Ä‘á» thi Ä‘á»ƒ xem thá»‘ng kÃª!
                </p>
            `;
            return;
        }

        tableContainer.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Thá»i gian</th>
                        <th>Äá» thi</th>
                        <th>Äiá»ƒm sá»‘</th>
                        <th>ChÃ­nh xÃ¡c</th>
                        <th>Thá»i gian lÃ m</th>
                        <th>Thao tÃ¡c</th>
                    </tr>
                </thead>
                <tbody>
                    ${history.map(att => `
                        <tr>
                            <td>${att.date}</td>
                            <td><strong>${att.exam_title}</strong></td>
                            <td><span style="color: var(--primary); font-weight: 700;">${att.score}</span> / ${att.max_score}</td>
                            <td>
                                <span class="badge-tag ${att.accuracy >= 80 ? 'badge-tsa' : 'badge-hsa'}">
                                    ${att.accuracy}%
                                </span>
                            </td>
                            <td>${Math.floor(att.time_spent_seconds / 60)}m ${att.time_spent_seconds % 60}s</td>
                            <td>
                                <button class="btn btn-sm btn-outline" onclick="PumkinDashboard.reviewPastAttempt('${att.id}')">
                                    Xem láº¡i káº¿t quáº£
                                </button>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;
    }
};

const PumkinDashboard = {
    render() {
        PumkinAnalytics.renderDashboard();
    },

    reviewPastAttempt(attemptId) {
        const history = PumkinStorage.getHistory();
        const att = history.find(h => h.id === attemptId);
        if (att) {
            PumkinScoring.currentResult = att;
            PumkinScoring.renderResult(att);
        }
    }
};

// 10. ADMIN & IMPORT MODULE
const PumkinAdmin = {
    render() {
        const questions = PumkinStorage.getQuestions();
        document.getElementById("admin-total-q").textContent = questions.length;
        document.getElementById("admin-tsa-q").textContent = questions.filter(q => q.exam_type === "TSA").length;
        document.getElementById("admin-hsa-q").textContent = questions.filter(q => q.exam_type === "HSA").length;
        document.getElementById("admin-thpt-q").textContent = questions.filter(q => q.exam_type === "THPT").length;
        document.getElementById("admin-calc-q").textContent = questions.filter(q => q.exam_type === "Giáº£i tÃ­ch 1").length;

        const tableContainer = document.getElementById("admin-questions-table-container");
        if (tableContainer) {
            tableContainer.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>MÃ£ ID</th>
                            <th>Ká»³ thi</th>
                            <th>Chá»§ Ä‘á»</th>
                            <th>Äá»™ khÃ³</th>
                            <th>Ná»™i dung tÃ³m táº¯t</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${questions.slice(0, 15).map(q => `
                            <tr>
                                <td><code>${q.id}</code></td>
                                <td><span class="badge-tag badge-tsa">${q.exam_type}</span></td>
                                <td>${q.topic}</td>
                                <td>${q.difficulty}</td>
                                <td>${q.question_text.replace(/<[^>]*>?/gm, '').substring(0, 75)}...</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            `;
        }
    },

    fillSampleJson() {
        const sample = [
            {
                "id": "q_import_sample_01",
                "question_text": "TÃ­nh tÃ­ch phÃ¢n \\(I = \\int_0^1 (2x + 1) dx\\).",
                "options": ["1", "2", "3", "4"],
                "correct_answer": 1,
                "explanation": "NguyÃªn hÃ m lÃ  \\(x^2 + x\\). Thay cáº­n 0 vÃ  1: \\(1 + 1 - 0 = 2\\).",
                "topic": "Giáº£i tÃ­ch",
                "subtopic": "TÃ­ch phÃ¢n cÆ¡ báº£n",
                "difficulty": "Dá»…",
                "exam_type": "THPT",
                "year": 2025,
                "source": "Äá» kháº£o sÃ¡t THPT",
                "tags": ["TÃ­ch phÃ¢n"]
            }
        ];
        document.getElementById("admin-import-json").value = JSON.stringify(sample, null, 2);
    },

    importJson() {
        const text = document.getElementById("admin-import-json").value.trim();
        if (!text) {
            alert("Vui lÃ²ng dÃ¡n dá»¯ liá»‡u JSON cÃ¢u há»i cáº§n nháº­p!");
            return;
        }

        try {
            const parsed = JSON.parse(text);
            if (!Array.isArray(parsed)) {
                alert("Dá»¯ liá»‡u JSON pháº£i lÃ  má»™t máº£ng danh sÃ¡ch cÃ¢u há»i [ ... ]!");
                return;
            }

            const current = PumkinStorage.getQuestions();
            let addedCount = 0;
            let duplicateCount = 0;

            // Simple text normalizer for duplicate detection
            const normalize = str => str.toLowerCase().replace(/[^a-z0-9Ã Ã¡áº¡áº£Ã£Ã¢áº§áº¥áº­áº©áº«Äƒáº±áº¯áº·áº³áºµÃ¨Ã©áº¹áº»áº½Ãªá»áº¿á»‡á»ƒá»…Ã¬Ã­á»‹á»‰Ä©Ã²Ã³á»á»ÃµÃ´á»“á»‘á»™á»•á»—Æ¡á»á»›á»£á»Ÿá»¡Ã¹Ãºá»¥á»§Å©Æ°á»«á»©á»±á»­á»¯á»³Ã½á»µá»·á»¹Ä‘]/g, '');

            const existingNorms = current.map(q => normalize(q.question_text));

            parsed.forEach(q => {
                if (q.question_text && Array.isArray(q.options) && q.options.length >= 2) {
                    const norm = normalize(q.question_text);
                    if (existingNorms.includes(norm)) {
                        duplicateCount++;
                    } else {
                        if (!q.id) q.id = "q_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
                        current.push(q);
                        existingNorms.push(norm);
                        addedCount++;
                    }
                }
            });

            PumkinStorage.saveQuestions(current);
            alert(`âœ… Import hoÃ n táº¥t!\n- ThÃªm má»›i thÃ nh cÃ´ng: ${addedCount} cÃ¢u há»i\n- PhÃ¡t hiá»‡n trÃ¹ng láº·p: ${duplicateCount} cÃ¢u (Ä‘Ã£ bá» qua)`);
            this.render();
        } catch(e) {
            alert("Lá»—i cÃº phÃ¡p JSON: " + e.message);
        }
    },

    exportDatabase() {
        const data = {
            questions: PumkinStorage.getQuestions(),
            exams: PumkinStorage.getExams(),
            exported_at: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `pumkin_exam_database_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    },

    showAddModal() {
        alert("Äá»ƒ thÃªm cÃ¢u há»i nhanh, báº¡n cÃ³ thá»ƒ dÃ¡n Ä‘á»‹nh dáº¡ng JSON vÃ o Ã´ bÃªn trÃªn vÃ  báº¥m 'Tiáº¿n hÃ nh Import'!");
    }
};

/* ==========================================================================
   PUMKIN.DEV MATH PRO - EXTENDED MODULES (AUTH, KNOWLEDGE, FORMULAS, QBANK)
   ========================================================================== */

/* ==========================================================================
   PUMKIN.DEV MATH PRO - EXTENDED MODULES (AUTH, KNOWLEDGE, FORMULAS, QBANK)
   ========================================================================== */

/* ==========================================================================
   PUMKIN.DEV MATH PRO - EXTENDED MODULES (THEME, UI, AUTH, KNOWLEDGE, FORMULAS, QBANK)
   ========================================================================== */

/* ==========================================================================
   PUMKIN.DEV MATH PRO - EXTENDED MODULES (THEME, UI, AUTH, KNOWLEDGE, FORMULAS, QBANK)
   ========================================================================== */

/* ==========================================================================
   PUMKIN.DEV MATH PRO - EXTENDED MODULES (THEME, UI, AUTH, KNOWLEDGE, FORMULAS, QBANK)
   ========================================================================== */

/* ==========================================================================
   PUMKIN.DEV MATH PRO - EXTENDED MODULES (THEME, UI, AUTH, KNOWLEDGE, FORMULAS, QBANK)
   ========================================================================== */

/* ==========================================================================
   PUMKIN.DEV MATH PRO - EXTENDED MODULES (THEME, UI, AUTH, KNOWLEDGE, FORMULAS, QBANK)
   ========================================================================== */

/* ==========================================================================
   PUMKIN.DEV MATH PRO - EXTENDED MODULES (THEME, UI, AUTH, KNOWLEDGE, FORMULAS, QBANK)
   ========================================================================== */

/* ==========================================================================
   PUMKIN.DEV MATH PRO - EXTENDED MODULES (THEME, UI, AUTH, KNOWLEDGE, FORMULAS, QBANK)
   ========================================================================== */

/* ==========================================================================
   PUMKIN.DEV MATH PRO - EXTENDED MODULES (THEME, UI, AUTH, KNOWLEDGE, FORMULAS, QBANK)
   ========================================================================== */

/* ==========================================================================
   PUMKIN.DEV MATH PRO - EXTENDED MODULES (THEME, UI, AUTH, KNOWLEDGE, FORMULAS, QBANK)
   ========================================================================== */


// 10.5. TOAST NOTIFICATION MODULE (Professional UI feedback replacing alert & confirm)
const PumkinToast = {
    show(message, type = "info", duration = 4000) {
        const container = document.getElementById("pumkin-toast-container");
        if (!container) return;

        const icons = { success: "✅", error: "❌", warning: "⚠️", info: "ℹ️" };
        const toast = document.createElement("div");
        toast.className = "pumkin-toast toast-" + type;
        toast.innerHTML = '<span class="pumkin-toast-icon">' + (icons[type] || "ℹ️") + '</span>' +
            '<span class="pumkin-toast-body">' + message + '</span>' +
            '<button class="pumkin-toast-close" aria-label="Đóng thông báo">&times;</button>';

        toast.querySelector(".pumkin-toast-close").onclick = () => this.dismiss(toast);
        container.appendChild(toast);

        if (duration > 0) {
            setTimeout(() => this.dismiss(toast), duration);
        }
        return toast;
    },

    dismiss(toast) {
        if (!toast || toast.classList.contains("toast-exit")) return;
        toast.classList.add("toast-exit");
        setTimeout(() => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 260);
    },

    success(msg, dur) { return this.show(msg, "success", dur); },
    error(msg, dur) { return this.show(msg, "error", dur || 6000); },
    warning(msg, dur) { return this.show(msg, "warning", dur || 5000); },
    info(msg, dur) { return this.show(msg, "info", dur); },

    confirm(message, { title = "Xác nhận", icon = "❓", confirmText = "Đồng ý", cancelText = "Hủy", danger = false } = {}) {
        return new Promise((resolve) => {
            const overlay = document.createElement("div");
            overlay.className = "pumkin-confirm-overlay";
            overlay.innerHTML =
                '<div class="pumkin-confirm-card" role="dialog" aria-modal="true">' +
                    '<div class="pumkin-confirm-icon">' + icon + '</div>' +
                    '<div class="pumkin-confirm-title">' + title + '</div>' +
                    '<div class="pumkin-confirm-msg">' + message + '</div>' +
                    '<div class="pumkin-confirm-actions">' +
                        '<button type="button" class="pumkin-confirm-cancel">' + cancelText + '</button>' +
                        '<button type="button" class="pumkin-confirm-ok' + (danger ? ' danger' : '') + '">' + confirmText + '</button>' +
                    '</div>' +
                '</div>';

            const close = (result) => {
                overlay.remove();
                resolve(result);
            };

            overlay.querySelector(".pumkin-confirm-cancel").onclick = () => close(false);
            overlay.querySelector(".pumkin-confirm-ok").onclick = () => close(true);
            overlay.addEventListener("keydown", (e) => {
                if (e.key === "Escape") close(false);
            });
            document.body.appendChild(overlay);
            const cancelBtn = overlay.querySelector(".pumkin-confirm-cancel");
            if (cancelBtn) cancelBtn.focus();
        });
    }
};
window.PumkinToast = PumkinToast;

// 11. THEME MODULE (CHẾ ĐỘ SÁNG / TỐI ĐỒNG BỘ TOÀN DIỆN)
const PumkinTheme = {
    THEME_KEY: "pumkin_theme_v3",

    init() {
        const saved = localStorage.getItem(this.THEME_KEY);
        if (saved) {
            this.applyTheme(saved);
        } else {
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.applyTheme(prefersDark ? "dark" : "light");
        }

        // Listen for OS system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem(this.THEME_KEY)) {
                    this.applyTheme(e.matches ? "dark" : "light");
                }
            });
        }
    },

    toggleTheme() {
        const isDark = document.body.classList.contains("dark-mode") || document.documentElement.getAttribute("data-theme") === "dark";
        const nextTheme = isDark ? "light" : "dark";
        this.applyTheme(nextTheme);
        localStorage.setItem(this.THEME_KEY, nextTheme);
    },

    applyTheme(theme) {
        const btn = document.getElementById("btn-theme-toggle");
        if (theme === "dark") {
            document.body.classList.add("dark-mode");
            document.documentElement.setAttribute("data-theme", "dark");
            if (btn) btn.textContent = "☀️";
        } else {
            document.body.classList.remove("dark-mode");
            document.documentElement.setAttribute("data-theme", "light");
            if (btn) btn.textContent = "🌙";
        }

        // Update mobile browser chrome color
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
            metaTheme.setAttribute('content', theme === 'dark' ? '#0b0f19' : '#1e3a8a');
        }
    }
};

// 12. UI & NAVIGATION CONTROLS (PC WHEEL SCROLL & ARROWS)
const PumkinUI = {
    init() {
        const navLinks = document.getElementById("main-nav-links");
        if (navLinks) {
            // Enable mouse wheel horizontal scrolling on desktop PC
            navLinks.addEventListener("wheel", (e) => {
                if (e.deltaY !== 0) {
                    e.preventDefault();
                    navLinks.scrollLeft += e.deltaY;
                }
            }, { passive: false });
        }
    },

    scrollNav(amount) {
        const navLinks = document.getElementById("main-nav-links");
        if (navLinks) {
            navLinks.scrollBy({ left: amount, behavior: "smooth" });
        }
    }
};

// 13. USER AUTHENTICATION MODULE (HYBRID ONLINE/OFFLINE ARCHITECTURE)
const PumkinAuth = {
    STORAGE_KEYS: {
        SESSION_TOKEN: "pumkin_session_token",
        LOCAL_ACCOUNTS: "pumkin_local_accounts",
        ACTIVE_USER: "pumkin_active_user"
    },
    currentUser: null,
    
    get API_BASE() {
        return (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:3001/api/auth' : '/api/auth';
    },

    isOfflineEnvironment() {
        return window.location.protocol === 'file:' || !window.navigator.onLine;
    },

    getLocalAccounts() {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEYS.LOCAL_ACCOUNTS);
            if (raw) {
                const accounts = JSON.parse(raw);
                // Purge any temporary test accounts
                const cleaned = accounts.filter(a => a.id !== "offline_admin" && a.id !== "offline_student" && a.username !== "admin" && a.username !== "hocsinh");
                if (cleaned.length !== accounts.length) {
                    this.saveLocalAccounts(cleaned);
                }
                return cleaned;
            }
        } catch (e) {}
        return [];
    },

    saveLocalAccounts(accounts) {
        try {
            localStorage.setItem(this.STORAGE_KEYS.LOCAL_ACCOUNTS, JSON.stringify(accounts));
        } catch (e) {
            console.error("[PumkinAuth] Failed to save local accounts:", e);
        }
    },

    async init() {
        // 1. Instant offline restore from persistent active user
        try {
            const cachedUser = localStorage.getItem(this.STORAGE_KEYS.ACTIVE_USER);
            if (cachedUser) {
                this.currentUser = JSON.parse(cachedUser);
            }
        } catch (e) {
            this.currentUser = null;
        }

        // 2. If online and token exists, try server sync
        const token = localStorage.getItem(this.STORAGE_KEYS.SESSION_TOKEN);
        if (token && !this.isOfflineEnvironment()) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 2000);
                const res = await fetch(`${this.API_BASE}/me`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                    signal: controller.signal
                });
                clearTimeout(timeoutId);
                if (res.ok) {
                    const data = await res.json();
                    this.currentUser = data.user;
                    localStorage.setItem(this.STORAGE_KEYS.ACTIVE_USER, JSON.stringify(this.currentUser));
                } else if (res.status === 401 || res.status === 403) {
                    this.currentUser = null;
                    localStorage.removeItem(this.STORAGE_KEYS.SESSION_TOKEN);
                    localStorage.removeItem(this.STORAGE_KEYS.ACTIVE_USER);
                }
            } catch (e) {
                console.log("[PumkinAuth] Server offline, retaining local session.");
            }
        }

        this.updateNavUser();
    },

    getCurrentUser() { return this.currentUser; },
    getCurrentUserId() { return this.currentUser ? this.currentUser.id : null; },

    togglePassword(inputId) {
        const el = document.getElementById(inputId);
        if (el) el.type = (el.type === "password") ? "text" : "password";
    },

    showModal(tab = 'login') {
        const modal = document.getElementById("modal-auth");
        if (!modal) return;
        this.clearAlert();
        if (this.currentUser) this.switchTab('profile');
        else this.switchTab(tab);
        modal.classList.add("active");
    },

    closeModal() {
        const modal = document.getElementById("modal-auth");
        if (modal) modal.classList.remove("active");
    },

    switchTab(tab) {
        this.clearAlert();
        const btnLogin = document.getElementById("tab-btn-login");
        const btnReg = document.getElementById("tab-btn-register");
        const btnProfile = document.getElementById("tab-btn-profile");
        const formLogin = document.getElementById("form-login");
        const formReg = document.getElementById("form-register");
        const panelProfile = document.getElementById("panel-profile");

        if (btnLogin) btnLogin.classList.toggle("active", tab === "login");
        if (btnReg) btnReg.classList.toggle("active", tab === "register");
        if (btnProfile) btnProfile.classList.toggle("active", tab === "profile");

        if (formLogin) formLogin.style.display = (tab === "login") ? "block" : "none";
        if (formReg) formReg.style.display = (tab === "register") ? "block" : "none";
        if (panelProfile) panelProfile.style.display = (tab === "profile") ? "block" : "none";

        if (tab === "profile" && this.currentUser) {
            const fnDisplay = document.getElementById("profile-fullname-display");
            const uDisplay = document.getElementById("profile-username-display");
            const eDisplay = document.getElementById("profile-email-display");
            const gBadge = document.getElementById("profile-goal-badge");
            const jDisplay = document.getElementById("profile-joined-date");
            const sDisplay = document.getElementById("profile-storage-tag");

            if (fnDisplay) fnDisplay.textContent = this.currentUser.displayName || this.currentUser.username;
            if (uDisplay) uDisplay.textContent = "@" + this.currentUser.username;
            if (eDisplay) eDisplay.textContent = this.currentUser.email || "";
            if (gBadge) gBadge.textContent = this.currentUser.goal ? `Mục tiêu: ${this.currentUser.goal}` : "Mục tiêu: Đỗ đại học";
            if (jDisplay) jDisplay.textContent = this.currentUser.createdAt || "Gần đây";
            if (sDisplay) sDisplay.textContent = "pumkin_v4_user_" + this.currentUser.id;

            // Render Level & EXP Progress Card
            if (window.PumkinLevelSystem && typeof window.PumkinLevelSystem.renderProfileCard === 'function') {
                window.PumkinLevelSystem.renderProfileCard('profile-level-card-container');
            }
        }
    },

    showAlert(msg, type = "success") {
        const alertBox = document.getElementById("auth-alert");
        if (!alertBox) return;
        alertBox.textContent = msg;
        alertBox.className = "auth-alert " + type;
        alertBox.style.display = "block";
    },
    clearAlert() {
        const alertBox = document.getElementById("auth-alert");
        if (alertBox) {
            alertBox.style.display = "none";
            alertBox.className = "auth-alert";
            alertBox.textContent = "";
        }
    },

    updateNavUser() {
        const btn = document.getElementById("btn-open-auth-modal");
        const btnProfile = document.getElementById("tab-btn-profile");
        const btnLogin = document.getElementById("tab-btn-login");
        const btnReg = document.getElementById("tab-btn-register");
        if (this.currentUser) {
            if (btn) btn.innerHTML = `<div class="user-avatar" style="width:28px;height:28px;border-radius:50%;background:var(--primary);color:white;display:flex;align-items:center;justify-content:center;font-weight:bold;">${this.currentUser.username.charAt(0).toUpperCase()}</div>`;
            if (btnProfile) btnProfile.style.display = "inline-block";
            if (btnLogin) btnLogin.style.display = "none";
            if (btnReg) btnReg.style.display = "none";
        } else {
            if (btn) btn.innerHTML = `👤 <span style="margin-left:5px">Đăng nhập</span>`;
            if (btnProfile) btnProfile.style.display = "none";
            if (btnLogin) btnLogin.style.display = "inline-block";
            if (btnReg) btnReg.style.display = "inline-block";
        }

        // Update Level Badge in navbar
        if (window.PumkinLevelSystem && typeof window.PumkinLevelSystem.updateNavBadge === 'function') {
            window.PumkinLevelSystem.updateNavBadge();
        }
        
        // Update Deep Learning Lock visually
        if (window.PumkinLevelSystem && typeof window.PumkinLevelSystem.updateDeepLearningLock === 'function') {
            window.PumkinLevelSystem.updateDeepLearningLock();
        }
    },

    async handleLogin(e) {
        e.preventDefault();
        const btn = e.target.querySelector("button[type='submit']");
        if(btn) { btn.disabled = true; btn.textContent = "Đang đăng nhập..."; }
        
        const u = document.getElementById("login-username").value.trim();
        const p = document.getElementById("login-password").value;
        if (!u || !p) {
            this.showAlert("Vui lòng điền đủ thông tin", "error");
            if(btn) { btn.disabled = false; btn.textContent = "Đăng nhập"; }
            return;
        }

        // Offline mode or file: protocol fallback
        if (this.isOfflineEnvironment()) {
            this.loginOffline(u, p, btn);
            return;
        }

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2500);
            const res = await fetch(`${this.API_BASE}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: u, password: p }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem(this.STORAGE_KEYS.SESSION_TOKEN, data.token);
                this.currentUser = data.user;
                localStorage.setItem(this.STORAGE_KEYS.ACTIVE_USER, JSON.stringify(this.currentUser));
                this.showAlert("Đăng nhập thành công!", "success");
                this.updateNavUser();
                setTimeout(() => {
                    this.closeModal();
                    if(typeof loadUserData === 'function') loadUserData();
                }, 800);
                if(btn) { btn.disabled = false; btn.textContent = "Đăng nhập"; }
                return;
            } else {
                this.showAlert(data.error || "Lỗi đăng nhập", "error");
                if(btn) { btn.disabled = false; btn.textContent = "Đăng nhập"; }
                return;
            }
        } catch(err) {
            console.warn("[PumkinAuth] Server offline, attempting local offline authentication...", err);
            this.loginOffline(u, p, btn);
        }
    },

    loginOffline(u, p, btn) {
        const accounts = this.getLocalAccounts();
        const match = accounts.find(a => a.username.toLowerCase() === u.toLowerCase());
        if (!match) {
            this.showAlert("Tài khoản chưa tồn tại trên máy. Bạn hãy chuyển sang tab 'Đăng ký' để tạo ngay!", "error");
            if(btn) { btn.disabled = false; btn.textContent = "Đăng nhập"; }
            return;
        }
        if (match.password !== p) {
            this.showAlert("Mật khẩu không chính xác.", "error");
            if(btn) { btn.disabled = false; btn.textContent = "Đăng nhập"; }
            return;
        }

        const userObj = {
            id: match.id,
            username: match.username,
            displayName: match.displayName || match.username,
            role: match.role || "student",
            createdAt: match.createdAt || new Date().toLocaleDateString('vi-VN')
        };
        const localToken = "pumkin_offline_token_" + match.id;
        localStorage.setItem(this.STORAGE_KEYS.SESSION_TOKEN, localToken);
        localStorage.setItem(this.STORAGE_KEYS.ACTIVE_USER, JSON.stringify(userObj));
        this.currentUser = userObj;

        this.showAlert("Đăng nhập thành công (Chế độ Offline)! 🎉", "success");
        this.updateNavUser();
        setTimeout(() => {
            this.closeModal();
            if(typeof loadUserData === 'function') loadUserData();
        }, 800);
        if(btn) { btn.disabled = false; btn.textContent = "Đăng nhập"; }
    },

    async handleRegister(e) {
        e.preventDefault();
        const btn = e.target.querySelector("button[type='submit']");
        if(btn) { btn.disabled = true; btn.textContent = "Đang đăng ký..."; }
        
        const fullname = document.getElementById("reg-fullname").value.trim();
        const u = document.getElementById("reg-username").value.trim();
        const p = document.getElementById("reg-password").value;
        if (!u || !p || p.length < 6) {
            this.showAlert("Tên đăng nhập và mật khẩu (tối thiểu 6 ký tự) là bắt buộc.", "error");
            if(btn) { btn.disabled = false; btn.textContent = "Đăng ký"; }
            return;
        }

        if (this.isOfflineEnvironment()) {
            this.registerOffline(fullname, u, p, btn);
            return;
        }

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2500);
            const res = await fetch(`${this.API_BASE}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: u, displayName: fullname, password: p }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem(this.STORAGE_KEYS.SESSION_TOKEN, data.token);
                this.currentUser = data.user;
                localStorage.setItem(this.STORAGE_KEYS.ACTIVE_USER, JSON.stringify(this.currentUser));
                this.showAlert("Đăng ký thành công!", "success");
                this.updateNavUser();
                setTimeout(() => {
                    this.closeModal();
                }, 800);
                if(btn) { btn.disabled = false; btn.textContent = "Đăng ký"; }
                return;
            } else {
                this.showAlert(data.error || "Lỗi đăng ký", "error");
                if(btn) { btn.disabled = false; btn.textContent = "Đăng ký"; }
                return;
            }
        } catch(err) {
            console.warn("[PumkinAuth] Server offline, attempting local offline registration...", err);
            this.registerOffline(fullname, u, p, btn);
        }
    },

    registerOffline(fullname, u, p, btn) {
        const accounts = this.getLocalAccounts();
        const exists = accounts.some(a => a.username.toLowerCase() === u.toLowerCase());
        if (exists) {
            this.showAlert("Tên đăng nhập này đã được sử dụng trên máy.", "error");
            if(btn) { btn.disabled = false; btn.textContent = "Đăng ký"; }
            return;
        }

        const newId = "local_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4);
        const newAccount = {
            id: newId,
            username: u,
            displayName: fullname || u,
            password: p,
            role: "student",
            createdAt: new Date().toLocaleDateString('vi-VN')
        };
        accounts.push(newAccount);
        this.saveLocalAccounts(accounts);

        const userObj = {
            id: newAccount.id,
            username: newAccount.username,
            displayName: newAccount.displayName,
            role: newAccount.role,
            createdAt: newAccount.createdAt
        };
        const localToken = "pumkin_offline_token_" + newAccount.id;
        localStorage.setItem(this.STORAGE_KEYS.SESSION_TOKEN, localToken);
        localStorage.setItem(this.STORAGE_KEYS.ACTIVE_USER, JSON.stringify(userObj));
        this.currentUser = userObj;

        if (window.PumkinLevelSystem && typeof window.PumkinLevelSystem.getUserProfile === 'function') {
            window.PumkinLevelSystem.getUserProfile(userObj.id);
        }

        this.showAlert("Đăng ký tài khoản thành công (Lưu trên máy)! 🎉", "success");
        this.updateNavUser();
        setTimeout(() => {
            this.closeModal();
        }, 800);
        if(btn) { btn.disabled = false; btn.textContent = "Đăng ký"; }
    },

    async handleLogout() {
        const token = localStorage.getItem(this.STORAGE_KEYS.SESSION_TOKEN);
        if (token && !this.isOfflineEnvironment()) {
            try {
                await fetch(`${this.API_BASE}/logout`, {
                    method: "POST",
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            } catch(e) {}
        }
        this.currentUser = null;
        localStorage.removeItem(this.STORAGE_KEYS.SESSION_TOKEN);
        localStorage.removeItem(this.STORAGE_KEYS.ACTIVE_USER);
        this.updateNavUser();
        this.closeModal();
        if(typeof clearUserData === 'function') clearUserData();
        PumkinToast.success("Đã đăng xuất thành công!");
        window.location.reload();
    }
};

// 14. KNOWLEDGE HUB MODULE (25 CORE ARTICLES)
const PumkinKnowledge = {
    currentStream: "all",
    searchQuery: "",
    currentArticleId: null,

    render() {
        const grid = document.getElementById("knowledge-cards-grid");
        if (!grid) return;

        const articles = PumkinStorage.getKnowledgeBase();
        let filtered = articles;

        if (this.currentStream !== "all") {
            filtered = filtered.filter(a => (a.grade === this.currentStream || a.stream === this.currentStream));
        }

        if (this.searchQuery.trim()) {
            const q = this.searchQuery.toLowerCase().trim();
            filtered = filtered.filter(a => {
                const titleMatch = a.title && a.title.toLowerCase().includes(q);
                const chapMatch = a.chapter && a.chapter.toLowerCase().includes(q);
                const overMatch = a.overview && a.overview.toLowerCase().includes(q);
                const formMatch = a.formulas && a.formulas.some(f => 
                    (f.name && f.name.toLowerCase().includes(q)) || 
                    (f.title && f.title.toLowerCase().includes(q)) || 
                    (f.latex && f.latex.toLowerCase().includes(q))
                );
                return titleMatch || chapMatch || overMatch || formMatch;
            });
        }

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                    ðŸ” KhÃ´ng tÃ¬m tháº¥y chuyÃªn Ä‘á» phÃ¹ há»£p vá»›i tá»« khÃ³a "${this.searchQuery}". Vui lÃ²ng thá»­ tá»« khÃ³a khÃ¡c!
                </div>
            `;
            return;
        }

        // Render 1 knowledge card per row (Full width)
        grid.innerHTML = filtered.map(a => {
            const stream = (a.grade || a.stream || "ToÃ¡n");
            const badgeClass = stream.includes("TSA") ? "badge-tsa" : (stream.includes("HSA") ? "badge-hsa" : "badge-thpt");
            const formulaCount = (a.formulas || []).length;
            const exampleCount = (a.examples || []).length;

            return `
                <div class="knowledge-card">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
                        <span class="badge-tag ${badgeClass}">${stream}</span>
                        <span style="font-size: 12.5px; color: var(--text-muted); font-weight: 600;">${a.chapter || 'ChuyÃªn Ä‘á»'}</span>
                    </div>
                    <h3 class="knowledge-card-title">${a.title}</h3>
                    <p class="knowledge-card-desc">${a.overview}</p>
                    <div class="knowledge-card-meta">
                        <span>ðŸ“ <strong>${formulaCount}</strong> cÃ´ng thá»©c cá»‘t lÃµi</span>
                        <span>ðŸ“ <strong>${exampleCount}</strong> vÃ­ dá»¥ giáº£i tá»«ng bÆ°á»›c</span>
                    </div>
                    <div style="display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap;">
                        <button class="btn btn-sm btn-primary" onclick="PumkinKnowledge.openArticle('${a.id}')">
                            ðŸ“– Äá»c chuyÃªn Ä‘á» toÃ n diá»‡n
                        </button>
                        <button class="btn btn-sm btn-outline" onclick="PumkinKnowledge.startDrillForArticle('${a.id}')" title="Luyá»‡n táº­p tráº¯c nghiá»‡m chuyÃªn Ä‘á» nÃ y">
                            ðŸŽ¯ Luyá»‡n táº­p cÃ¢u há»i chuyÃªn Ä‘á»
                        </button>
                    </div>
                </div>
            `;
        }).join("");
    },

    filterStream(stream, btnElement) {
        this.currentStream = stream;
        document.querySelectorAll("#knowledge-stream-tabs .stream-tab-btn").forEach(btn => {
            btn.classList.remove("active");
        });
        if (btnElement) btnElement.classList.add("active");
        this.render();
    },

    onSearch(query) {
        this.searchQuery = query;
        this.render();
    },

    openArticle(articleId) {
        const article = PumkinStorage.getKnowledgeArticleById(articleId);
        if (!article) return;

        this.currentArticleId = articleId;
        const stream = (article.grade || article.stream || "ToÃ¡n");

        const streamEl = document.getElementById("detail-breadcrumb-stream");
        const titleEl = document.getElementById("detail-breadcrumb-title");
        const badgeEl = document.getElementById("detail-chapter-badge");
        const artTitleEl = document.getElementById("detail-article-title");
        const artOverEl = document.getElementById("detail-article-overview");

        if (streamEl) streamEl.textContent = stream;
        if (titleEl) titleEl.textContent = article.title;
        if (badgeEl) badgeEl.textContent = `${stream} â€¢ ${article.chapter || 'ChuyÃªn Ä‘á»'}`;
        if (artTitleEl) artTitleEl.textContent = article.title;
        if (artOverEl) artOverEl.textContent = article.overview;

        // Prerequisites graph links
        const prereqBox = document.getElementById("detail-prerequisites-container");
        const prereqChips = document.getElementById("detail-prerequisites-chips");
        if (prereqBox && prereqChips) {
            const prereqs = article.prerequisites || [];
            if (prereqs.length > 0) {
                prereqChips.innerHTML = prereqs.map(pId => {
                    const pArt = PumkinStorage.getKnowledgeArticleById(pId);
                    const pTitle = pArt ? pArt.title : pId;
                    return `<button class="btn btn-sm btn-outline" style="font-size: 12px; padding: 4px 10px; border-radius: 20px;" onclick="PumkinKnowledge.openArticle('${pId}')">ðŸ”— ${pTitle}</button>`;
                }).join("");
                prereqBox.style.display = "block";
            } else {
                prereqBox.style.display = "none";
            }
        }

        // Common traps & notes
        const trapsBox = document.getElementById("detail-traps-container");
        if (trapsBox) {
            const traps = article.common_traps || [];
            if (traps.length > 0) {
                trapsBox.innerHTML = `
                    <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 12px 16px; margin-top: 14px;">
                        <h4 style="color: #92400e; font-size: 14px; margin: 0 0 6px 0; display: flex; align-items: center; gap: 6px;">
                            <span>âš ï¸</span> Báº«y tÆ° duy & LÆ°u Ã½ trá»ng tÃ¢m:
                        </h4>
                        <ul style="margin: 0; padding-left: 20px; font-size: 13.5px; color: #78350f; line-height: 1.6;">
                            ${traps.map(t => `<li>${t}</li>`).join("")}
                        </ul>
                    </div>
                `;
                trapsBox.style.display = "block";
            } else {
                trapsBox.style.display = "none";
            }
        }

        const theoryEl = document.getElementById("detail-theory-content");
        if (theoryEl) {
            const rawTheory = (article.theory_markdown || article.theory_html || article.theory_text || "");
            let formatted = rawTheory
                .replace(/^### (.*$)/gim, '<h4 style="color: var(--primary); margin: 14px 0 6px 0;">$1</h4>')
                .replace(/^## (.*$)/gim, '<h3 style="color: var(--primary); margin: 16px 0 8px 0;">$1</h3>')
                .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
                .replace(/\n/g, '<br>');
            theoryEl.innerHTML = formatted;
        }

        // Formulas: 1 card per row, NO copy button, with overflow-x: auto box
        const formulasEl = document.getElementById("detail-formulas-grid");
        if (formulasEl) {
            formulasEl.innerHTML = (article.formulas || []).map(f => {
                const fTitle = f.name || f.title || "CÃ´ng thá»©c";
                const fDesc = f.desc || f.note || "";
                return `
                    <div class="formula-card">
                        <div class="formula-header">
                            <span class="formula-name">ðŸ“ ${fTitle}</span>
                            ${f.tags && f.tags.length ? `<span class="badge-tag" style="background: #f1f5f9; color: var(--text-muted); font-size: 11px;">${f.tags.join(' â€¢ ')}</span>` : ''}
                        </div>
                        <div class="formula-math-box">\\[${f.latex}\\]</div>
                        ${fDesc ? `<div class="formula-desc">ðŸ’¡ <em>${fDesc}</em></div>` : ''}
                    </div>
                `;
            }).join("");
        }

        // Examples: Accordion with step-by-step solutions
        const examplesEl = document.getElementById("detail-examples-container");
        if (examplesEl) {
            examplesEl.innerHTML = (article.examples || []).map((ex, idx) => {
                const exTitle = ex.title || `VÃ­ dá»¥ ${idx + 1}`;
                const exProblem = ex.question || ex.problem || "";
                let solutionContent = "";

                if (Array.isArray(ex.solution_steps)) {
                    solutionContent = ex.solution_steps.map(step => `<div style="margin-bottom: 6px;">${step}</div>`).join("");
                } else if (ex.solution_html || ex.solution) {
                    solutionContent = (ex.solution_html || ex.solution).replace(/\n/g, '<br>');
                }

                if (ex.takeaway) {
                    solutionContent += `<div style="margin-top: 10px; padding: 8px 12px; background: #f0fdf4; border-left: 3px solid #16a34a; border-radius: 4px; font-size: 13px; color: #166534;">ðŸ’¡ <strong>Ghi nhá»› phÆ°Æ¡ng phÃ¡p:</strong> ${ex.takeaway}</div>`;
                }

                return `
                    <div class="example-box">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
                            <span class="example-title">${exTitle}</span>
                            ${ex.difficulty ? `<span class="badge-tag badge-thpt">${ex.difficulty}</span>` : ''}
                        </div>
                        <div style="font-size: 14.5px; margin-bottom: 12px; line-height: 1.65;">
                            ${exProblem}
                        </div>
                        <details class="example-solution-accordion">
                            <summary style="font-weight: 700; color: var(--primary-light); cursor: pointer; padding: 6px 0; user-select: none;">
                                ðŸ’¡ Xem cÃ¡c bÆ°á»›c giáº£i chi tiáº¿t (Step-by-Step)
                            </summary>
                            <div class="example-solution-body" style="margin-top: 10px; padding-top: 10px; border-top: 1px dashed #cbd5e1; line-height: 1.7; font-size: 14px;">
                                ${solutionContent}
                            </div>
                        </details>
                    </div>
                `;
            }).join("");
        }

        const appEl = document.getElementById("detail-applications-content");
        if (appEl) {
            appEl.innerHTML = (article.applications || article.applications_html || "á»¨ng dá»¥ng trong viá»‡c tá»‘i Æ°u hÃ³a thá»±c táº¿ vÃ  cÃ¡c bÃ i toÃ¡n Ä‘á»‹nh lÆ°á»£ng Ä‘á» thi.").replace(/\n/g, '<br>');
        }

        PumkinRouter.navigate("knowledge-detail", () => {
            const targetView = document.getElementById("view-knowledge-detail");
            if (window.PumkinMath) {
                window.PumkinMath.typeset(targetView);
            } else if (window.MathJax && window.MathJax.typesetPromise) {
                window.MathJax.typesetPromise([targetView]).catch(() => {});
            }
        });
    },

        // Helper to shuffle and sample maximum count questions
    _sampleQuestions(list, maxCount = 10) {
        if (!Array.isArray(list) || list.length <= maxCount) return [...list];
        const shuffled = [...list];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, maxCount);
    },

    startDrillForArticle(articleId) {
        const article = PumkinStorage.getKnowledgeArticleById(articleId);
        if (!article) return;

        const allQuestions = PumkinStorage.getQuestions();
        const relatedIds = article.related_question_ids || [];
        let matchingQuestions = allQuestions.filter(q => q.knowledge_id === articleId || relatedIds.includes(q.id));

        if (matchingQuestions.length === 0) {
            PumkinToast.info(`Hiện chưa có câu hỏi trắc nghiệm liên kết riêng với chuyên đề "${article.title}". Bạn có thể luyện tập qua Kho đề hoặc Tạo đề!`);
            return;
        }

        // Standardize: Capped at maximum 10 questions for focused topic mastery
        const drillQuestions = this._sampleQuestions(matchingQuestions, 10);
        const stream = (article.grade || article.stream || "TOÁN");
        const customExam = {
            id: `drill_${articleId}_${Date.now()}`,
            title: `Luyện tập trọng tâm: ${article.title}`,
            description: `Bộ luyện tập chuẩn hóa gồm ${drillQuestions.length} câu hỏi trọng tâm (tối đa 10 câu) của chuyên đề ${article.title}.`,
            duration_minutes: Math.max(10, Math.min(20, Math.ceil(drillQuestions.length * 2))),
            exam_type: stream,
            questions: drillQuestions
        };

        PumkinPlayer.startExam(null, true, customExam);
    },

    startDrillForCurrentArticle() {
        if (this.currentArticleId) {
            this.startDrillForArticle(this.currentArticleId);
        }
    },

    startTieredDrill(tierLevel) {
        if (!this.currentArticleId) return;
        const article = PumkinStorage.getKnowledgeArticleById(this.currentArticleId);
        if (!article) return;

        const allQuestions = PumkinStorage.getQuestions();
        const relatedIds = article.related_question_ids || [];
        let pool = allQuestions.filter(q => q.knowledge_id === this.currentArticleId || relatedIds.includes(q.id));

        let drillQuestions = [];
        if (tierLevel === "basic") {
            const candidates = pool.filter(q => (q.cognitive_level === "Nhận biết" || q.cognitive_level === "Thông hiểu" || q.difficulty === "Dễ" || q.difficulty === "Trung bình"));
            drillQuestions = this._sampleQuestions(candidates, 10);
        } else if (tierLevel === "advanced") {
            const candidates = pool.filter(q => (q.cognitive_level === "Vận dụng" || q.cognitive_level === "Vận dụng cao" || q.difficulty === "Khó" || q.difficulty === "Vận dụng cao"));
            drillQuestions = this._sampleQuestions(candidates, 10);
        } else {
            // Balanced mix: 5 basic + 5 advanced
            const basic = pool.filter(q => (q.cognitive_level === "Nhận biết" || q.cognitive_level === "Thông hiểu" || q.difficulty === "Dễ" || q.difficulty === "Trung bình"));
            const adv = pool.filter(q => (q.cognitive_level === "Vận dụng" || q.cognitive_level === "Vận dụng cao" || q.difficulty === "Khó" || q.difficulty === "Vận dụng cao"));
            const sBasic = this._sampleQuestions(basic, 5);
            const sAdv = this._sampleQuestions(adv, 5);
            drillQuestions = sBasic.concat(sAdv);
            if (drillQuestions.length < 10) {
                const remainder = pool.filter(q => !drillQuestions.some(d => d.id === q.id));
                drillQuestions = drillQuestions.concat(this._sampleQuestions(remainder, 10 - drillQuestions.length));
            }
        }

        if (drillQuestions.length === 0) {
            PumkinToast.info(`Không tìm thấy câu hỏi mức độ này trong chuyên đề "${article.title}". Hệ thống đang mở bài luyện 10 câu chọn lọc của chuyên đề.`);
            this.startDrillForArticle(this.currentArticleId);
            return;
        }

        // Strictly cap at maximum 10 questions
        drillQuestions = this._sampleQuestions(drillQuestions, 10);

        const tierName = tierLevel === "basic" ? "Cơ bản (M1-M2)" : (tierLevel === "advanced" ? "Nâng cao (M3-M4)" : "Chọn lọc 10 câu");
        const customExam = {
            id: `drill_${this.currentArticleId}_${tierLevel}_${Date.now()}`,
            title: `Luyện tập (${tierName}): ${article.title}`,
            description: `Bộ luyện tập chuẩn hóa gồm ${drillQuestions.length} câu hỏi cấp độ ${tierName} (tối đa 10 câu) của chuyên đề ${article.title}.`,
            duration_minutes: Math.max(10, Math.min(20, Math.ceil(drillQuestions.length * 2))),
            exam_type: (article.grade || article.stream || "TOÁN"),
            questions: drillQuestions
        };

        PumkinPlayer.startExam(null, true, customExam);
    }
};

// 15. FORMULA CHEATSHEET MODULE (1 CARD PER ROW, NO COPY BUTTON)
const PumkinFormulas = {
    render() {
        this.applyFilter();
    },

    applyFilter() {
        const grid = document.getElementById("all-formulas-grid");
        if (!grid) return;

        const gradeSelect = document.getElementById("formula-grade-select");
        const searchInput = document.getElementById("formula-search-input");
        const streamFilter = gradeSelect ? gradeSelect.value : "all";
        const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

        const articles = PumkinStorage.getKnowledgeBase();
        const allFormulas = [];

        articles.forEach(art => {
            const stream = (art.grade || art.stream || "ToÃ¡n");
            if (streamFilter === "all" || stream === streamFilter) {
                (art.formulas || []).forEach(f => {
                    allFormulas.push({
                        title: f.name || f.title || "CÃ´ng thá»©c",
                        latex: f.latex || "",
                        desc: f.desc || f.note || "",
                        tags: f.tags || [],
                        article_id: art.id,
                        article_title: art.title,
                        stream: stream
                    });
                });
            }
        });

        const filtered = allFormulas.filter(f => {
            if (!query) return true;
            return (
                f.title.toLowerCase().includes(query) ||
                f.latex.toLowerCase().includes(query) ||
                f.desc.toLowerCase().includes(query) ||
                f.article_title.toLowerCase().includes(query)
            );
        });

        if (filtered.length === 0) {
            grid.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                    ðŸ” KhÃ´ng tÃ¬m tháº¥y cÃ´ng thá»©c nÃ o phÃ¹ há»£p. Vui lÃ²ng thá»­ tÃ¬m kiáº¿m khÃ¡c!
                </div>
            `;
            return;
        }

        // Render 1 formula card per row (Full width) with NO copy button
        grid.innerHTML = filtered.map(f => {
            const badgeClass = f.stream.includes("TSA") ? "badge-tsa" : (f.stream.includes("HSA") ? "badge-hsa" : "badge-thpt");
            return `
                <div class="formula-card">
                    <div class="formula-header">
                        <div>
                            <span class="badge-tag ${badgeClass}" style="margin-bottom: 4px; display: inline-block;">${f.stream}</span>
                            <div class="formula-name">ðŸ“ ${f.title}</div>
                        </div>
                        ${f.tags && f.tags.length ? `<span class="badge-tag" style="background: #f1f5f9; color: var(--text-muted); font-size: 11px;">${f.tags.join(' â€¢ ')}</span>` : ''}
                    </div>
                    <div class="formula-math-box">\\[${f.latex}\\]</div>
                    ${f.desc ? `<div class="formula-desc">ðŸ’¡ <em>${f.desc}</em></div>` : ''}
                    <div style="margin-top: 10px; font-size: 12.5px; text-align: right;">
                        <a href="javascript:void(0)" onclick="PumkinKnowledge.openArticle('${f.article_id}')" style="color: var(--primary-light); text-decoration: none; font-weight: 600;">
                            ðŸ“– Xem bÃ i viáº¿t chuyÃªn Ä‘á»: ${f.article_title} â†’
                        </a>
                    </div>
                </div>
            `;
        }).join("");

        if (window.PumkinMath) {
            window.PumkinMath.typeset(grid);
        } else if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([grid]).catch(() => {});
        }
    }
};

// 16. CENTRALIZED QUESTION BANK MODULE (> 160 QUESTIONS)
const PumkinQBank = {
    render() {
        this.applyFilters();
    },

    applyFilters() {
        const container = document.getElementById("qbank-list-container");
        const countLabel = document.getElementById("qbank-count-label");
        if (!container) return;

        const examFilter = document.getElementById("qbank-exam-filter")?.value || "all";
        const typeFilter = document.getElementById("qbank-type-filter")?.value || "all";
        const diffFilter = document.getElementById("qbank-diff-filter")?.value || "all";
        const query = document.getElementById("qbank-search-input")?.value.toLowerCase().trim() || "";

        const allQuestions = PumkinStorage.getQuestions();

        const filtered = allQuestions.filter(q => {
            if (examFilter !== "all" && q.exam_type !== examFilter) return false;
            if (typeFilter !== "all") {
                const qType = q.type || "single_choice";
                if (qType !== typeFilter) return false;
            }
            if (diffFilter !== "all" && q.difficulty !== diffFilter) return false;
            if (query) {
                const textMatch = q.question_text && q.question_text.toLowerCase().includes(query);
                const topicMatch = q.topic && q.topic.toLowerCase().includes(query);
                const subtopicMatch = q.subtopic && q.subtopic.toLowerCase().includes(query);
                if (!textMatch && !topicMatch && !subtopicMatch) return false;
            }
            return true;
        });

        if (countLabel) countLabel.textContent = filtered.length;

        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px; color: var(--text-muted); background: #ffffff; border-radius: 8px; border: 1px dashed #cbd5e1;">
                    ðŸ” KhÃ´ng tÃ¬m tháº¥y cÃ¢u há»i nÃ o phÃ¹ há»£p vá»›i bá»™ lá»c hiá»‡n táº¡i. Vui lÃ²ng chá»n tiÃªu chÃ­ khÃ¡c!
                </div>
            `;
            return;
        }

        const displayLimit = 35;
        const toShow = filtered.slice(0, displayLimit);

        container.innerHTML = toShow.map((q, idx) => {
            const isBookmarked = PumkinStorage.isBookmarked(q.id);
            const qType = q.type || "single_choice";
            const examBadge = q.exam_type === "TSA" ? "badge-tsa" : (q.exam_type === "HSA" ? "badge-hsa" : "badge-thpt");

            let typeLabel = "Tráº¯c nghiá»‡m";
            if (qType === "true_false_group") typeLabel = "ÄÃºng/Sai chÃ¹m";
            else if (qType === "short_answer") typeLabel = "Äiá»n sá»‘";
            else if (qType === "step_solution") typeLabel = "Tá»± luáº­n barem";

            return `
                <div class="qbank-card" id="qbank-card-${q.id}">
                    <div class="qbank-card-header">
                        <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
                            <span class="badge-tag ${examBadge}">${q.exam_type || 'TOÃN'}</span>
                            <span class="badge-tag" style="background: #f1f5f9; color: #475569;">${typeLabel}</span>
                            <span class="badge-tag badge-thpt">${q.difficulty || 'Trung bÃ¬nh'}</span>
                            <span style="font-size: 12.5px; color: var(--text-muted); margin-left: 4px;">ID: <code>${q.id}</code></span>
                        </div>
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <button class="btn btn-sm ${isBookmarked ? 'btn-danger' : 'btn-outline'}" onclick="PumkinQBank.toggleBookmark('${q.id}', this)">
                                ${isBookmarked ? 'â˜… ÄÃ£ lÆ°u' : 'â˜† LÆ°u cÃ¢u'}
                            </button>
                            <button class="btn btn-sm btn-primary" onclick="PumkinQBank.practiceSingleQuestion('${q.id}')">
                                ðŸŽ¯ Luyá»‡n ngay
                            </button>
                        </div>
                    </div>

                    <div class="qbank-prompt">
                        <strong>CÃ¢u ${idx + 1}:</strong> ${q.question_text}
                    </div>

                    ${q.options && q.options.length > 0 ? `
                        <div class="qbank-options-preview">
                            ${q.options.map((opt, oIdx) => `
                                <div class="qbank-option-pill">
                                    <strong>${['A','B','C','D','E'][oIdx]}.</strong> ${opt}
                                </div>
                            `).join("")}
                        </div>
                    ` : ''}

                    ${q.items && q.items.length > 0 ? `
                        <div class="qbank-options-preview">
                            ${q.items.map(it => `
                                <div class="qbank-option-pill" style="width: 100%;">
                                    <strong>${it.label})</strong> ${it.text}
                                </div>
                            `).join("")}
                        </div>
                    ` : ''}

                    <details class="qbank-solution-accordion">
                        <summary>ðŸ’¡ Xem Ä‘Ã¡p Ã¡n & Lá»i giáº£i chi tiáº¿t</summary>
                        <div class="qbank-solution-body">
                            ${q.type === 'true_false_group' ? `
                                <div style="margin-bottom: 8px;">
                                    <strong>ÄÃ¡p Ã¡n:</strong>
                                    ${(q.items || []).map(it => `<code>${it.label}: ${it.correct ? 'ÄÃšNG' : 'SAI'}</code>`).join(' | ')}
                                </div>
                            ` : (q.type === 'short_answer' ? `
                                <div style="margin-bottom: 8px;">
                                    <strong>ÄÃ¡p sá»‘:</strong> <code>${q.correct_value}</code>
                                </div>
                            ` : `
                                <div style="margin-bottom: 8px;">
                                    <strong>ÄÃ¡p Ã¡n Ä‘Ãºng:</strong> <code>${['A','B','C','D','E'][q.correct_answer] || 'Xem lá»i giáº£i'}</code>
                                </div>
                            `)}
                            <div style="line-height: 1.65; color: inherit;">
                                ${q.explanation ? q.explanation.replace(/\n/g, '<br>') : 'ChÆ°a cÃ³ lá»i giáº£i chi tiáº¿t.'}
                            </div>
                            ${q.knowledge_id ? `
                                <div style="margin-top: 10px; font-size: 12.5px;">
                                    <a href="javascript:void(0)" onclick="PumkinKnowledge.openArticle('${q.knowledge_id}')" style="color: var(--primary); font-weight: 700; text-decoration: none;">
                                        ðŸ§  Xem chuyÃªn Ä‘á» lÃ½ thuyáº¿t liÃªn quan â†’
                                    </a>
                                </div>
                            ` : ''}
                        </div>
                    </details>
                </div>
            `;
        }).join("");

        if (filtered.length > displayLimit) {
            container.innerHTML += `
                <div style="text-align: center; margin-top: 20px;">
                    <p style="color: var(--text-muted); font-size: 13.5px; margin-bottom: 8px;">
                        Äang hiá»ƒn thá»‹ ${displayLimit} / ${filtered.length} cÃ¢u há»i.
                    </p>
                    <button class="btn btn-outline" onclick="PumkinRouter.navigate('generator')">
                        âš¡ Táº¡o bÃ i kiá»ƒm tra tá»•ng há»£p tá»« cÃ¡c cÃ¢u há»i nÃ y
                    </button>
                </div>
            `;
        }

        if (window.PumkinMath) {
            window.PumkinMath.typeset(container);
        } else if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([container]).catch(() => {});
        }
    },

    toggleBookmark(qId, btnElement) {
        const isNowBookmarked = PumkinStorage.toggleBookmark(qId);
        if (btnElement) {
            btnElement.textContent = isNowBookmarked ? "â˜… ÄÃ£ lÆ°u" : "â˜† LÆ°u cÃ¢u";
            btnElement.className = `btn btn-sm ${isNowBookmarked ? 'btn-danger' : 'btn-outline'}`;
        }
    },

    practiceSingleQuestion(qId) {
        const q = PumkinStorage.getQuestionById(qId);
        if (!q) return;

        const customExam = {
            id: `practice_${q.id}_${Date.now()}`,
            title: `Luyá»‡n táº­p Ä‘á»™c láº­p: CÃ¢u ${q.id}`,
            description: `Thá»±c hÃ nh Ä‘Æ¡n láº» cÃ¢u há»i thuá»™c ${q.exam_type || 'ká»³ thi'} (${q.topic || 'ToÃ¡n há»c'}).`,
            duration_minutes: 5,
            exam_type: q.exam_type || "TOÃN",
            questions: [q]
        };

        PumkinPlayer.startExam(null, true, customExam);
    }
};

// ==========================================================================
// 17. PUBLIC DATA REPOSITORY & OPEN DATA CONTROLLER
// ==========================================================================
const PumkinDataRepo = {
    currentSource: "local",
    currentCodeLang: "js",
    activePreviewKey: null,
    activePreviewContent: "",
    activePreviewFilename: "dataset.json",

    endpoints: [
        { name: "Trá»n bá»™ Bundle Há»‡ thá»‘ng", path: "bundle.json", format: "JSON", records: "236 má»¥c", desc: "ToÃ n bá»™ cÃ¢u há»i, Ä‘á» thi, lÃ½ thuyáº¿t & cÃ´ng thá»©c trong 1 file" },
        { name: "Tá»‡p KÃª khai & Checksums", path: "manifest.json", format: "JSON", records: "22 tá»‡p", desc: "Metadata, version v1.2.0 vÃ  toÃ n bá»™ 22 mÃ£ bÄƒm SHA-256" },
        { name: "NgÃ¢n hÃ ng 165 cÃ¢u há»i thi", path: "questions/all.json", format: "JSON", records: "165 cÃ¢u", desc: "ToÃ n bá»™ cÃ¢u há»i chuáº©n hÃ³a kÃ¨m lá»i giáº£i chi tiáº¿t" },
        { name: "Báº£ng tÃ­nh cÃ¢u há»i (Excel/Sheets)", path: "questions/questions.csv", format: "CSV", records: "165 dÃ²ng", desc: "Báº£ng tÃ­nh UTF-8 má»Ÿ trá»±c tiáº¿p báº±ng Excel khÃ´ng lá»—i font" },
        { name: "CÃ¢u há»i TSA BÃ¡ch Khoa", path: "questions/tsa.json", format: "JSON", records: "62 cÃ¢u", desc: "ToÃ¡n tÆ° duy BÃ¡ch Khoa: Äa thá»©c, AM-GM, HÃ¬nh há»c, XÃ¡c suáº¥t" },
        { name: "CÃ¢u há»i HSA ÄHQGHN", path: "questions/hsa.json", format: "JSON", records: "47 cÃ¢u", desc: "TÆ° duy Ä‘á»‹nh lÆ°á»£ng: Thá»‘ng kÃª, DÃ£y sá»‘, HÃ¬nh tá»a Ä‘á»™" },
        { name: "CÃ¢u há»i Tá»‘t nghiá»‡p THPT", path: "questions/thpt.json", format: "JSON", records: "32 cÃ¢u", desc: "Chuáº©n cáº¥u trÃºc Bá»™ GD&ÄT: Tráº¯c nghiá»‡m, ÄÃºng/Sai, Äiá»n sá»‘" },
        { name: "CÃ¢u há»i Giáº£i tÃ­ch 1 & ÄSTT", path: "questions/calculus1.json", format: "JSON", records: "24 cÃ¢u", desc: "ToÃ¡n cao cáº¥p Äáº¡i há»c: Giá»›i háº¡n, TÃ­ch phÃ¢n suy rá»™ng, Ma tráº­n" },
        { name: "Kho 42 Ä‘á» thi chuáº©n hÃ³a", path: "exams/all.json", format: "JSON", records: "42 Ä‘á»", desc: "Äá» thi Ä‘áº§y Ä‘á»§ thá»i gian lÃ m bÃ i vÃ  danh sÃ¡ch cÃ¢u há»i" },
        { name: "Äá» thi TSA BÃ¡ch Khoa", path: "exams/tsa.json", format: "JSON", records: "12 Ä‘á»", desc: "12 Ä‘á» thi TSA chá»n lá»c cÃ³ báº¥m giá» vÃ  giáº£i thÃ­ch" },
        { name: "Äá» thi HSA ÄHQGHN", path: "exams/hsa.json", format: "JSON", records: "12 Ä‘á»", desc: "12 Ä‘á» thi HSA Ä‘á»‹nh lÆ°á»£ng chuáº©n ma tráº­n" },
        { name: "Äá» thi THPT Quá»‘c Gia", path: "exams/thpt.json", format: "JSON", records: "14 Ä‘á»", desc: "14 Ä‘á» thi Tá»‘t nghiá»‡p THPT tá»« cÆ¡ báº£n Ä‘áº¿n váº­n dá»¥ng cao" },
        { name: "Äá» thi Giáº£i tÃ­ch 1", path: "exams/calculus1.json", format: "JSON", records: "4 Ä‘á»", desc: "4 Ä‘á» thi káº¿t thÃºc há»c pháº§n ToÃ¡n giáº£i tÃ­ch Ä‘áº¡i há»c" },
        { name: "Sá»• tay 25 chuyÃªn Ä‘á» lÃ½ thuyáº¿t", path: "knowledge/all.json", format: "JSON", records: "25 bÃ i", desc: "ChuyÃªn Ä‘á» bÃ i giáº£ng ToÃ¡n 10-12, ÄSTT, Giáº£i tÃ­ch 1" },
        { name: "Cáº©m nang LÃ½ thuyáº¿t Markdown", path: "knowledge/knowledge_handbook.md", format: "Markdown", records: "25 bÃ i", desc: "TÃ i liá»‡u Markdown chuáº©n KaTeX sáºµn sÃ ng biÃªn soáº¡n" },
        { name: "Báº£ng 44 cÃ´ng thá»©c KaTeX", path: "formulas/cheatsheet.json", format: "JSON", records: "44 cÃ´ng thá»©c", desc: "CÃ´ng thá»©c kÃ¨m mÃ£ LaTeX, mÃ´ táº£ Ã½ nghÄ©a vÃ  tags" },
        { name: "Báº£ng tra cá»©u cÃ´ng thá»©c (.md)", path: "formulas/cheatsheet.md", format: "Markdown", records: "44 cÃ´ng thá»©c", desc: "Báº£ng cÃ´ng thá»©c trÃ¬nh bÃ y Markdown dá»… Ä‘á»c" },
        { name: "CÃ¢y phÃ¢n loáº¡i Ä‘á» má»¥c", path: "taxonomy/topics.json", format: "JSON", records: "5 khá»‘i", desc: "CÃ¢y phÃ¢n cáº¥p khá»‘i lá»›p, chÆ°Æ¡ng, ká»³ thi vÃ  dáº¡ng cÃ¢u há»i" }
    ],

    schemas: {
        schema_question: {
            title: "Question Schema (Äáº·c táº£ cÃ¢u há»i)",
            url: "schemas/question.schema.json",
            desc: "JSON Schema Draft 2020-12 cho cÃ¢u há»i thi ToÃ¡n há»c"
        },
        schema_exam: {
            title: "Exam Schema (Äáº·c táº£ Ä‘á» thi)",
            url: "schemas/exam.schema.json",
            desc: "JSON Schema cho cáº¥u trÃºc Ä‘á» thi vÃ  ma tráº­n kháº£o thÃ­"
        },
        schema_knowledge: {
            title: "Knowledge Schema (Äáº·c táº£ chuyÃªn Ä‘á»)",
            url: "schemas/knowledge.schema.json",
            desc: "JSON Schema cho bÃ i giáº£ng lÃ½ thuyáº¿t vÃ  cÃ´ng thá»©c"
        },
        schema_manifest: {
            title: "Manifest Schema (Äáº·c táº£ tá»‡p kÃª khai)",
            url: "schemas/manifest.schema.json",
            desc: "JSON Schema cho tá»‡p kÃª khai siÃªu dá»¯ liá»‡u vÃ  checksums"
        }
    },

    init() {
        this.render();
    },

    render() {
        this.renderEndpoints();
        this.renderCodeSnippet();
    },

    getBaseUrl() {
        if (this.currentSource === "local") {
            const origin = window.location.origin;
            if (origin && origin !== "null" && origin.startsWith("http")) {
                return `${origin}/data/`;
            }
            return "http://localhost:3000/data/";
        } else if (this.currentSource === "github") {
            return "https://raw.githubusercontent.com/pumkindev/math-exam-platform/main/data/";
        } else if (this.currentSource === "cdn") {
            return "https://cdn.jsdelivr.net/gh/pumkindev/math-exam-platform@main/data/";
        }
        return "http://localhost:3000/data/";
    },

    switchSource(source, btn) {
        this.currentSource = source;
        document.querySelectorAll(".endpoint-source-selector .source-tab-btn").forEach(b => b.classList.remove("active"));
        if (btn) btn.classList.add("active");
        this.renderEndpoints();
        this.renderCodeSnippet();
    },

    switchCodeTab(lang, btn) {
        this.currentCodeLang = lang;
        document.querySelectorAll(".code-lang-tabs .code-lang-tab").forEach(b => b.classList.remove("active"));
        if (btn) btn.classList.add("active");
        this.renderCodeSnippet();
    },

    renderEndpoints() {
        const tbody = document.getElementById("endpoint-table-body");
        if (!tbody) return;

        const baseUrl = this.getBaseUrl();
        tbody.innerHTML = this.endpoints.map(ep => {
            const fullUrl = `${baseUrl}${ep.path}`;
            return `
                <tr>
                    <td>
                        <strong style="color: var(--primary);">${ep.name}</strong>
                        <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 2px;">${ep.desc}</div>
                    </td>
                    <td>
                        <span class="badge-tag ${ep.format === 'JSON' ? 'badge-tsa' : (ep.format === 'CSV' ? 'badge-hsa' : 'badge-thpt')}">${ep.format}</span>
                    </td>
                    <td>
                        <code style="word-break: break-all;">${fullUrl}</code>
                    </td>
                    <td style="text-align: right; white-space: nowrap;">
                        <button class="btn btn-sm btn-outline" style="padding: 3px 8px; font-size: 12px; margin-right: 4px;" onclick="PumkinDataRepo.copyText('${fullUrl}', this)" title="Sao chÃ©p URL">ðŸ“‹ Link</button>
                        <button class="btn btn-sm btn-outline" style="padding: 3px 8px; font-size: 12px;" onclick="PumkinDataRepo.previewByPath('${ep.path}', '${ep.name}')" title="Xem trÆ°á»›c ná»™i dung">ðŸ‘ï¸ Xem</button>
                    </td>
                </tr>
            `;
        }).join("");
    },

    renderCodeSnippet() {
        const display = document.getElementById("api-code-display");
        if (!display) return;

        const baseUrl = this.getBaseUrl();
        const urlManifest = `${baseUrl}manifest.json`;
        const urlQuestions = `${baseUrl}questions/all.json`;
        const urlExams = `${baseUrl}exams/tsa.json`;

        let code = "";
        if (this.currentCodeLang === "js") {
            code = `// 1. Táº£i siÃªu dá»¯ liá»‡u (Manifest) Ä‘á»ƒ kiá»ƒm tra phiÃªn báº£n má»›i nháº¥t
fetch("${urlManifest}")
  .then(res => res.json())
  .then(manifest => {
    console.log("PhiÃªn báº£n:", manifest.version);
    console.log("Tá»•ng sá»‘ cÃ¢u há»i:", manifest.stats.total_questions);
  });

// 2. Táº£i toÃ n bá»™ 165 cÃ¢u há»i thi chuáº©n hÃ³a
fetch("${urlQuestions}")
  .then(res => res.json())
  .then(questions => {
    console.log(\`ÄÃ£ nháº­n diá»‡n \${questions.length} cÃ¢u há»i!\`);
    // Lá»c cÃ¡c cÃ¢u há»i thuá»™c chá»§ Ä‘á» 'Giáº£i tÃ­ch' Ä‘á»™ khÃ³ 'KhÃ³'
    const advanced = questions.filter(q => q.topic === "Giáº£i tÃ­ch" && q.difficulty === "KhÃ³");
    console.log("Sá»‘ cÃ¢u giáº£i tÃ­ch nÃ¢ng cao:", advanced.length);
  })
  .catch(err => console.error("Lá»—i khi táº£i dá»¯ liá»‡u:", err));`;
        } else if (this.currentCodeLang === "python") {
            code = `# CÃ i Ä‘áº·t thÆ° viá»‡n: pip install requests
import requests

# 1. Táº£i tá»‡p KÃª khai siÃªu dá»¯ liá»‡u
manifest = requests.get("${urlManifest}").json()
print(f"PhiÃªn báº£n Dataset: {manifest['version']}")
print(f"Giáº¥y phÃ©p: {manifest['license']}")

# 2. Táº£i 12 Ä‘á» thi TSA BÃ¡ch Khoa
exams = requests.get("${urlExams}").json()
print(f"Táº£i thÃ nh cÃ´ng {len(exams)} Ä‘á» thi TSA!")
for e in exams[:3]:
    print(f"- {e['title']} ({e['duration_minutes']} phÃºt, {e['question_count']} cÃ¢u)")`;
        } else if (this.currentCodeLang === "curl") {
            code = `# 1. Kiá»ƒm tra header CORS vÃ  táº£i tá»‡p manifest
curl -i -X GET "${urlManifest}"

# 2. Táº£i trá»±c tiáº¿p toÃ n bá»™ cÃ¢u há»i vÃ  lÆ°u thÃ nh tá»‡p questions_all.json
curl -o questions_all.json "${urlQuestions}"

# 3. Táº£i báº£ng tÃ­nh CSV Ä‘á»ƒ má»Ÿ báº±ng Excel
curl -o questions.csv "${baseUrl}questions/questions.csv"`;
        } else if (this.currentCodeLang === "powershell") {
            code = `# 1. Truy váº¥n Manifest báº±ng PowerShell (Zero-dependency)
$manifest = Invoke-RestMethod "${urlManifest}"
Write-Host "PhiÃªn báº£n: $($manifest.version) | Tá»•ng sá»‘ cÃ¢u: $($manifest.stats.total_questions)"

# 2. Táº£i trá»±c tiáº¿p Ä‘á» thi vÃ  Ä‘áº¿m theo thá»i gian
$tsaExams = Invoke-RestMethod "${urlExams}"
$tsaExams | Format-Table id, title, duration_minutes, difficulty -AutoSize

# 3. Táº£i toÃ n bá»™ Bundle vá» mÃ¡y
Invoke-WebRequest -Uri "${baseUrl}bundle.json" -OutFile "pumkin_bundle.json"
Write-Host "Táº£i thÃ nh cÃ´ng pumkin_bundle.json!" -ForegroundColor Green`;
        }

        display.textContent = code;
    },

    copyCodeSnippet(btn) {
        const display = document.getElementById("api-code-display");
        if (!display) return;
        this.copyText(display.textContent, btn);
    },

    copyEndpointUrl(relPath, btn) {
        const full = `${this.getBaseUrl()}${relPath}`;
        this.copyText(full, btn);
    },

    copyText(text, btn) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                this.flashButton(btn, "âœ“ ÄÃ£ chÃ©p!");
            }).catch(() => {
                this.fallbackCopy(text, btn);
            });
        } else {
            this.fallbackCopy(text, btn);
        }
    },

    fallbackCopy(text, btn) {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand("copy");
            this.flashButton(btn, "âœ“ ÄÃ£ chÃ©p!");
        } catch(e) {
            alert("Vui lÃ²ng bÃ´i Ä‘en vÃ  nháº¥n Ctrl + C Ä‘á»ƒ sao chÃ©p.");
        }
        document.body.removeChild(ta);
    },

    flashButton(btn, text) {
        if (!btn) return;
        const original = btn.innerHTML;
        btn.innerHTML = text;
        btn.classList.add("btn-success");
        setTimeout(() => {
            btn.innerHTML = original;
            btn.classList.remove("btn-success");
        }, 1800);
    },

    // DYNAMIC IN-MEMORY DATA GENERATION (100% OFFLINE SAFE)
    getDataByKey(key) {
        const questions = typeof PUMKIN_DEFAULT_QUESTIONS !== "undefined" ? PUMKIN_DEFAULT_QUESTIONS : [];
        const exams = typeof PUMKIN_DEFAULT_EXAMS !== "undefined" ? PUMKIN_DEFAULT_EXAMS : [];
        const knowledge = typeof PUMKIN_KNOWLEDGE_BASE !== "undefined" ? PUMKIN_KNOWLEDGE_BASE : [];

        switch(key) {
            case "bundle":
                return {
                    version: "v1.2.0",
                    license: "Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)",
                    summary: {
                        total_questions: questions.length,
                        total_exams: exams.length,
                        total_knowledge_articles: knowledge.length
                    },
                    questions: questions,
                    exams: exams,
                    knowledge: knowledge
                };
            case "manifest":
                return {
                    name: "pumkindev-math-open-data",
                    version: "v1.2.0",
                    title: "PUMKIN.DEV Standardized Math Examination & Knowledge Open Dataset",
                    license: "CC BY-NC-SA 4.0",
                    stats: {
                        total_questions: questions.length,
                        total_exams: exams.length,
                        total_knowledge_articles: knowledge.length
                    },
                    maintainer: "PUMKIN.DEV Team"
                };
            case "questions_all":
                return questions;
            case "questions_tsa":
                return questions.filter(q => q.exam_type === "TSA");
            case "questions_hsa":
                return questions.filter(q => q.exam_type === "HSA");
            case "questions_thpt":
                return questions.filter(q => q.exam_type === "THPT");
            case "questions_calc":
                return questions.filter(q => (q.exam_type && (q.exam_type.indexOf("Gi") >= 0 || q.exam_type.indexOf("To") >= 0)) || (q.id && q.id.indexOf("calc") >= 0));
            case "exams_all":
                return exams;
            case "exams_tsa":
                return exams.filter(e => e.type === "TSA" || e.exam_type === "TSA");
            case "exams_hsa":
                return exams.filter(e => e.type === "HSA" || e.exam_type === "HSA");
            case "exams_thpt":
                return exams.filter(e => e.type === "THPT" || e.exam_type === "THPT");
            case "exams_calc":
                return exams.filter(e => (e.type && (e.type.indexOf("Gi") >= 0 || e.type.indexOf("To") >= 0)));
            case "knowledge_all":
                return knowledge;
            case "knowledge_math10":
                return knowledge.filter(k => k.id && k.id.indexOf("kb_toan10_") === 0);
            case "knowledge_math11":
                return knowledge.filter(k => k.id && k.id.indexOf("kb_toan11_") === 0);
            case "knowledge_math12":
                return knowledge.filter(k => k.id && k.id.indexOf("kb_toan12_") === 0);
            case "knowledge_algebra":
                return knowledge.filter(k => k.id && k.id.indexOf("kb_dstt_") === 0);
            case "knowledge_calc1":
                return knowledge.filter(k => k.id && k.id.indexOf("kb_gt1_") === 0);
            case "formulas_json": {
                const forms = [];
                knowledge.forEach(k => {
                    (k.formulas || []).forEach(f => {
                        forms.push({
                            id: f.id || `${k.id}_f`,
                            grade: k.grade,
                            chapter: k.chapter,
                            name: f.name,
                            latex: f.latex,
                            desc: f.desc || "",
                            tags: f.tags || []
                        });
                    });
                });
                return forms;
            }
            case "taxonomy":
                return {
                    grades: ["ToÃ¡n 10", "ToÃ¡n 11", "ToÃ¡n 12", "ToÃ¡n cao cáº¥p", "Giáº£i tÃ­ch 1"],
                    exam_types: ["TSA", "HSA", "THPT", "Giáº£i tÃ­ch 1"],
                    question_types: ["single_choice", "true_false_group", "short_answer"]
                };
            default:
                return questions;
        }
    },

    generateCsv() {
        const questions = typeof PUMKIN_DEFAULT_QUESTIONS !== "undefined" ? PUMKIN_DEFAULT_QUESTIONS : [];
        const header = ["id", "exam_type", "grade", "topic", "difficulty", "type", "question", "option_A", "option_B", "option_C", "option_D", "answer", "explanation", "knowledge_id"];
        const rows = [header.join(",")];

        function esc(val) {
            if (val === null || val === undefined) return '""';
            const str = String(val).replace(/"/g, '""').replace(/\r?\n/g, " ");
            return `"${str}"`;
        }

        questions.forEach(q => {
            const opts = q.options || [];
            let ans = "";
            if (q.type === "single_choice" || !q.type) {
                ans = ["A", "B", "C", "D"][q.correct_answer] || "";
            } else if (q.type === "short_answer") {
                ans = q.correct_value || "";
            } else if (q.type === "true_false_group") {
                ans = (q.items || []).map(it => `${it.label}:${it.correct ? "T" : "F"}`).join("; ");
            }
            const row = [
                esc(q.id),
                esc(q.exam_type),
                esc(q.grade),
                esc(q.topic),
                esc(q.difficulty),
                esc(q.type || "single_choice"),
                esc(q.question_text || q.question || ""),
                esc(opts[0] || ""),
                esc(opts[1] || ""),
                esc(opts[2] || ""),
                esc(opts[3] || ""),
                esc(ans),
                esc(q.explanation || ""),
                esc(q.knowledge_id || "")
            ];
            rows.push(row.join(","));
        });
        return "\uFEFF" + rows.join("\r\n");
    },

    generateKnowledgeMarkdown() {
        const knowledge = typeof PUMKIN_KNOWLEDGE_BASE !== "undefined" ? PUMKIN_KNOWLEDGE_BASE : [];
        let md = "# PUMKIN.DEV â€” Cáº¨M NANG TOÃN Há»ŒC TOÃ€N Táº¬P\n\n";
        md += "> Tuyá»ƒn táº­p 25 chuyÃªn Ä‘á» lÃ½ thuyáº¿t, 44 cÃ´ng thá»©c KaTeX vÃ  bÃ i táº­p giáº£i chi tiáº¿t.\n\n---\n\n";
        knowledge.forEach((k, idx) => {
            md += `## ${idx + 1}. ${k.grade}: ${k.title}\n\n`;
            md += `**ChÆ°Æ¡ng:** ${k.chapter} | **MÃ£:** \`${k.id}\`\n\n`;
            md += `**Tá»•ng quan:** ${k.overview}\n\n`;
            md += `### LÃ½ thuyáº¿t trá»ng tÃ¢m\n\n${k.theory_markdown}\n\n`;
            if (k.formulas && k.formulas.length > 0) {
                md += `### Báº£ng cÃ´ng thá»©c\n\n`;
                k.formulas.forEach(f => {
                    md += `- **${f.name}**: $$${f.latex}$$\n  *${f.desc}*\n\n`;
                });
            }
            md += `---\n\n`;
        });
        return md;
    },

    generateFormulasMarkdown() {
        const formulas = this.getDataByKey("formulas_json");
        let md = "# PUMKIN.DEV â€” Báº¢NG TRA Cá»¨U CÃ”NG THá»¨C TOÃN Há»ŒC\n\n";
        md += "> 44 cÃ´ng thá»©c toÃ¡n há»c cá»‘t lÃµi Ã´n thi TSA, HSA, THPT, Giáº£i tÃ­ch 1.\n\n";
        formulas.forEach(f => {
            md += `### ${f.name} (${f.grade})\n\n`;
            md += `- **CÃ´ng thá»©c:** $$${f.latex}$$\n`;
            md += `- **Ã nghÄ©a:** ${f.desc}\n\n`;
        });
        return md;
    },

    downloadDirect(key, format) {
        let content = "";
        let filename = `pumkin_${key}.${format === "markdown" ? "md" : format}`;
        let mime = "application/json;charset=utf-8";

        if (format === "json") {
            const data = this.getDataByKey(key);
            content = JSON.stringify(data, null, 2);
            mime = "application/json;charset=utf-8";
        } else if (format === "csv") {
            content = this.generateCsv();
            filename = "pumkin_questions_165.csv";
            mime = "text/csv;charset=utf-8";
        } else if (format === "markdown") {
            if (key === "formulas_md") {
                content = this.generateFormulasMarkdown();
                filename = "pumkin_formulas_cheatsheet.md";
            } else {
                content = this.generateKnowledgeMarkdown();
                filename = "pumkin_knowledge_handbook.md";
            }
            mime = "text/markdown;charset=utf-8";
        }

        const blob = new Blob([content], { type: mime });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 300);
    },

    previewData(key) {
        const modal = document.getElementById("data-preview-modal");
        const titleEl = document.getElementById("preview-modal-title");
        const subEl = document.getElementById("preview-modal-subtitle");
        const codeEl = document.getElementById("preview-code-block");
        if (!modal || !codeEl) return;

        let title = "Xem trÆ°á»›c Dá»¯ liá»‡u";
        let sub = "";
        let text = "";
        let filename = "dataset.json";

        if (key.startsWith("schema_")) {
            const schemaInfo = this.schemas[key];
            if (schemaInfo) {
                title = `ðŸ›¡ï¸ ${schemaInfo.title}`;
                sub = schemaInfo.desc;
                filename = schemaInfo.url.split("/").pop();
                text = JSON.stringify(this.getSchema(key), null, 2);
            }
        } else if (key === "bundle") {
            title = "ðŸ“¦ Trá»n bá»™ Há»‡ thá»‘ng (Bundle)";
            const data = this.getDataByKey("bundle");
            const previewObj = {
                version: data.version,
                license: data.license,
                summary: data.summary,
                questions_sample: (data.questions || []).slice(0, 2),
                exams_sample: (data.exams || []).slice(0, 2),
                knowledge_sample: (data.knowledge || []).slice(0, 1),
                _note: `Hiá»ƒn thá»‹ máº«u 2 báº£n ghi. Báº¥m 'Táº£i tá»‡p nÃ y' Ä‘á»ƒ nháº­n toÃ n bá»™ 165 cÃ¢u há»i, 42 Ä‘á» thi vÃ  25 chuyÃªn Ä‘á»!`
            };
            text = JSON.stringify(previewObj, null, 2);
            sub = `GÃ³i Bundle Ä‘áº§y Ä‘á»§ â€¢ 236 báº£n ghi â€¢ Dung lÆ°á»£ng ~510 KB`;
            filename = "pumkin_bundle.json";
        } else {
            const data = this.getDataByKey(key);
            title = `TÃ i nguyÃªn: ${key}`;
            const count = Array.isArray(data) ? data.length : 1;
            sub = `Äá»‹nh dáº¡ng JSON â€¢ ${count} báº£n ghi â€¢ ÄÃ£ Ä‘á»‹nh dáº¡ng chuáº©n Pretty Print`;
            text = JSON.stringify(data, null, 2);
            filename = `pumkin_${key}.json`;
        }

        this.activePreviewKey = key;
        this.activePreviewContent = text;
        this.activePreviewFilename = filename;

        titleEl.textContent = title;
        subEl.textContent = sub;
        codeEl.textContent = text;
        modal.classList.add("active");
    },

    previewByPath(path, name) {
        if (path === "bundle.json") this.previewData("bundle");
        else if (path === "manifest.json") this.previewData("manifest");
        else if (path === "questions/all.json") this.previewData("questions_all");
        else if (path === "questions/tsa.json") this.previewData("questions_tsa");
        else if (path === "questions/hsa.json") this.previewData("questions_hsa");
        else if (path === "questions/thpt.json") this.previewData("questions_thpt");
        else if (path === "questions/calculus1.json") this.previewData("questions_calc");
        else if (path === "exams/all.json") this.previewData("exams_all");
        else if (path === "exams/tsa.json") this.previewData("exams_tsa");
        else if (path === "exams/hsa.json") this.previewData("exams_hsa");
        else if (path === "exams/thpt.json") this.previewData("exams_thpt");
        else if (path === "exams/calculus1.json") this.previewData("exams_calc");
        else if (path === "knowledge/all.json") this.previewData("knowledge_all");
        else if (path === "formulas/cheatsheet.json") this.previewData("formulas_json");
        else if (path === "taxonomy/topics.json") this.previewData("taxonomy");
        else if (path.endsWith(".csv")) {
            const csv = this.generateCsv();
            this.showRawTextInPreview(name, "Äá»‹nh dáº¡ng CSV UTF-8", csv.slice(0, 2000) + "\n\n... [CÃ²n 160 dÃ²ng tiáº¿p theo] ...", "pumkin_questions.csv");
        } else if (path.endsWith(".md")) {
            const md = path.indexOf("formula") >= 0 ? this.generateFormulasMarkdown() : this.generateKnowledgeMarkdown();
            this.showRawTextInPreview(name, "Äá»‹nh dáº¡ng Markdown KaTeX", md.slice(0, 2500) + "\n\n... [ÄÆ°á»£c rÃºt gá»n Ä‘á»ƒ hiá»ƒn thá»‹ xem trÆ°á»›c mÆ°á»£t mÃ ] ...", path.split("/").pop());
        } else {
            this.previewData("bundle");
        }
    },

    showRawTextInPreview(title, sub, text, filename) {
        const modal = document.getElementById("data-preview-modal");
        const titleEl = document.getElementById("preview-modal-title");
        const subEl = document.getElementById("preview-modal-subtitle");
        const codeEl = document.getElementById("preview-code-block");
        if (!modal || !codeEl) return;

        this.activePreviewContent = text;
        this.activePreviewFilename = filename;

        titleEl.textContent = title;
        subEl.textContent = sub;
        codeEl.textContent = text;
        modal.classList.add("active");
    },

    closePreviewModal() {
        const modal = document.getElementById("data-preview-modal");
        if (modal) modal.classList.remove("active");
    },

    copyPreviewContent(btn) {
        if (!this.activePreviewContent) return;
        this.copyText(this.activePreviewContent, btn);
    },

    downloadCurrentPreview() {
        if (!this.activePreviewContent) return;
        const blob = new Blob([this.activePreviewContent], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = this.activePreviewFilename || "dataset.json";
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 300);
    },

    getSchema(key) {
        if (key === "schema_question") {
            return {
                "$schema": "https://json-schema.org/draft/2020-12/schema",
                "title": "Question",
                "type": "object",
                "required": ["id", "type", "exam_type", "grade", "topic", "difficulty", "question"],
                "properties": {
                    "id": { "type": "string" },
                    "type": { "enum": ["single_choice", "true_false_group", "short_answer", "step_solution"] },
                    "exam_type": { "enum": ["TSA", "HSA", "THPT", "Giáº£i tÃ­ch 1", "Äáº¡i há»c"] },
                    "grade": { "type": "string" },
                    "topic": { "type": "string" },
                    "difficulty": { "enum": ["Dá»…", "Trung bÃ¬nh", "KhÃ³", "Váº­n dá»¥ng cao"] },
                    "question": { "type": "string" }
                }
            };
        }
        return {
            "$schema": "https://json-schema.org/draft/2020-12/schema",
            "title": "ResourceSchema",
            "type": "object"
        };
    }
};


// =========================================================================
// PUMKIN.DEV V2 ENGINES & PLATFORM EXTENSIONS
// 100% Deterministic Rule-Based Logic - Zero 3rd Party AI APIs
// Designed with Abstract Extension Interfaces for Future Proprietary AI

// =========================================================================
// PUMKIN.DEV V2 ENGINES & PLATFORM EXTENSIONS
// 100% Deterministic Rule-Based Logic - Zero 3rd Party AI APIs
// Designed with Abstract Extension Interfaces for Future Proprietary AI

// =========================================================================
// PUMKIN.DEV V2 ENGINES & PLATFORM EXTENSIONS
// 100% Deterministic Rule-Based Logic - Zero 3rd Party AI APIs
// Designed with Abstract Extension Interfaces for Future Proprietary AI

// =========================================================================
// PUMKIN.DEV V2 ENGINES & PLATFORM EXTENSIONS
// 100% Deterministic Rule-Based Logic - Zero 3rd Party AI APIs
// Designed with Abstract Extension Interfaces for Future Proprietary AI
// =========================================================================

// 18. LEARNING TRACE ENGINE (Nhat ky hanh vi & dau vet hoc tap chi tiet)
const PumkinLearningTrace = {
    STORAGE_KEY: "pumkin_learning_trace_v2",

    getTraceKey() {
        if (typeof PumkinStorage !== "undefined" && PumkinStorage.getPartitionKey) {
            return PumkinStorage.getPartitionKey("learning_trace");
        }
        return this.STORAGE_KEY;
    },

    getTrace() {
        try {
            const raw = localStorage.getItem(this.getTraceKey());
            const trace = raw ? JSON.parse(raw) : [];
            if (trace.length === 0) {
                return this.seedFromHistory();
            }
            return trace;
        } catch (e) {
            console.warn("Lá»—i khi Ä‘á»c learning trace:", e);
            return [];
        }
    },

    saveTrace(trace) {
        try {
            // Keep last 500 attempts to avoid storage overflow
            const trimmed = trace.slice(0, 500);
            localStorage.setItem(this.getTraceKey(), JSON.stringify(trimmed));
        } catch (e) {
            console.warn("Lá»—i khi lÆ°u learning trace:", e);
        }
    },

    addAttempt(record) {
        // record: { questionId, examId, isCorrect, status, timeSpentSeconds, userAnswer, topic, cognitive_level, skills }
        const trace = this.getTrace();
        const q = (typeof PumkinStorage !== "undefined") ? PumkinStorage.getQuestionById(record.questionId) : null;
        
        // Auto classify error if wrong
        let errorType = null;
        if (!record.isCorrect && record.status !== "correct") {
            const classification = PumkinErrorClassifier.classify(q, record);
            errorType = classification.type;
        }

        const newRecord = {
            id: "trace_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
            timestamp: new Date().toISOString(),
            questionId: record.questionId,
            examId: record.examId || "practice",
            isCorrect: !!record.isCorrect,
            status: record.status || (record.isCorrect ? "correct" : "wrong"),
            timeSpentSeconds: Number(record.timeSpentSeconds) || 0,
            userAnswer: record.userAnswer,
            topic: record.topic || (q ? q.topic : "ToÃ¡n chung"),
            cognitive_level: record.cognitive_level || (q ? q.cognitive_level : "ThÃ´ng hiá»ƒu"),
            skills: record.skills || (q ? q.skills : ["skill_reasoning"]),
            error_type: errorType
        };

        trace.unshift(newRecord);
        this.saveTrace(trace);
        return newRecord;
    },

    seedFromHistory() {
        try {
            if (typeof PumkinStorage === "undefined") return [];
            const history = PumkinStorage.getHistory() || [];
            if (history.length === 0) return [];

            const seeded = [];
            history.forEach(attempt => {
                const questions = attempt.questions || [];
                const gradings = attempt.grading || [];
                const userAns = attempt.user_answers || [];
                const timePerQ = Math.round((attempt.time_spent_seconds || 60) / Math.max(1, questions.length));

                questions.forEach((q, idx) => {
                    const g = gradings[idx];
                    const isCorrect = g ? (g.status === "correct") : false;
                    const status = g ? g.status : (isCorrect ? "correct" : "wrong");

                    let errorType = null;
                    if (!isCorrect) {
                        const classObj = PumkinErrorClassifier.classify(q, {
                            timeSpentSeconds: timePerQ,
                            status: status
                        });
                        errorType = classObj.type;
                    }

                    seeded.push({
                        id: "seed_" + (attempt.id || Date.now()) + "_" + idx,
                        timestamp: attempt.date || new Date().toISOString(),
                        questionId: q.id,
                        examId: attempt.exam_id || "historical_exam",
                        isCorrect: isCorrect,
                        status: status,
                        timeSpentSeconds: timePerQ,
                        userAnswer: userAns[idx] !== undefined ? userAns[idx] : null,
                        topic: q.topic || "ToÃ¡n chung",
                        cognitive_level: q.cognitive_level || "ThÃ´ng hiá»ƒu",
                        skills: q.skills || ["skill_reasoning"],
                        error_type: errorType
                    });
                });
            });

            if (seeded.length > 0) {
                this.saveTrace(seeded);
            }
            return seeded;
        } catch (e) {
            console.warn("Lá»—i khi táº¡o háº¡t giá»‘ng tá»« lá»‹ch sá»­:", e);
            return [];
        }
    }
};

// 19. DETERMINISTIC ERROR CLASSIFIER ENGINE (Bo phan loai loi sai quy chuan)
const PumkinErrorClassifier = {
    ERROR_TYPES: {
        careless_mistake: {
            name: "Lá»—i áº©u (LÃ m quÃ¡ nhanh)",
            icon: "âš¡",
            color: "#eab308",
            description: "Thao tÃ¡c quÃ¡ vá»™i vÃ ng (< 40% thá»i gian Æ°á»›c lÆ°á»£ng) á»Ÿ cÃ¡c cÃ¢u há»i quen thuá»™c dáº«n Ä‘áº¿n sai sÃ³t Ä‘Ã¡ng tiáº¿c.",
            recommendation: "Äá»c ká»¹ tá»« khÃ³a 'khÃ´ng Ä‘Ãºng', 'nghá»‹ch biáº¿n' vÃ  kiá»ƒm tra láº¡i phÃ©p tÃ­nh bÆ°á»›c cuá»‘i trÆ°á»›c khi chá»n."
        },
        time_management: {
            name: "Quáº£n lÃ½ thá»i gian kÃ©m",
            icon: "â±ï¸",
            color: "#f97316",
            description: "Máº¥t quÃ¡ nhiá»u thá»i gian (> 2.5 láº§n thá»i gian chuáº©n) hoáº·c bá»‹ quÃ¡ giá» dáº«n tá»›i bá» sÃ³t hoáº·c chá»n vá»™i.",
            recommendation: "Ãp dá»¥ng chiáº¿n thuáº­t 2 lÆ°á»£t: lÃ m nhanh cÃ¢u quen dÆ°á»›i 1 phÃºt, Ä‘Ã¡nh dáº¥u cÃ¢u khÃ³ Ä‘á»ƒ quay láº¡i sau."
        },
        knowledge_gap: {
            name: "Há»•ng kiáº¿n thá»©c ná»n táº£ng",
            icon: "ðŸ“–",
            color: "#ef4444",
            description: "ChÆ°a náº¯m vá»¯ng Ä‘á»‹nh nghÄ©a, Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh hoáº·c Ä‘á»‹nh lÃ½ then chá»‘t cá»§a chuyÃªn Ä‘á».",
            recommendation: "Xem láº¡i sá»• tay kiáº¿n thá»©c, ghi nhá»› Ä‘iá»u kiá»‡n biÃªn vÃ  luyá»‡n 5 cÃ¢u cÆ¡ báº£n (M1/M2) trÆ°á»›c."
        },
        reasoning_error: {
            name: "Sai láº§m suy luáº­n / Logic",
            icon: "ðŸ§©",
            color: "#8b5cf6",
            description: "Láº­p luáº­n thiáº¿u trÆ°á»ng há»£p, ngá»™ nháº­n Ä‘iá»u kiá»‡n Ä‘á»§ thÃ nh Ä‘iá»u kiá»‡n cáº§n á»Ÿ cÃ¢u váº­n dá»¥ng cao.",
            recommendation: "Váº½ sÆ¡ Ä‘á»“ tÆ° duy, biá»‡n luáº­n Ä‘áº§y Ä‘á»§ cÃ¡c kháº£ nÄƒng vÃ  thá»­ cÃ¡c giÃ¡ trá»‹ Ä‘áº·c biá»‡t Ä‘á»ƒ loáº¡i trá»«."
        },
        calculation_error: {
            name: "Sai sÃ³t tÃ­nh toÃ¡n sá»‘ há»c",
            icon: "ðŸ”¢",
            color: "#06b6d4",
            description: "Sai dáº¥u (+/-), nháº§m cÃ´ng thá»©c nguyÃªn hÃ m hoáº·c nhÃ¢n chia sá»‘ lá»›n khi biáº¿n Ä‘á»•i Ä‘áº¡i sá»‘.",
            recommendation: "RÃ¨n luyá»‡n báº¥m mÃ¡y tÃ­nh cáº§m tay chuáº©n xÃ¡c vÃ  nháº©m nghiá»‡m nguyÃªn Ä‘á»ƒ kiá»ƒm chá»©ng."
        },
        concept_confusion: {
            name: "Nháº§m láº«n khÃ¡i niá»‡m",
            icon: "â“",
            color: "#ec4899",
            description: "Nháº§m láº«n giá»¯a Ä‘iá»ƒm cá»±c trá»‹ vá»›i giÃ¡ trá»‹ cá»±c trá»‹, xÃ¡c suáº¥t cÃ³ Ä‘iá»u kiá»‡n vá»›i xÃ¡c suáº¥t giao.",
            recommendation: "PhÃ¢n biá»‡t ráº¡ch rÃ²i thuáº­t ngá»¯ toÃ¡n há»c thÃ´ng qua cÃ¡c báº£ng so sÃ¡nh trong cáº©m nang."
        }
    },

    classify(question, attempt) {
        if (!question) {
            return {
                type: "knowledge_gap",
                ...this.ERROR_TYPES.knowledge_gap
            };
        }

        const estTime = question.estimated_time_seconds || 90;
        const timeSpent = attempt.timeSpentSeconds || 0;
        const level = question.cognitive_level || "ThÃ´ng hiá»ƒu";
        const isSkipped = (attempt.status === "skipped");

        // Rule 1: Skipped question or huge time spent with no result
        if (isSkipped) {
            return {
                type: "knowledge_gap",
                ...this.ERROR_TYPES.knowledge_gap,
                specific: "CÃ¢u há»i bá»‹ bá» qua, pháº£n Ã¡nh vÃ¹ng kiáº¿n thá»©c chÆ°a tá»± tin."
            };
        }

        const lvlStr = String(level || "").toLowerCase().trim();
        const isM1M2 = (level === "M1" || level === "M2" || level === "Nháº­n biáº¿t" || level === "ThÃ´ng hiá»ƒu" || lvlStr.includes("m1") || lvlStr.includes("m2") || lvlStr.includes("nháº­n") || lvlStr.includes("thÃ´ng") || lvlStr.includes("nh?n") || lvlStr.includes("th?ng"));
        const isM3M4 = (level === "M3" || level === "M4" || level === "Váº­n dá»¥ng" || level === "Váº­n dá»¥ng cao" || lvlStr.includes("m3") || lvlStr.includes("m4") || lvlStr.includes("váº­n") || lvlStr.includes("v?n"));

        // Rule 2: Careless mistake (Spent < 40% of estimated time on M1/M2)
        if (timeSpent > 0 && timeSpent < estTime * 0.4 && isM1M2) {
            return {
                type: "careless_mistake",
                ...this.ERROR_TYPES.careless_mistake,
                specific: `Thá»i gian lÃ m bÃ i (${timeSpent}s) quÃ¡ ngáº¯n so vá»›i Æ°á»›c lÆ°á»£ng (${estTime}s).`
            };
        }

        // Rule 3: Time management issue (Spent > 2.5x estimated time)
        if (timeSpent > estTime * 2.5 && timeSpent > 180) {
            return {
                type: "time_management",
                ...this.ERROR_TYPES.time_management,
                specific: `Máº¥t quÃ¡ nhiá»u thá»i gian (${timeSpent}s / chuáº©n ${estTime}s), gÃ¢y Ã¡p lá»±c cho cÃ¡c cÃ¢u sau.`
            };
        }

        // Rule 4: True/False conceptual confusion
        if (question.type === "true_false_group") {
            return {
                type: "concept_confusion",
                ...this.ERROR_TYPES.concept_confusion,
                specific: "Sai sÃ³t trong viá»‡c phÃ¢n Ä‘á»‹nh má»‡nh Ä‘á» Ä‘Ãºng/sai cá»§a bÃ i toÃ¡n Ä‘á»‹nh tÃ­nh."
            };
        }

        // Rule 5: Calculation error in computation-heavy questions
        if ((question.skills || []).includes("skill_calculation") && isM1M2) {
            return {
                type: "calculation_error",
                ...this.ERROR_TYPES.calculation_error,
                specific: "Lá»—i phÃ¡t sinh trong quÃ¡ trÃ¬nh biáº¿n Ä‘á»•i Ä‘áº¡i sá»‘ hoáº·c tÃ­nh toÃ¡n sá»‘ há»c."
            };
        }

        // Rule 6: Reasoning error on advanced questions (M3/M4)
        if (isM3M4) {
            return {
                type: "reasoning_error",
                ...this.ERROR_TYPES.reasoning_error,
                specific: "Láº­p luáº­n hoáº·c Ä‘á»‹nh hÆ°á»›ng giáº£i chÆ°a cháº¡m tá»›i Ä‘iá»ƒm tháº¯t cá»§a bÃ i toÃ¡n má»©c Ä‘á»™ 3, 4."
            };
        }

        // Fallback default
        return {
            type: "knowledge_gap",
            ...this.ERROR_TYPES.knowledge_gap,
            specific: "Cáº§n cá»§ng cá»‘ láº¡i phÆ°Æ¡ng phÃ¡p giáº£i cÆ¡ báº£n."
        };
    }
};

// 20. MATHEMATICS SKILL PROFILE & MASTERY ENGINE
const PumkinSkillProfile = {
    SKILL_DEFS: {
        "skill_reasoning": { name: "TÆ° duy & Suy luáº­n toÃ¡n há»c", icon: "ðŸ§ ", color: "#3b82f6" },
        "skill_calculation": { name: "TÃ­nh toÃ¡n & Äáº¡i sá»‘ chuáº©n xÃ¡c", icon: "ðŸ”¢", color: "#10b981" },
        "skill_modeling": { name: "MÃ´ hÃ¬nh hÃ³a thá»±c táº¿", icon: "ðŸŒ", color: "#f59e0b" },
        "skill_spatial": { name: "Trá»±c giÃ¡c hÃ¬nh há»c & Oxyz", icon: "ðŸ“", color: "#8b5cf6" },
        "skill_probability": { name: "XÃ¡c suáº¥t & Thá»‘ng kÃª", icon: "ðŸŽ²", color: "#ec4899" },
        "skill_data_analysis": { name: "PhÃ¢n tÃ­ch sá»‘ liá»‡u & Biá»ƒu Ä‘á»“", icon: "ðŸ“Š", color: "#06b6d4" }
    },

    computeProfile() {
        const trace = PumkinLearningTrace.getTrace();
        const profile = {
            totalAttempts: trace.length,
            totalCorrect: 0,
            overallAccuracy: 0,
            avgTimeSeconds: 0,
            skills: {},
            topics: {},
            errorStats: {
                careless_mistake: 0,
                knowledge_gap: 0,
                reasoning_error: 0,
                calculation_error: 0,
                time_management: 0,
                concept_confusion: 0
            },
            strengths: [],
            weaknesses: [],
            trend: "á»”n Ä‘á»‹nh â†’"
        };

        // Initialize 6 skills
        Object.keys(this.SKILL_DEFS).forEach(k => {
            profile.skills[k] = { total: 0, correct: 0, accuracy: 0, totalTime: 0 };
        });

        if (trace.length === 0) {
            return profile;
        }

        let sumTime = 0;
        trace.forEach(item => {
            if (item.isCorrect) profile.totalCorrect++;
            sumTime += (item.timeSpentSeconds || 0);

            // Skill aggregation
            const sList = Array.isArray(item.skills) && item.skills.length > 0 ? item.skills : ["skill_reasoning"];
            sList.forEach(sId => {
                if (!profile.skills[sId]) {
                    profile.skills[sId] = { total: 0, correct: 0, accuracy: 0, totalTime: 0 };
                }
                profile.skills[sId].total++;
                if (item.isCorrect) profile.skills[sId].correct++;
                profile.skills[sId].totalTime += (item.timeSpentSeconds || 0);
            });

            // Topic aggregation
            const top = item.topic || "KhÃ¡c";
            if (!profile.topics[top]) {
                profile.topics[top] = { total: 0, correct: 0, accuracy: 0 };
            }
            profile.topics[top].total++;
            if (item.isCorrect) profile.topics[top].correct++;

            // Error stats
            if (!item.isCorrect && item.error_type && profile.errorStats[item.error_type] !== undefined) {
                profile.errorStats[item.error_type]++;
            }
        });

        profile.overallAccuracy = Math.round((profile.totalCorrect / profile.totalAttempts) * 100);
        profile.avgTimeSeconds = Math.round(sumTime / profile.totalAttempts);

        // Calculate skill accuracies
        Object.keys(profile.skills).forEach(k => {
            const s = profile.skills[k];
            s.accuracy = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
        });

        // Calculate topic accuracies
        Object.keys(profile.topics).forEach(t => {
            const top = profile.topics[t];
            top.accuracy = top.total > 0 ? Math.round((top.correct / top.total) * 100) : 0;
            if (top.total >= 3) {
                if (top.accuracy >= 70) {
                    profile.strengths.push({ topic: t, accuracy: top.accuracy, total: top.total });
                } else if (top.accuracy < 60) {
                    profile.weaknesses.push({ topic: t, accuracy: top.accuracy, total: top.total });
                }
            }
        });

        profile.strengths.sort((a, b) => b.accuracy - a.accuracy);
        profile.weaknesses.sort((a, b) => a.accuracy - b.accuracy);

        // Trend calculation (recent 20 vs previous 20)
        if (trace.length >= 10) {
            const half = Math.floor(trace.length / 2);
            const recent = trace.slice(0, half);
            const older = trace.slice(half);

            const recentAcc = recent.filter(t => t.isCorrect).length / recent.length;
            const olderAcc = older.filter(t => t.isCorrect).length / older.length;
            const diff = recentAcc - olderAcc;

            if (diff >= 0.08) profile.trend = "Cáº£i thiá»‡n rÃµ rá»‡t â†—";
            else if (diff <= -0.08) profile.trend = "Cáº§n tÄƒng tá»‘c â†˜";
            else profile.trend = "á»”n Ä‘á»‹nh â†’";
        }

        return profile;
    },

    renderSkillProfile() {
        const profile = this.computeProfile();

        // 1. Render Skill Bars Grid
        const grid = document.getElementById("dashboard-skill-bars-grid");
        if (grid) {
            grid.innerHTML = Object.keys(this.SKILL_DEFS).map(k => {
                const def = this.SKILL_DEFS[k];
                const data = profile.skills[k] || { total: 0, correct: 0, accuracy: 0 };
                return `
                    <div class="skill-card" style="background: white; border: 1px solid var(--border-color); border-radius: 10px; padding: 14px 16px; box-shadow: var(--shadow-sm);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <span style="font-weight: 700; font-size: 13.5px; display: flex; align-items: center; gap: 6px;">
                                <span>${def.icon}</span> <span>${def.name}</span>
                            </span>
                            <span style="font-weight: 800; font-size: 14px; color: ${def.color};">${data.accuracy}%</span>
                        </div>
                        <div style="background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 6px;">
                            <div style="background: ${def.color}; width: ${data.accuracy}%; height: 100%; border-radius: 4px; transition: width 0.6s ease;"></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 11.5px; color: var(--text-muted);">
                            <span>Sá»‘ cÃ¢u lÃ m: ${data.total}</span>
                            <span>ÄÃºng: ${data.correct}/${data.total}</span>
                        </div>
                    </div>
                `;
            }).join("");
        }

        // 2. Trend Badge
        const trendBadge = document.getElementById("skill-trend-badge");
        if (trendBadge) {
            trendBadge.textContent = `Xu hÆ°á»›ng: ${profile.trend}`;
            if (profile.trend.includes("â†—")) {
                trendBadge.style.color = "#059669";
                trendBadge.style.borderColor = "#a7f3d0";
                trendBadge.style.background = "#ecfdf5";
            } else if (profile.trend.includes("â†˜")) {
                trendBadge.style.color = "#dc2626";
                trendBadge.style.borderColor = "#fecaca";
                trendBadge.style.background = "#fef2f2";
            } else {
                trendBadge.style.color = "var(--primary)";
                trendBadge.style.borderColor = "#bfdbfe";
                trendBadge.style.background = "#eff6ff";
            }
        }

        // 3. Strengths List
        const strengthsList = document.getElementById("skill-strengths-list");
        if (strengthsList) {
            if (profile.strengths.length === 0) {
                strengthsList.innerHTML = `<p style="color: var(--text-muted); font-size: 13px; margin: 0;">LÃ m thÃªm Ã­t nháº¥t 1 Ä‘á» Ä‘á»ƒ há»‡ thá»‘ng ghi nháº­n Ä‘iá»ƒm máº¡nh cá»‘t lÃµi cá»§a báº¡n.</p>`;
            } else {
                strengthsList.innerHTML = profile.strengths.slice(0, 4).map(s => `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px dashed #e2e8f0;">
                        <span style="font-weight: 600;">âœ“ ${s.topic}</span>
                        <span style="color: #059669; font-weight: 700;">${s.accuracy}% (${s.total} cÃ¢u)</span>
                    </div>
                `).join("");
            }
        }

        // 4. Weaknesses List
        const weaknessesList = document.getElementById("skill-weaknesses-list");
        if (weaknessesList) {
            if (profile.weaknesses.length === 0) {
                weaknessesList.innerHTML = `<p style="color: #059669; font-size: 13px; margin: 0;">ChÆ°a ghi nháº­n lá»— há»•ng Ä‘Ã¡ng ká»ƒ. HÃ£y thá»­ sá»©c cÃ¡c Ä‘á» thi má»©c Ä‘á»™ Váº­n dá»¥ng cao!</p>`;
            } else {
                weaknessesList.innerHTML = profile.weaknesses.slice(0, 4).map(w => `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px dashed #e2e8f0;">
                        <span style="font-weight: 600;">âš ï¸ ${w.topic}</span>
                        <span style="color: #dc2626; font-weight: 700;">${w.accuracy}% (${w.total} cÃ¢u)</span>
                    </div>
                `).join("");
            }
        }

        // 5. Error Distribution Breakdown
        const errContainer = document.getElementById("skill-error-distribution");
        if (errContainer) {
            errContainer.innerHTML = Object.keys(profile.errorStats).map(typeKey => {
                const count = profile.errorStats[typeKey];
                const def = PumkinErrorClassifier.ERROR_TYPES[typeKey] || { name: typeKey, icon: "âš ï¸", color: "#64748b" };
                return `
                    <div class="error-pill" style="display: flex; align-items: center; gap: 6px; background: #f8fafc; border: 1px solid #e2e8f0; padding: 6px 12px; border-radius: 20px; font-size: 12.5px;">
                        <span>${def.icon}</span>
                        <span style="font-weight: 600; color: var(--text-color);">${def.name}:</span>
                        <span style="font-weight: 800; color: ${def.color};">${count}</span>
                    </div>
                `;
            }).join("");
        }

        // 6. Update Recommendations via RecommendationEngine
        PumkinRecommendationEngine.generateRecommendations(profile);
    }
};

// 21. RECOMMENDATION ENGINE & EXTENSION PROVIDER INTERFACES
// Rule-Based 100% Deterministic Engine with Abstract Interfaces for Future AI
class RecommendationProvider {
    recommendNextAction(profile) { throw new Error("Not implemented"); }
}
class AssessmentProvider {
    evaluateSubmission(submission) { throw new Error("Not implemented"); }
}
class ExplanationProvider {
    generateExplanation(question, context) { throw new Error("Not implemented"); }
}
class QuestionGenerationProvider {
    generateVariant(templateQuestion) { throw new Error("Not implemented"); }
}

class DeterministicRuleProvider extends RecommendationProvider {
    recommendNextAction(profile) {
        const trace = PumkinLearningTrace.getTrace();
        const articles = (typeof PumkinStorage !== "undefined") ? PumkinStorage.getKnowledgeBase() : [];
        const questions = (typeof PumkinStorage !== "undefined") ? PumkinStorage.getQuestions() : [];

        let targetTopic = "Giáº£i tÃ­ch";
        let targetArticle = articles[0] || null;

        if (profile.weaknesses && profile.weaknesses.length > 0) {
            targetTopic = profile.weaknesses[0].topic;
            targetArticle = articles.find(a => a.topic && a.topic.toLowerCase().includes(targetTopic.toLowerCase())) || articles[0];
        } else if (articles.length > 0) {
            targetArticle = articles[Math.floor(Math.random() * Math.min(5, articles.length))];
            if (targetArticle) targetTopic = targetArticle.topic || targetTopic;
        }

        // Find practice questions for drill
        const drillQuestions = questions.filter(q => q.topic && q.topic.toLowerCase().includes(targetTopic.toLowerCase())).slice(0, 5);

        return {
            summary: profile.totalAttempts === 0
                ? `ðŸ’¡ Khá»Ÿi Ä‘áº§u lá»™ trÃ¬nh há»c táº­p vá»›i chuyÃªn Ä‘á» ná»n táº£ng: <strong>${targetArticle ? targetArticle.title : targetTopic}</strong>.`
                : `ðŸŽ¯ PhÃ¡t hiá»‡n chuyÃªn Ä‘á» cáº§n tá»‘i Æ°u hÃ³a Ä‘iá»ƒm sá»‘: <strong>${targetArticle ? targetArticle.title : targetTopic}</strong> (Lá»— há»•ng: ${profile.weaknesses[0] ? profile.weaknesses[0].accuracy : 50}%).`,
            steps: [
                {
                    badge: "1",
                    title: `Äá»c láº¡i lÃ½ thuyáº¿t & CÃ´ng thá»©c then chá»‘t: ${targetArticle ? targetArticle.title : targetTopic}`,
                    desc: `Náº¯m vá»¯ng Ä‘á»‹nh nghÄ©a, Ä‘iá»u kiá»‡n Ã¡p dá»¥ng vÃ  cÃ¡c báº«y thÆ°á»ng gáº·p.`,
                    actionText: "ðŸ“– Má»Ÿ chuyÃªn Ä‘á» lÃ½ thuyáº¿t",
                    action: `PumkinKnowledge.openArticle('${targetArticle ? targetArticle.id : 'kb_toan12_01'}')`
                },
                {
                    badge: "2",
                    title: `Luyá»‡n 5 cÃ¢u há»i trá»ng tÃ¢m chuyÃªn Ä‘á» (${drillQuestions.length} cÃ¢u)`,
                    desc: `Cá»§ng cá»‘ pháº£n xáº¡ giáº£i toÃ¡n thá»±c chiáº¿n qua cÃ¡c cÃ¢u há»i trÃ­ch tá»« ngÃ¢n hÃ ng Ä‘á» chuáº©n hÃ³a.`,
                    actionText: "âš¡ Báº¯t Ä‘áº§u luyá»‡n 5 cÃ¢u",
                    action: `PumkinKnowledge.startDrillForArticle('${targetArticle ? targetArticle.id : 'kb_toan12_01'}')`
                },
                {
                    badge: "3",
                    title: `Thi thá»­ má»™t Ä‘á» kiá»ƒm Ä‘á»‹nh toÃ n diá»‡n (TSA / HSA)`,
                    desc: `Äo lÆ°á»ng sá»± tiáº¿n bá»™ sau khi Ä‘Ã£ cá»§ng cá»‘ chuyÃªn Ä‘á» yáº¿u.`,
                    actionText: "ðŸ“ Äáº¿n kho Ä‘á» thi",
                    action: `PumkinRouter.navigate('library')`
                }
            ]
        };
    }
}

const PumkinRecommendationEngine = {
    provider: new DeterministicRuleProvider(),

    setProvider(newProvider) {
        if (newProvider instanceof RecommendationProvider) {
            this.provider = newProvider;
        }
    },

    generateRecommendations(profile) {
        const rec = this.provider.recommendNextAction(profile);
        const sumEl = document.getElementById("learning-path-recommendation-summary");
        const listEl = document.getElementById("learning-path-step-list");

        if (sumEl) sumEl.innerHTML = rec.summary;
        if (listEl) {
            listEl.innerHTML = rec.steps.map(step => `
                <div class="learning-path-step" style="display: flex; gap: 14px; margin-bottom: 14px; background: white; border: 1px solid var(--border-color); border-radius: 8px; padding: 14px 18px;">
                    <div class="learning-step-badge" style="width: 28px; height: 28px; border-radius: 50%; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">${step.badge}</div>
                    <div class="learning-step-content" style="flex: 1;">
                        <div class="learning-step-title" style="font-weight: 700; color: var(--primary); font-size: 14px; margin-bottom: 4px;">${step.title}</div>
                        <div class="learning-step-desc" style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">${step.desc}</div>
                        <button class="btn btn-sm btn-outline" style="margin-top: 8px;" onclick="${step.action}">
                            ${step.actionText}
                        </button>
                    </div>
                </div>
            `).join("");
        }
    }
};

// 22. ADAPTIVE PRACTICE ENGINE (Luyen tap thich ung tang giam do kho tuc thi)
const PumkinAdaptivePractice = {
    session: null,

    startSession(topic = "all") {
        const allQuestions = (typeof PumkinStorage !== "undefined") ? PumkinStorage.getQuestions() : [];
        const pool = (topic === "all") 
            ? allQuestions 
            : allQuestions.filter(q => q.topic && q.topic.toLowerCase().includes(topic.toLowerCase()));

        this.session = {
            topic: topic,
            tier: 2, // 1: Nháº­n biáº¿t, 2: ThÃ´ng hiá»ƒu, 3: Váº­n dá»¥ng, 4: Váº­n dá»¥ng cao
            history: [],
            score: 0,
            total: 0,
            pool: pool,
            currentQuestion: null
        };

        this.nextQuestion();
    },

    nextQuestion() {
        if (!this.session) return;
        const tierNames = ["Nháº­n biáº¿t", "ThÃ´ng hiá»ƒu", "Váº­n dá»¥ng", "Váº­n dá»¥ng cao"];
        const targetLevel = tierNames[this.session.tier - 1];

        // Filter available questions in current tier
        let candidates = this.session.pool.filter(q => {
            const lvl = q.cognitive_level || "ThÃ´ng hiá»ƒu";
            const notDone = !this.session.history.includes(q.id);
            return lvl === targetLevel && notDone;
        });

        // Fallback if no questions in exact tier
        if (candidates.length === 0) {
            candidates = this.session.pool.filter(q => !this.session.history.includes(q.id));
        }

        if (candidates.length === 0) {
            this.renderUI(null, true);
            return;
        }

        const picked = candidates[Math.floor(Math.random() * candidates.length)];
        this.session.currentQuestion = picked;
        this.session.history.push(picked.id);

        this.renderUI(picked);
    },

    submitAnswer(chosenOptionIndex) {
        if (!this.session || !this.session.currentQuestion) return;
        const q = this.session.currentQuestion;
        const isCorrect = (chosenOptionIndex === q.correct_answer);

        this.session.total++;
        if (isCorrect) {
            this.session.score++;
            // Adaptive logic: level up if correct and not at max
            if (this.session.tier < 4) this.session.tier++;
        } else {
            // Adaptive logic: level down if wrong and not at min
            if (this.session.tier > 1) this.session.tier--;
        }

        // Record in learning trace
        PumkinLearningTrace.addAttempt({
            questionId: q.id,
            examId: "adaptive_session",
            isCorrect: isCorrect,
            status: isCorrect ? "correct" : "wrong",
            timeSpentSeconds: 45,
            userAnswer: chosenOptionIndex,
            topic: q.topic,
            cognitive_level: q.cognitive_level,
            skills: q.skills
        });

        this.renderUI(q, false, isCorrect);
    },

    renderUI(question = null, isFinished = false, lastResult = null) {
        const container = document.getElementById("adaptive-practice-container");
        if (!container) return;

        if (!this.session) {
            container.innerHTML = `
                <div style="background: white; border: 1px solid var(--border-color); border-radius: 12px; padding: 28px; text-align: center;">
                    <div style="font-size: 36px; margin-bottom: 12px;">ðŸŽ¯</div>
                    <h3 style="color: var(--primary); margin-bottom: 8px;">Luyá»‡n Táº­p ThÃ­ch á»¨ng (Adaptive Practice Engine)</h3>
                    <p style="color: var(--text-muted); font-size: 14px; max-width: 540px; margin: 0 auto 20px auto; line-height: 1.6;">
                        Thuáº­t toÃ¡n tá»± Ä‘á»™ng tÄƒng Ä‘á»™ khÃ³ khi báº¡n lÃ m Ä‘Ãºng (M1 âž” M2 âž” M3 âž” M4) vÃ  háº¡ cáº¥p Ä‘á»™ khÃ³ khi lÃ m sai Ä‘á»ƒ cá»§ng cá»‘ ná»n táº£ng má»™t cÃ¡ch vá»¯ng cháº¯c nháº¥t.
                    </p>
                    <button class="btn btn-primary btn-lg" onclick="PumkinAdaptivePractice.startSession('all')">
                        ðŸš€ Khá»Ÿi Ä‘á»™ng Luyá»‡n ThÃ­ch á»¨ng Ngay
                    </button>
                </div>
            `;
            return;
        }

        const s = this.session;
        const q = question || s.currentQuestion;

        if (isFinished || !q) {
            container.innerHTML = `
                <div style="background: white; border: 1px solid var(--border-color); border-radius: 12px; padding: 32px; text-align: center;">
                    <div style="font-size: 40px; margin-bottom: 10px;">ðŸ†</div>
                    <h3 style="color: var(--primary);">HoÃ n ThÃ nh PhiÃªn Luyá»‡n ThÃ­ch á»¨ng!</h3>
                    <p style="color: var(--text-muted); margin: 12px 0 20px 0;">
                        Báº¡n Ä‘Ã£ hoÃ n thÃ nh <strong>${s.total} cÃ¢u</strong> vá»›i Ä‘á»™ chÃ­nh xÃ¡c <strong>${Math.round((s.score / s.total) * 100)}%</strong>.
                    </p>
                    <button class="btn btn-primary" onclick="PumkinAdaptivePractice.startSession('all')">Luyá»‡n táº­p lÆ°á»£t má»›i</button>
                </div>
            `;
            return;
        }

        const tierNames = ["CÆ¡ báº£n (M1)", "ThÃ´ng hiá»ƒu (M2)", "Váº­n dá»¥ng (M3)", "Váº­n dá»¥ng cao (M4)"];
        const tierBadges = ["#10b981", "#3b82f6", "#f59e0b", "#dc2626"];

        let feedbackHtml = "";
        if (lastResult !== null) {
            feedbackHtml = lastResult 
                ? `<div style="background: #ecfdf5; border: 1px solid #10b981; color: #065f46; padding: 10px 14px; border-radius: 8px; margin-bottom: 16px; font-weight: 600;">
                    âœ“ ChÃ­nh xÃ¡c! TÄƒng Ä‘á»™ khÃ³: <span style="color: ${tierBadges[s.tier - 1]}; font-weight: 800;">${tierNames[s.tier - 1]}</span>
                   </div>`
                : `<div style="background: #fef2f2; border: 1px solid #ef4444; color: #991b1b; padding: 10px 14px; border-radius: 8px; margin-bottom: 16px; font-weight: 600;">
                    âœ— ChÆ°a chÃ­nh xÃ¡c. Háº¡ Ä‘á»™ khÃ³ Ä‘á»ƒ cá»§ng cá»‘: <span style="color: ${tierBadges[s.tier - 1]}; font-weight: 800;">${tierNames[s.tier - 1]}</span>
                   </div>`;
        }

        container.innerHTML = `
            <div style="background: white; border: 1px solid var(--border-color); border-radius: 12px; padding: 24px; box-shadow: var(--shadow-sm);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
                    <div>
                        <span style="font-size: 13px; font-weight: 700; background: ${tierBadges[s.tier - 1]}; color: white; padding: 4px 10px; border-radius: 20px;">
                            Cáº¥p Ä‘á»™: ${tierNames[s.tier - 1]}
                        </span>
                        <span style="margin-left: 10px; font-size: 13px; color: var(--text-muted);">
                            Tiáº¿n Ä‘á»™: CÃ¢u ${s.total + 1} | ÄÃºng: ${s.score}/${s.total}
                        </span>
                    </div>
                    <button class="btn btn-sm btn-outline" onclick="PumkinAdaptivePractice.startSession('all')">
                        ðŸ”„ Äá»•i Ä‘á»
                    </button>
                </div>

                ${feedbackHtml}

                <div style="font-size: 16px; font-weight: 600; line-height: 1.6; margin-bottom: 20px; color: var(--text-color);">
                    ${q.question || q.question_text}
                </div>

                <div style="display: flex; flex-direction: column; gap: 10px;">
                    ${(q.options || []).map((opt, idx) => `
                        <button class="btn btn-outline" style="text-align: left; padding: 12px 16px; font-size: 14.5px; border-radius: 8px;" onclick="PumkinAdaptivePractice.submitAnswer(${idx})">
                            <strong>${["A", "B", "C", "D"][idx]}.</strong> ${opt}
                        </button>
                    `).join("")}
                </div>
            </div>
        `;

        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([container]);
        }
    }
};

// 23. STANDARDIZED BACKUP & RESTORE SYSTEM (PUMKIN_BACKUP_V2)
const PumkinBackup = {
    exportBackup() {
        try {
            const backupData = {
                format: "PUMKIN_BACKUP_V2",
                version: "2.0.0",
                exported_at: new Date().toISOString(),
                user: (typeof PumkinAuth !== "undefined") ? PumkinAuth.getCurrentUser() : null,
                bookmarks: (typeof PumkinStorage !== "undefined") ? PumkinStorage.getBookmarkDetails() : [],
                history: (typeof PumkinStorage !== "undefined") ? PumkinStorage.getHistory() : [],
                learning_trace: PumkinLearningTrace.getTrace()
            };

            const jsonStr = JSON.stringify(backupData, null, 2);
            const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
            a.href = url;
            a.download = `pumkin_backup_v2_${dateStr}.json`;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 300);

            alert("âœ… ÄÃ£ xuáº¥t báº£n sao lÆ°u PUMKIN_BACKUP_V2 thÃ nh cÃ´ng! Báº¡n cÃ³ thá»ƒ lÆ°u trá»¯ an toÃ n hoáº·c chuyá»ƒn sang thiáº¿t bá»‹ khÃ¡c.");
        } catch(e) {
            alert("âŒ Lá»—i khi xuáº¥t báº£n sao lÆ°u: " + e.message);
        }
    },

    importBackupFile(fileInput) {
        const file = fileInput.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                this.handleImportData(data);
            } catch(err) {
                alert("âŒ Tá»‡p sao lÆ°u khÃ´ng Ä‘Ãºng Ä‘á»‹nh dáº¡ng JSON: " + err.message);
            }
        };
        reader.readAsText(file, "UTF-8");
        fileInput.value = ""; // Reset
    },

    handleImportData(data) {
        if (!data || data.format !== "PUMKIN_BACKUP_V2") {
            alert("âŒ Tá»‡p khÃ´ng há»£p lá»‡! Chá»‰ cháº¥p nháº­n tá»‡p sao lÆ°u chuáº©n PUMKIN_BACKUP_V2.");
            return;
        }

        const bCount = (data.bookmarks || []).length;
        const hCount = (data.history || []).length;
        const tCount = (data.learning_trace || []).length;

        const choice = confirm(
            `ðŸ“¦ TÃ¬m tháº¥y báº£n sao lÆ°u PUMKIN_BACKUP_V2:\n` +
            `- NgÃ y táº¡o: ${data.exported_at || "KhÃ´ng rÃµ"}\n` +
            `- ÄÃ£ lÆ°u: ${bCount} cÃ¢u há»i\n` +
            `- Lá»‹ch sá»­ thi: ${hCount} bÃ i lÃ m\n` +
            `- Nháº­t kÃ½ há»c táº­p: ${tCount} lÆ°á»£t giáº£i\n\n` +
            `Báº¥m OK Ä‘á»ƒ Há»¢P NHáº¤T (Merge - giá»¯ dá»¯ liá»‡u hiá»‡n táº¡i vÃ  thÃªm dá»¯ liá»‡u má»›i)\n` +
            `Báº¥m CANCEL Ä‘á»ƒ há»§y bá».`
        );

        if (!choice) return;

        this.applyMerge(data);
        alert("âœ… Há»£p nháº¥t báº£n sao lÆ°u PUMKIN_BACKUP_V2 thÃ nh cÃ´ng! Dá»¯ liá»‡u Ä‘Ã£ Ä‘Æ°á»£c cáº­p nháº­t.");
        location.reload();
    },

    applyMerge(data) {
        // 1. Merge bookmarks
        const curBms = PumkinStorage.getBookmarkDetails();
        const seenBms = new Set(curBms.map(b => b.id));
        (data.bookmarks || []).forEach(b => {
            const bObj = typeof b === "string" ? { id: b, reason: "chÆ°a hiá»ƒu", createdAt: Date.now() } : b;
            if (bObj.id && !seenBms.has(bObj.id)) {
                curBms.push(bObj);
                seenBms.add(bObj.id);
            }
        });
        const bmKey = PumkinStorage.getPartitionKey("bookmarks");
        localStorage.setItem(bmKey, JSON.stringify(curBms));

        // 2. Merge history
        const curHist = PumkinStorage.getHistory();
        const seenHist = new Set(curHist.map(h => h.id));
        (data.history || []).forEach(h => {
            if (h.id && !seenHist.has(h.id)) {
                curHist.push(h);
                seenHist.add(h.id);
            }
        });
        const histKey = PumkinStorage.getPartitionKey("history");
        localStorage.setItem(histKey, JSON.stringify(curHist));

        // 3. Merge trace
        const curTrace = PumkinLearningTrace.getTrace();
        const seenTrace = new Set(curTrace.map(t => t.id));
        (data.learning_trace || []).forEach(t => {
            if (t.id && !seenTrace.has(t.id)) {
                curTrace.push(t);
                seenTrace.add(t.id);
            }
        });
        PumkinLearningTrace.saveTrace(curTrace);
    }
};


// Global App Initialization
document.addEventListener("DOMContentLoaded", async () => {
    if (typeof PumkinTheme !== "undefined") {
        PumkinTheme.init();
    }
    if (typeof PumkinUI !== "undefined") {
        PumkinUI.init();
    }
    if (typeof PumkinAuth !== "undefined") {
        await PumkinAuth.init();
    }
    await PumkinStorage.init();
    PumkinBookmarks.updateBadge();
    if (typeof PumkinAdaptivePractice !== "undefined") {
        PumkinAdaptivePractice.renderUI();
    }
    if (typeof PumkinLearningTrace !== "undefined") {
        PumkinLearningTrace.getTrace();
    }
    if (typeof PumkinLevelSystem !== "undefined") {
        PumkinLevelSystem.updateDeepLearningLock();
    }

    // Check if there's an ongoing test session to restore
    const restored = PumkinPlayer.restoreSessionIfAvailable();
    if (!restored) {
        PumkinRouter.navigate("guide");
    }
});
