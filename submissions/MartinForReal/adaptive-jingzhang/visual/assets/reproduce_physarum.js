#!/usr/bin/env node
"use strict";

/*
 * Standard-library-only verifier for the Adaptive Jing-Zhang topology-proxy
 * ensemble. The generator used CPython random.Random(integer_seed). This file
 * implements the same MT19937 initialization and 53-bit random() construction,
 * then recomputes all 64 runs from the published inputs.
 *
 * It verifies computation, not urban truth: every node attribute and candidate
 * edge is a disclosed conceptual policy proxy rather than observed site data.
 */

const fs = require("fs");
const path = require("path");

const METHOD_ID = "adaptive_jingzhang.topology_proxy_ensemble.v0";
const SEED_COUNT = 64;
const EXTRA_EDGE_COUNT = 2;
const PERSISTENT_THRESHOLD = 0.7;
const DISAGREEMENT_THRESHOLD = 0.35;
const WEIGHT_ORDER = [
  "length",
  "equity_gain",
  "climate_gain",
  "heritage_review",
  "maintenance",
];
const WEIGHT_RANGES = {
  length: [0.25, 0.45],
  equity_gain: [0.18, 0.32],
  climate_gain: [0.12, 0.26],
  heritage_review: [0.12, 0.3],
  maintenance: [0.08, 0.2],
};
const JITTER_RANGE = [-0.12, 0.12];

class PythonRandom {
  constructor(seed) {
    if (!Number.isInteger(seed) || seed < 0 || seed > 0xffffffff) {
      throw new TypeError("PythonRandom seed must be an unsigned 32-bit integer");
    }
    this.mt = new Uint32Array(624);
    this.index = 624;
    // CPython's integer seeding passes little-endian 32-bit words to
    // init_by_array. Seeds 0..63 therefore use one word each.
    this.initByArray([seed >>> 0]);
  }

  initGenrand(seed) {
    this.mt[0] = seed >>> 0;
    for (let i = 1; i < 624; i += 1) {
      const previous = this.mt[i - 1];
      const mixed = previous ^ (previous >>> 30);
      this.mt[i] = (Math.imul(1812433253, mixed) + i) >>> 0;
    }
    this.index = 624;
  }

  initByArray(key) {
    this.initGenrand(19650218);
    let i = 1;
    let j = 0;
    let k = Math.max(624, key.length);
    for (; k > 0; k -= 1) {
      const previous = this.mt[i - 1];
      const mixed = previous ^ (previous >>> 30);
      this.mt[i] = (
        (this.mt[i] ^ Math.imul(mixed, 1664525)) + key[j] + j
      ) >>> 0;
      i += 1;
      j += 1;
      if (i >= 624) {
        this.mt[0] = this.mt[623];
        i = 1;
      }
      if (j >= key.length) {
        j = 0;
      }
    }
    for (k = 623; k > 0; k -= 1) {
      const previous = this.mt[i - 1];
      const mixed = previous ^ (previous >>> 30);
      this.mt[i] = (
        (this.mt[i] ^ Math.imul(mixed, 1566083941)) - i
      ) >>> 0;
      i += 1;
      if (i >= 624) {
        this.mt[0] = this.mt[623];
        i = 1;
      }
    }
    this.mt[0] = 0x80000000;
    this.index = 624;
  }

  twist() {
    const upperMask = 0x80000000;
    const lowerMask = 0x7fffffff;
    for (let i = 0; i < 624; i += 1) {
      const y = (this.mt[i] & upperMask) | (this.mt[(i + 1) % 624] & lowerMask);
      let next = this.mt[(i + 397) % 624] ^ (y >>> 1);
      if ((y & 1) !== 0) {
        next ^= 0x9908b0df;
      }
      this.mt[i] = next >>> 0;
    }
    this.index = 0;
  }

  uint32() {
    if (this.index >= 624) {
      this.twist();
    }
    let value = this.mt[this.index];
    this.index += 1;
    value ^= value >>> 11;
    value ^= (value << 7) & 0x9d2c5680;
    value ^= (value << 15) & 0xefc60000;
    value ^= value >>> 18;
    return value >>> 0;
  }

  random() {
    const high = this.uint32() >>> 5;
    const low = this.uint32() >>> 6;
    return (high * 67108864 + low) / 9007199254740992;
  }

  uniform(lower, upper) {
    return lower + (upper - lower) * this.random();
  }
}

function locateAssets() {
  const candidates = [
    __dirname,
    path.join(
      __dirname,
      "..",
      "haidian",
      "submissions",
      "MartinForReal",
      "adaptive-jingzhang",
      "visual",
      "assets",
    ),
  ];
  for (const directory of candidates) {
    const inputs = path.join(directory, "physarum-inputs.json");
    const runs = path.join(directory, "physarum-runs.json");
    if (fs.existsSync(inputs) && fs.existsSync(runs)) {
      return { directory, inputs, runs };
    }
  }
  throw new Error("cannot locate physarum-inputs.json and physarum-runs.json");
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function canonical(value) {
  if (Array.isArray(value)) {
    return `[${value.map(canonical).join(",")}]`;
  }
  if (value !== null && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => (
      `${JSON.stringify(key)}:${canonical(value[key])}`
    )).join(",")}}`;
  }
  return JSON.stringify(value);
}

function sameValue(expected, actual) {
  return canonical(expected) === canonical(actual);
}

class Comparisons {
  constructor() {
    this.counts = {};
    this.mismatches = [];
  }

  compare(category, field, expected, actual, context = {}) {
    this.counts[category] = (this.counts[category] || 0) + 1;
    if (!sameValue(expected, actual)) {
      this.mismatches.push({ category, field, expected, actual, ...context });
    }
  }

  compareRounded6(category, field, expected, actual, context = {}) {
    this.counts[category] = (this.counts[category] || 0) + 1;
    const valid = Number.isFinite(expected)
      && Number.isFinite(actual)
      && Math.abs(expected - actual) <= 0.000000500001;
    if (!valid) {
      this.mismatches.push({ category, field, expected, actual, ...context });
    }
  }
}

function edgeIdCompare(left, right) {
  if (left.edge.id < right.edge.id) return -1;
  if (left.edge.id > right.edge.id) return 1;
  return 0;
}

function scoreCompare(left, right) {
  const difference = left.score - right.score;
  return difference === 0 ? edgeIdCompare(left, right) : difference;
}

function chooseTree(scored, nodeIds) {
  const parent = new Map(nodeIds.map((nodeId) => [nodeId, nodeId]));
  function find(nodeId) {
    let current = nodeId;
    while (parent.get(current) !== current) {
      parent.set(current, parent.get(parent.get(current)));
      current = parent.get(current);
    }
    return current;
  }

  const chosen = [];
  for (const item of [...scored].sort(scoreCompare)) {
    const rootA = find(item.edge.a);
    const rootB = find(item.edge.b);
    if (rootA !== rootB) {
      parent.set(rootA, rootB);
      chosen.push(item.edge);
      if (chosen.length === nodeIds.length - 1) break;
    }
  }
  return chosen;
}

function statusFor(frequency) {
  if (frequency >= PERSISTENT_THRESHOLD) return "persistent_candidate";
  if (frequency >= DISAGREEMENT_THRESHOLD) return "disagreement_candidate";
  return "discarded_in_this_reference_run";
}

function buildEdges(inputs, comparisons) {
  if (!Array.isArray(inputs.nodes) || !Array.isArray(inputs.edges)) {
    throw new Error("input asset must contain node and edge arrays");
  }
  const nodes = new Map();
  for (const node of inputs.nodes) {
    if (!node || typeof node.id !== "string" || nodes.has(node.id)) {
      throw new Error("node IDs must be unique nonempty strings");
    }
    for (const field of ["equity_proxy", "climate_proxy", "heritage_sensitivity_proxy"]) {
      if (!Number.isFinite(node[field])) throw new Error(`node ${node.id}.${field} is invalid`);
    }
    nodes.set(node.id, node);
  }
  const maxLength = Math.max(...inputs.edges.map((edge) => edge.length_m));
  if (!(maxLength > 0)) throw new Error("maximum edge length must be positive");

  const seen = new Set();
  const edges = inputs.edges.map((published) => {
    if (!published || typeof published.id !== "string" || seen.has(published.id)) {
      throw new Error("edge IDs must be unique nonempty strings");
    }
    if (!nodes.has(published.a) || !nodes.has(published.b) || published.a === published.b) {
      throw new Error(`edge ${published.id} has invalid endpoints`);
    }
    if (!Number.isFinite(published.length_m)) throw new Error(`edge ${published.id} has invalid length`);
    seen.add(published.id);
    const nodeA = nodes.get(published.a);
    const nodeB = nodes.get(published.b);
    const lengthNorm = published.length_m / maxLength;
    const equity = (nodeA.equity_proxy + nodeB.equity_proxy) / 2;
    const climate = (nodeA.climate_proxy + nodeB.climate_proxy) / 2;
    const heritage = (
      nodeA.heritage_sensitivity_proxy + nodeB.heritage_sensitivity_proxy
    ) / 2;
    const maintenance = 0.65 * lengthNorm + 0.35 * heritage;
    const derived = {
      length_norm: lengthNorm,
      equity_gain_proxy: equity,
      climate_gain_proxy: climate,
      heritage_review_proxy: heritage,
      maintenance_proxy: maintenance,
    };
    for (const [field, value] of Object.entries(derived)) {
      comparisons.compareRounded6(
        "input_edge_derivations",
        field,
        published[field],
        value,
        { edge_id: published.id },
      );
    }
    return { ...published, ...derived };
  });
  return { nodeIds: [...nodes.keys()], edges };
}

function validateFromAssets() {
  const assetPaths = locateAssets();
  const inputs = readJson(assetPaths.inputs);
  const runs = readJson(assetPaths.runs);
  const comparisons = new Comparisons();

  comparisons.compare("asset_declarations", "inputs.method_id", METHOD_ID, inputs.method_id);
  comparisons.compare("asset_declarations", "runs.method_id", METHOD_ID, runs.method_id);
  comparisons.compare(
    "asset_declarations",
    "selection_rule",
    "Kruskal minimum-cost spanning tree plus two lowest-score non-tree edges per run",
    inputs.selection_rule,
  );
  comparisons.compare(
    "asset_declarations",
    "seed_policy",
    "integer seeds 0 through 63 inclusive; Python Mersenne Twister; stable edge-ID tie break",
    runs.seed_policy,
  );
  comparisons.compare("asset_declarations", "runs", SEED_COUNT, runs.runs);
  comparisons.compare("asset_declarations", "weight_ranges", WEIGHT_RANGES, inputs.weight_ranges_before_normalization);

  const { nodeIds, edges } = buildEdges(inputs, comparisons);
  comparisons.compare("asset_invariants", "node_count", 10, nodeIds.length);
  comparisons.compare("asset_invariants", "edge_count", 24, edges.length);

  if (!Array.isArray(runs.run_records)) throw new Error("runs.run_records must be an array");
  comparisons.compare("asset_invariants", "run_record_count", SEED_COUNT, runs.run_records.length);
  const recordBySeed = new Map();
  const seedSequence = [];
  for (const record of runs.run_records) {
    seedSequence.push(record.seed);
    if (Number.isInteger(record.seed) && !recordBySeed.has(record.seed)) {
      recordBySeed.set(record.seed, record);
    }
  }
  comparisons.compare(
    "asset_invariants",
    "seed_sequence",
    Array.from({ length: SEED_COUNT }, (_, seed) => seed),
    seedSequence,
  );

  const counts = new Map(edges.map((edge) => [edge.id, 0]));
  const selectedPerRun = nodeIds.length - 1 + EXTRA_EDGE_COUNT;
  for (let seed = 0; seed < SEED_COUNT; seed += 1) {
    const rng = new PythonRandom(seed);
    const rawWeights = WEIGHT_ORDER.map((name) => rng.uniform(...WEIGHT_RANGES[name]));
    const weightTotal = rawWeights.reduce((total, value) => total + value, 0);
    const weights = rawWeights.map((value) => value / weightTotal);
    const scored = edges.map((edge) => {
      const jitter = rng.uniform(...JITTER_RANGE);
      const score = weights[0] * edge.length_norm
        - weights[1] * edge.equity_gain_proxy
        - weights[2] * edge.climate_gain_proxy
        + weights[3] * edge.heritage_review_proxy
        + weights[4] * edge.maintenance_proxy
        + jitter;
      return { score, edge };
    });
    const tree = chooseTree(scored, nodeIds);
    const used = new Set(tree.map((edge) => edge.id));
    const extras = [...scored].sort(scoreCompare)
      .filter((item) => !used.has(item.edge.id))
      .slice(0, EXTRA_EDGE_COUNT)
      .map((item) => item.edge);
    const selected = [...tree, ...extras];
    const selectedIds = selected.map((edge) => edge.id);
    for (const edge of selected) counts.set(edge.id, counts.get(edge.id) + 1);

    const record = recordBySeed.get(seed);
    comparisons.compare(
      "run_selected_edge_order",
      "selected_edges",
      selectedIds,
      record?.selected_edges,
      { seed },
    );
    comparisons.compare("run_selected_edge_count", "selected_edges.length", selectedPerRun, record?.selected_edges?.length, { seed });
    for (let index = 0; index < WEIGHT_ORDER.length; index += 1) {
      const name = WEIGHT_ORDER[index];
      comparisons.compareRounded6(
        "run_weights",
        name,
        record?.weights?.[name],
        weights[index],
        { seed },
      );
    }
  }

  const frequencies = {};
  const statuses = {};
  for (const edge of edges) {
    const frequency = counts.get(edge.id) / SEED_COUNT;
    const status = statusFor(frequency);
    frequencies[edge.id] = Number(frequency.toFixed(6));
    statuses[edge.id] = status;
    comparisons.compareRounded6(
      "selection_frequencies",
      "selection_frequency",
      edge.selection_frequency,
      frequency,
      { edge_id: edge.id },
    );
    comparisons.compare("edge_statuses", "status", edge.status, status, { edge_id: edge.id });
  }

  const persistent = edges.filter((edge) => statuses[edge.id] === "persistent_candidate");
  const disagreement = edges.filter((edge) => statuses[edge.id] === "disagreement_candidate");
  const selected = [...persistent, ...disagreement];
  const meanPersistent = persistent.reduce((sum, edge) => sum + frequencies[edge.id], 0) / persistent.length;
  comparisons.compare("derived_metrics", "persistent_corridor_count", runs.derived_metrics?.persistent_corridor_count, persistent.length);
  comparisons.compare("derived_metrics", "disagreement_corridor_count", runs.derived_metrics?.disagreement_corridor_count, disagreement.length);
  comparisons.compare("derived_metrics", "selected_corridor_count", runs.derived_metrics?.selected_corridor_count, selected.length);
  comparisons.compareRounded6("derived_metrics", "mean_persistent_frequency", runs.derived_metrics?.mean_persistent_frequency, meanPersistent);
  comparisons.compareRounded6("derived_metrics", "disagreement_share", runs.derived_metrics?.disagreement_share, disagreement.length / selected.length);

  const mismatchCount = comparisons.mismatches.length;
  return {
    status: mismatchCount === 0 ? "PASS" : "FAIL",
    exit_code: mismatchCount === 0 ? 0 : 1,
    mismatch_count: mismatchCount,
    method_id: METHOD_ID,
    evidence_boundary: "Reproduces the published conceptual proxy calculation; it does not validate the proxies as observed urban facts.",
    assets: {
      inputs: assetPaths.inputs,
      runs: assetPaths.runs,
    },
    runtime_contract: {
      implementation: "Original JavaScript implementation of CPython integer-seeded MT19937 and 53-bit random()",
      arithmetic: "IEEE-754 binary64",
      draw_order: "five weight draws, then one jitter draw per edge in published array order",
      selection: "Kruskal minimum-cost spanning tree plus two lowest-score non-tree edges",
    },
    summary: {
      seeds_recomputed: SEED_COUNT,
      seed_first: 0,
      seed_last: SEED_COUNT - 1,
      nodes: nodeIds.length,
      candidate_edges: edges.length,
      selected_edges_per_run: selectedPerRun,
      comparisons: Object.values(comparisons.counts).reduce((sum, value) => sum + value, 0),
    },
    comparison_counts: comparisons.counts,
    recomputed: {
      selection_frequencies: frequencies,
      edge_statuses: statuses,
    },
    mismatches: comparisons.mismatches,
  };
}

function main() {
  try {
    const result = validateFromAssets();
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return result.exit_code;
  } catch (error) {
    const payload = {
      status: "FAIL",
      exit_code: 2,
      mismatch_count: null,
      method_id: METHOD_ID,
      error_type: "asset_or_configuration_error",
      error: error instanceof Error ? error.message : String(error),
    };
    process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
    return 2;
  }
}

module.exports = { PythonRandom, validateFromAssets };

if (require.main === module) {
  process.exitCode = main();
}
