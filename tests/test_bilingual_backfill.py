import hashlib
import json
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
import sys

sys.path.insert(0, str(ROOT / "scripts"))

from backfill_bilingual_artifacts import (  # noqa: E402
    backfill_manifests,
    create_localized_figure,
    localize_translation_image_paths,
)
from backfill_bilingual_submissions import (  # noqa: E402
    LocalTranslator,
    extract_legacy_translation,
    parse_front_matter,
    set_front_fields,
    split_long_text,
    translate_body,
)


class BilingualBackfillTests(unittest.TestCase):
    def test_front_matter_parser_accepts_utf8_bom(self) -> None:
        front, body = parse_front_matter("\ufeff---\nlanguage: zh\n---\n正文\n")
        self.assertEqual(["language: zh"], front)
        self.assertEqual("正文\n", body)

    def test_extracts_embedded_legacy_chinese_translation(self) -> None:
        body = "# English\n\nBody.\n\n# 中文正式译文\n\n# 中文标题\n\n正文。\n"
        self.assertEqual(
            "# 中文标题\n\n正文。\n", extract_legacy_translation(body, "zh")
        )
        self.assertIsNone(extract_legacy_translation(body, "en"))

    def test_front_matter_update_deduplicates_translation_file(self) -> None:
        front = [
            'title: "Example"',
            'language: "zh"',
            'translation_file: "proposal.en.md"',
            'translation_file: "proposal.en.md"',
        ]
        updated = set_front_fields(front, {"translation_file": "proposal.en.md"})
        self.assertEqual(1, sum(line.startswith("translation_file:") for line in updated))

    def test_structure_verifier_allows_reordering_and_removes_added_code_token(self) -> None:
        translator = object.__new__(LocalTranslator)
        translator.source_language = "zh"
        translator.target_language = "en"
        translator.term_map = {}
        source = "Use `SITE_BOUNDARY` before `KEY_AREA`."
        output = "Use `KEY_AREA`, `EXTRA_FILE`, then `SITE_BOUNDARY`."
        cleaned = translator._clean_and_verify(source, output, {})
        self.assertNotIn("`EXTRA_FILE`", cleaned)
        self.assertIn("`SITE_BOUNDARY`", cleaned)
        self.assertIn("`KEY_AREA`", cleaned)

    def test_structure_verifier_normalizes_evidence_reference_spacing(self) -> None:
        translator = object.__new__(LocalTranslator)
        translator.source_language = "zh"
        translator.target_language = "en"
        translator.term_map = {}
        source = "Evidence [source:SITE-PACKAGE]."
        output = "Evidence [source: SITE-PACKAGE]."
        self.assertEqual(
            "Evidence [source:SITE-PACKAGE].",
            translator._clean_and_verify(source, output, {}),
        )

    def test_evidence_reference_followed_by_parenthesis_is_not_a_markdown_link(self) -> None:
        translator = object.__new__(LocalTranslator)
        tokens = translator._immutable_tokens(
            "[metric:floor_area_ratio](See `metrics.json` for details.)"
        )
        self.assertIn("`metrics.json`", tokens)
        self.assertNotIn("See `metrics.json` for details.", tokens)
        self.assertIn("assets/figure.png", translator._immutable_tokens("![Figure](assets/figure.png)"))

    def test_long_text_split_never_breaks_evidence_reference(self) -> None:
        reference = "[data:geometry/green_space.geojson#GREEN-001]"
        text = "蓝绿公共空间的核心证据为 " + reference + "、并连接其他指标和实施说明。"
        chunks = split_long_text(text, limit=35)
        self.assertEqual(text, "".join(chunks))
        self.assertEqual(1, sum(reference in chunk for chunk in chunks))

    def test_structure_verifier_rejects_repair_instruction_leak(self) -> None:
        translator = object.__new__(LocalTranslator)
        translator.source_language = "zh"
        translator.target_language = "en"
        translator.term_map = {}
        with self.assertRaisesRegex(RuntimeError, "repair instructions"):
            translator._clean_and_verify(
                "蓝绿空间",
                "Blue-green space. Invalid validation failure: expected=[], actual=[].",
                {},
            )
        with self.assertRaisesRegex(RuntimeError, "repair instructions"):
            translator._clean_and_verify(
                "维护要求",
                "Preserve Markdown punctuation and structure. TEXT TO TRANSLATE: Maintenance.",
                {},
            )

    def test_legitimate_negative_statement_is_not_treated_as_refusal(self) -> None:
        translator = object.__new__(LocalTranslator)
        translator.source_language = "zh"
        translator.target_language = "en"
        translator.term_map = {}
        output = 'The "Milestone Pin" does not form a commercial ranking.'
        self.assertEqual(output, translator._clean_and_verify("里程钉不形成商业排名。", output, {}))

    def test_source_label_is_not_treated_as_repair_prompt_leak(self) -> None:
        translator = object.__new__(LocalTranslator)
        translator.source_language = "zh"
        translator.target_language = "en"
        translator.term_map = {}
        self.assertEqual("Source:", translator._clean_and_verify("来源：", "Source:", {}))

    def test_fully_protected_html_comment_is_not_translated(self) -> None:
        translator = object.__new__(LocalTranslator)
        translator.source_language = "zh"
        translator.target_language = "en"
        translator.batch_size = 4
        translator.cache = {}
        comment = "<!-- 内部中文注释 -->"
        self.assertEqual([comment], translator.translate_many([comment]))

    def test_text_fence_is_translated_but_code_fence_is_preserved(self) -> None:
        class StubTranslator:
            batch_size = 4

            def translate(self, text: str) -> str:
                return {"中文图例": "English legend"}.get(text, text)

            def translate_many(self, texts: list[str]) -> list[str]:
                return [self.translate(text) for text in texts]

        body = "```text\n中文图例\n```\n\n```json\n{\"label\": \"中文图例\"}\n```\n"
        translated = translate_body(body, StubTranslator())
        self.assertIn("```text\nEnglish legend\n```", translated)
        self.assertIn('```json\n{"label": "中文图例"}\n```', translated)

    def test_image_alt_translation_cannot_inject_markdown_link(self) -> None:
        class StubTranslator:
            batch_size = 4

            def translate(self, _text: str) -> str:
                return "![Figure 04]( North-South Connection"

            def translate_many(self, texts: list[str]) -> list[str]:
                return texts

        translated = translate_body(
            "![图04｜南北贯通](assets/figures/mobility.png)\n", StubTranslator()
        )
        self.assertEqual(
            "![North-South Connection](assets/figures/mobility.png)\n", translated
        )

    def test_chinese_inside_immutable_reference_is_not_untranslated_prose(self) -> None:
        translator = object.__new__(LocalTranslator)
        reference = "[data:geometry/phasing.geojson#PH-近期-001]"
        self.assertFalse(translator._has_unprotected_cjk(reference))
        self.assertTrue(translator._has_unprotected_cjk(reference + " 未翻译正文"))
        self.assertTrue(translator._has_unprotected_cjk("KPI は still untranslated"))
        self.assertTrue(translator._has_unprotected_cjk("한국어 residual text"))

    def test_english_prose_detector_ignores_identifiers_but_finds_sentences(self) -> None:
        translator = object.__new__(LocalTranslator)
        self.assertFalse(translator._has_unprotected_latin("[来源:SITE-PACKAGE] MEND AI"))
        self.assertFalse(translator._has_unprotected_latin("阿姆斯特丹 Marineterrein 与 AI Verify"))
        self.assertTrue(
            translator._has_unprotected_latin("这是中文。The proposal remains untranslated.")
        )
        self.assertTrue(translator._has_unprotected_latin("This completes。"))
        self.assertTrue(translator._has_unprotected_latin("displacement预防是设计标准。"))
        self.assertEqual(["override"], translator._residual_latin_phrases("人类override信标"))
        self.assertEqual(
            ["This completes"], translator._residual_latin_phrases("This completes。")
        )

    def test_immutable_fallback_reinserts_reference_verbatim(self) -> None:
        translator = object.__new__(LocalTranslator)
        translator.target_language = "en"
        translator.translate_many = lambda texts: [text.upper() for text in texts]
        reference = "[data:geometry/buildings.geojson#BLDG-001]"
        result = translator._translate_preserving_immutable(f"before {reference} after")
        self.assertEqual(f"BEFORE {reference} AFTER", result)
        translator.translate_many = lambda texts: list(texts)
        code_result = translator._translate_preserving_immutable("before`file.json`after")
        self.assertEqual("before `file.json` after", code_result)
        translator.translate_many = lambda texts: [f"`{text}`" for text in texts]
        stray_result = translator._translate_preserving_immutable("before`file.json`after")
        self.assertEqual(2, stray_result.count("`"))
        self.assertIn("`file.json`", stray_result)
        translator.translate_many = lambda texts: list(texts)
        identifier_result = translator._translate_preserving_immutable("prefix REN AXIS suffix")
        self.assertIn("REN AXIS", identifier_result)

        translator.translate_many = lambda texts: ["Public sign: " if text else "" for text in texts]
        display_code = "公共导视 `JZ-07 / 京张记忆译站`"
        display_result = translator._translate_preserving_immutable(display_code)
        self.assertEqual("Public sign: `JZ-07 / 京张记忆译站`", display_result)

    def test_glossary_replacement_does_not_enter_inline_code(self) -> None:
        translator = object.__new__(LocalTranslator)
        translator.source_language = "zh"
        translator.target_language = "en"
        translator.term_map = {"京张": "Jing-Zhang"}
        source = "京张导视使用 `JZ-07 / 京张记忆译站`。"
        output = "Jing-Zhang signage uses `JZ-07 / 京张记忆译站`."
        cleaned = translator._clean_and_verify(source, output, translator.term_map)
        self.assertEqual(output, cleaned)

    def test_punctuation_normalization_does_not_enter_inline_code(self) -> None:
        translator = object.__new__(LocalTranslator)
        translator.source_language = "zh"
        translator.target_language = "en"
        translator.term_map = {}
        source = "复核 `04 轨道、公交、步行`。"
        output = "Review `04 轨道、公交、步行`。"
        cleaned = translator._clean_and_verify(source, output, {})
        self.assertEqual("Review `04 轨道、公交、步行`.", cleaned)

    def test_fluency_repair_hides_and_restores_immutable_tokens(self) -> None:
        translator = object.__new__(LocalTranslator)
        translator.source_language = "en"
        translator.target_language = "zh"
        translator._generate = lambda prompts, _limit: [prompts[0]]
        source = "Keep MENDWAY and [source:CASE-01]."
        repaired = translator._repair_preserving_immutable(
            source,
            "保留 MENDWAY 和 [source:CASE-01]。",
            lambda _source, draft: draft,
            128,
        )
        self.assertEqual("保留 MENDWAY 和 [source:CASE-01]。", repaired)

        translator._generate = lambda _prompts, _limit: ["润色稿丢失了占位符。"]
        fallback = translator._repair_preserving_immutable(
            source,
            "保留 MENDWAY 和 [source:CASE-01]。",
            lambda _source, draft: draft,
            128,
        )
        self.assertEqual("保留 MENDWAY 和 [source:CASE-01]。", fallback)

    def test_localized_figure_retains_source_and_adds_translation_panel(self) -> None:
        from PIL import Image

        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            source = root / "diagram.png"
            target = root / "diagram.en.png"
            Image.new("RGB", (800, 480), "#123047").save(source)
            create_localized_figure(
                source,
                target,
                "Translated diagram labels and metrics.",
                "en",
                ["城市设计 = Urban Design"],
            )
            with Image.open(target) as result:
                self.assertEqual(800, result.width)
                self.assertGreater(result.height, 480)

    def test_translation_proposal_uses_existing_localized_figure(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            directory = Path(tmp)
            figures = directory / "assets" / "figures"
            figures.mkdir(parents=True)
            (figures / "overview.en.png").write_bytes(b"translated")
            proposal = directory / "proposal.en.md"
            proposal.write_text("![Overview](assets/figures/overview.png)\n", encoding="utf-8")
            localize_translation_image_paths(directory, "en")
            self.assertIn("overview.en.png", proposal.read_text(encoding="utf-8"))

    def test_manifest_backfill_registers_language_counterparts_and_hashes(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            directory = root / "submissions" / "alice" / "example"
            (directory / "report").mkdir(parents=True)
            (directory / "visual").mkdir()
            (directory / "drawings").mkdir()
            (directory / "assets" / "figures").mkdir(parents=True)
            (directory / "proposal.md").write_text(
                '---\ntitle: "示例"\nlanguage: "zh"\n---\n正文\n', encoding="utf-8"
            )
            (directory / "proposal.en.md").write_text(
                '---\ntitle: "Example"\nlanguage: "en"\ntranslation_of: "proposal.md"\n---\nBody\n',
                encoding="utf-8",
            )
            (directory / "report" / "proposal.html").write_text("primary", encoding="utf-8")
            (directory / "report" / "proposal.en.html").write_text("translated", encoding="utf-8")
            (directory / "manifest.json").write_text(
                json.dumps(
                    {
                        "files": [
                            {
                                "path": "proposal.md",
                                "role": "narrative",
                                "required": True,
                            }
                        ]
                    }
                ),
                encoding="utf-8",
            )
            backfill_manifests([directory])
            manifest = json.loads((directory / "manifest.json").read_text(encoding="utf-8"))
            items = {item["path"]: item for item in manifest["files"]}
            self.assertEqual("zh", items["proposal.md"]["language"])
            self.assertEqual("en", items["proposal.en.md"]["language"])
            self.assertEqual("proposal.md", items["proposal.en.md"]["translation_of"])
            expected = hashlib.sha256((directory / "proposal.en.md").read_bytes()).hexdigest()
            self.assertEqual(expected, items["proposal.en.md"]["sha256"])


if __name__ == "__main__":
    unittest.main()
