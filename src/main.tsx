import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

let deferredPrompt: any;

const Root = () => {
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    // Listen for the 'beforeinstallprompt' event
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault(); // Prevent the default prompt
      deferredPrompt = e;  // Store the event for later
      setShowInstall(true); // Show the install button
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    // Show the install prompt when the user clicks the "Install" button
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt
      deferredPrompt.userChoice
        .then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
          deferredPrompt = null; // Reset the prompt
          setShowInstall(false); // Hide the install button
        })
        .catch((err: any) => console.log('Error during install prompt:', err));
    }
  };

  // Register Service Worker
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
