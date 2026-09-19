#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI HUB · RSS 资讯抓取器
=========================================================================
功能：读取 scripts/feeds.json 中配置的 RSS / Atom 源，抓取、清洗、去重、
      自动分类打标签，生成 assets/js/news-feed.js，供站点前端直接加载。

用法：
    python3 scripts/fetch_news.py                 # 正常抓取并写入
    python3 scripts/fetch_news.py --dry-run       # 只打印结果，不写文件
    python3 scripts/fetch_news.py --check         # 只检测各源是否可用
    python3 scripts/fetch_news.py --max 20        # 覆盖最大条目数
    python3 scripts/fetch_news.py --config x.json --out y.js

设计要点：
  · 仅使用 Python 标准库，无需 pip install；
  · 同时兼容 RSS 2.0（<item>）与 Atom（<entry>）；
  · 忽略命名空间，兼容各类变体；
  · 单源失败不影响整体，失败原因写入结果文件；
  · 输出 JS 而非 JSON，以便 file:// 协议下双击即可打开站点。

⚠️ 合规提示：抓取前请确认目标站点的 robots.txt、服务条款与版权要求。
   本脚本默认仅抓取标题、摘要与原文链接，不复制全文，并保留来源标注。
=========================================================================
"""

import argparse
import hashlib
import html
import json
import os
import re
import ssl
import sys
import time
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_CONFIG = os.path.join(ROOT, "scripts", "feeds.json")
DEFAULT_OUT = os.path.join(ROOT, "assets", "js", "news-feed.js")

TAG_RE = re.compile(r"<[^>]+>")
WS_RE = re.compile(r"[ \t\u3000]+")
NL_RE = re.compile(r"\n{2,}")


# -----------------------------------------------------------------------------
# 工具函数
# -----------------------------------------------------------------------------
def log(msg, quiet=False):
    if not quiet:
        print(msg, flush=True)


# -----------------------------------------------------------------------------
# SSL 证书上下文
#   macOS 上用 python.org 安装的 Python 常常没有系统根证书，导致
#   CERTIFICATE_VERIFY_FAILED。这里依次尝试：certifi → 系统证书包 → 默认。
# -----------------------------------------------------------------------------
_SSL_CTX = None
_SSL_HINTED = False


def ssl_context(insecure=False):
    global _SSL_CTX
    if _SSL_CTX is not None and not insecure:
        return _SSL_CTX
    if insecure:
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        return ctx
    try:
        import certifi                              # 优先：pip 装的证书包
        _SSL_CTX = ssl.create_default_context(cafile=certifi.where())
        return _SSL_CTX
    except Exception:
        pass
    for p in ("/etc/ssl/cert.pem",                       # macOS
              "/etc/ssl/certs/ca-certificates.crt",      # Debian/Ubuntu
              "/etc/pki/tls/certs/ca-bundle.crt",        # RHEL/CentOS
              "/usr/local/etc/openssl/cert.pem"):
        if os.path.exists(p):
            try:
                _SSL_CTX = ssl.create_default_context(cafile=p)
                return _SSL_CTX
            except Exception:
                continue
    _SSL_CTX = ssl.create_default_context()
    return _SSL_CTX


def ssl_hint(quiet=False, insecure=False):
    global _SSL_HINTED
    if quiet or insecure or _SSL_HINTED:
        return
    _SSL_HINTED = True
    log("\n  ┌─ 证书错误排查建议 ─────────────────────────────", quiet)
    log("  │ macOS + python.org 版的 Python 常缺少根证书，可选：", quiet)
    log("  │   1) pip3 install certifi             # 推荐，脚本会自动使用", quiet)
    log("  │   2) 运行安装包里的 Install Certificates.command", quiet)
    log("  │   3) python3 scripts/fetch_news.py --insecure   # 跳过校验（不推荐）", quiet)
    log("  └───────────────────────────────────────────────\n", quiet)


def localname(tag):
    """去掉 XML 命名空间前缀：{http://...}title -> title"""
    return tag.rsplit("}", 1)[-1].lower()


def strip_html(text):
    """去标签、解实体、压缩空白"""
    if not text:
        return ""
    text = re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", text, flags=re.I | re.S)
    text = re.sub(r"<br\s*/?>|</p>", " ", text, flags=re.I)
    text = TAG_RE.sub("", text)
    text = html.unescape(text)
    text = text.replace("\xa0", " ")
    text = WS_RE.sub(" ", text)
    text = NL_RE.sub("\n", text)
    return text.strip()


def parse_date(raw):
    """尽力解析各种日期格式，返回带时区的 datetime；失败返回 None"""
    if not raw:
        return None
    raw = raw.strip()
    # RFC 822: Tue, 15 Sep 2026 10:30:00 +0800
    try:
        dt = parsedate_to_datetime(raw)
        if dt:
            return dt if dt.tzinfo else dt.replace(tzinfo=timezone.utc)
    except Exception:
        pass
    # ISO 8601: 2026-09-15T10:30:00Z / 2026-09-15T10:30:00+08:00
    for fmt in ("%Y-%m-%dT%H:%M:%S%z", "%Y-%m-%dT%H:%M:%SZ", "%Y-%m-%dT%H:%M:%S",
                "%Y-%m-%d %H:%M:%S", "%Y-%m-%d", "%Y/%m/%d"):
        try:
            dt = datetime.strptime(raw.replace("Z", "+0000"), fmt)
            return dt if dt.tzinfo else dt.replace(tzinfo=timezone.utc)
        except Exception:
            continue
    return None


def norm_title(t):
    """标题归一化，用于去重"""
    return re.sub(r"[\s\W_]+", "", (t or "").lower())[:80]


def stable_id(*parts):
    h = hashlib.md5("|".join(parts).encode("utf-8", "ignore")).hexdigest()
    return "r" + h[:10]


def first_text(node, names):
    for child in node:
        if localname(child.tag) in names:
            txt = (child.text or "").strip()
            if txt:
                return txt
    return ""


def entry_link(node):
    """RSS: <link>url</link>；Atom: <link rel=alternate href=.../>"""
    for child in node:
        if localname(child.tag) != "link":
            continue
        href = child.get("href")
        rel = (child.get("rel") or "alternate").lower()
        if href and rel in ("alternate", ""):
            return href.strip()
        if child.text and child.text.strip():
            return child.text.strip()
    # 兜底：guid / id 可能是链接
    for child in node:
        if localname(child.tag) in ("guid", "id"):
            txt = (child.text or "").strip()
            if txt.startswith("http"):
                return txt
    return ""


def fetch(url, timeout, ua, retries=2, insecure=False):
    req = urllib.request.Request(url, headers={
        "User-Agent": ua,
        "Accept": "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    })
    last = None
    for attempt in range(retries + 1):
        try:
            with urllib.request.urlopen(req, timeout=timeout,
                                       context=ssl_context(insecure)) as resp:
                raw = resp.read()
                ctype = (resp.headers.get("Content-Type") or "").lower()
                return raw, ctype
        except Exception as e:            # noqa: BLE001
            last = e
            if attempt < retries:
                time.sleep(1.5 * (attempt + 1))
    raise last


def parse_feed(raw):
    """解析 RSS / Atom，返回条目节点列表"""
    root = ET.fromstring(raw)
    items = []
    for node in root.iter():
        if localname(node.tag) in ("item", "entry"):
            items.append(node)
    return items


# -----------------------------------------------------------------------------
# 分类与打标签
# -----------------------------------------------------------------------------
def classify(text, cat_rules, default="industry"):
    low = text.lower()
    best, best_score = default, 0
    for cat, words in cat_rules.items():
        score = 0
        for w in words:
            if w.lower() in low:
                score += 1
        if score > best_score:
            best, best_score = cat, score
    return best


def make_tags(text, tag_rules, lang, limit=3):
    low = text.lower()
    tags = []
    for tag, words in tag_rules.items():
        if any(w.lower() in low for w in words):
            tags.append(tag)
    tags = tags[:limit]
    tags.append("中文源" if lang == "zh" else "英文源")
    return tags


def is_ai_related(text, keywords):
    low = text.lower()
    for k in keywords:
        k = k.lower()
        # 纯 ASCII 关键词用单词边界，避免 "AI" 命中 "said"
        if k.isascii() and re.fullmatch(r"[a-z0-9.+#\- ]+", k):
            if re.search(r"(?<![a-z0-9])" + re.escape(k) + r"(?![a-z0-9])", low):
                return True
        elif k in low:
            return True
    return False


def hot_score(published, text):
    """热度 40–95：越新越高，命中热点词加成"""
    score = 52
    if published:
        age_h = (datetime.now(timezone.utc) - published).total_seconds() / 3600
        if age_h < 24:
            score += 22
        elif age_h < 72:
            score += 16
        elif age_h < 168:
            score += 10
        elif age_h < 720:
            score += 4
    hot_words = ["发布", "开源", "融资", "收购", "突破", "首个", "禁令", "监管", "launch",
                 "release", "open source", "raises", "acquire", "breakthrough", "ban",
                 "GPT", "Claude", "Gemini", "DeepSeek", "Llama", "Qwen", "NVIDIA"]
    score += min(12, sum(2 for w in hot_words if w.lower() in text.lower()))
    return max(40, min(95, score))


def read_time(text):
    n = len(re.findall(r"[\u4e00-\u9fff]", text)) + len(re.findall(r"[A-Za-z]+", text))
    return max(2, min(12, round(n / 260) + 1))


# -----------------------------------------------------------------------------
# 主流程
# -----------------------------------------------------------------------------
def build(config, args, quiet=False):
    st = config.get("settings", {})
    max_per_feed = args.max_per_feed or st.get("max_per_feed", 6)
    max_total = args.max or st.get("max_total", 36)
    fresh_days = st.get("fresh_days", 60)
    timeout = st.get("timeout", 20)
    retries = st.get("retries", 2)
    ua = st.get("user_agent", "Mozilla/5.0 (compatible; AI-HUB-FeedBot/1.0)")
    min_len = st.get("min_summary_len", 40)

    cat_rules = {k: v for k, v in config.get("categories", {}).items() if not k.startswith("_")}
    tag_rules = {k: v for k, v in config.get("tag_rules", {}).items() if not k.startswith("_")}
    ai_keywords = config.get("ai_keywords", [])

    cutoff = datetime.now(timezone.utc) - timedelta(days=fresh_days)
    collected, ok_sources, failed = [], [], []
    seen_titles, seen_links = set(), set()

    for feed in config.get("feeds", []):
        name, url = feed.get("name", "未命名"), feed.get("url", "")
        lang = feed.get("lang", "zh")
        only_ai = feed.get("only_ai", False)
        feed_ua = feed.get("user_agent") or ua
        log("→ 抓取 %-20s %s" % (name, url), quiet)
        try:
            raw, ctype = fetch(url, timeout, feed_ua, retries, getattr(args, "insecure", False))
            if b"<rss" not in raw[:2000] and b"<feed" not in raw[:2000] and b"<rdf" not in raw[:2000]:
                raise ValueError("返回内容不是 RSS/Atom（可能是网页或需登录）：%s" % ctype)
            nodes = parse_feed(raw)
            if not nodes:
                log("   ⚠ 0 条（该源当前可能无更新，如 arXiv 周末不发布）", quiet)
                ok_sources.append(name)
                continue

            kept = 0
            for node in nodes:
                if kept >= max_per_feed:
                    break
                title = strip_html(first_text(node, ("title",)))
                if not title:
                    continue
                link = entry_link(node)
                desc = strip_html(first_text(node, ("description", "summary", "content", "encoded")))
                pub = parse_date(first_text(node, ("pubdate", "published", "updated", "date", "created")))
                if pub and pub < cutoff:
                    continue

                blob = title + " " + desc
                if only_ai and not is_ai_related(blob, ai_keywords):
                    continue

                nt = norm_title(title)
                nl = link.split("?")[0].rstrip("/").lower() if link else ""
                if nt in seen_titles or (nl and nl in seen_links):
                    continue
                seen_titles.add(nt)
                if nl:
                    seen_links.add(nl)

                if len(desc) < min_len:
                    desc = (desc + " " + title).strip() if desc else title
                if len(desc) > 200:
                    desc = desc[:197].rstrip() + "…"

                date_str = (pub.astimezone(timezone.utc) if pub else datetime.now(timezone.utc)).strftime("%Y-%m-%d")
                collected.append({
                    "id": stable_id(name, link or title),
                    "auto": True,
                    "featured": False,
                    "cat": classify(blob, cat_rules),
                    "date": date_str,
                    "source": name,
                    "lang": lang,
                    "title": title,
                    "summary": desc,
                    "tags": make_tags(blob, tag_rules, lang),
                    "readTime": read_time(blob),
                    "hot": hot_score(pub, blob),
                    "link": link,
                })
                kept += 1

            ok_sources.append(name)
            log("   ✓ 收录 %d 条" % kept, quiet)
        except Exception as e:                       # noqa: BLE001
            failed.append({"name": name, "error": "%s: %s" % (type(e).__name__, e)})
            log("   ✗ 失败：%s" % e, quiet)
            if "CERTIFICATE_VERIFY_FAILED" in str(e):
                ssl_hint(quiet, getattr(args, "insecure", False))

    # 排序：日期新 → 热度高
    collected.sort(key=lambda x: (x["date"], x["hot"]), reverse=True)
    collected = collected[:max_total]

    return {
        "updated": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "generator": "scripts/fetch_news.py",
        "sources": ok_sources,
        "failed": failed,
        "items": collected,
    }


def existing_item_count(path):
    """统计已有输出文件里的条目数，用于防止空结果覆盖好数据"""
    if not os.path.exists(path):
        return 0
    try:
        with open(path, "r", encoding="utf-8") as f:
            txt = f.read()
        m = re.search(r'"items"\s*:\s*\[', txt)
        if not m:
            return 0
        return txt.count('"id":', m.end())
    except Exception:
        return 0


def write_js(result, out_path):
    body = json.dumps(result, ensure_ascii=False, indent=2)
    # 缩进对齐一下，读起来更舒服
    body = "\n".join(("  " + line) if i else line for i, line in enumerate(body.split("\n")))
    js = (
        "/* ==========================================================================\n"
        "   AI HUB · 自动更新数据（RSS 抓取产物）\n"
        "   --------------------------------------------------------------------------\n"
        "   ⚠ 本文件由 scripts/fetch_news.py 自动生成，请勿手工编辑。\n"
        "   抓取时间：%s\n"
        "   成功源：%d 个    失败源：%d 个    条目：%d 条\n"
        "   重新生成：python3 scripts/fetch_news.py\n"
        "   ========================================================================== */\n\n"
        "window.AI_FEED = %s;\n"
        % (result["updated"], len(result["sources"]), len(result["failed"]), len(result["items"]), body)
    )
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(js)
    return len(js)


def main():
    ap = argparse.ArgumentParser(description="AI HUB RSS 资讯抓取器")
    ap.add_argument("--config", default=DEFAULT_CONFIG, help="配置文件路径")
    ap.add_argument("--out", default=DEFAULT_OUT, help="输出 JS 路径")
    ap.add_argument("--max", type=int, help="覆盖最大总条目数")
    ap.add_argument("--max-per-feed", type=int, dest="max_per_feed", help="覆盖单源最大条目数")
    ap.add_argument("--dry-run", action="store_true", help="只打印，不写文件")
    ap.add_argument("--check", action="store_true", help="只检测源是否可用")
    ap.add_argument("--force", action="store_true", help="即使本次 0 条也覆盖输出文件（默认会保留旧数据）")
    ap.add_argument("--insecure", action="store_true", help="跳过 SSL 证书校验（不推荐，仅用于本地临时排查）")
    ap.add_argument("--quiet", action="store_true", help="减少输出")
    args = ap.parse_args()

    with open(args.config, "r", encoding="utf-8") as f:
        config = json.load(f)

    log("AI HUB 资讯抓取开始 · %s" % datetime.now().strftime("%Y-%m-%d %H:%M:%S"), args.quiet)
    result = build(config, args, quiet=args.quiet)

    log("\n抓取完成：成功 %d 源 / 失败 %d 源，共 %d 条"
        % (len(result["sources"]), len(result["failed"]), len(result["items"])), args.quiet)
    if result["failed"]:
        for f_ in result["failed"]:
            log("  ✗ %s — %s" % (f_["name"], f_["error"]), args.quiet)

    if args.check:
        return 0

    if args.dry_run:
        for it in result["items"][:12]:
            log("  [%s] %s (%s)" % (it["cat"], it["title"][:56], it["source"]), args.quiet)
        log("  …（--dry-run 未写入文件）", args.quiet)
        return 0

    # 全部源都失败：返回非零退出码，让 CI 变红以便及时发现
    if not result["sources"]:
        log("\n✗ 所有数据源均抓取失败，未修改任何文件（请检查网络或各源状态）", args.quiet)
        return 2

    # 本次 0 条且旧文件有数据：保留旧数据，避免把页面清空
    if not result["items"] and not args.force:
        prev = existing_item_count(args.out)
        if prev:
            log("\n⚠ 本次未抓到任何条目，已保留原有的 %d 条，不覆盖文件。" % prev, args.quiet)
            log("   确认要清空请加 --force 参数。", args.quiet)
            return 0

    size = write_js(result, args.out)
    log("已写入 %s（%.1f KB）" % (os.path.relpath(args.out, ROOT), size / 1024), args.quiet)
    log("提示：刷新浏览器即可看到新条目。", args.quiet)
    return 0


if __name__ == "__main__":
    sys.exit(main())
