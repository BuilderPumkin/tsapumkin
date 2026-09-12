# PUMKIN LEARNING MEMORY

## Overview
The Learning Memory system provides the AI Tutor and PUMKIN Recommendation Engine with a Long-Term context of the student's academic profile. Instead of logging privacy-invasive and memory-heavy raw chat transcripts, this system only captures discrete, pedagogical "Signals."

## Architecture

### 1. The Schema (`schemas/learning_memory.schema.json`)
Defines the strict structure of a Signal:
- **`skill_id`**: The target concept (e.g., `MATH-ALG-01`).
- **`signal_type`**: `error`, `mastery`, `hint_request`, `struggle`, `concept_review`.
- **`value`**: Specifics (e.g., `sign_error`, or hint level `3`).
- **`confidence`**: Weight metric (0.0 to 1.0).
- **`timestamp`**: For recency decay.

### 2. The Store (`js/core/LearningMemoryStore.js`)
Manages the raw signals array.
- **Privacy First**: Data stays in `localStorage`. 
- **Storage Limits**: Caps out at 10,000 signals to prevent browser quota exhaustion.
- **Controls**: Exposes `clearData()` and `exportData()` for user compliance (GDPR/privacy).

### 3. The Aggregator (`js/core/MemoryAggregator.js`)
Turns thousands of raw signals into a fast, O(1) accessible profile.
- **Time Decay**: Implements an exponential decay function (`DECAY_FACTOR = 0.977` per day, creating a ~30-day half-life). An error made 3 months ago affects the profile much less than an error made yesterday.
- **Conflict Resolution**: If a student masters a skill today but failed it 2 months ago, the Aggregator computes the net weight. If `MasteryWeight > ErrorWeight`, it is categorized under `strong_skills`, deleting it from `weak_skills`.
- **Preferred Hint Level**: Averages recent `hint_request` signals so the AI Tutor can adapt to how much help the student usually needs.

## Integration
This Memory Profile directly powers the `TutorContextBuilder`. 
When the Tutor starts, it accesses the profile to build the `student.topic_mastery` and `student.recurring_errors` metadata, allowing the AI to be deeply personalized without remembering "useless chatter".
