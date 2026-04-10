//importar librerias
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// importar paginas
import Home from './pages/home.jsx'
import Cita from './pages/cita.jsx'
import Servicios from './pages/servicios.jsx'
import Portafolio from './pages/portafolio.jsx'
import FAQ from './pages/fac.jsx'
import Contacto from './pages/contacto.jsx'
import Pagexist from './pages/pagexist.jsx'

//importar paginas de admin
import Login from './pages/login.jsx'
import User from './pages/user.jsx'
import Admin from './pages/admin.jsx'

//importar componentes
import MainLayaut from './layauts/main_layaut.jsx'
import { AuthProvider } from './components/auth_context.jsx';

function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayaut />} >
                        <Route index element={<Home />} />
                        <Route path="/cita" element={<Cita />} />
                        <Route path="/servicios" element={<Servicios />} />
                        <Route path="/portafolio" element={<Portafolio />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/contacto" element={<Contacto />} />
                        <Route path="/*" element={<Pagexist />} />

                        {/*rutas de admin*/}
                        <Route path="/login" element={<Login />} />
                        <Route path="/user" element={<User />} />
                        <Route path="/admin" element={<Admin />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;