#!/usr/bin/env python3
"""
tools/update_branding_to_matheval.py
Cập nhật thương hiệu MathEval trên toàn bộ giao diện pumkin3/
"""

import os
import re
import sys

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUMKIN3_DIR = os.path.join(ROOT_DIR, "pumkin3")

# 1. Update index.html
p_index = os.path.join(PUMKIN3_DIR, "index.html")
if os.path.exists(p_index):
    with open(p_index, "r", encoding="utf-8") as f:
        content = f.read()

    content = re.sub(
        r"<title>PUMKIN\.DEV[^<]*</title>",
        "<title>MathEval - Nền tảng Khảo thí Toán học & Luyện thi Đánh giá Tư duy</title>",
        content,
    )
    content = re.sub(
        r'<meta property="og:title" content="PUMKIN\.DEV[^"]*">',
        '<meta property="og:title" content="MathEval - Nền tảng Khảo thí Toán học & Luyện thi Đánh giá Tư duy">',
        content,
    )
    content = re.sub(
        r'<meta name="twitter:title" content="PUMKIN\.DEV[^"]*">',
        '<meta name="twitter:title" content="MathEval - Khảo thí Toán học & Đánh giá Tư duy">',
        content,
    )
    content = re.sub(
        r'<span>(?:🎃|dYZ)\s*PUMKIN\.DEV</span>\s*<span class="brand-badge">[^<]*</span>',
        '<span>🎃 MathEval</span>\n            <span class="brand-badge">PUMKIN.DEV</span>',
        content,
    )
    content = re.sub(
        r"PUMKIN\.DEV\s*•\s*NỀN TẢNG KHẢO THÍ TOÁN HỌC CHUẨN HÓA",
        "MathEval • NỀN TẢNG KHẢO THÍ TOÁN HỌC CHUẨN HÓA",
        content,
    )
    content = re.sub(
        r"MADE BY PUMKIN\.DEV",
        "MADE BY MathEval • PUMKIN.DEV",
        content,
    )

    with open(p_index, "w", encoding="utf-8", newline="\n") as f:
        f.write(content)
    print("  ✅ Updated pumkin3/index.html")

# 2. Update TSA_do_an.html
p_tsa = os.path.join(PUMKIN3_DIR, "TSA_do_an.html")
if os.path.exists(p_tsa):
    with open(p_tsa, "r", encoding="utf-8") as f:
        content = f.read()

    content = re.sub(
        r"<title>PUMKIN\.DEV[^<]*</title>",
        "<title>MathEval - Nền tảng Khảo thí Toán học & Luyện thi Đánh giá Tư duy</title>",
        content,
    )
    content = re.sub(
        r'<meta property="og:title" content="PUMKIN\.DEV[^"]*">',
        '<meta property="og:title" content="MathEval - Nền tảng Khảo thí Toán học & Luyện thi Đánh giá Tư duy">',
        content,
    )
    content = re.sub(
        r'<meta name="twitter:title" content="PUMKIN\.DEV[^"]*">',
        '<meta name="twitter:title" content="MathEval - Khảo thí Toán học & Đánh giá Tư duy">',
        content,
    )
    content = re.sub(
        r'<span>(?:🎃|dYZ)\s*PUMKIN\.DEV</span>\s*<span class="brand-badge">[^<]*</span>',
        '<span>🎃 MathEval</span>\n            <span class="brand-badge">PUMKIN.DEV</span>',
        content,
    )
    content = re.sub(
        r"PUMKIN\.DEV\s*•\s*NỀN TẢNG KHẢO THÍ TOÁN HỌC CHUẨN HÓA",
        "MathEval • NỀN TẢNG KHẢO THÍ TOÁN HỌC CHUẨN HÓA",
        content,
    )

    with open(p_tsa, "w", encoding="utf-8", newline="\n") as f:
        f.write(content)
    print("  ✅ Updated pumkin3/TSA_do_an.html")

# 3. Update so_tay_kien_thuc.html
p_sotay = os.path.join(PUMKIN3_DIR, "so_tay_kien_thuc.html")
if os.path.exists(p_sotay):
    with open(p_sotay, "r", encoding="utf-8") as f:
        content = f.read()

    content = re.sub(
        r"<title>([^<|]+)\|\s*PUMKIN\.DEV</title>",
        r"<title>\1| MathEval</title>",
        content,
    )
    content = re.sub(
        r'<meta property="og:title" content="([^"|]+)\|\s*PUMKIN\.DEV">',
        r'<meta property="og:title" content="\1| MathEval">',
        content,
    )
    content = re.sub(
        r'<meta name="twitter:title" content="([^"|]+)\|\s*PUMKIN\.DEV">',
        r'<meta name="twitter:title" content="\1| MathEval">',
        content,
    )
    content = re.sub(
        r'<span class="logo-badge">(?:🎃|dYZ)\s*PUMKIN\.DEV</span>',
        '<span class="logo-badge">🎃 MathEval</span>',
        content,
    )

    with open(p_sotay, "w", encoding="utf-8", newline="\n") as f:
        f.write(content)
    print("  ✅ Updated pumkin3/so_tay_kien_thuc.html")

# 4. Update 404.html, privacy.html, terms.html
for fname in ["404.html", "privacy.html", "terms.html"]:
    p = os.path.join(PUMKIN3_DIR, fname)
    if os.path.exists(p):
        with open(p, "r", encoding="utf-8") as f:
            content = f.read()

        content = re.sub(
            r"<title>([^<|]+)\|\s*PUMKIN\.DEV</title>",
            r"<title>\1| MathEval</title>",
            content,
        )
        content = re.sub(
            r"Quay về Trang Chủ PUMKIN\.DEV",
            r"Quay về Trang Chủ MathEval (PUMKIN.DEV)",
            content,
        )

        with open(p, "w", encoding="utf-8", newline="\n") as f:
            f.write(content)
        print(f"  ✅ Updated pumkin3/{fname}")

# 5. Update manifest.webmanifest
p_manifest = os.path.join(PUMKIN3_DIR, "manifest.webmanifest")
if os.path.exists(p_manifest):
    with open(p_manifest, "r", encoding="utf-8") as f:
        content = f.read()

    content = re.sub(
        r'"name":\s*"[^"]*"',
        '"name": "MathEval - Nền tảng Khảo thí & Dữ liệu Giáo dục"',
        content,
    )
    content = re.sub(
        r'"short_name":\s*"[^"]*"',
        '"short_name": "MathEval"',
        content,
    )

    with open(p_manifest, "w", encoding="utf-8", newline="\n") as f:
        f.write(content)
    print("  ✅ Updated pumkin3/manifest.webmanifest")

print("\n🏆 Branding update to MathEval complete!")
