/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.DataRepo
 * Layer: Content Distribution
 * Description: Open Data Hub, Datasets Explorer, Schema Validator & API Previews
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

const PumkinDataRepo = {
    currentSource: "local",
    currentCodeLang: "js",
    activePreviewKey: null,
    activePreviewContent: "",
    activePreviewFilename: "dataset.json",

    endpoints: [
        { name: "Trọn bộ Bundle Hệ thống", path: "bundle.json", format: "JSON", records: "236 mục", desc: "Toàn bộ câu hỏi, đề thi, lý thuyết & công thức trong 1 file" },
        { name: "Tệp Kê khai & Checksums", path: "manifest.json", format: "JSON", records: "22 tệp", desc: "Metadata, version v1.2.0 và toàn bộ 22 mã băm SHA-256" },
        { name: "Ngân hàng 165 câu hỏi thi", path: "questions/all.json", format: "JSON", records: "165 câu", desc: "Toàn bộ câu hỏi chuẩn hóa kèm lời giải chi tiết" },
        { name: "Bảng tính câu hỏi (Excel/Sheets)", path: "questions/questions.csv", format: "CSV", records: "165 dòng", desc: "Bảng tính UTF-8 mở trực tiếp bằng Excel không lỗi font" },
        { name: "Câu hỏi TSA Bách Khoa", path: "questions/tsa.json", format: "JSON", records: "62 câu", desc: "Toán tư duy Bách Khoa: Đa thức, AM-GM, Hình học, Xác suất" },
        { name: "Câu hỏi HSA ĐHQGHN", path: "questions/hsa.json", format: "JSON", records: "47 câu", desc: "Tư duy định lượng: Thống kê, Dãy số, Hình tọa độ" },
        { name: "Câu hỏi Tốt nghiệp THPT", path: "questions/thpt.json", format: "JSON", records: "32 câu", desc: "Chuẩn cấu trúc Bộ GD&ĐT: Trắc nghiệm, Đúng/Sai, Điền số" },
        { name: "Câu hỏi Giải tích 1 & ĐSTT", path: "questions/calculus1.json", format: "JSON", records: "24 câu", desc: "Toán cao cấp Đại học: Giới hạn, Tích phân suy rộng, Ma trận" },
        { name: "Kho 42 đề thi chuẩn hóa", path: "exams/all.json", format: "JSON", records: "42 đề", desc: "Đề thi đầy đủ thời gian làm bài và danh sách câu hỏi" },
        { name: "Đề thi TSA Bách Khoa", path: "exams/tsa.json", format: "JSON", records: "12 đề", desc: "12 đề thi TSA chọn lọc có bấm giờ và giải thích" },
        { name: "Đề thi HSA ĐHQGHN", path: "exams/hsa.json", format: "JSON", records: "12 đề", desc: "12 đề thi HSA định lượng chuẩn ma trận" },
        { name: "Đề thi THPT Quốc Gia", path: "exams/thpt.json", format: "JSON", records: "14 đề", desc: "14 đề thi Tốt nghiệp THPT từ cơ bản đến vận dụng cao" },
        { name: "Đề thi Giải tích 1", path: "exams/calculus1.json", format: "JSON", records: "4 đề", desc: "4 đề thi kết thúc học phần Toán giải tích đại học" },
        { name: "Sổ tay 25 chuyên đề lý thuyết", path: "knowledge/all.json", format: "JSON", records: "25 bài", desc: "Chuyên đề bài giảng Toán 10-12, ĐSTT, Giải tích 1" },
        { name: "Cẩm nang Lý thuyết Markdown", path: "knowledge/knowledge_handbook.md", format: "Markdown", records: "25 bài", desc: "Tài liệu Markdown chuẩn KaTeX sẵn sàng biên soạn" },
        { name: "Bảng 44 công thức KaTeX", path: "formulas/cheatsheet.json", format: "JSON", records: "44 công thức", desc: "Công thức kèm mã LaTeX, mô tả ý nghĩa và tags" },
        { name: "Bảng tra cứu công thức (.md)", path: "formulas/cheatsheet.md", format: "Markdown", records: "44 công thức", desc: "Bảng công thức trình bày Markdown dễ đọc" },
        { name: "Cây phân loại đề mục", path: "taxonomy/topics.json", format: "JSON", records: "5 khối", desc: "Cây phân cấp khối lớp, chương, kỳ thi và dạng câu hỏi" }
    ],

    schemas: {
        schema_question: {
            title: "Question Schema (Đặc tả câu hỏi)",
            url: "schemas/question.schema.json",
            desc: "JSON Schema Draft 2020-12 cho câu hỏi thi Toán học"
        },
        schema_exam: {
            title: "Exam Schema (Đặc tả đề thi)",
            url: "schemas/exam.schema.json",
            desc: "JSON Schema cho cấu trúc đề thi và ma trận khảo thí"
        },
        schema_knowledge: {
            title: "Knowledge Schema (Đặc tả chuyên đề)",
            url: "schemas/knowledge.schema.json",
            desc: "JSON Schema cho bài giảng lý thuyết và công thức"
        },
        schema_manifest: {
            title: "Manifest Schema (Đặc tả tệp kê khai)",
            url: "schemas/manifest.schema.json",
            desc: "JSON Schema cho tệp kê khai siêu dữ liệu và checksums"
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
                return origin + "/data/";
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
            const fullUrl = baseUrl + ep.path;
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
                        <button class="btn btn-sm btn-outline" style="padding: 3px 8px; font-size: 12px; margin-right: 4px;" onclick="PumkinDataRepo.copyText('${fullUrl}', this)" title="Sao chép URL">📋 Link</button>
                        <button class="btn btn-sm btn-outline" style="padding: 3px 8px; font-size: 12px;" onclick="PumkinDataRepo.previewByPath('${ep.path}', '${ep.name}')" title="Xem trước nội dung">👁️ Xem</button>
                    </td>
                </tr>
            `;
        }).join("");
    },

    renderCodeSnippet() {
        const display = document.getElementById("api-code-display");
        if (!display) return;

        const baseUrl = this.getBaseUrl();
        const urlManifest = baseUrl + "manifest.json";
        const urlQuestions = baseUrl + "questions/all.json";
        const urlExams = baseUrl + "exams/tsa.json";

        let code = "";
        if (this.currentCodeLang === "js") {
            code = '// 1. Tải siêu dữ liệu (Manifest) để kiểm tra phiên bản mới nhất\n' +
                'fetch("' + urlManifest + '")\n' +
                '  .then(res => res.json())\n' +
                '  .then(manifest => {\n' +
                '    console.log("Phiên bản:", manifest.version);\n' +
                '    console.log("Tổng số câu hỏi:", manifest.stats.total_questions);\n' +
                '  });\n\n' +
                '// 2. Tải toàn bộ 165 câu hỏi thi chuẩn hóa\n' +
                'fetch("' + urlQuestions + '")\n' +
                '  .then(res => res.json())\n' +
                '  .then(questions => {\n' +
                '    console.log("Đã nhận diện " + questions.length + " câu hỏi!");\n' +
                '    const advanced = questions.filter(q => q.topic === "Giải tích" && q.difficulty === "Khó");\n' +
                '    console.log("Số câu giải tích nâng cao:", advanced.length);\n' +
                '  })\n' +
                '  .catch(err => console.error("Lỗi khi tải dữ liệu:", err));';
        } else if (this.currentCodeLang === "python") {
            code = '# Cài đặt thư viện: pip install requests\n' +
                'import requests\n\n' +
                '# 1. Tải tệp Kê khai siêu dữ liệu\n' +
                'manifest = requests.get("' + urlManifest + '").json()\n' +
                'print(f"Phiên bản Dataset: {manifest[\'version\']}")\n' +
                'print(f"Giấy phép: {manifest[\'license\']}")\n\n' +
                '# 2. Tải 12 đề thi TSA Bách Khoa\n' +
                'exams = requests.get("' + urlExams + '").json()\n' +
                'print(f"Tải thành công {len(exams)} đề thi TSA!")\n' +
                'for e in exams[:3]:\n' +
                '    print(f"- {e[\'title\']} ({e[\'duration_minutes\']} phút, {e[\'question_count\']} câu)")';
        } else if (this.currentCodeLang === "curl") {
            code = '# 1. Kiểm tra header CORS và tải tệp manifest\n' +
                'curl -i -X GET "' + urlManifest + '"\n\n' +
                '# 2. Tải trực tiếp toàn bộ câu hỏi và lưu thành tệp questions_all.json\n' +
                'curl -o questions_all.json "' + urlQuestions + '"\n\n' +
                '# 3. Tải bảng tính CSV để mở bằng Excel\n' +
                'curl -o questions.csv "' + baseUrl + 'questions/questions.csv"';
        } else if (this.currentCodeLang === "powershell") {
            code = '# 1. Truy vấn Manifest bằng PowerShell (Zero-dependency)\n' +
                '$manifest = Invoke-RestMethod "' + urlManifest + '"\n' +
                'Write-Host "Phiên bản: $($manifest.version) | Tổng số câu: $($manifest.stats.total_questions)"\n\n' +
                '# 2. Tải trực tiếp đề thi và đếm theo thời gian\n' +
                '$tsaExams = Invoke-RestMethod "' + urlExams + '"\n' +
                '$tsaExams | Format-Table id, title, duration_minutes, difficulty -AutoSize\n\n' +
                '# 3. Tải toàn bộ Bundle về máy\n' +
                'Invoke-WebRequest -Uri "' + baseUrl + 'bundle.json" -OutFile "pumkin_bundle.json"\n' +
                'Write-Host "Tải thành công pumkin_bundle.json!" -ForegroundColor Green';
        }

        display.textContent = code;
    },

    copyCodeSnippet(btn) {
        const display = document.getElementById("api-code-display");
        if (!display) return;
        this.copyText(display.textContent, btn);
    },

    copyEndpointUrl(relPath, btn) {
        const full = this.getBaseUrl() + relPath;
        this.copyText(full, btn);
    },

    copyText(text, btn) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                this.flashButton(btn, "✓ Đã chép!");
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
            this.flashButton(btn, "✓ Đã chép!");
        } catch(e) {
            PumkinToast.info("Vui lòng bôi đen văn bản và nhấn Ctrl + C để sao chép.");
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
                return exams.filter(e => e.type === "Giải tích 1" || e.exam_type === "Giải tích 1" || (e.id && e.id.indexOf("calc") >= 0));
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
                            id: f.id || (k.id + "_f"),
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
                    grades: ["Toán 10", "Toán 11", "Toán 12", "Toán cao cấp", "Giải tích 1"],
                    exam_types: ["TSA", "HSA", "THPT", "Giải tích 1"],
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
            return '"' + str + '"';
        }

        questions.forEach(q => {
            const opts = q.options || [];
            let ans = "";
            if (q.type === "single_choice" || !q.type) {
                ans = ["A", "B", "C", "D"][q.correct_answer] || "";
            } else if (q.type === "short_answer") {
                ans = q.correct_value || "";
            } else if (q.type === "true_false_group") {
                ans = (q.items || []).map(it => it.label + ":" + (it.correct ? "T" : "F")).join("; ");
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
        let md = "# PUMKIN.DEV - CẨM NANG TOÁN HỌC TOÀN TẬP\n\n";
        md += "> Tuyển tập 25 chuyên đề lý thuyết, 44 công thức KaTeX và bài tập giải chi tiết.\n\n---\n\n";
        knowledge.forEach((k, idx) => {
            md += "## " + (idx + 1) + ". " + k.grade + ": " + k.title + "\n\n";
            md += "**Chương:** " + k.chapter + " | **Mã:** `" + k.id + "`\n\n";
            md += "**Tổng quan:** " + k.overview + "\n\n";
            md += "### Lý thuyết trọng tâm\n\n" + k.theory_markdown + "\n\n";
            if (k.formulas && k.formulas.length > 0) {
                md += "### Bảng công thức\n\n";
                k.formulas.forEach(f => {
                    md += "- **" + f.name + "**: $$" + f.latex + "$$\n  *" + f.desc + "*\n\n";
                });
            }
            md += "---\n\n";
        });
        return md;
    },

    generateFormulasMarkdown() {
        const formulas = this.getDataByKey("formulas_json");
        let md = "# PUMKIN.DEV - BẢNG TRA CỨU CÔNG THỨC TOÁN HỌC\n\n";
        md += "> 44 công thức toán học cốt lõi ôn thi TSA, HSA, THPT, Giải tích 1.\n\n";
        formulas.forEach(f => {
            md += "### " + f.name + " (" + f.grade + ")\n\n";
            md += "- **Công thức:** $$" + f.latex + "$$\n";
            md += "- **Ý nghĩa:** " + f.desc + "\n\n";
        });
        return md;
    },

    downloadDirect(key, format) {
        let content = "";
        let filename = "pumkin_" + key + "." + (format === "markdown" ? "md" : format);
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

        let title = "Xem trước Dữ liệu";
        let sub = "";
        let text = "";
        let filename = "dataset.json";

        if (key.startsWith("schema_")) {
            const schemaInfo = this.schemas[key];
            if (schemaInfo) {
                title = "🛡️ " + schemaInfo.title;
                sub = schemaInfo.desc;
                filename = schemaInfo.url.split("/").pop();
                text = JSON.stringify(this.getSchema(key), null, 2);
            }
        } else if (key === "bundle") {
            title = "📦 Trọn bộ Hệ thống (Bundle)";
            const data = this.getDataByKey("bundle");
            const previewObj = {
                version: data.version,
                license: data.license,
                summary: data.summary,
                questions_sample: (data.questions || []).slice(0, 2),
                exams_sample: (data.exams || []).slice(0, 2),
                knowledge_sample: (data.knowledge || []).slice(0, 1),
                _note: "Hiển thị mẫu 2 bản ghi. Bấm 'Tải tệp này' để nhận toàn bộ 165 câu hỏi, 42 đề thi và 25 chuyên đề!"
            };
            text = JSON.stringify(previewObj, null, 2);
            sub = "Gói Bundle đầy đủ • 236 bản ghi • Dung lượng ~510 KB";
            filename = "pumkin_bundle.json";
        } else {
            const data = this.getDataByKey(key);
            title = "Tài nguyên: " + key;
            const count = Array.isArray(data) ? data.length : 1;
            sub = "Định dạng JSON • " + count + " bản ghi • Đã định dạng chuẩn Pretty Print";
            text = JSON.stringify(data, null, 2);
            filename = "pumkin_" + key + ".json";
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
            this.showRawTextInPreview(name, "Định dạng CSV UTF-8", csv.slice(0, 2000) + "\n\n... [Còn 160 dòng tiếp theo] ...", "pumkin_questions.csv");
        } else if (path.endsWith(".md")) {
            const md = path.indexOf("formula") >= 0 ? this.generateFormulasMarkdown() : this.generateKnowledgeMarkdown();
            this.showRawTextInPreview(name, "Định dạng Markdown KaTeX", md.slice(0, 2500) + "\n\n... [Được rút gọn để hiển thị xem trước mượt mà] ...", path.split("/").pop());
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
                    "exam_type": { "enum": ["TSA", "HSA", "THPT", "Giải tích 1", "Đại học"] },
                    "grade": { "type": "string" },
                    "topic": { "type": "string" },
                    "difficulty": { "enum": ["Dễ", "Trung bình", "Khó", "Vận dụng cao"] },
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

    // Primary Namespace
    window.Pumkin.DataRepo = PumkinDataRepo;

    // // DEPRECATED: Backward compatibility shim
    window.PumkinDataRepo = PumkinDataRepo;
})(window);
