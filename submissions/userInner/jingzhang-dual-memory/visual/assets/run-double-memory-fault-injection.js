const fs = require('fs');
const path = require('path');

const source = JSON.parse(fs.readFileSync(path.join(__dirname, 'double-memory-fault-injection.json'), 'utf8'));
const errors = [];
const results = [];

function evaluate(contract) {
  const missing = source.release_fields.filter((item) => !contract[item.field]).map((item) => item.id);
  return missing.length
    ? {decision: 'BLOCKED_MISSING_FIELD', missing}
    : {decision: 'ELIGIBLE_FOR_FIELD_REVIEW', missing: []};
}

for (const scenario of source.scenarios) {
  const complete = Object.fromEntries(source.release_fields.map((item) => [item.field, true]));
  const baseline = evaluate(complete);
  results.push({case_id: `${scenario.id}-BASE`, type: 'complete_contract', result: baseline.decision});
  if (baseline.decision !== source.test_protocol.expected_complete_contract_result) errors.push(`${scenario.id} complete contract rejected`);

  for (const field of source.release_fields) {
    const deficient = {...complete, [field.field]: false};
    const outcome = evaluate(deficient);
    results.push({case_id: `${scenario.id}-MISS-${field.id}`, type: 'single_field_omission', result: outcome.decision});
    if (outcome.decision !== source.test_protocol.expected_omission_result || outcome.missing.join() !== field.id) {
      errors.push(`${scenario.id} did not block ${field.id}`);
    }
  }
}

for (const fault of source.fault_cards) {
  const hasFallback = typeof fault.required_response === 'string' && fault.required_response.length > 0;
  results.push({case_id: fault.id, type: 'cross_cutting_fault', result: hasFallback ? 'SAFE_FALLBACK_HOLD' : 'UNSAFE'});
  if (!hasFallback) errors.push(`${fault.id} lacks safe fallback`);
}

const counts = {
  complete_contract: results.filter((item) => item.type === 'complete_contract').length,
  single_field_omission: results.filter((item) => item.type === 'single_field_omission').length,
  cross_cutting_fault: results.filter((item) => item.type === 'cross_cutting_fault').length,
  passed: results.filter((item) => item.result !== 'UNSAFE').length,
  total: results.length
};

if (counts.complete_contract !== 12 || counts.single_field_omission !== 96 || counts.cross_cutting_fault !== 12 || counts.total !== 120) {
  errors.push(`unexpected case counts: ${JSON.stringify(counts)}`);
}
if (source.test_protocol.field_performance_tests_passed !== 0 || source.test_protocol.release_decision !== 'HOLD') {
  errors.push('synthetic tests must not create a field pass or release');
}

const output = {
  audit_id: 'DM-FAULT-INJECTION-AUDIT-V9',
  status: errors.length ? 'FAIL' : 'PASS',
  synthetic_negative_tests: `${counts.passed}/${counts.total} PASS`,
  contract_cases: `${counts.complete_contract}/12 ELIGIBLE FOR FIELD REVIEW`,
  omission_cases: `${counts.single_field_omission}/96 BLOCKED`,
  fault_cases: `${counts.cross_cutting_fault}/12 SAFE FALLBACK + HOLD`,
  field_performance: '0/2 NOT RUN',
  release_decision: 'HOLD',
  errors
};

console.log(JSON.stringify(output, null, 2));
if (errors.length) process.exit(1);
