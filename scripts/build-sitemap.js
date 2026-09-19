#!/usr/bin/env node
/* ==========================================================================
   生成 sitemap.xml 与 robots.txt
   --------------------------------------------------------------------------
   用法：
       node scripts/build-sitemap.js                          # 自动嗅探（本地用占位域名）
       node scripts/build-sitemap.js https://aihub.example.com  # 指定站点根地址

   GitHub Actions 会在部署前用真实的 Pages 地址调用本脚本，
   因此 sitemap 里的 URL 始终指向线上地址。

   输出：
       sitemap.xml   —— 含中文站与英文站，带 hreflang 交叉标注
       robots.txt    —— 允许抓取，指向 sitemap
   ========================================================================== */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PAGES = ["index", "news", "models", "tools", "papers", "learn", "glossary", "timeline", "about"];

/* 各页面的抓取优先级与更新频率（首页最高，about 最低） */
const PRIORITY = {
  index: ["1.0", "daily"],
  news: ["0.9", "daily"],
  models: ["0.8", "weekly"],
  tools: ["0.8", "weekly"],
  glossary: ["0.7", "weekly"],
  learn: ["0.7", "monthly"],
  papers: ["0.6", "monthly"],
  timeline: ["0.5", "yearly"],
  about: ["0.3", "monthly"]
};

let base = process.argv[2] || process.env.SITE_URL || "";
if (!base) {
  console.warn("⚠ 未提供站点地址，使用占位域名 https://example.github.io/ai-hub");
  console.warn("  正式部署请在参数里传入真实地址，或设置 SITE_URL 环境变量。");
  base = "https://example.github.io/ai-hub";
}
base = base.replace(/\/+$/, "");          // 去掉末尾斜杠
if (!/^https?:\/\//.test(base)) base = "https://" + base;

const today = new Date().toISOString().slice(0, 10);

/* ------------------------------- sitemap ------------------------------- */
let urlset = "";
PAGES.forEach((name) => {
  const [prio, freq] = PRIORITY[name] || ["0.5", "monthly"];
  const zh = base + "/" + name + ".html";
  const en = base + "/en/" + name + ".html";
  urlset +=
    "  <url>\n" +
    "    <loc>" + zh + "</loc>\n" +
    '    <xhtml:link rel="alternate" hreflang="zh-CN" href="' + zh + '"/>\n' +
    '    <xhtml:link rel="alternate" hreflang="en" href="' + en + '"/>\n' +
    '    <xhtml:link rel="alternate" hreflang="x-default" href="' + zh + '"/>\n' +
    "    <lastmod>" + today + "</lastmod>\n" +
    "    <changefreq>" + freq + "</changefreq>\n" +
    "    <priority>" + prio + "</priority>\n" +
    "  </url>\n";
  urlset +=
    "  <url>\n" +
    "    <loc>" + en + "</loc>\n" +
    '    <xhtml:link rel="alternate" hreflang="zh-CN" href="' + zh + '"/>\n' +
    '    <xhtml:link rel="alternate" hreflang="en" href="' + en + '"/>\n' +
    '    <xhtml:link rel="alternate" hreflang="x-default" href="' + zh + '"/>\n' +
    "    <lastmod>" + today + "</lastmod>\n" +
    "    <changefreq>" + freq + "</changefreq>\n" +
    "    <priority>" + prio + "</priority>\n" +
    "  </url>\n";
});

const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n' +
  '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
  urlset +
  "</urlset>\n";

/* ------------------------------- robots ------------------------------- */
const robots =
  "# AI HUB · 智汇\n" +
  "# 允许所有爬虫抓取静态内容\n" +
  "User-agent: *\n" +
  "Allow: /\n" +
  "\n" +
  "# 抓取脚本与内部文档对搜索引擎无意义\n" +
  "Disallow: /scripts/\n" +
  "Disallow: /assets/js/README\n" +
  "\n" +
  "Sitemap: " + base + "/sitemap.xml\n";

fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(ROOT, "robots.txt"), robots);
console.log("✓ sitemap.xml（" + PAGES.length * 2 + " 条 URL）");
console.log("✓ robots.txt");
console.log("  站点根地址：" + base);
