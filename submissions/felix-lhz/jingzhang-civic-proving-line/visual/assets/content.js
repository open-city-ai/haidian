const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const readJson = rel => JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
const writeJson = (rel, value) => fs.writeFileSync(path.join(ROOT, rel), JSON.stringify(value, null, 2) + '\n');
const readText = rel => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const writeText = (rel, value) => fs.writeFileSync(path.join(ROOT, rel), value.replace(/\r\n/g, '\n'));

const zhIntro = `

> **可建造的公共十字 / BUILDABLE CIVIC CROSS。** 把“不牺牲公共路径”建成一段可进入、可维护、可关闭、可恢复的城市空间：公共十字和人工服务先独立成立，AI 只进入一侧可逆试验湾，所有决定留在可见的回执廊。[data:visual/assets/prototype-model.json] [data:visual/assets/spatial-decision.json]

同一建筑—地面系统包含五个可定位部分：全天公共十字、单侧试验湾、有人值守的回执廊、蓝绿边界和独立维护后场。统一模型同时生成 1:5000 城市联系、1:2000 总平面、1:500 场地与建筑平面、两道 1:200 剖面、1:50 门廊节点和三项 1:20 原型详图。尺寸均为待测绘、结构、消防、基础和耐久复核的设计假设。[data:visual/assets/prototype-model.json] [depth:three_key_area_detailed_design]

材料家族采用螺栓连接镀锌钢框架、穿孔金属遮阳屏、干式预制压重基础、透水预制铺装和可更换证据面板。永久公共层先建；可拆 AI 插件在许可齐全后装配；试验停止时设备沿独立后勤线撤出，门廊继续作为人工公共服务。[metric:architectural_prototype_count] [metric:material_system_count] [metric:architectural_detail_count]

ALT-A 因切断公共十字被 **REJECT**，ALT-B 因监督、消防与撤场碎片化被 **REVISE**，ALT-C 单侧可逆湾进入建筑深化。空间裁决只回答“为什么选择”；十二份测量契约回答“建成后如何验证”。两者均不冒充现场结果。[metric:rejected_spatial_alternative_count] [metric:revised_spatial_alternative_count] [metric:advanced_spatial_alternative_count]

**当前实施决定仍是 G0 NO-GO。** 精确测绘、权属、八类许可、四个独立岗位和连续 7 日普通服务基线尚未完成；当前关闭许可 0/8、基线 0/7 日，AI 试验不得开始。[data:visual/assets/e2-readiness.json] [metric:current_trial_open_gate_count] [metric:pending_trial_permit_count]

![总体城市设计与三座建筑地标](assets/figures/site-overview.png)

`;

const enIntro = `

> **BUILDABLE CIVIC CROSS.** Turn “do not sacrifice the public route” into an enterable, maintainable, closable and recoverable civic space. The public cross and staffed service stand alone; AI enters one reversible bay; every decision remains visible in the Receipt Porch.[data:visual/assets/prototype-model.json] [data:visual/assets/spatial-decision.json]

One architectural-ground system contains five locatable parts: the all-day public cross, one-sided trial bay, staffed Receipt Porch, blue-green edge and independent back-of-house. A single model generates 1:5000 context, 1:2000 plan, 1:500 architectural-ground plan, two 1:200 sections, a 1:50 porch node and three 1:20 prototype details. Every dimension is a design assumption pending survey, structural, fire, foundation and durability review.[data:visual/assets/prototype-model.json] [depth:three_key_area_detailed_design]

The material family uses bolted galvanized steel frames, perforated-metal sun screens, dry precast ballast, permeable precast paving and replaceable evidence panels. The permanent public layer is built first; removable AI plug-ins assemble only after permits close; after a stop, equipment leaves on an independent service route while the porch remains staffed public service.[metric:architectural_prototype_count] [metric:material_system_count] [metric:architectural_detail_count]

ALT-A is **REJECTED** for severing the public cross; ALT-B is **REVISED** because supervision, fire and removal access fragment; ALT-C advances into architectural development. The spatial decision answers “why this option”; twelve measurement contracts answer “how to verify it after construction”. Neither is field evidence.[metric:rejected_spatial_alternative_count] [metric:revised_spatial_alternative_count] [metric:advanced_spatial_alternative_count]

**The present implementation decision remains G0 NO-GO.** Precise survey, title, eight permits, four independent duty posts and seven consecutive ordinary-service days are incomplete; 0/8 permits and 0/7 days are closed, so AI trial may not begin.[data:visual/assets/e2-readiness.json] [metric:current_trial_open_gate_count] [metric:pending_trial_permit_count]

![Overall urban design and three architectural landmarks](assets/figures/site-overview.en.png)

`;

const zhArchitecture = `## 重点区域详细设计

### 建筑家族：环、门、廊

三座地标共享 **MAT-01–05** 干式材料家族和“公共基线 / AI 插件 / 证据界面”语法，却采用不可混淆的平面和剖面。[data:visual/assets/prototype-model.json]

- **众智园·验真环（T2）**：全天公共旁路围绕受控测试庭；观察廊、安全台、失败公示和东侧设备退出口在 1:500 平面与 1:200 剖面中对位。关闭测试庭后，公共外环和观察廊继续运行。
- **AI 原点·共译门（S2）**：三条无账户穿行线穿过人工双语台、等候界面和复核后台；可关闭插件墙由后勤带维护。夜间关闭插件后，静态导视和人工窗口仍成立。
- **大钟寺·回执廊（S7）**：公共十字、单侧试验湾、有人值守门廊、蓝绿边界与维护后场组成完整建筑—地面系统；公共路线、消防和撤场互不占用。

### 大钟寺旗舰样板：五级尺度

**1:5000 / 1:2000** 只判断轨道、公园、道路和四象限方向性接口；公开快照在大钟寺仅含一个建筑要素，缺测处统一标为“适配界面 / 待调查带”，不补画虚构建筑。[data:visual/assets/context-open-map.json] [source:OPENSTREETMAP-CONTEXT-20260813]

**1:500 平面**直接绘出路缘、四处坡道、两条触觉路线、透水铺装、树池、雨水花园、候车与遮阴、回执廊、双急停、控制亭、设备接口、消防线和独立撤场线。门廊后侧 2.4 米维护带连接控制、存储、维护和废弃物空间。[data:visual/assets/prototype-model.json]

**1:200 两道剖面**分别穿过公共路径—缓冲—试验湾和回执廊—公共十字—蓝绿边界，验证净高、遮阴、视线、雨水边缘和人机分离的相对关系；它们不是施工图。[metric:architectural_section_count]

**1:50 / 1:20 节点**记录三类可逆连接：螺栓钢框架与压重基础、触觉路线外侧的可拆隔离、可更换证据牌与临电接口、齐平透水路缘与雨水花园溢流。结构尺寸、防火等级、抗风、排水能力和耐久年限均待专业计算。[metric:architectural_detail_count]

### 装配、维护与四态

- **OPEN**：普通接驳、公共十字、遮阴候车和人工门廊独立运行。
- **TRIAL**：八类许可、四岗位和七日普通基线齐全后，仅开启单侧试验湾。
- **PAUSE**：双急停切断设备，安全负责人接管，公众路线保持不变。
- **RETIRE**：拆除插件和隔离，铺装抬起复位，设备沿东侧撤场，证据面板保留复盘。

90 天实施依次对应测绘核验、永久公共层、基线记录、限时插件和撤场复核；任何阶段的许可、岗位或普通服务失败都阻止进入下一阶段。数量可复算，单价与总价保持 **pending_market_quote**。[data:visual/assets/e2-readiness.json]
`;

const enArchitecture = `## Detailed Design of Key Areas

### Architectural family: Ring, Gate and Porch

The three landmarks share the dry-assembly **MAT-01–05** family and the grammar “public baseline / AI plug-in / evidence interface”, yet remain unmistakable in plan and section.[data:visual/assets/prototype-model.json]

- **Zhongzhiyuan Verification Ring (T2):** an all-day bypass surrounds the controlled test court. Observation arcade, safety desk, failure display and east equipment exit align across the 1:500 plan and 1:200 section. Closing the court leaves the public ring working.
- **AI Origin Translation Gate (S2):** three account-free passages cross the staffed bilingual desk, waiting edge and review backstage; a rear service strip maintains the closable plug-in wall. Static guidance and staffed service survive the night closure.
- **Dazhongsi Receipt Porch (S7):** the public cross, one-sided bay, staffed porch, blue-green edge and back-of-house form one architectural-ground system. Public, fire and removal routes do not occupy one another.

### Dazhongsi flagship: five scales

**1:5000 / 1:2000** establish directional relations among rail, park, roads and four quadrants only. The public crop contains one building feature at Dazhongsi; missing fabric is labelled “adaptation interface / survey-pending band”, never invented.[data:visual/assets/context-open-map.json] [source:OPENSTREETMAP-CONTEXT-20260813]

The **1:500 plan** draws kerbs, four ramps, two tactile routes, permeable paving, tree pits, rain gardens, waiting and shade, Receipt Porch, dual E-stops, control booth, equipment interfaces, fire route and independent removal line. A 2.4 m rear maintenance strip connects control, storage, maintenance and waste.[data:visual/assets/prototype-model.json]

Two **1:200 sections** cut public route—buffer—trial bay and Receipt Porch—public cross—blue-green edge, checking relative clear height, shade, sightline, drainage edge and human-machine separation. They are not construction drawings.[metric:architectural_section_count]

The **1:50 / 1:20 details** record reversible connections: bolted frame on ballast, removable boundary outside the tactile route, replaceable evidence rail and temporary power, and a flush permeable kerb with rain-garden overflow. Structural sizes, fire rating, wind, drainage capacity and durability await professional calculation.[metric:architectural_detail_count]

### Assembly, maintenance and four states

- **OPEN**: ordinary feeder, public cross, shaded waiting and staffed porch work independently.
- **TRIAL**: after eight permits, four posts and seven baseline days close, only the one-sided bay opens.
- **PAUSE**: dual E-stops isolate equipment; the safety lead takes over; the public route does not move.
- **RETIRE**: plug-ins and boundary leave, lifted paving is relaid, equipment exits east and evidence panels remain for review.

The 90-day sequence maps survey, permanent public layer, baseline record, timed plug-in and removal review to drawn components. Any failed permit, post or ordinary service blocks the next stage. Quantities are reproducible; prices remain **pending_market_quote**.[data:visual/assets/e2-readiness.json]
`;

function replaceIntro(text, intro) {
  const marker = '<!-- V11_DECISION_START -->';
  const idx = text.indexOf(marker);
  if (idx < 0) throw new Error('Decision marker missing');
  const h1 = text.match(/^# .+$/m);
  if (!h1) throw new Error('H1 missing');
  const headEnd = h1.index + h1[0].length;
  return text.slice(0, headEnd + 1) + intro + text.slice(idx);
}

function replaceSection(text, start, end, replacement) {
  const a = text.indexOf(start);
  const b = text.indexOf(end, a + start.length);
  if (a < 0 || b < 0) throw new Error(`Section boundary missing: ${start} / ${end}`);
  return text.slice(0, a) + replacement.trim() + '\n\n' + text.slice(b);
}

function updateProposal(rel, lang) {
  let text = readText(rel);
  text = text.replace(/^summary: ".*"$/m, lang === 'zh'
    ? 'summary: "把不牺牲公共路径建成可进入、可维护、可关闭、可恢复的公共十字；当前实施门仍为G0 NO-GO。"'
    : 'summary: "Build the unbroken public route as an enterable, maintainable, closable and recoverable civic cross; the current implementation gate remains G0 NO-GO."');
  text = replaceIntro(text, lang === 'zh' ? zhIntro : enIntro);
  text = replaceSection(text,
    lang === 'zh' ? '## 重点区域详细设计' : '## Detailed Design of Key Areas',
    lang === 'zh' ? '## AI 创新生态、人才画像与 AI+ 场景' : '## AI Innovation Ecosystem, Personas, and AI+ Scenarios',
    lang === 'zh' ? zhArchitecture : enArchitecture);
  text = text.replaceAll('visual/assets/v14-spatial-model.json', 'visual/assets/prototype-model.json');
  text = text.replaceAll('V14 不虚构', 'V15 不虚构').replaceAll('V14 therefore', 'V15 therefore');
  writeText(rel, text);
}

function updateReadiness() {
  const data = readJson('visual/assets/e2-readiness.json');
  data.schema_version = '1.12.0';
  data.dataset_id = 'jingzhang-v15-buildable-civic-cross-g0';
  data.title = {zh:'V15 可建造公共十字 G0 准入门',en:'V15 Buildable Civic Cross G0 Gate'};
  data.prototype_readiness = 'design_documented_trial_not_admitted';
  data.field_status = 'not_field_run';
  data.readiness_gate = {...(data.readiness_gate||{}), gate_id:'G0-S7-PRETRIAL', decision:'no_go', closed_permit_count:0, required_permit_count:8, recorded_baseline_days:0, required_baseline_days:7, contracted_independent_role_count:0, required_independent_role_count:4};
  writeJson('visual/assets/e2-readiness.json', data);
}

function updateMetrics() {
  const data = readJson('metrics.json');
  data.metrics.public_space_ratio.value = 0.02892;
  data.metrics.architectural_prototype_count = {status:'known',value:3,unit:'count',source_files:['visual/assets/prototype-model.json'],formula:'count(architectural_prototypes)',confidence:'high',assumptions:[]};
  data.metrics.material_system_count = {status:'known',value:5,unit:'count',source_files:['visual/assets/prototype-model.json'],formula:'count(material_palette)',confidence:'high',assumptions:[]};
  data.metrics.architectural_section_count = {status:'known',value:4,unit:'count',source_files:['visual/assets/prototype-model.json'],formula:'count(section_refs across three prototypes)',confidence:'high',assumptions:[]};
  data.metrics.architectural_detail_count = {status:'known',value:5,unit:'count',source_files:['visual/assets/prototype-model.json'],formula:'count(detail_refs across three prototypes)',confidence:'high',assumptions:[]};
  data.metrics.current_trial_open_gate_count = {status:'known',value:0,unit:'count',source_files:['visual/assets/e2-readiness.json'],formula:'count(readiness gates permitting TRIAL)',confidence:'high',assumptions:[]};
  data.metrics.pending_trial_permit_count = {status:'known',value:8,unit:'count',source_files:['visual/assets/e2-readiness.json'],formula:'count(pending permit gates)',confidence:'high',assumptions:[]};
  writeJson('metrics.json', data);
}

function updateStructuredData() {
  const model = readJson('visual/assets/prototype-model.json');
  const atlas = readJson('visual/assets/spatial-atlas.json');
  atlas.schema_version = '1.12.0';
  delete atlas.v14_spatial_model_ref;
  atlas.prototype_model_ref = 'visual/assets/prototype-model.json';
  atlas.architectural_prototypes = model.architectural_prototypes;
  atlas.current_implementation_gate = 'G0_no_go_pending_survey_and_permits';
  writeJson('visual/assets/spatial-atlas.json', atlas);
  const scenes = readJson('visual/assets/two-answers.json');
  scenes.schema_version = '1.12.0';
  delete scenes.v14_spatial_model_ref;
  scenes.prototype_model_ref = 'visual/assets/prototype-model.json';
  scenes.current_implementation_gate = 'G0_no_go_pending_survey_and_permits';
  for (const scene of scenes.scenarios) {
    scene.field_status = 'not_field_run';
    scene.architectural_prototype_ref = scene.id === 'SCN-002' ? 'LMK-01' : scene.id === 'SCN-005' ? 'LMK-02' : scene.id === 'SCN-010' ? 'LMK-03' : scene.architectural_prototype_ref || null;
  }
  writeJson('visual/assets/two-answers.json', scenes);
}

function updateChangelog() {
  let text = readText('changelog.md');
  if (!text.includes('## V15 - 可建造的公共十字')) text = text.replace(/^(# .*\n)/, `$1
## V15 - 可建造的公共十字

- 将 ALT-C 深化为公共十字、单侧试验湾、回执廊、蓝绿边界和维护后场组成的建筑—地面系统。
- 三座地标补齐 1:500 平面、1:200 剖面、装配和关闭状态，形成环、门、廊建筑家族。
- 新增 1:50 与 1:20 可逆节点及五类材料系统；结构、消防、基础、耐久和报价继续待专业复核。
- 五张核心图、A0/A3和交互展由统一 V15 模型生成；当前准入仍为 G0 NO-GO，现场绩效未知。

`);
  writeText('changelog.md', text);
}

function updateRights() {
  const data = readJson('sources.json');
  const generated = [
    {
      id:'GENERATED-VERIFICATION-RING-V15',path:'assets/media/verification-ring-v15.webp',companion_path:'assets/media/verification-ring-v15.jpg',
      usage:'T2 architectural experience communication only; not a photograph, survey, field result or approval evidence.',
      limitations:'Follows the V15 outer public bypass, controlled inner court, observation arcade and separate equipment exit; all dimensions and context require survey and professional review.',
      prompt_summary:'Photorealistic concept view of an oval verification ring with an all-day accessible outer bypass, controlled robot court, shaded observation arcade, staffed safety threshold, failure display and separate equipment exit; bolted galvanized steel and perforated screens; no text or logos.'
    },
    {
      id:'GENERATED-TRANSLATION-GATE-V15',path:'assets/media/translation-gate-v15.webp',companion_path:'assets/media/translation-gate-v15.jpg',
      usage:'S2 architectural experience communication only; not a photograph, survey, field result or approval evidence.',
      limitations:'Follows the V15 three account-free passages, staffed bilingual desk, review backstage, closable plug-in wall and rear service strip; all dimensions and context require survey and professional review.',
      prompt_summary:'Photorealistic concept view of a porous translation hall with three account-free passages, staffed bilingual desk, accessible waiting, human review backstage, closable amber plug-in wall and independent rear service strip; no text or logos.'
    },
    {
      id:'GENERATED-RECEIPT-PORCH-V15',path:'assets/media/receipt-porch-v15.webp',companion_path:'assets/media/receipt-porch-v15.jpg',
      usage:'S7 architectural experience communication only; not a photograph, survey, field result or approval evidence.',
      limitations:'Follows the V15 public cross, one-sided reversible trial bay, staffed Receipt Porch, blue-green edge and back-of-house; all dimensions and context require survey and professional review.',
      prompt_summary:'Photorealistic elevated concept view of a buildable civic cross with continuous accessible paths, one-sided trial bay, staffed Receipt Porch, rain gardens, shade, dual E-stops and separate back-of-house/removal access; no text or logos.'
    }
  ].map(x=>({publisher:'OpenAI built-in image generation',date:'2026-08-21',source_type:'ai_generated_visual',license:'Competition display only; subject to platform and competition terms',...x}));
  data.sources = data.sources.filter(x=>!generated.some(y=>y.id===x.id)&&!/-V14$/.test(x.id));
  data.sources.push(...generated);
  writeJson('sources.json', data);
  const rel='report/copyright_statement.md';
  let text=readText(rel).replace(/\n- \*\*V14 project-bound experience views\.\*\*[\s\S]*?(?=\n- \*\*|\n##|$)/,'');
  const block=`

## V15 concept-generated architectural experience images

- assets/media/verification-ring-v15.webp / .jpg
- assets/media/translation-gate-v15.webp / .jpg
- assets/media/receipt-porch-v15.webp / .jpg

Generated with OpenAI built-in image generation on 2026-08-21. They communicate the Ring, Gate and Porch architectural prototypes only and are not site photographs, surveys, field evidence, consultation records or approvals. Text, dimensions, IDs and evidence status are added by local vector layers; professional judgement relies on the plans, sections, structured data and cited public sources.
`;
  if(!text.includes('## V15 concept-generated architectural experience images')) text+=block;
  writeText(rel,text);
}

const V16_CONTEXT = {
  context_id: 'OFFICIAL-CONTEXT-202608',
  schema_version: '1.13.0',
  title: {zh:'已批空间结构与京张双答运营叠加层',en:'Approved spatial structure and Jing-Zhang operating overlay'},
  published_date: '2026-08-12',
  context_status: 'approved_context',
  official_context_update: {
    planning_area_ha: 1668.2,
    green_belt_length_km: 9,
    published_structure: {zh:'一带一轴、两心多点',en:'one belt, one axis, two centres and multiple nodes'},
    dazhongsi_role: {zh:'已公布的大钟寺中心',en:'published Dazhongsi centre'},
    phase_two_status: {zh:'配套工程完工并报道近期开放',en:'supporting works completed and reported recently open'},
    slow_mobility_pattern: {zh:'鱼骨状慢行联系',en:'fishbone slow-mobility connections'},
    sources: ['BEIJING-BLOCK-PLAN-APPROVED-20260812','BEIJING-JZ-PHASE2-COMPLETE-20260714','BEIJING-JZ-PUBLIC-USE-20260730']
  },
  planning_reconciliation: [
    {layer:'existing_published',meaning:{zh:'公开报道的现状公共路径、二期完成状态与公共使用',en:'published public paths, Phase II completion and reported public use'},legal_limit:{zh:'不是本团队踏勘、测绘或验收',en:'not participant fieldwork, survey or acceptance'}},
    {layer:'approved_context',meaning:{zh:'1668.2公顷街区层面结构、9公里绿带和大钟寺中心',en:'1,668.2 ha block-level structure, 9 km green belt and Dazhongsi centre'},legal_limit:{zh:'不替代精确红线、地块控制或产权',en:'does not replace exact redlines, parcel controls or title'}},
    {layer:'design_proposal',meaning:{zh:'一脊三站两翼运营层、回执廊和可逆试验湾',en:'spine/stations/wings operating layer, Receipt Porch and reversible bay'},legal_limit:{zh:'概念建议，待专业深化',en:'concept proposal pending professional development'}},
    {layer:'unknown',meaning:{zh:'测绘、产权、管线、许可、报价和现场绩效',en:'survey, title, utilities, permits, quote and field performance'},legal_limit:{zh:'不得由图面推定',en:'must not be inferred from drawings'}}
  ],
  submission_overlay: {area_sqm:11412825.386,status:'design_proposal',geometry_ref:'geometry/site_boundary.geojson',note:{zh:'11.4平方公里临时投稿几何，仅用于可复算与概念组织',en:'11.4 sq km provisional submission geometry for recomputation and concept organisation only'}},
  visual_evidence_role: 'planning_reconciliation_and_operating_overlay',
  supersedes_assumption_ref: 'V15_CONTEXT_TREATED_AS_MISSING'
};

const V16_EXCHANGES = [
  ['北纬社区','Beiwei community','居民日常问题与无障碍基线','resident daily problems and accessibility baseline','小月河翼 / S4–S6','Xiaoyuehe wing / S4–S6'],
  ['未来科学城','Future Science City','研究任务与开放模型能力','research tasks and open-model capability','验真环 / T1','Verification Ring / T1'],
  ['怀柔科学城','Huairou Science City','仪器、实验条件与复现记录','instruments, experimental conditions and reproduction records','验真环 / T1–T3','Verification Ring / T1–T3'],
  ['北京经开区','Beijing E-Town','制造、设备安全与维护能力','manufacturing, device safety and maintenance capability','回执廊 / S7','Receipt Porch / S7'],
  ['京津冀协同接口','Jing-Jin-Ji interface','跨区域问题、算力与知识复用','cross-regional problems, compute and knowledge reuse','共译门 / S1–S3','Translation Gate / S1–S3']
].map((r,i)=>({contract_id:`XCH-${String(i+1).padStart(2,'0')}`,partner_role:{zh:r[0],en:r[1]},problem_input:{zh:r[2],en:r[3]},validation_place:{zh:r[4],en:r[5]},evidence_product:{zh:'输入版本、许可、失败原因、回执与可复用方法',en:'versioned input, permit, failure reason, receipt and reusable method'},owner_roles:['problem_owner','capability_provider','site_operator','evidence_steward'],failure_exit:{zh:'任一许可、数据权利或公共基线不成立即退回普通服务并停止交换',en:'any failed permit, data right or public baseline returns to ordinary service and stops exchange'}}));

const V16_CULTURE = [
  ['CUL-01','铁轨','rail','历史线路事实','route history'],['CUL-02','龙门吊','gantry crane','工业遗存事实','industrial-remnant history'],['CUL-03','窄轨','narrow gauge','工程文化事实','engineering culture'],['CUL-04','汽笛','whistle','声音记忆事实','sound-memory history'],['CUL-05','铁轨花园','rail garden','公共空间转译','public-space translation']
].map(r=>({component_id:r[0],published_resource:{zh:r[1],en:r[2]},heritage_fact:{zh:r[3],en:r[4]},public_interpretation:{zh:'静态双语、触觉和无手机讲解先成立',en:'static bilingual, tactile and phone-free interpretation first'},ai_optional_enhancement:{zh:'可选扩展讲解，来源与不确定性可见',en:'optional extended interpretation with visible sources and uncertainty'},correction_receipt:{zh:'公众可纠错；人工复核后保留版本与日期',en:'public correction; staff review preserves version and date'},geometry_availability:'published_resource_location_to_be_verified'}));

const V16_OPEN_DAY = {
  program_id:'OPS-ORDINARY-OPEN-DAY',
  title:{zh:'普通开放日运营总图',en:'Ordinary Open Day operating plan'},
  published_public_use:'reported_by_government_portal_not_participant_observation',
  steps:[
    ['08:00','OPEN','普通路径、无障碍、人工台与静态导视检查','public route, access, staffed desk and static guide check'],
    ['09:00','BASELINE','常规接驳、候车、遮阴与申诉独立运行','ordinary feeder, waiting, shade and appeal operate independently'],
    ['13:00','TRIAL_GATE','只核验开发者许可、岗位和普通基线；不满足则不开试验','check developer permits, posts and baseline only; no trial if incomplete'],
    ['16:00','PUBLIC_REVIEW','公布状态、失败、人工干预和未知项','publish state, failures, staff interventions and unknowns'],
    ['18:00','CLOSE','插件停机、场地复位、人工复核与知识归档','stop plug-ins, restore space, staff review and archive knowledge']
  ].map(r=>({time:r[0],state:r[1],action:{zh:r[2],en:r[3]},owner_roles:['site_lead','baseline_service','safety_lead','data_steward'],failure_exit:'PAUSE_to_OPEN'})),
  annual_program:[
    {season:'spring',knowledge_asset:'baseline_accessibility_audit'},
    {season:'summer',knowledge_asset:'capability_reproduction_record'},
    {season:'autumn',knowledge_asset:'public_trial_receipt_set'},
    {season:'winter',knowledge_asset:'annual_asset_and_exit_review'}
  ],
  field_status:'not_field_run'
};

function upsertSource(data, source) {
  data.sources = data.sources.filter(x => x.id !== source.id);
  data.sources.push(source);
}

function addV16Proposal(rel, lang) {
  let text = readText(rel);
  const zh = lang === 'zh';
  const intro = zh ? `

> **在已批空间结构上建立城市采纳层。** 2026年8月公开的街区控规背景明确约1668.2公顷、9公里京张绿带与“**一带一轴、两心多点**”，大钟寺被列为两处中心之一；二期配套工程已完工并形成鱼骨状慢行联系。[source:BEIJING-BLOCK-PLAN-APPROVED-20260812] [source:BEIJING-JZ-PHASE2-COMPLETE-20260714]

“一脊三站两翼”因此不再冒充另一套控规，而是嵌入京张绿带、对接大钟寺中心与创新发展轴的 **可选择、可停止、可撤除运营叠加层**。官方1668.2公顷街区范围与本投稿11.4平方公里临时几何分别登记，绝不互换。[data:visual/assets/spatial-atlas.json] [metric:official_planning_area_ha] [metric:submitted_provisional_area_sqm]

大钟寺回执廊适配“既有公园—轨道方向性接口—城市更新界面”，当前仍为 **G0 NO-GO**：已公布空间背景不等于本方案完成测绘、权属、许可、搭建或现场运行。政府门户报道的公共使用是公开背景，不是本团队踏勘。[data:visual/assets/e2-readiness.json]

![已批空间结构与京张双答运营叠加层](assets/figures/site-overview.png)

![已批规划背景下的连续首层、公共服务与临时试验界面](assets/figures/land-use-structure.png)

` : `

> **Build a civic-adoption layer on the approved spatial structure.** Public information released in August 2026 identifies an approximately 1,668.2 ha block-plan context, a 9 km Jing-Zhang green belt and “**one belt, one axis, two centres and multiple nodes**”, with Dazhongsi as one of the two centres. Phase II supporting works are complete and form a fishbone slow-mobility network.[source:BEIJING-BLOCK-PLAN-APPROVED-20260812] [source:BEIJING-JZ-PHASE2-COMPLETE-20260714]

“One spine, three stations and two wings” is therefore not a competing statutory plan. It is a **selectable, stoppable and removable operating overlay** embedded in the Jing-Zhang green belt and aligned with Dazhongsi centre and the innovation axis. The official 1,668.2 ha context and the 11.4 sq km provisional submission geometry are registered separately and never substituted.[data:visual/assets/spatial-atlas.json] [metric:official_planning_area_ha] [metric:submitted_provisional_area_sqm]

The Dazhongsi Receipt Porch adapts between the existing park, a directional rail interface and an urban-renewal frontage. It remains **G0 NO-GO**: published context is not survey, title, permit, construction or field operation by this proposal. Government-reported public use is context, not participant observation.[data:visual/assets/e2-readiness.json]

![Approved spatial structure and Jing-Zhang operating overlay](assets/figures/site-overview.en.png)

![Continuous ground interface of approved context, public service and timed trial](assets/figures/land-use-structure.en.png)

`;
  text = replaceIntro(text, intro);
  const exchange = zh ? `## 统筹研究范围产业与未来城市研究

五条交换合同把区域协同从泛化连线改成可失败的证据交换：北纬社区提供居民问题与无障碍基线；未来科学城提供研究任务与开放模型能力；怀柔科学城提供仪器和复现条件；经开区提供制造、设备安全和维护接口；京津冀接口承接跨区域问题、算力与知识复用。每条合同都记录问题输入、能力提供、验证场所、证据产品、四类责任角色和失败出口；机构仅为建议角色，不代表合作承诺。[data:visual/assets/spatial-atlas.json]

验证场所分别落在小月河翼、验真环、共译门和回执廊。任一许可、数据权利或普通基线不成立，交换立即停止并退回普通服务；成功与失败均进入公共知识库。` : `## Coordinated Research Area: Industry and Future City Research

Five exchange contracts replace generic regional arrows with fallible evidence exchange. Beiwei community supplies resident problems and accessibility baselines; Future Science City supplies research tasks and open-model capability; Huairou Science City supplies instruments and reproduction conditions; Beijing E-Town supplies manufacturing, device-safety and maintenance interfaces; the Jing-Jin-Ji interface carries cross-regional problems, compute and knowledge reuse. Each contract records problem input, capability, validation place, evidence product, four owner roles and a failure exit. Institutions are proposed roles, not partnership claims.[data:visual/assets/spatial-atlas.json]

Validation places are the Xiaoyuehe wing, Verification Ring, Translation Gate and Receipt Porch. Any failed permit, data right or ordinary baseline stops exchange and returns to ordinary service; both success and failure enter the public knowledge base.`;
  text = replaceSection(text, zh?'## 统筹研究范围产业与未来城市研究':'## Coordinated Research Area: Industry and Future City Research', zh?'## 总体设计范围城市更新与控规深度城市设计':'## Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design', exchange);
  const culture = zh ? `### 三座回执地标、文化里程与国际传播

文化里程以公开资料中的铁轨、龙门吊、窄轨、汽笛和铁轨花园建立五类构件目录。每项遵循“历史事实—静态双语/触觉/无手机讲解—AI可选增强—公众纠错—人工复核回执”；AI不得改写来源不明的历史，也不虚构资源精确位置。[data:visual/assets/spatial-atlas.json]

验真环、共译门、回执廊共享遗产石墨、公共绿色、AI琥珀和证据蓝，但不共享轮廓。荣誉界面只登记任务、证据等级、决定、复核日期和贡献者，不设未经证明的技术排行榜。` : `### Three receipt landmarks, the evidence mile and international communication

The evidence mile turns the published rail, gantry crane, narrow gauge, whistle and rail-garden resources into five component types. Each follows “heritage fact—static bilingual/tactile/phone-free interpretation—optional AI enhancement—public correction—staff-reviewed receipt”. AI may not rewrite unsourced history or invent exact resource locations.[data:visual/assets/spatial-atlas.json]

Verification Ring, Translation Gate and Receipt Porch share heritage graphite, public green, AI amber and evidence blue, but not silhouettes. The honour interface records only task, evidence tier, decision, review date and contributor; it never becomes an unverified technology leaderboard.`;
  text = replaceSection(text, zh?'### 三座回执地标、文化里程与国际传播':'### Three receipt landmarks, the evidence mile and international communication', zh?'### 产业生态、人才与未来城市研究':'### Industry, talent and future-city programme', culture);
  const ops = zh ? `## 一带全球 AI 创新活动体系与长期运营设计

“普通开放日”先运行公共路径、无障碍、常规接驳、遮阴候车、人工服务和静态导视，再核验开发者许可、独立岗位与普通基线。上午开放检查与基线记录；中午只做准入核验；下午公开状态、失败和人工干预；闭场后插件停机、空间复位、人工复核并归档。任何缺项都保持 OPEN，不进入 TRIAL。[data:visual/assets/two-answers.json]

城市采纳年每季产生一种可复用知识资产：春季无障碍基线审计、夏季能力复现记录、秋季公众试用回执、冬季资产与退出复盘。公开报道的日常使用仅作为背景，不是本方案已完成公众参与或现场绩效。[source:BEIJING-JZ-PUBLIC-USE-20260730]` : `## Global AI Innovation Programme and Long-Term Operation

An “Ordinary Open Day” runs public routes, accessibility, ordinary feeder, shaded waiting, staffed service and static guidance first, then checks developer permits, independent posts and the ordinary baseline. Morning opens and records the baseline; midday checks admission only; afternoon publishes state, failure and staff intervention; closing stops plug-ins, restores space, reviews manually and archives. Any missing item holds OPEN and blocks TRIAL.[data:visual/assets/two-answers.json]

Each Civic Adoption Year season produces one reusable knowledge asset: spring accessibility audit, summer capability reproduction record, autumn public-trial receipt set, and winter asset-and-exit review. Government-reported daily use is background, not public participation or field performance completed by this proposal.[source:BEIJING-JZ-PUBLIC-USE-20260730]`;
  text = replaceSection(text, zh?'## 一带全球 AI 创新活动体系与长期运营设计':'## Global AI Innovation Programme and Long-Term Operation', zh?'## 更新项目清单、实施政策与分期计划':'## Renewal Projects, Implementation Policy, and Phasing', ops);
  text = text.replaceAll('V15 不虚构','V16 不虚构').replaceAll('V15 therefore','V16 therefore');
  writeText(rel,text);
}

function updateV16() {
  const model=readJson('visual/assets/prototype-model.json');
  const atlas=readJson('visual/assets/spatial-atlas.json');
  const scenes=readJson('visual/assets/two-answers.json');
  model.schema_version=atlas.schema_version=scenes.schema_version='1.13.0';
  atlas.official_context_update=V16_CONTEXT;
  atlas.exchange_contracts=V16_EXCHANGES;
  atlas.cultural_components=V16_CULTURE;
  atlas.interface_status=['existing_published','approved_context','design_proposal','unknown'];
  atlas.planning_reconciliation=V16_CONTEXT.planning_reconciliation;
  scenes.official_context_update=V16_CONTEXT;
  scenes.ordinary_open_day=V16_OPEN_DAY;
  scenes.planning_reconciliation=V16_CONTEXT.planning_reconciliation;
  writeJson('visual/assets/prototype-model.json',model);
  writeJson('visual/assets/spatial-atlas.json',atlas);
  writeJson('visual/assets/two-answers.json',scenes);
  const metrics=readJson('metrics.json');
  metrics.metrics.official_planning_area_ha={status:'known',value:1668.2,unit:'ha',source_files:['sources.json','visual/assets/spatial-atlas.json'],formula:'published figure; not recomputed from submitted geometry',confidence:'high',assumptions:[]};
  metrics.metrics.official_green_belt_length_km={status:'known',value:9,unit:'km',source_files:['sources.json','visual/assets/spatial-atlas.json'],formula:'published figure',confidence:'high',assumptions:[]};
  metrics.metrics.submitted_provisional_area_sqm={status:'known',value:11412825.386,unit:'sqm',source_files:['geometry/site_boundary.geojson'],formula:'polygon_area(submitted provisional geometry)',confidence:'medium',assumptions:['A-BOUNDARY-001']};
  metrics.metrics.exchange_contract_count={status:'known',value:5,unit:'count',source_files:['visual/assets/spatial-atlas.json'],formula:'count(exchange_contracts)',confidence:'high',assumptions:[]};
  metrics.metrics.cultural_component_count={status:'known',value:5,unit:'count',source_files:['visual/assets/spatial-atlas.json'],formula:'count(cultural_components)',confidence:'high',assumptions:[]};
  metrics.metrics.ordinary_open_day_step_count={status:'known',value:5,unit:'count',source_files:['visual/assets/two-answers.json'],formula:'count(ordinary_open_day.steps)',confidence:'high',assumptions:[]};
  writeJson('metrics.json',metrics);
  const sources=readJson('sources.json');
  upsertSource(sources,{id:'BEIJING-BLOCK-PLAN-APPROVED-20260812',publisher:'北京市人民政府门户网站',date:'2026-08-12',url:'https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/202608/t20260812_4819212.html',source_type:'official_public',license:'Public information; quotation subject to publisher terms',usage:'Published 1,668.2 ha block-plan context, 9 km green belt, one-belt/one-axis/two-centres/multiple-nodes structure and Dazhongsi centre.',limitations:'Published planning context only; no exact redline, parcel control, title, survey or field-performance evidence.'});
  upsertSource(sources,{id:'BEIJING-JZ-PHASE2-COMPLETE-20260714',publisher:'北京市园林绿化局',date:'2026-07-14',url:'https://yllhj.beijing.gov.cn/zwgk/zwxx/202607/t20260714_4761226.shtml',source_type:'official_public',license:'Public information; quotation subject to publisher terms',usage:'Published completion status of Phase II supporting works, approximately 30.01 ha north section and fishbone slow-mobility connections.',limitations:'Does not prove participant survey, construction acceptance of this proposal, or exact interfaces for design components.'});
  upsertSource(sources,{id:'BEIJING-JZ-PUBLIC-USE-20260730',publisher:'北京市人民政府门户网站',date:'2026-07-30',url:'https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/202607/t20260730_4799453.html',source_type:'official_public',license:'Public information; quotation subject to publisher terms',usage:'Published context on reported everyday public use and surrounding communities.',limitations:'Third-party published report only; not participant fieldwork, consultation, traffic count or satisfaction evidence.'});
  upsertSource(sources,{id:'BEIJING-HD-BLOCK-PLAN-PARTICIPATION-20250207',publisher:'北京市规划和自然资源委员会',date:'2025-02-07',url:'https://ghzrzyw.beijing.gov.cn/chengxiangguihua/ghlgg/hd_ghlgg/202502/t20250207_4005553.html',source_type:'official_public',license:'Public information; quotation subject to publisher terms',usage:'Planning public-participation background and process context.',limitations:'Does not establish final parcel boundaries or participant-specific approval.'});
  upsertSource(sources,{id:'LANJINGLI-RENEWAL-20260612',publisher:'北京市规划和自然资源委员会',date:'2026-06-12',url:'https://ghzrzyw.beijing.gov.cn/zhengwuxinxi/zxzt/csgx/csgxfjszt/fjsztalzs/202606/t20260612_4698370.html',source_type:'official_public',license:'Public information; quotation subject to publisher terms',usage:'Published urban-renewal interface context near the corridor.',limitations:'Context only; no partnership, title, exact fit or implementation commitment is claimed.'});
  writeJson('sources.json',sources);
  addV16Proposal('proposal.md','zh');
  addV16Proposal('proposal.en.md','en');
  let log=readText('changelog.md');
  if(!log.includes('## V16 - 在已批空间结构上建立城市采纳层')) log=log.replace(/^(# .*\n)/,`$1## V16 - 在已批空间结构上建立城市采纳层\n\n- 登记2026年公布的1668.2公顷街区背景、9公里绿带、“一带一轴、两心多点”、大钟寺中心与二期完工状态。\n- 将一脊三站两翼降为运营叠加层，明确官方街区范围与11.4平方公里临时投稿几何不可互换。\n- 将Agent 2/5/6补强为五条交换合同、五类文化构件、普通开放日及四季知识资产。\n- 四种图面状态固定为 existing_published / approved_context / design_proposal / unknown；现场绩效继续未知。\n\n`);
  writeText('changelog.md',log);
}

function run() {
  updateReadiness();
  updateMetrics();
  updateStructuredData();
  updateProposal('proposal.md', 'zh');
  updateProposal('proposal.en.md', 'en');
  updateChangelog();
  updateRights();
  updateV16();
  console.log('V16 approved-context alignment, structured evidence and G0 NO-GO content written');
}

module.exports = {run};
if (require.main === module) run();
