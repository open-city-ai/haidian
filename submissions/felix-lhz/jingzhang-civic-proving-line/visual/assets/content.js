const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const readJson = rel => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
const writeJson = (rel, value) => fs.writeFileSync(path.join(ROOT, rel), JSON.stringify(value, null, 2) + '\n');
const readText = rel => fs.readFileSync(path.join(ROOT, rel), 'utf8').replace(/\r\n/g, '\n');
const writeText = (rel, value) => fs.writeFileSync(path.join(ROOT, rel), value.replace(/\r\n/g, '\n'));

const zhPrelude = `# 京张双答 / JING-ZHANG TWO ANSWERS

> **一条公共路径，四种城市状态。** 在大钟寺中心，一条 **4 米原型公共路径**在 OPEN、TRIAL、PAUSE、RETIRE 四态中始终连续；AI 只占一侧可逆试验湾，人工服务与回执廊始终开放。[data:visual/assets/prototype-model.json] [metric:s7_public_route_prototype_width_m]

普通答案不是备用方案，而是准入前提：常规接驳、轮椅与盲道路线、遮阴候车、静态导视和人工窗口必须先独立成立。AI 只有在同题、同人、同空间条件下证明增量，才可由人类委员会作出 adopt / revise / stop；停止后设备沿独立维护线撤出，公共层不借用试验空间。[data:visual/assets/two-answers.json] [depth:overall_spatial_structure]

![一路四态单页评审摘要](assets/figures/jury-summary.png)

## S7 建筑—公共空间原型

大钟寺旗舰样板由五个相互独立但可追踪的空间层组成：①南北与东西两条 4 米公共路线；②东南侧单侧试验湾与可逆缓冲；③西南侧有人值守的回执廊；④树池、雨水花园、遮阴候车和不受占用的疏散面；⑤控制、存储、维护、废弃物和设备撤场后场。1:500 平面、1:200 生活剖面、1:50/1:20 节点与同机位四态轴测使用同一组件 ID。[data:visual/assets/prototype-model.json] [depth:three_key_area_detailed_design]

材料采用可逆概念原型：螺栓连接镀锌钢框架、穿孔金属遮阳屏、干式预制压重基础、透水预制铺装和可更换证据面板。OPEN 仅运行公共层；TRIAL 在许可、岗位和普通基线齐全后限时开放一侧；PAUSE 隔离设备并由人工完成同题任务；RETIRE 拆除插件、复位铺装并保留公共服务与复盘面板。结构、消防、基础、排水与耐久仍待专业复核，价格保持 pending_market_quote。[data:visual/assets/e2-readiness.json]

## 三个备选，一次空间裁决

同一任务、用户、场地和硬门下，ALT-A 中央混合湾因切断公共十字并冲突消防/撤场而 reject_design；ALT-B 分散双湾保住路线但监督与撤场碎片化，返回 revise_design；ALT-C 单侧可逆湾是唯一 advance_design。设计备选状态不等同于现场 adopt / revise / stop，计算只证明几何规则自洽。[data:visual/assets/spatial-decision.json] [metric:spatial_alternative_count]

ALT-C 的概念公共路线、单侧试验范围和可逆缓冲均由同一局部米制审计生成。[metric:alt_c_public_route_length_m] [metric:alt_c_trial_area_sqm] [metric:alt_c_reversible_buffer_area_sqm]

岗位—急停距离沿用同一输入；正式底图、站口、权属或专业条件变化时必须重算，图纸和文字服从结果。[metric:alt_c_max_estop_staff_distance_m]

## 当前实施门：G0 进入测绘与许可准备

当前不是“不可实施”，而是诚实位于 **G0：进入测绘与许可准备**。下一道门要求完成现场测绘、权属和轨道接口核验，关闭场地/消防/无障碍/临电/网络/交通组织/设备安全等许可依赖，落实场地负责人、普通服务、安全和数据记录四个独立岗位，再记录连续 7 个普通运行日。任一条件缺失，AI 试验不启动，但普通开放日仍可独立筹备。[data:visual/assets/e2-readiness.json] [metric:e2_permit_gate_count]

现场客流、安全、效率、满意度、能耗、价格和恢复时长继续为 unknown / not_field_run。12 份测量契约说明“如何验证”，不冒充验证结果。[metric:measurement_contract_count] [metric:field_verification_result_count]

## 正式规划背景与运营叠加

2026 年公开背景明确约 1668.2 公顷街区范围、9 公里京张绿带与“一带一轴、两心多点”，大钟寺是两处中心之一；二期配套工程已完工并形成鱼骨状慢行联系。[source:BEIJING-BLOCK-PLAN-APPROVED-20260812] [source:BEIJING-JZ-PHASE2-COMPLETE-20260714]

这些事实是可信底图，不是方案主角。“一脊三站两翼”是嵌入绿带、对接大钟寺中心与创新发展轴的可停、可撤运营层；六条缝合只对接已建或已公布的慢行方向，不被画成拟建道路。官方 1668.2 公顷范围与本投稿 11.4 平方公里临时可复算几何分开登记，政府报道也不等于本团队踏勘、测绘、产权或工程验收。[data:visual/assets/spatial-atlas.json] [metric:official_planning_area_ha] [metric:submitted_provisional_area_sqm]

![正式背景上的京张双答运营叠加](assets/figures/site-overview.png)

![大钟寺首层、公共空间、交通与蓝绿叠合](assets/figures/land-use-structure.png)
`;

const enPrelude = `# JING-ZHANG TWO ANSWERS

> **One public route, four civic states.** At Dazhongsi centre, a **4 m prototype public route** remains continuous through OPEN, TRIAL, PAUSE and RETIRE. AI occupies only a one-sided reversible trial bay; staffed service and the Receipt Porch remain open.[data:visual/assets/prototype-model.json] [metric:s7_public_route_prototype_width_m]

The ordinary answer is an admission prerequisite, not a fallback: conventional interchange, wheelchair and tactile routes, shaded waiting, static wayfinding and a staffed desk must work independently. AI may be considered only after a same-task, same-user, same-space comparison; a human committee alone decides adopt / revise / stop. On stopping, equipment leaves through an independent maintenance route without borrowing the public layer.[data:visual/assets/two-answers.json] [depth:overall_spatial_structure]

![One-route four-state jury summary](assets/figures/jury-summary.en.png)

## S7 architectural–public-space prototype

The Dazhongsi flagship has five independent, traceable layers: two 4 m public routes; a southeast one-sided trial bay and reversible buffer; a southwest staffed Receipt Porch; tree pits, rain gardens, shaded waiting and an unoccupied egress surface; and a back-of-house route for control, storage, maintenance, waste and retirement. The 1:500 plan, 1:200 lived sections, 1:50/1:20 nodes and same-camera state axonometrics share component IDs.[data:visual/assets/prototype-model.json] [depth:three_key_area_detailed_design]

The reversible prototype palette is bolted galvanized steel, perforated-metal shade, dry precast ballast foundations, permeable precast paving and replaceable evidence panels. OPEN runs the public layer only; TRIAL opens one side after permits, posts and baseline close; PAUSE isolates equipment while staff complete the same task; RETIRE removes plug-ins, relays paving and retains public service and review panels. Structure, fire, foundations, drainage and durability await specialist review; all prices remain pending_market_quote.[data:visual/assets/e2-readiness.json]

## Three alternatives, one spatial decision

Under one task, users, site and hard gates, ALT-A central mixing is reject_design because it cuts the public cross and conflicts with fire/removal; ALT-B split bays retain routes but fragment supervision and removal, so revise_design; ALT-C one-sided reversible bay is the sole advance_design. These design-option states are not field adopt / revise / stop decisions; the computation tests geometric consistency only.[data:visual/assets/spatial-decision.json] [metric:spatial_alternative_count]

ALT-C route, one-sided trial area and reversible buffer come from one local-metric audit.[metric:alt_c_public_route_length_m] [metric:alt_c_trial_area_sqm] [metric:alt_c_reversible_buffer_area_sqm]

Staff-to-e-stop distance uses the same input. Any change in official base, entrances, title or specialist constraints requires a rerun; drawings and text must follow the result.[metric:alt_c_max_estop_staff_distance_m]

## Current implementation gate: G0 survey and permit preparation

The scheme is not labelled “unimplementable”; it is honestly at **G0: enter survey and permit preparation**. The next gate requires site survey, title and rail-interface checks; closure of site, fire, accessibility, temporary power, network, traffic and equipment-safety dependencies; four independent venue, baseline-service, safety and data posts; then seven consecutive ordinary operating days. If any condition is missing, AI trial does not start, while an ordinary open day can still be prepared.[data:visual/assets/e2-readiness.json] [metric:e2_permit_gate_count]

Field footfall, safety, efficiency, satisfaction, energy, price and recovery duration remain unknown / not_field_run. Twelve measurement contracts define how to verify; they are not results.[metric:measurement_contract_count] [metric:field_verification_result_count]

## Approved planning context and operating overlay

Published 2026 context records an approximately 1,668.2 ha neighbourhood-planning area, a 9 km Jing-Zhang green belt and a “belt–axis–two centres–multiple nodes” structure, with Dazhongsi as one centre; Phase II supporting works are complete and a fishbone slow-mobility network is reported.[source:BEIJING-BLOCK-PLAN-APPROVED-20260812] [source:BEIJING-JZ-PHASE2-COMPLETE-20260714]

These facts are the credible base, not the design protagonist. The spine/stations/wings form a stoppable, removable operating layer embedded in the green belt and aligned with Dazhongsi centre and the innovation axis; six stitches align with existing or published slow-mobility directions and are not proposed roads. The official 1,668.2 ha context and the submission's 11.4 sq km provisional geometry stay separate. Government reporting is not participant fieldwork, survey, title or acceptance evidence.[data:visual/assets/spatial-atlas.json] [metric:official_planning_area_ha] [metric:submitted_provisional_area_sqm]

![Jing-Zhang operating overlay on approved context](assets/figures/site-overview.en.png)

![Dazhongsi ground, public space, transit and blue-green overlay](assets/figures/land-use-structure.en.png)
`;

function frontMatter(text) {
  const match = text.match(/^---\n[\s\S]*?\n---\n/);
  if (!match) throw new Error('Proposal front matter missing');
  return match[0];
}

function rebuildProposal(rel, lang) {
  const source = readText(rel);
  const anchor = lang === 'zh' ? '## 设计依据与资料清单' : '## Design Basis and Source List';
  const at = source.indexOf(anchor);
  if (at < 0) throw new Error(`Proposal anchor missing: ${rel}`);
  let body = source.slice(at)
    .replace(/V16/g, 'V17')
    .replace(/G0 NO-GO/g, lang === 'zh' ? 'G0：进入测绘与许可准备' : 'G0: SURVEY + PERMIT PREPARATION')
    .replace(/在已批空间结构上建立城市采纳层。/g, '一条公共路径，四种城市状态。')
    .replace(/Civic adoption on approved structure/g, 'One public route, four civic states');
  let front = frontMatter(source)
    .replace(/^title:.*$/m, lang === 'zh' ? 'title: "京张双答 / JING-ZHANG TWO ANSWERS"' : 'title: "JING-ZHANG TWO ANSWERS"')
    .replace(/summary:.*\n/, lang === 'zh'
      ? 'summary: "一条4米原型公共路径在OPEN、TRIAL、PAUSE、RETIRE四态不断线；AI只占一侧，人工回执廊始终开放。"\n'
      : 'summary: "One 4 m prototype public route stays continuous across OPEN, TRIAL, PAUSE and RETIRE; AI occupies one side while the staffed Receipt Porch stays open."\n');
  writeText(rel, front + '\n' + (lang === 'zh' ? zhPrelude : enPrelude) + '\n' + body.trim() + '\n');
}

function updateStructuredData() {
  const model = readJson('visual/assets/prototype-model.json');
  model.schema_version = '1.14.0';
  model.dataset_id = 'jingzhang-v17-2-one-route-four-states';
  model.core_claim = {zh:'大钟寺一条4米原型公共路径在四态中不断线；AI只占一侧，人工回执廊始终开放。',en:'A 4 m prototype public route remains unbroken across four states; AI occupies one side and the staffed Receipt Porch stays open.'};
  model.canonical_view_refs = {city_context:'FIG-SITE-OVERVIEW-V17',ground_interface:'FIG-LAND-USE-V17',landmark_family:'FIG-KEY-AREAS-V17',continuous_journey:'FIG-MOBILITY-V17',evidence_desk:'FIG-METRICS-V17'};
  model.context_feature_refs = ['approved_green_belt','innovation_axis','dazhongsi_centre','fishbone_slow_mobility'];
  model.existing_public_use_refs = ['BEIJING-JZ-PHASE2-COMPLETE-20260714'];
  model.public_route_invariant = {clear_width_m:4,states:['OPEN','TRIAL','PAUSE','RETIRE'],interruption_allowed:false};
  model.s7.state_geometry_refs = Object.fromEntries(Object.keys(model.s7.states).map(k => [k, `S7-STATE-${k}`]));
  model.s7.maintenance_route_refs = ['S7-SERVICE-S','S7-RETIRE-E'];
  model.s7.experience_camera_ref = 'CAM-S7-NW-01';
  model.s7.visual_priority = 'hero';
  model.implementation_stage = 'G0_survey_and_permit_preparation';
  model.next_gate_requirements = ['survey_complete','title_and_interface_verified','permit_dependencies_closed','four_independent_posts','seven_ordinary_days'];
  for (const p of model.architectural_prototypes) {
    p.canonical_view_refs = p.id === 'LMK-03' ? ['S7-PLAN-500','S7-SEC-AA-200','S7-AXON-CUTAWAY'] : p.plan_refs.concat(p.section_refs);
    p.context_feature_refs = p.id === 'LMK-03' ? ['dazhongsi_centre','approved_green_belt','rail_directional_interface'] : ['approved_green_belt'];
    p.existing_public_use_refs = model.existing_public_use_refs;
    p.public_route_invariant = 'uninterrupted_in_OPEN_TRIAL_PAUSE_RETIRE';
    p.state_geometry_refs = p.id === 'LMK-03' ? model.s7.state_geometry_refs : {OPEN:`${p.id}-OPEN`,PAUSE:`${p.id}-PAUSE`,RETIRE:`${p.id}-RETIRE`};
    p.maintenance_route_refs = p.service_access_refs;
    p.experience_camera_ref = p.id === 'LMK-03' ? 'CAM-S7-NW-01' : `${p.id}-CAM-01`;
    p.visual_priority = p.id === 'LMK-03' ? 'hero' : 'support';
    p.implementation_stage = p.id === 'LMK-03' ? model.implementation_stage : 'E1_concept_design';
    p.next_gate_requirements = p.id === 'LMK-03' ? model.next_gate_requirements : ['site_interface_survey','operator_confirmation'];
  }
  writeJson('visual/assets/prototype-model.json', model);

  const atlas = readJson('visual/assets/spatial-atlas.json');
  Object.assign(atlas,{schema_version:'1.14.0',publication_version:'V17.2',subtitle:{zh:'一条公共路径，四种城市状态',en:'One public route, four civic states'},canonical_view_refs:model.canonical_view_refs,context_feature_refs:model.context_feature_refs,existing_public_use_refs:model.existing_public_use_refs,public_route_invariant:model.public_route_invariant,state_geometry_refs:model.s7.state_geometry_refs,maintenance_route_refs:model.s7.maintenance_route_refs,experience_camera_ref:model.s7.experience_camera_ref,visual_priority:'hero',implementation_stage:model.implementation_stage,next_gate_requirements:model.next_gate_requirements,interface_status:['existing_published','approved_context','design_proposal','unknown']});
  writeJson('visual/assets/spatial-atlas.json', atlas);

  const scenes = readJson('visual/assets/two-answers.json');
  Object.assign(scenes,{schema_version:'1.14.0',publication_version:'V17.2',subtitle:{zh:'一条公共路径，四种城市状态',en:'One public route, four civic states'},public_route_invariant:model.public_route_invariant,canonical_view_refs:model.canonical_view_refs,context_feature_refs:model.context_feature_refs,existing_public_use_refs:model.existing_public_use_refs,state_geometry_refs:model.s7.state_geometry_refs,maintenance_route_refs:model.s7.maintenance_route_refs,experience_camera_ref:model.s7.experience_camera_ref,visual_priority:'hero',implementation_stage:model.implementation_stage,next_gate_requirements:model.next_gate_requirements});
  for (const s of scenes.scenarios) {
    s.visual_priority = s.code === 'S7' ? 'hero' : (['T2','S2'].includes(s.code) ? 'support' : 'reference');
    s.implementation_stage = s.code === 'S7' ? model.implementation_stage : 'E1_concept_design';
    s.next_gate_requirements = s.code === 'S7' ? model.next_gate_requirements : ['baseline_validation','operator_assignment'];
    s.public_route_invariant = 'ordinary_service_continuous_in_all_states';
  }
  writeJson('visual/assets/two-answers.json', scenes);
}

function updateMetrics() {
  const data = readJson('metrics.json');
  data.metrics.s7_public_route_prototype_width_m = {status:'known',value:4,unit:'m',source_files:['visual/assets/prototype-model.json'],formula:'min(s7.public_routes[].clear_width_m)',confidence:'medium',assumptions:['A-S7-PROTOTYPE-DIMENSIONS']};
  data.metrics.s7_public_route_state_invariant_count = {status:'known',value:4,unit:'states',source_files:['visual/assets/prototype-model.json'],formula:'count(OPEN,TRIAL,PAUSE,RETIRE preserving public_route_invariant)',confidence:'medium',assumptions:['A-S7-PROTOTYPE-DIMENSIONS']};
  writeJson('metrics.json', data);
}

function updateSourcesAndRights() {
  const data = readJson('sources.json');
  const records = [
    {
      id:'GENERATED-RECEIPT-PORCH-V17-DAY', publisher:'OpenAI built-in image generation', date:'2026-08-21', source_type:'ai_generated_visual',
      license:'Competition display only; subject to platform and competition terms', path:'assets/media/receipt-porch-v17-day.webp', companion_path:'assets/media/receipt-porch-v17-day.jpg',
      usage:'S7 ordinary OPEN-day architectural experience only; not a photograph, survey, field result or approval evidence.',
      limitations:'Same camera and design relationship as the V17 vector model; context, materials and people are illustrative and all dimensions require survey and professional review.',
      prompt_summary:'Edited from the V15 Receipt Porch concept to a bright ordinary OPEN day preserving the public cross, one-sided reversible bay, staffed porch, blue-green edge and rear service yard; no text or logos.'
    },
    {
      id:'GENERATED-RECEIPT-PORCH-V17-NIGHT', publisher:'OpenAI built-in image generation', date:'2026-08-21', source_type:'ai_generated_visual',
      license:'Competition display only; subject to platform and competition terms', path:'assets/media/receipt-porch-v17-night.webp', companion_path:'assets/media/receipt-porch-v17-night.jpg',
      usage:'S7 night PAUSE-state architectural experience only; not a photograph, survey, field result or approval evidence.',
      limitations:'Same camera and permanent geometry as the V17 day image; lighting and people are illustrative and do not prove operations, safety or accessibility performance.',
      prompt_summary:'Same-camera night PAUSE edit preserving the public cross and staffed porch while closing the one-sided bay with reversible boundary lights; no text or logos.'
    }
  ];
  for (const record of records) {
    const at = data.sources.findIndex(s => s.id === record.id);
    if (at >= 0) data.sources[at] = record; else data.sources.push(record);
  }
  writeJson('sources.json', data);
  const rightsRel='report/copyright_statement.md';
  let rights=readText(rightsRel);
  if(!rights.includes('GENERATED-RECEIPT-PORCH-V17-DAY')) rights += `\n- \`GENERATED-RECEIPT-PORCH-V17-DAY\` and \`GENERATED-RECEIPT-PORCH-V17-NIGHT\`: OpenAI built-in image-generation edits, 2026-08-21. Competition-display use only. They communicate a same-camera concept state and are not site photographs, measured conditions, approvals or field results.\n`;
  writeText(rightsRel,rights);
}

function updateChangelog() {
  const rel = 'changelog.md';
  let text = readText(rel);
  if (!text.includes('## 2026-08-21 · V17')) {
    text += `\n## 2026-08-21 · V17\n\n- Restored the buildable civic cross as primary evidence and demoted planning context to a verified base.\n- Established one canonical 4 m route invariant across OPEN / TRIAL / PAUSE / RETIRE.\n- Added canonical view, context, maintenance, camera, priority, stage and next-gate interfaces (schema 1.14.0).\n- Reordered both proposals around spatial conclusion, prototype, ALT decision, next gate and approved context.\n`;
    writeText(rel, text);
  }
  if (!text.includes('## 2026-08-30 · V17.2')) {
    text += `\n## 2026-08-30 · V17.2\n\n- Rebalanced the five review figures around one dominant spatial judgment and enlarged essential labels for 1024 px review.\n- Reflowed A0 and A3 without adding design claims, data, scenes or metrics.\n- Replaced the duplicated report hero and expanded the interaction assembly/state panel.\n- Enforced zero visible CJK characters across English figures, PDFs and offline HTML while retaining the licensed embedded font.\n`;
    writeText(rel, text);
  }
}

function run() {
  rebuildProposal('proposal.md','zh');
  rebuildProposal('proposal.en.md','en');
  updateStructuredData();
  updateMetrics();
  updateSourcesAndRights();
  updateChangelog();
  console.log('V17.2 canonical content and schema 1.14.0 written');
}

module.exports = {run};
if (require.main === module) run();
