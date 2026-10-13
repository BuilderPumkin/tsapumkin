/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.Admin
 * Layer: Knowledge & Question Bank Administration
 * Description: Question Import/Export, Data Validation & System Backup Tools
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

const PumkinAdmin = {
    render() {
        const questions = PumkinStorage.getQuestions();
        document.getElementById("admin-total-q").textContent = questions.length;
        document.getElementById("admin-tsa-q").textContent = questions.filter(q => q.exam_type === "TSA").length;
        document.getElementById("admin-hsa-q").textContent = questions.filter(q => q.exam_type === "HSA").length;
        document.getElementById("admin-thpt-q").textContent = questions.filter(q => q.exam_type === "THPT").length;
        document.getElementById("admin-calc-q").textContent = questions.filter(q => q.exam_type === "Giải tích 1").length;

        const tableContainer = document.getElementById("admin-questions-table-container");
        if (tableContainer) {
            tableContainer.innerHTML = `
                <div class="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Mã ID</th>
                            <th>Kỳ thi</th>
                            <th>Chủ đề</th>
                            <th>Độ khó</th>
                            <th>Nội dung tóm tắt</th>
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
                "question_text": "Tính tích phân \\(I = \\int_0^1 (2x + 1) dx\\).",
                "options": ["1", "2", "3", "4"],
                "correct_answer": 1,
                "explanation": "Nguyên hàm là \\(x^2 + x\\). Thay cận 0 và 1: \\(1 + 1 - 0 = 2\\).",
                "topic": "Giải tích",
                "subtopic": "Tích phân cơ bản",
                "difficulty": "Dễ",
                "exam_type": "THPT",
                "year": 2025,
                "source": "Đề khảo sát THPT",
                "tags": ["Tích phân"]
            }
        ];
        document.getElementById("admin-import-json").value = JSON.stringify(sample, null, 2);
    },

    importJson() {
        const text = document.getElementById("admin-import-json").value.trim();
        if (!text) {
            PumkinToast.warning("Vui lòng dán dữ liệu JSON câu hỏi cần nhập!");
            return;
        }

        try {
            const parsed = JSON.parse(text);
            if (!Array.isArray(parsed)) {
                PumkinToast.error("Dữ liệu JSON phải là một mảng danh sách câu hỏi [ ... ]!");
                return;
            }

            const current = PumkinStorage.getQuestions();
            let addedCount = 0;
            let duplicateCount = 0;

            // Simple text normalizer for duplicate detection
            const normalize = str => str.toLowerCase().replace(/[^a-z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/g, '');

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
            PumkinToast.success(`✅ Import hoàn tất! Thêm mới: ${addedCount} câu, Bỏ qua trùng lặp: ${duplicateCount} câu.`, 6000);
            this.render();
        } catch(e) {
            PumkinToast.error("Lỗi cú pháp JSON: " + e.message, 6000);
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
        PumkinToast.info("Để thêm câu hỏi nhanh, bạn có thể dán định dạng JSON vào ô bên trên và bấm 'Tiến hành Import'!");
    }
};

    // Primary Namespace
    window.Pumkin.Admin = PumkinAdmin;

    // // DEPRECATED: Backward compatibility shim
    window.PumkinAdmin = PumkinAdmin;
})(window);
