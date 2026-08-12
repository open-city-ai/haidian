#!/usr/bin/env node
/* Replace page 1 of each committed review PDF with the v3.9 ordinary-route
 * review entry. Pages 2..n are preserved byte-for-byte at the page-object level. */
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const packageRoot = path.resolve(__dirname, '../..');
const python = String.raw`
from __future__ import annotations

import io
import json
import sys
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A0, A3, landscape
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT = Path(sys.argv[1]).resolve()
CHECK_ONLY = '--check' in sys.argv[2:]
FIGURES = ROOT / 'assets' / 'figures'
DRAWINGS = ROOT / 'drawings'
EVIDENCE = ROOT / 'visual' / 'assets' / 'autonomy-review-pdf-covers-v39.json'
FONTS = (
    Path('/Library/Fonts/Arial Unicode.ttf'),
    Path('/System/Library/Fonts/Supplemental/Arial Unicode.ttf'),
)
SPECS = {
    'a3-booklet': A3,
    'a0-boards': landscape(A0),
}


def font_name(language: str) -> str:
    if language == 'en':
        return 'Helvetica'
    font_path = next((item for item in FONTS if item.is_file()), None)
    if font_path is None:
        raise RuntimeError('Arial Unicode font is required for the Chinese review cover')
    name = 'AutonomyReviewUnicode'
    if name not in pdfmetrics.getRegisteredFontNames():
        pdfmetrics.registerFont(TTFont(name, str(font_path)))
    return name


def text(document: canvas.Canvas, value: str, x: float, y: float, size: float,
         language: str, color: str = '#173552', bold: bool = False) -> None:
    family = font_name(language)
    if language == 'en' and bold:
        family = 'Helvetica-Bold'
    document.setFont(family, size)
    document.setFillColor(HexColor(color))
    document.drawString(x, y, value)


def draw_a0(document: canvas.Canvas, language: str, pagesize: tuple[float, float], source: Path) -> None:
    width, height = pagesize
    document.setFillColor(HexColor('#F3F7FB'))
    document.rect(0, 0, width, height, stroke=0, fill=1)
    image = ImageReader(str(source))
    image_width, image_height = image.getSize()
    margin = 44.0
    scale = min((width - 2 * margin) / image_width, (height - 2 * margin) / image_height)
    draw_width, draw_height = image_width * scale, image_height * scale
    document.drawImage(image, (width - draw_width) / 2, (height - draw_height) / 2,
                       draw_width, draw_height, mask='auto')


def draw_a3(document: canvas.Canvas, language: str, pagesize: tuple[float, float], source: Path) -> None:
    width, height = pagesize
    margin = 44.0
    document.setFillColor(HexColor('#F3F7FB'))
    document.rect(0, 0, width, height, stroke=0, fill=1)

    label = 'AUTONOMY COMMONS · REVIEW ENTRY · v3.9' if language == 'en' else '智行京张 · 评审入口 · v3.9'
    text(document, label, margin, height - 55, 10, language, '#627F9C', True)
    text(document, 'CONCEPT / PROVISIONAL' if language == 'en' else '概念 / 临时约束',
         width - margin - (132 if language == 'en' else 82), height - 55, 9, language, '#D85656', True)

    if language == 'en':
        title_lines = ('Before automation enters,', 'prove the ordinary route remains')
        subtitle = 'One route · three proof yards · six AV mechanisms · one reversible year'
    else:
        title_lines = ('自动化进场前，', '先证明普通路线没有被拿走')
        subtitle = '一条普通路线 · 三座公共证明庭 · 六个自动驾驶机制 · 一个可撤回年度循环'
    text(document, title_lines[0], margin, height - 105, 28, language, '#122F4B', True)
    text(document, title_lines[1], margin, height - 140, 28, language, '#122F4B', True)
    text(document, subtitle, margin, height - 172, 11, language, '#607C98')

    image = ImageReader(str(source))
    image_width, image_height = image.getSize()
    draw_width = width - 2 * margin
    draw_height = draw_width * image_height / image_width
    image_y = height - 196 - draw_height
    document.setFillColor(HexColor('#FFFFFF'))
    document.roundRect(margin - 4, image_y - 4, draw_width + 8, draw_height + 8, 12, stroke=0, fill=1)
    document.drawImage(image, margin, image_y, draw_width, draw_height, mask='auto')

    card_y = 235
    card_h = image_y - card_y - 24
    document.setFillColor(HexColor('#173B5D'))
    document.roundRect(margin, card_y, draw_width, card_h, 14, stroke=0, fill=1)
    if language == 'en':
        card_title = 'P0 COMPLETE-ROUTE RECEIPT'
        chain_1 = 'entry → ordinary route → status / consent → bounded service'
        chain_2 = '→ human takeover → return → redress'
        stop_1 = 'A missing link fails the trial. An average score cannot cancel a broken route.'
        stop_2 = 'No approved boundary · no field data · no performance result'
    else:
        card_title = 'P0 完整路线回执'
        chain_1 = '入口 → 普通路径 → 状态 / 同意 → 受限服务'
        chain_2 = '→ 人工接管 → 返程 → 申诉'
        stop_1 = '任一环断裂即失败；平均分、车辆完成率或合成回放不得抵消断点。'
        stop_2 = '无批准边界 · 无现场数据 · 无绩效结果'
    text(document, card_title, margin + 24, card_y + card_h - 34, 11, language, '#BBD0E4', True)
    text(document, chain_1, margin + 24, card_y + card_h - 74, 17, language, '#FFFFFF', True)
    text(document, chain_2, margin + 24, card_y + card_h - 104, 17, language, '#FFFFFF', True)
    if language == 'en':
        proof_cells = (
            ('01 ORDINARY ROUTE', 'complete even if the trial fails'),
            ('02 HUMAN TAKEOVER', 'named and staffed recovery'),
            ('03 RETURN + REDRESS', 'readable receipt; reopen'),
        )
    else:
        proof_cells = (
            ('01 普通路线', '试验失败也能走完'),
            ('02 人工接管', '责任明确、现场可恢复'),
            ('03 返程与申诉', '可回读、可重开'),
        )
    cell_width = draw_width / 3
    for index, (cell_title, cell_note) in enumerate(proof_cells):
        cell_x = margin + 24 + index * cell_width
        text(document, cell_title, cell_x, card_y + 92, 9.5, language, '#BBD0E4', True)
        text(document, cell_note, cell_x, card_y + 70, 8.5, language, '#FFFFFF')
        if index:
            document.setStrokeColor(HexColor('#54728E'))
            document.setLineWidth(0.6)
            document.line(margin + index * cell_width, card_y + 58,
                          margin + index * cell_width, card_y + 103)
    text(document, stop_1, margin + 24, card_y + 34, 9.5, language, '#DCE8F2')
    text(document, stop_2, margin + 24, 96, 9, language, '#D85656', True)
    text(document, 'Only mechanisms transfer; permits, partners, liability and outcomes do not.' if language == 'en'
         else '只迁移机制，不迁移许可、伙伴、责任或运营结果。', margin, 69, 9, language, '#627F9C')


def cover_pdf(stem: str, language: str, pagesize: tuple[float, float]) -> bytes:
    suffix = '.en.png' if language == 'en' else '.png'
    source = FIGURES / f'site-overview{suffix}'
    if not source.is_file():
        raise FileNotFoundError(source)
    buffer = io.BytesIO()
    document = canvas.Canvas(buffer, pagesize=pagesize, pageCompression=1, invariant=1, lang=language)
    document.setAuthor('147228')
    document.setCreator('build-autonomy-review-pdf-covers-v39.js')
    document.setTitle('Autonomy Commons v3.9 ordinary-route review entry')
    document.setSubject('Concept/provisional review entry; no approved road, operation or field result')
    if stem == 'a0-boards':
        draw_a0(document, language, pagesize, source)
    else:
        draw_a3(document, language, pagesize, source)
    hidden = document.beginText(20, 12)
    hidden.setFont(font_name(language), 6)
    hidden.setTextRenderMode(3)
    hidden.textLine(f'Source image: {source.relative_to(ROOT).as_posix()}')
    hidden.textLine('official_boundary=false; operational_status=not_authorized_not_run; performance_results=null')
    hidden.textLine('entry -> ordinary route -> status/consent -> bounded service -> human takeover -> return -> redress')
    document.drawText(hidden)
    document.showPage()
    document.save()
    return buffer.getvalue()


def replace_cover(stem: str, output: Path, language: str, pagesize: tuple[float, float]) -> int:
    old = PdfReader(io.BytesIO(output.read_bytes()))
    if not old.pages:
        raise RuntimeError(f'{output} has no pages')
    cover = PdfReader(io.BytesIO(cover_pdf(stem, language, pagesize)))
    writer = PdfWriter()
    writer.add_page(cover.pages[0])
    for page in old.pages[1:]:
        writer.add_page(page)
    writer.add_metadata({
        '/Author': '147228',
        '/Creator': 'build-autonomy-review-pdf-covers-v39.js',
        '/Title': 'Autonomy Commons v3.9 review drawings',
        '/Subject': 'Concept/provisional review drawings; page 1 is the ordinary-route review entry',
    })
    temp = output.with_suffix(output.suffix + '.tmp')
    with temp.open('wb') as handle:
        writer.write(handle)
    temp.replace(output)
    return len(writer.pages)


def validate(stem: str, output: Path, language: str, pagesize: tuple[float, float]) -> dict[str, object]:
    reader = PdfReader(str(output))
    errors = []
    if not reader.pages:
        errors.append('PDF has no pages')
    else:
        page = reader.pages[0]
        expected_width, expected_height = pagesize
        width, height = float(page.mediabox.width), float(page.mediabox.height)
        if abs(width - expected_width) > 1 or abs(height - expected_height) > 1:
            errors.append(f'cover size {width:.2f}x{height:.2f}, expected {expected_width:.2f}x{expected_height:.2f}')
        extracted = page.extract_text() or ''
        expected_source = f"site-overview{'.en' if language == 'en' else ''}.png"
        required = (expected_source, 'official_boundary=false', 'ordinary route', 'redress')
        if any(item not in extracted for item in required):
            errors.append('searchable source/boundary/complete-route receipt missing')
    return {
        'path': output.relative_to(ROOT).as_posix(),
        'language': language,
        'pages': len(reader.pages),
        'cover_source': f"assets/figures/site-overview{'.en' if language == 'en' else ''}.png",
        'official_boundary': False,
        'operational_status': 'not_authorized_not_run',
        'performance_results': None,
        'tagged_pdf_ua_claimed': False,
        'errors': errors,
    }


reports = []
for stem, pagesize in SPECS.items():
    for language in ('zh', 'en'):
        localized = '' if language == 'zh' else '.en'
        output = DRAWINGS / f'{stem}{localized}.pdf'
        if not CHECK_ONLY:
            replace_cover(stem, output, language, pagesize)
        reports.append(validate(stem, output, language, pagesize))

payload = {
    'schema_version': '0.1.0',
    'package_iteration': 'v3.9',
    'generated_by': 'visual/assets/build-autonomy-review-pdf-covers-v39.js',
    'cover_only_replacement': True,
    'preserved_existing_pages_from': 2,
    'reports': reports,
}
if not CHECK_ONLY:
    EVIDENCE.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
ok = not any(report['errors'] for report in reports)
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
