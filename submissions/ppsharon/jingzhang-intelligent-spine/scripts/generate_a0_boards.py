#!/usr/bin/env python3
"""
Generate A0 design boards PDF for Jing-Zhang Intelligent Spine proposal.
A0 size: 841mm x 1189mm (portrait)
"""

from reportlab.lib.pagesizes import A0
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
import os

# Register Chinese font
font_path = "/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc"
if os.path.exists(font_path):
    pdfmetrics.registerFont(TTFont("WQYZenHei", font_path))
    BODY_FONT = "WQYZenHei"
else:
    BODY_FONT = "Helvetica"

# Colors
DARK_BG = HexColor("#1a1a2e")
ACCENT_BLUE = HexColor("#0066FF")
ACCENT_GREEN = HexColor("#00C853")
TEXT_WHITE = HexColor("#F0F0F0")
TEXT_GRAY = HexColor("#A0A0A0")
CARD_BG = HexColor("#16213e")

def draw_header(c, title, subtitle):
    c.setFillColor(TEXT_WHITE)
    c.setFont(BODY_FONT, 48)
    c.drawString(40*mm, 1130*mm, title)
    c.setFillColor(ACCENT_BLUE)
    c.setFont(BODY_FONT, 28)
    c.drawString(40*mm, 1090*mm, subtitle)
    # Accent line
    c.setStrokeColor(ACCENT_BLUE)
    c.setLineWidth(3)
    c.line(40*mm, 1075*mm, 200*mm, 1075*mm)

def draw_footer(c, page_num):
    c.setFillColor(TEXT_GRAY)
    c.setFont(BODY_FONT, 20)
    c.drawString(40*mm, 25*mm, "京张智能脊 Jing-Zhang Intelligent Spine | 百年京张AI创新带城市设计国际方案征集")
    c.drawRightString(801*mm, 25*mm, f"A0 Board {page_num}/5")
    c.setStrokeColor(ACCENT_BLUE)
    c.setLineWidth(1)
    c.line(40*mm, 35*mm, 801*mm, 35*mm)

def draw_text_block(c, x, y, w, h, title, lines, font_size=22):
    """Draw a text card with title and bullet lines."""
    # Card background
    c.setFillColor(CARD_BG)
    c.roundRect(x, y - h, w, h, 10, fill=1, stroke=0)
    # Title
    c.setFillColor(ACCENT_BLUE)
    c.setFont(BODY_FONT, font_size + 6)
    c.drawString(x + 8*mm, y - 12*mm, title)
    # Content
    c.setFillColor(TEXT_WHITE)
    c.setFont(BODY_FONT, font_size)
    line_y = y - 30*mm
    for line in lines:
        if line_y < y - h + 8*mm:
            break
        c.drawString(x + 8*mm, line_y, line)
        line_y -= (font_size + 6) * 0.3528  # pt to mm approx

def generate_a0_boards():
    output_path = "/root/.openclaw/workspace/haidian/submissions/ppsharon/jingzhang-intelligent-spine/drawings/a0-boards.pdf"
    c = canvas.Canvas(output_path, pagesize=A0)
    width, height = A0

    # ===== BOARD 1: Project Overview =====
    c.setFillColor(DARK_BG)
    c.rect(0, 0, width, height, fill=1, stroke=0)
    draw_header(c, "BOARD 1: 项目概览 Project Overview", "京张智能脊：从蒸汽脊梁到智能神经网络")
    
    # Left column: Project info
    lines1 = [
        "• 总体设计范围: 11.4 km²",
        "• 重点区域: 368.4 ha (3处)",
        "• 绿地率: 61.64% (provisional)",
        "• 公共空间比例: 0.39%",
        "• 建筑基底面积: 310,807 m²",
        "",
        "空间结构: 一脊三核两脉",
        "  一脊: 京张铁路遗址公园活力带",
        "  三核: 众智园 + 原点社区 + 大钟寺",
        "  两脉: 中关村科技服务走廊 + 小月河场景赋能走廊",
    ]
    draw_text_block(c, 40*mm, 1040*mm, 360*mm, 320*mm, "核心指标 Key Metrics", lines1, 24)
    
    # Right column: Three positioning
    lines2 = [
        "1. 百年京张文化带",
        "   铁路遗产活化 + AI新文化地标",
        "",
        "2. 都市AI生活体验带",
        "   可感知的AI城市场景",
        "",
        "3. AI融合创新带",
        "   全栈自主创新生态",
        "",
        "五大功能:",
        "  AI全栈自主创新体系",
        "  世界级AI创新生态",
        "  AI+场景赋能新范式",
        "  智能化AI活力城市",
        "  AI治理全球话语权",
    ]
    draw_text_block(c, 420*mm, 1040*mm, 381*mm, 320*mm, "三大定位 Five Functions", lines2, 24)
    
    # Bottom: Innovation ecosystem
    lines3 = [
        "基础研究层 (原点社区: 清华/北大/中科院)",
        "    ↓",
        "开源协作层 (京张遗址公园: 开发者社区、代码贡献墙)",
        "    ↓",
        "产业转化层 (众智园: 加速器、标准制定、安全治理)",
        "    ↓",
        "应用展示层 (大钟寺: 智能终端、内容消费、国际路演)",
        "    ↓",
        "全球传播层 (一带公共空间: 活动体系、品牌IP、朝圣路线)",
    ]
    draw_text_block(c, 40*mm, 680*mm, 761*mm, 280*mm, "创新生态图谱 Innovation Ecosystem", lines3, 26)
    
    draw_footer(c, 1)
    c.showPage()

    # ===== BOARD 2: Spatial Structure =====
    c.setFillColor(DARK_BG)
    c.rect(0, 0, width, height, fill=1, stroke=0)
    draw_header(c, "BOARD 2: 空间结构 Spatial Structure", "一脊三核两脉 One Spine, Three Cores, Two Corridors")
    
    lines_spine = [
        "京张铁路遗址公园南北主轴 (约9km)",
        "",
        "功能复合: 文化展示 + 慢行系统 + 公共空间 + AI场景测试",
        "",
        "分段策略:",
        "  北段(众智园): 花园型创新界面，清河文化展示+低碳算力体验",
        "  中段(原点社区): 学术型公共空间，开源社区活动+成果发布",
        "  南段(大钟寺): 城市型消费场景，智能终端体验+国际路演",
    ]
    draw_text_block(c, 40*mm, 1040*mm, 360*mm, 280*mm, "一脊 The Spine", lines_spine, 24)
    
    lines_cores = [
        "众智园AI自主创新加速区 (192.1 ha)",
        "  • 花园型全栈自主创新街区",
        "  • 安全治理沙盒 + 算力港 + 低碳创新廊",
        "",
        "北京AI原点社区 (104.3 ha)",
        "  • 近校型成果转化与人才社区",
        "  • 开源发布厅 + AI原点咖啡 + 开发者步道",
        "",
        "大钟寺AI产业聚集区 (72.0 ha)",
        "  • 城市型智能经济与国际交往街区",
        "  • 国际路演客厅 + AI市集 + 数据要素会客厅",
    ]
    draw_text_block(c, 420*mm, 1040*mm, 381*mm, 380*mm, "三核 Three Cores", lines_cores, 24)
    
    lines_corridors = [
        "西脉: 中关村科技服务走廊",
        "  高校-企业-资本联动",
        "  法务/知识产权/投融资服务集聚",
        "",
        "东脉: 小月河场景赋能走廊",
        "  AI+生活场景测试带",
        "  医疗/教育/法律/社区服务示范",
    ]
    draw_text_block(c, 40*mm, 720*mm, 360*mm, 220*mm, "两脉 Two Corridors", lines_corridors, 24)
    
    lines_transport = [
        "轨道站点一体化 (概念方向，供专业团队深化)",
        "  五道口站: 高校-轨道-商业垂直联动",
        "  清华东路西口站: 慢行缝合节点",
        "  大钟寺站: 四象限步行连通",
        "",
        "慢行系统 (概念方向，供专业团队深化)",
        "  京张遗址公园南北贯通步道 (~9km)",
        "  东西向慢行缝合走廊 (跨京藏高速/北五环)",
        "  清河/小月河滨水慢行带",
    ]
    draw_text_block(c, 420*mm, 620*mm, 381*mm, 280*mm, "交通与慢行 Transport & Mobility", lines_transport, 22)
    
    draw_footer(c, 2)
    c.showPage()

    # ===== BOARD 3: Key Area 1 - 众智园 =====
    c.setFillColor(DARK_BG)
    c.rect(0, 0, width, height, fill=1, stroke=0)
    draw_header(c, "BOARD 3: 众智园AI自主创新加速区", "Zhongzhi Park: AI Autonomous Innovation Accelerator")
    
    lines_zz = [
        "定位: 花园型全栈自主创新街区",
        "面积: 约192.1 ha",
        "",
        "空间动作:",
        "  • 强化清河界面: 滨水创新走廊+产业展示+低碳交往",
        "  • 国家AI平台: 标准制定工作坊+安全治理沙盒+模型测试场",
        "  • 对外交通优化: 五环路区域一体化+入口门户形象",
        "",
        "AI场景:",
        "  SC-02 安全治理沙盒: 可参观、可预约、可监管的红队测试节点",
        "  SC-03 端侧算力驿站: 分布式算力调度+模型训练服务",
        "  SC-06 清河低碳创新廊: 绿色空间+雨洪管理+AI展示复合",
    ]
    draw_text_block(c, 40*mm, 1040*mm, 500*mm, 350*mm, "众智园 Zhongzhi Park", lines_zz, 26)
    
    lines_sandbox = [
        "节点深化: 安全治理沙盒 (Security Governance Sandbox)",
        "",
        "选址: 众智园核心区，约2.3 ha，低效工业仓储用地改造",
        "",
        "空间布局:",
        "  G层: 公共展示厅(500㎡) + 接待中心(200㎡) + 安全文化长廊(300㎡)",
        "  L2: 标准制定工作坊(400㎡) + 安全培训教室(200㎡×2)",
        "  L3: 红队测试实验室(600㎡) + 模型评测中心(300㎡)",
        "  屋顶: 清河观景平台(400㎡)",
        "  B1: 设备机房(200㎡) + 数据存储(100㎡) + 应急避难(150㎡)",
        "",
        "运营: CNCERT/工信部评测机构牵头，第三方实验室运营",
        "收费: ¥5,000-20,000/天 (企业测试)",
        "KPI: 年评测≥100模型；高危漏洞≥10个/年",
    ]
    draw_text_block(c, 40*mm, 660*mm, 761*mm, 380*mm, "安全治理沙盒 Security Sandbox", lines_sandbox, 24)
    
    draw_footer(c, 3)
    c.showPage()

    # ===== BOARD 4: Key Area 2 & 3 - 原点社区 + 大钟寺 =====
    c.setFillColor(DARK_BG)
    c.rect(0, 0, width, height, fill=1, stroke=0)
    draw_header(c, "BOARD 4: 原点社区 + 大钟寺", "Origin Community + Dazhongsi")
    
    lines_origin = [
        "北京AI原点社区 (Origin Community)",
        "定位: 近校型成果转化与人才社区 | 面积: 约104.3 ha",
        "",
        "空间动作:",
        "  • 校区-园区-街区慢行缝合",
        "  • 近校成果转化街: 孵化+展示+法务+知识产权+投融资",
        "  • 人才特区服务: 国际人才公寓+双语服务+签证支持",
        "",
        "AI场景:",
        "  SC-01 开源发布厅: 成果发布+代码展示+路演",
        "  SC-07 近校成果转化街: 孵化+法务+投融资",
        "",
        "节点深化: 开源发布厅",
        "  主发布厅(800㎡) + 代码展示廊(400㎡) + 路演角(200㎡×3)",
        "  AI原点咖啡(300㎡) + 屋顶露台(500㎡) + 地下创客工坊(400㎡)",
        "  运营: 海淀科委+开源中国牵头",
        "  KPI: 年活动≥24场；参与≥5,000人次；孵化≥20项目",
    ]
    draw_text_block(c, 40*mm, 1040*mm, 500*mm, 450*mm, "原点社区 Origin Community", lines_origin, 22)
    
    lines_dzs = [
        "大钟寺AI产业聚集区 (Dazhongsi)",
        "定位: 城市型智能经济与国际交往街区 | 面积: 约72.0 ha",
        "",
        "空间动作:",
        "  • 大钟寺站四象限步行连通",
        "  • 智能原生消费场景: 智能终端体验店+AI市集+数字资产交易",
        "  • 国际路演客厅: 企业展示+商务洽谈+媒体发布",
        "",
        "AI场景:",
        "  SC-05 国际路演客厅: 展示+洽谈+媒体发布",
        "  SC-08 数据要素会客厅: 合规授权+可审计数据流通",
        "",
        "节点深化: 国际路演客厅",
        "  国际发布厅(1,000㎡) + 企业展示区(600㎡) + 商务洽谈舱(200㎡×6)",
        "  媒体发布中心(300㎡) + 大钟寺文化甲板(屋顶800㎡) + B1商业接驳层(1,500㎡)",
        "  运营: 海淀投促中心+中关村创业大街牵头",
        "  KPI: 年路演≥48场；融资额≥5亿；国际参会≥20%",
    ]
    draw_text_block(c, 560*mm, 1040*mm, 241*mm, 450*mm, "大钟寺 Dazhongsi", lines_dzs, 20)
    
    draw_footer(c, 4)
    c.showPage()

    # ===== BOARD 5: AI Scenarios & Implementation =====
    c.setFillColor(DARK_BG)
    c.rect(0, 0, width, height, fill=1, stroke=0)
    draw_header(c, "BOARD 5: AI场景与实施计划", "AI Scenarios & Implementation Phasing")
    
    lines_scenarios = [
        "SC-01 开源发布厅 | 原点社区 | 年度发布≥24场 | 参与≥5,000人次",
        "SC-02 安全治理沙盒 | 众智园 | 年评测≥100模型 | 高危漏洞≥10个",
        "SC-03 端侧算力驿站 | 全带节点 | 可用性≥99.5% | 服务≥200家企业",
        "SC-04 AI慢行导航 | 遗址公园 | 日活≥5,000 | 准确率≥98%",
        "SC-05 国际路演客厅 | 大钟寺 | 年路演≥48场 | 融资额≥5亿",
        "SC-06 清河低碳创新廊 | 众智园 | 碳排放降低≥10%/年",
        "SC-07 近校成果转化街 | 原点社区 | 年成果≥100项 | 转化≥20项",
        "SC-08 数据要素会客厅 | 大钟寺 | 年交易≥50笔 | 金额≥5,000万",
        "SC-09 AI生活服务样板街 | 社区商业 | 服务≥5,000人次/月",
        "SC-10 全球AI活动周路线 | 全带公共空间 | 年参与≥10万人次",
    ]
    draw_text_block(c, 40*mm, 1040*mm, 761*mm, 320*mm, "10大AI场景 10 AI Scenarios", lines_scenarios, 24)
    
    lines_phase = [
        "近期 (1-2年): 轻量启动",
        "  • 慢行断点缝合、桥下空间激活、AI场景试点",
        "  • 年度活动体系启动 (开源节、城市实验季)",
        "",
        "中期 (3-5年): 重点更新",
        "  • 三处重点区核心项目落地、产业载体建设",
        "  • 开发者社区成熟、品牌IP形成",
        "",
        "长期 (5-10年): 生态成熟",
        "  • 全带AI基础设施完善、全球影响力形成",
        "  • 持续运营机制、年度迭代更新",
    ]
    draw_text_block(c, 40*mm, 680*mm, 360*mm, 260*mm, "分期策略 Phasing", lines_phase, 24)
    
    lines_events = [
        "春季 (3-5月): 京张AI开源节",
        "  全球开发者大会+代码马拉松+项目路演",
        "",
        "夏季 (6-8月): AI城市实验季",
        "  场景开放测试+公众体验周+学生夏令营",
        "",
        "秋季 (9-11月): 智算峰会",
        "  产业论坛+标准发布+投资对接",
        "",
        "冬季 (12-2月): AI暖冬计划",
        "  社区AI服务+老年数字素养+开发者团聚",
    ]
    draw_text_block(c, 420*mm, 680*mm, 381*mm, 280*mm, "年度活动 Annual Events", lines_events, 24)
    
    draw_footer(c, 5)
    c.showPage()

    c.save()
    print(f"A0 boards generated: {output_path}")
    print(f"File size: {os.path.getsize(output_path)} bytes")

if __name__ == "__main__":
    generate_a0_boards()
