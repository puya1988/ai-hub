/* ==========================================================================
   AI HUB · Hardware recommendation module (English)
   --------------------------------------------------------------------------
   Kept separate from data.en.js because hardware moves fastest and needs its
   own update cadence. This file only attaches window.AI_DATA.hardware.

   ⚠️ Prices are indicative ranges (USD, excl. tax) and drift constantly —
      always check current channel pricing. When you update, bump
      hardware.updated so the page shows the right "data as of" date.
   ========================================================================== */

(function () {
  "use strict";
  if (!window.AI_DATA) {
    console.error("[AI HUB] hardware.en.js requires data.en.js to load first");
    return;
  }

  window.AI_DATA.hardware = {
    updated: "2026-09",
    intro:
      "Sizing hardware for AI is nothing like building a gaming PC. The first constraint is VRAM capacity, not FLOPS; " +
      "the second is environment — the same specification behaves completely differently on a desk, in a rack, or next to a production line. " +
      "This page works along both axes: who is using it, and where.",

    /* ------------------------- Two market grades ------------------------- */
    grades: [
      {
        id: "market", name: "Commercial grade", sub: "Consumer / business", color: "#0ea5e9", icon: "🛒",
        desc: "Built for office work, content creation, R&D and small-scale inference. Fast refresh cycles and the lowest cost per FLOP, but unsuited to sustained 24/7 production or harsh environments.",
        tags: ["Best value", "6–18 month refresh", "0–40 °C", "Fan cooled"]
      },
      {
        id: "industrial", name: "Industrial grade", sub: "Wide-temp / ruggedised", color: "#f59e0b", icon: "🏭",
        desc: "Built for production lines, energy, transport and field deployments. Prioritises wide temperature range, shock resistance, long-term supply and long service life — typically 2–5× the unit price.",
        tags: ["-40–85 °C wide temp", "5–10 year supply", "Shock / EMC rated", "Fanless options"]
      }
    ],

    /* ------------------------- Environment comparison ------------------------- */
    gradeCompare: [
      { item: "Operating temperature", market: "0–40 °C (consumer often 0–35 °C)", industrial: "-40–85 °C (wide-temp SKUs)", key: true },
      { item: "Storage temperature", market: "-20–60 °C", industrial: "-40–90 °C" },
      { item: "Humidity", market: "10–85%, non-condensing", industrial: "5–95%, non-condensing" },
      { item: "Supply longevity", market: "6–18 months, then EOL", industrial: "5–10 year supply commitment", key: true },
      { item: "MTBF", market: "20k–50k hours", industrial: "100k+ hours" },
      { item: "ECC memory", market: "Usually absent, sometimes optional", industrial: "Standard", key: true },
      { item: "Shock / vibration", market: "No stated requirement", industrial: "IEC 60068 / MIL-STD-810 compliant" },
      { item: "EMC immunity", market: "Basic", industrial: "Industrial EMC — survives next to VFDs" },
      { item: "Cooling", market: "Active fans, needs periodic dust removal", industrial: "Fanless or wide-temp fans, minimal moving parts" },
      { item: "Power input", market: "ATX PSU, mains AC", industrial: "9–36 V DC wide input, reverse-polarity and surge protection" },
      { item: "Watchdog", market: "None", industrial: "Hardware watchdog plus remote reset" },
      { item: "Certification", market: "CE / FCC", industrial: "CE / FCC / UL / IECEx / ATEX and more" },
      { item: "Lifecycle", market: "1–3 year replacement, constant software churn", industrial: "Stable for 5–10 years, no forced redesign", key: true },
      { item: "Price multiple", market: "1×", industrial: "2–5×", key: true },
      { item: "Typical form factor", market: "Desktop / tower server", industrial: "IPC / edge box / ruggedised chassis" },
      { item: "Software support", market: "Latest drivers, chase the updates", industrial: "LTS kernels, long maintenance, no chasing" }
    ],

    /* ------------------------- Four user segments ------------------------- */
    segments: [
      {
        id: "personal", name: "Individual / hobbyist", short: "Individual", icon: "🏠", grade: "market",
        audience: "Students, indie developers, AI hobbyists, solo creators",
        scenarios: ["Running 7B–32B quantised models locally", "Personal knowledge base and document Q&A", "Learning to fine-tune small models", "Image and short-video generation"],
        headline: "VRAM before FLOPS — 16 GB is the comfortable starting point",
        builds: [
          {
            tier: "Entry", name: "Good enough", price: "$900 – 1,300",
            spec: [["GPU", "RTX 5060 Ti 16GB / RTX 5070 12GB"],
                   ["CPU", "Ryzen 7 or Core i5 (6–8 cores)"],
                   ["Memory", "32 GB DDR5"],
                   ["Storage", "1 TB NVMe (sequential read ≥ 5 GB/s)"],
                   ["PSU", "650 W Gold"],
                   ["Cooling", "Air is fine — mind the case airflow"]],
            runs: "7B–14B at 4-bit runs smoothly; 14B FP16 is a stretch",
            note: "The 16 GB of VRAM is the whole point at this price. Do not trade it away for a faster 8 GB card."
          },
          {
            tier: "Mainstream", name: "Buy once, properly", price: "$2,000 – 3,200",
            spec: [["GPU", "RTX 5070 Ti 16GB / RTX 5090 32GB"],
                   ["CPU", "Ryzen 9 or Core i7 (12–16 cores)"],
                   ["Memory", "64 GB DDR5"],
                   ["Storage", "2 TB NVMe Gen4"],
                   ["PSU", "850–1000 W Gold"],
                   ["Cooling", "Dual-tower air or 360 mm AIO"]],
            runs: "14B–32B at 4-bit; the 5090 32 GB reaches 32B at 4-bit",
            note: "32 GB is the current consumer ceiling (5090). That is a third more than the 4090 24 GB, with roughly double the bandwidth (1792 vs 1008 GB/s) — a visible jump in inference speed."
          },
          {
            tier: "Advanced", name: "Two cards", price: "$5,000 – 8,000",
            spec: [["GPU", "2 × RTX 5090 32GB (64 GB total)"],
                   ["CPU", "Threadripper or Core i9 (24+ cores)"],
                   ["Memory", "128 GB DDR5"],
                   ["Storage", "4 TB NVMe Gen4 + 8 TB HDD archive"],
                   ["PSU", "1600 W Titanium"],
                   ["Cooling", "Large case; leave a slot between cards"]],
            runs: "70B at 4-bit; full fine-tuning of 32B; 64 GB supports several models in parallel",
            note: "Check the motherboard's PCIe lane allocation first — dropping to x4 noticeably slows multi-GPU training."
          }
        ],
        pitfalls: [
          "Chasing FLOPS instead of VRAM — VRAM decides whether it runs at all; FLOPS only decides how fast",
          "A single 4090 wants 850 W or more; a 750 W unit will trip and reboot at peak draw",
          "Multi-GPU airflow matters more than you expect — blower-style cards stack far better",
          "Cheap ex-mining cards are tempting and risky; prefer warranted retail or authorised channels"
        ]
      },

      {
        id: "studio", name: "Professional / studio", short: "Professional", icon: "🎬", grade: "market",
        audience: "Design studios, content teams, startup R&D, university labs",
        scenarios: ["Serving several models concurrently", "LoRA and domain fine-tuning", "Video generation and batch rendering", "Internal knowledge base and agent platform"],
        headline: "The shift is from “it runs” to “it runs reliably” — redundancy and thermals start to matter",
        builds: [
          {
            tier: "Starting", name: "Single box, two cards", price: "$9,000 – 15,000",
            spec: [["GPU", "2 × RTX 5090 32GB (64 GB) or 1 × RTX PRO 6000 Blackwell 96GB"],
                   ["CPU", "Threadripper / Xeon Silver (24+ cores)"],
                   ["Memory", "256 GB DDR5 ECC"],
                   ["Storage", "4 TB NVMe Gen4 (OS + models) + 16 TB array"],
                   ["PSU", "1600 W Titanium, redundant preferred"],
                   ["Network", "Dual 2.5G / 10G"]],
            runs: "70B 4-bit inference; full fine-tuning of 7B–13B; several models served at once",
            note: "One 48 GB card beats two 24 GB cards for peace of mind: no multi-GPU placement to reason about, and VRAM is easier to actually fill."
          },
          {
            tier: "Standard", name: "Workstation", price: "$25,000 – 45,000",
            spec: [["GPU", "2 × RTX PRO 6000 Blackwell 96GB (192 GB total)"],
                   ["CPU", "Threadripper PRO (32–64 cores)"],
                   ["Memory", "512 GB DDR5 ECC"],
                   ["Storage", "8 TB NVMe Gen4 RAID1 + 32 TB backup"],
                   ["PSU", "2000 W redundant"],
                   ["Cooling", "Rack or tower with isolated airflow"]],
            runs: "70B FP16 inference; full fine-tuning of 32B; batch video generation",
            note: "ECC memory is non-negotiable here — a single flipped bit can ruin a multi-day fine-tuning run."
          },
          {
            tier: "Advanced", name: "Inference server", price: "$55,000 – 110,000",
            spec: [["GPU", "4 × L40S 48GB or 4 × H200 141GB"],
                   ["CPU", "Dual EPYC (64+ cores)"],
                   ["Memory", "1 TB DDR5 ECC"],
                   ["Storage", "NVMe RAID plus distributed storage"],
                   ["PSU", "4-way redundant"],
                   ["Network", "Dual 10G / 25G with RoCE"]],
            runs: "Hundreds of concurrent requests; multiple teams sharing; model serving via vLLM or TGI",
            note: "At this level the bottleneck is usually memory bandwidth and request scheduling, not single-card compute."
          }
        ],
        pitfalls: [
          "Running production traffic on a developer workstation — sustained load shortens GPU life dramatically",
          "Under-sizing system memory: running out during fine-tuning locks the machine up and is harder to diagnose than low VRAM",
          "A single NVMe for everything — models and datasets on one drive fight over IO",
          "Ignoring electricity: four cards at full tilt for a year can cost more than the hardware depreciates"
        ]
      },

      {
        id: "enterprise", name: "Enterprise", short: "Enterprise", icon: "🏢", grade: "market",
        audience: "Mid-to-large enterprises, financial services, public sector private deployments, SaaS providers",
        scenarios: ["24/7 production inference", "Multi-tenant, multi-business-unit sharing", "Data residency and compliance constraints", "High availability and disaster recovery"],
        headline: "You are buying availability, not FLOPS — redundancy and TCO are the real spec",
        builds: [
          {
            tier: "Pilot", name: "Validation node", price: "$20,000 – 45,000",
            spec: [["GPU", "2 × L40S 48GB or 1 × RTX PRO 6000 96GB"],
                   ["CPU", "Dual Xeon Silver / EPYC"],
                   ["Memory", "512 GB DDR5 ECC"],
                   ["Storage", "SSD OS mirror + NVMe cache tier"],
                   ["PSU", "Dual redundant with dual mains feeds"],
                   ["Network", "Dual 10G plus out-of-band management"]],
            runs: "Single-business-unit POC, 20–50 concurrent requests",
            note: "Deploy out-of-band management and redundant power from day one, or you will redo it all before production."
          },
          {
            tier: "Production", name: "Standard production node", price: "$110,000 – 280,000",
            spec: [["GPU", "8 × H100 80GB or 8 × B200 192GB with NVLink"],
                   ["CPU", "Dual EPYC (64–96 cores)"],
                   ["Memory", "1–2 TB DDR5 ECC"],
                   ["Storage", "Enterprise NVMe RAID plus distributed storage"],
                   ["PSU", "N+1 redundant behind dual UPS"],
                   ["Network", "25G / 100G, RoCE v2 or InfiniBand"]],
            runs: "200+ concurrent requests; business-unit isolation; mixed inference and fine-tuning",
            note: "NVLink pays off for training; for pure inference that budget is usually better spent on more VRAM."
          },
          {
            tier: "Cluster", name: "Multi-node cluster", price: "Scales per node",
            spec: [["Nodes", "8-GPU nodes × N, scaled by compute demand"],
                   ["Interconnect", "InfiniBand NDR / RoCE fabric"],
                   ["Storage", "Parallel filesystem (Lustre / GPFS class)"],
                   ["Scheduling", "Kubernetes with a GPU scheduler, or Slurm"],
                   ["Facility", "Rack density ≥ 20 kW — liquid or strong forced-air cooling"],
                   ["Operations", "Monitoring, chargeback, quota management"]],
            runs: "Large-scale mixed training and inference",
            note: "Clusters succeed or fail on operations, not hardware: without quotas and chargeback, capacity gets consumed within weeks."
          }
        ],
        pitfalls: [
          "Budgeting only the purchase price — three-year TCO (power, ops, downtime) usually exceeds the hardware",
          "Forgetting rack power and cooling headroom; discovering it when the pallet arrives",
          "No out-of-band management (IPMI/BMC) or remote reset means a trip to the datacentre for every hang",
          "Skipping tenant isolation, so business units fight over VRAM and cause production jitter",
          "In regulated settings, confirm long-term firmware and driver availability to avoid being cut off"
        ]
      },

      {
        id: "industrial", name: "Industrial / edge", short: "Industrial", icon: "🏭", grade: "industrial",
        audience: "Manufacturing lines, power and energy, mining, rail, remote field sites",
        scenarios: ["In-line visual inspection with multiple live cameras", "Predictive maintenance and vibration analysis", "Unattended underground and field deployment", "Vehicle and mobile platforms"],
        headline: "Environment decides everything: wide temperature, fanless and long supply beat raw compute",
        builds: [
          {
            tier: "Module", name: "Edge inference module", price: "$1,200 – 3,500",
            spec: [["Compute", "Jetson Orin NX 16GB or an equivalent module"],
                   ["CPU", "On-board ARM sharing unified memory"],
                   ["Memory", "16 GB LPDDR5 (unified)"],
                   ["Storage", "Industrial NVMe 256 GB–1 TB (high TBW)"],
                   ["Power", "9–36 V wide input with surge protection"],
                   ["Form factor", "Fanless passive, -25–70 °C"]],
            runs: "7B at 4-bit or dedicated vision models; 10–25 W",
            note: "Unified memory lets you borrow system RAM when VRAM runs short — at the cost of bandwidth."
          },
          {
            tier: "IPC", name: "Wide-temp IPC with one card", price: "$6,000 – 18,000",
            spec: [["Compute", "One blower or passively cooled professional card (L4 / RTX PRO 2000 Blackwell class)"],
                   ["CPU", "Embedded Xeon / Core, low-power SKU"],
                   ["Memory", "64 GB DDR5 ECC"],
                   ["Storage", "Industrial NVMe RAID1 with SLC cache"],
                   ["Power", "Wide DC input with reverse-polarity, surge and isolation"],
                   ["Form factor", "4U rack or wall mount, -20–60 °C, 5 Grms shock"]],
            runs: "Multi-camera real-time inspection; small and mid-size local models",
            note: "Blower-style professional cards suit dense cabinets; a consumer triple-fan card will thermal throttle inside one."
          },
          {
            tier: "Rugged", name: "Ruggedised edge server", price: "$28,000 – 85,000",
            spec: [["Compute", "2–4 wide-temperature professional cards"],
                   ["CPU", "Dual embedded Xeon"],
                   ["Memory", "256–512 GB DDR5 ECC"],
                   ["Storage", "Industrial NVMe RAID plus wide-temp backup"],
                   ["Power", "Dual redundant wide input, boots at -40 °C"],
                   ["Form factor", "Ruggedised chassis, -40–70 °C, MIL-STD-810 shock"]],
            runs: "Edge compute for an entire line or site",
            note: "Cold boot at -40 °C is a hard requirement — ordinary drives and capacitors simply will not start at that temperature."
          }
        ],
        pitfalls: [
          "Do not use consumer SSDs: industrial buyers care about write endurance (TBW/DWPD) and temperature range, not benchmarks",
          "Fans are one of the top failure sources — go fanless where you can, and choose wide-temp long-life fans where you cannot",
          "Confirm long-term supply: line equipment often lives 7–10 years, and a mid-life EOL forces requalification",
          "Wide input range, reverse-polarity and surge protection are not optional — grid instability is normal on site",
          "EMC and grounding: interference from VFDs and large motors causes random reboots unless you shield to industrial spec",
          "Reserve a hardware watchdog and remote reset — nobody is on site to power-cycle a hung box",
          "Design to the temperature inside the cabinet, not the room: cabinets typically run 10–15 °C hotter"
        ]
      }
    ],

    /* ------------------------- VRAM cheat sheet ------------------------- */
    vramNote:
      "Rule of thumb: VRAM ≈ parameters × bytes per parameter + KV cache + activations. FP16 ≈ 2 bytes/param, " +
      "Note that capacity has advanced quickly since 2025 (32 GB consumer, 96 GB single workstation card), " +
      "but bandwidth is the real divide for inference speed (0.9–1.8 TB/s consumer vs 3–8 TB/s on HBM accelerators). " +
      "INT8 ≈ 1.1, INT4 ≈ 0.55. KV cache grows linearly with context length and can exceed the model itself on long contexts.",
    vram: [
            { size: "7B – 8B",   fp16: "16 GB",   int8: "8 – 10 GB", int4: "5 – 6 GB",    market: "RTX 5060 Ti 16GB", prof: "RTX PRO 4000 24GB / L4" },
      { size: "13B – 14B", fp16: "28 GB",   int8: "14 GB",     int4: "8 – 9 GB",    market: "RTX 5070 Ti 16GB", prof: "RTX PRO 5000 48GB" },
      { size: "30B – 34B", fp16: "68 GB",   int8: "34 GB",     int4: "18 – 20 GB",  market: "RTX 5090 32GB (4-bit)", prof: "RTX PRO 6000 96GB" },
      { size: "70B",       fp16: "140 GB",  int8: "70 GB",     int4: "36 – 40 GB",  market: "2 × RTX 5090 64GB (4-bit)", prof: "RTX PRO 6000 96GB" },
      { size: "110B+ / large MoE", fp16: "220 GB+", int8: "110 GB+", int4: "60 GB+", market: "2 × RTX PRO 6000 192GB", prof: "4 × B200 192GB" },
      { size: "400B+ very large MoE", fp16: "880 GB+", int8: "440 GB+", int4: "220 GB+", market: "Not viable", prof: "GB300 NVL72 / 8 × B200" },
      { size: "Full fine-tuning",  fp16: "≈ 16 × params", int8: "—", int4: "—",      market: "Impractical", prof: "Multi-GPU with NVLink" },
      { size: "LoRA fine-tuning",  fp16: "≈ 4 × params",  int8: "—", int4: "—",      market: "7B on a single 32 GB card", prof: "RTX PRO 6000 / H100" }
    ],

    /* ------------------------- Key metrics ------------------------- */
    metrics: [
      { name: "VRAM capacity", role: "Decides whether it runs at all", detail: "Weights, KV cache and activations must all fit. If it does not fit, no amount of tuning saves you." },
      { name: "Memory bandwidth", role: "Decides how fast it runs", detail: "Autoregressive generation is memory-bound; decode speed is almost entirely bandwidth-limited. Double the bandwidth, roughly double the tokens per second." },
      { name: "FLOPS", role: "Decides prefill and training speed", detail: "Matters far less than bandwidth for short chat; matters a lot for long-context prefill, batch training and video generation." },
      { name: "KV cache", role: "The hidden cost of long context", detail: "Grows linearly with context length and concurrency. At 128K context the KV cache can be larger than a 7B model." },
      { name: "System memory", role: "Aim for ≥ 1.5× VRAM", detail: "Fine-tuning and data loading are memory-hungry. Running out locks the whole machine and is harder to diagnose than low VRAM." },
      { name: "Storage IO", role: "Decides model load time", detail: "≥ 5 GB/s sequential read is the comfort line. Loading tens of gigabytes from a spinning disk is genuinely painful." },
      { name: "PSU headroom", role: "Size at 1.5×", detail: "A 4090 peaks near 450 W. Estimate total GPU draw × 1.5 plus 200 W for the rest of the system." },
      { name: "GPU interconnect", role: "Training yes, inference mostly no", detail: "Multi-GPU inference barely needs inter-card traffic; that budget is usually better spent on VRAM." }
    ],

    /* ------------------------- Budget split ------------------------- */
    budget: [
      { segment: "Individual", alloc: [["GPU", 55], ["Platform (CPU + board + RAM)", 30], ["Storage", 10], ["PSU and case", 5]] },
      { segment: "Professional", alloc: [["GPU", 60], ["Platform", 22], ["Storage", 12], ["Power and cooling", 6]] },
      { segment: "Enterprise", alloc: [["Compute units", 65], ["Redundant platform and power", 15], ["Network", 10], ["Storage", 7], ["Ops and software", 3]] },
      { segment: "Industrial", alloc: [["Compute hardware", 45], ["Ruggedisation and certification", 25], ["Spares and long-term service", 20], ["Software adaptation", 10]] }
    ],

    /* ------------------------- Common mistakes ------------------------- */
    mistakes: [
      { title: "Buying FLOPS instead of VRAM", desc: "Two 8 GB cards are less useful than one 16 GB card — when VRAM runs out the model simply will not load, no matter how much compute you have." },
      { title: "Running 24/7 production on consumer hardware", desc: "Consumer cards are designed for gaming peaks, not sustained load. For production use professional cards, or at minimum add redundancy and monitoring." },
      { title: "Ignoring power and thermal headroom", desc: "Transient power spikes trigger protective shutdowns that look like random reboots — the hardest class of fault to diagnose. Always oversize the PSU." },
      { title: "Overlooking PCIe lanes with multiple GPUs", desc: "Filling every slot can drop cards to x4 and halve multi-GPU training speed. Check the lane allocation table before you buy." },
      { title: "Overestimating consumer SSD endurance", desc: "Continuous training logs and datasets burn through TBW quickly. Use high-DWPD enterprise drives in production and industrial settings." },
      { title: "Ignoring three-year TCO", desc: "Electricity, operations and downtime usually exceed the purchase price. Enterprise procurement should compare TCO, not unit cost." },
      { title: "Dropping datacentre kit onto a factory floor", desc: "Hardware that thrives in a rack can die within a week under vibration, dust, wide temperature swings and electrical interference. Never downgrade the environmental rating." }
    ],

    /* ------------------------- Pre-purchase checklist ------------------------- */
    checklist: [
      "What is the largest model you need, and at what quantisation?",
      "How much context do you need? This drives KV cache cost",
      "Inference only, or fine-tuning too? Fine-tuning needs 4–16× the VRAM",
      "What latency is acceptable per request — first-token latency or throughput?",
      "What is peak concurrency? Size for peak, not average",
      "Must data stay on-premises? That determines the private deployment footprint",
      "What are the ambient temperature, dust, vibration and EMI conditions?",
      "What is the expected service life? Do you need a long-term supply guarantee?",
      "Is there enough rack power and cooling headroom? What power density?",
      "Have you modelled three-year TCO including power, ops and downtime?",
      "What is the spares strategy? Are critical parts available off the shelf?",
      "Will firmware and drivers remain obtainable? Could you be cut off?"
    ],

    /* ------------------------- Brands and vendors ------------------------- */
    vendorCats: [
      { id: "all",         name: "All" },
      { id: "chip",        name: "Compute silicon" },
      { id: "oem",         name: "Systems and servers" },
      { id: "workstation", name: "Workstation brands" },
      { id: "laptop",      name: "Laptop brands" },
      { id: "ipc",         name: "Industrial computers" },
      { id: "domestic",    name: "Chinese domestic" },
      { id: "cloud",       name: "Cloud compute" },
      { id: "channel",     name: "Buying channels" }
    ],
    vendorsNote:
      "Before picking a brand, decide three things. First, ecosystem — the migration cost away from CUDA is still the largest hidden line item. " +
      "Second, availability — for export-restricted SKUs, both lead time and price are uncertain. " +
      "Third, support — can you get a response within 24 hours when something breaks? " +
      "The list below is compiled from public information and is neither a recommendation nor an endorsement.",
    vendors: [
      { name: "NVIDIA", region: "United States", cat: "chip", tier: "Ecosystem leader",
        products: "GB300 NVL72, GB200 NVL72, B200 (192GB), H200, Vera Rubin, RTX 50 series, RTX PRO 6000 Blackwell, L40S, Jetson",
        note: "The most mature ecosystem by a wide margin. The Rubin architecture starts shipping in the second half of 2026 (HBM4 on 3 nm), with Rubin Ultra expected in 2027 and Feynman after that. Watch how export controls affect SKUs and lead times.", url: "https://www.nvidia.com" },
      { name: "AMD", region: "United States", cat: "chip", tier: "Value alternative",
        products: "Instinct MI355X / MI350X (288GB HBM3e), MI350P PCIe, MI300X (192GB), Radeon Pro",
        note: "The most generous VRAM per card anywhere (288 GB on the MI350 series, above NVIDIA's equivalent tier). The MI350P is a PCIe version released in May 2026. The ROCm software stack is still catching up — validate compatibility before committing.", url: "https://www.amd.com" },
      { name: "Intel", region: "United States", cat: "chip", tier: "Challenger",
        products: "Gaudi 3 accelerators, Arc Pro inference cards, Xeon platforms",
        note: "Price-competitive for inference and general server work, backed by oneAPI. A natural fit if you already run Intel infrastructure.", url: "https://www.intel.com" },
      { name: "Google", region: "United States", cat: "chip", tier: "In-house TPU",
        products: "TPU v5e / v6e (Trillium)",
        note: "Not sold as hardware — available only through Google Cloud. Excellent value for TensorFlow and JAX workloads.", url: "https://cloud.google.com/tpu" },
      { name: "AWS", region: "United States", cat: "chip", tier: "In-house silicon",
        products: "Trainium 2, Inferentia 2",
        note: "Available only inside AWS. Strong inference economics, but migration requires adapting to the Neuron SDK.", url: "https://aws.amazon.com/machine-learning/trainium/" },

      { name: "Huawei Ascend", region: "China", cat: "domestic", tier: "Domestic leader",
        products: "Ascend 910B / 910C, Atlas 800/300, 310P inference cards",
        note: "The most complete domestic ecosystem (CANN + MindSpore + community). A common choice for domestic-substitution projects.", url: "https://www.hiascend.com" },
      { name: "Cambricon", region: "China", cat: "domestic", tier: "Domestic",
        products: "MLU370 / MLU590, XuanSi accelerator cards",
        note: "Covers both training and inference, with the Neuware software stack alongside.", url: "https://www.cambricon.com" },
      { name: "Hygon", region: "China", cat: "domestic", tier: "Domestic",
        products: "DCU series, Hygon CPUs",
        note: "The DCU line offers a reasonable CUDA compatibility layer, so porting effort is comparatively low. CPU plus DCU gives a fully domestic system.", url: "https://www.hygon.cn" },
      { name: "Moore Threads", region: "China", cat: "domestic", tier: "Domestic",
        products: "MTT S series, KUAE compute clusters",
        note: "Pursues graphics and compute in parallel; the MUSA architecture ships CUDA migration tooling.", url: "https://www.mthreads.com" },
      { name: "Biren", region: "China", cat: "domestic", tier: "Domestic",
        products: "BR100 / BR104 series",
        note: "Focused on high-throughput training cards with the BIRENSUPA software stack.", url: "https://www.birentech.com" },
      { name: "Iluvatar CoreX", region: "China", cat: "domestic", tier: "Domestic",
        products: "Tiangai 150 (training), Zhikai 100 (inference)",
        note: "Separate training and inference lines; already deployed in several domestic compute centres.", url: "https://www.iluvatar.com" },
      { name: "Enflame", region: "China", cat: "domestic", tier: "Domestic",
        products: "Suisi 2.0, Yunsui training and inference cards",
        note: "Tencent-backed, with real deployments in internet-scale workloads.", url: "https://www.enflame-tech.com" },

      { name: "Dell", region: "United States", cat: "oem", tier: "Global tier 1",
        products: "PowerEdge XE9680 / R760xa, Precision workstations",
        note: "The most extensive global service network and a mature spares pipeline — useful for multinational standardisation.", url: "https://www.dell.com" },
      { name: "HPE", region: "United States", cat: "oem", tier: "Global tier 1",
        products: "ProLiant DL380a, Cray supercomputers, Z by HP workstations",
        note: "Deep enterprise and HPC track record; GreenLake offers consumption-based pricing.", url: "https://www.hpe.com" },
      { name: "Lenovo", region: "China", cat: "oem", tier: "Global tier 1",
        products: "ThinkSystem SR675 / SR670, ThinkStation PX",
        note: "Strongest delivery and service coverage in China, and its Neptune liquid cooling has an energy advantage.", url: "https://www.lenovo.com" },
      { name: "Inspur", region: "China", cat: "oem", tier: "Market leader (CN)",
        products: "NF5688 / NF5488 AI servers, Yuanmou platform",
        note: "Leads domestic AI server shipments, works closely with hyperscalers, and is strong at customisation.", url: "https://www.inspur.com" },
      { name: "H3C", region: "China", cat: "oem", tier: "Tier 1 (CN)",
        products: "UniServer R5500 / R5300 series",
        note: "Delivers servers, networking and storage as one stack — common in government and carrier projects.", url: "https://www.h3c.com" },
      { name: "Supermicro", region: "United States", cat: "oem", tier: "High flexibility",
        products: "SYS-821GE, GPU servers and liquid cooling",
        note: "Fast refresh cycles and very flexible configuration; quietly behind many cloud and self-built clusters.", url: "https://www.supermicro.com" },
      { name: "GIGABYTE", region: "Taiwan", cat: "oem", tier: "High flexibility",
        products: "G-series GPU servers, AI workstations",
        note: "Well regarded for small-to-mid deployments and self-built workstations.", url: "https://www.gigabyte.com" },
      { name: "Nettrix", region: "China", cat: "oem", tier: "Custom",
        products: "X640 / X660 AI servers",
        note: "Spun out of the Inspur ecosystem; focused on build-to-order and fast delivery.", url: "https://www.nettrix.com.cn" },
      { name: "Sugon", region: "China", cat: "oem", tier: "HPC",
        products: "XMachine series, Silicon Cube liquid cooling",
        note: "Deep HPC and liquid-cooling experience; common in research and compute-centre projects.", url: "https://www.sugon.com" },

      { name: "Lenovo ThinkStation", region: "China", cat: "workstation", tier: "Workstation",
        products: "PX / PX2 (dual socket), P620 / P720",
        note: "High tower-workstation volume, and the easiest parts and service to source in China.", url: "https://www.lenovo.com" },
      { name: "Dell Precision", region: "United States", cat: "workstation", tier: "Workstation",
        products: "Precision 7960 tower, 7875 rack",
        note: "Mature enterprise procurement processes with clear configuration and warranty options.", url: "https://www.dell.com" },
      { name: "HP Z by HP", region: "United States", cat: "workstation", tier: "Workstation",
        products: "Z8 Fury, Z6 G5, Z G1 rack",
        note: "Z8 Fury takes dual Xeon plus several double-width cards, with well-developed thermal design.", url: "https://www.hp.com" },
      { name: "Apple Mac Studio / Mac Pro", region: "United States", cat: "workstation", tier: "Unified memory",
        products: "Mac Studio (M-series Ultra, up to 512 GB unified memory)",
        note: "The only desktop-class route to 192–512 GB of unified memory, but compute density is lower than a comparable discrete-GPU array.", url: "https://www.apple.com/mac-studio/" },
      { name: "Supermicro / ASUS Pro WS", region: "US / Taiwan", cat: "workstation", tier: "Build your own",
        products: "Pro WS WRX90, motherboard plus chosen GPUs",
        note: "The DIY workstation path: boards supporting 4–7 PCIe 5.0 x16 slots, for multi-GPU builds that need maximum lane count.", url: "https://www.asus.com" },

      { name: "Apple MacBook Pro", region: "United States", cat: "laptop", tier: "Unified memory",
        products: "M4 Pro / M4 Max, up to 128 GB unified memory",
        note: "The only mobile option with 64–128 GB of VRAM-class memory, with excellent battery life and near-silent operation. Not suited to sustained training.", url: "https://www.apple.com/macbook-pro/" },
      { name: "Lenovo ThinkPad / Legion", region: "China", cat: "laptop", tier: "Business and gaming",
        products: "ThinkPad P1 / P16v mobile workstations, Legion Pro 5/7",
        note: "ThinkPad P is the mainstream mobile-workstation pick with a reputation for keyboards and stability; Legion is strong value.", url: "https://www.lenovo.com" },
      { name: "Dell XPS / Precision Mobile", region: "United States", cat: "laptop", tier: "Business and creator",
        products: "XPS 16, Precision 5690 / 7680",
        note: "Precision mobile workstations offer professional GPUs (RTX 2000/5000 Ada) with ISV-certified drivers.", url: "https://www.dell.com" },
      { name: "HP ZBook / OMEN", region: "United States", cat: "laptop", tier: "Business and gaming",
        products: "ZBook Fury G11 / Studio G11, OMEN",
        note: "ZBook Fury is one of the few mobile workstations that can take a large professional GPU.", url: "https://www.hp.com" },
      { name: "ASUS ROG / ProArt", region: "Taiwan", cat: "laptop", tier: "Gaming and creator",
        products: "ROG Strix / Zephyrus, ProArt 16",
        note: "The ProArt line targets creators, with good colour accuracy and sustained power delivery.", url: "https://www.asus.com" },
      { name: "MSI", region: "Taiwan", cat: "laptop", tier: "Gaming and creator",
        products: "Titan GT / Stealth, CreatorPro series",
        note: "Aggressive power tuning; the CreatorPro line supports professional GPUs.", url: "https://www.msi.com" },
      { name: "Huawei MateBook / Xiaomi", region: "China", cat: "laptop", tier: "Thin and light",
        products: "MateBook X Pro, Redmi Book Pro",
        note: "Strong multi-device integration — well suited to cloud-API-centric light workloads.", url: "https://consumer.huawei.com" },

      { name: "Advantech", region: "Taiwan", cat: "ipc", tier: "IPC leader",
        products: "MIC-770 / 733 edge AI computers, ITA series",
        note: "The global industrial-PC leader with the broadest line-up and clear wide-temp and long-supply options.", url: "https://www.advantech.com" },
      { name: "ADLINK", region: "Taiwan", cat: "ipc", tier: "Edge AI",
        products: "DLAP edge servers, MXE rugged compute",
        note: "Focused on edge AI and ruggedised compute, often paired with NVIDIA Jetson modules.", url: "https://www.adlinktech.com" },
      { name: "Kontron", region: "Germany", cat: "ipc", tier: "Industrial",
        products: "KBox series, CPCI/VPX boards",
        note: "Strong participation in European industrial and rail standards, with comprehensive certification.", url: "https://www.kontron.com" },
      { name: "Siemens SIMATIC", region: "Germany", cat: "ipc", tier: "Industrial",
        products: "SIMATIC IPC series, industrial edge gateways",
        note: "Deeply integrated with its own PLC and automation ecosystem — common in line-retrofit projects.", url: "https://www.siemens.com" },
      { name: "EVOC", region: "China", cat: "ipc", tier: "Domestic IPC",
        products: "MEC / IPC series, ruggedised computers",
        note: "A long-established domestic industrial-PC vendor with many energy, power and defence references.", url: "https://www.evoc.cn" },
      { name: "NORCO", region: "China", cat: "ipc", tier: "Domestic IPC",
        products: "Embedded IPCs, wide-temp fanless systems",
        note: "Flexible customisation and short lead times, suitable for small-to-mid batch projects.", url: "https://www.norco.com.cn" },
      { name: "Rockchip", region: "China", cat: "ipc", tier: "Edge modules",
        products: "RK3588 / RK3588S, core boards",
        note: "Outstanding value in domestic edge compute: a 6 TOPS NPU suited to vision and light inference.", url: "https://www.rock-chips.com" },
      { name: "Horizon Robotics", region: "China", cat: "ipc", tier: "Edge modules",
        products: "Journey series, Sunrise",
        note: "A mainstay in automotive and security. The toolchain is specialised, with limited support for general-purpose LLMs.", url: "https://www.horizon.cc" },

      { name: "Panasonic Toughbook", region: "Japan", cat: "ipc", tier: "Rugged laptop",
        products: "Toughbook 40 / 55, FZ series",
        note: "The rugged-laptop benchmark: drop, dust and water resistance plus wide temperature. The default for field and vehicle use.", url: "https://na.panasonic.com/us/computers-tablets/toughbook" },
      { name: "Getac", region: "Taiwan", cat: "ipc", tier: "Rugged laptop",
        products: "X600 / B360, rugged tablets",
        note: "Better value than Toughbook and can take a discrete GPU, making it viable for on-site AI inference.", url: "https://www.getac.com" },
      { name: "Dell Latitude Rugged", region: "United States", cat: "ipc", tier: "Rugged laptop",
        products: "Latitude 5430 Rugged / 7330 Rugged Extreme",
        note: "Easy to buy through existing enterprise IT channels and to fold into current warranty and asset processes.", url: "https://www.dell.com" },

      { name: "Alibaba Cloud", region: "China", cat: "cloud", tier: "Tier 1 (CN)",
        products: "Lingjun compute clusters, PAI platform, GPU instances",
        note: "The most complete domestic offering, from single metered cards to thousand-GPU clusters. Check whether an instance is shared or exclusive.", url: "https://www.aliyun.com" },
      { name: "Tencent / Baidu / Volcano Engine", region: "China", cat: "cloud", tier: "Tier 1 (CN)",
        products: "HAI, Qianfan, Volcano Ark",
        note: "Each leans differently on model serving and inference hosting, and price competition is frequent — compare before committing.", url: "https://cloud.tencent.com" },
      { name: "Huawei Cloud", region: "China", cat: "cloud", tier: "Domestic",
        products: "ModelArts, Ascend cloud services",
        note: "Common in domestic-substitution and public-sector projects; shares its lineage with Ascend hardware, so the migration path is clear.", url: "https://www.huaweicloud.com" },
      { name: "AWS / Azure / Google Cloud", region: "United States", cat: "cloud", tier: "Global tier 1",
        products: "EC2 P5/G5, ND H100 v5, A3 series",
        note: "The broadest region coverage and compliance certifications — good for international operations. Notably more expensive than Chinese providers, and watch egress fees.", url: "https://aws.amazon.com" },
      { name: "CoreWeave / Lambda Labs", region: "United States", cat: "cloud", tier: "GPU specialists",
        products: "Hourly and reserved H100 / A100 clusters",
        note: "GPU-focused rental that often undercuts the big three, good for bursty large training runs. Networking and storage are comparatively basic.", url: "https://www.coreweave.com" },
      { name: "RunPod / Vast.ai", region: "United States", cat: "cloud", tier: "Low cost",
        products: "Community GPU rental, billed hourly",
        note: "The cheapest option, but machine quality varies. Fine for experiments and one-off jobs, not for production.", url: "https://www.runpod.io" },
      { name: "AutoDL and similar", region: "China", cat: "cloud", tier: "Individual friendly",
        products: "Hourly single and multi-GPU instances with prebuilt images",
        note: "A low-cost favourite for individual developers and students in China, with convenient image and volume management.", url: "https://www.autodl.com" },
      { name: "Regional compute centres", region: "China", cat: "cloud", tier: "Subsidised",
        products: "State-backed AI compute centres, often with compute vouchers",
        note: "Pricing can be extremely low or effectively free, but quotas, approval and available SKUs are constrained — best for non-urgent work.", url: "" },

      { name: "JD Enterprise / JD Industrial", region: "China", cat: "channel", tier: "Retail",
        products: "Systems, GPUs, server components",
        note: "Clean invoicing and after-sales, transparent pricing; large orders can negotiate enterprise rates.", url: "https://b.jd.com" },
      { name: "Authorised distributors", region: "Local", cat: "channel", tier: "Enterprise",
        products: "Tier 1 / tier 2 resellers for Inspur, Lenovo, Huawei, Dell",
        note: "The proper route for volume enterprise procurement — project pricing and local service. Verify authorisation status and warranty terms.", url: "" },
      { name: "LCSC / Mouser / DigiKey", region: "China / Global", cat: "channel", tier: "Components",
        products: "PSUs, connectors, cooling, industrial modules",
        note: "Reliable channels for small parts and industrial modules when building or repairing — far safer than open markets.", url: "https://www.szlcsc.com" },
      { name: "Second-hand and pulled parts", region: "Various", cat: "channel", tier: "High risk",
        products: "Ex-mining cards, pulled server parts, refurbished GPUs",
        note: "Attractive pricing with concentrated risk: unknown mining hours, unknown drive wear, no warranty. Only where you can absorb a total loss, and always stress-test on site.", url: "" }
    ],

    /* ------------------------- Laptops and mobile ------------------------- */
    laptops: {
      note:
        "Laptops bring three hard constraints to local AI: a VRAM ceiling, a power limit, and thermal throttling. " +
        "The same GPU name in a laptop typically delivers only 50–70% of its desktop counterpart, often with less VRAM. " +
        "Decide first whether you are doing “mobile work plus cloud APIs” or “must run models offline” — the two paths lead to completely different machines.",
      points: [
        { title: "The VRAM ceiling is now 24 GB", desc: "The RTX 5090 Laptop ships with 24 GB of GDDR7, a clear step up from 16 GB last generation. But the 5080 Laptop is still 16 GB and the 5070/5060 only 8–12 GB, so anything past 24B still needs 4-bit quantisation." },
        { title: "Unified memory is the one exception", desc: "Apple's M4 Max can be configured with 128 GB of unified memory — the only mobile route to 70B-class models. The trade-off is lower bandwidth than a discrete GPU, so tokens per second are slower." },
        { title: "The power limit decides real performance", desc: "Two RTX 5070 Laptops at 115 W and 140 W can differ by 20%. Check measured sustained power draw, not just the model number." },
        { title: "Do not use a laptop as an inference server", desc: "Laptop cooling is not designed for sustained load. Long 24/7 operation accelerates battery swelling and fan failure, and out-of-warranty repair is expensive." },
        { title: "eGPU enclosures are poor value", desc: "Thunderbolt 4's 40 Gbps is far below PCIe 5.0 x16, and measured losses of 20–40% are common. Add the enclosure and PSU cost and a desktop is simply better." }
      ],
      units: [
        { tier: "Thin and light", name: "Cloud first, local second", price: "$700 – 1,300",
          spec: [["Examples", "MacBook Air M4, Lenovo Yoga Slim, Huawei MateBook X Pro"],
                 ["Chip", "Apple M4 / integrated graphics"],
                 ["Usable VRAM", "16–24 GB shared memory"],
                 ["Weight / battery", "< 1.4 kg / 12 h+"],
                 ["Cooling", "Fanless or single fan — not for sustained load"]],
          runs: "7B at 4-bit runs but slowly; day-to-day work goes through cloud APIs",
          note: "If 90% of your work goes through cloud APIs this is the best value by far. Spending on cloud compute beats buying a GPU you never saturate." },
        { tier: "All-rounder", name: "Small local models plus mobile work", price: "$1,100 – 1,900",
          spec: [["Examples", "Lenovo Legion Pro 5, ASUS ROG Zephyrus, Dell XPS 15"],
                 ["GPU", "RTX 5060 / 5070 Laptop"],
                 ["VRAM", "8 GB"],
                 ["Memory", "32 GB DDR5 — max it out if you can"],
                 ["Sustained power", "115–140 W; insist on the full-power SKU"]],
          runs: "7B–8B at 4-bit runs smoothly; 13B needs quantisation and is a stretch",
          note: "8 GB of VRAM remains the bottleneck here. Prefer the 12 GB 5070 Laptop variant, and models where you can upgrade memory to 64 GB yourself." },
        { tier: "High-performance creator", name: "The mobile discrete ceiling", price: "$2,000 – 3,800",
          spec: [["Examples", "ROG Strix, MSI Titan 18 HX, ASUS ProArt 16"],
                 ["GPU", "RTX 5080 Laptop (16 GB) / RTX 5090 Laptop (24 GB) / RTX PRO 5000 Blackwell"],
                 ["VRAM", "16 – 24 GB"],
                 ["Memory", "64 GB DDR5"],
                 ["Cooling", "Dual fans and multiple heat pipes; 2.4 kg+"]],
          runs: "13B–32B at 4-bit; the 5090 Laptop's 24 GB reaches 32B at 4-bit; LoRA fine-tuning of 7B",
          note: "24 GB (5090 Laptop) is the current mobile ceiling. At this price you are near the cost of an equivalent desktop plus a thin-and-light laptop — decide whether you truly need one machine." },
        { tier: "Apple large memory", name: "The only big-VRAM mobile option", price: "$3,500 – 7,500",
          spec: [["Examples", "MacBook Pro 16-inch M4 Max, Mac Studio M3 Ultra"],
                 ["Chip", "Apple M4 Max / M3 Ultra"],
                 ["Unified memory", "64 / 128 / up to 512 GB"],
                 ["Bandwidth", "roughly 400–800 GB/s (below comparable discrete GPUs)"],
                 ["Power", "60–100 W at full tilt — quiet, long battery life"]],
          runs: "70B at 4-bit; 32B FP16 is viable; excellent LLM inference experience",
          note: "If your core need is running large models on the move, this is currently the only realistic answer. It is not for training, and do not expect H100-class throughput." },
        { tier: "Mobile workstation", name: "Professional GPUs with ISV certification", price: "$5,000 – 10,000",
          spec: [["Examples", "ThinkPad P1 Gen 8, Dell Precision 5690, HP ZBook Fury G11"],
                 ["GPU", "RTX 2000 / 4000 / 5000 Ada with professional drivers"],
                 ["VRAM", "8 – 16 GB, ECC on some SKUs"],
                 ["Memory", "Up to 128 GB, ECC available"],
                 ["Certification", "ISV certified with long-term driver support"]],
          runs: "Professional 3D and simulation plus mid-size model inference",
          note: "You are paying for professional drivers, ECC and enterprise warranty. For pure LLM work, the Apple large-memory option at the same price is a better fit." },
        { tier: "Rugged laptop", name: "Industrial mobile", price: "$4,000 – 12,000",
          spec: [["Examples", "Panasonic Toughbook 40, Getac X600, Dell Latitude Rugged"],
                 ["Operating temp", "-29 – 63 °C on wide-temp SKUs"],
                 ["Protection", "IP53–IP66, 1.8 m drop, MIL-STD-810H"],
                 ["GPU", "Integrated or entry-level discrete"],
                 ["Supply", "5+ year long-term availability"]],
          runs: "On-site data capture and light vision inference; heavy work goes back to an edge server",
          note: "Rugged laptops are not compute powerhouses. Their job is to boot on site, stay connected and get data back — not to run large models locally." }
      ]
    }
  };

  /* ------------------------------------------------------------------
     Rent vs buy cost calculator
     ------------------------------------------------------------------ */
  window.AI_DATA.hardware.calculator = {
    note:
      "Owning costs far more than the purchase price: electricity, rack space, operations staff and depreciation " +
      "after three years routinely exceed the hardware itself. Renting means no capex, elastic capacity and no ops burden, " +
      "at the cost of a higher long-run unit price. The parameters below let you find your own crossover point. " +
      "Everything is computed locally in your browser — nothing is uploaded.",
    defaults: {
      months: 24,
      hoursPerDay: 24,
      daysPerMonth: 30,
      salvageRate: 15
    },
    presets: [
      { id: "p1", name: "Individual · single RTX 5090 32G", seg: "Individual",
        purchase: 2400, power: 0.7, price: 0.16, pue: 1.1, rack: 0, ops: 0, cloud: 0.5, life: 4 },
      { id: "p2", name: "Individual · dual RTX 5090 64G", seg: "Individual",
        purchase: 5400, power: 1.4, price: 0.16, pue: 1.1, rack: 0, ops: 0, cloud: 1.0, life: 4 },
      { id: "p3", name: "Individual · RTX PRO 6000 Blackwell 96G", seg: "Individual",
        purchase: 9000, power: 0.6, price: 0.16, pue: 1.1, rack: 0, ops: 0, cloud: 1.8, life: 5 },
      { id: "p4", name: "Individual · Mac Studio large memory (512G)", seg: "Individual",
        purchase: 9500, power: 0.3, price: 0.16, pue: 1.0, rack: 0, ops: 0, cloud: 1.5, life: 5 },
      { id: "p5", name: "Studio · 2× RTX PRO 6000 192G", seg: "Studio",
        purchase: 20000, power: 1.3, price: 0.20, pue: 1.2, rack: 400, ops: 600, cloud: 3.5, life: 4 },
      { id: "p6", name: "Enterprise · 8× H100 80G (previous gen)", seg: "Enterprise",
        purchase: 280000, power: 8.0, price: 0.14, pue: 1.4, rack: 1300, ops: 3200, cloud: 28.0, life: 3 },
      { id: "p7", name: "Enterprise · 8× B200 192GB (current gen)", seg: "Enterprise",
        purchase: 420000, power: 12.0, price: 0.14, pue: 1.4, rack: 2000, ops: 3600, cloud: 48.0, life: 3 },
      { id: "p8", name: "Industrial · wide-temp IPC + RTX 2000 Ada", seg: "Industrial",
        purchase: 12000, power: 0.35, price: 0.18, pue: 1.2, rack: 0, ops: 200, cloud: 0.5, life: 5 }
    ],
    labels: {
      purchase: "Hardware purchase price",
      power: "System power draw",
      price: "Electricity price",
      pue: "PUE (overhead factor)",
      rack: "Rack space and hosting",
      ops: "Operations labour",
      cloud: "Cloud hourly rate",
      salvage: "Terminal salvage rate",
      months: "Comparison horizon",
      runMode: "Utilisation pattern"
    },
    runModes: [
      { id: "always",  name: "24×7 always on", hours: 720 },
      { id: "work",    name: "Weekdays, 10 h", hours: 220 },
      { id: "evening", name: "Evenings, 4 h", hours: 120 },
      { id: "custom",  name: "Custom", hours: null }
    ],
    cloudRef: [
      { name: "RTX 5090 32G", price: "$0.40 – 0.80 / h", note: "Community and specialist providers" },
      { name: "RTX PRO 6000 96G", price: "$1.30 – 2.20 / h", note: "Single-card large VRAM; runs 70B at 4-bit" },
      { name: "A100 40G",     price: "$1.00 – 1.80 / h", note: "Major cloud, on-demand" },
      { name: "A100 80G",     price: "$1.50 – 3.00 / h", note: "Reserved monthly around $1,200–2,500 per card" },
      { name: "H100 80G",     price: "$2.50 – 4.50 / h", note: "Supply constrained; volatile pricing" },
      { name: "8× H100 node", price: "$20 – 36 / h",     note: "Discounts usually require a long commitment" }
    ],
    caveats: [
      "Not modelled: downtime losses, technology obsolescence, electrical upgrade and facility build-out, migration and porting effort",
      "The true cost of owning is routinely underestimated — spares, monitoring, on-call, and the risk that nobody maintains it when the person leaves",
      "Cloud rates are current market estimates. Annual commitments typically earn 30–50% off, which pushes the crossover point well to the right",
      "Industrial and edge deployments are rarely bought to save money — they exist for latency, offline operation and keeping data on site. Do not use this model to decide those",
      "Compliance and data-residency requirements can remove the rental option entirely; those cases are outside this model",
      "Salvage value is estimated by straight-line depreciation. Real resale prices depend heavily on when the next generation ships"
    ]
  };
})();
