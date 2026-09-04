#!/usr/bin/env node
/* Compatibility entry retained for older review instructions.
 * v4.0 replaces cover-only mutation with a full bilingual PDF rebuild, so this
 * legacy command is intentionally read-only and delegates to the v4.0 check. */
const { spawnSync } = require('child_process');
const path = require('path');

const target = path.join(__dirname, 'build-autonomy-pdf-bundle-v40.js');
const result = spawnSync(process.execPath, [target, '--check'], { stdio: 'inherit' });
if (result.error) {
  console.error(result.error);
  process.exit(1);
}
process.exit(result.status === null ? 1 : result.status);
