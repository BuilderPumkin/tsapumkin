-- ==============================================================================
-- PUMKIN.DEV Academic Architecture
-- Schema: telemetry_feedback_schema.sql
-- Layer: Privacy-Preserving Telemetry & Academic Feedback Loop (W7)
-- Target: Cloudflare D1 Serverless SQL Database
-- 
-- PRIVACY INVARIANTS:
-- 1. Zero PII: No names, emails, user IDs, or IP addresses stored.
-- 2. Ephemeral Session IDs: Random UUIDs generated per session, unlinked to accounts.
-- 3. Explicit Problem Consent: Problem text is NULL unless include_problem_agreed = 1.
-- 4. 90-Day Retention: Automated cleanup of records older than 90 days.
-- ==============================================================================

-- 1. Telemetry Events (Operational Metrics & Solver Performance)
CREATE TABLE IF NOT EXISTS telemetry_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    session_id TEXT NOT NULL,
    call_type TEXT NOT NULL,                  -- 'solve' | 'check' | 'generate'
    status TEXT NOT NULL,                     -- 'verified' | 'needs_review' | 'unsupported' | 'error' | 'cannot_determine' | 'timeout'
    latency_ms INTEGER NOT NULL,              -- Total response time in milliseconds
    error_code TEXT,                          -- Machine error code (e.g. 'TIMEOUT', 'PARSE_ERROR', 'CAS_ENGINE_ERROR')
    api_version TEXT NOT NULL DEFAULT 'v1',   -- API endpoint version
    prompt_version TEXT,                      -- Solver / prompt version (e.g. 'pumkin-math-v2.1')
    problem_topic TEXT,                       -- High-level topic label (e.g. 'geometry_oxyz', 'nguyen_ham_tich_phan')
    client_version TEXT DEFAULT '4.5.0'       -- Web client release version
);

CREATE INDEX IF NOT EXISTS idx_telemetry_created_at ON telemetry_events(created_at);
CREATE INDEX IF NOT EXISTS idx_telemetry_status ON telemetry_events(status);
CREATE INDEX IF NOT EXISTS idx_telemetry_topic ON telemetry_events(problem_topic);
CREATE INDEX IF NOT EXISTS idx_telemetry_session ON telemetry_events(session_id);

-- 2. Feedback Reports (Student Problem / Solution Reports)
CREATE TABLE IF NOT EXISTS feedback_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    session_id TEXT NOT NULL,
    question_id TEXT,                         -- Question ID from bank or generator (e.g. 'q_tsa_04', 'gen_1234')
    call_type TEXT NOT NULL,                  -- 'solve' | 'check' | 'generate'
    reason_category TEXT NOT NULL,            -- 'WRONG_ANSWER' | 'MISUNDERSTOOD_PROBLEM' | 'HARD_TO_UNDERSTAND' | 'FORMULA_ERROR' | 'OTHER'
    user_note TEXT,                           -- Optional student feedback message (sanitized)
    include_problem_agreed INTEGER NOT NULL DEFAULT 0, -- 0 = No (Default), 1 = Yes (Explicit Consent Given)
    problem_content TEXT,                     -- Problem text or LaTeX (STRICTLY NULL unless include_problem_agreed = 1)
    current_status TEXT,                      -- Status when reported (e.g. 'verified', 'needs_review')
    verified_when_reported INTEGER NOT NULL DEFAULT 0, -- 1 if status was 'verified' (Candidate for "Confident yet wrong" P0 audit)
    triage_status TEXT NOT NULL DEFAULT 'new' -- 'new' | 'investigating' | 'resolved' | 'wontfix'
);

CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback_reports(created_at);
CREATE INDEX IF NOT EXISTS idx_feedback_reason ON feedback_reports(reason_category);
CREATE INDEX IF NOT EXISTS idx_feedback_triage ON feedback_reports(triage_status);
CREATE INDEX IF NOT EXISTS idx_feedback_confident_wrong ON feedback_reports(verified_when_reported);
CREATE INDEX IF NOT EXISTS idx_feedback_session ON feedback_reports(session_id);

-- 3. 90-Day Retention Cleanup Trigger / Query
-- Run periodically via Scheduled Cloudflare Worker (Cron: 0 0 * * *):
-- DELETE FROM telemetry_events WHERE datetime(created_at) < datetime('now', '-90 days');
-- DELETE FROM feedback_reports WHERE datetime(created_at) < datetime('now', '-90 days');
