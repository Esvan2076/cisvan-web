import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app.css'
import "./i18n";
import AppRoutes from './routes/routes.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
)
