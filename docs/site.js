(()=>{
'use strict';
const data=window.WIKI_DATA, conceptLinks=document.getElementById('concept-links'), sourceLinks=document.getElementById('source-links'), article=document.getElementById('wiki-article'), search=document.getElementById('wiki-search');
if(!data||!article){throw new Error('Wiki data not found');}
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const byConcept=Object.fromEntries(data.concepts.map(x=>[x.id,x]));
const bySource=Object.fromEntries(data.sources.map(x=>[x.id,x]));
function renderNavigation(){
 const q=search.value.toLowerCase().trim();
 const matches=x=>[x.title,x.lead,x.summary,x.id,...(x.tags||[]),...(x.content||[])].filter(Boolean).join(' ').toLowerCase().includes(q);
 conceptLinks.innerHTML=data.concepts.filter(matches).map(x=>`<a class="toc-link" data-target="concept-${esc(x.id)}" href="#concept-${esc(x.id)}">${esc(x.title)}</a>`).join('')||'<p class="smallnote">沒有符合的概念</p>';
 sourceLinks.innerHTML=data.sources.filter(matches).map(x=>`<a class="toc-link" data-target="source-${esc(x.id)}" href="#source-${esc(x.id)}"><b>${esc(x.id)}</b> · ${esc(x.title)}</a>`).join('')||'<p class="smallnote">沒有符合的來源</p>';
 const key=(location.hash||'#concept-llm').slice(1);
 document.querySelectorAll('.toc-link').forEach(a=>a.classList.toggle('active',a.dataset.target===key));
 document.getElementById('concept-count').textContent=String(data.concepts.filter(matches).length).padStart(2,'0');
 document.getElementById('source-count').textContent=String(data.sources.filter(matches).length).padStart(2,'0');
}
function sourceReferences(ids){return `<div class="ref-list">${ids.map(id=>{const s=bySource[id];return s?`<a class="ref-link" href="#source-${esc(id)}"><strong>[${esc(id)}]</strong> ${esc(s.title)} <span class="muted">(${esc(s.year)})</span> →</a>`:''}).join('')}</div>`;}
function render(){
 const hash=decodeURIComponent((location.hash||'#concept-llm').slice(1));
 if(hash.startsWith('source-')){
  const src=bySource[hash.slice(7)];if(!src){location.hash='#concept-llm';return;}
  article.innerHTML=`<div class="kicker">${esc(src.id)} / SOURCE INGEST RECORD</div><h1>${esc(src.title)}</h1><p class="lead">${esc(src.summary)}</p><div class="source-meta"><span>${esc(src.type)}</span><span>${esc(src.year)}</span><span>${esc(src.authors)}</span></div><h2>已核對的關鍵重點</h2><ul>${src.findings.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><h2>使用限制／誤用風險</h2><div class="example">${esc(src.caution)}</div><h2>關聯 Wiki 條目</h2><div class="backlinks">${src.related.map(id=>{const c=byConcept[id];return c?`<a class="chip-link" href="#concept-${esc(id)}">${esc(c.title)}</a>`:''}).join('')}</div><h2>原始資料</h2><p><a class="btn ghost" href="${esc(src.url)}" target="_blank" rel="noopener noreferrer">開啟原始來源 ↗</a></p><p class="smallnote">本專案保存摘要層級 ingest 紀錄，非全文儲存或自動下載論文。</p>`;
 }else{
  const c=byConcept[hash.startsWith('concept-')?hash.slice(8):'llm'];if(!c){location.hash='#concept-llm';return;}
  article.innerHTML=`<div class="kicker">${esc(c.tag)} / KNOWLEDGE NOTE</div><h1>${esc(c.title)}</h1><p class="lead">${esc(c.lead)}</p><h2>核心概念</h2>${c.content.map(x=>`<p>${esc(x)}</p>`).join('')}<h2>初學者例子</h2><div class="example">${esc(c.example)}</div><h2>可追溯來源</h2>${sourceReferences(c.sourceIds)}<h2>相關知識連結</h2><div class="backlinks">${c.related.map(id=>{const x=byConcept[id];return x?`<a class="chip-link" href="#concept-${esc(id)}">${esc(x.title)}</a>`:''}).join('')}</div>`;
 }
 renderNavigation();
}
window.addEventListener('hashchange',render);
search.addEventListener('input',renderNavigation);
render();
})();
