import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";

function Login() {
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

            <form className="login-form">
              <div className="input-group">
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" placeholder="Tu contraseña aquí" required autoComplete="current-password"></input>
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