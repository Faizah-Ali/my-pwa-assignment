import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

let deferredPrompt: any;

const Root = () => {
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
   
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault(); 
      deferredPrompt = e;  
      setShowInstall(true); 
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    
    if (deferredPrompt) {
      deferredPrompt.prompt(); 
      deferredPrompt.userChoice
        .then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
          deferredPrompt = null; 
          setShowInstall(false); 
        })
        .catch((err: any) => console.log('Error during install prompt:', err));
    }
  };


  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            console.log('Service Worker registered:', reg);
          })
          .catch((err) => {
            console.log('Service Worker registration failed:', err);
          });
      });
    }
  }, []);

  return (
    <div>
      <App />
      {showInstall && (
        <button
          onClick={handleInstallClick}
          className="install-btn"
        >
          Install App
        </button>
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Root />
);
