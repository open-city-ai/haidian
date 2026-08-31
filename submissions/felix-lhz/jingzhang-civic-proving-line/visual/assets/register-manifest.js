const fs=require('fs');
const path=require('path');
const crypto=require('crypto');
const ROOT=path.resolve(__dirname,'..','..');
const file=path.join(ROOT,'manifest.json');
const manifest=JSON.parse(fs.readFileSync(file,'utf8'));
const sha=rel=>crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT,rel))).digest('hex');

manifest.files=manifest.files.filter(item=>fs.existsSync(path.join(ROOT,item.path)));
for(const item of manifest.files){
  if(item.path==='manifest.json')delete item.sha256;
  else item.sha256=sha(item.path);
}

const entries=[
  ['visual/assets/prototype-model.json','evidence_data',true,'neutral'],
  ['visual/assets/content.js','verification_script',false,'neutral'],
  ['visual/assets/build.js','verification_script',false,'neutral'],
  ['visual/assets/build-html.js','verification_script',false,'neutral'],
  ['visual/assets/build-font.js','verification_script',false,'neutral'],
  ['visual/assets/font-render-qa.js','verification_script',false,'neutral'],
  ['visual/assets/qa.js','verification_script',false,'neutral'],
  ['visual/assets/semantic-qa-v13.js','verification_script',false,'neutral'],
  ['visual/assets/register-manifest.js','verification_script',false,'neutral'],
  ['visual/assets/font-bundle.json','asset',true,'neutral'],
  ['visual/assets/font-metadata.json','evidence_data',true,'neutral'],
  ['visual/assets/font-glyphs.json','evidence_data',true,'neutral'],
  ['visual/assets/font-license.json','copyright_statement',true,'neutral'],
  ['assets/media/verification-ring-v15.webp','media_poster',false,'neutral'],
  ['assets/media/verification-ring-v15.jpg','media_poster',false,'neutral'],
  ['assets/media/translation-gate-v15.webp','media_poster',false,'neutral'],
  ['assets/media/translation-gate-v15.jpg','media_poster',false,'neutral'],
  ['assets/media/receipt-porch-v15.webp','media_poster',false,'neutral'],
  ['assets/media/receipt-porch-v15.jpg','media_poster',false,'neutral'],
  ['assets/media/receipt-porch-v17-day.webp','media_poster',false,'neutral'],
  ['assets/media/receipt-porch-v17-day.jpg','media_poster',false,'neutral'],
  ['assets/media/receipt-porch-v17-night.webp','media_poster',false,'neutral'],
  ['assets/media/receipt-porch-v17-night.jpg','media_poster',false,'neutral'],
  ['assets/figures/jury-summary.png','proposal_figure',false,'zh'],
  ['assets/figures/jury-summary.en.png','proposal_figure',false,'en']
];
for(const [rel,role,required,language] of entries){
  if(!fs.existsSync(path.join(ROOT,rel)))throw new Error('Cannot register missing V17 file: '+rel);
  manifest.files=manifest.files.filter(item=>item.path!==rel);
  const entry={path:rel,role,required,language,sha256:sha(rel)};
  if(rel==='assets/figures/jury-summary.en.png')entry.translation_of='assets/figures/jury-summary.png';
  manifest.files.push(entry);
}
manifest.files.sort((a,b)=>a.path.localeCompare(b.path));
fs.writeFileSync(file,JSON.stringify(manifest,null,2)+'\n');
console.log('V17.2 canonical files registered: '+manifest.files.length);
