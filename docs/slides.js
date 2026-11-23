(()=>{
'use strict';
const slides=window.WIKI_DATA?.slides, bySource=Object.fromEntries((window.WIKI_DATA?.sources||[]).map(x=>[x.id,x]));
if(!slides)throw new Error('Slides data not found');
const stage=document.getElementById('slide-stage'), prev=document.getElementById('prev-slide'),next=document.getElementById('next-slide'),num=document.getElementById('slide-num'),total=document.getElementById('slide-total'),progress=document.getElementById('slide-progress');
let current=0,selected=null;
const e=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const points=a=>`<div class="big-list">${(a||[]).map(t=>`<div>${e(t)}</div>`).join('')}</div>`;
const sourceBar=s=>`<div class="sources"><small>本頁參考來源</small>${s.sources.map(id=>`<a title="${e(bySource[id]?.title||id)}" href="wiki.html#source-${e(id)}" target="_blank" rel="noopener">${e(id)}</a>`).join('')}<a href="wiki.html#concept-${e(s.wiki)}" target="_blank" rel="noopener">Wiki ↗</a></div>`;
const panel=(title,items)=>`<div class="contrast"><h3>${e(title)}</h3><ul>${items.map(x=>`<li>${e(x)}</li>`).join('')}</ul></div>`;
const boxes=s=>`<div class="card3">${s.cards.map(x=>`<div class="cardi"><b>${e(x[0])}</b><h3>${e(x[1])}</h3><p>${e(x[2]||'')}</p></div>`).join('')}</div>`;
const flow=steps=>`<div class="diagram">${steps.map((x,i)=>`<div class="step">${e(x)}</div>${i<steps.length-1?'<div class="arrow">→</div>':''}`).join('')}</div>`;
function visual(s){switch(s.type){
case 'cover':return `<div style="max-width:1000px"><div class="kicker" style="font-size:1rem;letter-spacing:.2em">每一個答案，都應該有根據</div><h1 style="margin-top:15px">從 <span class="hero-accent">LLM</span><br>到 <span class="hero-accent">RAG</span></h1><p class="subtitle" style="font-size:clamp(1.25rem,2vw,1.7rem)">${e(s.subtitle)}</p><div class="pillrow">${s.points.map(p=>`<span class="pill">${e(p)}</span>`).join('')}</div></div>`;
case 'goals':return points(s.points);
case 'split':case 'wiki':return `<div class="cols">${panel(s.leftTitle,s.left)}${panel(s.rightTitle,s.right)}</div>`;
case 'attention':return `<div class="attn"><div class="tokens"><span>模型</span><span>注意力</span><span>上下文</span></div><div class="mid">→</div><div class="text">以注意力機制處理字詞之間的關聯，而不是搜尋即時資料庫。</div></div><div style="margin-top:28px">${points(s.points)}</div>`;
case 'problem':return `<div class="focus-question">${e(s.question)}</div><div class="example-row"><div class="quote-panel bad"><span>ONLY LLM / 可能用舊資訊</span><p>${e(s.before)}</p></div><div class="quote-panel good"><span>WITH RETRIEVAL / 先查再答</span><p>${e(s.after)}</p></div></div>`;
case 'pipeline':case 'wiki-pipeline':return `${flow(s.steps)}<p class="smallnote">${s.type==='pipeline'?'流程圖是初學者版的常見 RAG 實作思路，不代表所有 RAG 系統都固定如此。':'資料由 raw/ 匯入 wiki/，教學內容及引用映射由 knowledge/ 管理，產出至 docs/。'}</p>`;
case 'example':return `<div class="focus-question">${e(s.question)}</div><div class="example-flow"><div class="item"><b>01 / 檢索</b>${e(s.context)}</div><div class="item"><b>02 / 生成</b>${e(s.response)}</div><div class="item"><b>03 / 檢查</b>${e(s.check)}</div></div>`;
case 'risks':case 'metrics':return boxes(s);
case 'context':return `<div class="context-line"><div><small>開頭</small>較容易找到</div><div><small>中間</small>可能較難</div><div><small>結尾</small>較容易找到</div></div>${points(s.points)}`;
case 'quiz':return `<div class="focus-question">${e(s.question)}</div><div class="quiz-options">${s.options.map((option,i)=>`<button type="button" class="${selected===i?(i===s.answer?'right':'wrong'):''}" data-quiz-index="${i}" aria-pressed="${selected===i}">${e(option)}</button>`).join('')}</div>${selected!==null?`<div class="quiz-result ${selected===s.answer?'':'error'}">${selected===s.answer?'✓ 答對了！':'再想想：'} ${e(s.explanation.replace('答對了！',''))}</div>`:''}`;
case 'finish':return `${points(s.points)}<div class="pillrow"><a class="pill" href="wiki.html">↗ 看 7 篇 Wiki 主題</a><a class="pill" href="workflow.html">↗ 看 Loop / Graph 與紀錄</a></div>`;
default:return points(s.points||[]);
}}
function render(){
 const s=slides[current];
 const isCover=s.type==='cover';
 stage.innerHTML=`<section class="slide" aria-label="投影片 ${current+1}：${e(s.title)}"><div class="eyebrow">${e(s.eyebrow)}</div>${isCover?'':`<h2>${e(s.title)}</h2><p class="subtitle">${e(s.subtitle||'')}</p>`}${visual(s)}${s.footnote?`<p class="subtle-note">${e(s.footnote)}</p>`:''}${sourceBar(s)}</section>`;
 num.textContent=String(current+1).padStart(2,'0');total.textContent=String(slides.length).padStart(2,'0');
 prev.disabled=current===0;next.disabled=current===slides.length-1;
 progress.innerHTML=slides.map((_,i)=>`<button class="progress-dot ${i===current?'active':(i<current?'seen':'')}" data-slide-index="${i}" title="跳至第 ${i+1} 頁" aria-label="跳至第 ${i+1} 頁" aria-current="${i===current?'step':'false'}"></button>`).join('');
 progress.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>jump(Number(btn.dataset.slideIndex))));
 stage.querySelectorAll('[data-quiz-index]').forEach(btn=>btn.addEventListener('click',()=>{selected=Number(btn.dataset.quizIndex);render()}));
 if(location.hash!=='#'+(current+1))history.replaceState(null,'','#'+(current+1));
}
function jump(i){if(i<0||i>=slides.length)return;current=i;selected=null;render()}
prev.addEventListener('click',()=>jump(current-1));next.addEventListener('click',()=>jump(current+1));
window.addEventListener('keydown',event=>{if(['ArrowRight','PageDown',' '].includes(event.key)){event.preventDefault();jump(current+1)}if(['ArrowLeft','PageUp'].includes(event.key)){event.preventDefault();jump(current-1)}if(event.key.toLowerCase()==='f'&&!event.ctrlKey&&!event.metaKey){const elem=document.documentElement;if(!document.fullscreenElement)elem.requestFullscreen?.();else document.exitFullscreen?.();}});
const start=Number(location.hash.slice(1));if(Number.isInteger(start)&&start>=1&&start<=slides.length)current=start-1;
render();
})();
