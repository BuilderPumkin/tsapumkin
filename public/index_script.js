<script>
/* ==========================================================================
   PUMKIN.DEV MATH EXAM PLATFORM - COMPLETE V2 DATA ENGINE
   100% Validated Data with Question DNA & Skill Graph
   ========================================================================== */
const PUMKIN_DEFAULT_KNOWLEDGE = [
    {
        "id":  "kb_toan10_01",
        "grade":  "ToÃ¡n 10",
        "chapter":  "ChÆ°Æ¡ng 1: Má»‡nh Ä‘á» \u0026 Táº­p há»£p",
        "title":  "Má»‡nh Ä‘á», Táº­p há»£p vÃ  CÃ¡c phÃ©p toÃ¡n trÃªn táº­p há»£p",
        "overview":  "Ná»n táº£ng cá»§a tÆ° duy logic toÃ¡n há»c, cáº¥u trÃºc dá»¯ liá»‡u vÃ  bÃ i toÃ¡n Ä‘áº¿m bÃ¹ trá»«.",
        "theory_markdown":  "### 1. Má»‡nh Ä‘á» toÃ¡n há»c vÃ  Má»‡nh Ä‘á» phá»§ Ä‘á»‹nh\nMá»™t má»‡nh Ä‘á» lÃ  má»™t kháº³ng Ä‘á»‹nh Ä‘Ãºng hoáº·c sai, khÃ´ng thá»ƒ vá»«a Ä‘Ãºng vá»«a sai.\n- Má»‡nh Ä‘á» kÃ©o theo: \\(P \\implies Q\\) chá»‰ sai khi \\(P\\) Ä‘Ãºng vÃ  \\(Q\\) sai.\n- Má»‡nh Ä‘á» Ä‘áº£o cá»§a \\(P \\implies Q\\) lÃ  \\(Q \\implies P\\).\n- Má»‡nh Ä‘á» pháº£n Ä‘áº£o: \\(\\overline{Q} \\implies \\overline{P}\\) (cÃ³ cÃ¹ng giÃ¡ trá»‹ chÃ¢n lÃ½ vá»›i \\(P \\implies Q\\)).\n\n### 2. CÃ¡c phÃ©p toÃ¡n trÃªn táº­p há»£p\n- **Giao**: \\(A \\cap B = \\{x \\mid x \\in A \\text{ vÃ  } x \\in B\\}\\).\n- **Há»£p**: \\(A \\cup B = \\{x \\mid x \\in A \\text{ hoáº·c } x \\in B\\}\\).\n- **Hiá»‡u**: \\(A \\setminus B = \\{x \\mid x \\in A \\text{ vÃ  } x \\notin B\\}\\).\n- **Pháº§n bÃ¹**: \\(C_E A = E \\setminus A\\) (vá»›i \\(A \\subset E\\)).",
        "formulas":  [
                         {
                             "id":  "kb_toan10_01_f1",
                             "name":  "NguyÃªn lÃ½ bÃ¹ trá»« 2 táº­p",
                             "latex":  "|A \\cup B| = |A| + |B| - |A \\cap B|",
                             "desc":  "TÃ­nh sá»‘ pháº§n tá»­ cá»§a há»£p hai táº­p há»¯u háº¡n",
                             "tags":  [
                                          "Táº­p há»£p",
                                          "Äáº¿m"
                                      ]
                         },
                         {
                             "id":  "kb_toan10_01_f2",
                             "name":  "NguyÃªn lÃ½ bÃ¹ trá»« 3 táº­p",
                             "latex":  "|A \\cup B \\cup C| = |A|+|B|+|C| - (|A \\cap B| + |B \\cap C| + |C \\cap A|) + |A \\cap B \\cap C|",
                             "desc":  "TÃ­nh sá»‘ pháº§n tá»­ khi cÃ³ 3 táº­p giao nhau",
                             "tags":  [
                                          "Táº­p há»£p",
                                          "XÃ¡c suáº¥t"
                                      ]
                         },
                         {
                             "id":  "kb_toan10_01_f3",
                             "name":  "Äiá»u kiá»‡n hai khoáº£ng giao khÃ¡c rá»—ng",
                             "latex":  "(a; b) \\cap (c; d) \\ne \\emptyset \\iff a \u003c d \\text{ vÃ  } c \u003c b",
                             "desc":  "Äiá»u kiá»‡n Ä‘á»ƒ hai khoáº£ng sá»‘ thá»±c giao nhau khÃ¡c rá»—ng",
                             "tags":  [
                                          "Sá»‘ thá»±c",
                                          "Khoáº£ng Ä‘oáº¡n"
                                      ]
                         }
                     ],
        "formula_ids":  [
                            "kb_toan10_01_f1",
                            "kb_toan10_01_f2",
                            "kb_toan10_01_f3"
                        ],
        "prerequisites":  [

                          ],
        "related_topics":  [
                               "kb_toan10_02",
                               "kb_toan11_03"
                           ],
        "common_traps":  [
                             "Nháº§m giá»¯a quan há»‡ pháº§n tá»­ thuá»™c táº­p (thuá»™c) vÃ  táº­p con (chá»©a trong)",
                             "QuÃªn xÃ©t trÆ°á»ng há»£p mÃºt vuÃ´ng hay trÃ²n khi kiá»ƒm tra giao khÃ¡c rá»—ng"
                         ],
        "examples":  [
                         {
                             "title":  "VÃ­ dá»¥ 1: TÃ¬m m Ä‘á»ƒ giao hai táº­p há»£p khÃ¡c rá»—ng",
                             "question":  "Cho \\(A = [m; m+3]\\) vÃ  \\(B = (2; 6)\\). TÃ¬m táº¥t cáº£ giÃ¡ trá»‹ thá»±c cá»§a tham sá»‘ \\(m\\) Ä‘á»ƒ \\(A \\cap B \\ne \\emptyset\\).",
                             "solution_steps":  [
                                                    "BÆ°á»›c 1: XÃ¡c Ä‘á»‹nh Ä‘iá»u kiá»‡n hai khoáº£ng/Ä‘oáº¡n giao khÃ¡c rá»—ng: Ä‘áº§u mÃºt trÃ¡i cá»§a táº­p nÃ y pháº£i nhá» hÆ¡n Ä‘áº§u mÃºt pháº£i cá»§a táº­p kia.",
                                                    "BÆ°á»›c 2: Ta cÃ³ há»‡ báº¥t phÆ°Æ¡ng trÃ¬nh: \\(m \u003c 6\\) vÃ  \\(m + 3 \u003e 2\\).",
                                                    "BÆ°á»›c 3: Suy ra \\(-1 \u003c m \u003c 6\\). Do \\(A\\) lÃ  Ä‘oáº¡n nÃªn táº¡i cÃ¡c mÃºt: náº¿u \\(m=6\\) thÃ¬ \\(A=[6;9]\\), giao vá»›i \\(B\\) báº±ng rá»—ng. Váº­y \\(m \\in (-1; 6)\\)."
                                                ],
                             "takeaway":  "Sá»­ dá»¥ng trá»¥c sá»‘ Ä‘á»ƒ biá»ƒu diá»…n mÃºt: [a, b] vÃ  (c, d) giao nhau khi max(a, c) \u003c min(b, d)."
                         }
                     ],
        "applications":  "á»¨ng dá»¥ng trong viá»‡c thiáº¿t láº­p cÃ¢u lá»‡nh truy váº¥n cÆ¡ sá»Ÿ dá»¯ liá»‡u (SQL INTERSECT / UNION), kiá»ƒm tra Ä‘iá»u kiá»‡n kÃ­ch hoáº¡t trong há»‡ thá»‘ng nhÃºng vÃ  biá»ƒu diá»…n khÃ´ng gian máº«u xÃ¡c suáº¥t.",
        "drill_tags":  [
                           "Táº­p há»£p",
                           "Má»‡nh Ä‘á»",
                           "Logic"
                       ],
        "related_question_ids":  [
                                     "q_tsa_06",
                                     "q_hsa_03",
                                     "q_tsa_36"
                                 ]
    },
    {
        "id":  "kb_toan10_02",
        "grade":  "ToÃ¡n 10",
        "chapter":  "ChÆ°Æ¡ng 2: Báº¥t phÆ°Æ¡ng trÃ¬nh \u0026 Báº¥t Ä‘áº³ng thá»©c",
        "title":  "Báº¥t phÆ°Æ¡ng trÃ¬nh, Quy hoáº¡ch tuyáº¿n tÃ­nh \u0026 Báº¥t Ä‘áº³ng thá»©c AM-GM, Cauchy-Schwarz",
        "overview":  "PhÆ°Æ¡ng phÃ¡p biá»ƒu diá»…n miá»n nghiá»‡m Ä‘a giÃ¡c, tÃ¬m cá»±c trá»‹ hÃ m má»¥c tiÃªu tuyáº¿n tÃ­nh vÃ  ká»¹ thuáº­t chá»©ng minh báº¥t Ä‘áº³ng thá»©c thá»±c chiáº¿n.",
        "theory_markdown":  "### 1. Báº¥t phÆ°Æ¡ng trÃ¬nh báº­c nháº¥t hai áº©n \u0026 Quy hoáº¡ch tuyáº¿n tÃ­nh\nDáº¡ng tá»•ng quÃ¡t: \\(ax + by + c \\le 0\\) (vá»›i \\(a^2 + b^2 \u003e 0\\)).\n- Miá»n nghiá»‡m lÃ  má»™t ná»­a máº·t pháº³ng ká»ƒ cáº£ bá» lÃ  Ä‘Æ°á»ng tháº³ng \\(d: ax + by + c = 0\\).\n- **Äá»‹nh lÃ½ tá»‘i Æ°u trÃªn miá»n Ä‘a giÃ¡c**: Cho hÃ m má»¥c tiÃªu \\(F(x, y) = ax + by\\). Náº¿u miá»n nghiá»‡m cá»§a há»‡ báº¥t phÆ°Æ¡ng trÃ¬nh lÃ  má»™t Ä‘a giÃ¡c lá»“i \\(A_1A_2\\dots A_n\\), thÃ¬ giÃ¡ trá»‹ lá»›n nháº¥t vÃ  giÃ¡ trá»‹ nhá» nháº¥t cá»§a \\(F(x, y)\\) luÃ´n Ä‘áº¡t táº¡i má»™t trong cÃ¡c Ä‘á»‰nh cá»§a Ä‘a giÃ¡c.\n\n### 2. Báº¥t Ä‘áº³ng thá»©c AM-GM (Cauchy)\nCho cÃ¡c sá»‘ thá»±c khÃ´ng Ã¢m \\(a_1, a_2, \\dots, a_n \\ge 0\\):\n\\[\\frac{a_1 + a_2 + \\dots + a_n}{n} \\ge \\sqrt[n]{a_1 a_2 \\dots a_n}\\]\nDáº¥u báº±ng xáº£y ra khi vÃ  chá»‰ khi \\(a_1 = a_2 = \\dots = a_n\\).\n\n### 3. Báº¥t Ä‘áº³ng thá»©c Cauchy-Schwarz (Bunhiacopxki) \u0026 Ká»¹ thuáº­t Engel\nCho hai dÃ£y sá»‘ thá»±c \\((a_1, \\dots, a_n)\\) vÃ  \\((b_1, \\dots, b_n)\\):\n\\[(a_1 b_1 + \\dots + a_n b_n)^2 \\le (a_1^2 + \\dots + a_n^2)(b_1^2 + \\dots + b_n^2)\\]\n- **Dáº¡ng phÃ¢n thá»©c Engel (Svac-xÆ¡)** vá»›i \\(x_i \u003e 0\\):\n\\[\\frac{a_1^2}{x_1} + \\frac{a_2^2}{x_2} + \\dots + \\frac{a_n^2}{x_n} \\ge \\frac{(a_1 + a_2 + \\dots + a_n)^2}{x_1 + x_2 + \\dots + x_n}\\]",
        "formulas":  [
                         {
                             "id":  "kb_toan10_02_f1",
                             "name":  "HÃ m má»¥c tiÃªu tuyáº¿n tÃ­nh",
                             "latex":  "F(x, y) = ax + by + c \\implies \\max F = \\max_{i=1}^n \\{F(A_i)\\}",
                             "desc":  "Cá»±c trá»‹ tuyáº¿n tÃ­nh trÃªn miá»n Ä‘a giÃ¡c luÃ´n Ä‘áº¡t táº¡i má»™t trong cÃ¡c Ä‘á»‰nh",
                             "tags":  [
                                          "Quy hoáº¡ch tuyáº¿n tÃ­nh",
                                          "Äá»‰nh Ä‘a giÃ¡c"
                                      ]
                         },
                         {
                             "id":  "kb_toan10_02_f2",
                             "name":  "Báº¥t Ä‘áº³ng thá»©c AM-GM (Cauchy) 2 sá»‘ \u0026 3 sá»‘",
                             "latex":  "a + b \\ge 2\\sqrt{ab} \\; (a, b \\ge 0), \\quad a + b + c \\ge 3\\sqrt[3]{abc} \\; (a, b, c \\ge 0) \\quad (\\text{Dáº¥u \u0027=\u0027 } \\iff a = b = c)",
                             "desc":  "Báº¥t Ä‘áº³ng thá»©c giá»¯a trung bÃ¬nh cá»™ng vÃ  trung bÃ¬nh nhÃ¢n cho cÃ¡c sá»‘ thá»±c khÃ´ng Ã¢m",
                             "tags":  [
                                          "Báº¥t Ä‘áº³ng thá»©c",
                                          "AM-GM",
                                          "Cauchy"
                                      ]
                         },
                         {
                             "id":  "kb_toan10_02_f3",
                             "name":  "Báº¥t Ä‘áº³ng thá»©c Cauchy-Schwarz (Bunhiacopxki) \u0026 Dáº¡ng Engel",
                             "latex":  "(ax + by)^2 \\le (a^2 + b^2)(x^2 + y^2), \\quad \\frac{a^2}{x} + \\frac{b^2}{y} \\ge \\frac{(a+b)^2}{x+y} \\; (x, y \u003e 0)",
                             "desc":  "Báº¥t Ä‘áº³ng thá»©c tÃ­ch vÃ´ hÆ°á»›ng vÃ  ká»¹ thuáº­t cá»™ng máº«u sá»‘ Engel (Svac-xÆ¡)",
                             "tags":  [
                                          "Báº¥t Ä‘áº³ng thá»©c",
                                          "Bunhiacopxki",
                                          "Cauchy-Schwarz"
                                      ]
                         }
                     ],
        "formula_ids":  [
                            "kb_toan10_02_f1",
                            "kb_toan10_02_f2",
                            "kb_toan10_02_f3"
                        ],
        "prerequisites":  [
                              "kb_toan10_01"
                          ],
        "related_topics":  [
                               "kb_toan10_03",
                               "kb_toan11_01"
                           ],
        "common_traps":  [
                             "Ãp dá»¥ng báº¥t Ä‘áº³ng thá»©c AM-GM khi cÃ¡c biáº¿n chÆ°a Ä‘Æ°á»£c chá»©ng minh lÃ  sá»‘ khÃ´ng Ã¢m",
                             "QuÃªn kiá»ƒm tra Ä‘iá»u kiá»‡n dáº¥u báº±ng xáº£y ra trong bÃ i toÃ¡n tÃ¬m cá»±c trá»‹",
                             "Chá»n sai Ä‘á»‰nh khi giáº£i quy hoáº¡ch tuyáº¿n tÃ­nh trÃªn miá»n khÃ´ng bá»‹ cháº·n"
                         ],
        "examples":  [
                         {
                             "title":  "VÃ­ dá»¥ 1: Tá»‘i Æ°u hÃ³a chi phÃ­ sáº£n xuáº¥t",
                             "question":  "Má»™t phÃ¢n xÆ°á»Ÿng sáº£n xuáº¥t 2 loáº¡i sáº£n pháº©m A vÃ  B. Lá»£i nhuáº­n má»—i táº¥n A lÃ  4 triá»‡u, má»—i táº¥n B lÃ  3 triá»‡u. Miá»n rÃ ng buá»™c nguyÃªn liá»‡u táº¡o thÃ nh tá»© giÃ¡c cÃ³ tá»a Ä‘á»™ 4 Ä‘á»‰nh \\(O(0,0), P(0,4), Q(3,2), R(4,0)\\). TÃ¬m lá»£i nhuáº­n tá»‘i Ä‘a.",
                             "solution_steps":  [
                                                    "BÆ°á»›c 1: HÃ m má»¥c tiÃªu: \\(L(x, y) = 4x + 3y\\).",
                                                    "BÆ°á»›c 2: TÃ­nh giÃ¡ trá»‹ táº¡i 4 Ä‘á»‰nh: \\(L(O) = 0\\), \\(L(P) = 4(0) + 3(4) = 12\\), \\(L(Q) = 4(3) + 3(2) = 18\\), \\(L(R) = 4(4) + 3(0) = 16\\).",
                                                    "BÆ°á»›c 3: So sÃ¡nh: \\(\\max L = 18\\) triá»‡u Ä‘á»“ng, Ä‘áº¡t táº¡i \\(Q(3, 2)\\)."
                                                ],
                             "takeaway":  "Chá»‰ cáº§n tÃ­nh giÃ¡ trá»‹ hÃ m má»¥c tiÃªu táº¡i cÃ¡c Ä‘á»‰nh, khÃ´ng cáº§n xÃ©t cÃ¡c Ä‘iá»ƒm trong."
                         }
                     ],
        "applications":  "MÃ´ hÃ¬nh quy hoáº¡ch tuyáº¿n tÃ­nh á»©ng dá»¥ng trong logistic, láº­p káº¿ hoáº¡ch ngÃ¢n sÃ¡ch quáº£ng cÃ¡o Ä‘a kÃªnh, phá»‘i trá»™n thá»©c Äƒn chÄƒn nuÃ´i vÃ  tá»‘i Æ°u hÃ³a nÄƒng lá»±c mÃ¡y mÃ³c.",
        "drill_tags":  [
                           "Quy hoáº¡ch tuyáº¿n tÃ­nh",
                           "Há»‡ BPT",
                           "Tá»‘i Æ°u hÃ³a",
                           "Báº¥t Ä‘áº³ng thá»©c"
                       ],
        "related_question_ids":  [
                                     "q_tsa_09",
                                     "q_tsa_22",
                                     "q_hsa_18"
                                 ]
    },
    {
        "id":  "kb_toan10_03",
        "grade":  "ToÃ¡n 10",
        "chapter":  "ChÆ°Æ¡ng 3: HÃ m sá»‘ báº­c hai \u0026 Tam thá»©c báº­c hai",
        "title":  "HÃ m sá»‘ báº­c hai, Äá»‹nh lÃ½ dáº¥u Tam thá»©c \u0026 á»¨ng dá»¥ng Parabol",
        "overview":  "Kháº£o sÃ¡t Ä‘á»“ thá»‹ parabol, tá»a Ä‘á»™ Ä‘á»‰nh, Ä‘á»‹nh lÃ½ dáº¥u tam thá»©c báº­c hai, Ä‘á»‹nh lÃ½ ViÃ¨te vÃ  mÃ´ hÃ¬nh quá»¹ Ä‘áº¡o parabol.",
        "theory_markdown":  "### 1. HÃ m sá»‘ báº­c hai \u0026 Äá»“ thá»‹ Parabol\nDáº¡ng tá»•ng quÃ¡t: \\(y = ax^2 + bx + c\\) (\\(a \\ne 0\\)).\n- Äá»‰nh \\(I\\left(-\\frac{b}{2a}; -\\frac{\\Delta}{4a}\\right)\\).\n- Trá»¥c Ä‘á»‘i xá»©ng: \\(x = -\\frac{b}{2a}\\).\n- Náº¿u \\(a \u003e 0\\): bá» lÃµm hÆ°á»›ng lÃªn trÃªn, hÃ m sá»‘ Ä‘áº¡t GTNN táº¡i \\(x = -\\frac{b}{2a}\\).\n- Náº¿u \\(a \u003c 0\\): bá» lÃµm hÆ°á»›ng xuá»‘ng dÆ°á»›i, hÃ m sá»‘ Ä‘áº¡t GTLN táº¡i \\(x = -\\frac{b}{2a}\\).\n\n### 2. Äá»‹nh lÃ½ dáº¥u Tam thá»©c báº­c hai\nCho \\(f(x) = ax^2 + bx + c\\) (\\(a \\ne 0\\)), biá»‡t thá»©c \\(\\Delta = b^2 - 4ac\\):\n- Náº¿u \\(\\Delta \u003c 0\\): \\(f(x)\\) cÃ¹ng dáº¥u vá»›i há»‡ sá»‘ \\(a\\) vá»›i má»i \\(x \\in \\mathbb{R}\\).\n- Náº¿u \\(\\Delta = 0\\): \\(f(x)\\) cÃ¹ng dáº¥u vá»›i \\(a\\) vá»›i má»i \\(x \\ne -\\frac{b}{2a}\\).\n- Náº¿u \\(\\Delta \u003e 0\\): \\(f(x)\\) cÃ³ hai nghiá»‡m phÃ¢n biá»‡t \\(x_1 \u003c x_2\\). Trong khoáº£ng hai nghiá»‡m \\((x_1; x_2)\\) thÃ¬ \\(f(x)\\) trÃ¡i dáº¥u vá»›i \\(a\\); ngoÃ i khoáº£ng hai nghiá»‡m thÃ¬ \\(f(x)\\) cÃ¹ng dáº¥u vá»›i \\(a\\) *(Trong trÃ¡i - NgoÃ i cÃ¹ng)*.",
        "formulas":  [
                         {
                             "id":  "kb_toan10_03_f1",
                             "name":  "Tá»a Ä‘á»™ Ä‘á»‰nh Parabol",
                             "latex":  "x_I = -\\frac{b}{2a}, \\quad y_I = f(x_I) = -\\frac{\\Delta}{4a}",
                             "desc":  "Äiá»ƒm cá»±c trá»‹ tuyá»‡t Ä‘á»‘i cá»§a tam thá»©c báº­c hai",
                             "tags":  [
                                          "Parabol",
                                          "Cá»±c trá»‹"
                                      ]
                         },
                         {
                             "id":  "kb_toan10_03_f2",
                             "name":  "Äá»‹nh lÃ½ ViÃ¨te báº­c hai",
                             "latex":  "x_1 + x_2 = -\\frac{b}{a}, \\quad x_1 x_2 = \\frac{c}{a}",
                             "desc":  "Má»‘i liÃªn há»‡ giá»¯a nghiá»‡m vÃ  há»‡ sá»‘ cá»§a phÆ°Æ¡ng trÃ¬nh báº­c hai",
                             "tags":  [
                                          "ViÃ¨te",
                                          "Nghiá»‡m"
                                      ]
                         },
                         {
                             "id":  "kb_toan10_03_f3",
                             "name":  "Äá»‹nh lÃ½ dáº¥u tam thá»©c báº­c hai \u0026 Äiá»u kiá»‡n khÃ´ng Ä‘á»•i dáº¥u",
                             "latex":  "f(x) = ax^2 + bx + c \u003e 0, \\forall x \\in \\mathbb{R} \\iff \\begin{cases} a \u003e 0 \\\\ \\Delta \u003c 0 \\end{cases}; \\quad f(x) \\ge 0, \\forall x \\in \\mathbb{R} \\iff \\begin{cases} a \u003e 0 \\\\ \\Delta \\le 0 \\end{cases}",
                             "desc":  "Äiá»u kiá»‡n cáº§n vÃ  Ä‘á»§ Ä‘á»ƒ tam thá»©c báº­c hai giá»¯ nguyÃªn dáº¥u dÆ°Æ¡ng trÃªn toÃ n trá»¥c sá»‘",
                             "tags":  [
                                          "HÃ m sá»‘",
                                          "Tam thá»©c báº­c hai",
                                          "Biá»‡n luáº­n"
                                      ]
                         }
                     ],
        "formula_ids":  [
                            "kb_toan10_03_f1",
                            "kb_toan10_03_f2",
                            "kb_toan10_03_f3"
                        ],
        "prerequisites":  [
                              "kb_toan10_01"
                          ],
        "related_topics":  [
                               "kb_toan11_02",
                               "kb_toan12_04"
                           ],
        "common_traps":  [
                             "QuÃªn xÃ©t trÆ°á»ng há»£p há»‡ sá»‘ a = 0 khi Ä‘á» bÃ i cho tham sá»‘ á»Ÿ há»‡ sá»‘ báº­c 2",
                             "Nháº§m láº«n giá»¯a Delta \u003c 0 vÃ  Delta \u003c= 0 khi báº¥t phÆ°Æ¡ng trÃ¬nh cÃ³ dáº¥u báº±ng"
                         ],
        "examples":  [
                         {
                             "title":  "VÃ­ dá»¥ 1: Quá»¹ Ä‘áº¡o báº¯n cá»•ng parabol",
                             "question":  "Cá»•ng vÃ²m trÆ°á»ng Ä‘áº¡i há»c cÃ³ dáº¡ng Parabol \\(y = -0,5x^2 + 4x\\) (Ä‘Æ¡n vá»‹ mÃ©t). TÃ¬m chiá»u cao lá»›n nháº¥t cá»§a cá»•ng vÃ²m vÃ  khoáº£ng cÃ¡ch giá»¯a hai chÃ¢n cá»•ng.",
                             "solution_steps":  [
                                                    "BÆ°á»›c 1: ChÃ¢n cá»•ng lÃ  giao Ä‘iá»ƒm vá»›i máº·t Ä‘áº¥t \\(y = 0\\): \\(-0,5x^2 + 4x = 0 \\iff x(-0,5x + 4) = 0 \\implies x_1 = 0, x_2 = 8\\). Chiá»u rá»™ng 2 chÃ¢n lÃ  8 mÃ©t.",
                                                    "BÆ°á»›c 2: Trá»¥c Ä‘á»‘i xá»©ng náº±m á»Ÿ trung Ä‘iá»ƒm: \\(x = 4\\).",
                                                    "BÆ°á»›c 3: Chiá»u cao cá»±c Ä‘áº¡i: \\(y(4) = -0,5(16) + 4(4) = -8 + 16 = 8\\text{ m}\\)."
                                                ],
                             "takeaway":  "Táº­n dá»¥ng tÃ­nh cháº¥t Ä‘á»‘i xá»©ng cá»§a Parabol Ä‘á»ƒ tÃ¬m nhanh trung Ä‘iá»ƒm vÃ  Ä‘á»‰nh."
                         }
                     ],
        "applications":  "Thiáº¿t káº¿ cáº§u treo dÃ¢y vÃµng (Golden Gate), Ä‘Ã¨n pha Ã´ tÃ´ gÆ°Æ¡ng cáº§u Parabol táº­p trung chÃ¹m tia song song, anten cháº£o vá»‡ tinh viá»…n thÃ´ng.",
        "drill_tags":  [
                           "HÃ m sá»‘ báº­c hai",
                           "Parabol",
                           "Quá»¹ Ä‘áº¡o",
                           "Tam thá»©c"
                       ],
        "related_question_ids":  [
                                     "q_tsa_02",
                                     "q_hsa_04",
                                     "q_tsa_24"
                                 ]
    },
    {
        "id":  "kb_toan10_04",
        "grade":  "ToÃ¡n 10",
        "chapter":  "ChÆ°Æ¡ng 4: Há»‡ thá»©c lÆ°á»£ng \u0026 VectÆ¡",
        "title":  "Há»‡ thá»©c lÆ°á»£ng trong tam giÃ¡c, VectÆ¡ vÃ  CÃ´ng thá»©c Shoelace",
        "overview":  "Bá»™ cÃ´ng cá»¥ Ä‘á»‹nh lÃ½ Cosin, Sin, 5 cÃ´ng thá»©c tÃ­nh diá»‡n tÃ­ch tam giÃ¡c, cÃ´ng thá»©c trung tuyáº¿n, phÃ¢n giÃ¡c vÃ  tÃ­ch vÃ´ hÆ°á»›ng vectÆ¡.",
        "theory_markdown":  "### 1. CÃ¡c Ä‘á»‹nh lÃ½ cá»‘t lÃµi trong tam giÃ¡c\n- **Äá»‹nh lÃ½ Cosin**: \\(a^2 = b^2 + c^2 - 2bc\\cos A \\implies \\cos A = \\frac{b^2 + c^2 - a^2}{2bc}\\).\n- **Äá»‹nh lÃ½ Sin**: \\(\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R\\).\n- **ÄÆ°á»ng trung tuyáº¿n**: \\(m_a^2 = \\frac{2(b^2 + c^2) - a^2}{4}\\).\n- **ÄÆ°á»ng phÃ¢n giÃ¡c trong**: \\(l_a = \\frac{2bc\\cos(A/2)}{b + c}\\).\n\n### 2. Bá»™ 5 CÃ´ng thá»©c tÃ­nh Diá»‡n tÃ­ch tam giÃ¡c toÃ n diá»‡n\n- \\(S = \\frac{1}{2} a h_a\\) (chiá»u cao)\n- \\(S = \\frac{1}{2} ab \\sin C\\) (hai cáº¡nh vÃ  gÃ³c xen giá»¯a)\n- \\(S = \\frac{abc}{4R}\\) (bÃ¡n kÃ­nh Ä‘Æ°á»ng trÃ²n ngoáº¡i tiáº¿p R)\n- \\(S = pr\\) (ná»­a chu vi \\(p = \\frac{a+b+c}{2}\\) vÃ  bÃ¡n kÃ­nh ná»™i tiáº¿p r)\n- \\(S = \\sqrt{p(p-a)(p-b)(p-c)}\\) (CÃ´ng thá»©c Heron)\n\n### 3. TÃ­ch vÃ´ hÆ°á»›ng cá»§a hai vectÆ¡\n- Äá»‹nh nghÄ©a: \\(\\vec{u} \\cdot \\vec{v} = |\\vec{u}| |\\vec{v}| \\cos(\\vec{u}, \\vec{v})\\).\n- Biá»ƒu thá»©c tá»a Ä‘á»™: \\(\\vec{u} = (x_1, y_1), \\vec{v} = (x_2, y_2) \\implies \\vec{u} \\cdot \\vec{v} = x_1x_2 + y_1y_2\\).\n- Äiá»u kiá»‡n vuÃ´ng gÃ³c: \\(\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0 \\iff x_1x_2 + y_1y_2 = 0\\).",
        "formulas":  [
                         {
                             "id":  "kb_toan10_04_f1",
                             "name":  "CÃ´ng thá»©c Shoelace (DÃ¢y giÃ y)",
                             "latex":  "S = \\frac{1}{2} |(x_A y_B + x_B y_C + x_C y_A) - (y_A x_B + y_B x_C + y_C x_A)|",
                             "desc":  "TÃ­nh diá»‡n tÃ­ch Ä‘a giÃ¡c khi biáº¿t tá»a Ä‘á»™ cÃ¡c Ä‘á»‰nh trong máº·t pháº³ng",
                             "tags":  [
                                          "Shoelace",
                                          "Tá»a Ä‘á»™ pháº³ng",
                                          "Diá»‡n tÃ­ch"
                                      ]
                         },
                         {
                             "id":  "kb_toan10_04_f2",
                             "name":  "Äá»™ dÃ i Ä‘Æ°á»ng trung tuyáº¿n",
                             "latex":  "m_a^2 = \\frac{2(b^2 + c^2) - a^2}{4}",
                             "desc":  "TÃ­nh Ä‘á»™ dÃ i trung tuyáº¿n á»©ng vá»›i cáº¡nh a cá»§a tam giÃ¡c ABC",
                             "tags":  [
                                          "Trung tuyáº¿n",
                                          "HÃ¬nh há»c"
                                      ]
                         },
                         {
                             "id":  "kb_toan10_04_f3",
                             "name":  "Äá»‹nh lÃ½ hÃ m sá»‘ Cosin \u0026 Há»‡ quáº£ gÃ³c",
                             "latex":  "a^2 = b^2 + c^2 - 2bc\\cos A, \\quad \\cos A = \\frac{b^2 + c^2 - a^2}{2bc}",
                             "desc":  "TÃ­nh cáº¡nh vÃ  gÃ³c trong tam giÃ¡c tá»•ng quÃ¡t khi biáº¿t hai cáº¡nh vÃ  gÃ³c xen giá»¯a",
                             "tags":  [
                                          "Há»‡ thá»©c lÆ°á»£ng",
                                          "Äá»‹nh lÃ½ Cosin"
                                      ]
                         },
                         {
                             "id":  "kb_toan10_04_f4",
                             "name":  "Äá»‹nh lÃ½ hÃ m sá»‘ Sin \u0026 BÃ¡n kÃ­nh Ä‘Æ°á»ng trÃ²n ngoáº¡i tiáº¿p",
                             "latex":  "\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R",
                             "desc":  "Má»‘i liÃªn há»‡ giá»¯a cáº¡nh, gÃ³c Ä‘á»‘i diá»‡n vÃ  bÃ¡n kÃ­nh Ä‘Æ°á»ng trÃ²n ngoáº¡i tiáº¿p R",
                             "tags":  [
                                          "Há»‡ thá»©c lÆ°á»£ng",
                                          "Äá»‹nh lÃ½ Sin",
                                          "BÃ¡n kÃ­nh ngoáº¡i tiáº¿p"
                                      ]
                         },
                         {
                             "id":  "kb_toan10_04_f5",
                             "name":  "5 CÃ´ng thá»©c tÃ­nh diá»‡n tÃ­ch tam giÃ¡c toÃ n diá»‡n",
                             "latex":  "S = \\frac{1}{2}a h_a = \\frac{1}{2}ab\\sin C = \\frac{abc}{4R} = pr = \\sqrt{p(p-a)(p-b)(p-c)} \\quad \\left(p = \\frac{a+b+c}{2}\\right)",
                             "desc":  "Bá»™ 5 cÃ´ng thá»©c diá»‡n tÃ­ch tam giÃ¡c chuáº©n: chiá»u cao, gÃ³c xen giá»¯a, bÃ¡n kÃ­nh R, bÃ¡n kÃ­nh r vÃ  Heron",
                             "tags":  [
                                          "HÃ¬nh há»c",
                                          "Diá»‡n tÃ­ch",
                                          "Heron"
                                      ]
                         },
                         {
                             "id":  "kb_toan10_04_f6",
                             "name":  "TÃ­ch vÃ´ hÆ°á»›ng hai vectÆ¡ \u0026 CÃ´ng thá»©c gÃ³c",
                             "latex":  "\\vec{u} \\cdot \\vec{v} = |\\vec{u}| |\\vec{v}| \\cos(\\vec{u}, \\vec{v}) = x_1 x_2 + y_1 y_2, \\quad \\vec{u} \\perp \\vec{v} \\iff x_1 x_2 + y_1 y_2 = 0",
                             "desc":  "Äá»‹nh nghÄ©a hÃ¬nh há»c vÃ  tá»a Ä‘á»™ cá»§a tÃ­ch vÃ´ hÆ°á»›ng, Ä‘iá»u kiá»‡n hai vectÆ¡ vuÃ´ng gÃ³c",
                             "tags":  [
                                          "VectÆ¡",
                                          "TÃ­ch vÃ´ hÆ°á»›ng"
                                      ]
                         }
                     ],
        "formula_ids":  [
                            "kb_toan10_04_f1",
                            "kb_toan10_04_f2",
                            "kb_toan10_04_f3",
                            "kb_toan10_04_f4",
                            "kb_toan10_04_f5",
                            "kb_toan10_04_f6"
                        ],
        "prerequisites":  [
                              "kb_toan10_01"
                          ],
        "related_topics":  [
                               "kb_toan11_01"
                           ],
        "common_traps":  [
                             "Nháº§m láº«n dáº¥u trá»« trong Ä‘á»‹nh lÃ½ Cosin thÃ nh dáº¥u cá»™ng (a^2 = b^2 + c^2 - 2bc cos A)",
                             "QuÃªn chia 2 trong cÃ´ng thá»©c tÃ­nh bÃ¡n kÃ­nh Ä‘Æ°á»ng trÃ²n ngoáº¡i tiáº¿p R (a / sin A = 2R chá»© khÃ´ng pháº£i R)"
                         ],
        "examples":  [
                         {
                             "title":  "VÃ­ dá»¥ 1: TÃ­nh diá»‡n tÃ­ch tam giÃ¡c qua Shoelace",
                             "question":  "Trong máº·t pháº³ng tá»a Ä‘á»™ Oxy, cho tam giÃ¡c ABC vá»›i \\(A(1, 2), B(4, 6), C(7, 1)\\). TÃ­nh diá»‡n tÃ­ch tam giÃ¡c ABC.",
                             "solution_steps":  [
                                                    "BÆ°á»›c 1: Ãp dá»¥ng Ä‘á»‹nh thá»©c DÃ¢y giÃ y Shoelace:",
                                                    "BÆ°á»›c 2: Cá»™t x: (1, 4, 7, 1), Cá»™t y: (2, 6, 1, 2).",
                                                    "BÆ°á»›c 3: Tá»•ng tÃ­ch xuÃ´i: \\(1(6) + 4(1) + 7(2) = 6 + 4 + 14 = 24\\).",
                                                    "BÆ°á»›c 4: Tá»•ng tÃ­ch ngÆ°á»£c: \\(2(4) + 6(7) + 1(1) = 8 + 42 + 1 = 51\\).",
                                                    "BÆ°á»›c 5: \\(S = \\frac{1}{2} |24 - 51| = \\frac{27}{2} = 13,5\\)."
                                                ],
                             "takeaway":  "CÃ´ng thá»©c Shoelace giÃºp giáº£i bÃ i toÃ¡n diá»‡n tÃ­ch siÃªu tá»‘c trong Ä‘á» thi TSA/HSA mÃ  khÃ´ng cáº§n láº­p phÆ°Æ¡ng trÃ¬nh cáº¡nh hay Ä‘Æ°á»ng cao."
                         }
                     ],
        "applications":  "Äo Ä‘áº¡c tráº¯c Ä‘á»‹a GPS, Ä‘á»“ há»a mÃ¡y tÃ­nh 2D/3D (Rasterization polygon), phÃ¢n tÃ­ch lá»±c cÃ¢n báº±ng trong káº¿t cáº¥u cÆ¡ há»c cáº§u Ä‘Æ°á»ng.",
        "drill_tags":  [
                           "Há»‡ thá»©c lÆ°á»£ng",
                           "VectÆ¡",
                           "Shoelace",
                           "Diá»‡n tÃ­ch"
                       ],
        "related_question_ids":  [
                                     "q_tsa_04",
                                     "q_hsa_07",
                                     "q_tsa_25"
                                 ]
    },
    {
        "id":  "kb_toan10_05",
        "grade":  "ToÃ¡n 10",
        "chapter":  "ChÆ°Æ¡ng 5: Thá»‘ng kÃª \u0026 XÃ¡c suáº¥t cá»• Ä‘iá»ƒn",
        "title":  "Thá»‘ng kÃª mÃ´ táº£ \u0026 XÃ¡c suáº¥t cá»• Ä‘iá»ƒn",
        "overview":  "Äáº¡i lÆ°á»£ng Ä‘o xu tháº¿ trung tÃ¢m, Ä‘o Ä‘á»™ phÃ¢n tÃ¡n, tiÃªu chuáº©n nháº­n diá»‡n giÃ¡ trá»‹ ngoáº¡i lá»‡ vÃ  quy táº¯c xÃ¡c suáº¥t Laplace.",
        "theory_markdown":  "### 1. Sá»‘ Ä‘áº·c trÆ°ng Ä‘o xu tháº¿ trung tÃ¢m\n- **Sá»‘ trung bÃ¬nh**: \\(\\bar{x} = \\frac{1}{n}\\sum_{i=1}^k n_i x_i\\).\n- **Trung vá»‹ (Median)**: GiÃ¡ trá»‹ chia máº«u sá»‘ liá»‡u Ä‘Ã£ sáº¯p xáº¿p thÃ nh hai pháº§n báº±ng nhau.\n- **Tá»© phÃ¢n vá»‹**: \\(Q_1, Q_2 (=M_e), Q_3\\). Khoáº£ng tá»© phÃ¢n vá»‹: \\(\\Delta_Q = Q_3 - Q_1\\).\n- **Nháº­n diá»‡n giÃ¡ trá»‹ ngoáº¡i lá»‡**: GiÃ¡ trá»‹ \\(x\\) lÃ  ngoáº¡i lá»‡ náº¿u \\(x \u003c Q_1 - 1,5\\Delta_Q\\) hoáº·c \\(x \u003e Q_3 + 1,5\\Delta_Q\\).\n\n### 2. Sá»‘ Ä‘áº·c trÆ°ng Ä‘o má»©c Ä‘á»™ phÃ¢n tÃ¡n\n- **PhÆ°Æ¡ng sai**: \\(s^2 = \\frac{1}{n}\\sum (x_i - \\bar{x})^2 = \\frac{1}{n}\\sum x_i^2 - (\\bar{x})^2\\).\n- **Äá»™ lá»‡ch chuáº©n**: \\(s = \\sqrt{s^2}\\). Äá»™ lá»‡ch chuáº©n cÃ ng nhá» thÃ¬ dá»¯ liá»‡u cÃ ng Ä‘á»“ng Ä‘á»u vÃ  á»•n Ä‘á»‹nh.",
        "formulas":  [
                         {
                             "id":  "kb_toan10_05_f1",
                             "name":  "CÃ´ng thá»©c tÃ­nh nhanh phÆ°Æ¡ng sai",
                             "latex":  "s^2 = \\overline{x^2} - (\\bar{x})^2",
                             "desc":  "PhÆ°Æ¡ng sai báº±ng trung bÃ¬nh bÃ¬nh phÆ°Æ¡ng trá»« bÃ¬nh phÆ°Æ¡ng trung bÃ¬nh",
                             "tags":  [
                                          "Thá»‘ng kÃª",
                                          "PhÆ°Æ¡ng sai"
                                      ]
                         },
                         {
                             "id":  "kb_toan10_05_f2",
                             "name":  "XÃ¡c suáº¥t cá»• Ä‘iá»ƒn Laplace",
                             "latex":  "P(A) = \\frac{n(A)}{n(\\Omega)} = \\frac{|A|}{|\\Omega|}",
                             "desc":  "XÃ¡c suáº¥t biáº¿n cá»‘ trong khÃ´ng gian máº«u Ä‘á»“ng kháº£ nÄƒng",
                             "tags":  [
                                          "XÃ¡c suáº¥t",
                                          "Tá»• há»£p"
                                      ]
                         },
                         {
                             "id":  "kb_toan10_05_f3",
                             "name":  "Khoáº£ng biáº¿n thiÃªn \u0026 Khoáº£ng tá»© phÃ¢n vá»‹ (IQR)",
                             "latex":  "R = x_{\\max} - x_{\\min}, \\quad \\Delta_Q = Q_3 - Q_1 \\quad (\\text{Ngoáº¡i lá»‡: } x \u003c Q_1 - 1,5\\Delta_Q \\lor x \u003e Q_3 + 1,5\\Delta_Q)",
                             "desc":  "Äo Ä‘á»™ phÃ¢n tÃ¡n cá»§a máº«u sá»‘ liá»‡u vÃ  tiÃªu chuáº©n nháº­n diá»‡n giÃ¡ trá»‹ ngoáº¡i lá»‡",
                             "tags":  [
                                          "Thá»‘ng kÃª",
                                          "Tá»© phÃ¢n vá»‹",
                                          "Ngoáº¡i lá»‡"
                                      ]
                         }
                     ],
        "formula_ids":  [
                            "kb_toan10_05_f1",
                            "kb_toan10_05_f2",
                            "kb_toan10_05_f3"
                        ],
        "prerequisites":  [
                              "kb_toan10_01"
                          ],
        "related_topics":  [

                           ],
        "common_traps":  [
                             "QuÃªn sáº¯p xáº¿p máº«u sá»‘ liá»‡u theo thá»© tá»± khÃ´ng giáº£m trÆ°á»›c khi tÃ¬m trung vá»‹ vÃ  cÃ¡c tá»© phÃ¢n vá»‹",
                             "Nháº§m láº«n khoáº£ng biáº¿n thiÃªn R vá»›i khoáº£ng tá»© phÃ¢n vá»‹ IQR"
                         ],
        "examples":  [
                         {
                             "title":  "VÃ­ dá»¥ 1: So sÃ¡nh Ä‘á»™ á»•n Ä‘á»‹nh cá»§a hai dÃ¢y chuyá»n",
                             "question":  "DÃ¢y chuyá»n 1 cÃ³ Ä‘á»™ lá»‡ch chuáº©n khá»‘i lÆ°á»£ng sáº£n pháº©m \\(s_1 = 0,15\\text{ g}\\), dÃ¢y chuyá»n 2 cÃ³ \\(s_2 = 0,42\\text{ g}\\). DÃ¢y chuyá»n nÃ o hoáº¡t Ä‘á»™ng á»•n Ä‘á»‹nh vÃ  kiá»ƒm soÃ¡t cháº¥t lÆ°á»£ng tá»‘t hÆ¡n?",
                             "solution_steps":  [
                                                    "BÆ°á»›c 1: Hiá»ƒu Ã½ nghÄ©a Ä‘á»™ lá»‡ch chuáº©n: pháº£n Ã¡nh má»©c Ä‘á»™ biáº¿n Ä‘á»™ng/phÃ¢n tÃ¡n xung quanh khá»‘i lÆ°á»£ng chuáº©n.",
                                                    "BÆ°á»›c 2: VÃ¬ \\(s_1 \u003c s_2\\) (\\(0,15 \u003c 0,42\\)), sai sá»‘ cá»§a dÃ¢y chuyá»n 1 táº­p trung cháº·t cháº½ hÆ¡n quanh giÃ¡ trá»‹ trung bÃ¬nh.",
                                                    "BÆ°á»›c 3: Káº¿t luáº­n: DÃ¢y chuyá»n 1 á»•n Ä‘á»‹nh hÆ¡n dÃ¢y chuyá»n 2."
                                                ],
                             "takeaway":  "Äá» thi TSA/HSA thÆ°á»ng kiá»ƒm tra nÄƒng lá»±c hiá»ƒu báº£n cháº¥t sá»‘ Ä‘o phÃ¢n tÃ¡n chá»© khÃ´ng báº¯t báº¥m mÃ¡y sá»‘ phá»©c táº¡p."
                         }
                     ],
        "applications":  "ÄÃ¡nh giÃ¡ rá»§i ro danh má»¥c Ä‘áº§u tÆ° tÃ i chÃ­nh (Sharpe Ratio), kiá»ƒm Ä‘á»‹nh cháº¥t lÆ°á»£ng dÃ¢y chuyá»n sáº£n xuáº¥t Six Sigma, phÃ¢n tÃ­ch káº¿t quáº£ thá»­ nghiá»‡m lÃ¢m sÃ ng váº¯c-xin.",
        "drill_tags":  [
                           "Thá»‘ng kÃª",
                           "Äá»™ lá»‡ch chuáº©n",
                           "XÃ¡c suáº¥t"
                       ],
        "related_question_ids":  [
                                     "q_tsa_11",
                                     "q_hsa_10",
                                     "q_tsa_26"
                                 ]
    },
    {
        "id":  "kb_toan11_01",
        "grade":  "ToÃ¡n 11",
        "chapter":  "ChÆ°Æ¡ng 1: HÃ m sá»‘ \u0026 PhÆ°Æ¡ng trÃ¬nh lÆ°á»£ng giÃ¡c",
        "title":  "LÆ°á»£ng giÃ¡c toÃ n diá»‡n \u0026 Ká»¹ thuáº­t chuyá»ƒn Ä‘á»•i gÃ³c",
        "overview":  "Há»‡ thá»‘ng cÃ´ng thá»©c biáº¿n Ä‘á»•i lÆ°á»£ng giÃ¡c toÃ n táº­p, chu ká»³ hÃ m sá»‘, cung liÃªn káº¿t, ká»¹ thuáº­t gÃ³c chia Ä‘Ã´i vÃ  phÆ°Æ¡ng phÃ¡p giáº£i phÆ°Æ¡ng trÃ¬nh lÆ°á»£ng giÃ¡c thá»±c chiáº¿n.",
        "theory_markdown":  "### 1. Báº£ng giÃ¡ trá»‹ Ä‘áº·c biá»‡t vÃ  chu ká»³ tuáº§n hoÃ n\n- \\(y = \\sin x, y = \\cos x\\) cÃ³ táº­p xÃ¡c Ä‘á»‹nh \\(\\mathbb{R}\\), táº­p giÃ¡ trá»‹ \\([-1; 1]\\), chu ká»³ tuáº§n hoÃ n \\(T = 2\\pi\\).\n- \\(y = \\tan x\\) xÃ¡c Ä‘á»‹nh khi \\(x \\ne \\frac{\\pi}{2} + k\\pi\\), táº­p giÃ¡ trá»‹ \\(\\mathbb{R}\\), chu ká»³ tuáº§n hoÃ n \\(T = \\pi\\).\n- \\(y = \\cot x\\) xÃ¡c Ä‘á»‹nh khi \\(x \\ne k\\pi\\), táº­p giÃ¡ trá»‹ \\(\\mathbb{R}\\), chu ká»³ tuáº§n hoÃ n \\(T = \\pi\\).\n\n### 2. Há»‡ thá»©c lÆ°á»£ng giÃ¡c cÆ¡ báº£n \u0026 Cung liÃªn káº¿t\n- **Há»‡ thá»©c cÆ¡ báº£n**:\n  - \\(\\sin^2 x + \\cos^2 x = 1\\)\n  - \\(1 + \\tan^2 x = \\frac{1}{\\cos^2 x}\\) \\(\\left(x \\ne \\frac{\\pi}{2} + k\\pi\\right)\\)\n  - \\(1 + \\cot^2 x = \\frac{1}{\\sin^2 x}\\) \\((x \\ne k\\pi)\\)\n  - \\(\\tan x \\cdot \\cot x = 1\\)\n- **Cung liÃªn káº¿t** (Cos Ä‘á»‘i - Sin bÃ¹ - Phá»¥ chÃ©o - HÆ¡n kÃ©m \\(\\pi\\)):\n  - Cos Ä‘á»‘i: \\(\\cos(-x) = \\cos x\\); \\(\\sin(-x) = -\\sin x\\); \\(\\tan(-x) = -\\tan x\\).\n  - Sin bÃ¹: \\(\\sin(\\pi - x) = \\sin x\\); \\(\\cos(\\pi - x) = -\\cos x\\); \\(\\tan(\\pi - x) = -\\tan x\\).\n  - Phá»¥ chÃ©o: \\(\\sin\\left(\\frac{\\pi}{2} - x\\right) = \\cos x\\); \\(\\cos\\left(\\frac{\\pi}{2} - x\\right) = \\sin x\\); \\(\\tan\\left(\\frac{\\pi}{2} - x\\right) = \\cot x\\).\n  - HÆ¡n kÃ©m \\(\\pi\\): \\(\\tan(x + \\pi) = \\tan x\\); \\(\\sin(x + \\pi) = -\\sin x\\); \\(\\cos(x + \\pi) = -\\cos x\\).\n\n### 3. CÃ´ng thá»©c cá»™ng lÆ°á»£ng giÃ¡c (Addition Formulas)\n- \\(\\sin(a \\pm b) = \\sin a \\cos b \\pm \\cos a \\sin b\\).\n- \\(\\cos(a \\pm b) = \\cos a \\cos b \\mp \\sin a \\sin b\\) *(lÆ°u Ã½ dáº¥u nghá»‹ch chiá»u)*.\n- \\(\\tan(a \\pm b) = \\frac{\\tan a \\pm \\tan b}{1 \\mp \\tan a \\tan b}\\).\n\n### 4. CÃ´ng thá»©c nhÃ¢n Ä‘Ã´i, nhÃ¢n ba \u0026 Háº¡ báº­c\n- **NhÃ¢n Ä‘Ã´i**:\n  - \\(\\sin 2a = 2\\sin a \\cos a\\).\n  - \\(\\cos 2a = \\cos^2 a - \\sin^2 a = 2\\cos^2 a - 1 = 1 - 2\\sin^2 a\\).\n  - \\(\\tan 2a = \\frac{2\\tan a}{1 - \\tan^2 a}\\).\n- **Háº¡ báº­c báº­c hai**:\n  - \\(\\cos^2 a = \\frac{1 + \\cos 2a}{2}\\); \\(\\sin^2 a = \\frac{1 - \\cos 2a}{2}\\); \\(\\tan^2 a = \\frac{1 - \\cos 2a}{1 + \\cos 2a}\\).\n- **NhÃ¢n ba \u0026 Háº¡ báº­c ba**:\n  - \\(\\sin 3a = 3\\sin a - 4\\sin^3 a \\implies \\sin^3 a = \\frac{3\\sin a - \\sin 3a}{4}\\).\n  - \\(\\cos 3a = 4\\cos^3 a - 3\\cos a \\implies \\cos^3 a = \\frac{3\\cos a + \\cos 3a}{4}\\).\n\n### 5. Biáº¿n Ä‘á»•i TÃ­ch thÃ nh Tá»•ng \u0026 Tá»•ng thÃ nh TÃ­ch\n- **TÃ­ch thÃ nh tá»•ng**:\n  - \\(\\cos a \\cos b = \\frac{1}{2}[\\cos(a - b) + \\cos(a + b)]\\).\n  - \\(\\sin a \\sin b = \\frac{1}{2}[\\cos(a - b) - \\cos(a + b)]\\).\n  - \\(\\sin a \\cos b = \\frac{1}{2}[\\sin(a + b) + \\sin(a - b)]\\).\n- **Tá»•ng thÃ nh tÃ­ch**:\n  - \\(\\cos u + \\cos v = 2\\cos\\frac{u + v}{2}\\cos\\frac{u - v}{2}\\).\n  - \\(\\cos u - \\cos v = -2\\sin\\frac{u + v}{2}\\sin\\frac{u - v}{2}\\).\n  - \\(\\sin u \\pm \\sin v = 2\\sin\\frac{u \\pm v}{2}\\cos\\frac{u \\mp v}{2}\\).\n\n### 6. Ká»¹ thuáº­t gÃ³c chia Ä‘Ã´i (Weierstrass Substitution)\nÄáº·t \\(t = \\tan\\frac{x}{2}\\) (vá»›i \\(x \\ne \\pi + k2\\pi\\)):\n\\[\\sin x = \\frac{2t}{1 + t^2}, \\quad \\cos x = \\frac{1 - t^2}{1 + t^2}, \\quad \\tan x = \\frac{2t}{1 - t^2}\\]\n\n### 7. PhÆ°Æ¡ng trÃ¬nh lÆ°á»£ng giÃ¡c cÆ¡ báº£n \u0026 Dáº¡ng cá»• Ä‘iá»ƒn\n- \\(\\sin x = \\sin\\alpha \\iff x = \\alpha + k2\\pi \\lor x = \\pi - \\alpha + k2\\pi\\).\n- \\(\\cos x = \\cos\\alpha \\iff x = \\pm\\alpha + k2\\pi\\).\n- \\(\\tan x = \\tan\\alpha \\iff x = \\alpha + k\\pi\\).\n- \\(a\\sin x + b\\cos x = c\\): cÃ³ nghiá»‡m \\(\\iff a^2 + b^2 \\ge c^2\\).",
        "formulas":  [
                         {
                             "id":  "kb_toan11_01_f1",
                             "name":  "CÃ´ng thá»©c Háº¡ báº­c báº­c hai",
                             "latex":  "\\cos^2 x = \\frac{1 + \\cos 2x}{2}, \\quad \\sin^2 x = \\frac{1 - \\cos 2x}{2}",
                             "desc":  "Biáº¿n Ä‘á»•i giáº£m báº­c tá»« báº­c 2 vá» báº­c 1 phá»¥c vá»¥ tÃ­nh tÃ­ch phÃ¢n vÃ  giáº£i phÆ°Æ¡ng trÃ¬nh",
                             "tags":  [
                                          "LÆ°á»£ng giÃ¡c",
                                          "Háº¡ báº­c"
                                      ]
                         },
                         {
                             "id":  "kb_toan11_01_f2",
                             "name":  "Äiá»u kiá»‡n cÃ³ nghiá»‡m pt thuáº§n nháº¥t báº­c nháº¥t",
                             "latex":  "a\\sin x + b\\cos x = c \\iff a^2 + b^2 \\ge c^2",
                             "desc":  "Äiá»u kiá»‡n cáº§n vÃ  Ä‘á»§ Ä‘á»ƒ phÆ°Æ¡ng trÃ¬nh lÆ°á»£ng giÃ¡c tuyáº¿n tÃ­nh cÃ³ nghiá»‡m",
                             "tags":  [
                                          "PhÆ°Æ¡ng trÃ¬nh",
                                          "LÆ°á»£ng giÃ¡c",
                                          "Äiá»u kiá»‡n nghiá»‡m"
                                      ]
                         },
                         {
                             "id":  "kb_toan11_01_f3",
                             "name":  "Há»‡ thá»©c lÆ°á»£ng giÃ¡c cÆ¡ báº£n \u0026 Táº­p xÃ¡c Ä‘á»‹nh",
                             "latex":  "\\sin^2 x + \\cos^2 x = 1, \\quad 1 + \\tan^2 x = \\frac{1}{\\cos^2 x}, \\quad 1 + \\cot^2 x = \\frac{1}{\\sin^2 x}, \\quad \\tan x \\cdot \\cot x = 1",
                             "desc":  "Má»‘i liÃªn há»‡ giá»¯a cÃ¡c giÃ¡ trá»‹ lÆ°á»£ng giÃ¡c cá»§a cÃ¹ng má»™t cung gÃ³c",
                             "tags":  [
                                          "LÆ°á»£ng giÃ¡c",
                                          "CÆ¡ báº£n",
                                          "Háº±ng Ä‘áº³ng thá»©c"
                                      ]
                         },
                         {
                             "id":  "kb_toan11_01_f4",
                             "name":  "CÃ´ng thá»©c cá»™ng lÆ°á»£ng giÃ¡c toÃ n diá»‡n",
                             "latex":  "\\sin(a \\pm b) = \\sin a \\cos b \\pm \\cos a \\sin b, \\quad \\cos(a \\pm b) = \\cos a \\cos b \\mp \\sin a \\sin b, \\quad \\tan(a \\pm b) = \\frac{\\tan a \\pm \\tan b}{1 \\mp \\tan a \\tan b}",
                             "desc":  "Biáº¿n Ä‘á»•i lÆ°á»£ng giÃ¡c cá»§a tá»•ng vÃ  hiá»‡u hai cung gÃ³c",
                             "tags":  [
                                          "LÆ°á»£ng giÃ¡c",
                                          "CÃ´ng thá»©c cá»™ng"
                                      ]
                         },
                         {
                             "id":  "kb_toan11_01_f5",
                             "name":  "CÃ´ng thá»©c nhÃ¢n Ä‘Ã´i toÃ n diá»‡n (Double Angle)",
                             "latex":  "\\sin 2a = 2\\sin a \\cos a, \\quad \\cos 2a = \\cos^2 a - \\sin^2 a = 2\\cos^2 a - 1 = 1 - 2\\sin^2 a, \\quad \\tan 2a = \\frac{2\\tan a}{1 - \\tan^2 a}",
                             "desc":  "Biá»ƒu diá»…n hÃ m lÆ°á»£ng giÃ¡c cung 2a theo cung a vá»›i 3 dáº¡ng biáº¿n Ä‘á»•i cá»§a cos(2a)",
                             "tags":  [
                                          "LÆ°á»£ng giÃ¡c",
                                          "NhÃ¢n Ä‘Ã´i"
                                      ]
                         },
                         {
                             "id":  "kb_toan11_01_f6",
                             "name":  "CÃ´ng thá»©c nhÃ¢n ba vÃ  háº¡ báº­c báº­c ba",
                             "latex":  "\\sin 3a = 3\\sin a - 4\\sin^3 a, \\quad \\cos 3a = 4\\cos^3 a - 3\\cos a, \\quad \\sin^3 a = \\frac{3\\sin a - \\sin 3a}{4}, \\quad \\cos^3 a = \\frac{3\\cos a + \\cos 3a}{4}",
                             "desc":  "Biáº¿n Ä‘á»•i nhÃ¢n ba vÃ  háº¡ báº­c ba phá»¥c vá»¥ giáº£i phÆ°Æ¡ng trÃ¬nh lÆ°á»£ng giÃ¡c nÃ¢ng cao",
                             "tags":  [
                                          "LÆ°á»£ng giÃ¡c",
                                          "NhÃ¢n ba",
                                          "Háº¡ báº­c"
                                      ]
                         },
                         {
                             "id":  "kb_toan11_01_f7",
                             "name":  "CÃ´ng thá»©c biáº¿n Ä‘á»•i tÃ­ch thÃ nh tá»•ng (Product-to-Sum)",
                             "latex":  "\\cos a \\cos b = \\frac{1}{2}[\\cos(a-b) + \\cos(a+b)], \\quad \\sin a \\sin b = \\frac{1}{2}[\\cos(a-b) - \\cos(a+b)], \\quad \\sin a \\cos b = \\frac{1}{2}[\\sin(a+b) + \\sin(a-b)]",
                             "desc":  "Biáº¿n Ä‘á»•i tÃ­ch cá»§a hai hÃ m lÆ°á»£ng giÃ¡c thÃ nh tá»•ng cÃ¡c hÃ m lÆ°á»£ng giÃ¡c Ä‘Æ¡n giáº£n",
                             "tags":  [
                                          "LÆ°á»£ng giÃ¡c",
                                          "TÃ­ch thÃ nh tá»•ng"
                                      ]
                         },
                         {
                             "id":  "kb_toan11_01_f8",
                             "name":  "CÃ´ng thá»©c biáº¿n Ä‘á»•i tá»•ng thÃ nh tÃ­ch (Sum-to-Product)",
                             "latex":  "\\cos u + \\cos v = 2\\cos\\frac{u+v}{2}\\cos\\frac{u-v}{2}, \\quad \\cos u - \\cos v = -2\\sin\\frac{u+v}{2}\\sin\\frac{u-v}{2}, \\quad \\sin u \\pm \\sin v = 2\\sin\\frac{u \\pm v}{2}\\cos\\frac{u \\mp v}{2}",
                             "desc":  "Biáº¿n Ä‘á»•i tá»•ng hiá»‡u hai hÃ m lÆ°á»£ng giÃ¡c thÃ nh tÃ­ch phá»¥c vá»¥ giáº£i phÆ°Æ¡ng trÃ¬nh tÃ­ch",
                             "tags":  [
                                          "LÆ°á»£ng giÃ¡c",
                                          "Tá»•ng thÃ nh tÃ­ch"
                                      ]
                         },
                         {
                             "id":  "kb_toan11_01_f9",
                             "name":  "CÃ´ng thá»©c gÃ³c chia Ä‘Ã´i (Weierstrass Substitution)",
                             "latex":  "t = \\tan\\frac{x}{2} \\implies \\sin x = \\frac{2t}{1 + t^2}, \\quad \\cos x = \\frac{1 - t^2}{1 + t^2}, \\quad \\tan x = \\frac{2t}{1 - t^2} \\quad (x \\ne \\pi + k2\\pi)",
                             "desc":  "Há»¯u tá»‰ hÃ³a toÃ n bá»™ hÃ m lÆ°á»£ng giÃ¡c theo biáº¿n t phá»¥c vá»¥ phÆ°Æ¡ng trÃ¬nh vÃ  nguyÃªn hÃ m",
                             "tags":  [
                                          "LÆ°á»£ng giÃ¡c",
                                          "Äá»•i biáº¿n",
                                          "Weierstrass"
                                      ]
                         },
                         {
                             "id":  "kb_toan11_01_f10",
                             "name":  "CÃ´ng thá»©c tÃ­nh nhanh Ä‘á»‘i xá»©ng \u0026 Báº­c cao",
                             "latex":  "\\sin x \\pm \\cos x = \\sqrt{2}\\sin\\left(x \\pm \\frac{\\pi}{4}\\right), \\quad \\sin^4 x + \\cos^4 x = 1 - \\frac{1}{2}\\sin^2 2x, \\quad \\sin^6 x + \\cos^6 x = 1 - \\frac{3}{4}\\sin^2 2x",
                             "desc":  "CÃ´ng thá»©c rÃºt gá»n nhanh cÃ¡c biá»ƒu thá»©c Ä‘á»‘i xá»©ng sin vÃ  cos thÆ°á»ng gáº·p trong Ä‘á» thi",
                             "tags":  [
                                          "LÆ°á»£ng giÃ¡c",
                                          "TÃ­nh nhanh",
                                          "Äá»‘i xá»©ng"
                                      ]
                         },
                         {
                             "id":  "kb_toan11_01_f11",
                             "name":  "PhÆ°Æ¡ng trÃ¬nh lÆ°á»£ng giÃ¡c cÆ¡ báº£n \u0026 Há» nghiá»‡m",
                             "latex":  "\\sin x = \\sin\\alpha \\iff \\left[\\begin{aligned} x \u0026= \\alpha + k2\\pi \\\\ x \u0026= \\pi - \\alpha + k2\\pi \\end{aligned}\\right., \\quad \\cos x = \\cos\\alpha \\iff x = \\pm\\alpha + k2\\pi, \\quad \\tan x = \\tan\\alpha \\iff x = \\alpha + k\\pi",
                             "desc":  "CÃ´ng thá»©c nghiá»‡m chuáº©n xÃ¡c cá»§a cÃ¡c phÆ°Æ¡ng trÃ¬nh lÆ°á»£ng giÃ¡c cÆ¡ báº£n vá»›i k thuá»™c Z",
                             "tags":  [
                                          "LÆ°á»£ng giÃ¡c",
                                          "PhÆ°Æ¡ng trÃ¬nh",
                                          "Nghiá»‡m"
                                      ]
                         }
                     ],
        "formula_ids":  [
                            "kb_toan11_01_f1",
                            "kb_toan11_01_f2",
                            "kb_toan11_01_f3",
                            "kb_toan11_01_f4",
                            "kb_toan11_01_f5",
                            "kb_toan11_01_f6",
                            "kb_toan11_01_f7",
                            "kb_toan11_01_f8",
                            "kb_toan11_01_f9",
                            "kb_toan11_01_f10",
                            "kb_toan11_01_f11"
                        ],
        "prerequisites":  [
                              "kb_toan10_02"
                          ],
        "related_topics":  [
                               "kb_toan12_01"
                           ],
        "common_traps":  [
                             "QuÃªn Ä‘áº·t Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cho tan(x) (x khÃ¡c pi/2 + k*pi) vÃ  cot(x) (x khÃ¡c k*pi)",
                             "Sai láº§m Ä‘á»•i dáº¥u á»Ÿ cÃ´ng thá»©c cá»™ng cos: cos(a+b) = cos(a)cos(b) - sin(a)sin(b) (pháº£i lÃ  dáº¥u trá»«)",
                             "BÃ¬nh phÆ°Æ¡ng hai váº¿ lÃ m phÃ¡t sinh nghiá»‡m ngoáº¡i lai mÃ  khÃ´ng kiá»ƒm tra láº¡i hoáº·c Ä‘á»‘i chiáº¿u Ä‘iá»u kiá»‡n",
                             "Nháº§m láº«n chu ká»³ há» nghiá»‡m: sin vÃ  cos cÃ³ chu ká»³ k*2*pi, trong khi tan vÃ  cot cÃ³ chu ká»³ k*pi",
                             "Lá»—i trÃ¹ng láº·p hoáº·c sÃ³t Ä‘iá»ƒm biá»ƒu diá»…n khi gá»™p cÃ¡c há» nghiá»‡m trÃªn Ä‘Æ°á»ng trÃ²n lÆ°á»£ng giÃ¡c"
                         ],
        "examples":  [
                         {
                             "title":  "VÃ­ dá»¥ 1: TÃ¬m tham sá»‘ m Ä‘á»ƒ phÆ°Æ¡ng trÃ¬nh cÃ³ nghiá»‡m",
                             "question":  "TÃ¬m táº¥t cáº£ giÃ¡ trá»‹ thá»±c cá»§a tham sá»‘ \\(m\\) Ä‘á»ƒ phÆ°Æ¡ng trÃ¬nh \\(3\\sin 2x + 4\\cos 2x = 2m - 1\\) cÃ³ nghiá»‡m.",
                             "solution_steps":  [
                                                    "BÆ°á»›c 1: Nháº­n diá»‡n dáº¡ng phÆ°Æ¡ng trÃ¬nh: \\(a\\sin 2x + b\\cos 2x = c\\) vá»›i \\(a = 3, b = 4, c = 2m - 1\\).",
                                                    "BÆ°á»›c 2: Äiá»u kiá»‡n cÃ³ nghiá»‡m: \\(a^2 + b^2 \\ge c^2 \\iff 3^2 + 4^2 \\ge (2m - 1)^2\\).",
                                                    "BÆ°á»›c 3: Ta cÃ³ \\(25 \\ge (2m - 1)^2 \\iff -5 \\le 2m - 1 \\le 5 \\iff -4 \\le 2m \\le 6 \\iff -2 \\le m \\le 3\\)."
                                                ],
                             "takeaway":  "Ãp dá»¥ng ngay Ä‘iá»u kiá»‡n Cauchy-Schwarz/Buniacovsky cho biá»ƒu thá»©c tuyáº¿n tÃ­nh lÆ°á»£ng giÃ¡c."
                         }
                     ],
        "applications":  "PhÃ¢n tÃ­ch tÃ­n hiá»‡u Ã¢m thanh vÃ  xá»­ lÃ½ sÃ³ng vÃ´ tuyáº¿n (Fourier Transform), mÃ´ hÃ¬nh hÃ³a chuyá»ƒn Ä‘á»™ng con láº¯c Ä‘Æ¡n, dÃ²ng Ä‘iá»‡n xoay chiá»u AC trong ká»¹ thuáº­t Ä‘iá»‡n tá»­.",
        "drill_tags":  [
                           "LÆ°á»£ng giÃ¡c",
                           "Chu ká»³",
                           "Dao Ä‘á»™ng"
                       ],
        "related_question_ids":  [
                                     "q_tsa_07",
                                     "q_hsa_06",
                                     "q_thpt_03"
                                 ]
    },
    {
        "id":  "kb_toan11_02",
        "grade":  "ToÃ¡n 11",
        "chapter":  "ChÆ°Æ¡ng 2: DÃ£y sá»‘, Cáº¥p sá»‘ cá»™ng \u0026 Cáº¥p sá»‘ nhÃ¢n",
        "title":  "DÃ£y sá»‘, Cáº¥p sá»‘ \u0026 MÃ´ hÃ¬nh LÃ£i kÃ©p TÃ i chÃ­nh",
        "overview":  "CÃ´ng thá»©c tá»•ng quÃ¡t, sai phÃ¢n tuyáº¿n tÃ­nh vÃ  á»©ng dá»¥ng bÃ i toÃ¡n gá»­i gÃ³p tiáº¿t kiá»‡m, vay tráº£ gÃ³p ngÃ¢n hÃ ng.",
        "theory_markdown":  "### 1. Cáº¥p sá»‘ cá»™ng (CSC)\n- Äá»‹nh nghÄ©a: \\(u_{n+1} = u_n + d\\) (vá»›i \\(d\\) lÃ  cÃ´ng sai).\n- Sá»‘ háº¡ng tá»•ng quÃ¡t: \\(u_n = u_1 + (n - 1)d\\).\n- Tá»•ng \\(n\\) sá»‘ háº¡ng Ä‘áº§u: \\(S_n = \\frac{n(u_1 + u_n)}{2} = \\frac{n[2u_1 + (n - 1)d]}{2}\\).\n- TÃ­nh cháº¥t trung bÃ¬nh cá»™ng: \\(u_k = \\frac{u_{k-1} + u_{k+1}}{2}\\) \\((k \\ge 2)\\).\n\n### 2. Cáº¥p sá»‘ nhÃ¢n (CSN)\n- Äá»‹nh nghÄ©a: \\(u_{n+1} = u_n \\cdot q\\) (vá»›i \\(q\\) lÃ  cÃ´ng bá»™i).\n- Sá»‘ háº¡ng tá»•ng quÃ¡t: \\(u_n = u_1 \\cdot q^{n - 1}\\).\n- Tá»•ng \\(n\\) sá»‘ háº¡ng Ä‘áº§u (vá»›i \\(q \\ne 1\\)): \\(S_n = u_1 \\frac{1 - q^n}{1 - q}\\).\n- Tá»•ng CSN lÃ¹i vÃ´ háº¡n (\\(|q| \u003c 1\\)): \\(S = \\frac{u_1}{1 - q}\\).\n- TÃ­nh cháº¥t trung bÃ¬nh nhÃ¢n: \\(u_k^2 = u_{k-1} \\cdot u_{k+1}\\) \\((k \\ge 2)\\).",
        "formulas":  [
                         {
                             "id":  "kb_toan11_02_f1",
                             "name":  "CÃ´ng thá»©c Vay tráº£ gÃ³p Ä‘á»‹nh ká»³ (Amortization)",
                             "latex":  "M = A \\frac{r(1 + r)^n}{(1 + r)^n - 1}",
                             "desc":  "Sá»‘ tiá»n tráº£ Ä‘á»u Ä‘áº·n M má»—i thÃ¡ng khi vay A triá»‡u Ä‘á»“ng lÃ£i suáº¥t r trong n thÃ¡ng",
                             "tags":  [
                                          "TÃ i chÃ­nh",
                                          "LÃ£i kÃ©p",
                                          "Tráº£ gÃ³p"
                                      ]
                         },
                         {
                             "id":  "kb_toan11_02_f2",
                             "name":  "Tá»•ng cáº¥p sá»‘ nhÃ¢n lÃ¹i vÃ´ háº¡n",
                             "latex":  "S = \\sum_{k=1}^\\infty u_1 q^{k-1} = \\frac{u_1}{1 - q} \\quad (|q| \u003c 1)",
                             "desc":  "Há»™i tá»¥ tá»•ng vÃ´ háº¡n cá»§a cáº¥p sá»‘ nhÃ¢n khi cÃ´ng bá»™i trá»‹ tuyá»‡t Ä‘á»‘i nhá» hÆ¡n 1",
                             "tags":  [
                                          "Chuá»—i",
                                          "Cáº¥p sá»‘ nhÃ¢n"
                                      ]
                         },
                         {
                             "id":  "kb_toan11_02_f3",
                             "name":  "Cáº¥p sá»‘ cá»™ng toÃ n diá»‡n (Arithmetic Progression)",
                             "latex":  "u_n = u_1 + (n-1)d, \\quad S_n = \\frac{n(u_1 + u_n)}{2} = \\frac{n[2u_1 + (n-1)d]}{2}, \\quad u_k = \\frac{u_{k-1} + u_{k+1}}{2}",
                             "desc":  "Sá»‘ háº¡ng tá»•ng quÃ¡t, tá»•ng n sá»‘ háº¡ng Ä‘áº§u vÃ  tÃ­nh cháº¥t trung bÃ¬nh cá»™ng cá»§a cáº¥p sá»‘ cá»™ng",
                             "tags":  [
                                          "Cáº¥p sá»‘ cá»™ng",
                                          "DÃ£y sá»‘"
                                      ]
                         },
                         {
                             "id":  "kb_toan11_02_f4",
                             "name":  "Cáº¥p sá»‘ nhÃ¢n toÃ n diá»‡n (Geometric Progression)",
                             "latex":  "u_n = u_1 \\cdot q^{n-1}, \\quad S_n = u_1 \\frac{1 - q^n}{1 - q} \\; (q \\ne 1), \\quad u_k^2 = u_{k-1} \\cdot u_{k+1}",
                             "desc":  "Sá»‘ háº¡ng tá»•ng quÃ¡t, tá»•ng n sá»‘ háº¡ng Ä‘áº§u vÃ  tÃ­nh cháº¥t trung bÃ¬nh nhÃ¢n cá»§a cáº¥p sá»‘ nhÃ¢n",
                             "tags":  [
                                          "Cáº¥p sá»‘ nhÃ¢n",
                                          "DÃ£y sá»‘"
                                      ]
                         }
                     ],
        "formula_ids":  [
                            "kb_toan11_02_f1",
                            "kb_toan11_02_f2",
                            "kb_toan11_02_f3",
                            "kb_toan11_02_f4"
                        ],
        "prerequisites":  [
                              "kb_toan10_01"
                          ],
        "related_topics":  [
                               "kb_toan11_03"
                           ],
        "common_traps":  [
                             "Nháº§m láº«n cÃ´ng thá»©c sá»‘ háº¡ng tá»•ng quÃ¡t cá»§a CSC (dÃ¹ng n thay vÃ¬ n-1)",
                             "Ãp dá»¥ng cÃ´ng thá»©c tá»•ng CSN lÃ¹i vÃ´ háº¡n khi |q| \u003e= 1"
                         ],
        "examples":  [
                         {
                             "title":  "VÃ­ dá»¥ 1: TÃ­nh tiá»n vay mua nhÃ  tráº£ gÃ³p",
                             "question":  "Anh Nam vay ngÃ¢n hÃ ng 1 tá»· Ä‘á»“ng vá»›i lÃ£i suáº¥t 0,8%/thÃ¡ng. Anh tráº£ gÃ³p Ä‘á»u Ä‘áº·n hÃ ng thÃ¡ng trong 5 nÄƒm (60 thÃ¡ng). TÃ­nh sá»‘ tiá»n anh Nam pháº£i tráº£ má»—i thÃ¡ng.",
                             "solution_steps":  [
                                                    "BÆ°á»›c 1: Ãp dá»¥ng cÃ´ng thá»©c Amortization vá»›i \\(A = 10^9\\), \\(r = 0,008\\), \\(n = 60\\).",
                                                    "BÆ°á»›c 2: Máº«u sá»‘: \\((1 + 0,008)^{60} - 1 \\approx 1,6122 - 1 = 0,6122\\).",
                                                    "BÆ°á»›c 3: Tá»­ sá»‘: \\(10^9 \\times 0,008 \\times 1,6122 = 12.897.600\\).",
                                                    "BÆ°á»›c 4: \\(M = \\frac{12.897.600}{0,6122} \\approx 21.067.000\\text{ VNÄ}\\)."
                                                ],
                             "takeaway":  "Náº¯m vá»¯ng cÃ´ng thá»©c tráº£ gÃ³p Ä‘á»u Ä‘áº·n M = A * r(1+r)^n / ((1+r)^n - 1)."
                         }
                     ],
        "applications":  "MÃ´ hÃ¬nh Ä‘á»‹nh giÃ¡ trÃ¡i phiáº¿u, tÃ­nh kháº¥u hao tÃ i sáº£n cá»‘ Ä‘á»‹nh, quy hoáº¡ch hÆ°u trÃ­ tÃ i chÃ­nh cÃ¡ nhÃ¢n.",
        "drill_tags":  [
                           "Cáº¥p sá»‘ cá»™ng",
                           "Cáº¥p sá»‘ nhÃ¢n",
                           "LÃ£i kÃ©p",
                           "TÃ i chÃ­nh"
                       ],
        "related_question_ids":  [
                                     "q_tsa_08",
                                     "q_hsa_08",
                                     "q_thpt_05"
                                 ]
    },
    {
        "id":  "kb_toan11_03",
        "grade":  "ToÃ¡n 11",
        "chapter":  "ChÆ°Æ¡ng 3: Giá»›i háº¡n \u0026 HÃ m sá»‘ liÃªn tá»¥c",
        "title":  "Giá»›i háº¡n dÃ£y sá»‘, Giá»›i háº¡n hÃ m sá»‘ \u0026 Äá»‹nh lÃ½ Bolzano-Cauchy",
        "overview":  "PhÆ°Æ¡ng phÃ¡p nhÃ¢n liÃªn há»£p khá»­ dáº¡ng vÃ´ Ä‘á»‹nh 0/0, vÃ´ cÃ¹ng trá»« vÃ´ cÃ¹ng vÃ  Ä‘á»‹nh lÃ½ giÃ¡ trá»‹ trung gian Bolzano-Cauchy.",
        "theory_markdown":  "### 1. Giá»›i háº¡n cÆ¡ báº£n \u0026 VÃ´ Ä‘á»‹nh\n- CÃ¡c dáº¡ng vÃ´ Ä‘á»‹nh kinh Ä‘iá»ƒn: \\(\\frac{0}{0}, \\frac{\\infty}{\\infty}, \\infty - \\infty, 0 \\cdot \\infty\\).\n- Ká»¹ thuáº­t nhÃ¢n lÆ°á»£ng liÃªn há»£p:\n  - Báº­c hai: \\(a - b = \\frac{a^2 - b^2}{a + b}\\).\n  - Báº­c ba: \\(a - b = \\frac{a^3 - b^3}{a^2 + ab + b^2}\\).\n- Giá»›i háº¡n then chá»‘t:\n  - \\(\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1\\).\n  - \\(\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1, \\quad \\lim_{x \\to 0} \\frac{\\ln(1 + x)}{x} = 1\\).\n\n### 2. Äá»‹nh lÃ½ Bolzano-Cauchy (GiÃ¡ trá»‹ trung gian)\nNáº¿u hÃ m sá»‘ \\(y = f(x)\\) liÃªn tá»¥c trÃªn Ä‘oáº¡n \\([a; b]\\) vÃ  \\(f(a) \\cdot f(b) \u003c 0\\), thÃ¬ tá»“n táº¡i Ã­t nháº¥t má»™t Ä‘iá»ƒm \\(c \\in (a; b)\\) sao cho \\(f(c) = 0\\).",
        "formulas":  [
                         {
                             "id":  "kb_toan11_03_f1",
                             "name":  "Giá»›i háº¡n lÆ°á»£ng giÃ¡c cÆ¡ báº£n",
                             "latex":  "\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1, \\quad \\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2} = \\frac{1}{2}",
                             "desc":  "Giá»›i háº¡n then chá»‘t giáº£i quyáº¿t cÃ¡c dáº¡ng vÃ´ Ä‘á»‹nh lÆ°á»£ng giÃ¡c 0/0",
                             "tags":  [
                                          "Giá»›i háº¡n",
                                          "LÆ°á»£ng giÃ¡c"
                                      ]
                         },
                         {
                             "id":  "kb_toan11_03_f2",
                             "name":  "Giá»›i háº¡n sá»‘ Euler e",
                             "latex":  "\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n = e, \\quad \\lim_{x \\to 0} (1 + x)^{1/x} = e",
                             "desc":  "Háº±ng sá»‘ Euler e vÃ  giá»›i háº¡n Ä‘á»‹nh nghÄ©a hÃ m sá»‘ mÅ© tá»± nhiÃªn",
                             "tags":  [
                                          "Giá»›i háº¡n",
                                          "Sá»‘ e"
                                      ]
                         },
                         {
                             "id":  "kb_toan11_03_f3",
                             "name":  "Giá»›i háº¡n hÃ m sá»‘ mÅ© vÃ  logarit cÆ¡ báº£n",
                             "latex":  "\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1, \\quad \\lim_{x \\to 0} \\frac{\\ln(1 + x)}{x} = 1, \\quad \\lim_{x \\to 0} \\frac{(1+x)^\\alpha - 1}{x} = \\alpha",
                             "desc":  "Há»‡ thá»‘ng giá»›i háº¡n há»¯u háº¡n cÆ¡ báº£n phá»¥c vá»¥ giáº£i nhanh dáº¡ng vÃ´ Ä‘á»‹nh 0/0",
                             "tags":  [
                                          "Giá»›i háº¡n",
                                          "Sá»‘ Euler",
                                          "HÃ m sá»‘"
                                      ]
                         }
                     ],
        "formula_ids":  [
                            "kb_toan11_03_f1",
                            "kb_toan11_03_f2",
                            "kb_toan11_03_f3"
                        ],
        "prerequisites":  [
                              "kb_toan11_02"
                          ],
        "related_topics":  [
                               "kb_toan11_04",
                               "kb_gt1_01"
                           ],
        "common_traps":  [
                             "Ãp dá»¥ng lim(sin x / x) = 1 khi x tiáº¿n ra vÃ´ cÃ¹ng (káº¿t quáº£ Ä‘Ãºng pháº£i lÃ  0)",
                             "QuÃªn nhÃ¢n liÃªn há»£p báº­c 3 Ä‘Ãºng dáº¡ng háº±ng Ä‘áº³ng thá»©c"
                         ],
        "examples":  [
                         {
                             "title":  "VÃ­ dá»¥ 1: Chá»©ng minh phÆ°Æ¡ng trÃ¬nh cÃ³ nghiá»‡m",
                             "question":  "Chá»©ng minh phÆ°Æ¡ng trÃ¬nh \\(x^5 - 3x - 1 = 0\\) cÃ³ Ã­t nháº¥t 3 nghiá»‡m thá»±c phÃ¢n biá»‡t trÃªn Ä‘oáº¡n \\([-2; 2]\\).",
                             "solution_steps":  [
                                                    "BÆ°á»›c 1: Äáº·t \\(f(x) = x^5 - 3x - 1\\), liÃªn tá»¥c trÃªn \\(\\mathbb{R}\\).",
                                                    "BÆ°á»›c 2: TÃ­nh cÃ¡c giÃ¡ trá»‹ má»‘c: \\(f(-2) = -27 \u003c 0\\), \\(f(-1) = 1 \u003e 0\\), \\(f(0) = -1 \u003c 0\\), \\(f(2) = 25 \u003e 0\\).",
                                                    "BÆ°á»›c 3: TÃ­ch dáº¥u Ä‘á»•i chiá»u liÃªn tiáº¿p: \\(f(-2)f(-1) \u003c 0\\), \\(f(-1)f(0) \u003c 0\\), \\(f(0)f(2) \u003c 0\\).",
                                                    "BÆ°á»›c 4: Theo Ä‘á»‹nh lÃ½ Bolzano-Cauchy, tá»“n táº¡i Ã­t nháº¥t 3 nghiá»‡m thuá»™c \\((-2; -1), (-1; 0), (0; 2)\\)."
                                                ],
                             "takeaway":  "TÃ¬m cÃ¡c giÃ¡ trá»‹ má»‘c sao cho tÃ­ch giÃ¡ trá»‹ hÃ m sá»‘ trÃ¡i dáº¥u Ä‘á»ƒ kháº³ng Ä‘á»‹nh nghiá»‡m."
                         }
                     ],
        "applications":  "Thuáº­t toÃ¡n tÃ¬m nghiá»‡m chia Ä‘Ã´i (Bisection Method) trong tÃ­nh toÃ¡n sá»‘ há»c, chá»©ng minh tÃ­nh liÃªn tá»¥c trong cÆ¡ cháº¿ Ä‘iá»u khiá»ƒn robot tá»± hÃ nh.",
        "drill_tags":  [
                           "Giá»›i háº¡n",
                           "LiÃªn tá»¥c",
                           "Bolzano-Cauchy"
                       ],
        "related_question_ids":  [
                                     "q_tsa_10",
                                     "q_hsa_11",
                                     "q_thpt_06"
                                 ]
    },
    {
        "id":  "kb_toan11_04",
        "grade":  "ToÃ¡n 11",
        "chapter":  "ChÆ°Æ¡ng 4: Äáº¡o hÃ m \u0026 Tiáº¿p tuyáº¿n",
        "title":  "Äáº¡o hÃ m, Tiáº¿p tuyáº¿n \u0026 MÃ´ hÃ¬nh Váº­n tá»‘c - Gia tá»‘c tá»©c thá»i",
        "overview":  "Äá»‹nh nghÄ©a Ä‘áº¡o hÃ m qua giá»›i háº¡n vi phÃ¢n, quy táº¯c tÃ­nh Ä‘áº¡o hÃ m hÃ m há»£p vÃ  á»©ng dá»¥ng tiáº¿p tuyáº¿n trong Ä‘á»“ thá»‹ há»c.",
        "theory_markdown":  "### 1. Ã nghÄ©a hÃ¬nh há»c \u0026 PhÆ°Æ¡ng trÃ¬nh tiáº¿p tuyáº¿n\n- Äáº¡o hÃ m \\(f\u0027(x_0)\\) lÃ  há»‡ sá»‘ gÃ³c cá»§a tiáº¿p tuyáº¿n táº¡i Ä‘iá»ƒm \\(M(x_0; y_0)\\).\n- PhÆ°Æ¡ng trÃ¬nh tiáº¿p tuyáº¿n: \\(y = f\u0027(x_0)(x - x_0) + y_0\\).\n\n### 2. Ã nghÄ©a váº­t lÃ½\n- Váº­n tá»‘c tá»©c thá»i: \\(v(t) = s\u0027(t)\\).\n- Gia tá»‘c tá»©c thá»i: \\(a(t) = v\u0027(t) = s\u0027\u0027(t)\\).\n\n### 3. Äáº¡o hÃ m hÃ m há»£p (Chain Rule)\nNáº¿u \\(y = f(u)\\) vÃ  \\(u = u(x)\\) thÃ¬ \\(y\u0027_x = y\u0027_u \\cdot u\u0027_x\\).",
        "formulas":  [
                         {
                             "id":  "kb_toan11_04_f1",
                             "name":  "PhÆ°Æ¡ng trÃ¬nh tiáº¿p tuyáº¿n táº¡i Ä‘iá»ƒm",
                             "latex":  "y = f\u0027(x_0)(x - x_0) + y_0",
                             "desc":  "PhÆ°Æ¡ng trÃ¬nh tiáº¿p tuyáº¿n cá»§a Ä‘á»“ thá»‹ hÃ m sá»‘ y = f(x) táº¡i tiáº¿p Ä‘iá»ƒm M(x0, y0)",
                             "tags":  [
                                          "Äáº¡o hÃ m",
                                          "Tiáº¿p tuyáº¿n"
                                      ]
                         },
                         {
                             "id":  "kb_toan11_04_f2",
                             "name":  "Äáº¡o hÃ m hÃ m há»£p (Chain Rule)",
                             "latex":  "y = f(u(x)) \\implies y\u0027 = f\u0027(u) \\cdot u\u0027(x)",
                             "desc":  "Quy táº¯c dÃ¢y chuyá»n tÃ­nh Ä‘áº¡o hÃ m cá»§a hÃ m há»£p",
                             "tags":  [
                                          "Äáº¡o hÃ m",
                                          "HÃ m há»£p"
                                      ]
                         },
                         {
                             "id":  "kb_toan11_04_f3",
                             "name":  "Báº£ng Ä‘áº¡o hÃ m cÃ¡c hÃ m sÆ¡ cáº¥p cÆ¡ báº£n",
                             "latex":  "(x^\\alpha)\u0027 = \\alpha x^{\\alpha-1}, \\quad (\\sqrt{x})\u0027 = \\frac{1}{2\\sqrt{x}}, \\quad (\\sin x)\u0027 = \\cos x, \\quad (\\cos x)\u0027 = -\\sin x, \\quad (\\tan x)\u0027 = \\frac{1}{\\cos^2 x}",
                             "desc":  "Quy táº¯c Ä‘áº¡o hÃ m chuáº©n cá»§a hÃ m lÅ©y thá»«a, cÄƒn báº­c hai vÃ  hÃ m lÆ°á»£ng giÃ¡c",
                             "tags":  [
                                          "Äáº¡o hÃ m",
                                          "Quy táº¯c"
                                      ]
                         },
                         {
                             "id":  "kb_toan11_04_f4",
                             "name":  "CÃ´ng thá»©c tÃ­nh nhanh Ä‘áº¡o hÃ m phÃ¢n thá»©c há»¯u tá»‰",
                             "latex":  "\\left(\\frac{ax+b}{cx+d}\\right)\u0027 = \\frac{ad - bc}{(cx+d)^2}, \\quad \\left(\\frac{ax^2+bx+c}{dx+e}\\right)\u0027 = \\frac{ad x^2 + 2ae x + (be - cd)}{(dx+e)^2}",
                             "desc":  "CÃ´ng thá»©c Ä‘á»‹nh thá»©c tÃ­nh nhanh Ä‘áº¡o hÃ m phÃ¢n thá»©c báº­c 1/1 vÃ  báº­c 2/1",
                             "tags":  [
                                          "Äáº¡o hÃ m",
                                          "TÃ­nh nhanh",
                                          "PhÃ¢n thá»©c"
                                      ]
                         }
                     ],
        "formula_ids":  [
                            "kb_toan11_04_f1",
                            "kb_toan11_04_f2",
                            "kb_toan11_04_f3",
                            "kb_toan11_04_f4"
                        ],
        "prerequisites":  [
                              "kb_toan11_03"
                          ],
        "related_topics":  [
                               "kb_toan12_01"
                           ],
        "common_traps":  [
                             "QuÃªn nhÃ¢n thÃªm u\u0027(x) khi tÃ­nh Ä‘áº¡o hÃ m hÃ m há»£p",
                             "Nháº§m láº«n giá»¯a tiáº¿p tuyáº¿n \u0027táº¡i Ä‘iá»ƒm\u0027 vÃ  tiáº¿p tuyáº¿n \u0027Ä‘i qua Ä‘iá»ƒm\u0027"
                         ],
        "examples":  [
                         {
                             "title":  "VÃ­ dá»¥ 1: TÃ¬m gia tá»‘c tá»©c thá»i cá»§a váº­t thá»ƒ",
                             "question":  "Má»™t váº­t chuyá»ƒn Ä‘á»™ng theo phÆ°Æ¡ng trÃ¬nh \\(s(t) = 2t^3 - 6t^2 + 15t\\) (m, giÃ¢y). TÃ¬m gia tá»‘c cá»§a váº­t táº¡i thá»i Ä‘iá»ƒm váº­n tá»‘c triá»‡t tiÃªu.",
                             "solution_steps":  [
                                                    "BÆ°á»›c 1: Váº­n tá»‘c tá»©c thá»i: \\(v(t) = s\u0027(t) = 6t^2 - 12t + 15\\).",
                                                    "BÆ°á»›c 2: TÃ¬m thá»i Ä‘iá»ƒm váº­n tá»‘c cá»±c tiá»ƒu: \\(a(t) = v\u0027(t) = 12t - 12\\).",
                                                    "BÆ°á»›c 3: Váº­n tá»‘c triá»‡t tiÃªu khi \\(6t^2 - 12t + 15 = 0\\), phÆ°Æ¡ng trÃ¬nh vÃ´ nghiá»‡m thá»±c (luÃ´n dÆ°Æ¡ng).",
                                                    "BÆ°á»›c 4: XÃ©t thá»i Ä‘iá»ƒm váº­n tá»‘c nhá» nháº¥t: \\(t = 1\\text{ s}\\), khi Ä‘Ã³ gia tá»‘c \\(a(1) = 0\\text{ m/s}^2\\)."
                                                ],
                             "takeaway":  "Váº­n tá»‘c lÃ  Ä‘áº¡o hÃ m báº­c nháº¥t cá»§a quÃ£ng Ä‘Æ°á»ng, gia tá»‘c lÃ  Ä‘áº¡o hÃ m báº­c hai."
                         }
                     ],
        "applications":  "MÃ´ phá»ng Ä‘á»™ng lá»±c há»c Ã´ tÃ´, phÃ¢n tÃ­ch tá»‘c Ä‘á»™ pháº£n á»©ng hÃ³a há»c (Kinetics) vÃ  tá»‘i Æ°u hÃ³a giáº£i thuáº­t há»c sÃ¢u Gradient Descent trong AI.",
        "drill_tags":  [
                           "Äáº¡o hÃ m",
                           "Tiáº¿p tuyáº¿n",
                           "Váº­n tá»‘c",
                           "Gia tá»‘c"
                       ],
        "related_question_ids":  [
                                     "q_tsa_13",
                                     "q_hsa_14",
                                     "q_thpt_08"
                                 ]
    },
    {
        "id":  "kb_toan11_05",
        "grade":  "ToÃ¡n 11",
        "chapter":  "ChÆ°Æ¡ng 5: XÃ¡c suáº¥t \u0026 Äáº¡i sá»‘ tá»• há»£p",
        "title":  "XÃ¡c suáº¥t cÃ³ Ä‘iá»u kiá»‡n, Biáº¿n cá»‘ Ä‘á»™c láº­p, Bayes \u0026 Äáº¡i sá»‘ tá»• há»£p",
        "overview":  "CÃ´ng thá»©c xÃ¡c suáº¥t cÃ³ Ä‘iá»u kiá»‡n, Ä‘á»‹nh lÃ½ Bayes, há»‡ biáº¿n cá»‘ Ä‘áº§y Ä‘á»§, cÃ´ng thá»©c nhÃ¢n xÃ¡c suáº¥t vÃ  Ä‘áº¡i sá»‘ tá»• há»£p nhá»‹ thá»©c Newton.",
        "theory_markdown":  "### 1. Äáº¡i sá»‘ tá»• há»£p ná»n táº£ng\n- HoÃ¡n vá»‹: \\(P_n = n!\\).\n- Chá»‰nh há»£p (chá»n vÃ  xáº¿p thá»© tá»±): \\(A_n^k = \\frac{n!}{(n-k)!}\\).\n- Tá»• há»£p (chá»n khÃ´ng thá»© tá»±): \\(C_n^k = \\frac{n!}{k!(n-k)!}\\).\n- Nhá»‹ thá»©c Newton: \\((a+b)^n = \\sum_{k=0}^n C_n^k a^{n-k} b^k\\).\n\n### 2. XÃ¡c suáº¥t cÃ³ Ä‘iá»u kiá»‡n \u0026 CÃ´ng thá»©c nhÃ¢n\n- XÃ¡c suáº¥t cÃ³ Ä‘iá»u kiá»‡n cá»§a A khi biáº¿t B Ä‘Ã£ xáº£y ra: \\(P(A|B) = \\frac{P(A \\cap B)}{P(B)}\\).\n- CÃ´ng thá»©c nhÃ¢n: \\(P(A \\cap B) = P(B) \\cdot P(A|B) = P(A) \\cdot P(B|A)\\).\n- Náº¿u A vÃ  B Ä‘á»™c láº­p: \\(P(A \\cap B) = P(A) \\cdot P(B)\\).\n\n### 3. CÃ´ng thá»©c xÃ¡c suáº¥t toÃ n pháº§n \u0026 Äá»‹nh lÃ½ Bayes\nCho \\(\\{A_1, A_2, \\dots, A_n\\}\\) lÃ  há»‡ biáº¿n cá»‘ Ä‘áº§y Ä‘á»§:\n- XÃ¡c suáº¥t toÃ n pháº§n: \\(P(B) = \\sum_{i=1}^n P(A_i) \\cdot P(B|A_i)\\).\n- Äá»‹nh lÃ½ Bayes: \\(P(A_k|B) = \\frac{P(A_k) \\cdot P(B|A_k)}{P(B)}\\).",
        "formulas":  [
                         {
                             "id":  "kb_toan11_05_f1",
                             "name":  "Äá»‹nh lÃ½ Bayes",
                             "latex":  "P(A_i|B) = \\frac{P(A_i)P(B|A_i)}{\\sum_{j=1}^n P(A_j)P(B|A_j)}",
                             "desc":  "TÃ­nh xÃ¡c suáº¥t háº­u nghiá»‡m dá»±a trÃªn thÃ´ng tin quan sÃ¡t má»›i",
                             "tags":  [
                                          "XÃ¡c suáº¥t",
                                          "Bayes"
                                      ]
                         },
                         {
                             "id":  "kb_toan11_05_f2",
                             "name":  "CÃ´ng thá»©c nhÃ¢n xÃ¡c suáº¥t",
                             "latex":  "P(A \\cap B) = P(A)P(B|A) = P(B)P(A|B)",
                             "desc":  "XÃ¡c suáº¥t cá»§a giao hai biáº¿n cá»‘ cÃ³ Ä‘iá»u kiá»‡n",
                             "tags":  [
                                          "XÃ¡c suáº¥t",
                                          "NhÃ¢n xÃ¡c suáº¥t"
                                      ]
                         },
                         {
                             "id":  "kb_toan11_05_f3",
                             "name":  "HoÃ¡n vá»‹, Chá»‰nh há»£p, Tá»• há»£p \u0026 Nhá»‹ thá»©c Newton",
                             "latex":  "P_n = n!, \\quad A_n^k = \\frac{n!}{(n-k)!}, \\quad C_n^k = \\frac{n!}{k!(n-k)!}, \\quad (a+b)^n = \\sum_{k=0}^n C_n^k a^{n-k} b^k",
                             "desc":  "CÃ¡c cÃ´ng thá»©c Ä‘áº¿m Ä‘áº¡i sá»‘ tá»• há»£p ná»n táº£ng vÃ  khai triá»ƒn nhá»‹ thá»©c",
                             "tags":  [
                                          "Tá»• há»£p",
                                          "Chá»‰nh há»£p",
                                          "Nhá»‹ thá»©c Newton"
                                      ]
                         },
                         {
                             "id":  "kb_toan11_05_f4",
                             "name":  "CÃ´ng thá»©c xÃ¡c suáº¥t toÃ n pháº§n (Total Probability)",
                             "latex":  "P(B) = \\sum_{i=1}^n P(A_i) \\cdot P(B|A_i) \\quad (\\{A_1, \\dots, A_n\\} \\text{ lÃ  há»‡ Ä‘áº§y Ä‘á»§})",
                             "desc":  "TÃ­nh xÃ¡c suáº¥t biÃªn cá»§a biáº¿n cá»‘ thÃ´ng qua phÃ¢n rÃ£ Ä‘iá»u kiá»‡n theo há»‡ Ä‘áº§y Ä‘á»§",
                             "tags":  [
                                          "XÃ¡c suáº¥t",
                                          "XÃ¡c suáº¥t toÃ n pháº§n"
                                      ]
                         }
                     ],
        "formula_ids":  [
                            "kb_toan11_05_f1",
                            "kb_toan11_05_f2",
                            "kb_toan11_05_f3",
                            "kb_toan11_05_f4"
                        ],
        "prerequisites":  [
                              "kb_toan10_05"
                          ],
        "related_topics":  [
                               "kb_toan12_05"
                           ],
        "common_traps":  [
                             "Nháº§m láº«n giá»¯a P(A|B) vÃ  P(B|A)",
                             "KhÃ´ng nháº­n diá»‡n Ä‘Æ°á»£c há»‡ biáº¿n cá»‘ Ä‘áº§y Ä‘á»§ khi Ã¡p dá»¥ng cÃ´ng thá»©c xÃ¡c suáº¥t toÃ n pháº§n"
                         ],
        "examples":  [
                         {
                             "title":  "VÃ­ dá»¥ 1: BÃ i toÃ¡n cháº©n Ä‘oÃ¡n y khoa qua Bayes",
                             "question":  "Má»™t cÄƒn bá»‡nh hiáº¿m cÃ³ tá»· lá»‡ nhiá»…m lÃ  0,1% dÃ¢n sá»‘. XÃ©t nghiá»‡m phÃ¡t hiá»‡n bá»‡nh cÃ³ Ä‘á»™ nháº¡y 99% (ngÆ°á»i bá»‡nh xÃ©t nghiá»‡m dÆ°Æ¡ng tÃ­nh 99%) vÃ  Ä‘á»™ Ä‘áº·c hiá»‡u 95% (ngÆ°á»i khÃ´ng bá»‡nh xÃ©t nghiá»‡m Ã¢m tÃ­nh 95%). Má»™t ngÆ°á»i Ä‘i xÃ©t nghiá»‡m nháº­n káº¿t quáº£ dÆ°Æ¡ng tÃ­nh. XÃ¡c suáº¥t ngÆ°á»i nÃ y thá»±c sá»± máº¯c bá»‡nh lÃ  bao nhiÃªu?",
                             "solution_steps":  [
                                                    "BÆ°á»›c 1: Gá»i D lÃ  biáº¿n cá»‘ máº¯c bá»‡nh: \\(P(D) = 0,001\\), \\(P(\\bar{D}) = 0,999\\).",
                                                    "BÆ°á»›c 2: Gá»i T+ lÃ  káº¿t quáº£ dÆ°Æ¡ng tÃ­nh: \\(P(T+|D) = 0,99\\), \\(P(T+|\\bar{D}) = 1 - 0,95 = 0,05\\).",
                                                    "BÆ°á»›c 3: XÃ¡c suáº¥t toÃ n pháº§n ra dÆ°Æ¡ng tÃ­nh: \\(P(T+) = 0,001(0,99) + 0,999(0,05) = 0,00099 + 0,04995 = 0,05094\\).",
                                                    "BÆ°á»›c 4: Ãp dá»¥ng Ä‘á»‹nh lÃ½ Bayes: \\(P(D|T+) = \\frac{0,00099}{0,05094} \\approx 1,94\\%\\)."
                                                ],
                             "takeaway":  "Máº·c dÃ¹ xÃ©t nghiá»‡m cÃ³ Ä‘á»™ chÃ­nh xÃ¡c 99%, xÃ¡c suáº¥t ngÆ°á»i dÆ°Æ¡ng tÃ­nh thá»±c sá»± máº¯c bá»‡nh chá»‰ ~2% do bá»‡nh quÃ¡ hiáº¿m (nghá»‹ch lÃ½ tá»· lá»‡ ná»n - Base Rate Fallacy)."
                         }
                     ],
        "applications":  "Bá»™ lá»c thÆ° rÃ¡c Naive Bayes Spam Filter, Ä‘Ã¡nh giÃ¡ rá»§i ro gian láº­n tÃ­n dá»¥ng ngÃ¢n hÃ ng, xÃ©t nghiá»‡m y táº¿ cháº©n Ä‘oÃ¡n lÃ¢m sÃ ng.",
        "drill_tags":  [
                           "XÃ¡c suáº¥t cÃ³ Ä‘iá»u kiá»‡n",
                           "Bayes",
                           "Tá»• há»£p"
                       ],
        "related_question_ids":  [
                                     "q_tsa_15",
                                     "q_hsa_16",
                                     "q_thpt_09"
                                 ]
    },
    {
        "id":  "kb_toan12_01",
        "grade":  "ToÃ¡n 12",
        "chapter":  "ChÆ°Æ¡ng 1: á»¨ng dá»¥ng Ä‘áº¡o hÃ m Ä‘á»ƒ kháº£o sÃ¡t hÃ m sá»‘",
        "title":  "Kháº£o sÃ¡t hÃ m sá»‘, Cá»±c trá»‹ \u0026 Tá»‘i Æ°u hÃ³a Thá»±c táº¿",
        "overview":  "Kháº£o sÃ¡t tÃ­nh Ä‘Æ¡n Ä‘iá»‡u, cá»±c trá»‹ hÃ m Ä‘a thá»©c báº­c 3, báº­c 4 trÃ¹ng phÆ°Æ¡ng, tiá»‡m cáº­n Ä‘á»“ thá»‹ vÃ  giáº£i quyáº¿t bÃ i toÃ¡n tá»‘i Æ°u hÃ³a á»©ng dá»¥ng thá»±c táº¿.",
        "theory_markdown":  "### 1. TÃ­nh Ä‘Æ¡n Ä‘iá»‡u \u0026 Cá»±c trá»‹ hÃ m sá»‘\n- HÃ m sá»‘ \\(y = f(x)\\) Ä‘á»“ng biáº¿n trÃªn \\(K \\iff f\u0027(x) \\ge 0, \\forall x \\in K\\) (dáº¥u \u0027=\u0027 chá»‰ xáº£y ra táº¡i há»¯u háº¡n Ä‘iá»ƒm).\n- **Quy táº¯c cá»±c trá»‹ 1**: Äá»•i dáº¥u tá»« dÆ°Æ¡ng sang Ã¢m qua \\(x_0\\) lÃ  Ä‘iá»ƒm cá»±c Ä‘áº¡i; tá»« Ã¢m sang dÆ°Æ¡ng lÃ  Ä‘iá»ƒm cá»±c tiá»ƒu.\n- **Quy táº¯c cá»±c trá»‹ 2**: \\(f\u0027(x_0) = 0\\) vÃ  \\(f\u0027\u0027(x_0) \u003c 0 \\implies x_0\\) lÃ  cá»±c Ä‘áº¡i; \\(f\u0027\u0027(x_0) \u003e 0 \\implies x_0\\) lÃ  cá»±c tiá»ƒu.\n\n### 2. CÃ´ng thá»©c tÃ­nh nhanh cá»±c trá»‹ hÃ m báº­c ba \\(y = ax^3 + bx^2 + cx + d\\)\n- Äáº¡o hÃ m: \\(y\u0027 = 3ax^2 + 2bx + c\\). HÃ m sá»‘ cÃ³ 2 cá»±c trá»‹ khi vÃ  chá»‰ khi \\(b^2 - 3ac \u003e 0\\).\n- ÄÆ°á»ng tháº³ng Ä‘i qua 2 Ä‘iá»ƒm cá»±c trá»‹: \\(y = \\left(\\frac{2c}{3} - \\frac{2b^2}{9a}\\right)x + \\left(d - \\frac{bc}{9a}\\right)\\).\n\n### 3. CÃ´ng thá»©c tÃ­nh nhanh cá»±c trá»‹ hÃ m trÃ¹ng phÆ°Æ¡ng \\(y = ax^4 + bx^2 + c\\)\n- CÃ³ 3 cá»±c trá»‹ \\(\\iff ab \u003c 0\\); CÃ³ 1 cá»±c trá»‹ \\(\\iff ab \\ge 0\\).\n- Tá»a Ä‘á»™ 3 cá»±c trá»‹ khi \\(ab \u003c 0\\): \\(A(0; c), B\\left(-\\sqrt{-\\frac{b}{2a}}; -\\frac{\\Delta}{4a}\\right), C\\left(\\sqrt{-\\frac{b}{2a}}; -\\frac{\\Delta}{4a}\\right)\\).\n- Diá»‡n tÃ­ch tam giÃ¡c cá»±c trá»‹: \\(S_{\\triangle ABC} = \\sqrt{-\\frac{b^5}{32a^3}}\\).",
        "formulas":  [
                         {
                             "id":  "kb_toan12_01_f1",
                             "name":  "Báº¥t Ä‘áº³ng thá»©c AM-GM 3 sá»‘",
                             "latex":  "a + b + c \\ge 3\\sqrt[3]{abc} \\quad (a, b, c \\ge 0)",
                             "desc":  "Ãp dá»¥ng tÃ¬m giÃ¡ trá»‹ nhá» nháº¥t cá»§a tá»•ng hoáº·c giÃ¡ trá»‹ lá»›n nháº¥t cá»§a tÃ­ch",
                             "tags":  [
                                          "Báº¥t Ä‘áº³ng thá»©c",
                                          "AM-GM",
                                          "Tá»‘i Æ°u"
                                      ]
                         },
                         {
                             "id":  "kb_toan12_01_f2",
                             "name":  "Äiá»u kiá»‡n cá»±c trá»‹ cáº¥p 2",
                             "latex":  "f\u0027(x_0) = 0, \\; f\u0027\u0027(x_0) \u003e 0 \\implies \\text{Cá»±c tiá»ƒu}; \\quad f\u0027(x_0) = 0, \\; f\u0027\u0027(x_0) \u003c 0 \\implies \\text{Cá»±c Ä‘áº¡i}",
                             "desc":  "TiÃªu chuáº©n Ä‘áº¡o hÃ m cáº¥p 2 xÃ¡c Ä‘á»‹nh nhanh Ä‘iá»ƒm cá»±c Ä‘áº¡i, cá»±c tiá»ƒu",
                             "tags":  [
                                          "Kháº£o sÃ¡t hÃ m sá»‘",
                                          "Cá»±c trá»‹"
                                      ]
                         },
                         {
                             "id":  "kb_toan12_01_f3",
                             "name":  "CÃ´ng thá»©c tÃ­nh nhanh cá»±c trá»‹ hÃ m báº­c 3",
                             "latex":  "y = ax^3 + bx^2 + cx + d \\implies \\text{CÃ³ 2 cá»±c trá»‹ } \\iff b^2 - 3ac \u003e 0; \\quad \\text{ÄÆ°á»ng tháº³ng qua 2 cá»±c trá»‹: } y = \\left(\\frac{2c}{3} - \\frac{2b^2}{9a}\\right)x + \\left(d - \\frac{bc}{9a}\\right)",
                             "desc":  "Äiá»u kiá»‡n cÃ³ 2 cá»±c trá»‹ vÃ  phÆ°Æ¡ng trÃ¬nh Ä‘Æ°á»ng tháº³ng Ä‘i qua 2 Ä‘iá»ƒm cá»±c trá»‹ cá»§a hÃ m báº­c 3",
                             "tags":  [
                                          "HÃ m sá»‘",
                                          "Cá»±c trá»‹",
                                          "HÃ m báº­c 3"
                                      ]
                         },
                         {
                             "id":  "kb_toan12_01_f4",
                             "name":  "CÃ´ng thá»©c tÃ­nh nhanh cá»±c trá»‹ hÃ m trÃ¹ng phÆ°Æ¡ng",
                             "latex":  "y = ax^4 + bx^2 + c \\implies \\text{3 cá»±c trá»‹ } \\iff ab \u003c 0; \\quad \\text{1 cá»±c trá»‹ } \\iff ab \\ge 0; \\quad S_{\\triangle ABC} = \\sqrt{-\\frac{b^5}{32a^3}}",
                             "desc":  "Äiá»u kiá»‡n sá»‘ lÆ°á»£ng Ä‘iá»ƒm cá»±c trá»‹ vÃ  diá»‡n tÃ­ch tam giÃ¡c táº¡o bá»Ÿi 3 Ä‘iá»ƒm cá»±c trá»‹ hÃ m trÃ¹ng phÆ°Æ¡ng",
                             "tags":  [
                                          "HÃ m sá»‘",
                                          "Cá»±c trá»‹",
                                          "HÃ m trÃ¹ng phÆ°Æ¡ng"
                                      ]
                         }
                     ],
        "formula_ids":  [
                            "kb_toan12_01_f1",
                            "kb_toan12_01_f2",
                            "kb_toan12_01_f3",
                            "kb_toan12_01_f4"
                        ],
        "prerequisites":  [
                              "kb_toan11_04"
                          ],
        "related_topics":  [
                               "kb_toan12_02"
                           ],
        "common_traps":  [
                             "Nháº§m láº«n giá»¯a \u0027Äiá»ƒm cá»±c trá»‹ cá»§a hÃ m sá»‘\u0027 (x) vÃ  \u0027Cá»±c trá»‹ cá»§a hÃ m sá»‘\u0027 (y)",
                             "QuÃªn kiá»ƒm tra Ä‘áº¡o hÃ m Ä‘á»•i dáº¥u khi f\u0027(x) = 0 cÃ³ nghiá»‡m bá»™i cháºµn"
                         ],
        "examples":  [
                         {
                             "title":  "VÃ­ dá»¥ 1: Tá»‘i Æ°u dung tÃ­ch há»™p khÃ´ng náº¯p",
                             "question":  "Tá»« má»™t táº¥m tÃ´n hÃ¬nh vuÃ´ng cáº¡nh 60 cm, ngÆ°á»i ta cáº¯t bá» 4 hÃ¬nh vuÃ´ng báº±ng nhau á»Ÿ 4 gÃ³c rá»“i gáº­p mÃ©p lÃªn Ä‘á»ƒ hÃ n thÃ nh má»™t cÃ¡i há»™p chá»¯ nháº­t khÃ´ng náº¯p. TÃ¬m cáº¡nh hÃ¬nh vuÃ´ng bá»‹ cáº¯t Ä‘á»ƒ thá»ƒ tÃ­ch há»™p lá»›n nháº¥t.",
                             "solution_steps":  [
                                                    "BÆ°á»›c 1: Gá»i cáº¡nh hÃ¬nh vuÃ´ng bá»‹ cáº¯t lÃ  \\(x\\) (cm, \\(0 \u003c x \u003c 30\\)).",
                                                    "BÆ°á»›c 2: KÃ­ch thÆ°á»›c Ä‘Ã¡y: \\(60 - 2x\\), chiá»u cao: \\(x\\). Thá»ƒ tÃ­ch: \\(V(x) = x(60 - 2x)^2 = 4x(30 - x)^2\\).",
                                                    "BÆ°á»›c 3: DÃ¹ng AM-GM: \\(4x(30 - x)^2 = 2 \\cdot (2x)(30 - x)(30 - x) \\le 2 \\cdot \\left(\\frac{2x + 30 - x + 30 - x}{3}\\right)^3 = 2 \\cdot 20^3 = 16.000\\text{ cm}^3\\).",
                                                    "BÆ°á»›c 4: Dáº¥u báº±ng khi \\(2x = 30 - x \\iff x = 10\\text{ cm}\\)."
                                                ],
                             "takeaway":  "Ká»¹ thuáº­t cÃ¢n báº±ng há»‡ sá»‘ trong AM-GM giÃºp tÃ¬m cá»±c trá»‹ hÃ¬nh há»c nhanh chÃ³ng mÃ  khÃ´ng cáº§n Ä‘áº¡o hÃ m."
                         }
                     ],
        "applications":  "Tá»‘i Æ°u hÃ³a bao bÃ¬ sáº£n pháº©m cÃ´ng nghiá»‡p (giáº£m tiÃªu hao nguyÃªn váº­t liá»‡u), Ä‘á»‹nh giÃ¡ Ä‘á»™ng tá»‘i Ä‘a hÃ³a doanh thu trong kinh táº¿ há»c vÃ  thiáº¿t káº¿ khÃ­ Ä‘á»™ng há»c cÃ¡nh mÃ¡y bay.",
        "drill_tags":  [
                           "Cá»±c trá»‹",
                           "Kháº£o sÃ¡t hÃ m sá»‘",
                           "Tá»‘i Æ°u hÃ³a",
                           "HÃ m trÃ¹ng phÆ°Æ¡ng"
                       ],
        "related_question_ids":  [
                                     "q_tsa_01",
                                     "q_hsa_01",
                                     "q_thpt_01"
                                 ]
    },
    {
        "id":  "kb_toan12_02",
        "grade":  "ToÃ¡n 12",
        "chapter":  "ChÆ°Æ¡ng 2: HÃ m sá»‘ LÅ©y thá»«a, MÅ© \u0026 Logarit",
        "title":  "HÃ m sá»‘ LÅ©y thá»«a, MÅ© \u0026 Logarit Thá»±c chiáº¿n",
        "overview":  "Há»‡ thá»‘ng quy táº¯c logarit toÃ n táº­p, phÆ°Æ¡ng trÃ¬nh mÅ© - logarit, Ä‘áº¡o hÃ m, Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh vÃ  mÃ´ hÃ¬nh tÄƒng trÆ°á»Ÿng lÅ©y thá»«a thá»±c táº¿.",
        "theory_markdown":  "### 1. Há»‡ thá»‘ng quy táº¯c Logarit toÃ n diá»‡n\nÄiá»u kiá»‡n: \\(a, b \u003e 0, a \\ne 1\\), \\(x, y \u003e 0\\):\n- \\(\\log_a(xy) = \\log_a x + \\log_a y\\)\n- \\(\\log_a\\left(\\frac{x}{y}\\right) = \\log_a x - \\log_a y\\)\n- \\(\\log_a(x^\\alpha) = \\alpha\\log_a x\\)\n- \\(\\log_{a^\\beta} x = \\frac{1}{\\beta}\\log_a x\\)\n- **Äá»•i cÆ¡ sá»‘**: \\(\\log_a b = \\frac{\\log_c b}{\\log_c a}\\) \\((c \u003e 0, c \\ne 1)\\)\n- **Äáº³ng thá»©c mÅ© - logarit**: \\(a^{\\log_b c} = c^{\\log_b a}\\)\n\n### 2. Äáº¡o hÃ m hÃ m sá»‘ MÅ© vÃ  Logarit\n- \\((a^x)\u0027 = a^x \\ln a\\); \\((e^x)\u0027 = e^x\\); \\((a^u)\u0027 = u\u0027 \\cdot a^u \\ln a\\).\n- \\((\\log_a |x|)\u0027 = \\frac{1}{x \\ln a}\\); \\((\\ln |x|)\u0027 = \\frac{1}{x}\\); \\((\\ln |u|)\u0027 = \\frac{u\u0027}{u}\\).\n\n### 3. PhÆ°Æ¡ng trÃ¬nh \u0026 Báº¥t phÆ°Æ¡ng trÃ¬nh MÅ© - Logarit cÆ¡ báº£n\n- \\(a^x = b \\iff x = \\log_a b\\) (vá»›i \\(b \u003e 0\\)).\n- \\(\\log_a x = b \\iff x = a^b\\).\n- Báº¥t phÆ°Æ¡ng trÃ¬nh \\(\\log_a f(x) \u003e \\log_a g(x)\\):\n  - Náº¿u \\(a \u003e 1\\): \\(f(x) \u003e g(x) \u003e 0\\) (cÃ¹ng chiá»u).\n  - Náº¿u \\(0 \u003c a \u003c 1\\): \\(0 \u003c f(x) \u003c g(x)\\) (Ä‘á»•i chiá»u).",
        "formulas":  [
                         {
                             "id":  "kb_toan12_02_f1",
                             "name":  "Chu ká»³ bÃ¡n rÃ£ phÃ³ng xáº¡",
                             "latex":  "N(t) = N_0 \\cdot e^{-\\lambda t} = N_0 \\cdot 2^{-t/T}",
                             "desc":  "MÃ´ hÃ¬nh suy giáº£m mÅ© trong váº­t lÃ½ háº¡t nhÃ¢n vá»›i chu ká»³ bÃ¡n rÃ£ T",
                             "tags":  [
                                          "MÅ©",
                                          "PhÃ³ng xáº¡",
                                          "á»¨ng dá»¥ng"
                                      ]
                         },
                         {
                             "id":  "kb_toan12_02_f2",
                             "name":  "Äá»•i cÆ¡ sá»‘ Logarit toÃ n diá»‡n",
                             "latex":  "\\log_a b = \\frac{\\log_c b}{\\log_c a}, \\quad \\log_{a^\\alpha} b = \\frac{1}{\\alpha}\\log_a b, \\quad \\log_a(b^\\beta) = \\beta\\log_a b",
                             "desc":  "Biáº¿n Ä‘á»•i cÆ¡ sá»‘ logarit sang cÆ¡ sá»‘ má»›i phá»¥c vá»¥ giáº£i phÆ°Æ¡ng trÃ¬nh",
                             "tags":  [
                                          "Logarit",
                                          "Äá»•i cÆ¡ sá»‘"
                                      ]
                         },
                         {
                             "id":  "kb_toan12_02_f3",
                             "name":  "Há»‡ thá»‘ng háº±ng Ä‘áº³ng thá»©c Logarit cá»‘t lÃµi",
                             "latex":  "\\log_a(xy) = \\log_a x + \\log_a y, \\quad \\log_a\\left(\\frac{x}{y}\\right) = \\log_a x - \\log_a y, \\quad a^{\\log_b c} = c^{\\log_b a} \\; (a, b \\ne 1; x, y, c \u003e 0)",
                             "desc":  "CÃ¡c quy táº¯c biáº¿n Ä‘á»•i logarit cá»§a tÃ­ch, thÆ°Æ¡ng, lÅ©y thá»«a vÃ  hoÃ¡n vá»‹ cÆ¡ sá»‘ lÅ©y thá»«a",
                             "tags":  [
                                          "Logarit",
                                          "LÅ©y thá»«a",
                                          "Quy táº¯c"
                                      ]
                         },
                         {
                             "id":  "kb_toan12_02_f4",
                             "name":  "Äáº¡o hÃ m hÃ m sá»‘ MÅ© vÃ  Logarit",
                             "latex":  "(a^x)\u0027 = a^x \\ln a, \\quad (e^x)\u0027 = e^x, \\quad (\\log_a |x|)\u0027 = \\frac{1}{x \\ln a}, \\quad (\\ln |x|)\u0027 = \\frac{1}{x}",
                             "desc":  "Quy táº¯c Ä‘áº¡o hÃ m chuáº©n xÃ¡c cá»§a hÃ m mÅ© vÃ  hÃ m logarit vá»›i cÆ¡ sá»‘ báº¥t ká»³",
                             "tags":  [
                                          "Äáº¡o hÃ m",
                                          "HÃ m mÅ©",
                                          "Logarit"
                                      ]
                         }
                     ],
        "formula_ids":  [
                            "kb_toan12_02_f1",
                            "kb_toan12_02_f2",
                            "kb_toan12_02_f3",
                            "kb_toan12_02_f4"
                        ],
        "prerequisites":  [
                              "kb_toan11_02"
                          ],
        "related_topics":  [
                               "kb_toan12_03"
                           ],
        "common_traps":  [
                             "QuÃªn Ä‘áº·t Ä‘iá»u kiá»‡n xÃ¡c Ä‘á»‹nh cho biá»ƒu thá»©c trong logarit (biá»ƒu thá»©c pháº£i thá»±c sá»± \u003e 0)",
                             "QuÃªn Ä‘á»•i chiá»u báº¥t phÆ°Æ¡ng trÃ¬nh khi cÆ¡ sá»‘ 0 \u003c a \u003c 1"
                         ],
        "examples":  [
                         {
                             "title":  "VÃ­ dá»¥ 1: MÃ´ hÃ¬nh tÄƒng trÆ°á»Ÿng vi khuáº©n",
                             "question":  "Sá»‘ lÆ°á»£ng vi khuáº©n sau \\(t\\) giá» tuÃ¢n theo \\(N(t) = 500 \\cdot e^{0,4t}\\). Sau bao lÃ¢u sá»‘ lÆ°á»£ng vi khuáº©n Ä‘áº¡t 10.000 con?",
                             "solution_steps":  [
                                                    "BÆ°á»›c 1: Thiáº¿t láº­p phÆ°Æ¡ng trÃ¬nh: \\(500 \\cdot e^{0,4t} = 10.000\\).",
                                                    "BÆ°á»›c 2: RÃºt gá»n: \\(e^{0,4t} = 20\\).",
                                                    "BÆ°á»›c 3: Láº¥y logarit tá»± nhiÃªn hai váº¿: \\(0,4t = \\ln 20 \\implies t = \\frac{\\ln 20}{0,4} \\approx \\frac{2,9957}{0,4} \\approx 7,49\\text{ giá»}\\)."
                                                ],
                             "takeaway":  "Láº¥y logarit tá»± nhiÃªn hai váº¿ Ä‘á»ƒ háº¡ sá»‘ mÅ© xuá»‘ng tuyáº¿n tÃ­nh."
                         }
                     ],
        "applications":  "MÃ´ hÃ¬nh tÃ­nh Ä‘á»™ pH dung dá»‹ch trong hÃ³a há»c, thang Ä‘o cÆ°á»ng Ä‘á»™ Ä‘á»™ng Ä‘áº¥t Richter, mÃ´ hÃ¬nh truyá»n thÃ´ng tin lan truyá»n máº¡ng xÃ£ há»™i.",
        "drill_tags":  [
                           "Logarit",
                           "HÃ m sá»‘ mÅ©",
                           "TÄƒng trÆ°á»Ÿng",
                           "Äá»•i cÆ¡ sá»‘"
                       ],
        "related_question_ids":  [
                                     "q_tsa_03",
                                     "q_hsa_02",
                                     "q_thpt_02"
                                 ]
    },
    {
        "id":  "kb_toan12_03",
        "grade":  "ToÃ¡n 12",
        "chapter":  "ChÆ°Æ¡ng 3: NguyÃªn hÃ m, TÃ­ch phÃ¢n \u0026 á»¨ng dá»¥ng",
        "title":  "TÃ­ch phÃ¢n toÃ n diá»‡n \u0026 Ká»¹ thuáº­t MÃºa cá»™t DI Method",
        "overview":  "Báº£ng nguyÃªn hÃ m chuáº©n 10 hÃ m cÆ¡ báº£n, tÃ­ch phÃ¢n tá»«ng pháº§n (phÆ°Æ¡ng phÃ¡p sÆ¡ Ä‘á»“ mÃºa cá»™t DI), tÃ­nh diá»‡n tÃ­ch hÃ¬nh pháº³ng vÃ  thá»ƒ tÃ­ch khá»‘i trÃ²n xoay.",
        "theory_markdown":  "### 1. Báº£ng nguyÃªn hÃ m cÆ¡ báº£n trá»ng tÃ¢m\n- \\(\\int x^\\alpha dx = \\frac{x^{\\alpha+1}}{\\alpha+1} + C\\) \\((\\alpha \\ne -1)\\)\n- \\(\\int \\frac{1}{x} dx = \\ln|x| + C\\)\n- \\(\\int e^x dx = e^x + C\\); \\(\\int a^x dx = \\frac{a^x}{\\ln a} + C\\)\n- \\(\\int \\cos x dx = \\sin x + C\\); \\(\\int \\sin x dx = -\\cos x + C\\)\n- \\(\\int \\frac{1}{\\cos^2 x} dx = \\tan x + C\\); \\(\\int \\frac{1}{\\sin^2 x} dx = -\\cot x + C\\)\n\n### 2. TÃ­ch phÃ¢n tá»«ng pháº§n \u0026 PhÆ°Æ¡ng phÃ¡p mÃºa cá»™t DI\n- CÃ´ng thá»©c chuáº©n: \\(\\int u dv = uv - \\int v du\\).\n- **PhÆ°Æ¡ng phÃ¡p mÃºa cá»™t (D-I Method)**:\n  - Cá»™t D (Äáº¡o hÃ m): Chá»n hÃ m theo thá»© tá»± \u0027Nháº¥t lÃ´, nhÃ¬ Ä‘a, tam lÆ°á»£ng, tá»© mÅ©\u0027. Äáº¡o hÃ m Ä‘áº¿n 0 (náº¿u lÃ  Ä‘a thá»©c) hoáº·c Ä‘áº¿n dÃ²ng láº·p láº¡i.\n  - Cá»™t I (NguyÃªn hÃ m): Láº¥y nguyÃªn hÃ m liÃªn tiáº¿p.\n  - GhÃ©p tÃ­ch Ä‘Æ°á»ng chÃ©o vá»›i dáº¥u Ä‘an xen: \\(+ - + - \\dots\\)\n\n### 3. á»¨ng dá»¥ng hÃ¬nh há»c cá»§a TÃ­ch phÃ¢n\n- **Diá»‡n tÃ­ch hÃ¬nh pháº³ng**: \\(S = \\int_a^b |f(x) - g(x)| dx\\).\n- **Thá»ƒ tÃ­ch khá»‘i trÃ²n xoay quay quanh Ox**: \\(V = \\pi \\int_a^b [f(x)]^2 dx\\).",
        "formulas":  [
                         {
                             "id":  "kb_toan12_03_f1",
                             "name":  "CÃ´ng thá»©c tÃ­ch phÃ¢n tá»«ng pháº§n (Integration by Parts)",
                             "latex":  "\\int_a^b u\\,dv = uv\\Big|_a^b - \\int_a^b v\\,du",
                             "desc":  "Thá»© tá»± Æ°u tiÃªn Ä‘áº·t u: \u0027Nháº¥t lÃ´ (logarit), nhÃ¬ Ä‘a (Ä‘a thá»©c), tam lÆ°á»£ng (lÆ°á»£ng giÃ¡c), tá»© mÅ© (hÃ m mÅ©)\u0027",
                             "tags":  [
                                          "TÃ­ch phÃ¢n",
                                          "Tá»«ng pháº§n"
                                      ]
                         },
                         {
                             "id":  "kb_toan12_03_f2",
                             "name":  "Thá»ƒ tÃ­ch khá»‘i trÃ²n xoay quanh Ox",
                             "latex":  "V = \\pi \\int_a^b [f(x)]^2\\,dx",
                             "desc":  "Thá»ƒ tÃ­ch váº­t thá»ƒ trÃ²n xoay khi quay hÃ¬nh pháº³ng giá»›i háº¡n bá»Ÿi y = f(x) quanh trá»¥c hoÃ nh",
                             "tags":  [
                                          "TÃ­ch phÃ¢n",
                                          "Thá»ƒ tÃ­ch",
                                          "TrÃ²n xoay"
                                      ]
                         },
                         {
                             "id":  "kb_toan12_03_f3",
                             "name":  "Báº£ng nguyÃªn hÃ m chuáº©n 10 hÃ m cÆ¡ báº£n",
                             "latex":  "\\int x^\\alpha dx = \\frac{x^{\\alpha+1}}{\\alpha+1} + C \\; (\\alpha \\ne -1), \\quad \\int \\frac{1}{x} dx = \\ln|x| + C, \\quad \\int e^x dx = e^x + C, \\quad \\int \\cos x dx = \\sin x + C, \\quad \\int \\sin x dx = -\\cos x + C",
                             "desc":  "Báº£ng cÃ¡c nguyÃªn hÃ m sÆ¡ cáº¥p ná»n táº£ng khÃ´ng thá»ƒ thiáº¿u trong má»i bÃ i toÃ¡n giáº£i tÃ­ch",
                             "tags":  [
                                          "NguyÃªn hÃ m",
                                          "TÃ­ch phÃ¢n",
                                          "Báº£ng chuáº©n"
                                      ]
                         },
                         {
                             "id":  "kb_toan12_03_f4",
                             "name":  "Diá»‡n tÃ­ch hÃ¬nh pháº³ng giá»›i háº¡n bá»Ÿi Ä‘á»“ thá»‹",
                             "latex":  "S = \\int_a^b |f(x) - g(x)| dx",
                             "desc":  "á»¨ng dá»¥ng hÃ¬nh há»c cá»§a tÃ­ch phÃ¢n xÃ¡c Ä‘á»‹nh tÃ­nh diá»‡n tÃ­ch giá»¯a hai Ä‘Æ°á»ng cong cong",
                             "tags":  [
                                          "TÃ­ch phÃ¢n",
                                          "Diá»‡n tÃ­ch",
                                          "á»¨ng dá»¥ng"
                                      ]
                         }
                     ],
        "formula_ids":  [
                            "kb_toan12_03_f1",
                            "kb_toan12_03_f2",
                            "kb_toan12_03_f3",
                            "kb_toan12_03_f4"
                        ],
        "prerequisites":  [
                              "kb_toan12_02"
                          ],
        "related_topics":  [
                               "kb_toan12_04",
                               "kb_gt1_03"
                           ],
        "common_traps":  [
                             "QuÃªn nhÃ¢n sá»‘ pi trong cÃ´ng thá»©c tÃ­nh thá»ƒ tÃ­ch khá»‘i trÃ²n xoay V = pi * tÃ­ch phÃ¢n (f(x))^2 dx",
                             "QuÃªn Ä‘Ã³ng dáº¥u trá»‹ tuyá»‡t Ä‘á»‘i khi tÃ­nh diá»‡n tÃ­ch hÃ¬nh pháº³ng cÃ³ pháº§n náº±m dÆ°á»›i trá»¥c hoÃ nh"
                         ],
        "examples":  [
                         {
                             "title":  "VÃ­ dá»¥ 1: TÃ­nh tÃ­ch phÃ¢n tá»«ng pháº§n báº±ng sÆ¡ Ä‘á»“ cá»™t",
                             "question":  "TÃ­nh tÃ­ch phÃ¢n \\(I = \\int_0^1 (2x + 1)e^x\\,dx\\).",
                             "solution_steps":  [
                                                    "BÆ°á»›c 1: Láº­p sÆ¡ Ä‘á»“ mÃºa cá»™t DI:",
                                                    "Cá»™t D: \\(2x + 1 \\to 2 \\to 0\\).",
                                                    "Cá»™t I: \\(e^x \\to e^x \\to e^x\\).",
                                                    "BÆ°á»›c 2: GhÃ©p Ä‘Æ°á»ng chÃ©o Ä‘an dáº¥u:",
                                                    "\\(I = \\left[(2x + 1)e^x - 2e^x\\right]_0^1 = \\left[(2x - 1)e^x\\right]_0^1\\).",
                                                    "BÆ°á»›c 3: Thay cáº­n: \\((2 - 1)e^1 - (-1)e^0 = e + 1\\)."
                                                ],
                             "takeaway":  "Ká»¹ thuáº­t mÃºa cá»™t giáº£i quyáº¿t tÃ­ch phÃ¢n Ä‘a thá»©c nhÃ¢n mÅ©/lÆ°á»£ng giÃ¡c chá»‰ trong 10 giÃ¢y."
                         }
                     ],
        "applications":  "TÃ­nh trá»ng tÃ¢m váº­t thá»ƒ khÃ´ng Ä‘á»“ng nháº¥t, tÃ­nh cÃ´ng cÆ¡ há»c cá»§a lá»±c biáº¿n thiÃªn, Æ°á»›c lÆ°á»£ng diá»‡n tÃ­ch há»“ chá»©a thá»§y Ä‘iá»‡n qua dá»¯ liá»‡u Ä‘o sÃ¢u.",
        "drill_tags":  [
                           "TÃ­ch phÃ¢n",
                           "NguyÃªn hÃ m",
                           "MÃºa cá»™t",
                           "Thá»ƒ tÃ­ch"
                       ],
        "related_question_ids":  [
                                     "q_tsa_05",
                                     "q_hsa_05",
                                     "q_thpt_04"
                                 ]
    },
    {
        "id":  "kb_toan12_04",
        "grade":  "ToÃ¡n 12",
        "chapter":  "ChÆ°Æ¡ng 4: PhÆ°Æ¡ng phÃ¡p Tá»a Ä‘á»™ KhÃ´ng gian Oxyz",
        "title":  "PhÆ°Æ¡ng phÃ¡p Tá»a Ä‘á»™ KhÃ´ng gian Oxyz ToÃ n diá»‡n",
        "overview":  "TÃ­ch cÃ³ hÆ°á»›ng cá»§a 2 vectÆ¡, phÆ°Æ¡ng trÃ¬nh máº·t pháº³ng, phÆ°Æ¡ng trÃ¬nh Ä‘Æ°á»ng tháº³ng, máº·t cáº§u, khoáº£ng cÃ¡ch 2 Ä‘Æ°á»ng tháº³ng chÃ©o nhau vÃ  bá»™ cÃ´ng thá»©c khá»‘i trÃ²n xoay.",
        "theory_markdown":  "### 1. Tá»a Ä‘á»™ VectÆ¡ \u0026 TÃ­ch cÃ³ hÆ°á»›ng\nCho \\(\\vec{u} = (x_1, y_1, z_1)\\) vÃ  \\(\\vec{v} = (x_2, y_2, z_2)\\):\n- TÃ­ch vÃ´ hÆ°á»›ng: \\(\\vec{u} \\cdot \\vec{v} = x_1x_2 + y_1y_2 + z_1z_2\\).\n- TÃ­ch cÃ³ hÆ°á»›ng: \\([\\vec{u}, \\vec{v}] = (y_1z_2 - z_1y_2; z_1x_2 - x_1z_2; x_1y_2 - y_1x_2)\\).\n- á»¨ng dá»¥ng tÃ­ch cÃ³ hÆ°á»›ng:\n  - Diá»‡n tÃ­ch tam giÃ¡c: \\(S_{\\triangle ABC} = \\frac{1}{2}|[\\vec{AB}, \\vec{AC}]|\\).\n  - Thá»ƒ tÃ­ch tá»© diá»‡n: \\(V_{ABCD} = \\frac{1}{6}|[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}|\\).\n\n### 2. Khoáº£ng cÃ¡ch trong khÃ´ng gian Oxyz\n- Khoáº£ng cÃ¡ch tá»« Ä‘iá»ƒm \\(M_0(x_0, y_0, z_0)\\) Ä‘áº¿n máº·t pháº³ng \\((P): Ax + By + Cz + D = 0\\):\n  \\[d(M_0, (P)) = \\frac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}\\]\n- Khoáº£ng cÃ¡ch giá»¯a 2 Ä‘Æ°á»ng tháº³ng chÃ©o nhau \\(\\Delta_1\\) (qua \\(M_1\\), VTCP \\(\\vec{u}_1\\)) vÃ  \\(\\Delta_2\\) (qua \\(M_2\\), VTCP \\(\\vec{u}_2\\)):\n  \\[d(\\Delta_1, \\Delta_2) = \\frac{|[\\vec{u}_1, \\vec{u}_2] \\cdot \\vec{M_1 M_2}|}{|[\\vec{u}_1, \\vec{u}_2]|}\\]\n\n### 3. Máº·t cáº§u \u0026 Khá»‘i trÃ²n xoay\n- PhÆ°Æ¡ng trÃ¬nh máº·t cáº§u tÃ¢m \\(I(a, b, c)\\) bÃ¡n kÃ­nh \\(R\\):\n  \\((x - a)^2 + (y - b)^2 + (z - c)^2 = R^2\\).\n- Thá»ƒ tÃ­ch vÃ  diá»‡n tÃ­ch cÃ¡c khá»‘i trÃ²n xoay:\n  - NÃ³n: \\(V = \\frac{1}{3}\\pi r^2 h\\), \\(S_{xq} = \\pi r l\\) (vá»›i \\(l = \\sqrt{r^2 + h^2}\\)).\n  - Trá»¥: \\(V = \\pi r^2 h\\), \\(S_{xq} = 2\\pi r h\\).\n  - Cáº§u: \\(V = \\frac{4}{3}\\pi R^3\\), \\(S = 4\\pi R^2\\).",
        "formulas":  [
                         {
                             "id":  "kb_toan12_04_f1",
                             "name":  "Khoáº£ng cÃ¡ch tá»« Ä‘iá»ƒm Ä‘áº¿n máº·t pháº³ng",
                             "latex":  "d(M_0, (P)) = \\frac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}",
                             "desc":  "TÃ­nh khoáº£ng cÃ¡ch tá»« Ä‘iá»ƒm M0(x0, y0, z0) Ä‘áº¿n máº·t pháº³ng (P): Ax + By + Cz + D = 0",
                             "tags":  [
                                          "Tá»a Ä‘á»™ Oxyz",
                                          "Khoáº£ng cÃ¡ch",
                                          "Máº·t pháº³ng"
                                      ]
                         },
                         {
                             "id":  "kb_toan12_04_f2",
                             "name":  "Thá»ƒ tÃ­ch khá»‘i tá»© diá»‡n (Oxyz)",
                             "latex":  "V_{ABCD} = \\frac{1}{6}|[\\vec{AB}, \\vec{AC}] \\cdot \\vec{AD}|",
                             "desc":  "TÃ­nh thá»ƒ tÃ­ch khá»‘i tá»© diá»‡n thÃ´ng qua tÃ­ch cÃ³ hÆ°á»›ng vÃ  tÃ­ch vÃ´ hÆ°á»›ng há»—n táº¡p",
                             "tags":  [
                                          "Tá»a Ä‘á»™ Oxyz",
                                          "Thá»ƒ tÃ­ch",
                                          "Tá»© diá»‡n"
                                      ]
                         },
                         {
                             "id":  "kb_toan12_04_f3",
                             "name":  "TÃ­ch cÃ³ hÆ°á»›ng cá»§a 2 vectÆ¡ \u0026 á»¨ng dá»¥ng Oxyz",
                             "latex":  "[\\vec{u}, \\vec{v}] = \\left(y_1 z_2 - z_1 y_2; \\; z_1 x_2 - x_1 z_2; \\; x_1 y_2 - y_1 x_2\\right), \\quad S_{\\triangle ABC} = \\frac{1}{2}\\left|[\\vec{AB}, \\vec{AC}]\\right|",
                             "desc":  "CÃ´ng thá»©c tá»a Ä‘á»™ tÃ­ch cÃ³ hÆ°á»›ng hai vectÆ¡ vÃ  á»©ng dá»¥ng tÃ­nh diá»‡n tÃ­ch tam giÃ¡c khÃ´ng gian",
                             "tags":  [
                                          "Tá»a Ä‘á»™ Oxyz",
                                          "TÃ­ch cÃ³ hÆ°á»›ng",
                                          "VectÆ¡"
                                      ]
                         },
                         {
                             "id":  "kb_toan12_04_f4",
                             "name":  "Khoáº£ng cÃ¡ch giá»¯a hai Ä‘Æ°á»ng tháº³ng chÃ©o nhau",
                             "latex":  "d(\\Delta_1, \\Delta_2) = \\frac{\\left|[\\vec{u}_1, \\vec{u}_2] \\cdot \\vec{M_1 M_2}\\right|}{\\left|[\\vec{u}_1, \\vec{u}_2]\\right|}",
                             "desc":  "TÃ­nh khoáº£ng cÃ¡ch ngáº¯n nháº¥t giá»¯a hai Ä‘Æ°á»ng tháº³ng chÃ©o nhau trong khÃ´ng gian Oxyz",
                             "tags":  [
                                          "Tá»a Ä‘á»™ Oxyz",
                                          "Khoáº£ng cÃ¡ch",
                                          "ÄÆ°á»ng tháº³ng chÃ©o nhau"
                                      ]
                         },
                         {
                             "id":  "kb_toan12_04_f5",
                             "name":  "PhÆ°Æ¡ng trÃ¬nh máº·t cáº§u trong khÃ´ng gian Oxyz",
                             "latex":  "(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2 \\iff x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0 \\quad (R = \\sqrt{a^2 + b^2 + c^2 - d} \u003e 0)",
                             "desc":  "PhÆ°Æ¡ng trÃ¬nh chÃ­nh táº¯c vÃ  dáº¡ng tá»•ng quÃ¡t cá»§a máº·t cáº§u tÃ¢m I(a,b,c) bÃ¡n kÃ­nh R",
                             "tags":  [
                                          "Tá»a Ä‘á»™ Oxyz",
                                          "Máº·t cáº§u"
                                      ]
                         },
                         {
                             "id":  "kb_toan12_04_f6",
                             "name":  "Bá»™ cÃ´ng thá»©c Thá»ƒ tÃ­ch \u0026 Diá»‡n tÃ­ch cÃ¡c khá»‘i trÃ²n xoay",
                             "latex":  "\\text{NÃ³n: } V = \\frac{1}{3}\\pi r^2 h, \\; S_{xq} = \\pi r l; \\quad \\text{Trá»¥: } V = \\pi r^2 h, \\; S_{xq} = 2\\pi r h; \\quad \\text{Cáº§u: } V = \\frac{4}{3}\\pi R^3, \\; S = 4\\pi R^2",
                             "desc":  "ToÃ n bá»™ cÃ´ng thá»©c diá»‡n tÃ­ch xung quanh, toÃ n pháº§n vÃ  thá»ƒ tÃ­ch khá»‘i nÃ³n, khá»‘i trá»¥ vÃ  máº·t cáº§u",
                             "tags":  [
                                          "HÃ¬nh há»c khÃ´ng gian",
                                          "Thá»ƒ tÃ­ch",
                                          "TrÃ²n xoay"
                                      ]
                         }
                     ],
        "formula_ids":  [
                            "kb_toan12_04_f1",
                            "kb_toan12_04_f2",
                            "kb_toan12_04_f3",
                            "kb_toan12_04_f4",
                            "kb_toan12_04_f5",
                            "kb_toan12_04_f6"
                        ],
        "prerequisites":  [
                              "kb_toan10_04"
                          ],
        "related_topics":  [
                               "kb_dstt_04"
                           ],
        "common_traps":  [
                             "QuÃªn Ä‘á»•i dáº¥u tá»a Ä‘á»™ tÃ¢m máº·t cáº§u khi Ä‘á»c tá»« dáº¡ng tá»•ng quÃ¡t (chia há»‡ sá»‘ cho -2)",
                             "Nháº§m láº«n giá»¯a Ä‘Æ°á»ng sinh l vÃ  chiá»u cao h cá»§a hÃ¬nh nÃ³n (l^2 = h^2 + r^2)"
                         ],
        "examples":  [
                         {
                             "title":  "VÃ­ dá»¥ 1: TÃ­nh khoáº£ng cÃ¡ch tá»« Ä‘iá»ƒm Ä‘áº¿n máº·t pháº³ng",
                             "question":  "Trong khÃ´ng gian Oxyz, tÃ­nh khoáº£ng cÃ¡ch tá»« \\(A(1, -2, 3)\\) Ä‘áº¿n máº·t pháº³ng \\((P): 2x - 2y + z - 6 = 0\\).",
                             "solution_steps":  [
                                                    "BÆ°á»›c 1: Thay tá»a Ä‘á»™ Ä‘iá»ƒm A vÃ o váº¿ trÃ¡i phÆ°Æ¡ng trÃ¬nh máº·t pháº³ng: \\(2(1) - 2(-2) + 3 - 6 = 2 + 4 + 3 - 6 = 3\\).",
                                                    "BÆ°á»›c 2: Äá»™ dÃ i vectÆ¡ phÃ¡p tuyáº¿n: \\(|\\vec{n}| = \\sqrt{2^2 + (-2)^2 + 1^2} = \\sqrt{4 + 4 + 1} = 3\\).",
                                                    "BÆ°á»›c 3: Khoáº£ng cÃ¡ch: \\(d = \\frac{|3|}{3} = 1\\)."
                                                ],
                             "takeaway":  "Ghi nhá»› cÃ´ng thá»©c khoáº£ng cÃ¡ch chuáº©n: thay tá»a Ä‘á»™ vÃ o tá»­ sá»‘ láº¥y trá»‹ tuyá»‡t Ä‘á»‘i, chia cho Ä‘á»™ dÃ i VTPT."
                         }
                     ],
        "applications":  "Dáº«n Ä‘Æ°á»ng tÃªn lá»­a vÃ  Ä‘á»‹nh vá»‹ quá»¹ Ä‘áº¡o vá»‡ tinh GPS, dá»±ng mÃ´ hÃ¬nh 3D trong game engine (Unity/Unreal), thiáº¿t káº¿ kiáº¿n trÃºc káº¿t cáº¥u vÃ²m khÃ´ng gian.",
        "drill_tags":  [
                           "Tá»a Ä‘á»™ Oxyz",
                           "Máº·t pháº³ng",
                           "Khoáº£ng cÃ¡ch",
                           "Khá»‘i trÃ²n xoay"
                       ],
        "related_question_ids":  [
                                     "q_tsa_14",
                                     "q_hsa_15",
                                     "q_thpt_10"
                                 ]
    },
    {
        "id":  "kb_toan12_05",
        "grade":  "ToÃ¡n 12",
        "chapter":  "ChÆ°Æ¡ng 5: XÃ¡c suáº¥t \u0026 Thá»‘ng kÃª nÃ¢ng cao",
        "title":  "Thá»‘ng kÃª Máº«u Sá»‘ liá»‡u GhÃ©p nhÃ³m \u0026 Biáº¿n ngáº«u nhiÃªn",
        "overview":  "Báº£ng táº§n sá»‘ ghÃ©p nhÃ³m, sá»‘ trung bÃ¬nh, trung vá»‹, tá»© phÃ¢n vá»‹ ghÃ©p nhÃ³m vÃ  phÃ¢n phá»‘i xÃ¡c suáº¥t cá»§a biáº¿n ngáº«u nhiÃªn rá»i ráº¡c.",
        "theory_markdown":  "### 1. Sá»‘ Ä‘áº·c trÆ°ng máº«u sá»‘ liá»‡u ghÃ©p nhÃ³m\n- **Sá»‘ trung bÃ¬nh**: \\(\\bar{x} = \\frac{1}{n}\\sum_{i=1}^k m_i c_i\\) (vá»›i \\(c_i\\) lÃ  giÃ¡ trá»‹ Ä‘áº¡i diá»‡n ná»­a tá»•ng hai mÃºt nhÃ³m).\n- **Tá»© phÃ¢n vá»‹ thá»© nháº¥t \\(Q_1\\)**: Thuá»™c nhÃ³m \\([u_m; u_{m+1})\\) cÃ³ táº§n sá»‘ tÃ­ch lÅ©y Ä‘áº§u tiÃªn \\(\\ge \\frac{n}{4}\\):\n  \\[Q_1 = u_m + \\frac{\\frac{n}{4} - C}{m_m} \\cdot (u_{m+1} - u_m)\\]\n- **Trung vá»‹ (Tá»© phÃ¢n vá»‹ \\(Q_2\\))**: Thuá»™c nhÃ³m cÃ³ táº§n sá»‘ tÃ­ch lÅ©y \\(\\ge \\frac{n}{2}\\).\n\n### 2. Biáº¿n ngáº«u nhiÃªn rá»i ráº¡c \u0026 CÃ¡c tham sá»‘ Ä‘áº·c trÆ°ng\nCho biáº¿n ngáº«u nhiÃªn rá»i ráº¡c \\(X\\) nháº­n cÃ¡c giÃ¡ trá»‹ \\(x_1, x_2, \\dots, x_k\\) vá»›i xÃ¡c suáº¥t tÆ°Æ¡ng á»©ng \\(p_1, p_2, \\dots, p_k\\) (\\(\\sum p_i = 1\\)):\n- **Ká»³ vá»ng (GiÃ¡ trá»‹ trung bÃ¬nh)**: \\(E(X) = \\sum_{i=1}^k x_i p_i\\).\n- **PhÆ°Æ¡ng sai**: \\(V(X) = E(X^2) - [E(X)]^2 = \\sum_{i=1}^k (x_i - E(X))^2 p_i\\).\n- **Äá»™ lá»‡ch chuáº©n**: \\(\\sigma(X) = \\sqrt{V(X)}\\).",
        "formulas":  [
                         {
                             "id":  "kb_toan12_05_f1",
                             "name":  "CÃ´ng thá»©c tá»© phÃ¢n vá»‹ ghÃ©p nhÃ³m",
                             "latex":  "Q_p = u_m + \\frac{p \\cdot n - C}{m_m} \\cdot h",
                             "desc":  "XÃ¡c Ä‘á»‹nh tá»© phÃ¢n vá»‹ máº«u sá»‘ liá»‡u ghÃ©p nhÃ³m báº±ng phÃ©p ná»™i suy tuyáº¿n tÃ­nh",
                             "tags":  [
                                          "Thá»‘ng kÃª",
                                          "GhÃ©p nhÃ³m",
                                          "Tá»© phÃ¢n vá»‹"
                                      ]
                         },
                         {
                             "id":  "kb_toan12_05_f2",
                             "name":  "Ká»³ vá»ng biáº¿n ngáº«u nhiÃªn",
                             "latex":  "E(X) = \\sum_{i=1}^n x_i P(X = x_i)",
                             "desc":  "GiÃ¡ trá»‹ trung bÃ¬nh ká»³ vá»ng lÃ½ thuyáº¿t cá»§a biáº¿n ngáº«u nhiÃªn rá»i ráº¡c",
                             "tags":  [
                                          "XÃ¡c suáº¥t",
                                          "Ká»³ vá»ng"
                                      ]
                         },
                         {
                             "id":  "kb_toan12_05_f3",
                             "name":  "PhÆ°Æ¡ng sai \u0026 Äá»™ lá»‡ch chuáº©n cá»§a biáº¿n ngáº«u nhiÃªn rá»i ráº¡c",
                             "latex":  "V(X) = E(X^2) - [E(X)]^2 = \\sum_{i=1}^n (x_i - \\mu)^2 p_i, \\quad \\sigma(X) = \\sqrt{V(X)}",
                             "desc":  "Äo lÆ°á»ng má»©c Ä‘á»™ phÃ¢n tÃ¡n rá»§i ro xung quanh giÃ¡ trá»‹ trung bÃ¬nh ká»³ vá»ng",
                             "tags":  [
                                          "Biáº¿n ngáº«u nhiÃªn",
                                          "PhÆ°Æ¡ng sai",
                                          "Äá»™ lá»‡ch chuáº©n"
                                      ]
                         }
                     ],
        "formula_ids":  [
                            "kb_toan12_05_f1",
                            "kb_toan12_05_f2",
                            "kb_toan12_05_f3"
                        ],
        "prerequisites":  [
                              "kb_toan11_05"
                          ],
        "related_topics":  [
                               "kb_dstt_05"
                           ],
        "common_traps":  [
                             "Nháº§m láº«n táº§n sá»‘ tÃ­ch lÅ©y C cá»§a nhÃ³m Ä‘á»©ng trÆ°á»›c vá»›i táº§n sá»‘ m_m cá»§a nhÃ³m Ä‘ang xÃ©t",
                             "QuÃªn bÃ¬nh phÆ°Æ¡ng E(X) trong cÃ´ng thá»©c tÃ­nh phÆ°Æ¡ng sai V(X) = E(X^2) - [E(X)]^2"
                         ],
        "examples":  [
                         {
                             "title":  "VÃ­ dá»¥ 1: TÃ­nh ká»³ vá»ng lá»£i nhuáº­n dá»± Ã¡n Ä‘áº§u tÆ°",
                             "question":  "Má»™t dá»± Ã¡n Ä‘áº§u tÆ° cÃ³ xÃ¡c suáº¥t thÃ nh cÃ´ng lá»›n lÃ  40% (lá»£i nhuáº­n 500 triá»‡u), thÃ nh cÃ´ng vá»«a lÃ  40% (lá»£i nhuáº­n 200 triá»‡u), tháº¥t báº¡i lÃ  20% (lá»— 100 triá»‡u, ghi -100). TÃ­nh ká»³ vá»ng lá»£i nhuáº­n cá»§a dá»± Ã¡n.",
                             "solution_steps":  [
                                                    "BÆ°á»›c 1: Báº£ng phÃ¢n bá»‘ xÃ¡c suáº¥t: \\(x_1 = 500, p_1 = 0,4\\); \\(x_2 = 200, p_2 = 0,4\\); \\(x_3 = -100, p_3 = 0,2\\).",
                                                    "BÆ°á»›c 2: Ãp dá»¥ng cÃ´ng thá»©c ká»³ vá»ng: \\(E(X) = 500(0,4) + 200(0,4) + (-100)(0,2)\\).",
                                                    "BÆ°á»›c 3: \\(E(X) = 200 + 80 - 20 = 260\\text{ triá»‡u Ä‘á»“ng}\\)."
                                                ],
                             "takeaway":  "Ká»³ vá»ng lá»£i nhuáº­n pháº£n Ã¡nh giÃ¡ trá»‹ bÃ¬nh quÃ¢n cá»§a khoáº£n Ä‘áº§u tÆ° náº¿u láº·p láº¡i nhiá»u láº§n."
                         }
                     ],
        "applications":  "Äá»‹nh giÃ¡ phÃ­ báº£o hiá»ƒm nhÃ¢n thá» (Actuarial Science), thuáº­t toÃ¡n phÃ¢n luá»“ng gÃ³i tin trÃªn máº¡ng Internet, quáº£n trá»‹ rá»§i ro danh má»¥c tÃ­n dá»¥ng ngÃ¢n hÃ ng.",
        "drill_tags":  [
                           "Thá»‘ng kÃª ghÃ©p nhÃ³m",
                           "Biáº¿n ngáº«u nhiÃªn",
                           "Ká»³ vá»ng",
                           "PhÆ°Æ¡ng sai"
                       ],
        "related_question_ids":  [
                                     "q_tsa_16",
                                     "q_hsa_17",
                                     "q_thpt_12"
                                 ]
    },
    {
        "id":  "kb_dstt_01",
        "grade":  "ToÃ¡n cao cáº¥p",
        "chapter":  "ChÆ°Æ¡ng 1: Ma tráº­n \u0026 CÃ¡c phÃ©p toÃ¡n Ma tráº­n",
        "title":  "Ma tráº­n, PhÃ©p nhÃ¢n \u0026 Ma tráº­n Nghá»‹ch Ä‘áº£o",
        "overview":  "PhÃ©p nhÃ¢n ma tráº­n khÃ´ng giao hoÃ¡n, ma tráº­n phá»¥ há»£p, thuáº­t toÃ¡n tÃ¬m ma tráº­n nghá»‹ch Ä‘áº£o qua Ä‘á»‹nh thá»©c vÃ  khá»­ Gauss-Jordan.",
        "theory_markdown":  "### 1. PhÃ©p nhÃ¢n ma tráº­n\nNáº¿u ma tráº­n \\(A\\) cÃ³ kÃ­ch thÆ°á»›c \\(m \\times k\\) vÃ  \\(B\\) cÃ³ kÃ­ch thÆ°á»›c \\(k \\times n\\), thÃ¬ tÃ­ch \\(C = AB\\) cÃ³ kÃ­ch thÆ°á»›c \\(m \\times n\\):\n\\(c_{ij} = \\sum_{r=1}^k a_{ir} b_{rj}\\).\nLÆ°u Ã½ quan trá»ng: PhÃ©p nhÃ¢n ma tráº­n **khÃ´ng cÃ³ tÃ­nh giao hoÃ¡n** (\\(AB \\ne BA\\) nÃ³i chung).\n\n### 2. Ma tráº­n nghá»‹ch Ä‘áº£o\nMa tráº­n vuÃ´ng \\(A\\) kháº£ nghá»‹ch khi vÃ  chá»‰ khi \\(\\det(A) \\ne 0\\).\n- **CÃ´ng thá»©c ma tráº­n phá»¥ há»£p tá»•ng quÃ¡t**:\n  \\[A^{-1} = \\frac{1}{\\det(A)} C^T, \\quad \\text{trong Ä‘Ã³ } C_{ij} = (-1)^{i+j} M_{ij}\\]\n- **TrÆ°á»ng há»£p ma tráº­n cáº¥p 2**:\n  \\[\\begin{pmatrix} a \u0026 b \\\\ c \u0026 d \\end{pmatrix}^{-1} = \\frac{1}{ad - bc} \\begin{pmatrix} d \u0026 -b \\\\ -c \u0026 a \\end{pmatrix}\\]",
        "formulas":  [
                         {
                             "id":  "kb_dstt_01_f1",
                             "name":  "Ma tráº­n nghá»‹ch Ä‘áº£o cáº¥p 2",
                             "latex":  "\\begin{pmatrix} a \u0026 b \\\\ c \u0026 d \\end{pmatrix}^{-1} = \\frac{1}{ad - bc} \\begin{pmatrix} d \u0026 -b \\\\ -c \u0026 a \\end{pmatrix}",
                             "desc":  "CÃ´ng thá»©c tÃ­nh nghá»‹ch Ä‘áº£o siÃªu tá»‘c cho ma tráº­n 2x2",
                             "tags":  [
                                          "Ma tráº­n",
                                          "Nghá»‹ch Ä‘áº£o",
                                          "Äáº¡i sá»‘ tuyáº¿n tÃ­nh"
                                      ]
                         },
                         {
                             "id":  "kb_dstt_01_f2",
                             "name":  "CÃ´ng thá»©c ma tráº­n phá»¥ há»£p vÃ  nghá»‹ch Ä‘áº£o tá»•ng quÃ¡t",
                             "latex":  "A^{-1} = \\frac{1}{\\det(A)} C^T \\quad (\\det(A) \\ne 0, \\; C_{ij} = (-1)^{i+j} M_{ij})",
                             "desc":  "Nghá»‹ch Ä‘áº£o ma tráº­n vuÃ´ng cáº¥p n thÃ´ng qua ma tráº­n pháº§n bÃ¹ Ä‘áº¡i sá»‘",
                             "tags":  [
                                          "Äáº¡i sá»‘ tuyáº¿n tÃ­nh",
                                          "Ma tráº­n nghá»‹ch Ä‘áº£o",
                                          "Äá»‹nh thá»©c"
                                      ]
                         }
                     ],
        "formula_ids":  [
                            "kb_dstt_01_f1",
                            "kb_dstt_01_f2"
                        ],
        "prerequisites":  [
                              "kb_toan10_01"
                          ],
        "related_topics":  [

                           ],
        "common_traps":  [
                             "QuÃªn chuyá»ƒn vá»‹ ma tráº­n pháº§n bÃ¹ Ä‘áº¡i sá»‘ C^T (ma tráº­n phá»¥ há»£p adj(A) = C^T chá»© khÃ´ng pháº£i C)",
                             "Nháº§m láº«n thá»© tá»± nhÃ¢n ma tráº­n: AB != BA"
                         ],
        "examples":  [
                         {
                             "title":  "VÃ­ dá»¥ 1: TÃ¬m ma tráº­n nghá»‹ch Ä‘áº£o cáº¥p 2",
                             "question":  "Cho \\(A = \\begin{pmatrix} 2 \u0026 1 \\\\ 5 \u0026 3 \\end{pmatrix}\\). TÃ¬m \\(A^{-1}\\).",
                             "solution_steps":  [
                                                    "BÆ°á»›c 1: TÃ­nh Ä‘á»‹nh thá»©c: \\(\\det(A) = 2(3) - 1(5) = 6 - 5 = 1 \\ne 0\\). Kháº£ nghá»‹ch.",
                                                    "BÆ°á»›c 2: Äá»•i chá»— Ä‘Æ°á»ng chÃ©o chÃ­nh, Ä‘á»•i dáº¥u Ä‘Æ°á»ng chÃ©o phá»¥: \\(d = 3, a = 2\\), \\(b = -1, c = -5\\).",
                                                    "BÆ°á»›c 3: \\(A^{-1} = \\frac{1}{1} \\begin{pmatrix} 3 \u0026 -1 \\\\ -5 \u0026 2 \\end{pmatrix} = \\begin{pmatrix} 3 \u0026 -1 \\\\ -5 \u0026 2 \\end{pmatrix}\\)."
                                                ],
                             "takeaway":  "Ghi nhá»› tháº§n chÃº: Äá»•i vá»‹ trÃ­ chÃ©o chÃ­nh, Ä‘á»•i dáº¥u chÃ©o phá»¥, chia Ä‘á»‹nh thá»©c."
                         }
                     ],
        "applications":  "MÃ£ hÃ³a vÄƒn báº£n Hill Cipher, biáº¿n Ä‘á»•i hÃ¬nh há»c trong xá»­ lÃ½ áº£nh (xoay, co giÃ£n, phÃ©p dá»i), Ä‘á»“ há»a mÃ¡y tÃ­nh 3D Shader.",
        "drill_tags":  [
                           "Ma tráº­n",
                           "Nghá»‹ch Ä‘áº£o",
                           "ÄSTT"
                       ],
        "related_question_ids":  [
                                     "q_calc_04",
                                     "q_tsa_03",
                                     "q_calc_07"
                                 ]
    },
    {
        "id":  "kb_dstt_02",
        "grade":  "ToÃ¡n cao cáº¥p",
        "chapter":  "ChÆ°Æ¡ng 2: Äá»‹nh thá»©c \u0026 Quy táº¯c Cramer",
        "title":  "Äá»‹nh thá»©c Ma tráº­n \u0026 Äá»‹nh lÃ½ Cramer Giáº£i Há»‡ Tuyáº¿n TÃ­nh",
        "overview":  "Quy táº¯c Sarrus Ä‘á»‹nh thá»©c cáº¥p 3, tÃ­nh cháº¥t biáº¿n Ä‘á»•i hÃ ng sÆ¡ cáº¥p, Ä‘á»‹nh thá»©c tÃ­ch vÃ  cÃ´ng thá»©c nghiá»‡m Cramer.",
        "theory_markdown":  "### 1. TÃ­nh cháº¥t then chá»‘t cá»§a Ä‘á»‹nh thá»©c\n- Äá»•i chá»— hai hÃ ng (hoáº·c cá»™t) thÃ¬ Ä‘á»‹nh thá»©c Ä‘á»•i dáº¥u.\n- NhÃ¢n má»™t hÃ ng vá»›i sá»‘ thá»±c \\(k\\) thÃ¬ Ä‘á»‹nh thá»©c nhÃ¢n vá»›i \\(k\\).\n- Cá»™ng bá»™i sá»‘ cá»§a hÃ ng nÃ y vÃ o hÃ ng khÃ¡c thÃ¬ Ä‘á»‹nh thá»©c **khÃ´ng Ä‘á»•i**.\n- Ma tráº­n cÃ³ hai hÃ ng tá»‰ lá»‡ thÃ¬ \\(\\det = 0\\).\n- \\(\\det(AB) = \\det(A) \\cdot \\det(B)\\).\n- \\(\\det(A^T) = \\det(A)\\); \\(\\det(kA) = k^n \\det(A)\\) (vá»›i \\(A\\) lÃ  ma tráº­n vuÃ´ng cáº¥p \\(n\\)).\n\n### 2. Äá»‹nh lÃ½ Cramer\nHá»‡ gá»“m \\(n\\) phÆ°Æ¡ng trÃ¬nh, \\(n\\) áº©n \\(AX = B\\) cÃ³ nghiá»‡m duy nháº¥t khi vÃ  chá»‰ khi \\(D = \\det(A) \\ne 0\\):\n\\(x_i = \\frac{D_i}{D}\\), trong Ä‘Ã³ \\(D_i\\) lÃ  Ä‘á»‹nh thá»©c nháº­n Ä‘Æ°á»£c báº±ng cÃ¡ch thay cá»™t thá»© \\(i\\) báº±ng cá»™t há»‡ sá»‘ tá»± do \\(B\\).",
        "formulas":  [
                         {
                             "id":  "kb_dstt_02_f1",
                             "name":  "CÃ´ng thá»©c nghiá»‡m Cramer",
                             "latex":  "x_i = \\frac{\\det(A_i)}{\\det(A)} = \\frac{D_i}{D} \\quad (D \\ne 0)",
                             "desc":  "Nghiá»‡m tÆ°á»ng minh cá»§a há»‡ phÆ°Æ¡ng trÃ¬nh vuÃ´ng Cramer",
                             "tags":  [
                                          "Cramer",
                                          "Äá»‹nh thá»©c",
                                          "Há»‡ phÆ°Æ¡ng trÃ¬nh"
                                      ]
                         },
                         {
                             "id":  "kb_dstt_02_f2",
                             "name":  "TÃ­nh cháº¥t cá»§a Ä‘á»‹nh thá»©c ma tráº­n vuÃ´ng",
                             "latex":  "\\det(AB) = \\det(A)\\det(B), \\quad \\det(A^T) = \\det(A), \\quad \\det(kA) = k^n \\det(A) \\; (A \\in \\mathcal{M}_n), \\quad \\det(A^{-1}) = \\frac{1}{\\det(A)}",
                             "desc":  "CÃ¡c tÃ­nh cháº¥t Ä‘á»‹nh lÆ°á»£ng then chá»‘t cá»§a Ä‘á»‹nh thá»©c phá»¥c vá»¥ rÃºt gá»n vÃ  tÃ­nh toÃ¡n",
                             "tags":  [
                                          "Äáº¡i sá»‘ tuyáº¿n tÃ­nh",
                                          "Äá»‹nh thá»©c",
                                          "TÃ­nh cháº¥t"
                                      ]
                         }
                     ],
        "formula_ids":  [
                            "kb_dstt_02_f1",
                            "kb_dstt_02_f2"
                        ],
        "prerequisites":  [
                              "kb_toan10_01"
                          ],
        "related_topics":  [

                           ],
        "common_traps":  [
                             "Nháº§m det(kA) = k * det(A) thay vÃ¬ k^n * det(A)",
                             "Ãp dá»¥ng Cramer khi sá»‘ phÆ°Æ¡ng trÃ¬nh khÃ¡c sá»‘ áº©n hoáº·c khi Ä‘á»‹nh thá»©c chÃ­nh D = 0"
                         ],
        "examples":  [
                         {
                             "title":  "VÃ­ dá»¥ 1: Giáº£i há»‡ Cramer trong máº¡ch Ä‘iá»‡n",
                             "question":  "Giáº£i há»‡ dÃ²ng Ä‘iá»‡n Kirchhoff: \\(\\begin{cases} 3I_1 + 2I_2 = 12 \\\\ 4I_1 - I_2 = 5 \\end{cases}\\) báº±ng Ä‘á»‹nh lÃ½ Cramer.",
                             "solution_steps":  [
                                                    "BÆ°á»›c 1: TÃ­nh \\(D = \\begin{vmatrix} 3 \u0026 2 \\\\ 4 \u0026 -1 \\end{vmatrix} = 3(-1) - 2(4) = -3 - 8 = -11\\).",
                                                    "BÆ°á»›c 2: Thay cá»™t 1 báº±ng há»‡ sá»‘ tá»± do: \\(D_1 = \\begin{vmatrix} 12 \u0026 2 \\\\ 5 \u0026 -1 \\end{vmatrix} = 12(-1) - 2(5) = -22\\).",
                                                    "BÆ°á»›c 3: Thay cá»™t 2 báº±ng há»‡ sá»‘ tá»± do: \\(D_2 = \\begin{vmatrix} 3 \u0026 12 \\\\ 4 \u0026 5 \\end{vmatrix} = 3(5) - 12(4) = 15 - 48 = -33\\).",
                                                    "BÆ°á»›c 4: Nghiá»‡m: \\(I_1 = \\frac{D_1}{D} = \\frac{-22}{-11} = 2\\text{ A}\\), \\(I_2 = \\frac{D_2}{D} = \\frac{-33}{-11} = 3\\text{ A}\\)."
                                                ],
                             "takeaway":  "Cramer cá»±c ká»³ tiá»‡n lá»£i cho há»‡ 2 hoáº·c 3 phÆ°Æ¡ng trÃ¬nh cÃ³ chá»©a tham sá»‘."
                         }
                     ],
        "applications":  "PhÃ¢n tÃ­ch máº¡ch Ä‘iá»‡n nhiá»u máº¯t lÆ°á»›i, cÃ¢n báº±ng phÆ°Æ¡ng trÃ¬nh pháº£n á»©ng hÃ³a há»c phá»©c táº¡p, bÃ i toÃ¡n cÃ¢n báº±ng váº­t thá»ƒ trong cÆ¡ há»c lÃ½ thuyáº¿t.",
        "drill_tags":  [
                           "Cramer",
                           "Äá»‹nh thá»©c",
                           "Máº¡ch Ä‘iá»‡n"
                       ],
        "related_question_ids":  [
                                     "q_tsa_04",
                                     "q_calc_04",
                                     "q_calc_08"
                                 ]
    },
    {
        "id":  "kb_dstt_03",
        "grade":  "ToÃ¡n cao cáº¥p",
        "chapter":  "ChÆ°Æ¡ng 3: Há»‡ PhÆ°Æ¡ng trÃ¬nh Tuyáº¿n tÃ­nh \u0026 Khá»­ Gauss",
        "title":  "Thuáº­t toÃ¡n Khá»­ Gauss \u0026 MÃ´ hÃ¬nh CÃ¢n báº±ng Leontief",
        "overview":  "ÄÆ°a ma tráº­n má»Ÿ rá»™ng vá» dáº¡ng báº­c thang, Ä‘á»‹nh lÃ½ Kronecker-Capelli vÃ  mÃ´ hÃ¬nh phÃ¢n tÃ­ch Input-Output Leontief.",
        "theory_markdown":  "### 1. Thuáº­t toÃ¡n Khá»­ Gauss\n- Láº­p ma tráº­n bá»• sung \\(\\tilde{A} = (A \\mid B)\\).\n- DÃ¹ng 3 phÃ©p biáº¿n Ä‘á»•i hÃ ng sÆ¡ cáº¥p Ä‘Æ°a \\(\\tilde{A}\\) vá» ma tráº­n báº­c thang:\n  1. Äá»•i chá»— 2 hÃ ng.\n  2. NhÃ¢n má»™t hÃ ng vá»›i sá»‘ khÃ¡c 0.\n  3. Cá»™ng vÃ o má»™t hÃ ng má»™t bá»™i sá»‘ cá»§a hÃ ng khÃ¡c.\n\n### 2. Äá»‹nh lÃ½ Kronecker-Capelli\n- Há»‡ cÃ³ nghiá»‡m khi vÃ  chá»‰ khi \\(\\text{rank}(A) = \\text{rank}(\\tilde{A})\\).\n- Náº¿u \\(\\text{rank} = n\\) (sá»‘ áº©n): Há»‡ cÃ³ nghiá»‡m duy nháº¥t.\n- Náº¿u \\(\\text{rank} \u003c n\\): Há»‡ cÃ³ vÃ´ sá»‘ nghiá»‡m phá»¥ thuá»™c \\(n - \\text{rank}\\) áº©n tá»± do.",
        "formulas":  [
                         {
                             "id":  "kb_dstt_03_f1",
                             "name":  "MÃ´ hÃ¬nh CÃ¢n báº±ng Kinh táº¿ Leontief",
                             "latex":  "X = (I - A)^{-1} D",
                             "desc":  "Vector tá»•ng sáº£n lÆ°á»£ng X cáº§n sáº£n xuáº¥t Ä‘á»ƒ Ä‘Ã¡p á»©ng nhu cáº§u cuá»‘i cÃ¹ng D vá»›i ma tráº­n chi phÃ­ Ä‘áº§u vÃ o A",
                             "tags":  [
                                          "Leontief",
                                          "Kinh táº¿ lÆ°á»£ng",
                                          "Há»‡ tuyáº¿n tÃ­nh"
                                      ]
                         }
                     ],
        "formula_ids":  [
                            "kb_dstt_03_f1"
                        ],
        "prerequisites":  [
                              "kb_toan10_01"
                          ],
        "related_topics":  [

                           ],
        "common_traps":  [
                             "Nháº§m láº«n giá»¯a ma tráº­n há»‡ sá»‘ A vÃ  ma tráº­n má»Ÿ rá»™ng A-ngÃ£ khi Ä‘áº¿m rank",
                             "QuÃªn ma tráº­n Ä‘Æ¡n vá»‹ I khi giáº£i phÆ°Æ¡ng trÃ¬nh Leontief (I - A)X = D"
                         ],
        "examples":  [
                         {
                             "title":  "VÃ­ dá»¥ 1: TÃ¬m háº¡ng ma tráº­n báº­c thang",
                             "question":  "Cho ma tráº­n \\(A = \\begin{pmatrix} 1 \u0026 2 \u0026 3 \\\\ 0 \u0026 1 \u0026 4 \\\\ 0 \u0026 0 \u0026 m - 2 \\end{pmatrix}\\). TÃ¬m \\(m\\) Ä‘á»ƒ ma tráº­n cÃ³ háº¡ng báº±ng 2.",
                             "solution_steps":  [
                                                    "BÆ°á»›c 1: Ma tráº­n Ä‘Ã£ cÃ³ dáº¡ng báº­c thang.",
                                                    "BÆ°á»›c 2: Háº¡ng cá»§a ma tráº­n báº­c thang báº±ng sá»‘ hÃ ng khÃ¡c 0.",
                                                    "BÆ°á»›c 3: Äá»ƒ \\(\\text{rank}(A) = 2\\), hÃ ng thá»© 3 pháº£i lÃ  hÃ ng toÃ n sá»‘ 0: \\(m - 2 = 0 \\iff m = 2\\)."
                                                ],
                             "takeaway":  "Biáº¿n Ä‘á»•i Gauss lÃ  cÃ´ng cá»¥ máº¡nh nháº¥t vÃ  á»•n Ä‘á»‹nh sá»‘ há»c nháº¥t Ä‘á»ƒ tÃ­nh háº¡ng ma tráº­n."
                         }
                     ],
        "applications":  "PhÃ¢n tÃ­ch kinh táº¿ vÄ© mÃ´ Ä‘a ngÃ nh Leontief Input-Output (giáº£i Nobel Kinh táº¿), giáº£i thuáº­t Ä‘á»‹nh tuyáº¿n luá»“ng máº¡ng, nÃ©n tÃ­n hiá»‡u sá»‘.",
        "drill_tags":  [
                           "Gauss",
                           "Háº¡ng ma tráº­n",
                           "Leontief"
                       ],
        "related_question_ids":  [
                                     "q_tsa_08",
                                     "q_calc_05",
                                     "q_calc_09"
                                 ]
    },
    {
        "id":  "kb_dstt_04",
        "grade":  "ToÃ¡n cao cáº¥p",
        "chapter":  "ChÆ°Æ¡ng 4: KhÃ´ng gian VectÆ¡, CÆ¡ sá»Ÿ \u0026 Trá»‹ riÃªng",
        "title":  "KhÃ´ng gian VectÆ¡, Trá»‹ riÃªng \u0026 VectÆ¡ riÃªng (Eigenvalues)",
        "overview":  "Äá»™c láº­p tuyáº¿n tÃ­nh, chiá»u khÃ´ng gian, Ä‘a thá»©c Ä‘áº·c trÆ°ng vÃ  Ã½ nghÄ©a cá»§a giÃ¡ trá»‹ riÃªng trong ma tráº­n á»•n Ä‘á»‹nh.",
        "theory_markdown":  "### 1. Äá»™c láº­p vÃ  Phá»¥ thuá»™c tuyáº¿n tÃ­nh\nHá»‡ vectÆ¡ \\(\\{v_1, v_2, \\dots, v_k\\}\\) Ä‘á»™c láº­p tuyáº¿n tÃ­nh khi vÃ  chá»‰ khi:\n\\(c_1 v_1 + c_2 v_2 + \\dots + c_k v_k = 0 \\implies c_1 = c_2 = \\dots = c_k = 0\\).\n\n### 2. Trá»‹ riÃªng vÃ  VectÆ¡ riÃªng\nSá»‘ vÃ´ hÆ°á»›ng \\(\\lambda\\) lÃ  giÃ¡ trá»‹ riÃªng cá»§a ma tráº­n vuÃ´ng \\(A\\) náº¿u tá»“n táº¡i vectÆ¡ \\(v \\ne 0\\) sao cho:\n\\(Av = \\lambda v \\iff (A - \\lambda I)v = 0\\).\nPhÆ°Æ¡ng trÃ¬nh Ä‘áº·c trÆ°ng: \\(\\det(A - \\lambda I) = 0\\).",
        "formulas":  [
                         {
                             "id":  "kb_dstt_04_f1",
                             "name":  "PhÆ°Æ¡ng trÃ¬nh Ä‘áº·c trÆ°ng Trá»‹ riÃªng",
                             "latex":  "\\det(A - \\lambda I) = 0",
                             "desc":  "PhÆ°Æ¡ng trÃ¬nh Ä‘a thá»©c xÃ¡c Ä‘á»‹nh cÃ¡c giÃ¡ trá»‹ riÃªng cá»§a ma tráº­n A",
                             "tags":  [
                                          "Trá»‹ riÃªng",
                                          "Eigenvalues",
                                          "ÄSTT"
                                      ]
                         },
                         {
                             "id":  "kb_dstt_04_f2",
                             "name":  "Váº¿t vÃ  Äá»‹nh thá»©c qua Trá»‹ riÃªng",
                             "latex":  "\\text{tr}(A) = \\sum_{i=1}^n \\lambda_i, \\quad \\det(A) = \\prod_{i=1}^n \\lambda_i",
                             "desc":  "Tá»•ng vÃ  tÃ­ch cÃ¡c giÃ¡ trá»‹ riÃªng",
                             "tags":  [
                                          "Trace",
                                          "Trá»‹ riÃªng"
                                      ]
                         }
                     ],
        "formula_ids":  [
                            "kb_dstt_04_f1",
                            "kb_dstt_04_f2"
                        ],
        "prerequisites":  [
                              "kb_toan10_01"
                          ],
        "related_topics":  [

                           ],
        "common_traps":  [
                             "QuÃªn Ä‘á»•i dáº¥u khi trá»« lamda trÃªn Ä‘Æ°á»ng chÃ©o chÃ­nh det(A - lambda I)",
                             "TÃ­nh sai nghiá»‡m cá»§a Ä‘a thá»©c Ä‘áº·c trÆ°ng báº­c 3"
                         ],
        "examples":  [
                         {
                             "title":  "VÃ­ dá»¥ 1: TÃ¬m trá»‹ riÃªng cá»§a ma tráº­n cáº¥p 2",
                             "question":  "TÃ¬m cÃ¡c giÃ¡ trá»‹ riÃªng cá»§a ma tráº­n \\(A = \\begin{pmatrix} 4 \u0026 2 \\\\ 1 \u0026 3 \\end{pmatrix}\\).",
                             "solution_steps":  [
                                                    "BÆ°á»›c 1: PhÆ°Æ¡ng trÃ¬nh Ä‘áº·c trÆ°ng: \\(\\det(A - \\lambda I) = \\begin{vmatrix} 4 - \\lambda \u0026 2 \\\\ 1 \u0026 3 - \\lambda \\end{vmatrix} = 0\\).",
                                                    "BÆ°á»›c 2: Khai triá»ƒn: \\((4 - \\lambda)(3 - \\lambda) - 2 = \\lambda^2 - 7\\lambda + 12 - 2 = \\lambda^2 - 7\\lambda + 10 = 0\\).",
                                                    "BÆ°á»›c 3: Giáº£i phÆ°Æ¡ng trÃ¬nh báº­c hai: \\(\\lambda_1 = 5, \\lambda_2 = 2\\).",
                                                    "BÆ°á»›c 4: Kiá»ƒm tra nhanh: Tá»•ng \\(5 + 2 = 7 = 4 + 3 = \\text{tr}(A)\\), TÃ­ch \\(5 \\times 2 = 10 = 4(3) - 2(1) = \\det(A)\\)."
                                                ],
                             "takeaway":  "LuÃ´n dÃ¹ng váº¿t (trace) vÃ  Ä‘á»‹nh thá»©c (det) Ä‘á»ƒ kiá»ƒm tra nhanh káº¿t quáº£ trá»‹ riÃªng."
                         }
                     ],
        "applications":  "Thuáº­t toÃ¡n xáº¿p háº¡ng trang web PageRank cá»§a Google (tÃ¬m vectÆ¡ riÃªng chÃ­nh cá»§a ma tráº­n lÆ°á»›t ngáº«u nhiÃªn), phÃ¢n tÃ­ch thÃ nh pháº§n chÃ­nh PCA trong Machine Learning, nÃ©n áº£nh SVD.",
        "drill_tags":  [
                           "Trá»‹ riÃªng",
                           "VectÆ¡ riÃªng",
                           "PageRank",
                           "PCA"
                       ],
        "related_question_ids":  [
                                     "q_calc_04",
                                     "q_tsa_03",
                                     "q_calc_10"
                                 ]
    },
    {
        "id":  "kb_dstt_05",
        "grade":  "ToÃ¡n cao cáº¥p",
        "chapter":  "ChÆ°Æ¡ng 5: XÃ­ch Markov \u0026 PhÃ¢n phá»‘i Dá»«ng",
        "title":  "XÃ­ch Markov Rá»i ráº¡c \u0026 BÃ i toÃ¡n CÃ¢n báº±ng Thá»‹ pháº§n",
        "overview":  "Ma tráº­n chuyá»ƒn tráº¡ng thÃ¡i ngáº«u nhiÃªn vÃ  giáº£i há»‡ phÆ°Æ¡ng trÃ¬nh tÃ¬m vectÆ¡ phÃ¢n phá»‘i dá»«ng cÃ¢n báº±ng dÃ i háº¡n.",
        "theory_markdown":  "### 1. Ma tráº­n chuyá»ƒn tráº¡ng thÃ¡i Markov\nMá»™t ma tráº­n ngáº«u nhiÃªn theo cá»™t \\(P\\) thá»a mÃ£n:\n- CÃ¡c pháº§n tá»­ \\(p_{ij} \\ge 0\\) (xÃ¡c suáº¥t chuyá»ƒn tá»« tráº¡ng thÃ¡i \\(j\\) sang tráº¡ng thÃ¡i \\(i\\)).\n- Tá»•ng cÃ¡c pháº§n tá»­ trÃªn má»—i cá»™t luÃ´n báº±ng 1: \\(\\sum_i p_{ij} = 1\\).\n\n### 2. Tráº¡ng thÃ¡i dá»«ng cÃ¢n báº±ng dÃ i háº¡n\nVectÆ¡ xÃ¡c suáº¥t \\(\\pi = (\\pi_1, \\pi_2, \\dots, \\pi_n)^T\\) thá»a:\n\\(P\\pi = \\pi \\iff (P - I)\\pi = 0\\) vÃ  \\(\\sum_{i=1}^n \\pi_i = 1\\).",
        "formulas":  [
                         {
                             "id":  "kb_dstt_05_f1",
                             "name":  "PhÆ°Æ¡ng trÃ¬nh tráº¡ng thÃ¡i dá»«ng Markov",
                             "latex":  "(P - I)\\pi = 0 \\quad \\text{kÃ¨m } \\sum \\pi_i = 1",
                             "desc":  "Há»‡ phÆ°Æ¡ng trÃ¬nh xÃ¡c Ä‘á»‹nh thá»‹ pháº§n cÃ¢n báº±ng á»•n Ä‘á»‹nh dÃ i háº¡n",
                             "tags":  [
                                          "Markov",
                                          "Thá»‹ pháº§n",
                                          "XÃ¡c suáº¥t"
                                      ]
                         }
                     ],
        "formula_ids":  [
                            "kb_dstt_05_f1"
                        ],
        "prerequisites":  [
                              "kb_toan10_01"
                          ],
        "related_topics":  [

                           ],
        "common_traps":  [
                             "QuÃªn phÆ°Æ¡ng trÃ¬nh tá»•ng cÃ¡c xÃ¡c suáº¥t pi_1 + pi_2 + ... + pi_n = 1",
                             "XÃ¡c Ä‘á»‹nh nháº§m chiá»u chuyá»ƒn tráº¡ng thÃ¡i (theo hÃ ng hay theo cá»™t)"
                         ],
        "examples":  [
                         {
                             "title":  "VÃ­ dá»¥ 1: Thá»‹ pháº§n taxi cÃ´ng nghá»‡",
                             "question":  "Hai hÃ£ng A vÃ  B cÃ³ ma tráº­n chuyá»ƒn tráº¡ng thÃ¡i khÃ¡ch hÃ ng theo nÄƒm: \\(P = \\begin{pmatrix} 0,8 \u0026 0,4 \\\\ 0,2 \u0026 0,6 \\end{pmatrix}\\). TÃ¬m thá»‹ pháº§n á»•n Ä‘á»‹nh cá»§a hÃ£ng A.",
                             "solution_steps":  [
                                                    "BÆ°á»›c 1: Há»‡ dá»«ng: \\((0,8 - 1)\\pi_A + 0,4\\pi_B = 0 \\iff -0,2\\pi_A + 0,4\\pi_B = 0 \\iff \\pi_A = 2\\pi_B\\).",
                                                    "BÆ°á»›c 2: RÃ ng buá»™c tá»•ng xÃ¡c suáº¥t: \\(\\pi_A + \\pi_B = 1\\).",
                                                    "BÆ°á»›c 3: Thay \\(\\pi_A = 2\\pi_B\\) vÃ o: \\(3\\pi_B = 1 \\implies \\pi_B = 1/3 \\approx 33,33\\%\\), \\(\\pi_A = 2/3 \\approx 66,67\\%\\)."
                                                ],
                             "takeaway":  "ÄÃ¢y lÃ  dáº¡ng cÃ¢u há»i xuáº¥t hiá»‡n liÃªn tá»¥c trong cÃ¡c Ä‘á» thi TSA ÄHBK HÃ  Ná»™i nhá»¯ng nÄƒm gáº§n Ä‘Ã¢y."
                         }
                     ],
        "applications":  "Dá»± bÃ¡o thá»i tiáº¿t chuyá»ƒn tiáº¿p mÆ°a/náº¯ng, mÃ´ hÃ¬nh dá»± Ä‘oÃ¡n xu hÆ°á»›ng di cÆ° dÃ¢n sá»‘, thuáº­t toÃ¡n táº¡o vÄƒn báº£n chuá»—i tá»« (Markov Text Generator).",
        "drill_tags":  [
                           "Markov",
                           "Thá»‹ pháº§n",
                           "Tráº¡ng thÃ¡i dá»«ng"
                       ],
        "related_question_ids":  [
                                     "q_tsa_03",
                                     "q_tsa_12",
                                     "q_tsa_37"
                                 ]
    },
    {
        "id":  "kb_gt1_01",
        "grade":  "Giáº£i tÃ­ch 1",
        "chapter":  "ChÆ°Æ¡ng 1: DÃ£y sá»‘ thá»±c \u0026 Giá»›i háº¡n",
        "title":  "DÃ£y sá»‘ thá»±c, Äá»‹nh lÃ½ Káº¹p \u0026 VÃ´ cÃ¹ng bÃ© TÆ°Æ¡ng Ä‘Æ°Æ¡ng",
        "overview":  "Äá»‹nh nghÄ©a giá»›i háº¡n dÃ£y sá»‘, tiÃªu chuáº©n Weierstrass Ä‘Æ¡n Ä‘iá»‡u bá»‹ cháº·n, Ä‘á»‹nh lÃ½ káº¹p ba chÃ ng ngá»± lÃ¢m vÃ  báº£ng thay tháº¿ vÃ´ cÃ¹ng bÃ© tÆ°Æ¡ng Ä‘Æ°Æ¡ng.",
        "theory_markdown":  "### 1. DÃ£y sá»‘ thá»±c \u0026 TiÃªu chuáº©n Weierstrass\n- DÃ£y sá»‘ \\((x_n)\\) tÄƒng vÃ  bá»‹ cháº·n trÃªn thÃ¬ cÃ³ giá»›i háº¡n há»¯u háº¡n: \\(\\lim x_n = \\sup \\{x_n\\}\\).\n- DÃ£y sá»‘ \\((x_n)\\) giáº£m vÃ  bá»‹ cháº·n dÆ°á»›i thÃ¬ cÃ³ giá»›i háº¡n há»¯u háº¡n: \\(\\lim x_n = \\inf \\{x_n\\}\\).\n- Äá»‹nh lÃ½ káº¹p: Náº¿u \\(y_n \\le x_n \\le z_n\\) vá»›i má»i \\(n\\) vÃ  \\(\\lim y_n = \\lim z_n = L\\) thÃ¬ \\(\\lim x_n = L\\).\n\n### 2. Báº£ng VÃ´ cÃ¹ng bÃ© TÆ°Æ¡ng Ä‘Æ°Æ¡ng chuáº©n (khi \\(x \\to 0\\))\n- \\(\\sin x \\sim x\\); \\(\\tan x \\sim x\\); \\(\\arcsin x \\sim x\\); \\(\\arctan x \\sim x\\)\n- \\(\\ln(1 + x) \\sim x\\); \\(e^x - 1 \\sim x\\); \\(a^x - 1 \\sim x \\ln a\\)\n- \\(1 - \\cos x \\sim \\frac{x^2}{2}\\)\n- \\((1 + x)^\\alpha - 1 \\sim \\alpha x\\) (Äáº·c biá»‡t: \\(\\sqrt{1 + x} - 1 \\sim \\frac{x}{2}\\))",
        "formulas":  [
                         {
                             "id":  "kb_gt1_01_f1",
                             "name":  "VÃ´ cÃ¹ng bÃ© tÆ°Æ¡ng Ä‘Æ°Æ¡ng lÆ°á»£ng giÃ¡c",
                             "latex":  "\\sin x \\sim x, \\quad \\tan x \\sim x, \\quad \\arcsin x \\sim x, \\quad \\arctan x \\sim x \\quad (x \\to 0)",
                             "desc":  "Thay tháº¿ tÆ°Æ¡ng Ä‘Æ°Æ¡ng khi tÃ­nh giá»›i háº¡n cÃ¡c biá»ƒu thá»©c lÆ°á»£ng giÃ¡c",
                             "tags":  [
                                          "Giáº£i tÃ­ch 1",
                                          "VÃ´ cÃ¹ng bÃ©"
                                      ]
                         },
                         {
                             "id":  "kb_gt1_01_f2",
                             "name":  "Báº£ng vÃ´ cÃ¹ng bÃ© tÆ°Æ¡ng Ä‘Æ°Æ¡ng chuáº©n khi x dáº§n vá» 0",
                             "latex":  "\\sin x \\sim x, \\quad \\tan x \\sim x, \\quad \\ln(1+x) \\sim x, \\quad e^x - 1 \\sim x, \\quad 1 - \\cos x \\sim \\frac{x^2}{2}, \\quad (1+x)^\\alpha - 1 \\sim \\alpha x",
                             "desc":  "Báº£ng quy táº¯c thay tháº¿ vÃ´ cÃ¹ng bÃ© tÆ°Æ¡ng Ä‘Æ°Æ¡ng giáº£i quyáº¿t nhanh giá»›i háº¡n dáº¡ng 0/0",
                             "tags":  [
                                          "Giáº£i tÃ­ch 1",
                                          "VÃ´ cÃ¹ng bÃ©",
                                          "Giá»›i háº¡n"
                                      ]
                         }
                     ],
        "formula_ids":  [
                            "kb_gt1_01_f1",
                            "kb_gt1_01_f2"
                        ],
        "prerequisites":  [
                              "kb_toan11_03"
                          ],
        "related_topics":  [
                               "kb_gt1_02"
                           ],
        "common_traps":  [
                             "Thay tháº¿ vÃ´ cÃ¹ng bÃ© tÆ°Æ¡ng Ä‘Æ°Æ¡ng vÃ o má»™t hiá»‡u (f(x) - g(x)) khi hai sá»‘ háº¡ng triá»‡t tiÃªu nhau",
                             "Ãp dá»¥ng quy táº¯c tÆ°Æ¡ng Ä‘Æ°Æ¡ng khi x khÃ´ng dáº§n vá» 0"
                         ],
        "examples":  [
                         {
                             "title":  "VÃ­ dá»¥ 1: TÃ­nh giá»›i háº¡n báº±ng vÃ´ cÃ¹ng bÃ© tÆ°Æ¡ng Ä‘Æ°Æ¡ng",
                             "question":  "TÃ­nh giá»›i háº¡n \\(L = \\lim_{x \\to 0} \\frac{\\ln(1 + 3x) \\cdot (e^{2x} - 1)}{1 - \\cos 4x}\\).",
                             "solution_steps":  [
                                                    "BÆ°á»›c 1: Khi \\(x \\to 0\\), ta cÃ³ cÃ¡c vÃ´ cÃ¹ng bÃ© tÆ°Æ¡ng Ä‘Æ°Æ¡ng:",
                                                    "Tá»­ sá»‘: \\(\\ln(1 + 3x) \\sim 3x\\) vÃ  \\(e^{2x} - 1 \\sim 2x\\). Do Ä‘Ã³ Tá»­ sá»‘ \\(\\sim 3x \\cdot 2x = 6x^2\\).",
                                                    "Máº«u sá»‘: \\(1 - \\cos 4x \\sim \\frac{(4x)^2}{2} = 8x^2\\).",
                                                    "BÆ°á»›c 2: Thay vÃ o biá»ƒu thá»©c giá»›i háº¡n: \\(L = \\lim_{x \\to 0} \\frac{6x^2}{8x^2} = \\frac{6}{8} = \\frac{3}{4}\\)."
                                                ],
                             "takeaway":  "Chá»‰ Ä‘Æ°á»£c thay vÃ´ cÃ¹ng bÃ© tÆ°Æ¡ng Ä‘Æ°Æ¡ng vÃ o má»™t tÃ­ch hoáº·c má»™t thÆ°Æ¡ng."
                         }
                     ],
        "applications":  "Xáº¥p xá»‰ tuyáº¿n tÃ­nh trong ká»¹ thuáº­t Ä‘iá»u khiá»ƒn tá»± Ä‘á»™ng, phÃ¢n tÃ­ch Ä‘á»™ nháº¡y cá»§a cáº£m biáº¿n cÃ´ng nghiá»‡p, xáº¥p xá»‰ sai sá»‘ Ä‘o lÆ°á»ng váº­t lÃ½.",
        "drill_tags":  [
                           "Giáº£i tÃ­ch 1",
                           "Giá»›i háº¡n",
                           "VÃ´ cÃ¹ng bÃ©"
                       ],
        "related_question_ids":  [
                                     "q_calc_01",
                                     "q_calc_07"
                                 ]
    },
    {
        "id":  "kb_gt1_02",
        "grade":  "Giáº£i tÃ­ch 1",
        "chapter":  "ChÆ°Æ¡ng 2: PhÃ©p tÃ­nh vi phÃ¢n hÃ m má»™t biáº¿n",
        "title":  "Khai triá»ƒn Taylor-Maclaurin, Äáº¡o hÃ m Leibniz \u0026 Quy táº¯c L\u0027HÃ´pital",
        "overview":  "Äáº¡o hÃ m cáº¥p cao cá»§a tÃ­ch báº±ng cÃ´ng thá»©c Leibniz, khá»­ dáº¡ng vÃ´ Ä‘á»‹nh báº±ng quy táº¯c L\u0027HÃ´pital vÃ  xáº¥p xá»‰ hÃ m sá»‘ báº±ng Ä‘a thá»©c Taylor-Maclaurin.",
        "theory_markdown":  "### 1. Äáº¡o hÃ m cáº¥p cao \u0026 CÃ´ng thá»©c Leibniz\nCho hai hÃ m sá»‘ \\(u(x), v(x)\\) cÃ³ Ä‘áº¡o hÃ m Ä‘áº¿n cáº¥p \\(n\\):\n\\[(u \\cdot v)^{(n)} = \\sum_{k=0}^n C_n^k u^{(k)} v^{(n-k)}\\]\n\n### 2. Quy táº¯c L\u0027HÃ´pital\nNáº¿u \\(\\lim_{x \\to x_0} f(x) = \\lim_{x \\to x_0} g(x) = 0\\) (hoáº·c \\(\\pm\\infty\\)) vÃ  \\(g\u0027(x) \\ne 0\\) trong lÃ¢n cáº­n \\(x_0\\), thÃ¬:\n\\[\\lim_{x \\to x_0} \\frac{f(x)}{g(x)} = \\lim_{x \\to x_0} \\frac{f\u0027(x)}{g\u0027(x)}\\]\n\n### 3. Khai triá»ƒn Maclaurin cá»§a cÃ¡c hÃ m sÆ¡ cáº¥p cÆ¡ báº£n\n- \\(e^x = 1 + x + \\frac{x^2}{2!} + \\dots + \\frac{x^n}{n!} + o(x^n)\\)\n- \\(\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\dots + (-1)^n \\frac{x^{2n+1}}{(2n+1)!} + o(x^{2n+2})\\)\n- \\(\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots + (-1)^n \\frac{x^{2n}}{(2n)!} + o(x^{2n+1})\\)\n- \\(\\ln(1 + x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\dots + (-1)^{n-1}\\frac{x^n}{n} + o(x^n)\\)",
        "formulas":  [
                         {
                             "id":  "kb_gt1_02_f1",
                             "name":  "CÃ´ng thá»©c Leibniz Ä‘áº¡o hÃ m cáº¥p n cá»§a tÃ­ch",
                             "latex":  "(uv)^{(n)} = \\sum_{k=0}^n C_n^k u^{(k)} v^{(n-k)}",
                             "desc":  "TÃ­nh Ä‘áº¡o hÃ m cáº¥p cao cá»§a tÃ­ch hai hÃ m sá»‘ kháº£ vi n láº§n",
                             "tags":  [
                                          "Äáº¡o hÃ m cáº¥p cao",
                                          "Leibniz"
                                      ]
                         },
                         {
                             "id":  "kb_gt1_02_f2",
                             "name":  "Khai triá»ƒn Maclaurin cá»§a e^x",
                             "latex":  "e^x = \\sum_{k=0}^n \\frac{x^k}{k!} + o(x^n) = 1 + x + \\frac{x^2}{2!} + \\dots + \\frac{x^n}{n!} + o(x^n)",
                             "desc":  "Xáº¥p xá»‰ Ä‘a thá»©c cá»§a hÃ m mÅ© táº¡i lÃ¢n cáº­n x = 0",
                             "tags":  [
                                          "Maclaurin",
                                          "Taylor"
                                      ]
                         },
                         {
                             "id":  "kb_gt1_02_f3",
                             "name":  "Quy táº¯c L\u0027HÃ´pital khá»­ dáº¡ng vÃ´ Ä‘á»‹nh 0/0 vÃ  vÃ´ cÃ¹ng / vÃ´ cÃ¹ng",
                             "latex":  "\\lim_{x \\to x_0} \\frac{f(x)}{g(x)} = \\lim_{x \\to x_0} \\frac{f\u0027(x)}{g\u0027(x)} \\quad \\left(\\text{khi } \\lim f(x) = \\lim g(x) = 0 \\text{ hoáº·c } \\pm\\infty\\right)",
                             "desc":  "Quy táº¯c láº¥y Ä‘áº¡o hÃ m tá»­ vÃ  máº«u khá»­ dáº¡ng vÃ´ Ä‘á»‹nh cá»§a Bernoulli vÃ  L\u0027HÃ´pital",
                             "tags":  [
                                          "Giáº£i tÃ­ch 1",
                                          "L\u0027Hopital",
                                          "Äáº¡o hÃ m"
                                      ]
                         },
                         {
                             "id":  "kb_gt1_02_f4",
                             "name":  "Báº£ng khai triá»ƒn Maclaurin cÃ¡c hÃ m sÆ¡ cáº¥p",
                             "latex":  "\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} + o(x^5), \\quad \\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} + o(x^4), \\quad \\ln(1+x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} + o(x^3)",
                             "desc":  "Xáº¥p xá»‰ Ä‘a thá»©c Taylor táº¡i lÃ¢n cáº­n x = 0 cá»§a cÃ¡c hÃ m lÆ°á»£ng giÃ¡c vÃ  logarit",
                             "tags":  [
                                          "Giáº£i tÃ­ch 1",
                                          "Maclaurin",
                                          "Taylor"
                                      ]
                         }
                     ],
        "formula_ids":  [
                            "kb_gt1_02_f1",
                            "kb_gt1_02_f2",
                            "kb_gt1_02_f3",
                            "kb_gt1_02_f4"
                        ],
        "prerequisites":  [
                              "kb_toan11_04"
                          ],
        "related_topics":  [
                               "kb_gt1_03"
                           ],
        "common_traps":  [
                             "Láº¡m dá»¥ng L\u0027Hopital khi phÃ¢n thá»©c chÆ°a pháº£i lÃ  dáº¡ng vÃ´ Ä‘á»‹nh 0/0 hoáº·c vÃ´ cÃ¹ng / vÃ´ cÃ¹ng",
                             "QuÃªn sá»‘ dÆ° Peano o(x^n) khi khai triá»ƒn Taylor báº­c n"
                         ],
        "examples":  [
                         {
                             "title":  "VÃ­ dá»¥ 1: TÃ­nh Ä‘áº¡o hÃ m cáº¥p 10 báº±ng Leibniz",
                             "question":  "TÃ­nh Ä‘áº¡o hÃ m cáº¥p 10 cá»§a hÃ m sá»‘ \\(y = x^2 e^{2x}\\).",
                             "solution_steps":  [
                                                    "BÆ°á»›c 1: Chá»n \\(u = e^{2x}\\) (Ä‘áº¡o hÃ m cáº¥p k lÃ  \\(2^k e^{2x}\\)) vÃ  \\(v = x^2\\) (Ä‘áº¡o hÃ m cáº¥p 1: 2x, cáº¥p 2: 2, cáº¥p \u003e= 3: 0).",
                                                    "BÆ°á»›c 2: Ãp dá»¥ng cÃ´ng thá»©c Leibniz, chá»‰ giá»¯ láº¡i k = 0, 1, 2:",
                                                    "\\(y^{(10)} = C_{10}^0 u^{(10)} v + C_{10}^1 u^{(9)} v\u0027 + C_{10}^2 u^{(8)} v\u0027\u0027\\).",
                                                    "BÆ°á»›c 3: Thay sá»‘:",
                                                    "\\(y^{(10)} = 1(2^{10} e^{2x})(x^2) + 10(2^9 e^{2x})(2x) + 45(2^8 e^{2x})(2)\\).",
                                                    "BÆ°á»›c 4: RÃºt gá»n: \\(y^{(10)} = 2^8 e^{2x} (4x^2 + 20x + 90) = 2^9 e^{2x} (2x^2 + 10x + 45)\\)."
                                                ],
                             "takeaway":  "Chá»n v lÃ  hÃ m Ä‘a thá»©c Ä‘á»ƒ Ä‘áº¡o hÃ m triá»‡t tiÃªu nhanh chá»‰ sau vÃ i bÆ°á»›c."
                         }
                     ],
        "applications":  "Thuáº­t toÃ¡n tá»‘i Æ°u hÃ³a báº­c hai Newton-Raphson trong Machine Learning, Æ°á»›c lÆ°á»£ng nÄƒng lÆ°á»£ng háº¡t vi mÃ´ trong cÆ¡ há»c lÆ°á»£ng tá»­.",
        "drill_tags":  [
                           "Leibniz",
                           "Taylor",
                           "Maclaurin",
                           "L\u0027Hopital"
                       ],
        "related_question_ids":  [
                                     "q_calc_02",
                                     "q_calc_08"
                                 ]
    },
    {
        "id":  "kb_gt1_03",
        "grade":  "Giáº£i tÃ­ch 1",
        "chapter":  "ChÆ°Æ¡ng 3: TÃ­ch phÃ¢n Suy rá»™ng",
        "title":  "TÃ­ch phÃ¢n Suy rá»™ng Loáº¡i 1 \u0026 Loáº¡i 2 ToÃ n diá»‡n",
        "overview":  "TÃ­ch phÃ¢n vá»›i cáº­n vÃ´ háº¡n (loáº¡i 1) vÃ  tÃ­ch phÃ¢n cá»§a hÃ m khÃ´ng bá»‹ cháº·n (loáº¡i 2), tiÃªu chuáº©n so sÃ¡nh há»™i tá»¥.",
        "theory_markdown":  "### 1. TÃ­ch phÃ¢n suy rá»™ng loáº¡i 1 (Cáº­n vÃ´ háº¡n)\n\\(\\int_a^{+\\infty} f(x)\\,dx = \\lim_{t \\to +\\infty} \\int_a^t f(x)\\,dx\\).\nTÃ­ch phÃ¢n chuáº©n Riemann:\n\\(\\int_1^{+\\infty} \\frac{1}{x^\\alpha}\\,dx\\) **há»™i tá»¥ khi vÃ  chá»‰ khi \\(\\alpha \u003e 1\\)** (phÃ¢n ká»³ khi \\(\\alpha \\le 1\\)).\n\n### 2. TÃ­ch phÃ¢n suy rá»™ng loáº¡i 2 (HÃ m khÃ´ng bá»‹ cháº·n táº¡i Ä‘iá»ƒm ká»³ dá»‹)\nNáº¿u \\(f(x)\\) giÃ¡n Ä‘oáº¡n vÃ´ cá»±c táº¡i \\(x = b\\):\n\\(\\int_a^b f(x)\\,dx = \\lim_{\\epsilon \\to 0^+} \\int_a^{b - \\epsilon} f(x)\\,dx\\).\nTÃ­ch phÃ¢n chuáº©n:\n\\(\\int_0^1 \\frac{1}{x^\\alpha}\\,dx\\) **há»™i tá»¥ khi vÃ  chá»‰ khi \\(\\alpha \u003c 1\\)**.",
        "formulas":  [
                         {
                             "id":  "kb_gt1_03_f1",
                             "name":  "TiÃªu chuáº©n há»™i tá»¥ TÃ­ch phÃ¢n Riemann",
                             "latex":  "\\int_1^{+\\infty} \\frac{dx}{x^\\alpha} \\text{ há»™i tá»¥ } \\iff \\alpha \u003e 1",
                             "desc":  "Chuáº©n má»±c so sÃ¡nh kiá»ƒm tra há»™i tá»¥ tÃ­ch phÃ¢n loáº¡i 1",
                             "tags":  [
                                          "TÃ­ch phÃ¢n suy rá»™ng",
                                          "Há»™i tá»¥",
                                          "Riemann"
                                      ]
                         }
                     ],
        "formula_ids":  [
                            "kb_gt1_03_f1"
                        ],
        "prerequisites":  [
                              "kb_toan10_01"
                          ],
        "related_topics":  [

                           ],
        "common_traps":  [
                             "Nháº§m láº«n Ä‘iá»u kiá»‡n há»™i tá»¥ giá»¯a loáº¡i 1 (alpha \u003e 1) vÃ  loáº¡i 2 (alpha \u003c 1)"
                         ],
        "examples":  [
                         {
                             "title":  "VÃ­ dá»¥ 1: Kháº£o sÃ¡t sá»± há»™i tá»¥ cá»§a tÃ­ch phÃ¢n",
                             "question":  "Kháº£o sÃ¡t sá»± há»™i tá»¥ cá»§a \\(I = \\int_1^{+\\infty} \\frac{x + 2}{\\sqrt{x^5 + 3x}}\\,dx\\).",
                             "solution_steps":  [
                                                    "BÆ°á»›c 1: XÃ©t hÃ m dÆ°á»›i dáº¥u tÃ­ch phÃ¢n khi \\(x \\to +\\infty\\):",
                                                    "Tá»­ sá»‘: \\(x + 2 \\sim x\\). Máº«u sá»‘: \\(\\sqrt{x^5 + 3x} \\sim x^{5/2}\\).",
                                                    "BÆ°á»›c 2: VÃ´ cÃ¹ng lá»›n tÆ°Æ¡ng Ä‘Æ°Æ¡ng: \\(f(x) \\sim \\frac{x}{x^{5/2}} = \\frac{1}{x^{3/2}}\\).",
                                                    "BÆ°á»›c 3: VÃ¬ \\(\\int_1^{+\\infty} \\frac{1}{x^{3/2}}\\,dx\\) há»™i tá»¥ (do \\(\\alpha = 3/2 \u003e 1\\)), theo tiÃªu chuáº©n so sÃ¡nh giá»›i háº¡n, tÃ­ch phÃ¢n \\(I\\) há»™i tá»¥."
                                                ],
                             "takeaway":  "Chá»‰ giá»¯ láº¡i báº­c cao nháº¥t á»Ÿ cáº£ tá»­ vÃ  máº«u khi x tiáº¿n ra dÆ°Æ¡ng vÃ´ cÃ¹ng."
                         }
                     ],
        "applications":  "TÃ­nh toÃ¡n hÃ m máº­t Ä‘á»™ xÃ¡c suáº¥t liÃªn tá»¥c trÃªn miá»n vÃ´ háº¡n (phÃ¢n phá»‘i chuáº©n Gauss), lÃ½ thuyáº¿t Ä‘iá»‡n tá»« trÆ°á»ng trong khÃ´ng gian má»Ÿ.",
        "drill_tags":  [
                           "TÃ­ch phÃ¢n suy rá»™ng",
                           "TiÃªu chuáº©n so sÃ¡nh",
                           "Há»™i tá»¥"
                       ],
        "related_question_ids":  [
                                     "q_calc_03",
                                     "q_calc_09"
                                 ]
    },
    {
        "id":  "kb_gt1_04",
        "grade":  "Giáº£i tÃ­ch 1",
        "chapter":  "ChÆ°Æ¡ng 4: Chuá»—i sá»‘ \u0026 Chuá»—i hÃ m",
        "title":  "Chuá»—i sá»‘ Thá»±c, TiÃªu chuáº©n D\u0027Alembert \u0026 BÃ¡n kÃ­nh Há»™i tá»¥",
        "overview":  "TiÃªu chuáº©n há»™i tá»¥ chuá»—i sá»‘ dÆ°Æ¡ng D\u0027Alembert, Cauchy, chuá»—i Ä‘an dáº¥u Leibniz vÃ  bÃ¡n kÃ­nh há»™i tá»¥ chuá»—i lÅ©y thá»«a.",
        "theory_markdown":  "### 1. Chuá»—i sá»‘ dÆ°Æ¡ng \u0026 TiÃªu chuáº©n so sÃ¡nh\n- Äiá»u kiá»‡n cáº§n Ä‘á»ƒ chuá»—i \\(\\sum u_n\\) há»™i tá»¥: \\(\\lim_{n \\to \\infty} u_n = 0\\).\n- **Chuá»—i Ä‘iá»u hÃ²a p-series**: \\(\\sum_{n=1}^\\infty \\frac{1}{n^p}\\) há»™i tá»¥ khi \\(p \u003e 1\\), phÃ¢n ká»³ khi \\(p \\le 1\\).\n\n### 2. TiÃªu chuáº©n D\u0027Alembert (Tá»‰ sá»‘)\nXÃ©t \\(D = \\lim_{n \\to \\infty} \\frac{u_{n+1}}{u_n}\\):\n- Náº¿u \\(D \u003c 1\\): Chuá»—i há»™i tá»¥.\n- Náº¿u \\(D \u003e 1\\): Chuá»—i phÃ¢n ká»³.\n- Náº¿u \\(D = 1\\): ChÆ°a káº¿t luáº­n Ä‘Æ°á»£c (cáº§n dÃ¹ng tiÃªu chuáº©n khÃ¡c).\n\n### 3. BÃ¡n kÃ­nh há»™i tá»¥ chuá»—i lÅ©y thá»«a\nChuá»—i \\(\\sum_{n=0}^\\infty a_n x^n\\) cÃ³ bÃ¡n kÃ­nh há»™i tá»¥ \\(R = \\lim_{n \\to \\infty} \\left|\\frac{a_n}{a_{n+1}}\\right|\\).",
        "formulas":  [
                         {
                             "id":  "kb_gt1_04_f1",
                             "name":  "CÃ´ng thá»©c BÃ¡n kÃ­nh há»™i tá»¥ D\u0027Alembert",
                             "latex":  "R = \\lim_{n \\to \\infty} \\left|\\frac{a_n}{a_{n+1}}\\right|",
                             "desc":  "XÃ¡c Ä‘á»‹nh khoáº£ng há»™i tá»¥ (-R, R) cá»§a chuá»—i lÅ©y thá»«a",
                             "tags":  [
                                          "Chuá»—i hÃ m",
                                          "BÃ¡n kÃ­nh há»™i tá»¥"
                                      ]
                         },
                         {
                             "id":  "kb_gt1_04_f2",
                             "name":  "Chuá»—i Ä‘iá»u hÃ²a p-series",
                             "latex":  "\\sum_{n=1}^\\infty \\frac{1}{n^p} \\text{ há»™i tá»¥ } \\iff p \u003e 1",
                             "desc":  "Chuáº©n má»±c so sÃ¡nh kiá»ƒm tra há»™i tá»¥ chuá»—i sá»‘",
                             "tags":  [
                                          "Chuá»—i sá»‘",
                                          "p-series"
                                      ]
                         }
                     ],
        "formula_ids":  [
                            "kb_gt1_04_f1",
                            "kb_gt1_04_f2"
                        ],
        "prerequisites":  [
                              "kb_toan11_02"
                          ],
        "related_topics":  [

                           ],
        "common_traps":  [
                             "QuÃªn kiá»ƒm tra sá»± há»™i tá»¥ táº¡i hai mÃºt x = -R vÃ  x = R cá»§a khoáº£ng há»™i tá»¥ chuá»—i lÅ©y thá»«a",
                             "Nháº§m láº«n D = 1 lÃ  há»™i tá»¥ (thá»±c táº¿ chÆ°a káº¿t luáº­n Ä‘Æ°á»£c)"
                         ],
        "examples":  [
                         {
                             "title":  "VÃ­ dá»¥ 1: TÃ¬m bÃ¡n kÃ­nh há»™i tá»¥ cá»§a chuá»—i lÅ©y thá»«a",
                             "question":  "TÃ¬m miá»n há»™i tá»¥ cá»§a chuá»—i lÅ©y thá»«a \\(\\sum_{n=1}^\\infty \\frac{x^n}{n \\cdot 3^n}\\).",
                             "solution_steps":  [
                                                    "BÆ°á»›c 1: Há»‡ sá»‘ \\(a_n = \\frac{1}{n \\cdot 3^n}\\).",
                                                    "BÆ°á»›c 2: BÃ¡n kÃ­nh há»™i tá»¥: \\(R = \\lim_{n \\to \\infty} \\frac{a_n}{a_{n+1}} = \\lim_{n \\to \\infty} \\frac{(n+1)3^{n+1}}{n 3^n} = 3 \\lim \\frac{n+1}{n} = 3\\).",
                                                    "BÆ°á»›c 3: Khoáº£ng há»™i tá»¥: \\((-3; 3)\\).",
                                                    "BÆ°á»›c 4: XÃ©t hai Ä‘áº§u mÃºt:",
                                                    "- Táº¡i \\(x = 3\\): Chuá»—i trá»Ÿ thÃ nh \\(\\sum \\frac{1}{n}\\) (chuá»—i Ä‘iá»u hÃ²a p = 1 phÃ¢n ká»³).",
                                                    "- Táº¡i \\(x = -3\\): Chuá»—i trá»Ÿ thÃ nh \\(\\sum \\frac{(-1)^n}{n}\\) (chuá»—i Ä‘an dáº¥u há»™i tá»¥ theo Leibniz).",
                                                    "BÆ°á»›c 5: Miá»n há»™i tá»¥: \\([-3; 3)\\)."
                                                ],
                             "takeaway":  "LuÃ´n luÃ´n pháº£i kiá»ƒm tra Ä‘á»™c láº­p táº¡i 2 Ä‘áº§u mÃºt sau khi tÃ¬m Ä‘Æ°á»£c bÃ¡n kÃ­nh R."
                         }
                     ],
        "applications":  "Khai triá»ƒn giáº£i thuáº­t biáº¿n Ä‘á»•i Fourier nhanh (FFT), nÃ©n áº£nh JPEG qua chuá»—i Cosine rá»i ráº¡c, tÃ­nh toÃ¡n xáº¥p xá»‰ sá»‘ há»c trong siÃªu mÃ¡y tÃ­nh.",
        "drill_tags":  [
                           "Chuá»—i sá»‘",
                           "BÃ¡n kÃ­nh há»™i tá»¥",
                           "D\u0027Alembert"
                       ],
        "related_question_ids":  [
                                     "q_calc_04",
                                     "q_calc_10"
                                 ]
    },
    {
        "id":  "kb_gt1_05",
        "grade":  "Giáº£i tÃ­ch 1",
        "chapter":  "ChÆ°Æ¡ng 5: PhÆ°Æ¡ng trÃ¬nh Vi phÃ¢n",
        "title":  "PhÆ°Æ¡ng trÃ¬nh Vi phÃ¢n Tuyáº¿n tÃ­nh \u0026 PhÆ°Æ¡ng trÃ¬nh Äáº·c trÆ°ng",
        "overview":  "PhÆ°Æ¡ng trÃ¬nh vi phÃ¢n cáº¥p 1 tÃ¡ch biáº¿n, tuyáº¿n tÃ­nh vÃ  phÆ°Æ¡ng trÃ¬nh vi phÃ¢n tuyáº¿n tÃ­nh cáº¥p 2 há»‡ sá»‘ háº±ng qua phÆ°Æ¡ng trÃ¬nh Ä‘áº·c trÆ°ng.",
        "theory_markdown":  "### 1. PhÆ°Æ¡ng trÃ¬nh vi phÃ¢n tuyáº¿n tÃ­nh cáº¥p 1\nDáº¡ng: \\(y\u0027 + p(x)y = q(x)\\).\n- Thá»«a sá»‘ tÃ­ch phÃ¢n: \\(I(x) = e^{\\int p(x)dx}\\).\n- Nghiá»‡m tá»•ng quÃ¡t: \\(y = e^{-\\int p(x)dx} \\left[\\int q(x)e^{\\int p(x)dx}dx + C\\right]\\).\n\n### 2. PhÆ°Æ¡ng trÃ¬nh vi phÃ¢n tuyáº¿n tÃ­nh cáº¥p 2 há»‡ sá»‘ háº±ng thuáº§n nháº¥t\nDáº¡ng: \\(y\u0027\u0027 + ay\u0027 + by = 0\\).\n- PhÆ°Æ¡ng trÃ¬nh Ä‘áº·c trÆ°ng: \\(k^2 + ak + b = 0\\).\n  - \\(\\Delta \u003e 0\\) (2 nghiá»‡m thá»±c phÃ¢n biá»‡t \\(k_1, k_2\\)): \\(y = C_1 e^{k_1 x} + C_2 e^{k_2 x}\\).\n  - \\(\\Delta = 0\\) (nghiá»‡m kÃ©p \\(k\\)): \\(y = (C_1 + C_2 x)e^{kx}\\).\n  - \\(\\Delta \u003c 0\\) (nghiá»‡m phá»©c \\(\\alpha \\pm i\\beta\\)): \\(y = e^{\\alpha x}(C_1 \\cos\\beta x + C_2 \\sin\\beta x)\\).",
        "formulas":  [
                         {
                             "id":  "kb_gt1_05_f1",
                             "name":  "Nghiá»‡m phÆ°Æ¡ng trÃ¬nh vi phÃ¢n tuyáº¿n tÃ­nh cáº¥p 1",
                             "latex":  "y = e^{-\\int p(x)dx} \\left(\\int q(x)e^{\\int p(x)dx}dx + C\\right)",
                             "desc":  "CÃ´ng thá»©c tÃ­ch phÃ¢n thá»«a sá»‘ giáº£i phÆ°Æ¡ng trÃ¬nh vi phÃ¢n tuyáº¿n tÃ­nh báº­c nháº¥t",
                             "tags":  [
                                          "Vi phÃ¢n cáº¥p 1",
                                          "Thá»«a sá»‘ tÃ­ch phÃ¢n"
                                      ]
                         },
                         {
                             "id":  "kb_gt1_05_f2",
                             "name":  "PhÆ°Æ¡ng trÃ¬nh Ä‘áº·c trÆ°ng cáº¥p 2",
                             "latex":  "k^2 + ak + b = 0",
                             "desc":  "Giáº£i nghiá»‡m Ä‘áº¡i sá»‘ tÃ¬m nghiá»‡m cÆ¡ báº£n cá»§a phÆ°Æ¡ng trÃ¬nh vi phÃ¢n cáº¥p 2",
                             "tags":  [
                                          "Vi phÃ¢n cáº¥p 2",
                                          "PhÆ°Æ¡ng trÃ¬nh Ä‘áº·c trÆ°ng"
                                      ]
                         }
                     ],
        "formula_ids":  [
                            "kb_gt1_05_f1",
                            "kb_gt1_05_f2"
                        ],
        "prerequisites":  [
                              "kb_gt1_03"
                          ],
        "related_topics":  [

                           ],
        "common_traps":  [
                             "QuÃªn dáº¥u trá»« trong mÅ© e^{-\\int p(x)dx} khi viáº¿t cÃ´ng thá»©c nghiá»‡m tá»•ng quÃ¡t",
                             "Nháº§m láº«n giá»¯a nghiá»‡m kÃ©p (nhÃ¢n thÃªm x) vÃ  hai nghiá»‡m phÃ¢n biá»‡t"
                         ],
        "examples":  [
                         {
                             "title":  "VÃ­ dá»¥ 1: Giáº£i phÆ°Æ¡ng trÃ¬nh vi phÃ¢n cáº¥p 2 dao Ä‘á»™ng",
                             "question":  "TÃ¬m nghiá»‡m tá»•ng quÃ¡t cá»§a phÆ°Æ¡ng trÃ¬nh \\(y\u0027\u0027 - 4y\u0027 + 13y = 0\\).",
                             "solution_steps":  [
                                                    "BÆ°á»›c 1: PhÆ°Æ¡ng trÃ¬nh Ä‘áº·c trÆ°ng: \\(k^2 - 4k + 13 = 0\\).",
                                                    "BÆ°á»›c 2: Biá»‡t thá»©c: \\(\\Delta\u0027 = 4 - 13 = -9 = (3i)^2\\).",
                                                    "BÆ°á»›c 3: Nghiá»‡m phá»©c: \\(k_{1, 2} = 2 \\pm 3i \\implies \\alpha = 2, \\beta = 3\\).",
                                                    "BÆ°á»›c 4: Nghiá»‡m tá»•ng quÃ¡t: \\(y = e^{2x}(C_1 \\cos 3x + C_2 \\sin 3x)\\) vá»›i \\(C_1, C_2 \\in \\mathbb{R}\\)."
                                                ],
                             "takeaway":  "Nghiá»‡m phá»©c liÃªn há»£p mÃ´ táº£ dao Ä‘á»™ng Ä‘iá»u hÃ²a suy giáº£m hoáº·c tÄƒng dáº§n."
                         }
                     ],
        "applications":  "MÃ´ hÃ¬nh hÃ³a máº¡ch dao Ä‘á»™ng Ä‘iá»‡n RLC trong ká»¹ thuáº­t Ä‘iá»‡n tá»­, dao Ä‘á»™ng cÆ¡ há»c giáº£m cháº¥n cá»§a há»‡ thá»‘ng treo Ã´ tÃ´, Ä‘á»™ng lá»±c há»c quáº§n thá»ƒ sinh thÃ¡i.",
        "drill_tags":  [
                           "PhÆ°Æ¡ng trÃ¬nh vi phÃ¢n",
                           "Cáº¥p 2",
                           "Dao Ä‘á»™ng"
                       ],
        "related_question_ids":  [
                                     "q_calc_05",
                                     "q_calc_11"
                                 ]
    }
];
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
const PUMKIN_DEFAULT_EXAMS = [
  {
    "id": "exam_tsa_01",
    "title": "TSA 2025 â€“ Äá» Thi Thá»­ Nghiá»‡m TÆ° Duy ToÃ¡n Há»c Äá»£t 1 (MÃ£ 101)",
    "type": "TSA",
    "exam_format_version": "TSA-2025",
    "year": 2025,
    "duration_minutes": 60,
    "question_count": 12,
    "question_ids": [
      "q_tsa_01",
      "q_tsa_02",
      "q_tsa_03",
      "q_tsa_04",
      "q_tsa_tf_01",
      "q_tsa_sa_01",
      "q_tsa_05",
      "q_tsa_06",
      "q_tsa_07",
      "q_tsa_08",
      "q_tsa_09",
      "q_tsa_10"
    ],
    "difficulty": "KhÃ³",
    "source": "Äáº¡i há»c BÃ¡ch Khoa HÃ  Ná»™i",
    "source_type": "official",
    "license": "CC BY-NC-SA 4.0",
    "description": "Äá» thi chuáº©n hÃ³a bÃ¡m sÃ¡t cáº¥u trÃºc Ä‘á» thi chÃ­nh thá»©c: Tá»‘i Æ°u hÃ³a AM-GM, cá»±c trá»‹ hÃ¬nh thang, xÃ­ch Markov 2 tráº¡ng thÃ¡i vÃ  há»‡ Cramer.",
    "attempts_count": 3420,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n 1: Tráº¯c nghiá»‡m khÃ¡ch quan 4 lá»±a chá»n",
        "question_count": 6
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n 2: Tráº¯c nghiá»‡m ÄÃºng / Sai chÃ¹m 4 Ã½",
        "question_count": 3
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n 3: Äiá»n Ä‘Ã¡p sá»‘ ngáº¯n",
        "question_count": 3
      }
    ],
    "scoring": {
      "type": "tsa_stepped",
      "max_score": 40
    }
  },
  {
    "id": "exam_tsa_02",
    "title": "TSA 2025 â€“ Äá» Kháº£o SÃ¡t NÄƒng Lá»±c TÆ° Duy Äá»£t 2 (MÃ£ 102)",
    "type": "TSA",
    "exam_format_version": "TSA-2025",
    "year": 2025,
    "duration_minutes": 60,
    "question_count": 12,
    "question_ids": [
      "q_tsa_11",
      "q_tsa_12",
      "q_tsa_13",
      "q_tsa_14",
      "q_tsa_tf_01",
      "q_tsa_sa_01",
      "q_tsa_15",
      "q_tsa_16",
      "q_tsa_17",
      "q_tsa_18",
      "q_tsa_19",
      "q_tsa_20"
    ],
    "difficulty": "KhÃ³",
    "source": "Äáº¡i há»c BÃ¡ch Khoa HÃ  Ná»™i",
    "source_type": "official",
    "license": "CC BY-NC-SA 4.0",
    "description": "Äáº·c trÆ°ng tÆ° duy logic, mÃ´ hÃ¬nh hÃ³a tÄƒng trÆ°á»Ÿng Logarit, Ä‘á»‹nh lÃ½ Bayes trong xÃ©t nghiá»‡m y táº¿ vÃ  bÃ i toÃ¡n cáº¯t táº¥m tÃ´n tá»‘i Æ°u.",
    "attempts_count": 2890,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n 1: Tráº¯c nghiá»‡m khÃ¡ch quan 4 lá»±a chá»n",
        "question_count": 6
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n 2: Tráº¯c nghiá»‡m ÄÃºng / Sai chÃ¹m 4 Ã½",
        "question_count": 3
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n 3: Äiá»n Ä‘Ã¡p sá»‘ ngáº¯n",
        "question_count": 3
      }
    ],
    "scoring": {
      "type": "tsa_stepped",
      "max_score": 40
    }
  },
  {
    "id": "exam_tsa_03",
    "title": "TSA 2024 â€“ Äá» Thi ChÃ­nh Thá»©c TÆ° Duy ToÃ¡n Há»c Äá»£t 1 (MÃ£ 201)",
    "type": "TSA",
    "exam_format_version": "TSA-2025",
    "year": 2024,
    "duration_minutes": 60,
    "question_count": 10,
    "question_ids": [
      "q_tsa_01",
      "q_tsa_03",
      "q_tsa_06",
      "q_tsa_08",
      "q_tsa_10",
      "q_tsa_12",
      "q_tsa_14",
      "q_tsa_16",
      "q_tsa_18",
      "q_tsa_20"
    ],
    "difficulty": "KhÃ³",
    "source": "Äáº¡i há»c BÃ¡ch Khoa HÃ  Ná»™i",
    "source_type": "official",
    "license": "CC BY-NC-SA 4.0",
    "description": "Äá» thi tuyá»ƒn sinh Äá»£t 1 nÄƒm 2024 vá»›i cÃ¡c dáº¡ng toÃ¡n thá»±c táº¿ á»©ng dá»¥ng cao, Ä‘Ã²i há»i tÃ­nh toÃ¡n nhanh vÃ  chÃ­nh xÃ¡c.",
    "attempts_count": 5120,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n 1: Tráº¯c nghiá»‡m khÃ¡ch quan 4 lá»±a chá»n",
        "question_count": 5
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n 2: Tráº¯c nghiá»‡m ÄÃºng / Sai chÃ¹m 4 Ã½",
        "question_count": 3
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n 3: Äiá»n Ä‘Ã¡p sá»‘ ngáº¯n",
        "question_count": 3
      }
    ],
    "scoring": {
      "type": "tsa_stepped",
      "max_score": 40
    }
  },
  {
    "id": "exam_tsa_04",
    "title": "TSA 2024 â€“ Äá» Thi ChÃ­nh Thá»©c TÆ° Duy ToÃ¡n Há»c Äá»£t 2 (MÃ£ 202)",
    "type": "TSA",
    "exam_format_version": "TSA-2025",
    "year": 2024,
    "duration_minutes": 60,
    "question_count": 10,
    "question_ids": [
      "q_tsa_02",
      "q_tsa_04",
      "q_tsa_05",
      "q_tsa_07",
      "q_tsa_09",
      "q_tsa_11",
      "q_tsa_13",
      "q_tsa_15",
      "q_tsa_17",
      "q_tsa_19"
    ],
    "difficulty": "KhÃ³",
    "source": "Äáº¡i há»c BÃ¡ch Khoa HÃ  Ná»™i",
    "source_type": "official",
    "license": "CC BY-NC-SA 4.0",
    "description": "Táº­p trung vÃ o phÃ¢n tÃ­ch Ä‘á»‹nh lÆ°á»£ng, biá»ƒu Ä‘á»“ biáº¿n thiÃªn, ma tráº­n nghá»‹ch Ä‘áº£o vÃ  bÃ i toÃ¡n lÃ£i suáº¥t niÃªn kim.",
    "attempts_count": 4680,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n 1: Tráº¯c nghiá»‡m khÃ¡ch quan 4 lá»±a chá»n",
        "question_count": 5
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n 2: Tráº¯c nghiá»‡m ÄÃºng / Sai chÃ¹m 4 Ã½",
        "question_count": 3
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n 3: Äiá»n Ä‘Ã¡p sá»‘ ngáº¯n",
        "question_count": 3
      }
    ],
    "scoring": {
      "type": "tsa_stepped",
      "max_score": 40
    }
  },
  {
    "id": "exam_tsa_05",
    "title": "TSA 2026 â€“ Äá» Dá»± Bá»‹ PhÃ¡t Triá»ƒn Äá» Minh Há»a Chuáº©n Cáº¥u TrÃºc Má»›i",
    "type": "TSA",
    "exam_format_version": "TSA-2026",
    "year": 2026,
    "duration_minutes": 60,
    "question_count": 11,
    "question_ids": [
      "q_tsa_01",
      "q_tsa_02",
      "q_tsa_07",
      "q_tsa_09",
      "q_tsa_11",
      "q_tsa_tf_01",
      "q_tsa_13",
      "q_tsa_16",
      "q_tsa_18",
      "q_tsa_20",
      "q_tsa_sa_01"
    ],
    "difficulty": "KhÃ³",
    "source": "Tá»• ChuyÃªn MÃ´n ToÃ¡n PUMKIN.DEV",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "Äá» thi phÃ¡t triá»ƒn Ä‘á»‹nh hÆ°á»›ng ChÆ°Æ¡ng trÃ¬nh GDPT 2018 vá»›i 100% cÃ¢u há»i gáº¯n vá»›i bá»‘i cáº£nh khoa há»c cÃ´ng nghá»‡ hiá»‡n Ä‘áº¡i.",
    "attempts_count": 1950,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n 1: Tráº¯c nghiá»‡m khÃ¡ch quan 4 lá»±a chá»n",
        "question_count": 6
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n 2: Tráº¯c nghiá»‡m ÄÃºng / Sai chÃ¹m 4 Ã½",
        "question_count": 3
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n 3: Äiá»n Ä‘Ã¡p sá»‘ ngáº¯n",
        "question_count": 3
      }
    ],
    "scoring": {
      "type": "tsa_stepped",
      "max_score": 40
    }
  },
  {
    "id": "exam_tsa_06",
    "title": "TSA 2025 â€“ Äá» Kháº£o SÃ¡t Äá»£t 3 ChuyÃªn Äá» Tá»‘i Æ¯u HÃ³a & Quy Hoáº¡ch Tuyáº¿n TÃ­nh",
    "type": "TSA",
    "exam_format_version": "TSA-2025",
    "year": 2025,
    "duration_minutes": 60,
    "question_count": 10,
    "question_ids": [
      "q_tsa_01",
      "q_tsa_02",
      "q_tsa_09",
      "q_tsa_15",
      "q_tsa_21",
      "q_tsa_22",
      "q_tsa_23",
      "q_tsa_24",
      "q_tsa_tf_01",
      "q_tsa_sa_01"
    ],
    "difficulty": "KhÃ³",
    "source": "Äáº¡i há»c BÃ¡ch Khoa HÃ  Ná»™i",
    "source_type": "official",
    "license": "CC BY-NC-SA 4.0",
    "description": "ChuyÃªn sÃ¢u vá» cÃ¡c bÃ i toÃ¡n cá»±c trá»‹ Ä‘a biáº¿n, quy hoáº¡ch lá»“i, tÃ¬m Ä‘iá»ƒm tá»‘i Æ°u trÃªn miá»n Ä‘a giÃ¡c vÃ  phÃ¢n bá»• nguá»“n lá»±c.",
    "attempts_count": 1820,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n 1: Tráº¯c nghiá»‡m khÃ¡ch quan 4 lá»±a chá»n",
        "question_count": 5
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n 2: Tráº¯c nghiá»‡m ÄÃºng / Sai chÃ¹m 4 Ã½",
        "question_count": 3
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n 3: Äiá»n Ä‘Ã¡p sá»‘ ngáº¯n",
        "question_count": 3
      }
    ],
    "scoring": {
      "type": "tsa_stepped",
      "max_score": 40
    }
  },
  {
    "id": "exam_tsa_07",
    "title": "TSA 2025 â€“ Äá» Kháº£o SÃ¡t Äá»£t 4 ChuyÃªn Äá» XÃ¡c Suáº¥t & MÃ´ HÃ¬nh Markov",
    "type": "TSA",
    "exam_format_version": "TSA-2025",
    "year": 2025,
    "duration_minutes": 60,
    "question_count": 10,
    "question_ids": [
      "q_tsa_03",
      "q_tsa_10",
      "q_tsa_11",
      "q_tsa_12",
      "q_tsa_25",
      "q_tsa_26",
      "q_tsa_27",
      "q_tsa_28",
      "q_tsa_tf_01",
      "q_tsa_sa_01"
    ],
    "difficulty": "KhÃ³",
    "source": "Äáº¡i há»c BÃ¡ch Khoa HÃ  Ná»™i",
    "source_type": "official",
    "license": "CC BY-NC-SA 4.0",
    "description": "Kiá»ƒm tra nÄƒng lá»±c phÃ¢n tÃ­ch xÃ¡c suáº¥t cÃ³ Ä‘iá»u kiá»‡n, Ä‘á»‹nh lÃ½ Bayes, chuá»—i thá»i gian vÃ  tráº¡ng thÃ¡i dá»«ng cá»§a ma tráº­n ngáº«u nhiÃªn.",
    "attempts_count": 2210,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n 1: Tráº¯c nghiá»‡m khÃ¡ch quan 4 lá»±a chá»n",
        "question_count": 5
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n 2: Tráº¯c nghiá»‡m ÄÃºng / Sai chÃ¹m 4 Ã½",
        "question_count": 3
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n 3: Äiá»n Ä‘Ã¡p sá»‘ ngáº¯n",
        "question_count": 3
      }
    ],
    "scoring": {
      "type": "tsa_stepped",
      "max_score": 40
    }
  },
  {
    "id": "exam_tsa_08",
    "title": "TSA 2025 â€“ Äá» Kháº£o SÃ¡t Äá»£t 5 ChuyÃªn Äá» Äáº¡i Sá»‘ Ma Tráº­n & Thuáº­t ToÃ¡n",
    "type": "TSA",
    "exam_format_version": "TSA-2025",
    "year": 2025,
    "duration_minutes": 60,
    "question_count": 10,
    "question_ids": [
      "q_tsa_04",
      "q_tsa_08",
      "q_tsa_14",
      "q_tsa_29",
      "q_tsa_30",
      "q_tsa_31",
      "q_tsa_32",
      "q_tsa_33",
      "q_tsa_tf_01",
      "q_tsa_sa_01"
    ],
    "difficulty": "KhÃ³",
    "source": "Äáº¡i há»c BÃ¡ch Khoa HÃ  Ná»™i",
    "source_type": "official",
    "license": "CC BY-NC-SA 4.0",
    "description": "Há»‡ thá»‘ng bÃ i táº­p tÆ° duy Ä‘áº¡i sá»‘ hiá»‡n Ä‘áº¡i: giáº£i há»‡ Cramer, ma tráº­n xoay 2D, giáº£i mÃ£ kÃ½ tá»± vÃ  phÃ¢n tÃ­ch Ä‘á»™ phá»©c táº¡p thuáº­t toÃ¡n.",
    "attempts_count": 1640,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n 1: Tráº¯c nghiá»‡m khÃ¡ch quan 4 lá»±a chá»n",
        "question_count": 5
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n 2: Tráº¯c nghiá»‡m ÄÃºng / Sai chÃ¹m 4 Ã½",
        "question_count": 3
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n 3: Äiá»n Ä‘Ã¡p sá»‘ ngáº¯n",
        "question_count": 3
      }
    ],
    "scoring": {
      "type": "tsa_stepped",
      "max_score": 40
    }
  },
  {
    "id": "exam_tsa_09",
    "title": "TSA 2025 â€“ Äá» Kháº£o SÃ¡t Äá»£t 6 Tá»•ng Há»£p TÆ° Duy ToÃ¡n Há»c ToÃ n Diá»‡n",
    "type": "TSA",
    "exam_format_version": "TSA-2025",
    "year": 2025,
    "duration_minutes": 60,
    "question_count": 11,
    "question_ids": [
      "q_tsa_01",
      "q_tsa_03",
      "q_tsa_05",
      "q_tsa_07",
      "q_tsa_13",
      "q_tsa_17",
      "q_tsa_21",
      "q_tsa_25",
      "q_tsa_34",
      "q_tsa_35",
      "q_tsa_step_01"
    ],
    "difficulty": "KhÃ³",
    "source": "Äáº¡i há»c BÃ¡ch Khoa HÃ  Ná»™i",
    "source_type": "official",
    "license": "CC BY-NC-SA 4.0",
    "description": "Äá» tá»•ng há»£p mÃ´ phá»ng ká»³ thi chÃ­nh thá»©c Äá»£t 6, káº¿t há»£p toÃ n diá»‡n tá»« giáº£i tÃ­ch, hÃ¬nh há»c tá»a Ä‘á»™ Ä‘áº¿n xÃ¡c suáº¥t á»©ng dá»¥ng.",
    "attempts_count": 2470,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n 1: Tráº¯c nghiá»‡m khÃ¡ch quan 4 lá»±a chá»n",
        "question_count": 6
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n 2: Tráº¯c nghiá»‡m ÄÃºng / Sai chÃ¹m 4 Ã½",
        "question_count": 3
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n 3: Äiá»n Ä‘Ã¡p sá»‘ ngáº¯n",
        "question_count": 3
      }
    ],
    "scoring": {
      "type": "tsa_stepped",
      "max_score": 40
    }
  },
  {
    "id": "exam_tsa_10",
    "title": "TSA 2026 â€“ Äá» Thi Thá»­ ThÃ¡ch Äiá»ƒm Tuyá»‡t Äá»‘i 40/40 (Äá»£t A)",
    "type": "TSA",
    "exam_format_version": "TSA-2026",
    "year": 2026,
    "duration_minutes": 60,
    "question_count": 11,
    "question_ids": [
      "q_tsa_02",
      "q_tsa_04",
      "q_tsa_06",
      "q_tsa_12",
      "q_tsa_16",
      "q_tsa_20",
      "q_tsa_22",
      "q_tsa_28",
      "q_tsa_32",
      "q_tsa_36",
      "q_tsa_step_01"
    ],
    "difficulty": "KhÃ³",
    "source": "CLB BÃ¡ch Khoa Ká»¹ Thuáº­t",
    "source_type": "official",
    "license": "CC BY-NC-SA 4.0",
    "description": "Äá» phÃ¢n loáº¡i Ä‘á»‰nh cao dÃ nh cho thÃ­ sinh Ä‘áº·t má»¥c tiÃªu thá»§ khoa vÃ  xÃ©t tuyá»ƒn vÃ o cÃ¡c ngÃ nh IT1, IT2, ME1 ÄHBK.",
    "attempts_count": 1530,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n 1: Tráº¯c nghiá»‡m khÃ¡ch quan 4 lá»±a chá»n",
        "question_count": 6
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n 2: Tráº¯c nghiá»‡m ÄÃºng / Sai chÃ¹m 4 Ã½",
        "question_count": 3
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n 3: Äiá»n Ä‘Ã¡p sá»‘ ngáº¯n",
        "question_count": 3
      }
    ],
    "scoring": {
      "type": "tsa_stepped",
      "max_score": 40
    }
  },
  {
    "id": "exam_tsa_11",
    "title": "TSA 2026 â€“ Äá» Luyá»‡n Táº­p TÆ° Duy Tá»‘c Äá»™ 60 GiÃ¢y / CÃ¢u (Äá»£t B)",
    "type": "TSA",
    "exam_format_version": "TSA-2026",
    "year": 2026,
    "duration_minutes": 60,
    "question_count": 11,
    "question_ids": [
      "q_tsa_01",
      "q_tsa_05",
      "q_tsa_08",
      "q_tsa_10",
      "q_tsa_14",
      "q_tsa_19",
      "q_tsa_23",
      "q_tsa_27",
      "q_tsa_31",
      "q_tsa_37",
      "q_tsa_sa_01"
    ],
    "difficulty": "Trung bÃ¬nh",
    "source": "Tá»• ChuyÃªn MÃ´n ToÃ¡n PUMKIN.DEV",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "RÃ¨n luyá»‡n pháº£n xáº¡ phÃ¡t hiá»‡n mÃ¢u thuáº«n dá»¯ kiá»‡n, ká»¹ thuáº­t loáº¡i trá»« Ä‘Ã¡p Ã¡n nhanh vÃ  báº¥m mÃ¡y Casio há»— trá»£ tá»‘i Æ°u.",
    "attempts_count": 2190,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n 1: Tráº¯c nghiá»‡m khÃ¡ch quan 4 lá»±a chá»n",
        "question_count": 6
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n 2: Tráº¯c nghiá»‡m ÄÃºng / Sai chÃ¹m 4 Ã½",
        "question_count": 3
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n 3: Äiá»n Ä‘Ã¡p sá»‘ ngáº¯n",
        "question_count": 3
      }
    ],
    "scoring": {
      "type": "tsa_stepped",
      "max_score": 40
    }
  },
  {
    "id": "exam_tsa_12",
    "title": "TSA 2026 â€“ Äá» Äá»™t PhÃ¡ CÃ¢u Há»i Äiá»n ÄÃ¡p Sá»‘ Ngáº¯n & ÄÃºng Sai ChÃ¹m",
    "type": "TSA",
    "exam_format_version": "TSA-2026",
    "year": 2026,
    "duration_minutes": 60,
    "question_count": 10,
    "question_ids": [
      "q_tsa_tf_01",
      "q_tsa_sa_01",
      "q_tsa_step_01",
      "q_tsa_03",
      "q_tsa_09",
      "q_tsa_15",
      "q_tsa_24",
      "q_tsa_26",
      "q_tsa_30",
      "q_tsa_35"
    ],
    "difficulty": "KhÃ³",
    "source": "Äáº¡i há»c BÃ¡ch Khoa HÃ  Ná»™i",
    "source_type": "official",
    "license": "CC BY-NC-SA 4.0",
    "description": "Äá» táº­p trung vÃ o Ä‘á»‹nh dáº¡ng cÃ¢u há»i chÃ¹m ÄÃºng/Sai phÃ¢n báº­c Ä‘iá»ƒm Bá»™ GD&ÄT vÃ  cÃ¢u há»i Ä‘iá»n sá»‘ thá»±c chuáº©n hÃ³a.",
    "attempts_count": 2840,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n 1: Tráº¯c nghiá»‡m khÃ¡ch quan 4 lá»±a chá»n",
        "question_count": 5
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n 2: Tráº¯c nghiá»‡m ÄÃºng / Sai chÃ¹m 4 Ã½",
        "question_count": 3
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n 3: Äiá»n Ä‘Ã¡p sá»‘ ngáº¯n",
        "question_count": 3
      }
    ],
    "scoring": {
      "type": "tsa_stepped",
      "max_score": 40
    }
  },
  {
    "id": "exam_hsa_01",
    "title": "HSA 2025 â€“ Äá» Thi Äá»‹nh LÆ°á»£ng ToÃ¡n Há»c Chuáº©n HÃ³a (MÃ£ 301)",
    "type": "HSA",
    "exam_format_version": "HSA-2025",
    "year": 2025,
    "duration_minutes": 75,
    "question_count": 12,
    "question_ids": [
      "q_hsa_01",
      "q_hsa_02",
      "q_hsa_03",
      "q_hsa_04",
      "q_hsa_tf_01",
      "q_hsa_sa_01",
      "q_hsa_05",
      "q_hsa_06",
      "q_hsa_07",
      "q_hsa_08",
      "q_hsa_09",
      "q_hsa_10"
    ],
    "difficulty": "Trung bÃ¬nh",
    "source": "Äáº¡i há»c Quá»‘c gia HÃ  Ná»™i",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "Cáº¥u trÃºc 50 cÃ¢u Ä‘á»‹nh lÆ°á»£ng: DÃ£y sá»‘ cáº¥p sá»‘ cá»™ng, kháº£o sÃ¡t cá»±c trá»‹ hÃ m báº­c 3, hÃ¬nh chÃ³p tam giÃ¡c Ä‘á»u vÃ  giáº£i tÃ­ch Oxyz.",
    "attempts_count": 4120,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n 1: TÆ° duy Ä‘á»‹nh lÆ°á»£ng tráº¯c nghiá»‡m",
        "question_count": 8
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n 2: Äiá»n Ä‘Ã¡p Ã¡n sá»‘ há»c",
        "question_count": 4
      }
    ],
    "scoring": {
      "type": "hsa_raw",
      "max_score": 50
    }
  },
  {
    "id": "exam_hsa_02",
    "title": "HSA 2025 â€“ Äá» Kháº£o SÃ¡t NÄƒng Lá»±c ToÃ¡n Há»c (MÃ£ 302)",
    "type": "HSA",
    "exam_format_version": "HSA-2025",
    "year": 2025,
    "duration_minutes": 75,
    "question_count": 12,
    "question_ids": [
      "q_hsa_11",
      "q_hsa_12",
      "q_hsa_13",
      "q_hsa_14",
      "q_hsa_tf_01",
      "q_hsa_sa_01",
      "q_hsa_15",
      "q_hsa_01",
      "q_hsa_03",
      "q_hsa_05",
      "q_hsa_07",
      "q_hsa_09"
    ],
    "difficulty": "Trung bÃ¬nh",
    "source": "Äáº¡i há»c Quá»‘c gia HÃ  Ná»™i",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "Bao quÃ¡t kiáº¿n thá»©c lá»›p 10, 11 vÃ  12: Thá»‘ng kÃª ghÃ©p nhÃ³m, phÃ©p Ä‘áº¿m tá»• há»£p, nhá»‹ thá»©c Newton vÃ  xÃ¡c suáº¥t cá»• Ä‘iá»ƒn.",
    "attempts_count": 3670,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n 1: TÆ° duy Ä‘á»‹nh lÆ°á»£ng tráº¯c nghiá»‡m",
        "question_count": 8
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n 2: Äiá»n Ä‘Ã¡p Ã¡n sá»‘ há»c",
        "question_count": 4
      }
    ],
    "scoring": {
      "type": "hsa_raw",
      "max_score": 50
    }
  },
  {
    "id": "exam_hsa_03",
    "title": "HSA 2024 â€“ Äá» Thi ChÃ­nh Thá»©c ÄÃ¡nh GiÃ¡ NÄƒng Lá»±c Äá»£t 401",
    "type": "HSA",
    "exam_format_version": "HSA-2025",
    "year": 2024,
    "duration_minutes": 75,
    "question_count": 10,
    "question_ids": [
      "q_hsa_02",
      "q_hsa_04",
      "q_hsa_06",
      "q_hsa_08",
      "q_hsa_10",
      "q_hsa_12",
      "q_hsa_14",
      "q_hsa_01",
      "q_hsa_05",
      "q_hsa_09"
    ],
    "difficulty": "Trung bÃ¬nh",
    "source": "Äáº¡i há»c Quá»‘c gia HÃ  Ná»™i",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "Äá» thi chÃ­nh thá»©c Ä‘á»£t thi Ä‘áº§u tiÃªn nÄƒm 2024 vá»›i há»‡ thá»‘ng cÃ¢u há»i tráº¯c nghiá»‡m khÃ¡ch quan Ä‘a dáº¡ng.",
    "attempts_count": 4890,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n 1: TÆ° duy Ä‘á»‹nh lÆ°á»£ng tráº¯c nghiá»‡m",
        "question_count": 7
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n 2: Äiá»n Ä‘Ã¡p Ã¡n sá»‘ há»c",
        "question_count": 3
      }
    ],
    "scoring": {
      "type": "hsa_raw",
      "max_score": 50
    }
  },
  {
    "id": "exam_hsa_04",
    "title": "HSA 2024 â€“ Äá» Thi ChÃ­nh Thá»©c ÄÃ¡nh GiÃ¡ NÄƒng Lá»±c Äá»£t 402",
    "type": "HSA",
    "exam_format_version": "HSA-2025",
    "year": 2024,
    "duration_minutes": 75,
    "question_count": 10,
    "question_ids": [
      "q_hsa_03",
      "q_hsa_05",
      "q_hsa_07",
      "q_hsa_09",
      "q_hsa_11",
      "q_hsa_13",
      "q_hsa_15",
      "q_hsa_02",
      "q_hsa_06",
      "q_hsa_10"
    ],
    "difficulty": "Trung bÃ¬nh",
    "source": "Äáº¡i há»c Quá»‘c gia HÃ  Ná»™i",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "Trá»ng tÃ¢m kháº£o sÃ¡t hÃ m sá»‘, thá»ƒ tÃ­ch lÄƒng trá»¥ Ä‘á»©ng, gÃ³c giá»¯a hai máº·t pháº³ng vÃ  phÆ°Æ¡ng trÃ¬nh logarit.",
    "attempts_count": 4320,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n 1: TÆ° duy Ä‘á»‹nh lÆ°á»£ng tráº¯c nghiá»‡m",
        "question_count": 7
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n 2: Äiá»n Ä‘Ã¡p Ã¡n sá»‘ há»c",
        "question_count": 3
      }
    ],
    "scoring": {
      "type": "hsa_raw",
      "max_score": 50
    }
  },
  {
    "id": "exam_hsa_05",
    "title": "HSA 2026 â€“ Äá» Minh Há»a Äá»‹nh HÆ°á»›ng NÄƒng Lá»±c TÆ° Duy ToÃ¡n",
    "type": "HSA",
    "exam_format_version": "HSA-2026",
    "year": 2026,
    "duration_minutes": 75,
    "question_count": 11,
    "question_ids": [
      "q_hsa_01",
      "q_hsa_04",
      "q_hsa_07",
      "q_hsa_10",
      "q_hsa_12",
      "q_hsa_tf_01",
      "q_hsa_14",
      "q_hsa_15",
      "q_hsa_sa_01",
      "q_hsa_02",
      "q_hsa_08"
    ],
    "difficulty": "KhÃ³",
    "source": "Trung tÃ¢m Kháº£o thÃ­ ÄHQGHN",
    "source_type": "official",
    "license": "CC BY-NC-SA 4.0",
    "description": "Cáº­p nháº­t cÃ¡c cÃ¢u há»i thá»±c tiá»…n liÃªn mÃ´n ToÃ¡n - LÃ½ - Äá»‹a lÃ½ vÃ  xá»­ lÃ½ báº£ng biá»ƒu dá»¯ liá»‡u thá»‘ng kÃª sá»‘ liá»‡u.",
    "attempts_count": 2310,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n 1: TÆ° duy Ä‘á»‹nh lÆ°á»£ng tráº¯c nghiá»‡m",
        "question_count": 8
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n 2: Äiá»n Ä‘Ã¡p Ã¡n sá»‘ há»c",
        "question_count": 3
      }
    ],
    "scoring": {
      "type": "hsa_raw",
      "max_score": 50
    }
  },
  {
    "id": "exam_hsa_06",
    "title": "HSA 2025 â€“ Äá» Kháº£o SÃ¡t Äá»£t 501 ChuyÃªn Äá» Sá»‘ Há»c & DÃ£y Sá»‘",
    "type": "HSA",
    "exam_format_version": "HSA-2025",
    "year": 2025,
    "duration_minutes": 75,
    "question_count": 10,
    "question_ids": [
      "q_hsa_01",
      "q_hsa_09",
      "q_hsa_16",
      "q_hsa_17",
      "q_hsa_18",
      "q_hsa_19",
      "q_hsa_20",
      "q_hsa_tf_01",
      "q_hsa_sa_01",
      "q_hsa_03"
    ],
    "difficulty": "Trung bÃ¬nh",
    "source": "Äáº¡i há»c Quá»‘c gia HÃ  Ná»™i",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "RÃ¨n luyá»‡n chuyÃªn sÃ¢u cÃ¡c bÃ i toÃ¡n sá»‘ há»c Ä‘á»“ng dÆ°, tÃ­nh chia háº¿t, cáº¥p sá»‘ cá»™ng lÃ¹i vÃ  cáº¥p sá»‘ nhÃ¢n tÄƒng trÆ°á»Ÿng.",
    "attempts_count": 1980,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n 1: TÆ° duy Ä‘á»‹nh lÆ°á»£ng tráº¯c nghiá»‡m",
        "question_count": 7
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n 2: Äiá»n Ä‘Ã¡p Ã¡n sá»‘ há»c",
        "question_count": 3
      }
    ],
    "scoring": {
      "type": "hsa_raw",
      "max_score": 50
    }
  },
  {
    "id": "exam_hsa_07",
    "title": "HSA 2025 â€“ Äá» Kháº£o SÃ¡t Äá»£t 502 ChuyÃªn Äá» Giáº£i TÃ­ch & Kháº£o SÃ¡t HÃ m Sá»‘",
    "type": "HSA",
    "exam_format_version": "HSA-2025",
    "year": 2025,
    "duration_minutes": 75,
    "question_count": 10,
    "question_ids": [
      "q_hsa_02",
      "q_hsa_06",
      "q_hsa_11",
      "q_hsa_21",
      "q_hsa_22",
      "q_hsa_23",
      "q_hsa_24",
      "q_hsa_25",
      "q_hsa_tf_01",
      "q_hsa_sa_01"
    ],
    "difficulty": "KhÃ³",
    "source": "Äáº¡i há»c Quá»‘c gia HÃ  Ná»™i",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "Táº­p trung cÃ¡c dáº¡ng cá»±c trá»‹ chá»©a tham sá»‘ m, tÆ°Æ¡ng giao Ä‘á»“ thá»‹ hÃ m phÃ¢n thá»©c vÃ  tiá»‡m cáº­n Ä‘á»©ng, ngang, xiÃªn.",
    "attempts_count": 2450,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n 1: TÆ° duy Ä‘á»‹nh lÆ°á»£ng tráº¯c nghiá»‡m",
        "question_count": 7
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n 2: Äiá»n Ä‘Ã¡p Ã¡n sá»‘ há»c",
        "question_count": 3
      }
    ],
    "scoring": {
      "type": "hsa_raw",
      "max_score": 50
    }
  },
  {
    "id": "exam_hsa_08",
    "title": "HSA 2025 â€“ Äá» Kháº£o SÃ¡t Äá»£t 503 ChuyÃªn Äá» HÃ¬nh Há»c KhÃ´ng Gian & Oxyz",
    "type": "HSA",
    "exam_format_version": "HSA-2025",
    "year": 2025,
    "duration_minutes": 75,
    "question_count": 10,
    "question_ids": [
      "q_hsa_04",
      "q_hsa_08",
      "q_hsa_12",
      "q_hsa_26",
      "q_hsa_27",
      "q_hsa_28",
      "q_hsa_29",
      "q_hsa_30",
      "q_hsa_tf_01",
      "q_hsa_sa_01"
    ],
    "difficulty": "KhÃ³",
    "source": "Äáº¡i há»c Quá»‘c gia HÃ  Ná»™i",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "PhÆ°Æ¡ng phÃ¡p gáº¯n há»‡ trá»¥c tá»a Ä‘á»™ Oxyz vÃ o hÃ¬nh Ä‘a diá»‡n cá»• Ä‘iá»ƒn, tÃ­nh khoáº£ng cÃ¡ch giá»¯a hai Ä‘Æ°á»ng tháº³ng chÃ©o nhau.",
    "attempts_count": 2130,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n 1: TÆ° duy Ä‘á»‹nh lÆ°á»£ng tráº¯c nghiá»‡m",
        "question_count": 7
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n 2: Äiá»n Ä‘Ã¡p Ã¡n sá»‘ há»c",
        "question_count": 3
      }
    ],
    "scoring": {
      "type": "hsa_raw",
      "max_score": 50
    }
  },
  {
    "id": "exam_hsa_09",
    "title": "HSA 2025 â€“ Äá» Kháº£o SÃ¡t Äá»£t 504 ChuyÃªn Äá» XÃ¡c Suáº¥t & Thá»‘ng KÃª Dá»¯ Liá»‡u",
    "type": "HSA",
    "exam_format_version": "HSA-2025",
    "year": 2025,
    "duration_minutes": 75,
    "question_count": 10,
    "question_ids": [
      "q_hsa_05",
      "q_hsa_10",
      "q_hsa_14",
      "q_hsa_31",
      "q_hsa_32",
      "q_hsa_33",
      "q_hsa_34",
      "q_hsa_35",
      "q_hsa_tf_01",
      "q_hsa_sa_01"
    ],
    "difficulty": "Trung bÃ¬nh",
    "source": "Äáº¡i há»c Quá»‘c gia HÃ  Ná»™i",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "Äá»c vÃ  phÃ¢n tÃ­ch biá»ƒu Ä‘á»“ thá»‘ng kÃª dÃ¢n sá»‘, tÃ­nh tá»© phÃ¢n vá»‹ dá»¯ liá»‡u ghÃ©p nhÃ³m vÃ  xÃ¡c suáº¥t chá»n ngáº«u nhiÃªn.",
    "attempts_count": 2790,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n 1: TÆ° duy Ä‘á»‹nh lÆ°á»£ng tráº¯c nghiá»‡m",
        "question_count": 7
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n 2: Äiá»n Ä‘Ã¡p Ã¡n sá»‘ há»c",
        "question_count": 3
      }
    ],
    "scoring": {
      "type": "hsa_raw",
      "max_score": 50
    }
  },
  {
    "id": "exam_hsa_10",
    "title": "HSA 2026 â€“ Äá» Thi Thá»­ Äá»™t PhÃ¡ Äiá»ƒm 120+ (Äá»£t A)",
    "type": "HSA",
    "exam_format_version": "HSA-2026",
    "year": 2026,
    "duration_minutes": 75,
    "question_count": 11,
    "question_ids": [
      "q_hsa_01",
      "q_hsa_03",
      "q_hsa_07",
      "q_hsa_13",
      "q_hsa_17",
      "q_hsa_21",
      "q_hsa_25",
      "q_hsa_29",
      "q_hsa_33",
      "q_hsa_sa_01",
      "q_hsa_tf_01"
    ],
    "difficulty": "KhÃ³",
    "source": "CLB Há»c Thuáº­t ÄHQG",
    "source_type": "official",
    "license": "CC BY-NC-SA 4.0",
    "description": "Äá» thi phÃ¢n hÃ³a cao vá»›i cÃ¡c cÃ¢u há»i tÃ­ch há»£p tÆ° duy toÃ¡n há»c vÃ  giáº£i quyáº¿t tÃ¬nh huá»‘ng thá»±c táº¿.",
    "attempts_count": 1740,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n 1: TÆ° duy Ä‘á»‹nh lÆ°á»£ng tráº¯c nghiá»‡m",
        "question_count": 8
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n 2: Äiá»n Ä‘Ã¡p Ã¡n sá»‘ há»c",
        "question_count": 3
      }
    ],
    "scoring": {
      "type": "hsa_raw",
      "max_score": 50
    }
  },
  {
    "id": "exam_hsa_11",
    "title": "HSA 2026 â€“ Äá» RÃ¨n Luyá»‡n Tá»‘c Äá»™ 50 CÃ¢u Äiá»n Sá»‘ Ngáº¯n (Äá»£t B)",
    "type": "HSA",
    "exam_format_version": "HSA-2026",
    "year": 2026,
    "duration_minutes": 75,
    "question_count": 11,
    "question_ids": [
      "q_hsa_sa_01",
      "q_hsa_02",
      "q_hsa_05",
      "q_hsa_08",
      "q_hsa_11",
      "q_hsa_14",
      "q_hsa_18",
      "q_hsa_22",
      "q_hsa_26",
      "q_hsa_30",
      "q_hsa_34"
    ],
    "difficulty": "Trung bÃ¬nh",
    "source": "Tá»• ChuyÃªn MÃ´n ToÃ¡n PUMKIN.DEV",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "TÄƒng cÆ°á»ng cÃ¡c cÃ¢u há»i Ä‘iá»n sá»‘ tá»± do khÃ´ng cÃ³ gá»£i Ã½ phÆ°Æ¡ng Ã¡n lá»±a chá»n, chá»‘ng khoanh bá»«a hiá»‡u quáº£.",
    "attempts_count": 2560,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n 1: TÆ° duy Ä‘á»‹nh lÆ°á»£ng tráº¯c nghiá»‡m",
        "question_count": 8
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n 2: Äiá»n Ä‘Ã¡p Ã¡n sá»‘ há»c",
        "question_count": 3
      }
    ],
    "scoring": {
      "type": "hsa_raw",
      "max_score": 50
    }
  },
  {
    "id": "exam_hsa_12",
    "title": "HSA 2026 â€“ Äá» Tá»•ng Há»£p ToÃ n Diá»‡n Äá»‹nh LÆ°á»£ng Ká»³ Tuyá»ƒn Sinh Má»›i",
    "type": "HSA",
    "exam_format_version": "HSA-2026",
    "year": 2026,
    "duration_minutes": 75,
    "question_count": 11,
    "question_ids": [
      "q_hsa_03",
      "q_hsa_06",
      "q_hsa_09",
      "q_hsa_12",
      "q_hsa_15",
      "q_hsa_19",
      "q_hsa_23",
      "q_hsa_27",
      "q_hsa_31",
      "q_hsa_35",
      "q_hsa_tf_01"
    ],
    "difficulty": "KhÃ³",
    "source": "Trung tÃ¢m Kháº£o thÃ­ ÄHQGHN",
    "source_type": "official",
    "license": "CC BY-NC-SA 4.0",
    "description": "Äá» tá»•ng duyá»‡t toÃ n bá»™ ma tráº­n kiáº¿n thá»©c Ä‘á»‹nh lÆ°á»£ng trÆ°á»›c ngÃ y thi chÃ­nh thá»©c cá»§a thÃ­ sinh ÄHQGHN.",
    "attempts_count": 3120,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n 1: TÆ° duy Ä‘á»‹nh lÆ°á»£ng tráº¯c nghiá»‡m",
        "question_count": 8
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n 2: Äiá»n Ä‘Ã¡p Ã¡n sá»‘ há»c",
        "question_count": 3
      }
    ],
    "scoring": {
      "type": "hsa_raw",
      "max_score": 50
    }
  },
  {
    "id": "exam_thpt_01",
    "title": "THPT 2025 â€“ Äá» Tham Kháº£o Tá»‘t Nghiá»‡p THPT Quá»‘c Gia MÃ´n ToÃ¡n",
    "type": "THPT",
    "exam_format_version": "THPT-GDPT-2025",
    "year": 2025,
    "duration_minutes": 75,
    "question_count": 12,
    "question_ids": [
      "q_thpt_01",
      "q_thpt_02",
      "q_thpt_tf_01",
      "q_thpt_sa_01",
      "q_thpt_03",
      "q_thpt_04",
      "q_thpt_05",
      "q_thpt_06",
      "q_thpt_07",
      "q_thpt_08",
      "q_hsa_01",
      "q_hsa_02"
    ],
    "difficulty": "Trung bÃ¬nh",
    "source": "Bá»™ GiÃ¡o dá»¥c vÃ  ÄÃ o táº¡o",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "Äá» thi toÃ n diá»‡n chÆ°Æ¡ng trÃ¬nh lá»›p 12: kháº£o sÃ¡t hÃ m sá»‘, sá»‘ phá»©c, nguyÃªn hÃ m tÃ­ch phÃ¢n, hÃ¬nh Oxyz vÃ  báº¥t phÆ°Æ¡ng trÃ¬nh.",
    "attempts_count": 5850,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n I: CÃ¢u há»i tráº¯c nghiá»‡m nhiá»u phÆ°Æ¡ng Ã¡n",
        "question_count": 7
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n II: CÃ¢u há»i tráº¯c nghiá»‡m ÄÃºng / Sai",
        "question_count": 2
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n III: CÃ¢u há»i tráº£ lá»i ngáº¯n",
        "question_count": 2
      }
    ],
    "scoring": {
      "type": "standard",
      "max_score": 10
    }
  },
  {
    "id": "exam_thpt_02",
    "title": "THPT 2025 â€“ Äá» Thi Thá»­ Cá»¥m CÃ¡c TrÆ°á»ng THPT ChuyÃªn HÃ  Ná»™i",
    "type": "THPT",
    "exam_format_version": "THPT-GDPT-2025",
    "year": 2025,
    "duration_minutes": 75,
    "question_count": 10,
    "question_ids": [
      "q_thpt_01",
      "q_thpt_02",
      "q_thpt_04",
      "q_thpt_06",
      "q_thpt_08",
      "q_tsa_14",
      "q_tsa_20",
      "q_hsa_06",
      "q_hsa_08",
      "q_hsa_11"
    ],
    "difficulty": "KhÃ³",
    "source": "Cá»¥m TrÆ°á»ng THPT ChuyÃªn HÃ  Ná»™i",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "Äá» thi thá»­ cÃ³ Ä‘á»™ phÃ¢n hÃ³a máº¡nh tá»« cá»¥m chuyÃªn HÃ  Ná»™i: tiá»‡m cáº­n, cá»±c trá»‹ hÃ m há»£p, nguyÃªn hÃ m tá»«ng pháº§n vÃ  Oxyz.",
    "attempts_count": 3150,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n I: CÃ¢u há»i tráº¯c nghiá»‡m nhiá»u phÆ°Æ¡ng Ã¡n",
        "question_count": 6
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n II: CÃ¢u há»i tráº¯c nghiá»‡m ÄÃºng / Sai",
        "question_count": 2
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n III: CÃ¢u há»i tráº£ lá»i ngáº¯n",
        "question_count": 2
      }
    ],
    "scoring": {
      "type": "standard",
      "max_score": 10
    }
  },
  {
    "id": "exam_thpt_03",
    "title": "THPT 2024 â€“ Äá» Thi ChÃ­nh Thá»©c Tá»‘t Nghiá»‡p THPT MÃ´n ToÃ¡n (MÃ£ 104)",
    "type": "THPT",
    "exam_format_version": "THPT-GDPT-2025",
    "year": 2024,
    "duration_minutes": 75,
    "question_count": 10,
    "question_ids": [
      "q_thpt_02",
      "q_thpt_03",
      "q_thpt_05",
      "q_thpt_07",
      "q_hsa_03",
      "q_hsa_05",
      "q_hsa_09",
      "q_hsa_10",
      "q_tsa_02",
      "q_tsa_16"
    ],
    "difficulty": "Trung bÃ¬nh",
    "source": "Bá»™ GiÃ¡o dá»¥c vÃ  ÄÃ o táº¡o",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "Äá» thi chÃ­nh thá»©c ká»³ thi Tá»‘t nghiá»‡p THPT 2024 mÃ£ Ä‘á» 104 chuáº©n hÃ³a má»©c Ä‘á»™ nháº­n biáº¿t, thÃ´ng hiá»ƒu vÃ  váº­n dá»¥ng.",
    "attempts_count": 6600,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n I: CÃ¢u há»i tráº¯c nghiá»‡m nhiá»u phÆ°Æ¡ng Ã¡n",
        "question_count": 6
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n II: CÃ¢u há»i tráº¯c nghiá»‡m ÄÃºng / Sai",
        "question_count": 2
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n III: CÃ¢u há»i tráº£ lá»i ngáº¯n",
        "question_count": 2
      }
    ],
    "scoring": {
      "type": "standard",
      "max_score": 10
    }
  },
  {
    "id": "exam_thpt_04",
    "title": "THPT 2026 â€“ Äá» PhÃ¡t Triá»ƒn Äá» Minh Há»a Tá»‘t Nghiá»‡p THPT 2026",
    "type": "THPT",
    "exam_format_version": "THPT-GDPT-2025",
    "year": 2026,
    "duration_minutes": 75,
    "question_count": 10,
    "question_ids": [
      "q_thpt_01",
      "q_thpt_04",
      "q_thpt_06",
      "q_thpt_07",
      "q_thpt_08",
      "q_tsa_01",
      "q_tsa_05",
      "q_tsa_18",
      "q_hsa_02",
      "q_hsa_04"
    ],
    "difficulty": "KhÃ³",
    "source": "Tá»• ChuyÃªn MÃ´n ToÃ¡n PUMKIN.DEV",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "Äá» thi phÃ¡t triá»ƒn Ä‘á»‹nh hÆ°á»›ng ChÆ°Æ¡ng trÃ¬nh GDPT má»›i, tÄƒng cÆ°á»ng á»©ng dá»¥ng thá»±c táº¿ vÃ  hÃ¬nh há»c khÃ´ng gian Oxyz.",
    "attempts_count": 2480,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n I: CÃ¢u há»i tráº¯c nghiá»‡m nhiá»u phÆ°Æ¡ng Ã¡n",
        "question_count": 6
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n II: CÃ¢u há»i tráº¯c nghiá»‡m ÄÃºng / Sai",
        "question_count": 2
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n III: CÃ¢u há»i tráº£ lá»i ngáº¯n",
        "question_count": 2
      }
    ],
    "scoring": {
      "type": "standard",
      "max_score": 10
    }
  },
  {
    "id": "exam_thpt_05",
    "title": "THPT 2025 â€“ Äá» Thi Thá»­ ChuyÃªn Khoa Há»c Tá»± NhiÃªn HÃ  Ná»™i (Láº§n 1)",
    "type": "THPT",
    "exam_format_version": "THPT-GDPT-2025",
    "year": 2025,
    "duration_minutes": 75,
    "question_count": 10,
    "question_ids": [
      "q_thpt_01",
      "q_thpt_03",
      "q_thpt_05",
      "q_thpt_09",
      "q_thpt_10",
      "q_thpt_11",
      "q_thpt_12",
      "q_thpt_tf_01",
      "q_thpt_sa_01",
      "q_thpt_04"
    ],
    "difficulty": "KhÃ³",
    "source": "THPT ChuyÃªn KHTN - ÄHKHTN HÃ  Ná»™i",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "Äá» thi ná»•i tiáº¿ng vá»›i cÃ¡c bÃ i toÃ¡n váº­n dá»¥ng cao vá» phÆ°Æ¡ng trÃ¬nh logarit chá»©a tham sá»‘ vÃ  bÃ i toÃ¡n min-max Oxyz.",
    "attempts_count": 3820,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n I: CÃ¢u há»i tráº¯c nghiá»‡m nhiá»u phÆ°Æ¡ng Ã¡n",
        "question_count": 6
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n II: CÃ¢u há»i tráº¯c nghiá»‡m ÄÃºng / Sai",
        "question_count": 2
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n III: CÃ¢u há»i tráº£ lá»i ngáº¯n",
        "question_count": 2
      }
    ],
    "scoring": {
      "type": "standard",
      "max_score": 10
    }
  },
  {
    "id": "exam_thpt_06",
    "title": "THPT 2025 â€“ Äá» Thi Thá»­ ChuyÃªn Äáº¡i Há»c SÆ° Pháº¡m HÃ  Ná»™i (Láº§n 2)",
    "type": "THPT",
    "exam_format_version": "THPT-GDPT-2025",
    "year": 2025,
    "duration_minutes": 75,
    "question_count": 10,
    "question_ids": [
      "q_thpt_02",
      "q_thpt_04",
      "q_thpt_06",
      "q_thpt_13",
      "q_thpt_14",
      "q_thpt_15",
      "q_thpt_16",
      "q_thpt_tf_01",
      "q_thpt_sa_01",
      "q_thpt_07"
    ],
    "difficulty": "KhÃ³",
    "source": "THPT ChuyÃªn ÄH SÆ° Pháº¡m HÃ  Ná»™i",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "Cáº¥u trÃºc Ä‘á» tinh táº¿, kiá»ƒm tra sÃ¢u sáº¯c tÃ­nh liÃªn tá»¥c, cá»±c trá»‹ hÃ¬nh pháº³ng vÃ  thá»ƒ tÃ­ch khá»‘i trÃ²n xoay quanh trá»¥c Ox.",
    "attempts_count": 3410,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n I: CÃ¢u há»i tráº¯c nghiá»‡m nhiá»u phÆ°Æ¡ng Ã¡n",
        "question_count": 6
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n II: CÃ¢u há»i tráº¯c nghiá»‡m ÄÃºng / Sai",
        "question_count": 2
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n III: CÃ¢u há»i tráº£ lá»i ngáº¯n",
        "question_count": 2
      }
    ],
    "scoring": {
      "type": "standard",
      "max_score": 10
    }
  },
  {
    "id": "exam_thpt_07",
    "title": "THPT 2025 â€“ Äá» Thi Thá»­ ChuyÃªn LÃª Há»“ng Phong TP. Há»“ ChÃ­ Minh",
    "type": "THPT",
    "exam_format_version": "THPT-GDPT-2025",
    "year": 2025,
    "duration_minutes": 75,
    "question_count": 10,
    "question_ids": [
      "q_thpt_01",
      "q_thpt_07",
      "q_thpt_08",
      "q_thpt_17",
      "q_thpt_18",
      "q_thpt_19",
      "q_thpt_20",
      "q_thpt_tf_01",
      "q_thpt_sa_01",
      "q_thpt_05"
    ],
    "difficulty": "KhÃ³",
    "source": "THPT ChuyÃªn LÃª Há»“ng Phong TP.HCM",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "Äá» thi truyá»n thá»‘ng miá»n Nam vá»›i cÃ¡c bÃ i toÃ¡n thá»±c tiá»…n tá»‘i Æ°u hÃ³a chi phÃ­ sáº£n xuáº¥t vÃ  bÃ i toÃ¡n lÃ£i suáº¥t ngÃ¢n hÃ ng.",
    "attempts_count": 2980,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n I: CÃ¢u há»i tráº¯c nghiá»‡m nhiá»u phÆ°Æ¡ng Ã¡n",
        "question_count": 6
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n II: CÃ¢u há»i tráº¯c nghiá»‡m ÄÃºng / Sai",
        "question_count": 2
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n III: CÃ¢u há»i tráº£ lá»i ngáº¯n",
        "question_count": 2
      }
    ],
    "scoring": {
      "type": "standard",
      "max_score": 10
    }
  },
  {
    "id": "exam_thpt_08",
    "title": "THPT 2025 â€“ Äá» Thi Thá»­ ChuyÃªn Phan Bá»™i ChÃ¢u Nghá»‡ An",
    "type": "THPT",
    "exam_format_version": "THPT-GDPT-2025",
    "year": 2025,
    "duration_minutes": 75,
    "question_count": 10,
    "question_ids": [
      "q_thpt_03",
      "q_thpt_05",
      "q_thpt_08",
      "q_thpt_21",
      "q_thpt_22",
      "q_thpt_23",
      "q_thpt_24",
      "q_thpt_tf_01",
      "q_thpt_sa_01",
      "q_thpt_02"
    ],
    "difficulty": "KhÃ³",
    "source": "THPT ChuyÃªn Phan Bá»™i ChÃ¢u Nghá»‡ An",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "Táº­p trung cÃ¡c dáº¡ng toÃ¡n cá»±c trá»‹ khÃ´ng gian, máº·t cáº§u ngoáº¡i tiáº¿p lÄƒng trá»¥ xiÃªn vÃ  ká»¹ thuáº­t Ä‘áº¡o hÃ m cáº¥p hai.",
    "attempts_count": 2670,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n I: CÃ¢u há»i tráº¯c nghiá»‡m nhiá»u phÆ°Æ¡ng Ã¡n",
        "question_count": 6
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n II: CÃ¢u há»i tráº¯c nghiá»‡m ÄÃºng / Sai",
        "question_count": 2
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n III: CÃ¢u há»i tráº£ lá»i ngáº¯n",
        "question_count": 2
      }
    ],
    "scoring": {
      "type": "standard",
      "max_score": 10
    }
  },
  {
    "id": "exam_thpt_09",
    "title": "THPT 2025 â€“ Äá» Thi Thá»­ ChuyÃªn Lam SÆ¡n Thanh HÃ³a",
    "type": "THPT",
    "exam_format_version": "THPT-GDPT-2025",
    "year": 2025,
    "duration_minutes": 75,
    "question_count": 10,
    "question_ids": [
      "q_thpt_01",
      "q_thpt_04",
      "q_thpt_06",
      "q_thpt_25",
      "q_thpt_36",
      "q_thpt_37",
      "q_thpt_38",
      "q_thpt_tf_01",
      "q_thpt_sa_01",
      "q_thpt_08"
    ],
    "difficulty": "KhÃ³",
    "source": "THPT ChuyÃªn Lam SÆ¡n Thanh HÃ³a",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "Äá» thi phÃ¢n hÃ³a rá»±c nÃ©t: báº¥t phÆ°Æ¡ng trÃ¬nh mÅ©, nghiá»‡m nguyÃªn cá»§a há»‡ logarit vÃ  nguyÃªn hÃ m tá»«ng pháº§n mÃºa cá»™t.",
    "attempts_count": 2890,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n I: CÃ¢u há»i tráº¯c nghiá»‡m nhiá»u phÆ°Æ¡ng Ã¡n",
        "question_count": 6
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n II: CÃ¢u há»i tráº¯c nghiá»‡m ÄÃºng / Sai",
        "question_count": 2
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n III: CÃ¢u há»i tráº£ lá»i ngáº¯n",
        "question_count": 2
      }
    ],
    "scoring": {
      "type": "standard",
      "max_score": 10
    }
  },
  {
    "id": "exam_thpt_10",
    "title": "THPT 2025 â€“ Äá» Kháº£o SÃ¡t Cháº¥t LÆ°á»£ng Sá»Ÿ GD&ÄT Nam Äá»‹nh",
    "type": "THPT",
    "exam_format_version": "THPT-GDPT-2025",
    "year": 2025,
    "duration_minutes": 75,
    "question_count": 10,
    "question_ids": [
      "q_thpt_02",
      "q_thpt_03",
      "q_thpt_07",
      "q_thpt_39",
      "q_thpt_40",
      "q_thpt_21",
      "q_thpt_22",
      "q_thpt_tf_01",
      "q_thpt_sa_01",
      "q_thpt_06"
    ],
    "difficulty": "Trung bÃ¬nh",
    "source": "Sá»Ÿ GD&ÄT Nam Äá»‹nh",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "Äá» kháº£o sÃ¡t chuáº©n má»±c cao tá»« Ä‘áº¥t há»c Nam Äá»‹nh, Ä‘á»™ chuáº©n xÃ¡c vÃ  tÃ­nh sÆ° pháº¡m cá»§a cÃ¡c cÃ¢u há»i Ä‘Æ°á»£c Ä‘Ã¡nh giÃ¡ ráº¥t cao.",
    "attempts_count": 4520,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n I: CÃ¢u há»i tráº¯c nghiá»‡m nhiá»u phÆ°Æ¡ng Ã¡n",
        "question_count": 6
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n II: CÃ¢u há»i tráº¯c nghiá»‡m ÄÃºng / Sai",
        "question_count": 2
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n III: CÃ¢u há»i tráº£ lá»i ngáº¯n",
        "question_count": 2
      }
    ],
    "scoring": {
      "type": "standard",
      "max_score": 10
    }
  },
  {
    "id": "exam_thpt_11",
    "title": "THPT 2025 â€“ Äá» Kháº£o SÃ¡t Cháº¥t LÆ°á»£ng Sá»Ÿ GD&ÄT Nghá»‡ An",
    "type": "THPT",
    "exam_format_version": "THPT-GDPT-2025",
    "year": 2025,
    "duration_minutes": 75,
    "question_count": 10,
    "question_ids": [
      "q_thpt_01",
      "q_thpt_05",
      "q_thpt_08",
      "q_thpt_23",
      "q_thpt_24",
      "q_thpt_25",
      "q_thpt_09",
      "q_thpt_tf_01",
      "q_thpt_sa_01",
      "q_thpt_04"
    ],
    "difficulty": "Trung bÃ¬nh",
    "source": "Sá»Ÿ GD&ÄT Nghá»‡ An",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "Cáº¥u trÃºc Ä‘á» bÃ¡m sÃ¡t Ä‘á» minh há»a, phÃ¢n bá»• Ä‘á»u giá»¯a cÃ¡c chuyÃªn Ä‘á» lá»›p 12 vÃ  kiáº¿n thá»©c trá»ng tÃ¢m lá»›p 11.",
    "attempts_count": 4180,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n I: CÃ¢u há»i tráº¯c nghiá»‡m nhiá»u phÆ°Æ¡ng Ã¡n",
        "question_count": 6
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n II: CÃ¢u há»i tráº¯c nghiá»‡m ÄÃºng / Sai",
        "question_count": 2
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n III: CÃ¢u há»i tráº£ lá»i ngáº¯n",
        "question_count": 2
      }
    ],
    "scoring": {
      "type": "standard",
      "max_score": 10
    }
  },
  {
    "id": "exam_thpt_12",
    "title": "THPT 2026 â€“ Äá» Ã”n Luyá»‡n ChuyÃªn Äá» Cá»±c Trá»‹ & GiÃ¡ Trá»‹ Lá»›n Nháº¥t Nhá» Nháº¥t",
    "type": "THPT",
    "exam_format_version": "THPT-GDPT-2025",
    "year": 2026,
    "duration_minutes": 75,
    "question_count": 10,
    "question_ids": [
      "q_thpt_01",
      "q_thpt_06",
      "q_thpt_10",
      "q_thpt_14",
      "q_thpt_18",
      "q_thpt_22",
      "q_thpt_36",
      "q_thpt_40",
      "q_thpt_sa_01",
      "q_thpt_tf_01"
    ],
    "difficulty": "KhÃ³",
    "source": "Tá»• ChuyÃªn MÃ´n ToÃ¡n PUMKIN.DEV",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "RÃ¨n luyá»‡n chuyÃªn sÃ¢u phÆ°Æ¡ng phÃ¡p Ä‘á»•i biáº¿n, Ä‘Ã¡nh giÃ¡ báº¥t Ä‘áº³ng thá»©c vÃ  báº£ng biáº¿n thiÃªn hÃ m há»£p f(u).",
    "attempts_count": 2150,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n I: CÃ¢u há»i tráº¯c nghiá»‡m nhiá»u phÆ°Æ¡ng Ã¡n",
        "question_count": 6
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n II: CÃ¢u há»i tráº¯c nghiá»‡m ÄÃºng / Sai",
        "question_count": 2
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n III: CÃ¢u há»i tráº£ lá»i ngáº¯n",
        "question_count": 2
      }
    ],
    "scoring": {
      "type": "standard",
      "max_score": 10
    }
  },
  {
    "id": "exam_thpt_13",
    "title": "THPT 2026 â€“ Äá» Ã”n Luyá»‡n ChuyÃªn Äá» HÃ¬nh Há»c Oxyz & KhÃ´ng Gian 3D",
    "type": "THPT",
    "exam_format_version": "THPT-GDPT-2025",
    "year": 2026,
    "duration_minutes": 75,
    "question_count": 10,
    "question_ids": [
      "q_thpt_02",
      "q_thpt_07",
      "q_thpt_11",
      "q_thpt_15",
      "q_thpt_19",
      "q_thpt_23",
      "q_thpt_37",
      "q_thpt_21",
      "q_thpt_sa_01",
      "q_thpt_tf_01"
    ],
    "difficulty": "KhÃ³",
    "source": "Tá»• ChuyÃªn MÃ´n ToÃ¡n PUMKIN.DEV",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "Táº­p há»£p cÃ¡c bÃ i toÃ¡n vá»‹ trÃ­ tÆ°Æ¡ng Ä‘á»‘i, khoáº£ng cÃ¡ch tá»« Ä‘iá»ƒm Ä‘áº¿n Ä‘Æ°á»ng tháº³ng/máº·t pháº³ng vÃ  máº·t cáº§u tiáº¿p xÃºc.",
    "attempts_count": 1980,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n I: CÃ¢u há»i tráº¯c nghiá»‡m nhiá»u phÆ°Æ¡ng Ã¡n",
        "question_count": 6
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n II: CÃ¢u há»i tráº¯c nghiá»‡m ÄÃºng / Sai",
        "question_count": 2
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n III: CÃ¢u há»i tráº£ lá»i ngáº¯n",
        "question_count": 2
      }
    ],
    "scoring": {
      "type": "standard",
      "max_score": 10
    }
  },
  {
    "id": "exam_thpt_14",
    "title": "THPT 2026 â€“ Äá» Thi Thá»­ Tá»‘t Nghiá»‡p THPT Chuáº©n Má»±c 50 CÃ¢u Äiá»ƒm 9+",
    "type": "THPT",
    "exam_format_version": "THPT-GDPT-2025",
    "year": 2026,
    "duration_minutes": 75,
    "question_count": 10,
    "question_ids": [
      "q_thpt_03",
      "q_thpt_08",
      "q_thpt_12",
      "q_thpt_16",
      "q_thpt_20",
      "q_thpt_24",
      "q_thpt_38",
      "q_thpt_22",
      "q_thpt_tf_01",
      "q_thpt_sa_01"
    ],
    "difficulty": "KhÃ³",
    "source": "Há»™i Äá»“ng Kháº£o ThÃ­ PUMKIN.DEV",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "Äá» thi thá»­ thÃ¡ch tá»•ng há»£p vá»›i 10 cÃ¢u cuá»‘i phÃ¢n hÃ³a cá»±c máº¡nh, phá»¥c vá»¥ thÃ­ sinh xÃ©t tuyá»ƒn vÃ o Y Äa Khoa, BÃ¡ch Khoa, Kinh Táº¿ Quá»‘c DÃ¢n.",
    "attempts_count": 3260,
    "sections": [
      {
        "id": "sec_mcq",
        "title": "Pháº§n I: CÃ¢u há»i tráº¯c nghiá»‡m nhiá»u phÆ°Æ¡ng Ã¡n",
        "question_count": 6
      },
      {
        "id": "sec_tf",
        "title": "Pháº§n II: CÃ¢u há»i tráº¯c nghiá»‡m ÄÃºng / Sai",
        "question_count": 2
      },
      {
        "id": "sec_sa",
        "title": "Pháº§n III: CÃ¢u há»i tráº£ lá»i ngáº¯n",
        "question_count": 2
      }
    ],
    "scoring": {
      "type": "standard",
      "max_score": 10
    }
  },
  {
    "id": "exam_calc_01",
    "title": "Giáº£i TÃ­ch 1 â€“ Äá» Thi Giá»¯a Ká»³ ToÃ¡n Cao Cáº¥p ÄHBK HÃ  Ná»™i (K68 - 2024)",
    "type": "Giáº£i tÃ­ch 1",
    "exam_format_version": "STANDARD-2025",
    "year": 2024,
    "duration_minutes": 60,
    "question_count": 8,
    "question_ids": [
      "q_calc_01",
      "q_calc_02",
      "q_calc_tf_01",
      "q_calc_sa_01",
      "q_calc_03",
      "q_calc_04",
      "q_calc_05",
      "q_calc_06"
    ],
    "difficulty": "KhÃ³",
    "source": "Viá»‡n ToÃ¡n á»©ng dá»¥ng & Tin há»c BKHN",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "Kháº£o sÃ¡t giá»›i háº¡n vÃ´ cÃ¹ng bÃ© báº­c cao, khai triá»ƒn Maclaurin, cÃ´ng thá»©c Leibniz vÃ  tÃ­ch phÃ¢n suy rá»™ng loáº¡i 1.",
    "attempts_count": 1520,
    "sections": [],
    "scoring": {
      "type": "standard",
      "max_score": 10
    }
  },
  {
    "id": "exam_calc_02",
    "title": "Giáº£i TÃ­ch 1 â€“ Äá» Thi Cuá»‘i Ká»³ Giáº£i TÃ­ch 1 & PhÆ°Æ¡ng TrÃ¬nh Vi PhÃ¢n (K69 - 2025)",
    "type": "Giáº£i tÃ­ch 1",
    "exam_format_version": "STANDARD-2025",
    "year": 2025,
    "duration_minutes": 60,
    "question_count": 8,
    "question_ids": [
      "q_calc_02",
      "q_calc_03",
      "q_calc_04",
      "q_calc_05",
      "q_calc_06",
      "q_calc_07",
      "q_calc_08",
      "q_calc_09"
    ],
    "difficulty": "KhÃ³",
    "source": "Viá»‡n ToÃ¡n á»©ng dá»¥ng & Tin há»c BKHN",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "Äá» thi cuá»‘i ká»³ chuyÃªn sÃ¢u: phÆ°Æ¡ng trÃ¬nh vi phÃ¢n tuyáº¿n tÃ­nh cáº¥p 1, phÆ°Æ¡ng trÃ¬nh biáº¿n sá»‘ phÃ¢n ly vÃ  chuá»—i lÅ©y thá»«a.",
    "attempts_count": 1380,
    "sections": [],
    "scoring": {
      "type": "standard",
      "max_score": 10
    }
  },
  {
    "id": "exam_calc_03",
    "title": "Äáº¡i Sá»‘ Tuyáº¿n TÃ­nh â€“ Äá» Thi Káº¿t ThÃºc Há»c Pháº§n Äáº¡i Sá»‘ BÃ¡ch Khoa (2025)",
    "type": "ToÃ¡n cao cáº¥p",
    "exam_format_version": "STANDARD-2025",
    "year": 2025,
    "duration_minutes": 60,
    "question_count": 9,
    "question_ids": [
      "q_calc_04",
      "q_calc_07",
      "q_calc_08",
      "q_calc_09",
      "q_calc_10",
      "q_tsa_03",
      "q_tsa_04",
      "q_tsa_12",
      "q_calc_sa_01"
    ],
    "difficulty": "KhÃ³",
    "source": "Bá»™ mÃ´n ToÃ¡n Äáº¡i há»c BÃ¡ch Khoa HÃ  Ná»™i",
    "source_type": "official",
    "license": "CC BY-NC-SA 4.0",
    "description": "Äá»‹nh thá»©c, ma tráº­n nghá»‹ch Ä‘áº£o, háº¡ng ma tráº­n, trá»‹ riÃªng, vectÆ¡ riÃªng vÃ  mÃ´ hÃ¬nh cÃ¢n báº±ng Markov.",
    "attempts_count": 1240,
    "sections": [],
    "scoring": {
      "type": "standard",
      "max_score": 10
    }
  },
  {
    "id": "exam_calc_04",
    "title": "Giáº£i TÃ­ch 1 â€“ Äá» Thi Thá»­ ThÃ¡ch Olympic ToÃ¡n Sinh ViÃªn ToÃ n Quá»‘c (2025)",
    "type": "Giáº£i tÃ­ch 1",
    "exam_format_version": "STANDARD-2025",
    "year": 2025,
    "duration_minutes": 60,
    "question_count": 9,
    "question_ids": [
      "q_calc_01",
      "q_calc_03",
      "q_calc_05",
      "q_calc_11",
      "q_calc_12",
      "q_calc_13",
      "q_calc_14",
      "q_calc_15",
      "q_calc_step_01"
    ],
    "difficulty": "KhÃ³",
    "source": "Há»™i ToÃ¡n Há»c Viá»‡t Nam",
    "source_type": "adapted",
    "license": "CC BY-NC-SA 4.0",
    "description": "Äá» thi tuyá»ƒn chá»n Ä‘á»™i tuyá»ƒn Olympic Giáº£i tÃ­ch sinh viÃªn cÃ¡c trÆ°á»ng Ä‘áº¡i há»c khá»‘i ká»¹ thuáº­t vÃ  cÃ´ng nghá»‡.",
    "attempts_count": 920,
    "sections": [],
    "scoring": {
      "type": "standard",
      "max_score": 10
    }
  }
];
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
        if (viewId === "knowledge") PumkinKnowledge.render();
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
    },

    renderResult(res) {
        PumkinRouter.navigate("result", () => {
            document.getElementById("result-exam-title-sub").textContent = res.exam_title;
            document.getElementById("result-score-val").textContent = res.score;
            document.getElementById("result-accuracy-big").textContent = `${res.accuracy}%`;

            let gradeMsg = "Ráº¥t tá»‘t! Báº¡n lÃ m chá»§ kiáº¿n thá»©c vá»¯ng vÃ ng.";
            if (res.accuracy >= 90) gradeMsg = "Xuáº¥t sáº¯c! Báº¡n Ä‘Ã£ Ä‘áº¡t má»©c Ä‘iá»ƒm má»¥c tiÃªu cá»§a thá»§ khoa.";
            else if (res.accuracy < 50) gradeMsg = "Cáº§n cá»§ng cá»‘ thÃªm kiáº¿n thá»©c á»Ÿ cÃ¡c chuyÃªn Ä‘á» yáº¿u.";
            document.getElementById("result-grade-msg").textContent = gradeMsg;

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

// 11. THEME MODULE (CHáº¾ Äá»˜ SÃNG / Tá»I)
const PumkinTheme = {
    THEME_KEY: "pumkin_theme_v3",

    init() {
        const saved = localStorage.getItem(this.THEME_KEY) || "light";
        this.applyTheme(saved);
    },

    toggleTheme() {
        const isDark = document.body.classList.contains("dark-mode");
        const nextTheme = isDark ? "light" : "dark";
        this.applyTheme(nextTheme);
        localStorage.setItem(this.THEME_KEY, nextTheme);
    },

    applyTheme(theme) {
        const btn = document.getElementById("btn-theme-toggle");
        if (theme === "dark") {
            document.body.classList.add("dark-mode");
            if (btn) btn.textContent = "â˜€ï¸";
        } else {
            document.body.classList.remove("dark-mode");
            if (btn) btn.textContent = "ðŸŒ™";
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

// 13. USER AUTHENTICATION MODULE (LOCAL STORAGE & SHA-256)
const PumkinAuth = {
    STORAGE_KEYS: {
        SESSION_TOKEN: "pumkin_session_token"
    },
    currentUser: null,
    
    get API_BASE() {
        // If hosted on GitHub Pages, we will point to the deployed backend.
        // For now, point to localhost:3001
        return (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:3001/api/auth' : '/api/auth';
    },

    async init() {
        const token = localStorage.getItem(this.STORAGE_KEYS.SESSION_TOKEN);
        if (token) {
            try {
                const res = await fetch(`${this.API_BASE}/me`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    this.currentUser = data.user;
                } else {
                    this.currentUser = null;
                    localStorage.removeItem(this.STORAGE_KEYS.SESSION_TOKEN);
                }
            } catch (e) {
                this.currentUser = null;
            }
        } else {
            this.currentUser = null;
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
    },

    async handleLogin(e) {
        e.preventDefault();
        const btn = e.target.querySelector("button[type='submit']");
        if(btn) { btn.disabled = true; btn.textContent = "Đang đăng nhập..."; }
        try {
            const u = document.getElementById("login-username").value.trim();
            const p = document.getElementById("login-password").value;
            if (!u || !p) {
                this.showAlert("Vui lòng điền đủ thông tin", "error");
                if(btn) { btn.disabled = false; btn.textContent = "Đăng nhập"; }
                return;
            }
            const res = await fetch(`${this.API_BASE}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: u, password: p })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem(this.STORAGE_KEYS.SESSION_TOKEN, data.token);
                this.currentUser = data.user;
                this.showAlert("Đăng nhập thành công!", "success");
                this.updateNavUser();
                setTimeout(() => {
                    this.closeModal();
                    if(typeof loadUserData === 'function') loadUserData();
                }, 800);
            } else {
                this.showAlert(data.error || "Lỗi đăng nhập", "error");
            }
        } catch(err) {
            this.showAlert("Lỗi kết nối máy chủ.", "error");
        }
        if(btn) { btn.disabled = false; btn.textContent = "Đăng nhập"; }
    },

    async handleRegister(e) {
        e.preventDefault();
        const btn = e.target.querySelector("button[type='submit']");
        if(btn) { btn.disabled = true; btn.textContent = "Đang đăng ký..."; }
        try {
            const fullname = document.getElementById("reg-fullname").value.trim();
            const u = document.getElementById("reg-username").value.trim();
            const p = document.getElementById("reg-password").value;
            if (!u || !p || p.length < 6) {
                this.showAlert("Tên đăng nhập và mật khẩu (tối thiểu 6 ký tự) là bắt buộc.", "error");
                if(btn) { btn.disabled = false; btn.textContent = "Đăng ký"; }
                return;
            }
            const res = await fetch(`${this.API_BASE}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: u, displayName: fullname, password: p })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem(this.STORAGE_KEYS.SESSION_TOKEN, data.token);
                this.currentUser = data.user;
                this.showAlert("Đăng ký thành công!", "success");
                this.updateNavUser();
                setTimeout(() => {
                    this.closeModal();
                }, 800);
            } else {
                this.showAlert(data.error || "Lỗi đăng ký", "error");
            }
        } catch(err) {
            this.showAlert("Lỗi kết nối máy chủ.", "error");
        }
        if(btn) { btn.disabled = false; btn.textContent = "Đăng ký"; }
    },

    async handleLogout() {
        const token = localStorage.getItem(this.STORAGE_KEYS.SESSION_TOKEN);
        if (token) {
            try {
                await fetch(`${this.API_BASE}/logout`, {
                    method: "POST",
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            } catch(e) {}
        }
        this.currentUser = null;
        localStorage.removeItem(this.STORAGE_KEYS.SESSION_TOKEN);
        this.updateNavUser();
        this.closeModal();
        if(typeof clearUserData === 'function') clearUserData();
        alert("Đã đăng xuất thành công!");
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

    startDrillForArticle(articleId) {
        const article = PumkinStorage.getKnowledgeArticleById(articleId);
        if (!article) return;

        const allQuestions = PumkinStorage.getQuestions();
        const relatedIds = article.related_question_ids || [];
        const drillQuestions = allQuestions.filter(q => q.knowledge_id === articleId || relatedIds.includes(q.id));

        if (drillQuestions.length === 0) {
            alert(`Hiá»‡n chÆ°a cÃ³ cÃ¢u há»i tráº¯c nghiá»‡m liÃªn káº¿t riÃªng vá»›i chuyÃªn Ä‘á» "${article.title}". Báº¡n cÃ³ thá»ƒ luyá»‡n táº­p qua Kho Ä‘á» hoáº·c Táº¡o Ä‘á»!`);
            return;
        }

        const stream = (article.grade || article.stream || "TOÃN");
        const customExam = {
            id: `drill_${articleId}_${Date.now()}`,
            title: `Luyá»‡n táº­p chuyÃªn Ä‘á»: ${article.title}`,
            description: `Bá»™ luyá»‡n táº­p gá»“m ${drillQuestions.length} cÃ¢u há»i trá»ng tÃ¢m cá»§a chuyÃªn Ä‘á» ${article.title}.`,
            duration_minutes: Math.max(10, Math.ceil(drillQuestions.length * 1.8)),
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
        let drillQuestions = allQuestions.filter(q => q.knowledge_id === this.currentArticleId || relatedIds.includes(q.id));

        if (tierLevel === "basic") {
            drillQuestions = drillQuestions.filter(q => (q.cognitive_level === "Nháº­n biáº¿t" || q.cognitive_level === "ThÃ´ng hiá»ƒu" || q.difficulty === "Dá»…" || q.difficulty === "Trung bÃ¬nh"));
        } else if (tierLevel === "advanced") {
            drillQuestions = drillQuestions.filter(q => (q.cognitive_level === "Váº­n dá»¥ng" || q.cognitive_level === "Váº­n dá»¥ng cao" || q.difficulty === "KhÃ³" || q.difficulty === "Váº­n dá»¥ng cao"));
        }

        if (drillQuestions.length === 0) {
            alert(`KhÃ´ng tÃ¬m tháº¥y cÃ¢u há»i má»©c Ä‘á»™ nÃ y trong chuyÃªn Ä‘á» "${article.title}". Há»‡ thá»‘ng Ä‘ang má»Ÿ bÃ i luyá»‡n toÃ n bá»™ chuyÃªn Ä‘á».`);
            this.startDrillForArticle(this.currentArticleId);
            return;
        }

        const tierName = tierLevel === "basic" ? "CÆ¡ báº£n (M1-M2)" : (tierLevel === "advanced" ? "NÃ¢ng cao (M3-M4)" : "ToÃ n bá»™");
        const customExam = {
            id: `drill_${this.currentArticleId}_${tierLevel}_${Date.now()}`,
            title: `Luyá»‡n táº­p (${tierName}): ${article.title}`,
            description: `Bá»™ luyá»‡n táº­p gá»“m ${drillQuestions.length} cÃ¢u há»i cáº¥p Ä‘á»™ ${tierName} cá»§a chuyÃªn Ä‘á» ${article.title}.`,
            duration_minutes: Math.max(10, Math.ceil(drillQuestions.length * 2)),
            exam_type: (article.grade || article.stream || "TOÃN"),
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
    PumkinStorage.init();
    PumkinBookmarks.updateBadge();
    if (typeof PumkinAdaptivePractice !== "undefined") {
        PumkinAdaptivePractice.renderUI();
    }
    if (typeof PumkinLearningTrace !== "undefined") {
        PumkinLearningTrace.getTrace();
    }

    // Check if there's an ongoing test session to restore
    const restored = PumkinPlayer.restoreSessionIfAvailable();
    if (!restored) {
        PumkinRouter.navigate("guide");
    }
});
</script>
</body>
</html>
