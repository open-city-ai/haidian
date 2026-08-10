#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Local offline renderer: converts proposal.md -> report/proposal.html.
Minimal markdown support (headings, bold, links, images, blockquote, tables,
lists). The output is an offline reading version using local figure references.
This is a lightweight stand-in for the repo's render_proposal_html.py (which is
unavailable in this sandbox); the contributor should still run the repo script
before opening a PR for full validation.
"""
import os, re, html

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = os.path.join(ROOT, "proposal.md")
OUT = os.path.join(ROOT, "report", "proposal.html")
os.makedirs(os.path.dirname(OUT), exist_ok=True)

with open(SRC, encoding="utf-8") as f:
    lines = f.read().splitlines()

# strip front matter
if lines and lines[0].strip() == "---":
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            lines = lines[i + 1:]
            break

def inline(t):
    t = html.escape(t)
    t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)
    t = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2">\1</a>', t)
    t = re.sub(r"!\[([^\]]*)\]\(([^)]+)\)", r'<img alt="\1" src="\2" style="max-width:100%">', t)
    return t

out = ['<!DOCTYPE html>', '<html lang="zh-CN"><head><meta charset="utf-8">',
       '<meta name="viewport" content="width=device-width,initial-scale=1">',
       '<title>京张智脉 · JingZhang Synapse — 提案阅读版</title>',
       '<style>',
       'body{font-family:"Segoe UI",Arial,"Microsoft YaHei",sans-serif;max-width:960px;margin:0 auto;padding:32px 20px;color:#1a2733;line-height:1.65}',
       'h1{color:#1f3a5f;border-bottom:3px solid #e4572e;padding-bottom:8px}',
       'h2{color:#1f3a5f;margin-top:34px;border-left:5px solid #e4572e;padding-left:10px}',
       'h3{color:#2e8b57}img{max-width:100%;border:1px solid #dbe6f1;border-radius:8px;margin:10px 0}',
       'blockquote{background:#f0f4f9;border-left:4px solid #1f3a5f;margin:12px 0;padding:8px 14px;color:#445}',
       'table{border-collapse:collapse;width:100%;margin:12px 0;font-size:14px}',
       'th,td{border:1px solid #dbe6f1;padding:6px 9px;text-align:left}th{background:#eef3f9}',
       'code{background:#eef3f9;padding:1px 5px;border-radius:4px;font-size:13px}',
       'a{color:#1f3a5f}.note{background:#fff6ec;border:1px solid #f0c0a0;padding:10px 14px;border-radius:8px;font-size:13px;color:#9a4a1f}',
       '</style></head><body>']

i = 0
n = len(lines)
while i < n:
    ln = lines[i]
    if not ln.strip():
        i += 1
        continue
    if ln.startswith("# "):
        out.append(f"<h1>{inline(ln[2:])}</h1>")
    elif ln.startswith("## "):
        out.append(f"<h2>{inline(ln[3:])}</h2>")
    elif ln.startswith("### "):
        out.append(f"<h3>{inline(ln[4:])}</h3>")
    elif ln.startswith("> "):
        out.append(f"<blockquote>{inline(ln[2:])}</blockquote>")
    elif ln.startswith("!["):
        out.append(f"<p>{inline(ln)}</p>")
    elif ln.startswith("|"):
        # table block
        tbl = []
        while i < n and lines[i].startswith("|"):
            tbl.append(lines[i])
            i += 1
        # header + separator + rows
        headers = [c.strip() for c in tbl[0].strip().strip("|").split("|")]
        rows = []
        for r in tbl[2:]:
            rows.append([c.strip() for c in r.strip().strip("|").split("|")])
        out.append("<table><thead><tr>" + "".join(f"<th>{inline(h)}</th>" for h in headers) + "</tr></thead><tbody>")
        for r in rows:
            out.append("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>")
        out.append("</tbody></table>")
        continue
    elif re.match(r"^\s*[-*]\s+", ln):
        out.append("<ul><li>" + inline(re.sub(r"^\s*[-*]\s+", "", ln)) + "</li></ul>")
    else:
        out.append(f"<p>{inline(ln)}</p>")
    i += 1

out.append('<div class="note">离线阅读版：图片为本地引用（assets/figures/*.svg）。几何为临时粗略边界(provisional)，官方面积以公告文本为准。最终提交前请在本地运行仓库 render_proposal_html.py / finalize_submission.py / self_check_submission.py。</div>')
out.append("</body></html>")

with open(OUT, "w", encoding="utf-8") as f:
    f.write("\n".join(out))
print("WROTE", OUT, len(out), "lines")
