#!/usr/bin/env python3
"""Generate real multi-page A3 booklet and A0 boards for the A0 baseline submission.

Uses reportlab (stdlib + installed) with a Windows CJK font (simhei.ttf / msyh.ttc)
so Chinese renders correctly and the PDFs are NOT zero-page placeholders.
"""
from __future__ import annotations

import argparse
from pathlib import Path

from reportlab.lib.pagesizes import A3, A0
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable, Image,
)

# ---- fonts (fallback chain) -------------------------------------------------
FONT_CANDIDATES = {
    "regular": [r"C:\Windows\Fonts\simhei.ttf", r"C:\Windows\Fonts\msyh.ttc"],
    "bold": [r"C:\Windows\Fonts\msyhbd.ttc", r"C:\Windows\Fonts\simhei.ttf"],
}


def register_fonts() -> str:
    import os
    reg = None
    for name, paths in FONT_CANDIDATES.items():
        for p in paths:
            if os.path.exists(p):
                try:
                    pdfmetrics.registerFont(TTFont(f"F-{name}", p))
                except Exception:
                    continue
                else:
                    if name == "regular":
                        reg = f"F-{name}"
                    break
    if reg is None:
        raise SystemExit("No usable CJK font found; cannot render Chinese in PDFs.")
    return reg


REG_FONT = register_fonts()
BOLD_FONT = "F-bold"
HEI = "F-regular"

# ---- shared copy ------------------------------------------------------------
SCOPE = {
    "统筹研究范围": "43.6 平方公里",
    "总体设计范围": "11.4 平方公里",
    "重点区域范围": "368.4 公顷（众智园 192.1 / 原点社区 104.3 / 大钟寺 72.0）",
}
KEY_METRICS = [
    ("site_area_sqm（总体设计范围）", "11,412,825.386 ㎡"),
    ("green_ratio（绿地率）", "0.263239"),
    ("public_space_ratio（公共空间率）", "0.072718"),
    ("green_space_area_sqm（绿地面积）", "3,004,295.453 ㎡"),
    ("public_space_area_sqm（公共空间面积）", "829,916.727 ㎡"),
    ("building_footprint_area_sqm（建筑基底）", "688,934.253 ㎡"),
    ("key_area_count（重点区数量）", "3"),
]
KEY_AREAS = [
    ("众智园AI自主创新加速区", "花园型自主创新街区。国家平台、产业展示、清河文化、对外交通与低碳交往空间。"),
    ("北京AI原点社区", "近校型成果转化街区。高校源头创新、开源社区、人才服务、拆改留与站点一体化。"),
    ("大钟寺AI产业聚集区", "城市型智能经济街区。领军企业、智能体新业态、商业服务、绿地复合利用与路口四象限连通。"),
]
AI_SCENARIOS = [
    "01 开源发布厅", "02 城市智能体沙盒", "03 慢行断点诊断", "04 人才生活管家",
    "05 AI安全治理廊", "06 校企转化客厅", "07 数据要素剧场", "08 低碳算力驿站",
    "09 京张记忆线路", "10 全球AI活动周路线",
]

PROVISIONAL = (
    "临时边界警示：本成果使用 provisional 几何（PASS intake only），非官方红线；"
    "official polygon 发布后需重算面积与指标。图面矩形边不代表地块或道路红线。"
)
FOOTER = "京张百年AI创新带 · A0 务实基线方案（先轨后城）· 开源共创征集 · 供评审讨论"

SUBMISSION_DIR = Path(__file__).resolve().parents[1] / "submissions" / "Mao-jh" / "jingzhang-agents-baseline"
FIG_DIR = SUBMISSION_DIR / "assets" / "figures"


def figure(name: str, width_mm: float, max_height_mm: float = 250.0) -> Image:
    img = Image(str(FIG_DIR / name))
    img.drawWidth = width_mm * mm
    aspect = img.imageHeight / img.imageWidth
    img.drawHeight = img.drawWidth * aspect
    # cap height; recompute width from height for portrait figures
    if img.drawHeight > max_height_mm * mm:
        img.drawHeight = max_height_mm * mm
        img.drawWidth = img.drawHeight / aspect
    img.hAlign = "CENTER"
    return img


def base_styles():
    title = ParagraphStyle("t", fontName=BOLD_FONT, fontSize=26, leading=34, textColor=colors.HexColor("#101827"))
    h1 = ParagraphStyle("h1", fontName=BOLD_FONT, fontSize=18, leading=24, spaceBefore=12, spaceAfter=6, textColor=colors.HexColor("#172235"))
    h2 = ParagraphStyle("h2", fontName=BOLD_FONT, fontSize=13, leading=18, spaceBefore=8, spaceAfter=4, textColor=colors.HexColor("#334155"))
    body = ParagraphStyle("b", fontName=HEI, fontSize=10.5, leading=16, alignment=TA_LEFT)
    small = ParagraphStyle("s", fontName=HEI, fontSize=8.5, leading=13, textColor=colors.HexColor("#475467"))
    warn = ParagraphStyle("w", fontName=BOLD_FONT, fontSize=10, leading=15, textColor=colors.HexColor("#b45309"), backColor=colors.HexColor("#fff9eb"), borderPadding=6, borderColor=colors.HexColor("#c79838"), borderWidth=0.8)
    return title, h1, h2, body, small, warn


def build_booklet() -> bytes:
    from io import BytesIO
    buf = BytesIO()
    doc = SimpleDocTemplate(
        buf, pagesize=A3, leftMargin=18*mm, rightMargin=18*mm,
        topMargin=16*mm, bottomMargin=14*mm,
        title="京张百年AI创新带·A0务实基线方案（文册）", author="Mao-jh",
    )
    title, h1, h2, body, small, warn = base_styles()
    story = []
    story.append(Paragraph("京张百年AI创新带 · A0 务实基线方案（先轨后城）", title))
    story.append(Spacer(1, 6))
    story.append(Paragraph(FOOTER, small))
    story.append(Spacer(1, 10))
    story.append(Paragraph(PROVISIONAL, warn))
    story.append(Spacer(1, 14))

    # 设计主张
    story.append(Paragraph("一、设计主张：先轨后城", h1))
    story.append(Paragraph(
        "在 A0 保守务实的情景假设下（预算按 -30%、工期按 -20% 编排），本方案把京张遗址公园铁路走廊作为全场"
        "确定性最高、权属最清晰、历史价值最不可替代的资产排在最高优先：先恢复与激活“轨”，再让“城”的创新承载"
        "沿轨生长。不以“造了多少楼”论成败，而以“铁路走廊先被安全、持续地使用起来”作为一期验收标准。", body))
    story.append(Paragraph(
        "叙事锚点：铁轨的锈色与轨行区的活化。所有设计动作可逆、可拆卸、低成本起步，呼应 A0 对预算与工期双收缩的假设。",
        body))
    story.append(Spacer(1, 6))
    story.append(figure("land-use-structure.png", 128))
    story.append(Spacer(1, 8))

    # 三层范围
    story.append(Paragraph("二、三层范围工作框架", h1))
    rows = [["范围层级", "规模", "工作内容"]]
    for name, size in SCOPE.items():
        work = {
            "统筹研究范围": "AI 产业生态、三区两翼协同、未来城市形态、文化叙事",
            "总体设计范围": "控规深度城市设计：用地结构、更新项目、交通市政、蓝绿慢行",
            "重点区域范围": "三处重点片区详细设计：功能业态、建筑更新、公共空间、交通组织",
        }[name]
        rows.append([name, size, work])
    tb = Table(rows, colWidths=[55*mm, 65*mm, 240*mm])
    tb.setStyle(TableStyle([
        ("FONTNAME", (0, 0), (-1, -1), HEI),
        ("FONTSIZE", (0, 0), (-1, -1), 10),
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#eef2f7")),
        ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#cbd5e1")),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    story.append(tb)
    story.append(Spacer(1, 10))

    # 重点区域
    story.append(Paragraph("三、重点区域详细设计", h1))
    for name, desc in KEY_AREAS:
        story.append(Paragraph(f"● {name}", h2))
        story.append(Paragraph(desc, body))
        story.append(Spacer(1, 4))
    story.append(figure("key-areas.png", 190))
    story.append(Spacer(1, 6))

    # 指标
    story.append(Paragraph("四、核心指标体系（跨文件同值）", h1))
    mrows = [["指标", "值"]]
    for k, v in KEY_METRICS:
        mrows.append([k, v])
    mtb = Table(mrows, colWidths=[220*mm, 130*mm])
    mtb.setStyle(TableStyle([
        ("FONTNAME", (0, 0), (-1, -1), HEI),
        ("FONTSIZE", (0, 0), (-1, -1), 10),
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#eef2f7")),
        ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#cbd5e1")),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    story.append(mtb)
    story.append(Spacer(1, 10))

    story.append(Paragraph("五、区域协同接口与机制", h1))
    story.append(Paragraph(
        "京张创新带的竞争力取决于与北京科创走廊诸节点的分工与要素流：北纬（原始创新策源）、未来科学城（应用研发承载）、"
        "怀柔科学城（大科学装置）、经开区（制造转化）、京津冀（应用市场）。每条均以可执行接口与机制载体落地，"
        "并标注依赖的正式条件（权属、数据开放协议、算力调度、交通接驳）待深化。", body))
    story.append(Spacer(1, 8))
    story.append(Paragraph("六、弱势群体独立画像与包容性设计", h1))
    story.append(Paragraph(
        "逐类人群独立画像：老人（沿廊每 400 米休息亭与无障碍卫生间）、儿童（隔离慢行带与口袋游戏场）、"
        "残障（全廊连续无障碍路线与可触碰导视）、照护者（母婴与陪护节点）、低收入（公共空间免费开放）、"
        "非数字用户（每场景线下人工替代渠道）、夜间工作者（24 小时分级照明）。每条动作标注现状基线获取方式与测量方法，"
        "并配套参与/申诉/纠错闭环。", body))
    story.append(Spacer(1, 8))
    story.append(Paragraph("七、AI 场景卡完整矩阵（数据输入→人工复核→失败降级→退出条件）", h1))
    story.append(Paragraph(
        "每张场景卡补齐数据输入—模型/智能体流程—人工复核—运营主体—失败降级—KPI—退出条件七列，"
        "避免只贴 AI 标签而无必要性论证与治理闭环。示例：沿廊慢行感知（聚合公开数据，设施管理方人工核对，"
        "数据不可溯源即停用）、安全治理沙盒（安全专家评审，未获授权即关闭）、端侧算力驿站（运维复核，能耗超标即降载）。", body))
    story.append(Spacer(1, 10))

    story.append(Paragraph("八、可实施性与分期", h1))
    story.append(Paragraph(
        "一期（0–3 年）：轨行区恢复与慢行主廊贯通，装配式、可逆的轻量设施，预算约束下的低成本激活。"
        "二期（3–6 年）：沿轨创新承载与重点片区建筑更新。三期（6–10 年）：产业生态与运营闭环成熟。"
        "所有构筑物具备可拆卸、可移动特性，生命周期控制在 5 年内，避免永久性超配。", body))
    story.append(Spacer(1, 10))

    story.append(Paragraph("九、风险与合规", h1))
    story.append(Paragraph(
        "本成果边界为 provisional 临时边界，不得冒充官方红线；元数据、指标、矩阵与自检状态需保持一致；"
        "逐资产版权台账、字体、图片、图标、地图、数据、代码与生成资产附许可文本或可核验链接。"
        "数字均溯源至 agent_fact_pack.md 可公开核实来源。", body))

    doc.build(story)
    return buf.getvalue()


def draw_wrapped(c, text, x_mm, y_mm, width_mm, size=10, leading=None, color="#101827", bold=False):
    """Draw wrapped text at (x_mm, y_mm) mm; returns the new y position."""
    if leading is None:
        leading = int(size * 1.55)
    from reportlab.pdfbase.pdfmetrics import stringWidth
    words = list(text)  # character wrap for CJK
    line = ""
    y = y_mm
    for ch in words:
        test = line + ch
        w_pt = stringWidth(test, BOLD_FONT if bold else HEI, size)
        w_mm = w_pt / 72 * 25.4
        if w_mm > width_mm and line:
            c.setFont(BOLD_FONT if bold else HEI, size)
            c.setFillColor(colors.HexColor(color))
            c.drawString(x_mm * mm, y * mm, line)
            y -= leading / 25.4
            line = ch
        else:
            line = test
    if line:
        c.setFont(BOLD_FONT if bold else HEI, size)
        c.setFillColor(colors.HexColor(color))
        c.drawString(x_mm * mm, y * mm, line)
    return y


def draw_image_fit(c, name, x_mm, y_mm, target_w_mm, target_h_mm, outline=True, caption=None):
    """Draw an image fitting (not stretching) into a target box; returns the drawn (w,h,actual_x,actual_y)."""
    from reportlab.lib.utils import ImageReader
    path = str(FIG_DIR / name)
    if not Path(path).exists():
        return (0, 0, 0, 0)
    img = ImageReader(path)
    iw_pt, ih_pt = img.getSize()
    img_aspect = ih_pt / iw_pt  # h/w
    target_aspect = target_h_mm / target_w_mm
    if target_aspect > img_aspect:
        draw_w_mm = target_w_mm
        draw_h_mm = draw_w_mm * img_aspect
    else:
        draw_h_mm = target_h_mm
        draw_w_mm = draw_h_mm / img_aspect
    actual_x = x_mm + (target_w_mm - draw_w_mm) / 2
    actual_y = y_mm + (target_h_mm - draw_h_mm) / 2
    c.drawImage(
        img, actual_x * mm, actual_y * mm,
        width=draw_w_mm * mm, height=draw_h_mm * mm,
        preserveAspectRatio=True, anchor='c', mask='auto',
    )
    if outline:
        c.setStrokeColor(colors.HexColor("#cbd5e1"))
        c.setLineWidth(0.4 * mm)
        c.rect(x_mm * mm, y_mm * mm, target_w_mm * mm, target_h_mm * mm)
    if caption:
        c.setFont(HEI, 8)
        c.setFillColor(colors.HexColor("#475467"))
        c.drawString(x_mm * mm + 3*mm, (y_mm - 4.5) * mm, caption)
    return (draw_w_mm, draw_h_mm, actual_x, actual_y)


def draw_banner(c, x_mm, y_mm, w_mm, h_mm, text, bg="#172235", fg="#ffffff", size=12, bold=True):
    c.setFillColor(colors.HexColor(bg))
    c.rect(x_mm * mm, y_mm * mm, w_mm * mm, h_mm * mm, fill=1, stroke=0)
    c.setFont(BOLD_FONT if bold else HEI, size)
    c.setFillColor(colors.HexColor(fg))
    c.drawString((x_mm + 5) * mm, (y_mm + (h_mm - size/2.83)/2) * mm, text)


def draw_table(c, header, rows, x_mm, y_mm, w_mm, col_widths_mm, hdr_size=9, cell_size=8.5, row_h_mm=7):
    # header
    x = x_mm
    y = y_mm
    draw_banner(c, x, y, w_mm, row_h_mm, "", bg="#eef2f7", fg="#172235", size=hdr_size, bold=True)
    cx = x
    for i, col in enumerate(header):
        c.setFillColor(colors.HexColor("#172235"))
        c.setFont(BOLD_FONT, hdr_size)
        c.drawString((cx + 2) * mm, (y + (row_h_mm - hdr_size/2.83)/2) * mm, col)
        cx += col_widths_mm[i]
    # rows
    for ri, row in enumerate(rows):
        y -= row_h_mm
        c.setStrokeColor(colors.HexColor("#e5e7eb"))
        c.setLineWidth(0.2 * mm)
        c.rect(x * mm, y * mm, w_mm * mm, row_h_mm * mm, fill=0, stroke=1)
        cx = x
        for i, cell in enumerate(row):
            c.setFillColor(colors.HexColor("#111827"))
            c.setFont(HEI, cell_size)
            c.drawString((cx + 2) * mm, (y + (row_h_mm - cell_size/2.83)/2) * mm, str(cell))
            cx += col_widths_mm[i]
    return y - 3  # bottom y below table


def _board1(c, w_mm, h_mm, ml, mr, mt, mb):
    iw, ih = w_mm - ml - mr, h_mm - mt - mb  # usable
    x0, y0 = ml, mb  # bottom-left of usable
    # =========== HEADER ===========
    hdr_h = 36
    draw_banner(c, x0, y0 + ih - hdr_h, iw, hdr_h, "", bg="#101827", fg="#ffffff", size=28)
    c.setFont(BOLD_FONT, 28)
    c.setFillColor(colors.HexColor("#ffffff"))
    c.drawString((x0 + 14) * mm, (y0 + ih - hdr_h + 10) * mm,
                 "百年京张 · 先轨后城 AI 创新带 ｜ A0 务实基线方案")
    c.setFont(HEI, 12)
    c.setFillColor(colors.HexColor("#cbd5e1"))
    c.drawString((x0 + 14) * mm, (y0 + ih - hdr_h + 4) * mm,
                 "A0 保守务实基线 · 预算 -30% · 工期 -20% · 动作可逆、可拆卸、低成本起步")
    # provisional warning strip
    warn_h = 12
    c.setFillColor(colors.HexColor("#fff9eb"))
    c.setStrokeColor(colors.HexColor("#c79838"))
    c.setLineWidth(0.5 * mm)
    c.rect(x0 * mm, (y0 + ih - hdr_h - warn_h) * mm, iw * mm, warn_h * mm, fill=1, stroke=1)
    c.setFont(BOLD_FONT, 10)
    c.setFillColor(colors.HexColor("#92400e"))
    c.drawString((x0 + 5) * mm, (y0 + ih - hdr_h - warn_h + 3.5) * mm,
                 "⚠ 临时边界警示：全部几何使用 provisional 边界，非官方红线；official polygon 发布后需整体复算。")
    # ======== ROW 1 (below header + warning): site overview + design主张 ========
    row1_top = y0 + ih - hdr_h - warn_h - 4
    # left: 总体图占 55% 宽
    col1w = iw * 0.55
    box_h = ih * 0.38  # row 1 height (big map)
    box_x, box_y = x0, row1_top - box_h
    draw_banner(c, box_x, row1_top - 7, col1w, 7, "  ① 总图 · 三层范围与重点区落位", bg="#295f9f", fg="#ffffff", size=10)
    draw_image_fit(c, "site-overview.png", box_x + 2, box_y + 2, col1w - 4, box_h - 11,
                   caption="比例 1 : 约 35,000 · 图例含统筹 / 总体 / 重点区 · provisional 临时边界")
    # right col: design 主张 + 三层范围表（45%）
    col2x = x0 + col1w + 6
    col2w = iw - col1w - 6
    tb_y = row1_top - 7
    draw_banner(c, col2x, tb_y, col2w, 7, "  ② 设计主张：先轨后城 · 轨活城随", bg="#8a4b2a", fg="#ffffff", size=10)
    tb_y -= 2
    text_body = (
        "京张遗址铁路走廊是全场确定性最高、权属最清晰、历史价值最不可替代的资产，"
        "因此本方案排在最高优先：先恢复与激活“轨”，再让“城”的创新承载沿轨生长。"
    )
    tb_y = draw_wrapped(c, text_body, col2x + 3, tb_y, col2w - 6, size=9)
    tb_y -= 2
    rules = [
        "· 退线规则：走廊激活带内一期不落永久建筑基底",
        "· 剖面规则：铁轨/绿廊 → 可逆边带 → 慢行主廊 → 建筑基座 退台式升高",
        "· 材质规则：一期锈色钢＋木构，与二期永久材质可区分",
        "· 慢行规则：慢行主廊设在走廊本体内，横穿优先行人与骑行",
        "· 分期规则：临廊段实测使用需求后，建筑/场地才允许固化",
    ]
    for r in rules:
        tb_y = draw_wrapped(c, r, col2x + 3, tb_y, col2w - 6, size=8.5)
        tb_y -= 0.5
    # 三层范围 table 紧接下面
    tb_y -= 2
    hdr = ["层级", "面积", "设计问题"]
    tbl_rows = [
        ["统筹研究范围", "43.6 平方公里", "AI 产业生态与未来城市形态"],
        ["总体设计范围", "11.4 平方公里", "城市更新与控规深度城市设计"],
        ["重点区域范围", "368.4 公顷", "三处片区详细设计深度"],
    ]
    cw = [col2w * 0.28, col2w * 0.28, col2w * 0.44]
    draw_banner(c, col2x, tb_y, col2w, 7, "  ③ 三层范围工作框架", bg="#15803d", fg="#ffffff", size=10)
    tb_y -= 1
    draw_table(c, hdr, tbl_rows, col2x, tb_y, col2w, cw)
    # ======== ROW 2: land-use + section + metrics ========
    row2_top = box_y - 8
    row2h = ih * 0.30
    # left 60%: land-use-structure (big)
    c2_lw = iw * 0.60
    draw_banner(c, x0, row2_top - 7, c2_lw, 7, "  ④ 用地分区与先轨后城分期结构 · 四类用地（0802 / 1401 / 05 / 0702）",
                bg="#295f9f", fg="#ffffff", size=10)
    draw_image_fit(c, "land-use-structure.png", x0 + 2, row2_top - row2h + 2, c2_lw - 4, row2h - 11,
                   caption="图例：AI 研发创新 0802 · 公园绿地 1401 · 产业服务 05 · 社区服务 0702")
    # right 40%: section + key metrics
    c2_rx = x0 + c2_lw + 6
    c2_rw = iw - c2_lw - 6
    # section upper half
    sect_h = row2h * 0.42
    draw_banner(c, c2_rx, row2_top - 7, c2_rw, 7, "  ⑤ 退台式剖面（先轨后城 · 时态差）",
                bg="#8a4b2a", fg="#ffffff", size=10)
    draw_image_fit(c, "section.png", c2_rx + 2, row2_top - sect_h - 5 + 2, c2_rw - 4, sect_h - 11,
                   caption="轨/绿廊 → 可逆边带 → 慢行主廊 → 基座 逐级升高，时态差可辨")
    # key metrics lower half
    mt_y = row2_top - sect_h - 10
    draw_banner(c, c2_rx, mt_y, c2_rw, 7, "  ⑥ 核心指标（跨文件同值 · GeoJSON 复算）",
                bg="#15803d", fg="#ffffff", size=10)
    mt_y -= 1
    hdr = ["指标", "值"]
    m_rows = [
        ["总体设计范围 site_area", "11,412,825.386 ㎡"],
        ["绿地率 green_ratio", "26.3%"],
        ["公共空间率 public_space_ratio", "7.3%"],
        ["绿地面积 green_space_area", "3,004,295.453 ㎡"],
        ["公共空间面积 public_space_area", "829,916.727 ㎡"],
        ["建筑基底 building_footprint", "688,934.253 ㎡"],
        ["建筑覆盖率", "6.0%"],
        ["慢行主廊 total_length", "≈ 8,994 m"],
    ]
    cw = [c2_rw * 0.58, c2_rw * 0.42]
    draw_table(c, hdr, m_rows, c2_rx, mt_y, c2_rw, cw)
    # ======== ROW 3: 3 system maps + 来源/合规 footer ========
    row3_top = row2_top - row2h - 8
    row3h = y0 + ih - hdr_h - warn_h - 4  # placeholder
    row3h = row3_top - (y0 + 18)
    # three equal system map panels
    gap = 6
    pw = (iw - gap * 2) / 3
    # Panel A: mobility-bluegreen
    draw_banner(c, x0, row3_top - 7, pw, 7, "  ⑦ 交通慢行 + 蓝绿廊道系统",
                bg="#295f9f", fg="#ffffff", size=10)
    draw_image_fit(c, "mobility-bluegreen.png", x0 + 2, y0 + 18 + 2, pw - 4, row3h - 11,
                   caption="慢行主廊 ≈8.3km + 横向联系 ≈0.7km · 历史自行车比例 45%")
    # Panel B: regional-synergy
    bx = x0 + pw + gap
    draw_banner(c, bx, row3_top - 7, pw, 7, "  ⑧ 区域协同 · 三区两翼接口",
                bg="#8a4b2a", fg="#ffffff", size=10)
    draw_image_fit(c, "regional-synergy.png", bx + 2, y0 + 18 + 2, pw - 4, row3h - 11,
                   caption="北纬/未来科学城/怀柔科学城/经开区/京津冀 · 分角色分工")
    # Panel C: metrics-evidence
    cxp = x0 + (pw + gap) * 2
    draw_banner(c, cxp, row3_top - 7, pw, 7, "  ⑨ 指标证据链路 · GeoJSON ↔ metrics 同源",
                bg="#15803d", fg="#ffffff", size=10)
    draw_image_fit(c, "metrics-evidence.png", cxp + 2, y0 + 18 + 2, pw - 4, row3h - 11,
                   caption="证据槽：[source] / [depth] / [data] / [metric] / [standard]")
    # footer strip
    f_y = y0
    c.setFillColor(colors.HexColor("#f1f5f9"))
    c.rect(x0 * mm, f_y * mm, iw * mm, 18 * mm, fill=1, stroke=0)
    c.setFont(BOLD_FONT, 9)
    c.setFillColor(colors.HexColor("#172235"))
    c.drawString((x0 + 5) * mm, (f_y + 8) * mm,
                 "图面：总图 · 用地分区 · 剖面 · 慢行蓝绿 · 区域协同 · 指标证据链路 · 三层范围 · 核心指标")
    c.setFont(HEI, 8)
    c.setFillColor(colors.HexColor("#475467"))
    c.drawString((x0 + 5) * mm, (f_y + 2.5) * mm,
                 "Mao-jh · 京张·先轨后城创新带 · A0 展板 1/2 · © 开源共创展示 供评审讨论 · provisional 临时边界")


def _board2(c, w_mm, h_mm, ml, mr, mt, mb):
    iw, ih = w_mm - ml - mr, h_mm - mt - mb
    x0, y0 = ml, mb
    # header
    hdr_h = 36
    draw_banner(c, x0, y0 + ih - hdr_h, iw, hdr_h, "", bg="#172235", fg="#ffffff", size=24)
    c.setFont(BOLD_FONT, 24)
    c.setFillColor(colors.HexColor("#ffffff"))
    c.drawString((x0 + 14) * mm, (y0 + ih - hdr_h + 11) * mm,
                 "重点片区 · 分期实施 · AI 场景 · 弱势群体 · 风险合规")
    c.setFont(HEI, 11)
    c.setFillColor(colors.HexColor("#cbd5e1"))
    c.drawString((x0 + 14) * mm, (y0 + ih - hdr_h + 3.5) * mm,
                 "三重点区 × 三期 × 10 场景治理闭环 × 弱势群体 7 画像 × 合规五处一致")
    # warning
    warn_h = 12
    c.setFillColor(colors.HexColor("#fff9eb"))
    c.setStrokeColor(colors.HexColor("#c79838"))
    c.setLineWidth(0.5 * mm)
    c.rect(x0 * mm, (y0 + ih - hdr_h - warn_h) * mm, iw * mm, warn_h * mm, fill=1, stroke=1)
    c.setFont(BOLD_FONT, 10)
    c.setFillColor(colors.HexColor("#92400e"))
    c.drawString((x0 + 5) * mm, (y0 + ih - hdr_h - warn_h + 3.5) * mm,
                 "⚠ 临时边界警示：矩形边不代表地块/道路红线；所有开发强度/高度/道路红线内容待正式控规条件确认。")
    # ROW 1: key-areas big + key-area detail table + phasing
    row1_top = y0 + ih - hdr_h - warn_h - 4
    row1h = ih * 0.42
    # left 58%: key-areas
    lw = iw * 0.58
    draw_banner(c, x0, row1_top - 7, lw, 7,
                "  ① 三大重点片区详细设计（众智园 192.1ha · 原点社区 104.3ha · 大钟寺 72.0ha）",
                bg="#295f9f", fg="#ffffff", size=10)
    draw_image_fit(c, "key-areas.png", x0 + 2, row1_top - row1h + 2, lw - 4, row1h - 11,
                   caption="定位：花园型自主创新 / 近校成果转化 / 城市智能经济聚集")
    # right 42%: phasing (top) + key-area compact spec (bottom)
    rx = x0 + lw + 6
    rw = iw - lw - 6
    # phasing top
    ph_h = row1h * 0.50
    draw_banner(c, rx, row1_top - 7, rw, 7, "  ② 分期实施 · 先轨后城三阶段",
                bg="#8a4b2a", fg="#ffffff", size=10)
    draw_image_fit(c, "phasing.png", rx + 2, row1_top - ph_h - 5 + 2, rw - 4, ph_h - 11,
                   caption="一期 28.5% · 二期 20.2% · 三期 49.9%（GeoJSON 复算）")
    # key area spec table
    ka_y = row1_top - ph_h - 10
    draw_banner(c, rx, ka_y, rw, 7, "  ③ 重点区设计动作 · AI 场景",
                bg="#15803d", fg="#ffffff", size=10)
    ka_y -= 1
    hdr = ["片区", "定位", "空间动作 · 场景"]
    ka_rows = [
        ["众智园 192.1ha", "花园型自主创新", "清河界面·测试沙盒·标准制定"],
        ["原点 104.3ha", "近校成果转化", "校-园-街连通·开源发布·孵化"],
        ["大钟寺 72.0ha", "城市智能经济", "站城四象限连通·国际路演客厅"],
    ]
    cw = [rw * 0.25, rw * 0.28, rw * 0.47]
    draw_table(c, hdr, ka_rows, rx, ka_y, rw, cw, cell_size=8, hdr_size=8.5, row_h_mm=7)
    # ======== ROW 2: AI governance state machine table + scenario matrix ========
    row2_top = row1_top - row1h - 8
    row2h = ih * 0.32
    # left 55%: state machine + scenario table
    gow = iw * 0.55
    draw_banner(c, x0, row2_top - 7, gow, 7,
                "  ④ AI 治理操作系统 · 六状态状态机 + 可审计闭环",
                bg="#295f9f", fg="#ffffff", size=10)
    st_y = row2_top - 8
    shdr = ["状态", "含义", "去向 / 失败降级"]
    srows = [
        ["concept 概念", "命名层，无必要性论证", "必要性→simulation / 无→不进清单"],
        ["simulation 仿真", "受控环境验证数据流", "通过→sandbox / 失败→回 concept"],
        ["sandbox 沙盒", "真实数据与模型红队测试", "专家评→human_review / 未过→隔离"],
        ["human_review 复核", "专业方负最终责任", "通过→deepening / 否决→sandbox/退"],
        ["deepening 运营", "真实环境采集与校验", "KPI→固化 / 安全→红牌暂停"],
        ["retired 退出", "退役可逆拆除", "记录归档"],
    ]
    scw = [gow * 0.22, gow * 0.34, gow * 0.44]
    draw_table(c, shdr, srows, x0, st_y, gow, scw, cell_size=8, hdr_size=8.5, row_h_mm=7)
    # scenario list 5x2 matrix below
    sc_y = st_y - 7*len(srows) - 3
    draw_banner(c, x0, sc_y, gow, 6, "  ⑤ AI 场景 10 卡矩阵（数据输入→人工复核→失败降级→退出条件）",
                bg="#8a4b2a", fg="#ffffff", size=9)
    sc_y -= 1
    cols = 5
    cell_w = gow / cols
    scenarios_left = AI_SCENARIOS[:5]
    scenarios_right = AI_SCENARIOS[5:]
    # two rows: header + 5 col 2 rows
    # row 1
    cx = x0
    c.setStrokeColor(colors.HexColor("#cbd5e1"))
    c.setLineWidth(0.3 * mm)
    ch = 8
    for i in range(2):
        items = scenarios_left if i == 0 else scenarios_right
        ry = sc_y - (i+1)*ch
        c.rect(x0 * mm, ry * mm, gow * mm, ch * mm, fill=0, stroke=1)
        for j in range(cols):
            x_col = x0 + j*cell_w
            if j > 0:
                c.line(x_col * mm, ry * mm, x_col * mm, (ry + ch) * mm)
            c.setFont(HEI, 7.5)
            c.setFillColor(colors.HexColor("#111827"))
            c.drawString((x_col + 2) * mm, (ry + 1.5) * mm, items[j])
    # right: vulnerable persona + compliance block (45%)
    gxr = x0 + gow + 6
    gwr = iw - gow - 6
    draw_banner(c, gxr, row2_top - 7, gwr, 7,
                "  ⑥ 弱势群体独立画像 · 7 类 · 空间动作 + 可测目标",
                bg="#15803d", fg="#ffffff", size=10)
    py = row2_top - 8
    phdr = ["人群", "空间痛点", "先轨后城动作"]
    prows = [
        ["老人", "步行距离长/设施少", "400m 休憩亭+全程零高差"],
        ["儿童", "穿越安全隐患", "隔离慢行带+口袋游戏场"],
        ["残障", "导视不清/断点", "连续无障碍+盲文导视"],
        ["照护者", "设施间距大", "400m 母婴/陪护节点"],
        ["低收入", "消费门槛高", "公共空间 100% 免费开放"],
        ["非数字用户", "场景触达难", "100% 场景配线下人工替代"],
        ["夜间工作者", "夜间照明不足", "24h 分级照明与安保"],
    ]
    pcw = [gwr * 0.18, gwr * 0.35, gwr * 0.47]
    draw_table(c, phdr, prows, gxr, py, gwr, pcw, cell_size=7.8, hdr_size=8.5, row_h_mm=6.2)
    # ======== ROW 3: Compliance 五处一致 + Copyright/License footer ========
    r3t = row2_top - row2h - 4
    r3h = r3t - (y0 + 18)
    # 合规 5 block compact strip
    bw = (iw - 3 * 6) / 4
    # B1: 风险合规
    blk_x = x0
    draw_banner(c, blk_x, r3t - 7, bw, 7, "  ⑦ 风险合规（五处一致）", bg="#b91c1c", fg="#ffffff", size=9)
    lines_comp = [
        "· 不用 provisional 冒充官方红线",
        "· 边界状态标注 provisional",
        "· manifest/metrics/self_check/assumption/validation 五处一致",
        "· 逐资产版权台账（字体/图/图/数据/代码）",
        "· 每个数字追溯 agent_fact_pack.md 可公开 URL",
    ]
    ty = r3t - 9
    for ln in lines_comp:
        ty = draw_wrapped(c, ln, blk_x + 2.5, ty, bw - 5, size=7.8)
        ty -= 0.4
    # B2: 10场景治理矩阵
    bx2 = x0 + bw + 6
    draw_banner(c, bx2, r3t - 7, bw, 7, "  ⑧ 场景卡完整矩阵 7 列", bg="#295f9f", fg="#ffffff", size=9)
    lines_sg = [
        "① 数据输入  ② 模型/智能体流程",
        "③ 人工复核   ④ 运营主体",
        "⑤ 失败降级   ⑥ KPI",
        "⑦ 退出条件",
        "≥3 产业测试场景 + 准入/安全协议",
        "≥5 用户画像 + 老人/儿童/残障",
    ]
    ty = r3t - 9
    for ln in lines_sg:
        ty = draw_wrapped(c, ln, bx2 + 2.5, ty, bw - 5, size=7.8)
        ty -= 0.4
    # B3: 全球案例
    bx3 = x0 + (bw + 6) * 2
    draw_banner(c, bx3, r3t - 7, bw, 7, "  ⑨ 全球案例（一手来源 official_public）",
                bg="#8a4b2a", fg="#ffffff", size=9)
    lines_cs = [
        "· Quayside（Waterfront Toronto）：4.9ha / 3.2ha / 5 地块",
        "· King's Cross（kingscross.co.uk）：67 英亩 / >40% 开放空间 / CSM 2011",
        "· 涩谷（Tokyu Const.）：东塔 约 230m · 2019 年 11 月",
        "· 新加坡 Smart Nation（官网）：Singpass 97% · 41M 月交易",
        "· 京张遗址公园（本方案锚点）：一期已建成开放",
    ]
    ty = r3t - 9
    for ln in lines_cs:
        ty = draw_wrapped(c, ln, bx3 + 2.5, ty, bw - 5, size=7.8)
        ty -= 0.4
    # B4: 品牌 & 命名
    bx4 = x0 + (bw + 6) * 3
    draw_banner(c, bx4, r3t - 7, bw, 7, "  ⑩ VI 成品 & 五规则生成",
                bg="#15803d", fg="#ffffff", size=9)
    lines_br = [
        "· 主标志矢量：assets/brand/jingzhang-railfirst-logo.svg",
        "· 色彩：遗址锈色 #8a4b2a · 科技蓝 #295f9f · 公园绿 #15803d",
        "· 五规则：退线 / 剖面 / 材质 / 慢行 / 分期",
        "· 隐喻=轨的双重含义，≠ 普通矩形色块轴带",
        "· 版权台账详见 report/copyright_statement.md §5",
    ]
    ty = r3t - 9
    for ln in lines_br:
        ty = draw_wrapped(c, ln, bx4 + 2.5, ty, bw - 5, size=7.8)
        ty -= 0.4
    # footer strip
    f_y = y0
    c.setFillColor(colors.HexColor("#f1f5f9"))
    c.rect(x0 * mm, f_y * mm, iw * mm, 18 * mm, fill=1, stroke=0)
    c.setFont(BOLD_FONT, 9)
    c.setFillColor(colors.HexColor("#172235"))
    c.drawString((x0 + 5) * mm, (f_y + 8) * mm,
                 "图面：重点区 · 分期 · 治理六态机 · 10 场景矩阵 · 7 弱势群体画像 · 合规五一致 · 一手案例 · VI 五规则")
    c.setFont(HEI, 8)
    c.setFillColor(colors.HexColor("#475467"))
    c.drawString((x0 + 5) * mm, (f_y + 2.5) * mm,
                 "Mao-jh · 京张·先轨后城创新带 · A0 展板 2/2 · © 开源共创展示 供评审讨论 · provisional 临时边界")


def build_boards() -> bytes:
    """Landscape A0 boards (2 pages). Treat each page as a whole readable board.

    Layout strategy (针对人工可读图面):
    - A0 横版（1189 × 841 mm），符合城市设计展板阅读习惯
    - 每页顶部：深色标题横幅 + provisional 琥珀警示条
    - 每页分为上半 (主图区 60%) 与下半 (支撑区 40%)，两区都有实质内容，
      避免"内容集中在上半部、下半留白"的版面病
    - 表格压缩为辅助信息，不占主图空间
    """
    from io import BytesIO
    from reportlab.pdfgen import canvas
    from reportlab.lib.utils import ImageReader
    # Landscape A0
    W_PT, H_PT = A0
    W_MM = H_PT / 72 * 25.4   # 1189 mm (long edge = width)
    H_MM = W_PT / 72 * 25.4   # 841 mm  (short edge = height)
    pagesize = (H_PT, W_PT)   # swap for landscape
    buf = BytesIO()
    c = canvas.Canvas(buf, pagesize=pagesize,
                      title="京张百年AI创新带·A0务实基线方案（展板·横版）",
                      author="Mao-jh")
    ml, mr, mt, mb = 14, 14, 14, 14
    iw, ih = W_MM - ml - mr, H_MM - mt - mb
    x0, y0 = ml, mb

    # ====================================================================
    # Helpers local to this function (reuse existing helpers + extra ones)
    # ====================================================================
    def banner(x, y, w, h, text, bg="#172235", fg="#ffffff", size=12, bold=True, pad=5):
        c.setFillColor(colors.HexColor(bg))
        c.rect(x * mm, y * mm, w * mm, h * mm, fill=1, stroke=0)
        c.setFont(BOLD_FONT if bold else HEI, size)
        c.setFillColor(colors.HexColor(fg))
        c.drawString((x + pad) * mm, (y + (h - size / 2.83) / 2) * mm, text)

    def wrap(text, x, y, ww, size=10, leading=None, color="#101827", bold=False):
        if leading is None:
            leading = int(size * 1.55)
        from reportlab.pdfbase.pdfmetrics import stringWidth
        out_lines = []
        line = ""
        for ch in text:
            test = line + ch
            w_pt = stringWidth(test, BOLD_FONT if bold else HEI, size)
            w_mm = w_pt / 72 * 25.4
            if w_mm > ww and line:
                out_lines.append(line)
                line = ch
            else:
                line = test
        if line:
            out_lines.append(line)
        cy = y
        for ln in reversed(out_lines):
            c.setFont(BOLD_FONT if bold else HEI, size)
            c.setFillColor(colors.HexColor(color))
            c.drawString(x * mm, cy * mm, ln)
            cy += leading / 25.4
        top = cy - leading / 25.4
        # return top y of the block (so caller can stack above it)
        return top

    def wwrap(text, x, y_top, ww, size=10, leading=None, color="#101827", bold=False):
        """Draw text DOWNWARD from y_top, return bottom y."""
        if leading is None:
            leading = int(size * 1.55)
        from reportlab.pdfbase.pdfmetrics import stringWidth
        lines = []
        line = ""
        for ch in text:
            test = line + ch
            w_pt = stringWidth(test, BOLD_FONT if bold else HEI, size)
            w_mm = w_pt / 72 * 25.4
            if w_mm > ww and line:
                lines.append(line)
                line = ch
            else:
                line = test
        if line:
            lines.append(line)
        cy = y_top
        for ln in lines:
            c.setFont(BOLD_FONT if bold else HEI, size)
            c.setFillColor(colors.HexColor(color))
            c.drawString(x * mm, cy * mm, ln)
            cy -= leading / 25.4
        return cy  # bottom y (below last line)

    def imgfit(name, x, y, tw, th, caption=None, cap_bg=None):
        path = str(FIG_DIR / name)
        if not Path(path).exists():
            return
        img = ImageReader(path)
        iw_pt, ih_pt = img.getSize()
        a = ih_pt / iw_pt
        ta = th / tw
        if ta > a:
            dw = tw
            dh = dw * a
        else:
            dh = th
            dw = dh / a
        ax = x + (tw - dw) / 2
        ay = y + (th - dh) / 2
        c.drawImage(img, ax * mm, ay * mm, dw * mm, dh * mm,
                    preserveAspectRatio=True, anchor='c', mask='auto')
        if caption:
            by = y - 1 if cap_bg is None else y - 7
            if cap_bg:
                c.setFillColor(colors.HexColor(cap_bg))
                c.rect(x * mm, by * mm, tw * mm, 7 * mm, fill=1, stroke=0)
                c.setFont(HEI, 8)
                c.setFillColor(colors.HexColor("#ffffff"))
            else:
                c.setFont(HEI, 8)
                c.setFillColor(colors.HexColor("#475467"))
            c.drawString((x + 2) * mm, (by + 1.6) * mm, caption)

    def panel_box(x, y, w, h, bg=None, stroke="#cbd5e1", title=None, title_bg="#295f9f"):
        if bg is not None:
            c.setFillColor(colors.HexColor(bg))
            c.rect(x * mm, y * mm, w * mm, h * mm, fill=1, stroke=0)
        c.setStrokeColor(colors.HexColor(stroke))
        c.setLineWidth(0.4 * mm)
        c.rect(x * mm, y * mm, w * mm, h * mm, fill=0, stroke=1)
        if title:
            banner(x, y + h - 7, w, 7, f"  {title}", bg=title_bg, fg="#ffffff", size=10)

    def tab(header, rows, x, y_top, w, col_ws, hdr_size=9, cell_size=8, rh=7):
        hdr_y = y_top
        banner(x, hdr_y, w, rh, "", bg="#eef2f7", fg="#172235", size=hdr_size)
        cx = x
        for i, col in enumerate(header):
            c.setFillColor(colors.HexColor("#172235"))
            c.setFont(BOLD_FONT, hdr_size)
            c.drawString((cx + 2) * mm, (hdr_y + (rh - hdr_size / 2.83) / 2) * mm, col)
            cx += col_ws[i]
        cy = hdr_y
        for row in rows:
            cy -= rh
            c.setStrokeColor(colors.HexColor("#e5e7eb"))
            c.setLineWidth(0.2 * mm)
            c.rect(x * mm, cy * mm, w * mm, rh * mm, fill=0, stroke=1)
            cx = x
            for i, cell in enumerate(row):
                c.setFillColor(colors.HexColor("#111827"))
                c.setFont(HEI, cell_size)
                c.drawString((cx + 2) * mm, (cy + (rh - cell_size / 2.83) / 2) * mm, str(cell))
                cx += col_ws[i]
        return cy

    # ====================================================================
    # Common header + footer drawer for a landscape page
    # ====================================================================
    def draw_head_foot(page_title, page_sub, page_num, warn_text):
        # header bar (40mm)
        banner(x0, y0 + ih - 40, iw, 40, "", bg="#0f172a", size=28)
        c.setFont(BOLD_FONT, 28)
        c.setFillColor(colors.HexColor("#f1f5f9"))
        c.drawString((x0 + 12) * mm, (y0 + ih - 17) * mm, page_title)
        c.setFont(HEI, 12)
        c.setFillColor(colors.HexColor("#94a3b8"))
        c.drawString((x0 + 12) * mm, (y0 + ih - 33) * mm, page_sub)
        # warning strip (14mm)
        banner(x0, y0 + ih - 54, iw, 14, "", bg="#fff9eb", fg="#78350f", size=10)
        c.setStrokeColor(colors.HexColor("#c79838"))
        c.setLineWidth(0.5 * mm)
        c.rect(x0 * mm, (y0 + ih - 54) * mm, iw * mm, 14 * mm, fill=0, stroke=1)
        c.setFont(BOLD_FONT, 10.5)
        c.setFillColor(colors.HexColor("#78350f"))
        c.drawString((x0 + 6) * mm, (y0 + ih - 54 + 4) * mm, warn_text)
        # footer bar (18mm)
        c.setFillColor(colors.HexColor("#0f172a"))
        c.rect(x0 * mm, y0 * mm, iw * mm, 18 * mm, fill=1, stroke=0)
        c.setFont(BOLD_FONT, 10)
        c.setFillColor(colors.HexColor("#e2e8f0"))
        c.drawString((x0 + 6) * mm, (y0 + 8.5) * mm,
                     f"Mao-jh · 京张·先轨后城创新带 · A0 展板 {page_num}/2 · © 开源共创展示 供评审讨论")
        c.setFont(HEI, 8.5)
        c.setFillColor(colors.HexColor("#94a3b8"))
        c.drawString((x0 + 6) * mm, (y0 + 3) * mm,
                     "全部几何使用 provisional 临时边界，非官方红线；official polygon 发布后需整体复算。")

    # ====================================================================
    # Page 1 — Master Plan 主图（占上半部 70% 版面宽）+ 五规则/三层范围
    #       下半部 — 用地分区 · 分期 · 剖面 · 核心指标 四块大辅助图
    # ====================================================================
    draw_head_foot(
        "百年京张 · 先轨后城 AI 创新带 ｜ 总览展板",
        "A0 保守务实基线 · 预算 -30% · 工期 -20% · 可逆可拆卸低成本起步 · Page 1/2",
        1,
        "⚠ provisional 临时边界警示：统筹 / 总体 / 重点区三层范围为概念示意，矩形边不代表地块或道路红线。"
    )

    # Content lives between y = y0+18 (footer top) and y = y0+ih-54 (warning bottom)
    cy_top = y0 + ih - 54 - 4   # start below warning strip, with tiny gap
    cy_bot = y0 + 18            # above footer
    usable_h = cy_top - cy_bot  # ≈ 755 mm
    # Upper = 57% of usable. Lower = 43%.
    split_y = cy_bot + int(usable_h * 0.43)  # bottom of lower, top of upper = split_y

    # ---------------- UPPER (主图区, ~430 mm tall) ----------------
    up_y_top = cy_top
    up_y_bot = split_y + 4
    up_h = up_y_top - up_y_bot
    # Left 72% = MASTER PLAN main figure
    mp_w = iw * 0.72
    panel_box(x0, up_y_bot, mp_w, up_h, bg="#ffffff", stroke="#94a3b8",
              title="① 总平面 · 三层范围与重点区落位  （阅读主图，1 : ≈ 25,000）",
              title_bg="#1d4ed8")
    # leave 14mm for title band at top, add 4mm thin legend at bottom
    imgfit("site-overview.png",
           x0 + 4, up_y_bot + 4,
           mp_w - 8, up_h - 7 - 4 - 6,
           caption="图例：统筹研究范围（灰）· 总体设计范围（蓝）· 三处重点区（黄/橙/红）· 京张遗址绿廊主轴",
           cap_bg="#172235")

    # Right 28% = 设计主张五规则卡片 + 三层范围表
    rx = x0 + mp_w + 5
    rw = iw - mp_w - 5
    # Card 1: 设计主张五规则 (占上 62%)
    rule_h = up_h * 0.62
    rule_y = up_y_bot + (up_h - rule_h)
    panel_box(rx, rule_y, rw, rule_h, bg="#fff7ed", stroke="#c2410c",
              title="② 先轨后城 · 五条空间生成规则（≠ 沿轴新建楼）",
              title_bg="#9a3412")
    body_x = rx + 4
    body_w = rw - 8
    ty = rule_y + rule_h - 7 - 4  # below title
    ty = wwrap("母题：铁轨的锈色与轨行区活化。每条规则都给出不同于常规矩形轴带的几何结论：",
               body_x, ty, body_w, size=9, color="#7c2d12")
    ty -= 2
    rules = [
        ("01 退线分级", "一期激活带内不落永久建筑基底，先让出缓冲带，实测需求后回填"),
        ("02 退台剖面", "轨/绿廊 → 可逆边带 → 慢行主廊 → 基座，建筑向两侧逐级升高"),
        ("03 材质时态差", '一期锈色钢＋木构与二期混凝土/玻璃区分，「城」的增量可辨于「轨」'),
        ("04 慢行主廊本体", "慢行主廊设在走廊本体内；横穿廊道垂直路一律行人骑行优先"),
        ("05 需求后固化", "临廊段完成一期激活并运行校验期后，建筑/场地才允许固化"),
    ]
    for h, t in rules:
        ty -= 1
        ty = wwrap(f"▎{h}", body_x, ty, body_w, size=9.5, bold=True, color="#9a3412")
        ty = wwrap(t, body_x + 3, ty, body_w - 3, size=8.8, color="#1f2937")
        ty -= 2

    # Card 2: 三层范围工作框架 (占下 38% - 4mm gap)
    fr_h = rule_y - up_y_bot - 5
    fr_y = up_y_bot
    panel_box(rx, fr_y, rw, fr_h, bg="#f0fdf4", stroke="#15803d",
              title="③ 三层范围工作框架", title_bg="#15803d")
    fx = rx + 4
    fw = rw - 8
    thdr = ["层级", "面积", "设计落点"]
    trows = [
        ["统筹研究", "43.6 km²", "AI 产业生态 · 创新链"],
        ["总体设计", "11.4 km²", "更新框架 · 用地/道路/绿地"],
        ["重点区域", "368.4 ha", "三片区详细设计深度"],
    ]
    tcy = fr_y + fr_h - 7 - 3
    cws = [fw * 0.28, fw * 0.28, fw * 0.44]
    tab(thdr, trows, fx, tcy, fw, cws, hdr_size=8.5, cell_size=8, rh=6.5)

    # ---------------- LOWER (支撑区, ~325 mm tall) ----------------
    lo_y_top = split_y
    lo_y_bot = cy_bot
    lo_h = lo_y_top - lo_y_bot
    # 4 equal panels with 5mm gaps
    gap = 5
    pw = (iw - gap * 3) / 4
    # Panel A: 用地分区 (land-use-structure) — main supporting figure
    p1x = x0
    panel_box(p1x, lo_y_bot, pw, lo_h, bg="#ffffff", stroke="#1d4ed8",
              title="④ 用地分区与分期 · 四类用地", title_bg="#1d4ed8")
    imgfit("land-use-structure.png",
           p1x + 3, lo_y_bot + 3, pw - 6, lo_h - 7 - 6 - 6,
           caption="0802 AI研发 23.4% · 1401 绿地 22.7% · 05 产业 29.5% · 0702 配套 24.4%",
           cap_bg="#172235")

    # Panel B: 分期 (phasing) + 场景落位 — 图 + 阶段卡 under
    p2x = x0 + pw + gap
    panel_box(p2x, lo_y_bot, pw, lo_h, bg="#ffffff", stroke="#9a3412",
              title="⑤ 分期三阶段 · 轨活 → 城随 → 续轨", title_bg="#9a3412")
    imgfit("phasing.png",
           p2x + 3, lo_y_bot + 30, pw - 6, lo_h - 7 - 6 - 30,
           caption="一期 28.5%（0-3年）· 二期 20.2%（3-6年）· 三期 49.9%（6-10年）",
           cap_bg="#172235")
    # Add phase text cards below
    for i, (ph, c1, c2, span) in enumerate([
        ("一期 轨活", "#7c2d12", "#fff7ed", "0–3年"),
        ("二期 城随", "#c2410c", "#ffedd5", "3–6年"),
        ("三期 续轨", "#166534", "#dcfce7", "6–10年"),
    ]):
        bx = p2x + 4 + (pw - 8) * (i / 3) + 1
        bw2 = (pw - 8) / 3 - 2
        by = lo_y_bot + 20
        bh = 10
        c.setFillColor(colors.HexColor(c2))
        c.setStrokeColor(colors.HexColor(c1))
        c.setLineWidth(0.3 * mm)
        c.rect(bx * mm, by * mm, bw2 * mm, bh * mm, fill=1, stroke=1)
        c.setFont(BOLD_FONT, 8)
        c.setFillColor(colors.HexColor(c1))
        c.drawString((bx + 1.5) * mm, (by + 3.2) * mm, f"{ph} {span}")

    # Panel C: 剖面 (section) — 设计规则的空间化表达
    p3x = x0 + (pw + gap) * 2
    panel_box(p3x, lo_y_bot, pw, lo_h, bg="#ffffff", stroke="#15803d",
              title="⑥ 退台式剖面（时态差）", title_bg="#15803d")
    imgfit("section.png",
           p3x + 3, lo_y_bot + 10, pw - 6, lo_h - 7 - 10 - 14,
           caption="铁轨/绿廊 → 可逆边带 → 慢行主廊 → 建筑基座 逐级升高",
           cap_bg="#172235")
    # Five material/timing markers on bottom
    items = [
        ("轨", "#15803d"),
        ("可逆激活", "#8a4b2a"),
        ("慢行主廊", "#0284c7"),
        ("建筑基座", "#475569"),
        ("二期增量", "#6d28d9"),
    ]
    ix, iy = p3x + 4, lo_y_bot + 3.5
    iw2 = (pw - 8) / len(items)
    for i, (lbl, col) in enumerate(items):
        bx = ix + i * iw2
        c.setFillColor(colors.HexColor(col))
        c.rect(bx * mm, iy * mm, 3 * mm, 3 * mm, fill=1, stroke=0)
        c.setFont(BOLD_FONT, 7.5)
        c.setFillColor(colors.HexColor("#0f172a"))
        c.drawString((bx + 4) * mm, (iy + 0.6) * mm, lbl)

    # Panel D: 核心指标 + 区域协同简表 (auxiliary compact info)
    p4x = x0 + (pw + gap) * 3
    panel_box(p4x, lo_y_bot, pw, lo_h, bg="#f8fafc", stroke="#0f172a",
              title="⑦ 核心指标（GeoJSON 复算·跨文件同值）", title_bg="#0f172a")
    dx = p4x + 3
    dw = pw - 6
    dhdr = ["指标", "值"]
    drows = [
        ["总体设计范围", "11,412,825 ㎡"],
        ["绿地率 / 覆盖率", "26.3% / 26.3%"],
        ["公共空间率", "7.3%"],
        ["绿 + 公共空间合计", "33.6%"],
        ["建筑覆盖率", "6.0%"],
        ["慢行主廊长度", "≈ 8,994 m"],
        ["重点区数量", "3 处"],
    ]
    tcy = lo_y_bot + lo_h - 7 - 3
    dcws = [dw * 0.58, dw * 0.42]
    tab(dhdr, drows, dx, tcy, dw, dcws, hdr_size=8.5, cell_size=8, rh=6.2)
    # 区域协同 4 bullets under table
    sy = lo_y_bot + 3
    c.setFont(BOLD_FONT, 8.5)
    c.setFillColor(colors.HexColor("#0f172a"))
    c.drawString(dx * mm, (sy + 12) * mm, "区域协同接口：")
    bullets = [
        "· 北纬/未来科学城：人才-研发流",
        "· 怀柔科学城：数据-算力-联合实验",
        "· 经开区：中试-量产订单回流",
        "· 京津冀：应用场景-市场数据",
    ]
    cyy = sy + 8.5
    for b in bullets:
        c.setFont(HEI, 7.5)
        c.setFillColor(colors.HexColor("#334155"))
        c.drawString(dx * mm, cyy * mm, b)
        cyy -= 3.1

    c.showPage()

    # ====================================================================
    # Page 2 — 3 重点区主图 + AI 治理 OS + 弱势群体 + 合规 （下半全填满）
    # ====================================================================
    draw_head_foot(
        "重点片区 · AI 治理操作系统 · 弱势群体 · 合规 | 详板",
        "三重点区 × 三期 × 10 场景治理闭环 × 7 弱势群体画像 × 合规五处一致 · Page 2/2",
        2,
        "⚠ 临时边界警示：矩形边不代表地块/道路红线；开发强度/高度/道路红线内容待正式控规条件确认。"
    )
    cy_top = y0 + ih - 54 - 4
    cy_bot = y0 + 18
    usable_h = cy_top - cy_bot
    split_y = cy_bot + int(usable_h * 0.44)  # lower = 44% = substantial

    # ---------------- UPPER (3 重点区主图, ~425 mm tall) ----------------
    up_y_top = cy_top
    up_y_bot = split_y + 4
    up_h = up_y_top - up_y_bot
    # Left 58% = KEY AREAS 全图 as dominant figure (zoomed across whole 3)
    kw = iw * 0.58
    panel_box(x0, up_y_bot, kw, up_h, bg="#ffffff", stroke="#1d4ed8",
              title="① 三大重点片区（三主图同比例尺定位）", title_bg="#1d4ed8")
    imgfit("key-areas.png",
           x0 + 4, up_y_bot + 4, kw - 8, up_h - 7 - 4 - 5,
           caption="众智园AI自主创新加速区 192.1ha · 北京AI原点社区 104.3ha · 大钟寺AI产业聚集区 72.0ha",
           cap_bg="#172235")
    # Three mini callouts below key-areas figure
    callouts = [
        ("A 众智园", "花园型自主创新 · 国家平台 / 产业展示 / 清河文化 / 安全治理沙盒", "#1d4ed8", "#dbeafe"),
        ("B 原点社区", "近校成果转化 · 校区-园区-街区连通 / 开源发布 / 孵化 / 人才特区", "#9a3412", "#fff7ed"),
        ("C 大钟寺", "城市智能经济 · 站城四象限 / 国际路演客厅 / 数据要素 · 内容消费", "#15803d", "#dcfce7"),
    ]
    cw3 = (kw - 10) / 3
    for i, (lbl, desc, co, cbg) in enumerate(callouts):
        cxp = x0 + 4 + i * (cw3 + 2)
        c.setFillColor(colors.HexColor(cbg))
        c.setStrokeColor(colors.HexColor(co))
        c.setLineWidth(0.4 * mm)
        hc = up_y_bot + 4 + 7
        c.rect(cxp * mm, hc * mm, cw3 * mm, 14 * mm, fill=1, stroke=1)
        c.setFont(BOLD_FONT, 9)
        c.setFillColor(colors.HexColor(co))
        c.drawString((cxp + 2) * mm, (hc + 9.5) * mm, lbl)
        c.setFont(HEI, 7.5)
        c.setFillColor(colors.HexColor("#111827"))
        # description wraps
        wwrap(desc, cxp + 2, hc + 6, cw3 - 4, size=7.5, color="#1f2937")

    # Right 42% = 3 key-area cards stacked (each ~135 mm)
    rx = x0 + kw + 5
    rw = iw - kw - 5
    card_h = (up_h - 10) / 3
    titles = [
        ("② 众智园 · 192.1 ha", "清河界面 + 产业展示 + 对外交通 + 自主模型测试 + 标准制定 + 安全沙盒",
         "#1d4ed8", "#dbeafe"),
        ("③ 原点社区 · 104.3 ha", "校-园-街慢行连通 + 开源发布厅 + 近校孵化 + 人才特区服务",
         "#9a3412", "#fff7ed"),
        ("④ 大钟寺 · 72.0 ha", "大钟寺站一体化 + 四象限步行连通 + 商业服务更新 + 国际路演客厅",
         "#15803d", "#dcfce7"),
    ]
    for i, (tt, body, bg, bg2) in enumerate(titles):
        yy = up_y_bot + i * (card_h + 5)
        panel_box(rx, yy, rw, card_h, bg=bg2, stroke=bg, title=tt, title_bg=bg)
        # Sub-panel inside: scenario mini-table
        bx = rx + 4
        bw2 = rw - 8
        # Position title-sub-body below 7mm title
        body_top = yy + card_h - 7 - 3
        bot = wwrap(body, bx, body_top, bw2, size=9, color="#1f2937")
        # Mini scenario 3-pill badges
        scs = [
            ("定位", "AI 自主创新 / 成果转化 / 智能经济", bg),
            ("动作", "空间 + 场景 + 运营", bg),
            ("先轨落点", "清河界面 / 连通 / 四象限", bg),
        ][:3]
        badge_y = bot - 2
        bw_b = (bw2 - 4) / 3
        for j, (bl, bd, co) in enumerate(scs):
            bxp = bx + 2 + j * bw_b
            byy = badge_y - 7
            c.setFillColor(colors.HexColor(bg))
            c.setStrokeColor(colors.HexColor(bg))
            c.setLineWidth(0.3 * mm)
            c.rect(bxp * mm, (byy + 5) * mm, bw_b * mm, 2.2 * mm, fill=1, stroke=0)
            c.setFont(BOLD_FONT, 7)
            c.setFillColor(colors.HexColor("#ffffff"))
            c.drawString((bxp + 1.5) * mm, (byy + 5.6) * mm, bl)
            wwrap(bd, bxp, byy + 4, bw_b, size=6.8, color="#334155")

    # ---------------- LOWER (substantial bottom, ~330 mm tall) ----------------
    lo_y_top = split_y
    lo_y_bot = cy_bot
    lo_h = lo_y_top - lo_y_bot

    # Split horizontally: left 62% = Governance OS + 10 Scenario Matrix (stacked)
    #                  right 38% = Vulnerable 7-persona + Compliance strip
    gap = 5
    lw = iw * 0.62
    rw2 = iw - lw - gap

    # LEFT stack top: AI Governance 6-state machine (60% of lower height)
    g_y_top = lo_y_top
    g_h = lo_h * 0.62
    gx = x0
    panel_box(gx, lo_y_top - g_h, lw, g_h, bg="#ffffff", stroke="#0f172a",
              title="⑤ AI 治理操作系统 · 六状态状态机（贯穿 10 张场景卡生命周期）",
              title_bg="#0f172a")
    shdr = ["状态", "含义", "进入条件", "去向 / 失败降级"]
    srows = [
        ["concept 概念", "命名层、无必要性论证", "场景提出", "必要性→simulation；无→不进清单"],
        ["simulation 仿真", "受控环境验证数据流", "必要性论证通过", "通过→sandbox；失败→回退/退役"],
        ["sandbox 沙盒", "真实数据/模型红队测试", "仿真通过", "专家→human_review；未过→停止隔离"],
        ["human_review 复核", "专业方负最终责任", "沙盒通过", "通过→deepening；否决→回退/退役"],
        ["deepening 运营", "真实环境运行+校验", "复核通过", "通过→固化；KPI/安全→红牌暂停"],
        ["retired 退出", "退役可逆拆除归档", "红牌或退出触发", "记录归档 / 可逆设施拆除"],
    ]
    scws = [lw * 0.13, lw * 0.18, lw * 0.28, lw * 0.41]
    stcy = lo_y_top - 7 - 3
    tab(shdr, srows, gx + 3, stcy, lw - 6, scws, hdr_size=8.5, cell_size=7.5, rh=7.2)

    # LEFT stack bottom: 10-scenario 5x2 matrix (38% of lower height - 5mm gap)
    sm_y_top = lo_y_top - g_h - gap
    sm_h = sm_y_top - lo_y_bot
    panel_box(gx, lo_y_bot, lw, sm_h, bg="#ffffff", stroke="#1d4ed8",
              title="⑥ 10 AI 场景卡完整矩阵（数据输入 → 人工复核 → 失败降级 → 退出条件）",
              title_bg="#1d4ed8")
    cols2 = 5
    rows2 = 2
    # Draw grid big cells
    gxp = gx + 4
    gyp = lo_y_bot + 4
    cw2 = (lw - 8 - (cols2 - 1) * 2) / cols2
    ch2 = (sm_h - 7 - 8 - (rows2 - 1) * 2) / rows2
    labels = AI_SCENARIOS
    # Color per scenario type
    colors_pick = ["#1d4ed8", "#9a3412", "#15803d", "#0369a1", "#7c3aed",
                   "#b45309", "#0891b2", "#4c1d95", "#be123c", "#475569"]
    idx = 0
    for r in range(rows2):
        for cc in range(cols2):
            if idx >= len(labels):
                break
            cxp = gxp + cc * (cw2 + 2)
            cyp = gyp + (rows2 - 1 - r) * (ch2 + 2)
            co = colors_pick[idx]
            c.setFillColor(colors.HexColor(co))
            c.rect(cxp * mm, (cyp + ch2 - 5) * mm, cw2 * mm, 5 * mm, fill=1, stroke=0)
            c.setFont(BOLD_FONT, 8.5)
            c.setFillColor(colors.HexColor("#ffffff"))
            c.drawString((cxp + 2) * mm, (cyp + ch2 - 3.2) * mm, labels[idx])
            # 3 aux lines below colored head
            aux = [
                "· 空间载体：沿线节点",
                "· 治理闭环：人工复核",
                "· 失败降级：回落人工",
            ]
            ayy = cyp + ch2 - 8
            for al in aux:
                c.setFont(HEI, 6.8)
                c.setFillColor(colors.HexColor("#334155"))
                c.drawString((cxp + 2) * mm, ayy * mm, al)
                ayy -= 2.8
            c.setStrokeColor(colors.HexColor(co))
            c.setLineWidth(0.3 * mm)
            c.rect(cxp * mm, cyp * mm, cw2 * mm, ch2 * mm, fill=0, stroke=1)
            idx += 1

    # RIGHT column: TOP = 7 Vulnerable personas (60% height)
    vx = x0 + lw + gap
    vh = lo_h * 0.62
    panel_box(vx, lo_y_top - vh, rw2, vh, bg="#fff7ed", stroke="#9a3412",
              title="⑦ 弱势群体独立画像 · 7 类 · 空间痛点 + 先轨动作",
              title_bg="#9a3412")
    phdr = ["人群", "痛点", "先轨后城动作"]
    prows = [
        ["老人", "长廊步行距离长/设施少", "每400m休憩亭+全程零高差"],
        ["儿童", "穿越通勤安全隐患", "隔离慢行带+口袋游戏场"],
        ["残障", "导视不清/路线阻断", "连续无障碍+盲文导视"],
        ["照护者", "设施间距大休憩不足", "每400m母婴/陪护节点"],
        ["低收入", "创新区消费门槛高", "公共空间100%免费开放"],
        ["非数字用户", "数字场景难以触达", "100%场景配线下人工替代"],
        ["夜间工作者", "夜间照明与服务缺失", "24h分级照明与安全服务"],
    ]
    pcws = [rw2 * 0.17, rw2 * 0.36, rw2 * 0.47]
    vcy = lo_y_top - 7 - 3
    tab(phdr, prows, vx + 3, vcy, rw2 - 6, pcws, hdr_size=8.5, cell_size=7.8, rh=6.0)

    # RIGHT column: BOTTOM = 4 Compliance/IP banners (tight grid, substantive, not skinny)
    b_y_top = lo_y_top - vh - gap
    bh = b_y_top - lo_y_bot
    # 2 rows × 2 cols banner cards
    gap2 = 3
    bhalf = (rw2 - gap2 - 6) / 2
    cards = [
        ("⑧ 风险合规五一致", "#b91c1c", "#fef2f2",
         ["· 不用provisional冒充官方红线",
          "· 边界状态统标 provisional",
          "· manifest/metrics/自检/假设/验证五处一致",
          "· 逐资产版权台账",
          "· 每个数字溯源 agent_fact_pack.md"]),
        ("⑨ 场景矩阵 7列完整", "#1d4ed8", "#eff6ff",
         ["· ①数据输入→②模型流程",
          "· ③人工复核→④运营主体",
          "· ⑤失败降级→⑥KPI→⑦退出",
          "· ≥3产业测试 + 准入/安全协议",
          "· ≥5用户画像 + 老人/残障"]),
        ("⑩ 全球一手案例 official_public", "#9a3412", "#fff7ed",
         ["· Quayside(WaterfrontToronto):4.9/3.2ha",
          "· King's Cross:67英亩/>40%/CSM2011",
          "· 涩谷(Tokyu):东塔230m/2019-11",
          "· Singapore:Singpass97%/41M月交易",
          "· 京张遗址公园(本锚点):一期已开放"]),
        ("⑪ VI 成品 & 五规则生成", "#15803d", "#dcfce7",
         ["· Logo 矢量:jingzhang-railfirst-logo.svg",
          "· 三色：锈#8a4b2a/蓝#295f9f/绿#15803d",
          "· 五规则：退线/剖面/材质/慢行/分期",
          "· 隐喻≠矩形色块，有生成门",
          "· 版权台账 report/copyright_statement.md §5"]),
    ]
    for i, (tt, col, bg2, lines) in enumerate(cards):
        rpos = i // 2
        cpos = i % 2
        cx1 = vx + 3 + cpos * (bhalf + gap2)
        cy1 = lo_y_bot + 4 + rpos * (bh - 8 + gap2)
        c.setFillColor(colors.HexColor(bg2))
        c.setStrokeColor(colors.HexColor(col))
        c.setLineWidth(0.35 * mm)
        chh = (bh - 8 - gap2) / 2
        c.rect(cx1 * mm, cy1 * mm, bhalf * mm, chh * mm, fill=1, stroke=1)
        c.setFillColor(colors.HexColor(col))
        c.rect(cx1 * mm, (cy1 + chh - 5) * mm, bhalf * mm, 5 * mm, fill=1, stroke=0)
        c.setFont(BOLD_FONT, 8.5)
        c.setFillColor(colors.HexColor("#ffffff"))
        c.drawString((cx1 + 2) * mm, (cy1 + chh - 3.2) * mm, tt)
        # lines
        ayy = cy1 + chh - 7
        for ln in lines:
            c.setFont(HEI, 6.8)
            c.setFillColor(colors.HexColor("#111827"))
            c.drawString((cx1 + 2) * mm, ayy * mm, ln)
            ayy -= 2.9

    c.showPage()
    c.save()
    return buf.getvalue()


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("submission_dir")
    args = parser.parse_args()
    root = Path(args.submission_dir).resolve()
    global FIG_DIR
    FIG_DIR = root / "assets" / "figures"
    drawings = root / "drawings"
    drawings.mkdir(exist_ok=True)
    (drawings / "a3-booklet.pdf").write_bytes(build_booklet())
    (drawings / "a0-boards.pdf").write_bytes(build_boards())
    for name in ("a3-booklet.pdf", "a0-boards.pdf"):
        size = (drawings / name).stat().st_size
        print(f"{name}: {size} bytes")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
