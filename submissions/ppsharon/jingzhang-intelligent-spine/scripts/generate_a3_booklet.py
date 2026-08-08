#!/usr/bin/env python3
"""
Generate A3 booklet PDF for Jing-Zhang Intelligent Spine proposal.
A3 size: 297mm x 420mm (landscape, for booklet spread)
This creates a 12-page booklet with cover, TOC, and content.
"""

from reportlab.lib.pagesizes import A3, landscape
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
import os

font_path = "/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc"
if os.path.exists(font_path):
    pdfmetrics.registerFont(TTFont("WQYZenHei", font_path))
    BODY_FONT = "WQYZenHei"
else:
    BODY_FONT = "Helvetica"

DARK_BG = HexColor("#1a1a2e")
ACCENT_BLUE = HexColor("#0066FF")
ACCENT_GREEN = HexColor("#00C853")
TEXT_WHITE = HexColor("#F0F0F0")
TEXT_GRAY = HexColor("#A0A0A0")

def draw_page_number(c, page_num, total=12):
    c.setFillColor(TEXT_GRAY)
    c.setFont(BODY_FONT, 14)
    c.drawCentredString(420*mm/2, 12*mm, f"{page_num} / {total}")

def generate_a3_booklet():
    output_path = "/root/.openclaw/workspace/haidian/submissions/ppsharon/jingzhang-intelligent-spine/drawings/a3-booklet.pdf"
    c = canvas.Canvas(output_path, pagesize=landscape(A3))
    w, h = landscape(A3)  # 420 x 297 mm
    
    # ===== PAGE 1: COVER =====
    c.setFillColor(DARK_BG)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    # Logo accent
    c.setFillColor(ACCENT_BLUE)
    c.roundRect(40*mm, 180*mm, 340*mm, 80*mm, 10, fill=1, stroke=0)
    c.setFillColor(TEXT_WHITE)
    c.setFont(BODY_FONT, 48)
    c.drawString(60*mm, 225*mm, "京张智能脊")
    c.setFont(BODY_FONT, 32)
    c.drawString(60*mm, 190*mm, "Jing-Zhang Intelligent Spine")
    
    c.setFillColor(ACCENT_GREEN)
    c.setFont(BODY_FONT, 22)
    c.drawString(40*mm, 150*mm, "从蒸汽脊梁到智能神经网络")
    c.setFillColor(TEXT_GRAY)
    c.drawString(40*mm, 120*mm, "From Steam Backbone to Intelligent Neural Network")
    
    c.setFillColor(TEXT_GRAY)
    c.setFont(BODY_FONT, 16)
    c.drawString(40*mm, 70*mm, "百年京张AI创新带城市设计国际方案征集")
    c.drawString(40*mm, 50*mm, "International Urban Design Competition: Centennial Jing-Zhang AI Innovation Belt")
    c.drawString(40*mm, 30*mm, "Agent: ppsharon (Kimi Claw) | Iteration: v0.1")
    draw_page_number(c, 1)
    c.showPage()
    
    # ===== PAGE 2: TABLE OF CONTENTS =====
    c.setFillColor(DARK_BG)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    c.setFillColor(ACCENT_BLUE)
    c.setFont(BODY_FONT, 32)
    c.drawString(40*mm, 260*mm, "目录 Table of Contents")
    c.setStrokeColor(ACCENT_BLUE)
    c.line(40*mm, 250*mm, 380*mm, 250*mm)
    
    toc = [
        ("01", "项目概览 Project Overview", "第3页"),
        ("02", "空间结构 Spatial Structure", "第4页"),
        ("03", "重点区域 Key Areas", "第5-6页"),
        ("04", "AI场景 AI Scenarios", "第7页"),
        ("05", "交通与市政 Transport & Municipal", "第8页"),
        ("06", "公共利益 Public Interest", "第9页"),
        ("07", "实施计划 Implementation", "第10页"),
        ("08", "指标体系 Metrics", "第11页"),
        ("09", "版权与合规 Compliance", "第12页"),
    ]
    y = 230*mm
    c.setFont(BODY_FONT, 20)
    for num, title, page in toc:
        c.setFillColor(ACCENT_BLUE)
        c.drawString(40*mm, y, num)
        c.setFillColor(TEXT_WHITE)
        c.drawString(80*mm, y, title)
        c.setFillColor(TEXT_GRAY)
        c.drawRightString(380*mm, y, page)
        y -= 22*mm
    draw_page_number(c, 2)
    c.showPage()
    
    # ===== PAGE 3: PROJECT OVERVIEW =====
    c.setFillColor(DARK_BG)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    c.setFillColor(ACCENT_BLUE)
    c.setFont(BODY_FONT, 28)
    c.drawString(30*mm, 270*mm, "01 项目概览 Project Overview")
    
    content = [
        ("设计范围 Design Scope", [
            "统筹研究范围: 43.6 km² (北至北五环，东至京藏高速，南至西直门外大街，西至万泉河路)",
            "总体设计范围: 11.4 km² (京张遗址公园周边1-2公里)",
            "重点区域范围: 368.4 ha (众智园+原点社区+大钟寺)",
        ]),
        ("空间结构 Spatial Structure", [
            "一脊: 京张铁路遗址公园活力带 (南北贯通约9公里)",
            "三核: 众智园(北) + 原点社区(中) + 大钟寺(南)",
            "两脉: 中关村科技服务走廊(西) + 小月河场景赋能走廊(东)",
        ]),
        ("三大定位 Three Positionings", [
            "百年京张文化带 → 铁路遗产活化 + AI新文化地标",
            "都市AI生活体验带 → 可感知的AI城市场景",
            "AI融合创新带 → 全栈自主创新生态",
        ]),
    ]
    y = 250*mm
    for title, lines in content:
        c.setFillColor(ACCENT_GREEN)
        c.setFont(BODY_FONT, 18)
        c.drawString(30*mm, y, title)
        y -= 12*mm
        c.setFillColor(TEXT_WHITE)
        c.setFont(BODY_FONT, 14)
        for line in lines:
            c.drawString(40*mm, y, "• " + line)
            y -= 10*mm
        y -= 8*mm
    draw_page_number(c, 3)
    c.showPage()
    
    # ===== PAGE 4: SPATIAL STRUCTURE =====
    c.setFillColor(DARK_BG)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    c.setFillColor(ACCENT_BLUE)
    c.setFont(BODY_FONT, 28)
    c.drawString(30*mm, 270*mm, "02 空间结构 Spatial Structure")
    
    c.setFillColor(ACCENT_GREEN)
    c.setFont(BODY_FONT, 18)
    c.drawString(30*mm, 250*mm, "一脊 The Spine")
    c.setFillColor(TEXT_WHITE)
    c.setFont(BODY_FONT, 14)
    c.drawString(40*mm, 238*mm, "京张铁路遗址公园南北主轴 (约9km)")
    c.drawString(40*mm, 226*mm, "功能: 文化展示 + 慢行系统 + 公共空间 + AI场景测试")
    
    areas = [
        ("众智园 Zhongzhi Park (192.1 ha)", "花园型全栈自主创新街区 | 安全治理沙盒 + 算力港 + 低碳创新廊"),
        ("原点社区 Origin Community (104.3 ha)", "近校型成果转化与人才社区 | 开源发布厅 + AI原点咖啡 + 开发者步道"),
        ("大钟寺 Dazhongsi (72.0 ha)", "城市型智能经济与国际交往街区 | 国际路演客厅 + AI市集 + 数据要素会客厅"),
    ]
    y = 210*mm
    c.setFillColor(ACCENT_GREEN)
    c.setFont(BODY_FONT, 18)
    c.drawString(30*mm, y, "三核 Three Cores")
    y -= 14*mm
    for title, desc in areas:
        c.setFillColor(ACCENT_BLUE)
        c.setFont(BODY_FONT, 15)
        c.drawString(40*mm, y, title)
        y -= 10*mm
        c.setFillColor(TEXT_WHITE)
        c.setFont(BODY_FONT, 13)
        c.drawString(50*mm, y, desc)
        y -= 18*mm
    
    c.setFillColor(ACCENT_GREEN)
    c.setFont(BODY_FONT, 18)
    c.drawString(30*mm, y, "两脉 Two Corridors")
    y -= 12*mm
    c.setFillColor(TEXT_WHITE)
    c.setFont(BODY_FONT, 14)
    c.drawString(40*mm, y, "西脉: 中关村科技服务走廊 — 高校-企业-资本联动")
    y -= 10*mm
    c.drawString(40*mm, y, "东脉: 小月河场景赋能走廊 — AI+生活场景测试带")
    draw_page_number(c, 4)
    c.showPage()
    
    # ===== PAGE 5: KEY AREA 1 - 众智园 =====
    c.setFillColor(DARK_BG)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    c.setFillColor(ACCENT_BLUE)
    c.setFont(BODY_FONT, 28)
    c.drawString(30*mm, 270*mm, "03 重点区域 Key Areas — 众智园")
    
    c.setFillColor(TEXT_WHITE)
    c.setFont(BODY_FONT, 14)
    lines = [
        "定位: 花园型全栈自主创新街区",
        "面积: 约192.1 ha",
        "",
        "空间动作:",
        "  • 强化清河界面: 滨水创新走廊+产业展示+低碳交往",
        "  • 国家AI平台: 标准制定工作坊+安全治理沙盒+模型测试场",
        "  • 对外交通优化: 五环路区域一体化+入口门户形象",
        "",
        "节点深化: 安全治理沙盒 (Security Governance Sandbox)",
        "  选址: 众智园核心区，约2.3 ha",
        "  功能: 红队测试 + 模型评测 + 标准制定 + 公共展示",
        "  运营: CNCERT/工信部评测机构牵头",
        "  KPI: 年评测≥100模型；高危漏洞≥10个/年",
    ]
    y = 250*mm
    for line in lines:
        c.drawString(30*mm, y, line)
        y -= 10*mm
    draw_page_number(c, 5)
    c.showPage()
    
    # ===== PAGE 6: KEY AREA 2 & 3 =====
    c.setFillColor(DARK_BG)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    c.setFillColor(ACCENT_BLUE)
    c.setFont(BODY_FONT, 28)
    c.drawString(30*mm, 270*mm, "03 重点区域 Key Areas — 原点社区 + 大钟寺")
    
    c.setFillColor(ACCENT_GREEN)
    c.setFont(BODY_FONT, 18)
    c.drawString(30*mm, 250*mm, "原点社区 Origin Community (104.3 ha)")
    c.setFillColor(TEXT_WHITE)
    c.setFont(BODY_FONT, 13)
    y = 236*mm
    for line in [
        "定位: 近校型成果转化与人才社区",
        "节点: 开源发布厅 — 主发布厅(800㎡) + 代码展示廊(400㎡) + 路演角(200㎡×3)",
        "      + AI原点咖啡(300㎡) + 屋顶露台(500㎡) + 创客工坊(400㎡)",
        "运营: 海淀科委+开源中国 | KPI: 年活动≥24场；参与≥5,000人次",
    ]:
        c.drawString(35*mm, y, line)
        y -= 10*mm
    
    c.setFillColor(ACCENT_GREEN)
    c.setFont(BODY_FONT, 18)
    c.drawString(30*mm, y - 5*mm, "大钟寺 Dazhongsi (72.0 ha)")
    y -= 20*mm
    c.setFillColor(TEXT_WHITE)
    c.setFont(BODY_FONT, 13)
    for line in [
        "定位: 城市型智能经济与国际交往街区",
        "节点: 国际路演客厅 — 发布厅(1,000㎡) + 展示区(600㎡) + 洽谈舱(200㎡×6)",
        "      + 媒体中心(300㎡) + 文化甲板(800㎡) + 商业接驳层(1,500㎡)",
        "运营: 海淀投促中心+中关村创业大街 | KPI: 年路演≥48场；融资额≥5亿",
    ]:
        c.drawString(35*mm, y, line)
        y -= 10*mm
    draw_page_number(c, 6)
    c.showPage()
    
    # ===== PAGE 7: AI SCENARIOS =====
    c.setFillColor(DARK_BG)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    c.setFillColor(ACCENT_BLUE)
    c.setFont(BODY_FONT, 28)
    c.drawString(30*mm, 270*mm, "04 AI场景 AI Scenarios")
    
    scenarios = [
        ("SC-01", "开源发布厅", "原点社区", "年活动≥24场"),
        ("SC-02", "安全治理沙盒", "众智园", "年评测≥100模型"),
        ("SC-03", "端侧算力驿站", "全带节点", "可用性≥99.5%"),
        ("SC-04", "AI慢行导航", "遗址公园", "日活≥5,000"),
        ("SC-05", "国际路演客厅", "大钟寺", "年路演≥48场"),
        ("SC-06", "清河低碳创新廊", "众智园", "碳排降低≥10%/年"),
        ("SC-07", "近校成果转化街", "原点社区", "年成果≥100项"),
        ("SC-08", "数据要素会客厅", "大钟寺", "年交易≥50笔"),
        ("SC-09", "AI生活服务样板街", "社区商业", "服务≥5,000人次/月"),
        ("SC-10", "全球AI活动周路线", "全带公共空间", "年参与≥10万人次"),
    ]
    y = 250*mm
    c.setFont(BODY_FONT, 14)
    for code, name, loc, kpi in scenarios:
        c.setFillColor(ACCENT_BLUE)
        c.drawString(30*mm, y, code)
        c.setFillColor(TEXT_WHITE)
        c.drawString(80*mm, y, name)
        c.setFillColor(TEXT_GRAY)
        c.drawString(200*mm, y, loc)
        c.setFillColor(ACCENT_GREEN)
        c.drawString(320*mm, y, kpi)
        y -= 12*mm
    draw_page_number(c, 7)
    c.showPage()
    
    # ===== PAGE 8: TRANSPORT & MUNICIPAL =====
    c.setFillColor(DARK_BG)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    c.setFillColor(ACCENT_BLUE)
    c.setFont(BODY_FONT, 28)
    c.drawString(30*mm, 270*mm, "05 交通与市政 Transport & Municipal")
    
    c.setFillColor(TEXT_WHITE)
    c.setFont(BODY_FONT, 14)
    y = 250*mm
    lines = [
        "轨道站点一体化 (概念方向，供专业团队深化)",
        "  五道口站: 高校-轨道-商业垂直联动",
        "  清华东路西口站: 慢行缝合节点",
        "  大钟寺站: 四象限步行连通",
        "",
        "慢行系统 (概念方向，供专业团队深化)",
        "  京张遗址公园南北贯通步道 (~9km)",
        "  东西向慢行缝合走廊 (跨京藏高速/北五环)",
        "  清河/小月河滨水慢行带",
        "",
        "新型基础设施 (概念方向，供专业团队深化)",
        "  端侧算力节点: 与公共服务设施复合布局",
        "  分布式能源: 光伏+储能+智能电网",
        "  AI市政: 智能巡检+预测性维护+无人配送接驳",
    ]
    for line in lines:
        c.drawString(30*mm, y, line)
        y -= 10*mm
    draw_page_number(c, 8)
    c.showPage()
    
    # ===== PAGE 9: PUBLIC INTEREST =====
    c.setFillColor(DARK_BG)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    c.setFillColor(ACCENT_BLUE)
    c.setFont(BODY_FONT, 28)
    c.drawString(30*mm, 270*mm, "06 公共利益 Public Interest & Inclusivity")
    
    c.setFillColor(TEXT_WHITE)
    c.setFont(BODY_FONT, 14)
    y = 250*mm
    lines = [
        "公平性原则 Equity",
        "  • AI+医疗/教育/法律服务公平准入",
        "  • 空间公平: 公共空间免费、AI节点公共区低价开放",
        "",
        "数字鸿沟应对 Digital Divide",
        "  • 非数字替代方案: 所有AI场景保留人工服务窗口",
        "  • 数字素养提升: 年度数字素养普及周 + 数字志愿者",
        "",
        "无障碍设计 Accessibility",
        "  • 物理空间: 全线盲道、触觉地图、无障碍卫生间(≥10%)",
        "  • 信息无障碍: 语音讲解、实时字幕、手语翻译",
        "",
        "社区参与 Community Engagement",
        "  • 社区规划师制度 + 居民议事会 + 线上共建平台",
        "  • 社区发展基金: 商业收益5-10%注入",
        "",
        "弱势群体保护 Vulnerable Groups",
        "  • 老年人: 长者模式、智能守护套餐(非侵入式监测)",
        "  • 残障人士: 无障碍体验测试、残障友好企业专区",
        "  • 低收入群体: 基础服务免费、定向服务推送",
    ]
    for line in lines:
        c.drawString(30*mm, y, line)
        y -= 10*mm
    draw_page_number(c, 9)
    c.showPage()
    
    # ===== PAGE 10: IMPLEMENTATION =====
    c.setFillColor(DARK_BG)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    c.setFillColor(ACCENT_BLUE)
    c.setFont(BODY_FONT, 28)
    c.drawString(30*mm, 270*mm, "07 实施计划 Implementation Plan")
    
    phases = [
        ("近期 (1-2年)", "轻量启动", [
            "慢行断点缝合、桥下空间激活",
            "AI场景试点启动",
            "年度活动体系启动 (开源节、城市实验季)",
        ]),
        ("中期 (3-5年)", "重点更新", [
            "三处重点区核心项目落地",
            "产业载体建设完成",
            "开发者社区成熟、品牌IP形成",
        ]),
        ("长期 (5-10年)", "生态成熟", [
            "全带AI基础设施完善",
            "全球影响力形成",
            "持续运营机制、年度迭代更新",
        ]),
    ]
    y = 250*mm
    for period, phase, items in phases:
        c.setFillColor(ACCENT_GREEN)
        c.setFont(BODY_FONT, 18)
        c.drawString(30*mm, y, f"{period} — {phase}")
        y -= 12*mm
        c.setFillColor(TEXT_WHITE)
        c.setFont(BODY_FONT, 14)
        for item in items:
            c.drawString(45*mm, y, "• " + item)
            y -= 10*mm
        y -= 8*mm
    
    c.setFillColor(ACCENT_GREEN)
    c.setFont(BODY_FONT, 18)
    c.drawString(30*mm, y, "年度活动 Annual Events")
    y -= 12*mm
    events = [
        "春季: 京张AI开源节 (全球开发者大会+代码马拉松)",
        "夏季: AI城市实验季 (场景开放测试+公众体验周)",
        "秋季: 智算峰会 (产业论坛+标准发布+投资对接)",
        "冬季: AI暖冬计划 (社区AI服务+老年数字素养)",
    ]
    c.setFillColor(TEXT_WHITE)
    c.setFont(BODY_FONT, 14)
    for ev in events:
        c.drawString(45*mm, y, "• " + ev)
        y -= 10*mm
    draw_page_number(c, 10)
    c.showPage()
    
    # ===== PAGE 11: METRICS =====
    c.setFillColor(DARK_BG)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    c.setFillColor(ACCENT_BLUE)
    c.setFont(BODY_FONT, 28)
    c.drawString(30*mm, 270*mm, "08 指标体系 Metrics")
    
    c.setFillColor(TEXT_WHITE)
    c.setFont(BODY_FONT, 16)
    metrics = [
        ("总体设计范围面积", "11,412,825 m²", "known"),
        ("重点区域总面积", "3,692,893 m²", "known"),
        ("众智园面积", "1,929,202 m²", "known"),
        ("原点社区面积", "1,043,237 m²", "known"),
        ("大钟寺面积", "720,454 m²", "known"),
        ("绿地率", "61.64%", "provisional"),
        ("公共空间比例", "0.39%", "provisional"),
        ("建筑基底面积", "310,807 m²", "provisional"),
    ]
    y = 250*mm
    for name, value, status in metrics:
        c.setFillColor(TEXT_WHITE)
        c.drawString(30*mm, y, name)
        c.drawString(200*mm, y, value)
        if status == "provisional":
            c.setFillColor(ACCENT_GREEN)
            c.drawString(340*mm, y, "provisional")
        else:
            c.setFillColor(ACCENT_BLUE)
            c.drawString(340*mm, y, status)
        y -= 14*mm
    
    c.setFillColor(TEXT_GRAY)
    c.setFont(BODY_FONT, 14)
    c.drawString(30*mm, y - 10*mm, "注: provisional 标注的指标基于临时边界，官方几何发布后需复算")
    draw_page_number(c, 11)
    c.showPage()
    
    # ===== PAGE 12: COMPLIANCE =====
    c.setFillColor(DARK_BG)
    c.rect(0, 0, w, h, fill=1, stroke=0)
    c.setFillColor(ACCENT_BLUE)
    c.setFont(BODY_FONT, 28)
    c.drawString(30*mm, 270*mm, "09 版权与合规 Copyright & Compliance")
    
    c.setFillColor(TEXT_WHITE)
    c.setFont(BODY_FONT, 14)
    y = 250*mm
    lines = [
        "字体 Fonts",
        "  • 文泉驿正黑 (WenQuanYi Zen Hei) — GPL v2",
        "  • Noto Sans CJK — SIL OFL 1.1",
        "",
        "图像 Images",
        "  • 所有PNG图面由PIL程序化自生成，无第三方图像",
        "",
        "地图数据 Map Data",
        "  • GeoJSON来源: OpenStreetMap (ODbL) + AI自生成 + 公开政府文件",
        "  • 全部标注 provisional，非官方审定边界",
        "",
        "代码 Code",
        "  • HTML/CSS/JS/Python 原创代码",
        "",
        "免责声明 Disclaimer",
        "  • 本方案涉及的交通、轨道、市政、自动驾驶等内容为概念方向",
        "  • 需在后续阶段由专业团队深化研究后确定",
        "  • 不声称官方批准、审定控规或保证实施",
        "",
        "联系 Contact: ppsharon (Kimi Claw) | GitHub: github.com/ppsharon/haidian",
    ]
    for line in lines:
        c.drawString(30*mm, y, line)
        y -= 10*mm
    draw_page_number(c, 12)
    c.showPage()
    
    c.save()
    print(f"A3 booklet generated: {output_path}")
    print(f"File size: {os.path.getsize(output_path)} bytes")

if __name__ == "__main__":
    generate_a3_booklet()
