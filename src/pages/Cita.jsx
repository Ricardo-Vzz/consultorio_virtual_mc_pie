import { useState } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";

function Cita() {
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useSessionStorage("registro_cita", {
    paso: 1,
    nombre: "",
    servicio: "",
    fecha: "",
    hora: "",
    apellidos: "",
    edad: "",
    correo: "",
    telefono: "",
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
        if (!formData.servicio) {
          alert("Seleccione un servicio");
          return false;
        }
        return true;

      case 2:
        if (!formData.fecha || !formData.hora) {
          alert("Seleccione fecha y hora");
          return false;
        }
        return true;
      
        case 3:
        if (!formData.nombre.trim()) {
          alert("Ingrese su nombre completo");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validarPaso()) return;
    setFormData({ ...formData, paso: formData.paso + 1 });
  };

  const prevStep = () => {
    setFormData({ ...formData, paso: formData.paso - 1 });
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
          nombre: formData.nombre,
          servicio: formData.servicio,
          fecha: formData.fecha,
          hora: formData.hora,
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

  /* =====================
     RENDER
  ====================== */

  return (
    <>
      
      <section className="testimonials-section">

        {/* PASO 1 */}
        {formData.paso === 1 && (
            <section>
            <h2>Seleccione un Servicio</h2>
            <p className="subtitle">Eliga el servico que requiera.</p>

            <progress className="var-progress" value={(formData.paso)} max="4"></progress>

            <p className="author margin">Paso {formData.paso} de 4</p>
            <div className="testimonials-grid">
            
            <button className="service-button" onClick={() => seleccionarServicio("Consulta General")}>
              <div className={`service-card card-consulta ${selectedService === 'Consulta General' ? 'selected' : ''}`}>
                <div className="card-icon-wrapper"><img src="/consulta.png" className="icon-menu" /></div>
                <p className="card-title">Consulta General</p>
              </div>
            </button>

            <button className="service-button" onClick={() => seleccionarServicio("Uñas")}>
              <div className={`service-card card-unas ${selectedService === 'Uñas' ? 'selected' : ''}`}>
                <div className="card-icon-wrapper"><img src="/tratamiento.png" className="icon-menu" /></div>
                <p className="card-title">Tratamiento de Uñas</p>
              </div>
            </button>

            <button className="service-button" onClick={() => seleccionarServicio("Plantillas")}>
              <div className={`service-card card-ortopedico ${selectedService === 'Plantillas' ? 'selected' : ''}`}>
                <div className="card-icon-wrapper"><img src="/plantilla.png" className="icon-menu" /></div>
                <p className="card-title">Plantillas Ortopedicas</p>
              </div>
            </button>

            <button className="service-button" onClick={() => seleccionarServicio("Pie Diabetico")}>
              <div className={`service-card card-diabetico ${selectedService === 'Pie Diabetico' ? 'selected' : ''}`}>
                <div className="card-icon-wrapper"><img src="/diabetico.png" /></div>
                <p className="card-title">Pie Diabetico</p>
              </div>
            </button>

            <button className="service-button" onClick={() => seleccionarServicio("Quiropodia")}>
              <div className={`service-card card-quiropodia ${selectedService === 'Quiropodia' ? 'selected' : ''}`}>
                <div className="card-icon-wrapper"><img src="/quiropodia.png" className="icon-menu" /></div>
                <p className="card-title">Quiropodia</p>
              </div>
            </button>
            </div>
          </section>
        )}

      {/* PASO 2 */}
      {formData.paso === 2 && (
        <section>
            <h2>Eliga fecha y hora disponibles</h2>
            <p className="subtitle">seleccione un día y una hora para su cita.</p>

            <progress className="var-progress" value={(formData.paso)} max="4"></progress>
            <p className="author margin">Paso {formData.paso} de 4</p>
          <label>Fecha</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
          />

          <label>Hora</label>
          <input
            type="time"
            name="hora"
            value={formData.hora}
            onChange={handleChange}
          />
        </section>
      )}

      {/* PASO 3 */}
      {formData.paso === 3 && (
        <section>
          <label>Nombre Completo</label>
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />

          <label>Apellidos</label>
          <input
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
          />

          <label>Edad</label>
          <input
            name="edad"
            value={formData.edad}
            onChange={handleChange}
          />

          <label>Correo</label>
          <input
            name="correo"
            value={formData.correo}
            onChange={handleChange}
          />

          <label>Telefono Celular</label>
          <input
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </section>
      )}
    
      {/* PASO 4 */}
      {formData.paso === 4 && (
        <section>
          <h3>Confirmación</h3>
          <p><strong>Nombre:</strong> {formData.nombre}</p>
          <p><strong>Servicio:</strong> {formData.servicio}</p>
          <p><strong>Fecha:</strong> {formData.fecha}</p>
          <p><strong>Hora:</strong> {formData.hora}</p>
          <p><strong>Apellidos:</strong> {formData.apellidos}</p>
          <p><strong>Edad:</strong> {formData.edad}</p>
          <p><strong>Correo:</strong> {formData.correo}</p>
          <p><strong>Telefono Celular:</strong> {formData.telefono}</p>

          {error && <p className="error">{error}</p>}
        </section>
      )}

      {/* BOTONES */}
      <div className="buttons">
        {formData.paso > 1 && (
          <button className="btn btn-secundary" onClick={prevStep} disabled={loading}>
            Atrás
          </button>
        )}

        {formData.paso < 4 ? (
          <button className="btn btn-primary" onClick={nextStep}>Siguiente</button>
        ) : (
          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Agendando..." : "Confirmar Cita"}
          </button>
        )}
      </div>
      </section>
    </>
  );
}

export default Cita;