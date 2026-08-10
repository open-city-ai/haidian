"""Tests for the read-only PDF font diagnostic.

The fixtures are *generated*, not committed. `minimal_pdf` below writes a valid
uncompressed PDF with a chosen number of pages and a chosen font-program
layout, which makes every case in these tests a public, inspectable, minimal
reproduction that anyone can regenerate and open in a viewer — rather than a
binary blob whose contents have to be taken on trust.
"""

from __future__ import annotations

import json
from pathlib import Path
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from diagnose_pdf_fonts import (  # noqa: E402
    INDETERMINATE,
    MEASURED,
    SKIP_NO_GLYPHS,
    diagnose,
    findings,
    main,
    render,
)


def minimal_pdf(path: Path, page_programs: list[bytes], with_image: bool = False) -> Path:
    """Write a valid uncompressed PDF: one page per entry in `page_programs`.

    Each entry is the byte content of that page's embedded font program. Pass
    the same bytes twice to model a shared subset stored once, or distinct
    bytes to model the per-page duplication this tool exists to report. Pass an
    empty list for a PDF with no embedded fonts at all.
    """
    objects: list[bytes] = []

    def add(body: bytes) -> int:
        objects.append(body)
        return len(objects)

    page_count = max(len(page_programs), 1)
    pages_id = 2
    kids: list[int] = []
    add(b"<< /Type /Catalog /Pages 2 0 R >>")
    add(b"")  # placeholder for /Pages, filled once kids are known

    stored: dict[bytes, int] = {}
    for program in page_programs:
        if program not in stored:
            stored[program] = add(
                b"<< /Length " + str(len(program)).encode() + b" /Subtype /CIDFontType0C >>\n"
                b"stream\n" + program + b"\nendstream")
        file_id = stored[program]
        desc = add(b"<< /Type /FontDescriptor /FontName /AAAAAA+Test /FontFile3 "
                   + str(file_id).encode() + b" 0 R >>")
        font = add(b"<< /Type /Font /Subtype /Type0 /BaseFont /AAAAAA+Test "
                   b"/DescendantFonts [<< /Type /Font /Subtype /CIDFontType0 "
                   b"/FontDescriptor " + str(desc).encode() + b" 0 R >>] >>")
        resources = b"<< /Font << /F1 " + str(font).encode() + b" 0 R >> >>"
        kids.append(add(b"<< /Type /Page /Parent " + str(pages_id).encode()
                        + b" 0 R /MediaBox [0 0 200 200] /Resources " + resources + b" >>"))

    if not page_programs:
        resources = (b"<< /XObject << /I0 " + str(add(
            b"<< /Type /XObject /Subtype /Image /Width 1 /Height 1 /Length 1 >>\n"
            b"stream\n\x00\nendstream")).encode() + b" 0 R >> >>") if with_image else b"<< >>"
        kids.append(add(b"<< /Type /Page /Parent " + str(pages_id).encode()
                        + b" 0 R /MediaBox [0 0 200 200] /Resources " + resources + b" >>"))

    objects[pages_id - 1] = (b"<< /Type /Pages /Count " + str(len(kids)).encode()
                             + b" /Kids [" + b" ".join(f"{k} 0 R".encode() for k in kids)
                             + b"] >>")

    out = bytearray(b"%PDF-1.7\n")
    offsets = [0]
    for number, body in enumerate(objects, start=1):
        offsets.append(len(out))
        out += f"{number} 0 obj\n".encode() + body + b"\nendobj\n"
    xref = len(out)
    out += f"xref\n0 {len(objects) + 1}\n".encode()
    out += b"0000000000 65535 f \n"
    for off in offsets[1:]:
        out += f"{off:010d} 00000 n \n".encode()
    out += (b"trailer\n<< /Size " + str(len(objects) + 1).encode()
            + b" /Root 1 0 R >>\nstartxref\n" + str(xref).encode() + b"\n%%EOF\n")
    path.write_bytes(bytes(out))
    assert page_count  # documents the intent of the argument
    return path


class DiagnoseTests(unittest.TestCase):
    def setUp(self) -> None:
        self.tmp = tempfile.TemporaryDirectory()
        self.dir = Path(self.tmp.name)
        self.addCleanup(self.tmp.cleanup)

    def test_per_page_duplication_is_detected_across_differing_bytes(self) -> None:
        """The case the tool exists for.

        Three pages, three subsets of one family, each holding different bytes —
        which is what a per-document subsetter produces, because the subset tag
        and the internal ordering differ even when the glyphs do not. A
        byte-identity check reports nothing here; grouping by family reports two
        copies' worth of waste.
        """
        pdf = minimal_pdf(self.dir / "dup.pdf",
                          [b"TAG001" + b"A" * 40000,
                           b"TAG002" + b"A" * 40000,
                           b"TAG003" + b"A" * 40000])
        report = diagnose(pdf)
        self.assertEqual(report.status, MEASURED)
        self.assertEqual(report.pages, 3)
        self.assertEqual(report.stored_programs, 3)
        self.assertEqual(report.distinct_programs, 3, "byte contents genuinely differ")
        self.assertEqual(report.duplicated_bytes, 2 * 40006,
                         "sharing one program per family would save two copies")
        text = " ".join(findings(report))
        self.assertIn("stored font programs across 3 pages", text)
        self.assertIn("a byte-identity check does not see them", text)

    def test_a_shared_program_reports_no_waste(self) -> None:
        shared = minimal_pdf(self.dir / "shared.pdf", [b"A" * 40000] * 3)
        report = diagnose(shared)
        self.assertEqual(report.stored_programs, 1, "identical bytes are stored once")
        self.assertEqual(report.duplicated_bytes, 0)
        self.assertEqual(findings(report), [],
                         "a file that already shares its fonts has nothing to report")

    def test_no_embedded_fonts_is_skip_not_a_failure(self) -> None:
        pdf = minimal_pdf(self.dir / "raster.pdf", [], with_image=True)
        report = diagnose(pdf)
        self.assertEqual(report.status, SKIP_NO_GLYPHS)
        self.assertIn("no embedded glyph data", report.note)
        self.assertIn("imagery", report.note)
        self.assertEqual(findings(report), [], "SKIP must not produce findings")

    def test_object_streams_are_indeterminate_not_zero(self) -> None:
        """A standard-library scan cannot see into /ObjStm, and says so."""
        pdf = self.dir / "objstm.pdf"
        minimal_pdf(pdf, [])
        pdf.write_bytes(pdf.read_bytes().replace(b"/Type /Catalog",
                                                 b"/Type /ObjStm /Type /Catalog", 1))
        report = diagnose(pdf)
        self.assertEqual(report.status, INDETERMINATE)
        self.assertIn("no conclusion drawn", report.note)

    def test_reports_both_limits_separately(self) -> None:
        a = minimal_pdf(self.dir / "a.pdf", [b"A" * 1000])
        b = minimal_pdf(self.dir / "b.pdf", [b"B" * 1000])
        text = render([diagnose(a), diagnose(b)], as_json=False)
        self.assertIn("per-file limit", text)
        self.assertIn("40 MiB changed-file total", text)
        self.assertIn("separate limit", text)

        payload = json.loads(render([diagnose(a)], as_json=True))
        self.assertEqual(payload["per_file_limit_bytes"], 10 * 1024 * 1024)
        self.assertEqual(payload["changed_total_limit_bytes"], 40 * 1024 * 1024)

    def test_never_writes_to_the_pdf(self) -> None:
        pdf = minimal_pdf(self.dir / "ro.pdf", [b"A" * 5000, b"B" * 5000])
        before = pdf.read_bytes()
        mtime = pdf.stat().st_mtime_ns
        diagnose(pdf)
        main([str(pdf)])
        main([str(self.dir), "--json"])
        self.assertEqual(pdf.read_bytes(), before)
        self.assertEqual(pdf.stat().st_mtime_ns, mtime)

    def test_single_page_files_produce_no_duplication_finding(self) -> None:
        pdf = minimal_pdf(self.dir / "one.pdf", [b"A" * 900000])
        self.assertEqual(findings(diagnose(pdf)), [],
                         "one page cannot duplicate across pages")

    def test_directory_scan_and_exit_codes(self) -> None:
        minimal_pdf(self.dir / "x.pdf", [b"A" * 1000])
        self.assertEqual(main([str(self.dir)]), 0)
        self.assertEqual(main([str(self.dir / "missing.pdf")]), 2)


if __name__ == "__main__":
    unittest.main()
