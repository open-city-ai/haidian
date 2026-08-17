#!/usr/bin/env node
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const zlib = require('zlib');
const { spawnSync } = require('child_process');

const HERE = __dirname;
const ROOT = path.resolve(HERE, '../..');
const FIGURES = path.join(ROOT, 'assets/figures');
const osmEnvelope = read('visual/assets/site-context-osm.json');
const osm = JSON.parse(zlib.gunzipSync(Buffer.from(osmEnvelope.payload, 'base64')).toString('utf8'));
const results = read('visual/assets/site-context-results.json');
const keyAreas = read('geometry/key_areas.geojson');
const landUse = read('geometry/land_use.geojson');

const W = 2000;
const H = 1200;
const C = {
  ink: '#101d31', muted: '#607089', paper: '#f4f7fa', white: '#ffffff',
  cyan: '#20b7b1', blue: '#2e78d7', amber: '#e9aa27', coral: '#f06b5b',
  green: '#35aa7b', paleBlue: '#dceafa', paleGreen: '#dff3ea', paleAmber: '#fff0c7',
  paleCoral: '#fde3df', line: '#cad6e5', building: '#c7ced7', road: '#94a1b2', water: '#9dd8e4',
};
const stationColors = [C.blue, C.green, C.amber];
const stationNames = {
  zh: ['众智园', 'AI原点', '大钟寺'],
  en: ['ZHONGZHI', 'AI ORIGIN', 'DAZHONGSI'],
};

function read(relative) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relative), 'utf8'));
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[char]));
}

function text(x, y, value, size, color = C.ink, weight = 400, anchor = 'start') {
  return `<text x="${x}" y="${y}" font-family="Noto Sans CJK SC, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}">${esc(value)}</text>`;
}

function lines(x, y, values, size, color = C.muted, weight = 400, gap = 1.45) {
  return values.map((value, index) => text(x, y + index * size * gap, value, size, color, weight)).join('');
}

function header(index, titleZh, titleEn, subtitleZh, subtitleEn, lang) {
  const title = lang === 'zh' ? titleZh : titleEn;
  const subtitle = lang === 'zh' ? subtitleZh : subtitleEn;
  return `<rect width="${W}" height="136" fill="${C.ink}"/>
    ${text(58, 48, `${String(index).padStart(2, '0')} / X JINGZHANG`, 18, C.cyan, 700)}
    ${text(58, 100, title, 38, C.white, 700)}
    ${text(1942, 96, subtitle, 18, '#c9d5e6', 400, 'end')}`;
}

function footer(lang) {
  const note = lang === 'zh'
    ? 'OSM 公开现状切片 © OpenStreetMap contributors · ODbL 1.0；临时重点区仅用于概念定位，不是法定红线、权属或工程测绘。'
    : 'Public OSM context © OpenStreetMap contributors · ODbL 1.0; provisional key-area boxes are not statutory boundaries, ownership or survey data.';
  return `<line x1="58" y1="1142" x2="1942" y2="1142" stroke="${C.line}"/>
    ${text(58, 1172, note, 15, C.muted)}
    ${text(1942, 1172, 'X JINGZHANG · PUBLIC CONTEXT / CONCEPT ACTION', 14, C.muted, 600, 'end')}`;
}

function extentForRing(ring, pad = 0.08) {
  const xs = ring.map((point) => point[0]);
  const ys = ring.map((point) => point[1]);
  const dx = Math.max(...xs) - Math.min(...xs);
  const dy = Math.max(...ys) - Math.min(...ys);
  return [Math.min(...xs) - dx * pad, Math.min(...ys) - dy * pad, Math.max(...xs) + dx * pad, Math.max(...ys) + dy * pad];
}

function project(point, extent, rect) {
  const [west, south, east, north] = extent;
  return [
    rect.x + ((point[0] - west) / (east - west)) * rect.w,
    rect.y + (1 - (point[1] - south) / (north - south)) * rect.h,
  ];
}

function pathData(points, extent, rect, close = false) {
  const projected = points.map((point) => project(point, extent, rect));
  return projected.map((point, index) => `${index ? 'L' : 'M'}${point[0].toFixed(1)},${point[1].toFixed(1)}`).join(' ') + (close ? ' Z' : '');
}

function intersects(feature, extent) {
  return feature.coordinates.some(([lon, lat]) => lon >= extent[0] && lon <= extent[2] && lat >= extent[1] && lat <= extent[3]);
}

function mapLayer(extent, rect, clipId, options = {}) {
  const features = osm.features.filter((feature) => intersects(feature, extent));
  const order = ['park', 'water', 'building', 'waterway', 'highway', 'railway'];
  let body = `<defs><clipPath id="${clipId}"><rect x="${rect.x}" y="${rect.y}" width="${rect.w}" height="${rect.h}" rx="4"/></clipPath></defs>`;
  body += `<g clip-path="url(#${clipId})"><rect x="${rect.x}" y="${rect.y}" width="${rect.w}" height="${rect.h}" fill="#eef2f5"/>`;
  for (const klass of order) {
    for (const feature of features.filter((item) => item.class === klass)) {
      const close = ['park', 'water', 'building'].includes(klass);
      let fill = 'none';
      let stroke = C.road;
      let width = 0.8;
      let opacity = 0.7;
      if (klass === 'park') { fill = C.paleGreen; stroke = '#9bcbb5'; opacity = 0.9; }
      if (klass === 'water') { fill = '#d7f0f4'; stroke = C.water; opacity = 1; }
      if (klass === 'building') { fill = C.building; stroke = '#b4bdc9'; opacity = options.lightBuildings ? 0.36 : 0.62; }
      if (klass === 'waterway') { stroke = C.water; width = 2.2; opacity = 0.95; }
      if (klass === 'highway') {
        const type = feature.tags.highway;
        const major = ['motorway', 'trunk', 'primary', 'secondary'].includes(type);
        const walk = ['footway', 'path', 'pedestrian', 'steps', 'cycleway'].includes(type);
        stroke = walk ? '#6ea9a3' : major ? '#73859b' : '#aeb8c5';
        width = walk ? 1.05 : major ? 2.1 : 0.8;
        opacity = walk ? 0.78 : 0.62;
      }
      if (klass === 'railway') { stroke = C.ink; width = 2.1; opacity = 0.8; }
      body += `<path d="${pathData(feature.coordinates, extent, rect, close)}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" opacity="${opacity}"/>`;
    }
  }
  body += '</g>';
  return body;
}

function ringOverlay(ring, extent, rect, color, label) {
  const center = ring.slice(0, -1).reduce((acc, point) => [acc[0] + point[0] / (ring.length - 1), acc[1] + point[1] / (ring.length - 1)], [0, 0]);
  const [cx, cy] = project(center, extent, rect);
  return `<path d="${pathData(ring, extent, rect, true)}" fill="${color}" fill-opacity="0.08" stroke="${color}" stroke-width="3" stroke-dasharray="10 7"/>
    <circle cx="${cx}" cy="${cy}" r="12" fill="${color}" stroke="white" stroke-width="4"/>
    ${text(cx + 18, cy + 7, label, 17, C.ink, 700)}`;
}

function svgWrap(content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="${C.paper}"/>${content}</svg>`;
}

function keyAreasFigure(lang) {
  const zh = lang === 'zh';
  const title = ['三站现场合同', 'THREE STATIONS AS SITE CONTRACTS'];
  const subtitle = ['真实公开底图 × 三种不可互换的城市决定', 'PUBLIC MAP CONTEXT × THREE NON-INTERCHANGEABLE DECISIONS'];
  const roles = zh ? ['TEST / 技术边界', 'RELEASE / 权利边界', 'USE / 公众边界'] : ['TEST / TECHNICAL LIMIT', 'RELEASE / RIGHTS LIMIT', 'USE / PUBLIC LIMIT'];
  const questions = zh ? ['它能否在边界内工作？', '它是否有权被有限发布？', '城市是否愿意继续使用？'] : ['Can it work inside the limit?', 'May it be released for limited use?', 'Will the city continue using it?'];
  const systems = zh ? [
    ['电子围栏 + 最小风险停车', '实体急停 + 版本事件日志'],
    ['组件清单 + 许可核对', '期限、责任人 + 公开撤回'],
    ['人工服务 + 无AI等价路径', '投诉直达 + Public Verdict'],
  ] : [
    ['geofence + minimum-risk stop', 'physical E-stop + versioned log'],
    ['component inventory + licence check', 'expiry, owner + visible withdrawal'],
    ['staffed service + non-AI equivalent', 'direct complaint + Public Verdict'],
  ];
  const fail = zh ? ['机器口袋关闭；公众院落继续', '发布界面撤下；教学协作继续', '试用口袋关闭；人工服务继续'] : ['close machine pocket; keep public court', 'withdraw release; keep learning/collaboration', 'close trial pocket; keep staffed service'];
  let body = header(3, title[0], title[1], subtitle[0], subtitle[1], lang);
  const panelW = 606;
  keyAreas.features.forEach((area, index) => {
    const x = 58 + index * 636;
    const ring = area.geometry.coordinates[0];
    const extent = extentForRing(ring, 0.14);
    const rect = { x, y: 177, w: panelW, h: 420 };
    const metric = results.key_area_metrics[index];
    body += `<rect x="${x}" y="160" width="${panelW}" height="920" rx="5" fill="${C.white}" stroke="${C.line}"/>
      <rect x="${x}" y="160" width="${panelW}" height="10" fill="${stationColors[index]}"/>`;
    body += mapLayer(extent, rect, `key-${lang}-${index}`);
    body += ringOverlay(ring, extent, rect, stationColors[index], stationNames[lang][index]);
    body += text(x + 24, 635, `${String(index + 1).padStart(2, '0')}  ${stationNames[lang][index]}`, 26, C.ink, 700);
    body += text(x + 24, 674, roles[index], 18, stationColors[index], 700);
    body += text(x + 24, 719, questions[index], 24, C.ink, 700);
    body += lines(x + 24, 765, systems[index], 17, C.muted, 400, 1.55);
    body += `<line x1="${x + 24}" y1="836" x2="${x + panelW - 24}" y2="836" stroke="${C.line}"/>`;
    const metricLabel = zh
      ? [`OSM建筑基底 ${metric.mapped_building_footprints}`, `步行/骑行线 ${Math.round(metric.mapped_walk_or_cycle_length_m / 100) / 10} km`, `路网连接点 ${metric.mapped_highway_junctions}`]
      : [`OSM footprints ${metric.mapped_building_footprints}`, `walk/cycle lines ${Math.round(metric.mapped_walk_or_cycle_length_m / 100) / 10} km`, `mapped junctions ${metric.mapped_highway_junctions}`];
    body += text(x + 24, 874, zh ? '公开现状读数' : 'PUBLIC CONTEXT READOUT', 15, C.muted, 700);
    body += metricLabel.map((item, i) => text(x + 24 + i * 184, 912, item, zh ? 15 : 13, C.ink, 600)).join('');
    body += `<rect x="${x + 24}" y="950" width="${panelW - 48}" height="88" rx="4" fill="${[C.paleBlue, C.paleGreen, C.paleAmber][index]}"/>`;
    body += text(x + 42, 980, zh ? 'FAIL 后保留' : 'AFTER FAIL', 14, stationColors[index], 700);
    body += text(x + 42, 1014, fail[index], 17, C.ink, 650);
  });
  return svgWrap(body + footer(lang));
}

function mobilityFigure(lang) {
  const zh = lang === 'zh';
  const extent = [116.332, 39.937, 116.363, 40.029];
  const rect = { x: 58, y: 170, w: 780, h: 930 };
  let body = header(4, '公众正线与三处AI侧线', 'PUBLIC MAINLINE + THREE AI SIDINGS', '真实路网背景；AI关闭时普通城市仍运行', 'REAL NETWORK CONTEXT; THE ORDINARY CITY REMAINS OPEN', lang);
  body += `<rect x="58" y="160" width="780" height="950" rx="5" fill="white" stroke="${C.line}"/>`;
  body += mapLayer(extent, rect, `mobility-${lang}`, { lightBuildings: true });
  const spine = [[116.3482, 39.944], [116.3485, 39.985], [116.349, 40.018]];
  body += `<path d="${pathData(spine, extent, rect)}" fill="none" stroke="${C.coral}" stroke-width="7" opacity="0.9"/>`;
  keyAreas.features.forEach((area, index) => {
    const ring = area.geometry.coordinates[0];
    body += ringOverlay(ring, extent, rect, stationColors[index], stationNames[lang][index]);
  });
  body += `<rect x="872" y="160" width="1070" height="950" rx="5" fill="white" stroke="${C.line}"/>`;
  body += text(914, 214, zh ? '一条连续公众主链，三个可独立关闭的技术口袋' : 'ONE CONTINUOUS PUBLIC CHAIN, THREE CLOSABLE TECH POCKETS', 26, C.ink, 700);
  const rows = zh ? [
    ['TEST', '公众路径沿外缘连续', '观察缓冲隔开机器口袋', '越界即急停，测试区独立关闭'],
    ['RELEASE', '普通教学与协作贯通', '发布、权利、撤回同场可见', '许可HOLD不关闭普通使用'],
    ['USE', '到达、休息与人工服务不断', '试用口袋不占无障碍主链', '投诉RETURN，非AI服务继续'],
  ] : [
    ['TEST', 'public path stays continuous outside', 'observation buffer separates machines', 'boundary breach closes test pocket only'],
    ['RELEASE', 'learning and collaboration stay through', 'release, rights and withdrawal co-visible', 'licence HOLD keeps ordinary use open'],
    ['USE', 'arrival, rest and staffed service continue', 'trial pocket stays off accessible main chain', 'complaint RETURN keeps non-AI service'],
  ];
  rows.forEach((row, index) => {
    const y = 270 + index * 220;
    body += `<line x1="914" y1="${y - 22}" x2="1900" y2="${y - 22}" stroke="${C.line}"/>
      <circle cx="950" cy="${y + 25}" r="28" fill="${stationColors[index]}"/>
      ${text(950, y + 33, String(index + 1), 18, C.white, 700, 'middle')}
      ${text(1000, y + 12, `${stationNames[lang][index]} · ${row[0]}`, 23, C.ink, 700)}
      ${lines(1000, y + 52, row.slice(1), 17, C.muted, 400, 1.55)}`;
  });
  body += `<rect x="914" y="915" width="986" height="138" rx="4" fill="${C.ink}"/>`;
  body += text(946, 952, zh ? '自动 PASS / FAIL 的相对拓扑规则' : 'RELATIVE TOPOLOGY RULES THAT CAN PASS / FAIL', 17, C.cyan, 700);
  body += lines(946, 990, zh ? [
    '关闭全部AI空间后，公众链仍连续；无AI服务直接接主链。',
    '任何技术区不得成为无障碍必经路；RETURN后恢复普通用途。',
  ] : [
    'With every AI zone closed, the public chain remains continuous and reaches non-AI service.',
    'No tech zone is an accessible-route dependency; RETURN restores ordinary use.',
  ], 17, C.white, 400, 1.5);
  return svgWrap(body + footer(lang));
}

function landUseFigure(lang) {
  const zh = lang === 'zh';
  const extent = [116.337, 39.937, 116.359, 40.029];
  const rect = { x: 58, y: 170, w: 760, h: 930 };
  let body = header(2, '七段双翼：把概念用地放回真实城市肌理', 'SEVEN SEGMENTS, TWO WINGS: CONCEPT USE IN REAL FABRIC', '14个决策单元，不是法定分区', '14 DECISION UNITS, NOT STATUTORY ZONING', lang);
  body += `<rect x="58" y="160" width="760" height="950" rx="5" fill="white" stroke="${C.line}"/>`;
  body += mapLayer(extent, rect, `land-${lang}`, { lightBuildings: true });
  const codeColor = { '0802': C.blue, '0804': '#5b78c9', '1401': C.green, '0701': '#83bd77', '0702': C.cyan, '05': C.amber, '0803': '#8a6dcc', '16': '#aeb6c2' };
  for (const feature of landUse.features) {
    const ring = feature.geometry.coordinates[0];
    const color = codeColor[feature.properties.land_use_code] || C.coral;
    body += `<path d="${pathData(ring, extent, rect, true)}" fill="${color}" fill-opacity="0.31" stroke="white" stroke-width="1.5"/>`;
  }
  keyAreas.features.forEach((area, index) => { body += ringOverlay(area.geometry.coordinates[0], extent, rect, stationColors[index], stationNames[lang][index]); });
  body += `<rect x="852" y="160" width="1090" height="950" rx="5" fill="white" stroke="${C.line}"/>`;
  body += text(894, 218, zh ? '从北到南：每一段都有两种责任' : 'NORTH TO SOUTH: TWO DUTIES IN EVERY SEGMENT', 25, C.ink, 700);
  const bandsZh = ['众智园', '北段', 'AI原点', '近校', '蓟门', '大钟寺', '南门户'];
  const westZh = ['模型安全与算力验证', '端侧算力与低碳设施', '开源发布与互操作', '高校成果到原型', '技术服务与合规支持', '智能终端与企业服务', '国际到达与铁路文化核证'];
  const eastZh = ['具身测试与清河复原', '小月河生态与慢行服务', '人才庭院与公共问题桌', '人才生活与公共学习', '社区问题定义与反馈', '轨道到达与城市消费', '访客服务与社区到达'];
  const westEn = ['model safety + compute validation', 'edge compute + low-carbon service', 'open release + interoperability', 'campus result to prototype', 'technical service + compliance', 'terminal trial + enterprise service', 'arrival + railway-source verification'];
  const eastEn = ['embodied test + river restoration', 'river ecology + slow mobility', 'talent court + public issue desk', 'daily life + public learning', 'community issue definition + feedback', 'rail arrival + urban consumption', 'visitor service + community arrival'];
  const bandsEn = ['ZHONGZHI', 'NORTH', 'AI ORIGIN', 'CAMPUS', 'JIMEN', 'DAZHONGSI', 'SOUTH GATE'];
  for (let index = 0; index < 7; index += 1) {
    const y = 275 + index * 102;
    body += `<line x1="894" y1="${y + 52}" x2="1900" y2="${y + 52}" stroke="${C.line}"/>
      ${text(894, y, zh ? bandsZh[index] : bandsEn[index], 18, C.coral, 700)}
      ${text(1115, y, zh ? westZh[index] : westEn[index], 16, C.blue, 600)}
      ${text(1510, y, zh ? eastZh[index] : eastEn[index], 16, C.green, 600)}`;
  }
  body += text(1115, 250, zh ? '西翼 / 能力与验证' : 'WEST / CAPABILITY + VALIDATION', 14, C.blue, 700);
  body += text(1510, 250, zh ? '东翼 / 问题与反馈' : 'EAST / QUESTIONS + FEEDBACK', 14, C.green, 700);
  body += `<rect x="894" y="1002" width="1006" height="72" rx="4" fill="${C.paleCoral}"/>`;
  body += zh
    ? text(916, 1045, '判定边界：功能与比例只在临时范围内复算；official polygon / 控规 / 权属到位后整链重建。', 16, C.coral, 650)
    : lines(916, 1032, ['Evidence limit: functions and ratios are recomputed only inside the provisional extent;', 'official polygons, zoning and ownership trigger a full rebuild.'], 14, C.coral, 650, 1.5);
  return svgWrap(body + footer(lang));
}

function metricsFigure(lang) {
  const zh = lang === 'zh';
  let body = header(10, '一页证据合同：观测、方案、验证与未知分开', 'ONE-PAGE EVIDENCE CONTRACT', '只有可追溯的东西进入下一站', 'OBSERVATION, PROPOSAL, CHECK AND UNKNOWN STAY SEPARATE', lang);
  const columns = [58, 540, 1022, 1504];
  const labels = zh ? ['公开观测', '概念方案', '仓库验证', '必须保持未知'] : ['PUBLIC OBSERVATION', 'CONCEPT PROPOSAL', 'REPOSITORY CHECK', 'MUST REMAIN UNKNOWN'];
  const colors = [C.cyan, C.blue, C.green, C.coral];
  const values = zh ? [
    ['6,266 条 OSM要素', '3处重点区现状切片', '450个建筑基底落入临时框', '时间戳随包保存'],
    ['3站 / 3张票', '12场景 / 4产业验证', '14天最小试点', '14单元 / 10缝合'],
    ['生命周期 24 / 24', '站点拓扑 29 / 29', '旗舰合同 37 / 37', 'OSM复算 5 / 5'],
    ['official polygon', '权属 / 道路红线 / 管线', '现场尺寸 / 人流 / 无障碍', '预算 / 保险 / 许可 / 主体'],
  ] : [
    ['6,266 OSM features', 'three key-area context slices', '450 mapped footprints in rough boxes', 'source timestamp shipped'],
    ['3 stations / 3 tickets', '12 scenarios / 4 industry tests', '14-day minimum pilot', '14 units / 10 stitches'],
    ['lifecycle 24 / 24', 'station topology 29 / 29', 'flagship contracts 37 / 37', 'OSM recomputation 5 / 5'],
    ['official polygons', 'ownership / redlines / utilities', 'site dimensions / flows / access', 'budget / insurance / permits / actors'],
  ];
  columns.forEach((x, index) => {
    body += `<rect x="${x}" y="170" width="438" height="540" rx="5" fill="white" stroke="${C.line}"/>
      <rect x="${x}" y="170" width="438" height="10" fill="${colors[index]}"/>
      ${text(x + 28, 230, labels[index], 18, colors[index], 700)}`;
    values[index].forEach((value, itemIndex) => {
      const y = 310 + itemIndex * 90;
      body += text(x + 28, y, value, itemIndex === 0 ? 25 : 18, itemIndex === 0 ? C.ink : C.muted, itemIndex === 0 ? 700 : 500);
      if (itemIndex < 3) body += `<line x1="${x + 28}" y1="${y + 28}" x2="${x + 410}" y2="${y + 28}" stroke="${C.line}"/>`;
    });
  });
  body += `<rect x="58" y="750" width="1884" height="330" rx="5" fill="white" stroke="${C.line}"/>`;
  body += text(90, 810, zh ? '证据怎样进入城市决定' : 'HOW EVIDENCE ENTERS A CITY DECISION', 24, C.ink, 700);
  const chain = zh ? [
    ['01', '公开现状', ['OSM切片只说明', '“地图上有什么”']],
    ['02', '概念动作', ['临时范围内提出可关闭、', '可恢复的空间关系']],
    ['03', '人工签注', ['TEST / RELEASE / USE', '各自承担不同责任']],
    ['04', '现场证据门', ['90/180日只补资料、复现、', '投诉与复原证据']],
    ['05', '继续或RETURN', ['缺一项就停止，不把仓库PASS', '写成现场批准']],
  ] : [
    ['01', 'PUBLIC CONTEXT', ['OSM slice says only', 'what is mapped']],
    ['02', 'CONCEPT ACTION', ['closable, restorable relations', 'inside the rough extent']],
    ['03', 'HUMAN SIGN-OFF', ['TEST / RELEASE / USE hold', 'different duties']],
    ['04', 'FIELD EVIDENCE GATE', ['90/180-day records, reproduction,', 'complaints and restoration']],
    ['05', 'CONTINUE OR RETURN', ['one missing item stops;', 'repository PASS is not field approval']],
  ];
  chain.forEach((item, index) => {
    const x = 90 + index * 365;
    body += `<circle cx="${x + 23}" cy="880" r="23" fill="${index === 4 ? C.coral : C.ink}"/>
      ${text(x + 23, 887, item[0], 13, C.white, 700, 'middle')}
      ${text(x + 58, 874, item[1], 16, index === 4 ? C.coral : C.ink, 700)}
      ${lines(x + 58, 910, item[2], 14, C.muted, 400, 1.45)}`;
    if (index < 4) body += `<line x1="${x + 300}" y1="880" x2="${x + 350}" y2="880" stroke="${C.cyan}" stroke-width="3"/>`;
  });
  return svgWrap(body + footer(lang));
}

function render(svg, output) {
  const temp = path.join(os.tmpdir(), `xjz-${process.pid}-${path.basename(output)}.svg`);
  fs.writeFileSync(temp, svg);
  const result = spawnSync('python3.13', ['-m', 'cairosvg', temp, '-o', output, '-s', '1'], { encoding: 'utf8' });
  fs.unlinkSync(temp);
  if (result.status !== 0) throw new Error(result.stderr || `cairosvg failed for ${output}`);
}

const jobs = [
  ['land-use-structure.png', landUseFigure('zh')],
  ['land-use-structure.en.png', landUseFigure('en')],
  ['key-areas.png', keyAreasFigure('zh')],
  ['key-areas.en.png', keyAreasFigure('en')],
  ['mobility-bluegreen.png', mobilityFigure('zh')],
  ['mobility-bluegreen.en.png', mobilityFigure('en')],
  ['metrics-evidence.png', metricsFigure('zh')],
  ['metrics-evidence.en.png', metricsFigure('en')],
];

for (const [name, svg] of jobs) {
  render(svg, path.join(FIGURES, name));
  console.log(`rendered assets/figures/${name}`);
}
