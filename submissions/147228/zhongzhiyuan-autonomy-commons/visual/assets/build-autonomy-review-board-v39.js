#!/usr/bin/env node
/*
 * Autonomy Commons v3.9 reviewer-entry builder.
 *
 * The board makes the proposal's public-space choice visible before the
 * governance appendix: one ordinary route, three proof yards, six official
 * mechanism references and one reversible annual loop. It creates no field,
 * permit, operator, performance or official-score claim.
 */
const crypto = require('crypto');
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
  try { return require('sharp'); } catch (initialError) {
    const modules = bundledModules();
    if (!modules) throw initialError;
    const bundledNode = path.resolve(modules, '..', 'bin', 'node');
    const currentNode = fs.realpathSync(process.execPath);
    const resolvedNode = fs.existsSync(bundledNode) ? fs.realpathSync(bundledNode) : '';
    if (resolvedNode && resolvedNode !== currentNode && process.env.AUTONOMY_BOARD_BUNDLED_NODE !== '1') {
      const result = spawnSync(resolvedNode, [__filename, ...process.argv.slice(2)], {
        stdio: 'inherit', env: { ...process.env, AUTONOMY_BOARD_BUNDLED_NODE: '1' },
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
const figures = path.join(root, 'assets', 'figures');
const evidencePath = path.join(here, 'autonomy-core-review-v39.json');
const checkOnly = process.argv.includes('--check');
const W = 2400;
const H = 1500;
const colors = {
  ink: '#102A43', muted: '#627D98', line: '#BCCCDC', bg: '#F5F8FC', paper: '#FFFFFF',
  blue: '#2F6FED', teal: '#138A7E', green: '#4C956C', orange: '#E56B4A',
  yellow: '#E9A23B', purple: '#7457C8', red: '#C94C4C', paleBlue: '#EAF1FF',
  paleTeal: '#EAF8F5', paleRed: '#FFF1EF', navy: '#16324F',
};

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function wrap(value, max, english) {
  const text = String(value || '');
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

function textLines(lines, x, y, className = 'body', lineHeight = 27, anchor = 'start') {
  return `<text x="${x}" y="${y}" class="${className}" text-anchor="${anchor}">${lines.map((line, index) => `<tspan x="${x}" dy="${index ? lineHeight : 0}">${esc(line)}</tspan>`).join('')}</text>`;
}

function board(english) {
  const t = english ? {
    title: 'Autonomy Commons | prove the public route before admitting automation',
    sub: 'One ordinary route · three public proof yards · six transferable mechanisms · one reversible year',
    section: '01 / a spatial public-service argument, not a vehicle deployment plan',
    route: 'THE ORDINARY ROUTE THAT MAY NOT BE TAKEN AWAY',
    nodes: [
      ['01 · ZHONGZHIYUAN', 'Can a bounded test fail in public and return to staffed service?', 'proof: close window · named takeover · restoration note'],
      ['02 · AI ORIGIN COMMUNITY', 'Can no-app users, wheelchair users and carers complete the same trip?', 'proof: paper / phone / human entry · equivalent route · redress'],
      ['03 · DAZHONGSI', 'Can rail arrival, curb service and logistics coexist without cutting the ordinary path?', 'proof: quiet arrival · clear curb · fire/access route retained'],
    ],
    stop: 'STOP RULE',
    stopText: 'If any link loses an ordinary route, accountable handover or readable appeal, automation does not enter the window.',
    casesTitle: 'SIX OFFICIAL MECHANISMS · ONE BORROWED RULE EACH',
    cases: [
      ['BEIJING', 'approved roads + accountable joint mechanism'],
      ['SINGAPORE CETRAN', 'test before public-path exemption'],
      ['UK CCAV', 'public safety case + early engagement'],
      ['LONDON TFL', 'align trials with walk / cycle / transit'],
      ['JAPAN EIHEIJI', 'bounded ODD + safe stop on failure'],
      ['US NHTSA AV TEST', 'public map + coordinator / operator distinction'],
    ],
    transfer: 'Transfer the mechanism only. Do not transfer foreign results, permission, partners, liability or operating performance.',
    yearTitle: 'ONE REVERSIBLE YEAR',
    seasons: [
      ['Q1 · ASK', 'publish breaks + owners'],
      ['Q2 · WALK', 'audit one complete route'],
      ['Q3 · TRY', 'one bounded staffed window'],
      ['Q4 · RELEASE / EXIT', 'publish failure, repair or withdrawal'],
    ],
    receiptTitle: 'P0 COMPLETE-ROUTE RECEIPT',
    receipt: 'entrance → ordinary path → status / consent → bounded service → human takeover → return → redress',
    footer: 'official_boundary=false · not_authorized_not_run · field_data=false · performance_results=null',
  } : {
    title: '智行京张｜自动化进场前，先证明普通路线没有被拿走',
    sub: '一条普通路线 · 三座公共证明庭 · 六个可迁移机制 · 一个可撤回年度循环',
    section: '01 / 这是一条空间公共服务主张，不是车辆部署计划',
    route: '不能被拿走的普通路线',
    nodes: [
      ['01 · 众智园', '受限试验能否公开失败，并回到有人服务？', '证明：窗口可关 · 接管有人 · 恢复有记录'],
      ['02 · AI 原点社区', '不用 App、坐轮椅或带照护任务的人，能否完成同一旅程？', '证明：纸面 / 电话 / 人工入口 · 等价路线 · 可申诉'],
      ['03 · 大钟寺', '轨道到达、路缘服务与物流，能否不截断普通路径？', '证明：安静到达 · 路缘可读 · 消防与无障碍连续'],
    ],
    stop: '停止规则',
    stopText: '任何一环失去普通路线、责任明确的人工交接或可回读申诉，自动化都不得进入服务窗口。',
    casesTitle: '六个官方机制｜每个只借一条规则',
    cases: [
      ['北京', '批准道路 + 联合责任机制'],
      ['新加坡 CETRAN', '先测试，再讨论公共路径豁免'],
      ['英国 CCAV', '公开安全说明 + 提前参与'],
      ['伦敦 TfL', '试验服从步行 / 骑行 / 公交'],
      ['日本永平寺', '限定运行设计域 + 失败安全停车'],
      ['美国 NHTSA AV TEST', '公开地图 + 区分协调者与运营者'],
    ],
    transfer: '只迁移机制，不迁移外地结果、许可、伙伴、责任或运营绩效。',
    yearTitle: '一个可撤回年度循环',
    seasons: [
      ['Q1 · 问', '公开断点与责任'],
      ['Q2 · 走', '审计一条完整路线'],
      ['Q3 · 试', '一个受限有人窗口'],
      ['Q4 · 发布 / 退出', '公开失败、修复或撤场'],
    ],
    receiptTitle: 'P0 完整路线回执',
    receipt: '入口 → 普通路径 → 状态 / 同意 → 受限服务 → 人工接管 → 返程 → 申诉',
    footer: 'official_boundary=false · 未授权未运行 · 无现场数据 · 无绩效结果',
  };

  const out = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`,
    `<rect width="${W}" height="${H}" fill="${colors.bg}"/>`,
    '<style>.title{font:700 48px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#102A43}.subtitle{font:22px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#627D98}.section{font:700 23px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#16324F}.head{font:700 22px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#16324F}.body{font:19px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#27445F}.small{font:16px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#627D98}.chip{font:700 17px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#16324F}.lighthead{font:700 22px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#FFFFFF}.lightsmall{font:16px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#D9E2EC}.lightchip{font:700 17px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#FFFFFF}.foot{font:15px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#C94C4C}</style>',
    `<text x="84" y="72" class="title">${esc(t.title)}</text>`,
    `<text x="84" y="113" class="subtitle">${esc(t.sub)}</text>`,
    `<text x="2316" y="72" text-anchor="end" class="small">AUTONOMY COMMONS · v3.9</text>`,
    `<text x="2316" y="105" text-anchor="end" class="foot">${esc(english ? 'CONCEPT / PROVISIONAL' : '概念 / 临时约束')}</text>`,
    `<text x="84" y="178" class="section">${esc(t.section)}</text>`,
    `<rect x="84" y="215" width="1000" height="915" rx="20" fill="${colors.paper}" stroke="${colors.line}" stroke-width="2"/>`,
    `<text x="120" y="264" class="head">${esc(t.route)}</text>`,
    `<line x1="195" y1="340" x2="195" y2="910" stroke="${colors.blue}" stroke-width="14" stroke-linecap="round"/>`,
  ];
  const nodeColors = [colors.blue, colors.orange, colors.teal];
  t.nodes.forEach((node, index) => {
    const y = 335 + index * 210;
    out.push(`<circle cx="195" cy="${y}" r="34" fill="${nodeColors[index]}" stroke="#FFFFFF" stroke-width="5"/>`);
    out.push(`<rect x="255" y="${y - 58}" width="775" height="164" rx="16" fill="${index === 1 ? colors.paleTeal : colors.paleBlue}" stroke="${nodeColors[index]}" stroke-width="2"/>`);
    out.push(`<text x="282" y="${y - 18}" class="chip">${esc(node[0])}</text>`);
    out.push(textLines(wrap(node[1], english ? 62 : 30, english).slice(0, 2), 282, y + 22, 'body', 27));
    out.push(`<text x="282" y="${y + 79}" class="small">${esc(node[2])}</text>`);
  });
  out.push(`<rect x="120" y="948" width="910" height="140" rx="16" fill="${colors.paleRed}" stroke="${colors.red}" stroke-width="3"/>`);
  out.push(`<text x="150" y="990" class="chip">${esc(t.stop)}</text>`);
  out.push(textLines(wrap(t.stopText, english ? 76 : 38, english).slice(0, 2), 150, 1035, 'body', 29));

  out.push(`<rect x="1125" y="215" width="1191" height="600" rx="20" fill="${colors.paper}" stroke="${colors.line}" stroke-width="2"/>`);
  out.push(`<text x="1160" y="264" class="head">${esc(t.casesTitle)}</text>`);
  t.cases.forEach((item, index) => {
    const col = index % 2; const row = Math.floor(index / 2);
    const x = 1160 + col * 560; const y = 295 + row * 145;
    out.push(`<rect x="${x}" y="${y}" width="530" height="120" rx="14" fill="${index % 2 ? colors.paleTeal : colors.paleBlue}" stroke="${[colors.blue, colors.teal, colors.orange, colors.purple, colors.green, colors.yellow][index]}" stroke-width="2"/>`);
    out.push(`<text x="${x + 20}" y="${y + 38}" class="chip">0${index + 1} · ${esc(item[0])}</text>`);
    out.push(textLines(wrap(item[1], english ? 43 : 22, english).slice(0, 2), x + 20, y + 76, 'small', 23));
  });
  out.push(`<rect x="1160" y="742" width="1120" height="48" rx="10" fill="${colors.paleRed}"/>`);
  out.push(`<text x="1180" y="773" class="small">${esc(t.transfer)}</text>`);

  out.push(`<rect x="1125" y="850" width="1191" height="280" rx="20" fill="${colors.paper}" stroke="${colors.line}" stroke-width="2"/>`);
  out.push(`<text x="1160" y="898" class="head">${esc(t.yearTitle)}</text>`);
  t.seasons.forEach((item, index) => {
    const x = 1160 + index * 280;
    out.push(`<rect x="${x}" y="930" width="250" height="152" rx="14" fill="${index === 3 ? colors.paleRed : colors.paleBlue}" stroke="${index === 3 ? colors.red : colors.blue}"/>`);
    out.push(`<text x="${x + 18}" y="970" class="chip">${esc(item[0])}</text>`);
    out.push(textLines(wrap(item[1], english ? 25 : 13, english).slice(0, 2), x + 18, 1012, 'small', 24));
    if (index < 3) out.push(`<path d="M${x + 252} 1004 H${x + 272}" stroke="${colors.blue}" stroke-width="4"/>`);
  });

  out.push(`<rect x="84" y="1175" width="2232" height="175" rx="18" fill="${colors.navy}"/>`);
  out.push(`<text x="120" y="1222" class="lightchip">${esc(t.receiptTitle)}</text>`);
  out.push(`<text x="120" y="1280" class="lighthead">${esc(t.receipt)}</text>`);
  out.push(`<text x="120" y="1324" class="lightsmall">${esc(english ? 'Every link needs a dated owner, visible fallback and replayable receipt. Averages may not hide one broken link.' : '每一环都要有日期、责任、可见回退与可复演回执；平均分不能掩盖任何一处断点。')}</text>`);
  out.push(`<text x="84" y="1428" class="foot">${esc(t.footer)}</text>`);
  out.push(`<text x="2316" y="1428" text-anchor="end" class="small">${esc(english ? 'mechanism transfer only · no foreign result imported' : '只迁移机制 · 不导入外地结果')}</text></svg>`);
  return `${out.join('\n')}\n`;
}

async function expectedPng(english) {
  return sharp(Buffer.from(board(english))).png({ compressionLevel: 9, adaptiveFiltering: false }).toBuffer();
}

async function main() {
  const reports = [];
  for (const english of [false, true]) {
    const name = english ? 'site-overview.en.png' : 'site-overview.png';
    const output = path.join(figures, name);
    const expected = await expectedPng(english);
    if (!checkOnly) fs.writeFileSync(output, expected);
    const actual = fs.readFileSync(output);
    const meta = await sharp(actual).metadata();
    const expectedHash = crypto.createHash('sha256').update(expected).digest('hex');
    const actualHash = crypto.createHash('sha256').update(actual).digest('hex');
    reports.push({
      path: `assets/figures/${name}`,
      language: english ? 'en' : 'zh',
      width: meta.width,
      height: meta.height,
      sha256: actualHash,
      deterministic_match: actualHash === expectedHash,
      errors: [meta.width !== W ? `width=${meta.width}` : null, meta.height !== H ? `height=${meta.height}` : null, actualHash !== expectedHash ? 'render differs from builder' : null].filter(Boolean),
    });
  }
  const payload = {
    schema_version: '0.1.0', package_iteration: 'v3.9',
    generated_by: 'visual/assets/build-autonomy-review-board-v39.js',
    boundary: 'concept_and_provisional_not_authorized_not_run', reports,
  };
  if (!checkOnly) fs.writeFileSync(evidencePath, `${JSON.stringify(payload, null, 2)}\n`);
  const ok = reports.every((report) => report.errors.length === 0);
  console.log(JSON.stringify({ ok, ...payload }, null, 2));
  process.exit(ok ? 0 : 1);
}

main().catch((error) => { console.error(error); process.exit(1); });
