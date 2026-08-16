from __future__ import annotations

import shutil
import subprocess
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class ProposalArtifactViewerFocusTests(unittest.TestCase):
    def test_artifact_viewer_declares_modal_dialog_semantics(self) -> None:
        html = (ROOT / "proposal-view.html").read_text(encoding="utf-8")
        self.assertIn(
            'id="artifactViewer" hidden aria-hidden="true" role="dialog" '
            'aria-modal="true" aria-labelledby="artifactViewerTitle" tabindex="-1"',
            html,
        )

    @unittest.skipUnless(shutil.which("node"), "Node.js is required for focus tests")
    def test_focus_is_trapped_and_restored_for_every_close_path(self) -> None:
        harness = r"""
const fs = require('fs');
const vm = require('vm');

const documentListeners = new Map();
let document;

class ElementStub {
  constructor(id, {hidden = false} = {}) {
    this.id = id;
    this.hidden = hidden;
    this.disabled = false;
    this.isConnected = true;
    this.innerHTML = '';
    this.textContent = '';
    this.attributes = new Map();
    this.listeners = new Map();
    this.focusables = [];
    this.classList = {add() {}, remove() {}};
  }
  addEventListener(type, listener) { this.listeners.set(type, listener); }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  hasAttribute(name) { return this.attributes.has(name); }
  getClientRects() { return this.hidden ? [] : [{}]; }
  focus() { document.activeElement = this; }
  contains(element) { return element === this || this.focusables.includes(element); }
  querySelectorAll() {
    return this.focusables.filter(element => !element.disabled && !element.hidden);
  }
}

const ids = Object.fromEntries([
  'artifactGroups', 'artifactViewer', 'artifactViewerBody', 'artifactViewerType',
  'artifactViewerTitle', 'artifactViewerPath', 'artifactRawLink', 'artifactPrev',
  'artifactNext', 'artifactViewerClose'
].map(id => [id, new ElementStub(id, {hidden: id === 'artifactViewer'})]));
const opener = new ElementStub('opener');
const secondOpener = new ElementStub('secondOpener');
const background = new ElementStub('background');
ids.artifactViewer.focusables = [
  ids.artifactPrev, ids.artifactNext, ids.artifactRawLink, ids.artifactViewerClose
];

document = {
  activeElement: opener,
  body: new ElementStub('body'),
  getElementById(id) { return ids[id] || null; },
  querySelectorAll() { return []; },
  addEventListener(type, listener) { documentListeners.set(type, listener); }
};
const window = {};
vm.runInNewContext(fs.readFileSync(process.argv[1], 'utf8'), {
  window, document, URL, console
});

const viewer = window.ProposalArtifactViewer.mount({
  artifacts: [
    {path: 'first.md', group: 'narrative'},
    {path: 'second.md', group: 'narrative'}
  ],
  groups: {narrative: {zh: '正文'}},
  url: path => path,
  type: () => 'MD',
  label: path => path,
  fetchText: async path => `# ${path}`,
  fetchJSON: async () => ({})
});

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function keydown(key, shiftKey = false) {
  const event = {
    key,
    shiftKey,
    defaultPrevented: false,
    propagationStopped: false,
    preventDefault() { this.defaultPrevented = true; },
    stopImmediatePropagation() { this.propagationStopped = true; }
  };
  documentListeners.get('keydown')(event);
  return event;
}

(async () => {
  await viewer.open('first.md');
  assert(document.activeElement === ids.artifactViewerClose, 'open must focus close');

  let event = keydown('Tab');
  assert(event.defaultPrevented, 'forward Tab at the last control must be trapped');
  assert(document.activeElement === ids.artifactNext, 'forward Tab must wrap to first enabled control');

  event = keydown('Tab', true);
  assert(event.defaultPrevented, 'reverse Tab at the first control must be trapped');
  assert(document.activeElement === ids.artifactViewerClose, 'reverse Tab must wrap to last control');

  background.focus();
  event = keydown('Tab');
  assert(event.defaultPrevented, 'background focus must be pulled into the modal');
  assert(document.activeElement === ids.artifactNext, 'background focus must return to first control');

  await ids.artifactNext.listeners.get('click')();
  keydown('Escape');
  assert(ids.artifactViewer.hidden, 'Escape must close the viewer');
  assert(document.activeElement === opener, 'Escape must restore the original opener after navigation');

  secondOpener.focus();
  await viewer.open('second.md');
  ids.artifactViewerClose.listeners.get('click')();
  assert(ids.artifactViewer.hidden, 'close button must close the viewer');
  assert(document.activeElement === secondOpener, 'close button must restore its opener');
})().catch(error => { console.error(error); process.exitCode = 1; });
"""
        completed = subprocess.run(
            ["node", "-e", harness, str(ROOT / "proposal-artifact-viewer.js")],
            cwd=ROOT,
            capture_output=True,
            text=True,
            check=False,
        )
        self.assertEqual(completed.returncode, 0, completed.stdout + completed.stderr)


if __name__ == "__main__":
    unittest.main()
