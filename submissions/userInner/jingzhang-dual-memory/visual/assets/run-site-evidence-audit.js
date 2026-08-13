const fs = require('fs');
const path = require('path');

const root = __dirname;
const evidence = JSON.parse(fs.readFileSync(path.join(root, 'site-evidence-ledger.json'), 'utf8'));
const field = JSON.parse(fs.readFileSync(path.join(root, 'field-survey-register.json'), 'utf8'));
const errors = [];

const byId = Object.fromEntries(evidence.records.map((record) => [record.id, record]));
if (evidence.records.length !== evidence.summary.official_records) errors.push('official record count mismatch');
if (!evidence.records.every((record) => record.url?.startsWith('https://'))) errors.push('non-HTTPS or missing primary URL');
if (byId['EV-JZ-CONTROL-PLAN-2025'].current_status !== 'departmental_joint_review_passed_approval_not_publicly_evidenced') errors.push('planning status overstated');
if (byId['EV-QINGHE-CONTRACT-2025'].client === byId['EV-DAZHONGSI-LAND-2026'].winning_bidder) errors.push('project client and land-use-right actor conflated');

const qinghe = byId['EV-QINGHE-CONTRACT-2025'];
const qingheRate = Math.round((qinghe.contract_value_cny / qinghe.project_area_sqm) * 100) / 100;
if (Math.abs(qingheRate - qinghe.derived_contract_value_per_sqm_cny) > 0.01) errors.push('Qinghe rate does not recompute');

const dazhongsi = byId['EV-DAZHONGSI-LAND-2026'];
const far = Math.round((dazhongsi.floor_area_cap_sqm / dazhongsi.land_area_sqm) * 10000) / 10000;
if (Math.abs(far - dazhongsi.derived_floor_area_ratio_cap) > 0.0001) errors.push('Dazhongsi FAR cap does not recompute');
if (dazhongsi.parcel_ids.length !== 2 || !dazhongsi.limitation.includes('72 ha')) errors.push('parcel scope limitation missing');
if (field.completed_observations !== 0 || field.routes.some((route) => route.status !== 'planned')) errors.push('unverified fieldwork represented as completed');
if (field.routes.length !== 3 || field.routes.some((route) => route.minimum_observations < 12)) errors.push('field route protocol incomplete');

const result = {
  audit_id: 'DM-SITE-EVIDENCE-AUDIT-V7',
  status: errors.length ? 'FAIL' : 'PASS',
  official_records: evidence.records.length,
  verified_parcel_records: evidence.summary.parcel_level_land_right_records,
  completed_field_observations: field.completed_observations,
  recomputed: { qinghe_contract_cny_per_sqm: qingheRate, dazhongsi_far_cap: far },
  scope: 'public-record and package-logic verification only; no field performance claimed',
  errors
};
console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exit(1);
