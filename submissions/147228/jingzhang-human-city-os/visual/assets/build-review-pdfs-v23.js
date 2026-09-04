#!/usr/bin/env node
/*
 * Deterministic bilingual review-PDF builder.
 *
 * The submission contract permits JavaScript under visual/assets.  This thin
 * entrypoint invokes the local Python PDF stack already used by the repository
 * workspace so Chinese captions can be embedded with the committed system
 * font.  The visible layer remains the committed figure artwork; the added
 * text is searchable metadata, not a complete tagged PDF/UA reading tree.
 */
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const packageRoot = path.resolve(__dirname, '../..');
const python = String.raw`
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

from pypdf import PdfReader
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
FONTS = (
    Path('/Library/Fonts/Arial Unicode.ttf'),
    Path('/System/Library/Fonts/Supplemental/Arial Unicode.ttf'),
)
ORDER = (
    'site-overview',
    'land-use-structure',
    'key-areas',
    'mobility-bluegreen',
    'metrics-evidence',
    'brief-alignment-atlas',
    'spatial-action-atlas',
    'spatial-action-rooms-v21',
    'human-machine-interface-section',
    'human-city-acceptance-atlas',
    'public-culture-operations-atlas',
    'regional-interface-ledger',
    'reviewer-scorecard-map',
    'reviewer-navigation',
    'release-gates',
    'data-readiness',
    'parametric-tradeoff-study',
    'brand-identity',
)
PAGE_SPECS = {
    'a3-booklet': landscape(A3),
    'a0-boards': landscape(A0),
}


def captions(language: str) -> dict[str, str]:
    proposal = ROOT / ('proposal.md' if language == 'zh' else 'proposal.en.md')
    result = {}
    for label, source in re.findall(r'!\[([^\]]+)\]\(([^)]+)\)', proposal.read_text(encoding='utf-8')):
        result[Path(source).stem.removesuffix('.en')] = label.strip()
    missing = [key for key in ORDER if key not in result]
    if missing:
        raise RuntimeError(f"proposal caption missing for {language}: {', '.join(missing)}")
    return result


def font_name(language: str) -> str:
    if language == 'en':
        return 'Helvetica'
    font_path = next((item for item in FONTS if item.is_file()), None)
    if font_path is None:
        raise RuntimeError('Arial Unicode font is required for Chinese searchable captions')
    name = 'HumanCityUnicode'
    if name not in pdfmetrics.getRegisteredFontNames():
        pdfmetrics.registerFont(TTFont(name, str(font_path)))
    return name


def figure_path(key: str, language: str) -> Path:
    suffix = '.en.png' if language == 'en' else '.png'
    candidate = FIGURES / f'{key}{suffix}'
    if not candidate.is_file():
        raise FileNotFoundError(candidate)
    return candidate


def draw_pdf(output: Path, language: str, pagesize: tuple[float, float]) -> None:
    labels = captions(language)
    page_font = font_name(language)
    width, height = pagesize
    document = canvas.Canvas(
        str(output), pagesize=pagesize, pageCompression=1, invariant=1, lang=language
    )
    document.setAuthor('147228')
    document.setCreator('build-review-pdfs-v23.js')
    document.setTitle('京张人本城市操作系统' if language == 'zh' else 'Jingzhang Human City OS')
    document.setSubject(
        '概念建议审阅图；含可搜索页标题，不含完整 PDF/UA 标签树'
        if language == 'zh'
        else 'Concept review drawings with searchable captions; not a complete tagged PDF/UA document'
    )
    margin = 24.0
    for index, key in enumerate(ORDER, 1):
        source = figure_path(key, language)
        image = ImageReader(str(source))
        image_width, image_height = image.getSize()
        scale = min((width - 2 * margin) / image_width, (height - 2 * margin) / image_height)
        draw_width, draw_height = image_width * scale, image_height * scale
        x, y = (width - draw_width) / 2, (height - draw_height) / 2
        document.setFillColor(HexColor('#0E1C30'))
        document.rect(0, 0, width, height, stroke=0, fill=1)
        document.drawImage(image, x, y, draw_width, draw_height, mask='auto')
        text = document.beginText(margin, 10)
        text.setFont(page_font, 7)
        text.setTextRenderMode(3)
        text.textLine(labels[key])
        text.textLine(f"Source image: {source.relative_to(ROOT).as_posix()}")
        text.textLine(f'Page {index}/{len(ORDER)}; conceptual/provisional review drawing')
        document.drawText(text)
        document.showPage()
    document.save()


def validate(path: Path, language: str, pagesize: tuple[float, float]) -> dict[str, object]:
    reader = PdfReader(str(path))
    labels = captions(language)
    errors = []
    if len(reader.pages) != len(ORDER):
        errors.append(f'expected {len(ORDER)} pages, got {len(reader.pages)}')
    expected_width, expected_height = pagesize
    searchable = 0
    for index, (page, key) in enumerate(zip(reader.pages, ORDER), 1):
        width, height = float(page.mediabox.width), float(page.mediabox.height)
        if abs(width - expected_width) > 1 or abs(height - expected_height) > 1:
            errors.append(
                f'page {index} size {width:.2f}x{height:.2f}, expected {expected_width:.2f}x{expected_height:.2f}'
            )
        extracted = page.extract_text() or ''
        if labels[key] in extracted and figure_path(key, language).name in extracted:
            searchable += 1
        else:
            errors.append(f'page {index} searchable caption/source missing')
    return {
        'path': path.relative_to(ROOT).as_posix(),
        'language': language,
        'pages': len(reader.pages),
        'page_size_points': [round(expected_width, 2), round(expected_height, 2)],
        'searchable_caption_pages': searchable,
        'tagged_pdf_ua_claimed': False,
        'errors': errors,
    }


DRAWINGS.mkdir(parents=True, exist_ok=True)
reports = []
for stem, pagesize in PAGE_SPECS.items():
    for language in ('zh', 'en'):
        localized = '' if language == 'zh' else '.en'
        output = DRAWINGS / f'{stem}{localized}.pdf'
        if not CHECK_ONLY:
            draw_pdf(output, language, pagesize)
        reports.append(validate(output, language, pagesize))
ok = not any(report['errors'] for report in reports)
print(json.dumps({'ok': ok, 'reports': reports}, ensure_ascii=False, indent=2))
raise SystemExit(0 if ok else 1)
`;

let pythonCommand = process.env.HAIDIAN_PYTHON || process.env.PYTHON || 'python3';
let pythonArgs = ['-c', python, packageRoot, ...process.argv.slice(2)];
// Prefer the bundled workspace Python when its PATH marker is present.  This
// also avoids a Rosetta Node process selecting the wrong slice of Apple's
// universal Python and loading an incompatible Pillow extension.
if (!process.env.HAIDIAN_PYTHON && !process.env.PYTHON) {
  const bundled = String(process.env.PATH || '')
    .split(path.delimiter)
    .map((entry) => path.resolve(entry, '..', '..', 'python', 'bin', 'python3'))
    .find((candidate) => candidate.includes(`${path.sep}codex-runtimes${path.sep}`) && fs.existsSync(candidate));
  if (bundled) pythonCommand = bundled;
}
const result = spawnSync(pythonCommand, pythonArgs, { stdio: 'inherit' });
if (result.error) {
  console.error(result.error);
  process.exit(1);
}
process.exit(result.status === null ? 1 : result.status);
