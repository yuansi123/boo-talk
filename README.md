# 👻 Boo Talk · 跟小幽靈練英文

一個可愛軟萌的 PWA，跟小幽靈一對一練習美式日常英文口說。情境關卡、即時錄音、隨時回放，可以安裝到桌面或手機主畫面當原生 App 用。

![Made with HTML/CSS/JS](https://img.shields.io/badge/built_with-HTML%20%2F%20CSS%20%2F%20JS-FF8B6A)
![PWA Ready](https://img.shields.io/badge/PWA-ready-7DCEB0)
![No Build Step](https://img.shields.io/badge/build-none-FFE5A0)

## ✨ 功能

- 🏠 **主頁**：會浮動的小幽靈、每日問候語、連續登入天數、今日 3 個任務
- 🗺️ **冒險地圖**：6 個情境關卡，一關一關解鎖（打招呼 → 點咖啡 → 餐廳 → 購物 → 搭車 → 派對）
- 📚 **學習頁**：每關 5 句道地美式英文 + 中文翻譯 + 使用提示
- 🎙️ **對話練習**：小幽靈先講，用戶照提示句錄音回答；可隨時試聽、重錄；6 句來回後可交換身份
- 💾 **進度自動儲存**：用 localStorage 記下完成關卡、連續天數、每日任務狀態
- 📱 **PWA**：可安裝到桌面 / 手機主畫面、離線可用

## 🚀 部署到 Vercel（最簡單的方式）

### 步驟 1：建立 GitHub repo

1. 在 GitHub 建立新 repo（例如 `boo-talk`）
2. 把這整個資料夾的檔案 push 上去：

```bash
git init
git add .
git commit -m "init: Boo Talk PWA"
git branch -M main
git remote add origin https://github.com/你的帳號/boo-talk.git
git push -u origin main
```

### 步驟 2：連到 Vercel

1. 到 [vercel.com](https://vercel.com) 用 GitHub 登入
2. 點 **Add New → Project**，選你剛剛 push 的 repo
3. 所有設定保持預設（**Framework Preset 選 Other**，不需要 build command）
4. 點 **Deploy**

幾秒後就會拿到一個 `xxx.vercel.app` 網址。

### 步驟 3：安裝成桌面 PWA

打開 Vercel 給你的網址：

- **Chrome / Edge（電腦或手機）**：網址列右邊會出現 ⊕ 安裝圖示，點下去就裝好
- **Safari（iPhone / iPad）**：點分享按鈕 → 加入主畫面
- **Safari（Mac）**：檔案 → 加入 Dock

裝好後就會有個獨立 App 視窗，圖示是小幽靈，跟原生 App 一樣。

## 📁 專案結構

```
boo-talk/
├── index.html          # 主程式（HTML + CSS + JS 全部在裡面）
├── manifest.json       # PWA 應用清單
├── sw.js               # Service Worker（離線快取）
├── vercel.json         # Vercel 部署設定（headers / MIME types）
├── icons/              # PWA 圖示（多種尺寸）
│   ├── favicon.png
│   ├── icon-48.png ~ icon-512.png
│   └── icon-maskable-*.png
├── .gitignore
└── README.md
```

## 🛠️ 本機測試

PWA 需要 HTTPS 或 localhost 才能跑 service worker。最簡單是用 Python 內建 server：

```bash
# 在專案資料夾下
python3 -m http.server 8080
# 然後開 http://localhost:8080
```

或用 Node：

```bash
npx serve .
```

⚠️ **不能直接雙擊 index.html 開啟**，因為 service worker 跟麥克風 API 都需要 http(s) 協議。

## 🎨 自訂

### 改文案 / 加關卡

打開 `index.html`，找到 `const LEVELS = [` 這個陣列。每個關卡的格式：

```js
{
  id: 7, emoji: '🏥',
  title: 'At the Doctor',
  desc: '看醫生情境',
  phrases: [
    { en: "I'm not feeling well.", zh: "我不太舒服。", tip: "簡單直接的開場。" },
    // ...
  ],
  dialog: [
    { speaker: 'ghost', en: "What seems to be the problem?", zh: "怎麼了？" },
    { speaker: 'user',  en: "I have a headache.", zh: "我頭痛。", hint: "I have a + 症狀" },
    // ...
  ]
}
```

加新的關卡只要照格式加進陣列，地圖會自動多一個關卡圓點。

### 改顏色

打開 `index.html` 的 `<style>` 區塊頂端，找到 `:root` 裡面的 CSS 變數：

```css
--peach: #FFE9D6;        /* 主背景 */
--coral: #FF8B6A;        /* 主強調色（按鈕、用戶氣泡）*/
--mint: #B8E6D5;         /* 次要色 */
--ink: #3D2E26;          /* 主要文字色 */
```

改完整個 App 的配色都會跟著變。

### 換 icon

1. 把你的設計轉成 PNG，命名照 `icons/` 資料夾原本的格式
2. 至少要有 192x192 跟 512x512 兩個尺寸
3. 重新部署即可

## 📝 注意事項

- **麥克風權限**：第一次使用時瀏覽器會問你要不要允許錄音，要點允許
- **Safari 桌面版**：iOS 14.3+ 才支援 PWA 安裝；Mac 版 Safari 16.4+ 才完整支援
- **錄音檔不會上傳**：所有音檔只存在你的瀏覽器記憶體裡，關掉頁面就消失，完全私密

## 📄 授權

MIT — 隨便用、隨便改。

---

Made with 🧡 using nothing but HTML, CSS, and vanilla JS.
