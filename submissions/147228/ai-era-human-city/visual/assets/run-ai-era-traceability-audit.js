#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const packageRoot = path.resolve(__dirname, "../..");

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(packageRoot, relativePath), "utf8"));
}

function fail(message) {
  throw new Error(`AI-era traceability audit failed: ${message}`);
}

const index = readJson("visual/assets/ai-era-traceability-index.json");
const cards = readJson("visual/assets/scenario-cards.json");
const journey = readJson("visual/assets/ai-era-ordinary-journey-contract.json");
const rows = index.rows;
const cardIds = cards.cards.map((card) => card.card_id);
const rowIds = rows.map((row) => row.scenario_id);

if (rows.length !== cardIds.length || rows.length !== 10) {
  fail(`expected 10 crosswalk rows matching scenario cards, got ${rows.length}`);
}
if (new Set(rowIds).size !== rowIds.length || [...rowIds].sort().join(",") !== [...cardIds].sort().join(",")) {
  fail("crosswalk scenario IDs do not exactly match scenario cards");
}

const allowedAgents = new Set(["agent.4", "agent.5", "agent.6"]);
const allowedRubric = new Set(index.rubric_dimensions);
const routeIds = new Set(journey.route_bindings.map((route) => route.id || route.route_id));
const replayRows = rows.filter((row) => row.replay_refs.length > 0);
const replayIds = replayRows.map((row) => row.scenario_id).sort();
const declaredReplayIds = [...index.replay_coverage.covered_scenario_ids].sort();
const contractScenarioIds = [...journey.scenario_ids].sort();

if (index.replay_coverage.total_count !== rows.length || index.replay_coverage.covered_count !== replayRows.length) {
  fail("declared replay coverage count does not match rows");
}
if (replayIds.join(",") !== declaredReplayIds.join(",") || replayIds.join(",") !== contractScenarioIds.join(",")) {
  fail("replay coverage does not match row references and journey contract");
}

let evidenceCount = 0;
for (const row of rows) {
  for (const agent of row.agent_taskbook_refs) {
    if (!allowedAgents.has(agent)) fail(`${row.scenario_id} has unknown agent ref ${agent}`);
  }
  for (const dimension of row.rubric_dimension_refs) {
    if (!allowedRubric.has(dimension)) fail(`${row.scenario_id} has unknown rubric ref ${dimension}`);
  }
  for (const reference of row.evidence_refs) {
    const relativePath = reference.split("#", 1)[0];
    if (!fs.existsSync(path.join(packageRoot, relativePath))) {
      fail(`${row.scenario_id} points to missing evidence ${reference}`);
    }
    evidenceCount += 1;
  }
  for (const replayRef of row.replay_refs) {
    if (!routeIds.has(replayRef) && replayRef !== "ai-era-ordinary-journey-evidence.json") {
      fail(`${row.scenario_id} has unknown replay ref ${replayRef}`);
    }
  }
}

console.log(`AI_ERA_TRACEABILITY_AUDIT PASS rows=${rows.length} replay=${replayRows.length}/${rows.length} evidence_refs=${evidenceCount}`);
