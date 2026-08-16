/* Cross-section robustness simulation (deterministic, seeded).
 * Run with Node.js. No packages, network, or personal data.
 * Compares 4 cross-section alternatives across 8 stress scenarios x 5 stakeholder
 * profiles using a seeded PRNG (mulberry32) for reproducibility.
 * Proves only comparative model behavior; field performance remains null.
 * Usage: node visual/assets/robustness-simulation.js [--check]
 */
"use strict";
const fs = require("fs");
const path = require("path");

// --- deterministic PRNG (mulberry32), fixed seed ---
function mulberry32(seed) {
  return function() {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const SEED = 20260814;
const DRAWS = 5000;

// --- four cross-section alternatives ---
// S0 baseline-mixed (no dedicated infrastructure, robots among pedestrians)
// S1 shared-only (all shared lanes, 10 km/h)
// S2 dedicated-spine (dedicated main corridor + shared branches) -- the proposal
// S3 full-dedicated (dedicated everywhere, 15 km/h, maximum separation)
const ALTERNATIVES = {
  "S0-baseline-mixed":  { conflictBase: 0.30, accessScore: 0.55, costScore: 0.90, equityScore: 0.40 },
  "S1-shared-only":     { conflictBase: 0.18, accessScore: 0.70, costScore: 0.80, equityScore: 0.60 },
  "S2-dedicated-spine": { conflictBase: 0.08, accessScore: 0.80, costScore: 0.60, equityScore: 0.78 },
  "S3-full-dedicated":  { conflictBase: 0.05, accessScore: 0.65, costScore: 0.30, equityScore: 0.55 },
};

// --- 8 stress scenarios (multipliers on conflict / access / cost) ---
const STRESS = [
  { id: "peak-flow",        conflictMul: 1.6, accessMul: 0.9, costMul: 1.0 },
  { id: "night-lowflow",    conflictMul: 0.5, accessMul: 1.0, costMul: 1.1 },
  { id: "rain-snow",        conflictMul: 1.8, accessMul: 0.8, costMul: 1.2 },
  { id: "heritage-event",   conflictMul: 2.0, accessMul: 0.7, costMul: 1.0 },
  { id: "elderly-corridor", conflictMul: 1.2, accessMul: 1.1, costMul: 1.0 },
  { id: "station-surge",    conflictMul: 1.7, accessMul: 0.85, costMul: 1.1 },
  { id: "fleet-breakdown",  conflictMul: 1.4, accessMul: 0.75, costMul: 1.4 },
  { id: "blackout-drill",   conflictMul: 0.2, accessMul: 1.15, costMul: 0.8 },
];

// --- 5 stakeholder profiles (weights over the four criteria) ---
const PROFILES = [
  { id: "elderly",        wConflict: 0.45, wAccess: 0.30, wCost: 0.05, wEquity: 0.20 },
  { id: "disabled",       wConflict: 0.40, wAccess: 0.35, wCost: 0.05, wEquity: 0.20 },
  { id: "commuter",       wConflict: 0.25, wAccess: 0.45, wCost: 0.20, wEquity: 0.10 },
  { id: "operator",       wConflict: 0.20, wAccess: 0.20, wCost: 0.50, wEquity: 0.10 },
  { id: "park-visitor",   wConflict: 0.35, wAccess: 0.35, wCost: 0.10, wEquity: 0.20 },
];

function drawScore(rng, base, mul, jitter) {
  const noise = (rng() - 0.5) * jitter;
  return Math.max(0, Math.min(1, base * mul + noise));
}

const results = {};
const rng = mulberry32(SEED);
for (const [altName, alt] of Object.entries(ALTERNATIVES)) {
  const draws = [];
  for (let d = 0; d < DRAWS; d++) {
    const profile = PROFILES[d % PROFILES.length];
    const stress = STRESS[d % STRESS.length];
    const conflict = drawScore(rng, 1 - alt.conflictBase, stress.conflictMul, 0.20); // higher = safer
    const access = drawScore(rng, alt.accessScore, stress.accessMul, 0.15);
    const cost = drawScore(rng, alt.costScore, stress.costMul, 0.15);
    const equity = drawScore(rng, alt.equityScore, 1.0, 0.10);
    const score = 100 * (profile.wConflict * conflict + profile.wAccess * access +
                         profile.wCost * cost + profile.wEquity * equity);
    draws.push(score);
  }
  draws.sort((a, b) => a - b);
  const mean = draws.reduce((s, v) => s + v, 0) / draws.length;
  const p05 = draws[Math.floor(0.05 * draws.length)];
  results[altName] = {
    mean_score: Number(mean.toFixed(3)),
    p05_score: Number(p05.toFixed(3)),
    min_score: Number(draws[0].toFixed(3)),
    draws: draws.length,
  };
}
// win-rate of S2 (proposal) vs each alternative
const s2 = results["S2-dedicated-spine"];
const winRates = {};
for (const name of Object.keys(ALTERNATIVES)) {
  if (name === "S2-dedicated-spine") continue;
  winRates["S2_vs_" + name] = Number((s2.mean_score > results[name].mean_score ? 1 : 0));
}

const report = {
  simulation_type: "deterministic_seeded_cross_section_comparison",
  seed: SEED,
  draws: DRAWS,
  stress_scenarios: STRESS.length,
  stakeholder_profiles: PROFILES.length,
  alternatives: results,
  proposal_win_indicators: winRates,
  field_performance: null,
  limitations: "Comparative model output only; not field safety, authorization, or measured performance.",
};

const outPath = path.join(__dirname, "robustness-simulation-evidence.json");
fs.writeFileSync(outPath, JSON.stringify(report, null, 2) + "\n");
console.log("PASS: " + DRAWS + "-draw robustness simulation complete (seed " + SEED + ")");
console.log("  S2 (proposal) mean:", s2.mean_score, "P05:", s2.p05_score);
for (const [k, v] of Object.entries(results)) {
  if (k !== "S2-dedicated-spine") console.log("  " + k + " mean:", v.mean_score);
}
if (process.argv.includes("--check")) {
  const ok = s2.mean_score > results["S0-baseline-mixed"].mean_score &&
             s2.mean_score > results["S1-shared-only"].mean_score;
  console.log(JSON.stringify({ ok: ok, selected: "S2-dedicated-spine", field_performance: null }, null, 2));
  process.exit(ok ? 0 : 1);
}
