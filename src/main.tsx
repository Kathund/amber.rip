import App from './App.tsx';
import LocalStorageProvider from './contexts/localStorage/LocalStorageProvider.tsx';
import SettingsProvider from './contexts/settings/SettingsProvider.tsx';
import { BrowserRouter } from 'react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LocalStorageProvider>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </LocalStorageProvider>
    </BrowserRouter>
  </StrictMode>
);
