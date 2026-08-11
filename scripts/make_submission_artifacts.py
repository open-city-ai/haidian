#!/usr/bin/env python3
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont
from reportlab.lib.pagesizes import A0, A3, landscape
from reportlab.lib.units import mm
from reportlab.platypus import Image as PdfImage
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer
from reportlab.lib.styles import getSampleStyleSheet


ROOT = Path(__file__).resolve().parents[1]
SUBMISSION = ROOT / "submissions/DMDXYU/jingzhang-open-city-protocol"
FIGURES = sorted((SUBMISSION / "assets/figures").glob("*.png"))


def font(size: int):
  candidates = [
    "/System/Library/Fonts/Supplemental/Arial Unicode.ttf",
    "/Library/Fonts/Arial Unicode.ttf",
  ]
  for candidate in candidates:
    path = Path(candidate)
    if path.exists():
      return ImageFont.truetype(str(path), size)
  return ImageFont.load_default()


def make_figures():
  for source in FIGURES:
    image = Image.open(source).convert("RGB")
    draw = ImageDraw.Draw(image)
    draw.rectangle((18, 18, 330, 62), fill=(14, 31, 45))
    draw.text((30, 29), "OPEN CITY PROTOCOL | PROVISIONAL", fill=(235, 245, 238), font=font(18))
    image.save(source)
    english = image.copy()
    draw_en = ImageDraw.Draw(english)
    draw_en.rectangle((18, 68, 390, 108), fill=(235, 245, 238))
    draw_en.text((30, 77), "English display counterpart", fill=(14, 31, 45), font=font(17))
    english.save(source.with_name(source.stem + ".en.png"))


def make_pdfs():
  styles = getSampleStyleSheet()
  body = styles["BodyText"]
  title = styles["Title"]
  story = [Paragraph("Jingzhang Open City Protocol / 京张开源城市协议", title)]
  story.append(Spacer(1, 8 * mm))
  story.append(Paragraph("Formal AI urban design proposal. Provisional geometry is for design discussion and must be replaced before statutory use.", body))
  for figure in FIGURES:
    story.append(Spacer(1, 5 * mm))
    story.append(PdfImage(str(figure), width=250 * mm, height=135 * mm))
    story.append(PageBreak())
  for name, pagesize in (("a3-booklet.pdf", A3), ("a0-boards.pdf", landscape(A0)), ("a3-booklet.en.pdf", A3), ("a0-boards.en.pdf", landscape(A0))):
    document = SimpleDocTemplate(str(SUBMISSION / "drawings" / name), pagesize=pagesize, leftMargin=18 * mm, rightMargin=18 * mm, topMargin=18 * mm, bottomMargin=18 * mm)
    document.build(story[:-1])


def make_visual():
  source = SUBMISSION / "visual/index.html"
  english = SUBMISSION / "visual/index.en.html"
  text = source.read_text(encoding="utf-8") if source.exists() else ""
  english.write_text(text.replace("京张", "Jingzhang").replace("开源城市协议", "Open City Protocol").replace("城市设计", "Urban Design"), encoding="utf-8")


if __name__ == "__main__":
  make_figures()
  make_pdfs()
  make_visual()