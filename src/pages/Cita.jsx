import { useState } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";
import Calendar from "react-calendar";
import api from "../api/api";

function Cita() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(new Date());
  const [selectedService, setSelectedService] = useState(null);

  const [formData, setFormData] = useSessionStorage("registro_cita", {
    paso: 1,
    nombre: "",
    apellido: "",
    servicio: "",
    fecha: "",
    hora: "",
    edad: "",
    email: "",
    telefono: "",
    tiene_diabetes: "false",
    problemas_circulacion: "false",
    alergias: ""
  });

  const horarios = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"]

  /* =====================
     MANEJADORES
  ====================== */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const seleccionarServicio = (service) => {
    setSelectedService(service);
    setFormData({ ...formData, servicio: service });
  };

  const handleChangeDate = (selectedDate) => {
    setDate(selectedDate);
    setFormData((prev) => ({
      ...prev,
      fecha: selectedDate.toISOString().split("T")[0]
    }));
  };


  const handleSelectHour = (horaSeleccionada) => {
    setFormData((prev) => ({ ...prev, hora: horaSeleccionada }));
  }

  const buildFechaHoraTimestamp = () => {
    const [hours, minutes] = (formData.fecha);
    const fechaHora = new Date(formData.fecha);
    fechaHora.setHours(hours, minutes, 0, 0);
    return fechaHora.toString();
  };


  const nextStep = () => setFormData({ ...formData, paso: formData.paso + 1 });
  const prevStep = () => setFormData({ ...formData, paso: formData.paso - 1 });

  /* =====================
     SUBMIT CON AXIOS
  ====================== */
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const fecha_hora = buildFechaHoraTimestamp();

      const response = await api.post("/create", {
        nombre: formData.nombre,
        apellidos: formData.apellido,
        correo: formData.correo,
        telefono: formData.telefono,
        edad: formData.edad,
        tiene_diabetes: formData.tiene_diabetes,
        problemas_circulacion: formData.problemas_circulacion,
        alergias: formData.alergias,
        servicio: formData.servicio,
        fecha_hora
      });

      console.log("Respuesta API:", response.data);

      sessionStorage.removeItem("registro_cita");
      setSelectedService(null);
      setFormData({
        paso: 1,
        nombre: "",
        apellido: "",
        servicio: "",
        fecha: "",
        hora: "",
        edad: "",
        correo: "",
        telefono: "",
        tiene_diabetes: false,
        problemas_circulacion: false,
        alergias: ""
      });

      alert("Cita agendada con éxito");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "No se pudo agendar la cita.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="testimonials-section" onSubmit={handleSubmit}>

        {/* PASO 1 */}
        {formData.paso === 1 && (
          <section>
            <h2>Seleccione un Servicio</h2>
            <p className="subtitle">Eliga el servico que requiera.</p>

            <progress className="var-progress" value={(formData.paso)} max="4"></progress>

            <p className="author margin">Paso {formData.paso} de 4</p>
            <div className="testimonials-grid">

              <button className="service-button" onClick={() => seleccionarServicio("Consulta General")}>
                <div className={`service-card card-consulta ${selectedService === `Consulta General` ? `selected` : ``}`}>
                  <div className="card-icon-wrapper"><img src="/consulta.png" className="icon-menu" /></div>
                  <p className="card-title">Consulta General</p>
                </div>
              </button>

              <button className="service-button" onClick={() => seleccionarServicio("Uñas")}>
                <div className={`service-card card-unas ${selectedService === `Uñas` ? `selected` : ``}`}>
                  <div className="card-icon-wrapper"><img src="/tratamiento.png" className="icon-menu" /></div>
                  <p className="card-title">Tratamiento de Uñas</p>
                </div>
              </button>

              <button className="service-button" onClick={() => seleccionarServicio("Plantillas")}>
                <div className={`service-card card-ortopedico ${selectedService === `Plantillas` ? `selected` : ``}`}>
                  <div className="card-icon-wrapper"><img src="/plantilla.png" className="icon-menu" /></div>
                  <p className="card-title">Plantillas Ortopedicas</p>
                </div>
              </button>

              <button className="service-button" onClick={() => seleccionarServicio("Pie Diabetico")}>
                <div className={`service-card card-diabetico ${selectedService === `Pie Diabetico` ? `selected` : ``}`}>
                  <div className="card-icon-wrapper"><img src="/diabetico.png" /></div>
                  <p className="card-title">Pie Diabetico</p>
                </div>
              </button>

              <button className="service-button" onClick={() => seleccionarServicio("Quiropodia")}>
                <div className={`service-card card-quiropodia ${selectedService === `Quiropodia` ? `selected` : ``}`}>
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

            <div className="calendar-container">
              <div className="calendar-section">
                <Calendar
                  minDate={new Date()}
                  onChange={handleChangeDate}
                  value={date}
                />
              </div>

              <div className="time-section">
                <label className="time-title">Hora disponible</label>
                <div className="time-grid">
                  {horarios.map((hora) => (
                    <button
                      key={hora}
                      className={`time-slot ${formData.hora === hora ? "active" : ""}`}
                      onClick={() => handleSelectHour(hora)}
                    >
                      {hora}
                    </button>
                  ))}
                </div>
              </div>
            </div>

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
              name="apellido"
              value={formData.apellido}
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