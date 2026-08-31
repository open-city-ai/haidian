from pathlib import Path
import json
from PIL import Image, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parents[1]/'submissions'/'whalevoyage'/'jingzhang-open-loop'
FIG=ROOT/'assets'/'figures'
ZH='C:/Windows/Fonts/NotoSansSC-VF.ttf'; EN='C:/Windows/Fonts/arial.ttf'; BOLD='C:/Windows/Fonts/arialbd.ttf'
def F(p,n): return ImageFont.truetype(p,n)
def make(name,zh,en,kind):
 for is_en,title in [(False,zh),(True,en)]:
  fp=EN if is_en else ZH; im=Image.new('RGB',(1800,1125),'#f4f6f1'); d=ImageDraw.Draw(im)
  d.rectangle((0,0,1800,150),fill='#17313a'); d.text((70,35),title,font=F(fp,46),fill='white')
  d.text((70,100),'CONCEPT MODEL / PROVISIONAL GEOMETRY — NOT AN OFFICIAL REDLINE',font=F(BOLD,18),fill='#e2b93b')
  if kind=='overview':
   d.line((250,560,600,330,1050,380,1500,600,1250,820,700,800,250,560),fill='#087f8c',width=18,joint='curve')
   for x,y,t,c in [(400,500,'RESONANCE STATION','#dd6b4d'),(850,350,'CO-CREATION DECK','#087f8c'),(1320,620,'INNOVATION GATE','#e2b93b')]:
    d.ellipse((x-70,y-70,x+70,y+70),fill=c,outline='white',width=8); d.text((x-130,y+95),t,font=F(BOLD,22),fill='#17313a')
   d.text((180,250),'43.6 km² coordinated research  |  11.4 km² overall design  |  3 key areas',font=F(fp,27),fill='#17313a')
  elif kind=='land':
   cols=['#d9ead3','#b8dfe0','#f7d794','#f0b7a5']; labs=['BLUE-GREEN OPEN SPACE','INNOVATION SERVICES','HERITAGE READING','YOUTH-FRIENDLY MIX']
   for i,(x,y) in enumerate([(180,260),(930,260),(180,630),(930,630)]):
    d.rounded_rectangle((x,y,x+650,y+270),25,fill=cols[i],outline='#17313a',width=4); d.text((x+35,y+115),labs[i],font=F(BOLD,24),fill='#17313a')
   d.text((180,205),'Four conceptual layers — separate from statutory land-use classification',font=F(fp,25),fill='#17313a')
  elif kind=='areas':
   d.line((280,600,750,450,1120,520,1500,700),fill='#17313a',width=10)
   for x,y,t,c in [(430,570,'ZHONGZHIYUAN','#dd6b4d'),(900,420,'AI ORIGIN COMMUNITY','#087f8c'),(1330,650,'DAZHONGSI','#e2b93b')]:
    d.ellipse((x-125,y-125,x+125,y+125),fill=c,outline='white',width=8); d.text((x-105,y-15),t,font=F(BOLD,21),fill='#17313a')
   d.text((270,240),'Three key areas / distinct roles / shared feedback loop',font=F(fp,28),fill='#17313a')
  elif kind=='mobility':
   d.line((200,760,540,430,910,690,1260,350,1600,650),fill='#087f8c',width=18); d.line((200,370,560,650,930,350,1290,760,1600,390),fill='#dd6b4d',width=9)
   d.text((160,220),'Walking spine + blue-green connectors + accessible transfer points',font=F(fp,27),fill='#17313a'); d.text((160,900),'Red: public activity   Teal: slow mobility   Gold: transfer node',font=F(fp,23),fill='#17313a')
  else:
   for i,(n,v,note) in enumerate([('SITE AREA','11.4 km²','provisional computed area'),('GREEN RATIO','12.3%','green / submitted boundary'),('PUBLIC SPACE','7.3%','public / submitted boundary'),('KEY AREAS','3','provisional areas')]):
    y=240+i*180; d.rounded_rectangle((180,y,1600,y+145),18,fill='white',outline='#d7e2dc',width=3); d.text((230,y+30),n,font=F(BOLD,28),fill='#17313a'); d.text((800,y+22),v,font=F(BOLD,40),fill='#087f8c'); d.text((1080,y+42),note,font=F(fp,22),fill='#61767a')
  d.text((70,1060),'Boundary-dependent values must be recalculated when official geometry is supplied.',font=F(fp,18),fill='#a94e38')
  im.save(FIG/(name+('.en.png' if is_en else '.png')),optimize=True)

make('site-overview','总览地图与京张开源环','Overall map and Jingzhang Open Loop','overview')
make('land-use-structure','用地功能结构','Land-use structure','land')
make('key-areas','三处重点区域','Three key areas','areas')
make('mobility-bluegreen','交通慢行与蓝绿公共空间','Walking, mobility and blue-green space','mobility')
make('metrics-evidence','核心指标与证据口径','Core metrics and evidence definitions','metrics')

cm=ROOT/'compliance_matrix.json'; data=json.loads(cm.read_text(encoding='utf-8'))
map_={'1.3.1':('ecosystem-cases-and-operations',['geometry/site_boundary.geojson','geometry/key_areas.geojson'],['site_area_sqm','key_area_count'],'assets/figures/site-overview.png'),'1.3.2':('three-level-scope-and-land-use',['geometry/land_use.geojson','geometry/buildings.geojson'],['green_ratio'],'assets/figures/land-use-structure.png'),'1.3.3':('public-inclusion-and-user-groups',['geometry/public_space.geojson','geometry/roads.geojson'],['public_space_ratio'],'assets/figures/mobility-bluegreen.png'),'1.4.1':('coordinated-research-area',['geometry/site_boundary.geojson'],['key_area_count'],'assets/figures/site-overview.png'),'1.4.2':('overall-design-area',['geometry/land_use.geojson','geometry/buildings.geojson'],['green_ratio','public_space_ratio'],'assets/figures/land-use-structure.png'),'1.4.3':('three-key-areas',['geometry/key_areas.geojson'],['key_area_count'],'assets/figures/key-areas.png'),'agent.1':('brand-architecture-and-overall-concept',['geometry/site_boundary.geojson'],['key_area_count'],'assets/figures/site-overview.png'),'agent.2':('global-case-evidence-and-ecosystem',[],[],'assets/figures/site-overview.png'),'agent.3':('scenario-maturity-and-stop-conditions',[],[],'assets/figures/metrics-evidence.png'),'agent.4':('public-space-components-and-landmarks',['geometry/public_space.geojson'],['public_space_ratio'],'assets/figures/mobility-bluegreen.png'),'agent.5':('cultural-narrative-and-heritage',[],[],'assets/figures/site-overview.png'),'agent.6':('regional-synergy-and-long-term-operations',[],[],'assets/figures/site-overview.png')}
for item in data['requirements']:
 rid=item['requirement_id']; sec,layers,metrics,drawing=map_.get(rid,('proposal-evidence',['geometry/site_boundary.geojson'],['key_area_count'],'assets/figures/site-overview.png')); item['report_sections']=[sec]; item['geojson_layers']=layers; item['metrics']=metrics; item['drawings']=[drawing]; item['visual_sections']=[sec]; item['evidence_note']=f'Dedicated evidence anchor: proposal.md#{sec}; requirement-specific layers, metrics and figure.'
cm.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
