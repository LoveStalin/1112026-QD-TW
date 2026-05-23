const CACHE_NAME = 'site-cache-v12';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/offline-banner.js',
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

async function cleanResponse(response) {
    if (!response || !response.ok) return response;

    if (!response.redirected) return response.clone();

    const headers = new Headers();
    const contentType = response.headers.get('content-type');
    if (contentType) headers.set('content-type', contentType);

    return new Response(await response.clone().blob(), {
        status: response.status,
        statusText: response.statusText,
        headers,
    });
}

function cacheFallback(request) {
    const requestUrl = new URL(request.url);
    const path = requestUrl.pathname === '/' ? '/index.html' : requestUrl.pathname;

    return caches.match(request)
        .then(cached => cached || caches.match(path))
        .then(cached => cached || caches.match('/'))
        .then(cached => cached || caches.match('/index.html'))
        .then(cached => cached || new Response('Offline page is not cached yet.', {
            status: 503,
            headers: { 'content-type': 'text/plain; charset=utf-8' },
        }));
}

function assetFallback(request) {
    if (request.destination === 'image') {
        return new Response(
            '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>',
            { headers: { 'content-type': 'image/svg+xml' } }
        );
    }

    return new Response('', { status: 503 });
}

function notifyClientsOffline() {
    self.clients.matchAll({
        includeUncontrolled: true,
        type: 'window',
    }).then(clients => {
        clients.forEach(client => {
            client.postMessage({ type: 'OFFLINE_CACHE_USED' });
        });
    });
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
                        const clean = await cleanResponse(response);
                        await cache.put(url, clean.clone());

                        if (url === '/') {
                            await cache.put('/index.html', clean.clone());
                        } else if (url === '/index.html') {
                            await cache.put('/', clean.clone());
                        }
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
        caches.open(CACHE_NAME)
            .then(cache => cache.match('/index.html'))
            .then(hasIndex => {
                if (!hasIndex) return undefined;

                return caches.keys().then(keys => Promise.all(
                    keys.map(key => {
                        if (key !== CACHE_NAME) return caches.delete(key);
                    })
                ));
            })
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;
    const requestUrl = new URL(event.request.url);
    if (requestUrl.origin !== location.origin) return;

    if (requestUrl.searchParams.has('offline-check')) {
        event.respondWith(
            fetch(event.request, {
                cache: 'no-store',
                redirect: 'follow',
            }).catch(() => {
                notifyClientsOffline();
                return new Response('offline', {
                    status: 503,
                    headers: { 'content-type': 'text/plain; charset=utf-8' },
                });
            })
        );
        return;
    }

    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(requestUrl.href, {
                cache: 'no-store',
                credentials: 'same-origin',
                redirect: 'follow',
            }).then(async networkRes => {
                if (!networkRes || !networkRes.ok) return networkRes;

                const clean = await cleanResponse(networkRes);
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(requestUrl.pathname, clean.clone());
                    if (requestUrl.pathname === '/') {
                        cache.put('/index.html', clean.clone());
                    }
                });
                return clean;
            }).catch(() => {
                notifyClientsOffline();
                return cacheFallback(event.request);
            })
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;

            return fetch(event.request).then(async networkRes => {
                if (!networkRes || networkRes.status !== 200) return networkRes;

                const clean = await cleanResponse(networkRes);
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, clean.clone()));
                return clean;
            }).catch(() => {
                notifyClientsOffline();
                return caches.match(event.request).then(cached => cached || assetFallback(event.request));
            })
        })
    );
});

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
