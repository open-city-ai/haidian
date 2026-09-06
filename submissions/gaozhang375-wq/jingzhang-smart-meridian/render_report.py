"""
Convert proposal.md to report/proposal.html (offline, self-contained)
"""
import re

md_path = 'C:/Users/Administrator/WorkBuddy/2026-08-08-15-17-25/submission/proposal.md'
html_path = 'C:/Users/Administrator/WorkBuddy/2026-08-08-15-17-25/submission/report/proposal.html'

with open(md_path, 'r', encoding='utf-8') as f:
    md = f.read()

# Simple Markdown to HTML conversion
def md_to_html(text):
    # Code blocks
    text = re.sub(r'```(\w*)\n(.*?)```', r'<pre><code>\2</code></pre>', text, flags=re.DOTALL)
    # Inline code
    text = re.sub(r'`([^`]+)`', r'<code>\1</code>', text)
    # Headers
    text = re.sub(r'^### (.+)$', r'<h3>\1</h3>', text, flags=re.MULTILINE)
    text = re.sub(r'^## (.+)$', r'<h2>\1</h2>', text, flags=re.MULTILINE)
    text = re.sub(r'^# (.+)$', r'<h1>\1</h1>', text, flags=re.MULTILINE)
    # Blockquotes
    text = re.sub(r'^> (.+)$', r'<blockquote>\1</blockquote>', text, flags=re.MULTILINE)
    # Bold and italic
    text = re.sub(r'\*\*\*(.+?)\*\*\*', r'<strong><em>\1</em></strong>', text)
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    text = re.sub(r'\*(.+?)\*', r'<em>\1</em>', text)
    # Horizontal rules
    text = re.sub(r'^---$', r'<hr>', text, flags=re.MULTILINE)
    # Images
    text = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', r'<figure><img src="../\2" alt="\1" loading="lazy"><figcaption>\1</figcaption></figure>', text)
    # Links
    text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', text)
    # Tables - convert markdown tables to HTML
    lines = text.split('\n')
    result = []
    in_table = False
    table_rows = []
    for line in lines:
        if '|' in line and line.strip().startswith('|'):
            if not in_table:
                in_table = True
                table_rows = []
            # Skip separator rows (|---|---|)
            if re.match(r'^\|[\s\-:|]+\|$', line.strip()):
                continue
            cells = [c.strip() for c in line.strip().split('|')[1:-1]]
            table_rows.append(cells)
        else:
            if in_table and table_rows:
                html = '<table>\n'
                for i, row in enumerate(table_rows):
                    tag = 'th' if i == 0 else 'td'
                    html += '<tr>' + ''.join(f'<{tag}>{c}</{tag}>' for c in row) + '</tr>\n'
                html += '</table>'
                result.append(html)
                table_rows = []
                in_table = False
            result.append(line)
    if in_table and table_rows:
        html = '<table>\n'
        for i, row in enumerate(table_rows):
            tag = 'th' if i == 0 else 'td'
            html += '<tr>' + ''.join(f'<{tag}>{c}</{tag}>' for c in row) + '</tr>\n'
        html += '</table>'
        result.append(html)
    text = '\n'.join(result)
    # Paragraphs - wrap non-HTML lines
    final = []
    for line in text.split('\n'):
        stripped = line.strip()
        if not stripped:
            final.append('')
        elif stripped.startswith('<'):
            final.append(line)
        else:
            final.append(f'<p>{stripped}</p>')
    return '\n'.join(final)

html_body = md_to_html(md)

# Full HTML document
html = f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>京张智脉 · AI经纬 — 城市设计方案</title>
<style>
* {{ margin: 0; padding: 0; box-sizing: border-box; }}
body {{
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Noto Sans SC', -apple-system, sans-serif;
  color: #1F2937; background: #FFFFFF; line-height: 1.8;
  max-width: 900px; margin: 0 auto; padding: 40px 20px;
}}
h1 {{ font-size: 28px; color: #1A56DB; margin: 24px 0 16px; padding-bottom: 8px; border-bottom: 2px solid #E5E7EB; }}
h2 {{ font-size: 22px; color: #374151; margin: 40px 0 16px; padding-bottom: 6px; border-bottom: 1px solid #E5E7EB; }}
h3 {{ font-size: 18px; color: #4B5563; margin: 24px 0 12px; }}
p {{ margin: 10px 0; }}
blockquote {{ border-left: 4px solid #1A56DB; padding: 12px 20px; margin: 16px 0; background: #F3F4F6; border-radius: 0 8px 8px 0; }}
blockquote p {{ margin: 4px 0; }}
code {{ background: #F3F4F6; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }}
pre {{ background: #1F2937; color: #F9FAFB; padding: 16px 20px; border-radius: 8px; overflow-x: auto; margin: 16px 0; }}
pre code {{ background: none; padding: 0; }}
table {{ width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px; }}
th {{ background: #F3F4F6; padding: 10px 14px; text-align: left; font-weight: 600; }}
td {{ padding: 10px 14px; border-bottom: 1px solid #E5E7EB; }}
figure {{ margin: 24px 0; text-align: center; }}
figure img {{ max-width: 100%; border-radius: 8px; border: 1px solid #E5E7EB; }}
figcaption {{ font-size: 13px; color: #9CA3AF; margin-top: 8px; }}
hr {{ border: none; border-top: 1px solid #E5E7EB; margin: 30px 0; }}
a {{ color: #1A56DB; }}
strong {{ color: #1F2937; }}
</style>
</head>
<body>
{html_body}
<footer style="margin-top:60px;padding-top:20px;border-top:1px solid #E5E7EB;text-align:center;color:#9CA3AF;font-size:13px;">
<p>WorkBuddy Urban Design Agent · 2026年8月8日</p>
<p>参与百年京张AI创新带城市设计开源征集</p>
</footer>
</body>
</html>'''

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html)

print(f'Created report/proposal.html ({len(html)} bytes)')
