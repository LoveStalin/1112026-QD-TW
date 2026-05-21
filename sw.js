const CACHE_NAME = 'site-cache-v5';
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
    '/img/2010-left.jpg',
    '/img/2010-right.jpg',
    '/img/2013-left.jpg',
    '/img/2013-right.JPG',
    '/img/2015-left.JPG',
    '/img/2015-right.JPG',
    '/img/2016-left.JPG',
    '/img/2016-right.JPG',
    '/img/2018-left.JPG',
    '/img/2018-right.JPG',
    '/img/2020-left.JPG',
    '/img/2020-right.JPG',
    '/img/6-2024-left.jpg',
    '/img/6-2024-right.jpg',
    '/img/6-2025-left.jpg',
    '/img/6-2025-right.jpg',
    '/image/locket.png',
    '/image/project1.png',
    '/image/project2.png',
    '/image/project3.png',
    '/image/uk.png',
    '/image/vn.png',
    '/image/zalo.png',
    '/image/wall/1.jpg',
    '/image/wall/2.jpg',
    '/image/wall/3.jpg',
    '/image/wall/Basketball.jpg',
];

function cleanResponse(response) {
    if (!response || !response.ok) return response;

    return new Response(response.clone().body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
    });
}

function cacheFallback(request) {
    const requestUrl = new URL(request.url);

    return caches.match(request)
        .then(cached => cached || caches.match(requestUrl.pathname))
        .then(cached => cached || caches.match('/index.html'));
}

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(async cache => {
            for (const url of urlsToCache) {
                try {
                    const response = await fetch(url, {
                        cache: 'no-store',
                        redirect: 'follow',
                    });

                    if (response && response.ok) {
                        await cache.put(url, cleanResponse(response));
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

    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(requestUrl.href, {
                cache: 'no-store',
                credentials: 'same-origin',
                redirect: 'follow',
            }).then(networkRes => {
                if (!networkRes || !networkRes.ok) return networkRes;

                const clean = cleanResponse(networkRes);
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(requestUrl.pathname, clean.clone());
                });
                return clean;
            }).catch(() => cacheFallback(event.request))
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;

            return fetch(event.request).then(networkRes => {
                if (!networkRes || networkRes.status !== 200) return networkRes;

                const clean = cleanResponse(networkRes);
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, clean.clone()));
                return clean;
            }).catch(() => caches.match(event.request))
        })
    );
});

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
