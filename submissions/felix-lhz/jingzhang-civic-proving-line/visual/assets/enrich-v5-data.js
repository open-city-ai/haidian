const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const GEO = path.join(ROOT, 'geometry');
const read = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const write = (file, value) => fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
const bilingual = (zh, en) => ({ zh, en });

const scenariosPath = path.join(__dirname, 'two-answers.json');
const atlasPath = path.join(__dirname, 'spatial-atlas.json');
const metricsPath = path.join(ROOT, 'metrics.json');
const riskPath = path.join(ROOT, 'risk.json');
const scenarios = read(scenariosPath);
const atlas = read(atlasPath);
const metrics = read(metricsPath);
const risk = read(riskPath);

const centres = {
  zhongzhiyuan: [116.3484, 40.0180],
  ai_origin: [116.3475, 39.9890],
  dazhongsi: [116.3490, 39.9570],
};

const metresToWgs = (stationId, [x, y]) => {
  const [lng, lat] = centres[stationId];
  const lngPerMetre = 1 / (111320 * Math.cos(lat * Math.PI / 180));
  const latPerMetre = 1 / 110540;
  return [Number((lng + x * lngPerMetre).toFixed(7)), Number((lat + y * latPerMetre).toFixed(7))];
};
const close = (points) => [...points, points[0]];
const rect = (x1, y1, x2, y2) => close([[x1, y1], [x2, y1], [x2, y2], [x1, y2]]);
const ellipse = (cx, cy, rx, ry, steps = 36) => close(Array.from({ length: steps }, (_, i) => {
  const a = Math.PI * 2 * i / steps;
  return [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry];
}));
const lineFeature = (station, id, coords, props = {}) => ({
  type: 'Feature', id,
  properties: {
    id, layer: 'ROAD_CENTERLINE', source_type: 'agent_generated_design', confidence: 'low',
    geometry_role: 'design_proposal', status: 'concept_proposal', station, ...props,
  },
  geometry: { type: 'LineString', coordinates: coords.map((p) => metresToWgs(station, p)) },
});
const polygonFeature = (station, id, coords, props = {}) => ({
  type: 'Feature', id,
  properties: {
    id, layer: 'PUBLIC_SPACE', source_type: 'agent_generated_design', confidence: 'low',
    geometry_role: 'design_proposal', status: 'concept_proposal', station, ...props,
  },
  geometry: { type: 'Polygon', coordinates: [coords.map((p) => metresToWgs(station, p))] },
});
const buildingFeature = (station, id, coords, props = {}) => ({
  type: 'Feature', id,
  properties: {
    id, layer: 'BUILDING_FOOTPRINT', source_type: 'agent_generated_design', confidence: 'low',
    geometry_role: 'design_proposal', status: 'concept_proposal', station,
    retain_renovate_demolish_status: 'concept_adaptive_reuse_or_reversible_structure', ...props,
  },
  geometry: { type: 'Polygon', coordinates: [coords.map((p) => metresToWgs(station, p))] },
});
const pointFeature = (station, id, coord, props = {}) => ({
  type: 'Feature', id,
  properties: {
    id, layer: 'REGULATORY_CONTROL', source_type: 'agent_generated_design', confidence: 'low',
    geometry_role: 'design_proposal', status: 'concept_proposal', station, ...props,
  },
  geometry: { type: 'Point', coordinates: metresToWgs(station, coord) },
});

const stationGeometry = {
  zhongzhiyuan: {
    routes: [
      lineFeature('zhongzhiyuan', 'V5-Z-BYPASS', close(rect(-62, -46, 62, 46).slice(0, -1)), { route_role: 'baseline', name_zh: '24 小时完整公共旁路', name_en: '24/7 complete public bypass', design_width_m: 3.0 }),
      lineFeature('zhongzhiyuan', 'V5-Z-EMERGENCY', [[0, 0], [46, 0], [72, 0]], { route_role: 'emergency', name_zh: '人工急停与消防到达线', name_en: 'Human E-stop and emergency access' }),
      lineFeature('zhongzhiyuan', 'V5-Z-REMOVAL', [[22, -10], [48, -22], [72, -22]], { route_role: 'removal', name_zh: '机器人与机柜撤场通道', name_en: 'Robot and cabinet removal route' }),
    ],
    spaces: [
      polygonFeature('zhongzhiyuan', 'V5-Z-TRIAL', ellipse(0, 0, 34, 27), { space_role: 'ai_trial', name_zh: '机器人受控测试环', name_en: 'Controlled robot test loop', design_area_note: 'concept 68 m x 54 m envelope' }),
      polygonFeature('zhongzhiyuan', 'V5-Z-BUFFER', ellipse(0, 0, 41, 34), { space_role: 'safety_buffer', name_zh: '测试安全缓冲外缘', name_en: 'Outer safety-buffer boundary', minimum_separation_m: 1.5 }),
      polygonFeature('zhongzhiyuan', 'V5-Z-EVIDENCE', rect(-58, -9, -44, 9), { space_role: 'evidence_interface', name_zh: '公众证据与申诉界面', name_en: 'Public evidence and appeal interface' }),
    ],
    buildings: [
      buildingFeature('zhongzhiyuan', 'V5-Z-REPRO', rect(-20, -12, -4, 8), { building_type: 'lab', name_zh: '模型复现室建议包络', name_en: 'Model reproduction room envelope' }),
      buildingFeature('zhongzhiyuan', 'V5-Z-CABINET', rect(15, -13, 27, 10), { building_type: 'ai_r_and_d', name_zh: '端侧机柜运维院', name_en: 'Edge cabinet service yard' }),
    ],
    points: [
      pointFeature('zhongzhiyuan', 'V5-Z-ENT-W', [-62, 0], { point_role: 'entrance', name_zh: '西侧步行入口', name_en: 'West pedestrian entrance' }),
      pointFeature('zhongzhiyuan', 'V5-Z-ENT-E', [62, 0], { point_role: 'entrance', name_zh: '东侧步行入口', name_en: 'East pedestrian entrance' }),
      pointFeature('zhongzhiyuan', 'V5-Z-STAFF-01', [-43, 0], { point_role: 'staff_position', name_zh: '人工急停岗位', name_en: 'Human E-stop position' }),
      pointFeature('zhongzhiyuan', 'V5-Z-UTILITY', [27, -13], { point_role: 'utility_interface', name_zh: '隔离电力与锁定接口', name_en: 'Isolated power and lockout interface' }),
    ],
  },
  ai_origin: {
    routes: [
      lineFeature('ai_origin', 'V5-A-PASS-01', [[-68, 28], [68, 28]], { route_role: 'baseline', name_zh: '北侧无门槛穿行路径', name_en: 'North step-free passage', design_width_m: 3.0 }),
      lineFeature('ai_origin', 'V5-A-PASS-02', [[-68, 0], [68, 0]], { route_role: 'baseline', name_zh: '中央无门槛穿行路径', name_en: 'Central step-free passage', design_width_m: 3.0 }),
      lineFeature('ai_origin', 'V5-A-PASS-03', [[-68, -28], [68, -28]], { route_role: 'baseline', name_zh: '南侧无门槛穿行路径', name_en: 'South step-free passage', design_width_m: 3.0 }),
      lineFeature('ai_origin', 'V5-A-EMERGENCY', [[16, 0], [52, 0], [72, 0]], { route_role: 'emergency', name_zh: '人工接管与疏散路线', name_en: 'Human takeover and egress route' }),
      lineFeature('ai_origin', 'V5-A-REMOVAL', [[18, 24], [54, 24], [72, 24]], { route_role: 'removal', name_zh: '插件墙撤场通道', name_en: 'Plug-in wall removal route' }),
    ],
    spaces: [
      polygonFeature('ai_origin', 'V5-A-HALL', rect(-60, -40, 60, 40), { space_role: 'public_hall', name_zh: '可穿行公共大厅', name_en: 'Porous public hall' }),
      polygonFeature('ai_origin', 'V5-A-PLUGIN', rect(10, -38, 20, 38), { space_role: 'ai_trial', name_zh: '可关闭 AI 插件墙', name_en: 'Closeable AI plug-in wall' }),
      polygonFeature('ai_origin', 'V5-A-WAIT', rect(-36, -19, -14, -5), { space_role: 'baseline_waiting', name_zh: '不占通路的人工等候区', name_en: 'Staffed waiting area outside passage' }),
    ],
    buildings: [
      buildingFeature('ai_origin', 'V5-A-DESK', rect(-36, 5, -15, 19), { building_type: 'community_service', name_zh: '人工双语服务台', name_en: 'Staffed bilingual desk' }),
      buildingFeature('ai_origin', 'V5-A-BACK', rect(29, -22, 55, 22), { building_type: 'office', name_zh: '专业复核后台', name_en: 'Professional review back office' }),
    ],
    points: [
      pointFeature('ai_origin', 'V5-A-ENT-NW', [-68, 28], { point_role: 'entrance', name_zh: '北侧无账户入口', name_en: 'North no-account entrance' }),
      pointFeature('ai_origin', 'V5-A-ENT-CW', [-68, 0], { point_role: 'entrance', name_zh: '中央无账户入口', name_en: 'Central no-account entrance' }),
      pointFeature('ai_origin', 'V5-A-ENT-SW', [-68, -28], { point_role: 'entrance', name_zh: '南侧无账户入口', name_en: 'South no-account entrance' }),
      pointFeature('ai_origin', 'V5-A-STAFF-01', [-25, 12], { point_role: 'staff_position', name_zh: '双语人工岗位', name_en: 'Bilingual staffed position' }),
      pointFeature('ai_origin', 'V5-A-UTILITY', [17, 34], { point_role: 'utility_interface', name_zh: '插件墙硬关闭接口', name_en: 'Plug-in wall hard-off interface' }),
    ],
  },
  dazhongsi: {
    routes: [
      lineFeature('dazhongsi', 'V5-D-NS', [[0, -78], [0, 78]], { route_role: 'baseline', name_zh: '南北常规步行联系', name_en: 'North-south conventional walking link', design_width_m: 4.0 }),
      lineFeature('dazhongsi', 'V5-D-EW', [[-78, 0], [78, 0]], { route_role: 'baseline', name_zh: '东西常规步行联系', name_en: 'East-west conventional walking link', design_width_m: 4.0 }),
      lineFeature('dazhongsi', 'V5-D-EMERGENCY', [[30, -30], [64, -30], [78, 0]], { route_role: 'emergency', name_zh: '试验湾疏散与急停路线', name_en: 'Trial-bay evacuation and E-stop route' }),
      lineFeature('dazhongsi', 'V5-D-REMOVAL', [[35, -54], [78, -54]], { route_role: 'removal', name_zh: '设备撤场路线', name_en: 'Equipment removal route' }),
    ],
    spaces: [
      polygonFeature('dazhongsi', 'V5-D-FORECOURT', rect(-72, 10, 72, 68), { space_role: 'conventional_forecourt', name_zh: '常规接驳与活动前场', name_en: 'Conventional interchange and event forecourt' }),
      polygonFeature('dazhongsi', 'V5-D-TRIAL', rect(18, -65, 68, -18), { space_role: 'ai_trial', name_zh: '独立低速辅助接驳湾', name_en: 'Separate low-speed assisted interchange bay' }),
      polygonFeature('dazhongsi', 'V5-D-EVIDENCE', rect(-62, -60, -16, -18), { space_role: 'evidence_interface', name_zh: '城市采纳证据广场', name_en: 'Civic adoption evidence square' }),
    ],
    buildings: [
      buildingFeature('dazhongsi', 'V5-D-SERVICE', rect(-60, 22, -28, 50), { building_type: 'community_service', name_zh: '人工公共服务亭', name_en: 'Staffed public-service pavilion' }),
      buildingFeature('dazhongsi', 'V5-D-CONTROL', rect(44, -9, 65, 9), { building_type: 'mobility_hub', name_zh: '低速试验控制亭', name_en: 'Low-speed trial control pavilion' }),
    ],
    points: [
      pointFeature('dazhongsi', 'V5-D-ENT-N', [0, 78], { point_role: 'entrance', name_zh: '北象限入口', name_en: 'North-quadrant entrance' }),
      pointFeature('dazhongsi', 'V5-D-ENT-E', [78, 0], { point_role: 'entrance', name_zh: '东象限入口', name_en: 'East-quadrant entrance' }),
      pointFeature('dazhongsi', 'V5-D-ENT-S', [0, -78], { point_role: 'entrance', name_zh: '南象限入口', name_en: 'South-quadrant entrance' }),
      pointFeature('dazhongsi', 'V5-D-ENT-W', [-78, 0], { point_role: 'entrance', name_zh: '西象限入口', name_en: 'West-quadrant entrance' }),
      pointFeature('dazhongsi', 'V5-D-STAFF-01', [20, -30], { point_role: 'staff_position', name_zh: '交通与试验人工岗位', name_en: 'Transit and trial staffed position' }),
      pointFeature('dazhongsi', 'V5-D-UTILITY', [58, -58], { point_role: 'utility_interface', name_zh: '可拆充电与隔离电力接口', name_en: 'Removable charging and isolated-power interface' }),
    ],
  },
};

const geoFiles = {
  roads: read(path.join(GEO, 'roads.geojson')),
  public_space: read(path.join(GEO, 'public_space.geojson')),
  buildings: read(path.join(GEO, 'buildings.geojson')),
  constraints: read(path.join(GEO, 'constraints.geojson')),
};
Object.values(geoFiles).forEach((collection) => {
  collection.features = collection.features.filter((feature) => !String(feature.id || feature.properties?.id).startsWith('V5-'));
});
Object.values(stationGeometry).forEach((group) => {
  geoFiles.roads.features.push(...group.routes);
  geoFiles.public_space.features.push(...group.spaces);
  geoFiles.buildings.features.push(...group.buildings);
  geoFiles.constraints.features.push(...group.points);
});
Object.entries(geoFiles).forEach(([name, value]) => write(path.join(GEO, `${name}.geojson`), value));

const evidenceLadder = [
  { id: 'E0', state: 'public_source', label: bilingual('公开资料已登记', 'Public sources registered') },
  { id: 'E1', state: 'concept_design', label: bilingual('概念设计可追踪', 'Concept design traceable') },
  { id: 'E2', state: 'baseline_prototype_pending', label: bilingual('普通服务原型待建', 'Baseline prototype pending') },
  { id: 'E3', state: 'controlled_trial_pending', label: bilingual('受控试验待运行', 'Controlled trial pending') },
  { id: 'E4', state: 'civic_adoption_pending', label: bilingual('城市采用待决定', 'Civic adoption pending') },
];
const permits = [
  bilingual('场地与资产方同意', 'Site and asset-owner consent'), bilingual('消防与疏散复核', 'Fire and egress review'),
  bilingual('无障碍审计', 'Accessibility audit'), bilingual('临时用电与网络隔离', 'Temporary power and network isolation'),
  bilingual('设备安全与保险', 'Equipment safety and insurance'), bilingual('活动或交通组织许可', 'Event or traffic-management permit'),
];
const roles = [
  'asset_owner_representative', 'site_operator', 'baseline_service_staff', 'ai_operator',
  'safety_officer', 'data_steward', 'public_representative',
];
const heroMap = { 'SCN-002': 'zhongzhiyuan', 'SCN-005': 'ai_origin', 'SCN-010': 'dazhongsi' };
const geometryIds = Object.fromEntries(Object.entries(stationGeometry).map(([station, group]) => [station, [
  ...group.routes, ...group.spaces, ...group.buildings, ...group.points,
].map((feature) => feature.id)]));

scenarios.schema_version = '1.3.0';
scenarios.publication_version = 'V5';
scenarios.title = bilingual('京张双答：把回执画进城市', 'Jing-Zhang Two Answers: Draw the Receipt into the City');
scenarios.evidence_ladder = evidenceLadder;
scenarios.hero_operating_framework = {
  raci_roles: roles,
  permit_prerequisites: permits,
  decision_rule: bilingual(
    '普通服务不得退化；安全类事件零容忍；AI 增量阈值只在 E2 普通服务基线建立后由人类场景委员会确认。',
    'The baseline must not regress; safety events are zero-tolerance; AI-increment thresholds are set by the human scene committee only after the E2 baseline is established.'
  ),
};
scenarios.scenarios = scenarios.scenarios.map((item) => {
  const station = heroMap[item.id] || item.map_focus?.station || item.station;
  const isHero = Boolean(heroMap[item.id]);
  return {
    ...item,
    evidence_level: isHero ? 'E1_concept_design_complete' : 'E1_catalogue_trace_complete',
    geometry_refs: geometryIds[station] || [item.spatial_ref].filter(Boolean),
    baseline_measurement_protocol: {
      denominator: bilingual('同一任务下全部符合准入条件的普通服务使用尝试', 'All eligible baseline-service attempts for the same task'),
      sample_window: bilingual('E2 原型运行后确定；同时记录时段、天气、辅助需求与退出原因', 'Set after the E2 prototype; record time, weather, assistance needs and exit reason'),
      minimum_fields: ['task_completion', 'assistance_request', 'safety_event', 'fallback_used', 'appeal_lodged'],
      current_status: 'not_field_run',
    },
    trial_threshold_rule: {
      no_regression: bilingual('普通服务的可达性、可靠性和公平性不得降低', 'Accessibility, reliability and equity of the baseline may not regress'),
      zero_tolerance: item.stop_conditions,
      ai_increment_threshold: bilingual('在 E2 基线完成后由人类场景委员会登记，当前为 unknown', 'Registered by the human scene committee after E2 baseline completion; currently unknown'),
    },
    permit_dependencies: permits,
    maintenance_cycle: isHero ? bilingual('每日开场检查、每次试验前联锁检查、每周资产盘点、每月公开复盘', 'Daily opening check, interlock check before every trial, weekly asset inventory, monthly public review') : bilingual('由复制场景运营者在 E2 前登记', 'Registered by the replication-scene operator before E2'),
    receipt_state: isHero ? 'E1_READY_E2_PENDING' : 'CATALOGUE_READY_E2_PENDING',
  };
});

atlas.schema_version = '1.3.0';
atlas.publication_version = 'V5';
atlas.coordinate_reference = 'EPSG:4326';
atlas.projection_method = 'Local equirectangular rendering around each concept station; GeoJSON remains WGS84.';
atlas.evidence_ladder = evidenceLadder;
atlas.stations = atlas.stations.map((station) => {
  const refs = geometryIds[station.id] || [];
  const centre = centres[station.id];
  const dLng = 95 / (111320 * Math.cos(centre[1] * Math.PI / 180));
  const dLat = 95 / 110540;
  return {
    ...station,
    context_bbox: [centre[0] - dLng, centre[1] - dLat, centre[0] + dLng, centre[1] + dLat].map((x) => Number(x.toFixed(7))),
    projection_method: 'local_equirectangular_from_wgs84',
    scale_basis: 'concept_design_dimensions_pending_survey',
    geometry_refs: refs,
    entrance_refs: refs.filter((id) => id.includes('-ENT-')),
    interface_refs: refs.filter((id) => id.includes('UTILITY') || id.includes('EVIDENCE') || id.includes('STAFF')),
    state_geometry_refs: {
      open: refs.filter((id) => id.includes('BYPASS') || id.includes('PASS-') || id === 'V5-D-NS' || id === 'V5-D-EW' || id.includes('FORECOURT')),
      trial: refs.filter((id) => id.includes('TRIAL') || id.includes('PLUGIN')),
      pause: refs.filter((id) => id.includes('EMERGENCY') || id.includes('STAFF')),
      retire: refs.filter((id) => id.includes('REMOVAL')),
    },
  };
});
atlas.components = atlas.components.map((component) => ({
  ...component,
  operator_role: component.id.startsWith('B') ? 'baseline_service_staff' : component.id.startsWith('A') ? 'ai_operator' : 'public_representative',
  maintenance_cycle: component.id.startsWith('A') ? 'before_each_trial_and_weekly_inventory' : 'daily_opening_and_monthly_public_review',
  permit_tags: component.id.startsWith('A') ? ['site', 'safety', 'power_network', 'insurance'] : ['site', 'accessibility'],
  evidence_level: 'E1_concept_design',
}));

metrics.metrics.traceable_design_geometry_count = {
  status: 'known', value: Object.values(geometryIds).flat().length, unit: 'count',
  source_files: ['geometry/roads.geojson', 'geometry/public_space.geojson', 'geometry/buildings.geojson', 'geometry/constraints.geojson'],
  formula: 'count(features where id starts with V5-)', confidence: 'high', assumptions: ['A-SPATIAL-ATLAS-001'],
};
metrics.metrics.evidence_ladder_level_count = {
  status: 'known', value: evidenceLadder.length, unit: 'count', source_files: ['visual/assets/two-answers.json'],
  formula: 'count(E0..E4 evidence levels)', confidence: 'high', assumptions: [],
};
metrics.metrics.hero_operating_state_count = {
  status: 'known', value: 4, unit: 'count', source_files: ['visual/assets/spatial-atlas.json'],
  formula: 'count(OPEN, TRIAL, PAUSE, RETIRE)', confidence: 'high', assumptions: [],
};
metrics.metrics.field_performance_status = {
  status: 'unknown', value: null, unit: 'not_field_run', source_files: ['visual/assets/two-answers.json'],
  formula: 'measured only after E2 baseline and E3 controlled trial', confidence: 'unknown', assumptions: ['A-METRICS-001'],
  reason: 'V5 is an E1 concept design; no field prototype or controlled trial has occurred.',
};
risk.summary = 'V5 把普通路径、试验边界、人工岗位、急停和撤场线写入可追踪 WGS84 概念几何，并以 E0—E4 证据阶梯阻止概念设计被误读为现场成效。';
risk.evidence_ladder = evidenceLadder.map(({ id, status }) => ({ id, status }));
risk.zero_tolerance_rule = 'baseline_no_regression + safety_event_zero_tolerance + committee_threshold_after_E2';

write(scenariosPath, scenarios);
write(atlasPath, atlas);
write(metricsPath, metrics);
write(riskPath, risk);
console.log(`V5 enriched: ${scenarios.scenarios.length} scenarios, ${Object.values(geometryIds).flat().length} traceable geometry objects`);
