#!/usr/bin/env node

/*
 * Validate the reviewer-visible evidence boards against the package contracts.
 * This is a deterministic package audit, not an official score or field result.
 */
const fs = require("fs");
const path = require("path");

const assetDir = __dirname;
const packageDir = path.resolve(assetDir, "../..");
const figureDir = path.join(packageDir, "assets", "figures");
const read = (name) => JSON.parse(fs.readFileSync(path.join(assetDir, name), "utf8"));
const journey = read("ai-era-ordinary-journey-contract.json");
const traceability = read("ai-era-traceability-index.json");
const scenarioCards = read("scenario-cards.json");
const scenarioMatrix = read("scenario-space-operation-matrix.json");
const implementation = read("implementation-operation-matrix.json");
const taskbookCulture = read("taskbook-culture-operations-atlas-v12.json");

const requiredFigures = [
  ["ordinary-service-evidence-board.svg", ["J-01", "J-02", "J-03", "J-04", "J-05", "AC-06"]],
  ["ordinary-service-evidence-board.en.svg", ["J-01", "J-02", "J-03", "J-04", "J-05", "AC-06"]],
  ["scenario-coverage-board.svg", ["SCN-01", "SCN-02", "SCN-03", "SCN-04", "SCN-05", "SCN-06", "SCN-07", "SCN-08", "SCN-09", "SCN-10", "not_an_official"]],
  ["scenario-coverage-board.en.svg", ["SCN-01", "SCN-02", "SCN-03", "SCN-04", "SCN-05", "SCN-06", "SCN-07", "SCN-08", "SCN-09", "SCN-10", "not_an_official"]],
  ["implementation-gates-board.svg", ["PF-01", "PF-02", "PF-03", "PF-04", "PF-05"]],
  ["implementation-gates-board.en.svg", ["PF-01", "PF-02", "PF-03", "PF-04", "PF-05"]],
  ["taskbook-culture-operations-board.svg", ["agent.4", "agent.5", "agent.6", "L-01", "L-02", "L-03", "PF-05"]],
  ["taskbook-culture-operations-board.en.svg", ["agent.4", "agent.5", "agent.6", "L-01", "L-02", "L-03", "PF-05"]]
];

const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };
const pngDimensions = (buffer) => {
  if (buffer.length < 24 || buffer.readUInt32BE(0) !== 0x89504e47 || buffer.readUInt32BE(4) !== 0x0d0a1a0a) return null;
  return {width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20)};
};
expect(journey.route_bindings.length === 4, `route_bindings=${journey.route_bindings.length}, expected 4`);
expect(journey.journey_steps.length === 5, `journey_steps=${journey.journey_steps.length}, expected 5`);
expect(journey.rollback_steps.length === 5, `rollback_steps=${journey.rollback_steps.length}, expected 5`);
expect(journey.acceptance_checks.length === 6, `acceptance_checks=${journey.acceptance_checks.length}, expected 6`);
expect(traceability.rows.length === 10, `traceability.rows=${traceability.rows.length}, expected 10`);
expect(traceability.replay_coverage && traceability.replay_coverage.covered_count === 4, `covered_count=${traceability.replay_coverage && traceability.replay_coverage.covered_count}, expected 4`);
expect(scenarioCards.cards.length === 10, `scenario_cards=${scenarioCards.cards.length}, expected 10`);
expect(scenarioMatrix.rows.length === 10, `scenario_matrix_rows=${scenarioMatrix.rows.length}, expected 10`);
const matrixById = new Map(scenarioMatrix.rows.map((row) => [row.scenario_id, row]));
const fallbackCards = scenarioCards.cards.filter((card) => String(card.human_fallback_zh || "").trim());
const fallbackMatrixRows = scenarioMatrix.rows.filter((row) => String(row.human_fallback || "").trim());
expect(fallbackCards.length === scenarioCards.cards.length, `scenario_cards_with_human_fallback=${fallbackCards.length}, expected ${scenarioCards.cards.length}`);
expect(fallbackMatrixRows.length === scenarioMatrix.rows.length, `scenario_matrix_with_human_fallback=${fallbackMatrixRows.length}, expected ${scenarioMatrix.rows.length}`);
for (const card of scenarioCards.cards) {
  const row = matrixById.get(card.card_id);
  expect(row, `${card.card_id} is missing from scenario matrix`);
  if (row) expect(row.human_fallback === card.human_fallback_zh, `${card.card_id} human fallback drift between scenario card and matrix`);
}
expect(implementation.project_families.length === 5, `project_families=${implementation.project_families.length}, expected 5`);
expect(taskbookCulture.taskbook_positions.length === 3, `taskbook_positions=${taskbookCulture.taskbook_positions.length}, expected 3`);
expect(taskbookCulture.landmarks.length === 3, `landmarks=${taskbookCulture.landmarks.length}, expected 3`);
expect(taskbookCulture.annual_rhythm.length === 4, `annual_rhythm=${taskbookCulture.annual_rhythm.length}, expected 4`);
expect(taskbookCulture.boundary.official_boundary === false, "taskbook culture board must disclose official_boundary=false");
expect(taskbookCulture.not_an_official_score === true, "taskbook culture board must be not_an_official_score=true");

for (const [file, needles] of requiredFigures) {
  const target = path.join(figureDir, file);
  expect(fs.existsSync(target), `${file} is missing`);
  if (!fs.existsSync(target)) continue;
  const svg = fs.readFileSync(target, "utf8");
  for (const needle of needles) expect(svg.includes(needle), `${file} is missing ${needle}`);
  expect(/not field performance|not_an_official/.test(svg), `${file} is missing its non-official-result boundary`);
  expect(/viewBox="0 0 1600 1000"/.test(svg), `${file} must use the 1600x1000 review-board canvas`);
  const pngFile = file.replace(/\.svg$/, ".png");
  const pngPath = path.join(figureDir, pngFile);
  expect(fs.existsSync(pngPath), `${pngFile} is missing`);
  if (fs.existsSync(pngPath)) {
    const dimensions = pngDimensions(fs.readFileSync(pngPath));
    expect(dimensions && dimensions.width === 1600 && dimensions.height === 1000, `${pngFile} must be rasterized at 1600x1000`);
  }
}

const result = {
  ok: errors.length === 0,
  checks: {
    route_bindings: journey.route_bindings.length,
    journey_steps: journey.journey_steps.length,
    rollback_steps: journey.rollback_steps.length,
    acceptance_checks: journey.acceptance_checks.length,
    scenario_rows: traceability.rows.length,
    replayed_scenarios: traceability.replay_coverage && traceability.replay_coverage.covered_count,
    scenario_cards: scenarioCards.cards.length,
    scenario_cards_with_human_fallback: fallbackCards.length,
    scenario_matrix_rows: scenarioMatrix.rows.length,
    scenario_matrix_with_human_fallback: fallbackMatrixRows.length,
    project_families: implementation.project_families.length,
    taskbook_positions: taskbookCulture.taskbook_positions.length,
    landmarks: taskbookCulture.landmarks.length,
    annual_rhythm: taskbookCulture.annual_rhythm.length,
    figures: requiredFigures.length
  },
  boundary: "not an official score, field performance, authorization, or deployment result",
  errors
};
console.log(JSON.stringify(result, null, 2));
process.exitCode = result.ok ? 0 : 1;
