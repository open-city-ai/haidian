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
 * 任何代码；两实现共用基准的违例码登记表与附加词合格性判据（v0.3.1 起——此前本实现
 * 未执行合格性校验且自编判定码，该不等价登记于 CR-2026-08-15-005）。
 * The node ruling here is a second, independent implementation of seb-spec.json that
 * shares no code with seb-tabletop-run.js; both implementations share the baseline's
 * violation-code registry and lexicon-eligibility criteria (from v0.3.1 — previously
 * this one ran no eligibility check and improvised its own codes, a divergence
 * registered in CR-2026-08-15-005).
 *
 * 范围声明 / Scope statement
 * 本工具是本提交包专用的复演器，不是通用 SEB 运行器：几何文件路径、节点与道路 id
 * 绑定本包档案；LineString 仅支持两点线段，更长的折线拒绝运行而不是静默截断。
 * This tool is a replayer specific to this package, not a general SEB runner: geometry
 * paths and node/road ids are bound to this package's archive; LineStrings support
 * two-point segments only, and longer polylines refuse the run instead of being
 * silently truncated.
 *
 * 用法 / Usage: node seb-op04-chain-run.js
 * 零依赖，仅使用 Node 内置模块（Node >= 18），无网络访问，只读取本包内文件；本工具版本 0.4.0。
 * Zero dependencies, Node built-ins only (Node >= 18), no network access, reads only
 * this package; runner version 0.4.0.
 * 退出码 0 = 全部一致；1 = 有读数不符或判定不通过；2 = 兼容失败（基准版本不足、词表
 * 不合格、几何超出支持范围、前置校验器未通过、可发判定码未登记在基准登记表内，或
 * v0.4.0 生命周期／权限／测量声明判据在本档案输入上命中而档案期望词汇无法归档该结论），
 * 不作任何判定。
 * Exit 0 = all agree; 1 = a figure or a verdict disagrees; 2 = compatibility failure
 * (baseline too low, ineligible lexicon, unsupported geometry, a failed prerequisite
 * checker, an emittable verdict code the baseline registry does not carry, or a v0.4.0
 * lifecycle / authority / measurement criterion firing on this archive's input where the
 * archive's expectation vocabulary cannot record the conclusion) with no verdict issued.
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

function nearestOn(segs, xy, filter) {
  let best = null;
  for (const s of segs) {
    if (filter && !filter(s)) continue;
    const vx = s.q[0] - s.p[0], vy = s.q[1] - s.p[1];
    const L2 = vx * vx + vy * vy;
    let t = L2 === 0 ? 0 : ((xy[0] - s.p[0]) * vx + (xy[1] - s.p[1]) * vy) / L2;
    t = Math.max(0, Math.min(1, t));
    const foot = [s.p[0] + t * vx, s.p[1] + t * vy];
    const d = dist2(xy, foot);
    if (!best || d < best.d - 1e-9) best = { d, foot, s };
  }
  return best;
}

/* split the found seg at the foot point.  The split keeps G.segs in step with
   G.adj (the earlier revision updated only adj, so a second attachment landing
   on the same original seg silently re-bridged across the first cut). */
function attachAt(G, best) {
  const kf = G.addV(best.foot);
  if (kf !== best.s.ka && kf !== best.s.kb) {
    const strip = (k, other) => G.adj.set(k, G.adj.get(k).filter((e) => !(e[0] === other && e[2] === best.s.id)));
    strip(best.s.ka, best.s.kb);
    strip(best.s.kb, best.s.ka);
    G.addE(best.s.ka, kf, dist2(best.foot, best.s.p), best.s.id);
    G.addE(kf, best.s.kb, dist2(best.foot, best.s.q), best.s.id);
    const i = G.segs.indexOf(best.s);
    const s1 = { id: best.s.id, p: best.s.p, q: best.foot, ka: best.s.ka, kb: kf };
    const s2 = { id: best.s.id, p: best.foot, q: best.s.q, ka: kf, kb: best.s.kb };
    G.segs.splice(i, 1, s1, s2);
  }
  return { stub: best.d, key: kf, roadId: best.s.id };
}

/* v0.3 interface rule: a node's physical attachment line is fixed on the FULL
   submitted network — the lane outside a door does not change when AI is
   switched off.  In a given state the node enters the graph through that same
   interface line; if the line is absent from the state's edge set the node is
   unreachable — unless the state ADDS a new line (a build action), which may
   serve as a new interface.  Under the previous nearest-in-state rule the
   attachment could silently jump to a different line once AI was off, which
   both overstated reachability and hid the untested interface. */
function attach(G, xy, anchor, addedIds) {
  if (anchor) {
    const onAnchor = nearestOn(G.segs, xy, (s) => s.id === anchor.roadId);
    const onAdded = addedIds && addedIds.length
      ? nearestOn(G.segs, xy, (s) => addedIds.includes(s.id)) : null;
    const cand = [onAnchor, onAdded].filter(Boolean);
    if (!cand.length) return null;
    const best = cand.reduce((a, b) => (b.d < a.d - 1e-9 ? b : a));
    return attachAt(G, best);
  }
  const best = nearestOn(G.segs, xy, null);
  return best ? attachAt(G, best) : null;
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
// 版本解析与 seb-tabletop-run.js 同一兜底语义：缺段按 0 处理，两段式版本号不再误放行。
// Version parsing shares the tabletop runner's fallback: missing parts count as 0, so a
// two-part version string can no longer slip past the gate.
const parseV = (s) => String(s || "0").split(".").map((x) => parseInt(x, 10) || 0);
const need = parseV(arc.baseline_spec.required_version);
const have = parseV(spec.version);
const lower = (have[0] || 0) < need[0] || (have[0] === need[0] && ((have[1] || 0) < need[1] || (have[1] === need[1] && (have[2] || 0) < need[2])));
if (spec.spec_id !== arc.baseline_spec.spec_id || lower) {
  console.log("[!] 基准与档案不匹配，不作任何判定 / baseline and archive disagree; no verdict is issued");
  console.log("    需要 / required : " + arc.baseline_spec.spec_id + " >= " + arc.baseline_spec.required_version);
  console.log("    实际 / found    : " + spec.spec_id + " " + spec.version);
  process.exit(2);
}

// v0.3.1：附加词合格性判据读自基准条文，与桌面校验器同一行为——违例整次拒绝。
// 此前本实现只过滤非空字符串，不合格词可经档案词表进入并集（CR-2026-08-15-005）。
// v0.3.1: lexicon eligibility is read from baseline text with the same behaviour as the
// tabletop checker — violations refuse the whole run. Previously this implementation
// only filtered non-empty strings, letting ineligible tokens join the union through the
// archive lexicon (CR-2026-08-15-005).
let ARC_LEXICON = [];
{
  const lexDecl = arc.adopter_lexicon;
  const lexEvidence = arc.adopter_lexicon_evidence;
  if (lexDecl !== undefined && (Array.isArray(lexDecl) ? lexDecl.length > 0 : true)) {
    const problems = [];
    const schemaC = spec.components.find((c) => c.component_id === "node_schema");
    const roleF = schemaC.required_fields.find((f) => f.constraint_machine_rule && f.constraint_machine_rule.type === "required_role_token");
    const elig = roleF && roleF.constraint_machine_rule.adopter_lexicon_eligibility_rule;
    if (!Array.isArray(lexDecl) || (lexEvidence !== undefined && (typeof lexEvidence !== "object" || lexEvidence === null || Array.isArray(lexEvidence)))) {
      problems.push("ADOPTER_LEXICON_MALFORMED");
    } else if (!elig) {
      problems.push("ADOPTER_LEXICON_MALFORMED: 基准缺附加词合格性判据（需 v0.3.1 及以上）/ baseline states no eligibility criteria (v0.3.1+ required)");
    } else {
      const tokens = lexDecl.filter((t) => typeof t === "string" && t.trim().length > 0);
      if (tokens.length !== lexDecl.length) problems.push("ADOPTER_LEXICON_MALFORMED");
      const badSuffix = tokens.filter((t) => elig.forbidden_suffixes.some((suf) => t.toLowerCase().endsWith(String(suf).toLowerCase())));
      if (badSuffix.length) problems.push("ADOPTER_LEXICON_INVALID_TOKEN: " + badSuffix.join(", "));
      const noEv = tokens.filter((t) => {
        const e = lexEvidence ? lexEvidence[t] : undefined;
        return typeof e !== "string" || e.trim().length === 0;
      });
      if (noEv.length) problems.push("ADOPTER_LEXICON_EVIDENCE_MISSING: " + noEv.join(", "));
      if (!problems.length) ARC_LEXICON = tokens;
    }
    if (problems.length) {
      console.log("[!] 词表兼容校验未通过，不作任何判定 / lexicon compatibility failed; no verdict is issued");
    problems.forEach((p) => console.log("    " + p));
      process.exit(2);
    }
  }
}

/* --- [G] v0.4.0 全生命周期、权限边界与测量声明判据 --- */
/*
 * 本段是 v0.4.0 三组新判据在本复演器中的第二次独立实现：与 seb-tabletop-run.js 不共享
 * 任何代码，语义取自同一份 seb-spec.json，判定码取自同一份违例码登记表。
 *
 * 输入域（登记表 applies_when 的含义）
 * 本复演器的输入是 OP-04 证据链档案，其声明单元只携带节点字段与一个用于闸门比对的
 * claimed_level，不携带 level_claim、measurement_declaration 或 authority_declaration。
 * 这三类触发输入在本实现的输入类型中结构性缺席，因此十四个新码在本实现内不可能触发
 * ——这是输入域的事实，不是实现缺口，登记表已就此明文。缺席不等于未实现：下列函数对
 * 每一条声明真实执行，触发输入一旦出现即照判据判定。
 *
 * 判定后果
 * 本档案的期望词汇（expected_verdict / expected_reason_code）成文于 v0.3.1，无法表达
 * 生命周期、权限与测量声明类结论。因此这三类判据一旦命中，本复演器不把它降格为一条
 * 读数不符（退出码 1），而是按「不作任何判定」以退出码 2 拒绝整次复演——判据命中却
 * 无法如实归档，继续复演就是拿一份表达不了结论的期望表去盖章。
 *
 * This block is the second independent implementation of the three v0.4.0 criteria
 * groups: it shares no code with seb-tabletop-run.js, takes its semantics from the same
 * seb-spec.json and its codes from the same violation-code registry.
 *
 * Input domain (what the registry's applies_when means)
 * This replayer's input is the OP-04 evidence-chain archive, whose declaration units
 * carry node fields and a claimed_level used for the gate comparison, and carry no
 * level_claim, measurement_declaration or authority_declaration. Those three triggering
 * inputs are structurally absent from this implementation's input type, so the fourteen
 * new codes cannot fire here — a fact of the input domain rather than an implementation
 * gap, as the registry states. Absent is not unimplemented: the functions below run for
 * real against every claim, and rule as the criteria require the moment a trigger appears.
 *
 * Consequence of a hit
 * This archive's expectation vocabulary (expected_verdict / expected_reason_code) was
 * written at v0.3.1 and cannot express a lifecycle, authority or measurement conclusion.
 * So a hit is not demoted to a disagreeing figure at exit 1: the whole replay is refused
 * at exit 2 with no verdict issued — carrying on would mean stamping a criterion hit
 * against an expectation table that has no way to record it.
 */
const lcSchema = spec.components.find((c) => c.component_id === "node_schema");
const lcLevels = spec.components.find((c) => c.component_id === "level_definitions");
const lcScoring = spec.components.find((c) => c.component_id === "scoring_definitions");
const lcBoundary = spec.components.find((c) => c.component_id === "ai_authority_boundary");
const RUN_CTX = { run: arc.run || {} };

const declaredValue = (v) => {
  if (v === null || v === undefined) return false;
  if (typeof v === "string") return v.trim().length > 0;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === "object") return Object.keys(v).length > 0;
  return true;
};
const pick = (root, dotted) => {
  let cur = root;
  for (const key of String(dotted).split(".")) {
    if (cur === null || cur === undefined) return undefined;
    cur = cur[key];
  }
  return cur;
};
const levelIndex = (id) => lcLevels.levels.findIndex((l) => l.level_id === id);

/* 生命周期字段组与供应商独立性字段：存在性由 required_from_level 与等级声明顺序决定，
   取值合规一律且只由该字段的 constraint_machine_rule 判定。 */
function lifecycleCodes(unit) {
  const claim = unit.level_claim;
  const node = unit.node || {};
  const out = [];
  if (!claim || typeof claim !== "object") return out;
  const rank = levelIndex(claim.level_id);
  if (rank < 0) return out;
  const group = (lcSchema.lifecycle_fields || []).slice();
  if (lcSchema.vendor_independence_field) group.push(lcSchema.vendor_independence_field);
  for (const f of group) {
    const value = node[f.field];
    const here = declaredValue(value);
    if (f.required_from_level) {
      const gate = levelIndex(f.required_from_level);
      if (gate >= 0 && rank >= gate && !here) { out.push("LIFECYCLE_FIELD_MISSING:" + f.field); continue; }
    }
    const r = f.constraint_machine_rule;
    if (!r || !here) continue;
    if (r.trigger_level !== undefined && claim.level_id !== r.trigger_level) continue;
    if (r.trigger_level === undefined && r.trigger_level_at_or_above !== undefined) {
      const gate = levelIndex(r.trigger_level_at_or_above);
      if (gate < 0 || rank < gate) continue;
    }
    switch (r.type) {
      case "lifecycle_status_gate":
      case "lifecycle_enum_gate":
        if (pick(node, r.field_path) !== r.required_value) out.push(r.violation_code);
        break;
      case "lifecycle_floor_check": {
        const block = pick(node, r.field_path) || {};
        if ((r.entries || []).some((e) => block[e] !== r.required_value)) out.push(r.violation_code);
        break;
      }
      case "lifecycle_enum_plus_flag": {
        const v = pick(node, r.field_path);
        if (Array.isArray(f.allowed_values) && f.allowed_values.indexOf(v) === -1) {
          out.push("NODE_ENUM_INVALID:" + f.field);
        }
        if (pick(node, r.forbidden_flag_path) === r.forbidden_flag_value) out.push(r.violation_code);
        break;
      }
      case "lifecycle_date_gate": {
        // 条文规则 as_of_date <= review_due；比较基准由 compare_against 指定，
        // 运行未声明该日期时本码的触发输入不存在，不判定，也不改取系统时钟。
        const asOf = pick(RUN_CTX, r.compare_against);
        const due = pick(node, r.field_path);
        if (typeof asOf === "string" && typeof due === "string" && asOf > due) out.push(r.violation_code);
        break;
      }
      default:
        out.push("RULE_TYPE_UNSUPPORTED:" + r.type);
    }
  }
  return out;
}

/* AI 权限边界：按 action_id 精确相等，条文明文不做子串匹配。 */
function authorityCodes(unit) {
  const decl = unit.authority_declaration;
  if (!lcBoundary || !decl || typeof decl !== "object") return [];
  const exclusive = (lcBoundary.human_exclusive || []).map((a) => a.action_id);
  const out = [];
  for (const action of decl.ai_actions || []) {
    if (exclusive.indexOf(action) !== -1) out.push(lcBoundary.violation_code);
  }
  return out;
}

/* 测量声明类七码：等价三维与阈值预注册需要成对测量记录，其余需要测量声明；
   各自的子块未声明时不触发——未声明不等于违例。 */
function measurementCodes(unit) {
  const decl = unit.measurement_declaration;
  if (!lcScoring || !decl || typeof decl !== "object") return [];
  const out = [];
  const eq = lcScoring.equivalence_conditions;
  const rec = decl.paired_measurement_record;
  if (eq && rec && typeof rec === "object") {
    const met = rec.conditions_met || {};
    const unmet = (eq.dimensions || []).filter((d) => met[d.dimension_id] === false);
    if (rec.ruled_equivalent === true && unmet.length) out.push(eq.violation_code);
    const pre = eq.threshold_preregistration;
    if (pre && rec.time_ratio_threshold_cited === true && rec.threshold_preregistered !== true) {
      out.push(pre.violation_code);
    }
  }
  const st = lcScoring.stratified_reporting;
  if (st) {
    const codes = st.violation_codes || [];
    const s = decl.stratification;
    const grouped = s && Array.isArray(s.role_groups_reported) && s.role_groups_reported.length > 0;
    if (codes.indexOf("STRATIFICATION_MISSING") !== -1 && s && s.applicable_declared === true && !grouped) {
      out.push("STRATIFICATION_MISSING");
    }
    const series = decl.stratified_series;
    if (codes.indexOf("WORST_GROUP_REGRESSION") !== -1 && series && series.total_direction === "improved") {
      const dirs = series.role_group_directions || {};
      if (Object.keys(dirs).some((g) => dirs[g] === "deteriorated")) out.push("WORST_GROUP_REGRESSION");
    }
    const basis = decl.group_membership_basis;
    if (codes.indexOf("GROUP_MEMBERSHIP_INFERRED") !== -1 && basis !== undefined
        && basis !== "voluntary_self_report") {
      out.push("GROUP_MEMBERSHIP_INFERRED");
    }
  }
  const rd = decl.reliability_disclosure;
  if (lcScoring.reliability_disclosure_rule_zh && rd && rd.unreliable_output_present === true
      && (rd.declared_unreliable_to_user !== true || rd.pointed_to_staffed_channel !== true)) {
    out.push("SILENT_UNRELIABLE_OUTPUT");
  }
  const ss = decl.sample_sufficiency;
  if (lcScoring.sample_sufficiency_rule_zh && ss && ss.below_preregistered_minimum === true
      && ss.group_conclusion !== "insufficient_evidence") {
    out.push("SAMPLE_INSUFFICIENT_CLAIMED_FAIR");
  }
  return out;
}

console.log("[G] v0.4.0 判据输入域 / v0.4.0 criteria input domain");
{
  const units = arc.stage_5_dual_review.machine_review.claims;
  const hits = [];
  let withLevel = 0, withAuthority = 0, withMeasurement = 0;
  for (const unit of units) {
    if (unit.level_claim) withLevel += 1;
    if (unit.authority_declaration) withAuthority += 1;
    if (unit.measurement_declaration) withMeasurement += 1;
    const codes = [].concat(lifecycleCodes(unit), authorityCodes(unit), measurementCodes(unit));
    [...new Set(codes)].forEach((code) => hits.push(unit.claim_id + " : " + code));
  }
  // 判定码自检：本实现可能给出的每一个码都必须登记在基准的违例码登记表中。
  // Code self-check: every code this implementation can emit must be registered.
  const registry = (spec.violation_code_registry || {}).codes || {};
  const emitted = new Set(["NODE_FIELD_MISSING", "NODE_ENUM_INVALID", "NODE_CONSTRAINT_VIOLATION",
    "LEVEL_UNKNOWN", "LEVEL_GATE_MISMATCH", "RULE_TYPE_UNSUPPORTED", "ADOPTER_LEXICON_INVALID_TOKEN",
    "ADOPTER_LEXICON_EVIDENCE_MISSING", "ADOPTER_LEXICON_MALFORMED"]);
  const lifecycleGroup = (lcSchema.lifecycle_fields || []).slice();
  if (lcSchema.vendor_independence_field) lifecycleGroup.push(lcSchema.vendor_independence_field);
  if (lifecycleGroup.length) emitted.add("LIFECYCLE_FIELD_MISSING");
  lifecycleGroup.forEach((f) => {
    const code = f.constraint_machine_rule && f.constraint_machine_rule.violation_code;
    if (code) emitted.add(String(code).split(":")[0]);
  });
  if (lcBoundary && lcBoundary.violation_code) emitted.add(lcBoundary.violation_code);
  if (lcScoring && lcScoring.equivalence_conditions) {
    const eq = lcScoring.equivalence_conditions;
    if (eq.violation_code) emitted.add(eq.violation_code);
    if (eq.threshold_preregistration && eq.threshold_preregistration.violation_code) {
      emitted.add(eq.threshold_preregistration.violation_code);
    }
  }
  if (lcScoring && lcScoring.stratified_reporting) {
    (lcScoring.stratified_reporting.violation_codes || []).forEach((c) => emitted.add(c));
  }
  if (lcScoring && lcScoring.reliability_disclosure_rule_zh) emitted.add("SILENT_UNRELIABLE_OUTPUT");
  if (lcScoring && lcScoring.sample_sufficiency_rule_zh) emitted.add("SAMPLE_INSUFFICIENT_CLAIMED_FAIR");
  const unregistered = [...emitted].filter((c) => !Object.prototype.hasOwnProperty.call(registry, c));
  if (unregistered.length) {
    console.log("[!] 判定码未登记在基准的违例码登记表中，不作任何判定 / verdict codes absent from the baseline registry; no verdict is issued");
    unregistered.forEach((c) => console.log("    " + c));
    process.exit(2);
  }
  console.log("    扫描声明 / claims scanned : " + units.length
    + "（判据函数对每条真实执行 / the criteria functions ran for real against each）");
  console.log("    触发输入 / triggering inputs : level_claim " + withLevel
    + " · authority_declaration " + withAuthority + " · measurement_declaration " + withMeasurement
    + "（登记表 applies_when：结构性缺席则该码不可能触发 / registry applies_when: structurally absent, so the codes cannot fire）");
  console.log("    码集自检 / code self-check : " + emitted.size
    + " 个可发码全部登记在基准登记表内 / all emittable codes are registered by the baseline");
  if (hits.length) {
    console.log("[!] 生命周期、权限或测量声明判据命中，本档案的期望词汇无法归档该结论，不作任何判定");
    console.log("    a lifecycle, authority or measurement criterion fired and this archive's expectation");
    console.log("    vocabulary cannot record that conclusion; no verdict is issued");
    hits.forEach((h) => console.log("    " + h));
    process.exit(2);
  }
}
console.log("");

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
const roadFeatures = geo("roads").features;
// 几何范围守卫：本复演器只支持两点线段；更长的折线在此拒绝运行，而不是静默取前两点
// 截断（截断会让全部长度与比值读数失真却照常退出 0）。
// Geometry guard: this replayer supports two-point segments only; longer polylines
// refuse the run here instead of being silently truncated to their first two points
// (truncation would distort every length and ratio while still exiting 0).
const tooLong = roadFeatures.filter((f) => f.geometry.type !== "LineString" || f.geometry.coordinates.length !== 2);
if (tooLong.length) {
  console.log("[!] 几何超出本复演器支持范围，不作任何判定 / geometry outside this replayer's support; no verdict is issued");
  tooLong.forEach((f) => console.log(`    ${f.properties.id}: ${f.geometry.type} · ${f.geometry.coordinates.length} 点 / points（仅支持两点 LineString / two-point LineString only）`));
  process.exit(2);
}
const roads = roadFeatures.map((f) => ({
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
  /* upgrade stretch: from the ROAD-001 crossing to whichever of the two
     access feet lies FARTHER from it along ROAD-004 — direction-free, so the
     stretch covers both access points on either side of the crossing */
  const t0 = paramOfCross(R4, R1);
  const t8 = paramOfFoot(R4, nodesById["OP-08"].xy);
  const t9 = paramOfFoot(R4, nodesById["OP-09"].xy);
  const t1 = Math.abs(t8 - t0) >= Math.abs(t9 - t0) ? t8 : t9;
  return { id: "ALT-A-UPGRADE", a: pointAt(R4, t0), b: pointAt(R4, t1) };
})();
const altB = (() => {
  /* added ground link west from ROAD-001 at the latitude of OP-09 (the
     sensory-load node), reaching the market cluster's western access: south
     of ROAD-004, clear of the station range.  The v0.2 archive ran this link
     from the ROAD-005 south end because the market nodes then sat east of the
     corridor; with the cluster relocated west, the same intent — a second
     ground interface that avoids the station crossing — points west. */
  const y9 = nodesById["OP-09"].xy[1];
  const tw = (y9 - R1.a[1]) / (R1.b[1] - R1.a[1]);
  return { id: "ALT-B-LINK", a: pointAt(R1, tw), b: [nodesById["OP-09"].xy[0], y9] };
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
/* fixed physical interfaces, resolved once on the full submitted network */
const gFull = buildGraph(STATE_EDGES.BASE_ON());
const anchors = {};
for (const nid of Object.keys(nodesById)) {
  const best = nearestOn(gFull.segs, nodesById[nid].xy, null);
  anchors[nid] = { roadId: best.s.id, stub: best.d };
}
const STATE_ADDED = { BASE_ON: [], BASE_OFF: [], ALT_A_OFF: [altA.id], ALT_B_OFF: [altB.id] };
for (const row of arc.stage_4_ai_off_counterfactual.expected_results.rows) {
  const G = buildGraph(STATE_EDGES[row.state_id]());
  const stateIds = new Set(STATE_EDGES[row.state_id]().map((e) => e.id));
  const added = STATE_ADDED[row.state_id];
  const t = tasks[row.task_id];
  const hook = (nid) => {
    const anchor = anchors[nid];
    if (stateIds.has(anchor.roadId) || added.length) return attach(G, nodesById[nid].xy, anchor, added.filter((x) => stateIds.has(x)));
    return null;
  };
  const o = hook(t.origin);
  const d = hook(t.destination);
  const net = o && d ? shortest(G, o.key, d.key) : null;
  const total = net === null ? null : o.stub + net + d.stub;
  const label = row.state_id + " " + row.task_id + " " + t.origin + "→" + t.destination;
  let bad = false;
  if (!near(o ? r3(o.stub) : null, row.origin_access_stub_m !== undefined ? row.origin_access_stub_m : arc.stage_4_ai_off_counterfactual.expected_results.origin_access_stub_m)) { fail(label + " 起点接入段 " + (o ? r3(o.stub) : "null")); bad = true; }
  if (!near(d ? r3(d.stub) : null, row.destination_access_stub_m)) { fail(label + " 终点接入段 " + (d ? r3(d.stub) : "null") + " ≠ " + row.destination_access_stub_m); bad = true; }
  if ((d ? d.roadId : null) !== row.destination_attached_to) { fail(label + " 终点挂接于 " + (d ? d.roadId : "null") + " ≠ " + row.destination_attached_to); bad = true; }
  if ((net !== null) !== row.reachable) { fail(label + " 可达性 " + (net !== null) + " ≠ " + row.reachable); bad = true; }
  if (!near(net === null ? null : r3(net), row.network_m)) { fail(label + " 网络行程 " + (net === null ? "null" : r3(net)) + " ≠ " + row.network_m); bad = true; }
  if (!near(total === null ? null : r3(total), row.total_m)) { fail(label + " 全程 " + (total === null ? "null" : r3(total)) + " ≠ " + row.total_m); bad = true; }
  if (!bad) {
    console.log("    " + label.padEnd(34) + (row.reachable
      ? "全程 / total " + row.total_m + " m（接入 " + row.destination_access_stub_m + " m，挂接 " + row.destination_attached_to + "）"
      : "不可达 / unreachable（接口线不在 AI 关闭边集 / interface line absent from the AI-off edge set）"));
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
if (der.ai_off_approach_ratio_over_ai_on) {
  /* v0.2 archives: AI-off re-attachment ratio (meaningful only under the old
     nearest-in-state rule, where an off attachment still existed) */
  for (const tk of ["T1", "T2"]) {
    const dest = tasks[tk].destination;
    const ratio = r3(stubOf("BASE_OFF", tk) / stubOf("BASE_ON", tk));
    if (ratio !== der.ai_off_approach_ratio_over_ai_on[dest]) fail(dest + " 接入距离比 " + ratio);
    console.log("    " + dest + " 接入距离比 关闭/开启 / approach ratio off over on : " + ratio.toFixed(3));
  }
}
if (der.alt_b_approach_ratio_over_ai_on) {
  /* v0.3 archives: under the fixed-interface rule BASE_OFF has no attachment
     at all, so the meaningful access-cost ratio is ALT-B (the new interface)
     against the AI-on baseline */
  for (const tk of ["T1", "T2"]) {
    const dest = tasks[tk].destination;
    const ratio = r3(stubOf("ALT_B_OFF", tk) / stubOf("BASE_ON", tk));
    if (ratio !== der.alt_b_approach_ratio_over_ai_on[dest]) fail(dest + " ALT-B 接入距离比 " + ratio);
    console.log("    " + dest + " ALT-B 接入距离比 对开启 / ALT-B approach ratio over AI-on : " + ratio.toFixed(3));
  }
}
console.log("");

/* --- [5] 环节五：机器复核 --- */
console.log("[5] 环节五 机器复核 / Stage 5 machine review");
const forb = fieldRule("ai_off_path");
const roleRule = fieldRule("human_handoff");
const levelById = {};
levels.levels.forEach((l) => { levelById[l.level_id] = l; });

function ruleNode(claim) {
  // 与桌面校验器同一语义（违例码登记表）：字段须为非空字符串——严格类型，不做字符串
  // 强转（此前 String(v) 会把数字放行）；缺字段不再短路其余判据，逐条报全。
  // Same semantics as the tabletop checker (violation-code registry): fields must be
  // non-empty strings — strict typing, no coercion (String(v) used to let numbers
  // through); a missing field no longer short-circuits the rest, every reason reports.
  const reasons = [];
  const valid = {};
  for (const f of nodeSchema.required_fields) {
    const v = claim.node[f.field];
    if (typeof v !== "string" || v.trim() === "") reasons.push("NODE_FIELD_MISSING:" + f.field);
    else valid[f.field] = v;
  }
  if (valid.ai_off_path) {
    const p = valid.ai_off_path.toLowerCase();
    if (forb.forbidden_targets.some((x) => p.includes(String(x).toLowerCase()))) reasons.push(forb.violation_code);
  }
  if (valid.human_handoff) {
    const h = valid.human_handoff.toLowerCase();
    // v0.3.1：与 seb-tabletop-run.js 同一并集语义，词表已在版本闸门后按条文完成合格性校验。
    // v0.3.1: same union semantics as the tabletop checker; the lexicon passed the
    // text-stated eligibility check right after the version gate.
    const roleTokens = ARC_LEXICON.length ? roleRule.required_tokens.concat(ARC_LEXICON) : roleRule.required_tokens;
    if (!roleTokens.some((x) => h.includes(String(x).toLowerCase()))) reasons.push(roleRule.violation_code);
  }
  if (valid.gate_id) {
    const enumField = nodeSchema.required_fields.find((f) => f.field === "gate_id");
    if (enumField.allowed_values.indexOf(valid.gate_id) === -1) reasons.push("NODE_ENUM_INVALID:gate_id");
  }
  const lvl = levelById[claim.claimed_level];
  if (!lvl) reasons.push("LEVEL_UNKNOWN:" + claim.claimed_level);
  else if (valid.gate_id && lvl.gate_binding.gate_id !== "none" && lvl.gate_binding.gate_id !== valid.gate_id) reasons.push(levels.gate_violation_code);
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
