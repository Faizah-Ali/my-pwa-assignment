import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyA95rVT7wb9-6O3RsrkJPyxUMlIp819UOc",
  authDomain: "my-pwa-app-32e02.firebaseapp.com",
  projectId: "my-pwa-app-32e02",
  storageBucket: "my-pwa-app-32e02.appspot.com",
  messagingSenderId: "94238648247",
  appId: "1:94238648247:web:b3f578d683c5942a766a32",
  measurementId: "G-4D7BBNT329"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const VAPID_KEY = 'YOUR_PUBLIC_VAPID_KEY';

export const requestFirebaseNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    try {
      const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
      if (currentToken) {
        console.log('FCM Token:', currentToken);
      
      }
    } catch (err) {
      console.error('Error getting FCM token:', err);
    }
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
