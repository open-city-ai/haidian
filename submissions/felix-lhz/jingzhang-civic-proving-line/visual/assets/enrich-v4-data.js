const fs = require('fs');
const path = require('path');

const here = __dirname;
const atlasPath = path.join(here, 'spatial-atlas.json');
const scenariosPath = path.join(here, 'two-answers.json');
const atlas = JSON.parse(fs.readFileSync(atlasPath, 'utf8'));
const data = JSON.parse(fs.readFileSync(scenariosPath, 'utf8'));

const zhEn = (zh, en) => ({ zh, en });
const componentSpecs = {
  B01: ['3.0 m continuous clear route', '0 m; this is the protected public route', 'lighting + tactile continuity + drainage', '开放/OPEN', 'retain as permanent civic access'],
  B02: ['1.8 x 3.6 m rest module', 'outside the 3.0 m clear route', 'potable water + shade + inspection', '开放/OPEN', 'retain as permanent climate refuge'],
  B03: ['2.4 x 4.8 m staffed interface', 'directly visible from B01', 'power + telephone + paper directory', '开放/OPEN', 'retain staff desk and static signs'],
  A01: ['4.0 m controlled lane + 1.5 m buffers', 'minimum 1.5 m from B01', 'isolated power + local control + steward', '试验/TRIAL', 'remove vehicle, barriers and charging kit'],
  A02: ['1.2 x 2.4 m ventilated service bay', 'minimum 3.0 m from seating and escape', 'metered power + cooling + lockout', '试验/TRIAL', 'return cabinet to operator or certified recycler'],
  A03: ['0.9 x 1.8 m optional interface', 'outside B01 and beside staffed fallback', 'isolated power + local data + hard off switch', '试验/TRIAL', 'remove terminal and reinstate clear frontage'],
  E01: ['1.2 x 2.1 m public status face', 'visible before opt-in point', 'local status feed + static fallback notice', '开放/OPEN', 'retain static evidence and closure notice'],
  E02: ['1.8 x 2.4 m staffed stop position', 'direct sightline to the trial boundary', 'hard stop + radio + incident log', '暂停/PAUSE', 'retain emergency hardware where useful'],
  E03: ['1.2 x 2.1 m notice and appeal face', 'on baseline exit, never inside trial zone', 'paper/phone appeal + asset register', '撤场/RETIRE', 'retain public record after equipment removal'],
};

atlas.schema_version = '1.2.0';
atlas.publication_version = 'V4';
atlas.subtitle = zhEn('城市采纳回执', 'Civic Adoption Receipt');
atlas.components = atlas.components.map((component) => {
  const spec = componentSpecs[component.id];
  return {
    ...component,
    spatial_requirement: spec[0],
    minimum_separation: spec[1],
    utility_and_staff_interface: spec[2],
    lifecycle_states: ['open', 'trial', 'pause', 'retire'],
    default_state: spec[3],
    retirement_destination: spec[4],
    evidence_status: 'design_standard_not_field_verified',
  };
});

const stationDepth = {
  zhongzhiyuan: {
    hero_scenario_id: 'SCN-002', city_scale: '1:5000', plan_scale: '1:2000', detail_scale: '1:500', section_scale: '1:200',
    viewports: { city: [0, 0, 1000, 1000], plan: [70, 70, 860, 860], detail: [235, 235, 530, 530] },
    entrances: [[110, 170], [110, 830], [860, 500]], buffer_geometry: { type: 'ring', centre: [505, 505], outer_radius: [272, 242], inner_radius: [238, 208] },
    baseline_route: [[110, 160], [860, 160], [860, 840], [110, 840], [110, 160]], emergency_route: [[505, 505], [760, 505], [930, 505]], removal_route: [[710, 505], [930, 505]], staff_positions: [[240, 505], [760, 430]], section_line: [[115, 610], [885, 610]],
    operation_windows: zhEn('公众旁路 24 小时；机器人测试建议仅 10:00–12:00 / 14:00–16:00，并由现场许可复核', 'Public bypass 24/7; robot trial proposed only 10:00–12:00 / 14:00–16:00, subject to site approval'),
  },
  ai_origin: {
    hero_scenario_id: 'SCN-005', city_scale: '1:5000', plan_scale: '1:2000', detail_scale: '1:500', section_scale: '1:200',
    viewports: { city: [0, 0, 1000, 1000], plan: [80, 90, 840, 820], detail: [210, 250, 580, 430] },
    entrances: [[80, 300], [80, 510], [80, 720], [920, 510]], buffer_geometry: { type: 'strip', points: [[600, 180], [690, 180], [690, 820], [600, 820]] },
    baseline_route: [[80, 300], [920, 300], [80, 510], [920, 510], [80, 720], [920, 720]], emergency_route: [[650, 500], [790, 500], [920, 500]], removal_route: [[650, 260], [920, 260]], staff_positions: [[300, 420], [760, 500]], section_line: [[100, 640], [900, 640]],
    operation_windows: zhEn('公共大厅按普通开放时间运行；AI 导航仅在双语人工台在岗时开放', 'The hall follows ordinary opening hours; AI navigation opens only while the bilingual staffed desk is available'),
  },
  dazhongsi: {
    hero_scenario_id: 'SCN-010', city_scale: '1:5000', plan_scale: '1:2000', detail_scale: '1:500', section_scale: '1:200',
    viewports: { city: [0, 0, 1000, 1000], plan: [70, 70, 860, 860], detail: [470, 500, 400, 330] },
    entrances: [[500, 70], [500, 930], [70, 500], [930, 500]], buffer_geometry: { type: 'bay', points: [[600, 575], [850, 575], [850, 790], [600, 790]] },
    baseline_route: [[500, 70], [500, 930], [70, 500], [930, 500]], emergency_route: [[720, 680], [900, 680], [930, 500]], removal_route: [[720, 790], [920, 790]], staff_positions: [[575, 620], [820, 620]], section_line: [[120, 700], [900, 700]],
    operation_windows: zhEn('常规接驳全天优先；低速试验建议避开高峰并限于单次 20 分钟受控窗口', 'Conventional interchange always has priority; low-speed trials avoid peaks and use controlled 20-minute windows'),
  },
};

atlas.stations = atlas.stations.map((station) => ({ ...station, ...stationDepth[station.id] }));
atlas.hero_scenes = ['SCN-002', 'SCN-005', 'SCN-010'];
atlas.design_scale_note = zhEn('所有比例与尺寸均为公开资料条件下的概念设计建议，待测绘、权属、消防、市政和官方底图复核', 'All scales and dimensions are concept-design proposals based on public sources, pending survey, ownership, fire, utility and official-base verification');

const heroConfig = {
  'SCN-002': { plan: 'PLAN-Z-2000', detail: 'DETAIL-T2-500', section: 'SEC-T2-200', baseline: 'ROUTE-Z-BYPASS', emergency: 'ROUTE-Z-EMERGENCY', asset: 'ASSET-ROBOT-BAY' },
  'SCN-005': { plan: 'PLAN-A-2000', detail: 'DETAIL-S2-500', section: 'SEC-S2-200', baseline: 'ROUTE-A-PASSAGES', emergency: 'ROUTE-A-EMERGENCY', asset: 'ASSET-BILINGUAL-KIOSK' },
  'SCN-010': { plan: 'PLAN-D-2000', detail: 'DETAIL-S7-500', section: 'SEC-S7-200', baseline: 'ROUTE-D-CONVENTIONAL', emergency: 'ROUTE-D-EMERGENCY', asset: 'ASSET-LOW-SPEED-BAY' },
};

data.schema_version = '1.2.0';
data.title = zhEn('京张双答：城市采纳回执', 'Jing-Zhang Two Answers: Civic Adoption Receipt');
data.subtitle = zhEn('普通服务先成立，AI 通过同题、同人、同空间的公开验收后，才获得城市采用资格。', 'The baseline stands first; AI earns civic adoption only through a public same-task, same-user, same-space test.');
data.field_status = 'not_field_run';
data.scenarios = data.scenarios.map((scenario) => {
  const hero = heroConfig[scenario.id];
  const receipt = {
    task: scenario.name,
    users: scenario.user_profiles,
    baseline: scenario.ordinary_answer,
    ai_increment: scenario.ai_answer,
    minimum_data: scenario.minimum_data,
    accountable_human: scenario.human_responsibility,
    common_metrics: scenario.common_metrics,
    admission: scenario.admission_conditions,
    stop_event: scenario.stop_conditions,
    restored_state: scenario.exit_and_restore,
    decision: 'pending_field_evidence',
    allowed_decisions: ['adopt', 'revise', 'stop'],
  };
  return {
    ...scenario,
    evidence_tier: hero ? 'hero' : 'catalog',
    plan_ref: hero?.plan || scenario.plan_anchor,
    detail_ref: hero?.detail || null,
    section_ref: hero?.section || scenario.section_ref,
    operation_window: hero ? atlas.stations.find((s) => s.hero_scenario_id === scenario.id)?.operation_windows : zhEn('由场景运营者在普通服务可用时确定', 'Set by the scene operator while the baseline service is available'),
    baseline_route_ref: hero?.baseline || `BASELINE-${scenario.code}`,
    emergency_route_ref: hero?.emergency || `FALLBACK-${scenario.code}`,
    exit_asset_ref: hero?.asset || scenario.exit_asset_ref,
    receipt_fields: receipt,
    evidence_status: 'not_field_run',
  };
});

fs.writeFileSync(atlasPath, `${JSON.stringify(atlas, null, 2)}\n`);
fs.writeFileSync(scenariosPath, `${JSON.stringify(data, null, 2)}\n`);
console.log(`V4 data enriched: ${atlas.components.length} components, ${atlas.stations.length} stations, ${data.scenarios.filter((s) => s.evidence_tier === 'hero').length} heroes`);
