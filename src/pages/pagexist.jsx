
import { Link } from 'react-router-dom';

function Pagexist() {
  return (
    <div className="page-premium page-404">
      <div className="container">
        <div className="error-wrapper rect-elevado">
          
          <div className="status-header">
            <div className="pulse-error"></div>
            <h3>Error 404</h3>
          </div>
          
          <div className="header-pro">
            <h2>Dirección inexistente</h2>
            <p className="services-subtitle text-center">
              Lo sentimos, la página que buscas no se encuentra disponible o ha sido movida.
            </p>
          </div>

          <div className="error-visual">
            <div className="icon-circle-error">🔍</div>
          </div>

          <div className="buttons buttons-centered">
            <Link to="/" className="btn btn-primary">Volver al Inicio</Link>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Pagexist;