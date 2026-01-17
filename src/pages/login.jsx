function Login() {
  return (
    <>
      <section className="testimonials-section">
        <h2>Iniciar Sesión</h2>
        <form className="login-form">
          <label htmlFor="username">Usuario:</label>
          <input type="text" id="username" name="username" required />

          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" required />
          <button type="submit">Ingresar</button>
        </form>
      </section>
    </>
)}
export default Login;