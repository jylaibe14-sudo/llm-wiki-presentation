import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
export const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const readJSON=(relative)=>JSON.parse(fs.readFileSync(path.join(ROOT,relative),'utf8'));
export const write=(relative,contents)=>{const dst=path.join(ROOT,relative);fs.mkdirSync(path.dirname(dst),{recursive:true});fs.writeFileSync(dst,contents,'utf8');};
export const sources=()=>fs.readdirSync(path.join(ROOT,'raw')).filter(x=>/^S\d+\.json$/.test(x)).sort().map(name=>readJSON('raw/'+name));
export const concepts=()=>readJSON('knowledge/concepts.json');
export const slides=()=>readJSON('knowledge/slides.json');
export const safe=(s)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function validate({injectBadRef=false}={}) {
 const problems=[],ss=sources(),cc=concepts(),sl=slides();
 const sourceIds=new Set(ss.map(x=>x.id)),conceptIds=new Set(cc.map(x=>x.id));
 if(ss.length<5)problems.push(`來源不足：${ss.length} < 5`);
 if(ss.length!==sourceIds.size)problems.push('來源 ID 重複');
 if(cc.length!==conceptIds.size)problems.push('概念 ID 重複');
 for(const s of ss){if(!/^https:\/\//.test(s.url))problems.push(`${s.id} 網址非 https`);if(!s.summary||s.findings?.length<2||!s.caution)problems.push(`${s.id} 缺少摘要、證據或限制`);if(!s.title||!s.authors||!s.year)problems.push(`${s.id} 書目欄位不全`);}
 for(const c of cc){if(c.sourceIds?.length===0)problems.push(`${c.id} 沒有來源`);for(const id of c.sourceIds||[])if(!sourceIds.has(id))problems.push(`Wiki: ${c.id} 引用不存在的 ${id}`);for(const id of c.related||[])if(!conceptIds.has(id))problems.push(`Wiki: ${c.id} 相關頁 ${id} 不存在`);}
 for(const s of sl){if(!conceptIds.has(s.wiki))problems.push(`Slide ${s.id} Wiki 連結 ${s.wiki} 不存在`);if(!s.sources?.length)problems.push(`Slide ${s.id} 無來源映射`);for(const id of s.sources||[])if(!sourceIds.has(id))problems.push(`Slide ${s.id} 引用不存在的 ${id}`);if(!s.title||!s.eyebrow)problems.push(`Slide ${s.id} 欄位不完整`);}
 if(injectBadRef){ const bogus='S99'; if(!sourceIds.has(bogus))problems.push(`Slide s09 引用不存在的 ${bogus}（故障注入測試）`); }
 for(const id of sourceIds)if(!sl.some(x=>x.sources.includes(id)))problems.push(`${id} 未被任何簡報頁使用`);
 for(const name of ['index.html','wiki.html','slides.html','workflow.html','style.css','slides.js','site.js','data.js'])if(!fs.existsSync(path.join(ROOT,'docs',name)))problems.push(`網站產物缺失 docs/${name}`);
 return {passed:problems.length===0,sourceCount:ss.length,conceptCount:cc.length,slideCount:sl.length,sourceReferences:sl.reduce((n,x)=>n+x.sources.length,0),problems};
}
