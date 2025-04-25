import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client'; 
import './index.css';
import App from './App';
import { getMessaging, getToken } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyA95rVT7wb9-6O3RsrkJPyxUMlIp819UOc',
  authDomain: 'my-pwa-app-32e02.firebaseapp.com',
  projectId: 'my-pwa-app-32e02',
  storageBucket: 'my-pwa-app-32e02.firebasestorage.app',
  messagingSenderId: '94238648247',
  appId: '1:94238648247:web:b3f578d683c5942a766a32',
  measurementId: 'G-4D7BBNT329'
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const Root = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));

    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    });

 
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Notification permission granted');
     
        getToken(messaging, { vapidKey: 'BG5Py4Anm6-RE1faUHCrv3K4vuieHIABVam75R1qQVzAF2PQYm9uCQllEEriseqjnC_kFVxXfdD3vKaLo_3jsQA' }).then((currentToken) => {
          if (currentToken) {
            console.log('Current FCM Token:', currentToken);
           
          } else {
            console.log('No token available');
          }
        }).catch((err) => {
          console.log('Error retrieving token:', err);
        });
      }
    });
  }, []);

  const handleNotify = () => {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification('Hello! You enabled notifications 🎉');
      }
    });
  };

  const handleInstall = () => {
    if (deferredPrompt && 'prompt' in deferredPrompt) {
      (deferredPrompt as any).prompt();
      (deferredPrompt as any).userChoice.then(() => {
        setShowInstallButton(false);
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div className="app">
      {!isOnline && <div className="toast">⚠️ You're currently offline</div>}

      <h1>My PWA App</h1>

      <div className={`status ${isOnline ? 'online' : 'offline'}`}>
        {isOnline ? '🟢 Online' : '🔴 Offline'}
      </div>

      <button onClick={handleNotify}>Send Notification</button>

      {showInstallButton && (
        <button className="install-btn" onClick={handleInstall}>
          📲 Install App
        </button>
      )}
    </div>
  );
};


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Root />);
