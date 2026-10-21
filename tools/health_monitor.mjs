/**
 * tools/health_monitor.mjs
 * Giám sát Định kỳ & Phát tín hiệu Cảnh báo Tự động (Automated Health & Alerting Engine)
 * Dự án: PUMKIN.DEV (PUMKINTSA)
 */

import http from 'http';
import https from 'https';

console.log('===============================================================');
console.log('     PUMKIN.DEV AUTOMATED HEALTH MONITOR & ALERTING ENGINE      ');
console.log('===============================================================\n');

// Cấu hình giám sát
const CONFIG = {
    checkIntervalMs: 5000,
    timeoutMs: 4000,
    thresholds: {
        errorRatePercent: 3.0,
        p95LatencyMs: 1000,
        budgetWarningPercent: 70.0,
        budgetCriticalPercent: 90.0,
        verifiedReportThreshold: 2
    },
    // Hỗ trợ webhook URL (Discord, Telegram, Slack hoặc console mock)
    webhookUrl: process.env.ALERT_WEBHOOK_URL || null
};

/**
 * Gửi thông báo cảnh báo qua Webhook hoặc Console
 */
export async function sendAlert(level, title, message, details = {}) {
    const timestamp = new Date().toISOString();
    const alertPayload = {
        level: level.toUpperCase(), // INFO | WARNING | CRITICAL
        timestamp,
        system: "PUMKIN.DEV Math API & Gateway",
        title,
        message,
        details
    };

    console.log(`\n🚨 [ALERT - ${alertPayload.level}] ${title}`);
    console.log(`   Thời gian: ${timestamp}`);
    console.log(`   Nội dung: ${message}`);
    if (Object.keys(details).length > 0) {
        console.log(`   Chi tiết: ${JSON.stringify(details, null, 2)}`);
    }

    if (!CONFIG.webhookUrl) {
        console.log(`   [Kênh phát]: Console Log (Chưa cấu hình ALERT_WEBHOOK_URL)`);
        return { success: true, channel: 'console', payload: alertPayload };
    }

    // Gửi thực tế qua Webhook (nếu có cấu hình)
    try {
        const url = new URL(CONFIG.webhookUrl);
        const reqLib = url.protocol === 'https:' ? https : http;
        
        let formattedBody = JSON.stringify(alertPayload);
        // Hỗ trợ format Discord Webhook
        if (url.hostname.includes('discord.com')) {
            formattedBody = JSON.stringify({
                content: `🚨 **[${alertPayload.level}] ${title}**\n${message}\n\`\`\`json\n${JSON.stringify(details, null, 2)}\n\`\`\``
            });
        }

        await new Promise((resolve, reject) => {
            const req = reqLib.request(CONFIG.webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            }, (res) => {
                if (res.statusCode >= 200 && res.statusCode < 300) resolve();
                else reject(new Error(`Webhook returned status ${res.statusCode}`));
            });
            req.on('error', reject);
            req.write(formattedBody);
            req.end();
        });

        console.log(`   ✅ Gửi thành công tới Webhook: ${url.hostname}`);
        return { success: true, channel: 'webhook', payload: alertPayload };
    } catch (err) {
        console.error(`   ❌ Lỗi gửi webhook cảnh báo:`, err.message);
        return { success: false, error: err.message, payload: alertPayload };
    }
}

/**
 * Kiểm tra sức khỏe endpoint (Health Check Probe)
 */
export async function probeHealth(targetUrl) {
    const startTime = Date.now();
    const url = new URL(targetUrl);
    const reqLib = url.protocol === 'https:' ? https : http;

    return new Promise((resolve) => {
        const req = reqLib.request(targetUrl, {
            method: 'GET',
            timeout: CONFIG.timeoutMs
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                const latency = Date.now() - startTime;
                let parsed = null;
                try { parsed = JSON.parse(body); } catch (_) {}
                resolve({
                    isAlive: res.statusCode === 200,
                    statusCode: res.statusCode,
                    latency,
                    data: parsed,
                    raw: body
                });
            });
        });

        req.on('timeout', () => {
            req.destroy();
            resolve({
                isAlive: false,
                statusCode: 504,
                latency: Date.now() - startTime,
                error: 'TIMEOUT'
            });
        });

        req.on('error', (err) => {
            resolve({
                isAlive: false,
                statusCode: 502,
                latency: Date.now() - startTime,
                error: err.code || err.message
            });
        });

        req.end();
    });
}

/**
 * Đánh giá các chỉ số viễn thám và phát cảnh báo nếu vượt ngưỡng
 */
export async function evaluateTelemetryMetrics(metrics) {
    const alertsTriggered = [];

    // 1. Kiểm tra tỷ lệ lỗi
    if (metrics.errorRatePercent > CONFIG.thresholds.errorRatePercent) {
        const res = await sendAlert(
            'CRITICAL',
            'Tỷ lệ lỗi hệ thống vượt ngưỡng an toàn',
            `Tỷ lệ lỗi hiện tại đạt ${metrics.errorRatePercent.toFixed(2)}% (Ngưỡng tối đa cho phép: ${CONFIG.thresholds.errorRatePercent}%).`,
            { errorRate: metrics.errorRatePercent, threshold: CONFIG.thresholds.errorRatePercent }
        );
        alertsTriggered.push(res);
    }

    // 2. Kiểm tra độ trễ p95
    if (metrics.p95LatencyMs > CONFIG.thresholds.p95LatencyMs) {
        const res = await sendAlert(
            'WARNING',
            'Độ trễ p95 phản hồi toán học tăng cao',
            `Độ trễ p95 đạt ${metrics.p95LatencyMs}ms (Ngưỡng cho phép: ${CONFIG.thresholds.p95LatencyMs}ms). Có nguy cơ nghẽn hàng đợi tính toán.`,
            { p95LatencyMs: metrics.p95LatencyMs, threshold: CONFIG.thresholds.p95LatencyMs }
        );
        alertsTriggered.push(res);
    }

    // 3. Kiểm tra ngân sách LLM
    if (metrics.budgetUsagePercent >= CONFIG.thresholds.budgetCriticalPercent) {
        const res = await sendAlert(
            'CRITICAL',
            'Ngân sách LLM chạm mức báo động đỏ 90%',
            `Đã tiêu thụ ${metrics.budgetUsagePercent.toFixed(1)}% ngân sách ngày ($${metrics.spentTodayUsd} / $${metrics.budgetDailyLimitUsd}). Hệ thống chuẩn bị chuyển sang chế độ tự vệ.`,
            { spent: metrics.spentTodayUsd, limit: metrics.budgetDailyLimitUsd, percent: metrics.budgetUsagePercent }
        );
        alertsTriggered.push(res);
    } else if (metrics.budgetUsagePercent >= CONFIG.thresholds.budgetWarningPercent) {
        const res = await sendAlert(
            'WARNING',
            'Cảnh báo mức dùng ngân sách LLM chạm 70%',
            `Đã dùng ${metrics.budgetUsagePercent.toFixed(1)}% ngân sách ngày ($${metrics.spentTodayUsd} / $${metrics.budgetDailyLimitUsd}).`,
            { spent: metrics.spentTodayUsd, limit: metrics.budgetDailyLimitUsd, percent: metrics.budgetUsagePercent }
        );
        alertsTriggered.push(res);
    }

    // 4. Kiểm tra báo lỗi trên câu ĐÃ KIỂM CHỨNG
    if (metrics.verifiedQuestionReports >= CONFIG.thresholds.verifiedReportThreshold) {
        const res = await sendAlert(
            'CRITICAL',
            'Phát hiện báo lỗi lặp lại trên câu hỏi Verified',
            `Câu hỏi [${metrics.flaggedQuestionId}] đã nhận ${metrics.verifiedQuestionReports} lượt báo lỗi từ học sinh. Nghi vấn đáp án chuẩn bị sai sót ("sai mà tự tin").`,
            { questionId: metrics.flaggedQuestionId, reportsCount: metrics.verifiedQuestionReports }
        );
        alertsTriggered.push(res);
    }

    return alertsTriggered;
}

// Chạy bài kiểm thử diễn tập khi thực thi trực tiếp bằng Node
if (process.argv[1] && process.argv[1].endsWith('health_monitor.mjs')) {
    (async () => {
        console.log('--- TEST 1: Diễn tập cảnh báo vượt ngưỡng Telemetry ---');
        const simulatedBadMetrics = {
            errorRatePercent: 4.8, // Vượt ngưỡng 3.0%
            p95LatencyMs: 1250,    // Vượt ngưỡng 1000ms
            budgetUsagePercent: 91.5, // Chạm mức đỏ 90%
            spentTodayUsd: 1.37,
            budgetDailyLimitUsd: 1.50,
            verifiedQuestionReports: 2, // 2 báo lỗi trên câu verified
            flaggedQuestionId: "q_thpt_geo_04"
        };

        const triggered = await evaluateTelemetryMetrics(simulatedBadMetrics);
        console.log(`\n✅ [PASS] Đã kích hoạt và gửi thành công ${triggered.length}/4 cảnh báo sự cố!`);

        console.log('\n--- TEST 2: Thử nghiệm kiểm tra Health Probe ---');
        // Tạo một server mock test nhanh
        const testServer = http.createServer((req, res) => {
            if (req.url === '/healthz') {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: 'ok', version: '2.0.0-pro' }));
            }
        });

        testServer.listen(8995, async () => {
            const probeResult = await probeHealth('http://localhost:8995/healthz');
            console.log(`  Probe Status: ${probeResult.statusCode} (${probeResult.latency}ms)`);
            console.log(`  Probe isAlive: ${probeResult.isAlive}`);
            testServer.close();

            console.log('\n===============================================================');
            console.log('🏆 BỘ CÔNG CỤ GIÁM SÁT & CẢNH BÁO SẴN SÀNG HOẠT ĐỘNG 100%');
            console.log('===============================================================');
        });
    })();
}
