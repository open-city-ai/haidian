#!/usr/bin/env python3
"""Generate key-areas figure with internal design detail overlays."""
import json, os, sys
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
    else:
        return 0, 0, 0, 0
    return min(xs), max(xs), min(ys), max(ys)

keys = load_geojson(os.path.join(BASE, 'geometry/key_areas.geojson'))
roads = load_geojson(os.path.join(BASE, 'geometry/roads.geojson'))
green = load_geojson(os.path.join(BASE, 'geometry/green_space.geojson'))

# Key area design details (conceptual internal nodes)
# Each key area gets: projects, scenario nodes, street grid, green corridors
design_details = {
    'zhongzhiyuan_ai_acceleration_area': {
        'name': '众智园AI自主创新加速区',
        'name_en': 'Zhongzhi Park AI Acceleration Area',
        'color': '#FF7043',
        'concept': 'AI全栈自主创新加速引擎',
        'sub_concept': '芯片·框架·平台·应用全链条',
        'projects': [
            ('JZ-02 清河创新界面', 0.30, 0.75, '蓝绿空间/产业展示', '#FF8A65'),
            ('JZ-05 算力中心节点', 0.70, 0.60, '新基建/公共服务', '#FFB74D'),
            ('安全治理沙盒', 0.35, 0.35, 'AI治理/标准', '#4DB6AC'),
            ('标准检测中心', 0.70, 0.25, '科技服务', '#7986CB'),
        ],
        'streets': [
            ((0.15, 0.5), (0.85, 0.5)), ((0.5, 0.15), (0.5, 0.85)),
            ((0.15, 0.25), (0.85, 0.25)), ((0.15, 0.75), (0.85, 0.75)),
        ],
        'green': [
            ((0.05, 0.05), (0.25, 0.95)), ((0.75, 0.05), (0.95, 0.95)),
        ],
    },
    'beijing_ai_origin_community': {
        'name': '北京AI原点社区',
        'name_en': 'Beijing AI Origin Community',
        'color': '#42A5F5',
        'concept': '全球AI创新策源地',
        'sub_concept': '科学家·创业者·开发者精神家园',
        'projects': [
            ('JZ-03 近校成果转化街', 0.30, 0.70, '城市更新/产业服务', '#64B5F6'),
            ('开源发布厅', 0.70, 0.65, '社区共建', '#4DB6AC'),
            ('共享实验室', 0.35, 0.35, '科研协作', '#9575CD'),
            ('人才公寓+咖啡馆', 0.70, 0.30, '人才服务', '#FF8A65'),
        ],
        'streets': [
            ((0.15, 0.5), (0.85, 0.5)), ((0.5, 0.15), (0.5, 0.85)),
            ((0.15, 0.3), (0.85, 0.3)), ((0.15, 0.7), (0.85, 0.7)),
        ],
        'green': [
            ((0.05, 0.05), (0.30, 0.95)), ((0.70, 0.05), (0.95, 0.95)),
        ],
    },
    'dazhongsi_ai_industry_cluster': {
        'name': '大钟寺AI产业聚集区',
        'name_en': 'Dazhongsi AI Industry Cluster',
        'color': '#AB47BC',
        'concept': 'AI智能原生新业态集聚区',
        'sub_concept': 'AI+消费·AI+商务·AI+体验',
        'projects': [
            ('JZ-04 大钟寺站四象限连通', 0.30, 0.70, '轨道一体化/慢行', '#BA68C8'),
            ('国际路演客厅', 0.70, 0.65, '运营/品牌', '#FF8A65'),
            ('数据要素会客厅', 0.35, 0.35, '数据治理', '#4DB6AC'),
            ('AI消费体验场', 0.70, 0.30, '智能原生新业态', '#FFB74D'),
        ],
        'streets': [
            ((0.15, 0.5), (0.85, 0.5)), ((0.5, 0.15), (0.5, 0.85)),
            ((0.15, 0.3), (0.85, 0.3)), ((0.15, 0.7), (0.85, 0.7)),
        ],
        'green': [
            ((0.05, 0.05), (0.25, 0.95)), ((0.75, 0.05), (0.95, 0.95)),
        ],
    },
}

fig, axes = plt.subplots(1, 3, figsize=(30, 12))
fig.patch.set_facecolor('#FAFAFA')

for ax, feat in zip(axes, keys['features']):
    props = feat['properties']
    aid = props['area_id']
    detail = design_details[aid]
    
    # Get bbox
    x1, x2, y1, y2 = get_bbox(feat)
    w = x2 - x1
    h = y2 - y1
    
    ax.set_facecolor('#FAFAFA')
    
    # Draw site boundary fill
    rect = plt.Rectangle((x1, y1), w, h, facecolor=detail['color'], alpha=0.06,
                         edgecolor=detail['color'], linewidth=2.5, zorder=1)
    ax.add_patch(rect)
    
    # Draw green corridors
    for (gx1, gy1), (gx2, gy2) in detail['green']:
        gx = x1 + w*gx1; gy = y1 + h*gy1
        gw = w*(gx2-gx1); gh = h*(gy2-gy1)
        ax.add_patch(plt.Rectangle((gx, gy), gw, gh, facecolor='#A5D6A7', alpha=0.5,
                                   edgecolor='#66BB6A', linewidth=1, zorder=2))
    
    # Draw street grid
    for (sx1, sy1), (sx2, sy2) in detail['streets']:
        ax.plot([x1+w*sx1, x1+w*sx2], [y1+h*sy1, y1+h*sy2],
                color='#78909C', linewidth=1.4, alpha=0.7, zorder=3)
    
    # Draw project nodes
    for pname, px, py, ptype, pcolor in detail['projects']:
        cx = x1 + w*px
        cy = y1 + h*py
        ax.scatter([cx], [cy], s=180, c=pcolor, edgecolors='white', linewidths=1.5,
                   marker='o', zorder=5)
        ax.text(cx, cy+0.0012, pname, fontsize=7.5, color='#333333',
                ha='center', va='bottom', fontweight='bold',
                bbox=dict(boxstyle='round,pad=0.25', facecolor='white', edgecolor=pcolor, alpha=0.9),
                zorder=6)
        ax.text(cx, cy-0.0012, ptype, fontsize=6.5, color='#888888',
                ha='center', va='top', style='italic', zorder=6)
    
    # Draw area name at top
    ax.text((x1+x2)/2, y2-0.0015, detail['name'], fontsize=15,
            color=detail['color'], fontweight='bold', ha='center', va='top',
            bbox=dict(boxstyle='round,pad=0.4', facecolor='white', edgecolor=detail['color'], linewidth=2, alpha=0.95),
            zorder=10)
    ax.text((x1+x2)/2, y2-0.004, detail['sub_concept'], fontsize=9, color='#666666',
            ha='center', va='top', style='italic', zorder=10)
    
    # Near-school/river annotation
    if aid == 'zhongzhiyuan_ai_acceleration_area':
        ax.annotate('清河', xy=(x1+w*0.85, y1+h*0.95), xytext=(x2-0.0005, y2+0.001),
                    fontsize=8, color='#00695C', ha='right', va='top',
                    arrowprops=dict(arrowstyle='->', color='#00695C', linewidth=1), zorder=8)
    if aid == 'beijing_ai_origin_community':
        ax.annotate('高校集群', xy=(x1+w*0.5, y2), xytext=(x1, y2+0.001),
                    fontsize=8, color='#1565C0', ha='left', va='bottom',
                    arrowprops=dict(arrowstyle='->', color='#1565C0', linewidth=1), zorder=8)
    if aid == 'dazhongsi_ai_industry_cluster':
        ax.annotate('大钟寺站', xy=(x1+w*0.3, y1), xytext=(x1, y1-0.001),
                    fontsize=8, color='#6A1B9A', ha='left', va='top',
                    arrowprops=dict(arrowstyle='->', color='#6A1B9A', linewidth=1), zorder=8)
    
    # Provisional note
    ax.text(x1+0.0005, y1+0.0005, 'PROVISIONAL\nROUGH', fontsize=6, color='#D32F2F',
            ha='left', va='bottom', fontweight='bold', alpha=0.7, zorder=8)
    
    ax.set_xlim(x1 - w*0.08, x2 + w*0.08)
    ax.set_ylim(y1 - h*0.10, y2 + h*0.10)
    ax.set_aspect('equal')
    ax.axis('off')

fig.suptitle('重点区域详细设计（概念示意）— 内部功能节点、路网与绿廊', 
             fontsize=18, fontweight='bold', color='#333333', y=0.98)

# Legend
legend_elements = [
    mpatches.Patch(facecolor='#A5D6A7', alpha=0.5, edgecolor='#66BB6A', label='绿廊/蓝绿空间'),
    plt.Line2D([0], [0], color='#78909C', linewidth=1.4, label='内部路网'),
    plt.scatter([], [], s=120, c='#FF8A65', edgecolors='white', label='公共空间/产业展示'),
    plt.scatter([], [], s=120, c='#4DB6AC', edgecolors='white', label='治理/数据/AI服务'),
    plt.scatter([], [], s=120, c='#7986CB', edgecolors='white', label='科技/标准服务'),
    plt.scatter([], [], s=120, c='#FFB74D', edgecolors='white', label='新基建/消费体验'),
]
fig.legend(handles=legend_elements, loc='lower center', ncol=6, fontsize=9,
           framealpha=0.9, edgecolor='#CCCCCC', bbox_to_anchor=(0.5, 0.02))

plt.tight_layout(rect=[0, 0.05, 1, 0.95])

os.makedirs(OUT, exist_ok=True)
for suffix in ['', '.en']:
    path = os.path.join(OUT, f'key-areas{suffix}.png')
    plt.savefig(path, dpi=200, bbox_inches='tight', facecolor=fig.get_facecolor())
    print(f'Saved: {path} ({os.path.getsize(path)/1024:.0f} KB)')

plt.close()
print('Done!')