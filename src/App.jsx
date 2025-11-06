import { BrowserRouter, Routes, Route} from 'react-router-dom';

// importar paginas
import Home from './pages/home.jsx'
import Cita from './pages/cita.jsx'
import Servicios from './pages/servicios.jsx'
import Portafolio from './pages/portafolio.jsx'
import FAQ from './pages/fac.jsx'
import Contacto from './pages/contacto.jsx'

//importar componentes
import MainLayaut from './layauts/main_layaut.jsx'

function App (){
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element= {<MainLayaut/>} >
            <Route index element = {<Home/>} />
            <Route path="/cita" element={<Cita/>} />
            <Route path="/servicios" element={<Servicios/>} />
            <Route path="/portafolio" element={<Portafolio/>} />
            <Route path="/faq" element={<FAQ/>} />
            <Route path="/contacto" element={<Contacto/>} />
            </Route>
        </Routes>
    </BrowserRouter>
    );
}

export default App;