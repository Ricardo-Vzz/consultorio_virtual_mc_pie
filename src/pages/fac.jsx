function Faq() {
  return (
    <section className="page-premium">
      <div className="container">
        <div className="header-pro">
          <h2>Preguntas Frecuentes</h2>
          <p>¿Cómo para ayudarte?</p>
        </div>

        <details className="faq-item">
          <summary className="faq-header">
            <span>1 - ¿Qué servicios ofrece MCPie Podólogo?</span>
            <span className="arrow">›</span>
          </summary>
          <div className="faq-body">
            <p>
              Ofrecemos atención integral del pie, incluyendo diagnóstico y tratamiento de uñas encarnadas, hongos, callos, fascitis plantar, pie diabético y asesoría en cuidado preventivo.
            </p>
          </div>
        </details>

        <details className="faq-item">
          <summary className="faq-header">
            <span>2 - ¿Cómo puedo agendar una cita?</span>
            <span className="arrow">›</span>
          </summary>
          <div className="faq-body">
            <p>
              Puedes agendar tu cita de forma rápida a través de nuestra página web, seleccionando el servicio y el horario que mejor se adapte a ti. También puedes llamarnos directamente al consultorio.
            </p>
          </div>
        </details>

        <details className="faq-item">
          <summary className="faq-header">
            <span>3 - ¿Aceptan pacientes sin cita previa?</span>
            <span className="arrow">›</span>
          </summary>
          <div className="faq-body">
            <p>
              Por lo general, atendemos con cita programada para garantizar un servicio personalizado. Sin embargo, si tienes una urgencia, llámanos y haremos lo posible por atenderte.
            </p>
          </div>
        </details>

        <details className="faq-item">
          <summary className="faq-header">
            <span>4 - ¿Cuál es el tiempo promedio de una consulta?</span>
            <span className="arrow">›</span>
          </summary>
          <div className="faq-body">
            <p>
              Dependiendo del servicio, las consultas pueden durar entre 30 y 60 minutos. Procedimientos específicos pueden requerir un tiempo mayor..
            </p>
          </div>
        </details>

         <details className="faq-item">
          <summary className="faq-header">
            <span>5 - ¿Qué hago si no puedo asistir a mi cita?</span>
            <span className="arrow">›</span>
          </summary>
          <div className="faq-body">
            <p>
              Te pedimos cancelar o reprogramar tu cita con al menos 24 horas de anticipación para liberar el espacio para otros pacientes.
            </p>
          </div>
        </details>



      </div>
    </section>
  )
}

export default Faq