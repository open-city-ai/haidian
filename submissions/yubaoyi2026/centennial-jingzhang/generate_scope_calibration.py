#!/usr/bin/env python3
"""
generate_scope_calibration.py
京张AI创新带 规划范围校准图
三层套叠 + 公园轴线 + 13号线 + 居民区 + 道路水系标注
"""

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import matplotlib.lines as mlines
import numpy as np
from matplotlib.patches import FancyArrowPatch

# ── 中文字体（fallback 链） ──────────────────────────────────────────────
FONT_CN = [
    'WenQuanYi Micro Hei',
    'WenQuanYi Zen Hei',
    'SimHei',
    'Microsoft YaHei',
    'Noto Sans CJK SC',
    'Source Han Sans SC',
    'PingFang SC',
]
for f in FONT_CN:
    try:
        plt.rcParams['font.sans-serif'] = [f]
        plt.rcParams['axes.unicode_minus'] = False
        break
    except Exception:
        continue

# ── 配色 ─────────────────────────────────────────────────────────────────
COLORS = {
    'research':   '#B5D8EB',   # 统筹研究范围 - 淡蓝
    'site':       '#FFD580',   # 总体设计范围 - 淡橙
    'A1':         '#E8924A',   # A1 众智园 - 琥珀橙
    'A2':         '#9B72CF',   # A2 AI原点 - 紫罗兰
    'A3':         '#5BB380',   # A3 大钟寺 - 翠绿
    'park':       '#2ECC71',   # 公园轴线 - 亮绿
    'metro':      '#E67E22',   # 13号线 - 橙色
    'ring_n3':    '#C0392B',   # 北三环
    'ring_n4':    '#E74C3C',   # 北四环
    'ring_n5':    '#2980B9',   # 北五环
    'river':      '#3498DB',   # 小月河
    'residential':'#95A5A6',   # 居民区
    'highway':    '#7F8C8D',   # 京藏高速
    'xueyuan':    '#7F8C8D',   # 学院路
}

# ── 坐标范围（EPSG:4326） ────────────────────────────────────────────────
LON_MIN, LON_MAX = 116.315, 116.380
LAT_MIN, LAT_MAX = 39.935,  40.032

# ── GeoJSON 坐标（手动写入，不依赖 shapely） ─────────────────────────────
# PROV-RESEARCH-001 (统筹研究范围)
RESEARCH_COORDS = np.array([
    [116.31885, 39.938],
    [116.36615, 39.938],
    [116.37215, 39.965],
    [116.37215, 40.027],
    [116.33285, 40.027],
    [116.32085, 40.000],
    [116.31285, 39.965],
    [116.31885, 39.938],
])

# PROV-SITE-001 (总体设计范围)
SITE_COORDS = np.array([
    [116.3407, 39.939],
    [116.3553, 39.939],
    [116.3553, 39.965],
    [116.3533, 39.990],
    [116.3553, 40.0265],
    [116.3427, 40.0265],
    [116.3417, 40.006],
    [116.3397, 39.975],
    [116.3407, 39.939],
])

# A1 众智园
A1_COORDS = np.array([
    [116.343, 40.0075],
    [116.354, 40.0075],
    [116.354, 40.026],
    [116.343, 40.026],
    [116.343, 40.0075],
])

# A2 AI原点社区
A2_COORDS = np.array([
    [116.342, 39.9835],
    [116.353, 39.9835],
    [116.353, 39.9935],
    [116.342, 39.9935],
    [116.342, 39.9835],
])

# A3 大钟寺
A3_COORDS = np.array([
    [116.342, 39.944],
    [116.355, 39.944],
    [116.355, 39.94984],
    [116.342, 39.94984],
    [116.342, 39.944],
])


# ── 图例项 ───────────────────────────────────────────────────────────────
def draw_polygon(ax, coords, color, alpha, label, lw=1.2, zorder=2):
    """绘制填充多边形（手动闭合，无需 shapely）"""
    closed = np.vstack([coords, coords[0]])
    poly = plt.Polygon(closed, closed=True,
                       facecolor=color, edgecolor='white',
                       linewidth=lw, alpha=alpha, zorder=zorder)
    ax.add_patch(poly)
    # 边界线（虚线=provisional）
    ax.plot(closed[:, 0], closed[:, 1],
            color='#555', linestyle='--', linewidth=0.7,
            alpha=0.8, zorder=zorder + 1)


def setup_axis(ax):
    ax.set_xlim(LON_MIN, LON_MAX)
    ax.set_ylim(LAT_MIN, LAT_MAX)
    ax.set_xlabel('Longitude (EPSG:4326)', fontsize=8, color='#666')
    ax.set_ylabel('Latitude', fontsize=8, color='#666')
    ax.tick_params(labelsize=7, colors='#666')
    # 经纬网格
    ax.grid(True, linestyle=':', color='#ccc', linewidth=0.5, alpha=0.6)
    ax.set_aspect('equal')


def draw_ring_road(ax, lat, label, color, zorder=3):
    """水平道路标注线"""
    ax.axhline(lat, color=color, linewidth=1.2, linestyle='-',
               alpha=0.85, zorder=zorder)
    ax.text(LON_MIN + 0.002, lat + 0.0008, label,
            color=color, fontsize=7, fontweight='bold', va='bottom', ha='left')


def draw_vertical_line(ax, lon, label, color, zorder=3):
    """竖向道路标注线"""
    ax.axvline(lon, color=color, linewidth=1.0, linestyle='-',
               alpha=0.7, zorder=zorder)
    x_pos = lon
    y_range = LAT_MAX - LAT_MIN
    y_mid = (LAT_MIN + LAT_MAX) / 2
    ax.text(x_pos + 0.001, y_mid, label,
            color=color, fontsize=7, fontweight='bold',
            va='center', ha='left', rotation=90)


def draw_river(ax, x_coords, y_coords, zorder=1):
    """小月河（蓝色曲线）"""
    ax.plot(x_coords, y_coords, color=COLORS['river'],
            linewidth=2.5, alpha=0.85, zorder=zorder)
    # 标注
    mid = len(x_coords) // 2
    ax.text(x_coords[mid] + 0.002, y_coords[mid],
            'Xiao Yue River\n(Small Moon River)\nXiaoyue River',
            color=COLORS['river'], fontsize=6.5, va='bottom', ha='left',
            style='italic', alpha=0.9)


def draw_metrolabel(ax, lons, lats, label, zorder=5):
    """地铁13号线（平行于公园的南北虚线）"""
    ax.plot(lons, lats, color=COLORS['metro'],
            linewidth=2.5, linestyle='--', alpha=0.9, zorder=zorder,
            label=label)
    mid = len(lons) // 2
    ax.text(lons[mid] + 0.002, lats[mid],
            'Metro Line 13\nSubway (Elevated)',
            color=COLORS['metro'], fontsize=6.5,
            va='center', ha='left', style='italic', alpha=0.9)


def draw_park_label(ax, lons, lats, label, zorder=6):
    """京张铁路遗址公园轴线（亮绿粗线）"""
    ax.plot(lons, lats, color=COLORS['park'],
            linewidth=4, linestyle='-', alpha=0.9, zorder=zorder)
    # 标注
    mid = len(lons) // 2
    ax.text(lons[mid] - 0.003, lats[mid] - 0.001,
            'Jingzhang Railway\nHeritage Park\n(Greenway Axis)',
            color='#1A7A40', fontsize=7,
            va='top', ha='right', fontweight='bold', alpha=0.95)


def draw_residential(ax, lons, lats, label, zorder=1):
    """稠密居民区（半透明灰色块）"""
    closed = np.column_stack([lons, lats])
    poly = plt.Polygon(closed, closed=True,
                       facecolor=COLORS['residential'],
                       edgecolor='none',
                       alpha=0.35, zorder=zorder)
    ax.add_patch(poly)
    mid = len(lons) // 2
    ax.text(lons[mid], lats[mid], label,
            color='#555', fontsize=7, ha='center', va='center',
            fontweight='bold', alpha=0.8)


def draw_station(ax, lon, lat, name, zorder=7):
    """地铁站标注"""
    ax.plot(lon, lat, 'o', color='#2C3E50',
            markersize=6, zorder=zorder, markeredgecolor='white',
            markeredgewidth=0.8)
    ax.annotate(name,
                xy=(lon, lat), xytext=(lon + 0.003, lat + 0.0008),
                fontsize=6.5, color='#2C3E50',
                arrowprops=dict(arrowstyle='->', color='#888', lw=0.7),
                zorder=zorder)


def add_north_arrow(ax):
    """指北针"""
    x, y = 0.96, 0.95  # 右上角
    ax.annotate('N', xy=(x, y), xycoords='axes fraction',
                fontsize=14, fontweight='bold', color='#333',
                ha='center', va='center')
    ax.annotate('', xy=(x, y - 0.04), xycoords='axes fraction',
                xytext=(x, y),
                arrowprops=dict(arrowstyle='->', color='#333', lw=1.5))
    ax.text(x, y + 0.005, '↑', fontsize=10, ha='center', va='bottom',
            color='#333', transform=ax.get_xaxis_transform())


def add_scalebar(ax):
    """比例尺（大约 1 cm = 0.5 km 在此经度）"""
    # 在本图范围，约 0.005 度 ≈ 0.5 km
    x0, y0 = LON_MIN + 0.008, LAT_MIN + 0.004
    length = 0.005  # 度
    ax.plot([x0, x0 + length], [y0, y0],
            color='#333', linewidth=2, zorder=10)
    ax.plot([x0, x0], [y0 - 0.001, y0],
            color='#333', linewidth=1.5, zorder=10)
    ax.plot([x0 + length, x0 + length],
            [y0 - 0.001, y0], color='#333', linewidth=1.5, zorder=10)
    ax.text(x0 + length / 2, y0 - 0.003, '~500 m',
            ha='center', va='top', fontsize=7, color='#333')


def add_title(ax, text, subtitle=''):
    ax.set_title(text, fontsize=13, fontweight='bold',
                 color='#222', pad=12)
    if subtitle:
        ax.text(0.5, 1.025, subtitle,
                transform=ax.transAxes,
                ha='center', va='bottom', fontsize=8,
                color='#666', style='italic')


def add_legend(ax):
    """右下角图例"""
    legend_elements = [
        mpatches.Patch(facecolor=COLORS['research'], edgecolor='#888',
                       linestyle='--', linewidth=1, alpha=0.7,
                       label='Coordinated Research Area\n(43.6 km2, Provisional)'),
        mpatches.Patch(facecolor=COLORS['site'], edgecolor='#888',
                       linestyle='--', linewidth=1, alpha=0.7,
                       label='Overall Design Area\n(11.4 km2, Provisional)'),
        mpatches.Patch(facecolor=COLORS['A1'], edgecolor='white',
                       linewidth=1, alpha=0.85,
                       label='A1 Zhongzhiyuan AI Zone\n(192.1 ha, Provisional)'),
        mpatches.Patch(facecolor=COLORS['A2'], edgecolor='white',
                       linewidth=1, alpha=0.85,
                       label='A2 Beijing AI Origin\n(104.3 ha, Provisional)'),
        mpatches.Patch(facecolor=COLORS['A3'], edgecolor='white',
                       linewidth=1, alpha=0.85,
                       label='A3 Dazhongsi AI Hub\n(72.0 ha, Provisional)'),
        mpatches.Patch(facecolor=COLORS['residential'], edgecolor='none',
                       alpha=0.35,
                       label='Dense Residential Area'),
        mlines.Line2D([], [], color=COLORS['park'],
                      linewidth=4, label='Jingzhang Heritage Park\nGreenway (Axis)'),
        mlines.Line2D([], [], color=COLORS['metro'],
                      linewidth=2.5, linestyle='--',
                      label='Metro Line 13 (Elevated)'),
        mlines.Line2D([], [], color=COLORS['ring_n3'],
                      linewidth=1.5, label='North 3rd Ring Rd'),
        mlines.Line2D([], [], color=COLORS['ring_n4'],
                      linewidth=1.5, label='North 4th Ring Rd'),
        mlines.Line2D([], [], color=COLORS['ring_n5'],
                      linewidth=1.5, label='North 5th Ring Rd'),
        mlines.Line2D([], [], color=COLORS['river'],
                      linewidth=2, label='Xiao Yue River'),
    ]
    legend = ax.legend(
        handles=legend_elements,
        loc='lower right',
        fontsize=6.2,
        title='LEGEND / 图例',
        title_fontsize=7,
        framealpha=0.92,
        edgecolor='#ccc',
        ncol=2,
    )
    legend.get_frame().set_linewidth(0.5)
    return legend


# ── 主图 ──────────────────────────────────────────────────────────────────
def main():
    fig, ax = plt.subplots(figsize=(14, 11), facecolor='white')
    fig.patch.set_facecolor('white')

    # 1. 稠密居民区（东侧，从 A2 向南）
    # 矩形：右上(东边界, A2北)、右下(东边界, 39.938)、左下(东边界+0.003, 39.938)、左上(东边界+0.003, A2北)
    east_x = LON_MAX - 0.002
    res_lon = [east_x, east_x, east_x, east_x]
    res_lat_top = A2_COORDS[0][1] - 0.0005
    res_lat_bot = 39.938 + 0.001
    res_lat = [res_lat_top, res_lat_bot, res_lat_bot, res_lat_top]
    draw_residential(ax, res_lon, res_lat, 'Dense\nResidential\nArea\nEast Side')

    # 2. 小月河（东翼，略微偏东）
    river_lon = [x + 0.007 for x in SITE_COORDS[:, 0]]  # 在site东边界偏东
    river_lat = SITE_COORDS[:, 1]
    draw_river(ax, river_lon, river_lat)

    # 3. 三层范围
    draw_polygon(ax, RESEARCH_COORDS, COLORS['research'], 0.22,
                 '统筹研究范围 43.6 km2', lw=1.5, zorder=2)
    draw_polygon(ax, SITE_COORDS, COLORS['site'], 0.30,
                 '总体设计范围 11.4 km2', lw=1.5, zorder=3)
    draw_polygon(ax, A1_COORDS, COLORS['A1'], 0.82, 'A1', lw=1.5, zorder=4)
    draw_polygon(ax, A2_COORDS, COLORS['A2'], 0.82, 'A2', lw=1.5, zorder=4)
    draw_polygon(ax, A3_COORDS, COLORS['A3'], 0.82, 'A3', lw=1.5, zorder=4)

    # 4. A1/A2/A3 区域标注
    for name, coords, color in [
        ('A1\nZhongzhiyuan\n192.1 ha', A1_COORDS, '#fff'),
        ('A2\nAI Origin\n104.3 ha',  A2_COORDS, '#fff'),
        ('A3\nDazhongsi\n72.0 ha',    A3_COORDS, '#fff'),
    ]:
        cx = coords[:, 0].mean()
        cy = coords[:, 1].mean()
        ax.text(cx, cy, name,
                ha='center', va='center',
                fontsize=7.5, fontweight='bold', color=color,
                zorder=7)

    # 5. 公园轴线（南北穿越轴，大致沿116.343度）
    park_lons = [116.343] * 50
    park_lats = np.linspace(39.940, 40.025, 50)
    draw_park_label(ax, park_lons, park_lats,
                    'Jingzhang Railway\nHeritage Park Axis')

    # 6. 地铁13号线（公园西侧，平行，略偏西）
    metro_lons = [116.340] * 50
    metro_lats = np.linspace(39.940, 40.025, 50)
    draw_metrolabel(ax, metro_lons, metro_lats,
                    'Metro Line 13\n(Elevated/West)')

    # 7. 环线
    draw_ring_road(ax, 39.938,  'North 3rd Ring Rd\nBei 3huan\n(Beijing North)', COLORS['ring_n3'])
    draw_ring_road(ax, 39.960,  'North 4th Ring Rd\nBei 4huan', COLORS['ring_n4'])
    draw_ring_road(ax, 40.000,  'North 5th Ring Rd\nBei 5huan', COLORS['ring_n5'])

    # 8. 竖向道路
    draw_vertical_line(ax, 116.357, 'Xueyuan Rd\n学院路 (E)', COLORS['xueyuan'])
    draw_vertical_line(ax, 116.342, 'Dazhongsi East Rd\n大钟寺东路 (W)', '#999')
    draw_vertical_line(ax, 116.368, 'Jingzang Hwy\n京藏高速 G6 (E)', COLORS['highway'])

    # 9. 地铁站
    stations = [
        (116.345, 39.944, 'Dazhongsi\n大钟寺'),
        (116.340, 39.958, 'Xitucheng\n西土城'),
        (116.340, 39.968, 'Zhichunlu\n知春路'),
        (116.340, 39.980, 'Wudaokou\n五道口'),
        (116.340, 39.995, 'Qinghua Donglu\n清华东路'),
        (116.315, 39.940, 'Xizhimen\n西直门'),
    ]
    for lon, lat, name in stations:
        draw_station(ax, lon, lat, name)

    # 10. 轴线与地铁标注（西侧标签）
    ax.text(116.338, 39.957,
            'Metro 13 on west\nUrban fabric on east\nPark axis in center',
            color='#888', fontsize=6.5, ha='right', va='center',
            style='italic', alpha=0.8)

    # 11. 坐标轴
    setup_axis(ax)

    # 12. 指北针、比例尺
    add_north_arrow(ax)
    add_scalebar(ax)

    # 13. 标题
    add_title(ax,
        'JINGZHANG THOUGHTCHAIN | Site Scope Calibration Map',
        '三层结构 Provisional Geometry | Beijing Haidian | 2026-08-30 | Agent: QClaw')

    # 14. 图例
    add_legend(ax)

    # 15. 底部声明
    ax.text(0.5, -0.075,
            'ALL BOUNDARIES ARE PROVISIONAL (provisional_boundaries.geojson, official_boundary=false)\n'
            'Source: DATA-SRC-OFFICIAL-ANNOUNCEMENT-20260509 | Haidian District Planning Bureau\n'
            'All road/river positions are approximate representations of named features, not redlines.',
        transform=ax.transAxes,
        ha='center', va='top', fontsize=6, color='#888', style='italic')

    plt.tight_layout(rect=[0, 0.05, 1, 0.98])

    out = ('C:/Users/yubaoyi/.openclaw/workspace/haidian/'
           'submissions/yubaoyi2026/centennial-jingzhang/assets/figures/'
           'scope-calibration-map.png')
    fig.savefig(out, dpi=180, bbox_inches='tight',
                facecolor='white', edgecolor='none')
    plt.close(fig)
    print(f'Saved: {out}')
    return out


if __name__ == '__main__':
    main()
