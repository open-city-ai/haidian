#!/usr/bin/env node
"use strict";

// Proves that two isolated clean builds of this package produce the same file tree.
//
// The package is copied to two temporary roots with different names, every builder is run
// in each copy, and the two resulting trees are compared by SHA-256. Two separate roots
// rather than one repeated run is deliberate: a build that leaked its own absolute path
// into an output would pass a same-directory rerun and fail here.
//
// Three claims are checked, and they are different claims:
//   * Reproducible from nothing. The artifacts that are generated in full are deleted in
//     each copy before the build, so the builders have to rebuild them from the registries
//     rather than finding them already correct.
//   * Idempotent. Every builder is run a second time and must report that it changed
//     nothing, so a build is a fixed point and not a file that drifts on each run.
//   * Identical. The full tree hash of copy A must equal the full tree hash of copy B.
//
// Nothing is written inside the package. The two temporary roots are removed at the end,
// including after a failure, so a failed run leaves no half-built copy behind.
//
// Usage: node test-clean-build.js [--keep]
//   --keep  leave the two temporary roots in place for inspection.

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const crypto = require("node:crypto");
const { spawnSync } = require("node:child_process");

const ASSETS = __dirname;
const PACKAGE_ROOT = path.resolve(ASSETS, "..", "..");
const REPO_ROOT = path.resolve(PACKAGE_ROOT, "..", "..", "..");

// Where the package sits inside the repository. The sandbox reproduces this path so a
// builder that reads a repository input — `build-sources.js` checks every citation against
// `brief/site-package/sources.json` — finds it at the same relative offset it always uses,
// instead of the test having to weaken the builder to make it runnable in isolation.
const PACKAGE_RELATIVE = path.relative(REPO_ROOT, PACKAGE_ROOT).split(path.sep);

// Repository inputs copied in alongside the package. They are inputs, never outputs: the
// tree hash covers them too, so a builder that wrote back into the brief would be caught.
const REPO_INPUTS = ["brief"];

// Run in dependency order: the registries are stamped into geometry and the documents
// before the viewers and the document bodies read them back. `build-drawings.js` follows
// `build-plates.js` because it embeds the rasters that builder produces and lays the boards
// out from the fractions that builder registers. `build-matrices.js` runs last because it
// resolves every reference against the artifact it names, including the viewer anchors that
// `build-viewers.js` regenerates and the drawing files `build-drawings.js` writes.
const BUILDERS = [
  "build-sources.js",
  "build-standards.js",
  "build-geometry.js",
  "build-ablation.js",
  "build-plates.js",
  "build-drawings.js",
  "build-proposals.js",
  "build-viewers.js",
  "build-matrices.js",
];

// Artifacts with no hand-authored content, deleted before each build so the run has to
// reproduce them. A file that is only partly generated, such as a proposal body whose
// prose is authored and whose registers are written, cannot be deleted and is covered by
// the idempotence pass instead.
const FULLY_GENERATED = [
  "visual/assets/physarum-zero-jitter-ablation.json",
  "visual/assets/area-plates.json",
  "visual/assets/drawing-placements.json",
  "drawings/a0-boards.pdf",
  "drawings/a0-boards.en.pdf",
  "drawings/a3-booklet.pdf",
  "drawings/a3-booklet.en.pdf",
];

// The plate rasters, by the prefix their filenames share. Listing thirty PNG paths here
// would be a second place the plate inventory is written down, and a stale entry would
// quietly stop deleting a file the build is supposed to prove it can reproduce.
const FULLY_GENERATED_PREFIXES = [
  { dir: "assets/figures", prefix: "key-area-" },
];

// Never rewritten by any builder. Verified before and after so a determinism run cannot
// be the thing that quietly moves the published record.
const FROZEN_SHA256 = {
  "visual/assets/physarum-inputs.json":
    "5e5a9be65bb122617798bf488f12fc5838dfba46aead6d824b679b48db718d53",
  "visual/assets/physarum-runs.json":
    "ea93df307c30bd90024438ed1dc4704a4e7bec8f4b456a7ec323c914ea4e06fe",
};

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function walk(root, base = root) {
  const entries = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) {
      entries.push(...walk(full, base));
    } else if (entry.isFile()) {
      entries.push(path.relative(base, full).split(path.sep).join("/"));
    }
  }
  return entries;
}

// One hash over the whole tree: every relative path paired with the hash of its bytes.
// Paths are part of the hashed text, so a file that moved or was dropped changes the tree
// hash even when the surviving bytes are all identical.
function hashTree(root) {
  const files = walk(root).sort();
  const lines = files.map((file) => `${sha256(fs.readFileSync(path.join(root, file)))}  ${file}`);
  return { tree_hash: sha256(Buffer.from(`${lines.join("\n")}\n`, "utf8")), files, lines };
}

// Reads a builder's JSON report as a pass or a fail. The builders report success two ways:
// most emit `status: "PASS"`, and the plate renderer emits `ok: true`. Both are accepted,
// but a report in neither form is treated as unreadable rather than assumed good, so a
// builder cannot pass this test by printing something nobody checked.
function verdict(report) {
  if (!report || typeof report !== "object") return "unparsed";
  if (typeof report.status === "string") return report.status;
  if (typeof report.ok === "boolean") return report.ok ? "PASS" : "FAIL";
  return "unreadable";
}

function runBuilders(root, mode) {
  const runs = [];
  for (const builder of BUILDERS) {
    const script = path.join(root, "visual", "assets", builder);
    if (!fs.existsSync(script)) {
      runs.push({ builder, skipped: "not present in this package" });
      continue;
    }
    const args = mode === "check" ? [script, "--check"] : [script];
    const result = spawnSync(process.execPath, args, { cwd: root, encoding: "utf8" });
    let report = null;
    try {
      report = JSON.parse(result.stdout);
    } catch {
      report = null;
    }
    const status = verdict(report);
    runs.push({
      builder,
      mode,
      exit_code: result.status,
      status,
      changed: report ? (report.changed_files ?? report.changed ?? null) : null,
      stdout_head: status === "PASS" ? undefined : String(result.stdout ?? "").slice(0, 400),
      stderr_head: String(result.stderr ?? "").slice(0, 400),
    });
  }
  return runs;
}

function build(label, failures) {
  const sandbox = fs.mkdtempSync(path.join(os.tmpdir(), `jz-clean-${label}-`));
  const root = path.join(sandbox, ...PACKAGE_RELATIVE);
  fs.cpSync(PACKAGE_ROOT, root, { recursive: true });
  for (const input of REPO_INPUTS) {
    const from = path.join(REPO_ROOT, input);
    if (fs.existsSync(from)) fs.cpSync(from, path.join(sandbox, input), { recursive: true });
    else failures.push(`${label}: repository input ${input} is missing and cannot be staged`);
  }

  const removed = [];
  for (const relative of FULLY_GENERATED) {
    const target = path.join(root, ...relative.split("/"));
    if (fs.existsSync(target)) {
      fs.rmSync(target);
      removed.push(relative);
    }
  }
  for (const { dir, prefix } of FULLY_GENERATED_PREFIXES) {
    const absolute = path.join(root, ...dir.split("/"));
    if (!fs.existsSync(absolute)) continue;
    for (const name of fs.readdirSync(absolute).sort()) {
      if (!name.startsWith(prefix)) continue;
      fs.rmSync(path.join(absolute, name));
      removed.push(`${dir}/${name}`);
    }
  }

  const frozenBefore = {};
  for (const [relative, expected] of Object.entries(FROZEN_SHA256)) {
    const target = path.join(root, ...relative.split("/"));
    if (!fs.existsSync(target)) {
      failures.push(`${label}: frozen asset ${relative} is missing`);
      continue;
    }
    const actual = sha256(fs.readFileSync(target));
    frozenBefore[relative] = actual;
    if (actual !== expected) failures.push(`${label}: ${relative} does not match its frozen hash before the build`);
  }

  const first = runBuilders(root, "write");
  for (const run of first) {
    if (run.skipped) continue;
    // The builder's own message is carried into the failure. A determinism result that
    // only said "exited 2" would send the reader back to rerun the build by hand.
    const detail = run.status === "PASS" ? "" : ` :: ${(run.stderr_head || run.stdout_head || "").trim().slice(0, 240)}`;
    if (run.exit_code !== 0) failures.push(`${label}: ${run.builder} exited ${run.exit_code} on the clean build${detail}`);
    if (run.status !== "PASS") failures.push(`${label}: ${run.builder} reported ${run.status} on the clean build${detail}`);
  }

  // Regenerating from nothing must actually have happened.
  for (const relative of removed) {
    if (!fs.existsSync(path.join(root, ...relative.split("/")))) {
      failures.push(`${label}: ${relative} was deleted and no builder rebuilt it`);
    }
  }

  const second = runBuilders(root, "check");
  for (const run of second) {
    if (run.skipped) continue;
    // Exit code and reported status are read together here for the same reason they are on
    // the write pass. A builder that found drift, reported it, and still exited 0 would
    // otherwise announce the drift into a stream nothing in this test consults.
    const detail = run.status === "PASS" ? "" : ` :: ${(run.stderr_head || run.stdout_head || "").trim().slice(0, 240)}`;
    if (run.exit_code !== 0) failures.push(`${label}: ${run.builder} is not idempotent; --check exited ${run.exit_code}${detail}`);
    if (run.status !== "PASS") failures.push(`${label}: ${run.builder} reported ${run.status} on the idempotence check${detail}`);
  }

  for (const [relative, expected] of Object.entries(FROZEN_SHA256)) {
    const target = path.join(root, ...relative.split("/"));
    if (!fs.existsSync(target)) continue;
    if (sha256(fs.readFileSync(target)) !== expected) {
      failures.push(`${label}: the build modified frozen asset ${relative}`);
    }
  }

  const tree = hashTree(sandbox);
  return {
    root: sandbox,
    package_root: root,
    label,
    regenerated_from_scratch: removed,
    tree_hash: tree.tree_hash,
    file_count: tree.files.length,
    frozen_before: frozenBefore,
    builders_write: first,
    builders_check: second,
    lines: tree.lines,
  };
}

function main(argv) {
  const keep = argv.includes("--keep");
  const failures = [];
  const roots = [];
  let a = null;
  let b = null;

  try {
    a = build("a", failures);
    roots.push(a.root);
    b = build("b", failures);
    roots.push(b.root);

    if (a.tree_hash !== b.tree_hash) {
      failures.push("the two clean builds produced different trees");
    }

    // Naming the files that differ is the difference between a usable failure and a
    // single mismatched hash nobody can act on.
    const byPath = new Map(a.lines.map((line) => [line.slice(66), line.slice(0, 64)]));
    const differing = [];
    for (const line of b.lines) {
      const file = line.slice(66);
      const hash = line.slice(0, 64);
      if (!byPath.has(file)) differing.push(`${file} exists only in build b`);
      else if (byPath.get(file) !== hash) differing.push(`${file} differs between the two builds`);
      byPath.delete(file);
    }
    for (const file of byPath.keys()) differing.push(`${file} exists only in build a`);
    for (const item of differing) failures.push(item);

    const report = {
      status: failures.length === 0 ? "PASS" : "FAIL",
      exit_code: failures.length === 0 ? 0 : 1,
      builders: BUILDERS,
      builders_present: a.builders_write.filter((run) => !run.skipped).map((run) => run.builder),
      builders_absent: a.builders_write.filter((run) => run.skipped).map((run) => run.builder),
      regenerated_from_scratch: a.regenerated_from_scratch,
      build_a: { tree_hash: a.tree_hash, file_count: a.file_count },
      build_b: { tree_hash: b.tree_hash, file_count: b.file_count },
      identical: a.tree_hash === b.tree_hash,
      frozen_sha256: a.frozen_before,
      differing_files: differing,
      failures,
    };
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return report.exit_code;
  } finally {
    if (!keep) {
      for (const root of roots) {
        try {
          fs.rmSync(root, { recursive: true, force: true });
        } catch {
          // A copy left behind in the system temp directory is not worth failing a
          // determinism result over, and the result itself is already computed.
        }
      }
    }
  }
}

if (require.main === module) {
  try {
    process.exitCode = main(process.argv.slice(2));
  } catch (error) {
    process.stdout.write(`${JSON.stringify({
      status: "FAIL",
      exit_code: 2,
      error_type: "harness_error",
      error: error instanceof Error ? error.message : String(error),
    }, null, 2)}\n`);
    process.exitCode = 2;
  }
}

module.exports = { hashTree, runBuilders, BUILDERS };
