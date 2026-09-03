const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const section = (english) => english
  ? '<section id="21" class="evidence commute-spatial-decision"><div class="section-head"><span class="section-no">22</span><h2>Spatial decision: protect the public return before dispatch</h2><span class="tag">HOLD / NOT FIELD-RUN</span></div><p>Three alternatives are compared before efficiency: enterprise-first booked curb is rejected, independent feeder windows require revision, and a public spine with a reversible curb window advances only to design review.</p><img src="../assets/figures/commute-spatial-decision.en.svg" alt="Spatial decision: three alternatives, five scales, three nodes and five public rights"><div class="micro">visual/assets/commute-spatial-decision.json · provisional · authorization 0 · field claims 0</div></section>'
  : '<section id="21" class="evidence commute-spatial-decision"><div class="section-head"><span class="section-no">22</span><h2>一次空间裁决：先保护公共回程，再决定如何调度</h2><span class="tag">HOLD / 未现场运行</span></div><p>先比较三种空间替代方案，再谈效率：企业优先预约路缘被拒绝，独立接驳窗口需要修订，公共脊加可逆路缘窗口仅进入专业深化。</p><img src="../assets/figures/commute-spatial-decision.svg" alt="一次空间裁决：三种替代、五级尺度、三个节点与五项公共权利"><div class="micro">visual/assets/commute-spatial-decision.json · provisional · authorization 0 · field claims 0</div></section>';

function update(file, english) {
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/<section id="21" class="evidence commute-spatial-decision">.*?<\/section>/s, '');
  if (!html.includes('href="#21"')) {
    html = html.replace('</nav>', `<a href="#21">${english ? 'Spatial decision' : '空间裁决'}</a></nav>`);
  }
  const block = section(english);
  if (!html.includes('</main>')) throw new Error(`missing main in ${file}`);
  html = html.replace('</main>', `${block}</main>`);
  fs.writeFileSync(file, html);
}

update(path.join(root, 'index.html'), false);
update(path.join(root, 'index.en.html'), true);
console.log(JSON.stringify({ status: 'PASS', visual_index: ['visual/index.html', 'visual/index.en.html'], section_id: 21 }, null, 2));
