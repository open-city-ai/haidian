#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const input = process.argv[2] || path.join(__dirname, 'human-city-pilot-dossier.json');
const c = JSON.parse(fs.readFileSync(input, 'utf8'));
const errors = [];
const fail = (message) => errors.push(message);
const text = (value) => typeof value === 'string' && value.trim().length > 0;
const positive = (value) => Number.isFinite(value) && value > 0;
const close = (a, b) => Math.abs(a - b) < 0.01;

if (c.design_only !== true || c.decision !== 'HOLD' || c.official_boundary !== false) fail('design boundary changed');
if (c.authorization_count !== 0 || c.field_observation_count !== 0 || c.result_status !== 'not_run') fail('field boundary changed');
if (!text(c.boundary)) fail('boundary statement missing');
if (c.pilot?.pilot_id !== 'HC-PILOT-AIORIGIN-INCLUSIVE-SERVICE' || c.pilot?.site_ref !== 'PROV-KEY-002' || c.pilot?.selected_alternative !== 'ALT-C') fail('pilot identity changed');

const rule = c.dimension_rule || {};
if (rule.status !== 'participant_authored_design_target_calibrated_to_public_standard' || rule.must_recalculate !== true || rule.calibration_source_id !== 'GB-55019-2021') fail('dimension calibration changed');
if (rule.calibration?.internal_accessible_route_min_m !== 0.9 || rule.calibration?.wheelchair_turning_diameter_min_m !== 1.5) fail('accessible calibration changed');
if (JSON.stringify(rule.calibration?.low_counter_surface_range_m) !== JSON.stringify([0.7, 0.85])) fail('low-counter calibration changed');
if (!Array.isArray(rule.recalculation_triggers) || rule.recalculation_triggers.length < 6) fail('recalculation triggers missing');

const spatial = c.spatial_dossier || {};
if (JSON.stringify(spatial.scale_chain) !== JSON.stringify(['1:500', '1:100', '1:50'])) fail('scale chain changed');
const plan = spatial.plan_1_500 || {};
if (!Array.isArray(plan.envelope_m) || !plan.envelope_m.every(positive)) fail('plan envelope invalid');
if (!Array.isArray(plan.modules) || plan.modules.length < 7) fail('plan modules missing');
if ((plan.modules || []).some((m) => !text(m.id) || !text(m.name_zh) || !text(m.name_en) || !positive(m.width_m) || !positive(m.depth_m) || m.state !== 'design_target')) fail('plan module invalid');
const ordinaryRoute = (plan.modules || []).find((m) => m.id === 'P01');
if (!ordinaryRoute || ordinaryRoute.width_m < rule.calibration.internal_accessible_route_min_m) fail('ordinary route below accessible calibration');
if (plan.ordinary_machine_crossings !== 0 || plan.release_capacity !== null || !text(plan.capacity_formula)) fail('plan safety/capacity boundary changed');
if (plan.wheelchair_turning_diameter_m < rule.calibration.wheelchair_turning_diameter_min_m) fail('turning diameter below calibration');
const section = spatial.section_1_100 || {};
if (!positive(section.clear_height_m) || section.door_clear_width_m < 0.9 || section.wheelchair_turning_diameter_m < 1.5) fail('section dimensions invalid');
if (!Array.isArray(section.bands) || section.bands.length !== 4 || section.bands.some((b) => !positive(b.width_m) || b.state !== 'design_target')) fail('section bands invalid');
if (!text(section.blackout_rule)) fail('section blackout rule missing');
const detail = spatial.detail_1_50 || {};
if (!Array.isArray(detail.elements) || detail.elements.length !== 5 || detail.elements.some((d) => d.state !== 'design_target')) fail('detail elements invalid');
const counter = detail.elements.find((d) => d.id === 'D01')?.target_m;
if (!(counter >= 0.7 && counter <= 0.85)) fail('counter outside calibrated range');
const control = detail.elements.find((d) => d.id === 'D03')?.target_m;
if (!(control >= 0.85 && control <= 1.1)) fail('control outside calibrated range');
if (!text(detail.closeout_rule)) fail('detail closeout rule missing');
if (!Array.isArray(spatial.conflict_resolution) || spatial.conflict_resolution.length < 5 || spatial.conflict_resolution.some((x) => !text(x.conflict) || !text(x.design_response) || !text(x.gate))) fail('conflict resolutions missing');

const delivery = c.delivery_contract || {};
if (delivery.delivery_state !== 'pre_authorization_design_estimate' || delivery.organization_status !== 'unconfirmed') fail('delivery boundary changed');
if (!Array.isArray(delivery.schedule) || delivery.schedule.length !== 6 || delivery.schedule.some((s, i) => !Array.isArray(s.predecessors) || (i > 0 && !s.predecessors.length) || !text(s.release_gate))) fail('schedule dependency logic invalid');
if (!Array.isArray(delivery.raci) || delivery.raci.length < 5 || delivery.raci.some((r) => r.status !== 'role_unconfirmed' || ['asset','responsible','accountable','consulted','informed'].some((k) => !text(r[k])))) fail('RACI invalid');
if (!text(delivery.procurement?.method) || !Array.isArray(delivery.procurement?.sequence) || delivery.procurement.sequence.length < 6 || !text(delivery.procurement?.forbidden)) fail('procurement invalid');

function estimateValid(e, reserveKey) {
  if (!Array.isArray(e?.line_items) || e.line_items.length < 4) return false;
  if (e.line_items.some((i) => !positive(i.quantity) || !positive(i.unit_rate_lower) || !positive(i.unit_rate_upper) || i.unit_rate_upper < i.unit_rate_lower || !text(i.unit))) return false;
  const low = e.line_items.reduce((s, i) => s + i.quantity * i.unit_rate_lower, 0) * (1 + e[reserveKey]);
  const high = e.line_items.reduce((s, i) => s + i.quantity * i.unit_rate_upper, 0) * (1 + e[reserveKey]);
  return close(low, e.lower) && close(high, e.upper) && text(e.formula) && /^low_design_estimate_not_/.test(e.confidence);
}
if (!estimateValid(delivery.capex_design_estimate_cny, 'contingency_rate')) fail('CAPEX quantity-rate formula invalid');
if (!estimateValid(delivery.monthly_opex_design_estimate_cny, 'reserve_rate')) fail('OPEX quantity-rate formula invalid');
if (!Array.isArray(delivery.service_level_targets) || delivery.service_level_targets.length !== 5 || delivery.service_level_targets.some((s) => s.basis !== 'design_target_not_observed')) fail('SLA boundary invalid');
if (!text(delivery.insurance_gate) || !text(delivery.acceptance_gate) || !text(delivery.rollback)) fail('delivery gates missing');

if (c.field_acceptance?.status !== 'not_run' || !Array.isArray(c.field_acceptance?.required_but_missing) || c.field_acceptance.required_but_missing.length < 6) fail('field acceptance boundary invalid');

if (errors.length) {
  console.error('FAIL Human City pilot dossier');
  errors.forEach((e) => console.error(`- ${e}`));
  process.exit(1);
}
console.log(JSON.stringify({status:'PASS', decision:c.decision, pilot_id:c.pilot.pilot_id, scales:spatial.scale_chain.length, plan_modules:plan.modules.length, conflict_resolutions:spatial.conflict_resolution.length, schedule_stages:delivery.schedule.length, raci_assets:delivery.raci.length, sla_targets:delivery.service_level_targets.length, capex:[delivery.capex_design_estimate_cny.lower,delivery.capex_design_estimate_cny.upper], monthly_opex:[delivery.monthly_opex_design_estimate_cny.lower,delivery.monthly_opex_design_estimate_cny.upper], field_acceptance:c.field_acceptance.status}, null, 2));
