import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import api from "../api/api";

const Cita = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [date, setDate] = useState(new Date());
  const [ocupados, setOcupados] = useState({});

  const formatearFecha = (selectedDate) => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const [formData, setFormData] = useState({
    paso: 1,
    nombre: "",
    apellido: "",
    servicio: 0,
    fecha: formatearFecha(new Date()),
    hora: "",
    correo: "",
    telefono: "",
    tiene_diabetes: false,
    problemas_circulacion: false,
    alergias: "",
    comentarios: null,
  });

  const horarios = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"];

  /* =====================
      VALIDACIONES
  ====================== */
  const validarPaso = () => {
    setError(null);
    const regexLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const regexTelefono = /^\d{10}$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.servicio) {
      setError("Por favor, seleccione un servicio.");
      return false;
    }

    if (formData.paso === 2) {
      if (!formData.fecha || !formData.hora) {
        setError("Seleccione una fecha y una hora válida.");
        return false;
      }
      const fechaSeleccionada = new Date(`${formData.fecha}T${formData.hora}`);
      if (fechaSeleccionada < new Date()) {
        setError("No puedes agendar en el pasado.");
        return false;
      }
      if (fechaSeleccionada.getDay() === 0) {
        setError("No atendemos los domingos.");
        return false;
      }
    }
    if (formData.paso === 3) {
      if (!formData.nombre || formData.nombre.length > 100 || !regexLetras.test(formData.nombre)) {
        setError("Nombre inválido (solo letras, máx 100 caracteres).");
        return false;
      }
      if (!formData.apellido || formData.apellido.length > 100 || !regexLetras.test(formData.apellido)) {
        setError("Apellido inválido (solo letras, máx 100 caracteres).");
        return false;
      }
      if (!formData.telefono || !regexTelefono.test(formData.telefono)) {
        setError("El teléfono debe tener exactamente 10 dígitos.");
        return false;
      }
      if (formData.correo && !regexEmail.test(formData.correo)) {
        setError("El formato del correo no es válido.");
        return false;
      }
    }
    return true;
  };

  /* =====================
      MANEJADORES
  ====================== */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const seleccionarServicio = (service) => {
    setFormData({ ...formData, servicio: service });
    setError(null);
  };

  const handleChangeDate = (selectedDate) => {
    setDate(selectedDate);
    console.log();
    setFormData((prev) => ({
      ...prev,
      fecha: formatearFecha(selectedDate)
    }));
  };

  const handleSelectHour = (horaSeleccionada) => {
    setFormData((prev) => ({ ...prev, hora: horaSeleccionada }));
  };

  const nextStep = () => {
    if (validarPaso()) {
      setFormData({ ...formData, paso: formData.paso + 1 });
    }
  };

  const prevStep = () => setFormData({ ...formData, paso: formData.paso - 1 });

  //Cargar calendario y horarios disponibles
  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/agendar', { params: { fecha: formatearFecha(date) } });
        if (!Array.isArray(data)) {
          throw new Error("El formato de datos recibido no es válido.");
        }
        const mapa = data.reduce((acc, cita) => {

          const d = new Date(cita.fecha_hora);
          const fecha = d.toISOString().split("T")[0];
          const hora = d.toTimeString().slice(0, 5);

          if (!acc[fecha]) acc[fecha] = [];
          acc[fecha].push(hora);
          return acc;
        }, {});

        setOcupados(mapa);

      } catch (err) {
        setError(err.response?.data?.message || "Error al cargar horarios.");
      } finally {
        setLoading(false);
      }
    };
    fetchHorarios();
  }, []);


  const fechaSeleccionada = date?.toISOString().split("T")[0];
  const horariosOcupados = ocupados[fechaSeleccionada] || [];

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const tileDisabled = ({ date, view }) => {
    if (view == "month" && date.getDay() === 0) return true;
    const fecha = date.toISOString().split("T")[0];
    const citasDia = ocupados[fecha]?.length || 0;
    return citasDia >= horarios.length || date < hoy;
  };

  const anioActual = hoy.getFullYear();

  const esCercaAnioNuevo =
    (hoy.getMonth() === 11 && hoy.getDate() >= 11) ||
    (hoy.getMonth() === 0 && hoy.getDate() <= 20);

  const ultimoDiaAnio = new Date(anioActual, 11, 31);

  /* =====================
      ENVÍO DE CITA
  ====================== */
  const handleSubmit = async () => {
    if (!validarPaso()) return;

    setLoading(true);
    try {
      const fecha_hora = `${formData.fecha}T${formData.hora}:00`;

      const response = await api.post("/citas", {
        nombre: formData.nombre,
        apellido: formData.apellido,
        correo: formData.correo,
        telefono: formData.telefono,
        tiene_diabetes: formData.tiene_diabetes,
        problemas_circulacion: formData.problemas_circulacion,
        comentarios: null,
        alergias: formData.alergias,
        servicio: formData.servicio,
        fecha_hora: fecha_hora
      });
      setMensaje("Cita agendada con éxito");
    } catch (err) {
      setError(err.response?.data?.message || "Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-premium">
      <div className="container">
        <div className="header-pro">
          <h2>Agendar una Cita</h2>
          <p>Al finalizar recuerda confirmar la cita.</p>
        </div>

        {/* Barra de Progreso */}
        <div className="progress-container">
          <progress className="var-progress" value={formData.paso} max="4"></progress>
          <p className="author">Paso {formData.paso} de 4</p>
        </div>
        
        {error && <div className="error-box"><p className="error-msg">Paso Algo: {error}</p></div>}
        {mensaje && <div className="success-box"><p className="success-msg">{mensaje}</p></div>}

        {/* PASO 1: SERVICIOS */}
        {formData.paso === 1 && (
          <div className="form-section-container">
            <h2 className="form-main-title">Seleccione un Servicio</h2>
            <p className="form-main-subtitle">Por favor, completa la información para continuar</p>

            <div className="testimonials-grid">
              <button className="service-button" onClick={() => seleccionarServicio(1)}>
                <div className={`service-card card-consulta ${formData.servicio === 1 ? `selected` : ``}`}>
                  <div className="card-icon-wrapper"><img src="/consulta.png" className="icon-menu" /></div>
                  <p className="card-title">Consulta General</p>
                </div>
              </button>
              <button className="service-button" onClick={() => seleccionarServicio(2)}>
                <div className={`service-card card-unas ${formData.servicio === 2 ? `selected` : ``}`}>
                  <div className="card-icon-wrapper"><img src="/tratamiento.png" className="icon-menu" /></div>
                  <p className="card-title">Tratamiento de Uñas</p>
                </div>
              </button>
              <button className="service-button" onClick={() => seleccionarServicio(3)}>
                <div className={`service-card card-ortopedico ${formData.servicio === 3 ? `selected` : ``}`}>
                  <div className="card-icon-wrapper"><img src="/plantilla.png" className="icon-menu" /></div>
                  <p className="card-title">Plantillas Ortopedicas</p>
                </div>
              </button>
              <button className="service-button" onClick={() => seleccionarServicio(4)}>
                <div className={`service-card card-diabetico ${formData.servicio === 4 ? `selected` : ``}`}>
                  <div className="card-icon-wrapper"><img src="/diabetico.png" /></div>
                  <p className="card-title">Pie Diabetico</p>
                </div>
              </button>
              <button className="service-button" onClick={() => seleccionarServicio(5)}>
                <div className={`service-card card-quiropodia ${formData.servicio === 5 ? `selected` : ``}`}>
                  <div className="card-icon-wrapper"><img src="/quiropodia.png" className="icon-menu" /></div>
                  <p className="card-title">Quiropodia</p>
                </div>
              </button>

            </div>
          </div>
        )}

        {/* PASO 2: CALENDARIO */}
        {formData.paso === 2 && (
          <div className="form-section-container">
            <h2 className="form-main-title">Elija fecha y hora</h2>
            <p className="form-main-subtitle">Por favor, completa la información para continuar</p>
            <div className="calendar-container">
              <Calendar
                view="month"
                calendarType="gregory"
                locale="es-MX"
                minDate={new Date()}
                maxDate={ultimoDiaAnio}
                prevLabel={undefined}
                next2Label={esCercaAnioNuevo ? undefined : null}
                prev2Label={null}
                onChange={handleChangeDate}
                value={date}
                tileDisabled={tileDisabled}
              />
              <div className="time-section">
                <div className="time-grid">
                  {horarios.map((h) => {
                    const ocupado = horariosOcupados.includes(h);
                    return (
                      <button
                        key={h}
                        disabled={ocupado}
                        className={`time-slot ${formData.hora === h ? "active" : ""}${ocupado ? "disabled" : ""}`}
                        onClick={() => handleSelectHour(h)}>{h}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {formData.paso === 3 && (
          <div className="form-section-container">
            <h2 className="form-main-title">Datos Personales y Médicos</h2>
            <p className="form-main-subtitle">Por favor, completa la información para continuar</p>

            <div className="form-grid-layout">
              <input className="custom-input" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
              <input className="custom-input" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} />
              <input className="custom-input" name="correo" type="email" placeholder="Correo electrónico" value={formData.correo} onChange={handleChange} />
              <input className="custom-input" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
            </div>

            <div className="medical-details-box">
              <h3 className="details-title">Información Médica</h3>
              <p className="details-subtitle">Selecciona tus condiciones y especifica alergias</p>

              <div className="checkbox-flex">
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    name="tiene_diabetes"
                    checked={formData.tiene_diabetes}
                    onChange={(e) => handleChange({ target: { name: 'tiene_diabetes', value: e.target.checked } })}
                  />
                  <span>¿Tiene diabetes?</span>
                </label>

                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    name="problemas_circulacion"
                    checked={formData.problemas_circulacion}
                    onChange={(e) => handleChange({ target: { name: 'problemas_circulacion', value: e.target.checked } })}
                  />
                  <span>¿Problemas del corazón?</span>
                </label>
              </div>

              <textarea
                className="custom-textarea"
                id="alergias"
                name="alergias"
                placeholder="Especifique sus alergias (si no tiene, dejar en blanco)..."
                value={formData.alergias}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {/* PASO 4: RESUMEN */}
        {formData.paso === 4 && (
          <div className="confirmation-wrapper animate-fade-in">
            <h3>Resumen de tu Cita</h3>
            <div className="medical-ticket rect-elevado">
              <p><strong>Servicio:</strong> {formData.servicio}</p>
              <p><strong>Fecha:</strong> {formData.fecha} a las {formData.hora}</p>
              <p><strong>Paciente:</strong> {formData.nombre} {formData.apellido}</p>
              <p><strong>Correo:</strong>{formData.correo}</p>
              <p><strong>Telefono:</strong>{formData.telefono}</p>
            </div>
          </div>
        )}

        {/* BOTONES DE NAVEGACIÓN */}
        <div className="buttons" style={{ marginTop: '20px' }}>
          {formData.paso > 1 && (
            <button className="btn btn-secundary" onClick={prevStep} disabled={loading}>
              {formData.paso === 4 ? "Editar Cita" : "Atrás"}
            </button>
          )}
          {formData.paso < 4 ? (
            <button className="btn btn-primary" onClick={nextStep}>
              {formData.paso === 3 ? "Guardar" : "Siguiente"}
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
              {loading ? "Agendando..." : "Confirmar Cita"}
            </button>
          )}
        </div>
      </div>
    </section>
);

};

export default Cita;
