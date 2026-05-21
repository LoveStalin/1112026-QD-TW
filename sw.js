const CACHE_NAME = 'site-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/about.html',
    '/about.css',
    '/about.js',
    '/contact.html',
    '/contact.css',
    '/contact.js',
    '/projects.html',
    '/projects.css',
    '/projects.js',
    '/timeline.html',
    '/timeline.css',
    '/timeline.js',
];

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(async cache => {
            for (const url of urlsToCache) {
                try {
                    const response = await fetch(url, { cache: 'no-store' });
                    if (response && response.ok) {
                        await cache.put(url, response.clone());
                    } else {
                        console.warn('sw: fetch not ok for', url, response && response.status);
                    }
                } catch (err) {
                    console.warn('sw: failed to cache', url, err);
                }
            }
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== CACHE_NAME) return caches.delete(key);
            })
        )).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    const requestUrl = new URL(event.request.url);
    if (requestUrl.origin !== location.origin) return;

    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;
            return fetch(event.request).then(networkRes => {
                if (!networkRes || networkRes.status !== 200) return networkRes;
                const copy = networkRes.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
                return networkRes;
            }).catch(() => caches.match('/index.html'));
        })
    );
});

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});