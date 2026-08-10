#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const assetDir = __dirname;
const packageDir = path.resolve(assetDir, '..', '..');
const contractPath = path.join(assetDir, 'public-decision-ledger.json');
const sourcePath = path.join(packageDir, 'sources.json');
const figureDir = path.join(packageDir, 'assets', 'figures');
const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
const sourceIds = new Set(JSON.parse(fs.readFileSync(sourcePath, 'utf8')).sources.map((source) => source.id));

const required = [
  'id', 'audience', 'audience_label_zh', 'audience_label_en', 'question_short_zh', 'question_short_en',
  'public_question_zh', 'public_question_en', 'synthetic_readout_zh', 'synthetic_readout_en',
  'field_evidence_required_zh', 'field_evidence_required_en', 'owner_role_zh', 'owner_role_en',
  'decision_if_ready_zh', 'decision_if_ready_en', 'stop_if_zh', 'stop_if_en', 'fallback_zh', 'fallback_en',
  'privacy_boundary_zh', 'privacy_boundary_en', 'channels', 'current_state', 'field_status',
  'consent_status', 'response_receipt', 'appeal_route', 'sources'
];
const audiences = new Set(['resident_daily', 'accessibility_care', 'enterprise_arrival', 'curb_maintenance', 'transfer_passenger', 'external_commute', 'night_work', 'freight_emergency']);
const blocked = [...contract.source_boundary.blocked_claims_zh, ...contract.source_boundary.blocked_claims_en];
const rowSerialised = JSON.stringify(contract.rows);

if (contract.schema_version !== '0.1.0') throw new Error('unexpected schema_version');
if (contract.source_boundary.field_status !== 'not_authorized_not_run') throw new Error('field status must remain not_authorized_not_run');
if (contract.source_boundary.synthetic_status !== 'screen_only') throw new Error('synthetic status must remain screen_only');
if (contract.rows.length !== 8) throw new Error('expected eight public decision rows');
if (contract.decision_states.map((state) => state.id).join('|') !== 'design_only|open_for_authorized_input|continue|pause|withdrawn') throw new Error('decision states changed');
if (blocked.some((phrase) => rowSerialised.includes(phrase))) throw new Error('blocked phrase leaked into decision rows');

for (const row of contract.rows) {
  for (const key of required) {
    if (row[key] === undefined || row[key] === null || row[key] === '' || (Array.isArray(row[key]) && row[key].length === 0)) {
      throw new Error(`${row.id} missing ${key}`);
    }
  }
  if (!audiences.has(row.audience)) throw new Error(`${row.id} unknown audience`);
  if (row.current_state !== 'design_only') throw new Error(`${row.id} cannot advance beyond design_only`);
  if (row.field_status !== 'not_authorized_not_run' || row.consent_status !== 'not_authorized_not_run') throw new Error(`${row.id} field or consent status changed`);
  if (row.response_receipt !== 'required_before_continue') throw new Error(`${row.id} response receipt gate missing`);
  if (!row.channels.includes('human_desk') || !row.channels.includes('phone') || !row.channels.includes('paper')) throw new Error(`${row.id} needs non-digital channels`);
  for (const sourceId of row.sources) if (!sourceIds.has(sourceId)) throw new Error(`${row.id} references missing source ${sourceId}`);
}
if (new Set(contract.rows.map((row) => row.audience)).size !== 8) throw new Error('audience coverage is incomplete');

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function wrap(value, max) {
  const text = String(value);
  const chars = [...text];
  const lines = [];
  for (let i = 0; i < chars.length; i += max) lines.push(chars.slice(i, i + max).join(''));
  return lines.length ? lines : [''];
}

function textLines(value, x, y, cls, max, gap) {
  return wrap(value, max).map((line, index) => `<text x="${x}" y="${y + index * gap}" class="${cls}">${esc(line)}</text>`).join('');
}

function board(lang) {
  const zh = lang === 'zh';
  const suffix = zh ? 'zh' : 'en';
  const title = zh ? contract.title_zh : contract.title_en;
  const subtitle = zh ? contract.purpose_zh : contract.purpose_en;
  const event = zh ? '公开问题' : 'PUBLIC QUESTION';
  const screen = zh ? '合成筛查' : 'SYNTHETIC SCREEN';
  const input = zh ? '授权输入' : 'AUTHORISED INPUT';
  const receipt = zh ? '回复凭证' : 'RESPONSE RECEIPT';
  const state = zh ? '当前状态 仅设计' : 'CURRENT STATE DESIGN ONLY';
  const footer = zh
    ? '只证明决策链可回读。现场状态、居民意见、公众支持、运营许可和交通绩效仍为未知。'
    : 'Only the decision chain is reviewable. Field status, resident input, public support, operating permission and transport performance remain unknown.';
  const cards = contract.rows.map((row, index) => {
    const x = 60 + (index % 2) * 760;
    const y = 330 + Math.floor(index / 2) * 218;
    const label = zh ? row.audience_label_zh : row.audience_label_en;
    const question = zh ? row.question_short_zh : row.question_short_en;
    const screenText = zh ? row.synthetic_readout_zh : row.synthetic_readout_en;
    const field = zh ? row.field_evidence_required_zh : row.field_evidence_required_en;
    const stop = zh ? row.stop_if_zh : row.stop_if_en;
    const fallback = zh ? row.fallback_zh : row.fallback_en;
    const max = zh ? 39 : 67;
    return `<g transform="translate(${x} ${y})">
      <rect width="700" height="184" rx="22" fill="#0B2738" stroke="#24556B" stroke-width="2"/>
      <rect width="10" height="184" rx="5" fill="${index % 2 === 0 ? '#27C499' : '#F0A45D'}"/>
      <text x="28" y="31" class="eyebrow">${esc(row.id)} · ${esc(label)}</text>
      <text x="28" y="57" class="card-title">${esc(question)}</text>
      <text x="28" y="84" class="mini-label">${esc(screen)}</text>
      ${textLines(screenText, 118, 84, 'body', max - 5, 18)}
      <text x="28" y="120" class="mini-label">${esc(input)}</text>
      ${textLines(field, 118, 120, 'body', max - 5, 18)}
      <text x="28" y="156" class="mini-label warm">${esc(zh ? '暂停' : 'PAUSE')}</text>
      ${textLines(`${stop} · ${fallback}`, 118, 156, 'body', max - 5, 18)}
    </g>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1240" viewBox="0 0 1600 1240" role="img" aria-labelledby="title desc">
  <title id="title">${esc(title)}</title>
  <desc id="desc">${esc(subtitle)}</desc>
  <defs><linearGradient id="bg-${suffix}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#071A2B"/><stop offset="1" stop-color="#103C50"/></linearGradient><style>.sans{font-family:PingFang SC,Microsoft YaHei,Arial,sans-serif}.eyebrow{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px;font-weight:900;letter-spacing:1.1px;fill:#66E3CA}.title{font-size:31px;font-weight:900;fill:#F5FBFF}.sub{font-size:16px;fill:#B9D0D9}.step{font-size:15px;font-weight:900;fill:#E8F8FA}.step-sub{font-size:12px;fill:#9FC0CF}.card-title{font-size:16px;font-weight:900;fill:#F5FBFF}.mini-label{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;font-weight:900;letter-spacing:.5px;fill:#66E3CA}.mini-label.warm{fill:#F0A45D}.body{font-size:13px;fill:#DCEEF5}.footer{font-size:14px;fill:#A9C7D4}</style></defs>
  <rect width="1600" height="1240" fill="url(#bg-${suffix})"/><circle cx="1510" cy="80" r="270" fill="#1C7771" opacity=".16"/><circle cx="55" cy="1210" r="250" fill="#4D3A83" opacity=".14"/>
  <text x="60" y="52" class="sans eyebrow">MOBILITY COMMONS / PUBLIC DECISION LEDGER</text>
  <text x="60" y="99" class="sans title">${esc(title)}</text><text x="60" y="130" class="sans sub">${esc(subtitle)}</text>
  <g transform="translate(60 178)"><rect width="1480" height="104" rx="24" fill="#071A2B" stroke="#2A9D8F" stroke-width="2"/>
    <g transform="translate(35 22)"><circle cx="16" cy="26" r="16" fill="#27C499"/><text x="45" y="21" class="sans step">${esc(event)}</text><text x="45" y="43" class="sans step-sub">${esc(zh ? '先登记问题和边界' : 'record the question and boundary first')}</text></g>
    <path d="M400 48H500" stroke="#66E3CA" stroke-width="3"/><path d="M495 42l10 6-10 6" fill="none" stroke="#66E3CA" stroke-width="3"/>
    <g transform="translate(535 22)"><circle cx="16" cy="26" r="16" fill="#5EA7FF"/><text x="45" y="21" class="sans step">${esc(screen)}</text><text x="45" y="43" class="sans step-sub">${esc(zh ? '合成读数只标出待查冲突' : 'mark conflicts for later checking')}</text></g>
    <path d="M900 48H1000" stroke="#66E3CA" stroke-width="3"/><path d="M995 42l10 6-10 6" fill="none" stroke="#66E3CA" stroke-width="3"/>
    <g transform="translate(1035 22)"><circle cx="16" cy="26" r="16" fill="#F0A45D"/><text x="45" y="21" class="sans step">${esc(input)}</text><text x="45" y="43" class="sans step-sub">${esc(zh ? '有权组织才可开启窗口' : 'an authorised owner opens the window')}</text></g>
    <path d="M1360 48H1430" stroke="#66E3CA" stroke-width="3"/><path d="M1425 42l10 6-10 6" fill="none" stroke="#66E3CA" stroke-width="3"/>
    <text x="1340" y="91" class="sans step-sub">${esc(receipt)}</text>
  </g>
  <text x="60" y="316" class="sans eyebrow">${esc(zh ? '八个问题入口 · 统一字段 · 同一条暂停回退链' : 'EIGHT QUESTION ENTRANCES · ONE FIELD SET · ONE PAUSE AND FALLBACK CHAIN')}</text>
  ${cards}
  <rect x="60" y="1160" width="1480" height="52" rx="16" fill="#071A2B" stroke="#24556B"/><text x="88" y="1192" class="sans footer">${esc(footer)}</text><text x="1510" y="1192" text-anchor="end" class="sans footer">${esc(state)}</text>
</svg>`;
}

for (const [lang, file] of [['zh', 'public-decision-ledger.svg'], ['en', 'public-decision-ledger.en.svg']]) {
  fs.writeFileSync(path.join(figureDir, file), board(lang));
}

console.log(JSON.stringify({
  ok: true,
  contract_id: contract.contract_id,
  row_count: contract.rows.length,
  audiences: contract.rows.map((row) => row.audience),
  field_status: contract.source_boundary.field_status,
  generated: ['assets/figures/public-decision-ledger.svg', 'assets/figures/public-decision-ledger.en.svg']
}, null, 2));
