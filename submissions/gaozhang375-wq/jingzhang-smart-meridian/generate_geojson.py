import json, os

workdir = 'C:/Users/Administrator/WorkBuddy/2026-08-08-15-17-25/submission/geometry'
os.makedirs(workdir, exist_ok=True)

def make_bbox(north, south, west, east):
    return [[[west, south], [east, south], [east, north], [west, north], [west, south]]]

# 1. site_boundary.geojson - provisional
site_boundary = {
    'type': 'FeatureCollection',
    'features': [{
        'type': 'Feature',
        'id': 'SITE_BOUNDARY_001',
        'properties': {
            'id': 'SITE_BOUNDARY_001',
            'layer': 'site_boundary',
            'source_type': 'provisional_constraint',
            'confidence': 'low',
            'geometry_role': 'provisional_constraint',
            'official_boundary': False,
            'boundary_precision': 'provisional_rough',
            'name_zh': '百年京张AI创新带场地临时边界',
            'name_en': 'Centennial JingZhang AI Innovation Belt Provisional Boundary',
            'area_ha_approx': 4360,
            'notes': 'PROVISIONAL: Not official boundary. Derived from public descriptions.'
        },
        'geometry': {
            'type': 'Polygon',
            'coordinates': make_bbox(40.00, 39.93, 116.315, 116.365)
        }
    }]
}

# 2. key_areas.geojson
key_areas = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature', 'id': 'beijing_ai_origin_community',
            'properties': {
                'id': 'beijing_ai_origin_community', 'layer': 'key_areas',
                'source_type': 'provisional_constraint', 'confidence': 'low',
                'geometry_role': 'provisional_constraint', 'official_boundary': False,
                'boundary_precision': 'provisional_rough',
                'name_zh': 'AI原点社区（智源坊）',
                'name_en': 'AI Origin Community (Smart Source Quarter)',
                'role_zh': '世界级AI创新生态', 'area_ha_approx': 500
            },
            'geometry': {'type': 'Polygon', 'coordinates': make_bbox(39.998, 39.978, 116.325, 116.345)}
        },
        {
            'type': 'Feature', 'id': 'zhongzhiyuan_ai_acceleration_area',
            'properties': {
                'id': 'zhongzhiyuan_ai_acceleration_area', 'layer': 'key_areas',
                'source_type': 'provisional_constraint', 'confidence': 'low',
                'geometry_role': 'provisional_constraint', 'official_boundary': False,
                'boundary_precision': 'provisional_rough',
                'name_zh': '众智园AI自主创新加速区（众智引擎）',
                'name_en': 'Zhongzhiyuan AI Acceleration Area',
                'role_zh': 'AI全栈自主创新体系与AI治理全球话语权', 'area_ha_approx': 400
            },
            'geometry': {'type': 'Polygon', 'coordinates': make_bbox(39.978, 39.960, 116.330, 116.350)}
        },
        {
            'type': 'Feature', 'id': 'dazhongsi_ai_industry_cluster',
            'properties': {
                'id': 'dazhongsi_ai_industry_cluster', 'layer': 'key_areas',
                'source_type': 'provisional_constraint', 'confidence': 'low',
                'geometry_role': 'provisional_constraint', 'official_boundary': False,
                'boundary_precision': 'provisional_rough',
                'name_zh': '大钟寺AI产业集聚区（智钟汇）',
                'name_en': 'Dazhongsi AI Industry Cluster',
                'role_zh': '智能原生新业态', 'area_ha_approx': 350
            },
            'geometry': {'type': 'Polygon', 'coordinates': make_bbox(39.963, 39.948, 116.335, 116.355)}
        },
        {
            'type': 'Feature', 'id': 'zhongguancun_technology_service_wing',
            'properties': {
                'id': 'zhongguancun_technology_service_wing', 'layer': 'key_areas',
                'source_type': 'provisional_constraint', 'confidence': 'low',
                'geometry_role': 'provisional_constraint', 'official_boundary': False,
                'boundary_precision': 'provisional_rough',
                'name_zh': '中关村科技服务翼（科服云翼）',
                'name_en': 'Zhongguancun Technology Service Wing',
                'role_zh': '要素全球化配置、中关村IP与资本赋能'
            },
            'geometry': {'type': 'Polygon', 'coordinates': make_bbox(39.995, 39.948, 116.310, 116.325)}
        },
        {
            'type': 'Feature', 'id': 'xiaoyuehe_scenario_empowerment_wing',
            'properties': {
                'id': 'xiaoyuehe_scenario_empowerment_wing', 'layer': 'key_areas',
                'source_type': 'provisional_constraint', 'confidence': 'low',
                'geometry_role': 'provisional_constraint', 'official_boundary': False,
                'boundary_precision': 'provisional_rough',
                'name_zh': '小月河场景赋能翼（场景之河）',
                'name_en': 'Xiaoyuehe Scenario Empowerment Wing',
                'role_zh': 'AI场景赋能与智能化AI活力城市'
            },
            'geometry': {'type': 'Polygon', 'coordinates': make_bbox(39.995, 39.948, 116.350, 116.365)}
        }
    ]
}

# 3. land_use.geojson
land_use = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature', 'id': 'LU_INNOVATION',
            'properties': {'id': 'LU_INNOVATION', 'layer': 'land_use', 'source_type': 'design_proposal',
                'confidence': 'low', 'geometry_role': 'design_proposal',
                'land_use_type': 'innovation_mixed', 'name_zh': '创新研发混合用地', 'area_ha_approx': 750},
            'geometry': {'type': 'Polygon', 'coordinates': make_bbox(39.998, 39.960, 116.328, 116.355)}
        },
        {
            'type': 'Feature', 'id': 'LU_COMMERCIAL',
            'properties': {'id': 'LU_COMMERCIAL', 'layer': 'land_use', 'source_type': 'design_proposal',
                'confidence': 'low', 'geometry_role': 'design_proposal',
                'land_use_type': 'commercial_business', 'name_zh': '商业商务用地', 'area_ha_approx': 550},
            'geometry': {'type': 'Polygon', 'coordinates': make_bbox(39.970, 39.945, 116.335, 116.355)}
        },
        {
            'type': 'Feature', 'id': 'LU_RESIDENTIAL',
            'properties': {'id': 'LU_RESIDENTIAL', 'layer': 'land_use', 'source_type': 'design_proposal',
                'confidence': 'low', 'geometry_role': 'design_proposal',
                'land_use_type': 'residential', 'name_zh': '居住用地', 'area_ha_approx': 1200},
            'geometry': {'type': 'Polygon', 'coordinates': make_bbox(39.995, 39.945, 116.315, 116.332)}
        },
        {
            'type': 'Feature', 'id': 'LU_GREEN',
            'properties': {'id': 'LU_GREEN', 'layer': 'land_use', 'source_type': 'design_proposal',
                'confidence': 'low', 'geometry_role': 'design_proposal',
                'land_use_type': 'green_space', 'name_zh': '绿地与公共空间', 'area_ha_approx': 1000},
            'geometry': {'type': 'Polygon', 'coordinates': make_bbox(40.000, 39.940, 116.340, 116.365)}
        },
        {
            'type': 'Feature', 'id': 'LU_PUBLIC',
            'properties': {'id': 'LU_PUBLIC', 'layer': 'land_use', 'source_type': 'design_proposal',
                'confidence': 'low', 'geometry_role': 'design_proposal',
                'land_use_type': 'public_facilities', 'name_zh': '公共服务设施用地', 'area_ha_approx': 350},
            'geometry': {'type': 'Polygon', 'coordinates': make_bbox(39.990, 39.950, 116.328, 116.345)}
        },
        {
            'type': 'Feature', 'id': 'LU_TRANSPORT',
            'properties': {'id': 'LU_TRANSPORT', 'layer': 'land_use', 'source_type': 'design_proposal',
                'confidence': 'low', 'geometry_role': 'design_proposal',
                'land_use_type': 'transportation', 'name_zh': '道路交通用地', 'area_ha_approx': 510},
            'geometry': {'type': 'Polygon', 'coordinates': make_bbox(39.998, 39.945, 116.315, 116.320)}
        }
    ]
}

# Write main GeoJSON files
for name, data in [('site_boundary', site_boundary), ('key_areas', key_areas), ('land_use', land_use)]:
    path = os.path.join(workdir, f'{name}.geojson')
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f'Created {path}')

# Placeholder layers
pp = {
    'source_type': 'design_proposal', 'confidence': 'low', 'geometry_role': 'design_proposal',
    'notes': 'Conceptual placeholder - to be refined with official data'
}

for layer in ['buildings', 'roads', 'green_space', 'public_space', 'constraints', 'phasing']:
    fc = {
        'type': 'FeatureCollection',
        'features': [{
            'type': 'Feature', 'id': f'{layer}_ph',
            'properties': {'id': f'{layer}_ph', 'layer': layer, **pp, 'name_zh': layer},
            'geometry': {'type': 'Point', 'coordinates': [116.34, 39.97]}
        }]
    }
    path = os.path.join(workdir, f'{layer}.geojson')
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(fc, f, ensure_ascii=False, indent=2)
    print(f'Created {path}')

print('Done - all GeoJSON files created.')
