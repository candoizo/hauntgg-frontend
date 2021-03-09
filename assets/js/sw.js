/* eslint-env serviceworker */
// eslint-disable-next-line node/no-missing-require
const params = require('@params');
// console.log(params)
let CACHE_NAME = params.domain + '-cache-v1';
let urlsToCache = [
  '/',
  params.style,
  params.icon
];

urlsToCache = urlsToCache.map(el => '.' + el);
// Set the callback for the install step
self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
    .then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  var cacheWhitelist = [];
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) =>
        cacheWhitelist.indexOf(cacheName) === -1 && caches.delete(cacheName)
      )
    ))
  );
});

// Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // dynamically resolving the fingerprinted service worker name
    // finds this script because it's first in the <head> tag
    let me = document.querySelector('script').src;
    let src = me.substr(0, me.lastIndexOf('/') + 1);
    navigator.serviceWorker.register(src, {
      scope: '/'
    }).then((registration) => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, (err) => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
