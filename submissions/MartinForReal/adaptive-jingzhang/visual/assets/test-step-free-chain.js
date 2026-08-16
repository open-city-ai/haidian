#!/usr/bin/env node
"use strict";

// Can a disabled visitor actually get through, and does the package admit that nobody has
// checked?
//
// A step-free claim is the easiest thing in an urban proposal to assert and the hardest to
// keep. This test asks for the chain as a chain — seven nodes in order, six segments that
// connect them, no gaps — and for every numeric value on it to name where it came from.
// It also insists the whole thing stays marked unverified: no survey has happened, no
// accessibility gate has been passed, and no professional has audited any of it.
//
// Read-only. Usage: node test-step-free-chain.js

const contract = require("./key-area-contract.js");

const {
  AREAS, CHAIN_NODE_ROLES, CHAIN_STATUS, CHAIN_EQUIVALENTS, OPERATING_MODES,
  OPERATING_MODE_FIELDS, DIMENSION_BASIS_TYPES, exists, readJson, harness, cli,
} = contract;

const DESIGN = "visual/assets/key-area-design.json";

// The measured properties of a segment. Each is a number a builder would need and none of
// them is known yet, so each has to carry its own basis rather than borrowing the chain's.
const SEGMENT_DIMENSIONS = ["clear_width", "gradient", "crossfall", "passing_points", "rest_points"];

const SEGMENT_TEXT = ["surface_zh", "surface_en", "obstruction_rule_zh", "obstruction_rule_en", "maintenance_access_zh", "maintenance_access_en"];

function isFilled(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim() !== "";
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

function checkDimension(fail, label, dimension) {
  if (!dimension || typeof dimension !== "object") {
    fail(`${label} carries no dimension record`);
    return;
  }
  if (!DIMENSION_BASIS_TYPES.includes(dimension.basis_type)) {
    fail(`${label} basis_type ${JSON.stringify(dimension.basis_type)} is not one of ${DIMENSION_BASIS_TYPES.join(", ")}`);
  }
  if (!isFilled(dimension.source_ref)) fail(`${label} names no source_ref`);
  if (!isFilled(dimension.status)) fail(`${label} declares no status`);
  // A pending value that still carries a number is the exact defect this rule exists for:
  // it reads as measured while claiming to be unknown.
  if (dimension.basis_type === "pending" && dimension.value !== null) {
    fail(`${label} is pending but carries the value ${JSON.stringify(dimension.value)}`);
  }
  if (dimension.basis_type !== "pending" && typeof dimension.value !== "number") {
    fail(`${label} declares basis ${dimension.basis_type} but no numeric value`);
  }
  if (dimension.basis_type !== "pending" && !isFilled(dimension.unit)) {
    fail(`${label} carries a value with no unit`);
  }
}

function run() {
  return harness("KA-SFC", "every area publishes an auditable, openly unverified step-free chain", (fail) => {
    if (!exists(DESIGN)) return fail(`${DESIGN} does not exist; no area declares a step-free chain`);
    const registry = readJson(DESIGN);
    const areas = new Map((registry.areas ?? []).map((area) => [area.area_feature_id, area]));

    const detail = {};
    for (const expected of AREAS) {
      const area = areas.get(expected.area_feature_id);
      if (!area) {
        fail(`${DESIGN} declares nothing for ${expected.area_feature_id}`);
        continue;
      }
      const chain = area.step_free_chain;
      if (!chain) {
        fail(`${expected.area_feature_id} declares no step_free_chain`);
        continue;
      }

      for (const [key, value] of Object.entries(CHAIN_STATUS)) {
        if ((chain.status ?? {})[key] !== value) {
          fail(`${expected.prefix} chain status.${key} is ${JSON.stringify((chain.status ?? {})[key])}, expected ${JSON.stringify(value)}`);
        }
      }

      const nodes = chain.nodes ?? [];
      const roles = nodes.map((node) => node.role);
      if (JSON.stringify(roles) !== JSON.stringify(CHAIN_NODE_ROLES)) {
        fail(`${expected.prefix} chain nodes are [${roles.join(", ")}], expected [${CHAIN_NODE_ROLES.join(", ")}] in that order`);
      }
      for (const node of nodes) {
        for (const field of ["id", "role", "name_zh", "name_en", "drawing_ref"]) {
          if (!isFilled(node[field])) fail(`${expected.prefix} chain node ${node.id ?? node.role ?? "?"} is missing ${field}`);
        }
      }

      // Six segments for seven nodes, each joining consecutive nodes. A chain with a
      // missing link is exactly the failure a wheelchair user meets on site.
      const nodeIds = nodes.map((node) => node.id);
      const segments = chain.segments ?? [];
      if (segments.length !== Math.max(nodes.length - 1, 0)) {
        fail(`${expected.prefix} chain has ${segments.length} segments for ${nodes.length} nodes, expected ${Math.max(nodes.length - 1, 0)}`);
      }
      segments.forEach((segment, index) => {
        const label = `${expected.prefix} chain segment ${segment.id ?? index + 1}`;
        for (const field of ["id", "from", "to", "drawing_ref", ...SEGMENT_TEXT]) {
          if (!isFilled(segment[field])) fail(`${label} is missing ${field}`);
        }
        if (nodeIds[index] !== undefined && segment.from !== nodeIds[index]) {
          fail(`${label} starts at ${segment.from}, expected ${nodeIds[index]}`);
        }
        if (nodeIds[index + 1] !== undefined && segment.to !== nodeIds[index + 1]) {
          fail(`${label} ends at ${segment.to}, expected ${nodeIds[index + 1]}`);
        }
        for (const dimension of SEGMENT_DIMENSIONS) {
          checkDimension(fail, `${label} ${dimension}`, segment[dimension]);
        }
      });

      // A step-free route is not access on its own. Every equivalent has to be named,
      // because a visitor who cannot see the sign needs the tactile one and a visitor with
      // no phone needs the paper one.
      const equivalents = chain.equivalents ?? {};
      for (const kind of CHAIN_EQUIVALENTS) {
        const record = equivalents[kind];
        if (!record) {
          fail(`${expected.prefix} chain declares no ${kind} equivalent`);
          continue;
        }
        for (const field of ["provided_zh", "provided_en", "status"]) {
          if (!isFilled(record[field])) fail(`${expected.prefix} chain ${kind} equivalent is missing ${field}`);
        }
      }

      const modes = chain.operating_modes ?? [];
      const declared = modes.map((mode) => mode.mode);
      for (const mode of OPERATING_MODES) {
        if (!declared.includes(mode)) fail(`${expected.prefix} chain has no ${mode} operating mode`);
      }
      for (const mode of modes) {
        for (const field of OPERATING_MODE_FIELDS) {
          for (const language of ["zh", "en"]) {
            if (!isFilled(mode[`${field}_${language}`])) {
              fail(`${expected.prefix} chain mode ${mode.mode} is missing ${field}_${language}`);
            }
          }
        }
      }

      detail[expected.area_feature_id] = {
        chain: chain.id ?? null,
        nodes: nodes.length,
        segments: segments.length,
        modes: declared,
      };
    }

    return detail;
  });
}

if (require.main === module) cli(run());

module.exports = { run };
