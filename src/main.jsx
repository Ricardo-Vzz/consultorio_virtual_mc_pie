import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App.jsx'
import './styles/prueba.css'
import './styles/cita.css'
import './styles/nav.css'
import './styles/inicio.css'
import './styles/faq.css'
import './styles/servicios.css'
import './styles/contacto.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);