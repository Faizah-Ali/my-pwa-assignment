importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js');

const firebaseConfig = {
  apiKey: 'AIzaSyA95rVT7wb9-6O3RsrkJPyxUMlIp819UOc',
  authDomain: 'my-pwa-app-32e02.firebaseapp.com',
  projectId: 'my-pwa-app-32e02',
  storageBucket: 'my-pwa-app-32e02.firebasestorage.app',
  messagingSenderId: '94238648247',
  appId: '1:94238648247:web:b3f578d683c5942a766a32',
  measurementId: 'G-4D7BBNT329'
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[Firebase Messaging] Background message received:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
