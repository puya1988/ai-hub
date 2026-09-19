#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI HUB · 生成 macOS 应用图标（.icns）
=========================================================================
用法：
    python3 scripts/make-icon.py                  # 生成 assets/icon/aihub.icns
    python3 scripts/make-icon.py --size 1024      # 指定画布尺寸
    python3 scripts/make-icon.py --keep-iconset   # 保留 .iconset 目录

依赖：Pillow（pip3 install Pillow）；iconutil 为 macOS 自带。

遵循 macOS Big Sur 之后的图标规范：
  · 画布 1024×1024，主体「板」占约 81.5%（≈835px），四周留白
  · 圆角半径 = 板边长 × 22.37%
  · 主体下方带柔和投影，顶部有受光高光
这样放进 Dock / 访达时，和系统及其它 App 图标大小、圆角、投影一致。
=========================================================================
"""

import argparse
import os
import shutil
import subprocess
import sys

try:
    from PIL import Image, ImageDraw, ImageFilter, ImageFont
except ImportError:
    sys.exit("需要 Pillow：pip3 install Pillow")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "assets", "icon")

# 品牌渐变端点，与站点 CSS 变量一致
C1 = (79, 70, 229)      # --brand    #4f46e5 靛蓝
C2 = (6, 182, 212)      # --brand-2  #06b6d4 青
C3 = (124, 58, 237)     # 过渡用的紫

PLATE_RATIO = 0.815     # macOS 图标网格：主体占画布比例
CORNER_RATIO = 0.2237   # Big Sur 圆角比例

FONT_CANDIDATES = [
    "/System/Library/Fonts/SFNS.ttf",
    "/System/Library/Fonts/Avenir Next.ttc",
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
]


def load_font(size):
    for path in FONT_CANDIDATES:
        if not os.path.exists(path):
            continue
        for idx in (0, 1, 2):
            try:
                return ImageFont.truetype(path, size, index=idx)
            except Exception:
                continue
    raise SystemExit("找不到可用字体")


def lerp(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def gradient(size):
    """左上 C1 → 右下 C2 的对角渐变，右上角混一点紫增加层次。"""
    img = Image.new("RGB", (size, size))
    px = img.load()
    for y in range(size):
        fy = y / size
        for x in range(size):
            fx = x / size
            col = lerp(C1, C2, min(1.0, fx * 0.55 + fy * 0.45))
            d = (fx + (1 - fy)) / 2
            if d > 0.55:
                col = lerp(col, C3, (d - 0.55) / 0.45 * 0.45)
            px[x, y] = col
    return img


def rounded_mask(size, radius):
    m = Image.new("L", (size, size), 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=255)
    return m


def ink_layer(text, font):
    """把文字渲染到透明图层并裁到真实墨迹范围。
    PIL 的 textbbox 基于字宽而非墨迹，直接用会偏，所以这里实测像素。"""
    tmp = Image.new("L", (max(64, len(text) * font.size * 3), font.size * 3), 0)
    ImageDraw.Draw(tmp).text((font.size, font.size), text, font=font, fill=255)
    bbox = tmp.getbbox()
    if not bbox:
        raise SystemExit("文字渲染失败：" + text)
    return tmp.crop(bbox)


def paste_ink(canvas, ink, cx, cy, color):
    w, h = ink.size
    colored = Image.new("RGBA", (w, h), color)
    colored.putalpha(ink)
    canvas.alpha_composite(colored, (round(cx - w / 2), round(cy - h / 2)))
    return w, h


def make_plate(P):
    """生成图标主体（边长为 P 的圆角方形，含渐变、高光与文字）"""
    r = round(P * CORNER_RATIO)

    plate = gradient(P).convert("RGBA")
    plate.putalpha(rounded_mask(P, r))

    # 顶部受光高光
    hl = Image.new("RGBA", (P, P), (0, 0, 0, 0))
    ImageDraw.Draw(hl).ellipse(
        [-P * 0.35, -P * 0.85, P * 1.35, P * 0.55], fill=(255, 255, 255, 46))
    hl = hl.filter(ImageFilter.GaussianBlur(P * 0.06))
    hl.putalpha(Image.composite(hl.getchannel("A"),
                               Image.new("L", (P, P), 0), rounded_mask(P, r)))
    plate = Image.alpha_composite(plate, hl)

    # ---- 文字排版：先量墨迹，再按固定间距整体居中，避免重叠 ----
    ink_ai = ink_layer("AI", load_font(round(P * 0.40)))
    ink_hub = ink_layer("HUB", load_font(round(P * 0.105)))

    gap1 = round(P * 0.052)                       # AI 底 → 分隔线
    line_h = max(2, round(P * 0.009))
    gap2 = round(P * 0.044)                       # 分隔线 → HUB 顶

    block_h = ink_ai.size[1] + gap1 + line_h + gap2 + ink_hub.size[1]
    top = (P - block_h) / 2 - P * 0.015           # 视觉重心略偏上
    cx = P / 2

    layer = Image.new("RGBA", (P, P), (0, 0, 0, 0))
    y = top

    # AI（带一层轻微投影，保证浅色壁纸上也清晰）
    shadow = Image.new("RGBA", ink_ai.size, (15, 20, 40, 60))
    shadow.putalpha(ink_ai)
    layer.alpha_composite(shadow, (round(cx - ink_ai.size[0] / 2), round(y + P * 0.008)))
    paste_ink(layer, ink_ai, cx, y + ink_ai.size[1] / 2, (255, 255, 255, 255))
    y += ink_ai.size[1] + gap1

    # 分隔线
    ImageDraw.Draw(layer).rounded_rectangle(
        [cx - P * 0.17, y, cx + P * 0.17, y + line_h],
        radius=line_h / 2, fill=(255, 255, 255, 120))
    y += line_h + gap2

    # HUB
    paste_ink(layer, ink_hub, cx, y + ink_hub.size[1] / 2, (255, 255, 255, 225))

    plate = Image.alpha_composite(plate, layer)

    # 内描边，让边缘更干净
    edge = Image.new("RGBA", (P, P), (0, 0, 0, 0))
    ImageDraw.Draw(edge).rounded_rectangle(
        [0, 0, P - 1, P - 1], radius=r,
        outline=(255, 255, 255, 38), width=max(1, round(P * 0.004)))
    plate = Image.alpha_composite(plate, edge)

    make_plate.layout = (round(top), round(top + ink_ai.size[1]),
                         round(top + ink_ai.size[1] + gap1),
                         round(y), round(y + ink_hub.size[1]))
    return plate


def make_icon(size):
    """按 macOS 图标网格合成：留白 + 投影 + 主体"""
    P = round(size * PLATE_RATIO)
    plate = make_plate(P)

    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))

    # 主体下方的柔和投影（Big Sur 风格：向下偏移、较大模糊）
    off = max(1, round(P * 0.012))
    sh = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    x0 = (size - P) // 2
    y0 = (size - P) // 2
    ImageDraw.Draw(sh).rounded_rectangle(
        [x0, y0 + off, x0 + P, y0 + P + off],
        radius=round(P * CORNER_RATIO), fill=(10, 14, 28, 85))
    sh = sh.filter(ImageFilter.GaussianBlur(max(1, P * 0.028)))
    canvas = Image.alpha_composite(canvas, sh)

    canvas.alpha_composite(plate, (x0, y0))
    return canvas


def main():
    ap = argparse.ArgumentParser(description="生成 AI HUB 的 macOS 图标")
    ap.add_argument("--size", type=int, default=1024, help="画布尺寸，默认 1024")
    ap.add_argument("--out", default=os.path.join(OUT_DIR, "aihub.icns"), help="输出 icns 路径")
    ap.add_argument("--keep-iconset", action="store_true", help="保留 .iconset 目录")
    args = ap.parse_args()

    os.makedirs(OUT_DIR, exist_ok=True)
    iconset = os.path.join(OUT_DIR, "aihub.iconset")
    if os.path.exists(iconset):
        shutil.rmtree(iconset)
    os.makedirs(iconset)

    master = make_icon(args.size)
    master_png = os.path.join(OUT_DIR, "aihub-1024.png")
    master.save(master_png)

    specs = [
        (16, "icon_16x16.png"), (32, "icon_16x16@2x.png"),
        (32, "icon_32x32.png"), (64, "icon_32x32@2x.png"),
        (128, "icon_128x128.png"), (256, "icon_128x128@2x.png"),
        (256, "icon_256x256.png"), (512, "icon_256x256@2x.png"),
        (512, "icon_512x512.png"), (1024, "icon_512x512@2x.png"),
    ]
    for px, name in specs:
        master.resize((px, px), Image.LANCZOS).save(os.path.join(iconset, name))

    subprocess.run(["iconutil", "-c", "icns", iconset, "-o", args.out], check=True)
    if not args.keep_iconset:
        shutil.rmtree(iconset)

    lay = getattr(make_plate, "layout", None)
    print("✓ 图标已生成：%s（%.1f KB）" % (os.path.relpath(args.out, ROOT),
                                          os.path.getsize(args.out) / 1024))
    print("  预览图：%s" % os.path.relpath(master_png, ROOT))
    print("  规格：主体占画布 %.1f%%，圆角 %.1f%%，含 10 个尺寸（16→1024）"
          % (PLATE_RATIO * 100, CORNER_RATIO * 100))
    if lay:
        ai_top, ai_bot, line_top, hub_top, hub_bot = lay
        ok = ai_bot < line_top < hub_top
        print("  排版：AI %s–%s | 分隔线 %s–%s | HUB %s–%s → %s"
              % (ai_top, ai_bot, line_top, line_top + 9, hub_top, hub_bot,
                 "✓ 无重叠" if ok else "✗ 重叠"))
        if not ok:
            sys.exit(1)


if __name__ == "__main__":
    main()
