#!/usr/bin/env bash
# 在本地模拟 GitHub Actions 各步骤，验证工作流能跑通
set -euo pipefail
cd "$(dirname "$0")/.."
export GITHUB_STEP_SUMMARY="$(mktemp)"
export GITHUB_REPOSITORY="zhupuya/ai-hub"
export SITE_URL=""

hr() { printf '\n\033[1;36m── %s ─────────────────────────\033[0m\n' "$1"; }
ok() { printf '\033[32m✓\033[0m %s\n' "$1"; }
bad() { printf '\033[31m✗\033[0m %s\n' "$1"; exit 1; }

hr "工作流 1 · 抓取 AI 资讯"

echo "→ 步骤：安装 Python（本地已有）"
python3 --version

echo "→ 步骤：抓取 RSS（python3 scripts/fetch_news.py --quiet）"
python3 scripts/fetch_news.py --quiet
ok "抓取完成"

echo "→ 步骤：校验生成结果"
node --check assets/js/news-feed.js
node -e '
global.window = {};
require("./assets/js/news-feed.js");
const F = window.AI_FEED;
if (!F || !Array.isArray(F.items)) { console.error("✗ AI_FEED 结构异常"); process.exit(1); }
const bad = F.items.filter((i) => !i.title || !i.date || !i.cat || !i.id);
if (bad.length) { console.error("✗ 有 " + bad.length + " 条缺少必填字段"); process.exit(1); }
const byLang = {};
F.items.forEach((i) => { byLang[i.lang || "?"] = (byLang[i.lang || "?"] || 0) + 1; });
console.log("✓ 校验通过：" + F.items.length + " 条，来源 " + F.sources.length + " 个");
console.log("  语言分布：" + JSON.stringify(byLang));
console.log("  抓取时间：" + F.updated);
const fs = require("fs");
fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,
  "### 抓取结果\n\n- 条目：**" + F.items.length + "** 条\n- 成功源：**" + F.sources.length + "** 个\n");
'
ok "校验通过"

echo "→ 步骤：提交变更（用 git status 模拟判断是否有 diff）"
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  git add -A
  if git diff --cached --quiet; then
    echo "  无变更，跳过提交"
  else
    echo "  有变更 → 线上会执行 commit + push"
    git reset -q
  fi
else
  echo "  尚未初始化 git 仓库，跳过（初始化后即可）
"
fi

hr "工作流 2 · 部署到 GitHub Pages"

echo "→ 步骤：生成 sitemap.xml 与 robots.txt"
OWNER="${GITHUB_REPOSITORY%%/*}"
REPO="${GITHUB_REPOSITORY##*/}"
if [ -n "${SITE_URL:-}" ]; then BASE="$SITE_URL"
elif [ "$REPO" = "$OWNER.github.io" ]; then BASE="https://$OWNER.github.io"
else BASE="https://$OWNER.github.io/$REPO"; fi
node scripts/build-sitemap.js "$BASE"
python3 -c "import xml.etree.ElementTree as ET; print('  XML 合法，URL 数:', len(ET.parse('sitemap.xml').getroot()))"
ok "sitemap 与 robots 生成成功"

echo "→ 步骤：上传站点文件（检查待上传内容）"
FILES=$(find . -type f -not -path "./.git/*" | wc -l | tr -d ' ')
SIZE=$(du -sh . 2>/dev/null | cut -f1)
echo "  将上传 $FILES 个文件，共 $SIZE"
[ -f index.html ] || bad "缺少 index.html"
[ -f en/index.html ] || bad "缺少 en/index.html"
[ -f .nojekyll ] || bad "缺少 .nojekyll（branch 模式部署必需）"
ok "站点文件齐全"

hr "工作流摘要（会显示在 Actions 运行页面）"
cat "$GITHUB_STEP_SUMMARY"

rm -f "$GITHUB_STEP_SUMMARY"
printf '\n\033[1;32m全部步骤模拟通过\033[0m\n'
