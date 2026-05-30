const CACHE_NAME = 'kkl-portfolio-cache-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './cv.html',
    './resource/css/style.css',
    './resource/js/particles.js',
    './resource/js/portfolio-data.js',
    './resource/image/profile.jpg',
    './sweetalert2/dist/sweetalert2.all.min.js'
];

// Install Event - Pre-cache core local assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Pre-caching offline assets');
            return cache.addAll(ASSETS_TO_CACHE);
        }).then(() => self.skipWaiting())
    );
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('[Service Worker] Clearing old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch Event - Stale-While-Revalidate caching strategy
self.addEventListener('fetch', (event) => {
    // Only cache GET requests
    if (event.request.method !== 'GET') return;

    const requestUrl = new URL(event.request.url);

    // Skip form submission requests (e.g. formsubmit.co)
    if (requestUrl.hostname.includes('formsubmit.co')) return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // Return cached asset immediately, fetch updated version in the background
                fetch(event.request)
                    .then((networkResponse) => {
                        if (networkResponse && networkResponse.status === 200) {
                            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
                        }
                    })
                    .catch((err) => console.log('[Service Worker] Stale fetch failed:', err));
                return cachedResponse;
            }

            // If not cached, fetch from network and dynamically cache if it's from a CDN or local resource
            return fetch(event.request).then((networkResponse) => {
                if (!networkResponse || networkResponse.status !== 200) {
                    return networkResponse;
                }

                // Cache local assets and CDN resources
                const shouldCache = requestUrl.origin === location.origin || 
                                     requestUrl.hostname.includes('jsdelivr.net') || 
                                     requestUrl.hostname.includes('cloudflare.com') ||
                                     requestUrl.hostname.includes('unpkg.com') ||
                                     requestUrl.hostname.includes('fonts.googleapis.com') ||
                                     requestUrl.hostname.includes('fonts.gstatic.com');

                if (shouldCache) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }

                return networkResponse;
            });
        })
    );
});
