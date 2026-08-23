/*
 * CWS-01 is deliberately a small, dependency-free contract demonstrator.
 * It never calls a model, a network service, or a device.  It exists to make
 * the public-space authority boundary executable and inspectable.
 */
(function attachCivicWeatherSteward(root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.CivicWeatherSteward = api;
}(typeof globalThis !== "undefined" ? globalThis : this, function makeCivicWeatherSteward() {
  "use strict";

  const PAUSE = "PAUSE_OR_HANDOVER";

  function result(decision, state, reason) {
    return {
      decision,
      state,
      reason,
      automatic_action: false,
      human_decision_required: true,
      non_digital_equivalent_required: true
    };
  }

  function advise(input) {
    const value = input || {};
    if (value.personal_data) return result("REFUSE", PAUSE, "PERSONAL_DATA");
    if (value.attempted_authority && value.attempted_authority !== "none") {
      return result("REFUSE", PAUSE, "PROHIBITED_AUTHORITY");
    }
    if (!value.human_steward) return result("HOLD", PAUSE, "NO_HUMAN_STEWARD");
    if (!value.access_clear) return result("HOLD", PAUSE, "ACCESS_NOT_CLEAR");
    if (!value.free_pause) return result("HOLD", PAUSE, "FREE_PAUSE_UNAVAILABLE");
    if (!value.heritage_tree_safe) return result("HOLD", PAUSE, "HERITAGE_OR_TREE_GATE");
    if (!value.maintenance_safe) return result("HOLD", PAUSE, "MAINTENANCE_OR_SAFETY_GATE");
    if (value.weather === "offline") return result("ADVISE", PAUSE, "OFFLINE");
    if (value.weather === "rain" && value.queue === "elevated") {
      return result("ADVISE", "RAIN_WAIT_CLEAR_ROUTE", "RAIN_AND_QUEUE");
    }
    if (value.weather === "rain") return result("ADVISE", "RAIN_WAIT", "RAIN");
    if (value.weather === "heat") return result("ADVISE", "SHADE_WATER", "HEAT");
    if (value.queue === "elevated") return result("ADVISE", "KEEP_CLEAR", "QUEUE");
    return result("ADVISE", "BASELINE", "NORMAL");
  }

  function checkFixture(fixture) {
    const actual = advise(fixture.input);
    const expected = fixture.expected || {};
    const pass = actual.decision === expected.decision
      && actual.state === expected.state
      && actual.reason === expected.reason
      && actual.automatic_action === false
      && actual.human_decision_required === true
      && actual.non_digital_equivalent_required === true;
    return {
      id: fixture.id,
      label_zh: fixture.label_zh,
      must_fail: Boolean(fixture.must_fail),
      pass,
      expected,
      actual
    };
  }

  function evaluate(fixtures) {
    const results = fixtures.map(checkFixture);
    const passed = results.filter((entry) => entry.pass).length;
    const mustFail = results.filter((entry) => entry.must_fail);
    const refusalOrHold = mustFail.filter((entry) => ["REFUSE", "HOLD"].includes(entry.actual.decision)).length;
    return {
      fixture_count: results.length,
      passed,
      failed: results.length - passed,
      pass_rate: results.length ? passed / results.length : 0,
      must_fail_count: mustFail.length,
      must_fail_held_or_refused: refusalOrHold,
      automatic_action_count: results.filter((entry) => entry.actual.automatic_action).length,
      human_decision_required_count: results.filter((entry) => entry.actual.human_decision_required).length,
      results
    };
  }

  return { advise, checkFixture, evaluate };
}));

if (typeof module !== "undefined" && require.main === module) {
  const crypto = require("crypto");
  const fs = require("fs");
  const path = require("path");
  const api = module.exports;
  const args = process.argv.slice(2);
  const option = (name) => {
    const index = args.indexOf(name);
    return index >= 0 ? args[index + 1] : null;
  };
  const fixturesPath = option("--fixtures");
  const outputPath = option("--out");
  if (!fixturesPath || !outputPath) {
    process.stderr.write("Usage: node civic-weather-steward-testbench.js --fixtures <fixtures.json> --out <run.json>\n");
    process.exit(2);
  }
  const sourcePath = path.resolve(__filename);
  const fixtureBytes = fs.readFileSync(fixturesPath);
  const sourceBytes = fs.readFileSync(sourcePath);
  const fixtureSet = JSON.parse(fixtureBytes.toString("utf8"));
  const evaluation = api.evaluate(fixtureSet.fixtures || []);
  const report = {
    schema_version: "0.1.0",
    protocol_id: "CWS-01",
    protocol_version: "v6.1-weathered-commons",
    test_type: "offline deterministic contract fixture run",
    not_a_field_test: true,
    command: "node visual/assets/civic-weather-steward-testbench.js --fixtures visual/assets/civic-weather-steward-fixtures.json --out visual/assets/civic-weather-steward-run.json",
    runtime: { node: process.version, platform: process.platform, arch: process.arch },
    input_sha256: crypto.createHash("sha256").update(fixtureBytes).digest("hex"),
    runner_sha256: crypto.createHash("sha256").update(sourceBytes).digest("hex"),
    evaluation
  };
  fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  process.stdout.write(`CWS-01: ${evaluation.passed}/${evaluation.fixture_count} fixture checks passed; ${evaluation.must_fail_held_or_refused}/${evaluation.must_fail_count} must-fail cases held or refused.\n`);
  process.exit(evaluation.failed === 0 && evaluation.must_fail_held_or_refused === evaluation.must_fail_count ? 0 : 1);
}
