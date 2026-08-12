'use strict';

/*
 * Make the gap between a synthetic policy screen and a real pilot visible.
 * This is a decision register, not an approval generator. It only consumes
 * the checked-in co-benefit contract and publishes aggregate evidence needs.
 */

const fs = require('fs');
const path = require('path');

const root = __dirname;
const packageRoot = path.resolve(root, '..', '..');
const contractPath = path.join(root, 'commute-co-benefit-contract.json');
const outputPath = path.join(root, 'commute-co-benefit-authorization.json');
const figureRoot = path.join(packageRoot, 'assets', 'figures');

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function text(x, y, value, className, anchor = 'start') {
  return `<text x="${x}" y="${y}" class="${className}" text-anchor="${anchor}">${esc(value)}</text>`;
}

function buildAuthorization() {
  const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
  const evidence = contract.evidence_needed_before_operation;
  const stages = [
    {
      id: 'P0',
      label_zh: '登记与基线',
      label_en: 'register + baseline',
      status: 'current_hold',
      action_zh: '当前停在这里：补日期化分组证据',
      action_en: 'current hold: collect dated grouped evidence',
      entry_evidence: evidence,
      output_zh: '分组 OD、方式、容量、责任人与隐私规则',
      output_en: 'grouped OD, modes, capacity, owners and privacy rules',
      stop_zh: '缺一项就不预约，不扩容，保留公共与人工入口',
      stop_en: 'missing evidence means no booking or expansion; keep public and human access',
      roles_zh: ['交通与属地管理', '企业交通专员', '社区与无障碍顾问', '数据保护与独立复核'],
      roles_en: ['transport and local authority', 'employer mobility lead', 'community and accessibility adviser', 'data protection and independent review']
    },
    {
      id: 'P1',
      label_zh: '可逆小试',
      label_en: 'reversible pilot',
      status: 'blocked_until_P0',
      action_zh: '只试一条最小活动链，现场人员可以随时接管',
      action_en: 'test one minimum activity chain; people can take over at any time',
      entry_evidence: ['P0 evidence is dated and signed', 'one accountable operator and one independent stop reviewer', 'public route, phone and paper fallback rehearsed', 'accessibility, night return and complaint fields have a baseline'],
      output_zh: '按企业、居民、照护、夜班和服务组回读等待、可达、冲突与投诉',
      output_en: 'read wait, access, conflict and complaints by employer, resident, care, night and service groups',
      stop_zh: '任何保护组变差，立即切回地铁、公交、人工、电话和纸面入口',
      stop_en: 'any protected-group decline returns immediately to metro, bus, human, phone and paper access',
      roles_zh: ['现场运营者', '公共交通与路缘责任人', '社区代表', '独立停机复核人'],
      roles_en: ['field operator', 'transit and curb owner', 'community representative', 'independent stop reviewer']
    },
    {
      id: 'P2',
      label_zh: '条件扩展',
      label_en: 'conditional expansion',
      status: 'blocked_until_P1',
      action_zh: '只有证据闭合后，才讨论扩大时段、方式和服务范围',
      action_en: 'expand time windows, modes and service scope only after evidence closes',
      entry_evidence: ['P1 readout covers every protected group', 'capacity and headway remain inside the approved envelope', 'complaints have owners, updates and closure evidence', 'privacy retention and deletion proof is complete', 'professional safety, accessibility and traffic review is complete'],
      output_zh: '可追溯的扩展或撤回决定，保留版本、阈值和复核日期',
      output_en: 'traceable expansion or withdrawal decision with version, thresholds and review date',
      stop_zh: '分组恶化、证据过期或责任缺位，就回到 P0 或停止',
      stop_en: 'group decline, expired evidence or missing ownership returns to P0 or stops',
      roles_zh: ['专业交通与安全复核', '运营与维护', '公共服务与社区', '数据保护与审计'],
      roles_en: ['professional transport and safety review', 'operations and maintenance', 'public service and community', 'data protection and audit']
    },
    {
      id: 'A1',
      label_zh: '空中候选',
      label_en: 'air candidate',
      status: 'blocked',
      action_zh: '不用于填补地面证据缺口，不进入当前政策排名',
      action_en: 'does not fill a ground-evidence gap and stays out of the current policy ranking',
      entry_evidence: ['separate aviation approval and safety case', 'weather, noise, emergency and ground-transfer evidence', 'public consultation and an equivalent ground fallback'],
      output_zh: '在独立审批前只保留接口假设，当前状态为阻断',
      output_en: 'keep only an interface hypothesis before independent approval; current state is blocked',
      stop_zh: '任一空中门失败，继续使用地面与人工回退',
      stop_en: 'any air gate failure keeps ground and human fallback in place',
      roles_zh: ['有权审批部门', '安全与无障碍复核', '地面接驳运营者', '公众与社区'],
      roles_en: ['authorised aviation authority', 'safety and accessibility review', 'ground-transfer operator', 'public and community']
    }
  ];
  return {
    schema_version: '0.1.0',
    register_id: 'COMMUTE-CO-BENEFIT-AUTHORIZATION-LADDER-1000',
    status: 'decision_register_not_operational',
    current_stage: 'P0',
    current_action: 'hold_and_collect_dated_grouped_evidence',
    selected_policy: contract.selected_policy,
    source_boundary: 'This register converts the checked-in synthetic contract into a staged evidence and stop rule. It grants no pilot, permit, partnership, resident consent or operating result.',
    stages,
    model_may_claim: [
      'the checked-in population-scale synthetic screen is deterministic and aggregate only',
      'the selected ground policy passes its declared hard gates under synthetic inputs',
      'the next evidence owners, fields and stop actions are explicit'
    ],
    model_must_not_claim: [
      'resident acceptance or employee adoption',
      'local OD, timetable capacity, service quality or traffic improvement',
      'permission, procurement, partnership, public consultation completion or air-service approval'
    ],
    checks: {
      stage_order_complete: stages.map((stage) => stage.id).join(',') === 'P0,P1,P2,A1',
      every_stage_has_evidence_action_stop_and_roles: stages.every((stage) => stage.entry_evidence.length > 0 && stage.action_zh && stage.stop_zh && stage.roles_zh.length > 0),
      current_stage_is_p0: true,
      current_action_is_hold: true,
      air_candidate_blocked: contract.hard_gates.air_candidate === 'blocked',
      source_is_non_operational: true,
      aggregate_only: contract.checks.aggregate_only === true
    }
  };
}

function createBoard(register, english = false) {
  const zh = !english;
  const title = zh ? '从合成屏查到现场授权：通勤共益的证据阶梯' : 'From synthetic screen to field authorisation: the evidence ladder';
  const subtitle = zh ? '当前停在 P0 · 先补证据，再谈小试；空中候选保持阻断' : 'Current hold at P0 · collect evidence before a pilot; the air candidate stays blocked';
  const stageColors = { P0: '#77e3c0', P1: '#79a9ff', P2: '#f6c76b', A1: '#ef829d' };
  const stages = register.stages;
  const boxWidth = 360;
  const gap = 18;
  const startX = 64;
  const stageBoxes = stages.map((stage, index) => {
    const x = startX + index * (boxWidth + gap);
    const color = stageColors[stage.id];
    const label = zh ? stage.label_zh : stage.label_en;
    const action = zh ? stage.action_zh : stage.action_en;
    const status = stage.status === 'current_hold' ? (zh ? '当前停留' : 'CURRENT HOLD') : stage.status === 'blocked' ? (zh ? '阻断' : 'BLOCKED') : (zh ? '待前一阶段' : 'WAITING');
    const arrow = index < stages.length - 1 ? `<path d="M ${x + boxWidth + 4} 272 H ${x + boxWidth + gap - 6}" stroke="#52758a" stroke-width="4" stroke-linecap="round"/><path d="M ${x + boxWidth + gap - 20} 260 L ${x + boxWidth + gap - 4} 272 L ${x + boxWidth + gap - 20} 284" fill="none" stroke="#52758a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>` : '';
    return `${arrow}<g><rect x="${x}" y="176" width="${boxWidth}" height="210" rx="22" fill="#0e2a3c" stroke="${color}" stroke-width="3"/><circle cx="${x + 36}" cy="216" r="20" fill="${color}"/><text x="${x + 36}" y="223" class="stage-id" text-anchor="middle">${stage.id}</text>${text(x + 70, 221, label, 'stage-title')}${text(x + 26, 260, status, 'status', 'start')}${text(x + 26, 305, action, action.length > 44 ? 'stage-copy-tight' : 'stage-copy')}${text(x + 26, 348, zh ? '进入证据' : 'entry evidence', 'small')}${text(x + 26, 372, zh ? `${stage.entry_evidence.length} 项` : `${stage.entry_evidence.length} items`, 'value')}</g>`;
  }).join('');
  const evidence = register.stages[0].entry_evidence.map((item, index) => `<g><circle cx="92" cy="520" r="8" fill="#77e3c0"/><text x="116" y="526" class="evidence-row">${esc(zh ? ['分组 OD 与企业错峰接受', '地铁公交班次、站点和路缘容量', '居民照护、无障碍和夜间回家验证', '投诉处理与人工回退演练', '隐私抑制、留存和删除证明'][index] : item)}</text></g>`).join('');
  const may = register.model_may_claim.map((item, index) => text(970, 520 + index * 28, `${index + 1}. ${zh ? ['全量合成屏查可复算', '地面政策包通过声明硬门', '下一步责任、字段和停止动作明确'][index] : item}`, 'foot')).join('');
  const must = register.model_must_not_claim.map((item, index) => text(970, 650 + index * 28, `${index + 1}. ${zh ? ['居民同意或员工采纳', '本地 OD、运力或运行改善', '许可、合作、公众参与或空中审批'][index] : item}`, 'warning')).join('');
  const footer = zh ? '决策规则：当前只登记，不预约，不扩容。任一证据过期、保护组变差或责任缺位，回到 P0；所有地面与人工回退继续保留。' : 'Decision rule: register only; no booking or expansion. Expired evidence, protected-group decline or missing ownership returns to P0; ground and human fallback stays available.';
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1000" viewBox="0 0 1800 1000" role="img" aria-labelledby="title desc">
  <title id="title">${esc(title)}</title><desc id="desc">${esc(subtitle)}</desc>
  <style>.bg{fill:#071a2b}.panel{fill:#0e2a3c;stroke:#275369;stroke-width:2}.title{font:800 36px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#f4fbff}.sub{font:500 18px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#a9c8d1}.stage-id{font:900 15px SFMono-Regular,Consolas,monospace;fill:#071a2b}.stage-title{font:800 21px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#f4fbff}.status{font:800 13px SFMono-Regular,Consolas,monospace;fill:#77e3c0;letter-spacing:1px}.stage-copy{font:600 15px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#dceef2}.stage-copy-tight{font:600 13px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#dceef2}.small{font:600 13px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#91b5bf}.value{font:800 20px SFMono-Regular,Consolas,monospace;fill:#f4fbff}.section{font:800 18px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#77e3c0}.evidence-row{font:600 16px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#e0eff2}.foot{font:500 14px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#a9c8d1}.warning{font:600 14px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#f6c76b}.footer{font:700 16px PingFang SC,Microsoft YaHei,Arial,sans-serif;fill:#f4fbff}</style>
  <rect width="1800" height="1000" class="bg"/><circle cx="1700" cy="60" r="280" fill="#2a9d8f" opacity=".12"/><circle cx="90" cy="940" r="260" fill="#5b8def" opacity=".11"/>
  ${text(64, 64, title, 'title')}${text(66, 100, subtitle, 'sub')}
  <rect x="52" y="140" width="1696" height="290" rx="26" class="panel"/>${stageBoxes}
  <rect x="52" y="462" width="820" height="340" rx="24" class="panel"/><rect x="900" y="462" width="848" height="340" rx="24" class="panel"/>
  ${text(84, 510, zh ? 'P0 必须先补齐的证据' : 'Evidence required at P0', 'section')}${evidence}
  ${text(932, 510, zh ? '模型现在能说什么' : 'What the model may claim now', 'section')}${may}${text(932, 622, zh ? '模型现在不能说什么' : 'What the model must not claim now', 'section')}${must}
  <rect x="52" y="844" width="1696" height="92" rx="20" fill="#102f42" stroke="#f6c76b" stroke-width="2"/>${text(82, 886, footer, 'footer')}${text(82, 914, zh ? '来源：commute-co-benefit-contract.json · authorization register · aggregate only · no operating approval' : 'Source: commute-co-benefit-contract.json · authorization register · aggregate only · no operating approval', 'small')}
</svg>`;
}

function writeArtifacts(register) {
  fs.mkdirSync(figureRoot, { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(register, null, 2)}\n`);
  fs.writeFileSync(path.join(figureRoot, 'commute-co-benefit-authorization-board.svg'), createBoard(register, false));
  fs.writeFileSync(path.join(figureRoot, 'commute-co-benefit-authorization-board.en.svg'), createBoard(register, true));
}

function checkRegister(actual) {
  const fresh = buildAuthorization();
  const checks = {
    register_readout_parity: JSON.stringify(actual) === JSON.stringify(fresh),
    stage_order_complete: fresh.checks.stage_order_complete,
    every_stage_has_evidence_action_stop_and_roles: fresh.checks.every_stage_has_evidence_action_stop_and_roles,
    current_stage_is_p0: fresh.checks.current_stage_is_p0,
    current_action_is_hold: fresh.checks.current_action_is_hold,
    air_candidate_blocked: fresh.checks.air_candidate_blocked,
    source_is_non_operational: fresh.checks.source_is_non_operational,
    aggregate_only: fresh.checks.aggregate_only
  };
  if (Object.values(checks).every(Boolean)) {
    console.log(JSON.stringify({ ok: true, current_stage: fresh.current_stage, checks }, null, 2));
    return true;
  }
  Object.entries(checks).filter(([, pass]) => !pass).forEach(([id]) => console.error(`COMMUTE_CO_BENEFIT_AUTHORIZATION_CHECK_FAIL: ${id}`));
  process.exitCode = 1;
  return false;
}

if (process.argv.includes('--check')) {
  if (!fs.existsSync(outputPath)) {
    console.error(`COMMUTE_CO_BENEFIT_AUTHORIZATION_CHECK_FAIL: missing ${outputPath}`);
    process.exitCode = 1;
  } else checkRegister(JSON.parse(fs.readFileSync(outputPath, 'utf8')));
} else {
  const register = buildAuthorization();
  writeArtifacts(register);
  console.log(JSON.stringify({ ok: true, output: path.relative(packageRoot, outputPath), board: 'assets/figures/commute-co-benefit-authorization-board.svg' }, null, 2));
}
