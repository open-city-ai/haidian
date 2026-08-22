#!/usr/bin/env node
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const root = __dirname;
const sourceContract = path.join(root, "mobility-public-baseline-contract.json");
const sourceRunner = path.join(root, "run-mobility-public-baseline-contract.js");
const base = JSON.parse(fs.readFileSync(sourceContract, "utf8"));

function runFixture(name, mutate) {
  const fixtureDir = fs.mkdtempSync(path.join(os.tmpdir(), "mobility-baseline-"));
  const fixture = JSON.parse(JSON.stringify(base));
  mutate(fixture);
  fs.writeFileSync(path.join(fixtureDir, "mobility-public-baseline-contract.json"), JSON.stringify(fixture, null, 2));
  const runner = path.join(fixtureDir, "run-mobility-public-baseline-contract.js");
  fs.copyFileSync(sourceRunner, runner);
  const result = spawnSync(process.execPath, [runner, "--json"], { encoding: "utf8" });
  if (result.status === 0) throw new Error(`${name}: malformed fixture unexpectedly passed`);
  return { name, status: result.status };
}

const cases = [
  ["duplicate_prototype", (fixture) => { fixture.prototypes[1].id = fixture.prototypes[0].id; }],
  ["missing_blackout_action", (fixture) => { delete fixture.prototypes[0].blackout_action; }],
  ["field_status_not_hold", (fixture) => { fixture.field_status.decision = "CONTINUE"; }],
  ["overlapping_week", (fixture) => { fixture.phase_sequence[1].weeks[0] = 2; }],
  ["under_counted_curb_windows", (fixture) => { fixture.measurement_plan.curb_observation_windows.minimum_count = 47; }],
  ["proxy_accessibility_review", (fixture) => { fixture.measurement_plan.accessibility_walkthroughs.proxy_substitution_allowed = true; }],
  ["field_value_fabricated", (fixture) => { fixture.measurement_plan.ordinary_route_attempts.field_value = 24; }],
  ["personal_field_allowed", (fixture) => { fixture.data_boundary.prohibited_fields = fixture.data_boundary.prohibited_fields.filter((field) => field !== "precise_person_trace"); }]
];

process.stdout.write(`${JSON.stringify({ ok: true, negative_cases: cases.map(([name, mutate]) => runFixture(name, mutate)) }, null, 2)}\n`);
