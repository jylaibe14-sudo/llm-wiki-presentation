# 繁體中文 LLM Wiki → 教學型 HTML 簡報

> 主題：從 LLM 到 RAG，讓 AI 回答更有根據

本專案是一份可上傳 GitHub Pages 的完整靜態網站，含 **6 份摘要層級 ingest 的研究／設計來源、7 篇互連 Wiki 概念、14 頁可操作教學型 HTML 簡報，以及 loop/graph 工作流程、實際檢查紀錄和反思**。

## 先討論後生成：教學主題範圍

- 預設學習者：第一次接觸 LLM、Transformer、RAG 的學生。
- 目標：建立直覺，而非推導公式或教完整部署。
- 內容邊界：不將 RAG 描述成「保證不會幻覺」，清楚分開忠實度與正確性。
- 來源規則：每頁投影片均須引用來源 ID，可從 HTML 反查 Wiki 和原始論文。

## 如何瀏覽

直接開啟 `docs/index.html`，再點「Wiki」、「教學簡報」、「流程與檢查」。

- `docs/index.html` — 首頁
- `docs/wiki.html` — Wiki 概念頁及 6 篇來源摘要，具搜尋
- `docs/slides.html` — 14 頁 HTML 簡報，可用左右鍵操作；`F` 切換全螢幕
- `docs/workflow.html` — loop/graph、單次執行紀錄、故障注入及反思

不需安裝額外套件；主要頁面資料在 `docs/data.js`，離線開啟亦可使用。

## 本機重新執行

需 Node.js 22 或更新：

```bash
npm run ingest
npm run query -- "RAG 評估"
npm run build
npm run check
```

測試防呆器是否能抓到錯誤（故意注入不存在的 `S99`，**預期會回傳非零退出碼**）：

```bash
npm run test:validator
```

## Loop / Graph

`核對原始來源 → ingest 至 Wiki → query & 教學綜整 → 檢查來源映射 → 生成 HTML`。

- A loop：來源摘要沒有使用限制或無法核對 → 退回來源／ingest。
- B loop：引文不存在、論文過度外推 → 退回教學綜整並重跑檢查。
- C loop：HTML 操作失效 → 退回網頁生成並進行瀏覽器測試。

## GitHub Pages 部署

1. 在 GitHub 建立公開 repository，將此資料夾**內的所有檔案和資料夾**上傳（包含隱藏的 `.github/`）。
2. 確認預設分支為 `main`，並確認 `.github/workflows/pages.yml` 已上傳。
3. 到 repository 的 `Settings → Pages → Build and deployment` 將 Source 設為 **GitHub Actions**。
4. 開啟 `Actions`，確認 `Publish LLM Wiki and HTML slides` 執行成功。部署網址通常是 `https://你的帳號.github.io/儲存庫名稱/`，請以 GitHub 顯示的實際網址為準。
5. 首頁網址是上面的根目錄；簡報網址是在網址最後加 `slides.html`。

> 也可設定 Pages 為 `Deploy from a branch → main /docs`，因為 `docs/` 已包含預建檔案；此時不必使用 Actions。**兩種發布方式擇一即可。**

## 入庫方式與範圍說明

本次 ingest 的是從原始 arXiv 頁面與原作者 gist 核對後整理出的**摘要與書目資料**，不是自動擷取的論文全文；本地查詢程式使用關鍵字配對 Wiki 概念頁，沒有執行向量資料庫、語意檢索或 LLM API。LLM 協助本次人工審閱、整合、撰寫內容，程式部分提供可重現的資料流和引用檢查。

## 實際視覺測試（可選）

在已安裝 Python Playwright 和 Chromium 的電腦，可執行：

```bash
python tests/browser_smoke.py
```

此腳本驗證 Wiki 查詢、14 張投影片的來源連結、翻頁與小測驗、6 個流程節點，以及桌面和 390px 手機寬度，測試結果寫入 `logs/browser-check.json`，畫面截圖保留在 `evidence/`。

**注意：**本測試把靜態 HTML、CSS、JavaScript 注入本機無網路的測試頁，以避免測試環境禁止瀏覽 `file://` 或 localhost；上傳 GitHub Pages 後，仍應打開實際網址做最終驗收。
