#!/usr/bin/env node
"use strict";

/*
 * Deterministically rebuilds the bilingual F/05 P0 technical board.
 * The board binds the package's 1:500–1:20 drawing chain to the same
 * pre-feasibility geometry, quantities, roster, cost, maintenance and HOLD
 * evidence state. It is a participant design reference, never a site record.
 */

const fs = require("fs");
const path = require("path");
const { createCanvas, GlobalFonts } = require("@napi-rs/canvas");

const HERE = __dirname;
const PKG = path.resolve(HERE, "../../..");
const OUT = path.join(PKG, "assets/figures");
const envelope = JSON.parse(fs.readFileSync(path.join(HERE, "p0-pre-feasibility-envelope.json"), "utf8"));
const delivery = JSON.parse(fs.readFileSync(path.join(HERE, "p0-delivery-contract.json"), "utf8"));
const handoff = JSON.parse(fs.readFileSync(path.join(HERE, "implementation-handoff-register.json"), "utf8"));
const fontCss = fs.readFileSync(path.join(HERE, "noto-cjk-subset.css"), "utf8");
const fontMatch = fontCss.match(/base64,([^\)]+)/);
if (!fontMatch || !GlobalFonts.register(Buffer.from(fontMatch[1], "base64"), "JZHandoverCJK")) {
  throw new Error("unable to register the package-owned OFL Noto CJK WOFF2 subset");
}

const C = {
  coal: "#171a18", ink: "#252a27", bone: "#f2eddf", paper: "#fbf8ef",
  grid: "#d4cdbd", muted: "#5b625d", red: "#c72d1e", redFill: "#e64b3c",
  cyan: "#00746f", cyanFill: "#00a79f", yellow: "#83660a", yellowFill: "#f1c64a",
  blue: "#365f82", green: "#4d7349", paleBlue: "#dce8ed", paleRed: "#f3ded8",
  paleGreen: "#dcebe6", paleYellow: "#f5e8b9", white: "#ffffff", black: "#0e1311",
};

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

function checkData() {
  const spatial = envelope.reference_spatial_envelope;
  const capacity = envelope.capacity_and_queue_screening;
  const cost = envelope.participant_cost_sensitivity_90_day;
  const roster = envelope.reference_operating_roster;
  const checks = [
    [spatial.screening_control_envelope.area_sqm, 7.2 * 7.2, "control envelope"],
    [spatial.reversible_operating_patch.area_sqm, 6 * 6, "operating patch"],
    [spatial.staffed_service_island.area_sqm, 2.4 * 1.2, "service island"],
    [capacity.operational_public_cap_persons, 8, "public cap"],
    [capacity.simultaneous_staff_positions, 3, "staff seats"],
    [capacity.queue_cap_persons, 6, "queue cap"],
    [roster.staffed_seat_hours_per_year, 3000, "annual staffed seat-hours"],
    [roster.minimum_roster_headcount_for_break_cover, 4, "minimum roster"],
    [delivery.component_schedule.length, 12, "component schedule"],
    [handoff.drawing_chain.length, 5, "drawing chain"],
    [handoff.unpriced_quantity_schedule.lines.length, 16, "quantity schedule"],
    [handoff.professional_role_classes.length, 12, "role classes"],
    [handoff.delivery_packages.length, 6, "delivery packages"],
    [handoff.implementation_scheme_module_register.length, 11, "implementation-plan classes"],
    [handoff.formal_cost_method.method_steps.length, 6, "formal-cost method steps"],
    [handoff.formal_cost_method.comparable_vendor_quote_count, 0, "comparable quote receipts"],
    [envelope.maintenance_cycles.length, 4, "maintenance cycles"],
    [envelope.alternative_comparison.length, 4, "alternatives"],
    [delivery.current_evidence.real_participant_observations, 0, "real observations"],
    [delivery.procurement.total_budget_cny, null, "formal budget"],
    [handoff.current_external_evidence.named_role_appointment_count, 0, "named appointments"],
    [handoff.current_external_evidence.documentary_gate_receipt_count, 0, "gate receipts"],
  ];
  for (const [actual, expected, label] of checks) {
    if (actual !== expected) fail(`${label}: expected ${expected}, received ${actual}`);
  }
  if (cost.included_cost_lines.reduce((sum, item) => sum + item.low_cny, 0) !== cost.sensitivity_subtotal_low_cny) {
    fail("90-day low sensitivity arithmetic drifted");
  }
  if (cost.included_cost_lines.reduce((sum, item) => sum + item.high_cny, 0) !== cost.sensitivity_subtotal_high_cny) {
    fail("90-day high sensitivity arithmetic drifted");
  }
  if (handoff.drawing_chain.map((item) => item.scale).join(",") !== "1:500,1:200,1:100,1:50,1:20") {
    fail("drawing-chain scale sequence drifted");
  }
  if (delivery.activation_state !== "not_started" || envelope.activation_state !== "design_reference_not_field_verified") {
    fail("P0 activation boundary drifted");
  }
  if (delivery.procurement.quote_slots.some((item) => item.amount_cny !== null || item.vendor !== null)) {
    fail("quote slots must remain blank before real procurement");
  }
  if (handoff.documentary_release_gates.some((item) => item.status !== "HOLD" || item.receipt !== null)) {
    fail("documentary gates must remain HOLD with null receipts");
  }
}

function font(ctx, size, weight = 400) {
  ctx.font = `${weight} ${size}px "JZHandoverCJK"`;
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
  let current = "";
  let yy = y;
  let lines = 0;
  for (const unit of units) {
    const separator = isCjk || !current ? "" : " ";
    const trial = `${current}${separator}${unit}`;
    if (current && ctx.measureText(trial).width > maxWidth) {
      ctx.fillText(current, x, yy);
      current = unit;
      yy += lineHeight;
      lines += 1;
      if (lines >= maxLines) break;
    } else current = trial;
  }
  if (current && lines < maxLines) ctx.fillText(current, x, yy);
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
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
}

function arrow(ctx, x1, y1, x2, y2, colour, width = 2) {
  line(ctx, x1, y1, x2, y2, colour, width);
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const head = 9;
  ctx.save();
  ctx.fillStyle = colour;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - head * Math.cos(angle - Math.PI / 6), y2 - head * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(x2 - head * Math.cos(angle + Math.PI / 6), y2 - head * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function dimension(ctx, x1, y1, x2, y2, label, vertical = false) {
  line(ctx, x1, y1, x2, y2, C.red, 1.4);
  if (vertical) {
    line(ctx, x1 - 5, y1, x1 + 5, y1, C.red, 1.4);
    line(ctx, x2 - 5, y2, x2 + 5, y2, C.red, 1.4);
    ctx.save();
    ctx.translate(x1 - 10, (y1 + y2) / 2);
    ctx.rotate(-Math.PI / 2);
    text(ctx, label, 0, 0, 10, 800, C.red, "center");
    ctx.restore();
  } else {
    line(ctx, x1, y1 - 5, x1, y1 + 5, C.red, 1.4);
    line(ctx, x2, y2 - 5, x2, y2 + 5, C.red, 1.4);
    text(ctx, label, (x1 + x2) / 2, y1 - 7, 10, 800, C.red, "center");
  }
}

function dot(ctx, x, y, fill, radius = 8, label = null) {
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = C.paper;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  if (label) text(ctx, label, x, y + 4, 8, 800, C.white, "center");
}

function tag(ctx, x, y, w, value, fill, colour = C.coal) {
  rounded(ctx, x, y, w, 24, 12, fill);
  text(ctx, value, x + w / 2, y + 17, 10, 800, colour, "center");
}

function chair(ctx, x, y, colour = C.blue) {
  line(ctx, x, y - 14, x, y + 7, colour, 3);
  line(ctx, x, y + 7, x + 17, y + 7, colour, 3);
  line(ctx, x + 17, y + 7, x + 17, y + 18, colour, 3);
}

function wheelchair(ctx, x, groundY, colour = C.blue, scale = 1) {
  ctx.save();
  ctx.strokeStyle = colour;
  ctx.fillStyle = colour;
  ctx.lineWidth = 2 * scale;
  ctx.beginPath(); ctx.arc(x, groundY - 13 * scale, 13 * scale, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(x - 4 * scale, groundY - 43 * scale, 5 * scale, 0, Math.PI * 2); ctx.fill();
  line(ctx, x - 4 * scale, groundY - 37 * scale, x + 4 * scale, groundY - 23 * scale, colour, 2 * scale);
  line(ctx, x + 4 * scale, groundY - 23 * scale, x + 19 * scale, groundY - 23 * scale, colour, 2 * scale);
  line(ctx, x + 4 * scale, groundY - 23 * scale, x - 8 * scale, groundY - 17 * scale, colour, 2 * scale);
  ctx.restore();
}

function standing(ctx, x, groundY, colour = C.coal, scale = 1) {
  dot(ctx, x, groundY - 54 * scale, colour, 5 * scale);
  line(ctx, x, groundY - 48 * scale, x, groundY - 22 * scale, colour, 2 * scale);
  line(ctx, x, groundY - 39 * scale, x - 10 * scale, groundY - 30 * scale, colour, 2 * scale);
  line(ctx, x, groundY - 39 * scale, x + 10 * scale, groundY - 30 * scale, colour, 2 * scale);
  line(ctx, x, groundY - 22 * scale, x - 8 * scale, groundY, colour, 2 * scale);
  line(ctx, x, groundY - 22 * scale, x + 8 * scale, groundY, colour, 2 * scale);
}

const copy = {
  zh: {
    kicker: "F / 05 · P0 技术图板",
    title: "一张桌，画到 1:20 再进场",
    subtitle: "同源几何 × 构件 × 容量 × 排班 × 成本 × 维护 × 撤场｜全部为参赛者预可行性参考",
    planTitle: "P0 控制平面 / A0 原尺寸参考 1:100",
    planHold: "不是场地测量、消防人数或无障碍签认",
    componentTitle: "12 项可拆构件 / 同一恢复面",
    overlayTitle: "运营叠图 / 参考 1:50",
    overlayRule: "任一席缺岗、队列 > 6 或环线受阻 → SMART OFF",
    detailTitle: "双面接口 / 参考 1:20",
    detailHold: "高度、触达、照度、线缆与产品细节待专业签认",
    deliveryTitle: "同一几何：由外向内筛选，再原状恢复",
    cost: "约 12万—29万元 / 90天",
    opex: "约 30万—65万元 / 年",
    roster: "3 席 · 最少 4 人轮班",
    reserve: "10% 恢复储备 · 4 h 目标未实测",
    maintenance: "每班前 / 每班后 / 每周 / D0·30·60·90",
    scaleTitle: "五级图纸链 / 每一级都可拒绝下一步",
    alternatives: "A0 人工底盘 · A1 移动车 · A2 双面桌（参考） · A3 既有室内房",
    policyTitle: "11 类实施方案字段 + 6 步计价 + 4 个回退",
    policyLine: "IP01–11 映射 11/11 · CST01–06 方法写定 · 外部回执 / 正式价格 / 预算仍为 0 或 NULL",
    evidence: "现场 0/12 · 门回执 0/12 · 报价 0/3 · 具名任命 0 · 预算/保险/签认 NULL · 不建设、不开放",
  },
  en: {
    kicker: "F / 05 · P0 TECHNICAL BOARD",
    title: "ONE TABLE · DRAW TO 1:20 BEFORE ENTRY",
    subtitle: "ONE GEOMETRY × KIT × CAPACITY × ROSTER × COST × MAINTENANCE × REMOVAL | PARTICIPANT PRE-FEASIBILITY ONLY",
    planTitle: "P0 CONTROL PLAN / A0 REFERENCE 1:100",
    planHold: "NOT A SITE SURVEY, FIRE OCCUPANCY OR ACCESSIBILITY SIGN-OFF",
    componentTitle: "12 REMOVABLE LINES / ONE RESTORATION SURFACE",
    overlayTitle: "OPERATING OVERLAY / REFERENCE 1:50",
    overlayRule: "ANY SEAT ABSENT, QUEUE > 6 OR LOOP BLOCKED → SMART OFF",
    detailTitle: "TWO-FACE INTERFACE / REFERENCE 1:20",
    detailHold: "HEIGHT, REACH, LIGHTING, CABLE AND PRODUCT DETAIL AWAIT SIGN-OFF",
    deliveryTitle: "ONE GEOMETRY: SCREEN INWARD · RESTORE OUTWARD",
    cost: "CNY 0.12–0.29m / 90 DAYS",
    opex: "CNY 0.30–0.65m / YEAR",
    roster: "3 SEATS · MINIMUM 4-PERSON ROSTER",
    reserve: "10% RESTORATION RESERVE · 4 h TARGET UNTESTED",
    maintenance: "PRE-SHIFT / POST-SHIFT / WEEKLY / D0·30·60·90",
    scaleTitle: "FIVE-SCALE DRAWING CHAIN / EACH LEVEL MAY REFUSE RELEASE",
    alternatives: "A0 HUMAN FLOOR · A1 CART · A2 TWO-FACE TABLE (REF.) · A3 EXISTING INDOOR ROOM",
    policyTitle: "11 PLAN CLASSES + 6 COST STEPS + 4 FALLBACKS",
    policyLine: "IP01–11 MAPPED 11/11 · CST01–06 METHOD SET · EXTERNAL RECEIPTS / FORMAL PRICES / BUDGET REMAIN ZERO OR NULL",
    evidence: "FIELD 0/12 · GATE RECEIPTS 0/12 · QUOTES 0/3 · NAMED APPOINTMENTS 0 · BUDGET/INSURANCE/SIGN-OFF NULL · DO NOT BUILD OR OPEN",
  },
};

function drawControlPlan(ctx, lang, x, y, w, h) {
  const t = copy[lang];
  rounded(ctx, x, y, w, h, 16, C.paper, C.coal, 2);
  text(ctx, t.planTitle, x + 22, y + 31, lang === "zh" ? 15 : 12, 800, C.coal);
  text(ctx, t.planHold, x + w - 22, y + 31, lang === "zh" ? 10 : 8, 700, C.red, "right");

  const size = 400;
  const cx = x + 30;
  const cy = y + 66;
  const unit = size / 6;
  const patch = size * (6 / 7.2);
  const px = cx + (size - patch) / 2;
  const py = cy + (size - patch) / 2;

  ctx.save();
  ctx.strokeStyle = C.red;
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 7]);
  ctx.strokeRect(cx, cy, size, size);
  ctx.restore();
  for (let i = 1; i < 6; i += 1) {
    line(ctx, cx + i * unit, cy, cx + i * unit, cy + size, `${C.grid}aa`, 1);
    line(ctx, cx, cy + i * unit, cx + size, cy + i * unit, `${C.grid}aa`, 1);
  }
  ctx.fillStyle = C.paleGreen;
  ctx.fillRect(px, py, patch, patch);
  ctx.strokeStyle = C.cyan;
  ctx.lineWidth = 3;
  ctx.strokeRect(px, py, patch, patch);

  const scale = size / 7.2;
  const islandW = 2.4 * scale;
  const islandH = 1.2 * scale;
  const ix = cx + (size - islandW) / 2;
  const iy = cy + (size - islandH) / 2;
  rounded(ctx, ix, iy, islandW, islandH, 7, C.coal);
  line(ctx, ix + islandW / 2, iy + 5, ix + islandW / 2, iy + islandH - 5, C.white, 1);
  text(ctx, lang === "zh" ? "交出" : "OUT", ix + islandW * .25, iy + islandH * .63, 9, 800, C.white, "center");
  text(ctx, lang === "zh" ? "接入" : "IN", ix + islandW * .75, iy + islandH * .63, 9, 800, C.white, "center");

  const opening = 1.8 * scale;
  ctx.fillStyle = C.paper;
  ctx.fillRect(cx - 5, cy + size / 2 - opening / 2, 11, opening);
  ctx.fillRect(cx + size - 5, cy + size / 2 - opening / 2, 11, opening);
  arrow(ctx, cx - 24, cy + size / 2, cx + 24, cy + size / 2, C.red, 2);
  arrow(ctx, cx + size + 24, cy + size / 2, cx + size - 24, cy + size / 2, C.red, 2);

  const turnR = 1.5 * scale / 2;
  ctx.save();
  ctx.strokeStyle = C.blue;
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 5]);
  ctx.beginPath(); ctx.arc(px + turnR + 10, py + turnR + 10, turnR, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(px + patch - turnR - 10, py + patch - turnR - 10, turnR, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();

  const loopInset = 16;
  arrow(ctx, px + loopInset, py + patch - loopInset, px + patch - loopInset, py + patch - loopInset, C.cyan, 2);
  arrow(ctx, px + patch - loopInset, py + patch - loopInset, px + patch - loopInset, py + loopInset, C.cyan, 2);
  arrow(ctx, px + patch - loopInset, py + loopInset, px + loopInset, py + loopInset, C.cyan, 2);
  arrow(ctx, px + loopInset, py + loopInset, px + loopInset, py + patch - loopInset, C.cyan, 2);

  const queueY = py + 26;
  for (let i = 0; i < 6; i += 1) dot(ctx, px + patch * (.18 + i * .128), queueY, C.yellowFill, 7);
  line(ctx, px + 42, queueY + 16, px + patch - 42, queueY + 16, C.yellow, 2, [5, 4]);
  dot(ctx, ix + islandW * .25, iy - 18, C.redFill, 9, "1");
  dot(ctx, ix + islandW * .75, iy + islandH + 18, C.redFill, 9, "2");
  dot(ctx, ix + islandW + 25, iy + islandH / 2, C.blue, 9, "3");
  chair(ctx, px + 32, py + patch - 50, C.blue);
  chair(ctx, px + 62, py + patch - 50, C.blue);

  dimension(ctx, cx, cy - 14, cx + size, cy - 14, "7.2 m");
  dimension(ctx, px, py + patch + 17, px + patch, py + patch + 17, "6.0 m");
  text(ctx, "2 × 1.8 m", cx + size / 2, cy + size + 38, 10, 800, C.red, "center");
  text(ctx, "2 × Ø1.5 m", cx + size / 2, cy + size + 53, 10, 800, C.blue, "center");

  const lx = x + 462;
  text(ctx, t.componentTitle, lx, y + 72, lang === "zh" ? 13 : 10, 800, C.red);
  const groups = lang === "zh" ? [
    ["C01–02", "双面桌＋坐姿/回转模块"],
    ["C03–05", "触觉图＋路线卡＋24张易读卡"],
    ["C06–07", "4块导视＋1套物理停用"],
    ["C08–09", "2本双联账＋投诉/删除回执"],
    ["C10", "2把非消费等候座椅"],
    ["C11–12", "低眩光照明＋防绊撤场包"],
  ] : [
    ["C01–02", "TWO-FACE TABLE + SEATED/TURN MODULE"],
    ["C03–05", "TACTILE MAP + ROUTE CARDS + 24 EASY-READ CARDS"],
    ["C06–07", "4 SIGNS + 1 PHYSICAL STOP"],
    ["C08–09", "2 TWIN LOGS + COMPLAINT/DELETE RECEIPT"],
    ["C10", "2 NON-CONSUMPTION SEATS"],
    ["C11–12", "LOW-GLARE LIGHT + CABLE/REMOVAL KIT"],
  ];
  groups.forEach(([id, label], index) => {
    const yy = y + 100 + index * 52;
    tag(ctx, lx, yy, 65, id, index % 2 ? C.paleBlue : C.paleYellow, index % 2 ? C.blue : C.yellow);
    wrap(ctx, label, lx + 78, yy + 15, w - (lx - x) - 100, 14, lang === "zh" ? 10 : 8, 700, C.muted, 2);
  });
  rounded(ctx, lx, y + 424, w - (lx - x) - 22, 90, 10, C.black);
  text(ctx, "8 + 3 + 6", lx + 18, y + 459, 27, 800, C.yellowFill);
  wrap(ctx, lang === "zh" ? "公众上限 + 同时席位 + 排队停止线" : "PUBLIC CAP + ROLE SEATS + QUEUE STOP", lx + 18, y + 482, w - (lx - x) - 55, 15, lang === "zh" ? 10 : 8, 700, C.white, 2);
}

function drawOperatingOverlay(ctx, lang, x, y, w, h) {
  const t = copy[lang];
  rounded(ctx, x, y, w, h, 16, C.paper, C.grid, 1.5);
  text(ctx, t.overlayTitle, x + 20, y + 29, lang === "zh" ? 14 : 11, 800, C.coal);
  const tableX = x + 82;
  const tableY = y + 91;
  const tableW = 170;
  const tableH = 62;
  rounded(ctx, tableX, tableY, tableW, tableH, 8, C.coal);
  line(ctx, tableX + tableW / 2, tableY + 6, tableX + tableW / 2, tableY + tableH - 6, C.white, 1);
  text(ctx, lang === "zh" ? "交出席" : "OUT", tableX + tableW * .25, tableY + 37, 10, 800, C.white, "center");
  text(ctx, lang === "zh" ? "接入席" : "IN", tableX + tableW * .75, tableY + 37, 10, 800, C.white, "center");
  dot(ctx, tableX + tableW * .25, tableY - 18, C.redFill, 10, "1");
  dot(ctx, tableX + tableW * .75, tableY + tableH + 18, C.redFill, 10, "2");
  dot(ctx, tableX + tableW + 28, tableY + tableH / 2, C.blue, 10, "3");
  for (let i = 0; i < 6; i += 1) dot(ctx, x + 40 + i * 42, y + h - 64, C.yellowFill, 7);
  line(ctx, x + 30, y + h - 49, x + w - 30, y + h - 49, C.yellow, 2, [5, 4]);
  chair(ctx, x + w - 70, y + h - 92, C.blue);
  chair(ctx, x + w - 42, y + h - 92, C.blue);
  wrap(ctx, t.overlayRule, x + 20, y + h - 20, w - 40, 14, lang === "zh" ? 9 : 7.5, 800, C.red, 2);
}

function drawInterfaceDetail(ctx, lang, x, y, w, h) {
  const t = copy[lang];
  rounded(ctx, x, y, w, h, 16, C.paper, C.grid, 1.5);
  text(ctx, t.detailTitle, x + 20, y + 29, lang === "zh" ? 14 : 11, 800, C.coal);
  const ground = y + h - 58;
  line(ctx, x + 22, ground, x + w - 22, ground, C.coal, 3);
  const tableX = x + w / 2 - 52;
  const tableY = ground - 72;
  rounded(ctx, tableX, tableY, 104, 20, 3, C.yellowFill, C.coal, 1.5);
  line(ctx, tableX + 12, tableY + 20, tableX + 12, ground, C.coal, 4);
  line(ctx, tableX + 92, tableY + 20, tableX + 92, ground, C.coal, 4);
  standing(ctx, x + 72, ground, C.coal, 1);
  wheelchair(ctx, x + w - 78, ground, C.blue, 1);
  rounded(ctx, tableX + 37, tableY - 27, 30, 20, 4, C.redFill);
  text(ctx, "STOP", tableX + 52, tableY - 13, 7, 800, C.white, "center");
  rounded(ctx, tableX - 6, tableY - 38, 22, 31, 3, C.paleBlue, C.blue, 1);
  line(ctx, tableX + 92, ground - 5, tableX + 126, ground - 5, C.red, 5);
  dimension(ctx, tableX, ground + 19, tableX + 104, ground + 19, "2.4 m");
  wrap(ctx, t.detailHold, x + 20, y + h - 18, w - 40, 13, lang === "zh" ? 8.5 : 7, 700, C.red, 2);
}

function isoSquare(ctx, cx, cy, rx, ry, fill, stroke, label, colour) {
  ctx.beginPath();
  ctx.moveTo(cx, cy - ry);
  ctx.lineTo(cx + rx, cy);
  ctx.lineTo(cx, cy + ry);
  ctx.lineTo(cx - rx, cy);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  text(ctx, label, cx - rx + 6, cy - ry + 15, 9, 800, colour);
}

function drawDelivery(ctx, lang, x, y, w, h) {
  const t = copy[lang];
  rounded(ctx, x, y, w, h, 16, C.paper, C.coal, 2);
  text(ctx, t.deliveryTitle, x + 20, y + 30, lang === "zh" ? 14 : 10.5, 800, C.coal);
  const cx = x + 180;
  const cy = y + 135;
  isoSquare(ctx, cx, cy, 138, 62, "#f3ede0", C.blue, "24 m", C.blue);
  isoSquare(ctx, cx, cy + 2, 95, 43, "#e5eee8", C.cyan, "12 m", C.cyan);
  isoSquare(ctx, cx, cy + 4, 58, 27, "#f3ded8", C.red, "7.2 m", C.red);
  isoSquare(ctx, cx, cy + 6, 48, 22, "#f5e8b9", C.yellow, "6 m", C.yellow);
  rounded(ctx, cx - 22, cy - 9, 44, 14, 3, C.coal);
  arrow(ctx, cx + 150, cy, x + 380, cy, C.red, 2);
  isoSquare(ctx, x + 450, cy, 58, 27, C.paper, C.cyan, lang === "zh" ? "恢复 36㎡" : "RESTORE 36m²", C.cyan);
  text(ctx, lang === "zh" ? "筛查" : "SCREEN", cx, y + h - 24, 10, 800, C.blue, "center");
  text(ctx, lang === "zh" ? "撤除 / 复测" : "REMOVE / RECHECK", x + 450, y + h - 24, 10, 800, C.red, "center");

  const statsX = x + 535;
  const statsW = w - 555;
  const rows = [[t.cost, C.red], [t.opex, C.cyan], [t.roster, C.blue], [t.reserve, C.yellow]];
  rows.forEach(([label, colour], index) => {
    rounded(ctx, statsX, y + 50 + index * 43, statsW, 34, 8, index % 2 ? C.paleBlue : C.paleYellow);
    text(ctx, label, statsX + 12, y + 72 + index * 43, lang === "zh" ? 10 : 8, 800, colour);
  });
  wrap(ctx, t.maintenance, statsX, y + h - 27, statsW, 13, lang === "zh" ? 9 : 7.5, 700, C.muted, 2);
}

function drawBottomStrip(ctx, lang, x, y, w, h) {
  const t = copy[lang];
  rounded(ctx, x, y, w, h, 16, C.paper, C.grid, 1.5);
  text(ctx, t.scaleTitle, x + 20, y + 27, lang === "zh" ? 13 : 10, 800, C.red);
  const chainW = 720;
  const itemW = 130;
  handoff.drawing_chain.forEach((item, index) => {
    const boxX = x + 20 + index * (itemW + 11);
    const boxY = y + 44;
    rounded(ctx, boxX, boxY, itemW, 68, 8, [C.paleBlue, C.paleGreen, C.paleRed, C.paleYellow, "#e6e3dc"][index]);
    text(ctx, item.scale, boxX + 12, boxY + 25, 15, 800, [C.blue, C.cyan, C.red, C.yellow, C.coal][index]);
    wrap(ctx, lang === "zh" ? item.title_zh : item.title_en.toUpperCase(), boxX + 12, boxY + 45, itemW - 24, 11, lang === "zh" ? 8.5 : 7, 700, C.muted, 2);
    if (index < 4) arrow(ctx, boxX + itemW + 2, boxY + 34, boxX + itemW + 9, boxY + 34, C.red, 1.5);
  });
  line(ctx, x + chainW + 42, y + 18, x + chainW + 42, y + h - 18, C.grid, 1);
  text(ctx, t.policyTitle, x + chainW + 65, y + 27, lang === "zh" ? 12 : 9, 800, C.cyan);
  wrap(ctx, t.policyLine, x + chainW + 65, y + 54, w - chainW - 90, 14, lang === "zh" ? 9 : 7.3, 700, C.coal, 2);
  wrap(ctx, t.alternatives, x + chainW + 65, y + 89, w - chainW - 90, 14, lang === "zh" ? 9.5 : 7.5, 700, C.coal, 2);
  wrap(ctx, lang === "zh" ? "A0 为不启动；A1/A2/A3 均不得绕过 G01–G12 与双钥匙。" : "A0 MEANS DO NOT START. A1/A2/A3 MAY NOT BYPASS G01–G12 OR TWO-KEY RELEASE.", x + chainW + 65, y + 124, w - chainW - 90, 13, lang === "zh" ? 8.5 : 7, 700, C.red, 2);
}

function drawFigure(lang) {
  const t = copy[lang];
  const canvas = createCanvas(1600, 1000);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = C.bone;
  ctx.fillRect(0, 0, 1600, 1000);
  for (let gx = 0; gx <= 1600; gx += 40) line(ctx, gx, 0, gx, 1000, `${C.grid}70`, 1);
  for (let gy = 0; gy <= 1000; gy += 40) line(ctx, 0, gy, 1600, gy, `${C.grid}70`, 1);

  text(ctx, t.kicker, 64, 55, lang === "zh" ? 18 : 15, 800, C.red);
  text(ctx, t.title, 64, 108, lang === "zh" ? 42 : 34, 800, C.coal);
  text(ctx, t.subtitle, 64, 140, lang === "zh" ? 15 : 11, 600, C.muted);
  rounded(ctx, 1240, 37, 296, 100, 10, C.black);
  text(ctx, "DESIGN REFERENCE", 1260, 68, 11, 800, C.yellowFill);
  text(ctx, lang === "zh" ? "4级 · 9项目 · 6包 · 11方案类" : "4 STATES · 9 PROJECTS · 6 PACKAGES · 11 CLASSES", 1260, 93, lang === "zh" ? 9 : 7.1, 700, C.white);
  text(ctx, lang === "zh" ? "12门 · 6步计价 · 外部回执0" : "12 GATES · 6 COST STEPS · RECEIPTS 0", 1260, 111, lang === "zh" ? 9 : 7.1, 700, C.white);

  drawControlPlan(ctx, lang, 64, 170, 740, 548);
  drawOperatingOverlay(ctx, lang, 828, 170, 338, 266);
  drawInterfaceDetail(ctx, lang, 1190, 170, 346, 266);
  drawDelivery(ctx, lang, 828, 458, 708, 260);
  drawBottomStrip(ctx, lang, 64, 742, 1472, 172);

  rounded(ctx, 64, 930, 1472, 42, 8, C.black);
  text(ctx, t.evidence, 84, 957, lang === "zh" ? 11 : 8.5, 800, C.white);
  text(ctx, lang === "zh" ? "参考技术图 / 非测绘 / 非工程签认 / 非报价 / 非实施批准" : "REFERENCE TECHNICAL DRAWING / NOT SURVEY / SIGN-OFF / QUOTE / IMPLEMENTATION APPROVAL", 64, 992, lang === "zh" ? 10 : 8, 600, C.muted);
  text(ctx, "JING-ZHANG HANDOVER LINE / PACKAGE v2.0", 1536, 992, 10, 800, C.muted, "right");
  return canvas;
}

checkData();
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "metrics-evidence.png"), drawFigure("zh").toBuffer("image/png"));
fs.writeFileSync(path.join(OUT, "metrics-evidence.en.png"), drawFigure("en").toBuffer("image/png"));
process.stdout.write(`${path.join(OUT, "metrics-evidence.png")}\n`);
process.stdout.write(`${path.join(OUT, "metrics-evidence.en.png")}\n`);
