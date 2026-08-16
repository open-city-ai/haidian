#!/usr/bin/env node
"use strict";

// A threshold of 0.70 that no edge can ever hit.
//
// The ensemble runs 64 times, so a candidate edge is selected in some whole number of those
// runs and its frequency can only be one of the 65 values k/64. The published rule is written
// in decimals — persistent at 0.70 and above, disagreement from 0.35 up to 0.70 — and neither
// of those decimals is reachable: 64 x 0.70 is 44.8 and 64 x 0.35 is 22.4. The rule that
// actually ran is therefore "selected in at least 45 of 64 runs" and "at least 23 of 64",
// which is 0.703125 and 0.359375. The difference is not cosmetic. E05 and E13 were selected
// 44 times, one run short of persistent, and a reader who is shown only "0.70" cannot tell
// that the two edges missed by a single run rather than by a margin.
//
// So this test does three things.
//
// It recomputes the quantization instead of reading it. The counts come from the 64 frozen run
// records, the frequencies are checked to be exact multiples of 1/64, and the reachable
// boundaries are derived as the smallest integer count satisfying each rule, held as exact
// rationals on BigInts. The registry, the edge statuses, the derived metrics and the drawn
// corridors are then compared against that recomputation, so a hand-edited threshold block
// cannot agree with itself.
//
// It requires the package to disclose both numbers together. Every surface that states the
// rule states the reachable boundary and the run count that makes it reachable, in the form
// each surface uses: the documents and viewers name the fraction and its value, and the four
// PDFs carry the whole threshold block.
//
// It rejects a rounded boundary. Publishing 0.703 instead of 0.703125 would be a third number,
// neither the rule nor the boundary, so a truncated spelling fails.
//
// Read-only. Usage: node test-threshold-quantization.js

const contract = require("./key-area-contract.js");

const { readText, readJson, exists, pdfDocument, harness, cli } = contract;

const INPUTS = "visual/assets/physarum-inputs.json";
const RUNS = "visual/assets/physarum-runs.json";
const SOURCE = "visual/assets/regeneration-source.json";
const ROADS = "geometry/roads.geojson";

// The two frozen assets carry 64 seeded runs. The count is pinned here as well as read, so a
// smaller ensemble cannot quietly change every boundary below.
const RUN_COUNT = 64n;
const EDGES_PER_RUN = 11;

// The three status names the frozen input assigns. The third is deliberately not "discarded":
// an edge below the qualification rule was dropped by this reference run, not judged unfit, and
// the name has to keep saying so.
const STATUS = {
  persistent: "persistent_candidate",
  disagreement: "disagreement_candidate",
  discarded: "discarded_in_this_reference_run",
};

// The published rule, as exact rationals rather than decimals. 0.70 is 7/10 and 0.35 is 7/20;
// writing them as fractions keeps the reachability arithmetic exact and lets the test say
// which decimal it is checking against without a float ever entering the comparison.
const RULE = {
  persistent: { numerator: 7n, denominator: 10n, decimal: 0.7, literal: "0.70" },
  disagreement: { numerator: 7n, denominator: 20n, decimal: 0.35, literal: "0.35" },
};

// Recomputed from the run records below; pinned here so the test still fails if the frozen
// ensemble and every registry that describes it are edited together.
const EXPECTED = {
  persistent_count: 45,
  persistent_frequency: "0.703125",
  disagreement_count: 23,
  disagreement_frequency: "0.359375",
  knife_edge_count: 44,
  knife_edge_frequency: "0.6875",
  not_selected_max_count: 22,
  cutoff_gap: "0.0125",
  persistent_edges: 6,
  disagreement_edges: 8,
  qualifying_edges: 14,
  knife_edge_edges: ["E05", "E13"],
};

// The six documents that state the rule in prose or in a table have to state the boundary the
// same way: the fraction, its exact value, and the ensemble size it is a fraction of.
const DOCUMENT_SURFACES = [
  "proposal.md",
  "proposal.en.md",
  "report/proposal.html",
  "report/proposal.en.html",
  "visual/index.html",
  "visual/index.en.html",
];

const VIEWERS = ["visual/index.html", "visual/index.en.html"];

// The four PDFs publish the threshold block itself, key by key, so they are checked against
// the whole recomputed block rather than against the two fractions.
const PDF_SURFACES = [
  "drawings/a3-booklet.pdf",
  "drawings/a3-booklet.en.pdf",
  "drawings/a0-boards.pdf",
  "drawings/a0-boards.en.pdf",
];

// A boundary written to three decimals is a different number from the boundary that ran. The
// lookahead lets the exact value through and stops the truncation.
const TRUNCATED_BOUNDARIES = [/0\.703(?![0-9])/, /0\.359(?![0-9])/];

// --- exact arithmetic ---------------------------------------------------------------------

// Smallest integer k with k/runs >= numerator/denominator, i.e. ceil(runs * numerator / den).
function smallestQualifyingCount(runs, numerator, denominator) {
  const scaled = runs * numerator;
  const whole = scaled / denominator;
  return scaled % denominator === 0n ? whole : whole + 1n;
}

// k/64 always terminates within six decimals, so the division is exact and the result is
// formatted from integers. A remainder here would mean the caller asked for a value the
// ensemble cannot produce, which is a failure rather than something to round.
function exactDecimal(numerator, denominator, digits, label, fail) {
  const scale = 10n ** BigInt(digits);
  const scaled = numerator * scale;
  if (scaled % denominator !== 0n) {
    fail(`${label} does not terminate within ${digits} decimals, so it cannot be published exactly`);
    return "";
  }
  const value = scaled / denominator;
  const whole = value / scale;
  const fraction = (value % scale).toString().padStart(digits, "0").replace(/0+$/, "");
  return fraction.length > 0 ? `${whole}.${fraction}` : `${whole}`;
}

// Whitespace is a line break in a PDF text run and an indent in HTML, so presence is judged
// with it removed from both sides.
function dense(text) {
  return text.replace(/\s+/g, "");
}

function surfaceText(path, fail) {
  if (!exists(path)) {
    fail(`${path} is missing, so the threshold disclosure cannot be read`);
    return "";
  }
  if (path.endsWith(".pdf")) {
    const document = pdfDocument(path);
    if (document.cmap_conflicts.length > 0) {
      fail(`${path} has conflicting ToUnicode entries, so its threshold block cannot be trusted`);
    }
    return document.text;
  }
  return readText(path);
}

function run() {
  return harness(
    "KA-QUANT",
    "the reachable threshold is recomputed from the frozen runs and published beside the literal rule on every surface that states it",
    (fail) => {
      const detail = {};

      // 1. The ensemble is the shape every boundary below is a fraction of.
      const runs = readJson(RUNS);
      const inputs = readJson(INPUTS);
      const records = Array.isArray(runs.run_records) ? runs.run_records : [];
      if (BigInt(runs.runs) !== RUN_COUNT || BigInt(records.length) !== RUN_COUNT) {
        fail(`${RUNS} declares ${runs.runs} runs and stores ${records.length} records, expected ${RUN_COUNT}`);
        return detail;
      }
      const seeds = new Set(records.map((record) => record.seed));
      for (let seed = 0; seed < Number(RUN_COUNT); seed += 1) {
        if (!seeds.has(seed)) fail(`${RUNS} has no record for seed ${seed}`);
      }

      const declared = new Map((inputs.edges || []).map((edge) => [edge.id, edge]));
      if (declared.size === 0) {
        fail(`${INPUTS} declares no candidate edges, so no frequency has a denominator`);
        return detail;
      }

      // 2. Count selections. Every run selects the same number of edges by construction, and
      // that number is published as a claim about the method, so it is checked here too.
      const counts = new Map([...declared.keys()].map((id) => [id, 0]));
      for (const record of records) {
        const selected = record.selected_edges || [];
        if (new Set(selected).size !== selected.length) {
          fail(`run ${record.seed} lists the same edge twice`);
        }
        if (selected.length !== EDGES_PER_RUN) {
          fail(`run ${record.seed} selects ${selected.length} edges, but the package publishes ${EDGES_PER_RUN} per run`);
        }
        for (const id of selected) {
          if (!counts.has(id)) {
            fail(`run ${record.seed} selects ${id}, which is not a declared candidate edge`);
            continue;
          }
          counts.set(id, counts.get(id) + 1);
        }
      }

      // 3. Every published frequency is an exact multiple of 1/64. Dividing by a power of two
      // is exact in binary floating point, so the equality below is a real equality.
      for (const [id, edge] of declared) {
        const count = counts.get(id);
        if (edge.selection_frequency !== count / Number(RUN_COUNT)) {
          fail(`${id} is selected in ${count} of 64 runs, which is ${count / Number(RUN_COUNT)}, but ${INPUTS} publishes ${edge.selection_frequency}`);
        }
      }

      // 4. The reachable boundaries, derived rather than read.
      const persistentCount = smallestQualifyingCount(RUN_COUNT, RULE.persistent.numerator, RULE.persistent.denominator);
      const disagreementCount = smallestQualifyingCount(RUN_COUNT, RULE.disagreement.numerator, RULE.disagreement.denominator);
      const knifeEdgeCount = persistentCount - 1n;
      const notSelectedMaxCount = disagreementCount - 1n;
      const quantized = {
        persistent_count: Number(persistentCount),
        persistent_frequency: exactDecimal(persistentCount, RUN_COUNT, 6, "persistent boundary", fail),
        disagreement_count: Number(disagreementCount),
        disagreement_frequency: exactDecimal(disagreementCount, RUN_COUNT, 6, "disagreement boundary", fail),
        knife_edge_count: Number(knifeEdgeCount),
        knife_edge_frequency: exactDecimal(knifeEdgeCount, RUN_COUNT, 6, "knife-edge frequency", fail),
        not_selected_max_count: Number(notSelectedMaxCount),
        // The distance from the highest disagreement frequency to the literal rule, as one
        // rational: 7/10 - 44/64 over the common denominator 640.
        cutoff_gap: exactDecimal(
          RULE.persistent.numerator * RUN_COUNT - RULE.persistent.denominator * knifeEdgeCount,
          RULE.persistent.denominator * RUN_COUNT,
          6,
          "cutoff gap",
          fail,
        ),
      };
      for (const [key, want] of Object.entries(EXPECTED)) {
        if (!(key in quantized)) continue;
        if (quantized[key] !== want) {
          fail(`${key} recomputes to ${quantized[key]}, but the package publishes ${want}`);
        }
      }
      detail.quantized = quantized;

      // The literal rule is unreachable, which is the whole reason both numbers have to be
      // published. If a future ensemble size made it reachable the boundary would equal the
      // rule; either way the two have to agree with the arithmetic.
      const reachable = {};
      for (const [name, rule] of Object.entries(RULE)) {
        const exact = (RUN_COUNT * rule.numerator) % rule.denominator === 0n;
        const boundary = name === "persistent" ? persistentCount : disagreementCount;
        const value = Number(boundary) / Number(RUN_COUNT);
        reachable[name] = exact;
        if (exact && value !== rule.decimal) {
          fail(`${rule.literal} is reachable in ${RUN_COUNT} runs but the boundary recomputes to ${value}`);
        }
        if (!exact && !(value > rule.decimal)) {
          fail(`${rule.literal} is not reachable in ${RUN_COUNT} runs, so the boundary must exceed it, not equal ${value}`);
        }
      }
      detail.literal_rule_reachable = reachable;

      // 5. The registry block has to be the recomputed block, key by key.
      const source = readJson(SOURCE);
      const thresholds = (source.method_card || {}).thresholds;
      if (!thresholds) {
        fail(`${SOURCE} has no method_card.thresholds block, so the published thresholds have no record`);
        return detail;
      }
      const registryExpected = {
        persistent_min_frequency: RULE.persistent.decimal,
        disagreement_min_frequency: RULE.disagreement.decimal,
        seeded_runs: Number(RUN_COUNT),
        persistent_min_count_of_64: quantized.persistent_count,
        persistent_effective_frequency: Number(quantized.persistent_frequency),
        disagreement_min_count_of_64: quantized.disagreement_count,
        disagreement_effective_frequency: Number(quantized.disagreement_frequency),
        knife_edge_count_of_64: quantized.knife_edge_count,
        highest_disagreement_frequency: Number(quantized.knife_edge_frequency),
        not_selected_max_count_of_64: quantized.not_selected_max_count,
        cutoff_gap: Number(quantized.cutoff_gap),
      };
      for (const [key, want] of Object.entries(registryExpected)) {
        if (thresholds[key] !== want) {
          fail(`${SOURCE} publishes ${key} as ${thresholds[key]}, but it recomputes to ${want}`);
        }
      }
      // The one band that is presentational rather than derived still has to be a frequency the
      // ensemble can produce, and has to sit inside the disagreement band it labels.
      const mid = thresholds.mid_disagreement_frequency;
      const midCount = mid * Number(RUN_COUNT);
      if (!Number.isInteger(midCount)) {
        fail(`mid_disagreement_frequency ${mid} is not a frequency ${RUN_COUNT} runs can produce`);
      }
      if (!(mid >= RULE.disagreement.decimal && mid < RULE.persistent.decimal)) {
        fail(`mid_disagreement_frequency ${mid} lies outside the disagreement band it labels`);
      }

      // 6. Classify every edge by the recomputed counts and compare with what is published.
      const persistent = [];
      const disagreement = [];
      const discarded = [];
      const knifeEdges = [];
      for (const [id, edge] of declared) {
        const count = BigInt(counts.get(id));
        let status;
        if (count >= persistentCount) {
          status = STATUS.persistent;
          persistent.push(id);
        } else if (count >= disagreementCount) {
          status = STATUS.disagreement;
          disagreement.push(id);
        } else {
          status = STATUS.discarded;
          discarded.push(id);
        }
        if (count === knifeEdgeCount) knifeEdges.push(id);
        if (edge.status !== status) {
          fail(`${id} is selected in ${counts.get(id)} of 64 runs, which is ${status}, but ${INPUTS} calls it ${edge.status}`);
        }
      }
      const qualifying = persistent.length + disagreement.length;
      detail.classification = {
        persistent: persistent.length,
        disagreement: disagreement.length,
        discarded: discarded.length,
        qualifying,
        knife_edges: knifeEdges,
      };
      if (persistent.length !== EXPECTED.persistent_edges) {
        fail(`${persistent.length} edges reach the persistent boundary, but the package publishes ${EXPECTED.persistent_edges}`);
      }
      if (disagreement.length !== EXPECTED.disagreement_edges) {
        fail(`${disagreement.length} edges fall in the disagreement band, but the package publishes ${EXPECTED.disagreement_edges}`);
      }
      if (qualifying !== EXPECTED.qualifying_edges) {
        fail(`${qualifying} edges meet the ${RULE.disagreement.literal} qualification rule, but the disagreement share divides by ${EXPECTED.qualifying_edges}`);
      }
      if (knifeEdges.join(",") !== EXPECTED.knife_edge_edges.join(",")) {
        fail(`the edges one run short of persistent are ${knifeEdges.join(", ") || "none"}, not ${EXPECTED.knife_edge_edges.join(", ")}`);
      }
      for (const id of knifeEdges) {
        if (declared.get(id).status !== STATUS.disagreement) {
          fail(`${id} is one run short of persistent but is published as ${declared.get(id).status}`);
        }
      }

      const derived = runs.derived_metrics || {};
      if (derived.persistent_corridor_count !== persistent.length) {
        fail(`${RUNS} derives ${derived.persistent_corridor_count} persistent corridors, but the counts give ${persistent.length}`);
      }
      if (derived.disagreement_corridor_count !== disagreement.length) {
        fail(`${RUNS} derives ${derived.disagreement_corridor_count} disagreement corridors, but the counts give ${disagreement.length}`);
      }
      if (derived.selected_corridor_count !== qualifying) {
        fail(`${RUNS} derives ${derived.selected_corridor_count} selected corridors, but the qualification rule gives ${qualifying}`);
      }

      // 7. The drawn network is exactly the qualifying set, at the recomputed frequencies.
      const roads = readJson(ROADS);
      const drawn = new Map();
      for (const feature of roads.features || []) {
        const properties = feature.properties || {};
        const id = String(properties.id || "").replace(/^ROAD-/, "");
        drawn.set(id, properties);
      }
      if (drawn.size !== qualifying) {
        fail(`${ROADS} draws ${drawn.size} corridors, but ${qualifying} edges meet the qualification rule`);
      }
      for (const id of [...persistent, ...disagreement]) {
        const properties = drawn.get(id);
        if (!properties) {
          fail(`${ROADS} does not draw ${id}, which meets the qualification rule`);
          continue;
        }
        if (properties.selection_frequency !== counts.get(id) / Number(RUN_COUNT)) {
          fail(`${ROADS} draws ${id} at frequency ${properties.selection_frequency}, but it is selected in ${counts.get(id)} of 64 runs`);
        }
        if (properties.network_status !== declared.get(id).status) {
          fail(`${ROADS} calls ${id} ${properties.network_status}, but the recomputed status is ${declared.get(id).status}`);
        }
      }
      for (const id of discarded) {
        if (drawn.has(id)) {
          fail(`${ROADS} draws ${id}, which is below the ${RULE.disagreement.literal} qualification rule`);
        }
      }

      // 8. Publication. The documents state the rule, so they state the boundary.
      const surfaces = {};
      const documentNeedles = [
        RULE.persistent.literal,
        RULE.disagreement.literal,
        String(RUN_COUNT),
        `${quantized.persistent_count}/${RUN_COUNT}`,
        quantized.persistent_frequency,
        `${quantized.disagreement_count}/${RUN_COUNT}`,
        quantized.disagreement_frequency,
      ];
      for (const path of DOCUMENT_SURFACES) {
        const text = surfaceText(path, fail);
        const packed = dense(text);
        const missing = documentNeedles.filter((needle) => !packed.includes(dense(needle)));
        if (missing.length > 0) {
          fail(`${path} states the threshold rule without publishing ${missing.join(", ")}`);
        }
        surfaces[path] = { kind: "document", published: documentNeedles.length - missing.length };
      }

      // The viewers show the persistent and disagreement counts as headline numbers, so the
      // rule that produced them has to be readable on the same page rather than only in the
      // documents those numbers were taken from.
      for (const path of VIEWERS) {
        const packed = dense(surfaceText(path, fail));
        for (const count of [EXPECTED.persistent_edges, EXPECTED.disagreement_edges]) {
          if (!packed.includes(`data-value="${count}"`)) {
            fail(`${path} does not show ${count} as a recorded metric, so the rule below it describes nothing`);
          }
        }
      }

      // The PDFs carry the block itself. The keys come from the registry and the values from
      // the recomputation, so a renamed key follows the record while a wrong value fails.
      const blockNeedles = Object.entries(thresholds).map(([key, value]) => `${key}${value}`);
      for (const path of PDF_SURFACES) {
        const text = surfaceText(path, fail);
        const packed = dense(text);
        const missing = blockNeedles.filter((needle) => !packed.includes(needle));
        if (missing.length > 0) {
          fail(`${path} does not publish the threshold block entries ${missing.join(", ")}`);
        }
        surfaces[path] = { kind: "pdf", published: blockNeedles.length - missing.length };
      }
      detail.surfaces = surfaces;

      // 9. No surface may publish a rounded boundary in place of the exact one.
      for (const path of [...DOCUMENT_SURFACES, ...PDF_SURFACES]) {
        const packed = dense(surfaceText(path, fail));
        for (const pattern of TRUNCATED_BOUNDARIES) {
          const found = packed.match(pattern);
          if (found) {
            fail(`${path} publishes ${found[0]}, which is neither the rule nor the reachable boundary`);
          }
        }
      }

      return detail;
    },
  );
}

if (require.main === module) cli(run());

module.exports = { run };
