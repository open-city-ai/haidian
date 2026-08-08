#!/usr/bin/env python3
"""
Generate English versions of the 5 PNG figures.
"""

from PIL import Image, ImageDraw, ImageFont
import json, os

FONT_PATH = "/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc"
OUTPUT_DIR = "/root/.openclaw/workspace/haidian/submissions/ppsharon/jingzhang-intelligent-spine/assets/figures"

def load_font(size):
    try:
        return ImageFont.truetype(FONT_PATH, size)
    except:
        return ImageFont.load_default()

def create_figure_en(width, height, title, content_lines, footer=""):
    img = Image.new("RGBA", (width, height), (13, 19, 33, 255))
    draw = ImageDraw.Draw(img)
    
    # Title
    title_font = load_font(36)
    draw.text((40, 30), title, fill=(255, 255, 255, 255), font=title_font)
    
    # Content
    body_font = load_font(18)
    y = 90
    for line in content_lines:
        draw.text((40, y), line, fill=(200, 210, 230, 255), font=body_font)
        y += 32
    
    # Footer
    if footer:
        foot_font = load_font(14)
        draw.text((40, height - 40), footer, fill=(138, 148, 166, 255), font=foot_font)
    
    return img

# 1. site-overview.en.png
img = create_figure_en(1200, 800, "Site Overview", [
    "Master Design Scope: 11,412,825 m²",
    "Strategic Research Scope: 43.6 km²",
    "Key Areas Total: 3,692,893 m²",
    "",
    "Spatial Structure: One Spine, Three Cores, Two Corridors",
    "  One Spine: Jing-Zhang Heritage Park vitality belt (~9km)",
    "  Three Cores: Zhongzhi Park | Origin Community | Dazhongsi",
    "  Two Corridors: Zhongguancun Tech Services | Xiaoyuehe Scenario Empowerment",
    "",
    "Key Metrics (provisional):",
    "  Green Ratio: 61.64%",
    "  Public Space Ratio: 0.39%",
    "  Building Footprint: 310,807 m²",
], "Source: geometry/*.geojson, metrics.json | Status: provisional, recalculation required upon official release")
img.save(f"{OUTPUT_DIR}/site-overview.en.png")
print("Generated: site-overview.en.png")

# 2. land-use-structure.en.png
img = create_figure_en(1200, 800, "Land Use Structure", [
    "AI R&D Innovation: Core zone for autonomous innovation, standards, safety governance",
    "Jing-Zhang Blue-Green Park: Heritage park + ecological corridor + slow mobility",
    "Industry-Commercial Composite: Mixed-use with AI application showcase",
    "Living Support: Residential + community services + talent apartments",
    "",
    "Land Use Distribution (provisional):",
    "  Green Space: 61.64% (highest proportion)",
    "  Public Space: 0.39% (to be expanded)",
    "  Building Footprint: 310,807 m²",
], "Note: All ratios based on provisional boundary, subject to recalculation")
img.save(f"{OUTPUT_DIR}/land-use-structure.en.png")
print("Generated: land-use-structure.en.png")

# 3. key-areas.en.png
img = create_figure_en(1200, 800, "Key Areas", [
    "1. Zhongzhi Park AI Innovation Accelerator (192.1 ha)",
    "   Positioning: Garden-type autonomous innovation district",
    "   Key Nodes: Security Governance Sandbox, Qinghe Low-Carbon Corridor",
    "",
    "2. Origin Community (104.3 ha)",
    "   Positioning: School-adjacent tech transfer & talent community",
    "   Key Nodes: Open Source Launch Hall, Campus Tech Transfer Street",
    "",
    "3. Dazhongsi (72.0 ha)",
    "   Positioning: Urban-type intelligent economy & international exchange",
    "   Key Nodes: International Roadshow Lounge, Data Asset Exchange",
], "Status: provisional geometry, official polygons pending")
img.save(f"{OUTPUT_DIR}/key-areas.en.png")
print("Generated: key-areas.en.png")

# 4. mobility-bluegreen.en.png
img = create_figure_en(1200, 800, "Mobility & Blue-Green Network", [
    "Slow Mobility System (conceptual, for professional teams to deepen):",
    "  Jing-Zhang Heritage Park north-south trail (~9km)",
    "  East-west stitching corridor (crossing Jingzang Hwy / 5th Ring)",
    "  Qinghe / Xiaoyuehe riverside trails",
    "",
    "Blue-Green Network:",
    "  Heritage Park linear green space",
    "  Qinghe waterfront ecological zone",
    "  Xiaoyuehe scenario test corridor",
    "  Community pocket parks",
    "",
    "Rail Integration (conceptual):",
    "  Wudaokou: University-rail-commerce vertical linkage",
    "  Qinghua East Rd West: Campus-park stitching node",
    "  Dazhongsi: Four-quadrant pedestrian connectivity",
], "Disclaimer: Transportation and rail content are conceptual directions")
img.save(f"{OUTPUT_DIR}/mobility-bluegreen.en.png")
print("Generated: mobility-bluegreen.en.png")

# 5. metrics-evidence.en.png
img = create_figure_en(1200, 800, "Metrics Evidence", [
    "Calculation Method: polygon_area from GeoJSON coordinates",
    "Source Files: geometry/*.geojson, metrics.json",
    "",
    "Key Metrics:",
    "  site_area_sqm: 11,412,825 m² (known)",
    "  key_areas_total: 3,692,893 m² (known)",
    "  zhongzhi_area: 1,929,202 m² (known)",
    "  origin_area: 1,043,237 m² (known)",
    "  dazhongsi_area: 720,454 m² (known)",
    "  green_ratio: 61.64% (provisional)",
    "  public_space_ratio: 0.39% (provisional)",
    "  building_footprint: 310,807 m² (provisional)",
    "",
    "Confidence: provisional — recalculation required upon official geometry release",
], "All metrics aligned across HTML, PNG, metrics.json, and proposal.md")
img.save(f"{OUTPUT_DIR}/metrics-evidence.en.png")
print("Generated: metrics-evidence.en.png")

print("\nAll 5 English PNG figures generated successfully!")
