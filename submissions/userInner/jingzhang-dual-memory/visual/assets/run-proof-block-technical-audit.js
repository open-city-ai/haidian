const fs = require('fs');
const path = require('path');

const root = __dirname;
const spec = JSON.parse(fs.readFileSync(path.join(root, 'proof-block-technical-spec.json'), 'utf8'));
const blocks = JSON.parse(fs.readFileSync(path.join(root, 'three-proof-blocks.json'), 'utf8'));
const field = JSON.parse(fs.readFileSync(path.join(root, 'field-survey-register.json'), 'utf8'));
const p = spec.prototype;
const zone = Object.fromEntries(p.zones.map((item) => [item.id, item]));
const errors = [];
const checks = [];

function check(id, condition, message) {
  checks.push({id, result: condition ? 'pass' : 'fail'});
  if (!condition) errors.push(message);
}

const widthSum = Math.round(p.zones.reduce((sum, item) => sum + item.width_m, 0) * 10) / 10;
check('TV-01', widthSum === p.total_width_m, 'zone widths do not equal prototype width');
check('TV-02', zone.Z1.width_m >= 4.0, 'ordinary no-AI walk is below 4.0 m');
check('TV-03', zone.Z1.minimum_clear_width_m >= 1.8, 'accessible clear width is below 1.8 m');
check('TV-04', zone.Z3.width_m === 5.0 && zone.Z4.width_m >= 2.5, 'test court separation is incomplete');
check('TV-05', p.safety_and_operations_targets.ordinary_route_open_during_trial && !p.safety_and_operations_targets.account_required_for_ordinary_route, 'ordinary route is not independent');
check('TV-06', p.safety_and_operations_targets.maximum_distance_to_emergency_stop_m <= 15, 'emergency-stop design reach exceeds 15 m');
check('TV-07', p.safety_and_operations_targets.raw_sensor_frame_retention_days === 0, 'raw sensor frames are retained');
check('TV-08', p.safety_and_operations_targets.digital_kit_removal_hours <= 48, 'digital kit removal exceeds 48 h');
check('TV-09', blocks.blocks.length === 3 && blocks.blocks.every((item) => item.fallback && item.status === 'hold'), 'proof-block fallback or HOLD state missing');

const blockLow = blocks.blocks.reduce((sum, item) => sum + item.cost_band_cny.low, 0);
const blockHigh = blocks.blocks.reduce((sum, item) => sum + item.cost_band_cny.high, 0);
const programmeLow = blockLow + blocks.shared_delivery.cost_band_cny.low;
const programmeHigh = blockHigh + blocks.shared_delivery.cost_band_cny.high;
check('TV-10', programmeLow === 7500000 && programmeHigh === 13500000, 'programme cost band does not reconcile');
check('TV-11', field.completed_observations === 0, 'unverified field observations represented as completed');
check('TV-12', spec.summary.field_checks_passed === 0 && spec.summary.release_decision === 'HOLD', 'field result or release status overstated');

const desktop = checks.filter((item) => item.id <= 'TV-10');
const result = {
  audit_id: 'DM-PB01-TECHNICAL-AUDIT-V8',
  status: errors.length ? 'FAIL' : 'PASS',
  recomputed: {
    prototype_width_m: widthSum,
    block_cost_band_cny: [blockLow, blockHigh],
    programme_cost_band_cny: [programmeLow, programmeHigh]
  },
  desktop_checks: `${desktop.filter((item) => item.result === 'pass').length}/${desktop.length} PASS`,
  field_checks: '0/2 NOT RUN',
  release_decision: 'HOLD',
  errors
};
console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exit(1);
