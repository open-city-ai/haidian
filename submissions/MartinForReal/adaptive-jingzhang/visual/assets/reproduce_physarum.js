#!/usr/bin/env node
"use strict";

/*
 * Standard-library-only verifier for the Adaptive Jing-Zhang topology-proxy
 * ensemble. The generator used CPython random.Random(integer_seed). This file
 * implements the same MT19937 initialization and 53-bit random() construction,
 * then recomputes all 64 runs from the published inputs.
 *
 * The computation it verifies is the Seeded Kruskal minimum-spanning-tree topology
 * and selection-instability probe over hand-declared candidate edges.
 *
 * It verifies computation, not urban truth: every node attribute and candidate
 * edge is a disclosed conceptual policy proxy rather than observed site data.
 *
 * Both frozen assets are opened read-only through absolute paths, so the script runs
 * from any working directory, while the report cites the two stable package-relative
 * locations. Nothing here writes to disk.
 */

const fs = require("fs");
const path = require("path");

const METHOD_ID = "adaptive_jingzhang.topology_proxy_ensemble.v0";
const METHOD_NAME_EN = "Seeded Kruskal minimum-spanning-tree topology and selection-instability probe over hand-declared candidate edges.";
const METHOD_NAME_ZH = "在人工声明的候选边上运行的带种子 Kruskal 最小生成树拓扑与选择不稳定性探针。";
const SEED_COUNT = 64;
const EXTRA_EDGE_COUNT = 2;
const PERSISTENT_THRESHOLD = 0.7;
const DISAGREEMENT_THRESHOLD = 0.35;

// The anisotropic normalized-to-metre scale is a declared constant of the method, not a
// quantity the reproducer is free to solve for. Fitting it from the same 24 lengths that
// are then checked against it would make the check circular: any coordinate corruption
// would simply move the fit and still "verify". These two numbers are therefore fixed and
// executable, and every candidate length is rebuilt from them and compared.
const X_SCALE_M = 1374.006827;
const Y_SCALE_M = 9723.469847;
// Residual validation tolerance only. It is the largest accepted disagreement, in metres,
// between a recorded edge length and the same length rebuilt from the constants above. It
// is never used to round a value and never used to relax the constants.
const SCALE_RESIDUAL_TOLERANCE_M = 0.001;

// The reproducer publishes the numbers a reader is invited to quote, and asserts each one
// against a value it recomputes from the frozen assets on this run. The literals below are
// the expectation, never the source: if the frozen data ever stops producing them the run
// aborts and names the disagreement instead of quietly publishing a different number.
const PUBLISHED_EXPECTATIONS = {
  selection_count_bands: {
    persistent: [45, 64],
    disagreement: [23, 44],
    not_selected: [0, 22],
  },
  effective_persistent_cutoff: 0.703125,
  effective_disagreement_cutoff: 0.359375,
  knife_edge_frequency: 0.6875,
  knife_edge_edges: ["E05", "E13"],
  cutoff_gap: 0.0125,
  persistence_graph_components: {
    "0.70": [["N0", "N1", "N2"], ["N3", "N4", "N5"], ["N6"], ["N7", "N8", "N9"]],
    "0.6875": [["N0", "N1", "N2", "N3", "N4", "N5", "N6"], ["N7", "N8", "N9"]],
    "0.50": "connected",
    "0.35": "connected",
  },
  zero_jitter_ablation: {
    persistent_edges: 11,
    disagreement_band_edges: 0,
    persistence_graph: "connected",
  },
};

// Serialized into the report verbatim so a reader can cite one stable location for the two
// frozen assets. The files themselves are resolved absolutely, so the run is cwd-independent.
const PACKAGE_RELATIVE_ASSETS = {
  inputs: "visual/assets/physarum-inputs.json",
  runs: "visual/assets/physarum-runs.json",
};

const LIMITATION_EN = "Selection frequency describes behaviour under the disclosed weight ranges and jitter policy over the hand-declared candidate graph; it does not establish public legitimacy or an observed Beijing condition.";
const LIMITATION_ZH = "入选频率描述的是在已公开的权重范围与抖动策略下、在人工声明的候选图上的行为；它不能确立公共合法性，也不能确立任何已观测到的北京现状。";
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

// One seed of the ensemble. `useJitter` is the only difference between the published run
// and the zero-jitter ablation: the jitter draw is consumed either way, so both variants
// read the same stream position for every edge and differ in exactly one term of the score.
function selectForSeed(seed, edges, nodeIds, useJitter) {
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
      + (useJitter ? jitter : 0);
    return { score, edge };
  });
  const tree = chooseTree(scored, nodeIds);
  const used = new Set(tree.map((edge) => edge.id));
  const extras = [...scored].sort(scoreCompare)
    .filter((item) => !used.has(item.edge.id))
    .slice(0, EXTRA_EDGE_COUNT)
    .map((item) => item.edge);
  return { weights, selected: [...tree, ...extras] };
}

function selectionCounts(edges, nodeIds, useJitter) {
  const counts = new Map(edges.map((edge) => [edge.id, 0]));
  for (let seed = 0; seed < SEED_COUNT; seed += 1) {
    for (const edge of selectForSeed(seed, edges, nodeIds, useJitter).selected) {
      counts.set(edge.id, counts.get(edge.id) + 1);
    }
  }
  return counts;
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

// The frozen input publishes node positions only as normalized coordinates. Metres come
// from the two declared scale constants above, never from a fit over the same lengths that
// are then validated. For every edge the reproducer rebuilds
//   length_m = hypot(dx * X_SCALE_M, dy * Y_SCALE_M)
// at full binary64 precision and compares it with the recorded length. The tolerance is a
// pass/fail bound on that residual; an edge outside it aborts the run by name.
function reconstructCoordinateScale(inputs) {
  const byId = new Map(inputs.nodes.map((node) => [node.id, node]));
  const residuals = {};
  const offenders = [];
  let worstResidual = 0;
  let worstEdgeId = null;
  for (const edge of inputs.edges) {
    const p = byId.get(edge.a);
    const q = byId.get(edge.b);
    const reconstructed = Math.hypot(
      (p.x_normalized - q.x_normalized) * X_SCALE_M,
      (p.y_normalized - q.y_normalized) * Y_SCALE_M,
    );
    const residual = Math.abs(reconstructed - edge.length_m);
    residuals[edge.id] = residual;
    if (residual > worstResidual) {
      worstResidual = residual;
      worstEdgeId = edge.id;
    }
    if (!(residual <= SCALE_RESIDUAL_TOLERANCE_M)) {
      offenders.push({ edge_id: edge.id, recorded_m: edge.length_m, reconstructed_m: reconstructed, residual_m: residual });
    }
  }
  if (offenders.length > 0) {
    const named = offenders
      .sort((left, right) => right.residual_m - left.residual_m)
      .map((item) => (
        `${item.edge_id} (recorded ${item.recorded_m} m, reconstructed ${item.reconstructed_m} m, `
        + `residual ${item.residual_m} m)`
      ))
      .join("; ");
    throw new Error(
      `the declared coordinate scale X_SCALE_M=${X_SCALE_M}, Y_SCALE_M=${Y_SCALE_M} does not `
      + `reproduce the recorded length of ${offenders.length} edge(s) within the `
      + `${SCALE_RESIDUAL_TOLERANCE_M} m validation tolerance: ${named}. The constants are `
      + "fixed; the reproducer does not re-fit them to make a corrupted input verify.",
    );
  }
  return {
    sx: X_SCALE_M,
    sy: Y_SCALE_M,
    worst_residual_m: worstResidual,
    worst_residual_edge_id: worstEdgeId,
    residuals_m: residuals,
  };
}

// Connected components of an edge subset over the full node set, returned as sorted node
// lists in sorted order so two runs of the same graph always serialize identically.
function connectedComponents(nodeIds, edgeList) {
  const parent = new Map(nodeIds.map((id) => [id, id]));
  function find(id) {
    let current = id;
    while (parent.get(current) !== current) {
      parent.set(current, parent.get(parent.get(current)));
      current = parent.get(current);
    }
    return current;
  }
  for (const edge of edgeList) {
    const rootA = find(edge.a);
    const rootB = find(edge.b);
    if (rootA !== rootB) parent.set(rootA, rootB);
  }
  const groups = new Map();
  for (const id of nodeIds) {
    const root = find(id);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root).push(id);
  }
  return [...groups.values()]
    .map((group) => [...group].sort())
    .sort((left, right) => {
      if (left[0] < right[0]) return -1;
      if (left[0] > right[0]) return 1;
      return 0;
    });
}

// "connected" is published in place of a single-component partition so the reader sees the
// same word the proposal uses, and so the assertion compares like with like.
function componentsOrConnected(nodeIds, edgeList) {
  const components = connectedComponents(nodeIds, edgeList);
  return components.length === 1 ? "connected" : components;
}

function shortestPathMatrix(nodeIds, edgeList) {
  const index = new Map(nodeIds.map((id, position) => [id, position]));
  const size = nodeIds.length;
  const dist = Array.from({ length: size }, (_, i) => Array.from(
    { length: size },
    (_, j) => (i === j ? 0 : Infinity),
  ));
  for (const edge of edgeList) {
    const i = index.get(edge.a);
    const j = index.get(edge.b);
    if (edge.length_m < dist[i][j]) {
      dist[i][j] = edge.length_m;
      dist[j][i] = edge.length_m;
    }
  }
  for (let k = 0; k < size; k += 1) {
    for (let i = 0; i < size; i += 1) {
      const dik = dist[i][k];
      if (dik === Infinity) continue;
      for (let j = 0; j < size; j += 1) {
        const candidate = dik + dist[k][j];
        if (candidate < dist[i][j]) dist[i][j] = candidate;
      }
    }
  }
  return dist;
}

function unorderedPairs(size) {
  const pairs = [];
  for (let i = 0; i < size; i += 1) {
    for (let j = i + 1; j < size; j += 1) pairs.push([i, j]);
  }
  return pairs;
}

// Global efficiency with 1/d taken as 0 for pairs left unreachable by an edge removal,
// so a removal that disconnects the graph is penalised rather than silently skipped.
function globalEfficiency(dist, pairs) {
  let total = 0;
  for (const [i, j] of pairs) {
    total += dist[i][j] === Infinity ? 0 : 1 / dist[i][j];
  }
  return total / pairs.length;
}

// Every number the package quotes about the selection structure is recomputed here from
// the frozen counts and then checked against PUBLISHED_EXPECTATIONS. A disagreement is a
// finding about the data, so it aborts the run and names both values rather than being
// absorbed into a silently updated report.
function computePublishedNumbers(edges, nodeIds, counts, zeroJitterCounts) {
  const frequencyOf = (id) => counts.get(id) / SEED_COUNT;
  // The declared cutoffs are real-valued, but a selection count is an integer out of 64,
  // so each cutoff has an effective integer band. These are derived, not assumed.
  const minPersistentCount = Math.ceil(PERSISTENT_THRESHOLD * SEED_COUNT);
  const minDisagreementCount = Math.ceil(DISAGREEMENT_THRESHOLD * SEED_COUNT);
  const bands = {
    persistent: [minPersistentCount, SEED_COUNT],
    disagreement: [minDisagreementCount, minPersistentCount - 1],
    not_selected: [0, minDisagreementCount - 1],
  };

  const grouped = { persistent: [], disagreement: [], not_selected: [] };
  for (const edge of edges) {
    const status = statusFor(frequencyOf(edge.id));
    if (status === "persistent_candidate") grouped.persistent.push(edge);
    else if (status === "disagreement_candidate") grouped.disagreement.push(edge);
    else grouped.not_selected.push(edge);
  }

  const bandReport = {};
  const bandFailures = [];
  for (const [name, [low, high]] of Object.entries(bands)) {
    const observed = grouped[name].map((edge) => counts.get(edge.id));
    for (const edge of grouped[name]) {
      const count = counts.get(edge.id);
      if (count < low || count > high) {
        bandFailures.push(`${edge.id} holds ${count} of ${SEED_COUNT} selections, outside the ${name} band ${low}-${high}`);
      }
    }
    bandReport[name] = {
      band: [low, high],
      edges: grouped[name].length,
      observed_min_count: observed.length > 0 ? Math.min(...observed) : null,
      observed_max_count: observed.length > 0 ? Math.max(...observed) : null,
    };
  }
  if (bandFailures.length > 0) {
    throw new Error(`selection counts fall outside their declared bands: ${bandFailures.join("; ")}`);
  }

  const disagreementCounts = grouped.disagreement.map((edge) => counts.get(edge.id));
  const knifeEdgeCount = Math.max(...disagreementCounts);
  const knifeEdgeFrequency = knifeEdgeCount / SEED_COUNT;
  const knifeEdgeEdges = grouped.disagreement
    .filter((edge) => counts.get(edge.id) === knifeEdgeCount)
    .map((edge) => edge.id)
    .sort();

  const componentThresholds = [
    ["0.70", PERSISTENT_THRESHOLD],
    ["0.6875", knifeEdgeFrequency],
    ["0.50", 0.5],
    ["0.35", DISAGREEMENT_THRESHOLD],
  ];
  const componentsByThreshold = {};
  for (const [label, threshold] of componentThresholds) {
    componentsByThreshold[label] = componentsOrConnected(
      nodeIds,
      edges.filter((edge) => frequencyOf(edge.id) >= threshold),
    );
  }

  const zeroJitterFrequencyOf = (id) => zeroJitterCounts.get(id) / SEED_COUNT;
  const zeroJitterPersistent = edges.filter(
    (edge) => statusFor(zeroJitterFrequencyOf(edge.id)) === "persistent_candidate",
  );
  const zeroJitterDisagreement = edges.filter(
    (edge) => statusFor(zeroJitterFrequencyOf(edge.id)) === "disagreement_candidate",
  );

  const computed = {
    runs: SEED_COUNT,
    selection_count_bands: bandReport,
    effective_cutoffs: {
      persistent_declared_frequency: PERSISTENT_THRESHOLD,
      persistent_effective_count: minPersistentCount,
      persistent_effective_frequency: minPersistentCount / SEED_COUNT,
      disagreement_declared_frequency: DISAGREEMENT_THRESHOLD,
      disagreement_effective_count: minDisagreementCount,
      disagreement_effective_frequency: minDisagreementCount / SEED_COUNT,
      knife_edge_count: knifeEdgeCount,
      knife_edge_frequency: knifeEdgeFrequency,
      knife_edge_edges: knifeEdgeEdges,
      cutoff_gap: Number((PERSISTENT_THRESHOLD - knifeEdgeFrequency).toFixed(6)),
      cutoff_gap_definition: "declared persistent cutoff minus the highest frequency any disagreement edge reaches",
    },
    persistence_graph_components: componentsByThreshold,
    zero_jitter_ablation: {
      persistent_edges: zeroJitterPersistent.length,
      persistent_edge_ids: zeroJitterPersistent.map((edge) => edge.id),
      disagreement_band_edges: zeroJitterDisagreement.length,
      disagreement_band_edge_ids: zeroJitterDisagreement.map((edge) => edge.id),
      persistence_graph: componentsOrConnected(nodeIds, zeroJitterPersistent),
    },
  };

  const assertions = [
    ["selection_count_bands.persistent", PUBLISHED_EXPECTATIONS.selection_count_bands.persistent, bandReport.persistent.band],
    ["selection_count_bands.disagreement", PUBLISHED_EXPECTATIONS.selection_count_bands.disagreement, bandReport.disagreement.band],
    ["selection_count_bands.not_selected", PUBLISHED_EXPECTATIONS.selection_count_bands.not_selected, bandReport.not_selected.band],
    ["effective_persistent_cutoff", PUBLISHED_EXPECTATIONS.effective_persistent_cutoff, computed.effective_cutoffs.persistent_effective_frequency],
    ["effective_disagreement_cutoff", PUBLISHED_EXPECTATIONS.effective_disagreement_cutoff, computed.effective_cutoffs.disagreement_effective_frequency],
    ["knife_edge_frequency", PUBLISHED_EXPECTATIONS.knife_edge_frequency, knifeEdgeFrequency],
    ["knife_edge_edges", PUBLISHED_EXPECTATIONS.knife_edge_edges, knifeEdgeEdges],
    ["cutoff_gap", PUBLISHED_EXPECTATIONS.cutoff_gap, computed.effective_cutoffs.cutoff_gap],
    ["zero_jitter_ablation.persistent_edges", PUBLISHED_EXPECTATIONS.zero_jitter_ablation.persistent_edges, computed.zero_jitter_ablation.persistent_edges],
    ["zero_jitter_ablation.disagreement_band_edges", PUBLISHED_EXPECTATIONS.zero_jitter_ablation.disagreement_band_edges, computed.zero_jitter_ablation.disagreement_band_edges],
    ["zero_jitter_ablation.persistence_graph", PUBLISHED_EXPECTATIONS.zero_jitter_ablation.persistence_graph, computed.zero_jitter_ablation.persistence_graph],
  ];
  for (const [label, expected] of Object.entries(PUBLISHED_EXPECTATIONS.persistence_graph_components)) {
    assertions.push([`persistence_graph_components["${label}"]`, expected, componentsByThreshold[label]]);
  }

  const drift = assertions
    .filter(([, expected, actual]) => !sameValue(expected, actual))
    .map(([label, expected, actual]) => (
      `${label}: published ${canonical(expected)}, recomputed ${canonical(actual)}`
    ));
  if (drift.length > 0) {
    throw new Error(
      `the frozen assets no longer produce the published selection-structure numbers: ${drift.join("; ")}. `
      + "This is a finding about the data, not a number to update.",
    );
  }
  return computed;
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
    const { weights, selected } = selectForSeed(seed, edges, nodeIds, true);
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
  // Averaged over the exact selection counts, not over the six-decimal values published in
  // the report, so no rounding enters a derived metric.
  const meanPersistent = persistent
    .reduce((sum, edge) => sum + counts.get(edge.id) / SEED_COUNT, 0) / persistent.length;
  comparisons.compare("derived_metrics", "persistent_corridor_count", runs.derived_metrics?.persistent_corridor_count, persistent.length);
  comparisons.compare("derived_metrics", "disagreement_corridor_count", runs.derived_metrics?.disagreement_corridor_count, disagreement.length);
  comparisons.compare("derived_metrics", "selected_corridor_count", runs.derived_metrics?.selected_corridor_count, selected.length);
  comparisons.compareRounded6("derived_metrics", "mean_persistent_frequency", runs.derived_metrics?.mean_persistent_frequency, meanPersistent);
  comparisons.compareRounded6("derived_metrics", "disagreement_share", runs.derived_metrics?.disagreement_share, disagreement.length / selected.length);

  // Both graph metrics are read over the 14 selected edges only, weighted by the
  // published length_m, on coordinates rebuilt from the declared scale constants and
  // validated against every recorded length before they are used.
  const scale = reconstructCoordinateScale(inputs);
  const orderedNodes = inputs.nodes;
  const pairs = unorderedPairs(orderedNodes.length);
  const straightLine = orderedNodes.map((p) => orderedNodes.map((q) => Math.hypot(
    (p.x_normalized - q.x_normalized) * scale.sx,
    (p.y_normalized - q.y_normalized) * scale.sy,
  )));
  const selectedDist = shortestPathMatrix(nodeIds, selected);
  let detourTotal = 0;
  for (const [i, j] of pairs) detourTotal += selectedDist[i][j] / straightLine[i][j];
  comparisons.compareRounded6(
    "derived_metrics",
    "mean_pair_detour_factor",
    runs.derived_metrics?.mean_pair_detour_factor,
    detourTotal / pairs.length,
  );

  const baseEfficiency = globalEfficiency(selectedDist, pairs);
  let retentionTotal = 0;
  for (let removed = 0; removed < selected.length; removed += 1) {
    const remaining = selected.filter((_, position) => position !== removed);
    retentionTotal += globalEfficiency(shortestPathMatrix(nodeIds, remaining), pairs)
      / baseEfficiency;
  }
  comparisons.compareRounded6(
    "derived_metrics",
    "single_edge_loss_efficiency_retention",
    runs.derived_metrics?.single_edge_loss_efficiency_retention,
    retentionTotal / selected.length,
  );

  const mismatchCount = comparisons.mismatches.length;
  const published = computePublishedNumbers(
    edges,
    nodeIds,
    counts,
    selectionCounts(edges, nodeIds, false),
  );
  return {
    status: mismatchCount === 0 ? "PASS" : "FAIL",
    exit_code: mismatchCount === 0 ? 0 : 1,
    mismatch_count: mismatchCount,
    method_id: METHOD_ID,
    method_name: METHOD_NAME_EN,
    method_name_zh: METHOD_NAME_ZH,
    evidence_boundary: "Reproduces the published conceptual proxy calculation; it does not validate the proxies as observed urban facts.",
    limitation_en: LIMITATION_EN,
    limitation_zh: LIMITATION_ZH,
    assets: {
      inputs: PACKAGE_RELATIVE_ASSETS.inputs,
      runs: PACKAGE_RELATIVE_ASSETS.runs,
    },
    runtime_contract: {
      implementation: "Original JavaScript implementation of CPython integer-seeded MT19937 and 53-bit random()",
      arithmetic: "IEEE-754 binary64",
      draw_order: "five weight draws, then one jitter draw per edge in published array order",
      selection: "Kruskal minimum-cost spanning tree plus two lowest-score non-tree edges",
      method_name: METHOD_NAME_EN,
      method_name_zh: METHOD_NAME_ZH,
      guaranteed_by_construction: "connectivity of each run, and exactly 11 selected edges per run",
      not_computed: [
        "movement",
        "demand",
        "engineering feasibility",
        "accessibility",
        "biological adaptation",
        "public preference",
        "optimality for Beijing",
      ],
      coordinate_basis: {
        declared_as: "two fixed executable scale constants; the reproducer never re-fits them",
        x_scale_m: X_SCALE_M,
        y_scale_m: Y_SCALE_M,
        residual_validation_tolerance_m: SCALE_RESIDUAL_TOLERANCE_M,
        worst_length_residual_m: scale.worst_residual_m,
        worst_length_residual_edge_id: scale.worst_residual_edge_id,
        note: "the scale is anisotropic; the tolerance validates the reconstruction and never rounds or relaxes it",
      },
    },
    published_numbers: published,
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
      method_name: METHOD_NAME_EN,
      error_type: "asset_or_configuration_error",
      error: error instanceof Error ? error.message : String(error),
    };
    process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
    return 2;
  }
}

// The selection internals are exported so the zero-jitter comparison runs the same
// scoring and the same Kruskal pass as the published record rather than a second
// implementation that could drift away from it.
module.exports = {
  PythonRandom,
  validateFromAssets,
  buildEdges,
  chooseTree,
  scoreCompare,
  statusFor,
  selectForSeed,
  selectionCounts,
  connectedComponents,
  componentsOrConnected,
  reconstructCoordinateScale,
  locateAssets,
  readJson,
  constants: {
    METHOD_ID,
    METHOD_NAME_EN,
    METHOD_NAME_ZH,
    SEED_COUNT,
    EXTRA_EDGE_COUNT,
    PERSISTENT_THRESHOLD,
    DISAGREEMENT_THRESHOLD,
    X_SCALE_M,
    Y_SCALE_M,
    SCALE_RESIDUAL_TOLERANCE_M,
    WEIGHT_ORDER,
    WEIGHT_RANGES,
    JITTER_RANGE,
    PACKAGE_RELATIVE_ASSETS,
    PUBLISHED_EXPECTATIONS,
    LIMITATION_EN,
    LIMITATION_ZH,
  },
};

if (require.main === module) {
  process.exitCode = main();
}
