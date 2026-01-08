/**
 * ThinkFlow AI - Service Worker
 * Enables offline functionality and caching
 */

const CACHE_NAME = 'thinkflow-v10';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/app.js',
    '/js/db.js',
    '/js/state.js',
    '/js/ai.js',
    '/js/utils.js',
    '/js/templates.js',
    '/js/affiliate.js',
    '/js/amazon-research.js',
    '/js/analytics.js',
    '/js/product-database.js',
    '/data/products.csv',
    '/manifest.json'
];

const CDN_ASSETS = [
    'https://cdn.jsdelivr.net/npm/dexie@3.2.4/dist/dexie.min.js',
    'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js',
    'https://cdn.jsdelivr.net/npm/lz-string@1.5.0/libs/lz-string.min.js',
    'https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // Cache static assets
            cache.addAll(STATIC_ASSETS);
            // Try to cache CDN assets (may fail due to CORS)
            CDN_ASSETS.forEach(url => {
                fetch(url)
                    .then(response => {
                        if (response.ok) {
                            cache.put(url, response);
                        }
                    })
                    .catch(() => {
                        // Ignore CDN caching failures
                    });
            });
        })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    
    // Don't cache API calls
    if (url.hostname.includes('api.') || 
        url.hostname.includes('deepseek') || 
        url.hostname.includes('openai') ||
        url.hostname.includes('anthropic')) {
        event.respondWith(fetch(event.request));
        return;
    }
    
    // Cache-first strategy for static assets
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // Return cached version and update cache in background
                fetch(event.request).then((response) => {
                    if (response.ok) {
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, response);
                        });
                    }
                }).catch(() => {});
                
                return cachedResponse;
            }
            
            // Not in cache, fetch from network
            return fetch(event.request).then((response) => {
                // Cache successful responses
                if (response.ok) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            }).catch(() => {
                // Return offline fallback for navigation requests
                if (event.request.mode === 'navigate') {
                    return caches.match('/index.html');
                }
                return new Response('Offline', { status: 503 });
            });
        })
    );
});

// Background sync for pending changes
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-decisions') {
        // Handle background sync if needed
        console.log('Background sync triggered');
    }
});
