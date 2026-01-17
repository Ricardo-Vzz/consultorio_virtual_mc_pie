import { useState } from "react";
import {useSessionStorage} from "../hooks/useSessionStorage";

function Admin() {

  
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useSessionStorage("registro_cita", {
    id: null,
    nombre: "",
  });

  /* =====================
     MANEJADORES
  ====================== */

  const seleccionarServicio = (service) => {
    setSelectedService(service);
    setFormData({ ...formData, servicio: service });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* =====================
     VALIDACIONES
  ====================== */

  const validarPaso = () => {
    switch (formData.paso) {
      case 1:
        if (!formData.id) {
          alert("Seleccione una cita");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  /* =====================
     API
  ====================== */

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://TU_BACKEND_URL/api/citas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: formData.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al agendar la cita");
      }

      const data = await response.json();
      console.log("Respuesta API:", data);

      window.sessionStorage.removeItem("registro_cita");
      alert("Cita agendada con éxito");

      // Reset visual
      setSelectedService(null);

    } catch (err) {
      console.error(err);
      setError("No se pudo agendar la cita. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

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