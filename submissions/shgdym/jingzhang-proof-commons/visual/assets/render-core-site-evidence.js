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
const roads = read('geometry/roads.geojson');
const contracts = read('visual/assets/three-station-flagship-contracts.json');

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

function wrapWords(value, maxChars) {
  const words = String(value).split(/\s+/);
  const output = [];
  let line = '';
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (line && next.length > maxChars) {
      output.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) output.push(line);
  return output;
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

function conceptNotice(lang, x, y, width) {
  const label = lang === 'zh'
    ? 'AI / 生成式概念图 · 非现场照片 · 非规划或实施批准'
    : 'AI / GENERATIVE CONCEPT IMAGE · NOT A SITE PHOTOGRAPH · NOT PLANNING OR IMPLEMENTATION APPROVAL';
  return `<rect x="${x}" y="${y}" width="${width}" height="34" fill="${C.ink}" fill-opacity=".94"/>
    ${text(x + 12, y + 23, label, lang === 'zh' ? 12 : 9, C.white, 700)}`;
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

function placedImage(name, x, y, w, h, clipId, align = 'xMidYMid') {
  const payload = fs.readFileSync(path.join(FIGURES, name)).toString('base64');
  return `<defs><clipPath id="${clipId}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5"/></clipPath></defs>
    <image x="${x}" y="${y}" width="${w}" height="${h}" href="data:image/png;base64,${payload}" preserveAspectRatio="${align} slice" clip-path="url(#${clipId})"/>`;
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

function drawDesignNetwork(extent, rect) {
  let body = '';
  for (const feature of roads.features) {
    const role = feature.properties.design_role;
    if (!['heritage_slow_mobility_spine', 'east_west_stitch'].includes(role)) continue;
    const color = role === 'heritage_slow_mobility_spine' ? C.cyan : C.amber;
    const width = role === 'heritage_slow_mobility_spine' ? 8 : 3;
    const dash = role === 'east_west_stitch' ? ' stroke-dasharray="10 7"' : '';
    body += `<path d="${pathData(feature.geometry.coordinates, extent, rect)}" fill="none" stroke="white" stroke-width="${width + 4}" opacity="0.86"/>`;
    body += `<path d="${pathData(feature.geometry.coordinates, extent, rect)}" fill="none" stroke="${color}" stroke-width="${width}"${dash}/>`;
  }
  return body;
}

function cityProblemFigure(lang) {
  const zh = lang === 'zh';
  const extent = [116.337, 39.937, 116.359, 40.029];
  const rect = { x: 58, y: 160, w: 1240, h: 940 };
  let body = header(1,
    '城市问题：一条纵向公共线，三类横向技术进入',
    'ONE PUBLIC LINE, THREE LATERAL AI ENTRIES',
    '先看已经存在的公共生活，再决定技术如何进入',
    'START WITH EXISTING PUBLIC LIFE, THEN DECIDE HOW TECHNOLOGY MAY ENTER', lang);
  body += `<rect x="58" y="160" width="1240" height="940" rx="5" fill="white" stroke="${C.line}"/>`;
  body += mapLayer(extent, rect, `problem-${lang}`, { lightBuildings: true });
  body += drawDesignNetwork(extent, rect);
  keyAreas.features.forEach((area, index) => {
    body += ringOverlay(area.geometry.coordinates[0], extent, rect, stationColors[index], stationNames[lang][index]);
  });
  body += `<rect x="1330" y="160" width="612" height="940" rx="5" fill="white" stroke="${C.line}"/>`;
  body += text(1366, 218, zh ? '现状 → 问题 → 空间原则' : 'EXISTING → CONFLICT → SPATIAL RULE', 24, C.ink, 700);
  const cards = zh ? [
    ['01 已经拥有', ['约9公里开放遗址走廊', '铁路记忆与日常慢行共存', '两侧是园区、校园、社区与站点']],
    ['02 真正缺少', ['AI活动需要横向进入', '试验、发布和服务可能争夺公共界面', '普通人不应为技术绕路']],
    ['03 X京张动作', ['公众正线连续', 'AI只占可关闭侧袋', '唯一交叉有人值守；失败沿侧路撤出']],
  ] : [
    ['01 ALREADY HERE', ['roughly 9 km of open heritage corridor', 'rail memory and everyday movement coexist', 'campuses, homes and stations sit on both sides']],
    ['02 MISSING RULE', ['AI activity needs lateral entry', 'tests, launches and service compete for one interface', 'ordinary users must not detour for technology']],
    ['03 X JINGZHANG MOVE', ['keep the civic main line continuous', 'AI occupies a closable pocket only', 'staff the sole crossing; failure exits sideways']],
  ];
  cards.forEach((card, index) => {
    const y = 270 + index * 248;
    const color = [C.cyan, C.coral, C.green][index];
    body += `<rect x="1366" y="${y}" width="540" height="210" rx="5" fill="${[C.paleBlue, C.paleCoral, C.paleGreen][index]}" stroke="${color}"/>`;
    body += text(1394, y + 42, card[0], 17, color, 700);
    body += lines(1394, y + 88, card[1], zh ? 17 : 15, C.ink, 600, 1.65);
  });
  body += `<rect x="1366" y="1014" width="540" height="58" rx="4" fill="${C.ink}"/>`;
  body += text(1392, 1050, zh ? '青色：既有纵向公共线　金色：概念横向缝合' : 'CYAN: PUBLIC LINE   GOLD: CONCEPT LATERAL LINKS', zh ? 14 : 12, C.white, 650);
  return svgWrap(body + footer(lang));
}

function operatingFigure(lang) {
  const zh = lang === 'zh';
  const extent = [116.337, 39.937, 116.359, 40.029];
  const rect = { x: 58, y: 160, w: 940, h: 940 };
  let body = header(2,
    '一件产品沿城市线前进，也必须在空间里折返',
    'ONE PRODUCT ADVANCES ALONG THE CITY LINE AND RETURNS IN SPACE',
    '0.8 FAIL → 0.9 LIMITED → PUBLIC RETURN → 0.10 RETEST',
    '0.8 FAIL → 0.9 LIMITED → PUBLIC RETURN → 0.10 RETEST', lang);
  body += `<rect x="58" y="160" width="940" height="940" rx="5" fill="white" stroke="${C.line}"/>`;
  body += mapLayer(extent, rect, `operating-${lang}`, { lightBuildings: true });
  body += drawDesignNetwork(extent, rect);
  const centers = keyAreas.features.map((area) => {
    const ring = area.geometry.coordinates[0].slice(0, -1);
    const center = ring.reduce((acc, point) => [acc[0] + point[0] / ring.length, acc[1] + point[1] / ring.length], [0, 0]);
    return project(center, extent, rect);
  });
  const ordered = [centers[0], centers[1], centers[2]];
  body += `<path d="M${ordered[0][0]},${ordered[0][1]} L${ordered[1][0]},${ordered[1][1]} L${ordered[2][0]},${ordered[2][1]}" fill="none" stroke="white" stroke-width="16" opacity="0.9"/>`;
  body += `<path d="M${ordered[0][0]},${ordered[0][1]} L${ordered[1][0]},${ordered[1][1]} L${ordered[2][0]},${ordered[2][1]}" fill="none" stroke="${C.ink}" stroke-width="8" marker-end="url(#arrow-dark)"/>`;
  body += `<defs><marker id="arrow-dark" markerWidth="12" markerHeight="12" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="${C.ink}"/></marker><marker id="arrow-return" markerWidth="12" markerHeight="12" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="${C.coral}"/></marker></defs>`;
  body += `<path d="M${ordered[2][0] + 45},${ordered[2][1]} C${ordered[2][0] + 180},${ordered[2][1] - 40} ${ordered[0][0] + 180},${ordered[0][1] + 40} ${ordered[0][0] + 45},${ordered[0][1]}" fill="none" stroke="white" stroke-width="14" opacity="0.9"/>`;
  body += `<path d="M${ordered[2][0] + 45},${ordered[2][1]} C${ordered[2][0] + 180},${ordered[2][1] - 40} ${ordered[0][0] + 180},${ordered[0][1] + 40} ${ordered[0][0] + 45},${ordered[0][1]}" fill="none" stroke="${C.coral}" stroke-width="7" marker-end="url(#arrow-return)"/>`;
  centers.forEach((point, index) => {
    body += `<circle cx="${point[0]}" cy="${point[1]}" r="19" fill="${stationColors[index]}" stroke="white" stroke-width="6"/>`;
  });
  body += `<rect x="1030" y="160" width="912" height="940" rx="5" fill="white" stroke="${C.line}"/>`;
  const stages = zh ? [
    ['01 众智园', '0.8 / FAIL', ['意外穿越触发急停', '机器从测试侧袋撤出', '公众路径不改线']],
    ['02 AI原点', '0.9 / LIMITED', ['复测版本公开方法与许可', '责任人与撤回同场可见', '仅允许有限进入下一段']],
    ['03 大钟寺', 'PUBLIC / RETURN', ['周阿姨线下提出异议', '试用侧袋关闭，人工服务继续', '新工况随0.10返回众智园']],
  ] : [
    ['01 ZHONGZHI', '0.8 / FAIL', ['unexpected crossing triggers human stop', 'device leaves through test pocket', 'public path does not move']],
    ['02 AI ORIGIN', '0.9 / LIMITED', ['retested version exposes method and licence', 'owner and withdrawal share one interface', 'limited entry to the next section only']],
    ['03 DAZHONGSI', 'PUBLIC / RETURN', ['Ms Zhou objects offline', 'trial pocket closes; staffed service stays', 'new fixture returns with version 0.10']],
  ];
  stages.forEach((stage, index) => {
    const y = 208 + index * 260;
    const color = stationColors[index];
    body += `<rect x="1068" y="${y}" width="836" height="222" rx="5" fill="${[C.paleBlue, C.paleGreen, C.paleAmber][index]}" stroke="${color}"/>`;
    body += text(1098, y + 42, stage[0], 18, color, 700);
    body += text(1868, y + 42, stage[1], 16, index === 2 ? C.coral : C.ink, 700, 'end');
    body += lines(1098, y + 92, stage[2], zh ? 17 : 15, C.ink, 600, 1.62);
  });
  body += `<rect x="1068" y="994" width="836" height="78" rx="4" fill="${C.ink}"/>`;
  body += text(1094, 1025, zh ? '折返不是后台状态：断能 → 撤出 → 恢复普通用途 → 带新问题返回' : 'RETURN IS PHYSICAL: ISOLATE → REMOVE → RESTORE ORDINARY USE → RETEST', zh ? 15 : 13, C.white, 650);
  return svgWrap(body + footer(lang));
}

function stationSpatialFigure(lang) {
  const zh = lang === 'zh';
  let body = header(5,
    '三站相对平面：同一原则，三种不可互换的空间',
    'THREE STATIONS, THREE SPATIAL RELATIONS',
    '公开地图语境 + 相对关系；不虚构工程尺寸',
    'PUBLIC MAP CONTEXT + RELATIVE RELATIONS; NO INVENTED FIELD DIMENSIONS', lang);
  body += `<defs><marker id="arrow-return" markerWidth="12" markerHeight="12" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="${C.coral}"/></marker></defs>`;
  const titles = zh ? ['众智园｜研发与河岸', 'AI原点｜校园与社区', '大钟寺｜轨道与商业'] : ['ZHONGZHI | RESEARCH + RIVER', 'AI ORIGIN | CAMPUS + COMMUNITY', 'DAZHONGSI | TRANSIT + COMMERCE'];
  const labels = zh ? [
    ['连续公众路径', '观察缓冲', '测试侧袋', '值守 + 急停', '后勤撤出'],
    ['贯通公共首层', '开放实验室', '发布台 + 公众阶梯', '责任 + 撤回', '协作庭院'],
    ['轨道到达主链', '人工等价服务', '投诉节点', '有限试用侧袋', '设备退出'],
  ] : [
    ['continuous civic path', 'observation buffer', 'test pocket', 'staff + physical stop', 'service exit'],
    ['public ground floor', 'open lab', 'release table + steps', 'owner + withdrawal', 'collaboration court'],
    ['transit arrival chain', 'staffed equivalent', 'complaint point', 'limited trial pocket', 'equipment exit'],
  ];
  const after = zh ? ['机器撤出，院落与绿地恢复', '产品撤下，学习协作继续', '试用关闭，交通、商业与人工服务继续'] : ['device leaves; court and green recover', 'product leaves; learning and collaboration stay', 'trial closes; transit, commerce and staff stay'];
  keyAreas.features.forEach((area, index) => {
    const x = 58 + index * 636;
    const ring = area.geometry.coordinates[0];
    const mapRect = { x: x + 20, y: 212, w: 566, h: 300 };
    const extent = extentForRing(ring, 0.14);
    const color = stationColors[index];
    body += `<rect x="${x}" y="160" width="606" height="930" rx="5" fill="white" stroke="${C.line}"/><rect x="${x}" y="160" width="606" height="10" fill="${color}"/>`;
    body += text(x + 24, 202, titles[index], 20, C.ink, 700);
    body += mapLayer(extent, mapRect, `atlas-${lang}-${index}`, { lightBuildings: true });
    body += ringOverlay(ring, extent, mapRect, color, stationNames[lang][index]);
    const y = 620;
    body += text(x + 24, 558, zh ? '相对平面关系' : 'RELATIVE PLAN', 14, color, 700);
    body += `<line x1="${x + 42}" y1="${y}" x2="${x + 564}" y2="${y}" stroke="${C.cyan}" stroke-width="11"/>`;
    if (index === 0) {
      body += `<rect x="${x + 208}" y="${y - 170}" width="210" height="112" rx="5" fill="${C.paleBlue}" stroke="${color}" stroke-width="3"/><rect x="${x + 182}" y="${y - 44}" width="262" height="20" fill="${C.paleGreen}"/><line x1="${x + 313}" y1="${y - 58}" x2="${x + 313}" y2="${y}" stroke="${C.coral}" stroke-width="7"/><path d="M${x+418},${y-115} L${x+540},${y-180}" stroke="${C.coral}" stroke-width="4" marker-end="url(#arrow-return)"/>`;
    } else if (index === 1) {
      body += `<rect x="${x + 80}" y="${y - 174}" width="150" height="108" fill="${C.paleBlue}" stroke="${color}"/><rect x="${x + 238}" y="${y - 174}" width="150" height="108" fill="${C.paleAmber}" stroke="${color}"/><rect x="${x + 396}" y="${y - 174}" width="130" height="108" fill="${C.paleCoral}" stroke="${color}"/><rect x="${x + 128}" y="${y + 36}" width="350" height="74" rx="36" fill="${C.paleGreen}" stroke="${color}"/>`;
    } else {
      body += `<line x1="${x + 304}" y1="${y - 190}" x2="${x + 304}" y2="${y + 115}" stroke="${C.blue}" stroke-width="9"/><rect x="${x + 62}" y="${y - 168}" width="170" height="92" fill="${C.paleGreen}" stroke="${color}"/><circle cx="${x + 414}" cy="${y - 120}" r="72" fill="${C.paleAmber}" stroke="${color}" stroke-width="3"/><circle cx="${x + 304}" cy="${y}" r="15" fill="${C.coral}" stroke="white" stroke-width="4"/><path d="M${x+486},${y-120} L${x+560},${y-120}" stroke="${C.coral}" stroke-width="4" marker-end="url(#arrow-return)"/>`;
    }
    labels[index].forEach((label, itemIndex) => {
      const ly = 780 + itemIndex * 38;
      body += `<circle cx="${x + 34}" cy="${ly - 5}" r="5" fill="${itemIndex === 0 ? C.cyan : color}"/>${text(x + 50, ly, label, zh ? 14 : 12, C.ink, 600)}`;
    });
    body += `<rect x="${x + 24}" y="990" width="558" height="62" rx="4" fill="${[C.paleBlue, C.paleGreen, C.paleAmber][index]}"/>`;
    body += text(x + 44, 1028, zh ? `设备退出后：${after[index]}` : `AFTER EXIT: ${after[index]}`, zh ? 14 : 12, C.ink, 650);
  });
  return svgWrap(body + footer(lang));
}

function mobilityFigure(lang) {
  const zh = lang === 'zh';
  const extent = [116.332, 39.937, 116.363, 40.029];
  const rect = { x: 58, y: 170, w: 780, h: 930 };
  let body = header(4, '有限试用 / 折返 / 普通使用', 'LIMITED TRIAL / RETURN / ORDINARY USE', '技术状态可变，公众正线、无障碍与人工服务不断', 'TECH STATE CHANGES; CIVIC MOVEMENT, ACCESS AND STAFFED SERVICE CONTINUE', lang);
  body += `<rect x="58" y="160" width="780" height="950" rx="5" fill="white" stroke="${C.line}"/>`;
  body += mapLayer(extent, rect, `mobility-${lang}`, { lightBuildings: true });
  const spine = [[116.3482, 39.944], [116.3485, 39.985], [116.349, 40.018]];
  body += `<path d="${pathData(spine, extent, rect)}" fill="none" stroke="${C.coral}" stroke-width="7" opacity="0.9"/>`;
  keyAreas.features.forEach((area, index) => {
    const ring = area.geometry.coordinates[0];
    body += ringOverlay(ring, extent, rect, stationColors[index], stationNames[lang][index]);
  });
  body += `<rect x="872" y="160" width="1070" height="950" rx="5" fill="white" stroke="${C.line}"/>`;
  body += text(914, 214, zh ? '城市连续性不是备用方案，而是空间骨架' : 'CIVIC CONTINUITY IS THE SPATIAL FRAME, NOT A BACKUP', 25, C.ink, 700);
  const stateHeads = zh ? ['有限试用', 'RETURN / 撤出恢复', '普通使用'] : ['LIMITED TRIAL', 'RETURN / WITHDRAW', 'ORDINARY USE'];
  const stateNotes = zh ? [
    ['AI只占侧袋', '有人值守和物理停止', '公众正线保持优先'],
    ['设备沿撤出路径离场', '围界和发布界面撤下', '投诉进入新复测任务'],
    ['步行与无障碍不断', '人工服务和商业继续', '遗产解释无需模型'],
  ] : [
    ['AI occupies a siding only', 'staffed and physically stoppable', 'civic main line keeps priority'],
    ['equipment leaves by exit route', 'edge and release front withdraw', 'complaint becomes a retest task'],
    ['walking and access continue', 'staffed service and commerce stay', 'heritage works without a model'],
  ];
  stateHeads.forEach((head, index) => {
    const x = 914 + index * 328;
    const color = [C.blue, C.coral, C.green][index];
    body += `<rect x="${x}" y="270" width="302" height="360" rx="5" fill="${C.white}" stroke="${color}" stroke-width="3"/>
      <rect x="${x}" y="270" width="302" height="10" fill="${color}"/>
      ${text(x + 22, 326, head, 18, color, 700)}`;
    // Main line remains continuous in every state; only the siding changes.
    body += `<line x1="${x + 25}" y1="405" x2="${x + 277}" y2="405" stroke="${C.ink}" stroke-width="9"/>
      <line x1="${x + 25}" y1="405" x2="${x + 277}" y2="405" stroke="${C.cyan}" stroke-width="3"/>`;
    if (index === 0) body += `<path d="M${x+75},405 L${x+115},350 L${x+215},350 L${x+255},405" fill="none" stroke="${C.blue}" stroke-width="7"/>`;
    if (index === 1) body += `<path d="M${x+75},405 L${x+115},350 L${x+180},350" fill="none" stroke="${C.coral}" stroke-width="7" stroke-dasharray="9 7"/><path d="M${x+180},350 L${x+145},330 L${x+145},370 Z" fill="${C.coral}"/>`;
    if (index === 2) body += `<path d="M${x+75},405 L${x+105},375" fill="none" stroke="${C.line}" stroke-width="7" stroke-dasharray="8 8"/>`;
    body += lines(x + 22, 480, stateNotes[index], 15, C.muted, 500, 1.65);
  });
  const continuity = zh ? [
    ['普通步行', '连续'], ['无障碍主链', '连续'], ['人工服务', '连续'], ['商业与休息', '连续'], ['铁路遗产解释', '连续'],
  ] : [
    ['ordinary walking', 'continuous'], ['accessible main line', 'continuous'], ['staffed service', 'continuous'], ['commerce + rest', 'continuous'], ['railway interpretation', 'continuous'],
  ];
  body += text(914, 694, zh ? '五项不断线验收' : 'FIVE CONTINUITY ACCEPTANCE ITEMS', 20, C.ink, 700);
  continuity.forEach((item, index) => {
    const y = 740 + index * 58;
    body += `<circle cx="932" cy="${y-6}" r="8" fill="${C.green}"/>${text(954, y, item[0], 16, C.ink, 600)}${text(1880, y, item[1], 15, C.green, 700, 'end')}`;
  });
  body += `<rect x="914" y="1040" width="986" height="42" rx="4" fill="${C.ink}"/>${text(938, 1068, zh ? '关闭技术功能，只改变侧线状态；任何AI空间都不得成为公众必经路。' : 'CLOSING TECH CHANGES THE SIDING ONLY; NO AI SPACE MAY BECOME A REQUIRED CIVIC ROUTE.', 14, C.white, 650)}`;
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
    ['3站 / 3张票', '12场景 / 4产业验证', '14日运行 / 90日准备评估', '14单元 / 10缝合'],
    ['生命周期 24 / 24', '站点拓扑 29 / 29', '旗舰合同 37 / 37', 'OSM复算 5 / 5'],
    ['official polygon', '权属 / 道路红线 / 管线', '现场尺寸 / 人流 / 无障碍', '预算 / 保险 / 许可 / 主体'],
  ] : [
    ['6,266 OSM features', 'three key-area context slices', '450 mapped footprints in rough boxes', 'source timestamp shipped'],
    ['3 stations / 3 tickets', '12 scenarios / 4 industry tests', '14-day operation / 90-day readiness review', '14 units / 10 stitches'],
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

function pilotFigure(lang) {
  const zh = lang === 'zh';
  let body = header(5, '90日准备与评估窗口：现场运行仅D1—D14', '90-DAY READINESS + REVIEW: FIELD OPERATION IS D1-D14', '准备、运行、评估三种时间口径唯一且不互换', 'READINESS, OPERATION AND REVIEW ARE DISTINCT', lang);
  const pilots = zh ? [
    ['众智园 / TEST', '准备门', '运营、许可、保险、安全、数据、无障碍、复原资金全部有责任人', '可拆边界 / 急停 / 观察 / 撤出路径', 'D1—D14：封闭测试、独立复测、问题共同修改', '越界、急停失效或公众主链冲突', '普通院落 / 公开工况 / 失败记录'],
    ['AI原点 / RELEASE', '准备门', '运营、场地、权利复核、数据控制与撤回责任全部签注', '原型长桌 / 权利说明 / 人工撤回 / 旁观阶梯', 'D1—D14：方法复现、许可核对、有限开放', '许可HOLD、版本错配或无人撤回', '公共长桌 / 教学 / 开放方法档案'],
    ['大钟寺 / USE', '准备门', '运营、场地、保险、安全、人工服务、无障碍与复原责任全部落实', '人工窗口 / 无障碍主链 / 投诉点 / 设备退出', 'D1—D14：有限使用、匿名异议、人工等价服务', '人工缺席、无障碍受阻或重大异议未闭合', '人工窗口 / 座椅 / 普通商业与休息'],
  ] : [
    ['ZHONGZHI / TEST', 'READINESS GATE', 'OPERATOR, PERMIT, INSURANCE, SAFETY, DATA, ACCESS AND RESTORATION OWNERS NAMED', 'REMOVABLE EDGE / E-STOP / VIEWING / EXIT ROUTE', 'D1-D14: CLOSED TEST, INDEPENDENT RETEST, CO-DEVELOP CONDITIONS', 'BOUNDARY BREACH, STOP FAILURE OR CIVIC-LINE CONFLICT', 'ORDINARY COURT / OPEN CONDITIONS / FAILURE RECORD'],
    ['AI ORIGIN / RELEASE', 'READINESS GATE', 'OPERATOR, SITE, RIGHTS, DATA CONTROL AND WITHDRAWAL DUTIES SIGNED', 'PROTOTYPE TABLE / RIGHTS NOTICE / STAFFED WITHDRAWAL / STEPS', 'D1-D14: REPRODUCTION, LICENCE REVIEW, LIMITED OPENING', 'LICENCE HOLD, VERSION MISMATCH OR NO WITHDRAWAL OWNER', 'PUBLIC TABLE / LEARNING / OPEN METHOD ARCHIVE'],
    ['DAZHONGSI / USE', 'READINESS GATE', 'OPERATOR, SITE, INSURANCE, SAFETY, STAFFED SERVICE, ACCESS AND RESTORATION READY', 'STAFFED WINDOW / ACCESSIBLE CHAIN / COMPLAINT / DEVICE EXIT', 'D1-D14: LIMITED USE, ANONYMOUS OBJECTION, NON-AI EQUIVALENCE', 'ABSENT STAFF, ACCESS BLOCK OR UNRESOLVED MAJOR OBJECTION', 'STAFFED WINDOW / SEATING / ORDINARY COMMERCE + REST'],
  ];
  const phaseLabels = zh ? ['W01–30 准备', 'W31–44 运行', 'W45–75 评估', 'W76–90 复原决定'] : ['W01–30 READY', 'W31–44 OPERATE', 'W45–75 REVIEW', 'W76–90 RESTORE'];
  pilots.forEach((pilot, index) => {
    const x = 58 + index * 636;
    const color = stationColors[index];
    body += `<rect x="${x}" y="160" width="606" height="930" rx="5" fill="white" stroke="${C.line}"/><rect x="${x}" y="160" width="606" height="10" fill="${color}"/>
      ${text(x+26, 218, pilot[0], 24, C.ink, 700)}${text(x+26, 270, pilot[1], 20, color, 700)}${lines(x+26, 304, zh ? [pilot[2].slice(0, 31), pilot[2].slice(31)] : wrapWords(pilot[2], 54), zh ? 12 : 9, C.muted, 700, 1.4)}`;
    phaseLabels.forEach((phase, phaseIndex) => {
      const px = x + 26 + phaseIndex * 139;
      body += `<rect x="${px}" y="350" width="128" height="58" rx="5" fill="${phaseIndex === 3 ? C.paleCoral : [C.paleBlue,C.paleGreen,C.paleAmber][index]}" stroke="${phaseIndex === 3 ? C.coral : color}"/>${text(px+64, 384, phase, zh ? 13 : 11, phaseIndex === 3 ? C.coral : C.ink, 700, 'middle')}`;
    });
    const rows = zh ? [['空间动作',pilot[3]],['14日运行班次',pilot[4]],['立即停止',pilot[5]]] : [['SPATIAL ACTION',pilot[3]],['14-DAY OPERATING SHIFT',pilot[4]],['STOP NOW',pilot[5]]];
    rows.forEach((row, rowIndex) => {
      const y = 472 + rowIndex * 150;
      body += text(x+26, y, row[0], 13, C.muted, 700) + lines(x+26, y+38, [row[1]], zh ? 16 : 13, C.ink, 600, 1.5) + `<line x1="${x+26}" y1="${y+104}" x2="${x+580}" y2="${y+104}" stroke="${C.line}"/>`;
    });
    body += `<rect x="${x+26}" y="920" width="554" height="126" rx="5" fill="${C.paleGreen}" stroke="${C.green}"/>${text(x+48, 957, zh ? '窗口结束后的普通状态' : 'ORDINARY STATE AFTER THE WINDOW', 14, C.green, 700)}${lines(x+48, 992, zh ? [pilot[6]] : wrapWords(pilot[6], 52), zh ? 16 : 12, C.ink, 650, 1.5)}`;
  });
  body += text(58, 1128, zh ? '时间定义：90日是准备与评估窗口；其中只有W31—44（D1—D14）为受控运行。180日仅是获批后的可选复核节点，不是运行时长。' : 'TIME MODEL: 90 DAYS IS A READINESS + REVIEW WINDOW; ONLY W31-44 (D1-D14) IS CONTROLLED OPERATION. DAY 180 IS AN OPTIONAL FOLLOW-UP REVIEW, NOT OPERATION DURATION.', zh ? 13 : 10, C.muted, 500);
  return svgWrap(body + footer(lang));
}

function innovationLineFigure(lang) {
  const zh = lang === 'zh';
  const extent = [116.337, 39.937, 116.359, 40.029];
  const rect = { x: 58, y: 160, w: 1192, h: 930 };
  let body = header(1,
    '九公里城市，就是九公里AI研发环境',
    'THE CITY IS THE AI DEVELOPMENT ENVIRONMENT',
    '六类城市知识接口 × 三处深度共同开发场',
    'SIX URBAN KNOWLEDGE INTERFACES × THREE CO-DEVELOPMENT GROUNDS', lang);
  body += `<rect x="58" y="160" width="1192" height="930" rx="5" fill="white" stroke="${C.line}"/>`;
  body += mapLayer(extent, rect, `innovation-${lang}`, { lightBuildings: true });
  body += drawDesignNetwork(extent, rect);
  const interfaces = zh ? [
    ['社区 X', '照护与日常服务', C.coral], ['校园 X', '研究方法与人才', C.blue],
    ['轨道 X', '高频出行工况', C.amber], ['生态 X', '河岸与气候知识', C.green],
    ['产业 X', '工程制造与维护', C.cyan], ['文化 X', '工程史与公众记忆', C.ink],
  ] : [
    ['COMMUNITY X', 'CARE + DAILY SERVICE', C.coral], ['CAMPUS X', 'RESEARCH + TALENT', C.blue],
    ['TRANSIT X', 'MOBILITY CONDITIONS', C.amber], ['ECOLOGY X', 'RIVER + CLIMATE', C.green],
    ['INDUSTRY X', 'ENGINEERING + REPAIR', C.cyan], ['CULTURE X', 'MEMORY + INTERPRETATION', C.ink],
  ];
  const ys = [270, 405, 540, 675, 810, 945];
  interfaces.forEach((item, index) => {
    const fromLeft = index % 2 === 0;
    const x1 = fromLeft ? rect.x + 34 : rect.x + rect.w - 34;
    const x2 = fromLeft ? rect.x + rect.w * .64 : rect.x + rect.w * .36;
    const labelX = fromLeft ? rect.x + 20 : rect.x + rect.w - 244;
    body += `<line x1="${x1}" y1="${ys[index]}" x2="${x2}" y2="${ys[index]}" stroke="white" stroke-width="12" opacity=".92"/>
      <line x1="${x1}" y1="${ys[index]}" x2="${x2}" y2="${ys[index]}" stroke="${item[2]}" stroke-width="5" stroke-dasharray="12 8"/>
      <rect x="${labelX}" y="${ys[index]-32}" width="224" height="64" rx="4" fill="white" stroke="${item[2]}" stroke-width="2"/>
      ${text(labelX+14, ys[index]-6, item[0], zh ? 16 : 13, item[2], 700)}
      ${text(labelX+14, ys[index]+18, item[1], zh ? 13 : 10, C.ink, 500)}`;
  });
  const centers = keyAreas.features.map((area) => {
    const ring = area.geometry.coordinates[0].slice(0, -1);
    const center = ring.reduce((acc, point) => [acc[0] + point[0] / ring.length, acc[1] + point[1] / ring.length], [0, 0]);
    return project(center, extent, rect);
  });
  const stationRole = zh ? ['把公众知识变成工程材料', '让任何团队都能接着做', '让日常生活继续改产品'] : ['TURN PUBLIC KNOWLEDGE INTO ENGINEERING', 'LET ANY TEAM CONTINUE THE WORK', 'LET DAILY LIFE KEEP CHANGING IT'];
  centers.forEach((point, index) => {
    const cardW = zh ? 270 : 310;
    const cardX = index === 2 ? point[0] - cardW - 34 : point[0] + 34;
    body += `<circle cx="${point[0]}" cy="${point[1]}" r="39" fill="${stationColors[index]}" fill-opacity=".18" stroke="white" stroke-width="12"/>
      <circle cx="${point[0]}" cy="${point[1]}" r="22" fill="${stationColors[index]}" stroke="white" stroke-width="6"/>
      <rect x="${cardX}" y="${point[1]-40}" width="${cardW}" height="80" rx="4" fill="white" stroke="${stationColors[index]}" stroke-width="2"/>
      ${text(cardX+16, point[1]-11, stationNames[lang][index], zh ? 18 : 15, C.ink, 700)}
      ${text(cardX+16, point[1]+20, stationRole[index], zh ? 13 : 10, stationColors[index], 700)}`;
  });
  body += `<rect x="1280" y="160" width="662" height="930" rx="5" fill="white" stroke="${C.line}"/>
    ${text(1316, 216, zh ? 'AI由城市共同做成' : 'AI IS MADE WITH THE CITY', zh ? 28 : 24, C.ink, 700)}
    ${lines(1316, 254, zh ? ['不是把生活变成测试场，而是让生活经验、', '研究方法和工程能力共享同一张研发桌。'] : ['Urban life is not a testing ground.', 'Experience, research and engineering', 'share the same development table.'], zh ? 16 : 14, C.muted, 500, 1.45)}`;
  const photos = ['experience-zhongzhi.png', 'experience-ai-origin.png', 'experience-dazhongsi.png'];
  const photoLabels = zh ? ['公共实验花园', '公共共研大厅', '城市生活客厅'] : ['PUBLIC EXPERIMENT GARDEN', 'PUBLIC CO-DEVELOPMENT HALL', 'CITY LIFE ROOM'];
  photos.forEach((photo, index) => {
    const y = 360 + index * 218;
    body += placedImage(photo, 1316, y, 590, 188, `innovation-photo-${lang}-${index}`, index === 2 ? 'xMaxYMid' : 'xMidYMid');
    body += conceptNotice(lang, 1316, y, 590);
    body += `<rect x="1316" y="${y+140}" width="590" height="48" fill="${C.ink}" fill-opacity=".86"/>`;
    body += text(1334, y+171, `${stationNames[lang][index]} · ${photoLabels[index]}`, zh ? 15 : 12, C.white, 700);
  });
  body += `<rect x="1316" y="1028" width="590" height="38" rx="3" fill="${C.ink}"/>`;
  body += text(1611, 1054, zh ? 'X = 不同城市知识共享一张研发桌' : 'X = URBAN KNOWLEDGE SHARES ONE DEVELOPMENT TABLE', zh ? 15 : 12, C.white, 700, 'middle');
  return svgWrap(body + footer(lang));
}

function stationInnovationFigure(lang) {
  const zh = lang === 'zh';
  let body = header(3,
    '三种共同开发关系，三种值得到访的城市空间',
    'THREE WAYS TO CO-DEVELOP IN THE CITY',
    '公众不在流程末端反馈，而在研发桌边共同修改',
    'THE PUBLIC CHANGES THE WORK AT THE DEVELOPMENT TABLE', lang);
  const titles = zh ? ['众智园｜和城市一起做', 'AI原点｜让别人接着做', '大钟寺｜让生活继续改'] : ['ZHONGZHI | MAKE WITH THE CITY', 'AI ORIGIN | LET OTHERS CONTINUE', 'DAZHONGSI | LET LIFE KEEP CHANGING IT'];
  const photos = ['experience-zhongzhi.png', 'experience-ai-origin.png', 'experience-dazhongsi.png'];
  const relations = zh ? [
    ['公众知识', '全尺度工况桌', '共同改原型'],
    ['一个团队的成果', '公共原型长桌', '另一个团队接手'],
    ['日常使用经验', '社区共研桌', '下一轮研发任务'],
  ] : [
    ['PUBLIC KNOWLEDGE', 'FULL-SCALE CONDITION TABLE', 'CHANGE THE PROTOTYPE TOGETHER'],
    ['ONE TEAM\'S WORK', 'PUBLIC PROTOTYPE TABLE', 'THE NEXT TEAM CONTINUES'],
    ['LIVED EXPERIENCE', 'NEIGHBOURHOOD WORKTABLE', 'THE NEXT DEVELOPMENT TASK'],
  ];
  const spaces = zh ? [
    ['公共实验花园', '机器人开放测试庭', '开发者工坊', '河岸生态样场'],
    ['公共共研大厅', '透明实验室', '开源剧场', '开发者阶梯与咖啡'],
    ['轨道到达客厅', '人工服务岛', '终端工坊', '商业休息与社区活动'],
  ] : [
    ['PUBLIC EXPERIMENT GARDEN', 'OPEN ROBOT COURT', 'MAKER WORKSHOP', 'RIVERSIDE ECO FIELD'],
    ['PUBLIC CO-DEVELOPMENT HALL', 'TRANSPARENT LABS', 'OPEN-SOURCE THEATRE', 'STEPS + COFFEE'],
    ['TRANSIT ARRIVAL ROOM', 'STAFFED SERVICE ISLAND', 'TERMINAL WORKSHOP', 'COMMERCE + COMMUNITY'],
  ];
  const foundations = zh ? ['TEST：安全边界、急停、撤出', 'RELEASE：方法、权利、责任', 'USE：人工服务、无障碍、返回'] : ['TEST: LIMIT · STOP · EXIT', 'RELEASE: METHOD · RIGHTS · OWNER', 'USE: STAFF · ACCESS · RETURN'];
  keyAreas.features.forEach((area, index) => {
    const x = 58 + index * 636;
    const color = stationColors[index];
    body += `<rect x="${x}" y="160" width="606" height="930" rx="5" fill="white" stroke="${C.line}"/><rect x="${x}" y="160" width="606" height="10" fill="${color}"/>`;
    body += placedImage(photos[index], x+18, 178, 570, 360, `station-photo-${lang}-${index}`, index === 2 ? 'xMaxYMid' : 'xMidYMid');
    body += conceptNotice(lang, x+18, 178, 570);
    body += `<rect x="${x+18}" y="458" width="570" height="80" fill="${C.ink}" fill-opacity=".88"/>`;
    body += text(x+38, 494, titles[index], zh ? 20 : 15, C.white, 700);
    body += text(x+38, 520, stationNames[lang][index], 12, '#b8c8da', 700);
    const y = 594;
    relations[index].forEach((label, relIndex) => {
      const cx = x + 84 + relIndex * 218;
      body += `<circle cx="${cx}" cy="${y}" r="19" fill="${color}" fill-opacity="${relIndex === 1 ? 1 : .18}" stroke="${color}" stroke-width="3"/>`;
      if (relIndex < 2) body += `<line x1="${cx+24}" y1="${y}" x2="${cx+194}" y2="${y}" stroke="${color}" stroke-width="3"/>`;
      body += text(cx, y+58, label, zh ? 13 : 10, relIndex === 1 ? color : C.ink, 700, 'middle');
    });
    body += `<line x1="${x+28}" y1="690" x2="${x+578}" y2="690" stroke="${C.line}"/>`;
    body += text(x+28, 730, zh ? '持续开放的日常城市用途' : 'EVERYDAY URBAN PROGRAMME', zh ? 15 : 11, C.muted, 700);
    spaces[index].forEach((label, spaceIndex) => {
      const sy = 774 + spaceIndex * 47;
      body += `<circle cx="${x+38}" cy="${sy-5}" r="5" fill="${color}"/>${text(x+55, sy, label, zh ? 15 : 12, C.ink, 600)}`;
    });
    body += `<rect x="${x+24}" y="974" width="558" height="68" rx="4" fill="${C.ink}"/>`;
    body += text(x+44, 1002, zh ? '质量保障层' : 'QUALITY FOUNDATION', 11, '#a9bed1', 700);
    body += text(x+44, 1028, foundations[index], zh ? 14 : 11, C.white, 650);
    body += text(x+24, 1070, zh ? ['公众知识直接进入工程','成果留下让别人继续','生活经验生成下一版'][index] : ['PUBLIC KNOWLEDGE ENTERS ENGINEERING','WORK REMAINS OPEN FOR THE NEXT TEAM','LIVED EXPERIENCE WRITES THE NEXT VERSION'][index], zh ? 14 : 11, color, 700);
  });
  return svgWrap(body + footer(lang));
}

function cityQuestionJourneyFigure(lang) {
  const zh = lang === 'zh';
  let body = header(2,
    '不是一个产品通关，而是一群人共同改同一个问题',
    'ONE CITY QUESTION, CHANGED TOGETHER',
    '周阿姨的无障碍到达 × 城市共同开发',
    'MS ZHOU\'S ACCESSIBLE ARRIVAL × URBAN CO-DEVELOPMENT', lang);
  const panels = [
    { photo: 'experience-dazhongsi.png', align: 'xMinYMid', color: C.amber },
    { photo: 'experience-zhongzhi.png', align: 'xMidYMid', color: C.blue },
    { photo: 'experience-ai-origin.png', align: 'xMidYMid', color: C.green },
    { photo: 'experience-dazhongsi.png', align: 'xMaxYMid', color: C.coral },
  ];
  const stages = zh ? [
    ['大钟寺｜共同定义', '周阿姨、轮椅使用者与服务人员把“连续到达”写成城市任务，不假定未经核验的现场断点。', '使用者决定什么算改善'],
    ['众智园｜共同制作', '公众与开发者一起移动路缘、停靠位和人群标记，把身体经验变成可重复工况。', '使用者直接改路线和原型'],
    ['AI原点｜共同接续', '方法、接口和限制留在公共原型长桌；另一团队复现、拆解并继续修改。', '成果成为别人能继续做的能力'],
    ['大钟寺｜生活继续改', '设备没有碰撞，停靠与围观却影响转弯；人工服务继续，新问题回到研发桌。', '终点立刻成为下一题起点'],
  ] : [
    ['DAZHONGSI | DEFINE TOGETHER', 'Ms Zhou, wheelchair users and staff frame continuous arrival without inventing an unsurveyed defect.', 'USERS DECIDE WHAT COUNTS AS IMPROVEMENT'],
    ['ZHONGZHI | MAKE TOGETHER', 'Participants and developers move kerbs, parking and crowd markers, turning body knowledge into repeatable conditions.', 'USERS CHANGE THE ROUTE AND PROTOTYPE'],
    ['AI ORIGIN | CONTINUE TOGETHER', 'Method, interfaces and limits remain on a public table for another team to reproduce, dismantle and change.', 'WORK BECOMES A CAPABILITY OTHERS CAN CONTINUE'],
    ['DAZHONGSI | LIFE KEEPS CHANGING IT', 'No collision occurs, yet parking and spectators restrict turning. Staff remain and the new issue returns.', 'THE END BECOMES THE NEXT QUESTION'],
  ];
  panels.forEach((panel, index) => {
    const x = 58 + index * 471;
    body += `<rect x="${x}" y="160" width="441" height="900" rx="5" fill="white" stroke="${C.line}"/><rect x="${x}" y="160" width="441" height="9" fill="${panel.color}"/>`;
    body += placedImage(panel.photo, x+14, 181, 413, 430, `journey-photo-${lang}-${index}`, panel.align);
    body += conceptNotice(lang, x+14, 181, 413);
    body += `<rect x="${x+14}" y="526" width="413" height="85" fill="${C.ink}" fill-opacity=".88"/>`;
    body += text(x+32, 565, stages[index][0], zh ? 18 : 13, C.white, 700);
    body += text(x+32, 590, index === 1 ? 'SC-03 IS A TOOL, NOT THE PROTAGONIST' : '', 9, '#b9cadc', 700);
    body += lines(x+28, 670, zh ? [stages[index][1].slice(0, 29), stages[index][1].slice(29, 58), stages[index][1].slice(58)] : wrapWords(stages[index][1], 44), zh ? 15 : 12, C.ink, 500, 1.55);
    body += `<line x1="${x+28}" y1="820" x2="${x+413}" y2="820" stroke="${C.line}"/>`;
    body += `<circle cx="${x+48}" cy="874" r="18" fill="${panel.color}"/>`;
    body += lines(x+78, 865, zh ? [stages[index][2]] : wrapWords(stages[index][2], 34), zh ? 14 : 11, panel.color, 700, 1.4);
    const actors = zh ? ['周阿姨 · 轮椅使用者 · 服务人员', '使用者 · 开发者 · 工程师', '居民 · 高校 · 团队 · 开发者', '通勤者 · 商户 · 服务人员 · 开发者'][index] : ['MS ZHOU · WHEELCHAIR USERS · STAFF', 'USERS · DEVELOPERS · ENGINEERS', 'RESIDENTS · UNIVERSITIES · TEAMS', 'COMMUTERS · SHOPS · STAFF · DEVELOPERS'][index];
    body += `<rect x="${x+28}" y="960" width="385" height="58" rx="4" fill="${[C.paleAmber,C.paleBlue,C.paleGreen,C.paleCoral][index]}"/>`;
    body += text(x+220, 995, actors, zh ? 12 : 9, C.ink, 700, 'middle');
  });
  body += `<rect x="58" y="1034" width="1854" height="38" rx="3" fill="${C.ink}"/>`;
  body += text(985, 1060, zh ? '城市问题不是一次输入：公众始终坐在研发桌边' : 'A CITY QUESTION IS NOT A ONE-OFF INPUT: THE PUBLIC STAYS AT THE DEVELOPMENT TABLE', zh ? 16 : 13, C.white, 700, 'middle');
  return svgWrap(body + footer(lang));
}

function stationExperiencesFigure(lang) {
  const zh = lang === 'zh';
  let body = header(3, '三站体验：共同开发发生在真实公共生活旁边', 'THREE STATION EXPERIENCES', '写实画面仅表达概念空间、活动关系与设计意向', 'REALISTIC VIEWS SHOW CONCEPT SPACE, ACTIVITY AND INTENT ONLY', lang);
  const photos = ['experience-zhongzhi.png', 'experience-ai-origin.png', 'experience-dazhongsi.png'];
  const titles = zh ? ['众智园｜和城市一起做', 'AI原点｜让别人接着做', '大钟寺｜让生活继续改'] : ['ZHONGZHI | MAKE WITH THE CITY', 'AI ORIGIN | LET OTHERS CONTINUE', 'DAZHONGSI | LET LIFE KEEP CHANGING IT'];
  const notes = zh ? [
    ['公众路径连续；测试庭独立关闭', '急停、观察与撤出路径现场可见'],
    ['开放实验大厅与公共原型长桌', '成果可复现、可接续，也可人工撤回'],
    ['无障碍主链与人工服务优先', '有限试用退出后，通勤、休息与商业继续'],
  ] : [
    ['CONTINUOUS CIVIC PATH; TEST COURT CLOSES ALONE', 'STOP, OBSERVATION AND EXIT REMAIN VISIBLE'],
    ['OPEN LAB HALL + PUBLIC PROTOTYPE TABLE', 'WORK CAN BE CONTINUED OR WITHDRAWN BY STAFF'],
    ['ACCESSIBLE CHAIN + STAFFED SERVICE FIRST', 'TRANSIT, REST AND COMMERCE CONTINUE AFTER EXIT'],
  ];
  photos.forEach((photo, index) => {
    const x = 58 + index * 636;
    const color = stationColors[index];
    body += `<rect x="${x}" y="160" width="606" height="930" rx="5" fill="white" stroke="${C.line}"/><rect x="${x}" y="160" width="606" height="10" fill="${color}"/>`;
    body += placedImage(photo, x + 18, 180, 570, 630, `experience-${lang}-${index}`, index === 2 ? 'xMaxYMid' : 'xMidYMid');
    body += conceptNotice(lang, x + 18, 180, 570);
    body += `<rect x="${x+18}" y="690" width="570" height="120" fill="${C.ink}" fill-opacity=".88"/>`;
    body += text(x + 42, 744, titles[index], zh ? 20 : 14, C.white, 700);
    body += text(x + 42, 780, stationNames[lang][index], 12, color, 700);
    notes[index].forEach((note, noteIndex) => {
      body += `<circle cx="${x+42}" cy="${875 + noteIndex * 72}" r="6" fill="${color}"/>`;
      body += lines(x + 62, 882 + noteIndex * 72, zh ? [note] : wrapWords(note, 55), zh ? 15 : 11, C.ink, 600, 1.35);
    });
    body += text(x + 34, 1040, zh ? '概念空间；不是现状、边界、权属、工程或审批证据' : 'CONCEPT SPACE; NOT SITE, BOUNDARY, OWNERSHIP, ENGINEERING OR APPROVAL EVIDENCE', zh ? 12 : 9, C.coral, 700);
  });
  return svgWrap(body + footer(lang));
}

function personaDayFigure(lang) {
  const zh = lang === 'zh';
  let body = header(12, '周阿姨的一天：不用手机，也直接改变下一版', 'MS ZHOU: NO PHONE, DIRECT INPUT TO THE NEXT VERSION', '合成人物与概念旅程；不对应真实居民、服务或试点', 'COMPOSITE PERSONA + CONCEPT JOURNEY; NOT A REAL RESIDENT OR PILOT', lang);
  body += `<rect x="58" y="160" width="760" height="900" rx="5" fill="white" stroke="${C.line}"/>`;
  body += placedImage('experience-dazhongsi.png', 76, 178, 724, 864, `persona-${lang}`, 'xMidYMid');
  body += conceptNotice(lang, 76, 178, 724);
  body += `<rect x="76" y="846" width="724" height="196" fill="${C.ink}" fill-opacity=".88"/>`;
  body += lines(104, 900, zh ? ['她不是被观察的“用户画像”。', '她移动停靠位、指出转弯冲突，', '并参与下一轮路线与工况复测。'] : ['SHE IS NOT AN OBSERVED USER PROFILE.', 'SHE MOVES THE STOPPING POSITION, IDENTIFIES', 'THE TURNING CONFLICT AND JOINS THE RETEST.'], zh ? 20 : 15, C.white, 700, 1.45);
  body += `<rect x="850" y="160" width="1092" height="900" rx="5" fill="white" stroke="${C.line}"/>`;
  const steps = zh ? [
    ['01 到达', '沿无障碍主链进入，不要求手机或账号'], ['02 选择', '看见人工服务与纸质路线，先完成日常事务'],
    ['03 提题', '把停靠、围观和转弯冲突写成城市问题'], ['04 共做', '在众智园与开发者共同移动路缘和停靠标记'],
    ['05 开放', 'AI原点公开方法、接口、限制和责任'], ['06 使用', '大钟寺有限使用，人工等价服务始终存在'],
    ['07 异议', '匿名指出新冲突，现场先停设备并恢复通行'], ['08 返回', '新问题成为下一轮工况，回到众智园复测'],
  ] : [
    ['01 ARRIVE', 'ENTER ON THE ACCESSIBLE CHAIN; NO PHONE OR ACCOUNT'], ['02 CHOOSE', 'USE STAFFED SERVICE AND A PAPER ROUTE FIRST'],
    ['03 FRAME', 'TURN PARKING, CROWD AND TURNING CONFLICT INTO A CITY QUESTION'], ['04 MAKE', 'MOVE KERBS AND STOPPING MARKERS WITH DEVELOPERS AT ZHONGZHI'],
    ['05 OPEN', 'AI ORIGIN SHARES METHOD, INTERFACE, LIMIT AND RESPONSIBILITY'], ['06 LIVE', 'LIMITED USE AT DAZHONGSI; STAFFED EQUIVALENCE REMAINS'],
    ['07 OBJECT', 'ANONYMOUSLY FLAG A NEW CONFLICT; STAFF STOP AND CLEAR THE PATH'], ['08 RETURN', 'THE NEW ISSUE BECOMES A RETEST CONDITION AT ZHONGZHI'],
  ];
  steps.forEach((step, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = 884 + col * 510;
    const y = 214 + row * 196;
    const color = [C.amber, C.blue, C.green, C.coral][row];
    body += `<rect x="${x}" y="${y}" width="476" height="158" rx="5" fill="${row % 2 ? C.paper : '#ffffff'}" stroke="${C.line}"/><rect x="${x}" y="${y}" width="8" height="158" fill="${color}"/>`;
    body += text(x + 28, y + 44, step[0], zh ? 18 : 14, color, 700);
    body += lines(x + 28, y + 82, zh ? [step[1]] : wrapWords(step[1], 48), zh ? 14 : 10, C.ink, 550, 1.4);
  });
  return svgWrap(body + footer(lang));
}

function failureAtlasFigure(lang) {
  const zh = lang === 'zh';
  let body = header(8, '三类失败：先恢复公共使用，再决定产品能否回来', 'THREE FAILURES: RESTORE PUBLIC USE BEFORE RE-ENTRY', '技术、权利与公众使用失败具有不同现场动作', 'TECHNICAL, RIGHTS AND PUBLIC-USE FAILURES CHANGE DIFFERENT THINGS', lang);
  const cards = zh ? [
    ['技术失败', '众智园', '越界、失联或急停失败', '人员急停并冻结版本', '关闭机器口袋；公众主链不断', '同版本独立复测后才能再申请'],
    ['权利失败', 'AI原点', '许可不清、版本错配或无人撤回', '人工HOLD并停止分发', '撤下发布界面；教学与协作继续', '权利、哈希和责任闭合后重签'],
    ['公众使用失败', '大钟寺', '人工缺席、无AI服务中断或通行受阻', '先停设备并切换人工服务', '清空交叉口；无障碍主链恢复', '用户主导复测；新问题返回研发'],
  ] : [
    ['TECHNICAL FAIL', 'ZHONGZHI', 'BOUNDARY BREACH, LINK LOSS OR STOP FAILURE', 'STAFF STOP AND FREEZE THE VERSION', 'CLOSE MACHINE POCKET; CIVIC CHAIN STAYS OPEN', 'INDEPENDENT SAME-VERSION RETEST BEFORE RE-ENTRY'],
    ['RIGHTS FAIL', 'AI ORIGIN', 'UNCLEAR LICENCE, VERSION MISMATCH OR NO WITHDRAWAL OWNER', 'STAFF HOLD AND STOP DISTRIBUTION', 'WITHDRAW RELEASE INTERFACE; LEARNING CONTINUES', 'RIGHTS, HASH AND DUTY CLOSE BEFORE A NEW TICKET'],
    ['PUBLIC-USE FAIL', 'DAZHONGSI', 'ABSENT STAFF, BROKEN NON-AI SERVICE OR BLOCKED PATH', 'STOP DEVICE AND SWITCH TO STAFFED SERVICE', 'CLEAR CROSSING; RESTORE ACCESSIBLE CHAIN', 'USER-LED RETEST; NEW ISSUE RETURNS TO DEVELOPMENT'],
  ];
  const photos = ['experience-zhongzhi.png', 'experience-ai-origin.png', 'experience-dazhongsi.png'];
  cards.forEach((card, index) => {
    const x = 58 + index * 636;
    const color = [C.blue, C.green, C.coral][index];
    body += `<rect x="${x}" y="160" width="606" height="930" rx="5" fill="white" stroke="${C.line}"/><rect x="${x}" y="160" width="606" height="10" fill="${color}"/>`;
    body += placedImage(photos[index], x + 18, 180, 570, 300, `failure-${lang}-${index}`, 'xMidYMid');
    body += conceptNotice(lang, x + 18, 180, 570);
    body += `<rect x="${x+18}" y="408" width="570" height="72" fill="${C.ink}" fill-opacity=".88"/>`;
    body += text(x + 38, 450, `${card[0]} · ${card[1]}`, zh ? 20 : 14, C.white, 700);
    const rowLabels = zh ? ['触发', '人工决定', '空间复原', '重新进入'] : ['TRIGGER', 'HUMAN DECISION', 'SPATIAL RESTORE', 'RE-ENTRY'];
    card.slice(2).forEach((value, row) => {
      const y = 540 + row * 128;
      body += text(x + 28, y, rowLabels[row], 12, color, 700);
      body += lines(x + 28, y + 37, zh ? [value] : wrapWords(value, 56), zh ? 15 : 11, C.ink, 600, 1.4);
      if (row < 3) body += `<line x1="${x+28}" y1="${y+92}" x2="${x+578}" y2="${y+92}" stroke="${C.line}"/>`;
    });
  });
  return svgWrap(body + footer(lang));
}

function aerialDesignKeyFigure(lang) {
  const zh = lang === 'zh';
  let body = header(4, '总体鸟瞰如何对应可检查的空间动作', 'HOW THE AERIAL MAPS TO CHECKABLE SPATIAL MOVES', '鸟瞰表达意向；GeoJSON与相对拓扑承担证据', 'THE AERIAL SHOWS INTENT; GEOJSON + TOPOLOGY CARRY EVIDENCE', lang);
  body += `<rect x="58" y="160" width="1260" height="930" rx="5" fill="white" stroke="${C.line}"/>`;
  body += placedImage('site-overview.png', 76, 178, 1224, 894, `aerial-${lang}`, 'xMidYMid');
  body += conceptNotice(lang, 76, 178, 1224);
  body += `<rect x="1348" y="160" width="594" height="930" rx="5" fill="white" stroke="${C.line}"/>`;
  const actions = zh ? [
    ['01 公共创新主线', '连续公园、铁路遗产与日常通行'], ['02 六类X接口', '社区、校园、轨道、生态、产业、文化'],
    ['03 三处共同开发场', '众智园做、AI原点开放、大钟寺继续改'], ['04 东西缝合', '横向城市资源与问题进入主线'],
    ['05 蓝绿慢行', '小月河、绿地与无障碍公共链'],
  ] : [
    ['01 PUBLIC INNOVATION SPINE', 'CONTINUOUS PARK, RAIL HERITAGE + DAILY MOVEMENT'], ['02 SIX X INTERFACES', 'COMMUNITY, CAMPUS, TRANSIT, ECOLOGY, INDUSTRY, CULTURE'],
    ['03 THREE CO-DEVELOPMENT GROUNDS', 'MAKE AT ZHONGZHI, OPEN AT AI ORIGIN, CHANGE AT DAZHONGSI'], ['04 EAST-WEST STITCHES', 'URBAN QUESTIONS + CAPABILITY ENTER THE SPINE'],
    ['05 BLUE-GREEN ACCESS', 'XIAOYUE RIVER, GREEN SPACE + ACCESSIBLE CIVIC CHAIN'],
  ];
  actions.forEach((action, index) => {
    const y = 220 + index * 158;
    const color = [C.cyan, C.coral, C.blue, C.amber, C.green][index];
    body += `<rect x="1380" y="${y}" width="530" height="126" rx="5" fill="${index % 2 ? C.paper : '#ffffff'}" stroke="${C.line}"/><rect x="1380" y="${y}" width="8" height="126" fill="${color}"/>`;
    body += text(1408, y + 40, action[0], zh ? 17 : 13, color, 700);
    body += lines(1408, y + 75, zh ? [action[1]] : wrapWords(action[1], 48), zh ? 14 : 10, C.ink, 550, 1.35);
  });
  body += `<rect x="1380" y="1030" width="530" height="42" rx="3" fill="${C.paleCoral}"/>`;
  body += text(1645, 1057, zh ? '临时几何 · 非法定总平 · 非实施批准' : 'PROVISIONAL GEOMETRY · NOT STATUTORY PLAN OR APPROVAL', zh ? 13 : 10, C.coral, 700, 'middle');
  return svgWrap(body + footer(lang));
}

function flagshipContractsFigure(lang) {
  const zh = lang === 'zh';
  let body = header(15, '三站质量底盘：共同开发开放，但不是无规则开放', 'THREE-STATION QUALITY FOUNDATION', '90日为准备评估窗口；14日为唯一受控运行班次', '90 DAYS IS READINESS + REVIEW; 14 DAYS IS THE CONTROLLED OPERATING SHIFT', lang);
  contracts.contracts.forEach((item, index) => {
    const x = 58 + index * 636;
    const color = stationColors[index];
    const question = zh ? item.question_zh : item.question_en;
    const move = zh ? item.spatial_contract.distinctive_move_zh : item.spatial_contract.distinctive_move_en;
    body += `<rect x="${x}" y="160" width="606" height="930" rx="5" fill="white" stroke="${C.line}"/><rect x="${x}" y="160" width="606" height="10" fill="${color}"/>`;
    body += text(x + 28, 224, `${stationNames[lang][index]} / ${item.stage}`, 23, C.ink, 700);
    body += lines(x + 28, 276, zh ? [question] : wrapWords(question, 48), zh ? 18 : 14, color, 700, 1.4);
    const blocks = zh ? [
      ['空间合同', move], ['准备门', '运营主体、场地许可、保险、安全、数据控制、无障碍复核与复原资金全部闭合'],
      ['14日运行', index === 0 ? '封闭测试与独立复测' : index === 1 ? '方法复现、权利核对与有限开放' : '有限使用、人工等价服务与匿名异议'],
      ['RETURN后', item.spatial_contract.ordinary_use_after_return],
    ] : [
      ['SPATIAL CONTRACT', move], ['READINESS GATE', 'OPERATOR, SITE PERMIT, INSURANCE, SAFETY, DATA CONTROL, ACCESS REVIEW AND RESTORATION FUNDING CLOSED'],
      ['14-DAY OPERATION', index === 0 ? 'CLOSED TEST + INDEPENDENT RETEST' : index === 1 ? 'REPRODUCE METHOD, REVIEW RIGHTS, LIMITED OPENING' : 'LIMITED USE, STAFFED EQUIVALENCE, ANONYMOUS OBJECTION'],
      ['AFTER RETURN', item.spatial_contract.ordinary_use_after_return],
    ];
    blocks.forEach((block, row) => {
      const y = 360 + row * 165;
      body += text(x + 28, y, block[0], 12, color, 700);
      body += lines(x + 28, y + 38, zh ? [block[1].slice(0, 34), block[1].slice(34)] : wrapWords(block[1], 54), zh ? 14 : 10, C.ink, 550, 1.4);
      if (row < 3) body += `<line x1="${x+28}" y1="${y+118}" x2="${x+578}" y2="${y+118}" stroke="${C.line}"/>`;
    });
    body += `<rect x="${x+28}" y="1020" width="550" height="42" rx="3" fill="${C.ink}"/>`;
    body += text(x + 303, 1047, zh ? '仓库PASS不等于现场批准' : 'REPOSITORY PASS IS NOT FIELD APPROVAL', zh ? 13 : 10, C.white, 700, 'middle');
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
  ['mobility-bluegreen.png', innovationLineFigure('zh')],
  ['mobility-bluegreen.en.png', innovationLineFigure('en')],
  ['key-areas.png', stationInnovationFigure('zh')],
  ['key-areas.en.png', stationInnovationFigure('en')],
  ['x-operating-proof.png', cityQuestionJourneyFigure('zh')],
  ['x-operating-proof.en.png', cityQuestionJourneyFigure('en')],
  ['station-design-atlas.png', stationSpatialFigure('zh')],
  ['station-design-atlas.en.png', stationSpatialFigure('en')],
  ['land-use-structure.png', landUseFigure('zh')],
  ['land-use-structure.en.png', landUseFigure('en')],
  ['implementation-roadmap.png', pilotFigure('zh')],
  ['implementation-roadmap.en.png', pilotFigure('en')],
  ['station-experiences.png', stationExperiencesFigure('zh')],
  ['station-experiences.en.png', stationExperiencesFigure('en')],
  ['persona-day.png', personaDayFigure('zh')],
  ['persona-day.en.png', personaDayFigure('en')],
  ['failure-atlas.png', failureAtlasFigure('zh')],
  ['failure-atlas.en.png', failureAtlasFigure('en')],
  ['aerial-design-key.png', aerialDesignKeyFigure('zh')],
  ['aerial-design-key.en.png', aerialDesignKeyFigure('en')],
  ['three-station-flagship-contracts.png', flagshipContractsFigure('zh')],
  ['three-station-flagship-contracts.en.png', flagshipContractsFigure('en')],
];

for (const [name, svg] of jobs) {
  render(svg, path.join(FIGURES, name));
  console.log(`rendered assets/figures/${name}`);
}
