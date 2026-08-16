#!/usr/bin/env node
"use strict";

// Proves that reproduce_physarum.js actually detects corruption of the published
// computation record, rather than passing because it never really compares anything.
//
// The computation under test is the Seeded Kruskal minimum-spanning-tree topology and
// selection-instability probe over hand-declared candidate edges.
//
// Fourteen tamper cases plus one clean baseline run. Seven cases corrupt the declarations,
// the inputs, the per-run record, or the coordinates. The other seven corrupt one derived
// metric each, so every field the reproducer claims to recompute is proven to be recomputed
// rather than copied: a derived case is only accepted if the reproducer fails, reports
// exactly one mismatch, files it under derived_metrics, and names the exact field that
// was rewritten.
//
// Every case runs in a throwaway temp directory holding a copy of the reproducer and
// a copy of the two assets. Only the copies are mutated. The two frozen assets and the
// reproducer itself are hashed before the suite and re-checked after every single case,
// so a case that reached back into the package would be caught at once rather than at
// the end.
//
// Usage: node test-reproducer-tamper.js

const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const HERE = __dirname;
const REPRODUCER = path.join(HERE, "reproduce_physarum.js");
const INPUTS = path.join(HERE, "physarum-inputs.json");
const RUNS = path.join(HERE, "physarum-runs.json");

const METHOD_NAME_EN = "Seeded Kruskal minimum-spanning-tree topology and selection-instability probe over hand-declared candidate edges.";

// Recorded from the frozen assets. A change here without a matching, separately
// justified change to the assets themselves is itself a defect.
const FROZEN_SHA256 = {
  "physarum-inputs.json": "5e5a9be65bb122617798bf488f12fc5838dfba46aead6d824b679b48db718d53",
  "physarum-runs.json": "ea93df307c30bd90024438ed1dc4704a4e7bec8f4b456a7ec323c914ea4e06fe",
};

const EXPECTED_CLEAN_COMPARISONS = 633;
const EXPECTED_DERIVED_METRICS = 7;
const EXPECTED_CASES_RUN = 15;
// The reproducer must cite these two package-relative locations whatever directory it is
// launched from, so a reader can quote one stable path.
const EXPECTED_ASSET_PATHS = {
  inputs: "visual/assets/physarum-inputs.json",
  runs: "visual/assets/physarum-runs.json",
};

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function hashFrozen() {
  const observed = {};
  for (const name of Object.keys(FROZEN_SHA256)) observed[name] = sha256(path.join(HERE, name));
  return observed;
}

// Re-run after every case, not only at the end, so the first case that disturbs the
// package is named instead of being blamed on whichever case happened to run last.
function checkUntouched(stage, reproducerSha256, failures) {
  const frozen = hashFrozen();
  for (const [name, expected] of Object.entries(FROZEN_SHA256)) {
    if (frozen[name] !== expected) failures.push(`${stage}: ${name} changed on disk (${frozen[name]})`);
  }
  const reproducer = sha256(REPRODUCER);
  if (reproducer !== reproducerSha256) {
    failures.push(`${stage}: reproduce_physarum.js changed on disk (${reproducer})`);
  }
  return {
    frozen_unchanged: Object.entries(FROZEN_SHA256).every(([name, expected]) => frozen[name] === expected),
    reproducer_unchanged: reproducer === reproducerSha256,
  };
}

function runIn(directory) {
  const result = spawnSync(process.execPath, [path.join(directory, "reproduce_physarum.js")], {
    encoding: "utf8",
    cwd: directory,
  });
  if (result.error) throw result.error;
  let parsed = null;
  try {
    parsed = JSON.parse(result.stdout);
  } catch {
    throw new Error(`reproducer did not emit JSON: ${result.stdout.slice(0, 400)}`);
  }
  return { exitCode: result.status, payload: parsed };
}

// mutate receives the two parsed assets and edits them in place.
function withTamperedCopy(mutate) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "ajz-tamper-"));
  try {
    const inputs = JSON.parse(fs.readFileSync(INPUTS, "utf8"));
    const runs = JSON.parse(fs.readFileSync(RUNS, "utf8"));
    mutate(inputs, runs);
    fs.copyFileSync(REPRODUCER, path.join(directory, "reproduce_physarum.js"));
    fs.writeFileSync(path.join(directory, "physarum-inputs.json"), JSON.stringify(inputs, null, 2));
    fs.writeFileSync(path.join(directory, "physarum-runs.json"), JSON.stringify(runs, null, 2));
    return runIn(directory);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

// One case per derived metric the reproducer claims to recompute. The tamper is applied to
// the value actually present in the frozen record and is rejected if it fails to change it,
// so a case can never pass by mutating nothing.
//
// Numbered M for metric. D01-D17 is the external-evidence gate namespace this package
// publishes, and a case id of D01 here turns any audit of gate coverage into a false hit.
const DERIVED_FIELD_CASES = [
  ["M01", "persistent_corridor_count", (value) => value + 1],
  ["M02", "disagreement_corridor_count", (value) => value + 1],
  ["M03", "selected_corridor_count", (value) => value + 1],
  ["M04", "mean_persistent_frequency", (value) => Number((value + 0.05).toFixed(6))],
  ["M05", "disagreement_share", (value) => Number((value + 0.05).toFixed(6))],
  ["M06", "mean_pair_detour_factor", (value) => Number((value + 0.05).toFixed(6))],
  ["M07", "single_edge_loss_efficiency_retention", (value) => Number((value + 0.05).toFixed(6))],
];

function derivedCase([prefix, field, tamper]) {
  return {
    id: `${prefix}_${field}`,
    why: `a hand-edited ${field} must be rejected by name, proving the reproducer recomputes it`,
    expect_exit: 1,
    expect_category: "derived_metrics",
    expect_field: field,
    expect_mismatch_count: 1,
    mutate: (_inputs, runs) => {
      const metrics = runs.derived_metrics;
      if (!metrics || !(field in metrics)) {
        throw new Error(`derived_metrics.${field} is absent from the frozen record`);
      }
      const before = metrics[field];
      metrics[field] = tamper(before);
      if (metrics[field] === before) {
        throw new Error(`the tamper of derived_metrics.${field} did not change the value`);
      }
    },
  };
}

const CASES = [
  {
    id: "T01_selection_frequency",
    why: "a rewritten edge selection frequency must be caught",
    expect_category: "selection_frequencies",
    expect_exit: 1,
    expect_mismatch_count: 1,
    mutate: (inputs) => {
      inputs.edges[0].selection_frequency = Number(
        (inputs.edges[0].selection_frequency + 0.05).toFixed(6),
      );
    },
  },
  {
    id: "T02_edge_status",
    why: "a relabelled persistent/disagreement status must be caught",
    expect_category: "edge_statuses",
    expect_exit: 1,
    expect_mismatch_count: 1,
    mutate: (inputs) => {
      const edge = inputs.edges.find((item) => item.status === "disagreement_candidate");
      edge.status = "persistent_candidate";
    },
  },
  {
    id: "T03_selected_edge_order",
    why: "a reordered per-run selected edge list must be caught",
    expect_category: "run_selected_edge_order",
    expect_exit: 1,
    expect_mismatch_count: 1,
    mutate: (_inputs, runs) => {
      const selected = runs.run_records[0].selected_edges;
      [selected[0], selected[1]] = [selected[1], selected[0]];
    },
  },
  {
    id: "T04_run_weight",
    why: "a rewritten per-run weight must be caught",
    expect_category: "run_weights",
    expect_exit: 1,
    expect_mismatch_count: 1,
    mutate: (_inputs, runs) => {
      runs.run_records[3].weights.length += 0.01;
    },
  },
  {
    id: "T05_method_id",
    why: "a swapped method identifier must be caught",
    expect_category: "asset_declarations",
    expect_exit: 1,
    expect_mismatch_count: 1,
    mutate: (inputs) => {
      inputs.method_id = "adaptive_jingzhang.some_other_method.v9";
    },
  },
  {
    id: "T06_edge_derivation",
    why: "a rewritten normalized length must be caught",
    expect_category: "input_edge_derivations",
    expect_exit: 1,
    expect_mismatch_count: 1,
    mutate: (inputs) => {
      inputs.edges[2].length_norm = Number((inputs.edges[2].length_norm * 1.1).toFixed(6));
    },
  },
  {
    id: "T07_incoherent_coordinates",
    why: "coordinates that no longer explain the published lengths must abort, not be guessed around",
    expect_exit: 2,
    expect_error_type: "asset_or_configuration_error",
    mutate: (inputs) => {
      inputs.nodes[4].x_normalized += 0.2;
    },
  },
  ...DERIVED_FIELD_CASES.map(derivedCase),
];

function main() {
  const failures = [];
  const results = [];

  const frozenBefore = hashFrozen();
  for (const [name, expected] of Object.entries(FROZEN_SHA256)) {
    if (frozenBefore[name] !== expected) {
      throw new Error(`before: ${name} does not match its recorded hash (${frozenBefore[name]})`);
    }
  }
  // Captured once, from the amended reproducer on disk, and re-asserted after every case.
  const reproducerSha256 = sha256(REPRODUCER);

  const clean = runIn(HERE);
  if (clean.exitCode !== 0 || clean.payload.status !== "PASS") {
    failures.push(`baseline: expected PASS/0, got ${clean.payload.status}/${clean.exitCode}`);
  }
  if (clean.payload.summary?.comparisons !== EXPECTED_CLEAN_COMPARISONS) {
    failures.push(
      `baseline: expected ${EXPECTED_CLEAN_COMPARISONS} comparisons, `
      + `got ${clean.payload.summary?.comparisons}`,
    );
  }
  if (clean.payload.comparison_counts?.derived_metrics !== EXPECTED_DERIVED_METRICS) {
    failures.push(
      `baseline: expected ${EXPECTED_DERIVED_METRICS} derived metrics, `
      + `got ${clean.payload.comparison_counts?.derived_metrics}`,
    );
  }
  for (const [key, expected] of Object.entries(EXPECTED_ASSET_PATHS)) {
    if (clean.payload.assets?.[key] !== expected) {
      failures.push(`baseline: assets.${key} must serialize as "${expected}", got "${clean.payload.assets?.[key]}"`);
    }
  }
  const baselineIntegrity = checkUntouched("T00_baseline", reproducerSha256, failures);
  results.push({
    id: "T00_baseline",
    why: "the untampered package must reproduce its own record before any tamper is trusted",
    status: clean.payload.status,
    exit_code: clean.exitCode,
    comparisons: clean.payload.summary?.comparisons,
    mismatch_count: clean.payload.mismatch_count,
    ...baselineIntegrity,
  });

  for (const testCase of CASES) {
    const { exitCode, payload } = withTamperedCopy(testCase.mutate);
    const mismatches = payload.mismatches ?? [];
    const categories = Array.from(new Set(mismatches.map((item) => item.category))).sort();
    const fields = Array.from(new Set(mismatches.map((item) => item.field))).sort();

    if (exitCode !== testCase.expect_exit) {
      failures.push(`${testCase.id}: expected exit ${testCase.expect_exit}, got ${exitCode}`);
    }
    if (payload.status !== "FAIL") {
      failures.push(`${testCase.id}: expected status FAIL, got ${payload.status}`);
    }
    if (testCase.expect_mismatch_count !== undefined) {
      if (payload.mismatch_count !== testCase.expect_mismatch_count) {
        failures.push(
          `${testCase.id}: expected exactly ${testCase.expect_mismatch_count} mismatch, `
          + `got ${payload.mismatch_count}`,
        );
      }
      if (mismatches.length !== testCase.expect_mismatch_count) {
        failures.push(
          `${testCase.id}: expected ${testCase.expect_mismatch_count} mismatch record(s), `
          + `got ${mismatches.length}`,
        );
      }
    }
    if (testCase.expect_category && categories.join(",") !== testCase.expect_category) {
      failures.push(
        `${testCase.id}: expected only a ${testCase.expect_category} mismatch, got [${categories}]`,
      );
    }
    if (testCase.expect_field && fields.join(",") !== testCase.expect_field) {
      failures.push(
        `${testCase.id}: expected the rejected field to be ${testCase.expect_field}, got [${fields}]`,
      );
    }
    if (testCase.expect_error_type && payload.error_type !== testCase.expect_error_type) {
      failures.push(
        `${testCase.id}: expected error_type ${testCase.expect_error_type}, got ${payload.error_type}`,
      );
    }
    const integrity = checkUntouched(testCase.id, reproducerSha256, failures);
    results.push({
      id: testCase.id,
      why: testCase.why,
      status: payload.status,
      exit_code: exitCode,
      mismatch_count: payload.mismatch_count,
      mismatch_categories: categories,
      rejected_fields: fields,
      error_type: payload.error_type ?? null,
      ...integrity,
    });
  }

  if (results.length !== EXPECTED_CASES_RUN) {
    failures.push(`expected ${EXPECTED_CASES_RUN} cases (1 baseline + 14 tampers), ran ${results.length}`);
  }

  const frozenAfter = hashFrozen();
  const frozenUnchanged = Object.entries(FROZEN_SHA256)
    .every(([name, expected]) => frozenBefore[name] === expected && frozenAfter[name] === expected);
  if (!frozenUnchanged) failures.push("the frozen assets are not byte-identical before and after the suite");
  const reproducerUnchanged = sha256(REPRODUCER) === reproducerSha256;
  if (!reproducerUnchanged) failures.push("reproduce_physarum.js is not byte-identical before and after the suite");

  const report = {
    status: failures.length === 0 ? "PASS" : "FAIL",
    exit_code: failures.length === 0 ? 0 : 1,
    method_name: METHOD_NAME_EN,
    frozen_assets_unchanged: frozenUnchanged,
    reproducer_unchanged: reproducerUnchanged,
    frozen_sha256: FROZEN_SHA256,
    frozen_sha256_before: frozenBefore,
    frozen_sha256_after: frozenAfter,
    reproducer_sha256: reproducerSha256,
    cases_run: results.length,
    tamper_cases: CASES.length,
    failures,
    results,
  };
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  return report.exit_code;
}

if (require.main === module) {
  try {
    process.exitCode = main();
  } catch (error) {
    process.stdout.write(`${JSON.stringify({
      status: "FAIL",
      exit_code: 2,
      error_type: "tamper_harness_error",
      error: error instanceof Error ? error.message : String(error),
    }, null, 2)}\n`);
    process.exitCode = 2;
  }
}

module.exports = { CASES, FROZEN_SHA256 };
