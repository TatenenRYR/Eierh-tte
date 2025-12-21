// Name des Speichers (Cache)
const CACHE_NAME = 'radlmap-v1';

// Dateien, die offline verfügbar sein sollen (optional, aber empfohlen)
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json'
];

// 1. Installation: Dateien in den Cache laden
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Aktivierung: Alte Caches löschen
self.addEventListener('activate', (event) => {
  console.log('Service Worker aktiviert');
});

// 3. Fetch-Event: Zwingend erforderlich für den Install-Button!
// Es erlaubt der App, Anfragen abzufangen (selbst wenn sie nur durchgereicht werden).
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
