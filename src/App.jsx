import { BrowserRouter, Routes, Route} from 'react-router-dom';

// importar paginas
import Home from './pages/Home.jsx'
import Cita from './pages/Cita.jsx'

//importar componentes
import Navbar from './components/Navbar.jsx'
import Breadcrums from './components/Breadcrums.jsx'

function App (){
    return (
    <BrowserRouter>
        <Navbar />
        {/*<Breadcrums />*/}
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cita" element={<Cita />} />

                {/* Agregar los jsx de los diferentes elementos*/}
                <Route path="/servicios" element={<h1>Servicios</h1>} />
                <Route path="/portafolio" element={<h1>Portafolio</h1>} />
                <Route path="/faq" element={<h1>Preguntas Frecuentes</h1>} />
                <Route path="/contacto" element={<h1>Contacto</h1>} />
            </Routes>
        </main>
    </BrowserRouter>
    );
}

export default App;