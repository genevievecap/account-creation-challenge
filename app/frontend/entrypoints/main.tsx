import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from '../router.tsx';
import { AccountProvider } from '../providers/AccountProvider/index.tsx';
import '../tailwind.css';

ReactDOM.createRoot(document.getElementById('vite-app')!).render(
  <React.StrictMode>
    <AccountProvider>
      <Router />
    </AccountProvider>
  </React.StrictMode>
);
