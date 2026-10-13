/**
 * PUMKIN.DEV Academic Architecture
 * Module: Application Bootstrapper
 * Layer: Core Lifecycle
 * Description: DOMContentLoaded lifecycle orchestration, state hydration & route bootstrap
 */
// Global App Initialization
document.addEventListener("DOMContentLoaded", async () => {
    if (typeof PumkinTheme !== "undefined") {
        PumkinTheme.init();
    }
    if (typeof PumkinUI !== "undefined") {
        PumkinUI.init();
    }
    if (typeof PumkinAuth !== "undefined") {
        await PumkinAuth.init();
    }
    await PumkinStorage.init();
    if (typeof PumkinStore !== "undefined") {
        PumkinStore.init();
    }
    PumkinBookmarks.updateBadge();
    if (typeof PumkinAdaptivePractice !== "undefined") {
        PumkinAdaptivePractice.renderUI();
    }
    if (typeof PumkinLearningTrace !== "undefined") {
        PumkinLearningTrace.getTrace();
    }

    // Check if there's an ongoing test session to restore
    const restored = PumkinPlayer.restoreSessionIfAvailable();
    if (!restored) {
        PumkinRouter.navigate("guide");
    }
});
