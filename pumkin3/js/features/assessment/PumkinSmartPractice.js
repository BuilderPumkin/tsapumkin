/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.SmartPractice
 * Layer: Adaptive Assessment
 * Description: Personalized Drill Sessions Based on Weakness Patterns
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

const PumkinSmartPractice = {
    render() {
        const container = document.getElementById("smart-practice-content");
        if (!container) return;

        const history = PumkinStorage.getHistory();
        const allQuestions = PumkinStorage.getQuestions();

        if (history.length === 0) {
            container.innerHTML = `
                <div class="smart-drill-card" style="padding: 40px; text-align: center;">
                    <div style="font-size: 40px; margin-bottom: 12px;">🧠</div>
                    <h3 style="color: var(--primary); margin-bottom: 10px;">Chưa có dữ liệu làm bài thi</h3>
                    <p style="color: var(--text-muted); max-width: 500px; margin: 0 auto 20px auto; font-size: 14px;">
                        Hãy hoàn thành ít nhất 1 đề thi trong Kho đề. Hệ thống AI sẽ tự động phân tích các câu làm sai và chủ đề yếu để thiết kế bài luyện riêng cho bạn!
                    </p>
                    <button class="btn btn-primary" onclick="PumkinRouter.navigate('library')">
                        📚 Làm đề đầu tiên ngay
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
                <div class="smart-drill-card">
                    <h4 style="color: var(--primary); margin-bottom: 12px; font-size: 16px;">⚠️ CÁC CHỦ ĐỀ BẠN HAY MẮC SAI LẦM:</h4>
                    ${sortedWeakTopics.map(top => `
                        <div class="smart-topic-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 13.5px;">
                            <span>📌 <strong>${top}</strong></span>
                            <span style="color: var(--danger); font-weight: 700;">${topicMistakes[top]} lần sai</span>
                        </div>
                    `).join("")}
                </div>

                <div class="smart-drill-card" style="display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h4 style="color: var(--success); margin-bottom: 12px; font-size: 16px;">🚀 ĐỀ XUẤT LUYỆN TẬP HÔM NAY:</h4>
                        <p style="font-size: 14px; color: var(--text-muted); line-height: 1.6;">
                            Hệ thống đã tổng hợp <strong>${Math.max(5, wrongQIds.size)} câu hỏi trọng tâm</strong> bao gồm các câu bạn từng làm sai và các câu tương tự thuộc chủ đề <em>${sortedWeakTopics[0] || 'Toán học'}</em>.
                        </p>
                    </div>
                    <button class="btn btn-primary btn-lg" onclick="PumkinSmartPractice.startSmartDrill()">
                        ⚡ Bắt đầu luyện 15 câu khắc phục điểm yếu
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
            title: "Smart Practice: Bài Luyện Khắc Phục Điểm Yếu",
            type: "Luyện thông minh",
            year: 2025,
            duration_minutes: 30,
            questions: drillQuestions.slice(0, 15),
            difficulty: "Cân bằng",
            source: "AI Adaptive Engine - PUMKIN.DEV",
            description: "Gồm các câu hỏi bạn từng trả lời sai và các dạng bài thuộc chủ đề cần củng cố."
        };

        PumkinPlayer.startExam(drillExam.id, true, drillExam);
    }
};


    // Primary Namespace
    window.Pumkin.SmartPractice = PumkinSmartPractice;

    // // DEPRECATED: Backward compatibility shim
    window.PumkinSmartPractice = PumkinSmartPractice;
})(window);
