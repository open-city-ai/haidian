const fs = require('fs');
const path = require('path');

const visualDir = path.resolve(__dirname, '..');

function section(language) {
  if (language === 'en') {
    return '<section id="22" class="evidence taskbook-delivery"><div class="section-head"><span class="section-no">23</span><h2>Six-task conceptual delivery: one visible output per task</h2><span class="tag">CONCEPT · NO COMMITMENT</span></div><p>Three positions, five functions, three areas plus two wings, six global mechanisms, eight resources, five unconfirmed regional interfaces, three responsibility landmarks, commute culture and four-season operations form one reviewable taskbook atlas.</p><img src="../assets/figures/commute-taskbook-delivery.en.svg" alt="Commute Commons taskbook delivery atlas"><div class="micro">commute-taskbook-delivery.json · six source-bounded cases · all partnerships, siting and events unconfirmed</div></section><section id="23" class="evidence p0-evidence"><div class="section-head"><span class="section-no">24</span><h2>Minimum P0 evidence: zero field records means HOLD</h2><span class="tag">NOT AUTHORISED · NOT RUN</span></div><p>Four windows and seven evidence streams are ready, but five responsible roles remain unassigned and all five release gates remain on HOLD. No average may turn an unknown group into zero.</p><img src="../assets/figures/commute-p0-pilot.en.svg" alt="Minimum P0 evidence pack with zero field records"><div class="micro">commute-p0-pilot-evidence-pack.json · participant-controlled protocol · no personal traces</div></section>';
  }
  return '<section id="22" class="evidence taskbook-delivery"><div class="section-head"><span class="section-no">23</span><h2>六项任务概念交付：每项都有独立可见产出</h2><span class="tag">概念 · 未承诺</span></div><p>3 个定位、5 项功能、3 区 2 翼、6 个全球机制、8 类资源、5 个未确认区域接口、3 个责任地标、通勤文化和四季运营共同组成一张可复核的任务书图谱。</p><img src="../assets/figures/commute-taskbook-delivery.svg" alt="通勤共益公地任务书交付图谱"><div class="micro">commute-taskbook-delivery.json · 六个案例均有来源边界 · 合作、落位与活动全部未确认</div></section><section id="23" class="evidence p0-evidence"><div class="section-head"><span class="section-no">24</span><h2>最小 P0 证据：0 条现场记录就保持 HOLD</h2><span class="tag">未授权 · 未运行</span></div><p>4 个窗口和 7 条证据流模板已就绪，但 5 类责任角色仍未指派，5 道放行门全部保持 HOLD；不能用平均值把未知群体写成 0。</p><img src="../assets/figures/commute-p0-pilot.svg" alt="当前零条现场记录的最小 P0 证据包"><div class="micro">commute-p0-pilot-evidence-pack.json · 参与者控制协议 · 无个人连续轨迹</div></section>';
}

for (const [file, language] of [['index.html', 'zh'], ['index.en.html', 'en']]) {
  const target = path.join(visualDir, file);
  let html = fs.readFileSync(target, 'utf8');
  html = html.replace(/<section id="22" class="evidence taskbook-delivery">.*?<\/section><section id="23" class="evidence p0-evidence">.*?<\/section>/s, '');
  html = html.replace(/<a href="#22">.*?<\/a><a href="#23">.*?<\/a>/s, '');
  const nav = language === 'en'
    ? '<a href="#22">Taskbook delivery</a><a href="#23">Minimum P0 evidence</a>'
    : '<a href="#22">任务书交付</a><a href="#23">最小 P0 证据</a>';
  if (html.includes('</nav>')) html = html.replace('</nav>', `${nav}</nav>`);
  if (!html.includes('</main>')) throw new Error(`${file}: missing </main>`);
  html = html.replace('</main>', `${section(language)}</main>`);
  fs.writeFileSync(target, html);
}

console.log('COMMUTE_TASKBOOK_INDEX_PASS');
