const CACHE = 'knowledge-trial-v1';
const FILES = ['./', './index.html', './manifest.json'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request).catch(() =>
        caches.match('./index.html')
      )
    )
  );
});
