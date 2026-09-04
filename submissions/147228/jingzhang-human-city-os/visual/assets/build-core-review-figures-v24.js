#!/usr/bin/env node
/*
 * Human City OS v2.8 candidate: rebuild the four reviewer-core figures.
 *
 * The trusted Review Agent receives these fixed PNG paths.  This builder
 * keeps every geometry and metric value unchanged, but makes the spatial
 * choice, human fallback, machine limit, and unknown-data boundary readable
 * in the first visual packet.  All maps are display transforms; no pixel
 * distance or area is evidence.
 */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

function bundledModules() {
  return String(process.env.PATH || '')
    .split(path.delimiter)
    .map((entry) => path.resolve(entry, '..', '..', 'node', 'node_modules'))
    .find((candidate) => candidate.includes(`${path.sep}codex-runtimes${path.sep}`) && fs.existsSync(candidate));
}

function loadSharp() {
  try {
    return require('sharp');
  } catch (initialError) {
    const modules = bundledModules();
    if (!modules) throw initialError;
    const bundledNode = path.resolve(modules, '..', 'bin', 'node');
    const currentNode = fs.realpathSync(process.execPath);
    const resolvedNode = fs.existsSync(bundledNode) ? fs.realpathSync(bundledNode) : '';
    if (resolvedNode && resolvedNode !== currentNode && process.env.HUMAN_CITY_BUNDLED_NODE !== '1') {
      const result = spawnSync(resolvedNode, [__filename, ...process.argv.slice(2)], {
        stdio: 'inherit',
        env: { ...process.env, HUMAN_CITY_BUNDLED_NODE: '1' },
      });
      if (result.error) throw result.error;
      process.exit(result.status === null ? 1 : result.status);
    }
    process.env.NODE_PATH = [modules, process.env.NODE_PATH].filter(Boolean).join(path.delimiter);
    require('module').Module._initPaths();
    return require('sharp');
  }
}

const sharp = loadSharp();
const here = __dirname;
const root = path.resolve(here, '../..');
const geometryRoot = path.join(root, 'geometry');
const figureRoot = path.join(root, 'assets', 'figures');
const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const readGeo = (name) => readJson(path.join(geometryRoot, name));
const site = readGeo('site_boundary.geojson');
const landUse = readGeo('land_use.geojson');
const keyAreas = readGeo('key_areas.geojson');
const roads = readGeo('roads.geojson');
const green = readGeo('green_space.geojson');
const publicSpace = readGeo('public_space.geojson');
const constraints = readGeo('constraints.geojson');
const metricMap = readJson(path.join(root, 'metrics.json')).metrics;
const actionRooms = readJson(path.join(here, 'spatial-action-rooms-v21.json'));
const tabletopContract = readJson(path.join(here, 'human-city-public-service-tabletop-v1.json'));
const tabletopEvidence = readJson(path.join(here, 'human-city-public-service-tabletop-v1-evidence.json'));

function assertTabletopBoundary() {
  const coverage = tabletopEvidence.coverage || {};
  const claims = tabletopEvidence.claims || {};
  if (tabletopContract.status?.tabletop_state !== 'contract_check_only') throw new Error('tabletop state drift');
  if (tabletopEvidence.status !== 'PASS') throw new Error('tabletop evidence must pass before rendering');
  if (tabletopEvidence.field_state !== 'not_authorized_not_run') throw new Error('field state drift');
  if (tabletopEvidence.performance_results !== null) throw new Error('performance results must remain null');
  if (coverage.scenarios !== 4 || coverage.positive_fixtures !== 4 || coverage.negative_fixtures !== 8 || coverage.bilingual_qa !== 4) throw new Error('tabletop coverage drift');
  if (claims.real_users_contacted !== false || claims.field_authorized !== false || claims.external_systems !== false || claims.receipt_is_expected_output_only !== true) throw new Error('tabletop claim boundary drift');
}

assertTabletopBoundary();

const W = 2400;
const H = 1500;
const COLORS = {
  ink: '#142B4A', muted: '#60748D', border: '#CBD7E3', bg: '#F7F9FC', paper: '#FFFFFF',
  warning: '#C95D5D', green: '#5E9C76', teal: '#2A9D8F', orange: '#E76F51', blue: '#3D76EA', purple: '#7657C8', yellow: '#E9A93A',
  land: ['#DDE9D9', '#E9DFC5', '#DCEAF0', '#E6DDF0', '#E8EBCB', '#DCE6EF'],
};
const roadColor = {
  'ROAD-A-SKILL': COLORS.orange,
  'ROAD-A-NIGHT': COLORS.yellow,
  'ROAD-B-SILICON': COLORS.purple,
  'ROAD-B-LOWAIR': COLORS.blue,
  'ROAD-C-SPONGE': COLORS.teal,
};
const areaColor = { 'PROV-KEY-001': COLORS.blue, 'PROV-KEY-002': COLORS.orange, 'PROV-KEY-003': COLORS.teal };
const outputs = ['land-use-structure', 'key-areas', 'mobility-bluegreen', 'metrics-evidence'];

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function allPoints(geometry, out = []) {
  if (!geometry) return out;
  const walk = (value) => {
    if (Array.isArray(value) && value.length >= 2 && value.every((item) => typeof item === 'number')) out.push(value);
    else if (Array.isArray(value)) value.forEach(walk);
  };
  walk(geometry.coordinates);
  return out;
}

function extentOf(features) {
  const points = [];
  features.forEach((feature) => allPoints(feature.geometry, points));
  const xs = points.map((point) => point[0]);
  const ys = points.map((point) => point[1]);
  return { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) };
}

function expandExtent(extent, factor = 0.16) {
  const dx = Math.max(extent.maxX - extent.minX, 0.0001);
  const dy = Math.max(extent.maxY - extent.minY, 0.0001);
  return { minX: extent.minX - dx * factor, maxX: extent.maxX + dx * factor, minY: extent.minY - dy * factor, maxY: extent.maxY + dy * factor };
}

const fullExtent = extentOf([site.features[0]]);

function project(point, box, extent = fullExtent) {
  const u = (point[1] - extent.minY) / (extent.maxY - extent.minY || 1);
  const v = 1 - (point[0] - extent.minX) / (extent.maxX - extent.minX || 1);
  return [box.x + u * box.w, box.y + v * box.h];
}

function pathD(geometry, box, extent = fullExtent) {
  const segment = (ring, close = false) => {
    const points = ring.map((point) => project(point, box, extent));
    if (!points.length) return '';
    return `M${points[0][0].toFixed(1)},${points[0][1].toFixed(1)} ${points.slice(1).map((point) => `L${point[0].toFixed(1)},${point[1].toFixed(1)}`).join(' ')}${close ? ' Z' : ''}`;
  };
  if (geometry.type === 'Polygon') return geometry.coordinates.map((ring) => segment(ring, true)).join(' ');
  if (geometry.type === 'MultiPolygon') return geometry.coordinates.flatMap((polygon) => polygon.map((ring) => segment(ring, true))).join(' ');
  if (geometry.type === 'LineString') return segment(geometry.coordinates);
  if (geometry.type === 'MultiLineString') return geometry.coordinates.map((line) => segment(line)).join(' ');
  return '';
}

function wrap(value, max, english) {
  const text = String(value || '');
  if (!english) {
    const chars = [...text];
    const rows = [];
    for (let index = 0; index < chars.length; index += max) rows.push(chars.slice(index, index + max).join(''));
    return rows;
  }
  const rows = [];
  let current = '';
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > max && current) { rows.push(current); current = word; }
    else current = candidate;
  }
  if (current) rows.push(current);
  return rows;
}

function textLines(lines, x, y, className = 'body', lineHeight = 24, anchor = 'start') {
  return `<text x="${x}" y="${y}" class="${className}" text-anchor="${anchor}">${lines.map((line, index) => `<tspan x="${x}" dy="${index ? lineHeight : 0}">${esc(line)}</tspan>`).join('')}</text>`;
}

function base(title, subtitle, english, section) {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`,
    `<rect width="${W}" height="${H}" fill="${COLORS.bg}"/>`,
    '<style>',
    '.title{font:700 48px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#142B4A}.subtitle{font:22px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#60748D}.section{font:700 24px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#173554}.cardhead{font:700 22px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#173554}.body{font:18px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#27445F}.small{font:16px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#60748D}.metric{font:700 32px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#173554}.chip{font:700 17px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#173554}.foot{font:15px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#C95D5D}.mapnote{font:15px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#60748D}</style>',
    `<text x="84" y="70" class="title">${esc(title)}</text>`,
    `<text x="84" y="110" class="subtitle">${esc(subtitle)}</text>`,
    `<text x="2316" y="70" text-anchor="end" class="small">PACKAGE v2.8</text>`,
    `<text x="2316" y="101" text-anchor="end" class="foot">${esc(english ? 'CONCEPT / PROVISIONAL' : '概念 / 临时约束')}</text>`,
    `<text x="84" y="180" class="section">${esc(section)}</text>`,
  ];
}

function mapLayers(box, options = {}) {
  const extent = options.extent || fullExtent;
  const id = options.clipId || 'map-clip';
  const lines = [
    `<defs><clipPath id="${id}"><rect x="${box.x}" y="${box.y}" width="${box.w}" height="${box.h}" rx="14"/></clipPath></defs>`,
    `<rect x="${box.x}" y="${box.y}" width="${box.w}" height="${box.h}" rx="14" fill="#F1F5F2" stroke="${COLORS.border}" stroke-width="2"/>`,
    `<g clip-path="url(#${id})">`,
  ];
  landUse.features.forEach((feature, index) => lines.push(`<path d="${pathD(feature.geometry, box, extent)}" fill="${COLORS.land[index]}" fill-opacity="0.82" stroke="#FFFFFF" stroke-width="3"/>`));
  green.features.forEach((feature) => lines.push(`<path d="${pathD(feature.geometry, box, extent)}" fill="#6EAA82" fill-opacity="0.30" stroke="${COLORS.green}" stroke-width="3"/>`));
  publicSpace.features.forEach((feature) => lines.push(`<path d="${pathD(feature.geometry, box, extent)}" fill="#2A9D8F" fill-opacity="0.20" stroke="${COLORS.teal}" stroke-width="2"/>`));
  roads.features.forEach((feature) => {
    const idRoad = feature.id || feature.properties.id;
    lines.push(`<path d="${pathD(feature.geometry, box, extent)}" fill="none" stroke="${roadColor[idRoad] || '#73869A'}" stroke-width="${options.roadWidth || 8}" stroke-linecap="round" opacity="0.9"/>`);
  });
  constraints.features.filter((feature) => feature.geometry.type === 'Point').forEach((feature) => {
    const [x, y] = project(feature.geometry.coordinates, box, extent);
    lines.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="#FFFFFF" stroke="${COLORS.teal}" stroke-width="3"/>`);
  });
  keyAreas.features.forEach((feature) => {
    const idArea = feature.id || feature.properties.id;
    const active = !options.highlightArea || options.highlightArea === idArea;
    lines.push(`<path d="${pathD(feature.geometry, box, extent)}" fill="${active && options.highlightArea ? (areaColor[idArea] || COLORS.blue) : 'none'}" fill-opacity="${active && options.highlightArea ? '0.08' : '0'}" stroke="${areaColor[idArea] || COLORS.blue}" stroke-width="${active ? 6 : 3}" stroke-dasharray="14 9" opacity="${active ? 1 : 0.35}"/>`);
  });
  lines.push(`<path d="${pathD(site.features[0].geometry, box, extent)}" fill="none" stroke="${COLORS.ink}" stroke-width="4" stroke-dasharray="11 8"/>`);
  lines.push('</g>');
  lines.push(`<rect x="${box.x + 12}" y="${box.y + 12}" width="445" height="34" rx="8" fill="#FFFFFF" fill-opacity="0.9"/>`);
  lines.push(`<text x="${box.x + 24}" y="${box.y + 35}" class="mapnote">DISPLAY TRANSFORM · EPSG:4548 metrics, not pixels</text>`);
  return lines;
}

function metricValue(id) { return metricMap[id] && metricMap[id].value; }
function pct(value) { return `${(Number(value) * 100).toFixed(2)}%`; }
function km2(value) { return `${(Number(value) / 1e6).toFixed(2)} km²`; }
function km(value) { return `${(Number(value) / 1000).toFixed(3)} km`; }

function landUseFigure(english) {
  const lines = base(
    english ? 'Six spatial units | land-use choices that remain reversible' : '六个空间单元｜把用地选择与可逆边界放在同一页',
    english ? 'One shared GeoJSON partition · exact area readback · no statutory zoning, FAR, height, demolition, or approval claim' : '同一组 GeoJSON 分区 · 面积同源回读 · 不声称法定用地、容积率、高度、拆改或审批结论',
    english,
    english ? '01 / shared-edge partition and six explicit roles' : '01 / 共享边分区与六项明确空间角色',
  );
  const mapBox = { x: 84, y: 225, w: 1340, h: 830 };
  lines.push(...mapLayers(mapBox, { clipId: 'land-map', roadWidth: 6 }));
  const roleCopy = {
    'LU-H01': ['社区保留支撑 / 服务织补', 'retention support / service repair'],
    'LU-D01': ['国际服务 / 小团队共享', 'international service / small-team commons'],
    'LU-C01': ['技能再造 / 公共数据学习', 'reskilling / public-data learning'],
    'LU-B01': ['临时使用 / 不锁定永久功能', 'meanwhile use / no permanent lock-in'],
    'LU-B02': ['城市 API / 具身研发', 'city API / embodied-AI research'],
    'LU-C02': ['无屏绿地 / 气候韧性', 'screen-free green / climate resilience'],
  };
  landUse.features.forEach((feature, index) => {
    const col = index % 2; const row = Math.floor(index / 2);
    const x = 1460 + col * 425; const y = 225 + row * 268; const cardW = 405; const cardH = 244;
    const name = english ? feature.properties.name_en : feature.properties.name_zh;
    const role = roleCopy[feature.id][english ? 1 : 0];
    const area = Number(feature.properties.area_sqm_declared);
    const share = area / Number(metricValue('site_area_sqm'));
    lines.push(`<rect x="${x}" y="${y}" width="${cardW}" height="${cardH}" rx="14" fill="${COLORS.land[index]}" stroke="${COLORS.border}" stroke-width="2"/>`);
    lines.push(`<text x="${x + 20}" y="${y + 34}" class="chip">${esc(feature.id)}</text>`);
    lines.push(textLines(wrap(name, english ? 30 : 14, english).slice(0, 2), x + 20, y + 68, 'cardhead', 26));
    lines.push(`<text x="${x + 20}" y="${y + 134}" class="metric">${km2(area)} · ${pct(share)}</text>`);
    lines.push(textLines(wrap(role, english ? 34 : 18, english).slice(0, 2), x + 20, y + 174, 'body', 23));
    lines.push(`<text x="${x + 20}" y="${y + 222}" class="small">${esc(english ? 'design proposal · concept only' : '设计建议 · 概念状态')}</text>`);
  });
  const chips = english
    ? [['COVERAGE', '100.00% shared-edge partition'], ['RETENTION SUPPORT', pct(metricValue('community_retention_support_area_ratio'))], ['REVERSIBLE SPACE', pct(metricValue('reversible_space_ratio'))], ['UNKNOWN', 'statutory use · FAR · height · rights']]
    : [['覆盖', '100.00% 共享边分区'], ['社区保留支撑', pct(metricValue('community_retention_support_area_ratio'))], ['可逆留白', pct(metricValue('reversible_space_ratio'))], ['仍未知', '法定用地 · 容积率 · 高度 · 权属']];
  chips.forEach((item, index) => {
    const x = 84 + index * 575;
    lines.push(`<rect x="${x}" y="1110" width="545" height="126" rx="14" fill="#FFFFFF" stroke="${COLORS.border}" stroke-width="2"/>`);
    lines.push(`<text x="${x + 20}" y="1144" class="chip">${esc(item[0])}</text>`);
    lines.push(textLines(wrap(item[1], english ? 42 : 24, english), x + 20, 1182, 'body', 23));
  });
  const rule = english ? 'Decision rule: preserve ordinary life and reversible capacity before locking in machine-oriented programs. Official geometry and statutory controls trigger a complete recomputation.' : '取舍规则：先保留普通日常与可逆容量，再讨论机器导向功能；取得官方边界和法定控制后全量复算。';
  lines.push(`<rect x="84" y="1270" width="2232" height="120" rx="16" fill="#EEF3F8" stroke="${COLORS.border}" stroke-width="2"/>`);
  lines.push(textLines(wrap(rule, english ? 150 : 72, english), 112, 1322, 'body', 26));
  lines.push(`<text x="84" y="1450" class="foot">official_boundary=false · geometry_role=design_proposal · ${esc(english ? 'areas and shares come from bundled GeoJSON; pixels are not metric evidence' : '面积与占比来自包内 GeoJSON；像素不构成指标证据')}</text>`);
  lines.push('</svg>');
  return lines.join('\n') + '\n';
}

function keyAreasFigure(english) {
  const lines = base(
    english ? 'Three focus areas | validate one ordinary-person path first' : '三处重点区｜每区先验收一条普通人能走完的路径',
    english ? 'Provisional geometry + priority user + five-step path + synthetic contract replay + field hold' : '同源临时几何 + 优先使用者 + 五段路径 + 合成契约回放 + 现场门',
    english,
    english ? '01 / people complete the path before machines enter' : '01 / 人先走通，机器再进入',
  );
  const ordered = ['PROV-KEY-001', 'PROV-KEY-002', 'PROV-KEY-003'].map((id) => actionRooms.areas.find((area) => area.area_id === id));
  const pathCopy = {
    'PROV-KEY-001': {
      users: ['步行者、测试观察者、现场服务人员', 'pedestrians, test observers, and onsite service staff'],
      nodes: [
        ['普通步行', 'ordinary walk'], ['人工授权', 'staffed consent'], ['受限测试', 'bounded test'], ['海绵退避', 'sponge retreat'], ['事故回放', 'incident replay'],
      ],
      evidence: ['道路与无障碍走读；安全、保险、责任；人工接管与事故回放', 'road and accessibility walk-through; safety, insurance, accountability; staffed takeover and incident replay'],
      stop: ['责任、接管或回放缺一项，停在纸面与离线，不开放测试。', 'If accountability, takeover, or replay is missing, remain on paper and offline; do not open the test.'],
    },
    'PROV-KEY-002': {
      users: ['原住民、老人、低数字能力者、转岗劳动者', 'existing residents, older people, low-digital users, and workers in transition'],
      nodes: [
        ['普通到达', 'ordinary arrival'], ['人工/电话/纸面', 'staff/phone/paper'], ['共学/转岗', 'learning/job path'], ['无屏恢复', 'screen-free pause'], ['申诉/退出', 'appeal/exit'],
      ],
      evidence: ['连续通行与无障碍；人工服务目录；居民和岗位基线与知情同意', 'continuous access and accessibility; staffed service catalogue; resident and job baselines with informed consent'],
      stop: ['没有等效人工服务或可信基线，只保留普通服务，不发布保留或就业结果。', 'Without equivalent staffed service or a credible baseline, retain ordinary service and publish no retention or employment result.'],
    },
    'PROV-KEY-003': {
      users: ['小团队、首次访客、国际访客、公共服务人员', 'small teams, first-time and international visitors, and public-service staff'],
      nodes: [
        ['问题登记', 'problem intake'], ['公平申请', 'fair application'], ['版本回放', 'version replay'], ['多语人工', 'multilingual staff'], ['退出/撤回', 'exit/withdraw'],
      ],
      evidence: ['权利、知识产权与最小授权；多语准确性；投诉、撤回和独立复核', 'rights, intellectual property, and least privilege; multilingual accuracy; complaints, withdrawal, and independent review'],
      stop: ['授权、语言或个案边界不清，关闭展示，保留普通通行和人工服务。', 'If authorization, language, or case boundaries are unclear, close the display and retain ordinary movement and staffed service.'],
    },
  };
  ordered.forEach((area, column) => {
    const feature = keyAreas.features.find((item) => (item.id || item.properties.id) === area.area_id);
    const copy = pathCopy[area.area_id];
    const x = 84 + column * 756;
    const y = 215;
    const color = areaColor[area.area_id];
    lines.push(`<rect x="${x}" y="${y}" width="720" height="985" rx="18" fill="#FFFFFF" stroke="${COLORS.border}" stroke-width="2"/>`);
    lines.push(`<rect x="${x}" y="${y}" width="720" height="10" rx="5" fill="${color}"/>`);
    const mapBox = { x: x + 18, y: y + 24, w: 684, h: 250 };
    lines.push(...mapLayers(mapBox, { extent: expandExtent(extentOf([feature]), 0.62), clipId: `area-${column}`, highlightArea: area.area_id, roadWidth: 7 }));
    const name = english ? area.name_en : area.name_zh;
    const question = english ? area.question_en : area.question_zh;
    lines.push(`<text x="${x + 24}" y="${y + 316}" class="cardhead">${esc(name)}</text>`);
    lines.push(`<text x="${x + 24}" y="${y + 346}" class="small">${esc(area.area_id)} · official_boundary=false</text>`);
    lines.push(`<text x="${x + 24}" y="${y + 382}" class="chip" fill="${color}">${esc(english ? 'PRIORITY USERS' : '优先使用者')}</text>`);
    lines.push(textLines(wrap(copy.users[english ? 1 : 0], english ? 58 : 27, english).slice(0, 2), x + 24, y + 412, 'body', 23));
    lines.push(textLines(wrap(question, english ? 58 : 27, english).slice(0, 2), x + 24, y + 466, 'small', 21));
    lines.push(`<text x="${x + 24}" y="${y + 526}" class="chip">${esc(english ? 'FIRST PATH' : '首发路径')}</text>`);
    const chipW = 124;
    const chipGap = 10;
    copy.nodes.forEach((node, index) => {
      const chipX = x + 24 + index * (chipW + chipGap);
      const label = node[english ? 1 : 0];
      lines.push(`<rect x="${chipX}" y="${y + 546}" width="${chipW}" height="88" rx="10" fill="${['#FFF0EC','#EAF7F4','#EEF3FF','#EEF6F0','#FFF6E5'][index]}" stroke="${[COLORS.orange,COLORS.teal,COLORS.blue,COLORS.green,COLORS.yellow][index]}" stroke-width="2"/>`);
      lines.push(`<text x="${chipX + 10}" y="${y + 570}" class="chip">0${index + 1}</text>`);
      lines.push(textLines(wrap(label, english ? 13 : 6, english).slice(0, 2), chipX + 10, y + 596, 'small', 17));
    });
    lines.push(`<text x="${x + 24}" y="${y + 660}" class="chip">${esc(english ? 'CONCEPT GATES' : '概念推进门')}</text>`);
    const gateCopy = english
      ? [['G0', 'package replay', 'reviewable'], ['G1', 'staffed walk-through', 'not run'], ['G2', 'bounded pilot', 'not authorized']]
      : [['G0', '包内回放', '可核对'], ['G1', '人工走读', '未开展'], ['G2', '受限试点', '未授权']];
    gateCopy.forEach((gate, index) => {
      const gateX = x + 24 + index * 222;
      lines.push(`<rect x="${gateX}" y="${y + 680}" width="208" height="86" rx="10" fill="${index === 0 ? '#EAF7F4' : '#F3F5F8'}" stroke="${index === 0 ? COLORS.teal : COLORS.border}" stroke-width="2"/>`);
      lines.push(`<text x="${gateX + 12}" y="${y + 704}" class="chip">${esc(gate[0])}</text>`);
      lines.push(`<text x="${gateX + 12}" y="${y + 728}" class="small">${esc(gate[1])}</text>`);
      lines.push(`<text x="${gateX + 12}" y="${y + 752}" class="small">${esc(gate[2])}</text>`);
    });
    lines.push(`<text x="${x + 24}" y="${y + 792}" class="chip">${esc(english ? 'MINIMUM EVIDENCE BEFORE ADVANCE' : '过门最低证据')}</text>`);
    lines.push(textLines(wrap(copy.evidence[english ? 1 : 0], english ? 65 : 31, english).slice(0, 3), x + 24, y + 824, 'body', 22));
    lines.push(`<rect x="${x + 18}" y="${y + 874}" width="684" height="96" rx="12" fill="#FFF5F2" stroke="#E7B5AE" stroke-width="2"/>`);
    lines.push(`<text x="${x + 34}" y="${y + 903}" class="chip" fill="${COLORS.warning}">${esc(english ? 'STOP / RETURN' : '停止 / 回退')}</text>`);
    lines.push(textLines(wrap(copy.stop[english ? 1 : 0], english ? 78 : 35, english).slice(0, 2), x + 34, y + 933, 'small', 19));
  });
  lines.push(`<text x="84" y="1225" class="section">${esc(english ? '02 / separate package replay from field readiness' : '02 / 包内回放与现场准备度分开验收')}</text>`);
  const positive = tabletopEvidence.coverage.positive_fixtures;
  const negative = tabletopEvidence.coverage.negative_fixtures;
  const bilingual = tabletopEvidence.coverage.bilingual_qa;
  const shared = english
    ? [
      ['G0 CONTRACT PASS', `${positive}/${positive} positive · ${negative}/${negative} negatives rejected · ${bilingual}/${bilingual} bilingual`],
      ['G1 FIELD HOLD', '0 real users · unrun · unauthorized'],
      ['G2 BOUNDED PILOT HOLD', 'rights · safety · insurance · staffed takeover'],
      ['G3 INDEPENDENT REVIEW', 'field outcomes · appeal · rollback before scale'],
    ]
    : [
      ['G0 合成契约 PASS', `${positive}/${positive} 正样本 · ${negative}/${negative} 负样本拒绝 · ${bilingual}/${bilingual} 双语`],
      ['G1 现场 HOLD', '0 真实用户 · 未开展 · 未授权'],
      ['G2 受限试点 HOLD', '权属 · 安全 · 保险 · 人工接管'],
      ['G3 独立复核', '现场结果 · 申诉 · 扩展前回退'],
    ];
  shared.forEach((gate, index) => {
    const x = 84 + index * 558;
    lines.push(`<rect x="${x}" y="1248" width="530" height="108" rx="14" fill="${index === 0 ? '#EAF7F4' : '#FFFFFF'}" stroke="${index === 0 ? COLORS.teal : COLORS.border}" stroke-width="2"/>`);
    lines.push(`<text x="${x + 18}" y="1282" class="chip">${esc(gate[0])}</text>`);
    lines.push(textLines(wrap(gate[1], english ? 42 : 21, english).slice(0, 2), x + 18, 1318, 'small', 20));
  });
  const rule = english
    ? 'G0 PASS proves contract fields, spatial references, human handoff, appeal, and bilingual boundaries replay offline. performance_results=null; G1 to G3 remain unrun, unauthorized, or not reached.'
    : 'G0 PASS 只证明契约字段、空间引用、人工接管、申诉和双语边界可离线回放。performance_results=null，G1 至 G3 仍未开展、未授权或未到达。';
  lines.push(`<rect x="84" y="1370" width="2232" height="62" rx="14" fill="#EEF3F8" stroke="${COLORS.border}" stroke-width="2"/>`);
  lines.push(textLines(wrap(rule, english ? 150 : 72, english).slice(0, 2), 108, 1408, 'body', 22));
  lines.push(`<text x="84" y="1460" class="foot">official_boundary=false · geometry_role=provisional_constraint · ${esc(english ? 'each zoom uses the submitted outline; no engineering section, capacity, or implementation claim' : '每个放大框使用提交轮廓；不产生工程断面、容量或实施结论')}</text>`);
  lines.push('</svg>');
  return lines.join('\n') + '\n';
}

function mobilityFigure(english) {
  const lines = base(
    english ? 'Human–machine mobility + blue-green resilience | four bounded corridors' : '人机共行与蓝绿韧性｜四条受限概念廊道',
    english ? 'Every corridor shows its measurable geometry, human priority, machine limit, and stop/return rule' : '每条廊道同时显示可重算几何、人的优先、机器边界与停止回退',
    english,
    english ? '01 / corridor map and four operating boundaries' : '01 / 廊道关系与四组运行边界',
  );
  const mapBox = { x: 84, y: 225, w: 1320, h: 830 };
  lines.push(...mapLayers(mapBox, { clipId: 'mobility-map', roadWidth: 11 }));
  const copy = {
    'ROAD-A-SKILL': {
      human: ['连续步行 + 人工职业咨询', 'continuous walk + staffed career advice'],
      machine: ['培训人次不替代就业结果', 'training attendance is not an employment result'],
      stop: ['无带薪岗位路径 → 回退', 'no paid job pathway → return'],
    },
    'ROAD-B-SILICON': {
      human: ['行人优先 + 人工接管', 'pedestrian priority + staffed takeover'],
      machine: ['先申报时段、权限与退出', 'declare time, scope, and exit first'],
      stop: ['无安全断面或接管 → 暂停', 'no safety section or takeover → hold'],
    },
    'ROAD-B-LOWAIR': {
      human: ['地面普通路径持续保留', 'ordinary ground route remains available'],
      machine: ['空域、噪声、隐私、消防待审', 'airspace, noise, privacy, and fire review pending'],
      stop: ['无许可或保险 → 不试点', 'no permit or insurance → no pilot'],
    },
    'ROAD-C-SPONGE': {
      human: ['静态避险导视 + 人工巡检', 'static evacuation cues + manual inspection'],
      machine: ['模拟不替代水文审查', 'simulation is not hydrology review'],
      stop: ['无蓝线或校准 → 不扩展', 'no blue-line or calibration → no expansion'],
    },
  };
  const selected = ['ROAD-A-SKILL', 'ROAD-B-SILICON', 'ROAD-B-LOWAIR', 'ROAD-C-SPONGE'];
  selected.forEach((id, index) => {
    const feature = roads.features.find((item) => (item.id || item.properties.id) === id);
    const col = index % 2; const row = Math.floor(index / 2);
    const x = 1440 + col * 440; const y = 225 + row * 420; const cardW = 420; const cardH = 394;
    const color = roadColor[id]; const name = english ? feature.properties.name_en : feature.properties.name_zh;
    const exactLength = Number(feature.properties.length_m_declared);
    lines.push(`<rect x="${x}" y="${y}" width="${cardW}" height="${cardH}" rx="16" fill="#FFFFFF" stroke="${color}" stroke-width="3"/>`);
    lines.push(`<rect x="${x}" y="${y}" width="12" height="${cardH}" rx="6" fill="${color}"/>`);
    lines.push(`<text x="${x + 30}" y="${y + 38}" class="chip">${esc(id)}</text>`);
    lines.push(textLines(wrap(name, english ? 30 : 15, english).slice(0, 2), x + 30, y + 75, 'cardhead', 27));
    lines.push(`<text x="${x + 30}" y="${y + 139}" class="metric">${km(exactLength)}</text>`);
    const groups = [
      [english ? 'HUMAN PRIORITY' : '人的优先', copy[id].human[english ? 1 : 0], COLORS.green],
      [english ? 'MACHINE LIMIT' : '机器边界', copy[id].machine[english ? 1 : 0], COLORS.blue],
      [english ? 'STOP / RETURN' : '停止 / 回退', copy[id].stop[english ? 1 : 0], COLORS.warning],
    ];
    groups.forEach((group, groupIndex) => {
      const gy = y + 181 + groupIndex * 68;
      lines.push(`<text x="${x + 30}" y="${gy}" class="chip" fill="${group[2]}">${esc(group[0])}</text>`);
      lines.push(textLines(wrap(group[1], english ? 34 : 18, english).slice(0, 2), x + 30, gy + 27, 'small', 19));
    });
  });
  const chips = english
    ? [['COMMON CROSSING', 'visible state · low-speed stop · staffed takeover · replay'], ['NIGHT-SAFE SPINE', `${km(roads.features.find((item) => item.id === 'ROAD-A-NIGHT').properties.length_m_declared)} · ordinary transit fallback`], ['BOUNDARY', 'concept corridors · not approved alignments']]
    : [['共同交叉规则', '状态可见 · 低速停车 · 人工接管 · 事故回放'], ['夜间安心接驳脊', `${km(roads.features.find((item) => item.id === 'ROAD-A-NIGHT').properties.length_m_declared)} · 普通交通回退`], ['边界', '概念廊道 · 不是已批工程线位']];
  chips.forEach((item, index) => {
    const x = 84 + index * 750;
    lines.push(`<rect x="${x}" y="1100" width="720" height="140" rx="14" fill="#FFFFFF" stroke="${COLORS.border}" stroke-width="2"/>`);
    lines.push(`<text x="${x + 22}" y="1138" class="chip">${esc(item[0])}</text>`);
    lines.push(textLines(wrap(item[1], english ? 56 : 30, english).slice(0, 2), x + 22, 1178, 'body', 25));
  });
  const rule = english ? 'Release gate: no corridor advances from concept to pilot without rights, accessibility, safety, insurance, staffed takeover, and an independently replayable incident record.' : '发布门：权属、无障碍、安全、保险、人工接管和可独立回放的事故记录缺一项，廊道都不得从概念进入试点。';
  lines.push(`<rect x="84" y="1272" width="2232" height="118" rx="16" fill="#EEF3F8" stroke="${COLORS.border}" stroke-width="2"/>`);
  lines.push(textLines(wrap(rule, english ? 155 : 75, english), 112, 1324, 'body', 26));
  lines.push(`<text x="84" y="1450" class="foot">official_boundary=false · ${esc(english ? 'lengths are low-confidence design-geometry readbacks; no field performance, permit, or safety result' : '长度为低置信度设计几何回读；不构成现场绩效、许可或安全结果')}</text>`);
  lines.push('</svg>');
  return lines.join('\n') + '\n';
}

function metricsFigure(english) {
  const lines = base(
    english ? 'Metrics + evidence | known geometry and unknown outcomes stay separate' : '指标与证据｜可重算几何与未知结果分栏呈现',
    english ? 'Six readbacks from bundled geometry · six outcome gaps with explicit evidence triggers · no proxy fills an unknown' : '六项包内几何回读 · 六项结果缺口逐项列出证据触发器 · 不用代理值填补 unknown',
    english,
    english ? '01 / geometry → metric → missing evidence → release decision' : '01 / 几何 → 指标 → 缺失证据 → 发布判断',
  );
  const mapBox = { x: 84, y: 225, w: 860, h: 610 };
  lines.push(...mapLayers(mapBox, { clipId: 'metric-map', roadWidth: 7 }));
  const known = english ? [
    ['SITE AREA', km2(metricValue('site_area_sqm')), 'site_boundary.geojson · low confidence'],
    ['RETENTION SUPPORT', pct(metricValue('community_retention_support_area_ratio')), 'land_use LU-H01 · not resident retention'],
    ['REVERSIBLE SPACE', pct(metricValue('reversible_space_ratio')), 'land_use LU-B01 · not approved zoning'],
    ['GREEN SPACE', pct(metricValue('green_ratio')), `${Math.round(metricValue('green_space_area_sqm')).toLocaleString('en-US')} m² · design layer`],
    ['PUBLIC SPACE', pct(metricValue('public_space_ratio')), `${Math.round(metricValue('public_space_area_sqm')).toLocaleString('en-US')} m² · design layer`],
    ['SCENARIO NODES', String(metricValue('scenario_node_count')), 'constraints.geojson · content count'],
  ] : [
    ['场地面积', km2(metricValue('site_area_sqm')), 'site_boundary.geojson · 低置信度'],
    ['社区保留支撑', pct(metricValue('community_retention_support_area_ratio')), 'land_use LU-H01 · 不是居民保留率'],
    ['可逆留白', pct(metricValue('reversible_space_ratio')), 'land_use LU-B01 · 不是已批用地'],
    ['绿地设计层', pct(metricValue('green_ratio')), `${Math.round(metricValue('green_space_area_sqm')).toLocaleString('en-US')} m² · 设计图层`],
    ['公共空间设计层', pct(metricValue('public_space_ratio')), `${Math.round(metricValue('public_space_area_sqm')).toLocaleString('en-US')} m² · 设计图层`],
    ['场景节点', String(metricValue('scenario_node_count')), 'constraints.geojson · 内容计数'],
  ];
  known.forEach((item, index) => {
    const col = index % 2; const row = Math.floor(index / 2);
    const x = 980 + col * 665; const y = 225 + row * 202;
    lines.push(`<rect x="${x}" y="${y}" width="640" height="180" rx="14" fill="#FFFFFF" stroke="${COLORS.border}" stroke-width="2"/>`);
    lines.push(`<text x="${x + 22}" y="${y + 38}" class="chip">${esc(item[0])}</text>`);
    lines.push(`<text x="${x + 22}" y="${y + 88}" class="metric">${esc(item[1])}</text>`);
    lines.push(textLines(wrap(item[2], english ? 48 : 25, english).slice(0, 2), x + 22, y + 128, 'small', 20));
  });
  lines.push(`<text x="84" y="895" class="section">${esc(english ? '02 / unknown outcomes and minimum evidence needed' : '02 / 未知结果与最低证据')}</text>`);
  const unknown = english ? [
    ['FAR / HEIGHT', 'official boundary + statutory controls'],
    ['RESIDENT RETENTION', 'consented household baseline + longitudinal record'],
    ['SUSTAINED EMPLOYMENT', 'paid job pathway + follow-up'],
    ['MANUAL EQUIVALENCE', 'service catalogue + staffed walkthrough + logs'],
    ['PUE / GREEN POWER', 'facility metering + certificates'],
    ['RECOVERED HEAT', 'load, network, seasonal demand + metering'],
  ] : [
    ['容积率 / 高度', '官方边界 + 法定控制'],
    ['居民保留率', '知情同意的家庭基线 + 持续跟踪'],
    ['持续就业转型率', '带薪岗位路径 + 随访'],
    ['人工服务等效率', '服务目录 + 人工走读 + 日志'],
    ['PUE / 绿电占比', '设施计量 + 凭证'],
    ['余热回收量', '负荷、管网、季节需求 + 计量'],
  ];
  unknown.forEach((item, index) => {
    const col = index % 3; const row = Math.floor(index / 3);
    const x = 84 + col * 750; const y = 930 + row * 178;
    lines.push(`<rect x="${x}" y="${y}" width="720" height="154" rx="14" fill="#FFF7F5" stroke="#E7B5AE" stroke-width="2"/>`);
    lines.push(`<text x="${x + 22}" y="${y + 38}" class="chip" fill="${COLORS.warning}">${esc(item[0])} · UNKNOWN</text>`);
    lines.push(textLines(wrap(item[1], english ? 54 : 26, english).slice(0, 2), x + 22, y + 80, 'body', 23));
    lines.push(`<text x="${x + 22}" y="${y + 132}" class="small">${esc(english ? 'missing evidence blocks the claim' : '证据未到位，不发布结果')}</text>`);
  });
  lines.push(`<text x="84" y="1450" class="foot">official_boundary=false · ${esc(english ? 'known means reproducible from bundled design geometry, not official or observed; unknown values remain null' : 'known 仅表示可由包内设计几何复算，不等于官方或实测；unknown 继续为 null')}</text>`);
  lines.push('</svg>');
  return lines.join('\n') + '\n';
}

function renderFigure(name, english) {
  if (name === 'land-use-structure') return landUseFigure(english);
  if (name === 'key-areas') return keyAreasFigure(english);
  if (name === 'mobility-bluegreen') return mobilityFigure(english);
  if (name === 'metrics-evidence') return metricsFigure(english);
  throw new Error(`unknown figure: ${name}`);
}

async function build() {
  const reports = [];
  for (const name of outputs) {
    for (const english of [false, true]) {
      const suffix = english ? '.en' : '';
      const svgName = `${name}${suffix}.svg`;
      const pngName = `${name}${suffix}.png`;
      const svg = renderFigure(name, english);
      fs.writeFileSync(path.join(figureRoot, svgName), svg);
      await sharp(Buffer.from(svg)).resize(W, H).png({ compressionLevel: 9, adaptiveFiltering: false }).toFile(path.join(figureRoot, pngName));
      reports.push({ path: `assets/figures/${pngName}`, source: `assets/figures/${svgName}`, language: english ? 'en' : 'zh', width: W, height: H });
    }
  }
  const evidence = {
    schema_version: '0.1.0', package_iteration: 'v2.8-candidate', generated_by: 'visual/assets/build-core-review-figures-v24.js',
    official_boundary: false, geometry_role: 'provisional_constraint', operational_status: 'not_authorized_not_run', performance_results: null,
    inputs: ['geometry/site_boundary.geojson','geometry/land_use.geojson','geometry/key_areas.geojson','geometry/roads.geojson','geometry/green_space.geojson','geometry/public_space.geojson','geometry/constraints.geojson','metrics.json','visual/assets/spatial-action-rooms-v21.json','visual/assets/human-city-public-service-tabletop-v1.json','visual/assets/human-city-public-service-tabletop-v1-evidence.json'],
    outputs: reports,
    known_metric_ids: ['site_area_sqm','community_retention_support_area_ratio','reversible_space_ratio','green_ratio','public_space_ratio','scenario_node_count','skill_transition_corridor_length_m','silicon_right_of_way_length_m','low_altitude_concept_corridor_length_m'],
    unknown_metric_ids: ['floor_area_ratio','resident_retention_rate','sustained_employment_transition_rate','manual_service_equivalence_rate','operational_pue','green_electricity_share','recovered_heat_mwh'],
    display_rule: 'rotate-and-normalize for review legibility; no pixel distance or area is metric evidence',
    boundary_zh: '四张主图只修复评分入口的可读性，不改变几何、指标、许可、运营状态或现场结果。',
    boundary_en: 'The four core figures repair reviewer-facing legibility only; they change no geometry, metric, permit, operating status, or field result.',
  };
  fs.writeFileSync(path.join(here, 'core-review-figures-v24.json'), `${JSON.stringify(evidence, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify({ ok: true, package_iteration: 'v2.8-candidate', reports }, null, 2)}\n`);
}

async function check() {
  const evidencePath = path.join(here, 'core-review-figures-v24.json');
  const errors = [];
  if (!fs.existsSync(evidencePath)) errors.push('missing core-review-figures-v24.json');
  const evidence = fs.existsSync(evidencePath) ? readJson(evidencePath) : null;
  if (evidence && (evidence.official_boundary !== false || evidence.operational_status !== 'not_authorized_not_run' || evidence.performance_results !== null)) errors.push('evidence boundary drift');
  const reports = [];
  for (const name of outputs) {
    for (const english of [false, true]) {
      const suffix = english ? '.en' : '';
      const svgPath = path.join(figureRoot, `${name}${suffix}.svg`);
      const pngPath = path.join(figureRoot, `${name}${suffix}.png`);
      if (!fs.existsSync(svgPath)) errors.push(`missing ${path.basename(svgPath)}`);
      if (!fs.existsSync(pngPath)) { errors.push(`missing ${path.basename(pngPath)}`); continue; }
      const meta = await sharp(pngPath).metadata();
      if (meta.width !== W || meta.height !== H) errors.push(`${path.basename(pngPath)} is ${meta.width}x${meta.height}`);
      reports.push({ path: path.relative(root, pngPath), width: meta.width, height: meta.height });
    }
  }
  process.stdout.write(`${JSON.stringify({ ok: errors.length === 0, reports, errors, not_an_official_score: true }, null, 2)}\n`);
  if (errors.length) process.exit(1);
}

(process.argv.includes('--check') ? check() : build()).catch((error) => {
  console.error(error);
  process.exit(1);
});
