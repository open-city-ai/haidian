#!/usr/bin/env python3
"""Generate the A0 exhibition boards and A3 booklet for the jingzhang-ai-belt package.

All graphics are vector drawings made with PyMuPDF. Content is summarized from
../proposal.md; every boundary, position and metric shown is a low-precision
provisional concept (geometry_role=provisional_constraint, official_boundary=false)
and must be recomputed once official boundary data is released.

Usage:
    python generate_drawings.py            # writes a0-boards.pdf + a3-booklet.pdf
    python generate_drawings.py --preview  # also renders PNG previews into tmp_review/
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

import fitz  # PyMuPDF

HERE = Path(__file__).resolve().parent

# ---------------------------------------------------------------- fonts ----
FONT_DIR = Path("C:/Windows/Fonts")
F_SANS = str(FONT_DIR / "msyh.ttc")      # Microsoft YaHei
F_SANS_B = str(FONT_DIR / "msyhbd.ttc")  # Microsoft YaHei Bold
F_SANS_L = str(FONT_DIR / "msyhl.ttc")   # Microsoft YaHei Light
F_MONO = str(FONT_DIR / "consola.ttf")   # Consolas
F_MONO_B = str(FONT_DIR / "consolab.ttf")

_fonts: dict[str, fitz.Font] = {}


def font_obj(name: str) -> fitz.Font:
    if name not in _fonts:
        _fonts[name] = fitz.Font(fontfile=name)
    return _fonts[name]


def text_width(s: str, fontfile: str, size: float) -> float:
    return font_obj(fontfile).text_length(s, fontsize=size)


# --------------------------------------------------------------- palette ----
def C(hexstr: str) -> tuple[float, float, float]:
    h = hexstr.lstrip("#")
    return (int(h[0:2], 16) / 255, int(h[2:4], 16) / 255, int(h[4:6], 16) / 255)


INK = C("1B2833")       # 青砖灰（深）— base ink
INK2 = C("46586A")      # secondary text
FAINT = C("7E8B96")     # captions
PAPER = C("F1EDE2")     # warm paper
PANEL = C("FBF8F0")     # card paper
HAIR = C("D8D1BF")      # hairlines
AMBER = C("D97E2B")     # 琥珀黄 — heritage / 原点社区
AMBER_D = C("B26018")
GREEN = C("2F7D5B")     # 信号绿 — 众智园 / 慢行
BLUE = C("2F6EA5")      # 青蓝 — 大钟寺 / AI 层
RIVER = C("A9C4DA")
RIVER_D = C("5B87AC")
RED = C("A63A2E")       # precision warning
RED_D = C("8C2F25")
GOLD = C("C9A227")
ROAD = C("C4BCA9")
WHITE = (1, 1, 1)
MAPBG = C("E9E4D6")

MM = 72 / 25.4
A0_W, A0_H = 1189 * MM, 841 * MM
A3_W, A3_H = 420 * MM, 297 * MM

WARNING = ("精度警示：全部边界、点位与指标均为低精度概念示意（PROVISIONAL），不具备测绘、权属、审批、"
           "精确面积或工程放样效力；正式边界发布后必须复算。")


# -------------------------------------------------------------- primitives ----
def tracked(s: str, n: int = 1) -> str:
    """Insert n spaces between characters for mono letter-tracking."""
    gap = " " * n
    return gap.join(gap if ch == " " else ch for ch in s)


def has_cjk(s: str) -> bool:
    return any(ord(ch) >= 0x2E80 for ch in s)


def safe_font(ff: str, s: str) -> str:
    """Consolas has no CJK glyphs — fall back to YaHei for mixed strings."""
    if ff in (F_MONO, F_MONO_B) and has_cjk(s):
        return F_SANS_B if ff == F_MONO_B else F_SANS
    return ff


class Cv:
    """Thin drawing helper around a fitz page."""

    def __init__(self, page: fitz.Page):
        self.p = page

    def rect(self, r, fill=None, stroke=None, sw=1.0, radius=0.0, dash=None,
             fill_op=1.0, stroke_op=1.0):
        self.p.draw_rect(fitz.Rect(r), color=stroke, fill=fill, width=sw,
                         radius=radius if radius > 0 else None,
                         dashes=dash, fill_opacity=fill_op, stroke_opacity=stroke_op)

    def line(self, pts, color=INK, sw=1.0, dash=None, op=1.0):
        self.p.draw_polyline([fitz.Point(x, y) for x, y in pts], color=color,
                             width=sw, dashes=dash, stroke_opacity=op,
                             lineCap=1, lineJoin=1)

    def circle(self, c, r, fill=None, stroke=None, sw=1.0, fill_op=1.0, stroke_op=1.0):
        self.p.draw_circle(fitz.Point(c), r, color=stroke, fill=fill, width=sw,
                           fill_opacity=fill_op, stroke_opacity=stroke_op)

    def diamond(self, cx, cy, r, fill=None, stroke=None, sw=1.0):
        pts = [fitz.Point(cx, cy - r), fitz.Point(cx + r, cy),
               fitz.Point(cx, cy + r), fitz.Point(cx - r, cy)]
        self.p.draw_polyline(pts, closePath=True, color=stroke, fill=fill, width=sw)

    def bez(self, p1, p2, p3, p4, color, sw, op=1.0, dash=None):
        self.p.draw_bezier(fitz.Point(p1), fitz.Point(p2), fitz.Point(p3),
                           fitz.Point(p4), color=color, width=sw, stroke_opacity=op,
                           dashes=dash, lineCap=1)

    def text(self, r, s, ff=F_SANS, size=12, color=INK, align=0, fontname=None):
        """insert_textbox wrapper; returns spare height (negative = overflow)."""
        ff = safe_font(ff, s)
        fname = fontname or Path(ff).stem
        rc = self.p.insert_textbox(fitz.Rect(r), s, fontname=fname, fontfile=ff,
                                   fontsize=size, color=color, align=align)
        return rc

    def text_at(self, x, y, s, ff=F_SANS, size=12, color=INK, fontname=None):
        ff = safe_font(ff, s)
        fname = fontname or Path(ff).stem
        self.p.insert_text(fitz.Point(x, y), s, fontname=fname, fontfile=ff,
                           fontsize=size, color=color)

    def text_c(self, cx, y, s, ff=F_SANS, size=12, color=INK):
        """Horizontally centered single-line text (overflow-proof)."""
        ff = safe_font(ff, s)
        self.text_at(cx - text_width(s, ff, size) / 2, y, s, ff=ff, size=size, color=color)

    def chip(self, x, y, s, bg=INK, fg=WHITE, ff=F_MONO, size=11, pad_x=9, h=22,
             stroke=None, sw=1.0):
        ff = safe_font(ff, s)
        tw = text_width(s, ff, size)
        w = tw + 2 * pad_x
        self.rect((x, y, x + w, y + h), fill=bg, stroke=stroke, sw=sw, radius=0.28)
        self.text((x, y - 0.5, x + w, y + h), s, ff=ff, size=size, color=fg, align=1)
        return w

    def wrap(self, s: str, ff: str, size: float, width: float) -> str:
        """Deterministic wrap for CJK+latin mixed text."""
        lines: list[str] = []
        for raw in s.split("\n"):
            cur = ""
            for ch in raw:
                trial = cur + ch
                if cur and text_width(trial, ff, size) > width:
                    lines.append(cur)
                    cur = ch.lstrip() if ch == " " else ch
                else:
                    cur = trial
            lines.append(cur)
        return "\n".join(lines)

    def para(self, r, s, ff=F_SANS, size=12, color=INK2, leading=1.62, align=0):
        """Wrapped paragraph with manual leading, drawn line by line. Returns end y."""
        x0, y0, x1, y1 = r
        wrapped = self.wrap(s, ff, size, x1 - x0)
        y = y0 + size * 0.96
        for ln in wrapped.split("\n"):
            self.text_at(x0, y, ln, ff=ff, size=size, color=color)
            y += size * leading
        return y - size * leading + size


# ------------------------------------------------------------ brand mark ----
def draw_logo(cv: Cv, x: float, y: float, s: float, on_dark: bool = True):
    """人字折线—上行箭头 logo: a track line that switchbacks up into an arrow."""
    rail = WHITE if on_dark else INK
    accent = AMBER
    # track with sleeper ticks (horizontal)
    cv.line([(x, y + 0.62 * s), (x + 0.52 * s, y + 0.62 * s)], color=rail, sw=0.075 * s)
    for i in range(6):
        tx = x + 0.045 * s + i * 0.088 * s
        cv.line([(tx, y + 0.545 * s), (tx, y + 0.695 * s)], color=rail, sw=0.028 * s, op=0.85)
    # switchback kink rising into arrow
    cv.line([(x + 0.52 * s, y + 0.62 * s), (x + 0.68 * s, y + 0.80 * s),
             (x + 0.80 * s, y + 0.60 * s), (x + 1.02 * s, y + 0.18 * s)],
            color=accent, sw=0.085 * s)
    # arrowhead
    ax, ay = x + 1.02 * s, y + 0.18 * s
    cv.line([(ax - 0.155 * s, ay + 0.075 * s), (ax, ay), (ax - 0.02 * s, ay + 0.17 * s)],
            color=accent, sw=0.085 * s)


# -------------------------------------------------------- corridor map ----
# Unit space 1000 x 1000; y grows downward; north is up.
U = 1000.0


def draw_corridor_map(cv: Cv, rect, detail: str = "full"):
    """Schematic corridor map. detail: 'full' (A0) or 'compact' (A3)."""
    x0, y0, x1, y1 = rect
    k = min((x1 - x0) / U, (y1 - y0) / U)
    ox, oy = x0 + ((x1 - x0) - U * k) / 2, y0 + ((y1 - y0) - U * k) / 2

    def P(px, py):
        return (ox + px * k, oy + py * k)

    def L(v):  # length scale
        return v * k

    fs = max(k * 1.0, 0.28)  # font scale factor relative to A0

    # background + dot grid texture
    cv.rect((x0, y0, x1, y1), fill=MAPBG)
    step = 40
    gx = 0
    while gx <= U:
        gy = 0
        while gy <= U:
            cv.circle(P(gx, gy), max(L(1.1), 0.5), fill=ROAD, fill_op=0.5)
            gy += step * 2
        gx += step * 2

    # ring roads (horizontal) + verticals
    for ry, name in [(806, "北三环"), (612, "北四环"), (470, "清华东路"), (296, "北五环")]:
        cv.line([P(40, ry), P(960, ry)], color=ROAD, sw=L(5))
        cv.text_at(*P(880, ry - 10), name, ff=F_SANS, size=10.5 * fs, color=INK2)
    for rx, name in [(252, "学院路"), (628, "中关村东路")]:
        cv.line([P(rx, 60), P(rx, 920)], color=ROAD, sw=L(4))
        cv.text_at(*P(rx + 8, 916), name, ff=F_SANS, size=10.5 * fs, color=INK2)

    # 清河 river band (north edge) — drawn before the boundary so the dash stays visible
    rb, rc1, rc2, re_ = P(40, 158), P(330, 108), P(660, 188), P(960, 128)
    cv.bez(rb, rc1, rc2, re_, RIVER_D, L(58), op=0.9)
    cv.bez(rb, rc1, rc2, re_, RIVER, L(46))
    cv.bez(rb, rc1, rc2, re_, WHITE, L(2.2), op=0.75, dash="[2 10] 0")
    cv.text_at(*P(70, 118), "清 河 · 蓝 绿 界 面", ff=F_SANS, size=12 * fs, color=C("3F647F"))

    # provisional boundary
    cv.rect(P(28, 46) + P(972, 936), stroke=RED, sw=L(2.6), dash="[8 6] 0", radius=0.02)
    cv.text_at(*P(46, 84), "PROVISIONAL BOUNDARY · 临时边界（低精度概念示意，正式边界发布后须复算）",
               ff=F_MONO, size=11.5 * fs, color=RED_D)

    # 慢行复合环 green dashed loop
    ex, ey, erx, ery = P(545, 590)[0], P(545, 590)[1], L(330), L(265)
    cv.p.draw_oval(fitz.Rect(ex - erx, ey - ery, ex + erx, ey + ery),
                   color=GREEN, width=L(3.4), dashes="[10 7] 0", stroke_opacity=0.85)
    cv.text_at(*P(300, 338), "蓝绿慢行复合环", ff=F_SANS, size=11.5 * fs, color=GREEN)

    # --- main axis: 上行线 (transit-line style with switchback kink) ---
    axis = [P(92, 866), P(318, 682), P(418, 764), P(512, 600), P(906, 226)]
    cv.line(axis, color=INK, sw=L(21))
    cv.line(axis, color=AMBER, sw=L(12.5))
    cv.line(axis, color=WHITE, sw=L(2.4), dash="[3 12] 0", op=0.9)
    # kink annotation
    cv.text_at(*P(452, 826), "人字折线 · 致敬青龙桥", ff=F_SANS, size=10.5 * fs, color=AMBER_D)
    cv.text_at(*P(150, 648), "京张遗址公园主轴 · 上行线", ff=F_SANS_B, size=12.5 * fs, color=AMBER_D)

    # --- key-area zones ---
    zones = [
        ((148, 700, 372, 892), BLUE, "大钟寺AI产业集聚区", "上行·编组中枢 MARSHALLING HUB", 846, 884),
        ((330, 548, 630, 800), AMBER, "北京AI原点社区", "上行·始发场 ORIGIN YARD", 558, 782),
        ((648, 170, 952, 428), GREEN, "众智园AI自主创新加速区", "上行·动力段 POWER DEPOT", 180, 224),
    ]
    for (zx0, zy0, zx1, zy1), col, name, en, tag_y, en_y in zones:
        cv.rect(P(zx0, zy0) + P(zx1, zy1), fill=col, fill_op=0.13, stroke=col, sw=L(2.6), radius=0.05)
        # name tag + EN subtitle (positions chosen to stay clear of the axis)
        tag_w = text_width(name, F_SANS_B, 13.5 * fs) + 20 * fs
        tx0, ty0 = P(zx0 + 10, tag_y)
        cv.rect((tx0, ty0, tx0 + tag_w, ty0 + 24 * fs), fill=col, radius=0.3)
        cv.text((tx0, ty0 - 0.5 * fs, tx0 + tag_w, ty0 + 25 * fs),
                name, ff=F_SANS_B, size=13.5 * fs, color=WHITE, align=1)
        cv.text_at(*P(zx0 + 12, en_y), en, ff=F_MONO, size=8.8 * fs, color=col)

    # --- stations ---
    stations = [((206, 772), "大钟寺站", "DAZHONGSI", (26, 4)),
                ((464, 684), "五道口", "WUDAOKOU", (26, 4)),
                ((730, 398), "清华东路西口", "QINGHUA E. RD W.", (-24, 48))]
    for (sx, sy), name, en, (ldx, ldy) in stations:
        cv.circle(P(sx, sy), L(17), fill=WHITE, stroke=INK, sw=L(4.5))
        cv.circle(P(sx, sy), L(6.5), fill=INK)
        lx, ly = P(sx + ldx, sy + ldy)
        cv.text_at(lx, ly, name, ff=F_SANS_B, size=12 * fs, color=INK)
        cv.text_at(lx, ly + 13 * fs, en, ff=F_MONO, size=8.2 * fs, color=INK2)

    # --- landmarks (AI 朝圣地标) ---
    marks = [((468, 726), "AI原点·零号站", AMBER_D, 1),
             ((812, 250), "清河模型罗盘", GREEN, -1),
             ((232, 826), "大钟寺·智汇钟", BLUE, 1)]
    for (mx, my), name, col, side in marks:
        cv.diamond(*P(mx, my), L(13), fill=col, stroke=WHITE, sw=L(2))
        if side > 0:
            cv.text_at(*P(mx + 22, my + 4), name, ff=F_SANS, size=10.5 * fs, color=col)
        else:
            tw = text_width(name, F_SANS, 10.5 * fs) / k
            cv.text_at(*P(mx - 22 - tw, my + 4), name, ff=F_SANS, size=10.5 * fs, color=col)

    # --- north arrow + scale note ---
    nx, ny = P(908, 106)
    cv.circle((nx, ny), L(24), stroke=INK, sw=L(2.4), fill=WHITE, fill_op=0.85)
    cv.line([(nx, ny + L(13)), (nx, ny - L(13))], color=INK, sw=L(2.6))
    cv.line([(nx - L(8), ny - L(4)), (nx, ny - L(13)), (nx + L(8), ny - L(4))], color=INK, sw=L(2.6))
    cv.text((nx - L(20), ny + L(2), nx + L(20), ny + L(24)), "N", ff=F_MONO_B, size=11 * fs, color=INK, align=1)
    cv.text_at(*P(768, 918), "概念示意 · 非比例尺 · NOT TO SCALE", ff=F_MONO, size=9.5 * fs, color=FAINT)

    if detail == "full":
        # direction labels at axis ends
        cv.text_at(*P(60, 906), "→ 西直门方向", ff=F_SANS, size=10.5 * fs, color=INK2)
        cv.text_at(*P(820, 196), "清河方向 →", ff=F_SANS, size=10.5 * fs, color=INK2)


def draw_legend_row(cv: Cv, x, y, w, fs=1.0, max_w=None):
    """Legend strip; wraps to a second row when max_w is exceeded."""
    items = [
        ("axis", "上行线主轴（遗址公园慢行轴）"),
        ("loop", "蓝绿慢行复合环"),
        ("river", "清河蓝绿界面"),
        ("road", "城市道路（示意）"),
        ("zone", "重点创新锚点（PROV）"),
        ("bound", "临时边界"),
        ("station", "轨道站点"),
        ("mark", "AI朝圣地标"),
    ]
    cx = x
    cy = y
    for kind, label in items:
        lw = text_width(label, F_SANS, 13 * fs)
        item_w = 42 * fs + lw + 30 * fs
        if max_w and cx > x and cx + item_w > x + max_w:
            cx = x
            cy += 26 * fs
        icx = cx
        if kind == "axis":
            cv.line([(icx, cy + 8 * fs), (icx + 34 * fs, cy + 8 * fs)], color=AMBER, sw=7 * fs)
            cv.line([(icx, cy + 8 * fs), (icx + 34 * fs, cy + 8 * fs)], color=WHITE, sw=1.4 * fs, dash="[2 6] 0")
        elif kind == "loop":
            cv.line([(icx, cy + 8 * fs), (icx + 34 * fs, cy + 8 * fs)], color=GREEN, sw=3 * fs, dash="[6 4] 0")
        elif kind == "river":
            cv.rect((icx, cy + 3 * fs, icx + 34 * fs, cy + 13 * fs), fill=RIVER, stroke=RIVER_D, sw=1)
        elif kind == "road":
            cv.line([(icx, cy + 8 * fs), (icx + 34 * fs, cy + 8 * fs)], color=ROAD, sw=4 * fs)
        elif kind == "zone":
            cv.rect((icx, cy + 1 * fs, icx + 20 * fs, cy + 15 * fs), fill=BLUE, fill_op=0.15, stroke=BLUE, sw=1.6)
        elif kind == "bound":
            cv.line([(icx, cy + 8 * fs), (icx + 34 * fs, cy + 8 * fs)], color=RED, sw=2 * fs, dash="[5 4] 0")
        elif kind == "station":
            cv.circle((icx + 9 * fs, cy + 8 * fs), 7.5 * fs, fill=WHITE, stroke=INK, sw=2.4 * fs)
            cv.circle((icx + 9 * fs, cy + 8 * fs), 2.8 * fs, fill=INK)
        elif kind == "mark":
            cv.diamond(icx + 9 * fs, cy + 8 * fs, 8 * fs, fill=AMBER_D, stroke=WHITE, sw=1.2)
        lx = icx + 42 * fs
        cv.text_at(lx, cy + 12.5 * fs, label, ff=F_SANS, size=13 * fs, color=INK2)
        cx = lx + lw + 30 * fs
    return cy


# ------------------------------------------------------------- page chrome ----
def a0_header(cv: Cv, title: str, page_no: str):
    cv.rect((0, 0, A0_W, 172), fill=INK)
    cv.rect((0, 172, A0_W, 180), fill=AMBER)
    draw_logo(cv, 64, 42, 86)
    cv.text_at(196, 74, "京张上行线", ff=F_SANS_B, size=33, color=WHITE)
    cv.text_at(196, 106, tracked("JINGZHANG UPLINE"), ff=F_MONO, size=15, color=AMBER)
    cv.text_at(196, 140, "百年京张AI创新带 · 城市设计国际方案征集（AI agent 方案）",
               ff=F_SANS, size=15.5, color=C("B9C4CE"))
    # right-aligned page title (text_at avoids insert_textbox height-fit failures)
    tw = text_width(title, F_SANS_B, 42)
    cv.text_at(2900 - tw, 92, title, ff=F_SANS_B, size=42, color=WHITE)
    cv.chip(2940, 52, f"A0 · {page_no}", bg=C("2A3B49"), fg=WHITE, ff=F_MONO, size=15, h=34, pad_x=14)
    cv.chip(2940, 100, "PROVISIONAL · 概念方案", bg=RED, fg=WHITE, ff=F_MONO, size=12.5, h=30, pad_x=12)
    # right-most date
    cv.text((2940, 140, 3306, 164), "2026-08 · chunfeng11221", ff=F_MONO, size=12.5, color=C("B9C4CE"), align=2)


def a0_footer(cv: Cv):
    cv.rect((0, A0_H - 84, A0_W, A0_H), fill=RED_D)
    cv.text((64, A0_H - 72, 2700, A0_H - 20), WARNING, ff=F_SANS, size=16.5, color=WHITE)
    cv.text((2700, A0_H - 72, A0_W - 64, A0_H - 20), "jingzhang-ai-belt v0.1.0",
            ff=F_MONO, size=14, color=C("EFC9BF"), align=2)


def a3_header(cv: Cv, title: str, sub: str, page_no: str):
    cv.rect((0, 0, A3_W, 62), fill=INK)
    cv.rect((0, 62, A3_W, 65.5), fill=AMBER)
    draw_logo(cv, 30, 12, 34)
    cv.text_at(96, 40, title, ff=F_SANS_B, size=21, color=WHITE)
    cv.text_at(560, 40, sub, ff=F_SANS, size=11.5, color=C("B9C4CE"))
    cv.chip(A3_W - 118, 17, f"A3 · {page_no}", bg=C("2A3B49"), fg=WHITE, ff=F_MONO, size=10.5, h=28, pad_x=10)


def a3_footer(cv: Cv):
    cv.rect((0, A3_H - 30, A3_W, A3_H), fill=RED_D)
    cv.text((34, A3_H - 26, A3_W - 34, A3_H - 6), WARNING, ff=F_SANS, size=8.6, color=WHITE)


def card_head(cv: Cv, x, y, w, num: str, title: str, size=26, chip_bg=INK):
    cv.rect((x, y + 2, x + 34, y + 36), fill=chip_bg, radius=0.18)
    cv.text((x, y + 4, x + 34, y + 36), num, ff=F_MONO_B, size=16, color=WHITE, align=1)
    cv.text_at(x + 48, y + 30, title, ff=F_SANS_B, size=size, color=INK)
    cv.line([(x, y + 52), (x + w, y + 52)], color=HAIR, sw=1.2)
    return y + 52


# ============================================================== A0 PAGE 1 ====
def build_a0_p1(page: fitz.Page):
    cv = Cv(page)
    cv.rect((0, 0, A0_W, A0_H), fill=PAPER)
    a0_header(cv, "总体空间结构与设计主张", "01 / 02")

    # ---- map panel (left)
    mp = (64, 216, 2208, 2156)
    cv.rect(mp, fill=PANEL, stroke=HAIR, sw=1.4, radius=0.012)
    cv.text_at(96, 258, "空间结构总图", ff=F_SANS_B, size=24, color=INK)
    cv.text_at(96, 286, "SCHEMATIC MASTER PLAN · 一带三核 · 多点场景 · 蓝绿慢行复合环",
               ff=F_MONO, size=13, color=FAINT)
    draw_corridor_map(cv, (96, 306, 2176, 2032), detail="full")
    # legend strip
    cv.line([(96, 2062), (2176, 2062)], color=HAIR, sw=1.2)
    cv.text_at(96, 2096, "图例", ff=F_SANS_B, size=15, color=INK)
    draw_legend_row(cv, 160, 2078, 2000)
    cv.text_at(96, 2136, "注：三处重点片区色块为 PROV-KEY-001~003 临时范围（provisional_constraint，official_boundary=false），仅用于设计讨论。",
               ff=F_SANS, size=12.5, color=FAINT)

    # ---- right column
    rx0, rx1 = 2248, 3306
    rw = rx1 - rx0

    # 01 设计主张
    y = 216
    cv.rect((rx0, y, rx1, y + 430), fill=PANEL, stroke=HAIR, sw=1.4, radius=0.03)
    yy = card_head(cv, rx0 + 36, y + 30, rw - 72, "01", "设计主张")
    cv.para((rx0 + 36, yy + 22, rx1 - 36, y + 420),
            "以京张遗址公园为历史与公共空间主轴——即「上行线」的物理轨床；以北京AI原点社区（上行·始发场）、"
            "众智园（上行·动力段）、大钟寺（上行·编组中枢）三处重点片区为创新锚点，以高校、企业、社区和轨道站点"
            "为日常网络，形成「一带三核、多点场景、蓝绿慢行复合环」的空间组织。",
            size=17.5, leading=1.66)
    cv.text_at(rx0 + 36, y + 396, "每一次出发，都是上行。 EVERY DEPARTURE IS AN UPLINK.",
               ff=F_SANS_B, size=15.5, color=AMBER_D)

    # 02 命名体系
    y = 682
    cv.rect((rx0, y, rx1, y + 560), fill=PANEL, stroke=HAIR, sw=1.4, radius=0.025)
    yy = card_head(cv, rx0 + 36, y + 30, rw - 72, "02", "命名体系 · 京张上行线")
    rows = [
        ("总概念", "京张上行线", "JINGZHANG UPLINE", INK),
        ("百年京张文化带", "记忆上行", "HERITAGE UPLINE", AMBER_D),
        ("都市AI生活体验带", "生活上行", "LIFE UPLINE", GREEN),
        ("AI融合创新带", "创新上行", "INNOVATION UPLINE", BLUE),
        ("三区", "上行·始发场 / 动力段 / 编组中枢", "ORIGIN YARD · POWER DEPOT · MARSHALLING HUB", INK2),
        ("两翼", "上行·西线 / 上行·东线", "WEST LINE · EAST LINE", INK2),
    ]
    ry = yy + 28
    for tag, zh, en, col in rows:
        cv.rect((rx0 + 36, ry - 14, rx0 + 40, ry + 2), fill=col)
        cv.text_at(rx0 + 54, ry, tag, ff=F_SANS, size=14.5, color=FAINT)
        cv.text_at(rx0 + 300, ry, zh, ff=F_SANS_B, size=16.5, color=INK)
        cv.text_at(rx0 + 300, ry + 20, en, ff=F_MONO, size=10.5, color=col)
        ry += 66
    cv.para((rx0 + 36, ry - 2, rx1 - 36, y + 552),
            "「上行」双关：铁路术语（驶向北京方向的股道）× 通信术语 uplink（数据上传通道）——一条曾把人和物资"
            "送进北京城的铁路，今天成为把智能与创意送向世界的通道。",
            size=13.5, leading=1.55, color=INK2)

    # 03 核心指标
    y = 1278
    cv.rect((rx0, y, rx1, y + 540), fill=PANEL, stroke=HAIR, sw=1.4, radius=0.025)
    yy = card_head(cv, rx0 + 36, y + 30, rw - 72, "03", "核心指标（待复算）")
    metrics = [
        ("总体设计范围面积", "11.41", "km²", "PROV · 临时边界复算"),
        ("重点详细设计片区", "3", "处 · 公告 368.4 ha", "PROV-KEY-001~003"),
        ("绿地率 / 公共空间比例", "12.3 / 7.3", "%", "PROV · 图层复算"),
        ("建筑基底面积", "31.1", "万 m²", "PROV · 图层复算"),
        ("容积率 · 建筑高度", "—", "待正式控规条件确认", "UNKNOWN"),
    ]
    my = yy + 40
    for label, val, unit, tag in metrics:
        cv.text_at(rx0 + 36, my, label, ff=F_SANS, size=15.5, color=INK2)
        cv.text_at(rx0 + 36, my + 52, val, ff=F_MONO_B, size=38, color=INK)
        vw = text_width(val, F_MONO_B, 38)
        cv.text_at(rx0 + 44 + vw, my + 50, unit, ff=F_SANS, size=13.5, color=FAINT)
        cv.chip(rx1 - 320, my + 26, tag, bg=WHITE, fg=RED_D if "PROV" in tag else INK2,
                ff=F_MONO, size=10.5, h=26, pad_x=10, stroke=HAIR, sw=1)
        my += 96
        if label != metrics[-1][0]:
            cv.line([(rx0 + 36, my - 14), (rx1 - 36, my - 14)], color=HAIR, sw=0.8)

    # 04 证据链与设计边界
    y = 1854
    cv.rect((rx0, y, rx1, 2156), fill=PANEL, stroke=HAIR, sw=1.4, radius=0.04)
    yy = card_head(cv, rx0 + 36, y + 26, rw - 72, "04", "证据链 · 设计边界", size=22)
    refs = ["source:OFFICIAL-ANNOUNCEMENT", "source:AGENT-TASKBOOK", "source:SITE-PACKAGE",
            "data:geometry/site_boundary.geojson#SITE-001", "data:geometry/key_areas.geojson#PROV-KEY-001~003",
            "metric:site_area_sqm · green_ratio · public_space_ratio"]
    ry = yy + 10
    for r_ in refs:
        ry += cv.chip(rx0 + 36, ry, r_, bg=WHITE, fg=INK2, ff=F_MONO, size=10, h=24, pad_x=8,
                      stroke=HAIR, sw=1) * 0 + 28
    cv.para((rx0 + 36, ry + 4, rx1 - 36, 2146),
            "本展板为概念设计表达：道路红线、轨道、市政、河道、防洪、文保、消防、土地与房屋权属均待主管或"
            "权利主体确认；正式控规条件发布前不给出审定指标。",
            size=13, leading=1.5)

    a0_footer(cv)


# ============================================================== A0 PAGE 2 ====
def mini_origin(cv: Cv, r):
    """原点社区 mini-plan: 慢行主轴缝合校区/园区/街区 + 成果转化街 + 零号站."""
    x0, y0, x1, y1 = r
    k = min((x1 - x0) / U, (y1 - y0) / U) * 1.0
    ox, oy = x0 + ((x1 - x0) - U * k) / 2, y0 + ((y1 - y0) - U * k) / 2
    P = lambda px, py: (ox + px * k, oy + py * k)
    L = lambda v: v * k
    fs = max(16 * k, 7.0)
    cv.rect(r, fill=MAPBG)
    # campus blocks (left) / park (right)
    for bx in range(3):
        for by in range(4):
            cv.rect(P(70 + bx * 122, 100 + by * 200) + P(166 + bx * 122, 252 + by * 200),
                    fill=C("D8CFBB"), stroke=ROAD, sw=L(2), radius=0.06)
    cv.text_at(*P(70, 66), "校 区", ff=F_SANS, size=fs, color=FAINT)
    cv.rect(P(770, 60) + P(940, 930), fill=GREEN, fill_op=0.14, stroke=GREEN, sw=L(2))
    cv.text_at(*P(770, 44), "园区 · 公园", ff=F_SANS, size=fs, color=GREEN)
    # spine
    spine = [P(580, 900), P(548, 640), P(604, 556), P(560, 380), P(580, 130)]
    cv.line(spine, color=INK, sw=L(16))
    cv.line(spine, color=AMBER, sw=L(9))
    cv.line(spine, color=WHITE, sw=L(1.8), dash="[3 10] 0")
    cv.text_at(*P(610, 946), "南北慢行主轴", ff=F_SANS_B, size=fs, color=AMBER_D)
    # storefront units along spine
    for uy in range(180, 800, 88):
        cv.rect(P(452, uy) + P(500, uy + 52), fill=WHITE, stroke=AMBER_D, sw=L(2.4), radius=0.12)
        cv.line([P(430, uy + 26), P(452, uy + 26)], color=AMBER_D, sw=L(1.8), dash="[3 3] 0")
    cv.text_at(*P(70, 946), "沿街首层 50–120㎡ 可分合单元（成果转化街）", ff=F_SANS, size=fs * 0.92, color=AMBER_D)
    # nodes
    for ny, name in [(290, "01 开源发布厅"), (520, "09 社区服务岛"), (700, "成果橱窗")]:
        cv.circle(P(566, ny), L(15), fill=WHITE, stroke=AMBER_D, sw=L(3.4))
        cv.text_at(*P(592, ny + 5), name, ff=F_SANS, size=fs * 0.92, color=INK2)
    # station + landmark
    cv.circle(P(580, 116), L(17), fill=WHITE, stroke=INK, sw=L(4))
    cv.circle(P(580, 116), L(6), fill=INK)
    cv.text_at(*P(608, 122), "轨道站点 · 一体化", ff=F_SANS, size=fs * 0.92, color=INK)
    cv.diamond(*P(545, 856), L(15), fill=AMBER_D, stroke=WHITE, sw=L(2))
    cv.text_at(*P(576, 862), "零号站（清华园站旧址外侧）", ff=F_SANS, size=fs * 0.92, color=AMBER_D)


def mini_zhongzhi(cv: Cv, r):
    """众智园 mini-plan: 滨水界面 + 院落组团 + 混行测试环 + 模型罗盘."""
    x0, y0, x1, y1 = r
    k = min((x1 - x0) / U, (y1 - y0) / U)
    ox, oy = x0 + ((x1 - x0) - U * k) / 2, y0 + ((y1 - y0) - U * k) / 2
    P = lambda px, py: (ox + px * k, oy + py * k)
    L = lambda v: v * k
    fs = max(16 * k, 7.0)
    cv.rect(r, fill=MAPBG)
    # river
    cv.bez(P(20, 110), P(320, 52), P(660, 148), P(980, 92), RIVER_D, L(60), op=0.9)
    cv.bez(P(20, 110), P(320, 52), P(660, 148), P(980, 92), RIVER, L(46))
    cv.text_at(*P(56, 102), "清 河", ff=F_SANS, size=fs, color=C("3F647F"))
    # waterfront platform
    cv.line([P(60, 196), P(940, 178)], color=GREEN, sw=L(7))
    cv.line([P(60, 196), P(940, 178)], color=WHITE, sw=L(1.6), dash="[2 8] 0")
    for dx in (170, 500, 830):
        cv.rect(P(dx, 172) + P(dx + 42, 200), fill=GREEN, radius=0.2)
    cv.text_at(*P(600, 162), "连续滨水界面 · 呢厂织纹肌理", ff=F_SANS, size=fs * 0.92, color=GREEN)
    # courtyard clusters 2-4F
    for gx in range(3):
        for gy in range(2):
            cx0, cy0 = 110 + gx * 300, 300 + gy * 250
            for px in range(2):
                for py in range(2):
                    cv.rect(P(cx0 + px * 92, cy0 + py * 92) + P(cx0 + px * 92 + 68, cy0 + py * 92 + 68),
                            fill=WHITE, stroke=GREEN, sw=L(2.6), radius=0.1)
    cv.text_at(*P(110, 268), "院落组团 2–4F · 厂房改造中试测试", ff=F_SANS, size=fs * 0.92, color=INK2)
    # robot test loop
    ex, ey = P(480, 850)
    cv.p.draw_oval(fitz.Rect(ex - L(370), ey - L(95), ex + L(370), ey + L(95)),
                   color=INK2, width=L(3), dashes="[8 6] 0")
    cv.text_c(P(480, 856)[0], P(480, 856)[1], "03 具身机器人混行测试场（可封闭支路）",
              ff=F_SANS, size=fs * 0.92, color=INK2)
    # compass landmark at entry plaza (bottom-right, clear of blocks and loop)
    cvx, cvy = P(905, 780)
    cv.circle((cvx, cvy), L(34), stroke=GREEN, sw=L(3.4), fill=WHITE)
    cv.circle((cvx, cvy), L(20), stroke=GREEN, sw=L(2))
    cv.diamond(cvx, cvy, L(12), fill=GREEN)
    cv.text_c(cvx, cvy + L(66), "清河模型罗盘", ff=F_SANS_B, size=fs, color=GREEN)


def mini_dazhongsi(cv: Cv, r):
    """大钟寺 mini-plan: 站点一体化 + 四象限步行 + 智汇钟 + 路演客厅."""
    x0, y0, x1, y1 = r
    k = min((x1 - x0) / U, (y1 - y0) / U)
    ox, oy = x0 + ((x1 - x0) - U * k) / 2, y0 + ((y1 - y0) - U * k) / 2
    P = lambda px, py: (ox + px * k, oy + py * k)
    L = lambda v: v * k
    fs = max(16 * k, 7.0)
    cv.rect(r, fill=MAPBG)
    # crossing roads (四象限)
    cv.line([P(60, 470), P(940, 420)], color=ROAD, sw=L(16))
    cv.line([P(490, 60), P(520, 940)], color=ROAD, sw=L(16))
    # axis / metro line
    cv.line([P(60, 700), P(940, 260)], color=INK, sw=L(14))
    cv.line([P(60, 700), P(940, 260)], color=BLUE, sw=L(8))
    cv.line([P(60, 700), P(940, 260)], color=WHITE, sw=L(1.6), dash="[3 10] 0")
    # quadrant blocks (骑楼界面)
    quads = [((140, 130), "转角广场 · 骑楼界面"), ((660, 110), ""),
             ((130, 590), ""), ((670, 570), "地面优先过街")]
    for (qx, qy), qlabel in quads:
        cv.rect(P(qx, qy) + P(qx + 200, qy + 170), fill=BLUE, fill_op=0.12, stroke=BLUE, sw=L(2.6), radius=0.06)
        cv.line([P(qx, qy + 170), P(qx + 200, qy + 170)], color=BLUE, sw=L(6))
        if qlabel:
            cv.text_at(*P(qx, qy - 18), qlabel, ff=F_SANS, size=fs * 0.92, color=BLUE)
    # roadshow hall + cleanroom
    cv.rect(P(140, 630) + P(370, 770), fill=WHITE, stroke=AMBER_D, sw=L(2.6), radius=0.08)
    cv.text_c(P(255, 682)[0], P(255, 682)[1], "05 国际路演客厅", ff=F_SANS_B, size=fs, color=AMBER_D)
    cv.text_c(P(255, 726)[0], P(255, 726)[1], "沿街首层 · 300 座主厅", ff=F_SANS, size=fs * 0.85, color=INK2)
    cv.rect(P(620, 800) + P(890, 910), fill=WHITE, stroke=INK2, sw=L(2.4), radius=0.08)
    cv.text_c(P(755, 848)[0], P(755, 848)[1], "08 授权数据洁净室", ff=F_SANS_B, size=fs, color=INK2)
    cv.text_c(P(755, 888)[0], P(755, 888)[1], "可控访问 · 原始数据不出域", ff=F_SANS, size=fs * 0.85, color=INK2)
    # station box (on the axis)
    cv.rect(P(425, 370) + P(605, 495), fill=INK, radius=0.12)
    cv.text_c(P(515, 424)[0], P(515, 424)[1], "大钟寺站", ff=F_SANS_B, size=fs * 1.15, color=WHITE)
    cv.text_c(P(515, 462)[0], P(515, 462)[1], "站厅·地面·连廊", ff=F_SANS, size=fs * 0.82, color=C("B9C4CE"))
    # bell landmark rings
    bx, by = P(790, 690)
    for rr, col in [(52, BLUE), (36, AMBER_D), (20, GREEN)]:
        cv.circle((bx, by), L(rr), stroke=col, sw=L(3))
    cv.text_c(bx, by + L(84), "智汇钟 · 四象限集合点", ff=F_SANS_B, size=fs, color=BLUE)


def build_a0_p2(page: fitz.Page):
    cv = Cv(page)
    cv.rect((0, 0, A0_W, A0_H), fill=PAPER)
    a0_header(cv, "重点区域详细设计与实施台账", "02 / 02")

    cards = [
        dict(name="北京AI原点社区", zhsub="上行·始发场", ensub="ORIGIN YARD", tag="近校型成果转化与人才社区",
             col=AMBER, dark=AMBER_D, draw=mini_origin,
             acts=["南北慢行主轴缝合校区、园区与街区，打通围墙断点",
                   "沿街首层改造为 50–120㎡ 可分合成果转化单元",
                   "清华园站旧址外侧设零号站地标，不占文保本体"],
             scenes=["01 开源发布厅", "07 成果转化街", "09 社区服务岛"],
             rights="校地 / 房屋 / 成果知识产权待确认"),
        dict(name="众智园AI自主创新加速区", zhsub="上行·动力段", ensub="POWER DEPOT", tag="花园型全栈自主创新街区",
             col=GREEN, dark=GREEN, draw=mini_zhongzhi,
             acts=["临清河打开连续滨水界面，延续呢厂织纹肌理",
                   "院落式 2–4 层组团，厂房改造为中试与测试空间",
                   "可封闭支路设机器人混行测试场，预约时段运转"],
             scenes=["02 安全沙盒", "03 混行工场", "06 快试坊", "10 观测廊"],
             rights="河道 / 岸线 / 防洪 / 场地权利待确认"),
        dict(name="大钟寺AI产业集聚区", zhsub="上行·编组中枢", ensub="MARSHALLING HUB", tag="城市型智能经济与国际交往街区",
             col=BLUE, dark=BLUE, draw=mini_dazhongsi,
             acts=["大钟寺站一体化，路口四象限地面优先步行连通",
                   "沿街首层布置国际路演客厅、样机库与商业服务",
                   "规划绿地复合利用，出站广场设智汇钟地标"],
             scenes=["05 路演客厅", "08 数据洁净室"],
             rights="轨道 / 道路 / 市政 / 绿地权利待确认"),
    ]
    cw, gap = 1050, 46
    for i, cd in enumerate(cards):
        cx0 = 64 + i * (cw + gap)
        cx1 = cx0 + cw
        cy0, cy1 = 216, 1560
        cv.rect((cx0, cy0, cx1, cy1), fill=PANEL, stroke=HAIR, sw=1.4, radius=0.02)
        # header band
        cv.rect((cx0, cy0, cx1, cy0 + 128), fill=cd["col"], radius=0.02)
        cv.rect((cx0, cy0 + 96, cx1, cy0 + 128), fill=cd["col"])
        cv.text_at(cx0 + 34, cy0 + 50, cd["name"], ff=F_SANS_B, size=29, color=WHITE)
        zhw = text_width(cd["zhsub"], F_SANS_B, 15)
        cv.text_at(cx0 + 34, cy0 + 82, cd["zhsub"], ff=F_SANS_B, size=15, color=WHITE)
        cv.text_at(cx0 + 44 + zhw, cy0 + 82, cd["ensub"], ff=F_MONO, size=12.5, color=C("F3E9DC"))
        cv.text_at(cx0 + 34, cy0 + 110, cd["tag"], ff=F_SANS, size=13.5, color=WHITE)
        # diagram
        cd["draw"](cv, (cx0 + 26, cy0 + 154, cx1 - 26, cy0 + 830))
        cv.text_at(cx0 + 34, cy0 + 862, "概念平面 · 非比例尺 · PROV", ff=F_MONO, size=10.5, color=FAINT)
        # spatial actions
        ay = cy0 + 900
        cv.text_at(cx0 + 34, ay, "空间动作", ff=F_SANS_B, size=17, color=INK)
        ay += 34
        for j, act in enumerate(cd["acts"]):
            cv.rect((cx0 + 34, ay - 12, cx0 + 40, ay - 6), fill=cd["col"])
            ay = cv.para((cx0 + 52, ay - 22, cx1 - 34, ay + 40), act, size=14.5, color=INK2, leading=1.5) + 34
        # scenes
        ay += 6
        cv.text_at(cx0 + 34, ay, "AI 场景", ff=F_SANS_B, size=17, color=INK)
        ay += 12
        sx = cx0 + 34
        for sc in cd["scenes"]:
            wused = cv.chip(sx, ay, sc, bg=WHITE, fg=cd["dark"], ff=F_SANS, size=12.5, h=30,
                            pad_x=10, stroke=cd["col"], sw=1.2)
            sx += wused + 12
        # rights
        cv.line([(cx0 + 34, cy1 - 78), (cx1 - 34, cy1 - 78)], color=HAIR, sw=1)
        cv.text_at(cx0 + 34, cy1 - 44, "权利状态", ff=F_SANS_B, size=14, color=INK)
        cv.chip(cx0 + 130, cy1 - 66, "公开信息", bg=WHITE, fg=GREEN, ff=F_SANS, size=11.5, h=26, stroke=GREEN, sw=1)
        cv.chip(cx0 + 238, cy1 - 66, "权利人待确认", bg=WHITE, fg=RED_D, ff=F_SANS, size=11.5, h=26, stroke=RED, sw=1)
        cv.chip(cx0 + 386, cy1 - 66, "概念建议", bg=WHITE, fg=INK2, ff=F_SANS, size=11.5, h=26, stroke=HAIR, sw=1)
        cv.text_at(cx0 + 34, cy1 - 12, cd["rights"], ff=F_SANS, size=12.5, color=FAINT)

    # ---- bottom band
    by0, by1 = 1600, 2156
    # ledger
    lx0, lx1 = 64, 2040
    cv.rect((lx0, by0, lx1, by1), fill=PANEL, stroke=HAIR, sw=1.4, radius=0.02)
    yy = card_head(cv, lx0 + 36, by0 + 26, lx1 - lx0 - 72, "05", "实施项目 · 逐资产权利台账（JZ-01 ~ JZ-06）", size=24)
    ledger = [
        ("JZ-01", "京张遗址公园慢行断点缝合", "道路 / 公园管理权待确认"),
        ("JZ-02", "众智园清河创新界面", "河道 / 岸线 / 防洪权利待确认"),
        ("JZ-03", "原点社区近校成果转化街", "校地 / 房屋 / 成果权利待确认"),
        ("JZ-04", "大钟寺站四象限步行连通", "轨道 / 道路 / 市政权利待确认"),
        ("JZ-05", "AI公共服务与端侧算力节点", "场地 / 设备 / 软件 / 数据权利待确认"),
        ("JZ-06", "全球AI活动周公共路线", "场地 / 版权 / 商标 / 肖像待确认"),
    ]
    ry = yy + 18
    rh = (by1 - 30 - ry) / 6
    for pid, name, pending in ledger:
        cv.chip(lx0 + 36, ry + rh / 2 - 15, pid, bg=INK, fg=AMBER, ff=F_MONO_B, size=14, h=30, pad_x=12)
        cv.text_at(lx0 + 150, ry + rh / 2 - 4, name, ff=F_SANS_B, size=17.5, color=INK)
        cv.text_at(lx0 + 150, ry + rh / 2 + 20, pending, ff=F_SANS, size=12.5, color=FAINT)
        cv.chip(lx1 - 320, ry + rh / 2 - 14, "公开 / 待确认 / 概念建议", bg=WHITE, fg=GREEN,
                ff=F_SANS, size=11.5, h=28, pad_x=10, stroke=GREEN, sw=1)
        ry += rh
        if pid != "JZ-06":
            cv.line([(lx0 + 36, ry), (lx1 - 36, ry)], color=HAIR, sw=0.8)

    # phasing + loop
    px0, px1 = 2086, 3306
    cv.rect((px0, by0, px1, by1), fill=PANEL, stroke=HAIR, sw=1.4, radius=0.02)
    yy = card_head(cv, px0 + 36, by0 + 26, px1 - px0 - 72, "06", "分期策略 · 清权闭环", size=24)
    phases = [
        ("近期", "导视、开放日、可逆微更新与数据治理试点", GREEN),
        ("中期", "慢行断点、滨水界面与公共服务节点，权属及专业条件确认后建设", AMBER_D),
        ("长期", "轨道一体化、片区更新与协同运营，以法定规划及实施主体为准", BLUE),
    ]
    ry = yy + 30
    for tag, txt, col in phases:
        cv.chip(px0 + 36, ry, tag, bg=col, fg=WHITE, ff=F_SANS_B, size=13.5, h=30, pad_x=12)
        cv.para((px0 + 130, ry - 4, px1 - 36, ry + 60), txt, size=14, color=INK2, leading=1.5)
        ry += 76
    cv.line([(px0 + 36, ry + 6), (px1 - 36, ry + 6)], color=HAIR, sw=1)
    steps = ["公开资料", "概念方案", "权利人确认", "专业审批", "工程设计", "实施评估"]
    sx, sy = px0 + 36, ry + 40
    for i, st in enumerate(steps):
        wused = cv.chip(sx, sy, st, bg=INK if i in (2, 3) else WHITE,
                        fg=WHITE if i in (2, 3) else INK, ff=F_SANS, size=12.5, h=32, pad_x=12,
                        stroke=None if i in (2, 3) else HAIR, sw=1)
        sx += wused + 8
        if i < len(steps) - 1:
            cv.text_at(sx - 4, sy + 22, "→", ff=F_SANS, size=14, color=FAINT)
            sx += 22
    cv.para((px0 + 36, sy + 52, px1 - 36, by1 - 24),
            "每一阶段均不得以前一阶段的概念表达替代后续许可；正式深化执行「一项目一清权单」，补录权利人、"
            "权利类型、依据文件、授权范围、有效期与核验日期。",
            size=13.5, leading=1.55)

    a0_footer(cv)


# ============================================================== A3 PAGES ====
def build_a3_cover(page: fitz.Page):
    cv = Cv(page)
    cv.rect((0, 0, A3_W, A3_H), fill=INK)
    # subtle texture: faint horizontal rules
    ty = 30.0
    while ty < A3_H:
        cv.line([(0, ty), (A3_W, ty)], color=WHITE, sw=0.4, op=0.045)
        ty += 46

    # top brand row
    draw_logo(cv, 48, 40, 44)
    cv.text_at(120, 62, "百年京张AI创新带城市设计国际方案征集", ff=F_SANS, size=13, color=C("B9C4CE"))
    cv.text_at(120, 84, "CENTENNIAL JINGZHANG AI INNOVATION BELT · URBAN DESIGN OPEN CALL",
               ff=F_MONO, size=8.5, color=C("7E8B96"))
    cv.chip(A3_W - 150, 44, "A3 文册 · 5P", bg=C("2A3B49"), fg=WHITE, ff=F_MONO, size=10.5, h=26, pad_x=10)

    # big title block
    cv.text_at(64, 268, "京张上行线", ff=F_SANS_B, size=108, color=WHITE)
    cv.text_at(68, 318, tracked("JINGZHANG UPLINE", 1), ff=F_MONO, size=25, color=AMBER)
    cv.text_at(68, 366, "百年京张AI创新带 · 城市设计提案", ff=F_SANS, size=25, color=WHITE)
    cv.text_at(68, 398, "从铁轨到数据轨 · 每一次出发，都是上行", ff=F_SANS, size=12.5, color=C("9FB0BD"))
    cv.text_at(68, 420, "FROM RAILWAY TO DATA TRACK — EVERY DEPARTURE IS AN UPLINK",
               ff=F_MONO, size=10.5, color=C("7E8B96"))

    # ascending track graphic with three stations
    pts = [(40, 700), (300, 610), (400, 664), (500, 576), (760, 470), (1160, 350)]
    cv.line(pts, color=C("33465A"), sw=26)
    cv.line(pts, color=AMBER, sw=15)
    cv.line(pts, color=WHITE, sw=2.2, dash="[3 12] 0", op=0.85)
    stops = [((352, 632), "上行·始发场 · 北京AI原点社区", "ORIGIN YARD", AMBER),
             ((640, 520), "上行·动力段 · 众智园", "POWER DEPOT", GREEN),
             ((960, 408), "上行·编组中枢 · 大钟寺", "MARSHALLING HUB", BLUE)]
    for (sx, sy), zh, en, col in stops:
        cv.circle((sx, sy), 13, fill=INK, stroke=WHITE, sw=3)
        cv.circle((sx, sy), 5.5, fill=col)
        cv.text_at(sx + 24, sy - 10, zh, ff=F_SANS_B, size=14.5, color=WHITE)
        cv.text_at(sx + 24, sy + 12, en, ff=F_MONO, size=8.5, color=C("9FB0BD"))
    cv.text_at(48, 742, "↑ 上行方向 · 西直门 — 清河", ff=F_SANS, size=11, color=C("8FA0AE"))

    # index (right column)
    ix, iy = 880, 120
    cv.text_at(ix, iy, "文册索引", ff=F_SANS_B, size=15, color=AMBER)
    entries = ["总体概念与设计依据", "总体空间结构与平面布局", "交通、蓝绿与公共空间系统",
               "三处重点区域详细设计", "项目分期、权利台账与复核"]
    for i, e in enumerate(entries):
        cv.text_at(ix, iy + 34 + i * 26, f"0{i+1}", ff=F_MONO_B, size=11.5, color=AMBER)
        cv.text_at(ix + 34, iy + 34 + i * 26, e, ff=F_SANS, size=11.5, color=C("D6DEE5"))

    # bottom meta band
    cv.line([(48, A3_H - 78), (A3_W - 48, A3_H - 78)], color=C("33465A"), sw=1.2)
    meta = [("参赛 AGENT", "chunfeng11221"), ("方案包", "jingzhang-ai-belt v0.1.0"),
            ("阶段", "FORMAL · 概念方案"), ("日期", "2026-08")]
    mx = 48
    for k_, v_ in meta:
        cv.text_at(mx, A3_H - 54, k_, ff=F_MONO, size=8.5, color=C("7E8B96"))
        cv.text_at(mx, A3_H - 32, v_, ff=F_SANS_B, size=11.5, color=WHITE)
        mx += text_width(v_, F_SANS_B, 11.5) + 120
    cv.chip(A3_W - 250, A3_H - 66, "PROVISIONAL · 低精度概念示意 · 须复算",
            bg=RED, fg=WHITE, ff=F_MONO, size=9.5, h=26, pad_x=10)


def build_a3_structure(page: fitz.Page):
    cv = Cv(page)
    cv.rect((0, 0, A3_W, A3_H), fill=PAPER)
    a3_header(cv, "总体空间结构与平面布局", "SCHEMATIC MASTER PLAN", "02 / 05")
    # map
    cv.rect((34, 84, 758, 796), fill=PANEL, stroke=HAIR, sw=1, radius=0.02)
    draw_corridor_map(cv, (44, 96, 748, 730), detail="compact")
    cv.line([(44, 738), (748, 738)], color=HAIR, sw=0.8)
    cv.text_at(48, 758, "图例", ff=F_SANS_B, size=9.5, color=INK)
    draw_legend_row(cv, 92, 742, 640, fs=0.72, max_w=648)
    cv.text_at(48, 790, "PROV-KEY-001~003 临时范围 · 概念示意非比例尺", ff=F_MONO, size=7.5, color=FAINT)

    rx0, rx1 = 782, A3_W - 34
    y = 84
    cv.rect((rx0, y, rx1, y + 250), fill=PANEL, stroke=HAIR, sw=1, radius=0.04)
    yy = card_head(cv, rx0 + 24, y + 18, rx1 - rx0 - 48, "01", "平面布局描述", size=15)
    cv.para((rx0 + 24, yy + 10, rx1 - 24, y + 240),
            "琥珀主轴沿京张遗址公园串联三处创新锚点；青蓝水系形成生态与雨洪骨架；绿色慢行环叠合遗址、"
            "公园、社区与站点；横向城市道路承担对外交通，内部以步行与骑行微循环补齐断点。",
            size=10.5, leading=1.62)

    y = 350
    cv.rect((rx0, y, rx1, y + 210), fill=PANEL, stroke=HAIR, sw=1, radius=0.04)
    yy = card_head(cv, rx0 + 24, y + 18, rx1 - rx0 - 48, "02", "三层范围", size=15)
    cv.para((rx0 + 24, yy + 10, rx1 - 24, y + 200),
            "统筹研究 43.6 km²：创新链与未来城市形态。\n总体设计 11.4 km²：用地、建筑、交通、市政、"
            "蓝绿与风貌协同。\n重点区域 368.4 ha：功能、建筑、公共空间、交通与实施项目落位。",
            size=10.5, leading=1.62)

    y = 576
    cv.rect((rx0, y, rx1, 796), fill=PANEL, stroke=HAIR, sw=1, radius=0.04)
    yy = card_head(cv, rx0 + 24, y + 18, rx1 - rx0 - 48, "03", "核心指标（待复算）", size=15)
    rows = [("范围面积", "11.41 km² · PROV"), ("重点片区", "3 处 · 368.4 ha"),
            ("绿地 / 公共空间", "12.3% / 7.3%"), ("建筑基底", "31.1 万 m²"), ("容积率", "待正式控规")]
    ry = yy + 26
    for k_, v_ in rows:
        cv.text_at(rx0 + 24, ry, k_, ff=F_SANS, size=10, color=INK2)
        cv.text_at(rx0 + 170, ry, v_, ff=F_MONO, size=10, color=INK)
        ry += 24
        cv.line([(rx0 + 24, ry - 16), (rx1 - 24, ry - 16)], color=HAIR, sw=0.5)
    a3_footer(cv)


def build_a3_mobility(page: fitz.Page):
    cv = Cv(page)
    cv.rect((0, 0, A3_W, A3_H), fill=PAPER)
    a3_header(cv, "交通、蓝绿与公共空间系统", "MULTI-NETWORK COMPOSITE", "03 / 05")
    cv.rect((34, 84, 758, 620), fill=PANEL, stroke=HAIR, sw=1, radius=0.02)
    draw_corridor_map(cv, (44, 96, 748, 608), detail="compact")

    # bottom note card
    cv.rect((34, 636, 758, 796), fill=PANEL, stroke=HAIR, sw=1, radius=0.02)
    yy = card_head(cv, 58, 654, 700, "!", "设计控制", size=15, chip_bg=RED)
    cv.para((58, yy + 12, 734, 788),
            "道路红线、轨道安全、市政管线、河道蓝线、消防、文保和产权均列为待确认条件。先实施可逆的导视、"
            "活动和微更新试点，再在正式资料与许可完备后推进工程建设。",
            size=10.5, leading=1.6)

    rx0, rx1 = 782, A3_W - 34
    blocks = [
        ("01", "交通与轨道", BLUE,
         "围绕五道口、清华东路西口、大钟寺等站点组织步行接驳；桥下与交叉口断点采用连续过街、"
         "骑行停放和夜间照明策略。"),
        ("02", "蓝绿系统", GREEN,
         "沿清河及遗址公园形成雨洪调蓄、生态缓冲和低干扰活动界面；河道蓝线、防洪和生态条件未取得前"
         "不落实施工边界。"),
        ("03", "公共空间", AMBER_D,
         "将开源发布、原型测试、社区服务和文化走读嵌入可达的广场、街角和廊道，以预约、导览和人工复核"
         "控制开放风险。"),
    ]
    y = 84
    for num, title, col, txt in blocks:
        cv.rect((rx0, y, rx1, y + 224), fill=PANEL, stroke=HAIR, sw=1, radius=0.04)
        yy = card_head(cv, rx0 + 24, y + 18, rx1 - rx0 - 48, num, title, size=15, chip_bg=col)
        cv.para((rx0 + 24, yy + 10, rx1 - 24, y + 214), txt, size=10.5, leading=1.62)
        y += 244
    a3_footer(cv)


def build_a3_keyareas(page: fitz.Page):
    cv = Cv(page)
    cv.rect((0, 0, A3_W, A3_H), fill=PAPER)
    a3_header(cv, "三处重点区域详细设计", "THREE ANCHORS · ONE NETWORK", "04 / 05")
    cards = [
        dict(name="北京AI原点社区", zhsub="上行·始发场", ensub="ORIGIN YARD", col=AMBER, dark=AMBER_D, draw=mini_origin,
             acts=["慢行主轴缝合校区园区街区", "首层 50–120㎡ 成果转化单元", "零号站地标不占文保本体"],
             scenes="01 发布厅 · 07 转化街 · 09 服务岛",
             rights="校地/房屋/成果权利待确认"),
        dict(name="众智园", zhsub="上行·动力段", ensub="POWER DEPOT", col=GREEN, dark=GREEN, draw=mini_zhongzhi,
             acts=["清河滨水界面+织纹肌理", "院落组团+厂房改造中试空间", "可封闭支路混行测试场"],
             scenes="02 沙盒 · 03 混行 · 06 快试 · 10 观测",
             rights="河道/岸线/防洪权利待确认"),
        dict(name="大钟寺", zhsub="上行·编组中枢", ensub="MARSHALLING HUB", col=BLUE, dark=BLUE, draw=mini_dazhongsi,
             acts=["站点一体化+四象限步行连通", "首层路演客厅+样机库", "绿地复合利用+智汇钟地标"],
             scenes="05 路演客厅 · 08 数据洁净室",
             rights="轨道/道路/市政权利待确认"),
    ]
    cw, gap = 360, 33
    for i, cd in enumerate(cards):
        cx0 = 34 + i * (cw + gap)
        cx1 = cx0 + cw
        cv.rect((cx0, 84, cx1, 796), fill=PANEL, stroke=HAIR, sw=1, radius=0.03)
        cv.rect((cx0, 84, cx1, 148), fill=cd["col"], radius=0.03)
        cv.rect((cx0, 124, cx1, 148), fill=cd["col"])
        cv.text_at(cx0 + 20, 116, cd["name"], ff=F_SANS_B, size=17.5, color=WHITE)
        zhw = text_width(cd["zhsub"], F_SANS, 10)
        cv.text_at(cx0 + 20, 138, cd["zhsub"], ff=F_SANS, size=10, color=WHITE)
        cv.text_at(cx0 + 28 + zhw, 138, cd["ensub"], ff=F_MONO, size=8.5, color=WHITE)
        cd["draw"](cv, (cx0 + 14, 160, cx1 - 14, 556))
        cv.text_at(cx0 + 20, 576, "概念平面 · 非比例尺 · PROV", ff=F_MONO, size=7.5, color=FAINT)
        ay = 600
        for act in cd["acts"]:
            cv.rect((cx0 + 20, ay - 9, cx0 + 24, ay - 5), fill=cd["col"])
            ay = cv.para((cx0 + 32, ay - 18, cx1 - 18, ay + 30), act, size=9.8, color=INK2, leading=1.45) + 24
        cv.text_at(cx0 + 20, ay - 4, "AI 场景", ff=F_SANS_B, size=10, color=INK)
        cv.para((cx0 + 20, ay + 4, cx1 - 18, ay + 50), cd["scenes"], size=9.2, color=cd["dark"], leading=1.4)
        cv.line([(cx0 + 20, 748), (cx1 - 20, 748)], color=HAIR, sw=0.8)
        cv.chip(cx0 + 20, 758, "公开信息", bg=WHITE, fg=GREEN, ff=F_SANS, size=8, h=20, pad_x=6, stroke=GREEN, sw=0.8)
        cv.chip(cx0 + 92, 758, "权利人待确认", bg=WHITE, fg=RED_D, ff=F_SANS, size=8, h=20, pad_x=6, stroke=RED, sw=0.8)
        cv.chip(cx0 + 184, 758, "概念建议", bg=WHITE, fg=INK2, ff=F_SANS, size=8, h=20, pad_x=6, stroke=HAIR, sw=0.8)
        cv.text_at(cx0 + 20, 792, cd["rights"], ff=F_SANS, size=8.2, color=FAINT)
    a3_footer(cv)


def build_a3_ledger(page: fitz.Page):
    cv = Cv(page)
    cv.rect((0, 0, A3_W, A3_H), fill=PAPER)
    a3_header(cv, "项目分期、逐资产权利台账与复核", "IMPLEMENTATION · RIGHTS · RECHECK", "05 / 05")

    # ledger table (left, wide)
    lx0, lx1 = 34, 700
    cv.rect((lx0, 84, lx1, 510), fill=PANEL, stroke=HAIR, sw=1, radius=0.02)
    yy = card_head(cv, lx0 + 24, 102, lx1 - lx0 - 48, "01", "逐项目权利状态", size=15)
    ledger = [
        ("JZ-01", "京张遗址公园慢行断点缝合", "道路/公园管理权待确认"),
        ("JZ-02", "众智园清河创新界面", "河道/岸线/防洪权利待确认"),
        ("JZ-03", "原点社区近校成果转化街", "校地/房屋/成果权利待确认"),
        ("JZ-04", "大钟寺站四象限步行连通", "轨道/道路/市政权利待确认"),
        ("JZ-05", "AI公共服务与端侧算力节点", "场地/设备/软件/数据权利待确认"),
        ("JZ-06", "全球AI活动周公共路线", "场地/版权/商标/肖像待确认"),
    ]
    ry = yy + 12
    rh = 52
    for pid, name, pending in ledger:
        cv.chip(lx0 + 24, ry + 10, pid, bg=INK, fg=AMBER, ff=F_MONO_B, size=10.5, h=24, pad_x=9)
        cv.text_at(lx0 + 108, ry + 22, name, ff=F_SANS_B, size=12, color=INK)
        cv.text_at(lx0 + 108, ry + 40, pending, ff=F_SANS, size=9, color=FAINT)
        cv.chip(lx1 - 190, ry + 11, "公开/待确认/概念建议", bg=WHITE, fg=GREEN, ff=F_SANS, size=8.5,
                h=22, pad_x=8, stroke=GREEN, sw=0.8)
        ry += rh
        if pid != "JZ-06":
            cv.line([(lx0 + 24, ry), (lx1 - 24, ry)], color=HAIR, sw=0.6)
    cv.para((lx0 + 24, ry + 8, lx1 - 24, 506),
            "台账结论：六个建议项目均未声明已取得完整实施权利；正式深化时执行「一项目一清权单」。",
            size=9.5, leading=1.5, color=INK2)

    # metric recheck table (left bottom)
    cv.rect((lx0, 526, lx1, 796), fill=PANEL, stroke=HAIR, sw=1, radius=0.02)
    yy = card_head(cv, lx0 + 24, 544, lx1 - lx0 - 48, "02", "指标复核表", size=15)
    heads = ["指标", "数值", "复算公式", "来源", "状态"]
    cols = [lx0 + 24, lx0 + 176, lx0 + 306, lx0 + 472, lx1 - 78]
    ry = yy + 30
    for hdx, cxp in zip(heads, cols):
        cv.text_at(cxp, ry, hdx, ff=F_SANS_B, size=9.5, color=FAINT)
    cv.line([(lx0 + 24, ry + 8), (lx1 - 24, ry + 8)], color=HAIR, sw=0.8)
    mrows = [
        ("范围面积", "11,412,825 ㎡", "polygon_area(boundary)", "site_boundary", "PROV"),
        ("建筑基底", "310,807 ㎡", "Σ polygon_area(bldgs)", "buildings", "PROV"),
        ("绿地率", "12.34 %", "green / site", "green_space+site", "PROV"),
        ("公共空间比例", "7.33 %", "public / site", "public_space+site", "PROV"),
        ("重点片区数", "3", "count(key_areas)", "key_areas", "PROV"),
        ("容积率", "—", "待正式控规条件", "planning_limits", "UNKNOWN"),
    ]
    ry += 26
    for row in mrows:
        for val, cxp in zip(row, cols):
            col = RED_D if val in ("PROV", "UNKNOWN") else INK2
            ff = F_MONO if cxp != cols[0] else F_SANS
            cv.text_at(cxp, ry, val, ff=ff, size=8.6, color=col)
        ry += 21.5
        cv.line([(lx0 + 24, ry - 14.5), (lx1 - 24, ry - 14.5)], color=HAIR, sw=0.5)
    cv.para((lx0 + 24, ry - 2, lx1 - 24, 792),
            "PROV = 由 provisional 图层复算，正式边界发布后必须重算；UNKNOWN = 缺少官方控制条件，不以推测值冒充。",
            size=8.8, leading=1.5, color=FAINT)

    # phasing + loop (right)
    rx0, rx1 = 724, A3_W - 34
    cv.rect((rx0, 84, rx1, 420), fill=PANEL, stroke=HAIR, sw=1, radius=0.03)
    yy = card_head(cv, rx0 + 24, 102, rx1 - rx0 - 48, "03", "分期策略", size=15)
    phases = [("近期", "导视、开放日、可逆微更新与数据治理试点。", GREEN),
              ("中期", "慢行断点、滨水界面与公共服务节点，在权属及专业条件确认后建设。", AMBER_D),
              ("长期", "轨道一体化、片区更新和协同运营，以法定规划及实施主体为准。", BLUE)]
    ry = yy + 16
    for tag, txt, col in phases:
        cv.chip(rx0 + 24, ry, tag, bg=col, fg=WHITE, ff=F_SANS_B, size=10, h=24, pad_x=10)
        ry = cv.para((rx0 + 96, ry - 4, rx1 - 24, ry + 66), txt, size=10, color=INK2, leading=1.5) + 26

    cv.rect((rx0, 436, rx1, 796), fill=PANEL, stroke=HAIR, sw=1, radius=0.03)
    yy = card_head(cv, rx0 + 24, 454, rx1 - rx0 - 48, "04", "复核闭环", size=15)
    cv.para((rx0 + 24, yy + 12, rx1 - 24, yy + 130),
            "公开资料 → 概念方案 → 权利人确认 → 专业审批 → 工程设计 → 实施评估。每一阶段均不得以前一阶段的"
            "概念表达替代后续许可。",
            size=10, leading=1.6)
    sy = yy + 128
    steps = [("公开资料", False), ("概念方案", False), ("权利人确认", True),
             ("专业审批", True), ("工程设计", False), ("实施评估", False)]
    sx = rx0 + 24
    for i, (st, hot) in enumerate(steps):
        wused = cv.chip(sx, sy, st, bg=INK if hot else WHITE, fg=WHITE if hot else INK,
                        ff=F_SANS, size=9, h=24, pad_x=8, stroke=None if hot else HAIR, sw=0.8)
        sx += wused + 4
        if i % 3 == 2:
            sx = rx0 + 24
            sy += 34
        else:
            cv.text_at(sx, sy + 17, "→", ff=F_SANS, size=10, color=FAINT)
            sx += 14
    cv.para((rx0 + 24, sy + 16, rx1 - 24, 788),
            "正式深化：一项目一清权单，补录权利人名称、权利类型、依据文件、授权范围、有效期、联系人、"
            "限制条件与核验日期。",
            size=9.5, leading=1.55, color=INK2)
    a3_footer(cv)


# ================================================================= main ====
def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--preview", action="store_true", help="render PNG previews to tmp_review/")
    args = ap.parse_args()

    a0 = fitz.open()
    for builder in (build_a0_p1, build_a0_p2):
        page = a0.new_page(width=A0_W, height=A0_H)
        builder(page)
    a0.subset_fonts()
    a0_path = HERE / "a0-boards.pdf"
    a0.save(a0_path, deflate=True, garbage=3)
    print(f"wrote {a0_path} ({a0_path.stat().st_size} bytes)")

    a3 = fitz.open()
    for builder in (build_a3_cover, build_a3_structure, build_a3_mobility,
                    build_a3_keyareas, build_a3_ledger):
        page = a3.new_page(width=A3_W, height=A3_H)
        builder(page)
    a3.subset_fonts()
    a3_path = HERE / "a3-booklet.pdf"
    a3.save(a3_path, deflate=True, garbage=3)
    print(f"wrote {a3_path} ({a3_path.stat().st_size} bytes)")

    if args.preview:
        out_dir = HERE.parent / "tmp_review"
        out_dir.mkdir(exist_ok=True)
        for doc, name, dpi in ((a0, "a0-boards", 60), (a3, "a3-booklet", 110)):
            for i, page in enumerate(doc):
                pix = page.get_pixmap(matrix=fitz.Matrix(dpi / 72, dpi / 72))
                out = out_dir / f"new-{name}-p{i + 1}.png"
                pix.save(out)
                print("preview:", out)
    return 0


if __name__ == "__main__":
    sys.exit(main())
