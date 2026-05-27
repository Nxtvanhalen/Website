// Dynamic cache versioning with timestamp
// v3.0.0 invalidates all v2 caches — required because per-request CSP nonces mean
// any previously cached HTML now ships with a stale nonce that won't match the
// current response's CSP header, causing the browser to block every framework script.
const CACHE_VERSION = 'v3.0.0';
const CACHE_NAME = `clb-consultancy-${CACHE_VERSION}-${Date.now()}`;

// Different cache names for different content types
const CACHES = {
  static: `${CACHE_NAME}-static`,
  pages: `${CACHE_NAME}-pages`,
  images: `${CACHE_NAME}-images`,
  api: `${CACHE_NAME}-api`
};

// Page HTML is never cached (see CACHE_VERSION comment). Pre-cache only non-HTML
// assets the site needs to function offline (manifest, etc).
const STATIC_CACHE_URLS = [
  '/manifest.json'
];

// Cache strategies for different URL patterns
const CACHE_STRATEGIES = {
  pages: 'stale-while-revalidate',
  static: 'cache-first',
  images: 'cache-first',
  api: 'network-first'
};

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');

  event.waitUntil(
    Promise.all([
      // Cache static resources
      caches.open(CACHES.static).then(cache => {
        console.log('[SW] Caching static resources');
        return cache.addAll(STATIC_CACHE_URLS);
      }),
      // Skip waiting to activate immediately
      self.skipWaiting()
    ]).catch(error => {
      console.error('[SW] Failed to cache resources during install:', error);
    })
  );
});

// Activate event - cleanup old caches and take control
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');

  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        const deletePromises = cacheNames.map(cacheName => {
          // Keep current caches, delete everything else
          if (!Object.values(CACHES).includes(cacheName)) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        });
        return Promise.all(deletePromises);
      }),
      // Take control of all pages immediately
      self.clients.claim()
    ]).catch(error => {
      console.error('[SW] Failed during activation:', error);
    })
  );
});

// Fetch event - implement smart caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle requests from our origin
  if (url.origin !== location.origin) {
    return;
  }

  // Bypass service worker for non-GET requests (except navigations)
  if (request.method !== 'GET') {
    return;
  }

  // Determine cache strategy based on request type
  if (request.destination === 'image') {
    event.respondWith(handleImageRequest(request));
  } else if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request));
  } else if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(handleStaticAssetRequest(request));
  } else if (request.mode === 'navigate') {
    event.respondWith(handlePageRequest(request));
  } else {
    event.respondWith(handleGenericRequest(request));
  }
});

// Image caching strategy - cache first with long TTL
async function handleImageRequest(request) {
  try {
    const cache = await caches.open(CACHES.images);
    const cached = await cache.match(request);

    if (cached) {
      return cached;
    }

    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[SW] Image request failed:', error);
    return new Response('Image unavailable', { status: 503 });
  }
}

// API caching strategy - network first with fallback
async function handleApiRequest(request) {
  try {
    const cache = await caches.open(CACHES.api);

    try {
      const response = await fetch(request);
      if (response.status === 200) {
        // Only cache GET requests
        if (request.method === 'GET') {
          const responseToCache = response.clone();
          setTimeout(() => cache.delete(request), 5 * 60 * 1000);
          cache.put(request, responseToCache);
        }
      }
      return response;
    } catch (networkError) {
      console.log('[SW] Network failed, trying cache for API request');
      const cached = await cache.match(request);
      if (cached) {
        return cached;
      }
      throw networkError;
    }
  } catch (error) {
    console.error('[SW] API request failed:', error);
    return new Response(JSON.stringify({
      error: 'Service temporarily unavailable',
      offline: true
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Static asset caching - cache first with versioning
async function handleStaticAssetRequest(request) {
  try {
    const cache = await caches.open(CACHES.static);
    const cached = await cache.match(request);

    if (cached) {
      return cached;
    }

    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[SW] Static asset request failed:', error);
    return new Response('Asset unavailable', { status: 503 });
  }
}

// Page caching strategy — network-only.
// Pages carry per-request CSP nonces baked into framework <script nonce="..."> tags.
// Caching the HTML would mean the next visitor sees stale nonces that don't match
// the current response's CSP header → all framework scripts blocked by 'strict-dynamic'.
// Network failure falls back to the synthesized offline page (also un-cached).
async function handlePageRequest(request) {
  try {
    return await fetch(request);
  } catch (error) {
    console.log('[SW] Network failed for page request, serving offline page');
    return getOfflinePage();
  }
}

// Generic request handler
async function handleGenericRequest(request) {
  try {
    const cache = await caches.open(CACHES.static);
    const cached = await cache.match(request);

    if (cached) {
      return cached;
    }

    const response = await fetch(request);
    if (response.status === 200 && request.method === 'GET') {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[SW] Generic request failed:', error);
    return new Response('Resource unavailable', { status: 503 });
  }
}

// Offline fallback page
function getOfflinePage() {
  return new Response(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Offline — Chris Lee Bergstrom</title>
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
          background: #1E1E1E; 
          color: #ffffff; 
          text-align: center; 
          padding: 2rem;
          margin: 0;
        }
        .container { 
          max-width: 500px; 
          margin: 0 auto; 
          padding-top: 20vh;
        }
        h1 { color: #9370DB; margin-bottom: 1rem; }
        p { opacity: 0.8; line-height: 1.6; }
        .retry-btn {
          background: #9370DB;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          cursor: pointer;
          margin-top: 1rem;
          font-size: 16px;
        }
        .retry-btn:hover { background: #7B5FCB; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>You're Offline</h1>
        <p>It looks like you're not connected to the internet. Please check your connection and try again.</p>
        <button class="retry-btn" onclick="window.location.reload()">Try Again</button>
      </div>
    </body>
    </html>
  `, {
    status: 200,
    headers: { 'Content-Type': 'text/html' }
  });
}

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Notify clients when service worker updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_VERSION });
  }
});

console.log('[SW] Service worker script loaded successfully');