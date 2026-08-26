#!/usr/bin/env python3
"""Render a submission proposal.md into an offline readable HTML report.

This script converts ``proposal.md`` (and its bilingual counterpart when
present) into self-contained offline HTML at ``report/proposal.html``.  The
output must not load any remote resources; all figures are embedded as
``../assets/figures/`` relative paths.

When the proposal declares a ``translation_file`` in its front matter, the
corresponding HTML translation is written alongside the primary report and each
file links to the other with a language-switch anchor.

Evidence markers (``[source:...]``, ``[standard:...]``, ``[depth:...]``,
``[data:...]``, ``[metric:...]``) are rendered as quiet ``<sup>`` labels so
reviewers can trace claims without the markers obscuring prose.

Usage
-----
Run from the repository root or any directory with the path to the proposal::

    python3 scripts/render_proposal_html.py submissions/<login>/<slug>

The output path defaults to ``report/proposal.html`` inside the submission
directory.  Override with ``--out``::

    python3 scripts/render_proposal_html.py submissions/<login>/<slug> \\
        --out report/proposal-preview.html

The script exits 0 on success and 1 when ``proposal.md`` is missing.

Supported Markdown features
----------------------------
- ATX headings (``#`` through ``####``)
- Paragraphs
- Unordered lists (``- item``)
- Fenced code blocks (triple backtick or tilde)
- Inline code, bold, italic, bold-italic
- GitHub-flavored tables (``| col | col |`` with column alignment)
- Block quotes
- Inline images with local paths (remote ``http://`` sources are rejected)
- Evidence markers rendered as ``<sup class="evidence">`` labels
"""

from __future__ import annotations

import argparse
import html
import os
import re
import stat
import tempfile
from pathlib import Path, PurePosixPath
from urllib.parse import unquote_to_bytes


IMAGE_RE = re.compile(r"!\[([^\]]*)\]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)")
REFERENCE_RE = re.compile(r"\[(source|standard|depth|data|metric):([^\]\s]+)\]")
INLINE_CODE_RE = re.compile(r"`([^`]+)`")
STRONG_EM_RE = re.compile(r"(?<![\\*])\*\*\*(?=\S)(.+?)(?<=\S)\*\*\*(?!\*)", re.S)
STRONG_RE = re.compile(r"(?<![\\*])\*\*(?=\S)(.+?)(?<=\S)\*\*(?!\*)", re.S)
EM_RE = re.compile(r"(?<![\\*])\*(?=\S)(.+?)(?<=\S)\*(?!\*)", re.S)
TABLE_DELIMITER_CELL_RE = re.compile(r"^:?-{3,}:?$")
REFERENCE_LABELS = {
    "zh": {
        "source": "来源",
        "standard": "标准",
        "depth": "深度",
        "data": "空间数据",
        "metric": "指标",
    },
    "en": {
        "source": "Source",
        "standard": "Standard",
        "depth": "Depth",
        "data": "Spatial data",
        "metric": "Metric",
    },
}


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


def _is_unsafe_url_path_segment(segment: str) -> bool:
    """Return true when URL parsing could reinterpret a filesystem segment."""
    decoded = unquote_to_bytes(segment)
    return (
        decoded in {b".", b".."}
        or b"/" in decoded
        or b"\\" in decoded
        or re.match(rb"^[A-Za-z]:", decoded) is not None
    )


def resolve_local_image(submission_dir: Path, raw_src: str) -> tuple[Path, Path]:
    """Resolve *raw_src* and prove that its target stays in the submission."""
    if re.match(r"^(?:https?:)?//", raw_src, re.I) or re.match(r"^(?:data|file|javascript):", raw_src, re.I):
        raise ValueError(f"remote or unsafe image source is not allowed: {raw_src}")
    clean = raw_src.split("#", 1)[0].split("?", 1)[0]
    pure = PurePosixPath(clean)
    if (
        not clean
        or "\\" in clean
        or pure.is_absolute()
        or not pure.parts
        or ".." in pure.parts
        or any(re.match(r"^[A-Za-z]:", part) for part in pure.parts)
        or any(_is_unsafe_url_path_segment(part) for part in pure.parts)
    ):
        raise ValueError(f"image source must be a relative local path: {raw_src}")
    submission_root = submission_dir.resolve()
    image_path = submission_root.joinpath(*pure.parts).resolve()
    try:
        relative = image_path.relative_to(submission_root)
    except ValueError as exc:
        raise ValueError(
            f"image source must stay within the submission directory: {raw_src}"
        ) from exc
    if not image_path.exists():
        raise ValueError(f"image source is missing: {raw_src}")
    return image_path, relative


def normalize_image_src(submission_dir: Path, raw_src: str) -> str:
    """Resolve *raw_src* to a safe report-relative local path.

    Raises:
        ValueError: If *raw_src* is remote, unsafe, outside the submission, or
            if the target file does not exist.
    """
    _, relative = resolve_local_image(submission_dir, raw_src)
    return "../" + relative.as_posix()


def contained_output_path(submission_dir: Path, raw_path: str) -> Path:
    if "\\" in raw_path:
        raise ValueError(f"output must be a relative path inside the submission: {raw_path}")
    pure = PurePosixPath(raw_path)
    if (
        not raw_path
        or pure.is_absolute()
        or not pure.parts
        or ".." in pure.parts
        or pure.as_posix() != raw_path
        or pure.suffix.lower() != ".html"
    ):
        raise ValueError(f"output must be a relative path inside the submission: {raw_path}")
    path = submission_dir.joinpath(*pure.parts)
    current = submission_dir
    for part in pure.parts:
        current /= part
        if current.is_symlink():
            raise ValueError(f"output path must not use symbolic links: {raw_path}")
    if not path.resolve().is_relative_to(submission_dir):
        raise ValueError(f"output must stay inside the submission: {raw_path}")
    return path


def render_inputs(submission_dir: Path, proposal_paths: list[Path]) -> list[Path]:
    inputs = list(proposal_paths)
    for proposal_path in proposal_paths:
        text = proposal_path.read_text(encoding="utf-8")
        for match in IMAGE_RE.finditer(text):
            raw_src = match.group(2).strip()
            try:
                candidate, _ = resolve_local_image(submission_dir, raw_src)
            except ValueError:
                continue
            if candidate.is_file():
                inputs.append(candidate)
    return inputs


def aliases_path(path: Path, other: Path) -> bool:
    return path.resolve() == other.resolve() or (
        path.exists() and other.exists() and path.samefile(other)
    )


def write_text_atomically(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    mode = stat.S_IMODE(path.stat().st_mode) if path.exists() else 0o644
    temporary: str | None = None
    try:
        with tempfile.NamedTemporaryFile(
            dir=path.parent,
            prefix=f".{path.name}-",
            suffix=".tmp",
            delete=False,
            mode="w",
            encoding="utf-8",
            newline="\n",
        ) as handle:
            temporary = handle.name
            handle.write(text)
            handle.flush()
            os.fsync(handle.fileno())
        os.chmod(temporary, mode)
        os.replace(temporary, path)
    except OSError:
        if temporary:
            Path(temporary).unlink(missing_ok=True)
        raise


def render_inline(text: str, language: str = "zh") -> str:
    escaped = html.escape(text)
    code_spans: list[str] = []

    def protect_code(match: re.Match[str]) -> str:
        token = f"\x00CODE{len(code_spans)}\x00"
        code_spans.append(f"<code>{match.group(1)}</code>")
        return token

    escaped = INLINE_CODE_RE.sub(protect_code, escaped)
    escaped = STRONG_EM_RE.sub(r"<strong><em>\1</em></strong>", escaped)
    escaped = STRONG_RE.sub(r"<strong>\1</strong>", escaped)
    escaped = EM_RE.sub(r"<em>\1</em>", escaped)

    def replace_ref(match: re.Match[str]) -> str:
        kind = match.group(1)
        value = match.group(2)
        reference_language = "en" if language == "en" else "zh"
        label = REFERENCE_LABELS[reference_language][kind]
        separator = ": " if reference_language == "en" else "："
        escaped_value = html.escape(value)
        return (
            f'<sup class="evidence evidence-{kind}" data-evidence-kind="{kind}" '
            f'data-evidence-value="{escaped_value}" title="{label}{separator}{escaped_value}">'
            f'{label}</sup>'
        )

    escaped = REFERENCE_RE.sub(replace_ref, escaped)
    for index, code in enumerate(code_spans):
        escaped = escaped.replace(f"\x00CODE{index}\x00", code)
    return escaped.replace(r"\*", "*")


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


def render_table_cell(tag: str, value: str, alignment: str | None, language: str) -> str:
    alignment_class = f' class="align-{alignment}"' if alignment else ""
    return f"<{tag}{alignment_class}>{render_inline(value, language)}</{tag}>"


def render_markdown_body(submission_dir: Path, markdown: str, language: str = "zh") -> str:
    blocks: list[str] = []
    paragraph: list[str] = []
    in_list = False

    def flush_paragraph() -> None:
        nonlocal paragraph
        if paragraph:
            blocks.append(f"<p>{render_inline(' '.join(paragraph), language)}</p>")
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

        if stripped_line.startswith("```") or stripped_line.startswith("~~~"):
            flush_paragraph()
            close_list()
            fence_char = stripped_line[0]
            fence_length = len(stripped_line) - len(stripped_line.lstrip(fence_char))
            code_lines: list[str] = []
            index += 1
            while index < len(lines):
                candidate = lines[index].rstrip()
                candidate_stripped = candidate.strip()
                closing_length = len(candidate_stripped) - len(
                    candidate_stripped.lstrip(fence_char)
                )
                if (
                    closing_length >= fence_length
                    and not candidate_stripped[closing_length:]
                ):
                    index += 1
                    break
                code_lines.append(candidate)
                index += 1
            blocks.append(f"<pre><code>{html.escape(chr(10).join(code_lines))}</code></pre>")
            continue

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
                    render_table_cell("th", cell, alignment, language)
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
                            render_table_cell("td", cell, alignment, language)
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

        if stripped_line.startswith(">"):
            flush_paragraph()
            close_list()
            quote_paragraphs: list[list[str]] = [[]]
            while index < len(lines):
                quote_line = lines[index].strip()
                if not quote_line.startswith(">"):
                    break
                quote_text = quote_line[1:].lstrip()
                if quote_text:
                    quote_paragraphs[-1].append(quote_text)
                elif quote_paragraphs[-1]:
                    quote_paragraphs.append([])
                index += 1
            rendered_quotes = "".join(
                f"<p>{render_inline(' '.join(items), language)}</p>"
                for items in quote_paragraphs
                if items
            )
            blocks.append(f"<blockquote>{rendered_quotes}</blockquote>")
            continue

        if line.startswith("#"):
            flush_paragraph()
            close_list()
            level = min(len(line) - len(line.lstrip("#")), 4)
            title = line[level:].strip()
            blocks.append(f"<h{level}>{render_inline(title, language)}</h{level}>")
            index += 1
            continue

        if line.startswith("- "):
            flush_paragraph()
            if not in_list:
                blocks.append("<ul>")
                in_list = True
            blocks.append(f"<li>{render_inline(line[2:].strip(), language)}</li>")
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
            f'<section lang="en">{render_markdown_body(submission_dir, english_body, "en")}</section>'
            f'<section lang="zh-CN"><h1>中文正式译文</h1>'
            f'{render_markdown_body(submission_dir, translation_body, "zh")}</section>'
        )
    else:
        rendered_body = render_markdown_body(submission_dir, body, language)
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
blockquote {{
  margin: 18px 0;
  padding: 12px 18px;
  border-left: 4px solid var(--line);
  color: var(--muted);
  background: #f8fafc;
}}
code {{
  background: #eef2f7;
  color: #1d4f7a;
  padding: 0.1em 0.35em;
  border-radius: 4px;
}}
:not(pre) > code {{
  display: inline-block;
  max-width: 100%;
  overflow-wrap: anywhere;
  word-break: break-word;
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
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  margin: 0 0.12em;
  border-bottom: 1px solid #8aa8c3;
  color: #315f87;
  font-size: 0.68em;
  font-weight: 650;
  line-height: 1.35;
  vertical-align: super;
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
    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "submission_dir",
        help="Path to the proposal directory, e.g. submissions/<login>/<slug>",
    )
    parser.add_argument(
        "--out",
        default="report/proposal.html",
        help="Output path relative to submission_dir (default: report/proposal.html)",
    )
    args = parser.parse_args()

    submission_dir = Path(args.submission_dir).resolve()
    try:
        out_path = contained_output_path(submission_dir, args.out)
    except ValueError as exc:
        parser.error(str(exc))
    if not (submission_dir / "proposal.md").exists():
        raise SystemExit(f"{submission_dir}/proposal.md is missing")
    primary_path = submission_dir / "proposal.md"
    if primary_path.is_symlink():
        parser.error(f"proposal input must not be a symbolic link: {primary_path}")
    metadata, _ = parse_front_matter(primary_path.read_text(encoding="utf-8"))
    translation_name = metadata.get("translation_file", "")
    translation_path = submission_dir / translation_name if translation_name else None
    translation_output = None
    if (
        translation_path
        and translation_name in {"proposal.zh.md", "proposal.en.md"}
        and translation_path.is_file()
    ):
        if translation_path.is_symlink():
            parser.error(f"proposal input must not be a symbolic link: {translation_path}")
        language = "zh" if translation_name == "proposal.zh.md" else "en"
        try:
            translation_output = contained_output_path(
                submission_dir, f"report/proposal.{language}.html"
            )
        except ValueError as exc:
            parser.error(str(exc))

    inputs = render_inputs(
        submission_dir,
        [primary_path, *([translation_path] if translation_output and translation_path else [])],
    )
    for output in [out_path, *([translation_output] if translation_output else [])]:
        for input_path in inputs:
            if aliases_path(output, input_path):
                parser.error(f"output must not overwrite a rendering input: {input_path}")
    if translation_output and aliases_path(out_path, translation_output):
        parser.error("primary and translated reports must use distinct output paths")

    primary_translation_href = None
    if translation_output:
        primary_translation_href = Path(
            os.path.relpath(translation_output, out_path.parent)
        ).as_posix()
    html_text = render_html(submission_dir, translation_href=primary_translation_href)
    translated_html = None
    if translation_output and translation_path:
        primary_href = Path(os.path.relpath(out_path, translation_output.parent)).as_posix()
        translated_html = render_html(
            submission_dir,
            translation_name,
            translation_href=primary_href,
        )
    write_text_atomically(out_path, html_text)
    print(out_path)
    if translation_output and translated_html is not None:
        write_text_atomically(
            translation_output,
            translated_html,
        )
        print(translation_output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
