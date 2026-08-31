#!/usr/bin/env node
"use strict";

/*
 * Rebuilds page 1 and appends/replaces two professional-handoff annex pages in
 * each review PDF. Audited technical pages 2..n remain byte-for-byte page copies;
 * repeated runs replace the prior annex instead of growing the file indefinitely.
 */

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");
const { chromium } = require("playwright");

const HERE = __dirname;
const PKG = path.resolve(HERE, "../../..");
const DRAWINGS = path.join(PKG, "drawings");
const FIGURES = path.join(PKG, "assets/figures");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const QPDF = "/opt/homebrew/bin/qpdf";
const FONT_CSS = path.join(HERE, "noto-cjk-subset.css");
const FEASIBILITY = JSON.parse(fs.readFileSync(path.join(HERE, "p0-pre-feasibility-envelope.json"), "utf8"));
const HANDOFF = JSON.parse(fs.readFileSync(path.join(HERE, "implementation-handoff-register.json"), "utf8"));

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

if (!Array.isArray(HANDOFF.implementation_scheme_module_register) ||
    HANDOFF.implementation_scheme_module_register.length !== 11 ||
    HANDOFF.implementation_policy_basis.programme_level_mapping_ratio !== 1 ||
    HANDOFF.implementation_policy_basis.external_module_receipt_count !== 0 ||
    !Array.isArray(HANDOFF.formal_cost_method.method_steps) ||
    HANDOFF.formal_cost_method.method_steps.length !== 6 ||
    HANDOFF.formal_cost_method.formal_unit_rate_receipt_count !== 0 ||
    HANDOFF.formal_cost_method.comparable_vendor_quote_count !== 0 ||
    HANDOFF.formal_cost_method.approved_budget_cny !== null) {
  fail("implementation-policy or formal-cost boundary drifted");
}

for (const needed of [CHROME, QPDF, FONT_CSS]) {
  if (!fs.existsSync(needed)) fail(`missing dependency: ${needed}`);
}

function fileUrl(file) {
  return `file://${encodeURI(file)}`;
}

const copy = {
  zh: {
    lang: "zh-CN",
    codeA3: "JZ / 01 · 投稿材料首页",
    codeA0: "B / 01 · 投稿材料展板",
    title: "京张交接线",
    thesis: "一梳三场 · 两翼八支 · 二十单元",
    lead: "把废弃铁路变成一把伸向城市两翼的公共梳：AI 生产空间与可进入、可停用、有人负责的公共服务沿线成对生长。",
    overall: "总体骨架 / 一条公共脊缝合两翼",
    sections: "重点设计 / 三座交接场形成三种城市性格",
    metrics: [
      ["9.5 km", "连续公共脊"], ["8", "东西缝合支线"], ["20", "产业／公共成对单元"],
      ["6 × 6 m", "P0 可撤工作面"], ["8 + 3", "公众上限＋在岗角色"], ["0 / 12", "现场任务；待授权"],
    ],
    p0Label: "P0 五级参考图纸链 / 参赛者预可研，不是测绘、报价或批准预算",
    p0Line: "1:500—1:20 · 7.2 × 7.2 m 控制 / 6 × 6 m 可撤面 · 8 + 3 + 6 · 90 天约 12万—29万元 · 年运维约 30万—65万元 · 四个回退",
    evidenceLine: "离线 12/12 · 接管 48/48｜现场 0/12 · 门回执 0/12 · 报价 0/3 · 保险/正式预算 NULL · 签认 0",
    strip: "机器空间由北向南逐段退场；人工窗口、连续步行面、轨道线索与绿荫始终存在。",
    boundary: "临时边界 / 概念尺寸 / 非道路红线、权属、批准或已建事实",
    package: "JING-ZHANG HANDOVER LINE / PACKAGE v2.0",
  },
  en: {
    lang: "en",
    codeA3: "JZ / 01 · SUBMISSION COVER",
    codeA0: "B / 01 · SUBMISSION BOARD",
    title: "JING-ZHANG HANDOVER LINE",
    thesis: "ONE COMB · THREE YARDS · EIGHT TEETH · TWENTY PAIRED CELLS",
    lead: "Turn the disused railway into a civic comb: AI production space and an enterable, stoppable, staffed public service grow in pairs along one continuous spine.",
    overall: "URBAN FRAME / ONE PUBLIC SPINE STITCHES BOTH SIDES",
    sections: "KEY DESIGN / THREE YARDS, THREE URBAN CHARACTERS",
    metrics: [
      ["9.5 km", "continuous public spine"], ["8", "east-west stitch links"], ["20", "industry / civic paired cells"],
      ["6 × 6 m", "P0 reversible patch"], ["8 + 3", "public cap + role seats"], ["0 / 12", "field tasks; authority pending"],
    ],
    p0Label: "P0 FIVE-SCALE REFERENCE CHAIN / PARTICIPANT PRE-FEASIBILITY · NOT SURVEY, QUOTES OR APPROVED BUDGET",
    p0Line: "1:500–1:20 · 7.2 × 7.2 m CONTROL / 6 × 6 m REVERSIBLE · 8 + 3 + 6 · CNY 0.12–0.29m / 90 DAYS · CNY 0.30–0.65m / YEAR · 4 FALLBACKS",
    evidenceLine: "OFFLINE 12/12 · TAKEOVER 48/48 | FIELD 0/12 · GATE RECEIPTS 0/12 · QUOTES 0/3 · INSURANCE / FORMAL BUDGET NULL · SIGN-OFF 0",
    strip: "Machine space recedes from north to south; the staffed counter, continuous path, rail trace and shade remain.",
    boundary: "PROVISIONAL EXTENT / CONCEPT DIMENSIONS / NOT A REDLINE, TITLE, APPROVAL OR AS-BUILT CLAIM",
    package: "JING-ZHANG HANDOVER LINE / PACKAGE v2.0",
  },
};

const handoffCopy = {
  zh: {
    lang: "zh-CN",
    code: "F / 06 · 专业实施交接附页",
    title: "从 1:500 筛查到 1:20 接口",
    lead: "不是用一张概念桌替代工程设计，而是把场地筛查、十一类实施方案、六步正式计价、专业深化、采购运营与开放关闭拆成可复算、可拒收、可交给未来责任方接续的证据链。",
    cards: [
      ["5 / 4", "图纸尺度／释放状态"], ["9 / 6 / 11", "项目／交付包／物理运营模块"],
      ["11 / 6 / 12", "实施方案类目／计价步骤／文件闸门"], ["12 / 16 / 8", "角色／未计价数量／现可判验收"],
    ],
    hold: "实施方案外部回执 0 · 文件门回执 0/12 · 正式单价 0 · 报价 0/3 · 批准预算 NULL · 具名任命 0 · 真实现场任务 0",
    boundary: "参赛者专业交接接口与未来政策／计价方法映射，不是报审、测绘、正式工程量清单、报价、预算、许可、专业签认、施工、开放或现场绩效。",
  },
  en: {
    lang: "en",
    code: "F / 06 · PROFESSIONAL IMPLEMENTATION HANDOFF ANNEX",
    title: "FROM 1:500 SCREENING TO 1:20 INTERFACES",
    lead: "The concept table does not substitute for engineering design. Siting, eleven implementation-plan classes, a six-step formal cost method, coordinated design, procurement, operation, opening and closeout are decomposed into recalculable and rejectable interfaces.",
    cards: [
      ["5 / 4", "drawing scales / release states"], ["9 / 6 / 11", "projects / packages / physical-operating modules"],
      ["11 / 6 / 12", "plan classes / cost steps / documentary gates"], ["12 / 16 / 8", "roles / unpriced lines / judgeable-now checks"],
    ],
    hold: "EXTERNAL PLAN RECEIPTS 0 · GATE RECEIPTS 0/12 · FORMAL RATES 0 · QUOTES 0/3 · APPROVED BUDGET NULL · NAMED APPOINTMENTS 0 · FIELD TASKS 0",
    boundary: "Participant handoff and future policy/cost-method mapping—not filing, survey, formal bill of quantities, quotation, budget, permit, professional sign-off, construction, opening or field performance.",
  },
};

const readinessCopy = {
  zh: {
    lang: "zh-CN",
    code: "F / 07 · 运营就绪控制附页",
    title: "三席四人排班，双钥匙才开层",
    lead: "在没有真实场地时，先把岗位工作量、双重否决、逐包验收、失败回退、调试退役和未来采样表做到可复算、可拒收；所有任命、执行与观察继续保持为零。",
    cards: [
      ["3,000 → 2.143 → 3", "岗位小时／FTE 下限／规划 FTE"], ["4 / 0", "最少轮休人数／当前具名人员"],
      ["2 / 0", "所需独立钥匙／有效回执"], ["6 / 4 / 8 / 5×7", "逐包验收／具名回退／调试检查／未来基线"],
    ],
    hold: "任命回执 0 · 有效钥匙 0/2 · 调试执行 0/8 · 授权参与者 0 · 现场观察 0 · 值 NULL",
    boundary: "参赛者运营准备度设计，不是劳动合同、主体任命、调试记录、现场观察、报价、预算、许可或专业签认。",
  },
  en: {
    lang: "en",
    code: "F / 07 · OPERATING-READINESS CONTROL ANNEX",
    title: "THREE SEATS · FOUR PEOPLE · TWO KEYS TO OPEN",
    lead: "Without a real site, workload, dual veto, package acceptance, failure fallback, commissioning/retirement and future sampling forms are made recalculable and rejectable while appointments, execution and observations remain zero.",
    cards: [
      ["3,000 → 2.143 → 3", "seat-hours / FTE floor / planning FTE"], ["4 / 0", "minimum roster people / named people"],
      ["2 / 0", "required independent keys / valid receipts"], ["6 / 4 / 8 / 5×7", "package tests / fallbacks / checks / future baseline"],
    ],
    hold: "APPOINTMENT RECEIPTS 0 · VALID KEYS 0/2 · EXECUTED 0/8 · AUTHORISED PARTICIPANTS 0 · FIELD OBSERVATIONS 0 · VALUES NULL",
    boundary: "Participant operating-readiness design—not employment, appointment, commissioning record, field observation, quotation, budget, permit or professional sign-off.",
  },
};

function html(lang, format, totalPages) {
  const t = copy[lang];
  const isA3 = format === "a3";
  const page = isA3 ? "420mm 297mm" : "841mm 1189mm";
  const size = isA3 ? "width:420mm;height:297mm" : "width:841mm;height:1189mm";
  const overall = fileUrl(path.join(FIGURES, `site-overview${lang === "en" ? ".en" : ""}.png`));
  const sections = fileUrl(path.join(FIGURES, `key-areas${lang === "en" ? ".en" : ""}.png`));
  const fontCss = fs.readFileSync(FONT_CSS, "utf8");
  const cards = t.metrics.map(([n, label], i) => `<div class="metric m${i}"><b>${n}</b><span>${label}</span></div>`).join("");
  const formalBudget = FEASIBILITY.participant_cost_sensitivity_90_day.formal_budget_cny;
  if (formalBudget !== null || FEASIBILITY.current_external_evidence.market_quotes_received !== 0) {
    fail("P0 PDF must retain null formal budget and zero real quotations");
  }
  return `<!doctype html>
<html lang="${t.lang}"><head><meta charset="utf-8"><style>
${fontCss}
@page{size:${page};margin:0}*{box-sizing:border-box}html,body{margin:0;${size};overflow:hidden}
body{--coal:#171a18;--ink:#262b28;--bone:#f2eddf;--paper:#fbf8ef;--grid:#d8d1c2;--muted:#606560;--red:#c72d1e;--redfill:#e64b3c;--cyan:#00746f;--cyanfill:#00a79f;--yellow:#83660a;--yellowfill:#f1c64a;position:relative;color:var(--ink);background:var(--bone);font-family:JZHandoverCJK,sans-serif;background-image:linear-gradient(#d8d1c288 1px,transparent 1px),linear-gradient(90deg,#d8d1c288 1px,transparent 1px)}
body.a3{padding:15mm 18mm 11mm;background-size:10mm 10mm}body.a0{padding:34mm 42mm 28mm;background-size:20mm 20mm}
.head{display:grid;grid-template-columns:1fr auto;gap:12mm;align-items:start;border-bottom:1.2mm solid var(--redfill)}
.a3 .head{height:58mm;padding-bottom:5mm}.a0 .head{height:150mm;padding-bottom:12mm}
.code{font-weight:800;letter-spacing:.16em;color:var(--red);text-transform:uppercase}.a3 .code{font-size:3.8mm}.a0 .code{font-size:8mm}
h1{margin:2.4mm 0 0;line-height:.92;letter-spacing:-.055em}.a3 h1{font-size:${lang === "zh" ? "19mm" : "13.5mm"}}.a0 h1{font-size:${lang === "zh" ? "44mm" : "30mm"}}
.thesis{align-self:end;text-align:right;font-weight:900;color:var(--red);line-height:1.12}.a3 .thesis{font-size:${lang === "zh" ? "6.7mm" : "4.5mm"};max-width:145mm}.a0 .thesis{font-size:${lang === "zh" ? "16mm" : "11mm"};max-width:360mm}
.lead{color:var(--muted);font-weight:500;line-height:1.58}.a3 .lead{margin:4mm 0 0;font-size:${lang === "zh" ? "4.2mm" : "3.5mm"};max-width:240mm}.a0 .lead{margin:9mm 0 0;font-size:${lang === "zh" ? "9.2mm" : "7.2mm"};max-width:610mm}
.plates{display:grid}.a3 .plates{grid-template-columns:1fr 1fr;gap:7mm;height:124mm;margin-top:6mm}.a0 .plates{grid-template-rows:minmax(0,1fr) minmax(0,1fr);gap:15mm;height:700mm;margin-top:15mm}
.plate{margin:0;display:flex;flex-direction:column;min-width:0;min-height:0;overflow:hidden;background:var(--paper);border:.55mm solid var(--coal);padding:3mm}.a0 .plate{padding:7mm;border-width:1.1mm}
.plate figcaption{display:flex;align-items:center;min-height:9mm;font-weight:900;color:var(--red);letter-spacing:.045em;text-transform:uppercase}.a3 .plate figcaption{font-size:${lang === "zh" ? "3.7mm" : "3.1mm"}}.a0 .plate figcaption{min-height:22mm;font-size:${lang === "zh" ? "8.5mm" : "6.8mm"}}
.plate img{display:block;width:100%;height:calc(100% - 9mm);min-height:0;object-fit:contain;background:var(--bone)}.a0 .plate img{height:calc(100% - 22mm)}
.metrics{display:grid;grid-template-columns:repeat(6,1fr)}.a3 .metrics{gap:3mm;height:28mm;margin-top:6mm}.a0 .metrics{gap:8mm;height:75mm;margin-top:15mm}
.metric{background:var(--paper);border-top:2mm solid var(--redfill);padding:3mm}.metric:nth-child(2),.metric:nth-child(5){border-color:var(--cyanfill)}.metric:nth-child(3),.metric:nth-child(6){border-color:var(--yellowfill)}.a0 .metric{border-top-width:4mm;padding:8mm}
.metric b{display:block;line-height:1;color:var(--red)}.metric:nth-child(2) b,.metric:nth-child(5) b{color:var(--cyan)}.metric:nth-child(3) b,.metric:nth-child(6) b{color:var(--yellow)}.a3 .metric b{font-size:5.4mm}.a0 .metric b{font-size:13mm}
.metric span{display:block;color:var(--muted);line-height:1.16}.a3 .metric span{font-size:${lang === "zh" ? "2.45mm" : "2.05mm"};margin-top:1.5mm}.a0 .metric span{font-size:${lang === "zh" ? "5.8mm" : "4.8mm"};margin-top:4mm}
.p0{display:grid;grid-template-columns:1fr auto;align-items:center;background:var(--coal);color:var(--paper);border-left:2mm solid var(--redfill)}.a3 .p0{height:20mm;margin-top:4mm;padding:2.4mm 4mm;gap:5mm}.a0 .p0{height:70mm;margin-top:10mm;padding:9mm 12mm;gap:15mm;border-left-width:5mm}.p0 b{display:block;color:var(--yellowfill);letter-spacing:.035em}.a3 .p0 b{font-size:${lang === "zh" ? "3.05mm" : "2.45mm"}}.a0 .p0 b{font-size:${lang === "zh" ? "7mm" : "5.7mm"}}.p0 span{display:block;line-height:1.35}.a3 .p0 span{font-size:${lang === "zh" ? "2.65mm" : "2.15mm"};margin-top:1.3mm}.a0 .p0 span{font-size:${lang === "zh" ? "6.2mm" : "5mm"};margin-top:4mm}.p0 .state{text-align:right;color:var(--redfill);font-weight:800;line-height:1.35}.a3 .p0 .state{font-size:2.2mm;max-width:118mm}.a0 .p0 .state{font-size:5.2mm;max-width:280mm}
.foot{display:grid;grid-template-columns:1fr auto;align-items:end;border-top:.6mm solid var(--redfill);color:var(--muted)}.a3 .foot{height:12mm;margin-top:3mm;padding-top:2mm;font-size:2.45mm}.a0 .foot{height:45mm;margin-top:8mm;padding-top:6mm;font-size:5.8mm;border-top-width:1.2mm}.foot strong{display:block;color:var(--coal);margin-bottom:1mm}.package{text-align:right;font-weight:800;letter-spacing:.06em;color:var(--coal)}
</style></head><body class="${format}">
<header class="head"><div><div class="code">${isA3 ? t.codeA3 : t.codeA0}</div><h1>${t.title}</h1><p class="lead">${t.lead}</p></div><div class="thesis">${t.thesis}</div></header>
<main class="plates"><figure class="plate"><figcaption>${t.overall}</figcaption><img src="${overall}"></figure><figure class="plate"><figcaption>${t.sections}</figcaption><img src="${sections}"></figure></main>
<section class="metrics">${cards}</section>
<section class="p0"><div><b>${t.p0Label}</b><span>${t.p0Line}</span></div><div class="state">${t.evidenceLine}</div></section>
<footer class="foot"><div><strong>${t.strip}</strong>${t.boundary}</div><div class="package">${t.package}<br>01–${String(totalPages).padStart(2, "0")}</div></footer>
</body></html>`;
}

function annexHtml(kind, lang, format, pageNumber, totalPages) {
  const t = kind === "readiness" ? readinessCopy[lang] : handoffCopy[lang];
  const isA3 = format === "a3";
  const page = isA3 ? "420mm 297mm" : "841mm 1189mm";
  const size = isA3 ? "width:420mm;height:297mm" : "width:841mm;height:1189mm";
  const fontCss = fs.readFileSync(FONT_CSS, "utf8");
  const figureBase = kind === "readiness" ? "operational-readiness" : "implementation-handoff";
  const board = fileUrl(path.join(FIGURES, `${figureBase}${lang === "en" ? ".en" : ""}.png`));
  const cards = t.cards.map(([n, label]) => `<div class="card"><b>${n}</b><span>${label}</span></div>`).join("");
  return `<!doctype html>
<html lang="${t.lang}"><head><meta charset="utf-8"><style>
${fontCss}
@page{size:${page};margin:0}*{box-sizing:border-box}html,body{margin:0;${size};overflow:hidden}
body{--coal:#171a18;--ink:#262b28;--bone:#f2eddf;--paper:#fbf8ef;--grid:#d8d1c2;--muted:#606560;--red:#c72d1e;--redfill:#e64b3c;--cyan:#00746f;--yellow:#83660a;position:relative;color:var(--ink);background:var(--bone);font-family:JZHandoverCJK,sans-serif;background-image:linear-gradient(#d8d1c288 1px,transparent 1px),linear-gradient(90deg,#d8d1c288 1px,transparent 1px)}
body.a3{padding:12mm 16mm 9mm;background-size:10mm 10mm}body.a0{padding:32mm 42mm 26mm;background-size:20mm 20mm}
.head{display:grid;grid-template-columns:1fr auto;gap:10mm;align-items:end;border-bottom:1.2mm solid var(--redfill);padding-bottom:4mm}.a3 .head{height:37mm}.a0 .head{height:118mm;padding-bottom:12mm}
.code{font-weight:800;letter-spacing:.14em;color:var(--red)}.a3 .code{font-size:3.5mm}.a0 .code{font-size:8mm}
h1{margin:2mm 0 0;line-height:.96;letter-spacing:-.045em}.a3 h1{font-size:${lang === "zh" ? "11.5mm" : "8.3mm"}}.a0 h1{font-size:${lang === "zh" ? "29mm" : "21mm"}}
.state{align-self:center;padding:2.5mm 4mm;background:var(--coal);color:#f1c64a;font-weight:900;letter-spacing:.08em;text-align:center}.a3 .state{font-size:3.1mm}.a0 .state{padding:7mm 12mm;font-size:7mm}
.lead{margin:4mm 0;color:var(--muted);font-weight:600;line-height:1.45}.a3 .lead{height:16mm;font-size:${lang === "zh" ? "3.25mm" : "2.65mm"}}.a0 .lead{height:62mm;margin:12mm 0;font-size:${lang === "zh" ? "8mm" : "6.4mm"}}
.board{margin:0;background:var(--paper);border:.7mm solid var(--coal);padding:2mm;overflow:hidden}.a3 .board{height:153mm}.a0 .board{height:500mm;padding:6mm;border-width:1.4mm}.board img{display:block;width:100%;height:100%;object-fit:contain}
.cards{display:grid;grid-template-columns:repeat(4,1fr);gap:3mm;margin-top:4mm}.a0 .cards{grid-template-columns:repeat(2,1fr);gap:10mm;margin-top:16mm}.card{background:var(--paper);border-top:1.6mm solid var(--redfill);padding:3mm}.card:nth-child(2),.card:nth-child(4){border-color:#00a79f}.a0 .card{min-height:92mm;padding:10mm;border-top-width:4mm}.card b{display:block;color:var(--red);line-height:1}.card:nth-child(2) b,.card:nth-child(4) b{color:var(--cyan)}.a3 .card b{font-size:5.5mm}.a0 .card b{font-size:15mm}.card span{display:block;margin-top:1.5mm;color:var(--muted);font-weight:700;line-height:1.25}.a3 .card span{font-size:${lang === "zh" ? "2.55mm" : "2.15mm"}}.a0 .card span{margin-top:5mm;font-size:${lang === "zh" ? "6.5mm" : "5.4mm"}}
.hold{margin-top:4mm;padding:3mm 4mm;background:var(--coal);color:#f1c64a;font-weight:800;letter-spacing:.025em}.a3 .hold{font-size:${lang === "zh" ? "2.75mm" : "2.2mm"}}.a0 .hold{margin-top:14mm;padding:9mm 12mm;font-size:${lang === "zh" ? "6.4mm" : "5.2mm"}}
.foot{position:absolute;left:${isA3 ? "16mm" : "42mm"};right:${isA3 ? "16mm" : "42mm"};bottom:${isA3 ? "8mm" : "25mm"};display:grid;grid-template-columns:1fr auto;gap:12mm;border-top:.6mm solid var(--redfill);padding-top:${isA3 ? "2mm" : "6mm"};color:var(--muted)}.a3 .foot{font-size:${lang === "zh" ? "2.35mm" : "1.95mm"}}.a0 .foot{font-size:${lang === "zh" ? "5.8mm" : "4.8mm"};border-top-width:1.2mm}.page{font-weight:900;color:var(--coal);white-space:nowrap}
</style></head><body class="${format}">
<header class="head"><div><div class="code">${t.code}</div><h1>${t.title}</h1></div><div class="state">EXTERNAL HOLD<br>NOT STARTED</div></header>
<p class="lead">${t.lead}</p><figure class="board"><img src="${board}"></figure><section class="cards">${cards}</section><div class="hold">${t.hold}</div>
<footer class="foot"><div>${t.boundary}</div><div class="page">PACKAGE v2.0 · ${String(pageNumber).padStart(2, "0")} / ${String(totalPages).padStart(2, "0")}</div></footer>
</body></html>`;
}

const work = fs.mkdtempSync(path.join(os.tmpdir(), "jingzhang-delivery-pdfs-"));

function run(command, args) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  if (result.status !== 0) fail(`${command} failed:\n${result.stdout}\n${result.stderr}`);
}

function pageCount(file) {
  const result = spawnSync(QPDF, ["--show-npages", file], { encoding: "utf8" });
  if (result.status !== 0) fail(`${QPDF} --show-npages failed for ${file}:\n${result.stderr}`);
  const count = Number.parseInt(String(result.stdout || "").trim(), 10);
  if (!Number.isInteger(count) || count < 1) fail(`invalid page count for ${file}: ${result.stdout}`);
  return count;
}

async function renderPdf(browser, htmlPath, pdfPath) {
  const page = await browser.newPage();
  try {
    await page.goto(fileUrl(htmlPath), { waitUntil: "load" });
    await page.emulateMedia({ media: "print" });
    await page.pdf({ path: pdfPath, printBackground: true, preferCSSPageSize: true, tagged: true });
  } finally {
    await page.close();
  }
}

async function rebuild(format, lang) {
  const suffix = lang === "en" ? ".en" : "";
  const basename = format === "a3" ? `a3-booklet${suffix}.pdf` : `a0-boards${suffix}.pdf`;
  const source = path.join(DRAWINGS, basename);
  const basePages = format === "a3" ? 13 : 6;
  const targetPages = basePages + 2;
  const sourcePages = pageCount(source);
  if (![basePages, basePages + 1, targetPages].includes(sourcePages)) {
    fail(`${basename} has ${sourcePages} pages; expected ${basePages} (base), ${basePages + 1} (one annex) or ${targetPages} (two annexes)`);
  }
  const technicalEndPage = basePages;
  const htmlPath = path.join(work, `${format}-${lang}.html`);
  const handoffHtmlPath = path.join(work, `${format}-${lang}-handoff.html`);
  const readinessHtmlPath = path.join(work, `${format}-${lang}-readiness.html`);
  const cover = path.join(work, `${format}-${lang}.pdf`);
  const handoffAnnex = path.join(work, `${format}-${lang}-handoff.pdf`);
  const readinessAnnex = path.join(work, `${format}-${lang}-readiness.pdf`);
  const output = path.join(DRAWINGS, `.${basename}.delivery.tmp.pdf`);
  fs.writeFileSync(htmlPath, html(lang, format, targetPages));
  fs.writeFileSync(handoffHtmlPath, annexHtml("handoff", lang, format, targetPages - 1, targetPages));
  fs.writeFileSync(readinessHtmlPath, annexHtml("readiness", lang, format, targetPages, targetPages));
  const browser = await chromium.launch({ executablePath: CHROME, headless: true });
  try {
    await renderPdf(browser, htmlPath, cover);
    await renderPdf(browser, handoffHtmlPath, handoffAnnex);
    await renderPdf(browser, readinessHtmlPath, readinessAnnex);
  } finally {
    await browser.close();
  }
  run(QPDF, ["--empty", "--pages", cover, "1", source, `2-${technicalEndPage}`,
    handoffAnnex, "1", readinessAnnex, "1", "--", output]);
  if (pageCount(output) !== targetPages) fail(`${basename} rebuilt with unexpected page count`);
  fs.renameSync(output, source);
  process.stdout.write(`${source}\n`);
}

async function main() {
  const ext = HANDOFF.current_external_evidence || {};
  const externalBoundaryIntact = HANDOFF.claim_state === "PARTICIPANT_DESIGN_HANDOFF_READY" &&
    HANDOFF.activation_state === "EXTERNAL_HOLD_NOT_STARTED" &&
    ext.official_siting_received === false && ext.site_right_or_access_received === false &&
    ext.field_measurement_count === 0 && ext.documentary_gate_receipt_count === 0 &&
    ext.named_role_appointment_count === 0 && ext.formal_unit_rate_receipt_count === 0 &&
    ext.vendor_quote_count === 0 && ext.insurance_document_count === 0 &&
    ext.approved_budget_cny === null && ext.professional_signoff_count === 0 &&
    ext.construction_or_opening_release_count === 0 && ext.field_task_count === 0 &&
    ext.valid_two_key_receipt_count === 0 && ext.commissioning_execution_count === 0 &&
    ext.future_baseline_observation_count === 0;
  if (!externalBoundaryIntact) fail("professional handoff PDF refused: external HOLD/null boundary changed");
  for (const lang of ["zh", "en"]) {
    for (const base of ["implementation-handoff", "operational-readiness"]) {
      const figure = path.join(FIGURES, `${base}${lang === "en" ? ".en" : ""}.png`);
      if (!fs.existsSync(figure)) fail(`missing annex figure: ${figure}`);
    }
  }
  for (const format of ["a3", "a0"]) {
    for (const lang of ["zh", "en"]) await rebuild(format, lang);
  }
}

main().catch((error) => fail(error && error.stack ? error.stack : String(error)));
