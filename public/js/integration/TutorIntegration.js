/**
 * PUMKIN TUTOR INTEGRATION LAYER
 * Bridges the gap between the UI, the PUMKIN Core, and the AI Backend.
 */

const PumkinTutorIntegration = (function() {
    
    let currentContext = null;
    let sessionId = "local_session";

    /**
     * Entry Point: Open Tutor from a Question View, Exam, or Module
     */
    function openFromQuestion(questionId, examId) {
        if (typeof TutorContextBuilder === 'undefined') {
            console.error("[TUTOR_ERROR] TutorContextBuilder is missing!");
            return;
        }

        const effectiveQId = questionId || "general";
        const currentUserId = (typeof PumkinAuth !== 'undefined' && PumkinAuth.currentUser) 
            ? PumkinAuth.currentUser.id 
            : "guest_student";

        sessionId = "session_" + currentUserId;

        // Build canonical context payload
        currentContext = TutorContextBuilder.buildContext({
            userId: currentUserId,
            sessionId: sessionId,
            examId: examId || "practice",
            questionId: effectiveQId
        });

        // Initialize and open UI
        PumkinTutorUI.init();

        const titleText = (effectiveQId === "general") 
            ? "Trợ giảng Toán học" 
            : `Câu hỏi: ${effectiveQId}`;
            
        const tagText = (currentContext.question && currentContext.question.topic && currentContext.question.topic !== "Unknown") 
            ? currentContext.question.topic 
            : (examId ? examId.toUpperCase() : "Toán học");

        PumkinTutorUI.open({
            title: titleText,
            tag: tagText
        });

        // Bind the UI message sender to our backend integration
        PumkinTutorUI.onSendMessage(handleUserMessage);
    }

    /**
     * Helper: Open Tutor from the currently active question in the Exam Player
     */
    function openFromCurrentExam() {
        let qId = "general";
        let examId = "exam";
        if (typeof PumkinPlayer !== "undefined" && PumkinPlayer.questions && PumkinPlayer.questions[PumkinPlayer.currentIndex]) {
            qId = PumkinPlayer.questions[PumkinPlayer.currentIndex].id;
            if (PumkinPlayer.examData) examId = PumkinPlayer.examData.id;
        }
        openFromQuestion(qId, examId);
    }

    // In-memory response cache: `${qId}_${normalizedMsg}` -> responseText
    const _aiResponseCache = new Map();

    let _cachedDiscoveredGeminiModel = null;

    /**
     * Dynamically queries Google Gemini API to discover supported models for this specific API key,
     * permanently avoiding 404 errors from deprecated model versions.
     */
    /**
     * Handles sending the message to the backend server (http://localhost:3001)
     */
    async function handleUserMessage(message) {
        PumkinTutorUI.addMessage('user', message);

        const qId = currentContext?.question?.id || "general";
        const cacheKey = `${qId}_${message.trim().toLowerCase()}`;

        // Return from cache instantly if previously answered
        if (_aiResponseCache.has(cacheKey)) {
            const cachedReply = _aiResponseCache.get(cacheKey);
            PumkinTutorUI.addMessage('ai', cachedReply);
            return;
        }

        PumkinTutorUI.showLoading();

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout

        try {
            const apiEndpoint = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:3001/api/tutor/message' : '/api/tutor/message';
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                signal: controller.signal,
                body: JSON.stringify({
                    session_id: sessionId,
                    context: currentContext,
                    message: message
                })
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.error || `Máy chủ AI phản hồi lỗi: HTTP ${response.status}`);
            }

            const data = await response.json();
            const tutorResponse = data.response;

            if (!tutorResponse || !tutorResponse.message) {
                throw new Error("Phản hồi từ AI không đúng định dạng quy định.");
            }

            // Cache response for instant future recall
            _aiResponseCache.set(cacheKey, tutorResponse.message);

            // Render AI Response
            PumkinTutorUI.addMessage('ai', tutorResponse.message);

            // Save Structured Learning Signals
            saveLearningSignals(tutorResponse);

        } catch (error) {
            clearTimeout(timeoutId);
            console.warn("[TUTOR_INTEGRATION_ERROR]", error);
            let detailMsg = error.message;
            if (error.name === "AbortError") {
                detailMsg = "Yêu cầu đến máy chủ AI đã quá thời gian chờ (25s). Vui lòng thử lại sau.";
            } else if (error.message && (error.message.includes("fetch") || error.message.includes("Failed to fetch"))) {
                detailMsg = "⚠️ Không thể kết nối tới Backend Server (http://localhost:3001).\n\n" +
                    "👉 HƯỚNG DẪN KHỞI ĐỘNG:\n" +
                    "1. Mở PowerShell / Command Prompt tại thư mục dự án.\n" +
                    "2. Chạy lệnh: node backend/server.js\n" +
                    "3. Đảm bảo bạn đã điền GEMINI_API_KEY trong file 'backend/.env'.";
            }
            PumkinTutorUI.addMessage('error', detailMsg);
        }
    }

    /**
     * Saves valuable structured signals to the Learning Trace
     */
    function saveLearningSignals(tutorResponse) {
        if (typeof PumkinLearningTrace === 'undefined' || !currentContext || !currentContext.question) return;

        const traceEvent = {
            questionId: currentContext.question.id,
            timestamp: new Date().toISOString(),
            signal_type: "tutor_interaction",
            details: {}
        };

        if (tutorResponse.response_type === "hint") {
            traceEvent.details.requested_hint_level = tutorResponse.hint_level;
        } else if (tutorResponse.response_type === "correction") {
            traceEvent.details.made_error = tutorResponse.detected_issue;
        } else if (tutorResponse.response_type === "solution") {
            traceEvent.details.solution_revealed = true;
        }

        if (Object.keys(traceEvent.details).length > 0) {
            PumkinLearningTrace.logEvent(traceEvent);
        }
    }

    return {
        openFromQuestion,
        openFromCurrentExam
    };
})();

// Attach to global window object
if (typeof window !== 'undefined') {
    window.PumkinTutorIntegration = PumkinTutorIntegration;
}
