#!/usr/bin/env python3
"""Read-only diagnostic: how much of a submission's PDF is duplicated font data.

Motivation and measurement are in issue #1211. Across all 1,014 drawing PDFs in
the repository, the 10 MiB per-file intake cap binds on almost nobody, and the
size of a vector PDF is driven not by how much is drawn but by two font-side
effects that are invisible unless you look for them:

1. **Per-page duplication.** A booklet assembled by rendering each page
   separately and merging afterwards stores one font subset per page. 92% of
   multi-page PDFs in the field share every font program across all pages; the
   ones that do not pay for the subset again on every sheet.
2. **Retained CFF subroutines.** A CID-keyed CFF subset can carry the source
   font's whole local-subroutine index — tens of thousands of entries — for a
   few hundred glyphs. Measured on one package: 8.37 MiB of subroutine
   bytecode against 1.00 MiB of actual outlines.

This tool reports both and nothing else. It is deliberately not a gate:

* **It never writes a PDF.** No re-subsetting, no desubroutinizing, no font
  substitution, no layout change. It opens files read-only and prints.
* **It says SKIP, not FAIL, when it has nothing to measure.** A rasterised
  PDF or one that references fonts without embedding them has no embedded
  glyph data, and reporting that as a problem would be a false positive on the
  majority of the field.
* **It says INDETERMINATE when it cannot parse.** Font references living
  inside compressed object streams are not visible to a standard-library
  scan; the tool detects that case and declines to conclude rather than
  reporting zero.
* **It reports the two intake limits separately** — the per-file cap and the
  changed-file total — because a submission can approach the second while
  every individual file is comfortably under the first.

Standard library only, matching `validate_submission.py`.

    python3 scripts/diagnose_pdf_fonts.py submissions/<login>/<slug>
    python3 scripts/diagnose_pdf_fonts.py path/to/one.pdf --json
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
import zlib
from dataclasses import dataclass, field
from pathlib import Path

MIB = 1024 * 1024
PER_FILE_LIMIT = 10 * MIB
CHANGED_TOTAL_LIMIT = 40 * MIB

FONTFILE_REF = re.compile(rb"/FontFile[123]?\s+(\d+)\s+\d+\s+R")
# A subset tag is six uppercase letters and a plus sign, assigned per document.
# Two subsets of one typeface therefore never share a name even when they hold
# the same glyphs, so the family is what identifies them as the same font.
FONTNAME = re.compile(rb"/(?:FontName|BaseFont)\s*/(?:([A-Z]{6})\+)?([^\s/>\]]+)")
OBJECT_HEAD = re.compile(rb"(?m)^(\d+)\s+0\s+obj\b")
PAGE_TYPE = re.compile(rb"/Type\s*/Page[^s]")
IMAGE_XOBJECT = re.compile(rb"/Subtype\s*/Image")
OBJECT_STREAM = re.compile(rb"/Type\s*/ObjStm")
LENGTH = re.compile(rb"/Length\s+(\d+)\b")

SKIP_NO_GLYPHS = "SKIP"
INDETERMINATE = "INDETERMINATE"
MEASURED = "MEASURED"


@dataclass
class Program:
    """One stored font program: its bytes, and the family it belongs to.

    Grouping by family rather than by byte content is the correction that makes
    this tool see the case it was built for. A subsetter that runs once per page
    emits programs with the *same glyphs* and *different bytes* — different
    subset tags, and for CID-keyed CFF a different internal ordering of the
    FDArray sub-fonts. Counting byte-identical copies reported zero duplication
    on a file carrying six near-identical megabyte subsets, which is the whole
    problem, missed. Writing the test is what surfaced that.
    """

    digest: str
    length: int
    family: str = "?"
    stored_copies: int = 0
    references: int = 0


@dataclass
class Report:
    path: str
    size: int
    status: str
    pages: int = 0
    programs: list[Program] = field(default_factory=list)
    note: str = ""

    @property
    def glyph_bytes(self) -> int:
        return sum(p.length * p.stored_copies for p in self.programs)

    @property
    def families(self) -> dict[str, list[Program]]:
        out: dict[str, list[Program]] = {}
        for p in self.programs:
            out.setdefault(p.family, []).extend([p] * p.stored_copies)
        return out

    @property
    def duplicated_bytes(self) -> int:
        """What sharing one program per family would save.

        Not "bytes that are byte-identical" — that measure reports zero on the
        per-page-subset case, because each page's subset differs in its tag and
        its internal ordering while holding the same glyphs.
        """
        saved = 0
        for copies in self.families.values():
            if len(copies) > 1:
                saved += sum(c.length for c in copies) - max(c.length for c in copies)
        return saved

    @property
    def distinct_programs(self) -> int:
        return len(self.programs)

    @property
    def stored_programs(self) -> int:
        return sum(p.stored_copies for p in self.programs)


def _top_level_objects(raw: bytes) -> dict[int, tuple[bytes, bytes]]:
    """Object number -> (header bytes, raw stream bytes), for uncompressed objects."""
    found: dict[int, tuple[bytes, bytes]] = {}
    for match in OBJECT_HEAD.finditer(raw):
        number = int(match.group(1))
        start = match.end()
        end = raw.find(b"endobj", start)
        if end < 0:
            continue
        body = raw[start:end]
        marker = body.find(b"stream")
        if marker < 0:
            found[number] = (body, b"")
            continue
        head = body[:marker]
        data_start = marker + len(b"stream")
        while data_start < len(body) and body[data_start] in (13, 10):
            data_start += 1
        # Honour /Length when it is a direct integer. Taking everything up to
        # `endstream` instead includes the end-of-line the writer puts before
        # it, which inflated every program by a byte or two — small, but this
        # tool reports byte counts and a byte count that is quietly wrong is
        # worse than no byte count.
        declared = LENGTH.search(head)
        if declared:
            data_end = data_start + int(declared.group(1))
        else:
            data_end = body.find(b"endstream", data_start)
            if data_end > data_start and body[data_end - 1:data_end] in (b"\n", b"\r"):
                data_end -= 1
        found[number] = (head, body[data_start:data_end] if data_end > data_start else b"")
    return found


def diagnose(path: Path) -> Report:
    raw = path.read_bytes()
    size = len(raw)
    references = [int(m.group(1)) for m in FONTFILE_REF.finditer(raw)]
    pages = len(PAGE_TYPE.findall(raw))

    if not references:
        if OBJECT_STREAM.search(raw):
            return Report(str(path), size, INDETERMINATE, pages, note=(
                "font references may live in a compressed object stream, which a "
                "standard-library scan cannot read; no conclusion drawn"))
        rasterised = bool(IMAGE_XOBJECT.search(raw))
        return Report(str(path), size, SKIP_NO_GLYPHS, pages, note=(
            "no embedded glyph data" + (" (page content is imagery)" if rasterised else "")
            + " — font duplication does not apply"))

    objects = _top_level_objects(raw)
    # Which family each font program belongs to, taken from the descriptor that
    # points at it. Falls back to the program's own object number so that an
    # unnamed program is never silently merged with another.
    family_of: dict[int, str] = {}
    for head, _stream in objects.values():
        ref = FONTFILE_REF.search(head)
        if not ref:
            continue
        name = FONTNAME.search(head)
        family_of[int(ref.group(1))] = (
            name.group(2).decode("latin-1") if name else f"object-{ref.group(1).decode()}")

    by_digest: dict[str, Program] = {}
    counted: set[int] = set()
    for number in references:
        entry = objects.get(number)
        if entry is None:
            continue
        head, data = entry
        if b"/FlateDecode" in head:
            try:
                data = zlib.decompress(data)
            except zlib.error:
                pass
        digest = hashlib.md5(data).hexdigest()
        program = by_digest.setdefault(
            digest, Program(digest, len(data), family_of.get(number, f"object-{number}")))
        program.references += 1
        if number not in counted:
            counted.add(number)
            program.stored_copies += 1

    if not by_digest:
        return Report(str(path), size, INDETERMINATE, pages, note=(
            "font programs are referenced but their objects could not be located; "
            "no conclusion drawn"))
    return Report(str(path), size, MEASURED, pages, sorted(
        by_digest.values(), key=lambda p: -p.length * p.stored_copies))


def findings(report: Report) -> list[str]:
    """Observations, phrased as observations. Nothing here is a verdict."""
    if report.status != MEASURED or report.pages <= 1:
        return []
    out: list[str] = []
    if report.duplicated_bytes:
        share = report.duplicated_bytes / report.size * 100
        worst = max(report.families.items(), key=lambda kv: len(kv[1]))
        out.append(
            f"{report.stored_programs} stored font programs across {report.pages} pages, "
            f"the most repeated family being {worst[0]} at {len(worst[1])} copies. "
            f"Sharing one program per family would save {report.duplicated_bytes / MIB:.2f} "
            f"MiB, {share:.0f}% of the file. Pages rendered separately and merged afterwards "
            f"store one subset each — they differ in their subset tag and internal ordering, "
            f"so a byte-identity check does not see them. Rendering the pages into a single "
            f"document, or priming every page with the same glyph repertoire before merging, "
            f"collapses them.")
    per_page = report.glyph_bytes / max(report.pages, 1)
    if per_page > 0.5 * MIB:
        out.append(
            f"{per_page / MIB:.2f} MiB of glyph data per page. A CID-keyed CFF subset can "
            f"retain the source font's full local-subroutine index regardless of how many "
            f"glyphs it keeps; if that is the cause, the outlines are a small fraction of "
            f"this. Measuring it needs a CFF parser and is out of scope here.")
    return out


def render(reports: list[Report], as_json: bool) -> str:
    total = sum(r.size for r in reports)
    if as_json:
        return json.dumps({
            "per_file_limit_bytes": PER_FILE_LIMIT,
            "changed_total_limit_bytes": CHANGED_TOTAL_LIMIT,
            "total_bytes": total,
            "files": [{
                "path": r.path, "size_bytes": r.size, "status": r.status,
                "pages": r.pages, "distinct_programs": r.distinct_programs,
                "stored_programs": r.stored_programs,
                "glyph_bytes": r.glyph_bytes, "duplicated_bytes": r.duplicated_bytes,
                "note": r.note, "findings": findings(r),
            } for r in reports],
        }, ensure_ascii=False, indent=1)

    lines = []
    for r in reports:
        pct = r.size / PER_FILE_LIMIT * 100
        lines.append(f"{r.path}")
        lines.append(f"  {r.size / MIB:.2f} MiB ({pct:.0f}% of the 10 MiB per-file limit), "
                     f"{r.pages} page(s) — {r.status}")
        if r.note:
            lines.append(f"  {r.note}")
        if r.status == MEASURED:
            lines.append(f"  glyph data {r.glyph_bytes / MIB:.2f} MiB in "
                         f"{r.stored_programs} stored program(s), "
                         f"{r.distinct_programs} distinct")
        for f in findings(r):
            lines.append(f"  - {f}")
    lines.append("")
    lines.append(f"{len(reports)} file(s), {total / MIB:.2f} MiB together "
                 f"({total / CHANGED_TOTAL_LIMIT * 100:.0f}% of the 40 MiB changed-file total, "
                 f"which is a separate limit from the 10 MiB per-file cap).")
    return "\n".join(lines)


def collect(target: Path) -> list[Path]:
    if target.is_file():
        return [target]
    return sorted(p for p in target.rglob("*.pdf") if p.is_file())


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("target", type=Path,
                        help="a PDF, or a directory to search recursively")
    parser.add_argument("--json", action="store_true", help="machine-readable output")
    args = parser.parse_args(argv)

    if not args.target.exists():
        print(f"not found: {args.target}", file=sys.stderr)
        return 2
    paths = collect(args.target)
    if not paths:
        print(f"no PDF under {args.target}", file=sys.stderr)
        return 0
    print(render([diagnose(p) for p in paths], args.json))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
