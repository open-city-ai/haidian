#!/usr/bin/env node
"use strict";

// Does each key area carry real, distinct spatial content, or three versions of the same
// governance poster?
//
// The rejected architecture failed here: every plate was a bilingual infographic about
// process, and none of the three areas drew a plan anyone could build from or argue with.
// This test asks for the things a plan has — a cut key that leads somewhere, a section
// that shows a relationship, a dimension whose basis is declared — and it asks each area
// for the specific relationships only that area has.
//
// Dimensions are checked for provenance rather than for plausibility. A width copied out
// of a standard, or scaled off a photograph, is an invented number; `pending` with a null
// value is the honest form and passes. On a section the rule is tighter still, and the
// mutation block at the end of this file makes each clause of it fail on demand.
//
// The same rule is then checked where a reviewer meets it, in the sentences printed beside
// the drawings, because a clean record under a caption that contradicts it has still
// published the claim.
//
// Read-only. Usage: node test-key-area-spatial-content.js

const contract = require("./key-area-contract.js");

const {
  AREAS, DIMENSION_FIELDS, DZS_POSITIONS, DZS_POSITION_ASSIGNMENT,
  SECTION_DIMENSION_BASIS_TYPES, SECTION_DIMENSION_UNIT, SECTION_DIMENSION_STATUS_PREFIX,
  SECTION_DIMENSION_UNVERIFIED_MARKER, SECTION_DIMENSION_PROPOSED_SOURCE_RE,
  SECTION_DIMENSION_PENDING_SOURCE_RE, SECTION_DIMENSION_PENDING_FIELDS,
  exists, readText, readJson, harness, cli,
} = contract;

const DESIGN = "visual/assets/key-area-design.json";

// The surfaces a reviewer actually reads. The plate registry holds the paragraph printed
// beside each drawing and repeated as its long description, and the rest carry the same
// sentences onward. The four PDFs are not scanned: the plate prose reaches them inside the
// rasters, where it is pixels rather than text, and the registry is the one place it is
// written.
const PUBLISHED_SURFACES = [
  "visual/assets/area-plates.json",
  "visual/index.html", "visual/index.en.html",
  "proposal.md", "proposal.en.md",
  "report/proposal.html", "report/proposal.en.html",
];

// Zhongzhiyuan's five flows must be five separately drawn things. Collapsing logistics and
// maintenance into one line would hide the case the area exists to answer: who reaches a
// broken machine, and by which route, while the public route stays open.
const ZZY_FLOWS = ["public_observation", "controlled_test", "logistics", "emergency", "maintenance"];

// What the AI Origin Community plan has to contain. Each is a spatial commitment; none of
// them implies a boundary, an owner, or a right of way.
const AIO_ELEMENTS = [
  "release_commons", "staffed_service", "non_digital_service",
  "care_frontage", "quiet_frontage", "affordable_frontage", "conditional_slow_seam",
];

// The things the AI Origin plan is not allowed to assert. The package has no evidence for
// any of them, and a plan that drew one would be inventing the site.
const AIO_NOT_CLAIMED = [
  "campus_gates", "boundaries", "access_controls", "ownership",
  "rights_of_way", "parcels", "existing_ground_floor_space",
];

function isFilled(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim() !== "";
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

// The section-dimension contract, written as a pure function so that the same code which
// judges the package can be pointed at a deliberately broken record and required to reject
// it. Every message names the record, because "a section dimension is wrong" sends a
// reader through twenty-four of them.
function sectionDimensionProblems(label, dimension) {
  const problems = [];
  const id = dimension?.id ?? "?";
  const at = `${label} dimension ${id}`;
  if (!dimension || typeof dimension !== "object") return [`${at} is not a record`];

  for (const field of DIMENSION_FIELDS) {
    // `value` is null on purpose when the basis is pending, so it is exempt from the
    // filled check and gets its own rule per basis below.
    if (field === "value") continue;
    if (!isFilled(dimension[field])) problems.push(`${at} is missing ${field}`);
  }

  if (!SECTION_DIMENSION_BASIS_TYPES.includes(dimension.basis_type)) {
    problems.push(`${at}: basis_type ${JSON.stringify(dimension.basis_type)} is not admissible on a section; a section dimension is ${SECTION_DIMENSION_BASIS_TYPES.join(" or ")}`);
  }
  if (dimension.unit !== SECTION_DIMENSION_UNIT) {
    problems.push(`${at}: unit ${JSON.stringify(dimension.unit)} is not ${SECTION_DIMENSION_UNIT}; a section dimension is a construction quantity in metres`);
  }

  if (dimension.basis_type === "proposed_module") {
    if (typeof dimension.value !== "number" || !Number.isFinite(dimension.value) || dimension.value <= 0) {
      problems.push(`${at} proposes a module but its value is ${JSON.stringify(dimension.value)}, not a finite positive quantity`);
    }
    if (!SECTION_DIMENSION_PROPOSED_SOURCE_RE.test(String(dimension.source_ref))) {
      problems.push(`${at} proposes a module but source_ref ${JSON.stringify(dimension.source_ref)} does not point at the drawing that proposes it`);
    }
    const status = String(dimension.status ?? "");
    if (!status.startsWith(SECTION_DIMENSION_STATUS_PREFIX.proposed_module)) {
      problems.push(`${at} proposes a module but status ${JSON.stringify(dimension.status)} does not declare it as proposed`);
    }
    if (!status.includes(SECTION_DIMENSION_UNVERIFIED_MARKER)) {
      problems.push(`${at} proposes a module but status ${JSON.stringify(dimension.status)} does not carry ${SECTION_DIMENSION_UNVERIFIED_MARKER}; a proposed quantity that does not say it is unverified reads as a measurement`);
    }
  }

  if (dimension.basis_type === "pending") {
    if (dimension.value !== null) {
      problems.push(`${at} is pending but carries the value ${JSON.stringify(dimension.value)}`);
    }
    if (!SECTION_DIMENSION_PENDING_SOURCE_RE.test(String(dimension.source_ref))) {
      problems.push(`${at} is pending but source_ref ${JSON.stringify(dimension.source_ref)} names no registered assumption to resolve it`);
    }
    if (!String(dimension.status ?? "").startsWith(SECTION_DIMENSION_STATUS_PREFIX.pending)) {
      problems.push(`${at} is pending but status ${JSON.stringify(dimension.status)} does not declare it pending`);
    }
    for (const field of SECTION_DIMENSION_PENDING_FIELDS) {
      if (!isFilled(dimension[field])) {
        problems.push(`${at} is pending but states no ${field}; a blank with no trigger is an indefinite blank`);
      }
    }
  }

  return problems;
}

function checkDimensions(fail, label, dimensions) {
  if (!Array.isArray(dimensions) || dimensions.length === 0) {
    fail(`${label} declares no dimensions`);
    return 0;
  }
  for (const dimension of dimensions) {
    for (const problem of sectionDimensionProblems(label, dimension)) fail(problem);
  }
  return dimensions.length;
}

// A well-formed record, used as the control below. If the validator rejected everything,
// all four mutations would "pass" and the block would prove nothing.
const SECTION_DIMENSION_CONTROL = {
  id: "MUT-CONTROL", label_zh: "对照", label_en: "control", value: 2.4, unit: "m",
  basis_type: "proposed_module", source_ref: "drawing:ZZY-PLAN-01", status: "proposed_not_verified",
};

// Each mutation aims at one clause of the section-dimension contract. A clause nobody has
// watched fail is a clause that might be wired to nothing. The angular case is first
// because it is the one that actually shipped: two extent spans in degrees of longitude
// and latitude, read off a provisional polygon and printed on a section.
const SECTION_DIMENSION_MUTATIONS = [
  {
    id: "angular-unit",
    why: "an extent span in degrees, the exact form that shipped as ZZY-SEC-B-D1",
    mentions: ["MUT-ANGULAR", "degree_longitude"],
    dimension: {
      id: "MUT-ANGULAR", label_zh: "跨度", label_en: "span", value: 0.011, unit: "degree_longitude",
      basis_type: "geometry_derived", source_ref: "area:PROV-KEY-001", status: "geometry_derived",
    },
  },
  {
    id: "numeric-geometry-derived",
    why: "the same span converted to metres; a unit check alone would have let it through",
    mentions: ["MUT-METRIC-GEO", "geometry_derived"],
    dimension: {
      id: "MUT-METRIC-GEO", label_zh: "跨度", label_en: "span", value: 912.4, unit: "m",
      basis_type: "geometry_derived", source_ref: "area:PROV-KEY-001", status: "geometry_derived",
    },
  },
  {
    id: "pending-with-number",
    why: "a pending dimension quietly given a number, which is how a blank becomes a claim",
    mentions: ["MUT-PENDING-NUM"],
    dimension: {
      id: "MUT-PENDING-NUM", label_zh: "跨度", label_en: "span", value: 6, unit: "m",
      basis_type: "pending", source_ref: "data:assumptions.json#A-BOUNDARY-001", status: "pending_survey",
      recalculation_trigger_zh: "取得测量后复算", recalculation_trigger_en: "recompute once surveyed",
    },
  },
  {
    id: "proposed-with-null",
    why: "a proposed module with nothing proposed, which is a pending dimension in disguise",
    mentions: ["MUT-PROPOSED-NULL"],
    dimension: { ...SECTION_DIMENSION_CONTROL, id: "MUT-PROPOSED-NULL", value: null },
  },
  {
    id: "proposed-non-metre",
    why: "a proposed module in some other unit, which no section can be built from",
    mentions: ["MUT-PROPOSED-MM", "mm"],
    dimension: { ...SECTION_DIMENSION_CONTROL, id: "MUT-PROPOSED-MM", value: 2400, unit: "mm" },
  },
  {
    id: "pending-without-trigger",
    why: "a pending dimension with no stated trigger, which commits nobody to recompute it",
    mentions: ["MUT-NO-TRIGGER", "recalculation_trigger_zh"],
    dimension: {
      id: "MUT-NO-TRIGGER", label_zh: "跨度", label_en: "span", value: null, unit: "m",
      basis_type: "pending", source_ref: "data:assumptions.json#A-BOUNDARY-001", status: "pending_survey",
    },
  },
];

function checkSectionDimensionMutations(fail) {
  const control = sectionDimensionProblems("MUT", SECTION_DIMENSION_CONTROL);
  if (control.length > 0) {
    fail(`the section-dimension validator rejects a well-formed record, so the mutations below prove nothing: ${control.join("; ")}`);
  }
  const caught = [];
  for (const mutation of SECTION_DIMENSION_MUTATIONS) {
    const problems = sectionDimensionProblems("MUT", mutation.dimension);
    if (problems.length === 0) {
      fail(`section-dimension mutation ${mutation.id} was accepted (${mutation.why})`);
      continue;
    }
    const joined = problems.join(" | ");
    for (const token of mutation.mentions) {
      if (!joined.includes(token)) {
        fail(`section-dimension mutation ${mutation.id} was rejected without naming ${token}: ${joined}`);
      }
    }
    caught.push(mutation.id);
  }
  return caught;
}

// The published half of the same contract.
//
// Rejecting a basis in the data does not remove it from the drawing. The sentences beside
// each section are written by hand and do not move when the data moves: after the derived
// basis was abolished, three plate paragraphs still told the reader that some section
// dimensions were "derived from the package geometry", and one of them still counted five
// numbered dimensions where the data had four. Nothing failed, because every check looked
// at the records and none looked at the prose. A drawing whose caption contradicts its own
// dimension table has published the claim the contract exists to refuse, and it does not
// matter that the JSON underneath is clean.
//
// The phrases are pinned here as literals rather than imported from the builder that writes
// them. A builder that renamed its own wording would otherwise rename this check with it,
// and the check would agree with whatever the package happened to say.
//
// Consequence worth stating: this bans the phrases outright, so the package cannot assert
// the basis and cannot deny it either. That is deliberate. A sentence explaining which
// dimensions are not geometry-derived invites the reader to look for the ones that are, and
// on a section there are none to find.
const ABOLISHED_BASIS_PHRASES = Object.freeze([
  "由本包几何推得",
  "本包几何推得",
  "derived from the package geometry",
  "derived from package geometry",
  "geometry_derived",
]);

function abolishedBasisClaims(label, text) {
  const problems = [];
  for (const phrase of ABOLISHED_BASIS_PHRASES) {
    if (!text.includes(phrase)) continue;
    problems.push(`${label} publishes ${JSON.stringify(phrase)}; a section dimension is ${SECTION_DIMENSION_BASIS_TYPES.join(" or ")}, and no published surface may describe one as derived from the package geometry`);
  }
  return problems;
}

// A paragraph that says the true thing, used as the control. If the scanner rejected clean
// prose, the mutations below would prove nothing.
const ABOLISHED_BASIS_CONTROL =
  "八个尺寸中只有四个有数字，且全部标注为建议模数。Of the eight dimensions only four carry a number, " +
  "and every one of those is labelled a proposed module.";

const ABOLISHED_BASIS_MUTATIONS = [
  {
    id: "zh-derived-claim",
    why: "the Chinese sentence that shipped on ZZY-03 and AIO-03",
    phrase: "由本包几何推得",
    text: "已给出的数值是建议模数或由本包几何推得的量，未经测量。",
  },
  {
    id: "zh-derived-claim-bare",
    why: "the same claim without its leading preposition, which the longer phrase alone would miss",
    phrase: "本包几何推得",
    text: "已给出的数值是建议模数，其余为本包几何推得的跨度。",
  },
  {
    id: "en-derived-claim",
    why: "the English sentence that shipped on ZZY-03",
    phrase: "derived from the package geometry",
    text: "The numbers given are proposed modules or quantities derived from the package geometry.",
  },
  {
    id: "en-derived-claim-articleless",
    why: "the article-free variant that shipped in the same paragraph, one word away from the last",
    phrase: "derived from package geometry",
    text: "Each is labelled either proposed module or derived from package geometry.",
  },
  {
    id: "raw-basis-token",
    why: "the machine name leaking onto a reader-facing surface",
    phrase: "geometry_derived",
    text: "Dimension ZZY-SEC-B-D1: basis_type geometry_derived, status geometry_derived.",
  },
];

function checkAbolishedBasisMutations(fail) {
  const control = abolishedBasisClaims("MUT", ABOLISHED_BASIS_CONTROL);
  if (control.length > 0) {
    fail(`the published-prose scanner rejects a clean paragraph, so the mutations below prove nothing: ${control.join("; ")}`);
  }
  const caught = [];
  for (const mutation of ABOLISHED_BASIS_MUTATIONS) {
    const problems = abolishedBasisClaims("MUT", mutation.text);
    if (problems.length === 0) {
      fail(`published-prose mutation ${mutation.id} was accepted (${mutation.why})`);
      continue;
    }
    const joined = problems.join(" | ");
    if (!joined.includes(mutation.phrase)) {
      fail(`published-prose mutation ${mutation.id} was rejected without naming ${mutation.phrase}: ${joined}`);
    }
    caught.push(mutation.id);
  }
  return caught;
}

function checkPublishedProse(fail) {
  const scanned = [];
  for (const surface of PUBLISHED_SURFACES) {
    if (!exists(surface)) {
      fail(`${surface} does not exist, so the section-dimension contract cannot be checked where a reviewer reads it`);
      continue;
    }
    for (const problem of abolishedBasisClaims(surface, readText(surface))) fail(problem);
    scanned.push(surface);
  }
  return scanned;
}

function run() {
  return harness("KA-SPA", "each key area draws one conditional plan and at least two keyed sections", (fail) => {
    if (!exists(DESIGN)) return fail(`${DESIGN} does not exist; no area declares spatial content`);
    const registry = readJson(DESIGN);
    const areas = new Map((registry.areas ?? []).map((area) => [area.area_feature_id, area]));

    const detail = {
      section_dimension_mutations_caught: checkSectionDimensionMutations(fail),
      abolished_basis_mutations_caught: checkAbolishedBasisMutations(fail),
      published_surfaces_scanned: checkPublishedProse(fail),
    };
    for (const expected of AREAS) {
      const area = areas.get(expected.area_feature_id);
      if (!area) {
        fail(`${DESIGN} declares no spatial content for ${expected.area_feature_id}`);
        continue;
      }

      const plan = area.plan ?? {};
      if (plan.id !== expected.plan_id) fail(`${expected.area_feature_id} plan is ${plan.id}, expected ${expected.plan_id}`);
      if (plan.plate_concept_id !== "02") fail(`${plan.id} must be published as concept 02, the dominant spatial plan`);
      for (const field of ["title_zh", "title_en", "condition_zh", "condition_en"]) {
        if (!isFilled(plan[field])) fail(`${plan.id} is missing ${field}`);
      }

      // A section that no plan cuts is a picture; a cut key with no section is a dead
      // reference. Both directions are checked.
      const sections = area.sections ?? [];
      const sectionIds = sections.map((section) => section.id);
      for (const required of expected.section_ids) {
        if (!sectionIds.includes(required)) fail(`${expected.area_feature_id} has no section ${required}`);
      }
      if (sections.length < 2) fail(`${expected.area_feature_id} declares ${sections.length} sections, expected at least 2`);

      const cutKeys = plan.cut_keys ?? [];
      if (cutKeys.length < 2) fail(`${plan.id} shows ${cutKeys.length} cut keys, expected at least 2`);
      for (const cut of cutKeys) {
        if (!isFilled(cut.key)) fail(`${plan.id} has a cut key with no letter`);
        if (!sectionIds.includes(cut.section_id)) {
          fail(`${plan.id} cut key ${cut.key} points at ${cut.section_id}, which is not a section of this area`);
        }
      }
      for (const section of sections) {
        if (section.plate_concept_id !== "03") fail(`${section.id} must be published as concept 03, the keyed-section artifact`);
        for (const field of ["key", "title_zh", "title_en", "shows_zh", "shows_en"]) {
          if (!isFilled(section[field])) fail(`${section.id} is missing ${field}`);
        }
        if (!cutKeys.some((cut) => cut.section_id === section.id)) {
          fail(`${section.id} is not cut by any key on ${plan.id}`);
        }
        checkDimensions(fail, section.id, section.dimensions);
      }

      const elements = plan.elements ?? [];
      if (elements.length === 0) fail(`${plan.id} draws nothing`);
      for (const element of elements) {
        for (const field of ["id", "kind", "name_zh", "name_en", "drawn_as"]) {
          if (!isFilled(element[field])) fail(`${plan.id} element ${element.id ?? "?"} is missing ${field}`);
        }
      }
      const kinds = new Set(elements.map((element) => element.kind));

      if (expected.prefix === "ZZY") {
        for (const flow of ZZY_FLOWS) {
          if (!kinds.has(flow)) fail(`${plan.id} does not separately draw the ${flow} route`);
        }
        const separation = area.separation ?? {};
        if (separation.public_observation_enters_controlled_test !== false) {
          fail(`${plan.id} does not declare that the public observation route stays out of the controlled test route`);
        }
        if (separation.public_observation_depends_on_controlled_test !== false) {
          fail(`${plan.id} does not declare that the public observation route is independent of the controlled test route`);
        }
        // The separation has to be visible in a section, not only asserted in JSON.
        const shows = sections.map((section) => `${section.shows_en} ${section.shows_zh}`).join(" ").toLowerCase();
        for (const subject of ["separation", "recovery"]) {
          if (!shows.includes(subject)) fail(`no Zhongzhiyuan section shows ${subject}`);
        }
      }

      if (expected.prefix === "AIO") {
        for (const element of AIO_ELEMENTS) {
          if (!kinds.has(element)) fail(`${plan.id} does not contain ${element}`);
        }
        const notClaimed = area.not_claimed ?? [];
        for (const subject of AIO_NOT_CLAIMED) {
          if (!notClaimed.includes(subject)) fail(`${expected.area_feature_id} does not disclaim ${subject}`);
        }
        const shows = sections.map((section) => `${section.shows_en} ${section.shows_zh}`).join(" ").toLowerCase();
        for (const subject of ["winter", "shelter", "maintenance"]) {
          if (!shows.includes(subject)) fail(`no AI Origin section shows ${subject}`);
        }
      }

      if (expected.prefix === "DZS") {
        if (plan.kind !== "not_to_scale_topology") fail(`${plan.id} kind is ${plan.kind}, expected not_to_scale_topology`);
        if (plan.not_to_scale !== true) fail(`${plan.id} does not declare itself explicitly not to scale`);
        if (plan.scale_bar !== false) fail(`${plan.id} carries a scale bar`);
        if (plan.north_arrow !== false) fail(`${plan.id} carries a north arrow`);
        const positions = plan.positions ?? [];
        const sequence = positions.map((position) => position.role);
        if (JSON.stringify(sequence) !== JSON.stringify(DZS_POSITIONS)) {
          fail(`${plan.id} positions are [${sequence.join(", ")}], expected [${DZS_POSITIONS.join(", ")}]`);
        }
        for (const position of positions) {
          if (position.assignment !== DZS_POSITION_ASSIGNMENT) {
            fail(`${plan.id} position ${position.role} is assigned ${JSON.stringify(position.assignment)}, expected ${DZS_POSITION_ASSIGNMENT}`);
          }
          if (!isFilled(position.quadrant)) fail(`${plan.id} position ${position.role} names no quadrant`);
        }
        if (!kinds.has("cycle_parking") || !kinds.has("cycle_repair")) {
          fail(`${plan.id} does not draw cycle parking and cycle repair`);
        }
      }

      detail[expected.area_feature_id] = {
        plan: plan.id,
        elements: elements.length,
        sections: sectionIds,
        cut_keys: cutKeys.map((cut) => cut.key),
      };
    }

    return detail;
  });
}

if (require.main === module) cli(run());

module.exports = { run };
