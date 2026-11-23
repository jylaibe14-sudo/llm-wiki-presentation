# 2026-11-23 實際執行與修正紀錄

本報告不是預先假設的完成敘述：以下指令在本次環境中已實際執行。詳細輸出另見本資料夾 JSON 檔。

| 順序 | 動作 | 證據／結果 |
|---|---|---|
| 1 | `npm run ingest` | 6 來源 Markdown，7 概念 Markdown，1 索引，`wiki/ingest-log.md` |
| 2 | `npm run query -- 'RAG 評估'` | `logs/query-result.json`；Wiki 回傳 RAG 與回答品質評估等候選概念 |
| 3 | `npm run build` | 14 頁投影片資料整合於 `docs/data.js` |
| 4 | `npm run check` | `logs/normal-check.json`；6 sources、7 concepts、14 slides、39 source references，**PASS** |
| 5 | `npm run test:validator` | 故意插入不存在的 `S99`，**EXPECTED FAIL**；`logs/fault-injection-check.json` |
| 6 | `npm run check` | 還原正常資料後，**PASS** |
| 7 | 首輪 Playwright mobile 視覺檢查 | 390px 螢幕出現 438px 水平溢出（實際測得） |
| 8 | 修正 mobile footer CSS | 同一寬度重新檢查：scrollWidth = 390px（實際測得），**FIXED** |
| 9 | `python tests/browser_smoke.py` | `logs/browser-check.json`：38 項檢查，全數 **PASS**；各頁桌機與 390px 手機測試及截圖 |

## 失敗之後如何修改流程？

1. 除了原始資料的限制欄位，將引用驗證放在簡報生成前的 Node 04。
2. 將手機與桌機的瀏覽器測試加到 Node 06，作為部署前必經的關卡。
3. 當來源 ID 不存在就直接阻止通過檢查；當手機網頁寬度超出 viewport 時回到 HTML/CSS 節點修正。

## 解釋界線

- **故障注入的失敗**是刻意測試檢查器；不是正式資料真的引用了 S99。
- **手機版面溢出**是真正的第一次視覺檢查發現，後續修正。
- 所謂 ingest 為來源書目與核對摘要的入庫，不是全文擷取。
