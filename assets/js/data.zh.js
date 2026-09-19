/* ==========================================================================
   AI HUB · 全站内容数据源
   --------------------------------------------------------------------------
   ⚠️ 重要说明：以下内容为「演示数据」，用于展示网站结构与排版。
   其中的日期、数据、链接多为示例，请以各厂商/机构官方发布为准。
   正式上线时，只需替换本文件中的数组即可（保持字段名不变）。
   ========================================================================== */

window.AI_DATA = (function () {
  "use strict";

  /* ---------------------------- 站点元信息 ---------------------------- */
  const meta = {
    name: "AI HUB",
    nameZh: "智汇",
    slogan: "一站汇聚全球人工智能资讯、模型、工具与知识",
    updated: "2026-09-19",
    version: "1.1.1",
    lang: "zh",
    acceptLangs: ["zh", "en"],
    notice:
      "本站为静态信息聚合站点，内容含演示数据，仅供参考与学习使用；涉及产品价格、参数、政策等请以官方发布为准。",
    /* 你可以把这里换成任意 RSS / JSON 接口地址，详见 assets/js/README-数据接入.md */
    feedEndpoint: ""
  };

  /* ---------------------------- 首页统计 ---------------------------- */
  const stats = [
    { num: "30+", label: "资讯条目" },
    { num: "24", label: "大模型档案" },
    { num: "46", label: "AI 工具收录" },
    { num: "82", label: "术语百科词条" },
    { num: "18", label: "经典论文" },
    { num: "6", label: "学习阶段" }
  ];

  /* ---------------------------- 资讯分类 ---------------------------- */
  const categories = [
    { id: "all",     name: "全部",     color: "#4f46e5", icon: "◎" },
    { id: "model",   name: "模型发布", color: "#4f46e5", icon: "◆" },
    { id: "industry",name: "行业动态", color: "#06b6d4", icon: "▲" },
    { id: "research",name: "研究前沿", color: "#8b5cf6", icon: "✦" },
    { id: "policy",  name: "政策监管", color: "#f79009", icon: "§" },
    { id: "funding", name: "融资并购", color: "#12b76a", icon: "¥" },
    { id: "apply",   name: "应用落地", color: "#ec4899", icon: "⬢" },
    { id: "chip",    name: "算力硬件", color: "#f04438", icon: "▣" },
    { id: "opensrc", name: "开源生态", color: "#0ea5e9", icon: "⬡" }
  ];

  const catName = (id) => (categories.find((c) => c.id === id) || {}).name || id;

  /* ---------------------------- 资讯列表 ---------------------------- */
  const news = [
    {
      id: "n01", featured: true, cat: "model", date: "2026-09-18", source: "官方发布",
      title: "新一代通用大模型密集发布，长上下文与原生多模态成为标配",
      summary:
        "多家头部厂商在本季度集中更新旗舰模型，普遍把上下文窗口提升到百万级 Token，并将图像、音频、视频统一进同一个 Transformer 主干。推理成本相比上一代下降明显的量级，推动 Agent 类产品进入可用区间。",
      tags: ["大模型", "多模态", "长上下文"], readTime: 6, hot: 98
    },
    {
      id: "n02", featured: false, cat: "model", date: "2026-09-16", source: "技术博客",
      title: "开源权重模型能力逼近闭源第一梯队，MoE 架构成为主流选择",
      summary:
        "混合专家（MoE）架构在同等激活参数下带来更高的性价比，多个开源系列在代码、数学与工具调用基准上追平部分闭源模型，企业与个人可在本地或私有云部署。",
      tags: ["开源", "MoE", "基准测试"], readTime: 5, hot: 92
    },
    {
      id: "n03", featured: false, cat: "research", date: "2026-09-15", source: "arXiv",
      title: "推理时计算扩展（Test-time Compute）研究持续升温",
      summary:
        "通过在推理阶段分配更多采样与验证算力，模型在数学、竞赛编程等硬任务上的准确率显著提升。相关综述系统梳理了自一致性、过程奖励模型、树搜索等路线。",
      tags: ["推理", "Scaling Law", "论文"], readTime: 8, hot: 88
    },
    {
      id: "n04", featured: false, cat: "chip", date: "2026-09-14", source: "半导体观察",
      title: "AI 加速卡供给格局变化：推理芯片需求首次超过训练芯片",
      summary:
        "随着大规模推理服务上线，面向推理优化的专用加速器出货量快速攀升。厂商竞争焦点从峰值算力转向能效比、显存带宽与互联带宽。",
      tags: ["算力", "GPU", "推理"], readTime: 5, hot: 85
    },
    {
      id: "n05", featured: false, cat: "policy", date: "2026-09-13", source: "政策公报",
      title: "生成式人工智能服务管理办法持续细化，强调内容标识与数据合规",
      summary:
        "新规要求生成式 AI 服务提供者对合成内容进行显式与隐式标识，明确训练数据来源合法性要求，并建立未成年人保护与投诉处理机制。出海产品需同时关注欧盟 AI 法案分级义务。",
      tags: ["合规", "AI 法案", "内容标识"], readTime: 7, hot: 79
    },
    {
      id: "n06", featured: false, cat: "apply", date: "2026-09-12", source: "行业报告",
      title: "企业级 AI Agent 从试点走向生产：客服、研发与数据分析先行",
      summary:
        "调查显示，超过六成受访企业已在至少一个业务环节部署 AI Agent，落地最快的场景是智能客服、代码助手与报表分析。主要障碍仍是数据孤岛、权限控制与结果可追溯性。",
      tags: ["Agent", "企业应用", "ROI"], readTime: 6, hot: 83
    },
    {
      id: "n07", featured: false, cat: "industry", date: "2026-09-11", source: "科技媒体",
      title: "AI 编程助手渗透率快速提升，代码评审与测试生成成新增量",
      summary:
        "开发者调研显示，多数专业开发者已在日常工作中使用 AI 辅助编码，功能重心从「补全」转向「跨仓库理解 + 自动修复 + 测试生成」。企业内部普遍开始制定 AI 生成代码的审计流程。",
      tags: ["编程", "开发者", "Copilot"], readTime: 4, hot: 81
    },
    {
      id: "n08", featured: false, cat: "opensrc", date: "2026-09-10", source: "社区",
      title: "开源推理框架迭代加速，量化与投机解码成降本关键手段",
      summary:
        "主流推理引擎持续优化 PagedAttention、连续批处理与 KV Cache 复用；4-bit / 8-bit 量化与投机解码（Speculative Decoding）在多数场景下可显著降低单位 Token 成本。",
      tags: ["推理优化", "量化", "vLLM"], readTime: 6, hot: 76
    },
    {
      id: "n09", featured: false, cat: "funding", date: "2026-09-09", source: "融资快讯",
      title: "AI 基础设施与垂直应用融资活跃，资金向「有收入」的项目集中",
      summary:
        "本季度融资呈现明显分化：具备可验证收入的 AI 应用与推理基础设施更受青睐，而单纯模型层创业公司的估值预期趋于理性。并购方面，传统软件公司通过收购补齐 AI 能力。",
      tags: ["融资", "估值", "并购"], readTime: 5, hot: 72
    },
    {
      id: "n10", featured: false, cat: "research", date: "2026-09-08", source: "会议论文",
      title: "多智能体协作（Multi-Agent）研究转向可靠性与成本控制",
      summary:
        "早期工作聚焦于让多个 Agent 分工协作，新一批研究关注协作带来的误差累积与 Token 成本爆炸问题，提出角色约束、辩论验证与动态拓扑等改进方案。",
      tags: ["多智能体", "可靠性", "成本"], readTime: 7, hot: 74
    },
    {
      id: "n11", featured: false, cat: "apply", date: "2026-09-07", source: "医疗观察",
      title: "医疗 AI 进入临床辅助决策试点，强调「人机协同」与责任边界",
      summary:
        "多家医院开展影像辅助诊断与病历生成试点。监管与伦理讨论聚焦于误诊责任划分、医生最终决策权以及患者知情同意流程。",
      tags: ["医疗", "伦理", "辅助诊断"], readTime: 6, hot: 68
    },
    {
      id: "n12", featured: false, cat: "industry", date: "2026-09-06", source: "教育周刊",
      title: "教育场景 AI 应用规范出台，作业与考试环节使用边界受关注",
      summary:
        "部分地区明确 AI 在教学中的使用建议：鼓励用于个性化辅导与备课，限制在正式考试中使用。高校普遍引入 AI 使用声明制度。",
      tags: ["教育", "规范", "学术诚信"], readTime: 4, hot: 66
    },
    {
      id: "n13", featured: false, cat: "model", date: "2026-09-05", source: "技术博客",
      title: "小模型（SLM）价值被重新认识：端侧部署与低延迟场景需求旺盛",
      summary:
        "1B–10B 参数区间的小模型经蒸馏与量化后可在手机、PC、车机上离线运行，在分类、抽取、改写等任务上性价比突出，也便于满足数据不出域的合规要求。",
      tags: ["小模型", "端侧", "蒸馏"], readTime: 5, hot: 77
    },
    {
      id: "n14", featured: false, cat: "policy", date: "2026-09-04", source: "国际观察",
      title: "各国 AI 安全治理框架逐步落地，红队测试与模型卡成为常规要求",
      summary:
        "前沿模型开发者被要求提交安全评估报告，包括危险能力测试结果与缓解措施。企业采购侧也开始在合同中约定模型卡、评测报告与事件通报义务。",
      tags: ["AI 安全", "红队", "模型卡"], readTime: 7, hot: 71
    },
    {
      id: "n15", featured: false, cat: "apply", date: "2026-09-03", source: "制造业观察",
      title: "工业质检与设备预测性维护成为制造业 AI 落地最快场景",
      summary:
        "视觉缺陷检测与振动/温度时序预测在产线上取得可量化收益，典型回报周期在一年以内。挑战在于小样本缺陷、产线换型后的模型迁移。",
      tags: ["工业", "视觉检测", "时序预测"], readTime: 5, hot: 64
    },
    {
      id: "n16", featured: false, cat: "research", date: "2026-09-02", source: "arXiv",
      title: "RAG 进入「检索—重排—验证」三段式，GraphRAG 受到关注",
      summary:
        "为缓解幻觉，检索增强生成方案引入重排序与答案溯源验证环节；基于知识图谱的 GraphRAG 在多跳问答与全局摘要类任务上表现更稳。",
      tags: ["RAG", "GraphRAG", "幻觉"], readTime: 6, hot: 80
    },
    {
      id: "n17", featured: false, cat: "chip", date: "2026-09-01", source: "供应链",
      title: "高带宽存储（HBM）与先进封装仍是算力扩张的主要瓶颈",
      summary:
        "AI 加速卡产能受限于 HBM 供给与 CoWoS 等先进封装产能。产业链围绕 2.5D/3D 封装、硅光互联与液冷散热展开新一轮投资。",
      tags: ["HBM", "先进封装", "液冷"], readTime: 5, hot: 70
    },
    {
      id: "n18", featured: false, cat: "opensrc", date: "2026-08-31", source: "社区",
      title: "开源数据集与评测榜单更新，中文能力评测体系更细分",
      summary:
        "新增面向中文长文本、法律、医疗、金融等垂直领域的评测集。社区呼吁榜单需防范数据污染，并公开评测提示与判分脚本。",
      tags: ["评测", "数据集", "中文"], readTime: 4, hot: 62
    },
    {
      id: "n19", featured: false, cat: "industry", date: "2026-08-30", source: "产业分析",
      title: "AI 产品「订阅 + 按量」混合计费成为主流，成本透明度受质疑",
      summary:
        "主流产品普遍采用席位订阅叠加 Token 计费的模式。企业客户要求更细粒度的用量看板与预算上限控制，以应对不可预测的推理支出。",
      tags: ["商业化", "定价", "FinOps"], readTime: 5, hot: 61
    },
    {
      id: "n20", featured: false, cat: "research", date: "2026-08-29", source: "技术报告",
      title: "世界模型与具身智能：从仿真训练走向真实机器人泛化",
      summary:
        "视频生成式世界模型被用于构造交互式训练环境，机器人在抓取、装配等任务的跨物体泛化能力提升。数据采集成本与真实环境安全仍是瓶颈。",
      tags: ["具身智能", "世界模型", "机器人"], readTime: 8, hot: 75
    },
    {
      id: "n21", featured: false, cat: "apply", date: "2026-08-28", source: "金融科技",
      title: "金融行业 AI 应用聚焦合规问答与投研提效，私有化部署占比高",
      summary:
        "银行券商以私有化部署为主，典型场景包括制度问答、研报摘要、代码生成与反欺诈。合规要求推动本地小模型 + 检索增强的技术组合。",
      tags: ["金融", "私有化", "合规"], readTime: 6, hot: 59
    },
    {
      id: "n22", featured: false, cat: "policy", date: "2026-08-27", source: "司法观察",
      title: "AI 生成内容版权争议增多，判例聚焦「独创性」与训练数据来源",
      summary:
        "多起诉讼围绕训练数据是否构成合理使用、生成物能否获得著作权保护展开。实务界建议企业对训练数据保留完整来源与授权记录。",
      tags: ["版权", "诉讼", "训练数据"], readTime: 7, hot: 67
    },
    {
      id: "n23", featured: false, cat: "model", date: "2026-08-26", source: "技术博客",
      title: "模型上下文协议（MCP）等工具调用标准推动生态互通",
      summary:
        "统一的工具/数据源接入协议让同一套连接器可在不同模型与客户端之间复用，显著降低 Agent 集成成本，主要厂商与开源客户端陆续宣布支持。",
      tags: ["MCP", "工具调用", "协议"], readTime: 5, hot: 84
    },
    {
      id: "n24", featured: false, cat: "research", date: "2026-08-25", source: "arXiv",
      title: "可解释性研究取得进展：稀疏自编码器用于定位模型内部特征",
      summary:
        "通过稀疏自编码器（SAE）从神经元激活中提取可解释特征，研究者尝试对特定行为进行定位与干预，为安全对齐提供工具。",
      tags: ["可解释性", "SAE", "对齐"], readTime: 8, hot: 69
    },
    {
      id: "n25", featured: false, cat: "industry", date: "2026-08-24", source: "科技媒体",
      title: "AI 搜索与浏览器入口之争加剧，答案质量与引用可信度成关键",
      summary:
        "搜索引擎、浏览器与独立 AI 应用都在争夺「提问入口」。用户对答案附带的引用来源与时效性要求提高，内容版权合作成为竞争要素。",
      tags: ["AI 搜索", "入口", "引用"], readTime: 5, hot: 73
    },
    {
      id: "n26", featured: false, cat: "chip", date: "2026-08-23", source: "数据中心",
      title: "数据中心电力与散热压力上升，液冷与绿电采购成硬约束",
      summary:
        "单机柜功率密度持续攀升，风冷难以满足需求，冷板式与浸没式液冷加速部署。选址决策开始把电价、电网容量与水资源纳入核心考量。",
      tags: ["数据中心", "液冷", "能耗"], readTime: 6, hot: 65
    },
    {
      id: "n27", featured: false, cat: "apply", date: "2026-08-22", source: "内容行业",
      title: "内容行业人机协作常态化，AI 主要用于选题、初稿与多语种分发",
      summary:
        "媒体与营销团队普遍将 AI 用于资料整理、初稿撰写与本地化翻译，人工负责事实核查与观点表达。平台要求标注 AI 参与程度。",
      tags: ["内容创作", "人机协作", "标注"], readTime: 4, hot: 58
    },
    {
      id: "n28", featured: false, cat: "opensrc", date: "2026-08-21", source: "社区",
      title: "本地化 AI 工具链成熟：一键部署、模型管理与知识库开箱可用",
      summary:
        "面向个人与中小团队的本地 AI 套件整合了模型下载、量化、向量库与聊天前端，几分钟内即可搭建离线知识库问答，隐私友好。",
      tags: ["本地部署", "知识库", "Ollama"], readTime: 5, hot: 66
    },
    {
      id: "n29", featured: false, cat: "funding", date: "2026-08-20", source: "融资快讯",
      title: "AI 安全与评测赛道获关注，第三方评测机构价值被认可",
      summary:
        "随着合规要求提升，模型评测、红队服务与 AI 治理平台获得新一轮融资。企业采购流程中开始要求第三方评测报告作为准入材料。",
      tags: ["AI 治理", "评测", "红队"], readTime: 4, hot: 55
    },
    {
      id: "n30", featured: false, cat: "research", date: "2026-08-19", source: "技术报告",
      title: "长上下文不等于长记忆：记忆机制与外部存储仍是研究热点",
      summary:
        "研究表明超长上下文在「大海捞针」之外的复杂推理任务上仍会衰减。参数化记忆、外部向量库与结构化笔记等方案被组合使用以提升长期一致性。",
      tags: ["长上下文", "记忆", "检索"], readTime: 7, hot: 63
    }
  ];

  /* ---------------------------- 大模型档案 ---------------------------- */
  /* license: open(开放权重) / closed(闭源API) ; modality: 文本/图像/音频/视频/代码 */
  const models = [
    {
      name: "GPT-5 系列", org: "OpenAI", region: "美国", released: "2025",
      license: "closed", params: "未公开", ctx: "40 万+ Token", modality: ["文本", "图像", "音频", "代码"],
      price: "$1.25–10 / 百万 Token", strength: ["通用推理", "工具调用", "多模态理解"],
      desc: "面向通用任务与 Agent 场景的旗舰模型系列，提供不同尺寸与推理档位，支持函数调用与结构化输出。",
      score: 96,
      docs: "https://platform.openai.com/docs/models"
    },
    {
      name: "Claude 系列", org: "Anthropic", region: "美国", released: "2025",
      license: "closed", params: "未公开", ctx: "20 万–100 万 Token", modality: ["文本", "图像", "代码"],
      price: "$3–15 / 百万 Token", strength: ["长文档", "代码", "安全对齐"],
      desc: "以长上下文、指令遵循与代码能力见长，广泛用于文档分析、编程助手与企业知识问答。",
      score: 94,
      docs: "https://docs.anthropic.com/en/docs/about-claude/models"
    },
    {
      name: "Gemini 系列", org: "Google DeepMind", region: "美国", released: "2025",
      license: "closed", params: "未公开", ctx: "100 万+ Token", modality: ["文本", "图像", "音频", "视频", "代码"],
      price: "$0.3–10 / 百万 Token", strength: ["原生多模态", "超长上下文", "视频理解"],
      desc: "原生多模态架构，覆盖从端侧 Nano 到旗舰 Pro/Ultra 的完整产品线，长视频与超大文档处理优势明显。",
      score: 93,
      docs: "https://ai.google.dev/gemini-api/docs/models"
    },
    {
      name: "Llama 系列", org: "Meta", region: "美国", released: "2024–2025",
      license: "open", params: "1B–400B+", ctx: "12.8 万 Token+", modality: ["文本", "图像", "代码"],
      price: "自托管 / 云端按量", strength: ["开源生态", "微调友好", "社区工具链"],
      desc: "最具影响力的开放权重模型系列之一，衍生微调版本数量庞大，是私有化部署与研究的常见基座。",
      score: 89,
      docs: "https://www.llama.com/"
    },
    {
      name: "DeepSeek-V3 / R1", org: "深度求索", region: "中国", released: "2025",
      license: "open", params: "671B (MoE, 37B 激活)", ctx: "12.8 万 Token", modality: ["文本", "代码"],
      price: "极低（API 按量）", strength: ["推理能力", "性价比", "开源权重"],
      desc: "MoE 架构 + 强化学习推理路线，以显著更低的训练与推理成本达到第一梯队水平，引发行业广泛关注。",
      score: 92,
      docs: "https://api-docs.deepseek.com/"
    },
    {
      name: "Qwen 系列", org: "阿里云通义千问", region: "中国", released: "2024–2025",
      license: "open", params: "0.5B–235B (MoE)", ctx: "13 万–100 万 Token", modality: ["文本", "图像", "音频", "代码"],
      price: "开源 / API 按量", strength: ["中文能力", "多尺寸覆盖", "多模态齐全"],
      desc: "覆盖全尺寸与多模态的开源家族，中文与代码表现优秀，被大量企业作为私有化基座模型。",
      score: 90,
      docs: "https://qwenlm.github.io/"
    },
    {
      name: "Kimi 系列", org: "月之暗面", region: "中国", released: "2024–2025",
      license: "open", params: "万亿级 MoE", ctx: "20 万–200 万 Token", modality: ["文本", "代码"],
      price: "按量 / 订阅", strength: ["超长上下文", "中文写作", "Agent"],
      desc: "以长文本处理与中文场景体验著称，开放权重版本在 Agent 与工具调用基准上表现突出。",
      score: 87,
      docs: "https://platform.moonshot.cn/docs"
    },
    {
      name: "GLM 系列", org: "智谱 AI", region: "中国", released: "2024–2025",
      license: "open", params: "9B–355B", ctx: "13 万+ Token", modality: ["文本", "图像", "视频", "代码"],
      price: "开源 / API 按量", strength: ["中文对齐", "多模态矩阵", "国产化适配"],
      desc: "提供从端侧小模型到旗舰的完整矩阵，覆盖对话、视觉、视频生成与代码，国产算力适配较完善。",
      score: 85,
      docs: "https://open.bigmodel.cn/dev/api"
    },
    {
      name: "Mistral 系列", org: "Mistral AI", region: "法国", released: "2024–2025",
      license: "open", params: "7B–123B (MoE)", ctx: "12.8 万 Token", modality: ["文本", "代码"],
      price: "开源 / API 按量", strength: ["小体积高效", "欧洲合规", "函数调用"],
      desc: "以小尺寸高效率与开放权重著称，在欧洲企业私有化与合规场景中占有稳定份额。",
      score: 84,
      docs: "https://docs.mistral.ai/getting-started/models/"
    },
    {
      name: "Grok 系列", org: "xAI", region: "美国", released: "2024–2025",
      license: "closed", params: "未公开", ctx: "13 万–200 万 Token", modality: ["文本", "图像", "代码"],
      price: "$3–15 / 百万 Token", strength: ["实时信息", "推理", "社交数据"],
      desc: "与实时信息流深度集成，强调实时性与推理能力，面向订阅用户提供多模态交互。",
      score: 83,
      docs: "https://docs.x.ai/docs/models"
    },
    {
      name: "文心一言系列", org: "百度", region: "中国", released: "2023–2025",
      license: "closed", params: "未公开", ctx: "12.8 万+ Token", modality: ["文本", "图像", "视频", "代码"],
      price: "免费 + 按量", strength: ["中文知识", "搜索增强", "生态集成"],
      desc: "与搜索、办公、云服务深度整合的中文大模型，覆盖内容生成、代码与多模态能力。",
      score: 82,
      docs: "https://cloud.baidu.com/doc/WENXINWORKSHOP/index.html"
    },
    {
      name: "混元系列", org: "腾讯", region: "中国", released: "2024–2025",
      license: "open", params: "未公开", ctx: "25 万+ Token", modality: ["文本", "图像", "视频", "3D"],
      price: "开源 / API 按量", strength: ["多模态生成", "社交场景", "开源"],
      desc: "覆盖语言、图像、视频与 3D 生成的模型家族，部分权重已开源，与内容生态结合紧密。",
      score: 81,
      docs: "https://cloud.tencent.com/document/product/1729"
    },
    {
      name: "豆包系列", org: "字节跳动", region: "中国", released: "2024–2025",
      license: "closed", params: "未公开", ctx: "25 万+ Token", modality: ["文本", "图像", "音频", "视频"],
      price: "极低 / 免费额度", strength: ["语音交互", "低延迟", "端云协同"],
      desc: "以低成本和良好语音交互体验见长，覆盖手机端、耳机、汽车等多终端应用。",
      score: 82,
      docs: "https://www.volcengine.com/docs/82379"
    },
    {
      name: "MiniMax 系列", org: "MiniMax", region: "中国", released: "2024–2025",
      license: "open", params: "456B (MoE)", ctx: "100 万+ Token", modality: ["文本", "音频", "视频", "代码"],
      price: "开源 / API 按量", strength: ["长上下文", "语音合成", "视频生成"],
      desc: "开放权重的大规模 MoE 模型，在长文本与语音、视频生成方向有差异化能力。",
      score: 80,
      docs: "https://platform.minimaxi.com/document"
    },
    {
      name: "Step 系列", org: "阶跃星辰", region: "中国", released: "2024–2025",
      license: "open", params: "千亿级 MoE", ctx: "数十万 Token", modality: ["文本", "图像", "音频", "视频"],
      price: "开源 / API 按量", strength: ["多模态", "端侧小模型", "语音"],
      desc: "多模态方向布局完整，同时推出性能优秀的端侧小模型，适合终端设备集成。",
      score: 79,
      docs: "https://platform.stepfun.com/docs"
    },
    {
      name: "Command 系列", org: "Cohere", region: "加拿大", released: "2024–2025",
      license: "open", params: "未公开", ctx: "12.8 万+ Token", modality: ["文本", "代码"],
      price: "按量 / 私有部署", strength: ["企业 RAG", "多语言", "私有化"],
      desc: "面向企业检索增强与多语言场景优化，强调私有化部署与数据隔离能力。",
      score: 78,
      docs: "https://docs.cohere.com/docs/models"
    },
    {
      name: "Phi 系列", org: "Microsoft", region: "美国", released: "2024–2025",
      license: "open", params: "3.8B–14B", ctx: "12.8 万 Token", modality: ["文本", "图像", "代码"],
      price: "开源（自托管）", strength: ["小模型", "教科书级数据", "端侧"],
      desc: "以小参数量、高质量合成数据训练著称，适合端侧与资源受限环境的推理。",
      score: 77,
      docs: "https://huggingface.co/microsoft"
    },
    {
      name: "Gemma 系列", org: "Google", region: "美国", released: "2024–2025",
      license: "open", params: "2B–27B", ctx: "12.8 万 Token", modality: ["文本", "图像", "代码"],
      price: "开源（自托管）", strength: ["轻量", "多尺寸", "开发者友好"],
      desc: "基于旗舰技术蒸馏的开放权重小模型系列，适合单卡甚至消费级硬件运行。",
      score: 78,
      docs: "https://ai.google.dev/gemma/docs"
    },
    {
      name: "Yi 系列", org: "零一万物", region: "中国", released: "2023–2025",
      license: "open", params: "6B–34B", ctx: "20 万 Token", modality: ["文本", "图像", "代码"],
      price: "开源 / API 按量", strength: ["中英双语", "长上下文", "开源"],
      desc: "中英双语能力均衡的开放权重系列，在长上下文与轻量部署场景被广泛使用。",
      score: 76,
      docs: "https://platform.lingyiwanwu.com/docs"
    },
    {
      name: "ERNIE / 星火 / 天工", org: "百度 / 讯飞 / 昆仑万维", region: "中国", released: "2023–2025",
      license: "closed", params: "未公开", ctx: "数万–数十万 Token", modality: ["文本", "图像", "音频"],
      price: "免费 + 按量", strength: ["中文语音", "行业知识", "国产化"],
      desc: "国产大模型阵营中的代表产品，在教育、政务、语音交互等垂直场景有较深积累。",
      score: 75,
      docs: "https://www.xfyun.cn/doc/spark/Web.html"
    },
    {
      name: "Stable Diffusion / FLUX", org: "Stability AI / Black Forest Labs", region: "欧美", released: "2022–2025",
      license: "open", params: "0.8B–12B", ctx: "—", modality: ["图像"],
      price: "开源（自托管）", strength: ["文生图", "LoRA 微调", "可控生成"],
      desc: "开源文生图生态的核心基座，社区衍生模型与微调工具极为丰富。",
      score: 86,
      docs: "https://github.com/Stability-AI/stablediffusion"
    },
    {
      name: "Sora / Veo / 可灵 等视频模型", org: "OpenAI / Google / 快手 等", region: "全球", released: "2024–2025",
      license: "closed", params: "未公开", ctx: "—", modality: ["视频", "图像", "音频"],
      price: "订阅 / 按量", strength: ["文生视频", "图生视频", "物理一致性"],
      desc: "视频生成模型快速迭代，在时长、分辨率、运动一致性与音画同步方面持续提升。",
      score: 84,
      docs: "https://openai.com/sora"
    },
    {
      name: "Whisper / SenseVoice 等语音模型", org: "OpenAI / 阿里 等", region: "全球", released: "2022–2025",
      license: "open", params: "0.03B–1.5B", ctx: "—", modality: ["音频"],
      price: "开源 / API 按量", strength: ["语音识别", "多语种", "低资源部署"],
      desc: "语音识别与合成的开源基座，多语种识别与实时转写能力成熟，适合本地部署。",
      score: 83,
      docs: "https://github.com/openai/whisper"
    },
    {
      name: "Embedding / Reranker 模型", org: "多家", region: "全球", released: "2023–2025",
      license: "open", params: "0.1B–8B", ctx: "8K–32K", modality: ["文本", "图像"],
      price: "开源 / 按量", strength: ["向量检索", "重排序", "多语种"],
      desc: "RAG 系统的关键组件，负责把文本映射为向量并做相关性重排，直接决定问答质量。",
      score: 82,
      docs: "https://huggingface.co/spaces/mteb/leaderboard"
    }
  ];

  /* ---------------------------- 工具导航 ---------------------------- */
  const toolCats = [
    { id: "all", name: "全部工具" },
    { id: "chat", name: "对话助手" },
    { id: "code", name: "编程开发" },
    { id: "image", name: "图像生成" },
    { id: "video", name: "视频音频" },
    { id: "office", name: "写作办公" },
    { id: "research", name: "搜索研究" },
    { id: "agent", name: "Agent 自动化" },
    { id: "dev", name: "模型开发" },
    { id: "local", name: "本地部署" }
  ];

  const tools = [
    { name: "ChatGPT", cat: "chat", by: "OpenAI", desc: "通用对话助手，支持联网、文件分析、图像生成与自定义 GPT。", tags: ["免费额度", "多模态"], price: "免费 / 订阅", url: "https://chat.openai.com" },
    { name: "Claude", cat: "chat", by: "Anthropic", desc: "长文档分析与写作能力强，Artifacts 可实时预览代码与网页。", tags: ["长文本", "写作"], price: "免费 / 订阅", url: "https://claude.ai" },
    { name: "Gemini", cat: "chat", by: "Google", desc: "与 Google 生态深度集成，支持超长上下文与多模态输入。", tags: ["多模态", "生态"], price: "免费 / 订阅", url: "https://gemini.google.com" },
    { name: "DeepSeek", cat: "chat", by: "深度求索", desc: "国产对话与推理助手，代码与数学表现优秀，价格低廉。", tags: ["国产", "推理"], price: "免费 / 极低", url: "https://chat.deepseek.com" },
    { name: "Kimi", cat: "chat", by: "月之暗面", desc: "擅长长文本阅读与网页解析，支持超长文档总结。", tags: ["长文本", "国产"], price: "免费", url: "https://kimi.moonshot.cn" },
    { name: "通义千问", cat: "chat", by: "阿里云", desc: "支持文档、图片、音视频理解的国产助手，办公场景集成度高。", tags: ["国产", "多模态"], price: "免费", url: "https://tongyi.aliyun.com" },
    { name: "豆包", cat: "chat", by: "字节跳动", desc: "低延迟语音对话体验好，覆盖手机与智能硬件。", tags: ["语音", "国产"], price: "免费", url: "https://www.doubao.com" },
    { name: "文心一言", cat: "chat", by: "百度", desc: "中文知识问答与内容生成，结合搜索实时信息。", tags: ["国产", "搜索"], price: "免费", url: "https://yiyan.baidu.com" },
    { name: "GitHub Copilot", cat: "code", by: "GitHub", desc: "IDE 内代码补全与对话，支持跨文件上下文与代码评审。", tags: ["IDE", "补全"], price: "订阅", url: "https://github.com/features/copilot" },
    { name: "Cursor", cat: "code", by: "Anysphere", desc: "AI 原生编辑器，支持整仓库理解、多文件编辑与 Agent 模式。", tags: ["编辑器", "Agent"], price: "免费 / 订阅", url: "https://cursor.com" },
    { name: "Claude Code", cat: "code", by: "Anthropic", desc: "终端内的编程代理，可读写文件、执行命令并完成多步任务。", tags: ["CLI", "Agent"], price: "订阅 / 按量", url: "https://claude.com/product/claude-code" },
    { name: "通义灵码", cat: "code", by: "阿里云", desc: "国产编程助手，支持代码补全、单测生成与代码解释。", tags: ["国产", "IDE"], price: "免费", url: "https://tongyi.aliyun.com/lingma" },
    { name: "Codeium / Windsurf", cat: "code", by: "Codeium", desc: "免费额度友好的 AI 编程 IDE，支持多文件重构。", tags: ["免费额度", "IDE"], price: "免费 / 订阅", url: "https://windsurf.com" },
    { name: "Midjourney", cat: "image", by: "Midjourney", desc: "艺术风格突出的文生图工具，社区与风格参考体系成熟。", tags: ["艺术", "文生图"], price: "订阅", url: "https://www.midjourney.com" },
    { name: "Stable Diffusion WebUI", cat: "image", by: "开源社区", desc: "本地文生图工作台，支持 LoRA、ControlNet 等丰富插件。", tags: ["开源", "本地"], price: "免费", url: "https://github.com/AUTOMATIC1111/stable-diffusion-webui" },
    { name: "ComfyUI", cat: "image", by: "开源社区", desc: "节点式图像/视频生成工作流，适合复杂可控的生成管线。", tags: ["节点式", "开源"], price: "免费", url: "https://github.com/comfyanonymous/ComfyUI" },
    { name: "即梦 / 通义万相", cat: "image", by: "字节 / 阿里", desc: "国产图像与视频生成平台，中文提示词理解好。", tags: ["国产", "文生图"], price: "免费额度", url: "https://jimeng.jianying.com/" },
    { name: "Runway", cat: "video", by: "Runway", desc: "专业视频生成与编辑套件，覆盖生成、抠像、追踪。", tags: ["视频", "创意"], price: "订阅", url: "https://runwayml.com" },
    { name: "可灵 / 海螺", cat: "video", by: "快手 / MiniMax", desc: "国产文生视频工具，运动一致性与画质表现良好。", tags: ["国产", "文生视频"], price: "订阅", url: "https://klingai.kuaishou.com/" },
    { name: "ElevenLabs", cat: "video", by: "ElevenLabs", desc: "高质量语音合成与声音克隆，多语种配音。", tags: ["TTS", "克隆"], price: "免费额度 / 订阅", url: "https://elevenlabs.io" },
    { name: "Suno / Udio", cat: "video", by: "Suno / Udio", desc: "文本生成歌曲与配乐，可指定风格、情绪与结构。", tags: ["音乐", "生成"], price: "免费额度 / 订阅", url: "https://suno.com" },
    { name: "Notion AI", cat: "office", by: "Notion", desc: "笔记与知识库内的写作、总结、翻译与数据库自动化。", tags: ["笔记", "知识库"], price: "订阅", url: "https://www.notion.so/product/ai" },
    { name: "Gamma", cat: "office", by: "Gamma", desc: "一句话生成演示文稿、文档与网页，排版自动化。", tags: ["PPT", "排版"], price: "免费额度", url: "https://gamma.app" },
    { name: "WPS AI", cat: "office", by: "金山办公", desc: "国产办公套件内置 AI，覆盖文档、表格与演示。", tags: ["国产", "办公"], price: "订阅", url: "https://ai.wps.cn" },
    { name: "DeepL", cat: "office", by: "DeepL", desc: "翻译质量优秀，支持文档翻译与术语表。", tags: ["翻译", "术语表"], price: "免费额度 / 订阅", url: "https://www.deepl.com" },
    { name: "Grammarly", cat: "office", by: "Grammarly", desc: "英文语法润色与语气调整，浏览器与桌面端可用。", tags: ["润色", "英文"], price: "免费 / 订阅", url: "https://www.grammarly.com" },
    { name: "Perplexity", cat: "research", by: "Perplexity", desc: "AI 搜索引擎，答案附带引用来源，支持聚焦学术与新闻。", tags: ["搜索", "引用"], price: "免费 / 订阅", url: "https://www.perplexity.ai" },
    { name: "NotebookLM", cat: "research", by: "Google", desc: "上传资料构建专属知识库，生成摘要、问答与音频概览。", tags: ["知识库", "播客"], price: "免费", url: "https://notebooklm.google.com" },
    { name: "Elicit / Consensus", cat: "research", by: "Elicit / Consensus", desc: "面向学术文献的检索与综述助手，可提取结论与样本量。", tags: ["学术", "文献"], price: "免费额度", url: "https://elicit.com" },
    { name: "SciSpace", cat: "research", by: "SciSpace", desc: "论文阅读助手，解释公式与术语，支持与 PDF 对话。", tags: ["论文", "PDF"], price: "免费额度", url: "https://typeset.io" },
    { name: "Dify", cat: "agent", by: "开源社区", desc: "开源 LLM 应用开发平台，可视化编排 RAG 与 Agent 流程。", tags: ["开源", "低代码"], price: "免费 / 私有部署", url: "https://dify.ai" },
    { name: "Coze / 扣子", cat: "agent", by: "字节跳动", desc: "零代码搭建智能体与工作流，可发布到多平台。", tags: ["Bot", "工作流"], price: "免费额度", url: "https://www.coze.cn" },
    { name: "n8n / Zapier", cat: "agent", by: "n8n / Zapier", desc: "自动化工作流平台，串联上千种应用并接入 AI 节点。", tags: ["自动化", "集成"], price: "免费 / 订阅", url: "https://n8n.io" },
    { name: "LangChain / LlamaIndex", cat: "dev", by: "开源社区", desc: "构建 LLM 应用的主流框架，覆盖链、工具、RAG 与 Agent。", tags: ["框架", "开源"], price: "免费", url: "https://www.langchain.com" },
    { name: "Hugging Face", cat: "dev", by: "Hugging Face", desc: "模型、数据集与应用托管平台，AI 领域的 GitHub。", tags: ["模型库", "社区"], price: "免费 / 订阅", url: "https://huggingface.co" },
    { name: "Weights & Biases", cat: "dev", by: "W&B", desc: "实验跟踪、超参与模型版本管理，训练可视化。", tags: ["实验管理", "可视化"], price: "免费额度", url: "https://wandb.ai" },
    { name: "vLLM", cat: "dev", by: "开源社区", desc: "高吞吐推理引擎，PagedAttention 与连续批处理显著降本。", tags: ["推理", "高吞吐"], price: "免费", url: "https://github.com/vllm-project/vllm" },
    { name: "Ollama", cat: "local", by: "开源社区", desc: "一条命令下载并运行本地大模型，支持多平台。", tags: ["本地", "CLI"], price: "免费", url: "https://ollama.com" },
    { name: "LM Studio", cat: "local", by: "LM Studio", desc: "图形化本地模型运行器，内置模型市场与 OpenAI 兼容接口。", tags: ["本地", "GUI"], price: "免费", url: "https://lmstudio.ai" },
    { name: "AnythingLLM", cat: "local", by: "Mintplex", desc: "本地知识库问答，支持文档、多模型与多用户。", tags: ["知识库", "本地"], price: "免费", url: "https://anythingllm.com" },
    { name: "Open WebUI", cat: "local", by: "开源社区", desc: "自托管的类 ChatGPT 前端，兼容多种后端与插件。", tags: ["自托管", "前端"], price: "免费", url: "https://openwebui.com" },
    { name: "Whisper.cpp", cat: "local", by: "开源社区", desc: "CPU 友好的语音识别实现，可在本地批量转写音频。", tags: ["语音", "本地"], price: "免费", url: "https://github.com/ggerganov/whisper.cpp" },
    { name: "Tesseract / PaddleOCR", cat: "local", by: "开源社区 / 百度", desc: "OCR 工具，PaddleOCR 对中文与表格识别效果较好。", tags: ["OCR", "中文"], price: "免费", url: "https://github.com/PaddlePaddle/PaddleOCR" },
    { name: "Langfuse", cat: "dev", by: "开源社区", desc: "LLM 应用可观测性平台，追踪调用链、成本与评测结果。", tags: ["可观测", "评测"], price: "免费 / 云服务", url: "https://langfuse.com" },
    { name: "RAGFlow / FastGPT", cat: "dev", by: "开源社区", desc: "面向文档深度解析的 RAG 引擎与知识库应用框架。", tags: ["RAG", "知识库"], price: "免费", url: "https://ragflow.io" },
    { name: "Gradio / Streamlit", cat: "dev", by: "开源社区", desc: "快速把模型包装成可交互 Demo 的 Python 框架。", tags: ["Demo", "Python"], price: "免费", url: "https://gradio.app" }
  ];

  /* ---------------------------- 论文 / 研究 ---------------------------- */
  const papers = [
    { title: "Attention Is All You Need", year: 2017, venue: "NeurIPS", authors: "Vaswani et al.", org: "Google", tags: ["Transformer", "奠基"], desc: "提出 Transformer 架构，用自注意力取代循环结构，成为现代大模型的绝对基石。", stars: 5 },
    { title: "BERT: Pre-training of Deep Bidirectional Transformers", year: 2018, venue: "NAACL", authors: "Devlin et al.", org: "Google", tags: ["预训练", "NLP"], desc: "双向掩码语言建模预训练范式，开启了「预训练 + 微调」的 NLP 时代。", stars: 5 },
    { title: "Language Models are Few-Shot Learners (GPT-3)", year: 2020, venue: "NeurIPS", authors: "Brown et al.", org: "OpenAI", tags: ["少样本", "Scaling"], desc: "证明规模化语言模型可通过上下文示例完成新任务，催生提示词工程。", stars: 5 },
    { title: "Chain-of-Thought Prompting Elicits Reasoning", year: 2022, venue: "NeurIPS", authors: "Wei et al.", org: "Google", tags: ["思维链", "推理"], desc: "让模型显式输出中间推理步骤即可大幅提升复杂推理准确率。", stars: 5 },
    { title: "Training language models to follow instructions with human feedback (InstructGPT)", year: 2022, venue: "NeurIPS", authors: "Ouyang et al.", org: "OpenAI", tags: ["RLHF", "对齐"], desc: "RLHF 三阶段流程的系统化实践，奠定了对话模型的对齐范式。", stars: 5 },
    { title: "LoRA: Low-Rank Adaptation of Large Language Models", year: 2022, venue: "ICLR", authors: "Hu et al.", org: "Microsoft", tags: ["微调", "高效"], desc: "冻结主干、只训练低秩矩阵，把微调成本降低数个量级，成为主流微调方案。", stars: 5 },
    { title: "Llama 2: Open Foundation and Fine-Tuned Chat Models", year: 2023, venue: "arXiv", authors: "Touvron et al.", org: "Meta", tags: ["开源", "基座"], desc: "开放权重商用许可的中等规模基座，直接引爆开源大模型生态。", stars: 4 },
    { title: "Direct Preference Optimization (DPO)", year: 2023, venue: "NeurIPS", authors: "Rafailov et al.", org: "Stanford", tags: ["对齐", "偏好优化"], desc: "用简洁的损失函数直接优化偏好，省去显式奖励模型与强化学习环节。", stars: 5 },
    { title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP", year: 2020, venue: "NeurIPS", authors: "Lewis et al.", org: "Meta", tags: ["RAG", "检索"], desc: "提出 RAG 范式，将参数化记忆与非参数化检索结合，奠定企业知识问答技术路线。", stars: 5 },
    { title: "Denoising Diffusion Probabilistic Models", year: 2020, venue: "NeurIPS", authors: "Ho et al.", org: "UC Berkeley", tags: ["扩散模型", "生成"], desc: "扩散模型的开创性工作，成为图像与视频生成的主流技术底座。", stars: 5 },
    { title: "High-Resolution Image Synthesis with Latent Diffusion (Stable Diffusion)", year: 2022, venue: "CVPR", authors: "Rombach et al.", org: "LMU", tags: ["文生图", "潜空间"], desc: "在潜空间做扩散，把文生图的训练与推理成本降到消费级硬件可承受。", stars: 5 },
    { title: "DeepSeek-R1: Incentivizing Reasoning Capability via RL", year: 2025, venue: "arXiv", authors: "DeepSeek-AI", org: "深度求索", tags: ["推理", "RL", "开源"], desc: "证明纯强化学习可激发长链推理能力，并开放权重，推动推理模型普及。", stars: 5 },
    { title: "Scaling Laws for Neural Language Models", year: 2020, venue: "arXiv", authors: "Kaplan et al.", org: "OpenAI", tags: ["Scaling", "规律"], desc: "量化损失与参数量、数据量、算力的幂律关系，为大规模训练提供指导。", stars: 5 },
    { title: "Training Compute-Optimal Large Language Models (Chinchilla)", year: 2022, venue: "NeurIPS", authors: "Hoffmann et al.", org: "DeepMind", tags: ["数据配比", "最优"], desc: "指出模型与数据应同比例扩展，纠正了此前「只堆参数」的倾向。", stars: 5 },
    { title: "Mamba: Linear-Time Sequence Modeling with Selective State Spaces", year: 2023, venue: "arXiv", authors: "Gu & Dao", org: "CMU", tags: ["状态空间", "长序列"], desc: "选择性状态空间模型，在长序列上具备线性复杂度，是 Transformer 的重要替代候选。", stars: 4 },
    { title: "Sparse Autoencoders Find Highly Interpretable Features", year: 2023, venue: "ICLR", authors: "Cunningham et al.", org: "多家", tags: ["可解释性", "SAE"], desc: "用稀疏自编码器从叠加激活中分离出可解释特征，为机制可解释性提供工具。", stars: 4 },
    { title: "Toolformer: Language Models Can Teach Themselves to Use Tools", year: 2023, venue: "NeurIPS", authors: "Schick et al.", org: "Meta", tags: ["工具调用", "Agent"], desc: "自监督地让模型学会何时调用 API，是 Agent 工具使用能力的重要起点。", stars: 4 },
    { title: "ReAct: Synergizing Reasoning and Acting in Language Models", year: 2023, venue: "ICLR", authors: "Yao et al.", org: "Princeton", tags: ["Agent", "推理行动"], desc: "推理与行动交替进行的框架，成为当前 Agent 循环的事实标准。", stars: 5 }
  ];

  const confs = [
    { name: "NeurIPS", full: "神经信息处理系统大会", area: "机器学习综合", time: "每年 12 月", rank: "CCF-A", site: "neurips.cc" },
    { name: "ICML", full: "国际机器学习大会", area: "机器学习", time: "每年 7 月", rank: "CCF-A", site: "icml.cc" },
    { name: "ICLR", full: "国际学习表征会议", area: "表示学习 / 深度学习", time: "每年 4–5 月", rank: "CCF-A", site: "iclr.cc" },
    { name: "CVPR", full: "计算机视觉与模式识别", area: "计算机视觉", time: "每年 6 月", rank: "CCF-A", site: "cvpr.thecvf.com" },
    { name: "ICCV / ECCV", full: "国际计算机视觉大会 / 欧洲会议", area: "计算机视觉", time: "隔年", rank: "CCF-A/B", site: "thecvf.com" },
    { name: "ACL", full: "国际计算语言学协会年会", area: "自然语言处理", time: "每年 7 月", rank: "CCF-A", site: "aclanthology.org" },
    { name: "EMNLP", full: "自然语言处理经验方法会议", area: "自然语言处理", time: "每年 11 月", rank: "CCF-B", site: "aclanthology.org" },
    { name: "AAAI", full: "人工智能协会年会", area: "人工智能综合", time: "每年 2 月", rank: "CCF-A", site: "aaai.org" }
  ];

  /* ---------------------------- 学习路径 ---------------------------- */
  const roadmap = [
    {
      step: 1, title: "数学与编程基础", time: "4–8 周", level: "入门",
      desc: "建立后续一切学习的底座，重点是把工具用熟而不是把公式背熟。",
      items: ["Python 语法与常用库（NumPy / Pandas）", "线性代数：向量、矩阵、特征值直觉", "概率统计：分布、贝叶斯、最大似然", "微积分：导数、梯度、链式法则"],
      link: "https://www.coursera.org/learn/machine-learning"
    },
    {
      step: 2, title: "机器学习与深度学习", time: "6–10 周", level: "入门",
      desc: "掌握经典模型与神经网络训练流程，能独立完成一次端到端建模。",
      items: ["监督/无监督学习、过拟合与正则化", "反向传播与优化器（SGD / Adam）", "CNN、RNN 与注意力机制", "PyTorch 实战：训练、验证、调参"],
      link: "https://www.deeplearning.ai"
    },
    {
      step: 3, title: "大模型原理与训练", time: "8–12 周", level: "进阶",
      desc: "理解 Transformer 内部机制与从预训练到对齐的完整链路。",
      items: ["Transformer 结构与位置编码", "Tokenizer 与词表设计", "预训练目标、数据清洗与配比", "SFT / RLHF / DPO 对齐流程", "分布式训练：数据并行、张量并行、ZeRO"],
      link: "https://github.com/karpathy/nanoGPT"
    },
    {
      step: 4, title: "应用开发与 RAG / Agent", time: "4–8 周", level: "进阶",
      desc: "把模型变成可交付产品，这是目前岗位需求最集中的能力。",
      items: ["提示词工程与结构化输出", "向量库与检索增强（RAG）", "函数调用与 MCP 工具集成", "多轮 Agent 循环与错误恢复", "评测与可观测性（成本、延迟、准确率）"],
      link: "https://python.langchain.com/docs/tutorials/"
    },
    {
      step: 5, title: "工程化与部署优化", time: "4–8 周", level: "高级",
      desc: "把 Demo 变成能扛住流量的生产系统，控制成本与延迟。",
      items: ["推理引擎：vLLM / TensorRT-LLM", "量化、蒸馏与投机解码", "缓存策略与批处理调优", "容器化、自动扩缩容与监控告警"],
      link: "https://docs.vllm.ai"
    },
    {
      step: 6, title: "前沿方向深耕", time: "持续", level: "高级",
      desc: "选择一个方向深入，形成不可替代的专业度。",
      items: ["多模态与视频/世界模型", "具身智能与机器人", "AI 安全、对齐与可解释性", "AI 芯片与系统协同设计", "行业垂直应用（医疗 / 金融 / 工业）"],
      link: "https://arxiv.org/list/cs.AI/recent"
    }
  ];

  const courses = [
    { name: "机器学习（吴恩达）", by: "Coursera / Stanford", level: "入门", lang: "中英字幕", desc: "经典入门课，讲解清晰，适合零基础建立整体认知。", free: true },
    { name: "深度学习专项课程", by: "DeepLearning.AI", level: "入门–进阶", lang: "中英字幕", desc: "五门课覆盖神经网络、调参、结构化机器学习与序列模型。", free: false },
    { name: "CS231n 视觉识别", by: "Stanford", level: "进阶", lang: "英文", desc: "计算机视觉经典课程，作业质量高，深入 CNN 与检测分割。", free: true },
    { name: "CS224n 自然语言处理", by: "Stanford", level: "进阶", lang: "英文", desc: "NLP 与深度学习结合的系统课程，含 Transformer 与预训练。", free: true },
    { name: "CS336 语言模型从零构建", by: "Stanford", level: "高级", lang: "英文", desc: "从数据、分词、注意力到分布式训练完整实现一个 LLM。", free: true },
    { name: "动手学深度学习（D2L）", by: "李沐 等", level: "入门–进阶", lang: "中文", desc: "中文友好、代码与理论并重，配套视频与在线笔记本。", free: true },
    { name: "Hugging Face 免费课程", by: "Hugging Face", level: "入门–进阶", lang: "英文", desc: "NLP、扩散模型、Agent 三门实践课，边学边跑代码。", free: true },
    { name: "提示词工程入门", by: "DeepLearning.AI", level: "入门", lang: "中英字幕", desc: "短小实践课，讲解迭代式提示设计与常见反模式。", free: true }
  ];

  const books = [
    { name: "《动手学深度学习》", by: "李沐、Aston Zhang 等", level: "入门", desc: "理论与代码并重，中文读者的首选实战教材。" },
    { name: "《深度学习》花书", by: "Goodfellow 等", level: "进阶", desc: "深度学习理论的权威参考，适合系统建立知识框架。" },
    { name: "《机器学习》（西瓜书）", by: "周志华", level: "入门–进阶", desc: "中文机器学习经典教材，公式推导完整。" },
    { name: "《统计学习方法》", by: "李航", level: "进阶", desc: "统计学习方法的系统讲解，面试与理论打底常用。" },
    { name: "《Speech and Language Processing》", by: "Jurafsky & Martin", level: "进阶", desc: "NLP 领域百科全书式教材，持续更新新版。" },
    { name: "《AI 工程化 / LLM 应用开发实践》", by: "多本", level: "进阶", desc: "聚焦把大模型落到生产系统的工程实践与方法论。" }
  ];

  const promptTips = [
    { title: "角色 + 任务 + 约束 + 格式", desc: "把提示词拆成四段：你是谁、要做什么、有哪些限制、输出成什么结构。结构化提示比长句描述稳定得多。" },
    { title: "给例子胜过讲道理", desc: "提供 1–3 个输入输出范例（Few-shot），模型会自然模仿格式与粒度，比反复描述格式要求更有效。" },
    { title: "让模型先想再答", desc: "对推理类任务要求先输出分析步骤再给结论（CoT），准确率通常明显优于直接要答案。" },
    { title: "要求引用与不确定标注", desc: "在 RAG 场景中明确要求「只依据给定资料作答，无法回答时说不知道，并标注来源编号」，可显著降低幻觉。" },
    { title: "把输出变成结构化数据", desc: "要求 JSON / 表格输出并给出 Schema，便于下游程序解析，也让模型更不容易跑题。" },
    { title: "先分解再并行", desc: "复杂任务拆成多个独立子任务分别调用，比一次性要求模型完成全部工作更稳、更容易调试。" },
    { title: "迭代而非一次到位", desc: "观察失败案例 → 补充约束或示例 → 再测。提示词工程本质是快速实验循环。" },
    { title: "注意上下文窗口的经济性", desc: "无关的长上下文会稀释注意力并抬高成本。定期裁剪历史、压缩摘要、只召回相关片段。" }
  ];

  /* ---------------------------- 术语百科 ---------------------------- */
  const glossary = [
    { t: "人工智能", en: "AI, Artificial Intelligence", c: "基础", d: "让机器表现出类似人类智能行为的技术总称，包括感知、推理、学习、决策与生成。" },
    { t: "机器学习", en: "Machine Learning", c: "基础", d: "不依靠显式编程规则，而是从数据中自动学习规律的方法，是当代 AI 的主要实现路径。" },
    { t: "深度学习", en: "Deep Learning", c: "基础", d: "使用多层神经网络的机器学习方法，能自动学习层次化特征，是近十年 AI 突破的核心。" },
    { t: "神经网络", en: "Neural Network", c: "基础", d: "由大量可学习的加权连接节点构成的模型，通过反向传播调整权重。" },
    { t: "参数", en: "Parameters", c: "基础", d: "模型内部可学习的数值（权重与偏置），参数量常被用来粗略衡量模型规模。" },
    { t: "训练 / 推理", en: "Training / Inference", c: "基础", d: "训练是调整参数的过程，算力密集；推理是使用训练好的模型做预测，成本敏感且要求低延迟。" },
    { t: "Transformer", en: "Transformer", c: "架构", d: "基于自注意力机制的序列建模架构，是当前几乎所有大语言模型的基础。" },
    { t: "自注意力", en: "Self-Attention", c: "架构", d: "让序列中每个位置根据相关性对其他位置加权汇总，从而捕获长距离依赖。" },
    { t: "多头注意力", en: "Multi-Head Attention", c: "架构", d: "并行运行多组注意力，从不同子空间捕捉不同的关联模式。" },
    { t: "位置编码", en: "Positional Encoding", c: "架构", d: "为注意力机制注入顺序信息，包括绝对位置编码、RoPE 旋转位置编码等。" },
    { t: "FFN / 前馈网络", en: "Feed-Forward Network", c: "架构", d: "Transformer 每一层中的逐位置全连接子层，通常占据大部分参数量。" },
    { t: "层归一化", en: "Layer Normalization", c: "架构", d: "对每个样本的特征维度做归一化，稳定深层网络训练，常见变体有 RMSNorm。" },
    { t: "残差连接", en: "Residual Connection", c: "架构", d: "把输入直接加到子层输出上，缓解梯度消失，使超深网络可训练。" },
    { t: "编码器 / 解码器", en: "Encoder / Decoder", c: "架构", d: "编码器把输入压缩为表示，解码器据此自回归生成输出；也有仅解码器的现代主流结构。" },
    { t: "MoE 混合专家", en: "Mixture of Experts", c: "架构", d: "每层包含多个专家网络，由路由只激活其中少数几个，用较小激活算力获得大参数量能力。" },
    { t: "状态空间模型", en: "SSM, State Space Model", c: "架构", d: "以线性复杂度建模长序列的替代架构，代表工作如 Mamba，推理显存随长度线性增长。" },
    { t: "大语言模型", en: "LLM", c: "模型", d: "在海量文本上预训练、具备通用语言理解与生成能力的大规模神经网络。" },
    { t: "基座模型", en: "Foundation Model", c: "模型", d: "在大规模通用数据上训练、可迁移到多种下游任务的通用模型。" },
    { t: "多模态模型", en: "Multimodal Model", c: "模型", d: "能同时处理文本、图像、音频、视频等多种模态输入输出的模型。" },
    { t: "小模型", en: "SLM, Small Language Model", c: "模型", d: "参数规模较小（通常 1B–10B）的模型，适合端侧部署与低延迟、低成本场景。" },
    { t: "开放权重", en: "Open Weights", c: "模型", d: "模型权重可下载使用与二次分发，注意其许可协议对商用与衍生有不同限制。" },
    { t: "闭源 API", en: "Closed API", c: "模型", d: "只能通过厂商接口调用、不提供权重的模型服务形态。" },
    { t: "预训练", en: "Pre-training", c: "训练", d: "在大规模无标注语料上以自监督目标训练初始模型，获得通用语言与知识能力。" },
    { t: "自监督学习", en: "Self-Supervised Learning", c: "训练", d: "从数据自身构造监督信号（如预测下一个词、掩码还原），无需人工标注。" },
    { t: "下一个词预测", en: "Next-Token Prediction", c: "训练", d: "自回归语言模型的核心训练目标：根据前文预测下一个 Token 的概率分布。" },
    { t: "微调", en: "Fine-tuning", c: "训练", d: "在预训练模型基础上用领域数据继续训练，以适应特定任务或风格。" },
    { t: "指令微调", en: "SFT / Instruction Tuning", c: "训练", d: "用「指令—回答」配对数据训练模型，使其学会遵循人类指令。" },
    { t: "RLHF", en: "Reinforcement Learning from Human Feedback", c: "训练", d: "基于人类偏好训练奖励模型，再用强化学习优化策略，使输出更符合人类期望。" },
    { t: "DPO", en: "Direct Preference Optimization", c: "训练", d: "直接用偏好数据优化模型，无需显式奖励模型与 RL 循环的简化对齐方法。" },
    { t: "蒸馏", en: "Knowledge Distillation", c: "训练", d: "让小的学生模型模仿大的教师模型的输出分布，以压缩体积、保留能力。" },
    { t: "LoRA", en: "Low-Rank Adaptation", c: "训练", d: "冻结主干，只训练低秩增量矩阵的高效微调方法，显存占用低、便于多任务切换。" },
    { t: "量化", en: "Quantization", c: "训练", d: "用更低位宽（INT8/INT4）表示权重或激活，降低显存与算力需求，可能带来轻微精度损失。" },
    { t: "灾难性遗忘", en: "Catastrophic Forgetting", c: "训练", d: "在新数据上训练后模型丢失原有能力，微调时需要混入通用数据缓解。" },
    { t: "过拟合", en: "Overfitting", c: "训练", d: "模型记住训练集细节而泛化变差，可通过正则化、数据增强与早停缓解。" },
    { t: "上下文窗口", en: "Context Window", c: "推理", d: "模型单次调用能处理的最大 Token 数量，包含输入与输出。" },
    { t: "Token", en: "Token", c: "推理", d: "模型处理文本的最小单位，中英文切分粒度不同，是计费与长度计算的基础。" },
    { t: "分词器", en: "Tokenizer", c: "推理", d: "把文本切分为 Token 并映射为 ID 的组件，常见算法有 BPE、WordPiece、SentencePiece。" },
    { t: "温度参数", en: "Temperature", c: "推理", d: "调节输出随机性：值越低越确定、越保守；值越高越发散、越有创造性。" },
    { t: "Top-p / Top-k", en: "Nucleus / Top-k Sampling", c: "推理", d: "在概率分布中截断候选集合的采样策略，用于控制生成多样性。" },
    { t: "KV 缓存", en: "KV Cache", c: "推理", d: "缓存已计算过的注意力键值，避免重复计算，是自回归生成加速的关键机制。" },
    { t: "投机解码", en: "Speculative Decoding", c: "推理", d: "用小模型快速草拟多个 Token，再由大模型一次验证，从而提升生成吞吐。" },
    { t: "批处理", en: "Batching / Continuous Batching", c: "推理", d: "把多个请求合并计算以提升 GPU 利用率，连续批处理可动态插入新请求。" },
    { t: "首 Token 延迟", en: "TTFT", c: "推理", d: "从请求发出到收到第一个 Token 的时间，直接影响交互式产品的体感。" },
    { t: "幻觉", en: "Hallucination", c: "问题", d: "模型生成看似合理但与事实不符的内容，根源在于概率生成机制与知识边界模糊。" },
    { t: "对齐", en: "Alignment", c: "问题", d: "让模型行为符合人类价值与意图的技术方向，涵盖有用性、诚实性与无害性。" },
    { t: "越狱", en: "Jailbreak", c: "问题", d: "通过精心构造的提示绕过模型安全限制，属于红队测试重点防御对象。" },
    { t: "提示注入", en: "Prompt Injection", c: "问题", d: "在外部内容中嵌入恶意指令，诱导 Agent 执行非预期操作，是 RAG/Agent 的主要安全风险。" },
    { t: "数据污染", en: "Data Contamination", c: "问题", d: "评测题出现在训练数据中，导致基准分数虚高、无法反映真实泛化能力。" },
    { t: "偏见", en: "Bias", c: "问题", d: "模型输出中反映训练数据的社会偏见，需要通过数据治理与评测缓解。" },
    { t: "可解释性", en: "Interpretability", c: "问题", d: "理解模型内部为何产生某个输出，包含特征可视化与机制可解释性两条路线。" },
    { t: "稀疏自编码器", en: "Sparse Autoencoder, SAE", c: "问题", d: "从神经网络激活中提取稀疏、可解释特征的字典学习方法，用于机制分析。" },
    { t: "提示词", en: "Prompt", c: "应用", d: "输入给模型的指令与上下文，编写质量直接影响输出效果。" },
    { t: "思维链", en: "Chain-of-Thought, CoT", c: "应用", d: "让模型显式输出推理步骤以提升复杂任务准确率的提示技术。" },
    { t: "少样本学习", en: "Few-shot Learning", c: "应用", d: "在提示中给出少量示例让模型完成任务，无需更新参数。" },
    { t: "RAG 检索增强生成", en: "Retrieval-Augmented Generation", c: "应用", d: "先检索外部知识再让模型基于检索结果作答，降低幻觉并支持知识实时更新。" },
    { t: "向量数据库", en: "Vector Database", c: "应用", d: "存储与检索高维向量的数据库，支持相似度搜索，是 RAG 的核心组件。" },
    { t: "嵌入", en: "Embedding", c: "应用", d: "把文本、图像等映射为稠密向量，使语义相近的内容在向量空间中靠近。" },
    { t: "重排序", en: "Reranking", c: "应用", d: "对初筛结果用交叉编码器精细打分，提升召回内容的相关性排序。" },
    { t: "GraphRAG", en: "GraphRAG", c: "应用", d: "用知识图谱组织文档实体与关系，增强多跳推理与全局概括类问答。" },
    { t: "AI Agent", en: "AI Agent", c: "应用", d: "能自主规划、调用工具、观察结果并迭代直至完成目标的模型应用形态。" },
    { t: "工具调用", en: "Function Calling / Tool Use", c: "应用", d: "模型按约定格式请求外部函数或 API，并利用返回结果继续推理。" },
    { t: "MCP", en: "Model Context Protocol", c: "应用", d: "统一模型与外部数据源、工具之间连接方式的开放协议，降低集成成本。" },
    { t: "多智能体", en: "Multi-Agent", c: "应用", d: "多个 Agent 通过分工、辩论或协作完成复杂任务，需关注误差累积与成本控制。" },
    { t: "工作流编排", en: "Workflow Orchestration", c: "应用", d: "把模型调用、条件分支、工具执行串成可视化流程，兼顾可控性与可观测性。" },
    { t: "模型上下文协议客户端", en: "MCP Client", c: "应用", d: "承载 Agent 循环并连接多个 MCP 服务的宿主程序，如各类 AI 编辑器与助手。" },
    { t: "Scaling Law", en: "缩放定律", c: "理论", d: "描述模型损失随参数量、数据量与算力增长的幂律关系，指导资源分配。" },
    { t: "推理时计算扩展", en: "Test-time Compute Scaling", c: "理论", d: "在推理阶段投入更多采样与搜索算力来提升准确率，而非只扩大模型。" },
    { t: "涌现能力", en: "Emergent Abilities", c: "理论", d: "模型规模超过某阈值后突然出现的新能力，学界对其度量方式仍有争议。" },
    { t: "上下文学习", en: "In-Context Learning", c: "理论", d: "仅凭提示中的示例即可完成新任务，无需参数更新。" },
    { t: "灾难性遗忘与持续学习", en: "Continual Learning", c: "理论", d: "让模型在不遗忘旧知识的前提下持续吸收新知识的研究方向。" },
    { t: "世界模型", en: "World Model", c: "前沿", d: "对环境的内部可预测表示，用于规划与仿真，是具身智能的关键组件。" },
    { t: "具身智能", en: "Embodied AI", c: "前沿", d: "让智能体通过身体与真实环境交互学习，典型载体是人形机器人与机械臂。" },
    { t: "VLA 模型", en: "Vision-Language-Action", c: "前沿", d: "把视觉感知、语言指令与动作输出统一到一个模型中，用于机器人控制。" },
    { t: "扩散模型", en: "Diffusion Model", c: "前沿", d: "通过逐步去噪还原数据分布的生成模型，是图像与视频生成的主流技术。" },
    { t: "流匹配", en: "Flow Matching", c: "前沿", d: "学习从噪声到数据的连续变换流，训练更稳定、采样步数更少。" },
    { t: "CLIP", en: "Contrastive Language-Image Pre-training", c: "前沿", d: "通过图文对比学习得到对齐的跨模态表示，广泛用于检索与生成条件控制。" },
    { t: "联邦学习", en: "Federated Learning", c: "工程", d: "数据不出本地、只交换模型更新的分布式训练方式，适合隐私敏感行业。" },
    { t: "算力集群", en: "GPU Cluster", c: "工程", d: "由大量加速卡与高速互联组成的训练/推理基础设施，网络与存储常是瓶颈。" },
    { t: "HBM 高带宽内存", en: "High Bandwidth Memory", c: "工程", d: "与加速卡封装在一起的高带宽显存，是决定大模型推理吞吐的关键资源。" },
    { t: "AI 网关", en: "AI Gateway", c: "工程", d: "统一管理多模型路由、限流、计费与日志的中间层，便于成本与权限治理。" },
    { t: "模型卡", en: "Model Card", c: "工程", d: "描述模型用途、训练数据、评测结果与局限的标准化说明文档。" },
    { t: "红队测试", en: "Red Teaming", c: "工程", d: "主动以对抗方式寻找模型安全漏洞与有害输出的评估方法。" }
  ];

  /* ---------------------------- 行业时间线 ---------------------------- */
  const timeline = [
    { date: "1950", title: "图灵测试提出", desc: "图灵在《计算机器与智能》中提出「机器能思考吗」的判定设想。" },
    { date: "1956", title: "达特茅斯会议", desc: "「人工智能」一词正式诞生，AI 成为独立研究领域。" },
    { date: "1997", title: "深蓝战胜卡斯帕罗夫", desc: "符号搜索与专用硬件的胜利，标志机器在特定博弈任务上超越人类顶尖。" },
    { date: "2012", title: "AlexNet 夺冠 ImageNet", desc: "深度卷积网络大幅刷新图像识别成绩，深度学习浪潮全面开启。" },
    { date: "2016", title: "AlphaGo 战胜李世石", desc: "深度强化学习结合蒙特卡洛树搜索，展示超越人类直觉的决策能力。" },
    { date: "2017", title: "Transformer 架构发表", desc: "自注意力机制问世，为后续所有大语言模型奠定基础。" },
    { date: "2020", title: "GPT-3 与 Scaling Law", desc: "少样本学习与规模定律得到验证，大模型路线被广泛接受。" },
    { date: "2022", title: "ChatGPT 与扩散模型爆发", desc: "对话式 AI 进入大众视野；Stable Diffusion 让文生图走向普及。" },
    { date: "2023", title: "开源大模型与多模态竞赛", desc: "开放权重模型涌现，各厂商密集发布多模态与长上下文能力。" },
    { date: "2024", title: "Agent 与推理模型兴起", desc: "工具调用、多智能体与推理时计算扩展成为技术主线。" },
    { date: "2025", title: "低成本高效训练路线验证", desc: "MoE 与强化学习推理路线证明可以用更低成本达到第一梯队能力。" },
    { date: "2026", title: "从模型竞赛到工程落地", desc: "竞争焦点转向可靠性、单位成本、合规治理与真实业务回报。" }
  ];

  /* ---------------------------- 导出 ---------------------------- */
  return {
    meta, stats, categories, catName,
    news, models, tools, toolCats,
    papers, confs,
    roadmap, courses, books, promptTips,
    glossary, timeline
  };
})();
