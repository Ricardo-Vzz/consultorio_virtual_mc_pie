import { useState } from "react";

function Cita() {

    const [selectedService, setSelectedService] = useState(null);
    function Selection(service){
        setSelectedService(service);
    }
}

return (
<>
    <section className="testimonials-section">
        <h2>Seleccione un Servicio</h2>
        <p className="services-subtitle">Eliga el servico que requiera.</p>
        <div className="testimonials-grid">

        <button className="service-button" onClick={()=>Selection("consulta")}>
            <div className={`service-card card-consulta ${selectedService === 'consulta' ? 'selected' : ''}`}>
                <div className="card-icon-wrapper"><img  src="/consulta.png" className="icon-menu"/></div>
                <p className="card-title">Consulta General</p>
            </div>
        </button>

        <button className="service-button" onClick={()=>Selection("unas")}>
            <div className={`service-card card-unas ${selectedService === 'unas' ? 'selected' : ''}`}>
                <div className="card-icon-wrapper"><img src="/tratamiento.png" className="icon-menu"/></div>
                <p className="card-title">Tratamiento de Uñas</p>
            </div>
        </button>
        
        <button className="service-button" onClick={()=>Selection("plantillas")}>
            <div className={`service-card card-ortopedico ${selectedService === 'plantillas' ? 'selected' : ''}`}>
                <div className="card-icon-wrapper"><img src="/plantilla.png" className="icon-menu"/></div>
                <p className="card-title">Plantillas Ortopedicas</p>
            </div>
        </button>

        <button className="service-button" onClick={()=>Selection("diabetico")}>
            <div className={`service-card card-diabetico ${selectedService === 'diabetico' ? 'selected' : ''}`}>
                <div className="card-icon-wrapper"><img src="/diabetico.png"/></div>
                <p className="card-title">Pie Diabetico</p>
            </div>
        </button>

        <button className="service-button" onClick={()=>Selection("quiropodia")}>
            <div className={`service-card card-quiropodia ${selectedService === 'quiropodia' ? 'selected' : ''}`}>
                <div className="card-icon-wrapper"><img src="/quiropodia.png" className="icon-menu"/></div>
                <p className="card-title">Quiropodia</p>
            </div>
        </button>
        </div>

    </section>
    {/*<button className="btn-back">Regresar</button>*/}
    <div className="">
      <button className= "btn btn-primary">Continuar</button>
    </div>
</>
)
export default Cita