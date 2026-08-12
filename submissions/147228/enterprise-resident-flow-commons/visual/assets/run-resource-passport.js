'use strict';

/*
 * Deterministic AI-service resource passport.
 *
 * This runner audits coverage and stop rules only. It deliberately does not
 * estimate energy, cost, staffing, emissions, procurement or local impact.
 */

const fs = require('fs');
const path = require('path');

const root = __dirname;
const modelPath = path.join(root, 'resource-passport.json');
const outputPath = path.join(root, 'resource-passport-readout.json');
const model = JSON.parse(fs.readFileSync(modelPath, 'utf8'));

function fail(message) {
  console.error(`RESOURCE_PASSPORT_CHECK_FAIL: ${message}`);
  process.exitCode = 1;
}

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrap(value, width) {
  const chars = Array.from(String(value));
  const lines = [];
  for (let index = 0; index < chars.length; index += width) lines.push(chars.slice(index, index + width).join(''));
  return lines.length ? lines : [''];
}

function lines(x, y, values, className, lineHeight, fill) {
  return values.map((value, index) => (
    `<text x="${x}" y="${y + index * lineHeight}" class="${className}"${fill ? ` fill="${fill}"` : ''}>${esc(value)}</text>`
  )).join('');
}

function makeBoard(language) {
  const zh = language === 'zh';
  const title = zh ? 'AI 交通服务资源护照：先问负担，再开闸' : 'AI MOBILITY RESOURCE PASSPORT: ACCOUNT FOR BURDEN BEFORE SCALE';
  const subtitle = zh
    ? '10 张场景卡 × 7 类资源 · 现实测量、授权与运行结果均为 UNKNOWN'
    : '10 scenario cards × 7 resource classes · real measurements, approvals and operations remain UNKNOWN';
  const answer = zh ? '它回答什么？' : 'WHAT IT ANSWERS';
  const answerText = zh ? '把算力、设备、人工和退出责任放到交通模型旁边，避免合成分数遮住现实负担。' : 'It places compute, devices, human work and exit responsibility beside the mobility model so synthetic scores cannot hide operational burden.';
  const notAnswer = zh ? '它不回答什么？' : 'WHAT IT DOES NOT ANSWER';
  const notAnswerText = zh ? '不是能耗、碳排、采购数量、现场绩效、许可或公众接受度。所有现实字段先保持 unknown。' : 'Not energy, emissions, procurement quantities, field performance, permissions or public acceptance. Real fields remain unknown.';
  const resourceIds = Object.keys(model.resources);
  const cards = model.scenario_cards;
  const resourceCards = resourceIds.map((id, index) => {
    const resource = model.resources[id];
    const col = index % 4;
    const row = Math.floor(index / 4);
    const x = 80 + col * 575;
    const y = 405 + row * 285;
    const label = zh ? resource.label_zh : resource.label_en;
    const control = zh ? resource.control_zh : resource.control_en;
    const evidence = zh ? resource.evidence_required_zh : resource.evidence_required_en;
    return `<g><rect x="${x}" y="${y}" width="525" height="245" rx="24" fill="#f7fbfc" stroke="#b9d5d8" stroke-width="2"/><circle cx="${x + 36}" cy="${y + 38}" r="18" fill="#f0b45c"/><text x="${x + 36}" y="${y + 45}" text-anchor="middle" class="sans" font-size="18" font-weight="900" fill="#102d43">${index + 1}</text><text x="${x + 70}" y="${y + 46}" class="sans label" fill="#102d43">${esc(label)}</text><rect x="${x + 70}" y="${y + 65}" width="118" height="30" rx="15" fill="#fff0d8"/><text x="${x + 129}" y="${y + 86}" text-anchor="middle" class="sans status" fill="#985f00">UNKNOWN</text>${lines(x + 28, y + 132, wrap(control, zh ? 27 : 39), 'sans body', 25, '#29465a')}${lines(x + 28, y + 205, wrap((zh ? '需补：' : 'NEED: ') + evidence, zh ? 30 : 42), 'sans tiny', 20, '#6b8190')}</g>`;
  }).join('');
  const flowLabels = zh
    ? ['分组需求', 'AI 选择', '人工/公交回退', '复核与撤回']
    : ['grouped demand', 'AI choice', 'human/transit fallback', 'review and withdrawal'];
  const flow = flowLabels.map((label, index) => {
    const x = 150 + index * 570;
    const arrow = index < flowLabels.length - 1 ? `<path d="M${x + 300} 1280 H${x + 470} l-22 -14 M${x + 470} 1280 l-22 14" fill="none" stroke="#62ddc4" stroke-width="4"/>` : '';
    return `<g><rect x="${x}" y="1230" width="300" height="96" rx="48" fill="#14384d" stroke="#3c7b85" stroke-width="2"/><text x="${x + 150}" y="1288" text-anchor="middle" class="sans flow" fill="#f4fbfb">${esc(label)}</text>${arrow}</g>`;
  }).join('');
  const gateText = zh ? '五道 NO-GO 门：无等价人工服务 · 需要个人轨迹 · 无维护退出 · 破坏消防/无障碍/安静界面 · 未登记失败与恢复' : 'FIVE NO-GO GATES: no equivalent human service · personal traces required · no maintenance exit · fire/access/quiet harm · failure and restoration unregistered';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="1500" viewBox="0 0 2400 1500" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(subtitle)}. ${esc(notAnswerText)}</desc><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#071a2c"/><stop offset="1" stop-color="#17485a"/></linearGradient><filter id="shadow" x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#00111f" flood-opacity=".22"/></filter><style>.sans{font-family:"PingFang SC","Noto Sans CJK SC","Helvetica Neue",Arial,sans-serif}.label{font-size:27px;font-weight:850}.body{font-size:19px;font-weight:650}.tiny{font-size:15px;font-weight:600}.status{font-size:15px;font-weight:900}.flow{font-size:24px;font-weight:850}.title{font-size:54px;font-weight:900;letter-spacing:-2px}.muted{font-size:23px;font-weight:600}</style></defs><rect width="2400" height="1500" fill="url(#bg)"/><text x="80" y="75" class="sans" font-size="23" font-weight="900" letter-spacing="4" fill="#70e1c3">MOBILITY COMMONS / RESOURCE PASSPORT / v1.0</text><text x="80" y="150" class="sans title" fill="#f4fbfb">${esc(title)}</text><text x="80" y="198" class="sans muted" fill="#a8c2c7">${esc(subtitle)}</text><rect x="1965" y="58" width="350" height="62" rx="31" fill="#3e2d2d" stroke="#ff9b8e" stroke-width="2"/><text x="2140" y="97" text-anchor="middle" class="sans" font-size="18" font-weight="900" fill="#ffb1a5">DESIGN LEDGER / NOT OPERATING</text><g filter="url(#shadow)"><rect x="80" y="250" width="515" height="105" rx="20" fill="#143c4c"/><rect x="620" y="250" width="515" height="105" rx="20" fill="#143c4c"/><rect x="1160" y="250" width="515" height="105" rx="20" fill="#143c4c"/><rect x="1700" y="250" width="615" height="105" rx="20" fill="#143c4c"/></g><text x="110" y="290" class="sans" font-size="18" fill="#a8c2c7">SCENARIO CARDS</text><text x="110" y="335" class="sans" font-size="39" font-weight="900" fill="#70e1c3">${cards.length}</text><text x="650" y="290" class="sans" font-size="18" fill="#a8c2c7">RESOURCE CLASSES</text><text x="650" y="335" class="sans" font-size="39" font-weight="900" fill="#70e1c3">${resourceIds.length}</text><text x="1190" y="290" class="sans" font-size="18" fill="#a8c2c7">LOCAL MEASUREMENTS</text><text x="1190" y="335" class="sans" font-size="39" font-weight="900" fill="#ffd37a">0 / UNKNOWN</text><text x="1730" y="290" class="sans" font-size="18" fill="#a8c2c7">OPERATIONS AUTHORIZED</text><text x="1730" y="335" class="sans" font-size="39" font-weight="900" fill="#ff9b8e">NO · AIR BLOCKED</text><rect x="80" y="380" width="2235" height="810" rx="30" fill="#eaf4f5" filter="url(#shadow)"/><text x="120" y="430" class="sans" font-size="30" font-weight="900" fill="#102d43">${zh ? '七类资源：每张场景卡都必须逐项过账' : 'Seven resources: every scenario card must carry the full ledger'}</text>${resourceCards}<rect x="80" y="1208" width="2235" height="265" rx="30" fill="#102d43"/><text x="120" y="1250" class="sans" font-size="19" font-weight="900" fill="#70e1c3">${esc(answer)}</text><text x="120" y="1285" class="sans" font-size="17" fill="#d5e6e8">${esc(answerText)}</text><text x="120" y="1328" class="sans" font-size="19" font-weight="900" fill="#ffb1a5">${esc(notAnswer)}</text><text x="120" y="1363" class="sans" font-size="17" fill="#f4d8d4">${esc(notAnswerText)}</text>${flow}<text x="120" y="1460" class="sans" font-size="15" font-weight="750" fill="#a8c2c7">${esc(gateText)}</text></svg>`;
}

const resourceIds = Object.keys(model.resources);
const cards = model.scenario_cards;
const checks = {
  seven_resource_classes: resourceIds.length === 7,
  all_resources_have_unknown_local_status: resourceIds.every((id) => model.resources[id].status === 'unknown'),
  every_card_carries_full_resource_set: cards.every((card) => resourceIds.every((id) => Object.prototype.hasOwnProperty.call(model.resources, id))),
  ten_scenario_cards: cards.length === 10,
  all_cards_have_fallback: cards.every((card) => card.fallback_zh && card.fallback_en),
  all_cards_have_resource_focus: cards.every((card) => card.resource_focus_zh && card.resource_focus_en),
  no_live_operation_claim: model.authorization.operations_authorized === false && model.authorization.approved_scenarios === 0,
  no_personal_trace_requirement: model.authorization.personal_traces_required === false,
  air_candidate_fail_closed: model.authorization.air_candidate === 'blocked',
  five_no_go_gates: model.no_go_gates.length === 5
};
Object.entries(checks).forEach(([name, passed]) => { if (!passed) fail(name); });

const output = {
  version: model.version,
  passport_id: model.passport_id,
  generated_by: 'node visual/assets/run-resource-passport.js',
  status: model.status,
  scope: model.scope,
  authorization: model.authorization,
  summary: {
    scenario_card_count: cards.length,
    resource_class_count: resourceIds.length,
    local_measurement_count: model.authorization.local_measurements,
    approved_scenario_count: model.authorization.approved_scenarios,
    no_go_gate_count: model.no_go_gates.length,
    all_resource_statuses: [...new Set(resourceIds.map((id) => model.resources[id].status))]
  },
  resource_classes: resourceIds.map((id) => ({id, ...model.resources[id]})),
  scenario_cards: cards.map((card) => ({id: card.id, name_zh: card.name_zh, name_en: card.name_en, resource_focus_zh: card.resource_focus_zh, resource_focus_en: card.resource_focus_en, fallback_zh: card.fallback_zh, fallback_en: card.fallback_en, resource_class_count: resourceIds.length})),
  no_go_gates: model.no_go_gates,
  checks,
  interpretation: model.interpretation
};

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
const figureDir = path.join(root, '..', '..', 'assets', 'figures');
fs.writeFileSync(path.join(figureDir, 'resource-passport-board.svg'), `${makeBoard('zh')}\n`, 'utf8');
fs.writeFileSync(path.join(figureDir, 'resource-passport-board.en.svg'), `${makeBoard('en')}\n`, 'utf8');
console.log(JSON.stringify(output, null, 2));
if (Object.values(checks).every(Boolean)) console.error('RESOURCE_PASSPORT_CHECK_PASS: coverage, gates and fail-closed boundaries passed');
