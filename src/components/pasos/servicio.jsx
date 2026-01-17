

function PasoServicio({ datos, actualizar, siguiente }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Selecciona el Servicio</h2>

      <select
        className="border p-2 w-full"
        value={datos.servicio}
        onChange={(e) => actualizar("servicio", e.target.value)}
      >
        <option value="">Selecciona</option>
        <option value="Masaje">Masaje</option>
        <option value="Facial">Facial</option>
        <option value="Spa">Spa</option>
      </select>

      <button
        onClick={siguiente}
        className="mt-4 bg-blue-600 text-white p-2 rounded w-full"
        disabled={!datos.servicio}
      >
        Siguiente
      </button>
    </div>
  );
}

export default PasoServicio;