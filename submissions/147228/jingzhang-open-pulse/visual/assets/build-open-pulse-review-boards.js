#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const packageRoot = path.resolve(__dirname, '..', '..');
const figureDir = path.join(packageRoot, 'assets', 'figures');
const sharp = require(process.env.OPEN_PULSE_SHARP_MODULE || 'sharp');
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(packageRoot, relativePath), 'utf8'));

const tabletop = readJson('visual/assets/open-pulse-tabletop-evidence.json');
const testWindow = readJson('visual/assets/example-s02-embodied-test-window.json');
const protocol = readJson('visual/assets/civic-pulse-protocol.json');
const stationDelivery = readJson('visual/assets/open-pulse-station-delivery-contract.json');
const metrics = readJson('metrics.json').metrics;
const geometry = {
  site: readJson('geometry/site_boundary.geojson'),
  land: readJson('geometry/land_use.geojson'),
  keys: readJson('geometry/key_areas.geojson'),
  roads: readJson('geometry/roads.geojson'),
  green: readJson('geometry/green_space.geojson'),
  public: readJson('geometry/public_space.geojson'),
};

if (tabletop.tabletop_status !== 'pass') throw new Error('Expected a passing local synthetic tabletop record.');
if (tabletop.operational_status !== 'not_authorized_not_run') throw new Error('Operational boundary changed; review wording before rendering.');
if (testWindow.release_decision?.decision !== 'hold') throw new Error('Expected the bounded field window to remain on hold.');
if (!protocol.release_rule || protocol.stages?.length !== 6) throw new Error('Expected a six-stage civic release contract.');
if (stationDelivery.decision !== 'HOLD' || stationDelivery.design_only !== true || stationDelivery.stations?.length !== 3) throw new Error('Expected a three-station, design-only delivery contract on HOLD.');

const W = 2400;
const H = 1350;
const C = {
  navy: '#0c2136',
  navy2: '#132d48',
  ink: '#13283b',
  paper: '#f6f1e7',
  white: '#fffdf8',
  muted: '#61788b',
  pale: '#d8e2df',
  cyan: '#55c7c3',
  green: '#74ad91',
  greenSoft: '#dceae2',
  blue: '#78a8e8',
  blueSoft: '#dfe9f8',
  orange: '#ee8b55',
  orangeSoft: '#f8e2d6',
  gold: '#e1b742',
  goldSoft: '#f4e9bf',
  red: '#dc5c50',
  lilac: '#ae98d2',
};
const stationColors = [C.green, C.blue, C.orange];
const landColors = ['#86aebc', '#76a782', '#d49b67', '#9f91be'];

function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function text(x, y, value, size, options = {}) {
  const anchor = options.anchor || 'start';
  const weight = options.weight || 400;
  const fill = options.fill || C.ink;
  const letter = options.letter || 0;
  const opacity = options.opacity ?? 1;
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}" fill="${fill}" letter-spacing="${letter}" opacity="${opacity}">${esc(value)}</text>`;
}

function lines(x, y, values, size, options = {}) {
  const gap = options.gap || Math.round(size * 1.42);
  return values.map((value, index) => text(x, y + index * gap, value, size, options)).join('');
}

function rect(x, y, width, height, options = {}) {
  const fill = options.fill ?? C.white;
  const stroke = options.stroke ?? C.pale;
  const sw = options.sw ?? 2;
  const radius = options.radius ?? 24;
  const opacity = options.opacity ?? 1;
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" opacity="${opacity}"/>`;
}

function line(x1, y1, x2, y2, options = {}) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${options.stroke || C.ink}" stroke-width="${options.sw || 4}" stroke-linecap="round"${options.dash ? ` stroke-dasharray="${options.dash}"` : ''} opacity="${options.opacity ?? 1}"/>`;
}

function circle(cx, cy, radius, options = {}) {
  return `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${options.fill || C.white}" stroke="${options.stroke || C.ink}" stroke-width="${options.sw || 3}"/>`;
}

function svgStart(title, dark = false) {
  const background = dark ? C.navy : C.paper;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}"><rect width="${W}" height="${H}" fill="${background}"/><g font-family="Arial, PingFang SC, Noto Sans CJK SC, sans-serif">`;
}

function svgEnd() {
  return '</g></svg>\n';
}

function coordinates(value, output = []) {
  if (Array.isArray(value) && typeof value[0] === 'number' && typeof value[1] === 'number') {
    output.push(value);
    return output;
  }
  if (Array.isArray(value)) value.forEach((item) => coordinates(item, output));
  return output;
}

function projector(collections, box) {
  const all = collections.flatMap((collection) => collection.features.flatMap((feature) => coordinates(feature.geometry.coordinates)));
  const xs = all.map((item) => item[0]);
  const ys = all.map((item) => item[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const scale = Math.min(box.width / (maxX - minX), box.height / (maxY - minY));
  const usedWidth = (maxX - minX) * scale;
  const usedHeight = (maxY - minY) * scale;
  const offsetX = box.x + (box.width - usedWidth) / 2;
  const offsetY = box.y + (box.height - usedHeight) / 2;
  return ([x, y]) => [offsetX + (x - minX) * scale, offsetY + usedHeight - (y - minY) * scale];
}

function ringPath(ring, project) {
  return ring.map((point, index) => {
    const [x, y] = project(point);
    return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ') + ' Z';
}

function geometryPath(feature, project) {
  const { type, coordinates: coords } = feature.geometry;
  if (type === 'Polygon') return coords.map((ring) => ringPath(ring, project)).join(' ');
  if (type === 'MultiPolygon') return coords.flatMap((polygon) => polygon.map((ring) => ringPath(ring, project))).join(' ');
  if (type === 'LineString') {
    return coords.map((point, index) => {
      const [x, y] = project(point);
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
  }
  if (type === 'MultiLineString') return coords.map((lineCoords) => geometryPath({ geometry: { type: 'LineString', coordinates: lineCoords } }, project)).join(' ');
  throw new Error(`Unsupported geometry type: ${type}`);
}

function centroid(feature, project) {
  const pts = coordinates(feature.geometry.coordinates);
  const mean = pts.reduce((acc, point) => [acc[0] + point[0], acc[1] + point[1]], [0, 0]).map((value) => value / pts.length);
  return project(mean);
}

function drawMap(box, options = {}) {
  const project = projector([geometry.site], box);
  let out = '';
  if (options.land) {
    geometry.land.features.forEach((feature, index) => {
      out += `<path d="${geometryPath(feature, project)}" fill="${landColors[index % landColors.length]}" fill-opacity="0.56" stroke="${C.white}" stroke-width="3"/>`;
    });
  } else {
    geometry.site.features.forEach((feature) => {
      out += `<path d="${geometryPath(feature, project)}" fill="${options.dark ? C.navy2 : C.white}" stroke="${options.dark ? '#66829c' : C.pale}" stroke-width="4"/>`;
    });
  }
  if (options.blueGreen) {
    geometry.green.features.forEach((feature) => {
      out += `<path d="${geometryPath(feature, project)}" fill="${C.green}" fill-opacity="0.44" stroke="${C.green}" stroke-width="3"/>`;
    });
    geometry.public.features.forEach((feature) => {
      out += `<path d="${geometryPath(feature, project)}" fill="${C.blue}" fill-opacity="0.34" stroke="${C.blue}" stroke-width="3"/>`;
    });
  }
  if (options.roads) {
    geometry.roads.features.forEach((feature, index) => {
      const primary = feature.properties.network_role === 'north_south_spine';
      out += `<path d="${geometryPath(feature, project)}" fill="none" stroke="${primary ? C.gold : C.cyan}" stroke-width="${primary ? 12 : 7}" stroke-linecap="round"/>`;
    });
  }
  geometry.keys.features.forEach((feature, index) => {
    const color = stationColors[index];
    out += `<path d="${geometryPath(feature, project)}" fill="${color}" fill-opacity="${options.dark ? 0.30 : 0.23}" stroke="${color}" stroke-width="6" stroke-dasharray="13 9"/>`;
    const [cx, cy] = centroid(feature, project);
    out += circle(cx, cy, 28, { fill: color, stroke: options.dark ? C.white : C.ink, sw: 4 });
    out += text(cx, cy + 9, String(index + 1), 24, { anchor: 'middle', weight: 800, fill: options.dark ? C.navy : C.ink });
  });
  geometry.site.features.forEach((feature) => {
    out += `<path d="${geometryPath(feature, project)}" fill="none" stroke="${options.dark ? '#9ab2c5' : C.ink}" stroke-width="5" stroke-dasharray="14 10"/>`;
  });
  return { out, project };
}

function header(meta, titleValue, subtitle, dark, lang) {
  const main = dark ? C.white : C.ink;
  const quiet = dark ? '#91a9bb' : C.muted;
  let out = text(78, 72, meta, 22, { fill: C.gold, letter: 1.4, weight: 650 });
  out += text(2322, 72, 'V3.2 / PROVISIONAL / DESIGN TARGETS ONLY', 20, { anchor: 'end', fill: dark ? C.cyan : C.orange, letter: 0.8 });
  out += text(78, 154, titleValue, lang === 'zh' ? 58 : 45, { fill: main, weight: 720 });
  out += text(78, 208, subtitle, lang === 'zh' ? 25 : 20, { fill: quiet });
  out += line(78, 238, 2322, 238, { stroke: dark ? '#36516a' : C.pale, sw: 2 });
  return out;
}

function buildSiteOverview(lang) {
  const zh = lang === 'zh';
  const titleValue = zh ? '城市不追随模型版本，城市发布自己的公共版本' : 'A city does not chase model versions; it releases its own civic versions';
  const subtitle = zh ? '一条公共主脊 · 三座版本站 · 六段发布协议 · 每个版本都能修复或退役' : 'One public spine · three release stations · six-stage contract · every version can be repaired or retired';
  let out = svgStart(titleValue, true);
  out += header('JING-ZHANG OPEN PULSE / CIVIC RELEASE 01', titleValue, subtitle, true, lang);
  out += rect(78, 282, 1000, 920, { fill: C.navy2, stroke: '#36516a', radius: 30 });
  out += text(122, 340, zh ? '一条始终开放的公共主脊' : 'A PUBLIC SPINE THAT STAYS OPEN', zh ? 34 : 27, { fill: C.white, weight: 700 });
  out += text(122, 384, zh ? '临时几何 · 表达关系，不表达正式红线' : 'Provisional geometry · relational, not statutory', zh ? 20 : 17, { fill: '#91a9bb' });
  const map = drawMap({ x: 180, y: 420, width: 800, height: 650 }, { dark: true, land: true, roads: true });
  out += map.out;
  const stationNames = zh ? ['众智园 / TEST', 'AI 原点 / REVIEW', '大钟寺 / RELEASE'] : ['Collective Intelligence / TEST', 'AI Origin / REVIEW', 'Dazhongsi / RELEASE'];
  geometry.keys.features.forEach((feature, index) => {
    const [cx, cy] = centroid(feature, map.project);
    out += text(cx + 45, cy + 7, stationNames[index], zh ? 20 : 15, { fill: C.white, weight: 650 });
  });
  out += rect(120, 1110, 916, 60, { fill: '#193b4d', stroke: C.green, radius: 16, sw: 2 });
  out += text(578, 1150, zh ? '普通步行 · 人工服务 · 无 App 路径始终可用' : 'Walking · staffed service · no-app route remain available', zh ? 21 : 16, { fill: C.white, anchor: 'middle', weight: 600 });

  out += rect(1125, 282, 1197, 920, { fill: '#102943', stroke: '#36516a', radius: 30 });
  out += text(1168, 340, zh ? '一次公共版本，必须留下六件事' : 'SIX OBJECTS FOR ONE CIVIC VERSION', zh ? 34 : 27, { fill: C.white, weight: 700 });
  const labelsZh = [
    ['01 ISSUE / 问题单', '谁的问题 · 在哪里 · 谁回应'],
    ['02 FORK / 试验分支', '边界 · 时窗 · 普通替代'],
    ['03 TEST / 证据测试', '基线 · 事件 · 停止与恢复'],
    ['04 REVIEW / 双重审查', '专业责任 + 受影响公众'],
    ['05 RELEASE / 公共发布', '状态 · 局限 · 申诉 · 版本号'],
    ['06 RETIRE / 修复退役', '工单 · 预算 · 恢复 · 归档'],
  ];
  const labelsEn = [
    ['01 ISSUE', 'whose problem · where · who responds'],
    ['02 FORK', 'boundary · window · ordinary alternative'],
    ['03 TEST', 'baseline · event · stop and recovery'],
    ['04 REVIEW', 'professional duty + affected public'],
    ['05 RELEASE', 'state · limits · appeal · version ID'],
    ['06 RETIRE', 'work order · budget · restore · archive'],
  ];
  const labels = zh ? labelsZh : labelsEn;
  labels.forEach((item, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const x = 1168 + column * 555;
    const y = 392 + row * 185;
    const color = [C.cyan, C.blue, C.green, C.gold, C.orange, C.red][index];
    out += rect(x, y, 520, 150, { fill: '#173653', stroke: color, radius: 22, sw: 3 });
    out += text(x + 28, y + 55, item[0], zh ? 27 : 25, { fill: color, weight: 750 });
    out += text(x + 28, y + 105, item[1], zh ? 18 : 15, { fill: '#b7c7d3' });
  });
  out += rect(1168, 964, 1097, 188, { fill: '#0e2338', stroke: C.gold, radius: 22, sw: 3 });
  out += text(1200, 1008, zh ? 'S-02 当前版本状态' : 'CURRENT S-02 VERSION STATE', zh ? 22 : 18, { fill: C.gold, weight: 700 });
  out += text(1200, 1060, zh ? `桌面回放 PASS  ${tabletop.replayed_counts.fixtures} + ${tabletop.replayed_counts.acceptance_checks} + ${tabletop.replayed_counts.rollback_steps}` : `Tabletop PASS  ${tabletop.replayed_counts.fixtures} + ${tabletop.replayed_counts.acceptance_checks} + ${tabletop.replayed_counts.rollback_steps}`, zh ? 31 : 25, { fill: C.white, weight: 720 });
  out += text(1200, 1110, zh ? '现场窗口 HOLD · RELEASE 未签发' : 'Field window HOLD · RELEASE not issued', zh ? 25 : 21, { fill: C.orange, weight: 650 });
  out += text(2322, 1310, zh ? '包内 GeoJSON + civic-pulse-protocol + S-02 synthetic evidence' : 'Package GeoJSON + civic-pulse-protocol + synthetic S-02 evidence', 15, { anchor: 'end', fill: '#91a9bb' });
  out += svgEnd();
  return out;
}

function buildLandUse(lang) {
  const zh = lang === 'zh';
  const titleValue = zh ? '一条公共主脊，三座版本站' : 'One public spine, three civic release stations';
  const subtitle = zh ? '概念用地、慢行网络和重点区来自同一套临时 GeoJSON；正式 polygon 到位后整体重算' : 'Concept land use, mobility and key areas share one provisional GeoJSON source and recompute together';
  let out = svgStart(titleValue, false);
  out += header('SPATIAL CONTRACT / 02', titleValue, subtitle, false, lang);
  out += rect(78, 280, 1420, 935, { fill: C.white, stroke: C.pale, radius: 30 });
  out += text(120, 340, zh ? '11.41 km² 临时总体设计范围' : '11.41 km² PROVISIONAL OVERALL DESIGN AREA', zh ? 30 : 24, { fill: C.ink, weight: 700 });
  const map = drawMap({ x: 135, y: 385, width: 1300, height: 760 }, { land: true, roads: true });
  out += map.out;
  const names = zh ? ['01 众智园 · 可信测试', '02 AI 原点 · 开源复核', '03 大钟寺 · 日常发布'] : ['01 Collective Intelligence · test', '02 AI Origin · review', '03 Dazhongsi · release'];
  geometry.keys.features.forEach((feature, index) => {
    const [cx, cy] = centroid(feature, map.project);
    out += text(cx + 42, cy + 8, names[index], zh ? 18 : 14, { fill: C.ink, weight: 720 });
  });
  out += rect(1545, 280, 777, 935, { fill: C.navy, stroke: C.navy, radius: 30 });
  out += text(1590, 340, zh ? '四类概念用地' : 'FOUR CONCEPT LAND-USE CLASSES', zh ? 30 : 22, { fill: C.white, weight: 700 });
  const landNamesZh = ['AI 研发创新', '公园绿地与开敞空间', '产业与商业服务', '社区服务与配套'];
  const landNamesEn = ['AI R&D', 'Park and open space', 'Enterprise and commerce', 'Community support'];
  geometry.land.features.forEach((feature, index) => {
    const y = 400 + index * 102;
    out += rect(1590, y, 54, 54, { fill: landColors[index], stroke: landColors[index], radius: 10 });
    out += text(1670, y + 35, (zh ? landNamesZh : landNamesEn)[index], zh ? 22 : 18, { fill: C.white, weight: 600 });
    out += text(2268, y + 35, `${(feature.properties.area_sqm_declared / 1e6).toFixed(2)} km²`, 18, { anchor: 'end', fill: '#9fb2c2' });
  });
  out += line(1590, 812, 2268, 812, { stroke: '#36516a', sw: 2 });
  out += text(1590, 860, zh ? '空间规则' : 'SPATIAL RULES', zh ? 26 : 21, { fill: C.gold, weight: 700 });
  const rules = zh
    ? ['公共主脊不因测试关闭', '测试只进可绕行口袋', '永久建设等待正式控制', '三站各有人工服务与退役路径']
    : ['The public spine never closes for a test', 'Tests stay in bypassable pockets', 'Permanent works await official controls', 'Every station has staff and a retirement path'];
  out += lines(1590, 916, rules.map((rule, index) => `${String(index + 1).padStart(2, '0')}  ${rule}`), zh ? 21 : 17, { fill: '#d1dce4', gap: 55 });
  out += text(78, 1310, zh ? '图示为临时概念范围，不是官方红线、权属、控规强度或工程线位。' : 'Provisional concept geometry only; not an official boundary, title, control or engineering alignment.', 16, { fill: C.muted });
  out += svgEnd();
  return out;
}

function buildKeyAreas(lang) {
  const zh = lang === 'zh';
  const titleValue = zh ? '三座版本站：测试、复核、发布' : 'Three civic release stations: test, review, release';
  const subtitle = zh ? '每站都从普通路线进入，经过六段动作，再回到普通城市' : 'Every station starts from an ordinary route, passes six actions and returns to ordinary city life';
  let out = svgStart(titleValue, false);
  out += header('KEY-AREA RELEASE STATIONS / 03', titleValue, subtitle, false, lang);
  out += rect(78, 280, 575, 935, { fill: C.navy, stroke: C.navy, radius: 30 });
  out += text(120, 340, zh ? '南北序列 / 临时范围' : 'NORTH-SOUTH SEQUENCE', zh ? 27 : 21, { fill: C.white, weight: 700 });
  const map = drawMap({ x: 145, y: 390, width: 440, height: 690 }, { dark: true, roads: true });
  out += map.out;
  out += text(365, 1150, zh ? '普通主脊持续开放' : 'Public spine stays open', zh ? 22 : 18, { anchor: 'middle', fill: C.green, weight: 700 });
  const cardsZh = [
    { name: '众智园可信测试花园', role: 'TEST · 把风险留在有界分支', steps: ['到达', '状态板', '无障碍缝合', '雨水树池', '预约测试', '公园返回'], gate: '河道 / 防洪 / 交通 / 权属 / 消防 / 人工接管' },
    { name: 'AI 原点开源复核街', role: 'REVIEW · 让证据和权利可复核', steps: ['校园边界', '发布厅', '清权桌', '贡献墙', '共享学习', '安静返回'], gate: '校园通行 / 文保 / 搬迁影响 / 授权 / 撤回' },
    { name: '大钟寺日常发布客厅', role: 'RELEASE · 让通过的能力回到日常', steps: ['轨道到达', '四向过街', '安静座位', '短时展示', '普通商业', '日常回归'], gate: '轨道 / 道路 / 消防 / 客流 / 噪声 / 应急' },
  ];
  const cardsEn = [
    { name: 'Collective Intelligence trusted test garden', role: 'TEST · keep risk inside a bounded fork', steps: ['arrive', 'status', 'accessible seam', 'rain garden', 'booked test', 'park return'], gate: 'river / flood / transport / title / fire / takeover' },
    { name: 'AI Origin open review street', role: 'REVIEW · make evidence and rights reviewable', steps: ['campus edge', 'release room', 'rights desk', 'contribution', 'shared learning', 'quiet return'], gate: 'campus / heritage / displacement / licence / withdrawal' },
    { name: 'Dazhongsi everyday release room', role: 'RELEASE · return reviewed capability to daily life', steps: ['rail arrival', 'four-way crossing', 'quiet seat', 'short display', 'ordinary retail', 'daily return'], gate: 'rail / road / fire / crowd / noise / emergency' },
  ];
  const cards = zh ? cardsZh : cardsEn;
  cards.forEach((card, index) => {
    const x = 700;
    const y = 280 + index * 310;
    const color = stationColors[index];
    out += rect(x, y, 1622, 275, { fill: C.white, stroke: color, radius: 26, sw: 4 });
    out += `<rect x="${x}" y="${y}" width="16" height="275" rx="8" fill="${color}"/>`;
    out += text(x + 48, y + 58, card.name, zh ? 31 : 25, { weight: 720 });
    out += text(x + 48, y + 104, card.role, zh ? 20 : 17, { fill: color, weight: 650 });
    const startX = x + 75;
    const stepY = y + 170;
    card.steps.forEach((step, stepIndex) => {
      const cx = startX + stepIndex * 220;
      if (stepIndex < 5) out += line(cx + 24, stepY, cx + 196, stepY, { stroke: color, sw: 4 });
      out += circle(cx, stepY, 25, { fill: color, stroke: C.ink, sw: 2 });
      out += text(cx, stepY + 8, String(stepIndex + 1), 18, { anchor: 'middle', weight: 750 });
      out += text(cx, stepY + 55, step, zh ? 17 : 13, { anchor: 'middle', weight: 600 });
    });
    out += text(x + 48, y + 250, zh ? `放行门：${card.gate}` : `Gate: ${card.gate}`, zh ? 17 : 14, { fill: C.muted });
  });
  out += text(78, 1310, zh ? '不满足放行门：不测试、不合并或将活动降容至零。' : 'Failed gate: do not test, do not merge, or reduce activity to zero.', 16, { fill: C.muted });
  out += svgEnd();
  return out;
}

function buildMobility(lang) {
  const zh = lang === 'zh';
  const titleValue = zh ? '先保普通路线，再谈具身智能' : 'Keep the ordinary route open before embodied AI';
  const subtitle = zh ? '一条 9.60 km 公共主脊、三条东西缝合线和四级现场放行门' : 'A 9.60 km public spine, three east-west seams and four field-release gates';
  let out = svgStart(titleValue, false);
  out += header('MOBILITY + BLUE-GREEN RELEASE / 04', titleValue, subtitle, false, lang);
  out += rect(78, 280, 1370, 935, { fill: C.white, stroke: C.pale, radius: 30 });
  out += text(120, 340, zh ? '普通慢行、蓝绿与公共空间同图' : 'ORDINARY MOBILITY + BLUE-GREEN + PUBLIC SPACE', zh ? 28 : 22, { weight: 700 });
  const map = drawMap({ x: 140, y: 390, width: 1240, height: 720 }, { blueGreen: true, roads: true });
  out += map.out;
  out += rect(120, 1135, 1285, 54, { fill: C.greenSoft, stroke: C.green, radius: 14, sw: 2 });
  out += text(762, 1171, zh ? 'G0 普通步行、人工服务和手推车配送始终可用' : 'G0 walking, staffed service and hand-cart delivery remain available', zh ? 20 : 16, { anchor: 'middle', weight: 650 });

  out += rect(1495, 280, 827, 935, { fill: C.navy, stroke: C.navy, radius: 30 });
  out += text(1540, 340, zh ? 'S-02 路线放行阶梯' : 'S-02 ROUTE RELEASE LADDER', zh ? 28 : 22, { fill: C.white, weight: 700 });
  const gatesZh = [
    ['G0', '普通服务', '持续开放', C.green],
    ['G1', '桌面回放', `PASS ${tabletop.replayed_counts.fixtures} + ${tabletop.replayed_counts.acceptance_checks} + ${tabletop.replayed_counts.rollback_steps}`, C.blue],
    ['G2', '独立专业复核', '未完成', C.gold],
    ['G3', '有限现场窗口', 'HOLD / 未运行', C.orange],
  ];
  const gatesEn = [
    ['G0', 'Ordinary service', 'stays open', C.green],
    ['G1', 'Tabletop replay', `PASS ${tabletop.replayed_counts.fixtures} + ${tabletop.replayed_counts.acceptance_checks} + ${tabletop.replayed_counts.rollback_steps}`, C.blue],
    ['G2', 'Independent review', 'not complete', C.gold],
    ['G3', 'Bounded field window', 'HOLD / not run', C.orange],
  ];
  const gates = zh ? gatesZh : gatesEn;
  gates.forEach((gate, index) => {
    const y = 405 + index * 165;
    out += circle(1580, y, 34, { fill: gate[3], stroke: C.white, sw: 3 });
    out += text(1580, y + 9, gate[0], 20, { anchor: 'middle', weight: 800 });
    if (index < 3) out += line(1580, y + 38, 1580, y + 127, { stroke: '#46627a', sw: 4 });
    out += text(1640, y - 5, gate[1], zh ? 25 : 20, { fill: C.white, weight: 700 });
    out += text(1640, y + 35, gate[2], zh ? 20 : 17, { fill: gate[3], weight: 650 });
  });
  out += rect(1540, 1050, 737, 120, { fill: '#18364f', stroke: C.red, radius: 18, sw: 3 });
  out += text(1570, 1090, zh ? '停止触发' : 'STOP TRIGGERS', 19, { fill: C.red, weight: 750 });
  out += lines(1570, 1128, zh ? ['行人冲突 · 净宽变化 · 急停失败', '失去人工视线 · 雨洪或消防不满足'] : ['pedestrian conflict · reduced clear width · failed stop', 'lost human sight · flood or fire concern'], zh ? 17 : 14, { fill: '#d5e0e8', gap: 28 });
  out += text(78, 1310, zh ? '13.01 km 概念慢行网络；189 个 OSM 过街点仅用于筛查，须现场复核。' : '13.01 km conceptual network; 189 OSM crossings are screening inputs that require field audit.', 16, { fill: C.muted });
  out += svgEnd();
  return out;
}

function buildMetrics(lang) {
  const zh = lang === 'zh';
  const titleValue = zh ? '三本账决定一个版本能否发布' : 'Three accounts decide whether a civic version can be released';
  const subtitle = zh ? '空间账可复算 · 服务账未实测 · 版本账六项缺一不得 RELEASE' : 'Spatial account recomputes · service account remains unmeasured · version account requires all six';
  let out = svgStart(titleValue, true);
  out += header('METRICS + RELEASE EVIDENCE / 05', titleValue, subtitle, true, lang);
  const spatial = [
    [zh ? '临时范围' : 'provisional area', `${(metrics.site_area_sqm.value / 1e6).toFixed(2)} km²`, C.cyan],
    [zh ? '连续绿地' : 'green space', `${(metrics.green_ratio.value * 100).toFixed(2)}%`, C.green],
    [zh ? '公共空间' : 'public space', `${(metrics.public_space_ratio.value * 100).toFixed(2)}%`, C.blue],
    [zh ? '概念慢行网' : 'concept network', `${(metrics.design_slow_mobility_network_length_m.value / 1000).toFixed(2)} km`, C.gold],
  ];
  out += rect(78, 282, 680, 925, { fill: C.navy2, stroke: '#36516a', radius: 30 });
  out += text(120, 342, zh ? '01 空间账 / KNOWN' : '01 SPATIAL ACCOUNT / KNOWN', zh ? 28 : 22, { fill: C.white, weight: 700 });
  spatial.forEach((item, index) => {
    const y = 405 + index * 155;
    out += rect(120, y, 596, 120, { fill: '#173653', stroke: item[2], radius: 20, sw: 3 });
    out += text(150, y + 42, item[0], zh ? 18 : 15, { fill: '#a9bdcb', weight: 600 });
    out += text(684, y + 83, item[1], 34, { anchor: 'end', fill: C.white, weight: 750 });
  });
  out += text(120, 1085, zh ? '来源：包内 GeoJSON / EPSG:4548 复算' : 'Source: package GeoJSON / EPSG:4548 recalculation', zh ? 16 : 13, { fill: '#91a9bb' });
  out += text(120, 1122, zh ? '边界：不是法定面积、FAR 或工程容量' : 'Boundary: not statutory area, FAR or engineering capacity', zh ? 16 : 13, { fill: C.orange });

  out += rect(805, 282, 740, 925, { fill: C.navy2, stroke: '#36516a', radius: 30 });
  out += text(847, 342, zh ? '02 服务账 / UNKNOWN' : '02 SERVICE ACCOUNT / UNKNOWN', zh ? 28 : 22, { fill: C.white, weight: 700 });
  const unknowns = zh
    ? ['现场通行与无障碍', '公众接受与分组影响', '风热空气与雨洪绩效', '维护成本与真实 SLA', '机器人安全与服务成效']
    : ['field access and accessibility', 'public acceptance and group impacts', 'wind, heat, air and water performance', 'lifecycle cost and real SLA', 'robot safety and service impact'];
  unknowns.forEach((item, index) => {
    const y = 410 + index * 118;
    out += circle(870, y, 12, { fill: C.orange, stroke: C.orange, sw: 1 });
    out += text(905, y + 8, item, zh ? 21 : 16, { fill: '#d5e0e8', weight: 600 });
    out += text(1495, y + 8, 'HOLD', 17, { anchor: 'end', fill: C.orange, weight: 750 });
  });
  out += rect(847, 1018, 656, 130, { fill: '#102943', stroke: C.gold, radius: 18, sw: 3 });
  out += text(878, 1063, zh ? '当前唯一可复跑结果' : 'ONLY REPLAYABLE RESULT', zh ? 18 : 15, { fill: C.gold, weight: 700 });
  out += text(878, 1110, zh ? 'S-02 本地合成桌面回放 PASS' : 'S-02 local synthetic tabletop PASS', zh ? 24 : 20, { fill: C.white, weight: 700 });

  out += rect(1592, 282, 730, 925, { fill: '#102943', stroke: C.gold, radius: 30, sw: 3 });
  out += text(1635, 342, zh ? '03 版本账 / 6 OF 6 REQUIRED' : '03 VERSION ACCOUNT / 6 OF 6 REQUIRED', zh ? 27 : 20, { fill: C.gold, weight: 700 });
  const sixZh = ['问题单', '具名责任', '普通替代', '证据包', '公开决定', '修复或退役'];
  const sixEn = ['public issue', 'named owner', 'ordinary alternative', 'evidence pack', 'public decision', 'repair or retire'];
  (zh ? sixZh : sixEn).forEach((item, index) => {
    const y = 420 + index * 103;
    const color = [C.cyan, C.blue, C.green, C.gold, C.orange, C.red][index];
    out += rect(1635, y, 644, 78, { fill: '#173653', stroke: color, radius: 16, sw: 2 });
    out += text(1670, y + 50, `${String(index + 1).padStart(2, '0')}  ${item}`, zh ? 21 : 17, { fill: C.white, weight: 650 });
  });
  out += rect(1635, 1080, 644, 74, { fill: '#381f25', stroke: C.red, radius: 16, sw: 2 });
  out += text(1957, 1128, zh ? '缺一项：不得 RELEASE' : 'ONE MISSING: NO RELEASE', zh ? 22 : 18, { anchor: 'middle', fill: '#ffc5bd', weight: 750 });
  out += text(78, 1310, zh ? '空间数字可复算不等于现场服务成立；每个版本都必须公开状态、局限和退出。' : 'Recomputable spatial numbers do not establish a field service; every version publishes state, limits and exit.', 16, { fill: '#91a9bb' });
  out += svgEnd();
  return out;
}

function rangeLabel(range) {
  return `${range[0]}–${range[1]} m`;
}

function buildStationDesignSpread(lang) {
  const zh = lang === 'zh';
  const titleValue = zh ? '三处版本站：把概念关系推进到平面、剖面与容量门' : 'Three release stations: from concept links to plans, sections and capacity gates';
  const subtitle = zh ? '所有尺寸均为可替换的设计目标区间；正式边界、勘察、权属和专业复核到位后必须重算' : 'Every dimension is a replaceable design-target range and must be recalculated after official geometry, survey, title and professional review';
  let out = svgStart(titleValue, false);
  out += header('STATION DESIGN HANDOFF / 06', titleValue, subtitle, false, lang);
  const cardX = [78, 850, 1622];
  const roleShort = zh
    ? ['可绕行测试口袋', '清权—服务—安静返回', '归家主链优先，活动可归零']
    : ['bypassable test pocket', 'rights, service and quiet return', 'resident route first; event can fall to zero'];
  const flowShort = zh
    ? [
        ['普通：到达—状态—休息—返回', '维护：服务边—隔离—复原', '应急：先关测试，主链不断'],
        ['普通：校园边—人工服务—安静返回', '维护：内容/构件检查—更正回执', '应急：关发布室，疏散独立'],
        ['普通：轨道—过街—安静座—归家', '维护：清运—缺陷—日常放行', '应急：活动归零，归家不断'],
      ]
    : [
        ['BASE: arrive, status, rest, return', 'MAINTAIN: service, isolate, reinstate', 'EMERGENCY: close test, keep route'],
        ['BASE: campus edge, staff, quiet return', 'MAINTAIN: inspect, correct, receipt', 'EMERGENCY: close room, keep egress'],
        ['BASE: rail, cross, quiet seat, return', 'MAINTAIN: clear, inspect, release', 'EMERGENCY: zero event, keep route'],
      ];
  const sectionShortEn = [
    ['ordinary route', 'safety buffer', 'test branch', 'restore edge'],
    ['ordinary route', 'staffed service', 'release front', 'quiet buffer'],
    ['resident route', 'quiet care', 'event front', 'restore edge'],
  ];
  stationDelivery.stations.forEach((station, index) => {
    const x = cardX[index];
    const color = stationColors[index];
    out += rect(x, 280, 720, 930, { fill: C.white, stroke: color, radius: 26, sw: 4 });
    out += `<rect x="${x}" y="280" width="720" height="92" rx="24" fill="${color}"/>`;
    out += text(x + 30, 326, zh ? station.name_zh : station.name_en, zh ? 27 : 20, { weight: 750, fill: C.ink });
    out += text(x + 30, 355, roleShort[index], zh ? 17 : 14, { weight: 650, fill: C.ink });
    out += text(x + 30, 410, zh ? '1:500 参数平面 / 四个必需模块' : '1:500 PARAMETRIC PLAN / FOUR MODULES', zh ? 20 : 16, { weight: 700 });
    station.spatial_review.plan_modules.forEach((module, moduleIndex) => {
      const column = moduleIndex % 2;
      const row = Math.floor(moduleIndex / 2);
      const mx = x + 30 + column * 330;
      const my = 438 + row * 103;
      out += rect(mx, my, 310, 82, { fill: index === 0 ? C.greenSoft : index === 1 ? C.blueSoft : C.orangeSoft, stroke: color, radius: 14, sw: 2 });
      out += text(mx + 14, my + 31, zh ? module.name_zh : module.name_en, zh ? 15 : 12, { weight: 650 });
      const dimension = module.target_depth_m ? `${rangeLabel(module.target_width_m)} × ${rangeLabel(module.target_depth_m)}` : rangeLabel(module.target_width_m);
      out += text(mx + 14, my + 62, dimension, 14, { fill: C.muted, weight: 650 });
    });
    out += text(x + 30, 672, zh ? '1:50 接口剖面 / 区间不等于施工尺寸' : '1:50 INTERFACE SECTION / NOT CONSTRUCTION DIMENSIONS', zh ? 19 : 14, { weight: 700 });
    const bands = station.spatial_review.section_bands;
    const total = bands.reduce((sum, band) => sum + band.target_width_m[1], 0);
    let bx = x + 30;
    bands.forEach((band, bandIndex) => {
      const width = 660 * band.target_width_m[1] / total;
      const fill = [C.greenSoft, C.goldSoft, C.blueSoft, C.orangeSoft][bandIndex];
      out += `<rect x="${bx}" y="702" width="${width}" height="112" fill="${fill}" stroke="${color}" stroke-width="2"/>`;
      out += text(bx + width / 2, 748, zh ? band.name_zh : sectionShortEn[index][bandIndex], zh ? 14 : 10, { anchor: 'middle', weight: 650 });
      out += text(bx + width / 2, 781, rangeLabel(band.target_width_m), 12, { anchor: 'middle', fill: C.muted, weight: 650 });
      bx += width;
    });
    const stateLabels = zh ? ['BASE 普通开放', 'TEST 有界窗口', 'BLACKOUT 停用', 'CLOSEOUT 复原'] : ['BASE OPEN', 'TEST WINDOW', 'BLACKOUT', 'CLOSEOUT'];
    stateLabels.forEach((label, stateIndex) => {
      const sx = x + 30 + stateIndex * 165;
      out += rect(sx, 840, 152, 48, { fill: stateIndex === 0 ? C.greenSoft : stateIndex === 1 ? C.blueSoft : stateIndex === 2 ? '#f5d8d4' : C.goldSoft, stroke: stateIndex === 2 ? C.red : color, radius: 12, sw: 2 });
      out += text(sx + 76, 872, label, zh ? 12 : 10, { anchor: 'middle', weight: 700 });
    });
    out += lines(x + 32, 930, flowShort[index], zh ? 15 : 12, { fill: C.ink, gap: 31, weight: 600 });
    out += rect(x + 30, 1030, 660, 130, { fill: C.navy, stroke: C.navy, radius: 16 });
    out += text(x + 52, 1068, zh ? '容量门：五类输入取最小值' : 'CAPACITY GATE: MINIMUM OF REVIEWED INPUTS', zh ? 17 : 12, { fill: C.gold, weight: 700 });
    out += text(x + 52, 1104, zh ? '面积 / 疏散 / 人员值守 / 无障碍与安静阈值' : 'area / egress / staffed control / access and quiet thresholds', zh ? 14 : 11, { fill: '#d5e0e8' });
    out += text(x + 52, 1139, zh ? '当前：全部 null → HOLD' : 'CURRENT: all inputs null → HOLD', zh ? 17 : 14, { fill: C.orange, weight: 750 });
  });
  out += text(78, 1310, zh ? '参数可帮助比较和交接，但不能替代勘察、权属、容量、消防、市政、无障碍或施工复核。' : 'Parameters support option review and handoff; they do not replace survey, title, capacity, fire, utilities, access or construction review.', 16, { fill: C.muted });
  out += svgEnd();
  return out;
}

function buildDeliveryReadiness(lang) {
  const zh = lang === 'zh';
  const titleValue = zh ? '三站交付回执：责任、采购、人员、成本方法和退出同时入场' : 'Three-station delivery receipt: responsibility, procurement, staffing, cost method and exit together';
  const subtitle = zh ? '只定义责任类型和验收路径；真实单位、金额、许可、SLA 实绩仍未确认' : 'Defines accountable archetypes and acceptance paths only; organizations, prices, permits and observed SLA remain unconfirmed';
  let out = svgStart(titleValue, true);
  out += header('DELIVERY + OPERATIONS RECEIPT / 07', titleValue, subtitle, true, lang);
  const cardX = [78, 850, 1622];
  const roleLines = zh
    ? [
        ['规划/景观设计', '限时测试运营', '公园资产维护', '权利与数据管家', '独立无障碍/消防复核'],
        ['城市/服务设计', '发布室人工运营', '建筑与公共界面维护', '清权与档案管家', '独立文保/居民影响复核'],
        ['站区/活动设计', '活动控制室', '公共空间/商业/清运维护', '内容与数据管家', '独立轨道/交通/消防复核'],
      ]
    : [
        ['planning + landscape design', 'time-bounded test operator', 'park asset maintenance', 'rights and data steward', 'independent access/fire review'],
        ['urban + service design', 'staffed release-room operator', 'building/public-edge maintenance', 'rights and archive steward', 'independent heritage/resident review'],
        ['station + event design', 'event control room', 'public/retail/cleaning maintenance', 'content and data steward', 'independent rail/traffic/fire review'],
      ];
  const slaLines = zh
    ? [
        ['障碍即停；15 分钟内隔离', '停止决定 15 分钟内更新状态板', '重开前签署主链与地面复原检查'],
        ['权利争议内容立即隐藏', '1 个工作日受理，5 个工作日给状态', '确认无效后 48 小时内移除或替换'],
        ['消防/客流/积水/噪声越线即归零', '计划闭场后 30 分钟内复原检查', '14 日内公开缺陷、投诉与影响复盘'],
      ]
    : [
        ['stop on obstruction; isolate within 15 min', 'update status board within 15 min', 'signed route/surface check before reopening'],
        ['hide disputed content immediately', 'acknowledge in 1 day; status in 5 days', 'remove/replace within 48 h after confirmation'],
        ['zero capacity on fire/crowd/water/noise breach', 'signed recovery check within 30 min', 'public defect/complaint review within 14 days'],
      ];
  stationDelivery.stations.forEach((station, index) => {
    const x = cardX[index];
    const color = stationColors[index];
    out += rect(x, 280, 720, 790, { fill: C.navy2, stroke: color, radius: 26, sw: 4 });
    out += text(x + 32, 330, zh ? station.name_zh : station.name_en, zh ? 25 : 19, { fill: C.white, weight: 750 });
    out += text(x + 32, 370, zh ? '六类责任角色 / 全部待确认' : 'SIX RESPONSIBILITY ROLES / ALL UNCONFIRMED', zh ? 17 : 13, { fill: color, weight: 700 });
    out += lines(x + 48, 415, roleLines[index].map((item) => `• ${item}`), zh ? 16 : 13, { fill: '#d5e0e8', gap: 31 });
    out += line(x + 32, 590, x + 688, 590, { stroke: '#36516a', sw: 2 });
    out += text(x + 32, 630, zh ? '采购与成本边界' : 'PROCUREMENT + COST BOUNDARY', zh ? 18 : 14, { fill: C.gold, weight: 700 });
    out += text(x + 48, 670, zh ? '勘察 → 可逆样机 → 独立验收' : 'survey → reversible mock-up → independent acceptance', zh ? 15 : 12, { fill: '#d5e0e8' });
    out += text(x + 48, 704, zh ? '限时服务 → 保留 / 重做 / 退出' : 'time-bounded service → retain / redesign / retire', zh ? 15 : 12, { fill: '#d5e0e8' });
    out += text(x + 48, 744, zh ? '金额：unknown；按构件、人员、维护和复原询价' : 'Price: unknown; QS by component, staff, upkeep and reinstatement', zh ? 14 : 11, { fill: C.orange, weight: 650 });
    out += text(x + 32, 800, zh ? '服务目标 / 尚未现场观测' : 'SERVICE TARGETS / NOT FIELD OBSERVED', zh ? 18 : 14, { fill: C.cyan, weight: 700 });
    out += lines(x + 48, 842, slaLines[index].map((item) => `• ${item}`), zh ? 14 : 11, { fill: '#d5e0e8', gap: 34 });
    out += rect(x + 32, 958, 656, 76, { fill: '#381f25', stroke: C.red, radius: 14, sw: 2 });
    out += text(x + 360, 1005, zh ? '任一责任、容量或复原门不清：保持 HOLD' : 'UNCLEAR DUTY, CAPACITY OR RESTORE GATE: HOLD', zh ? 16 : 12, { anchor: 'middle', fill: '#ffc5bd', weight: 750 });
  });
  out += rect(78, 1110, 2264, 122, { fill: '#102943', stroke: C.gold, radius: 20, sw: 3 });
  out += text(110, 1150, zh ? '六道共享交付门' : 'SIX SHARED DELIVERY GATES', zh ? 20 : 16, { fill: C.gold, weight: 750 });
  const gates = zh
    ? ['尺寸可替换', '普通路线独立', '容量输入未齐不放行', '单位与金额不冒认', '测试必有停用与复原', '永久保留另走法定程序']
    : ['replaceable dimensions', 'independent ordinary route', 'no capacity release without inputs', 'no invented owner or price', 'test includes blackout + closeout', 'retention enters statutory process'];
  gates.forEach((gate, index) => {
    const gx = 110 + index * 365;
    out += text(gx, 1196, `${index + 1}. ${gate}`, zh ? 14 : 11, { fill: '#d5e0e8', weight: 600 });
  });
  out += text(78, 1310, zh ? '本页是交付问题清单，不是预算、采购文件、组织承诺、许可或已达到的服务水平。' : 'This is a delivery question set, not a budget, procurement document, organizational commitment, permit or achieved service level.', 16, { fill: '#91a9bb' });
  out += svgEnd();
  return out;
}

async function writeFigure(stem, language, svg) {
  const suffix = language === 'zh' ? '' : '.en';
  const svgPath = path.join(figureDir, `${stem}${suffix}.svg`);
  const pngPath = path.join(figureDir, `${stem}${suffix}.png`);
  fs.writeFileSync(svgPath, svg, 'utf8');
  await sharp(Buffer.from(svg)).resize(W, H, { fit: 'fill' }).png().toFile(pngPath);
  process.stdout.write(`${path.relative(packageRoot, svgPath)} -> ${path.relative(packageRoot, pngPath)}\n`);
}

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function updateCopyrightLedger() {
  const ledgerPath = path.join(__dirname, 'copyright-ledger.json');
  const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
  const byPath = new Map(ledger.assets.map((asset) => [asset.path, asset]));
  const stems = ['site-overview', 'land-use-structure', 'key-areas', 'mobility-bluegreen', 'metrics-evidence', 'open-pulse-station-design', 'open-pulse-delivery-readiness'];
  const specs = [];
  for (const stem of stems) {
    for (const suffix of ['.png', '.en.png', '.svg', '.en.svg']) {
      specs.push({
        path: `assets/figures/${stem}${suffix}`,
        asset_class: suffix.endsWith('.svg') ? 'authored_vector_figure' : 'derived_figure',
        generation_method: 'generated locally by build-open-pulse-review-boards.js from registered package geometry, metrics and civic release evidence; no remote asset fetch',
        source_inputs: ['geometry/site_boundary.geojson', 'geometry/key_areas.geojson', 'geometry/land_use.geojson', 'geometry/roads.geojson', 'metrics.json', 'visual/assets/civic-pulse-protocol.json', 'visual/assets/open-pulse-tabletop-evidence.json'],
        attribution: 'Self-generated bilingual review board. Provisional geometry and synthetic tabletop status remain explicit.',
      });
    }
  }
  specs.push({
    path: 'visual/assets/build-open-pulse-review-boards.js',
    asset_class: 'self_generated_render_script',
    generation_method: 'authored in the submission worktree to render fourteen bilingual SVG/PNG review figures',
    source_inputs: ['geometry/*.geojson', 'metrics.json', 'visual/assets/civic-pulse-protocol.json', 'visual/assets/open-pulse-tabletop-evidence.json', 'visual/assets/open-pulse-station-delivery-contract.json'],
    attribution: 'Self-generated renderer with evidence-state assertions and no network request.',
  });
  specs.push({
    path: 'visual/assets/build-open-pulse-booklets.js',
    asset_class: 'self_generated_render_script',
    generation_method: 'authored in the submission worktree to assemble the seven bilingual review boards into true-size A3 and A0 PDFs',
    source_inputs: ['assets/figures/site-overview*.png', 'assets/figures/land-use-structure*.png', 'assets/figures/key-areas*.png', 'assets/figures/mobility-bluegreen*.png', 'assets/figures/metrics-evidence*.png', 'assets/figures/open-pulse-station-design*.png', 'assets/figures/open-pulse-delivery-readiness*.png'],
    attribution: 'Self-generated offline pdf-lib renderer; no remote asset fetch.',
  });
  specs.push({
    path: 'visual/assets/run-open-pulse-claim-provenance.js',
    asset_class: 'self_generated_audit_script',
    generation_method: 'authored in the submission worktree to verify registered values, bilingual visible metric equivalence and report traceability without forcing archived metrics into the review copy',
    source_inputs: ['metrics.json', 'proposal.md', 'proposal.en.md', 'report/proposal.html', 'report/proposal.en.html', 'visual/assets/claim-provenance.json'],
    attribution: 'Self-generated offline audit; no network request and no field-performance inference.',
  });
  for (const [assetPath, assetClass, method, inputs, attribution] of [
    ['assets/figures/open-pulse-service-equivalence-atlas.svg', 'authored_vector_figure', 'authored in the submission worktree from the registered ordinary-service equivalence contract', ['visual/assets/open-pulse-service-equivalence-atlas.json'], 'Self-generated Chinese evidence atlas; no remote asset fetch.'],
    ['assets/figures/open-pulse-service-equivalence-atlas.en.svg', 'authored_vector_figure', 'authored in the submission worktree as the equivalent English evidence atlas', ['visual/assets/open-pulse-service-equivalence-atlas.json'], 'Self-generated English evidence atlas; no remote asset fetch.'],
    ['visual/assets/open-pulse-service-equivalence-atlas.json', 'metadata_or_matrix', 'authored in the submission worktree to connect ordinary routes, bounded AI gains, stop rules and restoration receipts', ['visual/assets/scenario-operation-matrix.json', 'visual/assets/operations-matrix.json', 'visual/assets/key-area-node-plans.json', 'visual/assets/persona-and-inclusion-matrix.json'], 'Self-generated structural contract with explicit HOLD and no-field-result boundary.'],
    ['visual/assets/run-open-pulse-service-equivalence.js', 'self_generated_audit_script', 'authored in the submission worktree to replay the ordinary-service equivalence contract offline', ['visual/assets/open-pulse-service-equivalence-atlas.json'], 'Self-generated offline runner; no network request or field authorization.'],
    ['visual/assets/test-open-pulse-service-equivalence.js', 'self_generated_regression_test', 'authored in the submission worktree to prove duplicate, unknown-route and unregistered-decision fixtures fail closed', ['visual/assets/run-open-pulse-service-equivalence.js', 'visual/assets/open-pulse-service-equivalence-atlas.json'], 'Self-generated offline regression test; temporary fixtures are isolated outside the package.'],
    ['visual/assets/open-pulse-station-delivery-contract.json', 'metadata_or_matrix', 'authored in the submission worktree to parameterize three station plans, sections, capacity gates, ownership interfaces, delivery roles, procurement, service targets and rollback', ['visual/assets/key-area-node-plans.json', 'visual/assets/operations-matrix.json', 'visual/assets/construction-readiness.json', 'visual/assets/open-pulse-spatial-decision.json'], 'Self-generated design-review contract. Dimensions are replaceable targets; field facts, organizations, prices and authorization remain absent.'],
    ['visual/assets/run-open-pulse-station-delivery.js', 'self_generated_audit_script', 'authored in the submission worktree to keep station delivery evidence fail-closed', ['visual/assets/open-pulse-station-delivery-contract.json'], 'Self-generated offline runner; no network request or field inference.'],
    ['visual/assets/test-open-pulse-station-delivery.js', 'self_generated_regression_test', 'authored in the submission worktree to reject invented observations, capacities, owners, costs and missing rollback', ['visual/assets/run-open-pulse-station-delivery.js', 'visual/assets/open-pulse-station-delivery-contract.json'], 'Self-generated offline regression test with isolated temporary fixtures.'],
  ]) {
    specs.push({ path: assetPath, asset_class: assetClass, generation_method: method, source_inputs: inputs, attribution });
  }
  for (const pdfPath of ['drawings/a3-booklet.pdf', 'drawings/a3-booklet.en.pdf', 'drawings/a0-boards.pdf', 'drawings/a0-boards.en.pdf']) {
    specs.push({
      path: pdfPath,
      asset_class: 'derived_review_booklet',
      generation_method: 'generated locally by build-open-pulse-booklets.js from the seven registered bilingual PNG review boards',
      source_inputs: ['assets/figures/site-overview*.png', 'assets/figures/land-use-structure*.png', 'assets/figures/key-areas*.png', 'assets/figures/mobility-bluegreen*.png', 'assets/figures/metrics-evidence*.png', 'assets/figures/open-pulse-station-design*.png', 'assets/figures/open-pulse-delivery-readiness*.png'],
      attribution: 'Self-generated review PDF. Provisional geometry and evidence-state boundaries remain printed on every source board.',
    });
  }
  for (const spec of specs) {
    const filePath = path.join(packageRoot, spec.path);
    const entry = {
      author: '许丙南 / Codex',
      third_party_materials: [],
      license: 'COMMUNITY-DISPLAY-ONLY',
      clearance_status: 'self_generated_or_official_public_with_attribution',
      font_note: 'Rendered with local system CJK-capable fonts; no font file is redistributed.',
      ...spec,
      hash_sha256: sha256(filePath),
    };
    if (byPath.has(spec.path)) Object.assign(byPath.get(spec.path), entry);
    else ledger.assets.push(entry);
  }
  for (const asset of ledger.assets) {
    if (!asset.path) continue;
    const filePath = path.join(packageRoot, asset.path);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) asset.hash_sha256 = sha256(filePath);
  }
  fs.writeFileSync(ledgerPath, `${JSON.stringify(ledger, null, 2)}\n`, 'utf8');
}

function updateManifest() {
  const manifestPath = path.join(packageRoot, 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const byPath = new Map(manifest.files.map((item) => [item.path, item]));
  const stems = ['site-overview', 'land-use-structure', 'key-areas', 'mobility-bluegreen', 'metrics-evidence', 'open-pulse-station-design', 'open-pulse-delivery-readiness'];
  const paths = [];
  for (const stem of stems) {
    paths.push([`assets/figures/${stem}.svg`, 'figure_source', 'zh', null]);
    paths.push([`assets/figures/${stem}.en.svg`, 'figure_source', 'en', `assets/figures/${stem}.svg`]);
  }
  paths.push(['visual/assets/build-open-pulse-review-boards.js', 'visualization', null, null]);
  paths.push(['visual/assets/build-open-pulse-booklets.js', 'visualization', null, null]);
  paths.push(['assets/figures/open-pulse-service-equivalence-atlas.svg', 'figure_source', 'zh', null]);
  paths.push(['assets/figures/open-pulse-service-equivalence-atlas.en.svg', 'figure_source', 'en', 'assets/figures/open-pulse-service-equivalence-atlas.svg']);
  paths.push(['assets/figures/open-pulse-station-design.png', 'proposal_figure', 'zh', null]);
  paths.push(['assets/figures/open-pulse-station-design.en.png', 'proposal_figure', 'en', 'assets/figures/open-pulse-station-design.png']);
  paths.push(['assets/figures/open-pulse-delivery-readiness.png', 'proposal_figure', 'zh', null]);
  paths.push(['assets/figures/open-pulse-delivery-readiness.en.png', 'proposal_figure', 'en', 'assets/figures/open-pulse-delivery-readiness.png']);
  paths.push(['visual/assets/open-pulse-service-equivalence-atlas.json', 'evidence_register', 'neutral', null]);
  paths.push(['visual/assets/run-open-pulse-service-equivalence.js', 'validation_runner', 'neutral', null]);
  paths.push(['visual/assets/test-open-pulse-service-equivalence.js', 'regression_test', 'neutral', null]);
  paths.push(['visual/assets/open-pulse-station-delivery-contract.json', 'evidence_register', 'neutral', null]);
  paths.push(['visual/assets/run-open-pulse-station-delivery.js', 'validation_runner', 'neutral', null]);
  paths.push(['visual/assets/test-open-pulse-station-delivery.js', 'regression_test', 'neutral', null]);
  for (const [filePath, role, language, translationOf] of paths) {
    const item = byPath.get(filePath) || { path: filePath, role, required: false };
    item.role = role;
    item.required = false;
    if (language) item.language = language;
    if (translationOf) item.translation_of = translationOf;
    if (!byPath.has(filePath)) manifest.files.push(item);
  }
  for (const item of manifest.files) {
    if (!item.path || item.path === 'manifest.json') continue;
    const filePath = path.join(packageRoot, item.path);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) item.sha256 = sha256(filePath);
  }
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
}

async function main() {
  const builders = [
    ['site-overview', buildSiteOverview],
    ['land-use-structure', buildLandUse],
    ['key-areas', buildKeyAreas],
    ['mobility-bluegreen', buildMobility],
    ['metrics-evidence', buildMetrics],
    ['open-pulse-station-design', buildStationDesignSpread],
    ['open-pulse-delivery-readiness', buildDeliveryReadiness],
  ];
  for (const [stem, builder] of builders) {
    await writeFigure(stem, 'zh', builder('zh'));
    await writeFigure(stem, 'en', builder('en'));
  }
  updateCopyrightLedger();
  updateManifest();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
