import { Link } from "react-router-dom";
function Footer() {
    return (
        <footer className="main-footer">
        <div className="footer-content">
            <div className="footer-info">
                <h3>Mc. Pie</h3>
                <p>Cuidado integral para tus pies.</p>
                <p>&copy; 2026 Mc. Pie. Todos los derechos reservados.</p>
            </div>
            <div className="footer-links">
                <h4>Navegación</h4>
                <ul>
                    <li><Link to="/cita">Agendar Cita</Link></li>
                    <li><Link to="/servicios">Nuestros Servicios</Link></li>
                </ul>
            </div>
            <div className="footer-contact">
                <h4>Contacto</h4>
                <p>Dirección: Boulevard Rodolfo Chávez Carrillo 522, Placetas Estadio, Colima, Col.</p>
                <p>Teléfono: +52 312 154 2337</p>
                <p>Email: mcpiepodologo@gmail.com</p>
            </div>
        </div>
    </footer>
    );
}
export default Footer;