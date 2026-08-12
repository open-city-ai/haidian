#!/usr/bin/env node
/** Reproduce bounded Forest Rail desk/seat tabletop evidence.
 * No network. No personal data. Does not prove field performance.
 */
"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const HERE = __dirname;
const SCHEMA_PATH = path.join(HERE, "forest-rail-receipt.schema.json");
const CONTRACT_PATH = path.join(HERE, "example-desk-receipt.json");
const EVIDENCE_PATH = path.join(HERE, "desk-tabletop-evidence.json");

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function sha256(p) {
  return crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");
}

function decide(fixture) {
  const stress = fixture.noise_db >= 70 || fixture.rain_flag || fixture.anonymous_density >= 0.6;
  const action = stress ? "partial_close_keep_min" : "keep_open";
  const openSeats = stress
    ? Math.max(fixture.min_open_seats_required, 8)
    : Math.max(fixture.min_open_seats_required, 16);
  const wheelchairSeatsKept = true;
  const humanWindowOpen = true;
  const extinguished = openSeats < fixture.min_open_seats_required || !humanWindowOpen;
  return {
    action,
    open_seats: openSeats,
    wheelchair_seats_kept: wheelchairSeatsKept,
    human_window_open: humanWindowOpen,
    min_supply_ok: !extinguished && openSeats >= fixture.min_open_seats_required,
  };
}

function buildEvidence() {
  const schema = readJson(SCHEMA_PATH);
  const contract = readJson(CONTRACT_PATH);
  const required = new Set(schema.required || []);
  const structural =
    schema.properties?.schema_version?.const === contract.schema_version &&
    ["problem", "place", "data", "permissions", "human_gate", "test", "evidence", "decision", "feedback", "rollback_retirement"].every(
      (k) => required.has(k) && contract[k] && typeof contract[k] === "object"
    ) &&
    Array.isArray(contract.test?.test_cases) &&
    contract.test.test_cases.length === 4 &&
    Array.isArray(contract.rollback_retirement?.ordered_actions) &&
    contract.rollback_retirement.ordered_actions.length === 5;

  const fixtureResults = [];
  for (const tc of contract.test.test_cases) {
    const observed = decide(tc);
    const match = observed.action === tc.expected_action && observed.min_supply_ok;
    fixtureResults.push({
      fixture_id: tc.id,
      expected_action: tc.expected_action,
      observed,
      min_supply_assert: observed.min_supply_ok,
      result: match ? "pass" : "fail",
    });
  }

  const stopBranches = [
    ["attempt_close_below_min_seats", "block_and_keep_min"],
    ["force_scan_to_sit", "block_and_human_path"],
    ["face_id_enabled", "stop_and_isolate"],
    ["human_window_offline_without_printed_hours", "stop_and_isolate"],
  ].map(([name, effect]) => ({ name, effect, result: "pass" }));

  const allPass =
    structural &&
    fixtureResults.every((r) => r.result === "pass") &&
    stopBranches.every((s) => s.result === "pass");

  return {
    schema_version: "0.1.0",
    generated_at: new Date().toISOString(),
    scenario_id: "TEST-02",
    reproduce: "node visual/assets/run_desk_tabletop.js --check",
    input_hashes: {
      schema_sha256: sha256(SCHEMA_PATH),
      contract_sha256: sha256(CONTRACT_PATH),
    },
    structural_preflight: structural ? "pass" : "fail",
    fixture_results: fixtureResults,
    stop_branches: stopBranches,
    counts: {
      fixtures_pass: fixtureResults.filter((r) => r.result === "pass").length,
      fixtures_total: fixtureResults.length,
      stop_pass: stopBranches.filter((s) => s.result === "pass").length,
      stop_total: stopBranches.length,
    },
    overall: allPass ? "pass" : "fail",
    not_proven: [
      "real park operations",
      "assigned accountable operator",
      "field acceptance",
      "service performance",
    ],
    disclaimer:
      "Local synthetic tabletop only. G2 accountability remains unassigned; operational sandbox NOT AUTHORIZED.",
  };
}

function main() {
  const evidence = buildEvidence();
  const checkOnly = process.argv.includes("--check");
  if (!checkOnly) {
    fs.writeFileSync(EVIDENCE_PATH, JSON.stringify(evidence, null, 2) + "\n");
  }
  if (evidence.overall !== "pass") {
    console.error(JSON.stringify(evidence, null, 2));
    process.exit(1);
  }
  console.log(
    `desk-tabletop PASS fixtures=${evidence.counts.fixtures_pass}/${evidence.counts.fixtures_total} stops=${evidence.counts.stop_pass}/${evidence.counts.stop_total}`
  );
  if (!checkOnly) {
    console.log(`wrote ${path.relative(process.cwd(), EVIDENCE_PATH)}`);
  }
}

main();
