import { useState } from "react";

function Admin() {

  const [names, setNames] = useState([]);



  /*
    useEffect(() => {
    axios.get("api/names")
      .then(res => setNames(res.data));
  }, []);
  
  return (
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

        <div className="wrapper">
          {/* Bloque de Información en Verde Primary */}
          <div className="info-card">
            <div className="info-section">
              <div className="icon-circle"></div>
              <div className="info-text">

              </div>
            </div>

            <div className="info-section">
              <div className="info-text">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>

                  <div className="rect-sutil">
                    <p>Este es un rectángulo con borde fino, ideal para datos simples.</p>
                  </div>

                </div>
              </div>
            </div>

            <link className="btn-cta-maps"></link>

          </div>

          {/* Bloque del Mapa */}
          <div className="map-container-pro">

          </div>
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


        <div className="wrapper">
          {/* Bloque de Información en Verde Primary */}
          <div className="info-card">
            <div className="info-section">
              <div className="icon-circle"></div>
              <div className="info-text">

              </div>
            </div>

            <div className="info-section">
              <div className="info-text">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>

                  <div className="rect-sutil">
                    <p>Este es un rectángulo con borde fino, ideal para datos simples.</p>
                  </div>

                </div>
              </div>
            </div>

            <link className="btn-cta-maps"></link>

          </div>

          {/* Bloque del Mapa */}
          <div className="map-container-pro">

          </div>
        </div>

      </section>


                                     
      <section className="testimonials-section">
        <h2>Gestión de Comentarios</h2>
        <p className="subtitle">Revise y modere los comentarios de los clientes.</p>
        <ul>
          <li>Ver todos los comentarios recibidos</li>
          <li>Aprobar o rechazar comentarios</li>
          <li>Responder a comentarios de clientes</li>
        </ul>
        </section>
        </>
  )
}
export default Admin;