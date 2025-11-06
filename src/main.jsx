import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import Home from './Home.jsx'
import Cita from './Cita.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cita" element={<Cita />} />

         {/* Agregar los jsx de los diferentes elementos*/}
        <Route path="/servicios" element={<h1>Servicios</h1>} />
        <Route path="/portafolio" element={<h1>Portafolio</h1>} />
        <Route path="/faq" element={<h1>Preguntas Frecuentes</h1>} />
        <Route path="/contacto" element={<h1>Contacto</h1>} />
      </Routes>
  </BrowserRouter>
);