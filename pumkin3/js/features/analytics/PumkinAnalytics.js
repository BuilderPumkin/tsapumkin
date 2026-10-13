/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.Analytics & Pumkin.Dashboard
 * Layer: Analytics & Visual Telemetry
 * Description: Performance Metrics, Topic Mastery Aggregation & Analytics Dashboard
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

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
                syncBadge.textContent = `👤 ${user.username} (Đã đồng bộ)`;
                syncBadge.style.borderColor = "var(--success)";
                syncBadge.style.color = "var(--success)";
            } else {
                syncBadge.textContent = "Khách (Chưa đăng nhập)";
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

        // Render 3-Step Journey Hero Card (1-CTA Focus)
        const journeyMgr = (typeof window !== 'undefined' && window.Pumkin && window.Pumkin.JourneyManager)
            ? window.Pumkin.JourneyManager
            : (typeof PumkinJourneyManager !== 'undefined' ? PumkinJourneyManager : null);
        if (journeyMgr && typeof journeyMgr.renderDashboardHero === "function") {
            journeyMgr.renderDashboardHero();
        }

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
                summary.innerHTML = `💡 Chưa có dữ liệu bài thi. Hệ thống đề xuất lộ trình khởi động với chuyên đề cốt lõi: <strong>${targetArticle ? targetArticle.title : 'Giải tích'}</strong>.`;
            } else {
                summary.innerHTML = `🎯 Dựa trên kết quả gần đây, hệ thống phát hiện chuyên đề cần tối ưu hóa điểm số: <strong>${targetArticle ? targetArticle.title : 'Chuyên đề trọng tâm'}</strong>.`;
            }
        }

        container.innerHTML = `
            <div class="learning-path-step">
                <div class="learning-step-badge">1</div>
                <div class="learning-step-content">
                    <div class="learning-step-title">Ôn lại lý thuyết cốt lõi & Phương pháp</div>
                    <div class="learning-step-desc">Đọc lại định lý, điều kiện áp dụng và các bẫy thường gặp của chuyên đề <strong>${targetArticle ? targetArticle.title : ''}</strong>.</div>
                    <button class="btn btn-sm btn-outline" style="margin-top: 8px;" onclick="PumkinKnowledge.openArticle('${targetArticle ? targetArticle.id : 'kb_toan12_01'}')">
                        📖 Mở chuyên đề lý thuyết
                    </button>
                </div>
            </div>

            <div class="learning-path-step">
                <div class="learning-step-badge">2</div>
                <div class="learning-step-content">
                    <div class="learning-step-title">Nắm chắc sổ tay công thức then chốt</div>
                    <div class="learning-step-desc">Ghi nhớ ${(targetArticle && targetArticle.formulas) ? targetArticle.formulas.length : 3} công thức then chốt và điều kiện biên.</div>
                    <button class="btn btn-sm btn-outline" style="margin-top: 8px;" onclick="PumkinRouter.navigate('formulas')">
                        📐 Mở sổ tay công thức
                    </button>
                </div>
            </div>

            <div class="learning-path-step">
                <div class="learning-step-badge">3</div>
                <div class="learning-step-content">
                    <div class="learning-step-title">Luyện tập mục tiêu (5 câu trắc nghiệm chuyên đề)</div>
                    <div class="learning-step-desc">Thực hành ngay 5 câu hỏi có phân hóa từ dễ đến khó để củng cố phản xạ.</div>
                    <button class="btn btn-sm btn-primary" style="margin-top: 8px;" onclick="PumkinKnowledge.startDrillForArticle('${targetArticle ? targetArticle.id : 'kb_toan12_01'}')">
                        ⚡ Bắt đầu 5 câu Drill
                    </button>
                </div>
            </div>

            <div class="learning-path-step">
                <div class="learning-step-badge">4</div>
                <div class="learning-step-content">
                    <div class="learning-step-title">Thi thử đề chuẩn hóa (TSA / HSA)</div>
                    <div class="learning-step-desc">Đo lường sự tiến bộ bằng một đề thi hoàn chỉnh có tính thời gian thực.</div>
                    <button class="btn btn-sm btn-success" style="margin-top: 8px;" onclick="PumkinRouter.navigate('library')">
                        📚 Chọn đề thi thử ngay
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
                    Chưa có bài thi nào được ghi nhận. Hãy làm một đề thi để xem thống kê!
                </p>
            `;
            return;
        }

        tableContainer.innerHTML = `
            <div class="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>Thời gian</th>
                        <th>Đề thi</th>
                        <th>Điểm số</th>
                        <th>Chính xác</th>
                        <th>Thời gian làm</th>
                        <th>Thao tác</th>
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
                                    Xem lại kết quả
                                </button>
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
            </div>
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

    // Primary Namespace
    window.Pumkin.Analytics = PumkinAnalytics;
    window.Pumkin.Dashboard = PumkinDashboard;

    // // DEPRECATED: Backward compatibility shims
    window.PumkinAnalytics = PumkinAnalytics;
    window.PumkinDashboard = PumkinDashboard;
})(window);
