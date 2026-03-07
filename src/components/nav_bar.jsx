import { Link } from "react-router-dom";

function Navbar () {
 return (
   <nav className="nav">
    <div className="nav-brand">McPie</div>
       <ul className="nav-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cita">Agendar Cita</Link></li>
        <li><Link to="/servicios">Servicios</Link></li>
        {/*<li><Link to="/portafolio">Portafolio</Link></li>*/}
        <li><Link to="/faq">Preguntas Frecuentes</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
       </ul>
   </nav>
 );
}

export default Navbar;