import { Link } from "react-router-dom";
import { useAuth } from "./auth_context";

function NavbarAdmin() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar-admin">
      <div className="cta-buttons">
       <Link to="/" onClick={logout} className="btn btn-secondary"> Cerrar Sesión</Link>
       </div>
    </nav>
  );
}

export default NavbarAdmin;