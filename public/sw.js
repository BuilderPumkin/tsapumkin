// PUMKIN.DEV Service Worker - Offline Cache & Performance
const CACHE_NAME = "pumkin-cache-v2.0.0";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./TSA_do_an.html",
  "./manifest.webmanifest",
  "./data/manifest.json",
  "./data/questions/all.json",
  "./data/exams/all.json",
  "./data/knowledge/all.json",
  "./data/skills/skills.json",
  "./data/taxonomy/topics.json",
  "./data/formulas/cheatsheet.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn("Pre-cache incomplete (continuing):", err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      }).catch(() => {
        // Offline fallback
        return caches.match("./index.html");
      });
    })
  );
});
