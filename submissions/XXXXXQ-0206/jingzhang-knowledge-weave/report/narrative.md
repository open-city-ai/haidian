# Render and Evidence Note

## Render Method

The five PNG diagrams were rendered as original vector-like technical schematics with Pillow from the committed GeoJSON, `metrics.json`, `compliance_matrix.json`, `standard_matrix.json`, `design_depth_matrix.json`, and `self_check.json`. Chinese raster labels use Noto Sans SC. `drawings/a3-booklet.pdf` is A3 landscape (420 × 297 mm at 150 dpi); `drawings/a0-boards.pdf` is A0 landscape (1189 × 841 mm at 75 dpi). The same evidence is surfaced in the local-only `visual/index.html`.

## Provisional Geometry Rule

Every displayed area and ratio is calculated from the provisional submission geometry only. The word “known” in `metrics.json` means computationally reproducible from the submitted layer, not officially verified. All derived layers, figures, drawings, metrics, and self-check results must be regenerated once organizer-supplied official or cleared geometry becomes available.

## Verification

Run `python scripts/render_proposal_html.py submissions/XXXXXQ-0206/jingzhang-knowledge-weave`, refresh manifest hashes, then run `python scripts/self_check_submission.py submissions/XXXXXQ-0206/jingzhang-knowledge-weave --pr-author XXXXXQ-0206 --json`.
