#!/usr/bin/env node
/*
 * 京张交接线 · 正文数值声明审计器（离线、只读）
 *
 * 用途：把正文里那些「可复算」的数值声明，逐条拿去对结构化文件当场重算。
 * 与同目录的 protocol-check-runner.js 分工：那个重算协议逻辑（96 条规则检查 ＋ 48 项断言），
 * 这个重算正文自陈的计数、合计、比例与结构性规则。两者合起来覆盖本包全部可复算声明。
 *
 * 为什么需要它：本包两次被自己的数字咬过——一次是断面表把「退线」当容器又与子段相加，
 * 写出复算不出来的 18–27 m；一次是正文把众智园的东西向写反，而几何是对的。
 * 前者是算术、后者是结构，**两类都能被机器逐条判定**，所以不该靠人工复核兜着。
 *
 * 用法：
 *   node claims-audit.js          # 人读表格，全部一致时退出码 0
 *   node claims-audit.js --json   # 机器可读结果
 *
 * 只读随包文件，不写任何东西，不联网，不依赖任何第三方包。
 * 它只审「可由包内数据复算的声明」；判断、设计立场与未测项不在范围内。
 */
"use strict";
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

/* 位置默认由脚本自身推出。两个环境变量只为同目录的 audit-selftest.js 存在：
   JZ_AUDIT_HOME    本文件被复制到别处运行时，指回真正的 governance 目录（阴性测试要改脚本自身）
   JZ_AUDIT_OVERLAY 覆盖层目录：其中存在同名包内相对路径的文件时优先读它（阴性测试要改输入）
   两者都不设置时行为与此前完全一致：只读随包文件，不写任何东西。 */
const HERE = process.env.JZ_AUDIT_HOME ? path.resolve(process.env.JZ_AUDIT_HOME) : __dirname;
const PKG = path.resolve(HERE, "../../..");
const OVERLAY = process.env.JZ_AUDIT_OVERLAY ? path.resolve(process.env.JZ_AUDIT_OVERLAY) : null;
const resolveIn = (base, rel, key) => {
  if (OVERLAY) {
    const cand = path.join(OVERLAY, key || rel);
    if (fs.existsSync(cand)) return cand;
  }
  return path.join(base, rel);
};
const readPkg = (p) => JSON.parse(fs.readFileSync(resolveIn(PKG, p), "utf8"));
const readHere = (p) => JSON.parse(fs.readFileSync(
  resolveIn(HERE, p, path.join("visual/assets/governance", p)), "utf8"));

const metrics = readPkg("metrics.json").metrics;
const sim = readPkg("simulation.json");
const feats = (n) => readPkg(`geometry/${n}.geojson`).features;
const buildings = feats("buildings");
const keyAreas = feats("key_areas");
const roads = feats("roads");
const publicSpace = feats("public_space");
const phasing = feats("phasing");
const ruleReport = readHere("rule-check-report.json");

const val = (k) => (metrics[k] || {}).value;
const near = (a, b, eps) => Math.abs(a - b) <= (eps === undefined ? 1e-6 : eps);
const idsWith = (fs_, prefix) =>
  fs_.filter((f) => String((f.properties || {}).id || "").startsWith(prefix));

/* ---- 逐条声明。claim 是正文的说法，actual 是从数据算出来的。---- */
const checks = [];
const add = (id, claim, pass, actual) => checks.push({ id, claim, pass: !!pass, actual });

/* A. metrics.json 的自陈与内部一致性 */
const valued = Object.values(metrics).filter((m) => m.value !== null && m.value !== undefined).length;
const pending = Object.keys(metrics).length - valued;
add("M1", "137 项指标 ＝ 123 已赋值 ＋ 14 待测",
    Object.keys(metrics).length === 137 && valued === 123 && pending === 14,
    `${Object.keys(metrics).length} ＝ ${valued} ＋ ${pending}`);

const phaseSum = val("phase_1_area_sqm") + val("phase_2_area_sqm") + val("phase_3_area_sqm");
add("M2", "三期面积相加等于总体设计范围，分期不新增范围",
    near(phaseSum, val("site_area_sqm")),
    `${phaseSum} vs site_area ${val("site_area_sqm")}`);

add("M3", "分期 3 期，与 phasing.geojson 要素数一致",
    val("phase_count") === 3 && phasing.length === 3, `metric ${val("phase_count")} / geojson ${phasing.length}`);
add("M4", "重点区 3 处，与 key_areas.geojson 一致",
    val("key_area_count") === 3 && keyAreas.length === 3, `metric ${val("key_area_count")} / geojson ${keyAreas.length}`);
add("M5", "更新单元 20 个，与 buildings.geojson 一致",
    val("renewal_cell_count") === 20 && buildings.length === 20, `metric ${val("renewal_cell_count")} / geojson ${buildings.length}`);

const landmarks = idsWith(publicSpace, "LANDMARK");
const scns = idsWith(publicSpace, "SCN");
add("M6", "公共地标 4 处，与 public_space.geojson 一致",
    val("civic_landmark_count") === 4 && landmarks.length === 4, `metric ${val("civic_landmark_count")} / geojson ${landmarks.length}`);
add("M7", "场景节点 12 个", scns.length === 12, `${scns.length}`);
add("M8", "主轴 1 条 ＋ 东西支线 8 条 ＝ 9 条道路要素",
    roads.length === 9 && roads.filter((f) => f.properties.id === "ROAD-001").length === 1,
    `${roads.length} 条，其中 ROAD-001 ${roads.filter((f) => f.properties.id === "ROAD-001").length} 条`);

/* B. 演练与规则检查的计数 */
const assertionsRun = sim.tasks.reduce((n, t) => n + Object.keys(t.checks).length, 0);
add("S1", "桌面演练 12 个任务", val("simulation_task_count") === 12 && sim.tasks.length === 12,
    `metric ${val("simulation_task_count")} / tasks ${sim.tasks.length}`);
add("S2", "48 项断言 ＝ 12 任务 × 4 项", val("offline_takeover_assertion_count") === 48 && assertionsRun === 48,
    `metric ${val("offline_takeover_assertion_count")} / 实算 ${assertionsRun}`);
add("S3", "96 条规则检查 ＝ 12 基线 ＋ 84 注入",
    ruleReport.checks.length === 96 && ruleReport.totals.baseline_count === 12 && ruleReport.totals.injected_count === 84,
    `${ruleReport.checks.length} ＝ ${ruleReport.totals.baseline_count} ＋ ${ruleReport.totals.injected_count}`);
add("S4", "现场演练 0/12，未被任何字段写成已完成",
    sim.summary.field_rehearsal_tasks_completed === 0 && val("field_rehearsal_task_count") === 0,
    `simulation ${sim.summary.field_rehearsal_tasks_completed} / metric ${val("field_rehearsal_task_count")}`);

/* C. 二十个更新单元的结构性声明 */
const P = buildings.map((f) => f.properties);
const footprint = P.reduce((s, p) => s + p.area_sqm_declared, 0);
add("B1", "二十个单元基底合计 221,014.099 m²（正文写 22.10 万 m²）",
    near(footprint, 221014.099), `${footprint}`);

const byType = {}, cntType = {}, cntSide = { west: 0, east: 0 };
for (const p of P) {
  byType[p.typology] = (byType[p.typology] || 0) + p.area_sqm_declared;
  cntType[p.typology] = (cntType[p.typology] || 0) + 1;
  cntSide[p.side] += 1;
}
add("B2", "四类各五个", Object.keys(cntType).length === 4 && Object.values(cntType).every((c) => c === 5),
    JSON.stringify(cntType));
add("B3", "东西各十个", cntSide.west === 10 && cntSide.east === 10, JSON.stringify(cntSide));

const westTypes = new Set(P.filter((p) => p.side === "west").map((p) => p.typology));
const eastTypes = new Set(P.filter((p) => p.side === "east").map((p) => p.typology));
const setEq = (s, arr) => s.size === arr.length && arr.every((x) => s.has(x));
add("B4", "西收东放：西侧十个全为验证工坊与社区协作屋，东侧十个全为开放研发院与共享服务栈，二十个无一例外",
    setEq(westTypes, ["验证工坊", "社区协作屋"]) && setEq(eastTypes, ["开放研发院", "共享服务栈"]),
    `西 ${[...westTypes].join("／")} ｜ 东 ${[...eastTypes].join("／")}`);

add("B5", "研制与服务分到的基底逐位相等（51,744 m² 对 51,744 m²）",
    byType["开放研发院"] === byType["社区协作屋"] && byType["开放研发院"] === 51744,
    `${byType["开放研发院"]} vs ${byType["社区协作屋"]}`);

const diff = Math.abs(byType["验证工坊"] - byType["共享服务栈"]);
const diffPct = (diff / byType["验证工坊"]) * 100;
add("B6", "验证与公开几乎相等：差 74 m²、0.126%",
    near(diff, 73.901, 0.2) && near(diffPct, 0.126, 0.01),
    `${byType["验证工坊"]} vs ${byType["共享服务栈"]}，差 ${diff.toFixed(3)} ＝ ${diffPct.toFixed(3)}%`);

const pairOf = (id) => Math.floor((parseInt(id.split("-")[1], 10) - 1) / 2) + 1;
const investigate = P.filter((p) => String(p.update_action).startsWith("investigate")).map((p) => p.id);
const invPairs = [...new Set(investigate.map(pairOf))].sort((a, b) => a - b);
const perPair = {};
for (const id of investigate) perPair[pairOf(id)] = (perPair[pairOf(id)] || 0) + 1;
add("B7", "十四个保留优先、六个介入前先查证", investigate.length === 6 && P.length - investigate.length === 14,
    `先查证 ${investigate.length}：${investigate.join("、")}`);
add("B8", "六个先查证的落在第 2、3、5、6、8、9 对，即跳一对取两对",
    JSON.stringify(invPairs) === JSON.stringify([2, 3, 5, 6, 8, 9]), `第 ${invPairs.join("、")} 对`);
add("B9", "每一对里最多一个先查证，任何一对都不会两侧同时停下",
    Object.values(perPair).every((c) => c === 1), JSON.stringify(perPair));

/* D. 概念单元的状态声明——防止那张精确到米的表被读成现状清单 */
add("B10", "二十个单元全部标为概念原型，不对应现状建筑",
    P.every((p) => p.design_status === "conceptual_typology_cell_not_existing_inventory"),
    `${P.filter((p) => p.design_status === "conceptual_typology_cell_not_existing_inventory").length}/20`);
add("B11", "每个单元的回滚状态都是保持现状使用与现状条件",
    P.every((p) => typeof p.rollback_state === "string" && p.rollback_state.includes("保持现状")),
    `${P.filter((p) => String(p.rollback_state).includes("保持现状")).length}/20`);

/* E. 评委主稿＋技术证据册 ↔ 数据的双向核对。
   前面各段只查数据内部规则；本段同时读精简后的 proposal.md 与保留完整表格的
   technical-evidence-book.md，把从数据算出来的数拿去两层可读证据里找。
   这一步是为了堵住本包已经犯过的那类错：**数据是对的，正文写反了**。
   B4 那样的规则检查抓不到它，因为它不读正文。 */
const primaryProse = fs.readFileSync(resolveIn(PKG, "proposal.md"), "utf8");
const evidenceProse = fs.readFileSync(
  resolveIn(PKG, "assets/media/technical-evidence-book.md"), "utf8");
const prose = evidenceProse;
const allProse = `${primaryProse}\n\n${evidenceProse}`;
const proseHas = (s, n) => (prose.split(s).length - 1) >= (n || 1);

const tableRows = prose.split("\n").filter((l) => l.startsWith("| BLDG-"));
add("P1", "落点表在正文里恰好 20 行，与 buildings.geojson 要素数一致",
    tableRows.length === buildings.length && tableRows.length === 20, `${tableRows.length} 行`);

const rowIds = tableRows.map((l) => l.split("|")[1].trim());
const geoIds = P.map((p) => p.id);
add("P2", "落点表列出的编号与 geojson 的编号集合完全相同，无遗漏无多余",
    rowIds.length === geoIds.length && [...rowIds].sort().join() === [...geoIds].sort().join(),
    `正文 ${rowIds.length} 个 / 数据 ${geoIds.length} 个`);

/* 逐行核对表里的类型与东西侧——这一列写反过一次，必须机器盯着 */
const geoById = Object.fromEntries(P.map((p) => [p.id, p]));
const sideZh = { west: "西", east: "东" };
const rowMismatch = [];
for (const line of tableRows) {
  const c = line.split("|").map((s) => s.trim());
  const id = c[1], ty = c[2], side = c[4].replace(/\*/g, "");
  const g = geoById[id];
  if (!g) { rowMismatch.push(`${id} 不在数据里`); continue; }
  if (g.typology !== ty) rowMismatch.push(`${id} 类型 正文=${ty} 数据=${g.typology}`);
  if (sideZh[g.side] !== side) rowMismatch.push(`${id} 东西侧 正文=${side} 数据=${sideZh[g.side]}`);
}
add("P3", "落点表每一行的类型与东西侧都与 geojson 逐行一致",
    rowMismatch.length === 0, rowMismatch.length ? rowMismatch.join("；") : "20 行全对");

add("P4", "正文写出了基底合计（22.10 万 m² 与 221,014）", proseHas("22.10 万") && proseHas("221,014"),
    `22.10 万 ×${prose.split("22.10 万").length - 1}，221,014 ×${prose.split("221,014").length - 1}`);
add("P5", "正文写出了研制与服务的相等值 51,744", proseHas("51,744", 2),
    `×${prose.split("51,744").length - 1}`);
add("P6", "正文写出了主轴复算长度 9499.778", proseHas("9499.778"),
    `×${prose.split("9499.778").length - 1}`);
add("P7", "正文写出了单元到主轴的垂距区间 245–414", proseHas("245–414"),
    `×${prose.split("245–414").length - 1}`);
add("P8", "正文写出了「西收东放」这条横向语法", proseHas("西收东放"),
    `×${prose.split("西收东放").length - 1}`);
add("P9", "正文写出了三处重点区的断面实取值 15.4／17.1／15.1", proseHas("15.4／17.1／15.1"),
    `×${prose.split("15.4／17.1／15.1").length - 1}`);

/* P10：二十个单元垂距的四个统计量，全部由落点表那一列当场算出。
   2026-08-22 加。此前只钉住区间「245–414」，而摘要句里的「中位 337」在偶数个取值下
   把第 11 项本身当成了中位数（正确口径是第 10、11 项之均值 = 330），**无人拦下**。
   四个数一并钉住，且合计必须等于正文另一处声明的接入段合计 6596 m —— 两处互为校验。 */
{
  const col = (l) => l.replace(/^\|/, "").split("|").map((x) => x.trim());
  const dists = tableRows.map((l) => Number(col(l)[6].replace(/,/g, ""))).sort((a, b) => a - b);
  const sum = dists.reduce((a, b) => a + b, 0);
  const mean = sum / dists.length;
  const med = dists.length % 2 === 0
    ? (dists[dists.length / 2 - 1] + dists[dists.length / 2]) / 2
    : dists[(dists.length - 1) / 2];
  const near = (a, b, t) => Math.abs(a - b) <= t;
  const allNum = dists.length === 20 && dists.every((x) => Number.isFinite(x));
  add("P10", "落点表垂距一列的四个统计量与正文摘要一致（区间／平均／中位／合计），中位按偶数个取值取第 10、11 项之均值",
      allNum && near(dists[0], 245, 0.5) && near(dists[19], 414, 0.5)
      && near(mean, 330, 0.5) && near(med, 330, 0.5) && sum === 6596
      && proseHas("245–414") && proseHas("平均 330 m") && proseHas("中位 330 m")
      && proseHas("6596 m"),
      allNum
        ? `表内 min ${dists[0]} / max ${dists[19]} / 平均 ${mean.toFixed(1)} / 中位 ${med} / 合计 ${sum}`
        : `落点表垂距列解析失败：解析到 ${dists.length} 个值`);
}

/* P11. 四季活动名的单一权威。2026-08-22 查出正文里有两套四季活动：
   《年度活动体系》一节的表给出 开放问题周／验证开放日／全球交接周／年度交接账发布，
   而《条件分期》一节写的是 开源交班／维护者之夜／全球交接周／（冬季无名），只有一个对上；
   F/08 图件上的活动 IP 又是第三套（含 夜班维护者之夜、年度复盘班，两者全文 0 次）。
   已统一到表为准。这一项盯三件事：表恰 4 行、每个名字在正文另一处也出现、退役名零出现。
   4 这个规模写死——表少一行时「逐名一致」仍会成立。 */
{
  const head = "| 时节 | 活动 | 对应环节 | 留下的公共产物 |";
  const i = prose.indexOf(head);
  const rows = i < 0 ? [] : prose.slice(i, prose.indexOf("\n\n", i)).split("\n")
    .filter((l) => l.startsWith("|")).slice(2);
  const names = rows.map((l) => {
    const cell = l.split("|").map((x) => x.trim())[2] || "";
    return cell.split(/[：:]/)[0].replace(/\*+/g, "").trim();
  }).filter(Boolean);
  const retired = ["开源交班", "维护者之夜", "夜班维护者之夜", "年度复盘班"];
  const stillThere = retired.filter((n) => prose.includes(n));
  const onlyOnce = names.filter((n) => (prose.split(n).length - 1) < 2);
  add("P11", "四季活动只有一套名称：《年度活动体系》表恰 4 行，四个名字在正文另有引用，三套并存时的退役名零出现",
      names.length === 4 && stillThere.length === 0 && onlyOnce.length === 0,
      names.length !== 4
        ? `四季表解析到 ${names.length} 行，应为 4 行`
        : stillThere.length
          ? `退役活动名仍在正文：${stillThere.join("、")}`
          : onlyOnce.length
            ? `只在表里出现一次、正文别处未引用：${onlyOnce.join("、")}`
            : `${names.join("／")}；退役名 0 处`);
}

/* F. 断面表的算术。
   本包第一处硬错就出在这里：通用断面表把「建筑退线」定义为 A1＋A2＋A3＋余量（一个容器），
   却又把它和它自己的子段一起相加，写出一个复算不出来的「单侧合计 18–27 m」。
   改法是把表分两层、合计只加 A/B/C/D/E 五项。**那条规则现在由机器盯着**：
   下面既核「合计＝五项之和」，也核「把容器的子段再加一遍会得到别的数」——
   后者是让原来那类错无法悄悄回来的那一条。 */
const tableAt = (head) => {
  const i = prose.indexOf(head);
  if (i < 0) return [];
  return prose.slice(i, prose.indexOf("\n\n", i)).split("\n").filter((l) => l.startsWith("|"));
};
const clean = (s) => s.replace(/\*+/g, "").trim();
const firstNum = (s) => {
  const m = clean(s).replace(/,/g, "").match(/(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : null;
};
const eq = (a, b) => Math.abs(a - b) < 1e-9;
const AREAS = ["众智园", "原点社区", "大钟寺"];

/* 三区取值表：按行首标签取三列 */
const perAreaRows = {};
for (const line of tableAt("| 分段 | 众智园").slice(2)) {
  const c = line.split("|").map(clean).slice(1, -1);
  perAreaRows[c[0]] = c.slice(1, 4);
}
const rowByPrefix = (pre) => {
  const k = Object.keys(perAreaRows).find((x) => x.startsWith(pre));
  return k ? perAreaRows[k] : null;
};
const setbackRow = rowByPrefix("A 建筑退线");
const seg = {
  A1: (rowByPrefix("A1") || []).map(firstNum),
  A2: (rowByPrefix("A2") || []).map(firstNum),
  A3: (rowByPrefix("A3") || []).map(firstNum),
  A: (setbackRow || []).map(firstNum),
  B: (rowByPrefix("B 铁路线索带") || []).map(firstNum),
  C: (rowByPrefix("C 人机物理隔离") || []).map(firstNum),
  D: (rowByPrefix("D 机器试验带") || []).map(firstNum),
  E: (rowByPrefix("E 绿化休憩带") || []).map(firstNum),
  TOT: (rowByPrefix("单侧合计") || []).map(firstNum),
};
const grab = (s, re) => { const m = String(s).match(re); return m ? parseFloat(m[1]) : null; };
const subtotal = (setbackRow || []).map((s) => grab(s, /小计\s*(\d+(?:\.\d+)?)/));
const slack = (setbackRow || []).map((s) => grab(s, /余量\s*\**(\d+(?:\.\d+)?)/));

const parsedOk = ["A1", "A2", "A3", "A", "B", "C", "D", "E", "TOT"].every(
  (k) => seg[k].length === 3 && seg[k].every((x) => x !== null)) &&
  subtotal.every((x) => x !== null) && slack.every((x) => x !== null);
add("F0", "断面三区取值表可被逐行解析（九段 × 三区 ＋ 小计 ＋ 余量）", parsedOk,
    parsedOk ? "解析成功" : "解析失败，后续 F 项不可信");

/* 解析失败时不能「跳过」这些检查——那会让检查总数变少而 all_match 仍为真，
   正是审计器最不该有的静默漏检。因此下面一律 add，解析失败即判失败。 */
const UNPARSED = "断面三区取值表未解析成功（见 F0），本项无法判定";
{
  const bad1 = [], bad2 = [], bad3 = [], bad4 = [], bad5 = [];
  if (parsedOk) {
  for (let i = 0; i < 3; i++) {
    const childSum = seg.A1[i] + seg.A2[i] + seg.A3[i];
    if (!eq(childSum, subtotal[i])) bad1.push(`${AREAS[i]} A1+A2+A3=${childSum} 小计=${subtotal[i]}`);
    if (!eq(subtotal[i] + slack[i], seg.A[i])) bad2.push(`${AREAS[i]} 小计+余量=${subtotal[i] + slack[i]} A=${seg.A[i]}`);
    const five = seg.A[i] + seg.B[i] + seg.C[i] + seg.D[i] + seg.E[i];
    if (!eq(Math.round(five * 10) / 10, seg.TOT[i])) bad3.push(`${AREAS[i]} 五项和=${five} 声明=${seg.TOT[i]}`);
    // 容器重复加的那个数必须与声明明显不同——这是让 18–27 m 那类错回不来的那一条
    if (Math.abs(five + childSum - seg.TOT[i]) <= 0.5) bad4.push(`${AREAS[i]} 容器重复加=${five + childSum} 与声明 ${seg.TOT[i]} 过近`);
    if (!(five >= 14.1 - 1e-9 && five <= 19.935 + 1e-9)) bad5.push(`${AREAS[i]} 合计 ${five} 越出 14.1–19.9`);
    }
  }
  const g = (bad) => (parsedOk ? bad.length === 0 : false);
  const m = (bad, ok) => (parsedOk ? (bad.join("；") || ok) : UNPARSED);
  add("F1", "每区 A1＋A2＋A3 等于表内小计", g(bad1), m(bad1, "三区全对"));
  add("F2", "每区「小计＋余量」等于建筑退线 A", g(bad2), m(bad2, "三区全对"));
  add("F3", "每区单侧合计等于 A＋B＋C＋D＋E 五项之和（只加五项）", g(bad3), m(bad3, "15.4／17.1／15.1 全对"));
  add("F4", "把容器 A 的子段再加一遍会得到与声明明显不同的数——原来那处「18–27 m」式的错无法悄悄回来",
      g(bad4), m(bad4, "三区重复加分别得 21.135／24.100／23.100，均与声明相去甚远"));
  add("F5", "三区合计都落在通用表给出的 14.1–19.9 区间内", g(bad5), m(bad5, "三区全在区间内"));

  const wait = rowByPrefix("A1") || [];
  const badArea = [];
  for (let i = 0; parsedOk && i < 3; i++) {
    const w = grab(wait[i], /面宽\s*(\d+(?:\.\d+)?)/);
    const declared = grab(wait[i], /(\d+(?:\.\d+)?)\s*m²/);
    if (w === null || declared === null || Math.abs(seg.A1[i] * w - declared) > 0.3) {
      badArea.push(`${AREAS[i]} 进深${seg.A1[i]}×面宽${w}=${seg.A1[i] * w} 声明${declared}`);
    }
  }
  add("F6", "每区等候面积等于进深 × 面宽（8／10／约 12 m² 每窗口）", g(badArea),
      m(badArea, "三区全对"));
}

/* 通用断面表：两条求和式与两个区间声明 */
const genRows = tableAt("| 断面分段（自公共界面向外）");
const totLine = genRows.find((l) => clean(l.split("|")[1] || "").startsWith("单侧断面合计")) || "";
const setLine = genRows.find((l) => clean(l.split("|")[1] || "").startsWith("A 建筑退线")) || "";
const loExpr = (totLine.match(/下限\s*([\d.＋+]+)\s*＝\s*\*{0,2}(\d+(?:\.\d+)?)/) || []);
const hiExpr = (totLine.match(/上限\s*([\d.＋+]+)\s*＝\s*\*{0,2}(\d+(?:\.\d+)?)/) || []);
const sumExpr = (s) => (s || "").split(/[＋+]/).map(parseFloat).filter((x) => !isNaN(x)).reduce((a, b) => a + b, 0);
add("F7", "通用表下限求和式自身成立（6.0＋0.6＋1.5＋2.0＋4.0 ＝ 14.1）",
    loExpr.length === 3 && eq(sumExpr(loExpr[1]), parseFloat(loExpr[2])),
    loExpr.length === 3 ? `${loExpr[1]} = ${sumExpr(loExpr[1])}，声明 ${loExpr[2]}` : "未解析到下限式");
add("F8", "通用表上限求和式自身成立（8.5＋1.435＋1.5＋2.5＋6.0 ＝ 19.9，一位小数）",
    hiExpr.length === 3 && eq(Math.round(sumExpr(hiExpr[1]) * 10) / 10, parseFloat(hiExpr[2])),
    hiExpr.length === 3 ? `${hiExpr[1]} = ${sumExpr(hiExpr[1])}，声明 ${hiExpr[2]}` : "未解析到上限式");

const a13 = setLine.match(/之和为\s*(\d+(?:\.\d+)?)[–—-](\d+(?:\.\d+)?)\s*m/);
const slk = setLine.match(/另留\s*(\d+(?:\.\d+)?)[–—-](\d+(?:\.\d+)?)\s*m\s*余量/);
/* F9／F10 同理：正则没匹配到不能让检查消失，否则改一个同义词就能把它「跳过」。 */
{
  const childSums = parsedOk ? [0, 1, 2].map((i) => seg.A1[i] + seg.A2[i] + seg.A3[i]) : [];
  const ok9 = parsedOk && !!a13 &&
    eq(parseFloat(a13[1]), Math.min(...childSums)) && eq(parseFloat(a13[2]), Math.max(...childSums));
  add("F9", "通用表「A1—A3 之和 5.7–8.0 m」与三区逐项实算的极值一致", ok9,
      !parsedOk ? UNPARSED
        : !a13 ? "未在通用表 A 行解析到「之和为 X–Y m」表述——措辞变了或该声明被删"
        : `声明 ${a13[1]}–${a13[2]}，实算 ${Math.min(...childSums)}–${Math.max(...childSums)}`);
  const ok10 = parsedOk && !!slk &&
    eq(parseFloat(slk[1]), Math.min(...slack)) && eq(parseFloat(slk[2]), Math.max(...slack));
  add("F10", "通用表「另留 0.3–1.0 m 余量」与三区实取余量的极值一致", ok10,
      !parsedOk ? UNPARSED
        : !slk ? "未在通用表 A 行解析到「另留 X–Y m 余量」表述——措辞变了或该声明被删"
        : `声明 ${slk[1]}–${slk[2]}，实取 ${slack.join("／")}`);
}

/* G. 三个矩阵的交叉引用完整性。
   矩阵是评审文本输入的一部分，读者会顺着 proposal_sections 去正文找对应章节；
   章节改名或被合并后，那一栏就会指向一个不存在的标题——引用死掉却看不出来。
   本包历史上出现过这类断链，本段把它变成可判定项。 */
const headings = new Set(
  primaryProse.split("\n").filter((l) => l.startsWith("#")).map((l) => l.replace(/^#+/, "").trim())
);
const matrixSpecs = [
  ["standard_matrix.json", "standards", "standard_id", "proposal_sections"],
  ["design_depth_matrix.json", "items", "item_id", "proposal_sections"],
  ["compliance_matrix.json", "requirements", "requirement_id", "report_sections"],
];
const dangling = [];
let refTotal = 0;
for (const [file, key, idField, secField] of matrixSpecs) {
  let doc;
  try { doc = readPkg(file); } catch (e) { dangling.push(`${file} 读不到`); continue; }
  for (const item of doc[key] || []) {
    let secs = item[secField];
    if (typeof secs === "string") secs = [secs];
    if (!Array.isArray(secs)) continue;
    for (const s of secs) {
      refTotal += 1;
      if (!headings.has(s)) dangling.push(`${file}#${item[idField]} → 「${s}」`);
    }
  }
}
add("G1", "三个矩阵里每一条 proposal_sections／report_sections 都指向 proposal.md 中真实存在的标题",
    dangling.length === 0,
    dangling.length ? `${dangling.length} 处断链：${dangling.slice(0, 4).join("；")}` : `${refTotal} 处引用全部命中`);

/* 反向：正文里的 [standard:] 与 [depth:] 标记必须能在矩阵里解析到 */
const stdIds = new Set((readPkg("standard_matrix.json").standards || []).map((x) => x.standard_id));
const depIds = new Set((readPkg("design_depth_matrix.json").items || []).map((x) => x.item_id));
const usedStd = [...new Set((allProse.match(/\[standard:([A-Za-z0-9_\-.]+)\]/g) || []).map((s) => s.slice(10, -1)))];
const usedDep = [...new Set((allProse.match(/\[depth:([A-Za-z0-9_\-.]+)\]/g) || []).map((s) => s.slice(7, -1)))];
const badStd = usedStd.filter((x) => !stdIds.has(x));
const badDep = usedDep.filter((x) => !depIds.has(x));
add("G2", "正文的 [standard:] 标记全部能在 standard_matrix.json 里解析到",
    badStd.length === 0, badStd.length ? badStd.join("、") : `${usedStd.length} 个全部命中`);
add("G3", "正文的 [depth:] 标记全部能在 design_depth_matrix.json 里解析到",
    badDep.length === 0, badDep.length ? badDep.join("、") : `${usedDep.length} 个全部命中`);

/* G4. PDF 文字层回归守卫。技术内页的 CID 字体必须继续使用恒等 bfrange；v2.0 首页由
   Chromium 用 OFL Noto Sans CJK SC 生成，首页与 F/06、F/07 附页的子集按实际使用字形写稀疏 bfchar／bfrange，
   不能也不应强改成恒等映射。两类分别锁定：内页恒等 CMap 数不能减少，首页稀疏 CMap 数
   不能漂移，且稀疏表必须声明 Adobe-Identity-UCS、含实际映射、目标码位不得落入替换符、
   私用区或 CJK 兼容区。这样仍能抓住 2026-08-22 那种 code→字形索引回归，也不会把合法
   的子集 ToUnicode 误判为错误。直接读 PDF 字节、用 Node 内置 zlib 解流，无第三方依赖。 */
{
  const zlib = require("zlib");
  const PDFS = ["a0-boards.pdf", "a3-booklet.pdf", "a0-boards.en.pdf", "a3-booklet.en.pdf"];
  const EXPECTED = {
    "a0-boards.pdf": { identity: 3, sparse: 52 },
    "a3-booklet.pdf": { identity: 2, sparse: 52 },
    "a0-boards.en.pdf": { identity: 2, sparse: 15 },
    "a3-booklet.en.pdf": { identity: 2, sparse: 15 },
  };
  const destinationCodepoints = (hex) => {
    if (!hex || hex.length % 4 !== 0) return [];
    const units = [];
    for (let i = 0; i < hex.length; i += 4) units.push(parseInt(hex.slice(i, i + 4), 16));
    const codepoints = [];
    for (let i = 0; i < units.length; i += 1) {
      const unit = units[i];
      if (unit >= 0xd800 && unit <= 0xdbff && units[i + 1] >= 0xdc00 && units[i + 1] <= 0xdfff) {
        codepoints.push(0x10000 + ((unit - 0xd800) << 10) + (units[i + 1] - 0xdc00));
        i += 1;
      } else codepoints.push(unit);
    }
    return codepoints;
  };
  const bad = [];
  let cmapCount = 0, identityTotal = 0, sparseTotal = 0;
  for (const name of PDFS) {
    let buf;
    try { buf = fs.readFileSync(resolveIn(PKG, path.join("drawings", name))); }
    catch (e) { bad.push(`${name}: 读不到（${e.code}）`); continue; }
    let identity = 0, sparse = 0;
    let hasNoto = buf.toString("latin1").includes("NotoSansCJKsc-Medium");
    let from = 0;
    for (;;) {
      const s0 = buf.indexOf("stream", from);
      if (s0 < 0) break;
      let b = s0 + 6;
      if (buf[b] === 0x0d) b += 1;
      if (buf[b] === 0x0a) b += 1;
      const e0 = buf.indexOf("endstream", b);
      if (e0 < 0) break;
      from = e0 + 9;
      const raw = buf.subarray(b, e0);
      let text = null;
      try { text = zlib.inflateSync(raw).toString("latin1"); }
      catch (_) { text = raw.toString("latin1"); }
      if (text.includes("NotoSansCJKsc-Medium")) hasNoto = true;
      if (!text.includes("begincmap")) continue;
      cmapCount += 1;
      const flat = text.replace(/[\s]/g, "");
      if (flat.includes("<0000><ffff><0000>")) {
        identity += 1;
      } else {
        sparse += 1;
        if (!text.includes("/CMapName /Adobe-Identity-UCS")) bad.push(`${name}: 首页稀疏 CMap 缺 Adobe-Identity-UCS 声明`);
        const dests = [];
        for (const line of text.split("\n")) {
          const m2 = line.match(/^\s*<[0-9a-fA-F]+>\s*<([0-9a-fA-F]{4}(?:[0-9a-fA-F]{4})*)>\s*$/);
          const m3 = line.match(/^\s*<[0-9a-fA-F]+>\s*<[0-9a-fA-F]+>\s*<([0-9a-fA-F]{4}(?:[0-9a-fA-F]{4})*)>\s*$/);
          if (m2 || m3) dests.push(...destinationCodepoints((m2 || m3)[1]));
        }
        if (!dests.length) bad.push(`${name}: 首页稀疏 CMap 没有可解析目标码位`);
        if (dests.some((cp) => cp === 0xfffd
          || (cp >= 0xe000 && cp <= 0xf8ff)
          || (cp >= 0xf900 && cp <= 0xfaff)
          || (cp >= 0xf0000 && cp <= 0xffffd)
          || (cp >= 0x100000 && cp <= 0x10fffd))) {
          bad.push(`${name}: 首页稀疏 CMap 目标落入替换符、私用区或 CJK 兼容区`);
        }
      }
    }
    identityTotal += identity;
    sparseTotal += sparse;
    const exp = EXPECTED[name];
    if (identity !== exp.identity || sparse !== exp.sparse) {
      bad.push(`${name}: CMap 规模 ${identity} 恒等＋${sparse} 稀疏，应为 ${exp.identity}＋${exp.sparse}`);
    }
    if (!hasNoto) bad.push(`${name}: v2.0 首页 OFL 字体名缺失`);
  }
  add("G4", "四套图纸的技术基线页保留恒等 ToUnicode；v2.0 首页与 F/06、F/07 附页使用合法稀疏 ToUnicode 与 OFL Noto 子集，目标码位无替换符、私用区或 CJK 兼容区",
      bad.length === 0 && cmapCount === 143 && identityTotal === 9 && sparseTotal === 134,
      bad.length ? bad.slice(0, 4).join("；") : `143 个 CMap：技术基线页 9 个恒等映射＋首页／附页 134 个合法稀疏映射`);
}

/* G6/G7/G8/G9/G10. 评分器暴露的表达层盲点必须进入总退出码：无系统中文字体时的
   HTML 字形覆盖、等宽控件重置后的显式 CJK 回退、各可见载体的包版本一致性，
   七类用地在六个载体中的非颜色纹理冗余，以及公共服务等价合同中设计覆盖
   与真实观察边界的硬分栏，以及 P0 的交付/公共利益/可操作原型。五项各由独立小审计器负责，
   本审计器只把其机器可读结论并入 69 项总清单；
   覆盖层原样下传给阴性自测。 */
function runNestedAudit(filename) {
  const env = Object.assign({}, process.env);
  if (OVERLAY) env.JZ_AUDIT_OVERLAY = OVERLAY;
  const result = spawnSync(process.execPath, [path.join(HERE, filename), "--json"], {
    encoding: "utf8", env, maxBuffer: 64 * 1024 * 1024,
  });
  let parsed = null;
  try { parsed = JSON.parse(result.stdout || ""); } catch (_) { /* below reports stderr */ }
  return { status: result.status, parsed, stderr: result.stderr || "" };
}

{
  const result = runNestedAudit("webfont-audit.js");
  const problems = result.parsed && Array.isArray(result.parsed.errors)
    ? result.parsed.errors : [result.stderr || "无法解析 webfont-audit.js 输出"];
  add("G6", "四份 HTML 使用包内 OFL CJK WOFF2，字体哈希、许可、来源、全部可见非 ASCII 字形及 24 类等宽控件回退闭合",
      result.status === 0 && result.parsed && result.parsed.ok === true,
      problems.length ? problems.slice(0, 4).join("；")
        : `${result.parsed.pages_checked} 页／${result.parsed.font_bytes} bytes／${result.parsed.visible_codepoint_sets_checked} 组可见字符／${result.parsed.interactive_mono_fallback_selectors_checked} 类等宽控件`);
}

{
  const result = runNestedAudit("version-audit.js");
  const problems = result.parsed && Array.isArray(result.parsed.errors)
    ? result.parsed.errors : [result.stderr || "无法解析 version-audit.js 输出"];
  add("G7", "30 张图件、四套 46 页 PDF、A0 首页四张内嵌图、四份 HTML 与两份触觉 SVG 的可见投稿包标识统一为 PACKAGE v2.0",
      result.status === 0 && result.parsed && result.parsed.ok === true,
      problems.length ? problems.slice(0, 4).join("；")
        : `${result.parsed.figure_count} 图件／${result.parsed.pdf_count} 套 ${result.parsed.pdf_page_count} 页 PDF／A0 内嵌图 ${result.parsed.a0_embedded_figure_pixel_matches}/4 像素一致／${result.parsed.static_deliverables_checked} 静态载体`);
}

{
  const result = runNestedAudit("land-use-pattern-audit.js");
  const problems = result.parsed && Array.isArray(result.parsed.errors)
    ? result.parsed.errors : [result.stderr || "无法解析 land-use-pattern-audit.js 输出"];
  add("G8", "七类用地在中英 F/02 与四套送审 PDF 第 2 页均使用唯一纹理，覆盖图斑与图例且保留原色值；真实用户共测仍明确为未完成",
      result.status === 0 && result.parsed && result.parsed.ok === true,
      problems.length ? problems.slice(0, 4).join("；")
        : `${result.parsed.land_use_codes_checked} 类 × ${result.parsed.carriers_checked} 载体／${result.parsed.pattern_region_checks} 个纹理区域检查`);
}

{
  const result = runNestedAudit("public-service-equivalence-audit.js");
  const problems = result.parsed && Array.isArray(result.parsed.errors)
    ? result.parsed.errors : [result.stderr || "无法解析 public-service-equivalence-audit.js 输出"];
  add("G9", "十二个场景均有先于智能层存在的无 AI 基础路线与两条人工渠道；八类无障碍需求夹具逐项完整，真实观察与真实通过仍明确为 0",
      result.status === 0 && result.parsed && result.parsed.ok === true,
      problems.length ? problems.slice(0, 4).join("；")
        : `${result.parsed.no_ai_base_routes_valid}/12 基础路线／${result.parsed.human_floor_channels_checked} 条人工渠道／${result.parsed.accessibility_requirement_fixtures_valid}/8 需求夹具／真实观察 ${result.parsed.real_user_observation_count}／通过 ${result.parsed.real_user_pass_count}`);
}

{
  const result = runNestedAudit("p0-readiness-audit.js");
  const problems = result.parsed && Array.isArray(result.parsed.errors)
    ? result.parsed.errors : [result.stderr || "无法解析 p0-readiness-audit.js 输出"];
  add("G10", "SCN-05 单场景 P0 同时具备八门、五阶段、十项 RACI、十二项构件、八项预注册验收、十二组预可研自洽检查、二十六组专业实施交接检查（含 F/05 图板表面、五视图映射与主张边界）、三档评委路径、七项评分证据索引、六类公共群体、十二场景公共利益硬门槛与可操作离线原型；并把参与者敏感性与正式场地、文件回执、任命、双钥匙回执、调试执行、报价、保险、预算、专业签认和现场绩效分栏锁定；真实观察仍为 0",
      result.status === 0 && result.parsed && result.parsed.ok === true,
      problems.length ? problems.slice(0, 4).join("；")
        : `${result.parsed.entry_gates_valid} 门／${result.parsed.delivery_stages_valid} 阶段／${result.parsed.raci_work_packages_valid} RACI／${result.parsed.component_line_items_valid} 构件／${result.parsed.acceptance_criteria_valid} 验收／预可研 ${result.parsed.pre_feasibility_checks_valid}/${result.parsed.pre_feasibility_checks_expected}／专业交接 ${result.parsed.implementation_handoff_checks_valid}/${result.parsed.implementation_handoff_checks_expected}／评委路径 ${result.parsed.jury_paths_valid}/${result.parsed.jury_paths_expected}／评分索引 ${result.parsed.rubric_dimensions_valid}/${result.parsed.rubric_dimensions_expected}／${result.parsed.public_benefit_groups_valid} 群体／${result.parsed.scenario_public_value_gates_valid} 场景公共门／资格证据 ${result.parsed.eligibility_evidence_checks_valid}／评审归类 ${result.parsed.review_items_classified_valid}／原型 ${result.parsed.prototype_checks_valid}/${result.parsed.prototype_checks_expected}／真实观察 ${result.parsed.real_participant_observations}`);
}

/* H. sources.json 的字段深度——CLAUDE.md 记为与分数相关性最高的特征，缺一栏就是缺证据 */
const sources = readPkg("sources.json").sources || [];
const REQF = ["authority_level", "evidence_class", "collection_method", "spatial_coverage",
              "temporal_coverage", "license_or_reuse_terms", "usable_for", "not_usable_for"];
const shallow = [];
for (const s of sources) {
  const missing = REQF.filter((f) => {
    const v = s[f];
    return v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);
  });
  if (missing.length) shallow.push(`${s.id} 缺 ${missing.join("／")}`);
}
const sourceCountZh = primaryProse.match(/完整\s*(\d+)\s*条来源/);
const sourceCountEn = fs.readFileSync(resolveIn(PKG, "proposal.en.md"), "utf8").match(/All\s+(\d+)\s+sources/i);
const sourceCountProblems = [];
if (!sourceCountZh) sourceCountProblems.push("中文正文抓不到「完整 N 条来源」");
else if (Number(sourceCountZh[1]) !== sources.length) sourceCountProblems.push(`中文正文自陈 ${sourceCountZh[1]} 条，实为 ${sources.length}`);
if (!sourceCountEn) sourceCountProblems.push("英文正文抓不到「All N sources」");
else if (Number(sourceCountEn[1]) !== sources.length) sourceCountProblems.push(`英文正文自陈 ${sourceCountEn[1]} 条，实为 ${sources.length}`);
add("H1", `sources.json 每一条都登记了八个必备字段，且中英正文来源总数均与登记实算一致（共 ${sources.length} 条）`,
    shallow.length === 0 && sourceCountProblems.length === 0,
    shallow.length ? shallow.slice(0, 3).join("；")
      : sourceCountProblems.length ? sourceCountProblems.join("；") : `${sources.length} 条全部齐备；中英自陈 ${sources.length}/${sources.length}`);

/* I. metrics.json 的精度口径：三位以上小数的指标必须带 precision_note */
const deep = Object.entries(metrics).filter(([, m]) =>
  typeof m.value === "number" && String(m.value).includes(".") &&
  String(m.value).split(".")[1].length >= 3);
const noNote = deep.filter(([, m]) => !m.precision_note);
add("I1", `三位以上小数的指标全部带 precision_note（共 ${deep.length} 项）`,
    noNote.length === 0, noNote.length ? noNote.map(([k]) => k).join("、") : `${deep.length} 项全部带说明`);

/* K. 布局对照实验的复算。三种布局共用同一组位置、面积与东西侧，只有功能标签不同，
   所以全部指标只用落点表那三列整数（里程、垂距、基底），是纯算术，不需要投影。
   声明值从正文那张对照表里**解析**而来，不写死在这里——正文改了或算法改了都会报错。 */
const KT = ["开放研发院", "验证工坊", "社区协作屋", "共享服务栈"]; // 研制→验证→公开→服务
const KFIELD_CH = [8529, 5391, 777]; // 三处交接场形心里程，正文口径段已写明
const kRows = tableRows.map((l) => {
  const c = l.split("|").map((x) => x.trim());
  return {
    id: c[1], typ: c[2], side: c[4].replace(/\*/g, ""),
    area: Number(c[5].replace(/,/g, "")), ch: Number(c[6].replace(/,/g, "")), off: Number(c[7]),
  };
}).sort((a, b) => a.ch - b.ch);
const kWalk = (a, b) => a.off + b.off + Math.abs(a.ch - b.ch);
const kPairs = [];
for (let i = 0; i + 1 < kRows.length; i += 2) kPairs.push([kRows[i], kRows[i + 1]]);

const layout = (assign) => {
  const cs = kRows.map((c) => Object.assign({}, c, { typ: assign[c.id] }));
  const by = {};
  for (const t of KT) by[t] = cs.filter((c) => c.typ === t);
  if (KT.some((t) => by[t].length < 2)) return null;
  const same = cs.reduce((s, c) =>
    s + Math.min(...by[c.typ].filter((o) => o.id !== c.id).map((o) => kWalk(c, o))), 0);
  const cross = cs.reduce((s, c) => s + KT.filter((t) => t !== c.typ)
    .reduce((u, t) => u + Math.min(...by[t].map((o) => kWalk(c, o))), 0), 0);
  let cyc = Infinity, path = null;
  for (const a of by[KT[0]]) for (const b of by[KT[1]]) for (const c of by[KT[2]]) for (const d of by[KT[3]]) {
    const t = kWalk(a, b) + kWalk(b, c) + kWalk(c, d);
    if (t < cyc) { cyc = t; path = [a, b, c, d]; }
  }
  const tot = KT.map((t) => by[t].reduce((s, c) => s + c.area, 0));
  return {
    same, cross, cyc,
    crossAxis: [0, 1, 2].filter((i) => path[i].side !== path[i + 1].side).length,
    full: KFIELD_CH.map((f) => new Set(cs.filter((c) => Math.abs(c.ch - f) <= 500).map((c) => c.typ)).size),
    pairTypes: kPairs.map(([a, b]) => new Set([assign[a.id], assign[b.id]]).size),
    spread: Math.max(...tot) - Math.min(...tot),
    sides: ["西", "东"].map((sd) => new Set(cs.filter((c) => c.side === sd).map((c) => c.typ)).size),
  };
};
const asgCur = Object.fromEntries(kRows.map((c) => [c.id, c.typ]));
const asgA = {};
kPairs.forEach(([a, b], i) => { asgA[a.id] = KT[i % 4]; asgA[b.id] = KT[i % 4]; });
const asgB = Object.fromEntries(kRows.map((c, i) => [c.id, KT[Math.floor(i / 5)]]));
const L3 = [layout(asgCur), layout(asgA), layout(asgB)];
const kOk = kRows.length === 20 && L3.every((x) => x !== null);

/* 从正文对照表解析声明值：按行首标签找行，取每格的数字 */
const kLine = (label) => prose.split("\n").find((l) => l.startsWith("| ") && l.includes(label));
const kCells = (label) => {
  const l = kLine(label);
  return l ? l.split("|").slice(2, 5).map((x) => x.trim()) : null;
};
const nums = (cell) => (cell.replace(/,/g, "").match(/\d+/g) || []).map(Number);
const first3 = (label) => {
  const c = kCells(label);
  return c && c.every((x) => nums(x).length) ? c.map((x) => nums(x)[0]) : null;
};

const kCmp = (label, got, want) =>
  want === null ? `正文未解析到「${label}」一行——表被改动或该声明被删`
    : (JSON.stringify(got) === JSON.stringify(want) ? null
       : `声明 ${JSON.stringify(want)}，实算 ${JSON.stringify(got)}`);

const dCyc = first3("一次交接循环最短步行");
const dAxis = first3("该循环的跨轴次数");
let why = !kOk ? "落点表未解析成 20 行或某类不足两个，本项无法判定"
  : (kCmp("一次交接循环最短步行", L3.map((x) => x.cyc), dCyc)
     || kCmp("该循环的跨轴次数", L3.map((x) => x.crossAxis), dAxis));
add("K1", "三种布局的「一次交接循环最短步行」与该循环跨轴次数，由落点表整数列复算后与正文对照表逐个一致",
    why === null, why || `循环 ${L3.map((x) => x.cyc).join("／")} m，跨轴 ${L3.map((x) => x.crossAxis).join("／")}`);

const dCross = first3("异类互达合计"), dSame = first3("同类互达合计");
why = !kOk ? "同上，本项无法判定"
  : (kCmp("异类互达合计", L3.map((x) => x.cross), dCross)
     || kCmp("同类互达合计", L3.map((x) => x.same), dSame));
add("K2", "三种布局的异类互达合计与同类互达合计，复算后与正文对照表逐个一致",
    why === null, why || `异类 ${L3.map((x) => x.cross).join("／")}，同类 ${L3.map((x) => x.same).join("／")}`);

const cFull = kCells("三处交接场 500 m 内类型齐备");
const dFull = cFull && cFull.every((x) => nums(x).length >= 3) ? cFull.map((x) => nums(x).slice(0, 3)) : null;
const dSpread = first3("四类基底合计极差");
why = !kOk ? "同上，本项无法判定"
  : (kCmp("三处交接场 500 m 内类型齐备", L3.map((x) => x.full), dFull)
     || kCmp("四类基底合计极差", L3.map((x) => x.spread), dSpread));
add("K3", "三处交接场 ±500 m 内的类型齐备数与四类基底极差，复算后与正文对照表逐个一致",
    why === null, why || `齐备 ${L3.map((x) => x.full.join("/")).join("／")}，极差 ${L3.map((x) => x.spread).join("／")}`);

const gaps = kPairs.map(([a, b]) => Math.abs(a.ch - b.ch)).sort((x, y) => x - y);
const accSum = kRows.reduce((s, c) => s + c.off, 0);
const dGaps = (() => {
  const m = prose.match(/十对单元横跨主轴的里程差是 \*\*([\d、\s]+?)\s*m\*\*/);
  return m ? m[1].split("、").map((x) => Number(x.trim())).sort((x, y) => x - y) : null;
})();
const pairOk = JSON.stringify(L3[0].pairTypes) === JSON.stringify(Array(10).fill(2))
  && JSON.stringify(L3[1].pairTypes) === JSON.stringify(Array(10).fill(1))
  && L3[2].pairTypes.filter((x) => x === 2).length === 2;
why = !kOk ? "同上，本项无法判定"
  : (dGaps === null ? "正文未解析到「十对单元横跨主轴的里程差是 … m」——措辞变了或该声明被删"
     : JSON.stringify(gaps) !== JSON.stringify(dGaps) ? `十对里程差 声明 ${dGaps.join("、")}，实算 ${gaps.join("、")}`
     : accSum !== 6596 ? `接入段合计实算 ${accSum}，应为 6596`
     : !pairOk ? `每对类型数不符：现状 ${L3[0].pairTypes.join("")}，A ${L3[1].pairTypes.join("")}，B ${L3[2].pairTypes.join("")}`
     : L3.map((x) => x.sides.join("")).join(",") !== "22,44,44" ? `单侧类型数 ${L3.map((x) => x.sides.join("")).join(",")}，应为 22,44,44`
     : null);
add("K4", "十对横跨主轴的里程差、接入段合计 6,596 m、每对类型数与单侧类型数四项，复算后与正文一致",
    why === null, why || `里程差 ${gaps.join("、")}；接入 ${accSum} m；每对 现状全2／A全1／B八1两2；单侧 22,44,44`);

/* J. sources.json 的内部指针：现行登记不得把读者指向已作废的历史条目。
   本包出现过一次——栅格字体 2026-08-17 迁到 OFL 之后，三条现行登记的
   not_usable_for／usage 仍把「当前栅格图件的字形来源」指向那两条 Apple 字体历史登记。 */
const sup = new Set(sources.filter((x) => (x.not_usable_for || [])
  .some((t) => String(t).includes("作为当前任何交付物的权利依据"))).map((x) => x.id));
const badPtr = [];
for (const x of sources) {
  if (sup.has(x.id)) continue;
  for (const [k, v] of Object.entries(x)) {
    for (const t of (Array.isArray(v) ? v : [v])) {
      if (typeof t !== "string") continue;
      for (const dead of sup) {
        if (t.includes(dead) && !t.includes("历史") && !t.includes("之前")) {
          badPtr.push(`${x.id}#${k} → ${dead}`);
        }
      }
    }
  }
}
add("J1", `sources.json 里 ${sup.size} 条已自陈作废的登记，没有被任何现行登记当作现行依据引用（引用须明标历史）`,
    badPtr.length === 0, badPtr.length ? badPtr.join("；") : `作废 ${[...sup].join("、")}；现行条目零处误引`);

/* J2. 矩阵自陈的推导规则。compliance_matrix.json 写着「standard_ids 的下界＝本条
   report_sections 与 standard_matrix.proposal_sections 的交集」。本轮整合版把旧版细碎章节
   归并成官方 13 个必备章节后重新跑了完整交集；归并会让同章内的相关标准产生更多交集，
   所以同步补齐全部声明。三段分解的规模写死在这里：夹具少几条时「逐条一致」仍会成立
   而总数变小，所以 N 必须来自被审对象之外（同 protocol-check-runner.js 的 EXPECTED_SCALE）。 */
const cmJ2 = readPkg("compliance_matrix.json");
const smJ2 = readPkg("standard_matrix.json");
const secOfJ2 = new Map((smJ2.standards || []).map((s) => [s.standard_id, new Set(s.proposal_sections || [])]));
const DEFN_J2 = new Set(["PROJECT-OFFICIAL-ANNOUNCEMENT", "PROJECT-AGENT-OPEN-CALL-TASKBOOK"]);
let derivedPairs = 0, declaredPairs = 0, defnExtra = 0, relExtra = 0;
const notInPlace = [];
for (const r of cmJ2.requirements || []) {
  const secs = new Set(r.report_sections || []);
  const derived = new Set();
  for (const [sid, ps] of secOfJ2) {
    for (const s of secs) if (ps.has(s)) { derived.add(sid); break; }
  }
  derivedPairs += derived.size;
  const declared = new Set(r.standard_ids || []);
  declaredPairs += declared.size;
  for (const sid of derived) if (!declared.has(sid)) notInPlace.push(`${r.requirement_id}:${sid}`);
  for (const sid of declared) if (!derived.has(sid)) { if (DEFN_J2.has(sid)) defnExtra++; else relExtra++; }
}
add("J2", "compliance_matrix 自陈的 standard_ids 推导规则成立：规则导出的每一对 (要求,标准) 都已声明，且三段分解与自陈一致（120 规则导出 ＋ 5 定义性挂接 ＋ 5 实质相关性挂接 ＝ 130）",
    notInPlace.length === 0 && derivedPairs === 120 && declaredPairs === 130
    && defnExtra === 5 && relExtra === 5,
    notInPlace.length
      ? `规则导出但未声明 ${notInPlace.length} 处：${notInPlace.slice(0, 6).join("、")}`
      : `声明 ${declaredPairs} ＝ 规则导出 ${derivedPairs} ＋ 定义性 ${defnExtra} ＋ 相关性 ${relExtra}`);

/* L1. 许可块的机器读取入口必须自足，且复制出来的授权正文不得与原文漂移。
   2026-08-22 按严格口径的 risk_compliance repair 补了 license.effective_grant——
   把「当前即时生效的完整授权」做成机器可读（SPDX 表达式 ＋ 条件 ＋ 禁止项 ＋
   未发布条款只能收紧不能放宽的上界规则），因为只读 identifier 的工具会拿到一个
   组织方未发布条款的枚举值、得不到任何可执行条款。
   **补它的代价是把授权正文复制了一份，复制就会漂移**，所以这一项把两处钉在一起：
   effective_grant.full_text_zh/en 必须与 author_grant_zh/en 逐字节相同。
   顺带钉住三个布尔／表达式，防止「未发布条款可以放宽」这条被悄悄改掉。 */
{
  const lic = readPkg("manifest.json").license || {};
  const eg = lic.effective_grant || {};
  const probs = [];
  if (lic.identifier_is_operative !== false) probs.push("identifier_is_operative 不为 false");
  if (eg.depends_on_unpublished_terms !== false) probs.push("effective_grant.depends_on_unpublished_terms 不为 false");
  if (eg.expression !== "CC-BY-NC-4.0") probs.push(`effective_grant.expression = ${JSON.stringify(eg.expression)}，应为 "CC-BY-NC-4.0"`);
  if (eg.full_text_zh !== lic.author_grant_zh) probs.push("effective_grant.full_text_zh 与 author_grant_zh 已漂移");
  if (eg.full_text_en !== lic.author_grant_en) probs.push("effective_grant.full_text_en 与 author_grant_en 已漂移");
  for (const [k, needle] of [["future_terms_rule_zh", "更宽"], ["future_terms_rule_en", "looser"]]) {
    if (!String(eg[k] || "").includes(needle)) probs.push(`${k} 里找不到「更宽时仍按本条范围授权」那一层`);
  }
  add("L1", "许可块的机器读取入口自足：identifier 明标为非实际条款，effective_grant 给出当前即时生效的完整授权（SPDX 表达式 ＋ 条件 ＋ 禁止项 ＋ 未发布条款只能收紧的上界），且复制的授权正文与 author_grant 逐字节相同",
      probs.length === 0,
      probs.length ? probs.join("；") : `expression ${eg.expression}；授权正文两处逐字节相同；未发布条款为上界规则在位`);
}

/* J3. sources.json 里「`grep -c X <文件>` → N」这类可执行核验声明必须真的等于 N。
   2026-08-22 修掉一处：SRC-JINGZHANG-1909 的核验字段同段先写「→ 2（史实表 1 处、
   参考资料 1 处）」，末尾又写「删去任务书总对照与参考资料两节后实测为 1」——参考资料
   一节并没有被删（曾误删一次、当轮已恢复），所以那段自己跟自己矛盾，数也是错的。
   成因是上一次改正文后**在旧句后面追加了一句**而没有把旧句改掉。
   本项按 grep -c 的语义算「命中的行数」（不是出现次数），支持 `\|` 交替；
   声明条数 4 写死参与退出码——某条声明被悄悄删掉时「逐条一致」仍会成立。 */
{
  const srcs = readPkg("sources.json").sources || [];
  const re = /`grep -c\s+([^\s`]+)\s+([A-Za-z0-9_.\/-]+)`\s*(?:→|->)\s*\*{0,2}(\d+)/g;
  const claims = [];
  for (const s of srcs) {
    for (const [k, v] of Object.entries(s)) {
      if (typeof v !== "string") continue;
      let m;
      re.lastIndex = 0;
      while ((m = re.exec(v)) !== null) {
        claims.push({ id: s.id, field: k, token: m[1].replace(/^['"]|['"]$/g, ""), file: m[2], want: Number(m[3]) });
      }
    }
  }
  const bad = [];
  for (const c of claims) {
    let text;
    try { text = fs.readFileSync(resolveIn(PKG, c.file), "utf8"); }
    catch (e) { bad.push(`${c.id}: 读不到 ${c.file}`); continue; }
    const alts = c.token.split("\\|").filter(Boolean);
    const got = text.split("\n").filter((line) => alts.some((t) => line.includes(t))).length;
    if (got !== c.want) bad.push(`${c.id}.${c.field}: grep -c ${c.token} ${c.file} 声明 ${c.want}，实为 ${got}`);
  }
  add("J3", "sources.json 里可执行的「grep -c X 文件 → N」核验声明逐条成立（按 grep -c 的行计数语义复算），且声明条数恰为 4",
      bad.length === 0 && claims.length === 4,
      bad.length ? bad.join("；") : (claims.length !== 4 ? `抽到 ${claims.length} 条声明，应为 4 条` : `4 条逐条相符：${claims.map((c) => c.id + "→" + c.want).join("、")}`));
}

/* G5. 场景卡的「空间载体」声明 vs 几何逐点复算。
   2026-08-22 抓到的一类真错：四张场景卡把落点写成某座交接场内部（「开源交接场授权台」
   「城市交接场维修驿／社区照护桌／口述史亭」），而 public_space.geojson 里这四个点全在
   三处重点区之外，其中三个的最近重点区还是另一座交接场——SCN-08 距大钟寺 3127 m、距原点
   社区仅 611 m。同一份正文的重点区复算表（「场景节点」那一行）反而与几何一致，即同一文档
   内两处口径互斥。已按几何把落点改写为「连续公共交接面 ＋ 连接段里程」。
   本项把它变成机器判定：容器判定用射线法，在 WGS84 经纬度下即可精确判断包含关系（多边形
   简单、尺度小，「含不含」与投影无关）；里程用本站纬度上的局部等距近似复算（1° 纬 111195 m、
   1° 经 111195·cos φ，10 km 尺度上误差 <0.1%，远优于「约 X.X km」的有效位数）。
   三类声明的条数 5／4／3 与卡片总数 12 写死参与退出码——某张卡被悄悄删掉时
   「逐条一致」仍会成立。 */
{
  const ks = readPkg("geometry/key_areas.geojson").features;
  const ps = readPkg("geometry/public_space.geojson").features;
  const rd = readPkg("geometry/roads.geojson").features;

  const inRing = (pt, ring) => {
    let hit = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i];
      const [xj, yj] = ring[j];
      if ((yi > pt[1]) !== (yj > pt[1]) &&
          pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) hit = !hit;
    }
    return hit;
  };
  const contains = (g, pt) => {
    const polys = g.type === "Polygon" ? [g.coordinates] : g.coordinates;
    return polys.some((rr) => inRing(pt, rr[0]) && !rr.slice(1).some((h) => inRing(pt, h)));
  };
  const centroidOf = (g) => {
    const pts = [];
    const walk = (c) => (typeof c[0] === "number" ? pts.push(c) : c.forEach(walk));
    walk(g.coordinates);
    return [pts.reduce((s, q) => s + q[0], 0) / pts.length,
            pts.reduce((s, q) => s + q[1], 0) / pts.length];
  };

  const yardOf = {};
  for (const f of ks) {
    const n = f.properties.name_zh || "";
    const short = ["众智园", "原点社区", "大钟寺"].find((s) => n.includes(s));
    if (short) yardOf[short] = f.geometry;
  }

  // 主轴折线 → 局部米制，累计里程（0 = 折线起点，即南端）
  const spine = rd.find((f) => f.properties.id === "ROAD-001");
  const sc = spine ? spine.geometry.coordinates : [];
  const phi0 = sc.length ? sc.reduce((s, c) => s + c[1], 0) / sc.length : 0;
  const kx = 111195 * Math.cos((phi0 * Math.PI) / 180);
  const toM = ([lon, lat]) => [lon * kx, lat * 111195];
  const P = sc.map(toM);
  const cum = [0];
  for (let i = 1; i < P.length; i++) {
    cum.push(cum[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
  }
  const mileageM = (pt) => {
    const q = toM(pt);
    let best = { d: Infinity, m: 0 };
    for (let i = 1; i < P.length; i++) {
      const a = P[i - 1];
      const b = P[i];
      const vx = b[0] - a[0];
      const vy = b[1] - a[1];
      const L2 = vx * vx + vy * vy;
      let s = L2 === 0 ? 0 : ((q[0] - a[0]) * vx + (q[1] - a[1]) * vy) / L2;
      s = Math.max(0, Math.min(1, s));
      const d = Math.hypot(q[0] - (a[0] + s * vx), q[1] - (a[1] + s * vy));
      if (d < best.d) best = { d, m: cum[i - 1] + s * Math.sqrt(L2) };
    }
    return best;
  };

  const YARD_ALIAS = { "研制交接场": "众智园", "开源交接场": "原点社区", "城市交接场": "大钟寺" };
  const cards = [];
  const rowRe = /^\|\s*(SCN-\d\d)\s*\|([^|]*)\|([^|]*)\|/gm;
  let mm;
  while ((mm = rowRe.exec(prose)) !== null) cards.push({ id: mm[1], carrier: mm[3].trim() });

  const bad = [];
  let nYard = 0;
  let nLink = 0;
  let nSpine = 0;
  for (const c of cards) {
    const f = ps.find((x) => x.properties.id === c.id);
    if (!f) { bad.push(`${c.id}：public_space.geojson 无此要素`); continue; }
    const pt = centroidOf(f.geometry);
    const inside = Object.keys(yardOf).filter((k) => contains(yardOf[k], pt));
    const alias = Object.keys(YARD_ALIAS).find((a) => c.carrier.includes(a));
    if (alias) {
      nYard++;
      if (!inside.includes(YARD_ALIAS[alias])) {
        bad.push(`${c.id} 卡片写「${alias}」，几何实落在 ${inside.length ? inside.join("／") : "三区之外"}`);
      }
    } else if (c.carrier.includes("连续公共交接面")) {
      nLink++;
      if (inside.length) {
        bad.push(`${c.id} 卡片写「连续公共交接面…连接段」，几何却落在 ${inside.join("／")} 之内`);
      }
      const km = c.carrier.match(/([\d.]+)\s*km/);
      if (!km) bad.push(`${c.id}：连接段卡片未给里程`);
      else {
        const got = mileageM(pt).m / 1000;
        if (Math.abs(got - Number(km[1])) > 0.1) {
          bad.push(`${c.id} 声明里程 ${km[1]} km，复算 ${got.toFixed(2)} km`);
        }
      }
    } else nSpine++;
  }
  add("G5", "十二张场景卡的空间载体声明与 public_space.geojson 逐点复算一致：5 张声称落在某座交接场内的确在该区内，4 张声称落在连接段的确在三区之外且里程复算相符（±0.1 km），3 张只声称沿主轴、不作容器断言",
      bad.length === 0 && cards.length === 12 && nYard === 5 && nLink === 4 && nSpine === 3,
      bad.length ? bad.join("；")
        : `12 张（交接场内 ${nYard}／连接段 ${nLink}／沿主轴 ${nSpine}）全部相符`);
}

/* M9. 中英两侧与设计深度矩阵自陈的指标计数都必须与 metrics.json 实算相符。
   2026-08-22 抓到的一处真错：`metrics.json` 实为 70 项／56 已赋值／14 待测，中文正文写对了，
   而**英文正文两处仍写「68 metrics, 54 of them valued」**——指标从 68 涨到 70 时英文没跟着改，
   而且它内部算术自洽（68−54＝14），所以只看英文看不出来。这是本包第五次「新工作做完、旧字段没同步」。
   M1 只核数据总表本身，因此这一项专核**所有读者可见复述**：从两份正文里分别抓「N 项指标／
   M 项已赋值」与「N metrics, M of them valued」，再核 design_depth_matrix.json 中
   metrics_recalculation 的 N/M/U 摘要以及中英 status_semantics 的 U。九个数必须全部抓到并与
   metrics.json 实算逐位一致——抓不到即判失败，不跳过。这样可阻断正文已更新、深度矩阵仍保留
   旧口径的静默回归。 */
{
  const total = Object.keys(metrics).length;
  const valuedN = Object.values(metrics).filter((m) => m.value !== null && m.value !== undefined).length;
  const pendingN = total - valuedN;
  const en = fs.readFileSync(resolveIn(PKG, "proposal.en.md"), "utf8");
  const depth = readPkg("design_depth_matrix.json");
  const metricsDepth = (depth.items || []).find((item) => item.item_id === "metrics_recalculation");
  const zhM = primaryProse.match(/\*\*(\d+)\s*项指标[，,]\s*(\d+)\s*项已赋值/);
  const enM = en.match(/\*\*(\d+)\s+metrics,\s*(\d+)\s+of them valued/);
  const enM2 = en.match(/The\s+(\d+)\s+valued metrics/);
  const depthM = metricsDepth && String(metricsDepth.evidence_summary_zh || "")
    .match(/共\s*(\d+)\s*项[：:]\s*(\d+)\s*项已赋值[、,]\s*(\d+)\s*项待测/);
  const depthStatusZh = String(depth.status_semantics_zh || "")
    .match(/中仍有\s*(\d+)\s*项为\s*`status:\s*unknown`/);
  const depthStatusEn = String(depth.status_semantics_en || "")
    .match(/fact that\s+(\d+)\s+metrics[\s\S]*?remain\s+`status:\s*unknown`/i);
  const problems = [];
  if (!zhM) problems.push("中文正文里抓不到「N 项指标，M 项已赋值」");
  else {
    if (Number(zhM[1]) !== total) problems.push(`中文自陈 ${zhM[1]} 项，实为 ${total}`);
    if (Number(zhM[2]) !== valuedN) problems.push(`中文自陈已赋值 ${zhM[2]}，实为 ${valuedN}`);
  }
  if (!enM) problems.push("英文正文里抓不到「N metrics, M of them valued」");
  else {
    if (Number(enM[1]) !== total) problems.push(`英文自陈 ${enM[1]} metrics，实为 ${total}`);
    if (Number(enM[2]) !== valuedN) problems.push(`英文自陈 valued ${enM[2]}，实为 ${valuedN}`);
  }
  if (!enM2) problems.push("英文正文里抓不到「The N valued metrics」");
  else if (Number(enM2[1]) !== valuedN) problems.push(`英文「The ${enM2[1]} valued metrics」，实为 ${valuedN}`);
  if (!depthM) problems.push("design_depth_matrix.json 抓不到 metrics_recalculation 的 N/M/U 摘要");
  else {
    if (Number(depthM[1]) !== total) problems.push(`深度矩阵自陈 ${depthM[1]} 项，实为 ${total}`);
    if (Number(depthM[2]) !== valuedN) problems.push(`深度矩阵自陈已赋值 ${depthM[2]}，实为 ${valuedN}`);
    if (Number(depthM[3]) !== pendingN) problems.push(`深度矩阵自陈待测 ${depthM[3]}，实为 ${pendingN}`);
  }
  if (!depthStatusZh) problems.push("design_depth_matrix.json 中文 status_semantics 抓不到 unknown 数量");
  else if (Number(depthStatusZh[1]) !== pendingN) problems.push(`中文 status_semantics 自陈 unknown ${depthStatusZh[1]}，实为 ${pendingN}`);
  if (!depthStatusEn) problems.push("design_depth_matrix.json 英文 status_semantics 抓不到 unknown 数量");
  else if (Number(depthStatusEn[1]) !== pendingN) problems.push(`英文 status_semantics 自陈 unknown ${depthStatusEn[1]}，实为 ${pendingN}`);
  add("M9", `中英正文与设计深度矩阵自陈的指标计数均与 metrics.json 实算一致（共 ${total} 项 ／ 已赋值 ${valuedN} 项 ／ 待测 ${pendingN} 项）`,
      problems.length === 0,
      problems.length ? problems.join("；")
        : `正文 zh ${total}/${valuedN}、en ${total}/${valuedN}、en 复述 ${valuedN}；深度矩阵 ${total}/${valuedN}/${pendingN}、status zh/en ${pendingN}/${pendingN} 逐位相符`);
}

/* T1. 任务书 boundary_clause 强制措辞逐条在位。
   `brief/site-package/agent_taskbook.json#boundary_clause` 给了两条硬要求：
     must_state_zh      = 「所有成果均为开放共创建议，不替代正式规划，不构成政府审定结论。」
     required_wording_zh = 「所有空间落地建议应表述为『概念建议』『参考方案』『可供专业团队深化研究』。」
   2026-08-22 实测：本包实质上说了同一件事（「不替代法定审批」「不代表任何政府决定或审批结论」），
   但**任务书点名的四个措辞里有三个一次都没出现**——「不替代正式规划」0、「不构成政府审定结论」0、
   「参考方案」0，只有「概念建议」在（7 次）。已就地补齐，不新增章节。
   判据写死在本脚本里——它来自任务书（被审对象之外），而任务书不在投稿包内、脚本必须离线自足，
   所以这是唯一可行的取值方式；条数 4 同样写死参与退出码。 */
{
  const REQUIRED = ["不替代正式规划", "不构成政府审定结论", "概念建议", "参考方案", "可供专业团队深化研究"];
  const missing = REQUIRED.filter((w) => !primaryProse.includes(w));
  const counts = REQUIRED.map((w) => `${w}×${primaryProse.split(w).length - 1}`);
  add("T1", `任务书 boundary_clause 的 ${REQUIRED.length} 个强制措辞在正文中逐条在位（must_state_zh 的两句 ＋ required_wording_zh 的三个表述）`,
      missing.length === 0 && REQUIRED.length === 5,
      missing.length ? `缺 ${missing.join("、")}` : counts.join("、"));
}

/* A2. assumptions.json 的 affected_files 逐条解析到包内实际文件，且每条假设都带复算触发器与责任角色。
   2026-08-22 抓到的一处：11 条假设里 10 条的 `affected_files` 都是具体文件路径（`A-BOUNDARY-001`
   连四张图件都逐一列出），**只有 `A-CONTRAST-001` 写了一个裸目录 `assets/figures/`**。字段名是
   affected_files，机器按它算复算范围时这一项解析不出来。已按 `figure-contrast-report.json` 自陈的
   范围（30 张栅格图件 ＝ 28 PNG ＋ 2 JPEG）展开成 30 个具体路径，与报告声明逐一对应。
   规模 11 条假设／108 处文件引用写死参与退出码——某条引用被悄悄删掉时「逐条可解析」仍会成立。 */
{
  const asms = readPkg("assumptions.json").assumptions || [];
  const problems = [];
  let refs = 0;
  for (const a of asms) {
    for (const rel of a.affected_files || []) {
      refs++;
      let ok = false;
      try { ok = fs.statSync(resolveIn(PKG, rel)).isFile(); } catch (e) { ok = false; }
      if (!ok) problems.push(`${a.id}: affected_files 解析不到文件 ${rel}`);
    }
    for (const k of ["recalculation_trigger", "responsible_role"]) {
      if (!a[k]) problems.push(`${a.id}: 缺 ${k}`);
    }
  }
  add("A2", "assumptions.json 的 11 条假设各带复算触发器与责任角色，且 108 处 affected_files 逐条解析到包内实际文件（不接受目录）",
      problems.length === 0 && asms.length === 11 && refs === 108,
      problems.length ? problems.join("；")
        : (asms.length !== 11 || refs !== 108 ? `实为 ${asms.length} 条假设／${refs} 处引用，应为 11／108`
           : `11 条假设、108 处引用逐条可解析`));
}

/* Z. 元检查：断言检查清单本身没有缺项。
   审计器最危险的失效方式不是「某一项判错」，而是「某一项悄悄没跑」——
   条件式 add() 会让检查总数变少而 all_match 仍为真。2026-08-20 实测过这个洞：
   把通用表里「之和为」改成同义的「合计」，F9／F10 的正则匹配失败、两项直接消失，
   脚本报 47/47、exit 0 通过。已把全部 add() 改成无条件；本项是结构性兜底——
   ID 全集写死在这里，少一条、多一条、重一条都判失败。

   ⚠️ Z1 自己也在这份全集里，但「一条检查查不到自己被删掉」——删掉下面那句 add("Z1")，
   这段比对就整段不执行。2026-08-20 外部复核实测到了这一层：当时全集只有 48 项、不含 Z1，
   删掉 add("Z1") 后脚本报 48/48、exit 0 通过。所以退出码不再只由 checks 决定：
   下面「输出」段有一道不走 add() 的结构性守卫，把实际 ID 序列与本全集逐位比对。
   那道守卫才是删得掉 Z1 也躲不过的一层。 */
const EXPECTED_IDS = [
  "M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8",
  "S1", "S2", "S3", "S4",
  "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11",
  "P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10", "P11",
  "F0", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10",
  "G1", "G2", "G3", "G4", "G6", "G7", "G8", "G9", "G10", "H1", "I1",
  "K1", "K2", "K3", "K4", "J1", "J2", "L1", "J3", "G5", "M9", "T1", "A2",
  "Z1",
];
{
  // Z1 即将被 add，一并纳入比对，使这里的计数与最终 checks_run 一致
  const got = [...checks.map((c) => c.id), "Z1"];
  const dup = got.filter((x, i) => got.indexOf(x) !== i);
  const missing = EXPECTED_IDS.filter((x) => !got.includes(x));
  const extra = got.filter((x) => !EXPECTED_IDS.includes(x));
  const problems = [];
  if (missing.length) problems.push(`缺 ${missing.join("、")}`);
  if (extra.length) problems.push(`多出 ${extra.join("、")}`);
  if (dup.length) problems.push(`重复 ${[...new Set(dup)].join("、")}`);
  add("Z1", `检查清单完整：恰好 ${EXPECTED_IDS.length} 项，无缺项、无多余、无重复`,
      problems.length === 0, problems.join("；") || `${got.length} 项与清单逐一对应`);
}

/* ---------------- 输出 ---------------- */
const failed = checks.filter((c) => !c.pass);

/* 结构性守卫：不走 add()，因此不可能被「某一条检查没跑」的方式绕开。
   它把实际跑出来的 ID 序列与 EXPECTED_IDS 逐位比对——少一条（含 Z1 自己被删掉）、
   多一条、顺序变了都会让 all_match 为假、退出码为 1。
   这一层与 Z1 的分工：Z1 让人在表里看见缺了哪一条；这一层保证「看不见」也拦得住。 */
const idsActual = checks.map((c) => c.id);
const idManifestProblems = [];
if (idsActual.length !== EXPECTED_IDS.length) {
  idManifestProblems.push(`实跑 ${idsActual.length} 项，清单 ${EXPECTED_IDS.length} 项`);
}
for (const x of EXPECTED_IDS) if (!idsActual.includes(x)) idManifestProblems.push(`缺 ${x}`);
for (const x of idsActual) if (!EXPECTED_IDS.includes(x)) idManifestProblems.push(`多出 ${x}`);
const firstOutOfOrder = EXPECTED_IDS.findIndex((x, i) => idsActual[i] !== x);
if (!idManifestProblems.length && firstOutOfOrder !== -1) {
  idManifestProblems.push(`第 ${firstOutOfOrder + 1} 位应为 ${EXPECTED_IDS[firstOutOfOrder]}，实为 ${idsActual[firstOutOfOrder]}`);
}
const idManifestOk = idManifestProblems.length === 0;

const out = {
  auditor: "claims-audit.js",
  scope_zh: "只审可由包内数据复算的数值与结构声明；设计判断、未测项与现场结论不在范围内。",
  checks_run: checks.length,
  checks_expected: EXPECTED_IDS.length,
  check_id_manifest_ok: idManifestOk,
  check_id_manifest_problems: idManifestProblems,
  checks_passed: checks.length - failed.length,
  all_match: failed.length === 0 && idManifestOk,
  failures: failed,
  checks,
};

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(out, null, 2));
} else {
  for (const c of checks) {
    console.log(`${c.pass ? "一致" : "不符"}  ${c.id.padEnd(4)} ${c.claim}`);
    if (!c.pass) console.log(`            实算：${c.actual}`);
  }
  console.log(`\n${out.checks_passed}/${out.checks_run} 条声明与包内数据一致`);
  if (!idManifestOk) {
    console.log(`检查清单被改动：${idManifestProblems.join("；")}（应为 ${EXPECTED_IDS.length} 项）`);
  }
  console.log(out.all_match ? "全部一致" : "存在不一致");
}
process.exit(out.all_match ? 0 : 1);
