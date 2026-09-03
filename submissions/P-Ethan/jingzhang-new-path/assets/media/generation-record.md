# “京张新路”AI辅助概念图生成记录 V2

生成日期：2026-08-12  
工具路径：OpenAI内置`image_gen`  
用途：A3手册、A0展板、双语正文和离线网页的概念解释层  
状态：候选图，待独立视觉审查；不作为现场照片、现状证据、官方规划图或实施效果承诺。

## 1. 文件、尺寸和哈希

| 文件 | 角色 | 尺寸 | SHA-256 |
|---|---|---:|---|
| `assets/media/new-path-overall-aerial.jpg` | 总体鸟瞰投稿版 | 1672×941 | `7120ba1e7e0b2bf7a2a85c600c8e771d17ded6f32344e85e9dd74fb0f29b4267` |
| `assets/media/new-path-north-breakthrough-round2.jpg` | 北部攻坚Round 2投稿版 | 1672×941 | `c43e7562da97485ea238fb7583f6f1bec7df1dabadb78d4e921bfb0c9ae6b4b8` |
| `assets/media/new-path-middle-start.jpg` | 中部起步投稿版 | 1672×941 | `a8bcd6d12d9987d96d4a385feb72d40fd63da09d0dcaf8660cb1618494a7a82c` |
| `assets/media/new-path-south-enter-city.jpg` | 南部入城投稿版 | 1672×941 | `cec708213e018e42f0e7202616ac681b8a8111a66c494f8876cef4232070f825` |

无损PNG母稿与北部Round 1留档保存在项目设计档案 `03_design/effect_images_v1/source_png/`，不重复进入40 MiB投稿包；Round 1/2独立视觉审查报告保存在相邻 `reviews/`。

## 2. 最终提示词

### M-01 总体鸟瞰

```text
Use case: stylized-concept
Asset type: A0 board and A3 booklet hero image for an urban design open-call proposal
Primary request: Create a wide, highly realistic architectural concept aerial of “Jing-Zhang: A New Path for Innovation” in northwestern Beijing: a long, continuous urban innovation belt anchored by an existing rail-heritage park and blue-green public landscape, connecting three equal but visibly different urban districts rather than forming a one-way pipeline.
Scene/backdrop: Contemporary Beijing city fabric at late afternoon, seen from a high oblique aerial view. A continuous accessible walking and cycling landscape threads north–south through real urban density. The north reads as garden-like research courtyards with discreet controlled professional facilities; the middle reads as near-university small blocks, adaptable ground floors and community/talent life; the south reads as a station-facing civic foyer, active mixed-use ground floors and client/service spaces. East–west pedestrian seams cross the belt at multiple points. Both ordinary public life and innovation are present.
Subject: People of different ages walking, resting, commuting, meeting and working; restrained service technology; a few small autonomous devices only in clearly separated controlled zones; open public foyers, shaded trees, rain gardens, heritage-industrial materials, modest waymarks, human service desks.
Style/medium: Competition-grade photorealistic architectural visualization, natural Beijing urbanism, believable materials and scale, not science-fiction, not a theme park.
Composition/framing: 16:9 cinematic wide aerial, the continuous public foundation is the main visual subject; three district characters are distinguishable without labels; no single monumental center; multiple cross-connections visible; generous foreground-to-horizon depth.
Lighting/mood: Warm late-afternoon sun, clear air after rain, calm but active, optimistic and civic rather than corporate.
Color palette: Deep graphite structures, paper-white civic surfaces, turquoise-green landscape, small wayfinding-orange and connection-blue accents.
Materials/textures: Mature trees, permeable paving, brick, weathered steel, glass used with restraint, visible maintenance joints, reused rail-era structural cues without copying a train shape.
Constraints: Ordinary public space must remain usable without technology; accessibility visible; professional testing spatially separated from public paths; no false precision of an official masterplan; concept image only.
Avoid: no text, no readable signage, no logos, no watermark, no giant screens, no neon cyberpunk, no flying cars, no humanoid robot crowd, no sealed campus, no giant monument, no highway-dominated scene, no railway-shaped architecture, no exact identifiable existing landmark.
```

### M-02 北部攻坚

```text
Use case: stylized-concept
Asset type: A0 board and A3 booklet key-area rendering, visually consistent with the immediately preceding overall aerial
Primary request: Create a competition-grade photorealistic architectural visualization of the NORTHERN “BREAKTHROUGH” area of Jing-Zhang: A New Path for Innovation: a garden-like research district that turns high-threshold AI capability into shared professional capability without becoming a sealed campus.
Scene/backdrop: Contemporary Beijing R&D courtyard district beside a mature blue-green rail-heritage landscape. The view is at human eye level from a generous public foyer looking through a planted collaboration courtyard toward discreet controlled professional facilities.
Subject: Foreground public P space with shaded seating, an accessible route, a staffed bilingual human service/resource desk with no readable text, researchers and residents meeting casually; middle T space as a visibly bounded, bookable collaboration courtyard; background C space as architecturally controlled laboratories and a separated repair/logistics route. A small contained robotics testing activity occurs only behind a clear controlled threshold. Mature trees, rain garden, open research foyer, maintenance access, visible but restrained safety boundaries.
Style/medium: Highly realistic architectural visualization, natural Beijing materials and vegetation, precise but not futuristic, visually related to the overall aerial.
Composition/framing: 16:9 wide, three-depth spatial gradient P foreground → T middle → C background is unmistakable without diagram labels; the public path remains continuous and dominant; controlled logistics approaches from the side and never crosses public seating or accessible movement.
Lighting/mood: Morning light through trees, serious, open, calm, intellectually active.
Color palette: Deep graphite, warm brick, paper white, turquoise-green planting, small orange and blue wayfinding accents.
Materials/textures: Reused brick and weathered steel, timber, permeable stone, glass with restraint, visible repairable joints, garden courtyards.
Constraints: Human scale; professional test activity spatially separated; ordinary public space works without technology; accessible movement visible; no confidential content visible.
Avoid: no text, no readable signage, no logo, no watermark, no giant screen, no neon cyberpunk, no humanoid robot crowd, no sealed gates dominating foreground, no science-fiction laboratory, no railway-shaped building, no monumental object.
```

### M-02-R2 北部攻坚定向修订

```text
Edit this existing architectural concept image while preserving the same camera, warm late-afternoon light, mature trees, inclusive public forecourt, people, wheelchair user, architecture, and the clearly separated service/logistics lane on the far right. Make the public-to-professional access gradient legible through architecture alone, without adding any letters, labels, signs, logos, or graphic overlays. Keep the foreground completely open as an everyday public garden and cafe terrace. In the middle distance, create a clearly bookable transitional collaboration court: a subtle change in paving, a low permeable threshold, and one visible open portal that reads as controlled but welcoming. Behind that, place the professional research zone as a distinct background layer behind a second transparent controlled boundary, with glazed labs/workshops and a small amount of credible technical activity visible inside. The three layers must read spatially as open public foreground, bookable transition court, and controlled professional background, while remaining part of one continuous campus. Preserve the independent logistics route and do not route freight through the public forecourt. Photorealistic architectural visualization, natural Beijing urban renewal atmosphere, no sci-fi spectacle, no prominent screens, no text, no watermark.
```

### M-03 中部起步

```text
Use case: stylized-concept
Asset type: A0 board and A3 booklet key-area rendering, visually consistent with the two immediately preceding Jing-Zhang New Path images
Primary request: Create a competition-grade photorealistic architectural visualization of the MIDDLE “START” area: a near-university urban community of small affordable work units, adaptable ground floors, everyday neighborhood life, and low-threshold entry to innovation—without turning residents into test subjects.
Scene/backdrop: A Beijing mixed university–community edge. A shaded pedestrian lane and small civic square connect campus-side workspaces, neighborhood shops, community rooms, affordable small studios and upper-floor housing.
Subject: Foreground public P space with residents, older adults, children, students and founders sharing ordinary seating, food, errands and conversation; a clearly staffed human resource/service desk and paper notice surface with no readable text; midground bookable T collaboration rooms and flexible ground floors visible through openable façades; no permanent C laboratory in the district. A discreet visual connection points toward off-site controlled professional capability, but professional testing is not present in daily public space. Include an obvious quiet/no-tech corner and a fully accessible path.
Style/medium: Highly realistic architectural visualization, believable Beijing urban renewal, warm and lived-in, sophisticated but not luxury branding, consistent materials with the overall aerial and northern image.
Composition/framing: 16:9 wide at eye level from the civic square; interconnected small blocks and multiple doorways are the main spatial idea; ordinary life dominates foreground, collaborative work is visible but optional in the middle ground.
Lighting/mood: Soft early-evening golden light, welcoming, diverse, practical, energetic but not noisy.
Color palette: Warm brick, paper white, deep graphite, turquoise landscape, restrained orange and connection-blue details.
Materials/textures: Reused brick, timber, simple metal frames, permeable paving, street trees, awnings, movable furniture, repairable ground-floor modules.
Constraints: Residents are not default test users; public service works with a person and without a phone; no permanent professional C facility; affordable and adaptable spatial character; accessibility visible.
Avoid: no text, no readable signage, no logo, no watermark, no giant digital screen, no cyberpunk, no robot spectacle, no luxury tech campus, no shopping mall atrium, no monumental sculpture, no surveillance aesthetic, no railway-shaped building.
```

### M-04 南部入城

```text
Use case: stylized-concept
Asset type: A0 board and A3 booklet key-area rendering, visually consistent with the preceding Jing-Zhang New Path image set
Primary request: Create a competition-grade photorealistic architectural visualization of the SOUTHERN “ENTER THE CITY” area: a station-facing civic foyer and active mixed-use ground-floor network where mature AI capability meets clients, training, after-sales service and ordinary city life—without becoming a sealed showroom.
Scene/backdrop: A contemporary Beijing urban station district at blue hour, with a transit entrance at one side, a generous sheltered civic foyer, mixed commercial/cultural ground floors, a public square and streets that connect in several directions.
Subject: Ordinary commuters, families, older adults, visitors, founders and client teams share the same accessible public P route and non-commercial seating. A staffed human city-service and resource counter is clearly visible without readable text. Bookable T client collaboration and training rooms open onto the foyer through transparent but bounded façades. AI-native products appear only as modest useful services within normal shops and public service settings, with people and ordinary non-digital alternatives present. High-risk professional testing is absent; any controlled capability is remotely accessed, not placed in the public foyer. Include a public feedback/repair desk and an international welcome function without flags or branding.
Style/medium: Highly realistic architectural visualization, believable Beijing station-area renewal, civic and metropolitan, active but not spectacular, visually consistent with the aerial, northern and middle scenes.
Composition/framing: 16:9 wide at eye level, station threshold at left, civic foyer center, ground-floor client/service spaces to right, multiple pedestrian paths crossing rather than a single procession. Public life dominates; innovation is embedded in useful services.
Lighting/mood: Early evening blue hour with warm interior light, safe, legible, metropolitan, welcoming, calm energy.
Color palette: Deep graphite, warm brick, paper white, turquoise planting, restrained orange and connection-blue details.
Materials/textures: Durable stone, brick, weathered steel, timber soffits, clear glass, sheltered arcades, repairable modular storefronts, rain gardens and mature trees.
Constraints: Public passage never requires participation or purchase; clear human/low-tech alternatives; accessible route and seating; customer collaboration is optional and bounded; no permanent C professional test facility in public space.
Avoid: no text, no readable signage, no logo, no watermark, no giant screen, no product expo hall, no cyberpunk neon, no robot spectacle, no luxury mall, no monumental AI sculpture, no surveillance aesthetic, no railway-shaped architecture, no sealed campus.
```

## 3. 视觉审查门槛

- 总体图能读出连续公共底盘和多点缝合，但不应被理解为官方总图或真实现场鸟瞰。
- 北/中/南三图仅凭空间与人物活动即可区分“攻坚 / 起步 / 入城”。
- 公共生活是主角；AI不应只靠机器人、屏幕或炫技装置被识别。
- 北部可见专业能力与公共路径分离；中部和南部不出现常设高风险专业C测试。
- 中部居民不被呈现为测试对象；南部不应被理解为封闭展厅或纯消费商业。
- 四图不得出现可读伪文字、品牌、Logo、水印、明显人体错误或会改变叙事的空间冲突。
- 作为概念图使用时，图注必须同步披露AI辅助与非证据身份。

## 4. 正式版面使用上限

四张图原生长边均为1672 px，不作为A0大幅主图。正式排版以任务书图件和可编辑SVG为主，效果图只作为辅助场景窗。

| 载体 | 图像最大显示宽度 | 长边有效分辨率 | 使用角色 |
|---|---:|---:|---|
| A3手册 | 280 mm | 约152 ppi | 单页辅助场景图 |
| A0展板 | 280 mm | 约152 ppi | 辅助场景窗，不作主图 |
| 1440 px网页 | 不超过原图宽度 | 原生或缩小 | 可见披露随图出现 |
| 320 px缩略 | 320 px | 缩小显示 | 仅检查主结构，不作为正文唯一载体 |

总体鸟瞰随图使用强化披露：该图是总体关系的场景拼合，不对应精确地块、建筑形态或实施方案。北部Round 2图替代Round 1进入正文与排版；Round 1只保留作审查追踪。
