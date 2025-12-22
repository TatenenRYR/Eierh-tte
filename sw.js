const CACHE_NAME = 'radlmap-v2-tiles';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
];

// Installation & Static Caching
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

// Smarte Fetch-Strategie: Stale-While-Revalidate
// Erklärt: Zeige sofort das alte Bild (Cache), lade im Hintergrund das neue.
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Spezielles Caching für Karten-Kacheln (OpenStreetMap Tiles)
  if (url.hostname.includes('tile.openstreetmap.org')) {
    event.respondWith(
      caches.open('map-tiles').then((cache) => {
        return cache.match(event.request).then((response) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
          return response || fetchPromise; // Cache-Hit oder Netzwerk
        });
      })
    );
  } else {
    // Standard für Rest: Netzwerk mit Fallback auf Cache
    event.respondWith(
      caches.match(event.request).then((res) => res || fetch(event.request))
    );
  }
});
