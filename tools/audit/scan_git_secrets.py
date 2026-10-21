#!/usr/bin/env python3
"""
Comprehensive Secret Scanner for Git History & Workspace
Scans git commits, diffs, and tracked files for leaked API keys, tokens, and private keys.
"""

import os
import re
import subprocess
import sys
from pathlib import Path

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

# Patterns for secrets
PATTERNS = {
    "Google / Gemini API Key": re.compile(r"\bAIza[0-9A-Za-z\-_]{35}\b"),
    "OpenAI API Key (legacy)": re.compile(r"\bsk-[a-zA-Z0-9]{32,50}\b"),
    "OpenAI Project Key": re.compile(r"\bsk-proj-[a-zA-Z0-9\-_]{40,100}\b"),
    "GitHub Token": re.compile(r"\b(?:ghp|gho|ghu|ghs|ghr)_[a-zA-Z0-9]{36}\b"),
    "GitHub Fine-Grained Token": re.compile(r"\bgithub_pat_[a-zA-Z0-9_]{82}\b"),
    "AWS Access Key ID": re.compile(r"\b(?:AKIA|ABIA|ACCA|ASIA)[0-9A-Z]{16}\b"),
    "Private Key Header": re.compile(r"-----BEGIN (?:RSA|DSA|EC|OPENSSH|PGP) PRIVATE KEY-----"),
    "Pumkin Plain API Key": re.compile(r"\b(?:pumkin_sec|pumkin_live|pumkin_test)_[a-zA-Z0-9_\-]{24,}\b"),
}

# Known test placeholders / fixtures that are safe
SAFE_EXCLUSIONS = [
    "AIzaSy_YOUR_GEMINI_API_KEY_HERE",
    "sk-fake-openai-key-for-test-only",
    "REPLACE_WITH_SHA256_HEX_HASH_FROM_TOOLS_MAKE_API_KEY",
    "AIzaSy_TEST_MOCK_GEMINI_KEY",
    "pumkin_test_secret_key_fixed_for_unit_tests_only",
]


def is_safe_placeholder(match_text: str) -> bool:
    for safe in SAFE_EXCLUSIONS:
        if safe in match_text:
            return True
    return False


def scan_git_history(repo_root: Path):
    print(">>> Đang quét toàn bộ lịch sử Git (git log -p --all)...")
    try:
        proc = subprocess.run(
            ["git", "log", "-p", "--all", "-U0"],
            cwd=str(repo_root),
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            check=True,
        )
    except Exception as e:
        print(f"Lỗi khi chạy git log: {e}")
        return []

    findings = []
    current_commit = "unknown"
    current_file = "unknown"

    for line in proc.stdout.splitlines():
        if line.startswith("commit "):
            current_commit = line.split()[1]
        elif line.startswith("diff --git "):
            parts = line.split()
            if len(parts) >= 4:
                current_file = parts[3].lstrip("b/")
        elif line.startswith("+") and not line.startswith("+++"):
            added_content = line[1:]
            for rule_name, regex in PATTERNS.items():
                for match in regex.finditer(added_content):
                    val = match.group(0)
                    if not is_safe_placeholder(val):
                        # Mask finding
                        masked = val[:6] + "..." + val[-4:] if len(val) > 10 else "***"
                        findings.append({
                            "type": "git_history",
                            "commit": current_commit[:8],
                            "file": current_file,
                            "rule": rule_name,
                            "masked": masked,
                            "raw": val,
                        })

    return findings


def scan_workspace_files(repo_root: Path):
    print(">>> Đang quét các tệp trong workspace (bỏ qua .git, node_modules, venv)...")
    findings = []
    ignored_dirs = {".git", "node_modules", ".venv", "venv", "__pycache__", ".pytest_cache", ".ruff_cache"}

    for root, dirs, files in os.walk(repo_root):
        dirs[:] = [d for d in dirs if d not in ignored_dirs]
        for f in files:
            file_path = Path(root) / f
            # Skip binary or very large files
            if file_path.suffix.lower() in [".png", ".jpg", ".jpeg", ".pdf", ".ico", ".woff", ".woff2", ".exe", ".dll", ".zip"]:
                continue
            if file_path.name == "scan_git_secrets.py":
                continue
            try:
                content = file_path.read_text(encoding="utf-8", errors="replace")
            except Exception:
                continue

            rel_path = file_path.relative_to(repo_root)
            for rule_name, regex in PATTERNS.items():
                for match in regex.finditer(content):
                    val = match.group(0)
                    if not is_safe_placeholder(val):
                        masked = val[:6] + "..." + val[-4:] if len(val) > 10 else "***"
                        findings.append({
                            "type": "workspace_file",
                            "file": str(rel_path),
                            "rule": rule_name,
                            "masked": masked,
                            "raw": val,
                        })

    return findings


def main():
    repo_root = Path(__file__).resolve().parent.parent.parent
    print(f"=== BẮT ĐẦU QUÉT BÍ MẬT TẠI: {repo_root} ===")

    history_findings = scan_git_history(repo_root)
    workspace_findings = scan_workspace_files(repo_root)

    print("\n" + "=" * 60)
    print(f"KẾT QUẢ QUÉT BÍ MẬT:")
    print(f"- Lịch sử Git: {len(history_findings)} phát hiện")
    print(f"- Workspace files: {len(workspace_findings)} phát hiện")
    print("=" * 60)

    all_findings = history_findings + workspace_findings
    if not all_findings:
        print("\n [KẾT QUẢ HOÀN TOÀN SẠCH]: Không tìm thấy bí mật hay API key thật nào trong repo và lịch sử git!")
        return 0

    print("\nDANH SÁCH CHI TIẾT CÁC PHÁT HIỆN:")
    for idx, item in enumerate(all_findings, 1):
        if item["type"] == "git_history":
            print(f"{idx}. [GIT COMMIT {item['commit']}] Tệp: {item['file']} | Loại: {item['rule']} | Khóa (đã che): {item['masked']}")
        else:
            print(f"{idx}. [TỆP WORKSPACE] Tệp: {item['file']} | Loại: {item['rule']} | Khóa (đã che): {item['masked']}")

    return len(all_findings)


if __name__ == "__main__":
    sys.exit(main())
