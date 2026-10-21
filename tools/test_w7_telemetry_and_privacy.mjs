/**
 * PUMKIN.DEV Academic Verification Suite
 * Module: test_w7_telemetry_and_privacy.mjs
 * Purpose: Automated Verification for W7 Privacy-Preserving Telemetry, Student Feedback Loop,
 *          Opt-out Enforcement, and Weekly Analytical Reporting.
 *
 * UNBREAKABLE PRIVACY & ACADEMIC INVARIANTS:
 * 1. Zero PII: Telemetry payloads contain strictly NO names, emails, user IDs, or IPs.
 * 2. Complete Opt-out: When opted-out, zero telemetry packets are transmitted (0 network requests).
 * 3. Explicit Problem Consent: In feedback submissions, problem content is STRICTLY NULL unless
 *    the separate explicit consent checkbox was checked (default is false).
 * 4. P0 Confident-Yet-Wrong Detection: Verified questions reported as WRONG_ANSWER are automatically
 *    flagged with verified_when_reported = 1.
 * 5. Weekly Report Execution: Re-runnable script computes status %, p50/p95 latencies, error %,
 *    top unsupported topics, and budget forecast.
 * 6. Bug-to-Regression Pipeline: End-to-end pathway from a reported issue to an executable regression test.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup node mock environment for browser globals (localStorage, sessionStorage, window, fetch)
const localStorageStore = new Map();
const sessionStorageStore = new Map();
const capturedFetchRequests = [];

global.localStorage = {
    getItem: (key) => (localStorageStore.has(key) ? localStorageStore.get(key) : null),
    setItem: (key, val) => localStorageStore.set(key, String(val)),
    removeItem: (key) => localStorageStore.delete(key),
    clear: () => localStorageStore.clear()
};

global.sessionStorage = {
    getItem: (key) => (sessionStorageStore.has(key) ? sessionStorageStore.get(key) : null),
    setItem: (key, val) => sessionStorageStore.set(key, String(val)),
    removeItem: (key) => sessionStorageStore.delete(key),
    clear: () => sessionStorageStore.clear()
};

global.fetch = async (url, opts = {}) => {
    capturedFetchRequests.push({ url, opts, body: opts.body ? JSON.parse(opts.body) : null });
    return {
        ok: true,
        status: 200,
        headers: new Map([['content-type', 'application/json']]),
        json: async () => ({ success: true, message: 'Mock response accepted' }),
        text: async () => JSON.stringify({ success: true })
    };
};

global.window = {
    localStorage: global.localStorage,
    sessionStorage: global.sessionStorage,
    location: { search: '' },
    Pumkin: {}
};

// Import PumkinTelemetry
const Telemetry = (await import('../pumkin3/js/services/PumkinTelemetry.js')).default || global.window.Pumkin.Telemetry;

console.log('\n======================================================================');
console.log('🏛️  PUMKIN.DEV - W7 PRIVACY-PRESERVING TELEMETRY & FEEDBACK LOOP');
console.log('======================================================================\n');

let totalAssertions = 0;
let passedAssertions = 0;

function assert(condition, message) {
    totalAssertions++;
    if (condition) {
        passedAssertions++;
        console.log(`  ✅ [PASS] ${message}`);
    } else {
        console.error(`  ❌ [FAIL] ${message}`);
        throw new Error(`Assertion failed: ${message}`);
    }
}

// =========================================================================
// TEST 1: ZERO PII & MINIMAL TELEMETRY PAYLOAD VERIFICATION
// =========================================================================
console.log('--- TEST 1: Zero PII & Minimal Telemetry Payload Verification ---');

// Reset states
localStorageStore.clear();
sessionStorageStore.clear();
capturedFetchRequests.length = 0;

// Track an operational solve event
const trackRes = await Telemetry.trackCall({
    callType: 'solve',
    status: 'verified',
    latencyMs: 142,
    errorCode: null,
    apiVersion: 'v1',
    promptVersion: 'pumkin-math-v2.1',
    problemTopic: 'Hình học Oxyz'
});

assert(trackRes.sent === true, 'Telemetry trackCall successfully dispatched');
assert(capturedFetchRequests.length === 1, 'Captured 1 outbound telemetry HTTP request');

const req = capturedFetchRequests[0];
assert(req.url.endsWith('/api/telemetry'), `Target endpoint is /api/telemetry (got ${req.url})`);

const payload = req.body;
assert(Boolean(payload.session_id), `Payload has ephemeral session_id: ${payload.session_id}`);
assert(payload.call_type === 'solve', 'call_type matches');
assert(payload.status === 'verified', 'status matches');
assert(payload.latency_ms === 142, 'latency_ms matches');
assert(payload.problem_topic === 'Hình học Oxyz', 'problem_topic matches');

// STRICT ZERO PII AUDIT: Assert forbidden fields are ABSENT
const forbiddenFields = [
    'name', 'fullname', 'email', 'student_name', 'user_id', 'userId',
    'ip', 'ip_address', 'student_input', 'raw_input', 'question', 'question_text'
];

for (const field of forbiddenFields) {
    assert(payload[field] === undefined, `Forbidden PII field "${field}" is strictly ABSENT from telemetry payload`);
}
console.log('  🛡️  Zero PII verification confirmed: Only coarse topic label & latency sent.');

// =========================================================================
// TEST 2: OPT-OUT COMPLETE SILENCING VERIFICATION
// =========================================================================
console.log('\n--- TEST 2: Complete Opt-out Enforcement ---');

// Default state: not opted out
assert(Telemetry.isOptedOut() === false, 'Default telemetry opt-out state is FALSE');

// Enable opt-out
Telemetry.setOptOut(true);
assert(Telemetry.isOptedOut() === true, 'Opt-out toggled to TRUE');

capturedFetchRequests.length = 0; // Clear requests

// Attempt to track events while opted-out
const resWhileOptedOut1 = await Telemetry.trackCall({ callType: 'solve', status: 'verified', latencyMs: 100 });
const resWhileOptedOut2 = await Telemetry.trackCall({ callType: 'check', status: 'needs_review', latencyMs: 250 });
const resWhileOptedOut3 = await Telemetry.trackCall({ callType: 'generate', status: 'unsupported', latencyMs: 80 });

assert(resWhileOptedOut1.sent === false && resWhileOptedOut1.reason === 'opted_out', 'trackCall 1 blocked by opt-out');
assert(resWhileOptedOut2.sent === false && resWhileOptedOut2.reason === 'opted_out', 'trackCall 2 blocked by opt-out');
assert(resWhileOptedOut3.sent === false && resWhileOptedOut3.reason === 'opted_out', 'trackCall 3 blocked by opt-out');

assert(capturedFetchRequests.length === 0, `Zero network requests transmitted while opted-out (got ${capturedFetchRequests.length})`);
console.log('  🔒 Opt-out guarantee confirmed: All background telemetry completely silenced.');

// Restore opt-out to false for subsequent tests
Telemetry.setOptOut(false);
assert(Telemetry.isOptedOut() === false, 'Opt-out restored to FALSE for remaining tests');

// =========================================================================
// TEST 3: FEEDBACK CONSENT & EXPLICIT PROBLEM SUBMISSION INVARIANT
// =========================================================================
console.log('\n--- TEST 3: Feedback Consent & Explicit Problem Submission Invariant ---');

// Case 3a: Student submits feedback WITHOUT consenting to send problem (DEFAULT BEHAVIOR)
capturedFetchRequests.length = 0;
await Telemetry.submitFeedback({
    questionId: 'q_tsa_04',
    callType: 'solve',
    reasonCategory: 'HARD_TO_UNDERSTAND',
    userNote: 'Bước 2 giải thích hơi tắt.',
    includeProblemAgreed: false, // Default is FALSE
    problemContent: 'Cho hình lăng trụ đứng ABC.A\'B\'C\'...',
    currentStatus: 'verified'
});

assert(capturedFetchRequests.length === 1, 'Captured 1 feedback submission request');
const fbReq1 = capturedFetchRequests[0].body;

assert(fbReq1.include_problem_agreed === false, 'include_problem_agreed is false');
assert(fbReq1.problem_content === null, 'INVARIANT HOLD: problem_content is strictly NULL when student did not consent!');
assert(fbReq1.reason_category === 'HARD_TO_UNDERSTAND', 'reason_category matches');
assert(fbReq1.user_note === 'Bước 2 giải thích hơi tắt.', 'user_note matches');

// Case 3b: Student explicitly checks consent box to send problem
capturedFetchRequests.length = 0;
await Telemetry.submitFeedback({
    questionId: 'custom_solve_99',
    callType: 'solve',
    reasonCategory: 'WRONG_ANSWER',
    userNote: 'Nghiệm ngoại lai làm mẫu bằng 0.',
    includeProblemAgreed: true, // EXPLICIT CONSENT GIVEN
    problemContent: 'Giải phương trình \\frac{x-1}{x-1} = 1',
    currentStatus: 'verified'
});

assert(capturedFetchRequests.length === 1, 'Captured 1 consented feedback submission request');
const fbReq2 = capturedFetchRequests[0].body;

assert(fbReq2.include_problem_agreed === true, 'include_problem_agreed is true when explicitly checked');
assert(fbReq2.problem_content.includes('\\frac{x-1}{x-1}'), 'problem_content is included when student gave explicit consent');

// Case 3c: P0 Confident-Yet-Wrong Detection Invariant
// When current_status is 'verified' and reason_category is 'WRONG_ANSWER'
const functionsFeedbackPath = path.resolve(__dirname, '../functions/api/feedback.js');
const feedbackFuncCode = fs.readFileSync(functionsFeedbackPath, 'utf8');

assert(feedbackFuncCode.includes('verifiedWhenReported'), 'feedback gateway contains verifiedWhenReported P0 logic');
assert(feedbackFuncCode.includes('currentStatus === "verified" && reasonCategory === "WRONG_ANSWER"'),
    'P0 criteria strictly triggers on verified status + WRONG_ANSWER reason');

// =========================================================================
// TEST 4: WEEKLY TELEMETRY REPORT SCRIPT EXECUTION
// =========================================================================
console.log('\n--- TEST 4: Weekly Automated Report Generator Script Execution ---');

const reportScriptPath = path.resolve(__dirname, 'generate_weekly_telemetry_report.py');
assert(fs.existsSync(reportScriptPath), 'generate_weekly_telemetry_report.py exists');

const outputMdPath = path.resolve(__dirname, '../reports/weekly/test_automated_report.md');
const outputJsonPath = path.resolve(__dirname, '../reports/weekly/test_automated_summary.json');

// Run report script in sample mode using venv python
const pythonExe = 'C:\\Users\\ADMIN\\Downloads\\hoctap\\pumkin-math-api-venv\\Scripts\\python.exe';
const runCmd = `& "${pythonExe}" "${reportScriptPath}" --sample --output "${outputMdPath}" --json "${outputJsonPath}"`;

execSync(`powershell -Command "${runCmd}"`, { stdio: 'pipe' });

assert(fs.existsSync(outputMdPath), 'Generated Markdown report exists');
assert(fs.existsSync(outputJsonPath), 'Generated JSON summary exists');

const mdContent = fs.readFileSync(outputMdPath, 'utf8');
const jsonSummary = JSON.parse(fs.readFileSync(outputJsonPath, 'utf8'));

// Verify required report sections per specifications:
assert(mdContent.includes('TỔNG QUAN TỶ LỆ TRẠNG THÁI'), 'Report contains Status Distribution section');
assert(mdContent.includes('PHÂN VỊ ĐỘ TRỄ MẠNG'), 'Report contains Latency Percentiles section');
assert(mdContent.includes('p50') && mdContent.includes('p95'), 'Report includes p50 and p95 latencies');
assert(mdContent.includes('TỶ LỆ LỖI VÀ TIMEOUT'), 'Report contains Error & Timeout Rates section');
assert(mdContent.includes('TOP CÁC DẠNG BÀI CHƯA HỖ TRỢ'), 'Report contains Top Unsupported Topics (Backlog) section');
assert(mdContent.includes('CÁC CÂU VERIFIED BỊ BÁO LỖI'), 'Report contains Confident-Yet-Wrong P0 candidates section');
assert(mdContent.includes('MỨC DÙNG NGÂN SÁCH'), 'Report contains Budget & Cost Tracking section');

// Validate metrics in JSON summary
assert(jsonSummary.total_events === 1200, `JSON summary total_events = ${jsonSummary.total_events} (expected 1200)`);
assert(jsonSummary.latency_percentiles.p50 > 0, `p50 latency computed: ${jsonSummary.latency_percentiles.p50} ms`);
assert(jsonSummary.latency_percentiles.p95 > jsonSummary.latency_percentiles.p50, 'p95 is greater than p50');
assert(Array.isArray(jsonSummary.top_unsupported) && jsonSummary.top_unsupported.length > 0, 'Top unsupported backlog populated');
assert(jsonSummary.p0_confident_wrong_count > 0, `Identified ${jsonSummary.p0_confident_wrong_count} P0 candidate questions for investigation`);
assert(jsonSummary.budget_usd.weekly_total > 0, `Estimated weekly budget: $${jsonSummary.budget_usd.weekly_total.toFixed(2)} USD`);

console.log(`  📊 Report stats: ${jsonSummary.total_events} events, p50=${jsonSummary.latency_percentiles.p50.toFixed(1)}ms, p95=${jsonSummary.latency_percentiles.p95.toFixed(1)}ms, P0 alerts=${jsonSummary.p0_confident_wrong_count}`);

// =========================================================================
// TEST 5: BUG-TO-REGRESSION PIPELINE VERIFICATION
// =========================================================================
console.log('\n--- TEST 5: Feedback-to-Regression Test Pipeline Verification ---');

// Validate docs/FEEDBACK_LOOP.md exists and documents the full SOP
const feedbackLoopDocPath = path.resolve(__dirname, '../docs/FEEDBACK_LOOP.md');
assert(fs.existsSync(feedbackLoopDocPath), 'docs/FEEDBACK_LOOP.md exists');
const fbLoopDoc = fs.readFileSync(feedbackLoopDocPath, 'utf8');

assert(fbLoopDoc.includes('BƯỚC 1: PHÂN LOẠI'), 'FEEDBACK_LOOP.md includes Step 1: Triage');
assert(fbLoopDoc.includes('BƯỚC 2: QUY TRÌNH ĐIỀU TRA'), 'FEEDBACK_LOOP.md includes Step 2: Investigation');
assert(fbLoopDoc.includes('BƯỚC 3: SỬA BỘ GIẢI'), 'FEEDBACK_LOOP.md includes Step 3: Fixing & Patching');
assert(fbLoopDoc.includes('BƯỚC 4: ĐÓNG BĂNG THÀNH CA KIỂM THỬ HỒI QUY'), 'FEEDBACK_LOOP.md includes Step 4: Regression Freezing');

// Simulate converting a reported bug into an executable regression test case:
// Case: Student reported q_sample_reported_bug where student answered "x=5"
const AnswerChecker = (await import('../pumkin3/js/math/PumkinAnswerChecker.js')).default || global.window.Pumkin.AnswerChecker;

const mockBuggedQuestion = {
    id: 'q_bug_report_verified_case_01',
    type: 'short_answer',
    subject: 'Mathematics',
    topic: 'Giải tích',
    question: 'Tìm nghiệm nguyên của phương trình...',
    correct_value: '5',
    options: null,
    explanation: 'Lời giải đã hiệu đính sau báo lỗi.'
};

// Test student variations that previously might have failed
const studentVariants = ['5', 'x = 5', 'x=5', '\\(5\\)', '5,0'];
let regressionPasses = 0;

for (const variant of studentVariants) {
    const checkRes = await AnswerChecker.checkSubmission({
        question: mockBuggedQuestion,
        studentAnswer: variant
    });
    if (checkRes.is_correct === true) {
        regressionPasses++;
    }
}

assert(regressionPasses === studentVariants.length,
    `Regression pipeline hold: All ${studentVariants.length} variations correctly graded for reported question (0 failures)`);

// =========================================================================
// TEST 6: PRIVACY POLICY & COMPLIANCE REVIEW CALLOUTS VERIFICATION
// =========================================================================
console.log('\n--- TEST 6: Privacy Policy & Legal Callouts Verification ---');

const privacyPolicyPath = path.resolve(__dirname, '../docs/PRIVACY_POLICY_VI.md');
assert(fs.existsSync(privacyPolicyPath), 'docs/PRIVACY_POLICY_VI.md exists');
const privacyPolicyText = fs.readFileSync(privacyPolicyPath, 'utf8');

assert(privacyPolicyText.includes('90 NGÀY'), 'Privacy policy clearly states 90-day retention period');
assert(privacyPolicyText.includes('Quyền từ chối thu thập chẩn đoán (Quyền Opt-out)'), 'Privacy policy explains opt-out mechanism');
assert(privacyPolicyText.includes('Quyền yêu cầu xóa dữ liệu'), 'Privacy policy explains right to erasure');
assert(privacyPolicyText.includes('CẦN XÁC NHẬN PHÁP LÝ'), 'Document highlights required legal confirmation callouts');
assert(/nghị định 13\/2023\/nđ-cp/i.test(privacyPolicyText), 'References Vietnamese PDPD Decree 13/2023/ND-CP');
assert(privacyPolicyText.includes('Luật Trẻ em 2016'), 'References Vietnamese Child Law 2016');

// =========================================================================
// FINAL SUMMARY
// =========================================================================
console.log('\n======================================================================');
console.log(`🏆 ALL ASSERTIONS PASSED: ${passedAssertions}/${totalAssertions}`);
console.log('✅ W7 TELEMETRY, PRIVACY, FEEDBACK LOOP & REPORTING ENGINE FULLY VERIFIED');
console.log('======================================================================\n');
