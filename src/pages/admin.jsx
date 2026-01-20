import { useState } from "react";

function Admin() {

  const [names, setNames] = useState([]);

  useEffect(() => {
    axios.get("api/names")
      .then(res => setNames(res.data));
  }, []);

  /*return (
    <ul>
      {names.map(n => (
        <li key={n.id}>{n.nombre}</li>
      ))}
    </ul>
  );
  }*/



  return (
    <>
      {/* seccion de lectura de citas */}
      <section className="testimonials-section">
        <h2>Panel de Administrador</h2>
        <p className="subtitle">Gestione las citas y servicios desde este panel.</p>
        <ul>
          <li>Citas programadas</li>
          <li>Modificar o cancelar citas</li>
        </ul>


            <div className="testimonials-grid">
            
            <button onClick={() => seleccionarServicio("inactivo")}>
              <div className={` ${selectedService === '' ? 'seleccionado' : ''}`}>
                <p className="card-title">Consulta General</p>
              </div>
            </button>

            <button className="item-seleccionable" onClick={() => seleccionarServicio("inactivo")}>
              <div className={`service-card card-unas ${selectedService === 'Uñas' ? 'seleccionado' : ''}`}>
                <p className="card-title">Tratamiento de Uñas</p>
              </div>
            </button>
            </div>

      </section>

      {/* seccion de contadores */}
      <section className="testimonials-section">
        <h2>Contadores</h2>
        <p className="subtitle">Contadores de servicios y clientes.</p>
        <ul>
          <li>Contador de visitantas

          </li>
        </ul>
      </section>

      {/* seccion de gestion de comentarios */}
      <section className="testimonials-section">
        <h2>Gestión de Comentarios</h2>
        <p className="subtitle">Revise y modere los comentarios de los clientes.</p>
        <ul>
          <li>Ver todos los comentarios recibidos</li>
          <li>Aprobar o rechazar comentarios</li>
          <li>Responder a comentarios de clientes</li>
        </ul>

        <nav className="nav">
          <ul className="nav-list">

            <li>
              <details className="nav-item">
                <summary className="faq-header">
                  <span>Servicios</span>
                  <span className="arrow">›</span>
                </summary>
                <div className="faq-body">
                  <p>
                    respuesta.
                  </p>
                </div>
              </details>
            </li>
            
            <li>
              <details className="nav-item">
                <summary className="faq-header">
                  <span>Servicios</span>
                  <span className="arrow">›</span>
                </summary>
                <div className="faq-body">
                  <p>
                    respuesta.
                  </p>
                </div>
              </details>
            </li>

          </ul>
        </nav>
      </section>

    </>
  )
}
export default Admin;