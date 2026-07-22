// CRM Zenith Group — Service Worker for Push Notifications (Zenith + Sky Lux)
const CACHE = 'crm-zenith-group-v2';

self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

// Handle notification click — focus an already-open tab of this app, or open one
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({type:'window'}).then(list => {
      for(const c of list){
        if(c.url.startsWith(self.location.origin) && 'focus' in c) return c.focus();
      }
      return clients.openWindow(self.location.origin + self.registration.scope.replace(self.location.origin,''));
    })
  );
});
