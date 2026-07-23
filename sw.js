const CACHE_NAME = 'absen-gkpi-v1';
const urlsToCache = [
  './index.html',
  './admin.html',
  './manifest.json',
  'https://upload.wikimedia.org/wikipedia/id/0/0d/Logo_GKPI.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response; // Kembalikan dari cache jika ada
        return fetch(event.request);   // Jika tidak, ambil dari internet
      })
  );
});