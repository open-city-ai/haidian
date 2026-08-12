#!/usr/bin/env python3
"""Generate land-use structure figure with actual land-use codes."""
import json, os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import matplotlib.font_manager as fm

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
    else:
        return 0, 0, 0, 0, 0, 0
    return min(xs), max(xs), min(ys), max(ys), (min(xs)+max(xs))/2, (min(ys)+max(ys))/2

site = load_geojson(os.path.join(BASE, 'geometry/site_boundary.geojson'))
land = load_geojson(os.path.join(BASE, 'geometry/land_use.geojson'))

sx1, sx2, sy1, sy2, _, _ = get_bbox(site['features'][0])
margin_x = (sx2 - sx1) * 0.08
margin_y = (sy2 - sy1) * 0.08

fig, ax = plt.subplots(1, 1, figsize=(14, 22))
fig.patch.set_facecolor('#FAFAFA')
ax.set_facecolor('#FAFAFA')

lu_edge = '#BDBDBD'

# Land use code to color/label mapping
code_map = {
    '0702': ('#E8F5E9', '居住社区'),
    '0802': ('#E3F2FD', '科研/产业'),
    '05':   ('#F3E5F5', '商业体验'),
    '1401': ('#C8E6C9', '公园绿地'),
}

# Abbreviated labels
label_map = {
    '南侧居住与配套用地': '居住配套',
    'AI产业集聚研发用地': 'AI产业研发',
    'AI智能原生商业体验用地': 'AI商业体验',
    '西侧居住社区用地': '居住(西)',
    '京张遗址公园绿地': '京张遗址公园',
    '东侧居住社区用地': '居住(东)',
    'AI原点社区创新用地': '原点社区创新',
    'AI创新社区公共空间用地': '社区公共空间',
    '西侧科研配套用地': '科研配套',
    'AI研发创新与公共平台用地': 'AI研发创新',
    'AI全栈研发创新用地': '全栈研发创新',
}

for i, feat in enumerate(land['features']):
    props = feat['properties']
    code = props.get('land_use_code', '')
    name = props.get('name_zh', '')
    _, _, _, _, cx, cy = get_bbox(feat)
    coords = feat['geometry']['coordinates']
    xs = [c[0] for c in coords[0]]
    ys = [c[1] for c in coords[0]]
    
    color, cat = code_map.get(code, ('#F5F5F5', '待定'))
    label = label_map.get(name, name if len(name) <= 6 else name[:6])
    
    ax.fill(xs, ys, facecolor=color, edgecolor=lu_edge, linewidth=1.2, alpha=0.8, zorder=2)
    ax.plot(xs, ys, color=lu_edge, linewidth=1.2, zorder=3)
    
    # Offset labels to avoid overlap
    ox = 0.0003 * ((i % 3) - 1)
    oy = 0.0003 * ((i % 2) * 2 - 1)
    ax.text(cx + ox, cy + oy, label, fontsize=7.5, color='#444', fontweight='bold',
            ha='center', va='center',
            bbox=dict(boxstyle='round,pad=0.15', facecolor='white', edgecolor='none', alpha=0.7), zorder=5)

# Key area outlines
keys = load_geojson(os.path.join(BASE, 'geometry/key_areas.geojson'))
ka_styles = [('#FF7043', '众智园'), ('#42A5F5', 'AI原点社区'), ('#AB47BC', '大钟寺')]
for feat, (color, label) in zip(keys['features'], ka_styles):
    coords = feat['geometry']['coordinates']
    xs = [c[0] for c in coords[0]]
    ys = [c[1] for c in coords[0]]
    _, _, _, _, cx, cy = get_bbox(feat)
    ax.plot(xs, ys, color=color, linewidth=2.5, linestyle='--', zorder=6)
    ax.text(cx, max(ys)+0.0005, f'▼ {label}', fontsize=9, color=color, fontweight='bold',
            ha='center', va='bottom', zorder=7)

# Roads
roads = load_geojson(os.path.join(BASE, 'geometry/roads.geojson'))
for feat in roads['features']:
    coords = feat['geometry']['coordinates']
    xs = [c[0] for c in coords]
    ys = [c[1] for c in coords]
    ax.plot(xs, ys, color='#78909C', linewidth=1.2, alpha=0.5, zorder=4)

# Green space
green = load_geojson(os.path.join(BASE, 'geometry/green_space.geojson'))
for feat in green['features']:
    coords = feat['geometry']['coordinates']
    xs = [c[0] for c in coords[0]]
    ys = [c[1] for c in coords[0]]
    ax.fill(xs, ys, facecolor='#A5D6A7', edgecolor='#66BB6A', linewidth=0.8, alpha=0.4, zorder=1)

# Title
ax.set_title('用地功能结构 — 总体设计范围', fontsize=16, fontweight='bold', color='#333', pad=15)

# Legend
legend_elements = [
    mpatches.Patch(facecolor='#E3F2FD', edgecolor='#BDBDBD', label='科研/产业用地 (0802)'),
    mpatches.Patch(facecolor='#E8F5E9', edgecolor='#BDBDBD', label='居住社区用地 (0702)'),
    mpatches.Patch(facecolor='#F3E5F5', edgecolor='#BDBDBD', label='商业体验用地 (05)'),
    mpatches.Patch(facecolor='#C8E6C9', edgecolor='#66BB6A', label='公园绿地 (1401)'),
    plt.Line2D([0], [0], color='#FF7043', linewidth=2.5, linestyle='--', label='重点区域边界'),
    plt.Line2D([0], [0], color='#78909C', linewidth=1.2, alpha=0.5, label='道路'),
]
ax.legend(handles=legend_elements, loc='lower left', fontsize=8, framealpha=0.9, edgecolor='#CCCCCC')

ax.text(0.5, 0.01, f'用地分区: {len(land["features"])}块  |  覆盖: 100%  |  蓝绿空间: 48.7%  |  3处重点区域', fontsize=7, color='#777',
        ha='center', va='bottom', transform=fig.transFigure,
        bbox=dict(boxstyle='round,pad=0.3', facecolor='white', edgecolor='#CCC', alpha=0.9))

ax.set_xlim(sx1 - margin_x, sx2 + margin_x)
ax.set_ylim(sy1 - margin_y, sy2 + margin_y)
ax.set_aspect('equal')
ax.axis('off')
plt.tight_layout(rect=[0, 0.03, 1, 0.97])

os.makedirs(OUT, exist_ok=True)
for suffix in ['', '.en']:
    path = os.path.join(OUT, f'land-use-structure{suffix}.png')
    plt.savefig(path, dpi=200, bbox_inches='tight', facecolor=fig.get_facecolor())
    print(f'Saved: {path} ({os.path.getsize(path)/1024:.0f} KB)')
plt.close()
print('Done!')