/* ==========================================================================
   AI HUB · 硬件配置推荐模块（中文）
   --------------------------------------------------------------------------
   独立于 data.zh.js，因为硬件行情迭代最快，需要单独、频繁地更新。
   本文件只做一件事：把 window.AI_DATA.hardware 挂上去。

   ⚠️ 价格是参考区间（人民币，含税估算），行情波动大，请以实时渠道价为准。
      更新时请同步修改 hardware.updated 字段，页面上会显示「数据截至」。
   ========================================================================== */

(function () {
  "use strict";
  if (!window.AI_DATA) {
    console.error("[AI HUB] hardware.zh.js 需要先加载 data.zh.js");
    return;
  }

  window.AI_DATA.hardware = {
    updated: "2026-09",
    intro:
      "AI 硬件的选型逻辑和普通 PC 完全不同：第一约束是显存容量而不是算力，第二约束是场景——" +
      "放在书桌上、机房里、还是产线旁边，同一套配置的可用性天差地别。本页按「使用者」和「使用环境」两个维度展开。",

    /* ------------------------- 四级市场分层 ------------------------- */
    grades: [
      {
        id: "market", name: "市场级", sub: "消费 / 商用", color: "#0ea5e9", icon: "🛒",
        desc: "面向办公、创作、研发与小规模推理。迭代快、单位算力便宜，但不适合 7×24 高强度生产，也不适合高温高湿高振动环境。",
        tags: ["性价比最高", "6–18 个月迭代", "0–40 °C", "风扇散热"]
      },
      {
        id: "industrial", name: "工业级", sub: "宽温 / 加固", color: "#f59e0b", icon: "🏭",
        desc: "面向产线、能源、交通、野外等场景。强调宽温、抗振、长期供货与长生命周期，单价通常是市场级的 2–5 倍。",
        tags: ["-40–85 °C 宽温", "5–10 年供货承诺", "抗振 / EMC", "可无风扇"]
      }
    ],

    /* ------------------------- 使用环境对比 ------------------------- */
    gradeCompare: [
      { item: "工作温度", market: "0–40 °C（消费级多为 0–35 °C）", industrial: "-40–85 °C（宽温型号）", key: true },
      { item: "存储温度", market: "-20–60 °C", industrial: "-40–90 °C" },
      { item: "湿度", market: "10–85%，无凝结", industrial: "5–95%，无凝结" },
      { item: "供货周期", market: "6–18 个月，随代际淘汰", industrial: "5–10 年长期供货承诺", key: true },
      { item: "MTBF", market: "2–5 万小时", industrial: "10 万小时以上" },
      { item: "内存 ECC", market: "通常无，部分可选", industrial: "标配", key: true },
      { item: "抗振 / 冲击", market: "无明确要求", industrial: "符合 IEC 60068 / MIL-STD-810" },
      { item: "EMC 抗扰", market: "基础等级", industrial: "工业级 EMC，强抗扰（变频器旁可用）" },
      { item: "散热方式", market: "风扇主动散热，需定期除尘", industrial: "无风扇或宽温风扇，少活动部件" },
      { item: "电源", market: "ATX 消费级，220 V 市电", industrial: "9–36 V 宽压，防反接、浪涌保护" },
      { item: "看门狗", market: "无", industrial: "硬件看门狗 + 远程重启" },
      { item: "认证", market: "CE / FCC", industrial: "CE / FCC / UL / IECEx / ATEX 等" },
      { item: "生命周期", market: "1–3 年换代，软件需频繁升级", industrial: "5–10 年稳定，产线不必改版", key: true },
      { item: "价格倍率", market: "1×", industrial: "2–5×", key: true },
      { item: "典型形态", market: "台式机 / 塔式服务器", industrial: "工控机 / 边缘盒子 / 加固机箱" },
      { item: "软件支持", market: "最新驱动，追新", industrial: "LTS 内核，长期维护，不追新" }
    ],

    /* ------------------------- 四类使用者 ------------------------- */
    segments: [
      {
        id: "personal", name: "个人 / 爱好者", short: "个人", icon: "🏠", grade: "market",
        audience: "学生、独立开发者、AI 爱好者、自媒体",
        scenarios: ["本地跑 7B–32B 量化模型", "个人知识库与文档问答", "学习微调与小模型训练", "图片 / 短视频生成"],
        headline: "显存优先于算力，16 GB 是舒适起点",
        builds: [
          {
            tier: "入门", name: "够用就好", price: "¥6,000 – 9,000",
            spec: [["显卡", "RTX 4060 Ti 16GB / RTX 4070 12GB"],
                   ["CPU", "Ryzen 7 或 Core i5（6–8 核）"],
                   ["内存", "32 GB DDR5"],
                   ["存储", "1 TB NVMe（顺序读 ≥ 5 GB/s）"],
                   ["电源", "650 W 金牌"],
                   ["散热", "风冷足够，注意机箱风道"]],
            runs: "7B–14B 4bit 模型流畅；14B FP16 勉强能跑",
            note: "16 GB 显存是这个价位的关键，别为了更高算力去买 8 GB 的卡。"
          },
          {
            tier: "主流", name: "一次到位", price: "¥14,000 – 22,000",
            spec: [["显卡", "RTX 4080 SUPER 16GB / RTX 4090 24GB"],
                   ["CPU", "Ryzen 9 或 Core i7（12–16 核）"],
                   ["内存", "64 GB DDR5"],
                   ["存储", "2 TB NVMe Gen4"],
                   ["电源", "850–1000 W 金牌"],
                   ["散热", "双塔风冷或 360 水冷"]],
            runs: "14B–32B 4bit 可跑；32B FP16 需要两张卡",
            note: "24 GB 是消费级最实用的一档，覆盖绝大多数本地需求，也是二手保值最好的一档。"
          },
          {
            tier: "进阶", name: "双卡起步", price: "¥35,000 – 55,000",
            spec: [["显卡", "2 × RTX 4090 24GB（合计 48 GB）"],
                   ["CPU", "Threadripper 或 Core i9（24 核以上）"],
                   ["内存", "128 GB DDR5"],
                   ["存储", "4 TB NVMe Gen4 + 8 TB HDD 归档"],
                   ["电源", "1600 W 钛金"],
                   ["散热", "需要大机箱，双卡之间留足间距"]],
            runs: "70B 4bit 可跑；32B 全量微调",
            note: "务必先查主板的 PCIe 通道分配，插满后掉到 x4 会明显拖慢多卡训练。"
          }
        ],
        pitfalls: [
          "只看算力不看显存——显存决定「能不能跑」，算力只决定「跑多快」",
          "单卡 4090 建议 850 W 以上电源，750 W 硬撑会在峰值时掉电重启",
          "多卡机箱风道比想象中重要，公版涡轮卡更适合多卡堆叠",
          "二手矿卡价差诱人但风险高，优先选有质保的整机或授权渠道"
        ]
      },

      {
        id: "studio", name: "专业 / 工作室", short: "专业", icon: "🎬", grade: "market",
        audience: "设计工作室、内容团队、初创公司研发、高校实验室",
        scenarios: ["多模型并行推理服务", "LoRA 微调与领域适配", "视频生成与批量渲染", "内部知识库与 Agent 平台"],
        headline: "从「能跑」转向「稳定跑」，冗余与散热开始变重要",
        builds: [
          {
            tier: "起步", name: "单机双卡", price: "¥60,000 – 100,000",
            spec: [["显卡", "2 × RTX 4090 24GB 或 1 × RTX 6000 Ada 48GB"],
                   ["CPU", "Threadripper / Xeon Silver（24 核以上）"],
                   ["内存", "256 GB DDR5 ECC"],
                   ["存储", "4 TB NVMe Gen4（系统+模型） + 16 TB 阵列"],
                   ["电源", "1600 W 钛金，建议冗余"],
                   ["网络", "双 2.5G / 万兆"]],
            runs: "70B 4bit 推理；7B–13B 全量微调；多模型并行服务",
            note: "48 GB 单卡比双 24 GB 更省心：不用处理多卡分配，显存也更好用满。"
          },
          {
            tier: "标准", name: "工作站", price: "¥180,000 – 320,000",
            spec: [["显卡", "2 × RTX 6000 Ada 48GB（合计 96 GB）"],
                   ["CPU", "Threadripper PRO（32–64 核）"],
                   ["内存", "512 GB DDR5 ECC"],
                   ["存储", "8 TB NVMe Gen4 RAID1 + 32 TB 备份"],
                   ["电源", "2000 W 冗余电源"],
                   ["散热", "机架式或塔式，独立风道"]],
            runs: "70B FP16 推理；32B 全量微调；批量视频生成",
            note: "这个价位必须上 ECC 内存，长时间微调时一位内存翻转就能毁掉整个训练。"
          },
          {
            tier: "进阶", name: "推理服务器", price: "¥400,000 – 800,000",
            spec: [["显卡", "4 × L40S 48GB 或 4 × A100 80GB"],
                   ["CPU", "双路 EPYC（64 核以上）"],
                   ["内存", "1 TB DDR5 ECC"],
                   ["存储", "NVMe RAID + 分布式存储接入"],
                   ["电源", "4 路冗余电源"],
                   ["网络", "双万兆 / 25G，支持 RoCE"]],
            runs: "百路并发推理；多业务线共用；模型服务化（vLLM / TGI）",
            note: "到这一档，瓶颈往往在显存带宽和并发调度，而不是单卡算力。"
          }
        ],
        pitfalls: [
          "把研发用的消费级机器直接拿去跑生产服务，显卡长期高负载寿命骤降",
          "忽略内存容量：微调时内存不足会让整机卡死，比显存不足更难排查",
          "存储只配一块 NVMe——模型和数据集放在同一块盘会互相抢 IO",
          "没算电费：四卡满载常年运行，电费可能超过硬件折旧"
        ]
      },

      {
        id: "enterprise", name: "企业", short: "企业", icon: "🏢", grade: "market",
        audience: "中大型企业、金融证券、政企私有化部署、SaaS 服务商",
        scenarios: ["7×24 生产推理服务", "多租户 / 多业务线共用", "数据不出域的合规要求", "高可用与容灾"],
        headline: "买的是可用性，不是算力——冗余和 TCO 才是核心",
        builds: [
          {
            tier: "试点", name: "验证型节点", price: "¥150,000 – 300,000",
            spec: [["显卡", "2 × L40S 48GB 或 2 × A100 40GB"],
                   ["CPU", "双路 Xeon Silver / EPYC"],
                   ["内存", "512 GB DDR5 ECC"],
                   ["存储", "SSD 系统盘 RAID1 + NVMe 缓存盘"],
                   ["电源", "双路冗余，双路市电接入"],
                   ["网络", "双万兆，带外管理口"]],
            runs: "单业务线 POC，20–50 路并发",
            note: "试点阶段就该上带外管理与冗余电源，否则迁移到生产要重来一遍。"
          },
          {
            tier: "生产", name: "标准生产节点", price: "¥800,000 – 2,000,000",
            spec: [["显卡", "4–8 × A100 80GB / H100 80GB，NVLink 互联"],
                   ["CPU", "双路 EPYC（64–96 核）"],
                   ["内存", "1–2 TB DDR5 ECC"],
                   ["存储", "企业级 NVMe RAID + 分布式存储"],
                   ["电源", "N+1 冗余，双路 UPS 保护"],
                   ["网络", "25G / 100G，RoCE v2 或 InfiniBand"]],
            runs: "200+ 路并发；多业务线隔离；支持推理与微调混跑",
            note: "NVLink 对训练收益明显，纯推理场景可以省下这笔钱换更多显存。"
          },
          {
            tier: "集群", name: "多节点集群", price: "按节点扩展",
            spec: [["节点", "8 卡节点 × N，按算力需求横向扩展"],
                   ["互联", "InfiniBand NDR / RoCE 高速网络"],
                   ["存储", "并行文件系统（Lustre / GPFS 类）"],
                   ["调度", "Kubernetes + GPU 调度器 / Slurm"],
                   ["机房", "机柜功率密度 ≥ 20 kW，必须液冷或强风冷"],
                   ["运维", "监控告警、成本分摊、配额管理"]],
            runs: "大规模训练与推理混合负载",
            note: "集群的成败在运维而不在硬件：没有配额与成本分摊，算力很快会被刷满。"
          }
        ],
        pitfalls: [
          "只算采购价不算三年 TCO——电费、运维、故障停机通常超过硬件本身",
          "忽略机柜供电与制冷余量，机器到货才发现装不下",
          "没有带外管理（IPMI/BMC）与远程重启，一次死机就要跑机房",
          "忽略多租户隔离，业务之间互相抢显存导致线上抖动",
          "合规场景务必确认固件与驱动的长期可获取性，避免被断供"
        ]
      },

      {
        id: "industrial", name: "工业 / 边缘", short: "工业", icon: "🏭", grade: "industrial",
        audience: "制造业产线、能源电力、矿山、轨道交通、户外场站",
        scenarios: ["产线视觉质检（多路相机实时推理）", "设备预测性维护与振动分析", "井下 / 野外无人值守", "车载与移动平台"],
        headline: "环境决定一切：宽温、无风扇、长期供货优先于算力",
        builds: [
          {
            tier: "模组级", name: "边缘推理模组", price: "¥8,000 – 25,000",
            spec: [["计算", "Jetson Orin NX 16GB 或同级国产模组"],
                   ["CPU", "板载 ARM，与 GPU 共享内存"],
                   ["内存", "16 GB LPDDR5（统一内存）"],
                   ["存储", "工业级 NVMe 256 GB–1 TB（高 TBW）"],
                   ["供电", "9–36 V 宽压，带浪涌保护"],
                   ["形态", "无风扇被动散热，-25–70 °C"]],
            runs: "7B 4bit 或专用视觉模型；功耗 10–25 W",
            note: "统一内存的好处是显存不够时可以借系统内存，代价是带宽下降。"
          },
          {
            tier: "工控整机", name: "宽温工控机 + 单卡", price: "¥40,000 – 120,000",
            spec: [["计算", "单张涡轮/被动散热专业卡（L4 / RTX A2000 级）"],
                   ["CPU", "嵌入式 Xeon / Core（低功耗型号）"],
                   ["内存", "64 GB DDR5 ECC"],
                   ["存储", "工业级 NVMe RAID1 + SLC 缓存"],
                   ["供电", "宽压 DC 输入，防反接 + 浪涌 + 隔离"],
                   ["形态", "4U 上架 / 壁挂，-20–60 °C，抗振 5 Grms"]],
            runs: "多路相机实时质检；中小模型本地推理",
            note: "专业卡的涡轮散热更适合机柜内密集安装，消费级三风扇卡在机柜里会热到降频。"
          },
          {
            tier: "加固级", name: "加固边缘服务器", price: "¥200,000 – 600,000",
            spec: [["计算", "2–4 张宽温专业卡"],
                   ["CPU", "双路嵌入式 Xeon"],
                   ["内存", "256–512 GB DDR5 ECC"],
                   ["存储", "工业级 NVMe RAID + 宽温备份"],
                   ["供电", "双路宽压冗余，-40 °C 可启动"],
                   ["形态", "加固机箱，-40–70 °C，MIL-STD-810 抗振"]],
            runs: "整条产线或整个场站的边缘算力节点",
            note: "-40 °C 冷启动是硬指标，普通硬盘和电容在这个温度下根本无法工作。"
          }
        ],
        pitfalls: [
          "别用消费级 SSD：工业看的是写入寿命（TBW/DWPD）和宽温，不是跑分",
          "风扇是最大故障源之一——能无风扇就无风扇，需要风扇也要选宽温长寿命型号",
          "一定要确认长期供货：产线设备生命周期常 7–10 年，中途断供意味着要重新认证",
          "宽压输入、防反接、浪涌保护不能省，电网波动是工业现场常态",
          "EMC 与接地：变频器、大功率电机旁边的干扰会让设备随机重启，必须按工业等级做屏蔽",
          "必须预留硬件看门狗与远程重启：现场无人值守，死机无法人工干预",
          "环境温度要按机柜内部温度算，不是车间温度——机柜内通常高出 10–15 °C"
        ]
      }
    ],

    /* ------------------------- 显存需求速查 ------------------------- */
    vramNote:
      "估算公式：显存 ≈ 参数量 × 每参数字节数 + KV Cache + 激活值。其中 FP16 ≈ 2 字节/参数，" +
      "INT8 ≈ 1.1，INT4 ≈ 0.55。KV Cache 随上下文长度线性增长，长上下文场景可能超过模型本身。",
    vram: [
      { size: "7B – 8B",   fp16: "16 GB",   int8: "8 – 10 GB", int4: "5 – 6 GB",    market: "RTX 4060 Ti 16GB", prof: "L4 / T4" },
      { size: "13B – 14B", fp16: "28 GB",   int8: "14 GB",     int4: "8 – 9 GB",    market: "RTX 4080 16GB（4bit）", prof: "L40S 48GB" },
      { size: "30B – 34B", fp16: "68 GB",   int8: "34 GB",     int4: "18 – 20 GB",  market: "RTX 4090 24GB（4bit）", prof: "2 × L40S / A6000 48GB" },
      { size: "70B",       fp16: "140 GB",  int8: "70 GB",     int4: "36 – 40 GB",  market: "2 × 4090（4bit，勉强）", prof: "2 × A100 80GB / 4 × L40S" },
      { size: "110B+ / 大 MoE", fp16: "220 GB+", int8: "110 GB+", int4: "60 GB+",   market: "不建议消费级", prof: "4 – 8 × H100 80GB" },
      { size: "全量微调",  fp16: "≈ 16 × 参数量", int8: "—",     int4: "—",           market: "不现实", prof: "多卡 + NVLink" },
      { size: "LoRA 微调", fp16: "≈ 4 × 参数量",  int8: "—",     int4: "—",           market: "单卡 24GB 可调 7B", prof: "L40S / A100" }
    ],

    /* ------------------------- 关键指标 ------------------------- */
    metrics: [
      { name: "显存容量", role: "决定「能不能跑」", detail: "必须同时放下模型权重、KV Cache 和激活值。不够就是不够，没有任何调优能弥补。" },
      { name: "显存带宽", role: "决定「跑多快」", detail: "自回归生成是访存密集型，decode 阶段几乎完全受带宽限制。带宽翻倍，出字速度大致翻倍。" },
      { name: "算力（TFLOPS）", role: "决定 prefill 与训练速度", detail: "对短问答影响远小于带宽；对长上下文预填充、批量训练和视频生成影响大。" },
      { name: "KV Cache", role: "长上下文的隐形开销", detail: "随上下文长度与并发数线性增长。128K 上下文的 KV Cache 可能比 7B 模型本身还大。" },
      { name: "系统内存", role: "建议 ≥ 显存 × 1.5", detail: "微调与数据加载吃内存，内存不足会让整机无响应，比显存不足更难排查。" },
      { name: "存储 IO", role: "决定模型加载时间", detail: "顺序读 ≥ 5 GB/s 是舒适线。几十 GB 的模型从机械盘加载会等到怀疑人生。" },
      { name: "电源功率", role: "按 1.5 倍余量预留", detail: "单卡 4090 峰值约 450 W，整机按 GPU 总功耗 × 1.5 + 200 W 估算。" },
      { name: "卡间互联", role: "训练看 PCIe/NVLink，推理基本不看", detail: "纯推理多卡几乎不需要卡间通信，把预算花在显存上更划算。" }
    ],

    /* ------------------------- 预算分配 ------------------------- */
    budget: [
      { segment: "个人", alloc: [["显卡", 55], ["平台（CPU + 主板 + 内存）", 30], ["存储", 10], ["电源与机箱", 5]] },
      { segment: "专业", alloc: [["显卡", 60], ["平台", 22], ["存储", 12], ["电源与散热", 6]] },
      { segment: "企业", alloc: [["计算单元", 65], ["冗余平台与电源", 15], ["网络", 10], ["存储", 7], ["运维与软件", 3]] },
      { segment: "工业", alloc: [["计算硬件", 45], ["加固与认证", 25], ["备件与长期服务", 20], ["软件适配", 10]] }
    ],

    /* ------------------------- 常见误区 ------------------------- */
    mistakes: [
      { title: "只堆算力不看显存", desc: "买了两张 8 GB 的卡，不如一张 16 GB 的卡好用——显存不够时模型根本加载不进去，算力再高也用不上。" },
      { title: "用消费级硬件跑 7×24 生产", desc: "消费级显卡的散热与供电设计针对游戏峰值而非长期满载。生产环境请用专业卡或至少做好冗余与监控。" },
      { title: "忽略电源与散热余量", desc: "瞬态功率尖峰会导致保护性关机，表现为「随机重启」，最难排查。电源宁大勿小。" },
      { title: "多卡忽略 PCIe 通道", desc: "主板插满后降到 x4 会让多卡训练慢一半。买之前一定查 PCIe 通道分配表。" },
      { title: "高估消费级 SSD 的写入寿命", desc: "持续写入的训练日志与数据集会快速消耗 TBW。工业与生产场景请用高 DWPD 的企业级盘。" },
      { title: "忽略三年 TCO", desc: "电费、运维人力、故障停机往往超过硬件采购价。企业采购一定要算 TCO 而不是单价。" },
      { title: "把机房方案搬到工业现场", desc: "机房里能用的设备，到了振动、粉尘、宽温、强干扰的现场可能一周就坏。环境等级不能降级使用。" }
    ],

    /* ------------------------- 采购前自检 ------------------------- */
    checklist: [
      "目标模型的最大参数量与量化方式是什么？",
      "需要多长的上下文？这决定 KV Cache 的开销",
      "是纯推理还是要微调？微调需要 4–16 倍显存",
      "单次请求可接受的延迟是多少？首 Token 延迟还是吞吐优先？",
      "并发峰值多少路？按峰值而非均值选型",
      "数据是否必须留在本地？决定了私有化部署的规模",
      "部署环境的温度、粉尘、振动、电磁干扰如何？",
      "设备预期生命周期多长？需要长期供货保证吗？",
      "机房 / 机柜的供电与制冷余量够吗？功率密度多少？",
      "三年 TCO 算过吗？包含电费、运维与故障损失",
      "备件策略是什么？关键部件是否有现货可换？",
      "固件与驱动的长期可获取性如何？会不会被断供？"
    ],

    /* ------------------------- 品牌与供应商 ------------------------- */
    vendorCats: [
      { id: "all",         name: "全部" },
      { id: "chip",        name: "计算芯片" },
      { id: "oem",         name: "整机与服务器" },
      { id: "workstation", name: "工作站品牌" },
      { id: "laptop",      name: "笔记本品牌" },
      { id: "ipc",         name: "工业计算机" },
      { id: "domestic",    name: "国产化方案" },
      { id: "cloud",       name: "云算力" },
      { id: "channel",     name: "采购渠道" }
    ],
    vendorsNote:
      "选品牌之前先想清楚三件事：一是生态——CUDA 的迁移成本至今仍是最大的隐性支出；" +
      "二是供货——被限制出口的型号拿到货的周期与价格都不确定；三是支持——出了问题能不能在 24 小时内有人响应。" +
      "下表为公开信息整理，不构成推荐或背书。",
    vendors: [
      { name: "NVIDIA", region: "美国", cat: "chip", tier: "生态主导",
        products: "H100 / H200 / B200、RTX 40/50 系、L40S、Jetson",
        note: "CUDA 生态最成熟，工具链与社区资料远超其他平台。关注出口管制对型号与供货的影响。", url: "https://www.nvidia.com" },
      { name: "AMD", region: "美国", cat: "chip", tier: "性价比替代",
        products: "Instinct MI300X / MI325X、Radeon Pro",
        note: "显存容量给得大方，单卡性价比高。软件栈 ROCm 仍在追赶，迁移前务必做兼容性验证。", url: "https://www.amd.com" },
      { name: "Intel", region: "美国", cat: "chip", tier: "挑战者",
        products: "Gaudi 3 加速卡、Arc Pro 推理卡、Xeon 平台",
        note: "在推理与通用服务器场景有价格优势，配套 oneAPI 生态。适合已有 Intel 平台的企业。", url: "https://www.intel.com" },
      { name: "Google", region: "美国", cat: "chip", tier: "自研 TPU",
        products: "TPU v5e / v6e（Trillium）",
        note: "不单独售卖硬件，只能通过 Google Cloud 使用。TensorFlow/JAX 场景性价比突出。", url: "https://cloud.google.com/tpu" },
      { name: "AWS", region: "美国", cat: "chip", tier: "自研芯片",
        products: "Trainium 2、Inferentia 2",
        note: "仅在 AWS 内提供，推理成本控制有优势，迁移需要适配 Neuron SDK。", url: "https://aws.amazon.com/machine-learning/trainium/" },

      { name: "华为昇腾", region: "中国", cat: "domestic", tier: "国产主力",
        products: "Ascend 910B / 910C、Atlas 800/300、310P 推理卡",
        note: "国产化方案里生态最完整（CANN + MindSpore + 昇腾社区），信创项目常见选择。", url: "https://www.hiascend.com" },
      { name: "寒武纪", region: "中国", cat: "domestic", tier: "国产",
        products: "思元 MLU370 / MLU590、玄思加速卡",
        note: "推理与训练两头都有布局，配套 Cambricon Neuware 软件栈。", url: "https://www.cambricon.com" },
      { name: "海光", region: "中国", cat: "domestic", tier: "国产",
        products: "深算 DCU 系列、海光 CPU",
        note: "DCU 与 CUDA 有较好的兼容层，迁移改动相对小；CPU+DCU 可整机国产化。", url: "https://www.hygon.cn" },
      { name: "摩尔线程", region: "中国", cat: "domestic", tier: "国产",
        products: "MTT S 系列、夸娥 KUAE 智算集群",
        note: "图形与计算双线，MUSA 架构提供 CUDA 代码迁移工具。", url: "https://www.mthreads.com" },
      { name: "壁仞科技", region: "中国", cat: "domestic", tier: "国产",
        products: "BR100 / BR104 系列",
        note: "主打大算力训练卡，配套 BIRENSUPA 软件栈。", url: "https://www.birentech.com" },
      { name: "天数智芯", region: "中国", cat: "domestic", tier: "国产",
        products: "天垓 150（训练）、智铠 100（推理）",
        note: "训练与推理分线布局，已在部分智算中心落地。", url: "https://www.iluvatar.com" },
      { name: "燧原科技", region: "中国", cat: "domestic", tier: "国产",
        products: "邃思 2.0、云燧训练/推理卡",
        note: "腾讯系投资背景，在互联网场景有实际部署案例。", url: "https://www.enflame-tech.com" },

      { name: "戴尔 Dell", region: "美国", cat: "oem", tier: "全球一线",
        products: "PowerEdge XE9680 / R760xa、Precision 工作站",
        note: "全球服务网络最完善，交付与备件体系成熟，适合跨国企业统一采购。", url: "https://www.dell.com" },
      { name: "惠普 HPE", region: "美国", cat: "oem", tier: "全球一线",
        products: "ProLiant DL380a / Cray 超算、Z by HP 工作站",
        note: "在企业级与 HPC 场景积累深，GreenLake 可按用量付费。", url: "https://www.hpe.com" },
      { name: "联想 Lenovo", region: "中国", cat: "oem", tier: "全球一线",
        products: "ThinkSystem SR675 / SR670、ThinkStation PX",
        note: "国内交付与服务体系最强，海神液冷方案在能耗上有优势。", url: "https://www.lenovo.com" },
      { name: "浪潮信息", region: "中国", cat: "oem", tier: "国内份额领先",
        products: "NF5688 / NF5488 系列 AI 服务器、元脑平台",
        note: "国内 AI 服务器出货量领先，与互联网大厂合作紧密，定制能力强。", url: "https://www.inspur.com" },
      { name: "新华三 H3C", region: "中国", cat: "oem", tier: "国内一线",
        products: "UniServer R5500 / R5300 系列",
        note: "服务器 + 网络 + 存储一体交付，政企与运营商项目常见。", url: "https://www.h3c.com" },
      { name: "超微 Supermicro", region: "美国", cat: "oem", tier: "灵活度高",
        products: "SYS-821GE、GPU 服务器与液冷方案",
        note: "产品迭代快、配置灵活，是很多云厂商与自建集群的隐性主力。", url: "https://www.supermicro.com" },
      { name: "技嘉 GIGABYTE", region: "中国台湾", cat: "oem", tier: "灵活度高",
        products: "G 系列 GPU 服务器、AI 工作站",
        note: "在中小规模部署与自建工作站场景口碑不错。", url: "https://www.gigabyte.com" },
      { name: "宁畅 Nettrix", region: "中国", cat: "oem", tier: "定制",
        products: "X640 / X660 系列 AI 服务器",
        note: "脱胎于浪潮体系，主打按需定制与快速交付。", url: "https://www.nettrix.com.cn" },
      { name: "中科曙光", region: "中国", cat: "oem", tier: "高性能计算",
        products: "XMachine 系列、硅立方液冷",
        note: "HPC 与液冷技术积累深，在科研与智算中心场景常见。", url: "https://www.sugon.com" },

      { name: "联想 ThinkStation", region: "中国", cat: "workstation", tier: "工作站",
        products: "PX / PX2（双路）、P620 / P720",
        note: "塔式工作站出货量大，配件与售后在国内最好找。", url: "https://www.lenovo.com" },
      { name: "戴尔 Precision", region: "美国", cat: "workstation", tier: "工作站",
        products: "Precision 7960 塔式、7875 机架式",
        note: "企业采购流程成熟，配置与保修选项清晰。", url: "https://www.dell.com" },
      { name: "惠普 Z by HP", region: "美国", cat: "workstation", tier: "工作站",
        products: "Z8 Fury、Z6 G5、Z G1 机架式",
        note: "Z8 Fury 支持双路 Xeon + 多张双宽卡，散热设计成熟。", url: "https://www.hp.com" },
      { name: "苹果 Mac Studio / Mac Pro", region: "美国", cat: "workstation", tier: "统一内存",
        products: "Mac Studio M4 Max / M3 Ultra（最高 512 GB 统一内存）",
        note: "唯一能在桌面上提供 192–512 GB 统一内存的消费级方案，但算力密度低于同价位独显阵列。", url: "https://www.apple.com/mac-studio/" },
      { name: "超微 / 华硕 Pro WS", region: "美国 / 中国台湾", cat: "workstation", tier: "自建",
        products: "Pro WS WRX90、主板 + 自选显卡",
        note: "自建工作站路线：主板支持 4–7 条 PCIe 5.0 x16，适合需要极限通道数的多卡场景。", url: "https://www.asus.com" },

      { name: "苹果 MacBook Pro", region: "美国", cat: "laptop", tier: "统一内存",
        products: "M4 Pro / M4 Max，最高 128 GB 统一内存",
        note: "移动端唯一能上 64–128 GB 显存级内存的方案，续航与静音表现突出，但不适合长时间满载训练。", url: "https://www.apple.com/macbook-pro/" },
      { name: "联想 ThinkPad / Legion", region: "中国", cat: "laptop", tier: "商务与电竞",
        products: "ThinkPad P1 / P16v 移动工作站、Legion Pro 5/7",
        note: "ThinkPad P 系列是移动工作站主流选择，键盘与稳定性口碑好；Legion 性价比高。", url: "https://www.lenovo.com" },
      { name: "戴尔 XPS / Precision 移动", region: "美国", cat: "laptop", tier: "商务与创作",
        products: "XPS 16、Precision 5690 / 7680",
        note: "Precision 移动工作站可选专业卡（RTX 2000/5000 Ada），驱动经过 ISV 认证。", url: "https://www.dell.com" },
      { name: "惠普 ZBook / OMEN", region: "美国", cat: "laptop", tier: "商务与电竞",
        products: "ZBook Fury G11 / Studio G11、OMEN 暗影精灵",
        note: "ZBook Fury 是少数能上专业大显存卡的移动工作站之一。", url: "https://www.hp.com" },
      { name: "华硕 ROG / ProArt", region: "中国台湾", cat: "laptop", tier: "电竞与创作",
        products: "ROG 枪神 / 幻系列、ProArt 创 16",
        note: "ProArt 系列面向创作者，屏幕色准与散热释放都较好。", url: "https://www.asus.com" },
      { name: "微星 MSI", region: "中国台湾", cat: "laptop", tier: "电竞与创作",
        products: "泰坦 GT / 绝影、CreatorPro 系列",
        note: "高性能释放调校激进，CreatorPro 支持专业卡。", url: "https://www.msi.com" },
      { name: "华为 MateBook / 小米", region: "中国", cat: "laptop", tier: "轻薄国产",
        products: "MateBook X Pro、Redmi Book Pro",
        note: "多屏协同与生态联动好，适合以云 API 为主的轻量使用。", url: "https://consumer.huawei.com" },

      { name: "研华 Advantech", region: "中国台湾", cat: "ipc", tier: "工控龙头",
        products: "MIC-770 / 733 边缘 AI 计算机、ITA 系列",
        note: "全球工控机龙头，产品线最全，宽温与长期供货选项清晰。", url: "https://www.advantech.com" },
      { name: "凌华 ADLINK", region: "中国台湾", cat: "ipc", tier: "边缘 AI",
        products: "DLAP 系列边缘服务器、MXE 加固计算",
        note: "专注边缘 AI 与加固计算，常与 NVIDIA Jetson 模组搭配。", url: "https://www.adlinktech.com" },
      { name: "控创 Kontron", region: "德国", cat: "ipc", tier: "工业级",
        products: "KBox 系列、CPCI/VPX 板卡",
        note: "欧洲工业与轨道交通标准参与度高，认证齐全。", url: "https://www.kontron.com" },
      { name: "西门子 SIMATIC", region: "德国", cat: "ipc", tier: "工业级",
        products: "SIMATIC IPC 系列、工控边缘网关",
        note: "与自家 PLC/工控生态深度集成，产线改造项目常用。", url: "https://www.siemens.com" },
      { name: "研祥 EVOC", region: "中国", cat: "ipc", tier: "国产工控",
        products: "MEC / IPC 系列、加固计算机",
        note: "国内工控老牌，在能源、电力、军工场景有较多案例。", url: "https://www.evoc.cn" },
      { name: "华北工控", region: "中国", cat: "ipc", tier: "国产工控",
        products: "嵌入式工控机、宽温无风扇整机",
        note: "定制灵活、交期较短，适合中小批量项目。", url: "https://www.norco.com.cn" },
      { name: "瑞芯微 Rockchip", region: "中国", cat: "ipc", tier: "边缘模组",
        products: "RK3588 / RK3588S、核心板",
        note: "性价比极高的国产边缘计算平台，6 TOPS NPU，适合视觉与轻量推理。", url: "https://www.rock-chips.com" },
      { name: "地平线 Horizon", region: "中国", cat: "ipc", tier: "边缘模组",
        products: "征程 Journey 系列、旭日 Sunrise",
        note: "车载与安防场景主力，工具链偏专用，通用大模型支持有限。", url: "https://www.horizon.cc" },

      { name: "松下 Toughbook", region: "日本", cat: "ipc", tier: "加固笔记本",
        products: "Toughbook 40 / 55、FZ 系列",
        note: "加固笔记本标杆，防摔防尘防水与宽温，野外与车载场景首选。", url: "https://na.panasonic.com/us/computers-tablets/toughbook" },
      { name: "神基 Getac", region: "中国台湾", cat: "ipc", tier: "加固笔记本",
        products: "X600 / B360、加固平板",
        note: "性价比优于 Toughbook，可配独立显卡，适合现场 AI 推理。", url: "https://www.getac.com" },
      { name: "戴尔 Latitude Rugged", region: "美国", cat: "ipc", tier: "加固笔记本",
        products: "Latitude 5430 Rugged / 7330 Rugged Extreme",
        note: "企业 IT 体系内采购方便，可直接纳入现有保修与资产流程。", url: "https://www.dell.com" },

      { name: "阿里云", region: "中国", cat: "cloud", tier: "国内一线",
        products: "灵骏智算集群、PAI 平台、GPU 云服务器",
        note: "国内生态最完整，从单卡按量到千卡集群都有；注意区分「共享型」与「独占型」实例。", url: "https://www.aliyun.com" },
      { name: "腾讯云 / 百度智能云 / 火山引擎", region: "中国", cat: "cloud", tier: "国内一线",
        products: "HAI、千帆、火山方舟",
        note: "三家在模型服务与推理托管上各有侧重，价格战频繁，适合先比价再定。", url: "https://cloud.tencent.com" },
      { name: "华为云", region: "中国", cat: "cloud", tier: "国产化",
        products: "ModelArts、昇腾云服务",
        note: "信创与政企项目常选，与昇腾硬件同源，迁移路径清晰。", url: "https://www.huaweicloud.com" },
      { name: "AWS / Azure / Google Cloud", region: "美国", cat: "cloud", tier: "全球一线",
        products: "EC2 P5/G5、ND H100 v5、A3 系列",
        note: "全球可用区与合规认证最全，适合出海业务；价格显著高于国内，注意数据传输费用。", url: "https://aws.amazon.com" },
      { name: "CoreWeave / Lambda Labs", region: "美国", cat: "cloud", tier: "GPU 专营",
        products: "按时/包月 H100、A100 集群",
        note: "专注 GPU 出租，单价常低于三大云，适合短期大训练；网络与存储配套相对简单。", url: "https://www.coreweave.com" },
      { name: "RunPod / Vast.ai", region: "美国", cat: "cloud", tier: "低成本",
        products: "社区化 GPU 租赁，按小时计费",
        note: "价格最低但机器质量参差，适合实验与临时任务，不适合生产。", url: "https://www.runpod.io" },
      { name: "AutoDL / 恒源云", region: "中国", cat: "cloud", tier: "个人友好",
        products: "按小时租用的单卡/多卡实例，预装环境",
        note: "国内个人开发者与学生常用的低成本选择，镜像与数据盘管理方便。", url: "https://www.autodl.com" },
      { name: "地方智算中心", region: "中国", cat: "cloud", tier: "政策算力",
        products: "国资背景智算中心，常有算力券补贴",
        note: "价格可能非常低甚至免费，但配额、审批与可用型号受限，适合非紧急任务。", url: "" },

      { name: "京东企业购 / 京东工业", region: "中国", cat: "channel", tier: "零售",
        products: "整机、显卡、服务器配件",
        note: "开票与售后规范，价格透明；大额采购可谈企业协议价。", url: "https://b.jd.com" },
      { name: "授权代理商", region: "各地", cat: "channel", tier: "企业采购",
        products: "浪潮、联想、华为、戴尔的一级/二级代理",
        note: "企业批量采购的正规路径，能拿到项目价与本地化服务，务必确认授权资质与保修条款。", url: "" },
      { name: "立创商城 / Mouser / DigiKey", region: "中国 / 全球", cat: "channel", tier: "元器件",
        products: "电源、连接器、散热、工控模块",
        note: "自建或维修场景找小件与工业模块的正规渠道，比现货市场可靠。", url: "https://www.szlcsc.com" },
      { name: "二手与拆机渠道", region: "各地", cat: "channel", tier: "高风险",
        products: "退役矿卡、拆机服务器、翻新卡",
        note: "价格诱人但风险集中：矿卡寿命不明、拆机盘写入量未知、无质保。仅建议在能承担报废风险的场景使用，务必现场压测。", url: "" }
    ],

    /* ------------------------- 笔记本与移动方案 ------------------------- */
    laptops: {
      note:
        "笔记本用于本地 AI 有三个硬约束：显存天花板、功耗墙、以及散热带来的性能缩水。" +
        "同型号 GPU 在笔记本上通常只有桌面版 50–70% 的性能，显存也往往被砍。先想清楚你是「移动办公 + 云 API」还是「必须离网跑模型」，这两条路线的选择完全不同。",
      points: [
        { title: "显存天花板是 16 GB", desc: "RTX 4090 Laptop 也只有 16 GB，且这是移动端独显的上限。13B 以上模型基本只能靠 4bit 量化硬挤。" },
        { title: "统一内存是唯一的例外", desc: "Apple Silicon 的 M4 Max 可配到 128 GB 统一内存，是移动端唯一能跑 70B 量级的方案。代价是内存带宽低于独显，出字速度慢。" },
        { title: "功耗墙决定实际性能", desc: "同样是 RTX 4070 Laptop，115 W 和 140 W 满血版差距可到 20%。买之前一定要看实测功耗释放，而不是只看型号。" },
        { title: "别拿笔记本当推理服务器", desc: "笔记本的散热设计不支持 7×24 满载。长期高负载会加速电池鼓包与风扇失效，出保后维修成本很高。" },
        { title: "外接显卡坞性价比很低", desc: "雷电 4 的 40 Gbps 带宽远低于 PCIe 5.0 x16，实测性能损失常达 20–40%，还要额外买电源和显卡坞，不如直接买台式机。" }
      ],
      units: [
        { tier: "轻薄办公", name: "云为主，本地为辅", price: "¥5,000 – 9,000",
          spec: [["代表机型", "MacBook Air M4、联想小新 Pro、华为 MateBook X Pro"],
                 ["芯片", "Apple M4 / 核显轻薄本"],
                 ["可用显存", "共享内存 16–24 GB"],
                 ["重量 / 续航", "< 1.4 kg / 12 h+"],
                 ["散热", "无风扇或单风扇，不适合满载"]],
          runs: "7B 4bit 能跑但慢；日常主力靠云 API",
          note: "如果你的工作 90% 走云 API，这是最划算的选择——把钱花在云端算力上，比买一块用不上的独显划算得多。" },
        { tier: "全能本", name: "本地小模型 + 移动办公", price: "¥8,000 – 13,000",
          spec: [["代表机型", "联想 Legion Pro 5、华硕 ROG 幻 16、戴尔 XPS 15"],
                 ["GPU", "RTX 4060 / 4070 Laptop"],
                 ["显存", "8 GB"],
                 ["内存", "32 GB DDR5（建议直接上满）"],
                 ["功耗释放", "115–140 W，务必选满血版"]],
          runs: "7B–8B 4bit 流畅；13B 需量化且勉强",
          note: "8 GB 显存是这条线的主要瓶颈。优先选内存可自行升级到 64 GB 的机型。" },
        { tier: "高性能创作本", name: "移动端独显天花板", price: "¥15,000 – 28,000",
          spec: [["代表机型", "ROG 枪神 9、微星泰坦 18 HX、华硕 ProArt 创 16"],
                 ["GPU", "RTX 4080 / 4090 Laptop 或 RTX 5000 Ada"],
                 ["显存", "12 – 16 GB"],
                 ["内存", "64 GB DDR5"],
                 ["散热", "双风扇多热管，重量 2.4 kg+"]],
          runs: "13B–32B 4bit 可跑；LoRA 微调 7B",
          note: "16 GB 是移动端上限。这个价位已经接近同等性能的台式机 + 一台轻薄本的总价，先想清楚是否真的需要一体。" },
        { tier: "Apple 大内存", name: "移动端唯一的大显存方案", price: "¥25,000 – 55,000",
          spec: [["代表机型", "MacBook Pro 16 英寸 M4 Max、Mac Studio M3 Ultra"],
                 ["芯片", "Apple M4 Max / M3 Ultra"],
                 ["统一内存", "64 / 128 / 最高 512 GB"],
                 ["带宽", "约 400–800 GB/s（低于同级独显）"],
                 ["功耗", "满载 60–100 W，安静且续航长"]],
          runs: "70B 4bit 可跑；32B FP16 可行；LLM 推理体验优秀",
          note: "如果你的核心需求是「在移动中推理大模型」，这是目前唯一现实的选择。但它不适合训练，也不要期待接近 H100 的吞吐。" },
        { tier: "移动工作站", name: "专业卡 + ISV 认证", price: "¥35,000 – 70,000",
          spec: [["代表机型", "ThinkPad P1 Gen 8、戴尔 Precision 5690、惠普 ZBook Fury G11"],
                 ["GPU", "RTX 2000 / 4000 / 5000 Ada（专业驱动）"],
                 ["显存", "8 – 16 GB，部分支持 ECC"],
                 ["内存", "最高 128 GB，支持 ECC"],
                 ["认证", "ISV 认证，长期驱动支持"]],
          runs: "专业三维 / 仿真 + 中等规模模型推理",
          note: "贵在专业驱动、ECC 与企业级保修。如果只是跑大模型，同价位的 Apple 大内存方案更合适。" },
        { tier: "加固笔记本", name: "工业级移动方案", price: "¥30,000 – 90,000",
          spec: [["代表机型", "松下 Toughbook 40、神基 Getac X600、戴尔 Latitude Rugged"],
                 ["工作温度", "-29 – 63 °C（宽温型号）"],
                 ["防护", "IP53–IP66、1.8 m 跌落、MIL-STD-810H"],
                 ["GPU", "核显或入门独显"],
                 ["供货周期", "5 年以上长期供货"]],
          runs: "现场数据采集、轻量视觉推理，重活回传边缘服务器",
          note: "加固本的算力普遍不强，定位是「在现场能开机、能连上、能把数据传回去」，而不是本地跑大模型。" }
      ]
    }
  };
})();
