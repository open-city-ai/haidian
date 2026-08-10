#!/usr/bin/env python3
"""Generate full GeoJSON package v2 — clean partition, no overlaps, official provisional boundaries."""
import json, math, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEO_DIR = os.path.join(ROOT, "geometry")
os.makedirs(GEO_DIR, exist_ok=True)

# ── Official provisional boundaries from repo ──
# PROV-SITE-001 (EPSG:4326)
SITE = [[116.3407,39.939],[116.3553,39.939],[116.3553,39.965],[116.3533,39.99],
        [116.3553,40.0265],[116.3427,40.0265],[116.3417,40.006],[116.3397,39.975],[116.3407,39.939]]

# KEY areas (MultiPolygon rings)
KEY_ZHONGZHIYUAN = [[[116.343,40.0075],[116.354,40.0075],[116.354,40.026],[116.343,40.026],[116.343,40.0075]]]
KEY_ORIGIN = [[[116.342,39.9835],[116.353,39.9835],[116.353,39.9935],[116.342,39.9935],[116.342,39.9835]]]
KEY_DAZHONGSI = [[[116.342,39.944],[116.355,39.944],[116.355,39.94984],[116.342,39.94984],[116.342,39.944]]]

# ── EPSG:4548 approximate ──
LAT_REF = 39.97
M_LON = 111320.0 * math.cos(math.radians(LAT_REF))
M_LAT = 111320.0

def area4548(ring):
    a=0.0; n=len(ring)
    for i in range(n):
        x1=ring[i][0]*M_LON; y1=ring[i][1]*M_LAT
        x2=ring[(i+1)%n][0]*M_LON; y2=ring[(i+1)%n][1]*M_LAT
        a+=x1*y2-x2*y1
    return abs(a)/2.0

def bbox(ring):
    xs=[c[0] for c in ring]; ys=[c[1] for c in ring]
    return min(xs),min(ys),max(xs),max(ys)

def feat(fid,layer,coords,props):
    if isinstance(coords[0][0],(int,float)):
        geom={"type":"Polygon","coordinates":[coords]}
    else:
        geom={"type":"MultiPolygon","coordinates":coords}
    return {"type":"Feature","id":fid,"properties":props,"geometry":geom}

def write_gj(name,features):
    with open(os.path.join(GEO_DIR,f"{name}.geojson"),"w",encoding="utf-8") as f:
        json.dump({"type":"FeatureCollection","features":features},f,ensure_ascii=False,indent=2)

# ── Site boundary ──
site_area = area4548(SITE)
print(f"Site: {site_area:.0f} m² = {site_area/1e6:.2f} km² (official 11.4 km²)")

write_gj("site_boundary",[feat("PROV-SITE-001","SITE_BOUNDARY",SITE,{
    "id":"PROV-SITE-001","layer":"SITE_BOUNDARY","scope_id":"overall_design_area",
    "name_zh":"总体设计范围（临时替代边界）","source_type":"agent_inferred_from_public_data",
    "confidence":"medium","geometry_role":"provisional_constraint","official_boundary":False,
    "boundary_precision":"provisional_rough","source_id":"DATA-SRC-PROVISIONAL-BOUNDARIES-20260605",
    "area_sqm_declared":11400000,"area_sqm_calculated":round(site_area,2)})])

# ── Key areas ──
key_data = [
    ("PROV-KEY-001","zhongzhiyuan_ai_acceleration_area","众智园AI自主创新加速区",KEY_ZHONGZHIYUAN,1921000),
    ("PROV-KEY-002","beijing_ai_origin_community","北京AI原点社区",KEY_ORIGIN,1043000),
    ("PROV-KEY-003","dazhongsi_ai_industry_cluster","大钟寺AI产业集聚区",KEY_DAZHONGSI,720000),
]
key_feats=[]; key_total=0
for kid,aid,name,rings,decl in key_data:
    a = sum(area4548(r) for r in rings)
    key_total+=a
    key_feats.append(feat(kid,"KEY_AREA",rings,{
        "id":kid,"layer":"KEY_AREA","area_id":aid,"name_zh":f"{name}（临时粗略范围）",
        "source_type":"agent_inferred_from_public_data","confidence":"medium",
        "geometry_role":"provisional_constraint","official_boundary":False,"boundary_precision":"provisional_rough",
        "announced_area_sqm":decl,"area_sqm_calculated":round(a,2),
        "source_id":"DATA-SRC-PROVISIONAL-BOUNDARIES-20260605"}))
write_gj("key_areas",key_feats)

# ── Land use: clean N-S partition on site bbox ──
min_lon,min_lat,max_lon,max_lat = bbox(SITE)
lat_range = max_lat - min_lat
lon_range = max_lon - min_lon
cx = (min_lon+max_lon)/2

# Partition: Park 12% | Road E 2% | E zone 21% | TOTAL lon = park+rdE+eZone = 35% of width on each side
# Actually: cx split into E/W halves. E half: park_e(6%) | road_e(2%) | zone_e(42%)
# W half: zone_w(42%) | road_w(2%) | park_w(6%)
park_w = lon_range * 0.06  # half-park width each side
road_w = lon_range * 0.02
zone_w = lon_range * 0.42

park_left = cx - park_w
park_right = cx + park_w
rdE_left = park_right
rdE_right = rdE_left + road_w
rdW_right = park_left
rdW_left = rdW_right - road_w

bands = [
    (min_lat, min_lat+lat_range*0.20, "09","大钟寺AI商业商务区","07","大钟寺创新社区"),
    (min_lat+lat_range*0.20, min_lat+lat_range*0.45, "08","AI原点科研教育区","10","原点创新混合区"),
    (min_lat+lat_range*0.45, min_lat+lat_range*0.72, "10","众智园AI研发区","07","众智园创新配套区"),
    (min_lat+lat_range*0.72, max_lat, "14","北段生态预留区","10","北段研发预留区"),
]

lu_feats=[]
# Park (full N-S)
lu_feats.append(feat("LU-PARK-01","LAND_USE",
    [[park_left,min_lat],[park_right,min_lat],[park_right,max_lat],[park_left,max_lat],[park_left,min_lat]],
    {"id":"LU-PARK-01","layer":"LAND_USE","land_use_code":"14","name_zh":"京张遗址公园绿带",
     "source_type":"design_proposal","confidence":"medium","geometry_role":"design_layer"}))
# Roads (full N-S)
lu_feats.append(feat("LU-ROAD-E","LAND_USE",
    [[rdE_left,min_lat],[rdE_right,min_lat],[rdE_right,max_lat],[rdE_left,max_lat],[rdE_left,min_lat]],
    {"id":"LU-ROAD-E","layer":"LAND_USE","land_use_code":"12","name_zh":"东侧创新大道",
     "source_type":"design_proposal","confidence":"medium","geometry_role":"design_layer"}))
lu_feats.append(feat("LU-ROAD-W","LAND_USE",
    [[rdW_left,min_lat],[rdW_right,min_lat],[rdW_right,max_lat],[rdW_left,max_lat],[rdW_left,min_lat]],
    {"id":"LU-ROAD-W","layer":"LAND_USE","land_use_code":"12","name_zh":"西侧服务道路",
     "source_type":"design_proposal","confidence":"medium","geometry_role":"design_layer"}))

for ls,le,ec,en,wc,wn in bands:
    lu_feats.append(feat(f"LU-E-{ls:.4f}","LAND_USE",
        [[rdE_right,ls],[max_lon,ls],[max_lon,le],[rdE_right,le],[rdE_right,ls]],
        {"id":f"LU-E-{ls:.4f}","layer":"LAND_USE","land_use_code":ec,"name_zh":en,
         "source_type":"design_proposal","confidence":"medium","geometry_role":"design_layer"}))
    lu_feats.append(feat(f"LU-W-{ls:.4f}","LAND_USE",
        [[min_lon,ls],[rdW_left,ls],[rdW_left,le],[min_lon,le],[min_lon,ls]],
        {"id":f"LU-W-{ls:.4f}","layer":"LAND_USE","land_use_code":wc,"name_zh":wn,
         "source_type":"design_proposal","confidence":"medium","geometry_role":"design_layer"}))

# Compute areas & verify partition
lu_total = 0
for f in lu_feats:
    a = area4548(f["geometry"]["coordinates"][0])
    f["properties"]["area_sqm_calculated"] = round(a,2)
    lu_total += a

# Bbox area (= site bbox, larger than site polygon)
bbox_area = (max_lon-min_lon)*M_LON * (max_lat-min_lat)*M_LAT
print(f"Land use total: {lu_total:.0f} m², bbox: {bbox_area:.0f} m², ratio: {lu_total/bbox_area:.5f}")
# Verify per-band coverage
for i,(ls,le,ec,en,wc,wn) in enumerate(bands):
    band_lu = [f for f in lu_feats if f["id"].startswith(f"LU-E-{ls:.4f}") or f["id"].startswith(f"LU-W-{ls:.4f}")]
    # Also count the fraction of park/road in this band
    band_park = area4548([[park_left,ls],[park_right,ls],[park_right,le],[park_left,le]])
    band_rd_e = area4548([[rdE_left,ls],[rdE_right,ls],[rdE_right,le],[rdE_left,le]])
    band_rd_w = area4548([[rdW_left,ls],[rdW_right,ls],[rdW_right,le],[rdW_left,le]])
    band_zones = sum(f["properties"]["area_sqm_calculated"] for f in band_lu)
    band_total = band_park + band_rd_e + band_rd_w + band_zones
    band_expected = (le-ls)*M_LAT * (max_lon-min_lon)*M_LON
    print(f"  Band {en}: park={band_park:.0f} rd_e={band_rd_e:.0f} rd_w={band_rd_w:.0f} zones={band_zones:.0f} sum={band_total:.0f} exp={band_expected:.0f}")

write_gj("land_use",lu_feats)

# ── Green space (park + pocket parks) ──
green_feats = []
green_feats.append(feat("GS-PARK-01","GREEN_SPACE",
    [[park_left-0.0005,min_lat],[park_right+0.0005,min_lat],[park_right+0.0005,max_lat],[park_left-0.0005,max_lat],[park_left-0.0005,min_lat]],
    {"id":"GS-PARK-01","layer":"GREEN_SPACE","green_type":"linear_park","name_zh":"京张遗址公园绿廊",
     "source_type":"design_proposal","confidence":"medium","geometry_role":"design_layer"}))
for lat,lon_s,name in [(min_lat+lat_range*0.15, max_lon-lon_range*0.15,"大钟寺口袋公园"),
                         (min_lat+lat_range*0.35, min_lon+lon_range*0.15,"原点社区花园"),
                         (min_lat+lat_range*0.55, max_lon-lon_range*0.15,"众智园创新绿地")]:
    green_feats.append(feat(f"GS-PKT-{name[:2]}","GREEN_SPACE",
        [[lon_s-0.002,lat-0.0015],[lon_s+0.002,lat-0.0015],[lon_s+0.002,lat+0.0015],[lon_s-0.002,lat+0.0015],[lon_s-0.002,lat-0.0015]],
        {"id":f"GS-PKT-{name[:2]}","layer":"GREEN_SPACE","green_type":"pocket_park","name_zh":name,
         "source_type":"design_proposal","confidence":"medium","geometry_role":"design_layer"}))
gs_total = sum(area4548(f["geometry"]["coordinates"][0]) for f in green_feats)
for f in green_feats: f["properties"]["area_sqm_calculated"]=round(area4548(f["geometry"]["coordinates"][0]),2)
write_gj("green_space",green_feats)
print(f"Green space: {gs_total:.0f} m² ({gs_total/site_area*100:.1f}%)")

# ── Public space (plazas at key nodes) ──
ps_feats=[]
for lat,name in [(min_lat+lat_range*0.08,"百年京张铁路广场"),(min_lat+lat_range*0.28,"AI原点创新广场"),
                  (min_lat+lat_range*0.48,"五道口科技交往广场"),(min_lat+lat_range*0.68,"众智园开源广场")]:
    ps_feats.append(feat(f"PS-{name[:4]}","PUBLIC_SPACE",
        [[cx-0.002,lat-0.002],[cx+0.002,lat-0.002],[cx+0.002,lat+0.002],[cx-0.002,lat+0.002],[cx-0.002,lat-0.002]],
        {"id":f"PS-{name[:4]}","layer":"PUBLIC_SPACE","space_type":"plaza","name_zh":name,
         "source_type":"design_proposal","confidence":"medium","geometry_role":"design_layer"}))
ps_total=sum(area4548(f["geometry"]["coordinates"][0]) for f in ps_feats)
for f in ps_feats: f["properties"]["area_sqm_calculated"]=round(area4548(f["geometry"]["coordinates"][0]),2)
write_gj("public_space",ps_feats)

# ── Buildings (conceptual clusters) ──
bld_feats=[]
clusters=[(min_lat+lat_range*0.08,cx+lon_range*0.25,"大钟寺AI创新中心","commercial",3),
          (min_lat+lat_range*0.30,cx+lon_range*0.18,"原点AI实验室","research",4),
          (min_lat+lat_range*0.58,cx-lon_range*0.20,"众智园算力中心","industrial",3),
          (min_lat+lat_range*0.68,cx+lon_range*0.15,"北纬AI人才社区","residential",5)]
for lat_c,lon_c,name,ktype,count in clusters:
    for i in range(count):
        s=0.0015; off_lon=0; off_lat=0
        if count>1: off_lon=(i%2-0.5)*s*3; off_lat=(i//2-0.5)*s*2.5
        bld_feats.append(feat(f"BLD-{name[:4]}-{i+1:02d}","BUILDINGS",
            [[lon_c+off_lon-s,lat_c+off_lat-s*0.7],[lon_c+off_lon+s,lat_c+off_lat-s*0.7],
             [lon_c+off_lon+s,lat_c+off_lat+s*0.7],[lon_c+off_lon-s,lat_c+off_lat+s*0.7],
             [lon_c+off_lon-s,lat_c+off_lat-s*0.7]],
            {"id":f"BLD-{name[:4]}-{i+1:02d}","layer":"BUILDINGS","building_type":ktype,
             "name_zh":f"{name}{i+1}","source_type":"design_proposal","confidence":"low",
             "geometry_role":"design_layer","status":"conceptual"}))
write_gj("buildings",bld_feats)

# ── Roads ──
rd_feats=[]
rd_feats.append(feat("ROAD-NS","ROADS",
    [[cx-0.001,min_lat],[cx+0.001,min_lat],[cx+0.001,max_lat],[cx-0.001,max_lat],[cx-0.001,min_lat]],
    {"id":"ROAD-NS","layer":"ROADS","road_type":"primary_greenway","name_zh":"京张慢行主轴",
     "source_type":"design_proposal","confidence":"medium","geometry_role":"design_layer"}))
for lat,name in [(min_lat+lat_range*0.10,"大钟寺TOD连接线"),(min_lat+lat_range*0.30,"知春路创新通廊"),
                  (min_lat+lat_range*0.50,"五道口活力廊道"),(min_lat+lat_range*0.80,"清河滨水通道")]:
    rd_feats.append(feat(f"ROAD-EW-{name[:3]}","ROADS",
        [[min_lon,lat-0.0005],[max_lon,lat-0.0005],[max_lon,lat+0.0005],[min_lon,lat+0.0005],[min_lon,lat-0.0005]],
        {"id":f"ROAD-EW-{name[:3]}","layer":"ROADS","road_type":"connector","name_zh":name,
         "source_type":"design_proposal","confidence":"medium","geometry_role":"design_layer"}))
write_gj("roads",rd_feats)

# ── Constraints ──
constraint_feats=[feat("CONST-SITE","CONSTRAINTS",SITE,
    {"id":"CONST-SITE","layer":"CONSTRAINTS","constraint_type":"provisional_boundary",
     "name_zh":"总体设计范围临时约束","confidence":"medium","geometry_role":"provisional_constraint",
     "official_boundary":False})]
write_gj("constraints",constraint_feats)

# ── Phasing ──
phase1_end=min_lat+lat_range*0.45; phase2_end=min_lat+lat_range*0.72
phases=[(min_lat,phase1_end,"近期2026-2028","一期：大钟寺+AI原点社区"),
        (phase1_end,phase2_end,"中期2028-2030","二期：众智园AI加速区"),
        (phase2_end,max_lat,"远期2030-2035","三期：北段生态研发扩展")]
phase_feats=[]
for ps,pe,phase,name in phases:
    phase_feats.append(feat(f"PH-{ps:.4f}","PHASING",
        [[min_lon,ps],[max_lon,ps],[max_lon,pe],[min_lon,pe],[min_lon,ps]],
        {"id":f"PH-{ps:.4f}","layer":"PHASING","phase":phase,"name_zh":name,
         "source_type":"design_proposal","confidence":"medium","geometry_role":"design_layer"}))
write_gj("phasing",phase_feats)

# ── metrics.json ──
lu_by_code={}
for f in lu_feats:
    c=f["properties"]["land_use_code"]
    lu_by_code[c]=lu_by_code.get(c,0)+f["properties"]["area_sqm_calculated"]

metrics={
    "schema_version":"0.1.0","project_id":"centennial-jingzhang-ai-belt",
    "calculated_date":"2026-08-10","calculated_epsg":"EPSG:4548 approximate",
    "coordinate_policy":{"geojson_exchange_crs":"EPSG:4326","area_calculation_crs":"EPSG:4548"},
    "metrics":[
        {"id":"site_area","status":"known","value":round(site_area,2),"unit":"sqm","source_files":["geometry/site_boundary.geojson"],"formula":"polygon_area in EPSG:4548","confidence":"medium","assumptions":["official polygon missing, using provisional boundary"]},
        {"id":"site_area_km2","status":"known","value":round(site_area/1e6,2),"unit":"km2","confidence":"medium"},
        {"id":"land_use_total","status":"known","value":round(lu_total,2),"unit":"sqm","source_files":["geometry/land_use.geojson"],"formula":"sum of land_use partitions (rectangular zones covering site bbox)","confidence":"medium","note":"Partition based on site bbox; actual site polygon is irregular. Land use zones cover full bbox without gaps/overlaps."},
        {"id":"green_space_area","status":"known","value":round(gs_total,2),"unit":"sqm","source_files":["geometry/green_space.geojson"],"confidence":"medium"},
        {"id":"green_space_ratio","status":"known","value":round(gs_total/site_area*100,1),"unit":"%","confidence":"medium","target":"≥30%"},
        {"id":"public_space_area","status":"known","value":round(ps_total,2),"unit":"sqm","source_files":["geometry/public_space.geojson"],"confidence":"medium"},
        {"id":"building_count","status":"known","value":len(bld_feats),"unit":"count","confidence":"low","note":"conceptual massing only"},
        {"id":"key_areas_total","status":"known","value":round(key_total/10000,1),"unit":"ha","source_files":["geometry/key_areas.geojson"],"confidence":"medium"},
        {"id":"phasing_count","status":"known","value":3,"unit":"count","confidence":"medium"},
    ],
    "land_use_by_code":{k:round(v,2) for k,v in lu_by_code.items()},
    "official_area_reference":{"overall_design_area_sqm":11400000,"key_areas_total_ha":368.4}
}
with open(os.path.join(ROOT,"metrics.json"),"w",encoding="utf-8") as f:
    json.dump(metrics,f,ensure_ascii=False,indent=2)

# ── Summary ──
print(f"\n=== DONE ===")
print(f"Site: {site_area/1e6:.2f} km² | Land use (bbox): {lu_total/1e6:.2f} km² (zones cover site bbox)")
print(f"Green: {gs_total/site_area*100:.1f}% | Public space: {ps_total:.0f} m² | Buildings: {len(bld_feats)}")
print(f"Key areas: {key_total/10000:.1f} ha | Files: 9 GeoJSON + metrics.json")
