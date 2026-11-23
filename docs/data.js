/* 由 npm run build 從 raw/ 與 knowledge/ 生成；無需伺服器可直接預覽 */
window.WIKI_DATA={
  "project": "繁體中文 LLM Wiki：從 LLM 到 RAG",
  "generated": "2026-11-23",
  "sources": [
    {
      "id": "S01",
      "slug": "transformer-paper",
      "title": "Attention Is All You Need",
      "authors": "Ashish Vaswani 等",
      "year": 2017,
      "type": "研究論文",
      "url": "https://arxiv.org/abs/1706.03762",
      "tags": [
        "Transformer",
        "LLM"
      ],
      "summary": "提出以注意力機制為核心的 Transformer 架構，不再依賴循環神經網路來建構序列轉換模型。",
      "findings": [
        "Transformer 使用注意力機制建模序列中不同位置的關係。",
        "相較以循環計算為主的早期架構，Transformer 的設計更有利於平行化訓練。",
        "這篇論文說明模型架構，不能直接證明任何生成內容一定正確。"
      ],
      "caution": "Transformer 是架構概念；本次教學使用它來解釋模型如何處理語言，不把它等同於事實查證機制。",
      "related": [
        "llm",
        "transformer"
      ]
    },
    {
      "id": "S02",
      "slug": "rag-original",
      "title": "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
      "authors": "Patrick Lewis 等",
      "year": 2020,
      "type": "研究論文",
      "url": "https://arxiv.org/abs/2005.11401",
      "tags": [
        "RAG",
        "檢索"
      ],
      "summary": "探討將預訓練語言模型的參數化記憶與外部非參數化知識結合，支援知識密集型生成任務。",
      "findings": [
        "RAG 將檢索到的外部知識與語言模型生成步驟相結合。",
        "原論文的非參數化記憶示例是以檢索器存取 Wikipedia 的密集向量索引。",
        "研究報告在其測試任務上相較部分基線有改善，但不代表任何 RAG 系統都正確。"
      ],
      "caution": "RAG 的效果取決於資料、檢索器與生成模型；不可把論文中的結果泛化為零幻覺。",
      "related": [
        "rag",
        "retrieval"
      ]
    },
    {
      "id": "S03",
      "slug": "rag-survey",
      "title": "Retrieval-Augmented Generation for Large Language Models: A Survey",
      "authors": "Yunfan Gao 等",
      "year": 2023,
      "type": "研究綜述",
      "url": "https://arxiv.org/abs/2312.10997",
      "tags": [
        "RAG",
        "知識庫"
      ],
      "summary": "整理 RAG 從基礎到進階、模組化的演進，並將相關技術放在檢索、增強與生成等環節中理解。",
      "findings": [
        "RAG 借助外部資料庫補充語言模型的內部知識。",
        "常見環節包括資料準備、檢索、將內容提供給模型，以及回覆生成。",
        "綜述區分 Naive、Advanced 與 Modular RAG 的典型設計路線。"
      ],
      "caution": "本教學呈現的步驟是易懂的簡化流程，不代表所有 RAG 架構都固定使用相同步驟。",
      "related": [
        "rag",
        "retrieval",
        "llm-wiki"
      ]
    },
    {
      "id": "S04",
      "slug": "ragas-evaluation",
      "title": "RAGAS: Automated Evaluation of Retrieval Augmented Generation",
      "authors": "Shahul Es 等",
      "year": 2023,
      "type": "研究論文",
      "url": "https://arxiv.org/abs/2309.15217",
      "tags": [
        "評估",
        "RAG"
      ],
      "summary": "提出對 RAG 檢索與生成環節進行多面向、可不依賴人工標準答案的自動化評估框架。",
      "findings": [
        "RAG 評估需區分「檢索到的內容是否適切」與「回答是否忠於提供的內容」。",
        "模型是否忠實引用上下文，不等同於外部世界的事實必然正確。",
        "評估指標可輔助反覆調整 RAG 流程，不應取代人工查核。"
      ],
      "caution": "本作業採用忠實度／相關性／答案正確性作為教學框架；其中答案正確性通常仍需要可信標準答案或額外核對，不等同全是 RAGAS 原論文的無參考評估指標。",
      "related": [
        "evaluation",
        "rag"
      ]
    },
    {
      "id": "S05",
      "slug": "lost-in-middle",
      "title": "Lost in the Middle: How Language Models Use Long Contexts",
      "authors": "Nelson F. Liu 等",
      "year": 2023,
      "type": "研究論文",
      "url": "https://arxiv.org/abs/2307.03172",
      "tags": [
        "長文本",
        "檢索"
      ],
      "summary": "研究長輸入上下文中的資訊位置對模型表現的影響，發現部分測試設定下中間位置的資訊較不容易被有效利用。",
      "findings": [
        "在所測試的長文本任務中，答案線索的位置可能影響模型表現。",
        "研究觀察到相關資訊位於開頭或結尾時，部分模型常有較好表現。",
        "因此不能把「全部文件塞進 prompt」視為無須檢索及檢查的可靠替代方案。"
      ],
      "caution": "結果是研究模型與任務下的觀察，不應宣稱所有現代模型都必定出現相同程度的 U 型曲線。",
      "related": [
        "long-context",
        "retrieval"
      ]
    },
    {
      "id": "S06",
      "slug": "karpathy-llm-wiki",
      "title": "LLM Wiki (idea file)",
      "authors": "Andrej Karpathy",
      "year": 2026,
      "type": "設計文件",
      "url": "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f",
      "tags": [
        "LLM Wiki",
        "工作流程"
      ],
      "summary": "提出讓 LLM 持續維護由 Markdown 組成的互相連結 Wiki，使每次新增資料都能改進既有知識，而非每次提問都從原始文件重新整理。",
      "findings": [
        "LLM Wiki 的核心是可持續更新的 Markdown 知識頁。",
        "新增來源時，理想流程要更新既有概念頁、交叉連結與相互矛盾之處。",
        "與傳統只在查詢時檢索片段的 RAG 相比，Wiki 強調持久且可審核的知識整理成果。"
      ],
      "caution": "這是一份工作方式提案而不是證明此方法必然優於 RAG 的對照實驗。此專案的資料匯入與交叉連結以可重現的人工核對摘要和程式建置示範，不宣稱執行自動化 LLM API。",
      "related": [
        "llm-wiki",
        "evaluation"
      ]
    }
  ],
  "concepts": [
    {
      "id": "llm",
      "title": "大型語言模型 LLM",
      "tag": "01 / 基礎",
      "lead": "學會從大量文字中預測、組合與生成語言的模型。",
      "content": [
        "大多數現代 LLM 採用 Transformer 或其衍生架構。模型利用先前學到的語言模式與給定上下文產生回覆。",
        "「文字看起來流暢」不表示已完成外部事實驗證；碰到最新制度、特定文件時需要補充來源。"
      ],
      "example": "把 LLM 想成擅長文字表達的助教，但不能默認它記得最新版講義。",
      "sourceIds": [
        "S01",
        "S02",
        "S03"
      ],
      "related": [
        "transformer",
        "rag"
      ]
    },
    {
      "id": "transformer",
      "title": "Transformer 與 Attention",
      "tag": "02 / 基礎",
      "lead": "透過注意力機制判斷序列中哪些位置互相關聯。",
      "content": [
        "2017 年的 Transformer 論文提出以注意力為中心的模型架構。",
        "在教學簡化下，Attention 可理解為模型處理一段文字時，動態衡量其他字詞與目前資訊的關聯；這不是人工查證的注意力。"
      ],
      "example": "閱讀「小明把書交給小華，因為他要借閱」時，需要結合上下文推測「他」指誰。",
      "sourceIds": [
        "S01"
      ],
      "related": [
        "llm",
        "rag"
      ]
    },
    {
      "id": "retrieval",
      "title": "檢索與外部知識",
      "tag": "03 / RAG 核心",
      "lead": "先找相關文件，再讓模型利用找到的證據回答。",
      "content": [
        "可先將文件整理成可搜尋片段，查詢時找到相關內容。",
        "檢索失準可能帶來不相關的片段；檢索成功也需檢查日期、資料品質和上下文。"
      ],
      "example": "詢問學校最新畢業門檻時，先找正式公告，再根據公告回答，而不是只憑模型記憶。",
      "sourceIds": [
        "S02",
        "S03",
        "S05"
      ],
      "related": [
        "rag",
        "evaluation"
      ]
    },
    {
      "id": "rag",
      "title": "RAG：檢索增強生成",
      "tag": "04 / RAG 核心",
      "lead": "Retrieval-Augmented Generation：把查資料與生成答案接起來。",
      "content": [
        "教學版流程：文件來源 → 建立可檢索內容 → 使用者提問 → 取出相關片段 → 模型根據片段生成 → 檢查回覆。",
        "RAG 在知識密集型任務上可帶來幫助，但錯誤來源、錯誤檢索或模型誤讀仍會讓答案出錯。"
      ],
      "example": "對照 2026 年某門課的「最新學分規定」時，必須從 2026 年的校方正式文件取材。",
      "sourceIds": [
        "S02",
        "S03",
        "S04"
      ],
      "related": [
        "retrieval",
        "evaluation",
        "llm-wiki"
      ]
    },
    {
      "id": "evaluation",
      "title": "回答品質與來源驗證",
      "tag": "05 / 品質控制",
      "lead": "回答好不好，需要分別檢查資料、引用與結論。",
      "content": [
        "檢索相關性：拿到的片段是否真的回應問題？",
        "忠實度：回答的每個重要主張是否能從引用的內容推導？",
        "事實正確性：引用來源本身是否可信、最新、符合外部真實情況？忠實度高也不保證正確。"
      ],
      "example": "來源寫「舊制 18 學分」，回答照抄 18 學分很忠實，但今年新制若改成 20 學分，答案仍可能錯。",
      "sourceIds": [
        "S04",
        "S03"
      ],
      "related": [
        "rag",
        "retrieval",
        "llm-wiki"
      ]
    },
    {
      "id": "long-context",
      "title": "Lost in the Middle：長文本陷阱",
      "tag": "06 / 限制",
      "lead": "上下文放得多，不代表每一段都被同樣有效利用。",
      "content": [
        "研究顯示部分長文本測試中，相關線索出現在中段時，模型性能可能比在開頭或結尾差。",
        "這是提醒我們：有用的檢索、選段與檢查，通常比無差別貼入所有資料更值得設計。"
      ],
      "example": "把 100 頁手冊全部貼給 AI，可能不如先定位第 47 頁的關鍵條文再核對。",
      "sourceIds": [
        "S05"
      ],
      "related": [
        "retrieval",
        "evaluation"
      ]
    },
    {
      "id": "llm-wiki",
      "title": "LLM Wiki：會累積的知識庫",
      "tag": "07 / 進階",
      "lead": "將每次讀到的內容先整理成可保存、可互連、可追溯的知識頁。",
      "content": [
        "資料先留下 raw source 與摘要，再把新知識編入既有概念頁。",
        "日後製作教學簡報時，先查 Wiki 的整理成果，並回溯原始資料核對。",
        "與純查詢即時取片段不同，LLM Wiki 重視每次新增知識後能更新、修正整體知識結構。"
      ],
      "example": "讀完 RAG 評估論文後，不只新增一頁來源摘要，也更新「RAG」頁的評估段落，加入通往「品質控制」頁的連結。",
      "sourceIds": [
        "S06",
        "S04"
      ],
      "related": [
        "rag",
        "evaluation"
      ]
    }
  ],
  "slides": [
    {
      "id": "s01",
      "type": "cover",
      "eyebrow": "LLM WIKI / 教學系列",
      "title": "從 LLM 到 RAG",
      "subtitle": "讓 AI 回答更有根據：從模型原理、查找資料，到品質驗證",
      "points": [
        "14 頁教學簡報",
        "6 份資料已納入 Wiki",
        "適合第一次接觸 RAG 的讀者"
      ],
      "sources": [
        "S01",
        "S02",
        "S06"
      ],
      "wiki": "llm"
    },
    {
      "id": "s02",
      "type": "goals",
      "eyebrow": "01 / 學習目標",
      "title": "今天你會搞懂 4 件事",
      "subtitle": "不用會寫 AI 程式，也能看懂一個可靠的問答系統。",
      "points": [
        "LLM 和 Transformer 在做什麼？",
        "為什麼模型會回答得很像真的，卻可能答錯？",
        "RAG 如何幫模型查資料？",
        "為什麼還需要 Wiki 與品質檢查？"
      ],
      "sources": [
        "S01",
        "S02",
        "S04",
        "S06"
      ],
      "wiki": "llm"
    },
    {
      "id": "s03",
      "type": "split",
      "eyebrow": "02 / 基礎概念",
      "title": "LLM 擅長生成，不等於查證",
      "subtitle": "語言生成與外部事實查核，是兩個不同任務。",
      "leftTitle": "LLM 的強項",
      "left": [
        "理解提問語意",
        "組織文字與解釋概念",
        "根據上下文生成內容"
      ],
      "rightTitle": "容易遇到的限制",
      "right": [
        "知識可能不夠新",
        "資訊可能不完整",
        "看似合理的敘述可能沒有依據"
      ],
      "sources": [
        "S02",
        "S03"
      ],
      "wiki": "llm"
    },
    {
      "id": "s04",
      "type": "attention",
      "eyebrow": "03 / 模型架構",
      "title": "Transformer：讀懂上下文的核心",
      "subtitle": "Attention 讓模型在處理文字時，衡量不同位置資訊之間的關聯。",
      "points": [
        "不是逐句查事實",
        "而是對文字序列中的關係進行運算",
        "因此仍需要外部資料與驗證"
      ],
      "sources": [
        "S01"
      ],
      "wiki": "transformer"
    },
    {
      "id": "s05",
      "type": "problem",
      "eyebrow": "04 / 為什麼需要 RAG",
      "title": "問「最新規定」時，只靠模型記憶不夠",
      "subtitle": "以下為虛構的校園情境，示範資料時效性的重要。",
      "question": "「今年畢業需要幾學分？」",
      "before": "直接生成：根據舊印象回答 18 學分",
      "after": "有證據再答：先查今年正式公告，再回答 20 學分",
      "footnote": "18、20 學分均為教學虛構數字，不代表任何學校實際規定。",
      "sources": [
        "S02",
        "S03"
      ],
      "wiki": "rag"
    },
    {
      "id": "s06",
      "type": "pipeline",
      "eyebrow": "05 / 系統流程",
      "title": "RAG = Retrieval + Generation",
      "subtitle": "把「查資料」接到「回答問題」前面。",
      "steps": [
        "準備文件",
        "建立可搜尋索引",
        "使用者提問",
        "檢索相關段落",
        "LLM 生成答案",
        "核對引用與事實"
      ],
      "sources": [
        "S02",
        "S03",
        "S04"
      ],
      "wiki": "rag"
    },
    {
      "id": "s07",
      "type": "example",
      "eyebrow": "06 / 情境演練",
      "title": "一個問題怎麼走過 RAG？",
      "subtitle": "以虛構的「圖書館借閱規則」做示範。",
      "question": "「研究生可以借幾本書？」",
      "context": "資料庫查到：示例校規 A 條寫「研究生最多借 30 本」。",
      "response": "產生回答：「依校規 A 條，研究生最多借 30 本。」",
      "check": "檢查：來源是最新版嗎？引文真的支持 30 本嗎？",
      "footnote": "教學示例，非任何實際圖書館政策。",
      "sources": [
        "S02",
        "S03",
        "S04"
      ],
      "wiki": "retrieval"
    },
    {
      "id": "s08",
      "type": "risks",
      "eyebrow": "07 / 常見風險",
      "title": "用了 RAG，還是可能出錯",
      "subtitle": "問題未必出在生成模型；資料與檢索也可能是源頭。",
      "cards": [
        [
          "01",
          "資料過期",
          "引用一份舊公告，會得出過時答案"
        ],
        [
          "02",
          "檢索失準",
          "找錯段落，讓模型誤用內容"
        ],
        [
          "03",
          "生成超出證據",
          "原文只寫 A，回答卻多講出 B"
        ]
      ],
      "sources": [
        "S02",
        "S03",
        "S04"
      ],
      "wiki": "evaluation"
    },
    {
      "id": "s09",
      "type": "metrics",
      "eyebrow": "08 / 三層檢查",
      "title": "回答「有根據」必須分 3 層看",
      "subtitle": "這是依據 RAG 評估研究整理的教學檢查框架。",
      "cards": [
        [
          "檢索相關性",
          "找對文件與段落了嗎？"
        ],
        [
          "答案忠實度",
          "答案能由引文支持嗎？"
        ],
        [
          "事實正確性",
          "引文本身是否可信且最新？"
        ]
      ],
      "footnote": "第三層通常需要額外權威來源或標準答案；不等同 RAGAS 原論文所有指標。",
      "sources": [
        "S04",
        "S03"
      ],
      "wiki": "evaluation"
    },
    {
      "id": "s10",
      "type": "context",
      "eyebrow": "09 / 研究提醒",
      "title": "長文本 ≠ 一定看得更完整",
      "subtitle": "研究在特定任務中觀察到：重要線索放在中間時，部分模型利用得比較差。",
      "points": [
        "不能只想著把更多文件貼進提示詞",
        "重要的是先定位相關資訊",
        "再核對模型是否真的用對證據"
      ],
      "footnote": "Lost in the Middle 是特定研究情境的觀察，並非對所有現代模型的絕對斷言。",
      "sources": [
        "S05"
      ],
      "wiki": "long-context"
    },
    {
      "id": "s11",
      "type": "wiki",
      "eyebrow": "10 / Wiki 的價值",
      "title": "RAG 是「查」，LLM Wiki 是「累積」",
      "subtitle": "兩種方法可以合作，而不是互相取代。",
      "leftTitle": "一般 RAG 檢索思路",
      "left": [
        "每次提問時找原始片段",
        "即時整合成答案",
        "知識整理未必被保存"
      ],
      "rightTitle": "LLM Wiki 思路",
      "right": [
        "先將新資料整理成筆記",
        "更新既有主題頁及連結",
        "下次直接利用已累積的知識"
      ],
      "sources": [
        "S06"
      ],
      "wiki": "llm-wiki"
    },
    {
      "id": "s12",
      "type": "wiki-pipeline",
      "eyebrow": "11 / 本次實作",
      "title": "6 份來源如何變成這套簡報？",
      "subtitle": "先 ingest 來源摘要，再從 Wiki 綜整教學結構，檢查後輸出 HTML。",
      "steps": [
        "6 份原始來源",
        "Wiki 主題頁",
        "查詢與教學大綱",
        "來源映射檢查",
        "可操作 HTML 簡報"
      ],
      "sources": [
        "S01",
        "S02",
        "S03",
        "S04",
        "S05",
        "S06"
      ],
      "wiki": "llm-wiki"
    },
    {
      "id": "s13",
      "type": "quiz",
      "eyebrow": "12 / 小測驗",
      "title": "RAG 答案完全忠於來源，就一定正確？",
      "subtitle": "先選答案，再看為什麼。",
      "question": "回答根據一份 2023 年舊規定生成，而且沒有增加任何內容。它一定符合 2026 年最新規定嗎？",
      "options": [
        "A. 一定正確，因為引用很忠實",
        "B. 不一定，還需要查來源時效與真實性"
      ],
      "answer": 1,
      "explanation": "答對了！忠實度是「回答有沒有照來源說」，正確性還要看來源是否可靠且適用於目前情境。",
      "sources": [
        "S04",
        "S03"
      ],
      "wiki": "evaluation"
    },
    {
      "id": "s14",
      "type": "finish",
      "eyebrow": "13 / 重點回顧",
      "title": "讓 AI 可靠的關鍵，是可追溯的流程",
      "subtitle": "記住這個思路，就能開始設計自己的知識系統。",
      "points": [
        "LLM 會生成文字，但不是事實資料庫",
        "RAG 先找到相關證據，再生成答案",
        "Wiki 保存與串連已核對的知識",
        "查來源、檢忠實度、驗時效，缺一不可"
      ],
      "sources": [
        "S01",
        "S02",
        "S03",
        "S04",
        "S05",
        "S06"
      ],
      "wiki": "llm-wiki"
    }
  ]
};
