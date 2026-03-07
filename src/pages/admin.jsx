import { useEffect, useState } from "react";
import api from "../api/api";
import { MdAdd, MdHandyman, MdInsertInvitation } from "react-icons/md"

function Admin() {

  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);

  const transiciones = {
    "pendiente": "en-progreso",
    "en-progreso": "realizada",
    "realizada": "pendiente",
    "cancelada": "pendiente",
  };

  const [comentarios] = useState([
    { id_com: 1, user: "Ana M.", email: "ana@ejemplo.com", texto: "Excelente atención del Dr. Yazir.", tipo: "Sugerencia" },
    { id_com: 2, user: "Roberto G.", email: "robert@ejemplo.com", texto: "Me gustaría que abrieran los domingos.", tipo: "Reclamo" },
  ]);

  //Carga de citas
  useEffect(() => {
    const fetchCitas = async () => {
      try {
        setLoading(true);
        const response = await api.get('/citas');
        const data = response.data;
        if (Array.isArray(data)) {
          setCitas(data);
        } else {
          throw new Error("El formato de datos recibido no es válido.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error al cargar citas.");
      } finally {
        setLoading(false);
      }
    };
    fetchCitas();
  }, []);
  
  //Actualizar estado
  const cambiarEstado = async (id) => {
    const citaActual = citas.find(c => c.id === id);
    if (!citaActual) return;
    const nuevoEstado = transiciones[citaActual.estado] || "pendiente";
    setCitas(prev => prev.map(c => c.id === id ? { ...c, estado: nuevoEstado } : c));
    guardarEstado(id, nuevoEstado)
  };

  //guardar estado
  const guardarEstado = async (id, nuevoEstado) => {
        try {
      setError(null);
      await api.put(`/citas/${id}`, { estado: nuevoEstado });
    } catch (err) {
      setError("No se pudo guardar el cambio en el servidor. Intenta de nuevo.");
    }
  }

  if (loading) return <div className="loading">Cargando citas...</div>;
  if (error) return <div className="error-message">Hubo un problema: {error}</div>;

  const enCurso = citas.find(c => c.estado === "en-progreso");
  const proxima = citas.find(c => c.estado === "pendiente");

  const hoy = new Date();
  const fechaFormateada = hoy.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formateadorHora = new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // true:formato 12h (AM/PM), false:formato 24h
  });

  const abrirConfirmacion = (cita) => {
    setCitaSeleccionada(cita);
    setModalAbierto(true);
  };

  const confirmarCancelacion = () => {
    if (citaSeleccionada) {
      setCitas(prev => prev.map(c => c.id === citaSeleccionada.id ? { ...c, estado: "cancelada" } : c));
      guardarEstado(citaSeleccionada.id,"cancelada")
      setModalAbierto(false);
      setCitaSeleccionada(null);
    }
  }

  return (
    <div className="admin-wrapper">
      <header className="admin-header">
        <h1>Panel de Control Profesional</h1>
        <p className="subtitle">Gestión integral de Mc. Pie Consultorio</p>
      </header>

      {/* SECCIÓN 1: AGENDA Y CONTROL EN VIVO */}
      <main className="dashboard-layout">
        <section className="agenda-container rect-elevado">
          <div className="header-with-action">
            <h3>Citas de Hoy</h3>
            <span className="date-badge">{fechaFormateada}</span>
          </div>
          <div className="agenda-scroll">
            {citas.map(cita => (
              <div key={cita.id} className={`cita-row ${cita.estado}`}>
                {/*cancelar*/}
                {cita.estado !== 'cancelada' && (
                  <button
                    className="btn-cancelar-discreto"
                    onClick={() => abrirConfirmacion(cita)}
                  >
                    ✕
                  </button>
                )}
                <span className="cita-hour">{formateadorHora.format(new Date(cita.hora))}</span>
                <div className="cita-details">
                  <span className="cita-name">{cita.paciente}</span>
                  <span className="cita-service">{cita.servicio}</span>
                </div>
                <div
                  className={`status-pill ${cita.estado}`}
                  onClick={() => cambiarEstado(cita.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {cita.estado || "pendiente"}
                </div>
              </div>
            ))}
          </div>
          {modalAbierto  && (
            <div className="modal-overlay" onClick={() => setModalAbierto(false)}>
              <div className="modal-confirmacion" onClick={e => e.stopPropagation()}>
                <div className="modal-icon">⚠️</div>
                <h2>¿Confirmar cancelación?</h2>
                <p>
                  Estás a punto de cancelar la cita de: <br />
                  <strong>{citaSeleccionada?.paciente}</strong>
                </p>
                <div className="modal-actions">
                  <button className="btn-secundario" onClick={() => setModalAbierto(false)}>
                    No, mantener
                  </button>
                  <button className="btn-peligro" onClick={confirmarCancelacion}>
                    Sí, cancelar cita
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        <aside className="control-panel">
          <div className="live-card rect-acento">
            <div className="live-header">
              <span className="pulse-icon"></span> EN CURSO
            </div>
            {enCurso ? (
              <div className="live-body">
                <h2>{enCurso.paciente}</h2>
                <p>{enCurso.servicio}</p>
              </div>
            ) : (
              <div className="live-body"><h2>Consultorio Libre</h2></div>
            )}
            <div className="next-preview">
              <span>Siguiente:</span>
              <strong>{proxima ? `${proxima.paciente} (${formateadorHora.format(new Date(proxima.hora))})` : "No hay más citas"}</strong>
            </div>
          </div>

          <div className="quick-actions">
            <button className="btn btn-primary"><span><MdAdd /></span> Agregar Hora</button>
            <button className="btn btn-primary"><span><MdHandyman /></span> Día Inhábil</button>
            <button className="btn btn-secondary"><span><MdInsertInvitation /></span> Rango Inhábil</button>
          </div>
        </aside>
      </main>

      {/* SECCIÓN 2: MÉTRICAS MAESTRAS */}
      <section className="stats-section">
        <div className="stat-group">
          <h4>Métricas de Citas</h4>
          <div className="stat-cards-container">
            <div className="mini-stat"><strong>12</strong><span>Hoy</span></div>
            <div className="mini-stat"><strong>5</strong><span>Pendientes</span></div>
            <div className="mini-stat danger"><strong>2</strong><span>Canceladas</span></div>
          </div>
        </div>
        <div className="stat-group">
          <h4>Tráfico de Página</h4>
          <div className="stat-cards-container">
            <div className="mini-stat info"><strong>450</strong><span>Visitas</span></div>
            <div className="mini-stat info"><strong>89</strong><span>Clics CTA</span></div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: MODERACIÓN DE FEEDBACK */}
      <section className="moderation-container">
        <h3>Moderación de Comentarios</h3>
        <div className="comments-floating-grid">
          {comentarios.map(com => (
            <div key={com.id_com} className="comment-bubble rect-elevado">
              <div className="comment-meta">
                <strong>{com.user}</strong>
                <span>{com.email}</span>
                <span className="tag-tipo">{com.tipo}</span>
              </div>
              <p className="comment-text">"{com.texto}"</p>
              <div className="comment-btns">
                <button className="btn-deny">Eliminar</button>
                <button className="btn-approve">Aceptar</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Admin;