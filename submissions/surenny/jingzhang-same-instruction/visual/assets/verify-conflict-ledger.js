const fs = require("fs");
const path = require("path");
const assert = require("assert");

const ledger = JSON.parse(
  fs.readFileSync(path.join(__dirname, "conflict-ledger.json"), "utf8"),
);
const channels = [
  "site_sign",
  "paper",
  "hotline",
  "staff_script",
  "web_app",
  "robot",
  "api",
];

assert.strictEqual(ledger.cases.length, 6);
assert.strictEqual(new Set(ledger.cases.map((item) => item.id)).size, 6);
for (const item of ledger.cases) {
  assert.strictEqual(item.synthetic, true);
  assert.strictEqual(item.contains_personal_data, false);
  assert.strictEqual(
    item.adverse_automation,
    "paused_when_it_depends_only_on_conflicting_instruction",
  );
  assert.strictEqual(
    item.failure_outcome,
    "no_negative_marker_based_only_on_reasonable_reliance_on_either_visible_instruction",
  );
  assert.ok(item.ai_offline_path);
  assert.deepStrictEqual(
    item.channels.map((entry) => entry.channel).sort(),
    [...channels].sort(),
  );
  assert.ok(
    item.channels.every(
      (entry) =>
        entry.required_state ===
        "closed_or_explicitly_unresolved_with_owner",
    ),
  );
}

process.stdout.write(
  `${JSON.stringify({
    ok: true,
    cases: 6,
    channel_fixtures: 42,
    ai_offline_cases: 6,
  })}\n`,
);
