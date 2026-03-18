import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import RadMate from './RadMate.tsx';
import Contactos from './Contactos.tsx';
import Auditoria from './Auditoria.tsx';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './index.css';

const path = window.location.pathname;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {path === '/radmate' ? <RadMate /> : path === '/contactos' ? <Contactos /> : path === '/auditoria' ? <Auditoria /> : <App />}
    <Analytics />
    <SpeedInsights />
  </StrictMode>,
);
