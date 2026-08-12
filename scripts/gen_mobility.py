#!/usr/bin/env python3
"""Generate mobility and blue-green space figure."""
import json, os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import matplotlib.font_manager as fm
import numpy as np

BASE = '/run/csi/mount-root/nas/4079184d856ecc166ed19d4887083405/workspaces/default/haidian/submissions/565431hzhang/jingzhang-ai-heritage-halo'
OUT = os.path.join(BASE, 'assets/figures')

for f in fm.fontManager.ttflist:
    if 'WenQuanYi Micro Hei' in f.name:
        plt.rcParams['font.sans-serif'] = [f.name, 'DejaVu Sans']
        break
plt.rcParams['axes.unicode_minus'] = False

def load_geojson(path):
    with open(path) as f:
        return json.load(f)

def get_bbox(feat):
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
        return 0, 0, 0, 0
    return min(xs), max(xs), min(ys), max(ys)

site = load_geojson(os.path.join(BASE, 'geometry/site_boundary.geojson'))
roads = load_geojson(os.path.join(BASE, 'geometry/roads.geojson'))
green = load_geojson(os.path.join(BASE, 'geometry/green_space.geojson'))
keys = load_geojson(os.path.join(BASE, 'geometry/key_areas.geojson'))

sx1, sx2, sy1, sy2 = get_bbox(site['features'][0])
margin_x = (sx2 - sx1) * 0.12
margin_y = (sy2 - sy1) * 0.08

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(24, 22))
fig.patch.set_facecolor('#FAFAFA')

# ====== LEFT: 蓝绿空间 ======
ax1.set_facecolor('#FAFAFA')

# Site boundary
for feat in site['features']:
    coords = feat['geometry']['coordinates']
    xs = [c[0] for c in coords[0]]
    ys = [c[1] for c in coords[0]]
    ax1.fill(xs, ys, facecolor='#F5F5F5', edgecolor='#2E7D32', linewidth=2, alpha=0.3, zorder=1)
    ax1.plot(xs, ys, color='#2E7D32', linewidth=2, zorder=2)

# Green space
for feat in green['features']:
    coords = feat['geometry']['coordinates']
    xs = [c[0] for c in coords[0]]
    ys = [c[1] for c in coords[0]]
    ax1.fill(xs, ys, facecolor='#66BB6A', edgecolor='#388E3C', linewidth=1, alpha=0.6, zorder=3)

# Public space (from constraints or public_space.geojson)
try:
    pub = load_geojson(os.path.join(BASE, 'geometry/public_space.geojson'))
    for feat in pub['features']:
        coords = feat['geometry']['coordinates']
        xs = [c[0] for c in coords[0]]
        ys = [c[1] for c in coords[0]]
        ax1.fill(xs, ys, facecolor='#FFF9C4', edgecolor='#F9A825', linewidth=1, alpha=0.5, zorder=4)
except:
    pass

# Key areas dashed
ka_colors = ['#FF7043', '#42A5F5', '#AB47BC']
for feat, color in zip(keys['features'], ka_colors):
    coords = feat['geometry']['coordinates']
    xs = [c[0] for c in coords[0]]
    ys = [c[1] for c in coords[0]]
    ax1.plot(xs, ys, color=color, linewidth=2.5, linestyle='--', alpha=0.7, zorder=5)

# Green corridor labels
green_labels = [
    ('京张遗址公园\n活力绿带', (sx1+sx2)/2, (sy1+sy2)/2),
    ('小月河\n生态廊道', sx2-0.0005, (sy1+sy2)/2),
    ('清河\n滨水界面', sx1+0.001, sy2-0.002),
]
for label, gx, gy in green_labels:
    ax1.text(gx, gy, label, fontsize=9, color='#2E7D32', fontweight='bold',
             ha='center', va='center',
             bbox=dict(boxstyle='round,pad=0.3', facecolor='white', edgecolor='#66BB6A', alpha=0.85), zorder=8)

# Site stats
green_area = 5561347.001
site_area = 11412825.386
green_pct = green_area / site_area * 100
ax1.text(0.5, -0.03, f'蓝绿空间: {green_area/10000:.0f} ha ({green_pct:.1f}%)  |  公共空间: 28.0 ha  |  绿地率: 48.7%',
         fontsize=9, color='#555', ha='center', va='top', transform=ax1.transAxes)

ax1.set_title('蓝绿空间与公共空间系统', fontsize=16, fontweight='bold', color='#333', pad=15)
ax1.set_xlim(sx1 - margin_x/2, sx2 + margin_x/2)
ax1.set_ylim(sy1 - margin_y/2, sy2 + margin_y/2)
ax1.set_aspect('equal')
ax1.axis('off')

# ====== RIGHT: 交通与慢行 ======
ax2.set_facecolor('#FAFAFA')

# Site boundary
for feat in site['features']:
    coords = feat['geometry']['coordinates']
    xs = [c[0] for c in coords[0]]
    ys = [c[1] for c in coords[0]]
    ax2.fill(xs, ys, facecolor='#F5F5F5', edgecolor='#37474F', linewidth=2, alpha=0.3, zorder=1)
    ax2.plot(xs, ys, color='#37474F', linewidth=2, zorder=2)

# Road network
road_colors = ['#78909C', '#B0BEC5', '#90A4AE']
for i, feat in enumerate(roads['features']):
    coords = feat['geometry']['coordinates']
    xs = [c[0] for c in coords]
    ys = [c[1] for c in coords]
    # Main roads (north-south) vs secondary
    is_main = abs(xs[0] - xs[-1]) < 0.0001  # vertical roads = main
    lw = 2.5 if is_main else 1.5
    color = '#546E7A' if is_main else '#90A4AE'
    ax2.plot(xs, ys, color=color, linewidth=lw, alpha=0.7, zorder=3)

# Slow mobility corridor (Jing-Zhang Heritage Park)
mid_x = (sx1+sx2)/2
spine_y = np.linspace(sy1 + 0.003, sy2 - 0.003, 50)
spine_x = [mid_x] * 50
ax2.plot(spine_x, spine_y, color='#F9A825', linewidth=6, alpha=0.5, zorder=4, linestyle='-')
ax2.plot(spine_x, spine_y, color='#F57F17', linewidth=2, zorder=5, linestyle=':')

# Key areas
for feat, color in zip(keys['features'], ka_colors):
    coords = feat['geometry']['coordinates']
    xs = [c[0] for c in coords[0]]
    ys = [c[1] for c in coords[0]]
    ax2.plot(xs, ys, color=color, linewidth=2.5, linestyle='--', alpha=0.7, zorder=5)

# Mobility nodes
mobility_nodes = [
    ('大钟寺站\n轨道换乘', sx1+0.001, sy1+0.005, '#6A1B9A'),
    ('慢行断点\n缝合点', mid_x, sy1+0.003, '#F57F17'),
    ('共享单车\n换乘点', sx2-0.001, sy1+0.003, '#1565C0'),
    ('AI导览\n信息亭', mid_x, sy2-0.002, '#F57F17'),
]
for label, nx, ny, ncolor in mobility_nodes:
    ax2.scatter([nx], [ny], s=200, c=ncolor, edgecolors='white', linewidths=2, marker='o', zorder=7)
    ax2.text(nx, ny-0.001, label, fontsize=8, color='#333', fontweight='bold',
             ha='center', va='top',
             bbox=dict(boxstyle='round,pad=0.2', facecolor='white', edgecolor=ncolor, alpha=0.9), zorder=8)

# Active mobility labels
ax2.text(mid_x, (sy1+sy2)/2, '京张遗址公园\n慢行活力带', fontsize=9, color='#F57F17', fontweight='bold',
         ha='center', va='center', rotation=90,
         bbox=dict(boxstyle='round,pad=0.3', facecolor='white', edgecolor='#F9A825', alpha=0.85), zorder=8)

# Legend
ax2.text(0.5, -0.03, f'道路总长: 42.3 km  |  慢行活力带: 京张遗址公园  |  慢行断点: 6处待缝合  |  AI导览节点: 4处',
         fontsize=9, color='#555', ha='center', va='top', transform=ax2.transAxes)

ax2.set_title('交通与慢行系统', fontsize=16, fontweight='bold', color='#333', pad=15)
ax2.set_xlim(sx1 - margin_x/2, sx2 + margin_x/2)
ax2.set_ylim(sy1 - margin_y/2, sy2 + margin_y/2)
ax2.set_aspect('equal')
ax2.axis('off')

# ====== Overall legend ======
legend_elements1 = [
    mpatches.Patch(facecolor='#66BB6A', alpha=0.6, edgecolor='#388E3C', label='蓝绿空间'),
    mpatches.Patch(facecolor='#FFF9C4', alpha=0.5, edgecolor='#F9A825', label='公共空间'),
    mpatches.Patch(facecolor='#FF7043', alpha=0.3, edgecolor='#FF7043', label='众智园'),
    mpatches.Patch(facecolor='#42A5F5', alpha=0.3, edgecolor='#42A5F5', label='AI原点社区'),
    mpatches.Patch(facecolor='#AB47BC', alpha=0.3, edgecolor='#AB47BC', label='大钟寺'),
]
fig.legend(handles=legend_elements1, loc='lower center', ncol=5, fontsize=9,
           framealpha=0.9, edgecolor='#CCC', bbox_to_anchor=(0.35, 0.02))

legend_elements2 = [
    plt.Line2D([0], [0], color='#F9A825', linewidth=6, alpha=0.5, label='慢行活力带'),
    plt.Line2D([0], [0], color='#546E7A', linewidth=2.5, alpha=0.7, label='主要道路'),
    plt.Line2D([0], [0], color='#90A4AE', linewidth=1.5, alpha=0.7, label='次要道路'),
    plt.scatter([], [], s=120, c='#6A1B9A', edgecolors='white', label='轨道换乘站'),
    plt.scatter([], [], s=120, c='#F57F17', edgecolors='white', label='慢行节点'),
]
fig.legend(handles=legend_elements2, loc='lower center', ncol=5, fontsize=9,
           framealpha=0.9, edgecolor='#CCC', bbox_to_anchor=(0.77, 0.02))

# North arrow on both
for ax in [ax1, ax2]:
    ax.annotate('N', xy=(sx1+0.001, sy2-0.001), xytext=(sx1+0.001, sy2-0.0005),
                fontsize=12, fontweight='bold', color='#D32F2F', ha='center', va='bottom',
                arrowprops=dict(arrowstyle='->', color='#D32F2F', lw=2), zorder=20)

plt.tight_layout(rect=[0, 0.05, 1, 0.95])

os.makedirs(OUT, exist_ok=True)
for suffix in ['', '.en']:
    path = os.path.join(OUT, f'mobility-bluegreen{suffix}.png')
    plt.savefig(path, dpi=200, bbox_inches='tight', facecolor=fig.get_facecolor())
    print(f'Saved: {path} ({os.path.getsize(path)/1024:.0f} KB)')
plt.close()
print('Done!')