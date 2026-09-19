# 数据接入与内容维护指南

本文件说明如何维护 `data.js` 中的数据，以及如何接入 RSS / API 实现自动更新。

---

## 一、为什么所有内容都在一个文件里

`assets/js/data.zh.js`（中文）与 `assets/js/data.en.js`（英文）只做一件事：把数据挂到 `window.AI_DATA` 上。
界面文案不在这里，而在 `assets/js/i18n.js`。

```js
window.AI_DATA = (function () {
  const news = [ /* … */ ];
  const models = [ /* … */ ];
  return { meta, stats, categories, catName, news, models, tools, toolCats,
           papers, confs, roadmap, courses, books, promptTips, glossary, timeline };
})();
```

`app.js` 只读取 `window.AI_DATA` 与 `window.AI_I18N`（依据 `<html lang>` 选择语言）并渲染 DOM。
**渲染逻辑、界面文案、内容数据三者完全分离**，所以更新内容时不需要碰任何 HTML / CSS / JS 逻辑。

```
<html lang="zh-CN"> 或 <html lang="en">
        │
        ├─→ i18n.js    选择 zh / en 词典（界面文案）
        └─→ data.*.js  选择对应语言的内容数据
                │
                └─→ app.js  按词典 + 数据渲染 DOM
```

> 采用内联 JS 而不是 `fetch('news.json')`，是为了让页面在 `file://` 协议下
> 双击即可打开（浏览器对本地 `fetch` 有 CORS 限制）。

---

## 二、各数组字段说明

### 1. `news` — 资讯

```js
{
  id: "n01",              // 唯一 ID，用于 news.html#n01 锚点跳转
  featured: true,         // 是否作为首页头条（建议只设 1 条）
  cat: "model",           // 分类 id，必须存在于 categories
  date: "2026-09-18",     // 格式必须为 YYYY-MM-DD，用于排序与显示
  source: "官方发布",      // 来源名称（请填写真实来源）
  title: "标题",
  summary: "摘要，建议 60–140 字",
  tags: ["大模型", "多模态"], // 自由标签，用于搜索
  readTime: 6,            // 预估阅读分钟数
  hot: 98                 // 热度 0–100，用于排序与「热」标记（≥85 显示）
}
```

### 2. `models` — 大模型档案

```js
{
  name: "GPT-5 系列", org: "OpenAI", region: "美国", released: "2025",
  license: "closed",                  // "open" | "closed"
  params: "未公开",                    // 参数量描述
  ctx: "40 万+ Token",                // 上下文长度
  modality: ["文本", "图像"],          // 支持模态
  price: "$1.25–10 / 百万 Token",     // 参考价格
  strength: ["通用推理", "工具调用"],   // 优势标签
  desc: "一句话描述",
  score: 96                            // 综合评分 0–100（须说明为参考性指标）
}
```

### 3. `tools` — 工具导航

```js
{
  name: "Cursor", cat: "code",   // cat 必须存在于 toolCats
  by: "Anysphere",
  desc: "描述",
  tags: ["编辑器", "Agent"],
  price: "免费 / 订阅",
  url: "https://cursor.com"      // 留空字符串则显示「请自行搜索」
}
```

### 4. `papers` — 论文

```js
{ title: "…", year: 2017, venue: "NeurIPS", authors: "Vaswani et al.",
  org: "Google", tags: ["Transformer"], desc: "…", stars: 5 }  // stars 1–5
```

### 5. `glossary` — 术语

```js
{ t: "幻觉", en: "Hallucination", c: "问题", d: "一句话释义" }
// c 为分类名，会自动聚合成筛选按钮；en 的首字母用于字母索引
```

### 6. 其它

- `roadmap`：学习阶段，字段 `step/title/time/level/desc/items[]/link`
- `courses` / `books`：`name/by/level/lang/desc/free`
- `promptTips`：`title/desc`
- `confs`：`name/full/area/time/rank/site`
- `timeline`：`date/title/desc`
- `categories`：资讯分类，字段 `id/name/color/icon`（color 用于小圆点与图标底色）
- `toolCats`：工具分类，字段 `id/name`
- `meta`：站点名称、版本、更新时间、免责声明

---

## 三、手工维护（最简单）

1. 找到对应数组，复制一条现有条目；
2. 修改字段内容，注意**保持字段名与类型不变**；
3. 保存后刷新页面即可（`Ctrl+F5` 强制刷新以跳过缓存）；
4. 同步更新 `meta.updated` 与 `stats` 中的数字。

⚠️ 注意事项：

- 字符串中使用英文双引号时必须转义：`"他说：\"你好\""`；
- 每条记录之间用 `,` 分隔，最后一条不要加尾逗号以外的东西；
- 数组里出现中文引号「」是没有问题的，但不要用中文引号包裹字符串；
- 修改后用下面的命令可快速检查语法错误：

  ```bash
  node --check assets/js/data.zh.js
  node --check assets/js/data.en.js
  node --check assets/js/i18n.js
  ```

- 两套语言数据必须保持**相同的键与字段结构**，只翻译值。自检命令：

  ```bash
  node -e '
  global.window={};require("./assets/js/data.zh.js");const Z=Object.keys(window.AI_DATA).sort().join(",");
  delete require.cache[require.resolve("./assets/js/data.zh.js")];
  global.window={};require("./assets/js/data.en.js");const E=Object.keys(window.AI_DATA).sort().join(",");
  console.log(Z===E?"✓ 键一致":"✗ 不一致");'
  ```

---

## 四、自动抓取（已内置，推荐）

项目已自带一个零依赖的抓取器：`scripts/fetch_news.py`，配置在 `scripts/feeds.json`。

```bash
cd ~/ai-hub
python3 scripts/fetch_news.py            # 抓取并写入 assets/js/news-feed.js
python3 scripts/fetch_news.py --dry-run  # 只打印结果，不写文件
python3 scripts/fetch_news.py --check    # 只检测各源是否可用
python3 scripts/fetch_news.py --max 20   # 覆盖最大条目数
```

### 工作流程

```
feeds.json  ┬─→ 抓取（重试 / SSL 兼容）
            ├─→ 去标签、解实体、规范化日期
            ├─→ 按链接 + 标题归一化去重
            ├─→ 关键词分类（8 个类别，取命中最多）
            ├─→ 打标签 + 计算热度与阅读时长
            └─→ 输出 assets/js/news-feed.js
                        ↓
              app.js 启动时 mergeFeed() 合并进 D.news
                        ↓
              重建搜索索引 → 首页 / 资讯页 / 全站搜索均可见
```

### 配置项说明（feeds.json）

### 与前端的衔接

抓到的每条数据都带 `lang` 字段（`zh` / `en`）。中文站的 `meta.acceptLangs` 为 `["zh","en"]`，
英文站为 `["en"]`，因此英文站只显示英文源，避免界面语言与内容语言不一致。

### 配置项说明（feeds.json）

| 字段 | 说明 |
| --- | --- |
| `settings.max_per_feed` | 每个源最多取多少条 |
| `settings.max_total` | 最终最多保留多少条 |
| `settings.fresh_days` | 超过多少天的旧闻丢弃 |
| `settings.user_agent` | 全局 UA（部分站点屏蔽 bot 型 UA） |
| `settings.min_summary_len` | 摘要过短时用标题补全 |
| `feeds[].only_ai` | `true` 时先过 `ai_keywords` 关键词，过滤掉非 AI 内容 |
| `feeds[].user_agent` | 单源覆盖 UA |
| `feeds[].lang` | `zh` / `en`，影响自动标签「中文源 / 英文源」 |
| `categories` | 分类关键词表，命中数最多的类别胜出 |
| `tag_rules` | 标签规则，命中则附加对应标签 |

### 定时执行

```cron
0 7 * * * cd /Users/zhupuya/ai-hub && /usr/bin/python3 scripts/fetch_news.py --quiet >> fetch.log 2>&1
```

macOS 也可用 `launchd`，或 GitHub Actions（定时 commit 生成的 `news-feed.js`）。

### 常见问题

**Q：报 `CERTIFICATE_VERIFY_FAILED`？**
A：macOS 上用 python.org 安装的 Python 常缺根证书。脚本已自动依次尝试 certifi、
`/etc/ssl/cert.pem` 等系统证书包。若仍失败：`pip3 install certifi`，
或运行 Python 安装包里的 `Install Certificates.command`。

**Q：报 `unterminated character set`？**
A：这是脚本内部的 HTML 清洗正则问题，请更新到当前版本。

**Q：某个源一直失败？**
A：在 `feeds.json` 里临时删掉或把 `only_ai` 改为 `false` 试试。
失败原因会写进 `news-feed.js` 的 `failed` 数组，页面上也会显示失败源个数。

**Q：抓到重复内容？**
A：脚本会按链接（去掉 query 与末尾斜杠）和标题（去空白与标点）双重去重，
前端 `mergeFeed()` 会再与本地 `data.js` 做一次交叉去重。

**Q：arXiv 抓到 0 条？**
A：arXiv 周末不发布公告（`skipDays` 包含 Saturday / Sunday），属正常现象。

### 合规提醒

抓取前请确认目标站点的 `robots.txt` 与版权政策。内置脚本只取**标题、摘要与原文链接**，
不复制全文，前端保留来源标注且点击跳转原文。对外运营或商业使用请自行评估，
必要时购买授权或改用官方 API。

---

## 四·附、自己写抓取脚本（参考）

如果内置脚本不满足需求（如需登录、需要解析网页正文），可以参考下面的最小实现：

```python
# fetch_news.py —— 抓取 RSS 生成 data.js
import json, re, time, urllib.request
import xml.etree.ElementTree as ET

FEEDS = [
    ("机器之心", "https://www.jiqizhixin.com/rss"),
    ("量子位",   "https://www.qbitai.com/feed"),
    # 按需添加，注意遵守目标站点的 robots.txt 与转载规范
]

def clean(s):
    return re.sub(r"<[^>]+>", "", s or "").strip()

def fetch(name, url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (AI-HUB Bot)"})
    raw = urllib.request.urlopen(req, timeout=20).read()
    root = ET.fromstring(raw)
    out = []
    for item in root.iter("item"):                 # Atom 源请改用 {http://www.w3.org/2005/Atom}entry
        out.append({
            "id": "a" + str(abs(hash(item.findtext("link") or "")) % 10**8),
            "featured": False,
            "cat": "industry",                      # 可基于关键词自动分类
            "date": time.strftime("%Y-%m-%d"),
            "source": name,
            "title": clean(item.findtext("title")),
            "summary": clean(item.findtext("description"))[:200],
            "tags": ["自动抓取"],
            "readTime": 3,
            "hot": 50,
        })
    return out

if __name__ == "__main__":
    news = []
    for n, u in FEEDS:
        try:
            news += fetch(n, u)
        except Exception as e:
            print("抓取失败", n, e)
    with open("assets/js/data.js", "r+", encoding="utf-8") as f:
        src = f.read()
    block = json.dumps(news[:60], ensure_ascii=False, indent=4)
    src = re.sub(r"const news = \[.*?\n  \];", "const news = " + block + ";", src, flags=re.S)
    with open("assets/js/data.js", "w", encoding="utf-8") as f:
        f.write(src)
    print("已更新 data.js，共", len(news), "条")
```

配合 crontab 每天跑一次：

```cron
0 7 * * * cd /path/to/ai-hub && /usr/bin/python3 fetch_news.py >> fetch.log 2>&1
```

> 合法提示：抓取前请确认目标站点的 `robots.txt`、服务条款与版权要求。
> 商业用途建议购买授权或使用官方 API。

---

## 五、接入远程接口（真·实时）

若部署在服务器上，可改为异步加载：

1. 把 `data.js` 里的数组导出为 `data/news.json`；
2. 在 `app.js` 中把 `boot()` 改为先 `await fetch('data/news.json')`；
3. 或保留 `data.js` 作为兜底，接口失败时回退。

参考改法（把 `boot` 变成异步）：

```js
async function boot() {
  try {
    const r = await fetch(D.meta.feedEndpoint || "api/news.json");
    if (r.ok) {
      const extra = await r.json();
      window.AI_DATA.news = extra.concat(window.AI_DATA.news);
    }
  } catch (e) { /* 接口不可用时使用本地兜底数据 */ }
  renderChrome();
  initSearch();
  /* …其余不变… */
}
```

对应地把 `#newsCount` 等渲染放在 `await` 之后即可。

---

## 六、常见问题

**Q：页面空白，控制台报 `AI_DATA is not defined`？**
A：对应的 `data.<lang>.js` 有语法错误。运行 `node --check assets/js/data.en.js` 定位。

**Q：搜索搜不到新加的条目？**
A：搜索索引在 `app.js` 的 `SEARCH_INDEX` 中构建，刷新页面即可重建，无需改动代码。

**Q：新增了资讯分类，但筛选按钮没出现？**
A：需要在 `categories` 数组里补一条 `{id, name, color, icon}`。

**Q：想再加一种语言？**
A：复制 `data.en.js` 改名为 `data.ja.js` 并翻译；在 `i18n.js` 里补 `ja` 词典；
复制 `scripts/build-en.js` 改两个常量后运行。`app.js` 无需改动。
