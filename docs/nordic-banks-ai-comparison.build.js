const pptxgen = require("pptxgenjs");

const NAVY = "1E2761";
const ICE  = "CADCFC";
const INK  = "232838";
const MUTE = "5A6270";
const LINE = "D9DEEC";
const TINT = "F5F7FC";
const AMBER_BG = "FBEFD9", AMBER_TX = "8A6A00";
const GREY_BG  = "F1F3F5", GREY_TX  = "5A6270";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";           // 13.33 x 7.5
pres.author = "Claude Code";
pres.title  = "Nordic Banks - AI Capability Comparison";

const HEAD = "Cambria";
const BODY = "Calibri";

const MAT = {
  Leading:  { fill: NAVY,     color: "FFFFFF" },
  Advanced: { fill: ICE,      color: NAVY     },
  Scaling:  { fill: "E8EDF9", color: NAVY     },
  Cautious: { fill: AMBER_BG, color: AMBER_TX },
  Niche:    { fill: GREY_BG,  color: GREY_TX  },
};

const rows = [
  ["OP Financial Group", "Finland",
   "OP Aina — 24/7 personal assistant on the newest models, merging customer data across services [1]",
   "OP Maiju — group-wide generative AI assistant for employees' daily tasks [1]",
   "Strategy moved from “Mobile first” to “AI first”; runs its own quantum + AI research centre (QARC) [1][2]",
   "Leading"],
  ["Danske Bank", "Denmark",
   "Colleague-first: no flagship customer-facing genAI assistant disclosed [4]",
   "12 genAI solutions live — DanskeGPT, DanskeAssist, GovDoc & HR Assistant; ~16,000 monthly users [4]",
   "Chief AI Officer named Jun 2025; “Adoption Cluster” of 5 squads, 30+ use cases in production [3][4]",
   "Leading"],
  ["DNB", "Norway",
   "Aino chatbot, now genAI/LLM-backed, automates over 50% of all incoming chat traffic [5][6]",
   "Juno adviser bot (~5,000 daily users, ~80% accuracy), Hugo for HR, Fix for the IT service desk [7]",
   "The Nordics' longest-running conversational-AI programme (since 2017); 15 full-time AI trainers [6][7]",
   "Advanced"],
  ["SEB", "Sweden",
   "Aida assistant on seb.se since 2016, serving both customers and internal IT support [13]",
   "Sensaia — AI meeting capture and summaries, fully rolled out in Private Wealth & Family Office [14]",
   "“Best Private Bank for Use of AI”, PWM Wealth Tech Awards 2026: AI to augment advisers, not replace [14]",
   "Advanced"],
  ["Swedbank", "Sweden",
   "Nina virtual assistant since 2014; a next-generation conversational-banking layer is in build [8][9]",
   "Group AI Accelerator; shared, compliant genAI tooling offered across business units [9][10]",
   "GAN-generated synthetic fraud patterns; internal AI rules mapped to the EU AI Act and GDPR [8][10]",
   "Scaling"],
  ["Handelsbanken", "Sweden",
   "Deliberately minimal — the customer relationship stays human-led [11]",
   "IBM Watson tool for investment-advice compliance; RPA, ML pipelines, agentic process automation [11][12]",
   "Frames it internally as “Augmented Intelligence”; leadership openly wary of the AI hype cycle [11]",
   "Cautious"],
  ["Nordnet", "Nordics",
   "AI-generated news digests per holding in-app; AI translation across Nordnet Social [15]",
   "Not publicly disclosed",
   "AI sold as investor content rather than service: AI Alpha Lab model portfolios by subscription [16]",
   "Niche"],
  ["Avanza", "Sweden",
   "No generative-AI customer assistant announced to date [17]",
   "Not publicly disclosed",
   "Avanza Sigma (Aug 2026): algorithm-driven, factor-based discretionary equity portfolios — not billed as AI [17]",
   "Niche"],
  ["Revolut", "UK / EU",
   "AIR in-app assistant (UK); Rita clears 20%+ of support requests; AI scam checks cut card-fraud losses ~30% [18][19]",
   "In-house models screen roughly 1bn transactions a month for fraud and risk [18][19]",
   "Revolut Research unit and proprietary PRAGMA model (Aug 2026), built on 80m customers' data [20][21]",
   "Leading"],
];

// ---------------------------------------------------------------- slide 1
const s1 = pres.addSlide();
s1.background = { color: "FFFFFF" };

s1.addText("Nordic Banks — AI Capability Comparison", {
  x: 0.5, y: 0.22, w: 9.4, h: 0.5, isTextBox: true, margin: 0,
  fontFace: HEAD, fontSize: 27, bold: true, color: NAVY, valign: "middle",
});
s1.addText("Publicly documented AI deployments, September 2026. Bracketed numbers cite the sources on slide 2.", {
  x: 0.5, y: 0.76, w: 9.4, h: 0.3, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 11.5, color: MUTE, valign: "middle",
});
s1.addText("9 institutions  ·  21 sources", {
  x: 10.05, y: 0.3, w: 2.78, h: 0.42, isTextBox: true, margin: 0, align: "center", valign: "middle",
  shape: pres.ShapeType.roundRect, rectRadius: 0.1, fill: { color: ICE },
  fontFace: BODY, fontSize: 11, bold: true, color: NAVY,
});

const COLW = [1.85, 3.15, 3.05, 3.15, 1.13];
const headers = ["Bank", "Customer-facing AI", "Internal / employee AI", "What sets them apart", "Maturity"];

const tblRows = [];
tblRows.push(headers.map((h, i) => ({
  text: h,
  options: {
    fill: { color: NAVY }, color: "FFFFFF", bold: true, fontSize: 10, fontFace: BODY,
    align: i === 4 ? "center" : "left", valign: "middle", margin: [4, 6, 4, 6],
  },
})));

rows.forEach((r, idx) => {
  const bg = idx % 2 === 0 ? "FFFFFF" : TINT;
  const m = MAT[r[5]];
  tblRows.push([
    { text: [
        { text: r[0], options: { bold: true, fontSize: 10.5, color: NAVY, breakLine: true } },
        { text: r[1].toUpperCase(), options: { fontSize: 7.5, color: MUTE, charSpacing: 0.6 } },
      ],
      options: { fill: { color: bg }, valign: "middle", margin: [4, 7, 4, 7], fontFace: BODY } },
    { text: r[2], options: { fill: { color: bg }, color: INK, fontSize: 8.5, fontFace: BODY, valign: "middle", margin: [4, 7, 4, 7] } },
    { text: r[3], options: { fill: { color: bg }, color: INK, fontSize: 8.5, fontFace: BODY, valign: "middle", margin: [4, 7, 4, 7] } },
    { text: r[4], options: { fill: { color: bg }, color: INK, fontSize: 8.5, fontFace: BODY, valign: "middle", margin: [4, 7, 4, 7] } },
    { text: r[5], options: { fill: { color: m.fill }, color: m.color, bold: true, fontSize: 9, fontFace: BODY, align: "center", valign: "middle", margin: [4, 3, 4, 3] } },
  ]);
});

s1.addTable(tblRows, {
  x: 0.5, y: 1.32, w: 12.33, colW: COLW,
  rowH: 0.52,
  border: { type: "solid", color: LINE, pt: 0.5 },
  autoPage: false,
});

s1.addText(
  "Maturity reflects what each institution has publicly documented — not an audit of internal capability. Nordnet and Avanza are brokers, so their AI surface is investing-side by design.",
  { x: 0.5, y: 6.62, w: 12.33, h: 0.34, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 9, italic: true, color: MUTE, valign: "middle" });

s1.addNotes(
  "Three postures show up. Full-stack builders: OP (AI-first strategy, own assistants for customers and staff), Danske (deepest internal genAI estate in the Nordics) and Revolut (proprietary models and its own research unit). " +
  "Selective scalers: DNB and SEB, both with a decade of conversational AI and now genAI layered on top; Swedbank close behind with governance-first scaling. " +
  "Deliberate abstainers: Handelsbanken by conviction, Nordnet and Avanza by business model. " +
  "The sharpest divide is not model access - it is whether AI reaches the customer or stops at the employee desktop."
);

// ---------------------------------------------------------------- slide 2
const s2 = pres.addSlide();
s2.background = { color: "FFFFFF" };

s2.addText("Sources", {
  x: 0.5, y: 0.32, w: 6, h: 0.5, isTextBox: true, margin: 0,
  fontFace: HEAD, fontSize: 30, bold: true, color: NAVY, valign: "middle",
});
s2.addText("All figures are as published by the institution or the named outlet; accessed September 2026.", {
  x: 0.5, y: 0.85, w: 9, h: 0.28, isTextBox: true, margin: 0,
  fontFace: BODY, fontSize: 10.5, color: MUTE, valign: "middle",
});

const srcs = [
  ["OP Pohjola — “Artificial intelligence at OP Pohjola”", "op.fi/en/about-op-pohjola/career/employer/ai-at-op-pohjola/"],
  ["OP Media — “AI in OP Financial Group: customers set the direction”", "op-media.fi/en/ai-in-op-financial-group/"],
  ["Danske Bank — “Danske Bank further strengthens Generative AI focus” (16 Jun 2025)", "danskebank.com/news-and-insights/news-archive/news/2025/16062025"],
  ["Danske Bank — “Adopting AI in regulated industries: what worked and what didn’t” (2026)", "danskebank.lt/en/career/blog/2026/adopting-ai-in-regulated-industries-what-worked-and-what-didint"],
  ["boost.ai — “How Norway’s biggest bank automated 51% of its online chat traffic with AI”", "boost.ai/case-studies/how-norways-biggest-bank-automated-51-of-its-online-chat-traffic-with-ai"],
  ["boost.ai — “How DNB transformed customer service operations… with conversational AI”", "boost.ai/case-studies/how-dnb-transformed-customer-service-operations-and-enhanced-human-agent-efficiency-with-conversational-ai/"],
  ["boost.ai — “Supercharging second line support at DNB” (Juno, Hugo, Fix)", "boost.ai/blog/revolutionizing-banking-cx-leveraging-conversational-ai-to-supercharge-second-line-support-at-dnb/"],
  ["Swedbank — “How Swedbank uses AI”", "swedbank.com/about-swedbank/how-swedbank-uses-ai.html"],
  ["Swedbank Careers — “Content Domain Lead – Conversational Banking & GenAI”", "jobs.swedbank.com/jobs/25489-content-domain-lead-conversational-banking-genai"],
  ["Computer Weekly — “Nordic banks pursue AI in battle with digital competitors”", "computerweekly.com/news/366592058/Nordic-banks-pursue-AI-in-battle-with-digital-competitors"],
  ["PA Consulting — “Balancing relationships and technology at Handelsbanken”", "paconsulting.com/insights/balancing-relationships-and-technology-at-handelsbanken"],
  ["Handelsbanken plc Careers — “Information Security Consultant – AI” (Jun 2026)", "jobs.handelsbanken.co.uk/jobs/job/Information-Security-Consultant-AI/2573"],
  ["PYMNTS — “SEB launches voice-activated assistant Aida”", "pymnts.com/news/merchant-innovation/2017/swedish-bank-boosts-customer-service-with-ai-robot/"],
  ["SEB — “Award-winning AI frees up time for proactive client interaction” (Sensaia, 2026)", "sebgroup.com/press/news/2026/award-winning-ai-frees-up-time-for-proactive-client-interaction"],
  ["Nordnet — “Nyt i 2025: de største nyheder og features hos Nordnet”", "nordnet.dk/blog/nyt-i-2025-de-stoerste-nyheder-og-features-hos-nordnet"],
  ["Nordnet — “AI Alpha Lab” subscription portfolios", "nordnet.dk/aktier/analysetjenester/ai-alpha-lab"],
  ["Avanza — “Avanza lanserar algoritmstyrd aktieförvaltning” (Avanza Sigma, 31 Aug 2026)", "investors.avanza.se/media/press/2026/avanza-utmanar-storbankernas-miljardmarknad-lanserar-algoritmstyrd-aktieforvaltning-till-halva-priset/"],
  ["Revolut — “Revolut launches AI feature to protect customers from card scams”", "revolut.com/en-NL/news/revolut_launches_ai_feature_to_protect_customers_from_card_scams_and_break_the_scammers_spell/"],
  ["ADVISORI — “Revolut’s AI strategy + roadmap: key takeaways” (AIR, Rita)", "advisori.de/en/blog/revolut-s-ai-strategy-roadmap-key-takeways-learnings"],
  ["Revolut — “Launch of dedicated AI research division: Revolut Research” (Aug 2026)", "revolut.com/news/revolut_announces_launch_of_dedicated_ai_research_division_revolut_research/"],
  ["FinTech Futures — “Revolut debuts AI research unit to power in-house banking models” (PRAGMA)", "fintechfutures.com/ai-in-fintech/revolut-launches-self-learning-intelligence-engine-to-accelerate-ai-deployment"],
];

const COL_X = [0.5, 6.95];
const COL_W = 5.9;
const PER_COL = 11;
const EH = 0.475;

srcs.forEach((s, i) => {
  const col = i < PER_COL ? 0 : 1;
  const row = i < PER_COL ? i : i - PER_COL;
  const y = 1.32 + row * EH;
  s2.addText(String(i + 1), {
    x: COL_X[col], y: y, w: 0.32, h: 0.24, isTextBox: true, margin: 0, align: "center", valign: "middle",
    shape: pres.ShapeType.roundRect, rectRadius: 0.05, fill: { color: ICE },
    fontFace: BODY, fontSize: 8.5, bold: true, color: NAVY,
  });
  s2.addText([
    { text: s[0], options: { fontSize: 8.5, color: INK, breakLine: true } },
    { text: s[1], options: { fontSize: 7.5, color: MUTE } },
  ], {
    x: COL_X[col] + 0.4, y: y - 0.03, w: COL_W - 0.4, h: 0.42,
    isTextBox: true, margin: 0, fontFace: BODY, valign: "top", lineSpacingMultiple: 1.0,
  });
});

s2.addText(
  "Where a bank has published no AI detail, the table says so rather than inferring capability. Vendor case studies (boost.ai) and consultancy write-ups (PA Consulting, ADVISORI) are secondary sources and are labelled as such.",
  { x: 0.5, y: 6.62, w: 12.33, h: 0.34, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 9, italic: true, color: MUTE, valign: "middle" });

s2.addNotes("Primary sources are the banks' own pages and press releases. Vendor and consultancy material is used only where the bank has not published equivalent detail itself.");

pres.writeFile({ fileName: process.argv[2] || "nordic-banks-ai-comparison.pptx" }).then(f => console.log("wrote", f));
