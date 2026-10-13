/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.Generator
 * Layer: Assessment & Exam Engine
 * Description: Exam Generator Module (10-Step Algorithm for Matrix-based Generation)
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

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
            PumkinToast.warning("Vui lòng chọn ít nhất 1 chủ đề kiến thức!");
            return;
        }

        const allQuestions = PumkinStorage.getQuestions();
        const isUltraHardMode = (diffProfile === "Siêu khó");

        // 1. Filter pool by type & topic
        let pool = allQuestions.filter(q => {
            if (targetType !== "all" && q.exam_type !== targetType) return false;
            if (!checkedTopics.includes(q.topic)) return false;
            return true;
        });

        if (pool.length === 0) {
            pool = allQuestions.filter(q => checkedTopics.includes(q.topic));
        }

        // Isolate ultra-hard questions: NEVER include them in normal difficulty modes
        if (!isUltraHardMode) {
            pool = pool.filter(q => q.difficulty !== "Rất khó" && (!q.tags || !q.tags.includes("Siêu khó")));
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
        if (isUltraHardMode) {
            // Find all ultra-hard questions matching target type or globally
            const ultraPool = shuffle(allQuestions.filter(q => q.difficulty === "Rất khó" || (q.tags && q.tags.includes("Siêu khó"))));
            const hardPool = shuffle(pool.filter(q => q.difficulty === "Khó"));
            
            // Prioritize all ultra-hard questions first
            selectedQuestions = [...ultraPool];
            if (selectedQuestions.length < qCount) {
                const needed = qCount - selectedQuestions.length;
                selectedQuestions = selectedQuestions.concat(hardPool.slice(0, needed));
            }
            if (selectedQuestions.length < qCount) {
                const morePool = shuffle(pool.filter(q => !selectedQuestions.some(sq => sq.id === q.id)));
                selectedQuestions = selectedQuestions.concat(morePool.slice(0, qCount - selectedQuestions.length));
            }
            selectedQuestions = selectedQuestions.slice(0, qCount);
        } else if (diffProfile === "balanced") {
            const easy = shuffle(pool.filter(q => q.difficulty === "Dễ"));
            const medium = shuffle(pool.filter(q => q.difficulty === "Trung bình"));
            const hard = shuffle(pool.filter(q => q.difficulty === "Khó"));

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

        // If still not enough, take from all non-ultra questions
        if (selectedQuestions.length < qCount) {
            const extra = shuffle(allQuestions.filter(q => !selectedQuestions.some(sq => sq.id === q.id) && (isUltraHardMode || (q.difficulty !== "Rất khó" && (!q.tags || !q.tags.includes("Siêu khó"))))));
            selectedQuestions = selectedQuestions.concat(extra.slice(0, qCount - selectedQuestions.length));
        }

        selectedQuestions = shuffle(selectedQuestions);

        const customTitle = isUltraHardMode
            ? `🔥 Đề Thử Thách Siêu Khó: ${targetType === 'all' ? 'Tổng Hợp Đa DNA' : targetType} (${selectedQuestions.length} câu - ${durationMin} phút)`
            : `Đề Tùy Chỉnh: ${targetType === 'all' ? 'Tổng hợp' : targetType} (${selectedQuestions.length} câu - ${durationMin} phút)`;

        const customExam = {
            id: "custom_" + Date.now(),
            title: customTitle,
            type: targetType === 'all' ? 'Tổng hợp' : targetType,
            year: 2026,
            duration_minutes: durationMin,
            questions: selectedQuestions,
            difficulty: isUltraHardMode ? 'Siêu khó' : (diffProfile === 'balanced' ? 'Cân bằng' : diffProfile),
            source: isUltraHardMode ? "Trình tạo đề Đột phá PUMKIN.DEV (Thử thách Đỉnh cao)" : "Tạo tự động từ Ngân hàng PUMKIN.DEV",
            description: isUltraHardMode
                ? `Bộ đề thử thách đỉnh cao tích hợp đa tầng Question DNA (Giải tích vi phân, Xích Markov ma trận, Tích phân Cauchy-Schwarz, Dãy số siêu việt tiệm cận).`
                : `Đề luyện tập sinh tự động bám sát cấu trúc các chủ đề: ${checkedTopics.join(", ")}.`
        };

        PumkinPlayer.startExam(customExam.id, true, customExam);
    }
};


    // Primary Namespace
    window.Pumkin.Generator = PumkinGenerator;

    // // DEPRECATED: Backward compatibility shim
    window.PumkinGenerator = PumkinGenerator;
})(window);
