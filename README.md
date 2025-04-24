<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PWA Assignment - README</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 2rem;
      background: #f8f9fa;
      color: #333;
    }
    h1, h2 {
      color: #2c3e50;
    }
    code {
      background-color: #eef;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.95em;
    }
    ul {
      padding-left: 1.2rem;
    }
    img {
      max-width: 100%;
      height: auto;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <h1>📱 Progressive Web App Assignment</h1>

  <p>This project is a simple Progressive Web App (PWA) built using <strong>React + Vite + TypeScript</strong>. The app is installable on mobile devices and works offline using a service worker.</p>

  <h2>🔗 GitHub Repository</h2>
  <p><a href="https://github.com/Faizah-Ali/my-pwa-assignment" target="_blank">https://github.com/Faizah-Ali/my-pwa-assignment</a></p>

  <h2>🛠️ Features Implemented</h2>
  <ul>
    <li>PWA with <code>manifest.json</code></li>
    <li>Service Worker for offline support</li>
    <li>Install button using <code>beforeinstallprompt</code></li>
    <li>React + Vite + TypeScript setup</li>
    <li>Hosted on GitHub</li>
  </ul>

  <h2>📄 Steps to Configure <code>manifest.json</code></h2>
  <ol>
    <li>Created <code>manifest.json</code> inside the <code>public/</code> folder.</li>
    <li>Added app name, icons, theme color, and display mode.</li>
    <li>Linked it in <code>index.html</code>:
      <pre><code>&lt;link rel="manifest" href="/manifest.json" /&gt;</code></pre>
    </li>
  </ol>

  <h2>⚙️ Steps to Register Service Worker</h2>
  <ol>
    <li>Created <code>sw.js</code> in the <code>public/</code> folder.</li>
    <li>Added basic caching and offline support logic.</li>
    <li>Registered the service worker inside <code>index.tsx</code> using:
      <pre><code>
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () =&gt; {
    navigator.serviceWorker.register('/sw.js');
  });
}
      </code></pre>
    </li>
  </ol>

  <h2>📸 Mobile Installation Screenshots</h2>
  <p>Users can install the app by clicking the "Install App" button that appears when the app meets PWA requirements.</p>
  <p><strong>Installation Prompt:</strong></p>
  <img src="./screenshots/install-prompt.png" alt="Install Prompt" />
  <p><strong>App on Home Screen:</strong></p>
  <img src="./screenshots/installed-home-screen.png" alt="Home Screen" />

  <h2>✅ Conclusion</h2>
  <p>This project demonstrates how to make a React app a full PWA by enabling offline capabilities, providing install support, and improving mobile usability.</p>
</body>
</html>
