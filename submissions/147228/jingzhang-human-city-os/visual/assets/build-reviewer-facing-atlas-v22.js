#!/usr/bin/env node
/*
 * Human City OS v2.2: reviewer-facing first-screen atlas.
 *
 * This board is deliberately built from the package's own GeoJSON and the
 * v2.1 spatial-action-room record.  It is a display transform, not a survey
 * map or an official boundary.  The compact right-hand sequence makes the
 * human equivalent, machine limit, and stop/return action visible in the
 * same first-screen asset that the advisory reviewer receives.
 */
const fs = require('fs');
const path = require('path');

const here = __dirname;
const packageRoot = path.resolve(here, '../..');
const geometryRoot = path.join(packageRoot, 'geometry');
const figureRoot = path.join(packageRoot, 'assets', 'figures');
const metrics = JSON.parse(fs.readFileSync(path.join(packageRoot, 'metrics.json'), 'utf8')).metrics;
const actionRooms = JSON.parse(fs.readFileSync(path.join(here, 'spatial-action-rooms-v21.json'), 'utf8'));

const COLORS = {
  land: ['#DDE9D9', '#E9DFC5', '#DCEAF0', '#E6DDF0', '#E8EBCB', '#DCE6EF'],
  road: { 'ROAD-A-SKILL': '#E76F51', 'ROAD-A-NIGHT': '#F2A93B', 'ROAD-B-SILICON': '#7657C8', 'ROAD-B-LOWAIR': '#3D76EA', 'ROAD-C-API': '#2A9D8F' },
  area: { 'PROV-KEY-001': '#3D76EA', 'PROV-KEY-002': '#E76F51', 'PROV-KEY-003': '#2A9D8F' },
  stage: ['#E76F51', '#2A9D8F', '#3D76EA', '#5E9C76', '#E9A93A'],
};

function readGeo(name) { return JSON.parse(fs.readFileSync(path.join(geometryRoot, name), 'utf8')); }
const site = readGeo('site_boundary.geojson');
const landUse = readGeo('land_use.geojson');
const keyAreas = readGeo('key_areas.geojson');
const roads = readGeo('roads.geojson');
const green = readGeo('green_space.geojson');
const publicSpace = readGeo('public_space.geojson');
const constraints = readGeo('constraints.geojson');

function esc(value) { return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

function allPoints(geometry, output = []) {
  if (!geometry) return output;
  if (geometry.type === 'Point') { output.push(geometry.coordinates); return output; }
  if (geometry.coordinates) {
    const walk = (value) => {
      if (Array.isArray(value) && value.length >= 2 && value.every((v) => typeof v === 'number')) output.push(value);
      else if (Array.isArray(value)) value.forEach(walk);
    };
    walk(geometry.coordinates);
  }
  return output;
}

const points = [];
[site, landUse, keyAreas, roads, green, publicSpace, constraints].forEach((fc) => fc.features.forEach((f) => allPoints(f.geometry, points)));
const xs = points.map((p) => p[0]);
const ys = points.map((p) => p[1]);
const minX = Math.min(...xs); const maxX = Math.max(...xs);
const minY = Math.min(...ys); const maxY = Math.max(...ys);

// Rotate the WGS84 display frame to a legible horizontal belt.  This is only
// a visual transform; no metric is read from pixel distance or rotation.
function project(point, box) {
  const u = (point[1] - minY) / (maxY - minY);
  const v = 1 - (point[0] - minX) / (maxX - minX);
  return [box.x + u * box.w, box.y + v * box.h];
}

function pathD(geometry, box) {
  if (!geometry) return '';
  const segment = (ring, close = false) => {
    const coords = ring.map((p) => project(p, box));
    if (!coords.length) return '';
    return `M${coords[0][0].toFixed(1)},${coords[0][1].toFixed(1)} ${coords.slice(1).map((p) => `L${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')}${close ? ' Z' : ''}`;
  };
  if (geometry.type === 'Polygon') return geometry.coordinates.map((ring, i) => segment(ring, true)).join(' ');
  if (geometry.type === 'MultiPolygon') return geometry.coordinates.flatMap((poly) => poly.map((ring) => segment(ring, true))).join(' ');
  if (geometry.type === 'LineString') return segment(geometry.coordinates, false);
  if (geometry.type === 'MultiLineString') return geometry.coordinates.map((line) => segment(line, false)).join(' ');
  return '';
}

function featureLabel(feature, english) {
  const p = feature.properties || {};
  return english ? (p.name_en || p.name || feature.id || '') : (p.name_zh || p.name || feature.id || '');
}

function shortAreaLabel(feature, english) {
  const id = feature.id || '';
  const labels = english
    ? { 'PROV-KEY-001': 'Zhongzhiyuan', 'PROV-KEY-002': 'AI Origin', 'PROV-KEY-003': 'Dazhongsi' }
    : { 'PROV-KEY-001': '众智园', 'PROV-KEY-002': '北京 AI 原点', 'PROV-KEY-003': '大钟寺' };
  return labels[id] || featureLabel(feature, english);
}

function wrap(text, max, english) {
  if (!text) return [];
  if (!english) { const chars = [...String(text)]; const rows = []; for (let i = 0; i < chars.length; i += max) rows.push(chars.slice(i, i + max).join('')); return rows; }
  const rows = []; let current = '';
  for (const word of String(text).split(/\s+/)) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > max && current) { rows.push(current); current = word; } else current = candidate;
  }
  if (current) rows.push(current);
  return rows;
}

function textLines(lines, x, y, className, lineHeight = 22, anchor = 'start') {
  return `<text x="${x}" y="${y}" class="${className}" text-anchor="${anchor}">${lines.map((line, i) => `<tspan x="${x}" dy="${i ? lineHeight : 0}">${esc(line)}</tspan>`).join('')}</text>`;
}

function mapSvg(english) {
  const box = { x: 84, y: 255, w: 1040, h: 700 };
  const lines = [];
  lines.push(`<rect x="${box.x}" y="${box.y}" width="${box.w}" height="${box.h}" rx="18" fill="#FFFFFF" stroke="#CBD7E3" stroke-width="3"/>`);
  const mapInner = { x: box.x + 28, y: box.y + 28, w: box.w - 56, h: box.h - 56 };
  lines.push(`<rect x="${mapInner.x}" y="${mapInner.y}" width="${mapInner.w}" height="${mapInner.h}" rx="12" fill="#F2F6F3"/>`);
  landUse.features.forEach((feature, index) => lines.push(`<path d="${pathD(feature.geometry, mapInner)}" fill="${COLORS.land[index % COLORS.land.length]}" fill-opacity="0.82" stroke="#FFFFFF" stroke-width="3"/>`));
  green.features.forEach((feature) => lines.push(`<path d="${pathD(feature.geometry, mapInner)}" fill="#6EAA82" fill-opacity="0.28" stroke="#5E9C76" stroke-width="3"/>`));
  publicSpace.features.forEach((feature) => lines.push(`<path d="${pathD(feature.geometry, mapInner)}" fill="#2A9D8F" fill-opacity="0.22" stroke="#2A9D8F" stroke-width="2"/>`));
  roads.features.forEach((feature) => {
    const id = feature.id || '';
    lines.push(`<path d="${pathD(feature.geometry, mapInner)}" fill="none" stroke="${COLORS.road[id] || '#7A91A8'}" stroke-width="${id === 'ROAD-A-NIGHT' ? 5 : 8}" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>`);
  });
  constraints.features.forEach((feature) => {
    if (feature.geometry.type !== 'Point') return;
    const [x, y] = project(feature.geometry.coordinates, mapInner);
    lines.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" fill="#FFFFFF" stroke="#2A9D8F" stroke-width="3"/>`);
  });
  keyAreas.features.forEach((feature) => {
    const id = feature.id || '';
    lines.push(`<path d="${pathD(feature.geometry, mapInner)}" fill="none" stroke="${COLORS.area[id] || '#173554'}" stroke-width="7" stroke-dasharray="18 10"/>`);
    const pts = allPoints(feature.geometry, []);
    const center = pts.reduce((acc, p) => [acc[0] + p[0], acc[1] + p[1]], [0, 0]).map((v) => v / Math.max(1, pts.length));
    const [cx, cy] = project(center, mapInner);
    const label = shortAreaLabel(feature, english);
    lines.push(`<rect x="${(cx - 94).toFixed(1)}" y="${(cy - 22).toFixed(1)}" width="188" height="36" rx="10" fill="#FFFFFF" fill-opacity="0.92" stroke="${COLORS.area[id] || '#173554'}" stroke-width="2"/>`);
    lines.push(`<text x="${cx.toFixed(1)}" y="${(cy + 3).toFixed(1)}" text-anchor="middle" class="maplabel">${esc(label)}</text>`);
  });
  const boundaryD = pathD(site.features[0].geometry, mapInner);
  lines.push(`<path d="${boundaryD}" fill="none" stroke="#173554" stroke-width="5" stroke-dasharray="12 8"/>`);
  lines.push(`<text x="${mapInner.x + 18}" y="${mapInner.y + 30}" class="mapnote">${esc(english ? 'DISPLAY TRANSFORM · EPSG:4548 metrics are not read from pixels' : '显示变换 · EPSG:4548 指标不从像素距离读取')}</text>`);
  const legend = english ? ['land-use bands', 'blue-green / public interface', 'concept corridors', 'provisional focus area'] : ['用地功能带', '蓝绿 / 公共接口', '概念廊道', '临时重点区'];
  const ly = box.y + box.h - 42;
  const legendItems = [
    [`<rect x="${box.x + 28}" y="${ly - 13}" width="20" height="14" fill="#DDE9D9"/>`, legend[0]],
    [`<line x1="${box.x + 220}" y1="${ly - 6}" x2="${box.x + 260}" y2="${ly - 6}" stroke="#5E9C76" stroke-width="6"/>`, legend[1]],
    [`<line x1="${box.x + 500}" y1="${ly - 6}" x2="${box.x + 540}" y2="${ly - 6}" stroke="#E76F51" stroke-width="6"/>`, legend[2]],
    [`<rect x="${box.x + 744}" y="${ly - 12}" width="34" height="12" fill="none" stroke="#3D76EA" stroke-width="4" stroke-dasharray="8 5"/>`, legend[3]],
  ];
  legendItems.forEach(([mark, label], i) => { lines.push(mark); lines.push(`<text x="${box.x + [56, 270, 550, 790][i]}" y="${ly}" class="legend">${esc(label)}</text>`); });
  return lines.join('\n');
}

function shortNode(node, english) {
  const raw = english ? node.en : node.zh;
  const pieces = raw.split(/[\/·]/).map((s) => s.trim()).filter(Boolean);
  const value = pieces.slice(0, 2).join(' / ');
  if (english) return value.length > 18 ? `${value.slice(0, 16)}…` : value;
  return value.length > 9 ? `${value.slice(0, 8)}…` : value;
}

function render(english = false) {
  const W = 2400; const H = 1500;
  const title = english ? 'Human City OS | reviewer-facing spatial evidence atlas' : '人本城市操作系统｜评审首屏空间证据图谱';
  const subtitle = english ? 'One display-transformed geometry frame + three focus areas × five human-first action stages' : '一张同源显示变换几何底图 + 三处重点区 × 五段人本空间动作';
  const stages = english ? ['ARRIVE', 'EXPLAIN', 'BOUND', 'PAUSE', 'EXIT / REPLAY'] : ['到达', '解释', '受限', '停留', '退出 / 回放'];
  const lines = [];
  lines.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`);
  lines.push('<rect width="2400" height="1500" fill="#F7F9FC"/>');
  lines.push('<style>');
  lines.push('.title{font:700 44px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#142B4A}.sub{font:22px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#60748D}.label{font:700 22px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#173554}.small{font:17px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#61748B}.maplabel{font:700 18px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#173554}.mapnote{font:16px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#61748B}.legend{font:16px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#36526E}.area{font:700 21px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#142B4A}.nodehead{font:700 17px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#FFFFFF}.body{font:16px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#1D3955}.foot{font:16px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#C95D5D}.chip{font:700 18px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#173554}</style>');
  lines.push(`<text x="84" y="70" class="title">${esc(title)}</text>`);
  lines.push(`<text x="84" y="108" class="sub">${esc(subtitle)}</text>`);
  lines.push(`<text x="2315" y="70" text-anchor="end" class="small">PACKAGE v2.2</text>`);
  lines.push(`<text x="2315" y="101" text-anchor="end" class="foot">${esc(english ? 'CONCEPT / PROVISIONAL' : '概念 / 临时约束')}</text>`);
  lines.push(`<text x="84" y="192" class="label">${esc(english ? '01 / shared geometry frame' : '01 / 同源空间底图')}</text>`);
  lines.push(`<text x="1200" y="192" class="label">${esc(english ? '02 / visible action rooms' : '02 / 可读空间动作房间')}</text>`);
  lines.push(mapSvg(english));

  const actionX = 1200; const actionY = 240; const areaW = 225; const cardW = 164; const gap = 12; const rowH = 215; const rowGap = 22;
  stages.forEach((stage, i) => {
    const x = actionX + areaW + i * (cardW + gap) + cardW / 2;
    lines.push(`<text x="${x}" y="${actionY - 16}" text-anchor="middle" class="small" fill="${COLORS.stage[i]}">${esc(stage)}</text>`);
  });
  actionRooms.areas.forEach((area, row) => {
    const y = actionY + row * (rowH + rowGap);
    const color = COLORS.area[area.area_id] || '#173554';
    lines.push(`<rect x="${actionX}" y="${y}" width="${areaW}" height="${rowH}" rx="14" fill="#FFFFFF" stroke="#CBD7E3" stroke-width="2"/>`);
    lines.push(`<rect x="${actionX}" y="${y}" width="10" height="${rowH}" rx="5" fill="${color}"/>`);
    lines.push(`<text x="${actionX + 24}" y="${y + 38}" class="area">${esc(english ? area.name_en.replace(' AI Autonomous Innovation Accelerator', '') : area.name_zh.replace(' AI 自主创新加速区', ''))}</text>`);
    lines.push(`<text x="${actionX + 24}" y="${y + 68}" class="small">${esc(area.area_id)}</text>`);
    lines.push(`<text x="${actionX + 24}" y="${y + 91}" class="small">official_boundary=false</text>`);
    const q = wrap(english ? area.question_en : area.question_zh, english ? 28 : 16, english);
    lines.push(textLines(q.slice(0, 2), actionX + 24, y + 123, 'body', 21));
    lines.push(`<text x="${actionX + 24}" y="${y + rowH - 22}" class="small">${esc(english ? 'human equivalent + stop/return' : '人工等效 + 停止 / 回退')}</text>`);
    area.nodes.forEach((node, i) => {
      const x = actionX + areaW + i * (cardW + gap);
      const colorStage = COLORS.stage[i];
      const nodeHeading = english ? ['01 · STAFF', '02 · CHOICE', '03 · BOUND', '04 · PAUSE', '05 · REPLAY'][i] : ['01 · 人工', '02 · 选择', '03 · 受限', '04 · 无屏', '05 · 回放'][i];
      lines.push(`<rect x="${x}" y="${y}" width="${cardW}" height="${rowH}" rx="12" fill="#FFFFFF" stroke="${colorStage}" stroke-width="2.5"/>`);
      lines.push(`<rect x="${x}" y="${y}" width="${cardW}" height="35" rx="12" fill="${colorStage}"/>`);
      lines.push(`<text x="${x + 10}" y="${y + 23}" class="nodehead">${esc(nodeHeading)}</text>`);
      const action = wrap(english ? node.action_en : node.action_zh, english ? 16 : 9, english).slice(0, 2);
      lines.push(textLines(action, x + 11, y + 64, 'body', 20));
      lines.push(`<text x="${x + 11}" y="${y + 112}" class="small">${esc(english ? 'HUMAN' : '人工')}</text>`);
      lines.push(textLines(wrap(english ? node.human_en : node.human_zh, english ? 16 : 9, english).slice(0, 2), x + 11, y + 134, 'small', 18));
      lines.push(`<rect x="${x + 9}" y="${y + 169}" width="${cardW - 18}" height="34" rx="8" fill="#FFF4E9"/>`);
      lines.push(`<text x="${x + 17}" y="${y + 191}" class="small">${esc(english ? 'STOP / RETURN' : '停止 / 回退')}</text>`);
    });
  });

  const chipY = 1080;
  const chips = english ? [
    ['GEOMETRY', '7 GeoJSON layers · display transform'], ['METRICS', `${Number(metrics.site_area_sqm.value / 1e6).toFixed(2)} km² provisional input · EPSG:4548`], ['HUMAN PATH', 'paper / phone / staffed appeal retained'], ['UNKNOWN', 'official boundary · rights · safety · energy · field baseline'],
  ] : [
    ['几何', '7 个 GeoJSON 图层 · 仅显示变换'], ['指标', `${Number(metrics.site_area_sqm.value / 1e6).toFixed(2)} km² 临时输入 · EPSG:4548`], ['人工路径', '纸面 / 电话 / 人工申诉保留'], ['缺口', '官方边界 · 权属 · 安全 · 能源 · 现场基线'],
  ];
  chips.forEach((chip, i) => {
    const x = 84 + i * 575;
    lines.push(`<rect x="${x}" y="${chipY}" width="545" height="116" rx="14" fill="#FFFFFF" stroke="#CBD7E3" stroke-width="2"/>`);
    lines.push(`<text x="${x + 22}" y="${chipY + 34}" class="chip">${esc(chip[0])}</text>`);
    lines.push(textLines(wrap(chip[1], english ? 48 : 30, english), x + 22, chipY + 68, 'small', 22));
  });
  lines.push(`<rect x="84" y="1240" width="2232" height="152" rx="16" fill="#EEF3F8" stroke="#CBD7E3" stroke-width="2"/>`);
  const rule = english ? 'The same reviewer-facing contract runs through every row: arrive → human explanation → bounded interface → screen-free pause → staffed exit / replay. No card is an operating result or an official redline.' : '每一行都沿用同一条评审契约：到达 → 人工解释 → 受限接口 → 无屏停留 → 人工退出 / 回放。任何卡片都不是运营结果，也不是官方红线。';
  lines.push(`<text x="112" y="1290" class="label">${esc(english ? 'Reading rule' : '阅读规则')}</text>`);
  lines.push(textLines(wrap(rule, english ? 155 : 92, english), 112, 1330, 'body', 25));
  lines.push(`<text x="84" y="1450" class="foot">${esc(english ? 'official_boundary=false · geometry_role=provisional_constraint · conceptual suggestions for professional teams to deepen' : 'official_boundary=false · geometry_role=provisional_constraint · 概念建议，供专业团队深化研究')}</text>`);
  lines.push('</svg>');
  return lines.join('\n') + '\n';
}

function evidence() {
  return {
    schema_version: '0.1.0',
    package_iteration: 'v2.2',
    status: 'reviewer_facing_spatial_evidence_atlas',
    official_boundary: false,
    geometry_role: 'provisional_constraint',
    display_transform: 'rotate-and-normalize-for-readable-belt; pixel distance is not metric evidence',
    geometry_files: ['geometry/site_boundary.geojson', 'geometry/land_use.geojson', 'geometry/key_areas.geojson', 'geometry/roads.geojson', 'geometry/green_space.geojson', 'geometry/public_space.geojson', 'geometry/constraints.geojson'],
    action_source: 'visual/assets/spatial-action-rooms-v21.json',
    areas: actionRooms.areas.map((area) => ({ area_id: area.area_id, node_count: area.nodes.length, geometry_refs: area.geometry_refs, scenario_refs: area.scenario_refs, metric_refs: area.metric_refs })),
    stages: actionRooms.stages.map((stage) => stage.id),
    metrics: { site_area_sqm: metrics.site_area_sqm.value, source: 'metrics.json#site_area_sqm', confidence: metrics.site_area_sqm.confidence },
    human_equivalent_visible: true,
    stop_return_visible: true,
    operational_status: 'not_authorized_not_run',
    performance_results: null,
    recompute_trigger: 'official geometry, rights, safety, accessibility, energy, climate, or public-baseline inputs change',
    boundary_zh: '图谱只改善首屏表达，不产生官方红线、工程断面、容量、许可或运营绩效。',
    boundary_en: 'The atlas improves first-screen expression only; it produces no official redline, engineering section, capacity, permit, or operating performance.',
  };
}

fs.writeFileSync(path.join(here, 'reviewer-facing-atlas-v22.json'), `${JSON.stringify(evidence(), null, 2)}\n`);
fs.writeFileSync(path.join(figureRoot, 'site-overview-v22.svg'), render(false));
fs.writeFileSync(path.join(figureRoot, 'site-overview-v22.en.svg'), render(true));
// The PNG names are the five-file reviewer contract.  The caller converts
// the two SVGs with the local offline renderer after this script exits.
console.log(JSON.stringify({ package_iteration: 'v2.2', areas: actionRooms.areas.length, stages: actionRooms.stages.length, core_targets: ['site-overview.png', 'site-overview.en.png'] }, null, 2));
