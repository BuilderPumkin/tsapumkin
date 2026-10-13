/**
 * PUMKIN.DEV Academic Architecture
 * Module: Pumkin.Backup
 * Layer: Core Data Portability
 * Description: Standardized Backup & Restore System (PUMKIN_BACKUP_V2)
 */
(function(window) {
    'use strict';
    window.Pumkin = window.Pumkin || {};

const PumkinBackup = {
    exportBackup() {
        try {
            const backupData = {
                format: "PUMKIN_BACKUP_V2",
                version: "2.0.0",
                exported_at: new Date().toISOString(),
                user: (typeof PumkinAuth !== "undefined") ? PumkinAuth.getCurrentUser() : null,
                bookmarks: (typeof PumkinStorage !== "undefined") ? PumkinStorage.getBookmarkDetails() : [],
                history: (typeof PumkinStorage !== "undefined") ? PumkinStorage.getHistory() : [],
                learning_trace: PumkinLearningTrace.getTrace()
            };

            const jsonStr = JSON.stringify(backupData, null, 2);
            const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
            a.href = url;
            a.download = `pumkin_backup_v2_${dateStr}.json`;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 300);

            PumkinToast.success("✅ Đã xuất bản sao lưu PUMKIN_BACKUP_V2 thành công! Tệp tin đang được tải xuống.", 5000);
        } catch(e) {
            PumkinToast.error("Lỗi khi xuất bản sao lưu: " + e.message, 6000);
        }
    },

    importBackupFile(fileInput) {
        const file = fileInput.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                this.handleImportData(data);
            } catch(err) {
                PumkinToast.error("Tệp sao lưu không đúng định dạng JSON: " + err.message, 6000);
            }
        };
        reader.readAsText(file, "UTF-8");
        fileInput.value = ""; // Reset
    },

    handleImportData(data) {
        if (!data || data.format !== "PUMKIN_BACKUP_V2") {
            PumkinToast.error("Tệp không hợp lệ! Chỉ chấp nhận tệp sao lưu chuẩn PUMKIN_BACKUP_V2.");
            return;
        }

        const bCount = (data.bookmarks || []).length;
        const hCount = (data.history || []).length;
        const tCount = (data.learning_trace || []).length;

        const choice = confirm(
            `📦 Tìm thấy bản sao lưu PUMKIN_BACKUP_V2:\n` +
            `- Ngày tạo: ${data.exported_at || "Không rõ"}\n` +
            `- Đã lưu: ${bCount} câu hỏi\n` +
            `- Lịch sử thi: ${hCount} bài làm\n` +
            `- Nhật ký học tập: ${tCount} lượt giải\n\n` +
            `Bấm OK để HỢP NHẤT (Merge - giữ dữ liệu hiện tại và thêm dữ liệu mới)\n` +
            `Bấm CANCEL để hủy bỏ.`
        );

        if (!choice) return;

        this.applyMerge(data);
        PumkinToast.success("Hợp nhất bản sao lưu PUMKIN_BACKUP_V2 thành công! Dữ liệu đã được cập nhật.", 5000);
        location.reload();
    },

    applyMerge(data) {
        // 1. Merge bookmarks
        const curBms = PumkinStorage.getBookmarkDetails();
        const seenBms = new Set(curBms.map(b => b.id));
        (data.bookmarks || []).forEach(b => {
            const bObj = typeof b === "string" ? { id: b, reason: "chưa hiểu", createdAt: Date.now() } : b;
            if (bObj.id && !seenBms.has(bObj.id)) {
                curBms.push(bObj);
                seenBms.add(bObj.id);
            }
        });
        const bmKey = PumkinStorage.getPartitionKey("bookmarks");
        this.safeSetItem(bmKey, JSON.stringify(curBms));

        // 2. Merge history
        const curHist = PumkinStorage.getHistory();
        const seenHist = new Set(curHist.map(h => h.id));
        (data.history || []).forEach(h => {
            if (h.id && !seenHist.has(h.id)) {
                curHist.push(h);
                seenHist.add(h.id);
            }
        });
        const histKey = PumkinStorage.getPartitionKey("history");
        this.safeSetItem(histKey, JSON.stringify(curHist));

        // 3. Merge trace
        const curTrace = PumkinLearningTrace.getTrace();
        const seenTrace = new Set(curTrace.map(t => t.id));
        (data.learning_trace || []).forEach(t => {
            if (t.id && !seenTrace.has(t.id)) {
                curTrace.push(t);
                seenTrace.add(t.id);
            }
        });
        PumkinLearningTrace.saveTrace(curTrace);
    }
};

// Expose modules on window for external integrations, benchmarks & devtools

// LIVE EXAM CONTROLLER

    // Primary Namespace
    window.Pumkin.Backup = PumkinBackup;

    // // DEPRECATED: Backward compatibility shim
    window.PumkinBackup = PumkinBackup;
})(window);
