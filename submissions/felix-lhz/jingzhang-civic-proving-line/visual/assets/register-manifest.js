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
  ['visual/assets/qa.js','verification_script',false,'neutral'],
  ['visual/assets/semantic-qa-v13.js','verification_script',false,'neutral'],
  ['visual/assets/register-manifest.js','verification_script',false,'neutral'],
  ['visual/assets/app.js','verification_script',false,'neutral'],
  ['visual/assets/styles.css','verification_script',false,'neutral'],
  ['assets/media/verification-ring-v15.webp','media_poster',false,'neutral'],
  ['assets/media/verification-ring-v15.jpg','media_poster',false,'neutral'],
  ['assets/media/translation-gate-v15.webp','media_poster',false,'neutral'],
  ['assets/media/translation-gate-v15.jpg','media_poster',false,'neutral'],
  ['assets/media/receipt-porch-v15.webp','media_poster',false,'neutral'],
  ['assets/media/receipt-porch-v15.jpg','media_poster',false,'neutral']
];
for(const [rel,role,required,language] of entries){
  if(!fs.existsSync(path.join(ROOT,rel)))throw new Error('Cannot register missing V16 file: '+rel);
  manifest.files=manifest.files.filter(item=>item.path!==rel);
  manifest.files.push({path:rel,role,required,language,sha256:sha(rel)});
}
manifest.files.sort((a,b)=>a.path.localeCompare(b.path));
fs.writeFileSync(file,JSON.stringify(manifest,null,2)+'\n');
console.log('V16 canonical files registered: '+manifest.files.length);
