import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from '../router.tsx';
import { AccountProvider } from '../providers/AccountProvider/index.tsx';
import '../tailwind.css';
import { AlertProvider } from '../providers/AlertProvider/index.tsx';

ReactDOM.createRoot(document.getElementById('vite-app')!).render(
  <React.StrictMode>
    <AccountProvider>
      <AlertProvider>
        <Router />
      </AlertProvider>
    </AccountProvider>
  </React.StrictMode>
);
