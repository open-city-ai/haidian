#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const payload = JSON.parse(fs.readFileSync(path.join(__dirname, "synthetic-work-fixtures.json"), "utf8"));
const records = payload.records.map((record) => JSON.parse(JSON.stringify(record)));
if (process.argv.includes("--tamper-example")) records[0].after.wage = 90;
const equal = (record) => JSON.stringify(record.before) === JSON.stringify(record.after);
const actual = records.map((record) => ({
  id: record.id,
  ordinary_work_continues: true,
  condition_equal: equal(record),
  sensor_state: record.sensor_overreach ? "HOLD" : "CLEAR",
  derivative_state: record.derivative_dispute ? "DISABLED" : "CLEAR",
}));
const failures = [];
for (let index = 0; index < records.length; index += 1) {
  const expected = records[index].expected;
  for (const key of Object.keys(expected)) {
    if (actual[index][key] !== expected[key]) failures.push(`${records[index].id}:${key}`);
  }
}
const suites = {
  ordinary_work_continuity: actual.filter((item) => item.ordinary_work_continues).length === 60,
  anti_retaliation_equality: records.slice(0, 20).every((_, index) => actual[index].condition_equal),
  sensor_overreach_hold: records.slice(20, 32).every((_, offset) => actual[offset + 20].sensor_state === "HOLD"),
  derivative_disablement: records.slice(32, 40).every((_, offset) => actual[offset + 32].derivative_state === "DISABLED"),
};
for (const [name, passed] of Object.entries(suites)) if (!passed) failures.push(name);
console.log(JSON.stringify({fixture_count: records.length, suites, failures}, null, 2));
process.exit(failures.length ? 1 : 0);
