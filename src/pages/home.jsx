import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <div>
                <title>Mc. Pie - Consultorio Podológico</title>
                <header className="hero-banner">
                    <div className="overlay"></div>
                    <div className="hero-content">
                        <h1>Mc. Pie</h1>
                        <p className="tagline">Somos un consultorio especializado en el cuidado integral para los pies y el andar.</p>
                        <p className="description">Nos dedicamos a dar alivio a todos aquellos pacientes que presenten molestias en las extremidades inferiores del cuerpo</p>

                        <div className="cta-buttons">
                            <Link to="/cita" className="btn btn-primary">Agendar Cita</Link>
                            <Link to="/servicios" className="btn btn-secondary">Ver Servicios</Link>
                        </div>
                    </div>

                </header>
                {/* SECCIÓN PRESENTACIÓN DOCTOR (ESTILO XL MEJORADO) */}
                <section className="presentacion-doctor">
                    <div className="doctor-card XL">
                        <div className="doctor-left">
                            <img src="/doc.jpg" alt="Dr. Cristhian Yazir Medina" className="doc-img-styled" />
                        </div>

                        <div className="doctor-right">
                            <div className="info-group">
                                <span className="label">ESPECIALISTA</span>
                                <h2 className="value name">Dr. Cristhian Yazir Medina</h2>
                            </div>

                            <div className="info-group">
                                <span className="label">RAMA MÉDICA</span>
                                <p className="value specialty">Podología Clínica</p>
                            </div>

                            <div className="info-group">
                                <p className="subtitle">Nuestro objetivo es proporcionar alivio y mejorar la calidad de vida de nuestros pacientes a través de tratamientos personalizados y atención profesional.</p>
                                <p className="card-description">Estamos aquí para ayudarte a recuperar tu bienestar y movilidad con tecnología de vanguardia y un trato humano.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="testimonials-section">
                    <h2>Servicios Populares</h2>
                    <p className="subtitle">Ofrecemos una variedad de servicios para el cuidado de tus pies, aquí te presentamos algunos de los más solicitados.</p>

                    <div className="testimonials-grid">

                        <div className="testimonial-card">
                            <p className="author">Estudio de la pisada</p>
                            <img src="/pisada.jpg"></img>
                            {/*className="doc-img" src="/estudio_pisada.png"*/}
                            <p className="date">Análisis detallado de la biomecánica del pie para identificar problemas y mejorar la postura y el equilibrio.</p>
                        </div>

                        <div className="testimonial-card">
                            <p className="author">Tratamiento de uñas encarnadas</p>
                            <img src="/uñas_encarnadas.jpg"></img>
                            <p className="date">Procedimiento para aliviar el dolor y prevenir infecciones causadas por uñas que crecen hacia la piel.</p>
                        </div>

                        <div className="testimonial-card">
                            <p className="author">Ortesis plantares</p>
                            <img src="/ortesis.jpg"></img>
                            <p className="date">Dispositivos personalizados que se colocan dentro del calzado para corregir problemas de alineación y mejorar la función del pie.</p>
                        </div>
                    </div>

                    <div className="section-center">
                        <Link to="/servicios" className="btn btn-secondary">Más Servicios</Link>
                    </div>

                </section>

                <section className="testimonials-section">
                    <h2>Lo Que Dicen Nuestros Pacientes</h2>
                    <p className="subtitle">La satisfacción de nuestros pacientes es nuestra mayor recompensa, lee sus experiencias.</p>

                    <div className="testimonials-grid">

                        <div className="testimonial-card">
                            <p className="quote">"Excelente atención y profesionalismo. Tenía un problema que llevaba arrastrando por años y que el Dr. Pie me solucionó al instante. Me siento mucho mejor. El Dr. Pérez es muy atento y explica bien el proceso. ¡Totalmente recomendado!"</p>
                            <p className="author">Maria González</p>
                            <p className="date">Octubre 2025</p>
                        </div>

                        <div className="testimonial-card">
                            <p className="quote">"Después de años con dolor en los pies por un espolón, me decidí a visitar a Mc. Pie. La consulta fue detallada y muy completa. El estudio de la pisada fue muy completo y ahora uso plantillas hechas a medida. ¡Gracias por cambiar mi calidad de vida!"</p>
                            <p className="author">Carlos Ramírez</p>
                            <p className="date">Noviembre 2025</p>
                        </div>

                        <div className="testimonial-card">
                            <p className="quote">"Muy satisfecha con el tratamiento de uñas encarnadas. El procedimiento fue rápido, indoloro y efectivo. Tenía el pie muy adolorido y me dolía seguir con el día, pero ahora, ¡me puedo poner mis zapatillas sin dolor!"</p>
                            <p className="author">Ana Martínez</p>
                            <p className="date">Diciembre 2025</p>
                        </div>

                    </div>

                    <div className="section-center">
                        <Link to="/portafolio" className="btn btn-secondary">Ver Más</Link>
                    </div>

                </section>

            </div>
        </>
    )
}

export default Home;
