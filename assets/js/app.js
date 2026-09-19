/* ==========================================================================
   AI HUB · 全站交互逻辑
   依赖：data.js（window.AI_DATA）
   页面通过 <body data-page="home|news|models|tools|papers|learn|glossary|timeline">
   自动激活对应的渲染器。
   ========================================================================== */

(function () {
  "use strict";

  const D = window.AI_DATA;

  /* ============================== 0.0 多语言 ============================== */
  /* 语言由 <html lang="xx"> 决定；缺的键自动回退到中文 */
  const LANG = (document.documentElement.getAttribute("lang") || "zh").slice(0, 2).toLowerCase();
  const I18N_ALL = window.AI_I18N || {};
  const DICT = I18N_ALL[LANG] || I18N_ALL.zh || {};
  const DICT_FALLBACK = I18N_ALL.zh || {};

  function t(key, vars) {
    let s = DICT[key] != null ? DICT[key] : (DICT_FALLBACK[key] != null ? DICT_FALLBACK[key] : key);
    if (vars) {
      for (const k in vars) s = s.split("{" + k + "}").join(String(vars[k]));
    }
    return s;
  }

  /* ============================== 0. 基础工具 ============================== */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.prototype.slice.call((root || document).querySelectorAll(sel));

  const esc = (s) =>
    String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  const icon = (name, cls) => {
    const p = {
      search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.2-3.2"/>',
      moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
      sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
      menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
      close: '<path d="M18 6L6 18M6 6l12 12"/>',
      arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
      up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
      check: '<path d="M20 6L9 17l-5-5"/>',
      chev: '<path d="M6 9l6 6 6-6"/>',
      ext: '<path d="M14 4h6v6M20 4l-8.5 8.5M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
      palette: '<circle cx="13.5" cy="6.5" r="1.3"/><circle cx="17.5" cy="10.5" r="1.3"/><circle cx="8.5" cy="12.5" r="1.3"/><circle cx="6.5" cy="8.5" r="1.3"/><path d="M12 21a9 9 0 1 1 9-9c0 1.7-1.3 3-3 3h-1.6a2 2 0 0 0-1.4 3.4A2 2 0 0 1 12 21z"/>',
      columns: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 4v16"/>',
      trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
      star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z"/>',
      copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>',
      flame: '<path d="M12 22c4 0 6.5-2.6 6.5-6C18.5 11 12 2 12 2S5.5 11 5.5 16c0 3.4 2.5 6 6.5 6z"/>'
    }[name] || "";
    return '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + p + "</svg>";
  };

  const fmtDate = (d) => {
    const s = String(d);
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
      const [y, m, dd] = s.split("-");
      if (LANG === "zh") return y + " 年 " + Number(m) + " 月 " + Number(dd) + " 日";
      const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return MON[Number(m) - 1] + " " + Number(dd) + ", " + y;
    }
    return s;
  };
  const shortDate = (d) => String(d).replace(/^\d{2}/, "");

  const pad = (n) => (n < 10 ? "0" + n : "" + n);

  /* ============================== 1. 主题 ============================== */
  /* localStorage 在 file:// 或隐私模式下可能直接抛异常，因此加一层内存回退 */
  const Store = {
    mem: {},
    get(k) {
      try { const v = localStorage.getItem(k); return v == null ? (this.mem[k] || null) : v; }
      catch (e) { return this.mem[k] || null; }
    },
    set(k, v) {
      this.mem[k] = v;
      try { localStorage.setItem(k, v); } catch (e) { /* 忽略：使用内存副本 */ }
    }
  };

  const Theme = {
    key: "aihub-theme",
    current: null,
    get() {
      return this.current || Store.get(this.key) || "auto";
    },
    prefersDark() {
      try { return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches); }
      catch (e) { return false; }
    },
    resolved() {
      const t = this.get();
      if (t === "dark" || t === "light") return t;
      return this.prefersDark() ? "dark" : "light";
    },
    apply() {
      document.documentElement.setAttribute("data-theme", this.resolved());
    },
    toggle() {
      this.current = this.resolved() === "dark" ? "light" : "dark";
      Store.set(this.key, this.current);
      this.apply();
      return this.current;
    },
    init() {
      this.current = Store.get(this.key) || "auto";
      this.apply();
      try {
        if (window.matchMedia) {
          window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
            if (this.get() === "auto") this.apply();
          });
        }
      } catch (e) { /* 忽略不支持的浏览器 */ }
    }
  };
  Theme.init();

  /* ============================== 1.1 配色主题 ============================== */
  const ACCENTS = [
    { id: "indigo",  name: "靖蓝", colors: ["#4f46e5", "#06b6d4"] },
    { id: "ocean",   name: "深海", colors: ["#0369a1", "#22d3ee"] },
    { id: "emerald", name: "翡翠", colors: ["#059669", "#14b8a6"] },
    { id: "violet",  name: "紫罗兰", colors: ["#7c3aed", "#c026d3"] },
    { id: "sunset",  name: "落日", colors: ["#ea580c", "#f59e0b"] },
    { id: "mono",    name: "石墨", colors: ["#334155", "#64748b"] }
  ];
  // 显示名走 i18n（accent.indigo / accent.ocean / …），name 仅作回退

  const Accent = {
    key: "aihub-accent",
    current: "indigo",
    get() { return this.current; },
    set(id) {
      this.current = id;
      Store.set(this.key, id);
      this.apply();
    },
    apply() {
      const el = document.documentElement;
      if (this.current && this.current !== "indigo") el.setAttribute("data-accent", this.current);
      else el.removeAttribute("data-accent");
    },
    init() {
      const saved = Store.get(this.key);
      this.current = ACCENTS.some((a) => a.id === saved) ? saved : "indigo";
      this.apply();
    }
  };
  Accent.init();

  /* ============================== 2. Toast ============================== */
  let toastWrap = null;
  function toast(msg) {
    if (!toastWrap) {
      toastWrap = document.createElement("div");
      toastWrap.className = "toast-wrap";
      document.body.appendChild(toastWrap);
    }
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    toastWrap.appendChild(t);
    setTimeout(() => { t.style.opacity = "0"; t.style.transition = "opacity .3s"; }, 1800);
    setTimeout(() => t.remove(), 2200);
  }

  /* ============================== 3. 导航配置 ============================== */
  const NAV = [
    { href: "index.html", label: t("site.nav.home"), page: "home" },
    { href: "news.html", label: t("site.nav.news"), page: "news" },
    { href: "models.html", label: t("site.nav.models"), page: "models" },
    { href: "tools.html", label: t("site.nav.tools"), page: "tools" },
    { href: "papers.html", label: t("site.nav.papers"), page: "papers" },
    { href: "learn.html", label: t("site.nav.learn"), page: "learn" },
    { href: "glossary.html", label: t("site.nav.glossary"), page: "glossary" },
    { href: "timeline.html", label: t("site.nav.timeline"), page: "timeline" },
    { href: "hardware.html", label: t("site.nav.hardware"), page: "hardware" },
    { href: "about.html", label: t("site.nav.about"), page: "about" }
  ];

  /* 语言切换：中文站与英文站各自的相对地址 */
  const LANG_SWITCH = LANG === "zh"
    ? { to: "en", label: "EN", title: "English version", href: "en/index.html", map: { index: "index", news: "news", models: "models", tools: "tools", papers: "papers", learn: "learn", glossary: "glossary", timeline: "timeline", hardware: "hardware", about: "about" } }
    : { to: "zh", label: "中文", title: "中文版", href: "../index.html", map: { index: "index", news: "news", models: "models", tools: "tools", papers: "papers", learn: "learn", glossary: "glossary", timeline: "timeline", hardware: "hardware", about: "about" } };

  /* 当前页在另一语言站点中的对应地址 */
  function counterpartHref() {
    const name = LANG_SWITCH.map[PAGE] || "index";
    return LANG === "zh" ? "en/" + name + ".html" : "../" + name + ".html";
  }

  const PAGE = (document.body && document.body.dataset.page) || "home";

  /* ============================== 4. 头部 / 页脚 ============================== */
  function renderHeader() {
    const host = $("#site-header");
    if (!host) return;
    const navHtml = NAV.map((n) =>
      '<a href="' + n.href + '"' + (n.page === PAGE ? ' class="active"' : "") + ">" + n.label + "</a>"
    ).join("");

    host.className = "site-header";
    host.innerHTML =
      '<div class="container container-wide header-inner">' +
        '<a class="logo" href="index.html">' +
          '<span class="logo-mark">' + icon("flame") + "</span>" +
          "<span>" + D.meta.name + " · " + D.meta.nameZh + "<small>" + t("site.subtitle") + "</small></span>" +
        "</a>" +
        '<nav class="main-nav" aria-label="Main">' + navHtml + "</nav>" +
        '<div class="header-actions">' +
          '<button class="search-trigger" id="openSearch" aria-label="' + t("common.searchSite") + '">' +
            icon("search") + '<span class="st-text">' + t("search.placeholder") + "</span><kbd>⌘K</kbd>" +
          "</button>" +
          '<button class="icon-btn" id="langBtn" aria-label="' + LANG_SWITCH.title + '" title="' + LANG_SWITCH.title + '">' +
            '<span style="font-size:12px;font-weight:800;letter-spacing:0">' + LANG_SWITCH.label + "</span>" +
          "</button>" +
          '<button class="icon-btn" id="accentBtn" aria-label="' + t("common.toggleAccent") + '" aria-haspopup="true">' + icon("palette") + "</button>" +
          '<button class="icon-btn theme-toggle" id="themeBtn" aria-label="' + t("common.toggleTheme") + '">' +
            '<span class="moon">' + icon("moon") + '</span><span class="sun">' + icon("sun") + "</span>" +
          "</button>" +
          '<button class="icon-btn menu-btn" id="menuBtn" aria-label="' + t("common.openMenu") + '">' + icon("menu") + "</button>" +
        "</div>" +
      "</div>" +
      // 配色面板
      '<div class="accent-panel" id="accentPanel" role="menu" aria-label="' + t("common.accentTitle") + '">' +
        '<div class="ap-title">' + t("common.accentTitle") + "</div>" +
        '<div class="accent-grid">' +
          ACCENTS.map((a) =>
            '<button class="accent-swatch" data-accent="' + a.id + '" role="menuitem">' +
              '<span class="sw" style="background:linear-gradient(135deg,' + a.colors[0] + "," + a.colors[1] + ')"></span>' +
              t("accent." + a.id) +
            "</button>"
          ).join("") +
        "</div>" +
      "</div>";

    // 移动端抽屉
    const mob = document.createElement("nav");
    mob.className = "mobile-nav";
    mob.id = "mobileNav";
    mob.innerHTML = navHtml +
      '<a class="mt-8" href="' + counterpartHref() + '">🌐 ' + LANG_SWITCH.title + "</a>" +
      '<div class="mt-24 notice">' + t("toast.hint") + "</div>";
    document.body.appendChild(mob);

    $("#langBtn").addEventListener("click", function () {
      location.href = counterpartHref();
    });

    $("#themeBtn").addEventListener("click", function () {
      const th = Theme.toggle();
      toast(th === "dark" ? t("toast.themeDark") : t("toast.themeLight"));
    });

    // ---- 配色面板 ----
    const accBtn = $("#accentBtn");
    const accPanel = $("#accentPanel");
    const markActive = () =>
      $$(".accent-swatch", accPanel).forEach((b) => b.classList.toggle("active", b.dataset.accent === Accent.get()));
    markActive();

    accBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      accPanel.classList.toggle("open");
    });
    accPanel.addEventListener("click", function (e) {
      const b = e.target.closest(".accent-swatch");
      if (!b) return;
      Accent.set(b.dataset.accent);
      markActive();
      const a = ACCENTS.find((x) => x.id === b.dataset.accent);
      toast(t("toast.accent", { name: t("accent." + a.id) }));
      accPanel.classList.remove("open");
    });
    document.addEventListener("click", (e) => {
      if (accPanel.classList.contains("open") && !accPanel.contains(e.target) && e.target !== accBtn) {
        accPanel.classList.remove("open");
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") accPanel.classList.remove("open");
    });

    const menuBtn = $("#menuBtn");
    menuBtn.addEventListener("click", function () {
      const open = mob.classList.toggle("open");
      menuBtn.innerHTML = open ? icon("close") : icon("menu");
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$("a", mob).forEach((a) =>
      a.addEventListener("click", function () {
        mob.classList.remove("open");
        menuBtn.innerHTML = icon("menu");
        document.body.style.overflow = "";
      })
    );

    // 滚动阴影 + 阅读进度 + 回到顶部
    const onScroll = () => {
      const y = window.scrollY || 0;
      host.classList.toggle("is-scrolled", y > 8);
      const top = $(".to-top");
      if (top) top.classList.toggle("show", y > 600);
      const bar = $(".read-progress");
      if (bar) {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? Math.min(100, (y / h) * 100) : 0) + "%";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function renderFooter() {
    const host = $("#site-footer");
    if (!host) return;
    const col = (title, links) =>
      "<div><h4>" + title + "</h4><ul>" +
      links.map((l) => '<li><a href="' + l[1] + '">' + l[0] + "</a></li>").join("") +
      "</ul></div>";

    host.className = "site-footer";
    host.innerHTML =
      '<div class="container container-wide">' +
        '<div class="footer-grid">' +
          "<div>" +
            '<a class="logo" href="index.html"><span class="logo-mark">' + icon("flame") + "</span><span>" + D.meta.name + " · " + D.meta.nameZh + "<small>" + t("site.subtitle") + "</small></span></a>" +
            '<p class="muted mt-16" style="font-size:13.5px;max-width:38ch;line-height:1.8">' + esc(D.meta.slogan) + "</p>" +
            '<div class="row gap-8 mt-16 wrap">' +
              '<span class="badge badge-brand">v' + D.meta.version + "</span>" +
              '<span class="badge">' + t("site.updatedAt") + " " + D.meta.updated + "</span>" +
            "</div>" +
          "</div>" +
          col(t("site.footer.colContent"), [[t("site.footer.news"), "news.html"], [t("site.footer.models"), "models.html"], [t("site.footer.tools"), "tools.html"], [t("site.footer.glossary"), "glossary.html"], [t("site.footer.hardware"), "hardware.html"]]) +
          col(t("site.footer.colLearn"), [[t("site.footer.learn"), "learn.html"], [t("site.footer.papers"), "papers.html"], [t("site.footer.prompts"), "learn.html#prompt"], [t("site.footer.timeline"), "timeline.html"]]) +
          col(t("site.footer.colAbout"), [[t("site.footer.about"), "about.html"], [t("site.footer.source"), "about.html#source"], [t("site.footer.disclaimer"), "about.html#disclaimer"], [t("site.footer.changelog"), "about.html#changelog"]]) +
        "</div>" +
        '<div class="notice mb-24">' + esc(D.meta.notice) + "</div>" +
        '<div class="footer-bottom">' +
          "<span>© " + new Date().getFullYear() + " " + D.meta.name + " · " + D.meta.nameZh + " — " + t("site.copyright") + "</span>" +
          '<span class="row gap-8"><span class="dot dot-live" style="color:var(--ok)"></span> ' + t("site.dataVersion") + " " + D.meta.updated + "</span>" +
        "</div>" +
      "</div>";
  }

  function renderChrome() {
    renderHeader();
    renderFooter();

    const bar = document.createElement("div");
    bar.className = "read-progress";
    document.body.appendChild(bar);

    const top = document.createElement("button");
    top.className = "to-top";
    top.setAttribute("aria-label", t("common.backToTop"));
    top.innerHTML = icon("up");
    top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    document.body.appendChild(top);
  }

  /* ============================== 5. 全站搜索 ============================== */
  const SEARCH_INDEX = [];
  let SEARCH_READY = false;

  /* 构建全站搜索索引。
     ⚠ 必须在合并完自动抓取数据（RSS）之后调用，否则搜不到新闻。 */
  function buildSearchIndex() {
    SEARCH_INDEX.length = 0;
    D.news.forEach((n) =>
      SEARCH_INDEX.push({ type: t("search.type.news"), icon: "📰", title: n.title, sub: D.catName(n.cat) + " · " + n.date, url: n.link ? n.link : "news.html#" + n.id, ext: !!n.link, keys: n.title + " " + n.summary + " " + (n.tags || []).join(" ") })
    );
    D.models.forEach((m) =>
      SEARCH_INDEX.push({ type: t("search.type.model"), icon: "🧠", title: m.name, sub: m.org + " · " + (m.license === "open" ? t("models.open") : t("models.closed")), url: "models.html#" + encodeURIComponent(m.name), keys: m.name + " " + m.org + " " + m.strength.join(" ") + " " + m.desc })
    );
    D.tools.forEach((tl) =>
      SEARCH_INDEX.push({ type: t("search.type.tool"), icon: "🛠️", title: tl.name, sub: tl.by + " · " + (D.toolCats.find((c) => c.id === tl.cat) || {}).name, url: "tools.html#" + encodeURIComponent(tl.name), keys: tl.name + " " + tl.by + " " + tl.desc + " " + tl.tags.join(" ") })
    );
    D.glossary.forEach((g) =>
      SEARCH_INDEX.push({ type: t("search.type.glossary"), icon: "📖", title: g.t, sub: g.en, url: "glossary.html#" + encodeURIComponent(g.t), keys: g.t + " " + g.en + " " + g.d })
    );
    D.papers.forEach((p) =>
      SEARCH_INDEX.push({ type: t("search.type.paper"), icon: "📄", title: p.title, sub: p.venue + " " + p.year + " · " + p.org, url: "papers.html#" + encodeURIComponent(p.title), keys: p.title + " " + p.authors + " " + p.tags.join(" ") + " " + p.desc })
    );
    D.timeline.forEach((tm) =>
      SEARCH_INDEX.push({ type: t("search.type.timeline"), icon: "🕰️", title: tm.title, sub: tm.date, url: "timeline.html#" + encodeURIComponent(tm.date), keys: tm.title + " " + tm.desc })
    );
    // 硬件模块：把每个受众、每条配置、每个概念都编入索引
    if (D.hardware) {
      const H = D.hardware;
      const hwType = t("hw.searchType");
      H.segments.forEach((s) => {
        SEARCH_INDEX.push({
          type: hwType, icon: s.icon, title: s.name, sub: s.audience,
          url: "hardware.html#" + s.id,
          keys: s.name + " " + s.audience + " " + s.headline + " " + s.scenarios.join(" ")
        });
        s.builds.forEach((b) =>
          SEARCH_INDEX.push({
            type: hwType, icon: "🧩", title: b.name + "（" + s.short + "）", sub: b.price + " · " + b.runs,
            url: "hardware.html#" + s.id,
            keys: s.name + " " + b.name + " " + b.price + " " + b.runs + " " + b.spec.map((r) => r.join(" ")).join(" ")
          }));
      });
      H.segments.forEach((s) => s.pitfalls.forEach((p) =>
        SEARCH_INDEX.push({ type: hwType, icon: "⚠️", title: p.slice(0, 34) + (p.length > 34 ? "…" : ""), sub: s.name, url: "hardware.html#" + s.id, keys: p + " " + s.name })));
      H.metrics.forEach((m) =>
        SEARCH_INDEX.push({ type: hwType, icon: "📐", title: m.name, sub: m.role, url: "hardware.html#hwMetrics", keys: m.name + " " + m.role + " " + m.detail }));
      H.gradeCompare.forEach((r) =>
        SEARCH_INDEX.push({ type: hwType, icon: "⚖️", title: r.item, sub: r.market + " ↔ " + r.industrial, url: "hardware.html#hwCompare", keys: r.item + " " + r.market + " " + r.industrial }));
      H.vram.forEach((r) =>
        SEARCH_INDEX.push({ type: hwType, icon: "💾", title: r.size, sub: "FP16 " + r.fp16 + " · INT4 " + r.int4, url: "hardware.html#hwVram", keys: r.size + " " + r.fp16 + " " + r.int8 + " " + r.int4 + " " + r.market + " " + r.prof }));
    }
    SEARCH_READY = true;
    return SEARCH_INDEX.length;
  }

  /* 合并 RSS 自动抓取的数据（来自 assets/js/news-feed.js） */
  const FEED = { loaded: false, added: 0, updated: null, sources: [], failed: [] };

  function mergeFeed() {
    const F = window.AI_FEED;
    if (!F || !Array.isArray(F.items)) return 0;
    FEED.loaded = true;
    FEED.updated = F.updated || null;
    FEED.sources = F.sources || [];
    FEED.failed = F.failed || [];

    const accept = (D.meta && D.meta.acceptLangs) || null;
    const items = (F.items || []).filter((it) => {
      if (!it) return false;
      // 中文站接受中英文源；英文站只收英文源，避免标题与界面语言不一致
      if (!accept || !it.lang) return true;
      return accept.indexOf(it.lang) !== -1;
    });
    if (!items.length) return 0;

    const seenLink = new Set();
    const seenTitle = new Set();
    D.news.forEach((n) => {
      if (n.link) seenLink.add(String(n.link).split("?")[0].replace(/\/$/, "").toLowerCase());
      seenTitle.add(n.title.trim().toLowerCase());
    });

    const fresh = [];
    items.forEach((it) => {
      if (!it || !it.title || !it.summary) return;
      const link = it.link ? String(it.link).split("?")[0].replace(/\/$/, "").toLowerCase() : "";
      const title = it.title.trim().toLowerCase();
      if ((link && seenLink.has(link)) || seenTitle.has(title)) return;
      if (link) seenLink.add(link);
      seenTitle.add(title);
      fresh.push(it);
    });

    if (fresh.length) {
      D.news = fresh.concat(D.news);
      FEED.added = fresh.length;
    }
    return fresh.length;
  }

  function initSearch() {
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.id = "searchOverlay";
    overlay.innerHTML =
      '<div class="palette" role="dialog" aria-modal="true" aria-label="' + t("common.searchSite") + '">' +
        '<div class="palette-input">' + icon("search") +
          '<input id="paletteInput" type="search" placeholder="' + t("search.inputPlaceholder") + '" autocomplete="off" spellcheck="false">' +
          "<kbd>ESC</kbd>" +
        "</div>" +
        '<div class="palette-results" id="paletteResults"></div>' +
      "</div>";
    document.body.appendChild(overlay);

    const input = $("#paletteInput", overlay);
    const results = $("#paletteResults", overlay);
    let active = -1;
    let items = [];

    const DEFAULT_HINTS = LANG === "zh"
      ? ["大模型", "开源", "RAG", "Agent", "量化", "对齐", "算力", "多模态"]
      : ["LLM", "open source", "RAG", "Agent", "quantization", "alignment", "compute", "multimodal"];

    function renderDefault() {
      results.innerHTML =
        '<div class="palette-group">' + t("search.hot") + "</div>" +
        '<div class="row gap-8 wrap" style="padding:4px 12px 12px">' +
        DEFAULT_HINTS.map((h) => '<button class="tag-pill" data-kw="' + h + '">' + h + "</button>").join("") +
        "</div>" +
        '<div class="palette-group">' + t("search.jump") + "</div>" +
        NAV.map((n) => '<a class="palette-item" href="' + n.href + '"><span class="pi-icon">' + icon("arrow") + '</span><span class="grow"><span class="pi-title">' + n.label + "</span></span></a>").join("");
      $$("[data-kw]", results).forEach((b) =>
        b.addEventListener("click", () => { input.value = b.dataset.kw; doSearch(); input.focus(); })
      );
      items = [];
      active = -1;
    }

    function doSearch() {
      const q = input.value.trim().toLowerCase();
      if (!q) { renderDefault(); return; }
      const terms = q.split(/\s+/).filter(Boolean);
      const hits = SEARCH_INDEX.map((e) => {
        const hay = (e.title + " " + e.sub + " " + e.keys).toLowerCase();
        let score = 0;
        let ok = true;
        terms.forEach((t) => {
          const pos = hay.indexOf(t);
          if (pos === -1) { ok = false; return; }
          score += (e.title.toLowerCase().includes(t) ? 40 : 8) - Math.min(pos / 40, 12);
        });
        return ok ? { e: e, score: score } : null;
      }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 24).map((x) => x.e);

      items = hits;
      active = -1;
      if (!hits.length) {
        results.innerHTML = '<div class="palette-empty">' + esc(t("search.empty", { q: input.value })) + '<br><span class="tiny">' + esc(t("search.emptyHint")) + "</span></div>";
        return;
      }
      const groups = {};
      hits.forEach((h) => { (groups[h.type] = groups[h.type] || []).push(h); });
      let html = "";
      Object.keys(groups).forEach((g) => {
        html += '<div class="palette-group">' + g + " · " + groups[g].length + "</div>";
        html += groups[g].map((h) =>
          '<a class="palette-item" href="' + h.url + '"' + (h.ext ? ' target="_blank" rel="noopener"' : "") + '><span class="pi-icon">' + h.icon + '</span>' +
          '<span class="grow"><span class="pi-title clamp-1">' + esc(h.title) + '</span><span class="pi-sub clamp-1">' + esc(h.sub) + "</span></span>" +
          icon("arrow") + "</a>"
        ).join("");
      });
      results.innerHTML = html;
      $$(".palette-item", results).forEach((a) => a.addEventListener("click", close));
    }
    function move(delta) {
      const els = $$(".palette-item", results);
      if (!els.length) return;
      active = (active + delta + els.length) % els.length;
      els.forEach((e, i) => e.classList.toggle("active", i === active));
      els[active].scrollIntoView({ block: "nearest" });
    }

    function open() {
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
      input.value = "";
      renderDefault();
      setTimeout(() => input.focus(), 30);
    }
    function close() {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    }

    input.addEventListener("input", doSearch);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      else if (e.key === "Enter") {
        const els = $$(".palette-item", results);
        if (active >= 0 && els[active]) { els[active].click(); }
        else if (els[0]) { els[0].click(); }
      } else if (e.key === "Escape") { close(); }
    });

    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); open(); }
      if (e.key === "/" && !overlay.classList.contains("open") &&
          !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) {
        e.preventDefault(); open();
      }
      if (e.key === "Escape" && overlay.classList.contains("open")) close();
    });

    const trigger = $("#openSearch");
    if (trigger) trigger.addEventListener("click", open);
    window.__openSearch = open;
  }

  /* ============================== 6. 通用渲染片段 ============================== */
  const catBadge = (id) => {
    const c = D.categories.find((x) => x.id === id) || { name: id, color: "#888" };
    return '<span class="badge"><span class="cat-dot" style="background:' + c.color + '"></span>' + c.name + "</span>";
  };

  const thumbClass = (i) => (i % 6 === 0 ? "" : " thumb-" + ((i % 5) + 1));

  function newsCard(n, i) {
    const hot = n.hot >= 85 ? '<span class="badge badge-danger">' + icon("flame") + t("news.badge.hot") + "</span>" : "";
    const auto = n.auto ? '<span class="badge badge-brand">' + t("news.badge.auto") + "</span>" : "";
    const mark = n.link ? icon("ext") : '<span class="tiny dim">' + t("detail.viewDetail") + "</span>";

    const inner =
      '<div class="news-thumb' + thumbClass(i) + '" aria-hidden="true">' + (D.categories.find((c) => c.id === n.cat) || {}).icon + "</div>" +
      '<div class="news-head">' + catBadge(n.cat) + auto + hot + "</div>" +
      "<h3>" + esc(n.title) + "</h3>" +
      '<p class="clamp-3">' + esc(n.summary) + "</p>" +
      '<div class="row gap-6 wrap">' + (n.tags || []).map((tg) => '<span class="tiny dim">#' + esc(tg) + "</span>").join("") + "</div>" +
      '<div class="news-meta">' +
        '<span class="src">' + esc(n.source) + "</span><span>·</span><span>" + n.date + "</span>" +
        '<span style="margin-left:auto">' + t("news.readTime", { n: n.readTime }) + " " + mark + "</span>" +
      "</div>";

    // 有原文链接：整卡可点，开新窗口（内部不再嵌 <a>，避免非法嵌套）
    if (n.link) {
      return '<a class="card card-hover news-card card-click" id="' + esc(n.id) + '" ' +
             'href="' + esc(n.link) + '" target="_blank" rel="noopener" title="' + t("detail.readOriginal") + '">' +
             inner + "</a>";
    }
    // 无原文：整卡可点，打开站内详情弹层
    return '<article class="card card-hover news-card card-click" id="' + esc(n.id) + '" ' +
           'data-detail="news" data-key="' + esc(n.id) + '" tabindex="0" role="button">' + inner + "</article>";
  }

  function featureCard(n) {
    const inner =
      '<div class="row gap-8 wrap"><span class="badge">🎯 ' + t("news.editorPick") + "</span>" + catBadge(n.cat) + "</div>" +
      "<h3>" + esc(n.title) + "</h3>" +
      "<p>" + esc(n.summary) + "</p>" +
      '<div class="row gap-6 wrap">' + n.tags.map((tg) => '<span class="badge">#' + esc(tg) + "</span>").join("") + "</div>" +
      '<div class="news-meta">' +
        '<span class="src">' + esc(n.source) + "</span><span>·</span><span>" + n.date + "</span>" +
        '<span style="margin-left:auto">' + t("news.readTime", { n: n.readTime }) + " " +
          (n.link ? icon("ext") : t("detail.viewDetail")) + "</span>" +
      "</div>";

    if (n.link) {
      return '<a class="card card-feature card-click" id="' + esc(n.id) + '" href="' + esc(n.link) +
             '" target="_blank" rel="noopener">' + inner + "</a>";
    }
    return '<article class="card card-feature card-click" id="' + esc(n.id) +
           '" data-detail="news" data-key="' + esc(n.id) + '" tabindex="0" role="button">' + inner + "</article>";
  }

  function sectionHead(eyebrow, title, desc, moreHref, moreText) {
    return (
      '<div class="sec-head"><div>' +
        (eyebrow ? '<div class="sec-eyebrow">' + eyebrow + "</div>" : "") +
        "<h2>" + title + "</h2>" +
        (desc ? "<p>" + desc + "</p>" : "") +
      "</div>" +
      (moreHref ? '<a class="link-more" href="' + moreHref + '">' + (moreText || t("common.more")) + icon("arrow") + "</a>" : "") +
      "</div>"
    );
  }

  /* ============================== 7. 首页 ============================== */
  function initHome() {
    // 统计
    const statHost = $("#statBar");
    if (statHost) {
      const items = [
        { n: D.news.length + "+", l: t("home.stat.news") },
        { n: D.models.length, l: t("home.stat.models") },
        { n: D.tools.length, l: t("home.stat.tools") },
        { n: D.glossary.length, l: t("home.stat.glossary") }
      ];
      statHost.innerHTML = items.map((s) => "<div><div class=\"stat-num\">" + s.n + '</div><div class="stat-label">' + s.l + "</div></div>").join("");
    }

    // 头条 + 最新
    const featureHost = $("#featuredNews");
    if (featureHost) {
      const sorted = D.news.slice().sort((a, b) => (b.hot - a.hot));
      const feat = sorted.filter((n) => n.featured)[0] || sorted[0];
      const rest = sorted.filter((n) => n.id !== feat.id).slice(0, 4);
      featureHost.innerHTML = featureCard(feat) + rest.slice(0, 2).map(newsCard).join("");
      const side = $("#featuredSide");
      if (side) side.innerHTML = rest.slice(2, 4).map(newsCard).join("");
    }

    // 分类速览
    const catHost = $("#catGrid");
    if (catHost) {
      catHost.innerHTML = D.categories.filter((c) => c.id !== "all").map((c) => {
        const cnt = D.news.filter((n) => n.cat === c.id).length;
        return '<a class="card card-hover card-click row gap-12" href="news.html?cat=' + c.id + '">' +
          '<span style="width:38px;height:38px;border-radius:11px;display:grid;place-items:center;font-size:17px;background:' + c.color + '1f;color:' + c.color + '">' + c.icon + "</span>" +
          '<span class="grow"><span style="font-weight:700;font-size:14.5px;display:block">' + c.name + '</span><span class="tiny dim">' + t("home.newsCount", { n: cnt }) + "</span></span>" +
          icon("arrow") + "</a>";
      }).join("");
    }

    // 模型速览
    const modelHost = $("#modelTop");
    if (modelHost) {
      const top = D.models.slice().sort((a, b) => b.score - a.score).slice(0, 6);
      modelHost.innerHTML = top.map((m) =>
        '<a class="card card-hover card-click" href="models.html#' + encodeURIComponent(m.name) + '">' +
          '<div class="row-between"><span class="badge ' + (m.license === "open" ? "badge-ok" : "") + '">' + (m.license === "open" ? t("models.open") : t("models.closed")) + "</span>" +
          '<span class="tiny dim mono">' + m.released + "</span></div>" +
          '<h3 class="card-title mt-12">' + esc(m.name) + "</h3>" +
          '<div class="tiny dim mt-4">' + esc(m.org) + " · " + esc(m.region) + "</div>" +
          '<div class="row gap-6 wrap mt-12">' + m.strength.slice(0, 3).map((s) => '<span class="badge badge-brand">' + esc(s) + "</span>").join("") + "</div>" +
          '<div class="news-meta"><span>' + t("home.ctx") + " " + esc(m.ctx) + "</span>" +
          '<span style="margin-left:auto" class="mono">' + m.score + "</span></div>" +
        "</a>"
      ).join("");
    }

    // 工具速览
    const toolHost = $("#toolTop");
    if (toolHost) {
      const picks = t("home.toolPicks").split(",");
      const list = picks.map((n) => D.tools.find((tl) => tl.name === n)).filter(Boolean);
      toolHost.innerHTML = list.map((tl) =>
        '<a class="card card-hover card-click" href="' + (tl.url || "tools.html") + '"' + (tl.url && tl.url.indexOf("http") === 0 ? ' target="_blank" rel="noopener"' : "") + ">" +
          '<div class="row-between"><span class="badge badge-brand">' + esc((D.toolCats.find((c) => c.id === tl.cat) || {}).name || "") + "</span><span class=\"tiny dim\">" + esc(tl.price) + "</span></div>" +
          '<h3 class="card-title mt-12">' + esc(tl.name) + "</h3>" +
          '<div class="tiny dim mt-4">' + esc(tl.by) + "</div>" +
          '<p class="small muted mt-8 clamp-2">' + esc(tl.desc) + "</p>" +
        "</a>"
      ).join("");
    }

    // 学习路径（精简）
    const roadHost = $("#roadPreview");
    if (roadHost) {
      roadHost.innerHTML = D.roadmap.slice(0, 3).map(roadCard).join("");
    }

    // 硬件选型入口：三张卡直连对应受众
    const hwHost = $("#hwTeaser");
    if (hwHost && D.hardware) {
      const ids = ["personal", "enterprise", "industrial"];
      const picks = ids.map((id) => D.hardware.segments.find((x) => x.id === id)).filter(Boolean);
      hwHost.innerHTML = picks.map((seg) => {
        const g = D.hardware.grades.find((x) => x.id === seg.grade) || D.hardware.grades[0];
        return '<a class="card card-hover card-click" href="hardware.html#' + seg.id + '">' +
          '<div class="row-between">' +
            '<span class="badge" style="background:' + g.color + '1f;color:' + g.color + ';border-color:transparent">' + g.icon + " " + esc(g.name) + "</span>" +
            '<span style="font-size:20px">' + seg.icon + "</span>" +
          "</div>" +
          '<h3 class="card-title mt-12">' + esc(seg.name) + "</h3>" +
          '<div class="tiny dim mt-4">' + esc(seg.audience) + "</div>" +
          '<p class="small muted mt-8 clamp-2">' + esc(seg.headline) + "</p>" +
          '<div class="news-meta"><span>' + t("hw.builds") + " " + seg.builds.length + "</span>" +
            '<span style="margin-left:auto">' + esc(seg.builds[0].price.split("–")[0].trim()) + " " + t("hw.searchType") + "</span></div>" +
        "</a>";
      }).join("");
    }

    // 术语速查
    const glossHost = $("#glossPreview");
    if (glossHost) {
      // 用「包含」匹配，避免中英词条全称不一致（如 "Mixture of Experts (MoE)"）
      const picks = t("home.glossPicks").split(",");
      const list = picks
        .map((p) => {
          const k = p.trim().toLowerCase();
          return D.glossary.find((g) => g.t.toLowerCase() === k) ||
                 D.glossary.find((g) => g.t.toLowerCase().indexOf(k) !== -1);
        })
        .filter(Boolean);
      glossHost.innerHTML = list.map((g) =>
        '<div class="gloss-item card-click" data-detail="gloss" data-key="' + esc(g.t) + '" tabindex="0" role="button" title="' + t("detail.viewDetail") + '">' +
        '<div class="gloss-term">' + esc(g.t) + '<span class="gloss-en">' + esc(g.en) + "</span></div>" +
        '<div class="gloss-def">' + esc(g.d) + "</div></div>"
      ).join("");
    }

    // 首页搜索
    const hs = $("#heroSearch");
    if (hs) {
      hs.addEventListener("submit", function (e) {
        e.preventDefault();
        const q = $("#heroSearchInput").value.trim();
        if (!q) { window.__openSearch && window.__openSearch(); return; }
        if (window.__openSearch) {
          window.__openSearch();
          setTimeout(() => {
            const pi = $("#paletteInput");
            if (pi) { pi.value = q; pi.dispatchEvent(new Event("input")); }
          }, 40);
        }
      });
    }
  }

  /* ============================== 8. 资讯页 ============================== */
  function initNews() {
    const listHost = $("#newsList");
    if (!listHost) return;

    const params = new URLSearchParams(location.search);
    const state = {
      cat: params.get("cat") || "all",
      q: "",
      sort: "hot",
      page: 1,
      size: 9
    };

    // 分类 chips
    const chipHost = $("#catChips");
    chipHost.innerHTML = D.categories.map((c) => {
      const cnt = c.id === "all" ? D.news.length : D.news.filter((n) => n.cat === c.id).length;
      return '<button class="chip' + (c.id === state.cat ? " active" : "") + '" data-cat="' + c.id + '">' + c.name + '<span class="cnt">' + cnt + "</span></button>";
    }).join("");

    chipHost.addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      state.cat = b.dataset.cat;
      state.page = 1;
      $$(".chip", chipHost).forEach((x) => x.classList.toggle("active", x === b));
      // 部分浏览器在 file:// 协议下 replaceState 会抛 SecurityError，需保护
      try {
        history.replaceState(null, "", state.cat === "all" ? "news.html" : "news.html?cat=" + state.cat);
      } catch (err) { /* 忽略：仅影响地址栏同步 */ }
      render();
    });

    $("#newsSearch").addEventListener("input", function () { state.q = this.value.trim(); state.page = 1; render(); });
    $("#newsSort").addEventListener("change", function () { state.sort = this.value; state.page = 1; render(); });

    function filtered() {
      let list = D.news.slice();
      if (state.cat !== "all") list = list.filter((n) => n.cat === state.cat);
      if (state.q) {
        const q = state.q.toLowerCase();
        list = list.filter((n) => (n.title + n.summary + n.tags.join(" ") + n.source).toLowerCase().includes(q));
      }
      if (state.sort === "hot") list.sort((a, b) => b.hot - a.hot);
      else if (state.sort === "new") list.sort((a, b) => (a.date < b.date ? 1 : -1));
      else if (state.sort === "old") list.sort((a, b) => (a.date > b.date ? 1 : -1));
      else if (state.sort === "read") list.sort((a, b) => a.readTime - b.readTime);
      return list;
    }

    function render() {
      const list = filtered();
      const total = list.length;
      const pages = Math.max(1, Math.ceil(total / state.size));
      if (state.page > pages) state.page = pages;
      const slice = list.slice((state.page - 1) * state.size, state.page * state.size);

      $("#newsCount").textContent = total
        ? t("news.count", { n: total, page: state.page, pages: pages })
        : t("news.none");

      if (!total) {
        listHost.innerHTML = '<div class="empty" style="grid-column:1/-1"><div class="em-icon">🔍</div><h3>' + t("news.empty") + '</h3><p class="small">' + t("news.emptyHint") + "</p></div>";
        $("#newsPager").innerHTML = "";
        return;
      }

      listHost.innerHTML = slice.map((n, i) => newsCard(n, (state.page - 1) * state.size + i)).join("");
      renderPager($("#newsPager"), state.page, pages, (p) => { state.page = p; render(); document.getElementById("newsList").scrollIntoView({ behavior: "smooth", block: "start" }); });

      if (location.hash) {
        const t = document.getElementById(location.hash.slice(1));
        if (t) setTimeout(() => t.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
      }
    }

    render();
  }

  function renderPager(host, cur, total, onGo) {
    if (!host) return;
    if (total <= 1) { host.innerHTML = ""; return; }
    let html = '<button data-p="prev"' + (cur === 1 ? " disabled" : "") + ">" + t("pager.prev") + "</button>";
    const win = [];
    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || Math.abs(i - cur) <= 1) win.push(i);
      else if (win[win.length - 1] !== "…") win.push("…");
    }
    win.forEach((p) => {
      if (p === "…") html += '<button disabled style="border:0;background:none">…</button>';
      else html += '<button data-p="' + p + '" class="' + (p === cur ? "active" : "") + '">' + p + "</button>";
    });
    html += '<button data-p="next"' + (cur === total ? " disabled" : "") + ">" + t("pager.next") + "</button>";
    host.innerHTML = html;
    host.onclick = (e) => {
      const b = e.target.closest("button[data-p]");
      if (!b || b.disabled) return;
      const p = b.dataset.p;
      if (p === "prev") onGo(cur - 1);
      else if (p === "next") onGo(cur + 1);
      else onGo(Number(p));
    };
  }

  /* ============================== 9. 模型库 ============================== */
  /* 对比栏最多同时比较的模型数量 */
  const CMP_MAX = 4;
  const CMP_KEY = "aihub-compare";

  /* 对比表的行定义；best: "max" 时高亮最优值 */
  const CMP_ROWS = [
    { label: t("cmp.row.org"), get: (m) => m.org + " · " + m.region },
    { label: t("cmp.row.released"), get: (m) => m.released },
    { label: t("cmp.row.license"), get: (m) => (m.license === "open" ? t("models.open") : t("models.closed")) },
    { label: t("cmp.row.params"), get: (m) => m.params },
    { label: t("cmp.row.ctx"), get: (m) => m.ctx },
    { label: t("cmp.row.modality"), get: (m) => m.modality.join(" / ") },
    { label: t("cmp.row.price"), get: (m) => m.price },
    { label: t("cmp.row.strength"), get: (m) => m.strength.join(LANG === "zh" ? "、" : ", ") },
    { label: t("cmp.row.score"), get: (m) => String(m.score), best: "max" },
    { label: t("cmp.row.desc"), get: (m) => m.desc }
  ];

  function initModels() {
    const grid = $("#modelGrid");
    if (!grid) return;
    const state = { lic: "all", org: "all", q: "", view: "card", sort: "score" };

    /* ---- 对比选择状态（跨页会保持，存 localStorage） ---- */
    let compare = [];
    try {
      const raw = Store.get(CMP_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      if (Array.isArray(arr)) {
        compare = arr.filter((n) => D.models.some((m) => m.name === n)).slice(0, CMP_MAX);
      }
    } catch (e) { compare = []; }

    const cmpHas = (name) => compare.indexOf(name) !== -1;
    const cmpSave = () => Store.set(CMP_KEY, JSON.stringify(compare));

    function cmpToggle(name) {
      const i = compare.indexOf(name);
      if (i !== -1) {
        compare.splice(i, 1);
        cmpSave();
      } else {
        if (compare.length >= CMP_MAX) {
          toast(t("cmp.maxWarn", { max: CMP_MAX }));
          return;
        }
        compare.push(name);
        cmpSave();
      }
      syncCmp();
    }

    const bar = $("#cmpBar");

    function syncCmp() {
      // 卡片上的按钮
      $$(".cmp-toggle", grid).forEach((b) => {
        const on = cmpHas(b.dataset.cmp);
        b.classList.toggle("on", on);
        b.innerHTML = icon("columns") + (on ? t("models.compared") : t("models.compare"));
      });
      // 表格里的勾选框
      $$("[data-cmp-chk]", grid).forEach((c) => { c.checked = cmpHas(c.dataset.cmpChk); });

      if (!bar) return;
      bar.classList.toggle("show", compare.length > 0);
      if (!compare.length) { bar.innerHTML = ""; return; }
      bar.innerHTML =
        '<span class="cmp-count">' + t("cmp.selected", { n: compare.length, max: CMP_MAX }) + "</span>" +
        '<div class="cmp-chips">' +
          compare.map((n) =>
            '<span class="cmp-chip"><span>' + esc(n) + '</span>' +
            '<button data-cmp-del="' + esc(n) + '" aria-label="' + t("common.close") + " " + esc(n) + '">' + icon("close") + "</button></span>"
          ).join("") +
        "</div>" +
        '<div class="row gap-8" style="margin-left:auto">' +
          '<button class="btn btn-sm btn-ghost" data-cmp-clear>' + t("cmp.clear") + "</button>" +
          '<button class="btn btn-sm btn-primary" data-cmp-go' + (compare.length < 2 ? " disabled" : "") + ">" + t("cmp.go") + "</button>" +
        "</div>";
    }

    // 供详情弹层里的「加入对比」调用
    window.__cmpToggle = cmpToggle;

    grid.addEventListener("click", (e) => {
      const t = e.target.closest(".cmp-toggle");
      if (t) { e.preventDefault(); e.stopPropagation(); cmpToggle(t.dataset.cmp); }
    });
    grid.addEventListener("change", (e) => {
      const c = e.target.closest("[data-cmp-chk]");
      if (c) cmpToggle(c.dataset.cmpChk);
    });

    if (bar) {
      bar.addEventListener("click", (e) => {
        const del = e.target.closest("[data-cmp-del]");
        if (del) { cmpToggle(del.dataset.cmpDel); return; }
        if (e.target.closest("[data-cmp-clear]")) { compare = []; cmpSave(); syncCmp(); return; }
        if (e.target.closest("[data-cmp-go]")) openCompare();
      });
    }

    /* ---- 对比结果弹窗 ---- */
    function openCompare() {
      const list = compare.map((n) => D.models.find((m) => m.name === n)).filter(Boolean);
      if (list.length < 2) { toast(t("cmp.needTwo")); return; }

      const bestOf = {};
      CMP_ROWS.forEach((r, ri) => {
        if (r.best !== "max") return;
        const vals = list.map((m) => parseFloat(String(r.get(m)).replace(/[^\d.\-]/g, "")));
        const mx = Math.max.apply(null, vals.filter((v) => !isNaN(v)));
        if (!isNaN(mx)) bestOf[ri] = mx;
      });

      let html =
        '<div class="cmp-panel" role="dialog" aria-modal="true" aria-label="' + t("cmp.title") + '">' +
          '<div class="cmp-panel-head">' +
            "<div><h3>" + t("cmp.title") + "</h3>" +
            '<div class="tiny dim mt-4">' + t("cmp.subtitle", { n: list.length }) + "</div></div>" +
            '<div class="row gap-8">' +
              '<button class="btn btn-sm" data-cmp-copy>' + icon("copy") + t("cmp.copyMd") + "</button>" +
              '<button class="icon-btn" data-cmp-close aria-label="' + t("cmp.close") + '">' + icon("close") + "</button>" +
            "</div>" +
          "</div>" +
          '<div class="cmp-panel-body">' +
            '<div class="cmp-table-wrap"><table class="cmp-table"><thead><tr><th>' + t("cmp.row.item") + "</th>" +
              list.map((m) => "<th>" + esc(m.name) + '<span class="cmp-org">' + esc(m.org) + "</span></th>").join("") +
            "</tr></thead><tbody>" +
            CMP_ROWS.map((r, ri) =>
              "<tr><th>" + r.label + "</th>" +
              list.map((m) => {
                const v = r.get(m);
                const isBest = r.best === "max" && bestOf[ri] !== undefined && parseFloat(String(v).replace(/[^\d.\-]/g, "")) === bestOf[ri];
                return '<td class="' + (isBest ? "cmp-best" : "") + '">' + esc(v) + (isBest ? " ✓ " + t("cmp.best") : "") + "</td>";
              }).join("") + "</tr>"
            ).join("") +
            "</tbody></table></div>" +
            '<div class="notice mt-16">' + t("cmp.note") + "</div>" +
          "</div>" +
        "</div>";

      let ov = $("#cmpOverlay");
      if (!ov) {
        ov = document.createElement("div");
        ov.className = "overlay";
        ov.id = "cmpOverlay";
        document.body.appendChild(ov);
      }
      ov.innerHTML = html;
      ov.classList.add("open");
      document.body.style.overflow = "hidden";

      const close = () => { ov.classList.remove("open"); document.body.style.overflow = ""; };
      ov.addEventListener("click", (e) => {
        if (e.target === ov || e.target.closest("[data-cmp-close]")) { close(); return; }
        if (e.target.closest("[data-cmp-copy]")) {
          const md = buildCompareMarkdown(list);
          if (navigator.clipboard) {
            navigator.clipboard.writeText(md).then(() => toast(t("toast.copied", { what: t("cmp.copied") })), () => toast(t("toast.copyFail")));
          } else { toast(t("toast.clipboardNA")); }
        }
      });
    }

    function buildCompareMarkdown(list) {
      const lines = [];
      lines.push("| " + t("cmp.row.item") + " | " + list.map((m) => m.name).join(" | ") + " |");
      lines.push("| --- | " + list.map(() => "---").join(" | ") + " |");
      CMP_ROWS.forEach((r) => {
        lines.push("| " + r.label + " | " + list.map((m) => String(r.get(m)).replace(/\|/g, "｜")).join(" | ") + " |");
      });
      lines.push("");
      lines.push("> " + t("cmp.sourceNote") + " · " + new Date().toLocaleString(LANG === "zh" ? "zh-CN" : "en-US"));
      return lines.join("\n");
    }

    /* ---- 筛选 ---- */

    $("#modelSearch").addEventListener("input", function () { state.q = this.value.trim().toLowerCase(); render(); });
    $("#modelLicense").addEventListener("change", function () { state.lic = this.value; render(); });
    $("#modelOrg").addEventListener("change", function () { state.org = this.value; render(); });
    $("#modelSort").addEventListener("change", function () { state.sort = this.value; render(); });

    // 组织下拉
    const orgs = Array.from(new Set(D.models.map((m) => m.org))).sort();
    $("#modelOrg").innerHTML = '<option value="all">' + t("models.allOrgs") + '</option>' + orgs.map((o) => '<option value="' + esc(o) + '">' + esc(o) + "</option>").join("");

    function filtered() {
      let list = D.models.slice();
      if (state.lic !== "all") list = list.filter((m) => m.license === state.lic);
      if (state.org !== "all") list = list.filter((m) => m.org === state.org);
      if (state.q) list = list.filter((m) => (m.name + m.org + m.desc + m.strength.join(" ") + m.modality.join(" ")).toLowerCase().includes(state.q));
      const s = state.sort;
      if (s === "score") list.sort((a, b) => b.score - a.score);
      if (s === "name") list.sort((a, b) => a.name.localeCompare(b.name, "zh"));
      if (s === "org") list.sort((a, b) => a.org.localeCompare(b.org, "zh"));
      return list;
    }

    function cardHtml(m) {
      const on = cmpHas(m.name);
      return '<article class="card card-hover card-click" id="' + encodeURIComponent(m.name) + '"' +
        ' data-detail="model" data-key="' + esc(m.name) + '" tabindex="0" role="button" title="' + t("detail.viewDetail") + '">' +
        '<div class="row-between gap-8">' +
          '<span class="badge ' + (m.license === "open" ? "badge-ok" : "badge-warn") + '">' + (m.license === "open" ? t("models.open") : t("models.closed")) + "</span>" +
          '<div class="row gap-6">' +
            '<span class="mono tiny" style="color:var(--brand);font-weight:700">' + m.score + "</span>" +
            '<button class="cmp-toggle' + (on ? " on" : "") + '" data-cmp="' + esc(m.name) + '" aria-pressed="' + on + '" title="' + t("models.addCompare") + '">' + icon("columns") + (on ? t("models.compared") : t("models.compare")) + "</button>" +
          "</div>" +
        "</div>" +
        '<h3 class="card-title mt-12">' + esc(m.name) + "</h3>" +
        '<div class="small dim mt-4">' + esc(m.org) + " · " + esc(m.region) + " · " + esc(m.released) + "</div>" +
        '<p class="small muted mt-12 clamp-3">' + esc(m.desc) + "</p>" +
        '<div class="row gap-6 wrap mt-12">' + m.strength.map((s) => '<span class="badge badge-brand">' + esc(s) + "</span>").join("") + "</div>" +
        '<dl class="mt-16" style="display:grid;grid-template-columns:auto 1fr;gap:7px 14px;font-size:12.8px">' +
          '<dt class="dim">' + t("models.dl.params") + '</dt><dd style="margin:0">' + esc(m.params) + "</dd>" +
          '<dt class="dim">' + t("models.dl.ctx") + '</dt><dd style="margin:0">' + esc(m.ctx) + "</dd>" +
          '<dt class="dim">' + t("models.dl.modality") + '</dt><dd style="margin:0">' + m.modality.join(" / ") + "</dd>" +
          '<dt class="dim">' + t("models.dl.price") + '</dt><dd style="margin:0">' + esc(m.price) + "</dd>" +
        "</dl>" +
      "</article>";
    }

    function tableHtml(list) {
      return '<div class="table-wrap"><table class="data"><thead><tr>' +
        '<th data-nosort style="width:54px">' + t("models.col.compare") + "</th>" +
        "<th>" + t("models.col.model") + "</th><th>" + t("models.col.org") + "</th><th>" + t("models.col.license") + "</th><th>" + t("models.col.params") + "</th><th>" + t("models.col.ctx") + "</th><th>" + t("models.col.modality") + "</th><th>" + t("models.col.price") + "</th><th>" + t("models.col.score") + "</th>" +
        "</tr></thead><tbody>" +
        list.map((m) =>
          '<tr><td><input type="checkbox" data-cmp-chk="' + esc(m.name) + '" aria-label="' + t("models.addCompare") + " " + esc(m.name) + '"' + (cmpHas(m.name) ? " checked" : "") + "></td>" +
          '<td class="name-cell"><span data-detail="model" data-key="' + esc(m.name) + '" tabindex="0" role="button">' +
            esc(m.name) + "</span></td><td class=\"muted\">" + esc(m.org) + "</td>" +
          "<td><span class=\"badge " + (m.license === "open" ? "badge-ok" : "badge-warn") + '">' + (m.license === "open" ? t("models.openShort") : t("models.closedShort")) + "</span></td>" +
          "<td class=\"mono tiny\">" + esc(m.params) + "</td><td class=\"tiny\">" + esc(m.ctx) + "</td>" +
          '<td><div class="tbl-tags">' + m.modality.map((x) => '<span class="badge">' + x + "</span>").join("") + "</div></td>" +
          "<td class=\"tiny\">" + esc(m.price) + "</td><td><b>" + m.score + "</b></td></tr>"
        ).join("") +
        "</tbody></table></div>";
    }

    function render() {
      const list = filtered();
      grid.classList.toggle("is-table", state.view === "table");
      $("#modelCount").textContent = t("models.count", { n: list.length });
      if (!list.length) {
        grid.innerHTML = '<div class="empty" style="grid-column:1/-1"><div class="em-icon">🧠</div><h3>' + t("models.empty") + '</h3><p class="small">' + t("models.emptyHint") + '</p></div>';
        return;
      }
      grid.innerHTML = state.view === "card" ? list.map(cardHtml).join("") : tableHtml(list);
      const tb = $("table.data", grid);
      if (tb) enableTableSort(tb);
      syncCmp();
    }

    $$("[data-view]").forEach((b) =>
      b.addEventListener("click", function () {
        state.view = this.dataset.view;
        $$("[data-view]").forEach((x) => x.classList.toggle("active", x === b));
        render();
      })
    );

    render();

    if (location.hash) {
      const t = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (t) setTimeout(() => t.scrollIntoView({ behavior: "smooth", block: "center" }), 150);
    }
  }

  /* ============================== 10. 工具导航 ============================== */
  function initTools() {
    const grid = $("#toolGrid");
    if (!grid) return;
    const state = { cat: "all", q: "" };

    $("#toolChips").innerHTML = D.toolCats.map((c) => {
      const cnt = c.id === "all" ? D.tools.length : D.tools.filter((tl) => tl.cat === c.id).length;
      return '<button class="chip' + (c.id === "all" ? " active" : "") + '" data-cat="' + c.id + '">' + c.name + '<span class="cnt">' + cnt + "</span></button>";
    }).join("");

    $("#toolChips").addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      state.cat = b.dataset.cat;
      $$(".chip", $("#toolChips")).forEach((x) => x.classList.toggle("active", x === b));
      render();
    });
    $("#toolSearch").addEventListener("input", function () { state.q = this.value.trim().toLowerCase(); render(); });

    function render() {
      let list = D.tools.slice();
      if (state.cat !== "all") list = list.filter((tl) => tl.cat === state.cat);
      if (state.q) list = list.filter((tl) => (tl.name + tl.by + tl.desc + tl.tags.join(" ")).toLowerCase().includes(state.q));
      $("#toolCount").textContent = t("tools.count", { n: list.length });
      if (!list.length) {
        grid.innerHTML = '<div class="empty" style="grid-column:1/-1"><div class="em-icon">🛠️</div><h3>' + t("tools.empty") + '</h3></div>';
        return;
      }
      grid.innerHTML = list.map((tl) => {
        const href = tl.url || "#";
        const ext = href.indexOf("http") === 0;
        return '<article class="card card-hover card-click" id="' + encodeURIComponent(tl.name) + '"' +
          ' data-detail="tool" data-key="' + esc(tl.name) + '" tabindex="0" role="button">' +
          '<div class="row-between"><span class="badge badge-brand">' + esc((D.toolCats.find((c) => c.id === tl.cat) || {}).name) + "</span>" +
          '<span class="tiny dim">' + esc(tl.price) + "</span></div>" +
          '<h3 class="card-title mt-12">' + esc(tl.name) + "</h3>" +
          '<div class="tiny dim mt-4">' + esc(tl.by) + "</div>" +
          '<p class="small muted mt-8">' + esc(tl.desc) + "</p>" +
          '<div class="row gap-6 wrap mt-12">' + tl.tags.map((x) => '<span class="badge">' + esc(x) + "</span>").join("") + "</div>" +
          (ext
            ? '<a class="btn btn-sm mt-16" href="' + href + '" target="_blank" rel="noopener">' + t("tools.visit") + " " + icon("ext") + "</a>"
            : '<a class="btn btn-sm mt-16" href="' + searchUrl(tl.name + " " + tl.by) +
              '" target="_blank" rel="noopener">' + t("detail.searchWeb") + icon("ext") + "</a>") +
        "</article>";
      }).join("");
    }
    render();
  }

  /* ============================== 11. 论文页 ============================== */
  function initPapers() {
    const host = $("#paperList");
    if (!host) return;
    const state = { q: "", tag: "all" };

    const tags = Array.from(new Set(D.papers.flatMap((p) => p.tags)));
    $("#paperTags").innerHTML = '<button class="chip active" data-tag="all">' + t("papers.all") + "</button>" +
      tags.map((t) => '<button class="chip" data-tag="' + esc(t) + '">' + esc(t) + "</button>").join("");
    $("#paperTags").addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      state.tag = b.dataset.tag;
      $$(".chip", $("#paperTags")).forEach((x) => x.classList.toggle("active", x === b));
      render();
    });
    $("#paperSearch").addEventListener("input", function () { state.q = this.value.trim().toLowerCase(); render(); });

    function render() {
      let list = D.papers.slice();
      if (state.tag !== "all") list = list.filter((p) => p.tags.includes(state.tag));
      if (state.q) list = list.filter((p) => (p.title + p.authors + p.org + p.tags.join(" ") + p.desc).toLowerCase().includes(state.q));
      list.sort((a, b) => b.year - a.year || b.stars - a.stars);
      $("#paperCount").textContent = t("papers.count", { n: list.length });
      if (!list.length) { host.innerHTML = '<div class="empty" style="grid-column:1/-1"><div class="em-icon">📄</div><h3>' + t("papers.empty") + '</h3></div>'; return; }
      host.innerHTML = list.map((p) =>
        '<article class="card card-hover" id="' + encodeURIComponent(p.title) + '">' +
          '<div class="row gap-8 wrap">' +
            '<span class="badge badge-brand">' + p.venue + " " + p.year + "</span>" +
            '<span class="badge">' + esc(p.org) + "</span>" +
            '<span style="margin-left:auto;color:var(--warn)">' + "★".repeat(p.stars) + "</span>" +
          "</div>" +
          '<h3 class="card-title mt-12">' + esc(p.title) + "</h3>" +
          '<div class="small dim mt-4">' + esc(p.authors) + "</div>" +
          '<p class="small muted mt-12">' + esc(p.desc) + "</p>" +
          '<div class="row gap-6 wrap mt-12">' + p.tags.map((t) => '<span class="badge badge-brand">#' + esc(t) + "</span>").join("") + "</div>" +
          '<div class="row gap-8 mt-16">' +
            '<a class="btn btn-sm" href="https://scholar.google.com/scholar?q=' + encodeURIComponent(p.title) + '" target="_blank" rel="noopener">' + t("papers.scholar") + icon("ext") + "</a>" +
            '<a class="btn btn-sm btn-ghost" href="https://arxiv.org/list/cs.CL/recent" target="_blank" rel="noopener">' + t("papers.arxiv") + icon("ext") + "</a>" +
          "</div>" +
        "</article>"
      ).join("");
    }
    render();

    // 会议表
    const confHost = $("#confTable");
    if (confHost) {
      confHost.innerHTML = '<div class="table-wrap"><table class="data"><thead><tr><th>' + t("papers.conf.name") + '</th><th>' + t("papers.conf.full") + '</th><th>' + t("papers.conf.area") + '</th><th>' + t("papers.conf.time") + '</th><th>' + t("papers.conf.rank") + '</th><th>' + t("papers.conf.site") + '</th></tr></thead><tbody>' +
        D.confs.map((c) => "<tr><td class=\"name-cell\">" + c.name + '</td><td class="muted">' + c.full + "</td><td>" + c.area + '</td><td class="tiny">' + c.time + '</td><td><span class="badge badge-brand">' + c.rank + '</span></td><td class="tiny mono">' + c.site + "</td></tr>").join("") +
        "</tbody></table></div>";
    }
  }

  /* ============================== 12. 学习页 ============================== */
  function roadCard(r) {
    return '<article class="card step-card">' +
      '<div class="step-num">' + pad(r.step) + "</div>" +
      '<div class="row gap-8 wrap"><span class="badge badge-brand">' + r.level + "</span><span class=\"badge\">" + t("learn.duration", { v: r.time }) + "</span></div>" +
      '<h3 class="card-title mt-12">' + esc(r.title) + "</h3>" +
      '<p class="small muted mt-8">' + esc(r.desc) + "</p>" +
      '<ul class="step-list">' + r.items.map((i) => "<li>" + icon("check") + "<span>" + esc(i) + "</span></li>").join("") + "</ul>" +
      '<a class="link-more mt-16" href="' + esc(r.link) + '" target="_blank" rel="noopener">' + t("learn.related") + icon("arrow") + "</a>" +
    "</article>";
  }

  function initLearn() {
    const road = $("#roadmap");
    if (road) road.innerHTML = D.roadmap.map(roadCard).join("");

    const ch = $("#courseList");
    if (ch) ch.innerHTML = D.courses.map((c) =>
      '<article class="card card-hover">' +
        '<div class="row-between"><span class="badge ' + (c.free ? "badge-ok" : "badge-warn") + '">' + (c.free ? t("learn.free") : t("learn.paid")) + "</span>" +
        '<span class="tiny dim">' + esc(c.level) + "</span></div>" +
        '<h3 class="card-title mt-12">' + esc(c.name) + "</h3>" +
        '<div class="tiny dim mt-4">' + esc(c.by) + " · " + esc(c.lang) + "</div>" +
        '<p class="small muted mt-8">' + esc(c.desc) + "</p>" +
      "</article>").join("");

    const bh = $("#bookList");
    if (bh) bh.innerHTML = D.books.map((b) =>
      '<article class="card card-hover">' +
        '<div class="row-between"><span class="badge badge-brand">' + esc(b.level) + '</span><span class="tiny dim">📚</span></div>' +
        '<h3 class="card-title mt-12">' + esc(b.name) + "</h3>" +
        '<div class="tiny dim mt-4">' + esc(b.by) + "</div>" +
        '<p class="small muted mt-8">' + esc(b.desc) + "</p>" +
      "</article>").join("");

    const ph = $("#promptList");
    if (ph) ph.innerHTML = D.promptTips.map((p, i) =>
      '<div class="acc-item' + (i === 0 ? " open" : "") + '">' +
        '<button class="acc-head">' + esc(p.title) + icon("chev", "chev") + "</button>" +
        '<div class="acc-body"><div class="acc-body-inner">' + esc(p.desc) + "</div></div>" +
      "</div>").join("");

    // 注意：手风琴绑定统一由 boot() 调用 initAccordion() 完成，此处不可重复绑定。
    // initAccordion();

    // 提示词模板示例
    const code = $("#promptCode");
    if (code) {
      code.textContent = t("learn.promptCode");
    }
    const copyBtn = $("#copyPrompt");
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        const txt = $("#promptCode").textContent;
        navigator.clipboard && navigator.clipboard.writeText(txt).then(
          () => toast("提示词模板已复制到剪贴板"),
          () => toast("复制失败，请手动选择复制")
        );
      });
    }
  }

  /* ============================== 13. 术语页 ============================== */
  function initGlossary() {
    const host = $("#glossList");
    if (!host) return;
    const state = { q: "", cat: "all", letter: "all" };

    const cats = Array.from(new Set(D.glossary.map((g) => g.c)));
    $("#glossCats").innerHTML = '<button class="chip active" data-cat="all">' + t("glossary.allCats") + '</button>' +
      cats.map((c) => {
        const cnt = D.glossary.filter((g) => g.c === c).length;
        return '<button class="chip" data-cat="' + esc(c) + '">' + esc(c) + '<span class="cnt">' + cnt + "</span></button>";
      }).join("");
    $("#glossCats").addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      state.cat = b.dataset.cat;
      $$(".chip", $("#glossCats")).forEach((x) => x.classList.toggle("active", x === b));
      render();
    });

    // 字母索引：取英文名的首字母（中文数据用 en 字段，英文数据用 t 字段）
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const used = {};
    const keyOf = (g) => {
      const cands = [g.en, g.t];
      for (let i = 0; i < cands.length; i++) {
        const c = cands[i];
        if (c && /^[A-Za-z]/.test(c)) return c.toUpperCase()[0];
      }
      return "#";
    };
    D.glossary.forEach((g) => {
      const ch = keyOf(g);
      if (/[A-Z]/.test(ch)) used[ch] = (used[ch] || 0) + 1;
    });
    $("#alphaIndex").innerHTML = '<button data-l="all" class="active">' + t("glossary.all") + '</button>' +
      letters.map((l) => '<button data-l="' + l + '"' + (used[l] ? "" : " disabled") + ">" + l + "</button>").join("");
    $("#alphaIndex").addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b || b.disabled) return;
      state.letter = b.dataset.l;
      $$("button", $("#alphaIndex")).forEach((x) => x.classList.toggle("active", x === b));
      render();
    });

    $("#glossSearch").addEventListener("input", function () { state.q = this.value.trim().toLowerCase(); render(); });

    function render() {
      let list = D.glossary.slice();
      if (state.cat !== "all") list = list.filter((g) => g.c === state.cat);
      if (state.letter !== "all") list = list.filter((g) => keyOf(g) === state.letter);
      if (state.q) list = list.filter((g) => (g.t + g.en + g.d + g.c).toLowerCase().includes(state.q));
      $("#glossCount").textContent = t("glossary.count", { n: list.length });
      if (!list.length) { host.innerHTML = '<div class="empty" style="grid-column:1/-1"><div class="em-icon">📖</div><h3>' + t("glossary.empty") + '</h3></div>'; return; }
      host.innerHTML = list.map((g) =>
        '<article class="gloss-item card-click" id="' + encodeURIComponent(g.t) + '"' +
          ' data-detail="gloss" data-key="' + esc(g.t) + '" tabindex="0" role="button" title="' + t("detail.viewDetail") + '">' +
          '<div class="gloss-term">' + esc(g.t) + '<span class="gloss-en">' + esc(g.en) + '</span><span class="badge" style="margin-left:auto">' + esc(g.c) + "</span></div>" +
          '<div class="gloss-def">' + esc(g.d) + "</div>" +
        "</article>").join("");
    }
    render();

    if (location.hash) {
      const t = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (t) setTimeout(() => { t.scrollIntoView({ behavior: "smooth", block: "center" }); t.style.borderColor = "var(--brand)"; }, 200);
    }
  }

  /* ============================== 14. 时间线页 ============================== */
  function initTimeline() {
    const host = $("#timelineList");
    if (!host) return;
    host.innerHTML = D.timeline.map((tm) =>
      '<div class="tl-item card-click" id="' + encodeURIComponent(tm.date) + '"' +
        ' data-detail="timeline" data-key="' + esc(tm.date) + '" tabindex="0" role="button" title="' + t("detail.viewDetail") + '">' +
        '<div class="tl-date">' + esc(tm.date) + "</div>" +
        '<div class="tl-title">' + esc(tm.title) + "</div>" +
        '<div class="tl-desc">' + esc(tm.desc) + "</div>" +
      "</div>").join("");

    const newsHost = $("#tlNews");
    if (newsHost) {
      const sorted = D.news.slice().sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 6);
      newsHost.innerHTML = sorted.map((n, i) => newsCard(n, i)).join("");
    }
  }

  /* ============================== 14.5 硬件选型页 ============================== */
  const HW_COLORS = ["#4f46e5", "#06b6d4", "#12b76a", "#f79009", "#ec4899", "#8b5cf6"];

  function initHardware() {
    const root = $("#hwRoot");
    if (!root) return;
    const H = D.hardware;

    if (!H) {
      root.innerHTML = '<div class="empty"><div class="em-icon">🧩</div><h3>' + t("hw.noData") + "</h3></div>";
      return;
    }

    /* ---- 时效声明 ---- */
    const upd = $("#hwUpdated");
    if (upd) upd.innerHTML = t("hw.updated") + ' <b>' + esc(H.updated) + "</b>";
    const intro = $("#hwIntro");
    if (intro) intro.textContent = H.intro;

    /* ---- 市场级 / 工业级 对比卡 ---- */
    const grades = $("#hwGrades");
    if (grades) {
      grades.innerHTML = H.grades.map((g) =>
        '<div class="hw-grade-card" style="--gc:' + g.color + '">' +
          '<div class="gname">' + g.icon + " " + esc(g.name) + "</div>" +
          '<div class="gsub">' + esc(g.sub) + "</div>" +
          "<p>" + esc(g.desc) + "</p>" +
          '<div class="gtags">' + g.tags.map((x) => '<span class="badge">' + esc(x) + "</span>").join("") + "</div>" +
        "</div>").join("");
    }

    /* ---- 对比表 ---- */
    const cmp = $("#hwCompare");
    if (cmp) {
      const gm = H.grades[0], gi = H.grades[1];
      cmp.innerHTML =
        '<div class="table-wrap"><table class="data"><thead><tr>' +
          "<th>" + t("hw.compareItem") + "</th>" +
          '<th>' + esc(gm.name) + " · " + esc(gm.sub) + "</th>" +
          '<th>' + esc(gi.name) + " · " + esc(gi.sub) + "</th>" +
        "</tr></thead><tbody>" +
        H.gradeCompare.map((r) =>
          '<tr' + (r.key ? ' class="hw-key-row"' : "") + ">" +
            "<td><b>" + esc(r.item) + "</b></td>" +
            "<td>" + esc(r.market) + "</td>" +
            "<td>" + esc(r.industrial) + "</td>" +
          "</tr>").join("") +
        "</tbody></table></div>";
    }

    /* ---- 受众切换 ---- */
    const tabs = $("#hwTabs");
    const panel = $("#hwPanel");
    const gradeOf = (id) => H.grades.find((g) => g.id === id) || H.grades[0];

    /* 支持 #personal 这类深链接与记忆上次选择 */
    const hashId = (location.hash || "").replace(/^#/, "");
    let current = H.segments.some((s) => s.id === hashId)
      ? hashId
      : (Store.get("aihub-hw-segment") || (H.segments[0] && H.segments[0].id));
    if (!H.segments.some((s) => s.id === current)) current = H.segments[0].id;

    function renderTabs() {
      tabs.innerHTML = H.segments.map((s) => {
        const g = gradeOf(s.grade);
        return '<button class="hw-seg-tab' + (s.id === current ? " active" : "") + '" data-seg="' + esc(s.id) + '">' +
          '<span class="grade-dot" style="background:' + g.color + '" title="' + esc(g.name) + '"></span>' +
          '<div class="ico">' + s.icon + "</div>" +
          '<div class="nm">' + esc(s.name) + "</div>" +
          '<div class="sub">' + esc(s.audience) + "</div>" +
          "</button>";
      }).join("");
    }

    function renderPanel() {
      const s = H.segments.find((x) => x.id === current);
      if (!s) return;
      const g = gradeOf(s.grade);

      panel.innerHTML =
        '<div class="hw-panel">' +
          '<div class="hw-headline"><span>' + g.icon + "</span><span>" + esc(s.headline) + "</span>" +
            '<span class="badge" style="margin-left:auto;background:' + g.color + '1f;color:' + g.color + ';border-color:transparent">' +
              esc(g.name) + "</span></div>" +

          '<div class="grid grid-2 mb-24">' +
            '<div class="card card-pad-sm">' +
              '<div class="sec-eyebrow">' + t("hw.audience") + "</div>" +
              '<p class="small muted">' + esc(s.audience) + "</p>" +
            "</div>" +
            '<div class="card card-pad-sm">' +
              '<div class="sec-eyebrow">' + t("hw.scenarios") + "</div>" +
              '<div class="row gap-6 wrap">' + s.scenarios.map((x) => '<span class="badge">' + esc(x) + "</span>").join("") + "</div>" +
            "</div>" +
          "</div>" +

          '<div class="sec-eyebrow">' + t("hw.builds") + "</div>" +
          '<div class="hw-builds">' +
            s.builds.map((b) =>
              '<div class="hw-build">' +
                '<span class="hw-build-tier">' + esc(b.tier) + "</span>" +
                "<h4>" + esc(b.name) + "</h4>" +
                '<div class="price">' + esc(b.price) + "</div>" +
                '<dl class="hw-spec">' +
                  b.spec.map((row) => "<dt>" + esc(row[0]) + "</dt><dd>" + esc(row[1]) + "</dd>").join("") +
                "</dl>" +
                '<div class="hw-runs"><b>' + t("hw.runs") + "：</b>" + esc(b.runs) + "</div>" +
                '<div class="note">' + esc(b.note) + "</div>" +
              "</div>").join("") +
          "</div>" +

          '<div class="sec-head mt-32" style="margin-bottom:16px"><div>' +
            '<div class="sec-eyebrow">' + t("hw.pitfalls") + "</div>" +
          "</div></div>" +
          '<div class="hw-mistakes">' +
            s.pitfalls.map((p) => '<div class="hw-mistake"><div class="md" style="margin-top:0">' + esc(p) + "</div></div>").join("") +
          "</div>" +
        "</div>";
    }

    tabs.addEventListener("click", (e) => {
      const b = e.target.closest("[data-seg]");
      if (!b) return;
      current = b.dataset.seg;
      Store.set("aihub-hw-segment", current);
      renderTabs();
      renderPanel();
    });

    renderTabs();
    renderPanel();

    /* ---- 显存速查表 ---- */
    const vram = $("#hwVram");
    if (vram) {
      vram.innerHTML =
        '<div class="table-wrap"><table class="data"><thead><tr>' +
          "<th>" + t("hw.vramSize") + "</th><th>FP16</th><th>INT8</th><th>INT4</th>" +
          '<th>' + t("hw.vramMarket") + "</th><th>" + t("hw.vramProf") + "</th>" +
        "</tr></thead><tbody>" +
        H.vram.map((r) =>
          "<tr><td class=\"name-cell\">" + esc(r.size) + "</td>" +
          '<td class="mono tiny">' + esc(r.fp16) + "</td>" +
          '<td class="mono tiny">' + esc(r.int8) + "</td>" +
          '<td class="mono tiny">' + esc(r.int4) + "</td>" +
          '<td class="tiny">' + esc(r.market) + "</td>" +
          '<td class="tiny">' + esc(r.prof) + "</td></tr>").join("") +
        "</tbody></table></div>" +
        '<div class="notice mt-16">' + esc(H.vramNote) + "</div>";
    }

    /* ---- 关键指标 ---- */
    const metrics = $("#hwMetrics");
    if (metrics) {
      metrics.innerHTML = H.metrics.map((m) =>
        '<div class="hw-metric">' +
          '<div class="mname">' + esc(m.name) + "</div>" +
          '<div class="mrole">' + esc(m.role) + "</div>" +
          '<div class="mdetail">' + esc(m.detail) + "</div>" +
        "</div>").join("");
    }

    /* ---- 预算分配条形图 ---- */
    const budget = $("#hwBudget");
    if (budget) {
      budget.innerHTML = H.budget.map((b) => {
        const seg = H.segments.find((s) => s.short === b.segment || s.name === b.segment);
        const bars = b.alloc.map((a, i) => {
          const style = "width:" + a[1] + "%;background:" + HW_COLORS[i % HW_COLORS.length];
          return '<span style="' + style + '" title="' + esc(a[0]) + " " + a[1] + '">' + a[1] + "%</span>";
        }).join("");
        const legend = b.alloc.map((a, i) =>
          '<span><i style="background:' + HW_COLORS[i % HW_COLORS.length] + '"></i>' + esc(a[0]) + " " + a[1] + "%</span>").join("");
        return '<div class="hw-budget-row">' +
          '<div class="bl">' + (seg ? seg.icon + " " : "") + esc(b.segment) + "</div>" +
          '<div class="hw-budget-bar">' + bars + "</div>" +
          '<div class="hw-budget-legend">' + legend + "</div>" +
        "</div>";
      }).join("");
    }

    /* ---- 常见误区 ---- */
    const mis = $("#hwMistakes");
    if (mis) {
      mis.innerHTML = H.mistakes.map((m) =>
        '<div class="hw-mistake"><div class="mt">' + esc(m.title) + '</div><div class="md">' + esc(m.desc) + "</div></div>").join("");
    }

    /* ---- 采购自检清单 ---- */
    const chk = $("#hwChecklist");
    if (chk) {
      chk.innerHTML = H.checklist.map((c) => "<li>" + icon("check") + "<span>" + esc(c) + "</span></li>").join("");
    }

    /* ---- 深链接：#personal 直接定位到对应受众 ---- */
    if (H.segments.some((s) => s.id === hashId)) {
      setTimeout(() => {
        const el = $("#hwRoot");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  }

  /* ============================== 15. 手风琴 ============================== */
  function initAccordion() {
    $$(".acc-head").forEach((h) =>
      h.addEventListener("click", function () {
        const item = this.parentElement;
        const wasOpen = item.classList.contains("open");
        const single = item.parentElement.dataset.single === "true";
        if (single) $$(".acc-item", item.parentElement).forEach((x) => x.classList.remove("open"));
        item.classList.toggle("open", !wasOpen);
      })
    );
  }

  /* ============================== 16. 通用交互 ============================== */
  /* 为单个表格启用表头点击排序（表格重新渲染后需重新调用） */
  function enableTableSort(tb) {
    if (tb.dataset.sortReady === "1") return;
    tb.dataset.sortReady = "1";
    $$("thead th", tb).forEach((th, idx) => {
      if (th.dataset.nosort !== undefined) return;
      th.insertAdjacentHTML("beforeend", '<span class="sort-ind">▲▼</span>');
      let asc = true;
      th.addEventListener("click", () => {
        const body = tb.tBodies[0];
        const rows = Array.prototype.slice.call(body.rows);
        rows.sort((a, b) => {
          const x = a.cells[idx] ? a.cells[idx].textContent.trim() : "";
          const y = b.cells[idx] ? b.cells[idx].textContent.trim() : "";
          const nx = parseFloat(x.replace(/[^\d.\-]/g, ""));
          const ny = parseFloat(y.replace(/[^\d.\-]/g, ""));
          if (!isNaN(nx) && !isNaN(ny)) return asc ? nx - ny : ny - nx;
          return asc ? x.localeCompare(y, "zh") : y.localeCompare(x, "zh");
        });
        rows.forEach((r) => body.appendChild(r));
        $$("thead th", tb).forEach((t) => t.classList.remove("sorted"));
        th.classList.add("sorted");
        asc = !asc;
      });
    });
  }

  function initMisc() {
    // 锚点平滑（同页 hash）
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]:not([href="#"])');
      if (!a) return;
      const t = document.getElementById(a.getAttribute("href").slice(1));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth", block: "start" }); }
    });

    // 表格排序
    $$("table.data").forEach(enableTableSort);

    // 关闭所有弹窗（ESC）
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      let any = false;
      $$(".overlay.open").forEach((o) => { o.classList.remove("open"); any = true; });
      if (any && !$("#searchOverlay.open")) document.body.style.overflow = "";
    });

    // 外链统一新窗口 + 安全属性
    $$('a[href^="http"]').forEach((a) => {
      if (!a.target) a.target = "_blank";
      a.rel = "noopener";
    });
  }

  /* ============================== 16.5 自动更新状态展示 ============================== */
  function renderFeedStatus(added) {
    // 首页 Hero 的更新时间
    const heroUpd = $("#heroUpdated");
    if (heroUpd) {
      const t = FEED.updated || D.meta.updated;
      heroUpd.textContent = t;
    }
    // 资讯页的抓取状态说明
    const box = $("#feedStatus");
    if (!box) return;
    if (!FEED.loaded) {
      box.innerHTML = '<b>' + t("news.autoLabel") + "</b>" + t("news.autoNone") + ' <code class="inline">python3 scripts/fetch_news.py</code>';
      return;
    }
    if (!added) {
      box.innerHTML =
        '<b>' + t("news.autoLabel") + "</b>" + t("news.autoConnected", { n: FEED.sources.length }) +
        t("news.autoLastTime") + "<b>" + (FEED.updated || "—") + "</b>。";
      return;
    }
    const fail = FEED.failed.length
      ? '<span style="color:var(--warn)">' + t("news.autoFailed", { n: FEED.failed.length }) + "</span>"
      : "";
    box.innerHTML =
      '<b>' + t("news.autoLabel") + "</b>" + t("news.autoAdded", { sources: FEED.sources.length, added: added, fail: fail }) +
      t("news.autoTime") + "<b>" + (FEED.updated || "—") + "</b>。";
  }

  /* ============================== 16.2 内容详情弹层 ============================== */
  /* 站点只有列表页，所以每个条目都需要一个可打开的“详情”，
     否则卡片就只是好看的摆设。有外链的开外链，没有的开弹层。 */
  const SEARCH_ENGINE = LANG === "zh"
    ? "https://www.bing.com/search?q="
    : "https://www.google.com/search?q=";

  const searchUrl = (q) => SEARCH_ENGINE + encodeURIComponent(q);

  function closeDetail() {
    const ov = $("#detailOverlay");
    if (!ov) return;
    ov.classList.remove("open");
    if (!$(".overlay.open")) document.body.style.overflow = "";
  }

  /* 把各类数据规格化成统一的详情结构 */
  function detailCfg(kind, key) {
    if (kind === "news") {
      const n = D.news.find((x) => x.id === key);
      if (!n) return null;
      return {
        badges: [catBadge(n.cat), n.auto ? '<span class="badge badge-brand">' + t("news.badge.auto") + "</span>" : "",
                 n.hot >= 85 ? '<span class="badge badge-danger">' + icon("flame") + t("news.badge.hot") + "</span>" : ""],
        title: n.title,
        sub: [n.source, fmtDate(n.date), t("news.readTime", { n: n.readTime })],
        desc: n.summary,
        tags: n.tags || [],
        rows: [],
        actions: [],
        note: n.link ? t("detail.sourceNote") : t("detail.noSource"),
        anchor: n.id,
        search: n.title
      };
    }
    if (kind === "model") {
      const m = D.models.find((x) => x.name === key);
      if (!m) return null;
      return {
        badges: ['<span class="badge ' + (m.license === "open" ? "badge-ok" : "badge-warn") + '">' +
                 (m.license === "open" ? t("models.open") : t("models.closed")) + "</span>",
                 '<span class="mono tiny" style="color:var(--brand);font-weight:700">' + m.score + "</span>"],
        title: m.name,
        sub: [m.org, m.region, m.released],
        desc: m.desc,
        tags: m.strength,
        rows: [
          [t("cmp.row.params"), m.params],
          [t("cmp.row.ctx"), m.ctx],
          [t("cmp.row.modality"), m.modality.join(" / ")],
          [t("cmp.row.price"), m.price],
          [t("cmp.row.license"), m.license === "open" ? t("models.open") : t("models.closed")]
        ],
        actions: [],
        docs: m.docs || "",
        compare: m.name,
        anchor: m.name,
        search: m.name + " " + m.org
      };
    }
    if (kind === "gloss") {
      const g = D.glossary.find((x) => x.t === key);
      if (!g) return null;
      const related = D.glossary.filter((x) => x.c === g.c && x.t !== g.t).slice(0, 6);
      return {
        badges: ['<span class="badge badge-brand">' + esc(g.c) + "</span>"],
        title: g.t,
        sub: [g.en],
        desc: g.d,
        tags: [],
        rows: [],
        actions: [],
        related: related,
        anchor: g.t,
        search: g.t + " " + g.en
      };
    }
    if (kind === "timeline") {
      const tm = D.timeline.find((x) => x.date === key);
      if (!tm) return null;
      return {
        badges: ['<span class="badge badge-brand">' + esc(tm.date) + "</span>"],
        title: tm.title,
        sub: [],
        desc: tm.desc,
        tags: [],
        rows: [],
        actions: [],
        anchor: tm.date,
        search: tm.title + " AI " + tm.date
      };
    }
    if (kind === "tool") {
      const tl = D.tools.find((x) => x.name === key);
      if (!tl) return null;
      return {
        badges: ['<span class="badge badge-brand">' + esc((D.toolCats.find((c) => c.id === tl.cat) || {}).name || "") + "</span>"],
        title: tl.name,
        sub: [tl.by, tl.price],
        desc: tl.desc,
        tags: tl.tags,
        rows: [],
        actions: [],
        url: tl.url || "",
        anchor: tl.name,
        search: tl.name + " " + tl.by
      };
    }
    return null;
  }

  function openDetail(kind, key) {
    const c = detailCfg(kind, key);
    if (!c) return;

    let ov = $("#detailOverlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.className = "overlay";
      ov.id = "detailOverlay";
      document.body.appendChild(ov);
    }

    const rows = c.rows.length
      ? '<div class="detail-section"><div class="detail-section-title">' + t("detail.specs") + "</div>" +
        '<dl class="detail-rows">' +
        c.rows.map((r) => "<dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd>").join("") +
        "</dl></div>"
      : "";

    const tags = c.tags.length
      ? '<div class="detail-tags">' + c.tags.map((x) => '<span class="badge badge-brand">#' + esc(x) + "</span>").join("") + "</div>"
      : "";

    const related = (c.related && c.related.length)
      ? '<div class="detail-section"><div class="detail-section-title">' + t("detail.related") + "</div>" +
        '<div class="detail-related">' +
        c.related.map((g) => '<button data-gloss="' + esc(g.t) + '">' + esc(g.t) + "</button>").join("") +
        "</div></div>"
      : "";

    const acts = [];
    if (c.url) acts.push('<a class="btn btn-primary" href="' + esc(c.url) + '" target="_blank" rel="noopener">' + t("tools.visit") + icon("ext") + "</a>");
    if (c.docs) acts.push('<a class="btn" href="' + esc(c.docs) + '" target="_blank" rel="noopener">' + t("detail.openDocs") + icon("ext") + "</a>");
    if (c.search) acts.push('<a class="btn btn-ghost" href="' + searchUrl(c.search) + '" target="_blank" rel="noopener">' + t("detail.searchWeb") + icon("ext") + "</a>");
    if (c.compare) acts.push('<button class="btn" data-detail-cmp="' + esc(c.compare) + '">' + icon("columns") + t("detail.compare") + "</button>");
    acts.push('<button class="btn btn-ghost" data-detail-copy="' + esc(c.anchor) + '">' + icon("copy") + t("detail.copyLink") + "</button>");

    ov.innerHTML =
      '<div class="detail-panel" role="dialog" aria-modal="true" aria-label="' + esc(c.title) + '">' +
        '<div class="detail-head">' +
          '<button class="detail-close" data-detail-close aria-label="' + t("detail.close") + '">' + icon("close") + "</button>" +
          '<div class="badges">' + c.badges.filter(Boolean).join("") + "</div>" +
          '<h2 class="detail-title">' + esc(c.title) + "</h2>" +
          (c.sub.length ? '<div class="detail-sub">' + c.sub.filter(Boolean).map(esc).join('<span class="dim">·</span>') + "</div>" : "") +
        "</div>" +
        '<div class="detail-body">' +
          '<p class="detail-desc">' + esc(c.desc) + "</p>" +
          tags + rows + related +
          (c.note ? '<p class="detail-note">' + esc(c.note) + "</p>" : "") +
          '<p class="detail-note">' + t("detail.hint") + "</p>" +
        "</div>" +
        '<div class="detail-actions">' + acts.join("") + "</div>" +
      "</div>";

    ov.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  /* 弹层内部交互（事件委派到 document，因为弹层是动态创建的） */
  function initDetail() {
    document.addEventListener("click", (e) => {
      const ov = $("#detailOverlay");

      // ---- 已打开的弹层内部的交互 ----
      if (ov) {
        // 关闭（关闭按钮 / 点遮罩空白处）
        if (e.target.closest("[data-detail-close]") || e.target === ov) { closeDetail(); return; }

        // 相关词条切换
        const gl = e.target.closest("[data-gloss]");
        if (gl) { openDetail("gloss", gl.dataset.gloss); return; }

        // 加入对比
        const cp = e.target.closest("[data-detail-cmp]");
        if (cp) {
          if (typeof window.__cmpToggle === "function") {
            window.__cmpToggle(cp.dataset.detailCmp);
            toast(t("models.compared"));
          } else {
            toast(t("models.addCompare"));
          }
          return;
        }

        // 复制链接
        const cl = e.target.closest("[data-detail-copy]");
        if (cl) {
          const url = location.origin + location.pathname + "#" + encodeURIComponent(cl.dataset.detailCopy);
          if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(
              () => toast(t("toast.copied", { what: t("detail.linkCopied") })),
              () => toast(t("toast.copyFail")));
          } else { toast(t("toast.clipboardNA")); }
          return;
        }

        // 点弹层内部（非上述控件）不处理，避免穿透到后面的卡片
        if (ov.contains(e.target)) return;
      }

      // ---- 打开条目详情 ----
      const el = e.target.closest("[data-detail]");
      if (!el) return;
      if (e.target.closest("a, button, input, select")) return;   // 内部可点元素优先
      openDetail(el.dataset.detail, el.dataset.key);
    });

    // 键盘可达：Enter / 空格
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const el = document.activeElement;
      if (!el || !el.dataset || !el.dataset.detail) return;
      e.preventDefault();
      openDetail(el.dataset.detail, el.dataset.key);
    });

    // 外链统一新窗口 + 安全属性
    $$('a[href^="http"]').forEach((a) => {
      if (!a.target) a.target = "_blank";
      a.rel = "noopener";
    });
  }

  /* ============================== 17. 启动 ============================== */
  function boot() {
    renderChrome();
    const added = mergeFeed();
    buildSearchIndex();
    initSearch();
    const map = {
      home: initHome, news: initNews, models: initModels, tools: initTools,
      papers: initPapers, learn: initLearn, glossary: initGlossary, timeline: initTimeline,
      hardware: initHardware
    };
    try {
      if (map[PAGE]) map[PAGE]();
    } catch (err) {
      console.error("[AI HUB] 页面渲染出错：", err);
    }
    initAccordion();
    initMisc();
    initDetail();
    renderFeedStatus(added);
    console.log("%c" + D.meta.name + " · " + D.meta.nameZh + " v" + D.meta.version, "color:#4f46e5;font-weight:bold", "\ndata: " + D.meta.updated + (added ? " (+" + added + " auto)" : ""));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
