/* Boo Talk Service Worker */
const VERSION = 'boo-talk-v1.0.0';
const CACHE_STATIC = `${VERSION}-static`;
const CACHE_RUNTIME = `${VERSION}-runtime`;

// 預先快取的核心檔案
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/favicon.png',
];

// 安裝：預先快取
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// 啟用：清掉舊版快取
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => !k.startsWith(VERSION)).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// 取資源策略：
// - HTML 文件：network first (新內容優先), 失敗回快取
// - 其他 (icon/font/json)：cache first
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // 跨網域 (Google Fonts) — runtime cache
  if (url.origin !== location.origin) {
    event.respondWith(
      caches.match(req).then(cached => {
        if (cached) return cached;
        return fetch(req).then(resp => {
          if (resp.ok) {
            const clone = resp.clone();
            caches.open(CACHE_RUNTIME).then(c => c.put(req, clone));
          }
          return resp;
        }).catch(() => cached);
      })
    );
    return;
  }

  // 同網域
  const isHTML = req.mode === 'navigate' ||
                 (req.headers.get('accept') || '').includes('text/html');

  if (isHTML) {
    // network first
    event.respondWith(
      fetch(req).then(resp => {
        const clone = resp.clone();
        caches.open(CACHE_STATIC).then(c => c.put(req, clone));
        return resp;
      }).catch(() =>
        caches.match(req).then(r => r || caches.match('/index.html') || caches.match('/'))
      )
    );
  } else {
    // cache first
    event.respondWith(
      caches.match(req).then(cached => {
        if (cached) return cached;
        return fetch(req).then(resp => {
          if (resp.ok) {
            const clone = resp.clone();
            caches.open(CACHE_STATIC).then(c => c.put(req, clone));
          }
          return resp;
        });
      })
    );
  }
});
