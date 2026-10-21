#!/usr/bin/env python3
"""
PUMKIN MATH API - API Key Generator Tool
Generates cryptographically secure API keys with 256-bit entropy.
Prints the raw key ONCE for client/Cloudflare use, and computes its SHA-256 hash for backend server config.
Never stores the raw key to disk or source code.
"""

import argparse
import hashlib
import secrets
import sys

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")


def generate_key_pair(prefix: str = "pumkin_sec_"):
    # 32 bytes of secure random entropy (256 bits)
    entropy_str = secrets.token_urlsafe(32)
    raw_key = f"{prefix}{entropy_str}"
    key_hash = hashlib.sha256(raw_key.encode("utf-8")).hexdigest().lower()
    return raw_key, key_hash


def main():
    parser = argparse.ArgumentParser(
        description="PUMKIN MATH API - Sinh khóa truy cập an toàn cho Staging và Production"
    )
    parser.add_argument(
        "--env",
        choices=["staging", "production", "dev"],
        default="staging",
        help="Môi trường sử dụng khóa (staging, production, dev)",
    )
    args = parser.parse_args()

    env_name = args.env.upper()
    prefix = f"pumkin_{args.env[:4]}_"
    raw_key, key_hash = generate_key_pair(prefix=prefix)

    print("==================================================================================")
    print(f" PUMKIN MATH API — CÔNG CỤ SINH KHÓA AN TOÀN CHO MÔI TRƯỜNG: {env_name}")
    print("==================================================================================")
    print(" [CẢNH BÁO AN TOÀN & BẢO MẬT]:")
    print(" 1. Khóa bí mật (Plain API Key) CHỈ hiển thị DUY NHẤT một lần bên dưới.")
    print("    Hệ thống và mã nguồn Git KHÔNG lưu trữ khóa này ở bất kỳ đâu.")
    print(" 2. Hãy sao chép khóa bí mật vào bảng điều khiển Cloudflare Pages (mục tương ứng).")
    print(" 3. Chỉ đưa MÃ BĂM SHA-256 vào biến môi trường máy chủ Backend.")
    print("----------------------------------------------------------------------------------")
    print(f" KHÓA BÍ MẬT (MATH_API_KEY)     : {raw_key}")
    print(f" MÃ BĂM SHA-256 (Server Backend): {key_hash}")
    print("----------------------------------------------------------------------------------")
    print(f" HƯỚNG DẪN CẤU HÌNH CHO MÔI TRƯỜNG {env_name}:")
    if args.env == "production":
        print(" [A. PHÍA CLOUDFLARE PAGES - Bảng điều khiển]:")
        print("     Settings -> Environment variables -> Production:")
        print("     - Tên biến : MATH_API_KEY")
        print(f"     - Giá trị  : {raw_key}  (Chọn Encrypt / Secret)")
        print("     - Tên biến : MATH_API_URL")
        print("     - Giá trị  : https://<your-production-backend-domain>")
        print("\n [B. PHÍA BACKEND MÁY CHỦ PRODUCTION]:")
        print(f"     - Tên biến : MATH_API_KEY_HASHES={key_hash}")
        print("     - Tên biến : CORS_ORIGINS=https://tsapumkin.pages.dev,https://pumkin.dev")
    elif args.env == "staging":
        print(" [A. PHÍA CLOUDFLARE PAGES - Bảng điều khiển]:")
        print("     Settings -> Environment variables -> Preview:")
        print("     - Tên biến : MATH_API_KEY")
        print(f"     - Giá trị  : {raw_key}  (Chọn Encrypt / Secret)")
        print("     - Tên biến : MATH_API_URL")
        print("     - Giá trị  : https://<your-staging-backend-domain>")
        print("\n [B. PHÍA BACKEND MÁY CHỦ STAGING]:")
        print(f"     - Tên biến : MATH_API_KEY_HASHES={key_hash}")
        print("     - Tên biến : CORS_ORIGINS=https://*.tsapumkin.pages.dev,https://preview.tsapumkin.pages.dev")
    else:
        print(f" Local / Dev: MATH_API_KEY_HASHES={key_hash}")
    print("==================================================================================")


if __name__ == "__main__":
    main()
