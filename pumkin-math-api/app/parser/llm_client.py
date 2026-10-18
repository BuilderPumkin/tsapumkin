"""
LLM Client Interface & Implementations for Semantic Parser
Supports:
1. FakeLLMClient: Deterministic mock responses for testing consensus, schema errors, and injection.
2. GeminiLLMClient: Google Gemini REST API via httpx (gemini-2.0-flash / gemini-1.5-flash).
3. OpenAILLMClient: OpenAI-compatible REST API via httpx.
API keys are loaded strictly from environment variables and never logged.
"""

import json
import os
import re
from abc import ABC, abstractmethod
from typing import Any

import httpx
from pydantic import BaseModel, Field


class LLMResponse(BaseModel):
    """Encapsulates structured JSON completion from an LLM provider."""

    content: dict[str, Any] = Field(..., description="Parsed JSON object matching DSL schema")
    raw_text: str = Field(..., description="Raw string output from LLM")
    prompt_tokens: int = Field(default=0, ge=0)
    completion_tokens: int = Field(default=0, ge=0)
    total_tokens: int = Field(default=0, ge=0)
    estimated_cost_usd: float = Field(default=0.0, ge=0.0)
    model: str = Field(default="mock-model")


class LLMClient(ABC):
    """Abstract base class for structured LLM completion."""

    @abstractmethod
    async def complete_structured(
        self,
        prompt: str,
        system_prompt: str,
        temperature: float = 0.0,
    ) -> LLMResponse:
        """Generates structured JSON adhering to the semantic parser prompt."""
        pass


class FakeLLMClient(LLMClient):
    """
    Test client returning deterministic responses.
    Can be configured with a queue of responses or fixed mapping.
    """

    def __init__(
        self,
        canned_responses: list[dict[str, Any] | str] | None = None,
        default_dsl: dict[str, Any] | None = None,
    ):
        self.canned_responses = list(canned_responses or [])
        self.default_dsl = default_dsl or {
            "type": "nguyen_ham_tich_phan",
            "integrand": "2*x",
            "variable": "x",
            "lower_bound": "0",
            "upper_bound": "1",
            "restate_vi": "Tính tích phân \\(\\int_0^1 2x dx\\)",
        }
        self.call_count = 0
        self.recorded_prompts: list[str] = []

    async def complete_structured(
        self,
        prompt: str,
        system_prompt: str,
        temperature: float = 0.0,
    ) -> LLMResponse:
        self.call_count += 1
        self.recorded_prompts.append(prompt)

        # Prompt injection detection test check:
        # If student text attempts system override, ensure we treat it as data
        if self.canned_responses:
            next_resp = self.canned_responses.pop(0)
            if isinstance(next_resp, dict):
                raw_text = json.dumps(next_resp, ensure_ascii=False)
                parsed = next_resp
            else:
                raw_text = str(next_resp)
                try:
                    parsed = json.loads(raw_text)
                except Exception:
                    parsed = {"raw": raw_text}
        else:
            parsed = dict(self.default_dsl)
            raw_text = json.dumps(parsed, ensure_ascii=False)

        # Estimate mock tokens
        p_tokens = len(prompt.split()) + len(system_prompt.split())
        c_tokens = len(raw_text.split())
        t_tokens = p_tokens + c_tokens
        # $0.10 / 1M input, $0.40 / 1M output
        cost = (p_tokens * 0.10 + c_tokens * 0.40) / 1_000_000.0

        return LLMResponse(
            content=parsed,
            raw_text=raw_text,
            prompt_tokens=p_tokens,
            completion_tokens=c_tokens,
            total_tokens=t_tokens,
            estimated_cost_usd=round(cost, 6),
            model="fake-llm-v1",
        )


class GeminiLLMClient(LLMClient):
    """
    Google Gemini REST API client via httpx.
    Reads GEMINI_API_KEY from environment variables.
    """

    def __init__(
        self,
        api_key: str | None = None,
        model: str | None = None,
        timeout_seconds: float = 30.0,
    ):
        self.api_key = (
            api_key or os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
        )
        self.model = model or os.environ.get("GEMINI_MODEL") or "gemini-2.0-flash"
        self.timeout_seconds = timeout_seconds

    async def complete_structured(
        self,
        prompt: str,
        system_prompt: str,
        temperature: float = 0.0,
    ) -> LLMResponse:
        if not self.api_key:
            raise ValueError(
                "GEMINI_API_KEY không được tìm thấy trong biến môi trường. "
                "Vui lòng thiết lập biến môi trường GEMINI_API_KEY để gọi API thật."
            )

        endpoint_url = (
            f"https://generativelanguage.googleapis.com/v1beta/models/"
            f"{self.model}:generateContent?key={self.api_key}"
        )

        payload = {
            "contents": [
                {
                    "role": "user",
                    "parts": [{"text": prompt}],
                }
            ],
            "systemInstruction": {
                "role": "system",
                "parts": [{"text": system_prompt}],
            },
            "generationConfig": {
                "responseMimeType": "application/json",
                "temperature": temperature,
            },
        }

        async with httpx.AsyncClient(timeout=self.timeout_seconds) as client:
            resp = await client.post(endpoint_url, json=payload)
            if resp.status_code != 200:
                # Mask key in any error representation
                clean_msg = resp.text.replace(self.api_key, "***")
                raise RuntimeError(f"Gemini API returned HTTP {resp.status_code}: {clean_msg}")

            data = resp.json()

        # Extract output text
        candidates = data.get("candidates", [])
        if not candidates:
            raise RuntimeError("Gemini API trả về danh sách candidates rỗng.")

        content_parts = candidates[0].get("content", {}).get("parts", [])
        if not content_parts:
            raise RuntimeError("Gemini candidate không chứa nội dung văn bản.")

        raw_text = content_parts[0].get("text", "").strip()

        # Clean markdown codeblocks if model wrapped in ```json
        cleaned_json_text = raw_text
        if cleaned_json_text.startswith("```"):
            cleaned_json_text = re.sub(r"^```(?:json)?\s*", "", cleaned_json_text)
            cleaned_json_text = re.sub(r"\s*```$", "", cleaned_json_text)

        parsed_json = json.loads(cleaned_json_text)

        # Extract token counts
        usage = data.get("usageMetadata", {})
        prompt_tokens = usage.get("promptTokenCount", 0)
        completion_tokens = usage.get("candidatesTokenCount", 0)
        total_tokens = usage.get("totalTokenCount", prompt_tokens + completion_tokens)

        # Gemini 2.0 Flash pricing: $0.10 / 1M prompt, $0.40 / 1M candidates
        cost = (prompt_tokens * 0.10 + completion_tokens * 0.40) / 1_000_000.0

        return LLMResponse(
            content=parsed_json,
            raw_text=raw_text,
            prompt_tokens=prompt_tokens,
            completion_tokens=completion_tokens,
            total_tokens=total_tokens,
            estimated_cost_usd=round(cost, 6),
            model=self.model,
        )


class OpenAILLMClient(LLMClient):
    """
    OpenAI-compatible REST API client via httpx.
    Supports OpenAI (gpt-4o-mini), Groq, DeepSeek, Together.
    """

    def __init__(
        self,
        api_key: str | None = None,
        base_url: str | None = None,
        model: str | None = None,
        timeout_seconds: float = 30.0,
    ):
        self.api_key = api_key or os.environ.get("OPENAI_API_KEY")
        self.base_url = (
            base_url or os.environ.get("OPENAI_BASE_URL") or "https://api.openai.com/v1"
        ).rstrip("/")
        self.model = model or os.environ.get("OPENAI_MODEL") or "gpt-4o-mini"
        self.timeout_seconds = timeout_seconds

    async def complete_structured(
        self,
        prompt: str,
        system_prompt: str,
        temperature: float = 0.0,
    ) -> LLMResponse:
        if not self.api_key:
            raise ValueError(
                "OPENAI_API_KEY không được tìm thấy trong biến môi trường. "
                "Vui lòng thiết lập biến môi trường OPENAI_API_KEY."
            )

        endpoint_url = f"{self.base_url}/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt},
            ],
            "response_format": {"type": "json_object"},
            "temperature": temperature,
        }

        async with httpx.AsyncClient(timeout=self.timeout_seconds) as client:
            resp = await client.post(endpoint_url, json=payload, headers=headers)
            if resp.status_code != 200:
                clean_msg = resp.text.replace(self.api_key, "***")
                raise RuntimeError(f"OpenAI API returned HTTP {resp.status_code}: {clean_msg}")
            data = resp.json()

        choices = data.get("choices", [])
        if not choices:
            raise RuntimeError("OpenAI API không trả về choices.")

        raw_text = choices[0].get("message", {}).get("content", "").strip()
        parsed_json = json.loads(raw_text)

        usage = data.get("usage", {})
        prompt_tokens = usage.get("prompt_tokens", 0)
        completion_tokens = usage.get("completion_tokens", 0)
        total_tokens = usage.get("total_tokens", prompt_tokens + completion_tokens)

        # gpt-4o-mini pricing: $0.15 / 1M prompt, $0.60 / 1M completion
        cost = (prompt_tokens * 0.15 + completion_tokens * 0.60) / 1_000_000.0

        return LLMResponse(
            content=parsed_json,
            raw_text=raw_text,
            prompt_tokens=prompt_tokens,
            completion_tokens=completion_tokens,
            total_tokens=total_tokens,
            estimated_cost_usd=round(cost, 6),
            model=self.model,
        )


def get_llm_client(provider: str | None = None) -> LLMClient:
    """
    Factory creating configured LLMClient.
    Priority:
    1. Explicit provider parameter
    2. LLM_PROVIDER env var ('fake', 'gemini', 'openai')
    3. If GEMINI_API_KEY present -> GeminiLLMClient
    4. Default -> FakeLLMClient (safe offline default)
    """
    selected = (provider or os.environ.get("LLM_PROVIDER", "")).strip().lower()

    if selected == "gemini":
        return GeminiLLMClient()
    if selected == "openai":
        return OpenAILLMClient()
    if selected == "fake":
        return FakeLLMClient()

    # Auto-detection
    if os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY"):
        return GeminiLLMClient()
    if os.environ.get("OPENAI_API_KEY"):
        return OpenAILLMClient()

    return FakeLLMClient()
