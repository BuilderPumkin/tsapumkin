// PUMKIN.DEV Service Worker - Offline Cache & Performance
const CACHE_NAME = "pumkin-cache-v4.2.0";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./TSA_do_an.html",
  "./so_tay_kien_thuc.html",
  "./manifest.webmanifest",
  "./data/manifest.json",
  "./data/questions/all.json",
  "./data/exams/all.json",
  "./data/knowledge/all.json",
  "./data/skills/skills.json",
  "./data/taxonomy/topics.json",
  "./data/formulas/cheatsheet.json",
  "./js/ai/TutorContextBuilder.js",
  "./js/ui/TutorUI.js",
  "./js/integration/TutorIntegration.js",
  "./css/tutor.css"
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

  const url = new URL(event.request.url);

  // 1. NEVER intercept or cache serverless API calls
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // 2. Network-First strategy for HTML files and main scripts (instant updates)
  const isHtmlOrScript = event.request.mode === 'navigate' ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('/') ||
    url.pathname.endsWith('index_script.js');

  if (isHtmlOrScript) {
    event.respondWith(
      fetch(event.request).then((response) => {
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      }).catch(() => {
        // Offline fallback
        return caches.match(event.request).then((cached) => {
          return cached || caches.match("./index.html");
        });
      })
    );
    return;
  }

  // 3. Stale-While-Revalidate for static assets (images, data, styles)
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request).then((response) => {
        if (response && response.status === 200 && response.type === "basic") {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      }).catch(() => null);

      return cached || fetchPromise;
    })
  );
});
