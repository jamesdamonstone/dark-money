// Dark Money service worker — app-shell cache only.
// API calls (dark-money-api.netlify.app) are NEVER cached: balances and
// sessions must always be live. Bump VERSION to invalidate the shell.
const VERSION = 'dm-shell-v1';
const SHELL = [
  './app.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // Only handle same-origin GETs; everything else (API, fonts, CDNs) goes live.
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  // Navigations: network first, fall back to the cached shell when offline.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((cache) => cache.put('./app.html', copy));
          return res;
        })
        .catch(() => caches.match('./app.html'))
    );
    return;
  }
  // Static shell assets: cache first, refresh in the background.
  event.respondWith(
    caches.match(event.request).then((hit) => {
      const refresh = fetch(event.request).then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(VERSION).then((cache) => cache.put(event.request, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || refresh;
    })
  );
});
