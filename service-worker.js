/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-2c919af';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./labyrint_sveta_a_raj_srdce_001.html","./labyrint_sveta_a_raj_srdce_002.html","./labyrint_sveta_a_raj_srdce_003.html","./labyrint_sveta_a_raj_srdce_004.html","./labyrint_sveta_a_raj_srdce_005.html","./labyrint_sveta_a_raj_srdce_006.html","./labyrint_sveta_a_raj_srdce_007.html","./labyrint_sveta_a_raj_srdce_008.html","./labyrint_sveta_a_raj_srdce_009.html","./labyrint_sveta_a_raj_srdce_010.html","./labyrint_sveta_a_raj_srdce_011.html","./labyrint_sveta_a_raj_srdce_012.html","./labyrint_sveta_a_raj_srdce_013.html","./labyrint_sveta_a_raj_srdce_014.html","./labyrint_sveta_a_raj_srdce_015.html","./labyrint_sveta_a_raj_srdce_016.html","./labyrint_sveta_a_raj_srdce_017.html","./labyrint_sveta_a_raj_srdce_018.html","./labyrint_sveta_a_raj_srdce_019.html","./labyrint_sveta_a_raj_srdce_020.html","./labyrint_sveta_a_raj_srdce_021.html","./labyrint_sveta_a_raj_srdce_022.html","./labyrint_sveta_a_raj_srdce_023.html","./labyrint_sveta_a_raj_srdce_024.html","./labyrint_sveta_a_raj_srdce_025.html","./labyrint_sveta_a_raj_srdce_026.html","./labyrint_sveta_a_raj_srdce_027.html","./labyrint_sveta_a_raj_srdce_028.html","./labyrint_sveta_a_raj_srdce_029.html","./labyrint_sveta_a_raj_srdce_030.html","./labyrint_sveta_a_raj_srdce_031.html","./labyrint_sveta_a_raj_srdce_032.html","./labyrint_sveta_a_raj_srdce_033.html","./labyrint_sveta_a_raj_srdce_034.html","./labyrint_sveta_a_raj_srdce_035.html","./labyrint_sveta_a_raj_srdce_036.html","./labyrint_sveta_a_raj_srdce_037.html","./labyrint_sveta_a_raj_srdce_038.html","./labyrint_sveta_a_raj_srdce_039.html","./labyrint_sveta_a_raj_srdce_040.html","./labyrint_sveta_a_raj_srdce_041.html","./labyrint_sveta_a_raj_srdce_042.html","./labyrint_sveta_a_raj_srdce_043.html","./labyrint_sveta_a_raj_srdce_044.html","./labyrint_sveta_a_raj_srdce_045.html","./labyrint_sveta_a_raj_srdce_046.html","./labyrint_sveta_a_raj_srdce_047.html","./labyrint_sveta_a_raj_srdce_048.html","./labyrint_sveta_a_raj_srdce_049.html","./labyrint_sveta_a_raj_srdce_050.html","./labyrint_sveta_a_raj_srdce_051.html","./labyrint_sveta_a_raj_srdce_052.html","./labyrint_sveta_a_raj_srdce_053.html","./labyrint_sveta_a_raj_srdce_054.html","./labyrint_sveta_a_raj_srdce_055.html","./labyrint_sveta_a_raj_srdce_056.html","./labyrint_sveta_a_raj_srdce_057.html","./labyrint_sveta_a_raj_srdce_058.html","./labyrint_sveta_a_raj_srdce_059.html","./labyrint_sveta_a_raj_srdce_060.html","./labyrint_sveta_a_raj_srdce_061.html","./labyrint_sveta_a_raj_srdce_062.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image003.jpg","./resources/image004.jpg","./resources/obalka_labyrint_sveta_a_raj_srdce2.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
