#!/usr/bin/env python3
"""Render a submission proposal.md into an offline readable HTML report.

Supports GFM-style tables, ATX headings, ordered/unordered lists, code spans,
image figures, and machine-readable evidence references.
"""

from __future__ import annotations

import argparse
import html
import re
from pathlib import Path, PurePosixPath

try:
    import markdown as md_lib
except ImportError:  # pragma: no cover
    md_lib = None


IMAGE_RE = re.compile(r"!\[([^\]]*)\]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)")
REFERENCE_RE = re.compile(r"\[(source|standard|depth|data|metric):([^\]\s]+)\]")
INLINE_CODE_RE = re.compile(r"`([^`]+)`")
TABLE_ROW_RE = re.compile(r"^\|(.+)\|\s*$")
TABLE_SEPARATOR_RE = re.compile(r"^\|?[\s:]*-{3,}[\s:|-]*\|?\s*$")


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
    """Render inline markdown: escape HTML, restore code spans and evidence refs."""
    escaped = html.escape(text)
    # Restore inline code (escaped backticks become part of text, handle before escaping issues)
    # Since html.escape doesn't touch backticks, INLINE_CODE_RE still works on escaped text.
    escaped = INLINE_CODE_RE.sub(lambda m: f"<code>{html.escape(m.group(1))}</code>", escaped)

    def replace_ref(match: re.Match[str]) -> str:
        kind = match.group(1)
        value = match.group(2)
        return f'<span class="evidence evidence-{kind}">[{kind}:{html.escape(value)}]</span>'

    return REFERENCE_RE.sub(replace_ref, escaped)


HTML_COMMENT_RE = re.compile(r"<!--.*?-->", re.DOTALL)


def strip_html_comments(text: str) -> str:
    """Remove HTML comment blocks from a string."""
    return HTML_COMMENT_RE.sub("", text).strip()


def render_table(rows: list[str]) -> str:
    """Render a GFM table block to HTML."""
    lines: list[str] = []
    parsed_rows: list[list[str]] = []
    for row in rows:
        m = TABLE_ROW_RE.match(row)
        if m:
            cells = [c.strip() for c in m.group(1).split("|")]
            parsed_rows.append(cells)
    if len(parsed_rows) < 2:
        return "\n".join(f"<p>{render_inline(r)}</p>" for r in rows)

    header = parsed_rows[0]
    body_rows = parsed_rows[2:]  # skip separator row at index 1

    lines.append('<table class="proposal-table">')
    lines.append("<thead><tr>")
    for cell in header:
        clean = strip_html_comments(cell)
        lines.append(f"<th>{render_inline(clean)}</th>")
    lines.append("</tr></thead>")
    lines.append("<tbody>")
    for row in body_rows:
        lines.append("<tr>")
        for cell in row:
            clean = strip_html_comments(cell)
            lines.append(f"<td>{render_inline(clean)}</td>")
        lines.append("</tr>")
    lines.append("</tbody></table>")
    return "\n".join(lines)


def render_markdown_body(submission_dir: Path, markdown: str) -> str:
    blocks: list[str] = []
    paragraph: list[str] = []
    ol_counter = 0
    ul_open = False
    ol_open = False
    table_lines: list[str] = []

    def flush_paragraph() -> None:
        nonlocal paragraph
        if paragraph:
            blocks.append(f"<p>{render_inline(' '.join(paragraph))}</p>")
            paragraph = []

    def close_list() -> None:
        nonlocal ul_open, ol_open, ol_counter
        if ul_open:
            blocks.append("</ul>")
            ul_open = False
        if ol_open:
            blocks.append("</ol>")
            ol_open = False
            ol_counter = 0

    def flush_table() -> None:
        nonlocal table_lines
        if table_lines:
            blocks.append(render_table(table_lines))
            table_lines = []

    for raw_line in markdown.splitlines():
        line = raw_line.rstrip()

        # Skip HTML comment lines (machine-readable evidence tokens hidden from readers)
        if line.strip().startswith("<!--") and line.strip().endswith("-->"):
            continue

        # Table detection: a line starting with | and the next line is a separator
        if TABLE_ROW_RE.match(line):
            flush_paragraph()
            close_list()
            table_lines.append(line)
            continue
        if table_lines:
            # If we were collecting table lines and this line is a separator or another table row, keep collecting
            if TABLE_SEPARATOR_RE.match(line) or TABLE_ROW_RE.match(line):
                table_lines.append(line)
                continue
            # Otherwise flush the table
            flush_table()

        if not line.strip():
            flush_paragraph()
            close_list()
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
            continue

        if line.startswith("#"):
            flush_paragraph()
            close_list()
            level = min(len(line) - len(line.lstrip("#")), 4)
            title = line[level:].strip()
            blocks.append(f"<h{level}>{render_inline(title)}</h{level}>")
            continue

        # Ordered list: "1. text"
        ol_match = re.match(r"^(\d+)\.\s+(.*)", line)
        if ol_match:
            flush_paragraph()
            if ul_open:
                blocks.append("</ul>")
                ul_open = False
            if not ol_open:
                blocks.append("<ol>")
                ol_open = True
                ol_counter = 0
            ol_counter += 1
            blocks.append(f"<li>{render_inline(ol_match.group(2).strip())}</li>")
            continue

        if line.startswith("- "):
            flush_paragraph()
            if ol_open:
                blocks.append("</ol>")
                ol_open = False
                ol_counter = 0
            if not ul_open:
                blocks.append("<ul>")
                ul_open = True
            blocks.append(f"<li>{render_inline(line[2:].strip())}</li>")
            continue

        paragraph.append(line.strip())

    flush_paragraph()
    close_list()
    flush_table()
    return "\n".join(blocks)


def render_html(submission_dir: Path) -> str:
    proposal_path = submission_dir / "proposal.md"
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
h4 {{ font-size: 17px; margin: 22px 0 8px; }}
p, li {{ font-size: 16px; }}
ul, ol {{ padding-left: 1.6em; }}
code {{
  background: #eef2f7;
  color: #1d4f7a;
  padding: 0.1em 0.35em;
  border-radius: 4px;
}}
.summary {{ color: var(--muted); font-size: 17px; }}
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
.proposal-table {{
  width: 100%;
  border-collapse: collapse;
  margin: 18px 0 26px;
  font-size: 15px;
  box-shadow: 0 1px 0 var(--line);
  border-radius: 8px;
  overflow: hidden;
}}
.proposal-table thead {{
  background: #eef3f9;
}}
.proposal-table th, .proposal-table td {{
  border: 1px solid var(--line);
  padding: 9px 13px;
  text-align: left;
  vertical-align: top;
}}
.proposal-table th {{
  font-weight: 600;
  color: var(--ink);
  white-space: nowrap;
}}
.proposal-table tbody tr:nth-child(even) {{
  background: #fafcfe;
}}
.proposal-table td code, .proposal-table th code {{
  white-space: nowrap;
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
  .proposal-table {{ font-size: 14px; }}
  .proposal-table th, .proposal-table td {{ padding: 7px 9px; }}
}}
</style>
</head>
<body>
<main>
<section class="hero">
<h1>{html.escape(title)}</h1>
<p class="summary">{html.escape(summary)}</p>
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
    html_text = render_html(submission_dir)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(html_text, encoding="utf-8")
    print(out_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
