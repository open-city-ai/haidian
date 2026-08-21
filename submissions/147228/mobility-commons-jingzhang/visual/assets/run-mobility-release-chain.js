#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function readJson(root, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function validate(root) {
  const checks = [];
  const fail = (id, detail) => checks.push({ id, ok: false, detail });
  const pass = (id, detail) => checks.push({ id, ok: true, detail });
  let first168;
  let first12;
  let evidenceMap;
  try {
    first168 = readJson(root, 'visual/assets/mobility-first-168h.json');
    pass('load_first_168h', 'first-168h contract parsed');
  } catch (error) {
    fail('load_first_168h', error.message);
  }
  try {
    first12 = readJson(root, 'visual/assets/mobility-first-12-weeks.json');
    pass('load_first_12_weeks', 'first-12-weeks contract parsed');
  } catch (error) {
    fail('load_first_12_weeks', error.message);
  }
  try {
    evidenceMap = readJson(root, 'visual/assets/mobility-release-evidence-map.json');
    pass('load_evidence_map', 'review evidence map parsed');
  } catch (error) {
    fail('load_evidence_map', error.message);
  }
  for (const [id, value] of [['first_168h', first168], ['first_12_weeks', first12], ['evidence_map', evidenceMap]]) {
    if (!value) continue;
    if (value.status === 'design_only') pass(`${id}_design_boundary`, 'status=design_only');
    else fail(`${id}_design_boundary`, 'status must remain design_only');
    if (value.authorization === 0 && value.field_observations === 0 && value.result_status === 'not_run') {
      pass(`${id}_no_field_claim`, 'authorization=0, field_observations=0, result_status=not_run');
    } else {
      fail(`${id}_no_field_claim`, 'field or authorization state is not fail-closed');
    }
  }
  if (first168) {
    const ids = (first168.horizons || []).map(item => item.id);
    if (ids.length === 4 && new Set(ids).size === 4) pass('four_168h_horizons', ids.join(', '));
    else fail('four_168h_horizons', 'expected four unique horizons');
    for (const item of first168.horizons || []) {
      if (item.window && item.objective && item.owner_role && item.acceptance_checks?.length && item.stop_conditions?.length && item.public_artifact) {
        pass(`horizon_${item.id}`, 'owner, acceptance, stop and artifact fields present');
      } else {
        fail(`horizon_${item.id || 'missing'}`, 'horizon is missing a required delivery field');
      }
    }
    if (first168.decision?.default === 'HOLD' && first168.decision?.forbidden_shortcut) pass('168h_default_hold', 'default decision is HOLD');
    else fail('168h_default_hold', '168-hour chain must default to HOLD');
  }
  if (first12) {
    const ids = (first12.weeks || []).map(item => item.id);
    if (ids.length === 6 && new Set(ids).size === 6) pass('six_12_week_windows', ids.join(', '));
    else fail('six_12_week_windows', 'expected six unique two-week windows');
    for (const item of first12.weeks || []) {
      if (item.gate && item.owner_role && item.evidence_required?.length && item.stop_conditions?.length && item.fallback) {
        pass(`week_${item.id}`, 'gate, owner, evidence, stop and fallback fields present');
      } else {
        fail(`week_${item.id || 'missing'}`, 'two-week window is missing a required delivery field');
      }
    }
    if (first12.default_decision === 'HOLD' && first12.release_rule) pass('12w_default_hold', '12-week chain is non-authorizing');
    else fail('12w_default_hold', '12-week chain must default to HOLD and state its boundary');
  }
  if (evidenceMap) {
    const ids = (evidenceMap.dimensions || []).map(item => item.id);
    if (ids.length >= 7 && new Set(ids).size === ids.length) pass('review_dimensions', `${ids.length} unique review dimensions`);
    else fail('review_dimensions', 'expected at least seven unique review dimensions');
    for (const item of evidenceMap.dimensions || []) {
      if (item.review_question && item.artifact_refs?.length && item.current_status && Array.isArray(item.field_claims) && item.field_claims.length === 0) {
        pass(`dimension_${item.id}`, 'question, artifact refs and empty field-claim list present');
      } else {
        fail(`dimension_${item.id || 'missing'}`, 'review dimension is missing a boundary field');
      }
      for (const artifact of item.artifact_refs || []) {
        if (fs.existsSync(path.join(root, artifact))) pass(`artifact_${item.id}_${artifact}`, 'artifact exists');
        else fail(`artifact_${item.id}_${artifact}`, `missing artifact: ${artifact}`);
      }
    }
    if (evidenceMap.global_boundary) pass('review_map_boundary', 'global boundary present');
    else fail('review_map_boundary', 'global boundary missing');
  }
  return { ok: checks.every(check => check.ok), checks };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const rootIndex = args.indexOf('--root');
  const root = rootIndex >= 0 ? path.resolve(args[rootIndex + 1]) : path.resolve(__dirname, '..', '..');
  const result = validate(root);
  if (args.includes('--json')) console.log(JSON.stringify(result, null, 2));
  else result.checks.forEach(check => console.log(`${check.ok ? 'PASS' : 'FAIL'} ${check.id}: ${check.detail}`));
  process.exit(result.ok ? 0 : 1);
}

module.exports = { validate };
