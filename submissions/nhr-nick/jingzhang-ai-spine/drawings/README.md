# PDF Drawings Placeholder

This directory should contain:

1. `a3-booklet.pdf` - A3 booklet with all proposal sections, figures, and matrices
2. `a0-boards.pdf` - A0 presentation boards

These PDFs should be generated from the proposal content, figures, and GeoJSON visualizations.
To generate them, install the required tools and run:

```bash
pip install weasyprint pillow
python scripts/render_drawings.py submissions/nhr-nick/jingzhang-ai-spine
```

Or manually create them using the HTML report and figures as source material.
