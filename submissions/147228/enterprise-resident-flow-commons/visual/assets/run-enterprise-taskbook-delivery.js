const fs = require('fs');
const path = require('path');

const here = __dirname;
const packageDir = path.resolve(here, '..', '..');
const figureDir = path.join(packageDir, 'assets', 'figures');
const atlas = JSON.parse(fs.readFileSync(path.join(here, 'enterprise-taskbook-delivery.json'), 'utf8'));
const pilot = JSON.parse(fs.readFileSync(path.join(here, 'p0-pilot-evidence-pack.json'), 'utf8'));

const fail = (message) => { throw new Error(`enterprise taskbook delivery: ${message}`); };
const exact = (actual, expected, label) => {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) fail(`${label} mismatch`);
};

if (atlas.status !== 'conceptual_outputs_for_professional_refinement') fail('atlas status must remain conceptual');
if (atlas.identity.short_mark !== 'F↔C') fail('identity mark mismatch');
if (atlas.positioning.length !== 3 || atlas.functions.length !== 5) fail('expected three positions and five functions');
if (atlas.three_areas_two_wings.length !== 5) fail('expected three areas and two wings');
if (atlas.ecosystem_resources.length !== 8 || new Set(atlas.ecosystem_resources).size !== 8) fail('expected eight unique ecosystem resources');
if (atlas.global_cases.length !== 6) fail('expected six global cases');
if (atlas.global_cases.some((item) => !item.source_ids || item.source_ids.length === 0)) fail('every case needs a source');
if (atlas.landmarks.length < 3 || atlas.annual_operations.length !== 4) fail('landmark or annual-operation count mismatch');
exact(atlas.task_outputs.map((item) => item.id), ['agent.1', 'agent.2', 'agent.3', 'agent.4', 'agent.5', 'agent.6'], 'task IDs');

if (pilot.status !== 'template_ready_field_work_not_run' || pilot.decision !== 'HOLD') fail('P0 pack must remain HOLD and not run');
if (pilot.evidence_streams.length !== 7 || pilot.raci.length !== 5 || pilot.release_gates.length !== 5) fail('P0 pack count mismatch');
if (pilot.evidence_streams.some((item) => item.current_records !== 0)) fail('field records must remain zero');
if (pilot.raci.some((item) => item.confirmation !== 'unassigned')) fail('RACI must remain unassigned');
if (pilot.release_gates.some((item) => item.state !== 'HOLD')) fail('all release gates must remain HOLD');
if (pilot.calibration_contract.field_runs !== 0 || pilot.calibration_contract.calibrated_parameters !== 0 || pilot.calibration_contract.performance_results !== null) fail('calibration must remain not run');
if (pilot.current_readout.operational_status !== 'not_authorized_not_run') fail('operational status mismatch');

const C = {
  navy: '#0B263D', navy2: '#123A50', ink: '#173047', muted: '#617487',
  paper: '#F5F1E9', white: '#FFFFFF', line: '#D8E3E7', teal: '#29BFA8',
  coral: '#F17457', gold: '#F0C769', violet: '#777AF2', pale: '#EAF5F3', hold: '#4A3034'
};
const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[char]));
const text = (x, y, value, size=22, fill=C.ink, weight=500, anchor='start') => `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}" text-anchor="${anchor}">${esc(value)}</text>`;
const rect = (x, y, w, h, fill=C.white, rx=18, stroke='none', sw=0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const line = (x1, y1, x2, y2, stroke=C.line, sw=2, dash='') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}" ${dash ? `stroke-dasharray="${dash}"` : ''}/>`;
const pill = (x, y, w, label, fill=C.pale, color=C.teal) => rect(x,y,w,34,fill,17) + text(x+w/2,y+23,label,14,color,800,'middle');
const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1200" viewBox="0 0 1800 1200"><style>text{font-family:Arial,"PingFang SC","Hiragino Sans GB",sans-serif}</style>${body}</svg>\n`;

function taskbookBoard(language) {
  const zh = language === 'zh';
  const pick = (item, key='') => item[`${key}${zh ? 'zh' : 'en'}`] ?? item[zh ? 'zh' : 'en'];
  const positionSummariesEn = [
    'Questions and repairs become a correctable archive',
    'Human entry, public return and exit stay visible',
    'Mobility, equity, responsibility and withdrawal gates'
  ];
  const caseTransfersEn = [
    'mobility status card + complaint route',
    'human equivalent + appeal + stop state',
    'model card + takeover drill + withdrawal receipt',
    'paper + phone + walk-in feedback + readback',
    'nine-field public preflight for every window',
    'real problem → pilot receipt → follow-through'
  ];
  const caseLimitsEn = [
    'register ≠ safety, access or consent',
    'foreign register ≠ local compliance',
    'test tool ≠ certification or permission',
    'digital access ≠ device-free access',
    'UK standard ≠ Beijing statutory rule',
    'no partnership, funding or equal mandate'
  ];
  const landmarkSummariesEn = [
    'one question · source · ordinary route · removal',
    'developer contribution ↔ resident question + help',
    'capacity · return · owner · pause · restoration'
  ];
  const taskOutputsEn = [
    ['identity', 'positioning', 'functions'],
    ['global cases', 'ecosystem resources', 'industry-space mapping'],
    ['ten scenario cards', 'three industry tests', 'eight participant groups'],
    ['three landmark interfaces', 'public-route rules', 'honor / correct / remove'],
    ['culture story', 'five-layer signage', 'international copy'],
    ['four-quarter operations', 'developer-to-pilot path', 'review + retirement loop']
  ];
  let s = rect(0,0,1800,1200,C.paper,0);
  s += rect(0,0,1800,150,C.navy,0);
  s += text(60,50,'FLOW COMMONS / TASKBOOK DELIVERY / v2.5',18,'#77E7D3',800);
  s += text(60,100,zh ? atlas.title_zh : atlas.title_en,42,C.white,800);
  s += pill(1495,42,245,zh ? '概念成果 · 非承诺' : 'CONCEPT · NO COMMITMENT',C.hold,'#FFB29F');
  s += text(1740,124,zh ? '六项任务有独立可见成果' : 'six tasks · distinct visible outputs',15,'#A9C3D2',600,'end');

  s += rect(60,180,420,260,C.white,24,C.line,2);
  s += text(88,218,'01 · IDENTITY',16,C.teal,800);
  s += text(88,267,atlas.identity.short_mark,55,C.coral,900);
  s += text(215,252,zh ? atlas.identity.name_zh : atlas.identity.name_en,zh ? 26 : 21,C.navy,800);
  s += text(215,283,zh ? '企业请求 ↔ 居民回程' : 'enterprise request ↔ resident return',17,C.muted,600);
  s += line(100,318,430,318,C.line,2);
  s += text(88,350,zh ? '标志逻辑' : 'mark logic',15,C.teal,800);
  const logic = zh ? ['相反方向，共享一个发布门；','没有公共回程，就没有企业窗口。'] : ['Opposing directions share one release gate;','no public return means no enterprise window.'];
  s += text(88,380,logic[0],17,C.ink,600) + text(88,407,logic[1],17,C.ink,600);
  atlas.identity.palette.forEach((item,i) => { s += `<circle cx="${318+i*36}" cy="363" r="11" fill="${item.value}"/>`; });

  s += rect(500,180,1240,260,C.white,24,C.line,2);
  s += text(528,218,zh ? '02 · 三大定位 / 五大功能 / 三区两翼' : '02 · 3 POSITIONS / 5 FUNCTIONS / 3 AREAS + 2 WINGS',16,C.teal,800);
  atlas.positioning.forEach((item,i) => {
    const x=528+i*390; s += rect(x,242,370,66,'#F7FAFA',14,C.line,1);
    s += text(x+18,269,item.id,14,C.coral,800) + text(x+54,269,pick(item),17,C.navy,800);
    s += text(x+18,294,zh ? item.flow_commons_move_zh.slice(0,21) : positionSummariesEn[i],zh ? 13 : 12,C.muted,500);
  });
  atlas.functions.forEach((item,i) => { s += pill(528+i*235,326,215,`${item.id} ${pick(item)}`,i===4?'#EEEFFE':C.pale,i===4?C.violet:C.teal); });
  const roles = atlas.three_areas_two_wings;
  const compactRoleLabels = zh ? roles.map((item) => `${item.id} ${pick(item)}`) : ['A1 Zhongzhiyuan','A2 AI Origin','A3 Dazhongsi','W1 Tech Service Wing','W2 Xiaoyuehe Wing'];
  roles.forEach((item,i) => {
    const x=528+i*235; const area=i<3; s += rect(x,374,215,45,area?C.navy2:'#EEF0FF',12);
    s += text(x+107.5,402,compactRoleLabels[i],zh ? 12 : 11,area?C.white:C.violet,750,'middle');
    if(i<4) s += text(x+225,403,'→',17,C.coral,800,'middle');
  });

  s += rect(60,470,1040,430,C.white,24,C.line,2);
  s += text(88,508,zh ? '03 · 六个全球机制案例 → 八要素生态回路' : '03 · SIX GLOBAL MECHANISMS → EIGHT-RESOURCE LOOP',16,C.teal,800);
  atlas.global_cases.forEach((item,i) => {
    const col=i%2,row=Math.floor(i/2),x=88+col*495,y=532+row*90;
    s += rect(x,y,470,76,'#F7FAFA',13,C.line,1);
    s += text(x+16,y+25,item.id,13,C.coral,800) + text(x+84,y+25,item.name,15,C.navy,800);
    s += text(x+16,y+50,zh ? item.local_transfer_zh.slice(0,31) : caseTransfersEn[i],zh ? 13 : 12,C.muted,550);
    s += text(x+16,y+69,zh ? `不照搬：${item.do_not_copy_zh.slice(0,23)}` : `do not copy · ${caseLimitsEn[i]}`,zh ? 11 : 10,C.coral,600);
  });
  s += text(88,826,zh ? '八要素先交换条件，再回传证据：' : 'Eight resources exchange conditions, then return evidence:',14,C.navy,700);
  atlas.ecosystem_resources.forEach((item,i) => { s += pill(88+i*122,844,110,item.toUpperCase(),i%2? '#FFF2ED':C.pale,i%2?C.coral:C.teal); });
  s += text(1070,888,zh ? '不声称合作 / 资金 / 招商承诺' : 'no partnership / funding / investment claim',12,C.muted,600,'end');

  s += rect(1120,470,620,430,C.white,24,C.line,2);
  s += text(1148,508,zh ? '04 · 地标—文化—年度运营' : '04 · LANDMARKS · CULTURE · ANNUAL OPS',16,C.teal,800);
  atlas.landmarks.forEach((item,i) => {
    const y=534+i*70; s += `<circle cx="1172" cy="${y+21}" r="20" fill="${[C.coral,C.teal,C.violet][i]}"/>`;
    s += text(1172,y+27,`L${i+1}`,12,C.white,800,'middle');
    s += text(1205,y+17,pick(item,'name_'),16,C.navy,800);
    s += text(1205,y+41,zh?item.public_function_zh.slice(0,28):landmarkSummariesEn[i],zh ? 12 : 11,C.muted,550);
  });
  s += rect(1148,752,564,42,C.navy2,12);
  s += text(1430,779,atlas.culture_story.international_copy,16,C.white,750,'middle');
  atlas.annual_operations.forEach((item,i) => {
    const x=1148+(i%2)*282,y=812+Math.floor(i/2)*39;
    s += pill(x,y,266,`${item.id} ${pick(item,'name_')}`,i===3?'#EEEFFE':C.pale,i===3?C.violet:C.teal);
  });
  s += text(1148,895,zh ? '每季必须留下公开工件、停止条件和后续责任；到场量不等于公共收益。' : 'Every season leaves a public artifact, stop rule and owned follow-up; attendance is not public benefit.',12,C.muted,600);

  s += rect(60,930,1680,200,C.navy,24);
  s += text(88,970,zh ? '05 · 六项任务唯一成果索引' : '05 · DISTINCT OUTPUT INDEX FOR SIX TASKS',16,'#77E7D3',800);
  atlas.task_outputs.forEach((item,i) => {
    const x=88+i*270; s += rect(x,992,252,104,i%2?'#143A50':'#173F54',14);
    s += text(x+16,1022,item.id,15,i<3?C.teal:C.gold,850);
    const outputs=zh ? item.outputs.slice(0,3) : taskOutputsEn[i];
    outputs.forEach((out,j) => s += text(x+16,1048+j*18,`• ${zh ? out.slice(0,31) : out}`,zh ? 11 : 10,'#D4E1E8',550));
  });
  s += text(60,1170,zh ? atlas.boundary_note_zh : atlas.boundary_note_en,13,C.muted,600);
  s += text(1740,1170,'147228 · PROVISIONAL · SOURCED CASES · HUMAN RELEASE',13,C.muted,700,'end');
  return svg(s);
}

function pilotBoard(language) {
  const zh = language === 'zh';
  const name = (item,key='') => item[`${key}${zh?'zh':'en'}`] ?? item[zh?'zh':'en'];
  const compactMinimumEn = [
    '2 weekdays + 1 stress window before calibration',
    'ordinary + accessible chains walked by day and night',
    'accepted receiver + public-route restoration check',
    'one outage/weather human takeover per window',
    'purpose + expiry locked before collection',
    'each affected group can disagree and correct',
    'readable board + paper/phone correction route'
  ];
  let s=rect(0,0,1800,1200,C.paper,0)+rect(0,0,1800,150,C.navy,0);
  s += text(60,50,'FLOW COMMONS / MINIMUM P0 EVIDENCE / v1.0',18,'#77E7D3',800);
  s += text(60,100,zh?pilot.title_zh:pilot.title_en,42,C.white,800);
  s += pill(1510,42,230,'HOLD · 0 FIELD RECORDS',C.hold,'#FFB29F');

  s += rect(60,180,500,260,C.white,24,C.line,2);
  s += text(88,218,zh?'01 · 为什么先做这里':'01 · WHY THIS NODE FIRST',16,C.teal,800);
  s += text(88,260,name(pilot.selected_node,'name_'),27,C.navy,850);
  const reason = zh ? ['先验收居民日常和人工等价入口；','不依赖大钟寺未定锚点；','不以企业车辆扩容作为试点前提。'] : ['Validate daily resident access and a human-equivalent entry;','no dependence on the unresolved Dazhongsi anchor;','no enterprise-vehicle expansion as a pilot prerequisite.'];
  reason.forEach((item,i)=>s+=text(88,305+i*31,`• ${item}`,16,C.ink,600));
  s += pill(88,392,205,zh?'一条普通链':'ordinary chain',C.pale,C.teal)+pill(305,392,220,zh?'一条无障碍替代链':'accessible alternative','#FFF2ED',C.coral);

  s += rect(590,180,1150,260,C.white,24,C.line,2);
  s += text(618,218,zh?'02 · 四个观察窗，同一套版本与停止规则':'02 · FOUR WINDOWS · ONE VERSION AND STOP CONTRACT',16,C.teal,800);
  pilot.time_windows.forEach((item,i)=>{
    const x=618+i*270; s+=rect(x,248,250,94,i%2?'#F7FAFA':'#EEF7F5',14,C.line,1);
    s+=text(x+18,277,item.id,14,i===3?C.violet:C.coral,800)+text(x+52,277,name(item),15,C.navy,800);
    s+=text(x+18,310,item.design_window,22,C.teal,850)+text(x+18,330,zh?'设计观察窗 · 非已排期':'design window · not scheduled',11,C.muted,600);
    if(i<3)s+=text(x+261,302,'→',19,C.coral,800,'middle');
  });
  s += text(618,390,zh?'每次记录日期、天气、计数角色、缺失区间和空间版本；不可比较的窗口不进入校准。':'Every record carries date, weather, counter role, missing interval and spatial version; incomparable windows do not enter calibration.',14,C.muted,600);

  s += rect(60,470,1100,520,C.white,24,C.line,2);
  s += text(88,508,zh?'03 · 七条证据流：模板已备，现场记录仍为 0':'03 · SEVEN EVIDENCE STREAMS · TEMPLATES READY · FIELD RECORDS 0',16,C.teal,800);
  pilot.evidence_streams.forEach((item,i)=>{
    const y=532+i*62; const color=[C.teal,C.coral,C.gold,C.violet,C.teal,C.coral,C.gold][i];
    s+=`<circle cx="112" cy="${y+21}" r="20" fill="${color}"/>`+text(112,y+27,item.id,12,C.white,850,'middle');
    s+=text(148,y+17,name(item),15,C.navy,800);
    const min = zh ? ['两工作日 + 一压力窗；15 分钟分组计数','日/夜普通链和无障碍链共同走查','每个企业窗口有接收人和公共路线复原','每个时窗做断网/天气人工接管回放','字段先有目的、期限和删除责任','居民/照护者/无障碍/夜班可反对和更正','公开状态板 + 纸面/电话更正入口'][i] : compactMinimumEn[i];
    s+=text(148,y+40,min,zh ? 12 : 11,C.muted,550);
    s+=pill(1008,y+5,112,'0 RECORDS','#F5E9E7',C.coral);
    if(i<6)s+=line(148,y+57,1128,y+57,C.line,1);
  });
  s += text(88,972,zh?'UNKNOWN 不填零；任一分组被平均值遮蔽，立即阻断。':'UNKNOWN never becomes zero; any group hidden by an average triggers a block.',13,C.coral,700);

  s += rect(1180,470,560,540,C.navy,24);
  s += text(1208,508,zh?'04 · RACI 与五道放行门':'04 · RACI AND FIVE RELEASE GATES',16,'#77E7D3',800);
  pilot.raci.forEach((item,i)=>{
    const y=535+i*48; s+=text(1208,y,item.role.replaceAll('_',' '),12,C.white,700);
    s+=pill(1578,y-22,130,'UNASSIGNED','#3C3037','#FFB29F');
  });
  s += line(1208,780,1712,780,'#35556A',2);
  pilot.release_gates.forEach((item,i)=>{
    const y=810+i*31; s+=text(1208,y,`${item.id} ${item.name.replaceAll('_',' ')}`,12,'#D9E5EB',600);
    s+=pill(1602,y-22,106,'HOLD','#4A3034','#FFB29F');
  });
  s += rect(1208,966,500,1,'#35556A',0);
  s += text(1208,993,zh?'当前：0 角色确认 · 0 分组签收 · 0 放行门':'Current: 0 confirmed roles · 0 group sign-offs · 0 passed gates',12,'#A9C3D2',600);

  s += rect(60,1020,1680,110,C.hold,18);
  s += text(88,1056,zh?'校准失效即停：':'MODEL INVALID → STOP:',15,'#FFB29F',850);
  const invalid = zh ? '窗口不可比 / 分组分母缺失 / 路线版本改变 / 漏记区间 / 出现未建模障碍' : 'incomparable window / missing group denominator / route version changed / missing interval / unmodeled barrier';
  s += text(zh ? 250 : 350,1056,invalid,14,C.white,650);
  s += text(88,1095,zh?'本图是参与者可控制的现场协议，不是现场结果；正式边界缺失不阻断编制协议，但 0 记录绝不升级为 P1。':'This is a participant-controlled field protocol, not a field result. Missing official geometry does not block the protocol, but zero records never advance to P1.',13,'#E7D5D2',600);
  s += text(60,1170,'Sources: p0-pilot-evidence-pack.json · taskbook · accessibility / data-governance standards',13,C.muted,600);
  s += text(1740,1170,'NOT AUTHORIZED · NOT RUN · NO PERSONAL TRACES',13,C.muted,750,'end');
  return svg(s);
}

const outputs = {
  'enterprise-taskbook-delivery.svg': taskbookBoard('zh'),
  'enterprise-taskbook-delivery.en.svg': taskbookBoard('en'),
  'enterprise-p0-pilot.svg': pilotBoard('zh'),
  'enterprise-p0-pilot.en.svg': pilotBoard('en')
};
const checkOnly = process.argv.includes('--check');
for (const [name, content] of Object.entries(outputs)) {
  const target = path.join(figureDir, name);
  if (checkOnly) {
    if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== content) fail(`stale or missing ${name}`);
  } else {
    fs.writeFileSync(target, content);
  }
}

console.log(JSON.stringify({
  status: 'ENTERPRISE_TASKBOOK_DELIVERY_PASS',
  positions: atlas.positioning.length,
  functions: atlas.functions.length,
  areas_and_wings: atlas.three_areas_two_wings.length,
  cases: atlas.global_cases.length,
  resources: atlas.ecosystem_resources.length,
  landmarks: atlas.landmarks.length,
  annual_operations: atlas.annual_operations.length,
  task_outputs: atlas.task_outputs.length,
  p0_templates: pilot.evidence_streams.length,
  p0_field_records: pilot.current_readout.field_records,
  decision: pilot.decision
}, null, 2));
