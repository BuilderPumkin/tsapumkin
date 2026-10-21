/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.Telemetry
 * Layer: Privacy-Preserving Telemetry & Academic Feedback Service (W7 Layer)
 * Description: Client-side operational metrics, student feedback modal with explicit consent,
 *              complete opt-out management, and zero-PII data transmission.
 *
 * UNBREAKABLE PRIVACY INVARIANTS:
 * 1. Zero PII: Strictly NO names, emails, user IDs, or persistent identifiers.
 * 2. Ephemeral Session: Random UUID stored ONLY in sessionStorage (destroyed on tab close).
 * 3. Minimal Telemetry Payload: Only call_type, status, latency_ms, error_code, problem_topic.
 *    STRICTLY NO raw student-typed problem text in telemetry events.
 * 4. Explicit Consent for Feedback: Problem text is NULL by default; only transmitted when
 *    student explicitly checks the separate consent box.
 * 5. Complete Opt-out: When opted-out, ALL background telemetry transmission is silenced (0 requests).
 * 6. Right to Erasure: One-click button to delete all records associated with current session.
 */
(function(window) {
    'use strict';

    if (typeof window !== 'undefined') {
        window.Pumkin = window.Pumkin || {};
    }

    const OPT_OUT_STORAGE_KEY = 'pumkin_telemetry_opt_out';
    const SESSION_STORAGE_KEY = 'pumkin_ephemeral_session_id_v1';
    const DEFAULT_GATEWAY_URL = '/api';

    const PumkinTelemetry = {
        name: 'PumkinTelemetry',
        version: '1.0.0',

        // ---------------------------------------------------------------------
        // 1. EPHEMERAL SESSION & PRIVACY SETTINGS
        // ---------------------------------------------------------------------

        /**
         * Retrieves or creates an ephemeral, unlinked session ID.
         * Stored in sessionStorage only (NOT localStorage).
         * @returns {string}
         */
        getSessionId() {
            try {
                if (typeof sessionStorage !== 'undefined') {
                    let sid = sessionStorage.getItem(SESSION_STORAGE_KEY);
                    if (!sid) {
                        sid = 'sess_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36);
                        sessionStorage.setItem(SESSION_STORAGE_KEY, sid);
                    }
                    return sid;
                }
            } catch (e) {}
            return 'sess_ephemeral_' + Math.random().toString(36).substring(2, 10);
        },

        /**
         * Checks if the student has opted out of diagnostic telemetry.
         * @returns {boolean}
         */
        isOptedOut() {
            try {
                if (typeof localStorage !== 'undefined') {
                    return localStorage.getItem(OPT_OUT_STORAGE_KEY) === 'true';
                }
            } catch (e) {}
            return false;
        },

        /**
         * Updates opt-out status.
         * @param {boolean} optOut
         */
        setOptOut(optOut) {
            try {
                if (typeof localStorage !== 'undefined') {
                    if (optOut) {
                        localStorage.setItem(OPT_OUT_STORAGE_KEY, 'true');
                    } else {
                        localStorage.removeItem(OPT_OUT_STORAGE_KEY);
                    }
                }
            } catch (e) {}
        },

        // ---------------------------------------------------------------------
        // 2. MINIMAL OPERATIONAL TELEMETRY DISPATCH (ZERO PII)
        // ---------------------------------------------------------------------

        /**
         * Records operational solver/checker/generator performance event.
         * Silently bypassed if user has opted out.
         *
         * @param {Object} params
         * @param {'solve'|'check'|'generate'} params.callType
         * @param {string} params.status - 'verified'|'needs_review'|'unsupported'|'error'|'cannot_determine'
         * @param {number} params.latencyMs - Response latency in milliseconds
         * @param {string} [params.errorCode] - Machine error code
         * @param {string} [params.apiVersion='v1']
         * @param {string} [params.promptVersion]
         * @param {string} [params.problemTopic] - Coarse topic label only (e.g. 'Hình học Oxyz')
         * @returns {Promise<{ sent: boolean, reason?: string }>}
         */
        async trackCall(params = {}) {
            if (this.isOptedOut()) {
                return { sent: false, reason: 'opted_out' };
            }

            const payload = {
                session_id: this.getSessionId(),
                call_type: params.callType || 'solve',
                status: params.status || 'unknown',
                latency_ms: Math.round(Number(params.latencyMs) || 0),
                error_code: params.errorCode || null,
                api_version: params.apiVersion || 'v1',
                prompt_version: params.promptVersion || 'pumkin-math-v2.1',
                problem_topic: params.problemTopic || 'Toán học chung',
                client_version: '4.5.0'
            };

            // STRICT ZERO PII ENFORCEMENT: Never send raw problem text in telemetry
            delete payload.question;
            delete payload.student_input;
            delete payload.name;
            delete payload.email;
            delete payload.user_id;

            try {
                const endpoint = `${DEFAULT_GATEWAY_URL}/telemetry`;
                if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
                    const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
                    const sent = navigator.sendBeacon(endpoint, blob);
                    if (sent) return { sent: true };
                }

                if (typeof fetch === 'function') {
                    fetch(endpoint, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                        keepalive: true
                    }).catch(() => {}); // Fire and forget
                    return { sent: true };
                }

                return { sent: false, reason: 'no_transport' };
            } catch (err) {
                return { sent: false, reason: err.message };
            }
        },

        // ---------------------------------------------------------------------
        // 3. STUDENT FEEDBACK SUBMISSION (WITH EXPLICIT CONSENT)
        // ---------------------------------------------------------------------

        /**
         * Submits a student feedback report.
         *
         * @param {Object} params
         * @param {string} [params.questionId]
         * @param {'solve'|'check'|'generate'} [params.callType='solve']
         * @param {string} params.reasonCategory - 'WRONG_ANSWER'|'MISUNDERSTOOD_PROBLEM'|'HARD_TO_UNDERSTAND'|'FORMULA_ERROR'|'OTHER'
         * @param {string} [params.userNote]
         * @param {boolean} [params.includeProblemAgreed=false] - Explicit consent
         * @param {string} [params.problemContent] - Only included if includeProblemAgreed === true
         * @param {string} [params.currentStatus]
         * @returns {Promise<Object>}
         */
        async submitFeedback(params = {}) {
            const includeAgreed = Boolean(params.includeProblemAgreed);

            const payload = {
                session_id: this.getSessionId(),
                question_id: params.questionId || null,
                call_type: params.callType || 'solve',
                reason_category: params.reasonCategory || 'OTHER',
                user_note: params.userNote ? String(params.userNote).slice(0, 500) : null,
                include_problem_agreed: includeAgreed,
                // INVARIANT: Problem content is STRICTLY NULL if student did not explicitly check the consent box!
                problem_content: includeAgreed && params.problemContent ? String(params.problemContent).slice(0, 2000) : null,
                current_status: params.currentStatus || 'unknown'
            };

            try {
                const endpoint = `${DEFAULT_GATEWAY_URL}/feedback`;
                if (typeof fetch === 'function') {
                    const res = await fetch(endpoint, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    const data = await res.json();
                    return data;
                }
                return { success: false, error: { message_vi: 'Không thể kết nối mạng.' } };
            } catch (err) {
                return { success: false, error: { message_vi: 'Lỗi gửi phản hồi: ' + err.message } };
            }
        },

        /**
         * Submits a request to permanently delete all data for current session (Right to Erasure)
         * @returns {Promise<Object>}
         */
        async requestDataErasure() {
            const sid = this.getSessionId();
            try {
                const endpoint = `${DEFAULT_GATEWAY_URL}/feedback?action=delete_session`;
                if (typeof fetch === 'function') {
                    const res = await fetch(endpoint, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ action: 'delete_session', session_id: sid })
                    });
                    return await res.json();
                }
                return { success: false, error: { message_vi: 'Không có kết nối mạng.' } };
            } catch (err) {
                return { success: false, error: { message_vi: err.message } };
            }
        },

        // ---------------------------------------------------------------------
        // 4. ACCESSIBLE FEEDBACK MODAL DIALOG UI
        // ---------------------------------------------------------------------

        /**
         * Opens the student feedback modal dialog
         * @param {Object} options
         */
        showFeedbackModal(options = {}) {
            if (typeof document === 'undefined') return;

            const existingModal = document.getElementById('pumkin-feedback-modal-overlay');
            if (existingModal) existingModal.remove();

            const questionId = options.questionId || 'unspecified';
            const currentStatus = options.currentStatus || 'verified';
            const problemContent = options.problemContent || '';
            const callType = options.callType || 'solve';

            const overlay = document.createElement('div');
            overlay.id = 'pumkin-feedback-modal-overlay';
            overlay.setAttribute('role', 'dialog');
            overlay.setAttribute('aria-modal', 'true');
            overlay.setAttribute('aria-labelledby', 'feedback-modal-title');
            overlay.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(4px);
                display: flex; align-items: center; justify-content: center;
                z-index: 100000; padding: 16px; box-sizing: border-box;
            `;

            overlay.innerHTML = `
                <div style="background: #ffffff; border-radius: 12px; max-width: 500px; width: 100%; padding: 24px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                        <div>
                            <h3 id="feedback-modal-title" style="margin: 0; font-size: 18px; font-weight: 700; color: #0f172a;">🛠️ Báo lỗi & Góp ý lời giải</h3>
                            <p style="margin: 4px 0 0; font-size: 13px; color: #64748b;">Mã câu hỏi: <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">${questionId}</code></p>
                        </div>
                        <button type="button" id="btn-close-feedback-modal" aria-label="Đóng hộp thoại" style="background: none; border: none; font-size: 20px; cursor: pointer; color: #94a3b8; padding: 4px 8px; border-radius: 6px;">✕</button>
                    </div>

                    <form id="pumkin-feedback-form">
                        <div style="margin-bottom: 16px;">
                            <label style="display: block; font-size: 14px; font-weight: 600; margin-bottom: 8px;">Vui lòng chọn vấn đề bạn gặp phải: <span style="color: #ef4444;">*</span></label>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                <label style="display: flex; align-items: center; gap: 8px; font-size: 14px; cursor: pointer; min-height: 36px;">
                                    <input type="radio" name="feedback_reason" value="WRONG_ANSWER" checked>
                                    <span><strong>Đáp án sai</strong> (kết quả cuối cùng bị sai)</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; font-size: 14px; cursor: pointer; min-height: 36px;">
                                    <input type="radio" name="feedback_reason" value="MISUNDERSTOOD_PROBLEM">
                                    <span><strong>Hệ thống hiểu sai đề</strong> (restate không đúng ý bài)</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; font-size: 14px; cursor: pointer; min-height: 36px;">
                                    <input type="radio" name="feedback_reason" value="HARD_TO_UNDERSTAND">
                                    <span><strong>Lời giải khó hiểu</strong> (các bước biến đổi nhảy cóc)</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; font-size: 14px; cursor: pointer; min-height: 36px;">
                                    <input type="radio" name="feedback_reason" value="FORMULA_ERROR">
                                    <span><strong>Công thức toán bị lỗi</strong> (ký hiệu hoặc hình vẽ không hiện)</span>
                                </label>
                                <label style="display: flex; align-items: center; gap: 8px; font-size: 14px; cursor: pointer; min-height: 36px;">
                                    <input type="radio" name="feedback_reason" value="OTHER">
                                    <span><strong>Lý do khác</strong></span>
                                </label>
                            </div>
                        </div>

                        <div style="margin-bottom: 16px;">
                            <label for="feedback-user-note" style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px;">Chi tiết góp ý (không bắt buộc):</label>
                            <textarea id="feedback-user-note" rows="3" maxlength="500" placeholder="Ví dụ: Ở bước 2, tại sao mẫu số lại chia cho 2?..." style="width: 100%; border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px 12px; font-size: 13px; font-family: inherit; box-sizing: border-box; resize: vertical;"></textarea>
                        </div>

                        <!-- EXPLICIT SEPARATE CONSENT CHECKBOX -->
                        <div style="margin-bottom: 18px; padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                            <label style="display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: #334155; cursor: pointer;">
                                <input type="checkbox" id="feedback-include-problem" style="margin-top: 3px;">
                                <span><strong>Đồng ý gửi kèm nội dung đề bài này</strong> để giúp thầy cô đối chiếu và sửa lời giải. <br><small style="color: #64748b;">(Mặc định không gửi đề để bảo vệ quyền riêng tư)</small></span>
                            </label>
                        </div>

                        <!-- PRIVACY NOTICE SUMMARY -->
                        <div style="margin-bottom: 20px; font-size: 12px; color: #64748b; line-height: 1.5; background: #f0fdf4; border-left: 3px solid #22c55e; padding: 8px 12px; border-radius: 4px;">
                            🛡️ <strong>Bảo mật thông tin:</strong> Hệ thống tuyệt đối không lưu tên, email hay địa chỉ IP của bạn. Báo cáo này chỉ lưu trong 90 ngày rồi tự động hủy vĩnh viễn.
                            <a href="javascript:void(0)" id="link-open-privacy-modal" style="color: #0284c7; text-decoration: underline; margin-left: 4px;">Xem chính sách bảo vệ</a>
                        </div>

                        <div style="display: flex; justify-content: flex-end; gap: 12px; flex-wrap: wrap;">
                            <button type="button" id="btn-cancel-feedback" style="min-height: 44px; padding: 0 18px; border: 1px solid #cbd5e1; background: #ffffff; border-radius: 8px; font-size: 14px; font-weight: 500; color: #475569; cursor: pointer;">Hủy</button>
                            <button type="submit" id="btn-submit-feedback" style="min-height: 44px; padding: 0 20px; border: none; background: #2563eb; border-radius: 8px; font-size: 14px; font-weight: 600; color: #ffffff; cursor: pointer;">Gửi báo cáo</button>
                        </div>
                    </form>
                </div>
            `;

            document.body.appendChild(overlay);

            // Focus management & close handlers
            const closeBtn = document.getElementById('btn-close-feedback-modal');
            const cancelBtn = document.getElementById('btn-cancel-feedback');
            const form = document.getElementById('pumkin-feedback-form');
            const privacyLink = document.getElementById('link-open-privacy-modal');

            const closeModal = () => overlay.remove();

            closeBtn.addEventListener('click', closeModal);
            cancelBtn.addEventListener('click', closeModal);
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closeModal();
            });
            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', escHandler);
                }
            });

            if (privacyLink) {
                privacyLink.addEventListener('click', () => {
                    closeModal();
                    PumkinTelemetry.showPrivacyModal();
                });
            }

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const submitBtn = document.getElementById('btn-submit-feedback');
                submitBtn.disabled = true;
                submitBtn.innerText = 'Đang gửi...';

                const selectedReason = form.querySelector('input[name="feedback_reason"]:checked')?.value || 'OTHER';
                const note = document.getElementById('feedback-user-note')?.value || '';
                const includeAgreed = document.getElementById('feedback-include-problem')?.checked === true;

                const res = await PumkinTelemetry.submitFeedback({
                    questionId: questionId,
                    callType: callType,
                    reasonCategory: selectedReason,
                    userNote: note,
                    includeProblemAgreed: includeAgreed,
                    problemContent: includeAgreed ? problemContent : null,
                    currentStatus: currentStatus
                });

                closeModal();

                if (res && res.success) {
                    if (typeof window.PumkinToast !== 'undefined') {
                        window.PumkinToast.success('Cảm ơn bạn! Báo cáo đã được ghi nhận.');
                    } else {
                        alert('Cảm ơn bạn! Báo cáo đã được ghi nhận để thầy cô đối chiếu.');
                    }
                } else {
                    if (typeof window.PumkinToast !== 'undefined') {
                        window.PumkinToast.error(res?.error?.message_vi || 'Không thể gửi báo cáo lúc này.');
                    } else {
                        alert('Không thể gửi báo cáo lúc này. Vui lòng thử lại sau.');
                    }
                }
            });
        },

        /**
         * Opens the student privacy settings and opt-out dialog
         */
        showPrivacyModal() {
            if (typeof document === 'undefined') return;

            const existing = document.getElementById('pumkin-privacy-modal-overlay');
            if (existing) existing.remove();

            const isCurrentlyOptedOut = this.isOptedOut();
            const sid = this.getSessionId();

            const overlay = document.createElement('div');
            overlay.id = 'pumkin-privacy-modal-overlay';
            overlay.setAttribute('role', 'dialog');
            overlay.setAttribute('aria-modal', 'true');
            overlay.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(4px);
                display: flex; align-items: center; justify-content: center;
                z-index: 100001; padding: 16px; box-sizing: border-box;
            `;

            overlay.innerHTML = `
                <div style="background: #ffffff; border-radius: 12px; max-width: 520px; width: 100%; padding: 24px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                        <h3 style="margin: 0; font-size: 18px; font-weight: 700; color: #0f172a;">🛡️ Quyền riêng tư & Bảo vệ Dữ liệu</h3>
                        <button type="button" id="btn-close-privacy-modal" aria-label="Đóng" style="background: none; border: none; font-size: 20px; cursor: pointer; color: #94a3b8; padding: 4px 8px;">✕</button>
                    </div>

                    <p style="font-size: 13px; color: #475569; line-height: 1.6; margin-top: 0;">
                        Tại <strong>PUMKIN.DEV</strong>, chúng mình tôn trọng tối đa quyền riêng tư của học sinh. Hệ thống được thiết kế theo chuẩn bảo mật tối thiểu:
                    </p>

                    <ul style="font-size: 13px; color: #475569; line-height: 1.6; padding-left: 20px; margin: 10px 0;">
                        <li><strong>Không thu thập:</strong> Họ tên, email, tài khoản mạng xã hội hay địa chỉ IP.</li>
                        <li><strong>Dữ liệu chẩn đoán:</strong> Chỉ gồm thời gian giải, mã trạng thái và mã dạng bài để sửa lỗi toán học.</li>
                        <li><strong>Thời hạn lưu trữ:</strong> Dữ liệu tự động tiêu hủy sau đúng <strong>90 ngày</strong>.</li>
                    </ul>

                    <div style="margin: 18px 0; padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                        <label style="display: flex; align-items: center; justify-content: space-between; gap: 12px; cursor: pointer;">
                            <div>
                                <span style="font-size: 14px; font-weight: 600; color: #0f172a;">Tắt gửi dữ liệu chẩn đoán (Opt-out)</span>
                                <div style="font-size: 12px; color: #64748b; margin-top: 2px;">Khi bật, thiết bị của bạn sẽ không gửi bất kỳ thông số kỹ thuật nào về máy chủ.</div>
                            </div>
                            <input type="checkbox" id="privacy-toggle-opt-out" ${isCurrentlyOptedOut ? 'checked' : ''} style="width: 20px; height: 20px; accent-color: #2563eb; cursor: pointer;">
                        </label>
                    </div>

                    <div style="margin-bottom: 20px; padding: 12px; background: #fff1f2; border: 1px solid #fecdd3; border-radius: 8px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                            <div>
                                <span style="font-size: 13px; font-weight: 600; color: #9f1239;">Quyền yêu cầu xóa dữ liệu</span>
                                <div style="font-size: 12px; color: #be123c;">Mã phiên tạm: <code>${sid}</code></div>
                            </div>
                            <button type="button" id="btn-request-erasure" style="min-height: 38px; padding: 0 14px; background: #e11d48; color: #fff; border: none; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;">Xóa dữ liệu phiên này</button>
                        </div>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                        <span style="font-size: 12px; color: #94a3b8;">Tuân thủ Nghị định 13/2023/NĐ-CP & Luật Trẻ em 2016</span>
                        <button type="button" id="btn-confirm-privacy" style="min-height: 44px; padding: 0 20px; background: #0f172a; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer;">Đã hiểu</button>
                    </div>
                </div>
            `;

            document.body.appendChild(overlay);

            const closeBtn = document.getElementById('btn-close-privacy-modal');
            const confirmBtn = document.getElementById('btn-confirm-privacy');
            const toggle = document.getElementById('privacy-toggle-opt-out');
            const erasureBtn = document.getElementById('btn-request-erasure');

            const closeModal = () => overlay.remove();

            closeBtn.addEventListener('click', closeModal);
            confirmBtn.addEventListener('click', closeModal);
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closeModal();
            });

            toggle.addEventListener('change', (e) => {
                PumkinTelemetry.setOptOut(e.target.checked);
                if (typeof window.PumkinToast !== 'undefined') {
                    if (e.target.checked) {
                        window.PumkinToast.info('Đã tắt gửi dữ liệu chẩn đoán (Opt-out thành công).');
                    } else {
                        window.PumkinToast.success('Đã kích hoạt gửi dữ liệu chẩn đoán ẩn danh.');
                    }
                }
            });

            erasureBtn.addEventListener('click', async () => {
                erasureBtn.disabled = true;
                erasureBtn.innerText = 'Đang xóa...';
                const delRes = await PumkinTelemetry.requestDataErasure();
                if (delRes && delRes.success) {
                    if (typeof window.PumkinToast !== 'undefined') {
                        window.PumkinToast.success('Dữ liệu của phiên đã được xóa sạch hoàn toàn.');
                    } else {
                        alert('Dữ liệu của phiên đã được xóa sạch hoàn toàn.');
                    }
                    erasureBtn.innerText = 'Đã xóa xong';
                } else {
                    erasureBtn.disabled = false;
                    erasureBtn.innerText = 'Thử lại';
                }
            });
        }
    };

    // Export to global namespace
    if (typeof window !== 'undefined') {
        window.Pumkin = window.Pumkin || {};
        window.Pumkin.Telemetry = PumkinTelemetry;
        window.PumkinTelemetry = PumkinTelemetry;
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = PumkinTelemetry;
    }

})(typeof window !== 'undefined' ? window : this);
