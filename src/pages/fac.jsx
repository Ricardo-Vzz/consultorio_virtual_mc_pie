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
            <span>1 - ¿Puedo cancelar una cita?</span>
            <span className="arrow">›</span>
          </summary>
          <div className="faq-body">
            <p>
              Claro, puedes cancelar desde tu confirmación de WhatsApp o tu correo
              o bien, puedes ingresar al apartado de cambios en mi cita y realizar la cancelación.
            </p>
          </div>
        </details>

        <details className="faq-item">
          <summary className="faq-header">
            <span>2 - ¿Pregunta?</span>
            <span className="arrow">›</span>
          </summary>
          <div className="faq-body">
            <p>
              Respuesta
            </p>
          </div>
        </details>

        <details className="faq-item">
          <summary className="faq-header">
            <span>3 - ¿Puedo solicitar una factura por mis estudios?</span>
            <span className="arrow">›</span>
          </summary>
          <div className="faq-body">
            <p>
              Respuesta
            </p>
          </div>
        </details>

        <details className="faq-item">
          <summary className="faq-header">
            <span>4 - ¿Pregunta?</span>
            <span className="arrow">›</span>
          </summary>
          <div className="faq-body">
            <p>
              Respuesta.
            </p>
          </div>
        </details>
      </div>
    </section>
  )
}

export default Faq