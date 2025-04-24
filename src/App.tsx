import { useEffect, useState } from 'react';
import './index.css';

function App() {
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

{!isOnline && (
  <div className="toast">
    ⚠️ You're currently offline
  </div>
)}

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
}

export default App;
