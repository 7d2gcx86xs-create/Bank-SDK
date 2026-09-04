const pptxgen = require("pptxgenjs");

const NAVY="000080", LBLUE="2E9BD6", BRAND="0000A0", BORDER="BFBFBF",
      INK="1A1A1A", GREY="A6A6A6", URLC="7A7A7A", F="Arial";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.title = "Nordic/Baltic AI peer comparison vs Nordea";

const BX=[0.5,6.78], BW=6.05, BY=[1.05,3.82], BH=2.62;
const QUADS=["Strategic positioning","Technology strategy","Gaps and limitations","Operational implementation"];
let page=0;

function chrome(s){
  page++;
  s.background={color:"FFFFFF"};
  s.addText(String(page),{x:0.38,y:6.88,w:0.5,h:0.22,isTextBox:true,margin:0,fontFace:F,fontSize:8,color:GREY,valign:"middle"});
  s.addText("Confidential",{x:4.5,y:7.12,w:4.33,h:0.22,isTextBox:true,margin:0,align:"center",fontFace:F,fontSize:7.5,color:GREY,valign:"middle"});
  s.addText("Nordea",{x:10.9,y:6.78,w:1.93,h:0.38,isTextBox:true,margin:0,align:"right",fontFace:F,fontSize:18,bold:true,color:BRAND,valign:"middle"});
}
function title2(s,lead,rest){
  s.addText([{text:lead,options:{color:LBLUE,bold:true}},{text:rest,options:{color:NAVY,bold:true}}],
    {x:0.5,y:0.3,w:12.33,h:0.42,isTextBox:true,margin:0,fontFace:F,fontSize:15,valign:"middle"});
}
function quad(lead,rest,boxes,headers){
  const s=pres.addSlide(); chrome(s); title2(s,lead,rest);
  const H=headers||QUADS;
  boxes.forEach((bul,i)=>{
    const x=BX[i%2], y=BY[Math.floor(i/2)];
    s.addShape(pres.ShapeType.rect,{x,y,w:BW,h:BH,fill:{color:"FFFFFF"},line:{color:BORDER,width:0.75}});
    s.addText(H[i],{x:x+0.11,y:y+0.05,w:BW-0.22,h:0.26,isTextBox:true,margin:0,fontFace:F,fontSize:10.5,bold:true,color:NAVY,valign:"middle"});
    s.addText(bul.map((b,j)=>({text:b,options:{bullet:{indent:12},breakLine:j<bul.length-1,paraSpaceAfter:6}})),
      {x:x+0.14,y:y+0.36,w:BW-0.3,h:BH-0.46,isTextBox:true,margin:0,fontFace:F,fontSize:9.5,color:INK,valign:"top",lineSpacingMultiple:1.0});
  });
}

// ---------------------------------------------------------------- 1 overview
quad("Nordic/Baltic AI peer comparison: ","how to read the following pages",[
 ["Nordea opens the set as the baseline reference point — this is a comparison, not a scored ranking",
  "Nordic/Baltic peers: OP Pohjola, Danske Bank, DNB, Swedbank, Handelsbanken, SEB, Nordnet, Avanza",
  "Revolut is carried over from the earlier draft as a challenger benchmark — it sits outside the peer report",
  "Primary focus is 2024–2026 disclosure; forward statements run to whatever horizon each company states"],
 ["Strategic positioning: steering from leadership, capability and culture building, brand and thought leadership",
  "Technology strategy: cloud and partner choices, own AI build, internal capability signals, tooling",
  "Gaps and limitations: what is missing, unproven or risky — key people, ROI opacity, cost pressure, claims without data",
  "Operational implementation: what is live today — products, internal vs external, agents, processes, volumes"],
 ["[C] Confirmed — the company's own primary source: report, investor material, press release or official executive quote",
  "[R] Reported — credible third-party media or analyst coverage, not confirmed by the company itself",
  "[I] Inferred — the researchers' own inference drawn from indirect evidence",
  "[ND] Not disclosed — searched for and not found in public sources; an absence of disclosure, not of capability"],
 ["No maturity scores or tiers are assigned; factual differences in disclosed scale are stated plainly",
  "LinkedIn was not accessible to the research pass — talent signals come from careers pages and news, and are directional",
  "Sources are listed per institution on the final three pages; the underlying peer report carries the full lists",
  "Position as at September 2026"],
], ["Peer set and baseline","What each box contains","Evidence labels used on every bullet","Method and caveats"]);

// ---------------------------------------------------------------- 2 Nordea
quad("Nordea (baseline): ","AI as a quantified 2030 cost and scale lever",[
 ["CEO Vang-Jensen frames AI as “profound business transformation” — rethinking entire processes [C]",
  "2030 strategy (CMD, 5 Nov 2025): “Scale — accelerated by technology, data and AI” [C]",
  "Visible narrative arc from ROI scepticism (Dec 2024) to core strategic pillar to “profound transformation” [R]",
  "Thought leadership via the Aalto “Future Interfaces Lab” on AI and human-machine trust, May 2026 [C]"],
 ["AWS Bedrock as core GenAI infrastructure, deliberately modular and model-agnostic; Claude prominent [R]",
  "boost.ai bought for conversational AI; orchestration and governance layer built in-house [C]",
  "No proprietary foundation model — the build sits at orchestration, governance and application level [I]",
  "“Governance as a feature, not a barrier”: monitoring, access control and auditability in every layer [C]"],
 ["No AI-specific investment figure — AI is legible only through cost take-out and headcount targets [ND]",
  "No Chief AI Officer or Chief Data Officer at Group Leadership Team level [C]",
  "No named AML AI/ML tool; the AML narrative is dominated by the USD 35m NYDFS fine of Aug 2024 [C]",
  "No public EU AI Act or DORA disclosure, despite live AI-governance job postings referencing both [ND]"],
 ["Nova plus 12 boost.ai agents across FI/SE/DK; ~220,000 conversations a month, 76% of chat bot-handled [C/R]",
  "Internal GenAI platform scaled from prototype to ~10,000 employee users [R]",
  "RPA since 2015 with 360+ robotised processes, layered with OCR and ML from 2018 [R]",
  "Quantified targets: 90% mortgage-promise automation by 2030; ≥EUR 600m gross cost take-out by 2030 [C]"],
]);

// ---------------------------------------------------------------- 3 OP
quad("OP Pohjola: ","“AI first” replaced “Mobile first” in autumn 2025",[
 ["AI lifted to the core of group strategy in autumn 2025, replacing the “Mobile first” slogan [R]",
  "CEO Ritakallio is the group's most visible AI champion — and retires 1 July 2027 with no named successor [C]",
  "Culture at scale: 8,000+ of ~14,000 staff AI-trained by April 2025; over half hold Copilot licences [C]",
  "Thought leadership: co-authored “Unlocking AI value in Finnish organisations” with Accenture and Noren [C]"],
 ["Microsoft Azure primary since Aug 2023, in Finnish datacentres, chosen for data residency [C]",
  "Target of ≥70% of applications on public cloud by end-2027, framed as the precondition for scaled AI [C]",
  "Builds its own tools — OP Aina, OP Maiju, dozens of task agents — on undisclosed third-party models [C/ND]",
  "Hybrid model: central agents for regulated processes plus employee-built lightweight agents [C]"],
 ["No disaggregated AI spend; EUR 356m total 2024 group investment (~7.5% of income) is the only proxy [R]",
  "Unreconciled stack ambiguity — career material suggests AWS/Databricks alongside Azure-exclusive framing [R]",
  "Nearly all substantive coverage is OP's own, Finnish-language, or OP-co-sponsored research [I]",
  "Key-person risk: the “AI first” narrative is tied personally to a CEO leaving in mid-2027 [I]"],
 ["OP Aina, customer-facing personal AI assistant, live since June 2024 [C]",
  "OP Maiju drafts roughly 23,000 property listings a year for OP Koti [C]",
  "AI used “extensively” in customer service, digital services, insurance claims, financial crime and staff support [C]",
  "Financial-crime function grown to 600 people with AI-assisted transaction screening [C/R]"],
]);

// ---------------------------------------------------------------- 4 Danske
quad("Danske Bank: ","the only peer with a group Chief AI Officer",[
  ["Kasper Tjørntved Davidsen appointed Chief AI Officer and Head of GenAI, June 2025 — unique in the peer set [C]",
   "CEO Egeriis frames AI as a 10–15 year commitment: “the return doesn't come right away” [R]",
   "Separate Head of AI and an AI Centre of Excellence in Belfast under Dr Fiona Browne, Jan 2026 [C]",
   "Culture at scale: 90% of employees have completed generative AI training [C]"],
  ["AWS is the dominant hyperscaler; extended June 2026 to Amazon Bedrock and Bedrock AgentCore [C]",
   "DanskeGPT built on an internally hardened GPT-4-class OpenAI model — a vendor relationship, not a partnership [C]",
   "“AI City”: 50+ shared, governed capabilities acting as the internal MLOps and governance layer [C/R]",
   "Microsoft 365 and GitHub Copilot in use across 3,000+ developers, with “immediately visible” ROI [R]"],
  ["No AI-only budget line — DKK ~4.5bn a year covers technology, AI and advisory together [C]",
   "Fraud metrics still rest on a 2016–17 Teradata case study with no 2024–26 refresh [R]",
   "Agentic AI worked on for six months, with production possibly another six months away [R]",
   "~680 roles cut across two 2026 rounds citing automation — cost pressure runs alongside the AI spend [R]"],
  ["12 generative AI solutions live: DanskeGPT, DanskeAssist, GovDoc Assistant, HR Assistant and others [C]",
   "Almost 16,000 employees use an internal GenAI solution every month [C]",
   "~40 live “Tactical AI” use cases embedded in business processes, alongside broad “Enterprise AI” access [R]",
   "Target of ~DKK 2bn annual AI and technology productivity benefit by 2028 [C]"],
]);

// ---------------------------------------------------------------- 5 DNB
quad("DNB: ","“AI ready, but not necessarily AI first”",[
  ["COO framing is deliberately measured: “We should be AI ready, but not necessarily AI first” [R]",
   "Board treats AI as a recurring governance topic; Annual Report 2025 formalises it as a strategic theme [C]",
   "CEO Braathen publicly downplays AI job-loss fears, stressing trust, curiosity and human judgement [R]",
   "National positioning: Norway launched its “AI Norway” framework at DNB's own AI lab, March 2025 [C]"],
  ["Internal “Radical AI” lab — six people reporting weekly to group executive management [R]",
   "“RAI Gateway” routes OpenAI and Anthropic traffic through DNB's own European infrastructure [R]",
   "Microsoft Azure with near-universal M365 Copilot; roughly half of staff hold extended AI licences [C/R]",
   "Buy the frontier model, build the routing and control layer — explicitly model-agnostic [R]"],
  ["No AI investment figure or horizon anywhere; only a qualitative “considerable investment in competence” [C]",
   "Disputed identity of the internal AI lab's executive sponsor; no confirmed CAIO or CDO [R]",
   "The richest account of the RAI lab rests on one trade-press source, uncorroborated on DNB's IR channel [R]",
   "No AI-specific award or index placement found; no Sweden or Baltic AI activity disclosed [ND]"],
  ["Aino automates over 50% of chat traffic and ~20–22% of total customer-service volume, 1m+ interactions [R]",
   "Five virtual agents (Aino, Juno, Hugo, Fix) supported by 15 full-time AI trainers [C/R]",
   "Fraud: NOK 3.3bn of attempted AI-enabled fraud in 2025 (+30% YoY), of which NOK 3bn was stopped [C]",
   "Small-corporate lending decisions automated in as little as 38 seconds; RAI Code piloted with ~350 users [C/R]"],
]);

// ---------------------------------------------------------------- 6 Swedbank
quad("Swedbank: ","AI leadership “embedded, not elevated”",[
  ["Swedish trade press frames the posture as “embedded, not elevated” — a Head of Group AI Accelerator, no C-suite AI seat [R]",
   "AI named inside the “Increased efficiency” pillar of Swedbank 15/27, not as a standalone strategy [C]",
   "CEO Henriksson on the three-year outlook: “I expect that we will be less people working... in the bank” [C]",
   "Joined AI Sweden as a formal partner, June 2025, framing shared responsibility for AI risk [C]"],
  ["Microsoft Azure appears exclusive; Azure Databricks is the core of the Enterprise Analytics Platform [C]",
   "New internal AI tool announced July 2026 for rollout to all employees, on a “vendor agnostic architecture” [C]",
   "Named target use cases: call summary, KYC processes and software development [C]",
   "Fraud stack built on a Hopsworks feature store with NVIDIA GPUs for GAN-based detection [C]"],
  ["CFO explicitly declines to disclose AI spend and says there are no plans to disclose it [C]",
   "No confirmed OpenAI, Anthropic, Google or Mistral relationship, and no confirmed Copilot deployment [ND]",
   "SEK 1.3bn of 2026 restructuring cost bundles AI with other transformation — cost pressure without AI clarity [C]",
   "No AI-specific award received in 2024–26; Swedbank appears as sponsor rather than recipient [ND]"],
  ["Fraud and AML are the best-evidenced use case: graph-based laundering detection over datasets up to 40TB [C]",
   "Process automation via Pegasystems: consumer loans 65% instant response, mortgages 65% faster [R]",
   "Nina chatbot (2014, AI-enhanced 2016): ~30–40k conversations a month, ~78–80% first-contact resolution [R]",
   "Customer-facing genAI launches concentrate in Lithuania — AIVA guidance assistant, DriveX claims [R]"],
]);

// ---------------------------------------------------------------- 7 Handelsbanken
quad("Handelsbanken: ","the quietest peer, by apparent design",[
  ["No Capital Markets Day found for 2024–26; strategy is communicated through quarterly results only [I]",
   "CEO Green's Q4 2025 call is the clearest AI statement found — exploratory: “examining the potential” [C]",
   "The distinctive brand framing, “Augmented Intelligence”, is real but dates to roughly 2018–19 [R]",
   "Decentralised branch-autonomy culture is the organising principle any AI rollout has to fit [C]"],
  ["No confirmed cloud-AI partnership and no confirmed LLM vendor — a genuine absence of signal [ND]",
   "UiPath confirmed for agentic process automation in the UK “Efficiency and Automation” programme [C]",
   "Tietoevry renewal for Norway core banking and financial crime (2024); Denodo for Handelsbanken Fonder [C]",
   "Pattern suggests building in-house on standard infrastructure rather than headline “buy” partnerships [I]"],
  ["No AI investment figure — folded into general IT development spend of ~SEK 3–3.5bn a year [R]",
   "No named customer-facing AI product found in any market [ND]",
   "No public AI governance, EU AI Act, DORA or model-risk disclosure [ND]",
   "No confirmed CAIO or CDO, and an unresolved discrepancy over who leads group IT [R]"],
  ["AMLGentex federated-learning AML research with AI Sweden and Swedbank — the most verifiable initiative [C]",
   "UK programme combines UiPath agentic automation with predictive and generative AI [C]",
   "“Code assistance” named alongside AML as an AI use case; tool and vendor unidentified [R]",
   "Legacy IBM Watson NLP compliance tool absorbed a 40%+ rise in advice meetings — figures conflict, dated [R]"],
]);

// ---------------------------------------------------------------- 8 SEB
quad("SEB: ","from rapid adoption to disciplined scaling",[
  ["CFO Malmer: 2025 was “rapid adoption and learning”, 2026 is “disciplined scaling” with token governance [R]",
   "COO Ahlström is the de facto AI sponsor — no CAIO or group CDO; the model is embedded by business line [C/R]",
   "Public caution: SEBx head Moch rules out autonomous AI decisions “for the foreseeable future” [C]",
   "Data ethics policy since 2021 commits SEB to report its use of data sources, models and AI [C]"],
  ["Multicloud: Google Cloud strategic since 2021, Microsoft Azure for security and identity [C]",
   "Co-founded Sferical AI with AstraZeneca, Ericsson, Saab and Wallenberg — 1,000+ NVIDIA GB300 GPUs [C]",
   "LLM access is indirect via secure hyperscaler hosting; no direct OpenAI, Anthropic or Mistral contract [C]",
   "Domain applications built in-house: Sensaia, a mortgage churn model, transaction monitoring [C]"],
  ["The only AI figure disclosed is a bundled “AI, regulatory & resilience +SEK 500m” line in the 2026 cost bridge [C]",
   "No quantified AI cost savings and no numeric AI target for 2027, 2028 or 2030 [ND]",
   "Legacy Aida chatbot reportedly discontinued, with no confirmed generative-AI customer chatbot successor [R]",
   "Baltic “Virtual Advisor” figures date from 2019 with no 2024–26 update found [C]"],
  ["Sensaia fully implemented in Private Wealth Management & Family Office; PWM award for AI use, April 2026 [C]",
   "~65 AI use cases in production as of Q1 2025, likened by the CFO to the 1990s internet-banking shift [R]",
   "Copilot 365 rolled out broadly during 2025; GitHub Copilot for developers with “promising efficiency gains” [C]",
   "FX desk has used AI for over three years for customer-need identification, pricing and hedging risk [C]"],
]);

// ---------------------------------------------------------------- 9 Nordnet
quad("Nordnet: ","the most quantified engineering-productivity claim in the set",[
  ["CEO Järborg names AI a top-three strategic priority, explicitly to support “nonlinear scale” [R]",
   "The April 2026 CEO transition was framed around AI in both internal processes and the customer offering [C]",
   "Deliberate anti-lock-in stance: “you don't want to tie yourself up too long” to one technology [R]",
   "No CAIO, Head of AI or CDO — AI sits embedded across the co-CTO and Data & Insights functions [C/I]"],
  ["Google Cloud single-cloud; the NordnetX platform runs ~800 microservices, hosted primarily in Finland [C]",
   "Anthropic Claude Code as the engineering tool, with a negotiated token-volume discount [R]",
   "Vertex AI used inside the data pipeline, with generative AI productionised directly in dbt [C]",
   "Product-layer AI built in-house: company insights, translation, personalisation [C]"],
  ["No AI investment figure; the CEO states AI “is probably just costing us more rather than saving us cost” [R]",
   "AI Alpha Lab is third-party content distribution — Nordnet's own disclaimer denies any involvement in it [C]",
   "No confirmed AI use in fraud, AML or credit risk at all [ND]",
   "No published AI governance framework and no EU AI Act or DORA statement [ND]"],
  ["60% of newly written code agentically co-authored with Claude Code by June 2026 [R]",
   "Cost per pull request down 14% between December 2025 and June 2026 [R]",
   "Conversational AI chatbot launched in Sweden and Norway in Q2 2026, extending to Denmark and Finland [R]",
   "AI company insights extract structured financial data from filings across 700+ instruments [R]"],
]);

// ---------------------------------------------------------------- 10 Avanza
quad("Avanza: ","buying the capability, and avoiding the AI label",[
  ["Avoids the label: its own Sigma release says “algorithm-driven”, while media coverage called it AI [C/R]",
   "CEO Unger's Annual Report letter references “internal AI tools” without quantifying them [C]",
   "No Chief Data Officer or Head of AI; CTO Fredrik Broman (2024) owns the cloud journey [C]",
   "Denmark launch (2027) described with “AI-led product development”, Copenhagen beta under way [R]"],
  ["Google Cloud only; a data mesh on Kafka, BigQuery, dbt and Looker with a custom data registry [C]",
   "Bought the algorithmic capability: Sigmastocks acquired Dec 2024 for SEK 21.1m, closed July 2025 [C]",
   "Third-party analytics integrated rather than built — Simply Wall St add-on at SEK 99 a month [C]",
   "New central “AI platform” engineering team being built in 2026 to lead AI across Avanza tech [C]"],
  ["No AI investment figure at any horizon; cloud migration and transformation costs are not AI-labelled [ND]",
   "No named foundation-model vendor anywhere in Avanza's disclosures [ND]",
   "The “Felicia” chatbot claim is unverified and may conflate with a real named Avanza employee [R]",
   "No disclosed AI use in fraud, AML, credit risk, HR, compliance, marketing or developer tooling [ND]"],
  ["Avanza Sigma launched 31 Aug 2026: SEK 1m minimum, 0.55–0.85% fee, at roughly half the market rate [C]",
   "AI summaries of quarterly reports, analyst recommendations, target prices and forward estimates, 2025 [C]",
   "Simply Wall St gives AI-generated analysis of 120,000+ companies plus earnings email summaries [C]",
   "Internal AI tools referenced for digitalising manual processes — unspecified and unquantified [C]"],
]);

// ---------------------------------------------------------------- 11 Revolut
quad("Revolut: ","challenger benchmark, outside the peer report",[
  ["Not covered by the peer report — carried over from the earlier draft on separate web sourcing [I]",
   "Positions native, in-house intelligence embedded in the core financial engine as the differentiator [R]",
   "Nordic expansion aimed at traditional banks' household deposits, not only at fintech rivals [R]",
   "Regulated as an EU bank: Revolut Bank UAB, licensed in Lithuania and ECB-supervised [C]"],
  ["Revolut Research launched August 2026 as a dedicated AI division inside a wider AI department [C]",
   "PRAGMA: proprietary model for financial trends, real-time risk and product recommendations [C/R]",
   "Fraud models built internally by the financial crime team rather than bought from a vendor [C]",
   "The only institution in this deck claiming a proprietary model rather than an application layer [I]"],
  ["AIR, the in-app assistant, is available only in the UK [R]",
   "No mortgage or corporate credit book in the Nordics, so AI is not applied to those risk decisions [I]",
   "Proprietary model claims are recent (August 2026) and largely unproven in public [I]",
   "Marketing-led disclosure is not comparable like-for-like with regulated bank reporting [I]"],
  ["AI scam detection live since February 2024; ~30% reduction in investment-related card fraud losses [C]",
   "Rita, the troubleshooting assistant, resolves over 20% of customer support requests [R]",
   "Security models review close to one billion transactions every month [R]",
   "Around 2m Nordic users today against a stated target of 3m by the end of 2026 [R]"],
]);

// ---------------------------------------------------------------- 12 cross-peer
quad("Cross-peer patterns: ","what the comparison shows across all nine institutions",[
  ["Not one of the nine publishes a standalone AI investment figure separable from broader technology spend [C/I]",
   "Where numbers exist they are bundled: Nordea EUR 600m, Danske DKK 4.5bn, OP EUR 356m, SEB SEK 500m [C]",
   "No peer has a detailed public EU AI Act or DORA statement tied to its own AI systems [ND]",
   "No peer discloses an AI-specific model risk management framework [ND]"],
  ["AWS/Bedrock camp: Nordea (Claude prominent) and Danske (OpenAI GPT-4-class base for DanskeGPT) [C/R]",
   "Microsoft Azure camp: OP (Finnish data residency), Swedbank (apparently exclusive), DNB (Copilot, identity) [C]",
   "Google Cloud camp: SEB as one leg of a multicloud, Nordnet and Avanza apparently exclusive [C]",
   "Handelsbanken is the outlier — no confirmed cloud-AI or LLM vendor at all [ND]"],
  ["A group Chief AI Officer exists at only one of the nine institutions: Danske Bank, June 2025 [C]",
   "boost.ai recurs as the default Nordic chatbot vendor — Nordea, DNB and SEB's Baltic operations [C/R]",
   "Nordea, Danske and Swedbank all tie job cuts publicly to AI while hiring AI specialists in parallel [C/R]",
   "Every bank that cites AI in headcount reduction is simultaneously running AI-specialist recruitment [C/R]"],
  ["Nordnet's 60%-of-new-code Claude Code metric is the most concrete productivity figure in the whole set [R]",
   "SEB's Sferical AI is the only direct compute-ownership bet; every other peer rents hyperscaler capacity [C]",
   "Wealth management is pursued three ways: build (SEB), acquire (Avanza), augment advisers (Nordea) [C/I]",
   "Fraud and AML is the best-evidenced use case at DNB, Swedbank, SEB and Handelsbanken [C/R]"],
], ["What no peer discloses","Cloud and model camps","Organisation and leadership","Where the peers differ most"]);

// ---------------------------------------------------------------- sources
const S = {
"Nordea (baseline)":[
 ["Capital Markets Day 2025 package and 2030 strategy release, 5 Nov 2025","nordea.com/en/doc/cmd2025-full-package-final.pdf"],
 ["“Nordea to book restructuring costs to execute its 2030 strategy”, 17 Mar 2026","nordea.com/en/press/2026-03-17/"],
 ["“Frank Vang-Jensen: we want to position Nordea as the winner also beyond 2030”, 3 Jun 2026","nordea.com/en/news/"],
 ["“Nordea and Aalto University to explore the future of AI…”, ~21 May 2026","nordea.com/en/news/"],
 ["Hyperight, “Banking on AI: from POC to 10,000 users”, 5 Dec 2025","hyperight.com/banking-on-ai-nordea-poc-to-10000-users/"],
 ["boost.ai, Nordea conversational AI case study (Nova, 12 agents)","boost.ai/case-studies/nordea-employs-comprehensive-conversational-ai-strategy-to-scale-customer-service/"]],
"OP Pohjola":[
 ["Half-year Financial Report H1 2026, GlobeNewswire, 23 Jul 2026","globenewswire.com/news-release/2026/07/23/"],
 ["Automaatioväylä, CTO Kasimir Hirn on “AI first”, 10 Feb 2026","automaatiovayla.fi/artikkelit/op-kehittaa-asiakaspalveluaan-tekoalyn-avulla/"],
 ["Ritakallio, Aalto Finance Alumni Quarterly (OP Aina launch), 8 Aug 2025","alumni.aalto.finance/quarterly/2025/q2/senior-guest"],
 ["Microsoft News Center Finland, OP Azure migration, 22 Aug 2023","news.microsoft.com/fi-fi/2023/08/22/"],
 ["Osuustoiminta-lehti, “OP Ryhmä investoi pilveen ja tekoälyyn”, 22 Jan 2025","otlehti.fi/2025/01/22/op-ryhma-investoi-pilveen-ja-tekoalyyn/"],
 ["OP / Accenture / Noren, “Unlocking AI value in Finnish organisations”, 2026","mb.cision.com/Public/13697/4355209/827a9e9cb7b6e913.pdf"]],
"Danske Bank":[
 ["Company Announcement No. 22/2026 (technology and AI as core enablers), 30 Apr 2026","danskebank.com/news-and-insights/news-archive/company-announcements/2026/ca30042026"],
 ["“Danske Bank further strengthens Generative AI focus…” (CAIO appointment), 16 Jun 2025","danskebank.com/news-and-insights/news-archive/news/2025/16062025"],
 ["Danske Bank / AWS agreement extension (Bedrock, AgentCore), 30 Jun 2026","danskebank.com/news-and-insights/news-archive/news/2026/30062026"],
 ["Evident Insights, interview with Richard Davis and Kasper Tjørntved Davidsen, 13 May 2026","evidentinsights.com/bankingbrief/denmarks-ai-bank-shot-an-interview-with-richard-davis-and-kasper-tjrntved-davidsen"],
 ["“Danske Bank appoints Fiona Browne as its first head of AI”, 9 Jan 2026","danskebank.co.uk/about-us/news-and-insights/2026/danske-appoints-first-head-of-ai"],
 ["“Danske Bank increases investments in generative AI” (DanskeGPT), 14 Mar 2024","danskebank.com/news-and-insights/news-archive/news/2024/14032024"]],
"DNB":[
 ["DNB Group Annual Report 2025, 11 Mar 2026","ir.dnb.no"],
 ["BankShift.no investigative feature on the “Radical AI” lab, 6 Mar 2026","bankshift.no"],
 ["boost.ai, DNB case studies (Aino, Juno, Hugo, Fix)","boost.ai/case-studies/ai-chatbot-banking/"],
 ["DNB Capital Markets Day 2024 presentation, 19 Nov 2024","ir.dnb.no"],
 ["Regjeringen.no, “AI Norway” framework launched at DNB's AI lab, 26 Mar 2025","regjeringen.no"]],
"Swedbank":[
 ["Q2 2026 earnings call transcript (CEO and CFO on AI), 17 Jul 2026","swedbank.com/investor-relations"],
 ["Investor Day 2025, “Swedbank 15/27”, 4 Jun 2025","swedbank.com/newsroom"],
 ["“How Swedbank uses AI”","swedbank.com/about-swedbank/how-swedbank-uses-ai.html"],
 ["AI Sweden partnership announcement (Markus Reimegård), 19 Jun 2025","ai.se"],
 ["Realtid, “Europas banker lyfter AI till toppen – Sverige väljer en annan väg”, 12 Aug 2026","realtid.se"],
 ["Hopsworks / NVIDIA and Swedbank, GAN-based fraud detection technical blog","hopsworks.ai"]],
"Svenska Handelsbanken":[
 ["Q4 2025 / FY2025 earnings call, CEO Michael Green on AI, 4 Feb 2026","handelsbanken.com/en/investor-relations"],
 ["Q2 2026 earnings commentary on IT development spend and AI use cases","handelsbanken.com/en/investor-relations"],
 ["AI Sweden, AMLGentex federated-learning AML project","ai.se"],
 ["jobs.handelsbanken.co.uk, UK “Efficiency and Automation” AI postings","jobs.handelsbanken.co.uk"]],
"SEB":[
 ["Annual accounts and Q4 2025 results, CEO letter on AI, 29 Jan 2026","sebgroup.com/press/press-releases/2026/sebs-annual-accounts-and-results-for-the-fourth-quarter-2025"],
 ["“Award-winning AI frees up time for proactive client interaction” (Sensaia), 24 Apr 2026","sebgroup.com/press/news/2026/award-winning-ai-frees-up-time-for-proactive-client-interaction"],
 ["“SEB co-founds new Sferical AI” (NVIDIA GB300 joint venture), 22 Aug 2025","sebgroup.com/press/press-releases/2025"],
 ["“Essential to be forward-leaning on AI, but caution is needed”, 12 Feb 2025","sebgroup.com/press/news/2025"],
 ["Investing.com, SEB Q2 2026 earnings call transcript, 15 Jul 2026","investing.com"],
 ["SEB customer data ethics policy, 28 Jun 2021","sebgroup.com/press/press-releases/2021"]],
"Nordnet":[
 ["Investing.com, Nordnet Q2 2026 earnings call transcript (Claude Code, chatbot), ~17 Jul 2026","investing.com"],
 ["“Rasmus Järborg assumes the role as CEO of Nordnet”, 1 Apr 2026","nordnetab.com"],
 ["Google Cloud customer case study, Nordnet (NordnetX platform)","cloud.google.com/customers/nordnet"],
 ["Nordnet Tech (Medium), “Productionise genAI directly in dbt”","medium.com/nordnet-tech"],
 ["Nordnet Denmark blog, “Nyt i 2025: de største nyheder og features”","nordnet.dk/blog/nyt-i-2025-de-stoerste-nyheder-og-features-hos-nordnet"]],
"Avanza":[
 ["“Avanza lanserar algoritmstyrd aktieförvaltning” (Avanza Sigma), 31 Aug 2026","investors.avanza.se/media/press/2026/"],
 ["“Avanza har Sveriges nöjdaste sparare – för 16:e året i rad” (AI summaries), 1 Dec 2025","investors.avanza.se/media/press/2025/"],
 ["Sigmastocks acquisition announcement, 20 Dec 2024","investors.avanza.se/media/press/2024/"],
 ["Avanza careers, “Engineering Manager till vår nya AI-plattform”, 22 May 2026","career.avanza.se"],
 ["Annual and Sustainability Report 2025, 13 Mar 2026","investors.avanza.se"],
 ["Google Cloud customer case study, Avanza","cloud.google.com/customers/avanza"]],
"Revolut (outside the peer report)":[
 ["“Revolut launches AI feature to protect customers from card scams”","revolut.com/news/"],
 ["“Launch of dedicated AI research division: Revolut Research”, Aug 2026","revolut.com/news/revolut_announces_launch_of_dedicated_ai_research_division_revolut_research/"],
 ["FinTech Futures, “Revolut debuts AI research unit…” (PRAGMA)","fintechfutures.com/ai-in-fintech/"],
 ["Bloomberg, “Revolut faces off with Klarna in Nordic fintech push for 3 million users”, Nov 2025","bloomberg.com/news/articles/2025-11-06/"],
 ["Bank of Lithuania, “Banking licence granted to Revolut Bank UAB”","lb.lt/en/news/banking-licence-granted-to-revolut-bank-uab"]],
};

function srcSlide(sub, left, right, tail){
  const s=pres.addSlide(); chrome(s);
  title2(s,"Sources ", sub);
  [[left,0.5],[right,6.78]].forEach(([groups,x])=>{
    let y=1.02;
    groups.forEach(g=>{
      s.addText(g,{x:x,y:y,w:6.05,h:0.22,isTextBox:true,margin:0,fontFace:F,fontSize:9.5,bold:true,color:NAVY,valign:"middle"});
      y+=0.25;
      S[g].forEach(([t,u])=>{
        s.addText([{text:"– "+t,options:{fontSize:8,color:INK,breakLine:true}},
                   {text:"   "+u,options:{fontSize:6.5,color:URLC}}],
          {x:x+0.05,y:y,w:6.0,h:0.34,isTextBox:true,margin:0,fontFace:F,valign:"top",lineSpacingMultiple:1.0});
        y+=0.345;
      });
      y+=0.1;
    });
  });
  if(tail){
    s.addText("Underlying research",{x:6.78,y:1.02,w:6.05,h:0.22,isTextBox:true,margin:0,fontFace:F,fontSize:9.5,bold:true,color:NAVY,valign:"middle"});
    s.addText(tail,{x:6.83,y:1.32,w:6.0,h:2.6,isTextBox:true,margin:0,fontFace:F,fontSize:8.5,color:INK,valign:"top",lineSpacingMultiple:1.05});
  }
  return s;
}

srcSlide("(1 of 3) — company primary sources unless otherwise stated, as at September 2026",
  ["Nordea (baseline)","OP Pohjola"], ["Danske Bank","DNB"]);
srcSlide("(2 of 3)", ["Swedbank","Svenska Handelsbanken"], ["SEB","Nordnet"]);
srcSlide("(3 of 3)", ["Avanza","Revolut (outside the peer report)"], [],
  "– “Nordic/Baltic Peer Comparison: AI Activities vs. Nordea”, prepared for Nordea, September 2026. Every claim in that report carries its own [Confirmed] / [Reported] / [Inferred] label and a per-company source list; the labels on these pages are carried over unchanged, with [ND] added where the report records that a fact was searched for and not found.\n\n– Revolut is not part of that report. Its page is sourced separately from public web research and is flagged as such wherever it appears.");

pres.writeFile({fileName: process.argv[2] || "peer2.pptx"}).then(f=>console.log("wrote",f));
