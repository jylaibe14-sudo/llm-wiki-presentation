import {concepts,sources,write} from './core.mjs';
const query=process.argv.slice(2).join(' ').trim()||'RAG 的評估與資料來源';
const terms=[...new Set((query.toLowerCase().match(/[a-z-]+|[\u4e00-\u9fff]{2,}/g)||[]))];
const aliases={evaluation:['評估','RAGAS','品質檢查','忠實度'],rag:['檢索增強生成','RAG'],retrieval:['檢索','查資料'],'llm-wiki':['知識庫','wiki'],llm:['語言模型','LLM'],transformer:['transformer','注意力'], 'long-context':['長文本','lost in the middle']};
const score=c=>{const title=c.title.toLowerCase(),lead=c.lead.toLowerCase(),content=[...c.content,c.example].join(' ').toLowerCase(),alias=(aliases[c.id]||[]).join(' ').toLowerCase();return terms.reduce((n,t)=>n+(title.includes(t)?8:0)+(lead.includes(t)?3:0)+(alias.includes(t)?6:0)+(content.includes(t)?1:0),0)};
const results=concepts().map(c=>({id:c.id,title:c.title,score:score(c),sources:c.sourceIds})).sort((a,b)=>b.score-a.score).slice(0,4);
const output={query,results,method:'keyword matching over maintained Wiki concept notes; transparent local demonstration, not semantic embeddings or real-time LLM API'};
write('logs/query-result.json',JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify(output,null,2));
