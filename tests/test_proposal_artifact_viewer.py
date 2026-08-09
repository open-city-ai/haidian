from __future__ import annotations

import shutil
import subprocess
import unittest
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]


@unittest.skipUnless(shutil.which("node"), "Node.js is required for artifact viewer tests")
class ProposalArtifactViewerTests(unittest.TestCase):
    def test_stale_render_does_not_replace_latest_selection(self) -> None:
        harness = r"""
const fs = require('fs');
const vm = require('vm');

class Element {
  constructor() { this.innerHTML = ''; this.textContent = ''; this.hidden = true; this.disabled = false; }
  setAttribute() {}
  addEventListener() {}
  focus() {}
  querySelectorAll() { return []; }
}

const ids = Object.fromEntries([
  'artifactViewer', 'artifactViewerBody', 'artifactViewerType', 'artifactViewerTitle',
  'artifactViewerPath', 'artifactRawLink', 'artifactPrev', 'artifactNext',
  'artifactViewerClose'
].map(id => [id, new Element()]));
const document = {
  body: {classList: {add() {}, remove() {}}},
  getElementById(id) { return ids[id] || null; },
  querySelectorAll() { return []; },
  addEventListener() {}
};
const window = {};
vm.runInNewContext(fs.readFileSync(process.argv[1], 'utf8'), {window, document, URL, console});

let resolveOld;
const oldJSON = new Promise(resolve => { resolveOld = resolve; });
const viewer = window.ProposalArtifactViewer.mount({
  artifacts: [{path: 'old.json'}, {path: 'latest.md'}],
  groups: {},
  url: path => path,
  type: path => path.endsWith('.json') ? 'JSON' : 'Markdown',
  label: path => path,
  fetchJSON: () => oldJSON,
  fetchText: async () => '# Latest selection'
});

(async () => {
  const oldRender = viewer.open('old.json');
  await viewer.open('latest.md');
  resolveOld({records: [{id: 'stale'}]});
  await oldRender;
  const body = ids.artifactViewerBody.innerHTML;
  if (!body.includes('Latest selection') || body.includes('stale')) {
    throw new Error(`stale render replaced latest body: ${body}`);
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
"""
        completed = subprocess.run(
            ["node", "-e", harness, str(REPO_ROOT / "proposal-artifact-viewer.js")],
            cwd=REPO_ROOT,
            capture_output=True,
            text=True,
            check=False,
        )
        self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)


if __name__ == "__main__":
    unittest.main()
