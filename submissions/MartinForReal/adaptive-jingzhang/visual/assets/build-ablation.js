#!/usr/bin/env node
"use strict";

// Publishes the zero-jitter comparison for every candidate edge.
//
// The primary ensemble draws five weights and then one jitter value per edge from each
// seed's stream. The ablation keeps the weight draws exactly as they are and sets the
// jitter term to zero, so the two runs differ in one term and nothing else. Because each
// seed opens a fresh generator and the weight draws precede the jitter draws, the weights
// are identical to the primary run seed for seed; the delta therefore isolates what the
// jitter term alone contributes to selection instability.
//
// Scoring and the Kruskal pass are imported from reproduce_physarum.js rather than
// reimplemented, so the comparison cannot drift away from the published record.
//
// Both frozen assets are opened read-only and their SHA-256 values are checked before and
// after the run. This script writes one file and never touches them.
//
// Usage: node build-ablation.js [--check]

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const reproducer = require("./reproduce_physarum.js");

const {
  buildEdges,
  statusFor,
  selectForSeed,
  componentsOrConnected,
  locateAssets,
  readJson,
  constants,
} = reproducer;

const {
  SEED_COUNT,
  JITTER_RANGE,
  METHOD_NAME_EN,
  METHOD_NAME_ZH,
} = constants;

const OUTPUT = path.join(__dirname, "physarum-zero-jitter-ablation.json");

const FROZEN_SHA256 = {
  "physarum-inputs.json": "5e5a9be65bb122617798bf488f12fc5838dfba46aead6d824b679b48db718d53",
  "physarum-runs.json": "ea93df307c30bd90024438ed1dc4704a4e7bec8f4b456a7ec323c914ea4e06fe",
};

// Published so the two disagreement bands and the persistence cut can be read off this
// record without opening the proposal.
const THRESHOLDS = {
  persistent_min_frequency: 0.7,
  highest_disagreement_frequency: 0.6875,
  mid_disagreement_frequency: 0.5,
  disagreement_min_frequency: 0.35,
};

function hashFrozen(directory) {
  const observed = {};
  for (const name of Object.keys(FROZEN_SHA256)) {
    observed[name] = crypto.createHash("sha256")
      .update(fs.readFileSync(path.join(directory, name)))
      .digest("hex");
  }
  return observed;
}

function assertFrozen(observed, failures, when) {
  for (const [name, expected] of Object.entries(FROZEN_SHA256)) {
    if (observed[name] !== expected) failures.push(`${name} differs from its recorded hash ${when}`);
  }
}

// One seed of the ensemble. `useJitter` is the only difference between the two runs. The
// seeded selection itself lives in reproduce_physarum.js and is imported rather than
// restated here, so the ablation cannot drift away from the published record.
function selectForSeedHere(seed, edges, nodeIds, useJitter) {
  return selectForSeed(seed, edges, nodeIds, useJitter).selected;
}

function frequencies(edges, nodeIds, useJitter) {
  const counts = new Map(edges.map((edge) => [edge.id, 0]));
  const selectedPerRun = new Set();
  const perSeed = [];
  for (let seed = 0; seed < SEED_COUNT; seed += 1) {
    const selected = selectForSeedHere(seed, edges, nodeIds, useJitter);
    selectedPerRun.add(selected.length);
    perSeed.push(selected.map((edge) => edge.id));
    for (const edge of selected) counts.set(edge.id, counts.get(edge.id) + 1);
  }
  return { counts, perSeed, selectedPerRun: Array.from(selectedPerRun).sort((a, b) => a - b) };
}

function main(argv) {
  const checkOnly = argv.includes("--check");
  const failures = [];
  const assets = locateAssets();
  const before = hashFrozen(assets.directory);
  assertFrozen(before, failures, "before the run");

  const inputs = readJson(assets.inputs);
  const runs = readJson(assets.runs);
  const { nodeIds, edges } = buildEdges(inputs, { compareRounded6() {} });

  const primary = frequencies(edges, nodeIds, true);
  const ablated = frequencies(edges, nodeIds, false);

  // The recomputed primary run must reproduce the frozen record seed for seed, otherwise
  // the comparison would be against something other than what the package publishes.
  const frozenSeeds = Array.isArray(runs.run_records) ? runs.run_records : [];
  if (frozenSeeds.length !== SEED_COUNT) {
    failures.push(`the frozen run record holds ${frozenSeeds.length} seeds, expected ${SEED_COUNT}`);
  }
  const frozenCounts = new Map(edges.map((edge) => [edge.id, 0]));
  for (const frozen of frozenSeeds) {
    const recomputed = primary.perSeed[frozen.seed];
    if (!recomputed) {
      failures.push(`seed ${frozen.seed} appears in the frozen record but was not recomputed`);
      continue;
    }
    const expected = [...frozen.selected_edges].sort();
    const actual = [...recomputed].sort();
    if (expected.join(",") !== actual.join(",")) {
      failures.push(`seed ${frozen.seed}: recomputed selection ${actual.join("|")} differs from the frozen ${expected.join("|")}`);
    }
    for (const id of frozen.selected_edges) {
      if (!frozenCounts.has(id)) {
        failures.push(`seed ${frozen.seed} selects ${id}, which is not a candidate edge`);
        continue;
      }
      frozenCounts.set(id, frozenCounts.get(id) + 1);
    }
  }

  const rows = edges.map((edge) => {
    const primaryFrequency = primary.counts.get(edge.id) / SEED_COUNT;
    const zeroJitterFrequency = ablated.counts.get(edge.id) / SEED_COUNT;
    const frozenFrequency = frozenCounts.get(edge.id) / SEED_COUNT;
    if (Math.abs(frozenFrequency - primaryFrequency) > 1e-9) {
      failures.push(
        `${edge.id}: recomputed primary frequency ${primaryFrequency} does not match the frozen ${frozenFrequency}`,
      );
    }
    return {
      edge_id: edge.id,
      primary_frequency: primaryFrequency,
      zero_jitter_frequency: zeroJitterFrequency,
      delta: Number((zeroJitterFrequency - primaryFrequency).toFixed(6)),
      primary_status: statusFor(primaryFrequency),
      zero_jitter_status: statusFor(zeroJitterFrequency),
    };
  });

  if (rows.length !== 24) failures.push(`expected 24 candidate edges, built ${rows.length}`);
  for (const [label, run] of [["primary", primary], ["zero-jitter", ablated]]) {
    if (run.selectedPerRun.length !== 1 || run.selectedPerRun[0] !== 11) {
      failures.push(`${label} run selected ${run.selectedPerRun.join("/")} edges per seed, expected 11 in every seed`);
    }
  }

  // With the jitter removed every seed scores each edge on weights alone, so an edge that
  // is not on the margin is either always or never selected. Anything on the margin is
  // reported rather than hidden, because it would mean weight variation alone still
  // changes the selection.
  const notBinary = rows.filter((row) => row.zero_jitter_frequency !== 0 && row.zero_jitter_frequency !== 1);
  const changedStatus = rows.filter((row) => row.primary_status !== row.zero_jitter_status);

  // The three numbers the package quotes about the ablation, recomputed here and checked
  // against the same expectations the reproducer asserts. A drift is reported as a failure
  // rather than written out as a new result.
  const zeroJitterPersistentIds = rows
    .filter((row) => row.zero_jitter_status === "persistent_candidate")
    .map((row) => row.edge_id);
  const zeroJitterDisagreementIds = rows
    .filter((row) => row.zero_jitter_status === "disagreement_candidate")
    .map((row) => row.edge_id);
  const zeroJitterPersistenceGraph = componentsOrConnected(
    nodeIds,
    edges.filter((edge) => zeroJitterPersistentIds.includes(edge.id)),
  );
  const expectedZeroJitter = constants.PUBLISHED_EXPECTATIONS.zero_jitter_ablation;
  if (zeroJitterPersistentIds.length !== expectedZeroJitter.persistent_edges) {
    failures.push(`the zero-jitter run yields ${zeroJitterPersistentIds.length} persistent edges, published ${expectedZeroJitter.persistent_edges}`);
  }
  if (zeroJitterDisagreementIds.length !== expectedZeroJitter.disagreement_band_edges) {
    failures.push(`the zero-jitter run yields ${zeroJitterDisagreementIds.length} disagreement-band edges, published ${expectedZeroJitter.disagreement_band_edges}`);
  }
  if (zeroJitterPersistenceGraph !== expectedZeroJitter.persistence_graph) {
    failures.push(`the zero-jitter persistence graph is ${JSON.stringify(zeroJitterPersistenceGraph)}, published ${JSON.stringify(expectedZeroJitter.persistence_graph)}`);
  }

  const record = {
    schema_version: "1.0.0",
    record_id: "adaptive_jingzhang.zero_jitter_ablation.v0_3",
    method_id: constants.METHOD_ID,
    method_name_en: METHOD_NAME_EN,
    method_name_zh: METHOD_NAME_ZH,
    generated_by: "visual/assets/build-ablation.js",
    definition_zh: "消融运行与主运行只差一项：每条边的 jitter 项置零，五个权重的抽取次序与取值完全保持不变。因此两者之差只归因于 jitter 项。",
    definition_en: "The ablation differs from the primary run in exactly one term: the per-edge jitter is set to zero while the five weight draws keep their order and their values. The difference is therefore attributable to the jitter term alone.",
    jitter_range: JITTER_RANGE,
    seeds: SEED_COUNT,
    selected_edges_per_run: 11,
    thresholds: THRESHOLDS,
    summary: {
      candidate_edges: rows.length,
      edges_changing_status: changedStatus.map((row) => row.edge_id),
      largest_absolute_delta: rows.reduce((worst, row) => Math.max(worst, Math.abs(row.delta)), 0),
      zero_jitter_always_selected: rows.filter((row) => row.zero_jitter_frequency === 1).map((row) => row.edge_id),
      zero_jitter_never_selected: rows.filter((row) => row.zero_jitter_frequency === 0).map((row) => row.edge_id),
      zero_jitter_still_unstable: notBinary.map((row) => row.edge_id),
      zero_jitter_persistent_edges: zeroJitterPersistentIds.length,
      zero_jitter_disagreement_band_edges: zeroJitterDisagreementIds.length,
      zero_jitter_persistence_graph: zeroJitterPersistenceGraph,
    },
    edges: rows,
    limitations_zh: [
      "输入依赖：全部节点属性与候选边都是公开声明的概念性代理，不是实测场地数据；消融只检验计算对 jitter 的敏感性，不检验这些代理是否成立。",
      "各向异性：归一化坐标到米的换算是方法声明的两个固定常数 X_SCALE_M=1374.006827 与 Y_SCALE_M=9723.469847，x 与 y 并不相等。复现脚本不重新拟合这两个常数，而是用它们重建每条候选边的长度并与记录值比对，任何一条相差超过 0.001 米即中止并指名该边。这两个常数是声明值而非实测值，因此任何据此读出的长度关系都同时继承这一各向异性与这一声明性质。",
      "jitter 语义：jitter 是声明的输入扰动，不是测量误差，也不代表现实中的不确定度；置零后得到的稳定选择不等于更正确的选择。",
      "两次运行都在人工声明的候选集上进行。消融不能新增任何候选连接，也不能说明被排除的连接是否本应存在。",
    ],
    limitations_en: [
      "Input dependence: every node attribute and candidate edge is a disclosed conceptual proxy, not observed site data. The ablation tests how sensitive the computation is to jitter, not whether those proxies hold.",
      "Anisotropy: the normalized-to-metre conversion is two fixed constants declared by the method, X_SCALE_M=1374.006827 and Y_SCALE_M=9723.469847, and x does not equal y. The reproducer does not re-fit them. It rebuilds every candidate length from those constants, compares it against the recorded length, and aborts naming the edge if any disagreement exceeds 0.001 m. The constants are declared, not surveyed, so any length relation read off this record inherits both that anisotropy and that declared origin.",
      "Jitter semantics: jitter is a declared input perturbation, not measurement error and not a representation of real-world uncertainty. A stable selection after zeroing it is not a more correct selection.",
      "Both runs operate on a hand-declared candidate set. The ablation cannot add a candidate connection, and it says nothing about whether an excluded connection ought to exist.",
    ],
    not_a_finding_zh: "本记录是计算透明性材料，不是设计结论。它不能证明任何一条走廊应当建设。",
    not_a_finding_en: "This record is computational transparency material, not a design conclusion. It cannot show that any corridor ought to be built.",
  };

  const serialized = `${JSON.stringify(record, null, 2)}\n`;
  const existing = fs.existsSync(OUTPUT) ? fs.readFileSync(OUTPUT, "utf8") : null;
  const changed = serialized !== existing;
  if (changed && !checkOnly && failures.length === 0) {
    fs.writeFileSync(OUTPUT, serialized, "utf8");
  }

  const after = hashFrozen(assets.directory);
  assertFrozen(after, failures, "after the run");

  const report = {
    status: failures.length === 0 ? "PASS" : "FAIL",
    exit_code: failures.length === 0 ? (checkOnly && changed ? 1 : 0) : 1,
    mode: checkOnly ? "check" : "write",
    changed,
    candidate_edges: rows.length,
    seeds_cross_checked_against_frozen_record: frozenSeeds.length,
    edges_changing_status: record.summary.edges_changing_status,
    largest_absolute_delta: record.summary.largest_absolute_delta,
    frozen_sha256: after,
    failures,
  };
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  return report.exit_code;
}

if (require.main === module) {
  try {
    process.exitCode = main(process.argv.slice(2));
  } catch (error) {
    process.stdout.write(`${JSON.stringify({
      status: "FAIL",
      exit_code: 2,
      error_type: "build_error",
      error: error instanceof Error ? error.message : String(error),
    }, null, 2)}\n`);
    process.exitCode = 2;
  }
}

module.exports = { selectForSeed: selectForSeedHere, frequencies };
