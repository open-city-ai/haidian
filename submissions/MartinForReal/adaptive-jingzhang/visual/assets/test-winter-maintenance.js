#!/usr/bin/env node
"use strict";

// Does the package say what happens to these places in February, and who clears them?
//
// Seasonal performance is where reversible urban proposals usually stop being honest: a
// pilot runs in good weather, the drawings show summer, and snow gets stored on the only
// accessible route because nobody drew where else it could go. This test asks for the
// winter case as spatial content — where the snow goes, and what it must stay clear of —
// and it refuses to let a ninety-day pilot stand in for a year.
//
// Read-only. Usage: node test-winter-maintenance.js

const contract = require("./key-area-contract.js");

const { AREAS, SEASONAL_TOPICS, PILOT_DAYS, exists, readJson, harness, cli } = contract;

const DESIGN = "visual/assets/key-area-design.json";

function isFilled(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim() !== "";
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

function run() {
  return harness("KA-SEA", "each area shows winter and seasonal operations spatially, with no pilot standing in for a year", (fail) => {
    if (!exists(DESIGN)) return fail(`${DESIGN} does not exist; no area declares seasonal operations`);
    const registry = readJson(DESIGN);
    const areas = new Map((registry.areas ?? []).map((area) => [area.area_feature_id, area]));

    const detail = {};
    for (const expected of AREAS) {
      const area = areas.get(expected.area_feature_id);
      if (!area) {
        fail(`${DESIGN} declares nothing for ${expected.area_feature_id}`);
        continue;
      }
      const seasonal = area.seasonal_operations;
      if (!seasonal) {
        fail(`${expected.area_feature_id} declares no seasonal_operations`);
        continue;
      }
      if (seasonal.plate_concept_id !== "04") {
        fail(`${expected.prefix} seasonal operations must be published as concept 04, found ${JSON.stringify(seasonal.plate_concept_id)}`);
      }
      for (const field of ["winter_section_ref", "shows_zh", "shows_en"]) {
        if (!isFilled(seasonal[field])) fail(`${expected.prefix} seasonal operations is missing ${field}`);
      }

      // Snow has to be put somewhere. Saying so, and saying what it must not block, is the
      // difference between a maintenance plan and a wish.
      const snow = seasonal.snow_storage;
      if (!snow) {
        fail(`${expected.prefix} declares no snow storage`);
      } else {
        if (snow.overlaps_step_free_route !== false) {
          fail(`${expected.prefix} snow storage does not declare that it stays clear of the step-free route`);
        }
        if (snow.overlaps_tactile_route !== false) {
          fail(`${expected.prefix} snow storage does not declare that it stays clear of the tactile route`);
        }
        const locations = snow.locations ?? [];
        if (locations.length === 0) fail(`${expected.prefix} snow storage names no location`);
        for (const location of locations) {
          for (const field of ["id", "name_zh", "name_en"]) {
            if (!isFilled(location[field])) fail(`${expected.prefix} snow storage location ${location.id ?? "?"} is missing ${field}`);
          }
          // A location that does not name what it is clear of has not been checked
          // against anything.
          const clearOf = location.clear_of ?? [];
          for (const route of ["step_free", "tactile"]) {
            if (!clearOf.includes(route)) {
              fail(`${expected.prefix} snow storage ${location.id} does not declare itself clear of the ${route} route`);
            }
          }
        }
      }

      const topics = seasonal.topics ?? [];
      const declared = topics.map((topic) => topic.id);
      for (const topic of SEASONAL_TOPICS) {
        if (!declared.includes(topic)) fail(`${expected.prefix} seasonal operations does not cover ${topic}`);
      }
      for (const topic of topics) {
        for (const field of ["id", "shown_zh", "shown_en", "spatial_ref"]) {
          if (!isFilled(topic[field])) fail(`${expected.prefix} seasonal topic ${topic.id ?? "?"} is missing ${field}`);
        }
      }

      // The pilot claim. Ninety days of good behaviour is evidence about ninety days.
      const pilot = seasonal.pilot ?? {};
      if (pilot.days !== PILOT_DAYS) fail(`${expected.prefix} pilot is ${JSON.stringify(pilot.days)} days, expected ${PILOT_DAYS}`);
      if (pilot.sufficient_for_year_round !== false) {
        fail(`${expected.prefix} does not label the ${PILOT_DAYS}-day pilot insufficient for year-round performance`);
      }
      for (const field of ["note_zh", "note_en"]) {
        if (!isFilled(pilot[field])) fail(`${expected.prefix} pilot is missing ${field}`);
      }

      const thresholds = seasonal.thresholds ?? [];
      if (thresholds.length === 0) fail(`${expected.prefix} declares no seasonal threshold`);
      for (const threshold of thresholds) {
        for (const field of ["id", "label_zh", "label_en", "proposed_target_zh", "proposed_target_en", "status"]) {
          if (!isFilled(threshold[field])) fail(`${expected.prefix} threshold ${threshold.id ?? "?"} is missing ${field}`);
        }
        // Nothing here has been approved by anyone, so an approved threshold or a permitted
        // start would be a claim the package cannot support.
        if (threshold.approved_threshold !== null) {
          fail(`${expected.prefix} threshold ${threshold.id} declares an approved threshold ${JSON.stringify(threshold.approved_threshold)}`);
        }
        if (threshold.pilot_start_allowed !== false) {
          fail(`${expected.prefix} threshold ${threshold.id} allows a pilot to start while the threshold is pending`);
        }
        if (threshold.status !== "pending") {
          fail(`${expected.prefix} threshold ${threshold.id} status is ${JSON.stringify(threshold.status)}, expected pending`);
        }
      }

      detail[expected.area_feature_id] = {
        topics: declared.length,
        snow_locations: (seasonal.snow_storage?.locations ?? []).length,
        thresholds: thresholds.length,
      };
    }

    return detail;
  });
}

if (require.main === module) cli(run());

module.exports = { run };
