# PUMKIN AI TUTOR UI & INTEGRATION

## Overview
The Tutor UI is designed as a non-intrusive, context-aware overlay that integrates directly into the monolithic SPA (`index.html`) without breaking existing Exam Engine logic or requiring a rewrite.

## Components
1. **`css/tutor.css`**: Responsive styles (Desktop Dockable Panel, Mobile Bottom Sheet). Includes loading animations and chat bubbles.
2. **`js/ui/TutorUI.js`**: Lazy-loaded DOM manager. It only injects the HTML structure and CSS when the user first clicks "Ask Tutor", saving memory and initial page load time.
3. **`js/integration/TutorIntegration.js`**: The bridge that gathers PUMKIN Core data via `TutorContextBuilder`, sends it to the Backend Gateway (`POST /api/tutor/message`), and parses the response.

## Integration Steps for `index.html`

### 1. Load the Scripts
Add the following scripts to the `<head>` or bottom of `<body>` in `index.html`:

```html
<!-- Load Context Builder (No AI dependencies) -->
<script src="/js/ai/TutorContextBuilder.js"></script>

<!-- Load UI and Integration -->
<script src="/js/ui/TutorUI.js"></script>
<script src="/js/integration/TutorIntegration.js"></script>
```

### 2. Add "Ask Tutor" Buttons
In your Exam Engine renderer (`PumkinPlayer.renderQuestion`), add a floating action button next to the question:

```html
<button class="btn-ask-tutor" onclick="PumkinTutorIntegration.openFromQuestion('${question.id}', '${currentExam.id}')">
    🤖 Hỏi Trợ Giảng
</button>
```

## Resilience & Fallbacks
- **Lazy Loading**: The heavy DOM elements for the chat interface are not present until `PumkinTutorUI.init()` is called.
- **Graceful Failure**: If the backend AI Gateway is down or times out, the `try...catch` block in `TutorIntegration.js` displays a polite error bubble: *"PUMKIN AI Tutor hiện không khả dụng"*. The rest of the website (Exam Engine, Scoring) remains fully operational.
- **Trace Logging**: We do not bloat `localStorage` with full chat transcripts. Only structured pedagogical signals (e.g., `requested_hint_level: 2`, `solution_revealed: true`) are saved to `PumkinLearningTrace` for future Analytics processing.

## Accessibility (A11y)
- The panel uses `role="dialog"` and `aria-live="polite"` for the chat history container, ensuring screen readers announce new AI messages automatically.
- Inputs automatically receive focus upon opening, and standard `Enter` key listeners are bound for sending messages.
