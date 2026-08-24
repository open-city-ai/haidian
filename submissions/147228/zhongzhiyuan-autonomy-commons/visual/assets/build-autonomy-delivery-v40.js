#!/usr/bin/env node
/* Build and verify the v4.0 bilingual reviewer boards from package registers. */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

function bundledModules() {
  return String(process.env.PATH || '').split(path.delimiter)
    .map((entry) => path.resolve(entry, '..', '..', 'node', 'node_modules'))
    .find((candidate) => candidate.includes(`${path.sep}codex-runtimes${path.sep}`) && fs.existsSync(candidate));
}

function loadSharp() {
  try { return require('sharp'); } catch (initialError) {
    const modules = bundledModules();
    if (!modules) throw initialError;
    const bundledNode = path.resolve(modules, '..', 'bin', 'node');
    const currentNode = fs.realpathSync(process.execPath);
    const resolvedNode = fs.existsSync(bundledNode) ? fs.realpathSync(bundledNode) : '';
    if (resolvedNode && resolvedNode !== currentNode && process.env.AUTONOMY_V40_BUNDLED_NODE !== '1') {
      const result = spawnSync(resolvedNode, [__filename, ...process.argv.slice(2)], {
        stdio: 'inherit', env: { ...process.env, AUTONOMY_V40_BUNDLED_NODE: '1' },
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
const packageDir = path.resolve(here, '..', '..');
const figureDir = path.join(packageDir, 'assets', 'figures');
const evidencePath = path.join(here, 'autonomy-delivery-v40-evidence.json');
const checkOnly = process.argv.includes('--check');
const culture = JSON.parse(fs.readFileSync(path.join(here, 'culture-honor-return-system.json'), 'utf8'));
const regional = JSON.parse(fs.readFileSync(path.join(here, 'regional-ecosystem.json'), 'utf8'));

const C = {
  bg: '#F4F7FB', paper: '#FFFFFF', ink: '#102A43', muted: '#627D98', line: '#BCCCDC',
  blue: '#2F6FED', teal: '#138A7E', orange: '#E56B4A', amber: '#E9A23B', green: '#4C956C',
  purple: '#7457C8', red: '#C94C4C', paleBlue: '#EAF1FF', paleTeal: '#EAF8F5', paleRed: '#FFF1EF', navy: '#16324F',
};

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function wrap(value, max, english) {
  const text = String(value || '').trim();
  if (!english) {
    const chars = [...text]; const rows = [];
    for (let index = 0; index < chars.length; index += max) rows.push(chars.slice(index, index + max).join(''));
    return rows;
  }
  const rows = []; let current = '';
  text.split(/\s+/).filter(Boolean).forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > max && current) { rows.push(current); current = word; } else current = candidate;
  });
  if (current) rows.push(current);
  return rows;
}

function textLines(lines, x, y, className = 'body', lineHeight = 28, anchor = 'start') {
  return `<text x="${x}" y="${y}" class="${className}" text-anchor="${anchor}">${lines.map((line, index) => `<tspan x="${x}" dy="${index ? lineHeight : 0}">${esc(line)}</tspan>`).join('')}</text>`;
}

function shell(width, height, title, subtitle, eyebrow, boundary) {
  return [`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">`,
    `<rect width="${width}" height="${height}" fill="${C.bg}"/>`,
    '<style>.title{font:700 48px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",Arial,sans-serif;fill:#102A43}.subtitle{font:22px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",Arial,sans-serif;fill:#627D98}.eyebrow{font:700 16px Menlo,Consolas,monospace;letter-spacing:2px;fill:#138A7E}.head{font:700 24px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",Arial,sans-serif;fill:#16324F}.body{font:19px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",Arial,sans-serif;fill:#27445F}.small{font:16px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",Arial,sans-serif;fill:#627D98}.chip{font:700 17px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",Arial,sans-serif;fill:#16324F}.light{font:18px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",Arial,sans-serif;fill:#FFFFFF}.lighthead{font:700 24px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",Arial,sans-serif;fill:#FFFFFF}.foot{font:15px Menlo,Consolas,monospace;fill:#C94C4C}</style>',
    `<text x="84" y="58" class="eyebrow">${esc(eyebrow)}</text>`,
    `<text x="84" y="118" class="title">${esc(title)}</text>`,
    `<text x="84" y="160" class="subtitle">${esc(subtitle)}</text>`,
    `<text x="${width - 84}" y="58" text-anchor="end" class="foot">${esc(boundary)}</text>`];
}

function regionalBoard(english) {
  const W = 2400; const H = 1500;
  const t = english ? {
    title: 'Five regional interfaces, one auditable return loop',
    subtitle: 'Resources enter a bounded public test; evidence, repair and reusable methods return. No partnership is asserted.',
    eyebrow: 'AUTONOMY COMMONS / AGENT.2 / REGIONAL SYNERGY', boundary: 'CONCEPT · UNCONFIRMED INTERFACES · NO FUNDING OR LAND COMMITMENT',
    central: 'JING-ZHANG BELT · THREE PROOF YARDS', centralSub: 'book → test → publish evidence → scale or retire',
    internal: 'INNER LOOP · Zhongzhiyuan (safety) → AI Origin (needs / consent / redress) ↔ North Latitude interface (TBC) → Dazhongsi (rail / curb) · evidence returns',
    bring: 'BRINGS', returns: 'RETURNS', mechanisms: 'EIGHT RESOURCE MECHANISMS', lifecycle: 'RETURN LOOP',
    nodes: [
      ['Zhongguancun Science City / Haidian universities', 'knowledge · talent · open methods · public questions', 'auditable street questions · reusable evidence'],
      ['Huairou Science City', 'basic science · research facilities · compute', 'explainable interfaces · bounded validation questions'],
      ['Future Science City', 'energy · materials · engineering verification', 'urban-interface requirements · maintainability evidence'],
      ['Beijing E-Town', 'manufacturing · industrial conversion · scale discipline', 'small public-test receipts · stop and repair evidence'],
      ['Beijing-Tianjin-Hebei network', 'diverse contexts · comparison · diffusion', 'versioned methods · comparable failures and repairs'],
    ],
    mechanismNames: ['land', 'space', 'industry', 'capital', 'talent', 'compute', 'data', 'scenario'],
    lifecycleSteps: ['originate', 'engineer', 'book', 'test', 'publish evidence', 'scale or retire'],
  } : {
    title: '五个区域接口，一条可审计的能力回路',
    subtitle: '资源进入有界公共试验，证据、修复与可复用方法返回；不把协同假设写成已确定合作。',
    eyebrow: '智行京张 / AGENT.2 / 区域协同', boundary: '概念建议 · 接口待确认 · 无资金、土地或伙伴承诺',
    central: '京张带 · 三座公共证明庭', centralSub: '预约 → 试验 → 发布证据 → 扩展或退出',
    internal: '内回路 · 众智园（安全）→ AI 原点（需求 / 同意 / 申诉）↔ 北纬社区接口（待确认）→ 大钟寺（轨道 / 路缘）· 证据原路返回',
    bring: '带入', returns: '返回', mechanisms: '八类资源机制', lifecycle: '回路次序',
    nodes: [
      ['中关村科学城 / 海淀高校院所', '知识 · 人才 · 开源方法 · 公共问题', '可审计街道问题 · 可复用证据'],
      ['怀柔科学城', '基础科学 · 大型科研设施 · 算力', '可解释城市接口 · 有界验证问题'],
      ['未来科学城', '能源 · 材料 · 工程验证', '城市接口需求 · 可维护性证据'],
      ['北京经开区', '制造 · 产业转化 · 规模纪律', '小颗粒公共试验回执 · 停止与修复证据'],
      ['京津冀协同网络', '多样场景 · 比较 · 扩散', '版本化方法 · 可比较失败与修复'],
    ],
    mechanismNames: ['土地', '空间', '产业', '资金', '人才', '算力', '数据', '场景'],
    lifecycleSteps: ['发起', '工程化', '预约', '试验', '发布证据', '扩展或退出'],
  };
  const out = shell(W, H, t.title, t.subtitle, t.eyebrow, t.boundary);
  const cards = [
    [84, 220, 710, 285], [845, 220, 710, 285], [1606, 220, 710, 285],
    [180, 790, 730, 285], [1490, 790, 730, 285],
  ];
  const colors = [C.blue, C.teal, C.orange, C.purple, C.green];
  cards.forEach(([x, y, w, h], index) => {
    const node = t.nodes[index];
    out.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="${C.paper}" stroke="${colors[index]}" stroke-width="3"/>`);
    out.push(`<rect x="${x}" y="${y}" width="12" height="${h}" rx="6" fill="${colors[index]}"/>`);
    out.push(textLines(wrap(node[0], english ? 48 : 24, english).slice(0, 2), x + 32, y + 50, 'head', 31));
    out.push(`<text x="${x + 32}" y="${y + 126}" class="eyebrow">${esc(t.bring)}</text>`);
    out.push(textLines(wrap(node[1], english ? 58 : 28, english).slice(0, 2), x + 32, y + 160, 'body', 27));
    out.push(`<text x="${x + 32}" y="${y + 222}" class="eyebrow">${esc(t.returns)}</text>`);
    out.push(textLines(wrap(node[2], english ? 58 : 28, english).slice(0, 2), x + 32, y + 256, 'body', 27));
  });
  const centerX = 790; const centerY = 535; const centerW = 820; const centerH = 220;
  out.push(`<rect x="${centerX}" y="${centerY}" width="${centerW}" height="${centerH}" rx="30" fill="${C.navy}"/>`);
  out.push(`<text x="1200" y="585" class="lighthead" text-anchor="middle">${esc(t.central)}</text>`);
  out.push(`<text x="1200" y="625" class="light" text-anchor="middle">${esc(t.centralSub)}</text>`);
  out.push(textLines(wrap(t.internal, english ? 78 : 38, english).slice(0, 3), 1200, 665, 'light', 27, 'middle'));
  [[439,505,1010,555],[1200,505,1200,555],[1961,505,1390,555],[910,930,1040,735],[1490,930,1360,735]].forEach((line, index) => {
    out.push(`<path d="M${line[0]} ${line[1]} L${line[2]} ${line[3]}" stroke="${colors[index]}" stroke-width="5" fill="none" opacity=".72"/>`);
  });
  out.push(`<text x="84" y="1150" class="head">${esc(t.mechanisms)}</text>`);
  t.mechanismNames.forEach((name, index) => {
    const x = 84 + index * 282;
    out.push(`<rect x="${x}" y="1178" width="250" height="62" rx="31" fill="${index % 2 ? C.paleTeal : C.paleBlue}" stroke="${index % 2 ? C.teal : C.blue}"/>`);
    out.push(`<text x="${x + 125}" y="1218" class="chip" text-anchor="middle">${esc(name)}</text>`);
  });
  out.push(`<text x="84" y="1305" class="head">${esc(t.lifecycle)}</text>`);
  t.lifecycleSteps.forEach((step, index) => {
    const x = 250 + index * 360;
    out.push(`<circle cx="${x}" cy="1360" r="35" fill="${[C.blue,C.teal,C.amber,C.orange,C.purple,C.green][index]}"/>`);
    out.push(`<text x="${x}" y="1367" class="light" text-anchor="middle">${index + 1}</text>`);
    out.push(`<text x="${x}" y="1420" class="chip" text-anchor="middle">${esc(step)}</text>`);
    if (index < t.lifecycleSteps.length - 1) out.push(`<path d="M${x + 45} 1360 H${x + 305}" stroke="${C.line}" stroke-width="5"/>`);
  });
  out.push('</svg>');
  return `${out.join('\n')}\n`;
}

function readinessBoard(english) {
  const W = 2400; const H = 1700;
  const t = english ? {
    title: 'Readiness is an evidence queue, not a score',
    subtitle: 'Twelve scenario cards remain unauthorised and not run; separately, 7 of 11 metric items await field evidence.',
    eyebrow: 'AUTONOMY COMMONS / EVIDENCE STATUS', boundary: '7 / 11 AWAIT FIELD EVIDENCE · NOT SAFETY, READINESS OR PERFORMANCE',
    stats: [['12','scenario cards'],['3','candidate nodes'],['3','stop gates'],['6','evidence routes']],
    queueTitle: 'AUTONOMY METRIC EVIDENCE QUEUE', known: '4 / 11', knownLabel: 'package-structure facts readable', pending: '7 / 11', pendingLabel: 'awaiting field evidence', warning: 'NOT A QUALITY, MATURITY, SAFETY OR PERFORMANCE SCORE',
    distribution: 'SCENARIO DISTRIBUTION ACROSS THREE PROOF YARDS', bars: [['Zhongzhiyuan / safety yard',5],['AI Origin / equivalent service',4],['Dazhongsi / transfer route',3]],
    gateTitle: 'THREE STOP GATES · A MISSING ITEM HOLDS THE WINDOW', gates: [
      ['AV-T01','Route-conflict audit','Stop when the ordinary route cannot remain complete.'],
      ['AV-T02','Equivalent service','Stop when automation has no staffed or non-app equivalent.'],
      ['AV-T03','Offline / weather rollback','Stop when a vehicle or robot cannot return safely to human service.'],
    ],
    footer: 'field_data=false · operational_status=not_authorized_not_run · performance_results=null · baselines=unknown',
  } : {
    title: '准备度是一条证据队列，不是一张分数表',
    subtitle: '12 张场景卡仍未授权、未运行；另有 11 项指标中的 7 项等待现场证据。',
    eyebrow: '智行京张 / 证据状态', boundary: '7 / 11 项待现场证据 · 不是安全、准备度或绩效分',
    stats: [['12','场景卡'],['3','候选节点'],['3','停止闸门'],['6','证据路由']],
    queueTitle: '自动驾驶专属指标证据队列', known: '4 / 11', knownLabel: '包内结构事实可回读', pending: '7 / 11', pendingLabel: '等待现场证据', warning: '不是项目质量、成熟度、安全性或绩效评分',
    distribution: '12 个场景如何分配到三座公共证明庭', bars: [['众智园 / 安全试验',5],['AI 原点 / 等价服务',4],['大钟寺 / 换乘路线',3]],
    gateTitle: '三道停止闸门 · 任一缺项都停留在当前窗口', gates: [
      ['AV-T01','路线冲突审计','普通路线无法保持完整时停止。'],
      ['AV-T02','等价服务','没有人工或非 App 等价服务时停止。'],
      ['AV-T03','断网 / 天气回退','车辆或机器人无法安全回到人工服务时停止。'],
    ],
    footer: '机器边界：field_data=false · operational_status=not_authorized_not_run · performance_results=null · baselines=unknown',
  };
  const out = shell(W, H, t.title, t.subtitle, t.eyebrow, t.boundary);
  t.stats.forEach((stat, index) => {
    const x = 84 + index * 570;
    out.push(`<rect x="${x}" y="210" width="530" height="165" rx="20" fill="${C.paper}" stroke="${[C.blue,C.teal,C.amber,C.green][index]}" stroke-width="3"/>`);
    out.push(`<text x="${x + 34}" y="305" style="font:700 68px Menlo,Consolas,monospace;fill:${[C.blue,C.teal,C.amber,C.green][index]}">${esc(stat[0])}</text>`);
    out.push(`<text x="${x + 170}" y="292" class="head">${esc(stat[1])}</text>`);
  });
  out.push(`<rect x="84" y="420" width="1040" height="690" rx="24" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`);
  out.push(`<text x="124" y="474" class="eyebrow">${esc(t.queueTitle)}</text>`);
  out.push(`<rect x="124" y="520" width="456" height="310" rx="22" fill="${C.paleTeal}" stroke="${C.teal}" stroke-width="3"/>`);
  out.push(`<text x="352" y="650" style="font:700 80px Menlo,Consolas,monospace;fill:${C.teal}" text-anchor="middle">${esc(t.known)}</text>`);
  out.push(textLines(wrap(t.knownLabel, english ? 34 : 17, english).slice(0,2), 352, 710, 'head', 34, 'middle'));
  out.push(`<rect x="628" y="520" width="456" height="310" rx="22" fill="${C.paleRed}" stroke="${C.red}" stroke-width="3"/>`);
  out.push(`<text x="856" y="650" style="font:700 80px Menlo,Consolas,monospace;fill:${C.red}" text-anchor="middle">${esc(t.pending)}</text>`);
  out.push(textLines(wrap(t.pendingLabel, english ? 30 : 15, english).slice(0,2), 856, 710, 'head', 34, 'middle'));
  out.push(`<rect x="124" y="870" width="960" height="170" rx="18" fill="${C.navy}"/>`);
  out.push(textLines(wrap(t.warning, english ? 58 : 29, english).slice(0,2), 604, 940, 'lighthead', 38, 'middle'));
  out.push(`<rect x="1170" y="420" width="1146" height="690" rx="24" fill="${C.paper}" stroke="${C.line}" stroke-width="2"/>`);
  out.push(`<text x="1210" y="474" class="eyebrow">${esc(t.distribution)}</text>`);
  t.bars.forEach((bar, index) => {
    const y = 560 + index * 150;
    out.push(`<text x="1210" y="${y}" class="head">${esc(bar[0])}</text>`);
    out.push(`<rect x="1210" y="${y + 35}" width="900" height="42" rx="21" fill="#E5EDF5"/>`);
    out.push(`<rect x="1210" y="${y + 35}" width="${bar[1] * 150}" height="42" rx="21" fill="${[C.blue,C.teal,C.orange][index]}"/>`);
    out.push(`<text x="2160" y="${y + 67}" class="head">${bar[1]} / 12</text>`);
  });
  out.push(`<text x="84" y="1185" class="head">${esc(t.gateTitle)}</text>`);
  t.gates.forEach((gate, index) => {
    const x = 84 + index * 760;
    out.push(`<rect x="${x}" y="1225" width="720" height="330" rx="22" fill="${C.paper}" stroke="${[C.blue,C.amber,C.teal][index]}" stroke-width="3"/>`);
    out.push(`<text x="${x + 34}" y="1280" class="eyebrow">${esc(gate[0])}</text>`);
    out.push(`<text x="${x + 34}" y="1335" class="head">${esc(gate[1])}</text>`);
    out.push(textLines(wrap(gate[2], english ? 54 : 27, english).slice(0,3), x + 34, 1400, 'body', 30));
    out.push(`<rect x="${x + 34}" y="1490" width="652" height="40" rx="20" fill="${C.paleRed}"/>`);
    out.push(`<text x="${x + 360}" y="1517" class="chip" text-anchor="middle">STOP / HOLD / RETURN TO HUMAN SERVICE</text>`);
  });
  out.push(`<text x="84" y="1645" class="foot">${esc(t.footer)}</text></svg>`);
  return `${out.join('\n')}\n`;
}

function cultureBoard(english) {
  const W = 2400; const H = 1500;
  const t = english ? {
    title: 'From railway memory to public AI return',
    subtitle: 'Recognition belongs to evidence, maintenance and repair—not speed, celebrity or vendor exposure.',
    eyebrow: 'AUTONOMY COMMONS / AGENT.4 + AGENT.5 / CULTURE AND HONOUR', boundary: 'CONCEPT · RIGHTS-CLEARED TEXT AND LINEWORK ONLY · NO APPROVED ARTWORK',
    chain: culture.narrative_chain.map((item) => [item.name_en, item.meaning_en]),
    nodes: culture.node_carriers.map((item) => [item.name_en, item.carrier_en, item.honor_rule_en]),
    fields: 'PUBLIC RECOGNITION RECEIPT · SIX REQUIRED FIELDS', fieldNames: ['contribution','evidence receipt','independent review','rights / licence','maintenance owner','expiry / next review'],
    wayfinding: 'FIVE-LAYER PUBLIC WAYFINDING', layers: ['site + memory','ordinary route','status + consent','service + handover','redress + archive + return'],
    cycle: 'Q1 calibrate → Q2 audit a route → Q3 bounded staffed demo → Q4 publish repair, withdrawal or continuation',
    line: culture.international_line,
    carrierLabel: 'PUBLIC CARRIER', recognitionLabel: 'RECOGNITION RULE',
    footer: 'Withdraw when evidence, rights, maintenance ownership, review date or ordinary-route continuity is missing.',
  } : {
    title: '从京张铁路公共记忆，到 AI 的公共回馈',
    subtitle: '荣誉属于证据、维护与修复，不属于速度、名人榜或企业曝光。',
    eyebrow: '智行京张 / AGENT.4 + AGENT.5 / 文化与荣誉', boundary: '概念建议 · 仅用清权文字与线形 · 非已批准艺术品或建设项目',
    chain: culture.narrative_chain.map((item) => [item.name_zh, item.meaning_zh]),
    nodes: culture.node_carriers.map((item) => [item.name_zh, item.carrier_zh, item.honor_rule_zh]),
    fields: '公共荣誉回执 · 六个必填字段', fieldNames: ['贡献内容','证据回执','独立复核','权利 / 许可','维护责任','到期 / 复核日期'],
    wayfinding: '五层公共导视', layers: ['场地与公共记忆','普通路线','状态与同意','服务与接管','申诉、归档与归还'],
    cycle: 'Q1 校准 → Q2 审计完整路线 → Q3 有界有人演示 → Q4 发布修复、撤回或条件继续',
    line: '为试验而建，为修复而公开，用后归还公共使用。',
    carrierLabel: '公共载体', recognitionLabel: '荣誉规则',
    footer: '证据、权利、维护责任、复核日期或普通路线连续性任一缺失，即撤下展示并重开复核。',
  };
  const out = shell(W, H, t.title, t.subtitle, t.eyebrow, t.boundary);
  t.chain.forEach((item, index) => {
    const x = 84 + index * 760;
    out.push(`<rect x="${x}" y="210" width="720" height="255" rx="22" fill="${[C.paleBlue,C.paleTeal,C.paleRed][index]}" stroke="${[C.blue,C.teal,C.orange][index]}" stroke-width="3"/>`);
    out.push(`<text x="${x + 34}" y="270" class="head">0${index + 1} · ${esc(item[0])}</text>`);
    out.push(textLines(wrap(item[1], english ? 60 : 30, english).slice(0,4), x + 34, 330, 'body', 30));
    if (index < 2) out.push(`<path d="M${x + 725} 338 H${x + 755}" stroke="${C.line}" stroke-width="6"/>`);
  });
  t.nodes.forEach((item, index) => {
    const x = 84 + index * 760;
    out.push(`<rect x="${x}" y="520" width="720" height="430" rx="22" fill="${C.paper}" stroke="${[C.blue,C.teal,C.orange][index]}" stroke-width="3"/>`);
    out.push(`<text x="${x + 34}" y="580" class="head">${esc(item[0])}</text>`);
    out.push(`<text x="${x + 34}" y="635" class="eyebrow">${esc(t.carrierLabel)}</text>`);
    out.push(textLines(wrap(item[1], english ? 58 : 29, english).slice(0,4), x + 34, 675, 'body', 30));
    out.push(`<text x="${x + 34}" y="815" class="eyebrow">${esc(t.recognitionLabel)}</text>`);
    out.push(textLines(wrap(item[2], english ? 58 : 29, english).slice(0,4), x + 34, 855, 'body', 30));
  });
  out.push(`<text x="84" y="1020" class="head">${esc(t.fields)}</text>`);
  t.fieldNames.forEach((name, index) => {
    const x = 84 + index * 380;
    out.push(`<rect x="${x}" y="1050" width="350" height="64" rx="32" fill="${index % 2 ? C.paleTeal : C.paleBlue}" stroke="${index % 2 ? C.teal : C.blue}"/>`);
    out.push(`<text x="${x + 175}" y="1091" class="chip" text-anchor="middle">${esc(name)}</text>`);
  });
  out.push(`<text x="84" y="1185" class="head">${esc(t.wayfinding)}</text>`);
  t.layers.forEach((layer, index) => {
    const x = 84 + index * 456;
    out.push(`<rect x="${x}" y="1215" width="420" height="72" rx="14" fill="${[C.blue,C.teal,C.amber,C.orange,C.purple][index]}"/>`);
    out.push(`<text x="${x + 210}" y="1260" class="light" text-anchor="middle">${esc(layer)}</text>`);
  });
  out.push(`<rect x="84" y="1335" width="2232" height="90" rx="18" fill="${C.navy}"/>`);
  out.push(`<text x="1200" y="1373" class="light" text-anchor="middle">${esc(t.cycle)}</text>`);
  out.push(`<text x="1200" y="1405" class="lighthead" text-anchor="middle">${esc(t.line)}</text>`);
  out.push(`<text x="84" y="1470" class="foot">${esc(t.footer)}</text></svg>`);
  return `${out.join('\n')}\n`;
}

function digest(buffer) { return crypto.createHash('sha256').update(buffer).digest('hex'); }

async function png(svg) { return sharp(Buffer.from(svg)).png({ compressionLevel: 9, adaptiveFiltering: false }).toBuffer(); }

async function main() {
  fs.mkdirSync(figureDir, { recursive: true });
  const generated = [];
  for (const spec of [
    ['regional-ecosystem', regionalBoard],
    ['autonomy-readiness', readinessBoard],
    ['culture-honor-system', cultureBoard],
  ]) {
    for (const english of [false, true]) {
      const suffix = english ? '.en' : '';
      const svgName = `${spec[0]}${suffix}.svg`;
      const pngName = `${spec[0]}${suffix}.png`;
      const svgText = spec[1](english);
      const expectedPng = await png(svgText);
      const svgPath = path.join(figureDir, svgName);
      const pngPath = path.join(figureDir, pngName);
      if (!checkOnly) {
        fs.writeFileSync(svgPath, svgText);
        fs.writeFileSync(pngPath, expectedPng);
      }
      const actualSvg = fs.readFileSync(svgPath);
      const actualPng = fs.readFileSync(pngPath);
      const meta = await sharp(actualPng).metadata();
      generated.push({
        path: `assets/figures/${pngName}`, source_svg: `assets/figures/${svgName}`,
        width: meta.width, height: meta.height, sha256: digest(actualPng),
        deterministic_match: digest(actualSvg) === digest(Buffer.from(svgText)) && digest(actualPng) === digest(expectedPng),
      });
    }
  }
  for (const stem of ['autonomy-node-interface', 'resource-decision-board']) {
    for (const english of [false, true]) {
      const suffix = english ? '.en' : '';
      const svgPath = path.join(figureDir, `${stem}${suffix}.svg`);
      const pngPath = path.join(figureDir, `${stem}${suffix}.png`);
      const svg = fs.readFileSync(svgPath);
      const expectedPng = await sharp(svg).png({ compressionLevel: 9, adaptiveFiltering: false }).toBuffer();
      if (!checkOnly) fs.writeFileSync(pngPath, expectedPng);
      const actualPng = fs.readFileSync(pngPath);
      const meta = await sharp(actualPng).metadata();
      generated.push({
        path: `assets/figures/${stem}${suffix}.png`, source_svg: `assets/figures/${stem}${suffix}.svg`,
        width: meta.width, height: meta.height, sha256: digest(actualPng), deterministic_match: digest(actualPng) === digest(expectedPng),
      });
    }
  }
  const payload = {
    schema_version: '1.0.0', package_iteration: 'v4.0',
    generated_by: 'visual/assets/build-autonomy-delivery-v40.js',
    boundary: 'conceptual_provisional_not_authorized_not_run_not_a_score',
    source_registers: ['regional-ecosystem.json', 'culture-honor-return-system.json', 'metrics.json', 'autonomous-scenarios.json', 'curbside-test-gates.json'],
    reports: generated,
  };
  if (!checkOnly) fs.writeFileSync(evidencePath, `${JSON.stringify(payload, null, 2)}\n`);
  const ok = generated.every((item) => item.deterministic_match && item.width && item.height);
  console.log(JSON.stringify({ ok, ...payload }, null, 2));
  process.exit(ok ? 0 : 1);
}

main().catch((error) => { console.error(error); process.exit(1); });
