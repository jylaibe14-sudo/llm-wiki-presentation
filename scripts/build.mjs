import {sources,concepts,slides,write} from './core.mjs';
const data={project:'繁體中文 LLM Wiki：從 LLM 到 RAG',generated:'2026-11-23',sources:sources(),concepts:concepts(),slides:slides()};
write('docs/data.js','/* 由 npm run build 從 raw/ 與 knowledge/ 生成；無需伺服器可直接預覽 */\nwindow.WIKI_DATA='+JSON.stringify(data,null,2)+';\n');
console.log(`BUILD OK: docs/data.js (${data.sources.length} sources / ${data.concepts.length} concepts / ${data.slides.length} slides)`);
