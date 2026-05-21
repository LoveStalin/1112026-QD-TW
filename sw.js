const CACHE_NAME="portfolio"
//CACHE
const FILES_TO_CACHE= [
    "/",
    "/index.html",
    "/style.css",
    "/script.js",
    "/about.html",
    "/about.css",
    "/about.js",
    "/timeline.html",
    "/timeline.css",
    "/timeline.js",
    "/contact.html",
    "/contact.css",
    "/contact.js",
    "/project.html",
    "/project.css",
    "/project.js",
];
self.addEventListener("install",(event) => { 
    event.waitUntil(
caches.open(CACHE_NAME)
.then(cache=>
    cache.addAll(FILES_TO_CACHE))
    );
});
self.addEventListener("fetch",(event) => { 
    event.respondWith(
        catches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        })
    );
});