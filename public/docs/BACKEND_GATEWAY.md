# PUMKIN BACKEND AI GATEWAY

## Overview
The PUMKIN Backend Gateway is a secure proxy layer built with Node.js/Express. It bridges the gap between the static vanilla JS frontend and external AI Providers (e.g., OpenAI, Gemini). 

**Primary Goal:** Absolutely no API keys or credentials are ever sent to or stored in the browser.

## Architecture

```text
[ Browser (PUMKIN SPA) ]
          │
          ▼  POST /api/tutor/message
[ Express Security Middleware ] (Rate Limits, Payload Limits)
          │
          ▼
[ Express Validation Layer ] (Request Format & Context Schema Checks)
          │
          ▼
[ PUMKIN AI Gateway Router ] 
          │
          ▼
[ AI Provider Abstraction ] (e.g., OpenAIProvider, GeminiProvider)
          │
          ▼  Server-to-Server HTTPS
[ External LLM API ]
```

## Security & Cost Control
1. **API Key Isolation**: Keys (`OPENAI_API_KEY`) reside exclusively in the server's `.env` environment variables.
2. **Payload Limitation**: `express.json({ limit: '100kb' })` and custom middleware reject massive payloads to prevent memory exhaustion (OOM) attacks.
3. **Context Pruning**: The `costControl` middleware actively prunes `history` to the last 5 items and truncates user messages to 1000 characters to prevent excessive token usage and billing spikes.
4. **Rate Limiting**: IP-based throttling protects against bot spam.
5. **Safe Logging**: The `safeLogger` middleware strips all Personally Identifiable Information (PII) and API keys before logging. Errors are masked so stack traces never leak to the client.

## Data Validation
- **Input**: The backend enforces the presence of `session_id`, `context.question`, `context.student`, and `message`.
- **Output**: Responses from the AI Provider are passed through `validationMiddleware.validateAIResponse`. This ensures that even if the LLM hallucinates an invalid JSON shape or a malformed `hint_level`, the gateway sanitizes it into a strict, valid `TutorResponse` object before sending it to the frontend.

## Provider Abstraction
The backend implements an `AIProvider` base class. 
- You can seamlessly swap `OpenAIProvider` for `GeminiProvider` or `LocalProvider` without touching the router or frontend logic.
- Both streaming (Server-Sent Events) and non-streaming (JSON) modes are supported.

## Future Deployment
This Node.js/Express structure is perfectly suited to be deployed as:
- A standalone Docker container.
- Vercel Serverless Functions (`api/tutor.js`).
- Cloudflare Workers (with minor Node-to-WebAPI syntax adjustments).
