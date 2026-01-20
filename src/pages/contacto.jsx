import { MdPhone } from "react-icons/md";
import { MdPinDrop } from "react-icons/md";

function Contacto() {
  return (
    <section className="page-premium">
      <div className="container">
        <div className="header-pro">
          <h2>Contacto</h2>
          <p>Encuéntranos en nuestro consultorio</p>
        </div>

        <div className="wrapper">
          {/* Bloque de Información en Verde Primary */}
          <div className="info-card">
            <div className="info-section">
              <div className="icon-circle"><MdPinDrop/></div>
              <div className="info-text">
                <h3>Nuestra Ubicación</h3>
                <p>Boulevard Rodolfo Chávez Carrillo 522, Placetas Estadio, Colima, Col.</p>
              </div>
            </div>

            <div className="info-section">
              <div className="icon-circle"><MdPhone/></div>
              <div className="info-text">
                <h3>Horarios de Atención</h3>
                <p>Lunes a Viernes: 10:00 AM - 7:30 PM</p>
                <p>Sábados: 9:30 AM - 3:30 PM</p>
                <p>Domingos: Cerrado</p>
              </div>
            </div>

            <a 
              href="https://maps.app.goo.gl/Bzjyj7EEQe5gcNWi8" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-cta-maps"
            >
              Cómo llegar
            </a>
          </div>

          {/* Bloque del Mapa */}
          <div className="map-container-pro">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d32368.24455201336!2d-103.75199397418012!3d19.238898880082246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842545d0e91cac67%3A0x752728cefe4c5bdf!2sMcPie%20Pod%C3%B3logo!5e0!3m2!1ses-419!2smx!4v1768892014477!5m2!1ses-419!2smx"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Mc. Pie"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacto;