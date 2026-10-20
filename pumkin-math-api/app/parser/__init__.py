"""
Semantic Parser & AST Allowlist Validator Layer (app/parser)
Converts Vietnamese math prompts to typed JSON DSL without running arbitrary code.
Follows GEMINI.md standards: strictly no eval/exec/sympify/parse_expr.
"""

from app.parser.budget import BudgetExceededError, BudgetTracker, global_budget_tracker
from app.parser.cache import ProblemCache, compute_problem_hash, global_problem_cache
from app.parser.consensus import (
    DEFAULT_CONSENSUS_SAMPLES,
    PROMPT_VERSION,
    SampleOutcome,
    parse_and_solve_with_consensus,
    verify_multiple_choice_options,
)
from app.parser.llm_client import (
    FakeLLMClient,
    GeminiLLMClient,
    LLMClient,
    LLMResponse,
    OpenAILLMClient,
    get_llm_client,
)

__all__ = [
    "DEFAULT_CONSENSUS_SAMPLES",
    "PROMPT_VERSION",
    "BudgetExceededError",
    "BudgetTracker",
    "FakeLLMClient",
    "GeminiLLMClient",
    "LLMClient",
    "LLMResponse",
    "OpenAILLMClient",
    "ProblemCache",
    "SampleOutcome",
    "compute_problem_hash",
    "get_llm_client",
    "global_budget_tracker",
    "global_problem_cache",
    "parse_and_solve_with_consensus",
    "verify_multiple_choice_options",
]
