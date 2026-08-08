#!/usr/bin/env python3
"""Render a submission proposal.md into an offline readable HTML report."""

from __future__ import annotations

import argparse
import html
import os
import re
from pathlib import Path, PurePosixPath


IMAGE_RE = re.compile(r"!\[([^\]]*)\]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)")
REFERENCE_RE = re.compile(r"\[(source|standard|depth|data|metric):([^\]\s]+)\]")
INLINE_CODE_RE = re.compile(r"`([^`]+)`")
TABLE_DELIMITER_CELL_RE = re.compile(r"^:?-{3,}:?$")


def parse_front_matter(text: str) -> tuple[dict[str, str], str]:
    if not text.startswith("---\n"):
        return {}, text
    end = text.find("\n---\n", 4)
    if end == -1:
        return {}, text
    raw = text[4:end]
    metadata: dict[str, str] = {}
    for line in raw.splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        metadata[key.strip()] = value.strip().strip('"').strip("'")
    return metadata, text[end + 5 :]


def normalize_image_src(submission_dir: Path, raw_src: str) -> str:
    if re.match(r"^(?:https?:)?//", raw_src, re.I) or re.match(r"^(?:data|file|javascript):", raw_src, re.I):
        raise ValueError(f"remote or unsafe image source is not allowed: {raw_src}")
    clean = raw_src.split("#", 1)[0].split("?", 1)[0]
    pure = PurePosixPath(clean)
    if pure.is_absolute() or ".." in pure.parts:
        raise ValueError(f"image source must be a relative local path: {raw_src}")
    image_path = submission_dir / pure.as_posix()
    if not image_path.exists():
        raise ValueError(f"image source is missing: {raw_src}")
    return "../" + pure.as_posix()


def render_inline(text: str) -> str:
    escaped = html.escape(text)
    escaped = INLINE_CODE_RE.sub(lambda m: f"<code>{html.escape(m.group(1))}</code>", escaped)

    def replace_ref(match: re.Match[str]) -> str:
        kind = match.group(1)
        value = match.group(2)
        return f'<span class="evidence evidence-{kind}">[{kind}:{html.escape(value)}]</span>'

    return REFERENCE_RE.sub(replace_ref, escaped)


def pipe_is_escaped(line: str, index: int) -> bool:
    backslashes = 0
    index -= 1
    while index >= 0 and line[index] == "\\":
        backslashes += 1
        index -= 1
    return backslashes % 2 == 1


def has_unescaped_pipe(line: str) -> bool:
    for index, char in enumerate(line):
        if char == "|" and not pipe_is_escaped(line, index):
            return True
    return False


def split_table_row(line: str) -> list[str]:
    text = line.strip()
    cells: list[str] = []
    cell: list[str] = []
    index = 0
    while index < len(text):
        char = text[index]
        if char == "|" and pipe_is_escaped(text, index):
            cell.pop()
            cell.append("|")
            index += 1
            continue
        if char == "|":
            cells.append("".join(cell).strip())
            cell = []
        else:
            cell.append(char)
        index += 1
    cells.append("".join(cell).strip())

    if text.startswith("|"):
        cells = cells[1:]
    if text.endswith("|") and not pipe_is_escaped(text, len(text) - 1):
        cells = cells[:-1]
    return cells


def parse_table_delimiter(line: str) -> list[str] | None:
    cells = split_table_row(line)
    if not cells or not all(TABLE_DELIMITER_CELL_RE.fullmatch(cell) for cell in cells):
        return None
    return cells


def table_alignment(delimiter: str) -> str | None:
    if delimiter.startswith(":") and delimiter.endswith(":"):
        return "center"
    if delimiter.endswith(":"):
        return "right"
    if delimiter.startswith(":"):
        return "left"
    return None


def render_table_cell(tag: str, value: str, alignment: str | None) -> str:
    alignment_class = f' class="align-{alignment}"' if alignment else ""
    return f"<{tag}{alignment_class}>{render_inline(value)}</{tag}>"


def render_markdown_body(submission_dir: Path, markdown: str) -> str:
    blocks: list[str] = []
    paragraph: list[str] = []
    in_list = False

    def flush_paragraph() -> None:
        nonlocal paragraph
        if paragraph:
            blocks.append(f"<p>{render_inline(' '.join(paragraph))}</p>")
            paragraph = []

    def close_list() -> None:
        nonlocal in_list
        if in_list:
            blocks.append("</ul>")
            in_list = False

    lines = markdown.splitlines()
    index = 0
    while index < len(lines):
        line = lines[index].rstrip()
        stripped_line = line.strip()

        if (
            index + 1 < len(lines)
            and stripped_line
            and not line.startswith("#")
            and not line.startswith("- ")
            and not IMAGE_RE.fullmatch(stripped_line)
            and (has_unescaped_pipe(line) or has_unescaped_pipe(lines[index + 1]))
        ):
            delimiter_cells = parse_table_delimiter(lines[index + 1].strip())
            header_cells = split_table_row(line)
            if delimiter_cells is not None and len(header_cells) == len(delimiter_cells):
                flush_paragraph()
                close_list()
                alignments = [table_alignment(cell) for cell in delimiter_cells]
                header = "".join(
                    render_table_cell("th", cell, alignment)
                    for cell, alignment in zip(header_cells, alignments)
                )
                index += 2
                body_rows: list[str] = []
                while index < len(lines):
                    row = lines[index].rstrip()
                    stripped = row.strip()
                    if (
                        not stripped
                        or not has_unescaped_pipe(row)
                        or stripped.startswith("#")
                        or stripped.startswith("- ")
                        or stripped.startswith("* ")
                        or stripped.startswith("+ ")
                        or stripped.startswith(">")
                        or stripped.startswith("```")
                        or stripped.startswith("~~~")
                        or re.match(r"^\d{1,9}[.)]\s+", stripped)
                        or IMAGE_RE.fullmatch(stripped)
                    ):
                        break
                    cells = split_table_row(row)
                    cells = (cells + [""] * len(header_cells))[: len(header_cells)]
                    body_rows.append(
                        "<tr>"
                        + "".join(
                            render_table_cell("td", cell, alignment)
                            for cell, alignment in zip(cells, alignments)
                        )
                        + "</tr>"
                    )
                    index += 1
                body = f"<tbody>{''.join(body_rows)}</tbody>" if body_rows else ""
                blocks.append(
                    '<div class="proposal-table"><table>'
                    f"<thead><tr>{header}</tr></thead>"
                    f"{body}"
                    "</table></div>"
                )
                continue

        if not line.strip():
            flush_paragraph()
            close_list()
            index += 1
            continue

        image_match = IMAGE_RE.fullmatch(line.strip())
        if image_match:
            flush_paragraph()
            close_list()
            alt = html.escape(image_match.group(1).strip() or "proposal figure")
            src = normalize_image_src(submission_dir, image_match.group(2).strip())
            blocks.append(
                '<figure class="proposal-figure">'
                f'<img src="{html.escape(src)}" alt="{alt}">'
                f"<figcaption>{alt}</figcaption>"
                "</figure>"
            )
            index += 1
            continue

        if line.startswith("#"):
            flush_paragraph()
            close_list()
            level = min(len(line) - len(line.lstrip("#")), 4)
            title = line[level:].strip()
            blocks.append(f"<h{level}>{render_inline(title)}</h{level}>")
            index += 1
            continue

        if line.startswith("- "):
            flush_paragraph()
            if not in_list:
                blocks.append("<ul>")
                in_list = True
            blocks.append(f"<li>{render_inline(line[2:].strip())}</li>")
            index += 1
            continue

        paragraph.append(line.strip())
        index += 1

    flush_paragraph()
    close_list()
    return "\n".join(blocks)


def render_html(
    submission_dir: Path,
    proposal_name: str = "proposal.md",
    translation_href: str | None = None,
) -> str:
    proposal_path = submission_dir / proposal_name
    metadata, body = parse_front_matter(proposal_path.read_text(encoding="utf-8"))
    title = metadata.get("title") or submission_dir.name
    summary = metadata.get("summary", "")
    language = metadata.get("language", "zh")
    document_lang = "en" if language == "en" else "zh-CN"
    translation_match = re.search(r"(?m)^# 中文正式译文\s*$", body) if language == "en" else None
    if translation_match:
        english_body = body[: translation_match.start()]
        translation_body = body[translation_match.end() :]
        rendered_body = (
            f'<section lang="en">{render_markdown_body(submission_dir, english_body)}</section>'
            f'<section lang="zh-CN"><h1>中文正式译文</h1>'
            f'{render_markdown_body(submission_dir, translation_body)}</section>'
        )
    else:
        rendered_body = render_markdown_body(submission_dir, body)
    translation_link = ""
    if translation_href:
        link_label = "Read in English" if language == "zh" else "阅读中文版本"
        translation_link = (
            '<p class="translation-link">'
            f'<a href="{html.escape(translation_href)}">{link_label}</a>'
            "</p>"
        )
    return f"""<!doctype html>
<html lang="{document_lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)} - proposal report</title>
<style>
:root {{
  --ink: #172033;
  --muted: #667085;
  --line: #d7dee8;
  --paper: #ffffff;
  --bg: #f4f7fa;
  --accent: #245b8f;
}}
* {{ box-sizing: border-box; }}
body {{
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif;
  color: var(--ink);
  background: var(--bg);
  line-height: 1.75;
}}
main {{
  max-width: 980px;
  margin: 0 auto;
  padding: 42px 24px 72px;
  background: var(--paper);
  min-height: 100vh;
  box-shadow: 0 0 0 1px rgba(23, 32, 51, 0.05);
}}
.hero {{
  border-bottom: 3px solid var(--accent);
  padding-bottom: 24px;
  margin-bottom: 30px;
}}
h1 {{ font-size: 34px; line-height: 1.22; margin: 0 0 10px; }}
h2 {{ font-size: 25px; margin: 34px 0 12px; border-top: 1px solid var(--line); padding-top: 24px; }}
h3 {{ font-size: 20px; margin: 26px 0 10px; }}
p, li {{ font-size: 16px; }}
code {{
  background: #eef2f7;
  color: #1d4f7a;
  padding: 0.1em 0.35em;
  border-radius: 4px;
}}
.summary {{ color: var(--muted); font-size: 17px; }}
.translation-link a {{ color: var(--accent); font-weight: 700; }}
.proposal-table {{ margin: 20px 0 26px; overflow-x: auto; }}
.proposal-table table {{
  border-collapse: collapse;
  width: 100%;
  min-width: 520px;
  font-size: 15px;
}}
.proposal-table th, .proposal-table td {{
  border: 1px solid var(--line);
  padding: 9px 12px;
  text-align: left;
  vertical-align: top;
  line-height: 1.6;
}}
.proposal-table th {{ background: #eef2f7; color: var(--ink); font-weight: 700; }}
.proposal-table tbody tr:nth-child(even) {{ background: #fafcfe; }}
.proposal-table .align-center {{ text-align: center; }}
.proposal-table .align-right {{ text-align: right; }}
.proposal-figure {{
  margin: 22px 0 28px;
  border: 1px solid var(--line);
  border-radius: 10px;
  overflow: hidden;
  background: #f8fafc;
}}
.proposal-figure img {{
  display: block;
  width: 100%;
  height: auto;
}}
.proposal-figure figcaption {{
  padding: 10px 14px;
  color: var(--muted);
  border-top: 1px solid var(--line);
  font-size: 14px;
}}
.evidence {{
  white-space: nowrap;
  border: 1px solid #cbd5e1;
  background: #f8fafc;
  color: #31506f;
  border-radius: 4px;
  padding: 0.03em 0.32em;
  font-size: 0.92em;
}}
@media (max-width: 720px) {{
  main {{ padding: 26px 16px 52px; }}
  h1 {{ font-size: 26px; }}
  h2 {{ font-size: 21px; }}
}}
</style>
</head>
<body>
<main>
<section class="hero">
<h1>{html.escape(title)}</h1>
<p class="summary">{html.escape(summary)}</p>
{translation_link}
</section>
{rendered_body}
</main>
</body>
</html>
"""


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("submission_dir")
    parser.add_argument("--out", default="report/proposal.html")
    args = parser.parse_args()

    submission_dir = Path(args.submission_dir).resolve()
    out_path = submission_dir / args.out
    if not (submission_dir / "proposal.md").exists():
        raise SystemExit(f"{submission_dir}/proposal.md is missing")
    primary_path = submission_dir / "proposal.md"
    metadata, _ = parse_front_matter(primary_path.read_text(encoding="utf-8"))
    translation_name = metadata.get("translation_file", "")
    translation_path = submission_dir / translation_name if translation_name else None
    translation_output = None
    if translation_path and translation_path.is_file() and translation_name in {"proposal.zh.md", "proposal.en.md"}:
        language = "zh" if translation_name == "proposal.zh.md" else "en"
        translation_output = submission_dir / f"report/proposal.{language}.html"

    primary_translation_href = None
    if translation_output:
        primary_translation_href = os.path.relpath(translation_output, out_path.parent)
    html_text = render_html(submission_dir, translation_href=primary_translation_href)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(html_text, encoding="utf-8")
    print(out_path)
    if translation_output and translation_path:
        translation_output.parent.mkdir(parents=True, exist_ok=True)
        primary_href = os.path.relpath(out_path, translation_output.parent)
        translation_output.write_text(
            render_html(submission_dir, translation_name, translation_href=primary_href),
            encoding="utf-8",
        )
        print(translation_output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
