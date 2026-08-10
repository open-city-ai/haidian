#!/usr/bin/env node
/*
 * Human City OS v2.1: deterministic spatial-action-room board.
 *
 * This is a presentation/evidence asset, not new geometry.  It binds the
 * three provisional key areas to the same five-stage spatial sequence so a
 * reviewer can see the design move, the human equivalent, the machine limit,
 * and the stop condition without inferring an engineering section or an
 * operating promise.
 */
const fs = require('fs');
const path = require('path');

const here = __dirname;
const packageRoot = path.resolve(here, '../..');
const figureRoot = path.join(packageRoot, 'assets', 'figures');

const stages = [
  { id: 'S1', zh: '到达与人工入口', en: 'Arrival / staffed edge', color: '#E76F51' },
  { id: 'S2', zh: '公共解释与选择', en: 'Public explanation / choice', color: '#2A9D8F' },
  { id: 'S3', zh: '受限机器接口', en: 'Bounded machine interface', color: '#3D76EA' },
  { id: 'S4', zh: '蓝绿停留与恢复', en: 'Blue-green pause / recovery', color: '#5E9C76' },
  { id: 'S5', zh: '退出、申诉与回放', en: 'Exit / appeal / replay', color: '#E9A93A' },
];

const areas = [
  {
    area_id: 'PROV-KEY-002',
    name_zh: '北京 AI 原点社区',
    name_en: 'Beijing AI Origin Community',
    question_zh: '普通人怎样先不用 AI 也能办事、学习与退出？',
    question_en: 'How can ordinary people act, learn, and exit without using AI?',
    geometry_refs: [
      'geometry/key_areas.geojson#PROV-KEY-002',
      'geometry/public_space.geojson#PUBLIC-A-INCLUSION',
      'geometry/roads.geojson#ROAD-A-SKILL',
      'geometry/green_space.geojson#GREEN-A-QUIET-1',
    ],
    scenario_refs: ['geometry/constraints.geojson#SC-A01', 'geometry/constraints.geojson#SC-A03', 'geometry/constraints.geojson#SC-A04'],
    metric_refs: ['metric:community_retention_support_area_ratio', 'metric:skill_transition_corridor_length_m', 'metric:manual_service_equivalence_rate'],
    nodes: [
      { zh: '连续步行 / 人工入口', en: 'Continuous walk / staffed edge', action_zh: '先看到人工柜台、纸面和电话入口。', action_en: 'Make staffed, paper, and phone entrances visible first.', human_zh: '工作人员 / 纸面 / 电话', human_en: 'Staff / paper / phone', machine_zh: '不要求扫码或情绪识别', machine_en: 'No forced scan or emotion inference', stop_zh: '入口或无障碍不清 → 只补资料', stop_en: 'Unclear access → gather evidence only' },
      { zh: '代际共学 / 社区保留', en: 'Intergenerational learning / retention', action_zh: '把保留账本、小商户回迁议事放在可见公共房间。', action_en: 'Place retention records and shop-return dialogue in a visible civic room.', human_zh: '居民代表解释 / 申诉', human_en: 'Resident explanation / appeal', machine_zh: 'AI 只整理问题，不替人决定', machine_en: 'AI organizes questions; it does not decide', stop_zh: '无知情基线 → 不发布保留率', stop_en: 'No consented baseline → no retention claim' },
      { zh: '技能再造接力站', en: 'Skills-transition relay', action_zh: '登记 → 再培训 → 带薪岗位路径逐段交接。', action_en: 'Hand off from intake to reskilling to a paid pathway.', human_zh: '人工职业咨询 / 岗位转介', human_en: 'Career advice / job referral', machine_zh: '不以培训人次替代就业结果', machine_en: 'Attendance is not an employment outcome', stop_zh: '无岗位路径 → 回到 v0.1', stop_en: 'No job pathway → return to v0.1' },
      { zh: '无屏恢复花园', en: 'Screen-free recovery garden', action_zh: '用树荫、声音、静态导视和夜间安心边界支持恢复。', action_en: 'Use shade, sound, static cues, and a night-safe edge for recovery.', human_zh: '现场求助 / 陪行', human_en: 'On-site help / accompaniment', machine_zh: '不采集、不推荐、不强制交互', machine_en: 'No capture, recommendation, or forced interaction', stop_zh: '强制采集或安全盲区 → 撤回', stop_en: 'Forced capture or blind spot → withdraw' },
      { zh: '普通服务 / 版本回放', en: 'Ordinary service / replay', action_zh: '保留纸面凭证、版本差异和异议入口。', action_en: 'Retain paper receipts, version deltas, and an objection route.', human_zh: '人工答复 / 删除', human_en: 'Human reply / deletion', machine_zh: '不留不可撤的数据链', machine_en: 'No non-retractable data chain', stop_zh: '无法独立回放 → 不发布', stop_en: 'No independent replay → do not release' },
    ],
  },
  {
    area_id: 'PROV-KEY-001',
    name_zh: '众智园 AI 自主创新加速区',
    name_en: 'Zhongzhiyuan AI Autonomous Innovation Accelerator',
    question_zh: '机器测试怎样在公共空间里被限制、接管并退出？',
    question_en: 'How are machine tests bounded, taken over, and exited in public space?',
    geometry_refs: [
      'geometry/key_areas.geojson#PROV-KEY-001',
      'geometry/roads.geojson#ROAD-B-SILICON',
      'geometry/public_space.geojson#PUBLIC-B-API',
      'geometry/green_space.geojson#GREEN-C-SPONGE',
    ],
    scenario_refs: ['geometry/constraints.geojson#SC-B02', 'geometry/constraints.geojson#SC-C01', 'geometry/constraints.geojson#SC-C03'],
    metric_refs: ['metric:silicon_right_of_way_length_m', 'metric:low_altitude_concept_corridor_length_m', 'metric:operational_pue'],
    nodes: [
      { zh: '人行优先观察边缘', en: 'Pedestrian-first observation edge', action_zh: '把普通步行、人工求助与测试入口分开标识。', action_en: 'Separate ordinary walking, help, and test entrances.', human_zh: '步行 / 静态提示 / 人工引导', human_en: 'Walking / static cues / staff', machine_zh: '先申报时段、权限、退出', machine_en: 'Declare time, scope, and exit first', stop_zh: '无安全断面或接管 → 观察门', stop_en: 'No safety or takeover → observation gate' },
      { zh: 'API 授权解释台', en: 'API authorization desk', action_zh: '把最小字段、日志、撤销和异议放到公共前台。', action_en: 'Expose minimum fields, logs, revocation, and objections at a civic desk.', human_zh: '工作人员解释用途', human_en: 'Staff explain purpose', machine_zh: '最小权限、可撤销、可回放', machine_en: 'Least privilege, revocable, replayable', stop_zh: '越权或无日志 → 冻结调用', stop_en: 'Overreach or no log → freeze call' },
      { zh: '具身测试口袋', en: 'Embodied-test pocket', action_zh: '只在可关闭的概念单元记录进入、接管和退出。', action_en: 'Record entry, takeover, and exit in a closable concept unit.', human_zh: '停机 / 疏散 / 事故复盘', human_en: 'Stop / evacuate / replay', machine_zh: '一次演示不得扩区', machine_en: 'One demo cannot expand the area', stop_zh: '事故、保险或回放缺一 → 退回', stop_en: 'Missing incident, insurance, or replay → return' },
      { zh: '小月河翼海绵退避', en: 'Xiaoyue River sponge retreat', action_zh: '把行洪、海绵和无屏退避作为机器界面的后置缓冲。', action_en: 'Make flood conveyance, sponge, and screen-free retreat a backstop.', human_zh: '避险导视 / 人工巡检', human_en: 'Wayfinding / manual inspection', machine_zh: '不以模拟替代水文审查', machine_en: 'Simulation is not hydrology review', stop_zh: '无蓝线或校准 → 不扩展', stop_en: 'No blue-line or calibration → no expansion' },
      { zh: '事故复盘 / 版本回退', en: 'Incident replay / rollback', action_zh: '公开可删减的事件记录，决定修复、撤回或回到上一门。', action_en: 'Use a redacted event record to repair, withdraw, or return to the prior gate.', human_zh: '独立复核 / 公众异议', human_en: 'Independent review / public objection', machine_zh: '不可独立回放即停机', machine_en: 'No independent replay → stop', stop_zh: '无法回放 → 不扩区', stop_en: 'No replay → no expansion' },
    ],
  },
  {
    area_id: 'PROV-KEY-003',
    name_zh: '大钟寺 AI 产业聚集区',
    name_en: 'Dazhongsi AI Industry Cluster',
    question_zh: '创新怎样变成可理解、可质疑、可复用的日常公共服务？',
    question_en: 'How does innovation become legible, contestable, reusable public service?',
    geometry_refs: [
      'geometry/key_areas.geojson#PROV-KEY-003',
      'geometry/constraints.geojson#SC-D01',
      'geometry/constraints.geojson#SC-D02',
      'geometry/constraints.geojson#SC-D03',
    ],
    scenario_refs: ['geometry/constraints.geojson#SC-D01', 'geometry/constraints.geojson#SC-D02', 'geometry/constraints.geojson#SC-D03'],
    metric_refs: ['metric:version_release_count', 'metric:public_space_ratio', 'metric:manual_service_equivalence_rate'],
    nodes: [
      { zh: '城市问题台', en: 'City problem desk', action_zh: '把问题、资料边界和人工解释做成可读入口。', action_en: 'Make problems, data boundaries, and human explanation legible.', human_zh: '人工登记 / 纸面目录', human_en: 'Human intake / paper directory', machine_zh: '只交换已授权的最小问题', machine_en: 'Exchange only authorized minimums', stop_zh: '权属或授权不清 → 只公开问题', stop_en: 'Unclear rights → publish the question only' },
      { zh: 'OPC 公平申请面', en: 'OPC fair-access face', action_zh: '把一人公司、小团队的公平申请和冲突披露放在街道界面。', action_en: 'Make fair applications and conflict disclosure visible to small teams.', human_zh: '公开申请 / 人工预约', human_en: 'Open application / human booking', machine_zh: '不指定企业或供应商', machine_en: 'No named vendor or enterprise', stop_zh: '资源分配不透明 → 暂停开放', stop_en: 'Opaque allocation → pause access' },
      { zh: '版本 / 标准回放台', en: 'Version / draft-standard replay', action_zh: '把通过回放的路权、数据和适老模板登记为待复核草案。', action_en: 'Register replayed mobility, data, and ageing-friendly templates as drafts for review.', human_zh: '人工审阅 / 异议窗口', human_en: 'Human review / objection window', machine_zh: '不冒充国家或行业标准', machine_en: 'Never present as a national or industry standard', stop_zh: '不能独立回放 → 不外溢', stop_en: 'No independent replay → no outward use' },
      { zh: '多语服务客厅', en: 'Multilingual service room', action_zh: '以多语、医疗导航和知识产权清单支持访客与居民。', action_en: 'Support visitors and residents with multilingual, health-navigation, and IP lists.', human_zh: '人工翻译 / 线下转介', human_en: 'Human translation / referral', machine_zh: '不以品牌替代实际能力', machine_en: 'Brand is not service capacity', stop_zh: '服务能力未核验 → 保留普通路径', stop_en: 'Unverified capacity → retain ordinary route' },
      { zh: '发布、撤回与回放', en: 'Release / withdrawal / replay', action_zh: '年度体检、变更、撤回和待补资料一起进入 release note。', action_en: 'Put the annual review, changes, withdrawals, and gaps into one release note.', human_zh: '责任回复 / 公众复核', human_en: 'Accountable reply / public review', machine_zh: '没有证据不升级版本', machine_en: 'No evidence, no version upgrade', stop_zh: '未回应异议 → 留在上一版', stop_en: 'Unanswered objection → stay on prior version' },
    ],
  },
];

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function wrap(text, max, english = false) {
  const source = String(text);
  if (!english) {
    const chars = [...source];
    const lines = [];
    for (let i = 0; i < chars.length; i += max) lines.push(chars.slice(i, i + max).join(''));
    return lines;
  }
  const lines = [];
  let current = '';
  for (const word of source.split(/\s+/)) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > max && current) { lines.push(current); current = word; } else current = candidate;
  }
  if (current) lines.push(current);
  return lines;
}

function textLines(lines, x, y, className, lineHeight = 20, anchor = 'start') {
  return `<text x="${x}" y="${y}" class="${className}" text-anchor="${anchor}">${lines.map((line, index) => `<tspan x="${x}" dy="${index ? lineHeight : 0}">${esc(line)}</tspan>`).join('')}</text>`;
}

function renderSvg(english = false) {
  const title = english ? 'Three focus areas | spatial action rooms' : '三处重点区｜空间动作房间';
  const subtitle = english ? 'The same five-stage spatial sequence, with a different human question at each provisional anchor' : '同一条五段空间序列，在三处临时锚点回答不同的人本问题';
  const boundary = english ? 'CONCEPT / PROVISIONAL · no official boundary, engineering section, capacity, permit, or operating result' : '概念建议 / 临时约束 · 不产生官方边界、工程断面、容量、许可或运营结果';
  const lines = [];
  lines.push('<svg xmlns="http://www.w3.org/2000/svg" width="1900" height="1420" viewBox="0 0 1900 1420">');
  lines.push('<rect width="1900" height="1420" fill="#F7F9FC"/>');
  lines.push('<style>');
  lines.push('.title{font:700 46px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#142B4A}.sub{font:22px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#60748D}.area{font:700 25px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#142B4A}.anchor{font:16px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#6C7F95}.question{font:18px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#304B67}.nodehead{font:700 17px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#FFFFFF}.label{font:700 14px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#36526E}.body{font:16px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#1D3955}.tiny{font:14px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#687E95}.footer{font:16px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#C95D5D}.stage{font:700 15px -apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans CJK SC",sans-serif;fill:#183654}</style>');
  lines.push(`<text x="64" y="70" class="title">${esc(title)}</text>`);
  lines.push(`<text x="64" y="110" class="sub">${esc(subtitle)}</text>`);
  lines.push(`<text x="1835" y="70" text-anchor="end" class="anchor">PACKAGE v2.1</text>`);
  lines.push(`<text x="1835" y="102" text-anchor="end" class="footer">${esc(english ? 'CONCEPT / PROVISIONAL' : '概念 / 临时约束')}</text>`);

  const xLabel = 64;
  const xBoard = 444;
  const cardW = 258;
  const cardGap = 18;
  const rowY = [190, 530, 870];
  const rowH = 290;
  const stageY = 152;
  stages.forEach((stage, index) => {
    const x = xBoard + index * (cardW + cardGap) + cardW / 2;
    lines.push(`<text x="${x}" y="${stageY}" text-anchor="middle" class="stage" fill="${stage.color}">${esc(english ? stage.en : stage.zh)}</text>`);
  });
  lines.push(`<text x="${xLabel}" y="152" class="stage">${esc(english ? 'provisional anchor / first question' : '临时锚点 / 先回答的问题')}</text>`);

  areas.forEach((area, rowIndex) => {
    const y = rowY[rowIndex];
    lines.push(`<rect x="${xLabel}" y="${y}" width="350" height="${rowH}" rx="18" fill="#FFFFFF" stroke="#CBD7E3" stroke-width="2"/>`);
    lines.push(`<rect x="${xLabel}" y="${y}" width="12" height="${rowH}" rx="6" fill="${rowIndex === 0 ? '#E76F51' : rowIndex === 1 ? '#3D76EA' : '#2A9D8F'}"/>`);
    lines.push(`<text x="${xLabel + 30}" y="${y + 42}" class="area">${esc(english ? area.name_en : area.name_zh)}</text>`);
    lines.push(`<text x="${xLabel + 30}" y="${y + 72}" class="anchor">${esc(area.area_id)} · official_boundary=false</text>`);
    const qLines = wrap(english ? area.question_en : area.question_zh, english ? 39 : 23, english);
    lines.push(textLines(qLines, xLabel + 30, y + 114, 'question', 25));
    const ref = english ? 'GeoJSON anchors and scenario IDs are listed in the JSON audit.' : 'GeoJSON 锚点与场景 ID 见同名 JSON 审计。';
    lines.push(textLines(wrap(ref, english ? 42 : 24, english), xLabel + 30, y + 190, 'tiny', 20));
    lines.push(`<text x="${xLabel + 30}" y="${y + 260}" class="anchor">geometry_role=provisional_constraint</text>`);

    // ground line and directional arrows
    lines.push(`<line x1="${xBoard - 8}" y1="${y + 30}" x2="${xBoard + 5 * cardW + 4 * cardGap + 8}" y2="${y + 30}" stroke="#B8C8D8" stroke-width="5" stroke-linecap="round"/>`);
    area.nodes.forEach((node, nodeIndex) => {
      const x = xBoard + nodeIndex * (cardW + cardGap);
      const stage = stages[nodeIndex];
      lines.push(`<rect x="${x}" y="${y}" width="${cardW}" height="${rowH}" rx="16" fill="#FFFFFF" stroke="${stage.color}" stroke-width="3"/>`);
      lines.push(`<rect x="${x}" y="${y}" width="${cardW}" height="42" rx="16" fill="${stage.color}"/>`);
      lines.push(`<text x="${x + 14}" y="${y + 27}" class="nodehead">0${nodeIndex + 1} · ${esc(english ? node.en : node.zh)}</text>`);
      const actionLines = wrap(english ? node.action_en : node.action_zh, english ? 26 : 14, english);
      lines.push(textLines(actionLines, x + 14, y + 72, 'body', 20));
      const humanLabel = english ? 'HUMAN EQUIVALENT' : '人工等效';
      const machineLabel = english ? 'MACHINE LIMIT' : '机器边界';
      const stopLabel = english ? 'STOP / RETURN' : '停止 / 回退';
      const humanText = english ? node.human_en : node.human_zh;
      const machineText = english ? node.machine_en : node.machine_zh;
      const stopText = english ? node.stop_en : node.stop_zh;
      const bodyY = y + 132;
      lines.push(`<text x="${x + 14}" y="${bodyY}" class="label">${humanLabel}</text>`);
      lines.push(textLines(wrap(humanText, english ? 27 : 14, english), x + 14, bodyY + 20, 'tiny', 17));
      lines.push(`<text x="${x + 14}" y="${bodyY + 58}" class="label">${machineLabel}</text>`);
      lines.push(textLines(wrap(machineText, english ? 27 : 14, english), x + 14, bodyY + 78, 'tiny', 17));
      lines.push(`<rect x="${x + 10}" y="${y + 240}" width="${cardW - 20}" height="38" rx="10" fill="#FFF4E9"/>`);
      lines.push(`<text x="${x + 20}" y="${y + 258}" class="label">${stopLabel}</text>`);
      lines.push(textLines(wrap(stopText, english ? 28 : 16, english), x + 20, y + 273, 'tiny', 16));
      if (nodeIndex < area.nodes.length - 1) {
        const arrowX = x + cardW + 3;
        lines.push(`<path d="M${arrowX} ${y + 30} H${arrowX + cardGap - 6}" stroke="#6B8197" stroke-width="3"/>`);
        lines.push(`<path d="M${arrowX + cardGap - 15} ${y + 24} L${arrowX + cardGap - 5} ${y + 30} L${arrowX + cardGap - 15} ${y + 36}" fill="none" stroke="#6B8197" stroke-width="3"/>`);
      }
    });
  });

  const footerY = 1220;
  lines.push(`<rect x="64" y="${footerY}" width="1770" height="118" rx="18" fill="#EEF3F8" stroke="#CBD7E3" stroke-width="2"/>`);
  lines.push(`<text x="90" y="${footerY + 34}" class="area">${esc(english ? 'Common spatial rule' : '共同空间规则')}</text>`);
  const rule = english ? 'Human-readable arrival → public explanation → bounded interface → screen-free pause → staffed exit and replay. Every move remains conceptual until official geometry, rights, safety, accessibility, energy, climate, and public baselines are supplied.' : '可读的人行到达 → 公共解释 → 受限接口 → 无屏停留 → 人工退出与回放。官方几何、权属、安全、无障碍、能源、气候与公众基线到位前，所有动作保持概念建议。';
  lines.push(textLines(wrap(rule, english ? 120 : 74, english), 90, footerY + 70, 'tiny', 23));
  lines.push(`<text x="64" y="1380" class="footer">${esc(boundary)}</text>`);
  lines.push('</svg>');
  return lines.join('\n') + '\n';
}

function buildJson() {
  return {
    schema_version: '0.1.0',
    package_iteration: 'v2.1',
    status: 'conceptual_spatial_action_room_evidence',
    title_zh: '三处重点区空间动作房间',
    title_en: 'Spatial action rooms for the three focus areas',
    purpose_zh: '把三处重点区各自的问题、五段空间动作、人工等效入口、机器边界与停止条件放在同一张可读板上；只重排现有临时 GeoJSON 锚点和场景，不新增几何、面积、断面、容量或运营事实。',
    purpose_en: 'Place each focus area\'s question, five-stage spatial action, human equivalent, machine limit, and stop condition on one readable board; this reorders existing provisional GeoJSON anchors and scenarios without adding geometry, area, sections, capacity, or operating facts.',
    official_boundary: false,
    geometry_role: 'provisional_constraint',
    precision_note_zh: '所有空间建议为概念建议 / 参考方案，可供专业团队深化研究；临时边界不是官方红线，显示顺序不是工程线位。',
    precision_note_en: 'All spatial moves are conceptual suggestions / reference schemes for professional teams; the provisional boundary is not an official redline and the sequence is not an engineering alignment.',
    stages,
    areas,
    verification_contract: {
      geometry_refs_must_resolve: true,
      node_count_per_area: 5,
      performance_results: null,
      operational_status: 'not_authorized_not_run',
      recompute_trigger: 'official geometry, rights, safety, accessibility, energy, climate, or public-baseline evidence changes',
    },
  };
}

const payload = buildJson();
fs.writeFileSync(path.join(here, 'spatial-action-rooms-v21.json'), `${JSON.stringify(payload, null, 2)}\n`);
fs.writeFileSync(path.join(figureRoot, 'spatial-action-rooms-v21.svg'), renderSvg(false));
fs.writeFileSync(path.join(figureRoot, 'spatial-action-rooms-v21.en.svg'), renderSvg(true));
console.log(JSON.stringify({ areas: areas.length, nodes: areas.reduce((n, area) => n + area.nodes.length, 0), outputs: 3 }, null, 2));
