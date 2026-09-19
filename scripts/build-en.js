#!/usr/bin/env node
/* ==========================================================================
   生成 en/ 英文站点页面
   --------------------------------------------------------------------------
   用法：node scripts/build-en.js
   优点：head / 头部 / 页脚 / 脚本引用只写一次，新增语言时改一下 lang 与文案即可。
   生成结果：en/index.html, en/news.html, ... （勿手工编辑，改本文件后重新生成）
   ========================================================================== */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "en");
const LANG = "en";          // <html lang>
const DATA = "data.en.js";  // 该语言的数据文件

/* ------------------------------- 页面骨架 ------------------------------- */
function shell({ page, title, desc, main }) {
  return `<!DOCTYPE html>
<!-- ⚠ 本文件由 scripts/build-en.js 自动生成，请勿手工编辑；改脚本后运行 node scripts/build-en.js 重新生成 -->
<html lang="${LANG}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="author" content="AI HUB">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<link rel="alternate" hreflang="zh-CN" href="../${page === "home" ? "index" : page}.html">
<link rel="alternate" hreflang="en" href="${page === "home" ? "index" : page}.html">
<link rel="alternate" hreflang="x-default" href="../${page === "home" ? "index" : page}.html">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='24' fill='%234f46e5'/%3E%3Ctext y='72' x='50' text-anchor='middle' font-size='62' font-family='sans-serif' font-weight='bold' fill='white'%3EA%3C/text%3E%3C/svg%3E">
<script>/* 提前应用主题与配色，避免首屏闪烁 */(function(){var e=document.documentElement;try{var k=localStorage.getItem("aihub-theme");var d=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;e.setAttribute("data-theme",(k==="dark"||k==="light")?k:(d?"dark":"light"));var a=localStorage.getItem("aihub-accent");if(a&&a!=="indigo")e.setAttribute("data-accent",a);}catch(err){e.setAttribute("data-theme","light");}})();</script>
<link rel="stylesheet" href="../assets/css/style.css">
</head>
<body data-page="${page}">

<div id="site-header"></div>

<main>
${main}
</main>

<div id="site-footer"></div>
<script src="../assets/js/i18n.js"></script>
<script src="../assets/js/${DATA}"></script>
<script src="../assets/js/hardware.${LANG}.js"></script>
<script src="../assets/js/news-feed.js"></script>
<script src="../assets/js/app.js"></script>
</body>
</html>
`;
}

const page = (title, desc, main) => ({ title, desc, main });

/* ------------------------------- 各页面内容 ------------------------------- */
const PAGES = {};

/* ============ index ============ */
PAGES["index"] = { page: "home", ...page(
  "AI HUB — AI news, models, tools and knowledge in one place",
  "AI HUB aggregates AI news, model profiles, a curated tool directory, landmark papers, a learning path and a glossary — all in one static site.",
`
  <section class="hero">
    <div class="container">
      <div class="hero-eyebrow">
        <span class="dot dot-live" style="color:var(--ok)"></span>
        Updated <b id="heroUpdated">2026-09-19</b> · <b>9</b> subject areas · <b>8</b> sections
      </div>
      <h1>The whole <span class="grad">AI landscape</span><br>in a single site</h1>
      <p class="hero-lead">
        News, model profiles, a tool directory, research papers, a learning path and a glossary —
        everything you need to go from understanding the concepts to shipping something real.
      </p>

      <form class="hero-search" id="heroSearch" role="search">
        <svg class="hs-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.2-3.2"/></svg>
        <input id="heroSearchInput" type="search" placeholder="Search models, tools, glossary, papers…" autocomplete="off" aria-label="Site search">
        <button class="btn btn-primary hs-btn" type="submit">Search</button>
      </form>

      <div class="hero-tags">
        <span class="label">Popular:</span>
        <a class="tag-pill" href="news.html?cat=model">Releases</a>
        <a class="tag-pill" href="models.html">Open weights</a>
        <a class="tag-pill" href="tools.html">AI tools</a>
        <a class="tag-pill" href="glossary.html">Glossary</a>
        <a class="tag-pill" href="learn.html">Learning path</a>
        <a class="tag-pill" href="papers.html">Landmark papers</a>
      </div>

      <div class="stat-bar mt-32" id="statBar"></div>
    </div>
  </section>

  <section class="section" id="news">
    <div class="container container-wide">
      <div id="featuredNews" class="grid grid-3"></div>
      <div class="row-between mt-32 mb-24">
        <div>
          <div class="sec-eyebrow">Latest</div>
          <h2 style="font-size:24px">Recent highlights, ranked by heat</h2>
        </div>
        <a class="link-more" href="news.html">Go to the news hub
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
      <div id="featuredSide" class="grid grid-2"></div>
    </div>
  </section>

  <section class="section-sm">
    <div class="container container-wide">
      <div class="sec-head">
        <div>
          <div class="sec-eyebrow">Subject areas</div>
          <h2>Nine directions, one place</h2>
          <p>From model releases to policy, from compute hardware to real-world adoption — jump straight to what you care about.</p>
        </div>
      </div>
      <div id="catGrid" class="grid grid-auto-sm"></div>
    </div>
  </section>

  <section class="section" style="background:var(--surface-2);border-block:1px solid var(--border)">
    <div class="container container-wide">
      <div class="sec-head">
        <div>
          <div class="sec-eyebrow">Model library</div>
          <h2>Capabilities at a glance</h2>
          <p>Open weights and closed APIs side by side, with parameter counts, context length, modalities and indicative pricing.</p>
        </div>
        <a class="link-more" href="models.html">Open the model library
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
      <div id="modelTop" class="grid grid-3"></div>
    </div>
  </section>

  <section class="section">
    <div class="container container-wide">
      <div class="sec-head">
        <div>
          <div class="sec-eyebrow">Tools</div>
          <h2>Editor's picks you can use today</h2>
          <p>Chat, coding, image, video, office, research, agents and self-hosting — organised by what you are actually trying to do.</p>
        </div>
        <a class="link-more" href="tools.html">Browse all tools
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
      <div id="toolTop" class="grid grid-3"></div>
    </div>
  </section>

  <section class="section" style="background:var(--surface-2);border-block:1px solid var(--border)">
    <div class="container container-wide">
      <div class="sec-head">
        <div>
          <div class="sec-eyebrow">Learning path</div>
          <h2>Six stages from zero to shipped</h2>
          <p>Each stage lists the concrete skills and the resources that get you there. Follow it and you will not get lost.</p>
        </div>
        <a class="link-more" href="learn.html">See the full roadmap
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
      <div id="roadPreview" class="roadmap"></div>
    </div>
  </section>

  <section class="section">
    <div class="container container-wide">
      <div class="sec-head">
        <div>
          <div class="sec-eyebrow">Glossary</div>
          <h2>Understand the headlines faster</h2>
          <p>One-sentence explanations with the original term, so papers and foreign coverage stop being a wall of jargon.</p>
        </div>
        <a class="link-more" href="glossary.html">Open the glossary
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
      <div id="glossPreview" class="grid grid-4"></div>
    </div>
  </section>

  <section class="section-sm" style="background:var(--surface-2);border-block:1px solid var(--border)">
    <div class="container container-wide">
      <div class="sec-head">
        <div>
          <div class="sec-eyebrow">Hardware</div>
          <h2 style="font-size:24px">What to buy depends on who you are</h2>
          <p>The same model runs on a desk, in a rack or beside a production line under completely different constraints. Guidance across both axes: who, and where.</p>
        </div>
        <a class="link-more" href="hardware.html">Open the hardware guide
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
      <div id="hwTeaser" class="grid grid-3"></div>
    </div>
  </section>

  <section class="section-sm">
    <div class="container">
      <div class="card" style="padding:40px;text-align:center;background:linear-gradient(135deg,var(--brand),var(--brand-2));border:0;color:#fff">
        <h2 style="font-size:clamp(21px,2.6vw,29px);color:#fff">Start exploring</h2>
        <p style="margin:14px auto 26px;max-width:56ch;color:rgba(255,255,255,.88);font-size:15px">
          Whether you are a student taking the first step, an engineer choosing a model,
          or someone tracking the industry — there is an entry point for you.
        </p>
        <div class="row gap-12 wrap" style="justify-content:center">
          <a class="btn btn-lg" style="background:#fff;color:var(--brand);border-color:transparent;font-weight:700" href="news.html">Read the latest</a>
          <a class="btn btn-lg" style="background:rgba(255,255,255,.16);color:#fff;border-color:rgba(255,255,255,.35)" href="learn.html">Start learning</a>
        </div>
      </div>
    </div>
  </section>
`) };

/* ============ news ============ */
PAGES["news"] = { page: "news", ...page(
  "AI News — releases, industry, research and policy | AI HUB",
  "Aggregated AI news covering model releases, industry moves, research, policy, funding, adoption, compute and open source.",
`
  <section class="section-sm" style="padding-top:44px">
    <div class="container container-wide">
      <div class="sec-head" style="margin-bottom:22px">
        <div>
          <div class="sec-eyebrow">News hub</div>
          <h1 style="font-size:clamp(24px,3vw,34px)">AI news</h1>
          <p>Filter by category, search by keyword, sort by heat or date — find what matters quickly.</p>
        </div>
        <div class="result-count" id="newsCount"></div>
      </div>

      <div class="chips mb-16" id="catChips"></div>

      <div class="filter-bar">
        <div class="field">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.2-3.2"/></svg>
          <input type="search" id="newsSearch" placeholder="Search titles, summaries, tags…">
        </div>
        <select class="control" id="newsSort">
          <option value="hot">Most popular</option>
          <option value="new">Newest first</option>
          <option value="old">Oldest first</option>
          <option value="read">Shortest read</option>
        </select>
        <span class="tiny dim" style="margin-left:auto">Tip: press <code class="inline">/</code> to open site-wide search</span>
      </div>

      <div class="grid grid-3" id="newsList"></div>
      <div class="pager" id="newsPager"></div>

      <div class="notice mt-32" id="feedStatus"></div>
      <div class="notice mt-16">
        <b>About the sources:</b> items tagged “Auto” are fetched by
        <code class="inline">scripts/fetch_news.py</code> from public RSS feeds. Only the title, summary
        and a link to the original are stored; all rights remain with the original publisher, and clicking
        a title opens the source. Untagged items come from the local curated dataset
        (<code class="inline">assets/js/data.en.js</code>, demo data). If you plan to run this publicly,
        check each source's terms first.
      </div>
    </div>
  </section>
`) };

/* ============ models ============ */
PAGES["models"] = { page: "models", ...page(
  "Model library — parameters, context, modalities compared | AI HUB",
  "Profiles of the leading large language and multimodal models with parameter counts, context windows, modalities, licences and indicative pricing.",
`
  <section class="section-sm" style="padding-top:44px">
    <div class="container container-wide">
      <div class="sec-head" style="margin-bottom:22px">
        <div>
          <div class="sec-eyebrow">Model library</div>
          <h1 style="font-size:clamp(24px,3vw,34px)">Large model profiles</h1>
          <p>Parameters, context length, modalities, licence and price — the facts you need to shortlist quickly.</p>
        </div>
        <div class="result-count" id="modelCount"></div>
      </div>

      <div class="grid grid-3 mb-16">
        <div class="card card-pad-sm">
          <div class="badge badge-ok">Open weights</div>
          <h3 class="card-title mt-12" style="font-size:15px">Data must stay in-house</h3>
          <p class="small muted mt-8">Self-host an open model: quantise it, fine-tune it, keep data on your own infrastructure — but you own the ops and compute bill.</p>
        </div>
        <div class="card card-pad-sm">
          <div class="badge badge-warn">Closed API</div>
          <h3 class="card-title mt-12" style="font-size:15px">Best capability, fastest launch</h3>
          <p class="small muted mt-8">Call a frontier API: higher ceiling, no operations work, but metered pricing and a data-compliance review.</p>
        </div>
        <div class="card card-pad-sm">
          <div class="badge badge-brand">Hybrid</div>
          <h3 class="card-title mt-12" style="font-size:15px">Tiered routing (recommended)</h3>
          <p class="small muted mt-8">Send easy requests to a cheap small model and route the hard ones to a flagship. Total cost usually drops sharply.</p>
        </div>
      </div>

      <div class="notice mb-24">
        <b>💡 Side-by-side comparison:</b> click “<b>Compare</b>” on a card (or tick the boxes in table view)
        to select up to <b>4</b> models. A comparison bar appears at the bottom — open it for a full
        attribute-by-attribute table with the best value highlighted, and copy it as Markdown.
        Your selection is remembered in this browser.
      </div>

      <div class="filter-bar">
        <div class="field">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.2-3.2"/></svg>
          <input type="search" id="modelSearch" placeholder="Search models, vendors, capabilities…">
        </div>
        <select class="control" id="modelLicense">
          <option value="all">All licences</option>
          <option value="open">Open weights</option>
          <option value="closed">Closed API</option>
        </select>
        <select class="control" id="modelOrg"><option value="all">All vendors</option></select>
        <select class="control" id="modelSort">
          <option value="score">Overall score</option>
          <option value="name">Name</option>
          <option value="org">Vendor</option>
        </select>
        <div class="row gap-6" style="margin-left:auto">
          <button class="chip active" data-view="card">Cards</button>
          <button class="chip" data-view="table">Table</button>
        </div>
      </div>

      <div class="grid grid-3" id="modelGrid"></div>
      <div class="cmp-bar" id="cmpBar" aria-live="polite"></div>
      <div class="cmp-bar-spacer"></div>

      <div class="notice mt-32">
        <b>How to read this:</b> the “overall score” is a reference indicator (out of 100) compiled from
        public benchmarks, community feedback and practical availability. It is not an authoritative ranking.
        Parameters, prices and capabilities change quickly between releases — always check the official docs.
        Model and company names are trademarks of their respective owners.
      </div>
    </div>
  </section>
`) };

/* ============ tools ============ */
PAGES["tools"] = { page: "tools", ...page(
  "AI tools directory — chat, coding, image, video, agents | AI HUB",
  "A curated AI tool directory covering chat assistants, coding, image and video generation, office, research, agents and self-hosting.",
`
  <section class="section-sm" style="padding-top:44px">
    <div class="container container-wide">
      <div class="sec-head" style="margin-bottom:22px">
        <div>
          <div class="sec-eyebrow">Tool directory</div>
          <h1 style="font-size:clamp(24px,3vw,34px)">Curated AI tools</h1>
          <p>Grouped by use case, with pricing shape and key characteristics noted so you waste less time.</p>
        </div>
        <div class="result-count" id="toolCount"></div>
      </div>

      <div class="chips mb-16" id="toolChips"></div>

      <div class="filter-bar">
        <div class="field">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.2-3.2"/></svg>
          <input type="search" id="toolSearch" placeholder="Search tool names, vendors, use cases…">
        </div>
        <span class="tiny dim" style="margin-left:auto">Prices and free tiers change often — check the vendor site</span>
      </div>

      <div class="grid grid-3" id="toolGrid"></div>

      <div class="grid grid-2 mt-32">
        <div class="card">
          <div class="sec-eyebrow">Getting started</div>
          <h3 class="card-title">New to AI — where do I begin?</h3>
          <ol class="step-list mt-12">
            <li><b>1.</b> Start with one general assistant (ChatGPT, Claude, Gemini, DeepSeek) and get used to how you ask questions.</li>
            <li><b>2.</b> Hand over the single most time-consuming thing you do — a weekly report, a spreadsheet formula, a pile of documents.</li>
            <li><b>3.</b> Switch to a citation-first AI search (Perplexity, NotebookLM) when you need to verify facts.</li>
            <li><b>4.</b> Add an IDE-level assistant (Cursor, Copilot, Windsurf) only when you have code to write.</li>
            <li><b>5.</b> If privacy matters, move to a local setup (Ollama, LM Studio, Open WebUI).</li>
          </ol>
        </div>
        <div class="card">
          <div class="sec-eyebrow">Going further</div>
          <h3 class="card-title">Wiring AI into a real system?</h3>
          <ol class="step-list mt-12">
            <li><b>1.</b> Define the use case and the evaluation metric (accuracy, latency, cost per call).</li>
            <li><b>2.</b> Prototype with Dify, LangChain or LlamaIndex to validate the idea cheaply.</li>
            <li><b>3.</b> Add a vector store and a reranker to build the retrieval layer (RAGFlow, AnythingLLM).</li>
            <li><b>4.</b> Put an AI gateway in front for routing, rate limits and cost accounting.</li>
            <li><b>5.</b> Instrument with something like Langfuse, then scale once you can measure it.</li>
          </ol>
        </div>
      </div>

      <div class="notice mt-24">
        <b>Disclaimer:</b> this directory is informational only and we have no commercial relationship with
        the listed products. We do not guarantee the availability, security or output accuracy of any
        third-party service. Evaluate privacy and compliance before sending them your data.
      </div>
    </div>
  </section>
`) };

/* ============ papers ============ */
PAGES["papers"] = { page: "papers", ...page(
  "Research papers and conferences — Transformer, RAG, RLHF, diffusion | AI HUB",
  "Must-read AI papers and major conference information, from Attention Is All You Need through to modern reasoning and diffusion work.",
`
  <section class="section-sm" style="padding-top:44px">
    <div class="container container-wide">
      <div class="sec-head" style="margin-bottom:22px">
        <div>
          <div class="sec-eyebrow">Research</div>
          <h1 style="font-size:clamp(24px,3vw,34px)">Papers and academic resources</h1>
          <p>The landmark papers in rough chronological order, plus where the field publishes.</p>
        </div>
        <div class="result-count" id="paperCount"></div>
      </div>

      <div class="filter-bar">
        <div class="field">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.2-3.2"/></svg>
          <input type="search" id="paperSearch" placeholder="Search titles, authors, topics…">
        </div>
      </div>
      <div class="chips mb-24" id="paperTags"></div>

      <div class="grid grid-2" id="paperList"></div>

      <div class="sec-head mt-32">
        <div>
          <div class="sec-eyebrow">Conferences</div>
          <h2 style="font-size:22px">Where the work gets published</h2>
          <p>Click a column header to sort.</p>
        </div>
      </div>
      <div id="confTable"></div>

      <div class="grid grid-2 mt-32">
        <div class="card">
          <div class="sec-eyebrow">Method</div>
          <h3 class="card-title">How to read an AI paper efficiently</h3>
          <ol class="step-list mt-12">
            <li><b>Pass 1 (5 min):</b> title, abstract, figures, conclusion — what problem, how well does it work?</li>
            <li><b>Pass 2 (30 min):</b> the method — data, architecture, loss, experimental setup.</li>
            <li><b>Pass 3 (1 h+):</b> re-derive the key equations, question the assumptions, ask if it transfers to your setting.</li>
            <li><b>Take notes:</b> one sentence on the core idea, the key trick and what you can reuse. More useful than copying formulas.</li>
            <li><b>Read the code:</b> the official implementation or a good reproduction. Many details never make it into the paper.</li>
          </ol>
        </div>
        <div class="card">
          <div class="sec-eyebrow">Resources</div>
          <h3 class="card-title">Where to find papers and code</h3>
          <ul class="step-list mt-12">
            <li>arXiv — preprints, first stop (cs.CL / cs.CV / cs.LG)</li>
            <li>Papers with Code — papers plus implementations and leaderboards</li>
            <li>ACL Anthology — free NLP paper archive</li>
            <li>OpenReview — public reviews and discussion for ICLR and NeurIPS</li>
            <li>Google Scholar / Semantic Scholar — citations and related work</li>
            <li>Hugging Face Papers — daily trending papers with discussion</li>
          </ul>
          <p class="small dim mt-16">Note the difference between a preprint and a peer-reviewed publication: the reliability of the claims is not the same.</p>
        </div>
      </div>
    </div>
  </section>
`) };

/* ============ learn ============ */
PAGES["learn"] = { page: "learn", ...page(
  "AI learning path — from zero to production | AI HUB",
  "A structured AI learning path: maths and programming, machine learning, large model internals, RAG and agents, serving, and frontier specialisation, with courses and books.",
`
  <section class="section-sm" style="padding-top:44px">
    <div class="container container-wide">
      <div class="sec-head" style="margin-bottom:26px">
        <div>
          <div class="sec-eyebrow">Learning path</div>
          <h1 style="font-size:clamp(24px,3vw,34px)">From zero to shipping</h1>
          <p>Six stages with concrete skill checklists and resources. Do not skip ahead — but do not get stuck
          in maths forever either. Building while you learn is much faster.</p>
        </div>
      </div>

      <div class="roadmap" id="roadmap"></div>

      <div class="sec-head mt-32" id="prompt">
        <div>
          <div class="sec-eyebrow">Prompt engineering</div>
          <h2 style="font-size:24px">Eight principles that pay off fastest</h2>
          <p>The highest return-on-effort skill here: no training required, and output quality improves immediately.</p>
        </div>
      </div>
      <div class="grid grid-2">
        <div id="promptList" data-single="true"></div>
        <div>
          <div class="card">
            <div class="row-between mb-12">
              <h3 class="card-title">A structured template you can copy</h3>
              <button class="btn btn-sm" id="copyPrompt">Copy template</button>
            </div>
            <pre class="code" id="promptCode"></pre>
          </div>
          <div class="notice mt-16">
            The template works because it does three things at once: <b>constrains the information
            boundary</b> (use only the supplied material), <b>forces structured output</b> (JSON with a
            schema), and <b>makes uncertainty explicit</b> (the <code class="inline">missing</code> field).
            In a RAG system this measurably reduces hallucination and keeps downstream parsing reliable.
          </div>
        </div>
      </div>

      <div class="sec-head mt-32">
        <div>
          <div class="sec-eyebrow">Courses</div>
          <h2 style="font-size:24px">Structured courses</h2>
          <p>Pick courses with programming assignments. Watching videos without writing code is not learning.</p>
        </div>
      </div>
      <div class="grid grid-4" id="courseList"></div>

      <div class="sec-head mt-32">
        <div>
          <div class="sec-eyebrow">Books</div>
          <h2 style="font-size:24px">Textbooks worth revisiting</h2>
        </div>
      </div>
      <div class="grid grid-3" id="bookList"></div>

      <div class="grid grid-2 mt-32">
        <div class="card">
          <div class="sec-eyebrow">Pitfalls</div>
          <h3 class="card-title">Five ways people waste time learning AI</h3>
          <ol class="step-list mt-12">
            <li><b>Collecting instead of building:</b> 50 bookmarked courses, no code written. Finish one.</li>
            <li><b>Maths anxiety:</b> three months of analysis before touching a model. Learn to use it first, then fill in the theory.</li>
            <li><b>Never running a training loop:</b> until you have, you cannot feel how much data quality dominates.</li>
            <li><b>Ignoring engineering:</b> most of the value in a real system lives in data pipelines, evaluation and serving.</li>
            <li><b>Chasing every release:</b> new models appear weekly, but the fundamentals — attention, optimisation, alignment — change slowly.</li>
          </ol>
        </div>
        <div class="card">
          <div class="sec-eyebrow">Self-assessment</div>
          <h3 class="card-title">Which stage are you at?</h3>
          <ul class="step-list mt-12">
            <li><b>Beginner:</b> you can call an API from Python, write stable structured prompts, and read a leaderboard.</li>
            <li><b>Intermediate:</b> you can train a small model in PyTorch and build a RAG system with a real evaluation.</li>
            <li><b>Proficient:</b> you can fine-tune an open model, serve it on vLLM, and tune throughput and cost.</li>
            <li><b>Expert:</b> you can diagnose unstable training or underperformance at the root, and design an end-to-end evaluation and governance process.</li>
          </ul>
          <p class="small dim mt-16">Every three months, test yourself by asking “did I deliver something complete and usable?” rather than “how many courses did I finish?”</p>
        </div>
      </div>
    </div>
  </section>
`) };

/* ============ glossary ============ */
PAGES["glossary"] = { page: "glossary", ...page(
  "AI glossary — LLM, RAG, agent and alignment terms explained | AI HUB",
  "An AI glossary covering Transformer, MoE, token, context window, hallucination, RLHF, LoRA, quantisation, RAG, agents, MCP and scaling laws.",
`
  <section class="section-sm" style="padding-top:44px">
    <div class="container container-wide">
      <div class="sec-head" style="margin-bottom:22px">
        <div>
          <div class="sec-eyebrow">Glossary</div>
          <h1 style="font-size:clamp(24px,3vw,34px)">AI terminology, explained</h1>
          <p>From core concepts and architectures to training, inference optimisation, applications and safety — one sentence each, with the Chinese equivalent for cross-reference.</p>
        </div>
        <div class="result-count" id="glossCount"></div>
      </div>

      <div class="filter-bar">
        <div class="field">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.2-3.2"/></svg>
          <input type="search" id="glossSearch" placeholder="Search terms, Chinese names or definitions…">
        </div>
        <div class="alpha-index" id="alphaIndex" style="margin-left:auto"></div>
      </div>

      <div class="chips mb-24" id="glossCats"></div>

      <div class="grid grid-3" id="glossList"></div>

      <div class="notice mt-32">
        <b>Note:</b> definitions aim for accuracy but are necessarily simplified to build intuition fast.
        For depth, go to the original papers and official documentation. Chinese translations of many terms
        are not yet standardised; we use the most common convention and give the Chinese form alongside.
      </div>
    </div>
  </section>
`) };

/* ============ timeline ============ */
PAGES["timeline"] = { page: "timeline", ...page(
  "AI timeline — from the Turing Test to AI agents | AI HUB",
  "A timeline of artificial intelligence: 1950 Turing Test, 1956 Dartmouth, 2012 AlexNet, 2016 AlphaGo, 2017 Transformer, 2020 GPT-3, 2022 ChatGPT and beyond.",
`
  <section class="section-sm" style="padding-top:44px">
    <div class="container container-wide">
      <div class="sec-head" style="margin-bottom:26px">
        <div>
          <div class="sec-eyebrow">History</div>
          <h1 style="font-size:clamp(24px,3vw,34px)">Seventy years of AI</h1>
          <p>The fastest way to understand why today's AI looks the way it does is to look at the road it took — two winters and three waves.</p>
        </div>
      </div>

      <div class="grid-side">
        <div class="card">
          <div class="timeline" id="timelineList"></div>
        </div>
        <div>
          <div class="card">
            <div class="sec-eyebrow">Three waves</div>
            <h3 class="card-title">How the paradigm shifted</h3>
            <div class="stack gap-16 mt-16">
              <div>
                <div class="badge badge-brand">1956–1974 · Symbolism</div>
                <p class="small muted mt-8">Logic and hand-written rules, with theorem proving and early expert systems. Limited compute and knowledge acquisition bottlenecks led to the first winter.</p>
              </div>
              <div>
                <div class="badge badge-brand">1980s–1990s · Expert systems, then statistics</div>
                <p class="small muted mt-8">Expert systems commercialised, then statistical learning (SVMs, HMMs) took over and moved the field from rules to data. After a second winter, machine learning became the mainstream.</p>
              </div>
              <div>
                <div class="badge badge-brand">2012–today · Deep learning and large models</div>
                <p class="small muted mt-8">Compute, data and algorithms finally lined up; deep learning won outright. After the 2017 Transformer, large models took over, and from 2022 the technology reached a mass audience.</p>
              </div>
            </div>
          </div>

          <div class="card mt-24">
            <div class="sec-eyebrow">Patterns</div>
            <h3 class="card-title">What history suggests</h3>
            <ul class="step-list mt-12">
              <li>General methods tend to beat hand-crafted rules.</li>
              <li>Quantitative growth in compute and data eventually produces qualitative new capability.</li>
              <li>Each collapse came from expectations outrunning capability, not from the technology being worthless.</li>
              <li>What changes the world is usually the product wrapper that makes the capability usable by ordinary people.</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="sec-head mt-32">
        <div>
          <div class="sec-eyebrow">Happening now</div>
          <h2 style="font-size:24px">Recent developments</h2>
          <p>History is written by news — these are the chapters being written right now.</p>
        </div>
        <a class="link-more" href="news.html">All news
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
      <div id="tlNews" class="grid grid-3"></div>
    </div>
  </section>
`) };

/* ============ hardware ============ */
PAGES["hardware"] = { page: "hardware", ...page(
  "AI hardware recommendations — individual, professional, enterprise, industrial | AI HUB",
  "AI hardware sizing guide: recommended builds for individuals, studios, enterprises and industrial edge, a VRAM cheat sheet, and the real differences between commercial and industrial grade.",
`
  <section class="section-sm" style="padding-top:44px">
    <div class="container container-wide">
      <div class="sec-head" style="margin-bottom:18px">
        <div>
          <div class="sec-eyebrow">Hardware</div>
          <h1 style="font-size:clamp(24px,3vw,34px)">AI hardware recommendations</h1>
          <p id="hwIntro" style="max-width:74ch"></p>
        </div>
        <div class="hw-time" id="hwUpdated"></div>
      </div>

      <div class="notice mb-32">
        <b>Currency disclaimer:</b> hardware is the fastest-moving part of this site — GPU, memory and
        system pricing shifts constantly and model numbers turn over quickly. Prices below are
        <b>indicative ranges</b> (USD, excl. tax) and the builds are starting points, not the only answer.
        Confirm current channel pricing and official specifications before ordering, and validate with a
        small benchmark on your own workload.
      </div>

      <div class="sec-head" style="margin-bottom:18px">
        <div>
          <div class="sec-eyebrow">Start with the environment</div>
          <h2 style="font-size:clamp(20px,2.4vw,27px)">Commercial vs industrial grade</h2>
          <p>This is not “a bit more expensive” versus “a bit cheaper” — the two are designed against
            completely different goals. <span style="color:var(--warn);font-weight:700">Highlighted</span>
            rows are the differences most often overlooked and most damaging.</p>
        </div>
      </div>
      <div class="hw-grade-grid mb-24" id="hwGrades"></div>
      <div id="hwCompare"></div>
    </div>
  </section>

  <section class="section" id="hwRoot" style="background:var(--surface-2);border-block:1px solid var(--border)">
    <div class="container container-wide">
      <div class="sec-head" style="margin-bottom:20px">
        <div>
          <div class="sec-eyebrow">Then the user</div>
          <h2 style="font-size:clamp(20px,2.4vw,27px)">Recommended builds by segment</h2>
          <p>Pick a profile to see the recommended builds, what they actually run, and the mistakes to avoid. Your choice is remembered.</p>
        </div>
      </div>
      <div class="hw-seg-tabs" id="hwTabs"></div>
      <div id="hwPanel"></div>
    </div>
  </section>

  <section class="section">
    <div class="container container-wide">
      <div class="sec-head" style="margin-bottom:18px">
        <div>
          <div class="sec-eyebrow">Down to actual vendors</div>
          <h2 style="font-size:clamp(20px,2.4vw,27px)">Brands and vendors</h2>
          <p>56 vendors across nine categories — compute silicon, systems and servers, workstations, laptops,
            industrial computers, Chinese domestic options, cloud compute and buying channels.
            Filter by category or search directly.</p>
        </div>
        <div class="result-count" id="hwVendorCount"></div>
      </div>

      <div class="notice mb-24">
        <b>Decide three things before choosing a brand:</b>
        <b>① Ecosystem</b> — the cost of moving off CUDA is still the most underestimated hidden expense;
        <b>② Availability</b> — for export-restricted SKUs both lead time and price are uncertain;
        <b>③ Support</b> — can you get a response within 24 hours when something breaks?
        The list below is compiled from public information, is neither a recommendation nor an endorsement,
        and all trademarks belong to their respective owners.
      </div>

      <div class="hw-filter">
        <div class="field">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.2-3.2"/></svg>
          <input type="search" id="hwVendorSearch" placeholder="Search brand, product line or region…">
        </div>
        <span class="tiny dim" style="margin-left:auto">Use the external-link icon to open a vendor site</span>
      </div>

      <div class="chips mb-24" id="hwVendorCats"></div>
      <div class="grid grid-3" id="hwVendors"></div>
    </div>
  </section>

  <section class="section" id="hwLaptops" style="background:var(--surface-2);border-block:1px solid var(--border)">
    <div class="container container-wide">
      <div class="sec-head" style="margin-bottom:18px">
        <div>
          <div class="sec-eyebrow">Mobile</div>
          <h2 style="font-size:clamp(20px,2.4vw,27px)">Laptops and mobile</h2>
          <p id="hwLaptopNote" style="max-width:80ch"></p>
        </div>
      </div>

      <div class="sec-eyebrow">Five things to know first</div>
      <div class="hw-points mb-32" id="hwLaptopPoints"></div>

      <div class="sec-eyebrow">Six classes of machine</div>
      <div class="hw-builds" id="hwLaptopsList"></div>

      <div class="notice mt-24">
        <b>Three final checks before buying a laptop:</b>
        ① measured sustained power draw in watts (not the model number, the wattage);
        ② whether you can add memory yourself up to 64 GB (most thin-and-light machines are soldered);
        ③ whether VRAM is 8 GB or 16 GB — this single number decides the largest model you can run.
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container container-wide">
      <div class="sec-head" style="margin-bottom:20px">
        <div>
          <div class="sec-eyebrow">The first constraint</div>
          <h2 style="font-size:clamp(20px,2.4vw,27px)">VRAM cheat sheet</h2>
          <p>Confirm VRAM first, then talk about compute. If it does not fit, the model will not load and no amount of tuning helps.</p>
        </div>
      </div>
      <div id="hwVram"></div>
    </div>
  </section>

  <section class="section" style="background:var(--surface-2);border-block:1px solid var(--border)">
    <div class="container container-wide">
      <div class="sec-head" style="margin-bottom:20px">
        <div>
          <div class="sec-eyebrow">Reading the specs</div>
          <h2 style="font-size:clamp(20px,2.4vw,27px)">What each metric actually decides</h2>
          <p>Eight metrics that genuinely change the experience.</p>
        </div>
      </div>
      <div class="hw-metrics" id="hwMetrics"></div>
    </div>
  </section>

  <section class="section">
    <div class="container container-wide">
      <div class="grid grid-2" style="gap:32px">
        <div>
          <div class="sec-head" style="margin-bottom:18px">
            <div>
              <div class="sec-eyebrow">Where the money goes</div>
              <h2 style="font-size:clamp(19px,2.2vw,24px)">How to split the budget</h2>
              <p>The same money returns very different value depending on where it goes.</p>
            </div>
          </div>
          <div class="hw-budget" id="hwBudget"></div>
        </div>
        <div>
          <div class="sec-head" style="margin-bottom:18px">
            <div>
              <div class="sec-eyebrow">Avoid the traps</div>
              <h2 style="font-size:clamp(19px,2.2vw,24px)">Seven common mistakes</h2>
              <p>Almost every procurement makes at least one of these.</p>
            </div>
          </div>
          <div class="hw-mistakes" id="hwMistakes"></div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="calcRoot">
    <div class="container container-wide">
      <div class="sec-head" style="margin-bottom:18px">
        <div>
          <div class="sec-eyebrow">Do the maths</div>
          <h2 style="font-size:clamp(20px,2.4vw,27px)">Rent vs buy: the crossover point</h2>
          <p id="calcNote" style="max-width:80ch"></p>
        </div>
      </div>

      <div class="card mb-24">
        <div class="calc-grid">
          <div class="calc-field" style="grid-column:1/-1">
            <label for="calcPreset">Configuration</label>
            <select id="calcPreset"></select>
          </div>
          <div class="calc-field"><label for="calcPurchase">Purchase price (USD)</label><input type="number" id="calcPurchase" min="0" step="100"></div>
          <div class="calc-field"><label for="calcPower">System power (kW)</label><input type="number" id="calcPower" min="0" step="0.1"></div>
          <div class="calc-field"><label for="calcPrice">Electricity ($ / kWh)</label><input type="number" id="calcPrice" min="0" step="0.01"></div>
          <div class="calc-field"><label for="calcPue">PUE (overhead factor)</label><input type="number" id="calcPue" min="1" step="0.05"></div>
          <div class="calc-field"><label for="calcRack">Rack and hosting ($ / month)</label><input type="number" id="calcRack" min="0" step="50"></div>
          <div class="calc-field"><label for="calcOps">Operations labour ($ / month)</label><input type="number" id="calcOps" min="0" step="100"><span class="tiny dim" id="calcOpsHint" style="margin-top:2px"></span></div>
          <div class="calc-field"><label for="calcCloud">Cloud rate ($ / hour)</label><input type="number" id="calcCloud" min="0" step="0.1"></div>
          <div class="calc-field"><label for="calcRunMode">Utilisation</label><select id="calcRunMode"></select></div>
          <div class="calc-field"><label for="calcHours">Hours per month</label><input type="number" id="calcHours" min="0" step="10"></div>
          <div class="calc-field"><label for="calcMonths">Horizon (months)</label><input type="number" id="calcMonths" min="1" max="60" step="1"></div>
          <div class="calc-field"><label for="calcSalvage">Salvage rate (%)</label><input type="number" id="calcSalvage" min="0" max="100" step="5"></div>
        </div>
      </div>

      <div class="calc-kpis" id="calcKpis"></div>
      <div class="calc-verdict" id="calcVerdict"></div>

      <div class="grid grid-2 mt-24" style="gap:28px">
        <div class="card">
          <div class="sec-eyebrow">Cumulative cost curve</div>
          <div id="calcChart"></div>
        </div>
        <div class="card">
          <div class="sec-eyebrow">Cumulative cost at each horizon</div>
          <div class="table-wrap" style="border:0">
            <table class="data calc-table" style="min-width:0">
              <thead><tr>
                <th>Horizon</th>
                <th class="num">Own cumulative</th>
                <th class="num">Rent cumulative</th>
                <th class="num">Difference</th>
                <th></th>
              </tr></thead>
              <tbody id="calcTableBody"></tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="grid grid-2 mt-24" style="gap:28px">
        <div>
          <div class="sec-eyebrow">Cloud rate reference</div>
          <div id="calcCloudRef"></div>
        </div>
        <div>
          <div class="sec-eyebrow">What this model leaves out</div>
          <ul class="hw-check" id="calcCaveats" style="grid-template-columns:1fr"></ul>
        </div>
      </div>
    </div>
  </section>

  <section class="section" style="background:var(--surface-2);border-block:1px solid var(--border)">
    <div class="container container-wide">
      <div class="sec-head" style="margin-bottom:20px">
        <div>
          <div class="sec-eyebrow">Before you order</div>
          <h2 style="font-size:clamp(20px,2.4vw,27px)">Pre-purchase checklist</h2>
          <p>Run through this and you avoid most rework.</p>
        </div>
      </div>
      <ul class="hw-check" id="hwChecklist"></ul>

      <div class="notice mt-32">
        <b>Note:</b> these recommendations are compiled from public specifications and common engineering
        practice. They are guidance, not a procurement commitment. Validate against your own models,
        concurrency, latency targets and environment. Product names and trademarks belong to their
        respective owners.
      </div>
    </div>
  </section>
`) };

/* ============ about ============ */
PAGES["about"] = { page: "about", ...page(
  "About — data sources, disclaimer and changelog | AI HUB",
  "About AI HUB: what it is, where the data comes from, how to update it, the disclaimer and the changelog.",
`
  <section class="section-sm" style="padding-top:44px">
    <div class="container" style="max-width:900px">
      <div class="sec-head" style="margin-bottom:26px">
        <div>
          <div class="sec-eyebrow">About</div>
          <h1 style="font-size:clamp(24px,3vw,34px)">About AI HUB</h1>
          <p>A pure-static, dependency-free, freely modifiable AI information hub.</p>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">What this is</h3>
        <p class="muted mt-12" style="font-size:14.5px;line-height:1.85">
          AI HUB regroups information that is normally scattered across news sites, paper archives, model
          leaderboards and tool directories, and reorganises it around what people actually want to know.
          It is not a newsroom — it is an <b>index and navigation layer</b> that helps you find what to
          read, what to use and what to learn.
        </p>
        <div class="grid grid-2 mt-24">
          <div>
            <div class="badge badge-brand">Sections</div>
            <ul class="step-list mt-12">
              <li>News hub across 9 subject areas</li>
              <li>Model library with 24 profiles and a comparison table</li>
              <li>Tool directory with 48 tools by use case</li>
              <li>Landmark papers plus conference information</li>
              <li>Six-stage learning path with resources</li>
              <li>Glossary of 82 core terms</li>
              <li>Timeline of seven decades of AI</li>
            </ul>
          </div>
          <div>
            <div class="badge badge-brand">Engineering</div>
            <ul class="step-list mt-12">
              <li>Static: HTML + CSS + vanilla JS, no build step</li>
              <li>Zero dependencies: no libraries, no CDNs</li>
              <li>Auto-updating: RSS fetched by a script, no backend</li>
              <li>Responsive across desktop, tablet and mobile</li>
              <li>Dark mode × 6 accent themes, freely combined</li>
              <li>Site-wide search with ⌘K / Ctrl+K</li>
              <li>Model comparison, up to 4 side by side</li>
              <li>Bilingual: Chinese and English datasets</li>
              <li>Scheduled deployment: daily fetch plus auto-publish via GitHub Actions</li>
              <li>Open index.html directly — no server needed</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="card mt-24" id="source">
        <h3 class="card-title">Data sources and how to update them</h3>
        <p class="muted mt-12" style="font-size:14.5px;line-height:1.85">
          Curated content lives in one file per language —
          <code class="inline">assets/js/data.zh.js</code> and <code class="inline">assets/js/data.en.js</code>.
          Interface strings live in <code class="inline">assets/js/i18n.js</code>. Rendering logic never
          contains content, so updating text requires no HTML or CSS changes.
        </p>
        <div class="grid grid-3 mt-24">
          <div class="card card-pad-sm">
            <div class="step-num">1</div>
            <b style="font-size:14px">Manual</b>
            <p class="small muted mt-8">Edit the arrays in the language data file, keeping the field names. Best for a personal site.</p>
          </div>
          <div class="card card-pad-sm">
            <div class="step-num">2</div>
            <b style="font-size:14px">Scheduled fetch (built in)</b>
            <p class="small muted mt-8">Run <code class="inline">python3 scripts/fetch_news.py</code> to pull the configured feeds; schedule it with cron.</p>
          </div>
          <div class="card card-pad-sm">
            <div class="step-num">3</div>
            <b style="font-size:14px">Live API</b>
            <p class="small muted mt-8">Switch to fetching a remote JSON endpoint for genuinely real-time updates; requires a server.</p>
          </div>
        </div>
        <p class="small dim mt-16">
          Field reference and integration examples: <code class="inline">assets/js/README-数据接入.md</code>
          (Chinese) and <code class="inline">README.md</code>.
        </p>
      </div>

      <div class="card mt-24" id="disclaimer">
        <h3 class="card-title">Disclaimer</h3>
        <div class="notice mt-16">
          <ol style="padding-left:0;display:flex;flex-direction:column;gap:10px">
            <li><b>1. Demo data:</b> the built-in news items, model parameters, prices, scores and links are <b>illustrative</b> and may not reflect reality. Replace them before publishing and defer to official sources.</li>
            <li><b>2. Not investment advice:</b> anything about funding, valuations or industry trends is not investment advice.</li>
            <li><b>3. Third-party services:</b> tool links point to external sites. We are not responsible for their content, availability, security or output.</li>
            <li><b>4. Trademarks:</b> model and company names are trademarks of their respective owners and are referenced for identification only.</li>
            <li><b>5. Copyright:</b> auto-fetched items store only title, summary and a link to the original; all rights remain with the publisher. If any content infringes your rights, contact us and we will remove it.</li>
          </ol>
        </div>
      </div>

      <div class="card mt-24" id="changelog">
        <h3 class="card-title">Changelog</h3>
        <div class="mt-16">
          <div class="acc-item open">
            <button class="acc-head">v1.4.0 · Rent vs buy cost calculator
              <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div class="acc-body"><div class="acc-body-inner">
              The last open decision in hardware selection: <b>should you buy or rent?</b><br>
              Enter purchase price, system power, electricity rate, PUE, rack hosting, operations labour,
              cloud hourly rate and utilisation, and it computes <b>own monthly cost, rent monthly cost and
              the payback period</b> in real time, with a recommendation.<br>
              Includes seven presets (individual single/dual GPU, Mac Studio large memory, studio dual card,
              enterprise 4×A100 and 8×H100 nodes, industrial IPC) and four utilisation patterns
              (24×7, weekdays 10 h, evenings 4 h, custom), plus a cumulative cost curve with an automatic
              crossover marker, a milestone comparison table, cloud rate references and a list of what the
              model leaves out.<br>
              <b>One example that makes the point:</b> an 8×H100 node pays back in 9 months at 24×7, but
              takes 142 months at four hours an evening. Utilisation is the single biggest variable.<br>
              <b>Two bugs fixed during development:</b> the verdict logic was inverted, so a cloud monthly
              cost below owning incorrectly reported “buying is cheaper”; and cloud rates for the 4×A100 and
              8×H100 presets were entered per card rather than per node, with the reference table briefly
              listing H100 below A100. Both recalibrated.
            </div></div>
          </div>
          <div class="acc-item">
            <button class="acc-head">v1.3.0 · Vendors and laptop recommendations
              <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div class="acc-body"><div class="acc-body-inner">
              <b>1. Brand and vendor directory (new):</b> 56 vendors across nine categories — compute
              silicon, systems and servers, workstation brands, laptop brands, industrial computers,
              <b>Chinese domestic options</b>, cloud compute and buying channels. Filter by category or
              search by keyword; each entry lists region, market position, notable product lines and a
              sourcing caveat, with a direct link to the vendor site.<br>
              <b>2. Laptops and mobile (new):</b> starts with the three hard mobile constraints
              (a 16 GB VRAM ceiling, power limits, thermal throttling), then gives guidance for six classes
              of machine — thin and light, all-rounder, high-performance creator, Apple large-memory,
              mobile workstation and rugged laptop. Each lists example models, chip, usable VRAM, sustained
              power, indicative price and what it actually runs.<br>
              <b>3. Also:</b> vendors without a website now get a working search link instead of dead text,
              and category filtering toggles state rather than rebuilding the DOM.
            </div></div>
          </div>
          <div class="acc-item">
            <button class="acc-head">v1.2.0 · Hardware recommendation module
              <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div class="acc-body"><div class="acc-body-inner">
              Added a bilingual <a href="hardware.html">hardware recommendation</a> module organised along two axes.<br>
              <b>1. By environment:</b> commercial versus industrial grade across 16 attributes — operating
              temperature, supply longevity, ECC, shock, EMC, watchdog, lifecycle and price multiple — with
              the five most commonly overlooked differences highlighted.<br>
              <b>2. By user:</b> individual/hobbyist, professional/studio, enterprise and industrial/edge.
              Each gets three recommended builds (GPU, CPU, memory, storage, PSU, cooling, indicative price
              and what it actually runs) plus its own pitfalls.<br>
              <b>Also included:</b> a VRAM cheat sheet (7 model-size tiers × FP16/INT8/INT4 × commercial and
              professional options), eight key metrics, budget splits for four segments, seven common
              mistakes and a 12-point pre-purchase checklist.<br>
              <b>Engineering:</b> hardware data lives in separate <code class="inline">hardware.zh.js</code> /
              <code class="inline">hardware.en.js</code> files because hardware needs its own update cadence.
              Every entry is indexed in site-wide search, and the homepage links straight to each segment.
            </div></div>
          </div>
          <div class="acc-item">
            <button class="acc-head">v1.1.1 · Everything is now clickable
              <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div class="acc-body"><div class="acc-body-inner">
              <b>The problem:</b> the site only had list pages. Cards were visual containers with nowhere
              to go, so more than 400 items across news, models, glossary and the timeline could not be opened.<br>
              <b>The fix:</b> a unified <b>detail panel</b>. Items with an original link (auto-fetched news)
              make the whole card clickable and open the source; items without one open an in-site detail
              view with the full summary, specifications, tags and related entries, plus actions for
              official docs, a web search and copying a link.<br>
              <b>Also completed:</b> official documentation links for all 24 models; real websites for the
              two tools that had none; and the dead “button” that was a non-clickable span replaced with a
              working search link.<br>
              <b>Found and fixed:</b> freshly fetched news scored only 62–74, ranking below the curated demo
              data (74–98) — the English site showed no real news on its first page at all. Rebalancing the
              scoring rubric puts new items back near the top.<br>
              <b>New tool:</b> <code class="inline">scripts/audit-links.js</code> audits every page for dead
              links and unclickable cards. It now covers 18 pages and 420 items with zero issues.
            </div></div>
          </div>
          <div class="acc-item">
            <button class="acc-head">v1.1.0 · Auto-update, comparison, themes, English site
              <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div class="acc-body"><div class="acc-body-inner">
              <b>1. RSS auto-update:</b> new <code class="inline">scripts/fetch_news.py</code> and
              <code class="inline">scripts/feeds.json</code> fetch 10 sources, clean, deduplicate, classify
              and tag them, then emit <code class="inline">assets/js/news-feed.js</code> and label
              the items “Auto”.<br>
              <b>2. Model comparison:</b> select up to 4 models, get an attribute table with the best value
              highlighted, and copy it as Markdown. Selection is stored locally.<br>
              <b>3. Six accent themes:</b> Indigo, Ocean, Emerald, Violet, Sunset and Graphite, combinable
              with light and dark independently.<br>
              <b>4. Bilingual architecture:</b> UI strings moved to <code class="inline">i18n.js</code>,
              content split into <code class="inline">data.zh.js</code> and <code class="inline">data.en.js</code>,
              and this English site generated by <code class="inline">scripts/build-en.js</code>.<br>
              <b>5. Scheduled deployment:</b> <code class="inline">.github/workflows/</code> adds a
              daily fetch job plus a Pages deployment job, and
              <code class="inline">scripts/build-sitemap.js</code> generates a bilingual sitemap and
              robots.txt. Push to GitHub and it runs unattended.<br>
              <b>6. Fixes:</b> sort handlers lost after re-rendering the comparison table; accordion
              double-binding; theme and filter breakage when localStorage or the history API is unavailable.
            </div></div>
          </div>
          <div class="acc-item">
            <button class="acc-head">v1.0.0 · Initial release
              <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div class="acc-body"><div class="acc-body-inner">
              Nine sections: home, news hub, model library, tool directory, papers, learning path,
              glossary, timeline and about. Site-wide search (⌘K), dark mode, responsive layout,
              card and table views, category filters and pagination.
            </div></div>
          </div>
          <div class="acc-item">
            <button class="acc-head">Planned
              <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div class="acc-body"><div class="acc-body-inner">
              More languages (Japanese, Korean); charts for model leaderboards; saved bookmarks and reading
              history; keyword subscriptions and email digests; Markdown and PDF export.
            </div></div>
          </div>
        </div>
      </div>

      <div class="card mt-24">
        <h3 class="card-title">Using this template</h3>
        <pre class="code mt-16"># Option 1 — just open it
open index.html

# Option 2 — local static server (recommended for API work later)
python3 -m http.server 8000
# then visit http://localhost:8000

# Option 3 — deploy
# upload the folder to GitHub Pages, Vercel, Netlify or any object storage

# Refresh the news feed
python3 scripts/fetch_news.py

# Regenerate the English pages after editing scripts/build-en.js
node scripts/build-en.js</pre>
        <div class="mt-16">
          <a class="btn btn-primary" href="index.html">Back to home</a>
        </div>
      </div>
    </div>
  </section>
`) };

/* ------------------------------- 写出文件 ------------------------------- */
fs.mkdirSync(OUT, { recursive: true });
let n = 0;
for (const [name, cfg] of Object.entries(PAGES)) {
  const file = path.join(OUT, name + ".html");
  fs.writeFileSync(file, shell(cfg));
  n++;
  console.log("生成 en/" + name + ".html");
}
console.log("\n共 " + n + " 个英文页面 → " + path.relative(ROOT, OUT) + "/");
