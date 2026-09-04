#!/usr/bin/env node
/* Build both review PDFs in both languages from the v4.0 Markdown and figures.
 * The PDFs are review artifacts only: they do not claim an approved boundary,
 * authorised road, operating result or professional acceptance. */
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const packageRoot = path.resolve(__dirname, '../..');
const python = String.raw`
from __future__ import annotations

import hashlib
import html
import io
import json
import re
import sys
from pathlib import Path

from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A0, A3, landscape
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import (
    Image, KeepTogether, PageBreak, Paragraph, SimpleDocTemplate,
    Spacer, Table, TableStyle,
)

ROOT = Path(sys.argv[1]).resolve()
CHECK_ONLY = '--check' in sys.argv[2:]
DRAWINGS = ROOT / 'drawings'
FIGURES = ROOT / 'assets' / 'figures'
EVIDENCE = ROOT / 'visual' / 'assets' / 'autonomy-pdf-bundle-v40.json'
BOUNDARY = 'concept / provisional / not authorised / not run / not a score'
FONT_PATHS = (
    Path('/Library/Fonts/Arial Unicode.ttf'),
    Path('/System/Library/Fonts/Supplemental/Arial Unicode.ttf'),
)
FIGURE_ORDER = (
    'site-overview', 'culture-honor-system', 'resource-decision-board',
    'regional-ecosystem', 'autonomy-node-interface', 'key-areas',
    'mobility-bluegreen', 'component-operations', 'metrics-evidence',
    'autonomy-readiness', 'land-use-structure', 'identity-system',
)


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def register_fonts() -> None:
    font_path = next((item for item in FONT_PATHS if item.is_file()), None)
    if font_path is None:
        raise RuntimeError('Arial Unicode font is required')
    if 'AutonomyUnicode' not in pdfmetrics.getRegisteredFontNames():
        pdfmetrics.registerFont(TTFont('AutonomyUnicode', str(font_path)))


def font(language: str, bold: bool = False) -> str:
    if language == 'zh':
        return 'AutonomyUnicode'
    return 'Helvetica-Bold' if bold else 'Helvetica'


def proposal(language: str) -> Path:
    return ROOT / ('proposal.en.md' if language == 'en' else 'proposal.md')


def figure_path(stem: str, language: str) -> Path:
    localized = FIGURES / f'{stem}.en.png'
    primary = FIGURES / f'{stem}.png'
    return localized if language == 'en' and localized.is_file() else primary


def markdown_body(value: str) -> str:
    if value.startswith('---\n'):
        parts = value.split('\n---\n', 1)
        if len(parts) == 2:
            return parts[1]
    return value


def plain(value: str) -> str:
    value = re.sub(r'!\[([^]]*)\]\([^)]+\)', r'\1', value)
    value = re.sub(r'\[([^]]+)\]\([^)]+\)', r'\1', value)
    value = value.replace('**', '').replace('__', '').replace(chr(96), '')
    return value.strip()


def events(markdown: str):
    lines = markdown_body(markdown).splitlines()
    index = 0
    in_fence = False
    while index < len(lines):
        raw = lines[index].rstrip()
        stripped = raw.strip()
        if stripped.startswith(chr(96) * 3):
            in_fence = not in_fence
            index += 1
            continue
        if in_fence or not stripped or stripped == '---':
            index += 1
            continue
        image_match = re.fullmatch(r'!\[([^]]*)\]\(([^)]+)\)', stripped)
        if image_match:
            yield ('image', (image_match.group(1), image_match.group(2)))
            index += 1
            continue
        heading = re.match(r'^(#{1,4})\s+(.+)$', stripped)
        if heading:
            yield (f'h{len(heading.group(1))}', plain(heading.group(2)))
            index += 1
            continue
        if stripped.startswith('|') and stripped.endswith('|'):
            table_lines = []
            while index < len(lines):
                candidate = lines[index].strip()
                if not (candidate.startswith('|') and candidate.endswith('|')):
                    break
                table_lines.append(candidate)
                index += 1
            rows = [[plain(cell) for cell in row.strip('|').split('|')]
                    for row in table_lines]
            if len(rows) > 1 and all(re.fullmatch(r':?-{3,}:?', cell) for cell in rows[1]):
                rows.pop(1)
            yield ('table', rows)
            continue
        if stripped.startswith('>'):
            yield ('quote', plain(stripped.lstrip('>').strip()))
        elif re.match(r'^(?:[-*]|\d+\.)\s+', stripped):
            yield ('bullet', plain(re.sub(r'^(?:[-*]|\d+\.)\s+', '', stripped)))
        else:
            yield ('body', plain(stripped))
        index += 1


def styles(language: str):
    base = getSampleStyleSheet()
    family = font(language)
    bold = font(language, True)
    result = {
        'title': ParagraphStyle('TitleV40', parent=base['Title'], fontName=bold,
                                fontSize=25, leading=32, textColor=colors.HexColor('#173552'), spaceAfter=12),
        'h2': ParagraphStyle('H2V40', parent=base['Heading2'], fontName=bold,
                             fontSize=16, leading=22, textColor=colors.HexColor('#173552'), spaceBefore=10, spaceAfter=6),
        'h3': ParagraphStyle('H3V40', parent=base['Heading3'], fontName=bold,
                             fontSize=12.5, leading=17, textColor=colors.HexColor('#168C82'), spaceBefore=7, spaceAfter=4),
        'body': ParagraphStyle('BodyV40', parent=base['BodyText'], fontName=family,
                               fontSize=8.3, leading=12.2, textColor=colors.HexColor('#284867'), spaceAfter=4),
        'quote': ParagraphStyle('QuoteV40', parent=base['BodyText'], fontName=bold,
                                fontSize=10.5, leading=16, textColor=colors.HexColor('#173552'),
                                backColor=colors.HexColor('#EAF2FB'), borderPadding=9, spaceAfter=8),
        'caption': ParagraphStyle('CaptionV40', parent=base['BodyText'], fontName=family,
                                  fontSize=7.2, leading=10, textColor=colors.HexColor('#627F9C'), spaceAfter=6),
        'cell': ParagraphStyle('CellV40', parent=base['BodyText'], fontName=family,
                               fontSize=6.2, leading=8.4, textColor=colors.HexColor('#284867')),
    }
    return result


def scaled_image(path: Path, max_width: float, max_height: float) -> Image:
    item = Image(str(path))
    scale = min(max_width / item.imageWidth, max_height / item.imageHeight, 1)
    item.drawWidth = item.imageWidth * scale
    item.drawHeight = item.imageHeight * scale
    return item


def page_frame(document: canvas.Canvas, doc, language: str) -> None:
    document.saveState()
    document.setTitle('Autonomy Commons v4.0 review booklet')
    document.setAuthor('147228')
    document.setSubject(BOUNDARY)
    document.setFont(font(language), 7)
    document.setFillColor(colors.HexColor('#627F9C'))
    document.drawString(18 * mm, 10 * mm, 'AUTONOMY COMMONS · v4.0')
    document.drawRightString(A3[0] - 18 * mm, 10 * mm, f'{BOUNDARY} · {doc.page}')
    document.restoreState()


def canvas_factory(*args, **kwargs):
    kwargs['invariant'] = 1
    kwargs['pageCompression'] = 1
    return canvas.Canvas(*args, **kwargs)


def build_a3(language: str, output: Path) -> None:
    style = styles(language)
    title = '智行京张：自动驾驶普及后的公共带' if language == 'zh' else 'Jing-Zhang Autonomy Commons: A Public Belt for the Autonomous-Mobility Era'
    boundary = '评审交付 v4.0 · 概念 / 临时约束 / 未授权 / 未运行 / 不是评分' if language == 'zh' else 'Review delivery v4.0 · concept / provisional / unauthorised / not run / not a score'
    story = [Paragraph(html.escape(title), style['title']), Paragraph(html.escape(boundary), style['quote'])]
    cover = figure_path('site-overview', language)
    if language == 'zh':
        receipt_title = 'P0 完整路线回执：任一环断裂即失败'
        receipt_chain = '入口 → 普通路线 → 状态 / 同意 → 受限服务 → 人工接管 → 返程 → 申诉'
        cells = [('01 普通路线', '试验失败也能走完'), ('02 人工接管', '责任明确、现场可恢复'), ('03 返程与申诉', '回执可读、异议可重开')]
        receipt_note = '无批准边界 · 无现场数据 · 无绩效结果；平均分不得抵消一条断裂的普通路线。'
    else:
        receipt_title = 'P0 COMPLETE-ROUTE RECEIPT: ONE BROKEN LINK FAILS THE TRIAL'
        receipt_chain = 'entry → ordinary route → status / consent → bounded service → human takeover → return → redress'
        cells = [('01 ORDINARY ROUTE', 'complete even if the trial fails'), ('02 HUMAN TAKEOVER', 'named and staffed recovery'), ('03 RETURN + REDRESS', 'readable receipt; reopen')]
        receipt_note = 'No approved boundary · no field data · no performance result; an average score cannot cancel a broken route.'
    cell_story = [[Paragraph(f'<b>{html.escape(name)}</b><br/>{html.escape(note)}', style['body']) for name, note in cells]]
    cover_table = Table(cell_story, colWidths=[85 * mm] * 3, hAlign='LEFT')
    cover_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#EAF2FB')),
        ('BOX', (0, 0), (-1, -1), 0.8, colors.HexColor('#79A6D2')),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#B9CCDE')),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8), ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8), ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.extend([
        scaled_image(cover, 255 * mm, 175 * mm), Spacer(1, 4 * mm),
        Paragraph(html.escape(receipt_title), style['h2']),
        Paragraph(html.escape(receipt_chain), style['quote']), cover_table, Spacer(1, 3 * mm),
        Paragraph(html.escape(receipt_note), style['caption']), PageBreak(),
    ])
    skipped_title = False
    for kind, value in events(proposal(language).read_text(encoding='utf-8')):
        if kind == 'h1' and not skipped_title:
            skipped_title = True
            continue
        if kind == 'image':
            label, relative = value
            source = ROOT / relative
            if language == 'en' and not source.is_file():
                source = figure_path(Path(relative).stem.replace('.en', ''), language)
            if source.is_file() and source.resolve() != cover.resolve():
                story.append(KeepTogether([
                    Spacer(1, 3 * mm),
                    scaled_image(source, 255 * mm, 165 * mm),
                    Paragraph(html.escape(label), style['caption']),
                ]))
            continue
        if kind == 'table':
            rows = value
            if not rows:
                continue
            columns = max(len(row) for row in rows)
            normalized = [row + [''] * (columns - len(row)) for row in rows]
            content = [[Paragraph(html.escape(cell), style['cell']) for cell in row] for row in normalized]
            table = Table(content, colWidths=[255 * mm / columns] * columns, repeatRows=1, hAlign='LEFT')
            table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#173B5D')),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
                ('GRID', (0, 0), (-1, -1), 0.35, colors.HexColor('#B9CCDE')),
                ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                ('LEFTPADDING', (0, 0), (-1, -1), 4),
                ('RIGHTPADDING', (0, 0), (-1, -1), 4),
                ('TOPPADDING', (0, 0), (-1, -1), 4),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
            ]))
            story.extend([table, Spacer(1, 4 * mm)])
            continue
        paragraph_style = style['h2'] if kind in ('h1', 'h2') else style['h3'] if kind in ('h3', 'h4') else style['quote'] if kind == 'quote' else style['body']
        if kind == 'bullet':
            story.append(Paragraph(html.escape(value), paragraph_style, bulletText='•'))
        else:
            story.append(Paragraph(html.escape(value), paragraph_style))
    document = SimpleDocTemplate(str(output), pagesize=A3, leftMargin=18 * mm, rightMargin=18 * mm,
                                 topMargin=18 * mm, bottomMargin=18 * mm,
                                 title='Autonomy Commons v4.0 review booklet', author='147228', subject=BOUNDARY)
    document.build(story, onFirstPage=lambda c, d: page_frame(c, d, language),
                   onLaterPages=lambda c, d: page_frame(c, d, language), canvasmaker=canvas_factory)


def build_a0(language: str, output: Path) -> None:
    pagesize = landscape(A0)
    width, height = pagesize
    document = canvas.Canvas(str(output), pagesize=pagesize, pageCompression=1, invariant=1, lang=language)
    document.setTitle('Autonomy Commons v4.0 review boards')
    document.setAuthor('147228')
    document.setSubject(BOUNDARY)
    for stem in FIGURE_ORDER:
        source = figure_path(stem, language)
        if not source.is_file():
            raise FileNotFoundError(source)
        document.setFillColor(colors.HexColor('#F3F7FB'))
        document.rect(0, 0, width, height, stroke=0, fill=1)
        image = Image(str(source))
        max_width, max_height = width - 40 * mm, height - 45 * mm
        scale = min(max_width / image.imageWidth, max_height / image.imageHeight)
        draw_width, draw_height = image.imageWidth * scale, image.imageHeight * scale
        image.drawOn(document, (width - draw_width) / 2, (height - draw_height) / 2 - 5 * mm)
        document.setFont(font(language, True), 12)
        document.setFillColor(colors.HexColor('#173552'))
        document.drawString(20 * mm, height - 17 * mm, f'AUTONOMY COMMONS · v4.0 · {stem}')
        document.setFont(font(language), 7)
        document.setFillColor(colors.HexColor('#D85656'))
        document.drawRightString(width - 20 * mm, 11 * mm, BOUNDARY)
        hidden = document.beginText(10, 5)
        hidden.setFont(font(language), 5)
        hidden.setTextRenderMode(3)
        hidden.textLine(f'Source image: {source.relative_to(ROOT).as_posix()}')
        hidden.textLine(('普通路线；人工接管；返程；申诉；' if language == 'zh' else 'ordinary route; human takeover; return; redress; ')
                        + 'official_boundary=false; performance_results=null')
        document.drawText(hidden)
        document.showPage()
    document.save()


def validate(path: Path, language: str, kind: str) -> dict[str, object]:
    reader = PdfReader(str(path))
    text_value = '\n'.join((page.extract_text() or '') for page in reader.pages)
    errors = []
    expected_pages = len(FIGURE_ORDER) if kind == 'a0' else None
    if expected_pages is not None and len(reader.pages) != expected_pages:
        errors.append(f'expected {expected_pages} pages, got {len(reader.pages)}')
    if kind == 'a3' and len(reader.pages) < 10:
        errors.append(f'booklet too short: {len(reader.pages)} pages')
    for required in ('v4.0', 'not a score'):
        if required not in text_value:
            errors.append(f'missing searchable boundary token: {required}')
    if language == 'en' and 'ordinary route' not in text_value.lower():
        errors.append('ordinary-route receipt missing')
    if language == 'zh' and '普通路线' not in text_value:
        errors.append('普通路线回执缺失')
    if kind == 'a0':
        for stem in FIGURE_ORDER:
            if stem not in text_value:
                errors.append(f'board source missing: {stem}')
    return {
        'path': path.relative_to(ROOT).as_posix(),
        'language': language,
        'kind': kind,
        'pages': len(reader.pages),
        'bytes': path.stat().st_size,
        'sha256': digest(path),
        'errors': errors,
    }


register_fonts()
DRAWINGS.mkdir(parents=True, exist_ok=True)
outputs = []
for language in ('zh', 'en'):
    suffix = '' if language == 'zh' else '.en'
    a3 = DRAWINGS / f'a3-booklet{suffix}.pdf'
    a0 = DRAWINGS / f'a0-boards{suffix}.pdf'
    if not CHECK_ONLY:
        build_a3(language, a3)
        build_a0(language, a0)
    outputs.extend((validate(a3, language, 'a3'), validate(a0, language, 'a0')))

payload = {
    'schema_version': '1.0.0',
    'package_iteration': 'v4.0',
    'generated_by': 'visual/assets/build-autonomy-pdf-bundle-v40.js',
    'boundary': 'conceptual_provisional_not_authorized_not_run_not_a_score',
    'figure_order': list(FIGURE_ORDER),
    'reports': outputs,
}
ok = not any(item['errors'] for item in outputs)
if not CHECK_ONLY:
    EVIDENCE.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'ok': ok, **payload}, ensure_ascii=False, indent=2))
raise SystemExit(0 if ok else 1)
`;

let pythonCommand = process.env.HAIDIAN_PYTHON || process.env.PYTHON || 'python3';
if (!process.env.HAIDIAN_PYTHON && !process.env.PYTHON) {
  const bundled = String(process.env.PATH || '')
    .split(path.delimiter)
    .map((entry) => path.resolve(entry, '..', '..', 'python', 'bin', 'python3'))
    .find((candidate) => candidate.includes(`${path.sep}codex-runtimes${path.sep}`) && fs.existsSync(candidate));
  if (bundled) pythonCommand = bundled;
}
const result = spawnSync(pythonCommand, ['-c', python, packageRoot, ...process.argv.slice(2)], { stdio: 'inherit' });
if (result.error) { console.error(result.error); process.exit(1); }
process.exit(result.status === null ? 1 : result.status);
