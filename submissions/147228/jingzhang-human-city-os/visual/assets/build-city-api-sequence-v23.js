#!/usr/bin/env node
/*
 * Human City OS v2.3: city-API sequence board.
 *
 * The board is generated from city-api-sequence-v23.json.  It is a conceptual
 * accountability sequence, not a system diagram, deployment claim, or metric.
 */
const fs = require('fs');
const path = require('path');

const here = __dirname;
const packageRoot = path.resolve(here, '../..');
const figureRoot = path.join(packageRoot, 'assets', 'figures');
const data = JSON.parse(fs.readFileSync(path.join(here, 'city-api-sequence-v23.json'), 'utf8'));

const COLORS = ['#2A9D8F', '#3D76EA', '#E76F51', '#7657C8', '#E9A93A', '#5E9C76'];
function esc(value) { return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function wrap(text, max, english) {
  if (!text) return [];
  if (english) {
    const rows = []; let current = '';
    for (const word of String(text).split(/\s+/)) {
      const next = current ? `${current} ${word}` : word;
      if (next.length > max && current) { rows.push(current); current = word; } else current = next;
    }
    if (current) rows.push(current);
    return rows;
  }
  const chars = [...String(text)]; const rows = [];
  for (let i = 0; i < chars.length; i += max) rows.push(chars.slice(i, i + max).join(''));
  return rows;
}
function textLines(lines, x, y, cls, lineHeight = 22) {
  return `<text x="${x}" y="${y}" class="${cls}">${lines.map((line, i) => `<tspan x="${x}" dy="${i ? lineHeight : 0}">${esc(line)}</tspan>`).join('')}</text>`;
}
function arrow(x1, y1, x2, y2, color) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="5" marker-end="url(#arrow)"/>`;
}

function render(english = false) {
  const W = 2600; const H = 1600;
  const title = english ? 'Human City OS | six-step replayable city-API sequence' : '人本城市操作系统｜城市 API 六步可回放序列';
  const subtitle = english ? 'Catalogue → authorize → call → log → audit → exit · concept evidence only' : '目录 → 授权 → 调用 → 日志 → 审计 → 退出 · 仅为概念证据';
  const labels = english ? ['CATALOGUE', 'AUTHORIZE', 'CALL', 'LOG', 'AUDIT', 'EXIT'] : ['目录', '授权', '调用', '日志', '审计', '退出'];
  const lines = [];
  lines.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`);
  lines.push('<defs><marker id="arrow" markerWidth="12" markerHeight="12" refX="9" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 Z" fill="#8CA0B5"/></marker></defs>');
  lines.push('<rect width="2600" height="1600" fill="#F7F9FC"/>');
  lines.push('<style>');
  lines.push('.title{font:700 46px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#142B4A}.sub{font:22px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#60748D}.step{font:700 22px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#FFFFFF}.stepid{font:15px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#FFFFFF}.label{font:700 23px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#142B4A}.actor{font:600 17px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#36526E}.body{font:17px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#1D3955}.small{font:15px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#60748D}.stop{font:600 16px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#9E4A4A}.foot{font:16px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#C95D5D}</style>');
  lines.push(`<text x="84" y="78" class="title">${esc(title)}</text>`);
  lines.push(`<text x="84" y="116" class="sub">${esc(subtitle)}</text>`);
  lines.push(`<text x="2515" y="78" text-anchor="end" class="small">PACKAGE v2.3</text>`);
  lines.push(`<text x="2515" y="110" text-anchor="end" class="foot">${esc(english ? 'CONCEPT / NOT AUTHORIZED / NOT RUN' : '概念 / 未授权 / 未运行')}</text>`);

  const left = 74; const top = 208; const cardW = 374; const cardH = 700; const gap = 38;
  data.steps.forEach((step, index) => {
    const x = left + index * (cardW + gap); const color = COLORS[index];
    if (index < data.steps.length - 1) lines.push(arrow(x + cardW + 7, top + 92, x + cardW + gap - 8, top + 92, '#8CA0B5'));
    lines.push(`<rect x="${x}" y="${top}" width="${cardW}" height="${cardH}" rx="18" fill="#FFFFFF" stroke="${color}" stroke-width="3"/>`);
    lines.push(`<rect x="${x}" y="${top}" width="${cardW}" height="76" rx="18" fill="${color}"/>`);
    lines.push(`<text x="${x + 24}" y="${top + 31}" class="step">${esc(`${String(index + 1).padStart(2, '0')} · ${labels[index]}`)}</text>`);
    lines.push(`<text x="${x + 24}" y="${top + 57}" class="stepid">${esc(step.step_id)}</text>`);
    const actor = wrap(english ? step.actor_en : step.actor_zh, english ? 32 : 16, english);
    lines.push(textLines(actor, x + 24, top + 115, 'actor', 21));
    lines.push(`<line x1="${x + 24}" y1="${top + 157}" x2="${x + cardW - 24}" y2="${top + 157}" stroke="#DDE5ED"/>`);
    lines.push(`<text x="${x + 24}" y="${top + 190}" class="label">${esc(english ? 'Spatial / accountability move' : '空间 / 责任动作')}</text>`);
    lines.push(textLines(wrap(english ? step.action_en : step.action_zh, english ? 31 : 17, english), x + 24, top + 226, 'body', 24));
    lines.push(`<text x="${x + 24}" y="${top + 343}" class="label">${esc(english ? 'Human equivalent' : '人工等效')}</text>`);
    lines.push(textLines(wrap(english ? step.human_equivalent_en : step.human_equivalent_zh, english ? 31 : 17, english), x + 24, top + 379, 'body', 24));
    lines.push(`<rect x="${x + 18}" y="${top + 492}" width="${cardW - 36}" height="156" rx="12" fill="#FFF5F0" stroke="#F3C7BA"/>`);
    lines.push(`<text x="${x + 34}" y="${top + 526}" class="stop">${esc(english ? 'STOP / RETURN' : '停止 / 回退')}</text>`);
    lines.push(textLines(wrap(english ? step.stop_trigger_en : step.stop_trigger_zh, english ? 30 : 16, english), x + 34, top + 561, 'stop', 22));
    const refs = step.evidence_refs.join(' · ').replaceAll('visual/assets/', '…/');
    lines.push(textLines(wrap(refs, english ? 42 : 28, english).slice(0, 2), x + 24, top + 668, 'small', 16));
  });

  const boxY = 1000;
  lines.push(`<text x="74" y="${boxY - 28}" class="label">${esc(english ? 'Replay contract / what a reviewer can verify' : '回放契约 / 评审者可核对什么')}</text>`);
  const contracts = english ? [
    ['HUMAN', 'Staffed / telephone / paper / offline routes remain beside AI assistance.'],
    ['BOUNDARY', 'Place · time · data · accountability are declared before any call.'],
    ['EVIDENCE', 'Scenario, anchor, release gate, log, objection and exit are linked.'],
    ['UNKNOWN', 'Official geometry, rights, safety, energy and field baselines remain open.'],
  ] : [
    ['人工', '人工 / 电话 / 纸面 / 线下路径与 AI 辅助并列保留。'],
    ['边界', '每次调用前先声明地点 · 时间 · 数据 · 责任四限定。'],
    ['证据', '场景、空间锚点、发布门、日志、异议和退出相互回接。'],
    ['缺口', '官方几何、权属、安全、能源和现场基线仍待补齐。'],
  ];
  contracts.forEach((entry, i) => {
    const x = 74 + i * 630;
    lines.push(`<rect x="${x}" y="${boxY}" width="594" height="190" rx="16" fill="#FFFFFF" stroke="#CBD7E3" stroke-width="2"/>`);
    lines.push(`<text x="${x + 24}" y="${boxY + 42}" class="label">${esc(entry[0])}</text>`);
    lines.push(textLines(wrap(entry[1], english ? 47 : 30, english), x + 24, boxY + 83, 'body', 26));
  });
  lines.push(`<rect x="74" y="${boxY + 244}" width="2452" height="190" rx="16" fill="#EEF3F8" stroke="#CBD7E3" stroke-width="2"/>`);
  const boundary = english
    ? 'This is a conceptual sequence only: official_boundary=false · geometry_role=provisional_constraint · operational_status=not_authorized_not_run · performance_results=null. It does not create an API, permit, engineering section, operating result, or official score.'
    : '这是一条概念序列：official_boundary=false · geometry_role=provisional_constraint · operational_status=not_authorized_not_run · performance_results=null。它不生成 API 实体、许可、工程断面、运营结果或官方分数。';
  lines.push(`<text x="104" y="${boxY + 292}" class="label">${esc(english ? 'Boundary' : '边界')}</text>`);
  lines.push(textLines(wrap(boundary, english ? 154 : 90, english), 104, boxY + 336, 'body', 27));
  lines.push(`<text x="74" y="${H - 42}" class="foot">${esc(english ? 'Conceptual suggestion / reference scheme for professional teams to deepen · no external requests' : '概念建议 / 参考方案，供专业团队深化研究 · 全离线')}</text>`);
  lines.push('</svg>');
  return lines.join('\n') + '\n';
}

fs.writeFileSync(path.join(here, 'city-api-sequence-v23.json'), `${JSON.stringify(data, null, 2)}\n`);
fs.writeFileSync(path.join(figureRoot, 'city-api-sequence-v23.svg'), render(false));
fs.writeFileSync(path.join(figureRoot, 'city-api-sequence-v23.en.svg'), render(true));
console.log(JSON.stringify({ package_iteration: data.package_iteration, sequence_id: data.sequence_id, steps: data.steps.length, targets: ['city-api-sequence-v23.svg', 'city-api-sequence-v23.en.svg'] }, null, 2));
