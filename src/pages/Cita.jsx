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
                      key={hora} className={`time-slot ${formData.hora === hora ? "active" : ""}`} onClick={() => handleSelectHour(hora)}> {hora}</button>))}
                </div>
              </div>
            </div>

          </section>
        )}

        {/* PASO 3 */}
        {formData.paso === 3 && (
          <section className="form-section">
            <h2 className="form-title">Datos personales</h2>
            <p className="form-subtitle">
              Completa tus datos para confirmar la cita
            </p>

            <div className="form-grid">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Juan"
                />
              </div>

              <div className="form-group">
                <label>Apellidos</label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Pérez López"
                />
              </div>

              <div className="form-group">
                <label>Edad</label>
                <input
                  type="number"
                  name="edad"
                  value={formData.edad}
                  onChange={handleChange}
                  placeholder="30"
                />
              </div>

              <div className="form-group">
                <label>Correo electrónico</label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="correo@ejemplo.com"
                />
              </div>

              <div className="form-group full">
                <label>Teléfono celular</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="55 1234 5678"
                />
              </div>
            </div>
          </section>
        )}




        {/* PASO 4 */}
        {formData.paso === 4 && (
          <section className="confirmation-wrapper animate-fade-in">
            <div className="confirmation-header">
              <div className="check-icon">✓</div>
              <h3>Resumen de tu Cita</h3>
              <p className="subtitle">Por favor, verifica que tus datos sean correctos antes de agendar.</p>
            </div>

            <div className="ticket-container rect-elevado">
              <div className="ticket-body">

                {/* GRUPO: DETALLES DEL SERVICIO */}
                <div className="ticket-section highlight">
                  <div className="info-block">
                    <label>Servicio Seleccionado</label>
                    <p className="value-primary">{formData.servicio}</p>
                  </div>
                </div>

                {/* GRUPO: FECHA Y HORA */}
                <div className="ticket-row">
                  <div className="info-block">
                    <label>Fecha</label>
                    <p className="value-bold">{formData.fecha}</p>
                  </div>
                  <div className="info-block">
                    <label>Hora</label>
                    <p className="value-bold">{formData.hora}</p>
                  </div>
                </div>

                <hr className="ticket-divider" />

                {/* GRUPO: DATOS PERSONALES */}
                <div className="ticket-grid">
                  <div className="info-block">
                    <label>Paciente</label>
                    <p>{formData.nombre} {formData.apellidos}</p>
                  </div>
                  <div className="info-block">
                    <label>Edad</label>
                    <p>{formData.edad} años</p>
                  </div>
                  <div className="info-block">
                    <label>Correo Electrónico</label>
                    <p className="text-break">{formData.correo}</p>
                  </div>
                  <div className="info-block">
                    <label>Teléfono Celular</label>
                    <p>{formData.telefono}</p>
                  </div>
                </div>

              </div>

              {/* Mensaje de Error (si existe) */}
              {error && (
                <div className="error-box">
                  <p className="error-text">⚠️ {error}</p>
                </div>
              )}
            </div>

            <p className="confirmation-note">
              * Al confirmar, recibirás un recordatorio en tu correo electrónico.
            </p>
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