#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const contract = JSON.parse(fs.readFileSync(path.join(__dirname, 'mobility-public-baseline-contract.json'), 'utf8'));
const checks = [];
function check(id, ok, detail) { checks.push({ id, ok: Boolean(ok), detail }); }

const expectedStates = ['BASE', 'BOOST', 'BLACKOUT', 'BEQUEST'];
const prototypes = Array.isArray(contract.prototypes) ? contract.prototypes : [];
const phases = Array.isArray(contract.phase_sequence) ? contract.phase_sequence : [];
check('four_public_states', JSON.stringify((contract.states || []).map((item) => item.id)) === JSON.stringify(expectedStates), 'BASE/BOOST/BLACKOUT/BEQUEST');
check('three_spatial_prototypes', prototypes.length === 3, `${prototypes.length}/3`);
check('unique_prototype_ids', new Set(prototypes.map((item) => item.id)).size === prototypes.length, 'unique prototype IDs');
check('prototype_contract_fields', prototypes.every((item) => item.key_area && item.ordinary_service && item.ai_boost && item.blackout_action && item.bequest_asset && item.responsible_role), 'ordinary, boost, blackout, bequest and responsibility fields');
check('prototype_stop_conditions', prototypes.every((item) => Array.isArray(item.stop_conditions) && item.stop_conditions.length >= 2), 'each prototype has stop conditions');
check('five_phase_sequence', phases.length === 5 && phases.map((item) => item.id).join(',') === 'P0,P1,P2,P3,P4', 'P0 to P4');
check('ordinary_service_first', prototypes.every((item) => typeof item.ordinary_service === 'string' && item.ordinary_service.length > 10), 'ordinary service is explicit');
check('fail_closed_field_boundary', contract.field_status?.authorization === 0 && contract.field_status?.field_observations === 0 && contract.field_status?.local_baseline === 'unknown' && contract.field_status?.performance_results === null && contract.field_status?.decision === 'HOLD', 'authorization=0, observations=0, unknown/null/HOLD');

const failed = checks.filter((item) => !item.ok);
const result = { ok: failed.length === 0, checks, summary: { states: contract.states?.length || 0, prototypes: prototypes.length, phases: phases.length, decision: contract.field_status?.decision }, boundary: contract.boundary };
if (process.argv.includes('--json')) process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
else {
  process.stdout.write(`${result.ok ? 'PASS' : 'FAIL'} mobility public baseline contract ${checks.length - failed.length}/${checks.length}\n`);
  for (const item of checks) process.stdout.write(`${item.ok ? 'PASS' : 'FAIL'} ${item.id}: ${item.detail}\n`);
}
process.exitCode = result.ok ? 0 : 1;
