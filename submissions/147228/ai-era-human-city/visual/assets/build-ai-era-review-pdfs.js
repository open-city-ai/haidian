#!/usr/bin/env node
'use strict';

/** Build four page-identical bilingual review PDFs from one canonical storyboard. */

const fs = require('fs');
const path = require('path');
const sharp = require(process.env.AI_ERA_SHARP_MODULE || 'sharp');
const { PDFDocument, StandardFonts, rgb } = require(process.env.AI_ERA_PDF_LIB_MODULE || 'pdf-lib');

const packageRoot = path.resolve(__dirname, '..', '..');
const figureDir = path.join(packageRoot, 'assets', 'figures');
const drawingDir = path.join(packageRoot, 'drawings');
const storyboard = [
  ['B01', 'site-overview', 'png'],
  ['B02', 'land-use-structure', 'png'],
  ['B03', 'key-areas-v17', 'png'],
  ['B04', 'mobility-bluegreen', 'png'],
  ['B05', 'metrics-evidence', 'png'],
  ['B06', 'ordinary-service-evidence-board', 'png'],
  ['B07', 'scenario-coverage-board', 'png'],
  ['B08', 'implementation-gates-board', 'png'],
  ['B09', 'taskbook-culture-operations-board', 'png'],
  ['B10', 'professional-review-map-v21', 'png'],
  ['B11', 'ai-era-g0-journey-atlas', 'svg'],
  ['B12', 'ai-era-off-city-on-atlas', 'svg'],
  ['B13', 'ai-era-continuity-maintenance-atlas', 'svg'],
  ['B14', 'ai-era-spatial-decision', 'svg'],
  ['B15', 'ai-era-pilot-node-dossier', 'png'],
  ['B16', 'ai-era-pilot-delivery-receipt', 'png']
];
const sizes = { A3: [1190.551, 841.89], A0: [3370.394, 2383.937] };

async function imageBuffer(stem, extension, language) {
  const suffix = language === 'zh' ? '' : '.en';
  const source = path.join(figureDir, `${stem}${suffix}.${extension}`);
  if (!fs.existsSync(source)) throw new Error(`Missing canonical board: ${source}`);
  if (extension === 'png') return fs.readFileSync(source);
  return sharp(source, { density: 180 }).resize({ width: 2400, height: 1350, fit: 'contain', background: '#f5f2e9' }).png({ compressionLevel: 9 }).toBuffer();
}

async function build(output, pageSize, language) {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const [pageWidth, pageHeight] = pageSize;
  const margin = Math.min(pageWidth, pageHeight) * 0.032;
  pdf.setTitle('Jing-Zhang AI-era Human City v2.8 canonical review storyboard');
  pdf.setAuthor('147228 / Codex');
  pdf.setSubject('Sixteen page-identical bilingual review boards; design targets only; HOLD');
  for (const [index, [boardId, stem, extension]] of storyboard.entries()) {
    const png = await imageBuffer(stem, extension, language);
    const image = await pdf.embedPng(png);
    const availableWidth = pageWidth - margin * 2;
    const availableHeight = pageHeight - margin * 2;
    const scale = Math.min(availableWidth / image.width, availableHeight / image.height);
    const width = image.width * scale;
    const height = image.height * scale;
    const page = pdf.addPage(pageSize);
    page.drawRectangle({ x: 0, y: 0, width: pageWidth, height: pageHeight, color: rgb(20 / 255, 33 / 255, 61 / 255) });
    page.drawImage(image, { x: (pageWidth - width) / 2, y: (pageHeight - height) / 2, width, height });
    const footer = `V2.8  ${boardId}  ${index + 1}/${storyboard.length}  ${language.toUpperCase()}  HOLD`;
    const fontSize = Math.max(7, Math.min(pageWidth, pageHeight) * 0.0085);
    const footerWidth = font.widthOfTextAtSize(footer, fontSize);
    page.drawText(footer, { x: pageWidth - margin - footerWidth, y: margin * 0.30, size: fontSize, font, color: rgb(0.65, 0.72, 0.80) });
  }
  const bytes = await pdf.save({ useObjectStreams: true });
  const target = path.join(drawingDir, output);
  fs.writeFileSync(target, bytes);
  process.stdout.write(`${path.relative(packageRoot, target)}\n`);
}

async function main() {
  fs.mkdirSync(drawingDir, { recursive: true });
  await build('a3-booklet.pdf', sizes.A3, 'zh');
  await build('a3-booklet.en.pdf', sizes.A3, 'en');
  await build('a0-boards.pdf', sizes.A0, 'zh');
  await build('a0-boards.en.pdf', sizes.A0, 'en');
  const record = {
    schema_version: '1.0.0', status: 'canonical_storyboard_generated', iteration: 'v2.8',
    board_ids: storyboard.map(([id]) => id), page_count_each: storyboard.length,
    orientation: 'landscape', order_identical: true, source_board_pairs: storyboard.length,
    manual_visual_review: 'pending_after_generation',
    boundary: 'Page parity proves jury-visible equivalence only; it is not a field result, accessibility certification or official score.'
  };
  fs.writeFileSync(path.join(__dirname, 'ai-era-pdf-equivalence-record.json'), `${JSON.stringify(record, null, 2)}\n`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
