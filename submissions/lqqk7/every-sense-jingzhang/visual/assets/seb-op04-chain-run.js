#!/usr/bin/env node
/*
 * OP-04 配对试点全过程证据链复演器 / OP-04 paired-pilot evidence-chain replay
 *
 * 开放数据桌面复演，不是现场试点。本脚本不接触任何真实参与者、现场设备或运行中的
 * 系统，不写入 metrics.json，也不产生任何包容性绩效指标数值。它把六个环节——开放
 * 数据基线、AI 分析、空间备选、AI 关闭反事实、机器与人工双重复核、变更回执落位—
 * —从提交包内的几何文件重新算一遍，并与档案 seb-op04-chain-data.json 中的入档读
 * 数逐项比对。全部一致才退出 0。
 *
 * A desk replay over open data, not a field pilot. The script touches no real
 * participant, no site equipment and no running system, writes nothing to
 * metrics.json, and produces no inclusion performance value. It recomputes all six
 * stages — open-data baseline, AI analysis, spatial alternatives, AI-off
 * counterfactual, machine and human review, and the landing of the change receipt —
 * from the geometry files inside the submitted package, and checks every figure
 * against the archive seb-op04-chain-data.json. It exits 0 only if all of them agree.
 *
 * 判据来源 / Where the criteria come from
 * 本工具不持有任何私有词表、私有阈值或私有可通行性判断。AI 关闭状态下哪些线路仍可
 * 用，读自 roads.geojson 各要素自身的 design_role 声明词，词表写在档案的
 * ai_off_edge_rule 中；节点字段的合规判定读自 seb-spec.json 的 constraint_machine_rule；
 * 等级与闸门的比对读自 seb-spec.json 的结构化 gate_binding。三者都不在本文件里。
 * This tool holds no private word list, no private threshold and no private view of
 * what is walkable. Which lines stay usable once AI is off is read from the
 * design_role declaration on each feature in roads.geojson, against a token list
 * stated in the archive's ai_off_edge_rule; node field compliance is read from
 * constraint_machine_rule in seb-spec.json; the level-to-gate comparison is read from
 * the structured gate_binding in seb-spec.json. None of the three lives in this file.
 *
 * 本复演的节点判定是 seb-spec.json 的第二个独立实现，与 seb-tabletop-run.js 不共享
 * 任何代码。两个实现在同一份规范下得到同一判定，是基准可被取走就用的一次检验。
 * The node ruling here is a second, independent implementation of seb-spec.json that
 * shares no code with seb-tabletop-run.js. Two implementations agreeing under one
 * specification is a test of whether the baseline can be picked up and used as is.
 *
 * 用法 / Usage: node seb-op04-chain-run.js
 * 零依赖，仅使用 Node 内置模块，无网络访问，只读取本包内文件。
 * Zero dependencies, Node built-ins only, no network access, reads only this package.
 * 退出码 0 = 全部一致；1 = 有读数不符或判定不通过；2 = 基准版本不足或前置校验器未通过。
 * Exit 0 = all agree; 1 = a figure or a verdict disagrees; 2 = the baseline version is
 * insufficient or the prerequisite checker did not pass, and no verdict is issued.
 */

"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const HERE = __dirname;
const PKG = path.resolve(HERE, "..", "..");
const GEO = path.join(PKG, "geometry");

const readJson = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const geo = (n) => readJson(path.join(GEO, n + ".geojson"));
const r3 = (v) => (v === null || v === undefined ? null : Math.round(v * 1000) / 1000);

let failures = 0;
const fail = (msg) => { failures += 1; console.log("    不符 / MISMATCH : " + msg); };
const ok = (label) => console.log("    一致 / match : " + label);

/* ---------------------------------------------------------------- 投影 ----
 * EPSG:4326 -> EPSG:4548 (CGCS2000 / 3-degree Gauss-Kruger CM 117E)
 * 纯内置数学实现；与 pyproj 在本包十个节点上的最大偏差 1.41e-4 m。
 * Built-in maths only; largest deviation against pyproj over the package's ten
 * nodes is 1.41e-4 m.
 */
const ELL_A = 6378137.0;
const ELL_F = 1 / 298.257222101;
const ELL_E2 = ELL_F * (2 - ELL_F);
const CM = 117.0, K0 = 1.0, FALSE_E = 500000.0, FALSE_N = 0.0;

function project(lonDeg, latDeg) {
  const rad = Math.PI / 180;
  const lat = latDeg * rad;
  const dl = (lonDeg - CM) * rad;
  const ep2 = ELL_E2 / (1 - ELL_E2);
  const s = Math.sin(lat), c = Math.cos(lat), t = Math.tan(lat);
  const N = ELL_A / Math.sqrt(1 - ELL_E2 * s * s);
  const T = t * t, C = ep2 * c * c, Aa = dl * c;
  const e2 = ELL_E2, e4 = e2 * e2, e6 = e4 * e2;
  const M = ELL_A * (
    (1 - e2 / 4 - 3 * e4 / 64 - 5 * e6 / 256) * lat
    - (3 * e2 / 8 + 3 * e4 / 32 + 45 * e6 / 1024) * Math.sin(2 * lat)
    + (15 * e4 / 256 + 45 * e6 / 1024) * Math.sin(4 * lat)
    - (35 * e6 / 3072) * Math.sin(6 * lat)
  );
  const x = FALSE_E + K0 * N * (
    Aa + (1 - T + C) * Math.pow(Aa, 3) / 6
    + (5 - 18 * T + T * T + 72 * C - 58 * ep2) * Math.pow(Aa, 5) / 120
  );
  const y = FALSE_N + K0 * (M + N * t * (
    Aa * Aa / 2 + (5 - T + 9 * C + 4 * C * C) * Math.pow(Aa, 4) / 24
    + (61 - 58 * T + T * T + 600 * C - 330 * ep2) * Math.pow(Aa, 6) / 720
  ));
  return [x, y];
}

/* ------------------------------------------------------------------ 图 ---- */
const dist2 = (p, q) => Math.hypot(q[0] - p[0], q[1] - p[1]);
const vkey = (p) => Math.round(p[0] * 1000) + "|" + Math.round(p[1] * 1000);

function buildGraph(edgeDefs) {
  const cuts = edgeDefs.map(() => []);
  for (let i = 0; i < edgeDefs.length; i++) {
    for (let j = i + 1; j < edgeDefs.length; j++) {
      const p1 = edgeDefs[i].a, p2 = edgeDefs[i].b;
      const p3 = edgeDefs[j].a, p4 = edgeDefs[j].b;
      const d = (p2[0] - p1[0]) * (p4[1] - p3[1]) - (p2[1] - p1[1]) * (p4[0] - p3[0]);
      if (Math.abs(d) < 1e-9) continue;
      const t = ((p3[0] - p1[0]) * (p4[1] - p3[1]) - (p3[1] - p1[1]) * (p4[0] - p3[0])) / d;
      const u = ((p3[0] - p1[0]) * (p2[1] - p1[1]) - (p3[1] - p1[1]) * (p2[0] - p1[0])) / d;
      if (t < -1e-9 || t > 1 + 1e-9 || u < -1e-9 || u > 1 + 1e-9) continue;
      cuts[i].push(t);
      cuts[j].push(u);
    }
  }
  const adj = new Map();
  const segs = [];
  const addV = (p) => { const k = vkey(p); if (!adj.has(k)) adj.set(k, []); return k; };
  const addE = (ka, kb, w, id) => { adj.get(ka).push([kb, w, id]); adj.get(kb).push([ka, w, id]); };
  edgeDefs.forEach((e, i) => {
    const ts = [0, 1].concat(cuts[i]).sort((x, y) => x - y);
    const at = (t) => [e.a[0] + t * (e.b[0] - e.a[0]), e.a[1] + t * (e.b[1] - e.a[1])];
    for (let n = 0; n < ts.length - 1; n++) {
      if (ts[n + 1] - ts[n] < 1e-12) continue;
      const p = at(ts[n]), q = at(ts[n + 1]);
      const ka = addV(p), kb = addV(q);
      addE(ka, kb, dist2(p, q), e.id);
      segs.push({ id: e.id, p, q, ka, kb });
    }
  });
  return { adj, segs, addV, addE };
}

function attach(G, xy) {
  let best = null;
  for (const s of G.segs) {
    const vx = s.q[0] - s.p[0], vy = s.q[1] - s.p[1];
    const L2 = vx * vx + vy * vy;
    let t = L2 === 0 ? 0 : ((xy[0] - s.p[0]) * vx + (xy[1] - s.p[1]) * vy) / L2;
    t = Math.max(0, Math.min(1, t));
    const foot = [s.p[0] + t * vx, s.p[1] + t * vy];
    const d = dist2(xy, foot);
    if (!best || d < best.d - 1e-9) best = { d, foot, s };
  }
  if (!best) return null;
  const kf = G.addV(best.foot);
  if (kf !== best.s.ka && kf !== best.s.kb) {
    const strip = (k, other) => G.adj.set(k, G.adj.get(k).filter((e) => !(e[0] === other && e[2] === best.s.id)));
    strip(best.s.ka, best.s.kb);
    strip(best.s.kb, best.s.ka);
    G.addE(best.s.ka, kf, dist2(best.foot, best.s.p), best.s.id);
    G.addE(kf, best.s.kb, dist2(best.foot, best.s.q), best.s.id);
  }
  return { stub: best.d, key: kf, roadId: best.s.id };
}

function shortest(G, src, dst) {
  const dist = new Map([[src, 0]]);
  const pq = [[0, src]];
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const head = pq.shift();
    const d = head[0], u = head[1];
    if (d > (dist.has(u) ? dist.get(u) : Infinity) + 1e-9) continue;
    if (u === dst) return d;
    for (const e of adjOf(G, u)) {
      const nd = d + e[1];
      if (nd < (dist.has(e[0]) ? dist.get(e[0]) : Infinity) - 1e-9) {
        dist.set(e[0], nd);
        pq.push([nd, e[0]]);
      }
    }
  }
  return dist.has(dst) ? dist.get(dst) : null;
}
const adjOf = (G, k) => G.adj.get(k) || [];

function componentCount(G) {
  const seen = new Set();
  let n = 0;
  for (const k of G.adj.keys()) {
    if (seen.has(k)) continue;
    n += 1;
    const stack = [k];
    seen.add(k);
    while (stack.length) {
      const u = stack.pop();
      for (const e of adjOf(G, u)) if (!seen.has(e[0])) { seen.add(e[0]); stack.push(e[0]); }
    }
  }
  return n;
}

/* ----------------------------------------------------- 备选几何的构造 ---- */
const paramOfFoot = (seg, xy) => {
  const vx = seg.b[0] - seg.a[0], vy = seg.b[1] - seg.a[1];
  return ((xy[0] - seg.a[0]) * vx + (xy[1] - seg.a[1]) * vy) / (vx * vx + vy * vy);
};
const pointAt = (seg, t) => [seg.a[0] + t * (seg.b[0] - seg.a[0]), seg.a[1] + t * (seg.b[1] - seg.a[1])];
const paramOfCross = (s1, s2) => {
  const p1 = s1.a, p2 = s1.b, p3 = s2.a, p4 = s2.b;
  const d = (p2[0] - p1[0]) * (p4[1] - p3[1]) - (p2[1] - p1[1]) * (p4[0] - p3[0]);
  return ((p3[0] - p1[0]) * (p4[1] - p3[1]) - (p3[1] - p1[1]) * (p4[0] - p3[0])) / d;
};

/* ============================== 运行 ============================== */
const spec = readJson(path.join(HERE, "seb-spec.json"));
const arc = readJson(path.join(HERE, "seb-op04-chain-data.json"));

console.log("OP-04 配对试点全过程证据链复演 / OP-04 paired-pilot evidence-chain replay");
console.log("基准 / Baseline : " + spec.spec_id + " v" + spec.version + " (" + spec.status + ")");
console.log("档案 / Archive  : " + arc.archive_id + " v" + arc.version);
console.log("性质 / Nature   : 开放数据桌面复演，无真实参与者、无现场测量，不产生任何包容性绩效指标数值");
console.log("                  desk replay over open data, no real participant, no site measurement,");
console.log("                  and no inclusion performance value");
console.log("");

/* --- 版本闸门 --- */
const need = arc.baseline_spec.required_version.split(".").map(Number);
const have = spec.version.split(".").map(Number);
const lower = have[0] < need[0] || (have[0] === need[0] && (have[1] < need[1] || (have[1] === need[1] && have[2] < need[2])));
if (spec.spec_id !== arc.baseline_spec.spec_id || lower) {
  console.log("[!] 基准与档案不匹配，不作任何判定 / baseline and archive disagree; no verdict is issued");
  console.log("    需要 / required : " + arc.baseline_spec.spec_id + " >= " + arc.baseline_spec.required_version);
  console.log("    实际 / found    : " + spec.spec_id + " " + spec.version);
  process.exit(2);
}

/* --- [P] 前置：真实执行既有桌面校验器 --- */
console.log("[P] 前置校验器 / Prerequisite checker");
const pre = spawnSync(process.execPath, [path.join(HERE, "seb-tabletop-run.js")], { cwd: HERE, encoding: "utf8" });
const preCode = pre.status;
console.log("    命令 / command  : node seb-tabletop-run.js");
console.log("    退出码 / exit code : " + preCode + "（入档期望 / archived expectation: "
  + arc.stage_5_dual_review.machine_review.prerequisite_run.expected_exit_code + "）");
if (preCode !== arc.stage_5_dual_review.machine_review.prerequisite_run.expected_exit_code) {
  console.log("    前置未通过，本复演不作任何判定 / the prerequisite did not pass; no verdict is issued");
  process.exit(2);
}
const preTail = (pre.stdout || "").trim().split("\n").filter((l) => /matching expectation|与期望一致/.test(l));
if (preTail.length) console.log("    摘录 / excerpt  : " + preTail[0].trim());
console.log("");

/* --- [R] 判据来源 --- */
const rule = arc.stage_2_ai_analysis.ai_off_edge_rule;
const nodeSchema = spec.components.find((c) => c.component_id === "node_schema");
const levels = spec.components.find((c) => c.component_id === "level_definitions");
const fieldRule = (name) => (nodeSchema.required_fields.find((f) => f.field === name) || {}).constraint_machine_rule;
console.log("[R] 判据来源 / Rule provenance");
console.log("    AI 关闭态边集合 / AI-off edge set : " + rule.declared_tokens.length
  + " 项声明词读自 " + rule.read_from + " / tokens read from the submitted data itself");
console.log("    ai_off_path   : " + fieldRule("ai_off_path").forbidden_targets.length
  + " 项词表来自基准条文 / terms from baseline text");
console.log("    human_handoff : " + fieldRule("human_handoff").required_tokens.length
  + " 项词表来自基准条文 / terms from baseline text");
console.log("    等级闸门 / Level gates : 结构化 gate_binding / structured, not inferred");
console.log("    本工具不持有任何私有词表、私有阈值或私有可通行性判断");
console.log("");

/* --- [0] 选点依据核对 --- */
console.log("[0] 选点依据 / Node selection");
const allNodes = geo("constraints").features.map((f) => f.properties);
for (const key of Object.keys(arc.node.selection_checks)) {
  const chk = arc.node.selection_checks[key];
  const got = allNodes.filter((p) => p[chk.field] === chk.value).map((p) => p.id).sort();
  const want = chk.expected_matching_node_ids.slice().sort();
  if (got.join(",") !== want.join(",")) fail(key + " : " + got.join(",") + " ≠ 入档 " + want.join(","));
  else console.log("    " + chk.field + " = " + chk.value + " → " + got.join(", ")
    + (got.length === 1 ? "（十个点位中唯一 / unique among the ten nodes）" : ""));
}
console.log("");

/* --- [1] 环节一：开放数据基线 --- */
console.log("[1] 环节一 开放数据基线 / Stage 1 open-data baseline");
const roads = geo("roads").features.map((f) => ({
  id: f.properties.id,
  role: f.properties.design_role || "",
  a: project(f.geometry.coordinates[0][0], f.geometry.coordinates[0][1]),
  b: project(f.geometry.coordinates[1][0], f.geometry.coordinates[1][1])
}));
roads.forEach((r) => {
  const low = r.role.toLowerCase();
  r.token = rule.declared_tokens.find((t) => low.includes(t)) || null;
  r.aiOff = r.token !== null;
  r.len = dist2(r.a, r.b);
});
const nodesById = {};
geo("constraints").features.forEach((f) => {
  nodesById[f.properties.id] = { p: f.properties, xy: project(f.geometry.coordinates[0], f.geometry.coordinates[1]) };
});
const base = arc.stage_1_open_data_baseline.measured_baseline;
for (const r of roads) {
  const exp = base.road_lengths_m[r.id];
  if (r3(r.len) !== exp) fail(r.id + " 长度 " + r3(r.len) + " ≠ 入档 " + exp);
}
if (failures === 0) ok("五条中心线长度逐条与入档一致 / all five centreline lengths match");
const offNetLen = r3(roads.filter((r) => r.aiOff).reduce((s, r) => s + r.len, 0));
if (offNetLen !== base.ai_off_declared_network_length_m) {
  fail("AI 关闭态声明网络长度 " + offNetLen + " ≠ 入档 " + base.ai_off_declared_network_length_m);
} else ok("AI 关闭态声明网络长度 " + offNetLen + " m");
const gOff = buildGraph(roads.filter((r) => r.aiOff).map((r) => ({ id: r.id, a: r.a, b: r.b })));
const comps = componentCount(gOff);
if (comps !== base.ai_off_network_component_count) {
  fail("AI 关闭态连通分量数 " + comps + " ≠ 入档 " + base.ai_off_network_component_count);
} else {
  ok("AI 关闭态连通分量数 " + comps + " / the AI-off network falls into " + comps + " components");
}
console.log("");

/* --- [2] 环节二：AI 关闭态边分类 --- */
console.log("[2] 环节二 AI 分析 / Stage 2 AI analysis");
for (const r of roads) {
  const exp = rule.classification[r.id];
  if (!exp || exp.ai_off_usable !== r.aiOff || (exp.matched_token || null) !== r.token) {
    fail(r.id + " 分类 " + r.aiOff + "/" + r.token + " ≠ 入档");
  } else {
    console.log("    " + r.id + " : AI 关闭后" + (r.aiOff ? "可用 / usable" : "不可用 / not usable")
      + (r.token ? "（声明词 / token: " + r.token + "）" : "（design_role 未作声明 / no declaration）"));
  }
}
console.log("");

/* --- [3][4] 环节三与四：备选与 AI 关闭反事实 --- */
console.log("[3] 环节三 空间备选 / Stage 3 spatial alternatives");
const R1 = roads.find((r) => r.id === "ROAD-001");
const R4 = roads.find((r) => r.id === "ROAD-004");
const R5 = roads.find((r) => r.id === "ROAD-005");
const altA = (() => {
  const t0 = paramOfCross(R4, R1);
  const t1 = Math.max(paramOfFoot(R4, nodesById["OP-08"].xy), paramOfFoot(R4, nodesById["OP-09"].xy));
  return { id: "ALT-A-UPGRADE", a: pointAt(R4, t0), b: pointAt(R4, t1) };
})();
const altB = (() => {
  const south = R5.a[1] < R5.b[1] ? R5.a : R5.b;
  const tw = (south[1] - R1.a[1]) / (R1.b[1] - R1.a[1]);
  return { id: "ALT-B-LINK", a: pointAt(R1, tw), b: south };
})();
altA.len = dist2(altA.a, altA.b);
altB.len = dist2(altB.a, altB.b);
for (const alt of arc.stage_3_alternatives.alternatives) {
  const got = alt.alt_id === "ALT-A" ? r3(altA.len) : r3(altB.len);
  if (got !== alt.works_length_m) fail(alt.alt_id + " 工程量 " + got + " m ≠ 入档 " + alt.works_length_m + " m");
  else console.log("    " + alt.alt_id + " " + alt.name_zh + " : " + got + " m");
}
const wr = r3(altB.len / altA.len);
if (wr !== arc.stage_3_alternatives.works_ratio_b_over_a) fail("工程量比 " + wr + " ≠ 入档");
else console.log("    工程量比 B/A / works ratio B over A : " + wr);
console.log("");

console.log("[4] 环节四 AI 关闭反事实 / Stage 4 AI-off counterfactual");
const tasks = {};
arc.stage_2_ai_analysis.tasks.forEach((t) => { tasks[t.task_id] = t; });
const STATE_EDGES = {
  BASE_ON: () => roads.map((r) => ({ id: r.id, a: r.a, b: r.b })),
  BASE_OFF: () => roads.filter((r) => r.aiOff).map((r) => ({ id: r.id, a: r.a, b: r.b })),
  ALT_A_OFF: () => roads.filter((r) => r.aiOff).map((r) => ({ id: r.id, a: r.a, b: r.b })).concat([altA]),
  ALT_B_OFF: () => roads.filter((r) => r.aiOff).map((r) => ({ id: r.id, a: r.a, b: r.b })).concat([altB])
};
const tol = arc.stage_4_ai_off_counterfactual.expected_results.tolerance_m;
const near = (a, b) => a === null || b === null ? a === b : Math.abs(a - b) <= tol;
for (const row of arc.stage_4_ai_off_counterfactual.expected_results.rows) {
  const G = buildGraph(STATE_EDGES[row.state_id]());
  const t = tasks[row.task_id];
  const o = attach(G, nodesById[t.origin].xy);
  const d = attach(G, nodesById[t.destination].xy);
  const net = shortest(G, o.key, d.key);
  const total = net === null ? null : o.stub + net + d.stub;
  const label = row.state_id + " " + row.task_id + " " + t.origin + "→" + t.destination;
  let bad = false;
  if (!near(r3(o.stub), arc.stage_4_ai_off_counterfactual.expected_results.origin_access_stub_m)) { fail(label + " 起点接入段 " + r3(o.stub)); bad = true; }
  if (!near(r3(d.stub), row.destination_access_stub_m)) { fail(label + " 终点接入段 " + r3(d.stub) + " ≠ " + row.destination_access_stub_m); bad = true; }
  if (d.roadId !== row.destination_attached_to) { fail(label + " 终点挂接于 " + d.roadId + " ≠ " + row.destination_attached_to); bad = true; }
  if ((net !== null) !== row.reachable) { fail(label + " 可达性 " + (net !== null) + " ≠ " + row.reachable); bad = true; }
  if (!near(r3(net), row.network_m)) { fail(label + " 网络行程 " + r3(net) + " ≠ " + row.network_m); bad = true; }
  if (!near(r3(total), row.total_m)) { fail(label + " 全程 " + r3(total) + " ≠ " + row.total_m); bad = true; }
  if (!bad) {
    console.log("    " + label.padEnd(34) + (row.reachable
      ? "全程 / total " + row.total_m + " m（接入 " + row.destination_access_stub_m + " m，挂接 " + row.destination_attached_to + "）"
      : "不可达 / unreachable（AI 关闭态无连续路径 / no continuous AI-independent route）"));
  }
}
const der = arc.stage_4_ai_off_counterfactual.expected_results.derived;
const totalOf = (st, tk) => arc.stage_4_ai_off_counterfactual.expected_results.rows
  .find((r) => r.state_id === st && r.task_id === tk).total_m;
const stubOf = (st, tk) => arc.stage_4_ai_off_counterfactual.expected_results.rows
  .find((r) => r.state_id === st && r.task_id === tk).destination_access_stub_m;
for (const tk of ["T1", "T2"]) {
  const rA = r3(totalOf("ALT_A_OFF", tk) / totalOf("BASE_ON", tk));
  const rB = r3(totalOf("ALT_B_OFF", tk) / totalOf("BASE_ON", tk));
  const dB = r3(totalOf("ALT_B_OFF", tk) - totalOf("BASE_ON", tk));
  if (rA !== der.alt_a_trip_ratio_over_ai_on[tk]) fail(tk + " ALT-A 行程比 " + rA);
  if (rB !== der.alt_b_trip_ratio_over_ai_on[tk]) fail(tk + " ALT-B 行程比 " + rB);
  if (dB !== der.alt_b_trip_delta_m[tk]) fail(tk + " ALT-B 行程增量 " + dB);
  console.log("    " + tk + " 行程比 / trip ratio : ALT-A " + rA.toFixed(3) + " · ALT-B " + rB.toFixed(3)
    + "（+" + dB.toFixed(3) + " m）");
}
for (const tk of ["T1", "T2"]) {
  const dest = tasks[tk].destination;
  const ratio = r3(stubOf("BASE_OFF", tk) / stubOf("BASE_ON", tk));
  if (ratio !== der.ai_off_approach_ratio_over_ai_on[dest]) fail(dest + " 接入距离比 " + ratio);
  console.log("    " + dest + " 接入距离比 关闭/开启 / approach ratio off over on : " + ratio.toFixed(3));
}
console.log("");

/* --- [5] 环节五：机器复核 --- */
console.log("[5] 环节五 机器复核 / Stage 5 machine review");
const forb = fieldRule("ai_off_path");
const roleRule = fieldRule("human_handoff");
const levelById = {};
levels.levels.forEach((l) => { levelById[l.level_id] = l; });

function ruleNode(claim) {
  const reasons = [];
  for (const f of nodeSchema.required_fields) {
    const v = claim.node[f.field];
    if (v === undefined || v === null || String(v).trim() === "") reasons.push("REQUIRED_FIELD_MISSING:" + f.field);
  }
  if (reasons.length === 0) {
    const p = String(claim.node.ai_off_path).toLowerCase();
    if (forb.forbidden_targets.some((x) => p.includes(String(x).toLowerCase()))) reasons.push(forb.violation_code);
    const h = String(claim.node.human_handoff).toLowerCase();
    if (!roleRule.required_tokens.some((x) => h.includes(String(x).toLowerCase()))) reasons.push(roleRule.violation_code);
    const gid = claim.node.gate_id;
    const enumField = nodeSchema.required_fields.find((f) => f.field === "gate_id");
    if (enumField.allowed_values.indexOf(gid) === -1) reasons.push("ENUM_VALUE_INVALID:gate_id");
    const lvl = levelById[claim.claimed_level];
    if (!lvl) reasons.push("LEVEL_UNKNOWN:" + claim.claimed_level);
    else if (lvl.gate_binding.gate_id !== "none" && lvl.gate_binding.gate_id !== gid) reasons.push(levels.gate_violation_code);
  }
  return { verdict: reasons.length ? "REJECT" : "ACCEPT", reasons };
}

let claimMatched = 0;
for (const claim of arc.stage_5_dual_review.machine_review.claims) {
  const res = ruleNode(claim);
  const agree = res.verdict === claim.expected_verdict
    && (!claim.expected_reason_code || res.reasons.indexOf(claim.expected_reason_code) !== -1);
  if (agree) claimMatched += 1; else fail(claim.claim_id + " 判定 " + res.verdict + "/" + res.reasons.join(",") + " ≠ 期望");
  console.log("    " + claim.claim_id + "  " + claim.desc_zh);
  console.log("      判定 / verdict : " + res.verdict + "   期望 / expected : " + claim.expected_verdict
    + "   " + (agree ? "一致 / match" : "不符 / MISMATCH"));
  if (res.reasons.length) console.log("      理由 / reason  : " + res.reasons.join(" · "));
}
console.log("");

/* --- [6] 环节六：变更回执与设计修订落位 --- */
console.log("[6] 环节六 变更回执落位 / Stage 6 receipt landed in the package");
const rev = arc.stage_6_change_receipt.design_revision;
const op04 = nodesById[rev.feature_id].p;
for (const f of rev.fields_added) {
  if (op04[f] === undefined) fail("geometry/constraints.geojson#" + rev.feature_id + " 缺字段 " + f);
}
for (const k of Object.keys(rev.expected_values)) {
  if (op04[k] !== rev.expected_values[k]) fail(rev.feature_id + "." + k + " = " + op04[k] + " ≠ 入档 " + rev.expected_values[k]);
}
const receiptPath = path.join(PKG, arc.stage_6_change_receipt.receipt_file);
if (!fs.existsSync(receiptPath)) fail("回执文件缺失 / receipt file missing: " + arc.stage_6_change_receipt.receipt_file);
else {
  const rc = readJson(receiptPath);
  const found = (rc.receipts || []).some((x) => x.receipt_id === arc.stage_6_change_receipt.receipt_id);
  if (!found) fail("回执 " + arc.stage_6_change_receipt.receipt_id + " 未在回执文件中找到");
}
const nodeSchemaFields = nodeSchema.required_fields.map((f) => f.field);
const stillIntact = nodeSchemaFields.every((f) => typeof op04[f] === "string" && op04[f].trim() !== "");
if (!stillIntact) fail(rev.feature_id + " 的五个必填字段不完整");
if (failures === 0) {
  console.log("    " + rev.feature_id + " 追加字段 / appended fields : " + rev.fields_added.join(", "));
  console.log("    " + rev.feature_id + ".ai_off_continuity_status = " + op04.ai_off_continuity_status);
  console.log("    原 ai_off_path 一字未改 / the original ai_off_path is unchanged : " + op04.ai_off_path);
  console.log("    回执 / receipt : " + arc.stage_6_change_receipt.receipt_id + " 存在于 " + arc.stage_6_change_receipt.receipt_file);
  console.log("    五个必填字段仍完整 / the five required fields remain complete");
}
console.log("");

/* --- 汇总 --- */
console.log("汇总 / Summary");
console.log("    前置校验器退出码 / prerequisite exit code : " + preCode);
console.log("    声明判定与期望一致 / claims matching expectation : " + claimMatched + " / "
  + arc.stage_5_dual_review.machine_review.claims.length);
console.log("    读数不符项 / disagreeing figures : " + failures);
console.log("    本次运行不写入 metrics.json，七项包容性指标保持 unknown");
console.log("    this run writes nothing to metrics.json; the seven inclusion metrics stay unknown");
console.log("");
console.log("    本轮结论 / ruling this round :");
console.log("    " + arc.stage_5_dual_review.adjudication.conclusion_zh);

process.exit(failures === 0 && claimMatched === arc.stage_5_dual_review.machine_review.claims.length ? 0 : 1);
