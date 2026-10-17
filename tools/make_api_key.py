#!/usr/bin/env python3
"""
PUMKIN MATH API - API Key Generator Tool
Generates cryptographically secure API keys with 256-bit entropy.
Prints the raw key ONCE for client use, and computes its SHA-256 hash for server config.
Never stores the raw key to disk or source code.
"""

import sys
import secrets
import hashlib

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')


def generate_key_pair(prefix: str = "pumkin_sec_"):
    # 32 bytes of secure random entropy (256 bits)
    entropy_str = secrets.token_urlsafe(32)
    raw_key = f"{prefix}{entropy_str}"
    key_hash = hashlib.sha256(raw_key.encode('utf-8')).hexdigest().lower()
    return raw_key, key_hash


def main():
    raw_key, key_hash = generate_key_pair()

    print("==================================================================================")
    print(" PUMKIN MATH API — CÔNG CỤ SINH KHÓA TRUY CẬP AN TOÀN (TOOLS/MAKE_API_KEY.PY)")
    print("==================================================================================")
    print(" [CẢNH BÁO AN TOÀN]:")
    print(" 1. Khóa bí mật (Plain API Key) CHỈ hiển thị DUY NHẤT một lần bên dưới.")
    print("    Hệ thống và mã nguồn KHÔNG lưu trữ khóa này ở bất kỳ tệp tin nào.")
    print(" 2. Hãy lưu khóa bí mật an toàn vào Cloudflare Pages Secret / Postman / Client.")
    print(" 3. Chỉ đưa mã băm SHA-256 vào biến môi trường 'PUMKIN_API_KEY_HASHES' trên máy chủ.")
    print("----------------------------------------------------------------------------------")
    print(f" KHÓA BÍ MẬT (X-Pumkin-API-Key) : {raw_key}")
    print(f" MÃ BĂM SHA-256 (Server ENV)    : {key_hash}")
    print("----------------------------------------------------------------------------------")
    print(" Ví dụ cấu hình biến môi trường server trong tệp .env (KHÔNG COMMIT):")
    print(f" PUMKIN_API_KEY_HASHES={key_hash}")
    print("==================================================================================")


if __name__ == '__main__':
    main()
