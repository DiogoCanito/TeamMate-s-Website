import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import RadMate from './RadMate.tsx';
import Contactos from './Contactos.tsx';
import './index.css';

const path = window.location.pathname;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {path === '/radmate' ? <RadMate /> : path === '/contactos' ? <Contactos /> : <App />}
  </StrictMode>,
);
