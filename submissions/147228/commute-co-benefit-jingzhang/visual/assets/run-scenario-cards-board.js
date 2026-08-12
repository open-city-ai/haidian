#!/usr/bin/env node

/*
 * Render the ten mobility scenario contracts as a bilingual, presentation-
 * ready board.  The board only exposes declared design fields; it does not
 * create partners, demand, permits or field results.
 */
const fs = require('fs');
const path = require('path');

const assetDir = __dirname;
const packageDir = path.resolve(assetDir, '..', '..');
const figureDir = path.join(packageDir, 'assets', 'figures');
const data = JSON.parse(fs.readFileSync(path.join(assetDir, 'scenario-cards.json'), 'utf8'));

const required = [
  'space', 'users', 'trigger', 'inputs', 'service_action', 'readout',
  'accountable_role', 'fallback', 'stop_condition', 'evidence_status', 'run_status'
];
const fieldKeys = ['space', 'users', 'trigger', 'inputs', 'service_action', 'readout', 'accountable_role', 'fallback'];
if (!Array.isArray(data.cards) || data.cards.length !== 10) {
  throw new Error(`scenario card count must be 10, got ${data.cards?.length}`);
}
for (const card of data.cards) {
  for (const key of required) {
    const field = key === 'evidence_status' ? data.evidence_status : key === 'run_status' ? data.run_status : `${key}_zh`;
    if (!card[field] && !(key === 'evidence_status' || key === 'run_status')) {
      throw new Error(`${card.id} missing ${field}`);
    }
  }
}

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function splitChars(value, max) {
  const chars = [...value];
  const lines = [];
  for (let index = 0; index < chars.length; index += max) {
    lines.push(chars.slice(index, index + max).join(''));
  }
  return lines;
}

function wrap(text, max = 48) {
  const value = String(text).trim();
  if (!/\s/.test(value)) return splitChars(value, max);

  const lines = [];
  let line = '';
  for (const word of value.split(/\s+/)) {
    const chunks = [...word].length > max ? splitChars(word, max) : [word];
    for (const chunk of chunks) {
      const candidate = line ? `${line} ${chunk}` : chunk;
      if ([...candidate].length <= max) {
        line = candidate;
      } else {
        if (line) lines.push(line);
        line = chunk;
      }
    }
  }
  if (line) lines.push(line);
  return lines;
}

function fieldMarkup(x, y, label, value, color, maxChars = 52) {
  const lines = wrap(value, maxChars);
  const text = lines.map((line, index) => `<text x="${x + 82}" y="${y + 14 + index * 13}" class="field">${esc(line)}</text>`).join('');
  return `<text x="${x}" y="${y + 14}" class="label" fill="${color}">${esc(label)}</text>${text}`;
}

function stopMarkup(x, y, label, value, maxChars = 68) {
  const lines = wrap(value, maxChars);
  const text = lines.map((line, index) => `<text x="${x + 82}" y="${y + 14 + index * 13}" class="stopText">${esc(line)}</text>`).join('');
  return `<text x="${x}" y="${y + 14}" class="stopLabel" fill="#F39BAE">${esc(label)}</text>${text}`;
}

function regexEscape(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function assertBoardCoverage(svg, lang) {
  const labels = lang === 'zh'
    ? ['空间', '对象', '触发', '输入', '动作', '读数', '责任', '回退']
    : ['SPACE', 'PEOPLE', 'TRIGGER', 'INPUT', 'ACTION', 'READOUT', 'OWNER', 'FALLBACK'];
  for (const label of labels) {
    const count = (svg.match(new RegExp(`class="label"[^>]*>${regexEscape(label)}<\\/text>`, 'g')) || []).length;
    if (count !== data.cards.length) {
      throw new Error(`${lang} board rendered ${count}/${data.cards.length} ${label} labels`);
    }
  }
  const stopLabel = lang === 'zh' ? '停止' : 'STOP';
  const stopCount = (svg.match(new RegExp(`class="stopLabel"[^>]*>${regexEscape(stopLabel)}<\\/text>`, 'g')) || []).length;
  if (stopCount !== data.cards.length) {
    throw new Error(`${lang} board rendered ${stopCount}/${data.cards.length} ${stopLabel} labels`);
  }
}

const accents = ['#55E4C1', '#7DA8FF', '#F7BF63', '#F082A7', '#B7A4FF', '#5ED6D0', '#FF9F68', '#8CB6FF', '#E5C25D', '#D99CF7'];

function board(lang) {
  const zh = lang === 'zh';
  const title = zh ? '十张交通场景卡：从需求登记到停止条件' : 'TEN MOBILITY SCENARIO CARDS: FROM REQUEST TO STOP';
  const subtitle = zh
    ? '每张卡都回答空间、对象、触发、输入、动作、读数、责任、回退与停止；当前均未授权、未运行'
    : 'Each card states place, people, trigger, inputs, action, readout, owner, fallback and stop; all remain unauthorised and unrun';
  const labels = zh
    ? {space: '空间', users: '对象', trigger: '触发', inputs: '输入', service_action: '动作', readout: '读数', accountable_role: '责任', fallback: '回退', stop_condition: '停止'}
    : {space: 'SPACE', users: 'PEOPLE', trigger: 'TRIGGER', inputs: 'INPUT', service_action: 'ACTION', readout: 'READOUT', accountable_role: 'OWNER', fallback: 'FALLBACK', stop_condition: 'STOP'};
  const valuesFor = (card, key) => zh ? card[`${key}_zh`] : card[`${key}_en`];
  const fieldMaxChars = 48;
  const lineHeight = 13;
  const rowLayouts = [];
  let cursor = 42;
  for (const key of fieldKeys) {
    const maxLines = Math.max(...data.cards.map((card) => wrap(valuesFor(card, key), fieldMaxChars).length));
    rowLayouts.push({key, y: cursor});
    cursor += maxLines * lineHeight + 8;
  }
  const stopMaxChars = 68;
  const stopY = cursor + 6;
  const stopLines = Math.max(...data.cards.map((card) => wrap(valuesFor(card, 'stop_condition'), stopMaxChars).length));
  const cardHeight = stopY + stopLines * lineHeight + 16;
  const cardWidth = 730;
  const left = 60;
  const top = 142;
  const gapX = 20;
  const gapY = 14;
  const cards = data.cards.map((card, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = left + col * (cardWidth + gapX);
    const y = top + row * (cardHeight + gapY);
    const accent = accents[index];
    const titleText = zh ? card.title_zh : card.title_en;
    const values = {
      ...Object.fromEntries([...fieldKeys, 'stop_condition'].map((key) => [key, valuesFor(card, key)])),
    };
    const rowMarkup = rowLayouts.map(({key, y: yy}) => fieldMarkup(x + 18, y + yy, labels[key], values[key], accent, fieldMaxChars)).join('');
    const stop = stopMarkup(x + 18, y + stopY, labels.stop_condition, values.stop_condition, stopMaxChars);
    return `<g class="card"><rect x="${x}" y="${y}" width="${cardWidth}" height="${cardHeight}" rx="18" fill="#102A3A" stroke="#2D5366" stroke-width="1.5"/><rect x="${x}" y="${y}" width="8" height="${cardHeight}" rx="4" fill="${accent}"/><text x="${x + 24}" y="${y + 29}" class="cardId" fill="${accent}">${esc(card.id)}</text><text x="${x + 78}" y="${y + 29}" class="cardTitle">${esc(titleText)}</text><rect x="${x + cardWidth - 220}" y="${y + 12}" width="196" height="24" rx="12" fill="#173E4C" stroke="#2A9D8F"/><text x="${x + cardWidth - 122}" y="${y + 28}" text-anchor="middle" class="status">${esc(zh ? '设计合同 · 未运行' : 'DESIGN CONTRACT · UNRUN')}</text>${rowMarkup}${stop}</g>`;
  }).join('');
  const footer = zh
    ? '证据状态：unknown_until_authorized · 运行状态：not_authorized_not_run · 场景卡是设计清单，不是合作、许可、居民验证或现场绩效'
    : 'Evidence: unknown_until_authorized · Run: not_authorized_not_run · These are design registers, not partners, permits, resident validation or field performance';
  const cardsBottom = top + Math.ceil(data.cards.length / 2) * cardHeight + (Math.ceil(data.cards.length / 2) - 1) * gapY;
  const boardHeight = cardsBottom + 72;
  const footerY = boardHeight - 50;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="${boardHeight}" viewBox="0 0 1600 ${boardHeight}" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(subtitle)}</desc><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#071A2B"/><stop offset="1" stop-color="#123E4A"/></linearGradient><style>.sans{font-family:PingFang SC,Microsoft YaHei,Arial,sans-serif}.title{font-size:30px;font-weight:850;fill:#F5FBFF}.sub{font-size:15px;fill:#A9C7D4}.cardId{font:800 16px Arial,sans-serif;letter-spacing:1px}.cardTitle{font:800 18px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#F6FBFF}.label{font:800 10px Arial,PingFang SC,sans-serif;letter-spacing:.6px}.field{font:500 11px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#D8EAF0}.status{font:800 10px Arial,PingFang SC,sans-serif;fill:#9CF2DE;letter-spacing:.3px}.stopLabel{font:800 10px Arial,PingFang SC,sans-serif;letter-spacing:.5px}.stopText{font:500 11px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#F5C4CB}</style></defs><rect width="1600" height="${boardHeight}" fill="url(#bg)"/><circle cx="1500" cy="40" r="300" fill="#2A9D8F" opacity=".12"/><circle cx="70" cy="${boardHeight - 100}" r="260" fill="#5B8DEF" opacity=".12"/><text x="60" y="54" class="sans" fill="#66E3CA" font-size="17" font-weight="900" letter-spacing="3">COMMUTE CO-BENEFIT COMMONS / SCENARIO CONTRACTS</text><text x="60" y="94" class="sans title">${esc(title)}</text><text x="60" y="120" class="sans sub">${esc(subtitle)}</text>${cards}<rect x="60" y="${footerY}" width="1480" height="34" rx="10" fill="#0B2738" stroke="#2A9D8F"/><text x="80" y="${footerY + 22}" class="sans sub" font-size="12">${esc(footer)}</text></svg>`;
}

const zhBoard = board('zh');
const enBoard = board('en');
assertBoardCoverage(zhBoard, 'zh');
assertBoardCoverage(enBoard, 'en');
fs.writeFileSync(path.join(figureDir, 'scenario-cards-board.svg'), zhBoard);
fs.writeFileSync(path.join(figureDir, 'scenario-cards-board.en.svg'), enBoard);

function updateVisualIndex(file, lang) {
  const target = path.join(packageDir, 'visual', file);
  let html = fs.readFileSync(target, 'utf8');
  const zh = lang === 'zh';
  const nav = zh ? '<a href="#17">场景卡</a>' : '<a href="#17">Scenario cards</a>';
  if (!html.includes('href="#17"')) {
    const metricLink = zh ? '<a href="#9">核心指标</a>' : '<a href="#9">Core metrics</a>';
    html = html.replace(metricLink, `${nav}${metricLink}`);
  }
  const section = zh
    ? '<section id="17" class="evidence scenario-card-board"><div class="section-head"><span class="section-no">18</span><h2>十张场景卡：从需求到停止</h2><span class="tag">未授权</span></div><p>每张卡都把空间、对象、触发、输入、动作、读数、责任、回退和停止条件放在一起。它们是设计合同，不是合作、许可或现场结果。</p><img src="../assets/figures/scenario-cards-board.svg" alt="十张交通场景卡"><div class="micro">scenario-cards.json · design_register_not_operational · unknown_until_authorized · not_authorized_not_run</div></section>'
    : '<section id="17" class="evidence scenario-card-board"><div class="section-head"><span class="section-no">18</span><h2>Ten scenario cards: from request to stop</h2><span class="tag">UNAUTHORISED</span></div><p>Each card keeps place, people, trigger, inputs, action, readout, owner, fallback and stop condition together. These are design contracts, not partners, permits or field results.</p><img src="../assets/figures/scenario-cards-board.en.svg" alt="Ten mobility scenario cards"><div class="micro">scenario-cards.json · design_register_not_operational · unknown_until_authorized · not_authorized_not_run</div></section>';
  const style = '<style>.scenario-card-board{background:#eef7f5}.scenario-card-board img{background:#071A2B;border-color:#2A9D8F}.scenario-card-board .micro{color:#5E7D88}</style>';
  html = html.replace(/<section id="17" class="evidence scenario-card-board">.*?<\/section>/g, '');
  html = html.replaceAll(style, '');
  html = html.replace('<section id="14" class="evidence multimodal-board">', `${section}<section id="14" class="evidence multimodal-board">`);
  html = html.replace('</head>', `${style}</head>`);
  fs.writeFileSync(target, html);
}

updateVisualIndex('index.html', 'zh');
updateVisualIndex('index.en.html', 'en');

console.log(JSON.stringify({
  ok: true,
  card_count: data.cards.length,
  generated: ['assets/figures/scenario-cards-board.svg', 'assets/figures/scenario-cards-board.en.svg'],
  visual_index: ['visual/index.html', 'visual/index.en.html'],
  status: data.status,
  evidence_status: data.evidence_status,
  run_status: data.run_status,
}, null, 2));
