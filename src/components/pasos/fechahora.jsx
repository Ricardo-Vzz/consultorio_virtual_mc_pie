export default function PasoFechaHora({ datos, actualizar, siguiente, anterior }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Selecciona Fecha y Hora</h2>

      <input
        type="date"
        className="border p-2 w-full mb-3"
        value={datos.fecha}
        onChange={(e) => actualizar("fecha", e.target.value)}
      />

      <input
        type="time"
        className="border p-2 w-full"
        value={datos.hora}
        onChange={(e) => actualizar("hora", e.target.value)}
      />

      <div className="flex justify-between mt-4">
        <button className="bg-gray-400 text-white p-2 rounded" onClick={anterior}>
          Atrás
        </button>

        <button
          className="bg-blue-600 text-white p-2 rounded"
          onClick={siguiente}
          disabled={!datos.fecha || !datos.hora}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
