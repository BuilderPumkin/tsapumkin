"""
Problem Translation Cache Layer for Pumkin Semantic Parser
Stores validated DSLs by SHA-256 hash of normalized problem text.
"""

import hashlib
import re
from collections import OrderedDict
from typing import Any


def compute_problem_hash(text: str) -> str:
    """
    Normalizes problem text by stripping whitespace, lowercasing,
    and removing punctuation variants, then generates a SHA-256 digest.
    """
    s = text.strip().lower()
    # Normalize consecutive whitespace
    s = re.sub(r"\s+", " ", s)
    # Remove leading/trailing problem tags if present
    s = re.sub(r"^<problem>\s*", "", s)
    s = re.sub(r"\s*</problem>$", "", s)
    return hashlib.sha256(s.encode("utf-8")).hexdigest()


class ProblemCache:
    """In-memory LRU cache for translated DSL specifications."""

    def __init__(self, capacity: int = 1000, max_entries: int | None = None):
        self.capacity = max_entries or capacity
        self._cache: OrderedDict[str, dict[str, Any]] = OrderedDict()

    def get(self, problem_hash: str) -> dict[str, Any] | None:
        """Retrieves cached DSL payload if present."""
        if problem_hash in self._cache:
            self._cache.move_to_end(problem_hash)
            return self._cache[problem_hash]
        return None

    def set(self, problem_hash: str, dsl_dict: dict[str, Any]) -> None:
        """Stores translated DSL payload in cache."""
        if problem_hash in self._cache:
            self._cache.move_to_end(problem_hash)
        self._cache[problem_hash] = dsl_dict
        if len(self._cache) > self.capacity:
            self._cache.popitem(last=False)

    def clear(self) -> None:
        """Clears all cached entries (useful for test isolation)."""
        self._cache.clear()


# Global cache singleton
global_problem_cache = ProblemCache()
