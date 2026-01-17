// Service Worker for PWA functionality
// Cache name should be updated when deploying new versions to ensure users get fresh content
const CACHE_NAME = 'ha-dashboard-v1';
// Get base path from service worker registration scope
const BASE_PATH = new URL('./', self.location).pathname;

// Assets to cache on install
const STATIC_ASSETS = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/manifest.json`,
  `${BASE_PATH}/icons/icon-192.png`,
  `${BASE_PATH}/icons/icon-512.png`,
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Caching static assets');
      return cache.addAll(STATIC_ASSETS).catch(error => {
        console.error('[Service Worker] Failed to cache:', error);
        // Don't fail the install if caching fails
        return Promise.resolve();
      });
    })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Take control of all pages immediately
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // Network-first strategy for API calls (Home Assistant)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Clone the response before caching
          const responseToCache = response.clone();
          caches
            .open(CACHE_NAME)
            .then(cache => {
              cache.put(request, responseToCache);
            })
            .catch(error => {
              console.error('[Service Worker] Failed to cache API response:', error);
            });
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(request).then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Return a basic error response if no cache is available
            return new Response(JSON.stringify({ error: 'Offline and no cached data available' }), {
              status: 503,
              statusText: 'Service Unavailable',
              headers: { 'Content-Type': 'application/json' },
            });
          });
        })
    );
    return;
  }

  // Cache-first strategy for static assets
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then(response => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200) {
          return response;
        }

        // Clone the response before caching
        const responseToCache = response.clone();
        caches
          .open(CACHE_NAME)
          .then(cache => {
            cache.put(request, responseToCache);
          })
          .catch(error => {
            console.error('[Service Worker] Failed to cache static asset:', error);
          });

        return response;
      });
    })
  );
});
