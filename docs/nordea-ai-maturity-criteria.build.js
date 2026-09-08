const pptxgen = require("pptxgenjs");
const NAVY="000080", BRAND="0000A0", INK="1A1A1A", GREY="A6A6A6",
      CELL="F2F2F2", LINE="BFBFBF", F="Arial";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.title = "Criteria for assessing competitors' AI maturity";

function chrome(s){
  s.background={color:"FFFFFF"};
  s.addText("Confidential",{x:4.5,y:7.12,w:4.33,h:0.22,isTextBox:true,margin:0,align:"center",
    fontFace:F,fontSize:7.5,color:GREY,valign:"middle"});
  s.addText("Nordea",{x:10.9,y:6.78,w:1.93,h:0.38,isTextBox:true,margin:0,align:"right",
    fontFace:F,fontSize:18,bold:true,color:BRAND,valign:"middle"});
}

// Harvey ball: white circle + black pie wedge for the filled fraction + outline on top
function ball(s,cx,cy,d,f){
  const x=cx-d/2, y=cy-d/2;
  s.addShape(pres.ShapeType.ellipse,{x,y,w:d,h:d,fill:{color:"FFFFFF"},line:{color:"000000",width:0.9}});
  if(f>=1){
    s.addShape(pres.ShapeType.ellipse,{x,y,w:d,h:d,fill:{color:"000000"},line:{color:"000000",width:0.9}});
  } else if(f>0){
    const sweep=360*f;
    const wedges = sweep<=90 ? [[270,270+sweep]] : [[270,360],[0,Math.round(sweep-90)]];
    wedges.forEach(w=>s.addShape(pres.ShapeType.pie,{x,y,w:d,h:d,
      angleRange:[Math.round(w[0]),Math.round(w[1])],fill:{color:"000000"},line:{color:"000000",width:0.5}}));
    s.addShape(pres.ShapeType.ellipse,{x,y,w:d,h:d,fill:{type:"none"},line:{color:"000000",width:0.9}});
  }
}

// ------------------------------------------------------------------ slide 1
const s1 = pres.addSlide(); chrome(s1);

const crit=[
 ["Tenure: ","the organisation's progression on its AI journey — from traditional AI/ML with GenAI still in pilot, to years of sustained development that let GenAI scale quickly"],
 ["Reach: ","how far into the value chain AI has been deployed — from internal-only pilots to conversational AI embedded directly in the client interface"],
 ["Capability: ","the depth of organisational skill and ownership behind AI — from limited in-house expertise to dedicated, scaled AI capability and partnerships"],
];
crit.forEach((c,i)=>{
  s1.addText([{text:(i+1)+". ",options:{color:GREY}},
              {text:c[0],options:{bold:true,color:"595959"}},
              {text:c[1],options:{color:"595959"}}],
    {x:0.21,y:0.16+i*0.155,w:12.9,h:0.15,isTextBox:true,margin:0,fontFace:F,fontSize:7.5,valign:"middle"});
});

const LEV=[["Not defined / low",0],["Emerging",0.25],["Established",0.5],["Advanced",0.75],["Leading",1]];
let lx=0.55;
LEV.forEach(([lab,f],i)=>{
  ball(s1,lx,0.72,0.11,f);
  s1.addText(lab+(i<4?"   |":""),{x:lx+0.09,y:0.62,w:1.75,h:0.2,isTextBox:true,margin:0,
    fontFace:F,fontSize:8,color:"595959",valign:"middle"});
  lx+=1.62;
});

s1.addText("Criteria for assessing competitors\u2019 AI maturity",{x:0.71,y:0.9,w:9,h:0.45,
  isTextBox:true,margin:0,fontFace:F,fontSize:23,bold:true,color:NAVY,valign:"middle"});

s1.addShape(pres.ShapeType.line,{x:3.62,y:1.42,w:0,h:5.54,line:{color:LINE,width:1}});

const COLS=[
 {h:"Tenure", sub:"Organisation's progression on its AI journey", bx:4.21, cx:3.95,
  cells:[
   "Decade-plus continuum from ML to GenAI to agents; new use cases scale in weeks, not quarters",
   "Years of sustained build; a platform layer lets new GenAI cases scale without rebuilding each time",
   "GenAI out of pilot and into named production use cases, but scaling is still case by case",
   "Traditional ML in production; GenAI limited to individual efficiency tools and internal pilots",
   "Isolated analytics only; no GenAI beyond experimentation and nothing on the strategy agenda"]},
 {h:"Reach", sub:"How far into the value chain AI has been deployed", bx:7.25, cx:6.99,
  cells:[
   "AI inside core revenue and risk flows — credit, advice, payments — reaching the customer",
   "Customer-facing AI live in core markets: conversational agents, in-app personalisation",
   "Employee-facing assistants at scale; customers feel it indirectly, through the adviser",
   "Internal only — individual productivity licences and back-office automation",
   "Nothing deployed to employees or customers; experimentation with no route to production"]},
 {h:"Capability", sub:"Depth of organisational skill and ownership behind AI", bx:10.29, cx:10.03,
  cells:[
   "Proprietary models or owned compute, a dedicated research function, AI used as an employer brand",
   "Executive-level owner, in-house platform and governance layer, workforce trained at scale",
   "Named AI unit with a group-wide remit, defined governance and a hyperscaler partnership",
   "Small central data-science team; delivery leans on consultants; no group-wide governance",
   "No named owner; capability sits with individual enthusiasts or entirely with vendors"]},
];
const ROWY=[2.75,3.66,4.56,5.47,6.38];
const FILL=[1,0.75,0.5,0.25,0];

s1.addText("Ambition level",{x:0.71,y:1.5,w:2.6,h:0.32,isTextBox:true,margin:0,
  fontFace:F,fontSize:16,bold:true,color:NAVY,valign:"middle"});
s1.addShape(pres.ShapeType.line,{x:0.68,y:2.25,w:0,h:4.5,
  line:{color:NAVY,width:2.25,beginArrowType:"triangle"}});
s1.addText("High ambition",{x:0.83,y:2.16,w:2,h:0.22,isTextBox:true,margin:0,fontFace:F,fontSize:11,color:INK,valign:"middle"});
s1.addText("Low ambition",{x:0.83,y:6.62,w:2,h:0.22,isTextBox:true,margin:0,fontFace:F,fontSize:11,color:INK,valign:"middle"});

const LEVNAME=["Leading","Advanced","Established","Emerging","Not defined / low"];
LEVNAME.forEach((n,i)=>{
  s1.addText(n,{x:1.05,y:ROWY[i]-0.13,w:2.3,h:0.26,isTextBox:true,margin:0,
    fontFace:F,fontSize:11.5,bold:true,color:NAVY,valign:"middle"});
});

COLS.forEach(c=>{
  s1.addText(c.h,{x:c.bx-0.44,y:1.5,w:2.9,h:0.32,isTextBox:true,margin:0,
    fontFace:F,fontSize:16,bold:true,color:NAVY,valign:"middle"});
  s1.addText(c.sub,{x:c.bx-0.44,y:1.9,w:2.7,h:0.44,isTextBox:true,margin:0,
    fontFace:F,fontSize:10.5,color:INK,valign:"top"});
  c.cells.forEach((t,i)=>{
    ball(s1,c.cx,ROWY[i],0.19,FILL[i]);
    s1.addShape(pres.ShapeType.rect,{x:c.bx,y:ROWY[i]-0.3,w:2.23,h:0.6,fill:{color:CELL},line:{color:CELL,width:0.25}});
    s1.addText(t,{x:c.bx+0.07,y:ROWY[i]-0.28,w:2.09,h:0.56,isTextBox:true,margin:0,
      fontFace:F,fontSize:8,color:INK,valign:"middle",lineSpacingMultiple:0.95});
  });
});

// ------------------------------------------------------------------ slide 2
const s2 = pres.addSlide(); chrome(s2);
s2.addText([{text:"Applying the scale: ",options:{color:"2E9BD6",bold:true}},
            {text:"how to score consistently, and where scoring goes wrong",options:{color:NAVY,bold:true}}],
  {x:0.5,y:0.3,w:12.33,h:0.42,isTextBox:true,margin:0,fontFace:F,fontSize:15,valign:"middle"});

const Q=[
 ["Evidence thresholds",[
  "Score what is published and dated — never what is plausible for an institution of that size",
  "A level needs evidence at that level from the last 24 months; older evidence scores one level down",
  "Vendor case studies and consultancy write-ups can support Established at most, never Leading",
  "Where nothing is published, score Not defined / low and record it as a disclosure gap"]],
 ["Ambition versus evidence",[
  "Score ambition and demonstrated maturity separately — the gap between them is the finding",
  "Ambition: strategy language, board-level targets, named horizons, executive sponsorship",
  "Maturity: products live, volumes, adoption rates, quantified outcomes",
  "High ambition on thin evidence is a communications position, not a capability"]],
 ["Common traps",[
  "Absence of disclosure is not absence of capability — the quietest peer is not the least capable",
  "Stale flagship metrics: a 2016–18 chatbot statistic is not evidence of 2026 maturity",
  "Bundled investment figures (technology + AI + advisory) cannot be read as AI spend",
  "Awards and index placements measure communication at least as much as capability"]],
 ["Scoring discipline",[
  "Three scores per competitor, one per dimension — resist averaging them into a single number",
  "Record the single strongest piece of evidence behind each score, with its date and source",
  "Re-score on a fixed cycle tied to reporting, not whenever news happens to land",
  "Two assessors score independently and reconcile; disagreement usually means the evidence is thin"]],
];
const BX=[0.5,6.78], BY=[1.05,3.82], BW=6.05, BH=2.62;
Q.forEach(([h,bul],i)=>{
  const x=BX[i%2], y=BY[Math.floor(i/2)];
  s2.addShape(pres.ShapeType.rect,{x,y,w:BW,h:BH,fill:{color:"FFFFFF"},line:{color:LINE,width:0.75}});
  s2.addText(h,{x:x+0.11,y:y+0.05,w:BW-0.22,h:0.26,isTextBox:true,margin:0,
    fontFace:F,fontSize:10.5,bold:true,color:NAVY,valign:"middle"});
  s2.addText(bul.map((b,j)=>({text:b,options:{bullet:{indent:12},breakLine:j<bul.length-1,paraSpaceAfter:6}})),
    {x:x+0.14,y:y+0.36,w:BW-0.3,h:BH-0.46,isTextBox:true,margin:0,
     fontFace:F,fontSize:9.5,color:INK,valign:"top",lineSpacingMultiple:1.0});
});

pres.writeFile({fileName:process.argv[2]||"crit.pptx"}).then(f=>console.log("wrote",f));
