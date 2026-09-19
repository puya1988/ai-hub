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
            spec: [["GPU", "RTX 4060 Ti 16GB / RTX 4070 12GB"],
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
            spec: [["GPU", "RTX 4080 SUPER 16GB / RTX 4090 24GB"],
                   ["CPU", "Ryzen 9 or Core i7 (12–16 cores)"],
                   ["Memory", "64 GB DDR5"],
                   ["Storage", "2 TB NVMe Gen4"],
                   ["PSU", "850–1000 W Gold"],
                   ["Cooling", "Dual-tower air or 360 mm AIO"]],
            runs: "14B–32B at 4-bit; 32B FP16 needs a second card",
            note: "24 GB is the sweet spot for consumer hardware and holds its resale value better than anything else in this tier."
          },
          {
            tier: "Advanced", name: "Two cards", price: "$5,000 – 8,000",
            spec: [["GPU", "2 × RTX 4090 24GB (48 GB total)"],
                   ["CPU", "Threadripper or Core i9 (24+ cores)"],
                   ["Memory", "128 GB DDR5"],
                   ["Storage", "4 TB NVMe Gen4 + 8 TB HDD archive"],
                   ["PSU", "1600 W Titanium"],
                   ["Cooling", "Large case; leave a slot between cards"]],
            runs: "70B at 4-bit; full fine-tuning of 32B",
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
            spec: [["GPU", "2 × RTX 4090 24GB or 1 × RTX 6000 Ada 48GB"],
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
            spec: [["GPU", "2 × RTX 6000 Ada 48GB (96 GB total)"],
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
            spec: [["GPU", "4 × L40S 48GB or 4 × A100 80GB"],
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
            spec: [["GPU", "2 × L40S 48GB or 2 × A100 40GB"],
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
            spec: [["GPU", "4–8 × A100 80GB / H100 80GB with NVLink"],
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
            spec: [["Compute", "One blower or passively cooled professional card (L4 / RTX A2000 class)"],
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
      "INT8 ≈ 1.1, INT4 ≈ 0.55. KV cache grows linearly with context length and can exceed the model itself on long contexts.",
    vram: [
      { size: "7B – 8B",   fp16: "16 GB",   int8: "8 – 10 GB", int4: "5 – 6 GB",    market: "RTX 4060 Ti 16GB", prof: "L4 / T4" },
      { size: "13B – 14B", fp16: "28 GB",   int8: "14 GB",     int4: "8 – 9 GB",    market: "RTX 4080 16GB (4-bit)", prof: "L40S 48GB" },
      { size: "30B – 34B", fp16: "68 GB",   int8: "34 GB",     int4: "18 – 20 GB",  market: "RTX 4090 24GB (4-bit)", prof: "2 × L40S / A6000 48GB" },
      { size: "70B",       fp16: "140 GB",  int8: "70 GB",     int4: "36 – 40 GB",  market: "2 × 4090 (4-bit, tight)", prof: "2 × A100 80GB / 4 × L40S" },
      { size: "110B+ / large MoE", fp16: "220 GB+", int8: "110 GB+", int4: "60 GB+", market: "Not recommended", prof: "4 – 8 × H100 80GB" },
      { size: "Full fine-tuning",  fp16: "≈ 16 × params", int8: "—", int4: "—",      market: "Impractical", prof: "Multi-GPU with NVLink" },
      { size: "LoRA fine-tuning",  fp16: "≈ 4 × params",  int8: "—", int4: "—",      market: "7B on a single 24 GB card", prof: "L40S / A100" }
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
    ]
  };
})();
