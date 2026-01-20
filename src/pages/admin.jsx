import { useState } from "react";

function Admin() {
  const [citas] = useState([
    { id: 1, paciente: "Juan Pérez", servicio: "Podología Clínica", hora: "09:00", estado: "completada" },
    { id: 2, paciente: "Maria López", servicio: "Estudio de Pisada", hora: "10:30", estado: "en-progreso" },
    { id: 3, paciente: "Carlos Ruiz", servicio: "Uña Encarnada", hora: "12:00", estado: "pendiente" },
  ]);

  const [comentarios] = useState([
    { id: 1, user: "Ana M.", email: "ana@ejemplo.com", texto: "Excelente atención del Dr. Yazir.", tipo: "Sugerencia" },
    { id: 2, user: "Roberto G.", email: "robert@ejemplo.com", texto: "Me gustaría que abrieran los domingos.", tipo: "Reclamo" },
  ]);

  const enCurso = citas.find(c => c.estado === "en-progreso");
  const proxima = citas.find(c => c.estado === "pendiente");

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
            <span className="date-badge">20 Enero, 2026</span>
          </div>
          <div className="agenda-scroll">
            {citas.map(cita => (
              <div key={cita.id} className={`cita-row ${cita.estado}`}>
                <span className="cita-hour">{cita.hora}</span>
                <div className="cita-details">
                  <span className="cita-name">{cita.paciente}</span>
                  <span className="cita-service">{cita.servicio}</span>
                </div>
                <div className={`status-pill ${cita.estado}`}>{cita.estado}</div>
              </div>
            ))}
          </div>
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
              <strong>{proxima ? `${proxima.paciente} (${proxima.hora})` : "No hay más citas"}</strong>
            </div>
          </div>

          <div className="quick-actions">
            <button className="btn-admin-action"><span>+</span> Agregar Hora</button>
            <button className="btn-admin-action"><span>📅</span> Día Inhábil</button>
            <button className="btn-admin-action secondary"><span>🗓️</span> Rango Inhábil</button>
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
        <h3>Reclamos y Sugerencias</h3>
        <div className="comments-floating-grid">
          {comentarios.map(com => (
            <div key={com.id} className="comment-bubble rect-elevado">
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