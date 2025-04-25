import { useEffect, useState } from 'react';
import './index.css';
import {
  requestFirebaseNotificationPermission,
  onMessageListener
} from './firebase';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [notification, setNotification] = useState<any>(null);

  useEffect(() => {
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));

    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    });

    onMessageListener().then((payload) => {
      console.log('Foreground Notification:', payload);
      setNotification(payload);
    });
  }, []);

  const handleNotify = () => {
    requestFirebaseNotificationPermission();
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

      <button onClick={handleNotify}>Enable Notifications</button>

      {notification && (
        <div className="notification-box">
          <strong>{notification?.notification?.title}</strong>
          <p>{notification?.notification?.body}</p>
        </div>
      )}

      {showInstallButton && (
        <button className="install-btn" onClick={handleInstall}>
          📲 Install App
        </button>
      )}
    </div>
  );
}

export default App;
