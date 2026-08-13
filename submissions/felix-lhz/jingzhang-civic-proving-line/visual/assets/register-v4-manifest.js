const fs=require('fs'),path=require('path'),crypto=require('crypto');
const root=path.resolve(__dirname,'..','..'),file=path.join(root,'manifest.json');
const manifest=JSON.parse(fs.readFileSync(file,'utf8'));
const entries=[];
for(const code of ['t2','s2','s7'])for(const kind of ['detail','section'])for(const lang of ['zh','en'])entries.push({path:`assets/figures/hero-${code}-${kind}${lang==='en'?'.en':''}.png`,role:'proposal_figure',required:true,language:lang,...(lang==='en'?{translation_of:`assets/figures/hero-${code}-${kind}.png`}:{})});
entries.push(
  {path:'visual/assets/build-v4.js',role:'verification_script',required:false,language:'neutral'},
  {path:'visual/assets/embed-v4-html.js',role:'verification_script',required:false,language:'neutral'},
  {path:'visual/assets/enrich-v4-data.js',role:'verification_script',required:false,language:'neutral'},
  {path:'visual/assets/internal-v4-rubric.json',role:'evidence_data',required:false,language:'neutral'},
  {path:'visual/assets/register-v4-manifest.js',role:'verification_script',required:false,language:'neutral'}
);
for(const entry of entries){const existing=manifest.files.find(x=>x.path===entry.path);const target=existing||entry;Object.assign(target,entry);target.sha256=target.sha256||'pending';if(!existing)manifest.files.push(target)}
manifest.files.sort((a,b)=>a.path.localeCompare(b.path));
manifest.generated_at='2026-08-13T07:30:00Z';
fs.writeFileSync(file,JSON.stringify(manifest,null,2)+'\n');
console.log(`registered ${entries.length} V4 files`);
