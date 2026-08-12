from __future__ import annotations

import json
import re
import subprocess
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PAGES = ("agent.html", "brief.html", "review.html")

NODE_RUNNER = r"""
const payload = JSON.parse(process.argv[1]);
const elements = new Map();
function element(id) {
  if (!elements.has(id)) {
    elements.set(id, {
      id,
      textContent: '',
      innerHTML: '',
      style: {},
      dataset: {},
      addEventListener() {},
    });
  }
  return elements.get(id);
}
globalThis.window = globalThis;
window.HAIDIAN_SOURCE_REGISTRY = {
  registryPath: 'data/source_registry.json',
  updatedDate: '2026-08-12',
  counts: {by_usable_for_formal: {yes: 1}},
  formal: [{title: 'Source', usable_for_formal: 'yes'}],
  background: [],
  provisional: [],
};
globalThis.navigator = {language: 'en-US'};
globalThis.document = {
  title: '',
  documentElement: {lang: ''},
  body: {style: {}},
  getElementById: element,
  querySelectorAll() { return []; },
};
globalThis.localStorage = payload.storageThrows ? {
  getItem() { throw new Error('storage disabled'); },
  setItem() { throw new Error('storage disabled'); },
} : {
  value: payload.storedLanguage,
  getItem() { return this.value; },
  setItem(_key, value) { this.value = value; },
};
eval(payload.script);
process.stdout.write(JSON.stringify({
  lang: document.documentElement.lang,
  title: document.title,
  toggle: element('langToggle').textContent,
  registry: element('registryStats').innerHTML,
}));
"""


def page_script(page: str) -> str:
    html = (ROOT / page).read_text(encoding="utf-8")
    matches = re.findall(r"<script>(.*?)</script>", html, re.DOTALL)
    if len(matches) != 1:
        raise AssertionError(f"expected one inline script in {page}, found {len(matches)}")
    return matches[0]


def run_page(page: str, *, stored_language: str = "fr", storage_throws: bool = False) -> dict:
    payload = json.dumps(
        {
            "script": page_script(page),
            "storedLanguage": stored_language,
            "storageThrows": storage_throws,
        }
    )
    completed = subprocess.run(
        ["node", "-e", NODE_RUNNER, payload],
        capture_output=True,
        text=True,
        check=False,
    )
    if completed.returncode:
        raise AssertionError(completed.stdout + completed.stderr)
    return json.loads(completed.stdout)


class FrontendLanguageStorageTests(unittest.TestCase):
    def test_pages_preserve_supported_stored_languages(self) -> None:
        for stored_language, expected_lang, expected_toggle in (
            ("zh", "zh-CN", "EN"),
            ("en", "en", "中文"),
        ):
            for page in PAGES:
                with self.subTest(page=page, stored_language=stored_language):
                    result = run_page(page, stored_language=stored_language)
                    self.assertEqual(expected_lang, result["lang"])
                    self.assertTrue(result["title"])
                    self.assertEqual(expected_toggle, result["toggle"])

    def test_pages_ignore_unsupported_stored_language(self) -> None:
        for page in PAGES:
            with self.subTest(page=page):
                result = run_page(page)
                self.assertEqual("en", result["lang"])
                self.assertTrue(result["title"])
                self.assertEqual("中文", result["toggle"])
        self.assertTrue(run_page("agent.html")["registry"])

    def test_pages_initialize_when_storage_access_throws(self) -> None:
        for page in PAGES:
            with self.subTest(page=page):
                result = run_page(page, storage_throws=True)
                self.assertEqual("en", result["lang"])
                self.assertTrue(result["title"])
                self.assertEqual("中文", result["toggle"])


if __name__ == "__main__":
    unittest.main()
