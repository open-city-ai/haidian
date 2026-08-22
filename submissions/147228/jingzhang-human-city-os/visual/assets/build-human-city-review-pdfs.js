#!/usr/bin/env node
'use strict';

const fs=require('fs');
const path=require('path');
const sharp=require(process.env.HUMAN_CITY_SHARP_MODULE||'sharp');
const {PDFDocument,StandardFonts,rgb}=require(process.env.HUMAN_CITY_PDF_LIB_MODULE||'pdf-lib');
const root=path.resolve(__dirname,'..','..'),figures=path.join(root,'assets','figures'),drawings=path.join(root,'drawings');
const storyboard=[
 ['B01','brand-identity','png'],['B02','brief-alignment-atlas','png'],['B03','city-api-sequence-v23','png'],['B04','data-readiness','png'],
 ['B05','human-city-acceptance-atlas','png'],['B06','human-machine-interface-section','png'],['B07','key-areas','png'],['B08','land-use-structure','png'],
 ['B09','metrics-evidence','png'],['B10','mobility-bluegreen','png'],['B11','parametric-tradeoff-study','png'],['B12','public-culture-operations-atlas','png'],
 ['B13','public-space-operations-v25','png'],['B14','regional-interface-ledger','png'],['B15','release-gates','png'],['B16','reviewer-navigation','png'],
 ['B17','reviewer-scorecard-map','png'],['B18','site-overview','png'],['B19','spatial-action-atlas','png'],['B20','spatial-action-rooms-v21','png'],
 ['B21','human-city-spatial-decision','svg'],['B22','human-city-seb-crosswalk','svg'],['B23','human-city-pilot-node-dossier','png'],['B24','human-city-pilot-delivery-receipt','png']
];
const sizes={A3:[1190.551,841.89],A0:[3370.394,2383.937]};
async function image(stem,ext,lang){const suffix=lang==='zh'?'':'.en',source=path.join(figures,`${stem}${suffix}.${ext}`);if(!fs.existsSync(source))throw new Error(`Missing board: ${source}`);return ext==='png'?fs.readFileSync(source):sharp(source,{density:180}).resize({width:2400,height:1350,fit:'contain',background:'#f4f1e8'}).png({compressionLevel:9}).toBuffer();}
async function build(output,size,lang){const pdf=await PDFDocument.create(),font=await pdf.embedFont(StandardFonts.Helvetica),[pw,ph]=size,margin=Math.min(pw,ph)*0.032;pdf.setTitle('Jing-Zhang Human City OS v3.0 canonical review storyboard');pdf.setAuthor('147228 / Codex');pdf.setSubject('Twenty-four page-identical bilingual review boards; design targets only; HOLD');for(const [index,[id,stem,ext]] of storyboard.entries()){const png=await image(stem,ext,lang),im=await pdf.embedPng(png),scale=Math.min((pw-margin*2)/im.width,(ph-margin*2)/im.height),w=im.width*scale,h=im.height*scale,page=pdf.addPage(size);page.drawRectangle({x:0,y:0,width:pw,height:ph,color:rgb(16/255,35/255,63/255)});page.drawImage(im,{x:(pw-w)/2,y:(ph-h)/2,width:w,height:h});const footer=`V3.0  ${id}  ${index+1}/${storyboard.length}  ${lang.toUpperCase()}  HOLD`,fsz=Math.max(7,Math.min(pw,ph)*0.0085),fw=font.widthOfTextAtSize(footer,fsz);page.drawText(footer,{x:pw-margin-fw,y:margin*.3,size:fsz,font,color:rgb(.66,.75,.82)});}fs.mkdirSync(drawings,{recursive:true});fs.writeFileSync(path.join(drawings,output),await pdf.save({useObjectStreams:true}));process.stdout.write(`${path.relative(root,path.join(drawings,output))}\n`);}
async function main(){
  const specs=[
    ['a3-booklet.pdf',sizes.A3,'zh'],
    ['a3-booklet.en.pdf',sizes.A3,'en'],
    ['a0-boards.pdf',sizes.A0,'zh'],
    ['a0-boards.en.pdf',sizes.A0,'en']
  ];
  for(const spec of specs)await build(...spec);
  const documents=specs.map(([file,size,language])=>({
    path:`drawings/${file}`,
    language,
    page_count:storyboard.length,
    page_size_points:size,
    orientation:'landscape',
    bytes:fs.statSync(path.join(drawings,file)).size
  }));
  const record={
    schema_version:'1.0.0',
    status:'canonical_storyboard_generated',
    iteration:'v3.0',
    board_ids:storyboard.map(([id])=>id),
    page_count_each:storyboard.length,
    orientation:'landscape',
    order_identical:true,
    source_board_pairs:storyboard.length,
    documents,
    manual_visual_review:process.env.HUMAN_CITY_MANUAL_VISUAL_REVIEW||'pending_after_generation',
    boundary:'Page parity proves jury-visible equivalence only; it is not field evidence, accessibility certification or an official score.'
  };
  fs.writeFileSync(path.join(__dirname,'human-city-pdf-equivalence-record.json'),`${JSON.stringify(record,null,2)}\n`);
}
main().catch((e)=>{console.error(e);process.exitCode=1;});
