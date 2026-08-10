#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const assetDir = __dirname;
const packageDir = path.resolve(assetDir, '..', '..');
const modelPath = path.join(assetDir, 'regional-scale-commute.json');
const sourcePath = path.join(packageDir, 'sources.json');
const outputPath = path.join(assetDir, 'mode-parameter-provenance.json');
const figureDir = path.join(packageDir, 'assets', 'figures');
const model = JSON.parse(fs.readFileSync(modelPath, 'utf8'));
const sourceIds = new Set(JSON.parse(fs.readFileSync(sourcePath, 'utf8')).sources.map((source) => source.id));

const methodSources = ['MATSIM-LARGE-SCALE-ABM', 'MOBILITY-DATA-METHOD', 'ACTIVITY-BASED-DISAGGREGATE-2001'];
const capacitySources = ['SCHEDULED-CAPACITY-TRANSIT-2012', 'MOBILITY-DATA-METHOD'];
const weightSources = ['ATOM-MULTIMODAL-ABM', 'ACTIVITY-BASED-DISAGGREGATE-2001'];
for (const id of [...methodSources, ...capacitySources, ...weightSources, 'HAIDIAN-POPULATION-2024']) {
  if (!sourceIds.has(id)) throw new Error(`missing source registry id ${id}`);
}

const records = [];
function add(record) {
  records.push({
    param_id: record.param_id,
    family: record.family,
    owner_path: record.owner_path,
    current_value: record.current_value,
    status: record.status,
    source_ids: record.source_ids,
    source_role: 'method_reference_or_declared_input',
    calibration_dependency: record.calibration_dependency,
    boundary_zh: record.boundary_zh,
    boundary_en: record.boundary_en,
    observed_count: 0
  });
}

for (const [mode, parameters] of Object.entries(model.mode_parameters)) {
  const basePath = `mode_parameters.${mode}`;
  add({
    param_id: `${mode}.capacity_person_trips`, family: 'mode_parameter', owner_path: `${basePath}.capacity_person_trips`, current_value: parameters.capacity_person_trips,
    status: 'agent_proposed', source_ids: capacitySources, calibration_dependency: 'dated service supply and capacity audit by time slice',
    boundary_zh: '声明的人次容量，只用于合成压力屏查，不能读作列次、运力或现状容量。', boundary_en: 'A declared person-trip capacity for the synthetic screen, not observed departures, supply or local capacity.'
  });
  add({
    param_id: `${mode}.base_minutes`, family: 'mode_parameter', owner_path: `${basePath}.base_minutes`, current_value: parameters.base_minutes,
    status: 'agent_proposed', source_ids: methodSources, calibration_dependency: 'dated OD, route survey and time-of-day travel-time observation',
    boundary_zh: '声明的基准分钟数，只用于比较候选方式，不是现场通行时间。', boundary_en: 'A declared base-minute value for comparison, not field travel time.'
  });
  for (const [scenario, value] of Object.entries(parameters.reliability || {})) {
    add({
      param_id: `${mode}.reliability.${scenario}`, family: 'mode_parameter', owner_path: `${basePath}.reliability.${scenario}`, current_value: value,
      status: 'agent_proposed', source_ids: methodSources, calibration_dependency: 'dated reliability logs, headway and disruption records',
      boundary_zh: '声明的可靠性代理，只用于情景扰动和候选比较，不是运营准点率。', boundary_en: 'A declared reliability proxy for scenario perturbation, not an operating on-time rate.'
    });
  }
  add({
    param_id: `${mode}.conflict_rate`, family: 'mode_parameter', owner_path: `${basePath}.conflict_rate`, current_value: parameters.conflict_rate,
    status: 'agent_proposed', source_ids: methodSources, calibration_dependency: 'dated people-flow, curb and accessibility conflict observation',
    boundary_zh: '声明的冲突代理，只用于暴露待查位置，不是事故率或现场冲突率。', boundary_en: 'A declared conflict proxy to expose locations for checking, not an incident or field conflict rate.'
  });
  const unit = parameters.service_unit;
  add({
    param_id: `${mode}.service_unit.capacity_persons_per_unit`, family: 'service_unit_parameter', owner_path: `${basePath}.service_unit.capacity_persons_per_unit`, current_value: unit.capacity_persons_per_unit,
    status: 'agent_proposed', source_ids: capacitySources, calibration_dependency: 'dated timetable, vehicle and accessible-service capacity audit',
    boundary_zh: '声明的服务单元容量，只用于服务单元账本，不是现有车辆或班次。', boundary_en: 'A declared service-unit capacity for the ledger, not an existing fleet or timetable.'
  });
  add({
    param_id: `${mode}.service_unit.distance_km_per_unit`, family: 'service_unit_parameter', owner_path: `${basePath}.service_unit.distance_km_per_unit`, current_value: unit.distance_km_per_unit,
    status: 'agent_proposed', source_ids: methodSources, calibration_dependency: 'dated route geometry and operator service pattern',
    boundary_zh: '声明的服务单元距离，只用于相对车辆或服务公里计算，不是运营里程。', boundary_en: 'A declared service-unit distance for relative vehicle or service kilometres, not operating mileage.'
  });
}

for (const [profile, groups] of Object.entries(model.mode_weights_by_group)) {
  for (const [group, modes] of Object.entries(groups)) {
    for (const [mode, value] of Object.entries(modes)) {
      add({
        param_id: `mode_weight.${profile}.${group}.${mode}`, family: 'mode_weight', owner_path: `mode_weights_by_group.${profile}.${group}.${mode}`, current_value: value,
        status: 'agent_proposed', source_ids: weightSources, calibration_dependency: 'dated grouped OD, observed mode share and enterprise/resident input',
        boundary_zh: '声明的方式权重，只用于代理人分配和候选比较，不代表居民或员工方式选择。', boundary_en: 'A declared mode weight for assignment and comparison, not resident or employee mode choice.'
      });
    }
  }
}

for (const group of model.synthetic_population.groups) {
  add({
    param_id: `synthetic_population.${group.id}.count`, family: 'synthetic_population', owner_path: `synthetic_population.groups.${group.id}.count`, current_value: group.count,
    status: 'design_target', source_ids: ['HAIDIAN-POPULATION-2024'], calibration_dependency: 'dated population, workforce, care, visitor and service-user evidence',
    boundary_zh: '合成分组配额按区域人口参考值分配，不是人口普查微观数据或 workforce count。', boundary_en: 'A synthetic group quota derived from the regional reference, not census microdata or a workforce count.'
  });
}

const output = {
  schema_version: '0.1.0',
  contract_id: 'MOB-MODE-PARAMETER-PROVENANCE-001',
  model_ref: 'visual/assets/regional-scale-commute.json',
  runner_ref: 'visual/assets/run-regional-commute-simulation.js',
  status: 'provenance_complete_for_declared_inputs',
  field_status: 'not_authorized_not_run',
  observed_count: records.reduce((sum, record) => sum + record.observed_count, 0),
  calibration_debt_count: records.length,
  status_counts: records.reduce((counts, record) => {
    counts[record.status] = (counts[record.status] || 0) + 1;
    return counts;
  }, {}),
  source_boundary_zh: 'source_ids 指向方法或政策背景，不表示外部参数已转移到海淀。current_value 是本包声明输入，必须由有日期的 OD、班次、容量、无障碍和行为资料替换后才能复算。',
  source_boundary_en: 'source_ids point to method or policy context and do not transfer external parameters to Haidian. current_value is a package-declared input that must be replaced by dated OD, service, capacity, accessibility and behaviour evidence before recalculation.',
  records
};

function esc(value) { return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function wrap(value, max) { const chars = [...String(value)]; const lines = []; for (let i = 0; i < chars.length; i += max) lines.push(chars.slice(i, i + max).join('')); return lines.length ? lines : ['']; }
function textLines(value, x, y, cls, max, gap) { return wrap(value, max).map((line, i) => `<text x="${x}" y="${y + i * gap}" class="${cls}">${esc(line)}</text>`).join(''); }

function board(lang) {
  const zh = lang === 'zh';
  const title = zh ? '校准债务与参数溯源' : 'Calibration debt and parameter provenance';
  const subtitle = zh ? '每个方式参数和方式权重都有状态、来源边界与下一项校准依赖' : 'Every mode parameter and mode weight has a status, source boundary and next calibration dependency';
  const labels = zh ? ['声明输入', '方法参考', '待校准', '现场观测'] : ['DECLARED INPUTS', 'METHOD REFERENCES', 'CALIBRATION DEBT', 'FIELD OBSERVATIONS'];
  const numbers = zh ? [records.length, new Set(records.flatMap((record) => record.source_ids)).size, output.calibration_debt_count, output.observed_count] : [records.length, new Set(records.flatMap((record) => record.source_ids)).size, output.calibration_debt_count, output.observed_count];
  const colors = ['#5EA7FF', '#27C499', '#F0A45D', '#B56CFF'];
  const cards = [
    {x: 60, title: zh ? '方式参数' : 'MODE PARAMETERS', body: zh ? '容量、基准时间、可靠性、冲突代理和服务单元字段' : 'Capacity, base time, reliability, conflict proxy and service-unit fields', count: records.filter((record) => record.family === 'mode_parameter' || record.family === 'service_unit_parameter').length},
    {x: 560, title: zh ? '方式权重' : 'MODE WEIGHTS', body: zh ? '五个候选/扰动配置，六类群体，六种方式' : 'Five candidate/stress profiles, six groups and six modes', count: records.filter((record) => record.family === 'mode_weight').length},
    {x: 1060, title: zh ? '合成分组' : 'SYNTHETIC GROUPS', body: zh ? '区域人口参考的合成配额，不是 workforce count' : 'Synthetic quotas from the regional reference, not workforce counts', count: records.filter((record) => record.family === 'synthetic_population').length}
  ];
  const cardMarkup = cards.map((card, index) => `<g transform="translate(${card.x} 420)"><rect width="440" height="200" rx="24" fill="#0B2738" stroke="#24556B" stroke-width="2"/><rect width="440" height="10" rx="5" fill="${colors[index]}"/><text x="28" y="48" class="card-title">${esc(card.title)}</text><text x="28" y="92" class="number">${card.count}</text><text x="112" y="88" class="unit">${esc(zh ? '条声明字段' : 'declared fields')}</text>${textLines(card.body, 28, 132, 'body', zh ? 34 : 48, 20)}<text x="28" y="180" class="small">${esc(zh ? '全部 observed_count = 0' : 'all observed_count = 0')}</text></g>`).join('');
  const metricMarkup = numbers.map((value, index) => `<g transform="translate(${60 + index * 370} 190)"><rect width="330" height="130" rx="20" fill="#071A2B" stroke="${colors[index]}" stroke-width="2"/><text x="24" y="38" class="eyebrow">${esc(labels[index])}</text><text x="24" y="92" class="big-number" fill="${colors[index]}">${value}</text></g>`).join('');
  const footer = zh ? '这是合成输入的可审计账本。参数完成溯源不等于完成现场校准。' : 'This is an auditable ledger for synthetic inputs. Complete provenance is not field calibration.';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="760" viewBox="0 0 1600 760" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(subtitle)}</desc><defs><linearGradient id="bg-${lang}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#071A2B"/><stop offset="1" stop-color="#103C50"/></linearGradient><style>.sans{font-family:PingFang SC,Microsoft YaHei,Arial,sans-serif}.eyebrow{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px;font-weight:900;letter-spacing:1px;fill:#9FC0CF}.title{font-size:31px;font-weight:900;fill:#F5FBFF}.sub{font-size:16px;fill:#B9D0D9}.card-title{font-size:17px;font-weight:900;fill:#F5FBFF}.number{font-size:46px;font-weight:900;fill:#F5FBFF}.big-number{font-size:42px;font-weight:900}.unit{font-size:14px;fill:#66E3CA}.body{font-size:14px;fill:#DCEEF5}.small{font-size:12px;fill:#F0A45D}.footer{font-size:14px;fill:#A9C7D4}</style></defs><rect width="1600" height="760" fill="url(#bg-${lang})"/><circle cx="1510" cy="60" r="230" fill="#1C7771" opacity=".16"/><text x="60" y="54" class="sans eyebrow">MOBILITY COMMONS / INPUT PROVENANCE</text><text x="60" y="104" class="sans title">${esc(title)}</text><text x="60" y="136" class="sans sub">${esc(subtitle)}</text>${metricMarkup}${cardMarkup}<rect x="60" y="665" width="1480" height="54" rx="16" fill="#071A2B" stroke="#24556B"/><text x="88" y="698" class="sans footer">${esc(footer)}</text><text x="1510" y="698" text-anchor="end" class="sans footer">${esc(zh ? `field_status = ${output.field_status}` : `field_status = ${output.field_status}`)}</text></svg>`;
}

fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + '\n');
fs.writeFileSync(path.join(figureDir, 'calibration-debt-board.svg'), board('zh'));
fs.writeFileSync(path.join(figureDir, 'calibration-debt-board.en.svg'), board('en'));

const result = {ok: output.observed_count === 0 && output.calibration_debt_count === records.length, contract_id: output.contract_id, calibration_debt_count: output.calibration_debt_count, observed_count: output.observed_count, status_counts: output.status_counts, generated: ['visual/assets/mode-parameter-provenance.json', 'assets/figures/calibration-debt-board.svg', 'assets/figures/calibration-debt-board.en.svg']};
console.log(JSON.stringify(result, null, 2));
if (process.argv.includes('--check') && !result.ok) process.exit(1);
