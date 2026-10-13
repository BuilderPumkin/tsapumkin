/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.AdaptivePractice
 * Layer: Dynamic Difficulty Adaptation
 * Description: Real-time Adaptive Practice Engine with dynamic difficulty scaling
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

const PumkinAdaptivePractice = {
    session: null,

    startSession(topic = "all") {
        const allQuestions = (typeof PumkinStorage !== "undefined") ? PumkinStorage.getQuestions() : [];
        const pool = (topic === "all") 
            ? allQuestions 
            : allQuestions.filter(q => q.topic && q.topic.toLowerCase().includes(topic.toLowerCase()));

        this.session = {
            topic: topic,
            tier: 2, // 1: Nhận biết, 2: Thông hiểu, 3: Vận dụng, 4: Vận dụng cao
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
        // Limit each adaptive proficiency drill session to exactly 10 questions
        if (this.session.total >= 10) {
            this.renderUI(null, true);
            return;
        }
        const tierNames = ["Nhận biết", "Thông hiểu", "Vận dụng", "Vận dụng cao"];
        const targetLevel = tierNames[this.session.tier - 1];

        // Filter available questions in current tier
        let candidates = this.session.pool.filter(q => {
            const lvl = q.cognitive_level || "Thông hiểu";
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
                <div class="adaptive-engine-card" style="padding: 28px; text-align: center;">
                    <div style="font-size: 36px; margin-bottom: 12px;">🎯</div>
                    <h3 style="color: var(--primary); margin-bottom: 8px;">Luyện Tập Thích Ứng (Adaptive Practice Engine)</h3>
                    <p style="color: var(--text-muted); font-size: 14px; max-width: 540px; margin: 0 auto 20px auto; line-height: 1.6;">
                        Thuật toán tự động tăng độ khó khi bạn làm đúng (M1 ➔ M2 ➔ M3 ➔ M4) và hạ cấp độ khó khi làm sai để củng cố nền tảng một cách vững chắc nhất.
                    </p>
                    <button class="btn btn-primary btn-lg" onclick="PumkinAdaptivePractice.startSession('all')">
                        🚀 Khởi động Luyện Thích Ứng Ngay
                    </button>
                </div>
            `;
            return;
        }

        const s = this.session;
        const q = question || s.currentQuestion;

        if (isFinished || !q) {
            container.innerHTML = `
                <div class="adaptive-engine-card" style="padding: 32px; text-align: center;">
                    <div style="font-size: 40px; margin-bottom: 10px;">🏆</div>
                    <h3 style="color: var(--primary);">Hoàn Thành Phiên Luyện Thích Ứng!</h3>
                    <p style="color: var(--text-muted); margin: 12px 0 20px 0;">
                        Bạn đã hoàn thành <strong>${s.total} câu</strong> với độ chính xác <strong>${Math.round((s.score / s.total) * 100)}%</strong>.
                    </p>
                    <button class="btn btn-primary" onclick="PumkinAdaptivePractice.startSession('all')">Luyện tập lượt mới</button>
                </div>
            `;
            return;
        }

        const tierNames = ["Cơ bản (M1)", "Thông hiểu (M2)", "Vận dụng (M3)", "Vận dụng cao (M4)"];
        const tierBadges = ["#10b981", "#3b82f6", "#f59e0b", "#dc2626"];

        let feedbackHtml = "";
        if (lastResult !== null) {
            feedbackHtml = lastResult 
                ? `<div class="adaptive-feedback-correct" style="padding: 10px 14px; border-radius: 8px; margin-bottom: 16px; font-weight: 600;">
                    ✓ Chính xác! Tăng độ khó: <span style="color: ${tierBadges[s.tier - 1]}; font-weight: 800;">${tierNames[s.tier - 1]}</span>
                   </div>`
                : `<div class="adaptive-feedback-wrong" style="padding: 10px 14px; border-radius: 8px; margin-bottom: 16px; font-weight: 600;">
                    ✗ Chưa chính xác. Hạ độ khó để củng cố: <span style="color: ${tierBadges[s.tier - 1]}; font-weight: 800;">${tierNames[s.tier - 1]}</span>
                   </div>`;
        }

        container.innerHTML = `
            <div class="adaptive-engine-card" style="padding: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
                    <div>
                        <span style="font-size: 13px; font-weight: 700; background: ${tierBadges[s.tier - 1]}; color: white; padding: 4px 10px; border-radius: 20px;">
                            Cấp độ: ${tierNames[s.tier - 1]}
                        </span>
                        <span style="margin-left: 10px; font-size: 13px; color: var(--text-muted);">
                            Tiến độ: Câu ${s.total + 1} | Đúng: ${s.score}/${s.total}
                        </span>
                    </div>
                    <button class="btn btn-sm btn-outline" onclick="PumkinAdaptivePractice.startSession('all')">
                        🔄 Đổi đề
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

        if (window.Pumkin && window.Pumkin.Math) {
            window.Pumkin.Math.renderElement(container);
        } else if (window.PumkinMath) {
            window.PumkinMath.typeset(container);
        }
    }
};

    // Primary Namespace
    window.Pumkin.AdaptivePractice = PumkinAdaptivePractice;

    // // DEPRECATED: Backward compatibility shim
    window.PumkinAdaptivePractice = PumkinAdaptivePractice;
})(window);
