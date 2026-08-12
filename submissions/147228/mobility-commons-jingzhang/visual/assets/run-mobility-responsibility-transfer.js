#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = __dirname;
const file = path.join(root, 'mobility-responsibility-transfer.json');
const contract = JSON.parse(fs.readFileSync(file, 'utf8'));
const checks = [];
function check(id, ok, detail) {
  checks.push({ id, ok: Boolean(ok), detail });
}

const units = contract.resource_units || [];
check('seven_resource_units', units.length === 7, `${units.length}/7`);
check('unique_unit_ids', new Set(units.map((item) => item.id)).size === units.length, 'unique IDs');
check(
  'resource_denominators',
  units.every((item) => Array.isArray(item.denominator) && item.denominator.length >= 3),
  'each unit has at least three denominators'
);
check(
  'evidence_and_refusal',
  units.every((item) => item.evidence_required?.length >= 2 && item.refusal_condition && item.writeback),
  'evidence, refusal and writeback are present'
);
check(
  'non_ai_equivalence',
  units.every((item) => typeof item.non_ai_equivalent === 'string' && item.non_ai_equivalent.length > 10),
  'all interfaces have a non-AI equivalent'
);
check(
  'coverage_groups',
  Array.isArray(contract.coverage_groups) && contract.coverage_groups.length === 8,
  `${contract.coverage_groups?.length || 0}/8 groups`
);
check(
  'writeback_schema',
  Array.isArray(contract.writeback_fields) && contract.writeback_fields.includes('next_decision') && contract.writeback_fields.includes('fallback_route'),
  'event, responsibility, fallback and decision fields'
);
check(
  'fail_closed_boundary',
  contract.status === 'conceptual_contract_not_authorized' && contract.review_surface?.field_status === 'HOLD' && contract.offline_evidence?.real_authorization === 0,
  'field HOLD and authorization 0'
);

const failed = checks.filter((item) => !item.ok);
const result = {
  ok: failed.length === 0,
  checks,
  summary: {
    resource_units: units.length,
    coverage_groups: contract.coverage_groups?.length || 0,
    real_transfers_accepted: contract.review_surface?.real_transfers_accepted,
    real_authorization: contract.offline_evidence?.real_authorization,
    field_status: contract.review_surface?.field_status,
  },
  boundary: contract.boundary,
};
if (process.argv.includes('--json')) {
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
} else {
  process.stdout.write(`${result.ok ? 'PASS' : 'FAIL'} mobility responsibility transfer ${checks.length - failed.length}/${checks.length}\n`);
  for (const item of checks) process.stdout.write(`${item.ok ? 'PASS' : 'FAIL'} ${item.id}: ${item.detail}\n`);
}
process.exitCode = result.ok ? 0 : 1;
