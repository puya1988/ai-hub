#!/usr/bin/env bash
# ==========================================================================
#  AI HUB · 生成 macOS 桌面快捷方式（.app）
# --------------------------------------------------------------------------
#  用法：
#     bash scripts/make-desktop-shortcut.sh                  # 线上中文站 → 桌面
#     bash scripts/make-desktop-shortcut.sh --en             # 线上英文站
#     bash scripts/make-desktop-shortcut.sh --local          # 本地文件（离线可用）
#     bash scripts/make-desktop-shortcut.sh --url https://xxx --name "我的站"
#     bash scripts/make-desktop-shortcut.sh --dock           # 顺便放进 Dock
#
#  原理：用 osacompile 生成一个 AppleScript 小程序，替换图标并隐藏 Dock 图标，
#        双击后用默认浏览器打开网址。放在桌面或 Dock 都能用。
# ==========================================================================
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
URL="https://puya1988.github.io/ai-hub/"
NAME="AI HUB"
DEST="$HOME/Desktop"
ICNS="$ROOT/assets/icon/aihub.icns"
ADD_DOCK=0

while [ $# -gt 0 ]; do
  case "$1" in
    --en)     URL="https://puya1988.github.io/ai-hub/en/"; NAME="AI HUB EN"; shift ;;
    --local)  URL="file://$ROOT/index.html"; NAME="AI HUB 本地"; shift ;;
    --url)    URL="$2"; shift 2 ;;
    --name)   NAME="$2"; shift 2 ;;
    --dest)   DEST="$2"; shift 2 ;;
    --icns)   ICNS="$2"; shift 2 ;;
    --dock)   ADD_DOCK=1; shift ;;
    -h|--help) sed -n '2,20p' "$0"; exit 0 ;;
    *) echo "未知参数：$1" >&2; exit 2 ;;
  esac
done

APP="$DEST/$NAME.app"

echo "→ 目标：$APP"
echo "  打开：$URL"

# 图标不存在就先生成
if [ ! -f "$ICNS" ]; then
  echo "  图标缺失，正在生成…"
  python3 "$ROOT/scripts/make-icon.py" >/dev/null
fi

# 移除旧版本
[ -e "$APP" ] && rm -rf "$APP"

# 生成 AppleScript 小程序
osacompile -o "$APP" -e "open location \"$URL\""

# 替换图标（osacompile 默认图标名为 applet.icns，Info.plist 已引用它）
cp "$ICNS" "$APP/Contents/Resources/applet.icns"

# 隐藏 Dock 图标与菜单栏，让双击体验更接近「纯快捷方式」
PB=/usr/libexec/PlistBuddy
$PB -c "Delete :LSUIElement" "$APP/Contents/Info.plist" >/dev/null 2>&1 || true
$PB -c "Add :LSUIElement bool true" "$APP/Contents/Info.plist"

# 修改资源会让原签名失效，重新做一次 ad-hoc 签名，避免首次打开被拦
if command -v codesign >/dev/null 2>&1; then
  codesign --force --deep --sign - "$APP" >/dev/null 2>&1 && echo "  ✓ 已重新签名（ad-hoc）" || echo "  · 签名跳过（不影响使用）"
fi

# 刷新图标缓存
touch "$APP"
touch "$APP/Contents/Info.plist"

# 可选：放进 Dock
if [ "$ADD_DOCK" = "1" ]; then
  defaults write com.apple.dock persistent-apps -array-add "<dict><key>tile-data</key><dict><key>file-data</key><dict><key>_CFURLString</key><string>$APP</string><key>_CFURLStringType</key><integer>0</integer></dict></dict></dict>"
  killall Dock 2>/dev/null || true
  echo "  ✓ 已加入 Dock"
fi

echo ""
echo "✓ 已创建：$APP"
echo "  · 双击即可用默认浏览器打开"
echo "  · 想放进 Dock：把图标拖到 Dock 上即可"
echo "  · 删除：rm -rf \"$APP\""
echo ""
du -sh "$APP" | awk '{print "  体积："$1}'
