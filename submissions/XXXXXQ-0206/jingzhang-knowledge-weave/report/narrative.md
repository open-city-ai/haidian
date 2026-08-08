# Render and Evidence Note

## Knowledge Weave 2.0 Method

The package expresses two parallel concept lines: an evidence line for traceable information and a public line for voluntary, explainable, human-reviewed city services. The four gates of evidence, consent, safety, and public value are concept governance tools. They do not represent an existing approval workflow or confirmed organization.

## Render Method

The five PNG evidence boards are original programmatic technical schematics rendered with Pillow from the committed GeoJSON, `metrics.json`, matrices, and authored labels. Chinese labels use Noto Sans SC. `drawings/a3-booklet.pdf` is five A3 landscape pages (420 × 297 mm at 150 dpi); `drawings/a0-boards.pdf` is five A0 landscape pages (1189 × 841 mm at 75 dpi). The local-only `visual/index.html` mirrors the same metrics and evidence boundaries. Matching English display files use separately authored English labels and narrative; they are translation companions, not duplicate byte copies.

## Provisional Geometry Rule

Every displayed area, ratio, spatial overlay and metric derives from submitted provisional geometry only. A `known` metric is reproducible from the package, not officially verified. When organizer-supplied official or cleared geometry becomes available, replace the boundary and key-area layers, regenerate all derived geometry and metrics, redraw all five figures and both PDFs, rerender the HTML, publish a difference table, and rerun self-check.

## Verification

Run `python scripts/render_proposal_html.py submissions/XXXXXQ-0206/jingzhang-knowledge-weave`, refresh manifest hashes, then run `python scripts/self_check_submission.py submissions/XXXXXQ-0206/jingzhang-knowledge-weave --pr-author XXXXXQ-0206 --json`.
