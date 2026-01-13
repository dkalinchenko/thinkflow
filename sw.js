/**
 * Service Worker for OptiMind - Offline Support & Asset Caching
 * Version: 1.0.0
 */

const CACHE_VERSION = 'optimind-v7';
const CACHE_ASSETS = [
    '/',
    '/app.html',
    '/index.html',
    '/css/styles.css',
    '/css/vendor/tippy.css',
    '/js/app.js',
    '/js/state.js',
    '/js/db.js',
    '/js/ai.js',
    '/js/utils.js',
    '/js/templates.js',
    '/js/affiliate.js',
    '/js/amazon-research.js',
    '/js/analytics.js',
    '/js/monitoring.js',
    '/js/tooltips.js',
    '/js/inline-edit.js',
    '/js/drag-drop.js',
    '/js/lazy-loader.js',
    '/js/vendor/popper.min.js',
    '/js/vendor/tippy.min.js',
    '/js/vendor/sortable.min.js',
    '/favicon.ico',
    '/manifest.json'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then((cache) => {
                console.log('[Service Worker] Caching assets');
                return cache.addAll(CACHE_ASSETS);
            })
            .then(() => {
                console.log('[Service Worker] Installation complete');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[Service Worker] Installation failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) => cacheName !== CACHE_VERSION)
                        .map((cacheName) => {
                            console.log('[Service Worker] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => {
                console.log('[Service Worker] Activation complete');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }
    
    // Skip external API calls (AI providers, etc.)
    const url = new URL(event.request.url);
    if (url.hostname !== self.location.hostname) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Serve from cache
                    return cachedResponse;
                }
                
                // Fall back to network
                return fetch(event.request)
                    .then((networkResponse) => {
                        // Cache successful responses
                        if (networkResponse && networkResponse.status === 200) {
                            const responseClone = networkResponse.clone();
                            
                            caches.open(CACHE_VERSION)
                                .then((cache) => {
                                    cache.put(event.request, responseClone);
                                });
                        }
                        
                        return networkResponse;
                    })
                    .catch((error) => {
                        console.error('[Service Worker] Fetch failed:', error);
                        
                        // Return offline page if available
                        if (event.request.destination === 'document') {
                            return caches.match('/offline.html');
                        }
                        
                        throw error;
                    });
            })
    );
});

// Message event - handle messages from clients
self.addEventListener('message', (event) => {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
});
