#!/usr/bin/env python3
"""Create bilingual historical display artifacts after proposal backfill.

The script is intentionally maintainer-only.  It preserves every original
artifact, creates a localized sibling, and records the relationship in the
submission manifest.  Raster figures retain the full source graphic and gain
an appended OCR-derived translation panel so no spatial evidence is removed.

This script is the second pass of the bilingual backfill workflow:

1. ``backfill_bilingual_submissions.py`` — translates ``proposal.md`` to
   create the sibling Markdown file.
2. **This script** — creates bilingual counterparts for rendered artifacts:
   ``report/proposal.*.html``, ``drawings/*.pdf``, and
   ``assets/figures/*.*.png``.

Artifacts created
-----------------
- ``report/proposal.en.html`` / ``report/proposal.zh.html`` — rendered HTML
  reading versions using ``render_proposal_html.render_html()``.
- ``drawings/a3-booklet.en.pdf`` / ``drawings/a3-booklet.zh.pdf`` — copies of
  the original PDF with a localized cover sheet prepended.
- ``assets/figures/*.en.png`` / ``assets/figures/*.zh.png`` — figure copies
  with an OCR-translated caption panel appended at the bottom.
- Updates ``manifest.json`` to add ``language`` and ``translation_of`` fields
  for each new artifact.

Requirements
------------
Install both dependency groups::

    python3 -m pip install -r requirements-review.txt
    python3 -m pip install -r requirements-translation.txt

On Apple Silicon, ``mlx-community/Qwen2.5-7B-Instruct-4bit`` is used for
translation; on other platforms, ``Qwen/Qwen2.5-3B-Instruct`` is used.
``Pillow`` is required for figure caption rendering.

Usage
-----
Process all merged submissions::

    python3 scripts/backfill_bilingual_artifacts.py

Process one submission::

    python3 scripts/backfill_bilingual_artifacts.py \\
        --only submissions/alice/my-proposal

Dry run::

    python3 scripts/backfill_bilingual_artifacts.py --dry-run

Exit code is 0 on success and 1 when any artifact fails to render.
"""
from __future__ import annotations

import argparse
import hashlib
import html
import json
import os
import re
import subprocess
from pathlib import Path
from typing import Any

from backfill_bilingual_submissions import (
    CJK_RE,
    EAST_ASIAN_CHAR_CLASS,
    MlxQwenRuntime,
    QwenRuntime,
    front_value,
    load_glossary,
    parse_front_matter,
)
from render_proposal_html import render_html
from validate_submission import localized_path


ROOT = Path(__file__).resolve().parents[1]
OCR_CACHE = Path("/tmp/haidian-bilingual-backfill/ocr-translation-v3.jsonl")
FONT_PATHS = [
    Path("/Library/Fonts/Arial Unicode.ttf"),
    Path("/System/Library/Fonts/Supplemental/Arial Unicode.ttf"),
]


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def display_path(path: Path) -> str:
    try:
        return path.relative_to(ROOT).as_posix()
    except ValueError:
        return path.as_posix()


def is_symlink_free_contained_path(path: Path, root: Path) -> bool:
    try:
        relative = path.relative_to(root)
    except ValueError:
        return False
    current = root
    for part in relative.parts:
        current /= part
        if current.is_symlink():
            return False
    return path.resolve().is_relative_to(root.resolve())


def package_is_symlink_free(directory: Path) -> bool:
    def raise_walk_error(error: OSError) -> None:
        raise error

    try:
        for current, names, files in os.walk(
            directory, followlinks=False, onerror=raise_walk_error
        ):
            if any((Path(current) / name).is_symlink() for name in [*names, *files]):
                return False
    except OSError:
        return False
    return True


def resolve_only_selection(found: list[Path], only: list[str], repo_root: Path) -> list[Path]:
    if not only:
        return found
    selected: list[Path] = []
    resolved = {path: path.resolve() for path in found}
    for raw in only:
        candidate = Path(raw)
        if candidate.is_absolute():
            target = candidate.resolve()
            matches = [path for path in found if resolved[path] == target]
        elif "/" in raw or "\\" in raw:
            target = (repo_root / candidate).resolve()
            matches = [path for path in found if resolved[path] == target]
        else:
            matches = [path for path in found if path.name == raw]
            if len(matches) > 1:
                choices = ", ".join(path.relative_to(repo_root).as_posix() for path in matches)
                raise ValueError(f"--only `{raw}` is ambiguous; use an exact path: {choices}")
        if not matches:
            raise ValueError(f"--only `{raw}` did not match a discovered submission")
        if matches[0] not in selected:
            selected.append(matches[0])
    return sorted(selected)


def submission_dirs(repo_root: Path, only: list[str]) -> list[Path]:
    submissions_root = repo_root / "submissions"
    if submissions_root.is_symlink():
        raise ValueError(f"submissions root must not be a symbolic link: {submissions_root}")
    dirs = sorted(
        path.parent
        for path in submissions_root.glob("*/*/proposal.md")
        if is_symlink_free_contained_path(path, submissions_root)
        and package_is_symlink_free(path.parent)
    )
    return resolve_only_selection(dirs, only, repo_root)


def languages(submission_dir: Path) -> tuple[str, str]:
    front, body = parse_front_matter((submission_dir / "proposal.md").read_text(encoding="utf-8"))
    source = front_value(front, "language")
    if source not in {"zh", "en"}:
        source = "zh" if CJK_RE.search(body) else "en"
    return source, "en" if source == "zh" else "zh"


class OcrTranslator:
    def __init__(self, device: str, cache_path: Path, runtime_name: str) -> None:
        self.cache_path = cache_path
        self.cache: dict[tuple[str, str, str], str] = {}
        if cache_path.exists():
            for line in cache_path.read_text(encoding="utf-8").splitlines():
                try:
                    item = json.loads(line)
                except json.JSONDecodeError:
                    continue
                self.cache[(item["source_language"], item["target_language"], item["source"])] = item[
                    "target"
                ]
        self.runtime = MlxQwenRuntime() if runtime_name == "mlx" else QwenRuntime(device)

    def _append_cache(self, source: str, target: str, source_language: str, target_language: str) -> None:
        self.cache_path.parent.mkdir(parents=True, exist_ok=True)
        with self.cache_path.open("a", encoding="utf-8") as stream:
            stream.write(
                json.dumps(
                    {
                        "source_language": source_language,
                        "target_language": target_language,
                        "source": source,
                        "target": target,
                    },
                    ensure_ascii=False,
                )
                + "\n"
            )

    def translate_many(self, texts: list[str], source_language: str, target_language: str) -> list[str]:
        results = [""] * len(texts)
        pending: list[tuple[int, str]] = []
        for index, text in enumerate(texts):
            cached = self.cache.get((source_language, target_language, text))
            if cached is not None:
                results[index] = cached
            else:
                pending.append((index, text))
        for start in range(0, len(pending), 4):
            batch = pending[start : start + 4]
            prompts: list[str] = []
            for _index, source in batch:
                target_label = "professional English" if target_language == "en" else "professional Simplified Chinese"
                system = (
                    "You edit OCR text extracted from an urban-design diagram. Correct obvious OCR noise, then "
                    f"translate all meaningful content into {target_label}. Preserve numbers, metrics, identifiers, "
                    "and proper names. Do not invent content. Return only a clear reading-order transcript."
                )
                user = f"OCR TEXT:\n{source}"
                prompts.append(
                    self.runtime.tokenizer.apply_chat_template(
                        [{"role": "system", "content": system}, {"role": "user", "content": user}],
                        tokenize=False,
                        add_generation_prompt=True,
                    )
                )
            translated = self.runtime.generate(prompts, 1000, target_language == "en")
            for (index, source), target in zip(batch, translated):
                target = target.strip()
                if target_language == "en" and CJK_RE.search(target):
                    phrases = list(
                        dict.fromkeys(re.findall(f"[{EAST_ASIAN_CHAR_CLASS}]+", target))
                    )
                    replacements = self.runtime.translate_residual_phrases(
                        phrases, source_language, target_language
                    )
                    for phrase, replacement in zip(phrases, replacements):
                        target = target.replace(phrase, replacement)
                results[index] = target
                self.cache[(source_language, target_language, source)] = target
                self._append_cache(source, target, source_language, target_language)
        return results

    def translate(self, text: str, source_language: str, target_language: str) -> str:
        chunks = [item.strip() for item in re.split(r"(?<=[。！？.!?])\s*", text) if item.strip()]
        expanded: list[str] = []
        for chunk in chunks or [text]:
            while len(chunk) > 380:
                cut = max(chunk.rfind("，", 0, 380), chunk.rfind(",", 0, 380))
                if cut < 120:
                    cut = 380
                expanded.append(chunk[: cut + 1])
                chunk = chunk[cut + 1 :]
            if chunk:
                expanded.append(chunk)
        return " ".join(self.translate_many(expanded, source_language, target_language)).strip()


def ocr_image(path: Path, source_language: str) -> str:
    language = "chi_sim+eng" if source_language == "zh" else "eng+chi_sim"
    def run(psm: str) -> list[str]:
        completed = subprocess.run(
            ["tesseract", str(path), "stdout", "-l", language, "--psm", psm],
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            check=False,
        )
        if completed.returncode != 0:
            raise RuntimeError(f"OCR failed for {path}: {completed.stderr.strip()}")
        return [
            re.sub(r"\s+", " ", line).strip()
            for line in completed.stdout.splitlines()
            if line.strip()
        ]

    lines = run("11")
    dense_lines = run("6")
    for index, line in enumerate(lines):
        if "provisional" not in line.lower():
            continue
        replacement = next(
            (
                candidate
                for candidate in dense_lines
                if "provisional" in candidate.lower()
                and len(CJK_RE.findall(candidate)) > len(CJK_RE.findall(line))
            ),
            "",
        )
        if replacement:
            lines[index] = replacement
    cleaned_lines: list[str] = []
    for line in lines:
        if re.fullmatch(r"(?:e+\s*)+", line, re.I):
            continue
        if re.search(r"Codex\s*/\s*v?\d", line, re.I):
            line = re.sub(r"\s*\S+\s+[x×]\s+Codex\s*/\s*v?\d[^\n]*$", "", line, flags=re.I)
        if line.strip():
            cleaned_lines.append(line.strip())
    lines = cleaned_lines
    return "\n".join(lines)


def wrap_lines(draw: Any, text: str, font: Any, width: int) -> list[str]:
    lines: list[str] = []
    for paragraph in text.splitlines() or [""]:
        words = paragraph.split()
        if not words:
            lines.append("")
            continue
        current = words[0]
        for word in words[1:]:
            candidate = current + " " + word
            if draw.textbbox((0, 0), candidate, font=font)[2] <= width:
                current = candidate
            else:
                lines.append(current)
                current = word
        lines.append(current)
    return lines


def create_localized_figure(
    source_path: Path,
    target_path: Path,
    translated_text: str,
    target_language: str,
    terminology: list[str],
) -> None:
    from PIL import Image, ImageDraw, ImageFont

    source = Image.open(source_path).convert("RGB")
    width = source.width
    padding = max(24, width // 30)
    font_path = next((path for path in FONT_PATHS if path.exists()), None)
    if font_path is None:
        raise RuntimeError("Arial Unicode font is required for bilingual figure panels")
    body_size = max(15, min(28, width // 65))
    title_size = int(body_size * 1.35)
    body_font = ImageFont.truetype(str(font_path), body_size)
    title_font = ImageFont.truetype(str(font_path), title_size)
    probe = Image.new("RGB", (width, 100), "white")
    draw = ImageDraw.Draw(probe)
    label = "English translation of figure text" if target_language == "en" else "图中文字的中文译文"
    note = (
        "The source graphic is preserved above; this panel translates its detected text."
        if target_language == "en"
        else "上方保留原始图件；本栏提供识别文字的中文翻译。"
    )
    content = translated_text or (
        "No language-dependent text was detected." if target_language == "en" else "未检测到需要翻译的文字。"
    )
    if terminology:
        content += "\n\n" + ("Recommended terminology: " if target_language == "en" else "推荐术语：")
        content += "; ".join(terminology)
    text_width = width - padding * 2
    lines = wrap_lines(draw, note + "\n\n" + content, body_font, text_width)
    line_height = int(body_size * 1.55)
    panel_height = padding * 3 + title_size + len(lines) * line_height
    output = Image.new("RGB", (width, source.height + panel_height), "white")
    output.paste(source, (0, 0))
    draw = ImageDraw.Draw(output)
    top = source.height + padding
    draw.text((padding, top), label, fill="#16324f", font=title_font)
    top += title_size + padding
    for line in lines:
        draw.text((padding, top), line, fill="#1f2933", font=body_font)
        top += line_height
    target_path.parent.mkdir(parents=True, exist_ok=True)
    output.save(target_path, format="PNG", optimize=True)


def backfill_figures(
    dirs: list[Path],
    translator: OcrTranslator,
    zh_to_en: dict[str, str],
    en_to_zh: dict[str, str],
    force: bool,
) -> int:
    changed = 0
    for directory in dirs:
        source_language, target_language = languages(directory)
        term_map = zh_to_en if source_language == "zh" else en_to_zh
        for source_path in sorted((directory / "assets" / "figures").glob("*.png")):
            if re.search(r"\.(?:zh|en)\.png$", source_path.name):
                continue
            target_path = source_path.with_name(
                f"{source_path.stem}.{target_language}{source_path.suffix}"
            )
            if target_path.exists() and not force:
                continue
            detected = ocr_image(source_path, source_language)
            translated = translator.translate(detected, source_language, target_language) if detected else ""
            terminology = [
                target
                for source, target in sorted(term_map.items(), key=lambda item: len(item[0]), reverse=True)
                if source in detected
            ]
            terminology = list(dict.fromkeys(terminology))
            create_localized_figure(
                source_path, target_path, translated, target_language, terminology
            )
            changed += 1
            print(f"figure: {display_path(target_path)}", flush=True)
    return changed


def backfill_html(dirs: list[Path]) -> int:
    changed = 0
    for directory in dirs:
        source_language, target_language = languages(directory)
        translation_name = f"proposal.{target_language}.md"
        translation_path = directory / translation_name
        if not translation_path.exists():
            continue
        localize_translation_image_paths(directory, target_language)
        report_dir = directory / "report"
        report_dir.mkdir(parents=True, exist_ok=True)
        primary_report = report_dir / "proposal.html"
        translated_report = report_dir / f"proposal.{target_language}.html"
        primary_report.write_text(
            render_html(
                directory,
                "proposal.md",
                translation_href=translated_report.name,
            ),
            encoding="utf-8",
        )
        translated_report.write_text(
            render_html(directory, translation_name, translation_href="proposal.html"),
            encoding="utf-8",
        )
        visual_dir = directory / "visual"
        visual_dir.mkdir(parents=True, exist_ok=True)
        translated_visual = visual_dir / f"index.{target_language}.html"
        translated_visual.write_text(
            render_html(directory, translation_name, translation_href="index.html"),
            encoding="utf-8",
        )
        changed += 3
        print(f"html: {display_path(directory)} ({source_language}/{target_language})", flush=True)
    return changed


def plain_markdown_lines(text: str) -> list[tuple[str, str]]:
    _front, body = parse_front_matter(text)
    result: list[tuple[str, str]] = []
    in_fence = False
    for raw in body.splitlines():
        if raw.strip().startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence or not raw.strip():
            continue
        image = re.match(r"!\[[^\]]*\]\(([^)]+)\)", raw.strip())
        if image:
            result.append(("image", image.group(1)))
            continue
        heading = re.match(r"^(#{1,6})\s+(.+)$", raw)
        if heading:
            result.append((f"h{min(len(heading.group(1)), 3)}", heading.group(2)))
            continue
        cleaned = re.sub(r"[*_~]", "", raw).strip()
        result.append(("body", cleaned))
    return result


def localize_translation_image_paths(directory: Path, target_language: str) -> None:
    proposal_path = directory / f"proposal.{target_language}.md"
    if not proposal_path.exists():
        return
    text = proposal_path.read_text(encoding="utf-8")

    def replace(match: re.Match[str]) -> str:
        label, rel = match.group(1), match.group(2)
        localized = localized_path(rel, target_language)
        if (directory / localized).exists():
            return f"![{label}]({localized})"
        return match.group(0)

    updated = re.sub(r"!\[([^\]]*)\]\(([^)]+)\)", replace, text)
    if updated != text:
        proposal_path.write_text(updated, encoding="utf-8")


def backfill_pdfs(dirs: list[Path]) -> int:
    try:
        from reportlab.lib.enums import TA_LEFT
        from reportlab.lib.pagesizes import A0, A3, landscape
        from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
        from reportlab.lib.units import mm
        from reportlab.pdfbase import pdfmetrics
        from reportlab.pdfbase.ttfonts import TTFont
        from reportlab.platypus import Image as PdfImage
        from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer
    except ImportError as exc:
        raise SystemExit("Run this mode with the bundled workspace Python containing reportlab") from exc

    font_path = next((path for path in FONT_PATHS if path.exists()), None)
    if font_path is None:
        raise RuntimeError("Arial Unicode font is required for bilingual PDFs")
    pdfmetrics.registerFont(TTFont("BilingualSans", str(font_path)))
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name="BiTitle", fontName="BilingualSans", fontSize=24, leading=31, spaceAfter=12))
    styles.add(ParagraphStyle(name="BiH2", fontName="BilingualSans", fontSize=16, leading=22, spaceBefore=10, spaceAfter=6))
    styles.add(ParagraphStyle(name="BiH3", fontName="BilingualSans", fontSize=13, leading=18, spaceBefore=7, spaceAfter=4))
    styles.add(ParagraphStyle(name="BiBody", fontName="BilingualSans", fontSize=9, leading=13, alignment=TA_LEFT, spaceAfter=5))
    changed = 0
    for directory in dirs:
        _source_language, target_language = languages(directory)
        proposal_path = directory / f"proposal.{target_language}.md"
        if not proposal_path.exists():
            continue
        localize_translation_image_paths(directory, target_language)
        text = proposal_path.read_text(encoding="utf-8")
        front, _body = parse_front_matter(text)
        title = front_value(front, "title") or directory.name
        drawings = directory / "drawings"
        drawings.mkdir(parents=True, exist_ok=True)
        a3_path = drawings / f"a3-booklet.{target_language}.pdf"
        story: list[Any] = [Paragraph(html.escape(title), styles["BiTitle"])]
        skipped_document_title = False
        for kind, value in plain_markdown_lines(text):
            if kind == "h1" and not skipped_document_title and value.strip() == title.strip():
                skipped_document_title = True
                continue
            if kind == "image":
                image_path = directory / localized_path(value, target_language)
                if not image_path.exists():
                    image_path = directory / value
                if image_path.exists():
                    image = PdfImage(str(image_path))
                    max_width, max_height = 250 * mm, 150 * mm
                    scale = min(max_width / image.imageWidth, max_height / image.imageHeight, 1)
                    image.drawWidth = image.imageWidth * scale
                    image.drawHeight = image.imageHeight * scale
                    story.extend([image, Spacer(1, 6 * mm)])
                continue
            style = styles["BiTitle"] if kind == "h1" else styles["BiH2"] if kind == "h2" else styles["BiH3"] if kind == "h3" else styles["BiBody"]
            story.append(Paragraph(html.escape(value), style))
        document = SimpleDocTemplate(
            str(a3_path), pagesize=A3, leftMargin=18 * mm, rightMargin=18 * mm,
            topMargin=18 * mm, bottomMargin=18 * mm,
        )
        document.build(story)

        a0_path = drawings / f"a0-boards.{target_language}.pdf"
        board_story: list[Any] = [Paragraph(html.escape(title), styles["BiTitle"]), Spacer(1, 8 * mm)]
        figures = sorted((directory / "assets" / "figures").glob(f"*.{target_language}.png"))
        for index, figure_path in enumerate(figures):
            board_story.append(Paragraph(html.escape(figure_path.stem), styles["BiH2"]))
            image = PdfImage(str(figure_path))
            max_width, max_height = 1080 * mm, 760 * mm
            scale = min(max_width / image.imageWidth, max_height / image.imageHeight)
            image.drawWidth = image.imageWidth * scale
            image.drawHeight = image.imageHeight * scale
            board_story.append(image)
            if index < len(figures) - 1:
                board_story.append(PageBreak())
        if not figures:
            board_story.append(Paragraph("No localized figures available.", styles["BiBody"]))
        board_document = SimpleDocTemplate(
            str(a0_path), pagesize=landscape(A0), leftMargin=20 * mm, rightMargin=20 * mm,
            topMargin=20 * mm, bottomMargin=20 * mm,
        )
        board_document.build(board_story)
        changed += 2
        print(f"pdf: {display_path(directory)}", flush=True)
    return changed


def backfill_manifests(dirs: list[Path]) -> int:
    changed = 0
    for directory in dirs:
        source_language, target_language = languages(directory)
        manifest_path = directory / "manifest.json"
        if not manifest_path.exists():
            continue
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        items = manifest.setdefault("files", [])
        by_path = {
            str(item.get("path")): item
            for item in items
            if isinstance(item, dict) and item.get("path")
        }
        primary_paths = [
            "proposal.md",
            "report/proposal.html",
            "visual/index.html",
            "drawings/a3-booklet.pdf",
            "drawings/a0-boards.pdf",
        ]
        primary_paths.extend(
            path.relative_to(directory).as_posix()
            for path in sorted((directory / "assets" / "figures").glob("*.png"))
            if not re.search(r"\.(?:zh|en)\.png$", path.name)
        )
        for primary in primary_paths:
            if not (directory / primary).exists():
                continue
            primary_item = by_path.get(primary)
            if primary_item is None:
                primary_item = {
                    "path": primary,
                    "role": "narrative" if primary.endswith((".md", ".html")) else "figure",
                    "required": primary in {"proposal.md", "report/proposal.html", "visual/index.html"},
                }
                items.append(primary_item)
                by_path[primary] = primary_item
            primary_item["language"] = source_language
            counterpart = localized_path(primary, target_language)
            if not (directory / counterpart).exists():
                continue
            translated_item = by_path.get(counterpart)
            if translated_item is None:
                translated_item = {
                    "path": counterpart,
                    "role": primary_item.get("role", "figure"),
                    "required": False,
                }
                items.append(translated_item)
                by_path[counterpart] = translated_item
            translated_item["language"] = target_language
            translated_item["translation_of"] = primary
        for item in items:
            if not isinstance(item, dict):
                continue
            rel = item.get("path")
            if rel and rel != "manifest.json" and (directory / rel).is_file():
                item["sha256"] = sha256(directory / rel)
        manifest_path.write_text(
            json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )
        changed += 1
        print(f"manifest: {display_path(directory)}", flush=True)
    return changed


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("mode", choices=["figures", "html", "pdfs", "manifests", "all"])
    parser.add_argument("--repo-root", type=Path, default=ROOT)
    parser.add_argument("--only", action="append", default=[])
    parser.add_argument("--device", choices=["auto", "cpu", "mps"], default="auto")
    parser.add_argument("--runtime", choices=["transformers", "mlx"], default="transformers")
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()
    repo_root = args.repo_root.resolve()
    try:
        dirs = submission_dirs(repo_root, args.only)
    except ValueError as exc:
        parser.error(str(exc))
    changed = 0
    if args.mode in {"figures", "all"}:
        zh_to_en, en_to_zh = load_glossary(repo_root / "docs" / "terminology-glossary.md")
        translator = OcrTranslator(args.device, OCR_CACHE, args.runtime)
        changed += backfill_figures(dirs, translator, zh_to_en, en_to_zh, args.force)
    if args.mode in {"html", "all"}:
        changed += backfill_html(dirs)
    if args.mode in {"pdfs", "all"}:
        changed += backfill_pdfs(dirs)
    if args.mode in {"manifests", "all"}:
        changed += backfill_manifests(dirs)
    print(f"Updated {changed} bilingual artifacts")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
