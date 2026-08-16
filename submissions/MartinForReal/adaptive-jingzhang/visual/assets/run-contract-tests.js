#!/usr/bin/env node
"use strict";

// Participant-local contract suite for the Adaptive Jing-Zhang v0.3 regeneration.
//
// Every changelog Class C checkbox is closed only by a named artifact existing plus the
// named case here passing. The suite is failing-first: cases for artifacts that are not
// built yet fail until they are, and none of them may be weakened to make a run green.
// It is read-only — each builder is spawned in --check mode, so a green run also proves
// every generated file on disk already matches its source of truth.
//
// This is not, and does not stand in for, the repository validator or the independent
// audit. It only checks what this package can check about itself.
//
// Usage: node run-contract-tests.js
// Exit 0 when every case passes, 1 when any case fails, 2 on harness error.

const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const KEY_AREA_CONTRACT = require("./key-area-contract.js");

const ASSETS = __dirname;
const PACKAGE_ROOT = path.resolve(ASSETS, "..", "..");

const FROZEN_SHA256 = {
  "visual/assets/physarum-inputs.json": "5e5a9be65bb122617798bf488f12fc5838dfba46aead6d824b679b48db718d53",
  "visual/assets/physarum-runs.json": "ea93df307c30bd90024438ed1dc4704a4e7bec8f4b456a7ec323c914ea4e06fe",
};

// The approved lifecycle removes both specification artifacts before any contract test
// or build runs, so their continued presence is itself a failure.
const REMOVED_SPEC_ARTIFACTS = ["regeneration-design.md", "v0.3-implementation-plan.md"];

// Transcribed from the repository validator, which matches required sections by
// substring containment. Held here as the external contract rather than read back out
// of the package, so the package cannot satisfy the test by redefining it.
const REQUIRED_SECTIONS_ZH = [
  "设计依据与资料清单",
  "三层范围工作框架",
  "统筹研究范围产业与未来城市研究",
  "总体设计范围城市更新与控规深度城市设计",
  "重点区域详细设计",
  "AI 创新生态、人才画像与 AI+ 场景",
  "用地、建筑规模与拆改留方案",
  "交通、轨道、市政与公共服务设施",
  "蓝绿空间、公共空间与城市风貌",
  "更新项目清单、实施政策与分期计划",
  "指标体系、面积复算与合规矩阵",
  "风险、版权与合规说明",
  "参考资料",
];
const REQUIRED_SECTIONS_EN = [
  "Design Basis and Source List",
  "Three-Level Scope Framework",
  "Coordinated Research Area: Industry and Future City Research",
  "Overall Design Area: Urban Renewal and Regulatory-Plan-Level Urban Design",
  "Detailed Design of Key Areas",
  "AI Innovation Ecosystem, Personas, and AI+ Scenarios",
  "Land Use, Building Scale, and Retain-Renovate-Demolish Strategy",
  "Transport, Rail, Municipal Infrastructure, and Public Services",
  "Blue-Green Network, Public Space, and Urban Character",
  "Renewal Projects, Implementation Policy, and Phasing",
  "Metrics, Area Recalculation, and Compliance Matrix",
  "Risk, Copyright, and Compliance",
  "References",
];

// Five semantic plates per key area, each published as a Chinese raster and a separate
// English twin. The superseded architecture had ten combined bilingual infographics per
// area; that count is gone from this file so a stale row cannot pass against it.
const SEMANTIC_PLATES_PER_AREA = 5;

const results = [];

function readText(relative) {
  return fs.readFileSync(path.join(PACKAGE_ROOT, relative), "utf8");
}

function readJson(relative) {
  return JSON.parse(readText(relative));
}

function exists(relative) {
  return fs.existsSync(path.join(PACKAGE_ROOT, relative));
}

function check(id, description, run) {
  const problems = [];
  let detail = null;
  try {
    detail = run((message) => problems.push(message)) ?? null;
  } catch (error) {
    problems.push(error instanceof Error ? error.message : String(error));
  }
  results.push({
    id,
    description,
    status: problems.length === 0 ? "PASS" : "FAIL",
    problems,
    detail,
  });
}

function duplicateIdentifiers(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return [...counts.entries()]
    .filter((entry) => entry[1] > 1)
    .map(([id, count]) => ({ id, count }))
    .sort((left, right) => String(left.id).localeCompare(String(right.id)));
}

function auditIdentifierNamespaces(caseIds, reservedEntries) {
  const duplicateCaseIds = duplicateIdentifiers(caseIds);
  const duplicateReservedIds = duplicateIdentifiers(reservedEntries.map((entry) => entry.id)).map((duplicate) => ({
    ...duplicate,
    namespaces: reservedEntries.filter((entry) => entry.id === duplicate.id).map((entry) => entry.namespace),
  }));
  const reservedIds = new Set(reservedEntries.map((entry) => entry.id));
  const reservedCaseCollisions = [...new Set(caseIds.filter((id) => reservedIds.has(id)))].sort();
  return {
    duplicate_case_ids: duplicateCaseIds,
    duplicate_reserved_ids: duplicateReservedIds,
    reserved_case_collisions: reservedCaseCollisions,
  };
}

function runNode(scriptRelative, args = []) {
  const result = spawnSync(process.execPath, [path.join(PACKAGE_ROOT, scriptRelative), ...args], {
    encoding: "utf8",
    cwd: PACKAGE_ROOT,
    maxBuffer: 64 * 1024 * 1024,
  });
  if (result.error) throw result.error;
  let payload = null;
  try {
    payload = JSON.parse(result.stdout);
  } catch {
    throw new Error(`${scriptRelative} did not emit JSON: ${result.stdout.slice(0, 300)}`);
  }
  return { exitCode: result.status, payload };
}

function sha256File(absolute) {
  return crypto.createHash("sha256").update(fs.readFileSync(absolute)).digest("hex");
}

check("L01", "both specification artifacts are removed from the package root", (fail) => {
  const present = REMOVED_SPEC_ARTIFACTS.filter((name) => exists(name));
  for (const name of present) fail(`${name} is still present; no build or test may run before it is removed`);
  return { present };
});

check("F01", "both frozen ensemble assets are byte-identical to their recorded hashes", (fail) => {
  const observed = {};
  for (const [relative, expected] of Object.entries(FROZEN_SHA256)) {
    const actual = crypto.createHash("sha256")
      .update(fs.readFileSync(path.join(PACKAGE_ROOT, relative)))
      .digest("hex");
    observed[relative] = actual;
    if (actual !== expected) fail(`${relative} changed: ${actual}`);
  }
  return observed;
});

check("R01", "the reproducer recomputes the published record with zero mismatches", (fail) => {
  const { exitCode, payload } = runNode("visual/assets/reproduce_physarum.js");
  if (exitCode !== 0) fail(`expected exit 0, got ${exitCode}`);
  if (payload.status !== "PASS") fail(`expected PASS, got ${payload.status}`);
  if (payload.summary?.comparisons !== 633) fail(`expected 633 comparisons, got ${payload.summary?.comparisons}`);
  if (payload.comparison_counts?.derived_metrics !== 7) {
    fail(`expected 7 derived metrics, got ${payload.comparison_counts?.derived_metrics}`);
  }
  if (payload.mismatch_count !== 0) fail(`expected 0 mismatches, got ${payload.mismatch_count}`);
  if (payload.summary?.selected_edges_per_run !== 11) {
    fail(`expected 11 selected edges per run, got ${payload.summary?.selected_edges_per_run}`);
  }
  return {
    comparisons: payload.summary?.comparisons,
    derived_metrics: payload.comparison_counts?.derived_metrics,
    mismatch_count: payload.mismatch_count,
  };
});

check("R02", "the isolated tamper suite proves the reproducer detects a corrupted record", (fail) => {
  const { exitCode, payload } = runNode("visual/assets/test-reproducer-tamper.js");
  if (exitCode !== 0) fail(`expected exit 0, got ${exitCode}`);
  if (payload.status !== "PASS") fail(`expected PASS, got ${payload.status}`);
  if (!Array.isArray(payload.failures) || payload.failures.length !== 0) {
    fail(`expected zero tamper failures, got ${JSON.stringify(payload.failures)}`);
  }
  if (payload.cases_run !== 15) fail(`expected 15 cases, got ${payload.cases_run}`);
  if (payload.frozen_assets_unchanged !== true) fail("the tamper suite did not restore the frozen assets");
  return { cases_run: payload.cases_run };
});

// The canonical strings this suite defends, restated here rather than imported.
// A regression that edits the method card and the reproducer together is exactly
// the regression worth catching, and a test that reads the same file the builder
// writes cannot catch it: it would agree with whatever the drift produced. These
// literals are the independent record of what the package is allowed to claim.
const CANONICAL_METHOD_NAME_EN =
  "Seeded Kruskal minimum-spanning-tree topology and selection-instability probe "
  + "over hand-declared candidate edges.";
const CANONICAL_METHOD_NAME_ZH =
  "在人工声明的候选边上运行的带种子 Kruskal 最小生成树拓扑与选择不稳定性探针。";
const CANONICAL_GUARANTEED_BY_CONSTRUCTION =
  "connectivity of each run, and exactly 11 selected edges per run";
const CANONICAL_NOT_COMPUTED_EN = [
  "movement",
  "demand",
  "engineering feasibility",
  "accessibility",
  "biological adaptation",
  "public preference",
  "optimality for Beijing",
];
const CANONICAL_NOT_COMPUTED_ZH = [
  "出行",
  "需求",
  "工程可行性",
  "无障碍水平",
  "生物适应",
  "公众偏好",
  "对北京的最优性",
];
// The four selection-frequency thresholds, as components rather than as one blob,
// so a record that publishes three of them and drops the fourth still fails.
const CANONICAL_THRESHOLDS = {
  persistent_min_frequency: 0.7,
  highest_disagreement_frequency: 0.6875,
  mid_disagreement_frequency: 0.5,
  disagreement_min_frequency: 0.35,
};
// The coordinate scale is a declared constant of the method. The reproducer must
// keep saying so: an earlier revision described these two numbers as having been
// fitted from the published edge lengths, which the executable has never done.
const CANONICAL_X_SCALE_M = 1374.006827;
const CANONICAL_Y_SCALE_M = 9723.469847;
const RETRACTED_SCALE_PHRASES = ["solved back out", "反解"];

function pinList(fail, label, actual, expected) {
  const got = actual ?? [];
  if (got.length !== expected.length) {
    return fail(`${label} has ${got.length} entries, expected exactly ${expected.length}`);
  }
  expected.forEach((value, index) => {
    if (got[index] !== value) {
      fail(`${label}[${index}] is ${JSON.stringify(got[index])}, expected ${JSON.stringify(value)}`);
    }
  });
  return undefined;
}

check("R03", "the reproducer names the method it performs and what it does not compute", (fail) => {
  const { payload } = runNode("visual/assets/reproduce_physarum.js");
  const contract = payload.runtime_contract ?? {};
  if (!/seeded Kruskal/i.test(contract.method_name ?? "")) {
    fail(`runtime_contract.method_name does not name a seeded Kruskal method: ${contract.method_name}`);
  }
  if (contract.method_name !== CANONICAL_METHOD_NAME_EN) {
    fail(`runtime_contract.method_name is not the canonical English method name: ${contract.method_name}`);
  }
  if (contract.method_name_zh !== CANONICAL_METHOD_NAME_ZH) {
    fail(`runtime_contract.method_name_zh is not the canonical Chinese method name: ${contract.method_name_zh}`);
  }
  if (!/11 selected edges/.test(contract.guaranteed_by_construction ?? "")) {
    fail("runtime_contract does not state that 11 selected edges are guaranteed by construction");
  }
  if (contract.guaranteed_by_construction !== CANONICAL_GUARANTEED_BY_CONSTRUCTION) {
    fail("runtime_contract.guaranteed_by_construction is not the canonical sentence: "
      + `${contract.guaranteed_by_construction}`);
  }
  const notComputed = contract.not_computed ?? [];
  if (notComputed.length !== 7) fail(`expected 7 not_computed entries, got ${notComputed.length}`);
  pinList(fail, "runtime_contract.not_computed", notComputed, CANONICAL_NOT_COMPUTED_EN);

  // The scale constants are executable and fixed. Pinning the numbers and the
  // sentence together is what stops the package drifting back to describing them
  // as a fit while the code keeps not fitting them.
  const basis = contract.coordinate_basis ?? {};
  if (basis.x_scale_m !== CANONICAL_X_SCALE_M) {
    fail(`coordinate_basis.x_scale_m is ${basis.x_scale_m}, expected ${CANONICAL_X_SCALE_M}`);
  }
  if (basis.y_scale_m !== CANONICAL_Y_SCALE_M) {
    fail(`coordinate_basis.y_scale_m is ${basis.y_scale_m}, expected ${CANONICAL_Y_SCALE_M}`);
  }
  if (!/never re-fits/.test(basis.declared_as ?? "")) {
    fail(`coordinate_basis.declared_as does not state that the reproducer never re-fits: ${basis.declared_as}`);
  }
  for (const phrase of RETRACTED_SCALE_PHRASES) {
    if (JSON.stringify(basis).includes(phrase)) {
      fail(`coordinate_basis repeats the retracted claim ${JSON.stringify(phrase)}`);
    }
  }

  const card = readJson("visual/assets/regeneration-source.json").method_card;
  for (const [language, list] of [["en", card.does_not_compute_en], ["zh", card.does_not_compute_zh]]) {
    if (list.length !== 7) fail(`method_card does_not_compute_${language} has ${list.length} entries, expected 7`);
  }
  pinList(fail, "method_card.does_not_compute_en", card.does_not_compute_en, CANONICAL_NOT_COMPUTED_EN);
  pinList(fail, "method_card.does_not_compute_zh", card.does_not_compute_zh, CANONICAL_NOT_COMPUTED_ZH);
  if (card.name_en !== CANONICAL_METHOD_NAME_EN) {
    fail(`method_card.name_en is not the canonical English method name: ${card.name_en}`);
  }
  if (card.name_zh !== CANONICAL_METHOD_NAME_ZH) {
    fail(`method_card.name_zh is not the canonical Chinese method name: ${card.name_zh}`);
  }

  const thresholds = card.thresholds;
  const expected = CANONICAL_THRESHOLDS;
  for (const [key, value] of Object.entries(expected)) {
    if (thresholds[key] !== value) fail(`threshold ${key} is ${thresholds[key]}, expected ${value}`);
  }
  return { method_name: contract.method_name, thresholds };
});

check("Z01", "the zero-jitter comparison is published for every candidate edge", (fail) => {
  const relative = "visual/assets/physarum-zero-jitter-ablation.json";
  if (!exists(relative)) return fail(`${relative} does not exist`);
  const record = readJson(relative);
  const rows = record.edges ?? [];
  if (rows.length !== 24) fail(`expected 24 candidate edges, found ${rows.length}`);
  for (const row of rows) {
    for (const field of ["edge_id", "primary_frequency", "zero_jitter_frequency", "delta"]) {
      if (row[field] === undefined || row[field] === null) fail(`${row.edge_id ?? "?"} is missing ${field}`);
    }
    const delta = Number((row.zero_jitter_frequency - row.primary_frequency).toFixed(6));
    if (Math.abs(delta - row.delta) > 1e-9) fail(`${row.edge_id} delta ${row.delta} does not equal the difference ${delta}`);
  }
  if (record.thresholds?.highest_disagreement_frequency !== 0.6875) {
    fail("the ablation record does not publish the 0.6875 threshold");
  }
  if (record.thresholds?.mid_disagreement_frequency !== 0.5) {
    fail("the ablation record does not publish the 0.50 threshold");
  }
  // Every threshold component, not only the two the band chart happens to draw.
  for (const [key, value] of Object.entries(CANONICAL_THRESHOLDS)) {
    if (record.thresholds?.[key] !== value) {
      fail(`ablation threshold ${key} is ${record.thresholds?.[key]}, expected ${value}`);
    }
  }
  if (!record.limitations_en || !record.limitations_zh) fail("the ablation record states no bilingual limitations");

  // The record calls its zero-jitter persistence graph connected. That claim is
  // checked here against the frozen edge list rather than believed: the eleven
  // persistent edges are unioned over their own endpoints and the components are
  // counted. A record that keeps the word and loses the property fails.
  const persistent = rows
    .filter((row) => row.zero_jitter_frequency >= CANONICAL_THRESHOLDS.persistent_min_frequency)
    .map((row) => row.edge_id);
  if (persistent.length !== record.summary?.zero_jitter_persistent_edges) {
    fail(`summary.zero_jitter_persistent_edges is ${record.summary?.zero_jitter_persistent_edges}, `
      + `but ${persistent.length} rows reach the ${CANONICAL_THRESHOLDS.persistent_min_frequency} threshold`);
  }
  if (persistent.length !== 11) {
    fail(`expected 11 zero-jitter persistent edges, found ${persistent.length}`);
  }
  const inputs = readJson("visual/assets/physarum-inputs.json");
  const byId = new Map((inputs.edges ?? []).map((edge) => [edge.id, edge]));
  const parent = new Map((inputs.nodes ?? []).map((node) => [node.id, node.id]));
  const find = (node) => {
    let root = node;
    while (parent.get(root) !== root) root = parent.get(root);
    return root;
  };
  for (const edgeId of persistent) {
    const edge = byId.get(edgeId);
    if (!edge) {
      fail(`persistent edge ${edgeId} is not present in the frozen candidate edge list`);
      continue;
    }
    parent.set(find(edge.a), find(edge.b));
  }
  const components = new Set([...parent.keys()].map(find));
  const connected = components.size === 1;
  if (record.summary?.zero_jitter_persistence_graph !== (connected ? "connected" : "disconnected")) {
    fail(`summary.zero_jitter_persistence_graph says ${record.summary?.zero_jitter_persistence_graph}, `
      + `but the persistent edges span ${components.size} component(s) over ${parent.size} nodes`);
  }
  if (!connected) {
    fail(`the zero-jitter persistent edges do not connect all ${parent.size} nodes: `
      + `${components.size} components`);
  }

  // The anisotropy limitation must name both fixed constants and must not carry
  // the retracted description of them as a fit.
  for (const [language, list] of [["en", record.limitations_en], ["zh", record.limitations_zh]]) {
    if (list.length !== 4) fail(`limitations_${language} has ${list.length} entries, expected 4`);
    const joined = list.join(" ");
    for (const phrase of RETRACTED_SCALE_PHRASES) {
      if (joined.includes(phrase)) {
        fail(`limitations_${language} repeats the retracted claim ${JSON.stringify(phrase)}`);
      }
    }
    for (const constant of [CANONICAL_X_SCALE_M, CANONICAL_Y_SCALE_M]) {
      if (!joined.includes(String(constant))) {
        fail(`limitations_${language} does not state the fixed scale constant ${constant}`);
      }
    }
  }
  return { edges: rows.length, persistent_edges: persistent.length, components: components.size };
});

for (const [id, script] of [
  ["B01", "visual/assets/build-proposals.js"],
  ["B02", "visual/assets/build-sources.js"],
  ["B03", "visual/assets/build-standards.js"],
]) {
  check(id, `${path.basename(script)} reports the package already matches its source of truth`, (fail) => {
    const { exitCode, payload } = runNode(script, ["--check"]);
    if (payload.status !== "PASS") fail(`expected PASS, got ${payload.status}: ${JSON.stringify(payload.failures)}`);
    if (exitCode !== 0) fail(`expected exit 0 (nothing left to regenerate), got ${exitCode}`);
    return { changed: payload.changed ?? payload.changed_files };
  });
}

// B01-B03 rebuild text from a record. The zero-jitter ablation is not text: every number in
// physarum-zero-jitter-ablation.json is recomputed from the two frozen assets over all 64
// seeds, and nothing else in this package recomputes it. A hand-edited derived value there
// leaves both frozen assets, every run record and every cited count untouched, so each case
// that merely reads the ablation file goes on agreeing with the edited number. B04 puts that
// recomputation inside the aggregate run; the probe below is what proves it bites.
const ABLATION_CANDIDATE_EDGES = 24;
const ABLATION_SEEDS = 64;

// The exact drift the aggregate suite failed to notice before B04 existed: E02's zero-jitter
// frequency moved down one 64th, and its delta moved with it so the row stays internally
// consistent. Both values are recomputed, neither is an input, and no run record mentions
// either — which is why nothing but a recomputation can reject them.
const ABLATION_DRIFT = {
  edge_id: "E02",
  fields: [
    ["zero_jitter_frequency", 0.96875, 0.953125],
    ["delta", 0.25, 0.234375],
  ],
};

// The builder, the reproducer it imports, the two frozen assets and the published record are
// copied into a throwaway directory, and only the copy of the published record is edited.
// The package copies are hashed before and after, so a probe that reached back into the
// package would be reported here rather than discovered later.
function ablationDriftProbe(fail) {
  const assets = path.join(PACKAGE_ROOT, "visual", "assets");
  const names = [
    "build-ablation.js",
    "reproduce_physarum.js",
    "physarum-inputs.json",
    "physarum-runs.json",
    "physarum-zero-jitter-ablation.json",
  ];
  const before = Object.fromEntries(names.map((name) => [name, sha256File(path.join(assets, name))]));
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "ajz-ablation-drift-"));
  const observed = { fields_mutated: [] };
  try {
    for (const name of names) fs.copyFileSync(path.join(assets, name), path.join(directory, name));
    const target = path.join(directory, "physarum-zero-jitter-ablation.json");
    const record = JSON.parse(fs.readFileSync(target, "utf8"));
    const row = record.edges.find((edge) => edge.edge_id === ABLATION_DRIFT.edge_id);
    if (!row) {
      fail(`the published ablation record has no row for ${ABLATION_DRIFT.edge_id}, so the drift probe cannot run`);
      return observed;
    }
    for (const [field, from, to] of ABLATION_DRIFT.fields) {
      if (row[field] !== from) {
        fail(`the published ablation carries ${ABLATION_DRIFT.edge_id}.${field}=${row[field]}, expected ${from}; the drift probe would prove nothing`);
        return observed;
      }
      row[field] = to;
      observed.fields_mutated.push(`${field}:${from}->${to}`);
    }
    fs.writeFileSync(target, `${JSON.stringify(record, null, 2)}\n`, "utf8");

    const result = spawnSync(process.execPath, [path.join(directory, "build-ablation.js"), "--check"], {
      encoding: "utf8",
      cwd: directory,
      maxBuffer: 64 * 1024 * 1024,
    });
    if (result.error) throw result.error;
    let payload = null;
    try {
      payload = JSON.parse(result.stdout);
    } catch {
      throw new Error(`the drift probe produced no JSON: ${result.stdout.slice(0, 300)}`);
    }
    observed.exit_code = result.status;
    observed.status = payload.status;
    observed.changed = payload.changed;
    if (payload.changed !== true) {
      fail(`the drifted ablation record was accepted: --check reported changed=${payload.changed}`);
    }
    if (result.status === 0) {
      fail("the drifted ablation record was accepted: --check exited 0");
    }
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
  const disturbed = names.filter((name) => sha256File(path.join(assets, name)) !== before[name]);
  for (const name of disturbed) fail(`the drift probe changed ${name} inside the package`);
  observed.package_files_unchanged = disturbed.length === 0;
  observed.fired = observed.changed === true && observed.exit_code !== 0;
  return observed;
}

check("B04", "build-ablation.js recomputes the 64-seed ablation, finds nothing to write, and rejects a drifted derived value", (fail) => {
  const { exitCode, payload } = runNode("visual/assets/build-ablation.js", ["--check"]);
  if (payload.status !== "PASS") fail(`expected PASS, got ${payload.status}: ${JSON.stringify(payload.failures)}`);
  if (exitCode !== 0) fail(`expected exit 0 (nothing left to regenerate), got ${exitCode}`);
  if (payload.changed !== false) {
    fail(`the published ablation record differs from its own recomputation (changed=${payload.changed})`);
  }
  if (payload.candidate_edges !== ABLATION_CANDIDATE_EDGES) {
    fail(`expected ${ABLATION_CANDIDATE_EDGES} candidate edges, got ${payload.candidate_edges}`);
  }
  if (payload.seeds_cross_checked_against_frozen_record !== ABLATION_SEEDS) {
    fail(`expected the recomputation to be cross-checked against ${ABLATION_SEEDS} frozen seeds, `
      + `got ${payload.seeds_cross_checked_against_frozen_record}`);
  }
  // The builder reports the hashes it observed after its own run; they must be the two this
  // suite pins, otherwise the recomputation was performed against something else.
  for (const [relative, expected] of Object.entries(FROZEN_SHA256)) {
    const name = path.basename(relative);
    if (payload.frozen_sha256?.[name] !== expected) {
      fail(`build-ablation.js recomputed against ${name}=${payload.frozen_sha256?.[name]}, expected ${expected}`);
    }
  }
  const drift = ablationDriftProbe(fail);
  return {
    changed: payload.changed,
    candidate_edges: payload.candidate_edges,
    seeds_cross_checked_against_frozen_record: payload.seeds_cross_checked_against_frozen_record,
    edges_changing_status: payload.edges_changing_status?.length,
    largest_absolute_delta: payload.largest_absolute_delta,
    drift_probe: drift,
  };
});

check("S01", "sources.json holds exactly 41 unique records with the bibliographic field shape", (fail) => {
  const bibliography = readJson("visual/assets/source-bibliography.json");
  const records = readJson("sources.json").sources;
  const expected = bibliography.count_contract.closed_final_total;
  if (expected !== 41) fail(`the count contract is ${expected}, but the closed inventory is 41`);
  if (records.length !== expected) fail(`expected ${expected} records, found ${records.length}`);
  const ids = records.map((record) => record.id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length > 0) fail(`duplicate source ids: ${duplicates.join(", ")}`);
  const missingShape = records
    .filter((record) => !("title" in record) || !("author_or_issuer" in record) || !("year" in record))
    .map((record) => record.id);
  if (missingShape.length > 0) fail(`records missing the bibliographic field shape: ${missingShape.join(", ")}`);
  const unresolved = records.filter((record) => record.bibliographic_status === "not_transcribed_from_source");
  return { records: records.length, preserved_unknown_bibliographies: unresolved.length };
});

check("S02", "the meteorological record stays registered but unselected, so nothing derives from it", (fail) => {
  const record = readJson("sources.json").sources
    .find((item) => item.id === "BEIJING-METEOROLOGICAL-SEASONAL-QUALIFICATION");
  if (!record) return fail("the frozen meteorological identifier is not registered");
  if (record.selection_status !== "not_selected") {
    fail(`selection_status must remain not_selected, found ${record.selection_status}`);
  }
  for (const field of ["url", "title", "author_or_issuer", "year"]) {
    if (record[field] !== null) {
      fail(`${field} must stay null while no source is selected, found ${JSON.stringify(record[field])}`);
    }
  }
  if (record.task_state !== "open") fail("C06 must remain open while no source is selected");
  return { selection_status: record.selection_status, task_state: record.task_state };
});

check("M01", "no unsupported evidence marker survives into any authored or rendered document", (fail) => {
  const counts = {};
  for (const file of ["proposal.md", "proposal.en.md", "report/proposal.html", "report/proposal.en.html"]) {
    const occurrences = (readText(file).match(/\[assumption:/g) || []).length;
    counts[file] = occurrences;
    if (occurrences !== 0) fail(`${file} still exposes ${occurrences} literal [assumption: markers`);
  }
  return counts;
});

check("M02", "both proposals name the computation and state what it does not compute", (fail) => {
  const expectations = [
    ["proposal.md", ["Kruskal", "由算法构造保证", "不计算出行"]],
    ["proposal.en.md", ["seeded Kruskal", "guaranteed by construction", "does not compute movement"]],
  ];
  const found = {};
  for (const [file, phrases] of expectations) {
    const body = readText(file);
    found[file] = phrases.filter((phrase) => body.includes(phrase));
    for (const phrase of phrases) {
      if (!body.includes(phrase)) fail(`${file} does not contain "${phrase}"`);
    }
  }
  return found;
});

check("E01", "every validator-required section heading is present in the matching language", (fail) => {
  const counts = {};
  for (const [file, required] of [["proposal.md", REQUIRED_SECTIONS_ZH], ["proposal.en.md", REQUIRED_SECTIONS_EN]]) {
    const headings = readText(file).split("\n").filter((line) => line.startsWith("## ")).map((line) => line.slice(3));
    const missing = required.filter((section) => !headings.some((heading) => heading.includes(section)));
    counts[file] = { headings: headings.length, missing };
    for (const section of missing) fail(`${file} is missing required section \`## ${section}\``);
  }
  return counts;
});

check("L02", "the three labs couple through exactly three declared channels", (fail) => {
  const coupling = readJson("visual/assets/regeneration-source.json").lab_coupling;
  if (coupling.channel_count !== 3) fail(`channel_count must be 3, found ${coupling.channel_count}`);
  if (coupling.channels.length !== 3) fail(`expected 3 channel records, found ${coupling.channels.length}`);
  for (const channel of coupling.channels) {
    for (const field of ["name_zh", "name_en", "definition_zh", "definition_en"]) {
      if (!channel[field]) fail(`${channel.id} is missing ${field}`);
    }
  }
  return { ids: coupling.channels.map((channel) => channel.id) };
});

check("A01", "Dazhongsi stays non-station and non-georeferenced in the record and the geometry", (fail) => {
  const area = readJson("visual/assets/regeneration-source.json").areas.find((item) => item.id === "PROV-KEY-003");
  if (!area) return fail("PROV-KEY-003 is not declared in the bilingual record");
  if (area.georeferenced !== false) fail("PROV-KEY-003 must remain non-georeferenced");
  for (const field of ["non_station_note_zh", "non_station_note_en", "source_id"]) {
    if (!area[field]) fail(`PROV-KEY-003 is missing ${field}`);
  }
  for (const term of ["entrance", "road", "crossing", "parcel", "distance", "station relationship"]) {
    if (!area.non_station_note_en.includes(term)) fail(`the disclaimer does not explicitly cover "${term}"`);
  }

  // The same position claim has to appear on the geometry a reviewer opens directly.
  const features = readJson("geometry/key_areas.geojson").features;
  const stamped = {};
  for (const feature of features) {
    const properties = feature.properties;
    const declared = readJson("visual/assets/regeneration-source.json").areas
      .find((item) => item.id === properties.id);
    if (!declared) {
      fail(`${properties.id} has geometry but no bilingual record`);
      continue;
    }
    stamped[properties.id] = properties.georeferenced;
    if (properties.georeferenced !== declared.georeferenced) {
      fail(`${properties.id} geometry declares georeferenced ${properties.georeferenced}, record says ${declared.georeferenced}`);
    }
    if (declared.georeferenced === false && properties.positional_claim !== "void") {
      fail(`${properties.id} must carry positional_claim "void", found ${properties.positional_claim}`);
    }
    if (declared.georeferenced === false && !properties.non_station_note_en) {
      fail(`${properties.id} geometry carries no non-station note`);
    }
  }
  return { stamped };
});

check("A02", "twelve actions P00-P11 are declared with a phase each", (fail) => {
  const projects = readJson("visual/assets/regeneration-source.json").projects;
  const ids = projects.map((project) => project.id);
  for (let index = 0; index < 12; index += 1) {
    const id = `P${String(index).padStart(2, "0")}`;
    if (!ids.includes(id)) fail(`${id} is not declared`);
  }
  if (projects.length !== 12) fail(`expected 12 actions, found ${projects.length}`);
  for (const project of projects) {
    for (const field of ["name_zh", "name_en", "phase"]) {
      if (!project[field]) fail(`${project.id} is missing ${field}`);
    }
  }
  return { count: projects.length };
});

check("A03", "each key area carries distinct detailed-design content with stable ids", (fail) => {
  const areas = readJson("visual/assets/regeneration-source.json").areas;
  if (areas.length !== 3) fail(`expected 3 key areas, found ${areas.length}`);
  const componentIds = new Set();
  const routeIds = new Set();
  const detail = {};
  for (const area of areas) {
    const label = area.id;
    const components = area.components ?? [];
    const routes = area.routes ?? [];
    if (components.length === 0) fail(`${label} declares no components`);
    if (routes.length === 0) fail(`${label} declares no routes`);
    for (const component of components) {
      for (const field of ["id", "name_zh", "name_en", "evidence_ref"]) {
        if (!component[field]) fail(`${label} component ${component.id ?? "?"} is missing ${field}`);
      }
      if (componentIds.has(component.id)) fail(`component id ${component.id} is reused across areas`);
      componentIds.add(component.id);
    }
    for (const route of routes) {
      for (const field of ["id", "name_zh", "name_en", "step_free", "evidence_ref"]) {
        if (route[field] === undefined || route[field] === null || route[field] === "") {
          fail(`${label} route ${route.id ?? "?"} is missing ${field}`);
        }
      }
      if (routeIds.has(route.id)) fail(`route id ${route.id} is reused across areas`);
      routeIds.add(route.id);
    }
    // A step-free chain is only continuous if every leg of it is step-free.
    if (routes.length > 0 && !routes.every((route) => route.step_free === true)) {
      fail(`${label} declares a route that breaks the continuous step-free chain`);
    }
    for (const field of ["winter_zh", "winter_en", "maintenance_zh", "maintenance_en", "phase1_envelope"]) {
      if (!area[field]) fail(`${label} is missing ${field}`);
    }
    const envelope = area.phase1_envelope ?? {};
    for (const field of ["id", "description_zh", "description_en", "reversible", "authorization_state"]) {
      if (envelope[field] === undefined || envelope[field] === null || envelope[field] === "") {
        fail(`${label} phase1_envelope is missing ${field}`);
      }
    }
    detail[label] = { components: components.length, routes: routes.length };
  }
  // Distinct content, not one description repeated three times.
  const roles = new Set(areas.map((area) => area.role_en));
  if (roles.size !== areas.length) fail("two key areas share the same role, so they are not distinct labs");
  return detail;
});

// The plate architecture itself is checked by the nine key-area tests wired in below, which
// read the shared contract module rather than restating counts here. This case only holds
// the line that the registry is the new thirty-artifact shape and not the old plate list.
check("V01", "the plate registry is the thirty-artifact bilingual-pair shape", (fail) => {
  const relative = "visual/assets/area-plates.json";
  if (!exists(relative)) return fail(`${relative} does not exist`);
  const registry = readJson(relative);
  if (registry.plates !== undefined) {
    fail("area-plates.json still carries a `plates` list; the combined-infographic architecture is rejected");
  }
  const artifacts = registry.artifacts ?? [];
  if (artifacts.length !== 30) fail(`expected 30 artifact records, found ${artifacts.length}`);
  const perArea = {};
  const plateIds = new Set();
  for (const record of artifacts) {
    perArea[record.area_feature_id] = (perArea[record.area_feature_id] ?? 0) + 1;
    if (record.plate_id) plateIds.add(record.plate_id);
  }
  for (const [areaId, count] of Object.entries(perArea)) {
    if (count !== SEMANTIC_PLATES_PER_AREA * 2) {
      fail(`${areaId} has ${count} artifacts, expected ${SEMANTIC_PLATES_PER_AREA * 2}`);
    }
  }
  if (Object.keys(perArea).length !== 3) fail(`artifacts cover ${Object.keys(perArea).length} areas, expected 3`);
  if (plateIds.size !== SEMANTIC_PLATES_PER_AREA * 3) {
    fail(`the registry names ${plateIds.size} semantic plates, expected ${SEMANTIC_PLATES_PER_AREA * 3}`);
  }
  return { artifacts: artifacts.length, semantic_plates: plateIds.size, per_area: perArea };
});

check("G01", "every P00-P11 action holds the full governance contract, and both bodies print it as a register", (fail) => {
  const relative = "visual/assets/action-governance.json";
  if (!exists(relative)) return fail(`${relative} does not exist`);
  const governance = readJson(relative);
  const projects = readJson("visual/assets/regeneration-source.json").projects;

  const registryIds = projects.map((project) => project.id).sort();
  const governanceIds = governance.actions.map((action) => action.id).sort();
  if (registryIds.join(",") !== governanceIds.join(",")) {
    fail(`governance covers [${governanceIds.join(" ")}] but the action registry declares [${registryIds.join(" ")}]`);
  }

  // Every field the brief requires per action, in both languages. A field that is present
  // but empty is the same defect as a missing one.
  const bilingual = [
    "operator_role", "maintainer", "beneficiary", "worst_affected", "metric",
    "proposed_target", "stop_trigger", "stop_authority", "rollback",
    "physical_restoration", "residual_liability", "non_digital_fallback",
  ];
  for (const action of governance.actions) {
    for (const field of bilingual) {
      for (const language of ["zh", "en"]) {
        const value = action[`${field}_${language}`];
        if (typeof value !== "string" || value.trim() === "") {
          fail(`${action.id} is missing ${field}_${language}`);
        }
      }
    }
    // An action that claimed an authorized target, a funding source, or no blocking gate
    // would be asserting an external approval nobody in this package can give.
    if (action.authorized_target !== null) fail(`${action.id} declares an authorized target`);
    if (action.authorization_state !== "not_authorized") fail(`${action.id} is not marked not_authorized`);
    if (action.funding_state !== "unfunded") fail(`${action.id} is not marked unfunded`);
    if (!Array.isArray(action.blocked_by) || action.blocked_by.length === 0) {
      fail(`${action.id} declares no unresolved D gate`);
    }
    for (const gate of action.blocked_by ?? []) {
      if (!/^D(0[1-9]|1[0-7])$/.test(gate)) fail(`${action.id} references ${gate}, which is not a D01-D17 gate`);
    }
  }

  // The register has to be readable in the documents, not only in this JSON. The body prints
  // seven of the twelve clauses, so this half reads the printed register as a table — the
  // declared headers, then one exact row per action in registry order — rather than searching
  // the whole file for each substring. A substring sweep would still have passed if the
  // register had been dissolved into prose, if two actions had shared a row, or if a row had
  // lost a column; reconstructing the row from the record catches all three.
  const printed = ["operator_role", "metric", "stop_trigger", "rollback"];
  const byId = new Map(projects.map((project) => [project.id, project]));
  // The renderer unescapes these on the way back out, so the file holds the escaped form.
  const asCell = (value) => String(value).replace(/\\/g, "\\\\").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
  const detail = {};
  for (const [file, language] of [["proposal.md", "zh"], ["proposal.en.md", "en"]]) {
    const body = readText(file);
    const lines = body.split("\n");
    // The exhaustive record has to be named where the shortened table is printed, or a
    // reviewer reading the seven columns has no way to reach the other five.
    if (!body.includes(relative)) fail(`${file} prints the register without naming ${relative}`);

    const header = `| ${[
      governance.labels[`col_action_${language}`],
      governance.labels[`phase_${language}`],
      ...printed.map((field) => governance.labels[`${field}_${language}`]),
      governance.labels[`blocked_by_${language}`],
    ].map(asCell).join(" | ")} |`;
    const start = lines.indexOf(header);
    if (start === -1) {
      fail(`${file} does not print the governance register under its seven declared headers`);
      detail[file] = { register_rows: 0 };
      continue;
    }
    if (lines[start + 1] !== `|${"---|".repeat(printed.length + 3)}`) {
      fail(`${file} prints a governance header rule that is not seven columns wide`);
    }

    let rows = 0;
    governance.actions.forEach((action, index) => {
      const project = byId.get(action.id);
      const expected = `| ${[
        `${action.id} ${project[`name_${language}`]}`,
        action.phase,
        ...printed.map((field) => action[`${field}_${language}`]),
        (action.blocked_by ?? []).join(" "),
      ].map(asCell).join(" | ")} |`;
      const actual = lines[start + 2 + index];
      if (actual === expected) rows += 1;
      else fail(`${file} row ${index + 1} does not print the registered ${action.id} contract`);
    });
    // A thirteenth row would mean an action is being governed that the registry never
    // declared, which the id comparison above cannot see.
    const overrun = lines[start + 2 + governance.actions.length];
    if (typeof overrun === "string" && overrun.startsWith("|")) {
      fail(`${file} prints more governance rows than the ${governance.actions.length} registered actions`);
    }
    detail[file] = { register_rows: rows };
  }
  return { actions: governance.actions.length, printed_columns: printed.length + 3, ...detail };
});

check("V02", "both viewers list all twelve actions under the canonical registry titles", (fail) => {
  const projects = readJson("visual/assets/regeneration-source.json").projects;
  const areas = readJson("visual/assets/regeneration-source.json").areas;
  const detail = {};
  for (const [file, language] of [["visual/index.html", "zh"], ["visual/index.en.html", "en"]]) {
    const body = readText(file);
    const missingProjects = projects.filter((project) => !body.includes(project[`name_${language}`]));
    const missingIds = projects.filter((project) => !body.includes(project.id));
    // The English viewer previously carried a different role for each area than the
    // Chinese one; both must now read back the single registry wording.
    const missingRoles = areas.filter((area) => !body.includes(area[`role_${language}`]));
    detail[file] = {
      missing_project_ids: missingIds.map((project) => project.id),
      missing_project_titles: missingProjects.map((project) => project.id),
      missing_area_roles: missingRoles.map((area) => area.id),
    };
    for (const project of missingIds) fail(`${file} does not list action ${project.id}`);
    for (const project of missingProjects) fail(`${file} does not use the registry title for ${project.id}`);
    for (const area of missingRoles) fail(`${file} does not use the registry role for ${area.id}`);
  }
  return detail;
});

// The six id families the two viewers must expose identically, each inside the section that
// owns it. Scoping the search to the section matters: `S01—S10` is also written in a sentence
// in the regional table, and a page-wide search for first occurrence would read that sentence
// as the scenario register and report an ordering that no reader sees.
const PARITY_FAMILIES = [
  { key: "scenarios", section: "ai", records: (source) => source.viewer_sections.scenarios },
  { key: "review_gates", section: "check", records: (source) => source.viewer_sections.review_gates },
  { key: "task_coverage", section: "tasks", records: (source) => source.viewer_sections.task_coverage.rows },
  { key: "source_families", section: "sources", records: (source) => source.viewer_sections.source_families },
  { key: "assumption_limits", section: "assumptions", records: (source) => source.viewer_sections.assumption_limits },
  { key: "regional_partners", section: "regional", records: (source) => source.regional_synergy.partners },
];

// The task-coverage cells are the one family whose registered wording is a template: its
// numbers are substituted at build time from the matrices, so the string to look for on the
// page is the filled sentence rather than the template. The counts are recomputed here from
// the registries themselves rather than read back out of the builder's report, because a check
// that took its expected numbers from the code under test would agree with whatever that code
// happened to produce — which is how this table came to tell both readers that every mandatory
// standard was addressed while two of eleven stood at `data_gap`.
function parityCounts() {
  const requirements = readJson("compliance_matrix.json").requirements ?? [];
  const standards = readJson("standard_matrix.json").standards ?? [];
  const depth = readJson("design_depth_matrix.json").items ?? [];
  const ablation = readJson("visual/assets/physarum-zero-jitter-ablation.json");
  return {
    numbered_requirements: requirements.filter((record) => !record.requirement_id.startsWith("agent.")).length,
    agent_tasks: requirements.filter((record) => record.requirement_id.startsWith("agent.")).length,
    standards_total: standards.length,
    standards_addressed: standards.filter((record) => record.review_status === "addressed").length,
    standards_data_gap: standards.filter((record) => record.review_status === "data_gap").length,
    depth_items: depth.length,
    depth_limited: depth.filter((record) => (record.completeness_limited_by ?? []).length > 0).length,
    ablation_seeds: ablation.seeds,
    ablation_edges: (ablation.edges ?? []).length,
  };
}

// Records that declare no `counts` are returned untouched, so the other five families keep
// comparing their registered wording literally. A placeholder with no count behind it is left
// as written rather than dropped, so the mismatch it causes is visible instead of silent.
function parityFill(value, record, counts) {
  if (!Array.isArray(record.counts)) return value;
  return String(value).replace(/\{(\d+)\}/g, (whole, index) => {
    const name = record.counts[Number(index)];
    return name !== undefined && name in counts ? String(counts[name]) : whole;
  });
}

function parityEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Sections are siblings rather than nested, so the first closing tag after the opening one
// ends the section. An id that is not on the page returns "", and every lookup inside it then
// reports a missing record, which is the right answer for a page that lost a section.
function paritySection(html, id) {
  const opening = html.indexOf(`<section class="section" id="${id}"`);
  if (opening === -1) return "";
  const closing = html.indexOf("</section>", opening);
  return html.slice(opening, closing === -1 ? html.length : closing);
}

// The accessible name an `aria-labelledby` pointer produces: the text of the element carrying
// that id, with markup removed and entities read back. A pointer that names nothing, or a
// heading with no text in it, yields null rather than an empty name the caller might compare
// as if it were one. Headings never nest an element of their own tag here, so the first close
// tag of the same name is the right one.
function tableName(html, id) {
  const found = html.match(new RegExp(`<([a-z][a-z0-9]*)\\b[^>]*\\sid="${id}"[^>]*>([\\s\\S]*?)</\\1>`, "i"));
  if (!found) return null;
  const text = found[2]
    .replace(/<[^>]*>/g, "")
    .replace(/&quot;/g, "\"")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
  return text === "" ? null : text;
}

// What "the same page in the other language" means for this package, as one pure function
// over the two published files and the authority they are generated from. Pure so that the
// probes at the end of the case can run it against copies that have been deliberately drifted:
// the failure this guards against is a parity check that passes because it stopped looking.
function viewerParityFindings(pages, source) {
  const findings = [];
  const add = (kind, message) => findings.push({ kind, message });
  const languages = pages.map((page) => page.language);
  const counts = parityCounts();

  for (const family of PARITY_FAMILIES) {
    const records = family.records(source);
    const declared = records.map((record) => record.id);
    const seen = {};
    for (const page of pages) {
      const body = paritySection(page.html, family.section);
      const positions = declared
        .map((id) => ({ id, at: body.indexOf(id) }))
        .filter((entry) => entry.at >= 0);
      for (const id of declared) {
        if (!positions.some((entry) => entry.id === id)) {
          add("missing_id", `${page.language} #${family.section} does not expose ${id}`);
        }
      }
      seen[page.language] = positions.sort((a, b) => a.at - b.at).map((entry) => entry.id);
      if (seen[page.language].join(",") !== declared.filter((id) => seen[page.language].includes(id)).join(",")) {
        add("id_order", `${page.language} #${family.section} exposes ${family.key} in the order `
          + `${seen[page.language].join(",")}, the registry declares ${declared.join(",")}`);
      }

      // Every bilingual field of every record, in this page's language and not the other's.
      // Derived from the record rather than listed here, so a field added to the authority is
      // covered by this case on the day it is added.
      for (const record of records) {
        const fields = Object.keys(record).filter((key) => key.endsWith("_zh")).map((key) => key.slice(0, -3));
        for (const field of fields) {
          const mine = record[`${field}_${page.language}`];
          const other = record[`${field}_${page.language === "zh" ? "en" : "zh"}`];
          if (typeof mine !== "string" || mine.trim() === "") {
            add("unregistered_field", `${record.id} registers no ${field}_${page.language}`);
            continue;
          }
          const expected = parityFill(mine, record, counts);
          const foreign = typeof other === "string" ? parityFill(other, record, counts) : other;
          if (!body.includes(parityEscape(expected))) {
            add("missing_value", `${page.language} #${family.section} does not carry ${record.id}.${field}`);
          }
          if (typeof foreign === "string" && foreign !== expected && body.includes(parityEscape(foreign))) {
            add("language_leak", `${page.language} #${family.section} carries the other language's ${record.id}.${field}`);
          }
        }
      }
    }
    if (seen[languages[0]].join(",") !== seen[languages[1]].join(",")) {
      add("cross_language_order", `${family.key} is exposed as ${seen[languages[0]].join(",")} in `
        + `${languages[0]} and ${seen[languages[1]].join(",")} in ${languages[1]}`);
    }
  }

  // The six semantic fields are named on the page as well as filled in, because a reader
  // meeting a stop rule with no label in front of it cannot tell it from a description.
  const labels = source.viewer_sections.scenario_field_labels;
  for (const page of pages) {
    const body = paritySection(page.html, "ai");
    for (const field of source.viewer_sections.scenario_fields) {
      const label = labels[`${field}_${page.language}`];
      if (!label || !body.includes(parityEscape(label))) {
        add("missing_field_label", `${page.language} #ai does not label ${field}`);
      }
    }
  }

  // Generated tables. The opening markup is matched whole, so a table is only counted here if
  // it carries its column count and sits inside the labelled scroll region that lets a narrow
  // viewport read it sideways instead of shredding its columns. Every table on either page now
  // does, so the structural rules below reach all of them.
  const labelled = {};
  for (const page of pages) {
    const tables = [...page.html.matchAll(
      /<div class="table-scroll" role="region" tabindex="0" aria-labelledby="([^"]+)">\s*<table class="table" style="--table-columns:(\d+)" aria-labelledby="([^"]+)">([\s\S]*?)<\/table>/g,
    )];
    labelled[page.language] = tables.length;
    // A table with no accessible name is also a table outside every rule below, so the two
    // counts are compared before the rules run. This is the assertion that keeps a
    // hand-authored table from reappearing and quietly exempting itself.
    const all = (page.html.match(/<table[\s>]/g) || []).length;
    if (all !== tables.length) {
      add("table_label", `${page.language} publishes ${all} tables, ${tables.length} of them named inside a scroll region`);
    }
    const names = new Map();
    for (const [, region, columns, target, inner] of tables) {
      const anchors = (page.html.match(new RegExp(`id="${target}"`, "g")) || []).length;
      if (anchors !== 1) {
        add("table_label", `${page.language} labels a table by ${target}, which names ${anchors} elements`);
      }
      if (region !== target) {
        add("table_label", `${page.language} puts a table labelled by ${target} in a region labelled by ${region}`);
      }
      const headers = (inner.match(/<th scope="col">/g) || []).length;
      if (Number(columns) !== headers) {
        add("table_structure", `${page.language} table ${target} declares ${columns} columns and prints ${headers}`);
      }
      if (!inner.includes("<thead>") || !inner.includes("<tbody>")) {
        add("table_structure", `${page.language} table ${target} does not separate thead from tbody`);
      }
      for (const cell of inner.match(/<th[\s>]/g) || []) {
        if (cell === "<th>") add("table_scope", `${page.language} table ${target} has a header cell with no scope`);
      }
      if (!/<th scope="col">/.test(inner) || !/<th scope="row">/.test(inner)) {
        add("table_scope", `${page.language} table ${target} does not scope both a column and a row header`);
      }
      // Two tables a reader cannot tell apart by name are two tables they cannot cite, so the
      // computed name is compared, not the pointer that produces it.
      const name = tableName(page.html, target);
      if (name === null) {
        add("table_name", `${page.language} labels a table by ${target}, which carries no text to name it with`);
        continue;
      }
      names.set(name, [...(names.get(name) ?? []), target]);
    }
    for (const [name, pointers] of names) {
      if (pointers.length > 1) {
        add("table_name", `${page.language} gives ${pointers.length} tables the accessible name `
          + `${JSON.stringify(name)} (${pointers.join(", ")})`);
      }
    }
  }
  if (labelled[languages[0]] !== labelled[languages[1]]) {
    add("table_count", `${languages[0]} generates ${labelled[languages[0]]} labelled tables and `
      + `${languages[1]} generates ${labelled[languages[1]]}`);
  }

  // Figures. Each language shows its own rendering of the same plate, in the same order, and
  // every one of them is described, because an undescribed figure is the part of the argument
  // that only a sighted reader receives.
  const figures = {};
  for (const page of pages) {
    const images = [...page.html.matchAll(/<img\b([^>]*)>/g)].map(([, attributes]) => attributes);
    const bases = [];
    for (const attributes of images) {
      const src = (attributes.match(/\ssrc="([^"]*)"/) || [])[1] ?? "";
      const alt = (attributes.match(/\salt="([^"]*)"/) || [])[1];
      if (alt === undefined || alt.trim() === "") {
        add("image_alt", `${page.language} publishes ${src || "an image"} with no alternative text`);
      }
      const english = src.endsWith(".en.png");
      if (english !== (page.language === "en")) {
        add("image_language", `${page.language} shows ${src}, which is the other language's rendering`);
      }
      bases.push(src.replace(/\.en\.png$/, "").replace(/\.png$/, ""));
    }
    figures[page.language] = bases;
  }
  if (figures[languages[0]].join(",") !== figures[languages[1]].join(",")) {
    add("image_order", `the two viewers show different plates or show them in a different order`);
  }

  return findings;
}

// Drift is introduced one way at a time and the check has to notice each one. A parity case
// with no probe behind it is the same shape as a parity case whose selectors have rotted:
// both report zero findings.
const PARITY_PROBES = [
  {
    name: "a scenario id disappears",
    kind: "missing_id",
    drift: (pages) => pages.map((page) => (page.language === "en"
      ? { ...page, html: page.html.replace(/S05/g, "S95") }
      : page)),
  },
  {
    name: "two review gates swap places",
    kind: "id_order",
    drift: (pages) => pages.map((page) => ({
      ...page,
      html: page.html.replace(/CHK-01/g, "CHK-XX").replace(/CHK-02/g, "CHK-01").replace(/CHK-XX/g, "CHK-02"),
    })),
  },
  {
    name: "an English field falls back to the Chinese text",
    kind: "language_leak",
    drift: (pages, source) => {
      const scenario = source.viewer_sections.scenarios[0];
      return pages.map((page) => (page.language === "en"
        ? { ...page, html: page.html.replace(parityEscape(scenario.stop_rule_en), parityEscape(scenario.stop_rule_zh)) }
        : page));
    },
  },
  {
    name: "a generated table loses its header grouping",
    kind: "table_structure",
    drift: (pages) => pages.map((page) => ({ ...page, html: page.html.replace("<thead>", "") })),
  },
  {
    name: "a generated table loses a row scope",
    kind: "table_scope",
    drift: (pages) => pages.map((page) => ({ ...page, html: page.html.replace(/<th scope="row">/, "<th>") })),
  },
  {
    name: "the Chinese viewer shows an English plate",
    kind: "image_language",
    drift: (pages) => pages.map((page) => (page.language === "zh"
      ? { ...page, html: page.html.replace("site-overview.png", "site-overview.en.png") }
      : page)),
  },
  {
    name: "a figure loses its description",
    kind: "image_alt",
    drift: (pages) => pages.map((page) => ({ ...page, html: page.html.replace(/alt="[^"]+"/, 'alt=""') })),
  },
  {
    // The specific overclaim this table shipped with for the whole of v0.1 to v0.4, restaged as
    // a probe: the data gaps are folded into the addressed total and the page reports full
    // coverage. The drift is arithmetically consistent and reads perfectly well, which is why
    // proofreading never caught it and why the numbers have to be recomputed instead.
    name: "a task-coverage count absorbs the declared data gaps",
    kind: "missing_value",
    drift: (pages, source) => {
      const row = source.viewer_sections.task_coverage.rows.find((entry) => entry.id === "TC02");
      if (!row) return pages;
      const counts = parityCounts();
      const honest = parityFill(row.coverage_en, row, counts);
      const inflated = parityFill(row.coverage_en, row, {
        ...counts,
        standards_addressed: counts.standards_total,
        standards_data_gap: 0,
      });
      return pages.map((page) => (page.language === "en"
        ? { ...page, html: page.html.replace(parityEscape(honest), parityEscape(inflated)) }
        : page));
    },
  },
  {
    name: "a hand-authored table reappears with no accessible name",
    kind: "table_label",
    drift: (pages) => pages.map((page) => ({
      ...page,
      html: page.html.replace("</main>", `<table class="table"><tr><th>x</th></tr></table></main>`),
    })),
  },
  {
    // A table outside its scroll region is the defect this strategy replaced: on a 390 px
    // viewport it either shreds its own columns or drags the page sideways.
    name: "a generated table leaves its scroll region",
    kind: "table_label",
    drift: (pages) => pages.map((page) => ({
      ...page,
      html: page.html.replace(/<div class="table-scroll"[^>]*>/, ""),
    })),
  },
  {
    name: "a table declares more columns than it prints",
    kind: "table_structure",
    drift: (pages) => pages.map((page) => ({
      ...page,
      html: page.html.replace(/--table-columns:(\d+)/, (whole, count) => `--table-columns:${Number(count) + 1}`),
    })),
  },
  {
    // Six key-area tables with six ids and three names between them: the defect this check was
    // added for. The ids stay unique here and only the visible headings collide, which is
    // exactly the state a pointer-uniqueness check reports as healthy.
    name: "two key-area tables answer to the same name",
    kind: "table_name",
    drift: (pages) => pages.map((page) => {
      const first = page.html.match(/<h4 id="components-prov-key-001">([\s\S]*?)<\/h4>/);
      if (!first) return page;
      return {
        ...page,
        html: page.html.replace(
          /<h4 id="components-prov-key-002">[\s\S]*?<\/h4>/,
          `<h4 id="components-prov-key-002">${first[1]}</h4>`,
        ),
      };
    }),
  },
];

check("PAR01", "both viewers expose the same records, in the same order, each in its own language", (fail) => {
  const source = readJson("visual/assets/regeneration-source.json");
  const pages = [
    { language: "zh", html: readText("visual/index.html") },
    { language: "en", html: readText("visual/index.en.html") },
  ];

  for (const finding of viewerParityFindings(pages, source)) fail(`${finding.kind}: ${finding.message}`);

  const missed = [];
  for (const probe of PARITY_PROBES) {
    const drifted = viewerParityFindings(probe.drift(pages, source), source);
    if (!drifted.some((finding) => finding.kind === probe.kind)) missed.push(probe.name);
  }
  for (const name of missed) fail(`the parity check does not notice when ${name}`);

  return {
    families: PARITY_FAMILIES.length,
    records: PARITY_FAMILIES.reduce((total, family) => total + family.records(source).length, 0),
    probes: PARITY_PROBES.length,
    probes_missed: missed.length,
  };
});

// The two things a reader meets before they read anything: whether their thumb can hit a
// navigation link, and whether the page tells the browser what an image is before the bytes
// arrive. Both were audited on real viewports at 390, 768 and 1440 px and both were found
// wanting — every navigation link rendered 32.67 px tall against a 48 px requirement, and all
// twenty images on each page were fetched up front, decoded on the main thread and sized only
// once they had landed.
//
// Neither defect is visible to a check that reads markup for content: the link height is an
// arithmetic consequence of four declarations that are individually unremarkable, and an
// image's intrinsic size lives in the raster, not in the page. So both are computed here —
// the link box from the stylesheet's own numbers, the image sizes from the PNG headers — and
// the arithmetic is deliberately independent of the builder that writes those attributes. A
// check that took its expected values from the code under test would agree with whatever that
// code happened to produce.

const ROOT_FONT_PX = 16;
const TOUCH_TARGET_PX = 48;
const NAV_LINK_SELECTOR = "nav a";

// A second rule setting any of these on a navigation link would move the rendered box out from
// under the arithmetic below, which reads one rule.
const TARGET_PROPERTIES = ["display", "font-size", "line-height", "padding", "min-height", "min-width"];

// The declarations that let the widened targets grow without dragging the page sideways: the
// bar is capped at the viewport, scrolls inside itself, keeps that scroll from becoming a page
// gesture, and does not wrap. Remove any one and a 390 px screen either loses links off the
// edge or gains a horizontal scrollbar on the document.
const NAV_CONTAINMENT = {
  "max-width": "100%",
  "overflow-x": "auto",
  "overscroll-behavior-x": "contain",
  "white-space": "nowrap",
};

const FETCHING_ELEMENTS = /<(?:img|link|script|iframe|source|track|embed|object|video|audio)\b[^>]*>/gi;
const FETCHING_ATTRIBUTES = ["src", "href", "srcset", "poster", "data"];
const VIEWER_PRIMARY_BEFORE_PLATES = ["site-overview", "land-use-structure", "key-areas"];
const VIEWER_PRIMARY_AFTER_PLATES = ["mobility-bluegreen", "metrics-evidence"];

// The viewer is a deliberately ordered argument: three framing figures, fifteen semantic
// key-area plates, then the mobility and metrics evidence figures. Language parity alone is
// not enough to preserve it, because deleting or substituting the same figure in both pages
// would leave the two broken pages equal. The five primary bases are pinned here; the plate
// filenames come from the same public key-area contract that the dedicated inventory and
// publication cases independently audit.
function expectedViewerSources(language) {
  const suffix = language === "en" ? ".en.png" : ".png";
  const primary = (bases) => bases.map((base) => `../assets/figures/${base}${suffix}`);
  const plates = KEY_AREA_CONTRACT.expectedArtifacts()
    .filter((artifact) => artifact.language === language)
    .map((artifact) => `../${artifact.file}`);
  return [
    ...primary(VIEWER_PRIMARY_BEFORE_PLATES),
    ...plates,
    ...primary(VIEWER_PRIMARY_AFTER_PLATES),
  ];
}

function styleSheet(html) {
  const found = html.match(/<style>([\s\S]*?)<\/style>/);
  return found === null ? null : found[1];
}

// Every rule in the sheet as a selector and its declarations. Media-query wrappers are not
// modelled: a rule inside one comes back with its own selector and the wrapper is dropped,
// which is what the checks below want, because a rule that shrinks a navigation link inside a
// media query is still a rule that shrinks a navigation link.
function cssRules(style) {
  return [...style.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([, selector, body]) => ({
    selector: selector.trim(),
    declared: cssDeclarations(body),
  }));
}

function cssDeclarations(body) {
  const declared = new Map();
  for (const piece of body.split(";")) {
    const at = piece.indexOf(":");
    if (at === -1) continue;
    declared.set(piece.slice(0, at).trim(), piece.slice(at + 1).trim());
  }
  return declared;
}

// px and rem only. em is refused rather than guessed: on a rule that also sets its own
// font-size the answer depends on which declaration wins, and a check that guessed there would
// be reporting its own arithmetic rather than the stylesheet's. Anything unresolvable comes
// back null and is reported, not silently treated as zero.
function cssPixels(value) {
  const text = String(value).trim();
  // Zero is the one length CSS accepts without a unit, and an unqualified 0 is how a rule that
  // has given up on a minimum is usually written. Reading it as unresolvable rather than as
  // zero would report the wrong defect for the most likely regression there is.
  if (/^-?0(?:\.0+)?$/.test(text)) return 0;
  const found = /^(-?\d*\.?\d+)(px|rem)$/.exec(text);
  return found === null ? null : Number(found[1]) * (found[2] === "rem" ? ROOT_FONT_PX : 1);
}

function cssBox(value) {
  const [top, right = top, bottom = top, left = right] = String(value).trim().split(/\s+/);
  return { top, right, bottom, left };
}

function lineBoxPixels(value, fontPx) {
  if (value === undefined) return fontPx;
  const multiplier = Number(value);
  if (value.trim() !== "" && Number.isFinite(multiplier)) return multiplier * fontPx;
  return cssPixels(value);
}

// Only the width matters here, and a border this cannot read is counted as zero. That makes
// the computed box smaller and the 48 px test harder to pass, which is the safe direction for
// a check to be wrong in.
function borderPixels(declared, side) {
  const value = declared.get(`border-${side}-width`) ?? declared.get(`border-${side}`) ?? declared.get("border");
  if (value === undefined) return 0;
  return cssPixels(String(value).trim().split(/\s+/)[0]) ?? 0;
}

function bodyDeclaration(rules, property) {
  const rule = rules.find((entry) => entry.selector === "body" && entry.declared.has(property));
  return rule === undefined ? undefined : rule.declared.get(property);
}

// The rendered box of a navigation link, in CSS pixels, from the stylesheet alone. Every part
// is returned so the report carries the number rather than a verdict about it: with the sheet
// as authored the natural height is .85rem x 1.55 + .3rem x 2 + 2px = 32.68 px, which is the
// figure the viewport audit measured and the reason a minimum has to be declared at all.
function navLinkBox(declared, rules) {
  const font = cssPixels(declared.get("font-size") ?? `${ROOT_FONT_PX}px`);
  const lineHeight = declared.get("line-height") ?? bodyDeclaration(rules, "line-height");
  const padding = cssBox(declared.get("padding") ?? "0");
  const side = (edge) => cssPixels(declared.get(`padding-${edge}`) ?? padding[edge]);
  const box = {
    font_px: font,
    line_px: font === null ? null : lineBoxPixels(lineHeight, font),
    padding_top_px: side("top"),
    padding_bottom_px: side("bottom"),
    border_top_px: borderPixels(declared, "top"),
    border_bottom_px: borderPixels(declared, "bottom"),
    min_height_px: cssPixels(declared.get("min-height") ?? "0"),
    min_width_px: cssPixels(declared.get("min-width") ?? "0"),
  };
  const stack = [box.line_px, box.padding_top_px, box.padding_bottom_px, box.border_top_px, box.border_bottom_px];
  box.natural_height_px = stack.some((part) => part === null) ? null : stack.reduce((total, part) => total + part, 0);
  box.rendered_height_px = box.natural_height_px === null || box.min_height_px === null
    ? null
    : Math.max(box.natural_height_px, box.min_height_px);
  return box;
}

function imageAttribute(tag, name) {
  return (tag.match(new RegExp(`\\s${name}="([^"]*)"`)) || [])[1];
}

// The first 24 bytes of a PNG: signature, chunk length, chunk type, then the width and height
// the browser will lay out at. Read from the raster rather than from any registry, so a plate
// that is rebuilt at a different size fails this case instead of being described by a stale
// number.
function rasterSize(absolute) {
  const header = Buffer.alloc(24);
  const handle = fs.openSync(absolute, "r");
  let read = 0;
  try {
    read = fs.readSync(handle, header, 0, 24, 0);
  } finally {
    fs.closeSync(handle);
  }
  if (read !== 24 || header.toString("hex", 0, 8) !== "89504e470d0a1a0a") return null;
  if (header.toString("latin1", 12, 16) !== "IHDR") return null;
  return { width: header.readUInt32BE(16), height: header.readUInt32BE(20) };
}

function isRemoteReference(value) {
  if (value.startsWith("//")) return true;
  return /^[a-z][a-z0-9+.-]*:/i.test(value) && !/^data:/i.test(value);
}

// Pure over the two published pages and a map of raster sizes read from disk, so the probes at
// the end of the case can run it against copies that have been deliberately drifted.
function viewerRenderingFindings(pages, sizes) {
  const findings = [];
  const add = (kind, message) => findings.push({ kind, message });
  const languages = pages.map((page) => page.language);

  const sheets = pages.map((page) => styleSheet(page.html));
  if (sheets.some((sheet) => sheet === null)) {
    add("style_parity", "a viewer carries no stylesheet at all");
    return findings;
  }
  if (sheets[0] !== sheets[1]) {
    add("style_parity", `${languages[0]} and ${languages[1]} no longer carry the same stylesheet, `
      + "so a target measured on one says nothing about the other");
  }

  for (const [index, style] of sheets.entries()) {
    const language = languages[index];
    const rules = cssRules(style);

    // The two premises the arithmetic stands on. Both hold in this stylesheet today; if either
    // moves, the numbers below stop describing what a browser renders, and the case says so
    // rather than carrying on with them.
    if (rules.some((rule) => rule.selector === "html" && rule.declared.has("font-size"))) {
      add("layout_basis", `${language} sets a root font-size, so rem no longer resolves to ${ROOT_FONT_PX} px here`);
    }
    if (!rules.some((rule) => rule.selector === "*" && rule.declared.get("box-sizing") === "border-box")) {
      add("layout_basis", `${language} no longer declares border-box, so a declared minimum is not a rendered height`);
    }

    const navRules = rules.filter((rule) => rule.selector === "nav");
    if (navRules.length === 0) add("nav_scroll", `${language} has no nav rule`);
    for (const [property, value] of Object.entries(NAV_CONTAINMENT)) {
      if (!navRules.some((rule) => rule.declared.get(property) === value)) {
        add("nav_scroll", `${language} nav does not declare ${property}:${value}, `
          + "which is what keeps the widened targets inside the viewport and scrolling locally");
      }
    }

    const base = rules.filter((rule) => rule.selector === NAV_LINK_SELECTOR);
    if (base.length !== 1) {
      add("touch_target", `${language} sizes the navigation link from ${base.length} rules; this case reads one`);
      continue;
    }
    for (const rule of rules) {
      if (rule.selector === NAV_LINK_SELECTOR || !rule.selector.includes(NAV_LINK_SELECTOR)) continue;
      const also = TARGET_PROPERTIES.filter((property) => rule.declared.has(property));
      if (also.length > 0) {
        add("touch_target", `${language} also sets ${also.join(", ")} on the navigation link through ${rule.selector}`);
      }
    }

    const declared = base[0].declared;
    const display = declared.get("display");
    if (display === undefined || display === "inline") {
      add("touch_target", `${language} leaves the navigation link ${display ?? "inline by default"}, `
        + "and an inline box ignores a declared minimum size");
    }

    const box = navLinkBox(declared, rules);
    for (const [part, value] of Object.entries(box)) {
      if (value === null) {
        add("layout_basis", `${language} declares a navigation-link ${part.replace(/_px$/, "").replace(/_/g, " ")} `
          + "this case cannot resolve to pixels");
      }
    }
    if (box.rendered_height_px !== null && box.rendered_height_px < TOUCH_TARGET_PX) {
      add("touch_target", `${language} renders the navigation link ${box.rendered_height_px.toFixed(2)} px tall, `
        + `below the ${TOUCH_TARGET_PX} px target`);
    }
    // Width is the label's, and the labels are Chinese words of two and three characters.
    // Nothing here can measure a glyph, so the width has to be declared rather than computed:
    // 来源 at .85rem is about 27 px wide and would fail a real 48 px target on a page where
    // every height rule above passed.
    if (box.min_width_px !== null && box.min_width_px < TOUCH_TARGET_PX) {
      add("touch_target", `${language} declares a ${box.min_width_px} px minimum width on the navigation link, `
        + `below the ${TOUCH_TARGET_PX} px target, and no rule here can measure a label`);
    }
  }

  const navLinks = pages.map((page) => (((page.html.match(/<nav[\s\S]*?<\/nav>/) ?? [""])[0]
    .match(/<a\b/g)) ?? []).length);
  if (navLinks.some((count) => count === 0)) add("nav_parity", "a viewer publishes no navigation links");
  if (navLinks[0] !== navLinks[1]) {
    add("nav_parity", `${languages[0]} publishes ${navLinks[0]} navigation links and ${languages[1]} publishes ${navLinks[1]}`);
  }

  for (const page of pages) {
    // The fold, as the page itself defines it: the hero figure is the one image inside the
    // header, so everything after the header closes is below it. This is a judgement about
    // what the first screen waits for, not a pixel measurement, and it is the same judgement
    // whatever viewport the reader arrives on.
    const fold = page.html.indexOf("</header>");
    if (fold === -1) {
      add("image_loading", `${page.language} has no header, so no image can be placed against the fold`);
      continue;
    }
    const images = [...page.html.matchAll(/<img\b[^>]*>/g)];
    if (images.length === 0) add("image_size", `${page.language} publishes no images`);
    const actualSources = images.map((found) => imageAttribute(found[0], "src"));
    const expectedSources = expectedViewerSources(page.language);
    const inventoryDifference = Array.from(
      { length: Math.max(actualSources.length, expectedSources.length) },
      (_, index) => index,
    ).find((index) => actualSources[index] !== expectedSources[index]);
    if (inventoryDifference !== undefined) {
      add("image_inventory", `${page.language} publishes ${actualSources.length}/${expectedSources.length} expected figures; `
        + `position ${inventoryDifference + 1} is ${actualSources[inventoryDifference] ?? "missing"}, `
        + `expected ${expectedSources[inventoryDifference] ?? "no extra figure"}`);
    }
    let eager = 0;
    for (const found of images) {
      const tag = found[0];
      const src = imageAttribute(tag, "src") ?? "an unnamed image";
      const aboveFold = found.index < fold;
      const size = sizes.get(src);
      if (size === undefined || size === null) {
        add("image_size", `${page.language} publishes ${src}, whose raster this case cannot read a size from`);
      } else {
        for (const [name, actual] of [["width", size.width], ["height", size.height]]) {
          const value = imageAttribute(tag, name);
          if (value === undefined) {
            add("image_size", `${page.language} publishes ${src} with no declared ${name}, `
              + "so the page reflows once it loads");
          } else if (Number(value) !== actual) {
            add("image_size", `${page.language} declares ${name} ${value} for ${src}, whose raster is ${actual} px`);
          }
        }
      }
      if (imageAttribute(tag, "decoding") !== "async") {
        add("image_decoding", `${page.language} decodes ${src} on the main thread`);
      }
      const loading = imageAttribute(tag, "loading");
      if (loading === "eager") eager += 1;
      if (aboveFold) {
        if (loading !== "eager") {
          add("image_loading", `${page.language} declares loading:${loading ?? "nothing"} on ${src}, `
            + "which is the image the first screen is waiting for");
        }
        if (imageAttribute(tag, "fetchpriority") !== "high") {
          add("image_priority", `${page.language} fetches ${src} ahead of everything else without claiming the priority that justifies it`);
        }
      } else if (loading !== "lazy") {
        add("image_loading", `${page.language} declares loading:${loading ?? "nothing"} on ${src}, which is below the fold`);
      }
      for (const name of FETCHING_ATTRIBUTES) {
        const value = imageAttribute(tag, name);
        if (value !== undefined && isRemoteReference(value)) {
          add("external_request", `${page.language} loads ${value} from an image`);
        }
      }
    }
    if (images.length > 0 && eager !== 1) {
      add("image_loading", `${page.language} fetches ${eager} images eagerly, expected exactly the hero`);
    }

    // Everything else on the page that can reach the network. The viewer is opened from a
    // file:// path with no server behind it, so a remote reference is not a slow asset, it is
    // a missing one — and a font or stylesheet pulled from a CDN would also be a provenance
    // claim this package has not made.
    for (const [tag] of page.html.matchAll(FETCHING_ELEMENTS)) {
      if (/^<img/i.test(tag)) continue;
      for (const name of FETCHING_ATTRIBUTES) {
        const value = imageAttribute(tag, name);
        if (value !== undefined && isRemoteReference(value)) {
          add("external_request", `${page.language} loads ${value} from ${tag.slice(0, 40)}`);
        }
      }
    }
    for (const [, value] of page.html.matchAll(/url\(\s*['"]?([^'")]+)/g)) {
      if (isRemoteReference(value.trim())) add("external_request", `${page.language} loads ${value.trim()} from a stylesheet url()`);
    }
    for (const [, value] of page.html.matchAll(/@import\s+(?:url\(\s*)?['"]?([^'")\s;]+)/g)) {
      if (isRemoteReference(value)) add("external_request", `${page.language} imports ${value}`);
    }
  }

  return findings;
}

function driftEveryPage(pages, change) {
  return pages.map((page) => ({ ...page, html: change(page.html) }));
}

function driftOnePage(pages, language, change) {
  return pages.map((page) => (page.language === language ? { ...page, html: change(page.html) } : page));
}

// Drift is introduced one way at a time and the check has to notice each one. Every probe here
// restages a state this package was actually in before these contracts existed, or one it
// would fall back into if a single declaration were dropped.
const RENDERING_PROBES = [
  {
    name: "the navigation link loses its minimum height",
    kind: "touch_target",
    drift: (pages) => driftEveryPage(pages, (html) => html.replace(/min-height:48px/g, "min-height:0")),
  },
  {
    name: "the navigation link loses its minimum width",
    kind: "touch_target",
    drift: (pages) => driftEveryPage(pages, (html) => html.replace(/min-width:48px/g, "min-width:0")),
  },
  {
    name: "the navigation link goes back to being an inline box",
    kind: "touch_target",
    drift: (pages) => driftEveryPage(pages, (html) => html.replace(/nav a\{display:inline-flex/g, "nav a{display:inline")),
  },
  {
    name: "a media query shrinks the navigation link on small screens",
    kind: "touch_target",
    drift: (pages) => driftEveryPage(pages, (html) => html.replace(
      /@media\(max-width:650px\)\{/g,
      "@media(max-width:650px){nav a{min-height:0;min-width:0;padding:0}",
    )),
  },
  {
    name: "the root font size moves under the rem arithmetic",
    kind: "layout_basis",
    drift: (pages) => driftEveryPage(pages, (html) => html.replace(
      /html\{scroll-behavior:smooth\}/g,
      "html{scroll-behavior:smooth;font-size:10px}",
    )),
  },
  {
    name: "the box model stops being border-box",
    kind: "layout_basis",
    drift: (pages) => driftEveryPage(pages, (html) => html.replace(/\*\{box-sizing:border-box\}/g, "")),
  },
  {
    name: "the navigation bar stops containing its own overflow",
    kind: "nav_scroll",
    drift: (pages) => driftEveryPage(pages, (html) => html.replace(/overflow-x:auto;overflow-y:hidden;/g, "")),
  },
  {
    name: "the two stylesheets drift apart",
    kind: "style_parity",
    drift: (pages) => driftOnePage(pages, "zh", (html) => html.replace(
      /nav a:hover\{border-color:var\(--coral\)\}/,
      "nav a:hover{border-color:var(--teal)}",
    )),
  },
  {
    name: "one viewer loses a navigation link",
    kind: "nav_parity",
    drift: (pages) => driftOnePage(pages, "en", (html) => html.replace(/<a href="#[^"]*"[^>]*>[^<]*<\/a>/, "")),
  },
  {
    // The state both viewers shipped in until this case was written: twenty images per page,
    // none of them sized, every one of them reflowing the layout as it arrived.
    name: "an image loses its intrinsic size",
    kind: "image_size",
    drift: (pages) => driftEveryPage(pages, (html) => html.replace(/(<img\b[^>]*?)\swidth="\d+"\sheight="\d+"/, "$1")),
  },
  {
    name: "an image declares a size its raster does not have",
    kind: "image_size",
    drift: (pages) => driftEveryPage(pages, (html) => html.replace(
      /\swidth="(\d+)"/,
      (whole, value) => ` width="${Number(value) + 1}"`,
    )),
  },
  {
    name: "both viewers lose the same expected figure",
    kind: "image_inventory",
    drift: (pages) => driftEveryPage(pages, (html) => html.replace(
      /<img\b[^>]*\ssrc="[^"]*land-use-structure(?:\.en)?\.png"[^>]*>/,
      "",
    )),
  },
  {
    name: "both viewers substitute the same duplicate without changing the image count",
    kind: "image_inventory",
    drift: (pages) => driftEveryPage(pages, (html) => html.replace(
      /land-use-structure(\.en)?\.png/,
      "site-overview$1.png",
    )),
  },
  {
    // The other half of the fix, and the half that is easy to overshoot: deferring everything
    // including the hero would score well against a naive lazy-loading count and make the
    // first screen slower, which is the outcome this probe exists to keep failing.
    name: "the hero the first screen waits for is deferred",
    kind: "image_loading",
    drift: (pages) => driftEveryPage(pages, (html) => html.replace(/loading="eager"/, `loading="lazy"`)),
  },
  {
    name: "a plate below the fold is fetched up front",
    kind: "image_loading",
    drift: (pages) => driftEveryPage(pages, (html) => html.replace(/loading="lazy"/, `loading="eager"`)),
  },
  {
    name: "an image goes back to decoding on the main thread",
    kind: "image_decoding",
    drift: (pages) => driftEveryPage(pages, (html) => html.replace(/\sdecoding="async"/, "")),
  },
  {
    name: "the hero stops claiming the priority that justifies fetching it early",
    kind: "image_priority",
    drift: (pages) => driftEveryPage(pages, (html) => html.replace(/\sfetchpriority="high"/, "")),
  },
  {
    name: "a stylesheet is loaded from a content delivery network",
    kind: "external_request",
    drift: (pages) => driftEveryPage(pages, (html) => html.replace(
      "</style>",
      `</style><link rel="stylesheet" href="https://cdn.example.invalid/type.css">`,
    )),
  },
  {
    name: "a web font is imported from a remote host",
    kind: "external_request",
    drift: (pages) => driftEveryPage(pages, (html) => html.replace(
      "<style>",
      `<style>@import url("https://fonts.example.invalid/family.css");`,
    )),
  },
];

check("UI01", "both viewers offer a reachable touch target and declare every image before it loads", (fail) => {
  const pages = [
    { language: "zh", html: readText("visual/index.html") },
    { language: "en", html: readText("visual/index.en.html") },
  ];

  // Read once, from the rasters themselves, and shared by the live run and every probe. A
  // probe that also had to restage the files on disk would be testing the filesystem.
  const sizes = new Map();
  for (const page of pages) {
    for (const [, src] of page.html.matchAll(/<img\b[^>]*\ssrc="([^"]*)"/g)) {
      if (sizes.has(src)) continue;
      const absolute = path.resolve(PACKAGE_ROOT, "visual", src);
      sizes.set(src, fs.existsSync(absolute) ? rasterSize(absolute) : null);
    }
  }

  for (const finding of viewerRenderingFindings(pages, sizes)) fail(`${finding.kind}: ${finding.message}`);

  const missed = [];
  for (const probe of RENDERING_PROBES) {
    const drifted = viewerRenderingFindings(probe.drift(pages), sizes);
    if (!drifted.some((finding) => finding.kind === probe.kind)) missed.push(probe.name);
  }
  for (const name of missed) fail(`the rendering check does not notice when ${name}`);

  const sheet = styleSheet(pages[0].html);
  const rules = sheet === null ? [] : cssRules(sheet);
  const link = rules.find((rule) => rule.selector === NAV_LINK_SELECTOR);
  return {
    touch_target_px: TOUCH_TARGET_PX,
    nav_link: link === undefined ? null : navLinkBox(link.declared, rules),
    images: Object.fromEntries(pages.map((page) => [page.language, (page.html.match(/<img\b/g) || []).length])),
    expected_images: expectedViewerSources("zh").length,
    rasters_measured: sizes.size,
    probes: RENDERING_PROBES.length,
    probes_missed: missed.length,
  };
});

check("HTML-H1", "each rendered report has exactly one top-level heading", (fail) => {
  const counts = {};
  for (const file of ["report/proposal.html", "report/proposal.en.html"]) {
    const found = (readText(file).match(/<h1[\s>]/g) || []).length;
    counts[file] = found;
    if (found !== 1) fail(`${file} has ${found} <h1> elements, expected exactly 1`);
  }
  return counts;
});

check("SP01", "both official spellings survive with provenance and an explicit bilingual note", (fail) => {
  const provenance = readJson("visual/assets/regeneration-source.json").spelling_provenance;
  const spellings = provenance.variants.map((variant) => variant.spelling);
  for (const spelling of ["集聚", "聚集"]) {
    if (!spellings.includes(spelling)) fail(`spelling ${spelling} is not preserved`);
  }
  for (const variant of provenance.variants) {
    if (!variant.source_id) fail(`spelling ${variant.spelling} carries no provenance`);
  }
  if (!provenance.note_zh || !provenance.note_en) fail("the bilingual note is incomplete");
  return { spellings };
});

// The three complex-adaptive-system sections are prose, and prose is the one surface this
// package has already been caught drifting on: three plate captions went on telling readers
// that section dimensions were derived from the package geometry long after that basis was
// removed from the data, because every test read the record and none read the sentence.
//
// These sections publish two things a reader cannot check by eye — numbers taken from the
// zero-jitter ablation record, and stop mechanisms attributed to named actions in the
// governance register. Both are recomputed here from the twenty-four edge records and from
// the register itself, then rebuilt into the sentence a reader actually sees, so a change to
// either record fails this case instead of leaving a stale sentence in the proposal. The
// sentence templates are literals here rather than imports from the documents: a test that
// reads its expectation out of the thing it is testing agrees with whatever that thing
// happens to say.
//
// This case cannot judge whether the sections are good urban design. It only refuses to let
// them assert something the records do not hold.
const CAS_SECTIONS = {
  operating_model: {
    zh: "复杂适应系统运行模型",
    en: "The Complex Adaptive System Operating Model",
  },
  method_ladder: {
    zh: "黏菌方法的五层阶梯与零抖动对照",
    en: "The Five Layers of the Slime-Mould Method and the Zero-Jitter Comparison",
  },
  failure_modes: {
    zh: "系统性失效模式与停止机制对照",
    en: "Systemic Failure Modes and Their Stop Mechanisms",
  },
};

const CAS_DOCUMENTS = [
  { file: "proposal.md", language: "zh", markdown: true },
  { file: "proposal.en.md", language: "en", markdown: true },
  { file: "report/proposal.html", language: "zh", markdown: false },
  { file: "report/proposal.en.html", language: "en", markdown: false },
];

// Every action the two sections quote, with the register field each is quoted for. An action
// named for a clause it does not actually register is the failure this table exists to catch.
const CAS_QUOTED_ACTIONS = [
  { section: "operating_model", id: "P01", fields: ["metric"] },
  { section: "operating_model", id: "P02", fields: ["metric"] },
  { section: "operating_model", id: "P06", fields: ["metric"] },
  { section: "operating_model", id: "P10", fields: ["metric"] },
  { section: "operating_model", id: "P11", fields: ["metric"] },
  { section: "failure_modes", id: "P02", fields: ["stop_trigger", "proposed_target"] },
  { section: "failure_modes", id: "P03", fields: ["metric", "proposed_target"] },
  { section: "failure_modes", id: "P08", fields: ["stop_trigger", "rollback"] },
  { section: "failure_modes", id: "P10", fields: ["stop_trigger", "rollback"] },
  { section: "failure_modes", id: "P11", fields: ["metric", "proposed_target"] },
];

// Seven failure modes, of which the proposal says five carry a registered clause and two do
// not. Both counts are pinned, so the honest labelling of the last two rows cannot quietly
// become a sixth and a seventh registered mechanism.
const CAS_FAILURE_ROWS = 7;
const CAS_REGISTERED_FAILURE_ROWS = 5;

// Counting rows and collecting the set of action ids cannot see an attribution move between
// rows: swap the cascade row's clauses with the maintenance-debt row's and the count is still
// five, the set is still the same five ids, and the table now tells a reader to stop a
// drainage failure by withdrawing an equipment type. Each row is therefore pinned to the
// action it names and to the two register fields whose text it must quote word for word.
//
// The order is the published order. The Chinese label of the fourth row is the one the
// proposal has always used, 排除固化.
const CAS_FAILURE_ROW_CONTRACT = [
  { zh: "锁定", en: "Lock-in", id: "P11", sign: "metric", mechanism: "proposed_target" },
  { zh: "级联", en: "Cascade", id: "P08", sign: "stop_trigger", mechanism: "rollback" },
  { zh: "指标俘获", en: "Indicator capture", id: "P03", sign: "metric", mechanism: "proposed_target" },
  { zh: "排除固化", en: "Hardened exclusion", id: "P02", sign: "stop_trigger", mechanism: "proposed_target" },
  { zh: "维护债", en: "Maintenance debt", id: "P10", sign: "stop_trigger", mechanism: "rollback" },
];

// Which register field a cell quotes has to be legible in the cell itself, otherwise a reader
// cannot tell an observed metric from a stop trigger and the table's own intro has to be
// trusted for it. These are the words the published cells carry.
const CAS_FIELD_LABELS = {
  metric: { zh: "观察指标", en: "Registered metric" },
  stop_trigger: { zh: "停止触发", en: "Registered stop trigger" },
  proposed_target: { zh: "提议目标", en: "Proposed target" },
  rollback: { zh: "回滚", en: "Rollback" },
};

// Gates the operating model names while stating that they stay open. Body prose is the
// easiest place to imply that a gate has been satisfied.
const CAS_NAMED_GATES = ["D12", "D16"];

function casSection(text, title, markdown) {
  const opening = markdown ? `### ${title}` : `<h3>${title}</h3>`;
  let found = 0;
  let index = text.indexOf(opening);
  const first = index;
  while (index >= 0) {
    found += 1;
    index = text.indexOf(opening, index + opening.length);
  }
  if (found === 0) return { found, body: "" };
  const rest = text.slice(first + opening.length);
  const next = markdown ? rest.search(/\n#{2,3} /) : rest.search(/<h[123][\s>]/);
  return { found, body: next < 0 ? rest : rest.slice(0, next) };
}

// The data rows of the one Markdown table a section carries: pipe lines, minus the alignment
// rule, minus the header. Both the check and the probes below read rows through this, so a
// probe can never be looking at a different table from the check it has to defeat.
function casTableRowLines(body) {
  return body
    .split("\n")
    .map((line, index) => ({ line, index }))
    .filter((entry) => entry.line.startsWith("|") && !/^\|[\s:|-]+\|\s*$/.test(entry.line))
    .slice(1);
}

function casCells(line) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|")
    .map((cell) => cell.trim());
}

function casCollapse(text) {
  return text.replace(/\s+/g, " ").trim();
}

// Row by row against the register. Returns problems rather than reporting them, so the same
// function can be run over a deliberately corrupted copy of the table: a row check that has
// never been made to complain is not evidence that the attribution was checked.
function casFailureRowProblems(body, language, actions) {
  const problems = [];
  const rows = casTableRowLines(body).map((entry) => entry.line);
  if (rows.length !== CAS_FAILURE_ROWS) {
    problems.push(`publishes ${rows.length} failure-mode rows, expected ${CAS_FAILURE_ROWS}`);
  }
  const registered = rows.filter((row) => /P\d\d/.test(row));
  if (registered.length !== CAS_REGISTERED_FAILURE_ROWS) {
    problems.push(`attributes ${registered.length} failure-mode rows to a registered action, `
      + `expected ${CAS_REGISTERED_FAILURE_ROWS}`);
  }
  const expectedIds = [...new Set(CAS_FAILURE_ROW_CONTRACT.map((row) => row.id))].sort().join(",");
  const foundIds = [...new Set(registered.flatMap((row) => row.match(/P\d\d/g) ?? []))].sort().join(",");
  if (foundIds !== expectedIds) {
    problems.push(`attributes failure-mode rows to ${foundIds}, expected ${expectedIds}`);
  }

  for (const [index, contract] of CAS_FAILURE_ROW_CONTRACT.entries()) {
    const where = `row ${index + 1} (${contract[language]})`;
    const line = rows[index];
    if (line === undefined) {
      problems.push(`${where} is missing`);
      continue;
    }
    const cells = casCells(line);
    if (cells.length !== 4) {
      problems.push(`${where} carries ${cells.length} cells, expected 4`);
      continue;
    }
    const [mode, appearance, sign, mechanism] = cells;
    if (mode !== contract[language]) {
      problems.push(`${where} is labelled ${JSON.stringify(mode)}, expected ${JSON.stringify(contract[language])}`);
    }
    if (!appearance) problems.push(`${where} says nothing about how the failure would appear here`);
    if (/P\d\d/.test(appearance)) {
      problems.push(`${where} attributes an action in its description column, where nothing is quoted from the register`);
    }
    const action = actions.get(contract.id);
    if (!action) {
      problems.push(`${where} attributes ${contract.id}, which is not in the governance register`);
      continue;
    }
    for (const [column, cell, field] of [["sign", sign, contract.sign], ["mechanism", mechanism, contract.mechanism]]) {
      const ids = [...new Set(cell.match(/P\d\d/g) ?? [])].join(",");
      if (ids !== contract.id) {
        problems.push(`${where} attributes its ${column} cell to [${ids}], expected ${contract.id}`);
      }
      const label = CAS_FIELD_LABELS[field][language];
      if (!cell.includes(label)) {
        problems.push(`${where} does not mark its ${column} cell as the registered ${label}`);
      }
      const clause = action[`${field}_${language}`];
      if (typeof clause !== "string" || !clause.trim()) {
        problems.push(`${contract.id} registers no ${field}_${language} for ${where} to quote`);
      } else if (!casCollapse(cell).includes(casCollapse(clause))) {
        problems.push(`${where} does not quote the registered ${field} of ${contract.id} word for word`);
      }
    }
  }
  return problems;
}

// Cuts the tail off one registered clause where the table quotes it. The row keeps its id,
// its field label and its opening words, so only a word-for-word comparison against the
// register can still tell that it stopped quoting one.
function casTruncateClause(body, clause) {
  const kept = clause.slice(0, Math.max(6, Math.floor(clause.length * 0.6)));
  return body.replace(clause, kept);
}

// Exchanges the two attributed cells of two rows and leaves their labels and descriptions
// where they are. Row count, registered-row count and the aggregate set of action ids all
// stay exactly as published; only which failure mode each clause is supposed to stop moves.
function casSwapAttribution(body, leftIndex, rightIndex) {
  const lines = body.split("\n");
  const rows = casTableRowLines(body);
  const left = rows[leftIndex];
  const right = rows[rightIndex];
  if (!left || !right) return body;
  const leftCells = casCells(left.line);
  const rightCells = casCells(right.line);
  if (leftCells.length !== 4 || rightCells.length !== 4) return body;
  lines[left.index] = `| ${[leftCells[0], leftCells[1], rightCells[2], rightCells[3]].join(" | ")} |`;
  lines[right.index] = `| ${[rightCells[0], rightCells[1], leftCells[2], leftCells[3]].join(" | ")} |`;
  return lines.join("\n");
}

// One probe per way the row check could be hollow: a sign clause that no longer quotes the
// register, a rollback clause that no longer quotes it, and an attribution moved between two
// rows without disturbing any count.
const CAS_ROW_PROBES = [
  {
    name: "corrupted_stop_clause",
    apply: (body, language, actions) => casTruncateClause(body, actions.get("P08")[`stop_trigger_${language}`]),
  },
  {
    name: "corrupted_rollback_clause",
    apply: (body, language, actions) => casTruncateClause(body, actions.get("P10")[`rollback_${language}`]),
  },
  {
    name: "swapped_p08_p10_attribution",
    apply: (body) => casSwapAttribution(body, 1, 4),
  },
];

// The ladder's published quantities, recomputed from the edge records. Kept as a pure
// function of the records so the mutation probe below can run it a second time over a
// deliberately corrupted copy: a claim list that cannot be made to stop matching is not
// evidence that the document was checked against anything.
function casLadderClaims(edges, unstable, thresholds) {
  const counts = {
    candidates: edges.length,
    changed: edges.filter((edge) => edge.primary_status !== edge.zero_jitter_status).map((edge) => edge.edge_id),
    primaryPersistent: edges.filter((edge) => edge.primary_status === "persistent_candidate").length,
    primaryDisagreement: edges.filter((edge) => edge.primary_status === "disagreement_candidate").length,
    zeroPersistent: edges.filter((edge) => edge.zero_jitter_status === "persistent_candidate").length,
    zeroBand: edges.filter((edge) => edge.zero_jitter_status === "disagreement_candidate").length,
    largestDelta: edges.reduce((most, edge) => Math.max(most, Math.abs(edge.delta)), 0),
  };
  const persistentRule = Number(thresholds?.persistent_min_frequency).toFixed(2);
  const disagreementRule = Number(thresholds?.disagreement_min_frequency).toFixed(2);
  const claims = {
    zh: [
      `${counts.candidates} 条候选边中有 ${counts.changed.length} 条改变状态`,
      `最大频率变化 ${counts.largestDelta}`,
      `持续边由 ${counts.primaryPersistent} 条变为 ${counts.zeroPersistent} 条`,
      `分歧带变为 ${counts.zeroBand} 条`,
      `仍有 ${unstable.length} 条边`,
      `${disagreementRule} 至 ${persistentRule} 区间`,
      `${counts.primaryDisagreement} 条分歧候选`,
      `${counts.primaryPersistent} 条持续候选`,
      // The single claim the ladder makes about what it did not implement. Losing this
      // sentence turns a bounded analogy back into a simulation claim.
      "通量—导度方程在本包中并未实现",
    ],
    en: [
      `${counts.changed.length} of the ${counts.candidates} candidate edges change status`,
      `the largest frequency change is ${counts.largestDelta}`,
      `persistent edges rise from ${counts.primaryPersistent} to ${counts.zeroPersistent}`,
      `the disagreement band falls to ${counts.zeroBand} edges`,
      `the ${disagreementRule} to ${persistentRule} band`,
      `${counts.primaryDisagreement} disagreement candidates`,
      `${counts.primaryPersistent} persistent candidates`,
      "flux–conductivity equation is not implemented anywhere in this package",
    ],
  };
  return { claims, counts };
}

// The three overclaims this package is most exposed to, as patterns rather than as fixed
// sentences: what has to stay out of the documents is a kind of statement, not one wording
// of it. `negators` is what turns each pattern from a banned word into a banned claim.
//
// `partialNegators` is the opposite. "not only an observed conflict in Beijing" contains a
// negator and asserts the claim anyway; so does 不只是被观测到的北京冲突. A guard that skips
// any clause holding a negator therefore lets the strongest form of the overclaim through,
// which is exactly what an independent mutation demonstrated. These openers are removed
// before the clause is asked whether anything actually negates it, so they can no longer
// stand in for a negation they do not perform.
const CAS_CLAIM_PATTERNS = {
  zh: {
    negators: /不是|并非|不构成|不代表|不能|不等于|绝非|不属于|无法|没有|未获|尚未|不会|不作/,
    partialNegators: /不只是|不只|不仅仅是|不仅仅|不仅|并非仅仅|并非只是|并非单纯|不单是|不单|不止是|不止于|不光是|不光/,
    claims: [
      { kind: "observed_conflict", pattern: /北京冲突|城市冲突|被观测到的冲突|实地冲突|实际冲突|观察到的冲突/ },
      { kind: "real_trade_off", pattern: /真实权衡|真实的权衡|现实权衡|现实中的权衡|真实世界的权衡/ },
      { kind: "authorized", pattern: /已获授权|已获批准|已获资金|已获许可|已立项|获得授权|获得批准|已可实施/ },
    ],
    gateClosed: /已关闭|已解除|已满足|已完成审查|已通过审查|不再阻断|不再开放|已不再阻断/,
  },
  en: {
    negators: /\bnot\b|\bnever\b|\bno\b|\bnor\b|\bcannot\b|\bwithout\b|rather than|instead of|does not|is not/i,
    partialNegators: /\bnot (?:only|merely|just|simply|solely|alone)\b|\bmore than (?:just|merely|simply)\b/i,
    claims: [
      { kind: "observed_conflict", pattern: /observed conflict|observed dispute|conflict observed|real conflict in Beijing/i },
      { kind: "real_trade_off", pattern: /real trade-off|real-world trade-off|actual trade-off|genuine trade-off/i },
      { kind: "authorized", pattern: /is authorised|is authorized|has been authorised|has been authorized|has been approved|is funded|has secured funding/i },
    ],
    gateClosed: /is (?:now )?closed|has been closed|has been (?:met|satisfied|resolved)|no longer blocks|is resolved/i,
  },
};

// Markup, backticks, and line breaks are formatting; the claim is the same claim whichever
// surface carries it, so all four documents are reduced to one comparable form first.
function casNormalize(text, markdown) {
  const stripped = markdown ? text : text.replace(/<[^>]+>/g, " ");
  return stripped.replace(/&amp;/g, "&").replace(/`/g, "").replace(/\s+/g, " ");
}

// A negation reaches only as far as the clause holding it. "not an observed conflict in
// Beijing" is a disclaimer; the same words one clause later with the negation dropped are a
// claim, and a document-wide or sentence-wide search for the negator would read the second
// as the first. The Chinese enumeration comma is deliberately not a boundary, because
// "does not amount to approved, funded, or confirmed feasible" is one negated list.
function casClauses(text, language) {
  const boundaries = language === "zh" ? /[。；，！？：—\n]+/ : /[.;,:?!\n—]+|\sand\s|\sor\s|\sbut\s/;
  return text.split(boundaries).map((clause) => clause.trim()).filter(Boolean);
}

// Whether a clause negates the claim it carries. The partial-negation openers are taken out
// first, because "not only X" and 不只是 X are assertions of X wearing a negator; whatever is
// left has to do the negating on its own. `String.split` matches every occurrence regardless
// of the /g flag, so the strip is total without a stateful regex.
function casNegates(clause, rules) {
  const residue = rules.partialNegators
    ? clause.split(rules.partialNegators).join(" ")
    : clause;
  return rules.negators.test(residue);
}

function casClaimFindings(text, language, markdown, gates) {
  const rules = CAS_CLAIM_PATTERNS[language];
  const findings = [];
  for (const clause of casClauses(casNormalize(text, markdown), language)) {
    if (casNegates(clause, rules)) continue;
    for (const claim of rules.claims) {
      if (claim.pattern.test(clause)) findings.push({ kind: claim.kind, clause });
    }
    for (const id of gates) {
      // Same clause, not adjacent words: a gate is claimed shut whether the sentence reads
      // "D12 is now closed" or "D12 has, on review, been resolved", and the clause is
      // already the unit the negation guard above works in.
      if (clause.includes(id) && rules.gateClosed.test(clause)) {
        findings.push({ kind: `gate_closed:${id}`, clause });
      }
    }
  }
  return findings;
}

// Each probe rewrites one published sentence into the overclaim it was written to avoid.
// A detector that has never been observed to fire is indistinguishable from one that cannot,
// so the case below runs these and fails if the document survives them unflagged.
const CAS_MUTATIONS = {
  zh: [
    {
      kind: "real_trade_off",
      from: "而不是被观测到的北京冲突，也不是已确认的真实权衡。",
      to: "而是被观测到的北京冲突，也是已确认的真实权衡。",
    },
    {
      // The partial-negation bypass, in Chinese. 不只是 asserts what follows it; a guard that
      // reads 不 as a negation reports this sentence as a disclaimer.
      kind: "observed_conflict",
      from: "而不是被观测到的北京冲突，也不是已确认的真实权衡。",
      to: "这不只是被观测到的北京冲突。",
    },
    {
      kind: "authorized",
      from: "全部行动保持未获授权与未获资金。",
      to: "全部行动已获授权并已获资金。",
    },
    {
      kind: "gate_closed:D12",
      from: "`D12` 因此保持开放",
      to: "`D12` 因此已关闭",
    },
  ],
  en: [
    {
      kind: "real_trade_off",
      from: "not to report an observed conflict in Beijing and not to establish a confirmed real-world trade-off.",
      to: "to report an observed conflict in Beijing and to establish a confirmed real-world trade-off.",
    },
    {
      // The sentence an independent mutation used to walk straight past the scan.
      kind: "observed_conflict",
      from: "not to report an observed conflict in Beijing and not to establish a confirmed real-world trade-off.",
      to: "This is not only an observed conflict in Beijing.",
    },
    {
      kind: "authorized",
      from: "every action remains without authorisation and without funding.",
      to: "every action has been approved and is funded.",
    },
    {
      kind: "gate_closed:D12",
      from: "`D12` stays open",
      to: "`D12` is now closed",
    },
  ],
};

check("CAS01", "the complex-adaptive-system sections publish only what the ablation record and the governance register hold", (fail) => {
  const ablation = readJson("visual/assets/physarum-zero-jitter-ablation.json");
  const edges = ablation.edges ?? [];
  const summary = ablation.summary ?? {};

  // Recomputed from the edge records rather than read out of the summary the prose quotes,
  // so a summary that drifted from its own edges fails here before the prose is examined.
  const unstable = summary.zero_jitter_still_unstable ?? [];
  const published = casLadderClaims(edges, unstable, ablation.thresholds);
  const {
    changed, primaryPersistent, primaryDisagreement, zeroPersistent, zeroBand, largestDelta, candidates,
  } = published.counts;
  const ladderClaims = published.claims;

  if (candidates !== summary.candidate_edges) {
    fail(`the ablation summary counts ${summary.candidate_edges} candidate edges, the edge records give ${candidates}`);
  }
  if (changed.join(",") !== (summary.edges_changing_status ?? []).join(",")) {
    fail(`the summary lists ${(summary.edges_changing_status ?? []).join(",")} as changing status, the edge records give ${changed.join(",")}`);
  }
  if (zeroPersistent !== summary.zero_jitter_persistent_edges) {
    fail(`the summary reports ${summary.zero_jitter_persistent_edges} zero-jitter persistent edges, the edge records give ${zeroPersistent}`);
  }
  if (zeroBand !== summary.zero_jitter_disagreement_band_edges) {
    fail(`the summary reports ${summary.zero_jitter_disagreement_band_edges} zero-jitter disagreement edges, the edge records give ${zeroBand}`);
  }
  if (largestDelta !== summary.largest_absolute_delta) {
    fail(`the summary reports a largest absolute delta of ${summary.largest_absolute_delta}, the edge records give ${largestDelta}`);
  }

  // Both directions. An edge the record says moved must be named, and an edge it says did
  // not move may not be named, so the published list cannot go stale in either direction.
  const namedEdges = new Set([...changed, ...unstable]);

  const governance = readJson("visual/assets/action-governance.json");
  const actions = new Map((governance.actions ?? []).map((action) => [action.id, action]));
  const registry = readJson("visual/assets/gate-registry.json");
  const externalGates = new Map(((registry.external_evidence_gate ?? {}).gates ?? []).map((gate) => [gate.id, gate]));

  for (const quoted of CAS_QUOTED_ACTIONS) {
    const action = actions.get(quoted.id);
    if (!action) {
      fail(`${quoted.id} is quoted by the ${quoted.section} section but is not in the governance register`);
      continue;
    }
    for (const field of quoted.fields) {
      for (const language of ["zh", "en"]) {
        const value = action[`${field}_${language}`];
        if (typeof value !== "string" || !value.trim()) {
          fail(`${quoted.id} is quoted for ${field} in ${language} but registers no such clause`);
        }
      }
    }
    // Naming an action in body prose may never imply that it became authorized or fundable.
    if (action.authorized_target !== null) {
      fail(`${quoted.id} is quoted in published prose and its authorized_target is ${JSON.stringify(action.authorized_target)}, expected null`);
    }
    if (action.pilot_start_allowed === true) {
      fail(`${quoted.id} is quoted in published prose and its pilot_start_allowed is true`);
    }
  }

  for (const gateId of CAS_NAMED_GATES) {
    const gate = externalGates.get(gateId);
    if (!gate) {
      fail(`${gateId} is named in the operating model but is not an external evidence gate`);
      continue;
    }
    if (gate.state !== "open") fail(`${gateId} is named as open in the operating model but the registry says ${JSON.stringify(gate.state)}`);
    if (gate.checkable !== false) fail(`${gateId} is named in the operating model and is checkable in the registry`);
  }

  // The row contract and the quoted-action table are two statements of the same attribution,
  // written for different purposes. If they ever disagree, one of them is stale and the case
  // would be checking the documents against an expectation nothing else shares.
  const expectedFailureActions = [...new Set(CAS_QUOTED_ACTIONS
    .filter((quoted) => quoted.section === "failure_modes")
    .map((quoted) => quoted.id))].sort().join(",");
  const contractActions = [...new Set(CAS_FAILURE_ROW_CONTRACT.map((row) => row.id))].sort().join(",");
  if (contractActions !== expectedFailureActions) {
    fail(`the failure-mode row contract names ${contractActions}, the quoted-action table names ${expectedFailureActions}`);
  }
  for (const contract of CAS_FAILURE_ROW_CONTRACT) {
    const quoted = CAS_QUOTED_ACTIONS
      .find((entry) => entry.section === "failure_modes" && entry.id === contract.id);
    const declared = [...new Set(quoted?.fields ?? [])].sort().join(",");
    const required = [...new Set([contract.sign, contract.mechanism])].sort().join(",");
    if (declared !== required) {
      fail(`${contract.id} is quoted for [${declared}] but its row quotes [${required}]`);
    }
  }

  const detail = {};
  for (const document of CAS_DOCUMENTS) {
    if (!exists(document.file)) {
      fail(`${document.file} does not exist`);
      continue;
    }
    const text = readText(document.file);
    const bodies = {};
    for (const [key, titles] of Object.entries(CAS_SECTIONS)) {
      const title = titles[document.language];
      const section = casSection(text, title, document.markdown);
      if (section.found !== 1) {
        fail(`${document.file} carries ${section.found} copies of the section "${title}", expected exactly 1`);
      }
      bodies[key] = section.body;
    }

    for (const claim of ladderClaims[document.language]) {
      if (!bodies.method_ladder.includes(claim)) {
        fail(`${document.file} does not publish the recomputed statement ${JSON.stringify(claim)}`);
      }
    }

    for (const edge of edges) {
      const named = bodies.method_ladder.includes(edge.edge_id);
      if (named !== namedEdges.has(edge.edge_id)) {
        fail(named
          ? `${document.file} names ${edge.edge_id} in the ablation result, but that edge neither changed status nor stayed unstable`
          : `${document.file} omits ${edge.edge_id}, which the ablation record reports as changed or still unstable`);
      }
    }

    for (const quoted of CAS_QUOTED_ACTIONS) {
      if (!bodies[quoted.section].includes(quoted.id)) {
        fail(`${document.file} does not name ${quoted.id} in its ${quoted.section} section`);
      }
    }

    for (const gateId of CAS_NAMED_GATES) {
      if (!bodies.operating_model.includes(gateId)) {
        fail(`${document.file} does not name ${gateId} where the operating model states it stays open`);
      }
    }

    // The row arithmetic is checked on the authored Markdown only. The rendered HTML is
    // generated from it, so counting rows there would test the renderer twice and the
    // proposal once.
    if (document.markdown) {
      const problems = casFailureRowProblems(bodies.failure_modes, document.language, actions);
      for (const problem of problems) fail(`${document.file} ${problem}`);
      const rows = casTableRowLines(bodies.failure_modes).map((entry) => entry.line);
      detail[document.file] = {
        failure_rows: rows.length,
        registered_rows: rows.filter((row) => /P\d\d/.test(row)).length,
        actions: [...new Set(rows.flatMap((row) => row.match(/P\d\d/g) ?? []))].sort().join(","),
        row_problems: problems.length,
      };
    } else {
      detail[document.file] = { sections: Object.keys(bodies).length };
    }
  }

  // What the sections may not say, and proof that the checks for it work.
  //
  // The scan runs on every published surface. The probes run on the two authored Markdown
  // files only: the reports are rendered from them, so mutating a report would exercise the
  // renderer rather than the proposal. Each text probe rewrites one real sentence into the
  // claim it was written to avoid; each row probe corrupts one registered quotation or moves
  // one attribution between rows; and the last probe moves one edge into the other zero-jitter
  // status class and requires at least one published quantity to stop matching. Without them a
  // scan that had quietly stopped matching anything, a row check reading nothing, or a set of
  // claims no longer tied to the record would all still report a pass.
  const flipIndex = edges.findIndex((edge) => edge.zero_jitter_status === "persistent_candidate");
  if (flipIndex === -1) fail("no zero-jitter persistent edge exists to probe the published quantities with");
  const probes = { fired: 0, byKind: {}, missed: [] };
  const fired = (kind) => {
    probes.fired += 1;
    probes.byKind[kind] = (probes.byKind[kind] ?? 0) + 1;
  };
  for (const document of CAS_DOCUMENTS) {
    if (!exists(document.file)) continue;
    const text = readText(document.file);
    for (const finding of casClaimFindings(text, document.language, document.markdown, CAS_NAMED_GATES)) {
      fail(`${document.file} publishes a ${finding.kind} claim: ${JSON.stringify(finding.clause.slice(0, 140))}`);
    }
    if (!document.markdown) continue;

    for (const mutation of CAS_MUTATIONS[document.language]) {
      if (!text.includes(mutation.from)) {
        fail(`${document.file} no longer carries the sentence the ${mutation.kind} probe rewrites`);
        continue;
      }
      const mutated = text.replace(mutation.from, mutation.to);
      const caught = casClaimFindings(mutated, document.language, document.markdown, CAS_NAMED_GATES)
        .some((finding) => finding.kind === mutation.kind);
      if (caught) fired(`claim:${mutation.kind}`);
      else probes.missed.push(`${document.file}:claim:${mutation.kind}`);
    }

    const failureBody = casSection(text, CAS_SECTIONS.failure_modes[document.language], document.markdown).body;
    for (const probe of CAS_ROW_PROBES) {
      const mutated = probe.apply(failureBody, document.language, actions);
      if (mutated === failureBody) {
        fail(`${document.file}: the ${probe.name} probe changed nothing, so it proves nothing`);
        continue;
      }
      const caught = casFailureRowProblems(mutated, document.language, actions).length > 0;
      if (caught) fired(`row:${probe.name}`);
      else probes.missed.push(`${document.file}:row:${probe.name}`);
    }

    if (flipIndex >= 0) {
      const moved = edges.map((edge, index) => (index === flipIndex
        ? { ...edge, zero_jitter_status: "disagreement_candidate" }
        : edge));
      const drifted = casLadderClaims(moved, unstable, ablation.thresholds)
        .claims[document.language]
        .filter((claim) => !text.includes(claim));
      if (drifted.length === 0) {
        fail(`${document.file} would still satisfy every published quantity after ${edges[flipIndex].edge_id} changes zero-jitter status`);
      } else {
        fired("ladder:zero_jitter_status_flip");
      }
    }
  }
  for (const missed of probes.missed) {
    fail(`the scan does not catch the ${missed} mutation, so it cannot be relied on`);
  }

  return {
    ...detail,
    probes_fired: probes.fired,
    probes_by_kind: probes.byKind,
    probes_missed: probes.missed,
    candidate_edges: candidates,
    edges_changing_status: changed.length,
    zero_jitter_persistent_edges: zeroPersistent,
    zero_jitter_disagreement_band_edges: zeroBand,
    largest_absolute_delta: largestDelta,
    quoted_actions: CAS_QUOTED_ACTIONS.length,
    failure_row_contract: CAS_FAILURE_ROW_CONTRACT.length,
  };
});

check("C01", "the changelog still carries 14 Class C tasks and all 17 Class D gates", (fail) => {
  const changelog = readText("changelog.md");
  const classC = (changelog.match(/\*\*C\d\d\s/g) || []).length;
  if (classC !== 14) fail(`expected 14 Class C tasks, found ${classC}`);
  const missing = [];
  for (let index = 1; index <= 17; index += 1) {
    const gate = `D${String(index).padStart(2, "0")}`;
    if (!changelog.includes(gate)) missing.push(gate);
  }
  if (missing.length > 0) fail(`missing Class D gates: ${missing.join(", ")}`);
  // A Class D gate is external evidence and must stay non-checkable, so it may not
  // appear as a checkbox row at all — ticked or not.
  const checkboxIds = Array.from(changelog.matchAll(/^- \[[ x]\]\s*\*{0,2}`?([A-Z]\d\d)`?/gm), (match) => match[1]);
  const checkableD = checkboxIds.filter((id) => id.startsWith("D"));
  for (const id of checkableD) fail(`Class D gate ${id} is written as a checkbox row; D gates are non-checkable`);
  const tickedC = Array.from(changelog.matchAll(/^- \[x\]\s*\*{0,2}`?(C\d\d)`?/gm), (match) => match[1]);
  return { class_c: classC, class_d: 17 - missing.length, closed_class_c: tickedC };
});

check("EM01", "every reference in both evidence matrices resolves to the artifact it names", (fail) => {
  const { exitCode, payload } = runNode("visual/assets/build-matrices.js", ["--check"]);
  if (payload.status !== "PASS") fail(`build-matrices reported ${payload.status}`);
  for (const problem of payload.failures ?? []) fail(problem);
  if (payload.references_unresolved !== 0) {
    fail(`${payload.references_unresolved} references do not resolve`);
  }
  // A non-zero exit here means the published matrices differ from what the map produces,
  // which is the same defect as an unresolved reference: the file on disk is not the file
  // the evidence says it is.
  if (exitCode !== 0) fail(`the published matrices are out of date with the evidence map (exit ${exitCode})`);
  return {
    references_checked: payload.references_checked,
    references_resolved: payload.references_resolved,
    requirements: payload.requirements,
    design_depth_items: payload.design_depth_items,
  };
});

check("EM02", "neither evidence matrix cites the same set on every row", (fail) => {
  const matrices = [
    {
      label: "compliance_matrix.json",
      rows: readJson("compliance_matrix.json").requirements,
      idKey: "requirement_id",
      arrays: ["report_sections", "geojson_layers", "metrics", "drawings", "visual_sections", "source_ids", "assumption_ids", "self_check_ids"],
    },
    {
      label: "design_depth_matrix.json",
      rows: readJson("design_depth_matrix.json").items,
      idKey: "item_id",
      arrays: ["proposal_sections", "drawing_refs", "geometry_refs", "metric_refs", "source_ids", "assumption_ids", "self_check_ids"],
    },
  ];
  const detail = {};
  for (const matrix of matrices) {
    for (const key of matrix.arrays) {
      const missing = matrix.rows.filter((row) => !Array.isArray(row[key]) || row[key].length === 0);
      for (const row of missing) fail(`${matrix.label}: ${row[matrix.idKey]} has an empty ${key}`);
      if (missing.length > 0) continue;
      // The defect this replaced: one citation set repeated on every row, which says the
      // same thing about every requirement and so lets a reader check none of them.
      const universal = matrix.rows[0][key].filter((value) => matrix.rows.every((row) => row[key].includes(value)));
      for (const value of universal) {
        fail(`${matrix.label}: every row cites ${value} in ${key}`);
      }
    }
    // Sources are the reference kind that had collapsed hardest, so they carry the stricter
    // rule: no two rows may rest on exactly the same set of sources.
    const sourceSets = matrix.rows.map((row) => JSON.stringify(row.source_ids ?? []));
    const distinct = new Set(sourceSets).size;
    if (distinct !== matrix.rows.length) {
      fail(`${matrix.label}: only ${distinct} distinct source sets across ${matrix.rows.length} rows`);
    }
    detail[matrix.label] = { rows: matrix.rows.length, distinct_source_sets: distinct };
  }
  return detail;
});

check("EM03", "each key-area requirement cites its own area's plates, components, and routes only", (fail) => {
  const areas = [
    { requirement: "1.5.3.1", plate: "ZZY-", component: "Z-C", route: "Z-R", envelope: "ENV-ZY-01" },
    { requirement: "1.5.3.2", plate: "AIO-", component: "O-C", route: "O-R", envelope: "ENV-AO-01" },
    { requirement: "1.5.3.3", plate: "DZS-", component: "D-C", route: "D-R", envelope: "ENV-DZ-01" },
  ];
  const rows = new Map(readJson("compliance_matrix.json").requirements.map((row) => [row.requirement_id, row]));
  // How many step-free chains an area publishes is a fact about its design, not a quota.
  // Zhongzhiyuan has two pedestrian chains and the AI Origin Community has four; demanding
  // three everywhere would force one of them to invent a chain or drop a real one. Reading
  // the count from the register makes this the stronger check: the matrix has to cite every
  // chain the area actually publishes, so an omitted chain and an invented one both fail.
  const registerRoutes = new Map();
  for (const area of readJson("visual/assets/regeneration-source.json").areas ?? []) {
    for (const route of area.routes ?? []) {
      const prefix = route.id.slice(0, 3);
      registerRoutes.set(prefix, (registerRoutes.get(prefix) ?? 0) + 1);
    }
  }
  const detail = {};
  for (const area of areas) {
    const row = rows.get(area.requirement);
    if (!row) {
      fail(`compliance_matrix.json has no requirement ${area.requirement}`);
      continue;
    }
    const expect = (key, prefix, count) => {
      const values = row[key] ?? [];
      if (values.length !== count) fail(`${area.requirement}: expected ${count} entries in ${key}, found ${values.length}`);
      // Citing another area's component would mean the three areas are not actually
      // carrying different content, which is the claim these rows exist to support.
      const foreign = values.filter((value) => !value.startsWith(prefix));
      for (const value of foreign) fail(`${area.requirement}: ${key} cites ${value}, which is not a ${prefix}* reference`);
    };
    expect("plate_refs", area.plate, SEMANTIC_PLATES_PER_AREA);
    expect("component_refs", area.component, 5);
    const publishedRoutes = registerRoutes.get(area.route) ?? 0;
    if (publishedRoutes === 0) {
      fail(`${area.requirement}: regeneration-source.json publishes no ${area.route}* step-free chain`);
    }
    expect("route_refs", area.route, publishedRoutes);
    if (JSON.stringify(row.envelope_refs ?? []) !== JSON.stringify([area.envelope])) {
      fail(`${area.requirement}: envelope_refs must be exactly [${area.envelope}]`);
    }
    detail[area.requirement] = {
      plates: (row.plate_refs ?? []).length,
      components: (row.component_refs ?? []).length,
      routes: (row.route_refs ?? []).length,
    };
  }
  return detail;
});

// The fourteen key-area tests. Each is a standalone executable that reads the shared contract
// module, so a failure can be reproduced with one command; this file only registers their
// results. Requiring rather than spawning keeps a suite run to a single process and means a
// contract change cannot be seen by one test and missed by another.
for (const script of [
  "./test-key-area-inventory.js",
  "./test-key-area-registry.js",
  "./test-key-area-spatial-content.js",
  "./test-step-free-chain.js",
  "./test-winter-maintenance.js",
  "./test-dazhongsi-claim-limits.js",
  "./test-phase-accountability.js",
  "./test-evidence-resolution.js",
  "./test-source-normalization.js",
  "./test-publication-parity.js",
  "./test-english-language-integrity.js",
  "./test-gate-namespace.js",
  "./test-denominator-discipline.js",
  "./test-threshold-quantization.js",
]) {
  const outcome = require(script).run();
  check(outcome.id, outcome.description, (fail) => {
    for (const failure of outcome.failures) fail(failure);
    return outcome.detail;
  });
}

check("N01", "every JavaScript asset parses", (fail) => {
  const scripts = fs.readdirSync(ASSETS).filter((name) => name.endsWith(".js")).sort();
  for (const name of scripts) {
    const result = spawnSync(process.execPath, ["--check", path.join(ASSETS, name)], { encoding: "utf8" });
    if (result.status !== 0) fail(`${name}: ${(result.stderr || "").split("\n")[0]}`);
  }
  return { scripts };
});

const CASE_NAMESPACE_AUDIT_ID = "NS01";
check(CASE_NAMESPACE_AUDIT_ID, "aggregate case IDs are unique and never reuse a reserved gate or self-check ID", (fail) => {
  const registry = readJson("visual/assets/gate-registry.json");
  const caseIds = [...results.map((result) => result.id), CASE_NAMESPACE_AUDIT_ID];
  const reservedEntries = [
    ...(registry.human_design_gate?.gates ?? []).map((gate) => ({ namespace: "G", id: gate.id })),
    ...(registry.machine_self_check_gate?.ids ?? []).map((id) => ({ namespace: "self_check", id })),
    ...(registry.human_authorization_gate?.gates ?? []).map((gate) => ({ namespace: "H", id: gate.id })),
    ...(registry.external_evidence_gate?.gates ?? []).map((gate) => ({ namespace: "D", id: gate.id })),
  ];
  const audit = auditIdentifierNamespaces(caseIds, reservedEntries);

  for (const duplicate of audit.duplicate_case_ids) {
    fail(`aggregate case ID ${JSON.stringify(duplicate.id)} occurs ${duplicate.count} times`);
  }
  for (const duplicate of audit.duplicate_reserved_ids) {
    fail(`reserved ID ${JSON.stringify(duplicate.id)} occurs ${duplicate.count} times across ${duplicate.namespaces.join(",")}`);
  }
  for (const id of audit.reserved_case_collisions) {
    fail(`aggregate case ID ${JSON.stringify(id)} collides with a reserved gate or self-check ID`);
  }

  const mutationProbes = [
    {
      name: "duplicate aggregate case ID",
      caught: auditIdentifierNamespaces(["MUT-CASE", "MUT-CASE"], []).duplicate_case_ids.some((item) => item.id === "MUT-CASE"),
    },
    {
      name: "case ID reusing a reserved ID",
      caught: auditIdentifierNamespaces(["MUT-RESERVED"], [{ namespace: "G", id: "MUT-RESERVED" }])
        .reserved_case_collisions.includes("MUT-RESERVED"),
    },
    {
      name: "reserved ID reused across namespaces",
      caught: auditIdentifierNamespaces([], [
        { namespace: "G", id: "MUT-CROSS" },
        { namespace: "D", id: "MUT-CROSS" },
      ]).duplicate_reserved_ids.some((item) => item.id === "MUT-CROSS"),
    },
  ];
  for (const probe of mutationProbes) {
    if (!probe.caught) fail(`namespace audit did not catch mutation: ${probe.name}`);
  }

  return {
    case_ids: caseIds.length,
    reserved_ids: reservedEntries.length,
    mutation_probes_caught: mutationProbes.map((probe) => probe.name),
  };
});

const failed = results.filter((result) => result.status === "FAIL");
const report = {
  status: failed.length === 0 ? "PASS" : "FAIL",
  exit_code: failed.length === 0 ? 0 : 1,
  cases_run: results.length,
  cases_failed: failed.length,
  failed_ids: failed.map((result) => result.id),
  results,
};
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
process.exitCode = report.exit_code;
