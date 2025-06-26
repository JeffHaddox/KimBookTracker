const CACHE_NAME = 'booktracker-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.tailwindcss.com'
];

// Install Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch Event
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate Service Worker
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline functionality
self.addEventListener('sync', function(event) {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Sync data when back online
  console.log('Background sync triggered');
}

// Push notifications (for future features)
self.addEventListener('push', function(event) {
  const options = {
    body: 'You have new book recommendations!',
    icon: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=128&h=128&fit=crop',
    badge: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=72&h=72&fit=crop',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Recommendations',
        icon: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=128&h=128&fit=crop'
      },
      {
        action: 'close',
        title: 'Close',
        icon: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=128&h=128&fit=crop'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('BookTracker', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});