'use strict';

/*
 * Deterministic closeout-receipt schema check.
 * It validates empty receipt templates and never claims a field work order,
 * operator SLA, repair result or resident complaint outcome.
 */

const fs = require('fs');
const path = require('path');

const root = __dirname;
const model = JSON.parse(fs.readFileSync(path.join(root, 'asset-closeout-receipts.json'), 'utf8'));
const outputPath = path.join(root, 'asset-closeout-readout.json');

function fail(message) {
  console.error(`ASSET_CLOSEOUT_CHECK_FAIL: ${message}`);
  process.exitCode = 1;
}

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function wrap(value, width) {
  const chars = Array.from(String(value));
  const rows = [];
  for (let i = 0; i < chars.length; i += width) rows.push(chars.slice(i, i + width).join(''));
  return rows.length ? rows : [''];
}

function textLines(x, y, values, className, gap, fill) {
  return values.map((value, index) => `<text x="${x}" y="${y + index * gap}" class="${className}" fill="${fill}">${esc(value)}</text>`).join('');
}

function board(language) {
  const zh = language === 'zh';
  const title = zh ? '交通资产闭合回执：让投诉真正有去处' : 'MOBILITY ASSET CLOSEOUT RECEIPTS: MAKE CLOSURE TRACEABLE';
  const subtitle = zh ? '8 类交通资产 × 5 道闭合门 · 这是空回执模板，不是现场工单' : '8 mobility assets × 5 closeout gates · empty receipt templates, not field work orders';
  const answer = zh ? '闭合链 / CLOSEOUT CHAIN' : 'CLOSEOUT CHAIN';
  const chain = zh ? ['发现', '派单', '维修/清场', '无障碍复核', '关闭或撤回'] : ['detect', 'assign', 'repair/clear', 'access review', 'close or withdraw'];
  const rows = model.receipts.map((receipt, index) => {
    const y = 440 + index * 76;
    const label = zh ? receipt.label_zh : receipt.label_en;
    const window = zh ? receipt.service_window_zh : receipt.service_window_en;
    const fallback = zh ? receipt.accessible_fallback_zh : receipt.accessible_fallback_en;
    return `<g><line x1="95" y1="${y + 38}" x2="2305" y2="${y + 38}" stroke="#d6e6e7" stroke-width="1"/><text x="105" y="${y + 25}" class="sans id" fill="#0d6f70">${esc(receipt.receipt_id)}</text><text x="220" y="${y + 25}" class="sans row" fill="#102d43">${esc(label)}</text><text x="720" y="${y + 25}" class="sans small" fill="#55717d">${esc(window)}</text><text x="1170" y="${y + 25}" class="sans small" fill="#55717d">${esc(receipt.proposed_owner_role)}</text><rect x="1685" y="${y + 3}" width="126" height="30" rx="15" fill="#fff0d8"/><text x="1748" y="${y + 24}" text-anchor="middle" class="sans status" fill="#985f00">UNKNOWN</text><text x="1860" y="${y + 25}" class="sans small" fill="#55717d">${esc(fallback)}</text></g>`;
  }).join('');
  const chainNodes = chain.map((label, index) => {
    const x = 120 + index * 485;
    const arrow = index < chain.length - 1 ? `<path d="M${x + 275} 1370 H${x + 410} l-18 -12 M${x + 410} 1370 l-18 12" fill="none" stroke="#62ddc4" stroke-width="4"/>` : '';
    return `<g><rect x="${x}" y="1325" width="275" height="88" rx="44" fill="#14384d" stroke="#3c7b85" stroke-width="2"/><text x="${x + 137.5}" y="1380" text-anchor="middle" class="sans chain" fill="#f4fbfb">${esc(label)}</text>${arrow}</g>`;
  }).join('');
  const gates = zh ? '五道门：责任与窗口 · 日期证据 · 无障碍/人工回退 · 公共路线与消防恢复 · 复核后关闭' : 'FIVE GATES: owner/window · dated evidence · accessible/human fallback · public-route/fire restoration · reviewer confirmation';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="1500" viewBox="0 0 2400 1500" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(subtitle)}. ${esc(gates)}</desc><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#071a2c"/><stop offset="1" stop-color="#17485a"/></linearGradient><filter id="shadow" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#00111f" flood-opacity=".22"/></filter><style>.sans{font-family:"PingFang SC","Noto Sans CJK SC","Helvetica Neue",Arial,sans-serif}.title{font-size:54px;font-weight:900;letter-spacing:-2px}.muted{font-size:22px;font-weight:600}.row{font-size:22px;font-weight:850}.small{font-size:17px;font-weight:600}.id{font-size:20px;font-weight:900}.status{font-size:15px;font-weight:900}.chain{font-size:22px;font-weight:850}</style></defs><rect width="2400" height="1500" fill="url(#bg)"/><text x="80" y="75" class="sans" font-size="23" font-weight="900" letter-spacing="4" fill="#70e1c3">MOBILITY COMMONS / CLOSEOUT RECEIPTS / v1.0</text><text x="80" y="150" class="sans title" fill="#f4fbfb">${esc(title)}</text><text x="80" y="198" class="sans muted" fill="#a8c2c7">${esc(subtitle)}</text><rect x="1980" y="58" width="335" height="62" rx="31" fill="#3e2d2d" stroke="#ff9b8e" stroke-width="2"/><text x="2147" y="97" text-anchor="middle" class="sans" font-size="18" font-weight="900" fill="#ffb1a5">SYNTHETIC / NOT FIELD LOG</text><g filter="url(#shadow)"><rect x="80" y="250" width="515" height="105" rx="20" fill="#143c4c"/><rect x="620" y="250" width="515" height="105" rx="20" fill="#143c4c"/><rect x="1160" y="250" width="515" height="105" rx="20" fill="#143c4c"/><rect x="1700" y="250" width="615" height="105" rx="20" fill="#143c4c"/></g><text x="110" y="290" class="sans" font-size="18" fill="#a8c2c7">RECEIPT TEMPLATES</text><text x="110" y="335" class="sans" font-size="39" font-weight="900" fill="#70e1c3">${model.receipts.length}</text><text x="650" y="290" class="sans" font-size="18" fill="#a8c2c7">FIELD RECEIPTS</text><text x="650" y="335" class="sans" font-size="39" font-weight="900" fill="#ffd37a">0</text><text x="1190" y="290" class="sans" font-size="18" fill="#a8c2c7">CLOSED RECEIPTS</text><text x="1190" y="335" class="sans" font-size="39" font-weight="900" fill="#ff9b8e">0</text><text x="1730" y="290" class="sans" font-size="18" fill="#a8c2c7">AIR EXPERIMENT</text><text x="1730" y="335" class="sans" font-size="39" font-weight="900" fill="#ff9b8e">BLOCKED</text><rect x="80" y="380" width="2235" height="710" rx="30" fill="#eaf4f5" filter="url(#shadow)"/><text x="105" y="425" class="sans" font-size="28" font-weight="900" fill="#102d43">${zh ? '每条回执都必须回答：谁负责、何时服务、如何恢复' : 'Every receipt must answer: who owns it, when it serves, and how it is restored'}</text><text x="105" y="465" class="sans small" fill="#6b8190">${zh ? '资产 / 服务窗口' : 'ASSET / SERVICE WINDOW'}</text><text x="720" y="465" class="sans small" fill="#6b8190">${zh ? '时间' : 'WINDOW'}</text><text x="1170" y="465" class="sans small" fill="#6b8190">${zh ? '责任角色' : 'PROPOSED OWNER ROLE'}</text><text x="1685" y="465" class="sans small" fill="#6b8190">STATE</text><text x="1860" y="465" class="sans small" fill="#6b8190">${zh ? '无障碍/人工回退' : 'ACCESSIBLE / HUMAN FALLBACK'}</text>${rows}<rect x="80" y="1118" width="2235" height="350" rx="30" fill="#102d43"/><text x="120" y="1160" class="sans" font-size="20" font-weight="900" fill="#70e1c3">${esc(answer)}</text>${textLines(120, 1200, wrap(zh ? 'M-10 投诉—维修—复核不再只是叙述：回执必须以日期证据、人工回退和公共路线恢复为闭合条件。' : 'M-10 complaint-to-maintenance closure becomes inspectable: a receipt closes only with dated evidence, human fallback and public-route restoration.', zh ? 46 : 74), 'sans small', 26, '#d5e6e8')}${chainNodes}<text x="120" y="1460" class="sans" font-size="15" font-weight="750" fill="#a8c2c7">${esc(gates)}</text></svg>`;
}

const requiredFields = new Set(model.receipt_schema);
const checks = {
  eight_receipt_templates: model.receipts.length === 8,
  schema_has_closeout_fields: ['proposed_owner_role', 'dated_evidence', 'accessible_fallback', 'verification_result', 'public_route_restoration', 'closeout_state'].every((field) => requiredFields.has(field)),
  unique_receipt_ids: new Set(model.receipts.map((receipt) => receipt.receipt_id)).size === model.receipts.length,
  all_receipts_have_owner_role: model.receipts.every((receipt) => receipt.proposed_owner_role),
  all_receipts_have_accessible_fallback: model.receipts.every((receipt) => receipt.accessible_fallback_zh && receipt.accessible_fallback_en),
  field_receipts_remain_zero: model.authorization.field_receipts === 0 && model.authorization.closed_receipts === 0,
  no_live_operation_claim: model.authorization.operations_authorized === false,
  no_personal_data_requirement: model.authorization.personal_data_required === false,
  air_candidate_fail_closed: model.authorization.air_candidate === 'blocked',
  five_closeout_gates: model.closeout_gates.length === 5
};
Object.entries(checks).forEach(([name, passed]) => { if (!passed) fail(name); });

const output = {
  version: model.version,
  ledger_id: model.ledger_id,
  generated_by: 'node visual/assets/run-asset-closeout-receipts.js',
  status: model.status,
  scope: model.scope,
  authorization: model.authorization,
  receipt_schema: model.receipt_schema,
  summary: {receipt_template_count: model.receipts.length, field_receipt_count: model.authorization.field_receipts, closed_receipt_count: model.authorization.closed_receipts, closeout_gate_count: model.closeout_gates.length},
  receipts: model.receipts.map((receipt) => ({...receipt, dated_evidence: null, verification_result: null, public_route_restoration: null, closeout_state: 'not_run'})),
  closeout_gates: model.closeout_gates,
  checks,
  interpretation: model.interpretation
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
const figureDir = path.join(root, '..', '..', 'assets', 'figures');
fs.writeFileSync(path.join(figureDir, 'asset-closeout-board.svg'), `${board('zh')}\n`, 'utf8');
fs.writeFileSync(path.join(figureDir, 'asset-closeout-board.en.svg'), `${board('en')}\n`, 'utf8');
console.log(JSON.stringify(output, null, 2));
if (Object.values(checks).every(Boolean)) console.error('ASSET_CLOSEOUT_CHECK_PASS: receipt schema and fail-closed gates passed');
