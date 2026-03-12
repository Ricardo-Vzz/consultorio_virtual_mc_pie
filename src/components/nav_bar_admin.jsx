import { useNavigate } from "react-router-dom";

function NavbarAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <nav className="navbar-admin">
      <button onClick={handleLogout} className="btn-logout">
        Cerrar Sesión
      </button>
    </nav>
  );
}

export default NavbarAdmin;