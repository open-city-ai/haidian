#!/usr/bin/env node
'use strict';

/** Build the four bilingual Open Pulse review PDFs from the core PNG boards. */

const fs = require('fs');
const path = require('path');

const pdfLibPath = process.env.OPEN_PULSE_PDF_LIB_MODULE || 'pdf-lib';
const { PDFDocument, StandardFonts, rgb } = require(pdfLibPath);

const packageRoot = path.resolve(__dirname, '..', '..');
const figureDir = path.join(packageRoot, 'assets', 'figures');
const drawingDir = path.join(packageRoot, 'drawings');
const stems = ['site-overview', 'land-use-structure', 'key-areas', 'mobility-bluegreen', 'metrics-evidence', 'open-pulse-station-design', 'open-pulse-delivery-readiness'];
const pageSizes = {
  A3_LANDSCAPE: [1190.551, 841.89],
  A0_LANDSCAPE: [3370.394, 2383.937],
};

async function buildBooklet(outputName, pageSize, language) {
  const pdf = await PDFDocument.create();
  pdf.setTitle('Jing-Zhang Open Pulse v3.2 civic release boards');
  pdf.setAuthor('许丙南 / Codex');
  pdf.setSubject('Seven bilingual, evidence-bounded urban design review boards');
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const [pageWidth, pageHeight] = pageSize;
  const margin = Math.min(pageWidth, pageHeight) * 0.035;
  const suffix = language === 'zh' ? '' : '.en';

  for (const [index, stem] of stems.entries()) {
    const imagePath = path.join(figureDir, `${stem}${suffix}.png`);
    if (!fs.existsSync(imagePath)) throw new Error(`Missing review board: ${imagePath}`);
    const image = await pdf.embedPng(fs.readFileSync(imagePath));
    const availableWidth = pageWidth - 2 * margin;
    const availableHeight = pageHeight - 2 * margin;
    const scale = Math.min(availableWidth / image.width, availableHeight / image.height);
    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;
    const page = pdf.addPage(pageSize);
    page.drawRectangle({ x: 0, y: 0, width: pageWidth, height: pageHeight, color: rgb(16 / 255, 25 / 255, 35 / 255) });
    page.drawImage(image, {
      x: (pageWidth - drawWidth) / 2,
      y: (pageHeight - drawHeight) / 2,
      width: drawWidth,
      height: drawHeight,
    });
    const footer = `V3.2  ${index + 1}/${stems.length}`;
    const fontSize = Math.max(7, Math.min(pageWidth, pageHeight) * 0.009);
    const footerWidth = font.widthOfTextAtSize(footer, fontSize);
    page.drawText(footer, {
      x: pageWidth - margin - footerWidth,
      y: margin * 0.35,
      size: fontSize,
      font,
      color: rgb(145 / 255, 169 / 255, 187 / 255),
    });
  }

  const outputPath = path.join(drawingDir, outputName);
  fs.writeFileSync(outputPath, await pdf.save({ useObjectStreams: true }));
  process.stdout.write(`drawings/${outputName}\n`);
}

async function main() {
  fs.mkdirSync(drawingDir, { recursive: true });
  await buildBooklet('a3-booklet.pdf', pageSizes.A3_LANDSCAPE, 'zh');
  await buildBooklet('a3-booklet.en.pdf', pageSizes.A3_LANDSCAPE, 'en');
  await buildBooklet('a0-boards.pdf', pageSizes.A0_LANDSCAPE, 'zh');
  await buildBooklet('a0-boards.en.pdf', pageSizes.A0_LANDSCAPE, 'en');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
