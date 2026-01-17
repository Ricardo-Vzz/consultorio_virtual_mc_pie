export default function PasoConfirmacion({ datos, anterior, enviar }) {
  const toggleNotificacion = (medio) => {
    let updated = datos.notificacion.includes(medio)
      ? datos.notificacion.filter((m) => m !== medio)
      : [...datos.notificacion, medio];

    datos.notificacion = updated;
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Confirmación de Cita</h2>

      <h3 className="font-bold mb-2">Método de Notificación</h3>

      <label>
        <input
          type="checkbox"
          checked={datos.notificacion.includes("whatsapp")}
          onChange={() => toggleNotificacion("whatsapp")}
        />{" "}
        WhatsApp
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={datos.notificacion.includes("sms")}
          onChange={() => toggleNotificacion("sms")}
        />{" "}
        SMS
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={datos.notificacion.includes("email")}
          onChange={() => toggleNotificacion("email")}
        />{" "}
        Email
      </label>

      <h3 className="mt-4 font-bold">Resumen</h3>
      <pre className="bg-gray-100 p-3 text-xs mt-2 rounded">
        {JSON.stringify(datos, null, 2)}
      </pre>

      <div className="flex justify-between mt-4">
        <button className="bg-gray-400 text-white p-2 rounded" onClick={anterior}>
          Atrás
        </button>

        <button className="bg-green-600 text-white p-2 rounded" onClick={enviar}>
          Confirmar y Registrar Cita
        </button>
      </div>
    </div>
  );
}
