#!/usr/bin/env node
/* ==========================================================================
   AI HUB · 数据时效巡检
   --------------------------------------------------------------------------
   检查仓库里带「数据截至」日期的内容是否已经过期，并把结论写成
   Markdown 报告（供 GitHub Actions 开 Issue 用）。

   用法：
       node scripts/check-freshness.js                    # 用默认阈值
       node scripts/check-freshness.js --report out.md    # 同时写报告文件
       node scripts/check-freshness.js --hardware 14      # 覆盖硬件阈值（天）
       node scripts/check-freshness.js --json             # 输出 JSON 便于程序处理

   退出码：
       0 = 全部新鲜
       1 = 有项目达到「提醒」阈值
       2 = 有项目达到「严重」阈值

   为什么需要它：AI 硬件迭代以月为单位，型号一旦过时，页面上的推荐就会
   误导人。靠人工记着去改不现实，所以让 CI 每周提醒一次。
   ========================================================================== */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

/* ------------------------------- 参数 ------------------------------- */
const argv = process.argv.slice(2);
const argOf = (name, def) => {
  const i = argv.indexOf("--" + name);
  return i !== -1 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : def;
};
const hasFlag = (name) => argv.includes("--" + name);

const OVERRIDE = {
  hardware: argOf("hardware", null) ? Number(argOf("hardware", null)) : null,
  content: argOf("content", null) ? Number(argOf("content", null)) : null,
  feed: argOf("feed", null) ? Number(argOf("feed", null)) : null
};

/* --------------------------- 巡检项定义 ---------------------------
   warn  = 达到此天数开始提醒
   stale = 达到此天数视为严重（页面已经开始误导人）
   ------------------------------------------------------------------ */
const CHECKS = [
  {
    id: "hardware",
    label: "硬件型号数据",
    warn: OVERRIDE.hardware || 30,
    stale: OVERRIDE.hardware ? Math.round(OVERRIDE.hardware * 1.5) : 45,
    files: [
      { file: "assets/js/hardware.zh.js", label: "中文" },
      { file: "assets/js/hardware.en.js", label: "英文" }
    ],
    field: "updated",
    why:
      "GPU 型号、显存容量与价格以月为单位变化。这份数据过期后，" +
      "「推荐配置」会变成过时建议，比没有更糟。",
    todo: [
      "查一轮消费级 GPU：是否已发布新一代（如 RTX 60 系），现役型号显存是否有变化",
      "查一轮笔记本 GPU：移动端显存上限是否变化（当前 24 GB）",
      "查数据中心卡：GB300 / B200 是否被 Rubin 取代，是否已有更新的加速卡",
      "查 AMD Instinct 与国产方案（昇腾 / 寒武纪 / 海光 / 摩尔线程）是否有新品",
      "核对预置测算方案里的采购价与云租单价是否仍在合理区间",
      "更新 `hardware.zh.js` 与 `hardware.en.js` 里的 `updated` 字段（两处必须一致）"
    ]
  },
  {
    id: "content",
    label: "站点内容数据",
    warn: OVERRIDE.content || 120,
    stale: OVERRIDE.content ? Math.round(OVERRIDE.content * 1.5) : 180,
    files: [
      { file: "assets/js/data.zh.js", label: "中文" },
      { file: "assets/js/data.en.js", label: "英文" }
    ],
    field: "updated",
    why: "资讯、模型库、术语等手工维护内容的整体新鲜度。",
    todo: [
      "更新 `meta.updated`（中英两处必须一致）",
      "检查模型库中是否有停产或被取代的型号",
      "补充过去几个月值得记录的行业节点到时间线"
    ]
  },
  {
    id: "feed",
    label: "自动抓取数据",
    warn: OVERRIDE.feed || 3,
    stale: OVERRIDE.feed ? Math.round(OVERRIDE.feed * 2) : 7,
    files: [{ file: "assets/js/news-feed.js", label: "抓取产物" }],
    field: "updated",
    why:
      "这个文件由 GitHub Actions 每天自动更新。如果它超过几天没变，" +
      "说明抓取任务很可能已经失败（源挂掉、网络问题、工作流被暂停）。",
    todo: [
      "打开 Actions 页面看「抓取 AI 资讯」最近一次运行是否失败",
      "检查 `scripts/feeds.json` 里的源是否仍可访问",
      "本地跑一次 `python3 scripts/fetch_news.py --check` 逐个源验证",
      "注意：GitHub 会在仓库 60 天无活动后暂停定时任务"
    ]
  }
];

/* ------------------------------- 工具 ------------------------------- */
function parseDate(raw) {
  if (!raw) return null;
  const s = String(raw).trim();
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);            // 2026-09-19 或 2026-09-19 08:48
  if (m) return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  m = s.match(/^(\d{4})-(\d{2})$/);                        // 2026-09 → 视为当月 1 日（保守，宁可早提醒）
  if (m) return new Date(Date.UTC(+m[1], +m[2] - 1, 1));
  return null;
}

function readField(file, field) {
  const p = path.join(ROOT, file);
  if (!fs.existsSync(p)) return { ok: false, err: "文件不存在" };
  const txt = fs.readFileSync(p, "utf8");
  // 先找 "field": "value"（JSON 风格），再找 field: "value"（JS 对象字面量）
  let m = txt.match(new RegExp('"' + field + '"\\s*:\\s*"([^"]+)"'));
  if (!m) m = txt.match(new RegExp(field + '\\s*:\\s*"([^"]+)"'));
  if (!m) return { ok: false, err: "未找到字段 " + field };
  return { ok: true, value: m[1] };
}

function daysBetween(a, b) {
  return Math.floor((b - a) / 86400000);
}

/* ------------------------------- 巡检 ------------------------------- */
const NOW = new Date();
const todayUTC = new Date(Date.UTC(NOW.getUTCFullYear(), NOW.getUTCMonth(), NOW.getUTCDate()));

const results = CHECKS.map((c) => {
  const readings = c.files.map((f) => {
    const r = readField(f.file, c.field);
    const d = r.ok ? parseDate(r.value) : null;
    return {
      ...f,
      raw: r.ok ? r.value : null,
      err: r.ok ? null : r.err,
      days: d ? daysBetween(d, todayUTC) : null
    };
  });

  const valid = readings.filter((r) => r.days !== null);
  const maxDays = valid.length ? Math.max.apply(null, valid.map((r) => r.days)) : null;
  const missing = readings.filter((r) => r.days === null);

  // 中英一致性：两个文件的 updated 必须相同
  const vals = readings.map((r) => r.raw).filter(Boolean);
  const inconsistent = vals.length > 1 && new Set(vals).size > 1;

  let level = "ok";
  if (maxDays === null) level = "error";
  else if (maxDays >= c.stale) level = "stale";
  else if (maxDays >= c.warn) level = "warn";

  return { ...c, readings, maxDays, missing, inconsistent, level };
});

/* ------------------------------- 输出 ------------------------------- */
const ICON = { ok: "✅", warn: "⚠️", stale: "🔴", error: "❓" };
const LEVEL_CN = { ok: "新鲜", warn: "需核对", stale: "已过期", error: "读取失败" };

if (hasFlag("json")) {
  console.log(JSON.stringify(results.map((r) => ({
    id: r.id, label: r.label, level: r.level, maxDays: r.maxDays,
    warn: r.warn, stale: r.stale, inconsistent: r.inconsistent,
    readings: r.readings.map((x) => ({ file: x.file, value: x.raw, days: x.days, err: x.err }))
  })), null, 2));
} else {
  console.log("\n数据时效巡检 · " + todayUTC.toISOString().slice(0, 10));
  console.log("─".repeat(64));
  results.forEach((r) => {
    const age = r.maxDays === null ? "n/a" : r.maxDays + " 天";
    console.log(
      "  " + ICON[r.level] + " " + r.label.padEnd(14) +
      String(age).padStart(8) + "   " + LEVEL_CN[r.level].padEnd(6) +
      "（阈值 " + r.warn + " / " + r.stale + " 天）"
    );
    r.readings.forEach((x) => {
      console.log("       · " + x.label.padEnd(6) +
        (x.err ? "✗ " + x.err : (x.raw || "-") + "  →  " + x.days + " 天前"));
    });
    if (r.inconsistent) console.log("       ⚠ 中英两个文件的日期不一致，需要对齐");
  });
  const worst = results.reduce((a, b) => {
    const rank = { ok: 0, warn: 1, stale: 2, error: 3 };
    return rank[b.level] > rank[a.level] ? b : a;
  }, { level: "ok" });
  console.log("─".repeat(64));
  console.log("  整体：" + ICON[worst.level] + " " + LEVEL_CN[worst.level] + "\n");
}

/* 报告文件（供 Actions 开 Issue） */
const stale = results.filter((r) => r.level === "warn" || r.level === "stale");
const errored = results.filter((r) => r.level === "error");

let report = "## 数据时效巡检报告\n\n";
report += "巡检日期：**" + todayUTC.toISOString().slice(0, 10) + "**\n\n";
report += "| 项目 | 数据日期 | 已过 | 状态 | 阈值 |\n| --- | --- | --- | --- | --- |\n";
results.forEach((r) => {
  const readings = r.readings
    .filter((x) => x.raw)
    .map((x) => x.label + " " + x.raw)
    .join(" / ") || "—";
  report += "| " + r.label + " | " + readings + " | " +
    (r.maxDays === null ? "n/a" : r.maxDays + " 天") + " | " +
    ICON[r.level] + " " + LEVEL_CN[r.level] + " | " +
    r.warn + " / " + r.stale + " 天 |\n";
});
report += "\n";

if (results.some((r) => r.inconsistent)) {
  report += "> ⚠️ 中英文数据文件里的日期不一致，请对齐。\n\n";
}

if (stale.length) {
  report += "### 需要处理\n\n";
  stale.forEach((r) => {
    report += "#### " + ICON[r.level] + " " + r.label + "（" + r.maxDays + " 天未更新）\n\n";
    report += r.why + "\n\n";
    report += "**核对清单：**\n\n";
    report += r.todo.map((t) => "- [ ] " + t).join("\n") + "\n\n";
  });
}

report += "---\n\n";
report += "<sub>本 Issue 由 <code>scripts/check-freshness.js</code> 自动生成 / 更新。" +
  "数据更新后下一次巡检会自动关闭它。</sub>\n";

const reportPath = argOf("report", null);
if (reportPath) {
  fs.writeFileSync(reportPath, report);
  console.log("报告已写入 " + reportPath);
}

if (hasFlag("json-only")) process.exit(0);
process.exit(errored.length ? 2 : stale.length ? (results.some((r) => r.level === "stale") ? 2 : 1) : 0);
