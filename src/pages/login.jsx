import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/auth_context.jsx";
import api from "../api/api";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";

function Login() {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { username, password });
      setUser(res.data.user);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <section className="testimonials-section">
      <h2>Iniciar Sesión</h2>

        <div className="modal-overlay">
          <div className="login-popup">
            <button className="close-btn"> <Link to = "/"><MdCancel/></Link></button>

            <div className="login-header">
              <div className="icon-circle">
                <i className="fas fa-lock"></i>
              </div>
              <h3>Acceso Privado</h3>
              <p>Por favor, ingresa tu contraseña para continuar.</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="username">Nombre de usuario</label>
                <input type="text" id="username" placeholder="Tu nombre de usuario" autoComplete="username" onChange={(e)=>setUsername(e.target.value)} required></input>
              </div>
              <div className="input-group">
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" placeholder="Tu contraseña" autoComplete="current-password" onChange={(e)=>setPassword(e.target.value)} required></input>
              </div>
              <button type="submit" className="btn btn-primary btn-full">Ingresar</button>
            </form>
            <div className="login-footer">
              <p>Mc. Pie - Consultorio Podológico</p>
            </div>
          </div>
        </div>
    </section >
  )
}
export default Login;