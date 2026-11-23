import {sources,concepts,write} from './core.mjs';
const ss=sources(), cc=concepts();
const byId=Object.fromEntries(ss.map(s=>[s.id,s]));
for(const s of ss){
const text=`# [${s.id}] ${s.title}\n\n- 作者：${s.authors}\n- 年份：${s.year}\n- 類型：${s.type}\n- 原文：[${s.url}](${s.url})\n- 主題標籤：${s.tags.join('、')}\n\n## 本次 ingest 摘要\n${s.summary}\n\n## 可追溯的重點\n${s.findings.map(x=>'- '+x).join('\n')}\n\n## 使用限制／需注意\n${s.caution}\n\n## Wiki 關聯概念\n${s.related.map(x=>`- [${cc.find(c=>c.id===x)?.title||x}](../concepts/${x}.md)`).join('\n')}\n\n> 本次 ingest 的單位是「人工核對來源頁後整理的中文摘要與書目資訊」，不是論文全文的本機複製。\n`;
write(`wiki/sources/${s.id}.md`,text);
}
for(const c of cc){
const text=`# ${c.title}\n\n> ${c.lead}\n\n${c.content.map(t=>'## 重點\n'+t).join('\n\n')}\n\n## 教學例子\n${c.example}\n\n## 支持來源\n${c.sourceIds.map(id=>`- [${id}：${byId[id]?.title||id}](../sources/${id}.md)`).join('\n')}\n\n## 相關頁面\n${c.related.map(id=>{const target=cc.find(c=>c.id===id);return `- [${target?.title||id}](./${id}.md)`}).join('\n')}\n`;
write(`wiki/concepts/${c.id}.md`,text);
}
write('wiki/index.md',`# 繁體中文 LLM Wiki\n\n主題：**從 LLM 到 RAG，讓 AI 回答更有根據**\n\n## ${cc.length} 篇概念整理\n${cc.map(c=>`- [${c.title}](concepts/${c.id}.md) — ${c.lead}`).join('\n')}\n\n## ${ss.length} 份已 ingest 來源\n${ss.map(s=>`- [${s.id} ${s.title}](sources/${s.id}.md) — ${s.year}`).join('\n')}\n\n> 註：raw/ 保存來源書目與經查核後摘要，wiki/ 保存可互連知識頁；新增來源時需重新 ingest、檢查，必要時人工修訂觀點。\n`);
write('wiki/ingest-log.md',`# Ingest 紀錄\n\n- 輸入：raw/S01.json～raw/S06.json\n- 來源筆數：${ss.length}\n- 產出來源筆記：${ss.length}\n- 產出主題筆記：${cc.length}\n- 索引：wiki/index.md\n- 匯入層級：原文來源頁書目與核對摘要（非全文匯入）\n- 重新執行：\`npm run ingest\`\n\n## 維護策略\n每次新增來源，先檢查來源 URL／摘要／限制，再更新相關概念筆記與交叉連結；生成課件前重新執行引用完整性檢查。\n`);
console.log(`INGEST OK: ${ss.length} 個來源筆記；${cc.length} 個概念頁；索引已更新。`);
