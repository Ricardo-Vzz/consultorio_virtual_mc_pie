import { useAuth } from "./auth_context";

function NavbarAdmin() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar-admin">
        <button className="btn-logout" onClick={logout}>
          Cerrar Sesión
        </button>
    </nav>
  );
}

export default NavbarAdmin;