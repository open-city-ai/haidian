#!/usr/bin/env python3
"""
Generate Logo concept for Jing-Zhang Intelligent Spine.
Concept: Abstract rail cross-section + neural network nodes forming an "∞" infinity symbol.
"""

from PIL import Image, ImageDraw, ImageFont
import os

OUTPUT_DIR = "/root/.openclaw/workspace/haidian/submissions/ppsharon/jingzhang-intelligent-spine/assets/logo"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Canvas
W, H = 800, 600
img = Image.new("RGBA", (W, H), (6, 10, 20, 255))
draw = ImageDraw.Draw(img)

# Colors
RAIL_GRAY = (74, 74, 74)
INTEL_BLUE = (0, 102, 255)
ECO_GREEN = (0, 200, 83)
GOLD = (251, 191, 36)
WHITE = (255, 255, 255)

def draw_glow_line(draw, x1, y1, x2, y2, color, width=4, glow=20):
    """Draw a line with glow effect."""
    for i in range(glow, 0, -2):
        alpha = int(30 * (i / glow))
        c = color + (alpha,)
        draw.line([(x1, y1), (x2, y2)], fill=c, width=width + i)
    draw.line([(x1, y1), (x2, y2)], fill=color + (255,), width=width)

# Background gradient effect
for y in range(H):
    alpha = int(20 * (1 - y / H))
    draw.line([(0, y), (W, y)], fill=(0, 102, 255, alpha))

# === RAIL TRACK (horizontal backbone) ===
rail_y = 280
# Main rail line
draw_glow_line(draw, 80, rail_y, 720, rail_y, INTEL_BLUE, width=6, glow=25)
# Rail ties
for x in range(100, 720, 60):
    draw_glow_line(draw, x, rail_y - 15, x, rail_y + 15, RAIL_GRAY, width=3, glow=8)

# === NEURAL NODES on the rail ===
node_positions = [
    (160, 280, 22, INTEL_BLUE),
    (280, 280, 28, INTEL_BLUE),
    (400, 280, 35, INTEL_BLUE),  # center - largest
    (520, 280, 28, INTEL_BLUE),
    (640, 280, 22, INTEL_BLUE),
]

for x, y, r, color in node_positions:
    # Glow
    for i in range(30, 0, -3):
        alpha = int(40 * (i / 30))
        draw.ellipse([x - r - i, y - r - i, x + r + i, y + r + i], fill=color + (alpha,))
    # Core
    draw.ellipse([x - r, y - r, x + r, y + r], fill=color + (255,))
    # Inner highlight
    draw.ellipse([x - r//3, y - r//3, x + r//3, y + r//3], fill=WHITE + (180,))

# === INFINITY CONNECTIONS between nodes ===
# Upper arc
for i in range(len(node_positions) - 1):
    x1, y1, r1, _ = node_positions[i]
    x2, y2, r2, _ = node_positions[i + 1]
    # Control points for bezier-like curve (upper)
    mx = (x1 + x2) / 2
    my = min(y1, y2) - 40 - abs(i - 2) * 10
    # Draw arc with segments
    steps = 20
    for j in range(steps):
        t1 = j / steps
        t2 = (j + 1) / steps
        # Quadratic bezier
        px1 = (1 - t1)**2 * x1 + 2 * (1 - t1) * t1 * mx + t1**2 * x2
        py1 = (1 - t1)**2 * y1 + 2 * (1 - t1) * t1 * my + t1**2 * y2
        px2 = (1 - t2)**2 * x1 + 2 * (1 - t2) * t2 * mx + t2**2 * x2
        py2 = (1 - t2)**2 * y1 + 2 * (1 - t2) * t2 * my + t2**2 * y2
        draw.line([(px1, py1), (px2, py2)], fill=ECO_GREEN + (120,), width=2)

# Lower arc (inverted)
for i in range(len(node_positions) - 1):
    x1, y1, r1, _ = node_positions[i]
    x2, y2, r2, _ = node_positions[i + 1]
    mx = (x1 + x2) / 2
    my = max(y1, y2) + 40 + abs(i - 2) * 10
    steps = 20
    for j in range(steps):
        t1 = j / steps
        t2 = (j + 1) / steps
        px1 = (1 - t1)**2 * x1 + 2 * (1 - t1) * t1 * mx + t1**2 * x2
        py1 = (1 - t1)**2 * y1 + 2 * (1 - t1) * t1 * my + t1**2 * y2
        px2 = (1 - t2)**2 * x1 + 2 * (1 - t2) * t2 * mx + t2**2 * x2
        py2 = (1 - t2)**2 * y1 + 2 * (1 - t2) * t2 * my + t2**2 * y2
        draw.line([(px1, py1), (px2, py2)], fill=ECO_GREEN + (120,), width=2)

# === ORBITAL NODES (floating around) ===
orbital_nodes = [
    (120, 180, 12, ECO_GREEN),
    (680, 180, 14, ECO_GREEN),
    (200, 380, 10, GOLD),
    (600, 380, 12, GOLD),
    (80, 320, 8, INTEL_BLUE),
    (720, 320, 10, INTEL_BLUE),
]

for x, y, r, color in orbital_nodes:
    for i in range(20, 0, -2):
        alpha = int(25 * (i / 20))
        draw.ellipse([x - r - i, y - r - i, x + r + i, y + r + i], fill=color + (alpha,))
    draw.ellipse([x - r, y - r, x + r, y + r], fill=color + (255,))

# Small connecting lines from orbital to main rail
for x, y, r, color in orbital_nodes:
    nearest_x = min([n[0] for n in node_positions], key=lambda nx: abs(nx - x))
    draw.line([(x, y), (nearest_x, 280)], fill=color + (60,), width=1)

# === TEXT ===
try:
    font_large = ImageFont.truetype("/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc", 42)
    font_small = ImageFont.truetype("/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc", 20)
    font_en = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 18)
except:
    font_large = ImageFont.load_default()
    font_small = font_large
    font_en = font_large

# Title
draw.text((400, 480), "京张智能脊", fill=WHITE + (255,), font=font_large, anchor="mm")
draw.text((400, 520), "Jing-Zhang Intelligent Spine", fill=(200, 200, 220, 255), font=font_en, anchor="mm")

# Tagline
draw.text((400, 555), "从蒸汽脊梁到智能神经网络", fill=(160, 160, 180, 255), font=font_small, anchor="mm")

# === SAVE ===
img.save(f"{OUTPUT_DIR}/logo_concept.png")
print(f"Logo saved: {OUTPUT_DIR}/logo_concept.png")

# === ALSO GENERATE SVG ===
svg_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#060a14"/>
      <stop offset="100%" stop-color="#0a1020"/>
    </linearGradient>
    <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="6" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  
  <rect width="800" height="600" fill="url(#bgGrad)"/>
  
  <!-- Rail track -->
  <line x1="80" y1="280" x2="720" y2="280" stroke="#0066FF" stroke-width="6" filter="url(#glow-blue)"/>
  <line x1="80" y1="280" x2="720" y2="280" stroke="#0066FF" stroke-width="2"/>
  
  <!-- Rail ties -->
  <g stroke="#4A4A4A" stroke-width="3">
    <line x1="100" y1="265" x2="100" y2="295"/>
    <line x1="160" y1="265" x2="160" y2="295"/>
    <line x1="220" y1="265" x2="220" y2="295"/>
    <line x1="280" y1="265" x2="280" y2="295"/>
    <line x1="340" y1="265" x2="340" y2="295"/>
    <line x1="400" y1="265" x2="400" y2="295"/>
    <line x1="460" y1="265" x2="460" y2="295"/>
    <line x1="520" y1="265" x2="520" y2="295"/>
    <line x1="580" y1="265" x2="580" y2="295"/>
    <line x1="640" y1="265" x2="640" y2="295"/>
    <line x1="700" y1="265" x2="700" y2="295"/>
  </g>
  
  <!-- Neural nodes -->
  <circle cx="160" cy="280" r="22" fill="#0066FF" filter="url(#glow-blue)"/>
  <circle cx="280" cy="280" r="28" fill="#0066FF" filter="url(#glow-blue)"/>
  <circle cx="400" cy="280" r="35" fill="#0066FF" filter="url(#glow-blue)"/>
  <circle cx="520" cy="280" r="28" fill="#0066FF" filter="url(#glow-blue)"/>
  <circle cx="640" cy="280" r="22" fill="#0066FF" filter="url(#glow-blue)"/>
  
  <!-- Infinity arcs -->
  <path d="M 160 280 Q 220 200 280 280" fill="none" stroke="#00C853" stroke-width="2" opacity="0.6"/>
  <path d="M 280 280 Q 340 200 400 280" fill="none" stroke="#00C853" stroke-width="2" opacity="0.6"/>
  <path d="M 400 280 Q 460 200 520 280" fill="none" stroke="#00C853" stroke-width="2" opacity="0.6"/>
  <path d="M 520 280 Q 580 200 640 280" fill="none" stroke="#00C853" stroke-width="2" opacity="0.6"/>
  <path d="M 160 280 Q 220 360 280 280" fill="none" stroke="#00C853" stroke-width="2" opacity="0.6"/>
  <path d="M 280 280 Q 340 360 400 280" fill="none" stroke="#00C853" stroke-width="2" opacity="0.6"/>
  <path d="M 400 280 Q 460 360 520 280" fill="none" stroke="#00C853" stroke-width="2" opacity="0.6"/>
  <path d="M 520 280 Q 580 360 640 280" fill="none" stroke="#00C853" stroke-width="2" opacity="0.6"/>
  
  <!-- Orbital nodes -->
  <circle cx="120" cy="180" r="12" fill="#00C853" filter="url(#glow-green)" opacity="0.8"/>
  <circle cx="680" cy="180" r="14" fill="#00C853" filter="url(#glow-green)" opacity="0.8"/>
  <circle cx="200" cy="380" r="10" fill="#fbbf24" filter="url(#glow-green)" opacity="0.8"/>
  <circle cx="600" cy="380" r="12" fill="#fbbf24" filter="url(#glow-green)" opacity="0.8"/>
  
  <!-- Text -->
  <text x="400" y="480" text-anchor="middle" fill="#FFFFFF" font-size="42" font-family="sans-serif" font-weight="bold">京张智能脊</text>
  <text x="400" y="520" text-anchor="middle" fill="#c7d2fe" font-size="18" font-family="sans-serif">Jing-Zhang Intelligent Spine</text>
  <text x="400" y="555" text-anchor="middle" fill="#8a94a6" font-size="16" font-family="sans-serif">从蒸汽脊梁到智能神经网络</text>
</svg>'''

with open(f"{OUTPUT_DIR}/logo_concept.svg", "w") as f:
    f.write(svg_content)
print(f"SVG saved: {OUTPUT_DIR}/logo_concept.svg")
