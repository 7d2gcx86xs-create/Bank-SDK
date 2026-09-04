const pptxgen = require("pptxgenjs");

const NAVY = "000080";      // quadrant headers / title emphasis
const LBLUE = "2E9BD6";     // bank name in title
const BRAND = "0000A0";     // Nordea wordmark
const BORDER = "BFBFBF";
const INK = "1A1A1A";
const GREY = "A6A6A6";
const F = "Arial";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.title = "Nordic banks - AI capability peer review";

// geometry
const BX = [0.5, 6.78], BW = 6.05;
const BY = [1.05, 3.82], BH = 2.62;

const QUADS = ["Strategic positioning", "Technology strategy", "Gaps and limitations", "Operational implementation"];

function chrome(slide, pageNo) {
  slide.background = { color: "FFFFFF" };
  slide.addText(String(pageNo), { x: 0.38, y: 6.88, w: 0.5, h: 0.22, isTextBox: true, margin: 0,
    fontFace: F, fontSize: 8, color: GREY, valign: "middle" });
  slide.addText("Confidential", { x: 4.5, y: 7.12, w: 4.33, h: 0.22, isTextBox: true, margin: 0, align: "center",
    fontFace: F, fontSize: 7.5, color: GREY, valign: "middle" });
  slide.addText("Nordea", { x: 10.9, y: 6.78, w: 1.93, h: 0.38, isTextBox: true, margin: 0, align: "right",
    fontFace: F, fontSize: 18, bold: true, color: BRAND, valign: "middle" });
}

function titleTwoTone(slide, lead, rest) {
  slide.addText([
    { text: lead, options: { color: LBLUE, bold: true } },
    { text: rest, options: { color: NAVY, bold: true } },
  ], { x: 0.5, y: 0.3, w: 12.33, h: 0.42, isTextBox: true, margin: 0,
       fontFace: F, fontSize: 15, valign: "middle" });
}

function quadSlide(pageNo, lead, rest, boxes, headers) {
  const s = pres.addSlide();
  chrome(s, pageNo);
  titleTwoTone(s, lead, rest);
  const heads = headers || QUADS;
  boxes.forEach((bullets, i) => {
    const x = BX[i % 2], y = BY[Math.floor(i / 2)];
    s.addShape(pres.ShapeType.rect, { x, y, w: BW, h: BH,
      fill: { color: "FFFFFF" }, line: { color: BORDER, width: 0.75 } });
    s.addText(heads[i], { x: x + 0.11, y: y + 0.05, w: BW - 0.22, h: 0.26, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 10.5, bold: true, color: NAVY, valign: "middle" });
    s.addText(bullets.map((b, j) => ({
      text: b, options: { bullet: { indent: 12 }, breakLine: j < bullets.length - 1, paraSpaceAfter: 6 },
    })), { x: x + 0.14, y: y + 0.36, w: BW - 0.3, h: BH - 0.46, isTextBox: true, margin: 0,
      fontFace: F, fontSize: 9.5, color: INK, valign: "top", lineSpacingMultiple: 1.0 });
  });
  return s;
}

// ------------------------------------------------------------------ page 1
quadSlide(1, "Nordic AI peer review: ", "how to read the following pages",
  [
    ["Nordic majors under review: OP Financial Group, Danske Bank, DNB, SEB, Swedbank, Handelsbanken",
     "Digital brokers: Nordnet and Avanza — a narrower AI surface by business model, not by ambition",
     "Challenger benchmark: Revolut — not a balance-sheet peer, but competing for the same household",
     "Nordea included as the baseline page for comparison, not as a peer under review"],
    ["Strategic positioning: how the institution frames AI to its markets, its board and its staff",
     "Technology strategy: platforms, models, vendors and architectural choices",
     "Gaps and limitations: what is missing, unproven, or simply not disclosed",
     "Operational implementation: what is actually in production, with published numbers where they exist"],
    ["Full-stack builders — OP, Danske, Revolut: assistants on both sides of the house, or own models",
     "Selective scalers — DNB, SEB, Swedbank: a decade of conversational AI with genAI layered on top",
     "Deliberate abstainers — Handelsbanken by conviction; Nordnet and Avanza by business model",
     "The sharpest divide is not model access — it is whether AI reaches the customer or stops at the desktop"],
    ["Public sources only: company pages, press releases, vendor case studies and trade press",
     "Absence of disclosure is reported as absence of disclosure, never as absence of capability",
     "Vendor (boost.ai) and consultancy (PA Consulting, ADVISORI) material is secondary and labelled",
     "Position as at September 2026; bracketed numbers refer to the source pages at the end"],
  ],
  ["Peer set", "How to read each page", "Three postures in the peer set", "Method and caveats"]);

// ------------------------------------------------------------------ banks
quadSlide(2, "OP Financial Group: ", "from “Mobile first” to “AI first” strategy", [
  ["CEO framing is explicit: the strategy “used to be about Mobile first, but now it's about AI first” [2]",
   "Stated ambition to be the forerunner in AI and technology among Finnish financial service providers [1]",
   "Hyper-personalisation is the goal — AI and data used to predict customer needs, not just answer them [2]",
   "Scale to defend: 1.7m active OP-mobile users and roughly 700m logins a year [2]"],
  ["Microsoft Azure partnership (2023); target of at least 70% of applications on public cloud by end-2027 [2]",
   "OP Aina built on the newest models and designed to combine customer data across separate services [1]",
   "Own Quantum and AI Research Centre (QARC): quantum computing plus machine learning for finance [1]",
   "Natural-language interaction and gesture recognition named as core technology-vision elements [2]"],
  ["No published adoption, resolution or productivity metrics for either OP Aina or OP Maiju [1][2]",
   "Earlier interaction bets such as face payment were trialled but never reached full deployment [2]",
   "Cloud migration is still in flight — the 70% public-cloud target is 2027, not today [2]",
   "Quantum research is a long-horizon bet with no disclosed near-term P&L linkage [1]"],
  ["OP Aina: 24/7 personal AI assistant for customers, in production [1]",
   "OP Maiju: group-wide generative AI service helping employees carry out tasks faster and more easily [1]",
   "AI deployed on both sides of the house — customer interface and internal productivity [1][2]",
   "AI capability used explicitly as an employer-brand and recruitment proposition [1]"],
]);

quadSlide(3, "Danske Bank: ", "deepest internal genAI estate, thinnest customer surface", [
  ["Generative AI investment sits inside the Forward '28 strategy for digital platforms [5]",
   "Explicitly employee-first: the stated aim is to help colleagues, and through them customers [3][5]",
   "Chief AI Officer and Head of GenAI appointed June 2025 — AI given senior, named ownership [3]",
   "90% of all Danske Bank employees have been through generative AI training [4]"],
  ["DanskeGPT (2023): a sealed internal deployment of OpenAI GPT-4 meeting the bank's security requirements [5]",
   "Expanded from one chatbot into an internal assistant platform plus agent-based solutions [4]",
   "Microsoft 365 Copilot and GitHub Copilot both run as proofs of concept [5]",
   "“Adoption Cluster”: five identical cross-functional squads with shared CI/CD, security and governance [4]"],
  ["No flagship customer-facing generative AI assistant disclosed — value is captured internally [4]",
   "Agentic AI worked on for six months, with production possibly another six months away [4]",
   "Own assessment: nobody has really cracked agentic AI at enterprise level yet [4]",
   "Adoption is reported in users and use cases, not in cost, income or efficiency effect [4]"],
  ["12 generative AI solutions live, including DanskeGPT, DanskeAssist, GovDoc Assistant and HR Assistant [4]",
   "Almost 16,000 employees use one or more internal genAI solutions every month [4]",
   "30+ AI use cases in production, delivered through the five adoption squads [4]",
   "New solutions continuously tested and launched through the same pipeline [4]"],
]);

quadSlide(4, "DNB: ", "the longest-running conversational AI programme in the Nordics", [
  ["Conversational AI treated as a core service channel rather than an experiment — continuous since 2017 [8]",
   "A chat-first approach applied internally to employees as well as to customers [8]",
   "Great emphasis placed on ethics, security, confidentiality and data protection in all AI work [6]",
   "AI positioned to improve customer experience and streamline process, not to remove humans [7]"],
  ["Built on the boost.ai platform: five virtual agents across customer- and employee-facing use cases [8]",
   "Hybrid architecture — generative AI layered onto a robust NLU engine rather than replacing it [8]",
   "Aino uses generative AI and language models to answer customer queries [6]",
   "Complex interactions routed to human colleagues inside the same chat window [7]"],
  ["Heavy dependence on a single external vendor for the whole conversational layer [7][8]",
   "Strength is in chat and advisory support; no disclosed genAI in credit, pricing or risk decisions [6][7]",
   "Requires sustained human investment — 15 full-time AI trainers to maintain quality [8]",
   "Automation and accuracy rates are published, but no financial value is [6][7][8]"],
  ["Aino automates over 50% of all incoming chat and is the primary channel for website visitors [6][7]",
   "50–60% of all chat interactions resolved automatically within the first year of deployment [7]",
   "Juno: adviser bot for customer service and retail staff, 5,000+ daily users, ~80% accuracy [8]",
   "Hugo answers HR queries around the clock; Fix handles inbound IT service-desk requests [8]"],
]);

quadSlide(5, "SEB: ", "AI to strengthen advice, not to replace the adviser", [
  ["Award jury framing: AI used to shape how advice is delivered while preserving its human core [9]",
   "Early mover — Aida launched in late 2016, well before the current generative AI cycle [10]",
   "Stated aim from the outset: free humans to work on more complex tasks [10]",
   "Wealth management chosen as the showcase domain rather than mass-market service [9]"],
  ["Aida: cognitive agent with NLP and contextual awareness, trained on insurance, lending and savings [10]",
   "Sensaia: AI that turns client meetings into structured insight — themes, sentiment and action points [9]",
   "Advisers get access to insight from previous conversations, not only the meeting in front of them [9]",
   "Deployment pattern is domain-by-domain rather than one bank-wide assistant [9][10]"],
  ["Aida's public record is largely 2016–2020; little recent disclosure on any genAI refresh [10]",
   "Sensaia is confined to Private Wealth Management & Family Office, not the retail bank [9]",
   "No published resolution rates, adoption numbers or time-saved figures for either tool [9][10]",
   "No disclosed proprietary model or foundation-model strategy [9]"],
  ["Aida in production on seb.se, serving both customer chat and internal IT support [10]",
   "Sensaia fully implemented across the Private Wealth Management & Family Office business area [9]",
   "Meeting documentation automated so advisers spend more of the hour in client interaction [9]",
   "Named Best Private Bank for Use of AI at the PWM Wealth Tech Awards, April 2026 [9]"],
]);

quadSlide(6, "Swedbank: ", "governance-first scaling, customer layer still being rebuilt", [
  ["Stated vision: generative AI solutions usable across business units securely and compliantly [13]",
   "AI framed around three promises — banking that is simpler, safer and more personal [11]",
   "Responsibility placed ahead of speed throughout public communication [11]",
   "Participation in AI Sweden signals a cross-industry rather than a go-it-alone approach [13]"],
  ["Internal guidelines aligned to the EU AI Act and GDPR govern all AI development [11]",
   "A Group AI Accelerator acts as the central capability and data-science unit [12]",
   "Generative adversarial networks used to create synthetic fraud patterns for detection training [13]",
   "Akur8 partnership signed in March to strengthen the insurance pricing process [13]"],
  ["Nina dates from 2014–16 and no modern replacement is yet in production [14]",
   "Next-generation conversational banking is described as being built, not as launched [12]",
   "No named internal genAI assistant, and no adoption or productivity figures disclosed [11][12]",
   "The public AI page carries no metrics, dates or named tools at all [11]"],
  ["Nina answers basic banking questions from a base of roughly 250 answers (as reported 2016–18) [14]",
   "~30,000 virtual conversations a month, with around 8 of every 10 questions answered [14]",
   "AI in production for fraud detection and for streamlining internal processes [11]",
   "Dedicated roles being recruited for conversational banking and genAI content [12]"],
]);

quadSlide(7, "Handelsbanken: ", "“Augmented Intelligence” — deliberate restraint as strategy", [
  ["Internally calls it Augmented Intelligence: technology augments human intelligence, it does not replace it [15]",
   "Chief Digital Officer openly cautious about AI services emerging as part of a hype cycle [15]",
   "Personal relationships combined with digital tools framed as the source of advantage [15][16]",
   "Decentralised, risk-conscious and operationally conservative by design [15]"],
  ["AI tool built on IBM Watson technology for more efficient investment-advice compliance [15]",
   "Efficiency and Automation workstream covering agentic process automation, ML and genAI [16]",
   "Secure RPA and machine-learning pipelines built across on-premises and cloud platforms [16]",
   "Emerging technology treated as a catalyst to challenge processes, not as an end in itself [15]"],
  ["No customer-facing AI assistant disclosed in any home market [15]",
   "Public disclosure is sparse: no bank-published AI page, no metrics, no named customer tools [15][16]",
   "The value case is stated qualitatively — no savings, productivity or revenue target published [15]",
   "Trials run in several areas, but few are described as having been scaled [16]"],
  ["Watson-based compliance tool deployed to absorb a 40%+ rise in investment-advice meetings [15]",
   "Automation and ML pipelines run as shared infrastructure for AI initiatives across the bank [16]",
   "AI applied where documentation volume, not customer interaction, is the bottleneck [15]",
   "Stated filter before deployment: what creates real value for customers and employees [16]"],
]);

quadSlide(8, "Nordnet: ", "AI as investor content, not as a service layer", [
  ["AI used to sharpen the investing experience rather than to run the customer relationship [17]",
   "Positioning is platform-and-content led: help investors read the market faster [17][18]",
   "Some AI capability is bought in and resold rather than built in-house (AI Alpha Lab) [18]",
   "Cross-border community made workable by AI translation — a genuinely Nordic-scale play [17]"],
  ["AI-generated summaries of the latest news on each holding, delivered inside the app [17]",
   "Upgraded AI translation model powering Nordnet Social across language borders [17]",
   "AI Alpha Lab model portfolios: a probability-based model over large- and mega-cap stocks [18]",
   "Three complete AI-calculated portfolios delivered each month through a subscription service [18]"],
  ["No customer-service AI assistant and no internal generative AI programme disclosed [17][18]",
   "AI Alpha Lab is a third-party model surfaced on the platform, not Nordnet's own [18]",
   "Published performance covers a short window — roughly two years to November 2025 [18]",
   "AI is a feature of the product, not a stated operating-model transformation [17]"],
  ["AI news summaries and improved AI translation both went live in the app during 2025 [17]",
   "AI Alpha Lab sold as a paid analysis service alongside the trading platform [18]",
   "Reported model return of 45.6% against 39.5% for the market over the same period [18]",
   "AI positioned as an engagement and retention feature for active investors [17][18]"],
]);

quadSlide(9, "Avanza: ", "algorithmic, not AI — and explicit about it", [
  ["No generative AI assistant and no public AI strategy announced to date [19]",
   "The newest flagship is framed as algorithmic factor investing, not as artificial intelligence [19]",
   "The competitive angle is price and transparency rather than intelligence [19]",
   "Stated ambition is to challenge the major banks' discretionary management market [19]"],
  ["Avanza Sigma analyses millions of data points to construct customised equity portfolios [19]",
   "Method described as factor investing — research-based and rules-driven, not machine learning [19]",
   "Portfolios built on direct share ownership with automatic annual rebalancing [19]",
   "Client preferences on market exposure and sustainability drive portfolio construction [19]"],
  ["Neither machine learning nor AI is claimed anywhere in the Sigma announcement [19]",
   "No disclosed customer AI assistant, internal genAI tooling or AI governance framework [19]",
   "Sigma is gated at a SEK 1m minimum — a Private Banking product, not a mass-market one [19]",
   "The smallest publicly documented AI footprint in the entire peer set [19]"],
  ["Avanza Sigma launched on 31 August 2026 for Private Banking clients [19]",
   "Total fee of 0.55–0.85% a year, held at 0.55% through 2026 as a launch offer [19]",
   "Positioned at roughly half the market rate for traditional discretionary management [19]",
   "Real-time portfolio transparency delivered through the app and web platform [19]"],
]);

quadSlide(10, "Revolut: ", "the only peer in this set building its own models", [
  ["Native intelligence embedded directly into the core financial engine, developed in-house [23]",
   "Local market data treated as a compounding global advantage rather than a local asset [23]",
   "Nordic expansion aimed at traditional banks' household deposits, not only at fintech rivals [24]",
   "Regulated as a bank in the EU: Revolut Bank UAB, licensed in Lithuania and ECB-supervised [25]"],
  ["Revolut Research launched as a dedicated AI division inside a wider AI department [22]",
   "PRAGMA: proprietary model decoding financial trends, real-time risk and product recommendations [22][23]",
   "Self-reinforcing loop — customer data feeds the models, the models sharpen fraud, risk and prediction [23]",
   "Fraud models built internally by the financial crime team rather than bought from a vendor [20]"],
  ["AIR, the in-app assistant, is currently available only in the UK [21]",
   "No mortgage or corporate credit book in the Nordics — AI is not applied to those risk decisions [24]",
   "Proprietary model claims are recent (August 2026) and largely unproven in public [22][23]",
   "Marketing-led disclosure makes like-for-like comparison with bank reporting difficult [21][22]"],
  ["AI scam detection live since February 2024; ~30% reduction in investment-related card fraud losses [20]",
   "Rita, the troubleshooting assistant, resolves over 20% of customer support requests [21]",
   "Security models review close to one billion transactions every month [21]",
   "Around 2m Nordic users today, against a stated target of 3m by the end of 2026 [24]"],
]);

quadSlide(11, "Nordea (baseline): ", "the widest customer-facing AI estate in the peer set", [
  ["Technology, data and AI placed at the centre of the 2030 strategy announced in November 2025 [28]",
   "AI expected to turn local processes into Nordic-wide ones and to modernise legacy systems [28]",
   "Around 1,500 roles expected to go over two years as the effect of AI lands [28]",
   "Responsible AI stated as a leadership theme, with named ownership for AI adoption [27]"],
  ["Nova built on the boost.ai platform, with customer-facing versions in each core market [26]",
   "12 AI agents in production spanning customer service, HR and second-line support [26]",
   "Agents operate in each market's local language, with English in some countries [26]",
   "Research Librarian consolidates equity research, transcripts and estimates for institutional clients [27]"],
  ["Nova's foundation is 2017-era conversational AI, extended over time rather than rebuilt [26]",
   "Norwegian Nova handles ~50% fully automatically — well below the 90%+ in-scope headline [26]",
   "The workforce-reduction framing makes AI a cost story as much as a customer story [28]",
   "No proprietary model or foundation-model programme disclosed, unlike Revolut [27]"],
  ["Nova live in Sweden, Denmark, Norway and Finland, serving 9m+ private customers [26]",
   "In-scope resolution above 90% across customer-facing agents; Finland 95%, Sweden 91–95% [26]",
   "Generative AI rolled out internally to roughly 10,000 employees [28]",
   "AI News Summary personalises market news from holdings, account activity and watchlists [28]"],
]);

// ------------------------------------------------------------------ sources
const SOURCES = [
  ["OP Pohjola — “Artificial intelligence at OP Pohjola”", "op.fi/en/about-op-pohjola/career/employer/ai-at-op-pohjola/"],
  ["OP Media — “AI in OP Financial Group: customers set the direction”", "op-media.fi/en/ai-in-op-financial-group/"],
  ["Danske Bank — “Danske Bank further strengthens Generative AI focus with new leadership appointment” (16 Jun 2025)", "danskebank.com/news-and-insights/news-archive/news/2025/16062025"],
  ["Danske Bank — “Adopting AI in regulated industries: what worked and what didn't” (2026)", "danskebank.lt/en/career/blog/2026/adopting-ai-in-regulated-industries-what-worked-and-what-didint"],
  ["Danske Bank — “Danske Bank increases investments in generative AI” (14 Mar 2024)", "danskebank.com/news-and-insights/news-archive/news/2024/14032024"],
  ["boost.ai — “How Norway's biggest bank automated 51% of its online chat traffic with AI”", "boost.ai/case-studies/how-norways-biggest-bank-automated-51-of-its-online-chat-traffic-with-ai"],
  ["boost.ai — “How DNB transformed customer service operations… with conversational AI”", "boost.ai/case-studies/how-dnb-transformed-customer-service-operations-and-enhanced-human-agent-efficiency-with-conversational-ai/"],
  ["boost.ai — “Supercharging second line support at DNB” (Juno, Hugo, Fix)", "boost.ai/blog/revolutionizing-banking-cx-leveraging-conversational-ai-to-supercharge-second-line-support-at-dnb/"],
  ["SEB — “Award-winning AI frees up time for proactive client interaction” (Sensaia, Apr 2026)", "sebgroup.com/press/news/2026/award-winning-ai-frees-up-time-for-proactive-client-interaction"],
  ["PYMNTS — “SEB launches voice-activated assistant Aida to improve customer service”", "pymnts.com/news/merchant-innovation/2017/swedish-bank-boosts-customer-service-with-ai-robot/"],
  ["Swedbank — “How Swedbank uses AI”", "swedbank.com/about-swedbank/how-swedbank-uses-ai.html"],
  ["Swedbank Careers — “Content Domain Lead – Conversational Banking & GenAI”", "jobs.swedbank.com/jobs/25489-content-domain-lead-conversational-banking-genai"],
  ["Computer Weekly — “Nordic banks pursue AI in battle with digital competitors”", "computerweekly.com/news/366592058/Nordic-banks-pursue-AI-in-battle-with-digital-competitors"],
  ["Nuance — “Nina virtual assistant brings human touch to Swedbank customer service” (2016)", "news.nuance.com/2016-04-25-Nina-Virtual-Assistant-from-Nuance-Brings-Human-Touch-to-Swedbank-Customer-Service"],
  ["PA Consulting — “Balancing relationships and technology at Handelsbanken”", "paconsulting.com/insights/balancing-relationships-and-technology-at-handelsbanken"],
  ["Handelsbanken plc Careers — “Information Security Consultant – AI” (Jun 2026)", "jobs.handelsbanken.co.uk/jobs/job/Information-Security-Consultant-AI/2573"],
  ["Nordnet — “Nyt i 2025: de største nyheder og features hos Nordnet”", "nordnet.dk/blog/nyt-i-2025-de-stoerste-nyheder-og-features-hos-nordnet"],
  ["Nordnet — “AI Alpha Lab” subscription portfolios and performance blog", "nordnet.dk/aktier/analysetjenester/ai-alpha-lab"],
  ["Avanza — “Avanza lanserar algoritmstyrd aktieförvaltning” (Avanza Sigma, 31 Aug 2026)", "investors.avanza.se/media/press/2026/avanza-utmanar-storbankernas-miljardmarknad-lanserar-algoritmstyrd-aktieforvaltning-till-halva-priset/"],
  ["Revolut — “Revolut launches AI feature to protect customers from card scams”", "revolut.com/en-NL/news/revolut_launches_ai_feature_to_protect_customers_from_card_scams_and_break_the_scammers_spell/"],
  ["ADVISORI — “Revolut's AI strategy + roadmap: key takeaways” (AIR, Rita, transaction screening)", "advisori.de/en/blog/revolut-s-ai-strategy-roadmap-key-takeways-learnings"],
  ["Revolut — “Launch of dedicated AI research division: Revolut Research” (Aug 2026)", "revolut.com/news/revolut_announces_launch_of_dedicated_ai_research_division_revolut_research/"],
  ["FinTech Futures — “Revolut debuts AI research unit to power in-house banking models” (PRAGMA)", "fintechfutures.com/ai-in-fintech/revolut-launches-self-learning-intelligence-engine-to-accelerate-ai-deployment"],
  ["Bloomberg — “Revolut faces off with Klarna in Nordic fintech push for 3 million users” (Nov 2025)", "bloomberg.com/news/articles/2025-11-06/revolut-faces-off-with-klarna-in-nordic-fintech-push-for-3-million-users"],
  ["Bank of Lithuania — “Banking licence granted to Revolut Bank UAB”", "lb.lt/en/news/banking-licence-granted-to-revolut-bank-uab"],
  ["boost.ai — “Nordea employs comprehensive conversational AI strategy to scale customer service”", "boost.ai/case-studies/nordea-employs-comprehensive-conversational-ai-strategy-to-scale-customer-service/"],
  ["Nordea — “Tech & AI” news hub (Research Librarian, AI adoption leadership)", "nordea.com/en/news-topics/tech-ai"],
  ["Computer Weekly — “Nordea to slash 1,500 jobs as AI impact grows”", "computerweekly.com/news/366640379/Nordea-to-slash-1500-jobs-as-AI-impact-grows"],
];

function sourceSlide(pageNo, part, from, to) {
  const s = pres.addSlide();
  chrome(s, pageNo);
  titleTwoTone(s, "Sources ", "(" + part + ") — all figures as published by the institution or named outlet, accessed September 2026");
  let y = 1.05;
  for (let i = from; i <= to; i++) {
    const [t, u] = SOURCES[i];
    s.addText(String(i + 1), { x: 0.5, y: y, w: 0.34, h: 0.22, isTextBox: true, margin: 0,
      align: "center", valign: "middle", shape: pres.ShapeType.rect,
      fill: { color: "FFFFFF" }, line: { color: BORDER, width: 0.75 },
      fontFace: F, fontSize: 8, bold: true, color: NAVY });
    s.addText([
      { text: t, options: { fontSize: 9, color: INK, breakLine: true } },
      { text: u, options: { fontSize: 7.5, color: "7A7A7A" } },
    ], { x: 0.94, y: y - 0.03, w: 11.9, h: 0.4, isTextBox: true, margin: 0,
         fontFace: F, valign: "top", lineSpacingMultiple: 1.0 });
    y += 0.38;
  }
  return s;
}

sourceSlide(12, "1 of 2", 0, 13);
sourceSlide(13, "2 of 2", 14, 27);

pres.writeFile({ fileName: process.argv[2] || "peer.pptx" }).then(f => console.log("wrote", f));
