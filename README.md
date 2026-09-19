# AI HUB · 智汇

> 一个综合性的中英双语人工智能信息聚合网站 —— 资讯、模型库、工具导航、论文、学习路径、术语百科、发展史，
> 自动抓取更新，全部打包在一个纯静态站点里。

零依赖 · 零构建 · 中英双语 · 双击即看 · 可自由修改与部署。

---

## 快速开始

中英文站点入口：**中文** `index.html`　|　**English** `en/index.html`（也可在顶栏一键切换）

```bash
# 方式一：直接打开（最简单，无需任何环境）
open index.html          # macOS
# 或直接双击 index.html

# 方式二：本地静态服务器（推荐，便于后续接接口）
python3 -m http.server 8000
# 访问 http://localhost:8000

# 方式三：部署
# 把整个目录上传到 GitHub Pages / Vercel / Netlify / 对象存储即可
```

---

## 目录结构

```
ai-hub/
├── index.html            中文首页：Hero、头条资讯、分类、模型/工具/学习/术语速览
├── news.html             资讯中心：9 大分类 + 搜索 + 排序 + 分页
├── models.html           大模型库：24 个模型档案，卡片 / 表格双视图 + 横向对比
├── tools.html            AI 工具导航：按 10 个场景分类
├── papers.html           研究论文：18 篇里程碑论文 + 8 个顶会信息
├── learn.html            学习路径：6 阶段路线 + 课程 + 书单 + 提示词工程
├── glossary.html         术语百科：82 个词条，分类 + 字母索引 + 搜索
├── timeline.html         AI 发展史：12 个关键节点 + 三次浪潮
├── about.html            关于本站：数据来源、免责声明、更新日志
├── hardware.html         ⭐ 硬件配置推荐：市场级/工业级 + 四类使用者 + 显存速查
├── en/                   ⭐ 英文站（10 个页面，由 build-en.js 生成，勿手改）
├── scripts/
│   ├── fetch_news.py     ⭐ RSS 抓取器（纯标准库，无依赖）
│   ├── feeds.json        源列表与分类 / 标签 / 过滤关键词配置
│   └── build-en.js       ⭐ 英文站页面生成器
└── assets/
    ├── css/style.css     全站样式（设计变量、组件、响应式、打印）
    └── js/
        ├── i18n.js       ⭐ 界面文案多语言表（178 个键 × 中英）
        ├── data.zh.js    ⭐ 中文内容数据
        ├── data.en.js    ⭐ 英文内容数据（与中文键结构完全一致）
        ├── hardware.zh.js / hardware.en.js   硬件选型数据（独立文件，便于单独更新）
        ├── news-feed.js  自动生成的抓取产物（勿手改）
        ├── app.js        渲染与交互逻辑（不含任何内容文案）
        └── README-数据接入.md   字段说明 / 抓取脚本 / 接口接入
```

---

## 多语言架构

站点把「内容」与「界面文案」彻底分开，因此增删语言不需要改 HTML，也不需要改渲染逻辑：

| 层 | 文件 | 作用 |
| --- | --- | --- |
| 内容 | `assets/js/data.zh.js` / `data.en.js` | 资讯、模型、工具、术语等数据 |
| 界面文案 | `assets/js/i18n.js` | 按钮、表头、提示、错误消息等 178 个键 |
| 语言判定 | `<html lang="zh-CN">` / `lang="en"` | `app.js` 据此选词典与数据 |

```bash
# 重新生成英文站（改完 scripts/build-en.js 后执行）
node scripts/build-en.js

# 可点击性审计：检查死链与点不动的卡片（需先 npm i -D jsdom）
node scripts/audit-links.js
```

### 再加一种语言（例如日语）只需三步

1. 复制 `assets/js/data.en.js` 为 `data.ja.js`，翻译其中数组（**保持字段名不变**）；
2. 在 `i18n.js` 里加一个 `ja: { … }` 词典（缺的键会自动回退到中文）；
3. 复制 `scripts/build-en.js` 为 `build-ja.js`（改 `LANG` 与 `DATA` 两个常量），跑一次生成 `ja/`。

**`app.js` 不需要任何改动。** 中英两套数据的键结构已做一致性校验
（`news / models / tools / papers / confs / roadmap / courses / books / promptTips / glossary /
timeline / categories / toolCats / meta / stats`）。

---

## 功能一览

| 功能 | 说明 |
| --- | --- |
| **型号时效** | 硬件型号按 2026-09 在售校准：RTX 5090 32GB、RTX PRO 6000 Blackwell 96GB、GB300 NVL72、B200 192GB、MI350 288GB、Rubin |
| **硬件配置推荐** | `hardware.html`：市场级 vs 工业级 16 项对比、个人/专业/企业/工业四类推荐配置、**56 家品牌供应商目录（含国产化）**、**笔记本六档推荐**、**租赁 vs 自建成本计算器**、显存速查表、预算分配、采购自检清单 |
| **内容详情弹层** | 所有卡片均可点击：有原文的整卡跳原文，无外链的打开站内详情（规格参数、相关推荐、官方文档、复制链接），支持 ESC 关闭 |
| **中英双语** | 完整中文站 + `en/` 英文站，顶栏一键切换并保留当前页面 |
| **RSS 自动更新** | `scripts/fetch_news.py` 抓取 10 个中英文源，自动清洗/去重/分类/打标签，前端自动合并并标记「自动」条目 |
| **模型横向对比** | 勾选最多 4 个模型，逐项对照表 + 自动高亮最优值 + 一键复制 Markdown，选择本地保存 |
| **6 套配色主题** | 靖蓝 / 深海 / 翡翠 / 紫罗兰 / 落日 / 石墨，与深色模式独立组合，顶栏切换并记忆 |
| 全站搜索 | `⌘K` / `Ctrl+K` / `/` 唤起，本地索引，结果按类型分组（含抓取到的新闻） |
| 深色模式 | 跟随系统，手动切换后记忆；含首屏防闪烁脚本 |
| 响应式 | 桌面 / 平板 / 手机三档适配，移动端抽屉导航 |
| 分类筛选 | 资讯按分类、模型按许可与机构、工具按场景、术语按分类与首字母 |
| 双视图 | 模型库支持「卡片」与「表格对比」切换，表头可点击排序 |
| 分页 | 资讯列表分页，带省略号的智能页码 |
| 阅读体验 | 顶部阅读进度条、回到顶部按钮、锚点平滑滚动 |
| 无障碍 | `aria-label`、键盘导航、`prefers-reduced-motion` 支持 |
| 打印 | 独立的打印样式，去掉导航与交互元素 |

---

## 资讯自动更新（RSS）

零依赖，仅用 Python 标准库：

```bash
cd ~/ai-hub
python3 scripts/fetch_news.py            # 抓取并写入 assets/js/news-feed.js
python3 scripts/fetch_news.py --dry-run  # 先看看会抓到什么
python3 scripts/fetch_news.py --check    # 只检测各源是否可用
python3 scripts/fetch_news.py --insecure # 跳过 SSL 校验（仅排查用）
```

配合 crontab 每天早 7 点自动更新：

```cron
0 7 * * * cd /Users/zhupuya/ai-hub && /usr/bin/python3 scripts/fetch_news.py --quiet >> fetch.log 2>&1
```

**当前配置的源**（见 `scripts/feeds.json`，可增删）：
量子位、InfoQ 中文、雷锋网、少数派、Google AI Blog、MIT Tech Review AI、
Hugging Face Blog、Ars Technica、arXiv cs.AI、arXiv cs.CL。

**工作原理**：脚本输出 `window.AI_FEED = {...}`，`app.js` 在启动时按链接与标题去重后
合并到 `D.news` 顶部，并重建搜索索引。抓取失败或文件为空时，站点自动回退到本地精选内容。

> ⚠️ 抓取前请确认目标站点的 `robots.txt`、服务条款与版权要求。脚本默认只取标题、摘要与原文链接，
> 不复制全文，且在前端保留来源标注与跳转。对外运营前请自行评估合规性。

---

## 模型横向对比

在 `models.html`：

1. 点卡片右上角「对比」（或切到表格视图勾选左侧选框），最多选 4 个；
2. 底部出现对比栏，点「开始对比」生成 10 项逐项对照表；
3. 「综合评分」一行自动高亮最优值；
4. 支持「复制为 Markdown」，可直接粘进周报或文档。

选择结果存在 `localStorage`（key: `aihub-compare`），刷新或换页面都不丢失。
对比的字段定义在 `app.js` 的 `CMP_ROWS` 数组里，可自由增删。

---

## 内容板块数据量

| 板块 | 中文站 | 英文站 |
| --- | --- | --- |
| 资讯条目 | 30 | 30 |
| 大模型档案 | 24 | 24 |
| AI 工具 | 46 | 48 |
| 术语词条 | 82 | 82 |
| 经典论文 | 18 | 18 |
| 学术会议 | 8 | 8 |
| 学习阶段 | 6 | 6 |
| 硬件受众 / 配置方案 | 4 / 12 | 4 / 12 |
| 品牌与供应商 | 56 | 56 |
| 笔记本机型 | 6 | 6 |
| 测算预置方案 | 8 | 8 |
| 时间线节点 | 12 | 12 |
| 界面文案键 | 178 | 178 |

---


## 如何更新内容

**所有内容都集中在 `assets/js/data.js` 一个文件里**，页面逻辑与数据完全分离：

1. 打开 `assets/js/data.js`；
2. 找到 `news` / `models` / `tools` / `glossary` 等数组；
3. 复制一条现有记录，改字段内容（保持字段名与类型不变）；
4. 更新 `meta.updated`；
5. 刷新页面。

语法检查：

```bash
node --check assets/js/data.js
```

详细字段说明、RSS 自动抓取脚本、远程接口接入方式，见
[`assets/js/README-数据接入.md`](assets/js/README-数据接入.md)。

---

## 自定义外观

### 1. 换主色 / 新增配色主题

内置 6 套配色，用户可在顶栏调色板图标处切换。想新增一套，改两处：

```css
/* ① style.css：追加配色变量 */
[data-accent="forest"] { --brand: #15803d; --brand-2: #65a30d; --brand-3: #84cc16;
                         --brand-soft: rgba(21, 128, 61, .11); }
[data-theme="dark"][data-accent="forest"] { --brand: #4ade80; --brand-2: #a3e635;
                         --brand-3: #bef264; --brand-soft: rgba(74, 222, 128, .15); }
```

```js
// ② app.js：在 ACCENTS 数组里加一项
{ id: "forest", name: "森林", colors: ["#15803d", "#65a30d"] }
```

### 2. 改尺寸与基础风格

```css
:root {
  --maxw: 1200px;      /* 内容最大宽度 */
  --radius: 14px;      /* 圆角 */
  --header-h: 66px;    /* 顶栏高度 */
}
```

站点名称、标语、版本号在 `data.js` 的 `meta` 对象里。

---

## 浏览器兼容

- Chrome / Edge 111+
- Safari 16.4+
- Firefox 113+

用到了 `color-mix()`、CSS 变量、`grid`、`backdrop-filter`、可选链等特性。
关键位置（顶栏背景、搜索遮罩）已写旧浏览器回退值，低版本浏览器下仍可正常阅读，
只是毛玻璃与部分颜色细节会降级。如需支持更老版本，请引入 PostCSS 处理。

---

## 部署（GitHub Pages · 完全无人值守）

### 一次性设置

```bash
cd ~/ai-hub
git init -b main
git add .
git commit -m "feat: AI HUB 站点首次提交"
git remote add origin https://github.com/<你的用户名>/ai-hub.git
git push -u origin main
```

然后进入仓库 **Settings → Pages**，选择部署方式（两种二选一）：

| 方式 | 设置 | 是否需要部署工作流 | 说明 |
| --- | --- | --- | --- |
| **A. 从分支部署（推荐，最省事）** | Source = `Deploy from a branch`，分支 `main` / 目录 `/` | ❌ 不需要 | 抓取任务一提交，Pages 自动重新发布，链路最短 |
| **B. 用 Actions 部署** | Source = `GitHub Actions` | ✅ 用 `.github/workflows/deploy-pages.yml` | 可在部署前自动生成真实域名的 sitemap，支持 Environments 审批 |

方式 B 需要在 **Settings → Actions → General → Workflow permissions** 里
勾选 **Read and write permissions**（否则抓取任务无法推送提交）。

### 之后就是全自动

```
每天 07:00（北京时间）
      │
      ▼
[抓取 AI 资讯] 工作流
      │  python3 scripts/fetch_news.py
      │  校验 news-feed.js（语法 + 必填字段）
      │  git commit + push   ← 只在内容变化时提交
      ▼
main 分支上的 assets/js/news-feed.js 更新
      │
      ▼
GitHub Pages 重新发布（方式 A 自动 / 方式 B 由 workflow_run 触发）
      │
      ▼
中英文站点同时展示最新资讯（英文站只显示英文源）
```

### 手动触发一次

仓库 **Actions → 抓取 AI 资讯 → Run workflow**，可临时指定：

- **max_total** —— 最多保留多少条（留空用 `feeds.json` 配置）
- **force** —— 即使抓到 0 条也覆盖文件（默认会保留旧数据，避免把页面清空）

### 改抓取时间

编辑 `.github/workflows/fetch-news.yml` 里的 cron（**UTC 时间**）：

```yaml
on:
  schedule:
    - cron: "0 23 * * *"   # UTC 23:00 = 北京 07:00
```

常用换算：

| 想要的时间（北京） | cron |
| --- | --- |
| 07:00 | `0 23 * * *` |
| 12:00 | `0 4 * * *` |
| 20:00 | `0 12 * * *` |
| 每 6 小时 | `0 */6 * * *` |

### 自定义域名

1. 仓库 **Settings → Pages → Custom domain** 填入域名，GitHub 会生成 `CNAME` 文件；
2. 在 **Settings → Secrets and variables → Actions → Variables** 里加一个
   `SITE_URL`（例如 `https://aihub.example.com`），部署时会用它生成 sitemap；
3. 域名服务商处按 GitHub 文档配置 A / CNAME 记录。

### 本地验证工作流

不想推上去才发现问题，可以先在本地把工作流的每一步跑一遍：

```bash
bash scripts/test-workflows.sh
```

### 已知注意事项

- **定时任务会因长期无活动被暂停**：GitHub 会在仓库 60 天无任何活动后暂停 schedule。
  本仓库的抓取任务每跑一次就产生一个提交，本身就构成活动，因此会自我维持；
  但如果你把 `feeds.json` 配成全失败，连续失败不产生提交，就要留意 Actions 页面的提醒。
- **分支保护**：如果 main 分支开了「Require pull request」，bot 无法直接 push。
  需要给 `github-actions[bot]` 开例外，或改用 PR 模式（把提交改成开 PR）。
- **cron 有延迟**：GitHub 的 schedule 在高峰期可能延迟几分钟到半小时，属正常现象。
- **语言过滤**：中文站 `meta.acceptLangs = ["zh","en"]`，英文站 `["en"]`。
  想调整改 `assets/js/data.zh.js` / `data.en.js` 里的这个字段即可。

---

## 重要提示

> ⚠️ 站内资讯、模型参数、价格、评分、链接等均为**演示数据**，
> 用于展示站点结构与交互效果，可能与实际情况不符。
> 正式使用前请替换为真实数据，并以各厂商 / 机构官方发布为准。

使用前请阅读 `about.html` 中的免责声明。工具链接指向第三方网站，
本站不对其内容与可用性负责。文中出现的模型名称与商标归各自所有者所有。

---

## License

模板本身可自由修改与二次分发。内容数据请在替换为自有 / 已授权内容后再对外发布。
