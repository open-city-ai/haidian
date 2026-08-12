from __future__ import annotations

import subprocess
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
VIEWER = ROOT / "proposal-view.html"


class ProposalViewSanitizerTests(unittest.TestCase):
    def test_malformed_image_url_is_removed_without_aborting_report(self) -> None:
        script = r"""
const fs = require('fs');
const source = fs.readFileSync(process.argv[1], 'utf8');
function extract(name, next) {
  return source.slice(source.indexOf(`function ${name}`), source.indexOf(`function ${next}`));
}
global.location = {
  href: 'https://example.test/proposal-view.html',
  origin: 'https://example.test'
};
global.state = {packagePath: 'submissions/alice/demo'};
eval(extract('safeHttpUrl', 'validPackagePath'));
eval(extract('sanitizeReport', 'buildMaps'));

function image(src) {
  return {
    src,
    loading: '',
    removed: false,
    getAttribute: () => src,
    remove() { this.removed = true; }
  };
}
const malformed = image('https://[');
const valid = image('../assets/figures/site.png');
const root = {
  querySelectorAll(selector) {
    if (selector === 'img') return [malformed, valid];
    return [];
  }
};

sanitizeReport(root, 'https://example.test/submissions/alice/demo/report/proposal.html');
if (!malformed.removed) throw new Error('malformed image was retained');
if (valid.removed) throw new Error('valid package image was removed');
if (valid.src !== 'https://example.test/submissions/alice/demo/assets/figures/site.png') {
  throw new Error(`valid image resolved incorrectly: ${valid.src}`);
}
if (valid.loading !== 'lazy') throw new Error('valid image was not made lazy');
"""
        completed = subprocess.run(
            ["node", "-e", script, str(VIEWER)],
            cwd=ROOT,
            capture_output=True,
            text=True,
            check=False,
        )

        self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)


if __name__ == "__main__":
    unittest.main()
