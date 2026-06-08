#!/usr/bin/env python3
"""Render a submission proposal.md into an offline readable HTML report."""

from __future__ import annotations

import argparse
import html
import re
from pathlib import Path, PurePosixPath


IMAGE_RE = re.compile(r"!\[([^\]]*)\]\(([^)\s]+)(?:\s+\"[^\"]*\")?\)")
REFERENCE_RE = re.compile(r"\[(source|standard|depth|data|metric):([^\]\s]+)\]")
INLINE_CODE_RE = re.compile(r"`([^`]+)`")


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

    for raw_line in markdown.splitlines():
        line = raw_line.rstrip()
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

        if line.startswith("- "):
            flush_paragraph()
            if not in_list:
                blocks.append("<ul>")
                in_list = True
            blocks.append(f"<li>{render_inline(line[2:].strip())}</li>")
            continue

        paragraph.append(line.strip())

    flush_paragraph()
    close_list()
    return "\n".join(blocks)


def render_html(submission_dir: Path) -> str:
    proposal_path = submission_dir / "proposal.md"
    metadata, body = parse_front_matter(proposal_path.read_text(encoding="utf-8"))
    title = metadata.get("title") or submission_dir.name
    summary = metadata.get("summary", "")
    rendered_body = render_markdown_body(submission_dir, body)
    return f"""<!doctype html>
<html lang="zh-CN">
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
