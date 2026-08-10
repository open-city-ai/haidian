#!/usr/bin/env node
/*
 * AI-era Human City v1.7 spatial atlas.
 *
 * This generator only re-renders existing provisional GeoJSON, scenario cards,
 * and node-level interface plans. It adds no official geometry, route length,
 * capacity, permit, staffing, or performance claim. The SVGs are source
 * artifacts; qlmanage (or an equivalent local renderer) is used to make the
 * paired PNG review plates.
 */
const fs = require("fs");
const path = require("path");

const here = __dirname;
const packageRoot = path.resolve(here, "../..");
const geometryRoot = path.join(packageRoot, "geometry");
const figureRoot = path.join(packageRoot, "assets", "figures");

const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(packageRoot, rel), "utf8"));
const readGeometry = (name) => readJson(`geometry/${name}.geojson`);
const site = readGeometry("site_boundary").features[0];
const keyAreas = readGeometry("key_areas").features;
const roads = readGeometry("roads").features;
const green = readGeometry("green_space").features;
const publicSpace = readGeometry("public_space").features;
const scenarios = readGeometry("constraints").features.filter((feature) => feature.properties.layer === "SCENARIO_NODE");
const plans = readJson("visual/assets/ai-era-spatial-interface-plans.json").plans;

const areaNames = {
  "PROV-KEY-001": { zh: "众智园", en: "Zhongzhiyuan" },
  "PROV-KEY-002": { zh: "AI 原点社区", en: "AI Origin Community" },
  "PROV-KEY-003": { zh: "大钟寺", en: "Dazhongsi" }
};
const areaColors = { "PROV-KEY-001": "#159b92", "PROV-KEY-002": "#3d76ea", "PROV-KEY-003": "#8a4de8" };
const stageColors = ["#e76f51", "#2a9d8f", "#3d76ea", "#e9a93a"];
const stateLabelsEn = {
  "open / human-priority": "open / human-priority",
  "open / fallback": "open / fallback",
  "gated / simulated": "gated / simulated",
  "stop / review": "stop / review",
  "open / ordinary-route": "open / ordinary-route",
  "open / equivalent": "open / equivalent",
  "gated / voluntary": "gated / voluntary",
  "open / quiet": "open / quiet",
  "open / explainable": "open / explainable",
  "gated / review": "gated / review",
  "stop / fallback": "stop / fallback"
};

const esc = (value) => String(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

function wrap(value, width, english = false) {
  const source = String(value || "");
  if (english) {
    const lines = [];
    let line = "";
    source.split(/\s+/).forEach((word) => {
      const candidate = line ? `${line} ${word}` : word;
      if (line && candidate.length > width) { lines.push(line); line = word; } else line = candidate;
    });
    if (line) lines.push(line);
    return lines.length ? lines : [""];
  }
  const chars = [...source];
  const lines = [];
  for (let i = 0; i < chars.length; i += width) lines.push(chars.slice(i, i + width).join(""));
  return lines.length ? lines : [""];
}

function text(x, y, value, options = {}) {
  const { size = 20, fill = "#23384e", weight = 400, width = 40, lineHeight = Math.round(size * 1.35), anchor = "start", english = false } = options;
  const lines = wrap(value, width, english);
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="-apple-system,BlinkMacSystemFont,Arial,'PingFang SC','Microsoft YaHei',sans-serif" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}">${lines.map((line, index) => `<tspan x="${x}" dy="${index ? lineHeight : 0}">${esc(line)}</tspan>`).join("")}</text>`;
}

const rect = (x, y, w, h, fill, stroke = "none", radius = 12, extra = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="2" ${extra}/>`;
const line = (x1, y1, x2, y2, stroke, width = 4, extra = "") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${width}" ${extra}/>`;

function coordinates(geometry) {
  if (!geometry) return [];
  if (geometry.type === "Point") return [geometry.coordinates];
  if (geometry.type === "LineString") return geometry.coordinates;
  if (geometry.type === "Polygon") return geometry.coordinates[0];
  return [];
}

function boundsFor(features, padding = 0.0008) {
  const points = features.flatMap((feature) => coordinates(feature.geometry));
  const xs = points.map((point) => point[0]);
  const ys = points.map((point) => point[1]);
  return [Math.min(...xs) - padding, Math.min(...ys) - padding, Math.max(...xs) + padding, Math.max(...ys) + padding];
}

const overallBounds = boundsFor([site]);
function project(bounds, x, y, w, h) {
  const [minX, minY, maxX, maxY] = bounds;
  const sx = w / (maxX - minX);
  const sy = h / (maxY - minY);
  const scale = Math.min(sx, sy);
  const offsetX = x + (w - (maxX - minX) * scale) / 2;
  const offsetY = y + (h - (maxY - minY) * scale) / 2;
  return (point) => [offsetX + (point[0] - minX) * scale, offsetY + h - (point[1] - minY) * scale];
}

function pathFor(geometry, map) {
  const points = coordinates(geometry).map(map);
  if (!points.length) return "";
  return `${points.map((point, index) => `${index ? "L" : "M"}${point[0].toFixed(1)} ${point[1].toFixed(1)}`).join(" ")}${geometry.type === "Polygon" ? " Z" : ""}`;
}

function featureCentroid(feature) {
  const points = coordinates(feature.geometry);
  const x = points.reduce((sum, point) => sum + point[0], 0) / points.length;
  const y = points.reduce((sum, point) => sum + point[1], 0) / points.length;
  return [x, y];
}

function inBounds(feature, bounds) {
  const [x, y] = featureCentroid(feature);
  return x >= bounds[0] && x <= bounds[2] && y >= bounds[1] && y <= bounds[3];
}

function drawMap(out, x, y, w, h, bounds, options = {}) {
  const map = project(bounds, x + 14, y + 14, w - 28, h - 28);
  const clipId = options.clipId || `clip-${x}-${y}`;
  out.push(`<clipPath id="${clipId}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14"/></clipPath>`);
  out.push(rect(x, y, w, h, "#f3f6f3", "#cbd8e3", 14));
  out.push(`<g clip-path="url(#${clipId})">`);
  const local = (feature) => !options.focus || inBounds(feature, bounds);
  green.filter(local).forEach((feature) => out.push(`<path d="${pathFor(feature.geometry, map)}" fill="#9bc99c" fill-opacity=".55" stroke="#5d9f74" stroke-width="2"/>`));
  publicSpace.filter(local).forEach((feature) => out.push(`<path d="${pathFor(feature.geometry, map)}" fill="#f0bd63" fill-opacity=".78" stroke="#c78825" stroke-width="2"/>`));
  roads.filter(local).forEach((feature) => {
    const color = feature.properties.road_class === "pedestrian" || feature.properties.road_class === "cycleway" || feature.properties.road_class === "greenway" ? "#e67652" : "#6b91bd";
    out.push(`<path d="${pathFor(feature.geometry, map)}" fill="none" stroke="${color}" stroke-width="${feature.properties.human_priority ? 5 : 3}" stroke-linecap="round" stroke-opacity=".9"/>`);
  });
  keyAreas.filter(local).forEach((feature) => {
    const id = feature.properties.id;
    const color = areaColors[id] || "#6b8197";
    const focused = id === options.focus;
    out.push(`<path d="${pathFor(feature.geometry, map)}" fill="${color}" fill-opacity="${focused ? ".16" : ".05"}" stroke="${color}" stroke-width="${focused ? 5 : 3}" stroke-dasharray="${focused ? "none" : "12 9"}"/>`);
    if (!options.focus && options.labels) {
      const [cx, cy] = map(featureCentroid(feature));
      out.push(rect(cx - 60, cy - 18, 120, 30, "#ffffff", color, 8));
      out.push(text(cx, cy + 4, areaNames[id][options.lang], { size: 15, weight: 700, fill: color, width: 12, anchor: "middle", english: options.lang === "en" }));
    }
  });
  scenarios.filter(local).forEach((feature) => {
    const [cx, cy] = map(feature.geometry.coordinates);
    out.push(`<circle cx="${cx}" cy="${cy}" r="7" fill="#ffffff" stroke="#d95d49" stroke-width="3"/>`);
    if (options.scenarioLabels) out.push(text(cx + 10, cy + 5, feature.properties.scenario_card_id, { size: 13, fill: "#7f3f32", width: 10, english: options.lang === "en" }));
  });
  if (options.focus) {
    const feature = keyAreas.find((item) => item.properties.id === options.focus);
    if (feature) {
      const d = pathFor(feature.geometry, map);
      out.push(`<path d="${d}" fill="none" stroke="${areaColors[options.focus]}" stroke-width="6" stroke-dasharray="12 7"/>`);
    }
  }
  out.push("</g>");
  out.push(line(x + w - 48, y + 42, x + w - 48, y + 18, "#273b54", 3));
  out.push(`<path d="M${x + w - 54} ${y + 25} L${x + w - 48} ${y + 14} L${x + w - 42} ${y + 25}" fill="#273b54"/>`);
  out.push(text(x + w - 48, y + 64, options.lang === "en" ? "N" : "北", { size: 14, weight: 700, anchor: "middle", width: 4, english: options.lang === "en" }));
  out.push(text(x + 16, y + h - 14, options.lang === "en" ? "display transform · provisional GeoJSON" : "显示转换 · 临时 GeoJSON", { size: 13, fill: "#5c7187", width: 32, english: options.lang === "en" }));
}

function header(out, title, subtitle, lang) {
  out.push(`<svg xmlns="http://www.w3.org/2000/svg" width="2200" height="1320" viewBox="0 0 2200 1320" preserveAspectRatio="xMinYMin meet" role="img" aria-labelledby="title desc">`);
  out.push(`<title id="title">${esc(title)}</title>`);
  out.push(`<desc id="desc">${esc(subtitle)} All spatial layers are provisional or conceptual and must not be read as official redlines, engineering dimensions, permits, operations, or scores.</desc>`);
  out.push(`<rect width="2200" height="1320" fill="#f7f9fc"/>`);
  out.push(rect(0, 0, 2200, 126, "#152442", "none", 0));
  out.push(text(64, 62, title, { size: lang === "en" ? 39 : 50, fill: "#ffffff", weight: 700, width: lang === "en" ? 86 : 55, english: lang === "en" }));
  out.push(text(66, 101, subtitle, { size: lang === "en" ? 18 : 22, fill: "#c8d5ec", width: lang === "en" ? 128 : 106, english: lang === "en" }));
  out.push(text(2120, 62, "v1.7", { size: 22, fill: "#e9a93a", weight: 700, anchor: "end", width: 8, english: true }));
  out.push(text(2120, 96, lang === "en" ? "CONCEPT / PROVISIONAL" : "概念建议 / 临时约束", { size: 16, fill: "#ffb6a6", anchor: "end", width: 28, english: lang === "en" }));
}

function siteBoard(lang) {
  const en = lang === "en";
  const out = [];
  header(out, en ? "From AI showcase to a human city | spatial evidence atlas" : "从 AI 展台到人的城｜空间证据图谱", en ? "The same provisional geometry is read as human arrival, staffed explanation, bounded interface and reversible exit." : "同一组临时几何，被读成普通到达、人工解释、受限接口与可逆退出。", lang);
  out.push(text(64, 174, en ? "01 / shared spatial base" : "01 / 同源空间底图", { size: 24, weight: 700, width: 30, english: en }));
  drawMap(out, 64, 196, 970, 720, overallBounds, { lang, labels: true, scenarioLabels: true, clipId: "site-map" });
  out.push(rect(64, 944, 970, 168, "#ffffff", "#cbd8e3", 14));
  out.push(text(90, 982, en ? "Reading rule" : "读图规则", { size: 23, weight: 700, width: 20, english: en }));
  out.push(text(90, 1022, en ? "Green = blue-green / screen-free retreat · amber = public-space concepts · blue/orange = human-priority design proposals · circles = scenario nodes." : "绿色＝蓝绿与无屏退避 · 金色＝公共空间概念层 · 蓝/橙＝人优先设计建议 · 圆点＝场景节点。", { size: 17, fill: "#405a73", width: 82, lineHeight: 24, english: en }));
  out.push(text(90, 1084, en ? "The map is a display transform from local GeoJSON; EPSG:4548 figures are recomputed metrics, not legal area or route length." : "地图是包内 GeoJSON 的显示转换；EPSG:4548 数值是重算指标，不是法定面积或路线长度。", { size: 16, fill: "#7f3f32", width: 84, lineHeight: 22, english: en }));

  out.push(text(1090, 174, en ? "02 / four-stage public interface" : "02 / 四段公共接口", { size: 24, weight: 700, width: 34, english: en }));
  const cardX = 1090;
  const areaW = 250;
  const stageW = 185;
  const gap = 8;
  plans.forEach((plan, rowIndex) => {
    const y = 206 + rowIndex * 242;
    const area = areaNames[plan.area_id];
    out.push(rect(cardX, y, areaW, 216, "#ffffff", areaColors[plan.area_id], 14));
    out.push(rect(cardX, y, areaW, 12, areaColors[plan.area_id], "none", 14));
    out.push(text(cardX + 18, y + 43, area[lang], { size: 24, weight: 700, fill: areaColors[plan.area_id], width: 12, english: en }));
    out.push(text(cardX + 18, y + 73, plan.area_id, { size: 14, fill: "#71859a", width: 20, english: true }));
    out.push(text(cardX + 18, y + 104, en ? "question →" : "先问 →", { size: 15, weight: 700, fill: "#405a73", width: 14, english: en }));
    const question = en ? {
      "PROV-KEY-001": "How are machine tests bounded and taken over?",
      "PROV-KEY-002": "How can people learn and exit without AI?",
      "PROV-KEY-003": "How does innovation become contestable service?"
    }[plan.area_id] : {
      "PROV-KEY-001": "机器测试怎样被限制并接管？",
      "PROV-KEY-002": "不用 AI 怎样学习并退出？",
      "PROV-KEY-003": "创新怎样成为可质疑服务？"
    }[plan.area_id];
    out.push(text(cardX + 18, y + 130, question, { size: 16, fill: "#405a73", width: 25, lineHeight: 21, english: en }));
    out.push(text(cardX + 18, y + 190, en ? "same provisional anchor" : "同源临时锚点", { size: 14, fill: "#7f3f32", width: 24, english: en }));
    plan.functional_bands.forEach((band, stageIndex) => {
      const x = cardX + areaW + 22 + stageIndex * (stageW + gap);
      out.push(rect(x, y, stageW, 216, "#ffffff", stageColors[stageIndex], 14));
      out.push(rect(x, y, stageW, 34, stageColors[stageIndex], "none", 14));
      out.push(text(x + 14, y + 23, `${String(stageIndex + 1).padStart(2, "0")} · ${en ? ["arrival", "staffed", "bounded", "exit / replay"][stageIndex] : ["到达", "人工", "受限", "退出 / 回放"][stageIndex]}`, { size: en ? 15 : 17, fill: "#ffffff", weight: 700, width: 22, english: en }));
      out.push(text(x + 14, y + 63, band[en ? "label_en" : "label_zh"], { size: en ? 17 : 19, weight: 700, fill: "#243c55", width: en ? 25 : 13, lineHeight: 23, english: en }));
      out.push(text(x + 14, y + 112, band[en ? "role_en" : "role_zh"], { size: en ? 14 : 15, fill: "#536b82", width: en ? 29 : 16, lineHeight: 20, english: en }));
      out.push(rect(x + 12, y + 174, stageW - 24, 28, "#fff4e9", "none", 7));
      out.push(text(x + 20, y + 194, en ? stateLabelsEn[band.state_zh] || "concept / bounded" : band.state_zh, { size: 14, fill: "#7f3f32", weight: 700, width: 25, english: en }));
    });
  });
  out.push(rect(1090, 944, 1050, 168, "#eef3f8", "#cbd8e3", 14));
  out.push(text(1116, 984, en ? "Evidence boundary" : "证据边界", { size: 23, weight: 700, width: 22, english: en }));
  out.push(text(1116, 1024, en ? "Every row binds existing geometry, functional bands, scenario references and stop rules. It is a concept interface, not a route, section, capacity, service result, permit, operation or official score." : "每行绑定已有 geometry、功能带、场景引用与停止规则。它是概念界面，不是路线、断面、容量、服务结果、许可、运营或官方评分。", { size: 17, fill: "#405a73", width: 108, lineHeight: 24, english: en }));
  out.push(text(1116, 1090, en ? "Recompute trigger: official geometry, rights, safety, accessibility, climate, energy, and public-baseline evidence." : "重算触发：官方几何、权属、安全、无障碍、气候、能源与公众基线资料到位。", { size: 16, fill: "#7f3f32", width: 108, lineHeight: 22, english: en }));
  out.push(text(64, 1264, en ? "official_boundary=false · geometry_role=provisional_constraint · conceptual suggestion for professional deepening" : "official_boundary=false · geometry_role=provisional_constraint · 概念建议，供专业团队深化研究", { size: 16, fill: "#c95d5d", width: 140, english: en }));
  out.push("</svg>");
  return out.join("\n");
}

function keyAreasBoard(lang) {
  const en = lang === "en";
  const out = [];
  header(out, en ? "Three focus areas | spatial anchors and scenario cards" : "三处重点区｜空间锚点与场景卡", en ? "Zooms return to the same provisional polygons; each focus area gets a visible question, node sequence, and human fallback." : "三个缩放都回到同一组临时 polygon；每个重点区都看见问题、节点序列与人工兜底。", lang);
  out.push(text(64, 174, en ? "01 / shared spatial reading" : "01 / 同源空间读法", { size: 24, weight: 700, width: 30, english: en }));
  drawMap(out, 64, 196, 900, 760, overallBounds, { lang, labels: true, scenarioLabels: true, clipId: "key-main" });
  out.push(text(64, 1000, en ? "Same GeoJSON input · focus polygons are provisional · display transform only" : "同一 GeoJSON 输入 · 重点区 polygon 为临时约束 · 仅作显示转换", { size: 16, fill: "#7f3f32", width: 100, english: en }));
  const rows = ["PROV-KEY-001", "PROV-KEY-002", "PROV-KEY-003"];
  rows.forEach((id, rowIndex) => {
    const plan = plans.find((item) => item.area_id === id);
    const y = 196 + rowIndex * 274;
    out.push(rect(1020, y, 1118, 238, "#ffffff", areaColors[id], 14));
    drawMap(out, 1040, y + 18, 350, 196, boundsFor([keyAreas.find((feature) => feature.properties.id === id)], 0.002), { lang, focus: id, scenarioLabels: true, clipId: `key-${rowIndex}` });
    out.push(text(1420, y + 42, areaNames[id][lang], { size: 24, weight: 700, fill: areaColors[id], width: 18, english: en }));
    out.push(text(1420, y + 72, id, { size: 14, fill: "#71859a", width: 24, english: true }));
    const question = en ? {
      "PROV-KEY-001": "Bound the machine test before it reaches ordinary walking.",
      "PROV-KEY-002": "Keep staffed, paper, phone, and screen-free options visible.",
      "PROV-KEY-003": "Make public data, explanation, and withdrawal legible."
    }[id] : {
      "PROV-KEY-001": "先把机器测试限制在普通步行之外。",
      "PROV-KEY-002": "人工、纸面、电话与无屏选项必须可见。",
      "PROV-KEY-003": "让公共数据、解释与撤回都可读。"
    }[id];
    out.push(text(1420, y + 110, question, { size: 17, fill: "#405a73", width: en ? 52 : 28, lineHeight: 23, english: en }));
    const bands = plan.functional_bands.map((band) => band[en ? "label_en" : "label_zh"]).join(en ? "  →  " : " → ");
    out.push(text(1420, y + 166, bands, { size: en ? 13 : 15, fill: "#536b82", width: en ? 74 : 38, lineHeight: 19, english: en }));
    out.push(text(1420, y + 212, en ? "human fallback and stop rule remain G0" : "人工兜底与停止规则保持 G0", { size: 14, fill: "#7f3f32", width: 52, english: en }));
  });
  out.push(rect(64, 1050, 2074, 142, "#eef3f8", "#cbd8e3", 14));
  out.push(text(92, 1092, en ? "What this plate adds" : "这张图补足什么", { size: 22, weight: 700, width: 24, english: en }));
  out.push(text(92, 1132, en ? "The same provisional polygons are shown at overview and focus scale; scenario nodes, green-blue buffers, public-space concepts and human fallback are read together. No line is an official redline or engineering alignment." : "同一组临时 polygon 同时以总览和重点区尺度呈现；场景节点、蓝绿缓冲、公共空间概念与人工兜底被一起阅读。任何线条都不是官方红线或工程线位。", { size: 17, fill: "#405a73", width: 116, lineHeight: 24, english: en }));
  out.push(text(92, 1198, en ? "Official geometry and field baselines trigger a full geometry / metrics / figure / HTML / PDF / self-check recalculation." : "官方 geometry 与现场基线到位后，必须完整重算 geometry / metrics / 图件 / HTML / PDF / self-check。", { size: 16, fill: "#7f3f32", width: 118, lineHeight: 22, english: en }));
  out.push(text(64, 1264, en ? "official_boundary=false · geometry_role=provisional_constraint · conceptual suggestion for professional deepening" : "official_boundary=false · geometry_role=provisional_constraint · 概念建议，供专业团队深化研究", { size: 16, fill: "#c95d5d", width: 140, english: en }));
  out.push("</svg>");
  return out.join("\n");
}

const outputs = {
  "site-overview-v17.svg": siteBoard("zh"),
  "site-overview-v17.en.svg": siteBoard("en"),
  "key-areas-v17.svg": keyAreasBoard("zh"),
  "key-areas-v17.en.svg": keyAreasBoard("en")
};
for (const [name, content] of Object.entries(outputs)) fs.writeFileSync(path.join(figureRoot, name), `${content}\n`);

const atlas = {
  schema_version: "0.1.0",
  package_iteration: "v1.7",
  status: "conceptual_spatial_evidence_atlas",
  official_boundary: false,
  geometry_role: "provisional_constraint",
  geometry_sources: ["geometry/site_boundary.geojson", "geometry/key_areas.geojson", "geometry/roads.geojson", "geometry/green_space.geojson", "geometry/public_space.geojson", "geometry/constraints.geojson"],
  plan_source: "visual/assets/ai-era-spatial-interface-plans.json",
  area_count: keyAreas.length,
  area_ids: keyAreas.map((feature) => feature.properties.id),
  action_bands_per_area: plans.map((plan) => ({ area_id: plan.area_id, count: plan.functional_bands.length, bands: plan.functional_bands.map((band) => band.band_id) })),
  scenario_node_count: scenarios.length,
  outputs: Object.keys(outputs),
  display_transform: "EPSG:4326 coordinates are projected to a diagram canvas for relative reading; metrics remain recomputed in EPSG:4548.",
  precision_note_zh: "图件只支持概念建议、空间关系复核和专业深化，不支持官方红线、工程断面、容量、路线长度、许可、运营结果或评分结论。",
  precision_note_en: "The plates support conceptual design, relational review, and professional deepening only; they do not support official redlines, engineering sections, capacity, route lengths, permits, operating results, or scores.",
  recomputation_trigger: "official geometry, rights, safety, accessibility, climate, energy, and public-baseline evidence",
  operational_status: "not_authorized_not_run",
  performance_results: null,
  not_an_official_score: true
};
fs.writeFileSync(path.join(here, "ai-era-spatial-atlas-v17.json"), `${JSON.stringify(atlas, null, 2)}\n`);
console.log(JSON.stringify({ ok: true, outputs: Object.keys(outputs), areas: keyAreas.length, scenarios: scenarios.length, action_bands: plans.map((plan) => plan.functional_bands.length) }, null, 2));
