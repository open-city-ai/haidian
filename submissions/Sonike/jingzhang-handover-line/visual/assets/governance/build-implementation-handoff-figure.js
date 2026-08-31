#!/usr/bin/env node
"use strict";

/*
 * Builds bilingual F/06 from implementation-handoff-register.json. The image
 * exposes the participant-authored drawing/delivery chain while failing closed
 * if any external receipt, appointment, price, sign-off or field result appears.
 */

const fs = require("fs");
const path = require("path");
const { createCanvas, GlobalFonts } = require("@napi-rs/canvas");

const HERE = __dirname;
const PKG = path.resolve(HERE, "../../..");
const OUT = path.join(PKG, "assets/figures");
const register = JSON.parse(fs.readFileSync(path.join(HERE, "implementation-handoff-register.json"), "utf8"));
const feasibility = JSON.parse(fs.readFileSync(path.join(HERE, "p0-pre-feasibility-envelope.json"), "utf8"));
const fontCss = fs.readFileSync(path.join(HERE, "noto-cjk-subset.css"), "utf8");
const fontMatch = fontCss.match(/base64,([^\)]+)/);
if (!fontMatch || !GlobalFonts.register(Buffer.from(fontMatch[1], "base64"), "JZHandoverCJK")) {
  throw new Error("unable to register the package-owned OFL Noto CJK WOFF2 subset");
}

const C = {
  coal: "#171a18", ink: "#252a27", bone: "#f2eddf", paper: "#fbf8ef",
  grid: "#d4cdbd", muted: "#5b625d", red: "#c72d1e", redFill: "#e64b3c",
  cyan: "#00746f", cyanFill: "#00a79f", yellow: "#83660a", yellowFill: "#f1c64a",
  blue: "#365f82", paleBlue: "#dce8ed", paleRed: "#f3ded8", paleGreen: "#dcebe6",
  paleYellow: "#f5e8b9", disabled: "#a29e94", white: "#ffffff",
};

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

function near(actual, expected, tolerance = 1e-6) {
  return Number.isFinite(actual) && Math.abs(actual - expected) <= tolerance;
}

function checkData() {
  const scales = register.nested_scale_envelopes;
  const ext = register.current_external_evidence;
  const lines = register.unpriced_quantity_schedule.lines;
  const checks = [
    [near(scales.site_screening_window.area_sqm, 24 * 24), "24 m screen"],
    [near(scales.coordination_court.area_sqm, 12 * 12), "12 m court"],
    [near(scales.control_envelope.area_sqm, 7.2 * 7.2), "7.2 m control"],
    [near(scales.reversible_operating_patch.area_sqm, 6 * 6), "6 m patch"],
    [register.drawing_chain.length === 5, "drawing chain"],
    [register.release_states.length === 4, "release states"],
    [register.delivery_projects.length === 9, "projects"],
    [register.delivery_packages.length === 6, "packages"],
    [register.implementation_modules.length === 11, "modules"],
    [register.implementation_scheme_module_register.length === 11, "implementation-plan classes"],
    [near(register.implementation_policy_basis.programme_level_mapping_ratio, 1), "implementation-plan mapping"],
    [register.implementation_policy_basis.external_module_receipt_count === 0, "implementation-plan receipts"],
    [register.formal_cost_method.method_steps.length === 6, "formal cost method"],
    [register.formal_cost_method.formal_unit_rate_receipt_count === 0, "formal rates"],
    [register.formal_cost_method.comparable_vendor_quote_count === 0, "vendor quotes"],
    [register.formal_cost_method.approved_budget_cny === null, "approved budget"],
    [register.documentary_release_gates.length === 12, "gates"],
    [register.professional_role_classes.length === 12, "roles"],
    [register.conditional_programme.tasks.length === 12, "tasks"],
    [lines.length === 16, "quantity lines"],
    [register.handoff_acceptance_indicators.length === 12, "acceptance indicators"],
    [register.handoff_acceptance_indicators.filter((item) => item.judgeable_now).length === 8, "judgeable indicators"],
    [near(register.capacity_and_open_edge_screen.control_envelope_half_diagonal_m,
      Math.sqrt(3.6 ** 2 + 3.6 ** 2), 0.001), "half diagonal"],
  ];
  for (const [condition, label] of checks) if (!condition) fail(`invalid ${label}`);
  if (register.claim_state !== "PARTICIPANT_DESIGN_HANDOFF_READY" ||
      register.activation_state !== "EXTERNAL_HOLD_NOT_STARTED") fail("handoff state drifted");
  if (Object.entries(ext).some(([key, value]) => {
    if (key === "approved_budget_cny") return value !== null;
    return typeof value === "boolean" ? value !== false : value !== 0;
  })) fail("external evidence must remain false, zero or null");
  if (register.documentary_release_gates.some((gate) => gate.status !== "HOLD" || gate.receipt !== null)) {
    fail("all documentary gates must remain HOLD with null receipts");
  }
  if (register.professional_role_classes.some((role) =>
    role.appointment_status !== "unappointed" || role.named_party !== null)) {
    fail("all professional role classes must remain unappointed");
  }
  if (register.conditional_programme.tasks.some((task) => task.status !== "HOLD")) {
    fail("all conditional programme tasks must remain HOLD");
  }
  if (lines.some((item) => item.field_verified_quantity !== null ||
    item.unit_rate_cny !== null || item.amount_cny !== null)) {
    fail("unpriced schedule contains field quantity, rate or amount");
  }
  if (feasibility.current_external_evidence.field_capacity_observations !== 0 ||
    feasibility.current_external_evidence.market_quotes_received !== 0 ||
    feasibility.current_external_evidence.approved_budget_cny !== null) {
    fail("P0 feasibility evidence boundary drifted");
  }
}

function font(ctx, size, weight = 400, family = "JZHandoverCJK") {
  ctx.font = `${weight} ${size}px "${family}"`;
}

function text(ctx, value, x, y, size, weight = 400, colour = C.ink, align = "left") {
  ctx.save();
  font(ctx, size, weight);
  ctx.fillStyle = colour;
  ctx.textAlign = align;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(String(value), x, y);
  ctx.restore();
}

function wrap(ctx, value, x, y, maxWidth, lineHeight, size, weight = 400, colour = C.muted, maxLines = 3) {
  ctx.save();
  font(ctx, size, weight);
  ctx.fillStyle = colour;
  ctx.textBaseline = "alphabetic";
  const source = String(value);
  const isCjk = !source.includes(" ");
  const units = isCjk ? Array.from(source) : source.split(/\s+/);
  let lineValue = "";
  let lineCount = 0;
  let yy = y;
  for (const unit of units) {
    const separator = isCjk || !lineValue ? "" : " ";
    const trial = `${lineValue}${separator}${unit}`;
    if (ctx.measureText(trial).width > maxWidth && lineValue) {
      ctx.fillText(lineValue, x, yy);
      lineCount += 1;
      if (lineCount >= maxLines) break;
      lineValue = unit;
      yy += lineHeight;
    } else lineValue = trial;
  }
  if (lineValue && lineCount < maxLines) ctx.fillText(lineValue, x, yy);
  ctx.restore();
}

function rounded(ctx, x, y, w, h, r, fill, stroke = null, width = 1) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = width; ctx.stroke(); }
}

function line(ctx, x1, y1, x2, y2, colour, width = 1, dash = []) {
  ctx.save();
  ctx.strokeStyle = colour;
  ctx.lineWidth = width;
  ctx.setLineDash(dash);
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.restore();
}

function arrow(ctx, x1, y1, x2, y2, colour, width = 2) {
  line(ctx, x1, y1, x2, y2, colour, width);
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.save(); ctx.translate(x2, y2); ctx.rotate(angle);
  ctx.fillStyle = colour; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-8, -5); ctx.lineTo(-8, 5); ctx.closePath(); ctx.fill(); ctx.restore();
}

function metricCard(ctx, x, y, w, h, value, label, colour) {
  rounded(ctx, x, y, w, h, 10, C.paper, C.grid, 1);
  ctx.fillStyle = colour; ctx.fillRect(x, y, 7, h);
  text(ctx, value, x + 20, y + 36, 28, 800, colour);
  wrap(ctx, label, x + 20, y + 58, w - 32, 15, 10, 700, C.muted, 2);
}

const copy = {
  zh: {
    kicker: "F / 06 · 专业实施交接梯",
    title: "从 1:500 到 1:20，再决定能不能进场",
    subtitle: "四级空间筛查 × 五张图纸 × 九项项目 × 六个交付包 × 11 个物理运营模块 × 11 类实施方案",
    scaleTitle: "四级嵌套尺度｜只能由外向内筛选",
    scaleNote: "24 m 场地筛查 → 12 m 协调区 → 7.2 m 控制区 → 6 m 可撤工作面",
    notSite: "不是场地测绘 / 不是直接落位",
    counts: ["交付项目", "交付包", "物理运营模块", "实施方案类目", "外部门（全 HOLD）"],
    chainTitle: "五张分尺度图｜同一数据源，不同决策问题",
    gateTitle: "十二道文件门｜回执 0/12",
    taskTitle: "T00—T11 条件时序｜15 周只在真实 T0 后计时",
    handoff: "16 行无价数量 · 11/11 方案类目 · 6 步未来计价 · 12 项交接验收（8 项现在可判）",
    geometry: "中心至角点 5.091 m · 两处开口目标总宽 3.6 m",
    geometryHold: "几何筛选，不是法定人数、疏散、消防或出口能力结论",
    footer: "现场 0/12 · 门回执 0/12 · 正式单价 0 · 报价 0/3 · 预算 NULL · 保险 0 · 签认 0 · 开放放行 0",
  },
  en: {
    kicker: "F / 06 · PROFESSIONAL IMPLEMENTATION HANDOFF",
    title: "FROM 1:500 TO 1:20 · THEN DECIDE ON SITE ENTRY",
    subtitle: "4 SCREENS × 5 DRAWINGS × 9 PROJECTS × 6 PACKAGES × 11 PHYSICAL/OPERATING MODULES × 11 PLAN CLASSES",
    scaleTitle: "FOUR NESTED SCALES · SCREEN OUTSIDE-IN ONLY",
    scaleNote: "24 m SITE SCREEN → 12 m COORDINATION COURT → 7.2 m CONTROL → 6 m REVERSIBLE PATCH",
    notSite: "NOT A SURVEY / NOT DIRECT SITING",
    counts: ["DELIVERY PROJECTS", "DELIVERY PACKAGES", "PHYSICAL / OPERATING MODULES", "PLAN CLASSES", "EXTERNAL GATES · ALL HOLD"],
    chainTitle: "FIVE SCALED DRAWINGS · ONE SOURCE, FIVE DECISIONS",
    gateTitle: "TWELVE DOCUMENTARY GATES · RECEIPTS 0/12",
    taskTitle: "T00-T11 CONDITIONAL PROGRAMME · 15 WEEKS STARTS ONLY AFTER REAL T0",
    handoff: "16 UNPRICED LINES · 11/11 PLAN CLASSES · 6-STEP FUTURE PRICING · 12 INDICATORS (8 JUDGEABLE NOW)",
    geometry: "CENTRE-TO-CORNER 5.091 m · TWO OPENINGS TOTAL TARGET 3.6 m",
    geometryHold: "GEOMETRY SCREEN ONLY · NOT OCCUPANCY, EGRESS, FIRE OR EXIT-CAPACITY COMPLIANCE",
    footer: "FIELD 0/12 · GATE RECEIPTS 0/12 · FORMAL RATES 0 · QUOTES 0/3 · BUDGET NULL · INSURANCE 0 · SIGN-OFF 0 · OPENING RELEASE 0",
  },
};

function drawNestedScales(ctx, lang, x, y, w, h) {
  const t = copy[lang];
  rounded(ctx, x, y, w, h, 15, C.paper, C.coal, 2);
  text(ctx, t.scaleTitle, x + 24, y + 34, lang === "zh" ? 15 : 12, 800, C.red);
  text(ctx, t.scaleNote, x + 24, y + 58, lang === "zh" ? 12 : 9, 700, C.muted);
  rounded(ctx, x + w - 208, y + 20, 184, 31, 15, C.paleRed);
  text(ctx, t.notSite, x + w - 116, y + 41, lang === "zh" ? 10 : 8, 800, C.red, "center");

  const outer = 350;
  const ox = x + 37, oy = y + 82;
  ctx.save(); ctx.strokeStyle = C.blue; ctx.lineWidth = 2; ctx.setLineDash([10, 8]); ctx.strokeRect(ox, oy, outer, outer); ctx.restore();
  text(ctx, "24 × 24 m / 576 ㎡", ox + 12, oy + 25, 13, 800, C.blue);
  for (const [px, py, label] of [
    [ox + 18, oy + outer - 18, "PATH"], [ox + outer - 18, oy + 18, "EDGE"],
    [ox + outer - 18, oy + outer - 18, "RESCUE"], [ox + 18, oy + 18, "TREE / TRACE"],
  ]) {
    ctx.fillStyle = C.blue; ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2); ctx.fill();
    text(ctx, label, px + (px < ox + outer / 2 ? 10 : -10), py - 8, 8, 800, C.blue,
      px < ox + outer / 2 ? "left" : "right");
  }

  const court = outer * .5;
  const cx = ox + (outer - court) / 2, cy = oy + (outer - court) / 2;
  ctx.fillStyle = C.paleBlue; ctx.fillRect(cx, cy, court, court);
  ctx.strokeStyle = C.cyan; ctx.lineWidth = 2; ctx.strokeRect(cx, cy, court, court);
  text(ctx, "12 × 12 m / 144 ㎡", cx + 8, cy + 22, 11, 800, C.cyan);

  const control = outer * (7.2 / 24);
  const kx = ox + (outer - control) / 2, ky = oy + (outer - control) / 2;
  ctx.save(); ctx.strokeStyle = C.red; ctx.lineWidth = 2; ctx.setLineDash([6, 5]); ctx.strokeRect(kx, ky, control, control); ctx.restore();
  const patch = outer * (6 / 24);
  const px = ox + (outer - patch) / 2, py = oy + (outer - patch) / 2;
  ctx.fillStyle = C.paleGreen; ctx.fillRect(px, py, patch, patch);
  ctx.strokeStyle = C.cyan; ctx.lineWidth = 3; ctx.strokeRect(px, py, patch, patch);
  text(ctx, "7.2", kx - 9, ky - 7, 9, 800, C.red);
  text(ctx, "6.0", px + patch / 2, py + patch / 2 + 4, 12, 800, C.cyan, "center");
  arrow(ctx, ox + outer + 28, oy + 30, ox + outer + 28, oy + outer - 30, C.red, 2);
  text(ctx, lang === "zh" ? "外部条件失败就回退" : "FAIL OUTSIDE · FALL BACK", ox + outer + 47, oy + outer / 2, lang === "zh" ? 10 : 8, 800, C.red, "center");

  const lx = x + 438, ly = y + 90;
  const legends = [
    ["24 m", lang === "zh" ? "位置／救援／冲突筛查" : "SITING / RESCUE / CONFLICT SCREEN", C.blue, C.paleBlue],
    ["12 m", lang === "zh" ? "队列／旁路／撤场协调" : "QUEUE / BYPASS / REMOVAL COURT", C.cyan, C.paleGreen],
    ["7.2 m", lang === "zh" ? "两开口／环线／回转控制" : "OPENINGS / LOOP / TURNING CONTROL", C.red, C.paleRed],
    ["6 m", lang === "zh" ? "可撤工作面与恢复面" : "REVERSIBLE WORK + RESTORE PATCH", C.yellow, C.paleYellow],
  ];
  legends.forEach(([value, label, colour, fill], index) => {
    const yy = ly + index * 76;
    rounded(ctx, lx, yy, w - 462, 60, 10, fill);
    text(ctx, value, lx + 16, yy + 28, 20, 800, colour);
    wrap(ctx, label, lx + 112, yy + 25, w - 590, 15, lang === "zh" ? 10 : 8, 700, C.ink, 2);
  });
  rounded(ctx, lx, ly + 313, w - 462, 78, 10, C.coal);
  text(ctx, t.geometry, lx + 16, ly + 340, lang === "zh" ? 11 : 8, 800, C.yellowFill);
  wrap(ctx, t.geometryHold, lx + 16, ly + 363, w - 495, 15, lang === "zh" ? 9 : 7, 600, C.white, 2);
}

function drawDrawingChain(ctx, lang, x, y, w, h) {
  const t = copy[lang];
  text(ctx, t.chainTitle, x, y - 11, lang === "zh" ? 13 : 10, 800, C.red);
  const gap = 10;
  const cardW = (w - gap * 4) / 5;
  register.drawing_chain.forEach((drawing, index) => {
    const xx = x + index * (cardW + gap);
    rounded(ctx, xx, y, cardW, h, 9, C.paper, C.grid, 1);
    ctx.fillStyle = index === 0 ? C.blue : index === 1 ? C.cyan : index === 2 ? C.red : index === 3 ? C.yellow : C.coal;
    ctx.fillRect(xx, y, 7, h);
    text(ctx, drawing.scale, xx + 18, y + 27, 17, 800, index === 4 ? C.coal : ctx.fillStyle);
    wrap(ctx, lang === "zh" ? drawing.title_zh : drawing.title_en.toUpperCase(), xx + 18, y + 49, cardW - 28, 14,
      lang === "zh" ? 9 : 7, 700, C.muted, 3);
    if (index < 4) arrow(ctx, xx + cardW + 2, y + h / 2, xx + cardW + gap - 2, y + h / 2, C.red, 1.5);
  });
}

function drawGateGrid(ctx, lang, x, y, w) {
  const t = copy[lang];
  text(ctx, t.gateTitle, x, y - 11, lang === "zh" ? 13 : 10, 800, C.red);
  const cols = 3, gap = 8, cardW = (w - gap * 2) / cols, cardH = 46;
  register.documentary_release_gates.forEach((gate, index) => {
    const col = index % cols, row = Math.floor(index / cols);
    const xx = x + col * (cardW + gap), yy = y + row * (cardH + 7);
    rounded(ctx, xx, yy, cardW, cardH, 7, C.paper, C.grid, 1);
    rounded(ctx, xx + 7, yy + 9, 42, 27, 13, C.paleRed);
    text(ctx, gate.gate_id, xx + 28, yy + 28, 10, 800, C.red, "center");
    wrap(ctx, lang === "zh" ? gate.title_zh : gate.required_receipt.toUpperCase(), xx + 57, yy + 18, cardW - 64, 13,
      lang === "zh" ? 8 : 6.4, 700, C.ink, 2);
    text(ctx, "HOLD", xx + cardW - 8, yy + 37, 7, 800, C.red, "right");
  });
}

function drawTimeline(ctx, lang, x, y, w, h) {
  const t = copy[lang];
  text(ctx, t.taskTitle, x, y - 9, lang === "zh" ? 13 : 9.5, 800, C.red);
  const gap = 5, cardW = (w - gap * 11) / 12;
  register.conditional_programme.tasks.forEach((task, index) => {
    const xx = x + index * (cardW + gap);
    const fill = index < 4 ? C.paleBlue : index < 8 ? C.paleYellow : C.paleRed;
    rounded(ctx, xx, y, cardW, h, 7, fill, C.grid, 1);
    text(ctx, task.task_id, xx + cardW / 2, y + 23, 10, 800, index < 4 ? C.blue : index < 8 ? C.yellow : C.red, "center");
    text(ctx, task.week_window, xx + cardW / 2, y + 42, 7, 700, C.muted, "center");
    text(ctx, "HOLD", xx + cardW / 2, y + h - 10, 7, 800, C.red, "center");
  });
}

function drawFigure(lang) {
  const t = copy[lang];
  const canvas = createCanvas(1600, 1000);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = C.bone; ctx.fillRect(0, 0, 1600, 1000);
  for (let xx = 0; xx <= 1600; xx += 40) line(ctx, xx, 0, xx, 1000, `${C.grid}80`, 1);
  for (let yy = 0; yy <= 1000; yy += 40) line(ctx, 0, yy, 1600, yy, `${C.grid}80`, 1);

  text(ctx, t.kicker, 64, 54, lang === "zh" ? 18 : 15, 800, C.red);
  text(ctx, t.title, 64, 105, lang === "zh" ? 39 : 31, 800, C.coal);
  text(ctx, t.subtitle, 64, 139, lang === "zh" ? 14 : 10.5, 700, C.muted);
  rounded(ctx, 1243, 35, 293, 86, 10, C.coal);
  text(ctx, "DESIGN HANDOFF READY", 1261, 65, 11, 800, C.yellowFill);
  wrap(ctx, lang === "zh" ? "可交专业团队继续深化 · 现场仍未开始" : "READY FOR PROFESSIONAL CONTINUATION · FIELD NOT STARTED",
    1261, 88, 255, 15, lang === "zh" ? 10 : 8, 700, C.white, 2);

  drawNestedScales(ctx, lang, 64, 172, 790, 478);

  const rx = 882, ry = 172, rw = 654;
  const counts = [9, 6, 11, 11, 12], colours = [C.blue, C.cyan, C.yellow, C.coal, C.red];
  const cardGap = 8, cardW = (rw - cardGap * 4) / 5;
  counts.forEach((value, index) => metricCard(ctx, rx + index * (cardW + cardGap), ry, cardW, 82, value, t.counts[index], colours[index]));
  drawGateGrid(ctx, lang, rx, ry + 119, rw);

  rounded(ctx, rx, ry + 348, rw, 130, 12, C.coal);
  text(ctx, t.handoff, rx + 22, ry + 379, lang === "zh" ? 11 : 8.3, 800, C.yellowFill);
  const chips = [
    ["5", lang === "zh" ? "图纸比例" : "SCALES"], ["12", lang === "zh" ? "条件任务" : "HOLD TASKS"],
    ["16", lang === "zh" ? "无价数量" : "UNPRICED LINES"], ["8/12", lang === "zh" ? "现在可判" : "JUDGEABLE NOW"],
  ];
  chips.forEach(([value, label], index) => {
    const xx = rx + 22 + index * 151;
    rounded(ctx, xx, ry + 397, 137, 54, 8, index % 2 ? "#343a36" : "#2a302d");
    text(ctx, value, xx + 15, ry + 426, 20, 800, index === 3 ? C.redFill : C.white);
    text(ctx, label, xx + 15, ry + 446, lang === "zh" ? 7 : 6, 700, C.grid);
  });

  drawDrawingChain(ctx, lang, 64, 692, 790, 104);
  drawTimeline(ctx, lang, 882, 692, 654, 104);

  rounded(ctx, 64, 830, 1472, 104, 12, C.paper, C.coal, 2);
  ctx.fillStyle = C.redFill; ctx.fillRect(64, 830, 12, 104);
  text(ctx, lang === "zh" ? "证据边界" : "EVIDENCE BOUNDARY", 92, 861, 12, 800, C.red);
  text(ctx, t.footer, 92, 892, lang === "zh" ? 15 : 11, 800, C.coal);
  wrap(ctx, lang === "zh" ? "所有门未关闭时，T00 不成立、15 周时钟不启动、智能层关闭；正确回退是 A0 既有人工底盘。" :
    "UNTIL EVERY APPLICABLE GATE CLOSES, T0 DOES NOT EXIST, THE 15-WEEK CLOCK DOES NOT START AND THE SMART LAYER STAYS OFF; FALL BACK TO A0.",
    92, 917, 1380, 15, lang === "zh" ? 10 : 8, 700, C.muted, 2);

  line(ctx, 64, 958, 1536, 958, C.redFill, 2);
  text(ctx, lang === "zh" ? "参赛者专业交接参考 / 非测绘 / 非工程签认 / 非正式工程量 / 非实施批准" :
    "PARTICIPANT PROFESSIONAL HANDOFF REFERENCE / NOT SURVEY / NOT ENGINEERING SIGN-OFF / NOT FORMAL BOQ / NOT IMPLEMENTATION APPROVAL",
    64, 984, lang === "zh" ? 10 : 7.4, 700, C.muted);
  text(ctx, "JING-ZHANG HANDOVER LINE / PACKAGE v2.0 / F06", 1536, 984, 10, 800, C.muted, "right");
  return canvas;
}

checkData();
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "implementation-handoff.png"), drawFigure("zh").toBuffer("image/png"));
fs.writeFileSync(path.join(OUT, "implementation-handoff.en.png"), drawFigure("en").toBuffer("image/png"));
process.stdout.write(`${path.join(OUT, "implementation-handoff.png")}\n`);
process.stdout.write(`${path.join(OUT, "implementation-handoff.en.png")}\n`);
