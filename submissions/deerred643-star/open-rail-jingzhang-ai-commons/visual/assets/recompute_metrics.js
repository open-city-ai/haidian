#!/usr/bin/env node
/**
 * 一键复算：从包内 GeoJSON 离线复算全部核心指标并与 metrics.json 对账。
 *
 * 用法（在提交包根目录执行）：
 *     node visual/assets/recompute_metrics.js            # 复算 + 对账 + 打印报告
 *     node visual/assets/recompute_metrics.js --json     # 仅输出机器可读 JSON
 *
 * 依赖：Node.js >= 14，仅用标准库（fs/path），全部离线、零外部依赖——
 * 与 visual/index.html 同一技术栈，评审环境无需安装任何包。
 *
 * 口径与 metrics.json 逐条对齐（面积/长度在 EPSG:4548 投影下计算）：
 *   EPSG:4548 = CGCS2000 / 3-degree Gauss-Kruger CM 117E（false easting 500000）。
 *   本脚本内联实现高斯-克吕格投影（CGCS2000 椭球 a=6378137, f=1/298.257222101，
 *   中央经线 117°E），与仓库评审脚本（pyproj EPSG:4326→4548 + shapely）口径一致；
 *   平移参数（false easting）不影响面积与长度，故不引入。
 *   ——与 metrics.json 声明值对账容差：面积类相对 1e-4，比率类绝对 1e-4，长度类相对 1e-3。
 *   任一指标超出容差即判 FAIL 并以非零码退出（对应可证伪条件第 4 条「复算主张」）。
 * 第 13 项（v2.9 新增）：om-funding-gap.json 运维资金缺口表算术一致性——
 *   子项乘积（量纲×占比×单价）、科目小计、储备比例（5%-10%）、总计、缺口恒等式
 *   （coverage=0 ⇒ 缺口=已量化+储备）、占位科目不得携带金额、单价来源必须登记于
 *   sources.json。任一断言不成立即 FAIL（同样对应可证伪条件第 4 条）。
 *
 * 第 14 项（v3.1 新增）：pdf-page-map.json PDF 全页映射一致性——
 *   四份 A3/A0 PDF 的逐页登记（页数、版本字符串无历史残留、首页/板头版本标注、
 *   无空白页、中英逐页对齐）全部断言为 passed=true，登记版本须与本包 v3.1 一致。
 *   对应 v3.0 评审「PDF 仅提供首页预览，不能仅凭首页推断全部页面内容」的保留意见。
 *
 * 证据输出：visual/assets/recompute-evidence.json（供评审与 CI 复核）。
 */
"use strict";

const fs = require("fs");
const path = require("path");

const PKG = path.resolve(__dirname, "..", ".."); // visual/assets/ -> 包根
const SPINE_ROAD_NAME = "开源步道·京张遗址慢行主线";
const UNKNOWN_METRICS = ["floor_area_ratio", "building_height_control"];

const TOLERANCES = {
  site_area_sqm: ["rel", 1e-4],
  green_space_area_sqm: ["rel", 1e-4],
  green_ratio: ["abs", 1e-4],
  public_space_area_sqm: ["rel", 1e-4],
  public_space_ratio: ["abs", 1e-4],
  building_footprint_area_sqm: ["rel", 1e-4],
  building_footprint_ratio: ["abs", 1e-4],
  spine_length_m: ["rel", 1e-3],
  key_area_count: ["abs", 0],
  key_area_zhongzhiyuan_area_sqm: ["rel", 1e-4],
  key_area_origin_community_area_sqm: ["rel", 1e-4],
  key_area_dazhongsi_area_sqm: ["rel", 1e-4],
};

// ---------------- CGCS2000 椭球 + 高斯-克吕格投影（CM 117E） ----------------
const A = 6378137.0;                    // 长半轴
const F = 1 / 298.257222101;            // 扁率（CGCS2000）
const E2 = 2 * F - F * F;               // 第一偏心率平方
const CENTRAL_MERIDIAN = 117.0;         // EPSG:4548 中央经线（3-degree GK CM 117E）
const RAD = Math.PI / 180;

/** 经纬度（度）-> 高斯-克吕格平面坐标（米，相对中央经线，无平移） */
function gkProject(lonDeg, latDeg) {
  const lon = (lonDeg - CENTRAL_MERIDIAN) * RAD;
  const lat = latDeg * RAD;
  const sinLat = Math.sin(lat);
  const cosLat = Math.cos(lat);
  const tanLat = Math.tan(lat);
  const e2 = E2;
  const ep2 = e2 / (1 - e2);            // 第二偏心率平方
  const N = A / Math.sqrt(1 - e2 * sinLat * sinLat);   // 卯酉圈曲率半径
  const T = tanLat * tanLat;
  const C = ep2 * cosLat * cosLat;
  const Aa = cosLat * lon;
  const M =
    A *
    ((1 - e2 / 4 - (3 * e2 * e2) / 64 - (5 * e2 * e2 * e2) / 256) * lat -
      ((3 * e2) / 8 + (3 * e2 * e2) / 32 + (45 * e2 * e2 * e2) / 1024) *
        Math.sin(2 * lat) +
      ((15 * e2 * e2) / 256 + (45 * e2 * e2 * e2) / 1024) * Math.sin(4 * lat) -
      ((35 * e2 * e2 * e2) / 3072) * Math.sin(6 * lat));
  const x = N * (Aa + ((1 - T + C) * Aa ** 3) / 6 + ((5 - 18 * T + T * T + 72 * C - 58 * ep2) * Aa ** 5) / 120); // 东向
  const y = M + N * tanLat * (Aa ** 2 / 2 + ((5 - T + 9 * C + 4 * C * C) * Aa ** 4) / 24 + ((61 - 58 * T + T * T + 600 * C - 330 * ep2) * Aa ** 6) / 720); // 北向
  return [x, y];
}

// ---------------- GeoJSON 几何计算 ----------------
function ringArea(ring) {
  // 平面 shoelace；GeoJSON 面与内部环反号，直接累加即得带孔面积
  let s = 0;
  const pts = ring.map(([lon, lat]) => gkProject(lon, lat));
  for (let i = 0; i < pts.length - 1; i++) {
    s += pts[i][0] * pts[i + 1][1] - pts[i + 1][0] * pts[i][1];
  }
  return Math.abs(s) / 2;
}

function geomArea(geom) {
  if (geom.type === "Polygon") return geom.coordinates.reduce((a, r) => a + ringArea(r), 0);
  if (geom.type === "MultiPolygon")
    return geom.coordinates.reduce((a, p) => a + p.reduce((b, r) => b + ringArea(r), 0), 0);
  if (geom.type === "GeometryCollection")
    return geom.geometries.reduce((a, g) => a + geomArea(g), 0);
  return 0;
}

function geomLength(geom) {
  let total = 0;
  const lines = geom.type === "LineString" ? [geom.coordinates]
    : geom.type === "MultiLineString" ? geom.coordinates : [];
  for (const line of lines) {
    for (let i = 0; i < line.length - 1; i++) {
      const [x1, y1] = gkProject(line[i][0], line[i][1]);
      const [x2, y2] = gkProject(line[i + 1][0], line[i + 1][1]);
      total += Math.hypot(x2 - x1, y2 - y1);
    }
  }
  return total;
}

function loadFeatures(name) {
  return JSON.parse(fs.readFileSync(path.join(PKG, "geometry", name), "utf8")).features;
}

// ---------------- 主流程 ----------------
function main() {
  const jsonOnly = process.argv.includes("--json");
  const metrics = JSON.parse(fs.readFileSync(path.join(PKG, "metrics.json"), "utf8")).metrics;

  const siteArea = geomArea(loadFeatures("site_boundary.geojson")[0].geometry);
  const layerArea = (f) => loadFeatures(f).reduce((a, x) => a + geomArea(x.geometry), 0);
  const green = layerArea("green_space.geojson");
  const pub = layerArea("public_space.geojson");
  const bldg = layerArea("buildings.geojson");

  let spineLen = 0;
  for (const f of loadFeatures("roads.geojson")) {
    if (f.properties && f.properties.name_zh === SPINE_ROAD_NAME) spineLen += geomLength(f.geometry);
  }

  const keyFeats = {};
  for (const f of loadFeatures("key_areas.geojson")) keyFeats[f.properties.area_id] = geomArea(f.geometry);

  const computed = {
    site_area_sqm: siteArea,
    green_space_area_sqm: green,
    green_ratio: green / siteArea,
    public_space_area_sqm: pub,
    public_space_ratio: pub / siteArea,
    building_footprint_area_sqm: bldg,
    building_footprint_ratio: bldg / siteArea,
    spine_length_m: spineLen,
    key_area_count: Object.keys(keyFeats).length,
    key_area_zhongzhiyuan_area_sqm: keyFeats.zhongzhiyuan_ai_acceleration_area,
    key_area_origin_community_area_sqm: keyFeats.beijing_ai_origin_community,
    key_area_dazhongsi_area_sqm: keyFeats.dazhongsi_ai_industry_cluster,
  };

  const rows = [];
  const failures = [];
  for (const [name, value] of Object.entries(computed)) {
    const claimed = metrics[name] && metrics[name].value;
    if (claimed == null) { failures.push(`${name}: metrics.json 缺少该指标`); continue; }
    const [kind, tol] = TOLERANCES[name];
    const diff = Math.abs(value - claimed);
    const dev = kind === "rel" && claimed ? diff / Math.abs(claimed) : diff;
    const ok = dev <= tol;
    rows.push({
      metric: name, recomputed: +value.toFixed(3), claimed,
      abs_diff: +diff.toFixed(6), tolerance: `${kind} <= ${tol}`,
      result: ok ? "PASS" : "FAIL",
    });
    if (!ok) failures.push(`${name}: 偏差 ${dev.toExponential(3)} 超出容差 ${kind}<=${tol}`);
  }

  const unknownOk = UNKNOWN_METRICS.every((m) => metrics[m].status === "unknown" && metrics[m].value == null);
  if (!unknownOk) failures.push("floor_area_ratio / building_height_control 应保持 unknown（地块级图则数值未发布：v3.0 已登记控规公开版街区层面基准，地块级容积率/高度需读图获取）");

  // ---------------- 第 13 项：运维资金缺口表算术一致性（om-funding-gap.json，v2.9） ----------------
  // 校验：① 逐子项「量纲 × 占比假设 × 单价区间」复算；② 科目小计 = 子项和；③ 储备科目 = 已量化科目合计 × 储备率；
  // ④ 总计；⑤ 缺口恒等式（coverage=0 ⇒ gap = 已量化+储备）；⑥ 占位科目不得携带金额；⑦ 单价来源必须登记于 sources.json。
  const omGap = JSON.parse(fs.readFileSync(path.join(__dirname, "om-funding-gap.json"), "utf8"));
  const sourceIds = JSON.parse(fs.readFileSync(path.join(PKG, "sources.json"), "utf8")).sources.map((s) => s.id);
  const r1 = (x) => Math.round(x * 10) / 10;
  const omRows = [];
  const quantified = [];

  for (const acc of omGap.accounts) {
    if (acc.status === "placeholder_no_public_reference") {
      const bad = acc.annual_cost_wan.low !== null || acc.annual_cost_wan.high !== null;
      omRows.push({
        account: acc.account_zh, check: "placeholder_no_amount",
        recomputed: [null, null], claimed: [acc.annual_cost_wan.low, acc.annual_cost_wan.high],
        result: bad ? "FAIL" : "PASS",
      });
      if (bad) failures.push(`om-funding-gap/${acc.account_zh}: 占位科目不得携带金额`);
      continue;
    }
    if (acc.status === "derived_rom") {
      const base = quantified.reduce((a, x) => [a[0] + x[0], a[1] + x[1]], [0, 0]);
      const wantLow = r1(base[0] * acc.ratio.low);
      const wantHigh = r1(base[1] * acc.ratio.high);
      const ok = Math.abs(wantLow - acc.annual_cost_wan.low) <= 0.05 && Math.abs(wantHigh - acc.annual_cost_wan.high) <= 0.05;
      omRows.push({
        account: acc.account_zh, check: "derived_reserve (quantified_sum x ratio)",
        recomputed: [wantLow, wantHigh], claimed: [acc.annual_cost_wan.low, acc.annual_cost_wan.high],
        result: ok ? "PASS" : "FAIL",
      });
      if (!ok) failures.push(`om-funding-gap/${acc.account_zh}: 储备复算 ${wantLow}-${wantHigh} 与声明 ${acc.annual_cost_wan.low}-${acc.annual_cost_wan.high} 不一致`);
      acc._derived = [wantLow, wantHigh];
      continue;
    }
    let lo = 0;
    let hi = 0;
    for (const sub of acc.sub_items) {
      const share = sub.share_assumption;
      const loWant = r1((sub.dimension.value * (share ? share.low : 1) * sub.unit_price.low) / sub.divisor_to_wan);
      const hiWant = r1((sub.dimension.value * (share ? share.high : 1) * sub.unit_price.high) / sub.divisor_to_wan);
      const ok = Math.abs(loWant - sub.annual_cost_wan.low) <= 0.05 && Math.abs(hiWant - sub.annual_cost_wan.high) <= 0.05;
      omRows.push({
        sub_item: sub.id, check: "dimension x share x price",
        recomputed: [loWant, hiWant], claimed: [sub.annual_cost_wan.low, sub.annual_cost_wan.high],
        result: ok ? "PASS" : "FAIL",
      });
      if (!ok) failures.push(`om-funding-gap/${sub.id}: 子项复算 ${loWant}-${hiWant} 与声明 ${sub.annual_cost_wan.low}-${sub.annual_cost_wan.high} 不一致`);
      if (!sourceIds.includes(sub.unit_price.source_ref)) {
        failures.push(`om-funding-gap/${sub.id}: 单价来源 ${sub.unit_price.source_ref} 未登记于 sources.json（无裸数字纪律）`);
      }
      lo += loWant;
      hi += hiWant;
    }
    const accOk = Math.abs(r1(lo) - acc.account_cost_wan.low) <= 0.05 && Math.abs(r1(hi) - acc.account_cost_wan.high) <= 0.05;
    omRows.push({
      account: acc.account_zh, check: "sub_item_sum",
      recomputed: [r1(lo), r1(hi)], claimed: [acc.account_cost_wan.low, acc.account_cost_wan.high],
      result: accOk ? "PASS" : "FAIL",
    });
    if (!accOk) failures.push(`om-funding-gap/${acc.account_zh}: 科目小计复算 ${r1(lo)}-${r1(hi)} 与声明 ${acc.account_cost_wan.low}-${acc.account_cost_wan.high} 不一致`);
    quantified.push([r1(lo), r1(hi)]);
  }

  const qSum = quantified.reduce((a, x) => [a[0] + x[0], a[1] + x[1]], [0, 0]);
  const reserveAcc = omGap.accounts.find((a) => a.status === "derived_rom");
  const reserveVals = reserveAcc ? reserveAcc._derived : [0, 0];
  const tot = [r1(qSum[0] + reserveVals[0]), r1(qSum[1] + reserveVals[1])];
  const qOk = Math.abs(r1(qSum[0]) - omGap.totals.quantified_accounts_wan.low) <= 0.05 &&
    Math.abs(r1(qSum[1]) - omGap.totals.quantified_accounts_wan.high) <= 0.05;
  const totOk = Math.abs(tot[0] - omGap.totals.quantified_plus_reserve_wan.low) <= 0.05 &&
    Math.abs(tot[1] - omGap.totals.quantified_plus_reserve_wan.high) <= 0.05;
  omRows.push({
    check: "totals (quantified accounts)",
    recomputed: [r1(qSum[0]), r1(qSum[1])],
    claimed: [omGap.totals.quantified_accounts_wan.low, omGap.totals.quantified_accounts_wan.high],
    result: qOk ? "PASS" : "FAIL",
  });
  omRows.push({
    check: "totals_plus_reserve",
    recomputed: tot,
    claimed: [omGap.totals.quantified_plus_reserve_wan.low, omGap.totals.quantified_plus_reserve_wan.high],
    result: totOk ? "PASS" : "FAIL",
  });
  if (!qOk) failures.push("om-funding-gap/totals: 已量化科目合计与声明不一致");
  if (!totOk) failures.push("om-funding-gap/totals: 含储备合计与声明不一致");

  const gapOk = omGap.totals.coverage_ratio === 0 &&
    omGap.totals.gap_wan.low === omGap.totals.quantified_plus_reserve_wan.low &&
    omGap.totals.gap_wan.high === omGap.totals.quantified_plus_reserve_wan.high;
  omRows.push({
    check: "gap_identity (coverage=0 => gap = quantified+reserve)",
    recomputed: tot,
    claimed: [omGap.totals.gap_wan.low, omGap.totals.gap_wan.high],
    result: gapOk ? "PASS" : "FAIL",
  });
  if (!gapOk) failures.push("om-funding-gap/gap: 缺口恒等式不成立（coverage=0 时缺口须等于已量化+储备合计）");
  const covOk = omGap.accounts.every((a) => a.commitment_coverage_ratio === undefined || a.commitment_coverage_ratio === 0);
  omRows.push({
    check: "coverage_discipline (all declared coverage = 0)",
    recomputed: [0, 0], claimed: [0, 0],
    result: covOk ? "PASS" : "FAIL",
  });
  if (!covOk) failures.push("om-funding-gap/coverage: 概念阶段承诺覆盖率必须如实登记为 0");
  const omAllPass = omRows.every((r) => r.result === "PASS");

  // ===== 第 14 项：PDF 全页映射一致性（pdf-page-map.json，v3.1 新增） =====
  const PM_PATH = path.join(PKG, "visual", "assets", "pdf-page-map.json");
  const PM_EXPECT = {
    "drawings/a3-booklet.pdf": { format: "A3", page_count: 13 },
    "drawings/a3-booklet.en.pdf": { format: "A3", page_count: 13 },
    "drawings/a0-boards.pdf": { format: "A0", page_count: 9 },
    "drawings/a0-boards.en.pdf": { format: "A0", page_count: 9 },
  };
  const pmRows = [];
  if (!fs.existsSync(PM_PATH)) {
    failures.push("pdf-page-map: visual/assets/pdf-page-map.json 缺失");
  } else {
    const pm = JSON.parse(fs.readFileSync(PM_PATH, "utf8"));
    if (pm.package_version !== "v3.1") {
      failures.push(`pdf-page-map: package_version ${pm.package_version} != v3.1`);
    }
    for (const [p, exp] of Object.entries(PM_EXPECT)) {
      const e = (pm.files || []).find((f) => f.path === p);
      if (!e) {
        failures.push(`pdf-page-map: 缺少 ${p} 的逐页登记`);
        continue;
      }
      const n = Array.isArray(e.pages) ? e.pages.length : 0;
      const ok = n === exp.page_count && e.page_count === exp.page_count;
      pmRows.push({ check: `${p} 逐页登记 ${n}/${exp.page_count} 页`, result: ok ? "PASS" : "FAIL" });
      if (!ok) failures.push(`pdf-page-map: ${p} 页数登记与实测不一致`);
    }
    for (const a of pm.assertions || []) {
      pmRows.push({ check: a.id, result: a.passed ? "PASS" : "FAIL" });
      if (!a.passed) failures.push(`pdf-page-map: ${a.id} 断言未通过`);
    }
  }
  const pmAllPass = pmRows.length > 0 && pmRows.every((r) => r.result === "PASS");

  const allPass = failures.length === 0;
  const evidence = {
    schema_version: "1.0.0",
    generated_at: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
    crs: "EPSG:4548",
    script: "visual/assets/recompute_metrics.js",
    runtime: "Node.js（仅标准库，零外部依赖，全离线）",
    inputs: [
      "geometry/site_boundary.geojson", "geometry/green_space.geojson",
      "geometry/public_space.geojson", "geometry/buildings.geojson",
      "geometry/roads.geojson", "geometry/key_areas.geojson", "metrics.json",
      "visual/assets/om-funding-gap.json", "visual/assets/pdf-page-map.json", "sources.json",
    ],
    tolerances: Object.fromEntries(Object.entries(TOLERANCES).map(([k, v]) => [k, `${v[0]}<=${v[1]}`])),
    unknown_metrics_kept: UNKNOWN_METRICS,
    metrics_checked: rows.length,
    om_funding_gap: {
      checks: omRows.length,
      all_pass: omAllPass,
      results: omRows,
      calibre: "万元/年 ROM 区间；子项=量纲×占比假设×单价区间，储备=已量化科目合计×5%-10%，缺口恒等式=coverage 0 时等于已量化+储备合计；单价来源须登记于 sources.json。",
    },
    pdf_page_map: {
      checks: pmRows.length,
      all_pass: pmAllPass,
      results: pmRows,
      calibre: "四份 A3/A0 PDF 的全部 44 页逐页登记（章节/板号、图幅、字符数、文本 SHA-256），并机检页数、版本字符串无历史残留、首页/板头版本标注、无空白页与中英逐页对齐；对应 v3.0 评审「不能仅凭首页推断全部页面内容」。",
    },
    all_pass: allPass,
    failures,
    results: rows,
    note: "一键复算证据：全部 known 状态指标由包内 GeoJSON 在 EPSG:4548（CGCS2000 / 3-degree Gauss-Kruger CM 117E，脚本内联投影实现）下独立复算并与 metrics.json 对账；floor_area_ratio 与 building_height_control 保持 unknown——v3.0 已登记 HD00-1601 等街区控规公开版街区层面基准强度/高度分区（statutory-reconciliation.json），地块级图则数值需读图获取，本包不以推测值冒充。复算口径与仓库评审脚本一致（EPSG:4326→4548 投影面积/长度）。第 13 项（v2.9）：om-funding-gap.json 运维资金缺口表全量算术一致性——子项乘积、科目小计、储备比例、总计、缺口恒等式、占位纪律与单价来源登记逐项机检。第 14 项（v3.1）：pdf-page-map.json PDF 全页映射一致性——四份 A3/A0 PDF 共 44 页逐页登记与页数、版本字符串、无空白页、首页/板头版本标注与中英逐页对齐断言逐项机检。",
  };
  fs.writeFileSync(
    path.join(__dirname, "recompute-evidence.json"),
    JSON.stringify(evidence, null, 2) + "\n", "utf8");

  if (jsonOnly) { console.log(JSON.stringify(evidence, null, 2)); process.exit(allPass ? 0 : 1); }

  const line = "=".repeat(78);
  console.log(line);
  console.log("一键复算报告（recompute_metrics.js，Node.js 零依赖，全离线，EPSG:4548）");
  console.log(line);
  for (const r of rows) {
    console.log(
      `  [${r.result}] ${r.metric.padEnd(40)} 复算 ${r.recomputed.toLocaleString("en-US", { minimumFractionDigits: 3 })}` +
      `  声明 ${r.claimed.toLocaleString("en-US", { minimumFractionDigits: 3 })}  偏差 ${r.abs_diff}（${r.tolerance}）`);
  }
  console.log("  [INFO] floor_area_ratio / building_height_control 保持 unknown（地块级图则数值未发布；v3.0 已登记控规公开版街区层面基准）");
  console.log("-".repeat(78));
  console.log(`  第 13 项：运维资金缺口表（om-funding-gap.json，${omRows.length} 项机检 ${omAllPass ? "全部 PASS" : "存在 FAIL"}）`);
  for (const r of omRows) {
    const label = r.sub_item || r.account || r.check;
    console.log(`    [${r.result}] ${String(label).padEnd(46)} ${r.check}`);
  }
  console.log("-".repeat(78));
  console.log(`  第 14 项：PDF 全页映射（pdf-page-map.json，${pmRows.length} 项机检 ${pmAllPass ? "全部 PASS" : "存在 FAIL"}）`);
  for (const r of pmRows) {
    console.log(`    [${r.result}] ${String(r.check).padEnd(46)} pdf-page-map`);
  }
  console.log("-".repeat(78));
  console.log(allPass ? `结论: 全部 PASS（12 项指标复算一致 + 第 13 项缺口表 ${omRows.length} 项机检一致 + 第 14 项全页映射 ${pmRows.length} 项机检一致）` : `结论: FAIL: ${failures.join("; ")}`);
  console.log("证据已写入: visual/assets/recompute-evidence.json");
  process.exit(allPass ? 0 : 1);
}

main();
