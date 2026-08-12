#!/usr/bin/env python3
"""Generate site-overview figure with 三区两翼 structure."""
import json, os, sys
sys.path.insert(0, '.')
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
import matplotlib.font_manager as fm
import numpy as np

# Use CJK font for Chinese labels
for f in fm.fontManager.ttflist:
    if 'WenQuanYi Micro Hei' in f.name:
        CJK_FONT = f.name
        break
else:
    CJK_FONT = 'Droid Sans Fallback'
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['font.sans-serif'] = [CJK_FONT, 'DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False

BASE = '/run/csi/mount-root/nas/4079184d856ecc166ed19d4887083405/workspaces/default/haidian/submissions/565431hzhang/jingzhang-ai-heritage-halo'
OUT = os.path.join(BASE, 'assets/figures')

def load_geojson(path):
    with open(path) as f:
        return json.load(f)

def get_centroid(feat):
    coords = feat['geometry']['coordinates']
    gtype = feat['geometry']['type']
    if gtype == 'Polygon':
        xs = [c[0] for c in coords[0]]
        ys = [c[1] for c in coords[0]]
    elif gtype == 'MultiPolygon':
        xs = [c[0] for poly in coords for c in poly[0]]
        ys = [c[1] for poly in coords for c in poly[0]]
    elif gtype == 'LineString':
        xs = [c[0] for c in coords]
        ys = [c[1] for c in coords]
    else:
        return 0, 0
    return (min(xs)+max(xs))/2, (min(ys)+max(ys))/2

def get_bbox(feat):
    coords = feat['geometry']['coordinates']
    gtype = feat['geometry']['type']
    if gtype == 'Polygon':
        xs = [c[0] for c in coords[0]]
        ys = [c[1] for c in coords[0]]
    elif gtype == 'MultiPolygon':
        xs = [c[0] for poly in coords for c in poly[0]]
        ys = [c[1] for poly in coords for c in poly[0]]
    else:
        return 0, 0, 0, 0
    return min(xs), max(xs), min(ys), max(ys)

# Load data
site = load_geojson(os.path.join(BASE, 'geometry/site_boundary.geojson'))
keys = load_geojson(os.path.join(BASE, 'geometry/key_areas.geojson'))
land = load_geojson(os.path.join(BASE, 'geometry/land_use.geojson'))
roads = load_geojson(os.path.join(BASE, 'geometry/roads.geojson'))
green = load_geojson(os.path.join(BASE, 'geometry/green_space.geojson'))

# Get site boundary bbox
sx1, sx2, sy1, sy2 = get_bbox(site['features'][0])
# Expand slightly
margin_x = (sx2 - sx1) * 0.15
margin_y = (sy2 - sy1) * 0.15
xlim = (sx1 - margin_x, sx2 + margin_x)
ylim = (sy1 - margin_y, sy2 + margin_y)

# Wing positions (conceptual)
# West wing: along Zhongguancun Avenue, west of site
# East wing: along Xiaoyuehe, east of site
wing_west_x = sx1 - 0.003
wing_east_x = sx2 + 0.003
wing_y_top = sy2 - 0.002
wing_y_bot = sy1 + 0.002

# Key area Y positions
ka_y_positions = {}
for feat in keys['features']:
    props = feat['properties']
    _, cy = get_centroid(feat)
    name = props.get('name_zh', '?')
    ka_y_positions[name] = cy

# Regional collaboration positions (conceptual, outside the map limits)
# Placed as annotation arrows
regional = [
    ('北纬社区\n(硬件·算力)', sx2 + 0.008, sy2 + 0.005, 'upper left'),
    ('未来科学城\n(前沿研究)', sx2 + 0.008, sy2 - 0.005, 'upper left'),
    ('怀柔科学城\n(大科学装置)', sx1 - 0.008, sy1 - 0.005, 'lower right'),
    ('经开区/亦庄\n(场景测试)', sx2 + 0.008, sy1 - 0.005, 'upper left'),
    ('京津冀协同\n(研发·制造)', sx2 + 0.012, (sy1+sy2)/2, 'upper left'),
]

# ====== FIGURE ======
fig, ax = plt.subplots(1, 1, figsize=(20, 28))
fig.patch.set_facecolor('#FAFAFA')
ax.set_facecolor('#FAFAFA')

# 1. Plot site boundary
for feat in site['features']:
    coords = feat['geometry']['coordinates']
    xs = [c[0] for c in coords[0]]
    ys = [c[1] for c in coords[0]]
    ax.fill(xs, ys, facecolor='#E8F5E9', edgecolor='#2E7D32', linewidth=2.5, alpha=0.6, zorder=1)
    ax.plot(xs, ys, color='#2E7D32', linewidth=2.5, zorder=2)

# 2. Plot land use (base context)
lc = ['#E3F2FD', '#FFF3E0', '#F3E5F5', '#E8F5E9', '#FFF8E1', '#E0F7FA', '#FBE9E7', '#EFEBE9', '#E8EAF6', '#FCE4EC', '#E0F2F1', '#FFFDE7', '#F1F8E9', '#F9FBE7']
for i, feat in enumerate(land['features']):
    coords = feat['geometry']['coordinates']
    xs = [c[0] for c in coords[0]]
    ys = [c[1] for c in coords[0]]
    ax.fill(xs, ys, facecolor=lc[i % len(lc)], edgecolor='#BDBDBD', linewidth=0.5, alpha=0.7, zorder=1)

# 3. Plot green space
for feat in green['features']:
    coords = feat['geometry']['coordinates']
    xs = [c[0] for c in coords[0]]
    ys = [c[1] for c in coords[0]]
    ax.fill(xs, ys, facecolor='#A5D6A7', edgecolor='#66BB6A', linewidth=0.8, alpha=0.5, zorder=2)

# 4. Plot roads
for feat in roads['features']:
    coords = feat['geometry']['coordinates']
    xs = [c[0] for c in coords]
    ys = [c[1] for c in coords]
    ax.plot(xs, ys, color='#78909C', linewidth=1.5, alpha=0.6, zorder=3)

# 5. Plot key areas with colored fills
ka_colors = {'众智园AI自主创新加速区': '#FF7043', '北京AI原点社区': '#42A5F5', '大钟寺AI产业聚集区': '#AB47BC'}
ka_labels = {'众智园AI自主创新加速区': '众智园\nAI自主创新加速区', '北京AI原点社区': 'AI原点社区\n成果转化街区', '大钟寺AI产业聚集区': '大钟寺\nAI产业聚集区'}
ka_phases = {'众智园AI自主创新加速区': '2026-2028', '北京AI原点社区': '2026-2030', '大钟寺AI产业聚集区': '2026-2028'}
ka_icons = {'众智园AI自主创新加速区': '⚙️', '北京AI原点社区': '💡', '大钟寺AI产业聚集区': '🏢'}

for feat in keys['features']:
    props = feat['properties']
    name = props.get('name_zh', '?')
    coords = feat['geometry']['coordinates']
    xs = [c[0] for c in coords[0]]
    ys = [c[1] for c in coords[0]]
    cx, cy = get_centroid(feat)
    color = ka_colors.get(name, '#FF5722')
    
    # Fill with semi-transparent color
    ax.fill(xs, ys, facecolor=color, edgecolor=color, linewidth=2.5, alpha=0.15, zorder=4)
    ax.plot(xs, ys, color=color, linewidth=2.5, zorder=5, linestyle='--')
    
    # Label box
    label = ka_labels.get(name, name)
    phase = ka_phases.get(name, '')
    icon = ka_icons.get(name, '')
    
    # Background box for label
    bbox_props = dict(boxstyle='round,pad=0.4', facecolor='white', edgecolor=color, linewidth=2, alpha=0.9)
    ax.text(cx, cy, f'{icon} {label}', fontsize=11, fontweight='bold',
            color='#333333', ha='center', va='center',
            bbox=bbox_props, zorder=10, transform=ax.transData)
    
    # Phase label below
    ax.text(cx, cy - 0.002, f'📅 {phase}', fontsize=9, color='#666666',
            ha='center', va='top', style='italic',
            bbox=dict(boxstyle='round,pad=0.2', facecolor='white', edgecolor='#CCCCCC', linewidth=1, alpha=0.8),
            zorder=10, transform=ax.transData)

# ====== 三区两翼结构 ======
# West wing (中关村科技服务翼)
wing_west_color = '#EF5350'
west_x = [sx1 - 0.002, sx1 - 0.002, sx1 - 0.001, sx1 - 0.001]
west_y = [sy1 + 0.003, sy2 - 0.003, sy2 - 0.003, sy1 + 0.003]
ax.fill(west_x, west_y, facecolor=wing_west_color, edgecolor=wing_west_color, linewidth=0, alpha=0.08, zorder=2)
# Label west wing
ax.text(sx1 - 0.0035, (sy1+sy2)/2, '西翼\n中关村科技服务翼\n要素全球化配置\nIP与资本赋能', 
        fontsize=9, color=wing_west_color, fontweight='bold',
        ha='center', va='center', rotation=90,
        bbox=dict(boxstyle='round,pad=0.5', facecolor='white', edgecolor=wing_west_color, linewidth=1.5, alpha=0.9),
        zorder=10)

# East wing (小月河场景赋能翼)
wing_east_color = '#1565C0'
east_x = [sx2 + 0.001, sx2 + 0.001, sx2 + 0.002, sx2 + 0.002]
east_y = [sy1 + 0.003, sy2 - 0.003, sy2 - 0.003, sy1 + 0.003]
ax.fill(east_x, east_y, facecolor=wing_east_color, edgecolor=wing_east_color, linewidth=0, alpha=0.08, zorder=2)
# Label east wing
ax.text(sx2 + 0.0035, (sy1+sy2)/2, '东翼\n小月河场景赋能翼\nAI场景赋能\n智能化AI活力城市', 
        fontsize=9, color=wing_east_color, fontweight='bold',
        ha='center', va='center', rotation=270,
        bbox=dict(boxstyle='round,pad=0.5', facecolor='white', edgecolor=wing_east_color, linewidth=1.5, alpha=0.9),
        zorder=10)

# ====== 京张遗址公园活力带 (central spine) ======
spine_y = np.linspace(sy1 + 0.003, sy2 - 0.003, 100)
spine_x = [116.3475] * 100
ax.plot(spine_x, spine_y, color='#F9A825', linewidth=4, alpha=0.6, zorder=3, linestyle='-')
ax.plot(spine_x, spine_y, color='#F9A825', linewidth=8, alpha=0.2, zorder=2, linestyle='-')
# Label
mid_y = (sy1+sy2)/2
ax.text(116.3475, sy1 + 0.001, '京张遗址公园活力带', fontsize=9, color='#F57F17',
        ha='center', va='bottom', fontweight='bold',
        bbox=dict(boxstyle='round,pad=0.2', facecolor='white', edgecolor='#F9A825', alpha=0.8),
        zorder=10)

# ====== 协同回路 arrows ======
# Arrow between three key areas
for i in range(len(keys['features'])-1):
    f1 = keys['features'][i]
    f2 = keys['features'][i+1]
    _, y1 = get_centroid(f1)
    _, y2 = get_centroid(f2)
    mid = (y1 + y2) / 2
    ax.annotate('', xy=(116.3475, y2+0.001), xytext=(116.3475, y1-0.001),
                arrowprops=dict(arrowstyle='<->', color='#F9A825', linewidth=2, alpha=0.7),
                zorder=6)
    ax.text(116.3475, mid, '研发→验证→展示', fontsize=7, color='#F57F17',
            ha='left', va='center', rotation=90,
            bbox=dict(boxstyle='round,pad=0.1', facecolor='white', edgecolor='none', alpha=0.7),
            zorder=10)

# ====== Regional collaboration annotations ======
# 北纬/未来科学城: north-east
ax.annotate('北纬社区\n(算力·硬件协同)', xy=(sx2-0.001, sy2+0.001), xytext=(sx2+0.01, sy2+0.008),
            fontsize=8, color='#333', fontweight='bold',
            ha='left', va='center',
            arrowprops=dict(arrowstyle='->', color='#78909C', linewidth=1.5, connectionstyle='arc3,rad=0.2'),
            bbox=dict(boxstyle='round,pad=0.3', facecolor='#FFF8E1', edgecolor='#78909C', alpha=0.9),
            zorder=10)

ax.annotate('未来科学城\n(前沿研究·人才联培)', xy=(sx2-0.001, (sy2+ka_y_positions['北京AI原点社区'])/2), 
            xytext=(sx2+0.01, (sy2+ka_y_positions['北京AI原点社区'])/2+0.005),
            fontsize=8, color='#333', fontweight='bold',
            ha='left', va='center',
            arrowprops=dict(arrowstyle='->', color='#78909C', linewidth=1.5, connectionstyle='arc3,rad=0.2'),
            bbox=dict(boxstyle='round,pad=0.3', facecolor='#E3F2FD', edgecolor='#78909C', alpha=0.9),
            zorder=10)

# 怀柔: south-east
ax.annotate('怀柔科学城\n(AI+科学计算交叉)', xy=(sx2-0.001, sy1+0.003), xytext=(sx2+0.01, sy1+0.001),
            fontsize=8, color='#333', fontweight='bold',
            ha='left', va='center',
            arrowprops=dict(arrowstyle='->', color='#78909C', linewidth=1.5, connectionstyle='arc3,rad=0.2'),
            bbox=dict(boxstyle='round,pad=0.3', facecolor='#E8F5E9', edgecolor='#78909C', alpha=0.9),
            zorder=10)

# 经开区/亦庄: south
ax.annotate('经开区（亦庄）\n(自动驾驶·场景测试)', xy=(sx1+0.001, sy1+0.003), xytext=(sx1-0.01, sy1-0.002),
            fontsize=8, color='#333', fontweight='bold',
            ha='right', va='center',
            arrowprops=dict(arrowstyle='->', color='#78909C', linewidth=1.5, connectionstyle='arc3,rad=-0.2'),
            bbox=dict(boxstyle='round,pad=0.3', facecolor='#F3E5F5', edgecolor='#78909C', alpha=0.9),
            zorder=10)

# 京津冀: west
ax.annotate('京津冀协同\n(研发在北京·制造在津冀)', xy=(sx1+0.001, (sy1+sy2)/2), xytext=(sx1-0.01, (sy1+sy2)/2+0.008),
            fontsize=8, color='#333', fontweight='bold',
            ha='right', va='center',
            arrowprops=dict(arrowstyle='->', color='#78909C', linewidth=1.5, connectionstyle='arc3,rad=-0.2'),
            bbox=dict(boxstyle='round,pad=0.3', facecolor='#FBE9E7', edgecolor='#78909C', alpha=0.9),
            zorder=10)

# ====== Provisional label ======
ax.text(sx1+0.001, sy2-0.002, '⚠️ PROVISIONAL GEOMETRY\nRecalculate when official data supplied', 
        fontsize=7, color='#D32F2F', fontweight='bold',
        ha='left', va='top',
        bbox=dict(boxstyle='round,pad=0.3', facecolor='white', edgecolor='#D32F2F', linewidth=1, alpha=0.8),
        zorder=10)

# ====== Title ======
ax.set_title('百年京张AI创新带 — 总体空间结构\n三区两翼协同与区域协作框架', 
             fontsize=16, fontweight='bold', color='#333333', pad=15)

# ====== Legend ======
legend_elements = [
    mpatches.Patch(facecolor='#FF7043', alpha=0.3, edgecolor='#FF7043', label='众智园AI自主创新加速区'),
    mpatches.Patch(facecolor='#42A5F5', alpha=0.3, edgecolor='#42A5F5', label='AI原点社区'),
    mpatches.Patch(facecolor='#AB47BC', alpha=0.3, edgecolor='#AB47BC', label='大钟寺AI产业聚集区'),
    mpatches.Patch(facecolor=wing_west_color, alpha=0.3, edgecolor=wing_west_color, label='西翼：中关村科技服务翼'),
    mpatches.Patch(facecolor=wing_east_color, alpha=0.3, edgecolor=wing_east_color, label='东翼：小月河场景赋能翼'),
    plt.Line2D([0], [0], color='#F9A825', linewidth=3, alpha=0.6, label='京张遗址公园活力带'),
    plt.Line2D([0], [0], color='#78909C', linewidth=1.5, alpha=0.6, label='道路网络'),
    mpatches.Patch(facecolor='#A5D6A7', alpha=0.5, edgecolor='#66BB6A', label='蓝绿空间'),
]
ax.legend(handles=legend_elements, loc='lower left', fontsize=8, 
          framealpha=0.9, edgecolor='#CCCCCC', ncol=2)

# ====== Stats bottom ======
stats_text = (f'总体设计范围面积: ~1141 ha  |  三大重点区域: 约192.9+104.3+72.0 ha  |  '
              f'蓝绿空间: 约21.5%  |  '
              f'更新项目: 6个  |  AI场景节点: 10+  |  '
              f'区域协同方向: 5个')
ax.text(0.5, 0.01, stats_text, fontsize=8, color='#555555',
        ha='center', va='bottom', transform=fig.transFigure,
        bbox=dict(boxstyle='round,pad=0.5', facecolor='white', edgecolor='#CCCCCC', alpha=0.9))

# ====== Formatting ======
ax.set_xlim(xlim)
ax.set_ylim(ylim)
ax.set_aspect('equal')
ax.axis('off')
plt.tight_layout(rect=[0, 0.03, 1, 0.97])

# Save
os.makedirs(OUT, exist_ok=True)
for suffix, dpi in [('', 200), ('.en', 200)]:
    path = os.path.join(OUT, f'site-overview{suffix}.png')
    plt.savefig(path, dpi=dpi, bbox_inches='tight', facecolor=fig.get_facecolor())
    print(f'Saved: {path} ({os.path.getsize(path)/1024:.0f} KB)')

plt.close()
print('Done!')