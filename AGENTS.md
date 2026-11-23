# AGENTS.md — 繁體中文 LLM Wiki 教學網站

## 你的角色
協助維護可累積、可追溯的繁體中文 LLM Wiki，並根據 Wiki 產生面向初學者的教學 HTML 簡報。**先討論與查證，後生成**；不直接從沒有來源的生成內容建立教學主張。

## 資料與專案結構
- `raw/S*.json`：六筆來源的書目、經核對摘要、核心主張、適用限制（摘要層級 ingest；不複製論文全文）。
- `knowledge/concepts.json`：概念綜整、Wiki 相關頁連結及來源 ID。
- `knowledge/slides.json`：教學簡報每頁內容，包含 `sources` 和 `wiki`。
- `wiki/`：透過 ingest 建立的 Markdown 來源頁、概念頁和索引，可供 Obsidian 閱讀。
- `scripts/`：可重現的本機 ingest、query、build、check 指令。
- `docs/`：GitHub Pages 靜態網站，包含入口、Wiki、HTML 簡報與流程紀錄。
- `logs/`：一次正常執行與引用故障測試紀錄。

## Ingest 規則
1. 每個來源有唯一 ID（`S01` 等）、作者、年份、原始 HTTPS 連結。
2. 必須有中文摘要、至少兩個重點主張、明確的使用限制；若無法回溯原文，不得將推測寫成研究結論。
3. 新資料進入後檢查相關概念是否已存在；更新舊概念、關聯頁與 `wiki/index.md`，不要只新增孤立筆記。
4. 來源有衝突時寫明不同版本、情境或研究限制，不能默默覆蓋。

## Query → Slide 規則
1. 先查 `wiki/concepts/`、`wiki/sources/`，再決定課件結構。
2. 每張投影片均需有 `sources` 與有效 `wiki` 主題 ID。
3. 初學者教學順序：動機→LLM→RAG 流程→例子→評估→限制→Wiki→測驗與總結。
4. 虛構示例必須標明虛構；不得當成真實政策。
5. 區分：對上下文的忠實度、對問題的回答正確性、來源時效性。

## Loop / Graph 檢查與回退
- A：來源缺作者／URL／限制 → 回到「蒐集與 ingest」。
- B：來源 ID 不存在、Wiki 相關頁缺漏、研究敘述過度外推 → 回到「查詢／整理」。
- C：HTML 不能操作或連結失效 → 回到「build／網頁測試」。
- 通過 `npm run check` 後才發佈。

## 執行方式
```bash
npm run ingest
npm run query -- "RAG 評估"
npm run build
npm run check
```

## 禁止事項
- 不可冒稱已下載或解析論文全文；本專案使用原文核對過的摘要與書目資訊。
- 不可捏造文獻數據、URL、教學案例的真實性。
- 不可把 JavaScript 程式化檢查說成已自動驗證所有語意主張；涉及科學語意仍要人工回讀來源。
