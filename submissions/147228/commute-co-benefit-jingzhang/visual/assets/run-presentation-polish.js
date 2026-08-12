#!/usr/bin/env node

/*
 * Regenerate the small set of presentation-only aids used by the mobility
 * package.  The script deliberately consumes only committed package files.
 * It does not add geometry, demand, route or performance data.
 */
const fs = require('fs');
const path = require('path');

const assetDir = __dirname;
const packageDir = path.resolve(assetDir, '..', '..');
const figureDir = path.join(packageDir, 'assets', 'figures');

function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(packageDir, rel), 'utf8'));
}

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function allCoordinates(geometry) {
  if (geometry.type === 'LineString') return geometry.coordinates;
  if (geometry.type === 'Polygon') return geometry.coordinates.flat();
  return [];
}

function centroid(feature) {
  const points = allCoordinates(feature.geometry);
  const sum = points.reduce((acc, p) => [acc[0] + p[0], acc[1] + p[1]], [0, 0]);
  return [sum[0] / points.length, sum[1] / points.length];
}

const boundary = readJson('geometry/site_boundary.geojson');
const keyAreas = readJson('geometry/key_areas.geojson');
const roads = readJson('geometry/roads.geojson');
const publicSpace = readJson('geometry/public_space.geojson');

const all = [
  ...boundary.features,
  ...keyAreas.features,
  ...roads.features,
  ...publicSpace.features,
].flatMap((feature) => allCoordinates(feature.geometry));
const xs = all.map((p) => p[0]);
const ys = all.map((p) => p[1]);
const minX = Math.min(...xs);
const maxX = Math.max(...xs);
const minY = Math.min(...ys);
const maxY = Math.max(...ys);
const map = { x: 70, y: 160, w: 1040, h: 650 };
const padX = (maxX - minX) * 0.06;
const padY = (maxY - minY) * 0.06;
const extent = {
  minX: minX - padX,
  maxX: maxX + padX,
  minY: minY - padY,
  maxY: maxY + padY,
};

function project(p) {
  const x = map.x + ((p[0] - extent.minX) / (extent.maxX - extent.minX)) * map.w;
  const y = map.y + map.h - ((p[1] - extent.minY) / (extent.maxY - extent.minY)) * map.h;
  return [Number(x.toFixed(1)), Number(y.toFixed(1))];
}

function pathFor(feature) {
  const points = allCoordinates(feature.geometry).map(project);
  if (!points.length) return '';
  const start = `M ${points[0][0]} ${points[0][1]}`;
  const body = points.slice(1).map((p) => `L ${p[0]} ${p[1]}`).join(' ');
  return `${start} ${body}${feature.geometry.type === 'Polygon' ? ' Z' : ''}`;
}

function polygon(feature, fill, stroke, extra = '') {
  return `<path d="${pathFor(feature)}" fill="${fill}" stroke="${stroke}" ${extra}/>`;
}

function line(feature, stroke, width, extra = '') {
  return `<path d="${pathFor(feature)}" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
}

function pointAt(feature, fraction) {
  const points = allCoordinates(feature.geometry);
  const start = points[0];
  const end = points[points.length - 1];
  return project([
    start[0] + (end[0] - start[0]) * fraction,
    start[1] + (end[1] - start[1]) * fraction,
  ]);
}

const areaColors = ['#8B5CF6', '#0EA5A4', '#F97316'];
const curbColors = ['#2A9D8F', '#F59E0B', '#7C3AED', '#E76F51', '#DC2626'];
const curbLabelsZh = ['开放通行', '预约窗口', '维护装卸', '人工优先', '应急保留'];
const curbLabelsEn = ['open', 'booked', 'service', 'human-only', 'emergency'];

function labelPosition(feature, index) {
  const [x, y] = project(centroid(feature));
  const offsets = [[0, -10], [0, 4], [0, 18]];
  const [dx, dy] = offsets[index] || [0, 0];
  return [x + dx, y + dy];
}

function mapSvg(lang) {
  const zh = lang === 'zh';
  const title = zh ? '交通通勤共益调度台：把方式、重点区和路缘状态放回同一张图' : 'Mobility commons: modes, key areas and curb states in one spatial view';
  const subtitle = zh
    ? '概念关系图 · provisional 边界与设计线位 · 不表达现状道路、站点容量或实测 OD'
    : 'Conceptual relationship map · provisional boundary and design links · not observed roads, station capacity or OD';
  const areaNames = zh
    ? ['众智园 / 企业到岗', 'AI 原点社区 / 居民日常', '大钟寺 / 轨道换乘']
    : ['Zhongzhiyuan / enterprise arrival', 'AI Origin / resident daily access', 'Dazhongsi / rail transfer'];
  const modeLegend = zh
    ? ['轨道 / 公交骨干', '步行与无障碍', '自行车接驳', '汽车与服务路缘']
    : ['rail / bus backbone', 'walking / accessible', 'bicycle connection', 'car and service curb'];
  const proof = zh
    ? ['这张图能帮读者看懂', '三处重点区如何共享一套关系图', '企业、居民、轨道、路缘如何相遇', '五种路缘状态的责任入口', '这张图暂时不能证明', '官方红线、真实站点、现状流量', '居民需求、班次容量或运行许可', '空中出行航线，当前仍为 BLOCKED']
    : ['This map helps readers see', 'how the three key areas share one network', 'where enterprise, residents, rail and curb meet', 'where the five curb states enter the contract', 'This map does not prove', 'official redlines, real stations or observed flows', 'resident demand, timetable capacity or permits', 'an air route; the candidate remains BLOCKED'];
  const areaMarkup = keyAreas.features.map((feature, index) => {
    const [x, y] = labelPosition(feature, index);
    return `${polygon(feature, `${areaColors[index]}22`, areaColors[index], 'stroke-width="3" stroke-dasharray="9 7"')}<circle cx="${x}" cy="${y}" r="9" fill="${areaColors[index]}" stroke="#fff" stroke-width="3"/><text x="${x + 16}" y="${y + 5}" class="area">${esc(areaNames[index])}</text>`;
  }).join('');
  const roadMarkup = roads.features.map((feature, index) => {
    const roadClass = feature.properties.road_class || '';
    const stroke = roadClass === 'cycleway' ? '#FBBF24' : roadClass === 'pedestrian' ? '#2A9D8F' : '#5B8DEF';
    const width = roadClass === 'transit_connection' ? 11 : 7;
    const base = line(feature, stroke, width, 'opacity=".85"');
    const curb = Array.from({ length: 5 }, (_, state) => {
      const p1 = pointAt(feature, state / 5);
      const p2 = pointAt(feature, (state + 1) / 5);
      return `<line x1="${p1[0]}" y1="${p1[1]}" x2="${p2[0]}" y2="${p2[1]}" stroke="${curbColors[state]}" stroke-width="3" stroke-linecap="round"/>`;
    }).join('');
    const [lx, ly] = pointAt(feature, 0.56);
    return `${base}${curb}<circle cx="${lx}" cy="${ly}" r="4" fill="#fff" stroke="${stroke}" stroke-width="2"/>`;
  }).join('');
  const publicMarkup = publicSpace.features.map((feature) => polygon(feature, '#34D39918', '#34D399', 'stroke-width="2" stroke-dasharray="6 8"')).join('');
  const [externalLeftX, externalLeftY] = project([extent.minX, (minY + maxY) / 2]);
  const [externalRightX, externalRightY] = project([extent.maxX, (minY + maxY) / 2]);
  const [hubX, hubY] = project([(minX + maxX) / 2, (minY + maxY) / 2]);
  const nodes = keyAreas.features.map((feature, index) => {
    const [x, y] = project(centroid(feature));
    return `<circle cx="${x}" cy="${y}" r="18" fill="#0B2337" stroke="${areaColors[index]}" stroke-width="4"/><circle cx="${x}" cy="${y}" r="5" fill="#fff"/>`;
  }).join('');
  const stateLegend = curbLabelsZh.map((label, index) => `<g transform="translate(1185 ${270 + index * 40})"><rect width="18" height="18" rx="5" fill="${curbColors[index]}"/><text x="30" y="15" class="legend">${esc(zh ? label : curbLabelsEn[index])}</text></g>`).join('');
  const modes = [
    ['#5B8DEF', modeLegend[0]], ['#2A9D8F', modeLegend[1]], ['#FBBF24', modeLegend[2]], ['#E76F51', modeLegend[3]],
  ].map(([color, label], index) => `<g transform="translate(1185 ${520 + index * 38})"><line x1="0" y1="8" x2="26" y2="8" stroke="${color}" stroke-width="${index === 0 ? 9 : 6}" stroke-linecap="round"/><text x="40" y="14" class="legend">${esc(label)}</text></g>`).join('');
  const proofMarkup = proof.map((lineText, index) => `<text x="1185" y="${690 + index * 26}" class="${index === 0 || index === 4 ? 'proofHead' : 'proof'}">${esc(lineText)}</text>`).join('');
  const air = `<g transform="translate(965 205)"><rect width="115" height="54" rx="14" fill="#3B1F3A" stroke="#F472B6" stroke-width="2"/><text x="57" y="22" text-anchor="middle" class="air">AIR</text><text x="57" y="41" text-anchor="middle" class="airSmall">BLOCKED</text></g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000" role="img" aria-labelledby="title desc">
  <title id="title">${esc(title)}</title>
  <desc id="desc">${esc(subtitle)}</desc>
  <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#071A2B"/><stop offset="1" stop-color="#0E3448"/></linearGradient><filter id="shadow" x="-10%" y="-10%" width="130%" height="130%"><feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000" flood-opacity=".22"/></filter><style>.sans{font-family:PingFang SC,Microsoft YaHei,Arial,sans-serif}.title{font-size:29px;font-weight:800;fill:#F5FBFF}.sub{font-size:16px;fill:#9FC0CF}.area{font-size:18px;font-weight:800;fill:#F6FBFF}.legend{font-size:15px;font-weight:700;fill:#DCEEF5}.proofHead{font-size:16px;font-weight:800;fill:#66E3CA}.proof{font-size:14px;fill:#A9C7D4}.small{font-size:13px;fill:#91B3C2}.nodeLabel{font-size:13px;fill:#E8F5FA}.air{font-size:16px;font-weight:900;fill:#F9A8D4}.airSmall{font-size:12px;font-weight:800;fill:#FBCFE8}</style></defs>
  <rect width="1600" height="1000" fill="url(#bg)"/><circle cx="1510" cy="80" r="290" fill="#1C7771" opacity=".18"/><circle cx="80" cy="950" r="300" fill="#3C4F89" opacity=".17"/>
  <text x="70" y="58" class="sans" fill="#64E4C5" font-size="18" font-weight="900" letter-spacing="3">COMMUTE CO-BENEFIT COMMONS / SPATIAL RELATIONSHIP</text>
  <text x="70" y="98" class="sans title">${esc(title)}</text><text x="70" y="126" class="sans sub">${esc(subtitle)}</text>
  <g filter="url(#shadow)"><rect x="${map.x - 20}" y="${map.y - 18}" width="${map.w + 40}" height="${map.h + 36}" rx="28" fill="#0B2738" stroke="#24556B"/><rect x="1150" y="135" width="370" height="730" rx="28" fill="#0B2738" stroke="#24556B"/></g>
  <g opacity=".14">${Array.from({ length: 8 }, (_, i) => `<line x1="${map.x + i * 145}" y1="${map.y}" x2="${map.x + i * 145}" y2="${map.y + map.h}" stroke="#8EC9D6" stroke-width="1"/><line x1="${map.x}" y1="${map.y + i * 104}" x2="${map.x + map.w}" y2="${map.y + i * 104}" stroke="#8EC9D6" stroke-width="1"/>`).join('')}</g>
  ${polygon(boundary.features[0], '#F59E0B0B', '#FBBF24', 'stroke-width="4" stroke-dasharray="16 12"')}${publicMarkup}${areaMarkup}${roadMarkup}
  <path d="M ${externalLeftX} ${externalLeftY} C ${hubX - 180} ${hubY - 110}, ${hubX - 80} ${hubY - 40}, ${hubX} ${hubY}" fill="none" stroke="#F8FAFC" stroke-width="3" stroke-dasharray="10 10" opacity=".65"/><path d="M ${externalRightX} ${externalRightY} C ${hubX + 180} ${hubY + 90}, ${hubX + 90} ${hubY + 30}, ${hubX} ${hubY}" fill="none" stroke="#F8FAFC" stroke-width="3" stroke-dasharray="10 10" opacity=".65"/>
  ${nodes}${air}<text x="${map.x + 20}" y="${map.y + map.h - 18}" class="sans small">${esc(zh ? '对外通勤：跨边界关系线，仅用于说明接口' : 'External commuting: cross-boundary relationship lines, for interface reading only')}</text>
  <g transform="translate(1185 178)"><text class="sans" y="0" fill="#66E3CA" font-size="18" font-weight="900">${esc(zh ? '路缘五态 / 责任入口' : 'Five curb states / ownership entry')}</text><text y="26" class="sans small">${esc(zh ? '颜色只表示概念状态，不代表现状占用' : 'Colors show a concept contract, not observed occupancy')}</text></g>
  ${stateLegend}<g transform="translate(1185 480)"><text class="sans" y="0" fill="#66E3CA" font-size="18" font-weight="900">${esc(zh ? '方式关系' : 'Mode relationship')}</text></g>${modes}
  ${proofMarkup}<text x="1185" y="910" class="sans small">${esc(zh ? '来源：package GeoJSON · synthetic / provisional' : 'Source: package GeoJSON · synthetic / provisional')}</text>
  <text x="70" y="925" class="sans small">${esc(zh ? '空间关系图 · 先读三处重点区，再读方式与路缘状态；所有线位均为概念建议' : 'Spatial relationship map · read the three areas first, then modes and curb states; all links are conceptual')}</text>
</svg>`;
}

fs.writeFileSync(path.join(figureDir, 'mobility-spatial-plan.svg'), mapSvg('zh'));
fs.writeFileSync(path.join(figureDir, 'mobility-spatial-plan.en.svg'), mapSvg('en'));

const chain = {
  zh: ['区域覆盖', '网络边节点', '运力缺口', '资源敏感性', '稳健性'],
  en: ['regional scale', 'network flow', 'capacity gap', 'resource sensitivity', 'robustness'],
};
const chainColors = ['#4DE1BF', '#6EA5FF', '#F7BF63', '#F07D9E', '#B8A1FF'];
const boardNames = [
  ['regional-scale-commute-board.svg', 'regional-scale-commute-board.en.svg'],
  ['network-flow-board.svg', 'network-flow-board.en.svg'],
  ['capacity-closure-board.svg', 'capacity-closure-board.en.svg'],
  ['resource-pressure-board.svg', 'resource-pressure-board.en.svg'],
  ['robustness-screen-board.svg', 'robustness-screen-board.en.svg'],
];

function addRibbon(file, lang) {
  const target = path.join(figureDir, file);
  let svg = fs.readFileSync(target, 'utf8');
  if (svg.includes('id="evidence-chain-ribbon"')) return;
  const match = svg.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
  if (!match) throw new Error(`no viewBox in ${file}`);
  const width = Number(match[1]);
  const height = Number(match[2]);
  const x = 40;
  const y = height - 92;
  const gap = 8;
  const boxWidth = (width - x * 2 - gap * 4) / 5;
  const labels = chain[lang];
  const title = lang === 'zh' ? '同一份区域 runner · 五个读出视角' : 'ONE REGIONAL RUNNER · FIVE READOUT VIEWS';
  const note = lang === 'zh' ? '同源聚合证据，不是五组独立的现场结果' : 'one aggregate evidence chain, not five independent field results';
  const boxes = labels.map((label, index) => {
    const bx = x + index * (boxWidth + gap);
    return `<rect x="${bx.toFixed(1)}" y="${y}" width="${boxWidth.toFixed(1)}" height="38" rx="10" fill="${chainColors[index]}22" stroke="${chainColors[index]}" stroke-width="1.5"/><text x="${(bx + 14).toFixed(1)}" y="${y + 25}" font-family="Arial,sans-serif" font-size="14" font-weight="800" fill="#E8F8FA">${esc(`${index + 1}  ${label}`)}</text>`;
  }).join('');
  const ribbon = `<g id="evidence-chain-ribbon"><rect x="0" y="${y - 18}" width="${width}" height="${height - y + 18}" fill="#071A2B" opacity=".96"/><text x="${x}" y="${y - 1}" font-family="Arial,sans-serif" font-size="14" font-weight="800" fill="#66E3CA">${esc(title)}</text><text x="${width - x}" y="${y - 1}" text-anchor="end" font-family="Arial,sans-serif" font-size="12" fill="#9FC0CF">${esc(note)}</text>${boxes}</g>`;
  svg = svg.replace('</svg>', `${ribbon}</svg>`);
  fs.writeFileSync(target, svg);
}

boardNames.forEach(([zh, en]) => {
  addRibbon(zh, 'zh');
  addRibbon(en, 'en');
});

function addCommuteCoBenefitSection(html, lang) {
  if (html.includes('commute-co-benefit-board')) {
    const suffix = lang === 'zh' ? '' : '.en';
    if (!html.includes(`activity-chain-flow-board${suffix}.svg`)) {
      const marker = `../assets/figures/commute-co-benefit-board${suffix}.svg`;
      const markerStart = html.indexOf(marker);
      const markerEnd = html.indexOf('>', markerStart);
      const extra = `<img src="../assets/figures/activity-chain-flow-board${suffix}.svg" alt="${lang === 'zh' ? '一整天活动链六个交接点' : 'One full-day activity chain with six handoffs'}"><img src="../assets/figures/mode-mix-equity-board${suffix}.svg" alt="${lang === 'zh' ? '入选政策方式组合与群体公平' : 'Selected policy mode mix and group equity'}">`;
      if (markerStart >= 0 && markerEnd >= markerStart) html = `${html.slice(0, markerEnd + 1)}${extra}${html.slice(markerEnd + 1)}`;
    }
    if (!html.includes(`commute-co-benefit-contract-board${suffix}.svg`)) {
      const marker = `../assets/figures/mode-mix-equity-board${suffix}.svg`;
      const markerStart = html.indexOf(marker);
      const markerEnd = html.indexOf('>', markerStart);
      const extra = `<img src="../assets/figures/commute-co-benefit-contract-board${suffix}.svg" alt="${lang === 'zh' ? '企业—居民通勤共益合同' : 'Enterprise-resident co-benefit contract'}">`;
      if (markerStart >= 0 && markerEnd >= markerStart) html = `${html.slice(0, markerEnd + 1)}${extra}${html.slice(markerEnd + 1)}`;
    }
    if (!html.includes(`commute-co-benefit-authorization-board${suffix}.svg`)) {
      const marker = `../assets/figures/commute-co-benefit-contract-board${suffix}.svg`;
      const markerStart = html.indexOf(marker);
      const markerEnd = html.indexOf('>', markerStart);
      const extra = `<img src="../assets/figures/commute-co-benefit-authorization-board${suffix}.svg" alt="${lang === 'zh' ? '从合成屏查到现场授权的通勤共益证据阶梯' : 'Commute co-benefit evidence ladder from synthetic screen to field authorisation'}">`;
      if (markerStart >= 0 && markerEnd >= markerStart) html = `${html.slice(0, markerEnd + 1)}${extra}${html.slice(markerEnd + 1)}`;
    }
    if (!html.includes(`commute-co-benefit-sensitivity-board${suffix}.svg`)) {
      const marker = `../assets/figures/commute-co-benefit-authorization-board${suffix}.svg`;
      const markerStart = html.indexOf(marker);
      const markerEnd = html.indexOf('>', markerStart);
      const extra = `<img src="../assets/figures/commute-co-benefit-sensitivity-board${suffix}.svg" alt="${lang === 'zh' ? '企业错峰输入敏感性与群体保护' : 'Employer staggering sensitivity and group protection'}">`;
      if (markerStart >= 0 && markerEnd >= markerStart) html = `${html.slice(0, markerEnd + 1)}${extra}${html.slice(markerEnd + 1)}`;
    }
    if (!html.includes(`commute-co-benefit-accessibility-board${suffix}.svg`)) {
      const marker = `../assets/figures/commute-co-benefit-sensitivity-board${suffix}.svg`;
      const markerStart = html.indexOf(marker);
      const markerEnd = html.indexOf('>', markerStart);
      const extra = `<img src="../assets/figures/commute-co-benefit-accessibility-board${suffix}.svg" alt="${lang === 'zh' ? '分组时间预算充分性与保护组最低曲线' : 'Time-budget sufficiency and protected-group minimum'}">`;
      if (markerStart >= 0 && markerEnd >= markerStart) html = `${html.slice(0, markerEnd + 1)}${extra}${html.slice(markerEnd + 1)}`;
    }
    return html;
  }
  const readout = readJson('visual/assets/commute-co-benefit-readout.json');
  const selected = readout.candidates.find((candidate) => candidate.policy_id === readout.selected_policy_id);
  const zh = lang === 'zh';
  const title = zh ? '全日活动链：企业错峰与居民日常共同过门' : 'Full-day activity chain: employer and resident gates together';
  const intro = zh
    ? `C3 通勤共益组合在 ${readout.population_reference.toLocaleString()} 个合成代理上通过硬门，综合出行压力代理分 ${selected.satisfaction_proxy.toFixed(2)}；空中候选保持阻断。`
    : `C3 commute co-benefit bundle passes hard gates on ${readout.population_reference.toLocaleString()} synthetic agents with a ${selected.satisfaction_proxy.toFixed(2)} synthetic satisfaction proxy; the air candidate remains blocked.`;
  const detail = zh
    ? '这张图先比较政策包，再看六类群组读数。它不代表居民调查、企业样本、本地 OD、班次容量或运行许可。'
    : 'The board compares policy bundles before showing six group readouts. It is not a resident survey, enterprise sample, local OD, timetable capacity or operating permit.';
  const img = `../assets/figures/commute-co-benefit-board${zh ? '' : '.en'}.svg`;
  const block = `<section id="19" class="evidence commute-co-benefit-board"><div class="section-head"><span class="section-no">20</span><h2>${title}</h2><span class="tag">${zh ? '合成屏查' : 'SYNTHETIC SCREEN'}</span></div><p>${intro}</p><p>${detail}</p><img src="${img}" alt="${title}"><div class="micro">commute-co-benefit-model.json · commute-co-benefit-readout.json · run-commute-co-benefit-optimization.js · aggregate only · ${zh ? '现场数据待授权' : 'field data not authorized'}</div></section>`;
  return html.replace('</main>', `${block}</main>`);
}

function updateVisualIndex(file, lang) {
  const target = path.join(packageDir, 'visual', file);
  let html = fs.readFileSync(target, 'utf8');
  const zh = lang === 'zh';
  const suffix = zh ? '' : '.en';
  const oldAlt = zh ? '三处重点区，一条通勤共益调度台' : 'Three areas, one operating loop';
  const newAlt = zh ? '交通通勤共益调度台空间关系图' : 'Mobility commons spatial relationship map';
  const oldImage = `../assets/figures/site-overview${suffix}.png" alt="${oldAlt}`;
  const newImage = `../assets/figures/mobility-spatial-plan${suffix}.svg" alt="${newAlt}`;
  html = html.replace(oldImage, newImage);
  const regionalMarker = `<img src="../assets/figures/regional-scale-commute-board${suffix}.svg"`;
  const chainTitle = zh ? '同一份区域 runner，五个读出视角' : 'One regional runner, five readout views';
  const chainText = zh
    ? '区域覆盖 → 网络边节点 → 运力缺口 → 资源敏感性 → 稳健性。五张图共享一份合成聚合证据，任何一张都不代表现场绩效。'
    : 'Regional scale → network flow → capacity gap → resource sensitivity → robustness. Five boards share one synthetic aggregate evidence chain; none is field performance.';
  const chain = `<div class="evidence-chain"><strong>${chainTitle}</strong><span>${chainText}</span></div>`;
  if (!html.includes('class="evidence-chain"')) html = html.replace(regionalMarker, `${chain}${regionalMarker}`);
  const css = '.evidence-chain{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap;background:#0B2738;color:#E6FFFA;border:1px solid #2A9D8F;border-radius:12px;padding:12px 14px;margin:10px 0 14px;font-size:12px}.evidence-chain strong{color:#66E3CA;white-space:nowrap}.evidence-chain span{color:#B6D3DC}';
  if (!html.includes('.evidence-chain{')) html = html.replace('</style></head>', `${css}</style></head>`);
  html = addCommuteCoBenefitSection(html, lang);
  if (!html.includes('weekly-activity-board')) {
    const weekly = readJson('visual/assets/weekly-activity-readout.json');
    const weeklyTitle = zh ? '一周活动链。工作日和周末共享一份聚合账' : 'Weekly activity chain. Weekdays and weekends share one aggregate ledger';
    const weeklyIntro = zh
      ? `7 个合成日共处理 ${weekly.agent_days_processed.toLocaleString()} 个代理日，活动链设计单元 ${weekly.active_trip_count.toLocaleString()}；这不是活动日记、客流调查或运行绩效。`
      : `Across seven synthetic days the screen processes ${weekly.agent_days_processed.toLocaleString()} agent-days and ${weekly.active_trip_count.toLocaleString()} active-chain design units; this is not an activity diary, demand survey or operating result.`;
    const weeklyBoundary = zh
      ? '工作日/周末比例、夜班与照护活动、跨边界 OD 和服务供给仍待有日期证据校准。'
      : 'Weekday/weekend shares, night and care activities, cross-boundary OD and service supply remain calibration requirements.';
    const weeklyImg = `../assets/figures/weekly-activity-board${suffix}.svg`;
    const weeklyBlock = `<section id="20" class="evidence multimodal-board"><div class="section-head"><span class="section-no">21</span><h2>${weeklyTitle}</h2><span class="tag">${zh ? '合成总账' : 'SYNTHETIC LEDGER'}</span></div><p>${weeklyIntro}</p><p>${weeklyBoundary}</p><img src="${weeklyImg}" alt="${weeklyTitle}"><div class="micro">weekly-activity-screen.json · weekly-activity-readout.json · aggregate only · ${zh ? '现场数据待校准' : 'field data pending calibration'}</div></section>`;
    html = html.replace('<section id="16"', `${weeklyBlock}<section id="16"`);
  }
  if (!html.includes('href="#19"')) {
    html = html.replace('</nav>', `<a href="#19">${zh ? '活动链政策包' : 'Activity-chain policy'}</a></nav>`);
  }
  if (!html.includes('href="#20"')) {
    html = html.replace('</nav>', `<a href="#20">${zh ? '一周活动链' : 'Weekly activity chain'}</a></nav>`);
  }
  fs.writeFileSync(target, html);
}

updateVisualIndex('index.html', 'zh');
updateVisualIndex('index.en.html', 'en');

console.log(JSON.stringify({
  ok: true,
  generated: ['assets/figures/mobility-spatial-plan.svg', 'assets/figures/mobility-spatial-plan.en.svg'],
  ribbon_boards: boardNames.flat(),
  source_boundary: 'geometry/site_boundary.geojson',
  source_key_areas: 'geometry/key_areas.geojson',
  source_roads: 'geometry/roads.geojson',
  visual_index: ['visual/index.html', 'visual/index.en.html'],
  note: 'presentation aids only; no demand, geometry or performance values changed'
}, null, 2));
