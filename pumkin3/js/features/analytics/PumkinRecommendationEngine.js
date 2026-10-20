/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.RecommendationEngine
 * Layer: Adaptive Learning & Recommendation
 * Description: Provider Interfaces & Rule-Based Deterministic Recommendation Engine
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

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

        let targetTopic = "Giải tích";
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
                ? `💡 Khởi đầu lộ trình học tập với chuyên đề nền tảng: <strong>${targetArticle ? targetArticle.title : targetTopic}</strong>.`
                : `🎯 Phát hiện chuyên đề cần tối ưu hóa điểm số: <strong>${targetArticle ? targetArticle.title : targetTopic}</strong> (Lỗ hổng: ${profile.weaknesses[0] ? profile.weaknesses[0].accuracy : 50}%).`,
            steps: [
                {
                    badge: "1",
                    title: `Đọc lại lý thuyết & Công thức then chốt: ${targetArticle ? targetArticle.title : targetTopic}`,
                    desc: `Nắm vững định nghĩa, điều kiện áp dụng và các bẫy thường gặp.`,
                    actionText: "📖 Mở chuyên đề lý thuyết",
                    action: `PumkinKnowledge.openArticle('${targetArticle ? targetArticle.id : 'kb_toan12_01'}')`
                },
                {
                    badge: "2",
                    title: `Luyện 5 câu hỏi trọng tâm chuyên đề (${drillQuestions.length} câu)`,
                    desc: `Củng cố phản xạ giải toán thực chiến qua các câu hỏi trích từ ngân hàng đề chuẩn hóa.`,
                    actionText: "⚡ Bắt đầu luyện 5 câu",
                    action: `PumkinKnowledge.startDrillForArticle('${targetArticle ? targetArticle.id : 'kb_toan12_01'}')`
                },
                {
                    badge: "3",
                    title: `Thi thử một đề kiểm định toàn diện (TSA / HSA)`,
                    desc: `Đo lường sự tiến bộ sau khi đã củng cố chuyên đề yếu.`,
                    actionText: "📝 Đến kho đề thi",
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
                <div class="learning-path-step" style="display: flex; gap: 14px; margin-bottom: 14px;">
                    <div class="learning-step-badge" style="width: 28px; height: 28px; border-radius: 50%; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">${step.badge}</div>
                    <div class="learning-step-content" style="flex: 1;">
                        <div class="learning-step-title" style="font-weight: 700; font-size: 14px; margin-bottom: 4px;">${step.title}</div>
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

    // Primary Namespace
    window.Pumkin.RecommendationEngine = PumkinRecommendationEngine;

    // // DEPRECATED: Backward compatibility shims
    window.PumkinRecommendationEngine = PumkinRecommendationEngine;
    window.RecommendationProvider = RecommendationProvider;
    window.AssessmentProvider = AssessmentProvider;
    window.ExplanationProvider = ExplanationProvider;
    window.QuestionGenerationProvider = QuestionGenerationProvider;
    window.DeterministicRuleProvider = DeterministicRuleProvider;
})(window);
