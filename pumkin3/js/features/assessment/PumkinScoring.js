/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.Scoring
 * Layer: Assessment Evaluation & Feedback
 * Description: Exam Grading, Math Normalization, Solution Review, and Telemetry Dispatch
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

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
            } else if (q.type === "drag_drop") {
                const ansObj = (userAns && typeof userAns === "object") ? userAns : {};
                const blanks = q.blanks || [];
                const isSkipped = Object.keys(ansObj).length === 0 || Object.values(ansObj).every(v => !v);
                if (isSkipped) {
                    status = "skipped";
                    skippedCount++;
                } else {
                    let subCorrect = 0;
                    const items = q.drag_items || [];
                    const itemMap = new Map(items.map(it => [it.id, it]));
                    blanks.forEach(b => {
                        const userVal = ansObj[b.id];
                        const userItem = userVal ? itemMap.get(userVal) : null;
                        const isSubCorrect = (userVal === b.expected_item_id) ||
                                             (b.correct && userVal === b.correct) ||
                                             (userItem && b.correct && (userItem.content === b.correct || userItem.text === b.correct));
                        if (isSubCorrect) {
                            subCorrect++;
                        }
                    });
                    const totalSub = Math.max(1, blanks.length);
                    earned = Number((subCorrect / totalSub).toFixed(2));

                    if (subCorrect === totalSub) {
                        status = "correct";
                        correctCount++;
                    } else if (subCorrect > 0) {
                        status = "partial";
                        wrongCount++;
                    } else {
                        status = "wrong";
                        wrongCount++;
                    }
                    detail = { subCorrect, totalSub };
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
        const scoreVal = parseFloat(((totalScoreEarned / Math.max(1, total)) * maxScore).toFixed(2));
        // Shadow Mode: Calculate Rasch 1PL Theta in the background (Non-invasive to CTT score)
        let shadowRasch = null;
        const raschEngine = (typeof window !== 'undefined' && window.Pumkin && window.Pumkin.RaschEstimator)
            ? window.Pumkin.RaschEstimator
            : (typeof PumkinRaschEstimator !== 'undefined' ? PumkinRaschEstimator : null);

        if (raschEngine && raschEngine.isShadowMode()) {
            try {
                const raschResponses = questions.map((q, idx) => {
                    const qG = questionGrading[idx];
                    const isCorrect = qG && (qG.status === "correct" || qG.earned >= 0.5);
                    const b = raschEngine.getItemDifficulty(q);
                    return { b, correct: isCorrect, questionId: q.id };
                });
                shadowRasch = raschEngine.estimateTheta(raschResponses);
            } catch (err) {
                console.warn("[Rasch Shadow Mode] Error estimating theta:", err);
            }
        }

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
            grading: questionGrading,
            shadow_rasch: shadowRasch
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
                    cognitive_level: q.cognitive_level || "Thông hiểu",
                    skills: q.skills || []
                });
            });
        }

        // 3-Step Journey Hooks
        const journeyMgr = (typeof window !== 'undefined' && window.Pumkin && window.Pumkin.JourneyManager)
            ? window.Pumkin.JourneyManager
            : (typeof PumkinJourneyManager !== 'undefined' ? PumkinJourneyManager : null);

        if (journeyMgr) {
            if (exam.is_diagnostic && typeof journeyMgr.onDiagnosticCompleted === "function") {
                journeyMgr.onDiagnosticCompleted(resultRecord);
            } else if (exam.is_daily_focus && typeof journeyMgr.onDailyFocusCompleted === "function") {
                journeyMgr.onDailyFocusCompleted(resultRecord);
            }
        }

        this.renderResult(resultRecord);
    },

    renderResult(res) {
        PumkinRouter.navigate("result", () => {
            document.getElementById("result-exam-title-sub").textContent = res.exam_title;
            document.getElementById("result-score-val").textContent = res.score;
            document.getElementById("result-accuracy-big").textContent = `${res.accuracy}%`;

            let gradeMsg = "Rất tốt! Bạn làm chủ kiến thức vững vàng.";
            if (res.accuracy >= 90) gradeMsg = "Xuất sắc! Bạn đã đạt mức điểm mục tiêu của thủ khoa.";
            else if (res.accuracy < 50) gradeMsg = "Cần củng cố thêm kiến thức ở các chuyên đề yếu.";
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
                            <span>📌 ${tName} (${(stat.correctScore || 0).toFixed(1)}/${stat.total} điểm)</span>
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

    _reviewFilteredIndices: [],
    _reviewDisplayLimit: 10,

    renderReviewQuestions(filterType) {
        const container = document.getElementById("result-review-questions-list");
        if (!container || !this.currentResult) return;

        const res = this.currentResult;
        this._reviewFilteredIndices = res.questions.map((q, idx) => idx).filter(idx => {
            const gradeInfo = res.grading ? res.grading[idx] : null;
            const status = gradeInfo ? gradeInfo.status : "wrong";
            if (filterType === "correct") return status === "correct";
            if (filterType === "wrong") return status === "wrong" || status === "partial";
            if (filterType === "flagged") return res.flagged[idx];
            return true;
        });

        this._reviewDisplayLimit = 10;
        this.renderReviewSlice(false);
    },

    renderReviewSlice(appendOnly = false) {
        const container = document.getElementById("result-review-questions-list");
        if (!container || !this.currentResult) return;

        const res = this.currentResult;
        const filteredIndices = this._reviewFilteredIndices;
        const letters = ["A", "B", "C", "D", "E"];

        if (filteredIndices.length === 0) {
            container.innerHTML = `
                <div class="qbank-empty-state" style="text-align: center; padding: 30px; border-radius: 8px;">
                    <p style="color: var(--text-muted);">Không có câu hỏi nào trong danh mục này.</p>
                </div>
            `;
            return;
        }

        const startIdx = appendOnly ? Math.max(0, this._reviewDisplayLimit - 10) : 0;
        const sliceIndices = appendOnly
            ? filteredIndices.slice(startIdx, this._reviewDisplayLimit)
            : filteredIndices.slice(0, this._reviewDisplayLimit);

        const html = sliceIndices.map(qIdx => {
            const q = res.questions[qIdx];
            const uAns = res.user_answers[qIdx];
            const gradeInfo = res.grading ? res.grading[qIdx] : null;
            const status = gradeInfo ? gradeInfo.status : (uAns === q.correct_answer ? "correct" : (uAns === null ? "skipped" : "wrong"));

            let cardClass = "wrong";
            let badgeHtml = `<span class="status-badge badge-wrong">❌ SAI (0.00 đ)</span>`;
            if (status === "correct") {
                cardClass = "correct";
                badgeHtml = `<span class="status-badge badge-correct">✓ ĐÚNG (+1.00 đ)</span>`;
            } else if (status === "partial") {
                cardClass = "partial";
                const pts = gradeInfo ? gradeInfo.earnedScore.toFixed(2) : "0.25";
                badgeHtml = `<span class="status-badge badge-warning">⚠️ ĐÚNG MỘT PHẦN (+${pts} đ)</span>`;
            } else if (status === "skipped") {
                cardClass = "skipped";
                badgeHtml = `<span class="status-badge badge-skipped">○ BỎ QUA</span>`;
            }

            const isSaved = PumkinStorage.isBookmarked(q.id);

            // Render details by question type
            let answerBodyHtml = "";

            if (q.type === "true_false_group") {
                const userObj = (uAns && typeof uAns === "object") ? uAns : {};
                answerBodyHtml = `
                    <div class="review-answer-box">
                        <div style="font-size: 13.5px; font-weight: 700; color: var(--primary); margin-bottom: 10px;">
                            BẢNG ĐỐI CHIẾU ĐÁP ÁN ĐÚNG / SAI:
                        </div>
                        <table style="width: 100%; border-collapse: collapse; font-size: 13.5px;">
                            <thead>
                                <tr style="border-bottom: 1.5px solid #cbd5e1; text-align: left; color: #475569;">
                                    <th style="padding: 6px 8px; width: 40px;">Ý</th>
                                    <th style="padding: 6px 8px;">Nội dung nhận định</th>
                                    <th style="padding: 6px 8px; text-align: center; width: 110px;">Bạn chọn</th>
                                    <th style="padding: 6px 8px; text-align: center; width: 110px;">Đáp án đúng</th>
                                    <th style="padding: 6px 8px; text-align: center; width: 80px;">Kết quả</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${(q.items || []).map(item => {
                                    const userChoice = userObj[item.label];
                                    const isSubRight = (userChoice === item.correct);
                                    let choiceText = userChoice === true ? "Đúng" : (userChoice === false ? "Sai" : "— Chưa chọn —");
                                    let correctText = item.correct ? "Đúng" : "Sai";
                                    return `
                                        <tr style="border-bottom: 1px solid #e2e8f0;">
                                            <td style="padding: 8px; font-weight: 700; color: var(--primary);">${item.label})</td>
                                            <td style="padding: 8px;">${item.text}</td>
                                            <td style="padding: 8px; text-align: center; font-weight: 600; color: ${userChoice !== null && userChoice !== undefined ? (isSubRight ? 'var(--success)' : 'var(--danger)') : 'var(--text-muted)'};">${choiceText}</td>
                                            <td style="padding: 8px; text-align: center; font-weight: 700; color: var(--success);">${correctText}</td>
                                            <td style="padding: 8px; text-align: center;">${isSubRight ? '✅' : '❌'}</td>
                                        </tr>
                                    `;
                                }).join("")}
                            </tbody>
                        </table>
                        <div style="margin-top: 10px; font-size: 13px; color: var(--text-muted);">
                            💡 <em>Quy chế Bộ GD&ĐT: Đúng 1 ý = 0.1đ • Đúng 2 ý = 0.25đ • Đúng 3 ý = 0.5đ • Đúng 4 ý = 1.0đ.</em>
                        </div>
                    </div>
                `;
            } else if (q.type === "short_answer") {
                const normUser = uAns ? String(uAns).trim() : "";
                const isRight = status === "correct";
                answerBodyHtml = `
                    <div class="review-answer-box">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 14px;">
                            <div class="${isRight ? 'review-ans-correct' : 'review-ans-wrong'}" style="padding: 10px; border-radius: 6px; border: 1px solid;">
                                <strong>Đáp số bạn điền:</strong> <span>${normUser || '(Chưa điền đáp số)'}</span>
                            </div>
                            <div class="review-ans-correct" style="padding: 10px; border-radius: 6px; border: 1px solid;">
                                <strong>Đáp án chuẩn:</strong> <span style="font-weight: 700; font-size: 16px;">${q.correct_value}</span>
                            </div>
                        </div>
                        ${q.accepted_answers && q.accepted_answers.length > 1 ? `
                            <div style="margin-top: 8px; font-size: 12.5px; color: #64748b;">
                                Các định dạng tương đương được chấp nhận: <code>${q.accepted_answers.join(', ')}</code>
                            </div>
                        ` : ''}
                    </div>
                `;
            } else if (q.type === "drag_drop") {
                const userObj = (uAns && typeof uAns === "object") ? uAns : {};
                const blanks = q.blanks || [];
                const items = q.drag_items || [];
                const itemMap = new Map(items.map(it => [it.id, it]));

                answerBodyHtml = `
                    <div class="review-answer-box">
                        <div style="font-size: 13.5px; font-weight: 700; color: var(--primary); margin-bottom: 10px;">
                            BẢNG ĐỐI CHIẾU ĐÁP ÁN KÉO THẢ VÀO Ô TRỐNG:
                        </div>
                        <table style="width: 100%; border-collapse: collapse; font-size: 13.5px;">
                            <thead>
                                <tr style="border-bottom: 1.5px solid #cbd5e1; text-align: left; color: #475569;">
                                    <th style="padding: 6px 8px; width: 100px;">Vị trí ô</th>
                                    <th style="padding: 6px 8px;">Đáp án bạn đã đặt</th>
                                    <th style="padding: 6px 8px;">Đáp án chuẩn của đề</th>
                                    <th style="padding: 6px 8px; text-align: center; width: 80px;">Kết quả</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${blanks.map((b, bIdx) => {
                                    const userVal = userObj[b.id];
                                    const userItem = userVal ? itemMap.get(userVal) : null;
                                    const expectedItem = b.expected_item_id ? itemMap.get(b.expected_item_id) : null;
                                    const isSubRight = (userVal === b.expected_item_id) ||
                                                       (b.correct && userVal === b.correct) ||
                                                       (userItem && b.correct && (userItem.content === b.correct || userItem.text === b.correct));
                                    const labelText = b.label || `Ô số (${bIdx + 1})`;
                                    const userDisplay = userItem ? (userItem.text || userItem.content) : (userVal || '<em>— Chưa điền —</em>');
                                    const expectedDisplay = expectedItem ? (expectedItem.text || expectedItem.content) : (b.correct || '—');
                                    return `
                                        <tr style="border-bottom: 1px solid #e2e8f0;">
                                            <td style="padding: 8px; font-weight: 700; color: var(--primary);">${labelText}</td>
                                            <td style="padding: 8px; font-weight: 600; color: ${userVal ? (isSubRight ? 'var(--success)' : 'var(--danger)') : 'var(--text-muted)'};">
                                                ${userDisplay}
                                            </td>
                                            <td style="padding: 8px; font-weight: 700; color: var(--success);">
                                                ${expectedDisplay}
                                            </td>
                                            <td style="padding: 8px; text-align: center;">${isSubRight ? '✅' : '❌'}</td>
                                        </tr>
                                    `;
                                }).join("")}
                            </tbody>
                        </table>
                    </div>
                `;
            } else if (q.type === "step_solution") {
                answerBodyHtml = `
                    <div class="review-answer-box">
                        <div style="font-size: 13.5px; font-weight: 700; color: var(--primary); margin-bottom: 8px;">
                            📝 BẢN TRÌNH BÀY CỦA THÍ SINH:
                        </div>
                        <div class="review-student-note" style="border-radius: 6px; padding: 10px; font-size: 13.5px; white-space: pre-wrap; margin-bottom: 12px;">${uAns ? String(uAns).trim() : '(Không có ghi chú bài làm)'}</div>
                        <div style="font-size: 13.5px; font-weight: 700; color: var(--primary); margin-bottom: 8px;">
                            📋 BAREM CHẤM ĐIỂM TỪNG BƯỚC:
                        </div>
                        ${(q.steps || []).map(st => `
                            <div class="step-item-block" style="margin-bottom: 8px;">
                                <div class="step-header">
                                    <span>${st.title}</span>
                                    <span style="color: var(--success); font-weight: 700;">+${st.points} đ</span>
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
                            let optClass = "review-opt-card";
                            if (oIdx === q.correct_answer) {
                                optClass += " review-opt-correct";
                            } else if (oIdx === uAns && status !== "correct") {
                                optClass += " review-opt-wrong";
                            }

                            return `
                                <div class="${optClass}" style="padding: 10px 14px; border-radius: 6px; font-size: 13.5px; border: 1.5px solid;">
                                    <strong>${letters[oIdx]}.</strong> ${opt}
                                    ${oIdx === q.correct_answer ? ' <span style="color: var(--success); font-weight: 700;">(Đáp án đúng)</span>' : ''}
                                    ${oIdx === uAns && status !== "correct" ? ' <span style="color: var(--danger); font-weight: 700;">(Đáp án bạn chọn)</span>' : ''}
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
                            <span class="question-number-badge">CÂU ${qIdx + 1}</span>
                            <span style="font-size: 12.5px; color: var(--text-muted); margin-left: 8px;">${q.topic} • ${q.difficulty}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                            ${badgeHtml}
                            <button class="btn btn-sm btn-cas-verify" data-qid="${q.id}" title="Kiểm chứng bằng máy đại số CAS tất định">🔬 Kiểm chứng CAS</button>
                            <button class="btn btn-sm btn-tutor-ask" onclick="PumkinTutorIntegration.openFromQuestion('${q.id}', '${res.exam_id || 'exam'}')">🤖 Hỏi AI</button>
                            <button class="btn btn-sm btn-outline" onclick="PumkinScoring.toggleSaveQuestion('${q.id}', this)">
                                ${isSaved ? '★ Đã lưu' : '☆ Lưu câu này'}
                            </button>
                        </div>
                    </div>

                    <div style="font-size: 15px; margin-bottom: 16px; line-height: 1.65;">
                        ${q.question_text || q.question || q.content || ""}
                    </div>

                    ${answerBodyHtml}

                    <div class="explanation-card">
                        <div class="explanation-title">
                            <span>💡</span> LỜI GIẢI CHI TIẾT TỪNG BƯỚC:
                        </div>
                        <div style="line-height: 1.7; color: var(--text-main);">
                            ${q.explanation || 'Đang cập nhật lời giải chi tiết cho câu hỏi này.'}
                        </div>
                    </div>

                    <div id="cas-verification-slot-${q.id}" class="cas-verification-slot" style="display:none;"></div>

                    <div class="pumkin-card-watermark">
                        <span class="brand-dot"></span> PUMKIN.DEV • NỀN TẢNG KHẢO THÍ TOÁN HỌC CHUẨN HÓA
                    </div>
                </div>
            `;
        }).join("");

        const oldBtn = document.getElementById("review-load-more-container");
        if (oldBtn) oldBtn.remove();

        if (appendOnly) {
            const temp = document.createElement("div");
            temp.innerHTML = html;
            const nodes = Array.from(temp.children);
            nodes.forEach(node => container.appendChild(node));
            if (window.Pumkin && window.Pumkin.Math) {
                nodes.forEach(node => window.Pumkin.Math.renderElement(node));
            } else if (window.PumkinMath) {
                nodes.forEach(node => window.PumkinMath.typeset(node));
            }
        } else {
            container.innerHTML = html;
            if (window.Pumkin && window.Pumkin.Math) {
                window.Pumkin.Math.renderElement(container);
            } else if (window.PumkinMath) {
                window.PumkinMath.typeset(container);
            }
        }

        // Bind CAS Verification buttons strictly using addEventListener (NO inline onclick)
        container.querySelectorAll('.btn-cas-verify:not([data-bound])').forEach(btn => {
            btn.setAttribute('data-bound', 'true');
            btn.addEventListener('click', (e) => {
                const qid = e.currentTarget.dataset.qid;
                PumkinScoring.verifyQuestionWithCAS(qid, e.currentTarget);
            });
        });

        if (filteredIndices.length > this._reviewDisplayLimit) {
            const remaining = filteredIndices.length - this._reviewDisplayLimit;
            const loadMoreDiv = document.createElement("div");
            loadMoreDiv.id = "review-load-more-container";
            loadMoreDiv.style.textAlign = "center";
            loadMoreDiv.style.padding = "20px";
            loadMoreDiv.innerHTML = `
                <button class="btn btn-outline" style="min-width: 240px;" onclick="PumkinScoring.loadMoreReview()">
                    📥 Xem tiếp lời giải ${Math.min(10, remaining)} câu tiếp theo (còn ${remaining} câu)
                </button>
            `;
            container.appendChild(loadMoreDiv);
        }
    },

    loadMoreReview() {
        this._reviewDisplayLimit += 10;
        this.renderReviewSlice(true);
    },

    toggleSaveQuestion(qId, btnEl) {
        const added = PumkinStorage.toggleBookmark(qId);
        if (btnEl) {
            btnEl.textContent = added ? "★ Đã lưu" : "☆ Lưu câu này";
        }
    },

    /**
     * Verifies a bank question via PumkinMathAPIClient with graceful degradation
     */
    async verifyQuestionWithCAS(qid, btnEl) {
        const slot = document.getElementById(`cas-verification-slot-${qid}`);
        if (!slot) return;

        // If already rendered, toggle display
        if (slot.dataset.loaded === 'true') {
            slot.style.display = (slot.style.display === 'none') ? 'block' : 'none';
            return;
        }

        const question = (this.currentResult && this.currentResult.questions)
            ? this.currentResult.questions.find(q => q.id === qid)
            : (typeof PumkinStorage !== 'undefined' ? PumkinStorage.getQuestionById(qid) : null);

        if (!question) return;

        slot.style.display = 'block';
        slot.dataset.loaded = 'true';
        slot.innerHTML = `
            <div class="math-loading-state" style="padding: 16px; margin: 10px 0;">
                <div class="math-spinner" style="width: 24px; height: 24px; border-width: 2.5px;"></div>
                <div style="font-size: 13.5px; font-weight: 700; color: var(--primary, #1e3a8a);">Đang kiểm chứng bằng máy đại số CAS...</div>
            </div>
        `;

        if (!window.Pumkin.MathAPIClient) {
            slot.innerHTML = `<div style="font-size: 13px; color: var(--text-muted); padding: 8px;">Mô-đun kiểm chứng CAS chưa sẵn sàng.</div>`;
            return;
        }

        const payload = {
            question_id: question.id,
            question_text: question.question_text || question.question || question.content || ''
        };

        const res = await window.Pumkin.MathAPIClient.solve(payload);

        if (!res.success) {
            // Graceful Fallback to bank data
            const fallback = window.Pumkin.MathAPIClient.getFallbackBankSolution(qid);
            slot.innerHTML = `
                <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 14px; margin-top: 10px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
                        <span style="font-weight: 700; font-size: 13.5px; color: #334155;">KẾT QUẢ KIỂM CHỨNG</span>
                        <span class="pumkin-math-badge badge-unsupported" style="font-size: 12px; padding: 4px 10px;">
                            <span>ℹ️</span> <span>Chưa kiểm chứng (Ngoại tuyến)</span>
                        </span>
                    </div>
                    <p style="font-size: 13px; color: #475569; margin: 0 0 10px 0; line-height: 1.5;">
                        ${fallback.notes}
                    </p>
                    <div id="cas-retry-slot-${qid}"></div>
                </div>
            `;
            const retrySlot = slot.querySelector(`#cas-retry-slot-${qid}`);
            if (retrySlot) {
                const retryBtn = document.createElement('button');
                retryBtn.className = 'btn-math-retry';
                retryBtn.style.padding = '6px 14px';
                retryBtn.style.fontSize = '12.5px';
                retryBtn.innerHTML = '<span>🔄</span><span>Thử lại kết nối CAS</span>';
                retryBtn.addEventListener('click', () => {
                    slot.dataset.loaded = 'false';
                    this.verifyQuestionWithCAS(qid, btnEl);
                });
                retrySlot.appendChild(retryBtn);
            }
            return;
        }

        const data = res.data || {};
        const status = data.status || 'unsupported';
        let badgeClass = 'badge-unsupported';
        let badgeText = 'Chưa kiểm chứng';
        let badgeIcon = 'ℹ️';

        if (status === 'verified') {
            badgeClass = 'badge-verified';
            badgeText = 'Đã kiểm chứng bằng máy đại số';
            badgeIcon = '🛡️';
        } else if (status === 'needs_review') {
            badgeClass = 'badge-needs-review';
            badgeText = 'Cần kiểm tra lại';
            badgeIcon = '⚠️';
        }

        const restateHtml = data.restate_vi ? `
            <div class="math-restate-banner" style="margin: 8px 0; font-size: 13px; padding: 8px 12px;">
                <span class="restate-label">Hệ thống hiểu đề là:</span>
                <span class="restate-content">${data.restate_vi}</span>
            </div>
        ` : '';

        const stepsHtml = (data.steps && data.steps.length > 0) ? `
            <div style="font-size: 12.5px; font-weight: 700; color: var(--primary, #1e3a8a); margin: 8px 0 4px 0;">
                CÁC BƯỚC BIẾN ĐỔI KÝ HIỆU:
            </div>
            <div class="math-steps-list" style="gap: 6px;">
                ${data.steps.map((st, i) => `
                    <div class="math-step-item" style="padding: 8px 12px; font-size: 13px;">
                        <span style="font-weight: 700; color: var(--primary, #1e3a8a);">Bước ${i+1}: ${st.title || ''}</span>
                        <div style="margin-top: 4px;">${st.content || st.expression || ''}</div>
                    </div>
                `).join('')}
            </div>
        ` : '';

        slot.innerHTML = `
            <div style="background: #ffffff; border: 1.5px solid var(--border-color, #e2e8f0); border-radius: 8px; padding: 14px; margin-top: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
                    <span style="font-weight: 800; font-size: 13.5px; color: var(--primary, #1e3a8a);">KẾT QUẢ TÍNH TOÁN CAS</span>
                    <span class="pumkin-math-badge ${badgeClass}" style="font-size: 12px; padding: 4px 10px;">
                        <span>${badgeIcon}</span> <span>${badgeText}</span>
                    </span>
                </div>
                ${restateHtml}
                <div style="font-size: 13.5px; margin: 8px 0;">
                    <strong>Đáp số CAS:</strong> <code>${data.computed_answer || data.answer || 'N/A'}</code>
                </div>
                ${stepsHtml}
                <div style="font-size: 11px; color: var(--text-muted, #64748b); margin-top: 8px;">
                    Độ trễ: ${res.latency_ms} ms • Cache: ${res.cache_status}
                </div>
            </div>
        `;

        if (window.Pumkin && window.Pumkin.Math && typeof window.Pumkin.Math.renderElement === 'function') {
            window.Pumkin.Math.renderElement(slot);
        } else if (window.PumkinMath && typeof window.PumkinMath.typeset === 'function') {
            window.PumkinMath.typeset(slot);
        }
    }
};


    // Primary Namespace
    window.Pumkin.Scoring = PumkinScoring;

    // // DEPRECATED: Backward compatibility shim
    window.PumkinScoring = PumkinScoring;
})(window);
