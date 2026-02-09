import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BlinkProvider, BlinkAuthProvider } from '@blinkdotnew/react';
import App from './App.tsx';
import './index.css';

function getProjectId(): string {
  const envId = import.meta.env.VITE_BLINK_PROJECT_ID;
  if (envId) return envId;
  const hostname = window.location.hostname;
  const match = hostname.match(/^([^.]+)\.sites\.blink\.new$/);
  if (match) return match[1];
  return 'demo-project';
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BlinkProvider 
      projectId={getProjectId()}
      publishableKey={import.meta.env.VITE_BLINK_PUBLISHABLE_KEY}
    >
      <BlinkAuthProvider>
        <App />
      </BlinkAuthProvider>
    </BlinkProvider>
  </StrictMode>
);
