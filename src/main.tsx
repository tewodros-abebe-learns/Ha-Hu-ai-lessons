import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

// Unregister legacy or stale Service Workers that may cache broken scripts on hosted domains
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      registration.unregister().catch((err) => {
        console.warn('ServiceWorker unregister error:', err);
      });
    }
  }).catch(() => {
    // Ignore service worker access errors in sandboxed environments
  });
}

// Ensure target container exists
let container = document.getElementById('root');
if (!container) {
  container = document.createElement('div');
  container.id = 'root';
  document.body.appendChild(container);
}

try {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );
} catch (mountError) {
  console.error('Fatal Ha Hu Ai mount error:', mountError);
  if (container) {
    container.innerHTML = `
      <div style="min-height: 100vh; background: #020617; color: #f8fafc; display: flex; align-items: center; justify-content: center; font-family: system-ui, -apple-system, sans-serif; padding: 20px;">
        <div style="max-width: 420px; background: #0f172a; border: 1px solid #10b981; border-radius: 20px; padding: 24px; text-align: center;">
          <h2 style="font-size: 20px; font-weight: 800; margin-bottom: 8px;">Ha Hu Ai Starting...</h2>
          <p style="font-size: 13px; color: #94a3b8; margin-bottom: 20px;">Click below to reload and initialize the application.</p>
          <button onclick="window.location.reload()" style="background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 12px; font-weight: 700; cursor: pointer;">
            Reload Application
          </button>
        </div>
      </div>
    `;
  }
}

