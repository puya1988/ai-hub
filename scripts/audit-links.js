#!/usr/bin/env node
/* ==========================================================================
   AI HUB · 可点击性审计
   --------------------------------------------------------------------------
   检查每个页面里「看起来能点、实际点不动」的东西：
     · 死链：href 为空 / "#" / javascript:
     · 卡片型条目：内部既没有 <a>，也没有 data-detail（点了没反应）
     · 伪装成按钮的 span.btn
     · 工具/模型等条目缺失的外链

   用法：
       npm i -D jsdom
       node scripts/audit-links.js            # 审计默认目录（仓库根）
       node scripts/audit-links.js .          # 显式指定

   退出码：发现无法点击的条目时为 1，便于接入 CI。
   ========================================================================== */

const path = require("path");
const fs = require("fs");

let JSDOM, VirtualConsole;
try {
  ({ JSDOM, VirtualConsole } = require("jsdom"));
} catch (e) {
  console.error("需要 jsdom：npm i -D jsdom");
  process.exit(2);
}

const root = process.argv[2] || path.resolve(__dirname, "..");

const SITES = [
  { dir: ".", lang: "中文站" },
  { dir: "en", lang: "English" }
];
const PAGES = ["index", "news", "models", "tools", "papers", "learn", "glossary", "timeline", "about"];

/* 各类「卡片型」条目选择器 */
const CARD_SELECTORS = [
  ".news-card",
  ".gloss-item",
  ".tl-item",
  "#modelGrid > .card",
  "#paperList > .card",
  "#toolGrid > .card"
];

function load(file) {
  return new Promise((resolve) => {
    const errors = [];
    const vc = new VirtualConsole();
    vc.on("jsdomError", (e) => errors.push(e.detail && e.detail.message ? e.detail.message : e.message));
    vc.on("error", (...a) => errors.push(a.join(" ")));
    ["warn", "log", "info"].forEach((k) => vc.on(k, () => {}));
    JSDOM.fromFile(file, {
      runScripts: "dangerously", resources: "usable",
      pretendToBeVisual: true, virtualConsole: vc
    }).then((dom) => {
      const w = dom.window;
      const done = () => setTimeout(() => resolve({ dom, w, errors }), 150);
      if (w.document.readyState === "complete") done();
      else w.addEventListener("load", done);
    });
  });
}

(async () => {
  let problems = 0, checked = 0;

  for (const site of SITES) {
    console.log("\n" + "═".repeat(70));
    console.log("  " + site.lang + "  (" + site.dir + "/)");
    console.log("═".repeat(70));

    for (const name of PAGES) {
      const file = path.join(root, site.dir, name + ".html");
      if (!fs.existsSync(file)) { console.log("\n── " + name + " 缺失"); problems++; continue; }
      const { dom, w, errors } = await load(file);
      const d = w.document;
      const issues = [];

      if (errors.length) issues.push("脚本错误：" + errors[0]);

      // 死链
      const anchors = Array.from(d.querySelectorAll("a"));
      const dead = anchors.filter((a) => {
        const h = (a.getAttribute("href") || "").trim();
        return !h || h === "#" || h.startsWith("javascript:");
      });
      if (dead.length) {
        issues.push("死链 " + dead.length + " 个，例如 \"" + dead[0].textContent.trim().slice(0, 26) + "\"");
      }

      // 卡片是否可点：内部有 <a>、自身是 <a>、或有 data-detail
      CARD_SELECTORS.forEach((sel) => {
        const els = Array.from(d.querySelectorAll(sel));
        if (!els.length) return;
        const deadCards = els.filter((el) =>
          el.tagName !== "A" && !el.querySelector("a") && !el.hasAttribute("data-detail"));
        checked += els.length;
        if (deadCards.length) {
          issues.push(sel + " 有 " + deadCards.length + "/" + els.length + " 个无法点击");
        }
      });

      // 伪装按钮
      const fake = d.querySelectorAll("span.btn").length;
      if (fake) issues.push("span.btn 假按钮 " + fake + " 个");

      if (issues.length) {
        problems += issues.length;
        console.log("\n✗ " + name + ".html");
        issues.forEach((x) => console.log("    · " + x));
      } else {
        console.log("✓ " + name + ".html");
      }
      dom.window.close();
    }
  }

  console.log("\n" + "─".repeat(70));
  if (problems) {
    console.log("✗ 共发现 " + problems + " 类问题（已检查 " + checked + " 个条目）");
    process.exit(1);
  }
  console.log("✓ 全部可点击，未发现死链（共检查 " + checked + " 个条目）");
})();
