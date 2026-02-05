/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'ha-dashboard-v8';
const BASE_PATH = new URL('./', self.location).pathname;

const STATIC_ASSETS = ['index.html', 'manifest.json', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS.map(asset => `${BASE_PATH}${asset}`))));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  const isNavigation = request.mode === 'navigate';
  const isRoot = url.pathname === BASE_PATH || url.pathname === BASE_PATH.slice(0, -1);

  if (isNavigation || isRoot) {
    const targetUrl = `${BASE_PATH}index.html`;
    event.respondWith(
      fetch(targetUrl)
        .then(response => {
          if (response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(targetUrl, copy));
            return response;
          }
          return caches.match(targetUrl).then(cached => cached || response);
        })
        .catch(() => caches.match(targetUrl))
    );
  } else {
    event.respondWith(
      caches.match(request).then(cached => {
        const fetchPromise = fetch(request)
          .then(network => {
            if (network.status === 200) {
              const copy = network.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
            }
            return network;
          })
          .catch(() => null);
        return cached || fetchPromise;
      })
    );
  }
});
