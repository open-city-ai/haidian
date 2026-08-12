#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const packageRoot = path.resolve(__dirname, '..', '..');
const figureDir = path.join(packageRoot, 'assets', 'figures');
const sharpModule = process.env.OPEN_PULSE_SHARP_MODULE || 'sharp';
const sharp = require(sharpModule);

const tabletop = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'open-pulse-tabletop-evidence.json'), 'utf8'),
);
const testWindow = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'example-s02-embodied-test-window.json'), 'utf8'),
);

if (tabletop.tabletop_status !== 'pass') {
  throw new Error('Expected a passing local synthetic tabletop record.');
}
if (tabletop.operational_status !== 'not_authorized_not_run') {
  throw new Error('Operational boundary changed; review the board wording before rendering.');
}
if (testWindow.release_decision?.decision !== 'hold') {
  throw new Error('Expected the bounded field window to remain on hold.');
}

const replay = tabletop.replayed_counts;
const C = {
  paper: '#f6f3ed',
  ink: '#14283a',
  muted: '#61788b',
  line: '#c6d3d3',
  green: '#73a892',
  greenSoft: '#e1eee8',
  blue: '#88ace1',
  blueSoft: '#e3ecf8',
  orange: '#ea8f5c',
  orangeSoft: '#f8e8dd',
  gold: '#e3bb58',
  goldSoft: '#f5edda',
  white: '#fffdf9',
};

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
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}" fill="${fill}" letter-spacing="${letter}">${esc(value)}</text>`;
}

function lines(x, y, values, size, options = {}) {
  const gap = options.gap || Math.round(size * 1.42);
  return values.map((value, index) => text(x, y + index * gap, value, size, options)).join('');
}

function rect(x, y, width, height, options = {}) {
  const fill = options.fill || C.white;
  const stroke = options.stroke || C.line;
  const sw = options.sw || 3;
  const radius = options.radius ?? 24;
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
}

function line(x1, y1, x2, y2, options = {}) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${options.stroke || C.ink}" stroke-width="${options.sw || 4}" stroke-linecap="round"${options.dash ? ` stroke-dasharray="${options.dash}"` : ''}/>`;
}

function circle(cx, cy, radius, options = {}) {
  return `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${options.fill || C.white}" stroke="${options.stroke || C.ink}" stroke-width="${options.sw || 4}"/>`;
}

function svgStart(width, height, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(title)}"><rect width="${width}" height="${height}" fill="${C.paper}"/><g font-family="Arial, PingFang SC, Noto Sans CJK SC, sans-serif">`;
}

function svgEnd() {
  return '</g></svg>\n';
}

function statusCard(x, y, width, height, accent, label, headline, body, extra, compact = false) {
  const labelSize = compact ? 19 : 25;
  const headlineSize = compact ? 28 : 38;
  const bodySize = compact ? 18 : 25;
  const bodyGap = compact ? 27 : 36;
  return [
    rect(x, y, width, height, { fill: C.white, stroke: C.line, radius: 22 }),
    `<rect x="${x}" y="${y}" width="14" height="${height}" rx="7" fill="${accent}"/>`,
    text(x + 42, y + 50, label, labelSize, { fill: accent, weight: 650, letter: 0.5 }),
    text(x + 42, y + 105, headline, headlineSize, { weight: 700 }),
    lines(x + 42, y + 155, body, bodySize, { fill: C.muted, gap: bodyGap }),
    extra ? text(x + width - 42, y + 50, extra, compact ? 17 : 23, { anchor: 'end', fill: C.muted }) : '',
  ].join('');
}

function buildSiteOverview(lang) {
  const zh = lang === 'zh';
  const t = zh ? {
    meta: 'JING-ZHANG OPEN PULSE / REVIEW ENTRY 01',
    version: 'V2.4 / PROVISIONAL / CONCEPT ONLY',
    title: '一轴三站两翼，接入一张可停止的证据回路',
    subtitle: '整带关系与 S-02 当前状态同屏，先分清桌面回放、现场窗口和普通服务',
    interface: '任务书协同接口，只作概念建议，不代表已经确认合作',
    partners: ['北纬社区 / 海淀高校', '未来科学城', '怀柔科学城', '北京经开区', '京津冀协同网络'],
    mapTitle: '一轴三站两翼 / WHOLE-BELT RELATION',
    west: '中关村科技服务翼',
    westSub: '企业 / 人才 / 资本 / 服务接口',
    east: '小月河场景协作翼',
    eastSub: '社区 / 蓝绿 / 日常问题接口',
    nodes: [
      ['众智园', '可信研发 / 问题验证'],
      ['AI 原点', '开源转化 / 贡献回执'],
      ['大钟寺', '城市体验 / 日常会客'],
    ],
    axis: '主轴保持普通公共使用，两翼仅作协作接口',
    receiptTitle: 'S-02 样例回执 / 低速配送机器人',
    question: ['问题', '能否礼让行人并返回泊位，同时保持无障碍路线连续？'],
    tabletopLabel: '本地合成桌面回放',
    tabletopHead: `PASS  ${replay.fixtures} + ${replay.acceptance_checks} + ${replay.rollback_steps}`,
    tabletopBody: ['只复现停止、撤回和恢复逻辑', '零网络、零真实交易、零现场运行'],
    fieldLabel: '有限现场窗口',
    fieldHead: 'HOLD / 未授权 / 未运行',
    fieldBody: ['路线、无障碍、安全和责任主体证据不足', '当前不得进入公共路线或开展真实配送'],
    gateLabel: '下一道门',
    gateHead: '独立无障碍与安全复核',
    gateBody: ['先确认场地、路线、许可、维护责任和人工接管', '通过后才可讨论一段有见证的有限测试'],
    ordinary: '普通服务',
    ordinaryBody: '步行路线持续开放，手推车或人工配送保持可用；任何人可要求停止。',
    boundary: '判读边界',
    boundaryBody: '桌面 PASS 只证明离线夹具可复跑，不代表机器人性能、公共接受、安全、许可或部署。',
    footer: '来源  package geometry + S-02 tabletop evidence + bounded test-window record / no new claims',
    author: '许丙南 × Codex / V2.4',
  } : {
    meta: 'JING-ZHANG OPEN PULSE / REVIEW ENTRY 01',
    version: 'V2.4 / PROVISIONAL / CONCEPT ONLY',
    title: 'One spine, three stations, two wings and a stoppable evidence loop',
    subtitle: 'Read the whole-belt relation and S-02 state together; separate tabletop replay, field window and ordinary service',
    interface: 'Taskbook collaboration interfaces only; no partnership is claimed',
    partners: ['North Latitude / Haidian universities', 'Future Science City', 'Huairou Science City', 'Beijing E-Town', 'Beijing-Tianjin-Hebei network'],
    mapTitle: 'ONE SPINE, THREE STATIONS, TWO WINGS',
    west: 'Zhongguancun service wing',
    westSub: 'enterprise / talent / capital / services',
    east: 'Xiaoyue River scenario wing',
    eastSub: 'community / blue-green / everyday issues',
    nodes: [
      ['Collective Intelligence Garden', 'trusted R&D / problem validation'],
      ['AI Origin', 'open-source translation / contribution receipt'],
      ['Dazhongsi', 'urban experience / everyday meeting place'],
    ],
    axis: 'Ordinary public use stays on the spine; the wings are interfaces only',
    receiptTitle: 'S-02 SAMPLE RECEIPT / LOW-SPEED DELIVERY ROBOT',
    question: ['Question', 'Can it yield and return to its bay without blocking the accessible route?'],
    tabletopLabel: 'LOCAL SYNTHETIC TABLETOP',
    tabletopHead: `PASS  ${replay.fixtures} + ${replay.acceptance_checks} + ${replay.rollback_steps}`,
    tabletopBody: ['Replays stop, withdrawal and restoration logic only', 'Zero network or real transaction', 'Zero field operation'],
    fieldLabel: 'BOUNDED FIELD WINDOW',
    fieldHead: 'HOLD / NOT AUTHORIZED / NOT RUN',
    fieldBody: ['Route, accessibility and safety evidence is absent', 'Accountable owner is not assigned', 'No live public route or delivery may start'],
    gateLabel: 'NEXT GATE',
    gateHead: 'Independent accessibility and safety review',
    gateBody: ['Confirm place, route and permission first', 'Assign maintenance and human takeover', 'Only then consider one witnessed bounded test'],
    ordinary: 'ORDINARY SERVICE',
    ordinaryBody: 'Walking stays open; hand-cart or human delivery remains available. Any person may ask to stop.',
    boundary: 'READING BOUNDARY',
    boundaryBody: 'Tabletop PASS proves an offline fixture can replay. It does not prove robot performance, safety, permission or deployment.',
    footer: 'SOURCE  package geometry + S-02 tabletop evidence + bounded test-window record / no new claims',
    author: 'Xu Bingnan × Codex / V2.4',
  };

  let out = svgStart(3600, 2250, t.title);
  out += text(120, 118, t.meta, 31, { fill: C.muted, letter: 1.1 });
  out += text(3480, 118, t.version, 29, { anchor: 'end', fill: C.orange, letter: 0.8 });
  out += text(120, 232, t.title, zh ? 79 : 54, { weight: 700 });
  out += text(120, 318, t.subtitle, zh ? 39 : 27, { fill: C.muted });
  out += line(120, 365, 3480, 365, { stroke: C.line, sw: 3 });
  out += text(120, 425, t.interface, 28, { fill: '#078f95' });

  const boxWidth = 648;
  t.partners.forEach((partner, index) => {
    const x = 120 + index * 672;
    out += rect(x, 452, boxWidth, 76, { fill: '#eef3f1', stroke: C.line, radius: 22, sw: 2 });
    out += text(x + boxWidth / 2, 502, partner, zh ? 25 : 20, { anchor: 'middle', weight: 520 });
  });

  out += rect(120, 585, 2150, 1440, { fill: '#fffefa', stroke: C.line, radius: 34 });
  out += text(180, 660, t.mapTitle, zh ? 38 : 28, { weight: 700 });
  out += rect(200, 720, 815, 1120, { fill: C.greenSoft, stroke: C.green, radius: 30 });
  out += rect(1375, 720, 815, 1120, { fill: C.blueSoft, stroke: C.blue, radius: 30 });
  out += text(285, 805, t.west, 35, { weight: 650 });
  out += text(285, 852, t.westSub, 25, { fill: C.muted });
  out += text(2105, 805, t.east, 35, { anchor: 'end', weight: 650 });
  out += text(2105, 852, t.eastSub, 25, { anchor: 'end', fill: C.muted });
  out += line(1195, 760, 1195, 1810, { stroke: C.ink, sw: 18 });

  const nodeY = [910, 1235, 1560];
  const nodeColors = [C.green, C.blue, C.orange];
  t.nodes.forEach((node, index) => {
    const y = nodeY[index];
    out += rect(760, y - 90, 870, 180, { fill: index === 0 ? C.greenSoft : index === 1 ? C.blueSoft : C.orangeSoft, stroke: nodeColors[index], radius: 28, sw: 5 });
    out += line(760, y, 660, y, { stroke: nodeColors[index], sw: 6 });
    out += line(1630, y, 1730, y, { stroke: nodeColors[index], sw: 6 });
    out += circle(1195, y, 35, { fill: C.gold, stroke: C.ink, sw: 5 });
    out += text(835, y - 10, node[0], zh ? 38 : 20, { weight: 680 });
    out += text(835, y + 45, node[1], zh ? 25 : 16, { fill: C.muted });
  });
  out += text(1195, 1905, t.axis, zh ? 26 : 22, { anchor: 'middle', fill: C.muted });

  out += rect(2350, 585, 1130, 1440, { fill: '#fffefa', stroke: C.line, radius: 34 });
  out += text(2410, 660, t.receiptTitle, zh ? 36 : 22, { weight: 700 });
  out += text(2410, 720, t.question[0], 24, { fill: C.muted, weight: 650 });
  out += lines(2410, 765, [t.question[1]], zh ? 27 : 18, { gap: 29 });
  out += statusCard(2410, 835, 1010, 250, C.green, t.tabletopLabel, t.tabletopHead, t.tabletopBody, 'LOCAL / SYNTHETIC', !zh);
  out += statusCard(2410, 1115, 1010, 250, C.orange, t.fieldLabel, t.fieldHead, t.fieldBody, 'FIELD / HOLD', !zh);
  out += statusCard(2410, 1395, 1010, 250, C.blue, t.gateLabel, t.gateHead, t.gateBody, 'G2', !zh);
  out += rect(2410, 1675, 1010, 130, { fill: C.greenSoft, stroke: C.green, radius: 22, sw: 2 });
  out += text(2450, 1722, t.ordinary, 24, { fill: C.green, weight: 700 });
  out += lines(2450, 1762, [t.ordinaryBody], zh ? 23 : 16, { fill: C.ink });
  out += rect(2410, 1830, 1010, 150, { fill: C.goldSoft, stroke: C.gold, radius: 22, sw: 2 });
  out += text(2450, 1878, t.boundary, 24, { fill: '#9c7319', weight: 700 });
  out += lines(2450, 1918, [t.boundaryBody], zh ? 22 : 15, { fill: C.ink });

  out += text(120, 2182, t.footer, 22, { fill: C.muted, letter: 0.3 });
  out += text(3480, 2182, t.author, 22, { anchor: 'end', fill: C.muted });
  out += svgEnd();
  return out;
}

function buildMobility(lang) {
  const zh = lang === 'zh';
  const t = zh ? {
    meta: 'JING-ZHANG OPEN PULSE / MOBILITY + PUBLIC ROUTE GATES',
    version: 'V2.4 / PROVISIONAL / CONCEPT ONLY',
    title: '04 / 先保普通路线，再谈具身智能',
    subtitle: '慢行、蓝绿与 S-02 共用一套放行顺序；桌面回放通过不等于现场可用',
    nodes: [['众智园', '验证'], ['AI 原点', '转化'], ['大钟寺', '会客']],
    corridor: '普通慢行主轴',
    wings: '两翼接口',
    ladder: 'S-02 路线放行梯',
    steps: [
      ['G0', '普通服务保持可用', '步行路线、人工服务与手推车不因测试关闭', C.green],
      ['G1', `合成桌面回放 PASS`, `${replay.fixtures} 夹具 / ${replay.acceptance_checks} 检查 / ${replay.rollback_steps} 恢复步骤`, C.blue],
      ['G2', '有限现场窗口 HOLD', '场地、无障碍、安全、许可、维护责任与接管证据未齐', C.orange],
      ['G3+', '现场绩效保持 unknown', '未授权、未运行，不给出通行、安全或服务效果结论', C.gold],
    ],
    stop: '停止触发',
    stopBody: '行人冲突、路线变窄、停止信号失败、接管人失去视线或泊位不可用，立即清空设备并恢复普通路线。',
    metrics: [['慢行网络', '13.01 km', 'concept network'], ['东西连接', '3 条', 'key-area connectors'], ['公共空间', '7.33%', 'directly recomputable'], ['映射过街点', '189', 'low-confidence OSM']],
    footer: '来源  roads.geojson + metrics.json + S-02 tabletop evidence / 交通安全、无障碍和工程承载仍待现场审计',
    author: '许丙南 × Codex / V2.4',
  } : {
    meta: 'JING-ZHANG OPEN PULSE / MOBILITY + PUBLIC ROUTE GATES',
    version: 'V2.4 / PROVISIONAL / CONCEPT ONLY',
    title: '04 / Keep the ordinary route open before embodied AI',
    subtitle: 'Walking, blue-green space and S-02 share one release order; tabletop PASS does not establish field readiness',
    nodes: [['Collective Intelligence Garden', 'validate'], ['AI Origin', 'translate'], ['Dazhongsi', 'meet']],
    corridor: 'ordinary slow-mobility spine',
    wings: 'two interface wings',
    ladder: 'S-02 ROUTE RELEASE LADDER',
    steps: [
      ['G0', 'Ordinary service stays available', 'Walking, human service and hand-cart delivery do not close for a test', C.green],
      ['G1', 'Synthetic tabletop PASS', `${replay.fixtures} fixtures / ${replay.acceptance_checks} checks / ${replay.rollback_steps} restoration steps`, C.blue],
      ['G2', 'Bounded field window HOLD', 'Place, accessibility, safety, permission, maintenance and takeover evidence is absent', C.orange],
      ['G3+', 'Field performance remains unknown', 'Not authorized or run; no mobility, safety or service result is claimed', C.gold],
    ],
    stop: 'STOP TRIGGERS',
    stopBody: 'Pedestrian conflict, route narrowing, stop-signal failure, loss of spotter sight or unavailable return bay clears the device and restores the ordinary route.',
    metrics: [['Slow-mobility network', '13.01 km', 'concept network'], ['East-west links', '3', 'key-area connectors'], ['Public space', '7.33%', 'directly recomputable'], ['Mapped crossings', '189', 'low-confidence OSM']],
    footer: 'SOURCE  roads.geojson + metrics.json + S-02 tabletop evidence / field safety, accessibility and engineering capacity remain unaudited',
    author: 'Xu Bingnan × Codex / V2.4',
  };

  let out = svgStart(1800, 1080, t.title);
  out += text(80, 66, t.meta, 19, { fill: C.muted, letter: 0.7 });
  out += text(1720, 66, t.version, 18, { anchor: 'end', fill: C.orange, letter: 0.5 });
  out += text(80, 132, t.title, zh ? 49 : 35, { weight: 700 });
  out += text(80, 178, t.subtitle, zh ? 23 : 16, { fill: C.muted });
  out += line(80, 205, 1720, 205, { stroke: C.line, sw: 2 });

  out += rect(80, 240, 650, 600, { fill: '#fffefa', stroke: C.line, radius: 26 });
  out += text(120, 292, t.corridor, 25, { weight: 650 });
  out += text(690, 292, t.wings, 20, { anchor: 'end', fill: C.muted });
  out += line(250, 340, 250, 750, { stroke: C.ink, sw: 10 });
  out += `<path d="M250 360 C85 410,85 680,250 730" fill="none" stroke="${C.blue}" stroke-width="5"/>`;
  out += `<path d="M250 360 C430 410,430 680,250 730" fill="none" stroke="${C.green}" stroke-width="5"/>`;
  const ys = [400, 545, 690];
  t.nodes.forEach((node, index) => {
    const color = index === 0 ? C.green : index === 1 ? C.blue : C.orange;
    out += circle(250, ys[index], 18, { fill: color, stroke: C.ink, sw: 3 });
    out += line(270, ys[index], 335, ys[index], { stroke: color, sw: 4 });
    out += rect(335, ys[index] - 42, 330, 84, { fill: index === 0 ? C.greenSoft : index === 1 ? C.blueSoft : C.orangeSoft, stroke: color, radius: 18, sw: 3 });
    out += text(365, ys[index] + 2, node[0], zh ? 25 : 14, { weight: 650 });
    out += text(635, ys[index] + 2, node[1], zh ? 18 : 12, { anchor: 'end', fill: C.muted });
  });
  out += rect(120, 770, 570, 44, { fill: C.greenSoft, stroke: C.green, radius: 14, sw: 2 });
  out += text(405, 799, zh ? '普通路线持续开放，测试服从日常通行' : 'Ordinary route stays open; testing yields to daily use', zh ? 19 : 12, { anchor: 'middle', weight: 620 });

  out += rect(770, 240, 950, 600, { fill: '#fffefa', stroke: C.line, radius: 26 });
  out += text(815, 292, t.ladder, zh ? 25 : 19, { weight: 700 });
  const stepYs = [350, 455, 560, 665];
  t.steps.forEach((step, index) => {
    const y = stepYs[index];
    out += circle(835, y, 27, { fill: step[3], stroke: C.ink, sw: 3 });
    out += text(835, y + 7, step[0], step[0].length > 2 ? 15 : 17, { anchor: 'middle', weight: 700 });
    if (index < t.steps.length - 1) out += line(835, y + 29, 835, stepYs[index + 1] - 29, { stroke: C.line, sw: 4 });
    out += text(890, y - 4, step[1], zh ? 24 : 16, { weight: 680 });
    out += text(890, y + 30, step[2], zh ? 17 : 11, { fill: C.muted });
  });
  out += rect(810, 730, 865, 82, { fill: C.goldSoft, stroke: C.gold, radius: 18, sw: 2 });
  out += text(845, 764, t.stop, 18, { fill: '#9c7319', weight: 700 });
  out += text(845, 793, t.stopBody, zh ? 15 : 10, { fill: C.ink });

  t.metrics.forEach((metric, index) => {
    const x = 80 + index * 420;
    const color = [C.green, C.blue, C.orange, C.gold][index];
    out += rect(x, 875, 390, 125, { fill: C.white, stroke: C.line, radius: 18, sw: 2 });
    out += `<rect x="${x}" y="875" width="10" height="125" rx="5" fill="${color}"/>`;
    out += text(x + 28, 910, metric[0], zh ? 17 : 12, { fill: C.muted, weight: 600 });
    out += text(x + 28, 955, metric[1], 28, { weight: 700 });
    out += text(x + 190, 955, metric[2], zh ? 13 : 10, { fill: C.muted });
  });
  out += text(80, 1045, t.footer, zh ? 14 : 12, { fill: C.muted });
  out += text(1720, 1045, t.author, 14, { anchor: 'end', fill: C.muted });
  out += svgEnd();
  return out;
}

async function writeFigure(stem, language, svg, width, height) {
  const suffix = language === 'zh' ? '' : '.en';
  const svgPath = path.join(figureDir, `${stem}${suffix}.svg`);
  const pngPath = path.join(figureDir, `${stem}${suffix}.png`);
  fs.writeFileSync(svgPath, svg, 'utf8');
  await sharp(Buffer.from(svg)).resize(width, height, { fit: 'fill' }).png().toFile(pngPath);
  process.stdout.write(`${path.relative(packageRoot, svgPath)} -> ${path.relative(packageRoot, pngPath)}\n`);
}

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function updateCopyrightLedger() {
  const ledgerPath = path.join(__dirname, 'copyright-ledger.json');
  const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
  const byPath = new Map(ledger.assets.map((asset) => [asset.path, asset]));
  const shared = {
    author: '许丙南 / Codex',
    third_party_materials: [],
    license: 'COMMUNITY-DISPLAY-ONLY',
    clearance_status: 'self_generated_or_official_public_with_attribution',
    font_note: 'Rendered with local system CJK-capable fonts; no font file is redistributed.',
  };
  const specs = [
    ...['site-overview.png', 'site-overview.en.png', 'site-overview.svg', 'site-overview.en.svg'].map((name) => ({
      path: `assets/figures/${name}`,
      asset_class: name.endsWith('.svg') ? 'authored_vector_figure' : 'derived_figure',
      generation_method: 'generated locally by build-open-pulse-review-boards.js from registered package evidence; no remote asset fetch',
      source_inputs: [
        'geometry/site_boundary.geojson',
        'geometry/key_areas.geojson',
        'visual/assets/open-pulse-tabletop-evidence.json',
        'visual/assets/example-s02-embodied-test-window.json',
      ],
      attribution: 'Self-generated bilingual review board. Tabletop PASS is local and synthetic; the bounded field window remains HOLD, not authorised and not run.',
    })),
    ...['mobility-bluegreen.png', 'mobility-bluegreen.en.png', 'mobility-bluegreen.svg', 'mobility-bluegreen.en.svg'].map((name) => ({
      path: `assets/figures/${name}`,
      asset_class: name.endsWith('.svg') ? 'authored_vector_figure' : 'derived_figure',
      generation_method: 'generated locally by build-open-pulse-review-boards.js from registered package evidence; no remote asset fetch',
      source_inputs: [
        'geometry/roads.geojson',
        'metrics.json',
        'visual/assets/open-pulse-tabletop-evidence.json',
        'visual/assets/example-s02-embodied-test-window.json',
      ],
      attribution: 'Self-generated bilingual review board. Spatial and OSM-derived metrics retain their provisional and low-confidence labels.',
    })),
    {
      path: 'visual/assets/build-open-pulse-review-boards.js',
      asset_class: 'self_generated_render_script',
      generation_method: 'authored in the submission worktree to build four bilingual SVG/PNG review figures from registered local evidence',
      source_inputs: [
        'visual/assets/open-pulse-tabletop-evidence.json',
        'visual/assets/example-s02-embodied-test-window.json',
      ],
      attribution: 'Self-generated renderer with evidence-state assertions; it makes no network request.',
      font_note: 'The script references system font families but redistributes no font file.',
    },
  ];

  for (const spec of specs) {
    const filePath = path.join(packageRoot, spec.path);
    const entry = { ...shared, ...spec, hash_sha256: sha256(filePath) };
    if (byPath.has(spec.path)) {
      Object.assign(byPath.get(spec.path), entry);
    } else {
      ledger.assets.push(entry);
      byPath.set(spec.path, entry);
    }
  }
  fs.writeFileSync(ledgerPath, `${JSON.stringify(ledger, null, 2)}\n`, 'utf8');
}

function updateManifest() {
  const manifestPath = path.join(packageRoot, 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const byPath = new Map(manifest.files.map((item) => [item.path, item]));
  const specs = [
    ['assets/figures/site-overview.svg', 'figure_source', 'zh', null],
    ['assets/figures/site-overview.en.svg', 'figure_source', 'en', 'assets/figures/site-overview.svg'],
    ['assets/figures/mobility-bluegreen.svg', 'figure_source', 'zh', null],
    ['assets/figures/mobility-bluegreen.en.svg', 'figure_source', 'en', 'assets/figures/mobility-bluegreen.svg'],
    ['visual/assets/build-open-pulse-review-boards.js', 'visualization', null, null],
  ];
  for (const [filePath, role, language, translationOf] of specs) {
    const item = byPath.get(filePath) || { path: filePath, role, required: false };
    item.role = role;
    item.required = false;
    if (language) item.language = language;
    if (translationOf) item.translation_of = translationOf;
    if (!byPath.has(filePath)) {
      manifest.files.push(item);
      byPath.set(filePath, item);
    }
  }
  for (const item of manifest.files) {
    if (!item.path || item.path === 'manifest.json') continue;
    const filePath = path.join(packageRoot, item.path);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) item.sha256 = sha256(filePath);
  }
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
}

async function main() {
  await writeFigure('site-overview', 'zh', buildSiteOverview('zh'), 3600, 2250);
  await writeFigure('site-overview', 'en', buildSiteOverview('en'), 3600, 2250);
  await writeFigure('mobility-bluegreen', 'zh', buildMobility('zh'), 1800, 1080);
  await writeFigure('mobility-bluegreen', 'en', buildMobility('en'), 1800, 1080);
  updateCopyrightLedger();
  updateManifest();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
