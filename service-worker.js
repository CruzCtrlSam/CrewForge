const CACHE_NAME = "crewforge-v151";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./foundation-progress.js",
  "./script.js",
  "./manifest.webmanifest",
  "./assets/crewforge-app-icon.png",
  "./assets/crewforge-logo-lockup.png",
  "./assets/crewforge-favicon.png",
  "./assets/laurel-wind-foundation-map.jpg",
  "./assets/badge-auto-bender.png",
  "./assets/badge-overhead-crane.png",
  "./assets/badge-double-bender.png",
  "./assets/badge-radius-bender.png",
  "./assets/badge-rebar-bender.png",
  "./assets/badge-shear-line.png",
  "./assets/badge-spiral-bender.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html")))
  );
});
