/* ==========================================================================
   AI HUB · English content dataset
   --------------------------------------------------------------------------
   ⚠️  Demo data for layout and interaction demonstration.
   Dates, figures and links are illustrative; always defer to official sources.

   Mirrors the exact field structure of data.zh.js.
   To add another language, copy this file, translate the arrays, and point the
   matching HTML pages at it — no changes to app.js are required.
   ========================================================================== */

window.AI_DATA = (function () {
  "use strict";

  /* ---------------------------- Site meta ---------------------------- */
  const meta = {
    name: "AI HUB",
    nameZh: "Intelligence",
    slogan: "One place for AI news, models, tools and knowledge",
    updated: "2026-09-19",
    version: "1.2.0",
    lang: "en",
    acceptLangs: ["en"],
    notice:
      "AI HUB is a static information-aggregation site. It contains demo data and is provided for reference and learning only; product pricing, parameters and policies are subject to official announcements.",
    feedEndpoint: ""
  };

  /* ---------------------------- Stats ---------------------------- */
  const stats = [
    { num: "30+", label: "News items" },
    { num: "24", label: "Model profiles" },
    { num: "46", label: "AI tools" },
    { num: "82", label: "Glossary terms" },
    { num: "18", label: "Landmark papers" },
    { num: "6", label: "Learning stages" }
  ];

  /* ---------------------------- News categories ---------------------------- */
  const categories = [
    { id: "all",     name: "All",        color: "#4f46e5", icon: "◎" },
    { id: "model",   name: "Releases",   color: "#4f46e5", icon: "◆" },
    { id: "industry",name: "Industry",   color: "#06b6d4", icon: "▲" },
    { id: "research",name: "Research",   color: "#8b5cf6", icon: "✦" },
    { id: "policy",  name: "Policy",     color: "#f79009", icon: "§" },
    { id: "funding", name: "Funding",    color: "#12b76a", icon: "¥" },
    { id: "apply",   name: "Adoption",   color: "#ec4899", icon: "⬢" },
    { id: "chip",    name: "Compute",    color: "#f04438", icon: "▣" },
    { id: "opensrc", name: "Open source",color: "#0ea5e9", icon: "⬡" }
  ];

  const catName = (id) => (categories.find((c) => c.id === id) || {}).name || id;

  /* ---------------------------- News ---------------------------- */
  const news = [
    {
      id: "n01", featured: true, cat: "model", date: "2026-09-18", source: "Official release",
      title: "A wave of new flagship models lands, with long context and native multimodality as table stakes",
      summary:
        "Several leading labs refreshed their flagship models this quarter, pushing context windows into the million-token range and folding image, audio and video into a single transformer backbone. Inference cost dropped by a meaningful order of magnitude, which is what finally makes agentic products practical.",
      tags: ["LLM", "Multimodal", "Long context"], readTime: 6, hot: 98
    },
    {
      id: "n02", featured: false, cat: "model", date: "2026-09-16", source: "Engineering blog",
      title: "Open-weight models close the gap on the closed frontier as MoE becomes the default",
      summary:
        "Mixture-of-experts architectures deliver far better capability per active parameter, and several open series now match closed models on coding, math and tool-use benchmarks. That makes self-hosting viable for teams with data-residency or cost constraints.",
      tags: ["Open weights", "MoE", "Benchmarks"], readTime: 5, hot: 92
    },
    {
      id: "n03", featured: false, cat: "research", date: "2026-09-15", source: "arXiv",
      title: "Test-time compute scaling keeps heating up",
      summary:
        "Spending more sampling and verification compute at inference time produces large gains on hard math and competitive-programming tasks. A recent survey categorises the main routes: self-consistency, process reward models and tree search.",
      tags: ["Reasoning", "Scaling laws", "Papers"], readTime: 8, hot: 88
    },
    {
      id: "n04", featured: false, cat: "chip", date: "2026-09-14", source: "Semiconductor watch",
      title: "Inference accelerators overtake training chips in demand for the first time",
      summary:
        "As large-scale inference services come online, shipments of accelerators tuned for serving are climbing fast. Competition has shifted from peak FLOPS to energy efficiency, memory bandwidth and interconnect throughput.",
      tags: ["Compute", "GPU", "Inference"], readTime: 5, hot: 85
    },
    {
      id: "n05", featured: false, cat: "policy", date: "2026-09-13", source: "Policy bulletin",
      title: "Generative AI rules tighten around content labelling and training-data compliance",
      summary:
        "New requirements ask providers to mark synthetic content both visibly and invisibly, to document the provenance of training data, and to build complaint and minor-protection processes. Products shipping into the EU must also track the AI Act's tiered obligations.",
      tags: ["Compliance", "AI Act", "Labelling"], readTime: 7, hot: 79
    },
    {
      id: "n06", featured: false, cat: "apply", date: "2026-09-12", source: "Industry survey",
      title: "Enterprise agents move from pilot to production, starting with support, engineering and analytics",
      summary:
        "More than 60% of surveyed enterprises have deployed an AI agent in at least one business process. The fastest wins are customer support, coding assistance and reporting. The blockers are still data silos, permissioning and traceability of results.",
      tags: ["Agents", "Enterprise", "ROI"], readTime: 6, hot: 83
    },
    {
      id: "n07", featured: false, cat: "industry", date: "2026-09-11", source: "Tech media",
      title: "AI coding assistants reach mainstream adoption; review and test generation are the new growth areas",
      summary:
        "Most professional developers now use AI assistance daily. The centre of gravity has moved from autocomplete to cross-repository understanding, automated fixes and test generation. Companies are starting to formalise audit processes for AI-authored code.",
      tags: ["Coding", "Developers", "Copilot"], readTime: 4, hot: 81
    },
    {
      id: "n08", featured: false, cat: "opensrc", date: "2026-09-10", source: "Community",
      title: "Open-source inference stacks iterate fast, with quantisation and speculative decoding cutting costs",
      summary:
        "Leading inference engines keep refining paged attention, continuous batching and KV-cache reuse. Combined with 4-bit and 8-bit quantisation and speculative decoding, cost per token has fallen sharply across most workloads.",
      tags: ["Inference", "Quantisation", "vLLM"], readTime: 6, hot: 76
    },
    {
      id: "n09", featured: false, cat: "funding", date: "2026-09-09", source: "Funding wire",
      title: "AI funding concentrates on projects with revenue, not just models",
      summary:
        "This quarter split sharply: AI applications with verifiable revenue and inference infrastructure attracted most of the capital, while expectations for pure model-layer startups cooled. Traditional software vendors kept buying AI capability through acquisition.",
      tags: ["Funding", "Valuation", "M&A"], readTime: 5, hot: 72
    },
    {
      id: "n10", featured: false, cat: "research", date: "2026-09-08", source: "Conference paper",
      title: "Multi-agent research turns to reliability and cost control",
      summary:
        "Early work focused on getting several agents to cooperate. The new wave tackles the resulting error accumulation and token-cost blow-up, proposing role constraints, debate-based verification and dynamic topologies.",
      tags: ["Multi-agent", "Reliability", "Cost"], readTime: 7, hot: 74
    },
    {
      id: "n11", featured: false, cat: "apply", date: "2026-09-07", source: "Healthcare watch",
      title: "Clinical decision support pilots emphasise human-in-the-loop and clear lines of responsibility",
      summary:
        "Hospitals are trialling imaging-assisted diagnosis and automatic note generation. Regulatory and ethics discussion centres on who is liable for a miss, the physician's final authority, and patient consent.",
      tags: ["Healthcare", "Ethics", "Diagnosis"], readTime: 6, hot: 68
    },
    {
      id: "n12", featured: false, cat: "industry", date: "2026-09-06", source: "Education weekly",
      title: "Rules for AI in education set boundaries for homework and exams",
      summary:
        "Some regions now publish guidance encouraging AI for tutoring and lesson prep while restricting it in formal examinations. Universities increasingly require disclosure statements for AI-assisted work.",
      tags: ["Education", "Guidelines", "Integrity"], readTime: 4, hot: 66
    },
    {
      id: "n13", featured: false, cat: "model", date: "2026-09-05", source: "Engineering blog",
      title: "Small language models get a second look as on-device and low-latency demand grows",
      summary:
        "After distillation and quantisation, models in the 1B–10B range run offline on phones, PCs and in vehicles. They are cost-effective for classification, extraction and rewriting, and they keep data on-device, which simplifies compliance.",
      tags: ["Small models", "On-device", "Distillation"], readTime: 5, hot: 77
    },
    {
      id: "n14", featured: false, cat: "policy", date: "2026-09-04", source: "Global watch",
      title: "AI safety frameworks take hold, making red-teaming and model cards routine",
      summary:
        "Frontier developers are being asked to submit safety evaluations covering dangerous-capability tests and mitigations. Buyers are starting to write model cards, eval reports and incident-notification duties into contracts.",
      tags: ["AI safety", "Red teaming", "Model cards"], readTime: 7, hot: 71
    },
    {
      id: "n15", featured: false, cat: "apply", date: "2026-09-03", source: "Manufacturing watch",
      title: "Visual inspection and predictive maintenance are the fastest manufacturing wins",
      summary:
        "Defect detection and vibration or temperature forecasting deliver measurable returns, often paying back within a year. The hard parts are rare defect classes with few samples and model transfer after a line changeover.",
      tags: ["Manufacturing", "Vision QC", "Forecasting"], readTime: 5, hot: 64
    },
    {
      id: "n16", featured: false, cat: "research", date: "2026-09-02", source: "arXiv",
      title: "RAG settles into a retrieve–rerank–verify pattern, with GraphRAG gaining ground",
      summary:
        "To reduce hallucination, retrieval-augmented pipelines increasingly add a reranking stage and a verification step that traces claims back to sources. Knowledge-graph-based GraphRAG is stronger on multi-hop questions and global summarisation.",
      tags: ["RAG", "GraphRAG", "Hallucination"], readTime: 6, hot: 80
    },
    {
      id: "n17", featured: false, cat: "chip", date: "2026-09-01", source: "Supply chain",
      title: "HBM and advanced packaging remain the real bottleneck on AI capacity",
      summary:
        "Accelerator output is limited by high-bandwidth memory supply and CoWoS-class packaging capacity. The supply chain is investing in 2.5D/3D packaging, silicon photonics interconnect and liquid cooling.",
      tags: ["HBM", "Packaging", "Liquid cooling"], readTime: 5, hot: 70
    },
    {
      id: "n18", featured: false, cat: "opensrc", date: "2026-08-31", source: "Community",
      title: "Benchmark suites expand, with finer-grained evaluation for non-English and vertical domains",
      summary:
        "New eval sets cover long-form, legal, medical and financial tasks. The community is calling for disclosure of prompts and scoring scripts, and for guards against data contamination inflating leaderboard scores.",
      tags: ["Evaluation", "Datasets", "Multilingual"], readTime: 4, hot: 62
    },
    {
      id: "n19", featured: false, cat: "industry", date: "2026-08-30", source: "Industry analysis",
      title: "Hybrid seat-plus-usage pricing becomes the norm, and buyers want transparency",
      summary:
        "Most products now combine per-seat subscriptions with token-based metering. Enterprise buyers are asking for granular usage dashboards and hard budget caps to contain unpredictable inference spend.",
      tags: ["Pricing", "Commercial", "FinOps"], readTime: 5, hot: 61
    },
    {
      id: "n20", featured: false, cat: "research", date: "2026-08-29", source: "Technical report",
      title: "World models and embodied AI move from simulation toward real-world generalisation",
      summary:
        "Video-generation world models are being used to build interactive training environments, improving robot generalisation on grasping and assembly. Data collection cost and real-world safety remain the bottlenecks.",
      tags: ["Embodied AI", "World models", "Robotics"], readTime: 8, hot: 75
    },
    {
      id: "n21", featured: false, cat: "apply", date: "2026-08-28", source: "Fintech",
      title: "Financial firms focus on compliance Q&A and research efficiency, mostly self-hosted",
      summary:
        "Banks and brokerages lean toward private deployment for policy Q&A, report summarisation, code generation and fraud detection. Compliance requirements push them toward small local models combined with retrieval.",
      tags: ["Finance", "Private deploy", "Compliance"], readTime: 6, hot: 59
    },
    {
      id: "n22", featured: false, cat: "policy", date: "2026-08-27", source: "Legal watch",
      title: "Copyright disputes over AI output multiply, focusing on originality and data provenance",
      summary:
        "Cases turn on whether training constitutes fair use and whether generated works can be protected by copyright. Practitioners advise keeping complete records of data sources and licences.",
      tags: ["Copyright", "Litigation", "Training data"], readTime: 7, hot: 67
    },
    {
      id: "n23", featured: false, cat: "model", date: "2026-08-26", source: "Engineering blog",
      title: "Tool-calling standards such as MCP push the ecosystem toward interoperability",
      summary:
        "A common protocol for connecting models to tools and data sources lets one connector be reused across clients and models, sharply cutting agent integration cost. Major vendors and open-source clients have started shipping support.",
      tags: ["MCP", "Tool use", "Protocols"], readTime: 5, hot: 84
    },
    {
      id: "n24", featured: false, cat: "research", date: "2026-08-25", source: "arXiv",
      title: "Interpretability advances as sparse autoencoders map internal features",
      summary:
        "Sparse autoencoders extract interpretable features from superposed neuron activations, letting researchers locate and steer specific behaviours. It is becoming a practical tool for safety and alignment work.",
      tags: ["Interpretability", "SAE", "Alignment"], readTime: 8, hot: 69
    },
    {
      id: "n25", featured: false, cat: "industry", date: "2026-08-24", source: "Tech media",
      title: "The battle for the AI entry point intensifies, and citation quality becomes the differentiator",
      summary:
        "Search engines, browsers and standalone AI apps are all competing to be where questions get asked. Users increasingly expect inline citations and freshness, which makes content licensing a competitive lever.",
      tags: ["AI search", "Distribution", "Citations"], readTime: 5, hot: 73
    },
    {
      id: "n26", featured: false, cat: "chip", date: "2026-08-23", source: "Datacenter",
      title: "Power and cooling become hard constraints as rack density climbs",
      summary:
        "Air cooling can no longer keep up with per-rack power density, accelerating adoption of cold-plate and immersion liquid cooling. Site selection now weighs electricity price, grid capacity and water availability.",
      tags: ["Datacenters", "Cooling", "Energy"], readTime: 6, hot: 65
    },
    {
      id: "n27", featured: false, cat: "apply", date: "2026-08-22", source: "Media industry",
      title: "Human–AI collaboration becomes routine in content teams",
      summary:
        "Newsrooms and marketing teams use AI for research, first drafts and localisation, while humans own fact-checking and point of view. Platforms increasingly require disclosure of how much AI was involved.",
      tags: ["Content", "Collaboration", "Disclosure"], readTime: 4, hot: 58
    },
    {
      id: "n28", featured: false, cat: "opensrc", date: "2026-08-21", source: "Community",
      title: "Local AI toolchains mature into one-click, offline knowledge bases",
      summary:
        "Self-hosted bundles now combine model download, quantisation, vector storage and a chat front end, so a private knowledge-base assistant can be running in minutes with no data leaving the machine.",
      tags: ["Self-hosting", "Knowledge base", "Ollama"], readTime: 5, hot: 66
    },
    {
      id: "n29", featured: false, cat: "funding", date: "2026-08-20", source: "Funding wire",
      title: "AI safety and evaluation attract investment as third-party audits gain weight",
      summary:
        "Rising compliance requirements brought fresh funding to model evaluation, red-teaming services and governance platforms. Enterprise procurement increasingly asks for independent evaluation reports as an entry requirement.",
      tags: ["AI governance", "Evaluation", "Red teaming"], readTime: 4, hot: 55
    },
    {
      id: "n30", featured: false, cat: "research", date: "2026-08-19", source: "Technical report",
      title: "Long context is not long memory — memory mechanisms remain an open problem",
      summary:
        "Beyond needle-in-a-haystack retrieval, very long contexts still degrade on complex reasoning. Teams combine parametric memory, external vector stores and structured notes to hold consistency over long horizons.",
      tags: ["Long context", "Memory", "Retrieval"], readTime: 7, hot: 63
    }
  ];

  /* ---------------------------- Models ---------------------------- */
  const models = [
    {
      name: "GPT-5 family", org: "OpenAI", region: "United States", released: "2025",
      license: "closed", params: "Undisclosed", ctx: "400K+ tokens", modality: ["Text", "Image", "Audio", "Code"],
      price: "$1.25–10 / M tokens", strength: ["General reasoning", "Tool use", "Multimodal understanding"],
      desc: "Flagship general-purpose family for chat and agent workloads, offered in several sizes and reasoning tiers with function calling and structured output.",
      score: 96,
      docs: "https://platform.openai.com/docs/models"
    },
    {
      name: "Claude family", org: "Anthropic", region: "United States", released: "2025",
      license: "closed", params: "Undisclosed", ctx: "200K–1M tokens", modality: ["Text", "Image", "Code"],
      price: "$3–15 / M tokens", strength: ["Long documents", "Coding", "Safety alignment"],
      desc: "Strong on long-context document work, instruction following and code; widely used for analysis, coding assistance and enterprise knowledge Q&A.",
      score: 94,
      docs: "https://docs.anthropic.com/en/docs/about-claude/models"
    },
    {
      name: "Gemini family", org: "Google DeepMind", region: "United States", released: "2025",
      license: "closed", params: "Undisclosed", ctx: "1M+ tokens", modality: ["Text", "Image", "Audio", "Video", "Code"],
      price: "$0.3–10 / M tokens", strength: ["Native multimodality", "Very long context", "Video understanding"],
      desc: "Natively multimodal architecture spanning on-device Nano up to flagship Pro and Ultra, with a clear edge on very long video and document inputs.",
      score: 93,
      docs: "https://ai.google.dev/gemini-api/docs/models"
    },
    {
      name: "Llama family", org: "Meta", region: "United States", released: "2024–2025",
      license: "open", params: "1B–400B+", ctx: "128K+ tokens", modality: ["Text", "Image", "Code"],
      price: "Self-hosted / metered", strength: ["Open ecosystem", "Fine-tuning friendly", "Tooling"],
      desc: "One of the most influential open-weight families, with an enormous number of fine-tunes and derivatives, making it a common base for private deployments and research.",
      score: 89,
      docs: "https://www.llama.com/"
    },
    {
      name: "DeepSeek-V3 / R1", org: "DeepSeek", region: "China", released: "2025",
      license: "open", params: "671B (MoE, 37B active)", ctx: "128K tokens", modality: ["Text", "Code"],
      price: "Very low (metered API)", strength: ["Reasoning", "Price-performance", "Open weights"],
      desc: "MoE architecture with a reinforcement-learning reasoning recipe, reaching frontier-class results at a fraction of the usual training and inference cost.",
      score: 92,
      docs: "https://api-docs.deepseek.com/"
    },
    {
      name: "Qwen family", org: "Alibaba Cloud", region: "China", released: "2024–2025",
      license: "open", params: "0.5B–235B (MoE)", ctx: "130K–1M tokens", modality: ["Text", "Image", "Audio", "Code"],
      price: "Open weights / metered", strength: ["Multilingual", "Full size range", "Multimodal breadth"],
      desc: "A complete open family from tiny to flagship, with strong multilingual and coding performance; a frequent base for enterprise self-hosting.",
      score: 90,
      docs: "https://qwenlm.github.io/"
    },
    {
      name: "Kimi family", org: "Moonshot AI", region: "China", released: "2024–2025",
      license: "open", params: "Trillion-scale MoE", ctx: "200K–2M tokens", modality: ["Text", "Code"],
      price: "Metered / subscription", strength: ["Very long context", "Writing", "Agents"],
      desc: "Known for long-document handling and strong conversational quality, with open-weight variants that score well on agent and tool-use benchmarks.",
      score: 87,
      docs: "https://platform.moonshot.cn/docs"
    },
    {
      name: "GLM family", org: "Zhipu AI", region: "China", released: "2024–2025",
      license: "open", params: "9B–355B", ctx: "130K+ tokens", modality: ["Text", "Image", "Video", "Code"],
      price: "Open weights / metered", strength: ["Chinese alignment", "Multimodal matrix", "Domestic accelerators"],
      desc: "Covers everything from on-device models to flagships across chat, vision, video generation and code, with good support for non-NVIDIA accelerators.",
      score: 85,
      docs: "https://open.bigmodel.cn/dev/api"
    },
    {
      name: "Mistral family", org: "Mistral AI", region: "France", released: "2024–2025",
      license: "open", params: "7B–123B (MoE)", ctx: "128K tokens", modality: ["Text", "Code"],
      price: "Open weights / metered", strength: ["Efficient small models", "EU compliance", "Function calling"],
      desc: "Known for efficient small models and open weights, holding a steady share of European enterprise and regulated deployments.",
      score: 84,
      docs: "https://docs.mistral.ai/getting-started/models/"
    },
    {
      name: "Grok family", org: "xAI", region: "United States", released: "2024–2025",
      license: "closed", params: "Undisclosed", ctx: "130K–2M tokens", modality: ["Text", "Image", "Code"],
      price: "$3–15 / M tokens", strength: ["Real-time info", "Reasoning", "Social data"],
      desc: "Tightly integrated with a real-time information feed, emphasising freshness and reasoning for subscribers.",
      score: 83,
      docs: "https://docs.x.ai/docs/models"
    },
    {
      name: "ERNIE family", org: "Baidu", region: "China", released: "2023–2025",
      license: "closed", params: "Undisclosed", ctx: "128K+ tokens", modality: ["Text", "Image", "Video", "Code"],
      price: "Free tier + metered", strength: ["Chinese knowledge", "Search grounding", "Ecosystem"],
      desc: "Integrated with search, productivity and cloud services, covering generation, code and multimodal capability.",
      score: 82,
      docs: "https://cloud.baidu.com/doc/WENXINWORKSHOP/index.html"
    },
    {
      name: "Spark / Skywork", org: "iFlytek / Kunlun", region: "China", released: "2023–2025",
      license: "closed", params: "Undisclosed", ctx: "Tens of thousands of tokens", modality: ["Text", "Image", "Audio"],
      price: "Free tier + metered", strength: ["Speech", "Education", "Public sector"],
      desc: "Strong in voice interaction and vertical deployments, with deep roots in education and public services.",
      score: 76,
      docs: "https://www.xfyun.cn/doc/spark/Web.html"
    },
    {
      name: "Hunyuan family", org: "Tencent", region: "China", released: "2024–2025",
      license: "open", params: "Undisclosed", ctx: "250K+ tokens", modality: ["Text", "Image", "Video", "3D"],
      price: "Open weights / metered", strength: ["Multimodal generation", "Social scenarios", "Open weights"],
      desc: "Spans language, image, video and 3D generation, with some weights released and tight coupling to content platforms.",
      score: 81,
      docs: "https://cloud.tencent.com/document/product/1729"
    },
    {
      name: "Doubao family", org: "ByteDance", region: "China", released: "2024–2025",
      license: "closed", params: "Undisclosed", ctx: "250K+ tokens", modality: ["Text", "Image", "Audio", "Video"],
      price: "Very low / free tier", strength: ["Voice interaction", "Low latency", "Device-cloud"],
      desc: "Known for low cost and a polished voice experience, spanning phones, earbuds, cars and other endpoints.",
      score: 82,
      docs: "https://www.volcengine.com/docs/82379"
    },
    {
      name: "MiniMax family", org: "MiniMax", region: "China", released: "2024–2025",
      license: "open", params: "456B (MoE)", ctx: "1M+ tokens", modality: ["Text", "Audio", "Video", "Code"],
      price: "Open weights / metered", strength: ["Long context", "Speech synthesis", "Video generation"],
      desc: "Large open-weight MoE with differentiated strength in long-form text, speech and video generation.",
      score: 80,
      docs: "https://platform.minimaxi.com/document"
    },
    {
      name: "Step family", org: "StepFun", region: "China", released: "2024–2025",
      license: "open", params: "Hundred-billion-class MoE", ctx: "Hundreds of thousands of tokens", modality: ["Text", "Image", "Audio", "Video"],
      price: "Open weights / metered", strength: ["Multimodal", "On-device models", "Speech"],
      desc: "A broad multimodal line-up alongside strong small models aimed at on-device integration.",
      score: 79,
      docs: "https://platform.stepfun.com/docs"
    },
    {
      name: "Command family", org: "Cohere", region: "Canada", released: "2024–2025",
      license: "open", params: "Undisclosed", ctx: "128K+ tokens", modality: ["Text", "Code"],
      price: "Metered / private deploy", strength: ["Enterprise RAG", "Multilingual", "Private deployment"],
      desc: "Optimised for enterprise retrieval and multilingual use, with an emphasis on private deployment and data isolation.",
      score: 78,
      docs: "https://docs.cohere.com/docs/models"
    },
    {
      name: "Phi family", org: "Microsoft", region: "United States", released: "2024–2025",
      license: "open", params: "3.8B–14B", ctx: "128K tokens", modality: ["Text", "Image", "Code"],
      price: "Open weights (self-host)", strength: ["Small size", "Synthetic data", "Edge"],
      desc: "Notable for small parameter counts trained on high-quality synthetic data, well suited to constrained and edge environments.",
      score: 77,
      docs: "https://huggingface.co/microsoft"
    },
    {
      name: "Gemma family", org: "Google", region: "United States", released: "2024–2025",
      license: "open", params: "2B–27B", ctx: "128K tokens", modality: ["Text", "Image", "Code"],
      price: "Open weights (self-host)", strength: ["Lightweight", "Multiple sizes", "Developer friendly"],
      desc: "Open-weight small models distilled from flagship technology, runnable on a single GPU or even consumer hardware.",
      score: 78,
      docs: "https://ai.google.dev/gemma/docs"
    },
    {
      name: "Yi family", org: "01.AI", region: "China", released: "2023–2025",
      license: "open", params: "6B–34B", ctx: "200K tokens", modality: ["Text", "Image", "Code"],
      price: "Open weights / metered", strength: ["Bilingual", "Long context", "Open weights"],
      desc: "Balanced bilingual open-weight series widely used for long-context and lightweight deployment scenarios.",
      score: 76,
      docs: "https://platform.lingyiwanwu.com/docs"
    },
    {
      name: "Stable Diffusion / FLUX", org: "Stability AI / Black Forest Labs", region: "Europe / US", released: "2022–2025",
      license: "open", params: "0.8B–12B", ctx: "—", modality: ["Image"],
      price: "Open weights (self-host)", strength: ["Text-to-image", "LoRA fine-tuning", "Controllable generation"],
      desc: "The two most common open bases for image generation, with an enormous ecosystem of derivatives and fine-tuning tools.",
      score: 86,
      docs: "https://github.com/Stability-AI/stablediffusion"
    },
    {
      name: "Sora / Veo / Kling and peers", org: "OpenAI / Google / Kuaishou and others", region: "Global", released: "2024–2025",
      license: "closed", params: "Undisclosed", ctx: "—", modality: ["Video", "Image", "Audio"],
      price: "Subscription / metered", strength: ["Text-to-video", "Image-to-video", "Physical consistency"],
      desc: "Video generation improved quickly across duration, resolution, motion consistency and audio-visual sync.",
      score: 84,
      docs: "https://openai.com/sora"
    },
    {
      name: "Whisper / SenseVoice and peers", org: "OpenAI / Alibaba and others", region: "Global", released: "2022–2025",
      license: "open", params: "0.03B–1.5B", ctx: "—", modality: ["Audio"],
      price: "Open weights / metered", strength: ["Speech recognition", "Multilingual", "Low-resource deploy"],
      desc: "Mature open speech models with strong multilingual transcription and real-time capability, suitable for local deployment.",
      score: 83,
      docs: "https://github.com/openai/whisper"
    },
    {
      name: "Embedding / reranker models", org: "Multiple vendors", region: "Global", released: "2023–2025",
      license: "open", params: "0.1B–8B", ctx: "8K–32K", modality: ["Text", "Image"],
      price: "Open weights / metered", strength: ["Vector search", "Reranking", "Multilingual"],
      desc: "The components that make or break a RAG system: mapping content to vectors and reordering candidates by relevance.",
      score: 82,
      docs: "https://huggingface.co/spaces/mteb/leaderboard"
    }
  ];

  /* ---------------------------- Tools ---------------------------- */
  const toolCats = [
    { id: "all", name: "All tools" },
    { id: "chat", name: "Chat assistants" },
    { id: "code", name: "Coding" },
    { id: "image", name: "Image generation" },
    { id: "video", name: "Video & audio" },
    { id: "office", name: "Writing & office" },
    { id: "research", name: "Search & research" },
    { id: "agent", name: "Agents & automation" },
    { id: "dev", name: "Model development" },
    { id: "local", name: "Self-hosting" }
  ];

  const tools = [
    { name: "ChatGPT", cat: "chat", by: "OpenAI", desc: "General-purpose assistant with web browsing, file analysis, image generation and custom GPTs.", tags: ["Free tier", "Multimodal"], price: "Free / subscription", url: "https://chat.openai.com" },
    { name: "Claude", cat: "chat", by: "Anthropic", desc: "Strong on long-document analysis and writing; Artifacts renders code and pages live.", tags: ["Long context", "Writing"], price: "Free / subscription", url: "https://claude.ai" },
    { name: "Gemini", cat: "chat", by: "Google", desc: "Deeply integrated with Google's ecosystem, with very long context and multimodal input.", tags: ["Multimodal", "Ecosystem"], price: "Free / subscription", url: "https://gemini.google.com" },
    { name: "DeepSeek", cat: "chat", by: "DeepSeek", desc: "Reasoning and coding assistant with strong math performance at very low cost.", tags: ["Reasoning", "Low cost"], price: "Free / very low", url: "https://chat.deepseek.com" },
    { name: "Kimi", cat: "chat", by: "Moonshot AI", desc: "Built around long-document reading and web page parsing.", tags: ["Long context", "Documents"], price: "Free", url: "https://kimi.moonshot.cn" },
    { name: "Copilot (Microsoft)", cat: "chat", by: "Microsoft", desc: "Assistant embedded across Windows, Office and Edge with enterprise data grounding.", tags: ["Office", "Enterprise"], price: "Free / subscription", url: "https://copilot.microsoft.com" },
    { name: "GitHub Copilot", cat: "code", by: "GitHub", desc: "In-IDE completion and chat with cross-file context, plus automated code review.", tags: ["IDE", "Completion"], price: "Subscription", url: "https://github.com/features/copilot" },
    { name: "Cursor", cat: "code", by: "Anysphere", desc: "AI-native editor with whole-repo understanding, multi-file edits and an agent mode.", tags: ["Editor", "Agent"], price: "Free / subscription", url: "https://cursor.com" },
    { name: "Claude Code", cat: "code", by: "Anthropic", desc: "Coding agent that runs in the terminal, reading and writing files and executing commands.", tags: ["CLI", "Agent"], price: "Subscription / metered", url: "https://claude.com/product/claude-code" },
    { name: "Windsurf", cat: "code", by: "Windsurf", desc: "Agentic IDE with a generous free tier and multi-file refactoring.", tags: ["Free tier", "IDE"], price: "Free / subscription", url: "https://windsurf.com" },
    { name: "Cline / Roo Code", cat: "code", by: "Open source", desc: "Open-source VS Code agents that can plan, edit files and run terminal commands.", tags: ["Open source", "VS Code"], price: "Free (BYO key)", url: "https://github.com/cline/cline" },
    { name: "Aider", cat: "code", by: "Open source", desc: "Terminal-based pair programmer that commits changes straight into your git repo.", tags: ["CLI", "Git"], price: "Free (BYO key)", url: "https://aider.chat" },
    { name: "Midjourney", cat: "image", by: "Midjourney", desc: "Distinctive artistic style with a mature community and reference system.", tags: ["Artistic", "Text-to-image"], price: "Subscription", url: "https://www.midjourney.com" },
    { name: "Stable Diffusion WebUI", cat: "image", by: "Community", desc: "Local image workbench with LoRA, ControlNet and a large extension ecosystem.", tags: ["Open source", "Local"], price: "Free", url: "https://github.com/AUTOMATIC1111/stable-diffusion-webui" },
    { name: "ComfyUI", cat: "image", by: "Community", desc: "Node-based generation graphs for complex, highly controllable image and video pipelines.", tags: ["Node-based", "Open source"], price: "Free", url: "https://github.com/comfyanonymous/ComfyUI" },
    { name: "Krea / Leonardo", cat: "image", by: "Krea / Leonardo", desc: "Real-time canvas generation and editing with strong style controls.", tags: ["Real-time", "Design"], price: "Free tier / subscription", url: "https://www.krea.ai" },
    { name: "Runway", cat: "video", by: "Runway", desc: "Professional video generation and editing suite covering generation, matting and tracking.", tags: ["Video", "Creative"], price: "Subscription", url: "https://runwayml.com" },
    { name: "ElevenLabs", cat: "video", by: "ElevenLabs", desc: "High-quality speech synthesis and voice cloning across many languages.", tags: ["TTS", "Cloning"], price: "Free tier / subscription", url: "https://elevenlabs.io" },
    { name: "Suno / Udio", cat: "video", by: "Suno / Udio", desc: "Text-to-music generation with control over style, mood and song structure.", tags: ["Music", "Generation"], price: "Free tier / subscription", url: "https://suno.com" },
    { name: "Descript", cat: "video", by: "Descript", desc: "Edit video and podcasts by editing the transcript; includes studio sound and eye contact.", tags: ["Editing", "Podcast"], price: "Free tier / subscription", url: "https://www.descript.com" },
    { name: "Notion AI", cat: "office", by: "Notion", desc: "Writing, summarising, translating and database automation inside your notes.", tags: ["Notes", "Knowledge base"], price: "Subscription", url: "https://www.notion.so/product/ai" },
    { name: "Gamma", cat: "office", by: "Gamma", desc: "Generates presentations, documents and web pages from a prompt, with automatic layout.", tags: ["Slides", "Layout"], price: "Free tier", url: "https://gamma.app" },
    { name: "DeepL", cat: "office", by: "DeepL", desc: "High-quality translation with document support and terminology glossaries.", tags: ["Translation", "Glossary"], price: "Free tier / subscription", url: "https://www.deepl.com" },
    { name: "Grammarly", cat: "office", by: "Grammarly", desc: "Grammar, clarity and tone suggestions in the browser and on desktop.", tags: ["Proofreading", "English"], price: "Free / subscription", url: "https://www.grammarly.com" },
    { name: "Excel Copilot / Sheets AI", cat: "office", by: "Microsoft / Google", desc: "Formula generation, data cleanup and chart building inside spreadsheets.", tags: ["Spreadsheets", "Data"], price: "Subscription", url: "https://www.microsoft.com/microsoft-365/copilot" },
    { name: "Perplexity", cat: "research", by: "Perplexity", desc: "AI search engine that cites its sources, with academic and news focus modes.", tags: ["Search", "Citations"], price: "Free / subscription", url: "https://www.perplexity.ai" },
    { name: "NotebookLM", cat: "research", by: "Google", desc: "Turn your own documents into a grounded knowledge base with summaries and audio overviews.", tags: ["Knowledge base", "Podcast"], price: "Free", url: "https://notebooklm.google.com" },
    { name: "Elicit / Consensus", cat: "research", by: "Elicit / Consensus", desc: "Literature search and review assistants that extract findings and sample sizes.", tags: ["Academic", "Literature"], price: "Free tier", url: "https://elicit.com" },
    { name: "SciSpace", cat: "research", by: "SciSpace", desc: "Paper reader that explains equations and terminology and lets you chat with a PDF.", tags: ["Papers", "PDF"], price: "Free tier", url: "https://typeset.io" },
    { name: "Elicit Systematic Review", cat: "research", by: "Elicit", desc: "Screen and extract data from large literature sets with a documented protocol.", tags: ["Systematic review", "Screening"], price: "Free tier / paid", url: "https://elicit.com" },
    { name: "Dify", cat: "agent", by: "Open source", desc: "Open-source LLM app platform with visual orchestration of RAG and agent flows.", tags: ["Open source", "Low-code"], price: "Free / self-host", url: "https://dify.ai" },
    { name: "Coze", cat: "agent", by: "ByteDance", desc: "No-code bot and workflow builder that publishes to multiple chat platforms.", tags: ["Bots", "Workflow"], price: "Free tier", url: "https://www.coze.com" },
    { name: "n8n / Zapier", cat: "agent", by: "n8n / Zapier", desc: "Automation platforms connecting thousands of apps, with AI nodes in the flow.", tags: ["Automation", "Integrations"], price: "Free tier / subscription", url: "https://n8n.io" },
    { name: "LangFlow / Flowise", cat: "agent", by: "Open source", desc: "Drag-and-drop builders for chaining models, tools and retrievers into apps.", tags: ["Visual", "Open source"], price: "Free", url: "https://www.langflow.org" },
    { name: "LangChain / LlamaIndex", cat: "dev", by: "Open source", desc: "The mainstream frameworks for building LLM apps: chains, tools, RAG and agents.", tags: ["Framework", "Open source"], price: "Free", url: "https://www.langchain.com" },
    { name: "Hugging Face", cat: "dev", by: "Hugging Face", desc: "Hosting for models, datasets and demo apps — the GitHub of machine learning.", tags: ["Model hub", "Community"], price: "Free / subscription", url: "https://huggingface.co" },
    { name: "Weights & Biases", cat: "dev", by: "W&B", desc: "Experiment tracking, hyperparameter sweeps and model versioning with visualisations.", tags: ["Tracking", "Visualisation"], price: "Free tier", url: "https://wandb.ai" },
    { name: "vLLM", cat: "dev", by: "Open source", desc: "High-throughput inference engine; paged attention and continuous batching cut cost per token.", tags: ["Inference", "Throughput"], price: "Free", url: "https://github.com/vllm-project/vllm" },
    { name: "SGLang / TensorRT-LLM", cat: "dev", by: "Open source / NVIDIA", desc: "Serving runtimes optimised for structured generation and NVIDIA hardware respectively.", tags: ["Serving", "Performance"], price: "Free", url: "https://github.com/sgl-project/sglang" },
    { name: "Langfuse", cat: "dev", by: "Open source", desc: "Observability for LLM apps: trace calls, cost, latency and evaluation results.", tags: ["Observability", "Evals"], price: "Free / cloud", url: "https://langfuse.com" },
    { name: "RAGFlow / FastGPT", cat: "dev", by: "Open source", desc: "RAG engines focused on deep document parsing and knowledge-base applications.", tags: ["RAG", "Knowledge base"], price: "Free", url: "https://ragflow.io" },
    { name: "Gradio / Streamlit", cat: "dev", by: "Open source", desc: "Python frameworks for turning a model into an interactive demo in minutes.", tags: ["Demo", "Python"], price: "Free", url: "https://gradio.app" },
    { name: "Ollama", cat: "local", by: "Open source", desc: "Download and run local models with a single command, across macOS, Linux and Windows.", tags: ["Local", "CLI"], price: "Free", url: "https://ollama.com" },
    { name: "LM Studio", cat: "local", by: "LM Studio", desc: "Graphical local model runner with a built-in model catalogue and an OpenAI-compatible API.", tags: ["Local", "GUI"], price: "Free", url: "https://lmstudio.ai" },
    { name: "AnythingLLM", cat: "local", by: "Mintplex", desc: "Local knowledge-base chat over your documents, with multi-model and multi-user support.", tags: ["Knowledge base", "Local"], price: "Free", url: "https://anythingllm.com" },
    { name: "Open WebUI", cat: "local", by: "Open source", desc: "Self-hosted ChatGPT-style front end compatible with many backends and plugins.", tags: ["Self-hosted", "Front end"], price: "Free", url: "https://openwebui.com" },
    { name: "whisper.cpp", cat: "local", by: "Open source", desc: "CPU-friendly speech recognition for batch transcription with no cloud dependency.", tags: ["Speech", "Local"], price: "Free", url: "https://github.com/ggerganov/whisper.cpp" },
    { name: "PaddleOCR / Tesseract", cat: "local", by: "Baidu / Open source", desc: "OCR toolkits; PaddleOCR handles Chinese text and tables particularly well.", tags: ["OCR", "Documents"], price: "Free", url: "https://github.com/PaddlePaddle/PaddleOCR" }
  ];

  /* ---------------------------- Papers ---------------------------- */
  const papers = [
    { title: "Attention Is All You Need", year: 2017, venue: "NeurIPS", authors: "Vaswani et al.", org: "Google", tags: ["Transformer", "Foundational"], desc: "Introduced the Transformer, replacing recurrence with self-attention — the foundation of every modern large model.", stars: 5 },
    { title: "BERT: Pre-training of Deep Bidirectional Transformers", year: 2018, venue: "NAACL", authors: "Devlin et al.", org: "Google", tags: ["Pre-training", "NLP"], desc: "Bidirectional masked language modelling kicked off the pretrain-then-fine-tune era in NLP.", stars: 5 },
    { title: "Language Models are Few-Shot Learners (GPT-3)", year: 2020, venue: "NeurIPS", authors: "Brown et al.", org: "OpenAI", tags: ["Few-shot", "Scaling"], desc: "Showed that scale plus in-context examples can solve new tasks without weight updates, birthing prompt engineering.", stars: 5 },
    { title: "Chain-of-Thought Prompting Elicits Reasoning", year: 2022, venue: "NeurIPS", authors: "Wei et al.", org: "Google", tags: ["Chain-of-thought", "Reasoning"], desc: "Asking a model to write out intermediate steps sharply improves accuracy on multi-step reasoning.", stars: 5 },
    { title: "Training language models to follow instructions with human feedback (InstructGPT)", year: 2022, venue: "NeurIPS", authors: "Ouyang et al.", org: "OpenAI", tags: ["RLHF", "Alignment"], desc: "The systematic three-stage RLHF recipe that defined how chat models are aligned today.", stars: 5 },
    { title: "LoRA: Low-Rank Adaptation of Large Language Models", year: 2022, venue: "ICLR", authors: "Hu et al.", org: "Microsoft", tags: ["Fine-tuning", "Efficiency"], desc: "Freeze the base model and train low-rank matrices instead — fine-tuning cost dropped by orders of magnitude.", stars: 5 },
    { title: "Llama 2: Open Foundation and Fine-Tuned Chat Models", year: 2023, venue: "arXiv", authors: "Touvron et al.", org: "Meta", tags: ["Open weights", "Base model"], desc: "A permissively licensed open base that ignited the entire open-weight ecosystem.", stars: 4 },
    { title: "Direct Preference Optimization (DPO)", year: 2023, venue: "NeurIPS", authors: "Rafailov et al.", org: "Stanford", tags: ["Alignment", "Preference"], desc: "A simple loss that optimises preferences directly, removing the explicit reward model and RL loop.", stars: 5 },
    { title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP", year: 2020, venue: "NeurIPS", authors: "Lewis et al.", org: "Meta", tags: ["RAG", "Retrieval"], desc: "Combined parametric memory with non-parametric retrieval, defining the enterprise knowledge-Q&A playbook.", stars: 5 },
    { title: "Denoising Diffusion Probabilistic Models", year: 2020, venue: "NeurIPS", authors: "Ho et al.", org: "UC Berkeley", tags: ["Diffusion", "Generation"], desc: "The foundational diffusion paper and the basis of today's image and video generation models.", stars: 5 },
    { title: "High-Resolution Image Synthesis with Latent Diffusion (Stable Diffusion)", year: 2022, venue: "CVPR", authors: "Rombach et al.", org: "LMU", tags: ["Text-to-image", "Latent space"], desc: "Running diffusion in a latent space brought text-to-image training and inference within reach of consumer hardware.", stars: 5 },
    { title: "DeepSeek-R1: Incentivizing Reasoning Capability via RL", year: 2025, venue: "arXiv", authors: "DeepSeek-AI", org: "DeepSeek", tags: ["Reasoning", "RL", "Open weights"], desc: "Demonstrated that pure reinforcement learning can elicit long chain-of-thought reasoning, and released the weights.", stars: 5 },
    { title: "Scaling Laws for Neural Language Models", year: 2020, venue: "arXiv", authors: "Kaplan et al.", org: "OpenAI", tags: ["Scaling", "Laws"], desc: "Quantified the power-law relationship between loss and parameters, data and compute.", stars: 5 },
    { title: "Training Compute-Optimal Large Language Models (Chinchilla)", year: 2022, venue: "NeurIPS", authors: "Hoffmann et al.", org: "DeepMind", tags: ["Data scaling", "Optimal"], desc: "Showed parameters and data should scale together, correcting the earlier bias toward ever-larger models.", stars: 5 },
    { title: "Mamba: Linear-Time Sequence Modeling with Selective State Spaces", year: 2023, venue: "arXiv", authors: "Gu & Dao", org: "CMU", tags: ["State space", "Long sequence"], desc: "A selective state-space model with linear complexity in sequence length — a serious alternative to attention.", stars: 4 },
    { title: "Sparse Autoencoders Find Highly Interpretable Features", year: 2023, venue: "ICLR", authors: "Cunningham et al.", org: "Multiple", tags: ["Interpretability", "SAE"], desc: "Separates interpretable features out of superposed activations, giving mechanistic interpretability a practical tool.", stars: 4 },
    { title: "Toolformer: Language Models Can Teach Themselves to Use Tools", year: 2023, venue: "NeurIPS", authors: "Schick et al.", org: "Meta", tags: ["Tool use", "Agents"], desc: "Self-supervised learning of when to call an API — an important step toward today's agents.", stars: 4 },
    { title: "ReAct: Synergizing Reasoning and Acting in Language Models", year: 2023, venue: "ICLR", authors: "Yao et al.", org: "Princeton", tags: ["Agents", "Reason-act"], desc: "Alternating reasoning and acting is now the de facto standard agent loop.", stars: 5 }
  ];

  const confs = [
    { name: "NeurIPS", full: "Conference on Neural Information Processing Systems", area: "Machine learning (general)", time: "December", rank: "Top tier", site: "neurips.cc" },
    { name: "ICML", full: "International Conference on Machine Learning", area: "Machine learning", time: "July", rank: "Top tier", site: "icml.cc" },
    { name: "ICLR", full: "International Conference on Learning Representations", area: "Representation learning", time: "April–May", rank: "Top tier", site: "iclr.cc" },
    { name: "CVPR", full: "Conference on Computer Vision and Pattern Recognition", area: "Computer vision", time: "June", rank: "Top tier", site: "cvpr.thecvf.com" },
    { name: "ICCV / ECCV", full: "International / European Conference on Computer Vision", area: "Computer vision", time: "Alternating years", rank: "Top tier", site: "thecvf.com" },
    { name: "ACL", full: "Annual Meeting of the Association for Computational Linguistics", area: "Natural language processing", time: "July", rank: "Top tier", site: "aclanthology.org" },
    { name: "EMNLP", full: "Conference on Empirical Methods in Natural Language Processing", area: "Natural language processing", time: "November", rank: "Strong", site: "aclanthology.org" },
    { name: "AAAI", full: "AAAI Conference on Artificial Intelligence", area: "AI (general)", time: "February", rank: "Top tier", site: "aaai.org" }
  ];

  /* ---------------------------- Learning path ---------------------------- */
  const roadmap = [
    {
      step: 1, title: "Maths and programming foundations", time: "4–8 weeks", level: "Beginner",
      desc: "Everything else builds on this. The goal is fluency with the tools, not memorising proofs.",
      items: ["Python and the core libraries (NumPy, pandas)", "Linear algebra: vectors, matrices, eigenvalues as intuition", "Probability: distributions, Bayes, maximum likelihood", "Calculus: derivatives, gradients, chain rule"],
      link: "https://www.coursera.org/learn/machine-learning"
    },
    {
      step: 2, title: "Machine learning and deep learning", time: "6–10 weeks", level: "Beginner",
      desc: "Learn the classic models and the neural-network training loop, then ship one end-to-end model yourself.",
      items: ["Supervised and unsupervised learning, overfitting and regularisation", "Backpropagation and optimisers (SGD, Adam)", "CNNs, RNNs and attention", "PyTorch in practice: training, validation, tuning"],
      link: "https://www.deeplearning.ai"
    },
    {
      step: 3, title: "How large models work and how they are trained", time: "8–12 weeks", level: "Intermediate",
      desc: "Understand the internals of a Transformer and the full path from pretraining to alignment.",
      items: ["Transformer architecture and positional encoding", "Tokenisers and vocabulary design", "Pretraining objectives, data cleaning and mixing", "SFT, RLHF and DPO alignment pipelines", "Distributed training: data, tensor and pipeline parallelism, ZeRO"],
      link: "https://github.com/karpathy/nanoGPT"
    },
    {
      step: 4, title: "Application development: RAG and agents", time: "4–8 weeks", level: "Intermediate",
      desc: "Turning a model into a shippable product is where most of today's hiring demand sits.",
      items: ["Prompt engineering and structured output", "Vector stores and retrieval-augmented generation", "Function calling and MCP tool integration", "Multi-turn agent loops and error recovery", "Evaluation and observability: cost, latency, accuracy"],
      link: "https://python.langchain.com/docs/tutorials/"
    },
    {
      step: 5, title: "Serving and production engineering", time: "4–8 weeks", level: "Advanced",
      desc: "Take a demo to production traffic while keeping cost and latency under control.",
      items: ["Serving engines: vLLM, TensorRT-LLM", "Quantisation, distillation and speculative decoding", "Caching strategies and batching tuning", "Containers, autoscaling, monitoring and alerting"],
      link: "https://docs.vllm.ai"
    },
    {
      step: 6, title: "Going deep on one frontier", time: "Ongoing", level: "Advanced",
      desc: "Pick a direction and go deep enough to be genuinely hard to replace.",
      items: ["Multimodality, video and world models", "Embodied AI and robotics", "AI safety, alignment and interpretability", "AI chips and system co-design", "Vertical applications (health, finance, industry)"],
      link: "https://arxiv.org/list/cs.AI/recent"
    }
  ];

  const courses = [
    { name: "Machine Learning (Andrew Ng)", by: "Coursera / Stanford", level: "Beginner", lang: "Subtitles", desc: "The classic introduction — clear explanations and a good way to build the overall picture from zero.", free: true },
    { name: "Deep Learning Specialisation", by: "DeepLearning.AI", level: "Beginner–intermediate", lang: "Subtitles", desc: "Five courses covering neural networks, tuning, structuring ML projects and sequence models.", free: false },
    { name: "CS231n: Visual Recognition", by: "Stanford", level: "Intermediate", lang: "English", desc: "The classic computer vision course, with demanding assignments on CNNs, detection and segmentation.", free: true },
    { name: "CS224n: NLP with Deep Learning", by: "Stanford", level: "Intermediate", lang: "English", desc: "A systematic NLP-with-deep-learning course including Transformers and pretraining.", free: true },
    { name: "CS336: Language Modeling from Scratch", by: "Stanford", level: "Advanced", lang: "English", desc: "Build a full LLM yourself: data, tokenisation, attention, training and distributed scaling.", free: true },
    { name: "Dive into Deep Learning (D2L)", by: "Mu Li et al.", level: "Beginner–intermediate", lang: "English / Chinese", desc: "Code and theory side by side, with videos and runnable notebooks.", free: true },
    { name: "Hugging Face Courses", by: "Hugging Face", level: "Beginner–intermediate", lang: "English", desc: "Three hands-on tracks: NLP, diffusion models and agents. You run the code as you go.", free: true },
    { name: "ChatGPT Prompt Engineering for Developers", by: "DeepLearning.AI", level: "Beginner", lang: "English", desc: "A short, practical course on iterative prompt design and common anti-patterns.", free: true }
  ];

  const books = [
    { name: "Dive into Deep Learning", by: "Mu Li, Aston Zhang et al.", level: "Beginner", desc: "Theory and runnable code in one place; excellent as a first practical textbook." },
    { name: "Deep Learning (the \"flower book\")", by: "Goodfellow, Bengio, Courville", level: "Intermediate", desc: "The authoritative reference for deep learning theory and a solid framework to hang knowledge on." },
    { name: "Pattern Recognition and Machine Learning", by: "Christopher Bishop", level: "Intermediate", desc: "A rigorous probabilistic treatment of machine learning; still the standard reference." },
    { name: "The Elements of Statistical Learning", by: "Hastie, Tibshirani, Friedman", level: "Intermediate", desc: "Classical statistical learning in depth — a frequent interview and theory refresher." },
    { name: "Speech and Language Processing", by: "Jurafsky & Martin", level: "Intermediate", desc: "Encyclopedic NLP reference, regularly updated with new editions online." },
    { name: "Designing Machine Learning Systems / AI Engineering", by: "Chip Huyen", level: "Intermediate", desc: "Focused on shipping models into production: data pipelines, evaluation, deployment and cost." }
  ];

  const promptTips = [
    { title: "Role + task + constraints + format", desc: "Split a prompt into four parts: who you are, what to do, what limits apply, and what structure the output should take. Structured prompts are far more stable than long prose." },
    { title: "Examples beat explanations", desc: "One to three input/output examples get the model to imitate your format and granularity more reliably than any amount of description." },
    { title: "Make it think before it answers", desc: "For reasoning tasks, ask for analysis first and the conclusion second. This usually beats asking for the answer directly." },
    { title: "Require citations and explicit uncertainty", desc: "In RAG, ask for answers grounded only in the supplied material, with source ids and an explicit \"not stated\" when the material is insufficient. This cuts hallucination sharply." },
    { title: "Force structured output", desc: "Request JSON or a table with a stated schema. Downstream code can parse it, and the model itself stays on track." },
    { title: "Decompose, then parallelise", desc: "Split a complex job into independent subtasks and call the model once per subtask. It is more reliable and much easier to debug." },
    { title: "Iterate instead of one-shotting", desc: "Watch the failures, add a constraint or an example, test again. Prompt engineering is a fast experiment loop, not a single attempt." },
    { title: "Be economical with context", desc: "Irrelevant context dilutes attention and inflates cost. Trim history, summarise, and retrieve only the relevant chunks." }
  ];

  /* ---------------------------- Glossary ---------------------------- */
  /* t = English term, en = Chinese equivalent (shown on a second line for cross-reference) */
  const glossary = [
    { t: "Artificial Intelligence", en: "人工智能", c: "Basics", d: "The umbrella term for techniques that let machines perceive, reason, learn, decide and generate in ways that look intelligent." },
    { t: "Machine Learning", en: "机器学习", c: "Basics", d: "Learning patterns from data instead of hand-coding rules — the dominant approach in modern AI." },
    { t: "Deep Learning", en: "深度学习", c: "Basics", d: "Machine learning with multi-layer neural networks that learn hierarchical features automatically." },
    { t: "Neural Network", en: "神经网络", c: "Basics", d: "A model made of many learned weighted connections, trained by backpropagation." },
    { t: "Parameters", en: "参数", c: "Basics", d: "The learned numbers inside a model (weights and biases). Parameter count is a rough proxy for scale." },
    { t: "Training vs Inference", en: "训练 / 推理", c: "Basics", d: "Training adjusts parameters and is compute-heavy; inference uses the trained model and is cost- and latency-sensitive." },

    { t: "Transformer", en: "Transformer", c: "Architecture", d: "The self-attention-based sequence architecture underlying essentially all current large language models." },
    { t: "Self-Attention", en: "自注意力", c: "Architecture", d: "Each position in a sequence weights every other position by relevance, capturing long-range dependencies." },
    { t: "Multi-Head Attention", en: "多头注意力", c: "Architecture", d: "Several attention operations run in parallel, each capturing a different kind of relationship." },
    { t: "Positional Encoding", en: "位置编码", c: "Architecture", d: "Injects order information into attention; variants include absolute encodings and rotary (RoPE) embeddings." },
    { t: "Feed-Forward Network", en: "前馈网络 FFN", c: "Architecture", d: "The per-position fully connected sublayer in each Transformer block, usually holding most of the parameters." },
    { t: "Layer Normalisation", en: "层归一化", c: "Architecture", d: "Normalises features per sample to stabilise deep training; RMSNorm is a common modern variant." },
    { t: "Residual Connection", en: "残差连接", c: "Architecture", d: "Adds a sublayer's input to its output, easing gradient flow and making very deep networks trainable." },
    { t: "Encoder / Decoder", en: "编码器 / 解码器", c: "Architecture", d: "Encoders compress input into a representation; decoders generate output from it. Modern LLMs are decoder-only." },
    { t: "Mixture of Experts (MoE)", en: "混合专家", c: "Architecture", d: "Each layer holds many expert networks and a router activates only a few, giving large capacity at low active compute." },
    { t: "State Space Model (SSM)", en: "状态空间模型", c: "Architecture", d: "A linear-complexity alternative for long sequences, as in Mamba, with memory growing linearly with length." },

    { t: "Large Language Model (LLM)", en: "大语言模型", c: "Models", d: "A large neural network pretrained on massive text corpora with broad language understanding and generation ability." },
    { t: "Foundation Model", en: "基座模型", c: "Models", d: "A general model trained on broad data that can be adapted to many downstream tasks." },
    { t: "Multimodal Model", en: "多模态模型", c: "Models", d: "A model that handles text, images, audio and video as inputs and/or outputs." },
    { t: "Small Language Model (SLM)", en: "小模型", c: "Models", d: "A compact model (typically 1B–10B parameters) suited to on-device, low-latency and low-cost use." },
    { t: "Open Weights", en: "开放权重", c: "Models", d: "Model weights you can download and redistribute, subject to the licence's commercial and derivative terms." },
    { t: "Closed API", en: "闭源 API", c: "Models", d: "A model available only through a vendor's API, with no access to the weights." },

    { t: "Pre-training", en: "预训练", c: "Training", d: "Self-supervised training on a very large unlabelled corpus to acquire general language and world knowledge." },
    { t: "Self-Supervised Learning", en: "自监督学习", c: "Training", d: "Building supervision signals from the data itself, such as predicting the next word or restoring masked spans." },
    { t: "Next-Token Prediction", en: "下一个词预测", c: "Training", d: "The core objective of autoregressive language models: predict the probability distribution over the next token." },
    { t: "Fine-tuning", en: "微调", c: "Training", d: "Continuing training on domain data to adapt a pretrained model to a specific task or style." },
    { t: "Instruction Tuning (SFT)", en: "指令微调", c: "Training", d: "Training on instruction–response pairs so the model learns to follow directions." },
    { t: "RLHF", en: "基于人类反馈的强化学习", c: "Training", d: "Train a reward model from human preferences, then optimise the policy against it with reinforcement learning." },
    { t: "Direct Preference Optimization (DPO)", en: "直接偏好优化", c: "Training", d: "Optimises directly on preference data without an explicit reward model or RL loop." },
    { t: "Knowledge Distillation", en: "知识蒸馏", c: "Training", d: "A small student model imitates a large teacher's output distribution to compress size while retaining ability." },
    { t: "LoRA", en: "低秩适配", c: "Training", d: "Freeze the base model and train low-rank update matrices — cheap fine-tuning with easy task switching." },
    { t: "Quantisation", en: "量化", c: "Training", d: "Representing weights or activations at lower precision (INT8/INT4) to cut memory and compute, with slight accuracy loss." },
    { t: "Catastrophic Forgetting", en: "灾难性遗忘", c: "Training", d: "Losing previously learned ability after training on new data; mitigated by mixing in general data." },
    { t: "Overfitting", en: "过拟合", c: "Training", d: "Memorising training detail at the cost of generalisation; countered with regularisation, augmentation and early stopping." },

    { t: "Context Window", en: "上下文窗口", c: "Inference", d: "The maximum number of tokens a model can handle in a single call, input and output combined." },
    { t: "Token", en: "标记 / Token", c: "Inference", d: "The atomic unit of text a model processes. Segmentation differs by language and drives billing and length limits." },
    { t: "Tokenizer", en: "分词器", c: "Inference", d: "Splits text into tokens and maps them to ids; common algorithms are BPE, WordPiece and SentencePiece." },
    { t: "Temperature", en: "温度参数", c: "Inference", d: "Controls randomness: lower is more deterministic, higher is more diverse and creative." },
    { t: "Top-p / Top-k", en: "核采样 / Top-k", c: "Inference", d: "Truncates the probability distribution before sampling to bound output diversity." },
    { t: "KV Cache", en: "KV 缓存", c: "Inference", d: "Caches previously computed attention keys and values so autoregressive generation need not recompute them." },
    { t: "Speculative Decoding", en: "投机解码", c: "Inference", d: "A small model drafts several tokens and the large model verifies them in one pass, raising throughput." },
    { t: "Continuous Batching", en: "连续批处理", c: "Inference", d: "Groups requests into shared compute and lets new requests join mid-flight, improving GPU utilisation." },
    { t: "Time to First Token (TTFT)", en: "首 Token 延迟", c: "Inference", d: "The delay between sending a request and receiving the first token — the key metric for interactive feel." },

    { t: "Hallucination", en: "幻觉", c: "Problems", d: "Fluent but factually wrong output, rooted in probabilistic generation and fuzzy knowledge boundaries." },
    { t: "Alignment", en: "对齐", c: "Problems", d: "Making model behaviour match human values and intent: helpfulness, honesty and harmlessness." },
    { t: "Jailbreak", en: "越狱", c: "Problems", d: "Crafted prompts that bypass a model's safety guardrails — a primary target of red-team testing." },
    { t: "Prompt Injection", en: "提示注入", c: "Problems", d: "Malicious instructions hidden in retrieved content that steer an agent into unintended actions." },
    { t: "Data Contamination", en: "数据污染", c: "Problems", d: "Evaluation items leaking into training data, inflating benchmark scores without real generalisation." },
    { t: "Bias", en: "偏见", c: "Problems", d: "Social biases reflected from training data, addressed through data governance and evaluation." },
    { t: "Interpretability", en: "可解释性", c: "Problems", d: "Understanding why a model produced an output, via feature visualisation or mechanistic analysis." },
    { t: "Sparse Autoencoder (SAE)", en: "稀疏自编码器", c: "Problems", d: "A dictionary-learning method that extracts sparse, interpretable features from activations for mechanistic analysis." },

    { t: "Prompt", en: "提示词", c: "Applications", d: "The instruction and context you send to a model; how you write it directly shapes the output." },
    { t: "Chain-of-Thought (CoT)", en: "思维链", c: "Applications", d: "Having the model write out intermediate steps, which improves accuracy on complex tasks." },
    { t: "Few-Shot Learning", en: "少样本学习", c: "Applications", d: "Showing a handful of examples in the prompt so the model can perform a task without weight updates." },
    { t: "Retrieval-Augmented Generation (RAG)", en: "检索增强生成", c: "Applications", d: "Retrieve external knowledge first and ground the answer in it, cutting hallucination and enabling fresh knowledge." },
    { t: "Vector Database", en: "向量数据库", c: "Applications", d: "Stores and searches high-dimensional vectors by similarity; the core store behind RAG." },
    { t: "Embedding", en: "嵌入", c: "Applications", d: "A dense vector representation of text, images or audio that places semantically similar items close together." },
    { t: "Reranking", en: "重排序", c: "Applications", d: "Rescoring initial retrieval results with a cross-encoder to improve relevance ordering." },
    { t: "GraphRAG", en: "图谱增强检索", c: "Applications", d: "Organises documents as a knowledge graph of entities and relations, improving multi-hop and global questions." },
    { t: "AI Agent", en: "AI 智能体", c: "Applications", d: "A model-driven system that plans, calls tools, observes results and iterates until a goal is met." },
    { t: "Function Calling", en: "工具调用", c: "Applications", d: "A model requests an external function or API in a defined format and uses the result to continue." },
    { t: "Model Context Protocol (MCP)", en: "模型上下文协议", c: "Applications", d: "An open protocol standardising how models connect to external tools and data sources." },
    { t: "Multi-Agent", en: "多智能体", c: "Applications", d: "Several agents cooperating or debating to finish a task; watch for error accumulation and token cost." },
    { t: "Workflow Orchestration", en: "工作流编排", c: "Applications", d: "Chaining model calls, branches and tool runs into a visual, controllable and observable flow." },
    { t: "MCP Client", en: "MCP 客户端", c: "Applications", d: "The host program that runs the agent loop and connects to one or more MCP servers." },

    { t: "Scaling Law", en: "缩放定律", c: "Theory", d: "Power-law relationships between loss and model size, data and compute; used to allocate resources." },
    { t: "Test-Time Compute Scaling", en: "推理时计算扩展", c: "Theory", d: "Spending more sampling and search compute at inference to raise accuracy instead of enlarging the model." },
    { t: "Emergent Abilities", en: "涌现能力", c: "Theory", d: "New capabilities that appear once a model passes some scale threshold; the measurement is still debated." },
    { t: "In-Context Learning", en: "上下文学习", c: "Theory", d: "Performing a new task purely from examples in the prompt, with no parameter updates." },
    { t: "Continual Learning", en: "持续学习", c: "Theory", d: "Absorbing new knowledge over time without forgetting what the model already knew." },

    { t: "World Model", en: "世界模型", c: "Frontiers", d: "An internal, predictive representation of an environment used for planning and simulation." },
    { t: "Embodied AI", en: "具身智能", c: "Frontiers", d: "Agents that learn by interacting with the physical world, typically robots and manipulators." },
    { t: "Vision-Language-Action (VLA)", en: "视觉-语言-动作模型", c: "Frontiers", d: "A single model mapping perception and language instructions to motor actions." },
    { t: "Diffusion Model", en: "扩散模型", c: "Frontiers", d: "A generative model that denoises step by step; the mainstream approach for images and video." },
    { t: "Flow Matching", en: "流匹配", c: "Frontiers", d: "Learns a continuous transformation from noise to data, training more stably with fewer sampling steps." },
    { t: "CLIP", en: "对比语言-图像预训练", c: "Frontiers", d: "Contrastive image-text pretraining that yields aligned cross-modal representations for retrieval and conditioning." },

    { t: "Federated Learning", en: "联邦学习", c: "Engineering", d: "Distributed training that exchanges model updates instead of raw data, for privacy-sensitive settings." },
    { t: "GPU Cluster", en: "算力集群", c: "Engineering", d: "Accelerators plus high-speed interconnect; networking and storage are often the real bottleneck." },
    { t: "High Bandwidth Memory (HBM)", en: "高带宽内存", c: "Engineering", d: "Memory packaged with the accelerator; capacity and bandwidth largely determine inference throughput." },
    { t: "AI Gateway", en: "AI 网关", c: "Engineering", d: "A middle layer for routing across models and handling rate limits, billing and logging." },
    { t: "Model Card", en: "模型卡", c: "Engineering", d: "A standard document describing a model's intended use, training data, evaluations and limitations." },
    { t: "Red Teaming", en: "红队测试", c: "Engineering", d: "Adversarial probing for safety holes and harmful outputs before and after release." }
  ];

  /* ---------------------------- Timeline ---------------------------- */
  const timeline = [
    { date: "1950", title: "The Turing Test is proposed", desc: "Turing's \"Computing Machinery and Intelligence\" frames the question of whether machines can think." },
    { date: "1956", title: "The Dartmouth workshop", desc: "The term \"artificial intelligence\" is coined and AI becomes a research field in its own right." },
    { date: "1997", title: "Deep Blue beats Kasparov", desc: "Symbolic search plus specialised hardware surpasses the best human at chess." },
    { date: "2012", title: "AlexNet wins ImageNet", desc: "Deep convolutional networks shatter image recognition records and ignite the deep learning wave." },
    { date: "2016", title: "AlphaGo beats Lee Sedol", desc: "Deep reinforcement learning plus Monte Carlo tree search shows superhuman intuition in a game of judgement." },
    { date: "2017", title: "The Transformer is published", desc: "Self-attention arrives and becomes the foundation of every subsequent large language model." },
    { date: "2020", title: "GPT-3 and scaling laws", desc: "Few-shot learning and loss-versus-scale relationships validate the large-model path." },
    { date: "2022", title: "ChatGPT and the diffusion explosion", desc: "Conversational AI reaches a mass audience while Stable Diffusion puts text-to-image in everyone's hands." },
    { date: "2023", title: "Open weights and the multimodal race", desc: "Open-weight models proliferate and labs race to ship multimodal and long-context capability." },
    { date: "2024", title: "Agents and reasoning models", desc: "Tool calling, multi-agent systems and test-time compute scaling become the main threads." },
    { date: "2025", title: "Cheaper training routes proven out", desc: "MoE and reinforcement-learning reasoning recipes reach frontier quality at far lower cost." },
    { date: "2026", title: "From model race to engineering reality", desc: "Competition shifts to reliability, cost per task, governance and measurable business return." }
  ];

  return { meta, stats, categories, catName, news, models, toolCats, tools, papers, confs, roadmap, courses, books, promptTips, glossary, timeline };
})();
