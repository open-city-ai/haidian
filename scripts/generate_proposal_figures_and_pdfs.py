#!/usr/bin/env python3
"""Generate high-resolution PNG figures and A3/A0 presentation PDFs for Jingzhang AI submission package."""

import os
import sys
import math
import json
import shutil
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.collections import PatchCollection

from reportlab.lib.pagesizes import A3, A0, landscape
from reportlab.lib import colors
from reportlab.lib.units import mm, inch
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image as RLImage, PageBreak, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Register Chinese Font
FONT_PATH = "C:/Windows/Fonts/simhei.ttf"
FONT_YAHEI_PATH = "C:/Windows/Fonts/msyh.ttc"

FONT_NAME = "SimHei"
if os.path.exists(FONT_PATH):
    pdfmetrics.registerFont(TTFont('SimHei', FONT_PATH))
else:
    FONT_NAME = "Helvetica-Bold"

def get_pil_font(size, bold=False):
    try:
        if os.path.exists(FONT_PATH):
            return ImageFont.truetype(FONT_PATH, size)
        elif os.path.exists("C:/Windows/Fonts/arial.ttf"):
            return ImageFont.truetype("C:/Windows/Fonts/arial.ttf", size)
    except Exception:
        pass
    return ImageFont.load_default()


# Color Palette
COLOR_BG = (11, 15, 25)           # #0b0f19 Deep Navy
COLOR_PANEL = (22, 32, 54)        # #162036 Panel
COLOR_CYAN = (0, 242, 254)        # #00f2fe Cyber Cyan
COLOR_GREEN = (0, 255, 135)       # #00ff87 Eco Green
COLOR_MAGENTA = (255, 42, 109)    # #ff2a6d Pulse Pink
COLOR_AMBER = (247, 183, 49)      # #f7b731 Tech Amber
COLOR_TEXT = (240, 244, 248)      # #f0f4f8 Crisp White
COLOR_MUTED = (148, 163, 184)     # #94a3b8 Muted Gray
COLOR_GRID = (30, 41, 69)         # #1e2945 Grid line

def create_base_canvas(width=2400, height=1350):
    img = Image.new('RGB', (width, height), COLOR_BG)
    draw = ImageDraw.Draw(img)
    
    # Draw dark tech grid background
    grid_size = 60
    for x in range(0, width, grid_size):
        draw.line([(x, 0), (x, height)], fill=COLOR_GRID, width=1)
    for y in range(0, height, grid_size):
        draw.line([(0, y), (width, y)], fill=COLOR_GRID, width=1)
        
    return img, draw


def draw_header_banner(draw, title, subtitle, width=2400):
    # Top banner panel
    draw.rectangle([(0, 0), (width, 100)], fill=(15, 23, 42))
    draw.line([(0, 100), (width, 100)], fill=COLOR_CYAN, width=3)
    
    font_title = get_pil_font(36, bold=True)
    font_sub = get_pil_font(20)
    font_badge = get_pil_font(18)
    
    draw.text((40, 22), title, fill=COLOR_CYAN, font=font_title)
    draw.text((40, 64), subtitle, fill=COLOR_MUTED, font=font_sub)
    
    # Right badge
    badge_text = "FORMAL SUBMISSION | EPSG:4326 / EPSG:4548"
    draw.rectangle([(width - 480, 25), (width - 40, 75)], outline=COLOR_CYAN, fill=(20, 30, 50), width=2)
    draw.text((width - 460, 40), badge_text, fill=COLOR_GREEN, font=font_badge)


# --- FIGURE 1: Overall Masterplan ---
def generate_fig1(output_path):
    w, h = 2400, 1350
    img, draw = create_base_canvas(w, h)
    draw_header_banner(draw, "百年京张·智算双轴 | 总体空间主导规划 Masterplan Diagram", 
                       "Coordinated Research Area (43.6 km²) · Overall Design Area (11.4 km²) · 3 Key Areas (3.684 km²)")
    
    # Map area canvas (Left center)
    map_box = [60, 130, 1550, 1290]
    draw.rectangle(map_box, fill=(15, 22, 38), outline=COLOR_GRID, width=2)
    
    # Draw simulated spatial boundaries
    # 1. Coordinated Research Area (Outer boundary)
    coord_pts = [(120, 180), (1480, 180), (1500, 1240), (100, 1240)]
    draw.polygon(coord_pts, outline=COLOR_MUTED, width=2)
    font_lbl = get_pil_font(18)
    draw.text((140, 195), "统筹研究范围 (43.6 km²) Coordinated Research Area", fill=COLOR_MUTED, font=font_lbl)
    
    # 2. Overall Design Area (Inner boundary)
    overall_pts = [(250, 250), (1350, 250), (1380, 1170), (220, 1170)]
    draw.polygon(overall_pts, fill=(0, 242, 254, 20), outline=COLOR_CYAN, width=3)
    draw.text((270, 265), "总体设计范围 (11.4 km²) Overall Design Area", fill=COLOR_CYAN, font=get_pil_font(22, bold=True))
    
    # 3. Dual Corridors
    # Underground Compute Corridor (Cyan glowing dashed)
    for i in range(250, 1150, 40):
        draw.line([(780, i), (780, min(i+25, 1150))], fill=COLOR_CYAN, width=6)
        draw.ellipse([(773, i+5), (787, i+19)], fill=COLOR_CYAN)
    draw.text((795, 300), "地下智算管廊轴 (Underground Compute Axis - Latency <1ms)", fill=COLOR_CYAN, font=get_pil_font(18))
    
    # Aboveground Green Railway Axis (Green glowing)
    for i in range(250, 1150, 40):
        draw.line([(850, i), (850, min(i+25, 1150))], fill=COLOR_GREEN, width=8)
    draw.text((865, 330), "地上京张生态绿轴 (Green Railway Park Axis)", fill=COLOR_GREEN, font=get_pil_font(18))
    
    # 4. Three Key Focus Areas
    # Key Area 1: Zhongzhiyuan
    zzy_box = [350, 380, 720, 680]
    draw.rectangle(zzy_box, fill=(0, 242, 254, 50), outline=COLOR_CYAN, width=3)
    draw.text((360, 395), "★ 众智园 AI自主创新加速区", fill=COLOR_CYAN, font=get_pil_font(20, bold=True))
    draw.text((360, 425), "面积: 192.1 ha (1,921,000 m²)", fill=COLOR_TEXT, font=get_pil_font(16))
    draw.text((360, 450), "功能: 绿算枢纽 / 共同管廊 / 具身中试", fill=COLOR_MUTED, font=get_pil_font(16))
    
    # Key Area 2: Beijing AI Origin
    aio_box = [920, 450, 1280, 720]
    draw.rectangle(aio_box, fill=(0, 255, 135, 50), outline=COLOR_GREEN, width=3)
    draw.text((930, 465), "★ 北京 AI原点社区", fill=COLOR_GREEN, font=get_pil_font(20, bold=True))
    draw.text((930, 495), "面积: 104.3 ha (1,043,000 m²)", fill=COLOR_TEXT, font=get_pil_font(16))
    draw.text((930, 520), "功能: 边缘算力 / 开源家园 / 极客街区", fill=COLOR_MUTED, font=get_pil_font(16))
    
    # Key Area 3: Dazhongsi Cluster
    dzs_box = [500, 820, 1150, 1080]
    draw.rectangle(dzs_box, fill=(255, 42, 109, 50), outline=COLOR_MAGENTA, width=3)
    draw.text((510, 835), "★ 大钟寺 AI产业集聚区", fill=COLOR_MAGENTA, font=get_pil_font(20, bold=True))
    draw.text((510, 865), "面积: 72.0 ha (720,000 m²)", fill=COLOR_TEXT, font=get_pil_font(16))
    draw.text((510, 890), "功能: 轨交立体升维 / 声音AI地标", fill=COLOR_MUTED, font=get_pil_font(16))
    
    # Right HUD / Information Side Panel
    hud_box = [1580, 130, 2340, 1290]
    draw.rectangle(hud_box, fill=COLOR_PANEL, outline=COLOR_CYAN, width=2)
    
    draw.text((1610, 160), "总体量化控制指标 Metrics HUD", fill=COLOR_CYAN, font=get_pil_font(26, bold=True))
    draw.line([(1610, 200), (2310, 200)], fill=COLOR_MUTED, width=1)
    
    metrics_data = [
        ("统筹研究总面积", "43.60 km²", "EPSG:4548 Precise Math"),
        ("总体设计范围面积", "11.40 km²", "11,400,000 m²"),
        ("重点片区总面积", "3.684 km²", "368.4 公顷 (3片区)"),
        ("蓝绿空间占比", "38.5 %", "京张线性绿廊+算力绿丘"),
        ("公共空间服务覆盖", "92.0 %", "300米生活圈100%达标"),
        ("算力余热回收利用率", "100.0 %", "热泵闭环冬季全供暖"),
        ("集群内部网络延迟", "< 1.0 ms", "全光子并行计算网络"),
        ("绿电微网供给比例", "85.0 %", "自适应光伏+风能极客微网"),
        ("AI 应用场景与测试场", "10卡 + 3场", "覆盖具身/低空/算力/生活"),
        ("典型用户画像覆盖", "5 类人群", "科学家/创业者/开发者/学生/居民"),
    ]
    
    y = 220
    for label, val, sub in metrics_data:
        draw.rectangle([(1610, y), (2310, y + 80)], fill=(16, 24, 40), outline=COLOR_GRID, width=1)
        draw.text((1630, y + 15), label, fill=COLOR_TEXT, font=get_pil_font(20))
        draw.text((2050, y + 12), val, fill=COLOR_GREEN, font=get_pil_font(24, bold=True))
        draw.text((1630, y + 48), sub, fill=COLOR_MUTED, font=get_pil_font(14))
        y += 92
        
    img.save(output_path)
    print(f"Generated {output_path}")


# --- FIGURE 2: Zhongzhiyuan Detail ---
def generate_fig2(output_path):
    w, h = 2400, 1350
    img, draw = create_base_canvas(w, h)
    draw_header_banner(draw, "众智园 AI自主创新加速区 精细化城市设计", 
                       "Zhongzhiyuan AI Acceleration Area Detail Masterplan (192.1 ha / 1,921,000 m²)")
    
    # Left site map view (1400x1120)
    map_box = [60, 130, 1480, 1290]
    draw.rectangle(map_box, fill=(15, 22, 38), outline=COLOR_GRID, width=2)
    
    # Draw detailed site blocks & buildings
    # R&D blocks
    for bx, by, bw, bh, name in [
        (120, 200, 320, 240, "智算核心枢纽大楼 (Compute Core Hub)"),
        (500, 200, 350, 220, "大模型中试研发基地 (LLM R&D Center)"),
        (900, 200, 480, 260, "具身智能硬件创新中心 (Embodied AI Center)"),
        (120, 500, 380, 300, "极客开发者社区 (Developer Loft)"),
        (550, 480, 380, 280, "液冷算力余热温室 (SC-01 Greenhouse)"),
        (980, 520, 420, 300, "低空经济无人配送枢纽 (SC-03 Drone Hub)"),
        (200, 860, 600, 350, "具身智能多地形测试场 (TB-01 / SC-02 Track)"),
        (850, 860, 550, 350, "京张智算之眼 360°控制塔 (LM-01 Control Tower)"),
    ]:
        draw.rectangle([(bx, by), (bx+bw, by+bh)], fill=(24, 36, 60), outline=COLOR_CYAN, width=2)
        draw.text((bx+15, by+20), name, fill=COLOR_TEXT, font=get_pil_font(18, bold=True))
        # Draw building windows/grid texture
        for gx in range(bx+15, bx+bw-15, 40):
            for gy in range(by+60, by+bh-15, 30):
                draw.rectangle([(gx, gy), (gx+25, gy+18)], fill=(0, 242, 254, 40))
                
    # Conduit line (Cyan dotted)
    draw.line([(100, 460), (1440, 460)], fill=COLOR_CYAN, width=5)
    draw.text((120, 435), "▲ 地下“零延迟”光子与液冷共同管廊 (Underground Conduit Axis)", fill=COLOR_CYAN, font=get_pil_font(16))
    
    # Heat network return line (Amber)
    draw.line([(550, 760), (1440, 760)], fill=COLOR_AMBER, width=4)
    draw.text((560, 735), "▲ 算力余热-城市生态热泵闭环网络 (Thermal Closed-Loop Pipe)", fill=COLOR_AMBER, font=get_pil_font(16))

    # Right side 5 Detailed Design Feature Cards
    r_box = [1520, 130, 2340, 1290]
    draw.rectangle(r_box, fill=COLOR_PANEL, outline=COLOR_CYAN, width=2)
    draw.text((1550, 160), "五大核心精细化协同设计 Feature Highlights", fill=COLOR_CYAN, font=get_pil_font(24, bold=True))
    draw.line([(1550, 195), (2310, 195)], fill=COLOR_MUTED, width=1)
    
    features = [
        ("1. 地下“零延迟”共同管廊", "部署高密度光子计算光缆、液冷主循环管道及高压绿电微网，保障片区内各研发大楼与AI实验室间毫秒级数据互联。", COLOR_CYAN),
        ("2. 算力余热-生态热泵闭环", "100%回收液冷算力节点废热，通过高效率热泵系统为研发办公楼、温室花园景观及社区公共热水供暖，打造零碳样板。", COLOR_GREEN),
        ("3. 景观隐形算力绿丘", "将中小型边缘计算节点置于人工景观绿丘之下，散热通风塔经声学降噪与艺术化造型设计，转化为“光影科技塔”雕塑。", COLOR_AMBER),
        ("4. 具身智能全场景测试场", "包含台阶/沙石/草地全地形机器人测试轨道、地下自动化物流接驳仓、以及楼顶eVTOL/无人机起降塔网。", COLOR_MAGENTA),
        ("5. 三维人机协同街道", "地下-1层为机器人与无人配送车专用物流管廊；地面层为低速无人微循环穿梭车与绿色步行道；空中连廊跨街区交流。", COLOR_CYAN),
    ]
    
    y = 210
    for title, desc, col in features:
        draw.rectangle([(1550, y), (2310, y + 195)], fill=(16, 24, 40), outline=col, width=2)
        draw.text((1570, y + 15), title, fill=col, font=get_pil_font(20, bold=True))
        
        # Word wrap description
        lines = []
        words = desc
        while len(words) > 0:
            lines.append(words[:24])
            words = words[24:]
        
        ly = y + 50
        for line in lines:
            draw.text((1570, ly), line, fill=COLOR_TEXT, font=get_pil_font(16))
            ly += 26
            
        y += 210
        
    img.save(output_path)
    print(f"Generated {output_path}")


# --- FIGURE 3: Compute Infrastructure ---
def generate_fig3(output_path):
    w, h = 2400, 1350
    img, draw = create_base_canvas(w, h)
    draw_header_banner(draw, "双轴协同与算力-热能闭环基础设施系统", 
                       "Dual Corridor System & Compute-Thermal Closed-Loop Infrastructure Architecture")
    
    # 3-Tier Layered Infrastructure Diagram
    # Tier 1: Aboveground Eco Axis (Top)
    draw.rectangle([(100, 150), (2300, 480)], fill=(16, 32, 28), outline=COLOR_GREEN, width=3)
    draw.text((130, 175), "【地上生态绿轴】 京张铁路遗产公园 & 极客露天社区 (Aboveground Green Axis)", fill=COLOR_GREEN, font=get_pil_font(24, bold=True))
    
    # Surface elements
    for x, title, sub in [
        (160, "SC-01 液冷余热温室花园", "利用算力余热维持25℃恒温热带景观"),
        (700, "SC-05 开发者露天沉浸广场", "集成光伏遮阳亭与极客露天代码工位"),
        (1240, "SC-06 景观隐形算力绿丘", "散热塔艺术化转型为光影雕塑灯塔"),
        (1780, "TB-01 具身智能测试轨道", "全地形机器人测试与低空无人机停靠塔"),
    ]:
        draw.rectangle([(x, 230), (x+480, 430)], fill=(24, 48, 40), outline=COLOR_GREEN, width=2)
        draw.text((x+20, 250), title, fill=COLOR_GREEN, font=get_pil_font(20, bold=True))
        draw.text((x+20, 290), sub, fill=COLOR_TEXT, font=get_pil_font(16))
        draw.text((x+20, 360), "[生态+场景+微气候]", fill=COLOR_MUTED, font=get_pil_font(14))
        
    # Heat transfer vertical pipes (Amber vertical glowing arrows)
    for px in [380, 920, 1460, 2000]:
        draw.line([(px, 480), (px, 580)], fill=COLOR_AMBER, width=6)
        draw.polygon([(px-12, 500), (px+12, 500), (px, 475)], fill=COLOR_AMBER) # Arrow up
        draw.text((px+15, 520), "60-65℃ 余热供暖", fill=COLOR_AMBER, font=get_pil_font(14))

    # Tier 2: Thermal Exchange Closed-Loop Middle Section
    draw.rectangle([(100, 580), (2300, 850)], fill=(32, 28, 16), outline=COLOR_AMBER, width=3)
    draw.text((130, 605), "【热能闭环中枢】 算力余热-城市热泵调控系统 (Thermal Pump & Energy Exchange Loop)", fill=COLOR_AMBER, font=get_pil_font(24, bold=True))
    
    # Process blocks
    process_steps = [
        ("1. 高密度液冷机柜", "100 kW/Rack 算力节点", COLOR_CYAN),
        ("2. 废热热能吸收", "60℃ 冷却液循环回路", COLOR_AMBER),
        ("3. 工业级热泵升温", "COP > 4.5 高效提升", COLOR_GREEN),
        ("4. 区域供暖/供水", "100% 替代传统冬暖", COLOR_AMBER),
        ("5. 冷却水回流", "30℃ 循环冷却注入", COLOR_CYAN),
    ]
    
    px = 140
    for title, sub, col in process_steps:
        draw.rectangle([(px, 650), (px+380, 810)], fill=(48, 40, 24), outline=col, width=2)
        draw.text((px+20, 675), title, fill=col, font=get_pil_font(20, bold=True))
        draw.text((px+20, 720), sub, fill=COLOR_TEXT, font=get_pil_font(16))
        px += 430

    # Tier 3: Underground Compute Corridor (Bottom)
    draw.rectangle([(100, 950), (2300, 1280)], fill=(16, 28, 48), outline=COLOR_CYAN, width=3)
    draw.text((130, 975), "【地下智算管廊轴】 光子计算共同管廊 (Underground Compute Pipeline Axis)", fill=COLOR_CYAN, font=get_pil_font(24, bold=True))
    
    for x, title, sub in [
        (160, "高密度光子计算光缆", "<1ms 片区超低延迟互联"),
        (700, "双回路液冷主循环管", "全封闭无尘液冷循环系统"),
        (1240, "自适应绿电微网母线", "85% 绿电直供与智能调度"),
        (1780, "地下自动化物流管廊", "机器人无人配送地下专轨"),
    ]:
        draw.rectangle([(x, 1030), (x+480, 1230)], fill=(24, 40, 68), outline=COLOR_CYAN, width=2)
        draw.text((x+20, 1050), title, fill=COLOR_CYAN, font=get_pil_font(20, bold=True))
        draw.text((x+20, 1090), sub, fill=COLOR_TEXT, font=get_pil_font(16))
        draw.text((x+20, 1160), "[硬核基础设施]", fill=COLOR_MUTED, font=get_pil_font(14))
        
    img.save(output_path)
    print(f"Generated {output_path}")


# --- FIGURE 4: AI Scenarios & Testbeds ---
def generate_fig4(output_path):
    w, h = 2400, 1350
    img, draw = create_base_canvas(w, h)
    draw_header_banner(draw, "10大 AI 场景卡与 3大产业测试场空间分布", 
                       "10 AI Scenarios & 3 Industry Testbeds Spatial Map & Matrix")
    
    # 10 Scenario Cards Grid (Left 2 columns, Right 2 columns, Center Map)
    # Center map area (800x1120)
    map_box = [800, 130, 1600, 1290]
    draw.rectangle(map_box, fill=(15, 22, 38), outline=COLOR_GRID, width=2)
    draw.text((820, 150), "智算双轴 AI场景空间分布地图 Spatial Map", fill=COLOR_CYAN, font=get_pil_font(22, bold=True))
    
    # Dual corridor line on map
    draw.line([(1200, 200), (1200, 1200)], fill=COLOR_CYAN, width=6)
    draw.line([(1230, 200), (1230, 1200)], fill=COLOR_GREEN, width=6)
    
    sc_locations = [
        ("SC-01", 1150, 250, COLOR_GREEN),
        ("SC-02", 1250, 340, COLOR_CYAN),
        ("SC-03", 1140, 440, COLOR_MAGENTA),
        ("SC-04", 1260, 540, COLOR_AMBER),
        ("SC-05", 1150, 640, COLOR_GREEN),
        ("SC-06", 1250, 740, COLOR_CYAN),
        ("SC-07", 1140, 840, COLOR_AMBER),
        ("SC-08", 1260, 940, COLOR_MAGENTA),
        ("SC-09", 1150, 1040, COLOR_GREEN),
        ("SC-10", 1250, 1140, COLOR_CYAN),
    ]
    for sc_id, mx, my, col in sc_locations:
        draw.ellipse([(mx-20, my-20), (mx+20, my+20)], fill=col, outline=COLOR_TEXT, width=2)
        draw.text((mx-18, my-10), sc_id, fill=(0, 0, 0), font=get_pil_font(12, bold=True))
        
    # Testbed zones on center map
    for tx, ty, tw, th, tname in [
        (850, 280, 240, 200, "TB-01 具身智能中试场"),
        (1310, 520, 260, 220, "TB-02 自动驾驶低空协同区"),
        (850, 880, 260, 220, "TB-03 超低延迟算力管廊枢纽"),
    ]:
        draw.rectangle([(tx, ty), (tx+tw, ty+th)], fill=(0, 242, 254, 30), outline=COLOR_CYAN, width=2)
        draw.text((tx+10, ty+15), tname, fill=COLOR_CYAN, font=get_pil_font(14, bold=True))
        
    # Left 5 Cards
    left_scs = [
        ("SC-01 液冷余热温室花园", "利用算力余热维持恒温热带植物温室，形成生态与智算循环示范。"),
        ("SC-02 具身智能多地形测试廊道", "包含台阶、沙石、草地全地形机器人测试轨道与传感器感知校验阵列。"),
        ("SC-03 空地一体无人配送仓", "地下自动化机器人物流管廊与楼顶eVTOL/无人机起降接驳塔结合。"),
        ("SC-04 实时数字孪生交通调控", "基于城市级大模型实现毫秒级微循环交通信号与自动驾驶车辆调度。"),
        ("SC-05 露天代码沉浸广场", "集成光伏遮阳亭、极客露天工位与无线高带宽AI算力接入端口。"),
    ]
    
    y = 130
    for title, desc in left_scs:
        draw.rectangle([(60, y), (770, y + 215)], fill=COLOR_PANEL, outline=COLOR_CYAN, width=2)
        draw.text((80, y + 15), title, fill=COLOR_CYAN, font=get_pil_font(20, bold=True))
        draw.text((80, y + 60), desc[:24], fill=COLOR_TEXT, font=get_pil_font(16))
        draw.text((80, y + 90), desc[24:], fill=COLOR_TEXT, font=get_pil_font(16))
        draw.text((80, y + 150), "状态: 详细设计已就绪 | 位置: 众智园片区", fill=COLOR_MUTED, font=get_pil_font(14))
        y += 230
        
    # Right 5 Cards
    right_scs = [
        ("SC-06 景观隐形算力灯塔", "将中小型边缘计算节点置于绿丘之下，散热塔化为艺术灯塔。"),
        ("SC-07 动态自适应微电网", "分布式光伏+风能+储能自适应微网，优先为核心算力节点供电。"),
        ("SC-08 生成式三维空间AR UI", "为极客与游客提供增强现实城市数字孪生交互与导览界面。"),
        ("SC-09 机器人无人协作咖啡驿站", "具身智能机械臂协作提供咖啡与休闲服务，展示AI生活方式。"),
        ("SC-10 无障碍AI辅助巡检", "厘米级导航与AI视觉巡检系统，服务残障人士与城市基础设施运维。"),
    ]
    
    y = 130
    for title, desc in right_scs:
        draw.rectangle([(1630, y), (2340, y + 215)], fill=COLOR_PANEL, outline=COLOR_GREEN, width=2)
        draw.text((1650, y + 15), title, fill=COLOR_GREEN, font=get_pil_font(20, bold=True))
        draw.text((1650, y + 60), desc[:24], fill=COLOR_TEXT, font=get_pil_font(16))
        draw.text((1650, y + 90), desc[24:], fill=COLOR_TEXT, font=get_pil_font(16))
        draw.text((1650, y + 150), "状态: 详细设计已就绪 | 位置: 京张沿线", fill=COLOR_MUTED, font=get_pil_font(14))
        y += 230
        
    img.save(output_path)
    print(f"Generated {output_path}")


# --- FIGURE 5: Branding VI & Landmarks ---
def generate_fig5(output_path):
    w, h = 2400, 1350
    img, draw = create_base_canvas(w, h)
    draw_header_banner(draw, "品牌视觉识别 system & 三大 AI 朝圣地标", 
                       "Branding VI (Jingzhang AI Compute Valley) & 3 Pilgrimage Landmarks")
    
    # Left Section: Logo & VI Design Concept (1100x1120)
    left_box = [60, 130, 1160, 1290]
    draw.rectangle(left_box, fill=COLOR_PANEL, outline=COLOR_CYAN, width=2)
    draw.text((90, 160), "【品牌 VI 系统】 京张智谷 Jingzhang AI Compute Valley", fill=COLOR_CYAN, font=get_pil_font(24, bold=True))
    draw.line([(90, 200), (1130, 200)], fill=COLOR_MUTED, width=1)
    
    # Logo graphic preview box
    draw.rectangle([(120, 230), (1100, 680)], fill=(12, 18, 32), outline=COLOR_CYAN, width=3)
    
    # Draw Logo Artwork (Dual Rails + Binary Pulse forming Infinity ♾️)
    cx, cy = 610, 430
    # Draw Infinity loop using 2 circles + connecting lines
    draw.ellipse([(cx-250, cy-120), (cx-30, cy+120)], outline=COLOR_CYAN, width=8)
    draw.ellipse([(cx+30, cy-120), (cx+250, cy+120)], outline=COLOR_GREEN, width=8)
    draw.line([(cx-100, cy-100), (cx+100, cy+100)], fill=COLOR_MAGENTA, width=8)
    draw.line([(cx-100, cy+100), (cx+100, cy-100)], fill=COLOR_AMBER, width=8)
    
    draw.text((cx-220, cy+150), "百年京张轨痕 ✕ 二进制脉冲 ✕ 无限智算 ♾️", fill=COLOR_TEXT, font=get_pil_font(22, bold=True))
    
    # Color palette blocks
    draw.text((90, 720), "标准色彩规范 (Brand Color System):", fill=COLOR_TEXT, font=get_pil_font(20, bold=True))
    colors_list = [
        ("深空蓝 #0b0f19", COLOR_BG),
        ("智算青 #00f2fe", COLOR_CYAN),
        ("生态绿 #00ff87", COLOR_GREEN),
        ("脉冲红 #ff2a6d", COLOR_MAGENTA),
        ("科技金 #f7b731", COLOR_AMBER),
    ]
    cx_pos = 90
    for name, col in colors_list:
        draw.rectangle([(cx_pos, 770), (cx_pos+190, 850)], fill=col, outline=COLOR_TEXT, width=1)
        draw.text((cx_pos, 865), name, fill=COLOR_TEXT, font=get_pil_font(14))
        cx_pos += 210
        
    draw.text((90, 930), "VI 核心设计理念:", fill=COLOR_CYAN, font=get_pil_font(20, bold=True))
    draw.text((90, 970), "1. 遗产继承：融合詹天佑百年京张铁路双轨元素，彰显先锋创新精神。", fill=COLOR_TEXT, font=get_pil_font(18))
    draw.text((90, 1010), "2. 智能赋能：二进制脉冲波形交织，象征毫秒级算力流动与闭环。", fill=COLOR_TEXT, font=get_pil_font(18))
    draw.text((90, 1050), "3. 无限未来：无穷符号 (♾️) 寓意算力与生态永续共生，打造全球AI朝圣地。", fill=COLOR_TEXT, font=get_pil_font(18))

    # Right Section: 3 Pilgrimage Landmarks (1100x1120)
    right_box = [1200, 130, 2340, 1290]
    draw.rectangle(right_box, fill=COLOR_PANEL, outline=COLOR_GREEN, width=2)
    draw.text((1230, 160), "【三大 AI 朝圣地标】 空间与文化精神象征", fill=COLOR_GREEN, font=get_pil_font(24, bold=True))
    draw.line([(1230, 200), (2310, 200)], fill=COLOR_MUTED, width=1)
    
    landmarks = [
        ("LM-01: 京张智算之眼 (Eye of Jing-Zhang Compute Hub)", 
         "位置: 众智园片区中央枢纽 | 形式: 360°数字孪生控制塔与悬浮光环\n"
         "功能: 集成片区液冷算力主节点、数字孪生城市监控大厅与公众AI沉浸式观景平台。", COLOR_CYAN),
        ("LM-02: 百年铁路AI原点纪念广场 (Centennial Rail & AI Origin)", 
         "位置: 北京AI原点社区 | 形式: 京张铁路首发轨道与开源大模型纪念碑\n"
         "功能: 将詹天佑工业遗产与全球开源代码雕塑结合，形成开发者朝圣与沉浸式沉思广场。", COLOR_GREEN),
        ("LM-03: 大钟寺智能共鸣音塔 (Dazhongsi Sonic AI Pavilion)", 
         "位置: 大钟寺AI产业集聚区 | 形式: 结合大钟寺古钟声学与智能声光塔\n"
         "功能: 融合古钟声学遗产与AI音频大模型，创造声学研究实验室与音乐AI互动地标。", COLOR_MAGENTA),
    ]
    
    y = 220
    for title, desc, col in landmarks:
        draw.rectangle([(1230, y), (2310, y + 320)], fill=(16, 24, 40), outline=col, width=2)
        draw.text((1250, y + 20), title, fill=col, font=get_pil_font(22, bold=True))
        
        lines = desc.split('\n')
        ly = y + 70
        for l in lines:
            draw.text((1250, ly), l, fill=COLOR_TEXT, font=get_pil_font(18))
            ly += 35
            
        y += 350
        
    img.save(output_path)
    print(f"Generated {output_path}")


# --- PDF GENERATION UTILITIES ---
def build_a3_presentation_boards(pdf_path, fig_paths):
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=landscape(A3),
        rightMargin=15*mm,
        leftMargin=15*mm,
        topMargin=15*mm,
        bottomMargin=15*mm
    )
    
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'BoardTitle',
        parent=styles['Heading1'],
        fontName=FONT_NAME,
        fontSize=24,
        leading=30,
        textColor=colors.HexColor('#00f2fe')
    )
    body_style = ParagraphStyle(
        'BoardBody',
        parent=styles['Normal'],
        fontName=FONT_NAME,
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#1e293b')
    )
    
    story = []
    
    boards_data = [
        ("百年京张·智算双轴 | 01 方案总体愿景与空间架构", fig_paths[0], 
         "本方案确立了“算绿双轴·智算孪生城”的城市空间架构：地下智算轴沿京张遗址公园构建零延迟光子计算与液冷共同管廊；地上生态轴构建全连贯生态公园与极客社区。涵盖统筹研究范围43.6 km²、总体设计范围11.4 km²及三大重点片区3.684 km²。"),
        
        ("百年京张·智算双轴 | 02 众智园核心片区精细化城市设计", fig_paths[1], 
         "众智园片区（192.1公顷）涵盖地下零延迟共同管廊、算力余热100%回收热泵闭环、景观隐形算力绿丘、具身智能全场景测试场及三维人机协同街道，形成硬核AI原生基础设施与高品质空间环境协同示范。"),
         
        ("百年京张·智算双轴 | 03 双轴协同与算力-热能闭环基础设施", fig_paths[2], 
         "构建从绿电微网直供、高密度液冷机柜（100kW/Rack）、60-65℃废热热泵提升至区域供暖与热带温室花园的全生命周期闭环系统，集群内网络时延<1ms，PUE<1.15，示范零碳智算未来。"),
         
        ("百年京张·智算双轴 | 04 10大AI场景卡与3大产业测试场分布", fig_paths[3], 
         "沿双轴精准布局SC-01至SC-10共10大AI场景卡，涵盖温室花园、具身测试、无人配送、数字孪生、代码广场等；设立TB-01具身智能中试场、TB-02低空经济协同区及TB-03算力管廊数据中枢。"),
         
        ("百年京张·智算双轴 | 05 品牌 VI 识别与三大 AI 朝圣地标", fig_paths[4], 
         "确立“京张智谷 (Jingzhang AI Compute Valley)”品牌识别，设计融合百年轨痕与二进制脉冲的Infinity ♾️ Logo；打造LM-01京张智算之眼、LM-02百年铁路AI原点纪念广场及LM-03大钟寺智能共鸣音塔三大朝圣地标。"),
    ]
    
    for title, img_p, text in boards_data:
        story.append(Paragraph(title, title_style))
        story.append(Spacer(1, 4*mm))
        story.append(Paragraph(text, body_style))
        story.append(Spacer(1, 6*mm))
        
        # Fit image to A3 width (approx 380mm wide, 210mm high)
        if os.path.exists(img_p):
            story.append(RLImage(img_p, width=380*mm, height=213*mm))
            
        story.append(PageBreak())
        
    doc.build(story)
    print(f"Generated {pdf_path} (Size: {os.path.getsize(pdf_path)} bytes)")


def build_a0_masterplan_drawings(pdf_path, fig_paths):
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=landscape(A0),
        rightMargin=30*mm,
        leftMargin=30*mm,
        topMargin=30*mm,
        bottomMargin=30*mm
    )
    
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'PlateTitle',
        parent=styles['Heading1'],
        fontName=FONT_NAME,
        fontSize=36,
        leading=46,
        textColor=colors.HexColor('#00f2fe')
    )
    body_style = ParagraphStyle(
        'PlateBody',
        parent=styles['Normal'],
        fontName=FONT_NAME,
        fontSize=18,
        leading=26,
        textColor=colors.HexColor('#0f172a')
    )
    
    story = []
    
    plates_data = [
        ("图纸 01 | 总体城市设计综合平面图 (Masterplan Drawing Plate)", fig_paths[0],
         "范围包含：统筹研究范围 43.6 km²、总体设计范围 11.4 km²、重点区域 3.684 km²。\n指标概览：蓝绿空间占比 38.5%，公共空间覆盖 92.0%，算力余热利用率 100%，网络延迟 <1.0 ms。"),
         
        ("图纸 02 | 众智园核心片区详细设计图 (Zhongzhiyuan Detailed Plate)", fig_paths[1],
         "重点展示：地下零延迟光子共同管廊、算力余热生态热泵网络、具身智能全地形测试场与三维人机协同街道布局。"),
         
        ("图纸 03 | 智算基础设施与 AI 场景综合图 (Infrastructure & Scenarios Plate)", fig_paths[2],
         "包含：算力-热能闭环系统架构、10大AI场景卡（SC-01~SC-10）、3大产业测试场（TB-01~TB-03）及三大朝圣地标（LM-01~LM-03）。"),
    ]
    
    for title, img_p, text in plates_data:
        story.append(Paragraph(title, title_style))
        story.append(Spacer(1, 10*mm))
        story.append(Paragraph(text.replace('\n', '<br/>'), body_style))
        story.append(Spacer(1, 15*mm))
        
        # A0 image scaling (width approx 1100mm, height 620mm)
        if os.path.exists(img_p):
            story.append(RLImage(img_p, width=1100*mm, height=618*mm))
            
        story.append(PageBreak())
        
    doc.build(story)
    print(f"Generated {pdf_path} (Size: {os.path.getsize(pdf_path)} bytes)")


def main():
    if len(sys.argv) > 1:
        base_dir = Path(sys.argv[1]).resolve()
    else:
        base_dir = Path("submissions/open-city-ai-participant/jingzhang-ai-compute-green-axis").resolve()
        
    fig_dir = base_dir / "figures"
    asset_fig_dir = base_dir / "assets" / "figures"
    pdf_dir = base_dir / "drawings"
    
    fig_dir.mkdir(parents=True, exist_ok=True)
    asset_fig_dir.mkdir(parents=True, exist_ok=True)
    pdf_dir.mkdir(parents=True, exist_ok=True)
    
    f1 = fig_dir / "fig1_overall_masterplan.png"
    f2 = fig_dir / "fig2_zhongzhiyuan_detail.png"
    f3 = fig_dir / "fig3_compute_infrastructure.png"
    f4 = fig_dir / "fig4_ai_scenarios.png"
    f5 = fig_dir / "fig5_branding_landmarks.png"
    
    generate_fig1(f1)
    generate_fig2(f2)
    generate_fig3(f3)
    generate_fig4(f4)
    generate_fig5(f5)
    
    # Mirror PNGs to assets/figures/
    for f in [f1, f2, f3, f4, f5]:
        shutil.copy(f, asset_fig_dir / f.name)
    print("Copied all PNG figures to assets/figures/")
    
    fig_paths = [str(f1), str(f2), str(f3), str(f4), str(f5)]
    
    pdf_a3 = pdf_dir / "A3_presentation_boards.pdf"
    pdf_a0 = pdf_dir / "A0_masterplan_drawings.pdf"
    
    build_a3_presentation_boards(str(pdf_a3), fig_paths)
    build_a0_masterplan_drawings(str(pdf_a0), fig_paths)
    
    print("\n--- Summary of Generated Files ---")
    for path in [f1, f2, f3, f4, f5, pdf_a3, pdf_a0]:
        sz = os.path.getsize(path)
        print(f"File: {path.name} | Size: {sz:,} bytes ({sz/1024:.1f} KB)")


if __name__ == "__main__":
    main()
