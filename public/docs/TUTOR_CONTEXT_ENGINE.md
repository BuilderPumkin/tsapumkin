# PUMKIN TUTOR CONTEXT ENGINE

## Overview
The Tutor Context Engine is a crucial architectural boundary for the future AI integration in PUMKIN.DEV. It ensures that the AI does not receive a raw, monolithic dump of database records, nor does it receive an underspecified prompt. Instead, the AI receives a **Canonical Context Payload** that is privacy-safe, version-controlled, and rich in educational metadata.

## Modules
1. **`schemas/tutor_context.schema.json`**: The JSON Schema defining the exact shape of the payload sent to the AI.
2. **`js/ai/TutorContextBuilder.js`**: The builder module responsible for reading from PUMKIN Core state (`PumkinStorage`, `PumkinLearningTrace`, `PumkinSkillProfile`) and constructing the compliant JSON.

## Data Structure (TutorContext)
A standard `TutorContext` payload (Version `1.0.0`) contains:
- `student`: Anonymous user IDs, topic mastery, skill mastery, and recurring error patterns.
- `session`: Elapsed time and session metadata.
- `question`: The exact text, options, difficulty, cognitive level, and correct value of the current question.
- `attempt`: The specific answer chosen by the user, time spent, and the deterministically classified `error_type`.
- `knowledge`: Up to 3 related theoretical items (formulas and markdown) mapped via topic or prerequisites.
- `history`: The last 5 attempts in the same topic, giving the AI insight into the user's short-term learning curve.

## Privacy & Security Policies
- **No Credentials**: No API keys, JWTs, or passwords are ever passed into the Context Engine.
- **Anonymous Tracking**: User IDs are localized hashes or session IDs. No PII (Personally Identifiable Information) is included.
- **Dependency Injection**: `TutorContextBuilder` accepts dependencies via `setDependencies()`. This prevents the builder from mutating the global `window` objects and allows strict mock testing.

## Handling Missing/Malformed Data
The Context Builder is designed to fail gracefully:
- If a `questionId` is valid but missing from the database (e.g. an old exam), the builder stubs the question with `[Question data missing or malformed]` and a default `Unknown` topic.
- If the student has zero history, arrays like `recurring_errors` or `knowledge` simply return empty `[]`.

## Testing
- Tests are provided in `/tests/test_tutor_context.js` (for CommonJS environments) and `/tests/runner.html` (for browser-based visual execution).
- Run `runner.html` to verify the builder handles complete profiles, missing profiles, and malformed inputs correctly.
